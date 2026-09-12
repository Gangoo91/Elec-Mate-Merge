/**
 * MOET · Module 2 · Section 2.4 · Subsection 5 — Bonding Requirements
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
import { EquipotentialBonding } from '@/components/study-centre/diagrams';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Bonding Requirements - MOET Module 2 Section 4.5';
const DESCRIPTION =
  'Comprehensive guide to equipotential bonding for electrical maintenance technicians: main bonding, supplementary bonding, conductor sizing, BS 7671 Section 544 requirements and practical applications.';

const quickCheckQuestions = [
  {
    id: 'bonding-purpose',
    question: 'What is the primary purpose of equipotential bonding?',
    options: [
      'To provide the main path for fault current back to the supply transformer',
      'To increase the earth fault loop impedance so protective devices trip faster',
      'To replace the need for circuit protective conductors in an installation',
      'To ensure all simultaneously accessible metalwork is at the same potential, reducing touch voltage during a fault',
    ],
    correctIndex: 3,
    explanation:
      'Equipotential bonding connects all simultaneously accessible exposed-conductive-parts and extraneous-conductive-parts to the same potential. During a fault, if all metalwork in an area is at the same voltage, the potential difference that a person could experience between any two touchable surfaces is minimised — reducing the risk of electric shock.',
  },
  {
    id: 'main-bonding-size',
    question:
      'For a TN-C-S (PME) supply with a 25 mm² incoming line conductor, what is the minimum main bonding conductor size?',
    options: ['10 mm² copper', '25 mm² copper', '6 mm² copper', '16 mm² copper'],
    correctIndex: 0,
    explanation:
      'For TN-C-S (PME) supplies, BS 7671 Table 54.8 requires main bonding conductors to be not less than 10 mm² copper where the incoming line conductor is up to 35 mm². This is more onerous than the general requirement because of the additional risk associated with PME — the broken PEN conductor scenario requires robust bonding to limit dangerous voltage differences.',
  },
  {
    id: 'supplementary-bonding',
    question: 'Supplementary bonding is required:',
    options: [
      'In every circuit of a domestic installation regardless of location',
      'Only on the supply side of the electricity meter at the origin',
      'In locations where the conditions increase the risk of shock, such as bathrooms, or where the automatic disconnection time may not be met',
      'Only where the installation is supplied from a TT earthing system',
    ],
    correctIndex: 2,
    explanation:
      'Supplementary bonding provides additional equipotential bonding within a specific area where the shock risk is increased — for example, bathrooms (BS 7671 Section 701) where the body resistance is reduced by wet conditions. It is also required where Zs values cannot meet the disconnection time requirements and an alternative solution is needed.',
  },
  {
    id: 'extraneous-conductive-part',
    question: 'Which of the following is an extraneous-conductive-part that requires main bonding?',
    options: [
      'A metallic gas installation pipe entering the building',
      'A metal light switch faceplate',
      'A copper cable conductor within the installation',
      'The metal enclosure of a consumer unit',
    ],
    correctIndex: 0,
    explanation:
      'An extraneous-conductive-part is a conductive part that is not part of the electrical installation but which may introduce a potential — typically earth potential. Metallic gas pipes, water pipes, structural steelwork, and central heating pipes entering a building are extraneous-conductive-parts that must be main bonded. The consumer unit enclosure is an exposed-conductive-part (part of the electrical installation), not an extraneous-conductive-part.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Main equipotential bonding connects the main earthing terminal to:',
    options: [
      'The line and neutral conductors at the origin of the installation',
      'Extraneous-conductive-parts such as metallic gas, water and structural steel entering the building',
      'The exposed-conductive-parts of every item of Class I equipment',
      'The earth electrode only, with no other connections made',
    ],
    correctAnswer: 1,
    explanation:
      'Main equipotential bonding (Regulation 411.3.1.2) connects the main earthing terminal to each extraneous-conductive-part entering the building — metallic water service pipes, gas installation pipes, oil installation pipes, structural steelwork, central heating systems, and air conditioning ducting. This ensures they are at the same potential as the installation earth.',
  },
  {
    id: 2,
    question: 'The main bonding connection to gas pipework must be made:',
    options: [
      'On the supply side of the gas meter, before it enters the building',
      'At the furthest point of the gas pipework from the meter',
      'Within 600 mm of the meter outlet (consumer side), before any branch pipework',
      'Anywhere convenient along the gas pipe within the building',
    ],
    correctAnswer: 2,
    explanation:
      "The main bonding connection to gas pipework must be made within 600 mm of the meter outlet on the consumer's side (downstream of the meter), before any branch pipework. This ensures the bonding is as close as possible to the point where the pipe enters the installation, capturing all downstream metalwork. It must be on the consumer's side of the meter to avoid interfering with the meter installation.",
  },
  {
    id: 3,
    question:
      'Under BS 7671, the minimum cross-sectional area for a main bonding conductor in a TN-S system with a 16 mm² incoming line conductor is:',
    options: ['6 mm² copper', '2.5 mm² copper', '4 mm² copper', '10 mm² copper'],
    correctAnswer: 3,
    explanation:
      'For TN-S and TN-C-S systems, BS 7671 Table 54.8 specifies minimum main bonding conductor sizes. For a supply with a line conductor of 16 mm², the minimum main bonding conductor is 10 mm² copper. The standard specifies minimum sizes of 6 mm², 10 mm², or 25 mm² depending on the supply conductor size, but with an absolute minimum of 6 mm² for any installation.',
  },
  {
    id: 4,
    question:
      'Supplementary bonding conductors between two exposed-conductive-parts must have a minimum cross-sectional area of:',
    options: [
      'Not less than the smaller of the two CPCs connected to those parts',
      'Not less than the larger of the two CPCs connected to those parts',
      'Always at least 10 mm² copper regardless of the CPC sizes',
      'Equal to the incoming line conductor of the installation',
    ],
    correctAnswer: 0,
    explanation:
      'BS 7671 Regulation 544.2.3 requires that a supplementary bonding conductor connecting two exposed-conductive-parts must have a conductance not less than that of the smaller CPC connected to those parts. In practice, this means using a conductor at least the same size as the smaller CPC. Where the bond connects an exposed-conductive-part to an extraneous-conductive-part, it must be at least half the CPC size, with a minimum of 2.5 mm² (mechanically protected) or 4 mm² (unprotected).',
  },
  {
    id: 5,
    question: 'A bonding conductor must be identified by:',
    options: [
      'Blue insulation or sleeving along its full length',
      'Green-and-yellow striped insulation or sleeving',
      'Plain green insulation or sleeving along its full length',
      'Black insulation with a brown identifying sleeve',
    ],
    correctAnswer: 1,
    explanation:
      'All protective conductors, including bonding conductors, must be identified by green-and-yellow bi-colour marking (BS 7671 Regulation 514.3.2). This applies throughout their length. Where the conductor is bare (e.g., bare copper tape), green-and-yellow sleeving or tape must be applied at terminations and at intervals along the run where visible.',
  },
  {
    id: 6,
    question:
      'In a bathroom (special location — Section 701), supplementary bonding is required when:',
    options: [
      'The bathroom contains any Class II (double-insulated) equipment',
      'A shower is installed rather than a bath, in every case',
      'Only if the automatic disconnection conditions of Regulation 411.3.2 cannot be met',
      'The bathroom is on the first floor or above, in every case',
    ],
    correctAnswer: 2,
    explanation:
      'BS 7671 Regulation 701.415.2 (as amended) states that supplementary bonding in bathrooms may be omitted where all circuits comply with the automatic disconnection requirements of Regulation 411.3.2 and all circuits are protected by 30 mA RCDs. If these conditions are met, supplementary bonding is not required. Where they cannot be met, supplementary bonding must be provided.',
  },
  {
    id: 7,
    question: 'The bonding clamp used on a gas or water pipe must be:',
    options: [
      'Any general-purpose jubilee clip tightened firmly onto the pipe',
      'A soldered joint made directly onto the surface of the pipe',
      'A plastic compression fitting with the conductor pushed inside',
      "A purpose-made clamp to BS 951, permanently labelled 'Safety Electrical Connection — Do Not Remove'",
    ],
    correctAnswer: 3,
    explanation:
      "Bonding clamps must be purpose-made to BS 951 and must be permanently labelled 'Safety Electrical Connection — Do Not Remove' (BS 7671 Regulation 514.13.1). This label ensures that anyone working on the pipework understands the electrical safety significance of the connection and does not inadvertently remove it — which could leave metalwork unbonded and dangerous.",
  },
  {
    id: 8,
    question:
      'If a plastic section is inserted into an otherwise metallic water pipe system (e.g., during repairs), what is the bonding implication?',
    options: [
      'The section downstream of the plastic insert is no longer bonded and may need separate bonding or re-assessment',
      'The plastic section improves the bonding by insulating the pipe run',
      'The whole pipe no longer requires any bonding at all',
      'The plastic section has no effect on bonding and can be ignored',
    ],
    correctAnswer: 0,
    explanation:
      'A plastic (non-conductive) section inserted into a metallic pipe breaks the bonding continuity. The metalwork downstream of the plastic section is no longer connected to the main bonding and could be at a different potential. The situation must be assessed — if the downstream metalwork is simultaneously accessible with other earthed metalwork, supplementary bonding or an alternative solution may be required.',
  },
  {
    id: 9,
    question: 'Main bonding conductors must be connected to:',
    options: [
      'The neutral bar of the consumer unit',
      'The main earthing terminal of the installation',
      'The line terminal of the main switch',
      'The protective conductor of the nearest final circuit',
    ],
    correctAnswer: 1,
    explanation:
      'Main bonding conductors run from each extraneous-conductive-part to the main earthing terminal (MET) of the installation (Regulation 544.1.1). The MET is the central point where all protective conductors converge — the earthing conductor from the means of earthing, the main bonding conductors, and the circuit protective conductors all connect here.',
  },
  {
    id: 10,
    question: 'Which of the following does NOT typically require main bonding?',
    options: [
      'Metallic water service pipe',
      'Metallic gas installation pipe',
      'A plastic cold water pipe from a private borehole',
      'Structural steelwork accessible within the building',
    ],
    correctAnswer: 2,
    explanation:
      'A plastic pipe is not a conductive part and therefore cannot introduce a potential or provide a path for fault current. It does not require bonding. Only metallic (conductive) pipes, ducts and structural elements that may introduce earth potential into the building are classified as extraneous-conductive-parts requiring main bonding.',
  },
  {
    id: 11,
    question: 'When inspecting main bonding during periodic inspection, you should verify:',
    options: [
      'Only that a bonding conductor is present, with no further checks needed',
      'That the bonding conductor is the same colour as the line conductor',
      'That the bonding clamp is fitted on the supply side of the meter',
      'That the conductor is correctly sized, securely connected with a BS 951 clamp, correctly labelled, and has continuity to the MET',
    ],
    correctAnswer: 3,
    explanation:
      "A thorough inspection of main bonding includes: verifying the conductor size meets BS 7671 requirements for the supply type and size; checking the connection is secure using a proper BS 951 clamp; confirming the 'Safety Electrical Connection — Do Not Remove' label is present and legible; and testing continuity from the bonding clamp back to the main earthing terminal using a low-resistance ohmmeter.",
  },
  {
    id: 12,
    question: 'For PME (TN-C-S) supplies, main bonding requirements are more onerous because:',
    options: [
      'A broken PEN conductor could cause dangerous voltages on earthed metalwork, so robust bonding is essential to maintain equipotentiality',
      'PME supplies operate at a higher voltage than other earthing systems',
      'PME supplies have no earth electrode and rely on bonding for all earthing',
      'PME supplies are only ever used in industrial installations with high loads',
    ],
    correctAnswer: 0,
    explanation:
      'PME supplies carry the specific risk that loss of the PEN conductor allows earth-referenced metalwork to rise to dangerous voltage. Robust main bonding ensures that even if this occurs, all metalwork in the installation remains at the same potential — minimising the voltage a person could experience between simultaneously accessible metalwork. This is why BS 7671 specifies larger minimum bonding conductor sizes for PME supplies.',
  },
];

const faqs = [
  {
    question:
      'Is main bonding to water pipes still required now that many houses have plastic water mains?',
    answer:
      'Where the incoming water service pipe is entirely plastic, it is not an extraneous-conductive-part and does not require main bonding. However, if there is any metallic pipework within the building connected to the plastic mains (e.g., copper internal pipework), the internal metalwork may still need assessment. If it could introduce a potential (e.g., by contact with the ground or other conductive surfaces), supplementary bonding may be required. Always assess the specific installation.',
  },
  {
    question: 'Can I use the gas or water pipe as an earthing conductor?',
    answer:
      'No. BS 7671 Regulation 543.2.3 prohibits a gas pipe, an oil pipe, flexible or pliable conduit, support wires or other flexible metallic parts from being selected as a protective conductor. Water pipes should also not be relied upon as the sole means of earthing due to the risk of plastic sections being introduced. Bonding connects these services to the earthing system for safety, but the earthing conductor itself must be a dedicated conductor connected to the means of earthing provided by the supply or the earth electrode.',
  },
  {
    question: 'Do I need to bond the central heating system separately from the water pipes?',
    answer:
      'If the central heating system is metallically continuous with the bonded water pipework (i.e., connected by metal pipes throughout), then the bonding of the water pipes extends to the heating system. However, if there are plastic sections, isolating valves with plastic components, or if the heating system is not metallically continuous with the bonded water pipe, separate bonding of the heating system may be required. Always verify continuity.',
  },
  {
    question:
      'What is the difference between an exposed-conductive-part and an extraneous-conductive-part?',
    answer:
      'An exposed-conductive-part (ECP) is a conductive part of electrical equipment that can be touched and is not normally live but can become live under fault conditions — for example, a metal light fitting or a metal distribution board enclosure. An extraneous-conductive-part (ExCP) is a conductive part that is not part of the electrical installation but may introduce a potential — for example, metallic water pipes, gas pipes, or structural steelwork. ECPs are earthed via circuit protective conductors; ExCPs are connected to the installation earth via bonding conductors.',
  },
  {
    question: 'How do I test bonding continuity during periodic inspection?',
    answer:
      'Use a low-resistance ohmmeter (typically part of your multifunction tester) to measure the resistance between the bonding clamp on the pipe and the main earthing terminal. The reading should be very low — typically less than 0.05 ohms for a direct bonding connection. Higher readings suggest a poor connection, corrosion at the clamp, or a damaged conductor. Also visually inspect the clamp, label, and conductor for damage, corrosion or unauthorised removal.',
  },
];

const MOETModule2Section4_5 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 2 · Section 2.4 · Subsection 5"
        title="Bonding Requirements"
        backTo="/study-centre/apprentice/m-o-e-t-module2-section4"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Equipotential bonding principles, conductor sizing and practical implementation — main
            bonding to gas, water and structural steel, supplementary bonding in high-risk areas,
            and the deficiencies you will find most often on site.
          </p>

          <TLDR
            points={[
              'Main bonding: ExCPs to MET — gas, water, steel, heating.',
              'Supplementary: local bonding in high-risk areas (bathrooms).',
              'Sizing: Table 54.8 — depends on supply type and conductor size.',
              "Label: BS 951 clamp, 'Do Not Remove' label mandatory.",
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
              'Explain the purpose of equipotential bonding and the concept of touch voltage reduction',
              'Distinguish between main bonding and supplementary bonding and their respective applications',
              'Select correct bonding conductor sizes using BS 7671 Table 54.8',
              'Identify extraneous-conductive-parts requiring main bonding in typical installations',
              'Apply supplementary bonding requirements in bathrooms and other special locations',
              'Inspect and test bonding installations during periodic inspection and testing',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The principle of equipotential bonding</ContentEyebrow>

          <ConceptBlock
            title="Keeping all touchable metalwork at the same potential"
            plainEnglish="If every piece of metal you could touch at the same time is at the same voltage, there is nothing for a shock to travel across — bonding removes the potential difference, not the fault."
          >
            <p>
              Equipotential bonding is one of the two fundamental measures for protection against
              electric shock by automatic disconnection of supply (the other being the protective
              earthing of exposed-conductive-parts). Its purpose is to ensure that all
              simultaneously accessible metalwork — whether part of the electrical installation or
              not — is at the same electrical potential. If all touchable metalwork is at the same
              voltage, a person touching two surfaces simultaneously cannot experience a dangerous
              potential difference across their body.
            </p>
            <p>
              Consider a fault scenario: a line conductor in a washing machine contacts the metal
              casing. The casing rises to a dangerous voltage (relative to earth). If the person
              touching the casing is also standing on a metal floor or touching a bonded water pipe,
              the potential difference between the casing and the pipe determines the severity of
              the shock. Effective bonding ensures that both the casing (via the CPC) and the pipe
              (via the bonding conductor) are connected to the same earthing terminal, keeping them
              at the same potential.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Two levels of bonding">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Main equipotential bonding (Reg 411.3.1.2):</strong> Connects
                extraneous-conductive-parts entering the building to the main earthing terminal
                (MET). This creates a zone of equipotentiality throughout the building.
              </li>
              <li>
                <strong>Supplementary equipotential bonding (Reg 415.2):</strong> Provides
                additional bonding within a specific area (e.g., bathroom) where the shock risk is
                increased, connecting local exposed-conductive-parts and extraneous-conductive-parts
                together.
              </li>
            </ul>
          </ConceptBlock>

          <EquipotentialBonding />

          <CommonMistake
            title="Removing bonding without an equivalent safety measure"
            whatHappens={
              <>
                Bonding must never be removed or disconnected without ensuring an equivalent safety
                measure is in place. Removing a bonding conductor — even temporarily during plumbing
                work — can create an immediate shock hazard.
              </>
            }
            doInstead={
              <>
                This is why the &apos;Safety Electrical Connection — Do Not Remove&apos; label is a
                mandatory requirement. As a maintenance technician, if you find bonding has been
                removed (a common occurrence after plumbing or gas work), it must be reinstated
                immediately and recorded as a deficiency.
              </>
            }
          />

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Main equipotential bonding</ContentEyebrow>

          <ConceptBlock title="Every extraneous-conductive-part entering the building">
            <p>
              Main equipotential bonding is required by BS 7671 Regulation 411.3.1.2. It connects
              every extraneous-conductive-part entering the building to the main earthing terminal
              (MET) of the installation. The bonding conductor runs from the MET to a purpose-made
              clamp on each service.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Services requiring main bonding">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Metallic water service pipe:</strong> Bond within 600 mm of the internal
                stopcock
              </li>
              <li>
                <strong>Metallic gas installation pipe:</strong> Bond within 600 mm of the meter
                outlet (consumer side)
              </li>
              <li>
                <strong>Other metallic service pipes:</strong> Oil, compressed air, fire sprinkler
                mains
              </li>
              <li>
                <strong>Structural steelwork:</strong> Where accessible and likely to introduce
                earth potential
              </li>
              <li>
                <strong>Central heating and air conditioning:</strong> Metallic systems where not
                metallically continuous with bonded water pipes
              </li>
              <li>
                <strong>Lightning protection:</strong> The lightning protection earth must be bonded
                to the MET
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Main bonding conductor sizes (BS 7671 Table 54.8)">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Supply Conductor CSA</th>
                    <th className="py-2 pr-4 font-medium text-white">TN-S Minimum</th>
                    <th className="py-2 font-medium text-white">TN-C-S (PME) Minimum</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Up to 35 mm² Cu</td>
                    <td className="py-2 pr-4">10 mm² Cu</td>
                    <td className="py-2">10 mm² Cu</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Over 35 mm² up to 50 mm² Cu</td>
                    <td className="py-2 pr-4">16 mm² Cu</td>
                    <td className="py-2">16 mm² Cu</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Over 50 mm² up to 95 mm² Cu</td>
                    <td className="py-2 pr-4">16 mm² Cu</td>
                    <td className="py-2">25 mm² Cu</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Over 95 mm² up to 150 mm² Cu</td>
                    <td className="py-2 pr-4">25 mm² Cu</td>
                    <td className="py-2">25 mm² Cu</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-[12px] text-white">
              Copied faithfully from the original page — Table 54.8 values cannot be independently
              verified against the RAG, which holds rules rather than numeric tables (see conversion
              report).
            </p>
            <p className="text-elec-yellow/70">
              <strong>Key point:</strong> For PME installations, the bonding conductor size
              requirements are generally the same or larger than for TN-S because of the additional
              risk. The absolute minimum for any main bonding conductor is 6 mm² copper, but in
              practice 10 mm² is the most common minimum for domestic installations.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Supplementary equipotential bonding</ContentEyebrow>

          <ConceptBlock title="An additional measure where shock risk is increased">
            <p>
              Supplementary bonding provides an additional safety measure within specific areas
              where the risk of electric shock is increased. The most common application is in
              bathrooms (Section 701 of BS 7671), where the body's resistance to current flow is
              significantly reduced by water and wet skin. Supplementary bonding connects
              simultaneously accessible exposed-conductive-parts and extraneous-conductive-parts
              within the local area.
            </p>
          </ConceptBlock>

          <ConceptBlock title="When supplementary bonding is required">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Bathrooms (Section 701):</strong> Required unless all circuits comply with
                automatic disconnection requirements AND all circuits are RCD protected at 30 mA
              </li>
              <li>
                <strong>Swimming pools (Section 702):</strong> Always required — connects all
                exposed- and extraneous-conductive-parts within the zone
              </li>
              <li>
                <strong>Agricultural premises (Section 705):</strong> Required in livestock areas
              </li>
              <li>
                <strong>Any location:</strong> Where the disconnection time requirements of Reg
                411.3.2 cannot be met by other means
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Supplementary bonding conductor sizing">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Between two exposed-conductive-parts:</strong> Not less than the smaller of
                the two CPCs
              </li>
              <li>
                <strong>
                  Between an exposed-conductive-part and an extraneous-conductive-part:
                </strong>{' '}
                Not less than half the size of the CPC
              </li>
              <li>
                <strong>Between two extraneous-conductive-parts:</strong> Not less than 2.5 mm² Cu
                (mechanically protected) or 4 mm² Cu (unprotected)
              </li>
              <li>
                <strong>Absolute minimum:</strong> 2.5 mm² Cu if mechanically protected; 4 mm² Cu if
                not
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Bathroom bonding — practical application"
            onSite="In a bathroom where supplementary bonding is required, you must bond together: the metal bath or shower tray (if metallic), metallic waste pipes, copper hot and cold water pipes, central heating pipes and radiators, metallic door frames, and any exposed-conductive-parts of electrical equipment (e.g., Class I towel rails, extractors). Connections should be made using purpose-made clamps or lugs, and the bonding network should connect back to the earth terminal of the bathroom circuit."
          >
            <p>
              The bathroom is the special location most maintenance technicians meet most often —
              know the bonding checklist for it.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Inspection, testing and common deficiencies</ContentEyebrow>

          <ConceptBlock title="Among the most common periodic inspection findings">
            <p>
              Bonding deficiencies are among the most common findings during periodic inspection and
              testing. Missing bonding, undersized conductors, removed clamps, and disconnected
              conductors are frequently discovered — often as a result of plumbing, gas or building
              work carried out after the original electrical installation.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Inspection checklist">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Presence:</strong> Confirm bonding conductors exist to all
                extraneous-conductive-parts
              </li>
              <li>
                <strong>Sizing:</strong> Verify conductor CSA against BS 7671 Table 54.8 for the
                supply type
              </li>
              <li>
                <strong>Connections:</strong> Check clamps are secure, clean and making good contact
                (not corroded)
              </li>
              <li>
                <strong>Labels:</strong> Verify 'Safety Electrical Connection — Do Not Remove'
                labels are present and legible
              </li>
              <li>
                <strong>Continuity:</strong> Test continuity from bonding clamp to MET using
                low-resistance ohmmeter
              </li>
              <li>
                <strong>Route:</strong> Check conductor route is protected from mechanical damage
                and accessible for inspection
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Common deficiencies and EICR classification">
            <p>
              <strong>Common deficiencies:</strong> bonding removed during plumbing/gas work;
              plastic sections in pipework breaking continuity; undersized conductors (e.g., 4 mm²
              where 10 mm² required); missing or illegible labels; corroded clamps giving
              high-resistance connections; bonding connected on the wrong side of the gas meter.
            </p>
            <p>
              <strong>EICR classification:</strong> C1 (danger present) — missing main bonding on a
              PME supply; C2 (potentially dangerous) — undersized main bonding conductor; C3
              (improvement recommended) — missing label on otherwise correct bonding; FI (further
              investigation) — bonding continuity questionable, needs test.
            </p>
            <p className="text-elec-yellow/70">
              <strong>ST1426 link:</strong> Understanding bonding requirements and being able to
              inspect, test and rectify bonding deficiencies is a core skill for the electrical
              maintenance technician pathway. You will encounter bonding issues regularly during
              routine maintenance and periodic inspection work.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Bonding equalises potential across simultaneously accessible metalwork — it does not carry fault current back to the source.',
              'Main bonding connects extraneous-conductive-parts (gas, water, structural steel, heating) to the MET; sizes come from BS 7671 Table 54.8.',
              'Gas: bond within 600 mm of the meter outlet, consumer side. Water: bond within 600 mm of the internal stopcock.',
              'Supplementary bonding is required in bathrooms unless every circuit meets Reg 411.3.2 AND is 30 mA RCD protected.',
              'BS 7671 Regulation 543.2.3 prohibits gas pipes, oil pipes and similar flexible metallic parts from being selected as a protective conductor.',
              "Every bonding clamp must be a BS 951 clamp permanently labelled 'Safety Electrical Connection — Do Not Remove'.",
              'A plastic section inserted into a metallic pipe run breaks bonding continuity downstream — always assess after plumbing or gas work.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module2-section4-4')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Earthing Systems
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module2-section4-6')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Surge Protection Devices
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule2Section4_5;
