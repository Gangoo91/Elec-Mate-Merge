import React, { useState } from 'react';
import { ArrowLeft, Zap, CheckCircle, AlertTriangle, HelpCircle, Settings, BookOpen, Shield, Power, Cable, Wrench, Lightbulb, FileText, ToggleLeft, CircuitBoard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import useSEO from '@/hooks/useSEO';

const IndustrialElectricalModule2Section2: React.FC = () => {
  const [showQuiz, setShowQuiz] = useState(false);

  useSEO({
    title: 'Control Circuit Diagrams and Contactors | Industrial Electrical Module 2',
    description: 'Master control circuit diagrams and contactors including IEC 60617 symbols, AC utilisation categories, seal-in circuits, and troubleshooting techniques for industrial electrical systems.',
    keywords: ['control circuit diagrams', 'contactors', 'IEC 60617', 'AC utilisation categories', 'seal-in circuits', 'industrial electrical', 'auxiliary contacts', 'control voltage']
  });

  const quickCheckQuestions = [
    {
      id: 'qc1',
      question: 'Which IEC 60617 symbol represents a normally open (NO) contact?',
      options: [
        'Two parallel lines with a diagonal line through them',
        'Two parallel lines without any line through them',
        'A circle with a cross inside',
        'A rectangle with terminals'
      ],
      correctIndex: 1,
      explanation: 'In IEC 60617, a normally open (NO) contact is represented by two parallel lines without any diagonal line. The diagonal line indicates a normally closed (NC) contact, showing the contact is held closed until actuated.'
    },
    {
      id: 'qc2',
      question: 'What AC utilisation category is appropriate for switching a squirrel cage motor under normal running conditions?',
      options: ['AC-1', 'AC-2', 'AC-3', 'AC-4'],
      correctIndex: 2,
      explanation: 'AC-3 is the correct category for starting squirrel cage motors and switching off during running. AC-4 is for more severe duty including inching and plugging. AC-1 is for non-inductive or slightly inductive loads, and AC-2 is for slip-ring motors.'
    },
    {
      id: 'qc3',
      question: 'In a seal-in circuit, what is the purpose of the auxiliary NO contact wired in parallel with the start button?',
      options: [
        'To provide motor overload protection',
        'To maintain the contactor energised after releasing the start button',
        'To allow reverse motor operation',
        'To reduce inrush current'
      ],
      correctIndex: 1,
      explanation: 'The seal-in (or hold-in) contact maintains the contactor coil circuit after the momentary start button is released. This creates a latching circuit that keeps the motor running until the stop button breaks the circuit.'
    }
  ];

  const quizQuestions = [
    {
      question: 'According to IEC 60617, what does a circle with a diagonal line through it represent in a control circuit diagram?',
      options: ['A lamp or indicator', 'A contactor coil', 'A fuse', 'A thermal overload relay'],
      correctAnswer: 'A lamp or indicator'
    },
    {
      question: 'A contactor rated AC-3 at 30A can safely switch which of the following?',
      options: ['A 30A resistive heating load', 'A 30A squirrel cage motor during normal starting', 'A 30A motor during jogging operations', 'A 30A capacitor bank'],
      correctAnswer: 'A 30A squirrel cage motor during normal starting'
    },
    {
      question: 'What is the primary advantage of using 24V AC control voltage instead of 230V AC?',
      options: ['Lower cost of control transformers', 'Reduced contact wear on push buttons', 'Enhanced safety for maintenance personnel', 'Faster contactor response time'],
      correctAnswer: 'Enhanced safety for maintenance personnel'
    },
    {
      question: 'In IEC notation, what do the numbers 13-14 typically indicate on a contactor?',
      options: ['Main power contacts', 'Normally open auxiliary contact', 'Normally closed auxiliary contact', 'Coil terminals'],
      correctAnswer: 'Normally open auxiliary contact'
    },
    {
      question: 'When sizing a control transformer, what factor must be considered for contactor coil inrush?',
      options: ['Coil inrush can be 6-10 times the sealed current', 'Coil current remains constant during pickup', 'Only the sealed VA rating matters', 'Transformer size equals total coil VA rating'],
      correctAnswer: 'Coil inrush can be 6-10 times the sealed current'
    },
    {
      question: 'What is the function of an economiser circuit in a contactor?',
      options: ['To reduce main contact wear', 'To provide soft starting', 'To reduce coil holding power after pickup', 'To enable reverse operation'],
      correctAnswer: 'To reduce coil holding power after pickup'
    },
    {
      question: 'Which auxiliary contact configuration would be used for an electrical interlock between two contactors?',
      options: ['NO contacts from each contactor in series with its own coil', 'NC contacts from each contactor in series with the other coil', 'NO contacts from each contactor in parallel', 'NC contacts in series with the main power supply'],
      correctAnswer: 'NC contacts from each contactor in series with the other coil'
    },
    {
      question: 'What does AC-4 utilisation category specifically cover?',
      options: ['Switching non-inductive loads', 'Starting slip-ring motors', 'Inching and plugging of squirrel cage motors', 'Switching transformer primary circuits'],
      correctAnswer: 'Inching and plugging of squirrel cage motors'
    },
    {
      question: 'When troubleshooting a control circuit, you measure 230V across a contactor coil but it does not pick up. The most likely cause is:',
      options: ['Open circuit in the control wiring', 'Open coil or mechanical jam', 'Faulty stop button', 'Blown control fuse'],
      correctAnswer: 'Open coil or mechanical jam'
    },
    {
      question: 'In a maintained start/stop circuit, what distinguishes it from a momentary circuit?',
      options: ['It uses larger contactors', 'The start switch remains closed to keep the contactor energised', 'It requires a seal-in contact', 'It only works with DC control voltage'],
      correctAnswer: 'The start switch remains closed to keep the contactor energised'
    }
  ];

  const faqItems = [
    {
      question: 'What is the difference between control circuit and power circuit diagrams?',
      answer: 'Control circuit diagrams show the logic and sequencing of operations using symbols for switches, relays, and contactors coils at control voltage levels (typically 24V-230V). Power circuit diagrams show the main current-carrying components including contactor main contacts, overloads, and motor connections at supply voltage. While power circuits handle the energy to drive loads, control circuits handle the intelligence that determines when and how that energy is applied. Both are essential for understanding complete motor control systems.'
    },
    {
      question: 'How do I select the correct contactor for my application?',
      answer: 'Contactor selection requires matching the AC utilisation category to your application: AC-1 for resistive/slightly inductive loads, AC-3 for normal motor starting, AC-4 for severe duty (inching/plugging). Then select current rating at or above motor FLC, verify coil voltage matches your control supply, ensure adequate auxiliary contacts are available, and consider coordination with upstream protection. Always check manufacturer derating factors for ambient temperature, switching frequency, and altitude above 1000m.'
    },
    {
      question: 'Why would I choose 24V control voltage over 230V?',
      answer: '24V control offers several advantages: enhanced personnel safety (below 50V AC threshold), ability to use longer control cable runs without voltage drop issues, compatibility with PLCs and solid-state devices, and reduced arc energy at push button contacts. However, 230V control eliminates the need for control transformers, reduces initial cost for simple installations, and provides more reliable pickup of larger contactors. The choice depends on safety requirements, system complexity, and regulatory standards for your industry.'
    },
    {
      question: 'What causes contactor chatter and how do I fix it?',
      answer: 'Contactor chatter (rapid opening and closing) typically results from: low control voltage (check transformer secondary and connections), loose or corroded coil connections, worn or contaminated pole faces preventing proper seal-in, or wrong coil voltage rating. To diagnose, measure voltage at coil terminals during pickup - it should be within plus or minus 10% of rated voltage. Also check the mechanical linkage is free and the armature gap is correct. Replace the contactor if pole face wear is excessive.'
    },
    {
      question: 'How do I calculate control transformer size for multiple contactors?',
      answer: 'Control transformer sizing must account for inrush current. Add up the sealed VA of all simultaneously energised coils, then multiply by an inrush factor (typically 3-5 for the largest contactor likely to pick up while others are sealed). For example: three contactors with 15VA sealed each (45VA total) might need a 150VA transformer to handle one large contactor picking up with two sealed. Also add VA for pilot lights and other control devices. Always size generously to prevent nuisance tripping and ensure reliable pickup.'
    },
    {
      question: 'What are the IEC terminal marking conventions for contactors?',
      answer: 'IEC 60947 specifies: Main contacts use single digits 1-2, 3-4, 5-6 (L1-T1, L2-T2, L3-T3). Auxiliary NO contacts use numbers ending in 3-4 (13-14, 23-24, etc.). Auxiliary NC contacts use numbers ending in 1-2 (11-12, 21-22, etc.). Coil terminals are marked A1 and A2. The tens digit indicates the contact number in sequence. This standardised marking allows electricians to identify contact types instantly when reading diagrams or working on equipment.'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <span className="text-xs text-muted-foreground">Module 2 &gt; Section 2</span>
        </div>
      </header>

      {/* Title */}
      <section className="max-w-3xl mx-auto px-4 pt-8 pb-6 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-elec-yellow/10 mb-4">
          <CircuitBoard className="w-6 h-6 text-elec-yellow" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          Control Circuit Diagrams and Contactors
        </h1>
        <p className="text-muted-foreground">
          Master IEC 60617 symbols, contactor selection, and control circuit design
        </p>
      </section>

      <div className="max-w-3xl mx-auto px-4 pb-12 space-y-10">
        {/* Learning Outcomes */}
        <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
          <h2 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-elec-yellow" />
            Learning Outcomes
          </h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow mt-1">&bull;</span>
              Read and interpret control circuit diagrams using IEC 60617 symbols
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow mt-1">&bull;</span>
              Select contactors based on AC utilisation categories
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow mt-1">&bull;</span>
              Understand auxiliary contact functions and IEC terminal markings
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow mt-1">&bull;</span>
              Design seal-in and maintained control circuits
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow mt-1">&bull;</span>
              Troubleshoot common control circuit faults
            </li>
          </ul>
        </div>

        {/* Section 1: Reading Control Circuit Diagrams */}
        <section>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Reading Control Circuit Diagrams
          </h2>

          <div className="space-y-4 text-muted-foreground">
            <p>
              Control circuit diagrams use standardised symbols defined by <strong className="text-foreground">IEC 60617</strong> to represent
              electrical components and their interconnections. Understanding these symbols is fundamental to interpreting and designing control systems.
            </p>

            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
              <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-elec-yellow" />
                Essential IEC 60617 Symbols
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between border-b border-white/10 pb-1">
                    <span>Normally Open Contact (NO)</span>
                    <span className="text-elec-yellow font-mono">--| |--</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-1">
                    <span>Normally Closed Contact (NC)</span>
                    <span className="text-elec-yellow font-mono">--|/|--</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-1">
                    <span>Contactor Coil</span>
                    <span className="text-elec-yellow font-mono">( )</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-1">
                    <span>Thermal Overload</span>
                    <span className="text-elec-yellow font-mono">&gt;&lt;</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between border-b border-white/10 pb-1">
                    <span>Push Button (NO)</span>
                    <span className="text-elec-yellow font-mono">-o| |--</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-1">
                    <span>Push Button (NC)</span>
                    <span className="text-elec-yellow font-mono">-o|/|--</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-1">
                    <span>Indicator Lamp</span>
                    <span className="text-elec-yellow font-mono">(X)</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-1">
                    <span>Fuse</span>
                    <span className="text-elec-yellow font-mono">--[]--</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 border-l-2 border-blue-500/50 rounded-r-lg p-4">
              <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-400" />
                Diagram Reading Conventions
              </h4>
              <ul className="space-y-1 text-sm">
                <li>&bull; Circuits are drawn in the <strong className="text-foreground">de-energised state</strong> (power off)</li>
                <li>&bull; Read diagrams from <strong className="text-foreground">left to right</strong>, top to bottom</li>
                <li>&bull; Vertical lines represent power rails (L and N or +/-)</li>
                <li>&bull; Horizontal rungs show individual control circuits</li>
                <li>&bull; Cross-references indicate related contacts on other rungs</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: Contactor Operation and Selection */}
        <section>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Contactor Operation and Selection
          </h2>

          <div className="space-y-4 text-muted-foreground">
            <p>
              Contactors are electromechanical switches designed for high-current switching applications. Proper selection requires understanding <strong className="text-foreground">AC utilisation categories</strong> defined in IEC 60947-4-1.
            </p>

            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
              <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4 text-elec-yellow" />
                AC Utilisation Categories
              </h3>
              <div className="space-y-3 text-sm">
                <div className="bg-white/5 p-3 rounded border-l-4 border-green-500">
                  <div className="font-medium text-foreground">AC-1: Non-inductive or Slightly Inductive Loads</div>
                  <p className="mt-1">Resistive heating, incandescent lighting. Make/break at rated current with power factor &gt;= 0.95</p>
                </div>
                <div className="bg-white/5 p-3 rounded border-l-4 border-blue-500">
                  <div className="font-medium text-foreground">AC-3: Squirrel Cage Motors - Normal Duty</div>
                  <p className="mt-1">Starting and switching off during running. Breaking current = rated current, recovery voltage = 20% of rated</p>
                </div>
                <div className="bg-white/5 p-3 rounded border-l-4 border-orange-500">
                  <div className="font-medium text-foreground">AC-4: Squirrel Cage Motors - Severe Duty</div>
                  <p className="mt-1">Inching, plugging, reversing. Breaking current = 6x rated, recovery voltage = 100% of rated</p>
                </div>
              </div>
            </div>

            <div className="bg-orange-500/10 border-l-2 border-orange-500/50 rounded-r-lg p-4">
              <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-400" />
                Critical Selection Factor
              </h4>
              <p className="text-sm">
                A contactor rated 30A AC-3 is <strong className="text-foreground">NOT</strong> rated 30A AC-4.
                Typical derating is 40-50% between categories. Always verify the rating matches your specific application duty cycle.
              </p>
            </div>
          </div>
        </section>

        {/* Inline Check 1 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Auxiliary Contacts and Functions */}
        <section>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Auxiliary Contacts and Their Functions
          </h2>

          <div className="space-y-4 text-muted-foreground">
            <p>
              Auxiliary contacts are low-current contacts mechanically linked to the main contactor. They provide <strong className="text-foreground">status feedback</strong> and enable <strong className="text-foreground">control logic</strong> without handling power circuit currents.
            </p>

            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
              <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
                <Settings className="w-4 h-4 text-elec-yellow" />
                IEC Terminal Marking System
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="font-medium text-elec-yellow mb-2">NO Auxiliary Contacts</div>
                  <p>Terminal numbers ending in <strong className="text-foreground">3-4</strong></p>
                  <ul className="text-muted-foreground space-y-1">
                    <li>&bull; 13-14: First NO contact</li>
                    <li>&bull; 23-24: Second NO contact</li>
                    <li>&bull; 33-34: Third NO contact</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <div className="font-medium text-elec-yellow mb-2">NC Auxiliary Contacts</div>
                  <p>Terminal numbers ending in <strong className="text-foreground">1-2</strong></p>
                  <ul className="text-muted-foreground space-y-1">
                    <li>&bull; 11-12: First NC contact</li>
                    <li>&bull; 21-22: Second NC contact</li>
                    <li>&bull; 31-32: Third NC contact</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
                <h4 className="font-medium text-foreground mb-2">Common Functions</h4>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">&bull;</span>
                    <span><strong className="text-foreground">Seal-in:</strong> NO contact bypasses start button</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">&bull;</span>
                    <span><strong className="text-foreground">Interlock:</strong> NC contact prevents opposing contactor</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">&bull;</span>
                    <span><strong className="text-foreground">Status:</strong> Drives pilot lamps or PLC inputs</span>
                  </li>
                </ul>
              </div>
              <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
                <h4 className="font-medium text-foreground mb-2">Auxiliary Contact Blocks</h4>
                <p className="text-sm">
                  Additional contacts can be added via snap-on auxiliary contact blocks. Common configurations:
                </p>
                <ul className="text-sm mt-2 space-y-1">
                  <li>&bull; 1NO + 1NC (most common)</li>
                  <li>&bull; 2NO + 2NC</li>
                  <li>&bull; 4NO or 4NC</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Inline Check 2 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 4: Control Voltage Selection */}
        <section>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Control Voltage Selection
          </h2>

          <div className="space-y-4 text-muted-foreground">
            <p>
              Selecting the appropriate control voltage affects safety, reliability, and system compatibility. Common options include <strong className="text-foreground">24V AC</strong>, <strong className="text-foreground">110V AC</strong>, and <strong className="text-foreground">230V AC</strong>.
            </p>

            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
              <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
                <Power className="w-4 h-4 text-elec-yellow" />
                Voltage Comparison
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 text-elec-yellow">Voltage</th>
                      <th className="text-left py-2 text-elec-yellow">Advantages</th>
                      <th className="text-left py-2 text-elec-yellow">Considerations</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    <tr>
                      <td className="py-2 font-medium text-foreground">24V AC</td>
                      <td className="py-2">Safety, PLC compatible, long cable runs</td>
                      <td className="py-2">Requires transformer, higher current</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium text-foreground">110V AC</td>
                      <td className="py-2">Balance of safety and power, common in US</td>
                      <td className="py-2">Transformer needed in UK/EU, less common</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium text-foreground">230V AC</td>
                      <td className="py-2">No transformer needed, lower current</td>
                      <td className="py-2">Safety risk, limited cable length, arc energy</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
              <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
                <Cable className="w-4 h-4 text-elec-yellow" />
                Control Transformer Sizing
              </h3>
              <p className="text-sm mb-3">
                Control transformers must handle both sealed load and inrush current during contactor pickup.
              </p>
              <div className="bg-white/5 p-3 rounded text-sm font-mono">
                <p className="text-elec-yellow">Transformer VA = (Sum of sealed VA) + (Largest inrush VA)</p>
                <p className="text-muted-foreground mt-2">Where: Inrush VA approximately 6-10 x Sealed VA for that contactor</p>
              </div>
              <p className="text-sm mt-3">
                <strong className="text-foreground">Example:</strong> 3 contactors at 15VA sealed each = 45VA. Add inrush for one picking up: 15VA x 6 = 90VA. Total minimum = 45 + 90 = 135VA (use 150VA transformer)
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Latching and Maintained Circuits */}
        <section>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Latching and Maintained Circuits
          </h2>

          <div className="space-y-4 text-muted-foreground">
            <p>
              Control circuits must maintain their state after operator input. Two primary methods achieve this: <strong className="text-foreground">seal-in circuits</strong> using auxiliary contacts and <strong className="text-foreground">maintained switches</strong>.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
                <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                  <ToggleLeft className="w-4 h-4 text-elec-yellow" />
                  Seal-in (Latching) Circuit
                </h4>
                <p className="text-sm mb-3">
                  Uses an auxiliary NO contact wired in parallel with the momentary start button.
                </p>
                <div className="bg-white/5 p-3 rounded text-xs font-mono text-elec-yellow">
                  <pre>{`L --+-- STOP --+-- START ---- (K1)
    |    (NC)   |   (NO)
    |           |
    +-----------+-- K1 --------+
                   (13-14)`}</pre>
                </div>
                <ul className="text-sm mt-3 space-y-1">
                  <li>&bull; START pressed - K1 energises</li>
                  <li>&bull; K1 aux (13-14) closes - bypasses START</li>
                  <li>&bull; STOP pressed - breaks circuit - K1 de-energises</li>
                </ul>
              </div>

              <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
                <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                  <ToggleLeft className="w-4 h-4 text-elec-yellow" />
                  Maintained Switch Circuit
                </h4>
                <p className="text-sm mb-3">
                  Uses a selector switch or toggle that remains in position after actuation.
                </p>
                <div className="bg-white/5 p-3 rounded text-xs font-mono text-elec-yellow">
                  <pre>{`L ---- SELECTOR ---- (K1)
         (ON/OFF)

    Position 1: OFF (open)
    Position 2: ON (closed)`}</pre>
                </div>
                <ul className="text-sm mt-3 space-y-1">
                  <li>&bull; Switch to ON - K1 energises</li>
                  <li>&bull; Switch remains - K1 stays energised</li>
                  <li>&bull; Switch to OFF - K1 de-energises</li>
                </ul>
              </div>
            </div>

            <div className="bg-green-500/10 border-l-2 border-green-500/50 rounded-r-lg p-4">
              <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-green-400" />
                Safety Consideration
              </h4>
              <p className="text-sm">
                Seal-in circuits with momentary push buttons are generally preferred for motor control because the operator must deliberately press START after a power loss. Maintained switches may cause unexpected restart, creating a safety hazard.
              </p>
            </div>
          </div>
        </section>

        {/* Inline Check 3 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 6: Troubleshooting Control Circuits */}
        <section>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Troubleshooting Control Circuits
          </h2>

          <div className="space-y-4 text-muted-foreground">
            <p>
              Systematic troubleshooting requires understanding circuit operation and using appropriate test equipment. The <strong className="text-foreground">half-split method</strong> and <strong className="text-foreground">voltage presence testing</strong> are key techniques.
            </p>

            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
              <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
                <Wrench className="w-4 h-4 text-elec-yellow" />
                Systematic Troubleshooting Steps
              </h3>
              <ol className="space-y-3 text-sm">
                <li className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow text-black flex items-center justify-center font-bold shrink-0">1</span>
                  <div>
                    <strong className="text-foreground">Verify supply voltage</strong>
                    <p>Check control transformer secondary or supply to control circuit</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow text-black flex items-center justify-center font-bold shrink-0">2</span>
                  <div>
                    <strong className="text-foreground">Check protection devices</strong>
                    <p>Control fuses, MCBs, overload relay status</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow text-black flex items-center justify-center font-bold shrink-0">3</span>
                  <div>
                    <strong className="text-foreground">Use half-split method</strong>
                    <p>Measure voltage at circuit midpoint to isolate fault to upstream or downstream</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow text-black flex items-center justify-center font-bold shrink-0">4</span>
                  <div>
                    <strong className="text-foreground">Test component operation</strong>
                    <p>Verify switches, contacts, and coils function correctly</p>
                  </div>
                </li>
              </ol>
            </div>

            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
              <h3 className="font-medium text-foreground mb-3">Common Fault Symptoms</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3 pb-3 border-b border-white/10">
                  <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-foreground">Contactor won't pick up (no click)</strong>
                    <p>No voltage at coil - trace back through series elements (stop buttons, OL contacts, interlocks)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 pb-3 border-b border-white/10">
                  <AlertTriangle className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-foreground">Voltage present but contactor won't pick up</strong>
                    <p>Check coil continuity, mechanical jam, low voltage (should be within +/- 10% of rating)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 pb-3 border-b border-white/10">
                  <AlertTriangle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-foreground">Contactor chatters or buzzes</strong>
                    <p>Low voltage, loose connections, worn pole faces, shading ring broken (AC coils)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-foreground">Contactor picks up but won't seal-in</strong>
                    <p>Check auxiliary NO contact (13-14), wiring continuity, contact condition</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-red-500/10 border-l-2 border-red-500/50 rounded-r-lg p-4">
              <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                <Shield className="w-4 h-4 text-red-400" />
                Safety Warning
              </h4>
              <p className="text-sm">
                Always isolate and lock out power circuits before working on control components. Control circuits may remain energised even when main power is off. Use appropriate PPE and follow safe isolation procedures per your site requirements.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-5 h-5 text-elec-yellow" />
            <h2 className="text-lg font-semibold text-foreground">Quick Reference Card</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h3 className="font-medium text-foreground mb-2">IEC Terminal Markings</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li>&bull; <strong className="text-elec-yellow">1-2, 3-4, 5-6:</strong> Main power contacts</li>
                <li>&bull; <strong className="text-elec-yellow">13-14, 23-24:</strong> NO auxiliary contacts</li>
                <li>&bull; <strong className="text-elec-yellow">11-12, 21-22:</strong> NC auxiliary contacts</li>
                <li>&bull; <strong className="text-elec-yellow">A1, A2:</strong> Coil terminals</li>
                <li>&bull; <strong className="text-elec-yellow">95-96, 97-98:</strong> Overload relay contacts</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-foreground mb-2">AC Utilisation Quick Guide</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li>&bull; <strong className="text-elec-yellow">AC-1:</strong> Resistive loads (cos phi &gt;= 0.95)</li>
                <li>&bull; <strong className="text-elec-yellow">AC-2:</strong> Slip-ring motor starting</li>
                <li>&bull; <strong className="text-elec-yellow">AC-3:</strong> Squirrel cage motor starting</li>
                <li>&bull; <strong className="text-elec-yellow">AC-4:</strong> Inching, plugging, reversing</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-foreground mb-2">Coil Voltage Tolerance</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li>&bull; <strong className="text-elec-yellow">Pickup:</strong> Must pick up at 85% of rated voltage</li>
                <li>&bull; <strong className="text-elec-yellow">Hold-in:</strong> Must hold at 70% of rated voltage</li>
                <li>&bull; <strong className="text-elec-yellow">Maximum:</strong> Continuous operation at 110% rated</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-foreground mb-2">Troubleshooting Checklist</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li>&bull; Control supply voltage present and correct</li>
                <li>&bull; Control fuse/MCB intact</li>
                <li>&bull; Emergency stop released</li>
                <li>&bull; Overload relay reset</li>
                <li>&bull; All interlocks satisfied</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-3">
            <HelpCircle className="w-5 h-5 text-elec-yellow" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqItems.map((faq, index) => (
              <div key={index} className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
                <h3 className="font-medium text-foreground mb-2">{faq.question}</h3>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <section className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Section Quiz</h2>
            <Button
              onClick={() => setShowQuiz(!showQuiz)}
              variant="outline"
              className="border-elec-yellow text-elec-yellow hover:bg-elec-yellow hover:text-black min-h-[44px] touch-manipulation"
            >
              {showQuiz ? 'Hide Quiz' : 'Start Quiz'}
            </Button>
          </div>

          {showQuiz && (
            <Quiz
              questions={quizQuestions}
              moduleId="industrial-electrical-2"
              sectionId="section-2"
            />
          )}
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="text-muted-foreground hover:text-foreground" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="bg-elec-yellow text-black hover:bg-elec-yellow/90" asChild>
            <Link to="/study-centre/upskilling/industrial-electrical/module-2/section-3">
              Next: Overload Protection
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default IndustrialElectricalModule2Section2;
