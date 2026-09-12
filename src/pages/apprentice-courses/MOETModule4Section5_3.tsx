/**
 * MOET · Module 4 · Section 5.3 · Subsection 3 — Earth Fault Loop Impedance Testing
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option. NOT ST0154 (the "MOET" the course is named after) —
 * ST0154 v1.6 is still live, but its own EPA plan records that the Electrical
 * Technician option "was retired 31/12/2025" and was replaced by ST1426
 * (single discipline) or ST1443 (dual discipline). The course keeps the MOET
 * name because that is what employers and colleges still call the role.
 *
 * KSBs covered, quoted rather than numbered: the IfATE/Skills England API
 * publishes these statements without their K/S/B codes, and the published
 * numbering has not been verified against a primary source — so do not
 * invent codes here.
 *   Knowledge · "Electrical. Electrical maintenance tools, measurement, and
 *                test equipment application, operation, care and
 *                calibration requirements."
 *              · "Electrical. Inspect and test electrical aspects of plant.
 *                 For example, visual checks, insulation and continuity
 *                 checks, thermographic surveys, and voltage levels."
 *              · "Documentation requirements: documentation control,
 *                 auditable records."
 *
 * Numeric values (Zs limits, Ze typical values, disconnection times) are copied
 * verbatim from the original page and could not be checked against the RAG,
 * which holds regulation rules rather than numeric tables.
 *
 * ✎ The 80% rule on this page is CORRECT — an earlier conversion note called it
 * a GN3 rule of thumb and that was wrong. Verified in bs7671_facets against
 * BS 7671:2018+A4:2026. Both factors are in the Regs and they do different jobs:
 *   · Cmin = 0.95 is the minimum voltage factor inside the formula that sets the
 *     MAXIMUM permitted Zs — "Zs × Ia ≤ Up × Cmin" (Reg 411.4.4 / 411.5.4). For
 *     an LV supply under the ESQCR, Cmin is given the value 0.95.
 *   · 0.8 is the factor applied when comparing a MEASURED Zs, taken at ambient
 *     temperature, against that maximum: the requirement is considered met when
 *     "Zs(m) < 0.8 × (Up / (I × Cmin))". It allows for conductors being hotter
 *     under fault than they were when you tested.
 * So the page teaching "measured Zs must not exceed 80% of the tabulated
 * maximum" is right. What the page does not explain is where the tabulated
 * maximum itself comes from — that is the Cmin formula above. Do not "correct"
 * 0.8 to 0.95; they are not alternatives to each other.
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
  AppendixTable,
  VideoCard,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Earth Fault Loop Impedance Testing - MOET Module 4.5.3';
const DESCRIPTION =
  'Comprehensive guide to earth fault loop impedance testing in electrical maintenance: Ze and Zs measurements, disconnection time verification, test methods, and interpretation of results in accordance with BS 7671.';

const quickCheckQuestions = [
  {
    id: 'efli-purpose',
    question: 'What is the primary purpose of earth fault loop impedance (Zs) testing?',
    options: [
      'To measure the insulation resistance between the live conductors and earth',
      'To confirm the polarity of the line and neutral connections at each outlet',
      'To confirm the loop impedance is low enough for the device to disconnect in time',
      'To determine the prospective short-circuit current between line and neutral',
    ],
    correctIndex: 2,
    explanation:
      'Earth fault loop impedance testing verifies that the total impedance of the fault current path is low enough to ensure sufficient fault current flows to operate the protective device within the maximum disconnection time specified by BS 7671. For socket outlet circuits in TN systems, this is 0.4 seconds; for fixed equipment circuits, it is 5 seconds.',
  },
  {
    id: 'efli-components',
    question: 'The earth fault loop impedance (Zs) consists of which components?',
    options: [
      'The external loop impedance plus line and CPC resistance: Zs = Ze + (R1+R2)',
      'The resistance of the line conductor (R1) and the neutral conductor (Rn) only',
      'The external impedance (Ze) plus the insulation resistance of the circuit',
      'The resistance of the circuit protective conductor (R2) measured on its own',
    ],
    correctIndex: 0,
    explanation:
      'The total earth fault loop impedance (Zs) is the sum of the external earth fault loop impedance (Ze — from the supply transformer, distribution network, and return path to the transformer) and the internal impedance of the circuit (R1+R2 — the line conductor and circuit protective conductor). Both components must be as low as possible to ensure adequate fault current.',
  },
  {
    id: 'efli-ze-measurement',
    question: 'How is the external earth fault loop impedance (Ze) measured?',
    options: [
      'At the furthest socket outlet of each final circuit, with the circuit energised',
      'At the origin, with the main earthing conductor disconnected from the earth terminal',
      'By measuring the main earthing conductor resistance with a low-resistance ohmmeter',
      'At the consumer unit, with all final circuits connected and loaded to rated current',
    ],
    correctIndex: 1,
    explanation:
      "Ze is measured at the origin of the installation (typically the main switch or consumer unit) with the main earthing conductor disconnected from the main earthing terminal. This isolates the measurement from the installation's own earthing arrangement (earth electrodes, bonding conductors), giving the true external impedance. The installation must be isolated from the supply during this measurement for safety.",
  },
  {
    id: 'efli-80-percent',
    question:
      'Why should the measured Zs not exceed 80% of the maximum tabulated value in BS 7671?',
    options: [
      'Because the test instrument is only accurate to within 80% of the true value',
      'Because the tabulated values already include a 20% safety margin that must be doubled',
      'Because the supply voltage is permitted to fall by up to 20% during a fault',
      'Because hot conductors and varying supply impedance need a margin to stay within the limit',
    ],
    correctIndex: 3,
    explanation:
      'The maximum Zs values tabulated in BS 7671 assume conductor temperatures under fault conditions (typically 70-80°C or higher). Measurements taken with test instruments are at ambient temperature, where conductor resistance is lower. Additionally, supply impedance varies with network load conditions. The 80% rule (or correction factor of 0.8) ensures that even when conductors are hot and supply impedance is at its highest, the Zs will still be within the maximum permitted value.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'For a 230 V circuit protected by a 32 A Type B MCB, BS 7671 specifies a maximum Zs of 1.37 Ω for 0.4 s disconnection. The maximum measured Zs at ambient temperature should not exceed:',
    options: [
      '1.37 Ω',
      '1.10 Ω (80% of 1.37 Ω)',
      '0.69 Ω (50% of 1.37 Ω)',
      '2.74 Ω (double the tabulated value)',
    ],
    correctAnswer: 1,
    explanation:
      'The maximum measured Zs at ambient temperature should not exceed 80% of the tabulated maximum value: 1.37 × 0.8 = 1.096 Ω, rounded to 1.10 Ω. This allows for the increase in conductor resistance at elevated temperatures during a fault and for variations in supply impedance.',
  },
  {
    id: 2,
    question:
      'The maximum disconnection time for a socket outlet circuit in a TN system under BS 7671 is:',
    options: ['5 seconds', '0.2 seconds', '0.4 seconds', '10 seconds'],
    correctAnswer: 2,
    explanation:
      'BS 7671 requires a maximum disconnection time of 0.4 seconds for circuits supplying socket outlets and portable equipment in TN systems. This shorter time is required because users are likely to be in direct contact with earthed equipment (via the plug and cord) when a fault occurs, creating a higher risk of electric shock.',
  },
  {
    id: 3,
    question:
      'In a TT earthing system, earth fault loop impedance is typically much higher than in a TN system because:',
    options: [
      'The line and neutral conductors are deliberately undersized in TT installations',
      'The supply transformer in a TT system runs at a much lower secondary voltage',
      'TT systems use aluminium conductors, which have a higher resistance than copper',
      'The fault return path is through the high-resistance mass of earth, not a metallic path',
    ],
    correctAnswer: 3,
    explanation:
      "In a TT system, the fault current return path is through the mass of earth — from the installation's earth electrode through the ground to the supply transformer's earth electrode. The resistance of this earth path is typically much higher (often 20 Ω or more) than the metallic return path in a TN system (typically less than 1 Ω). This is why TT systems almost always require RCD protection rather than relying on overcurrent devices for earth fault disconnection.",
  },
  {
    id: 4,
    question: 'A live earth fault loop impedance test instrument works by:',
    options: [
      'Drawing a fault current through a known resistance and finding impedance from V/I',
      'Injecting a high-voltage DC pulse between line and earth and timing the decay',
      'Measuring the insulation resistance between line and the circuit protective conductor',
      'Comparing the line and neutral voltages while the circuit carries its rated load',
    ],
    correctAnswer: 0,
    explanation:
      "A live Zs test instrument briefly connects a known resistance between line and earth, causing a controlled fault current to flow around the earth fault loop. The instrument measures the voltage drop caused by this current and calculates the loop impedance using Ohm's law (Z = V/I). The test is conducted on the energised circuit and typically lasts only a few milliseconds to minimise the risk of tripping RCDs.",
  },
  {
    id: 5,
    question:
      'Which protective device type requires the lowest earth fault loop impedance for a given rating?',
    options: [
      'Type AC RCD (trips on residual current of 30 mA)',
      'Type D MCB (trips at 10-20 times rated current)',
      'Type B MCB (trips at 3-5 times rated current)',
      'Type C MCB (trips at 5-10 times rated current)',
    ],
    correctAnswer: 1,
    explanation:
      'Type D MCBs require the highest fault current to trip (10-20 times rated current for instantaneous operation), which means they need the lowest loop impedance to achieve that current. For example, a 32 A Type D MCB may require up to 640 A fault current, needing a Zs of 0.36 Ω or less. Type B MCBs trip at 3-5 times rated current, requiring less fault current and therefore tolerating higher loop impedance.',
  },
  {
    id: 6,
    question:
      'If the measured Ze is 0.35 Ω and the calculated R1+R2 for a circuit is 0.42 Ω, the expected Zs at the furthest point is:',
    options: ['0.35 Ω', '0.42 Ω', '0.77 Ω', '0.07 Ω'],
    correctAnswer: 2,
    explanation:
      'Zs = Ze + (R1+R2) = 0.35 + 0.42 = 0.77 Ω. This calculated value can be used to verify the live Zs measurement — the two should agree within reasonable tolerance. If the measured Zs is significantly different from the calculated value, this indicates a measurement error, an incorrect Ze value, or a problem with the circuit conductors.',
  },
  {
    id: 7,
    question:
      'During a periodic inspection, the measured Zs at a socket outlet is 1.85 Ω. The circuit is protected by a 20 A Type B MCB (maximum tabulated Zs = 2.30 Ω). The result is:',
    options: [
      'Satisfactory — 1.85 Ω is below the tabulated 2.30 Ω, so no correction factor applies',
      'Satisfactory — the measured value should be compared against twice the tabulated maximum',
      'Unsatisfactory — any reading above 1.00 Ω is automatically a fail for a socket circuit',
      'Unsatisfactory — 1.85 Ω exceeds 80% of the maximum (0.8 × 2.30 = 1.84 Ω)',
    ],
    correctAnswer: 3,
    explanation:
      'Applying the 80% rule: 2.30 × 0.8 = 1.84 Ω. The measured value of 1.85 Ω exceeds this limit, meaning that under fault conditions (when conductor temperatures are elevated), the actual Zs may exceed the maximum tabulated value and the MCB may not disconnect within the required time. This should be recorded as unsatisfactory and remedial action recommended.',
  },
  {
    id: 8,
    question:
      'When testing Zs on a circuit protected by an RCD, the test instrument may cause the RCD to trip. The technician should:',
    options: [
      'Use a non-trip or low-current earth loop test mode if available, or accept the trip and reset the RCD after testing',
      'Temporarily link out the RCD with a bridging wire so the test current cannot trip it',
      'Increase the test current to ensure the RCD trips quickly and minimise disruption',
      'Disconnect the circuit protective conductor before carrying out the test',
    ],
    correctAnswer: 0,
    explanation:
      'Modern test instruments often include a non-trip or two-wire earth loop impedance test mode that reduces the test current below the RCD operating threshold. If this mode is not available, the technician should warn affected persons, conduct the test (which will trip the RCD), and reset the RCD afterwards. Bypassing the RCD is not acceptable as it removes fault protection.',
  },
  {
    id: 9,
    question:
      'Prospective fault current (Ipf) is related to earth fault loop impedance by the formula:',
    options: [
      'Ipf = V × Zs (the nominal voltage multiplied by the earth fault loop impedance)',
      'Ipf = V / Zs (where V is the nominal voltage and Zs is the earth fault loop impedance)',
      'Ipf = Zs / V (the earth fault loop impedance divided by the nominal voltage)',
      'Ipf = V² / Zs (the nominal voltage squared divided by the earth fault loop impedance)',
    ],
    correctAnswer: 1,
    explanation:
      'The prospective earth fault current is calculated as Ipf = V / Zs, where V is the nominal supply voltage (230 V for single-phase UK supply) and Zs is the total earth fault loop impedance. For example, if Zs = 0.5 Ω, then Ipf = 230 / 0.5 = 460 A. This fault current must be sufficient to operate the protective device within the required disconnection time.',
  },
  {
    id: 10,
    question: 'A measured Ze of 0.8 Ω in a TN-C-S (PME) system is:',
    options: [
      'Exactly the expected value for a TN-C-S supply, requiring no further action',
      'Lower than expected, indicating an unusually good supply earth connection',
      'Higher than the typical 0.35 Ω maximum — a possible supply fault to report to the DNO',
      'Acceptable, only because TN-C-S supplies have no specified maximum value of Ze',
    ],
    correctAnswer: 2,
    explanation:
      'For a TN-C-S (PME) supply, the typical maximum Ze is 0.35 Ω. A reading of 0.8 Ω is significantly higher than expected and may indicate a problem with the supply neutral-earth conductor, a poor connection at the supply intake, or a high-impedance supply network. This should be reported to the distribution network operator (DNO) for investigation, as it affects the safety of the entire installation.',
  },
  {
    id: 11,
    question:
      'Why might the measured Zs at a socket outlet differ from the calculated value (Ze + R1+R2)?',
    options: [
      'The calculated value always assumes the circuit is carrying its full rated load',
      'The test instrument measures only the R2 component and ignores the line conductor',
      'Calculated values include the RCD operating current but measured values do not',
      'Supply impedance varies, parallel earth paths exist, or R1+R2 was measured inaccurately',
    ],
    correctAnswer: 3,
    explanation:
      "The measured Zs may differ from the calculated value for several reasons: supply impedance varies with network load conditions (measured Ze may have changed), parallel earth paths through bonding conductors and other circuits' CPCs can reduce the apparent impedance, or the R1+R2 measurement may have been taken at a different temperature. Reasonable agreement between measured and calculated values provides confidence in both measurements.",
  },
  {
    id: 12,
    question:
      'For a distribution circuit supplying a sub-distribution board, the maximum disconnection time in a TN system is:',
    options: [
      '5 seconds',
      'No disconnection time is required for distribution circuits',
      '0.2 seconds',
      '0.4 seconds',
    ],
    correctAnswer: 0,
    explanation:
      'BS 7671 permits a maximum disconnection time of 5 seconds for distribution circuits (circuits supplying distribution boards rather than final circuits supplying equipment directly). This longer time is acceptable because distribution circuits do not directly supply equipment that users are likely to touch. The Zs values for 5-second disconnection are correspondingly higher than those for 0.4-second disconnection.',
  },
];

const faqs = [
  {
    question: 'Can I measure Ze safely?',
    answer:
      "Measuring Ze requires disconnecting the main earthing conductor from the main earthing terminal, which temporarily removes the installation's earth connection. This must only be done with the installation fully isolated from the supply. The measurement is then taken between the incoming line terminal and the incoming earth terminal (or the supply neutral in a TN-C-S system). Due to the safety implications, Ze measurement is typically performed by experienced inspectors rather than during routine maintenance.",
  },
  {
    question: 'What is the difference between Zs and Ze?',
    answer:
      "Ze is the external earth fault loop impedance — the impedance of the fault loop outside the installation, including the supply transformer, distribution cables, and the return path (either metallic in TN systems or through earth in TT systems). Zs is the total earth fault loop impedance at a specific point in the installation, comprising Ze plus the impedance of the circuit's line conductor and CPC (R1+R2) from the origin to that point. Zs increases along the circuit as you move further from the origin.",
  },
  {
    question: 'Why do different MCB types have different maximum Zs values?',
    answer:
      'Different MCB types (B, C, D) have different instantaneous trip thresholds. Type B trips at 3-5 times rated current, Type C at 5-10 times, and Type D at 10-20 times. A higher trip threshold requires more fault current to achieve instantaneous disconnection, which requires lower loop impedance (since I = V/Z). This is why Type D MCBs have the lowest maximum Zs values — they need the most fault current to operate quickly.',
  },
  {
    question: 'What should I do if Zs exceeds the maximum permitted value?',
    answer:
      'If Zs exceeds the maximum permitted value (accounting for the 80% rule), the protective device cannot be relied upon to disconnect within the required time. Options include: installing supplementary RCD protection (which operates on much lower fault currents), reducing the circuit length to lower R1+R2, increasing the cable size to reduce conductor resistance, changing the protective device to one with a lower trip threshold (e.g., Type B instead of Type C), or splitting the circuit into shorter circuits.',
  },
  {
    question: 'Does earth fault loop impedance change over time?',
    answer:
      'Yes. Ze can change due to modifications to the supply network by the DNO. R1+R2 can change due to deterioration of connections (increased resistance) or modifications to the circuit (added length). Temperature affects conductor resistance and therefore Zs. Periodic testing (EICR) monitors these changes and identifies circuits where Zs has increased to a point where it may exceed the maximum permitted value.',
  },
];

const MOETModule4Section5_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 4 · Section 4.5 · Subsection 3"
        title="Earth Fault Loop Impedance Testing"
        backTo="/study-centre/apprentice/m-o-e-t-module4-section5"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Ze and Zs measurements, disconnection time verification, and protective device
            coordination.
          </p>

          <TLDR
            points={[
              'Purpose: Verify protective devices will disconnect within required time',
              'Formula: Zs = Ze + (R1+R2) — total loop impedance',
              '80% rule: Measured Zs must not exceed 80% of tabulated maximum',
              'Times: 0.4 s for sockets, 5 s for fixed equipment (TN systems)',
            ]}
          />

          <ConceptBlock title="Maintenance technician context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Live test:</strong> Zs tested on energised circuits — requires care and
                competence
              </li>
              <li>
                <strong>RCD interaction:</strong> Test may trip RCDs — use non-trip mode where
                available
              </li>
              <li>
                <strong>Verification:</strong> Compare measured Zs against calculated (Ze + R1+R2)
              </li>
              <li>
                <strong>ST1426:</strong> Maps to testing, verification, and protection coordination
              </li>
            </ul>
          </ConceptBlock>

          <Prerequisites
            items={[
              {
                term: 'Circuit protection and earthing',

                gist: 'Fuses, circuit breakers, RCDs and RCBOs, earthing arrangements and protective bonding — what each device protects against and how fault current gets back to source.',

                where: '2.4',
              },

              {
                term: 'Continuity testing',

                gist: 'Measuring R1+R2 and ring final continuity, and what those readings let you predict without a live test.',

                where: '4.5.2',
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
              'Explain the earth fault loop and why its impedance determines protective device operating time',
              'Distinguish between Ze and Zs and describe how each is measured',
              'Apply the 80% rule to determine whether measured Zs values are satisfactory',
              'Identify the maximum disconnection times for different circuit types in TN and TT systems',
              'Use Zs values to calculate prospective earth fault current',
              'Describe the differences in earth fault protection between TN, TT, and TN-C-S systems',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Understanding the earth fault loop</ContentEyebrow>

          <ConceptBlock
            title="Understanding the Earth Fault Loop"
            onSite="Why this test is safety-critical: If the earth fault loop impedance is too high, a line-to-earth fault will not generate enough current to trip the protective device quickly. This means that any exposed metalwork connected to the faulty circuit remains at a dangerous voltage for an extended period — potentially indefinitely if the fault current is below the device's minimum operating current. During this time, anyone touching the metalwork and earth simultaneously will receive an electric shock."
          >
            <p>
              The earth fault loop is the complete circuit that fault current follows when a line
              conductor makes contact with an earthed part — such as the metal casing of an
              appliance or the armouring of a cable. Understanding this loop is fundamental to
              electrical safety, because it is the impedance of this loop that determines how much
              fault current flows and therefore how quickly the protective device operates to
              disconnect the supply.
            </p>
            <p>
              In a TN system (the most common in the UK), the earth fault loop comprises: the supply
              transformer secondary winding, the line conductor from the transformer to the point of
              fault, the fault itself (assumed to be a zero-impedance bolted fault for calculation
              purposes), the circuit protective conductor from the point of fault back to the main
              earthing terminal, and the return path through the supply neutral (or combined
              neutral/earth in TN-C-S systems) back to the transformer. The total impedance of this
              complete loop determines the fault current: I = V/Zs.
            </p>
            <p>
              For the protective device to operate within the required disconnection time, the fault
              current must exceed the device&apos;s instantaneous trip threshold. For a 32 A Type B
              MCB, this threshold is 5 times the rated current (160 A), requiring a maximum Zs of
              230/160 = 1.44 Ω (the tabulated value in BS 7671 is 1.37 Ω, accounting for a slightly
              reduced voltage during the fault). If the loop impedance is too high, the fault
              current will be too low, and the MCB will not trip instantly — it may trip on its
              thermal element after several seconds, or it may not trip at all.
            </p>
          </ConceptBlock>

          <AppendixTable
            caption="Typical Ze Values for UK Earthing Systems"
            headers={['Earthing System', 'Typical Maximum Ze', 'Earth Fault Return Path']}
            rows={[
              ['TN-C-S (PME)', '0.35 Ω', 'Combined neutral/earth (PEN) conductor'],
              ['TN-S', '0.80 Ω', 'Separate metallic earth conductor (cable sheath)'],
              ['TT', '21 Ω (variable)', 'Mass of earth between electrodes'],
            ]}
          />

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Measuring Ze — external earth fault loop impedance</ContentEyebrow>

          <ConceptBlock title="Measuring Ze — External Earth Fault Loop Impedance">
            <p>
              The external earth fault loop impedance (Ze) represents the impedance of the earth
              fault loop outside the installation — from the supply transformer, through the
              distribution network, to the point of supply at the installation. This value is
              determined by the electricity supply and is largely outside the control of the
              installation designer or maintainer. However, it must be measured and verified because
              it directly affects the maximum circuit lengths that can be achieved while maintaining
              adequate disconnection times.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Ze measurement procedure">
            <p>
              Measuring Ze requires care because the main earthing conductor must be temporarily
              disconnected:
            </p>
            <ol className="list-decimal space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Isolate the complete installation from the supply</li>
              <li>Disconnect the main earthing conductor from the main earthing terminal</li>
              <li>Re-energise the supply (with the installation still isolated internally)</li>
              <li>
                Measure between the incoming line terminal and the incoming earth terminal using the
                earth loop impedance test function
              </li>
              <li>Record the Ze value</li>
              <li>
                De-energise the supply, reconnect the main earthing conductor, and restore the
                installation
              </li>
            </ol>
          </ConceptBlock>

          <ConceptBlock title="Alternative: calculating Ze from Zs and R1+R2">
            <p>
              If Ze cannot be measured directly (for example, in a domestic property where the
              supply cannot be readily accessed), it can be calculated by measuring Zs at the origin
              of the installation (at the main switch or consumer unit) and subtracting the R1+R2 of
              the meter tails: Ze = Zs(origin) - R1+R2(tails). Alternatively, the enquiry Ze value
              provided by the distribution network operator (DNO) can be used for design purposes,
              though measured values are preferred for verification.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Measuring Zs — total earth fault loop impedance</ContentEyebrow>

          <ConceptBlock title="Measuring Zs — Total Earth Fault Loop Impedance">
            <p>
              Zs is measured at each point where disconnection time verification is required —
              typically at the furthest point of each circuit. Unlike Ze, Zs is measured on the
              energised (live) circuit, which requires particular care and competence. The test
              instrument briefly creates a controlled fault condition to measure the loop impedance,
              and the technician must be aware of the implications.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Zs test procedure">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Energise the circuit:</strong> The circuit must be live for a Zs measurement
                — this is a live test
              </li>
              <li>
                <strong>Connect the instrument:</strong> At the furthest point of the circuit
                (furthest socket outlet or furthest fixed equipment point), connect the test
                instrument between line and earth
              </li>
              <li>
                <strong>Take the reading:</strong> The instrument creates a brief controlled fault
                and displays the Zs value
              </li>
              <li>
                <strong>Apply the 80% rule:</strong> Compare the measured value against 80% of the
                maximum tabulated value for the protective device type and rating
              </li>
              <li>
                <strong>Cross-check:</strong> Verify the measured Zs against the calculated value
                (Ze + R1+R2) — they should be in reasonable agreement
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="RCD interaction"
            onSite="Live working precautions: Zs testing is one of the few tests that requires the circuit to be energised. The technician must use GS 38-compliant test leads (with fused probes, finger guards, and limited exposed tip length), ensure they are competent to work on or near live equipment, and have appropriate personal protective equipment available. The test should be planned and the risks assessed before proceeding."
          >
            <p>
              Standard earth loop impedance test instruments draw a significant test current
              (typically 10-25 A for a fraction of a second). On circuits protected by 30 mA RCDs,
              this test current will almost certainly trip the RCD. Options include: using the
              instrument&apos;s non-trip earth loop test mode (which uses a lower test current and a
              different measurement technique), testing from the line side of the RCD, or accepting
              that the RCD will trip and resetting it after the test. Some modern instruments can
              measure Zs without tripping a 30 mA RCD, but the result may be less accurate.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Disconnection times and protective device coordination</ContentEyebrow>

          <ConceptBlock title="Disconnection Times and Protective Device Coordination">
            <p>
              The maximum disconnection time is the longest acceptable period between the occurrence
              of an earth fault and the operation of the protective device to disconnect the supply.
              BS 7671 specifies different disconnection times depending on the type of circuit and
              the earthing system, reflecting the different levels of risk associated with each.
            </p>
          </ConceptBlock>

          <AppendixTable
            caption="Maximum Disconnection Times — TN Systems"
            headers={['Circuit Type', 'Max Time', 'Rationale']}
            rows={[
              [
                'Socket outlet circuits (32 A and below)',
                '0.4 s',
                'Users in direct contact with equipment via plug and cord',
              ],
              [
                'Fixed equipment circuits',
                '5 s',
                'Lower risk — equipment permanently connected, less direct contact',
              ],
              [
                'Distribution circuits',
                '5 s',
                'Supplying sub-distribution boards, not final equipment',
              ],
            ]}
          />

          <ConceptBlock title="TT systems — RCD protection">
            <p>
              In TT systems, the earth fault loop impedance is typically too high for overcurrent
              devices to provide disconnection within the required times. RCD protection is
              therefore essential. The maximum Zs for a 30 mA RCD to disconnect within 0.2 seconds
              (as required by BS 7671 for TT systems) is 1667 Ω — vastly higher than could be
              achieved by an MCB. This is because the RCD detects the imbalance between line and
              neutral currents (caused by the fault current flowing through earth) and does not rely
              on the magnitude of the fault current to operate.
            </p>
            <p>
              <strong>Key point:</strong> The earth fault loop impedance test is the ultimate
              verification that the protective device will do its job when called upon. All the
              other tests — continuity, insulation resistance, polarity — contribute to the overall
              safety of the installation, but it is the earth fault loop impedance that directly
              determines whether the protective device can disconnect a fault within the time
              necessary to prevent electric shock.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Prospective fault current and recording results</ContentEyebrow>

          <ConceptBlock title="Prospective Fault Current and Recording Results">
            <p>
              Closely related to earth fault loop impedance is the prospective fault current (Ipf) —
              the maximum current that would flow during a fault at a given point in the
              installation. BS 7671 requires Ipf to be determined at the origin of the installation
              and at other relevant points. The protective device must be capable of safely
              interrupting this current without sustaining damage — its breaking capacity must equal
              or exceed the Ipf.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Calculating prospective fault current">
            <p>
              For an earth fault: Ipf = Uo / Zs (where Uo is the nominal line-to-earth voltage, 230
              V in the UK)
            </p>
            <p>
              For a short-circuit fault (line-to-neutral): Ipf = Uo / (R1+Rn), where Rn is the
              neutral conductor resistance
            </p>
            <p>
              Modern multifunction test instruments can measure both Ipf values directly. The
              highest Ipf is typically at the origin of the installation where the loop impedance is
              lowest. This value is compared against the breaking capacity of the protective devices
              to ensure they can safely interrupt the maximum possible fault current.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Recording results">
            <p>
              Earth fault loop impedance results are recorded on the Schedule of Test Results — one
              entry for each circuit tested. The Zs value at the furthest point is recorded, along
              with the protective device type and rating. For EICRs, the results are compared
              against the maximum permitted values, and any circuits where Zs exceeds the limit are
              coded accordingly (typically C2 for potentially dangerous). The Ze value is recorded
              in the general section of the certificate, as it applies to the entire installation.
            </p>
            <p className="italic">
              <strong className="not-italic">ST1426 link:</strong> Understanding earth fault loop
              impedance and its relationship to protective device operation is a fundamental
              competency for maintenance technicians. The ability to measure Zs, compare it against
              tabulated values, apply the 80% rule, and identify circuits that do not meet the
              required standard is directly assessed in the end-point assessment.
            </p>
          </ConceptBlock>

          <SectionRule />

          <VideoCard
            url="https://www.youtube.com/watch?v=UwBo23MUJT4"

            title="Zs Testing and GN3 — The Facts"

            channel="Craig Wiltshire"

            duration="3:42"

            topic="Where the correction factor for measured Zs actually comes from"

            caption="Directly relevant to this page: it separates the rule for comparing a measured Zs from the tabulated maximum itself, which is where most of the confusion sits."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Key formulae: Zs = Ze + (R1+R2); Ipf = Uo / Zs (earth fault current); max measured Zs = 0.8 x tabulated Zs.',
              'Typical Ze: TN-C-S 0.35 Ω max; TN-S 0.80 Ω max.',
              'Disconnection times (TN): socket outlets 0.4 s maximum; fixed equipment 5 s maximum; distribution circuits 5 s maximum.',
              'TT systems require RCD protection (0.2 s typical) rather than relying on overcurrent devices alone.',
              'Always apply the 80% rule to live-measured Zs values before comparing against the tabulated maximum.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module4-section5-2')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Continuity Testing
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module4-section5-4')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Functional Testing
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule4Section5_3;
