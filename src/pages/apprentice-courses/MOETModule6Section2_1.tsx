import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Circuit Diagrams and Symbols - MOET Module 6 Section 2.1";
const DESCRIPTION = "BS EN 60617 symbols, circuit diagram layout, power circuits, control circuits, signal flow, and IEC 81346 reference designation for electrical maintenance.";

const quickCheckQuestions = [
  {
    id: "bs60617-check",
    question: "What is the purpose of BS EN 60617 in electrical engineering?",
    options: [
      "It specifies cable sizes for domestic installations",
      "It provides the standardised graphical symbols used on electrical circuit diagrams",
      "It defines the requirements for electrical testing",
      "It sets the colour coding for three-phase supplies"
    ],
    correctIndex: 1,
    explanation: "BS EN 60617 provides the internationally standardised graphical symbols used on electrical and electronic circuit diagrams. Using standardised symbols ensures that diagrams can be read and interpreted correctly by anyone, regardless of which organisation or country produced them."
  },
  {
    id: "power-control-check",
    question: "What is the key difference between a power circuit and a control circuit on a schematic diagram?",
    options: [
      "There is no difference — they are the same thing",
      "Power circuits carry the main load current to drive equipment; control circuits carry low-current signals to control the operation of the power circuit",
      "Control circuits always use DC and power circuits always use AC",
      "Power circuits are only found in domestic installations"
    ],
    correctIndex: 1,
    explanation: "Power circuits carry the main load current (often at higher voltages and currents) to drive motors, heaters, and other loads. Control circuits carry low-current signals that control the switching and sequencing of the power circuit through contactors, relays, timers, and other control devices."
  },
  {
    id: "signal-flow-check",
    question: "On a circuit diagram, signal flow conventionally runs:",
    options: [
      "From right to left",
      "From bottom to top",
      "From left to right (and/or top to bottom) — representing the logical sequence of operation",
      "In any random direction"
    ],
    correctIndex: 2,
    explanation: "By convention, signal flow on circuit diagrams runs from left to right and/or from top to bottom. Power supply lines are typically at the top and bottom (or left and right), with the control logic flowing logically between them. This convention makes diagrams easier to read and follow."
  },
  {
    id: "iec81346-check",
    question: "What is the purpose of IEC 81346 reference designation?",
    options: [
      "It specifies the colour of equipment enclosures",
      "It provides a systematic method for identifying and labelling equipment, components, and signals on drawings and in the field",
      "It defines safety testing frequencies",
      "It specifies the minimum IP rating for enclosures"
    ],
    correctIndex: 1,
    explanation: "IEC 81346 provides a structured reference designation system for identifying equipment at all levels — from the overall plant down to individual components. It ensures that every item has a unique, unambiguous identifier that is consistent between drawings, equipment labels, and maintenance records."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The symbol for a normally open (NO) contact on a circuit diagram is:",
    options: [
      "Two parallel lines (representing a closed switch)",
      "Two lines that do not touch, indicating the contact is open in its resting state",
      "A circle with a cross inside",
      "A triangle pointing to the right"
    ],
    correctAnswer: 1,
    explanation: "A normally open contact is shown as two lines that do not touch in the resting (de-energised) state. When the coil or actuator is energised, the contact closes (the lines touch). Understanding NO and NC contacts is fundamental to reading control circuit diagrams."
  },
  {
    id: 2,
    question: "A contactor coil symbol on a circuit diagram typically appears in:",
    options: [
      "The power circuit only",
      "The control circuit, where it is energised by the control logic to switch the power circuit contacts",
      "Neither — contactors are not shown on diagrams",
      "Only on single-line diagrams"
    ],
    correctAnswer: 1,
    explanation: "The contactor coil appears in the control circuit, where it is energised by the control logic (start buttons, interlocks, timers). When the coil energises, the associated power contacts in the power circuit close, connecting the load. The coil and contacts are cross-referenced on the diagram."
  },
  {
    id: 3,
    question: "BS EN 60617 symbols are important because they:",
    options: [
      "Are optional and vary between organisations",
      "Provide a universal language that allows electrical diagrams to be read by any competent person worldwide",
      "Are only used in the UK",
      "Only apply to electronic circuits"
    ],
    correctAnswer: 1,
    explanation: "BS EN 60617 symbols are internationally standardised, ensuring that circuit diagrams can be read and understood by any competent person regardless of nationality, organisation, or the software used to create the diagram. This is essential for maintenance across multi-national installations."
  },
  {
    id: 4,
    question: "On a motor control circuit diagram, the overload relay contact is typically wired:",
    options: [
      "In parallel with the motor",
      "In series with the contactor coil in the control circuit, so it breaks the control circuit on overload",
      "Only in the power circuit",
      "It is not shown on diagrams"
    ],
    correctAnswer: 1,
    explanation: "The overload relay contact (normally closed) is wired in series with the contactor coil circuit. When the motor draws excessive current, the overload relay trips, opening the NC contact, which de-energises the contactor coil and disconnects the motor from the supply."
  },
  {
    id: 5,
    question: "Cross-referencing on circuit diagrams is used to:",
    options: [
      "Make the drawing look more complex",
      "Link related components that appear on different parts of the diagram or on different sheets — such as a relay coil and its contacts",
      "Indicate the drawing scale",
      "Show the cable type"
    ],
    correctAnswer: 1,
    explanation: "Cross-referencing links related components that appear in different locations on the diagram. For example, a relay coil in the control circuit will have a cross-reference to show where its contacts appear (possibly on a different sheet). This is essential for tracing circuit operation during fault-finding."
  },
  {
    id: 6,
    question: "The IEC 81346 reference designation prefix letter 'K' indicates:",
    options: [
      "A switch",
      "A relay or contactor",
      "A motor",
      "A transformer"
    ],
    correctAnswer: 1,
    explanation: "In IEC 81346, the prefix letter K designates relays and contactors. Other common prefix letters include M (motor), Q (circuit breaker or switch-disconnector), F (fuse or protective device), T (transformer), and S (switch or selector)."
  },
  {
    id: 7,
    question: "A normally closed (NC) contact differs from a normally open (NO) contact because:",
    options: [
      "They are the same thing with different names",
      "An NC contact is closed in its resting state and opens when actuated; an NO contact is open in its resting state and closes when actuated",
      "NC contacts are only used in power circuits",
      "NO contacts are only used in DC circuits"
    ],
    correctAnswer: 1,
    explanation: "NC (normally closed) contacts are closed when the actuating device is de-energised — they open when actuated. NO (normally open) contacts are open when de-energised and close when actuated. The 'normal' state refers to the de-energised or resting condition."
  },
  {
    id: 8,
    question: "On a power circuit diagram, the three-phase supply lines are typically labelled:",
    options: [
      "A, B, C",
      "L1, L2, L3 (with N for neutral and PE for protective earth)",
      "Red, Yellow, Blue",
      "1, 2, 3"
    ],
    correctAnswer: 1,
    explanation: "The IEC standard labels for three-phase supply lines are L1, L2, and L3, with N for neutral and PE for protective earth. While older colour-based designations (R, Y, B) may still be encountered on legacy drawings, L1/L2/L3 is the current standard."
  },
  {
    id: 9,
    question: "A circuit diagram shows the logical connections between components, while a wiring diagram shows:",
    options: [
      "The same information in a different colour",
      "The physical wiring connections, terminal numbers, and cable routes needed to build the circuit",
      "Only the power supply connections",
      "Only the control circuit"
    ],
    correctAnswer: 1,
    explanation: "A circuit (schematic) diagram shows the logical function and connections between components. A wiring diagram shows how to physically wire the circuit — including terminal numbers, wire references, cable routes, and connection sequences. Both are needed: the schematic for understanding operation, the wiring diagram for construction and maintenance."
  },
  {
    id: 10,
    question: "The symbol for a fuse on a BS EN 60617 circuit diagram is:",
    options: [
      "A circle with a dot in the centre",
      "A rectangle with a line through it (or a rectangular block symbol)",
      "A triangle with an arrow",
      "Two parallel plates"
    ],
    correctAnswer: 1,
    explanation: "The standard fuse symbol is a rectangular block (or a rectangle with a line through it representing the fuse element). It is placed in the circuit at the point where overcurrent protection is required. The fuse rating is noted adjacent to the symbol."
  },
  {
    id: 11,
    question: "Why is it important to understand both power and control circuit diagrams for maintenance?",
    options: [
      "It is only necessary to understand power circuits",
      "Faults can occur in either circuit, and understanding both allows effective fault-finding — a control circuit fault can prevent the power circuit from operating even though the power circuit is healthy",
      "Control circuits are only relevant to design engineers",
      "Power and control circuits are always shown on the same diagram"
    ],
    correctAnswer: 1,
    explanation: "Many maintenance faults are in the control circuit rather than the power circuit. A tripped overload, a faulty limit switch, or a broken interlock wire in the control circuit will prevent the motor from running, even though the power circuit is perfectly healthy. Understanding both circuits is essential for systematic fault-finding."
  }
];

