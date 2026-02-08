import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Alternating Current Principles - MOET Module 2.2.2";
const DESCRIPTION = "Comprehensive guide to alternating current principles for maintenance technicians: AC generation, sine wave characteristics, peak/RMS/average values, period and frequency (50 Hz UK), phase angle, phasor representation, AC measurement and AC vs DC comparison under BS 7671 and ST1426.";

const quickCheckQuestions = [
  {
    id: "rms-value",
    question: "What is the RMS value of a 230 V AC supply, and why is it significant?",
    options: [
      "230 V is the peak value — the RMS is 162.6 V",
      "230 V IS the RMS value — it represents the equivalent DC heating effect",
      "230 V is the average value — the RMS is higher",
      "RMS and peak values are always the same for AC"
    ],
    correctIndex: 1,
    explanation: "When we state the UK mains supply is '230 V', this IS the RMS (root mean square) value. The RMS value is the equivalent DC voltage that would produce the same heating effect in a resistive load. The actual peak voltage of the 230 V supply is 230 x 1.414 = 325.3 V. All standard AC voltmeters read RMS values."
  },
  {
    id: "frequency-period",
    question: "What is the time period of one complete cycle of the UK 50 Hz mains supply?",
    options: [
      "50 seconds",
      "0.5 seconds",
      "0.02 seconds (20 ms)",
      "0.01 seconds (10 ms)"
    ],
    correctIndex: 2,
    explanation: "The time period T is the reciprocal of frequency: T = 1/f = 1/50 = 0.02 seconds = 20 milliseconds. This means the UK mains completes 50 full cycles every second, with each complete cycle (one positive and one negative half-cycle) taking 20 ms."
  },
  {
    id: "phase-angle",
    question: "Two sinusoidal waveforms of the same frequency are said to be 'in phase' when:",
    options: [
      "They have the same amplitude",
      "They reach their peak values at the same instant in time",
      "They have different frequencies",
      "One is DC and the other is AC"
    ],
    correctIndex: 1,
    explanation: "Two waveforms are 'in phase' when they reach their corresponding peak, zero and trough values at the same instant in time — their phase difference is zero degrees. If they reach their peaks at different times, they have a phase difference measured in degrees, where 360 degrees equals one complete cycle."
  },
  {
    id: "ac-generation",
    question: "In an AC generator (alternator), what determines the frequency of the output?",
    options: [
      "The strength of the magnetic field only",
      "The number of turns on the coil only",
      "The speed of rotation and the number of pole pairs",
      "The resistance of the load connected to it"
    ],
    correctIndex: 2,
    explanation: "The frequency of an alternator's output is determined by: f = (n x p) / 60, where n is the rotational speed in RPM and p is the number of pole pairs. For the UK 50 Hz supply, a two-pole generator must rotate at 3,000 RPM, a four-pole at 1,500 RPM. The magnetic field strength and number of turns affect the voltage, not the frequency."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The UK mains supply has a nominal voltage of 230 V and a frequency of 50 Hz. What is the peak voltage?",
    options: [
      "115 V",
      "230 V",
      "325.3 V",
      "460 V"
    ],
    correctAnswer: 2,
    explanation: "The peak voltage Vpeak = VRMS x √2 = 230 x 1.414 = 325.3 V. The stated 230 V is the RMS value. The voltage actually swings between +325.3 V and -325.3 V, giving a peak-to-peak voltage of 650.6 V. This is important when selecting component voltage ratings — they must withstand the peak, not just the RMS value."
  },
  {
    id: 2,
    question: "Which of the following correctly describes the relationship between RMS, peak and average values for a pure sine wave?",
    options: [
      "VRMS = Vpeak, Vavg = 0.5 x Vpeak",
      "VRMS = 0.707 x Vpeak, Vavg = 0.637 x Vpeak",
      "VRMS = 0.637 x Vpeak, Vavg = 0.707 x Vpeak",
      "VRMS = 0.5 x Vpeak, Vavg = 0.318 x Vpeak"
    ],
    correctAnswer: 1,
    explanation: "For a pure sine wave: VRMS = Vpeak / √2 = 0.707 x Vpeak, and Vavg (over one half-cycle) = (2/π) x Vpeak = 0.637 x Vpeak. The ratio of RMS to average is called the form factor: 0.707/0.637 = 1.11. These relationships only hold true for pure sine waves — distorted waveforms have different ratios."
  },
  {
    id: 3,
    question: "An AC voltage completes one full cycle in 20 milliseconds. What is its frequency?",
    options: [
      "20 Hz",
      "50 Hz",
      "100 Hz",
      "200 Hz"
    ],
    correctAnswer: 1,
    explanation: "Frequency = 1 / period. If the period T = 20 ms = 0.02 s, then f = 1/0.02 = 50 Hz. This is the standard UK mains frequency. The supply completes 50 full cycles every second."
  },
  {
    id: 4,
    question: "A phasor is best described as:",
    options: [
      "A type of power tool used in electrical maintenance",
      "A rotating vector that represents the magnitude and phase angle of a sinusoidal quantity",
      "A device for measuring AC frequency",
      "The physical shape of an alternator rotor"
    ],
    correctAnswer: 1,
    explanation: "A phasor is a rotating vector (arrow) whose length represents the magnitude (RMS or peak value) of a sinusoidal quantity and whose angle represents the phase angle. Phasor diagrams are essential tools for analysing AC circuits containing resistance, inductance and capacitance, where voltages and currents are not in phase with each other."
  },
  {
    id: 5,
    question: "The form factor of a waveform is defined as:",
    options: [
      "Peak value divided by average value",
      "RMS value divided by average value",
      "Average value divided by RMS value",
      "Peak value divided by RMS value"
    ],
    correctAnswer: 1,
    explanation: "The form factor = RMS value / average value. For a pure sine wave, this equals 0.707/0.637 = 1.11. The form factor is important because most AC meters are 'average-responding, RMS-calibrated' — they measure the average value and multiply by 1.11 to display RMS. This only gives correct readings for pure sine waves; distorted waveforms require true-RMS meters."
  },
  {
    id: 6,
    question: "Why is the UK mains frequency standardised at exactly 50 Hz?",
    options: [
      "Because 50 Hz is the safest frequency for the human body",
      "It was an arbitrary choice with no engineering basis",
      "It provides a practical balance between generator size, transformer efficiency and transmission characteristics",
      "Because UK generators can only run at one speed"
    ],
    correctAnswer: 2,
    explanation: "50 Hz was chosen as a practical compromise: lower frequencies require larger generators and transformers, while higher frequencies increase transmission losses and skin effect in conductors. 50 Hz allows reasonably sized equipment while maintaining acceptable efficiency. The US chose 60 Hz for similar reasons but with a slightly different balance — neither is inherently superior."
  },
  {
    id: 7,
    question: "If a voltage and current are 'in phase' in an AC circuit, this means the circuit is:",
    options: [
      "Purely inductive",
      "Purely capacitive",
      "Purely resistive",
      "An open circuit"
    ],
    correctAnswer: 2,
    explanation: "In a purely resistive circuit, voltage and current are in phase — they rise and fall together, reaching their peak values at the same instant. In an inductive circuit, current lags voltage by up to 90 degrees. In a capacitive circuit, current leads voltage by up to 90 degrees. Most practical circuits are a combination, with the phase angle depending on the relative proportions of R, L and C."
  },
  {
    id: 8,
    question: "The angular frequency (omega, ω) of the 50 Hz UK mains supply is:",
    options: [
      "50 rad/s",
      "100π rad/s (approximately 314 rad/s)",
      "50π rad/s (approximately 157 rad/s)",
      "2500 rad/s"
    ],
    correctAnswer: 1,
    explanation: "Angular frequency ω = 2πf = 2π x 50 = 100π ≈ 314.16 rad/s. Angular frequency is used in AC circuit calculations involving reactance and impedance. For example, inductive reactance XL = ωL = 2πfL, and capacitive reactance XC = 1/(ωC) = 1/(2πfC)."
  },
  {
    id: 9,
    question: "A 'true-RMS' meter is essential when measuring:",
    options: [
      "Pure DC voltages",
      "Pure sine wave AC voltages",
      "Non-sinusoidal or distorted AC waveforms",
      "Battery open-circuit voltage"
    ],
    correctAnswer: 2,
    explanation: "Standard AC meters are average-responding instruments calibrated to display RMS for pure sine waves only (using the 1.11 form factor). When measuring non-sinusoidal waveforms (e.g., output of VSDs, thyristor controllers, or supplies with harmonic distortion), they give incorrect readings. A true-RMS meter calculates the actual RMS value regardless of waveform shape — essential for accurate measurement in modern installations."
  },
  {
    id: 10,
    question: "The instantaneous value of a sinusoidal voltage can be expressed as:",
    options: [
      "v = Vpeak x sin(2πft)",
      "v = VRMS x cos(t)",
      "v = Vpeak / frequency",
      "v = Vavg x 2πf"
    ],
    correctAnswer: 0,
    explanation: "The instantaneous voltage at any moment in time is: v = Vpeak x sin(2πft) or equivalently v = Vpeak x sin(ωt), where ω = 2πf. At t = 0, v = 0 (starting from zero crossing). At t = T/4 (quarter cycle), sin = 1, so v = Vpeak. This mathematical description is fundamental to all AC circuit analysis."
  },
  {
    id: 11,
    question: "The peak factor (crest factor) of a waveform is defined as:",
    options: [
      "Average value divided by peak value",
      "RMS value divided by average value",
      "Peak value divided by RMS value",
      "Peak-to-peak value divided by 2"
    ],
    correctAnswer: 2,
    explanation: "The peak factor (crest factor) = Vpeak / VRMS. For a pure sine wave, this equals √2 ≈ 1.414. The crest factor is important when selecting equipment — particularly UPS systems, which must handle the peak current drawn by non-linear loads. Distorted waveforms with sharp peaks have high crest factors and can overload equipment rated for pure sine waves."
  },
  {
    id: 12,
    question: "In electromagnetic induction, Faraday's law states that the induced EMF is proportional to:",
    options: [
      "The strength of the magnetic field only",
      "The speed of the conductor only",
      "The rate of change of magnetic flux linkage",
      "The resistance of the conductor"
    ],
    correctAnswer: 2,
    explanation: "Faraday's law of electromagnetic induction states that the magnitude of the induced EMF is directly proportional to the rate of change of magnetic flux linkage. Mathematically: e = -N x (dΦ/dt), where N is the number of turns and dΦ/dt is the rate of change of flux. This is the fundamental principle underlying all AC generators, transformers and inductors."
  }
];

