/**
 * MOET · Module 3 · Section 3.3 · Subsection 5 — Labelling and Identification
 * Standards
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
 *   · "Electrical. Electricity at Work regulations. IET wiring regulations."
 *   · "Electrical. Electrical plant, equipment, and systems maintenance
 *      requirements: removing and replacing parts, inspecting, testing,
 *      setting up, adjusting, cleaning, and functional testing."
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
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  Prerequisites,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Labelling and Identification Standards - MOET Module 3.3.5';
const DESCRIPTION =
  'Comprehensive guide to electrical labelling and identification standards for maintenance technicians: circuit identification, cable labelling, warning notices, BS 7671 requirements, BS EN 81346, and documentation practices under ST1426.';

const quickCheckQuestions = [
  {
    id: 'circuit-chart',
    question: 'What does BS 7671 Regulation 514.9 require at every distribution board?',
    options: [
      'A copy of the most recent EICR for the whole installation',
      'A durable circuit chart identifying every circuit, its protective device, purpose and area served',
      'A warning notice stating the maximum demand of the installation',
      'A photograph of the board interior taken at the time of installation',
    ],
    correctIndex: 1,
    explanation:
      "BS 7671 Regulation 514.9 requires a durable circuit chart or schedule at every distribution board (or within close proximity). It must identify every circuit by its protective device reference, describe the circuit's purpose and the area served. The chart must be accurate and kept up to date. An out-of-date or missing circuit chart is one of the most common defects found during periodic inspections and makes safe isolation extremely difficult.",
  },
  {
    id: 'safety-signs',
    question:
      'What warning label is required on any enclosure where a voltage exceeding 230 V exists between simultaneously accessible terminals?',
    options: [
      'A green safe-condition label showing the location of the nearest first-aid point',
      'A blue mandatory label instructing that PPE must be worn at all times',
      "A yellow warning triangle reading 'Danger — 400 V' (or the actual voltage present)",
      'A red prohibition label stating that the enclosure must never be opened',
    ],
    correctIndex: 2,
    explanation:
      'BS 7671 Regulation 514.10 requires a warning label where a voltage exceeding 230 V to earth exists between simultaneously accessible terminals or where different nominal voltages exist within the same enclosure. The label format must comply with BS EN ISO 7010 and the Health and Safety (Safety Signs and Signals) Regulations 1996 — a yellow warning triangle with black text. This warns maintenance technicians of the voltage hazard before they open the enclosure.',
  },
  {
    id: 'cable-marking',
    question:
      'How should cables be identified at each end and at accessible points along their route?',
    options: [
      'By their colour alone, since this is sufficient to identify any circuit',
      'By a temporary chalk mark made at the time of installation only',
      'By the position they occupy on the cable tray, recorded once on the drawings',
      'With durable labels showing circuit number, voltage, origin and destination',
    ],
    correctIndex: 3,
    explanation:
      "Good practice (and BS 7671 Regulation 514.8) requires cables to be identified at their origin, termination and at all accessible intermediate points. Labels should include the circuit reference number, origin (distribution board reference), destination, and cable type/size. Labels must be durable and legible throughout the installation's life. Without proper cable identification, maintenance work becomes dangerous — the wrong cable could be cut, disconnected or worked on while live.",
  },
  {
    id: 'label-material',
    question:
      'What is the most important characteristic of labels used for permanent electrical identification?',
    options: [
      'They must be the cheapest option available to keep installation costs low',
      'They must be durable, legible and resistant to the conditions at the point of installation',
      'They must be handwritten so they can be quickly updated on site after any change',
      'They must match the colour scheme of the surrounding wall decoration',
    ],
    correctIndex: 1,
    explanation:
      'Permanent electrical labels must withstand the environmental conditions at their location for the entire life of the installation. This means resistance to heat, UV exposure, moisture, chemicals, oil and normal wear. Machine-produced labels (engraved laminate, industrial label printer, anodised aluminium) are required for permanent installations. Handwritten labels are not acceptable. Labels that fade, peel or become illegible defeat their purpose and create a safety hazard by providing no information or, worse, incorrect information.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'BS EN 81346 provides:',
    options: [
      'The maximum permitted Zs values for each type of protective device',
      'A structured reference-designation system for industrial plant, systems and equipment',
      'The colour code requirements for safety signs and warning notices',
      'The minimum insulation resistance values for completed installations',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN 81346 (Industrial systems, installations and equipment — Structuring principles and reference designations) provides a hierarchical coding system for identifying plant, systems and equipment. It uses aspect-based classification with letter codes (e.g., Q for switching device, M for motor, K for relay). This standard provides a consistent, international framework for equipment labelling that is essential for large industrial and commercial installations.',
  },
  {
    id: 2,
    question: "A label stating 'Caution — dual supply' is required when:",
    options: [
      'An installation contains both single-phase and three-phase circuits',
      'A distribution board has more than one RCD protecting its final circuits',
      'An installation or enclosure can be energised from more than one source of supply',
      'A circuit chart has not been updated since the last modification was made',
    ],
    correctAnswer: 2,
    explanation:
      'BS 7671 Regulation 514.15 requires a warning label at the point of connection of every source of supply when an installation can be energised from more than one source. This is critical safety information — a maintenance technician who isolates one supply but is unaware of the second supply could be fatally injured. The label must be visible and positioned at every point where it is possible to isolate or access the installation.',
  },
  {
    id: 3,
    question: 'The minimum information required on a distribution board circuit chart includes:',
    options: [
      'The name of the electrician who installed each individual circuit',
      'The date each circuit was last switched off for routine maintenance',
      'The purchase cost of the cable and protective device for each circuit',
      'Circuit number, device type and rating, conductor size, description and area served',
    ],
    correctAnswer: 3,
    explanation:
      'A compliant circuit chart must include: the circuit reference number; the type and rating of each protective device (MCB, RCBO, fuse); the conductor size; a clear description of what the circuit supplies; and the area(s) served. Additional useful information includes RCD rating, maximum Zs value and cable type. The chart must be accurate, durable and updated whenever modifications are made.',
  },
  {
    id: 4,
    question: 'Colour coding for safety signs follows:',
    options: [
      'Red for prohibition/fire, yellow for warning, blue for mandatory, green for safe condition',
      'Red for safe condition, green for warning, blue for prohibition, yellow for mandatory',
      'A free choice of colours decided by the installer for each individual project',
      'The same colour scheme as the cable insulation used in the installation',
    ],
    correctAnswer: 0,
    explanation:
      'Safety sign colours are standardised: red for prohibition (no entry, do not switch on) and fire equipment; yellow for warning (danger, caution, risk of electric shock); blue for mandatory instruction (must wear PPE, switch off before opening); and green for safe condition (emergency exit, first aid). These colours are defined by BS EN ISO 7010 and enforced by the Health and Safety (Safety Signs and Signals) Regulations 1996.',
  },
  {
    id: 5,
    question: 'Engraved or printed labels for switchgear identification should be:',
    options: [
      'Handwritten in pencil so they can be erased and changed easily',
      'Machine-produced, durable, securely fixed, clearly legible and resistant to the environmental conditions at the point of installation',
      'Fixed with adhesive tape only, regardless of the environment',
      'Made from ordinary paper attached to the front of the enclosure',
    ],
    correctAnswer: 1,
    explanation:
      'Labels for permanent identification of switchgear, controls and equipment must be durable — resistant to heat, moisture, chemicals, UV exposure and normal wear. They should be machine-produced (engraved laminate, printed labels, or industrial label printers) for legibility and professionalism. Handwritten labels are not acceptable for permanent installations. Labels must be securely fixed (not relying on adhesive alone in harsh environments) and positioned where they are clearly visible.',
  },
  {
    id: 6,
    question:
      'When a periodic inspection finds an out-of-date circuit chart, the inspector should:',
    options: [
      'Ignore it, since circuit charts are not part of a periodic inspection',
      'Fail the entire installation regardless of any other findings on the day',
      'Record it as a defect (C3, or C2 if identification is unsafe) and recommend an update',
      'Remove the chart entirely so it cannot mislead future technicians',
    ],
    correctAnswer: 2,
    explanation:
      'An out-of-date or missing circuit chart is recorded as a defect during periodic inspection. If the lack of accurate circuit identification could affect the ability to safely isolate circuits (making it potentially dangerous), it would be classified as C2 (requiring urgent attention). If the chart exists but has minor omissions, it may be classified as C3 (improvement recommended). The duty holder is responsible for ensuring the chart is updated.',
  },
  {
    id: 7,
    question:
      'Cable identification at intermediate points (such as where cables pass through a switch room) is important because:',
    options: [
      'It increases the current-carrying capacity of the cables in the room',
      'It is only needed to improve the appearance of the visible cable route',
      'It removes the requirement to label cables at their origin and destination',
      'It lets technicians identify cables without tracing them, cutting the risk of wrong-cable work',
    ],
    correctAnswer: 3,
    explanation:
      'Intermediate cable identification prevents the dangerous and time-consuming process of cable tracing. In a switch room or cable basement with hundreds of cables, positive identification at the point of access is essential for safe isolation, fault diagnosis and modification work. Without labels, a technician may cut or disconnect the wrong cable, causing an unplanned outage or creating a safety hazard.',
  },
  {
    id: 8,
    question: "The label 'Safety Electrical Connection — Do Not Remove' is required on:",
    options: [
      'Earthing and bonding connections (main and supplementary bonding) that could be removed by uninformed persons',
      'The incoming supply cable running from the DNO cut-out to the meter',
      'Every socket-outlet final circuit in a domestic dwelling installation',
      'The main switch of every distribution board within the installation',
    ],
    correctAnswer: 0,
    explanation:
      'BS 7671 Regulation 514.13 requires permanent labels at earthing and bonding connections that might not be recognised as essential safety connections. Main equipotential bonding conductors, supplementary bonding conductors and earthing arrangements can appear as unnecessary wires to uninformed persons (plumbers, builders, decorators) who may remove them. The label provides a clear warning that removal could endanger lives.',
  },
  {
    id: 9,
    question:
      'In a large industrial installation, equipment reference designations following BS EN 81346 typically use:',
    options: [
      'A single sequential number assigned in the order items were installed',
      'A hierarchical structure of location, system and equipment codes giving a unique reference',
      'The manufacturer serial number of each item, used as its only reference',
      'A colour-coded label carrying no alphanumeric reference at all',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN 81346 uses a hierarchical structure: the location code identifies where the equipment is (building, floor, room); the system code identifies which system it belongs to (lighting, power, HVAC); and the equipment code identifies the specific item (motor, contactor, circuit breaker). This allows every item in a complex installation to have a unique, systematic reference that can be used on drawings, labels, maintenance records and CMMS systems.',
  },
  {
    id: 10,
    question: "RCD test button labels ('Test quarterly') are required by:",
    options: [
      'The Electricity at Work Regulations 1989, which set the test frequency',
      'The DNO, as a condition of connecting the installation to the supply',
      'BS 7671, which requires a notice that the RCD be tested quarterly via the test button',
      'The Building Regulations, which mandate quarterly RCD testing by law',
    ],
    correctAnswer: 2,
    explanation:
      'BS 7671 Regulation 514.12 requires a durable notice fixed at or near the origin of the installation or at the RCD stating that the device should be tested at regular intervals (typically quarterly) by pressing the integral test button, and that if the device does not trip when tested, the user should seek expert advice. This is a functional safety notice that is frequently missing during periodic inspections.',
  },
  {
    id: 11,
    question: 'When labelling a control panel, the terminal identification should:',
    options: [
      'Use a different numbering system from the one shown on the panel drawings',
      'Be left off entirely, since terminals can be identified by their position',
      'Number only the power terminals and omit the control circuit terminals',
      'Match the circuit diagram markings exactly, so any circuit traces from drawing to panel',
    ],
    correctAnswer: 3,
    explanation:
      'Terminal identification in a control panel must correspond exactly to the circuit diagrams, wiring diagrams and terminal schedules. This one-to-one relationship between drawing and physical installation is essential for fault diagnosis, modification and maintenance. If terminal labels do not match the drawings, every maintenance task becomes slower and more error-prone. IEC 61439 requires this correspondence as part of the technical documentation package.',
  },
  {
    id: 12,
    question: 'During maintenance, a label that has become illegible should be:',
    options: [
      'Replaced immediately with a new durable label and the replacement recorded in the log',
      'Left in place, since a faded label is better than no label at all on the equipment',
      'Removed without replacement to avoid giving any misleading information later',
      'Reported to the client but left for the next periodic inspection to address',
    ],
    correctAnswer: 0,
    explanation:
      'Illegible labels are a safety hazard — they defeat the purpose of the labelling system. Any illegible label discovered during maintenance should be replaced immediately with a new label carrying the correct information. This applies to circuit charts, cable labels, warning notices and equipment identification labels. Label replacement should be recorded in the maintenance log. Using the opportunity of maintenance access to check and replace worn labels is a best practice that improves overall installation safety.',
  },
];

const faqs = [
  {
    question: 'What type of label material should I use for different environments?',
    answer:
      'Indoor, clean, dry environments: laminated paper or vinyl labels. Industrial environments (heat, oil, chemicals): engraved laminate (Traffolyte), stainless steel or anodised aluminium. Outdoor: UV-resistant laminate, stainless steel or anodised aluminium. Corrosive atmospheres: stainless steel or chemical-resistant polymer. Cable labels: heat-shrink markers for permanent identification; self-laminating wrap-around labels for intermediate points. Always check that the adhesive is suitable for the surface and temperature range.',
  },
  {
    question: 'Is there a standard for electrical equipment numbering?',
    answer:
      'BS EN 81346 provides the international standard for reference designations in industrial installations. It uses letter codes for equipment types (Q = switching device, M = motor, K = relay, T = transformer, F = fuse) combined with sequential numbers within each system. Many organisations have their own numbering conventions based on this standard. Consistency is the key — whatever system is used, it must be applied uniformly across the entire installation and match all documentation.',
  },
  {
    question: 'What labels are required by BS 7671?',
    answer:
      'BS 7671 requires: circuit charts at distribution boards (Reg 514.9); voltage warning labels where >230 V between accessible terminals (Reg 514.10); earthing and bonding labels (Reg 514.13); RCD test notices (Reg 514.12); dual/alternative supply warnings (Reg 514.15); periodic inspection date notices (Reg 514.12); and labels for non-standard circuits or special conditions. Additional labels may be required by other standards (fire alarm — BS 5839, emergency lighting — BS 5266).',
  },
  {
    question: 'How do I update a circuit chart after modifications?',
    answer:
      'After any modification: (1) update the circuit chart to reflect the change (new circuits, amended descriptions, changed protective device ratings); (2) verify the chart against the actual installation; (3) sign and date the update; (4) if the chart is badly worn or has multiple corrections, produce a new chart. Many modern installations use electronic circuit chart systems that can be updated and reprinted easily. Always ensure a copy is physically present at the distribution board.',
  },
  {
    question: 'What is the best practice for labelling cables in complex installations?',
    answer:
      "Use a systematic cable numbering scheme that identifies: the origin (source board/panel reference); the circuit number; and optionally the destination. For example, 'DB-A/C15/AHU-3' means Distribution Board A, Circuit 15, to Air Handling Unit 3. Apply labels at both ends and at all accessible intermediate points (every cable tray bend, every access point, every floor/wall penetration). Use durable, machine-printed labels — handwritten markers fade and become illegible. Maintain a master cable schedule that lists every cable with its full identification.",
  },
];

const MOETModule3Section3_5 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 3 · Section 3.3 · Subsection 5"
        title="Labelling and Identification Standards"
        backTo="/study-centre/apprentice/m-o-e-t-module3-section3"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Identification systems, labelling standards and documentation for safe electrical
            maintenance — the difference between isolating the circuit you meant to and the one you
            guessed at.
          </p>

          <TLDR
            points={[
              'Circuit charts: required at every DB (BS 7671 Reg 514.9).',
              'Warning labels: voltage, dual supply, earthing notices.',
              'Cable marking: at origin, destination and intermediate points.',
              'Standards: BS EN 81346, BS EN ISO 7010, BS 7671 Part 5.',
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
              'Explain the BS 7671 requirements for circuit charts and warning labels',
              'Apply cable identification practices at origin, destination and intermediate points',
              'Describe the BS EN 81346 reference designation system for industrial equipment',
              'Identify the safety sign colour standards under BS EN ISO 7010',
              'Maintain and update labelling systems following installation modifications',
              'Recognise labelling defects during periodic inspection and maintenance',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Circuit charts and distribution board labelling</ContentEyebrow>

          <ConceptBlock title="Circuit Charts and Distribution Board Labelling">
            <p>
              The circuit chart is arguably the most important single document for safe electrical
              maintenance. It is the first thing a maintenance technician looks at when identifying
              a circuit for isolation, fault-finding or modification. An accurate, up-to-date
              circuit chart enables safe isolation; an inaccurate or missing chart makes every
              maintenance task potentially dangerous.
            </p>
            <p>
              BS 7671 Regulation 514.9 requires a durable chart or schedule at or near every
              distribution board identifying each circuit by its protective device, describing what
              it supplies, and indicating the area served. This is not optional — it is a mandatory
              requirement of the Wiring Regulations.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Format:</strong> Clear, legible table format with circuit number, device
                type/rating, conductor size, description and area served.
              </li>
              <li>
                <strong>Durability:</strong> Laminated or in a protective sleeve; resistant to the
                environment (heat, moisture, dust).
              </li>
              <li>
                <strong>Accuracy:</strong> Must exactly match the current installation — update
                after every modification.
              </li>
              <li>
                <strong>Position:</strong> Fixed at or adjacent to the distribution board, visible
                when the board is accessed.
              </li>
              <li>
                <strong>Spares:</strong> Blank entries for spare ways should be marked as 'Spare' —
                not left blank.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="The cost of poor circuit identification"
            whatHappens={
              <>
                HSE incident reports document cases where maintenance technicians isolated the wrong
                circuit because of inaccurate or missing circuit charts. In the worst cases, this
                resulted in work being carried out on a live circuit with fatal consequences. Even
                in less serious cases, wrong-circuit isolation causes unplanned outages, data loss
                and disruption to critical services.
              </>
            }
            doInstead={
              <>Always verify isolation by proving dead — never rely solely on the circuit chart.</>
            }
          />

          <ConceptBlock title="Circuit chart formats and templates">
            <p>
              While BS 7671 specifies the minimum information required, the format and level of
              detail in a circuit chart can vary significantly. Using a comprehensive format saves
              time during every subsequent maintenance task.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Basic format (minimum):</strong> Circuit number, protective device type and
                rating, circuit description, areas served — meets BS 7671 Regulation 514.9.
              </li>
              <li>
                <strong>Enhanced format (recommended):</strong> Adds conductor size, cable type, RCD
                details, maximum Zs, measured Zs, IR reading — provides essential test data for
                future inspections.
              </li>
              <li>
                <strong>Digital format:</strong> Electronic circuit charts linked to a database; can
                be updated remotely, printed on demand, and cross-referenced with CMMS work orders
                and test records.
              </li>
              <li>
                <strong>Photographic supplement:</strong> Photographs of the distribution board
                interior, showing circuit breaker positions and cable routes — invaluable for remote
                fault diagnosis.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Key point">
            <p className="text-elec-yellow/70">
              When you modify an installation (add a circuit, change a protective device, rewire a
              circuit to a different area), update the circuit chart immediately. Do not leave it
              for someone else to do — it will be forgotten.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Warning labels and safety notices</ContentEyebrow>

          <ConceptBlock title="Warning Labels and Safety Notices">
            <p>
              Warning labels and safety notices are a critical layer of protection in electrical
              installations. They communicate hazards, provide instructions, and alert maintenance
              technicians to non-obvious dangers. BS 7671 specifies several mandatory warning
              labels, and additional labels are required by other regulations and standards. Missing
              or incorrect labels are frequently recorded as defects during periodic inspections.
            </p>
            <div className="overflow-x-auto">
              <p className="mb-2 text-[13px] font-medium text-elec-yellow/80">
                Mandatory labels under BS 7671
              </p>
              <table className="w-full border-collapse text-left text-sm text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Label</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Regulation</th>
                    <th className="border border-white/10 px-3 py-2 text-left">When required</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Voltage warning</td>
                    <td className="border border-white/10 px-3 py-2">514.10</td>
                    <td className="border border-white/10 px-3 py-2">
                      Where exceeding 230 V between accessible terminals
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Earthing/bonding notice</td>
                    <td className="border border-white/10 px-3 py-2">514.13</td>
                    <td className="border border-white/10 px-3 py-2">
                      At earthing and bonding connections
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">RCD test notice</td>
                    <td className="border border-white/10 px-3 py-2">514.12</td>
                    <td className="border border-white/10 px-3 py-2">
                      At or near origin or RCD location
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Dual/alternative supply</td>
                    <td className="border border-white/10 px-3 py-2">514.15</td>
                    <td className="border border-white/10 px-3 py-2">
                      Where more than one source of supply exists
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Mixed colours warning</td>
                    <td className="border border-white/10 px-3 py-2">514.14</td>
                    <td className="border border-white/10 px-3 py-2">
                      Where old and new colour codes are present
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Periodic inspection date</td>
                    <td className="border border-white/10 px-3 py-2">514.12</td>
                    <td className="border border-white/10 px-3 py-2">
                      At or near the origin of the installation
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Safety sign colour standards">
            <p>
              Safety signs and labels must comply with the Health and Safety (Safety Signs and
              Signals) Regulations 1996 and BS EN ISO 7010. The colour system is standardised and
              must not be used for any other purpose.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Colour</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Meaning</th>
                    <th className="border border-white/10 px-3 py-2 text-left">
                      Electrical example
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Red</td>
                    <td className="border border-white/10 px-3 py-2">
                      Prohibition / fire equipment
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      "Do Not Switch On" isolation tags
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Yellow</td>
                    <td className="border border-white/10 px-3 py-2">Warning / caution</td>
                    <td className="border border-white/10 px-3 py-2">
                      "Danger — 400 V" voltage warnings
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Blue</td>
                    <td className="border border-white/10 px-3 py-2">Mandatory instruction</td>
                    <td className="border border-white/10 px-3 py-2">
                      "Switch Off Before Opening"
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Green</td>
                    <td className="border border-white/10 px-3 py-2">Safe condition</td>
                    <td className="border border-white/10 px-3 py-2">
                      Emergency exit routes, first-aid points
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Additional safety notices">
            <p>
              Beyond the mandatory labels specified in BS 7671, other regulations and standards
              require additional safety notices in specific situations. Maintenance technicians must
              be aware of these additional requirements.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Fire alarm panels (BS 5839-1):</strong> Zone charts showing detector
                locations, cause and effect matrices, and zone descriptions must be displayed at the
                fire alarm control panel.
              </li>
              <li>
                <strong>Emergency lighting (BS 5266-1):</strong> Log books must be maintained at a
                designated location, with notices indicating the testing schedule and responsible
                person.
              </li>
              <li>
                <strong>UPS systems:</strong> Warning labels indicating that circuits remain live
                when the mains supply is disconnected; must be present at the UPS, at each
                distribution board fed by the UPS, and at each socket outlet on a UPS-supplied
                circuit.
              </li>
              <li>
                <strong>Photovoltaic systems:</strong> DC isolation warnings at the inverter, at the
                consumer unit, and at the meter position — solar panels generate DC voltage whenever
                exposed to light, even when the AC supply is isolated.
              </li>
              <li>
                <strong>Battery systems:</strong> Chemical hazard warnings, DC shock risk notices,
                and emergency procedures displayed at battery installations.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Key point">
            <p className="text-elec-yellow/70">
              Warning labels save lives. A dual-supply warning at a distribution board alerts a
              technician that isolating the main switch alone may not make the board dead. Without
              this label, a fatally dangerous assumption could be made. Always check for and install
              required labels during every maintenance visit.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Cable and equipment identification</ContentEyebrow>

          <ConceptBlock title="Cable and Equipment Identification">
            <p>
              Beyond distribution board labelling, every cable and piece of equipment in an
              installation should be uniquely identified. In large industrial and commercial
              buildings with hundreds or thousands of cables and items of switchgear, positive
              identification is the foundation of safe and efficient maintenance.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Cable identification methods">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Heat-shrink markers:</strong> Permanent, durable, resistant to heat and
                chemicals; ideal for SWA cable identification at glands.
              </li>
              <li>
                <strong>Wrap-around labels:</strong> Self-laminating labels that wrap around the
                cable and protect the printed text; good for intermediate points.
              </li>
              <li>
                <strong>Cable tags:</strong> Tie-on tags for larger cables on trays and ladders;
                must be secured to prevent loss.
              </li>
              <li>
                <strong>Colour bands:</strong> Painted or applied colour bands for circuit or system
                identification on cable trays.
              </li>
              <li>
                <strong>Direct printing:</strong> Industrial cable labelling machines print directly
                onto the cable sheath; permanent but requires access.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="BS EN 81346 equipment designation">
            <p>
              For large industrial installations, BS EN 81346 provides a structured reference
              designation system. Equipment is identified by a hierarchical code indicating its
              location, the system it belongs to, and its specific function. This creates a unique
              identifier for every item that can be used consistently across drawings, CMMS systems,
              spare parts records and physical labels.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Q:</strong> Switching device (circuit breaker, isolator, contactor).
              </li>
              <li>
                <strong>M:</strong> Motor.
              </li>
              <li>
                <strong>K:</strong> Relay, contactor (control function).
              </li>
              <li>
                <strong>T:</strong> Transformer.
              </li>
              <li>
                <strong>F:</strong> Protective device (fuse, overload relay).
              </li>
              <li>
                <strong>W:</strong> Cable, conductor, busbar.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Control panel terminal identification">
            <p>
              Within control panels, every terminal must be uniquely identified and correspond
              exactly to the circuit diagrams and wiring schedules. This one-to-one relationship
              between drawing and physical installation is essential for fault diagnosis,
              modification and maintenance.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Terminal numbering:</strong> Sequential numbering within each terminal rail,
                matching the wiring diagram terminal schedule.
              </li>
              <li>
                <strong>Wire numbering:</strong> Every wire within the panel should carry a ferrule
                marker or wrap-around label with its circuit reference.
              </li>
              <li>
                <strong>Component labelling:</strong> Every component (contactor, relay, MCB, VSD)
                must carry a label matching its drawing reference designation.
              </li>
              <li>
                <strong>Drawing pockets:</strong> Panels should contain a pocket or holder for the
                current circuit diagrams — accessible without removing the panel door.
              </li>
            </ul>
          </ConceptBlock>

          <Scenario
            title="Cable misidentification"
            situation={
              <>
                In a reported industrial incident, a maintenance technician needed to disconnect a
                cable in a basement cable rack containing over 200 cables. No intermediate cable
                labels had been applied, and the cable schedule was out of date following several
                modifications.
              </>
            }
            whatToDo={
              <>
                The technician identified the cable by colour and position, but disconnected the
                wrong cable — a supply to a critical process system.
              </>
            }
            whyItMatters={
              <>
                The resulting unplanned shutdown cost the facility an estimated 100,000 pounds in
                lost production. Had the cables been correctly labelled at the cable rack access
                point, the correct cable could have been positively identified in seconds.
              </>
            }
          />

          <ConceptBlock title="Equipment nameplate information">
            <p>
              Equipment nameplates and rating plates are a form of identification that maintenance
              technicians rely on daily. Understanding what information they contain and where to
              find it is essential for safe and accurate maintenance work.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Motor nameplates:</strong> Rated voltage, full-load current, power factor,
                speed, frame size, insulation class, duty rating — essential for protective device
                selection and cable sizing.
              </li>
              <li>
                <strong>Switchgear ratings:</strong> Rated current, rated voltage, prospective fault
                level, IP rating, operating temperature range — critical for replacement
                specifications.
              </li>
              <li>
                <strong>Transformer nameplates:</strong> kVA rating, primary and secondary voltages,
                impedance percentage, vector group, cooling type — needed for fault calculations.
              </li>
              <li>
                <strong>Maintenance tip:</strong> If a nameplate is missing or illegible, record the
                equipment details from drawings, commissioning records, or the manufacturer's
                records before fitting a replacement label.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Key point">
            <p className="text-elec-yellow/70">
              A labelling system is only as good as its maintenance. Labels must be checked during
              every maintenance visit and replaced immediately if damaged, illegible or incorrect.
              An outdated label is worse than no label — it provides false information that could
              lead to dangerous errors.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Maintaining identification systems</ContentEyebrow>

          <ConceptBlock title="Maintaining Identification Systems">
            <p>
              Labelling and identification are not one-time installation tasks — they require
              ongoing maintenance. Labels degrade over time due to heat, UV exposure, chemicals and
              physical damage. Circuit charts become outdated when modifications are made but
              documentation is not updated. A commitment to maintaining the identification system is
              a hallmark of a well-managed installation.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Label maintenance checklist">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Check all labels for legibility during every maintenance visit.</li>
              <li>Replace degraded or damaged labels immediately.</li>
              <li>Verify circuit charts match the actual installation.</li>
              <li>Update documentation after every modification.</li>
              <li>Check all mandatory warning labels are present.</li>
              <li>Photograph label condition as part of maintenance records.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Digital documentation">
            <p>
              Modern maintenance practice increasingly uses digital tools for documentation: QR
              codes linking to digital circuit charts and cable schedules; CMMS (Computerised
              Maintenance Management Systems) with equipment databases referencing BS EN 81346
              designations; digital twins of installations for remote identification; and
              photographic records of label conditions. These tools supplement, but do not replace,
              the physical labels required at the point of access.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Label material selection guide">
            <p>
              Selecting the correct label material for the environment ensures labels remain legible
              and functional throughout the installation's life. The wrong material will degrade,
              losing its protective function.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Environment</th>
                    <th className="border border-white/10 px-3 py-2 text-left">
                      Recommended material
                    </th>
                    <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Indoor, clean, dry</td>
                    <td className="border border-white/10 px-3 py-2">
                      Laminated vinyl, engraved laminate
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Most economical; industrial label printers produce durable results
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Industrial (heat, oil)</td>
                    <td className="border border-white/10 px-3 py-2">
                      Engraved Traffolyte, stainless steel
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Resistant to chemicals, heat and physical damage
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Outdoor / UV exposed</td>
                    <td className="border border-white/10 px-3 py-2">
                      Anodised aluminium, UV-resistant laminate
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Standard vinyl fades rapidly in direct sunlight
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Corrosive / chemical</td>
                    <td className="border border-white/10 px-3 py-2">
                      Stainless steel, chemical-resistant polymer
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Must resist specific chemicals present in the environment
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Cable identification</td>
                    <td className="border border-white/10 px-3 py-2">
                      Heat-shrink markers, self-laminating wrap-around
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Heat-shrink for permanent; wrap-around for intermediate points
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Label audit process">
            <p>
              A systematic label audit during routine maintenance visits ensures that the
              identification system remains effective and compliant. This should be a standard part
              of every planned maintenance activity.
            </p>
            <ul className="list-decimal space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                Check all mandatory BS 7671 labels are present (circuit charts, voltage warnings,
                earthing notices, RCD test notices, dual supply warnings).
              </li>
              <li>
                Verify circuit chart accuracy — compare at least 3 random circuits against the
                physical installation.
              </li>
              <li>
                Inspect cable labels for legibility — replace any that are faded, damaged or
                peeling.
              </li>
              <li>
                Check equipment identification labels match current drawings and CMMS records.
              </li>
              <li>
                Record audit findings in the maintenance log, including any labels replaced and any
                discrepancies found.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Key point">
            <p className="text-elec-yellow/70">
              Documentation is a living system. Every modification, every label replacement, every
              circuit chart update must be recorded. An installation's documentation quality is a
              direct reflection of its maintenance quality.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Periodic inspection findings and compliance</ContentEyebrow>

          <ConceptBlock title="Periodic Inspection Findings and Compliance">
            <p>
              Labelling deficiencies are among the most frequently recorded findings during periodic
              inspection and testing (EICR). Missing circuit charts, absent warning labels,
              illegible cable identification and incorrect equipment labelling all constitute
              non-compliances that must be addressed. Understanding how inspectors assess labelling
              helps maintenance technicians maintain installations to the required standard between
              inspections.
            </p>
            <p>
              The severity of labelling deficiencies is assessed using the EICR coding system. A
              missing dual-supply warning where a generator is present would typically be classified
              as C2 (potentially dangerous — urgent remedial action required), because a technician
              who is unaware of the second supply could be fatally injured. A faded but still
              legible circuit chart might be classified as C3 (improvement recommended).
              Understanding this classification helps prioritise remedial work.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Common labelling defects found during inspection">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Missing circuit chart:</strong> No chart at distribution board — C2 if
                circuits cannot be safely identified.
              </li>
              <li>
                <strong>Inaccurate circuit chart:</strong> Chart does not reflect current
                installation — C2 or C3 depending on severity.
              </li>
              <li>
                <strong>Missing voltage warning:</strong> No 400 V label on three-phase enclosure —
                C2.
              </li>
              <li>
                <strong>Missing dual supply warning:</strong> Generator or alternative supply
                present without label — C2.
              </li>
              <li>
                <strong>Missing earthing/bonding label:</strong> No 'Safety Electrical Connection'
                labels — C3.
              </li>
              <li>
                <strong>Missing RCD test notice:</strong> No quarterly test reminder notice — C3.
              </li>
              <li>
                <strong>Missing mixed colours notice:</strong> Old and new colour codes present
                without warning — C3.
              </li>
              <li>
                <strong>Illegible cable labels:</strong> Cable identification unreadable — C3.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Proactive maintenance approach">
            <p>
              Rather than waiting for an inspector to identify labelling deficiencies, a proactive
              maintenance approach includes labelling checks in every routine inspection. A simple
              checklist — circuit chart accuracy, all mandatory warning labels present, cable
              identification legible, equipment labels matching drawings — takes minutes to complete
              but can prevent dangerous situations and avoid remedial costs after periodic
              inspection. Many organisations now include label condition photography in their
              maintenance records, creating a visual audit trail.
            </p>
          </ConceptBlock>

          <ConceptBlock title="EICR labelling deficiency classification">
            <p>
              Inspectors classify labelling deficiencies using the EICR coding system. Understanding
              these classifications helps maintenance technicians prioritise remedial work and
              maintain installations between periodic inspections.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Deficiency</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Typical code</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Action required</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">
                      Missing circuit chart — circuits unidentifiable
                    </td>
                    <td className="border border-white/10 px-3 py-2">C2</td>
                    <td className="border border-white/10 px-3 py-2">
                      Urgent remedial action required
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">
                      Missing dual supply warning
                    </td>
                    <td className="border border-white/10 px-3 py-2">C2</td>
                    <td className="border border-white/10 px-3 py-2">
                      Urgent — potentially dangerous
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">
                      Missing voltage warning (400 V)
                    </td>
                    <td className="border border-white/10 px-3 py-2">C2</td>
                    <td className="border border-white/10 px-3 py-2">
                      Urgent — risk of electric shock
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">
                      Circuit chart inaccurate (minor)
                    </td>
                    <td className="border border-white/10 px-3 py-2">C3</td>
                    <td className="border border-white/10 px-3 py-2">Improvement recommended</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">
                      Missing earthing/bonding label
                    </td>
                    <td className="border border-white/10 px-3 py-2">C3</td>
                    <td className="border border-white/10 px-3 py-2">Improvement recommended</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Missing RCD test notice</td>
                    <td className="border border-white/10 px-3 py-2">C3</td>
                    <td className="border border-white/10 px-3 py-2">Improvement recommended</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Note">
            <p className="italic">
              Under ST1426, maintenance technicians must maintain accurate records and ensure
              installation documentation remains current. This includes circuit charts, cable
              schedules, equipment registers and all labelling systems. Record-keeping is assessed
              as part of the end-point assessment portfolio evidence.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'BS 7671 mandatory labels: circuit chart at every DB (Reg 514.9); voltage warning where >230 V (Reg 514.10); RCD test notice (Reg 514.12); earthing/bonding labels (Reg 514.13); mixed colours warning (Reg 514.14); dual/alternative supply (Reg 514.15).',
              'Key standards: BS EN 81346 (equipment reference designations), BS EN ISO 7010 (safety sign symbols).',
              'Safety sign colours: red (prohibition/fire), yellow (warning), blue (mandatory), green (safe condition).',
              'Cable labels belong at origin, destination and every accessible intermediate point.',
              'Update circuit charts immediately after every modification — never leave it for later.',
              'Replace illegible labels as soon as they are found during maintenance — an outdated label is worse than no label.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module3-section3-4')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Trunking, Conduits and Cable Management
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module3-section4-1')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  General Lighting Circuits
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule3Section3_5;
