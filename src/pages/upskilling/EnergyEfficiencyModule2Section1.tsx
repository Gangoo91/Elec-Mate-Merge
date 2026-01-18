import { ArrowLeft, Zap, CheckCircle, Activity, Gauge, FileCheck, Wrench, BookOpen, Lightbulb, BarChart3, Shield, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Power Quality Factors - Energy Efficiency Course";
const DESCRIPTION = "Learn about power quality factors including harmonics, voltage sags, swells, flicker, and remediation techniques. Understand THD measurement, EN 50160 standards, and practical solutions for electrical installations.";

const quickCheckQuestions = [
  {
    id: "pq-check-1",
    question: "What is the primary cause of harmonic distortion in modern electrical installations?",
    options: ["Resistive heating loads", "Non-linear loads such as VFDs and LED drivers", "Incandescent lighting", "Electric motors running at full load"],
    correctIndex: 1,
    explanation: "Non-linear loads like Variable Frequency Drives (VFDs), LED drivers, switch-mode power supplies, and electronic equipment draw current in pulses rather than smooth sine waves, creating harmonic frequencies that distort the supply waveform."
  },
  {
    id: "pq-check-2",
    question: "According to EN 50160, what is the maximum permitted Total Harmonic Distortion (THD) for LV supply voltage?",
    options: ["5%", "8%", "10%", "15%"],
    correctIndex: 1,
    explanation: "EN 50160 specifies that THD of the supply voltage should not exceed 8% under normal operating conditions, including all harmonics up to the 40th order. Individual harmonic limits also apply."
  },
  {
    id: "pq-check-3",
    question: "What type of filter is most effective at eliminating specific harmonic frequencies from an installation?",
    options: ["Low-pass filter", "High-pass filter", "Passive tuned harmonic filter", "Band-stop filter"],
    correctIndex: 2,
    explanation: "Passive tuned harmonic filters are designed to target specific harmonic frequencies (typically 5th, 7th, 11th, 13th). They provide a low-impedance path at the tuned frequency, diverting harmonic currents away from the supply."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What frequency is the 5th harmonic on a 50Hz supply?",
    options: ["100Hz", "150Hz", "200Hz", "250Hz"],
    correctAnswer: 3,
    explanation: "The 5th harmonic is 5 x 50Hz = 250Hz."
  },
  {
    id: 2,
    question: "Which harmonic orders are considered 'triplen' harmonics?",
    options: ["2nd, 4th, 6th (even multiples)", "3rd, 9th, 15th (multiples of 3)", "5th, 7th, 11th (odd non-triplen)", "1st, 2nd, 3rd (fundamental and first two)"],
    correctAnswer: 1,
    explanation: "Triplen harmonics are multiples of 3 (3rd, 9th, 15th, 21st, etc.) and are zero-sequence harmonics that add in the neutral."
  },
  {
    id: 3,
    question: "What is the typical THD current level produced by a standard 6-pulse VFD without filtering?",
    options: ["5-10%", "15-25%", "30-50%", "60-80%"],
    correctAnswer: 2,
    explanation: "A standard 6-pulse VFD typically produces 30-50% THD current with dominant 5th and 7th harmonics."
  },
  {
    id: 4,
    question: "A voltage sag is typically defined as a reduction in RMS voltage to what percentage range?",
    options: ["0-10% of nominal", "10-90% of nominal", "90-95% of nominal", "95-99% of nominal"],
    correctAnswer: 1,
    explanation: "A voltage sag (or dip) is a reduction in RMS voltage to 10-90% of nominal, lasting from half a cycle to one minute."
  },
  {
    id: 5,
    question: "Which UK standard specifically addresses harmonic emissions from customer installations?",
    options: ["BS 7671", "EN 50160", "ENA Engineering Recommendation G5/5", "IEC 61000-3-2"],
    correctAnswer: 2,
    explanation: "ENA Engineering Recommendation G5/5 is the UK-specific standard for assessing harmonic emissions from customer installations connecting to DNO networks."
  },
  {
    id: 6,
    question: "What is the Pst (short-term flicker severity) limit for LV supplies under EN 50160?",
    options: ["0.5", "1.0", "1.5", "2.0"],
    correctAnswer: 1,
    explanation: "EN 50160 specifies a Pst (short-term flicker severity) limit of 1.0 for LV supplies."
  },
  {
    id: 7,
    question: "Which type of equipment is most susceptible to damage from harmonic heating effects?",
    options: ["Resistive heaters", "Transformers and capacitors", "Incandescent lamps", "Simple contactors"],
    correctAnswer: 1,
    explanation: "Transformers experience additional eddy current and hysteresis losses from harmonics. Capacitors can suffer from harmonic resonance causing dramatic overcurrents."
  },
  {
    id: 8,
    question: "An active harmonic filter works by:",
    options: ["Blocking harmonics with inductors", "Injecting equal and opposite harmonic currents", "Absorbing harmonics in resistive elements", "Shifting harmonic phase angles"],
    correctAnswer: 1,
    explanation: "Active harmonic filters use power electronics to inject equal and opposite harmonic currents in real-time, cancelling out the harmonics."
  },
  {
    id: 9,
    question: "What is the main cause of voltage flicker in industrial installations?",
    options: ["Harmonic distortion", "Large motor starting and arc furnaces", "Power factor correction capacitors", "Underground cable charging"],
    correctAnswer: 1,
    explanation: "Large motor starting (which can draw 6-8x FLC) and arc furnaces (due to erratic arc impedance) are the main causes of voltage flicker."
  },
  {
    id: 10,
    question: "A K-rated transformer is specifically designed to handle:",
    options: ["High ambient temperatures", "Harmonic-rich loads", "Frequent overloads", "High fault levels"],
    correctAnswer: 1,
    explanation: "K-rated transformers are designed to handle harmonic-rich loads without derating. K-factor ratings (K-4, K-13, K-20) indicate harmonic handling capability."
  }
];

const faqs = [
  {
    question: "Why do VFDs create harmonics and how can this be mitigated?",
    answer: "VFDs use rectifier circuits that convert AC to DC in the drive front-end. Standard 6-pulse rectifiers draw current in short pulses synchronized to the peak of the AC waveform rather than continuously, creating characteristic 5th, 7th, 11th, and 13th harmonics. Mitigation options include: DC link chokes (3-5% impedance), AC line reactors, passive harmonic filters tuned to specific frequencies, active front-end (AFE) drives with IGBT rectifiers, 12-pulse or 18-pulse rectifier configurations, and active harmonic filters."
  },
  {
    question: "How do I measure THD and what equipment is needed?",
    answer: "THD (Total Harmonic Distortion) is measured using a power quality analyser or harmonic-capable clamp meter. The instrument performs a Fast Fourier Transform (FFT) on the waveform to extract individual harmonic magnitudes. For compliance assessment, measurements should be taken over at least one week at the point of common coupling (PCC). Professional instruments like Fluke 435-II, Hioki PQ3100, or Dranetz provide comprehensive analysis including harmonic phase angles and trending."
  },
  {
    question: "What problems do triplen harmonics (3rd, 9th, 15th) cause specifically?",
    answer: "Triplen harmonics are zero-sequence harmonics that add in the neutral conductor rather than cancelling. In a three-phase four-wire system with significant single-phase non-linear loads (computers, LED lighting), the neutral current can exceed phase currents, potentially overloading undersized neutrals. They also cause circulating currents in delta-connected transformers. Solutions include oversized neutrals (typically 150-200% of phase conductor size) and zig-zag transformers."
  },
  {
    question: "When must I comply with G5/5 and what are the consequences of non-compliance?",
    answer: "ENA Engineering Recommendation G5/5 applies when connecting new loads or generation to the UK distribution network. The DNO assesses your installation's harmonic emissions against planning levels for your point of connection. If your equipment exceeds the allocated limits, you may be required to install harmonic mitigation before connection is approved, or face refusal of connection."
  },
  {
    question: "What is the difference between a voltage sag, swell, and transient?",
    answer: "A voltage sag (or dip) is a reduction in RMS voltage to 10-90% of nominal, lasting from half a cycle to one minute, typically caused by faults on the network or large motor starting. A voltage swell is an increase to 110-180% of nominal for the same duration range, often caused by load rejection or single-phase faults. A transient is a very short duration event (microseconds to milliseconds) involving rapid voltage changes."
  },
  {
    question: "How do power quality issues affect equipment lifespan and energy costs?",
    answer: "Poor power quality significantly impacts both lifespan and costs. Harmonics cause additional heating in transformers (reducing life by 5-20%), premature capacitor failure, motor insulation degradation, and increased losses. Voltage sags cause process interruptions and control system resets. UK industry loses an estimated 1-2 billion pounds annually due to power quality issues. Investment in power quality monitoring and correction typically provides ROI within 1-3 years."
  }
];

const EnergyEfficiencyModule2Section1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Title Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <Zap className="h-4 w-4" />
              <span>Module 2 Section 1</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
              Power Quality Factors
            </h1>
            <p className="text-white/80">
              Harmonics, flicker, voltage disturbances and remediation techniques
            </p>
          </header>

          {/* Quick Summary Boxes */}
          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
              <ul className="text-sm text-white space-y-1">
                <li><strong>THD Limit:</strong> 8% voltage (EN 50160)</li>
                <li><strong>VFD THD-I:</strong> 30-50% without filtering</li>
                <li><strong>Sag:</strong> 10-90% nominal, 0.5 cycle to 1 min</li>
                <li><strong>Flicker Pst:</strong> Less than or equal to 1.0</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
              <ul className="text-sm text-white space-y-1">
                <li><strong>Spot:</strong> Transformer overheating</li>
                <li><strong>Spot:</strong> Capacitor failures</li>
                <li><strong>Use:</strong> G5/5 for DNO compliance</li>
                <li><strong>Use:</strong> Power quality analysers</li>
              </ul>
            </div>
          </div>

          {/* Learning Outcomes */}
          <section className="mb-12">
            <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
            <div className="grid sm:grid-cols-2 gap-2">
              {[
                "Understand power quality and its impact on installations",
                "Identify harmonic sources and calculate THD",
                "Recognise voltage sags, swells, and transients",
                "Understand flicker causes and measurement",
                "Apply EN 50160 and G5/5 requirements",
                "Select appropriate remediation techniques"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-white">
                  <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          <hr className="border-white/5 mb-12" />

          {/* Section 01: What is Power Quality */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              What is Power Quality and Why It Matters
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p><strong>Power quality</strong> refers to how closely the electrical supply matches the ideal sinusoidal waveform at the correct voltage, frequency, and with minimal distortion. In the UK, the ideal supply is 230V RMS at 50Hz with a pure sine wave.</p>

              <p>Poor power quality manifests in several ways: waveform distortion (harmonics), voltage variations (sags, swells, flicker), frequency deviations, and transient events. Each affects equipment and processes differently.</p>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-elec-yellow text-sm font-medium mb-2 flex items-center gap-2"><Zap className="h-4 w-4" /> Why Power Quality Matters</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Equipment life:</strong> Harmonic heating accelerates insulation degradation in motors and transformers</li>
                  <li><strong>Energy efficiency:</strong> Distorted waveforms increase I squared R losses and reduce power factor</li>
                  <li><strong>Process reliability:</strong> Voltage sags cause control system dropouts and production losses</li>
                  <li><strong>Regulatory compliance:</strong> DNOs enforce limits on harmonic emissions from customer installations</li>
                </ul>
              </div>

              <p>The economic impact is significant - UK industry loses an estimated <strong>1-2 billion pounds annually</strong> due to power quality issues. Understanding and addressing these factors is essential for energy-efficient installations.</p>
            </div>
          </section>

          {/* Section 02: Harmonics */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Harmonics: Sources, Effects and THD Measurement
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p><strong>Harmonics</strong> are sinusoidal voltages or currents at frequencies that are integer multiples of the fundamental 50Hz supply. The 3rd harmonic is 150Hz, 5th is 250Hz, 7th is 350Hz, and so on.</p>

              <div className="grid sm:grid-cols-2 gap-4 my-6">
                <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                  <p className="text-elec-yellow text-sm font-medium mb-2 flex items-center gap-2"><Activity className="h-4 w-4" /> Three-Phase Non-Linear Loads</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Variable Frequency Drives (VFDs)</li>
                    <li>UPS systems</li>
                    <li>DC drives and rectifiers</li>
                    <li>Large battery chargers</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                  <p className="text-elec-yellow text-sm font-medium mb-2">Single-Phase Non-Linear Loads</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Switch-mode power supplies</li>
                    <li>LED drivers</li>
                    <li>Computers and IT equipment</li>
                    <li>Electronic ballasts</li>
                  </ul>
                </div>
              </div>

              <p>A standard <strong>6-pulse VFD</strong> typically produces 30-50% THD current with dominant 5th (20-25%) and 7th (10-15%) harmonics. The characteristic harmonics for a 6-pulse rectifier are n = 6k plus or minus 1 where k = 1, 2, 3... giving 5th, 7th, 11th, 13th, etc.</p>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-elec-yellow text-sm font-medium mb-2 flex items-center gap-2"><AlertTriangle className="h-4 w-4" /> Effects of Harmonics</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Transformer overheating:</strong> Additional eddy current and hysteresis losses; may require derating or K-rated transformers</li>
                  <li><strong>Capacitor failure:</strong> Harmonic resonance can cause dramatic overcurrents and premature failure</li>
                  <li><strong>Neutral overload:</strong> Triplen harmonics (3rd, 9th, 15th) add in the neutral, potentially exceeding phase current</li>
                  <li><strong>Motor heating:</strong> Harmonic currents cause additional rotor losses and torque pulsations</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mt-4">
                <p className="text-elec-yellow text-sm font-medium mb-2">THD Measurement</p>
                <p className="text-white text-sm mb-2">Total Harmonic Distortion (THD) is calculated as:</p>
                <p className="text-white text-sm font-mono bg-[#2a2a2a] p-2 rounded text-center">THD = root(V2 squared + V3 squared + V4 squared + ... + Vn squared) / V1 x 100%</p>
                <p className="text-white text-sm mt-2">Where V1 is the fundamental and V2 through Vn are harmonic magnitudes. Measure both THD-V (voltage distortion, typically less than 8%) and THD-I (current distortion, varies widely).</p>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[0]} />

          {/* Section 03: Voltage Sags, Swells and Transients */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Voltage Sags, Swells and Transients
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>Voltage variations are among the most common power quality issues, causing process disruptions and equipment damage across industrial and commercial installations.</p>

              <div className="grid sm:grid-cols-3 gap-3 my-6">
                <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                  <p className="text-elec-yellow text-sm font-medium mb-2 flex items-center gap-2"><BarChart3 className="h-4 w-4" /> Voltage Sag (Dip)</p>
                  <p className="text-white text-sm mb-1">Reduction to <strong>10-90%</strong> of nominal voltage</p>
                  <p className="text-white text-sm mb-1"><strong>Duration:</strong> 0.5 cycle to 1 minute</p>
                  <p className="text-white text-sm"><strong>Causes:</strong> Network faults, large motor starting</p>
                </div>
                <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                  <p className="text-elec-yellow text-sm font-medium mb-2">Voltage Swell</p>
                  <p className="text-white text-sm mb-1">Increase to <strong>110-180%</strong> of nominal voltage</p>
                  <p className="text-white text-sm mb-1"><strong>Duration:</strong> 0.5 cycle to 1 minute</p>
                  <p className="text-white text-sm"><strong>Causes:</strong> Load rejection, single-phase faults</p>
                </div>
                <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                  <p className="text-elec-yellow text-sm font-medium mb-2">Transients</p>
                  <p className="text-white text-sm mb-1">Rapid voltage changes <strong>&gt;180%</strong> or impulsive</p>
                  <p className="text-white text-sm mb-1"><strong>Duration:</strong> Microseconds to milliseconds</p>
                  <p className="text-white text-sm"><strong>Causes:</strong> Lightning, switching, capacitor energisation</p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-elec-yellow text-sm font-medium mb-2 flex items-center gap-2"><Lightbulb className="h-4 w-4" /> Practical Impact</p>
                <p className="text-white text-sm">A voltage sag to 80% for just 100ms can cause AC contactors to drop out, PLCs to reset, and VFDs to trip on undervoltage. The <strong>CBEMA/ITIC curve</strong> defines equipment tolerance limits - most IT equipment can ride through sags above 70% lasting less than 0.5 seconds, but deeper or longer sags cause problems.</p>
              </div>

              <p><strong>Protection strategies</strong> include: voltage ride-through settings on VFDs, contactor hold-in devices, UPS systems for critical loads, dynamic voltage restorers (DVR) for sensitive processes, and soft starters to reduce starting current impacts.</p>
            </div>
          </section>

          {/* Section 04: Flicker and Its Causes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Flicker and Its Causes
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p><strong>Flicker</strong> is the visible variation in light output caused by voltage fluctuations. It's measured using the <strong>Pst</strong> (short-term flicker severity) and <strong>Plt</strong> (long-term flicker severity) indices.</p>

              <p>The human eye is most sensitive to flicker at frequencies around <strong>8-10Hz</strong>. Even voltage variations of 0.5% at these frequencies can be perceptible and irritating.</p>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 my-6">
                <p className="text-elec-yellow text-sm font-medium mb-2 flex items-center gap-2"><Gauge className="h-4 w-4" /> Common Causes of Flicker</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Arc furnaces:</strong> The largest industrial source due to erratic arc impedance variations</li>
                  <li><strong>Large motor starting:</strong> DOL starting of motors can draw 6-8x FLC, causing voltage drops</li>
                  <li><strong>Welding equipment:</strong> Spot welders and arc welders create repetitive load variations</li>
                  <li><strong>Wind turbines:</strong> Tower shadow and wind gusts cause power output fluctuations</li>
                  <li><strong>Heat pumps and compressors:</strong> Cyclic loading patterns</li>
                </ul>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 my-6">
                <div className="p-4 rounded-lg bg-elec-yellow/5 text-center">
                  <p className="text-elec-yellow text-sm font-medium">Short-term (Pst)</p>
                  <p className="text-3xl font-bold text-white">Less than or equal to 1.0</p>
                  <p className="text-white text-sm">10-minute measurement</p>
                </div>
                <div className="p-4 rounded-lg bg-elec-yellow/5 text-center">
                  <p className="text-elec-yellow text-sm font-medium">Long-term (Plt)</p>
                  <p className="text-3xl font-bold text-white">Less than or equal to 1.0</p>
                  <p className="text-white text-sm">2-hour measurement</p>
                </div>
              </div>

              <p><strong>Mitigation</strong> includes: soft starters and VFDs for motor starting, static VAR compensators (SVC) for arc furnaces, increasing supply capacity to reduce source impedance, and separating flicker-producing loads onto dedicated feeders.</p>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[1]} />

          {/* Section 05: Power Quality Standards */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Power Quality Standards (EN 50160, G5/5)
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>Several standards govern power quality in the UK and Europe. Understanding these is essential for specifying equipment and obtaining DNO approval for new installations.</p>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 my-6">
                <p className="text-elec-yellow text-sm font-medium mb-2 flex items-center gap-2"><FileCheck className="h-4 w-4" /> EN 50160 - Voltage Characteristics</p>
                <p className="text-white text-sm mb-2">Defines the main characteristics of voltage at the customer's supply terminals under normal operating conditions:</p>
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <ul className="text-white space-y-1">
                    <li><strong>Voltage magnitude:</strong> 230V +10%/-6%</li>
                    <li><strong>Frequency:</strong> 50Hz plus or minus 1%</li>
                    <li><strong>THD voltage:</strong> Less than or equal to 8%</li>
                  </ul>
                  <ul className="text-white space-y-1">
                    <li><strong>Individual harmonics:</strong> Specified limits per order</li>
                    <li><strong>Flicker Pst:</strong> Less than or equal to 1.0</li>
                    <li><strong>Unbalance:</strong> Less than or equal to 2%</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-elec-yellow text-sm font-medium mb-2">ENA Engineering Recommendation G5/5</p>
                <p className="text-white text-sm mb-2">The UK-specific standard for assessing harmonic emissions from customer installations connecting to DNO networks:</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Stage 1:</strong> Simplified assessment for small installations - if equipment meets IEC 61000-3-2/3-12, no further assessment needed</li>
                  <li><strong>Stage 2:</strong> Emission assessment comparing equipment emissions to allocated limits at the point of connection</li>
                  <li><strong>Stage 3:</strong> Detailed network harmonic study for large or complex installations</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mt-4">
                <p className="text-elec-yellow text-sm font-medium mb-2 flex items-center gap-2"><AlertTriangle className="h-4 w-4" /> Important for Electricians</p>
                <p className="text-white text-sm">When installing VFDs, EV chargers, or other non-linear loads, particularly on larger installations, check with the DNO if a G5/5 assessment is required. Failing to comply can result in connection refusal or requirements for expensive harmonic mitigation.</p>
              </div>

              <div className="my-6">
                <p className="text-sm font-medium text-white mb-2">Other Relevant Standards:</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li><strong>IEC 61000-3-2:</strong> Harmonic current limits for equipment 16A or less</li>
                  <li><strong>IEC 61000-3-12:</strong> Harmonic current limits for equipment greater than 16A but 75A or less</li>
                  <li><strong>IEEE 519:</strong> Harmonic limits at PCC (used internationally)</li>
                  <li><strong>BS 7671:</strong> Includes requirements for harmonic consideration in installation design</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 06: Remediation Techniques */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Remediation Techniques (Filters, Isolation)
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>When power quality issues are identified, several remediation techniques are available. The choice depends on the specific problem, severity, and cost constraints.</p>

              <div className="grid sm:grid-cols-2 gap-4 my-6">
                <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                  <p className="text-elec-yellow text-sm font-medium mb-2 flex items-center gap-2"><Wrench className="h-4 w-4" /> Passive Harmonic Filters</p>
                  <p className="text-white text-sm mb-2">LC circuits tuned to specific harmonic frequencies, typically 5th, 7th, 11th, 13th.</p>
                  <ul className="text-sm text-white space-y-0.5">
                    <li>+ Lower cost</li>
                    <li>+ No power consumption</li>
                    <li>- Fixed tuning, may detune over time</li>
                    <li>- Risk of resonance with network</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                  <p className="text-elec-yellow text-sm font-medium mb-2">Active Harmonic Filters</p>
                  <p className="text-white text-sm mb-2">Power electronics that inject equal and opposite harmonic currents in real-time.</p>
                  <ul className="text-sm text-white space-y-0.5">
                    <li>+ Adapts to changing loads</li>
                    <li>+ Wide frequency range</li>
                    <li>+ No resonance risk</li>
                    <li>- Higher cost and complexity</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                  <p className="text-elec-yellow text-sm font-medium mb-2">Line Reactors and DC Chokes</p>
                  <p className="text-white text-sm mb-2">Simple inductors that reduce harmonic current magnitude and di/dt.</p>
                  <ul className="text-sm text-white space-y-0.5">
                    <li>+ Low cost, reliable</li>
                    <li>+ Also provides transient protection</li>
                    <li>- Moderate harmonic reduction only</li>
                    <li>- Causes voltage drop</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                  <p className="text-elec-yellow text-sm font-medium mb-2">Multi-Pulse Rectifiers</p>
                  <p className="text-white text-sm mb-2">12-pulse or 18-pulse configurations that cancel lower-order harmonics.</p>
                  <ul className="text-sm text-white space-y-0.5">
                    <li>+ Effective at source</li>
                    <li>+ Reliable, passive solution</li>
                    <li>- Requires special transformer</li>
                    <li>- Larger footprint</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-elec-yellow text-sm font-medium mb-2 flex items-center gap-2"><Shield className="h-4 w-4" /> Practical Selection Guide</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Single VFD, moderate harmonics:</strong> 3-5% DC link choke or AC line reactor</li>
                  <li><strong>Multiple VFDs, DNO compliance required:</strong> Active harmonic filter at PCC</li>
                  <li><strong>Large single drive (&gt;100kW):</strong> Multi-pulse rectifier or AFE drive</li>
                  <li><strong>Existing capacitor resonance:</strong> Detuning reactors (typically 7% or 14%)</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[2]} />

          {/* Practical Guidance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Assessing Power Quality</h3>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Use a power quality analyser to measure THD, harmonics, sags, and flicker</li>
                  <li>Take measurements over at least one week for compliance assessment</li>
                  <li>Measure at the point of common coupling (PCC)</li>
                  <li>Document both voltage and current distortion</li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Installing Non-Linear Loads</h3>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Check if G5/5 assessment is required with the DNO</li>
                  <li>Specify DC chokes or line reactors with VFDs as standard</li>
                  <li>Consider active front-end drives for large installations</li>
                  <li>Size neutrals at 150-200% for high single-phase non-linear loads</li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li><strong>Adding capacitor PFC to harmonic-rich installations</strong> - risk of resonance; use detuned PFC</li>
                  <li><strong>Undersizing neutrals</strong> - triplen harmonics can exceed phase current</li>
                  <li><strong>Ignoring DNO requirements</strong> - can result in connection refusal</li>
                  <li><strong>Using standard transformers for harmonic loads</strong> - specify K-rated transformers</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Quick Reference Card */}
          <section className="mb-10">
            <div className="p-5 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h3 className="text-sm font-medium text-white mb-4 flex items-center gap-2"><BookOpen className="h-4 w-4 text-elec-yellow" /> Quick Reference Card</h3>
              <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
                <div>
                  <p className="font-medium text-elec-yellow mb-1">Key Limits (EN 50160)</p>
                  <ul className="space-y-0.5">
                    <li>THD-V: Less than or equal to 8%</li>
                    <li>Voltage: 230V +10%/-6%</li>
                    <li>Frequency: 50Hz plus or minus 1%</li>
                    <li>Flicker Pst/Plt: Less than or equal to 1.0</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-elec-yellow mb-1">Harmonic Frequencies (50Hz)</p>
                  <ul className="space-y-0.5">
                    <li>3rd: 150Hz (triplen)</li>
                    <li>5th: 250Hz (characteristic)</li>
                    <li>7th: 350Hz (characteristic)</li>
                    <li>11th: 550Hz</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-elec-yellow mb-1">Voltage Event Definitions</p>
                  <ul className="space-y-0.5">
                    <li>Sag: 10-90% nominal, 0.5 cycle to 1 min</li>
                    <li>Swell: 110-180% nominal, 0.5 cycle to 1 min</li>
                    <li>Interruption: Less than 10% nominal</li>
                    <li>Transient: Microseconds to milliseconds duration</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-elec-yellow mb-1">6-Pulse VFD Characteristics</p>
                  <ul className="space-y-0.5">
                    <li>THD-I: 30-50% typical</li>
                    <li>5th harmonic: 20-25%</li>
                    <li>7th harmonic: 10-15%</li>
                    <li>With 3% choke: THD-I reduced to ~35%</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* FAQs */}
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

          {/* Quiz */}
          <section className="mb-10">
            <Quiz
              title="Test Your Knowledge"
              questions={quizQuestions}
            />
          </section>

          {/* Bottom Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
            <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
              <Link to="/study-centre/upskilling/energy-efficiency/module-1/section-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous Section
              </Link>
            </Button>
            <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
              <Link to="/study-centre/upskilling/energy-efficiency/module-2/section-2">
                Next Section
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default EnergyEfficiencyModule2Section1;
