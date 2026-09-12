/**
 * MOET · Module 1 · Section 1.2 · Subsection 5 — Earthing and Bonding for Safety
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
 * numbering has not been verified against a primary source — so do not invent
 * codes here.
 *   Knowledge  · "Electrical. Electrical isolation and deisolation
 *                 requirements: lockout tagout and testing for dead."
 *              · "Work environment hazards and risks. Risk assessments."
 *   Skills     · "Apply health, safety, and environmental procedures in
 *                 compliance with regulations, standards, and guidance."
 *   Behaviours · "Prioritise safe working practices."
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt. Numeric
 * safety values (conductor sizes, disconnection times, resistance limits)
 * are carried over character-for-character — see the spec for this
 * conversion batch.
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
  ContentEyebrow,
  SectionRule,
  AppendixTable,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Earthing and Bonding for Safety - MOET Module 1.2.5';
const DESCRIPTION =
  'Comprehensive guide to earthing and bonding: fault current paths, disconnection times, TN-S/TN-C-S/TT/IT systems, main protective bonding, supplementary bonding, earth electrodes, earth fault loop impedance, protective conductor sizing and testing under BS 7671:2018+A4:2026.';

const quickCheckQuestions = [
  {
    id: 'earthing-purpose',
    question: 'What is the PRIMARY purpose of earthing in an electrical installation?',
    options: [
      'To prevent voltage drop along long cable runs so equipment receives its rated voltage',
      'To limit the maximum demand drawn by the installation from the supply network',
      'To provide a low-impedance fault current path so protective devices operate quickly to disconnect the supply',
      'To reduce electromagnetic interference between adjacent circuits sharing a containment system',
    ],
    correctIndex: 2,
    explanation:
      'The primary purpose of earthing is to provide a low-impedance path for fault current to flow back to the source, enabling protective devices (fuses, MCBs, RCDs) to detect the fault and disconnect the supply within the required time specified in BS 7671. Without an effective earth path, a fault to an exposed-conductive-part could leave it at a dangerous potential indefinitely.',
  },
  {
    id: 'tncs-system',
    question: 'In a TN-C-S (PME) system, the neutral and earth functions are:',
    options: [
      'Kept entirely separate throughout the supply network and the installation as two distinct conductors',
      'Combined in a single PEN conductor in the supply network, then separated at the origin of the installation',
      'Both provided by a local earth electrode installed at the consumer position',
      'Combined throughout the installation right up to each final circuit accessory',
    ],
    correctIndex: 1,
    explanation:
      "In a TN-C-S system (Protective Multiple Earthing / PME), the supply network uses a combined Protective Earth and Neutral (PEN) conductor. At the origin of the consumer's installation, this is separated into distinct neutral (N) and earth (PE) conductors. TN-C-S is the most common earthing system for new installations in the UK. The term 'PME' refers to the multiple earthing of the neutral conductor along the supply network.",
  },
  {
    id: 'bonding-purpose',
    question: 'The purpose of main protective bonding is to:',
    options: [
      'Provide a return path for normal load current shared between the line and neutral conductors',
      'Increase the earth fault loop impedance so that fault currents are limited to safe levels',
      'Isolate extraneous-conductive-parts from the earthing system to prevent stray currents',
      'Ensure all extraneous-conductive-parts are at the same potential as the main earthing terminal, preventing dangerous potential differences during a fault',
    ],
    correctIndex: 3,
    explanation:
      'Main protective bonding connects extraneous-conductive-parts (such as metallic water, gas and oil pipes, structural steelwork and lightning protection systems) to the main earthing terminal. This creates an equipotential zone — ensuring that during a fault, all metallic parts that a person could simultaneously touch are at substantially the same potential, preventing a dangerous voltage across the body.',
  },
  {
    id: 'loop-impedance',
    question: 'Earth fault loop impedance (Zs) must be low enough to ensure that:',
    options: [
      'Sufficient fault current flows to operate the protective device within the disconnection time required by BS 7671',
      'The volt drop on the final circuit stays within the 3% limit for lighting circuits',
      'The insulation resistance of the circuit remains above the 1 MΩ minimum value',
      'The prospective fault current is kept below the breaking capacity of the protective device',
    ],
    correctIndex: 0,
    explanation:
      'The earth fault loop impedance (Zs) determines the fault current that will flow during an earth fault: If = Uo/Zs. If Zs is too high, the fault current will be too low to operate the protective device (fuse or MCB) within the disconnection time specified in BS 7671 (in a 230 V TN system, 0.4 s for final circuits up to 63 A with socket-outlets and up to 32 A supplying only fixed equipment; 5 s for distribution circuits). This would leave the exposed-conductive-part energised at a dangerous potential.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'In a TN-S earthing system, the means of earthing is:',
    options: [
      'An earth electrode installed locally by the consumer at the origin',
      'A separate earth conductor provided by the DNO, typically the cable sheath',
      'The combined PEN conductor of the supply, separated within the installation',
      'The general mass of earth, with no metallic return path to the source',
    ],
    correctAnswer: 1,
    explanation:
      "In a TN-S system, the DNO provides a separate earth conductor — typically the metallic sheath (lead or aluminium) of the supply cable. This is connected to the main earthing terminal of the installation. The 'S' in TN-S stands for 'separate' — the earth (PE) and neutral (N) are separate conductors throughout the entire system.",
  },
  {
    id: 2,
    question: 'A TT earthing system requires:',
    options: [
      'A separate earth conductor provided by the distribution network operator',
      'The neutral and earth to remain combined throughout the installation',
      'The installation to provide its own earth electrode, with the earth return path through the general mass of earth',
      'The source transformer neutral to be left unearthed or impedance-earthed',
    ],
    correctAnswer: 2,
    explanation:
      "In a TT system, the installation provides its own earth electrode (typically a driven rod, plate or foundation earth). The fault current return path is through the general mass of earth back to the source transformer's earthed neutral. Because the earth path impedance is relatively high, TT systems almost always require RCD protection to achieve the required disconnection times.",
  },
  {
    id: 3,
    question: 'The main earthing terminal is the point where:',
    options: [
      'The supply neutral is connected to the line conductors inside the meter tails',
      'The RCD and main switch are mounted within the consumer unit enclosure',
      "The incoming supply cable is jointed to the consumer's meter tails",
      "The earthing conductor, main protective bonding conductors and circuit protective conductors all connect to form the installation's earth reference",
    ],
    correctAnswer: 3,
    explanation:
      "The main earthing terminal (MET) is the central connection point for the installation's earthing system. It connects: the earthing conductor (from the means of earthing), the main protective bonding conductors (from extraneous-conductive-parts), and the circuit protective conductors (via the distribution board). It is the star point of the installation's earth network.",
  },
  {
    id: 4,
    question:
      'Under BS 7671:2018+A4:2026, the minimum cross-sectional area of a main protective bonding conductor in a PME installation with 25 mm² supply tails is:',
    options: ['10 mm²', '6 mm²', '4 mm²', '16 mm²'],
    correctAnswer: 0,
    explanation:
      'For TN-C-S (PME) installations, BS 7671 Table 54.8 specifies minimum bonding conductor sizes. Where the supply neutral is 25 mm² copper, the minimum main protective bonding conductor is 10 mm² copper. For 35 mm² supply tails (common in modern domestic installations), the minimum is 10 mm² copper. These sizes ensure the bonding conductor can carry the prospective fault current without damage.',
  },
  {
    id: 5,
    question: 'Supplementary bonding is required when:',
    options: [
      'Every installation is fed from a TN-C-S (PME) supply arrangement',
      'The conditions for automatic disconnection of supply cannot be met, or in specific special locations such as bathrooms',
      'A new circuit is added to an existing distribution board of any type',
      'The main protective bonding conductor exceeds 10 mm² in cross-sectional area',
    ],
    correctAnswer: 1,
    explanation:
      'Supplementary bonding locally connects exposed-conductive-parts and extraneous-conductive-parts within a specific area. It is required when the conditions for automatic disconnection cannot be met by the protective device, and in special locations defined by BS 7671 (such as bathrooms — Section 701, swimming pools — Section 702). However, BS 7671 now permits supplementary bonding in bathrooms to be omitted if all circuits are RCD-protected (≤30 mA) and the protective conductor meets specific requirements.',
  },
  {
    id: 6,
    question: 'An earth electrode for a TT system is typically:',
    options: [
      "The metallic sheath of the distributor's incoming supply cable",
      'The combined PEN conductor brought into the consumer unit',
      'A driven copper-clad steel rod, copper plate, or foundation earth electrode in direct contact with the general mass of earth',
      'The incoming metallic water service pipe used as the sole earth',
    ],
    correctAnswer: 2,
    explanation:
      'Earth electrodes for TT systems are typically driven copper-clad steel rods (usually 1.2 m lengths coupled together to achieve the required depth), copper plates, or foundation earth electrodes (copper conductors embedded in the concrete foundations). The electrode must be in direct contact with the general mass of earth. Water and gas pipes must NOT be used as the sole means of earthing — they are extraneous-conductive-parts that require bonding TO the earthing system.',
  },
  {
    id: 7,
    question: 'The earth fault loop impedance (Zs) for a circuit is the sum of:',
    options: [
      'The line conductor impedance (R1) and the neutral conductor impedance (Rn) only',
      'The external loop impedance (Ze) minus the circuit protective conductor impedance (R2)',
      'The insulation resistance of the line, neutral and protective conductors',
      'The external loop impedance (Ze), the line conductor impedance (R1) and the circuit protective conductor impedance (R2)',
    ],
    correctAnswer: 3,
    explanation:
      'The total earth fault loop impedance is: Zs = Ze + (R1 + R2), where Ze is the external earth fault loop impedance (from the supply), R1 is the resistance of the line conductor from the distribution board to the point of utilisation, and R2 is the resistance of the circuit protective conductor over the same length. All three elements contribute to determining the fault current that will flow.',
  },
  {
    id: 8,
    question:
      'For a 230 V final circuit supplying socket outlets, protected in a TN system, BS 7671 requires disconnection within:',
    options: ['0.4 seconds', '0.2 seconds', '1.0 second', '5 seconds'],
    correctAnswer: 0,
    explanation:
      'BS 7671 Table 41.1 specifies maximum disconnection times for 230 V TN systems: 0.4 seconds for final circuits up to 63 A with socket-outlets, and up to 32 A supplying only fixed connected equipment; 5 seconds for distribution circuits and for final circuits above those ratings. Fixed equipment does not automatically get 5 s — a 16 A fixed-equipment final circuit still has to clear in 0.4 s. These times ensure that the touch voltage on exposed-conductive-parts does not persist long enough to cause ventricular fibrillation.',
  },
  {
    id: 9,
    question:
      'The protective conductor (CPC) in a ring final circuit can be sized using the adiabatic equation. This equation relates the minimum conductor size to:',
    options: [
      'The ambient temperature, the cable grouping factor and the installation reference method',
      'The prospective fault current, the disconnection time and the material properties of the conductor (k factor)',
      'The nominal voltage, the maximum demand and the diversity factor of the circuit',
      'The volt drop, the route length and the current-carrying capacity of the line conductor',
    ],
    correctAnswer: 1,
    explanation:
      'The adiabatic equation is S = √(I²t) / k, where S is the minimum conductor cross-sectional area (mm²), I is the prospective fault current (A), t is the disconnection time (s), and k is a factor depending on the conductor material and insulation type (from BS 7671 Table 54.2-54.6). This ensures the CPC can carry the fault current without its temperature exceeding safe limits for the insulation.',
  },
  {
    id: 10,
    question:
      'When testing an earthing system, the earth electrode resistance (RA) for a TT system protected by a 30 mA RCD must not exceed:',
    options: [
      '1 Ω',
      '200 Ω',
      '1667 Ω (50 V ÷ 0.03 A)',
      'Any value is acceptable if an RCD is fitted',
    ],
    correctAnswer: 2,
    explanation:
      'For a TT system with RCD protection, the condition is: RA × IΔn ≤ 50 V, where RA is the electrode resistance and IΔn is the rated residual operating current of the RCD. For a 30 mA RCD: RA ≤ 50 / 0.03 = 1667 Ω. In practice, electrode resistance values well below this (typically below 200 Ω) are desirable for reliable RCD operation and to limit touch voltages under fault conditions.',
  },
  {
    id: 11,
    question: 'Temporary earthing for HV maintenance is applied to:',
    options: [
      'Improve the earth electrode resistance of the installation during the works',
      'Provide a functional earth reference for sensitive measurement instruments',
      'Reduce the prospective fault current available at the point of work',
      'Discharge stored energy, protect against inadvertent re-energisation, and ensure the work area remains at earth potential',
    ],
    correctAnswer: 3,
    explanation:
      'Temporary earths (portable earthing equipment) are applied to HV systems during maintenance to: discharge any stored energy (capacitive charge on cables, residual magnetism in transformers), protect workers against inadvertent re-energisation (if someone switches on the supply, the earths create a dead short circuit that will trip the protective device), and ensure the work area conductors remain at earth potential.',
  },
  {
    id: 12,
    question: 'A common earthing defect found during periodic inspection is:',
    options: [
      'Corroded, loose or disconnected main protective bonding conductors',
      'An earth fault loop impedance that is lower than the maximum permitted value',
      'A circuit protective conductor sized larger than the line conductor it serves',
      'A main earthing terminal fitted with the required safety warning label',
    ],
    correctAnswer: 0,
    explanation:
      'Corroded, loose or disconnected bonding conductors are among the most commonly found defects during periodic inspection. Over time, connections can corrode (particularly at dissimilar metal joints), vibration can loosen clamps, and plumbing or gas work can result in bonding being disconnected and not reconnected. These defects can leave metallic parts unbonded, creating a serious risk of dangerous potential differences during a fault.',
  },
];

const faqs = [
  {
    question: 'What is the difference between earthing and bonding?',
    answer:
      'Earthing provides a path for fault current to flow back to the source, enabling protective devices to operate and disconnect the faulty circuit. Bonding connects metallic parts together to ensure they are all at the same potential, preventing dangerous voltage differences that could cause a shock if a person touched two parts at different potentials simultaneously. Both are essential — earthing provides automatic disconnection, bonding provides equipotential protection.',
  },
  {
    question: 'Why does a TT system always need an RCD?',
    answer:
      'In a TT system, the earth fault return path is through the general mass of earth, which has a much higher impedance than the metallic return path in TN systems. This high impedance limits the earth fault current, often to levels too low for fuses or MCBs to operate within the required disconnection time. An RCD detects the imbalance between line and neutral current caused by an earth fault and disconnects the supply at a much lower current (typically 30 mA), providing effective protection even with high earth electrode resistance.',
  },
  {
    question: 'Can I use a water pipe as the sole means of earthing?',
    answer:
      'No. BS 7671 does not permit metallic water, gas or oil pipes to be used as the sole means of earthing. These pipes may be replaced with plastic in the future (or may already have plastic sections), and their continuity cannot be guaranteed. However, metallic pipes that enter the building must be bonded TO the earthing system as extraneous-conductive-parts — they are bonded for safety, not used as the earth itself.',
  },
  {
    question: 'What is an IT earthing system and where is it used?',
    answer:
      'An IT system has an unearthed or impedance-earthed source (the transformer neutral is not connected directly to earth). The first earth fault does not cause a dangerous touch voltage because there is no direct return path to the source. This allows the system to continue operating after a single fault — which is why IT systems are used in critical applications such as operating theatres, intensive care units and continuous process industries where an unexpected disconnection could be life-threatening.',
  },
  {
    question: 'How do I test earth fault loop impedance on a TT system with an RCD?',
    answer:
      "Standard loop impedance testers will trip the RCD on a TT system because they inject a test current that exceeds the RCD threshold. Use a loop impedance tester with a 'non-trip' or 'RCD safe' mode, which limits the test current to below 15 mA. Alternatively, measure Ze at the origin (with the installation disconnected) and add the measured R1+R2 values for the circuit. Some modern testers can measure Zs in the presence of RCDs using a two-wire method.",
  },
];

const MOETModule1Section2_5 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 1 · Section 1.2 · Subsection 5"
        title="Earthing and Bonding for Safety"
        backTo="/study-centre/apprentice/m-o-e-t-module1-section2"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Protective earthing, equipotential bonding and fault current management.
          </p>

          <TLDR
            points={[
              'Earthing: fault current path for automatic disconnection',
              'Bonding: equipotential zone — no dangerous voltage differences',
              'Systems: TN-S, TN-C-S (PME), TT and IT',
              'Testing: Zs, Ze, R1+R2 and earth electrode resistance',
            ]}
          />

          <ConceptBlock title="Key standards at a glance">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>BS 7671:2018+A4:2026:</strong> Chapters 41, 54; Tables 41.1-41.6
              </li>
              <li>
                <strong>EAWR 1989:</strong> Reg 8 (earthing); Reg 9 (integrity of earth)
              </li>
              <li>
                <strong>BS EN 62305:</strong> Lightning protection earthing
              </li>
              <li>
                <strong>ENA ER S34:</strong> DNO earthing requirements
              </li>
            </ul>
          </ConceptBlock>

          <LearningOutcomes
            outcomes={[
              'Explain the purpose of earthing in creating a fault current path for automatic disconnection',
              'Describe the characteristics of TN-S, TN-C-S, TT and IT earthing systems',
              'Identify the requirements for main protective bonding under BS 7671',
              'Calculate earth fault loop impedance and verify disconnection times',
              'Explain protective conductor sizing using the adiabatic equation',
              'Describe testing methods for earthing systems and common defects',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Purpose of earthing</ContentEyebrow>

          <ConceptBlock title="The Purpose of Earthing — Fault Current Paths and Disconnection">
            <p>
              Earthing is one of the most fundamental safety measures in any electrical
              installation. Its primary purpose is to provide a low-impedance path for fault current
              to flow back to the source transformer when a fault occurs between a live conductor
              and an exposed-conductive-part (such as a metal equipment casing). This fault current
              path enables the protective device (fuse, MCB or RCD) to detect the fault and
              disconnect the supply within the time specified by BS 7671.
            </p>
            <p>
              Without an effective earthing system, a fault between a live conductor and a metal
              casing would leave the casing energised at a dangerous potential. Anyone touching the
              casing while simultaneously in contact with earth (through their feet on a conductive
              floor, or by touching another earthed metallic part) would receive an electric shock.
              The earthing system ensures this situation is detected and cleared rapidly — typically
              within 0.4 seconds for circuits supplying socket outlets.
            </p>
          </ConceptBlock>

          <ConceptBlock title="How Earthing Achieves Safety">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Fault current path:</strong> The earthing system provides a low-impedance
                return path for fault current from the point of fault back to the source
                (transformer star point)
              </li>
              <li>
                <strong>Sufficient fault current:</strong> The low impedance ensures enough current
                flows to operate the protective device — for a 32 A Type B MCB, the instantaneous
                trip requires at least 160 A (5 × In)
              </li>
              <li>
                <strong>Fast disconnection:</strong> The protective device disconnects within the
                required time: 0.4 s for final circuits within the 63 A / 32 A limits (TN), 5 s for
                distribution circuits (TN), 0.2 s for TT systems with RCDs
              </li>
              <li>
                <strong>Limited touch voltage:</strong> During the brief fault clearance time, the
                touch voltage on the exposed-conductive-part is limited by the protective device
                operating quickly
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="The Earth Fault Loop">
            <p>
              The earth fault loop is the complete circuit that fault current flows through during
              an earth fault. Understanding its components is essential for testing and verifying
              that disconnection times will be met.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Source impedance:</strong> The transformer winding impedance (typically very
                low, 0.01-0.05 Ω)
              </li>
              <li>
                <strong>Line conductor (R1):</strong> Impedance of the phase conductor from the
                distribution board to the point of fault
              </li>
              <li>
                <strong>Fault:</strong> The fault itself (assumed zero impedance for a bolted fault)
              </li>
              <li>
                <strong>Protective conductor (R2):</strong> Impedance of the CPC from the point of
                fault back to the distribution board
              </li>
              <li>
                <strong>Earthing conductor:</strong> From the distribution board MET to the means of
                earthing
              </li>
              <li>
                <strong>Return path:</strong> Through the supply earth (metallic sheath in TN-S, PEN
                in TN-C-S, or general mass of earth in TT)
              </li>
              <li>
                <strong>Total: Zs = Ze + (R1 + R2)</strong> — all components add up to determine the
                total loop impedance
              </li>
            </ul>
          </ConceptBlock>

          <AppendixTable
            caption="BS 7671 Disconnection Times (Table 41.1)"
            headers={[
              'System',
              'Uo (V)',
              'Final circuits (≤63 A sockets, ≤32 A fixed)',
              'Distribution circuits',
            ]}
            rows={[
              ['TN (TN-S, TN-C-S)', '230 V', '0.4 s', '5 s'],
              ['TT', '230 V', '0.2 s', '1.0 s'],
            ]}
          />

          <ConceptBlock
            title="Every link in the chain matters"
            onSite="The earthing system is only as effective as its weakest link. A corroded connection, an undersized conductor, or a broken protective conductor can render the entire fault protection system ineffective. Regular inspection and testing of the earthing system is essential for continued safety."
          >
            <p>
              Every earth fault relies on every link in the loop — source, conductors, connections
              and return path — being intact and low-impedance at the moment it is needed.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Earthing systems</ContentEyebrow>

          <ConceptBlock title="Earthing Systems — TN-S, TN-C-S, TT and IT">
            <p>
              BS 7671 classifies earthing systems using a letter code defined in IEC 60364. The
              first letter indicates the relationship of the source (transformer) to earth, and the
              second letter indicates the relationship of the exposed-conductive-parts of the
              installation to earth. Understanding which earthing system is in use is essential for
              selecting appropriate protection and calculating disconnection requirements.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Letter Code Explained">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>First letter (source relationship to earth):</strong> T = directly connected
                to earth (terre); I = not connected to earth or connected through a high impedance
              </li>
              <li>
                <strong>Second letter (installation to earth):</strong> T = directly connected to
                earth via local electrode; N = connected to the source earth via the supply network
              </li>
              <li>
                <strong>Subsequent letters:</strong> S = separate neutral and earth conductors; C =
                combined neutral and earth (PEN conductor); C-S = combined in supply, separate in
                installation
              </li>
            </ul>
          </ConceptBlock>

          <AppendixTable
            caption="UK Earthing Systems Comparison"
            headers={[
              'System',
              'Earth Provision',
              'Typical Ze',
              'Typical UK Use',
              'RCD Requirement',
            ]}
            rows={[
              [
                'TN-S',
                'DNO cable sheath (separate PE)',
                '≤0.8 Ω',
                'Older urban areas with lead-sheathed cables',
                'Not essential for ADS (but required for additional protection)',
              ],
              [
                'TN-C-S (PME)',
                'PEN conductor, separated at origin',
                '≤0.35 Ω',
                'Most new installations; majority of UK supplies',
                'Not essential for ADS (but required for additional protection)',
              ],
              [
                'TT',
                "Installation's own earth electrode",
                '≤21 Ω (varies)',
                'Rural areas; overhead supply; no DNO earth',
                'Essential — RCD protection required for all circuits',
              ],
              [
                'IT',
                'Unearthed or impedance-earthed source',
                'Very high',
                'Hospitals (theatres), critical processes',
                'Insulation monitoring device required; RCD on second fault',
              ],
            ]}
          />

          <CommonMistake
            title="PME (TN-C-S) — the broken PEN conductor scenario"
            whatHappens={
              <>
                <p>
                  TN-C-S is the most common earthing system in the UK, but it has specific risks
                  that must be understood, particularly the &apos;broken PEN conductor&apos;
                  scenario.
                </p>
                <ul className="mt-2 list-disc space-y-1.5 pl-5 marker:text-orange-300/70">
                  <li>
                    <strong>Broken PEN risk:</strong> If the combined PEN conductor breaks between
                    the consumer and the substation, the installation&apos;s earthing is lost. Load
                    current from neighbouring properties flows through the consumer&apos;s earth,
                    potentially raising all bonded metalwork to a dangerous potential
                  </li>
                  <li>
                    <strong>Main bonding:</strong> Enhanced main protective bonding requirements for
                    PME — larger minimum conductor sizes to manage the broken PEN scenario
                  </li>
                  <li>
                    <strong>Restrictions:</strong> PME earthing is restricted or prohibited for
                    certain locations: swimming pools, caravan parks (conductive locations), petrol
                    forecourts, and some locations where the broken PEN scenario presents an
                    unacceptable risk
                  </li>
                </ul>
              </>
            }
            doInstead={
              <>
                Always confirm the earthing system type at the start of any work on an installation.
                It determines the disconnection time requirements, the need for RCD protection, the
                bonding conductor sizes and the testing methods. Never assume — verify. BS 7671
                Section 411 specifies the requirements for automatic disconnection in TN-C-S
                systems.
              </>
            }
          />

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Bonding and electrodes</ContentEyebrow>

          <ConceptBlock title="Protective Bonding, Earth Electrodes and Conductor Sizing">
            <p>
              While earthing provides a fault current path for automatic disconnection, protective
              bonding creates an equipotential zone — ensuring that all metallic parts a person
              could simultaneously touch are at substantially the same potential. Together, earthing
              and bonding form the two pillars of protection against electric shock by indirect
              contact (touching an exposed-conductive-part that has become live due to a fault).
            </p>
          </ConceptBlock>

          <ConceptBlock title="Main Protective Bonding (BS 7671 Regulation Group 411.3.1.2)">
            <p>
              Main protective bonding conductors connect extraneous-conductive-parts to the main
              earthing terminal (MET) at the origin of the installation.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>What must be bonded:</strong> Metallic water pipes, metallic gas pipes,
                metallic oil pipes, metallic central heating pipes, structural steelwork, lightning
                protection system earth, other metallic services entering the building
              </li>
              <li>
                <strong>Connection point:</strong> As close as practicable to the point of entry of
                the service into the building, and on the consumer&apos;s side of any insulating
                section or meter
              </li>
              <li>
                <strong>Label:</strong> Every main bonding connection must be labelled: &quot;Safety
                Electrical Connection — Do Not Remove&quot;
              </li>
              <li>
                <strong>Continuity:</strong> The bonding conductor must provide a permanent,
                reliable connection — not reliant on removable fittings
              </li>
            </ul>
          </ConceptBlock>

          <AppendixTable
            caption="Main Protective Bonding Conductor Sizes (BS 7671 Table 54.8)"
            headers={[
              'Supply Neutral CSA (Cu)',
              'Min Bonding Conductor (Cu) — TN-S',
              'Min Bonding Conductor (Cu) — TN-C-S (PME)',
            ]}
            rows={[
              ['Up to 16 mm²', '6 mm²', '10 mm²'],
              ['25 mm²', '6 mm²', '10 mm²'],
              ['35 mm²', '10 mm²', '16 mm²'],
              ['50 mm² and above', '10 mm²', '25 mm²'],
            ]}
          />

          <ConceptBlock title="Supplementary Bonding">
            <p>
              Supplementary bonding provides local equipotential bonding within a specific area,
              connecting exposed-conductive-parts and extraneous-conductive-parts together.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>When required:</strong> In special locations (BS 7671 Part 7) where the risk
                is higher — historically always required in bathrooms, but can now be omitted if all
                circuits are 30 mA RCD-protected
              </li>
              <li>
                <strong>Minimum sizes:</strong> 4 mm² between two exposed-conductive-parts; 4 mm²
                between an exposed-conductive-part and an extraneous-conductive-part; 2.5 mm² if
                mechanically protected
              </li>
              <li>
                <strong>Verification:</strong> The resistance between simultaneously accessible
                parts must be ≤ 50/(Ia) ohms, where Ia is the operating current of the protective
                device
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Earth Electrode Types and Installation">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Driven rod:</strong> Copper-clad steel rods (typically 1.2 m sections)
                coupled and driven into the ground. Most common type for TT systems. Target: RA ≤
                200 Ω (ideally &lt;100 Ω)
              </li>
              <li>
                <strong>Copper plate:</strong> Buried copper plate electrode — larger contact area
                with earth. Used where rod driving is impractical (rocky ground)
              </li>
              <li>
                <strong>Foundation earth electrode:</strong> Copper or steel conductor embedded in
                the building&apos;s concrete foundations during construction. Very effective due to
                large contact area with earth
              </li>
              <li>
                <strong>Earth mat/ring:</strong> Horizontal conductor buried around the building
                perimeter. Used for larger installations or HV substations
              </li>
              <li>
                <strong>Factors affecting resistance:</strong> Soil type (clay is better than
                sand/rock), moisture content, depth, electrode surface area, temperature
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Protective Conductor Sizing — The Adiabatic Equation"
            onSite="Undersized protective conductors are a serious safety defect. If the CPC is too small, it may overheat and fail during a fault — losing the earth path at the very moment it is needed most. Always verify CPC sizing against the prospective fault current and disconnection time."
          >
            <p>
              The minimum cross-sectional area of a protective conductor is determined by either BS
              7671 Table 54.7 (simplified method based on line conductor size) or the adiabatic
              equation (calculation method based on fault current and time).
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Adiabatic equation:</strong> S = √(I²t) / k
              </li>
              <li>
                <strong>S</strong> = minimum conductor cross-sectional area (mm²)
              </li>
              <li>
                <strong>I</strong> = prospective earth fault current (A)
              </li>
              <li>
                <strong>t</strong> = disconnection time of the protective device (s)
              </li>
              <li>
                <strong>k</strong> = material factor from BS 7671 Tables 54.2-54.6 (e.g., k=115 for
                PVC-insulated copper)
              </li>
              <li>
                <strong>Purpose:</strong> Ensures the CPC can carry the fault current for the
                disconnection time without its temperature exceeding the insulation rating
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Testing and defects</ContentEyebrow>

          <ConceptBlock title="Testing Earthing Systems, Maintenance and Common Defects">
            <p>
              The earthing and bonding system must be tested at initial verification and at every
              periodic inspection to confirm that it continues to provide the required level of
              protection. Deterioration over time — through corrosion, mechanical damage, building
              modifications and plumbing/gas work — can compromise the earthing system without any
              visible indication. Regular testing is the only way to identify these hidden defects.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Key Tests for Earthing and Bonding">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Continuity of protective conductors (R2):</strong> Low-resistance ohmmeter
                test to verify the CPC is intact throughout its length. Test between the
                distribution board earth bar and the earth terminal of every point on the circuit
              </li>
              <li>
                <strong>Continuity of main bonding:</strong> Test from the MET to each bonded
                service. Expected reading: very low (&lt;0.05 Ω for short runs). Any high reading
                indicates a poor connection
              </li>
              <li>
                <strong>External earth fault loop impedance (Ze):</strong> Measured at the origin
                with the installation&apos;s earthing conductor disconnected from the MET. Confirms
                the DNO&apos;s earth provision is within acceptable limits
              </li>
              <li>
                <strong>Earth fault loop impedance (Zs):</strong> Measured at each point on the
                circuit. Must be within the maximum values in BS 7671 Tables 41.2-41.6 for the
                protective device type and rating
              </li>
              <li>
                <strong>Earth electrode resistance (RA):</strong> For TT systems — measured using a
                dedicated earth electrode tester (three-terminal method) or calculated from the Ze
                measurement
              </li>
              <li>
                <strong>R1+R2:</strong> Combined resistance of line and CPC — measured during dead
                testing and added to Ze to calculate Zs
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common earthing and bonding defects"
            whatHappens={
              <>
                <p>
                  The following defects are frequently found during periodic inspection and
                  condition reporting. Each one can render the protection system partially or
                  completely ineffective.
                </p>
                <ul className="mt-2 list-disc space-y-1.5 pl-5 marker:text-orange-300/70">
                  <li>
                    <strong>Disconnected main bonding:</strong> Plumbing or gas work has broken the
                    bonding connection and not reconnected it — extremely common
                  </li>
                  <li>
                    <strong>Corroded connections:</strong> Dissimilar metal joints (copper to
                    steel), outdoor connections and damp environments cause corrosion that increases
                    resistance
                  </li>
                  <li>
                    <strong>Missing labels:</strong> Bonding connections without the &quot;Safety
                    Electrical Connection — Do Not Remove&quot; label, leading to removal during
                    maintenance
                  </li>
                  <li>
                    <strong>Undersized conductors:</strong> Bonding or CPC conductors smaller than
                    the minimum specified in BS 7671 for the installation type
                  </li>
                  <li>
                    <strong>Broken CPCs in ring circuits:</strong> A broken CPC in a ring final
                    circuit may not be detected by a simple end-to-end continuity test — the ring
                    measurement is essential
                  </li>
                  <li>
                    <strong>Missing earth on old installations:</strong> Pre-1966 installations may
                    have no CPC in the cables — only the circuit earth provided by conduit or sheath
                  </li>
                  <li>
                    <strong>Plastic pipe replacement:</strong> Metallic water or gas pipes replaced
                    with plastic sections, breaking the bonding continuity
                  </li>
                  <li>
                    <strong>Earth electrode deterioration:</strong> Driven rods corroding
                    underground, increasing resistance over time — annual measurement recommended
                  </li>
                </ul>
              </>
            }
            doInstead={
              <>
                Periodic inspection per BS 7671 (domestic: 10 years recommended; commercial: 5
                years; industrial: 3 years), a visual check of all bonding connections during any
                electrical work, annual earth electrode resistance measurement on TT systems,
                re-testing after any building work that may affect services, and immediate
                replacement of corroded clamps and connections.
              </>
            }
          />

          <ConceptBlock title="Temporary Earthing for HV Work">
            <p>
              When working on HV systems that have been isolated and proved dead, temporary earths
              (portable earthing equipment) are applied as an additional safety measure.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Purpose:</strong> Discharge stored energy, protect against inadvertent
                re-energisation, maintain work area at earth potential
              </li>
              <li>
                <strong>Application:</strong> Applied using approved portable earthing equipment —
                heavy-duty clamps connected by flexible copper conductor to the system earth bar
              </li>
              <li>
                <strong>Sequence:</strong> Always connect to the earth bar FIRST, then to the
                conductor being earthed. Remove in reverse order (conductor first, earth bar last)
              </li>
              <li>
                <strong>Rating:</strong> Portable earths must be rated for the prospective fault
                current of the system
              </li>
              <li>
                <strong>Inspection:</strong> Check portable earths before each use — look for damage
                to conductors, clamps and insulation. Periodic electrical testing required
              </li>
              <li>
                <strong>Recording:</strong> The application and removal of temporary earths must be
                recorded on the permit to work
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Maintenance of Earthing Systems"
            onSite="As a maintenance technician, you will regularly test and verify earthing and bonding as part of your inspection and maintenance duties. You must be able to measure Ze, Zs, R1+R2 and earth electrode resistance, interpret the results against BS 7671 requirements, and identify defects that require corrective action."
          >
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                Periodic inspection per BS 7671 (domestic: 10 years recommended; commercial: 5
                years; industrial: 3 years)
              </li>
              <li>Visual check of all bonding connections during any electrical work</li>
              <li>Earth electrode resistance measurement annually (TT systems)</li>
              <li>Re-test after any building work that may affect services</li>
              <li>Replace corroded clamps and connections immediately</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="EAWR 1989 Earthing Regulations">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Reg 8:</strong> Earthing or other suitable precautions must be taken to
                prevent danger from conductors that may become charged
              </li>
              <li>
                <strong>Reg 9:</strong> The integrity of referenced earthed conductors must be
                maintained — no single fault should result in danger
              </li>
              <li>
                <strong>Reg 10:</strong> Every joint and connection must be mechanically and
                electrically suitable
              </li>
              <li>
                <strong>Reg 4(2):</strong> All systems must be maintained to prevent danger —
                includes the earthing system
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <KeyTakeaways
            title="Quick reference"
            points={[
              'Earthing systems: TN-S — separate earth (cable sheath); TN-C-S — combined PEN, separated at origin (PME); TT — installation earth electrode; IT — unearthed/impedance-earthed source. Zs = Ze + (R1 + R2).',
              'Key references: BS 7671:2018+A4:2026 — Chapters 41, 54; EAWR 1989 — Regulations 8, 9, 10; BS 7430 — code of practice for earthing; BS EN 62305 — lightning protection; ST1426 — maintenance technician KSBs.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz
              title="Earthing and bonding for safety knowledge check"
              questions={quizQuestions}
            />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module1-section2-4')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Approach Distances
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module1-section3-1')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Hazard Identification
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule1Section2_5;
