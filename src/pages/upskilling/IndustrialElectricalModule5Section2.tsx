import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';
import {
  ArrowLeft,
  ArrowRight,
  Zap,
  AlertTriangle,
  BookOpen,
  Target,
  Shield,
  Lightbulb,
  Wrench,
  Activity,
  CheckCircle2,
  XCircle,
  Thermometer,
  Gauge,
  Clock,
  Settings,
  Eye
} from 'lucide-react';

// Quick Check Questions for InlineCheck component
const quickCheckQuestions = [
  {
    id: 'qc-m5s2-1',
    question: 'When measuring a contactor coil with an ohmmeter, what reading indicates an open coil?',
    options: [
      'Zero ohms (0 Ω)',
      'Infinite resistance (OL)',
      'The nameplate rated resistance',
      'Fluctuating readings'
    ],
    correctIndex: 1,
    explanation: 'An infinite resistance reading (OL or overload on a digital meter) indicates an open coil where the internal winding has broken. A good coil should read its rated resistance value, typically ranging from 10Ω to several hundred ohms depending on the coil voltage rating.'
  },
  {
    id: 'qc-m5s2-2',
    question: 'What is the primary cause of contact welding in contactors?',
    options: [
      'Low ambient temperature',
      'Excessive inrush current during motor starting',
      'Using contacts rated above the load',
      'Proper contact alignment'
    ],
    correctIndex: 1,
    explanation: 'Contact welding occurs when excessive inrush current (typically 6-10 times running current for motors) creates enough heat to momentarily melt and fuse the contact surfaces together. This is especially common when contactors are undersized for the starting current of the load.'
  },
  {
    id: 'qc-m5s2-3',
    question: 'During thermal imaging inspection, what temperature rise above ambient typically indicates a developing fault?',
    options: [
      '1-2°C rise',
      '5-10°C rise',
      '15-30°C rise or greater',
      'Any temperature difference'
    ],
    correctIndex: 2,
    explanation: 'A temperature rise of 15-30°C or greater above ambient (or compared to similar components) typically indicates a developing fault such as loose connections, degraded contacts, or overloaded circuits. Minor temperature variations (1-10°C) may be normal operational differences.'
  }
];

// Quiz Questions
const quizQuestions = [
  {
    question: 'A contactor coil rated for 120VAC measures 850 ohms. What does this indicate?',
    options: [
      'The coil is shorted',
      'The coil is within normal range',
      'The coil is open',
      'The coil has excessive resistance'
    ],
    correctAnswer: 'The coil is within normal range'
  },
  {
    question: 'What visual symptom indicates contact pitting has become severe enough to require replacement?',
    options: [
      'Slight discolouration of contacts',
      'Minor surface roughness',
      'Deep erosion with visible craters or material loss exceeding 50%',
      'Contacts appear shiny and smooth'
    ],
    correctAnswer: 'Deep erosion with visible craters or material loss exceeding 50%'
  },
  {
    question: 'When a relay coil buzzes audibly during operation, what is the most likely cause?',
    options: [
      'Coil is overheating',
      'Broken shading coil on AC relay',
      'Contacts are welded',
      'Power supply voltage is too high'
    ],
    correctAnswer: 'Broken shading coil on AC relay'
  },
  {
    question: 'What is the recommended method for testing a suspected intermittent connection?',
    options: [
      'Visual inspection only',
      'Single point measurement',
      'Wiggle test while monitoring voltage or continuity',
      'Replacing the component without testing'
    ],
    correctAnswer: 'Wiggle test while monitoring voltage or continuity'
  },
  {
    question: 'A control transformer secondary voltage drops from 24V to 18V under load. What is the most likely cause?',
    options: [
      'Normal operation',
      'Transformer overloaded or internal fault',
      'Primary voltage too high',
      'Secondary fuse is blown'
    ],
    correctAnswer: 'Transformer overloaded or internal fault'
  },
  {
    question: 'When inspecting timer contacts that have failed to operate, what should be checked first?',
    options: [
      'The timer motor',
      'The timing dial setting',
      'Power supply to the timer and proper voltage',
      'The output load'
    ],
    correctAnswer: 'Power supply to the timer and proper voltage'
  },
  {
    question: 'What maintenance practice helps prevent contact welding in motor starter contactors?',
    options: [
      'Applying contact grease',
      'Filing contacts smooth regularly',
      'Ensuring proper contactor sizing for inrush current',
      'Reducing operating voltage'
    ],
    correctAnswer: 'Ensuring proper contactor sizing for inrush current'
  },
  {
    question: 'During coil resistance testing, a reading that is significantly lower than rated indicates:',
    options: [
      'An open coil',
      'A shorted turn in the coil winding',
      'Normal coil condition',
      'High ambient temperature'
    ],
    correctAnswer: 'A shorted turn in the coil winding'
  },
  {
    question: 'What environmental factor most commonly causes intermittent control circuit faults?',
    options: [
      'Constant temperature',
      'Vibration loosening connections',
      'Clean environment',
      'Stable humidity'
    ],
    correctAnswer: 'Vibration loosening connections'
  },
  {
    question: 'When using thermal imaging for predictive maintenance, what should similar components under similar loads show?',
    options: [
      'Completely different temperatures',
      'Similar temperatures within 5-10°C of each other',
      'One component always hotter',
      'Room temperature readings'
    ],
    correctAnswer: 'Similar temperatures within 5-10°C of each other'
  }
];

