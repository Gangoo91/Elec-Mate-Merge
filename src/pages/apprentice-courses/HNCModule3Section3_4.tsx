import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Sinusoidal, Non-sinusoidal and Distorted Waveforms - HNC Module 3 Section 3.4";
const DESCRIPTION = "Master waveform analysis for building services: pure sinusoids, complex waveforms, Fourier analysis, THD measurement, harmonic sources and their effects on electrical installations.";

const quickCheckQuestions = [
  {
    id: "fundamental-frequency",
    question: "What is the fundamental frequency of the UK mains supply?",
    options: ["25 Hz", "50 Hz", "60 Hz", "100 Hz"],
    correctIndex: 1,
    explanation: "The UK mains supply operates at 50 Hz fundamental frequency. All harmonic frequencies are multiples of this (e.g., 3rd harmonic = 150 Hz, 5th harmonic = 250 Hz)."
  },
  {
    id: "third-harmonic",
    question: "Why are triplen harmonics (3rd, 9th, 15th) particularly problematic in three-phase systems?",
    options: ["They cause motors to overheat", "They add in the neutral conductor rather than cancelling", "They trip RCDs", "They only affect single-phase loads"],
    correctIndex: 1,
    explanation: "In a balanced three-phase system, triplen harmonics (multiples of 3) are zero-sequence currents that add arithmetically in the neutral conductor, potentially causing it to carry up to 1.73 times the phase current."
  },
  {
    id: "thd-limit",
    question: "What is the typical maximum THD voltage limit for LV public supply under Engineering Recommendation G5/5?",
    options: ["2%", "5%", "8%", "10%"],
    correctIndex: 1,
    explanation: "Engineering Recommendation G5/5 limits total harmonic voltage distortion to 5% at the point of common coupling for LV supplies. Individual harmonics have lower limits depending on their order."
  },
  {
    id: "vsd-harmonics",
    question: "Which harmonic orders are predominantly produced by a 6-pulse variable speed drive?",
    options: ["2nd, 4th, 6th", "3rd, 9th, 15th", "5th, 7th, 11th, 13th", "All odd harmonics"],
    correctIndex: 2,
    explanation: "A 6-pulse VSD produces characteristic harmonics of order 6n plus or minus 1 (i.e., 5th, 7th, 11th, 13th, etc.). The 5th and 7th harmonics are typically the largest."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the peak voltage of a 230V RMS sinusoidal supply?",
    options: ["230V", "325V", "400V", "460V"],
    correctAnswer: 1,
    explanation: "Peak voltage = RMS x square root of 2. So 230V x 1.414 = 325V. This peak-to-peak swing is important when considering insulation stress and electronic component ratings."
  },
  {
    id: 2,
    question: "Which waveform type has harmonic content that decreases proportionally to the harmonic order?",
    options: ["Square wave", "Triangular wave", "Sawtooth wave", "Pure sinusoid"],
    correctAnswer: 1,
    explanation: "A triangular wave's harmonic amplitudes decrease as 1/n squared (where n is harmonic order), giving it lower THD than a square wave. Square waves decrease only as 1/n."
  },
  {
    id: 3,
    question: "A waveform has a fundamental component of 100A and a 5th harmonic of 20A. What is the THD due to this harmonic alone?",
    options: ["5%", "10%", "20%", "25%"],
    correctAnswer: 2,
    explanation: "THD for a single harmonic = (harmonic current / fundamental current) x 100% = (20/100) x 100% = 20%. Total THD would include all harmonics in the calculation."
  },
  {
    id: 4,
    question: "What neutral conductor sizing is typically required for circuits supplying significant non-linear loads?",
    options: ["Same as phase conductors", "1.5 times phase conductor size", "Double the phase conductor size", "Half the phase conductor size"],
    correctIndex: 2,
    explanation: "For circuits with significant triplen harmonic content (e.g., LED lighting, IT equipment), the neutral may need to be doubled in size as triplen harmonics add in the neutral rather than cancel."
  },
  {
    id: 5,
    question: "Which IEEE standard specifically addresses harmonic limits for electrical installations?",
    options: ["IEEE 519", "IEEE 1547", "IEEE 1159", "IEEE 446"],
    correctAnswer: 0,
    explanation: "IEEE 519 'Recommended Practice for Harmonic Control in Electric Power Systems' defines harmonic current and voltage distortion limits at the point of common coupling."
  },
  {
    id: 6,
    question: "What effect do harmonics have on transformer operation?",
    options: ["Improved efficiency", "Reduced losses", "Increased heating due to eddy currents", "Lower magnetising current"],
    correctAnswer: 2,
    explanation: "Harmonics cause additional heating in transformers due to increased eddy current and hysteresis losses. K-rated transformers are designed to handle this additional heating from non-linear loads."
  },
  {
    id: 7,
    question: "Which modern building load is a major source of 3rd harmonic currents?",
    options: ["Three-phase motors", "Resistive heaters", "LED lighting with SMPS drivers", "Incandescent lamps"],
    correctAnswer: 2,
    explanation: "LED luminaires with switch-mode power supply drivers are significant sources of 3rd harmonic current. While individual units may comply with EN 61000-3-2, large installations aggregate these harmonics."
  },
  {
    id: 8,
    question: "What is the form factor of a pure sinusoidal waveform?",
    options: ["1.0", "1.11", "1.414", "1.732"],
    correctAnswer: 1,
    explanation: "Form factor = RMS value / average value = 0.707Vpk / 0.637Vpk = 1.11 for a pure sinusoid. Different form factors indicate non-sinusoidal waveforms and affect true-RMS meter accuracy."
  },
  {
    id: 9,
    question: "According to IEC 61000-3-2, what is the purpose of Class A, B, C, and D equipment categories?",
    options: ["Power factor correction requirements", "Harmonic emission limits by equipment type", "Voltage tolerance requirements", "Fault current ratings"],
    correctAnswer: 1,
    explanation: "IEC 61000-3-2 categorises equipment by type (Class A: general, B: portable tools, C: lighting, D: PC/TV) and sets specific harmonic current limits for each class to control emissions at source."
  },
  {
    id: 10,
    question: "What is the primary advantage of using an active harmonic filter over a passive filter?",
    options: ["Lower cost", "Simpler installation", "Adaptive response to changing load conditions", "Higher power losses"],
    correctAnswer: 2,
    explanation: "Active harmonic filters dynamically measure and inject compensating currents to cancel harmonics. Unlike passive filters, they adapt to changing load conditions and don't risk resonance with system impedance."
  }
];

