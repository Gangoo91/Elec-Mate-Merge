import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { Button } from '@/components/ui/button';
import Quiz from '@/components/apprentice-courses/Quiz';
import InlineCheck from '@/components/apprentice-courses/InlineCheck';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Zap,
  CircuitBoard,
  Settings,
  AlertTriangle,
  BookOpen,
  Lightbulb,
  Wrench,
  FileText,
  Shield,
  ToggleLeft,
  Power,
  Cable,
} from 'lucide-react';

const IndustrialElectricalModule2Section2: React.FC = () => {
  useSEO({
    title: 'Control Circuit Diagrams and Contactors | Industrial Electrical Module 2',
    description:
      'Master control circuit diagrams and contactors including IEC 60617 symbols, AC utilisation categories, seal-in circuits, and troubleshooting techniques for industrial electrical systems.',
    keywords: [
      'control circuit diagrams',
      'contactors',
      'IEC 60617',
      'AC utilisation categories',
      'seal-in circuits',
      'industrial electrical',
      'auxiliary contacts',
      'control voltage',
    ],
  });

  const navigate = useNavigate();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);

  const quickCheckQuestions = [
    {
      id: 'qc1',
      question:
        'Which IEC 60617 symbol represents a normally open (NO) contact?',
      options: [
        'Two parallel lines with a diagonal line through them',
        'Two parallel lines without any line through them',
        'A circle with a cross inside',
        'A rectangle with terminals',
      ],
      correctIndex: 1,
      explanation:
        'In IEC 60617, a normally open (NO) contact is represented by two parallel lines without any diagonal line. The diagonal line indicates a normally closed (NC) contact, showing the contact is held closed until actuated.',
    },
    {
      id: 'qc2',
      question:
        'What AC utilisation category is appropriate for switching a squirrel cage motor under normal running conditions?',
      options: ['AC-1', 'AC-2', 'AC-3', 'AC-4'],
      correctIndex: 2,
      explanation:
        'AC-3 is the correct category for starting squirrel cage motors and switching off during running. AC-4 is for more severe duty including inching and plugging. AC-1 is for non-inductive or slightly inductive loads, and AC-2 is for slip-ring motors.',
    },
    {
      id: 'qc3',
      question:
        'In a seal-in circuit, what is the purpose of the auxiliary NO contact wired in parallel with the start button?',
      options: [
        'To provide motor overload protection',
        'To maintain the contactor energised after releasing the start button',
        'To allow reverse motor operation',
        'To reduce inrush current',
      ],
      correctIndex: 1,
      explanation:
        'The seal-in (or hold-in) contact maintains the contactor coil circuit after the momentary start button is released. This creates a latching circuit that keeps the motor running until the stop button breaks the circuit.',
    },
  ];

  const quizQuestions = [
    {
      question:
        'According to IEC 60617, what does a circle with a diagonal line through it represent in a control circuit diagram?',
      options: [
        'A lamp or indicator',
        'A contactor coil',
        'A fuse',
        'A thermal overload relay',
      ],
      correctAnswer: 'A lamp or indicator',
    },
    {
      question:
        'A contactor rated AC-3 at 30A can safely switch which of the following?',
      options: [
        'A 30A resistive heating load',
        'A 30A squirrel cage motor during normal starting',
        'A 30A motor during jogging operations',
        'A 30A capacitor bank',
      ],
      correctAnswer: 'A 30A squirrel cage motor during normal starting',
    },
    {
      question:
        'What is the primary advantage of using 24V AC control voltage instead of 230V AC?',
      options: [
        'Lower cost of control transformers',
        'Reduced contact wear on push buttons',
        'Enhanced safety for maintenance personnel',
        'Faster contactor response time',
      ],
      correctAnswer: 'Enhanced safety for maintenance personnel',
    },
    {
      question:
        'In IEC notation, what do the numbers 13-14 typically indicate on a contactor?',
      options: [
        'Main power contacts',
        'Normally open auxiliary contact',
        'Normally closed auxiliary contact',
        'Coil terminals',
      ],
      correctAnswer: 'Normally open auxiliary contact',
    },
    {
      question:
        'When sizing a control transformer, what factor must be considered for contactor coil inrush?',
      options: [
        'Coil inrush can be 6-10 times the sealed current',
        'Coil current remains constant during pickup',
        'Only the sealed VA rating matters',
        'Transformer size equals total coil VA rating',
      ],
      correctAnswer: 'Coil inrush can be 6-10 times the sealed current',
    },
    {
      question:
        'What is the function of an economiser circuit in a contactor?',
      options: [
        'To reduce main contact wear',
        'To provide soft starting',
        'To reduce coil holding power after pickup',
        'To enable reverse operation',
      ],
      correctAnswer: 'To reduce coil holding power after pickup',
    },
    {
      question:
        'Which auxiliary contact configuration would be used for an electrical interlock between two contactors?',
      options: [
        'NO contacts from each contactor in series with its own coil',
        'NC contacts from each contactor in series with the other coil',
        'NO contacts from each contactor in parallel',
        'NC contacts in series with the main power supply',
      ],
      correctAnswer:
        'NC contacts from each contactor in series with the other coil',
    },
    {
      question: 'What does AC-4 utilisation category specifically cover?',
      options: [
        'Switching non-inductive loads',
        'Starting slip-ring motors',
        'Inching and plugging of squirrel cage motors',
        'Switching transformer primary circuits',
      ],
      correctAnswer: 'Inching and plugging of squirrel cage motors',
    },
    {
      question:
        'When troubleshooting a control circuit, you measure 230V across a contactor coil but it does not pick up. The most likely cause is:',
      options: [
        'Open circuit in the control wiring',
        'Open coil or mechanical jam',
        'Faulty stop button',
        'Blown control fuse',
      ],
      correctAnswer: 'Open coil or mechanical jam',
    },
    {
      question:
        'In a maintained start/stop circuit, what distinguishes it from a momentary circuit?',
      options: [
        'It uses larger contactors',
        'The start switch remains closed to keep the contactor energised',
        'It requires a seal-in contact',
        'It only works with DC control voltage',
      ],
      correctAnswer:
        'The start switch remains closed to keep the contactor energised',
    },
  ];

  const faqs = [
    {
      question:
        'What is the difference between control circuit and power circuit diagrams?',
      answer:
        'Control circuit diagrams show the logic and sequencing of operations using symbols for switches, relays, and contactors coils at control voltage levels (typically 24V-230V). Power circuit diagrams show the main current-carrying components including contactor main contacts, overloads, and motor connections at supply voltage. While power circuits handle the energy to drive loads, control circuits handle the intelligence that determines when and how that energy is applied. Both are essential for understanding complete motor control systems.',
    },
    {
      question: 'How do I select the correct contactor for my application?',
      answer:
        'Contactor selection requires matching the AC utilisation category to your application: AC-1 for resistive/slightly inductive loads, AC-3 for normal motor starting, AC-4 for severe duty (inching/plugging). Then select current rating at or above motor FLC, verify coil voltage matches your control supply, ensure adequate auxiliary contacts are available, and consider coordination with upstream protection. Always check manufacturer derating factors for ambient temperature, switching frequency, and altitude above 1000m.',
    },
    {
      question: 'Why would I choose 24V control voltage over 230V?',
      answer:
        '24V control offers several advantages: enhanced personnel safety (below 50V AC threshold), ability to use longer control cable runs without voltage drop issues, compatibility with PLCs and solid-state devices, and reduced arc energy at push button contacts. However, 230V control eliminates the need for control transformers, reduces initial cost for simple installations, and provides more reliable pickup of larger contactors. The choice depends on safety requirements, system complexity, and regulatory standards for your industry.',
    },
    {
      question: 'What causes contactor chatter and how do I fix it?',
      answer:
        'Contactor chatter (rapid opening and closing) typically results from: low control voltage (check transformer secondary and connections), loose or corroded coil connections, worn or contaminated pole faces preventing proper seal-in, or wrong coil voltage rating. To diagnose, measure voltage at coil terminals during pickup - it should be within ±10% of rated voltage. Also check the mechanical linkage is free and the armature gap is correct. Replace the contactor if pole face wear is excessive.',
    },
    {
      question:
        'How do I calculate control transformer size for multiple contactors?',
      answer:
        'Control transformer sizing must account for inrush current. Add up the sealed VA of all simultaneously energised coils, then multiply by an inrush factor (typically 3-5 for the largest contactor likely to pick up while others are sealed). For example: three contactors with 15VA sealed each (45VA total) might need a 150VA transformer to handle one large contactor picking up with two sealed. Also add VA for pilot lights and other control devices. Always size generously to prevent nuisance tripping and ensure reliable pickup.',
    },
    {
      question:
        'What are the IEC terminal marking conventions for contactors?',
      answer:
        'IEC 60947 specifies: Main contacts use single digits 1-2, 3-4, 5-6 (L1-T1, L2-T2, L3-T3). Auxiliary NO contacts use numbers ending in 3-4 (13-14, 23-24, etc.). Auxiliary NC contacts use numbers ending in 1-2 (11-12, 21-22, etc.). Coil terminals are marked A1 and A2. The tens digit indicates the contact number in sequence. This standardised marking allows electricians to identify contact types instantly when reading diagrams or working on equipment.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#252525] to-[#1a1a1a] border-b border-elec-yellow/20">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <CircuitBoard className="w-8 h-8 text-elec-yellow" />
            <span className="text-elec-yellow font-medium">
              Module 2 - Section 2
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Control Circuit Diagrams and Contactors
          </h1>
          <p className="text-gray-400 mt-2">
            Master IEC 60617 symbols, contactor selection, and control circuit
            design
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Section 1: Reading Control Circuit Diagrams */}
        <section className="bg-[#252525] rounded-xl p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-elec-yellow font-bold">1</span>
            </div>
            <h2 className="text-xl font-semibold text-elec-yellow">
              Reading Control Circuit Diagrams
            </h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Control circuit diagrams use standardised symbols defined by{' '}
              <strong className="text-white">IEC 60617</strong> to represent
              electrical components and their interconnections. Understanding
              these symbols is fundamental to interpreting and designing control
              systems.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5 text-elec-yellow" />
                Essential IEC 60617 Symbols
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between border-b border-gray-700 pb-1">
                    <span>Normally Open Contact (NO)</span>
                    <span className="text-elec-yellow">—| |—</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-700 pb-1">
                    <span>Normally Closed Contact (NC)</span>
                    <span className="text-elec-yellow">—|/|—</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-700 pb-1">
                    <span>Contactor Coil</span>
                    <span className="text-elec-yellow">( )</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-700 pb-1">
                    <span>Thermal Overload</span>
                    <span className="text-elec-yellow">▷◁</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between border-b border-gray-700 pb-1">
                    <span>Push Button (NO)</span>
                    <span className="text-elec-yellow">—○| |—</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-700 pb-1">
                    <span>Push Button (NC)</span>
                    <span className="text-elec-yellow">—○|/|—</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-700 pb-1">
                    <span>Indicator Lamp</span>
                    <span className="text-elec-yellow">⊗</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-700 pb-1">
                    <span>Fuse</span>
                    <span className="text-elec-yellow">—□—</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
              <h4 className="text-blue-400 font-medium mb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Diagram Reading Conventions
              </h4>
              <ul className="space-y-1 text-sm">
                <li>
                  • Circuits are drawn in the <strong>de-energised state</strong>{' '}
                  (power off)
                </li>
                <li>
                  • Read diagrams from <strong>left to right</strong>, top to
                  bottom
                </li>
                <li>
                  • Vertical lines represent power rails (L and N or +/-)
                </li>
                <li>• Horizontal rungs show individual control circuits</li>
                <li>
                  • Cross-references indicate related contacts on other rungs
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: Contactor Operation and Selection */}
        <section className="bg-[#252525] rounded-xl p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-elec-yellow font-bold">2</span>
            </div>
            <h2 className="text-xl font-semibold text-elec-yellow">
              Contactor Operation and Selection
            </h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Contactors are electromechanical switches designed for high-current
              switching applications. Proper selection requires understanding{' '}
              <strong className="text-white">AC utilisation categories</strong>{' '}
              defined in IEC 60947-4-1.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5 text-elec-yellow" />
                AC Utilisation Categories
              </h3>
              <div className="space-y-3">
                <div className="bg-[#252525] p-3 rounded border-l-4 border-green-500">
                  <div className="font-medium text-white">
                    AC-1: Non-inductive or Slightly Inductive Loads
                  </div>
                  <p className="text-sm mt-1">
                    Resistive heating, incandescent lighting. Make/break at rated
                    current with power factor ≥0.95
                  </p>
                </div>
                <div className="bg-[#252525] p-3 rounded border-l-4 border-blue-500">
                  <div className="font-medium text-white">
                    AC-3: Squirrel Cage Motors - Normal Duty
                  </div>
                  <p className="text-sm mt-1">
                    Starting and switching off during running. Breaking current =
                    rated current, recovery voltage = 20% of rated
                  </p>
                </div>
                <div className="bg-[#252525] p-3 rounded border-l-4 border-orange-500">
                  <div className="font-medium text-white">
                    AC-4: Squirrel Cage Motors - Severe Duty
                  </div>
                  <p className="text-sm mt-1">
                    Inching, plugging, reversing. Breaking current = 6× rated,
                    recovery voltage = 100% of rated
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
              <h4 className="text-yellow-400 font-medium mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Critical Selection Factor
              </h4>
              <p className="text-sm">
                A contactor rated 30A AC-3 is{' '}
                <strong className="text-white">NOT</strong> rated 30A AC-4.
                Typical derating is 40-50% between categories. Always verify the
                rating matches your specific application duty cycle.
              </p>
            </div>

            <InlineCheck
              id={quickCheckQuestions[1].id}
              question={quickCheckQuestions[1].question}
              options={quickCheckQuestions[1].options}
              correctIndex={quickCheckQuestions[1].correctIndex}
              explanation={quickCheckQuestions[1].explanation}
            />
          </div>
        </section>

        {/* Section 3: Auxiliary Contacts and Functions */}
        <section className="bg-[#252525] rounded-xl p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-elec-yellow font-bold">3</span>
            </div>
            <h2 className="text-xl font-semibold text-elec-yellow">
              Auxiliary Contacts and Their Functions
            </h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Auxiliary contacts are low-current contacts mechanically linked to
              the main contactor. They provide{' '}
              <strong className="text-white">status feedback</strong> and enable{' '}
              <strong className="text-white">control logic</strong> without
              handling power circuit currents.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                <Settings className="w-5 h-5 text-elec-yellow" />
                IEC Terminal Marking System
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="font-medium text-elec-yellow mb-2">
                    NO Auxiliary Contacts
                  </div>
                  <p>
                    Terminal numbers ending in <strong>3-4</strong>
                  </p>
                  <ul className="text-gray-400 space-y-1">
                    <li>• 13-14: First NO contact</li>
                    <li>• 23-24: Second NO contact</li>
                    <li>• 33-34: Third NO contact</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <div className="font-medium text-elec-yellow mb-2">
                    NC Auxiliary Contacts
                  </div>
                  <p>
                    Terminal numbers ending in <strong>1-2</strong>
                  </p>
                  <ul className="text-gray-400 space-y-1">
                    <li>• 11-12: First NC contact</li>
                    <li>• 21-22: Second NC contact</li>
                    <li>• 31-32: Third NC contact</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
                <h4 className="text-white font-medium mb-2">Common Functions</h4>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>
                      <strong>Seal-in:</strong> NO contact bypasses start button
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>
                      <strong>Interlock:</strong> NC contact prevents opposing
                      contactor
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>
                      <strong>Status:</strong> Drives pilot lamps or PLC inputs
                    </span>
                  </li>
                </ul>
              </div>
              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
                <h4 className="text-white font-medium mb-2">
                  Auxiliary Contact Blocks
                </h4>
                <p className="text-sm">
                  Additional contacts can be added via snap-on auxiliary contact
                  blocks. Common configurations:
                </p>
                <ul className="text-sm mt-2 space-y-1 text-gray-400">
                  <li>• 1NO + 1NC (most common)</li>
                  <li>• 2NO + 2NC</li>
                  <li>• 4NO or 4NC</li>
                </ul>
              </div>
            </div>

            <InlineCheck
              id={quickCheckQuestions[0].id}
              question={quickCheckQuestions[0].question}
              options={quickCheckQuestions[0].options}
              correctIndex={quickCheckQuestions[0].correctIndex}
              explanation={quickCheckQuestions[0].explanation}
            />
          </div>
        </section>

        {/* Section 4: Control Voltage Selection */}
        <section className="bg-[#252525] rounded-xl p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-elec-yellow font-bold">4</span>
            </div>
            <h2 className="text-xl font-semibold text-elec-yellow">
              Control Voltage Selection
            </h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Selecting the appropriate control voltage affects safety,
              reliability, and system compatibility. Common options include{' '}
              <strong className="text-white">24V AC</strong>,{' '}
              <strong className="text-white">110V AC</strong>, and{' '}
              <strong className="text-white">230V AC</strong>.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                <Power className="w-5 h-5 text-elec-yellow" />
                Voltage Comparison
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left py-2 text-elec-yellow">
                        Voltage
                      </th>
                      <th className="text-left py-2 text-elec-yellow">
                        Advantages
                      </th>
                      <th className="text-left py-2 text-elec-yellow">
                        Considerations
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    <tr>
                      <td className="py-2 font-medium">24V AC</td>
                      <td className="py-2">
                        Safety, PLC compatible, long cable runs
                      </td>
                      <td className="py-2">
                        Requires transformer, higher current
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium">110V AC</td>
                      <td className="py-2">
                        Balance of safety and power, common in US
                      </td>
                      <td className="py-2">
                        Transformer needed in UK/EU, less common
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium">230V AC</td>
                      <td className="py-2">
                        No transformer needed, lower current
                      </td>
                      <td className="py-2">
                        Safety risk, limited cable length, arc energy
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                <Cable className="w-5 h-5 text-elec-yellow" />
                Control Transformer Sizing
              </h3>
              <p className="text-sm mb-3">
                Control transformers must handle both sealed load and inrush
                current during contactor pickup.
              </p>
              <div className="bg-[#252525] p-3 rounded text-sm font-mono">
                <p className="text-elec-yellow">
                  Transformer VA = (Sum of sealed VA) + (Largest inrush VA)
                </p>
                <p className="text-gray-400 mt-2">
                  Where: Inrush VA ≈ 6-10 × Sealed VA for that contactor
                </p>
              </div>
              <p className="text-sm mt-3 text-gray-400">
                <strong className="text-white">Example:</strong> 3 contactors at
                15VA sealed each = 45VA. Add inrush for one picking up: 15VA ×
                6 = 90VA. Total minimum = 45 + 90 = 135VA (use 150VA transformer)
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Latching and Maintained Circuits */}
        <section className="bg-[#252525] rounded-xl p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-elec-yellow font-bold">5</span>
            </div>
            <h2 className="text-xl font-semibold text-elec-yellow">
              Latching and Maintained Circuits
            </h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Control circuits must maintain their state after operator input.
              Two primary methods achieve this:{' '}
              <strong className="text-white">seal-in circuits</strong> using
              auxiliary contacts and{' '}
              <strong className="text-white">maintained switches</strong>.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
                <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                  <ToggleLeft className="w-5 h-5 text-elec-yellow" />
                  Seal-in (Latching) Circuit
                </h4>
                <p className="text-sm mb-3">
                  Uses an auxiliary NO contact wired in parallel with the
                  momentary start button.
                </p>
                <div className="bg-[#252525] p-3 rounded text-xs font-mono">
                  <pre className="text-elec-yellow">
                    {`L ──┬── STOP ──┬── START ──── (K1)
    │    (NC)   │   (NO)
    │           │
    └───────────┴── K1 ────────┘
                   (13-14)`}
                  </pre>
                </div>
                <ul className="text-sm mt-3 space-y-1 text-gray-400">
                  <li>• START pressed → K1 energises</li>
                  <li>• K1 aux (13-14) closes → bypasses START</li>
                  <li>• STOP pressed → breaks circuit → K1 de-energises</li>
                </ul>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
                <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                  <ToggleLeft className="w-5 h-5 text-elec-yellow" />
                  Maintained Switch Circuit
                </h4>
                <p className="text-sm mb-3">
                  Uses a selector switch or toggle that remains in position after
                  actuation.
                </p>
                <div className="bg-[#252525] p-3 rounded text-xs font-mono">
                  <pre className="text-elec-yellow">
                    {`L ──── SELECTOR ──── (K1)
         (ON/OFF)

    Position 1: OFF (open)
    Position 2: ON (closed)`}
                  </pre>
                </div>
                <ul className="text-sm mt-3 space-y-1 text-gray-400">
                  <li>• Switch to ON → K1 energises</li>
                  <li>• Switch remains → K1 stays energised</li>
                  <li>• Switch to OFF → K1 de-energises</li>
                </ul>
              </div>
            </div>

            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
              <h4 className="text-green-400 font-medium mb-2 flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                Safety Consideration
              </h4>
              <p className="text-sm">
                Seal-in circuits with momentary push buttons are generally
                preferred for motor control because the operator must
                deliberately press START after a power loss. Maintained switches
                may cause unexpected restart, creating a safety hazard.
              </p>
            </div>

            <InlineCheck
              id={quickCheckQuestions[2].id}
              question={quickCheckQuestions[2].question}
              options={quickCheckQuestions[2].options}
              correctIndex={quickCheckQuestions[2].correctIndex}
              explanation={quickCheckQuestions[2].explanation}
            />
          </div>
        </section>

        {/* Section 6: Troubleshooting Control Circuits */}
        <section className="bg-[#252525] rounded-xl p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-elec-yellow font-bold">6</span>
            </div>
            <h2 className="text-xl font-semibold text-elec-yellow">
              Troubleshooting Control Circuits
            </h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Systematic troubleshooting requires understanding circuit operation
              and using appropriate test equipment. The{' '}
              <strong className="text-white">half-split method</strong> and{' '}
              <strong className="text-white">voltage presence testing</strong>{' '}
              are key techniques.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                <Wrench className="w-5 h-5 text-elec-yellow" />
                Systematic Troubleshooting Steps
              </h3>
              <ol className="space-y-3 text-sm">
                <li className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-elec-yellow font-bold shrink-0">
                    1
                  </span>
                  <div>
                    <strong className="text-white">Verify supply voltage</strong>
                    <p className="text-gray-400">
                      Check control transformer secondary or supply to control
                      circuit
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-elec-yellow font-bold shrink-0">
                    2
                  </span>
                  <div>
                    <strong className="text-white">Check protection devices</strong>
                    <p className="text-gray-400">
                      Control fuses, MCBs, overload relay status
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-elec-yellow font-bold shrink-0">
                    3
                  </span>
                  <div>
                    <strong className="text-white">
                      Use half-split method
                    </strong>
                    <p className="text-gray-400">
                      Measure voltage at circuit midpoint to isolate fault to
                      upstream or downstream
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-elec-yellow font-bold shrink-0">
                    4
                  </span>
                  <div>
                    <strong className="text-white">Test component operation</strong>
                    <p className="text-gray-400">
                      Verify switches, contacts, and coils function correctly
                    </p>
                  </div>
                </li>
              </ol>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-white font-medium mb-3">Common Fault Symptoms</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3 pb-3 border-b border-gray-700">
                  <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">
                      Contactor won't pick up (no click)
                    </strong>
                    <p className="text-gray-400">
                      No voltage at coil → trace back through series elements
                      (stop buttons, OL contacts, interlocks)
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 pb-3 border-b border-gray-700">
                  <AlertTriangle className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">
                      Voltage present but contactor won't pick up
                    </strong>
                    <p className="text-gray-400">
                      Check coil continuity, mechanical jam, low voltage (should
                      be within ±10% of rating)
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 pb-3 border-b border-gray-700">
                  <AlertTriangle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">
                      Contactor chatters or buzzes
                    </strong>
                    <p className="text-gray-400">
                      Low voltage, loose connections, worn pole faces, shading
                      ring broken (AC coils)
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">
                      Contactor picks up but won't seal-in
                    </strong>
                    <p className="text-gray-400">
                      Check auxiliary NO contact (13-14), wiring continuity,
                      contact condition
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
              <h4 className="text-red-400 font-medium mb-2 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Safety Warning
              </h4>
              <p className="text-sm">
                Always isolate and lock out power circuits before working on
                control components. Control circuits may remain energised even
                when main power is off. Use appropriate PPE and follow safe
                isolation procedures per your site requirements.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="bg-gradient-to-br from-elec-yellow/10 to-elec-yellow/5 rounded-xl p-6 border border-elec-yellow/30">
          <h2 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            Quick Reference Card
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-white font-medium">IEC Terminal Markings</h3>
              <ul className="text-sm space-y-1 text-gray-300">
                <li>
                  <span className="text-elec-yellow">1-2, 3-4, 5-6:</span> Main
                  power contacts
                </li>
                <li>
                  <span className="text-elec-yellow">13-14, 23-24:</span> NO
                  auxiliary contacts
                </li>
                <li>
                  <span className="text-elec-yellow">11-12, 21-22:</span> NC
                  auxiliary contacts
                </li>
                <li>
                  <span className="text-elec-yellow">A1, A2:</span> Coil terminals
                </li>
                <li>
                  <span className="text-elec-yellow">95-96, 97-98:</span> Overload
                  relay contacts
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-white font-medium">AC Utilisation Quick Guide</h3>
              <ul className="text-sm space-y-1 text-gray-300">
                <li>
                  <span className="text-elec-yellow">AC-1:</span> Resistive loads
                  (cos φ ≥ 0.95)
                </li>
                <li>
                  <span className="text-elec-yellow">AC-2:</span> Slip-ring motor
                  starting
                </li>
                <li>
                  <span className="text-elec-yellow">AC-3:</span> Squirrel cage
                  motor starting
                </li>
                <li>
                  <span className="text-elec-yellow">AC-4:</span> Inching, plugging,
                  reversing
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-white font-medium">Coil Voltage Tolerance</h3>
              <ul className="text-sm space-y-1 text-gray-300">
                <li>
                  <span className="text-elec-yellow">Pickup:</span> Must pick up at
                  85% of rated voltage
                </li>
                <li>
                  <span className="text-elec-yellow">Hold-in:</span> Must hold at
                  70% of rated voltage
                </li>
                <li>
                  <span className="text-elec-yellow">Maximum:</span> Continuous
                  operation at 110% rated
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-white font-medium">Troubleshooting Checklist</h3>
              <ul className="text-sm space-y-1 text-gray-300">
                <li>☐ Control supply voltage present and correct</li>
                <li>☐ Control fuse/MCB intact</li>
                <li>☐ Emergency stop released</li>
                <li>☐ Overload relay reset</li>
                <li>☐ All interlocks satisfied</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="bg-[#252525] rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-elec-yellow mb-4">
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-[#1a1a1a] rounded-lg border border-gray-700 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-4 text-left min-h-[44px] touch-manipulation"
                >
                  <span className="text-white font-medium pr-4">
                    {faq.question}
                  </span>
                  {expandedFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-elec-yellow shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-elec-yellow shrink-0" />
                  )}
                </button>
                {expandedFAQ === index && (
                  <div className="px-4 pb-4 text-gray-300 text-sm border-t border-gray-700 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <section className="bg-[#252525] rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-elec-yellow">
              Section Quiz
            </h2>
            <Button
              onClick={() => setShowQuiz(!showQuiz)}
              variant="outline"
              className="min-h-[44px] touch-manipulation border-elec-yellow text-elec-yellow hover:bg-elec-yellow hover:text-black"
            >
              {showQuiz ? 'Hide Quiz' : 'Take Quiz'}
            </Button>
          </div>

          {showQuiz && (
            <Quiz
              questions={quizQuestions}
              title="Control Circuit Diagrams and Contactors"
            />
          )}
        </section>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row gap-4 justify-between pt-6 border-t border-gray-700">
          <Button
            onClick={() =>
              navigate('/upskilling/industrial-electrical/module-2/section-1')
            }
            variant="outline"
            className="min-h-[44px] touch-manipulation border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white flex items-center gap-2"
          >
            <ChevronLeft className="w-5 h-5" />
            <div className="text-left">
              <div className="text-xs text-gray-500">Previous</div>
              <div>Section 1: Motor Control Fundamentals</div>
            </div>
          </Button>

          <Button
            onClick={() =>
              navigate('/upskilling/industrial-electrical/module-2/section-3')
            }
            className="min-h-[44px] touch-manipulation bg-elec-yellow text-black hover:bg-elec-yellow/90 flex items-center gap-2"
          >
            <div className="text-right">
              <div className="text-xs text-black/60">Next</div>
              <div>Section 3: Overload Protection</div>
            </div>
            <ChevronRight className="w-5 h-5" />
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default IndustrialElectricalModule2Section2;
