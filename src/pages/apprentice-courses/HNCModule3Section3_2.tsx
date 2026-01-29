import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Frequency, Period and Amplitude Relationships - HNC Module 3 Section 3.2";
const DESCRIPTION = "Master AC waveform time-domain characteristics: frequency, period, angular frequency and amplitude. Essential for UK HNC Building Services with 50Hz supply analysis.";

const quickCheckQuestions = [
  {
    id: "uk-frequency",
    question: "What is the standard UK mains supply frequency?",
    options: ["40Hz", "50Hz", "60Hz", "100Hz"],
    correctIndex: 1,
    explanation: "The UK mains supply operates at 50Hz, meaning the voltage completes 50 full cycles per second. This is standard across Europe, whilst North America uses 60Hz."
  },
  {
    id: "period-calc",
    question: "What is the period of a 50Hz waveform?",
    options: ["0.01s (10ms)", "0.02s (20ms)", "0.05s (50ms)", "0.1s (100ms)"],
    correctIndex: 1,
    explanation: "Period T = 1/f = 1/50 = 0.02 seconds = 20ms. Each complete cycle of the UK mains supply takes 20 milliseconds."
  },
  {
    id: "angular-frequency",
    question: "What is the angular frequency (ω) for a 50Hz supply?",
    options: ["50 rad/s", "100 rad/s", "157 rad/s", "314 rad/s"],
    correctIndex: 3,
    explanation: "Angular frequency ω = 2πf = 2 × π × 50 = 314.16 rad/s ≈ 314 rad/s. This is used in instantaneous value calculations."
  },
  {
    id: "peak-voltage",
    question: "If UK mains is 230V RMS, what is the peak voltage (Vm)?",
    options: ["230V", "325V", "400V", "460V"],
    correctIndex: 1,
    explanation: "Peak voltage Vm = Vrms × √2 = 230 × 1.414 = 325.3V ≈ 325V. Equipment insulation must withstand this peak value."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the relationship between frequency (f) and period (T)?",
    options: [
      "T = f",
      "T = 1/f",
      "T = 2πf",
      "T = f/2"
    ],
    correctAnswer: 1,
    explanation: "Period and frequency are reciprocals: T = 1/f. If frequency is 50Hz, period is 1/50 = 0.02s (20ms). This fundamental relationship is essential for all AC calculations."
  },
  {
    id: 2,
    question: "A motor is designed for 60Hz operation. What is its design period?",
    options: ["10ms", "16.67ms", "20ms", "25ms"],
    correctAnswer: 1,
    explanation: "T = 1/f = 1/60 = 0.01667s = 16.67ms. This is important when considering 50Hz/60Hz equipment compatibility."
  },
  {
    id: 3,
    question: "What does angular frequency (ω) represent?",
    options: [
      "The number of cycles per second",
      "The rate of change of phase angle in radians per second",
      "The peak voltage divided by frequency",
      "The power factor of the circuit"
    ],
    correctAnswer: 1,
    explanation: "Angular frequency ω represents the rate at which the phase angle changes, measured in radians per second. It equals 2πf because one complete cycle equals 2π radians."
  },
  {
    id: 4,
    question: "The instantaneous voltage equation v = Vm sin(ωt) at t = 5ms for 50Hz, 230V RMS supply gives:",
    options: ["0V", "230V", "325V", "162.5V"],
    correctAnswer: 2,
    explanation: "Vm = 230 × √2 = 325V. ω = 314 rad/s. At t = 5ms: v = 325 × sin(314 × 0.005) = 325 × sin(1.57) = 325 × 1 = 325V (peak of sine wave at 90°)"
  },
  {
    id: 5,
    question: "How many complete cycles occur in one second at 50Hz?",
    options: ["25 cycles", "50 cycles", "100 cycles", "314 cycles"],
    correctAnswer: 1,
    explanation: "Frequency directly defines cycles per second: 50Hz means exactly 50 complete cycles per second. This is the fundamental definition of frequency in Hertz."
  },
  {
    id: 6,
    question: "A 60Hz motor operates on UK 50Hz supply. What happens to its speed?",
    options: [
      "Speed increases by 20%",
      "Speed decreases by approximately 17%",
      "Speed remains the same",
      "The motor will not run"
    ],
    correctAnswer: 1,
    explanation: "Motor speed is proportional to frequency. At 50Hz instead of 60Hz: speed ratio = 50/60 = 0.833 (83.3%), so speed decreases by approximately 17%."
  },
  {
    id: 7,
    question: "What is the wavelength of a 50Hz signal in a cable with propagation velocity 2 × 10⁸ m/s?",
    options: ["4,000m", "4,000km", "400m", "40km"],
    correctAnswer: 1,
    explanation: "Wavelength λ = v/f = (2 × 10⁸)/(50) = 4 × 10⁶m = 4,000km. At power frequencies, wavelengths are very long compared to building dimensions."
  },
  {
    id: 8,
    question: "If peak-to-peak voltage is 650V, what is the amplitude (peak value)?",
    options: ["162.5V", "230V", "325V", "460V"],
    correctAnswer: 2,
    explanation: "Amplitude (peak) = peak-to-peak ÷ 2 = 650 ÷ 2 = 325V. The amplitude is measured from zero to positive (or negative) peak."
  },
  {
    id: 9,
    question: "What happens to capacitive reactance (Xc) when frequency increases?",
    options: [
      "Xc increases proportionally",
      "Xc decreases inversely",
      "Xc remains constant",
      "Xc increases with the square of frequency"
    ],
    correctAnswer: 1,
    explanation: "Xc = 1/(2πfC). As frequency increases, capacitive reactance decreases inversely. At higher frequencies, capacitors pass more current."
  },
  {
    id: 10,
    question: "A building in the UK receives equipment designed for 60Hz, 120V. Which issue is most critical?",
    options: [
      "Only the voltage difference",
      "Only the frequency difference",
      "Both voltage and frequency differences affect operation",
      "Neither - equipment is compatible"
    ],
    correctAnswer: 2,
    explanation: "Both differences matter: 230V vs 120V (voltage nearly doubled) and 50Hz vs 60Hz (frequency 17% lower). Motors run slower and may overheat; transformers saturate differently. Equipment requires proper conversion."
  },
  {
    id: 11,
    question: "At what time does v = Vm sin(ωt) first equal zero (after t = 0) for 50Hz?",
    options: ["5ms", "10ms", "15ms", "20ms"],
    correctAnswer: 1,
    explanation: "sin(ωt) = 0 when ωt = π. So t = π/ω = π/314 = 0.01s = 10ms. This is half the period (T/2 = 20ms/2 = 10ms), representing the zero crossing."
  },
  {
    id: 12,
    question: "What is the effect of frequency on inductive reactance (XL)?",
    options: [
      "XL decreases with increasing frequency",
      "XL increases proportionally with frequency",
      "XL is independent of frequency",
      "XL increases with the square of frequency"
    ],
    correctAnswer: 1,
    explanation: "XL = 2πfL. Inductive reactance increases directly with frequency. Motors designed for 50Hz have higher reactance and draw less current at 60Hz."
  }
];

