/**
 * MOET · Module 6 · Section 2 · Subsection 2 — Wiring Diagrams
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
  VideoCard,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Wiring Diagrams - MOET Module 6 Section 2.2';
const DESCRIPTION =
  'Interpreting wiring diagrams for electrical maintenance: single-line diagrams, power distribution schematics, switchgear representation, load schedules, network diagrams and cable interconnection drawings under BS EN 61082 and ST1426.';

const quickCheckQuestions = [
  {
    id: 'sld-purpose-check',
    question: 'What is the primary purpose of a single-line diagram (SLD)?',
    options: [
      'To provide a simplified overview of the power distribution system, showing the main equipment and connections using single lines to represent three-phase circuits',
      'To show every individual conductor and terminal connection within a single control panel',
      'To record the physical route of each cable through trunking and tray across the site',
      'To list the test results from periodic inspection of the installation',
    ],
    correctIndex: 0,
    explanation:
      'A single-line diagram simplifies the representation of a power distribution system by using a single line to represent a three-phase (or multi-wire) circuit. This provides a clear overview of the entire distribution architecture — from the incoming supply through transformers, switchgear, and distribution boards to the final loads.',
  },
  {
    id: 'wiring-vs-circuit-check',
    question:
      'What is the key difference between a wiring diagram and a circuit (schematic) diagram?',
    options: [
      'A wiring diagram shows the logical function while a circuit diagram shows physical terminals',
      'A wiring diagram covers only power circuits while a circuit diagram covers only control circuits',
      'A wiring diagram shows physical connections with terminal numbers and wire references; a circuit diagram shows the logical function and operation of the circuit',
      'A wiring diagram is drawn to scale while a circuit diagram never uses standard symbols',
    ],
    correctIndex: 2,
    explanation:
      'A circuit diagram shows how the circuit functions logically — the relationship between components in terms of operation. A wiring diagram shows how to physically build or maintain the circuit — which wire goes to which terminal, including terminal numbers, wire references, and often cable routes.',
  },
  {
    id: 'load-schedule-check',
    question: 'What information does a load schedule provide alongside a single-line diagram?',
    options: [
      'A tabulated list of all connected loads showing their ratings, circuit references, cable sizes, and protective device details',
      'A scaled drawing of the physical layout of every cable tray across the building',
      'A graphical representation of the switchgear symbols defined in IEC 60617',
      'A record of the periodic inspection and test results for the installation',
    ],
    correctIndex: 0,
    explanation:
      'A load schedule is a companion document to the SLD that lists every connected load with details including: circuit reference, description, rated power, design current, cable type and size, protective device type and rating, and the distribution board it is connected to.',
  },
  {
    id: 'interconnection-drawing-check',
    question: 'An interconnection wiring diagram is used to show:',
    options: [
      'The prospective fault current available at the origin of the installation',
      'The internal wiring within a single control panel only',
      'The simplified single-line overview of the whole distribution system',
      'The cable connections between separate items of equipment, showing terminal references at both ends',
    ],
    correctIndex: 3,
    explanation:
      'An interconnection (or inter-wiring) diagram shows the cabling between separate items of equipment — for example, between a motor control centre and a field motor, or between a control panel and its remote sensors. It identifies the cable type, core identification, and terminal references at both ends.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'A single-line diagram uses one line to represent:',
    options: [
      'Only the line conductor, with neutral and earth shown separately',
      'All conductors of a circuit (including three-phase and neutral), simplifying the diagram',
      'A single radial final circuit feeding one item of equipment',
      'The physical route taken by the cable between two points',
    ],
    correctAnswer: 1,
    explanation:
      "The 'single line' represents all the conductors of a circuit — L1, L2, L3, and sometimes N and PE — as one line. Short diagonal strokes or numbers on the line may indicate the number of conductors. This simplification allows the entire distribution system to be shown on one or two sheets.",
  },
  {
    id: 2,
    question: 'On a single-line diagram, a transformer is typically shown as:',
    options: [
      'A single circle containing a cross, labelled only with its kVA rating',
      'A rectangle divided into three sections representing the three phases',
      'Two circles (or coils) with a core symbol between them, labelled with voltage ratio and rating',
      'A triangle pointing downward, labelled with the secondary voltage',
    ],
    correctAnswer: 2,
    explanation:
      'Transformers on SLDs are shown using the standard symbol of two coils (primary and secondary) with a core. The voltage ratio (e.g., 11 kV/415 V), rated power (kVA or MVA), vector group, and impedance percentage are typically labelled.',
  },
  {
    id: 3,
    question: 'The hierarchy of a typical industrial power distribution system shown on an SLD is:',
    options: [
      'Loads → final circuits → incoming supply → main switchboard → sub-distribution boards',
      'Main switchboard → incoming supply → loads → sub-distribution boards → final circuits',
      'Final circuits → loads → main switchboard → incoming supply → sub-distribution boards',
      'Incoming supply → main switchboard → sub-distribution boards → final circuits → loads',
    ],
    correctAnswer: 3,
    explanation:
      'SLDs follow a hierarchical layout: the incoming supply (utility or generator) at the top, flowing down through the main switchboard, sub-distribution boards, and final circuits to individual loads. This hierarchy reflects the actual distribution architecture and protection coordination.',
  },
  {
    id: 4,
    question: 'Short diagonal strokes across a single line on an SLD indicate:',
    options: [
      'The number of conductors in the circuit (e.g., three strokes for three-phase)',
      'The rated current of the cable in that section of the circuit',
      'The presence of a transformer between two sections of the system',
      'The point where a cable changes from one installation method to another',
    ],
    correctAnswer: 0,
    explanation:
      'Short diagonal strokes (or a number) across the single line indicate the number of conductors. Three strokes indicate three conductors (three-phase without neutral); four strokes indicate three-phase plus neutral. This convention clarifies the circuit configuration at a glance.',
  },
  {
    id: 5,
    question: 'Wire numbering (ferrule marking) on control circuit wires serves to:',
    options: [
      'Indicate the current-carrying capacity of each wire in the loom',
      'Uniquely identify every wire so it can be traced between its origin and destination terminals',
      'Show the cross-sectional area of the conductor in square millimetres',
      'Mark the voltage rating of the insulation on each control wire',
    ],
    correctAnswer: 1,
    explanation:
      'Each wire in a control circuit is given a unique number (marked on ferrules at each end). This allows any wire to be traced from its origin terminal to its destination terminal, even in a complex cable loom with hundreds of wires. It is essential for fault-finding and reconnection after maintenance.',
  },
  {
    id: 6,
    question: 'A busbar on a single-line diagram is represented by:',
    options: [
      'A dashed line indicating an isolating link between two sections',
      'A zig-zag symbol showing the impedance of the supply cable',
      'A thick horizontal line (or bar) from which multiple circuits are fed',
      'A circle enclosing a cross marking the point of supply',
    ],
    correctAnswer: 2,
    explanation:
      'Busbars are represented as thick horizontal lines (or bars) with the connected circuits branching off vertically. The busbar is labelled with its voltage, rating, and reference designation. Circuit breakers or fuse switches are shown at each connection point.',
  },
  {
    id: 7,
    question: 'BS EN 61082 provides standards for:',
    options: [
      'The graphical symbols used on electrical diagrams and schematics',
      'The minimum current rating of busbars in low-voltage switchgear',
      'The reference designation system for items of equipment',
      'The preparation and presentation of documents used in electrotechnology, including wiring diagrams',
    ],
    correctAnswer: 3,
    explanation:
      'BS EN 61082 (Preparation of documents used in electrotechnology) provides the standard rules for preparing electrical documentation including single-line diagrams, circuit diagrams, wiring diagrams, and interconnection diagrams. Following this standard ensures consistency and readability.',
  },
  {
    id: 8,
    question: 'A standby generator shown on an SLD will typically include:',
    options: [
      'The generator symbol, automatic transfer switch (ATS), interlocking arrangements, and the circuits it supplies',
      'Only the generator symbol, with no indication of how it connects to the supply',
      'The full internal winding arrangement and excitation circuit of the alternator',
      'The fuel storage and delivery system feeding the generator set',
    ],
    correctAnswer: 0,
    explanation:
      'The generator arrangement on the SLD must show the generator with its rating, the automatic (or manual) transfer switch, mechanical and/or electrical interlocking to prevent parallel running with the mains (unless designed for it), and which circuits are designated as essential and supplied by the generator.',
  },
  {
    id: 9,
    question: 'What is the significance of fault levels shown on a single-line diagram?',
    options: [
      'They indicate the normal full-load current drawn by each circuit at that point',
      'They indicate the maximum prospective fault current at key points, which determines the required breaking capacity of protective devices',
      'They indicate the rated voltage of the busbar at each section of the board',
      'They indicate the earth fault loop impedance measured during periodic testing',
    ],
    correctAnswer: 1,
    explanation:
      'Fault levels (prospective short-circuit current in kA) shown at key points on the SLD determine the minimum breaking capacity required for circuit breakers and fuses at those points. If a protective device has insufficient breaking capacity for the available fault level, it cannot safely interrupt a fault — creating an explosion and fire risk.',
  },
  {
    id: 10,
    question:
      "When reading a utility company's single-line diagram, the 'point of common coupling' (PCC) refers to:",
    options: [
      'The point where the highest prospective fault current occurs on the network',
      'The location at which the main earthing terminal is connected to the supply',
      "The electrical point where the utility supply connects to the customer's installation",
      'The point at which the standby generator connects to the essential services board',
    ],
    correctAnswer: 2,
    explanation:
      "The PCC is the point where the electricity utility's network meets the customer's installation. It defines the boundary of responsibility and is where supply characteristics (voltage, fault level, power quality) are specified.",
  },
  {
    id: 11,
    question:
      'An interconnection diagram differs from an internal wiring diagram in that it shows:',
    options: [
      'The connections within a single panel, terminal by terminal',
      'The simplified single-line overview of the whole distribution system',
      'The graphical symbols for switchgear defined in IEC 60617',
      'The cabling between separate items of equipment, with terminal references at each end',
    ],
    correctAnswer: 3,
    explanation:
      'An internal wiring diagram shows connections within a single panel or equipment item. An interconnection diagram shows the cabling between separate items — for example, a control panel and its field devices, or an MCC and remote motors. Both are needed for complete maintenance documentation.',
  },
  {
    id: 12,
    question:
      'Why is a single-line diagram the first drawing a maintenance technician should consult when investigating a power supply problem?',
    options: [
      'Because it provides the overall system architecture, showing the supply path from source to load, enabling the technician to identify which section of the distribution is affected',
      'Because it lists every individual terminal connection inside each control panel on site',
      'Because it records the physical route and length of each cable through the building',
      'Because it shows the periodic inspection and test results for every final circuit',
    ],
    correctAnswer: 0,
    explanation:
      "The SLD gives you the 'map' of the distribution system. When investigating a power loss, you can trace the supply path from the source to the affected load, identifying each switchgear point and protection device along the way. This allows you to systematically narrow down the fault location.",
  },
];

const faqs = [
  {
    question: 'What is the difference between a single-line diagram and a schematic diagram?',
    answer:
      "A single-line diagram shows the power distribution architecture using simplified single-line representation — it is concerned with the 'what is connected where' of the distribution system. A schematic (circuit) diagram shows the detailed connections of individual circuits, including every conductor, contact, and component. The SLD gives you the overview; the schematic gives you the detail for a specific circuit.",
  },
  {
    question: 'Do all installations have a single-line diagram?',
    answer:
      'All well-documented installations should have an SLD, but in practice, many older or smaller installations may not. If no SLD exists, a survey should be carried out to create one. For maintenance purposes, an SLD is invaluable — even a hand-drawn version provides essential information about the distribution hierarchy and protection coordination.',
  },
  {
    question: 'How do I read the protection coordination from a single-line diagram?',
    answer:
      'The SLD shows the hierarchy of protective devices from the incoming supply down to the final circuit. Protection coordination (discrimination) means that the device nearest the fault operates first, without tripping upstream devices. The SLD shows the device types and ratings at each level, allowing you to verify that discrimination is maintained — essential for limiting the extent of supply disruption during a fault.',
  },
  {
    question: 'What should I do if the SLD does not match what I find on site?',
    answer:
      'Report the discrepancy immediately. An inaccurate SLD is a safety risk — it may lead to incorrect assumptions about supply paths, fault levels, or protection arrangements. Create a red-line markup of the SLD showing the actual arrangement and submit it for formal revision. Do not continue maintenance based on an inaccurate SLD without first verifying the actual arrangement.',
  },
  {
    question: 'What are cable schedule drawings and when are they used?',
    answer:
      'Cable schedule drawings (or cable block diagrams) show the cable routes between equipment items, with cable references, types, sizes, and route information. They are commonly used on large industrial sites where cable routes are complex. The cable schedule links to both the SLD (which shows the circuit) and the interconnection diagram (which shows the terminal connections).',
  },
];

const MOETModule6Section2_2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 6 · Section 6.2 · Subsection 2"
        title="Wiring Diagrams"
        backTo="/study-centre/apprentice/m-o-e-t-module6-section2"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Single-line diagrams, power distribution schematics, load schedules and interconnection
            drawings — the documents that let you read a distribution system before you touch it.
          </p>

          <TLDR
            points={[
              'SLD: single line represents all conductors of a circuit',
              'Hierarchy: supply → main switchboard → DBs → final circuits',
              'Switchgear: standard symbols with ratings and designations',
              'Interconnection: cable links between separate equipment items',
              'Fault-finding: SLD is the first reference for supply problems',
              'ST1426: power distribution interpretation competence',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain the purpose and conventions of single-line diagrams for power distribution',
              'Interpret switchgear symbols and their ratings on SLDs to IEC 60617',
              'Trace power flow from supply source through distribution to loads',
              'Read and use load schedules as companion documents to SLDs',
              'Interpret interconnection wiring diagrams for cable routes between equipment',
              'Use wiring diagrams for isolation planning and fault-finding',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Single-line diagrams</ContentEyebrow>

          <ConceptBlock
            title="Single-line diagrams — purpose and conventions"
            onSite="The SLD is the first drawing you should consult when investigating any power supply problem. It gives you the complete supply path from source to load, enabling systematic fault location. Always start with the SLD before moving to detailed circuit or wiring diagrams."
          >
            <p>
              A single-line diagram (SLD), also known as a one-line diagram, is the most important
              drawing for understanding any electrical distribution system. It provides a simplified
              but comprehensive overview of the entire power distribution architecture — from the
              point of supply through every level of distribution down to the major loads.
            </p>
            <p>
              The key simplification is that a single line represents all conductors of a circuit. A
              three-phase, four-wire circuit (L1, L2, L3, N) is shown as one line rather than four.
              Short diagonal strokes across the line indicate the number of conductors. This allows
              the entire distribution system to be represented on one or two drawing sheets,
              providing a clear overview that would be impossible if every conductor were drawn
              individually.
            </p>
            <p>
              SLDs are prepared in accordance with BS EN 61082 (Preparation of documents used in
              electrotechnology) and use symbols from IEC 60617. The layout follows the power flow
              hierarchy: incoming supply at the top, flowing downward through each level of
              distribution to the loads at the bottom.
            </p>
          </ConceptBlock>

          <ConceptBlock title="What an SLD shows">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Incoming supply:</strong> utility connection, voltage, available fault level
              </li>
              <li>
                <strong>Transformers:</strong> voltage ratio, rating (kVA/MVA), vector group,
                impedance
              </li>
              <li>
                <strong>Main switchgear:</strong> type (ACB/MCCB), rating, breaking capacity
              </li>
              <li>
                <strong>Busbars:</strong> voltage, rated current, section switches
              </li>
              <li>
                <strong>Distribution boards:</strong> location, circuits fed, protection
              </li>
              <li>
                <strong>Standby generation:</strong> generator, ATS, essential circuits
              </li>
              <li>
                <strong>Major loads:</strong> motors, UPS systems, large fixed equipment
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Switchgear representation and ratings</ContentEyebrow>

          <ConceptBlock title="Switchgear representation and ratings">
            <p>
              Every item of switchgear on the SLD is represented by its standard symbol (BS EN
              60617) and annotated with key technical data. Understanding these annotations is
              essential for maintenance technicians, as they define the protection hierarchy and the
              capability of the distribution system. When replacing a protective device, the SLD
              tells you exactly what rating, type and breaking capacity is required.
            </p>
          </ConceptBlock>

          <AppendixTable
            caption="Switchgear devices — key annotations and maintenance relevance"
            headers={['Device', 'Key annotations', 'Maintenance relevance']}
            rows={[
              [
                'ACB (Air Circuit Breaker)',
                'In/Icu/Ics, trip settings',
                'Main incomer protection; trip settings must match design',
              ],
              [
                'MCCB',
                'Frame size, trip unit, breaking capacity',
                'Sub-main protection; replacement must match ratings',
              ],
              [
                'MCB',
                'Type (B/C/D), rated current',
                'Final circuit protection; type affects motor starting',
              ],
              [
                'Fuse switch',
                'Rated current, fuse type, breaking capacity',
                'Fuse replacement must be like-for-like',
              ],
              [
                'RCD/RCBO',
                'Rated current, sensitivity (mA), type',
                'Regular testing and trip time verification required',
              ],
            ]}
          />

          <ConceptBlock title="Reference designations">
            <p>
              Reference designations on the SLD follow BS EN 81346, providing a unique identifier
              for every item of equipment. For example, a circuit breaker might be designated -Q1
              (switching device), a transformer -T1, or a motor -M101. These designations link the
              SLD to all other documentation — wiring diagrams, maintenance records, and spare parts
              lists.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Load schedules and power flow</ContentEyebrow>

          <ConceptBlock title="Load schedules and power flow">
            <p>
              A load schedule is the companion document to the SLD. While the SLD shows the
              distribution architecture graphically, the load schedule provides the detailed
              numerical data for every circuit in the installation. Together, they provide a
              complete picture of the power distribution system. During fault-finding or circuit
              tracing, the load schedule tells you exactly what each circuit supplies, what cable is
              used, and what protection is installed.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Typical load schedule columns">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Circuit reference:</strong> DB designation and way number (e.g., DB-A/1)
              </li>
              <li>
                <strong>Load description:</strong> what the circuit supplies (e.g., &quot;AHU-1
                Supply Fan Motor&quot;)
              </li>
              <li>
                <strong>Rated power:</strong> connected load in kW or VA
              </li>
              <li>
                <strong>Design current:</strong> calculated design current in amps
              </li>
              <li>
                <strong>Protective device:</strong> type and rating (e.g., &quot;32 A Type C
                MCB&quot;)
              </li>
              <li>
                <strong>Cable:</strong> type, size, and installation method (e.g., &quot;4C 6 mm²
                SWA&quot;)
              </li>
              <li>
                <strong>Earth:</strong> CPC size
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Reading power flow"
            onSite="Always cross-reference the SLD with the load schedule for complete information. The SLD shows you where in the hierarchy a circuit sits; the load schedule gives you the specific technical data. Using one without the other can lead to incomplete understanding of the distribution system."
          >
            <p>
              Power flow on the SLD is understood by reading from top to bottom. The total connected
              load at each distribution board can be cross-referenced with the load schedule to
              verify that protective devices and cables are correctly rated. During maintenance, if
              a protective device trips, the load schedule tells you which loads are affected and
              what to check.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Interconnection and cable wiring diagrams</ContentEyebrow>

          <ConceptBlock title="Interconnection and cable wiring diagrams">
            <p>
              While SLDs show the distribution architecture, interconnection wiring diagrams show
              the physical cable connections between separate items of equipment. These are
              essential for maintenance tasks that involve tracing cables, reconnecting equipment
              after repair, or verifying that field wiring matches the design documentation.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Interconnection diagrams vs cable schedules">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="mb-1.5 text-[13.5px] font-semibold text-elec-yellow/80">
                  Interconnection diagrams show
                </p>
                <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
                  <li>Cable type, size and identification</li>
                  <li>Terminal references at each end</li>
                  <li>Core identification (colour or number)</li>
                  <li>Equipment at each end of the cable</li>
                  <li>Cable gland and entry details</li>
                </ul>
              </div>
              <div>
                <p className="mb-1.5 text-[13.5px] font-semibold text-elec-yellow/80">
                  Cable schedule content
                </p>
                <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
                  <li>Unique cable reference number</li>
                  <li>From/to equipment references</li>
                  <li>Cable type and specification</li>
                  <li>Route description and length</li>
                  <li>Installation method (tray, trunking, buried)</li>
                </ul>
              </div>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Cable schedules on large sites">
            <p>
              On large industrial sites, a separate cable schedule drawing provides a comprehensive
              list of all cables with their routes, types and termination points. This is invaluable
              for maintenance planning — when you need to isolate a cable for repair, the cable
              schedule tells you exactly where it runs and where both ends are terminated.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Network diagrams and utility interfaces</ContentEyebrow>

          <ConceptBlock title="Network diagrams and utility interfaces">
            <p>
              On larger sites — industrial estates, hospital campuses, university sites — the power
              distribution extends beyond a single building. Network diagrams show the
              interconnections between substations, ring mains, radial feeders, and major supply
              points across the entire site. Understanding these diagrams is essential for
              maintenance technicians working on campus-wide or industrial distribution systems.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Network diagram features">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Ring main:</strong> closed loop feeding multiple substations — resilient
                supply
              </li>
              <li>
                <strong>Radial feeder:</strong> single feed from one point — simpler but less
                resilient
              </li>
              <li>
                <strong>Bus-section switch:</strong> allows splitting or joining busbars for
                maintenance
              </li>
              <li>
                <strong>Normally open points:</strong> points where the ring is broken for
                operational purposes
              </li>
              <li>
                <strong>Alternative feeds:</strong> backup supply paths available if the primary
                fails
              </li>
              <li>
                <strong>PCC (Point of Common Coupling):</strong> boundary between utility and
                customer
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Isolation planning on interconnected systems"
            onSite="Understanding the distribution network is essential for planning safe isolation on interconnected systems. Wiring diagram interpretation — from SLDs through to interconnection drawings — is a core competence for the maintenance and operations engineering technician (ST1426)."
          >
            <p>
              When working on interconnected systems, the network diagram is essential for planning
              safe isolation. A maintenance technician must be able to identify all possible supply
              paths to equipment before beginning work. Without understanding the network topology,
              there is a risk of back-feeds from alternative supply routes that the SLD for a single
              building might not show.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Quick reference">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="mb-1.5 text-[13.5px] font-semibold text-white">Drawing types</p>
                <ul className="space-y-0.5 text-[13.5px]">
                  <li>SLD — overall distribution architecture</li>
                  <li>Load schedule — circuit technical data</li>
                  <li>Interconnection — cables between equipment</li>
                  <li>Cable schedule — all cables with routes</li>
                  <li>Network diagram — site-wide distribution</li>
                </ul>
              </div>
              <div>
                <p className="mb-1.5 text-[13.5px] font-semibold text-white">Key standards</p>
                <ul className="space-y-0.5 text-[13.5px]">
                  <li>BS EN 61082 — document preparation</li>
                  <li>IEC 60617 — graphical symbols</li>
                  <li>BS EN 81346 — reference designations</li>
                  <li>BS 7671 — wiring regulations</li>
                  <li>ST1426 — technician competence</li>
                </ul>
              </div>
            </div>
          </ConceptBlock>

          <SectionRule />

          <VideoCard
            url="https://www.youtube.com/watch?v=PeJw7OgKPlk"

            title="Your Intermediate Switch Diagram Is Wrong"

            channel="Toolbox Talk For Electricians"

            duration="12:37"

            topic="A wiring diagram everyone draws, drawn wrong"

            caption="Worth watching because it is a reading error, not a drawing error — the diagram looks right until you trace the switched line through it. That is exactly the skill this page is teaching."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'A single-line diagram (SLD) uses one line to represent all conductors of a circuit, giving a clear overview of the whole distribution architecture.',
              'Read power flow top to bottom: incoming supply → main switchboard → sub-distribution boards → final circuits → loads.',
              'Switchgear symbols follow BS EN 60617; reference designations follow BS EN 81346, linking the SLD to every other document.',
              'A load schedule is the SLD’s companion — it supplies the circuit reference, rating, cable size and protective device for every circuit.',
              'Interconnection diagrams show cable connections between separate equipment items, with terminal references at both ends; cable schedules record the routes.',
              'Network diagrams show ring mains, radial feeders and bus-section switches — essential for isolation planning on multi-building sites.',
              'The SLD is always the first drawing to consult when investigating a power supply problem.',
              'Key references: BS EN 61082 (document preparation), IEC 60617 (symbols), BS EN 81346 (designations).',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module6-section2-1')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Circuit Diagrams and Symbols
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module6-section2-3')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Piping and Instrumentation Diagrams (P&amp;ID)
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule6Section2_2;
