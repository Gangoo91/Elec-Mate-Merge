import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Zap,
  Shield,
  AlertTriangle,
  BookOpen,
  Wrench,
  RotateCcw,
  Timer,
  Activity,
  Settings,
  CheckCircle,
  Info,
  ArrowLeftRight,
  Gauge
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const IndustrialElectricalModule2Section5: React.FC = () => {
  const navigate = useNavigate();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);

  useSEO(
    'Forward/Reverse Control Wiring | Industrial Electrical Module 2 Section 5',
    'Master forward/reverse motor control including phase sequence, mechanical and electrical interlocking, reversing contactors, anti-plugging protection, VSD operation, and rotation testing per BS 7671.'
  );

  const quickCheckQuestions = [
    {
      id: 'qc1-phase-sequence',
      question: 'To reverse the direction of a three-phase induction motor, what must be done to the supply connections?',
      options: [
        'Reverse all three phase connections',
        'Swap any two of the three phase connections',
        'Reverse the neutral and earth connections',
        'Change the frequency of the supply'
      ],
      correctIndex: 1,
      explanation: 'Reversing any two of the three phase connections (e.g., swapping L1 and L2 while L3 remains the same) reverses the rotating magnetic field direction, causing the motor to run in the opposite direction. This is the fundamental principle behind all reversing starter designs.'
    },
    {
      id: 'qc2-interlocking',
      question: 'Why must both mechanical AND electrical interlocking be used in a reversing starter?',
      options: [
        'To increase motor starting torque',
        'To reduce power consumption',
        'To provide redundant protection against simultaneous contactor operation',
        'To meet EMC requirements'
      ],
      correctIndex: 2,
      explanation: 'BS 7671 and good engineering practice require both mechanical interlocking (physical barrier preventing both contactors closing) AND electrical interlocking (auxiliary contacts breaking the opposing coil circuit). This redundancy ensures that even if one method fails, the other prevents a phase-to-phase short circuit.'
    },
    {
      id: 'qc3-timing-delay',
      question: 'What is the primary purpose of a timing delay between forward and reverse operations?',
      options: [
        'To save energy during motor operation',
        'To allow the motor to coast down before reversing, preventing mechanical stress',
        'To reduce the motor starting current',
        'To synchronise with other equipment'
      ],
      correctIndex: 1,
      explanation: 'A timing delay (typically 0.5-3 seconds depending on the application) allows the motor to decelerate before the reversing contactor energises. Reversing a spinning motor without delay causes high mechanical stress on couplings, gearboxes, and the driven load, as well as extremely high current draw (up to 20× FLC).'
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: 'What is the phase sequence for clockwise rotation when viewed from the drive end using a phase rotation meter reading L1-L2-L3?',
      options: [
        'Anti-clockwise rotation',
        'Clockwise rotation (forward)',
        'No rotation - motor will not start',
        'Direction depends on motor design'
      ],
      correctAnswer: 1,
      explanation: 'A standard phase sequence of L1-L2-L3 (also called ABC or RYB) produces clockwise rotation when viewed from the drive end of the motor. This is the conventional "forward" direction for most UK industrial applications.'
    },
    {
      id: 2,
      question: 'In a reversing contactor arrangement, what type of auxiliary contact from the forward contactor is wired in series with the reverse contactor coil?',
      options: [
        'Normally open (NO) contact',
        'Normally closed (NC) contact',
        'Time-delay contact',
        'Thermal overload contact'
      ],
      correctAnswer: 1,
      explanation: 'A normally closed (NC) auxiliary contact from the forward contactor is wired in series with the reverse contactor coil. When the forward contactor is energised, this NC contact opens, breaking the circuit to the reverse coil and preventing simultaneous operation.'
    },
    {
      id: 3,
      question: 'What is the purpose of a mechanical interlock bar between forward and reverse contactors?',
      options: [
        'To reduce electrical noise',
        'To physically prevent both contactors from closing simultaneously',
        'To synchronise contactor timing',
        'To provide overload protection'
      ],
      correctAnswer: 1,
      explanation: 'The mechanical interlock bar is a physical device that prevents both contactors from being closed at the same time. If one contactor is energised, the bar physically blocks the other from closing, providing essential backup protection against phase-to-phase short circuits.'
    },
    {
      id: 4,
      question: 'What is "plugging" in the context of motor control?',
      options: [
        'Starting a motor under full load',
        'Reversing a motor while it is still running to achieve rapid braking',
        'Running a motor at reduced voltage',
        'Connecting a motor to a VSD'
      ],
      correctAnswer: 1,
      explanation: 'Plugging (also called plug braking or counter-current braking) involves reversing the motor supply while the motor is still spinning. This creates a braking torque that rapidly stops the motor, but causes very high currents and mechanical stress, requiring careful design consideration.'
    },
    {
      id: 5,
      question: 'According to BS 7671, what protection must be provided for motor circuits that may experience reverse current flow?',
      options: [
        'RCD protection only',
        'Overcurrent protection suitable for the prospective fault current',
        'Surge protection devices',
        'Type D MCBs only'
      ],
      correctAnswer: 1,
      explanation: 'BS 7671 Regulation 422.3.1 requires that motor circuits have overcurrent protection devices rated for the prospective fault current, including the high currents that can occur during reversing operations. The protection must be coordinated with contactor ratings.'
    },
    {
      id: 6,
      question: 'What is the minimum number of poles required on a reversing contactor for a three-phase motor?',
      options: [
        '2 poles',
        '3 poles',
        '4 poles',
        '6 poles (3 per contactor)'
      ],
      correctAnswer: 3,
      explanation: 'Each contactor in a reversing pair requires 3 main poles (one per phase). The reversing arrangement uses 6 main poles in total - 3 for forward and 3 for reverse - with the wiring crossed on two phases to achieve reversal.'
    },
    {
      id: 7,
      question: 'When using a VSD for forward/reverse control, how is direction change typically achieved?',
      options: [
        'By swapping the motor cable connections',
        'Via a digital input or parameter command to the drive',
        'By reversing the incoming supply phases',
        'By changing the DC bus polarity'
      ],
      correctAnswer: 1,
      explanation: 'VSDs reverse motor direction electronically by changing the firing sequence of the output inverter stage. This is controlled via digital inputs, fieldbus commands, or parameter settings. No physical contact switching is required, eliminating arc erosion and mechanical wear.'
    },
    {
      id: 8,
      question: 'What is the recommended method for testing direction of rotation before coupling a motor to its load?',
      options: [
        'Always couple first, then test',
        'Use a phase rotation meter on the supply, then briefly energise uncoupled',
        'Reverse the motor connections and hope for the best',
        'Phase rotation testing is not necessary'
      ],
      correctAnswer: 1,
      explanation: 'Best practice is to first use a phase rotation meter to check supply phase sequence, then briefly energise the uncoupled motor to visually confirm rotation direction. This prevents damage to the driven equipment from incorrect rotation, especially critical for pumps, fans, and conveyors.'
    },
    {
      id: 9,
      question: 'What happens if both forward and reverse contactors close simultaneously?',
      options: [
        'The motor runs at half speed',
        'A phase-to-phase short circuit occurs across two phases',
        'The motor becomes single-phased',
        'Nothing - the motor will not run'
      ],
      correctAnswer: 1,
      explanation: 'If both contactors close together, two phases are directly connected to each other through the crossed connections of the reversing arrangement, creating a phase-to-phase short circuit. This will cause extremely high fault currents, arc flash hazard, equipment damage, and protective device operation.'
    },
    {
      id: 10,
      question: 'In an anti-plugging circuit, what device monitors motor shaft rotation?',
      options: [
        'Current transformer',
        'Zero-speed switch or anti-plugging relay with tachometer',
        'Thermal overload relay',
        'Voltage monitoring relay'
      ],
      correctAnswer: 1,
      explanation: 'Anti-plugging protection uses a zero-speed switch (centrifugal or magnetic) mounted on the motor shaft, or an electronic anti-plugging relay with tachometer feedback. These devices prevent the reverse contactor from closing until the motor has coasted to near zero speed, protecting against excessive mechanical and electrical stress.'
    }
  ];

  const faqs = [
    {
      question: 'Why is the reversing contactor wiring "crossed" on only two phases and not all three?',
      answer: 'Swapping any two phases reverses the rotating magnetic field direction - mathematically equivalent to changing the phase sequence from ABC to ACB (or vice versa). Swapping all three phases would result in the same phase sequence relationship (ABC becomes BCA, which is still the same rotation direction), so only two phases need to be crossed. Typically L1 and L3 are crossed while L2 passes straight through, though any two phases can be chosen.'
    },
    {
      question: 'How do I size contactors for a reversing application?',
      answer: 'Reversing contactors experience higher duty than standard DOL starters due to the inductive load switching and potential plugging currents. Select contactors rated for AC-3 (normal inductive switching) or AC-4 (plugging/inching) utilisation category depending on the application. For AC-4 duty, derate the contactor by approximately 50% from its AC-3 rating. Also consider the mechanical life rating - reversing applications accumulate switching operations faster than single-direction starters.'
    },
    {
      question: 'What timing delay should I use between forward and reverse operations?',
      answer: 'The delay depends on motor and load inertia, acceptable mechanical stress, and process requirements. Typical values range from 0.5 seconds for small motors with low inertia to 3+ seconds for large motors or high-inertia loads. Some applications (conveyors, mixers) may require 5-10 seconds. Use a timer relay or VSD parameter to implement the delay, and consider installing a zero-speed switch for positive confirmation rather than relying solely on time-based delays.'
    },
    {
      question: 'Can I use a single contactor with a reversing switch instead of two contactors?',
      answer: 'While possible using a motor-rated changeover switch (typically drum switch), this approach has limitations. It cannot provide electrical interlocking, lacks remote control capability, and puts the operator at risk of arc flash if switching under load. Two-contactor arrangements with proper interlocking are preferred for all but the simplest low-power applications. Additionally, BS 7671 requires switching devices to be rated for the prospective fault current - drum switches may not meet this requirement.'
    },
    {
      question: 'How does a VSD handle forward/reverse transitions differently from contactors?',
      answer: 'VSDs offer significant advantages: controlled deceleration through regenerative braking or DC injection, precise control over acceleration/deceleration ramps, programmable delay times, elimination of high inrush currents during reversal, and no mechanical wear on switching contacts. The VSD reverses motor direction by changing the output frequency phase sequence electronically. Most drives include anti-plugging logic and can be programmed for coast-to-stop, ramp-to-stop, or dynamic braking before reversing.'
    },
    {
      question: 'What testing and documentation is required for reversing starters under BS 7671?',
      answer: 'Testing requirements include: verification of correct phase sequence using rotation meter, functional testing of both forward and reverse operations, verification of electrical and mechanical interlocks (try to close both contactors simultaneously), confirmation of timing delay operation, overload relay testing, and earth fault loop impedance measurement. Documentation should include wiring diagrams showing interlock connections, contactor specifications, timer settings, and test results. The Electrical Installation Certificate must cover the motor circuit as part of the overall installation.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] border-b border-elec-yellow/20">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-2 text-elec-yellow/70 text-sm mb-2">
            <BookOpen className="w-4 h-4" />
            <span>Industrial Electrical - Module 2 - Section 5</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-elec-yellow mb-2">
            Forward/Reverse Control Wiring
          </h1>
          <p className="text-gray-300 text-lg">
            Motor direction control, interlocking methods, and BS 7671 compliance
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">

        {/* Section 1: Phase Sequence and Rotation Direction */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center text-elec-yellow font-bold">
              1
            </div>
            <h2 className="text-2xl font-semibold text-elec-yellow">
              Phase Sequence and Rotation Direction
            </h2>
          </div>

          <div className="bg-[#2a2a2a] rounded-lg p-6 space-y-4">
            <div className="flex items-start gap-3">
              <RotateCcw className="w-6 h-6 text-elec-yellow flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Understanding Three-Phase Rotation</h3>
                <p className="text-gray-300 leading-relaxed">
                  Three-phase induction motors rotate because the stator windings create a rotating magnetic field.
                  The <strong className="text-elec-yellow">phase sequence</strong> (order in which phases reach their
                  peak voltage) determines the direction of this rotating field, and thus the motor rotation direction.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-green-500/30">
                <h4 className="text-green-400 font-medium mb-2 flex items-center gap-2">
                  <ArrowLeftRight className="w-4 h-4" />
                  Standard Sequence (L1-L2-L3)
                </h4>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>- Also known as ABC, RYB, or positive sequence</li>
                  <li>- Produces clockwise rotation (viewed from drive end)</li>
                  <li>- Conventional "forward" direction in UK</li>
                  <li>- Phase rotation meter shows clockwise indicator</li>
                </ul>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-orange-500/30">
                <h4 className="text-orange-400 font-medium mb-2 flex items-center gap-2">
                  <ArrowLeftRight className="w-4 h-4 rotate-180" />
                  Reversed Sequence (L1-L3-L2)
                </h4>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>- Also known as ACB, RBY, or negative sequence</li>
                  <li>- Produces anti-clockwise rotation</li>
                  <li>- Achieved by swapping any two phases</li>
                  <li>- Phase rotation meter shows anti-clockwise indicator</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 mt-4">
              <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                <Gauge className="w-5 h-5 text-elec-yellow" />
                Using a Phase Rotation Meter
              </h4>
              <div className="space-y-3 text-gray-300 text-sm">
                <p>
                  A phase rotation meter (phase sequence indicator) is essential for verifying supply phase sequence
                  before connecting motors. Connect the instrument leads to L1, L2, and L3 - the rotating disc or
                  LED indication shows the rotation direction that a motor would produce.
                </p>
                <div className="bg-[#2a2a2a] rounded p-3 border-l-4 border-elec-yellow">
                  <p className="text-elec-yellow font-medium">Key Points:</p>
                  <ul className="mt-2 space-y-1">
                    <li>- Always test phase sequence before first energisation</li>
                    <li>- Document the supply phase sequence in commissioning records</li>
                    <li>- Mark motor terminals clearly with rotation direction</li>
                    <li>- BS 7671 Regulation 526.3 requires correct conductor identification</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mt-4">
              <div className="flex items-start gap-2">
                <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-blue-400 font-medium">Motor Terminal Markings</h4>
                  <p className="text-gray-300 text-sm mt-1">
                    Standard motor terminals are marked U1, V1, W1 (or U, V, W in older notation). Connecting
                    L1 to U1, L2 to V1, and L3 to W1 with a positive phase sequence produces clockwise rotation
                    when viewed from the drive end. This is the IEC 60034 standard convention.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Check 1 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Mechanical and Electrical Interlocking */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center text-elec-yellow font-bold">
              2
            </div>
            <h2 className="text-2xl font-semibold text-elec-yellow">
              Mechanical and Electrical Interlocking
            </h2>
          </div>

          <div className="bg-[#2a2a2a] rounded-lg p-6 space-y-4">
            <p className="text-gray-300 leading-relaxed">
              Interlocking prevents both forward and reverse contactors from closing simultaneously, which would
              cause a <strong className="text-elec-yellow">phase-to-phase short circuit</strong> through the
              crossed phase connections. BS 7671 and IEC standards require redundant protection using both methods.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="text-elec-yellow font-medium mb-3 flex items-center gap-2">
                  <Wrench className="w-5 h-5" />
                  Mechanical Interlocking
                </h4>
                <div className="space-y-3">
                  <p className="text-gray-300 text-sm">
                    A physical linkage between contactors that prevents simultaneous operation:
                  </p>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      Interlock bar/slide mechanism between contactors
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      Spring-loaded rocker prevents both armatures closing
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      Factory-fitted on reversing contactor assemblies
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      Works even with welded contacts or control circuit faults
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="text-elec-yellow font-medium mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Electrical Interlocking
                </h4>
                <div className="space-y-3">
                  <p className="text-gray-300 text-sm">
                    Control circuit wiring using auxiliary contacts:
                  </p>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      NC contact from forward contactor in reverse coil circuit
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      NC contact from reverse contactor in forward coil circuit
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      Provides positive de-energisation of opposing coil
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      Can include timing relays for coast-down delay
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 mt-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-red-400 font-medium">Critical Safety Requirement</h4>
                  <p className="text-gray-300 text-sm mt-1">
                    Never rely on a single method of interlocking. Mechanical interlocking protects against
                    electrical failures (welded contacts, relay failures), while electrical interlocking
                    provides the primary control logic. Both methods together provide the required level of
                    safety per BS EN 60204-1 (Safety of machinery - Electrical equipment).
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 mt-4">
              <h4 className="text-white font-medium mb-3">Interlocking Circuit Diagram (Simplified)</h4>
              <div className="bg-[#2a2a2a] rounded p-4 font-mono text-sm text-gray-300 overflow-x-auto">
                <pre>{`Forward Circuit:
  L ──[FWD Button]──[REV NC aux]──[OL NC]──(KM1 Coil)
                           │
                    [FWD NO aux] (Hold-in)

Reverse Circuit:
  L ──[REV Button]──[FWD NC aux]──[OL NC]──(KM2 Coil)
                           │
                    [REV NO aux] (Hold-in)

Note: Both circuits share common STOP button and OL contact`}</pre>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Check 2 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Reversing Contactor Arrangements */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center text-elec-yellow font-bold">
              3
            </div>
            <h2 className="text-2xl font-semibold text-elec-yellow">
              Reversing Contactor Arrangements
            </h2>
          </div>

          <div className="bg-[#2a2a2a] rounded-lg p-6 space-y-4">
            <div className="flex items-start gap-3">
              <Settings className="w-6 h-6 text-elec-yellow flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Power Circuit Configuration</h3>
                <p className="text-gray-300 leading-relaxed">
                  The reversing starter uses two contactors wired so that one provides normal phase sequence
                  and the other provides reversed sequence. Only two phases need to be crossed - typically
                  L1 and L3 are swapped while L2 passes through both contactors unchanged.
                </p>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 mt-4">
              <h4 className="text-white font-medium mb-3">Standard Wiring Arrangement</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-[#2a2a2a] rounded p-4">
                  <h5 className="text-green-400 font-medium mb-2">Forward Contactor (KM1)</h5>
                  <div className="font-mono text-sm text-gray-300 space-y-1">
                    <p>L1 ────→ U (Motor)</p>
                    <p>L2 ────→ V (Motor)</p>
                    <p>L3 ────→ W (Motor)</p>
                  </div>
                  <p className="text-gray-400 text-xs mt-2">Direct connection - normal sequence</p>
                </div>
                <div className="bg-[#2a2a2a] rounded p-4">
                  <h5 className="text-orange-400 font-medium mb-2">Reverse Contactor (KM2)</h5>
                  <div className="font-mono text-sm text-gray-300 space-y-1">
                    <p>L1 ────→ W (Motor) <span className="text-orange-400">← Crossed</span></p>
                    <p>L2 ────→ V (Motor)</p>
                    <p>L3 ────→ U (Motor) <span className="text-orange-400">← Crossed</span></p>
                  </div>
                  <p className="text-gray-400 text-xs mt-2">L1 and L3 swapped - reversed sequence</p>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 mt-4">
              <h4 className="text-white font-medium mb-3">Component Selection Criteria</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-elec-yellow/20 flex items-center justify-center text-elec-yellow font-bold text-sm flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h5 className="text-elec-yellow font-medium">Contactor Rating</h5>
                    <p className="text-gray-300 text-sm">
                      Select AC-3 rated for normal reversing duty, or AC-4 rated for plugging/inching
                      applications. AC-4 rating is typically 50% of AC-3 rating.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-elec-yellow/20 flex items-center justify-center text-elec-yellow font-bold text-sm flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h5 className="text-elec-yellow font-medium">Overload Protection</h5>
                    <p className="text-gray-300 text-sm">
                      Single thermal or electronic overload relay protects both directions.
                      Position after motor terminals (common to both contactors).
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-elec-yellow/20 flex items-center justify-center text-elec-yellow font-bold text-sm flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h5 className="text-elec-yellow font-medium">Auxiliary Contacts</h5>
                    <p className="text-gray-300 text-sm">
                      Minimum 1 NC for electrical interlock plus 1 NO for holding circuit.
                      Additional contacts may be needed for status indication and PLC feedback.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4 mt-4">
              <h4 className="text-yellow-400 font-medium flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Pre-Assembled Reversing Starters
              </h4>
              <p className="text-gray-300 text-sm mt-2">
                Manufacturers offer pre-assembled reversing starter units with factory-fitted mechanical
                interlocking and pre-wired electrical interlocks. These are preferred for reliability
                and compliance, and are available as standard catalogue items from major manufacturers
                (Schneider TeSys, ABB AF, Siemens SIRIUS, Eaton DILM).
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Anti-Plugging and Coast-to-Stop Protection */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center text-elec-yellow font-bold">
              4
            </div>
            <h2 className="text-2xl font-semibold text-elec-yellow">
              Anti-Plugging and Coast-to-Stop Protection
            </h2>
          </div>

          <div className="bg-[#2a2a2a] rounded-lg p-6 space-y-4">
            <div className="flex items-start gap-3">
              <Shield className="w-6 h-6 text-elec-yellow flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Protecting Against Plugging Stress</h3>
                <p className="text-gray-300 leading-relaxed">
                  Plugging (reversing a spinning motor) subjects the motor, drive train, and electrical system
                  to extreme stress. The combined motor speed and reverse field torque can draw currents of
                  <strong className="text-elec-yellow"> 15-20 times full load current</strong>, and mechanical
                  shock loads can damage couplings, gearboxes, and driven equipment.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4 border-t-4 border-elec-yellow">
                <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                  <Timer className="w-5 h-5 text-elec-yellow" />
                  Time-Based Delay
                </h4>
                <p className="text-gray-300 text-sm mb-3">
                  Simple timer relay prevents immediate reversal:
                </p>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>- On-delay timer starts when contactor de-energises</li>
                  <li>- Blocks opposite contactor until delay expires</li>
                  <li>- Typical delays: 0.5s - 5s depending on inertia</li>
                  <li>- Does not confirm actual motor stoppage</li>
                </ul>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4 border-t-4 border-green-500">
                <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-green-400" />
                  Zero-Speed Switch
                </h4>
                <p className="text-gray-300 text-sm mb-3">
                  Speed-sensing device confirms motor has stopped:
                </p>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>- Centrifugal or magnetic switch on motor shaft</li>
                  <li>- Contact closes below set speed (typically 10% FLS)</li>
                  <li>- Positive confirmation of safe reversal condition</li>
                  <li>- Preferred for high-inertia or critical applications</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 mt-4">
              <h4 className="text-white font-medium mb-3">Anti-Plugging Relay Operation</h4>
              <p className="text-gray-300 text-sm mb-4">
                Electronic anti-plugging relays combine speed sensing with control logic:
              </p>
              <div className="space-y-3">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h5 className="text-blue-400 font-medium">Speed Feedback</h5>
                  <p className="text-gray-300 text-sm">
                    Tachometer, encoder, or proximity sensor provides shaft speed signal.
                    Relay monitors direction and speed continuously.
                  </p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h5 className="text-green-400 font-medium">Reversal Permission</h5>
                  <p className="text-gray-300 text-sm">
                    Output contact only closes when speed is below set threshold.
                    This contact is wired in series with the reverse contactor coil.
                  </p>
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <h5 className="text-orange-400 font-medium">Coast-Down Monitoring</h5>
                  <p className="text-gray-300 text-sm">
                    Some relays include coast-time monitoring - if motor takes longer than
                    expected to stop, an alarm indicates possible mechanical binding or brake failure.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mt-4">
              <h4 className="text-blue-400 font-medium flex items-center gap-2">
                <Info className="w-5 h-5" />
                Application Considerations
              </h4>
              <p className="text-gray-300 text-sm mt-2">
                Anti-plugging protection is essential for: conveyors with heavy loads, fans with high inertia,
                pumps with non-return valves, hoists and cranes, and any application where reverse rotation
                under load could cause damage. For applications requiring rapid braking, consider DC injection
                braking or regenerative drives rather than plugging.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Check 3 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 5: VSD Forward/Reverse Operation */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center text-elec-yellow font-bold">
              5
            </div>
            <h2 className="text-2xl font-semibold text-elec-yellow">
              VSD Forward/Reverse Operation
            </h2>
          </div>

          <div className="bg-[#2a2a2a] rounded-lg p-6 space-y-4">
            <div className="flex items-start gap-3">
              <Settings className="w-6 h-6 text-elec-yellow flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Electronic Reversal Advantages</h3>
                <p className="text-gray-300 leading-relaxed">
                  Variable Speed Drives (VSDs/VFDs) reverse motor direction electronically by changing the
                  output phase sequence in the inverter stage. This eliminates mechanical contactors for
                  direction control, providing smooth, controlled transitions without arc erosion or
                  mechanical wear.
                </p>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 mt-4">
              <h4 className="text-white font-medium mb-3">VSD Reversal Methods</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="bg-[#2a2a2a] rounded p-3">
                    <h5 className="text-elec-yellow font-medium mb-1">Digital Input Control</h5>
                    <p className="text-gray-300 text-sm">
                      Dedicated forward and reverse digital inputs. Only one active at a time,
                      with logic to handle simultaneous inputs (priority or stop).
                    </p>
                  </div>
                  <div className="bg-[#2a2a2a] rounded p-3">
                    <h5 className="text-elec-yellow font-medium mb-1">Bipolar Speed Reference</h5>
                    <p className="text-gray-300 text-sm">
                      Analogue input where positive voltage = forward, negative = reverse.
                      Common with 4-20mA or 0-10V signals centred at 50%/0V.
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-[#2a2a2a] rounded p-3">
                    <h5 className="text-elec-yellow font-medium mb-1">Fieldbus Command</h5>
                    <p className="text-gray-300 text-sm">
                      Control word bit or register value via Modbus, PROFIBUS, EtherNet/IP,
                      or other industrial protocol from PLC/SCADA.
                    </p>
                  </div>
                  <div className="bg-[#2a2a2a] rounded p-3">
                    <h5 className="text-elec-yellow font-medium mb-1">Keypad/Parameter</h5>
                    <p className="text-gray-300 text-sm">
                      Manual selection via drive keypad or configuration parameter.
                      Used for commissioning or fixed-direction applications.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 mt-4">
              <h4 className="text-white font-medium mb-3">Key VSD Parameters for Reversing</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-300">Reverse Enable/Disable</span>
                  <span className="text-elec-yellow">Prevents unintended reversal</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-300">Deceleration Time</span>
                  <span className="text-elec-yellow">Ramp-down before reversal</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-300">Reversal Delay</span>
                  <span className="text-elec-yellow">Hold time at zero speed</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-300">Stop Mode</span>
                  <span className="text-elec-yellow">Coast/Ramp/DC Brake before reverse</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-300">Flying Start Enable</span>
                  <span className="text-elec-yellow">Catch spinning motor (if required)</span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                <h4 className="text-green-400 font-medium mb-2">VSD Advantages</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>- No contact wear or arc erosion</li>
                  <li>- Controlled acceleration/deceleration ramps</li>
                  <li>- Regenerative braking capability</li>
                  <li>- Built-in anti-plugging logic</li>
                  <li>- Reduced mechanical stress</li>
                  <li>- Soft starting in both directions</li>
                </ul>
              </div>
              <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
                <h4 className="text-yellow-400 font-medium mb-2">Considerations</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>- Higher initial cost than contactors</li>
                  <li>- Requires EMC filtering</li>
                  <li>- Motor cable length limits apply</li>
                  <li>- May need output reactor/filter</li>
                  <li>- Harmonic mitigation may be needed</li>
                  <li>- Specialist commissioning required</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Testing Direction of Rotation */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center text-elec-yellow font-bold">
              6
            </div>
            <h2 className="text-2xl font-semibold text-elec-yellow">
              Testing Direction of Rotation
            </h2>
          </div>

          <div className="bg-[#2a2a2a] rounded-lg p-6 space-y-4">
            <div className="flex items-start gap-3">
              <Gauge className="w-6 h-6 text-elec-yellow flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Pre-Commissioning Verification</h3>
                <p className="text-gray-300 leading-relaxed">
                  Verifying correct rotation direction before coupling a motor to its load is essential.
                  Incorrect rotation can cause serious damage to pumps (impeller damage, seal failure),
                  fans (blade damage, inefficient operation), and conveyors (product spillage, belt tracking issues).
                </p>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 mt-4">
              <h4 className="text-white font-medium mb-3">Testing Procedure</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow flex items-center justify-center text-[#1a1a1a] font-bold text-sm flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h5 className="text-elec-yellow font-medium">Verify Supply Phase Sequence</h5>
                    <p className="text-gray-300 text-sm">
                      Connect phase rotation meter to incoming supply (L1, L2, L3). Record the indicated
                      rotation direction in commissioning documentation. This establishes the baseline
                      before motor connection.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow flex items-center justify-center text-[#1a1a1a] font-bold text-sm flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h5 className="text-elec-yellow font-medium">Ensure Motor is Uncoupled</h5>
                    <p className="text-gray-300 text-sm">
                      Confirm the motor is disconnected from the driven load. Remove coupling guard
                      if fitted to allow visual observation of shaft rotation. Ensure no personnel
                      are near rotating parts.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow flex items-center justify-center text-[#1a1a1a] font-bold text-sm flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h5 className="text-elec-yellow font-medium">Brief Energisation ("Bump" Test)</h5>
                    <p className="text-gray-300 text-sm">
                      Momentarily energise the motor using the start button and immediately release.
                      Observe the shaft rotation direction during coast-down. The brief energisation
                      minimises stress while providing clear visual confirmation.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow flex items-center justify-center text-[#1a1a1a] font-bold text-sm flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h5 className="text-elec-yellow font-medium">Compare to Required Direction</h5>
                    <p className="text-gray-300 text-sm">
                      Check the driven equipment requirements - pumps usually show required rotation
                      direction on the casing, fans have directional arrows, conveyors have process
                      flow requirements. If incorrect, swap any two motor connections.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow flex items-center justify-center text-[#1a1a1a] font-bold text-sm flex-shrink-0">
                    5
                  </div>
                  <div>
                    <h5 className="text-elec-yellow font-medium">Test Both Directions (Reversing Starters)</h5>
                    <p className="text-gray-300 text-sm">
                      For reversing applications, bump test both forward and reverse operations.
                      Verify interlocking by attempting to start reverse while forward is held
                      (should be prevented). Document both directions in commissioning records.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 mt-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-red-400 font-medium">Safety Precautions</h4>
                  <ul className="text-gray-300 text-sm mt-2 space-y-1">
                    <li>- Never bump test a coupled motor without confirming the load can accept reverse rotation</li>
                    <li>- Ensure all personnel are clear of rotating parts and pinch points</li>
                    <li>- Verify lockout/tagout procedures are in place if working on connected equipment</li>
                    <li>- Use non-contact rotation direction indicator if shaft cannot be observed directly</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mt-4">
              <h4 className="text-blue-400 font-medium flex items-center gap-2">
                <Info className="w-5 h-5" />
                BS 7671 Requirements
              </h4>
              <p className="text-gray-300 text-sm mt-2">
                Regulation 526.3 requires correct conductor identification. Motor connections must be
                clearly marked and documented. Schedule of Test Results should include verification
                of correct rotation direction for motor circuits. The Electrical Installation Certificate
                must confirm the installation is safe for continued use, which includes motor direction
                verification for applications where incorrect rotation could cause danger.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 rounded-lg p-6 border border-elec-yellow/30">
          <h2 className="text-xl font-bold text-elec-yellow mb-4 flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            Quick Reference Card
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-white font-medium mb-2">Key Principles</h3>
              <ul className="text-gray-300 text-sm space-y-1">
                <li><span className="text-elec-yellow">Reversal:</span> Swap any two of three phases</li>
                <li><span className="text-elec-yellow">Standard sequence:</span> L1-L2-L3 = Clockwise</li>
                <li><span className="text-elec-yellow">Interlocking:</span> Both mechanical AND electrical required</li>
                <li><span className="text-elec-yellow">Timing delay:</span> 0.5-5s typical coast-down</li>
                <li><span className="text-elec-yellow">Plugging current:</span> Up to 20x FLC</li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-medium mb-2">Contactor Ratings</h3>
              <ul className="text-gray-300 text-sm space-y-1">
                <li><span className="text-elec-yellow">AC-3:</span> Normal inductive switching</li>
                <li><span className="text-elec-yellow">AC-4:</span> Plugging/inching (50% of AC-3)</li>
                <li><span className="text-elec-yellow">Auxiliary:</span> Min 1 NC + 1 NO per contactor</li>
                <li><span className="text-elec-yellow">Overload:</span> Single unit after motor terminals</li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-medium mb-2">Testing Sequence</h3>
              <ul className="text-gray-300 text-sm space-y-1">
                <li><span className="text-elec-yellow">1.</span> Phase rotation meter on supply</li>
                <li><span className="text-elec-yellow">2.</span> Confirm motor uncoupled</li>
                <li><span className="text-elec-yellow">3.</span> Bump test - observe direction</li>
                <li><span className="text-elec-yellow">4.</span> Verify interlock operation</li>
                <li><span className="text-elec-yellow">5.</span> Document in commissioning records</li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-medium mb-2">BS 7671 References</h3>
              <ul className="text-gray-300 text-sm space-y-1">
                <li><span className="text-elec-yellow">Reg 422.3:</span> Motor circuit protection</li>
                <li><span className="text-elec-yellow">Reg 526.3:</span> Conductor identification</li>
                <li><span className="text-elec-yellow">Section 537:</span> Isolation and switching</li>
                <li><span className="text-elec-yellow">BS EN 60204-1:</span> Machine safety (interlocking)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-elec-yellow flex items-center gap-2">
            <Info className="w-6 h-6" />
            Frequently Asked Questions
          </h2>

          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-[#2a2a2a] rounded-lg overflow-hidden border border-gray-700"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-4 text-left min-h-[44px] touch-manipulation hover:bg-[#333333] transition-colors"
                >
                  <span className="text-white font-medium pr-4">{faq.question}</span>
                  {expandedFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                  )}
                </button>
                {expandedFAQ === index && (
                  <div className="px-4 pb-4 border-t border-gray-700">
                    <p className="text-gray-300 pt-4 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <section className="space-y-4">
          <div className="bg-[#2a2a2a] rounded-lg p-6">
            <h2 className="text-2xl font-bold text-elec-yellow mb-4">
              Section 5 Knowledge Check
            </h2>
            <p className="text-gray-300 mb-6">
              Test your understanding of forward/reverse control wiring with this 10-question quiz
              covering phase sequence, interlocking methods, VSD operation, and BS 7671 requirements.
            </p>

            {!showQuiz ? (
              <Button
                onClick={() => setShowQuiz(true)}
                className="bg-elec-yellow text-black hover:bg-elec-yellow/90 min-h-[44px] touch-manipulation font-medium"
              >
                Start Quiz
              </Button>
            ) : (
              <Quiz
                questions={quizQuestions}
                title="Forward/Reverse Control Quiz"
              />
            )}
          </div>
        </section>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row justify-between gap-4 pt-8 border-t border-gray-700">
          <Button
            onClick={() => navigate('/upskilling/industrial-electrical-module-2/section-4')}
            variant="outline"
            className="flex items-center gap-2 min-h-[44px] touch-manipulation border-gray-600 text-gray-300 hover:bg-[#2a2a2a] hover:text-white"
          >
            <ChevronLeft className="w-5 h-5" />
            <div className="text-left">
              <div className="text-xs text-gray-500">Previous</div>
              <div>Section 4: Star-Delta Starters</div>
            </div>
          </Button>

          <Button
            onClick={() => navigate('/upskilling/industrial-electrical-module-2/section-6')}
            className="flex items-center gap-2 min-h-[44px] touch-manipulation bg-elec-yellow text-black hover:bg-elec-yellow/90"
          >
            <div className="text-right">
              <div className="text-xs opacity-70">Next</div>
              <div>Section 6: Braking Methods</div>
            </div>
            <ChevronRight className="w-5 h-5" />
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default IndustrialElectricalModule2Section5;
