/**
 * Module 4 · Section 3 · Subsection 2 — Protective Device Selection
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   MCB Types B/C/D (BS EN 60898 / 60947-2), MCCBs with adjustable Ir/Im/Isd/Ig
 *   settings, BS 88 HRC fuses (gG/gM/aM/gR), time-current curves and selection
 *   criteria for commercial installations.
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

const TITLE = 'Protective Device Selection - HNC Module 4 Section 3.2';
const DESCRIPTION =
  'Master protective device selection for building services: MCBs (Type B/C/D), MCCBs, HRC fuses (BS 88), time-current characteristics, and selection criteria for commercial installations.';

const quickCheckQuestions = [
  {
    id: 'mcb-type-b',
    question: 'What is the magnetic trip range for a Type B MCB?',
    options: [
      '2-3 × In',
      '10-20 × In',
      '5-10 × In',
      '3-5 × In',
    ],
    correctIndex: 3,
    explanation:
      'Type B MCBs trip magnetically (instantaneously) between 3-5 times their rated current (In). This makes them suitable for resistive loads and domestic circuits where inrush currents are low.',
  },
  {
    id: 'type-c-application',
    question: 'Which application is most suitable for a Type C MCB?',
    options: [
      'Socket outlets',
      'Domestic lighting',
      'Motor circuits',
      'IT equipment',
    ],
    correctIndex: 2,
    explanation:
      'Type C MCBs (5-10 × In magnetic trip) are suitable for motor circuits, fluorescent lighting with inductive ballasts, and other loads with moderate inrush currents.',
  },
  {
    id: 'hrc-fuse-advantage',
    question: 'What is the main advantage of HRC fuses over MCBs for high fault levels?',
    options: [
      'Gateway or protocol converter',
      'Double-shielded or armoured cables',
      'Current-limiting capability',
      'Asbestos Mines of South Africa',
    ],
    correctIndex: 2,
    explanation:
      'HRC (High Rupturing Capacity) fuses are excellent current-limiting devices. They limit let-through energy (I²t) during faults, protecting downstream equipment and cables better than MCBs.',
  },
  {
    id: 'mccb-feature',
    question: 'What feature distinguishes MCCBs from MCBs?',
    options: [
      'Plug-in design',
      'Thermal operation only',
      'Single-pole only',
      'Adjustable trip settings',
    ],
    correctIndex: 3,
    explanation:
      'MCCBs (Moulded Case Circuit Breakers) typically have adjustable thermal (overload) and magnetic (short-circuit) trip settings, allowing configuration for specific applications.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the magnetic trip range for a Type D MCB?',
    options: [
      '3-5 × In',
      '10-20 × In',
      '5-10 × In',
      '20-50 × In',
    ],
    correctAnswer: 1,
    explanation:
      "Type D MCBs have the highest magnetic trip range of 10-20 × In. They're designed for loads with very high inrush currents such as welding equipment, transformers, and X-ray machines.",
  },
  {
    id: 2,
    question: 'Which BS standard covers industrial MCBs with higher breaking capacities?',
    options: [
      'BS 88',
      'BS EN 60898',
      'BS EN 60947-2',
      'BS 3036',
    ],
    correctAnswer: 2,
    explanation:
      'BS EN 60947-2 covers industrial circuit-breakers with breaking capacities typically 10-25kA, compared to BS EN 60898 domestic MCBs at 6-10kA.',
  },
  {
    id: 3,
    question: "What does the 'gG' classification mean for HRC fuses?",
    options: [
      'Complexity and achievement levels of qualifications',
      'Protective device operates (MCB trips)',
      'Viewing waveforms to diagnose complex signal problems',
      'General purpose, full-range breaking capacity',
    ],
    correctAnswer: 3,
    explanation:
      "gG (general purpose, full-range) fuses provide overload and short-circuit protection across their entire operating range. They're the most common type for general circuit protection.",
  },
  {
    id: 4,
    question: 'A Type B MCB rated 20A will trip magnetically at currents above:',
    options: [
      '100A (5 × In)',
      '60A (3 × In)',
      '40A (2 × In)',
      '200A (10 × In)',
    ],
    correctAnswer: 0,
    explanation:
      'Type B MCBs trip magnetically between 3-5 × In. The upper threshold of 5 × 20A = 100A guarantees instantaneous magnetic tripping for fault currents above this value.',
  },
  {
    id: 5,
    question: 'What is the typical fusing factor for BS EN 60898 MCBs?',
    options: [
      '1.25',
      '1.45',
      '1.60',
      '1.13',
    ],
    correctAnswer: 1,
    explanation:
      'MCBs to BS EN 60898 have a conventional tripping current of 1.45 × In (fusing factor 1.45). This means they will definitely trip at 1.45 times their rated current within the conventional time.',
  },
  {
    id: 6,
    question: 'Which fuse type is specifically designed for motor protection?',
    options: [
      'gG fuse',
      'gM fuse',
      'aM fuse',
      'BS 3036 fuse',
    ],
    correctAnswer: 2,
    explanation:
      'aM (motor, partial-range) fuses are designed specifically for motor circuits. They provide short-circuit protection whilst allowing motor starting currents to pass without operation.',
  },
  {
    id: 7,
    question: "What characteristic makes BS 88 HRC fuses 'current-limiting'?",
    options: [
      'L1-E, L2-E, L3-E and phase-to-phase (L1-L2, L2-L3, L1-L3)',
      'Energy efficiency and carbon emissions targets',
      'A condition involving persistent, excessive worry about many different things',
      'They clear faults before the current reaches its prospective peak',
    ],
    correctAnswer: 3,
    explanation:
      'Current-limiting fuses operate so quickly that they clear the fault in the first half-cycle, before the prospective fault current reaches its peak. This significantly reduces equipment stress and I²t let-through.',
  },
  {
    id: 8,
    question: 'For discrimination between two MCBs, what is the general current ratio requirement?',
    options: [
      '2:1',
      '3:1',
      '1.5:1',
      'They cannot discriminate reliably',
    ],
    correctAnswer: 0,
    explanation:
      'MCBs require approximately 2:1 current ratio for reliable discrimination at overload currents. However, for fault currents in the magnetic region, discrimination is often not achievable.',
  },
  {
    id: 9,
    question:
      'What is the primary selection criterion when choosing between Type B and Type C MCBs?',
    options: [
      'Voice alarm and public address systems',
      'Expected inrush current of load',
      'Traditional with specialist subcontracts',
      'Architectural enhancement and identity',
    ],
    correctAnswer: 1,
    explanation:
      "The key selection criterion is the load's inrush current. Type B (3-5 × In) suits resistive loads; Type C (5-10 × In) suits loads with higher inrush like motors and fluorescent lighting.",
  },
  {
    id: 10,
    question:
      'An MCCB is set with Ir = 0.8 and Im = 10. If In = 100A, at what current will magnetic tripping occur?',
    options: [
      '80A',
      '100A',
      '800A',
      '1000A',
    ],
    correctAnswer: 2,
    explanation:
      'Ir (thermal setting) = 0.8 × 100A = 80A continuous rating. Im (magnetic setting) = 10 × Ir = 10 × 80A = 800A magnetic trip threshold.',
  },
];

const faqs = [
  {
    question: 'When should I use HRC fuses instead of MCBs?',
    answer:
      'Use HRC fuses when: the prospective fault current exceeds MCB breaking capacity (>10kA typically); superior current-limiting is needed to protect sensitive equipment; high discrimination ratios are required with downstream MCBs; the installation is close to transformers with very high fault levels. HRC fuses to BS 88 typically have 80kA+ breaking capacity and excellent I²t limitation.',
  },
  {
    question: 'How do I select between Type B, C, and D MCBs?',
    answer:
      "Type B (3-5 × In): Resistive loads, domestic lighting, socket circuits - low inrush. Type C (5-10 × In): Small motors, fluorescent lighting with magnetic ballasts, IT equipment - moderate inrush. Type D (10-20 × In): Transformers, welding equipment, X-ray machines, motor starting - high inrush. Always check the actual inrush current of the load doesn't exceed the magnetic threshold.",
  },
  {
    question: "What's the difference between Icu and Ics for MCCBs?",
    answer:
      'Icu (ultimate breaking capacity) is the maximum fault current the MCCB can interrupt, but it may be damaged afterwards. Ics (service breaking capacity) is the fault current level at which the MCCB can interrupt repeatedly without damage, expressed as a percentage of Icu (typically 50%, 75%, or 100%). For critical applications, specify based on Ics to ensure the MCCB remains serviceable after a fault.',
  },
  {
    question: 'Why are BS 3036 rewirable fuses no longer recommended?',
    answer:
      "BS 3036 semi-enclosed fuses have several limitations: fusing factor of 2.0 (much higher than 1.45 for MCBs) requiring oversized cables; no current-limiting capability; low breaking capacity (typically 1-4kA); risk of incorrect fuse wire replacement; no trip indication. They're permitted in existing installations but not recommended for new work.",
  },
  {
    question: 'How do I verify an MCB is suitable for a specific location?',
    answer:
      "Check: 1) In ≥ Ib (design current); 2) In ≤ Iz (cable capacity after derating); 3) Icn ≥ Ipf (breaking capacity exceeds prospective fault current); 4) Type suits load characteristics (inrush); 5) Zs meets disconnection time requirements from manufacturer's data; 6) Discrimination with upstream device if required.",
  },
  {
    question: 'What are the advantages of MCCBs over MCBs in commercial installations?',
    answer:
      "MCCBs offer: higher breaking capacities (25-150kA); adjustable thermal and magnetic settings for precise coordination; draw-out versions for easy maintenance; electronic trip units with comprehensive protection functions (ground fault, phase imbalance); communication capabilities for building management systems; better discrimination with downstream devices. They're essential for main switchboards and sub-distribution.",
  },
];

const HNCModule4Section3_2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 4 · Section 3 · Subsection 2"
            title="Protective Device Selection"
            description="MCBs, MCCBs, HRC fuses — characteristics, selection criteria, and application guidelines."
            tone="purple"
          />

          <TLDR
            points={[
              'MCBs (BS EN 60898): Type B (3–5× I_n), C (5–10×), D (10–20×) — match the curve to the load characteristic.',
              'MCCBs (BS EN 60947-2): adjustable thermal and magnetic settings, breaking capacities up to 200&nbsp;kA — used for sub-mains and motor starting.',
              'HRC fuses (BS 88-2 / -3 / gG / gM): current-limiting let-through reduces I²t — essential for high-PSCC origins and motor circuits.',
              'RCBOs combine MCB + RCD in one module — preferred over RCD-protected MCB groups because faults trip only the affected circuit.',
              'BS 7671 Reg 432.1 requires the device to be of the appropriate type — not just sized to I_b but matched to the load and the fault scenario.',
            ]}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 432.1 (Nature of protective devices)"
            clause="A protective device shall be of the appropriate type indicated in Regulations 432.1 to 432.3. This establishes that selection of protective devices shall comply with the specific types and characteristics set out in those sub-regulations."
            meaning={
              <>
                Reg 432.1 makes the device-type choice explicit. As designer you justify each
                selection against load characteristic (resistive, inductive, motor, capacitor,
                non-linear), prospective fault current, breaking capacity, discrimination with
                upstream and downstream devices, and the relevant standard (BS EN 60898 for
                MCBs, BS EN 60947-2 for MCCBs, BS 88 for HRC fuses, BS EN 61009 for RCBOs).
                Pick the wrong device class and either fault clearance or coordination fails —
                often only discovered at first fault.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 432.1; BS EN 60898; BS EN 60947-2; BS 88-2/3; BS EN 61009."
          />

          <LearningOutcomes
            outcomes={[
              'Differentiate between MCB types B, C, and D and their applications',
              'Interpret time-current characteristic curves for protective devices',
              'Select appropriate HRC fuses for high fault level applications',
              'Understand MCCB adjustable settings and their purposes',
              'Apply selection criteria for protective devices in building services',
              'Compare fusing factors and their impact on cable sizing',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock title="Miniature Circuit Breakers (MCBs)">
            <p>
              MCBs combine thermal overload protection with magnetic short-circuit protection in a
              compact device. The type designation indicates the magnetic trip characteristic.
            </p>
            <p>
              <strong>MCB type characteristics (type / magnetic trip / applications):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Type B:</strong> 3-5 × In — resistive loads, lighting, socket outlets,
                domestic
              </li>
              <li>
                <strong>Type C:</strong> 5-10 × In — motors, fluorescent lighting, IT equipment
              </li>
              <li>
                <strong>Type D:</strong> 10-20 × In — transformers, welding, X-ray, high inrush
              </li>
            </ul>
            <p>
              <strong>Thermal element:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Bimetallic strip responds to heating</li>
              <li>Provides time-delayed overload protection</li>
              <li>Trips at 1.45 × In (conventional current)</li>
              <li>Temperature compensated designs available</li>
            </ul>
            <p>
              <strong>Magnetic element:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Solenoid responds to high currents</li>
              <li>Provides instantaneous fault protection</li>
              <li>Trip point depends on MCB type</li>
              <li>Operates typically within 10ms</li>
            </ul>
            <p>
              <strong>MCB standards comparison (standard / typical Icn / application):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>BS EN 60898 — 6kA, 10kA — domestic, light commercial</li>
              <li>BS EN 60947-2 — 10kA - 25kA — industrial, commercial</li>
            </ul>
            <p>
              <strong>Selection tip:</strong> Always verify the MCB breaking capacity exceeds the
              prospective fault current at the installation point.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Moulded Case Circuit Breakers (MCCBs)">
            <p>
              MCCBs are used for higher current ratings and fault levels than MCBs. They offer
              adjustable settings and are essential for main distribution and sub-distribution
              boards.
            </p>
            <p>
              <strong>MCCB adjustable settings (setting / symbol / typical range / purpose):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Thermal (overload) — Ir — 0.4-1.0 × In — sets continuous current rating</li>
              <li>Magnetic (short-circuit) — Im — 5-10 × Ir — sets instantaneous trip level</li>
              <li>Short-time delay — Isd — 2-10 × Ir — allows downstream discrimination</li>
              <li>Ground fault — Ig — 0.2-1.0 × In — earth fault protection</li>
            </ul>
            <p>
              <strong>MCCB advantages:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Higher breaking capacities (25-150kA)</li>
              <li>Adjustable trip settings</li>
              <li>Draw-out versions for maintenance</li>
              <li>Electronic trip units available</li>
              <li>Remote communication capability</li>
            </ul>
            <p>
              <strong>Typical applications:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Main incoming devices (100-3200A)</li>
              <li>Sub-main distribution</li>
              <li>Motor control centres</li>
              <li>Generator connections</li>
              <li>Busbar trunking feeds</li>
            </ul>
            <p>
              <strong>Breaking capacity ratings:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Icu:</strong> ultimate breaking capacity — maximum fault current, may
                damage MCCB
              </li>
              <li>
                <strong>Ics:</strong> service breaking capacity — fault current allowing continued
                service
              </li>
              <li>
                <strong>Icw:</strong> short-time withstand — current that can be carried for a
                specified time
              </li>
            </ul>
            <p>
              <strong>Design note:</strong> For critical applications, base selection on Ics not
              Icu to ensure the MCCB remains serviceable after clearing a fault.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="HRC Fuses (BS 88)">
            <p>
              High Rupturing Capacity fuses to BS 88 are the preferred protection for high fault
              level locations. They provide excellent current-limiting capability and very high
              breaking capacities.
            </p>
            <p>
              <strong>HRC fuse classifications (type / description / application):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>gG</strong> — general purpose, full-range — cable protection, general
                circuits
              </li>
              <li>
                <strong>gM</strong> — motor circuit, full-range — motor circuits with overload
                relay
              </li>
              <li>
                <strong>aM</strong> — motor circuit, partial-range — motor short-circuit only
              </li>
              <li>
                <strong>gR</strong> — semiconductor protection — rectifiers, VSDs, UPS
              </li>
            </ul>
            <p>
              <strong>Current-limiting operation:</strong> HRC fuses are excellent current-limiting
              devices. During a fault, the fuse element melts and an arc forms within the silica
              sand filling. This arc rapidly increases resistance, limiting the fault current
              before it reaches its prospective peak.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cut-off current:</strong> peak let-through current during fault
              </li>
              <li>
                <strong>I²t value:</strong> energy let-through (pre-arcing + arcing)
              </li>
              <li>
                <strong>Sub-cycle clearance:</strong> typically &lt;5ms for high faults
              </li>
            </ul>
            <p>
              <strong>BS 88 fuse sizes (size / current range / breaking capacity):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>000 (Tag) — 2A - 100A — 80kA</li>
              <li>00 — 6A - 160A — 80kA</li>
              <li>1 — 63A - 250A — 80kA</li>
              <li>2 — 125A - 400A — 80kA</li>
              <li>3 — 315A - 630A — 80kA</li>
              <li>4 — 500A - 1250A — 80kA</li>
            </ul>
            <p>
              <strong>Key advantage:</strong> HRC fuses provide excellent discrimination with
              downstream MCBs due to their different time-current characteristics.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Selection Criteria and Time-Current Curves">
            <p>
              Protective device selection requires consideration of multiple factors. Time-current
              characteristic curves are essential tools for verifying protection and
              discrimination.
            </p>
            <p>
              <strong>Selection checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1. Current rating:</strong> In ≥ Ib and In ≤ Iz (after derating factors)
              </li>
              <li>
                <strong>2. Breaking capacity:</strong> Icn ≥ Ipf at installation point
              </li>
              <li>
                <strong>3. Type/characteristics:</strong> appropriate for load inrush current
              </li>
              <li>
                <strong>4. Disconnection time:</strong> Zs meets requirements for device type
              </li>
              <li>
                <strong>5. Discrimination:</strong> coordinates with upstream/downstream devices
              </li>
              <li>
                <strong>6. Number of poles:</strong> appropriate for circuit configuration
              </li>
            </ul>
            <p>
              <strong>Reading time-current curves:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>X-axis:</strong> current (usually as multiple of In or absolute amps)
              </li>
              <li>
                <strong>Y-axis:</strong> operating time (logarithmic scale, seconds)
              </li>
              <li>
                <strong>Thermal region:</strong> sloping curve showing inverse-time characteristic
              </li>
              <li>
                <strong>Magnetic region:</strong> vertical drop showing instantaneous operation
              </li>
              <li>
                <strong>Tolerance bands:</strong> upper and lower limits of operation
              </li>
            </ul>
            <p>
              <strong>Fusing factors:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>MCB (BS EN 60898):</strong> 1.45
              </li>
              <li>
                <strong>HRC fuse (BS 88):</strong> 1.6
              </li>
              <li>
                <strong>BS 3036 rewirable:</strong> 2.0
              </li>
            </ul>
            <p>Higher fusing factor = larger cable required for same device rating.</p>
            <p>
              <strong>Impact on cable sizing:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>MCB: Iz ≥ In (factor 1.45 built in)</li>
              <li>BS 88: Iz ≥ In × 1.1 typically</li>
              <li>BS 3036: Iz ≥ In × 1.38</li>
            </ul>
            <p>
              <strong>Common applications summary (application / recommended device / reason):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Lighting (LED/resistive) — Type B MCB — low inrush, good Zs sensitivity</li>
              <li>Socket outlets — Type B MCB + RCD — mixed loads, additional protection</li>
              <li>Small AC motors — Type C MCB — 6-8× starting current</li>
              <li>Large motors — aM fuse + contactor + OL — dedicated motor protection</li>
              <li>Main switchboard — MCCB or HRC fuse — high fault level, adjustability</li>
              <li>Transformer secondary — HRC fuse — highest fault level point</li>
            </ul>
            <p>
              <strong>Best practice:</strong> Always obtain manufacturer's time-current data and
              verify discrimination using overlaid curves or manufacturer's selectivity tables.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1 — MCB type selection:</strong> A 3kW three-phase motor (400V, 0.85
              pf) has a starting current of 6× FLC. Select the appropriate MCB type.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Full load current: I = P/(√3 × V × pf)</li>
              <li>
                I = 3000/(1.732 × 400 × 0.85) = <strong>5.1A</strong>
              </li>
              <li>
                Starting current = 6 × 5.1A = <strong>30.6A</strong>
              </li>
              <li>MCB rating: select 6A (next standard above 5.1A)</li>
              <li>Type B (3-5×In): trips at 18-30A — may trip on start (30.6A)</li>
              <li>Type C (5-10×In): trips at 30-60A — will allow 30.6A start current</li>
              <li>Select 6A Type C MCB</li>
            </ul>
            <p>
              <strong>Example 2 — MCCB settings:</strong> An MCCB with In = 250A protects a busbar
              feeding several final circuits. The cable Iz is 270A and normal load is 180A.
              Calculate appropriate settings.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Frame size: In = 250A</li>
              <li>Thermal setting (Ir): must be ≥ design current (180A) and ≤ cable Iz (270A)</li>
              <li>
                Set Ir = 0.8 × 250A = <strong>200A</strong>
              </li>
              <li>Magnetic setting (Im): typical range 5-10 × Ir</li>
              <li>
                Set Im = 8 × Ir = 8 × 200A = <strong>1600A</strong>
              </li>
              <li>180A ≤ 200A ≤ 270A — valid coordination</li>
            </ul>
            <p>
              <strong>Example 3 — HRC fuse vs MCB selection:</strong> A sub-distribution board is
              located 5m from a 500kVA transformer. Ipf = 25kA. Which device is appropriate?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Prospective fault current: Ipf = <strong>25kA</strong>
              </li>
              <li>BS EN 60898 MCB: max 10kA — inadequate</li>
              <li>BS EN 60947-2 MCB: max 25kA — marginal</li>
              <li>HRC fuse (BS 88): 80kA — adequate</li>
              <li>HRC fuse-switch recommended for incomer</li>
              <li>MCB outgoing circuits OK (reduced Ipf)</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Device selection summary:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Type B MCB:</strong> default for domestic/resistive — 3-5 × In
              </li>
              <li>
                <strong>Type C MCB:</strong> motors, fluorescent, IT — 5-10 × In
              </li>
              <li>
                <strong>Type D MCB:</strong> transformers, welding — 10-20 × In
              </li>
              <li>
                <strong>MCCB:</strong> main distribution, adjustable settings
              </li>
              <li>
                <strong>HRC fuse:</strong> high fault levels, current-limiting
              </li>
            </ul>
            <p>
              <strong>Key values to remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                MCB fusing factor: <strong>1.45</strong>
              </li>
              <li>
                HRC fusing factor: <strong>1.6</strong>
              </li>
              <li>
                BS 3036 fusing factor: <strong>2.0</strong>
              </li>
              <li>
                BS EN 60898 MCB breaking: <strong>6-10kA</strong>
              </li>
              <li>
                BS 88 HRC breaking: <strong>80kA+</strong>
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Wrong MCB type for load</strong> — Type B may nuisance trip on motor
                  start
                </li>
                <li>
                  <strong>Ignoring fault level</strong> — always verify breaking capacity
                </li>
                <li>
                  <strong>Forgetting fusing factors</strong> — affects cable sizing calculation
                </li>
                <li>
                  <strong>Not checking discrimination</strong> — may cause unnecessary outages
                </li>
              </ul>
            }
            doInstead="Match the MCB type to the actual load inrush profile, confirm Icn ≥ prospective fault current at the device, apply the correct fusing factor when sizing the cable, and run a discrimination check (curves or manufacturer tables) before signing off the design."
          />

          <SectionRule />

          <Scenario
            title="Sub-main protection — choosing between MCCB and HRC fuse for high PSCC"
            situation={
              <>
                A 250&nbsp;A sub-main feeds a workshop DB. Prospective short-circuit current at
                the main switchpanel is 25&nbsp;kA. Discrimination with the 32&nbsp;A Type C MCBs
                downstream is required. The choice is between a 250&nbsp;A MCCB (36&nbsp;kA Icu)
                with adjustable instantaneous trip, or an HRC gG fuse (BS 88-2, 80&nbsp;kA
                breaking) with a 250&nbsp;A switch-fuse housing.
              </>
            }
            whatToDo={
              <>
                Both meet PSCC. The MCCB offers adjustable thermal (typically 0.7–1.0 × I_n) and
                instantaneous (typically 5–10 × I_n) settings — great for tuning discrimination
                and easy to reset after a trip. The HRC fuse offers stronger current-limiting
                (let-through I²t much lower for the downstream cable adiabatic check), narrower
                let-through energy band, and discriminates with downstream MCBs more reliably.
                For a workshop with frequent fault risk and competent maintenance, the MCCB is
                often preferred for resettability. For a cleaner discrimination story and
                cheaper plant, the HRC fuse wins. Document the selection and the discrimination
                analysis on the cable schedule per Reg 432.1.
              </>
            }
            whyItMatters={
              <>
                Reg 432.1 makes the device-type decision a design choice. Pick the wrong device
                class and either the fault clearance trips the upstream as well (loss of
                discrimination) or fails to clear within disconnection time. Both are defendable
                design failures.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'MCBs (BS EN 60898): Type B / C / D selected by load inrush characteristic, breaking capacities typically 6 / 10&nbsp;kA.',
              'MCCBs (BS EN 60947-2): adjustable thermal and magnetic settings, breaking up to 200&nbsp;kA — the workhorse for sub-mains.',
              'HRC fuses (BS 88): current-limiting let-through, narrow tolerance, high breaking capacity — preferred for high-PSCC origins and motor circuits.',
              'RCBOs (BS EN 61009): MCB + RCD combined — preferred over shared RCD groups because a fault trips only the affected circuit.',
              'Reg 432.1 mandates appropriate device type: match curve to load, breaking capacity to PSCC, and standard to application.',
              'Discrimination with downstream devices is part of selection — fuse curves discriminate more reliably than MCB curves at high fault levels.',
              'Z_s_max (Table 41.3) depends on device type and curve — current A4:2026 values include B32 = 1.37&nbsp;Ω, C32 = 0.69&nbsp;Ω.',
              'Document type, rating, curve, breaking capacity and discrimination analysis on the schedule of test results — Part 6 audits all of it.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section3-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Circuit protection principles
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section3-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Fault current calculations
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule4Section3_2;
