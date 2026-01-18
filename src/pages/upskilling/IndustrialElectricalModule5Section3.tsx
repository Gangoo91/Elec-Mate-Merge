import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';
import {
  ArrowLeft,
  ArrowRight,
  Activity,
  Zap,
  Cable,
  AlertTriangle,
  Gauge,
  BookOpen,
  Target,
  Shield,
  Lightbulb,
  Waves,
  Search,
  FileCheck
} from 'lucide-react';

// Quick Check Questions for InlineCheck component
const quickCheckQuestions = [
  {
    id: 'qc-m5s3-1',
    question: 'When performing continuity testing on a de-energised circuit, what is the maximum acceptable resistance for a protective conductor in a 2.5mm² cable run of 30 metres?',
    options: [
      'Less than 0.1 ohms',
      'Less than 0.5 ohms',
      'Less than 1.0 ohms',
      'Less than 2.0 ohms'
    ],
    correctIndex: 1,
    explanation: 'For a 2.5mm² copper conductor at 30m, the expected resistance is approximately 0.22 ohms (7.41 mΩ/m × 30m). Adding test lead resistance and connections, readings under 0.5 ohms are acceptable. Higher values indicate poor connections, damaged conductors, or incorrect cable sizing.'
  },
  {
    id: 'qc-m5s3-2',
    question: 'A 4-20mA loop shows 4.8mA at zero input. What does this indicate?',
    options: [
      'Normal operation - within tolerance',
      'Zero shift error requiring calibration',
      'Open circuit fault in the loop',
      'Short circuit on the transmitter'
    ],
    correctIndex: 1,
    explanation: 'Standard tolerance for 4-20mA signals is typically ±0.1mA (0.5% of span). A reading of 4.8mA at zero represents a 0.8mA error (5% shift), indicating the transmitter requires zero calibration. An open circuit would show 0mA, while a short would typically cause maximum output or equipment damage.'
  },
  {
    id: 'qc-m5s3-3',
    question: 'When using a TDR (Time Domain Reflectometer) to locate a cable fault, the display shows a downward reflection at 47 metres. What type of fault is indicated?',
    options: [
      'Open circuit (broken conductor)',
      'Short circuit between conductors',
      'High resistance joint',
      'Healthy cable termination'
    ],
    correctIndex: 1,
    explanation: 'TDR operation relies on impedance changes causing reflections. An upward (positive) reflection indicates increased impedance (open circuit). A downward (negative) reflection indicates decreased impedance (short circuit). A high resistance joint shows a small positive reflection followed by continuation of the pulse.'
  }
];

// Quiz Questions
const quizQuestions = [
  {
    question: 'According to BS 7671, what is the purpose of the R1+R2 continuity test?',
    options: [
      'To measure insulation resistance between conductors',
      'To verify the earth fault loop path is continuous and of acceptable resistance',
      'To check the voltage drop across the circuit',
      'To test the operation of RCDs'
    ],
    correctAnswer: 'To verify the earth fault loop path is continuous and of acceptable resistance'
  },
  {
    question: 'When testing loop resistance in a control circuit using the three-wire method, what advantage does this provide?',
    options: [
      'It eliminates the resistance of the test leads from the measurement',
      'It allows testing with the circuit energised',
      'It measures capacitance as well as resistance',
      'It provides automatic temperature compensation'
    ],
    correctAnswer: 'It eliminates the resistance of the test leads from the measurement'
  },
  {
    question: 'What is the live-dead-live testing procedure used to verify before working on a circuit?',
    options: [
      'Test a known live source, test the circuit, test the known live source again',
      'Test resistance, test voltage, test resistance',
      'Test with one meter, test with another meter, compare results',
      'Test at supply end, test at load end, test at midpoint'
    ],
    correctAnswer: 'Test a known live source, test the circuit, test the known live source again'
  },
  {
    question: 'In a 4-20mA current loop, what current represents 50% of the measured variable range?',
    options: [
      '8mA',
      '10mA',
      '12mA',
      '16mA'
    ],
    correctAnswer: '12mA'
  },
  {
    question: 'What is the velocity factor (VF) used for in TDR cable fault location?',
    options: [
      'Determining the cable insulation quality',
      'Calculating the actual distance to a fault based on signal propagation speed',
      'Measuring the resistance per metre of cable',
      'Compensating for temperature effects on resistance'
    ],
    correctAnswer: 'Calculating the actual distance to a fault based on signal propagation speed'
  },
  {
    question: 'When documenting continuity test results, what information must be recorded according to BS 7671?',
    options: [
      'Only pass or fail status',
      'The measured value, circuit reference, date, and signature of tester',
      'Just the cable size and length',
      'Only circuits that failed the test'
    ],
    correctAnswer: 'The measured value, circuit reference, date, and signature of tester'
  },
  {
    question: 'What could cause a loop resistance reading that increases over time during the test?',
    options: [
      'A solid short circuit',
      'Correct cable connections',
      'Heating effect in a high resistance joint',
      'Properly terminated cable ends'
    ],
    correctAnswer: 'Heating effect in a high resistance joint'
  },
  {
    question: 'When testing a HART-enabled 4-20mA loop, what precaution is necessary?',
    options: [
      'The loop must be completely de-energised',
      'Only DC measurements should be taken to avoid interfering with digital signals',
      'The transmitter must be in manual mode',
      'Loop resistance must be above 250 ohms'
    ],
    correctAnswer: 'Only DC measurements should be taken to avoid interfering with digital signals'
  },
  {
    question: 'What is the purpose of a loop calibrator in 4-20mA circuit testing?',
    options: [
      'To measure cable length',
      'To simulate transmitter output and verify receiver response across the full range',
      'To test insulation resistance',
      'To locate cable faults'
    ],
    correctAnswer: 'To simulate transmitter output and verify receiver response across the full range'
  },
  {
    question: 'When performing voltage tracing on an energised control circuit, what reading would indicate a poor connection?',
    options: [
      'Zero volts across the connection when current is flowing',
      'A voltage drop across the connection point when current is flowing',
      'Supply voltage at the load terminals',
      'Equal voltage on both sides of a switch in the ON position'
    ],
    correctAnswer: 'A voltage drop across the connection point when current is flowing'
  }
];

