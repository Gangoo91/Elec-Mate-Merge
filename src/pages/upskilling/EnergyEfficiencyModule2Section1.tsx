import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Quiz from '@/components/apprentice-courses/Quiz';
import InlineCheck from '@/components/apprentice-courses/InlineCheck';
import { useSEO } from '@/hooks/useSEO';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Zap,
  AlertTriangle,
  Activity,
  Gauge,
  FileCheck,
  Wrench,
  BookOpen,
  Lightbulb,
  BarChart3,
  Shield,
} from 'lucide-react';

const EnergyEfficiencyModule2Section1: React.FC = () => {
  const navigate = useNavigate();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  useSEO({
    title: 'Power Quality Factors | Energy Efficiency Module 2 Section 1 | Elec-Mate',
    description:
      'Learn about power quality factors including harmonics, voltage sags, swells, flicker, and remediation techniques. Understand THD measurement, EN 50160 standards, and practical solutions for electrical installations.',
    keywords:
      'power quality, harmonics, THD, voltage sag, voltage swell, flicker, EN 50160, G5/5, power factor, VFD harmonics, harmonic filters, electrical energy efficiency',
    canonicalUrl: '/upskilling/energy-efficiency/module-2/section-1',
  });

  const quickCheckQuestions = [
    {
      id: 'pq-check-1',
      question: 'What is the primary cause of harmonic distortion in modern electrical installations?',
      options: [
        'Resistive heating loads',
        'Non-linear loads such as VFDs and LED drivers',
        'Incandescent lighting',
        'Electric motors running at full load',
      ],
      correctIndex: 1,
      explanation:
        'Non-linear loads like Variable Frequency Drives (VFDs), LED drivers, switch-mode power supplies, and electronic equipment draw current in pulses rather than smooth sine waves, creating harmonic frequencies that distort the supply waveform.',
    },
    {
      id: 'pq-check-2',
      question: 'According to EN 50160, what is the maximum permitted Total Harmonic Distortion (THD) for LV supply voltage?',
      options: ['5%', '8%', '10%', '15%'],
      correctIndex: 1,
      explanation:
        'EN 50160 specifies that THD of the supply voltage should not exceed 8% under normal operating conditions, including all harmonics up to the 40th order. Individual harmonic limits also apply.',
    },
    {
      id: 'pq-check-3',
      question: 'What type of filter is most effective at eliminating specific harmonic frequencies from an installation?',
      options: [
        'Low-pass filter',
        'High-pass filter',
        'Passive tuned harmonic filter',
        'Band-stop filter',
      ],
      correctIndex: 2,
      explanation:
        'Passive tuned harmonic filters are designed to target specific harmonic frequencies (typically 5th, 7th, 11th, 13th). They provide a low-impedance path at the tuned frequency, diverting harmonic currents away from the supply.',
    },
  ];

  const quizQuestions = [
    {
      question: 'What frequency is the 5th harmonic on a 50Hz supply?',
      options: ['100Hz', '150Hz', '200Hz', '250Hz'],
      correctAnswer: '250Hz',
    },
    {
      question: 'Which harmonic orders are considered "triplen" harmonics?',
      options: [
        '2nd, 4th, 6th (even multiples)',
        '3rd, 9th, 15th (multiples of 3)',
        '5th, 7th, 11th (odd non-triplen)',
        '1st, 2nd, 3rd (fundamental and first two)',
      ],
      correctAnswer: '3rd, 9th, 15th (multiples of 3)',
    },
    {
      question: 'What is the typical THD current level produced by a standard 6-pulse VFD without filtering?',
      options: ['5-10%', '15-25%', '30-50%', '60-80%'],
      correctAnswer: '30-50%',
    },
    {
      question: 'A voltage sag is typically defined as a reduction in RMS voltage to what percentage range?',
      options: ['0-10% of nominal', '10-90% of nominal', '90-95% of nominal', '95-99% of nominal'],
      correctAnswer: '10-90% of nominal',
    },
    {
      question: 'Which UK standard specifically addresses harmonic emissions from customer installations?',
      options: ['BS 7671', 'EN 50160', 'ENA Engineering Recommendation G5/5', 'IEC 61000-3-2'],
      correctAnswer: 'ENA Engineering Recommendation G5/5',
    },
    {
      question: 'What is the Pst (short-term flicker severity) limit for LV supplies under EN 50160?',
      options: ['0.5', '1.0', '1.5', '2.0'],
      correctAnswer: '1.0',
    },
    {
      question: 'Which type of equipment is most susceptible to damage from harmonic heating effects?',
      options: [
        'Resistive heaters',
        'Transformers and capacitors',
        'Incandescent lamps',
        'Simple contactors',
      ],
      correctAnswer: 'Transformers and capacitors',
    },
    {
      question: 'An active harmonic filter works by:',
      options: [
        'Blocking harmonics with inductors',
        'Injecting equal and opposite harmonic currents',
        'Absorbing harmonics in resistive elements',
        'Shifting harmonic phase angles',
      ],
      correctAnswer: 'Injecting equal and opposite harmonic currents',
    },
    {
      question: 'What is the main cause of voltage flicker in industrial installations?',
      options: [
        'Harmonic distortion',
        'Large motor starting and arc furnaces',
        'Power factor correction capacitors',
        'Underground cable charging',
      ],
      correctAnswer: 'Large motor starting and arc furnaces',
    },
    {
      question: 'A K-rated transformer is specifically designed to handle:',
      options: [
        'High ambient temperatures',
        'Harmonic-rich loads',
        'Frequent overloads',
        'High fault levels',
      ],
      correctAnswer: 'Harmonic-rich loads',
    },
  ];

  const faqs = [
    {
      question: 'Why do VFDs create harmonics and how can this be mitigated?',
      answer:
        'VFDs use rectifier circuits that convert AC to DC in the drive front-end. Standard 6-pulse rectifiers draw current in short pulses synchronized to the peak of the AC waveform rather than continuously, creating characteristic 5th, 7th, 11th, and 13th harmonics. Mitigation options include: DC link chokes (3-5% impedance), AC line reactors, passive harmonic filters tuned to specific frequencies, active front-end (AFE) drives with IGBT rectifiers, 12-pulse or 18-pulse rectifier configurations, and active harmonic filters. The choice depends on the severity of the problem and cost constraints.',
    },
    {
      question: 'How do I measure THD and what equipment is needed?',
      answer:
        'THD (Total Harmonic Distortion) is measured using a power quality analyser or harmonic-capable clamp meter. The instrument performs a Fast Fourier Transform (FFT) on the waveform to extract individual harmonic magnitudes. THD is calculated as the square root of the sum of squared individual harmonic values divided by the fundamental, expressed as a percentage. For compliance assessment, measurements should be taken over at least one week at the point of common coupling (PCC). Professional instruments like Fluke 435-II, Hioki PQ3100, or Dranetz provide comprehensive analysis including harmonic phase angles and trending.',
    },
    {
      question: 'What problems do triplen harmonics (3rd, 9th, 15th) cause specifically?',
      answer:
        'Triplen harmonics are zero-sequence harmonics that add in the neutral conductor rather than cancelling. In a three-phase four-wire system with significant single-phase non-linear loads (computers, LED lighting), the neutral current can exceed phase currents, potentially overloading undersized neutrals. They also cause circulating currents in delta-connected transformers, leading to additional heating. Solutions include oversized neutrals (typically 150-200% of phase conductor size), separate circuits for non-linear loads, and zig-zag transformers that trap triplen harmonics.',
    },
    {
      question: 'When must I comply with G5/5 and what are the consequences of non-compliance?',
      answer:
        'ENA Engineering Recommendation G5/5 applies when connecting new loads or generation to the UK distribution network. The DNO assesses your installation\'s harmonic emissions against planning levels for your point of connection. If your equipment exceeds the allocated limits, you may be required to install harmonic mitigation before connection is approved, or face refusal of connection. For larger installations (typically >1MVA or with significant non-linear loads), a formal harmonic assessment and G5/5 study may be required as part of the connection application process.',
    },
    {
      question: 'What is the difference between a voltage sag, swell, and transient?',
      answer:
        'A voltage sag (or dip) is a reduction in RMS voltage to 10-90% of nominal, lasting from half a cycle to one minute, typically caused by faults on the network or large motor starting. A voltage swell is an increase to 110-180% of nominal for the same duration range, often caused by load rejection or single-phase faults. A transient is a very short duration event (microseconds to milliseconds) involving rapid voltage changes, caused by lightning, switching operations, or capacitor energization. Each requires different protection strategies.',
    },
    {
      question: 'How do power quality issues affect equipment lifespan and energy costs?',
      answer:
        'Poor power quality significantly impacts both lifespan and costs. Harmonics cause additional heating in transformers (reducing life by 5-20%), premature capacitor failure, motor insulation degradation, and increased losses. Voltage sags cause process interruptions, control system resets, and contactor dropout. The financial impact includes: increased energy losses (2-10% in severe cases), premature equipment replacement, production downtime, and maintenance costs. Studies suggest UK industry loses £1-2 billion annually due to power quality issues. Investment in power quality monitoring and correction typically provides ROI within 1-3 years.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a] text-white">
      {/* Header */}
      <div className="bg-[#1a1a1a]/95 border-b border-gray-700 px-4 py-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
            <BookOpen className="w-4 h-4" />
            <span>Energy Efficiency</span>
            <ChevronRight className="w-4 h-4" />
            <span>Module 2</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-elec-yellow">Section 1</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-elec-yellow mb-2">
            Power Quality Factors
          </h1>
          <p className="text-gray-300">
            Harmonics, Flicker, Voltage Disturbances and Remediation Techniques
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        {/* Section 1: What is Power Quality */}
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-elec-yellow/20 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-elec-yellow" />
            </div>
            <h2 className="text-xl font-semibold text-elec-yellow">
              1. What is Power Quality and Why It Matters
            </h2>
          </div>
          <div className="space-y-4 text-gray-300">
            <p>
              <strong className="text-white">Power quality</strong> refers to how closely the
              electrical supply matches the ideal sinusoidal waveform at the correct voltage,
              frequency, and with minimal distortion. In the UK, the ideal supply is 230V RMS at
              50Hz with a pure sine wave.
            </p>
            <p>
              Poor power quality manifests in several ways: waveform distortion (harmonics), voltage
              variations (sags, swells, flicker), frequency deviations, and transient events. Each
              affects equipment and processes differently.
            </p>
            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h4 className="font-semibold text-white mb-2">Why Power Quality Matters:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">•</span>
                  <span>
                    <strong className="text-white">Equipment life:</strong> Harmonic heating
                    accelerates insulation degradation in motors and transformers
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">•</span>
                  <span>
                    <strong className="text-white">Energy efficiency:</strong> Distorted waveforms
                    increase I²R losses and reduce power factor
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">•</span>
                  <span>
                    <strong className="text-white">Process reliability:</strong> Voltage sags cause
                    control system dropouts and production losses
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">•</span>
                  <span>
                    <strong className="text-white">Regulatory compliance:</strong> DNOs enforce
                    limits on harmonic emissions from customer installations
                  </span>
                </li>
              </ul>
            </div>
            <p>
              The economic impact is significant—UK industry loses an estimated{' '}
              <strong className="text-white">£1-2 billion annually</strong> due to power quality
              issues. Understanding and addressing these factors is essential for energy-efficient
              installations.
            </p>
          </div>
        </section>

        {/* Section 2: Harmonics */}
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-elec-yellow/20 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-elec-yellow" />
            </div>
            <h2 className="text-xl font-semibold text-elec-yellow">
              2. Harmonics: Sources, Effects and THD Measurement
            </h2>
          </div>
          <div className="space-y-4 text-gray-300">
            <p>
              <strong className="text-white">Harmonics</strong> are sinusoidal voltages or currents
              at frequencies that are integer multiples of the fundamental 50Hz supply. The 3rd
              harmonic is 150Hz, 5th is 250Hz, 7th is 350Hz, and so on.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h4 className="font-semibold text-white mb-3">Common Harmonic Sources:</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-elec-yellow text-sm font-medium mb-2">
                    Three-Phase Non-Linear Loads:
                  </h5>
                  <ul className="text-sm space-y-1">
                    <li>• Variable Frequency Drives (VFDs)</li>
                    <li>• UPS systems</li>
                    <li>• DC drives and rectifiers</li>
                    <li>• Large battery chargers</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-elec-yellow text-sm font-medium mb-2">
                    Single-Phase Non-Linear Loads:
                  </h5>
                  <ul className="text-sm space-y-1">
                    <li>• Switch-mode power supplies</li>
                    <li>• LED drivers</li>
                    <li>• Computers and IT equipment</li>
                    <li>• Electronic ballasts</li>
                  </ul>
                </div>
              </div>
            </div>

            <p>
              A standard <strong className="text-white">6-pulse VFD</strong> typically produces 30-50%
              THD current with dominant 5th (20-25%) and 7th (10-15%) harmonics. The characteristic
              harmonics for a 6-pulse rectifier are n = 6k±1 where k = 1, 2, 3... giving 5th, 7th,
              11th, 13th, etc.
            </p>

            <div className="bg-amber-900/30 border border-amber-600 rounded-lg p-4">
              <h4 className="font-semibold text-amber-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Effects of Harmonics
              </h4>
              <ul className="text-sm space-y-2">
                <li>
                  <strong className="text-white">Transformer overheating:</strong> Additional eddy
                  current and hysteresis losses; may require derating or K-rated transformers
                </li>
                <li>
                  <strong className="text-white">Capacitor failure:</strong> Harmonic resonance can
                  cause dramatic overcurrents and premature failure
                </li>
                <li>
                  <strong className="text-white">Neutral overload:</strong> Triplen harmonics (3rd,
                  9th, 15th) add in the neutral, potentially exceeding phase current
                </li>
                <li>
                  <strong className="text-white">Motor heating:</strong> Harmonic currents cause
                  additional rotor losses and torque pulsations
                </li>
                <li>
                  <strong className="text-white">Metering errors:</strong> Some meters may not
                  accurately measure distorted waveforms
                </li>
              </ul>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h4 className="font-semibold text-white mb-2">THD Measurement</h4>
              <p className="text-sm mb-2">
                <strong className="text-elec-yellow">Total Harmonic Distortion (THD)</strong> is
                calculated as:
              </p>
              <div className="bg-[#2a2a2a] p-3 rounded font-mono text-sm text-center mb-2">
                THD = √(V₂² + V₃² + V₄² + ... + Vₙ²) / V₁ × 100%
              </div>
              <p className="text-sm">
                Where V₁ is the fundamental and V₂ through Vₙ are harmonic magnitudes. Measure
                both THD-V (voltage distortion, typically &lt;8%) and THD-I (current distortion,
                varies widely).
              </p>
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

        {/* Section 3: Voltage Sags, Swells and Transients */}
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-elec-yellow/20 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-elec-yellow" />
            </div>
            <h2 className="text-xl font-semibold text-elec-yellow">
              3. Voltage Sags, Swells and Transients
            </h2>
          </div>
          <div className="space-y-4 text-gray-300">
            <p>
              Voltage variations are among the most common power quality issues, causing process
              disruptions and equipment damage across industrial and commercial installations.
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
                <h4 className="font-semibold text-elec-yellow mb-2">Voltage Sag (Dip)</h4>
                <p className="text-sm mb-2">
                  Reduction to <strong className="text-white">10-90%</strong> of nominal voltage
                </p>
                <p className="text-sm mb-2">
                  <strong className="text-white">Duration:</strong> 0.5 cycle to 1 minute
                </p>
                <p className="text-sm">
                  <strong className="text-white">Causes:</strong> Network faults, large motor
                  starting, transformer energization
                </p>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
                <h4 className="font-semibold text-elec-yellow mb-2">Voltage Swell</h4>
                <p className="text-sm mb-2">
                  Increase to <strong className="text-white">110-180%</strong> of nominal voltage
                </p>
                <p className="text-sm mb-2">
                  <strong className="text-white">Duration:</strong> 0.5 cycle to 1 minute
                </p>
                <p className="text-sm">
                  <strong className="text-white">Causes:</strong> Load rejection, single-phase
                  faults, incorrect tap settings
                </p>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
                <h4 className="font-semibold text-elec-yellow mb-2">Transients</h4>
                <p className="text-sm mb-2">
                  Rapid voltage changes <strong className="text-white">&gt;180%</strong> or
                  impulsive
                </p>
                <p className="text-sm mb-2">
                  <strong className="text-white">Duration:</strong> Microseconds to milliseconds
                </p>
                <p className="text-sm">
                  <strong className="text-white">Causes:</strong> Lightning, switching, capacitor
                  energization
                </p>
              </div>
            </div>

            <div className="bg-blue-900/30 border border-blue-600 rounded-lg p-4">
              <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Practical Impact
              </h4>
              <p className="text-sm">
                A voltage sag to 80% for just 100ms can cause AC contactors to drop out, PLCs to
                reset, and VFDs to trip on undervoltage. The{' '}
                <strong className="text-white">CBEMA/ITIC curve</strong> defines equipment
                tolerance limits—most IT equipment can ride through sags above 70% lasting less
                than 0.5 seconds, but deeper or longer sags cause problems.
              </p>
            </div>

            <p>
              <strong className="text-white">Protection strategies</strong> include: voltage
              ride-through settings on VFDs, contactor hold-in devices, UPS systems for critical
              loads, dynamic voltage restorers (DVR) for sensitive processes, and soft starters to
              reduce starting current impacts.
            </p>
          </div>
        </section>

        {/* Section 4: Flicker */}
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-elec-yellow/20 rounded-lg flex items-center justify-center">
              <Gauge className="w-6 h-6 text-elec-yellow" />
            </div>
            <h2 className="text-xl font-semibold text-elec-yellow">4. Flicker and Its Causes</h2>
          </div>
          <div className="space-y-4 text-gray-300">
            <p>
              <strong className="text-white">Flicker</strong> is the visible variation in light
              output caused by voltage fluctuations. It's measured using the{' '}
              <strong className="text-white">Pst</strong> (short-term flicker severity) and{' '}
              <strong className="text-white">Plt</strong> (long-term flicker severity) indices.
            </p>

            <p>
              The human eye is most sensitive to flicker at frequencies around{' '}
              <strong className="text-white">8-10Hz</strong>. Even voltage variations of 0.5% at
              these frequencies can be perceptible and irritating.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h4 className="font-semibold text-white mb-3">Common Causes of Flicker:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">•</span>
                  <span>
                    <strong className="text-white">Arc furnaces:</strong> The largest industrial
                    source due to erratic arc impedance variations
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">•</span>
                  <span>
                    <strong className="text-white">Large motor starting:</strong> DOL starting of
                    motors can draw 6-8× FLC, causing voltage drops
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">•</span>
                  <span>
                    <strong className="text-white">Welding equipment:</strong> Spot welders and arc
                    welders create repetitive load variations
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">•</span>
                  <span>
                    <strong className="text-white">Wind turbines:</strong> Tower shadow and wind
                    gusts cause power output fluctuations
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">•</span>
                  <span>
                    <strong className="text-white">Heat pumps and compressors:</strong> Cyclic
                    loading patterns
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h4 className="font-semibold text-white mb-2">Flicker Limits (EN 50160)</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-elec-yellow">Short-term (Pst)</p>
                  <p className="text-2xl font-bold text-white">≤ 1.0</p>
                  <p className="text-gray-400">10-minute measurement</p>
                </div>
                <div>
                  <p className="text-elec-yellow">Long-term (Plt)</p>
                  <p className="text-2xl font-bold text-white">≤ 1.0</p>
                  <p className="text-gray-400">2-hour measurement</p>
                </div>
              </div>
            </div>

            <p>
              <strong className="text-white">Mitigation</strong> includes: soft starters and VFDs
              for motor starting, static VAR compensators (SVC) for arc furnaces, increasing supply
              capacity to reduce source impedance, and separating flicker-producing loads onto
              dedicated feeders.
            </p>
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

        {/* Section 5: Power Quality Standards */}
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-elec-yellow/20 rounded-lg flex items-center justify-center">
              <FileCheck className="w-6 h-6 text-elec-yellow" />
            </div>
            <h2 className="text-xl font-semibold text-elec-yellow">
              5. Power Quality Standards (EN 50160, G5/5)
            </h2>
          </div>
          <div className="space-y-4 text-gray-300">
            <p>
              Several standards govern power quality in the UK and Europe. Understanding these is
              essential for specifying equipment and obtaining DNO approval for new installations.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h4 className="font-semibold text-elec-yellow mb-3">
                EN 50160 - Voltage Characteristics
              </h4>
              <p className="text-sm mb-3">
                Defines the main characteristics of voltage at the customer's supply terminals
                under normal operating conditions:
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <ul className="space-y-1">
                    <li>
                      • <strong className="text-white">Voltage magnitude:</strong> 230V +10%/-6%
                    </li>
                    <li>
                      • <strong className="text-white">Frequency:</strong> 50Hz ±1%
                    </li>
                    <li>
                      • <strong className="text-white">THD voltage:</strong> ≤8%
                    </li>
                  </ul>
                </div>
                <div>
                  <ul className="space-y-1">
                    <li>
                      • <strong className="text-white">Individual harmonics:</strong> Specified
                      limits per order
                    </li>
                    <li>
                      • <strong className="text-white">Flicker Pst:</strong> ≤1.0
                    </li>
                    <li>
                      • <strong className="text-white">Unbalance:</strong> ≤2%
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h4 className="font-semibold text-elec-yellow mb-3">
                ENA Engineering Recommendation G5/5
              </h4>
              <p className="text-sm mb-3">
                The UK-specific standard for assessing harmonic emissions from customer
                installations connecting to DNO networks:
              </p>
              <ul className="text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">•</span>
                  <span>
                    <strong className="text-white">Stage 1:</strong> Simplified assessment for
                    small installations—if equipment meets IEC 61000-3-2/3-12, no further
                    assessment needed
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">•</span>
                  <span>
                    <strong className="text-white">Stage 2:</strong> Emission assessment comparing
                    equipment emissions to allocated limits at the point of connection
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">•</span>
                  <span>
                    <strong className="text-white">Stage 3:</strong> Detailed network harmonic
                    study for large or complex installations
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-amber-900/30 border border-amber-600 rounded-lg p-4">
              <h4 className="font-semibold text-amber-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Important for Electricians
              </h4>
              <p className="text-sm">
                When installing VFDs, EV chargers, or other non-linear loads, particularly on
                larger installations, check with the DNO if a G5/5 assessment is required. Failing
                to comply can result in connection refusal or requirements for expensive harmonic
                mitigation. For installations over 16A per phase with significant non-linear loads,
                always consult the DNO early in the design phase.
              </p>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h4 className="font-semibold text-white mb-2">Other Relevant Standards:</h4>
              <ul className="text-sm space-y-1">
                <li>
                  • <strong className="text-white">IEC 61000-3-2:</strong> Harmonic current limits
                  for equipment ≤16A
                </li>
                <li>
                  • <strong className="text-white">IEC 61000-3-12:</strong> Harmonic current limits
                  for equipment &gt;16A ≤75A
                </li>
                <li>
                  • <strong className="text-white">IEEE 519:</strong> Harmonic limits at PCC (used
                  internationally)
                </li>
                <li>
                  • <strong className="text-white">BS 7671:</strong> Includes requirements for
                  harmonic consideration in installation design
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 6: Remediation Techniques */}
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-elec-yellow/20 rounded-lg flex items-center justify-center">
              <Wrench className="w-6 h-6 text-elec-yellow" />
            </div>
            <h2 className="text-xl font-semibold text-elec-yellow">
              6. Remediation Techniques (Filters, Isolation)
            </h2>
          </div>
          <div className="space-y-4 text-gray-300">
            <p>
              When power quality issues are identified, several remediation techniques are
              available. The choice depends on the specific problem, severity, and cost
              constraints.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
                <h4 className="font-semibold text-elec-yellow mb-2">Passive Harmonic Filters</h4>
                <p className="text-sm mb-2">
                  LC circuits tuned to specific harmonic frequencies, typically 5th, 7th, 11th,
                  13th.
                </p>
                <ul className="text-sm space-y-1 text-gray-400">
                  <li>✓ Lower cost</li>
                  <li>✓ No power consumption</li>
                  <li>✗ Fixed tuning, may detune over time</li>
                  <li>✗ Risk of resonance with network</li>
                </ul>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
                <h4 className="font-semibold text-elec-yellow mb-2">Active Harmonic Filters</h4>
                <p className="text-sm mb-2">
                  Power electronics that inject equal and opposite harmonic currents in real-time.
                </p>
                <ul className="text-sm space-y-1 text-gray-400">
                  <li>✓ Adapts to changing loads</li>
                  <li>✓ Wide frequency range</li>
                  <li>✓ No resonance risk</li>
                  <li>✗ Higher cost and complexity</li>
                </ul>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
                <h4 className="font-semibold text-elec-yellow mb-2">Line Reactors & DC Chokes</h4>
                <p className="text-sm mb-2">
                  Simple inductors that reduce harmonic current magnitude and di/dt.
                </p>
                <ul className="text-sm space-y-1 text-gray-400">
                  <li>✓ Low cost, reliable</li>
                  <li>✓ Also provides transient protection</li>
                  <li>✗ Moderate harmonic reduction only</li>
                  <li>✗ Causes voltage drop</li>
                </ul>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
                <h4 className="font-semibold text-elec-yellow mb-2">Multi-Pulse Rectifiers</h4>
                <p className="text-sm mb-2">
                  12-pulse or 18-pulse configurations that cancel lower-order harmonics.
                </p>
                <ul className="text-sm space-y-1 text-gray-400">
                  <li>✓ Effective at source</li>
                  <li>✓ Reliable, passive solution</li>
                  <li>✗ Requires special transformer</li>
                  <li>✗ Larger footprint</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h4 className="font-semibold text-white mb-3">Additional Techniques:</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <strong className="text-elec-yellow">Isolation Transformers:</strong>
                  <p className="text-gray-300">
                    Provide galvanic isolation and can attenuate high-frequency noise. Delta-wye
                    configuration traps triplen harmonics. Useful for sensitive equipment.
                  </p>
                </div>
                <div>
                  <strong className="text-elec-yellow">K-Rated Transformers:</strong>
                  <p className="text-gray-300">
                    Designed to handle harmonic-rich loads without derating. K-factor ratings
                    (K-4, K-13, K-20) indicate harmonic handling capability.
                  </p>
                </div>
                <div>
                  <strong className="text-elec-yellow">Active Front-End (AFE) Drives:</strong>
                  <p className="text-gray-300">
                    VFDs with IGBT-based rectifiers instead of diode bridges. Produce &lt;5% THD
                    and can provide regenerative braking.
                  </p>
                </div>
                <div>
                  <strong className="text-elec-yellow">Detuned Power Factor Correction:</strong>
                  <p className="text-gray-300">
                    Capacitor banks with series reactors to prevent harmonic resonance. Essential
                    when adding PFC to installations with non-linear loads.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-900/30 border border-green-600 rounded-lg p-4">
              <h4 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Practical Selection Guide
              </h4>
              <ul className="text-sm space-y-2">
                <li>
                  <strong className="text-white">Single VFD, moderate harmonics:</strong> 3-5% DC
                  link choke or AC line reactor
                </li>
                <li>
                  <strong className="text-white">Multiple VFDs, DNO compliance required:</strong>{' '}
                  Active harmonic filter at PCC
                </li>
                <li>
                  <strong className="text-white">Large single drive (&gt;100kW):</strong>{' '}
                  Multi-pulse rectifier or AFE drive
                </li>
                <li>
                  <strong className="text-white">Existing capacitor resonance:</strong> Detuning
                  reactors (typically 7% or 14%)
                </li>
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
        <section className="bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 rounded-lg p-6 border border-elec-yellow/30">
          <h2 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            Quick Reference Card
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-white mb-2">Key Limits to Remember</h3>
              <ul className="text-sm space-y-1 text-gray-300">
                <li>
                  • <strong className="text-white">THD-V:</strong> ≤8% (EN 50160)
                </li>
                <li>
                  • <strong className="text-white">Voltage:</strong> 230V +10%/-6%
                </li>
                <li>
                  • <strong className="text-white">Frequency:</strong> 50Hz ±1%
                </li>
                <li>
                  • <strong className="text-white">Flicker Pst/Plt:</strong> ≤1.0
                </li>
                <li>
                  • <strong className="text-white">Voltage unbalance:</strong> ≤2%
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Harmonic Frequencies (50Hz)</h3>
              <ul className="text-sm space-y-1 text-gray-300">
                <li>
                  • <strong className="text-white">3rd:</strong> 150Hz (triplen)
                </li>
                <li>
                  • <strong className="text-white">5th:</strong> 250Hz (characteristic)
                </li>
                <li>
                  • <strong className="text-white">7th:</strong> 350Hz (characteristic)
                </li>
                <li>
                  • <strong className="text-white">11th:</strong> 550Hz
                </li>
                <li>
                  • <strong className="text-white">13th:</strong> 650Hz
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Voltage Event Definitions</h3>
              <ul className="text-sm space-y-1 text-gray-300">
                <li>
                  • <strong className="text-white">Sag:</strong> 10-90% nominal, 0.5 cycle to 1 min
                </li>
                <li>
                  • <strong className="text-white">Swell:</strong> 110-180% nominal, 0.5 cycle to 1
                  min
                </li>
                <li>
                  • <strong className="text-white">Interruption:</strong> &lt;10% nominal
                </li>
                <li>
                  • <strong className="text-white">Transient:</strong> μs to ms duration
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">6-Pulse VFD Characteristics</h3>
              <ul className="text-sm space-y-1 text-gray-300">
                <li>
                  • <strong className="text-white">THD-I:</strong> 30-50% typical
                </li>
                <li>
                  • <strong className="text-white">5th harmonic:</strong> 20-25%
                </li>
                <li>
                  • <strong className="text-white">7th harmonic:</strong> 10-15%
                </li>
                <li>
                  • <strong className="text-white">With 3% choke:</strong> THD-I reduced to ~35%
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-elec-yellow mb-4">
            Section Quiz: Power Quality Factors
          </h2>
          <Quiz questions={quizQuestions} />
        </section>

        {/* FAQ Section */}
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-elec-yellow mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-[#1a1a1a] rounded-lg border border-gray-600 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-4 text-left min-h-[44px] touch-manipulation active:scale-[0.98]"
                >
                  <span className="font-medium text-white pr-4">{faq.question}</span>
                  {expandedFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                  )}
                </button>
                {expandedFAQ === index && (
                  <div className="px-4 pb-4 text-gray-300 text-sm border-t border-gray-600 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row gap-4 justify-between pt-6">
          <Button
            variant="outline"
            onClick={() => navigate('/upskilling/energy-efficiency/module-1')}
            className="min-h-[44px] touch-manipulation active:scale-[0.98] bg-transparent border-gray-600 text-white hover:bg-gray-700 hover:text-elec-yellow"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous: Module 1
          </Button>
          <Button
            onClick={() => navigate('/upskilling/energy-efficiency/module-2/section-2')}
            className="min-h-[44px] touch-manipulation active:scale-[0.98] bg-elec-yellow text-black hover:bg-elec-yellow/90"
          >
            Next: Section 2
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default EnergyEfficiencyModule2Section1;