const faqs = [
  {
    question: "Why does the UK use 50Hz while North America uses 60Hz?",
    answer: "Historical development led to different standards. Europe adopted 50Hz partly because it was easier to achieve with early generators (3000 RPM for 2-pole machines). North America chose 60Hz, which provides slightly better motor performance and reduced flicker in incandescent lighting. Both frequencies are practical for power transmission and equipment design."
  },
  {
    question: "Can I use 60Hz equipment in the UK?",
    answer: "It depends on the equipment type. Resistive loads (heaters, incandescent bulbs) only care about voltage, not frequency. However, motors run 17% slower at 50Hz, potentially overheating. Transformers may saturate differently. Electronic equipment with switch-mode power supplies often accepts 50-60Hz automatically. Always check the equipment rating plate for '50/60Hz' compatibility."
  },
  {
    question: "What does 'amplitude' mean in AC circuits?",
    answer: "Amplitude refers to the peak value (Vm or Im) of a sinusoidal waveform, measured from the zero line to the maximum positive or negative excursion. For UK mains at 230V RMS, the amplitude is 230 × √2 = 325V. Insulation and semiconductor ratings must account for peak values, not just RMS."
  },
  {
    question: "Why is angular frequency (ω) used instead of frequency (f)?",
    answer: "Angular frequency (ω = 2πf) simplifies mathematical expressions involving trigonometric functions. Since one complete cycle represents 2π radians, using ω eliminates the need to multiply by 2π repeatedly in calculations. The instantaneous value equation v = Vm sin(ωt) is more elegant than v = Vm sin(2πft)."
  },
  {
    question: "How does frequency affect lighting systems?",
    answer: "At 50Hz, lamps flicker 100 times per second (twice per cycle at zero crossings). This is usually imperceptible but can cause stroboscopic effects with rotating machinery or issues for sensitive individuals. LED drivers and electronic ballasts operate at much higher frequencies (20kHz+) to eliminate visible flicker entirely."
  },
  {
    question: "What practical effect does wavelength have at 50Hz?",
    answer: "At 50Hz, the wavelength in cables is approximately 4,000km - vastly longer than any building installation. This means phase differences along conductors are negligible for building wiring. Wavelength effects only become significant at radio frequencies or in very long transmission lines (100km+)."
  }
];

