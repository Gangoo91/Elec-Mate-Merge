/**
 * MOET · Module 2 · Section 2.4 · Subsection 6 — Surge Protection Devices
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

const TITLE = 'Surge Protection Devices - MOET Module 2 Section 4.6';
const DESCRIPTION =
  'Comprehensive guide to surge protection devices for electrical maintenance technicians: SPD types, transient overvoltages, risk assessment, BS 7671 A4:2026 requirements and installation practices.';

const quickCheckQuestions = [
  {
    id: 'spd-purpose',
    question: 'What is the primary function of a surge protection device (SPD)?',
    options: [
      'To disconnect the supply automatically when an earth fault current flows',
      'To divert transient overvoltage energy safely to earth, limiting the voltage across connected equipment',
      'To correct the power factor of the installation by absorbing reactive power',
      'To limit the prospective short-circuit current at the origin of the installation',
    ],
    correctIndex: 1,
    explanation:
      'An SPD diverts transient overvoltage energy safely to earth (or between line and neutral), clamping the voltage across connected equipment to a safe level. Transient overvoltages are very short duration (microseconds to milliseconds) but very high voltage events — typically caused by lightning or switching operations — that can damage sensitive electronic equipment.',
  },
  {
    id: 'spd-type2',
    question: 'A Type 2 SPD is designed to protect against:',
    options: [
      'Direct lightning strikes to a building with a lightning protection system',
      'Indirect lightning effects and switching surges at the distribution board',
      'Sustained mains overvoltage caused by a broken supply neutral',
      'Voltage dips and brownouts caused by heavy loads elsewhere on the network',
    ],
    correctIndex: 1,
    explanation:
      'Type 2 SPDs (also called Class II or Category C) are designed to protect against indirect lightning effects (surges induced in the supply cable by nearby lightning strikes) and switching transients from the supply network or within the installation. They are typically installed at the main distribution board and are the most common type required in domestic and commercial installations.',
  },
  {
    id: 'bs7671-spd-requirement',
    question: 'Under BS 7671, SPD protection is required unless:',
    options: [
      'The installation is supplied by an underground cable rather than overhead lines',
      'A risk assessment determines that the consequences of overvoltage are not serious',
      'The installation is protected throughout by 30 mA RCDs',
      'The supply is single-phase rather than three-phase',
    ],
    correctIndex: 1,
    explanation:
      'Regulation 443.4 requires the need for transient overvoltage protection to be assessed; SPD protection is required unless a documented risk assessment determines that the overvoltage is unlikely to cause serious consequences. For most installations containing electronic equipment (which is virtually all modern installations), SPD protection will be required.',
  },
  {
    id: 'spd-sccr',
    question:
      'Why must an SPD have a dedicated overcurrent protective device (backup fuse or MCB)?',
    options: [
      'To limit the surge current the SPD can divert so it is not overloaded',
      'To provide additional disconnection on an earth fault downstream of the SPD',
      'To disconnect the SPD if it fails short-circuit under sustained overvoltage or at end of life, preventing fire',
      'To allow the SPD to be tested in service without isolating the whole board',
    ],
    correctIndex: 2,
    explanation:
      "SPDs contain metal oxide varistors (MOVs) or gas discharge tubes that can fail short-circuit if subjected to sustained overvoltage or at end of life due to degradation. The backup protective device (typically a fuse or MCB rated per the manufacturer's instructions) disconnects the SPD from the supply before it overheats and causes a fire. Some SPDs have integrated backup protection.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Transient overvoltages in a supply system are most commonly caused by:',
    options: [
      'Gradual voltage rise on long cable runs due to conductor resistance',
      'Lightning (direct and indirect) and switching operations on the power network',
      'A broken neutral conductor on a three-phase supply',
      'Harmonic distortion from non-linear loads such as LED drivers',
    ],
    correctAnswer: 1,
    explanation:
      'Transient overvoltages arise from two main sources: lightning (both direct strikes and induced surges from nearby strikes) and switching operations (utility network switching, large motor starting/stopping, capacitor bank switching). These events create very short-duration but extremely high-voltage spikes that can travel along conductors and damage equipment.',
  },
  {
    id: 2,
    question:
      'The three SPD types (1, 2 and 3) correspond to different positions in the installation and different surge levels. Type 1 is installed:',
    options: [
      'At each final socket outlet, close to the equipment being protected',
      'At every sub-distribution board throughout the installation',
      'At the origin of the installation, between the supply and the main distribution board',
      'Inside sensitive equipment such as PLCs and variable speed drives',
    ],
    correctAnswer: 2,
    explanation:
      'Type 1 SPDs are installed at the origin of the installation (typically at or before the main switchboard) to handle the highest energy surges — including direct lightning current. They are required where the building has a lightning protection system (LPS). Type 2 SPDs are installed at the distribution board for general protection, and Type 3 SPDs are installed at the point of use for fine protection of sensitive equipment.',
  },
  {
    id: 3,
    question: 'The voltage protection level (Up) of an SPD indicates:',
    options: [
      'The continuous operating voltage the SPD can withstand without conducting',
      'The maximum surge current the SPD can divert before it is destroyed',
      'The supply voltage at which the SPD status indicator changes to green',
      'The maximum voltage the SPD allows to pass through to the protected equipment during a surge',
    ],
    correctAnswer: 3,
    explanation:
      "The voltage protection level (Up) is the maximum voltage the SPD allows across its terminals during a surge event. It represents the 'clamping voltage' — the level to which the SPD limits the transient overvoltage. A lower Up provides better protection. For 230 V installations, a typical Up for Type 2 SPDs is 1.5 kV or less.",
  },
  {
    id: 4,
    question:
      'BS 7671 requires that the connecting conductors of an SPD be kept as short as possible because:',
    options: [
      'Long conductors add inductance which increases the effective voltage protection level during fast transients',
      'Long conductors increase the resistance of the earth fault loop and slow disconnection',
      'Shorter conductors reduce the cost of copper used in the installation',
      'Shorter conductors make the SPD easier to inspect during periodic testing',
    ],
    correctAnswer: 0,
    explanation:
      "During a fast transient surge, the rate of current change (di/dt) through the SPD conductors can be very high. The voltage drop across the conductor inductance (V = L × di/dt) adds to the SPD's clamping voltage, effectively increasing the voltage seen by the protected equipment. Keeping connections as short as possible (ideally less than 500 mm total for both line and earth connections) minimises this effect.",
  },
  {
    id: 5,
    question:
      'A Type 2 SPD installed at a domestic consumer unit would typically be rated for a maximum discharge current (Imax) of:',
    options: [
      '0.1 to 1 kA (8/20 microsecond wave)',
      '10 to 40 kA (8/20 microsecond wave)',
      '100 to 200 kA (8/20 microsecond wave)',
      '500 kA to 1 MA (8/20 microsecond wave)',
    ],
    correctAnswer: 1,
    explanation:
      'Type 2 SPDs for domestic and commercial use are typically rated for maximum discharge currents (Imax) of 10 kA to 40 kA using the 8/20 microsecond test waveform. This represents the energy level of indirect lightning effects and switching surges. Type 1 SPDs handle higher energy (10/350 microsecond wave) for direct or near-direct lightning.',
  },
  {
    id: 6,
    question: "An SPD status indicator showing 'red' or 'fault' typically means:",
    options: [
      'The SPD is actively diverting a surge at that moment',
      'The supply voltage is currently above the SPD operating threshold',
      'The SPD has reached end of life and needs replacement — it is no longer providing protection',
      'The backup protective device has been correctly sized and is functioning',
    ],
    correctAnswer: 2,
    explanation:
      'Most SPDs include a status indicator (LED, mechanical flag, or window) that changes from green (healthy) to red (fault) when the internal protective elements have degraded or failed. This indicates the SPD is no longer providing protection and must be replaced. Degradation occurs naturally over time as the MOV absorbs successive surge events, and the device should be checked during periodic inspection.',
  },
  {
    id: 7,
    question: 'When installing an SPD at a consumer unit, the earth connection should be made to:',
    options: [
      'A separate earth electrode dedicated to the SPD alone',
      'The nearest extraneous-conductive-part, such as a water pipe',
      'The neutral bar of the consumer unit via a short link',
      'The main earthing terminal of the installation (via the shortest practical route)',
    ],
    correctAnswer: 3,
    explanation:
      'The SPD earth connection must be made to the main earthing terminal (MET) of the installation via the shortest possible route to minimise inductance. A separate earth electrode is not used because it could create a potential difference between the SPD earth and the installation earth during a surge event. All earths must be bonded together at a single reference point.',
  },
  {
    id: 8,
    question: 'In a TT earthing system, SPDs should be connected in which configuration?',
    options: [
      "Line to neutral and neutral to earth (L-N + N-PE) — the '3+1' or 'CT2' configuration",
      'Line to earth only (L-PE), as the neutral and earth are closely coupled',
      'Line to line only (L-L), with no connection to neutral or earth',
      'Earth to the building structural steel, bypassing the main earthing terminal',
    ],
    correctAnswer: 0,
    explanation:
      "In TT systems, surges can appear between line and neutral as well as between neutral and earth (because the neutral and earth are not closely coupled as in TN systems). The recommended configuration is L-N + N-PE (Type 2 CT2 or '3+1' for three-phase). This protects against both modes. The N-PE SPD must be a spark-gap type to avoid affecting RCD operation.",
  },
  {
    id: 9,
    question:
      'The risk assessment for SPD installation (per BS EN 62305 / BS 7671 Reg 443.4) considers:',
    options: [
      'Only the prospective short-circuit current measured at the origin of the installation',
      'The likelihood of transient overvoltages and the consequences of equipment damage (type of wiring, value of equipment, nature of occupancy)',
      'Only the total connected load and the maximum demand of the installation',
      'Only the age of the consumer unit and the date of the last periodic inspection',
    ],
    correctAnswer: 1,
    explanation:
      'The risk assessment considers factors including: the supply type (overhead vs underground), local lightning density (keraunic level), the type and value of equipment to be protected, the consequences of equipment failure (e.g., medical equipment, fire alarm systems), and the type of wiring system (overhead supplies are more exposed). If the consequences of overvoltage damage are serious, SPD protection must be provided.',
  },
  {
    id: 10,
    question: 'SPDs must be inspected during periodic inspection. What should be checked?',
    options: [
      'The exact clamping voltage by injecting a test surge into the device',
      'The number of surges the SPD has absorbed since it was installed',
      'Status indicator (healthy/fault), backup protection intact, connections tight, and SPD rating appropriate for the installation',
      'The internal resistance of the metal oxide varistor with a low-ohm meter',
    ],
    correctAnswer: 2,
    explanation:
      "During periodic inspection, SPDs should be checked for: status indicator condition (green = healthy, red = needs replacement), integrity of the backup protective device (fuse not blown, MCB not tripped), security of all connections, physical condition (no signs of burning or damage), and confirmation that the SPD type and rating are appropriate for the installation's earthing system and risk assessment.",
  },
  {
    id: 11,
    question:
      'Where a building has a lightning protection system (LPS), which type of SPD is required at the origin?',
    options: [
      'Type 3 (to provide fine protection at the point of use)',
      'No SPD is required, as the LPS handles all lightning energy',
      'Type 2 (to handle indirect lightning and switching surges)',
      'Type 1 (to handle direct lightning current energy)',
    ],
    correctAnswer: 3,
    explanation:
      'Where a building has a lightning protection system, a direct lightning strike is conducted to earth via the LPS. However, a portion of the lightning energy can enter the electrical installation via the earthing system (conducted through bonding between the LPS earth and the installation MET). A Type 1 SPD is required to handle this high-energy current (10/350 microsecond impulse).',
  },
];

const faqs = [
  {
    question: 'Do all new installations now require SPDs?',
    answer:
      'Under BS 7671:2018+A4:2026, Regulation 443.4 requires SPD protection unless a risk assessment determines that the consequences of transient overvoltages are not serious. In practice, because virtually all modern installations contain sensitive electronic equipment (smart meters, heating controls, alarms, IT equipment), most new installations will require SPD protection. The risk assessment should be documented on the electrical installation certificate.',
  },
  {
    question: 'Can I retrofit an SPD to an existing consumer unit?',
    answer:
      'Many SPD manufacturers produce modules designed to retrofit into existing consumer units, connecting to a spare way or via a dedicated connection kit. The key requirements are: the SPD must be appropriate for the earthing system type (TN or TT configuration), connections must be kept as short as possible, and a suitable backup protective device must be installed. Some consumer units may not have space, in which case an external SPD enclosure may be needed.',
  },
  {
    question: 'What is the difference between Type 1, Type 2 and Type 3 SPDs?',
    answer:
      'Type 1 SPDs are installed at the origin and handle the highest energy surges (including direct lightning — 10/350 microsecond wave). Type 2 SPDs are installed at distribution boards for general protection against indirect lightning and switching surges (8/20 microsecond wave). Type 3 SPDs are installed at the point of use (e.g., at socket outlets near sensitive equipment) for fine protection. In larger installations, all three types may be used in cascade for coordinated protection.',
  },
  {
    question: 'Will an SPD protect against a sustained overvoltage (e.g., a broken neutral)?',
    answer:
      'No. SPDs are designed to handle transient overvoltages lasting microseconds to milliseconds. A sustained overvoltage (such as 400 V appearing on a 230 V circuit due to a broken neutral on a three-phase supply) will cause the SPD to operate continuously and overheat, which is why a backup fuse is required to disconnect it. For protection against sustained overvoltage, a dedicated overvoltage relay or similar device is needed.',
  },
];

const MOETModule2Section4_6 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 2 · Section 2.4 · Subsection 6"
        title="Surge Protection Devices"
        backTo="/study-centre/apprentice/m-o-e-t-module2-section4"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Lightning and switching surge protection for electrical installations — SPD types, the
            BS 7671:2018+A4:2026 risk assessment that decides whether one is required, and what to
            check on an existing device during periodic inspection.
          </p>

          <TLDR
            points={[
              'SPDs clamp transient overvoltages to safe levels.',
              'Types: 1 (origin/lightning), 2 (DB/general), 3 (point of use).',
              'BS 7671: Regulation 443.4 requires SPDs unless a risk assessment says otherwise.',
              'Backup: a dedicated fuse/MCB disconnects a failed SPD.',
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
              'Explain the causes of transient overvoltages and their effects on electrical installations',
              'Describe the three types of SPD (Type 1, 2 and 3) and their positions in the installation',
              'Understand voltage protection level (Up) and maximum discharge current (Imax) ratings',
              'Apply the BS 7671:2018+A4:2026 requirements for SPD risk assessment and installation',
              'Select correct SPD configuration for TN and TT earthing systems',
              'Inspect SPDs during periodic inspection and identify when replacement is needed',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Transient overvoltages — causes and effects</ContentEyebrow>

          <ConceptBlock title="A very short voltage spike with real destructive energy">
            <p>
              A transient overvoltage is a very short-duration voltage spike superimposed on the
              normal supply waveform. These events can reach several thousand volts but last only
              microseconds to a few milliseconds. Despite their brief duration, transient
              overvoltages carry enough energy to damage or destroy sensitive electronic components,
              degrade insulation, and cause data loss in digital systems.
            </p>
            <p>
              The two main sources of transient overvoltages are lightning and switching operations.
              A direct lightning strike on or near a building can inject impulse currents of up to
              200 kA into the earthing system and induce voltages of tens of thousands of volts on
              supply conductors. Even indirect strikes — lightning to ground within a few hundred
              metres — can induce surges of several kilovolts through electromagnetic coupling.
              Switching transients from the utility network (transformer switching, capacitor bank
              switching) or from within the installation (motor starting, contactor operation)
              produce lower but still potentially damaging surges.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Common surge sources">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Direct lightning strike:</strong> To building, LPS or incoming services —
                highest energy, requires Type 1 SPD
              </li>
              <li>
                <strong>Indirect lightning:</strong> Strike nearby induces surges on supply cables —
                requires Type 2 SPD
              </li>
              <li>
                <strong>Switching operations:</strong> Utility switching, large motor starting,
                capacitor switching — Type 2 SPD
              </li>
              <li>
                <strong>Internal sources:</strong> Contactor operation, VFD switching, arc welding —
                Type 2 or 3 SPD
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Consequences of unprotected surges"
            onSite="Electronic equipment — fire and security alarm panels, boiler controls, LED drivers, smart home systems, industrial PLCs, variable speed drives — is particularly vulnerable to transient overvoltages. Damage may be immediate (catastrophic failure) or cumulative (progressive insulation degradation leading to premature failure). The cost of replacing damaged equipment and the consequential losses (downtime, data loss, safety system failure) far exceed the cost of SPD installation."
          >
            <p>
              A surge does not always announce itself with an obvious failure — cumulative damage is
              just as real a cost as a single catastrophic event.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>SPD types and operating principles</ContentEyebrow>

          <ConceptBlock title="A low-impedance path that appears only when needed">
            <p>
              Surge protection devices work by providing a low-impedance path to divert surge energy
              away from the protected equipment. Under normal voltage conditions, the SPD presents a
              very high impedance and draws negligible current. When a transient overvoltage exceeds
              the SPD's clamping threshold, its impedance drops dramatically, diverting the surge
              current to earth and clamping the voltage across the protected equipment to a safe
              level.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Type 1 SPD (Class I / Category B)">
            <p>
              Installed at the origin of the installation, typically upstream of the main
              distribution board. Designed to handle direct lightning current energy using the
              10/350 microsecond test impulse waveform. Usually uses spark gap technology which can
              handle very high energy but has a higher voltage protection level. Required where a
              lightning protection system is installed.
            </p>
            <ul className="list-disc space-y-1 pl-5 marker:text-elec-yellow/70">
              <li>Impulse current (Iimp): typically 12.5 to 25 kA per pole (10/350 wave)</li>
              <li>Technology: spark gap, combined spark gap + MOV</li>
              <li>Location: origin, before main switch or integral with main switch</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Type 2 SPD (Class II / Category C)">
            <p>
              The most commonly installed type in domestic and commercial installations. Installed
              at distribution boards to protect against indirect lightning effects and switching
              surges using the 8/20 microsecond test impulse. Typically uses metal oxide varistor
              (MOV) technology which provides good clamping voltage and moderate energy handling.
            </p>
            <ul className="list-disc space-y-1 pl-5 marker:text-elec-yellow/70">
              <li>Maximum discharge current (Imax): typically 10 to 40 kA per pole (8/20 wave)</li>
              <li>Voltage protection level (Up): typically 1.0 to 1.5 kV</li>
              <li>Technology: metal oxide varistor (MOV)</li>
              <li>Location: consumer unit, distribution board</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Type 3 SPD (Class III / Category D)">
            <p>
              Fine protection devices installed at the point of use, close to sensitive equipment.
              They handle the residual surge energy that passes through Type 1 and Type 2 devices
              and provide the lowest clamping voltage. Often built into plug-in adaptors or power
              strips.
            </p>
            <ul className="list-disc space-y-1 pl-5 marker:text-elec-yellow/70">
              <li>Must be installed downstream of Type 2 SPD</li>
              <li>Low energy handling — for residual surges only</li>
              <li>Lowest voltage protection level (Up): below 1.0 kV</li>
              <li>Location: at socket outlets, equipment terminals</li>
            </ul>
            <p className="text-elec-yellow/70">
              <strong>Key point:</strong> In larger installations, a coordinated cascade of Type 1,
              2 and 3 SPDs provides the best protection. Each successive device handles lower energy
              surges and provides tighter clamping. The manufacturer must confirm coordination
              between devices.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>BS 7671 requirements and risk assessment</ContentEyebrow>

          <ConceptBlock title="Regulation 443.4 and the Section 534 installation rules">
            <p>
              BS 7671:2018+A4:2026 restructured the SPD requirements across Chapter 44 and Section
              534 — Section 534 is now organised around 534.4, and 534.4.10 sets the minimum
              cross-sectional area of the conductor between the SPD and the main earthing terminal
              (16 mm² copper for Type 1, 6 mm² for Type 2). Regulation 443.4 now effectively
              requires SPD protection for most installations unless a documented risk assessment
              demonstrates that the consequences of transient overvoltages would not be serious.
            </p>
          </ConceptBlock>

          <ConceptBlock title="When SPDs are required (Reg 443.4)">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Where overvoltage could result in serious injury or loss of life</li>
              <li>
                Where overvoltage could result in interruption of public services or cultural
                heritage
              </li>
              <li>
                Where the installation includes commercial or industrial activities where failure
                could cause disruption
              </li>
              <li>Where significant numbers of individuals could be affected</li>
              <li>
                In practice: most installations with electronic equipment, alarms, IT, or safety
                systems
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Installation requirements (Section 534)"
            onSite="During periodic inspection, you must check whether SPD protection is present where required. If an installation predates the introduction of the SPD requirement and has no SPD, this should be noted as a recommendation (C3) unless a risk assessment has been documented."
          >
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Connection length:</strong> Total conductor length (L + PE connections)
                should not exceed 500 mm where practical
              </li>
              <li>
                <strong>Backup protection:</strong> Each SPD requires a dedicated backup protective
                device as specified by the manufacturer
              </li>
              <li>
                <strong>Earthing configuration:</strong> Must match the installation's earthing
                system (TN: L-PE; TT: L-N + N-PE)
              </li>
              <li>
                <strong>Status indication:</strong> SPDs should have a visible status indicator for
                periodic inspection
              </li>
              <li>
                <strong>Coordination with RCDs:</strong> SPDs must not cause unwanted RCD tripping
                during surge events
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Installation, inspection and maintenance</ContentEyebrow>

          <ConceptBlock title="Correct installation is critical to effectiveness">
            <p>
              Correct installation of SPDs is critical for their effectiveness. Poor installation —
              particularly excessively long connection leads — can significantly reduce the
              protection provided. During periodic inspection, SPDs must be assessed for condition
              and functionality.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Installation best practices">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Keep connections short:</strong> The combined length of line and earth
                connections should not exceed 500 mm. Excess length adds inductance, increasing the
                effective clamping voltage.
              </li>
              <li>
                <strong>Install backup protection:</strong> Use the backup fuse or MCB rating
                specified by the SPD manufacturer. Incorrect backup can either fail to protect the
                SPD (too high) or cause nuisance tripping (too low).
              </li>
              <li>
                <strong>Match earthing system:</strong> TN systems use L-PE (or L-N + N-PE)
                connection. TT systems must use L-N + N-PE with a gas discharge tube on the N-PE
                path to avoid RCD interference.
              </li>
              <li>
                <strong>Position:</strong> Install as close to the origin as possible for Type 2.
                Downstream of the main switch to allow isolation for maintenance.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Periodic inspection checks and SPD end of life">
            <p>
              <strong>Periodic inspection checks:</strong> status indicator — green (healthy) or red
              (replace); backup device — intact and not tripped/blown; connections — secure, no
              signs of overheating; physical condition — no burning, cracking, discolouration;
              rating — appropriate for earthing system and risk level.
            </p>
            <p>
              <strong>SPD end of life:</strong> MOV-based SPDs degrade with each surge event. Over
              time, the MOV material gradually loses its ability to clamp voltage effectively. When
              the SPD reaches end of life, the status indicator changes to fault, and the device
              must be replaced. Some SPDs also incorporate a thermal disconnector that isolates the
              MOV if it overheats, providing an additional layer of safety.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Assuming an SPD protects against sustained overvoltage"
            whatHappens={
              <>
                SPDs are designed to handle transient overvoltages lasting microseconds to
                milliseconds. A sustained overvoltage — such as 400 V appearing on a 230 V circuit
                due to a broken neutral on a three-phase supply — will cause the SPD to operate
                continuously and overheat.
              </>
            }
            doInstead={
              <>
                Rely on the backup fuse to disconnect an overheating SPD, and specify a dedicated
                overvoltage relay or similar device where protection against sustained overvoltage
                is actually needed — an SPD alone will not provide it.
              </>
            }
          />

          <ConceptBlock
            title="Increasingly important in modern maintenance"
            onSite="SPD technology is increasingly important in modern electrical maintenance. Understanding SPD selection, installation verification and periodic inspection requirements is part of the electrical engineering maintenance technician's skillset, as specified in the ST1426 standard."
          >
            <p>
              Treat an SPD like any other protective device: verify it is present where required,
              correctly installed, and shows a healthy status every time you inspect the board it
              sits on.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'An SPD diverts transient overvoltage energy to earth, clamping the voltage across protected equipment — it does not disconnect a supply.',
              'Type 1 (origin, direct lightning, 10/350 wave), Type 2 (distribution board, indirect lightning/switching, 8/20 wave), Type 3 (point of use, fine protection).',
              'BS 7671:2018+A4:2026 Regulation 443.4 requires SPD protection unless a documented risk assessment says the consequences are not serious.',
              'Section 534.4.10 sets the minimum conductor CSA between the SPD and the MET: 16 mm squared copper for Type 1, 6 mm squared for Type 2.',
              'Keep SPD connections as short as possible (under 500 mm total) — excess length adds inductance that raises the effective clamping voltage.',
              'A dedicated backup fuse or MCB protects against an SPD failing short-circuit at end of life or under sustained overvoltage.',
              'TT systems need an L-N + N-PE ("3+1"/CT2) configuration with a spark-gap N-PE device, to avoid affecting RCD operation.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module2-section4-5')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Bonding Requirements
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module2-section5-1')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Conductors and Insulation Materials
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule2Section4_6;