// FAQ Data
const faqItems = [
  {
    question: 'How do I test a contactor coil without removing it from the circuit?',
    answer: 'With power locked out and verified off, disconnect one wire from the coil terminal to isolate it from the circuit. Use an ohmmeter to measure resistance across the coil terminals. Compare the reading to the manufacturer\'s specifications (typically printed on the coil or contactor nameplate). For 120VAC coils, expect 50-200Ω; for 24VAC coils, expect 10-50Ω; for 24VDC coils, expect 100-500Ω. An infinite reading indicates an open coil, while a very low reading suggests shorted turns.'
  },
  {
    question: 'What causes contacts to weld together and how do I prevent it?',
    answer: 'Contact welding occurs when excessive current (especially inrush current from motors, transformers, or capacitive loads) generates enough heat to melt and fuse contact surfaces. Prevention includes: sizing contactors for the actual inrush current (not just running current), using contactors rated for the specific load type (AC-3 for motors), installing current-limiting devices for high inrush loads, ensuring proper contact pressure by checking springs, and implementing soft-start methods where appropriate.'
  },
  {
    question: 'Why does my relay buzz and what should I do about it?',
    answer: 'Relay buzzing in AC relays typically indicates a broken or cracked shading coil (the copper ring/band on the pole face). The shading coil creates a phase-shifted magnetic field that prevents armature chatter at AC zero-crossings. If buzzing occurs: verify correct coil voltage, check for broken shading coil, inspect pole faces for contamination or damage, and consider replacement if shading coil is damaged. For DC relays, buzzing may indicate insufficient voltage or a failing coil.'
  },
  {
    question: 'How can I identify the source of intermittent control faults?',
    answer: 'Systematic approach for intermittent faults: 1) Document when faults occur (time, conditions, temperature), 2) Perform wiggle tests on connections while monitoring circuits, 3) Check for thermal expansion effects by testing hot and cold, 4) Inspect for vibration-loosened connections, 5) Look for corrosion or contamination on contacts, 6) Test under load conditions that simulate the fault, 7) Use data logging to capture fault events, 8) Thermal imaging can reveal overheating connections that may be intermittent.'
  },
  {
    question: 'What are the signs that a control transformer is failing?',
    answer: 'Control transformer failure signs include: excessive voltage drop under load (more than 10% from rated), overheating or discolouration of windings, burning smell or visible damage, audible humming or buzzing louder than normal, circuit breaker or fuse tripping, secondary voltage fluctuations, and physical damage to terminals or insulation. Test by measuring secondary voltage under no-load and full-load conditions; significant difference indicates transformer issues or overloading.'
  },
  {
    question: 'How often should thermal imaging inspections be performed on control panels?',
    answer: 'Recommended thermal imaging frequency depends on criticality: critical systems monthly, standard industrial panels quarterly, and less critical systems annually. Perform additional scans after any maintenance work, during peak load periods, when ambient conditions change significantly, or when problems are suspected. Document baseline readings for comparison. Always scan with panels under normal operating load for accurate results. Consistent scheduling enables trend analysis for predictive maintenance.'
  }
];