const HNCModule3Section3_2 = () => {
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
            <span>Module 3.3.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Frequency, Period and Amplitude Relationships
          </h1>
          <p className="text-white/80">
            Time-domain characteristics of AC waveforms essential for building services engineering
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Frequency (f):</strong> Cycles per second in Hertz - UK standard 50Hz</li>
              <li className="pl-1"><strong>Period (T):</strong> Time for one cycle - T = 1/f = 20ms at 50Hz</li>
              <li className="pl-1"><strong>Angular frequency (ω):</strong> 2πf = 314 rad/s at 50Hz</li>
              <li className="pl-1"><strong>Amplitude (Vm):</strong> Peak value = Vrms × √2 = 325V</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>UK 50Hz supply:</strong> All equipment must be rated accordingly</li>
              <li className="pl-1"><strong>Motor speeds:</strong> Synchronous speed depends on frequency</li>
              <li className="pl-1"><strong>Reactive components:</strong> XL and XC vary with frequency</li>
              <li className="pl-1"><strong>Equipment compatibility:</strong> 50Hz vs 60Hz considerations</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define frequency, period and amplitude with correct SI units",
              "Calculate period from frequency using T = 1/f",
              "Apply angular frequency ω = 2πf in instantaneous value equations",
              "Determine peak voltage from RMS using Vm = Vrms × √2",
              "Understand wavelength considerations at power frequencies",
              "Analyse 50Hz vs 60Hz equipment compatibility issues"
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

        {/* Section 1: Frequency */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Frequency - The Foundation of AC Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Frequency (f) defines how many complete cycles an AC waveform completes per second.
              It is the fundamental parameter that determines motor speeds, transformer design,
              and the behaviour of reactive components throughout a building's electrical system.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key facts about frequency:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">1 Hertz (Hz) = 1 cycle per second</li>
                <li className="pl-1">UK mains frequency is 50Hz (±1% under normal conditions)</li>
                <li className="pl-1">Frequency is maintained by National Grid generators synchronised together</li>
                <li className="pl-1">Symbol: f, Unit: Hertz (Hz)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Global Frequency Standards</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Region</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Frequency</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Voltage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Period</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">UK / Europe</td>
                      <td className="border border-white/10 px-3 py-2 font-semibold">50Hz</td>
                      <td className="border border-white/10 px-3 py-2">230V</td>
                      <td className="border border-white/10 px-3 py-2">20ms</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">North America</td>
                      <td className="border border-white/10 px-3 py-2">60Hz</td>
                      <td className="border border-white/10 px-3 py-2">120V</td>
                      <td className="border border-white/10 px-3 py-2">16.67ms</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Japan (East)</td>
                      <td className="border border-white/10 px-3 py-2">50Hz</td>
                      <td className="border border-white/10 px-3 py-2">100V</td>
                      <td className="border border-white/10 px-3 py-2">20ms</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Japan (West)</td>
                      <td className="border border-white/10 px-3 py-2">60Hz</td>
                      <td className="border border-white/10 px-3 py-2">100V</td>
                      <td className="border border-white/10 px-3 py-2">16.67ms</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Australia</td>
                      <td className="border border-white/10 px-3 py-2">50Hz</td>
                      <td className="border border-white/10 px-3 py-2">230V</td>
                      <td className="border border-white/10 px-3 py-2">20ms</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> UK frequency of 50Hz means the voltage crosses zero 100 times per second (twice per cycle) - this affects lighting flicker calculations.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Period and the T = 1/f Relationship */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Period - Time for One Complete Cycle
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Period (T) is the time taken for one complete cycle of the waveform. It has a
              simple but fundamental reciprocal relationship with frequency: as frequency
              increases, the period decreases proportionally.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Fundamental Relationship</p>
              <p className="font-mono text-center text-xl mb-2">T = 1/f &nbsp;&nbsp;&nbsp; and &nbsp;&nbsp;&nbsp; f = 1/T</p>
              <p className="text-xs text-white/70 text-center">Where T is in seconds and f is in Hertz</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">UK 50Hz Supply</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Period T = 1/50 = <strong>0.02s = 20ms</strong></li>
                  <li className="pl-1">Each cycle takes 20 milliseconds</li>
                  <li className="pl-1">Positive half-cycle: 10ms</li>
                  <li className="pl-1">Negative half-cycle: 10ms</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">60Hz System (Reference)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Period T = 1/60 = <strong>0.0167s = 16.67ms</strong></li>
                  <li className="pl-1">Each cycle takes 16.67 milliseconds</li>
                  <li className="pl-1">Positive half-cycle: 8.33ms</li>
                  <li className="pl-1">Negative half-cycle: 8.33ms</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Angular Frequency (ω)</p>
              <p className="mb-3">
                Angular frequency expresses how fast the phase angle changes, measured in radians per second.
                Since one complete cycle equals 2π radians:
              </p>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="font-mono text-center text-lg mb-2">ω = 2πf = 2π/T</p>
                <p className="text-xs text-white/70 text-center">For UK 50Hz: ω = 2 × π × 50 = <strong>314.16 rad/s ≈ 314 rad/s</strong></p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Exam tip:</strong> Remember ω = 314 rad/s for UK 50Hz. For 60Hz systems, ω = 377 rad/s.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Amplitude and Peak Values */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Amplitude and Instantaneous Values
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Amplitude refers to the maximum value (peak) of the waveform. In AC circuits,
              we typically work with RMS values, but understanding peak values is essential
              for insulation ratings, semiconductor selection, and transient analysis.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key amplitude relationships:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Peak value:</strong> Vm = Vrms × √2 = Vrms × 1.414</li>
                <li className="pl-1"><strong>Peak-to-peak:</strong> Vp-p = 2 × Vm = 2.828 × Vrms</li>
                <li className="pl-1"><strong>UK mains:</strong> Vm = 230 × 1.414 = <strong>325V peak</strong></li>
                <li className="pl-1"><strong>Peak-to-peak:</strong> Vp-p = 2 × 325 = <strong>650V</strong></li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Instantaneous Value Equation</p>
              <p className="font-mono text-center text-lg mb-2">v = V<sub>m</sub> sin(ωt)</p>
              <p className="text-xs text-white/70 text-center mb-3">Where v is instantaneous voltage, Vm is peak voltage, ω is angular frequency, t is time</p>
              <p className="font-mono text-center text-base">For UK mains: v = 325 sin(314t) volts</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Instantaneous Values at Key Points (50Hz)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Time (ms)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Angle (°)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">sin(ωt)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Voltage (V)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">0</td>
                      <td className="border border-white/10 px-3 py-2">0°</td>
                      <td className="border border-white/10 px-3 py-2">0</td>
                      <td className="border border-white/10 px-3 py-2">0V</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2.5</td>
                      <td className="border border-white/10 px-3 py-2">45°</td>
                      <td className="border border-white/10 px-3 py-2">0.707</td>
                      <td className="border border-white/10 px-3 py-2">230V</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5</td>
                      <td className="border border-white/10 px-3 py-2">90°</td>
                      <td className="border border-white/10 px-3 py-2">1.000</td>
                      <td className="border border-white/10 px-3 py-2 font-semibold">325V (peak)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">10</td>
                      <td className="border border-white/10 px-3 py-2">180°</td>
                      <td className="border border-white/10 px-3 py-2">0</td>
                      <td className="border border-white/10 px-3 py-2">0V</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">15</td>
                      <td className="border border-white/10 px-3 py-2">270°</td>
                      <td className="border border-white/10 px-3 py-2">-1.000</td>
                      <td className="border border-white/10 px-3 py-2 font-semibold">-325V (neg peak)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">20</td>
                      <td className="border border-white/10 px-3 py-2">360°</td>
                      <td className="border border-white/10 px-3 py-2">0</td>
                      <td className="border border-white/10 px-3 py-2">0V (cycle complete)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical note:</strong> The instantaneous voltage equals the RMS value (230V) at 45° and 135° - these are the points where sin(ωt) = 0.707 = 1/√2.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 4: Frequency Effects on Components and Equipment */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Frequency Effects on Reactive Components and Equipment
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Frequency directly affects how inductors and capacitors behave in AC circuits.
              This has major implications for motor operation, power factor correction,
              and equipment compatibility in building services installations.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Reactance Equations</p>
              <div className="grid sm:grid-cols-2 gap-4 text-center">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-elec-yellow mb-1">X<sub>L</sub> = 2πfL = ωL</p>
                  <p className="text-white/70 text-xs">Inductive reactance increases with f</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-elec-yellow mb-1">X<sub>C</sub> = 1/(2πfC) = 1/(ωC)</p>
                  <p className="text-white/70 text-xs">Capacitive reactance decreases with f</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Effect of Frequency on Building Services Equipment</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Equipment</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Effect of Lower Frequency (50Hz vs 60Hz)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Practical Consideration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Induction motors</td>
                      <td className="border border-white/10 px-3 py-2">Speed reduced by 17%</td>
                      <td className="border border-white/10 px-3 py-2">Fan/pump output reduced; may overheat</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Transformers</td>
                      <td className="border border-white/10 px-3 py-2">Core flux increases; may saturate</td>
                      <td className="border border-white/10 px-3 py-2">Increased heating and losses</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Capacitor banks</td>
                      <td className="border border-white/10 px-3 py-2">Higher Xc, less reactive current</td>
                      <td className="border border-white/10 px-3 py-2">PFC effectiveness reduced</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fluorescent ballasts</td>
                      <td className="border border-white/10 px-3 py-2">Different operating point</td>
                      <td className="border border-white/10 px-3 py-2">May not start or run correctly</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Electronic loads</td>
                      <td className="border border-white/10 px-3 py-2">SMPS usually 50-60Hz tolerant</td>
                      <td className="border border-white/10 px-3 py-2">Check equipment rating plate</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Motor Synchronous Speed</p>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="font-mono text-center text-lg mb-2">n<sub>s</sub> = (120 × f) / p</p>
                <p className="text-xs text-white/70 text-center">Where ns is synchronous speed (RPM), f is frequency (Hz), p is number of poles</p>
              </div>
              <div className="mt-4 overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Poles</th>
                      <th className="border border-white/10 px-3 py-2 text-left">50Hz Speed (RPM)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">60Hz Speed (RPM)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2</td>
                      <td className="border border-white/10 px-3 py-2">3000</td>
                      <td className="border border-white/10 px-3 py-2">3600</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4</td>
                      <td className="border border-white/10 px-3 py-2">1500</td>
                      <td className="border border-white/10 px-3 py-2">1800</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">6</td>
                      <td className="border border-white/10 px-3 py-2">1000</td>
                      <td className="border border-white/10 px-3 py-2">1200</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">8</td>
                      <td className="border border-white/10 px-3 py-2">750</td>
                      <td className="border border-white/10 px-3 py-2">900</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Wavelength note:</strong> At 50Hz with typical cable propagation velocity (~2×10⁸ m/s), wavelength λ = v/f ≈ 4,000km. This is vastly longer than building installations, so transmission line effects are negligible.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Instantaneous Voltage Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Calculate the instantaneous voltage of UK mains supply at t = 3ms after a positive zero crossing.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Given: Vrms = 230V, f = 50Hz, t = 3ms = 0.003s</p>
                <p className="mt-2">Step 1: Calculate peak voltage</p>
                <p>Vm = Vrms × √2 = 230 × 1.414 = <strong>325V</strong></p>
                <p className="mt-2">Step 2: Calculate angular frequency</p>
                <p>ω = 2πf = 2 × π × 50 = <strong>314 rad/s</strong></p>
                <p className="mt-2">Step 3: Calculate instantaneous voltage</p>
                <p>v = Vm sin(ωt) = 325 × sin(314 × 0.003)</p>
                <p>v = 325 × sin(0.942 rad) = 325 × sin(54°)</p>
                <p>v = 325 × 0.809 = <strong>263V</strong></p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Motor Speed at Different Frequencies</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 4-pole motor designed for 60Hz is connected to UK 50Hz supply. Calculate the speed change.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Synchronous speed formula: ns = (120 × f) / p</p>
                <p className="mt-2">At 60Hz (design frequency):</p>
                <p>ns = (120 × 60) / 4 = <strong>1800 RPM</strong></p>
                <p className="mt-2">At 50Hz (UK supply):</p>
                <p>ns = (120 × 50) / 4 = <strong>1500 RPM</strong></p>
                <p className="mt-2">Speed reduction:</p>
                <p>Change = (1800 - 1500) / 1800 × 100 = <strong>16.7% slower</strong></p>
                <p className="mt-2 text-orange-400">⚠ Motor will run slower and may overheat if mechanically loaded</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Reactance Change with Frequency</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 100µF capacitor is used for power factor correction. Calculate its reactance at 50Hz and 60Hz.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Capacitive reactance: Xc = 1 / (2πfC)</p>
                <p className="mt-2">At 50Hz:</p>
                <p>Xc = 1 / (2 × π × 50 × 100×10⁻⁶)</p>
                <p>Xc = 1 / 0.0314 = <strong>31.8Ω</strong></p>
                <p className="mt-2">At 60Hz:</p>
                <p>Xc = 1 / (2 × π × 60 × 100×10⁻⁶)</p>
                <p>Xc = 1 / 0.0377 = <strong>26.5Ω</strong></p>
                <p className="mt-2 text-white/60">→ Lower Xc at higher frequency means more reactive current flows</p>
                <p className="text-white/60">→ Capacitor provides more VAr at 60Hz than at 50Hz</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 4: Time to Reach Peak Voltage</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Starting from zero crossing, how long until UK mains reaches its positive peak?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Peak occurs when sin(ωt) = 1, i.e., ωt = π/2 (90°)</p>
                <p className="mt-2">Solving for t:</p>
                <p>t = (π/2) / ω = (π/2) / 314</p>
                <p>t = 1.571 / 314 = 0.005s = <strong>5ms</strong></p>
                <p className="mt-2 text-white/60">Verification: Peak is at T/4 = 20ms/4 = 5ms ✓</p>
                <p className="mt-2 text-green-400">✓ One quarter cycle from zero to positive peak</p>
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
                <li className="pl-1"><strong>T = 1/f</strong> — Period-frequency relationship</li>
                <li className="pl-1"><strong>ω = 2πf</strong> — Angular frequency (UK 50Hz: ω = 314 rad/s)</li>
                <li className="pl-1"><strong>v = Vm sin(ωt)</strong> — Instantaneous voltage</li>
                <li className="pl-1"><strong>Vm = Vrms × √2</strong> — Peak from RMS (UK: 325V peak)</li>
                <li className="pl-1"><strong>ns = (120f)/p</strong> — Motor synchronous speed</li>
                <li className="pl-1"><strong>XL = 2πfL</strong> — Inductive reactance</li>
                <li className="pl-1"><strong>XC = 1/(2πfC)</strong> — Capacitive reactance</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">UK frequency: <strong>50Hz</strong></li>
                <li className="pl-1">UK period: <strong>20ms</strong></li>
                <li className="pl-1">Angular frequency (50Hz): <strong>ω = 314 rad/s</strong></li>
                <li className="pl-1">UK peak voltage: <strong>325V</strong> (from 230V RMS)</li>
                <li className="pl-1">√2 = <strong>1.414</strong></li>
                <li className="pl-1">2π = <strong>6.283</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">50Hz vs 60Hz Equipment Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Motors:</strong> Will run 17% slower at 50Hz - check cooling and torque requirements</li>
                <li className="pl-1"><strong>Transformers:</strong> May overheat at lower frequency - verify VA rating</li>
                <li className="pl-1"><strong>Electronic equipment:</strong> Check for "50/60Hz" or "50-60Hz" rating</li>
                <li className="pl-1"><strong>Timers/clocks:</strong> Mains-synchronised clocks run slow at 50Hz</li>
                <li className="pl-1"><strong>Capacitors:</strong> Deliver less VAr at 50Hz than 60Hz</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Using degrees instead of radians</strong> — Ensure calculator is in correct mode for sin(ωt)</li>
                <li className="pl-1"><strong>Confusing peak and RMS</strong> — Always clarify which value is given/required</li>
                <li className="pl-1"><strong>Wrong ω value</strong> — Remember ω = 314 rad/s for 50Hz, not 50</li>
                <li className="pl-1"><strong>Forgetting frequency affects reactance</strong> — XL and XC change with frequency</li>
                <li className="pl-1"><strong>Assuming equipment is frequency-agnostic</strong> — Always check rating plates</li>
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
                <p className="font-medium text-white mb-1">Fundamental Relationships</p>
                <ul className="space-y-0.5">
                  <li>Frequency f (Hz) = cycles per second</li>
                  <li>Period T (s) = 1/f = time per cycle</li>
                  <li>Angular frequency ω = 2πf rad/s</li>
                  <li>Amplitude Vm = Vrms × √2</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">UK 50Hz Values</p>
                <ul className="space-y-0.5">
                  <li>Period: T = 20ms</li>
                  <li>Angular frequency: ω = 314 rad/s</li>
                  <li>Peak voltage: 325V (from 230V RMS)</li>
                  <li>2-pole motor speed: 3000 RPM</li>
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
            <Link to="../h-n-c-module3-section3-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: AC Waveform Characteristics
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section3-3">
              Next: Phase Difference and Vectors
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule3Section3_2;