const faqs = [
  {
    question: "Why do we use RMS values rather than peak values for AC?",
    answer: "RMS (root mean square) values are used because they represent the equivalent DC value that would produce the same heating effect in a resistive load. A 230 V RMS AC supply delivers exactly the same power to a heater as a 230 V DC supply. This makes RMS values directly comparable to DC for power calculations: P = V²/R works equally whether V is DC or AC RMS. All standard AC instruments read RMS, and all equipment ratings and regulations use RMS values."
  },
  {
    question: "What is the difference between the UK nominal voltage of 230 V and the actual supply voltage?",
    answer: "The UK nominal supply voltage is 230 V +10%/-6% (as per the Electricity Safety, Quality and Continuity Regulations 2002). This means the actual voltage can legally vary between 216.2 V and 253 V. In practice, many UK supplies still operate closer to 240 V (the former UK standard) because the harmonised European 230 V standard was achieved by widening the tolerance bands rather than actually changing the voltage."
  },
  {
    question: "Why does a standard multimeter sometimes give inaccurate AC readings?",
    answer: "Standard (average-responding) multimeters measure the average value of the rectified waveform and multiply by 1.11 (the form factor for a pure sine wave) to display an RMS reading. This is only accurate for pure sine waves. If the waveform is distorted by harmonics (common with modern electronic loads, VSDs and LED drivers), the form factor changes and the reading becomes inaccurate — often reading low by 10-40%. A true-RMS meter is required for accurate measurement of distorted waveforms."
  },
  {
    question: "What would happen if the UK supply frequency changed significantly from 50 Hz?",
    answer: "Supply frequency is tightly controlled by National Grid (typically within ±0.5 Hz of 50 Hz). Significant deviations would cause AC motors to run at incorrect speeds, clocks to gain or lose time, transformers to saturate (leading to overheating and increased magnetising current), and protective relay timing to become inaccurate. Frequency stability is a key indicator of the balance between generation and demand on the power system."
  },
  {
    question: "How does the skin effect influence AC conductor sizing?",
    answer: "At AC frequencies, current tends to flow on the surface of a conductor rather than uniformly through its cross-section — this is the skin effect. At 50 Hz, the effect is negligible for conductors below approximately 50 mm² but becomes significant for larger conductors, reducing their effective cross-sectional area and increasing resistance. This is why large AC conductors may need to be derated or replaced with multiple smaller parallel conductors. DC does not suffer from skin effect."
  }
];