// FAQ Data
const faqItems = [
  {
    question: 'What is the difference between continuity testing and insulation resistance testing?',
    answer: 'Continuity testing verifies that conductors form a complete, low-resistance path for current flow. It uses a low voltage (typically 4-24V DC) and checks that connections are sound and conductors are intact. Insulation resistance testing verifies that insulation between conductors and between conductors and earth is adequate to prevent leakage current. It uses high voltage (typically 250-1000V DC) and expects very high readings (megohms). Continuity testing expects LOW readings (milliohms to a few ohms), while insulation testing expects HIGH readings. Both tests are required for BS 7671 compliance and serve complementary purposes in verifying circuit integrity.'
  },
  {
    question: 'How do I calculate the expected R1+R2 value for a circuit?',
    answer: 'To calculate expected R1+R2: First, determine the cable length (L) and cross-sectional area (CSA) of both phase (R1) and CPC (R2) conductors. Use the resistance formula: R = (ρ × L) / A, where ρ is resistivity (1.72 × 10⁻⁸ Ω·m for copper at 20°C). For practical calculations, use published mΩ/m values: 1.0mm² = 18.1 mΩ/m, 1.5mm² = 12.1 mΩ/m, 2.5mm² = 7.41 mΩ/m, 4.0mm² = 4.61 mΩ/m, 6.0mm² = 3.08 mΩ/m. Multiply by cable length for each conductor, then add R1+R2. For circuits with the same CSA for phase and CPC, simply double the single conductor resistance. Always allow for temperature correction and connection resistances.'
  },
  {
    question: 'What are the common causes of failed continuity tests in industrial installations?',
    answer: 'Common causes include: 1) Loose terminal connections - torque not applied correctly or vibration has loosened connections. 2) Corroded or oxidised connections - especially in harsh environments. 3) Damaged conductors - mechanical damage, overcurrent events, or rodent damage. 4) Incorrect conductor sizing - undersized cables showing higher than expected resistance. 5) Long cable runs - cumulative resistance exceeding calculated values. 6) Poor quality crimps or joints - insufficient compression or wrong size ferrules. 7) Wrong cable connected - mis-wiring during installation. 8) Test equipment issues - flat batteries, damaged leads, or poor probe contact. Always verify test equipment on a known reference before concluding a circuit fault.'
  },
  {
    question: 'How do I test a 4-20mA loop without disrupting the process?',
    answer: 'To test without process disruption: 1) Use a clamp-on milliamp meter around one conductor - this reads current non-invasively without breaking the loop. 2) Measure voltage across a known resistance in the loop (typically the 250Ω resistor at the receiver) - 1-5V corresponds to 4-20mA. 3) Use the transmitter test points if available - many transmitters have dedicated test terminals. 4) Check at the DCS/PLC input card - most have test points or diagnostic readings available. 5) View live values in the control system HMI if available. Never break a live loop in a running process - this can cause control valves to fail to their default position and potentially dangerous process upsets. If loop must be broken, ensure the process is in a safe state and operators are informed.'
  },
  {
    question: 'When should I use a TDR versus other fault location methods?',
    answer: 'Use TDR when: 1) Cable is inaccessible (buried, in conduit, or in cable trays). 2) Fault location is unknown and cable is long. 3) Multiple faults may exist. 4) You need to pinpoint fault distance accurately. TDR limitations: Less effective on very short cables (<10m), requires knowledge of cable velocity factor, and may not detect high-resistance faults well. Alternative methods: For accessible cables, visual inspection and sectional testing may be faster. For high-resistance faults, insulation resistance testing at different points can isolate the section. For intermittent faults, apply mechanical stress while monitoring continuity. Murray loop test is useful when one conductor is healthy - it uses bridge measurement to calculate fault distance as a ratio of total cable length.'
  },
  {
    question: 'What documentation is required for loop testing in industrial installations?',
    answer: 'Required documentation includes: 1) Test certificates per BS 7671 Schedule of Test Results showing continuity, insulation resistance, and earth fault loop impedance values. 2) Loop calibration records for 4-20mA circuits showing input values versus output readings at 0%, 25%, 50%, 75%, and 100% of range. 3) Cable test reports identifying cable reference, test date, tester name, equipment used (with calibration dates), ambient conditions, and all measured values. 4) Fault reports documenting any issues found, location, cause if determined, and remedial action taken. 5) As-built drawings updated to reflect actual installation. 6) Equipment calibration certificates for test instruments. These records demonstrate due diligence, support maintenance planning, provide baseline values for future comparison, and are essential for warranty claims and insurance purposes.'
  }
];

