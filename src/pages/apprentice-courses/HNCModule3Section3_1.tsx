import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "AC Waveform Characteristics (RMS, Average, Peak Values) - HNC Module 3 Section 3.1";
const DESCRIPTION = "Understand sinusoidal AC waveforms for building services: RMS values, peak voltages, form factor and crest factor. UK supply analysis with practical multimeter applications.";

const quickCheckQuestions = [
  {
    id: "uk-peak-voltage",
    question: "What is the peak voltage of the UK 230V RMS supply?",
    options: ["230V", "253V", "325V", "400V"],
    correctIndex: 2,
    explanation: "UK supply is 230V RMS. Peak voltage = 230 x sqrt(2) = 230 x 1.414 = 325V. This is the maximum instantaneous voltage reached during each cycle."
  },
  {
    id: "rms-conversion",
    question: "What is the RMS value of a sinusoidal waveform with a peak value of 100V?",
    options: ["50V", "63.7V", "70.7V", "100V"],
    correctIndex: 2,
    explanation: "RMS = Peak x 0.707 (or Peak / sqrt(2)). Therefore: 100V x 0.707 = 70.7V RMS. This is the equivalent DC voltage that would produce the same heating effect."
  },
  {
    id: "form-factor",
    question: "What is the form factor of a pure sinusoidal waveform?",
    options: ["0.707", "1.0", "1.11", "1.414"],
    correctIndex: 2,
    explanation: "Form factor = RMS value / Average value = 0.707 / 0.637 = 1.11 for a pure sine wave. This ratio is used to verify waveform quality."
  },
  {
    id: "why-rms",
    question: "Why are AC voltages quoted as RMS values rather than peak values?",
    options: [
      "RMS values are easier to measure",
      "RMS gives the equivalent DC heating effect",
      "Peak values are too high",
      "RMS is required by regulations"
    ],
    correctIndex: 1,
    explanation: "RMS (Root Mean Square) represents the equivalent DC value that would produce the same power dissipation in a resistive load. This makes power calculations straightforward: P = V squared / R works directly with RMS values."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What does RMS stand for?",
    options: [
      "Resistance Measurement Standard",
      "Root Mean Square",
      "Regulated Mains Supply",
      "Rate of Maximum Swing"
    ],
    correctAnswer: 1,
    explanation: "RMS stands for Root Mean Square. It is calculated by taking the square root of the mean (average) of the squared values of the waveform over one complete cycle."
  },
  {
    id: 2,
    question: "A sinusoidal voltage has a peak value of 339V. What is its RMS value?",
    options: ["169.5V", "216V", "240V", "339V"],
    correctAnswer: 2,
    explanation: "RMS = Peak x 0.707 = 339 x 0.707 = 239.7V which is approximately 240V. This is approximately the historic UK supply voltage before harmonisation."
  },
  {
    id: 3,
    question: "What is the relationship between peak-to-peak voltage and peak voltage for a sinusoid?",
    options: [
      "Peak-to-peak = Peak x sqrt(2)",
      "Peak-to-peak = Peak x 2",
      "Peak-to-peak = Peak / 2",
      "Peak-to-peak = Peak x 1.414"
    ],
    correctAnswer: 1,
    explanation: "Peak-to-peak voltage is exactly twice the peak voltage, as it measures from the negative peak to the positive peak. For UK mains: Vp-p = 325V x 2 = 650V."
  },
  {
    id: 4,
    question: "The average value of a sinusoidal waveform over a complete cycle is:",
    options: ["0.637 x Peak", "0.707 x Peak", "Zero", "Equal to RMS"],
    correctAnswer: 2,
    explanation: "Over a complete cycle, a sinusoid is symmetrical about zero, so positive and negative half-cycles cancel out. The average over one complete cycle is zero. The 0.637 factor applies to half-cycle average only."
  },
  {
    id: 5,
    question: "A true RMS multimeter measures 230V on a distorted waveform. An average-responding meter reads 245V. What does this indicate?",
    options: [
      "The meters are faulty",
      "The waveform has significant harmonic distortion",
      "The voltage is fluctuating",
      "Normal measurement variation"
    ],
    correctAnswer: 1,
    explanation: "Average-responding meters are calibrated for pure sinusoids (form factor 1.11). Distorted waveforms have different form factors, causing discrepancies. True RMS meters measure actual heating effect regardless of waveform shape."
  },
  {
    id: 6,
    question: "What is the crest factor of a pure sinusoidal waveform?",
    options: ["0.707", "1.11", "1.414", "2.0"],
    correctAnswer: 2,
    explanation: "Crest factor = Peak / RMS = 1 / 0.707 = 1.414 (which equals sqrt(2)) for a pure sine wave. Higher crest factors indicate peakier waveforms."
  },
  {
    id: 7,
    question: "An oscilloscope displays a 50Hz sinusoidal waveform. How many complete cycles appear in 40ms?",
    options: ["1 cycle", "2 cycles", "4 cycles", "20 cycles"],
    correctAnswer: 1,
    explanation: "Period T = 1/f = 1/50 = 20ms per cycle. In 40ms: 40/20 = 2 complete cycles will be displayed."
  },
  {
    id: 8,
    question: "Why might equipment insulation be rated for 400V even when operating on 230V RMS?",
    options: [
      "To allow for future voltage increases",
      "To withstand the 325V peak voltage with safety margin",
      "Because 400V is the three-phase voltage",
      "BS 7671 requirement"
    ],
    correctAnswer: 1,
    explanation: "Insulation must withstand peak voltage (325V) plus a safety margin for transients. Rating at 400V provides adequate clearance for the 325V peaks plus overvoltage conditions."
  },
  {
    id: 9,
    question: "Calculate the average value over a half-cycle for a waveform with Vpeak = 325V.",
    options: ["163V", "207V", "230V", "325V"],
    correctAnswer: 1,
    explanation: "Half-cycle average = 0.637 x Peak = 0.637 x 325 = 207V. This value is used in rectifier calculations but not for power calculations."
  },
  {
    id: 10,
    question: "A building services engineer measures 400V between phases in a three-phase system. What is the peak line voltage?",
    options: ["283V", "400V", "566V", "693V"],
    correctAnswer: 2,
    explanation: "Peak = RMS x sqrt(2) = 400 x 1.414 = 566V. This is the maximum instantaneous voltage between any two phases."
  },
  {
    id: 11,
    question: "Which meter type is essential for accurate measurement of variable speed drive output voltages?",
    options: [
      "Moving coil meter",
      "Average-responding digital meter",
      "True RMS meter",
      "Peak-reading meter"
    ],
    correctAnswer: 2,
    explanation: "VSDs produce non-sinusoidal PWM outputs. True RMS meters calculate actual heating effect regardless of waveform, giving accurate readings. Average-responding meters assume sinusoidal waveforms and give incorrect results."
  },
  {
    id: 12,
    question: "The UK supply frequency is 50Hz. What is the angular frequency (omega)?",
    options: ["50 rad/s", "100 pi rad/s", "314 rad/s", "628 rad/s"],
    correctAnswer: 2,
    explanation: "Angular frequency omega = 2 x pi x f = 2 x pi x 50 = 314 rad/s (or 100 pi rad/s, both answers represent the same value)."
  }
];

