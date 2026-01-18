import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';
import {
  ArrowLeft,
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

const IndustrialElectricalModule2Section5: React.FC = () => {
  const [showQuiz, setShowQuiz] = useState(false);

  useSEO({
    title: 'Forward/Reverse Control Wiring | Industrial Electrical Module 2 Section 5',
    description: 'Master forward/reverse motor control including phase sequence, mechanical and electrical interlocking, reversing contactors, anti-plugging protection, VSD operation, and rotation testing per BS 7671.',
    keywords: [
      'forward reverse control',
      'motor reversing',
      'phase sequence',
      'interlocking contactors',
      'anti-plugging',
      'VSD direction control',
      'BS 7671',
      'rotation testing'
    ],
    canonicalUrl: '/study-centre/upskilling/industrial-electrical/module-2/section-5'
  });

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
      explanation: 'A timing delay (typically 0.5-3 seconds depending on the application) allows the motor to decelerate before the reversing contactor energises. Reversing a spinning motor without delay causes high mechanical stress on couplings, gearboxes, and the driven load, as well as extremely high current draw (up to 20x FLC).'
    }
  ];

  const quizQuestions = [
    {
      question: 'What is the phase sequence for clockwise rotation when viewed from the drive end using a phase rotation meter reading L1-L2-L3?',
      options: [
        'Anti-clockwise rotation',
        'Clockwise rotation (forward)',
        'No rotation - motor will not start',
        'Direction depends on motor design'
      ],
      correctAnswer: 'Clockwise rotation (forward)'
    },
    {
      question: 'In a reversing contactor arrangement, what type of auxiliary contact from the forward contactor is wired in series with the reverse contactor coil?',
      options: [
        'Normally open (NO) contact',
        'Normally closed (NC) contact',
        'Time-delay contact',
        'Thermal overload contact'
      ],
      correctAnswer: 'Normally closed (NC) contact'
    },
    {
      question: 'What is the purpose of a mechanical interlock bar between forward and reverse contactors?',
      options: [
        'To reduce electrical noise',
        'To physically prevent both contactors from closing simultaneously',
        'To synchronise contactor timing',
        'To provide overload protection'
      ],
      correctAnswer: 'To physically prevent both contactors from closing simultaneously'
    },
    {
      question: 'What is "plugging" in the context of motor control?',
      options: [
        'Starting a motor under full load',
        'Reversing a motor while it is still running to achieve rapid braking',
        'Running a motor at reduced voltage',
        'Connecting a motor to a VSD'
      ],
      correctAnswer: 'Reversing a motor while it is still running to achieve rapid braking'
    },
    {
      question: 'According to BS 7671, what protection must be provided for motor circuits that may experience reverse current flow?',
      options: [
        'RCD protection only',
        'Overcurrent protection suitable for the prospective fault current',
        'Surge protection devices',
        'Type D MCBs only'
      ],
      correctAnswer: 'Overcurrent protection suitable for the prospective fault current'
    },
    {
      question: 'What is the minimum number of poles required on a reversing contactor for a three-phase motor?',
      options: [
        '2 poles',
        '3 poles',
        '4 poles',
        '6 poles (3 per contactor)'
      ],
      correctAnswer: '6 poles (3 per contactor)'
    },
    {
      question: 'When using a VSD for forward/reverse control, how is direction change typically achieved?',
      options: [
        'By swapping the motor cable connections',
        'Via a digital input or parameter command to the drive',
        'By reversing the incoming supply phases',
        'By changing the DC bus polarity'
      ],
      correctAnswer: 'Via a digital input or parameter command to the drive'
    },
    {
      question: 'What is the recommended method for testing direction of rotation before coupling a motor to its load?',
      options: [
        'Always couple first, then test',
        'Use a phase rotation meter on the supply, then briefly energise uncoupled',
        'Reverse the motor connections and hope for the best',
        'Phase rotation testing is not necessary'
      ],
      correctAnswer: 'Use a phase rotation meter on the supply, then briefly energise uncoupled'
    },
    {
      question: 'What happens if both forward and reverse contactors close simultaneously?',
      options: [
        'The motor runs at half speed',
        'A phase-to-phase short circuit occurs across two phases',
        'The motor becomes single-phased',
        'Nothing - the motor will not run'
      ],
      correctAnswer: 'A phase-to-phase short circuit occurs across two phases'
    },
    {
      question: 'In an anti-plugging circuit, what device monitors motor shaft rotation?',
      options: [
        'Current transformer',
        'Zero-speed switch or anti-plugging relay with tachometer',
        'Thermal overload relay',
        'Voltage monitoring relay'
      ],
      correctAnswer: 'Zero-speed switch or anti-plugging relay with tachometer'
    }
  ];

  const faqItems = [
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <span className="text-sm text-muted-foreground">Module 2 &gt; Section 5</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        {/* Title Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-elec-yellow/10 mb-2">
            <ArrowLeftRight className="w-8 h-8 text-elec-yellow" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Forward/Reverse Control Wiring
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Motor direction control, interlocking methods, and BS 7671 compliance
          </p>
        </div>

        {/* Learning Outcomes */}
        <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
          <h2 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Info className="w-4 h-4 text-elec-yellow" />
            Section Overview
          </h2>
          <p className="text-sm text-muted-foreground">
            This section covers forward/reverse motor control including phase sequence fundamentals,
            mechanical and electrical interlocking requirements, reversing contactor arrangements,
            anti-plugging protection, VSD electronic reversal, and rotation direction testing procedures
            per BS 7671.
          </p>
        </div>

        {/* Section 1: Phase Sequence and Rotation Direction */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Phase Sequence and Rotation Direction
          </h2>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 space-y-4">
            <h3 className="font-medium text-foreground flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-elec-yellow" />
              Understanding Three-Phase Rotation
            </h3>

            <p className="text-sm text-muted-foreground">
              Three-phase induction motors rotate because the stator windings create a rotating magnetic field.
              The <strong className="text-elec-yellow">phase sequence</strong> (order in which phases reach their
              peak voltage) determines the direction of this rotating field, and thus the motor rotation direction.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h4 className="text-green-400 font-medium mb-2 flex items-center gap-2">
                  <ArrowLeftRight className="w-4 h-4" />
                  Standard Sequence (L1-L2-L3)
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>- Also known as ABC, RYB, or positive sequence</li>
                  <li>- Produces clockwise rotation (viewed from drive end)</li>
                  <li>- Conventional "forward" direction in UK</li>
                  <li>- Phase rotation meter shows clockwise indicator</li>
                </ul>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                <h4 className="text-orange-400 font-medium mb-2 flex items-center gap-2">
                  <ArrowLeftRight className="w-4 h-4 rotate-180" />
                  Reversed Sequence (L1-L3-L2)
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>- Also known as ACB, RBY, or negative sequence</li>
                  <li>- Produces anti-clockwise rotation</li>
                  <li>- Achieved by swapping any two phases</li>
                  <li>- Phase rotation meter shows anti-clockwise indicator</li>
                </ul>
              </div>
            </div>

            <div className="bg-background/50 p-4 rounded-lg border border-white/10">
              <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                <Gauge className="w-4 h-4 text-elec-yellow" />
                Using a Phase Rotation Meter
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                A phase rotation meter (phase sequence indicator) is essential for verifying supply phase sequence
                before connecting motors. Connect the instrument leads to L1, L2, and L3 - the rotating disc or
                LED indication shows the rotation direction that a motor would produce.
              </p>
              <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r p-3">
                <p className="text-elec-yellow font-medium text-sm">Key Points:</p>
                <ul className="mt-2 text-sm text-muted-foreground space-y-1">
                  <li>- Always test phase sequence before first energisation</li>
                  <li>- Document the supply phase sequence in commissioning records</li>
                  <li>- Mark motor terminals clearly with rotation direction</li>
                  <li>- BS 7671 Regulation 526.3 requires correct conductor identification</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-blue-400 font-medium">Motor Terminal Markings</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Standard motor terminals are marked U1, V1, W1 (or U, V, W in older notation). Connecting
                    L1 to U1, L2 to V1, and L3 to W1 with a positive phase sequence produces clockwise rotation
                    when viewed from the drive end. This is the IEC 60034 standard convention.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Inline Check 1 */}
        <InlineCheck
          id={quickCheckQuestions[0].id}
          question={quickCheckQuestions[0].question}
          options={quickCheckQuestions[0].options}
          correctIndex={quickCheckQuestions[0].correctIndex}
          explanation={quickCheckQuestions[0].explanation}
        />

        {/* Section 2: Mechanical and Electrical Interlocking */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Mechanical and Electrical Interlocking
          </h2>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              Interlocking prevents both forward and reverse contactors from closing simultaneously, which would
              cause a <strong className="text-elec-yellow">phase-to-phase short circuit</strong> through the
              crossed phase connections. BS 7671 and IEC standards require redundant protection using both methods.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-background/50 p-4 rounded-lg border border-white/10">
                <h4 className="font-medium text-elec-yellow mb-2 flex items-center gap-2">
                  <Wrench className="w-4 h-4" />
                  Mechanical Interlocking
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  A physical linkage between contactors that prevents simultaneous operation:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
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

              <div className="bg-background/50 p-4 rounded-lg border border-white/10">
                <h4 className="font-medium text-elec-yellow mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Electrical Interlocking
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Control circuit wiring using auxiliary contacts:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
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

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-red-400 font-medium">Critical Safety Requirement</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Never rely on a single method of interlocking. Mechanical interlocking protects against
                    electrical failures (welded contacts, relay failures), while electrical interlocking
                    provides the primary control logic. Both methods together provide the required level of
                    safety per BS EN 60204-1 (Safety of machinery - Electrical equipment).
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-background/50 p-4 rounded-lg border border-white/10">
              <h4 className="font-medium text-foreground mb-3">Interlocking Circuit Diagram (Simplified)</h4>
              <div className="bg-elec-yellow/5 rounded p-4 font-mono text-xs sm:text-sm text-muted-foreground overflow-x-auto">
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

        {/* Inline Check 2 */}
        <InlineCheck
          id={quickCheckQuestions[1].id}
          question={quickCheckQuestions[1].question}
          options={quickCheckQuestions[1].options}
          correctIndex={quickCheckQuestions[1].correctIndex}
          explanation={quickCheckQuestions[1].explanation}
        />

        {/* Section 3: Reversing Contactor Arrangements */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Reversing Contactor Arrangements
          </h2>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 space-y-4">
            <h3 className="font-medium text-foreground flex items-center gap-2">
              <Settings className="w-4 h-4 text-elec-yellow" />
              Power Circuit Configuration
            </h3>

            <p className="text-sm text-muted-foreground">
              The reversing starter uses two contactors wired so that one provides normal phase sequence
              and the other provides reversed sequence. Only two phases need to be crossed - typically
              L1 and L3 are swapped while L2 passes through both contactors unchanged.
            </p>

            <div className="bg-background/50 p-4 rounded-lg border border-white/10">
              <h4 className="font-medium text-foreground mb-3">Standard Wiring Arrangement</h4>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-elec-yellow/5 rounded p-4">
                  <h5 className="text-green-400 font-medium mb-2">Forward Contactor (KM1)</h5>
                  <div className="font-mono text-sm text-muted-foreground space-y-1">
                    <p>L1 ────&gt; U (Motor)</p>
                    <p>L2 ────&gt; V (Motor)</p>
                    <p>L3 ────&gt; W (Motor)</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Direct connection - normal sequence</p>
                </div>
                <div className="bg-elec-yellow/5 rounded p-4">
                  <h5 className="text-orange-400 font-medium mb-2">Reverse Contactor (KM2)</h5>
                  <div className="font-mono text-sm text-muted-foreground space-y-1">
                    <p>L1 ────&gt; W (Motor) <span className="text-orange-400">&lt;- Crossed</span></p>
                    <p>L2 ────&gt; V (Motor)</p>
                    <p>L3 ────&gt; U (Motor) <span className="text-orange-400">&lt;- Crossed</span></p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">L1 and L3 swapped - reversed sequence</p>
                </div>
              </div>
            </div>

            <div className="bg-background/50 p-4 rounded-lg border border-white/10">
              <h4 className="font-medium text-foreground mb-3">Component Selection Criteria</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-elec-yellow/20 flex items-center justify-center text-elec-yellow font-bold text-sm flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h5 className="text-elec-yellow font-medium text-sm">Contactor Rating</h5>
                    <p className="text-sm text-muted-foreground">
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
                    <h5 className="text-elec-yellow font-medium text-sm">Overload Protection</h5>
                    <p className="text-sm text-muted-foreground">
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
                    <h5 className="text-elec-yellow font-medium text-sm">Auxiliary Contacts</h5>
                    <p className="text-sm text-muted-foreground">
                      Minimum 1 NC for electrical interlock plus 1 NO for holding circuit.
                      Additional contacts may be needed for status indication and PLC feedback.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <h4 className="text-amber-400 font-medium flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Pre-Assembled Reversing Starters
              </h4>
              <p className="text-sm text-muted-foreground mt-2">
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
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Anti-Plugging and Coast-to-Stop Protection
          </h2>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 space-y-4">
            <h3 className="font-medium text-foreground flex items-center gap-2">
              <Shield className="w-4 h-4 text-elec-yellow" />
              Protecting Against Plugging Stress
            </h3>

            <p className="text-sm text-muted-foreground">
              Plugging (reversing a spinning motor) subjects the motor, drive train, and electrical system
              to extreme stress. The combined motor speed and reverse field torque can draw currents of
              <strong className="text-elec-yellow"> 15-20 times full load current</strong>, and mechanical
              shock loads can damage couplings, gearboxes, and driven equipment.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-background/50 p-4 rounded-lg border-t-4 border-elec-yellow border-x border-b border-white/10">
                <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                  <Timer className="w-4 h-4 text-elec-yellow" />
                  Time-Based Delay
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Simple timer relay prevents immediate reversal:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>- On-delay timer starts when contactor de-energises</li>
                  <li>- Blocks opposite contactor until delay expires</li>
                  <li>- Typical delays: 0.5s - 5s depending on inertia</li>
                  <li>- Does not confirm actual motor stoppage</li>
                </ul>
              </div>

              <div className="bg-background/50 p-4 rounded-lg border-t-4 border-green-500 border-x border-b border-white/10">
                <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-green-400" />
                  Zero-Speed Switch
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Speed-sensing device confirms motor has stopped:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>- Centrifugal or magnetic switch on motor shaft</li>
                  <li>- Contact closes below set speed (typically 10% FLS)</li>
                  <li>- Positive confirmation of safe reversal condition</li>
                  <li>- Preferred for high-inertia or critical applications</li>
                </ul>
              </div>
            </div>

            <div className="bg-background/50 p-4 rounded-lg border border-white/10">
              <h4 className="font-medium text-foreground mb-3">Anti-Plugging Relay Operation</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Electronic anti-plugging relays combine speed sensing with control logic:
              </p>
              <div className="space-y-3">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h5 className="text-blue-400 font-medium text-sm">Speed Feedback</h5>
                  <p className="text-sm text-muted-foreground">
                    Tachometer, encoder, or proximity sensor provides shaft speed signal.
                    Relay monitors direction and speed continuously.
                  </p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h5 className="text-green-400 font-medium text-sm">Reversal Permission</h5>
                  <p className="text-sm text-muted-foreground">
                    Output contact only closes when speed is below set threshold.
                    This contact is wired in series with the reverse contactor coil.
                  </p>
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <h5 className="text-orange-400 font-medium text-sm">Coast-Down Monitoring</h5>
                  <p className="text-sm text-muted-foreground">
                    Some relays include coast-time monitoring - if motor takes longer than
                    expected to stop, an alarm indicates possible mechanical binding or brake failure.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="text-blue-400 font-medium flex items-center gap-2">
                <Info className="w-4 h-4" />
                Application Considerations
              </h4>
              <p className="text-sm text-muted-foreground mt-2">
                Anti-plugging protection is essential for: conveyors with heavy loads, fans with high inertia,
                pumps with non-return valves, hoists and cranes, and any application where reverse rotation
                under load could cause damage. For applications requiring rapid braking, consider DC injection
                braking or regenerative drives rather than plugging.
              </p>
            </div>
          </div>
        </section>

        {/* Inline Check 3 */}
        <InlineCheck
          id={quickCheckQuestions[2].id}
          question={quickCheckQuestions[2].question}
          options={quickCheckQuestions[2].options}
          correctIndex={quickCheckQuestions[2].correctIndex}
          explanation={quickCheckQuestions[2].explanation}
        />

        {/* Section 5: VSD Forward/Reverse Operation */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            VSD Forward/Reverse Operation
          </h2>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 space-y-4">
            <h3 className="font-medium text-foreground flex items-center gap-2">
              <Settings className="w-4 h-4 text-elec-yellow" />
              Electronic Reversal Advantages
            </h3>

            <p className="text-sm text-muted-foreground">
              Variable Speed Drives (VSDs/VFDs) reverse motor direction electronically by changing the
              output phase sequence in the inverter stage. This eliminates mechanical contactors for
              direction control, providing smooth, controlled transitions without arc erosion or
              mechanical wear.
            </p>

            <div className="bg-background/50 p-4 rounded-lg border border-white/10">
              <h4 className="font-medium text-foreground mb-3">VSD Reversal Methods</h4>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="bg-elec-yellow/5 rounded p-3">
                    <h5 className="text-elec-yellow font-medium text-sm mb-1">Digital Input Control</h5>
                    <p className="text-xs text-muted-foreground">
                      Dedicated forward and reverse digital inputs. Only one active at a time,
                      with logic to handle simultaneous inputs (priority or stop).
                    </p>
                  </div>
                  <div className="bg-elec-yellow/5 rounded p-3">
                    <h5 className="text-elec-yellow font-medium text-sm mb-1">Bipolar Speed Reference</h5>
                    <p className="text-xs text-muted-foreground">
                      Analogue input where positive voltage = forward, negative = reverse.
                      Common with 4-20mA or 0-10V signals centred at 50%/0V.
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-elec-yellow/5 rounded p-3">
                    <h5 className="text-elec-yellow font-medium text-sm mb-1">Fieldbus Command</h5>
                    <p className="text-xs text-muted-foreground">
                      Control word bit or register value via Modbus, PROFIBUS, EtherNet/IP,
                      or other industrial protocol from PLC/SCADA.
                    </p>
                  </div>
                  <div className="bg-elec-yellow/5 rounded p-3">
                    <h5 className="text-elec-yellow font-medium text-sm mb-1">Keypad/Parameter</h5>
                    <p className="text-xs text-muted-foreground">
                      Manual selection via drive keypad or configuration parameter.
                      Used for commissioning or fixed-direction applications.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-background/50 p-4 rounded-lg border border-white/10">
              <h4 className="font-medium text-foreground mb-3">Key VSD Parameters for Reversing</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-muted-foreground">Reverse Enable/Disable</span>
                  <span className="text-elec-yellow text-xs">Prevents unintended reversal</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-muted-foreground">Deceleration Time</span>
                  <span className="text-elec-yellow text-xs">Ramp-down before reversal</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-muted-foreground">Reversal Delay</span>
                  <span className="text-elec-yellow text-xs">Hold time at zero speed</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-muted-foreground">Stop Mode</span>
                  <span className="text-elec-yellow text-xs">Coast/Ramp/DC Brake before reverse</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground">Flying Start Enable</span>
                  <span className="text-elec-yellow text-xs">Catch spinning motor (if required)</span>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h4 className="text-green-400 font-medium mb-2 text-sm">VSD Advantages</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>- No contact wear or arc erosion</li>
                  <li>- Controlled acceleration/deceleration ramps</li>
                  <li>- Regenerative braking capability</li>
                  <li>- Built-in anti-plugging logic</li>
                  <li>- Reduced mechanical stress</li>
                  <li>- Soft starting in both directions</li>
                </ul>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                <h4 className="text-amber-400 font-medium mb-2 text-sm">Considerations</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
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
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Testing Direction of Rotation
          </h2>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 space-y-4">
            <h3 className="font-medium text-foreground flex items-center gap-2">
              <Gauge className="w-4 h-4 text-elec-yellow" />
              Pre-Commissioning Verification
            </h3>

            <p className="text-sm text-muted-foreground">
              Verifying correct rotation direction before coupling a motor to its load is essential.
              Incorrect rotation can cause serious damage to pumps (impeller damage, seal failure),
              fans (blade damage, inefficient operation), and conveyors (product spillage, belt tracking issues).
            </p>

            <div className="bg-background/50 p-4 rounded-lg border border-white/10">
              <h4 className="font-medium text-foreground mb-3">Testing Procedure</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow flex items-center justify-center text-black font-bold text-sm flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h5 className="text-elec-yellow font-medium text-sm">Verify Supply Phase Sequence</h5>
                    <p className="text-xs text-muted-foreground">
                      Connect phase rotation meter to incoming supply (L1, L2, L3). Record the indicated
                      rotation direction in commissioning documentation. This establishes the baseline
                      before motor connection.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow flex items-center justify-center text-black font-bold text-sm flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h5 className="text-elec-yellow font-medium text-sm">Ensure Motor is Uncoupled</h5>
                    <p className="text-xs text-muted-foreground">
                      Confirm the motor is disconnected from the driven load. Remove coupling guard
                      if fitted to allow visual observation of shaft rotation. Ensure no personnel
                      are near rotating parts.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow flex items-center justify-center text-black font-bold text-sm flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h5 className="text-elec-yellow font-medium text-sm">Brief Energisation ("Bump" Test)</h5>
                    <p className="text-xs text-muted-foreground">
                      Momentarily energise the motor using the start button and immediately release.
                      Observe the shaft rotation direction during coast-down. The brief energisation
                      minimises stress while providing clear visual confirmation.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow flex items-center justify-center text-black font-bold text-sm flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h5 className="text-elec-yellow font-medium text-sm">Compare to Required Direction</h5>
                    <p className="text-xs text-muted-foreground">
                      Check the driven equipment requirements - pumps usually show required rotation
                      direction on the casing, fans have directional arrows, conveyors have process
                      flow requirements. If incorrect, swap any two motor connections.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow flex items-center justify-center text-black font-bold text-sm flex-shrink-0">
                    5
                  </div>
                  <div>
                    <h5 className="text-elec-yellow font-medium text-sm">Test Both Directions (Reversing Starters)</h5>
                    <p className="text-xs text-muted-foreground">
                      For reversing applications, bump test both forward and reverse operations.
                      Verify interlocking by attempting to start reverse while forward is held
                      (should be prevented). Document both directions in commissioning records.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-red-400 font-medium">Safety Precautions</h4>
                  <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                    <li>- Never bump test a coupled motor without confirming the load can accept reverse rotation</li>
                    <li>- Ensure all personnel are clear of rotating parts and pinch points</li>
                    <li>- Verify lockout/tagout procedures are in place if working on connected equipment</li>
                    <li>- Use non-contact rotation direction indicator if shaft cannot be observed directly</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="text-blue-400 font-medium flex items-center gap-2">
                <Info className="w-4 h-4" />
                BS 7671 Requirements
              </h4>
              <p className="text-sm text-muted-foreground mt-2">
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
        <section className="space-y-4">
          <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-5">
            <h3 className="text-lg font-bold text-elec-yellow mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Quick Reference Card
            </h3>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-foreground mb-2 text-sm">Key Principles</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li><span className="text-elec-yellow">Reversal:</span> Swap any two of three phases</li>
                  <li><span className="text-elec-yellow">Standard sequence:</span> L1-L2-L3 = Clockwise</li>
                  <li><span className="text-elec-yellow">Interlocking:</span> Both mechanical AND electrical required</li>
                  <li><span className="text-elec-yellow">Timing delay:</span> 0.5-5s typical coast-down</li>
                  <li><span className="text-elec-yellow">Plugging current:</span> Up to 20x FLC</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-2 text-sm">Contactor Ratings</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li><span className="text-elec-yellow">AC-3:</span> Normal inductive switching</li>
                  <li><span className="text-elec-yellow">AC-4:</span> Plugging/inching (50% of AC-3)</li>
                  <li><span className="text-elec-yellow">Auxiliary:</span> Min 1 NC + 1 NO per contactor</li>
                  <li><span className="text-elec-yellow">Overload:</span> Single unit after motor terminals</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-2 text-sm">Testing Sequence</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li><span className="text-elec-yellow">1.</span> Phase rotation meter on supply</li>
                  <li><span className="text-elec-yellow">2.</span> Confirm motor uncoupled</li>
                  <li><span className="text-elec-yellow">3.</span> Bump test - observe direction</li>
                  <li><span className="text-elec-yellow">4.</span> Verify interlock operation</li>
                  <li><span className="text-elec-yellow">5.</span> Document in commissioning records</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-2 text-sm">BS 7671 References</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li><span className="text-elec-yellow">Reg 422.3:</span> Motor circuit protection</li>
                  <li><span className="text-elec-yellow">Reg 526.3:</span> Conductor identification</li>
                  <li><span className="text-elec-yellow">Section 537:</span> Isolation and switching</li>
                  <li><span className="text-elec-yellow">BS EN 60204-1:</span> Machine safety (interlocking)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs - Static List */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Info className="w-5 h-5 text-elec-yellow" />
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
        <section className="space-y-4">
          <div className="bg-elec-yellow/5 border border-elec-yellow/20 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2 text-center">Section 5 Knowledge Check</h3>
            <p className="text-sm text-muted-foreground text-center mb-6">
              Test your understanding of forward/reverse control wiring with this 10-question quiz
              covering phase sequence, interlocking methods, VSD operation, and BS 7671 requirements.
            </p>

            {!showQuiz ? (
              <div className="text-center">
                <Button
                  onClick={() => setShowQuiz(true)}
                  className="bg-elec-yellow text-black hover:bg-elec-yellow/90 h-11 px-8 touch-manipulation"
                >
                  Start Quiz
                </Button>
              </div>
            ) : (
              <Quiz
                questions={quizQuestions}
                moduleId="industrial-electrical-m2s5"
                onComplete={(score) => {
                  console.log(`Quiz completed with score: ${score}/${quizQuestions.length}`);
                }}
              />
            )}
          </div>
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="text-muted-foreground hover:text-foreground" asChild>
            <Link to="/study-centre/upskilling/industrial-electrical/module-2/section-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Emergency Stops
            </Link>
          </Button>
          <Button size="lg" className="bg-elec-yellow text-black hover:bg-elec-yellow/90" asChild>
            <Link to="/study-centre/upskilling/industrial-electrical/module-2/section-6">
              Next: Motor Commissioning
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </main>
    </div>
  );
};

export default IndustrialElectricalModule2Section5;
