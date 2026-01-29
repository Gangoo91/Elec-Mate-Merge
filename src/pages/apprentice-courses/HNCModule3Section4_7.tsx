import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Harmonics and Power Quality Issues - HNC Module 3 Section 4.7";
const DESCRIPTION = "Understanding harmonic distortion in three-phase systems, triplen harmonics in neutrals, power quality standards EN 50160 and G5/4-1, K-factor transformers, and harmonic mitigation techniques for building services.";

const quickCheckQuestions = [
  {
    id: "triplen-harmonics",
    question: "Which harmonic orders are classified as triplen harmonics?",
    options: ["2nd, 4th, 6th", "3rd, 9th, 15th", "5th, 7th, 11th", "1st, 2nd, 3rd"],
    correctIndex: 1,
    explanation: "Triplen harmonics are odd multiples of the 3rd harmonic (3rd, 9th, 15th, 21st, etc.). These are particularly problematic as they sum in the neutral conductor rather than cancelling."
  },
  {
    id: "thd-limit",
    question: "What is the typical THD voltage limit for LV supplies under EN 50160?",
    options: ["3%", "5%", "8%", "12%"],
    correctIndex: 2,
    explanation: "EN 50160 specifies that THD voltage should not exceed 8% for 95% of 10-minute intervals over a week. Individual harmonics have specific limits, with lower-order harmonics having tighter restrictions."
  },
  {
    id: "k-factor",
    question: "A K-factor transformer rated K-13 is designed for installations with:",
    options: ["No harmonic loads", "Light harmonic content", "Moderate to heavy harmonic loads", "Linear loads only"],
    correctIndex: 2,
    explanation: "K-13 rated transformers handle moderate to heavy harmonic loads typical of data centres and VSD-heavy installations. K-1 is for linear loads, K-4 for light harmonics, and K-20+ for severe harmonic environments."
  },
  {
    id: "5th-harmonic",
    question: "In a three-phase system, 5th harmonic currents create a rotating magnetic field that:",
    options: ["Rotates in the same direction as fundamental", "Rotates in the opposite direction (negative sequence)", "Does not rotate (zero sequence)", "Rotates at double speed"],
    correctIndex: 1,
    explanation: "5th harmonic is a negative sequence harmonic, creating counter-rotating fields that cause additional heating and torque pulsations in motors. 7th harmonic is positive sequence, 3rd is zero sequence."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the fundamental frequency of the UK mains supply?",
    options: ["40Hz", "50Hz", "60Hz", "100Hz"],
    correctAnswer: 1,
    explanation: "The UK mains frequency is 50Hz. The 3rd harmonic is therefore 150Hz, the 5th is 250Hz, and so on."
  },
  {
    id: 2,
    question: "In a balanced three-phase system with non-linear loads, which harmonics cancel in the neutral?",
    options: ["All harmonics cancel", "5th and 7th harmonics cancel", "Triplen harmonics cancel", "Non-triplen harmonics cancel"],
    correctAnswer: 3,
    explanation: "Non-triplen harmonics (5th, 7th, 11th, 13th, etc.) cancel in a balanced three-phase neutral. Triplen harmonics (3rd, 9th, 15th) add arithmetically, potentially causing neutral currents exceeding phase currents."
  },
  {
    id: 3,
    question: "A three-phase circuit supplies identical single-phase non-linear loads drawing 80A fundamental and 40A third harmonic each. What is the neutral current?",
    options: ["0A", "40A", "80A", "120A"],
    correctAnswer: 3,
    explanation: "Third harmonic currents from all three phases add: 3 × 40A = 120A. The fundamental currents cancel (120° phase shift), but triplen harmonics are in phase and sum directly."
  },
  {
    id: 4,
    question: "Which power quality standard specifically addresses harmonic emissions from customer installations connected to UK distribution networks?",
    options: ["BS 7671", "EN 50160", "G5/4-1", "IEC 61000-3-2"],
    correctAnswer: 2,
    explanation: "Engineering Recommendation G5/4-1 sets planning levels and assessment procedures for harmonic emissions from customer installations connecting to UK DNO networks."
  },
  {
    id: 5,
    question: "What is the primary cause of additional heating in cables carrying harmonic currents?",
    options: ["Increased RMS current value", "Skin effect at higher frequencies", "Both A and B", "Reduced insulation resistance"],
    correctAnswer: 2,
    explanation: "Harmonic currents increase both the RMS current value and cause skin effect at higher frequencies, pushing current to the conductor surface and increasing effective resistance. Both effects contribute to additional heating."
  },
  {
    id: 6,
    question: "An active harmonic filter operates by:",
    options: ["Blocking harmonic frequencies with LC circuits", "Injecting anti-phase currents to cancel harmonics", "Absorbing harmonics through resistive elements", "Shifting harmonic phase angles"],
    correctAnswer: 1,
    explanation: "Active filters measure harmonic content in real-time and inject equal but opposite currents to cancel harmonics at the point of common coupling. They are adaptive and effective across a wide frequency range."
  },
  {
    id: 7,
    question: "For a data centre with UPS systems and server power supplies, what K-factor transformer rating would typically be specified?",
    options: ["K-1", "K-4", "K-13", "K-20"],
    correctAnswer: 2,
    explanation: "Data centres typically require K-13 transformers due to the high harmonic content from switch-mode power supplies, UPS systems, and variable speed drives. K-20 may be needed for particularly severe environments."
  },
  {
    id: 8,
    question: "According to G5/4-1, what assessment is required before connecting a large non-linear load to the distribution network?",
    options: ["Visual inspection only", "Harmonic current assessment at the point of connection", "Temperature rise test", "Insulation resistance test"],
    correctAnswer: 1,
    explanation: "G5/4-1 requires harmonic current assessment to ensure customer emissions don't cause voltage distortion at the point of common coupling to exceed planning levels."
  },
  {
    id: 9,
    question: "A passive harmonic filter tuned to 250Hz is designed to attenuate which harmonic?",
    options: ["3rd harmonic", "5th harmonic", "7th harmonic", "11th harmonic"],
    correctAnswer: 1,
    explanation: "At 50Hz fundamental, the 5th harmonic frequency is 5 × 50Hz = 250Hz. Passive filters are tuned to specific harmonic frequencies using LC resonant circuits."
  },
  {
    id: 10,
    question: "What is Total Harmonic Distortion (THD)?",
    options: [
      "The sum of all harmonic amplitudes",
      "The ratio of fundamental to total RMS value",
      "The ratio of harmonic content to fundamental, expressed as a percentage",
      "The phase angle between harmonics"
    ],
    correctAnswer: 2,
    explanation: "THD is calculated as the square root of the sum of squares of all harmonic amplitudes divided by the fundamental amplitude, expressed as a percentage. THD = (sqrt(H2² + H3² + H4² + ...)) / H1 × 100%"
  }
];