const faqs = [
  {
    question: "Why do I need to understand harmonics as a building services engineer?",
    answer: "Modern buildings contain significant non-linear loads (LEDs, VSDs, IT equipment, UPS systems) that generate harmonic currents. Understanding harmonics is essential for correct neutral sizing, transformer selection (K-rating), power quality assessment, and avoiding problems like overheating, nuisance tripping, and interference with sensitive equipment."
  },
  {
    question: "How do I measure THD on site?",
    answer: "Use a power quality analyser or clamp meter with harmonic measurement capability (true-RMS with harmonic analysis). These instruments perform FFT (Fast Fourier Transform) analysis and display individual harmonic magnitudes and total THD. For comprehensive assessment, a portable power quality recorder logging over time is recommended."
  },
  {
    question: "When should I specify a K-rated transformer?",
    answer: "Specify K-rated transformers when serving predominantly non-linear loads. K-4 is suitable for mixed loads with some IT equipment, K-13 for dedicated computer rooms or data centres, and K-20 for the highest harmonic content environments. The K-factor accounts for additional eddy current losses from harmonic currents."
  },
  {
    question: "What is the relationship between power factor and harmonics?",
    answer: "Harmonics reduce the true power factor (displacement power factor x distortion power factor). Even if voltage and current fundamentals are in phase (unity displacement PF), harmonic content creates 'distortion reactive power' that increases apparent power and reduces overall power factor. This is why PFC capacitors alone don't solve harmonic problems."
  },
  {
    question: "Can harmonics damage equipment?",
    answer: "Yes. Harmonics cause additional heating in motors and transformers, can trigger nuisance tripping of circuit breakers and RCDs, cause capacitor failure due to overloading, create interference with sensitive electronics, and accelerate insulation degradation. The neutral conductor can also overheat if not properly sized for triplen harmonics."
  },
  {
    question: "What is the difference between voltage and current THD?",
    answer: "Current THD measures harmonic content of the current waveform drawn by loads. Voltage THD measures distortion of the supply voltage caused by harmonic currents flowing through system impedance. High current THD from a load causes voltage THD that affects all connected equipment. Limits are typically set on voltage THD at the point of common coupling."
  }
];