const IndustrialElectricalModule5Section3: React.FC = () => {
  const [showQuiz, setShowQuiz] = useState(false);

  useSEO({
    title: 'Loop Testing and Continuity | Industrial Electrical Module 5 Section 3',
    description: 'Master loop testing and continuity verification for industrial electrical systems. Learn safe testing methods, 4-20mA signal loops, TDR fault location, and BS 7671 compliance requirements.',
    keywords: [
      'loop testing',
      'continuity testing',
      '4-20mA circuits',
      'TDR cable fault location',
      'BS 7671 verification',
      'industrial electrical testing',
      'loop resistance',
      'control circuit testing'
    ],
    canonicalUrl: '/study-centre/upskilling/industrial-electrical/module-5/section-3',
    ogType: 'article'
  });

  return (
    <div className="bg-background text-foreground">
      {/* Sticky Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" asChild>
            <Link to="/electrician/upskilling/industrial-electrical-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <span className="text-sm text-muted-foreground">Module 5 &gt; Section 3</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-6 space-y-8">
        {/* Title Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-elec-yellow/10">
            <Activity className="w-8 h-8 text-elec-yellow" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Loop Testing and Continuity
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Master safe testing methods, signal loop verification, and cable fault location techniques
          </p>
        </div>

        {/* Section Overview */}
        <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
          <div className="flex items-start gap-3">
            <Target className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
            <div>
              <h2 className="font-semibold text-foreground mb-2">Learning Objectives</h2>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>- Perform continuity tests using correct methods and interpret results</li>
                <li>- Understand loop resistance measurement techniques for control circuits</li>
                <li>- Safely test energised circuits using voltage tracing techniques</li>
                <li>- Test and calibrate 4-20mA signal loops with appropriate equipment</li>
                <li>- Locate cable faults using TDR and other diagnostic methods</li>
                <li>- Document test results to meet BS 7671 and industry requirements</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 1: Continuity Testing Principles */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Continuity Testing Principles and Methods
          </h2>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Continuity testing verifies that electrical conductors form a complete, unbroken path with acceptably
              low resistance. This fundamental test is essential for verifying protective conductors, bonding
              connections, and circuit integrity before energisation.
            </p>

            <div className="bg-background/50 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Cable className="w-5 h-5 text-elec-yellow" />
                BS 7671 Continuity Requirements
              </h4>
              <ul className="text-white space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span><strong>Protective Conductors:</strong> Verify continuous path from distribution board to each point</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span><strong>Main Bonding:</strong> Test from MET to all extraneous conductive parts</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span><strong>Supplementary Bonding:</strong> Verify connections between simultaneously accessible parts</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span><strong>Ring Final Circuits:</strong> Confirm correct ring connection and cross-sectional area</span>
                </li>
              </ul>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-background/50 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-green-400 mb-3">Two-Wire Method</h4>
                <p className="text-white text-sm mb-2">
                  Standard method using test leads directly connected to conductor ends. Simple but includes
                  lead resistance in measurement.
                </p>
                <ul className="text-sm text-white space-y-1">
                  <li>- Null test leads before measurement</li>
                  <li>- Subtract lead resistance from readings</li>
                  <li>- Suitable for short cable runs</li>
                  <li>- Quick verification of connections</li>
                </ul>
              </div>

              <div className="bg-background/50 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-blue-400 mb-3">Three-Wire (Kelvin) Method</h4>
                <p className="text-white text-sm mb-2">
                  Uses separate current and voltage paths to eliminate lead resistance. Essential for accurate
                  low-resistance measurements.
                </p>
                <ul className="text-sm text-white space-y-1">
                  <li>- Four-terminal connection technique</li>
                  <li>- Current leads inject test current</li>
                  <li>- Voltage leads measure only conductor</li>
                  <li>- Accuracy to 0.001 ohm possible</li>
                </ul>
              </div>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-orange-300">Test Equipment Requirements</h4>
                  <p className="text-white text-sm">
                    BS 7671 requires continuity testers to produce a test current of at least 200mA with an
                    open-circuit voltage between 4V and 24V DC. This ensures sufficient current to detect
                    high-resistance joints that might otherwise appear satisfactory with lower test currents.
                    Always verify test equipment calibration before use.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-background/50 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-foreground mb-3">Conductor Resistance Reference Values (at 20°C)</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 px-3 text-elec-yellow">CSA (mm²)</th>
                      <th className="text-left py-2 px-3 text-elec-yellow">mΩ/m (Copper)</th>
                      <th className="text-left py-2 px-3 text-elec-yellow">10m Run (mΩ)</th>
                    </tr>
                  </thead>
                  <tbody className="text-white">
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-3">1.0</td>
                      <td className="py-2 px-3">18.10</td>
                      <td className="py-2 px-3">181</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-3">1.5</td>
                      <td className="py-2 px-3">12.10</td>
                      <td className="py-2 px-3">121</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-3">2.5</td>
                      <td className="py-2 px-3">7.41</td>
                      <td className="py-2 px-3">74.1</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-3">4.0</td>
                      <td className="py-2 px-3">4.61</td>
                      <td className="py-2 px-3">46.1</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-3">6.0</td>
                      <td className="py-2 px-3">3.08</td>
                      <td className="py-2 px-3">30.8</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">10.0</td>
                      <td className="py-2 px-3">1.83</td>
                      <td className="py-2 px-3">18.3</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-white text-xs mt-2">
                Note: Apply temperature correction factor of 1.2 for conductors at typical operating temperature (70°C)
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Loop Resistance in Control Circuits */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Loop Resistance in Control Circuits
          </h2>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Control circuits in industrial installations require careful loop resistance verification to ensure
              reliable operation. Unlike power circuits where voltage drop is the primary concern, control circuits
              must maintain sufficient voltage to operate contactors, relays, and PLCs reliably.
            </p>

            <div className="bg-background/50 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Gauge className="w-5 h-5 text-elec-yellow" />
                Loop Resistance Impact on Control Devices
              </h4>
              <div className="space-y-3 text-white text-sm">
                <p>
                  <strong>Contactor Coils:</strong> Most AC contactors require 85-110% of rated voltage to pull in
                  reliably and hold in at 80-110%. Excessive loop resistance causing voltage drop below these
                  thresholds results in chattering, failure to pick up, or intermittent dropout.
                </p>
                <p>
                  <strong>PLC Inputs:</strong> Digital inputs typically require minimum voltage (often 18V for 24V
                  systems) to register as HIGH. Loop resistance causing voltage drop can create unreliable input sensing.
                </p>
                <p>
                  <strong>Relay Coils:</strong> Control relays have similar requirements to contactors. DC relays are
                  particularly sensitive to voltage drop as there is no AC impedance to limit current.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-background/50 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-green-400 mb-3">Calculating Allowable Loop Resistance</h4>
                <p className="text-white text-sm mb-3">
                  Maximum loop resistance = Allowable voltage drop / Circuit current
                </p>
                <div className="bg-background/80 p-3 rounded border border-white/5">
                  <p className="text-sm text-white">
                    <strong>Example:</strong> 24V DC circuit, device requires minimum 20V, coil draws 100mA
                  </p>
                  <p className="text-sm text-elec-yellow mt-2">
                    R(max) = (24V - 20V) / 0.1A = 40Ω maximum loop resistance
                  </p>
                </div>
              </div>

              <div className="bg-background/50 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-blue-400 mb-3">Test Procedure</h4>
                <ol className="text-sm text-white space-y-2">
                  <li>1. Isolate and prove dead (live-dead-live)</li>
                  <li>2. Connect test leads at supply end</li>
                  <li>3. Short circuit at load end</li>
                  <li>4. Measure total loop resistance (both conductors)</li>
                  <li>5. Compare to calculated maximum</li>
                  <li>6. Record results with ambient temperature</li>
                </ol>
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-red-400">High Resistance Joint Detection</h4>
                  <p className="text-white text-sm">
                    A high resistance joint may measure acceptable when cold but fail under load due to heating
                    effects. When testing suspect circuits, apply rated current for several minutes while monitoring
                    resistance. An increasing resistance indicates a poor joint that will cause problems in service.
                    Thermal imaging during loaded operation can pinpoint such defects.
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

        {/* Section 3: Testing Energised Circuits */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Testing with Circuits Energised (Voltage Tracing)
          </h2>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              While de-energised testing is always preferred, fault diagnosis often requires testing circuits under
              operating conditions. Voltage tracing identifies where voltage is present, lost, or dropped unexpectedly,
              helping locate faults that may not be apparent with the circuit de-energised.
            </p>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-red-400">Live Working Safety Requirements</h4>
                  <ul className="text-white text-sm mt-2 space-y-1">
                    <li>- Risk assessment required demonstrating live work is essential</li>
                    <li>- Only competent persons with specific authorisation</li>
                    <li>- Use appropriate PPE (insulated gloves, eye protection)</li>
                    <li>- Insulated tools rated for voltage present</li>
                    <li>- Test equipment to GS38 requirements (fused probes, shrouded tips)</li>
                    <li>- Second person present for higher risk activities</li>
                    <li>- Barriers and warning signs in place</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-background/50 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-foreground mb-3">Voltage Tracing Methodology</h4>
              <div className="space-y-4">
                <div className="border-l-4 border-elec-yellow pl-4">
                  <h5 className="font-semibold text-foreground mb-2">Step 1: Verify Test Equipment</h5>
                  <p className="text-white text-sm">
                    Apply live-dead-live principle: Test on known live source, test the circuit under investigation,
                    test known live source again. This confirms your meter is working before and after testing.
                  </p>
                </div>
                <div className="border-l-4 border-elec-yellow pl-4">
                  <h5 className="font-semibold text-foreground mb-2">Step 2: Reference Point Establishment</h5>
                  <p className="text-white text-sm">
                    Establish a reliable reference point (neutral or earth). Verify reference is valid by measuring
                    known supply voltage. Use this same reference throughout testing.
                  </p>
                </div>
                <div className="border-l-4 border-elec-yellow pl-4">
                  <h5 className="font-semibold text-foreground mb-2">Step 3: Sequential Voltage Checks</h5>
                  <p className="text-white text-sm">
                    Trace from supply towards load, checking voltage at each connection point, switch contact,
                    and device terminal. Record readings and note where voltage is lost or reduced.
                  </p>
                </div>
                <div className="border-l-4 border-elec-yellow pl-4">
                  <h5 className="font-semibold text-foreground mb-2">Step 4: Interpret Results</h5>
                  <p className="text-white text-sm">
                    Full voltage on one side of component, zero on other = component operated or open.
                    Reduced voltage = excessive resistance (poor connection). Voltage present but device not
                    operating = faulty device or insufficient current path.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-background/50 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-green-400 mb-3">Voltage Drop Analysis</h4>
                <p className="text-white text-sm mb-2">
                  Measuring across connection points while current flows identifies high-resistance joints:
                </p>
                <ul className="text-sm text-white space-y-1">
                  <li>- Good connection: Less than 10mV drop</li>
                  <li>- Marginal connection: 10-100mV drop</li>
                  <li>- Poor connection: 100mV-1V drop</li>
                  <li>- Bad connection: Greater than 1V drop</li>
                </ul>
              </div>

              <div className="bg-background/50 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-blue-400 mb-3">Ghost Voltage Awareness</h4>
                <p className="text-white text-sm mb-2">
                  High-impedance meters can display phantom voltages from capacitive coupling:
                </p>
                <ul className="text-sm text-white space-y-1">
                  <li>- Use low-impedance voltage detector first</li>
                  <li>- Apply load (approved indicator lamp)</li>
                  <li>- True voltage maintains under load</li>
                  <li>- Ghost voltage collapses with minimal load</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Signal Loop Testing (4-20mA) */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Signal Loop Testing (4-20mA Circuits)
          </h2>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 space-y-4">
            <div className="flex items-start gap-3">
              <Waves className="w-6 h-6 text-elec-yellow flex-shrink-0 mt-1" />
              <p className="text-muted-foreground leading-relaxed">
                The 4-20mA current loop is the dominant analogue signal standard in industrial instrumentation.
                Unlike voltage signals, current signals are immune to voltage drop and electrical noise over
                long cable runs, making them ideal for process control applications.
              </p>
            </div>

            <div className="bg-background/50 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-foreground mb-3">4-20mA Signal Characteristics</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-semibold text-white mb-2">Current to Percentage Conversion</h5>
                  <ul className="text-sm text-white space-y-1">
                    <li>4mA = 0% of range</li>
                    <li>8mA = 25% of range</li>
                    <li>12mA = 50% of range</li>
                    <li>16mA = 75% of range</li>
                    <li>20mA = 100% of range</li>
                  </ul>
                  <p className="text-xs text-white mt-2">Formula: % = (mA - 4) / 16 × 100</p>
                </div>
                <div>
                  <h5 className="font-semibold text-white mb-2">Why 4mA for Zero?</h5>
                  <p className="text-sm text-white">
                    Live zero allows differentiation between 0% signal (4mA) and fault condition (0mA).
                    If cable breaks or transmitter fails, current drops to 0mA, immediately indicating
                    a fault rather than appearing as a valid zero reading.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-background/50 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-foreground mb-3">Loop Calibration Equipment</h4>
              <div className="space-y-4 text-sm">
                <div>
                  <h5 className="font-semibold text-green-400 mb-2">Loop Calibrator Functions</h5>
                  <ul className="text-white space-y-1">
                    <li><strong>Source Mode:</strong> Generates precise 4-20mA signal to test receivers (PLC inputs, displays, controllers)</li>
                    <li><strong>Simulate Mode:</strong> Powers and controls 2-wire transmitter simulation</li>
                    <li><strong>Measure Mode:</strong> Reads mA signal from operating transmitter</li>
                    <li><strong>Read Mode:</strong> Passive measurement without affecting loop</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-blue-400 mb-2">Clamp-On mA Meters</h5>
                  <p className="text-white">
                    Non-invasive measurement around a single conductor. Ideal for testing live loops without
                    breaking the circuit. Accuracy typically ±1% of reading. Essential tool for troubleshooting
                    running processes.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-background/50 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-foreground mb-3">Loop Testing Procedure</h4>
              <ol className="text-white space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-elec-yellow">1.</span>
                  <span><strong>Verify loop power:</strong> Check 24V DC supply present at transmitter. Low supply voltage affects accuracy.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-elec-yellow">2.</span>
                  <span><strong>Check loop resistance:</strong> Total loop resistance (including receiver) must be within transmitter capability. Typically 250-600 ohms maximum.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-elec-yellow">3.</span>
                  <span><strong>Zero calibration:</strong> Apply 0% input to transmitter, verify 4.00mA output (±0.08mA tolerance).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-elec-yellow">4.</span>
                  <span><strong>Span calibration:</strong> Apply 100% input, verify 20.00mA output (±0.08mA tolerance).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-elec-yellow">5.</span>
                  <span><strong>Linearity check:</strong> Test at 25%, 50%, 75% points. Maximum deviation typically ±0.25% of span.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-elec-yellow">6.</span>
                  <span><strong>Verify receiver:</strong> Confirm DCS/PLC displays correct engineering values at each test point.</span>
                </li>
              </ol>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-blue-400">HART Protocol Considerations</h4>
                  <p className="text-white text-sm">
                    HART (Highway Addressable Remote Transducer) superimposes digital communication on the
                    4-20mA signal using FSK modulation at 1200 and 2200 Hz. When testing HART loops: use DC
                    measurement only, avoid loading that could attenuate digital signals, minimum 250 ohm loop
                    resistance required for HART communication. HART communicators can diagnose transmitter
                    configuration and calibration without physical access.
                  </p>
                </div>
              </div>
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

        {/* Section 5: Cable Fault Location */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Cable Fault Location Techniques
          </h2>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 space-y-4">
            <div className="flex items-start gap-3">
              <Search className="w-6 h-6 text-elec-yellow flex-shrink-0 mt-1" />
              <p className="text-muted-foreground leading-relaxed">
                When continuity or insulation testing indicates a cable fault, locating the exact position saves
                significant time and disruption compared to complete cable replacement. Several techniques exist,
                each suited to different fault types and cable installations.
              </p>
            </div>

            <div className="bg-background/50 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-foreground mb-3">Time Domain Reflectometry (TDR)</h4>
              <p className="text-white text-sm mb-4">
                TDR sends a fast electrical pulse down the cable and analyses reflections caused by impedance
                changes. Any discontinuity (open, short, splice, or damage) reflects part of the pulse back
                to the instrument.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-semibold text-green-400 mb-2">Reflection Interpretation</h5>
                  <ul className="text-sm text-white space-y-1">
                    <li><strong>Upward reflection:</strong> Impedance increase (open circuit, unterminated end)</li>
                    <li><strong>Downward reflection:</strong> Impedance decrease (short circuit, water ingress)</li>
                    <li><strong>No reflection:</strong> Matched impedance (properly terminated)</li>
                    <li><strong>Partial reflection:</strong> Partial fault or splice</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-blue-400 mb-2">Velocity Factor (VF)</h5>
                  <p className="text-sm text-white">
                    Signals travel slower in cable than in free space. VF expresses cable velocity as ratio
                    of light speed. Typical values: PVC cable 0.66, XLPE cable 0.87, mineral insulated 0.95.
                    Incorrect VF causes distance error - always verify with known cable length.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-background/50 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-green-400 mb-3">Murray Loop Test</h4>
                <p className="text-white text-sm mb-2">
                  Bridge method using one healthy conductor and the faulty conductor looped at the far end.
                </p>
                <div className="bg-background/80 p-3 rounded border border-white/5 mt-2">
                  <p className="text-xs text-white">
                    Distance to fault: L(x) = 2L × R1 / (R1 + R2)
                  </p>
                  <p className="text-xs text-white mt-1">
                    Where L = cable length, R1 &amp; R2 = bridge arm resistances at balance
                  </p>
                </div>
                <p className="text-xs text-white mt-2">
                  Advantages: Simple equipment, accurate for LV faults, works with basic bridge meter.
                </p>
              </div>

              <div className="bg-background/50 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-blue-400 mb-3">Sectionalising Method</h4>
                <p className="text-white text-sm mb-2">
                  Divide and conquer approach for accessible cables:
                </p>
                <ol className="text-sm text-white space-y-1">
                  <li>1. Test from each end to establish fault exists</li>
                  <li>2. Access midpoint and disconnect</li>
                  <li>3. Test each half to identify faulty section</li>
                  <li>4. Repeat until fault located</li>
                </ol>
                <p className="text-xs text-white mt-2">
                  Best for: Junction boxes present, multiple faults suspected, no TDR available.
                </p>
              </div>
            </div>

            <div className="bg-background/50 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-foreground mb-3">Cable Fault Types and Detection</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 px-3 text-elec-yellow">Fault Type</th>
                      <th className="text-left py-2 px-3 text-elec-yellow">Detection Method</th>
                      <th className="text-left py-2 px-3 text-elec-yellow">Best Location Technique</th>
                    </tr>
                  </thead>
                  <tbody className="text-white">
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-3">Complete break</td>
                      <td className="py-2 px-3">Continuity test</td>
                      <td className="py-2 px-3">TDR (clear reflection)</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-3">Short circuit</td>
                      <td className="py-2 px-3">Continuity, IR test</td>
                      <td className="py-2 px-3">TDR, Murray loop</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-3">Earth fault</td>
                      <td className="py-2 px-3">IR test to earth</td>
                      <td className="py-2 px-3">Murray loop, thumper + A-frame</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-3">High resistance</td>
                      <td className="py-2 px-3">Loop resistance under load</td>
                      <td className="py-2 px-3">Thermal imaging, sectionalising</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">Intermittent</td>
                      <td className="py-2 px-3">Continuous monitoring</td>
                      <td className="py-2 px-3">Mechanical stress + continuity</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-orange-300">Thumper Safety Warning</h4>
                  <p className="text-white text-sm">
                    High-voltage cable thumpers (surge generators) used to convert high-resistance faults to
                    low-resistance for easier location can generate dangerous voltages (up to 25kV). Only
                    authorised personnel with specific training should operate this equipment. Ensure all cable
                    ends are isolated and secured, area is cordoned off, and appropriate PPE is worn.
                  </p>
                </div>
              </div>
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

        {/* Section 6: Documentation */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Documenting and Recording Test Results
          </h2>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 space-y-4">
            <div className="flex items-start gap-3">
              <FileCheck className="w-6 h-6 text-elec-yellow flex-shrink-0 mt-1" />
              <p className="text-muted-foreground leading-relaxed">
                Proper documentation of test results is not just good practice - it is a legal requirement under
                BS 7671 and essential for system maintenance, fault investigation, and demonstrating compliance.
                Records provide baseline values for comparison during future testing.
              </p>
            </div>

            <div className="bg-background/50 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-foreground mb-3">BS 7671 Schedule of Test Results</h4>
              <p className="text-white text-sm mb-3">
                The Schedule of Test Results (model forms in Appendix 6 of BS 7671) must record for each circuit:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-semibold text-white mb-2">Circuit Information</h5>
                  <ul className="text-sm text-white space-y-1">
                    <li>- Circuit designation/reference</li>
                    <li>- Circuit description</li>
                    <li>- Type of wiring</li>
                    <li>- Number and size of conductors</li>
                    <li>- Reference method</li>
                    <li>- Overcurrent protective device type and rating</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-white mb-2">Test Results Required</h5>
                  <ul className="text-sm text-white space-y-1">
                    <li>- Continuity of protective conductors (R1+R2)</li>
                    <li>- Continuity of ring final circuit conductors</li>
                    <li>- Insulation resistance</li>
                    <li>- Polarity</li>
                    <li>- Earth fault loop impedance (Zs)</li>
                    <li>- RCD test results where applicable</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-background/50 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-foreground mb-3">Industrial Loop Calibration Records</h4>
              <p className="text-white text-sm mb-3">
                For instrumentation loops, calibration records must include:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 px-3 text-elec-yellow">Input %</th>
                      <th className="text-left py-2 px-3 text-elec-yellow">Expected mA</th>
                      <th className="text-left py-2 px-3 text-elec-yellow">Measured mA</th>
                      <th className="text-left py-2 px-3 text-elec-yellow">Error</th>
                      <th className="text-left py-2 px-3 text-elec-yellow">Pass/Fail</th>
                    </tr>
                  </thead>
                  <tbody className="text-white">
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-3">0%</td>
                      <td className="py-2 px-3">4.00</td>
                      <td className="py-2 px-3">4.02</td>
                      <td className="py-2 px-3">+0.12%</td>
                      <td className="py-2 px-3 text-green-400">Pass</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-3">25%</td>
                      <td className="py-2 px-3">8.00</td>
                      <td className="py-2 px-3">8.01</td>
                      <td className="py-2 px-3">+0.06%</td>
                      <td className="py-2 px-3 text-green-400">Pass</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-3">50%</td>
                      <td className="py-2 px-3">12.00</td>
                      <td className="py-2 px-3">12.03</td>
                      <td className="py-2 px-3">+0.19%</td>
                      <td className="py-2 px-3 text-green-400">Pass</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-3">75%</td>
                      <td className="py-2 px-3">16.00</td>
                      <td className="py-2 px-3">15.98</td>
                      <td className="py-2 px-3">-0.12%</td>
                      <td className="py-2 px-3 text-green-400">Pass</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">100%</td>
                      <td className="py-2 px-3">20.00</td>
                      <td className="py-2 px-3">19.97</td>
                      <td className="py-2 px-3">-0.19%</td>
                      <td className="py-2 px-3 text-green-400">Pass</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-background/50 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-green-400 mb-3">Essential Record Contents</h4>
                <ul className="text-sm text-white space-y-1">
                  <li>- Unique equipment/circuit identifier</li>
                  <li>- Test date and time</li>
                  <li>- Tester name and qualification</li>
                  <li>- Test equipment used (serial numbers)</li>
                  <li>- Calibration status of test equipment</li>
                  <li>- Ambient conditions (temperature)</li>
                  <li>- All measured values</li>
                  <li>- Pass/fail status against criteria</li>
                  <li>- Signature of responsible person</li>
                </ul>
              </div>

              <div className="bg-background/50 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-blue-400 mb-3">Record Retention Requirements</h4>
                <ul className="text-sm text-white space-y-1">
                  <li>- BS 7671 certificates: Life of installation</li>
                  <li>- Calibration records: Typically 5-7 years</li>
                  <li>- Maintenance test records: Life of equipment</li>
                  <li>- Fault investigation reports: Indefinite</li>
                  <li>- Quality system: Per ISO 9001 requirements</li>
                  <li>- Safety-critical systems: Per site procedures</li>
                </ul>
                <p className="text-xs text-white mt-2">
                  Electronic records must be backed up and accessible for required retention period.
                </p>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-green-400">Best Practice: Trend Analysis</h4>
                  <p className="text-white text-sm">
                    Recording consistent test data over time enables trend analysis. Gradually increasing
                    resistance values, declining insulation resistance, or widening calibration errors indicate
                    developing problems before they cause failures. Modern CMMS (Computerised Maintenance
                    Management Systems) can automatically flag concerning trends and schedule preventive maintenance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

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
                  Continuity Test Requirements
                </h4>
                <ul className="text-sm text-white space-y-1">
                  <li>Test voltage: 4-24V DC</li>
                  <li>Test current: Minimum 200mA</li>
                  <li>Null leads before testing</li>
                  <li>Compare to calculated R1+R2</li>
                  <li>Record actual measured values</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2 border-b border-white/10 pb-1">
                  4-20mA Quick Conversions
                </h4>
                <ul className="text-sm text-white space-y-1">
                  <li>4mA = 0% = 1.00V (across 250 ohm)</li>
                  <li>8mA = 25% = 2.00V</li>
                  <li>12mA = 50% = 3.00V</li>
                  <li>16mA = 75% = 4.00V</li>
                  <li>20mA = 100% = 5.00V</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2 border-b border-white/10 pb-1">
                  TDR Velocity Factors
                </h4>
                <ul className="text-sm text-white space-y-1">
                  <li>PVC/SWA cable: 0.66</li>
                  <li>XLPE insulation: 0.87</li>
                  <li>PE insulation: 0.78</li>
                  <li>Mineral insulated: 0.95</li>
                  <li>Always verify on known length!</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2 border-b border-white/10 pb-1">
                  Copper Resistance (mΩ/m)
                </h4>
                <ul className="text-sm text-white space-y-1">
                  <li>1.0mm² = 18.1 mΩ/m</li>
                  <li>1.5mm² = 12.1 mΩ/m</li>
                  <li>2.5mm² = 7.41 mΩ/m</li>
                  <li>4.0mm² = 4.61 mΩ/m</li>
                  <li>6.0mm² = 3.08 mΩ/m</li>
                </ul>
              </div>

              <div className="md:col-span-2">
                <h4 className="font-semibold text-foreground mb-2 border-b border-white/10 pb-1">
                  Live-Dead-Live Procedure
                </h4>
                <div className="flex flex-wrap gap-2 text-sm">
                  <span className="bg-green-900/50 text-green-300 px-3 py-1 rounded">1. Test known live source</span>
                  <span className="text-white">then</span>
                  <span className="bg-blue-900/50 text-blue-300 px-3 py-1 rounded">2. Test circuit under test</span>
                  <span className="text-white">then</span>
                  <span className="bg-green-900/50 text-green-300 px-3 py-1 rounded">3. Test known live source again</span>
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
              title="Test Your Knowledge: Loop Testing and Continuity"
              passingScore={70}
            />
          )}
        </section>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-white/10">
          <Button variant="outline" className="min-h-[44px] touch-manipulation border-white/20" asChild>
            <Link to="/study-centre/upskilling/industrial-electrical/module-5/section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Section 2
            </Link>
          </Button>
          <Button className="min-h-[44px] touch-manipulation bg-elec-yellow text-background hover:bg-elec-yellow/90" asChild>
            <Link to="/study-centre/upskilling/industrial-electrical/module-5/section-4">
              Next: Section 4 - PLC Diagnostics and Alarms
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </nav>

        {/* Footer Note */}
        <div className="text-center text-muted-foreground text-sm pt-4">
          <p>Industrial Electrical Module 5 - Section 3 of 5</p>
          <p className="mt-1">Complete all sections to master fault-finding strategies</p>
        </div>
      </main>
    </div>
  );
};

export default IndustrialElectricalModule5Section3;