const faqs = [
  {
    question: "Why are harmonics becoming more prevalent in modern installations?",
    answer: "The proliferation of non-linear loads such as LED drivers, switch-mode power supplies, variable speed drives, and electronic equipment draws current in non-sinusoidal waveforms, generating harmonics. Modern buildings with extensive IT equipment, efficient lighting, and motor control systems have significantly higher harmonic content than traditional installations with predominantly linear loads."
  },
  {
    question: "How do I know if an installation has a harmonic problem?",
    answer: "Common symptoms include: neutral conductors running hot, nuisance tripping of circuit breakers, transformer overheating, capacitor failures, flickering lights, and equipment malfunctions. Power quality analysers can measure THD and individual harmonic levels to quantify the problem. BS 7671 Table 5.4a provides correction factors for sizing neutrals in harmonic-rich environments."
  },
  {
    question: "When should I use an active filter versus a passive filter?",
    answer: "Passive filters are cost-effective for fixed, predictable harmonic spectra (e.g., single large VSD). Active filters suit dynamic loads with varying harmonic content, multiple harmonic orders, or where passive filter resonance risks exist. Hybrid solutions combining both technologies offer optimal performance for complex installations like data centres."
  },
  {
    question: "What neutral conductor sizing is required for high harmonic installations?",
    answer: "BS 7671 requires neutral sizing based on third harmonic current content. For THD above 33%, the neutral may need to be larger than phase conductors. Table 5.4a provides reduction factors: at 33% third harmonic, factor is 0.86; at 45% factor is 0.75. Some specifications require double-sized neutrals (200%) for IT-heavy environments."
  },
  {
    question: "How do harmonics affect power factor correction capacitors?",
    answer: "Capacitor impedance decreases with frequency (Xc = 1/2πfC), making them low-impedance paths for harmonic currents. This causes overheating, premature failure, and potential resonance with system inductance. Detuned reactors (typically 7% or 14%) are added to capacitor banks to raise the resonant frequency above prevalent harmonics, preventing amplification."
  },
  {
    question: "What is the difference between displacement power factor and true power factor?",
    answer: "Displacement power factor (cos φ) considers only the phase angle between fundamental voltage and current. True power factor (TPF) accounts for harmonic distortion: TPF = Displacement PF × Distortion Factor. A load with 0.95 displacement PF but 20% current THD has TPF of approximately 0.93. Modern power factor meters should measure true power factor."
  }
];