const IndustrialElectricalModule5Section2: React.FC = () => {
  const [showQuiz, setShowQuiz] = useState(false);

  useSEO({
    title: 'Common Control Faults (Coils, Relays, Power) | Industrial Electrical Module 5',
    description: 'Learn to diagnose and repair common control circuit faults including contactor coils, relay failures, contact welding, power supply issues, and predictive maintenance techniques for industrial electrical systems.',
    keywords: [
      'control circuit faults',
      'contactor coil failure',
      'relay troubleshooting',
      'contact welding',
      'power supply faults',
      'industrial electrical maintenance',
      'predictive maintenance',
      'thermal imaging electrical',
      'coil resistance testing',
      'intermittent faults'
    ],
    canonicalUrl: '/study-centre/upskilling/industrial-electrical/module-5/section-2',
    ogType: 'article'
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Sticky Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <span className="text-sm text-muted-foreground">Module 5 &gt; Section 2</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-6 space-y-8">
        {/* Title Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-elec-yellow/10">
            <AlertTriangle className="w-8 h-8 text-elec-yellow" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Common Control Faults
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Coils, relays, and power supply troubleshooting for industrial control circuits
          </p>
        </div>

        {/* Section Overview */}
        <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
          <div className="flex items-start gap-3">
            <Target className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
            <div>
              <h2 className="font-semibold text-foreground mb-2">Learning Objectives</h2>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>- Diagnose contactor and relay coil failures using resistance testing</li>
                <li>- Identify and prevent contact welding and pitting issues</li>
                <li>- Troubleshoot power supply faults and voltage drop problems</li>
                <li>- Apply predictive maintenance techniques using thermal imaging</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 1: Contactor and Relay Coil Failures */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Contactor and Relay Coil Failures
          </h2>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Coil failures typically manifest as open windings, shorted turns, or ground faults. Each failure type
              produces distinct symptoms and requires specific testing methods for accurate diagnosis.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-background/50 rounded-lg p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <XCircle className="w-5 h-5 text-red-400" />
                  <h4 className="font-semibold text-foreground">Open Coil Symptoms</h4>
                </div>
                <ul className="text-white text-sm space-y-2">
                  <li>- Contactor fails to pull in when energised</li>
                  <li>- No audible click or mechanical movement</li>
                  <li>- Control circuit functions except for that device</li>
                  <li>- Infinite resistance reading on ohmmeter</li>
                  <li>- Voltage present at coil terminals but no action</li>
                </ul>
              </div>

              <div className="bg-background/50 rounded-lg p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-5 h-5 text-orange-400" />
                  <h4 className="font-semibold text-foreground">Shorted Coil Symptoms</h4>
                </div>
                <ul className="text-white text-sm space-y-2">
                  <li>- Coil overheats rapidly</li>
                  <li>- Burnt smell from coil area</li>
                  <li>- Control fuse or breaker trips</li>
                  <li>- Lower than normal resistance reading</li>
                  <li>- Excessive current draw on control circuit</li>
                </ul>
              </div>
            </div>

            <div className="bg-background/50 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Gauge className="w-5 h-5 text-elec-yellow" />
                Coil Resistance Testing Procedure
              </h4>
              <ol className="text-white space-y-2 text-sm">
                <li><strong>1.</strong> Lock out and tag out all power sources, verify zero energy state</li>
                <li><strong>2.</strong> Disconnect at least one coil lead to isolate from circuit</li>
                <li><strong>3.</strong> Set multimeter to resistance (Ω) range appropriate for expected value</li>
                <li><strong>4.</strong> Measure across coil terminals and record reading</li>
                <li><strong>5.</strong> Compare to manufacturer specifications:</li>
              </ol>
              <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <div className="bg-background/80 p-2 rounded text-center">
                  <div className="text-elec-yellow font-medium">24VAC</div>
                  <div className="text-white">10-50Ω</div>
                </div>
                <div className="bg-background/80 p-2 rounded text-center">
                  <div className="text-elec-yellow font-medium">120VAC</div>
                  <div className="text-white">50-200Ω</div>
                </div>
                <div className="bg-background/80 p-2 rounded text-center">
                  <div className="text-elec-yellow font-medium">240VAC</div>
                  <div className="text-white">200-800Ω</div>
                </div>
                <div className="bg-background/80 p-2 rounded text-center">
                  <div className="text-elec-yellow font-medium">24VDC</div>
                  <div className="text-white">100-500Ω</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Contact Welding and Pitting Issues */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Contact Welding and Pitting Issues
          </h2>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Contact degradation is one of the most common contactor failure modes. Understanding the mechanisms
              of contact welding and pitting helps in selecting proper components and implementing effective
              maintenance procedures.
            </p>

            <div className="bg-background/50 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Activity className="w-5 h-5 text-red-400" />
                Contact Welding Mechanism
              </h4>
              <p className="text-white text-sm mb-3">
                Contact welding occurs when electrical current generates enough heat at the contact interface
                to melt and fuse the contact materials together. Contributing factors include:
              </p>
              <ul className="text-white text-sm space-y-1">
                <li>- <strong>Inrush current:</strong> Motor starting current (6-10x FLA) creates momentary high heat</li>
                <li>- <strong>Contact bounce:</strong> Mechanical rebound creates multiple arc events</li>
                <li>- <strong>Undersized contacts:</strong> Insufficient contact area for current load</li>
                <li>- <strong>Reduced contact pressure:</strong> Worn springs or mechanical damage</li>
                <li>- <strong>Contamination:</strong> Oil or debris increasing contact resistance</li>
              </ul>
            </div>

            <div className="bg-background/50 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Eye className="w-5 h-5 text-elec-yellow" />
                Contact Inspection Guidelines
              </h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-green-400 font-medium mb-2">Acceptable Conditions:</p>
                  <ul className="text-white space-y-1">
                    <li>- Light discolouration (grey/black)</li>
                    <li>- Minor surface roughness</li>
                    <li>- Even wear pattern</li>
                    <li>- Contact material thickness &gt;50%</li>
                  </ul>
                </div>
                <div>
                  <p className="text-red-400 font-medium mb-2">Requires Replacement:</p>
                  <ul className="text-white space-y-1">
                    <li>- Deep craters or pits</li>
                    <li>- Material loss exceeding 50%</li>
                    <li>- Evidence of welding/fusing</li>
                    <li>- Uneven or extreme wear</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-orange-300">Important</h4>
                  <p className="text-white text-sm">
                    Never file silver-alloy contacts smooth. The rough surface created by arcing actually helps
                    break through oxide layers and maintain good electrical contact. Filing removes the silver
                    alloy layer and shortens contact life.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Check 1 */}
        <InlineCheck
          id={quickCheckQuestions[0].id}
          question={quickCheckQuestions[0].question}
          options={quickCheckQuestions[0].options}
          correctIndex={quickCheckQuestions[0].correctIndex}
          explanation={quickCheckQuestions[0].explanation}
        />

        {/* Section 3: Power Supply Faults and Voltage Drops */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Power Supply Faults and Voltage Drops
          </h2>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Control circuit power supply problems can cause erratic operation, nuisance tripping, or complete
              system failure. Systematic voltage testing under various load conditions reveals power supply issues
              that may not be apparent at no-load.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-background/50 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-400" />
                  Control Transformer Faults
                </h4>
                <ul className="text-white text-sm space-y-2">
                  <li>- <strong>Overloading:</strong> Voltage drops &gt;10% under load</li>
                  <li>- <strong>Shorted turns:</strong> Excessive heat, low output voltage</li>
                  <li>- <strong>Open winding:</strong> No output voltage</li>
                  <li>- <strong>Insulation failure:</strong> Ground faults, erratic operation</li>
                  <li>- <strong>Loose connections:</strong> Intermittent voltage, overheating terminals</li>
                </ul>
              </div>

              <div className="bg-background/50 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Gauge className="w-5 h-5 text-elec-yellow" />
                  DC Power Supply Issues
                </h4>
                <ul className="text-white text-sm space-y-2">
                  <li>- <strong>Ripple voltage:</strong> Failing filter capacitors</li>
                  <li>- <strong>Regulation problems:</strong> Output varies with load</li>
                  <li>- <strong>Overcurrent shutdown:</strong> Load exceeds rating</li>
                  <li>- <strong>Ground faults:</strong> DC ground different from AC ground</li>
                  <li>- <strong>Ageing components:</strong> Capacitor degradation over time</li>
                </ul>
              </div>
            </div>

            <div className="bg-background/50 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-foreground mb-3">Voltage Drop Testing Procedure</h4>
              <ol className="text-white text-sm space-y-2">
                <li><strong>1.</strong> Measure and record supply voltage at the source (transformer secondary or power supply output)</li>
                <li><strong>2.</strong> Measure voltage at the load terminals with circuit de-energised</li>
                <li><strong>3.</strong> Energise the circuit and measure voltage under actual operating conditions</li>
                <li><strong>4.</strong> Calculate voltage drop: Source voltage - Load voltage = Drop</li>
                <li><strong>5.</strong> Acceptable drop is typically less than 5% for control circuits</li>
                <li><strong>6.</strong> Excessive drop indicates undersized wiring, poor connections, or overloaded source</li>
              </ol>
            </div>
          </div>
        </section>

        {/* Section 4: Timer and Counter Malfunctions */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Timer and Counter Malfunctions
          </h2>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 space-y-4">
            <div className="flex items-start gap-3">
              <Clock className="w-6 h-6 text-elec-yellow flex-shrink-0 mt-1" />
              <p className="text-muted-foreground leading-relaxed">
                Timing relays and counters are critical for sequencing operations. Failures in these devices
                can cause process problems, safety issues, or complete system shutdowns.
              </p>
            </div>

            <div className="bg-background/50 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-foreground mb-3">Electronic Timer Failures</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-elec-yellow font-medium mb-2">Symptoms:</p>
                  <ul className="text-white space-y-1">
                    <li>- Timer does not start counting</li>
                    <li>- Timing is inaccurate or erratic</li>
                    <li>- Output contacts fail to operate</li>
                    <li>- Display shows incorrect values</li>
                    <li>- Timer resets unexpectedly</li>
                  </ul>
                </div>
                <div>
                  <p className="text-elec-yellow font-medium mb-2">Common Causes:</p>
                  <ul className="text-white space-y-1">
                    <li>- Incorrect supply voltage</li>
                    <li>- Electrical noise interference</li>
                    <li>- Worn or welded output contacts</li>
                    <li>- Failed internal components</li>
                    <li>- Programming/setting errors</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-background/50 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-foreground mb-3">Pneumatic Timer Failures</h4>
              <ul className="text-white text-sm space-y-2">
                <li>- <strong>Timing too fast:</strong> Air leak in bellows or diaphragm</li>
                <li>- <strong>Timing too slow:</strong> Clogged needle valve or restricted air passage</li>
                <li>- <strong>No timing action:</strong> Bellows ruptured, diaphragm damaged</li>
                <li>- <strong>Contacts do not operate:</strong> Mechanical linkage broken or contacts welded</li>
                <li>- <strong>Erratic timing:</strong> Oil contamination, temperature extremes</li>
              </ul>
            </div>

            <div className="bg-background/50 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-foreground mb-3">Timer Troubleshooting Steps</h4>
              <ol className="text-white text-sm space-y-2">
                <li><strong>1.</strong> Verify correct supply voltage is present at timer terminals</li>
                <li><strong>2.</strong> Check input signal is properly triggering the timer</li>
                <li><strong>3.</strong> Confirm timing settings match application requirements</li>
                <li><strong>4.</strong> Test output contacts with ohmmeter for proper operation</li>
                <li><strong>5.</strong> Check for electrical noise sources if timing is erratic</li>
                <li><strong>6.</strong> Verify wiring matches timer function type (on-delay, off-delay, etc.)</li>
              </ol>
            </div>
          </div>
        </section>

        {/* Quick Check 2 */}
        <InlineCheck
          id={quickCheckQuestions[1].id}
          question={quickCheckQuestions[1].question}
          options={quickCheckQuestions[1].options}
          correctIndex={quickCheckQuestions[1].correctIndex}
          explanation={quickCheckQuestions[1].explanation}
        />

        {/* Section 5: Intermittent Faults and Their Causes */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Intermittent Faults and Their Causes
          </h2>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Intermittent faults are among the most challenging problems to diagnose because they may not be
              present during inspection. Systematic approaches and proper documentation are essential for
              tracking down these elusive problems.
            </p>

            <div className="bg-background/50 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-400" />
                Common Causes of Intermittent Faults
              </h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <ul className="text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                    <span><strong>Loose connections:</strong> Vibration causes intermittent contact</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                    <span><strong>Thermal expansion:</strong> Connections fail when hot</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                    <span><strong>Corroded contacts:</strong> Oxide buildup creates resistance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                    <span><strong>Cracked solder joints:</strong> Especially in vibrating equipment</span>
                  </li>
                </ul>
                <ul className="text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                    <span><strong>Damaged insulation:</strong> Short circuits under movement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                    <span><strong>Failing components:</strong> Borderline capacitors, resistors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                    <span><strong>EMI/RFI interference:</strong> External noise sources</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                    <span><strong>Moisture intrusion:</strong> Humidity-related failures</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-background/50 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Wrench className="w-5 h-5 text-elec-yellow" />
                Intermittent Fault Diagnosis Techniques
              </h4>
              <ol className="text-white text-sm space-y-3">
                <li>
                  <strong>1. Documentation:</strong> Record exact conditions when faults occur - time,
                  temperature, equipment running, recent changes. Patterns often reveal the cause.
                </li>
                <li>
                  <strong>2. Wiggle Test:</strong> With meter connected, gently flex wires and tap
                  connections while monitoring for interruptions. Use proper PPE for energised testing.
                </li>
                <li>
                  <strong>3. Thermal Cycling:</strong> Test when equipment is cold and after reaching
                  operating temperature. Thermal expansion often reveals loose connections.
                </li>
                <li>
                  <strong>4. Visual Inspection:</strong> Look for discolouration, corrosion, damage,
                  or signs of overheating that indicate problem areas.
                </li>
                <li>
                  <strong>5. Data Logging:</strong> Install monitoring equipment to capture fault
                  events and associated conditions automatically.
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* Section 6: Prevention and Predictive Maintenance */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Prevention and Predictive Maintenance
          </h2>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Predictive maintenance using thermal imaging and systematic inspection prevents unplanned downtime
              by identifying developing faults before they cause failures. Implementing these techniques reduces
              emergency repairs and extends equipment life.
            </p>

            <div className="bg-background/50 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Thermometer className="w-5 h-5 text-red-400" />
                Thermal Imaging for Predictive Maintenance
              </h4>
              <p className="text-white text-sm mb-3">
                Infrared thermography detects abnormal heat patterns indicating developing faults.
                Regular thermal scans of control panels reveal problems before they cause failures.
              </p>
              <div className="grid md:grid-cols-3 gap-3 mt-3">
                <div className="bg-background/80 p-3 rounded text-center">
                  <div className="text-green-400 font-medium">Normal</div>
                  <div className="text-white">&lt;10°C rise</div>
                </div>
                <div className="bg-background/80 p-3 rounded text-center">
                  <div className="text-yellow-400 font-medium">Investigate</div>
                  <div className="text-white">10-30°C rise</div>
                </div>
                <div className="bg-background/80 p-3 rounded text-center">
                  <div className="text-red-400 font-medium">Critical</div>
                  <div className="text-white">&gt;30°C rise</div>
                </div>
              </div>
            </div>

            <div className="bg-background/50 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-400" />
                Preventive Maintenance Checklist
              </h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-elec-yellow font-medium mb-2">Monthly Tasks:</p>
                  <ul className="text-white space-y-1">
                    <li>- Visual inspection for damage or contamination</li>
                    <li>- Check for unusual sounds or odours</li>
                    <li>- Verify indicator lights functioning</li>
                    <li>- Clean exterior of enclosures</li>
                  </ul>
                </div>
                <div>
                  <p className="text-elec-yellow font-medium mb-2">Quarterly Tasks:</p>
                  <ul className="text-white space-y-1">
                    <li>- Thermal imaging scan under load</li>
                    <li>- Torque check on connections</li>
                    <li>- Inspect contacts for wear</li>
                    <li>- Test control circuit operation</li>
                  </ul>
                </div>
                <div>
                  <p className="text-elec-yellow font-medium mb-2">Annual Tasks:</p>
                  <ul className="text-white space-y-1">
                    <li>- Complete electrical testing</li>
                    <li>- Replace contacts showing wear</li>
                    <li>- Clean and vacuum enclosures</li>
                    <li>- Verify grounding integrity</li>
                  </ul>
                </div>
                <div>
                  <p className="text-elec-yellow font-medium mb-2">Condition-Based:</p>
                  <ul className="text-white space-y-1">
                    <li>- Replace coils showing degradation</li>
                    <li>- Address thermal anomalies immediately</li>
                    <li>- Correct loose connections found</li>
                    <li>- Update documentation continuously</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-background/50 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Settings className="w-5 h-5 text-elec-yellow" />
                Best Practices for Extended Equipment Life
              </h4>
              <ul className="text-white text-sm space-y-2">
                <li>- <strong>Proper sizing:</strong> Select contactors and relays rated for actual inrush and continuous currents</li>
                <li>- <strong>Environment control:</strong> Maintain acceptable temperature and humidity ranges</li>
                <li>- <strong>Clean conditions:</strong> Keep enclosures free of dust, moisture, and contaminants</li>
                <li>- <strong>Connection integrity:</strong> Maintain proper torque on all terminals per manufacturer specs</li>
                <li>- <strong>Surge protection:</strong> Install appropriate suppression for coils and sensitive electronics</li>
                <li>- <strong>Documentation:</strong> Maintain records of inspections, measurements, and replacements</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quick Check 3 */}
        <InlineCheck
          id={quickCheckQuestions[2].id}
          question={quickCheckQuestions[2].question}
          options={quickCheckQuestions[2].options}
          correctIndex={quickCheckQuestions[2].correctIndex}
          explanation={quickCheckQuestions[2].explanation}
        />

        {/* Quick Reference Card */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-elec-yellow" />
            Quick Reference Card
          </h2>

          <div className="bg-gradient-to-br from-elec-yellow/10 to-elec-yellow/5 rounded-lg p-6 border border-elec-yellow/30">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-foreground mb-2 border-b border-white/10 pb-1">
                  Coil Testing Quick Guide
                </h4>
                <div className="text-sm text-white space-y-1">
                  <p><span className="text-red-400">OL (Infinite):</span> Open coil - replace</p>
                  <p><span className="text-red-400">Very low (&lt;10Ω):</span> Shorted turns - replace</p>
                  <p><span className="text-green-400">Within spec:</span> Coil OK</p>
                  <p><span className="text-yellow-400">High resistance:</span> Degraded - monitor/replace</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2 border-b border-white/10 pb-1">
                  Thermal Imaging Action Levels
                </h4>
                <div className="text-sm text-white space-y-1">
                  <p><span className="text-green-400">&lt;10°C:</span> Normal - routine monitoring</p>
                  <p><span className="text-yellow-400">10-20°C:</span> Schedule investigation</p>
                  <p><span className="text-orange-400">20-40°C:</span> Priority repair needed</p>
                  <p><span className="text-red-400">&gt;40°C:</span> Immediate attention required</p>
                </div>
              </div>

              <div className="md:col-span-2">
                <h4 className="font-semibold text-foreground mb-2 border-b border-white/10 pb-1">
                  Troubleshooting Priority Order
                </h4>
                <div className="flex flex-wrap gap-2 text-sm">
                  <span className="bg-elec-yellow/20 text-elec-yellow px-3 py-1 rounded">1. Verify power supply</span>
                  <span className="bg-elec-yellow/20 text-elec-yellow px-3 py-1 rounded">2. Check control voltage</span>
                  <span className="bg-elec-yellow/20 text-elec-yellow px-3 py-1 rounded">3. Test coil resistance</span>
                  <span className="bg-elec-yellow/20 text-elec-yellow px-3 py-1 rounded">4. Inspect contacts</span>
                  <span className="bg-elec-yellow/20 text-elec-yellow px-3 py-1 rounded">5. Check connections</span>
                  <span className="bg-elec-yellow/20 text-elec-yellow px-3 py-1 rounded">6. Verify signals</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-elec-yellow" />
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            {faqItems.map((faq, index) => (
              <div key={index} className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
                <h3 className="font-medium text-foreground mb-2">{faq.question}</h3>
                <p className="text-sm text-white">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Section Quiz</h2>
          <Button
            onClick={() => setShowQuiz(!showQuiz)}
            className="w-full min-h-[44px] touch-manipulation bg-elec-yellow text-background hover:bg-elec-yellow/90"
          >
            {showQuiz ? 'Hide Quiz' : 'Start Quiz'}
          </Button>

          {showQuiz && (
            <Quiz
              questions={quizQuestions}
              title="Test Your Knowledge: Common Control Faults"
              passingScore={70}
            />
          )}
        </section>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-white/10">
          <Button variant="outline" className="min-h-[44px] touch-manipulation border-white/20" asChild>
            <Link to="/study-centre/upskilling/industrial-electrical/module-5/section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Section 1
            </Link>
          </Button>
          <Button className="min-h-[44px] touch-manipulation bg-elec-yellow text-background hover:bg-elec-yellow/90" asChild>
            <Link to="/study-centre/upskilling/industrial-electrical/module-5/section-3">
              Next: Section 3 - Motor Control Circuit Faults
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </nav>

        {/* Footer Note */}
        <div className="text-center text-muted-foreground text-sm pt-4">
          <p>Industrial Electrical Module 5 - Section 2 of 5</p>
          <p className="mt-1">Complete all sections to master fault-finding strategies</p>
        </div>
      </main>
    </div>
  );
};

export default IndustrialElectricalModule5Section2;
