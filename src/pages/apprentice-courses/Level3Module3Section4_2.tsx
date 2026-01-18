/**
 * Level 3 Module 3 Section 4.2 - Frequency, Period and Amplitude
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Frequency, Period and Amplitude - Level 3 Module 3 Section 4.2";
const DESCRIPTION = "Master the key AC waveform parameters including frequency, period, RMS values, peak values, and their relationships in UK electrical systems.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the period of a 50 Hz waveform?",
    options: [
      "50 seconds",
      "0.5 seconds",
      "0.02 seconds (20 ms)",
      "2 seconds"
    ],
    correctIndex: 2,
    explanation: "Period T = 1/f. For 50 Hz: T = 1/50 = 0.02 seconds = 20 milliseconds. This is the time for one complete cycle of the UK mains supply."
  },
  {
    id: "check-2",
    question: "If the RMS voltage is 230 V, what is the peak voltage?",
    options: [
      "163 V",
      "230 V",
      "325 V",
      "460 V"
    ],
    correctIndex: 2,
    explanation: "Peak voltage Vpeak = Vrms x sqrt(2) = 230 x 1.414 = 325 V. The peak value is always 1.414 times the RMS value for a pure sinusoidal waveform."
  },
  {
    id: "check-3",
    question: "Why is RMS value used rather than peak value for specifying AC quantities?",
    options: [
      "RMS is always larger and therefore safer",
      "RMS provides the equivalent DC heating effect",
      "Peak values cannot be measured accurately",
      "RMS is easier to calculate"
    ],
    correctIndex: 1,
    explanation: "RMS (Root Mean Square) value represents the DC equivalent for power/heating calculations. An RMS voltage of 230 V AC delivers the same power to a resistive load as 230 V DC would."
  },
  {
    id: "check-4",
    question: "What is the average value of a complete sinusoidal AC cycle?",
    options: [
      "Equal to the peak value",
      "Equal to the RMS value",
      "Zero",
      "0.637 times the peak value"
    ],
    correctIndex: 2,
    explanation: "Over a complete cycle, the average value is zero because the positive and negative half-cycles cancel out. The average of a half-cycle is 0.637 x Vpeak, which is used in rectifier calculations."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A motor nameplate states 400 V. What is this value?",
    options: [
      "Peak voltage",
      "Average voltage",
      "RMS voltage",
      "Peak-to-peak voltage"
    ],
    correctAnswer: 2,
    explanation: "Equipment ratings and supply voltages are always specified as RMS values unless otherwise stated. The 400 V rating means the line-to-line RMS voltage for three-phase equipment."
  },
  {
    id: 2,
    question: "Calculate the peak-to-peak voltage for UK single-phase mains supply.",
    options: [
      "230 V",
      "325 V",
      "460 V",
      "650 V"
    ],
    correctAnswer: 3,
    explanation: "Peak-to-peak = 2 x Vpeak = 2 x 325 V = 650 V. This is the total voltage swing from the maximum positive to maximum negative value. The peak voltage is 230 x 1.414 = 325 V."
  },
  {
    id: 3,
    question: "What is the form factor of a pure sinusoidal waveform?",
    options: [
      "1.0",
      "1.11",
      "1.414",
      "0.707"
    ],
    correctAnswer: 1,
    explanation: "Form factor = RMS value / Average value = 0.707 Vpeak / 0.637 Vpeak = 1.11. This ratio is used to convert between RMS and average readings on different meter types."
  },
  {
    id: 4,
    question: "An oscilloscope shows a waveform with a period of 16.67 ms. What is the frequency?",
    options: [
      "50 Hz",
      "60 Hz",
      "100 Hz",
      "166.7 Hz"
    ],
    correctAnswer: 1,
    explanation: "Frequency f = 1/T = 1/0.01667 = 60 Hz. This is the standard frequency for North American power systems, compared to 50 Hz in the UK."
  },
  {
    id: 5,
    question: "What does a true RMS multimeter measure accurately that an average-responding meter cannot?",
    options: [
      "DC voltages",
      "Purely sinusoidal waveforms",
      "Non-sinusoidal or distorted waveforms",
      "Very low frequencies"
    ],
    correctAnswer: 2,
    explanation: "True RMS meters calculate the actual RMS value regardless of waveform shape. Average-responding meters are calibrated for sinusoids and give incorrect readings for distorted waveforms from VFDs, LEDs, and switch-mode power supplies."
  },
  {
    id: 6,
    question: "The crest factor (peak factor) of a waveform is 1.8. If the RMS current is 10 A, what is the peak current?",
    options: [
      "5.56 A",
      "14.14 A",
      "18 A",
      "10 A"
    ],
    correctAnswer: 2,
    explanation: "Crest factor = Peak / RMS. Therefore Peak = Crest factor x RMS = 1.8 x 10 = 18 A. A pure sinusoid has a crest factor of 1.414 (sqrt 2); higher values indicate a more peaked waveform."
  },
  {
    id: 7,
    question: "Which relationship correctly converts peak voltage to RMS for a sinusoid?",
    options: [
      "Vrms = Vpeak x 1.414",
      "Vrms = Vpeak / 1.414",
      "Vrms = Vpeak x 2",
      "Vrms = Vpeak / 2"
    ],
    correctAnswer: 1,
    explanation: "Vrms = Vpeak / sqrt(2) = Vpeak x 0.707 = Vpeak / 1.414. To go from RMS to peak, multiply by 1.414. To go from peak to RMS, divide by 1.414."
  },
  {
    id: 8,
    question: "A heating element rated at 2 kW operates from 230 V RMS. What is the RMS current?",
    options: [
      "6.15 A",
      "8.7 A",
      "12.3 A",
      "4.35 A"
    ],
    correctAnswer: 1,
    explanation: "P = V x I, therefore I = P/V = 2000/230 = 8.7 A RMS. For resistive loads, RMS values can be used directly in power calculations just like DC values."
  },
  {
    id: 9,
    question: "What happens to the frequency if a 4-pole generator previously running at 1500 RPM is slowed to 1200 RPM?",
    options: [
      "Frequency increases to 62.5 Hz",
      "Frequency decreases to 40 Hz",
      "Frequency stays at 50 Hz",
      "Frequency decreases to 25 Hz"
    ],
    correctAnswer: 1,
    explanation: "f = (n x p) / 60 = (1200 x 2) / 60 = 40 Hz. With 4 poles (2 pole pairs), reducing speed from 1500 to 1200 RPM reduces frequency from 50 Hz to 40 Hz proportionally."
  },
  {
    id: 10,
    question: "The amplitude of a voltage waveform is doubled while frequency remains constant. What happens to the period?",
    options: [
      "Period doubles",
      "Period halves",
      "Period remains unchanged",
      "Period becomes zero"
    ],
    correctAnswer: 2,
    explanation: "Period depends only on frequency (T = 1/f). Amplitude and period are independent characteristics of the waveform. Changing amplitude affects peak and RMS values but not timing."
  },
  {
    id: 11,
    question: "In the equation v = 339 sin(377t), what is the approximate frequency?",
    options: [
      "339 Hz",
      "377 Hz",
      "50 Hz",
      "60 Hz"
    ],
    correctAnswer: 3,
    explanation: "The coefficient 377 is omega (angular velocity) = 2 pi f. Therefore f = 377 / (2 x 3.14159) = 60 Hz. This is the North American standard frequency. The 339 V represents the peak voltage."
  },
  {
    id: 12,
    question: "What is the relationship between UK mains frequency tolerance and equipment design?",
    options: [
      "All equipment must work at exactly 50 Hz only",
      "Equipment should operate within +/- 1% (49.5 to 50.5 Hz)",
      "Frequency tolerance is not important for modern equipment",
      "Equipment must work from 45 to 65 Hz"
    ],
    correctAnswer: 1,
    explanation: "The UK grid maintains frequency within +/- 1% under normal conditions. Equipment designed for UK use should operate correctly within this range. Extended operation outside this range can affect motors, clocks, and synchronisation."
  }
];

const faqs = [
  {
    question: "Why do we use RMS values for AC measurements?",
    answer: "RMS (Root Mean Square) values allow direct comparison with DC for power calculations. An AC supply of 230 V RMS delivers exactly the same power to a resistive load as a 230 V DC supply would. This makes circuit design and power calculations straightforward using familiar Ohm's law and power formulas. RMS is calculated as the square root of the mean of the squared values over one cycle."
  },
  {
    question: "What is the difference between a true RMS and an average-responding meter?",
    answer: "Average-responding meters measure the rectified average value and multiply by 1.11 (form factor) to display an equivalent RMS reading. This is only accurate for pure sinusoidal waveforms. True RMS meters calculate the actual RMS value mathematically, giving correct readings regardless of waveform shape. Always use true RMS meters when measuring non-sinusoidal loads like VFDs or LED drivers."
  },
  {
    question: "How does frequency affect electrical equipment?",
    answer: "Frequency affects inductive and capacitive reactance (XL = 2 pi fL, XC = 1/(2 pi fC)), motor speed, transformer performance, and power factor correction capacitor ratings. Motors designed for 50 Hz will run faster at 60 Hz, producing more power but also running hotter. Transformers may saturate at lower frequencies due to increased flux. Capacitors rated for 50 Hz can be used at 60 Hz but not vice versa."
  },
  {
    question: "What is peak factor and why does it matter?",
    answer: "Peak factor (crest factor) is the ratio of peak to RMS value. For a pure sinusoid, it equals sqrt(2) = 1.414. Non-linear loads can have much higher peak factors, meaning high current peaks even with modest RMS values. High peak factors can cause nuisance tripping of MCBs, require larger cable sizes, and cause problems for UPS systems designed for sinusoidal loads."
  },
  {
    question: "How is the average value of AC used in practice?",
    answer: "The average value of a half-cycle (0.637 x Vpeak) is used in rectifier and DC power supply calculations. When AC is rectified to DC, the output before filtering relates to this average value. Full-wave rectification produces an average DC output of 0.9 x Vrms. Understanding average values is essential for designing DC supplies from AC sources."
  },
  {
    question: "Why is the UK mains frequency 50 Hz rather than another value?",
    answer: "The 50 Hz frequency was chosen as a compromise between various factors. Lower frequencies allow more efficient transformers but cause more visible lamp flicker and require larger motors. Higher frequencies cause greater skin effect losses and are harder to generate mechanically. The 50 Hz standard was established in Europe, while North America chose 60 Hz, partly due to different early equipment designs."
  }
];

const Level3Module3Section4_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">

      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module3-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Article Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 3.4.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Frequency, Period and Amplitude
          </h1>
          <p className="text-white/80">
            Understanding RMS, peak values, and time-based AC parameters
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Frequency:</strong> 50 Hz UK standard (cycles/second)</li>
              <li><strong>Period:</strong> 20 ms (time for one cycle)</li>
              <li><strong>RMS:</strong> 230 V (effective/heating value)</li>
              <li><strong>Peak:</strong> 325 V (maximum instantaneous)</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Conversions</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Peak to RMS:</strong> Vrms = Vpeak x 0.707</li>
              <li><strong>RMS to Peak:</strong> Vpeak = Vrms x 1.414</li>
              <li><strong>Period:</strong> T = 1/f seconds</li>
              <li><strong>Average (half):</strong> Vavg = 0.637 x Vpeak</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define and calculate frequency and period",
              "Convert between RMS, peak, and average values",
              "Understand why RMS is used for AC ratings",
              "Calculate power using RMS values",
              "Explain form factor and crest factor",
              "Select appropriate measuring instruments"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Frequency and Period */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Frequency and Period
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Frequency describes how many complete cycles occur per second, measured in Hertz (Hz). The UK mains supply operates at 50 Hz, meaning the voltage completes 50 full cycles every second. Period is the inverse - the time taken to complete one cycle.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key relationships:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Frequency (f):</strong> Number of cycles per second, measured in Hz</li>
                <li><strong>Period (T):</strong> Time for one complete cycle, T = 1/f seconds</li>
                <li><strong>Angular frequency (omega):</strong> omega = 2 pi f radians per second</li>
                <li><strong>UK standard:</strong> f = 50 Hz, T = 20 ms, omega = 314 rad/s</li>
              </ul>
            </div>

            <p>
              The National Grid maintains frequency very precisely, typically within +/- 1% of 50 Hz. Frequency is controlled by matching power generation to demand - if demand exceeds supply, generators slow down and frequency drops; if supply exceeds demand, frequency rises. Large frequency deviations indicate a serious grid imbalance.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical note:</strong> Some equipment like electric clocks and timers use mains frequency as a time reference. If the grid runs slightly fast or slow over a period, the cumulative time error is later corrected by running at a slightly adjusted frequency.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: RMS Values */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            RMS (Root Mean Square) Values
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The RMS value is the most important measure of AC quantities because it represents the equivalent DC value for power calculations. An AC voltage of 230 V RMS delivers exactly the same heating power to a resistive load as 230 V DC would. This is why all equipment ratings use RMS values.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">RMS Definition</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Mathematical:</strong> Square root of mean of squares</li>
                  <li><strong>Physical meaning:</strong> DC equivalent heating effect</li>
                  <li><strong>For sinusoid:</strong> Vrms = Vpeak / sqrt(2)</li>
                  <li><strong>Vrms = 0.707 x Vpeak</strong></li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Why RMS Matters</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Power calculations: P = Vrms x Irms</li>
                  <li>Equipment ratings use RMS</li>
                  <li>Cable sizing based on RMS current</li>
                  <li>Direct comparison with DC values</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Formula derivation:</strong> Erms = sqrt( (1/T) x integral of e squared dt ) over one period. For a sine wave e = Epeak sin(omega t), this integral evaluates to Erms = Epeak / sqrt(2) = 0.707 x Epeak.
            </p>

            <p>
              When you measure voltage with a multimeter or see a rating plate on equipment, the value shown is RMS unless specifically stated otherwise. This standardisation makes calculations and comparisons straightforward.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Peak and Peak-to-Peak Values */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Peak and Peak-to-Peak Values
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The peak value is the maximum instantaneous value reached during a cycle, occurring at 90 degrees and 270 degrees. Peak-to-peak is the total voltage swing from maximum positive to maximum negative - exactly twice the peak value for symmetrical waveforms.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Peak Value</p>
                <p className="text-white/90 text-xs">Vpeak = Vrms x 1.414</p>
                <p className="text-white/90 text-xs">UK: 325 V peak</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Peak-to-Peak</p>
                <p className="text-white/90 text-xs">Vpp = 2 x Vpeak</p>
                <p className="text-white/90 text-xs">UK: 650 V p-p</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Relationship</p>
                <p className="text-white/90 text-xs">Vpp = Vrms x 2.828</p>
                <p className="text-white/90 text-xs">sqrt(2) x 2</p>
              </div>
            </div>

            <p>
              Peak values are critical for insulation design. The insulation must withstand the peak voltage, not just the RMS value. For 230 V RMS mains, the insulation stress is actually 325 V peak - nearly 1.5 times higher. This is why insulation ratings always exceed the RMS operating voltage.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Peak values matter for:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Insulation voltage ratings and dielectric stress</li>
                <li>Semiconductor device voltage ratings (PIV)</li>
                <li>Surge protective device operation</li>
                <li>Magnetic component core saturation</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Average Values and Form Factor */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Average Values and Form Factor
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Over a complete AC cycle, the mathematical average is zero because positive and negative half-cycles cancel. However, the average of a half-cycle (or of the rectified full waveform) is a meaningful quantity used in rectifier circuits and by some measuring instruments.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Average values for a sinusoid:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Full cycle average:</strong> Zero (positive and negative cancel)</li>
                <li><strong>Half-cycle average:</strong> Vavg = 0.637 x Vpeak = 0.9 x Vrms</li>
                <li><strong>Full-wave rectified:</strong> Vavg = 0.637 x Vpeak</li>
                <li><strong>Half-wave rectified:</strong> Vavg = 0.318 x Vpeak</li>
              </ul>
            </div>

            <p>
              The <strong>form factor</strong> is the ratio of RMS to average value. For a pure sinusoid: Form Factor = Vrms / Vavg = 0.707 Vpeak / 0.637 Vpeak = 1.11. This ratio is important because many older meters are "average-responding" - they measure the average and multiply by 1.11 to display an RMS-equivalent reading.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Warning:</strong> Average-responding meters only give correct RMS readings for pure sinusoidal waveforms. With distorted waveforms (containing harmonics), they give incorrect readings. Always use a true RMS meter for non-linear loads.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Measurement Best Practice</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Use true RMS meters for all AC measurements with non-linear loads</li>
                <li>Check the meter's frequency range - some have limited bandwidth</li>
                <li>For distorted waveforms, crest factor rating of meter must exceed waveform crest factor</li>
                <li>Oscilloscopes show actual waveform shape and can measure peak values directly</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Value Conversions Summary</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Vpeak = Vrms x 1.414 (multiply RMS by sqrt 2)</li>
                <li>Vrms = Vpeak x 0.707 (divide peak by sqrt 2)</li>
                <li>Vpp = 2 x Vpeak = Vrms x 2.828</li>
                <li>Vavg (half cycle) = 0.637 x Vpeak = 0.9 x Vrms</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Errors to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Confusing peak and RMS:</strong> Never use peak values in power calculations</li>
                <li><strong>Wrong meter type:</strong> Average-responding meters give wrong readings for non-sinusoidal waveforms</li>
                <li><strong>Ignoring peak values:</strong> Insulation must withstand peak voltage, not RMS</li>
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

        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Sinusoidal Relationships</p>
                <ul className="space-y-0.5">
                  <li>Vrms = 0.707 x Vpeak</li>
                  <li>Vpeak = 1.414 x Vrms</li>
                  <li>Vavg = 0.637 x Vpeak</li>
                  <li>Form factor = 1.11</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">UK Mains Values</p>
                <ul className="space-y-0.5">
                  <li>RMS: 230 V</li>
                  <li>Peak: 325 V</li>
                  <li>Peak-to-peak: 650 V</li>
                  <li>Half-cycle average: 207 V</li>
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
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module3-section4-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: AC Waveforms
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module3-section4-3">
              Next: Phasor Diagrams and Vectors
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module3Section4_2;