const HNCModule3Section4_7 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section4">
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
            <span>Module 3.4.7</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Harmonics and Power Quality Issues
          </h1>
          <p className="text-white/80">
            Understanding harmonic distortion sources, effects on three-phase systems, and mitigation techniques for building services
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Harmonics:</strong> Integer multiples of 50Hz fundamental frequency</li>
              <li className="pl-1"><strong>Triplen harmonics:</strong> 3rd, 9th, 15th sum in neutral conductors</li>
              <li className="pl-1"><strong>THD limits:</strong> EN 50160 specifies 8% voltage THD maximum</li>
              <li className="pl-1"><strong>Mitigation:</strong> Passive/active filters, K-factor transformers</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Data centres:</strong> High harmonic content from IT loads</li>
              <li className="pl-1"><strong>VSD installations:</strong> 6-pulse drives produce 5th, 7th harmonics</li>
              <li className="pl-1"><strong>LED lighting:</strong> Driver circuits generate harmonics</li>
              <li className="pl-1"><strong>G5/4-1:</strong> UK harmonic assessment requirements</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define harmonics and explain their generation by non-linear loads",
              "Analyse triplen harmonic behaviour in three-phase neutral conductors",
              "Calculate harmonic heating effects on cables and transformers",
              "Apply power quality standards EN 50160 and G5/4-1",
              "Select appropriate harmonic mitigation techniques",
              "Specify K-factor transformers for harmonic-rich installations"
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

        {/* Section 1: What Are Harmonics? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What Are Harmonics?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Harmonics are sinusoidal components of a periodic waveform that have frequencies which are
              integer multiples of the fundamental frequency. In UK electrical systems, the fundamental
              frequency is 50Hz, so the 3rd harmonic is 150Hz, the 5th is 250Hz, and so on.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key harmonic concepts:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Fundamental frequency (1st harmonic): 50Hz in the UK</li>
                <li className="pl-1">Odd harmonics (3rd, 5th, 7th...): Most prevalent from non-linear loads</li>
                <li className="pl-1">Even harmonics (2nd, 4th, 6th...): Rare, indicate asymmetrical waveforms</li>
                <li className="pl-1">Inter-harmonics: Non-integer multiples, caused by cycloconverters</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Harmonic Sources in Buildings</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Source</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Dominant Harmonics</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical THD(I)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">6-pulse VSD</td>
                      <td className="border border-white/10 px-3 py-2">5th, 7th, 11th, 13th</td>
                      <td className="border border-white/10 px-3 py-2">80-100%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">12-pulse VSD</td>
                      <td className="border border-white/10 px-3 py-2">11th, 13th, 23rd, 25th</td>
                      <td className="border border-white/10 px-3 py-2">10-15%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">PC/Server SMPS</td>
                      <td className="border border-white/10 px-3 py-2">3rd, 5th, 7th</td>
                      <td className="border border-white/10 px-3 py-2">70-120%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">LED drivers</td>
                      <td className="border border-white/10 px-3 py-2">3rd, 5th, 7th, 9th</td>
                      <td className="border border-white/10 px-3 py-2">20-80%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">UPS systems</td>
                      <td className="border border-white/10 px-3 py-2">5th, 7th (input side)</td>
                      <td className="border border-white/10 px-3 py-2">30-40%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fluorescent lighting (magnetic)</td>
                      <td className="border border-white/10 px-3 py-2">3rd, 5th</td>
                      <td className="border border-white/10 px-3 py-2">15-25%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Note:</strong> THD(I) is Total Harmonic Distortion of current. Values above 100% indicate harmonic content exceeds fundamental current magnitude.
            </p>
          </div>
        </section>

        {/* Section 2: Harmonic Sequences */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Three-Phase Harmonic Patterns and Sequences
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              In three-phase systems, harmonics are classified by their sequence - the direction and
              nature of the rotating magnetic field they create. Understanding sequences is essential
              for predicting harmonic behaviour and effects.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Harmonic Sequence Classification</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Sequence</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Harmonic Orders</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Rotation</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Effects</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Positive</td>
                      <td className="border border-white/10 px-3 py-2">1st, 4th, 7th, 10th, 13th...</td>
                      <td className="border border-white/10 px-3 py-2">Same as fundamental</td>
                      <td className="border border-white/10 px-3 py-2">Motor heating, torque ripple</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Negative</td>
                      <td className="border border-white/10 px-3 py-2">2nd, 5th, 8th, 11th, 14th...</td>
                      <td className="border border-white/10 px-3 py-2">Opposite to fundamental</td>
                      <td className="border border-white/10 px-3 py-2">Counter-torque, motor braking</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Zero (Triplen)</td>
                      <td className="border border-white/10 px-3 py-2">3rd, 6th, 9th, 12th, 15th...</td>
                      <td className="border border-white/10 px-3 py-2">No rotation (in phase)</td>
                      <td className="border border-white/10 px-3 py-2">Sum in neutral, transformer heating</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Sequence Pattern Formula</p>
              <p className="text-sm text-white mb-2">The sequence of harmonic h can be determined by:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">h = 3n + 1 (where n = 0,1,2,3...): <strong>Positive sequence</strong> (1, 4, 7, 10, 13...)</li>
                <li className="pl-1">h = 3n + 2 (where n = 0,1,2,3...): <strong>Negative sequence</strong> (2, 5, 8, 11, 14...)</li>
                <li className="pl-1">h = 3n (where n = 1,2,3,4...): <strong>Zero sequence</strong> (3, 6, 9, 12, 15...)</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Practical implication:</strong> 6-pulse VSDs produce predominantly 5th and 7th harmonics (6k±1 rule), which are negative and positive sequence respectively. The 5th harmonic causes motor counter-rotation effects.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 3: Triplen Harmonics */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Triplen Harmonics in Neutral Conductors
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Triplen harmonics (3rd, 9th, 15th, etc.) present unique challenges in three-phase four-wire
              systems. Unlike other harmonics that cancel in a balanced system, triplen harmonics are
              zero-sequence and add arithmetically in the neutral conductor.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Why triplen harmonics sum in the neutral:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Fundamental currents are 120° apart and sum to zero in a balanced system</li>
                <li className="pl-1">3rd harmonic: Each phase current is at 3 × 120° = 360° = 0° - all in phase</li>
                <li className="pl-1">Being in phase, they add rather than cancel: IN(3rd) = 3 × Iph(3rd)</li>
                <li className="pl-1">Neutral current can exceed phase current even with balanced loads</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Critical Design Consideration</p>
              <p className="text-sm text-white">
                In installations with significant single-phase non-linear loads (IT equipment, LED lighting),
                the neutral current can be 1.5 to 1.7 times the phase current due to triplen harmonic summation.
                Standard neutral sizing (equal to phase) is inadequate.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BS 7671 Neutral Sizing for Harmonics</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">3rd Harmonic Content</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Reduction Factor</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Size Conductor For</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">0-15%</td>
                      <td className="border border-white/10 px-3 py-2">1.0</td>
                      <td className="border border-white/10 px-3 py-2">Phase current</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">15-33%</td>
                      <td className="border border-white/10 px-3 py-2">0.86</td>
                      <td className="border border-white/10 px-3 py-2">Phase current</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">33-45%</td>
                      <td className="border border-white/10 px-3 py-2">0.86</td>
                      <td className="border border-white/10 px-3 py-2">Neutral current</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">&gt;45%</td>
                      <td className="border border-white/10 px-3 py-2">1.0</td>
                      <td className="border border-white/10 px-3 py-2">Neutral current</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-white/60 mt-2">Reference: BS 7671 Table 5.4a - Reduction factors for harmonic currents in four-core and five-core cables</p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design practice:</strong> For data centres and IT-heavy installations, specify neutral conductor at 200% of phase size, or use separate neutral conductors per phase.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 4: Heating Effects */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Harmonic Heating Effects on Cables and Transformers
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Harmonic currents cause additional heating through two primary mechanisms: increased RMS
              current and frequency-dependent losses. These effects must be considered when sizing
              cables and transformers for harmonic-rich installations.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cable Heating Effects</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Skin effect:</strong> Higher frequencies force current to conductor surface, increasing effective resistance</li>
                  <li className="pl-1"><strong>Proximity effect:</strong> Adjacent conductors create additional eddy current losses</li>
                  <li className="pl-1"><strong>Neutral heating:</strong> Triplen harmonics cause unexpected neutral heating</li>
                  <li className="pl-1"><strong>Dielectric losses:</strong> Higher frequencies increase insulation losses</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Transformer Heating Effects</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Winding losses:</strong> I²R losses increase with harmonic current</li>
                  <li className="pl-1"><strong>Eddy current losses:</strong> Proportional to frequency squared (f²)</li>
                  <li className="pl-1"><strong>Core losses:</strong> Hysteresis and eddy currents in laminations</li>
                  <li className="pl-1"><strong>Stray losses:</strong> Induced currents in structural parts</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Calculating Harmonic RMS Current</p>
              <p className="font-mono text-center text-lg mb-2">I<sub>RMS</sub> = √(I<sub>1</sub>² + I<sub>3</sub>² + I<sub>5</sub>² + I<sub>7</sub>² + ...)</p>
              <p className="text-xs text-white/70 text-center">Where I1 is fundamental current and I3, I5, etc. are harmonic currents</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Skin Effect Resistance Multipliers (Approximate)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Harmonic</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Frequency (Hz)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">RAC/RDC (large conductors)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fundamental</td>
                      <td className="border border-white/10 px-3 py-2">50</td>
                      <td className="border border-white/10 px-3 py-2">1.0 - 1.02</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5th</td>
                      <td className="border border-white/10 px-3 py-2">250</td>
                      <td className="border border-white/10 px-3 py-2">1.1 - 1.3</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">7th</td>
                      <td className="border border-white/10 px-3 py-2">350</td>
                      <td className="border border-white/10 px-3 py-2">1.15 - 1.5</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">11th</td>
                      <td className="border border-white/10 px-3 py-2">550</td>
                      <td className="border border-white/10 px-3 py-2">1.3 - 2.0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-white/60 mt-2">Values vary with conductor size - larger conductors experience greater skin effect</p>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Derating requirement:</strong> Standard transformers must be derated when supplying non-linear loads. A transformer with 30% current THD may need to be derated to 70-80% of nameplate capacity to prevent overheating.
            </p>
          </div>
        </section>

        {/* Section 5: Power Quality Standards */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Power Quality Standards (EN 50160, G5/4-1)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Power quality standards set limits on harmonic distortion to ensure compatibility between
              equipment and the supply network. The UK applies European standards (EN 50160) and the
              Distribution Code (Engineering Recommendation G5/4-1).
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">EN 50160 - Voltage Characteristics</p>
              <p className="text-sm text-white mb-3">
                Defines voltage quality at the point of supply to customers. For harmonics:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Total Harmonic Distortion (THD): ≤8% for LV supplies</li>
                <li className="pl-1">Individual harmonic limits vary by order (see table)</li>
                <li className="pl-1">Measurements over 95% of 10-minute intervals per week</li>
                <li className="pl-1">Applies to supply voltage, not current</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">EN 50160 Individual Voltage Harmonic Limits</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Odd Harmonics</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Limit (%)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Even Harmonics</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Limit (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3rd</td>
                      <td className="border border-white/10 px-3 py-2">5.0</td>
                      <td className="border border-white/10 px-3 py-2">2nd</td>
                      <td className="border border-white/10 px-3 py-2">2.0</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5th</td>
                      <td className="border border-white/10 px-3 py-2">6.0</td>
                      <td className="border border-white/10 px-3 py-2">4th</td>
                      <td className="border border-white/10 px-3 py-2">1.0</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">7th</td>
                      <td className="border border-white/10 px-3 py-2">5.0</td>
                      <td className="border border-white/10 px-3 py-2">6th</td>
                      <td className="border border-white/10 px-3 py-2">0.5</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">9th</td>
                      <td className="border border-white/10 px-3 py-2">1.5</td>
                      <td className="border border-white/10 px-3 py-2">8th-24th</td>
                      <td className="border border-white/10 px-3 py-2">0.5</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">11th</td>
                      <td className="border border-white/10 px-3 py-2">3.5</td>
                      <td className="border border-white/10 px-3 py-2" colSpan={2} rowSpan={3}></td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">13th</td>
                      <td className="border border-white/10 px-3 py-2">3.0</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">15th-25th</td>
                      <td className="border border-white/10 px-3 py-2">0.5-2.0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">G5/4-1 - UK Distribution Code Requirements</p>
              <p className="text-sm text-white mb-2">
                Engineering Recommendation G5/4-1 sets planning levels for harmonic voltage distortion
                and requires assessment of customer installations that may cause network harmonic issues.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Stage 1: Simplified assessment for small non-linear loads</li>
                <li className="pl-1">Stage 2: Harmonic current allocation based on agreed supply capacity</li>
                <li className="pl-1">Stage 3: Detailed assessment for large or complex installations</li>
                <li className="pl-1">DNO approval required for installations exceeding Stage 1 limits</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical application:</strong> Any installation with VSDs totalling &gt;25% of supply capacity, or single VSD &gt;12.5% of supply, triggers G5/4-1 Stage 2 assessment.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 6: Harmonic Assessment */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Harmonic Assessment Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Before connecting significant non-linear loads to the distribution network, a harmonic
              assessment ensures the installation will not cause unacceptable voltage distortion at
              the point of common coupling (PCC).
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">G5/4-1 Assessment Stages</p>
              <div className="space-y-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-1">Stage 1 - Simplified Assessment</p>
                  <ul className="text-sm text-white/90 space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">For installations with non-linear load &lt;25% of supply capacity</li>
                    <li className="pl-1">Assumes standard equipment harmonic spectra</li>
                    <li className="pl-1">No detailed analysis required if within limits</li>
                    <li className="pl-1">Most small commercial installations qualify</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-1">Stage 2 - Detailed Assessment</p>
                  <ul className="text-sm text-white/90 space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Required when Stage 1 limits exceeded</li>
                    <li className="pl-1">Calculate harmonic current emissions from each source</li>
                    <li className="pl-1">Assess voltage distortion at PCC using network impedance</li>
                    <li className="pl-1">May require network data from DNO</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-1">Stage 3 - Comprehensive Study</p>
                  <ul className="text-sm text-white/90 space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">For large, complex, or critical installations</li>
                    <li className="pl-1">Full harmonic power flow analysis</li>
                    <li className="pl-1">Consider resonance risks with power factor correction</li>
                    <li className="pl-1">May require mitigation measures before approval</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Assessment Parameters</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Parameter</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Symbol</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Agreed Supply Capacity</td>
                      <td className="border border-white/10 px-3 py-2">ASC</td>
                      <td className="border border-white/10 px-3 py-2">Maximum import capacity (kVA)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fault Level</td>
                      <td className="border border-white/10 px-3 py-2">Sk</td>
                      <td className="border border-white/10 px-3 py-2">Network strength at PCC (MVA)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Harmonic Impedance</td>
                      <td className="border border-white/10 px-3 py-2">Zh</td>
                      <td className="border border-white/10 px-3 py-2">Network impedance at each harmonic</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Planning Level</td>
                      <td className="border border-white/10 px-3 py-2">PLh</td>
                      <td className="border border-white/10 px-3 py-2">Maximum permitted Vh at PCC</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Voltage distortion calculation:</strong> V<sub>h</sub> = I<sub>h</sub> × Z<sub>h</sub> where I<sub>h</sub> is harmonic current and Z<sub>h</sub> is network impedance at that harmonic frequency.
            </p>
          </div>
        </section>

        {/* Section 7: Harmonic Filters */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Active and Passive Harmonic Filters
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              When harmonic levels exceed acceptable limits, mitigation is required. The two main
              approaches are passive filters (using LC resonant circuits) and active filters
              (using power electronics to inject cancelling currents).
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Passive Filters</p>
                <p className="text-sm text-white mb-2">LC circuits tuned to specific harmonic frequencies:</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Lower cost for single-frequency filtering</li>
                  <li className="pl-1">Provide reactive power compensation</li>
                  <li className="pl-1">Fixed tuning - less effective if harmonics vary</li>
                  <li className="pl-1">Risk of resonance with network impedance</li>
                  <li className="pl-1">May amplify non-tuned harmonics</li>
                  <li className="pl-1">Typical: tuned to 5th (250Hz), 7th (350Hz), 11th (550Hz)</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Active Filters</p>
                <p className="text-sm text-white mb-2">Power electronic devices injecting anti-phase currents:</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Adaptive - responds to changing harmonic content</li>
                  <li className="pl-1">Effective across wide frequency range (2nd-50th)</li>
                  <li className="pl-1">No resonance risk with network</li>
                  <li className="pl-1">Higher initial cost</li>
                  <li className="pl-1">Can provide power factor correction</li>
                  <li className="pl-1">Ideal for variable loads (data centres, manufacturing)</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Filter Selection Guide</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Recommended Solution</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Single large VSD</td>
                      <td className="border border-white/10 px-3 py-2">Passive (5th, 7th tuned)</td>
                      <td className="border border-white/10 px-3 py-2">Predictable spectrum, cost-effective</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Data centre</td>
                      <td className="border border-white/10 px-3 py-2">Active filter</td>
                      <td className="border border-white/10 px-3 py-2">Variable loads, wide harmonic spectrum</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Large HVAC system</td>
                      <td className="border border-white/10 px-3 py-2">Hybrid (passive + active)</td>
                      <td className="border border-white/10 px-3 py-2">Base filtering with adaptive trim</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Commercial building</td>
                      <td className="border border-white/10 px-3 py-2">Active filter at main DB</td>
                      <td className="border border-white/10 px-3 py-2">Diverse loads, changing tenants</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">LED lighting installation</td>
                      <td className="border border-white/10 px-3 py-2">Detuned PFC or passive filter</td>
                      <td className="border border-white/10 px-3 py-2">Significant 3rd harmonic content</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Other Mitigation Techniques</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Multi-pulse rectifiers:</strong> 12-pulse, 18-pulse, or 24-pulse VSDs cancel lower-order harmonics</li>
                <li className="pl-1"><strong>Active front-end (AFE) drives:</strong> Near-sinusoidal input current, THD &lt;5%</li>
                <li className="pl-1"><strong>Line reactors (3-5%):</strong> Reduce harmonic current peaks, limit dI/dt</li>
                <li className="pl-1"><strong>DC bus chokes:</strong> Smooth rectifier output, reduce input current harmonics</li>
                <li className="pl-1"><strong>Phase shifting transformers:</strong> Cancel harmonics between multiple drives</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 8: K-Factor Transformers */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">08</span>
            K-Factor Transformers
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              K-factor transformers are specifically designed to handle harmonic-rich loads without
              excessive heating. The K-factor quantifies the harmonic heating effect relative to a
              linear load of the same RMS current.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">K-Factor Formula</p>
              <p className="font-mono text-center text-lg mb-2">K = Σ(I<sub>h</sub>²×h²) / Σ(I<sub>h</sub>²)</p>
              <p className="text-xs text-white/70 text-center">Where Ih is the per-unit current at harmonic h, and h is the harmonic order</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">K-Factor Ratings and Applications</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">K-Factor</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Applications</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Load Characteristics</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">K-1</td>
                      <td className="border border-white/10 px-3 py-2">Linear loads only</td>
                      <td className="border border-white/10 px-3 py-2">Resistive heating, incandescent lighting</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">K-4</td>
                      <td className="border border-white/10 px-3 py-2">General commercial</td>
                      <td className="border border-white/10 px-3 py-2">Mixed loads, some electronic equipment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">K-9</td>
                      <td className="border border-white/10 px-3 py-2">Office buildings</td>
                      <td className="border border-white/10 px-3 py-2">Significant IT load, LED lighting</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">K-13</td>
                      <td className="border border-white/10 px-3 py-2">Data centres, hospitals</td>
                      <td className="border border-white/10 px-3 py-2">High-density IT, medical equipment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">K-20</td>
                      <td className="border border-white/10 px-3 py-2">Broadcast, severe industrial</td>
                      <td className="border border-white/10 px-3 py-2">SCR drives, very high harmonic content</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">K-30+</td>
                      <td className="border border-white/10 px-3 py-2">Specialist applications</td>
                      <td className="border border-white/10 px-3 py-2">Extreme harmonic environments</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">K-factor transformer design features:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Oversized neutral:</strong> 200% neutral bus for triplen harmonics</li>
                <li className="pl-1"><strong>Lower flux density:</strong> Reduced core losses at harmonic frequencies</li>
                <li className="pl-1"><strong>Multiple parallel conductors:</strong> Minimise skin effect in windings</li>
                <li className="pl-1"><strong>Enhanced cooling:</strong> Larger radiators or forced cooling</li>
                <li className="pl-1"><strong>Electrostatic shields:</strong> Reduce capacitive coupling of high-frequency noise</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Specification tip:</strong> When in doubt, specify K-13 for modern commercial buildings. The additional cost is typically 15-25% above standard transformers but provides essential protection.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 9: Building Services Applications */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">09</span>
            Building Services: Data Centres and VSD Installations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Modern building services installations increasingly feature high concentrations of
              non-linear loads. Data centres and VSD-heavy HVAC systems present particular challenges
              that require careful design consideration.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Data Centre Power Quality Considerations</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>IT load profile:</strong> SMPS draw current in narrow peaks, 70-120% current THD typical</li>
                <li className="pl-1"><strong>UPS systems:</strong> Input rectifiers generate 5th, 7th, 11th harmonics</li>
                <li className="pl-1"><strong>Neutral currents:</strong> May exceed 170% of phase current due to triplen harmonics</li>
                <li className="pl-1"><strong>Transformer selection:</strong> K-13 minimum, consider K-20 for high-density facilities</li>
                <li className="pl-1"><strong>Generator sizing:</strong> Alternator must handle harmonic currents without overheating</li>
                <li className="pl-1"><strong>Cable sizing:</strong> Additional derating for harmonic heating and oversized neutrals</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Data Centre Design Checklist</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm text-white">
                <ul className="space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">K-13 or K-20 transformers</li>
                  <li className="pl-1">200% neutral conductors</li>
                  <li className="pl-1">Active harmonic filters at PDUs</li>
                  <li className="pl-1">True-RMS metering throughout</li>
                </ul>
                <ul className="space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Generator with 2/3 pitch windings</li>
                  <li className="pl-1">Detuned PFC capacitor banks</li>
                  <li className="pl-1">Power quality monitoring system</li>
                  <li className="pl-1">Separate clean earth for IT equipment</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">VSD-Heavy HVAC Installations</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>6-pulse drives:</strong> Produce significant 5th (20-25%) and 7th (11-15%) harmonics</li>
                <li className="pl-1"><strong>Aggregation:</strong> Multiple VSDs on same supply increase total harmonic distortion</li>
                <li className="pl-1"><strong>G5/4-1 assessment:</strong> Usually required for VSD load &gt;25% of supply capacity</li>
                <li className="pl-1"><strong>Mitigation options:</strong> Line reactors, passive filters, multi-pulse drives, AFE drives</li>
                <li className="pl-1"><strong>Motor effects:</strong> Harmonic currents cause additional motor heating, reduce by 5-10% derating</li>
                <li className="pl-1"><strong>Capacitor protection:</strong> PFC capacitors require detuning reactors when VSDs present</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">VSD Harmonic Mitigation Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Solution</th>
                      <th className="border border-white/10 px-3 py-2 text-left">THD Reduction</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Cost Premium</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3% Line reactor</td>
                      <td className="border border-white/10 px-3 py-2">35-40% THD(I)</td>
                      <td className="border border-white/10 px-3 py-2">5-8%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5% DC choke</td>
                      <td className="border border-white/10 px-3 py-2">30-35% THD(I)</td>
                      <td className="border border-white/10 px-3 py-2">8-12%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Passive filter (5th, 7th)</td>
                      <td className="border border-white/10 px-3 py-2">10-15% THD(I)</td>
                      <td className="border border-white/10 px-3 py-2">15-25%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">12-pulse drive</td>
                      <td className="border border-white/10 px-3 py-2">10-12% THD(I)</td>
                      <td className="border border-white/10 px-3 py-2">30-40%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Active front-end (AFE)</td>
                      <td className="border border-white/10 px-3 py-2">&lt;5% THD(I)</td>
                      <td className="border border-white/10 px-3 py-2">50-80%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Economic consideration:</strong> For large installations, the cost of harmonic mitigation at source (AFE drives)
              may be less than the cost of oversized cables, transformers, and central filtering required for standard 6-pulse drives.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Neutral Current Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A three-phase system supplies balanced single-phase non-linear loads. Each phase draws 100A fundamental and 45A third harmonic. Calculate the neutral current.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Fundamental currents: 120° phase shift, cancel in neutral</p>
                <p>I<sub>N(fundamental)</sub> = 0A</p>
                <p className="mt-2">Third harmonic currents: In phase (0°), add directly</p>
                <p>I<sub>N(3rd)</sub> = 3 × 45A = <strong>135A</strong></p>
                <p className="mt-2">Total neutral current = 135A (exceeds 100A phase current!)</p>
                <p className="mt-2 text-white/60">→ Neutral must be sized for 135A minimum</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: THD Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A non-linear load draws the following currents: Fundamental 50A, 3rd harmonic 30A, 5th harmonic 25A, 7th harmonic 10A. Calculate the THD(I) and RMS current.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>THD(I) = √(I<sub>3</sub>² + I<sub>5</sub>² + I<sub>7</sub>²) / I<sub>1</sub> × 100%</p>
                <p className="mt-2">THD(I) = √(30² + 25² + 10²) / 50 × 100%</p>
                <p>THD(I) = √(900 + 625 + 100) / 50 × 100%</p>
                <p>THD(I) = √1625 / 50 × 100% = 40.3 / 50 × 100%</p>
                <p>THD(I) = <strong>80.6%</strong></p>
                <p className="mt-3">RMS current = √(50² + 30² + 25² + 10²)</p>
                <p>RMS current = √(2500 + 900 + 625 + 100) = √4125</p>
                <p>RMS current = <strong>64.2A</strong></p>
                <p className="mt-2 text-white/60">→ Cable must be rated for 64.2A, not 50A</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: K-Factor Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Calculate the K-factor for a load with the following harmonic current spectrum (per unit of fundamental): I1=1.0, I3=0.8, I5=0.6, I7=0.4, I9=0.2.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>K = Σ(I<sub>h</sub>² × h²) / Σ(I<sub>h</sub>²)</p>
                <p className="mt-2">Numerator: (1×1) + (0.8²×9) + (0.6²×25) + (0.4²×49) + (0.2²×81)</p>
                <p>= 1 + 5.76 + 9 + 7.84 + 3.24 = 26.84</p>
                <p className="mt-2">Denominator: 1² + 0.8² + 0.6² + 0.4² + 0.2²</p>
                <p>= 1 + 0.64 + 0.36 + 0.16 + 0.04 = 2.2</p>
                <p className="mt-2">K = 26.84 / 2.2 = <strong>K-12.2</strong></p>
                <p className="mt-2 text-white/60">→ Specify K-13 rated transformer</p>
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
                <li className="pl-1"><strong>Harmonic frequency:</strong> f<sub>h</sub> = h × f<sub>1</sub> (where f<sub>1</sub> = 50Hz)</li>
                <li className="pl-1"><strong>THD:</strong> √(Σh<sub>n</sub>²) / h<sub>1</sub> × 100%</li>
                <li className="pl-1"><strong>RMS current:</strong> √(I<sub>1</sub>² + I<sub>3</sub>² + I<sub>5</sub>² + ...)</li>
                <li className="pl-1"><strong>Neutral current (triplen):</strong> I<sub>N</sub> = 3 × I<sub>3</sub> (balanced loads)</li>
                <li className="pl-1"><strong>Voltage distortion:</strong> V<sub>h</sub> = I<sub>h</sub> × Z<sub>h</sub></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Standards to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>EN 50160:</strong> Voltage THD ≤8% for LV supplies</li>
                <li className="pl-1"><strong>G5/4-1:</strong> UK harmonic assessment for customer connections</li>
                <li className="pl-1"><strong>BS 7671 Table 5.4a:</strong> Neutral sizing for harmonic currents</li>
                <li className="pl-1"><strong>IEEE 519:</strong> Harmonic current limits at PCC</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Equal neutral sizing:</strong> Triplen harmonics require oversized neutrals</li>
                <li className="pl-1"><strong>Using average-reading meters:</strong> Only true-RMS meters are accurate for harmonics</li>
                <li className="pl-1"><strong>Ignoring PFC resonance:</strong> Capacitors can amplify harmonics without detuning</li>
                <li className="pl-1"><strong>Standard transformer selection:</strong> K-factor rating essential for non-linear loads</li>
                <li className="pl-1"><strong>Underestimating cable heating:</strong> Both increased RMS and skin effect matter</li>
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
                <p className="font-medium text-white mb-1">Harmonic Sequences (50Hz base)</p>
                <ul className="space-y-0.5">
                  <li>Positive: 1st, 4th, 7th, 10th, 13th...</li>
                  <li>Negative: 2nd, 5th, 8th, 11th, 14th...</li>
                  <li>Zero (Triplen): 3rd, 6th, 9th, 12th, 15th...</li>
                  <li>6-pulse VSD: Produces 6k±1 harmonics</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Design Guidelines</p>
                <ul className="space-y-0.5">
                  <li>Data centre: K-13 transformer, 200% neutral</li>
                  <li>VSD &gt;25% capacity: G5/4-1 assessment</li>
                  <li>THD voltage limit: 8% (EN 50160)</li>
                  <li>PFC with harmonics: Use detuned reactors</li>
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
            <Link to="../h-n-c-module3-section4-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Earthing and Protective Devices
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section4-8">
              Next: Applications in Building Distribution
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule3Section4_7;