const HNCModule3Section3_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 3.3.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Sinusoidal, Non-sinusoidal and Distorted Waveforms
          </h1>
          <p className="text-white/80">
            Understanding waveform characteristics, harmonic analysis, and power quality in modern building services
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Sinusoidal:</strong> Pure sine waves at 50 Hz fundamental</li>
              <li className="pl-1"><strong>Non-sinusoidal:</strong> Square, triangular, sawtooth waves</li>
              <li className="pl-1"><strong>Distorted:</strong> Fundamental plus harmonic components</li>
              <li className="pl-1"><strong>THD:</strong> Total Harmonic Distortion measurement</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Non-linear loads:</strong> VSDs, LEDs, SMPS, UPS</li>
              <li className="pl-1"><strong>Neutral sizing:</strong> Triplen harmonics require oversizing</li>
              <li className="pl-1"><strong>Standards:</strong> IEEE 519, IEC 61000, G5/5</li>
              <li className="pl-1"><strong>Mitigation:</strong> Filters, K-rated transformers</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Describe pure sinusoidal waveform characteristics and parameters",
              "Identify square, triangular, and sawtooth waveforms and their harmonic content",
              "Apply Fourier analysis principles to complex waveforms",
              "Calculate and interpret Total Harmonic Distortion (THD)",
              "Identify common sources of harmonic distortion in building services",
              "Apply IEEE 519 and IEC 61000 harmonic standards",
              "Determine neutral conductor sizing for non-linear loads",
              "Specify harmonic mitigation measures for building installations"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 1: Pure Sinusoidal Waveforms */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Pure Sinusoidal Waveforms
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A pure sinusoidal waveform is the ideal AC signal, containing only the fundamental frequency
              with no harmonic content. The UK mains supply is designed to be sinusoidal at 50 Hz, though
              in practice some distortion is always present.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Mathematical representation:</p>
              <div className="bg-white/5 p-4 rounded-lg font-mono text-center">
                <p className="text-elec-yellow mb-2">v(t) = V<sub>pk</sub> sin(2pift + phi)</p>
                <p className="text-sm text-white/70">where: V<sub>pk</sub> = peak voltage, f = frequency (50 Hz), phi = phase angle</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Sinusoidal Parameters</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Parameter</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Formula</th>
                      <th className="border border-white/10 px-3 py-2 text-left">230V Supply</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Peak voltage (V<sub>pk</sub>)</td>
                      <td className="border border-white/10 px-3 py-2">V<sub>rms</sub> x 1.414</td>
                      <td className="border border-white/10 px-3 py-2">325V</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Peak-to-peak (V<sub>pp</sub>)</td>
                      <td className="border border-white/10 px-3 py-2">2 x V<sub>pk</sub></td>
                      <td className="border border-white/10 px-3 py-2">650V</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Average value (V<sub>avg</sub>)</td>
                      <td className="border border-white/10 px-3 py-2">V<sub>pk</sub> x 0.637</td>
                      <td className="border border-white/10 px-3 py-2">207V</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">RMS value (V<sub>rms</sub>)</td>
                      <td className="border border-white/10 px-3 py-2">V<sub>pk</sub> x 0.707</td>
                      <td className="border border-white/10 px-3 py-2">230V</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Form factor</td>
                      <td className="border border-white/10 px-3 py-2">V<sub>rms</sub> / V<sub>avg</sub></td>
                      <td className="border border-white/10 px-3 py-2">1.11</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Crest factor</td>
                      <td className="border border-white/10 px-3 py-2">V<sub>pk</sub> / V<sub>rms</sub></td>
                      <td className="border border-white/10 px-3 py-2">1.414</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Period (T)</td>
                      <td className="border border-white/10 px-3 py-2">1/f</td>
                      <td className="border border-white/10 px-3 py-2">20 ms</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Angular frequency (omega)</td>
                      <td className="border border-white/10 px-3 py-2">2pif</td>
                      <td className="border border-white/10 px-3 py-2">314 rad/s</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> The RMS value (230V) is what we use for power calculations because it represents the equivalent DC voltage that would produce the same heating effect in a resistive load.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Non-Sinusoidal Waveforms */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Square, Triangular, and Sawtooth Waveforms
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Non-sinusoidal waveforms are common in electronic circuits, control systems, and as the current
              waveforms drawn by many modern loads. Each type has a characteristic harmonic content that can
              be analysed using Fourier series.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Non-Sinusoidal Waveforms</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Waveform</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Harmonics Present</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Amplitude Decay</th>
                      <th className="border border-white/10 px-3 py-2 text-left">THD</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Square wave</td>
                      <td className="border border-white/10 px-3 py-2">Odd only (1, 3, 5, 7...)</td>
                      <td className="border border-white/10 px-3 py-2">1/n</td>
                      <td className="border border-white/10 px-3 py-2">48.3%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Triangular wave</td>
                      <td className="border border-white/10 px-3 py-2">Odd only (1, 3, 5, 7...)</td>
                      <td className="border border-white/10 px-3 py-2">1/n<sup>2</sup></td>
                      <td className="border border-white/10 px-3 py-2">12.1%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Sawtooth wave</td>
                      <td className="border border-white/10 px-3 py-2">All (1, 2, 3, 4, 5...)</td>
                      <td className="border border-white/10 px-3 py-2">1/n</td>
                      <td className="border border-white/10 px-3 py-2">80.3%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Half-wave rectified</td>
                      <td className="border border-white/10 px-3 py-2">DC + all harmonics</td>
                      <td className="border border-white/10 px-3 py-2">Complex</td>
                      <td className="border border-white/10 px-3 py-2">121%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Full-wave rectified</td>
                      <td className="border border-white/10 px-3 py-2">DC + even harmonics</td>
                      <td className="border border-white/10 px-3 py-2">Complex</td>
                      <td className="border border-white/10 px-3 py-2">48.3%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Square Wave Fourier Series</p>
                <div className="bg-white/5 p-3 rounded text-sm font-mono">
                  <p>v(t) = (4V<sub>pk</sub>/pi) x [sin(omega t) + </p>
                  <p className="ml-4">sin(3 omega t)/3 + sin(5 omega t)/5 + ...]</p>
                </div>
                <p className="text-xs text-white/60 mt-2">Contains only odd harmonics, amplitudes decrease as 1/n</p>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Where Square Waves Appear</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Digital control signals</li>
                  <li className="pl-1">Simple inverter outputs</li>
                  <li className="pl-1">PWM switching signals</li>
                  <li className="pl-1">Motor drive gate signals</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key insight:</strong> The faster the rate of change (sharper edges), the more high-frequency harmonic content. Square waves have the sharpest edges, hence the highest harmonic content.
            </p>
          </div>
        </section>

        {/* Section 3: Complex Waveforms and Fourier Analysis */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Complex Waveforms and Fourier Analysis
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Joseph Fourier proved that any periodic waveform can be represented as a sum of sinusoidal
              components at the fundamental frequency and integer multiples (harmonics). This is fundamental
              to understanding and measuring power quality.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fourier Series Representation</p>
              <div className="text-center font-mono mb-3">
                <p className="text-elec-yellow">f(t) = a<sub>0</sub> + Sum[a<sub>n</sub>cos(n omega t) + b<sub>n</sub>sin(n omega t)]</p>
              </div>
              <div className="grid sm:grid-cols-3 gap-3 text-xs text-white/80">
                <div><strong>a<sub>0</sub></strong> = DC component (average value)</div>
                <div><strong>n = 1</strong> = Fundamental (50 Hz)</div>
                <div><strong>n = 2, 3, 4...</strong> = Harmonics</div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Harmonic Orders and Frequencies (50 Hz System)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Harmonic Order</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Frequency</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Sequence</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Effect</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1st (fundamental)</td>
                      <td className="border border-white/10 px-3 py-2">50 Hz</td>
                      <td className="border border-white/10 px-3 py-2">Positive</td>
                      <td className="border border-white/10 px-3 py-2">Normal operation</td>
                    </tr>
                    <tr className="bg-red-500/10">
                      <td className="border border-white/10 px-3 py-2">3rd (triplen)</td>
                      <td className="border border-white/10 px-3 py-2">150 Hz</td>
                      <td className="border border-white/10 px-3 py-2">Zero</td>
                      <td className="border border-white/10 px-3 py-2">Adds in neutral</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5th</td>
                      <td className="border border-white/10 px-3 py-2">250 Hz</td>
                      <td className="border border-white/10 px-3 py-2">Negative</td>
                      <td className="border border-white/10 px-3 py-2">Opposes rotation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">7th</td>
                      <td className="border border-white/10 px-3 py-2">350 Hz</td>
                      <td className="border border-white/10 px-3 py-2">Positive</td>
                      <td className="border border-white/10 px-3 py-2">Aids rotation</td>
                    </tr>
                    <tr className="bg-red-500/10">
                      <td className="border border-white/10 px-3 py-2">9th (triplen)</td>
                      <td className="border border-white/10 px-3 py-2">450 Hz</td>
                      <td className="border border-white/10 px-3 py-2">Zero</td>
                      <td className="border border-white/10 px-3 py-2">Adds in neutral</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">11th</td>
                      <td className="border border-white/10 px-3 py-2">550 Hz</td>
                      <td className="border border-white/10 px-3 py-2">Negative</td>
                      <td className="border border-white/10 px-3 py-2">Opposes rotation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">13th</td>
                      <td className="border border-white/10 px-3 py-2">650 Hz</td>
                      <td className="border border-white/10 px-3 py-2">Positive</td>
                      <td className="border border-white/10 px-3 py-2">Aids rotation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Harmonic sequence pattern (in a balanced three-phase system):</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Positive sequence</strong> (1, 4, 7, 10...): n = 3k + 1 - rotates same direction as fundamental</li>
                <li className="pl-1"><strong>Negative sequence</strong> (2, 5, 8, 11...): n = 3k + 2 - rotates opposite to fundamental</li>
                <li className="pl-1"><strong>Zero sequence</strong> (3, 6, 9, 12...): n = 3k - does not rotate, adds in neutral (triplen harmonics)</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical note:</strong> Power quality analysers perform Fast Fourier Transform (FFT) to decompose measured waveforms into their harmonic components for analysis.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Total Harmonic Distortion (THD) */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Total Harmonic Distortion (THD)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Total Harmonic Distortion quantifies how much a waveform deviates from a pure sinusoid.
              It is the primary metric for assessing power quality and is expressed as a percentage.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">THD Calculation</p>
              <div className="text-center font-mono mb-3">
                <p className="text-elec-yellow text-lg">THD = sqrt(V<sub>2</sub><sup>2</sup> + V<sub>3</sub><sup>2</sup> + V<sub>4</sub><sup>2</sup> + ...) / V<sub>1</sub> x 100%</p>
              </div>
              <p className="text-xs text-white/70 text-center">
                Where V<sub>1</sub> = fundamental RMS, V<sub>2</sub>, V<sub>3</sub>, etc. = harmonic RMS values
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">THD Voltage (THD<sub>V</sub>)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Measures supply voltage quality</li>
                  <li className="pl-1">Caused by harmonic currents in system impedance</li>
                  <li className="pl-1">Affects all loads on the circuit</li>
                  <li className="pl-1">Typical limit: 5% at LV (G5/5)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">THD Current (THD<sub>I</sub>)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Measures load current distortion</li>
                  <li className="pl-1">Generated by non-linear loads</li>
                  <li className="pl-1">Causes heating and neutral loading</li>
                  <li className="pl-1">Can exceed 100% for some loads</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Interpreting THD Values</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">THD<sub>V</sub> Level</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Assessment</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Action Required</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-green-500/10">
                      <td className="border border-white/10 px-3 py-2">less than 3%</td>
                      <td className="border border-white/10 px-3 py-2">Excellent</td>
                      <td className="border border-white/10 px-3 py-2">None - good power quality</td>
                    </tr>
                    <tr className="bg-yellow-500/10">
                      <td className="border border-white/10 px-3 py-2">3% - 5%</td>
                      <td className="border border-white/10 px-3 py-2">Acceptable</td>
                      <td className="border border-white/10 px-3 py-2">Monitor for increase</td>
                    </tr>
                    <tr className="bg-orange-500/10">
                      <td className="border border-white/10 px-3 py-2">5% - 8%</td>
                      <td className="border border-white/10 px-3 py-2">Marginal</td>
                      <td className="border border-white/10 px-3 py-2">Investigation needed</td>
                    </tr>
                    <tr className="bg-red-500/10">
                      <td className="border border-white/10 px-3 py-2">greater than 8%</td>
                      <td className="border border-white/10 px-3 py-2">Poor</td>
                      <td className="border border-white/10 px-3 py-2">Mitigation essential</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Important:</strong> THD-R (relative to fundamental) is the standard measure. THD-F (relative to full RMS) gives lower values for the same waveform - ensure you know which is being used.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 5: Sources of Waveform Distortion */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Sources of Waveform Distortion in Building Services
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Modern buildings contain numerous non-linear loads that draw non-sinusoidal currents
              even from a perfect sinusoidal supply. Understanding these sources is essential for
              power quality management.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Major Harmonic Sources</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Equipment</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Dominant Harmonics</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical THD<sub>I</sub></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">6-pulse VSD (AHU, pump)</td>
                      <td className="border border-white/10 px-3 py-2">5th, 7th, 11th, 13th</td>
                      <td className="border border-white/10 px-3 py-2">30-80%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">12-pulse VSD</td>
                      <td className="border border-white/10 px-3 py-2">11th, 13th, 23rd, 25th</td>
                      <td className="border border-white/10 px-3 py-2">10-15%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">LED driver (SMPS)</td>
                      <td className="border border-white/10 px-3 py-2">3rd, 5th, 7th</td>
                      <td className="border border-white/10 px-3 py-2">20-100%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Switch-mode PSU (IT)</td>
                      <td className="border border-white/10 px-3 py-2">3rd, 5th, 7th, 9th</td>
                      <td className="border border-white/10 px-3 py-2">80-130%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">UPS (double conversion)</td>
                      <td className="border border-white/10 px-3 py-2">5th, 7th, 11th</td>
                      <td className="border border-white/10 px-3 py-2">25-35%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Electronic fluorescent ballast</td>
                      <td className="border border-white/10 px-3 py-2">3rd, 5th, 7th</td>
                      <td className="border border-white/10 px-3 py-2">15-25%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lift motor drive</td>
                      <td className="border border-white/10 px-3 py-2">5th, 7th, 11th, 13th</td>
                      <td className="border border-white/10 px-3 py-2">40-80%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Electric vehicle charger</td>
                      <td className="border border-white/10 px-3 py-2">3rd, 5th, 7th (single-phase)</td>
                      <td className="border border-white/10 px-3 py-2">20-50%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Variable Speed Drives (VSDs)</p>
              <p className="text-sm text-white mb-3">
                VSDs are increasingly common for HVAC control but are significant harmonic sources:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>6-pulse drives</strong> produce harmonics of order 6n +/- 1 (5th, 7th, 11th, 13th...)</li>
                <li className="pl-1"><strong>12-pulse drives</strong> eliminate 5th and 7th harmonics using phase-shifted transformers</li>
                <li className="pl-1"><strong>18-pulse drives</strong> further reduce harmonics but at higher cost</li>
                <li className="pl-1"><strong>Active front-end (AFE)</strong> drives have near-sinusoidal input current (THD less than 5%)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">LED Lighting Systems</p>
              <p className="text-sm text-white mb-3">
                While energy-efficient, LED drivers are single-phase non-linear loads with high 3rd harmonic content:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Individual luminaires comply with IEC 61000-3-2 Class C</li>
                <li className="pl-1">Large LED installations aggregate harmonic currents</li>
                <li className="pl-1">3rd harmonic (zero sequence) adds in neutral conductor</li>
                <li className="pl-1">Retrofit LED projects may exceed original neutral capacity</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design consideration:</strong> When specifying VSDs, consider the total installed VSD power as a percentage of transformer capacity. Above 30%, harmonic mitigation is typically required.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 6: Effects on Neutral Conductor Sizing */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Effects on Neutral Conductor Sizing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              In a balanced three-phase system with linear loads, the neutral current is zero as the
              phase currents cancel. However, triplen harmonics (3rd, 9th, 15th...) are zero-sequence
              currents that add arithmetically in the neutral.
            </p>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Critical Design Issue</p>
              <p className="text-sm text-white">
                With significant 3rd harmonic content, the neutral current can exceed the phase current
                by up to 1.73 times (square root of 3). This can cause neutral conductor overheating in
                installations designed with reduced neutral sizes.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Neutral Current Calculation</p>
              <div className="bg-white/5 p-4 rounded-lg font-mono text-center mb-4">
                <p className="text-elec-yellow">I<sub>N</sub> = 3 x I<sub>3</sub> (for 3rd harmonic only)</p>
                <p className="text-sm text-white/70 mt-2">For balanced loads with only 3rd harmonic content</p>
              </div>
              <p className="text-sm text-white">
                If each phase carries 10A of fundamental and 5A of 3rd harmonic:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 mt-2">
                <li className="pl-1">Fundamental neutral current: 0A (balanced, cancels)</li>
                <li className="pl-1">3rd harmonic neutral current: 3 x 5A = 15A</li>
                <li className="pl-1">Total neutral current: 15A (50% of phase RMS!)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BS 7671 Requirements for Neutral Sizing</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">3rd Harmonic Content</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Neutral Size Requirement</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">0-15%</td>
                      <td className="border border-white/10 px-3 py-2">Same as phase (can reduce in some cases)</td>
                      <td className="border border-white/10 px-3 py-2">Mixed loads, resistive</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">15-33%</td>
                      <td className="border border-white/10 px-3 py-2">Same as phase conductor</td>
                      <td className="border border-white/10 px-3 py-2">General office</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">33-45%</td>
                      <td className="border border-white/10 px-3 py-2">Neutral sized for I<sub>N</sub> (may exceed phase)</td>
                      <td className="border border-white/10 px-3 py-2">Dense LED/IT loads</td>
                    </tr>
                    <tr className="bg-red-500/10">
                      <td className="border border-white/10 px-3 py-2">greater than 45%</td>
                      <td className="border border-white/10 px-3 py-2">Neutral sized 1.45-2 times phase</td>
                      <td className="border border-white/10 px-3 py-2">Data centres, large LED</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Practical Solutions</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Oversize neutral:</strong> Specify neutral equal to or larger than phase conductors</li>
                <li className="pl-1"><strong>Separate neutrals:</strong> Consider individual neutrals per phase for distribution boards</li>
                <li className="pl-1"><strong>Zig-zag transformer:</strong> Provides low-impedance path for triplen harmonics</li>
                <li className="pl-1"><strong>Active filters:</strong> Inject compensating current to cancel harmonics</li>
                <li className="pl-1"><strong>K-rated transformers:</strong> Designed to handle non-linear loads</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Important:</strong> BS 7671 Appendix 4 provides specific guidance on rating factors for harmonic currents. Always assess harmonic content when designing circuits for LED lighting or IT equipment.
            </p>
          </div>
        </section>

        {/* Section 7: IEEE and IEC Harmonic Standards */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            IEEE and IEC Harmonic Standards
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              International standards set limits on harmonic emissions and immunity to ensure power
              quality and electromagnetic compatibility. Building services engineers must understand
              these standards to specify compliant equipment.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Harmonic Standards</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Standard</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Scope</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">IEEE 519</td>
                      <td className="border border-white/10 px-3 py-2">Harmonic limits at PCC</td>
                      <td className="border border-white/10 px-3 py-2">Customer/utility interface</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">IEC 61000-3-2</td>
                      <td className="border border-white/10 px-3 py-2">Equipment emission limits (less than 16A)</td>
                      <td className="border border-white/10 px-3 py-2">Small appliances, LEDs</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">IEC 61000-3-12</td>
                      <td className="border border-white/10 px-3 py-2">Equipment emission limits (16-75A)</td>
                      <td className="border border-white/10 px-3 py-2">Larger equipment, VSDs</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">IEC 61000-2-4</td>
                      <td className="border border-white/10 px-3 py-2">Compatibility levels (industrial)</td>
                      <td className="border border-white/10 px-3 py-2">Planning levels</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">EN 50160</td>
                      <td className="border border-white/10 px-3 py-2">Supply voltage characteristics</td>
                      <td className="border border-white/10 px-3 py-2">DNO supply quality</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">G5/5 (UK)</td>
                      <td className="border border-white/10 px-3 py-2">Planning limits for UK networks</td>
                      <td className="border border-white/10 px-3 py-2">DNO connection agreements</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">IEEE 519 Voltage Distortion Limits</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Bus Voltage at PCC</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Individual Harmonic (%)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">THD<sub>V</sub> (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">less than or equal to 1 kV (LV)</td>
                      <td className="border border-white/10 px-3 py-2">5.0</td>
                      <td className="border border-white/10 px-3 py-2">8.0</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1 kV to 69 kV (MV)</td>
                      <td className="border border-white/10 px-3 py-2">3.0</td>
                      <td className="border border-white/10 px-3 py-2">5.0</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">69 kV to 161 kV</td>
                      <td className="border border-white/10 px-3 py-2">1.5</td>
                      <td className="border border-white/10 px-3 py-2">2.5</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">greater than 161 kV (HV)</td>
                      <td className="border border-white/10 px-3 py-2">1.0</td>
                      <td className="border border-white/10 px-3 py-2">1.5</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">IEC 61000-3-2 Equipment Classes</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Class A:</strong> Balanced three-phase and other equipment not in B, C, or D</li>
                <li className="pl-1"><strong>Class B:</strong> Portable tools (higher limits than Class A)</li>
                <li className="pl-1"><strong>Class C:</strong> Lighting equipment (limits as % of fundamental)</li>
                <li className="pl-1"><strong>Class D:</strong> Equipment with 'special waveshape' (PCs, monitors with power 75-600W)</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>UK context:</strong> Engineering Recommendation G5/5 sets planning limits for harmonic voltage distortion in UK distribution networks. DNOs may require harmonic studies for large non-linear loads.
            </p>
          </div>
        </section>

        {/* Section 8: Building Services Applications */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">08</span>
            Building Services: Harmonic Assessment and Mitigation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Modern commercial and industrial buildings require proactive harmonic management due to
              the prevalence of non-linear loads. This section covers practical assessment and mitigation
              strategies for building services engineers.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">When to Conduct Harmonic Assessment</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">VSD capacity exceeds 30% of transformer rating</li>
                <li className="pl-1">Large LED lighting retrofit (greater than 50% of lighting load)</li>
                <li className="pl-1">New data centre or server room</li>
                <li className="pl-1">EV charging installation (multiple chargers)</li>
                <li className="pl-1">Unexplained equipment failures or nuisance tripping</li>
                <li className="pl-1">Neutral conductor overheating observed</li>
                <li className="pl-1">DNO connection agreement requires harmonic compliance</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Harmonic Mitigation Techniques</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Technique</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Effectiveness</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Line reactors (3-5%)</td>
                      <td className="border border-white/10 px-3 py-2">Individual VSDs</td>
                      <td className="border border-white/10 px-3 py-2">Reduces THD to 35-45%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">DC link chokes</td>
                      <td className="border border-white/10 px-3 py-2">VSD DC bus</td>
                      <td className="border border-white/10 px-3 py-2">Reduces THD to 30-40%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Passive harmonic filter</td>
                      <td className="border border-white/10 px-3 py-2">Fixed non-linear load</td>
                      <td className="border border-white/10 px-3 py-2">Tuned to specific harmonics</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Active harmonic filter</td>
                      <td className="border border-white/10 px-3 py-2">Variable/multiple loads</td>
                      <td className="border border-white/10 px-3 py-2">THD less than 5% achievable</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">12/18-pulse rectifier</td>
                      <td className="border border-white/10 px-3 py-2">Large VSDs (greater than 100kW)</td>
                      <td className="border border-white/10 px-3 py-2">THD 8-12%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Active front-end VSD</td>
                      <td className="border border-white/10 px-3 py-2">Critical installations</td>
                      <td className="border border-white/10 px-3 py-2">THD less than 5%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">K-rated transformer</td>
                      <td className="border border-white/10 px-3 py-2">High harmonic load areas</td>
                      <td className="border border-white/10 px-3 py-2">Accommodates, doesn't filter</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Phase-shifting transformer</td>
                      <td className="border border-white/10 px-3 py-2">Multiple similar loads</td>
                      <td className="border border-white/10 px-3 py-2">Cancels specific harmonics</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">K-Rated Transformer Selection</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">K-Factor</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Load Profile</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">K-1</td>
                      <td className="border border-white/10 px-3 py-2">Linear loads only</td>
                      <td className="border border-white/10 px-3 py-2">Resistive heating, motors DOL</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">K-4</td>
                      <td className="border border-white/10 px-3 py-2">General office</td>
                      <td className="border border-white/10 px-3 py-2">Mixed linear and non-linear</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">K-13</td>
                      <td className="border border-white/10 px-3 py-2">IT/telecommunications</td>
                      <td className="border border-white/10 px-3 py-2">High proportion SMPS</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">K-20</td>
                      <td className="border border-white/10 px-3 py-2">Data centre</td>
                      <td className="border border-white/10 px-3 py-2">Very high harmonic content</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design tip:</strong> For new buildings, specify VSD manufacturers to provide low-harmonic drives (AFE or with integral filters) where practical. The additional capital cost is often offset by avoiding centralised mitigation.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: THD Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A current waveform has the following harmonic content: I<sub>1</sub> = 100A, I<sub>3</sub> = 40A, I<sub>5</sub> = 20A, I<sub>7</sub> = 14A. Calculate the THD.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>THD = sqrt(I<sub>3</sub><sup>2</sup> + I<sub>5</sub><sup>2</sup> + I<sub>7</sub><sup>2</sup>) / I<sub>1</sub> x 100%</p>
                <p className="mt-2">THD = sqrt(40<sup>2</sup> + 20<sup>2</sup> + 14<sup>2</sup>) / 100 x 100%</p>
                <p>THD = sqrt(1600 + 400 + 196) / 100 x 100%</p>
                <p>THD = sqrt(2196) / 100 x 100%</p>
                <p>THD = 46.86 / 100 x 100% = <strong>46.9%</strong></p>
                <p className="mt-2 text-white/60">This is high THD typical of a single-phase SMPS load</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Neutral Current Assessment</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A three-phase balanced lighting circuit has 20A per phase with 35% third harmonic content. Calculate the neutral current.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>3rd harmonic current per phase = 20A x 0.35 = 7A</p>
                <p className="mt-2">Fundamental neutral current = 0A (balanced)</p>
                <p>3rd harmonic neutral current = 3 x 7A = <strong>21A</strong></p>
                <p className="mt-2">Total phase RMS = sqrt(20<sup>2</sup> + 7<sup>2</sup>) = 21.2A</p>
                <p className="mt-2 text-red-400">Neutral carries 21A while phases only carry 21.2A!</p>
                <p className="text-white/60">Neutral should be sized same as or larger than phases</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: VSD Harmonic Assessment</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A building has a 500kVA transformer. The installed 6-pulse VSD load is 180kW. Should harmonic mitigation be specified?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>VSD proportion = 180kW / (500kVA x 0.8 pf) x 100%</p>
                <p>VSD proportion = 180 / 400 x 100% = <strong>45%</strong></p>
                <p className="mt-2 text-white/60">This exceeds the 30% guideline threshold</p>
                <p className="mt-2 text-green-400">Recommendation: Specify either:</p>
                <p className="text-white/60">- Active harmonic filters at main LV panel</p>
                <p className="text-white/60">- Low-harmonic VSD variants (AFE or with filters)</p>
                <p className="text-white/60">- 12-pulse drives for larger motors</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 4: Waveform RMS Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A voltage waveform has V<sub>1</sub> = 230V, V<sub>5</sub> = 15V, V<sub>7</sub> = 10V. What is the true RMS voltage?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>V<sub>rms</sub> = sqrt(V<sub>1</sub><sup>2</sup> + V<sub>5</sub><sup>2</sup> + V<sub>7</sub><sup>2</sup>)</p>
                <p className="mt-2">V<sub>rms</sub> = sqrt(230<sup>2</sup> + 15<sup>2</sup> + 10<sup>2</sup>)</p>
                <p>V<sub>rms</sub> = sqrt(52900 + 225 + 100)</p>
                <p>V<sub>rms</sub> = sqrt(53225) = <strong>230.7V</strong></p>
                <p className="mt-2">THD<sub>V</sub> = sqrt(15<sup>2</sup> + 10<sup>2</sup>) / 230 x 100% = 7.8%</p>
                <p className="text-orange-400">This exceeds the 5% limit - investigation needed</p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Essential Formulas</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>V<sub>pk</sub> = V<sub>rms</sub> x 1.414</strong> - Peak from RMS</li>
                <li className="pl-1"><strong>THD = sqrt(sum of V<sub>n</sub><sup>2</sup>) / V<sub>1</sub></strong> - Total harmonic distortion</li>
                <li className="pl-1"><strong>I<sub>N</sub> = 3 x I<sub>3</sub></strong> - Neutral current from 3rd harmonic</li>
                <li className="pl-1"><strong>f<sub>n</sub> = n x f<sub>1</sub></strong> - Harmonic frequency</li>
                <li className="pl-1"><strong>Form factor = 1.11</strong> - For pure sinusoid</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">UK fundamental frequency: <strong>50 Hz</strong></li>
                <li className="pl-1">3rd harmonic frequency: <strong>150 Hz</strong></li>
                <li className="pl-1">THD<sub>V</sub> limit (LV, G5/5): <strong>5%</strong></li>
                <li className="pl-1">VSD threshold for mitigation: <strong>30% of transformer</strong></li>
                <li className="pl-1">Maximum neutral current factor: <strong>1.73 x phase</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Undersizing neutrals</strong> - Always consider triplen harmonics in LED/IT circuits</li>
                <li className="pl-1"><strong>Using average-reading meters</strong> - Only true-RMS meters give correct readings for distorted waveforms</li>
                <li className="pl-1"><strong>Ignoring harmonic resonance</strong> - PFC capacitors can resonate with system inductance at harmonic frequencies</li>
                <li className="pl-1"><strong>Assuming compliance</strong> - Individual compliant equipment can aggregate to exceed limits</li>
              </ul>
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

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Waveform Types</p>
                <ul className="space-y-0.5">
                  <li>Sinusoidal - Pure 50 Hz, no harmonics</li>
                  <li>Square - Odd harmonics, 1/n amplitude</li>
                  <li>Triangular - Odd harmonics, 1/n<sup>2</sup></li>
                  <li>Distorted - Fundamental plus harmonics</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Harmonic Sources</p>
                <ul className="space-y-0.5">
                  <li>VSDs: 5th, 7th, 11th, 13th (6-pulse)</li>
                  <li>LEDs/SMPS: 3rd, 5th, 7th harmonics</li>
                  <li>Triplen (3rd, 9th): Add in neutral</li>
                  <li>Limit THD<sub>V</sub> to 5% (LV)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section3-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Phase Difference
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section3-5">
              Next: AC Circuit Theory
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule3Section3_4;