const faqs = [
  {
    question: "Why is UK mains voltage quoted as 230V when the actual voltage is often higher?",
    answer: "The UK harmonised with European standards to 230V +10%/-6% (216V to 253V). Historically UK used 240V, so most supplies still run at the upper end of tolerance (around 240V actual). The 230V nominal is a standards compromise that allowed both UK and continental European equipment to be compatible."
  },
  {
    question: "Do I need a true RMS meter for building services work?",
    answer: "For most standard installations with sinusoidal supplies, average-responding meters calibrated for RMS are adequate. However, true RMS meters are essential when measuring circuits with harmonic distortion (LED drivers, VFDs, electronic loads) or non-sinusoidal waveforms. Modern building services increasingly require true RMS capability."
  },
  {
    question: "Why does my oscilloscope show 325V peaks but my meter reads 230V?",
    answer: "Both readings are correct. Oscilloscopes display instantaneous voltage including peak values. Meters display RMS values (230V), which is the equivalent DC value for power calculations. The relationship is: Peak = RMS x sqrt(2) = 230 x 1.414 = 325V."
  },
  {
    question: "How do harmonics affect RMS readings?",
    answer: "Harmonics increase the true RMS value compared to the fundamental alone. If a 230V fundamental has 10% third harmonic, the true RMS is sqrt(230 squared + 23 squared) = 231.1V. This is why true RMS meters are important for distorted waveforms - average-responding meters would read incorrectly."
  },
  {
    question: "What is the difference between form factor and crest factor?",
    answer: "Form factor = RMS/Average (1.11 for sine wave) indicates waveform 'shape' relative to a sine wave. Crest factor = Peak/RMS (1.414 for sine wave) indicates how 'peaky' the waveform is. Both equal their sine wave values for undistorted supplies; deviations indicate harmonic content or waveform distortion."
  }
];

