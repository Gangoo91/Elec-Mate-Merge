/**
 * MOET · Module 2 · Section 2.4 · Subsection 1 — Fuses and Circuit Breakers
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option. NOT ST0154 (the "MOET" the course is named after) —
 * ST0154 v1.6 is still live, but its own EPA plan records that the Electrical
 * Technician option "was retired 31/12/2025" and was replaced by ST1426
 * (single discipline) or ST1443 (dual discipline). The course keeps the MOET
 * name because that is what employers and colleges still call the role.
 *
 * KSBs covered, quoted rather than numbered — the published K/S/B
 * numbering is unverified, so never write a code here:
 *   · "Electrical. Electricity at Work regulations. IET wiring
 *     regulations."
 *   · "Electrical. Functions and applications of electrical circuits."
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt.
 */

import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import {
  StudyPage,
  Bleed,
  ReadingProgress,
  TLDR,
  ConceptBlock,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  Prerequisites,
  ContentEyebrow,
  SectionRule,
  VideoCard,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Fuses and Circuit Breakers - MOET Module 2 Section 4.1';
const DESCRIPTION =
  'Comprehensive guide to overcurrent protection devices for electrical maintenance technicians: fuse types, MCB characteristics, selection criteria, BS 88, BS 3036, BS EN 60898 and BS 7671 compliance.';

const quickCheckQuestions = [
  {
    id: 'fuse-purpose',
    question: 'What is the primary function of a fuse in an electrical circuit?',
    options: [
      'To disconnect the circuit automatically when current exceeds a safe level',
      'To improve the power factor of the installation',
      'To regulate voltage levels across the load',
      'To provide a convenient switching point for maintenance',
    ],
    correctIndex: 0,
    explanation:
      'A fuse is a sacrificial overcurrent protective device. Its primary function is to disconnect the circuit by melting its fuse element when the current flowing through it exceeds a predetermined safe level for a specified time, thereby protecting conductors and equipment from damage due to overload or short-circuit conditions.',
  },
  {
    id: 'mcb-type-b',
    question:
      'A Type B MCB is designed to trip instantaneously (magnetically) at what multiple of its rated current?',
    options: [
      '2 to 3 times rated current',
      '3 to 5 times rated current',
      '5 to 10 times rated current',
      '10 to 20 times rated current',
    ],
    correctIndex: 1,
    explanation:
      'A Type B MCB provides magnetic (instantaneous) tripping between 3 and 5 times its rated current (In). This makes it suitable for resistive loads such as lighting and socket circuits where high inrush currents are not expected. Type C (5-10 x In) and Type D (10-20 x In) are used where higher inrush currents occur.',
  },
  {
    id: 'bs88-application',
    question: 'BS 88 HRC fuses are most commonly used in which application?',
    options: [
      'The 13 A plug top of a portable appliance flexible cord',
      'Older domestic consumer units fitted with rewirable fuse carriers',
      'Industrial distribution boards, motor circuits and commercial switchgear',
      'Extra-low-voltage signal circuits within control panels',
    ],
    correctIndex: 2,
    explanation:
      'BS 88 High Rupturing Capacity (HRC) fuses are the standard industrial fuse type in the UK. They are used in distribution boards, motor control centres, and commercial switchgear where high prospective fault currents require a device with a substantial breaking capacity — typically up to 80 kA at 415 V.',
  },
  {
    id: 'discrimination-fuses',
    question: "What is meant by 'discrimination' between protective devices?",
    options: [
      'Fitting devices of identical rating throughout the installation for consistency',
      'Ensuring all devices in series operate together to isolate the whole supply',
      'Selecting devices so the upstream main device always trips before the local one',
      'Ensuring only the device nearest the fault operates, leaving upstream supplies intact',
    ],
    correctIndex: 3,
    explanation:
      'Discrimination (also called selectivity) means that in the event of a fault, only the protective device closest to the fault operates, disconnecting the faulty circuit whilst leaving all upstream devices and healthy circuits unaffected. This is achieved by coordinating the time/current characteristics of devices in series.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'A semi-enclosed (rewirable) fuse to BS 3036 has a fusing factor of approximately:',
    options: [
      '1.0 — it blows at exactly its rated current',
      '1.8 to 2.0 — it requires nearly double its rated current to blow reliably',
      '1.45 — it requires 1.45 times rated current to blow',
      '3.0 — it requires three times rated current to blow',
    ],
    correctAnswer: 1,
    explanation:
      'BS 3036 semi-enclosed (rewirable) fuses have a fusing factor of approximately 1.8 to 2.0. This means the fuse element must carry nearly twice its rated current before it melts. This poor fusing factor requires a derating factor (typically 0.725) to be applied when selecting cable sizes, as specified in BS 7671 Appendix 4.',
  },
  {
    id: 2,
    question:
      'Which standard covers miniature circuit breakers (MCBs) for household and similar installations?',
    options: ['BS EN 61009', 'BS 88', 'BS EN 60898', 'BS 3036'],
    correctAnswer: 2,
    explanation:
      'BS EN 60898 covers miniature circuit breakers (MCBs) for overcurrent protection in household and similar installations. BS 88 covers industrial HRC fuses, BS 3036 covers semi-enclosed fuses, and BS EN 61009 covers residual current operated circuit breakers with integral overcurrent protection (RCBOs).',
  },
  {
    id: 3,
    question: 'The breaking capacity of a protective device refers to:',
    options: [
      'The minimum current at which it will operate',
      'The maximum continuous current it can carry',
      'The number of times it can be reset',
      'The maximum prospective fault current it can safely interrupt',
    ],
    correctAnswer: 3,
    explanation:
      'Breaking capacity (also called rupturing capacity) is the maximum prospective fault current that the device can safely interrupt without damage to itself or danger to its surroundings. BS 7671 Regulation 434.5.1 requires that the breaking capacity of every protective device must be not less than the prospective fault current at its point of installation.',
  },
  {
    id: 4,
    question: 'A Type C MCB would be most appropriate for protecting:',
    options: [
      'A motor circuit with significant inrush current on starting',
      'A circuit supplying a fluorescent lighting installation with electronic ballasts',
      'A domestic lighting circuit',
      'A resistive heating circuit',
    ],
    correctAnswer: 0,
    explanation:
      'Type C MCBs trip magnetically between 5 and 10 times their rated current, making them suitable for circuits with moderate inrush currents such as small motors, fluorescent lighting with magnetic ballasts, and some commercial equipment. Motor circuits with very high inrush may require Type D (10-20 x In).',
  },
  {
    id: 5,
    question:
      'In BS 7671, Regulation 433.1 requires that every circuit shall be protected against:',
    options: [
      'Undervoltage by a device that disconnects when supply voltage falls too low',
      'Overload current by a device that disconnects before conductors reach their limiting temperature',
      'Earth fault current by a residual current device of the appropriate sensitivity',
      'Transient overvoltage by a surge protective device at the origin',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 433.1 requires that every circuit is protected against overload current by a device that will disconnect the supply before the conductor insulation reaches a temperature that would cause damage. The device must have characteristics such that it operates before the conductor is subjected to sustained overcurrent.',
  },
  {
    id: 6,
    question: 'An HRC fuse achieves arc extinction by:',
    options: [
      'Using a spring-loaded mechanical trip mechanism',
      'Applying a magnetic field to deflect the arc',
      'Filling the fuse body with quartz sand which absorbs the arc energy',
      'Using an electronic sensor to detect the fault',
    ],
    correctAnswer: 2,
    explanation:
      'HRC (High Rupturing Capacity) fuses contain a silver or copper fuse element surrounded by granular quartz sand within a ceramic body. When the element melts due to fault current, the arc energy is absorbed by the sand, which vitrifies (turns to glass) around the arc path. This rapidly quenches the arc and limits the let-through energy (I squared t).',
  },
  {
    id: 7,
    question: 'The I squared t (I²t) characteristic of a fuse is important because it indicates:',
    options: [
      'The voltage rating of the fuse',
      'The ambient temperature rating',
      'The physical dimensions of the fuse carrier',
      'The total energy let-through during fault clearance',
    ],
    correctAnswer: 3,
    explanation:
      'I²t (current squared multiplied by time) represents the total energy let-through of the fuse during fault clearance. It is critical for ensuring that downstream cables and equipment can withstand the energy released during a fault. BS 7671 Regulation 434.5.2 requires that the I²t of the protective device does not exceed the I²t withstand of the cable (k²S²).',
  },
  {
    id: 8,
    question: 'Which of the following is NOT an advantage of MCBs over fuses?',
    options: [
      'MCBs always have a higher breaking capacity than HRC fuses',
      'MCBs provide visible trip indication',
      'MCBs can be reset after tripping without replacement',
      'MCBs have more precise and consistent tripping characteristics',
    ],
    correctAnswer: 0,
    explanation:
      'MCBs do not always have a higher breaking capacity than HRC fuses. In fact, standard domestic MCBs typically have a breaking capacity of 6 kA or 10 kA, whereas BS 88 HRC fuses can have breaking capacities up to 80 kA. In high fault-level installations, HRC fuses or MCBs with enhanced breaking capacity must be selected.',
  },
  {
    id: 9,
    question:
      'When selecting a protective device for a circuit, the rated current (In) of the device must satisfy:',
    options: [
      'In <= Ib <= Iz, with the design current set above the device rating',
      'Ib <= In <= Iz, where Ib is design current and Iz is cable current-carrying capacity',
      'Iz <= In <= Ib, with the device rating always below the cable capacity',
      'In >= Iz, so the device rating exceeds the cable current-carrying capacity',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 Regulation 433.1.1 requires that the nominal current (In) of the protective device must be not less than the design current (Ib) of the circuit and not greater than the current-carrying capacity (Iz) of the cable. This ensures the device allows normal current flow whilst protecting the cable from overload.',
  },
  {
    id: 10,
    question: 'A cartridge fuse to BS 1362 is designed for use in:',
    options: [
      'Industrial distribution boards',
      'Motor starter circuits',
      'BS 1363 13 A plug tops',
      'Street lighting columns',
    ],
    correctAnswer: 2,
    explanation:
      'BS 1362 cartridge fuses are specifically designed for use in BS 1363 13 A plug tops. They are available in 3 A (red) and 13 A (brown) as standard ratings, though other ratings exist. They provide overcurrent protection for the flexible cord between the plug and the appliance.',
  },
  {
    id: 11,
    question: 'The thermal element of an MCB provides protection against:',
    options: [
      'High-magnitude short-circuit currents requiring instantaneous tripping',
      'Earth leakage currents flowing to the protective conductor',
      'Transient overvoltages caused by lightning or switching surges',
      'Overload currents (sustained moderate overcurrents)',
    ],
    correctAnswer: 3,
    explanation:
      'An MCB contains two trip mechanisms: a thermal (bimetallic strip) element for overload protection and a magnetic (solenoid) element for short-circuit protection. The thermal element responds to sustained moderate overcurrents by heating and bending a bimetallic strip, which releases the trip mechanism after a time delay inversely proportional to the magnitude of the overcurrent.',
  },
  {
    id: 12,
    question:
      'Under BS 7671, if a BS 3036 semi-enclosed fuse is used, the cable current-carrying capacity (Iz) must be at least:',
    options: [
      'In divided by 0.725 (approximately 1.38 times In)',
      'In multiplied by 0.725 (approximately 0.73 times In)',
      'Equal to In, the same as for an MCB to BS EN 60898',
      'In multiplied by 1.45, matching the conventional tripping current',
    ],
    correctAnswer: 0,
    explanation:
      "Because BS 3036 fuses have a high fusing factor, BS 7671 requires a correction factor of 0.725 to be applied. This means the cable must be sized so that its current-carrying capacity is at least In / 0.725 (approximately 1.38 x In). This compensates for the fuse's inability to operate precisely at its rated current and prevents cable overheating.",
  },
];

const faqs = [
  {
    question: 'Can I replace a BS 3036 rewirable fuse with an MCB?',
    answer:
      'Not directly. Replacing a rewirable fuse with an MCB requires consideration of the prospective fault current at the point of installation, the breaking capacity of the proposed MCB, and compatibility with the existing switchgear. The consumer unit itself may need replacing, as BS 3036 fuseboards are not designed to accept MCBs. Any modification must comply with BS 7671 and Part P of the Building Regulations where applicable.',
  },
  {
    question: 'What is the difference between breaking capacity and rated current?',
    answer:
      'Rated current (In) is the maximum continuous current the device is designed to carry without tripping. Breaking capacity is the maximum prospective fault current the device can safely interrupt during a short-circuit. For example, a 32 A MCB with a breaking capacity of 6 kA can carry 32 A continuously but can safely interrupt a fault current of up to 6,000 A.',
  },
  {
    question: 'Why do some installations still use fuses instead of MCBs?',
    answer:
      'Fuses — particularly BS 88 HRC types — offer several advantages in certain applications: extremely high breaking capacity (up to 80 kA), excellent current-limiting properties, very low I²t let-through energy, no maintenance requirements, and inherent back-up protection capability. In industrial installations with high prospective fault currents, HRC fuses remain the preferred choice for main and sub-main protection.',
  },
  {
    question:
      'How do I check if a protective device is suitable for the prospective fault current?',
    answer:
      'You must measure or calculate the prospective fault current (Ipf) at the point of installation using a loop impedance tester or by calculation from supply impedance data. The breaking capacity marked on the device (in kA) must be equal to or greater than the measured Ipf. BS 7671 Regulation 434.5.1 makes this an absolute requirement — there is no exception.',
  },
  {
    question: "What does 'back-up protection' mean in the context of fuses and MCBs?",
    answer:
      "Back-up protection occurs when an upstream device (typically an HRC fuse) assists a downstream device (typically an MCB) in clearing fault currents that exceed the downstream device's breaking capacity. The upstream fuse limits the fault current to a level the MCB can handle. This is permitted under BS 7671 Regulation 434.5.1 provided the devices are tested and certified as a coordinated combination by the manufacturer.",
  },
];

const MOETModule2Section4_1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 2 · Section 2.4 · Subsection 1"
        title="Fuses and Circuit Breakers"
        backTo="/study-centre/apprentice/m-o-e-t-module2-section4"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Overcurrent protection devices, selection and operation for electrical maintenance —
            fuse types, MCB trip characteristics, and the BS 7671 conditions a replacement device
            must satisfy.
          </p>

          <TLDR
            points={[
              'Fuses: sacrificial devices — BS 88 HRC, BS 3036 rewirable, BS 1362 cartridge.',
              'MCBs: resettable devices — Type B (3-5x), Type C (5-10x), Type D (10-20x).',
              'Selection: Ib <= In <= Iz; breaking capacity >= Ipf.',
              'Standards: BS 7671, BS EN 60898, BS 88, BS 3036.',
            ]}
          />

          <Prerequisites
            items={[
              {
                term: 'Circuit protection and earthing',

                gist: 'Fuses, circuit breakers, RCDs and RCBOs, earthing arrangements and protective bonding — what each device protects against and how fault current gets back to source.',

                where: '2.4',
              },

              {
                term: 'BS 7671 and where it sits',

                gist: 'The Wiring Regulations are a standard, not statute — compliance is how you demonstrate the EAWR duties have been met. Current edition 2018+A4:2026.',

                where: '1.4.3',
              },
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain the operating principles of fuses and miniature circuit breakers',
              'Identify the main fuse types used in UK electrical installations (BS 88, BS 3036, BS 1362)',
              'Describe MCB trip characteristics (Type B, C and D) and their applications',
              'Apply the selection criteria Ib <= In <= Iz for overcurrent protective devices',
              'Understand breaking capacity requirements and back-up protection',
              'Reference BS 7671, BS EN 60898 and BS 88 requirements for device selection',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The purpose of overcurrent protection</ContentEyebrow>

          <ConceptBlock
            title="Detect overcurrent, disconnect before it does damage"
            onSite="As a maintenance technician you will frequently encounter protective devices that have operated. Understanding why a fuse has blown or an MCB has tripped is fundamental to fault diagnosis — a device operating on overload indicates a different problem from one operating on short-circuit, and the condition of the device after operation gives you diagnostic evidence."
          >
            <p>
              Every electrical circuit carries the risk of overcurrent — a condition where the
              current flowing through conductors exceeds the level for which they are designed.
              Overcurrent can arise from two distinct causes: overload, where too many loads draw
              current simultaneously through a circuit that is otherwise healthy; and short-circuit
              (or fault current), where an unintended low-impedance path allows a very large current
              to flow, often thousands of amperes.
            </p>
            <p>
              Without adequate protection, overcurrent causes conductor insulation to overheat,
              degrade and ultimately fail. This can lead to fire, equipment damage, and danger to
              persons. The role of overcurrent protective devices — fuses and circuit breakers — is
              to detect these conditions and disconnect the circuit before damage occurs.
            </p>
            <p>
              BS 7671 (the IET Wiring Regulations, 18th Edition) addresses overcurrent protection
              primarily in Chapter 43. Regulation 430.3 states the fundamental requirement: every
              circuit shall be provided with overcurrent protection that disconnects the supply
              before the current causes a temperature rise detrimental to the insulation, joints,
              terminations or surroundings of the conductors. The two aspects of protection —
              overload (Section 433) and short-circuit (Section 434) — may be provided by a single
              device or by separate devices.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Two types of overcurrent">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Overload current:</strong> An overcurrent occurring in a circuit that is
                electrically sound — caused by excessive demand. Typically 1.5 to 6 times the design
                current. Requires disconnection within minutes to hours depending on magnitude.
              </li>
              <li>
                <strong>Short-circuit current (fault current):</strong> An overcurrent resulting
                from a fault of negligible impedance between live conductors or between a live
                conductor and earth. Can reach tens of thousands of amperes. Requires disconnection
                in fractions of a second.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Fuse types and operating principles</ContentEyebrow>

          <ConceptBlock title="A carefully calibrated conductor designed to melt">
            <p>
              A fuse is the simplest form of overcurrent protection. It consists of a carefully
              calibrated conductor (the fuse element) that is designed to melt when the current
              exceeds a predetermined value. Once the element melts, it creates a gap in the
              circuit, and the resulting arc must be safely extinguished to fully interrupt the
              current. The method of arc extinction varies between fuse types and directly affects
              the device's breaking capacity and current-limiting ability.
            </p>
          </ConceptBlock>

          <ConceptBlock title="BS 88 HRC (High Rupturing Capacity) fuses">
            <p>
              BS 88 fuses are the workhorse of industrial and commercial electrical protection in
              the UK. They consist of a silver or copper fuse element enclosed within a robust
              ceramic body filled with granular quartz sand. When the element melts, the arc energy
              is absorbed by the sand, which vitrifies (turns to glass) in the arc path. This
              provides extremely effective arc quenching and current-limiting properties.
            </p>
            <ul className="list-disc space-y-1 pl-5 marker:text-elec-yellow/70">
              <li>Breaking capacity: up to 80 kA at 415 V AC</li>
              <li>Excellent current-limiting (low I²t let-through)</li>
              <li>Available in ratings from 2 A to 1250 A</li>
              <li>Bolt-in (tag) or clip-in carrier types</li>
              <li>Category of duty: gG (general purpose) or aM (motor circuit back-up)</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="BS 3036 semi-enclosed (rewirable) fuses">
            <p>
              BS 3036 fuses use a thin tinned copper wire as the fuse element, held between two
              terminal screws in an open or semi-enclosed ceramic holder. When the wire melts, the
              arc is quenched in the surrounding air — a far less effective method than the
              sand-filled HRC design. This results in a lower breaking capacity and a poor fusing
              factor.
            </p>
            <ul className="list-disc space-y-1 pl-5 marker:text-elec-yellow/70">
              <li>
                Fusing factor: approximately 1.8 to 2.0 (requires cable derating by factor 0.725)
              </li>
              <li>Breaking capacity: typically 1 kA to 4 kA</li>
              <li>Risk of incorrect fuse wire being fitted</li>
              <li>Still found in older domestic and light commercial installations</li>
              <li>Being progressively replaced by MCBs in new installations</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="BS 1362 cartridge fuses (plug-top fuses)">
            <p>
              BS 1362 fuses are small ceramic cartridge fuses designed specifically for BS 1363 13 A
              plug tops. They contain a sand-filled ceramic body with a silver element and brass end
              caps. Their primary purpose is to protect the flexible cord between the plug and the
              appliance.
            </p>
            <ul className="list-disc space-y-1 pl-5 marker:text-elec-yellow/70">
              <li>Standard ratings: 3 A (red) and 13 A (brown)</li>
              <li>Other ratings available: 1 A, 2 A, 5 A, 7 A, 10 A</li>
              <li>Must be correctly selected for the appliance rating</li>
              <li>Common maintenance task: checking and replacing blown plug fuses</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Comparison of fuse types">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Characteristic</th>
                    <th className="py-2 pr-4 font-medium text-white">BS 88 HRC</th>
                    <th className="py-2 pr-4 font-medium text-white">BS 3036 Rewirable</th>
                    <th className="py-2 font-medium text-white">BS 1362 Cartridge</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Breaking capacity</td>
                    <td className="py-2 pr-4">Up to 80 kA</td>
                    <td className="py-2 pr-4">1-4 kA</td>
                    <td className="py-2">6 kA</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Fusing factor</td>
                    <td className="py-2 pr-4">~1.25</td>
                    <td className="py-2 pr-4">~1.8-2.0</td>
                    <td className="py-2">~1.5</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Current limiting</td>
                    <td className="py-2 pr-4">Excellent</td>
                    <td className="py-2 pr-4">Poor</td>
                    <td className="py-2">Moderate</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Typical application</td>
                    <td className="py-2 pr-4">Industrial/commercial</td>
                    <td className="py-2 pr-4">Older domestic</td>
                    <td className="py-2">Plug tops</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-elec-yellow/70">
              <strong>Key point:</strong> When replacing fuses during maintenance, always use the
              correct type and rating. Never substitute a higher-rated fuse to &quot;stop it
              blowing&quot; — this defeats the protection and puts the installation at risk. If a
              fuse operates repeatedly, investigate and rectify the cause.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Miniature circuit breakers (MCBs)</ContentEyebrow>

          <ConceptBlock title="Resettable — two trip mechanisms working in parallel">
            <p>
              Miniature circuit breakers (MCBs) to BS EN 60898 have largely replaced fuses in modern
              domestic and commercial installations. Unlike fuses, MCBs are resettable — after
              operating on a fault, they can be switched back on once the fault is rectified,
              without replacing any component. This makes them more convenient for maintenance and
              reduces downtime.
            </p>
            <p>
              An MCB contains two independent trip mechanisms working in parallel. The thermal
              mechanism uses a bimetallic strip that bends when heated by overcurrent, releasing a
              latch after a time delay. This provides overload protection. The magnetic mechanism
              uses a solenoid that trips instantaneously when the current exceeds a high threshold.
              This provides short-circuit protection. The combination of both mechanisms in a single
              device makes the MCB effective across the full range of overcurrent conditions.
            </p>
          </ConceptBlock>

          <ConceptBlock title="MCB trip types (BS EN 60898)">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Type B — 3 to 5 times In:</strong> For resistive and low-inrush loads.
                Standard for domestic lighting and socket circuits. Most common type in UK
                dwellings.
              </li>
              <li>
                <strong>Type C — 5 to 10 times In:</strong> For loads with moderate inrush currents.
                Suitable for small motors, commercial lighting with magnetic ballasts, and some IT
                equipment.
              </li>
              <li>
                <strong>Type D — 10 to 20 times In:</strong> For loads with very high inrush
                currents. Used for large motors, transformers, welding equipment and X-ray machines.
              </li>
            </ul>
            <p>
              The choice of MCB type is critical. If a Type B MCB is used on a circuit with high
              inrush current (such as a direct-on-line motor starter), the magnetic element may trip
              on the inrush current during normal starting. Conversely, using a Type D MCB on a
              lighting circuit would mean the magnetic trip threshold is set so high that it may not
              provide adequate short-circuit protection for the cable under certain fault
              conditions.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="MCB ratings and markings"
            onSite="If an MCB trips repeatedly without an obvious fault, consider whether the trip type is correct for the load. LED driver inrush, IT equipment switch-on surge, and motor starting currents are common causes of nuisance tripping on Type B MCBs. Do not simply uprate the device — assess the load characteristics and select the appropriate trip type. If the MCB is correct for the load, investigate for a developing fault such as insulation breakdown or a loose connection causing intermittent arcing."
          >
            <p>
              Every MCB carries markings indicating its rated current, trip type, breaking capacity
              and applicable standard. Understanding these markings is essential for correct
              identification and replacement during maintenance.
            </p>
            <ul className="list-disc space-y-1 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Rated current (In):</strong> 6, 10, 16, 20, 25, 32, 40, 50, 63 A (standard
                preferred values)
              </li>
              <li>
                <strong>Trip type:</strong> B, C or D (marked before the current rating, e.g.,
                &quot;B32&quot;)
              </li>
              <li>
                <strong>Breaking capacity:</strong> Typically 6 kA (6000) or 10 kA (10000) for
                domestic MCBs
              </li>
              <li>
                <strong>Standard:</strong> BS EN 60898 for household; BS EN 60947-2 for industrial
                (MCCBs)
              </li>
              <li>
                <strong>Single-pole, double-pole or triple-pole:</strong> Indicated by the number of
                switching contacts
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Selection criteria and BS 7671 requirements</ContentEyebrow>

          <ConceptBlock title="Several conditions, satisfied simultaneously">
            <p>
              Selecting the correct overcurrent protective device requires satisfying several
              conditions simultaneously. BS 7671 Chapter 43 sets out the requirements, and a
              maintenance technician must understand these to verify that existing protection is
              adequate and to specify replacements correctly.
            </p>
          </ConceptBlock>

          <ConceptBlock title="The fundamental selection conditions">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Condition 1 (Reg 433.1.1):</strong> Ib ≤ In ≤ Iz — the device rated current
                must be between the design current and the cable current-carrying capacity
              </li>
              <li>
                <strong>Condition 2 (Reg 433.1.1):</strong> I2 ≤ 1.45 × Iz — the current causing
                effective operation of the device must not exceed 1.45 times the cable
                current-carrying capacity
              </li>
              <li>
                <strong>Condition 3 (Reg 434.5.1):</strong> Breaking capacity ≥ Ipf — the device
                must be able to safely interrupt the maximum prospective fault current at its point
                of installation
              </li>
              <li>
                <strong>Condition 4 (Reg 434.5.2):</strong> I²t ≤ k²S² — the energy let-through of
                the device must not exceed the energy withstand of the cable during a short-circuit
              </li>
            </ul>
            <p>
              For MCBs to BS EN 60898, Condition 2 is automatically satisfied because the
              conventional tripping current (I2) is defined as 1.45 times In by the standard.
              However, for BS 3036 semi-enclosed fuses, the poor fusing factor means an additional
              correction factor of 0.725 must be applied to the cable sizing, effectively requiring
              a larger cable to compensate for the fuse's imprecision.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Worked example: device selection">
            <div className="rounded bg-black/30 p-3 text-sm text-white">
              <p className="mb-2">
                <strong>Scenario:</strong> A 230 V single-phase circuit supplies a 6 kW electric
                shower. The cable is 6 mm² twin and earth (PVC, clipped direct), with a
                current-carrying capacity (Iz) of 47 A after applying correction factors.
              </p>
              <ul className="list-disc space-y-1 pl-5 marker:text-elec-yellow/70">
                <li>Design current (Ib) = P / V = 6000 / 230 = 26.1 A</li>
                <li>Select In: Ib ≤ In ≤ Iz → 26.1 ≤ In ≤ 47 → choose 32 A Type B MCB</li>
                <li>Check I2: 1.45 × In = 1.45 × 32 = 46.4 A ≤ 1.45 × 47 = 68.15 A ✓</li>
                <li>
                  Check breaking capacity: measured Ipf = 2.8 kA; MCB breaking capacity = 6 kA ✓
                </li>
              </ul>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Back-up protection (Reg 434.5.1)">
            <p>
              Where the prospective fault current exceeds the breaking capacity of an individual
              device, back-up protection may be used. A higher-rated upstream device (typically an
              HRC fuse) limits the fault current to a level the downstream device can handle. The
              combination must be tested and verified by the manufacturer — you cannot simply assume
              any fuse will provide adequate back-up for any MCB. The manufacturer's coordination
              tables must be consulted.
            </p>
            <p className="text-elec-yellow/70">
              <strong>Maintenance relevance:</strong> When replacing a protective device, verify
              that the replacement satisfies all four conditions. If the installation has changed
              since original design (e.g., additional loads added), the existing protection may no
              longer be adequate. Always check rather than assuming like-for-like replacement is
              sufficient.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Time/current characteristics and discrimination</ContentEyebrow>

          <ConceptBlock title="Every device has a characteristic curve">
            <p>
              Every overcurrent protective device has a characteristic curve that shows the
              relationship between the magnitude of the current flowing through it and the time it
              takes to operate. These time/current characteristics are published by manufacturers
              and are essential for verifying that devices will operate within the disconnection
              times required by BS 7671 and for ensuring discrimination between devices in series.
            </p>
            <p>
              For fuses, the characteristic curve shows a continuous inverse relationship — as
              current increases, operating time decreases. For MCBs, the curve has two distinct
              regions: the thermal (overload) region, which follows an inverse time curve, and the
              magnetic (instantaneous) region, which is a near-vertical line at the magnetic trip
              threshold.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Disconnection times (BS 7671 Regulation 411.3.2)">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>TN systems, 230 V final circuits ≤ 32 A:</strong> Maximum 0.4 seconds
              </li>
              <li>
                <strong>TN systems, 230 V distribution circuits:</strong> Maximum 5 seconds
              </li>
              <li>
                <strong>TT systems, 230 V final circuits ≤ 32 A:</strong> Maximum 0.2 seconds
              </li>
              <li>
                <strong>TT systems, 230 V distribution circuits:</strong> Maximum 1 second
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Achieving discrimination">
            <p>
              Discrimination (selectivity) is the coordination of protective devices in series such
              that only the device nearest to the fault operates. This minimises disruption — a
              fault on one circuit should not trip the main supply and disconnect all circuits.
              Achieving discrimination requires the downstream device to operate faster than the
              upstream device at all fault current levels up to the maximum prospective fault
              current at the downstream device.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Time discrimination:</strong> Upstream device has a longer operating time
                than the downstream device at the same current level
              </li>
              <li>
                <strong>Current discrimination:</strong> Upstream device has a higher current
                setting so it does not respond to fault currents cleared by the downstream device
              </li>
              <li>
                <strong>Energy discrimination:</strong> The I²t let-through of the downstream device
                is less than the I²t required to trip the upstream device
              </li>
              <li>
                <strong>Zone discrimination:</strong> In complex installations, intelligent devices
                communicate to ensure only the device nearest the fault operates
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Fuse-to-fuse and MCB-to-MCB discrimination">
            <p>
              <strong>Fuse-to-fuse discrimination</strong> is generally achieved with a ratio of
              1.6:1 or greater between upstream and downstream fuse ratings (for BS 88 HRC fuses of
              the same manufacturer). For example, a 100 A upstream fuse will discriminate with a 63
              A downstream fuse (ratio 1.59:1 — borderline) but will reliably discriminate with a 50
              A downstream fuse (ratio 2:1).
            </p>
            <p>
              <strong>MCB-to-MCB discrimination</strong> is more difficult to achieve because the
              magnetic trip regions overlap. A ratio of at least 2:1 between upstream and downstream
              MCB ratings is often needed, and full discrimination may not be possible at high fault
              currents. Manufacturer data sheets must be consulted for specific device combinations.
            </p>
            <p className="text-elec-yellow/70">
              <strong>Practical point:</strong> In maintenance work, if you find that a main device
              is tripping instead of the device protecting the faulty circuit, this indicates a
              discrimination problem. The time/current characteristics of the devices in series need
              to be reviewed, and it may be necessary to change device types or ratings to restore
              correct coordination.
            </p>
          </ConceptBlock>

          <SectionRule />

          <VideoCard
            url="https://www.youtube.com/watch?v=VGj32euYZ2c"

            title="Circuit Breaker Basics — How Do They Work?"

            channel="The Engineering Mindset"

            duration="1:51"

            topic="What is actually happening inside the breaker when it trips"

            caption="Under two minutes. Shows the thermal bimetal and the magnetic coil doing two different jobs, which is the distinction this page turns on."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Fuses are sacrificial — BS 88 HRC (industrial, up to 80 kA), BS 3036 rewirable (older domestic, poor fusing factor), BS 1362 (plug tops).',
              "MCBs are resettable — Type B (3-5x), Type C (5-10x), Type D (10-20x) — choose the type to match the load's inrush current.",
              'Selection conditions: Ib <= In <= Iz; I2 <= 1.45 x Iz; breaking capacity >= Ipf; I squared t <= k squared S squared.',
              'Breaking capacity must never be less than the prospective fault current at the point of installation (Reg 434.5.1).',
              'Back-up (cascade) protection is only valid when tested and certified as a coordinated combination by the manufacturer.',
              'Discrimination ensures only the device nearest the fault operates — achieved through time, current, energy or zone coordination.',
              'Never substitute a higher-rated fuse to stop nuisance operation — investigate and rectify the underlying cause instead.',
              'Key standards: BS 88 (HRC fuses), BS 3036 (rewirable fuses), BS 1362 (plug-top fuses), BS EN 60898 (MCBs), BS 7671:2018+A4:2026 (IET Wiring Regulations).',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz title="Test Your Knowledge" questions={quizQuestions} />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module2-section4')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Back to section
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Protection and earthing
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module2-section4-2')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  RCDs and RCBOs
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule2Section4_1;