const MOETModule2Section2_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module2-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section Overview
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Shield className="h-4 w-4" />
            <span>Module 2.2.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Alternating Current Principles
          </h1>
          <p className="text-white/80">
            Understanding AC generation, waveform characteristics, RMS values and measurement for electrical maintenance
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>AC reverses direction</strong> — 50 times per second in the UK (50 Hz)</li>
              <li className="pl-1"><strong>230 V is RMS</strong> — peak voltage is 325.3 V</li>
              <li className="pl-1"><strong>Sine wave</strong> — the fundamental AC waveform, described by v = Vpeak sin(ωt)</li>
              <li className="pl-1"><strong>Phase angle</strong> — voltage and current may not peak at the same time</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Key Values</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>VRMS = 0.707 x Vpeak</strong> — equivalent DC heating effect</li>
              <li className="pl-1"><strong>Vavg = 0.637 x Vpeak</strong> — mean of one half-cycle</li>
              <li className="pl-1"><strong>Form factor = 1.11</strong> — RMS/average for pure sine wave</li>
              <li className="pl-1"><strong>Crest factor = 1.414</strong> — peak/RMS for pure sine wave</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain how alternating current is generated using electromagnetic induction",
              "Describe the sine wave and identify peak, RMS, average and peak-to-peak values",
              "Calculate the relationship between frequency, period and angular frequency",
              "Explain phase angle and interpret phasor diagrams",
              "Compare AC and DC characteristics for different applications",
              "Select appropriate instruments for AC measurement including true-RMS meters"
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

        {/* Section 01: AC Generation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            AC Generation and the Sine Wave
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Alternating current is generated by electromagnetic induction — the fundamental principle discovered
              by Michael Faraday in 1831. When a conductor moves through a magnetic field (or a magnetic field
              moves past a conductor), an electromotive force (EMF) is induced in the conductor. In a practical
              alternator, a coil rotates within a magnetic field, and the induced EMF varies sinusoidally as the
              angle between the coil and the field changes.
            </p>
            <p>
              As the coil rotates through one complete revolution (360 degrees), the induced EMF follows a sine
              wave pattern: starting at zero, rising to a positive peak at 90 degrees, returning to zero at 180
              degrees, falling to a negative peak at 270 degrees, and returning to zero at 360 degrees. This
              completes one cycle. In the UK, this cycle repeats 50 times per second — giving a frequency of 50 Hz.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Instantaneous Voltage Equation</p>
              <p className="text-sm text-white mb-3">
                At any instant in time, the voltage of a sinusoidal AC supply can be calculated from:
              </p>
              <div className="p-3 rounded bg-white/5 font-mono text-sm text-center mb-3">
                v = V<sub>peak</sub> x sin(2πft) = V<sub>peak</sub> x sin(ωt)
              </div>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>v</strong> = instantaneous voltage at time t</li>
                <li className="pl-1"><strong>V<sub>peak</sub></strong> = maximum (peak) voltage</li>
                <li className="pl-1"><strong>f</strong> = frequency in hertz (Hz)</li>
                <li className="pl-1"><strong>t</strong> = time in seconds</li>
                <li className="pl-1"><strong>ω</strong> = angular frequency = 2πf (radians per second)</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Alternator Frequency</p>
              <p className="text-sm text-white mb-3">
                The frequency of the generated AC depends on the rotational speed and the number of magnetic pole pairs:
              </p>
              <div className="p-3 rounded bg-white/5 font-mono text-sm text-center mb-3">
                f = (n x p) / 60
              </div>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>f</strong> = frequency (Hz)</li>
                <li className="pl-1"><strong>n</strong> = rotational speed (RPM)</li>
                <li className="pl-1"><strong>p</strong> = number of pole pairs</li>
                <li className="pl-1"><strong>Example:</strong> A 2-pole generator (1 pole pair) at 3,000 RPM: f = (3000 x 1)/60 = 50 Hz</li>
                <li className="pl-1"><strong>Example:</strong> A 4-pole generator (2 pole pairs) at 1,500 RPM: f = (1500 x 2)/60 = 50 Hz</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> In the UK, all public supply generators are synchronised to exactly 50 Hz by
              National Grid. The frequency is a direct indicator of the balance between electrical generation and
              demand on the power system. If demand exceeds generation, frequency drops; if generation exceeds
              demand, frequency rises.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 02: Peak, RMS and Average Values */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Peak, RMS and Average Values
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Because AC voltage and current are constantly changing, we need standardised ways to express their
              magnitude. Three key values are used: peak (maximum), RMS (root mean square) and average. Each
              serves a different purpose, and understanding their relationships is fundamental to AC circuit
              analysis and measurement.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">AC Voltage Values for 230 V UK Mains</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Value</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Formula</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Result</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Significance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">RMS</td>
                      <td className="border border-white/10 px-3 py-2">Stated value</td>
                      <td className="border border-white/10 px-3 py-2">230 V</td>
                      <td className="border border-white/10 px-3 py-2">Equivalent DC heating effect — used for all ratings</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Peak (Vpk)</td>
                      <td className="border border-white/10 px-3 py-2">VRMS x √2</td>
                      <td className="border border-white/10 px-3 py-2">325.3 V</td>
                      <td className="border border-white/10 px-3 py-2">Maximum instantaneous voltage — determines insulation requirements</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Peak-to-peak</td>
                      <td className="border border-white/10 px-3 py-2">2 x Vpeak</td>
                      <td className="border border-white/10 px-3 py-2">650.6 V</td>
                      <td className="border border-white/10 px-3 py-2">Total voltage swing — relevant for oscilloscope measurements</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Average</td>
                      <td className="border border-white/10 px-3 py-2">0.637 x Vpeak</td>
                      <td className="border border-white/10 px-3 py-2">207.2 V</td>
                      <td className="border border-white/10 px-3 py-2">Mean of one half-cycle — used in rectifier output calculations</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Why RMS Matters</p>
              <p className="text-sm text-white mb-3">
                The RMS value is the most important AC quantity because it represents the <strong>equivalent DC
                value</strong> that would produce the same heating effect in a purely resistive load:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">A 230 V RMS AC supply delivers exactly the same power to a heater as a 230 V DC supply</li>
                <li className="pl-1">All standard voltage and current ratings use RMS values (equipment nameplates, BS 7671 requirements, supply agreements)</li>
                <li className="pl-1">All standard AC measuring instruments display RMS values</li>
                <li className="pl-1">Power calculations use RMS values: P = VRMS x IRMS x cos φ</li>
                <li className="pl-1">Mathematically: VRMS = √(mean of v² over one cycle) — hence "root mean square"</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Form Factor and Crest Factor</p>
              <p className="text-sm text-white mb-3">
                Two important ratios describe the shape of an AC waveform:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Form factor</strong> = RMS / Average = 0.707/0.637 = <strong>1.11</strong> (for a pure sine wave)</li>
                <li className="pl-1"><strong>Crest factor</strong> = Peak / RMS = 1.414/1.0 = <strong>√2 ≈ 1.414</strong> (for a pure sine wave)</li>
                <li className="pl-1">Average-responding meters assume a form factor of 1.11 — they give incorrect readings on distorted waveforms</li>
                <li className="pl-1">High crest factor loads (e.g., switch-mode power supplies, VSD inputs) draw current in sharp peaks, stressing supply conductors and transformers</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance tip:</strong> When measuring AC voltages on circuits supplying non-linear loads
              (LED drivers, IT equipment, variable speed drives), always use a true-RMS instrument. Average-responding
              meters can read 10-40% low on distorted waveforms, potentially masking dangerous overvoltage conditions.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Frequency and Period */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Frequency, Period and Angular Frequency
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Frequency, period and angular frequency are three interrelated ways of describing how rapidly an
              AC waveform oscillates. The UK public supply frequency is standardised at 50 Hz, and all AC
              equipment sold in the UK is designed to operate at this frequency. Understanding frequency-related
              concepts is essential for calculating reactance, impedance and resonant frequencies in AC circuits.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Frequency Relationships</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Frequency (f):</strong> The number of complete cycles per second, measured in hertz (Hz). UK mains: 50 Hz. US/Japan: 60 Hz</li>
                <li className="pl-1"><strong>Period (T):</strong> The time for one complete cycle. T = 1/f. At 50 Hz: T = 1/50 = 0.02 s = 20 ms</li>
                <li className="pl-1"><strong>Angular frequency (ω):</strong> The rate of rotation in radians per second. ω = 2πf. At 50 Hz: ω = 2π x 50 = 100π ≈ 314 rad/s</li>
                <li className="pl-1"><strong>Wavelength:</strong> For electromagnetic waves: λ = c/f. At 50 Hz: λ = 3x10⁸/50 = 6,000 km — this is why power-frequency radiation is non-ionising</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Frequency Standards Worldwide</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Region</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Frequency</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Nominal Voltage</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">UK, Europe, most of Asia, Africa, Australia</td>
                      <td className="border border-white/10 px-3 py-2">50 Hz</td>
                      <td className="border border-white/10 px-3 py-2">230 V (single-phase)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">USA, Canada, parts of South America</td>
                      <td className="border border-white/10 px-3 py-2">60 Hz</td>
                      <td className="border border-white/10 px-3 py-2">120 V (single-phase)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Japan (eastern)</td>
                      <td className="border border-white/10 px-3 py-2">50 Hz</td>
                      <td className="border border-white/10 px-3 py-2">100 V (single-phase)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Japan (western)</td>
                      <td className="border border-white/10 px-3 py-2">60 Hz</td>
                      <td className="border border-white/10 px-3 py-2">100 V (single-phase)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Why Frequency Matters for Maintenance</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Motor speed:</strong> AC induction motor synchronous speed = (120 x f) / poles. At 50 Hz, a 4-pole motor runs at 1,500 RPM synchronous (approximately 1,440 RPM actual with slip)</li>
                <li className="pl-1"><strong>Transformer rating:</strong> A transformer designed for 50 Hz will overheat if operated at a lower frequency (increased magnetising current). It will work safely at a higher frequency but with reduced output voltage</li>
                <li className="pl-1"><strong>Reactance values:</strong> Both inductive reactance (XL = 2πfL) and capacitive reactance (XC = 1/2πfC) are directly dependent on frequency. Changing frequency changes impedance and circuit behaviour</li>
                <li className="pl-1"><strong>Protection timing:</strong> Overcurrent device operating times and RCD trip times are tested and specified at rated frequency</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> UK supply frequency is maintained within ±1% of 50 Hz under normal conditions
              (49.5-50.5 Hz). During system stress events, frequency may deviate further, triggering automatic load
              shedding to protect the grid. Standby generators must be synchronised to 50 Hz before being connected
              to the supply in parallel operations.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Phase Angle and Phasors */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Phase Angle and Phasor Representation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              In AC circuits containing inductance or capacitance, the voltage and current do not reach their
              peak values at the same instant. This time difference is expressed as a phase angle, measured in
              degrees (or radians). Phase angle is one of the most important concepts in AC circuit theory and
              is fundamental to understanding power factor, impedance and three-phase systems.
            </p>
            <p>
              A phasor is a rotating vector used to represent a sinusoidal quantity. The length of the phasor
              represents the magnitude (typically RMS value), and the angle represents the phase. Phasor diagrams
              allow complex AC relationships to be visualised and calculated graphically. They are essential
              tools for analysing circuits with resistance (R), inductance (L) and capacitance (C).
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Phase Relationships in R, L and C Circuits</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Purely resistive (R):</strong> Voltage and current are in phase (φ = 0°). Power is maximised. The voltage and current waveforms rise and fall together</li>
                <li className="pl-1"><strong>Purely inductive (L):</strong> Current lags voltage by 90° (φ = 90° lagging). No real power is consumed — energy is stored and returned to the supply each half-cycle. Remember: "ELI" — voltage (E) leads current (I) in an inductor (L)</li>
                <li className="pl-1"><strong>Purely capacitive (C):</strong> Current leads voltage by 90° (φ = 90° leading). No real power is consumed — energy is stored and returned each half-cycle. Remember: "ICE" — current (I) leads voltage (E) in a capacitor (C)</li>
                <li className="pl-1"><strong>Practical circuits:</strong> Most real circuits contain combinations of R, L and C. The phase angle falls between 0° and 90° and depends on the relative magnitudes of resistance and reactance</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Phasor Diagram Conventions</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Reference phasor:</strong> Usually the voltage (for parallel circuits) or current (for series circuits), drawn horizontally to the right</li>
                <li className="pl-1"><strong>Leading quantities:</strong> Drawn anticlockwise from the reference phasor</li>
                <li className="pl-1"><strong>Lagging quantities:</strong> Drawn clockwise from the reference phasor</li>
                <li className="pl-1"><strong>Length:</strong> Proportional to the magnitude (RMS value) of the quantity</li>
                <li className="pl-1"><strong>Addition:</strong> Phasors are added tip-to-tail (vector addition), not arithmetically. Two 100 V supplies 90° apart do NOT give 200 V — they give √(100² + 100²) = 141.4 V</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The ELI the ICE Man Memory Aid</p>
              <p className="text-sm text-white mb-3">
                A widely used mnemonic for remembering phase relationships:
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="text-sm font-medium text-elec-yellow mb-1">ELI</p>
                  <p className="text-xs text-white">In an <strong>L</strong> (inductor): <strong>E</strong> (voltage) leads <strong>I</strong> (current)</p>
                  <p className="text-xs text-white/70 mt-1">Current lags voltage — lagging power factor</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-sm font-medium text-elec-yellow mb-1">ICE</p>
                  <p className="text-xs text-white">In a <strong>C</strong> (capacitor): <strong>I</strong> (current) leads <strong>E</strong> (voltage)</p>
                  <p className="text-xs text-white/70 mt-1">Current leads voltage — leading power factor</p>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">AC Measurement Instruments</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>True-RMS multimeter:</strong> Essential for accurate measurement on distorted waveforms. Must be CAT III or CAT IV rated for distribution work</li>
                <li className="pl-1"><strong>Clamp meter:</strong> Measures current without breaking the circuit. AC clamp meters use a current transformer; DC/AC types use a Hall effect sensor</li>
                <li className="pl-1"><strong>Oscilloscope:</strong> Displays the actual waveform — shows peak values, frequency, phase relationships and distortion. Portable models are available for field use</li>
                <li className="pl-1"><strong>Power quality analyser:</strong> Measures voltage, current, power, power factor, harmonics and other parameters simultaneously. Used for detailed supply quality assessment</li>
                <li className="pl-1"><strong>Phase rotation meter:</strong> Confirms the correct phase sequence (L1-L2-L3) on three-phase supplies — essential before connecting three-phase motors</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The maintenance technician standard requires you to understand AC
              fundamentals including generation, waveform characteristics, RMS values and phase relationships.
              These principles underpin all AC circuit analysis, fault-finding and measurement.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

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

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge — AC Principles"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module2-section2-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: DC Principles
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module2-section2-3">
              Next: Single-Phase vs Three-Phase
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule2Section2_2;