const HNCModule3Section3_1 = () => {
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
            <span>Module 3.3.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            AC Waveform Characteristics
          </h1>
          <p className="text-white/80">
            RMS, average and peak values - understanding the sinusoidal waveforms that power building services
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Peak (Vm):</strong> Maximum instantaneous value = 325V for UK mains</li>
              <li className="pl-1"><strong>RMS:</strong> 0.707 x Peak - equivalent DC heating effect</li>
              <li className="pl-1"><strong>Average:</strong> 0.637 x Peak - over half-cycle only</li>
              <li className="pl-1"><strong>UK supply:</strong> 230V RMS = 325V peak = 650V peak-to-peak</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Meter readings:</strong> All standard meters display RMS</li>
              <li className="pl-1"><strong>Insulation rating:</strong> Must withstand peak voltage</li>
              <li className="pl-1"><strong>Power calculations:</strong> Use RMS values directly</li>
              <li className="pl-1"><strong>Harmonics:</strong> Affect RMS/average relationship</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Describe sinusoidal AC waveform generation and characteristics",
              "Calculate peak, RMS and average values and convert between them",
              "Explain why RMS values are used for power calculations",
              "Apply form factor and crest factor to verify waveform quality",
              "Relate UK supply voltages to peak and RMS values",
              "Select appropriate meters for different measurement applications"
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

        {/* Section 1: Sinusoidal AC Waveforms */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Sinusoidal AC Waveforms - Generation and Characteristics
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Alternating current (AC) is generated when a conductor rotates through a magnetic field,
              producing a voltage that varies sinusoidally with time. This is the fundamental principle
              behind all power station generators and forms the basis of UK electricity supply.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key characteristics of sinusoidal waveforms:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Voltage varies smoothly between positive and negative peak values</li>
                <li className="pl-1">One complete cycle takes 20ms at 50Hz (UK frequency)</li>
                <li className="pl-1">Instantaneous voltage: v = Vm sin(omega t) where omega = 2 pi f</li>
                <li className="pl-1">Waveform repeats indefinitely with constant frequency</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Sinusoidal Equation</p>
              <p className="font-mono text-center text-lg mb-2">v = V<sub>m</sub> sin(omega t) = V<sub>m</sub> sin(2 pi f t)</p>
              <div className="grid grid-cols-2 gap-2 text-xs text-white/70 mt-3">
                <div><strong>v</strong> = instantaneous voltage (V)</div>
                <div><strong>Vm</strong> = peak voltage (V)</div>
                <div><strong>omega</strong> = angular frequency (rad/s)</div>
                <div><strong>f</strong> = frequency (Hz)</div>
                <div><strong>t</strong> = time (seconds)</div>
                <div><strong>2 pi f</strong> = 314 rad/s at 50Hz</div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">AC Waveform Terminology</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Term</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Symbol</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cycle</td>
                      <td className="border border-white/10 px-3 py-2">-</td>
                      <td className="border border-white/10 px-3 py-2">One complete positive and negative alternation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Period</td>
                      <td className="border border-white/10 px-3 py-2">T</td>
                      <td className="border border-white/10 px-3 py-2">Time for one cycle: T = 1/f = 20ms at 50Hz</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Frequency</td>
                      <td className="border border-white/10 px-3 py-2">f</td>
                      <td className="border border-white/10 px-3 py-2">Cycles per second: 50Hz in UK</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Angular frequency</td>
                      <td className="border border-white/10 px-3 py-2">omega</td>
                      <td className="border border-white/10 px-3 py-2">Radians per second: omega = 2 pi f = 314 rad/s</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Amplitude</td>
                      <td className="border border-white/10 px-3 py-2">Vm, Im</td>
                      <td className="border border-white/10 px-3 py-2">Maximum value (peak) from zero</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> The sinusoidal waveform is the 'purest' AC waveform. Any other periodic waveform can be represented as a combination of sinusoids at different frequencies (harmonics).
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Peak and RMS Values */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Peak and RMS Values
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The peak value (Vm or Im) is the maximum instantaneous value reached by the waveform.
              The RMS value is the effective value that produces the same heating effect as an
              equivalent DC supply - this is why AC voltages and currents are always quoted as RMS values.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fundamental Relationships (Sinusoidal Only)</p>
              <div className="grid sm:grid-cols-2 gap-3 text-center text-sm">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-elec-yellow mb-1">V<sub>RMS</sub> = V<sub>peak</sub> / sqrt(2)</p>
                  <p className="text-white/70 text-xs">= 0.707 x V<sub>peak</sub></p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-elec-yellow mb-1">V<sub>peak</sub> = V<sub>RMS</sub> x sqrt(2)</p>
                  <p className="text-white/70 text-xs">= 1.414 x V<sub>RMS</sub></p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Why RMS is used for power calculations:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">RMS gives the equivalent DC heating effect in a resistor</li>
                <li className="pl-1">Power formula P = V squared / R works directly with RMS values</li>
                <li className="pl-1">A 230V RMS AC supply delivers the same power as 230V DC to a resistor</li>
                <li className="pl-1">All standard electrical equipment is rated in RMS values</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">UK Supply Voltage Values</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Value Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Single-Phase</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Three-Phase (Line)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">RMS (nominal)</td>
                      <td className="border border-white/10 px-3 py-2">230V</td>
                      <td className="border border-white/10 px-3 py-2">400V</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Peak</td>
                      <td className="border border-white/10 px-3 py-2">325V</td>
                      <td className="border border-white/10 px-3 py-2">566V</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Peak-to-peak</td>
                      <td className="border border-white/10 px-3 py-2">650V</td>
                      <td className="border border-white/10 px-3 py-2">1131V</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Half-cycle average</td>
                      <td className="border border-white/10 px-3 py-2">207V</td>
                      <td className="border border-white/10 px-3 py-2">358V</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Mathematical Definition of RMS</p>
              <p className="font-mono text-center text-base mb-2">V<sub>RMS</sub> = sqrt(1/T integral from 0 to T of v squared dt)</p>
              <p className="text-xs text-white/70 text-center">For a sine wave, this evaluates to V<sub>peak</sub>/sqrt(2) = 0.707 x V<sub>peak</sub></p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> 230V RMS means the supply voltage varies between +325V and -325V, but delivers the same power as 230V DC would to a resistive load.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Average Value, Form Factor and Crest Factor */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Average Value, Form Factor and Crest Factor
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The average value over a complete cycle of a symmetrical AC waveform is zero (positive
              and negative halves cancel). However, the half-cycle average is meaningful and used in
              rectifier calculations. Form factor and crest factor characterise waveform shape.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Average Value (Half-Cycle)</p>
              <div className="p-3 rounded bg-white/5 text-center">
                <p className="font-bold text-elec-yellow mb-1">V<sub>avg</sub> = 0.637 x V<sub>peak</sub> = (2/pi) x V<sub>peak</sub></p>
                <p className="text-white/70 text-xs">Only applies to half-cycle (rectified) waveforms</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Form Factor</p>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-elec-yellow mb-2">Form Factor = RMS / Average</p>
                  <ul className="text-xs text-white/70 space-y-1">
                    <li>Pure sine wave: 0.707/0.637 = <strong>1.11</strong></li>
                    <li>Square wave: 1.0</li>
                    <li>Triangular wave: 1.15</li>
                    <li>Values not equal to 1.11 indicate non-sinusoidal</li>
                  </ul>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Crest Factor</p>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-elec-yellow mb-2">Crest Factor = Peak / RMS</p>
                  <ul className="text-xs text-white/70 space-y-1">
                    <li>Pure sine wave: 1/0.707 = <strong>1.414</strong> (sqrt(2))</li>
                    <li>Square wave: 1.0</li>
                    <li>High crest factor = 'peaky' waveform</li>
                    <li>Important for surge protection</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Waveform Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Waveform</th>
                      <th className="border border-white/10 px-3 py-2 text-left">RMS/Peak</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Form Factor</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Crest Factor</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Sine wave</td>
                      <td className="border border-white/10 px-3 py-2">0.707</td>
                      <td className="border border-white/10 px-3 py-2">1.11</td>
                      <td className="border border-white/10 px-3 py-2">1.414</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Square wave</td>
                      <td className="border border-white/10 px-3 py-2">1.0</td>
                      <td className="border border-white/10 px-3 py-2">1.0</td>
                      <td className="border border-white/10 px-3 py-2">1.0</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Triangle wave</td>
                      <td className="border border-white/10 px-3 py-2">0.577</td>
                      <td className="border border-white/10 px-3 py-2">1.15</td>
                      <td className="border border-white/10 px-3 py-2">1.73</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Distorted sine</td>
                      <td className="border border-white/10 px-3 py-2">Varies</td>
                      <td className="border border-white/10 px-3 py-2">Not 1.11</td>
                      <td className="border border-white/10 px-3 py-2">Greater than 1.414</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical application:</strong> Comparing true RMS and average-responding meter readings can reveal waveform distortion. If they differ significantly, harmonics are present.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Practical Applications in Building Services */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Practical Applications in Building Services
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding AC waveform characteristics is essential for correct equipment selection,
              meter interpretation, and troubleshooting in modern building services where non-linear
              loads increasingly distort supply waveforms.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Meter Types and Applications</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Meter Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">How It Works</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Best For</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Average-responding (scaled)</td>
                      <td className="border border-white/10 px-3 py-2">Measures average, scales by 1.11</td>
                      <td className="border border-white/10 px-3 py-2">Pure sinusoidal supplies</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">True RMS</td>
                      <td className="border border-white/10 px-3 py-2">Calculates actual RMS mathematically</td>
                      <td className="border border-white/10 px-3 py-2">Any waveform, VSDs, LEDs</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Peak-reading</td>
                      <td className="border border-white/10 px-3 py-2">Captures maximum value</td>
                      <td className="border border-white/10 px-3 py-2">Transient detection, surges</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Moving coil (analogue)</td>
                      <td className="border border-white/10 px-3 py-2">Responds to average DC value</td>
                      <td className="border border-white/10 px-3 py-2">DC only (needs rectifier for AC)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Services Considerations</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>LED lighting:</strong> Switch-mode drivers draw non-sinusoidal current - true RMS meters essential</li>
                <li className="pl-1"><strong>Variable speed drives:</strong> PWM outputs are not sinusoidal - average-responding meters give wrong readings</li>
                <li className="pl-1"><strong>Insulation testing:</strong> Test voltages must consider peak values (500V DC test is comparable to 354V AC RMS)</li>
                <li className="pl-1"><strong>Harmonic surveys:</strong> Form factor deviation from 1.11 indicates harmonic content</li>
                <li className="pl-1"><strong>Supply quality:</strong> Crest factor greater than 1.5 suggests voltage distortion issues</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Energy Meter Operation</p>
              <p className="text-sm text-white/90 mb-2">
                Building energy meters measure real power (kW) and energy (kWh) using voltage and current transformers.
                They sample instantaneous v and i, multiply them, and integrate over time to give true energy consumption
                regardless of waveform distortion.
              </p>
              <p className="text-xs text-white/70">
                Modern meters also measure kVA (apparent power), kVAr (reactive power), power factor, and total harmonic distortion (THD).
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Insulation and Voltage Ratings</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Equipment insulation must withstand <strong>peak voltage</strong>, not just RMS</li>
                <li className="pl-1">230V RMS system has 325V peaks - insulation needs safety margin above this</li>
                <li className="pl-1">400V rated insulation provides adequate margin for 230V RMS systems</li>
                <li className="pl-1">Transient overvoltages can reach 2-3 times normal peak during switching</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Design tip:</strong> When specifying equipment for buildings with significant LED or VSD loads, always use true RMS instruments for measurements and consider harmonic filters if THD exceeds 5%.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: UK Supply Values</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Calculate all voltage values for the UK 230V supply.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Given: V<sub>RMS</sub> = 230V</p>
                <p className="mt-2">Peak voltage:</p>
                <p>V<sub>peak</sub> = V<sub>RMS</sub> x sqrt(2) = 230 x 1.414 = <strong>325V</strong></p>
                <p className="mt-2">Peak-to-peak voltage:</p>
                <p>V<sub>p-p</sub> = 2 x V<sub>peak</sub> = 2 x 325 = <strong>650V</strong></p>
                <p className="mt-2">Half-cycle average:</p>
                <p>V<sub>avg</sub> = 0.637 x V<sub>peak</sub> = 0.637 x 325 = <strong>207V</strong></p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Finding Peak from RMS Current</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A circuit draws 13A RMS. What is the peak current and what current capacity must the cable withstand?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Peak current:</p>
                <p>I<sub>peak</sub> = I<sub>RMS</sub> x sqrt(2) = 13 x 1.414 = <strong>18.4A</strong></p>
                <p className="mt-2">Cable selection:</p>
                <p>Cable rated for 13A RMS (continuous rating)</p>
                <p>Thermal effects based on I squared R use RMS value</p>
                <p>Peak current is brief and does not cause additional heating</p>
                <p className="mt-2 text-white/60">Select cable based on 13A RMS, not peak</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Form Factor Verification</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A true RMS meter reads 228V while an average-responding meter reads 243V on the same circuit. What does this indicate?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Average-responding meter assumes form factor 1.11</p>
                <p>If pure sine: both meters should read same value</p>
                <p className="mt-2">Actual form factor:</p>
                <p>Measured average = 243 / 1.11 = 219V (what meter actually sensed)</p>
                <p>Actual form factor = True RMS / Average = 228 / 219 = <strong>1.04</strong></p>
                <p className="mt-2">Conclusion:</p>
                <p className="text-white/60">Form factor less than 1.11 indicates flat-topped waveform</p>
                <p className="text-white/60">Likely cause: harmonic distortion from non-linear loads</p>
                <p className="text-white/60">Investigation needed if THD exceeds 5%</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 4: Three-Phase Peak Voltages</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Calculate peak voltages for a 400V three-phase supply.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Line voltage (phase-to-phase):</p>
                <p>V<sub>L(RMS)</sub> = 400V</p>
                <p>V<sub>L(peak)</sub> = 400 x 1.414 = <strong>566V</strong></p>
                <p className="mt-2">Phase voltage (phase-to-neutral):</p>
                <p>V<sub>P(RMS)</sub> = 400 / sqrt(3) = 231V</p>
                <p>V<sub>P(peak)</sub> = 231 x 1.414 = <strong>327V</strong></p>
                <p className="mt-2 text-white/60">Three-phase equipment must withstand 566V peaks between lines</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 5: Power Calculation Using RMS</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 46 ohm heating element is connected to 230V RMS. Calculate the power dissipation.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Using P = V squared / R with RMS values directly:</p>
                <p>P = (230) squared / 46 = 52900 / 46 = <strong>1150W</strong></p>
                <p className="mt-2">Verification using peak values would require integration:</p>
                <p>P = (1/T) integral of v squared / R dt = V<sub>RMS</sub> squared / R</p>
                <p className="mt-2 text-green-400">RMS values allow direct use of DC power formulas</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Essential Conversion Factors (Sine Wave)</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>RMS = Peak x 0.707</strong> (or Peak / sqrt(2))</li>
                <li className="pl-1"><strong>Peak = RMS x 1.414</strong> (or RMS x sqrt(2))</li>
                <li className="pl-1"><strong>Average = Peak x 0.637</strong> (half-cycle only)</li>
                <li className="pl-1"><strong>Peak-to-peak = Peak x 2</strong></li>
                <li className="pl-1"><strong>Form factor = 1.11</strong> (RMS/Average)</li>
                <li className="pl-1"><strong>Crest factor = 1.414</strong> (Peak/RMS)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key UK Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Single-phase: <strong>230V RMS = 325V peak</strong></li>
                <li className="pl-1">Three-phase line: <strong>400V RMS = 566V peak</strong></li>
                <li className="pl-1">Three-phase phase: <strong>230V RMS = 325V peak</strong></li>
                <li className="pl-1">Frequency: <strong>50Hz</strong> (T = 20ms)</li>
                <li className="pl-1">Angular frequency: <strong>omega = 314 rad/s</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When to Use True RMS Meters</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Measuring VSD/inverter output voltages or currents</li>
                <li className="pl-1">Circuits supplying LED lighting loads</li>
                <li className="pl-1">Any circuit with electronic/switch-mode equipment</li>
                <li className="pl-1">Power quality investigations</li>
                <li className="pl-1">When form factor differs from 1.11</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Using peak for power:</strong> P = V x I uses RMS, not peak values</li>
                <li className="pl-1"><strong>Confusing average types:</strong> Full-cycle average is zero; half-cycle average is 0.637 x peak</li>
                <li className="pl-1"><strong>Wrong meter choice:</strong> Average-responding meters give errors on distorted waveforms</li>
                <li className="pl-1"><strong>Ignoring peaks for insulation:</strong> Insulation must withstand peak voltage, not RMS</li>
                <li className="pl-1"><strong>Assuming sine wave:</strong> Modern loads distort waveforms - verify with true RMS</li>
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
                <p className="font-medium text-white mb-1">Sinusoidal Relationships</p>
                <ul className="space-y-0.5">
                  <li>RMS = 0.707 x Peak (Peak/sqrt(2))</li>
                  <li>Peak = 1.414 x RMS (RMS x sqrt(2))</li>
                  <li>Average = 0.637 x Peak (half-cycle)</li>
                  <li>Form factor = 1.11 (RMS/Avg)</li>
                  <li>Crest factor = 1.414 (Peak/RMS)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">UK Supply Values</p>
                <ul className="space-y-0.5">
                  <li>Single-phase: 230V RMS, 325V peak</li>
                  <li>Three-phase line: 400V RMS, 566V peak</li>
                  <li>Frequency: 50Hz, Period: 20ms</li>
                  <li>omega = 2 pi f = 314 rad/s</li>
                  <li>Tolerance: +10%/-6% (216V-253V)</li>
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
            <Link to="../h-n-c-module3-section2-7">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Section 2.7
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section3-2">
              Next: Section 3.2
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule3Section3_1;
