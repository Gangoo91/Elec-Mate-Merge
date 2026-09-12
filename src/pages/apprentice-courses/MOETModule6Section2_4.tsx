/**
 * MOET · Module 6 · Section 2 · Subsection 4 — Labelling and Numbering
 * Standards
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option.
 *
 * KSBs covered: no verified ST1426 KSB statement list for Module 6 was
 * available at conversion time (Modules 1–4 have verified lists; Module 6
 * does not). Rather than invent statements or borrow another module's list,
 * this header omits specific KSB quotes. Flagged for follow-up once a
 * verified Module 6 KSB list exists.
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
  ContentEyebrow,
  SectionRule,
  AppendixTable,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Labelling and Numbering Standards - MOET Module 6 Section 2.4';
const DESCRIPTION =
  'Component labelling conventions, wire numbering systems, terminal identification, cable marking standards, BS EN 81346 and IEC 60750 for electrical maintenance technicians.';

const quickCheckQuestions = [
  {
    id: 'label-purpose-check',
    question:
      'What is the primary purpose of a standardised labelling system in an electrical installation?',
    options: [
      'To improve the visual appearance of the panel for the client',
      'To reduce the amount of cable required during installation',
      'To increase the current-carrying capacity of the conductors',
      'To enable any competent technician to identify components, circuits and connections unambiguously, reducing error risk during maintenance',
    ],
    correctIndex: 3,
    explanation:
      'Standardised labelling ensures that any competent technician can positively identify components, circuits, wires and terminals without ambiguity. This is critical for safety — incorrect identification during maintenance could mean working on the wrong circuit, leading to electric shock or equipment damage.',
  },
  {
    id: 'wire-numbering-check',
    question:
      'In a control panel, wire 24 is found at terminal strip TS3 terminal 7. Another end of the same wire connects to contactor KM1 terminal A1. What stays constant along the entire wire length?',
    options: [
      'The terminal number (7) — it is the same at every device the wire reaches',
      'The component designation (KM1) — it is marked at both ends of the wire',
      'The conductor colour — it must change at each terminal it passes through',
      'The wire number (24) — it is the same at both ends and everywhere along the wire',
    ],
    correctIndex: 3,
    explanation:
      'A wire number identifies a unique electrical point (node) in the circuit. The same wire number appears at every termination point of that wire. This allows technicians to trace continuity through the installation — if wire 24 is disconnected from terminal A1 of KM1, you know it must be reconnected to the same terminal, not elsewhere.',
  },
  {
    id: 'bs-en-81346-check',
    question: "Under BS EN 81346, the prefix letter 'Q' designates which type of component?",
    options: [
      'A switching device for power circuits, such as a circuit breaker or isolator',
      'A contactor or relay used in a control circuit',
      'A measuring instrument such as an ammeter or voltmeter',
      'A motor providing rotary mechanical drive',
    ],
    correctIndex: 0,
    explanation:
      "BS EN 81346 (replacing the older BS 3939 letter codes) assigns 'Q' to switching devices in power circuits — circuit breakers, isolators, disconnectors and similar devices. 'K' is used for relays and contactors, 'R' for resistors, and 'P' for measuring instruments.",
  },
  {
    id: 'cable-marking-check',
    question:
      'Which standard governs cable identification and marking in UK electrical installations?',
    options: [
      'IEC 60617 (Graphical symbols for diagrams) only',
      'BS EN 62491 (Cable and core identification) together with BS 7671 requirements for conductor identification',
      'BS EN 81346 (Reference designations) on its own',
      'BS 5839 (Fire detection and alarm systems) for all cabling',
    ],
    correctIndex: 1,
    explanation:
      'BS EN 62491 provides the standard for cable and core identification marking. BS 7671 (Chapter 51, Regulation 514) sets requirements for conductor identification by colour and labelling. Together, these ensure consistent cable marking across UK installations.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which BS EN standard provides the reference designation system for industrial components (replacing the older letter code systems)?',
    options: ['IEC 60617', 'BS EN 81346', 'BS EN 62491', 'BS EN 61082'],
    correctAnswer: 1,
    explanation:
      "BS EN 81346 'Industrial systems, installations and equipment and industrial products — Structuring principles and reference designations' provides the standardised system for designating components. It replaced the older DIN 40719 and BS 3939 letter code systems.",
  },
  {
    id: 2,
    question: "In the designation KM3, what does the 'K' represent?",
    options: ['A motor', 'A circuit breaker', 'A contactor or relay', 'A transformer'],
    correctAnswer: 2,
    explanation:
      "Under BS EN 81346, the letter 'K' designates contactors and relays. 'M' stands for motor, 'Q' for switching device (circuit breaker/isolator), and 'T' for transformer. KM3 therefore identifies the third contactor in the system.",
  },
  {
    id: 3,
    question:
      "A wire numbered '415' appears on a wiring diagram at four different terminal points. This means:",
    options: [
      'There are four separate wires that have been numbered incorrectly',
      'The wire is 415 mm long between its first and last terminations',
      'The wire carries 415 V and must be treated as a three-phase conductor',
      'All four termination points are at the same electrical potential — they are all on the same node in the circuit',
    ],
    correctAnswer: 3,
    explanation:
      'A wire number identifies an electrical node. Every termination point sharing the same wire number is at the same electrical potential in the circuit. This is fundamental to wire numbering systems — the number follows the electrical potential, not the physical wire.',
  },
  {
    id: 4,
    question: 'Terminal strips in a control panel are typically labelled with:',
    options: [
      'A sequential terminal strip designator (e.g., X1, X2) followed by individual terminal numbers',
      'The name of the electrician who terminated each conductor',
      'The cable colour code used for each conductor in the strip',
      'The rated current of the protective device feeding that terminal',
    ],
    correctAnswer: 0,
    explanation:
      'Terminal strips use a designator (commonly X1, X2, X3, etc.) followed by sequential terminal numbers. For example, X1:7 means terminal strip X1, terminal number 7. This unambiguous identification is essential for maintenance and fault-finding.',
  },
  {
    id: 5,
    question:
      'According to BS 7671 Regulation 514.8, every circuit at the distribution board must be provided with:',
    options: [
      'A dedicated residual current device for each individual circuit',
      'A durable label or marking identifying its purpose',
      'A separate isolating switch mounted next to the consumer unit',
      'A printed test certificate fixed inside the distribution board',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 514.8 requires that every circuit be identified with a durable label at the distribution board. The label must indicate the circuit purpose and be arranged so that the identification is clear. This is a fundamental requirement for safe maintenance.',
  },
  {
    id: 6,
    question: 'Cable identification ferrules are typically fitted:',
    options: [
      'Only at the supply end of a cable to save on materials',
      'At the midpoint of each cable run, away from the terminations',
      'At each end of every wire or conductor, close to the termination point',
      'Only on power conductors, never on control or signal wires',
    ],
    correctAnswer: 2,
    explanation:
      'Cable ferrules (also called wire markers or end sleeves) are fitted at both ends of each conductor, close to the termination. This allows a technician to identify the wire at either end without needing to trace the full length — essential in complex panels with hundreds of wires.',
  },
  {
    id: 7,
    question: "In a motor control centre, the designation '-Q1' on a device indicates:",
    options: [
      'The first motor connected to the control centre',
      'The first terminal strip within the panel',
      'The first indicator lamp on the panel door',
      'The main switching device (e.g., MCCB or isolator) for that motor feeder',
    ],
    correctAnswer: 3,
    explanation:
      "The 'Q' prefix designates a switching device for power circuits. '-Q1' typically refers to the main circuit breaker or isolator in a motor feeder. This standardised naming means maintenance technicians across different sites can immediately identify the device function.",
  },
  {
    id: 8,
    question: "What is the purpose of a 'cable schedule' in an electrical installation?",
    options: [
      'To provide a comprehensive list linking cable references to their routes, sizes, types, origins and destinations',
      'To set out the planned dates for installing each cable on site',
      'To record the results of insulation resistance tests on each cable',
      'To list the spare cable lengths held in the stores for future use',
    ],
    correctAnswer: 0,
    explanation:
      'A cable schedule is a document that lists every cable in the installation with its unique reference, type, size, number of cores, origin, destination, route, and sometimes length. It is an essential maintenance document that links the physical cable to the drawings.',
  },
  {
    id: 9,
    question:
      'When a maintenance technician discovers that a label is missing or illegible, the correct action is to:',
    options: [
      'Ignore it, as labelling is not part of the maintenance role',
      'Report it, arrange for a replacement label to be fitted, and update the records',
      'Isolate the whole installation until the original installer can return',
      'Mark the device with a temporary pen note and take no further action',
    ],
    correctAnswer: 1,
    explanation:
      'Missing or illegible labels are a safety hazard — they could lead to working on the wrong circuit. The correct action is to report the deficiency, fit a replacement label using the approved labelling system, and update any maintenance records or drawings to reflect the correction.',
  },
  {
    id: 10,
    question: 'The colour coding of three-phase conductors in the UK under BS 7671 is:',
    options: [
      'Red (L1), yellow (L2), blue (L3)',
      'Brown (L1), blue (L2), grey (L3)',
      'Brown (L1), black (L2), grey (L3)',
      'Black (L1), grey (L2), brown (L3)',
    ],
    correctAnswer: 2,
    explanation:
      'Since the harmonisation to IEC standards adopted in BS 7671:2008 onwards, UK three-phase conductor colours are brown (L1), black (L2) and grey (L3). The older red, yellow, blue system may still be found in existing installations and must be identified accordingly.',
  },
  {
    id: 11,
    question: 'In a PLC-based control system, I/O addresses such as I0.3 and Q2.1 serve as:',
    options: [
      'The physical terminal numbers on the panel terminal strips',
      'The cable references used in the project cable schedule',
      'The wire numbers identifying electrical nodes in the circuit',
      'Unique labels identifying specific input and output points, linking the field device wiring to the PLC programme',
    ],
    correctAnswer: 3,
    explanation:
      'PLC I/O addresses are the labelling system that connects physical wiring to the control programme. I0.3 identifies input byte 0, bit 3; Q2.1 identifies output byte 2, bit 1. These addresses appear on wiring diagrams, the PLC programme, and the field device labels, providing full traceability.',
  },
  {
    id: 12,
    question: 'Engraved phenolic labels are preferred over adhesive labels in switchgear because:',
    options: [
      'They are durable, heat-resistant, and will not fall off or become illegible over the life of the installation',
      'They are cheaper and quicker to produce than printed adhesive labels',
      'They can be re-positioned easily whenever the circuit changes',
      'They glow in the dark, making them readable during a power failure',
    ],
    correctAnswer: 0,
    explanation:
      'Engraved phenolic (Traffolyte) labels are the industry standard for switchgear identification because they withstand heat, cleaning chemicals, UV light and mechanical wear without becoming illegible. Adhesive labels may peel, fade, or melt in the environment around switchgear, making them unreliable for long-term identification.',
  },
];

const faqs = [
  {
    question: 'What is the difference between a wire number and a cable reference?',
    answer:
      'A wire number identifies a single electrical node (point of equal potential) within a circuit. Every connection at that node shares the same wire number. A cable reference identifies a physical multicore cable — a cable may contain many individually numbered wires. For example, cable C45 might contain wires 201, 202, 203, and E. The cable reference appears on cable schedules and route drawings; wire numbers appear on schematic and wiring diagrams.',
  },
  {
    question: 'Do I need to know BS EN 81346 for the ST1426 end-point assessment?',
    answer:
      'You need to understand the principles of component designation and labelling systems rather than memorise every letter code. The key requirement is that you can read and interpret labels on drawings and equipment, understand what they mean, and apply consistent labelling when carrying out work. Familiarity with common designations (K for contactors, Q for circuit breakers, M for motors, F for fuses) is expected.',
  },
  {
    question:
      'What should I do if labels in an existing installation use the old colour code system?',
    answer:
      'Many existing installations still use the old UK colour codes (red/yellow/blue for three-phase, red/black for single-phase). These are perfectly legal for existing installations. However, when carrying out additions or alterations, the new harmonised colours (brown/black/grey for three-phase, brown/blue for single-phase) must be used, and a warning label must be fitted at the distribution board indicating that two colour systems are present. BS 7671 Regulation 514.14 covers this requirement.',
  },
  {
    question: 'How do I label circuits in a domestic consumer unit?',
    answer:
      "BS 7671 Regulation 514.8 requires that every circuit in a consumer unit be identified with a durable label. Best practice is to use the chart provided inside the consumer unit cover or door, clearly stating the circuit number, protective device rating, circuit purpose (e.g., 'Ring — Ground Floor Sockets', 'Radial — Cooker'), and the cable size. Labels should be legible, durable, and secured so they remain in place throughout the life of the installation.",
  },
  {
    question: 'What is a ferrule in the context of wire identification?',
    answer:
      'A ferrule is a small sleeve, typically made of PVC or nylon, that slides over the end of a wire and displays the wire number. Ferrules are printed or engraved with the wire number and are fitted close to each termination point. In modern installations, heat-shrink markers and printed wrap-around labels serve the same purpose. The key requirement is that the identification is durable, legible, and positioned where it can be read during maintenance.',
  },
];

const MOETModule6Section2_4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 6 · Section 6.2 · Subsection 4"
        title="Labelling and Numbering Standards"
        backTo="/study-centre/apprentice/m-o-e-t-module6-section2"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Component designation, wire numbering and identification systems for electrical
            maintenance.
          </p>

          <TLDR
            points={[
              'Labels: Unambiguous identification of every component, cable and circuit.',
              'Wire numbers: Identify electrical nodes — same number at every connection point on that node.',
              'Standards: BS EN 81346 for component designation, BS EN 62491 for cable marking.',
              'BS 7671: Regulation 514 covers conductor and circuit identification requirements.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain the purpose and importance of standardised labelling systems',
              'Interpret component designations using BS EN 81346 letter codes',
              'Describe wire numbering systems and their relationship to circuit nodes',
              'Apply terminal strip identification conventions in control panels',
              'Identify cable marking requirements under BS EN 62491 and BS 7671',
              'Maintain and replace labels during routine maintenance activities',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock title="Maintenance context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Fault-finding:</strong> Correct labels enable rapid circuit tracing
              </li>
              <li>
                <strong>Safety:</strong> Wrong identification = working on the wrong circuit
              </li>
              <li>
                <strong>Compliance:</strong> Labelling deficiencies are common C2 observations on
                EICR
              </li>
              <li>
                <strong>ST1426:</strong> Maps to documentation and technical drawing KSBs
              </li>
            </ul>
          </ConceptBlock>

          <ContentEyebrow>Why labelling and numbering matter</ContentEyebrow>

          <ConceptBlock title="Why Labelling and Numbering Matter">
            <p>
              Every electrical installation — from a domestic consumer unit to an industrial motor
              control centre — relies on labelling to ensure that maintenance, fault-finding and
              modifications can be carried out safely and efficiently. Labels are not an
              afterthought; they are a fundamental safety feature of the installation.
            </p>
            <p>
              Without correct, legible labels, a maintenance technician may isolate the wrong
              circuit, disconnect the wrong wire, or test the wrong component. In high-voltage
              environments, such errors can be fatal. Even in low-voltage installations, incorrect
              identification leads to wasted time, incorrect repairs, and potentially dangerous
              situations.
            </p>
          </ConceptBlock>

          <ConceptBlock title="The Labelling Chain">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Design drawings:</strong> Components, cables and circuits are designated
                during the design phase
              </li>
              <li>
                <strong>Panel build:</strong> Components are physically labelled to match the
                drawings during manufacture
              </li>
              <li>
                <strong>Site installation:</strong> Cables are labelled at both ends, circuits
                identified at distribution boards
              </li>
              <li>
                <strong>Commissioning:</strong> Labels are verified against drawings and corrected
                if necessary
              </li>
              <li>
                <strong>Maintenance:</strong> Technicians rely on labels for safe identification
                throughout the installation life
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Regulatory Requirement">
            <p>
              BS 7671 Regulation 514.1.1 states that identification labels shall be durable and
              legible. Regulation 514.8.1 requires that every distribution board circuit be
              identified with a durable label. Failure to provide adequate labelling is a
              non-compliance that will be recorded on an Electrical Installation Condition Report
              (EICR) — often as a C3 (improvement recommended) or C2 (potentially dangerous)
              observation if the absence of labels could lead to incorrect identification of
              circuits.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Key point">
            <p>
              Labelling is not optional. It is a regulatory requirement under BS 7671 and a
              fundamental safety measure. The maintenance technician has a responsibility to
              maintain, replace, and report missing or illegible labels during every site visit.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Component designation systems (BS EN 81346)</ContentEyebrow>

          <ConceptBlock title="Component Designation Systems (BS EN 81346)">
            <p>
              BS EN 81346 provides the international standard for structuring and designating
              components within industrial systems. It replaces older national standards and
              provides a consistent framework used across Europe and increasingly worldwide. For
              maintenance technicians, understanding these designations is essential for reading
              drawings and identifying components on site.
            </p>
          </ConceptBlock>

          <AppendixTable
            caption="Common Component Designation Letters"
            headers={['Letter', 'Component Type', 'Examples']}
            rows={[
              ['K', 'Contactors and relays', 'KM1 (contactor 1), KA3 (auxiliary relay 3)'],
              ['Q', 'Switching devices (power circuits)', 'Q1 (isolator), QF2 (circuit breaker 2)'],
              ['F', 'Protective devices', 'F1 (fuse 1), FA1 (overload relay 1)'],
              ['M', 'Motors', 'M1 (motor 1), M2 (motor 2)'],
              ['T', 'Transformers', 'T1 (transformer 1)'],
              ['S', 'Switches (control circuits)', 'S1 (push button 1), SA1 (selector switch 1)'],
              ['H', 'Signalling devices', 'H1 (indicator lamp 1), HA1 (alarm horn 1)'],
              [
                'X',
                'Terminal strips and connectors',
                'X1 (terminal strip 1), XP1 (plug connector 1)',
              ],
              ['R', 'Resistors', 'R1 (resistor 1), RV1 (variable resistor 1)'],
              ['P', 'Measuring instruments', 'P1 (ammeter), PV1 (voltmeter)'],
            ]}
          />

          <ConceptBlock title="Hierarchical Designation">
            <p>
              BS EN 81346 uses a hierarchical structure to locate components within a system. A full
              designation might read:
            </p>
            <p className="rounded bg-white/5 p-2 font-mono">=MCC1+DR3-KM1</p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>=MCC1:</strong> System level — Motor Control Centre 1
              </li>
              <li>
                <strong>+DR3:</strong> Location level — Drawer 3
              </li>
              <li>
                <strong>-KM1:</strong> Component level — Contactor 1
              </li>
            </ul>
            <p>
              This structured approach means a technician can navigate from the system level down to
              the specific component, even in a facility with hundreds of similar devices.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Practical tip">
            <p>
              When you encounter a designation on site that you do not recognise, always
              cross-reference it with the as-built drawings. Do not guess — incorrect identification
              of components is a common cause of maintenance errors.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Wire numbering systems</ContentEyebrow>

          <ConceptBlock title="Wire Numbering Systems">
            <p>
              Wire numbering is arguably the most critical labelling system in a control panel or
              complex installation. Every wire in a control circuit is assigned a unique number that
              identifies the electrical node it belongs to. This number stays the same at every
              termination point along the wire, allowing technicians to trace circuits and verify
              correct connections during maintenance.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Wire Numbering Principles">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Node-based:</strong> A wire number identifies an electrical node (point of
                equal potential), not a physical wire
              </li>
              <li>
                <strong>Consistent:</strong> The same number appears at every termination point on
                that node — the wire number does not change when it passes through a terminal strip
              </li>
              <li>
                <strong>Unique:</strong> Each node has a unique number within the circuit or panel
              </li>
              <li>
                <strong>Sequential:</strong> Numbers are typically assigned sequentially, often
                grouped by circuit function (e.g., 100-series for control, 200-series for
                interlocks)
              </li>
              <li>
                <strong>Physically marked:</strong> Wire ferrules or labels display the number at
                each end of every wire
              </li>
            </ul>
          </ConceptBlock>

          <AppendixTable
            caption="Common Numbering Conventions"
            headers={['Number Range', 'Typical Use']}
            rows={[
              ['1-99', 'Power circuit connections (L1, L2, L3, N, E)'],
              ['100-199', 'Control circuit — main control functions'],
              ['200-299', 'Interlock and safety circuits'],
              ['300-399', 'Indication and alarm circuits'],
              ['400-499', 'Analogue signal circuits (4-20 mA, 0-10 V)'],
            ]}
            notes="Note: These ranges are conventional, not mandatory. Always refer to the project-specific numbering schedule."
          />

          <ConceptBlock title="When Wire Numbers Change">
            <p>
              A wire number changes when the electrical potential changes — i.e., when the wire
              passes through a component that changes its state or voltage. For example, on one side
              of a contactor coil the wire number might be 101; on the other side it will be a
              different number (e.g., 102) because the electrical potential is different. Through a
              terminal strip (which does not change the electrical state), the wire number stays the
              same.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Maintenance tip">
            <p>
              Before disconnecting any wire during maintenance, always note the wire number on both
              the wire ferrule and the drawing. When reconnecting, verify the wire number matches
              the drawing. This simple discipline prevents the vast majority of reconnection errors.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Terminal strip and cable identification</ContentEyebrow>

          <ConceptBlock title="Terminal Strip and Cable Identification">
            <p>
              Terminal strips are the interface between internal panel wiring and external field
              cables. They provide a structured, accessible point for testing, disconnection and
              reconnection. Correct identification of terminal strips and the cables connected to
              them is essential for efficient and safe maintenance.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Terminal Strip Conventions">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Designation:</strong> Terminal strips are labelled X1, X2, X3, etc. (using
                the 'X' prefix from BS EN 81346)
              </li>
              <li>
                <strong>Terminal numbers:</strong> Individual terminals are numbered sequentially:
                X1:1, X1:2, X1:3, etc.
              </li>
              <li>
                <strong>Grouping:</strong> Terminals are often grouped by circuit function — power,
                control, earth, spare
              </li>
              <li>
                <strong>Marking:</strong> Each terminal position has a permanent label strip showing
                the terminal number
              </li>
              <li>
                <strong>Separation:</strong> Earth terminals are typically on a separate rail, often
                identified with green/yellow marking
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Cable Identification (BS EN 62491)">
            <p>
              BS EN 62491 establishes the requirements for cable and core identification. Key
              requirements include:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Unique cable reference:</strong> Every cable has a unique alphanumeric
                designation (e.g., C001, MC-45)
              </li>
              <li>
                <strong>Both ends marked:</strong> Cable labels must be fitted at both origin and
                destination
              </li>
              <li>
                <strong>Core identification:</strong> Individual cores are identified by colour
                coding (per BS 7671) and additionally by ferrules where multiple cables terminate on
                the same equipment
              </li>
              <li>
                <strong>Durability:</strong> Labels must be resistant to the environment — heat,
                moisture, UV, chemicals
              </li>
              <li>
                <strong>Legibility:</strong> Text size and contrast must allow reading under normal
                maintenance conditions
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Conductor Colour Identification (BS 7671)">
            <p>
              The current and historical conductor colour codes used in UK installations are set out
              below.
            </p>
          </ConceptBlock>

          <AppendixTable
            caption="Conductor Colour Identification (BS 7671)"
            headers={['Conductor', 'Current (Harmonised)', 'Old UK']}
            rows={[
              ['Line (single phase)', 'Brown', 'Red'],
              ['Neutral', 'Blue', 'Black'],
              ['L1 (three phase)', 'Brown', 'Red'],
              ['L2 (three phase)', 'Black', 'Yellow'],
              ['L3 (three phase)', 'Grey', 'Blue'],
              ['Earth (CPC)', 'Green/yellow', 'Green/yellow'],
            ]}
          />

          <ConceptBlock title="Important">
            <p>
              When both old and new colour systems are present in the same installation, a warning
              label must be fitted at the distribution board (BS 7671 Regulation 514.14). This
              situation is very common in maintenance work on existing buildings.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Maintaining labels in practice</ContentEyebrow>

          <ConceptBlock title="Maintaining Labels in Practice">
            <p>
              As a maintenance technician, you will encounter labelling issues on almost every site.
              Labels fade, fall off, or were never fitted in the first place. Part of your
              professional responsibility is to maintain the labelling system as part of routine
              maintenance activities.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Label Maintenance Checklist">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Visual check:</strong> During every maintenance visit, check that labels are
                present, legible, and correctly positioned
              </li>
              <li>
                <strong>Record deficiencies:</strong> Note missing or illegible labels in the
                maintenance report or job card
              </li>
              <li>
                <strong>Replace immediately:</strong> Where possible, replace damaged labels during
                the visit rather than leaving it for another time
              </li>
              <li>
                <strong>Use correct materials:</strong> Replace labels with the same type and
                quality — engraved phenolic for switchgear, printed ferrules for wire ends
              </li>
              <li>
                <strong>Update records:</strong> If any labels are replaced or corrected, update the
                as-built drawings and cable schedules accordingly
              </li>
              <li>
                <strong>Verify accuracy:</strong> When replacing a label, verify the information is
                correct by cross-referencing with drawings — do not simply copy a faded label that
                might itself have been wrong
              </li>
            </ul>
          </ConceptBlock>

          <AppendixTable
            caption="Label Types and Applications"
            headers={['Label Type', 'Application', 'Durability']}
            rows={[
              [
                'Engraved phenolic (Traffolyte)',
                'Switchgear, distribution boards, control panels',
                'Excellent — 25+ years',
              ],
              [
                'Printed ferrules',
                'Wire identification at termination points',
                'Good — 10-15 years inside panels',
              ],
              [
                'Heat-shrink markers',
                'Cable identification, harsh environments',
                'Excellent — moisture and chemical resistant',
              ],
              [
                'Wrap-around labels',
                'Cable identification at terminations and along routes',
                'Good — self-laminating types best',
              ],
              [
                'Adhesive labels (printed)',
                'Circuit charts, temporary identification',
                'Fair — may peel in heat or moisture',
              ],
            ]}
          />

          <ConceptBlock title="Common Labelling Defects">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Missing circuit chart at distribution board</li>
              <li>Faded or illegible cable labels in plant rooms</li>
              <li>Wire ferrules missing inside control panels</li>
              <li>Incorrect labels from previous modifications</li>
              <li>No dual-colour warning label on mixed installations</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Best Practice Actions">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Carry a portable label printer on maintenance visits</li>
              <li>Photograph labels before and after replacement</li>
              <li>Use the client's labelling convention, not your own</li>
              <li>Report systemic labelling failures to the responsible person</li>
              <li>Include labelling checks in maintenance checklists</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="ST1426 link">
            <p>
              The maintenance technician standard requires competence in maintaining documentation
              and records. Labelling maintenance is a direct practical application of this
              requirement — keeping the physical installation aligned with its documentation.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'Labelling is not optional — it is a regulatory requirement under BS 7671 and a fundamental safety measure.',
              'BS EN 81346 designates components with letter codes (K contactors/relays, Q switching devices, F protective devices, M motors, T transformers, S switches, H signalling devices, X terminal strips, R resistors, P measuring instruments).',
              'A wire number identifies an electrical node — it stays the same at every termination point on that node, and only changes where the electrical potential changes.',
              'Terminal strips use a designator (X1, X2…) plus sequential terminal numbers; cable identification follows BS EN 62491.',
              'Conductor colours: brown/black/grey (harmonised three phase) or brown/blue (single phase), with green/yellow for earth. Mixed old and new colour systems require a warning label per Regulation 514.14.',
              'Maintaining labels — checking, recording, replacing and updating records — is a routine part of the maintenance technician role.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module6-section2-3')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Piping and Instrumentation Diagrams (P&ID)
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module6-section3-1')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Recording Work Completed
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule6Section2_4;
