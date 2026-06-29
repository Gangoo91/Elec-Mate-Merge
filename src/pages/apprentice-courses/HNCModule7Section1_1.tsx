/**
 * Module 7 · Section 1 · Subsection 1 — Switchgear Selection
 * HNC Electrical Engineering for Building Services (Power and Lighting Systems)
 *   LV switchboards, MCCB vs ACB, rated currents, short-circuit ratings, and type-tested assemblies
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

const TITLE = 'Switchgear Selection - HNC Module 7 Section 1.1';
const DESCRIPTION =
  'Master LV switchgear selection for building services projects: LV switchboard types, MCCB vs ACB selection criteria, rated currents, short-circuit ratings, forms of separation, and type-tested assemblies to BS EN 61439.';

const quickCheckQuestions = [
  {
    id: 'switchboard-definition',
    question: 'What is the primary function of an LV switchboard?',
    options: [
      'To step the incoming supply voltage down to a safe working level',
      'To store electrical energy for use during a mains supply failure',
      'To correct the power factor of the incoming supply',
      'To distribute and control electrical power to downstream circuits',
    ],
    correctIndex: 3,
    explanation:
      'An LV switchboard receives power from the incoming supply (transformer or main incomer) and distributes it to downstream circuits via protective devices, providing switching, protection, and isolation functions.',
  },
  {
    id: 'mccb-acb-difference',
    question: 'What is the key operational difference between an MCCB and an ACB?',
    options: [
      'MCCBs can interrupt higher fault currents than any ACB',
      'ACBs are withdrawable for maintenance without de-energising the busbar',
      'MCCBs are only available with fixed, non-adjustable trip settings',
      'ACBs can only be used on single-phase supplies up to 250 A',
    ],
    correctIndex: 1,
    explanation:
      'ACBs (Air Circuit Breakers) are typically withdrawable, allowing removal for maintenance while the busbar remains energised. MCCBs are generally fixed-mount devices requiring isolation of the supply for maintenance.',
  },
  {
    id: 'icu-ics-meaning',
    question: 'What does Icu represent in switchgear ratings?',
    options: [
      'Rated continuous operating current of the device',
      'Rated insulation voltage of the device',
      'Rated ultimate short-circuit breaking capacity',
      'Rated short-time withstand current of the busbars',
    ],
    correctIndex: 2,
    explanation:
      'Icu (rated ultimate short-circuit breaking capacity) is the maximum fault current the device can safely interrupt. After breaking at Icu, the device may require inspection or replacement. Ics is the service short-circuit breaking capacity for continued operation.',
  },
  {
    id: 'form-separation',
    question: 'What does Form 4 separation in a switchboard provide?',
    options: [
      'Separation of busbars and functional units, plus separation of all terminals from each other',
      'Separation of the busbars from the functional units only',
      'No internal separation between any parts of the assembly',
      'Separation of the functional units from each other, but not their terminals',
    ],
    correctIndex: 0,
    explanation:
      'Form 4 provides the highest level of internal separation: busbars separated from functional units, functional units separated from each other, and terminals separated from each other. This allows work on one circuit while others remain live.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'According to BS EN 61439, what is a Type-Tested Assembly (TTA)?',
    options: [
      'An assembly tested only by the manufacturer',
      'An assembly conforming to an established design verified by type tests',
      'An assembly that requires on-site testing only',
      'An assembly with no specified test requirements',
    ],
    correctAnswer: 1,
    explanation:
      'A TTA is a switchgear assembly conforming to an established design, verified to meet BS EN 61439 requirements through type tests. The manufacturer holds test evidence for the design, ensuring compliance without requiring individual unit testing.',
  },
  {
    id: 2,
    question: 'When would you typically specify an ACB over an MCCB for main incomer protection?',
    options: [
      'When the rated current is below 250 A and space is limited',
      'When the lowest possible capital cost is the main priority',
      'When withdrawable functionality and high breaking capacity are required',
      'When a fixed, non-adjustable trip characteristic is preferred',
    ],
    correctAnswer: 2,
    explanation:
      'ACBs are specified for main incomers where withdrawable functionality enables maintenance without complete shutdown, and where high breaking capacities (up to 150kA) are needed. They also offer comprehensive protection settings and communication capabilities.',
  },
  {
    id: 3,
    question: 'What is the typical maximum rated current (In) range for MCCBs?',
    options: [
      '63A to 250A',
      'Up to 63A',
      'Above 2000A only',
      '100A to 1600A',
    ],
    correctAnswer: 3,
    explanation:
      'MCCBs typically range from 100A to 1600A rated current, with some manufacturers offering frames up to 2500A or 3200A. Below 100A, MCBs are generally more economical; above 1600A, ACBs become more practical.',
  },
  {
    id: 4,
    question: 'What is the significance of Ics/Icu = 100% on a circuit breaker?',
    options: [
      'The device can continue normal operation after interrupting at its ultimate breaking capacity',
      'The device must be replaced immediately after any fault interruption',
      'The rated current equals the rated breaking capacity of the device',
      'The device can only interrupt faults up to half its rated capacity',
    ],
    correctAnswer: 0,
    explanation:
      'When Ics equals Icu (100%), the circuit breaker can interrupt at its maximum rated fault level and remain serviceable for continued operation without inspection or replacement. Lower percentages indicate reduced capability after ultimate fault interruption.',
  },
  {
    id: 5,
    question:
      'Which form of internal separation requires barriers between the terminals of all functional units?',
    options: [
      'Form 2',
      'Form 4',
      'Form 1',
      'Form 3',
    ],
    correctAnswer: 1,
    explanation:
      "Form 4 requires separation of terminals belonging to different functional units from each other. Form 4a separates terminals in a common space, while Form 4b provides individual enclosure for each functional unit's terminals.",
  },
  {
    id: 6,
    question: 'What does the short-circuit withstand rating (Icw) indicate for a switchboard?',
    options: [
      'The maximum continuous current the busbars can carry indefinitely',
      'The peak fault current the main incomer can close onto safely',
      'Maximum fault current the busbars can carry for a specified time without damage',
      'The rated operational voltage the assembly can insulate against',
    ],
    correctAnswer: 2,
    explanation:
      'Icw (rated short-time withstand current) is the fault current the switchboard busbars and structure can carry for a specified duration (typically 1 second) without damage. This ensures discrimination by allowing upstream devices time to operate.',
  },
  {
    id: 7,
    question:
      'For a 2000A main LV switchboard with 50kA prospective fault current, which device type is most appropriate for the main incomer?',
    options: [
      'MCB',
      'MCCB 400A frame',
      'MCCB 2500A frame',
      'ACB',
    ],
    correctAnswer: 3,
    explanation:
      'At 2000A with 50kA fault level, an ACB is most appropriate. It provides adequate current rating, sufficient breaking capacity, withdrawable functionality for maintenance, and comprehensive protection features essential for main incomer applications.',
  },
  {
    id: 8,
    question: 'What is a Partially Type-Tested Assembly (PTTA)?',
    options: [
      'An assembly using type-tested components but requiring design verification for non-tested arrangements',
      'An assembly that has passed only routine tests on every individual unit produced',
      'An assembly that is exempt from any verification under BS EN 61439',
      'An assembly verified solely by on-site testing after installation',
    ],
    correctAnswer: 0,
    explanation:
      'A PTTA uses type-tested components and arrangements but includes elements not covered by type tests. The manufacturer must use design rules derived from type tests to verify compliance, with calculations and assessment replacing full testing.',
  },
  {
    id: 9,
    question:
      'Which standard specifically covers low-voltage switchgear and controlgear assemblies?',
    options: [
      'BS 7671',
      'BS EN 61439',
      'BS EN 60947',
      'BS EN 62271',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN 61439 covers low-voltage switchgear and controlgear assemblies (switchboards, distribution boards, motor control centres). BS EN 60947 covers individual switching devices, while BS 7671 is the wiring regulations.',
  },
  {
    id: 10,
    question: 'When selecting an MCCB, what does the frame size primarily determine?',
    options: [
      'The IP rating of the enclosure the device is mounted within',
      'Whether the device is withdrawable or fixed-mounted',
      'The maximum settable current rating and breaking capacity range',
      'The number of poles available on the device',
    ],
    correctAnswer: 2,
    explanation:
      'Frame size determines the maximum rated current achievable with that frame (e.g., 250A frame, 630A frame) and typically defines the available breaking capacity options. Larger frames provide higher current ratings and usually higher breaking capacities.',
  },
  {
    id: 11,
    question: 'What advantage does Form 3 separation provide over Form 2?',
    options: [
      'A higher rated short-circuit withstand current for the busbars',
      'The ability to withdraw outgoing devices without isolating the supply',
      'A higher IP rating for the overall switchboard enclosure',
      'Separation of terminals from busbars in addition to functional unit separation',
    ],
    correctAnswer: 3,
    explanation:
      'Form 3 adds terminal separation from busbars to the functional unit separation of Form 2. This allows cable termination work while other circuits remain energised, improving safety and reducing downtime during modifications.',
  },
  {
    id: 12,
    question: 'For discrimination studies, which MCCB characteristic is most critical?',
    options: [
      'Time-current characteristics and adjustable settings',
      'The physical frame size and mounting arrangement',
      'The IP rating of the enclosure housing the device',
      'The rated insulation voltage of the device',
    ],
    correctAnswer: 0,
    explanation:
      'Time-current characteristics define how the MCCB responds to overcurrent. Adjustable thermal (Ir) and magnetic (Im) settings enable coordination with upstream and downstream devices, ensuring the device nearest the fault operates first.',
  },
];

const faqs = [
  {
    question: 'When should I specify an ACB instead of an MCCB?',
    answer:
      'Specify ACBs for main incomers and major submains where: rated current exceeds 1600A; withdrawable functionality is required for maintenance without shutdown; high breaking capacities (&gt;50kA) are needed; comprehensive protection settings and communication interfaces are required; or where the installation demands enhanced safety features. For currents below 800A with moderate fault levels, MCCBs are often more economical while still providing adequate protection.',
  },
  {
    question: 'What factors determine the required form of separation?',
    answer:
      'Form selection depends on: operational requirements (can work proceed on one circuit while others are live?); maintenance frequency; safety policy and personnel competence; criticality of supply continuity; and client specification. Form 1 suits simple installations; Form 2 for typical commercial applications; Form 3/4 for critical facilities, hospitals, data centres, or where circuits must be worked on with adjacent circuits live.',
  },
  {
    question: 'How do I verify that a switchboard meets BS EN 61439?',
    answer:
      "Request the manufacturer's Declaration of Conformity and technical documentation showing: design verification (type tests or design rules); routine test results for the specific assembly; temperature-rise verification for the configuration supplied; short-circuit withstand evidence; and IP rating test evidence. For TTAs, type test reports should be available. For PTTAs, design calculations must demonstrate compliance.",
  },
  {
    question: 'What is the relationship between Icu and Ics?',
    answer:
      'Icu (ultimate) is the maximum fault current the device can interrupt, but operation at this level may require inspection or replacement. Ics (service) is the fault level at which the device remains fully serviceable after operation. The relationship (Ics as percentage of Icu) indicates reliability: 100% means full serviceability at maximum rating; 50% means serviceability is only assured up to half the ultimate rating.',
  },
  {
    question: 'How do I select the correct MCCB breaking capacity?',
    answer:
      "Calculate the prospective short-circuit current (PSCC) at the installation point using fault level calculations or measurements. The MCCB's Icu must exceed the PSCC. Consider: transformer rating and impedance; cable length and impedance to the board; any current-limiting devices upstream. Apply appropriate safety margins and consider future increases in supply capacity. Use Ics for the expected service fault level.",
  },
  {
    question: 'What documentation should accompany a type-tested assembly?',
    answer:
      'BS EN 61439 requires: identification of the assembly; circuit diagrams and wiring schedules; technical characteristics (voltage, current, Icw, IP rating); installation, operation, and maintenance instructions; routine test reports; Declaration of Conformity; and for TTAs, reference to the type test report. Additional project-specific documentation may include coordination studies and setting schedules.',
  },
];

const HNCModule7Section1_1 = () => {
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
            eyebrow="Module 7 · Section 1 · Subsection 1"
            title="Switchgear Selection"
            description="LV switchboards, MCCB vs ACB, rated currents, short-circuit ratings, and type-tested assemblies"
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              "Identify LV switchboard configurations and their applications",
              "Compare MCCB and ACB characteristics for selection",
              "Apply rated current (In) and breaking capacity (Icu/Ics) criteria",
              "Specify forms of separation (Forms 1-4) appropriately",
              "Distinguish between TTA and PTTA under BS EN 61439",
              "Select switchgear based on fault levels and operational requirements",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="LV Switchboard Fundamentals">
            <p>Low voltage switchboards are the central distribution point in electrical installations, receiving power from transformers or main supplies and distributing it to downstream circuits. Proper selection ensures safe operation, adequate protection, and efficient power distribution.</p>
            <p><strong>LV Switchboard Components:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Main incomer:</strong> ACB or MCCB receiving supply from transformer or upstream board</li>
              <li><strong>Busbar system:</strong> Copper or aluminium bars distributing current to outgoing devices</li>
              <li><strong>Outgoing circuits:</strong> MCCBs, MCBs, or fused switches protecting downstream circuits</li>
              <li><strong>Metering:</strong> Current transformers and meters for monitoring and billing</li>
              <li><strong>Protection relays:</strong> Electronic devices providing advanced protection functions</li>
            </ul>
            <p><strong>Switchboard Configurations</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Single-ended:</strong> Single incomer feeding all outgoing circuits — Small commercial, non-critical loads</li>
              <li><strong>Double-ended:</strong> Two incomers with bus section switch — Enhanced reliability, dual supplies</li>
              <li><strong>Ring main:</strong> Multiple interconnected boards — Large sites, industrial facilities</li>
              <li><strong>With standby:</strong> Generator or UPS integration — Critical facilities, hospitals, data centres</li>
            </ul>
            <p><strong>Design consideration:</strong> Switchboard configuration directly impacts reliability, maintenance flexibility, and capital cost. Match configuration to the criticality and operational requirements of the installation.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="MCCB vs ACB Selection Criteria">
            <p>The choice between Moulded Case Circuit Breakers (MCCBs) and Air Circuit Breakers (ACBs) depends on rated current, fault level, operational requirements, and budget. Each device type has distinct characteristics suited to specific applications.</p>
            <p><strong>MCCB Characteristics</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Rated current: 100A to 1600A typical</li>
              <li>Breaking capacity: up to 70kA</li>
              <li>Fixed or plug-in mounting</li>
              <li>Thermal-magnetic or electronic trip</li>
              <li>Compact design, cost-effective</li>
              <li>Limited adjustability on basic units</li>
            </ul>
            <p><strong>ACB Characteristics</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Rated current: 800A to 6300A</li>
              <li>Breaking capacity: up to 150kA</li>
              <li>Withdrawable for maintenance</li>
              <li>Electronic trip unit standard</li>
              <li>Comprehensive protection settings</li>
              <li>Communication interfaces available</li>
            </ul>
            <p><strong>Selection Decision Matrix</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Rated current:</strong> &lt;1600A — &gt;800A, especially &gt;1600A</li>
              <li><strong>Fault level:</strong> &lt;50kA typical — &gt;50kA or high reliability required</li>
              <li><strong>Maintenance:</strong> Shutdown acceptable — Withdrawable needed, live busbar work</li>
              <li><strong>Protection:</strong> Basic overcurrent protection — Advanced functions, communication</li>
              <li><strong>Budget:</strong> Cost-sensitive applications — Reliability justifies premium</li>
            </ul>
            <p><strong>Overlap Zone: 800A to 1600A</strong></p>
            <p>In the 800A-1600A range, both MCCB and ACB are viable. The decision hinges on: withdrawable requirement (ACB); fault level (&gt;50kA favours ACB); protection complexity (ACB for advanced settings); and total cost of ownership including maintenance downtime.</p>
            <p><strong>Selection tip:</strong> For main incomers in commercial and industrial installations, ACBs provide superior reliability and maintenance flexibility despite higher initial cost.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Rated Currents and Short-Circuit Ratings">
            <p>Understanding the rated values of switchgear is essential for correct selection. These ratings ensure the device can handle normal operation and fault conditions without damage or danger.</p>
            <p><strong>Key Rated Values</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>In:</strong> Rated current — Maximum continuous current without exceeding temperature rise limits</li>
              <li><strong>Ue:</strong> Rated operational voltage — Voltage at which device operates (typically 400V for LV)</li>
              <li><strong>Icu:</strong> Ultimate short-circuit breaking capacity — Maximum fault current device can interrupt (may require replacement after)</li>
              <li><strong>Ics:</strong> Service short-circuit breaking capacity — Fault current device can interrupt and remain serviceable</li>
              <li><strong>Icw:</strong> Short-time withstand current — Fault current withstood for specified duration (typically 1s) without damage</li>
              <li><strong>Icm:</strong> Rated short-circuit making capacity — Peak fault current device can close onto</li>
            </ul>
            <p><strong>Icu Selection Process</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Calculate prospective fault current (PSCC)</li>
              <li>Apply diversity/impedance factors</li>
              <li>Select Icu &gt; PSCC at installation point</li>
              <li>Consider future supply increases</li>
              <li>Document selection rationale</li>
            </ul>
            <p><strong>Ics/Icu Ratios</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>25%:</strong> Budget devices, non-critical</li>
              <li><strong>50%:</strong> Standard commercial</li>
              <li><strong>75%:</strong> Enhanced reliability</li>
              <li><strong>100%:</strong> Critical applications, full serviceability</li>
            </ul>
            <p><strong>Worked Example: Breaking Capacity Selection</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Transformer:</strong> 1000kVA, 6% impedance</li>
              <li><strong>Secondary voltage:</strong> 400V</li>
              <li><strong>PSCC at transformer:</strong> I<sub>sc</sub> = kVA × 1000 / (√3 × V × Z%)</li>
              <li><strong>Calculation:</strong> = 1000 × 1000 / (1.732 × 400 × 0.06) = 24.1kA</li>
              <li><strong>Selection:</strong> MCCB with Icu ≥ 25kA (select 36kA for margin)</li>
            </ul>
            <p><strong>Critical point:</strong> Always verify the prospective fault current through calculation or measurement. Undersized breaking capacity creates serious safety risks during fault conditions.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Forms of Separation and Type-Tested Assemblies">
            <p>BS EN 61439 defines forms of internal separation to protect personnel working on one part of a switchboard from live parts in other areas. The standard also establishes verification requirements through type-tested and partially type-tested assemblies.</p>
            <p><strong>Forms of Internal Separation</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Form 1:</strong> No internal separation — Simple distribution boards, single-user access</li>
              <li><strong>Form 2a:</strong> Busbars separated from functional units; terminals not separated — Standard commercial switchboards</li>
              <li><strong>Form 2b:</strong> Form 2a plus terminals in same compartment as busbar — Modified commercial applications</li>
              <li><strong>Form 3a:</strong> Busbars and functional units separated; terminals not separated from busbars — Industrial, frequent maintenance</li>
              <li><strong>Form 3b:</strong> Form 3a plus terminals separated from busbars — Higher safety requirement</li>
              <li><strong>Form 4a:</strong> Form 3b plus terminals separated from each other (in common space) — Critical facilities, hospitals</li>
              <li><strong>Form 4b:</strong> Form 3b plus terminals enclosed individually — Maximum safety, data centres</li>
            </ul>
            <p><strong>Type-Tested Assembly (TTA)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Conforms to established tested design</li>
              <li>Full type test evidence available</li>
              <li>No design variations from tested configuration</li>
              <li>Routine tests verify individual assembly</li>
              <li>Highest level of verified performance</li>
            </ul>
            <p><strong>Partially Type-Tested Assembly (PTTA)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Uses type-tested components</li>
              <li>Design rules derived from type tests</li>
              <li>Calculations replace some testing</li>
              <li>Allows design variations</li>
              <li>More flexible, requires engineering expertise</li>
            </ul>
            <p><strong>BS EN 61439 Verification Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Temperature rise:</strong> Verify conductors and components do not exceed limits under rated current</li>
              <li><strong>Dielectric properties:</strong> Insulation must withstand rated impulse and power frequency voltages</li>
              <li><strong>Short-circuit withstand:</strong> Assembly must withstand Icw for rated duration</li>
              <li><strong>Protection circuits:</strong> Verify effectiveness of protective bonding</li>
              <li><strong>Clearances and creepage:</strong> Minimum distances between live parts and earth</li>
              <li><strong>Mechanical operation:</strong> Correct function of operating mechanisms</li>
              <li><strong>IP rating:</strong> Ingress protection against solid objects and water</li>
            </ul>
            <p><strong>Specifying Form of Separation</strong></p>
            <p><strong>Form 1:</strong> Acceptable where only trained personnel access and full isolation is always applied.</p>
            <p><strong>Form 2:</strong> Standard for commercial buildings where circuit work requires isolation of affected circuits only.</p>
            <p><strong>Form 3:</strong> Required where cable termination must proceed with adjacent circuits energised.</p>
            <p><strong>Form 4:</strong> Essential for critical facilities requiring maximum flexibility and safety during live maintenance.</p>
            <p><strong>Specification note:</strong> Always specify form of separation in tender documents. Cost increases with form number, but Form 2 or higher is typical for most commercial and industrial applications.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Main Switchboard Selection</strong>
            </p>
            <p><strong>Scenario:</strong> Specify switchgear for a 1600A main LV switchboard fed from a 1000kVA transformer (6% impedance).</p>
            <p>Step 1: Calculate prospective fault current</p>
            <p>I<sub>sc</sub> = (1000 × 1000) / (1.732 × 400 × 0.06) = 24.1kA</p>
            <p>Step 2: Select main incomer device</p>
            <p>Options: 1600A MCCB (Icu 36kA) or 1600A ACB (Icu 65kA)</p>
            <p>Step 3: Evaluate requirements</p>
            <p>- Withdrawable preferred for maintenance flexibility</p>
            <p>- Communication interface for BMS integration required</p>
            <p>- Form 3b separation specified</p>
            <p>Selection: ACB 1600A, Icu 65kA, withdrawable</p>
            <p>Rationale: Maintenance flexibility, adequate breaking capacity with margin, integration capability</p>
            <p>
              <strong>Example 2: MCCB Frame Size Selection</strong>
            </p>
            <p><strong>Scenario:</strong> Select MCCB for a 350A submain with 25kA prospective fault current.</p>
            <p>Requirements analysis:</p>
            <p>- Load current: 350A</p>
            <p>- PSCC: 25kA</p>
            <p>- Fixed mounting acceptable</p>
            <p>Frame size options:</p>
            <p>- 400A frame: Icu options 25kA, 36kA, 50kA</p>
            <p>- 630A frame: Higher capacity, oversized for application</p>
            <p>Selection process:</p>
            <p>Frame: 400A (minimum frame for 350A setting)</p>
            <p>Icu: 36kA (exceeds 25kA PSCC with margin)</p>
            <p>Trip unit: Electronic adjustable (Ir 0.4-1 × In, Im 1.5-10 × In)</p>
            <p>Selection: MCCB 400A frame, 350A setting, 36kA, electronic trip</p>
            <p>
              <strong>Example 3: Form of Separation Specification</strong>
            </p>
            <p><strong>Scenario:</strong> Determine form of separation for a data centre main switchboard.</p>
            <p>Operational requirements:</p>
            <p>- 24/7 operation, no planned shutdowns</p>
            <p>- Regular circuit additions expected</p>
            <p>- Maintenance on individual circuits with others live</p>
            <p>- Multiple maintenance personnel may work simultaneously</p>
            <p>Assessment:</p>
            <p>- Form 1: Inadequate - no separation</p>
            <p>- Form 2: Inadequate - terminals not separated</p>
            <p>- Form 3: Marginal - functional units separated but terminals shared</p>
            <p>- Form 4: Optimal - full separation of all elements</p>
            <p>Specification: Form 4b</p>
            <p>Rationale: Maximum safety for live working, individual terminal compartments enable simultaneous work on multiple circuits</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Switchgear Selection Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Calculate maximum demand and select In with appropriate margin</li>
              <li>Determine prospective fault current at each switchboard location</li>
              <li>Select breaking capacity (Icu) exceeding PSCC</li>
              <li>Specify Ics/Icu ratio based on criticality</li>
              <li>Determine operational requirements (withdrawable, communication)</li>
              <li>Specify form of separation based on maintenance requirements</li>
              <li>Verify TTA or PTTA compliance with BS EN 61439</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>MCCB range: <strong>100A to 1600A</strong> typical</li>
              <li>ACB range: <strong>800A to 6300A</strong></li>
              <li>MCCB breaking capacity: <strong>up to 70kA</strong></li>
              <li>ACB breaking capacity: <strong>up to 150kA</strong></li>
              <li>Icw duration: <strong>typically 1 second</strong></li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Undersized breaking capacity</strong> - failure to calculate actual PSCC</li>
                <li><strong>Ignoring Ics</strong> - specifying Icu only without considering service requirements</li>
                <li><strong>Form underspecification</strong> - selecting Form 1 where live working is anticipated</li>
                <li><strong>No growth margin</strong> - sizing exactly to current load without future capacity</li>
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
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section1")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                LV distribution design
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section1-2")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Busbar systems
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule7Section1_1;