const faqs = [
  {
    question: "What is the difference between a circuit diagram and a schematic diagram?",
    answer: "In common usage, the terms are often used interchangeably. Strictly, a circuit diagram (or schematic diagram) shows the logical connections between components using standardised symbols, without regard to physical layout. The emphasis is on showing how the circuit functions. Some organisations use 'schematic' for the logical diagram and 'circuit diagram' more broadly, but the key distinction is between logical diagrams (schematics) and physical diagrams (wiring diagrams)."
  },
  {
    question: "How do I identify which symbols are used on an older drawing that predates BS EN 60617?",
    answer: "Older drawings may use legacy symbols from earlier British Standards (such as BS 3939). Many legacy symbols are similar to their BS EN 60617 equivalents but may differ in detail. If you encounter unfamiliar symbols, check the drawing's symbol legend (usually provided on the first sheet), consult the referenced standard noted in the title block, or ask a senior engineer. Do not guess — misidentifying a symbol can lead to incorrect circuit interpretation."
  },
  {
    question: "Do I need to be able to draw circuit diagrams as a maintenance technician?",
    answer: "You are not expected to produce formal circuit diagrams, but you should be able to sketch simple circuits to communicate findings during fault-finding, to explain a fault to a supervisor, or to document a modification. The ability to sketch a circuit quickly and accurately is a valuable practical skill for maintenance communication."
  },
  {
    question: "What does IEC 81346 mean for equipment labelling on site?",
    answer: "IEC 81346 provides the framework for the equipment labels you see on site — the tag numbers on motors, switchgear, control panels, and instruments. Understanding the structure of these designations helps you cross-reference between what you see on site and what appears on the drawings. For example, if a motor is labelled M101, you know to look for M101 on the circuit diagram to find its electrical connections and control logic."
  }
];

