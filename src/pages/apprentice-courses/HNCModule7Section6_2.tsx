/**
 * Module 7 · Section 6 · Subsection 2 — Circuit Protection
 * HNC Electrical Engineering for Building Services (Power and Lighting Systems)
 *   Device selection, breaking capacity, let-through energy, selectivity and RCD coordination
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

const TITLE = 'Circuit Protection - HNC Module 7 Section 6.2';
const DESCRIPTION =
  'Master circuit protection device selection for electrical installations: MCB/MCCB/RCD selection, breaking capacity (Icn, Icu, Ics), let-through energy (I²t), selectivity and discrimination, RCD types and coordination per BS 7671.';

const quickCheckQuestions = [
  {
    id: 'breaking-capacity',
    question: 'What does the breaking capacity (Icn) of a protective device indicate?',
    options: [
      'The maximum continuous current the device can carry',
      'The let-through energy during a fault',
      'The time taken to trip at rated current',
      'The maximum fault current the device can safely interrupt',
    ],
    correctIndex: 3,
    explanation:
      'Breaking capacity (Icn for MCBs, Icu/Ics for MCCBs) indicates the maximum prospective fault current that the device can safely interrupt without damage or danger. It must exceed the prospective fault current at the installation point.',
  },
  {
    id: 'let-through-energy',
    question: 'Why is let-through energy (I²t) important when selecting protective devices?',
    options: [
      "It determines the maximum continuous current the device can carry",
      "It must be less than the cable's withstand capability to prevent damage",
      "It sets the minimum earth fault loop impedance for the circuit",
      "It defines the rated voltage at which the device can operate",
    ],
    correctIndex: 1,
    explanation:
      "Let-through energy (I²t) represents the thermal energy passed through during fault clearance. It must be less than the cable's maximum withstand value (k²S²) to ensure the cable is not damaged during a fault condition.",
  },
  {
    id: 'discrimination',
    question: 'What is the purpose of discrimination (selectivity) between protective devices?',
    options: [
      'To ensure only the device nearest the fault operates',
      'To make all devices trip together so the whole board is de-energised',
      'To increase the breaking capacity of the downstream device',
      'To reduce the let-through energy of the upstream device to zero',
    ],
    correctIndex: 0,
    explanation:
      'Discrimination ensures that during a fault, only the protective device nearest to the fault operates, leaving the rest of the installation energised. This is achieved through time, current, or energy-based selectivity.',
  },
  {
    id: 'rcd-type-a',
    question: 'A Type A RCD can detect:',
    options: [
      'Pure DC residual currents only',
      'High-frequency residual currents only',
      'AC and pulsating DC residual currents',
      'AC residual currents only',
    ],
    correctIndex: 2,
    explanation:
      'Type A RCDs can detect sinusoidal AC residual currents and pulsating DC residual currents. They are commonly required where electronic equipment with rectifiers may produce DC components in fault currents.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'For an MCB with a breaking capacity of 10kA, what is the maximum prospective fault current it can safely interrupt?',
    options: [
      '6kA',
      '10kA',
      '16kA',
      '25kA',
    ],
    correctAnswer: 1,
    explanation:
      'The breaking capacity rating indicates the maximum fault current the device can interrupt. A 10kA MCB can safely break fault currents up to 10,000 amperes. The prospective fault current at the installation point must not exceed this value.',
  },
  {
    id: 2,
    question:
      'Which parameter must be compared with k²S² to verify cable protection during a fault?',
    options: [
      'Rated current (In)',
      'Breaking capacity (Icn)',
      'Let-through energy (I²t)',
      'Tripping current (It)',
    ],
    correctAnswer: 2,
    explanation:
      'The let-through energy (I²t) must be less than k²S² where k is the cable constant and S is the conductor cross-sectional area. This ensures the cable can withstand the thermal stress during fault clearance.',
  },
  {
    id: 3,
    question:
      'According to BS 7671, what is the maximum disconnection time for a 230V final circuit protected by a 32A device?',
    options: [
      '0.2 seconds',
      '0.1 seconds',
      '5 seconds',
      '0.4 seconds',
    ],
    correctAnswer: 3,
    explanation:
      'BS 7671 Regulation 411.3.2.2 requires a maximum disconnection time of 0.4 seconds for final circuits not exceeding 63A in TN systems at 230V nominal voltage. This ensures automatic disconnection of supply for fault protection.',
  },
  {
    id: 4,
    question: 'What distinguishes an MCCB from an MCB?',
    options: [
      'MCCBs have adjustable trip settings and higher current ratings',
      'MCCBs provide residual current protection that MCBs lack',
      'MCCBs can only be used on DC circuits, MCBs only on AC',
      'MCCBs have a fixed thermal-only trip with no magnetic element',
    ],
    correctAnswer: 0,
    explanation:
      'MCCBs (Moulded Case Circuit Breakers) feature adjustable trip settings, higher current ratings (typically 100A-1600A+), and often higher breaking capacities than MCBs. They provide greater flexibility for main distribution and industrial applications.',
  },
  {
    id: 5,
    question:
      'For time-based discrimination between an upstream and downstream MCB, the upstream device should:',
    options: [
      'Have a lower breaking capacity than the downstream device',
      'Have a slower operating characteristic or time-delay function',
      'Have a lower rated current than the downstream device',
      'Operate faster so it clears the fault before the downstream device',
    ],
    correctAnswer: 1,
    explanation:
      'Time-based discrimination requires the upstream device to operate more slowly than the downstream device, allowing the device nearest the fault to clear it first. This can be achieved using time-delay settings or selecting devices with different time-current characteristics.',
  },
  {
    id: 6,
    question: 'A Type F RCD is specifically designed to detect:',
    options: [
      'Smooth DC residual currents from three-phase rectifiers only',
      'Sinusoidal AC residual currents only, as in a Type AC device',
      'Composite residual currents including high-frequency components up to 1kHz',
      'Pure DC residual currents above 6 mA only, as required for EV charging',
    ],
    correctAnswer: 2,
    explanation:
      'Type F RCDs detect AC, pulsating DC, and composite residual currents including high-frequency components up to 1kHz. They are required for circuits supplying variable speed drives and frequency inverters that may produce complex waveforms.',
  },
  {
    id: 7,
    question: 'What is the purpose of back-up protection coordination?',
    options: [
      'To ensure every device on the board trips simultaneously during a fault',
      'To increase the rated current of the downstream device beyond its marking',
      'To remove the need to declare prospective fault current at the origin',
      'To allow a device with lower breaking capacity to be used where a higher-rated upstream device provides protection',
    ],
    correctAnswer: 3,
    explanation:
      'Back-up protection allows a protective device with a breaking capacity lower than the prospective fault current to be used, provided an upstream device with adequate capacity assists in clearing high-level faults. The combination must be tested and verified by manufacturers.',
  },
  {
    id: 8,
    question:
      'According to BS 7671, what residual current rating is required for socket outlets in locations accessible to the general public?',
    options: [
      '30mA',
      '10mA',
      '100mA',
      '300mA',
    ],
    correctAnswer: 0,
    explanation:
      'BS 7671 Regulation 411.3.3 requires RCD protection with a rated residual operating current (IΔn) not exceeding 30mA for socket outlets rated up to 32A for use by ordinary persons. This provides additional protection against electric shock.',
  },
  {
    id: 9,
    question: 'What is the service short-circuit breaking capacity (Ics) of an MCCB?',
    options: [
      'The maximum continuous current the device can carry indefinitely',
      'The percentage of Icu at which the device can operate and remain functional',
      'The fault current at which the device is destroyed but still opens',
      'The minimum fault current needed for instantaneous magnetic tripping',
    ],
    correctAnswer: 1,
    explanation:
      'Ics (service short-circuit breaking capacity) is expressed as a percentage of Icu and indicates the fault current level at which the MCCB can interrupt and remain operational for continued service. Typical values are 50%, 75%, or 100% of Icu.',
  },
  {
    id: 10,
    question: 'When is a Type B RCD required according to BS 7671?',
    options: [
      'For any standard socket outlet circuit in a domestic dwelling',
      'For lighting circuits supplying LED drivers with passive power factor correction',
      'For circuits with three-phase rectifiers producing smooth DC components',
      'For final circuits supplying only resistive heating loads',
    ],
    correctAnswer: 2,
    explanation:
      'Type B RCDs are required where smooth DC fault currents may occur, such as with three-phase rectifiers in variable speed drives, EV chargers, or PV inverters. They can detect AC, pulsating DC, and smooth DC residual currents.',
  },
  {
    id: 11,
    question:
      'For energy-based discrimination (let-through energy coordination), what condition must be met?',
    options: [
      "The upstream device must have a lower let-through energy than the downstream device",
      "Both devices must have identical I²t let-through characteristics",
      "The downstream device's pre-arcing I²t must exceed the upstream device's total I²t",
      "The downstream device must limit I²t to less than the upstream device's pre-arcing I²t",
    ],
    correctAnswer: 3,
    explanation:
      'For energy-based discrimination, the total let-through energy (I²t) of the downstream device at maximum fault current must be less than the pre-arcing I²t of the upstream device. This ensures the downstream device clears the fault before the upstream device begins to operate.',
  },
  {
    id: 12,
    question: 'An RCBO combines the functions of:',
    options: [
      'RCD and MCB in a single device',
      'Contactor and overload relay',
      'MCB and surge protection device',
      'MCCB and isolator',
    ],
    correctAnswer: 0,
    explanation:
      'An RCBO (Residual Current Circuit Breaker with Overcurrent protection) combines RCD earth fault protection with MCB overcurrent protection in a single device. This provides both fault protection and additional protection while saving space in distribution boards.',
  },
];

const faqs = [
  {
    question: 'How do I determine the required breaking capacity for a protective device?',
    answer:
      'The breaking capacity must exceed the prospective fault current (PFC) at the point of installation. Calculate or measure the PFC considering the supply impedance, transformer rating, and cable impedance to the installation point. For domestic installations, DNO typically declare 16kA at the origin; for commercial/industrial, values can exceed 50kA. Always select devices with breaking capacity greater than the calculated PFC, applying appropriate safety margins.',
  },
  {
    question: 'What is the difference between Type AC, A, F, and B RCDs?',
    answer:
      'Type AC detects sinusoidal AC residual currents only. Type A detects AC and pulsating DC (required for equipment with single-phase rectifiers like IT equipment). Type F detects AC, pulsating DC, and composite currents with high-frequency components up to 1kHz (required for variable speed drives). Type B detects AC, pulsating DC, and smooth DC (required for three-phase rectifiers, EV chargers, PV systems). Selection depends on the equipment characteristics and fault current waveforms likely to occur.',
  },
  {
    question: 'How do I achieve discrimination between MCBs?',
    answer:
      "MCB discrimination can be achieved through current, time, or energy methods. Current discrimination uses devices with different current ratings (minimum 1:1.6 ratio). Time discrimination uses upstream devices with time-delay characteristics. Energy discrimination selects devices where the downstream device's total I²t is less than the upstream device's pre-arcing I²t. Most manufacturers provide discrimination tables showing compatible device combinations for various fault levels.",
  },
  {
    question: 'When should I use an RCBO instead of a separate RCD and MCB?',
    answer:
      "Use RCBOs when individual circuit protection is required - a fault on one circuit won't affect others. This is mandatory for certain circuits per BS 7671 (e.g., fire alarm, security). RCBOs also provide discrimination advantages as nuisance tripping affects only the faulty circuit. Separate RCDs with MCBs are more economical for groups of circuits with similar characteristics, but a fault trips all downstream circuits.",
  },
  {
    question: 'What is the significance of I²t let-through energy classes?',
    answer:
      "I²t energy classes (Class 1, 2, 3) indicate the let-through energy limitation of MCBs. Class 3 (most common in the UK) provides the greatest energy limitation, best protecting cables during faults. When selecting devices, ensure the let-through energy (I²t) does not exceed the cable's withstand value (k²S²). Manufacturers publish I²t values at various fault currents for device selection. Lower energy limitation classes provide better cable protection and improved discrimination opportunities.",
  },
  {
    question: 'How does back-up protection work with Type 2 coordination?',
    answer:
      "Type 2 coordination (back-up protection) allows an MCB with breaking capacity lower than the prospective fault current when used with an upstream device of adequate capacity. The upstream device must limit the fault current or energy to within the downstream device's capability. This must be verified by manufacturer testing - not assumed. BS EN 60947-2 Annex A specifies testing requirements. Always use manufacturer coordination tables to confirm valid combinations.",
  },
];

const HNCModule7Section6_2 = () => {
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
            eyebrow="Module 7 · Section 6 · Subsection 2"
            title="Circuit Protection"
            description="Device selection, breaking capacity, let-through energy, selectivity and RCD coordination"
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              "Select appropriate MCBs, MCCBs, and fuses for circuit protection",
              "Calculate and verify breaking capacity requirements",
              "Apply let-through energy (I²t) criteria for cable protection",
              "Design discrimination schemes for protective device coordination",
              "Select correct RCD types for various applications",
              "Apply BS 7671 requirements for circuit protection",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Protective Device Selection">
            <p>Selecting the correct protective device requires consideration of the circuit's normal operating conditions, potential fault conditions, and the characteristics of the equipment being protected. The device must provide both overload and fault protection whilst remaining stable during normal operation.</p>
            <p><strong>Protective Device Types:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>MCB (Miniature Circuit Breaker):</strong> Standard protection up to 125A, fixed trip characteristics</li>
              <li><strong>MCCB (Moulded Case Circuit Breaker):</strong> Higher ratings (100A-1600A+), adjustable settings</li>
              <li><strong>Fuse (BS 88, BS 1361, BS 3036):</strong> High breaking capacity, no mechanical parts to fail</li>
              <li><strong>RCD/RCBO:</strong> Earth fault protection, additional shock protection</li>
            </ul>
            <p><strong>MCB Characteristics (BS EN 60898)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Type B:</strong> 3 to 5 × In — Resistive loads, lighting, socket circuits</li>
              <li><strong>Type C:</strong> 5 to 10 × In — Small motors, fluorescent lighting, IT equipment</li>
              <li><strong>Type D:</strong> 10 to 20 × In — High inrush loads, transformers, X-ray equipment</li>
            </ul>
            <p><strong>Device Selection Criteria</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Rated voltage (Ue):</strong> Must equal or exceed system voltage</li>
              <li><strong>Rated current (In):</strong> ≥ circuit design current (Ib) but ≤ cable current capacity (Iz)</li>
              <li><strong>Breaking capacity (Icn/Icu):</strong> &gt; prospective fault current at installation point</li>
              <li><strong>Trip characteristics:</strong> Suitable for load type and inrush currents</li>
              <li><strong>Number of poles:</strong> Matched to circuit configuration (SP, DP, TP, TPN, 4P)</li>
            </ul>
            <p><strong>Selection principle:</strong> The protective device rating chain must satisfy: Ib ≤ In ≤ Iz, where Ib is design current, In is device rating, and Iz is cable capacity.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Breaking Capacity and Fault Ratings">
            <p>Breaking capacity is the maximum fault current a protective device can safely interrupt without damage, fire, or danger. BS 7671 Regulation 432.1 requires that every protective device has a rated short-circuit capacity not less than the prospective fault current at its point of installation.</p>
            <p><strong>Icn (MCBs)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Rated short-circuit capacity</li>
              <li>Tested to BS EN 60898</li>
              <li>Typical values: 6kA, 10kA, 16kA</li>
              <li>Single test - device may not be reusable</li>
            </ul>
            <p><strong>Icu (MCCBs)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Ultimate breaking capacity</li>
              <li>Maximum fault current device can interrupt</li>
              <li>Device may need replacement after operation</li>
              <li>Tested per BS EN 60947-2</li>
            </ul>
            <p><strong>Ics (MCCBs)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Service short-circuit capacity</li>
              <li>Expressed as % of Icu</li>
              <li>Device remains serviceable</li>
              <li>Typical: 50%, 75%, 100%</li>
            </ul>
            <p><strong>Prospective Fault Current Sources</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Domestic origin (PME):</strong> Up to 16kA — 16kA for main switch</li>
              <li><strong>Final circuits (domestic):</strong> 1-3kA typical — 6kA MCBs usually sufficient</li>
              <li><strong>Commercial/Industrial LV:</strong> 10-50kA — Match to calculated PFC</li>
              <li><strong>Close to transformer:</strong> Up to 80kA+ — High-rupturing capacity devices</li>
            </ul>
            <p><strong>PFC Calculation Example</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Supply transformer:</strong> 500kVA, 4% impedance</li>
              <li><strong>Secondary voltage:</strong> 400V (line-line)</li>
              <li><strong>Full load current:</strong> I = 500,000 / (√3 × 400) = 722A</li>
              <li><strong>PFC at transformer:</strong> 722 / 0.04 = 18.05kA</li>
              <li><strong>Minimum breaking capacity:</strong> &gt;18kA at main switchboard</li>
            </ul>
            <p><strong>Back-up protection:</strong> Where PFC exceeds a device's rating, back-up protection coordination with an upstream device may be permitted per BS EN 60947-2 Annex A, but only where manufacturer's data confirms the combination.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Let-Through Energy (I²t)">
            <p>Let-through energy represents the thermal energy (measured in A²s) that passes through a protective device during fault clearance. BS 7671 Regulation 434.5.2 requires that the energy let through by the protective device does not exceed the energy withstand capability of the protected conductor.</p>
            <p><strong>The Adiabatic Equation</strong></p>
            <p>I²t ≤ k²S²</p>
            <p>Where:</p>
            <p>I²t = let-through energy of protective device (A²s)</p>
            <p>k = conductor constant (115 for thermoplastic/Cu, 143 for thermosetting/Cu)</p>
            <p>S = conductor cross-sectional area (mm²)</p>
            <p><strong>Cable Withstand Values (k²S²)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>1.5:</strong> 29,756 A²s — 46,010 A²s</li>
              <li><strong>2.5:</strong> 82,656 A²s — 127,806 A²s</li>
              <li><strong>4.0:</strong> 211,600 A²s — 327,184 A²s</li>
              <li><strong>6.0:</strong> 476,100 A²s — 736,164 A²s</li>
              <li><strong>10:</strong> 1,322,500 A²s — 2,044,900 A²s</li>
            </ul>
            <p><strong>MCB Energy Classes</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Class 1:</strong> No energy limitation</li>
              <li><strong>Class 2:</strong> Limited energy let-through</li>
              <li><strong>Class 3:</strong> Greatest energy limitation (UK standard)</li>
            </ul>
            <p><strong>Fuse I²t Characteristics</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Pre-arcing I²t:</strong> Energy before arc forms</li>
              <li><strong>Operating I²t:</strong> Total energy including arc</li>
              <li><strong>Cut-off current:</strong> Limited peak current</li>
            </ul>
            <p><strong>Verification Example</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Cable:</strong> 2.5mm² thermoplastic copper</li>
              <li><strong>k²S² =</strong> 115² × 2.5² = 82,656 A²s</li>
              <li><strong>32A Type B MCB let-through at 3kA:</strong> ~15,000 A²s (typical)</li>
              <li><strong>Check:</strong> 15,000 &lt; 82,656 ✓ Cable protected</li>
            </ul>
            <p><strong>Critical point:</strong> Always verify let-through energy against cable withstand, especially for long cable runs where fault current is reduced and clearance time increased.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Selectivity and RCD Coordination">
            <p>Selectivity (discrimination) ensures that during a fault condition, only the protective device nearest to the fault operates, maintaining supply to healthy circuits. BS 7671 Regulation 536.4 requires that where discrimination is necessary for safety, the characteristics of the devices shall be coordinated accordingly.</p>
            <p><strong>Discrimination Methods</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Current (Ampere):</strong> Upstream device rated higher — Limited range; ratio 1:1.6 minimum</li>
              <li><strong>Time:</strong> Upstream device has time delay — MCCBs with adjustable settings</li>
              <li><strong>Energy (I²t):</strong> Downstream limits energy below upstream pre-arc — Current-limiting devices; fuse/MCB combinations</li>
              <li><strong>Zone selective interlocking:</strong> Communication between devices — Intelligent protection systems</li>
            </ul>
            <p><strong>RCD Types and Selection (BS EN 61008/61009)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Type AC:</strong> Sinusoidal AC only — Basic resistive loads (limited use now)</li>
              <li><strong>Type A:</strong> AC + pulsating DC — IT equipment, LED drivers, single-phase rectifiers</li>
              <li><strong>Type F:</strong> AC + pulsating DC + composite (to 1kHz) — VSDs, single-phase frequency inverters</li>
              <li><strong>Type B:</strong> AC + pulsating DC + smooth DC — Three-phase rectifiers, EV chargers, PV inverters</li>
            </ul>
            <p><strong>RCD Time Delay Ratings</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>General (no delay):</strong> Instantaneous operation</li>
              <li><strong>Type S (selective):</strong> 40-500ms delay at IΔn</li>
              <li><strong>Custom delay:</strong> For discrimination schemes</li>
            </ul>
            <p><strong>RCD Discrimination Rules</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Upstream IΔn ≥ 3× downstream IΔn</li>
              <li>Upstream must be time-delayed (S type)</li>
              <li>Both conditions required for selectivity</li>
            </ul>
            <p><strong>RCD Discrimination Example</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Upstream:</strong> 100mA Type S (time-delayed)</li>
              <li><strong>Downstream:</strong> 30mA general (instantaneous)</li>
              <li><strong>Ratio check:</strong> 100/30 = 3.33:1 ≥ 3:1 ✓</li>
              <li><strong>Time check:</strong> S type has 40-500ms delay ✓</li>
            </ul>
            <p><span> Discrimination achieved - downstream trips first </span></p>
            <p><strong>RCBO Selection Advantages</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Individual circuit protection - fault affects only one circuit</li>
              <li>Integral overcurrent and earth fault protection</li>
              <li>Required for fire alarm, emergency lighting, security circuits per BS 7671</li>
              <li>Simplifies fault finding - tripped device indicates faulty circuit</li>
              <li>Prevents nuisance tripping affecting multiple circuits</li>
            </ul>
            <p><strong>BS 7671 mandate:</strong> Regulation 411.3.3 requires 30mA RCD protection for socket outlets ≤32A in domestic and similar installations, cables concealed in walls at depths &lt;50mm, and cables without earthed metallic covering.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: MCB Selection for Final Circuit</strong>
            </p>
            <p><strong>Scenario:</strong> Select an MCB for a ring final circuit with design current 26A, cable capacity 32A.</p>
            <p>Given data:</p>
            <p>Design current (Ib) = 26A</p>
            <p>Cable current capacity (Iz) = 32A</p>
            <p>PFC at board = 3kA</p>
            <p>Selection criteria:</p>
            <p>Ib ≤ In ≤ Iz → 26A ≤ In ≤ 32A</p>
            <p>Select: 32A Type B MCB</p>
            <p>Verification:</p>
            <p>26A ≤ 32A ≤ 32A ✓</p>
            <p>6kA breaking capacity &gt; 3kA PFC ✓</p>
            <p>Selection valid per BS 7671</p>
            <p>
              <strong>Example 2: I²t Verification</strong>
            </p>
            <p><strong>Scenario:</strong> Verify a 16A Type B MCB protects a 1.5mm² thermoplastic cable.</p>
            <p>Given data:</p>
            <p>Cable: 1.5mm² 70°C thermoplastic copper (k = 115)</p>
            <p>MCB: 16A Type B, Class 3 energy limiting</p>
            <p>PFC at circuit = 2kA</p>
            <p>Cable withstand calculation:</p>
            <p>k²S² = 115² × 1.5² = 13,225 × 2.25 = 29,756 A²s</p>
            <p>MCB let-through at 2kA (from manufacturer data):</p>
            <p>I²t ≈ 8,000 A²s (typical for Class 3)</p>
            <p>8,000 A²s &lt; 29,756 A²s ✓ Cable protected</p>
            <p>
              <strong>Example 3: RCD Discrimination Scheme</strong>
            </p>
            <p><strong>Scenario:</strong> Design RCD discrimination for a consumer unit with multiple final circuits.</p>
            <p>Requirement: Discrimination between main and final circuit RCDs</p>
            <p>Main incomer:</p>
            <p>Select: 100mA Type A-S (time-delayed selective)</p>
            <p>Final circuits (sockets, outdoor):</p>
            <p>Select: 30mA Type A RCBOs (instantaneous)</p>
            <p>Discrimination check:</p>
            <p>Ratio: 100mA / 30mA = 3.33:1 ≥ 3:1 ✓</p>
            <p>Time: Upstream S-type (40-500ms) vs instantaneous ✓</p>
            <p>Full discrimination achieved</p>
            <p>Result: Earth fault on final circuit trips RCBO only,</p>
            <p>main RCD remains closed, other circuits unaffected</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Device Selection Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Determine prospective fault current at installation point</li>
              <li>Select device with breaking capacity &gt; PFC</li>
              <li>Verify In satisfies: Ib ≤ In ≤ Iz</li>
              <li>Check I²t ≤ k²S² for cable protection</li>
              <li>Select appropriate characteristic (B, C, D) for load type</li>
              <li>Consider discrimination with upstream/downstream devices</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Domestic PME max PFC: <strong>16kA</strong> (declared by DNO)</li>
              <li>Max disconnection time (final circuits ≤63A, TN): <strong>0.4 seconds</strong></li>
              <li>RCD discrimination ratio: <strong>≥3:1</strong> with time delay</li>
              <li>k value (70°C PVC/Cu): <strong>115</strong></li>
              <li>k value (90°C XLPE/Cu): <strong>143</strong></li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Assuming 6kA is always adequate</strong> - verify PFC at each location</li>
                <li><strong>Ignoring I²t verification</strong> - essential for fault protection</li>
                <li><strong>Using Type AC RCDs</strong> - Type A minimum now required for most applications</li>
                <li><strong>Forgetting time delay for RCD discrimination</strong> - ratio alone is not sufficient</li>
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
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section6-1")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Distribution board design
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section6-3")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Earthing systems
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule7Section6_2;
