/**
 * MOET · Module 2 · Section 2.4 · Subsection 3 — Overcurrent and
 * Short-Circuit Protection
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
  CommonMistake,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  Prerequisites,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Overcurrent and Short-Circuit Protection - MOET Module 2 Section 4.3';
const DESCRIPTION =
  'Protection coordination and fault current calculations for electrical maintenance technicians: prospective fault current, adiabatic equation, discrimination, cascading, BS 7671 Chapter 43 compliance.';

const quickCheckQuestions = [
  {
    id: 'pfc-definition',
    question: 'What is prospective fault current (Ipf)?',
    options: [
      'The current drawn by the largest single load on the circuit',
      'The current that flows when the RCD test button is pressed',
      'The maximum current that could flow at a given point under fault conditions',
      'The normal operating current of the circuit',
    ],
    correctIndex: 2,
    explanation:
      'Prospective fault current (Ipf) is the maximum current that would flow at a given point in the installation if a fault of negligible impedance occurred at that point. It is determined by the supply voltage and the total impedance of the fault loop. BS 7671 Regulation 434.5.1 requires that the breaking capacity of every protective device must not be less than the Ipf at its point of installation.',
  },
  {
    id: 'adiabatic-equation',
    question: 'The adiabatic equation t = k²S²/I² is used to verify that:',
    options: [
      'The cable voltage drop does not exceed the permitted limit',
      'The earth fault loop impedance is low enough for disconnection',
      'The cable can withstand the thermal energy released during a fault without damage',
      'The circuit design current does not exceed the MCB rating',
    ],
    correctIndex: 2,
    explanation:
      'The adiabatic equation relates the maximum fault clearance time (t) to the cable cross-sectional area (S), a factor representing the cable conductor and insulation material (k), and the fault current (I). It ensures that the energy let-through (I²t) of the protective device does not exceed the thermal withstand capability (k²S²) of the cable during a short-circuit or earth fault.',
  },
  {
    id: 'overload-vs-shortcircuit',
    question: 'What is the key difference between an overload current and a short-circuit current?',
    options: [
      'An overload only occurs on three-phase circuits; a short-circuit only on single-phase circuits',
      'An overload occurs in a sound circuit due to excess demand; a short-circuit results from a fault of negligible impedance',
      'An overload is cleared by the RCD; a short-circuit is cleared by the main switch',
      'An overload flows to earth; a short-circuit flows only between line and neutral',
    ],
    correctIndex: 1,
    explanation:
      "An overload current is an overcurrent occurring in a circuit that is electrically sound — the conductors and insulation are intact, but the total connected load exceeds the circuit's designed capacity. A short-circuit current results from a fault of negligible impedance between live conductors or between a live conductor and earth, allowing extremely high currents to flow. The magnitude and required response time differ greatly.",
  },
  {
    id: 'coordination-meaning',
    question:
      "In protection coordination, what does 'total discrimination' between two devices in series mean?",
    options: [
      'The downstream device always trips before the upstream device, for all fault currents up to its breaking capacity',
      'Both devices always trip together to ensure the fault is cleared as quickly as possible',
      'The upstream device always trips first to protect the more expensive downstream device',
      'Neither device trips until the fault current exceeds both their breaking capacities',
    ],
    correctIndex: 0,
    explanation:
      'Total discrimination means that for every fault current up to the breaking capacity of the downstream device, the downstream device will always operate before the upstream device. Partial discrimination exists when the downstream device operates first only up to a certain fault level, beyond which both may operate. Manufacturers publish discrimination tables showing the maximum fault current for which discrimination is achieved between specific device pairs.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'The prospective fault current at the origin of a typical UK domestic installation is usually in the range of:',
    options: ['100 A to 500 A', '1 kA to 16 kA', '20 kA to 50 kA', '50 kA to 100 kA'],
    correctAnswer: 1,
    explanation:
      'The prospective fault current at the origin of a typical UK domestic installation supplied from the public network is usually between 1 kA and 16 kA. The DNO (Distribution Network Operator) maximum declared value is typically 16 kA for single-phase supplies. BS 7671 Regulation 434.5.1 requires that all protective devices have a breaking capacity not less than this value.',
  },
  {
    id: 2,
    question:
      'BS 7671 Regulation 434.5.2 requires that the energy let-through of a protective device satisfies:',
    options: ['Ib ≤ In ≤ Iz', 'Zs × Ia ≤ Uo', 'I²t ≤ k²S²', 'I²t ≥ k²S²'],
    correctAnswer: 2,
    explanation:
      'Regulation 434.5.2 requires that the let-through energy (I²t) of the protective device during a short-circuit does not exceed the withstand energy (k²S²) of the cable. This ensures the cable insulation is not damaged by the thermal effects of the fault current during the time taken for the protective device to operate. The value of k depends on the conductor and insulation materials.',
  },
  {
    id: 3,
    question: "In the adiabatic equation, the factor 'k' depends on:",
    options: [
      'The ambient temperature only',
      'The circuit voltage and frequency',
      'The length of the cable run',
      'The conductor material and insulation type',
    ],
    correctAnswer: 3,
    explanation:
      'The k factor is a constant that accounts for the thermal properties of the conductor material (copper or aluminium) and the insulation material (PVC, XLPE, etc.), along with the initial and final temperatures of the conductor. Values of k are tabulated in BS 7671 Table 43.1. For example, copper conductors with thermoplastic (PVC) insulation have k = 115.',
  },
  {
    id: 4,
    question:
      'When the prospective fault current exceeds the breaking capacity of a downstream MCB, the installation can be made compliant by:',
    options: [
      'Using back-up protection from an upstream HRC fuse with a verified coordination combination',
      'Fitting an additional 30 mA RCD upstream of the MCB to share the fault current',
      'Increasing the cable cross-sectional area so it carries the fault current safely',
      'Lengthening the circuit cable to add impedance and reduce the prospective fault current',
    ],
    correctAnswer: 0,
    explanation:
      "BS 7671 Regulation 434.5.1 permits the use of back-up protection where the downstream device's breaking capacity is exceeded. An upstream device (typically an HRC fuse) limits the prospective fault current to a level the downstream MCB can handle. The combination must be verified by the manufacturer — the devices must be tested together and the results published in coordination tables.",
  },
  {
    id: 5,
    question: 'The maximum disconnection time for a 32 A final circuit in a TN system at 230 V is:',
    options: ['0.1 seconds', '0.4 seconds', '5 seconds', '1 second'],
    correctAnswer: 1,
    explanation:
      'BS 7671 Table 41.1 specifies a maximum disconnection time of 0.4 seconds for TN systems on final circuits not exceeding 32 A at 230 V nominal (120-230 V Uo). For distribution circuits, the maximum disconnection time is 5 seconds. These times ensure that in the event of an earth fault, the supply is disconnected before the touch voltage duration becomes dangerous.',
  },
  {
    id: 6,
    question: 'Earth fault loop impedance (Zs) is important for overcurrent protection because:',
    options: [
      'It sets the maximum continuous current the circuit can carry under normal load',
      'It determines the voltage drop seen by equipment at the end of the circuit',
      'It determines the magnitude of the earth fault current and therefore whether the protective device will operate within the required time',
      'It fixes the breaking capacity that the protective device must be rated to',
    ],
    correctAnswer: 2,
    explanation:
      'The earth fault loop impedance (Zs) determines the magnitude of the earth fault current: If = Uo / Zs. The protective device must be able to carry this fault current and disconnect within the maximum permitted time specified by BS 7671. If Zs is too high, the fault current will be too low to trip the device quickly enough, and the disconnection time requirement will not be met.',
  },
  {
    id: 7,
    question:
      'For a circuit protected by a 32 A Type B MCB in a TN system, the maximum earth fault loop impedance (Zs) is approximately:',
    options: ['0.27 ohms', '1.09 ohms', '7.19 ohms', '1.37 ohms'],
    correctAnswer: 3,
    explanation:
      'For a Type B MCB, instantaneous magnetic tripping occurs between 3 and 5 times In. Using the worst case (5 × In): the minimum fault current needed = 5 × 32 = 160 A. BS 7671:2018+A4:2026 applies Cmin = 0.95 to U0 in the Zs calculation: Maximum Zs = (U0 × Cmin) / Ia = (230 × 0.95) / 160 = 218.5 / 160 = 1.366 ohms ≈ 1.37 ohms (Table 41.3). The pre-A4 figure of 1.44 ohms (without Cmin) is now obsolete.',
  },
  {
    id: 8,
    question:
      'Cascading (also called series connection or let-through energy coordination) allows:',
    options: [
      'A downstream device to have a lower breaking capacity than the prospective fault current, backed up by an upstream current-limiting device',
      'A downstream device to be omitted entirely where an upstream device already protects the circuit',
      'Two devices of the same rating to be wired in parallel to double the breaking capacity',
      'A circuit to operate without overload protection provided short-circuit protection is fitted',
    ],
    correctAnswer: 0,
    explanation:
      "Cascading (or back-up protection) allows a downstream device (e.g., MCB) to have a breaking capacity lower than the prospective fault current at its location, provided an upstream current-limiting device (e.g., HRC fuse or MCCB) limits the energy let-through to within the downstream device's capability. The combination must be tested and certified by the manufacturer.",
  },
  {
    id: 9,
    question:
      'If a cable has a cross-sectional area (S) of 2.5 mm² and k = 115, the maximum fault energy the cable can withstand (k²S²) is:',
    options: ['287.5 A²s', '82,656 A²s', '115,000 A²s', '828 A²s'],
    correctAnswer: 1,
    explanation:
      "k²S² = 115² × 2.5² = 13,225 × 6.25 = 82,656.25 A²s. This is the maximum energy (I²t) that the cable can absorb during a short-circuit without the insulation temperature exceeding its damage threshold. The protective device's I²t let-through must not exceed this value. This calculation is fundamental to verifying short-circuit protection per BS 7671 Regulation 434.5.2.",
  },
  {
    id: 10,
    question:
      'When checking protection coordination during periodic inspection, a maintenance technician should verify:',
    options: [
      'Only that each circuit is labelled correctly at the distribution board',
      'Only that the RCD test button operates and resets the device',
      'That breaking capacity ≥ Ipf, Zs values meet tables, and discrimination is adequate for the installation',
      'Only that the cable colours match the current BS 7671 harmonised colours',
    ],
    correctAnswer: 2,
    explanation:
      'During periodic inspection, protection coordination should be verified by confirming: the prospective fault current has not increased beyond device breaking capacities, Zs values are within the maximum tabulated values for the devices installed, devices are correctly rated for the circuits they protect, and discrimination between devices in series is adequate to minimise disruption during fault conditions.',
  },
  {
    id: 11,
    question: "The term 'let-through energy' of a protective device refers to:",
    options: [
      'The continuous power the device dissipates as heat during normal operation',
      'The energy stored in the device that is released when it is reset after tripping',
      'The minimum energy required to operate the device under overload conditions',
      'The I²t value — the total thermal energy the device allows to pass through to the circuit during fault clearance',
    ],
    correctAnswer: 3,
    explanation:
      'Let-through energy (I²t) is the integral of the square of the fault current over the time taken for the device to clear the fault. It represents the total thermal energy that passes through the device and into the downstream circuit during fault clearance. Current-limiting devices (HRC fuses, current-limiting MCBs) are specifically designed to minimise I²t, reducing stress on cables and equipment.',
  },
];

const faqs = [
  {
    question: 'How do I measure prospective fault current on site?',
    answer:
      "Prospective fault current is measured using a loop impedance tester or a dedicated prospective fault current (PFC) tester connected at the point of interest. The instrument measures the earth fault loop impedance (Zs) or line-neutral loop impedance and calculates the PFC using Ohm's law (Ipf = Uo / Z). Measurements should be taken at the origin of the installation and at each distribution board. Always use a calibrated instrument and follow the manufacturer's instructions.",
  },
  {
    question:
      'What happens if the measured Ipf exceeds the breaking capacity of the installed devices?',
    answer:
      'This is a serious deficiency. The installation does not comply with BS 7671 Regulation 434.5.1 and is potentially dangerous — the device may fail catastrophically under fault conditions, causing fire or explosion. The deficiency must be recorded as a C1 (danger present) on the EICR. Remedial action involves either upgrading the devices to ones with adequate breaking capacity or installing upstream current-limiting devices (back-up protection) with verified coordination.',
  },
  {
    question: 'What is the difference between partial and total discrimination?',
    answer:
      "Total discrimination means the downstream device will always trip before the upstream device for all fault currents up to the downstream device's breaking capacity. Partial discrimination means the downstream device trips first only up to a certain fault level (called the discrimination limit) — above that level, both devices may trip. Manufacturers publish discrimination tables showing whether total or partial discrimination exists for specific device combinations and at what current level partial discrimination fails.",
  },
  {
    question: "Why is the adiabatic equation called 'adiabatic'?",
    answer:
      "The term 'adiabatic' means 'without heat transfer to the surroundings'. The equation assumes that during the very short duration of a fault (typically milliseconds to a few seconds), all the thermal energy generated by the fault current is retained within the conductor — none is dissipated through the insulation to the surrounding environment. This is a worst-case assumption that provides a safety margin. For longer fault durations (above approximately 5 seconds), the adiabatic assumption becomes invalid and a more complex thermal analysis is required.",
  },
  {
    question: 'Can I use the same device for both overload and short-circuit protection?',
    answer:
      "Yes, and this is the most common arrangement. MCBs and fuses inherently provide both overload protection (via the thermal element or fuse element's time/current characteristic) and short-circuit protection (via the magnetic element or rapid element rupture). BS 7671 Regulation 435.1 permits a single device to provide both functions provided it satisfies the requirements of both Section 433 (overload) and Section 434 (short-circuit).",
  },
];

const MOETModule2Section4_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 2 · Section 2.4 · Subsection 3"
        title="Overcurrent and Short-Circuit Protection"
        backTo="/study-centre/apprentice/m-o-e-t-module2-section4"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Protection coordination, fault current calculations and the adiabatic equation — how a
            maintenance technician proves that a protective device and its cable can survive a
            fault, not just carry normal load.
          </p>

          <TLDR
            points={[
              'Overload: excess demand in a sound circuit — moderate overcurrent.',
              'Short-circuit: fault of negligible impedance — very high current.',
              'Adiabatic: I squared t <= k squared S squared verifies the cable can withstand the fault energy.',
              'Coordination: discrimination ensures only the device nearest the fault trips.',
            ]}
          />

          <Prerequisites
            items={[
              {
                term: 'BS 7671 and where it sits',

                gist: 'The Wiring Regulations are a standard, not statute — compliance is how you demonstrate the EAWR duties have been met. Current edition 2018+A4:2026.',

                where: '1.4.3',
              },

              {
                term: 'Circuit protection and earthing',

                gist: 'Fuses, circuit breakers, RCDs and RCBOs, earthing arrangements and protective bonding — what each device protects against and how fault current gets back to source.',

                where: '2.4',
              },
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Distinguish between overload and short-circuit fault conditions and their protection requirements',
              'Calculate and measure prospective fault current at the origin and at distribution boards',
              'Apply the adiabatic equation (I²t ≤ k²S²) to verify short-circuit withstand of cables',
              'Understand protection coordination: discrimination, cascading and back-up protection',
              'Verify disconnection times using earth fault loop impedance and device characteristics',
              'Reference BS 7671 Chapter 43 requirements for overcurrent and short-circuit protection',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Overload current vs short-circuit current</ContentEyebrow>

          <ConceptBlock title="Two fundamentally different types of overcurrent">
            <p>
              BS 7671 recognises two fundamentally different types of overcurrent, each requiring
              different protective characteristics. Understanding the distinction is critical for
              both design and maintenance, as the evidence left by each type of fault differs and
              informs the diagnostic approach.
            </p>
            <p>
              An overload current is an overcurrent flowing in a circuit that is electrically
              intact. The conductors, insulation and connections are all healthy, but the total
              current demanded by the connected loads exceeds the rated capacity of the circuit.
              This might occur because too many appliances are connected to a ring final circuit, or
              because a motor is mechanically overloaded and draws excessive current. Overload
              currents are typically modest — perhaps 1.5 to 6 times the normal design current — and
              they develop relatively slowly.
            </p>
            <p>
              A short-circuit current (also called fault current) results from a breakdown in
              insulation that creates a low-impedance path between live conductors (line-to-neutral
              or line-to-line) or between a live conductor and earth. Because the impedance of the
              fault path is very low (ideally zero, though in practice a few milliohms), the
              resulting current can be enormous — potentially tens of thousands of amperes. The rise
              time is extremely fast, typically reaching peak value within the first half-cycle (10
              ms at 50 Hz).
            </p>
          </ConceptBlock>

          <ConceptBlock title="Comparison of overcurrent types">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Characteristic</th>
                    <th className="py-2 pr-4 font-medium text-white">Overload</th>
                    <th className="py-2 font-medium text-white">Short-Circuit</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Circuit condition</td>
                    <td className="py-2 pr-4">Electrically sound</td>
                    <td className="py-2">Insulation breakdown / fault</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Typical magnitude</td>
                    <td className="py-2 pr-4">1.5 to 6 × design current</td>
                    <td className="py-2">100s to 10,000s of amps</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Rise time</td>
                    <td className="py-2 pr-4">Gradual (seconds to minutes)</td>
                    <td className="py-2">Near instantaneous (&lt; 10 ms)</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Protection mechanism</td>
                    <td className="py-2 pr-4">Thermal (time-delayed)</td>
                    <td className="py-2">Magnetic (instantaneous)</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">BS 7671 section</td>
                    <td className="py-2 pr-4">Section 433</td>
                    <td className="py-2">Section 434</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock
            title="Diagnostic clue for maintenance technicians"
            onSite="When an MCB trips, examining the trip flag or indicator can reveal whether the thermal or magnetic element operated. Some MCBs have separate indicators for each. For fuses, a clean melt of the element with minimal discolouration of the sand suggests an overload (slow, sustained heating). A violently ruptured element with extensive sand vitrification and possible external discolouration indicates a high-energy short-circuit. This diagnostic evidence guides your fault-finding approach."
          >
            <p>
              The physical evidence a device leaves behind after operating is itself a diagnostic
              tool — read it before you reach for a replacement.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Prospective fault current and breaking capacity</ContentEyebrow>

          <ConceptBlock title="The maximum current a bolted fault could produce">
            <p>
              The prospective fault current (Ipf) at any point in an installation is the maximum
              current that would flow if a bolted fault (zero impedance) occurred at that point. It
              is determined by the supply voltage and the total impedance of the circuit from the
              source to the fault point. The closer the fault is to the supply transformer, the
              higher the Ipf — because there is less cable impedance to limit the current.
            </p>
            <p>
              BS 7671 Regulation 434.5.1 states an absolute requirement: the rated short-circuit
              breaking capacity of every protective device shall not be less than the prospective
              fault current at its point of installation. This is not a recommendation — it is a
              mandatory regulation. If a fault occurs and the device cannot safely interrupt the
              fault current, the device may fail explosively, causing fire, arc flash and
              potentially fatal injuries.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Measuring and calculating Ipf">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Measurement:</strong> Use a calibrated loop impedance or PFC tester at the
                point of interest. The instrument measures the loop impedance and calculates Ipf =
                Uo / Z.
              </li>
              <li>
                <strong>At the origin:</strong> Ipf is highest. The DNO typically declares a maximum
                external loop impedance (Ze) for the supply. Ipf at origin = Uo / Ze.
              </li>
              <li>
                <strong>At sub-distribution boards:</strong> Ipf reduces as cable impedance is
                added. Ipf = Uo / (Ze + R1 + Rn), where R1 + Rn is the line and neutral conductor
                resistance of the sub-main cable.
              </li>
              <li>
                <strong>Typical UK values:</strong> 1 kA to 16 kA for domestic; up to 50 kA or more
                for large industrial installations near transformers.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Breaking capacity of common devices">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Device Type</th>
                    <th className="py-2 font-medium text-white">Typical Breaking Capacity</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">BS 3036 rewirable fuse</td>
                    <td className="py-2">1 kA to 4 kA</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">MCB to BS EN 60898 (domestic)</td>
                    <td className="py-2">6 kA or 10 kA</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">MCB to BS EN 60898 (enhanced)</td>
                    <td className="py-2">10 kA to 25 kA</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">BS 88 HRC fuse</td>
                    <td className="py-2">Up to 80 kA</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">MCCB to BS EN 60947-2</td>
                    <td className="py-2">16 kA to 150 kA</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-elec-yellow/70">
              <strong>Practical tip:</strong> During periodic inspection, always measure Ipf at the
              origin and at each distribution board. If the supply has been upgraded (e.g., the
              incoming cable or transformer has been changed), Ipf may have increased beyond the
              breaking capacity of existing devices. This is a common finding on older
              installations.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>The adiabatic equation — cable fault withstand</ContentEyebrow>

          <ConceptBlock title="The cable must survive the fault, not just the device">
            <p>
              Even when a protective device has adequate breaking capacity, the cable must also
              survive the fault. During the brief time between the fault occurring and the device
              clearing it, a large current flows through the cable, generating heat. If this heat
              exceeds the thermal capacity of the cable insulation, the insulation will be damaged —
              potentially causing a secondary fault or fire.
            </p>
            <p>
              The adiabatic equation provides the mathematical check. It states that the thermal
              energy let-through by the protective device (I²t, measured in A²s) must not exceed the
              thermal energy the cable can absorb without damage (k²S², also in A²s). The
              'adiabatic' assumption is that during the very short fault duration, all heat is
              retained in the conductor — none escapes through the insulation. This is conservative
              (worst-case) and valid for fault durations up to approximately 5 seconds.
            </p>
          </ConceptBlock>

          <ConceptBlock title="The adiabatic equation">
            <div className="my-4 text-center">
              <p className="font-mono text-lg text-elec-yellow">t ≤ k²S² / I²</p>
            </div>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>t:</strong> Maximum permitted fault duration (seconds)
              </li>
              <li>
                <strong>k:</strong> Constant for conductor/insulation material (from BS 7671 Table
                43.1)
              </li>
              <li>
                <strong>S:</strong> Conductor cross-sectional area (mm²)
              </li>
              <li>
                <strong>I:</strong> Fault current (amperes)
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Values of k (BS 7671 Table 43.1)">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Conductor</th>
                    <th className="py-2 pr-4 font-medium text-white">PVC (70°C)</th>
                    <th className="py-2 font-medium text-white">XLPE (90°C)</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Copper</td>
                    <td className="py-2 pr-4">115</td>
                    <td className="py-2">143</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Aluminium</td>
                    <td className="py-2 pr-4">76</td>
                    <td className="py-2">94</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-[12px] text-white">
              Copied faithfully from the original page — not independently verifiable against the
              RAG, which holds rules rather than numeric tables (see conversion report).
            </p>
          </ConceptBlock>

          <ConceptBlock title="Worked example">
            <div className="rounded bg-black/30 p-3 text-sm text-white">
              <p className="mb-2">
                <strong>Scenario:</strong> A 4 mm² copper/PVC cable is protected by a 32 A MCB. The
                measured prospective fault current at the MCB is 3 kA (3000 A). Verify the cable can
                withstand the fault.
              </p>
              <ul className="list-disc space-y-1 pl-5 marker:text-elec-yellow/70">
                <li>k = 115 (copper conductor, PVC insulation)</li>
                <li>S = 4 mm²</li>
                <li>k²S² = 115² × 4² = 13,225 × 16 = 211,600 A²s</li>
                <li>
                  Maximum permitted time: t = k²S²/I² = 211,600 / 3000² = 211,600 / 9,000,000 =
                  0.0235 s (23.5 ms)
                </li>
                <li>
                  Check: Does the MCB clear a 3 kA fault in less than 23.5 ms? A Type B 32 A MCB
                  with 6 kA breaking capacity will operate magnetically (instantaneously) at 3 kA,
                  clearing the fault in approximately 5-10 ms. ✓
                </li>
              </ul>
            </div>
            <p className="text-elec-yellow/70">
              <strong>Key point:</strong> The adiabatic equation is particularly important for small
              cables at high fault levels. A 1 mm² cable has only k²S² = 13,225 A²s — at a fault
              current of 6 kA, the maximum permitted clearing time is just 0.37 ms. If the
              protective device cannot clear that fast, a larger cable must be used.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Discrimination, cascading and coordination</ContentEyebrow>

          <ConceptBlock title="Only the device nearest the fault should trip">
            <p>
              In any installation with multiple levels of protection (main switch, sub-main devices,
              final circuit devices), the devices must be coordinated so that a fault causes minimum
              disruption. Ideally, only the device immediately upstream of the fault should operate
              — this is discrimination. In practice, achieving total discrimination across all fault
              current levels requires careful selection and verification using manufacturer
              coordination data.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Discrimination methods">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Time grading:</strong> Each upstream device has a progressively longer time
                delay. Common in industrial installations using adjustable MCCBs or electronic trip
                units.
              </li>
              <li>
                <strong>Current grading:</strong> Upstream devices have higher current settings.
                Effective for overload discrimination but less reliable for short-circuits where
                both devices may operate in the instantaneous region.
              </li>
              <li>
                <strong>Energy (I²t) discrimination:</strong> The I²t let-through of the downstream
                device is less than the I²t needed to trip the upstream device. HRC fuses are
                particularly good at this due to their excellent current-limiting properties.
              </li>
              <li>
                <strong>Zone-selective interlocking (ZSI):</strong> Electronic communication between
                devices — a downstream device signals the upstream device to add a time delay,
                allowing the downstream device to clear the fault first.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Cascading (back-up protection)">
            <p>
              Cascading allows an installation to use downstream devices with a breaking capacity
              lower than the prospective fault current, provided an upstream current-limiting device
              (the back-up device) reduces the let-through energy to within the downstream device's
              capability. This is permitted by BS 7671 Regulation 434.5.1 but only where the devices
              are tested and certified as a coordinated combination by the manufacturer.
            </p>
            <p>
              Example: an MCB with 6 kA breaking capacity installed where the Ipf is 12 kA. An
              upstream BS 88 HRC fuse limits the fault current to below 6 kA. The combination is
              verified by the manufacturer's coordination tables as safe and compliant.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Replacing a device in a coordinated back-up arrangement"
            whatHappens={
              <>
                You must check whether a protective device forms part of a coordinated back-up
                protection arrangement before replacing it. Replacing the upstream fuse with a
                different type or rating could invalidate the coordination.
              </>
            }
            doInstead={
              <>
                Leaving the downstream MCBs unprotected against fault currents exceeding their
                breaking capacity. Always consult manufacturer documentation before changing any
                device in a coordinated system.
              </>
            }
          />

          <ConceptBlock
            title="A key area of the maintenance pathway"
            onSite="Protection coordination is a key area of the electrical engineering maintenance pathway. The ability to verify that protection is correctly coordinated — and to identify when it is not — is essential for maintaining safe and reliable electrical systems."
          >
            <p>
              A coordinated system only stays coordinated if every replacement respects the original
              manufacturer's verified combination.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Overload occurs in a sound circuit from excess demand (1.5-6x design current); short-circuit results from a fault of negligible impedance (100s to 10,000s of amps).',
              'BS 7671 Regulation 434.5.1: breaking capacity must never be less than the prospective fault current (Ipf) at the point of installation.',
              'The adiabatic equation, t <= k squared S squared / I squared, verifies the cable can absorb the fault energy before the device clears it.',
              'Cascading (back-up protection) is only valid where the manufacturer has tested and certified the specific device combination.',
              'Discrimination methods: time grading, current grading, I squared t energy discrimination, and zone-selective interlocking (ZSI).',
              'During periodic inspection, verify breaking capacity >= Ipf, Zs against the tables, and that discrimination is still adequate.',
              'BS 7671 Regulation 435.1 permits a single device to provide both overload and short-circuit protection.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module2-section4-2')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  RCDs and RCBOs
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module2-section4-4')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Earthing Systems (TN, TT, IT)
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule2Section4_3;
