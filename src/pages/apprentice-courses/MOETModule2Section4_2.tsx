/**
 * MOET · Module 2 · Section 2.4 · Subsection 2 — RCDs and RCBOs
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
 *   · "Electrical. Principles of single phase and three-phase equipment,
 *     plant, and systems, the operation of motors and generators, and the
 *     use…"
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

const TITLE = 'RCDs and RCBOs - MOET Module 2 Section 4.2';
const DESCRIPTION =
  'Comprehensive guide to residual current devices and combined protection units for electrical maintenance technicians: RCD operating principles, sensitivity ratings, types AC/A/F/B, RCBOs, BS 7671 requirements and testing.';

const quickCheckQuestions = [
  {
    id: 'rcd-operating-principle',
    question: 'What physical principle does an RCD use to detect earth fault current?',
    options: [
      'It measures the absolute current in the line conductor against a fixed threshold',
      'It detects the imbalance between line and neutral currents using a current transformer',
      'It compares the supply voltage with the voltage on the earth terminal',
      'It senses the temperature rise in the protected conductor under fault',
    ],
    correctIndex: 1,
    explanation:
      'An RCD uses a toroidal (ring-shaped) current transformer through which both the line and neutral conductors pass. Under normal conditions, the currents in line and neutral are equal and opposite, producing zero net flux. When an earth fault diverts current away from the neutral return path, an imbalance is detected, inducing a voltage in the sensing coil that triggers the trip mechanism.',
  },
  {
    id: 'rcd-30ma-purpose',
    question: 'A 30 mA RCD is primarily intended to provide protection against:',
    options: [
      'Overload current in the protected final circuit',
      'Short-circuit fault current between line and neutral',
      'Voltage surges caused by lightning or switching transients',
      'Electric shock by contact with live parts (additional protection)',
    ],
    correctIndex: 3,
    explanation:
      'A 30 mA (0.03 A) rated residual operating current (I Delta n) is the threshold recognised as providing additional protection against electric shock. At 30 mA, the current is below the level that would typically cause ventricular fibrillation in a healthy adult, provided the device operates within its specified time (40 ms at 5 x I Delta n for Type AC).',
  },
  {
    id: 'rcbo-advantage',
    question: 'What is the key advantage of an RCBO over a shared RCD protecting several circuits?',
    options: [
      'An RCBO has a faster disconnection time than any RCD can achieve',
      'An RCBO combines overcurrent and earth fault protection in a single device, allowing individual circuit protection',
      'An RCBO does not require periodic testing once installed',
      'An RCBO can be reset remotely without access to the consumer unit',
    ],
    correctIndex: 1,
    explanation:
      "An RCBO (Residual Current operated Circuit Breaker with integral Overcurrent protection) combines MCB and RCD functions in a single device. This allows each circuit to have individual earth fault protection — if one circuit develops an earth fault, only that circuit's RCBO trips, leaving all other circuits unaffected. With a shared RCD protecting multiple circuits, all circuits on that RCD lose supply when any one develops a fault.",
  },
  {
    id: 'rcd-type-a',
    question: 'A Type A RCD is designed to detect which types of residual current?',
    options: [
      'Smooth DC residual currents only',
      'High-frequency residual currents above 1 kHz',
      'AC sinusoidal residual currents only',
      'AC sinusoidal and pulsating DC residual currents',
    ],
    correctIndex: 3,
    explanation:
      'A Type A RCD detects both AC sinusoidal residual currents and pulsating DC residual currents (which contain a DC component). Pulsating DC residual currents are commonly produced by rectifier circuits found in electronic equipment such as EV chargers, IT equipment and variable speed drives. BS 7671 requires Type A (minimum) for most applications.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'The rated residual operating current (I Delta n) of an RCD is defined as:',
    options: [
      'The maximum continuous current the device can carry',
      'The value of residual current at which the device is designed to operate',
      'The maximum fault current the device can interrupt',
      'The leakage current of the protected circuit',
    ],
    correctAnswer: 1,
    explanation:
      'I Delta n (I∆n) is the rated residual operating current — the value of earth fault (residual) current at which the RCD is designed to operate and disconnect the supply. Standard values include 30 mA, 100 mA and 300 mA. The device must operate at or below this current within the time specified by its standard.',
  },
  {
    id: 2,
    question:
      'Under BS 7671 Regulation 411.3.3, additional protection by means of a 30 mA RCD is required for:',
    options: [
      'Fixed appliances rated above 32 A in commercial premises only',
      'Three-phase distribution circuits feeding sub-main boards',
      'Socket outlets rated up to 32 A and mobile equipment rated up to 32 A used outdoors',
      'Lighting circuits in commercial buildings but not in dwellings',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 411.3.3 requires additional protection by a 30 mA RCD for socket outlets with a rated current not exceeding 32 A (except where a risk assessment justifies otherwise) and for mobile equipment with a rated current not exceeding 32 A intended for use outdoors. Regulation 411.3.4 adds AC final circuits supplying luminaires in domestic premises, so in a dwelling the two together cover effectively every circuit. Note the 411.3.3 risk-assessment exception is worded "other than for a dwelling" — it is not available domestically.',
  },
  {
    id: 3,
    question: 'A Type AC RCD will NOT reliably detect:',
    options: [
      'A sinusoidal AC residual current at 50 Hz',
      'An earth fault on a purely resistive heating load',
      'A residual current caused by deteriorated cable insulation',
      'A pulsating DC earth fault current from a rectifier circuit',
    ],
    correctAnswer: 3,
    explanation:
      "Type AC RCDs are designed only for sinusoidal AC residual currents. They cannot reliably detect pulsating DC or smooth DC residual currents. Equipment containing rectifiers (single-phase or three-phase) can produce DC components in the fault current that may saturate a Type AC RCD's core, preventing it from operating. This is why Type A or Type F devices are required for such applications.",
  },
  {
    id: 4,
    question: 'How often should the user press the integral test button of an RCD?',
    options: [
      'At intervals not exceeding 6 months (quarterly recommended for domestic)',
      'Only once, immediately after the device is first installed',
      'Every day before the installation is energised',
      'Only when a fault is suspected on the protected circuit',
    ],
    correctAnswer: 0,
    explanation:
      'BS 7671 and manufacturer guidance require that RCDs are tested using the integral test button at regular intervals — typically quarterly for domestic installations. The test button creates a controlled imbalance to verify the mechanical trip mechanism operates correctly. This functional test does not verify tripping time — that requires an RCD tester during formal inspection and testing.',
  },
  {
    id: 5,
    question: "A 'time-delayed' or 'S-type' RCD is used to:",
    options: [
      'Increase the sensitivity of the device to below 30 mA',
      'Provide a deliberate time delay to achieve discrimination with downstream instantaneous RCDs',
      'Detect smooth DC residual currents that a Type A cannot',
      'Allow the device to carry a higher continuous load current',
    ],
    correctAnswer: 1,
    explanation:
      'An S-type (selective, time-delayed) RCD has an intentional time delay (typically 40-500 ms depending on the fault current multiple) that allows a downstream instantaneous RCD to operate first on a fault in its zone. This achieves RCD discrimination — the upstream S-type remains closed, maintaining supply to other circuits, while the downstream device clears the fault.',
  },
  {
    id: 6,
    question:
      'When testing an RCD with an instrument during periodic inspection, the device must trip within:',
    options: [
      '100 ms at rated residual current and 10 ms at 5 x I Delta n',
      '5 seconds at rated residual current and 200 ms at 5 x I Delta n',
      '300 ms at rated residual current and 40 ms at 5 x I Delta n (for Type AC/A general purpose)',
      '1 second at rated residual current and 300 ms at 5 x I Delta n',
    ],
    correctAnswer: 2,
    explanation:
      'For a general-purpose (non-time-delayed) Type AC or Type A RCD: at I∆n the device must trip within 300 ms; at 5 x I∆n it must trip within 40 ms. The instrument test at 5 x I∆n verifies the fast disconnection required for additional protection against electric shock. The device must NOT trip at 50% of I∆n (non-trip test).',
  },
  {
    id: 7,
    question:
      'Which type of RCD is required by BS 7671 for circuits supplying EV charging equipment?',
    options: [
      'Type AC only, as EV chargers produce purely sinusoidal faults',
      'Any RCD rated at 100 mA or above for fire protection',
      'A time-delayed S-type RCD to achieve discrimination',
      'Type A minimum, with Type B or Type A + Type B RDC-DD where smooth DC fault currents may occur',
    ],
    correctAnswer: 3,
    explanation:
      'EV charging equipment may produce DC fault currents due to the rectification in the charger. BS 7671 and IET guidance require a minimum of Type A RCD protection, with Type B or Type A plus a Type B RDC-DD (residual direct current detecting device) where smooth DC fault currents greater than 6 mA may occur. Many EV charger manufacturers specify the required RCD type in their installation instructions.',
  },
  {
    id: 8,
    question: 'Nuisance tripping of an RCD may be caused by:',
    options: [
      'Excessive standing earth leakage current from multiple items of equipment on the same RCD',
      'An overload on the protected circuit exceeding the rated current',
      'A short-circuit between the line and neutral conductors',
      'The supply voltage falling below the minimum rated value',
    ],
    correctAnswer: 0,
    explanation:
      "Every electrical circuit and item of equipment has some inherent earth leakage current. When multiple items share the same RCD, their cumulative leakage can approach the RCD's operating threshold (I∆n). IET guidance recommends that standing leakage should not exceed 30% of I∆n. For a 30 mA RCD, this means total leakage should be below 9 mA. Excessive leakage causes nuisance tripping, particularly during transient events.",
  },
  {
    id: 9,
    question: 'An RCBO to BS EN 61009 combines the functions of:',
    options: [
      'An RCD and an isolator',
      'An RCD and an MCB in a single device',
      'A surge protection device and an MCB',
      'A time-delay relay and a contactor',
    ],
    correctAnswer: 1,
    explanation:
      'An RCBO (Residual Current operated Circuit Breaker with integral Overcurrent protection) to BS EN 61009 combines the earth fault detection of an RCD with the overcurrent (overload and short-circuit) protection of an MCB in a single device. This provides comprehensive protection — overcurrent, short-circuit and earth fault — on a per-circuit basis.',
  },
  {
    id: 10,
    question:
      'Under BS 7671, what is the maximum disconnection time for a 30 mA RCD providing additional protection?',
    options: [
      '40 ms at I Delta n',
      '5 seconds at I Delta n',
      '40 ms at 5 x I Delta n',
      '300 ms at 5 x I Delta n',
    ],
    correctAnswer: 2,
    explanation:
      'For additional protection against electric shock, BS 7671 Regulation 415.1.1 requires that the RCD operates within 40 ms at a test current of 5 times I∆n (i.e., 150 mA for a 30 mA device). This ensures rapid disconnection that limits the duration of shock to a level considered survivable for most individuals.',
  },
  {
    id: 11,
    question: 'A Type F RCD is specifically designed for circuits supplying:',
    options: [
      'Purely resistive loads such as immersion heaters',
      'Three-phase rectifier loads producing smooth DC fault currents',
      'Standard lighting circuits with no electronic equipment',
      'Equipment with single-phase variable-frequency drives that produce mixed-frequency residual currents',
    ],
    correctAnswer: 3,
    explanation:
      'Type F RCDs are designed for circuits supplying single-phase variable-frequency drives (VFDs/inverters) that may produce composite residual currents containing AC, pulsating DC and mixed-frequency components. They are more sensitive than Type A to these complex waveforms but less expensive than Type B devices. BS 7671 recognises Type F for specific applications.',
  },
  {
    id: 12,
    question: 'If an RCD trips and cannot be successfully reset, the most likely cause is:',
    options: [
      'A persistent earth fault exists on the protected circuit',
      'The integral test button has been left in the pressed position',
      'The supply voltage is slightly higher than the rated value',
      'The device has simply reached the end of its working life',
    ],
    correctAnswer: 0,
    explanation:
      'If an RCD trips and cannot be reset (it trips again immediately when the operating lever is pushed to the ON position), a persistent earth fault exists on one of the circuits it protects. The fault must be located and rectified before the RCD can be successfully reset. Systematic isolation of individual circuits will identify which circuit carries the fault.',
  },
];

const faqs = [
  {
    question: 'What is the difference between an RCD and an RCCB?',
    answer:
      'In practical UK usage, the terms are often interchangeable. Technically, RCD (Residual Current Device) is the generic term for any device that detects residual current. RCCB (Residual Current operated Circuit Breaker) is a specific type of RCD that provides earth fault protection without integral overcurrent protection — it must be used in conjunction with a separate MCB or fuse. An RCBO provides both earth fault and overcurrent protection in one device.',
  },
  {
    question: 'Why does my RCD trip when I press the test button but my circuit has no fault?',
    answer:
      'The test button is designed to simulate an earth fault by passing a small current through an internal resistor from line to earth, bypassing the current transformer. This creates the imbalance the RCD detects. Pressing the test button should always cause the RCD to trip — that is its purpose. It confirms the mechanical trip mechanism is working correctly. It does not indicate a fault on your circuits.',
  },
  {
    question: 'Can I replace a 30 mA RCD with a 100 mA RCD to stop nuisance tripping?',
    answer:
      'You must not increase the rated residual operating current above 30 mA on circuits where BS 7671 requires 30 mA protection (such as socket outlets up to 32 A and circuits in dwellings). The correct approach is to reduce the number of circuits on a single RCD (splitting onto separate RCDs or RCBOs) or to investigate and reduce the standing earth leakage current. A 100 mA or 300 mA RCD does not provide additional protection against electric shock.',
  },
  {
    question: 'How often should RCDs be formally tested with an instrument?',
    answer:
      'Formal instrument testing of RCDs (measuring actual tripping time and tripping current) should be carried out during periodic inspection in accordance with BS 7671 and IET Guidance Note 3. The recommended maximum intervals depend on the installation type — typically 5 years for domestic, 3 years for commercial, and 1 year for industrial. The integral test button should be pressed quarterly by the user.',
  },
  {
    question: 'Do I need RCD protection on lighting circuits in a new dwelling?',
    answer:
      'Yes. Under BS 7671:2018+A4:2026, Regulation 411.3.4 requires additional protection by a 30 mA RCD for AC final circuits supplying luminaires in domestic (household) premises. Together with Regulation 411.3.3 for socket-outlets up to 32 A, that puts RCD protection on effectively every circuit in a new dwelling. It can be achieved using RCBOs for each circuit, a split-load consumer unit with RCDs protecting groups of circuits, or a high-integrity arrangement with two RCDs and appropriate circuit distribution.',
  },
  {
    question: 'What is a Type B RCD and when is it needed?',
    answer:
      'A Type B RCD detects AC sinusoidal, pulsating DC, and smooth DC residual currents at frequencies up to 1 kHz. It is required where equipment may produce smooth DC fault currents that would not be detected by Type A or Type AC devices. Common applications include three-phase variable speed drives, some medical equipment, and certain EV charging installations. Type B RCDs are significantly more expensive than Type A.',
  },
];

const MOETModule2Section4_2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 2 · Section 2.4 · Subsection 2"
        title="RCDs and RCBOs"
        backTo="/study-centre/apprentice/m-o-e-t-module2-section4"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Residual current devices and combined protection units for earth fault protection — how
            an RCD detects a fault, the four types (AC, A, F, B), RCBOs, and the BS 7671
            requirements a maintenance technician must be able to verify.
          </p>

          <TLDR
            points={[
              'RCD: detects current imbalance between L and N (earth leakage).',
              '30 mA: additional protection against electric shock.',
              'Types: AC (sinusoidal), A (+ pulsating DC), F (+ mixed freq), B (+ smooth DC).',
              'RCBO: RCD + MCB combined — individual circuit protection.',
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
              'Explain the operating principle of residual current devices using current balance detection',
              'Identify RCD types (AC, A, F, B) and their appropriate applications',
              'Describe the role of 30 mA RCDs in providing additional protection against electric shock',
              'Understand RCBO construction and the advantages of individual circuit protection',
              'Apply BS 7671 requirements for RCD selection and disconnection times',
              'Carry out functional testing of RCDs and diagnose nuisance tripping',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>How an RCD works — the current balance principle</ContentEyebrow>

          <ConceptBlock title="Detecting current that has gone missing">
            <p>
              The residual current device is one of the most important safety devices in modern
              electrical installations. Its purpose is to detect earth fault currents — current that
              is flowing to earth through an unintended path, such as through a person's body or
              through damaged insulation to an earthed metallic enclosure — and to disconnect the
              supply rapidly before serious harm occurs.
            </p>
            <p>
              The operating principle is elegantly simple. Both the line and neutral conductors of a
              circuit pass through a toroidal (ring-shaped) current transformer core. Under normal,
              healthy conditions, the current flowing out through the line conductor is exactly
              equal to the current returning through the neutral conductor. These equal and opposite
              currents produce equal and opposite magnetic fluxes in the core, which cancel each
              other out, resulting in zero net flux and therefore zero voltage induced in the
              sensing coil wound around the core.
            </p>
            <p>
              When an earth fault occurs, some of the current returns to the source via the earth
              path instead of through the neutral conductor. The line current is now greater than
              the neutral current by the amount of the fault current. This imbalance — the residual
              current — creates a net magnetic flux in the core, which induces a voltage in the
              sensing coil. When this residual current reaches the rated operating threshold (I∆n),
              the induced voltage is sufficient to energise a sensitive relay that releases the trip
              mechanism, disconnecting the circuit.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Key RCD parameters">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Rated residual operating current (I∆n):</strong> The earth fault current at
                which the device operates — 30 mA, 100 mA, or 300 mA are standard values
              </li>
              <li>
                <strong>Rated current (In):</strong> The maximum continuous load current — must be
                coordinated with upstream or integral overcurrent protection
              </li>
              <li>
                <strong>Operating time:</strong> Must not exceed 300 ms at I∆n and 40 ms at 5 × I∆n
                (for general-purpose non-delayed types)
              </li>
              <li>
                <strong>Non-operating current:</strong> The device must NOT trip at 50% of I∆n (15
                mA for a 30 mA device)
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="What an RCD cannot do"
            onSite="An RCD does not protect against overload or short-circuit between line and neutral. It only detects current imbalance (earth leakage). It also cannot protect against shock from contact between line and neutral simultaneously (as no current flows to earth). An RCD provides additional protection — it is not a substitute for basic protection (insulation, barriers) or fault protection (automatic disconnection via overcurrent devices and earthing)."
          >
            <p>
              An RCD only ever responds to an imbalance between line and neutral current. That
              single fact defines both its power and its limits, and it is worth holding in mind
              before you rely on one during fault diagnosis.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>RCD types — AC, A, F and B</ContentEyebrow>

          <ConceptBlock title="Not all earth fault currents are sinusoidal AC">
            <p>
              Not all earth fault currents are pure sinusoidal AC. Modern electronic equipment
              containing rectifiers, inverters and switch-mode power supplies can produce fault
              currents with DC components or complex waveforms. Different RCD types are designed to
              detect different forms of residual current, and selecting the correct type is
              essential for reliable protection.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Type AC">
            <p>
              Detects sinusoidal AC residual currents only. This is the most basic type and is
              identified by a sinusoidal wave symbol on the device. Type AC cannot reliably detect
              pulsating DC or smooth DC residual currents. In fact, a DC component in the fault
              current can saturate the magnetic core, preventing the device from operating even on a
              pure AC fault.
            </p>
            <p>
              <strong>Application:</strong> Very limited in modern installations. BS 7671 generally
              requires Type A as a minimum. Type AC is only suitable where no electronic equipment
              is present.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Type A">
            <p>
              Detects sinusoidal AC and pulsating DC residual currents. Pulsating DC is the waveform
              produced by single-phase rectification (half-wave or full-wave). This type is
              identified by a sinusoidal wave plus a pulsating DC symbol. Type A is the minimum
              requirement for most circuits under current BS 7671 guidance.
            </p>
            <p>
              <strong>Application:</strong> General-purpose protection for circuits supplying
              equipment with single-phase rectifiers — washing machines, dishwashers, IT equipment,
              LED drivers.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Type F">
            <p>
              Detects sinusoidal AC, pulsating DC, and composite residual currents that contain
              mixed frequencies. These complex waveforms are produced by single-phase
              variable-frequency drives and inverter-based equipment. Type F provides enhanced
              sensitivity to these waveforms compared to Type A.
            </p>
            <p>
              <strong>Application:</strong> Circuits supplying single-phase inverter drives (e.g.,
              washing machines with variable-speed motors, heat pumps, some air conditioning units).
            </p>
          </ConceptBlock>

          <ConceptBlock title="Type B">
            <p>
              Detects sinusoidal AC, pulsating DC, smooth DC (up to 1 kHz) and composite residual
              currents. This is the most comprehensive type, required where smooth DC fault currents
              may be present — typically from three-phase rectifier circuits. Type B RCDs use a more
              complex sensing arrangement, often incorporating electronic detection alongside the
              magnetic core.
            </p>
            <p>
              <strong>Application:</strong> Three-phase variable speed drives, some EV charging
              equipment, certain medical devices, three-phase UPS systems.
            </p>
          </ConceptBlock>

          <ConceptBlock title="RCD type selection summary">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Type</th>
                    <th className="py-2 pr-4 font-medium text-white">Detects</th>
                    <th className="py-2 font-medium text-white">Typical Application</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">AC</td>
                    <td className="py-2 pr-4">Sinusoidal AC only</td>
                    <td className="py-2">Purely resistive loads (limited use)</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">A</td>
                    <td className="py-2 pr-4">AC + pulsating DC</td>
                    <td className="py-2">General circuits, single-phase rectifier loads</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">F</td>
                    <td className="py-2 pr-4">AC + pulsating DC + mixed frequency</td>
                    <td className="py-2">Single-phase inverter/VFD circuits</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">B</td>
                    <td className="py-2 pr-4">AC + pulsating DC + smooth DC</td>
                    <td className="py-2">Three-phase VFDs, some EV chargers</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-elec-yellow/70">
              <strong>Maintenance note:</strong> When replacing an RCD, always check that the
              replacement type matches or exceeds the original. Downgrading from Type A to Type AC,
              for example, would remove protection against pulsating DC faults and could be
              dangerous.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>RCBOs — combined protection devices</ContentEyebrow>

          <ConceptBlock title="Earth fault detection plus overcurrent protection in one device">
            <p>
              An RCBO (Residual Current operated Circuit Breaker with integral Overcurrent
              protection) to BS EN 61009 combines the earth fault detection capability of an RCD
              with the overload and short-circuit protection of an MCB in a single compact device.
              This combination provides comprehensive protection for individual circuits and is
              increasingly the standard approach in modern consumer units and distribution boards.
            </p>
            <p>
              The key advantage of RCBOs over a shared RCD protecting multiple circuits is
              selectivity. When a single RCD protects, say, six circuits, an earth fault on any one
              of those circuits will trip the RCD and disconnect all six. In a domestic setting,
              this could mean losing lighting, heating and refrigeration because of a fault on one
              socket circuit. With individual RCBOs, only the circuit with the fault loses supply —
              all other circuits remain energised.
            </p>
          </ConceptBlock>

          <ConceptBlock title="RCBO specifications">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Overcurrent rating (In):</strong> Same as MCB ratings — 6, 10, 16, 20, 25,
                32, 40, 50 A
              </li>
              <li>
                <strong>Trip type:</strong> B, C or D (same characteristics as standalone MCBs)
              </li>
              <li>
                <strong>Residual current rating (I∆n):</strong> Typically 30 mA for final circuits
              </li>
              <li>
                <strong>RCD type:</strong> Type A as standard; Type F and Type B available for
                specialist applications
              </li>
              <li>
                <strong>Breaking capacity:</strong> Typically 6 kA or 10 kA
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Advantages and considerations">
            <p>
              <strong>Advantages:</strong> individual circuit earth fault protection; a fault on one
              circuit does not affect others; easier fault finding — the tripped RCBO identifies the
              faulty circuit; eliminates the need for separate RCDs and split-load boards; supports
              BS 7671 high-integrity arrangements.
            </p>
            <p>
              <strong>Considerations:</strong> higher cost per circuit than a shared RCD
              arrangement; the consumer unit must be compatible (check busbar type); each device
              must still be tested both by push-button and instrument; the correct RCD type (A, F,
              B) must still be selected for the load; replacement must match both MCB and RCD
              specifications.
            </p>
            <p>
              Under BS 7671:2018+A4:2026, Regulation 411.3.4 requires a 30 mA RCD on AC final
              circuits supplying luminaires in domestic premises, and Regulation 411.3.3 requires
              one on socket-outlets up to 32 A. A consumer unit populated entirely with RCBOs is one
              of the simplest ways to satisfy both, whilst giving the best discrimination and
              continuity of supply.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>BS 7671 requirements and disconnection times</ContentEyebrow>

          <ConceptBlock title="Additional protection, TT fault protection and fire protection">
            <p>
              BS 7671 addresses RCD requirements in several regulations. The main provisions relate
              to additional protection (Regulation 411.3.3), fault protection in TT systems
              (Regulation 411.5), and fire protection (Regulation 422.3.9 and 532.1). Understanding
              these requirements is essential for maintenance technicians who need to verify that
              existing RCD protection is adequate and correctly specified.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Key BS 7671 RCD regulations">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Reg 411.3.3 — Additional protection:</strong> 30 mA RCD required for socket
                outlets ≤ 32 A and mobile equipment ≤ 32 A used outdoors. Reg 411.3.4 adds AC final
                circuits supplying luminaires in domestic premises
              </li>
              <li>
                <strong>Reg 411.5 — TT systems:</strong> RCDs are the primary means of fault
                protection in TT earthing systems where the earth fault loop impedance is too high
                for overcurrent devices to achieve disconnection within the required time
              </li>
              <li>
                <strong>Reg 422.3.9 — Fire protection:</strong> 300 mA RCD required where the risk
                of fire is increased (e.g., locations with combustible materials, cable routes
                through fire-risk areas)
              </li>
              <li>
                <strong>Reg 415.1.1 — Disconnection time:</strong> For additional protection, RCD
                must operate within 40 ms at 5 × I∆n
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="RCD test requirements">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Test</th>
                    <th className="py-2 pr-4 font-medium text-white">Test Current</th>
                    <th className="py-2 font-medium text-white">Required Result</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Non-trip (no trip)</td>
                    <td className="py-2 pr-4">50% of I∆n</td>
                    <td className="py-2">Device must NOT trip</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Trip at rated current</td>
                    <td className="py-2 pr-4">100% of I∆n</td>
                    <td className="py-2">≤ 300 ms (general) or ≤ 200 ms (Type S)</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Fast trip (5x)</td>
                    <td className="py-2 pr-4">5 × I∆n</td>
                    <td className="py-2">≤ 40 ms (general purpose)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <CommonMistake
            title="Nuisance tripping — diagnosis and solutions"
            whatHappens={
              <>
                Nuisance tripping is one of the most common RCD-related issues that maintenance
                technicians face. It occurs when the cumulative standing earth leakage current from
                all connected equipment approaches the RCD's operating threshold. IET guidance holds
                that standing leakage should not exceed 30% of I∆n (9 mA for a 30 mA RCD).
              </>
            }
            doInstead={
              <>
                Split circuits across multiple RCDs or use individual RCBOs; investigate specific
                equipment with high leakage (EMC filters, long cable runs); check for deteriorating
                insulation resistance on the circuit. Never uprate the I∆n to stop tripping where 30
                mA protection is required.
              </>
            }
          />

          <ConceptBlock
            title="A core maintenance responsibility"
            onSite="RCDs are life-saving devices. Ensuring they are present where required, correctly specified, and regularly tested is one of your most important responsibilities. Never bypass, remove or defeat an RCD — doing so removes a critical layer of protection and may constitute a criminal offence under the Electricity at Work Regulations 1989."
          >
            <p>
              The ST1426 maintenance technician standard requires understanding of protection
              devices and their role in maintaining electrical safety. Being able to test, diagnose
              and replace RCDs correctly is a core maintenance skill assessed under the electrical
              engineering pathway.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>RCD discrimination and special applications</ContentEyebrow>

          <ConceptBlock title="Only the device nearest the fault should operate">
            <p>
              In installations with multiple levels of RCD protection, it is important that only the
              device nearest to the fault operates, leaving the upstream RCD closed and maintaining
              supply to healthy circuits. This is RCD discrimination (selectivity), and it requires
              careful coordination of device ratings and time delays.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Achieving RCD discrimination">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Time discrimination:</strong> The upstream RCD must be a time-delayed type
                (S-type or selective) with a deliberate operating delay. The downstream RCD is an
                instantaneous type that operates within 40 ms. The upstream S-type has a minimum
                non-operating time that exceeds the downstream device's maximum operating time.
              </li>
              <li>
                <strong>Current discrimination:</strong> The upstream RCD has a higher I∆n rating
                (e.g., 100 mA or 300 mA) than the downstream device (30 mA). However, current
                discrimination alone does not guarantee selectivity — the upstream device may still
                operate on high-magnitude faults.
              </li>
              <li>
                <strong>Combined approach:</strong> For reliable discrimination, both time and
                current discrimination should be employed — the upstream device should have both a
                higher I∆n and a time delay.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Special applications">
            <p>
              <strong>EV charging:</strong> electric vehicle charging circuits require careful RCD
              selection due to the potential for DC fault currents from the charging electronics. BS
              7671 and IET guidance require Type A as minimum, with Type B or Type A plus Type B
              RDC-DD where smooth DC faults exceeding 6 mA may occur. Many EV charger manufacturers
              incorporate DC protection within the unit itself, allowing a standard Type A RCD or
              RCBO to be used upstream.
            </p>
            <p>
              <strong>Fire protection (300 mA):</strong> a 300 mA RCD does not provide shock
              protection but can detect earth leakage currents that could cause heating and ignition
              of combustible materials. BS 7671 Regulation 422.3.9 requires 300 mA RCD protection
              for cable routes in locations with increased fire risk. This is a fire prevention
              measure, not a personnel protection measure.
            </p>
            <p>
              <strong>TT earthing systems:</strong> in TT systems, the earth fault loop impedance is
              typically too high for overcurrent devices to achieve the required disconnection
              times. RCDs become the primary means of fault protection (not just additional
              protection). The maximum earth fault loop impedance for an RCD is calculated as Zs ≤
              50 V / I∆n. For a 30 mA RCD, this gives Zs ≤ 1667 ohms — easily achievable even with a
              basic earth electrode.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'An RCD detects the imbalance between line and neutral current — it does not protect against overload or line-neutral short-circuit.',
              '30 mA RCDs provide additional protection against electric shock; 300 mA RCDs provide fire protection, not shock protection.',
              'Type AC (sinusoidal only), Type A (+ pulsating DC, minimum standard), Type F (+ mixed frequency), Type B (+ smooth DC).',
              'An RCBO combines an RCD and an MCB — individual circuits keep their own earth fault protection instead of sharing one RCD.',
              'IET guidance: standing leakage should not exceed 30% of I Delta n (9 mA for a 30 mA device) — investigate leakage, never uprate the device.',
              'RCD discrimination needs an upstream time-delayed (S-type) device with both a longer time delay and a higher I Delta n than the downstream device.',
              'TT systems rely on RCDs as the primary means of fault protection, not just additional protection, because Zs is too high for overcurrent devices alone.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module2-section4-1')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Fuses and Circuit Breakers
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module2-section4-3')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Overcurrent and Short-Circuit Protection
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule2Section4_2;
