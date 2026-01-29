import { ArrowLeft, Volume2, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Sound Fundamentals - HNC Module 2 Section 4.4";
const DESCRIPTION = "Understanding frequency, wavelength, decibels, sound pressure levels, dB addition, and inverse square law for building services acoustics.";

const quickCheckQuestions = [
  {
    id: "db-scale",
    question: "Why is the decibel scale logarithmic rather than linear?",
    options: [
      "It makes calculations simpler",
      "Sound pressure levels vary over a huge range (1:10 million)",
      "It matches digital audio formats",
      "It was invented before calculators"
    ],
    correctIndex: 1,
    explanation: "Human hearing responds to sound pressures from 20 μPa to 200 Pa - a range of 10 million:1. The logarithmic dB scale compresses this to a manageable 0-140 dB range."
  },
  {
    id: "frequency-range",
    question: "What is the approximate frequency range of human hearing?",
    options: ["2 Hz to 200 Hz", "20 Hz to 20,000 Hz", "200 Hz to 2,000 Hz", "2,000 Hz to 200,000 Hz"],
    correctIndex: 1,
    explanation: "Human hearing typically ranges from 20 Hz (very low bass) to 20,000 Hz (very high treble). This range decreases with age, particularly at high frequencies."
  },
  {
    id: "db-addition",
    question: "If two identical sound sources each produce 60 dB, what is the combined level?",
    options: ["60 dB", "63 dB", "90 dB", "120 dB"],
    correctIndex: 1,
    explanation: "Doubling sound power adds 3 dB. Two identical sources (60 + 60 dB) = 63 dB, not 120 dB. Decibels add logarithmically, not arithmetically."
  },
  {
    id: "inverse-square",
    question: "According to the inverse square law, if you double your distance from a point source, the sound level:",
    options: ["Decreases by 3 dB", "Decreases by 6 dB", "Decreases by 10 dB", "Halves"],
    correctIndex: 1,
    explanation: "The inverse square law states sound intensity drops as 1/r². Doubling distance quarters intensity, which equals a 6 dB reduction (10 log 0.25 = -6 dB)."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is sound?",
    options: [
      "Electromagnetic radiation at audio frequencies",
      "Mechanical pressure waves travelling through a medium",
      "Electrical signals in the audible range",
      "Vibration of the human ear drum"
    ],
    correctAnswer: 1,
    explanation: "Sound is a mechanical pressure wave that requires a medium (air, water, solids) to propagate. It cannot travel through a vacuum unlike electromagnetic radiation."
  },
  {
    id: 2,
    question: "What is the speed of sound in air at 20°C?",
    options: ["140 m/s", "343 m/s", "1500 m/s", "3000 m/s"],
    correctAnswer: 1,
    explanation: "Sound travels at approximately 343 m/s in air at 20°C. Speed increases with temperature (roughly 0.6 m/s per °C) and varies significantly in other media (1500 m/s in water, 5000 m/s in steel)."
  },
  {
    id: 3,
    question: "Calculate the wavelength of a 500 Hz tone in air (c = 340 m/s).",
    options: ["0.34 m", "0.68 m", "1.47 m", "170 m"],
    correctAnswer: 1,
    explanation: "Using λ = c/f: wavelength = 340/500 = 0.68 m. Low frequencies have long wavelengths (difficult to block), high frequencies have short wavelengths (easier to attenuate)."
  },
  {
    id: 4,
    question: "What is the reference sound pressure for 0 dB SPL?",
    options: ["1 Pa", "20 Pa", "20 μPa", "1 μPa"],
    correctAnswer: 2,
    explanation: "0 dB SPL is referenced to 20 μPa (20 × 10⁻⁶ Pa), which is approximately the threshold of human hearing at 1 kHz. This is an extremely small pressure."
  },
  {
    id: 5,
    question: "Convert a sound pressure level of 94 dB to Pascals, given that 94 dB = 1 Pa.",
    options: ["0.002 Pa", "0.02 Pa", "1 Pa", "2 Pa"],
    correctAnswer: 2,
    explanation: "94 dB SPL corresponds to exactly 1 Pascal sound pressure. This is a useful reference point: SPL = 20 log(p/20μPa), so 20 log(1/0.00002) = 20 log(50000) = 94 dB."
  },
  {
    id: 6,
    question: "Three machines produce 70 dB, 73 dB, and 75 dB respectively. What is the approximate combined level?",
    options: ["72.5 dB", "75 dB", "77 dB", "218 dB"],
    correctAnswer: 2,
    explanation: "Add logarithmically: start with highest (75 dB), add 73 dB (+1.8 dB) = 76.8, add 70 dB (+1.0 dB) ≈ 77.8 dB. The combined level is dominated by the loudest sources."
  },
  {
    id: 7,
    question: "What does the dB(A) weighting represent?",
    options: [
      "Peak sound level",
      "Average sound level",
      "Frequency weighting matching human ear sensitivity",
      "The maximum allowable exposure"
    ],
    correctAnswer: 2,
    explanation: "A-weighting adjusts measured levels to match the frequency response of human hearing, which is less sensitive to low and very high frequencies. dB(A) is standard for environmental noise."
  },
  {
    id: 8,
    question: "A sound source produces 80 dB at 1m. What level would you expect at 4m in a free field?",
    options: ["74 dB", "72 dB", "68 dB", "60 dB"],
    correctAnswer: 2,
    explanation: "Using the inverse square law: doubling distance reduces level by 6 dB. 1m→2m = 74 dB, 2m→4m = 68 dB. Each doubling of distance gives another 6 dB reduction."
  },
  {
    id: 9,
    question: "What is the relationship between sound power level (Lw) and sound pressure level (Lp)?",
    options: [
      "They are identical",
      "Lp depends on distance from source; Lw does not",
      "Lw depends on distance from source; Lp does not",
      "Both depend equally on distance"
    ],
    correctAnswer: 1,
    explanation: "Sound power level (Lw) is a property of the source - it doesn't change with distance. Sound pressure level (Lp) is what we measure at a point - it reduces with distance from the source."
  },
  {
    id: 10,
    question: "What is a typical background noise level for an open plan office?",
    options: ["25-30 dB(A)", "35-40 dB(A)", "45-50 dB(A)", "55-60 dB(A)"],
    correctAnswer: 2,
    explanation: "CIBSE Guide A recommends 45-50 dB(A) for open plan offices. This provides speech privacy and masks distracting noises while still allowing communication."
  },
  {
    id: 11,
    question: "What is the sound intensity at 2m from a 1W omnidirectional point source in a free field?",
    options: ["0.02 W/m²", "0.04 W/m²", "0.08 W/m²", "0.25 W/m²"],
    correctAnswer: 0,
    explanation: "I = W / (4πr²) = 1 / (4π × 4) = 1 / 50.3 ≈ 0.02 W/m². Sound intensity follows the inverse square law for point sources."
  },
  {
    id: 12,
    question: "Why are low frequency sounds (bass) harder to control in buildings?",
    options: [
      "They carry more energy",
      "They have long wavelengths relative to construction thicknesses",
      "They are louder",
      "They travel faster"
    ],
    correctAnswer: 1,
    explanation: "Low frequencies have long wavelengths (e.g., 100 Hz = 3.4m). Barriers and absorbers need to be comparable to the wavelength to be effective, making low frequency control challenging."
  }
];

const faqs = [
  {
    question: "What is the difference between dB, dB(A), and dB(C)?",
    answer: "dB (or dB(Lin)) applies no frequency weighting - it's the raw measurement. dB(A) applies A-weighting which matches human ear sensitivity and is standard for environmental noise assessment. dB(C) has flatter weighting and is used for peak measurements and assessing low frequency content. Most building services specifications use dB(A) for general noise and NR (Noise Rating) curves for detailed analysis."
  },
  {
    question: "How do I add decibel values from multiple sources?",
    answer: "Never add dB values arithmetically (60+60≠120). For two equal sources, add 3 dB. For unequal sources, use: L_total = 10 log(10^(L1/10) + 10^(L2/10) + ...). Quick method: if difference is 0-1 dB add 3, 2-3 dB add 2, 4-9 dB add 1, 10+ dB add 0. The total is dominated by the loudest source - a 50 dB source adds nothing significant to an 80 dB source."
  },
  {
    question: "Does the inverse square law always apply?",
    answer: "The inverse square law (6 dB per doubling of distance) applies for point sources in free field conditions. In practice, rooms have reflections which maintain sound levels, and real sources aren't perfect point sources. Line sources (roads, pipes) follow a 3 dB per doubling rule. Inside buildings, reverberation means sound doesn't decay as quickly as inverse square would predict."
  },
  {
    question: "What sound levels are dangerous to hearing?",
    answer: "Exposure limits (Control of Noise at Work Regulations): Lower action value 80 dB(A) daily average (provide hearing protection), Upper action value 85 dB(A) (mandatory protection), Peak action value 137 dB(C). Building services plant rooms commonly exceed these levels - access should be limited and hearing protection required. 90+ dB(A) can cause permanent hearing damage with prolonged exposure."
  },
  {
    question: "Why do we measure in octave bands?",
    answer: "Octave bands divide the frequency spectrum into manageable segments for analysis. Standard centre frequencies are 63, 125, 250, 500, 1000, 2000, 4000, 8000 Hz. This allows us to characterise noise spectra (is it predominantly low or high frequency?) and select appropriate control measures. One-third octave bands provide finer detail when needed."
  },
  {
    question: "How does temperature affect sound?",
    answer: "Sound speed increases with temperature (approximately 0.6 m/s per °C in air). At 20°C, c ≈ 343 m/s. This affects wavelength (λ = c/f) and can cause refraction outdoors where temperature varies with height. Hot plant rooms have slightly different acoustic behaviour than calculations at standard conditions might suggest, though the effect is usually small."
  }
];

const HNCModule2Section4_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module2-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Volume2 className="h-4 w-4" />
            <span>Module 2.4.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Sound Fundamentals
          </h1>
          <p className="text-white/80">
            Frequency, wavelength, decibels, and the physics of sound for building services acoustics
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Sound:</strong> Pressure waves in air (~343 m/s)</li>
              <li className="pl-1"><strong>Frequency:</strong> 20 Hz - 20 kHz (audible)</li>
              <li className="pl-1"><strong>Decibel:</strong> Logarithmic scale (0-140 dB)</li>
              <li className="pl-1"><strong>Inverse square:</strong> -6 dB per doubling distance</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Plant noise:</strong> Typically 70-95 dB(A)</li>
              <li className="pl-1"><strong>Office target:</strong> 35-45 dB(A)</li>
              <li className="pl-1"><strong>Ductwork:</strong> Breakout and regenerated noise</li>
              <li className="pl-1"><strong>Standards:</strong> dB(A) and NR curves</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define sound as mechanical wave motion with frequency and wavelength",
              "Explain the decibel scale and calculate sound pressure levels",
              "Add decibel values from multiple sources correctly",
              "Apply the inverse square law to sound propagation",
              "Understand A-weighting and its significance",
              "Relate frequency to wavelength using c = fλ"
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

        {/* Section 1: What is Sound */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What is Sound?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Sound is a mechanical wave - a travelling disturbance in pressure, density, and particle velocity that
              propagates through an elastic medium. Unlike light, sound requires a medium (air, water, solids) and
              cannot travel through a vacuum.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key properties of sound:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Frequency (f):</strong> Cycles per second, measured in Hertz (Hz)</li>
                <li className="pl-1"><strong>Wavelength (λ):</strong> Distance between wave peaks, in metres</li>
                <li className="pl-1"><strong>Speed (c):</strong> Propagation velocity, ~343 m/s in air at 20°C</li>
                <li className="pl-1"><strong>Amplitude:</strong> Magnitude of pressure variation (relates to loudness)</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Wave Equation</p>
              <p className="font-mono text-center text-lg mb-2">c = f × λ</p>
              <div className="text-xs text-white/70 text-center mt-2">
                Speed (m/s) = Frequency (Hz) × Wavelength (m)
              </div>
              <p className="text-xs text-white/70 text-center mt-2">
                Rearranged: λ = c/f (wavelength = 343/frequency in air)
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Speed of Sound in Different Media</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Medium</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Speed (m/s)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Air (20°C)</td>
                      <td className="border border-white/10 px-3 py-2">343</td>
                      <td className="border border-white/10 px-3 py-2">Standard reference</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Water</td>
                      <td className="border border-white/10 px-3 py-2">1480</td>
                      <td className="border border-white/10 px-3 py-2">Plumbing noise transmission</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Concrete</td>
                      <td className="border border-white/10 px-3 py-2">3400</td>
                      <td className="border border-white/10 px-3 py-2">Structure-borne sound</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Steel</td>
                      <td className="border border-white/10 px-3 py-2">5100</td>
                      <td className="border border-white/10 px-3 py-2">Pipe and duct transmission</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Building services:</strong> Structure-borne sound (through building fabric) travels much faster than airborne sound, which is why vibration isolation is critical for plant.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 2: Frequency and Wavelength */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Frequency, Wavelength, and Human Hearing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Frequency determines the pitch we hear - low frequencies sound bass, high frequencies sound treble.
              The human ear can typically detect frequencies from 20 Hz to 20,000 Hz, though this range decreases
              with age.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Frequency Ranges and Wavelengths</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Frequency</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Wavelength</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Example Source</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">20 Hz</td>
                      <td className="border border-white/10 px-3 py-2">17.2 m</td>
                      <td className="border border-white/10 px-3 py-2">Lowest audible</td>
                      <td className="border border-white/10 px-3 py-2">Large transformers</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">100 Hz</td>
                      <td className="border border-white/10 px-3 py-2">3.4 m</td>
                      <td className="border border-white/10 px-3 py-2">Low bass</td>
                      <td className="border border-white/10 px-3 py-2">Fan hum, motors</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">500 Hz</td>
                      <td className="border border-white/10 px-3 py-2">0.69 m</td>
                      <td className="border border-white/10 px-3 py-2">Mid-range</td>
                      <td className="border border-white/10 px-3 py-2">Speech fundamentals</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1000 Hz</td>
                      <td className="border border-white/10 px-3 py-2">0.34 m</td>
                      <td className="border border-white/10 px-3 py-2">Mid-range (reference)</td>
                      <td className="border border-white/10 px-3 py-2">Standard test tone</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4000 Hz</td>
                      <td className="border border-white/10 px-3 py-2">0.086 m</td>
                      <td className="border border-white/10 px-3 py-2">High (speech clarity)</td>
                      <td className="border border-white/10 px-3 py-2">Consonant sounds</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">20000 Hz</td>
                      <td className="border border-white/10 px-3 py-2">0.017 m</td>
                      <td className="border border-white/10 px-3 py-2">Highest audible</td>
                      <td className="border border-white/10 px-3 py-2">Above most adults</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Standard Octave Bands</p>
              <p className="text-sm text-white mb-2">Acoustic analysis uses octave bands with centre frequencies:</p>
              <p className="font-mono text-sm text-center text-elec-yellow">
                31.5 | 63 | 125 | 250 | 500 | 1k | 2k | 4k | 8k | 16k Hz
              </p>
              <p className="text-xs text-white/60 mt-2 text-center">
                Each band covers frequencies from 0.707× to 1.414× the centre frequency
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Why wavelength matters:</strong> Sound control measures (barriers, absorbers) need dimensions comparable to the wavelength. Low frequencies (long λ) are hardest to control.
            </p>
          </div>
        </section>

        {/* Section 3: The Decibel Scale */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            The Decibel Scale
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The decibel (dB) is a logarithmic unit used to express the ratio of a value to a reference value.
              It is used for sound because human perception of loudness is approximately logarithmic, and because
              sound pressures vary over an enormous range.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Sound Pressure Level Formula</p>
              <p className="font-mono text-center text-lg mb-2">L<sub>p</sub> = 20 log₁₀(p / p<sub>ref</sub>) dB</p>
              <div className="text-xs text-white/70 text-center mt-2">
                Where p<sub>ref</sub> = 20 μPa (threshold of hearing at 1 kHz)
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Sound Level Examples</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Level</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Example</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Subjective</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">0 dB</td>
                      <td className="border border-white/10 px-3 py-2">Threshold of hearing</td>
                      <td className="border border-white/10 px-3 py-2">Silence</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">30 dB(A)</td>
                      <td className="border border-white/10 px-3 py-2">Quiet bedroom</td>
                      <td className="border border-white/10 px-3 py-2">Very quiet</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">45 dB(A)</td>
                      <td className="border border-white/10 px-3 py-2">Quiet office</td>
                      <td className="border border-white/10 px-3 py-2">Quiet</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">60 dB(A)</td>
                      <td className="border border-white/10 px-3 py-2">Normal conversation</td>
                      <td className="border border-white/10 px-3 py-2">Moderate</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">70 dB(A)</td>
                      <td className="border border-white/10 px-3 py-2">Busy road</td>
                      <td className="border border-white/10 px-3 py-2">Intrusive</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">85 dB(A)</td>
                      <td className="border border-white/10 px-3 py-2">Plant room</td>
                      <td className="border border-white/10 px-3 py-2">Loud (hearing damage risk)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">100 dB(A)</td>
                      <td className="border border-white/10 px-3 py-2">Pneumatic drill</td>
                      <td className="border border-white/10 px-3 py-2">Very loud</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">140 dB</td>
                      <td className="border border-white/10 px-3 py-2">Threshold of pain</td>
                      <td className="border border-white/10 px-3 py-2">Painful</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key decibel relationships:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>+3 dB:</strong> Double the sound power/intensity</li>
                <li className="pl-1"><strong>+10 dB:</strong> Perceived as roughly twice as loud</li>
                <li className="pl-1"><strong>+20 dB:</strong> Ten times the sound pressure</li>
                <li className="pl-1"><strong>-6 dB:</strong> Half the sound pressure (distance doubling)</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Perception:</strong> A 10 dB change sounds approximately twice or half as loud. A 3 dB change is the smallest difference most people can reliably detect.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 4: dB Addition and Inverse Square Law */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Adding Decibels and the Inverse Square Law
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Because decibels are logarithmic, they cannot be added arithmetically. Two 60 dB sources do not
              make 120 dB. Instead, we must convert to linear values (power or intensity), add, then convert back.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Adding Decibels</p>
              <p className="font-mono text-center text-lg mb-2">L<sub>total</sub> = 10 log₁₀(10<sup>L₁/10</sup> + 10<sup>L₂/10</sup> + ...)</p>
              <div className="mt-3">
                <p className="text-sm text-white/70 mb-2">Quick addition guide (add to higher value):</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-center">
                  <div className="p-2 rounded bg-black/30">
                    <p className="text-elec-yellow font-bold">Diff 0-1 dB</p>
                    <p className="text-white/70">Add 3 dB</p>
                  </div>
                  <div className="p-2 rounded bg-black/30">
                    <p className="text-elec-yellow font-bold">Diff 2-3 dB</p>
                    <p className="text-white/70">Add 2 dB</p>
                  </div>
                  <div className="p-2 rounded bg-black/30">
                    <p className="text-elec-yellow font-bold">Diff 4-9 dB</p>
                    <p className="text-white/70">Add 1 dB</p>
                  </div>
                  <div className="p-2 rounded bg-black/30">
                    <p className="text-elec-yellow font-bold">Diff 10+ dB</p>
                    <p className="text-white/70">Add 0 dB</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Inverse Square Law</p>
              <p className="font-mono text-center text-lg mb-2">L<sub>2</sub> = L<sub>1</sub> - 20 log₁₀(r₂/r₁)</p>
              <p className="text-xs text-white/70 text-center mt-2">
                For point source in free field: each doubling of distance = -6 dB
              </p>
              <div className="mt-3 grid grid-cols-4 gap-2 text-xs text-center">
                <div className="p-2 rounded bg-black/30">
                  <p className="text-white/70">1m</p>
                  <p className="text-elec-yellow font-bold">80 dB</p>
                </div>
                <div className="p-2 rounded bg-black/30">
                  <p className="text-white/70">2m</p>
                  <p className="text-elec-yellow font-bold">74 dB</p>
                </div>
                <div className="p-2 rounded bg-black/30">
                  <p className="text-white/70">4m</p>
                  <p className="text-elec-yellow font-bold">68 dB</p>
                </div>
                <div className="p-2 rounded bg-black/30">
                  <p className="text-white/70">8m</p>
                  <p className="text-elec-yellow font-bold">62 dB</p>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Sound Power vs Pressure</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>L<sub>w</sub> (power):</strong> Source property, constant</li>
                  <li className="pl-1"><strong>L<sub>p</sub> (pressure):</strong> Measured at a point, varies</li>
                  <li className="pl-1">L<sub>p</sub> = L<sub>w</sub> - 10 log(4πr²) for free field</li>
                  <li className="pl-1">Manufacturer data usually gives L<sub>w</sub></li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">A-Weighting</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Adjusts for human ear response</li>
                  <li className="pl-1">Reduces low frequency contribution</li>
                  <li className="pl-1">Standard for environmental noise</li>
                  <li className="pl-1">Expressed as dB(A) or dBA</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>In practice:</strong> Indoor spaces have reflections, so sound doesn't decay purely by inverse square. The reverberant field maintains levels away from sources.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Wavelength Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Calculate the wavelength of fan noise at 250 Hz in air at 20°C.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Using λ = c / f</p>
                <p>λ = 343 / 250</p>
                <p>λ = <strong>1.37 metres</strong></p>
                <p className="mt-2 text-white/60">This long wavelength explains why low frequency noise is hard to attenuate with thin barriers</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Adding Sound Sources</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A plant room has three pumps producing 72 dB(A), 70 dB(A), and 68 dB(A).
                What is the combined sound level?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Method: Start with highest, add others sequentially</p>
                <p>72 + 70 dB: difference = 2, add 2 → <strong>74 dB</strong></p>
                <p>74 + 68 dB: difference = 6, add 1 → <strong>75 dB(A)</strong></p>
                <p className="mt-2">Or precisely: 10 log(10^7.2 + 10^7.0 + 10^6.8)</p>
                <p>= 10 log(15.85×10⁶ + 10×10⁶ + 6.31×10⁶)</p>
                <p>= 10 log(32.16×10⁶) = <strong>75.1 dB(A)</strong></p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Distance Attenuation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A cooling tower produces 85 dB(A) at 5m. What level would be expected at 40m in open conditions?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Using inverse square law:</p>
                <p>L₂ = L₁ - 20 log(r₂/r₁)</p>
                <p>L₂ = 85 - 20 log(40/5)</p>
                <p>L₂ = 85 - 20 log(8)</p>
                <p>L₂ = 85 - 20 × 0.903 = 85 - 18</p>
                <p>L₂ = <strong>67 dB(A)</strong></p>
                <p className="mt-2 text-white/60">Alternative: 5m→10m→20m→40m = 3 doublings = 3×6 = 18 dB reduction</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Formulas</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Wave equation:</strong> c = f × λ (343 m/s in air)</li>
                <li className="pl-1"><strong>SPL:</strong> Lp = 20 log(p/20μPa) dB</li>
                <li className="pl-1"><strong>dB addition:</strong> L = 10 log(Σ10^(Li/10))</li>
                <li className="pl-1"><strong>Distance:</strong> ΔL = -20 log(r₂/r₁) = -6 dB per doubling</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Building Services Targets (CIBSE Guide A)</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Open plan office:</strong> 45-50 dB(A), NR40-45</li>
                <li className="pl-1"><strong>Private office:</strong> 35-40 dB(A), NR35-40</li>
                <li className="pl-1"><strong>Meeting room:</strong> 35-40 dB(A), NR30-35</li>
                <li className="pl-1"><strong>Plant room:</strong> Hearing protection if &gt;85 dB(A)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Adding dB linearly:</strong> 60 + 60 = 63 dB, not 120 dB</li>
                <li className="pl-1"><strong>Forgetting distance:</strong> Manufacturer Lw needs conversion to Lp at distance</li>
                <li className="pl-1"><strong>Ignoring frequency:</strong> Overall dB(A) may mask tonal problems</li>
                <li className="pl-1"><strong>Free field assumption:</strong> Indoor levels don't follow simple inverse square</li>
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
                <p className="font-medium text-white mb-1">Sound Basics</p>
                <ul className="space-y-0.5">
                  <li>Speed in air: 343 m/s (20°C)</li>
                  <li>Audible range: 20 Hz - 20 kHz</li>
                  <li>Reference pressure: 20 μPa</li>
                  <li>+3 dB = double power</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Distance Rules</p>
                <ul className="space-y-0.5">
                  <li>Point source: -6 dB per doubling</li>
                  <li>Line source: -3 dB per doubling</li>
                  <li>Indoor: reverberant field limits decay</li>
                  <li>Use Lw + room acoustics for indoors</li>
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
            <Link to="../h-n-c-module2-section4-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Lamp Types and Efficacy
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module2-section4-5">
              Next: Noise Control Methods
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule2Section4_4;
