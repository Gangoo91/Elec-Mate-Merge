import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { useSEO } from '@/hooks/useSEO';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Zap,
  AlertTriangle,
  Thermometer,
  Clock,
  Wrench,
  Activity,
  CheckCircle,
  XCircle,
  Gauge,
  Shield,
  Eye,
  Settings,
  BookOpen
} from 'lucide-react';

const IndustrialElectricalModule5Section2: React.FC = () => {
  const navigate = useNavigate();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  useSEO({
    title: 'Common Control Faults (Coils, Relays, Power) | Industrial Electrical Module 5 Section 2',
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
    canonical: '/upskilling/industrial-electrical/module-5/section-2'
  });

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
        'Slight discoloration of contacts',
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

  const faqData = [
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
      answer: 'Control transformer failure signs include: excessive voltage drop under load (more than 10% from rated), overheating or discoloration of windings, burning smell or visible damage, audible humming or buzzing louder than normal, circuit breaker or fuse tripping, secondary voltage fluctuations, and physical damage to terminals or insulation. Test by measuring secondary voltage under no-load and full-load conditions; significant difference indicates transformer issues or overloading.'
    },
    {
      question: 'How often should thermal imaging inspections be performed on control panels?',
      answer: 'Recommended thermal imaging frequency depends on criticality: critical systems monthly, standard industrial panels quarterly, and less critical systems annually. Perform additional scans after any maintenance work, during peak load periods, when ambient conditions change significantly, or when problems are suspected. Document baseline readings for comparison. Always scan with panels under normal operating load for accurate results. Consistent scheduling enables trend analysis for predictive maintenance.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a] text-white">
      {/* Header */}
      <div className="bg-[#1a1a1a]/95 border-b border-gray-700 px-4 py-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 text-elec-yellow mb-2">
            <AlertTriangle className="w-5 h-5" />
            <span className="text-sm font-medium">Module 5 - Control Circuit Troubleshooting</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Section 2: Common Control Faults
          </h1>
          <p className="text-gray-400">
            Coils, Relays, and Power Supply Troubleshooting
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-12">
        {/* Introduction */}
        <section className="prose prose-invert max-w-none">
          <p className="text-lg text-gray-300 leading-relaxed">
            Control circuit faults account for a significant portion of industrial electrical failures.
            Understanding common failure modes in contactors, relays, and power supplies enables faster
            diagnosis and more effective preventive maintenance. This section covers practical fault
            identification, testing procedures, and predictive maintenance techniques using thermal imaging
            and systematic inspection methods.
          </p>
        </section>

        {/* Section 1: Contactor and Relay Coil Failures */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-lg">
              1
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-elec-yellow">
              Contactor and Relay Coil Failures
            </h2>
          </div>

          <div className="bg-[#2a2a2a] rounded-lg p-6 space-y-4">
            <div className="flex items-start gap-3">
              <Zap className="w-6 h-6 text-elec-yellow flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-white mb-2">Common Coil Failure Modes</h3>
                <p className="text-gray-300">
                  Coil failures typically manifest as open windings, shorted turns, or ground faults.
                  Each failure type produces distinct symptoms and requires specific testing methods for accurate diagnosis.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <XCircle className="w-5 h-5 text-red-400" />
                  <h4 className="font-semibold text-white">Open Coil Symptoms</h4>
                </div>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Contactor fails to pull in when energized</li>
                  <li>• No audible click or mechanical movement</li>
                  <li>• Control circuit functions except for that device</li>
                  <li>• Infinite resistance reading on ohmmeter</li>
                  <li>• Voltage present at coil terminals but no action</li>
                </ul>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-5 h-5 text-orange-400" />
                  <h4 className="font-semibold text-white">Shorted Coil Symptoms</h4>
                </div>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Coil overheats rapidly</li>
                  <li>• Burnt smell from coil area</li>
                  <li>• Control fuse or breaker trips</li>
                  <li>• Lower than normal resistance reading</li>
                  <li>• Excessive current draw on control circuit</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 mt-4">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Gauge className="w-5 h-5 text-elec-yellow" />
                Coil Resistance Testing Procedure
              </h4>
              <ol className="text-gray-300 space-y-2">
                <li><strong>1.</strong> Lock out and tag out all power sources, verify zero energy state</li>
                <li><strong>2.</strong> Disconnect at least one coil lead to isolate from circuit</li>
                <li><strong>3.</strong> Set multimeter to resistance (Ω) range appropriate for expected value</li>
                <li><strong>4.</strong> Measure across coil terminals and record reading</li>
                <li><strong>5.</strong> Compare to manufacturer specifications:</li>
              </ol>
              <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <div className="bg-[#2a2a2a] p-2 rounded text-center">
                  <div className="text-elec-yellow font-medium">24VAC</div>
                  <div className="text-gray-400">10-50Ω</div>
                </div>
                <div className="bg-[#2a2a2a] p-2 rounded text-center">
                  <div className="text-elec-yellow font-medium">120VAC</div>
                  <div className="text-gray-400">50-200Ω</div>
                </div>
                <div className="bg-[#2a2a2a] p-2 rounded text-center">
                  <div className="text-elec-yellow font-medium">240VAC</div>
                  <div className="text-gray-400">200-800Ω</div>
                </div>
                <div className="bg-[#2a2a2a] p-2 rounded text-center">
                  <div className="text-elec-yellow font-medium">24VDC</div>
                  <div className="text-gray-400">100-500Ω</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Contact Welding and Pitting Issues */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-lg">
              2
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-elec-yellow">
              Contact Welding and Pitting Issues
            </h2>
          </div>

          <div className="bg-[#2a2a2a] rounded-lg p-6 space-y-4">
            <p className="text-gray-300">
              Contact degradation is one of the most common contactor failure modes. Understanding the
              mechanisms of contact welding and pitting helps in selecting proper components and implementing
              effective maintenance procedures.
            </p>

            <div className="space-y-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-red-400" />
                  Contact Welding Mechanism
                </h4>
                <p className="text-gray-300 text-sm mb-3">
                  Contact welding occurs when electrical current generates enough heat at the contact
                  interface to melt and fuse the contact materials together. Contributing factors include:
                </p>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• <strong>Inrush current:</strong> Motor starting current (6-10x FLA) creates momentary high heat</li>
                  <li>• <strong>Contact bounce:</strong> Mechanical rebound creates multiple arc events</li>
                  <li>• <strong>Undersized contacts:</strong> Insufficient contact area for current load</li>
                  <li>• <strong>Reduced contact pressure:</strong> Worn springs or mechanical damage</li>
                  <li>• <strong>Contamination:</strong> Oil or debris increasing contact resistance</li>
                </ul>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-elec-yellow" />
                  Contact Inspection Guidelines
                </h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-green-400 font-medium mb-2">Acceptable Conditions:</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Light discoloration (gray/black)</li>
                      <li>• Minor surface roughness</li>
                      <li>• Even wear pattern</li>
                      <li>• Contact material thickness &gt;50%</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-red-400 font-medium mb-2">Requires Replacement:</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Deep craters or pits</li>
                      <li>• Material loss exceeding 50%</li>
                      <li>• Evidence of welding/fusing</li>
                      <li>• Uneven or extreme wear</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-900/30 border border-yellow-600/50 rounded-lg p-4">
                <p className="text-yellow-300 text-sm flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Important:</strong> Never file silver-alloy contacts smooth. The rough surface
                    created by arcing actually helps break through oxide layers and maintain good electrical
                    contact. Filing removes the silver alloy layer and shortens contact life.
                  </span>
                </p>
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

        {/* Section 3: Power Supply Faults and Voltage Drops */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-lg">
              3
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-elec-yellow">
              Power Supply Faults and Voltage Drops
            </h2>
          </div>

          <div className="bg-[#2a2a2a] rounded-lg p-6 space-y-4">
            <p className="text-gray-300">
              Control circuit power supply problems can cause erratic operation, nuisance tripping, or
              complete system failure. Systematic voltage testing under various load conditions reveals
              power supply issues that may not be apparent at no-load.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-400" />
                  Control Transformer Faults
                </h4>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• <strong>Overloading:</strong> Voltage drops &gt;10% under load</li>
                  <li>• <strong>Shorted turns:</strong> Excessive heat, low output voltage</li>
                  <li>• <strong>Open winding:</strong> No output voltage</li>
                  <li>• <strong>Insulation failure:</strong> Ground faults, erratic operation</li>
                  <li>• <strong>Loose connections:</strong> Intermittent voltage, overheating terminals</li>
                </ul>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Gauge className="w-5 h-5 text-elec-yellow" />
                  DC Power Supply Issues
                </h4>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• <strong>Ripple voltage:</strong> Failing filter capacitors</li>
                  <li>• <strong>Regulation problems:</strong> Output varies with load</li>
                  <li>• <strong>Overcurrent shutdown:</strong> Load exceeds rating</li>
                  <li>• <strong>Ground faults:</strong> DC ground different from AC ground</li>
                  <li>• <strong>Aging components:</strong> Capacitor degradation over time</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 mt-4">
              <h4 className="font-semibold text-white mb-3">Voltage Drop Testing Procedure</h4>
              <ol className="text-gray-300 text-sm space-y-2">
                <li><strong>1.</strong> Measure and record supply voltage at the source (transformer secondary or power supply output)</li>
                <li><strong>2.</strong> Measure voltage at the load terminals with circuit de-energized</li>
                <li><strong>3.</strong> Energize the circuit and measure voltage under actual operating conditions</li>
                <li><strong>4.</strong> Calculate voltage drop: Source voltage - Load voltage = Drop</li>
                <li><strong>5.</strong> Acceptable drop is typically less than 5% for control circuits</li>
                <li><strong>6.</strong> Excessive drop indicates undersized wiring, poor connections, or overloaded source</li>
              </ol>
            </div>
          </div>
        </section>

        {/* Section 4: Timer and Counter Malfunctions */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-lg">
              4
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-elec-yellow">
              Timer and Counter Malfunctions
            </h2>
          </div>

          <div className="bg-[#2a2a2a] rounded-lg p-6 space-y-4">
            <div className="flex items-start gap-3">
              <Clock className="w-6 h-6 text-elec-yellow flex-shrink-0 mt-1" />
              <p className="text-gray-300">
                Timing relays and counters are critical for sequencing operations. Failures in these
                devices can cause process problems, safety issues, or complete system shutdowns.
                Understanding common failure modes enables faster troubleshooting.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-semibold text-white mb-3">Electronic Timer Failures</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-elec-yellow font-medium mb-2">Symptoms:</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Timer does not start counting</li>
                      <li>• Timing is inaccurate or erratic</li>
                      <li>• Output contacts fail to operate</li>
                      <li>• Display shows incorrect values</li>
                      <li>• Timer resets unexpectedly</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-elec-yellow font-medium mb-2">Common Causes:</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Incorrect supply voltage</li>
                      <li>• Electrical noise interference</li>
                      <li>• Worn or welded output contacts</li>
                      <li>• Failed internal components</li>
                      <li>• Programming/setting errors</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-semibold text-white mb-3">Pneumatic Timer Failures</h4>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• <strong>Timing too fast:</strong> Air leak in bellows or diaphragm</li>
                  <li>• <strong>Timing too slow:</strong> Clogged needle valve or restricted air passage</li>
                  <li>• <strong>No timing action:</strong> Bellows ruptured, diaphragm damaged</li>
                  <li>• <strong>Contacts don't operate:</strong> Mechanical linkage broken or contacts welded</li>
                  <li>• <strong>Erratic timing:</strong> Oil contamination, temperature extremes</li>
                </ul>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-semibold text-white mb-3">Timer Troubleshooting Steps</h4>
                <ol className="text-gray-300 text-sm space-y-2">
                  <li><strong>1.</strong> Verify correct supply voltage is present at timer terminals</li>
                  <li><strong>2.</strong> Check input signal is properly triggering the timer</li>
                  <li><strong>3.</strong> Confirm timing settings match application requirements</li>
                  <li><strong>4.</strong> Test output contacts with ohmmeter for proper operation</li>
                  <li><strong>5.</strong> Check for electrical noise sources if timing is erratic</li>
                  <li><strong>6.</strong> Verify wiring matches timer function type (on-delay, off-delay, etc.)</li>
                </ol>
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

        {/* Section 5: Intermittent Faults and Their Causes */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-lg">
              5
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-elec-yellow">
              Intermittent Faults and Their Causes
            </h2>
          </div>

          <div className="bg-[#2a2a2a] rounded-lg p-6 space-y-4">
            <p className="text-gray-300">
              Intermittent faults are among the most challenging problems to diagnose because they may
              not be present during inspection. Systematic approaches and proper documentation are
              essential for tracking down these elusive problems.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-400" />
                Common Causes of Intermittent Faults
              </h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <ul className="text-gray-300 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                    <span><strong>Loose connections:</strong> Vibration causes intermittent contact</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                    <span><strong>Thermal expansion:</strong> Connections fail when hot</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                    <span><strong>Corroded contacts:</strong> Oxide buildup creates resistance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                    <span><strong>Cracked solder joints:</strong> Especially in vibrating equipment</span>
                  </li>
                </ul>
                <ul className="text-gray-300 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                    <span><strong>Damaged insulation:</strong> Short circuits under movement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                    <span><strong>Failing components:</strong> Borderline capacitors, resistors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                    <span><strong>EMI/RFI interference:</strong> External noise sources</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                    <span><strong>Moisture intrusion:</strong> Humidity-related failures</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Wrench className="w-5 h-5 text-elec-yellow" />
                Intermittent Fault Diagnosis Techniques
              </h4>
              <ol className="text-gray-300 text-sm space-y-3">
                <li>
                  <strong>1. Documentation:</strong> Record exact conditions when faults occur - time,
                  temperature, equipment running, recent changes. Patterns often reveal the cause.
                </li>
                <li>
                  <strong>2. Wiggle Test:</strong> With meter connected, gently flex wires and tap
                  connections while monitoring for interruptions. Use proper PPE for energized testing.
                </li>
                <li>
                  <strong>3. Thermal Cycling:</strong> Test when equipment is cold and after reaching
                  operating temperature. Thermal expansion often reveals loose connections.
                </li>
                <li>
                  <strong>4. Visual Inspection:</strong> Look for discoloration, corrosion, damage,
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
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-lg">
              6
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-elec-yellow">
              Prevention and Predictive Maintenance
            </h2>
          </div>

          <div className="bg-[#2a2a2a] rounded-lg p-6 space-y-4">
            <p className="text-gray-300">
              Predictive maintenance using thermal imaging and systematic inspection prevents unplanned
              downtime by identifying developing faults before they cause failures. Implementing these
              techniques reduces emergency repairs and extends equipment life.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Thermometer className="w-5 h-5 text-red-400" />
                Thermal Imaging for Predictive Maintenance
              </h4>
              <div className="space-y-3 text-sm text-gray-300">
                <p>
                  Infrared thermography detects abnormal heat patterns indicating developing faults.
                  Regular thermal scans of control panels reveal problems before they cause failures.
                </p>
                <div className="grid md:grid-cols-3 gap-3 mt-3">
                  <div className="bg-[#2a2a2a] p-3 rounded text-center">
                    <div className="text-green-400 font-medium">Normal</div>
                    <div className="text-gray-400">&lt;10°C rise</div>
                  </div>
                  <div className="bg-[#2a2a2a] p-3 rounded text-center">
                    <div className="text-yellow-400 font-medium">Investigate</div>
                    <div className="text-gray-400">10-30°C rise</div>
                  </div>
                  <div className="bg-[#2a2a2a] p-3 rounded text-center">
                    <div className="text-red-400 font-medium">Critical</div>
                    <div className="text-gray-400">&gt;30°C rise</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-400" />
                Preventive Maintenance Checklist
              </h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-elec-yellow font-medium mb-2">Monthly Tasks:</p>
                  <ul className="text-gray-300 space-y-1">
                    <li>• Visual inspection for damage or contamination</li>
                    <li>• Check for unusual sounds or odors</li>
                    <li>• Verify indicator lights functioning</li>
                    <li>• Clean exterior of enclosures</li>
                  </ul>
                </div>
                <div>
                  <p className="text-elec-yellow font-medium mb-2">Quarterly Tasks:</p>
                  <ul className="text-gray-300 space-y-1">
                    <li>• Thermal imaging scan under load</li>
                    <li>• Torque check on connections</li>
                    <li>• Inspect contacts for wear</li>
                    <li>• Test control circuit operation</li>
                  </ul>
                </div>
                <div>
                  <p className="text-elec-yellow font-medium mb-2">Annual Tasks:</p>
                  <ul className="text-gray-300 space-y-1">
                    <li>• Complete electrical testing</li>
                    <li>• Replace contacts showing wear</li>
                    <li>• Clean and vacuum enclosures</li>
                    <li>• Verify grounding integrity</li>
                  </ul>
                </div>
                <div>
                  <p className="text-elec-yellow font-medium mb-2">Condition-Based:</p>
                  <ul className="text-gray-300 space-y-1">
                    <li>• Replace coils showing degradation</li>
                    <li>• Address thermal anomalies immediately</li>
                    <li>• Correct loose connections found</li>
                    <li>• Update documentation continuously</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Settings className="w-5 h-5 text-elec-yellow" />
                Best Practices for Extended Equipment Life
              </h4>
              <ul className="text-gray-300 text-sm space-y-2">
                <li>• <strong>Proper sizing:</strong> Select contactors and relays rated for actual inrush and continuous currents</li>
                <li>• <strong>Environment control:</strong> Maintain acceptable temperature and humidity ranges</li>
                <li>• <strong>Clean conditions:</strong> Keep enclosures free of dust, moisture, and contaminants</li>
                <li>• <strong>Connection integrity:</strong> Maintain proper torque on all terminals per manufacturer specs</li>
                <li>• <strong>Surge protection:</strong> Install appropriate suppression for coils and sensitive electronics</li>
                <li>• <strong>Documentation:</strong> Maintain records of inspections, measurements, and replacements</li>
              </ul>
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

        {/* Quick Reference Card */}
        <section className="bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] rounded-lg p-6 border border-elec-yellow/30">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-6 h-6 text-elec-yellow" />
            <h2 className="text-xl font-bold text-elec-yellow">Quick Reference Card</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-white mb-3">Coil Testing Quick Guide</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-elec-yellow border-b border-gray-600">
                    <th className="text-left py-2">Reading</th>
                    <th className="text-left py-2">Indicates</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr className="border-b border-gray-700">
                    <td className="py-2">OL (Infinite)</td>
                    <td className="py-2">Open coil - replace</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-2">Very low (&lt;10Ω)</td>
                    <td className="py-2">Shorted turns - replace</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-2">Within spec</td>
                    <td className="py-2">Coil OK</td>
                  </tr>
                  <tr>
                    <td className="py-2">High resistance</td>
                    <td className="py-2">Degraded - monitor/replace</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-3">Thermal Imaging Action Levels</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-elec-yellow border-b border-gray-600">
                    <th className="text-left py-2">Temp Rise</th>
                    <th className="text-left py-2">Action Required</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr className="border-b border-gray-700">
                    <td className="py-2">&lt;10°C</td>
                    <td className="py-2">Normal - routine monitoring</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-2">10-20°C</td>
                    <td className="py-2">Schedule investigation</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-2">20-40°C</td>
                    <td className="py-2">Priority repair needed</td>
                  </tr>
                  <tr>
                    <td className="py-2">&gt;40°C</td>
                    <td className="py-2">Immediate attention required</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="md:col-span-2">
              <h3 className="font-semibold text-white mb-3">Troubleshooting Priority Order</h3>
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
        </section>

        {/* FAQ Section */}
        <section className="space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-elec-yellow">
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-[#2a2a2a] rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-4 text-left min-h-[44px] touch-manipulation"
                >
                  <span className="font-medium text-white pr-4">{faq.question}</span>
                  {expandedFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                  )}
                </button>
                {expandedFAQ === index && (
                  <div className="px-4 pb-4">
                    <p className="text-gray-300 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <section className="space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-elec-yellow">
            Section Quiz
          </h2>
          <Quiz questions={quizQuestions} />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row justify-between gap-4 pt-8 border-t border-gray-700">
          <Button
            onClick={() => navigate('/upskilling/industrial-electrical/module-5/section-1')}
            variant="outline"
            className="min-h-[44px] touch-manipulation active:scale-[0.98] bg-transparent border-gray-600 text-white hover:bg-gray-800 hover:border-elec-yellow"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            <span>
              <span className="text-gray-400 text-sm block">Previous</span>
              <span className="text-white">Section 1: Systematic Troubleshooting Methods</span>
            </span>
          </Button>

          <Button
            onClick={() => navigate('/upskilling/industrial-electrical/module-5/section-3')}
            className="min-h-[44px] touch-manipulation active:scale-[0.98] bg-elec-yellow text-[#1a1a1a] hover:bg-yellow-400"
          >
            <span className="text-right">
              <span className="text-[#1a1a1a]/70 text-sm block">Next</span>
              <span className="text-[#1a1a1a]">Section 3: Motor Control Circuit Faults</span>
            </span>
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default IndustrialElectricalModule5Section2;
