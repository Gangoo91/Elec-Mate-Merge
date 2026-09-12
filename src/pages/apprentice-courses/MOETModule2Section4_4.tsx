/**
 * MOET · Module 2 · Section 2.4 · Subsection 4 — Earthing Systems (TN, TT, IT)
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
  VideoCard,
} from '@/components/study-centre/learning';
import { EarthingSystemDiagram } from '@/components/study-centre/diagrams';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Earthing Systems (TN, TT, IT) - MOET Module 2 Section 4.4';
const DESCRIPTION =
  'Comprehensive guide to earthing system arrangements for electrical maintenance technicians: TN-S, TN-C-S (PME), TT and IT systems, earth electrode requirements, Ze measurement and BS 7671 compliance.';

const quickCheckQuestions = [
  {
    id: 'earthing-purpose',
    question: 'What is the primary purpose of earthing in an electrical installation?',
    options: [
      'To reduce the supply voltage to a safer level at the consumer unit',
      'To improve power factor and lower the current drawn by the load',
      'To provide a low-impedance path for fault current so that protective devices operate within the required time',
      'To prevent electromagnetic interference between adjacent circuits',
    ],
    correctIndex: 2,
    explanation:
      'The primary purpose of earthing is to provide a low-impedance path for earth fault current to flow back to the source (transformer star point). This ensures that the fault current is large enough to operate the protective device (fuse, MCB or RCD) within the maximum disconnection time specified by BS 7671, thereby limiting the duration of any dangerous touch voltage.',
  },
  {
    id: 'tn-c-s-pme',
    question: 'In a TN-C-S (PME) system, the neutral and earth functions are:',
    options: [
      'Combined in the supply cable (PEN conductor) and separated at the origin of the installation',
      'Kept separate throughout both the supply cable and the installation',
      'Provided entirely by a local earth electrode at the installation',
      'Combined throughout both the supply and the final circuits',
    ],
    correctIndex: 0,
    explanation:
      "In a TN-C-S system (Protective Multiple Earthing), the supply uses a combined neutral and earth conductor called a PEN (Protective Earth and Neutral) conductor. At the origin of the consumer's installation, the PEN conductor is separated into distinct neutral (N) and protective earth (PE) conductors. This is the most common earthing arrangement for new UK domestic supplies.",
  },
  {
    id: 'tt-system-rcd',
    question: 'Why is RCD protection particularly important in a TT earthing system?',
    options: [
      'Because the supply voltage in a TT system is higher than in a TN system',
      'Because the earth fault loop impedance is typically too high for overcurrent devices to achieve the required disconnection time',
      'Because TT systems have no circuit protective conductor to carry fault current',
      'Because the earth electrode resistance is always lower than in a TN system',
    ],
    correctIndex: 1,
    explanation:
      "In a TT system, the earth return path includes the resistance of the consumer's earth electrode and the general mass of earth, which is typically much higher than the metallic return path in a TN system. This high earth fault loop impedance (Zs) means the earth fault current is too low for overcurrent devices (fuses/MCBs) to operate within the required disconnection time. An RCD, which operates at milliamp levels, provides the necessary fast disconnection.",
  },
  {
    id: 'ze-measurement',
    question: 'External earth fault loop impedance (Ze) is measured:',
    options: [
      'At the furthest point of each final circuit with the supply energised',
      'Between the main earthing terminal and the supply neutral with the installation earthing disconnected',
      'Between line and neutral with all final circuits connected and loaded',
      'Across the earth electrode using the fall-of-potential method',
    ],
    correctIndex: 1,
    explanation:
      "Ze is measured at the origin of the installation between the means of earthing (main earthing terminal) and the supply neutral, with the installation's earthing conductor disconnected from the main earthing terminal. This isolates the measurement from the installation's own earth paths and measures only the impedance of the external supply earth loop — the supplier's responsibility.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'The letter designations in earthing system classification (TN, TT, IT) are defined by:',
    options: [
      'The supply voltage and the frequency of the distribution network',
      'IEC 60364 and BS 7671 — the first letter relates to the source earthing, the second to the exposed-conductive-parts',
      'The cross-sectional area of the line and neutral conductors',
      'The number of phases and the type of protective device installed',
    ],
    correctAnswer: 1,
    explanation:
      'The classification follows IEC 60364 (adopted in BS 7671): the first letter indicates the relationship of the supply source to earth (T = directly earthed, I = isolated or high impedance), and the second letter indicates the relationship of the exposed-conductive-parts to earth (T = directly earthed via local electrode, N = connected to the supply earth/neutral). Additional letters (S, C, C-S) describe the neutral/earth conductor arrangement.',
  },
  {
    id: 2,
    question:
      'In a TN-S system, the earth path from the installation back to the source is provided by:',
    options: [
      'A combined neutral and earth (PEN) conductor within the supply cable',
      'A local earth electrode driven into the ground at the installation',
      'A separate metallic conductor (the supply cable sheath or a dedicated earth conductor) from the supply',
      'The general mass of earth between the installation and the source',
    ],
    correctAnswer: 2,
    explanation:
      'TN-S (Separate) uses a dedicated earth conductor separate from the neutral throughout the supply cable. In older installations, this was typically the lead sheath of the supply cable. In modern installations, it may be a separate conductor within the supply cable or the steel wire armour. The key characteristic is that N and PE are separate throughout.',
  },
  {
    id: 3,
    question: 'A PEN conductor in a TN-C-S system must have a minimum cross-sectional area of:',
    options: [
      '4 mm² copper or 6 mm² aluminium',
      '6 mm² copper or 10 mm² aluminium',
      '16 mm² copper or 25 mm² aluminium',
      '10 mm² copper or 16 mm² aluminium',
    ],
    correctAnswer: 3,
    explanation:
      'BS 7671 Regulation 543.4.201 requires that a PEN conductor must have a cross-sectional area of not less than 10 mm² copper or 16 mm² aluminium. This minimum size ensures the conductor has sufficient integrity to maintain the combined neutral and earth function reliably. Loss of the PEN conductor in a PME system can cause dangerous voltages on exposed metalwork.',
  },
  {
    id: 4,
    question: 'The typical range of Ze values for a TN-C-S (PME) supply in the UK is:',
    options: ['0.2 to 0.35 ohms', '0.01 to 0.05 ohms', '2 to 5 ohms', '20 to 200 ohms'],
    correctAnswer: 0,
    explanation:
      'For a TN-C-S (PME) supply, the DNO typically declares a maximum Ze of 0.35 ohms, with measured values commonly in the range 0.2 to 0.35 ohms. This low impedance ensures high earth fault currents, allowing overcurrent devices to operate within the required disconnection times. For TN-S supplies, the maximum declared Ze is typically 0.8 ohms.',
  },
  {
    id: 5,
    question: 'In a TT system, the earth fault loop impedance (Zs) consists of:',
    options: [
      'Only the line and neutral conductor resistances within the installation',
      'The supply source impedance, the line conductor, the CPC, the installation earth electrode, and the general mass of earth back to the source earth',
      'The combined PEN conductor resistance from the origin back to the transformer',
      'Only the resistance of the circuit protective conductor at the point of fault',
    ],
    correctAnswer: 1,
    explanation:
      'In a TT system, the earth fault loop includes: the supply source impedance, the line conductor from source to fault, the CPC from fault back to the earth electrode, the earth electrode resistance, the general mass of earth, and the supply source earth connection. The earth electrode and earth path resistances dominate, giving a much higher Zs than in TN systems.',
  },
  {
    id: 6,
    question: 'The main reason PME (TN-C-S) earthing is restricted for some applications is:',
    options: [
      'The PEN conductor cannot carry the high fault currents found in those locations',
      'The combined PEN conductor produces excessive electromagnetic interference',
      'If the PEN conductor breaks, the installation earth rises to supply voltage, creating danger on exposed metalwork and extraneous-conductive-parts',
      'The earth fault loop impedance is too high for an RCD to operate correctly',
    ],
    correctAnswer: 2,
    explanation:
      "The critical risk with PME is that if the PEN conductor becomes open-circuit (broken, disconnected), the installation's earthing terminal is no longer connected to the supply earth. Load current flowing through the neutral will cause the earth terminal — and all earthed metalwork — to rise to a dangerous voltage. This is why PME earthing has restrictions for swimming pools, caravan parks, petrol stations and other special locations.",
  },
  {
    id: 7,
    question: 'An IT earthing system is characterised by:',
    options: [
      'The source being directly earthed and the installation using a local electrode',
      'A combined PEN conductor running from the source to the installation origin',
      'The exposed-conductive-parts being connected directly to the supply neutral',
      'The source being isolated from earth (or earthed through a high impedance) so that a single earth fault does not cause automatic disconnection',
    ],
    correctAnswer: 3,
    explanation:
      'In an IT system, the supply source is either isolated from earth or connected through a high impedance. A first earth fault produces only a small fault current (through the distributed capacitance or the high impedance connection) that is insufficient to cause automatic disconnection. This allows continuity of supply — critical in hospitals, process plants and other locations where unexpected disconnection is dangerous.',
  },
  {
    id: 8,
    question:
      'In an IT system, what happens when a second earth fault occurs on a different phase?',
    options: [
      'The two faults create a phase-to-phase fault through earth, requiring immediate disconnection',
      'The fault current remains too small to operate any protective device',
      'The insulation monitoring device automatically clears both faults',
      'The supply continues to operate safely as with the first fault',
    ],
    correctAnswer: 0,
    explanation:
      'A second earth fault on a different phase creates a fault loop through earth between the two faulted phases. This is effectively a phase-to-phase short-circuit through the earth path, producing a high fault current that must be cleared by overcurrent protection. This is why IT systems require insulation monitoring devices (IMDs) to detect the first fault and raise an alarm so it can be rectified before a second fault occurs.',
  },
  {
    id: 9,
    question:
      'The maximum value of earth electrode resistance for a TT system protected by a 30 mA RCD is:',
    options: ['20 ohms', '1,667 ohms', '200 ohms', 'There is no maximum'],
    correctAnswer: 1,
    explanation:
      'For a 30 mA RCD, the maximum Zs = 50 V / 0.03 A = 1,667 ohms. Since the earth electrode resistance (RA) dominates Zs in a TT system, RA must not exceed approximately 1,667 ohms. In practice, earth electrode resistances are typically kept well below 200 ohms to provide an adequate safety margin.',
  },
  {
    id: 10,
    question: 'When measuring Ze on a TN-C-S supply, a typical acceptable value would be:',
    options: ['280 ohms', '2.8 ohms', '0.28 ohms', '28 ohms'],
    correctAnswer: 2,
    explanation:
      "A typical Ze measurement on a TN-C-S (PME) supply would be around 0.2 to 0.35 ohms. A value of 0.28 ohms is entirely normal and within the DNO's declared maximum of 0.35 ohms. Values of 2.8 ohms or higher would indicate a problem with the earthing or suggest a TT rather than TN-C-S arrangement.",
  },
  {
    id: 11,
    question: 'BS 7671 requires the main earthing terminal to be accessible for:',
    options: [
      'Connecting additional final circuits as the installation expands',
      'Adjusting the rated residual operating current of the main RCD',
      'Switching the supply between TN and TT earthing arrangements',
      'Testing, inspection and disconnection of the earthing conductor',
    ],
    correctAnswer: 3,
    explanation:
      "Regulation 542.4.1 requires that the main earthing terminal is accessible for inspection, testing and, where necessary, disconnection of the earthing conductor. This is essential for measuring Ze (which requires disconnecting the installation earth from the main earthing terminal to isolate the external loop impedance from the installation's own earth paths).",
  },
  {
    id: 12,
    question:
      'Which earthing system type is most commonly used for new domestic supplies in the UK?',
    options: ['TN-C-S (PME)', 'IT', 'TN-S', 'TT'],
    correctAnswer: 0,
    explanation:
      'TN-C-S (PME — Protective Multiple Earthing) is the most common earthing arrangement for new domestic supplies in the UK. The DNO provides earth via the combined neutral/earth (PEN) conductor of the supply cable. PME provides a low-impedance earth, good for overcurrent protection disconnection times. TN-S is common in older urban areas, and TT is used in rural areas where the DNO does not provide an earth terminal.',
  },
];

const faqs = [
  {
    question: 'How do I determine what type of earthing system an installation has?',
    answer:
      'Inspect the supply intake position. In a TN-S system, you will find a separate earth terminal connected to the cable sheath or armour. In a TN-C-S (PME) system, the earth terminal is derived from the combined neutral/earth conductor, often with a link or connection at the cutout. In a TT system, there is no earth terminal from the supplier — the installation has its own earth electrode. The supply type should be recorded on the electrical installation certificate or EICR.',
  },
  {
    question: 'What is the difference between Ze and Zs?',
    answer:
      "Ze is the external earth fault loop impedance — the impedance of the supply earth loop outside the installation, measured at the origin with the installation earthing disconnected. Zs is the total earth fault loop impedance at any point in the installation, including Ze plus the impedance of the circuit's line conductor (R1) and circuit protective conductor (R2) from the origin to the point of measurement. Zs = Ze + (R1 + R2).",
  },
  {
    question:
      'Can a TT system use overcurrent devices (MCBs) for earth fault protection instead of RCDs?',
    answer:
      'In theory, if the earth fault loop impedance is low enough for an MCB to trip within the required time (0.4 seconds for final circuits up to 32 A), an MCB could provide earth fault protection. In practice, TT earth electrode resistances are almost always too high for this. A 30 mA RCD will operate with Zs up to 1,667 ohms, whereas a 32 A Type B MCB requires Zs below 1.37 ohms (BS 7671 Table 41.3, which applies Cmin = 0.95). RCD protection is therefore essential in TT systems.',
  },
  {
    question: 'Why is PME earthing not permitted for some special locations?',
    answer:
      "PME earthing carries the risk that if the PEN conductor breaks, all earthed metalwork in the installation could rise to dangerous voltage. In special locations such as swimming pools, marinas, caravan parks and petrol stations, the consequences of this voltage appearing on metalwork that people may be in contact with (especially in wet or conductive conditions) are considered unacceptable. BS 7671 and the DNO's conditions require TT earthing for these locations.",
  },
  {
    question:
      'What is the minimum earth electrode resistance that should be aimed for in a TT system?',
    answer:
      'While the theoretical maximum for a 30 mA RCD is 1,667 ohms, best practice aims for an earth electrode resistance well below 200 ohms, and ideally below 20 ohms. Lower resistance provides a better safety margin, improves protection coordination, and reduces the magnitude of touch voltages during faults. The actual resistance depends on soil conditions — clay soils give lower resistance than sandy or rocky ground.',
  },
];

const MOETModule2Section4_4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 2 · Section 2.4 · Subsection 4"
        title="Earthing Systems (TN, TT, IT)"
        backTo="/study-centre/apprentice/m-o-e-t-module2-section4"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Types of earthing arrangements, their characteristics and applications — TN-S, TN-C-S
            (PME), TT and IT — and how to identify, measure and verify each one on site.
          </p>

          <TLDR
            points={[
              'TN-S: separate earth from supply cable sheath/conductor.',
              'TN-C-S (PME): combined PEN in supply, separated at origin.',
              'TT: local earth electrode, no supply earth — needs RCD.',
              'IT: isolated source — first fault does not disconnect.',
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
              'Explain the purpose of earthing and its role in automatic disconnection of supply',
              'Describe TN-S, TN-C-S (PME) and TT earthing arrangements and how to identify them',
              'Understand the IT earthing system and its applications in critical installations',
              'Identify the risks associated with PME earthing and the special location restrictions',
              'Measure and interpret external earth fault loop impedance (Ze) values',
              'Reference BS 7671 Part 4 and Section 542 earthing requirements',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The purpose and principles of earthing</ContentEyebrow>

          <ConceptBlock
            title="A low-impedance path for fault current"
            onSite="The type of earthing system directly determines the earth fault loop impedance, which in turn determines which protective devices can achieve the required disconnection times. A maintenance technician must be able to identify the earthing system, understand its implications for protection, and verify that the earthing arrangement is intact and effective through measurement and inspection."
          >
            <p>
              Earthing is the foundation of electrical safety. Without a reliable earth connection,
              protective devices cannot operate when a fault occurs, and metalwork that should be
              safe to touch can become live at dangerous voltages. The fundamental purpose of
              earthing is to create a low-impedance path for earth fault current to flow from the
              point of fault back to the source (the star point of the supply transformer), thereby
              ensuring that protective devices — fuses, MCBs or RCDs — can detect the fault and
              disconnect the supply within a safe time.
            </p>
            <p>
              BS 7671 addresses earthing in Part 4 (Protection for safety, Chapter 41 — Automatic
              disconnection of supply) and Part 5 (Section 542 — Earthing arrangements). The
              standard classifies earthing systems using a lettering scheme derived from IEC 60364,
              based on the relationship between the source earth and the installation earth.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Earthing system classification">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>First letter — Source earthing:</strong> T = source directly earthed (terre
                = earth); I = source isolated or high-impedance earthed
              </li>
              <li>
                <strong>Second letter — Installation earthing:</strong> T = exposed-conductive-parts
                earthed via local electrode; N = exposed-conductive-parts connected to the supply
                earth (neutral)
              </li>
              <li>
                <strong>Third letter (TN only):</strong> S = separate N and PE conductors; C =
                combined PEN conductor; C-S = combined in supply, separate in installation
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>TN systems — TN-S and TN-C-S</ContentEyebrow>

          <ConceptBlock title="A metallic earth return path from installation to transformer">
            <p>
              TN systems provide a metallic earth return path from the installation back to the
              supply transformer star point. This metallic path has low impedance, resulting in high
              earth fault currents that allow overcurrent protective devices (fuses and MCBs) to
              achieve fast disconnection. TN is the most common earthing arrangement in the UK.
            </p>
          </ConceptBlock>

          <EarthingSystemDiagram system="TN-S" />

          <ConceptBlock title="TN-S (Separate)">
            <p>
              In a TN-S system, the protective earth (PE) conductor is separate from the neutral (N)
              throughout both the supply and the installation. The earth path is typically provided
              by the metallic sheath (lead or aluminium) of the supply cable or by a dedicated earth
              conductor. This system is common in older urban areas where the supply uses
              paper-insulated lead-sheathed (PILC) cables.
            </p>
            <ul className="list-disc space-y-1 pl-5 marker:text-elec-yellow/70">
              <li>Typical Ze: 0.4 to 0.8 ohms (DNO maximum declared: 0.8 ohms)</li>
              <li>Earth terminal: connected to cable sheath at the cutout</li>
              <li>Safe for all applications — no PEN conductor risk</li>
              <li>Being replaced by TN-C-S as networks are modernised</li>
            </ul>
          </ConceptBlock>

          <EarthingSystemDiagram system="TN-C-S" />

          <ConceptBlock
            title="TN-C-S (PME — Protective Multiple Earthing)"
            onSite="When inspecting a TN-C-S installation, check the integrity of the main bonding conductors. These limit the potential difference between earthed metalwork and extraneous-conductive-parts (gas, water pipes) in the event of a PEN conductor issue. Inadequate bonding in a PME installation is a serious deficiency."
          >
            <p>
              TN-C-S is the most common arrangement for new UK supplies. The supply cable uses a
              combined PEN (Protective Earth and Neutral) conductor. At the origin of the
              installation, the PEN is separated into distinct neutral (N) and protective earth (PE)
              conductors. The PEN conductor is earthed at multiple points along the supply network —
              hence 'Protective Multiple Earthing'.
            </p>
            <ul className="list-disc space-y-1 pl-5 marker:text-elec-yellow/70">
              <li>Typical Ze: 0.2 to 0.35 ohms (DNO maximum declared: 0.35 ohms)</li>
              <li>Lowest Ze — therefore highest fault currents and fastest disconnection</li>
              <li>PEN conductor minimum: 10 mm² Cu or 16 mm² Al</li>
              <li>Risk: broken PEN conductor causes dangerous voltages on earthed metalwork</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="PME risks and restrictions"
            whatHappens={
              <>
                The critical risk with PME is loss of the PEN conductor. If the PEN conductor
                becomes open-circuit between the installation and the transformer, load current that
                would normally return via the neutral is forced to flow through the installation's
                earth system. This causes the earth terminal and all connected metalwork to rise to
                a potentially lethal voltage.
              </>
            }
            doInstead={
              <>
                BS 7671 and DNO regulations restrict PME earthing for swimming pools, marinas,
                construction sites, caravan parks, agricultural premises and petrol filling stations
                — a TT arrangement is used in these locations instead.
              </>
            }
          />

          <ConceptBlock title="TN system comparison">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Characteristic</th>
                    <th className="py-2 pr-4 font-medium text-white">TN-S</th>
                    <th className="py-2 font-medium text-white">TN-C-S (PME)</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Maximum declared Ze</td>
                    <td className="py-2 pr-4">0.8 ohms</td>
                    <td className="py-2">0.35 ohms</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Earth return</td>
                    <td className="py-2 pr-4">Cable sheath (separate)</td>
                    <td className="py-2">PEN conductor (combined)</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">PEN conductor risk</td>
                    <td className="py-2 pr-4">No</td>
                    <td className="py-2">Yes — loss causes danger</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Special location restrictions</td>
                    <td className="py-2 pr-4">None</td>
                    <td className="py-2">Yes — pools, marinas, etc.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-elec-yellow/70">
              <strong>Practical tip:</strong> When inspecting a TN-C-S installation, check the
              integrity of the main bonding conductors. These limit the potential difference between
              earthed metalwork and extraneous-conductive-parts (gas, water pipes) in the event of a
              PEN conductor issue. Inadequate bonding in a PME installation is a serious deficiency.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>TT earthing systems</ContentEyebrow>

          <ConceptBlock title="No earth terminal from the supplier">
            <p>
              In a TT system, the supply company does not provide an earth terminal. The
              installation must obtain its own connection to earth, typically via one or more earth
              electrodes driven into the ground. The earth fault return path includes the resistance
              of the earth electrode and the general mass of earth between the installation
              electrode and the supply transformer's earth connection. This earth path resistance is
              significantly higher than the metallic path in a TN system.
            </p>
            <p>
              TT systems are common in rural areas of the UK where the overhead line supply does not
              include a suitable earth conductor. They are also required in locations where PME
              earthing is restricted. The high earth fault loop impedance characteristic of TT
              systems means that RCDs are essential for earth fault protection — overcurrent devices
              alone cannot achieve the required disconnection times.
            </p>
          </ConceptBlock>

          <EarthingSystemDiagram system="TT" />

          <ConceptBlock title="TT system characteristics">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Earth electrode types:</strong> Driven rods (copper-clad steel), copper
                plates, bare copper tape buried in trenches, foundation electrodes
              </li>
              <li>
                <strong>Typical electrode resistance:</strong> 10 to 200 ohms (depends heavily on
                soil conditions)
              </li>
              <li>
                <strong>Protection:</strong> RCD essential — 30 mA for additional protection, with
                maximum Zs ≤ 1,667 ohms
              </li>
              <li>
                <strong>Testing:</strong> Earth electrode resistance must be measured separately
                during periodic inspection
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Earth electrode resistance and soil conditions">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Soil Type</th>
                    <th className="py-2 pr-4 font-medium text-white">
                      Typical Resistivity (ohm-m)
                    </th>
                    <th className="py-2 font-medium text-white">Expected Electrode Resistance</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Clay (moist)</td>
                    <td className="py-2 pr-4">5 - 20</td>
                    <td className="py-2">Low (5 - 30 ohms)</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Loam/topsoil</td>
                    <td className="py-2 pr-4">10 - 100</td>
                    <td className="py-2">Moderate (10 - 100 ohms)</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Sand</td>
                    <td className="py-2 pr-4">50 - 500</td>
                    <td className="py-2">High (50 - 300 ohms)</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Rock (granite/sandstone)</td>
                    <td className="py-2 pr-4">1,000 - 10,000</td>
                    <td className="py-2">Very high (200+ ohms)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-elec-yellow/70">
              <strong>Maintenance note:</strong> Earth electrode resistance can vary significantly
              with season — dry summer conditions can increase resistance dramatically as soil
              moisture decreases. Periodic inspection should ideally include earth electrode
              resistance measurement, and the installation owner should be aware that seasonal
              variation may affect protection performance.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>IT earthing systems and insulation monitoring</ContentEyebrow>

          <ConceptBlock title="A single earth fault does not force a disconnection">
            <p>
              The IT earthing system is fundamentally different from TN and TT systems. In an IT
              system, the supply source (transformer) is either completely isolated from earth or
              connected to earth through a deliberate high impedance. This means that a single earth
              fault does not create a closed circuit for significant fault current to flow — the
              fault current is limited to a small value determined by the distributed capacitance of
              the system or the impedance of the earthing connection.
            </p>
            <p>
              The key advantage is continuity of supply. When a first earth fault occurs, the system
              continues to operate safely because the fault current is too small to cause danger or
              trip protective devices. An insulation monitoring device (IMD) detects the fault and
              raises an alarm, allowing maintenance personnel to locate and repair the fault in a
              planned manner without interrupting supply.
            </p>
          </ConceptBlock>

          <EarthingSystemDiagram system="IT" />

          <ConceptBlock title="IT system applications">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Hospitals:</strong> Operating theatres and critical care areas where loss of
                supply could be life-threatening
              </li>
              <li>
                <strong>Process industries:</strong> Chemical plants and refineries where unexpected
                shutdown could cause hazardous conditions
              </li>
              <li>
                <strong>Mining:</strong> Underground mining where fault conditions combined with
                water create extreme danger
              </li>
              <li>
                <strong>Laboratory equipment:</strong> Sensitive measurement systems where leakage
                currents could affect results
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="IT system requirements"
            onSite="While IT systems are less common than TN or TT in general maintenance work, understanding their principle is important for the maintenance technician standard. You may encounter IT systems in hospital maintenance, industrial process plants, or when working with standby generators and UPS systems."
          >
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Insulation monitoring device (IMD):</strong> Continuously monitors
                insulation resistance and alarms on first fault
              </li>
              <li>
                <strong>Second fault protection:</strong> Overcurrent devices must disconnect for a
                second fault (which creates a phase-to-phase path through earth)
              </li>
              <li>
                <strong>Maintenance:</strong> First faults must be rectified promptly to maintain
                the safety advantage
              </li>
              <li>
                <strong>Exposed-conductive-parts:</strong> Must still be earthed (individually or
                collectively) for second-fault protection
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Testing and verification of earthing systems</ContentEyebrow>

          <ConceptBlock title="Ze, Zs and earth electrode resistance">
            <p>
              Verifying the integrity and adequacy of the earthing system is a critical part of both
              initial verification and periodic inspection. The key measurements are the external
              earth fault loop impedance (Ze), the total earth fault loop impedance at each circuit
              endpoint (Zs), and — for TT systems — the earth electrode resistance (RA).
            </p>
          </ConceptBlock>

          <ConceptBlock title="Measuring Ze">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Method:</strong> Disconnect the installation earthing conductor from the
                main earthing terminal. Connect the loop impedance tester between line, neutral and
                the supply earth terminal.
              </li>
              <li>
                <strong>Safety:</strong> Whilst the installation earthing is disconnected, there is
                no earth fault protection. Minimise the disconnection time and ensure no work is
                carried out on the installation.
              </li>
              <li>
                <strong>Expected values:</strong> TN-S: up to 0.8 ohms; TN-C-S: up to 0.35 ohms
              </li>
              <li>
                <strong>Anomalies:</strong> A Ze significantly higher than expected may indicate a
                damaged earthing conductor or a change in the supply arrangement
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Zs verification and earth electrode testing">
            <p>
              Zs is measured at each circuit endpoint (furthest point from the origin) using a loop
              impedance tester. The measured value must not exceed the maximum Zs for the protective
              device type and rating, as tabulated in BS 7671. Values should be compared with the
              corrected (temperature-adjusted) tabulated maximums, applying a 0.8 multiplier to the
              table values for ambient temperature correction during testing.
            </p>
            <p>
              For TT systems, the earth electrode resistance (RA) must be measured using the
              fall-of-potential method with a dedicated earth electrode tester. This involves
              placing temporary test electrodes at defined distances from the installation electrode
              and measuring the voltage gradient. The 61.8% rule is used to determine the correct
              measurement point for accuracy.
            </p>
            <p className="italic text-white">
              <strong>Note:</strong> Always record earthing system type and Ze on the electrical
              installation certificate or periodic inspection report. Changes in Ze over time can
              indicate deterioration of the supply earth connection and should be investigated with
              the DNO.
            </p>
          </ConceptBlock>

          <SectionRule />

          <VideoCard
            url="https://www.youtube.com/watch?v=2NQzFwZupiY"

            title="Broken PEN Conductors and Diverted Neutral Currents"

            channel="A121 Training"

            duration="30:45"

            topic="What goes wrong in a TN-C-S system when the PEN fails"

            caption="The failure mode that makes PME worth understanding properly — worth the time once you have the four systems straight."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'TN-S: separate PE conductor throughout, Ze up to 0.8 ohms, no PEN conductor risk.',
              'TN-C-S (PME): combined PEN in the supply, separated at the origin, Ze up to 0.35 ohms — the lowest and fastest, but a broken PEN is dangerous.',
              'TT: no supply earth — a local earth electrode and RCD protection are essential; maximum Zs <= 1,667 ohms for a 30 mA RCD.',
              'IT: source isolated or high-impedance earthed — a first fault does not disconnect; an insulation monitoring device (IMD) is required.',
              'PME restrictions apply to swimming pools, marinas, caravan parks, agricultural premises and petrol filling stations.',
              'Ze is measured with the installation earthing conductor disconnected; Zs = Ze + (R1 + R2) at each circuit endpoint.',
              'TT earth electrode resistance is measured by the fall-of-potential method using the 61.8% rule.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module2-section4-3')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Overcurrent and Short-Circuit Protection
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module2-section4-5')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Bonding Requirements
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule2Section4_4;
