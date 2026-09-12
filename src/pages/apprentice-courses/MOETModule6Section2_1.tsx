/**
 * MOET · Module 6 · Section 2 · Subsection 1 — Circuit Diagrams and Symbols
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
 * Reference conversion for the MOET redesign. Content preserved from the
 * original; structure, shell and reading measure rebuilt on the
 * study-centre learning kit.
 *
 * ✎ CONTENT FIX (12 Sep): the three-phase labelling quiz question had three
 *   distractors pasted in from unrelated courses — equipment calibration, site
 *   compound ground conditions, and asset test history. None were labelling
 *   options, so the question was answerable with no knowledge. Replaced with
 *   real labelling conventions (legacy R/Y/B, US A/B/C). correctAnswer unchanged.
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
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
  AppendixTable,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Circuit Diagrams and Symbols - MOET Module 6 Section 2.1';
const DESCRIPTION =
  'IEC 60617 symbols, circuit diagram layout, power circuits, control circuits, signal flow, and IEC 81346 reference designation for electrical maintenance.';

const quickCheckQuestions = [
  {
    id: 'bs60617-check',
    question: 'What is the purpose of IEC 60617 in electrical engineering?',
    options: [
      'It defines the requirements for electrical testing',
      'It specifies cable sizes for domestic installations',
      'It sets the colour coding for three-phase supplies',
      'It provides the standardised graphical symbols used on electrical circuit diagrams',
    ],
    correctIndex: 3,
    explanation:
      'IEC 60617 provides the internationally standardised graphical symbols used on electrical and electronic circuit diagrams. Using standardised symbols ensures that diagrams can be read and interpreted correctly by anyone, regardless of which organisation or country produced them.',
  },
  {
    id: 'power-control-check',
    question:
      'What is the key difference between a power circuit and a control circuit on a schematic diagram?',
    options: [
      'Power circuits are always drawn on a separate sheet, while control circuits never are',
      'Power circuits use IEC 60617 symbols, while control circuits use IEC 81346 symbols only',
      'Power circuits always operate at 230 V, while control circuits always operate at 400 V',
      'Power circuits carry the main load current to drive equipment; control circuits carry low-current signals to control the operation of the power circuit',
    ],
    correctIndex: 3,
    explanation:
      'Power circuits carry the main load current (often at higher voltages and currents) to drive motors, heaters, and other loads. Control circuits carry low-current signals that control the switching and sequencing of the power circuit through contactors, relays, timers, and other control devices.',
  },
  {
    id: 'signal-flow-check',
    question: 'On a circuit diagram, signal flow conventionally runs:',
    options: [
      'In the direction of physical cable routing, regardless of logical sequence',
      'From left to right (and/or top to bottom) — representing the logical sequence of operation',
      'From the load back towards the supply, following the return current path',
      'In whichever direction makes the most efficient use of the page space',
    ],
    correctIndex: 1,
    explanation:
      'By convention, signal flow on circuit diagrams runs from left to right and/or from top to bottom. Power supply lines are typically at the top and bottom (or left and right), with the control logic flowing logically between them. This convention makes diagrams easier to read and follow.',
  },
  {
    id: 'iec81346-check',
    question: 'What is the purpose of IEC 81346 reference designation?',
    options: [
      'It defines the minimum cable sizes for each type of control component',
      'It specifies the test sequence to be followed when commissioning a panel',
      'It sets the standard colours used for power and control wiring in a panel',
      'It provides a systematic method for identifying and labelling equipment, components, and signals on drawings and in the field',
    ],
    correctIndex: 3,
    explanation:
      'IEC 81346 provides a structured reference designation system for identifying equipment at all levels — from the overall plant down to individual components. It ensures that every item has a unique, unambiguous identifier that is consistent between drawings, equipment labels, and maintenance records.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'The symbol for a normally open (NO) contact on a circuit diagram is:',
    options: [
      'A circle with a diagonal line, indicating the contact is permanently closed',
      'Two lines that do not touch, indicating the contact is open in its resting state',
      'Two lines bridged by a horizontal bar, indicating the contact is closed at rest',
      'A rectangle with a coil symbol, indicating an energised actuator',
    ],
    correctAnswer: 1,
    explanation:
      'A normally open contact is shown as two lines that do not touch in the resting (de-energised) state. When the coil or actuator is energised, the contact closes (the lines touch). Understanding NO and NC contacts is fundamental to reading control circuit diagrams.',
  },
  {
    id: 2,
    question: 'A contactor coil symbol on a circuit diagram typically appears in:',
    options: [
      'The power circuit, directly in series with the motor it controls',
      'The earth circuit, where it provides a return path for fault current',
      'The control circuit, where it is energised by the control logic to switch the power circuit contacts',
      'The supply circuit, before the main isolator at the origin of the panel',
    ],
    correctAnswer: 2,
    explanation:
      'The contactor coil appears in the control circuit, where it is energised by the control logic (start buttons, interlocks, timers). When the coil energises, the associated power contacts in the power circuit close, connecting the load. The coil and contacts are cross-referenced on the diagram.',
  },
  {
    id: 3,
    question: 'IEC 60617 symbols are important because they:',
    options: [
      'Guarantee that any circuit drawn with them will comply with BS 7671',
      'Remove the need for a wiring diagram when constructing a control panel',
      'Indicate the exact physical size and rating of each component shown',
      'Provide a universal language that allows electrical diagrams to be read by any competent person worldwide',
    ],
    correctAnswer: 3,
    explanation:
      'IEC 60617 symbols are internationally standardised, ensuring that circuit diagrams can be read and understood by any competent person regardless of nationality, organisation, or the software used to create the diagram. This is essential for maintenance across multi-national installations.',
  },
  {
    id: 4,
    question: 'On a motor control circuit diagram, the overload relay contact is typically wired:',
    options: [
      'In series with the contactor coil in the control circuit, so it breaks the control circuit on overload',
      'In parallel with the start button, so it keeps the motor running after start',
      'In series with the motor in the power circuit, carrying the full load current',
      'Across the supply terminals, so it provides a path to earth on a fault',
    ],
    correctAnswer: 0,
    explanation:
      'The overload relay contact (normally closed) is wired in series with the contactor coil circuit. When the motor draws excessive current, the overload relay trips, opening the NC contact, which de-energises the contactor coil and disconnects the motor from the supply.',
  },
  {
    id: 5,
    question: 'Cross-referencing on circuit diagrams is used to:',
    options: [
      'Show the physical position of each component inside the control panel',
      'Link related components that appear on different parts of the diagram or on different sheets — such as a relay coil and its contacts',
      'List the cable sizes and terminal numbers for every connection in the circuit',
      'Indicate the test results recorded during commissioning of the circuit',
    ],
    correctAnswer: 1,
    explanation:
      'Cross-referencing links related components that appear in different locations on the diagram. For example, a relay coil in the control circuit will have a cross-reference to show where its contacts appear (possibly on a different sheet). This is essential for tracing circuit operation during fault-finding.',
  },
  {
    id: 6,
    question: "The IEC 81346 reference designation prefix letter 'K' indicates:",
    options: ['A switch', 'A motor', 'A relay or contactor', 'A transformer'],
    correctAnswer: 2,
    explanation:
      'In IEC 81346, the prefix letter K designates relays and contactors. Other common prefix letters include M (motor), Q (circuit breaker or switch-disconnector), F (fuse or protective device), T (transformer), and S (switch or selector).',
  },
  {
    id: 7,
    question: 'A normally closed (NC) contact differs from a normally open (NO) contact because:',
    options: [
      'An NC contact is used only in power circuits, while an NO contact is used only in control circuits',
      'An NC contact carries more current than an NO contact of the same rating',
      'An NC contact is always wired in the earth circuit, while an NO contact is wired in the line',
      'An NC contact is closed in its resting state and opens when actuated; an NO contact is open in its resting state and closes when actuated',
    ],
    correctAnswer: 3,
    explanation:
      "NC (normally closed) contacts are closed when the actuating device is de-energised — they open when actuated. NO (normally open) contacts are open when de-energised and close when actuated. The 'normal' state refers to the de-energised or resting condition.",
  },
  {
    id: 8,
    question: 'On a power circuit diagram, the three-phase supply lines are typically labelled:',
    options: [
      'L1, L2, L3 (with N for neutral and PE for protective earth)',
      'R, Y, B (with Blk for neutral), following the pre-2004 colour names',
      'A, B, C (with 0 for neutral and G for ground)',
      'P1, P2, P3 (with CN for the combined neutral and earth)',
    ],
    correctAnswer: 0,
    explanation:
      'The IEC standard labels for three-phase supply lines are L1, L2, and L3, with N for neutral and PE for protective earth. While older colour-based designations (R, Y, B) may still be encountered on legacy drawings, L1/L2/L3 is the current standard.',
  },
  {
    id: 9,
    question:
      'A circuit diagram shows the logical connections between components, while a wiring diagram shows:',
    options: [
      'Only the power circuit, with the control circuit shown on a separate schematic',
      'The physical wiring connections, terminal numbers, and cable routes needed to build the circuit',
      'The sequence of operations the circuit performs when the start button is pressed',
      'The fault codes to record against each component during periodic inspection',
    ],
    correctAnswer: 1,
    explanation:
      'A circuit (schematic) diagram shows the logical function and connections between components. A wiring diagram shows how to physically wire the circuit — including terminal numbers, wire references, cable routes, and connection sequences. Both are needed: the schematic for understanding operation, the wiring diagram for construction and maintenance.',
  },
  {
    id: 10,
    question: 'The symbol for a fuse on a IEC 60617 circuit diagram is:',
    options: [
      'A circle with the letter F inside it',
      'A zig-zag line representing the fuse element',
      'A rectangle with a line through it (or a rectangular block symbol)',
      'A triangle pointing towards the protected equipment',
    ],
    correctAnswer: 2,
    explanation:
      'The standard fuse symbol is a rectangular block (or a rectangle with a line through it representing the fuse element). It is placed in the circuit at the point where overcurrent protection is required. The fuse rating is noted adjacent to the symbol.',
  },
  {
    id: 11,
    question:
      'Why is it important to understand both power and control circuit diagrams for maintenance?',
    options: [
      'Power circuit faults are always more dangerous, so control circuits can be ignored',
      'The control circuit diagram alone shows everything needed to repair any fault',
      'Power and control circuits are always on the same sheet, so only one needs reading',
      'Faults can occur in either circuit, and understanding both allows effective fault-finding — a control circuit fault can prevent the power circuit from operating even though the power circuit is healthy',
    ],
    correctAnswer: 3,
    explanation:
      'Many maintenance faults are in the control circuit rather than the power circuit. A tripped overload, a faulty limit switch, or a broken interlock wire in the control circuit will prevent the motor from running, even though the power circuit is perfectly healthy. Understanding both circuits is essential for systematic fault-finding.',
  },
];

const faqs = [
  {
    question: 'What is the difference between a circuit diagram and a schematic diagram?',
    answer:
      "In common usage, the terms are often used interchangeably. Strictly, a circuit diagram (or schematic diagram) shows the logical connections between components using standardised symbols, without regard to physical layout. The emphasis is on showing how the circuit functions. Some organisations use 'schematic' for the logical diagram and 'circuit diagram' more broadly, but the key distinction is between logical diagrams (schematics) and physical diagrams (wiring diagrams).",
  },
  {
    question:
      'How do I identify which symbols are used on an older drawing that predates BS EN 60617?',
    answer:
      "Older drawings may use legacy symbols from earlier British Standards (such as BS 3939). Many legacy symbols are similar to their BS EN 60617 equivalents but may differ in detail. If you encounter unfamiliar symbols, check the drawing's symbol legend (usually provided on the first sheet), consult the referenced standard noted in the title block, or ask a senior engineer. Do not guess — misidentifying a symbol can lead to incorrect circuit interpretation.",
  },
  {
    question: 'Do I need to be able to draw circuit diagrams as a maintenance technician?',
    answer:
      'You are not expected to produce formal circuit diagrams, but you should be able to sketch simple circuits to communicate findings during fault-finding, to explain a fault to a supervisor, or to document a modification. The ability to sketch a circuit quickly and accurately is a valuable practical skill for maintenance communication.',
  },
  {
    question: 'What does IEC 81346 mean for equipment labelling on site?',
    answer:
      'IEC 81346 provides the framework for the equipment labels you see on site — the tag numbers on motors, switchgear, control panels, and instruments. Understanding the structure of these designations helps you cross-reference between what you see on site and what appears on the drawings. For example, if a motor is labelled M101, you know to look for M101 on the circuit diagram to find its electrical connections and control logic.',
  },
];

const MOETModule6Section2_1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 6 · Section 6.2 · Subsection 1"
        title="Circuit Diagrams and Symbols"
        backTo="/study-centre/apprentice/m-o-e-t-module6-section2"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            IEC 60617 symbols, power and control circuits, signal flow and reference designation.
          </p>

          <TLDR
            points={[
              'IEC 60617: International standard for graphical symbols.',
              'Power circuits: Main load current paths (L1, L2, L3, N, PE).',
              'Control circuits: Low-current signal and switching logic.',
              'IEC 81346: Systematic equipment reference designation.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify and interpret IEC 60617 graphical symbols on circuit diagrams',
              'Distinguish between power circuits and control circuits on schematics',
              'Follow signal flow conventions to understand circuit operation',
              'Use cross-referencing to trace related components across diagram sheets',
              'Apply IEC 81346 reference designation to identify equipment on drawings and on site',
              'Read and interpret common motor control circuit diagrams',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock title="Electrical maintenance context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Fault-finding:</strong> Circuit diagrams are essential for tracing faults.
              </li>
              <li>
                <strong>Cross-referencing:</strong> Coils to contacts, sheets to sheets.
              </li>
              <li>
                <strong>Motor control:</strong> DOL, star-delta, VSD circuits common in industry.
              </li>
              <li>
                <strong>ST1426:</strong> Electrical schematic interpretation competence.
              </li>
            </ul>
          </ConceptBlock>

          <ContentEyebrow>IEC 60617 graphical symbols</ContentEyebrow>

          <ConceptBlock title="IEC 60617 Graphical Symbols">
            <p>
              IEC 60617 is the international standard that defines the graphical symbols used on
              electrical and electronic circuit diagrams. It provides a universal visual language
              that allows circuit diagrams to be read by any competent person, regardless of which
              country or organisation produced them. Mastering these symbols is fundamental to
              reading any electrical schematic.
            </p>
          </ConceptBlock>

          <AppendixTable
            caption="Common Symbols for Maintenance Technicians"
            headers={['Component', 'IEC Prefix', 'Symbol Description']}
            rows={[
              ['Motor', 'M', 'Circle with M inside'],
              ['Contactor/Relay coil', 'K', 'Rectangle (or circle) with designation'],
              ['Fuse', 'F', 'Rectangle with line through'],
              ['Circuit breaker', 'Q', 'Switch symbol with arc/trip mechanism'],
              ['Transformer', 'T', 'Two coils with core symbol'],
              ['Push button (NO)', 'S', 'Open contact with actuator arrow'],
              ['Overload relay', 'F', 'Thermal element symbol with trip contact'],
              ['Lamp/indicator', 'H', 'Circle with cross or specific lamp symbol'],
            ]}
          />

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Power circuits and control circuits</ContentEyebrow>

          <ConceptBlock
            title="Power Circuits and Control Circuits"
            onSite="Fault-Finding Implication: When a motor fails to start, the fault is more often in the control circuit than the power circuit. A tripped overload, a faulty push button, a broken interlock, or a failed timer in the control circuit will prevent the contactor from energising — even though the power circuit is completely healthy. Always check both circuits systematically."
          >
            <p>
              Most industrial and commercial electrical systems are divided into two distinct
              circuit types: the power circuit (which carries the main load current) and the control
              circuit (which carries the signals that control the power circuit). Understanding this
              separation is essential for systematic fault-finding.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="mb-1.5 font-semibold text-white">Power Circuit</p>
                <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
                  <li>Carries main load current (amps to hundreds of amps)</li>
                  <li>Contains: isolators, fuses, MCCBs, contactors, overloads, motors</li>
                  <li>Typically drawn with thicker lines</li>
                  <li>Three-phase: L1, L2, L3 supply to load</li>
                </ul>
              </div>
              <div>
                <p className="mb-1.5 font-semibold text-white">Control Circuit</p>
                <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
                  <li>Carries signal current (milliamps to a few amps)</li>
                  <li>Contains: push buttons, selectors, relays, timers, PLCs, interlocks</li>
                  <li>Typically drawn with thinner lines</li>
                  <li>Often at reduced voltage (24 V DC or 110 V AC)</li>
                </ul>
              </div>
            </div>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Signal flow and cross-referencing</ContentEyebrow>

          <ConceptBlock title="Signal Flow and Cross-Referencing">
            <p>
              Circuit diagrams follow conventions for signal flow that make them logical to read.
              Understanding these conventions allows you to trace the operation of any circuit from
              input to output, which is the foundation of systematic fault-finding.
            </p>
            <p className="font-semibold text-white">Signal Flow Conventions</p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Left to right:</strong> Input signals on the left, outputs on the right
              </li>
              <li>
                <strong>Top to bottom:</strong> Supply at top, earth/return at bottom
              </li>
              <li>
                <strong>Power flow:</strong> Supply lines (L1, L2, L3) typically horizontal at top
              </li>
              <li>
                <strong>Control logic:</strong> Read vertically down between supply rails, left to
                right for sequence
              </li>
            </ul>
            <p className="font-semibold text-white">Cross-Referencing System</p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Coil to contacts:</strong> A relay coil shows references to where its
                contacts are used
              </li>
              <li>
                <strong>Sheet references:</strong> Components spanning multiple sheets show
                sheet/column references
              </li>
              <li>
                <strong>Contact mirror:</strong> A table below the coil symbol lists all its
                contacts with their locations
              </li>
              <li>
                <strong>Terminal references:</strong> Link circuit diagram designations to physical
                terminal numbers
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>IEC 81346 reference designation</ContentEyebrow>

          <ConceptBlock title="IEC 81346 Reference Designation">
            <p>
              IEC 81346 provides a hierarchical reference designation system that gives every item
              in an installation a unique identifier. This system links what you see on the circuit
              diagram to what you see labelled on the equipment in the field. Understanding it is
              essential for navigating between drawings and physical equipment.
            </p>
          </ConceptBlock>

          <AppendixTable
            caption="Common IEC 81346 Prefix Letters"
            headers={['Letter', 'Component Type', 'Example']}
            rows={[
              ['M', 'Motor', 'M101 — motor number 101'],
              ['K', 'Relay, contactor', 'KM1 — main contactor 1'],
              ['Q', 'Circuit breaker, switch-disconnector', 'Q1 — main isolator'],
              ['F', 'Fuse, protective device', 'F1 — control circuit fuse'],
              ['S', 'Switch, selector, push button', 'S1 — start button'],
              ['T', 'Transformer', 'T1 — control transformer'],
              ['H', 'Indicator, lamp, alarm', 'H1 — run indicator lamp'],
            ]}
          />

          <ConceptBlock title="ST1426 link">
            <p>
              The maintenance technician standard requires competence in interpreting electrical
              schematics and identifying equipment using reference designations. This is a core
              skill for fault-finding, reporting, and maintenance record-keeping.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <Scenario
            title="A symbol read as a normally-open contact when it was normally-closed"

            situation={
              <>
                <p>
                  You are fault-finding a control circuit from a drawing. A pressure switch is shown
                  in a rung feeding a contactor coil. Reading the symbol as normally-open, you
                  expect the contact to close on rising pressure and energise the coil.
                </p>

                <p>
                  On the machine the coil is energised at rest and drops out when pressure rises,
                  which is the opposite of what you expect. You start suspecting the drawing is out
                  of date.
                </p>
              </>
            }

            whatToDo={
              <>
                <p>
                  Check the symbol carefully before doubting the drawing. Normally-open and
                  normally-closed contacts differ by a single stroke across the contact, and at the
                  scale most drawings are printed or viewed at, that stroke is easy to miss.
                </p>

                <p>
                  Confirm against the device itself. A pressure switch is usually marked with its
                  contact configuration at the terminals, and many carry both a NO and a NC set —
                  which one is wired is the question the drawing is answering.
                </p>

                <p>
                  Remember that "normally" means de-energised and at rest, not "normally during
                  production". A contact drawn closed is closed with the machine off and no pressure
                  applied, which is often the opposite of the state you are looking at on a running
                  plant.
                </p>

                <p>
                  If the drawing genuinely is wrong, mark it up and get it corrected through the
                  drawing revision process rather than annotating a personal copy.
                </p>
              </>
            }

            whyItMatters={
              <p>
                Assuming the drawing is wrong is the most expensive assumption in fault-finding,
                because it removes your only reliable map and leaves you tracing wires. In practice
                the drawing is usually right and the reading is wrong, and the single most common
                reading error is contact state. Getting fluent with the symbols — to the point where
                NO and NC are read without effort — is what makes a schematic faster than a
                multimeter.
              </p>
            }
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'IEC 60617 provides the internationally standardised graphical symbols used on electrical circuit diagrams.',
              'Power circuits carry the main load current (L1, L2, L3, N, PE); control circuits carry low-current signal and switching logic.',
              'Signal flow runs left to right and/or top to bottom; cross-referencing links coils to contacts across sheets.',
              'IEC 81346 provides a systematic reference designation system — M (motor), K (relay/contactor), Q (circuit breaker), F (fuse), S (switch), T (transformer), H (indicator).',
              'Faults can occur in either circuit — understanding both power and control circuits is essential for effective fault-finding.',
              'ST1426 requires competence in interpreting electrical schematics and identifying equipment using reference designations.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module6-section2')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Back to section
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Electrical schematics and wiring diagrams
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module6-section2-2')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Wiring Diagrams
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule6Section2_1;