const MOETModule6Section2_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module6-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 6.2
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Shield className="h-4 w-4" />
            <span>Module 6.2.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Circuit Diagrams and Symbols
          </h1>
          <p className="text-white/80">
            BS EN 60617 symbols, power and control circuits, signal flow and reference designation
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>BS EN 60617:</strong> International standard for graphical symbols</li>
              <li className="pl-1"><strong>Power circuits:</strong> Main load current paths (L1, L2, L3, N, PE)</li>
              <li className="pl-1"><strong>Control circuits:</strong> Low-current signal and switching logic</li>
              <li className="pl-1"><strong>IEC 81346:</strong> Systematic equipment reference designation</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Fault-finding:</strong> Circuit diagrams are essential for tracing faults</li>
              <li className="pl-1"><strong>Cross-referencing:</strong> Coils to contacts, sheets to sheets</li>
              <li className="pl-1"><strong>Motor control:</strong> DOL, star-delta, VSD circuits common in industry</li>
              <li className="pl-1"><strong>ST1426:</strong> Electrical schematic interpretation competence</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify and interpret BS EN 60617 graphical symbols on circuit diagrams",
              "Distinguish between power circuits and control circuits on schematics",
              "Follow signal flow conventions to understand circuit operation",
              "Use cross-referencing to trace related components across diagram sheets",
              "Apply IEC 81346 reference designation to identify equipment on drawings and on site",
              "Read and interpret common motor control circuit diagrams"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            BS EN 60617 Graphical Symbols
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS EN 60617 is the international standard that defines the graphical symbols used on electrical
              and electronic circuit diagrams. It provides a universal visual language that allows circuit
              diagrams to be read by any competent person, regardless of which country or organisation produced
              them. Mastering these symbols is fundamental to reading any electrical schematic.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Symbols for Maintenance Technicians</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Component</th>
                      <th className="border border-white/10 px-3 py-2 text-left">IEC Prefix</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Symbol Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-white/10 px-3 py-2">Motor</td><td className="border border-white/10 px-3 py-2">M</td><td className="border border-white/10 px-3 py-2">Circle with M inside</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Contactor/Relay coil</td><td className="border border-white/10 px-3 py-2">K</td><td className="border border-white/10 px-3 py-2">Rectangle (or circle) with designation</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Fuse</td><td className="border border-white/10 px-3 py-2">F</td><td className="border border-white/10 px-3 py-2">Rectangle with line through</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Circuit breaker</td><td className="border border-white/10 px-3 py-2">Q</td><td className="border border-white/10 px-3 py-2">Switch symbol with arc/trip mechanism</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Transformer</td><td className="border border-white/10 px-3 py-2">T</td><td className="border border-white/10 px-3 py-2">Two coils with core symbol</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Push button (NO)</td><td className="border border-white/10 px-3 py-2">S</td><td className="border border-white/10 px-3 py-2">Open contact with actuator arrow</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Overload relay</td><td className="border border-white/10 px-3 py-2">F</td><td className="border border-white/10 px-3 py-2">Thermal element symbol with trip contact</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Lamp/indicator</td><td className="border border-white/10 px-3 py-2">H</td><td className="border border-white/10 px-3 py-2">Circle with cross or specific lamp symbol</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Power Circuits and Control Circuits
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Most industrial and commercial electrical systems are divided into two distinct circuit types:
              the power circuit (which carries the main load current) and the control circuit (which carries
              the signals that control the power circuit). Understanding this separation is essential for
              systematic fault-finding.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Power Circuit</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Carries main load current (amps to hundreds of amps)</li>
                  <li className="pl-1">Contains: isolators, fuses, MCCBs, contactors, overloads, motors</li>
                  <li className="pl-1">Typically drawn with thicker lines</li>
                  <li className="pl-1">Three-phase: L1, L2, L3 supply to load</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Control Circuit</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Carries signal current (milliamps to a few amps)</li>
                  <li className="pl-1">Contains: push buttons, selectors, relays, timers, PLCs, interlocks</li>
                  <li className="pl-1">Typically drawn with thinner lines</li>
                  <li className="pl-1">Often at reduced voltage (24 V DC or 110 V AC)</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Fault-Finding Implication</p>
              <p className="text-sm text-white">
                When a motor fails to start, the fault is more often in the control circuit than the power
                circuit. A tripped overload, a faulty push button, a broken interlock, or a failed timer in the
                control circuit will prevent the contactor from energising — even though the power circuit is
                completely healthy. Always check both circuits systematically.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Signal Flow and Cross-Referencing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Circuit diagrams follow conventions for signal flow that make them logical to read. Understanding
              these conventions allows you to trace the operation of any circuit from input to output, which is
              the foundation of systematic fault-finding.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Signal Flow Conventions</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Left to right:</strong> Input signals on the left, outputs on the right</li>
                <li className="pl-1"><strong>Top to bottom:</strong> Supply at top, earth/return at bottom</li>
                <li className="pl-1"><strong>Power flow:</strong> Supply lines (L1, L2, L3) typically horizontal at top</li>
                <li className="pl-1"><strong>Control logic:</strong> Read vertically down between supply rails, left to right for sequence</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cross-Referencing System</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Coil to contacts:</strong> A relay coil shows references to where its contacts are used</li>
                <li className="pl-1"><strong>Sheet references:</strong> Components spanning multiple sheets show sheet/column references</li>
                <li className="pl-1"><strong>Contact mirror:</strong> A table below the coil symbol lists all its contacts with their locations</li>
                <li className="pl-1"><strong>Terminal references:</strong> Link circuit diagram designations to physical terminal numbers</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            IEC 81346 Reference Designation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              IEC 81346 provides a hierarchical reference designation system that gives every item in an
              installation a unique identifier. This system links what you see on the circuit diagram to what
              you see labelled on the equipment in the field. Understanding it is essential for navigating
              between drawings and physical equipment.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common IEC 81346 Prefix Letters</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Letter</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Component Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-white/10 px-3 py-2">M</td><td className="border border-white/10 px-3 py-2">Motor</td><td className="border border-white/10 px-3 py-2">M101 — motor number 101</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">K</td><td className="border border-white/10 px-3 py-2">Relay, contactor</td><td className="border border-white/10 px-3 py-2">KM1 — main contactor 1</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Q</td><td className="border border-white/10 px-3 py-2">Circuit breaker, switch-disconnector</td><td className="border border-white/10 px-3 py-2">Q1 — main isolator</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">F</td><td className="border border-white/10 px-3 py-2">Fuse, protective device</td><td className="border border-white/10 px-3 py-2">F1 — control circuit fuse</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">S</td><td className="border border-white/10 px-3 py-2">Switch, selector, push button</td><td className="border border-white/10 px-3 py-2">S1 — start button</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">T</td><td className="border border-white/10 px-3 py-2">Transformer</td><td className="border border-white/10 px-3 py-2">T1 — control transformer</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">H</td><td className="border border-white/10 px-3 py-2">Indicator, lamp, alarm</td><td className="border border-white/10 px-3 py-2">H1 — run indicator lamp</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The maintenance technician standard requires competence in
              interpreting electrical schematics and identifying equipment using reference designations.
              This is a core skill for fault-finding, reporting, and maintenance record-keeping.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 my-12" />

        <section className="mb-10">
          <Quiz title="Test Your Knowledge" questions={quizQuestions} />
        </section>

        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module6-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section Overview
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module6-section2-2">
              Next: Single-Line Diagrams
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default MOETModule6Section2_1;
