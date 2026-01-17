/**
 * Level 3 Module 3 Section 4.1 - AC Waveforms
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "AC Waveforms - Level 3 Module 3 Section 4.1";
const DESCRIPTION = "Understand alternating current generation, sinusoidal waveform characteristics, and the fundamental principles of AC electrical systems in accordance with UK electrical standards.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What causes the voltage to alternate in an AC generator?",
    options: [
      "A reversing switch that changes the connections",
      "The rotation of a conductor through a magnetic field",
      "Chemical reactions in the generator core",
      "Electronic switching circuits in the output"
    ],
    correctIndex: 1,
    explanation: "AC voltage is generated when a conductor rotates through a magnetic field. As the conductor passes through different positions relative to the field, the induced EMF changes in magnitude and direction, creating the alternating waveform."
  },
  {
    id: "check-2",
    question: "At what angular position does a sinusoidal waveform reach its maximum positive value?",
    options: [
      "0 degrees",
      "90 degrees",
      "180 degrees",
      "270 degrees"
    ],
    correctIndex: 1,
    explanation: "A sinusoidal waveform reaches its maximum positive value at 90 degrees (or one-quarter of a complete cycle). At 0 degrees the waveform crosses zero going positive, and at 180 degrees it crosses zero going negative."
  },
  {
    id: "check-3",
    question: "What is the relationship between one complete cycle and angular measurement?",
    options: [
      "One cycle equals 90 degrees",
      "One cycle equals 180 degrees",
      "One cycle equals 270 degrees",
      "One cycle equals 360 degrees"
    ],
    correctIndex: 3,
    explanation: "One complete cycle of an AC waveform corresponds to 360 degrees of rotation. This represents the conductor completing one full revolution through the magnetic field, returning to its starting position."
  },
  {
    id: "check-4",
    question: "What happens to the induced EMF when the conductor moves parallel to the magnetic field lines?",
    options: [
      "Maximum EMF is induced",
      "Zero EMF is induced",
      "The EMF becomes direct current",
      "The frequency increases"
    ],
    correctIndex: 1,
    explanation: "When a conductor moves parallel to magnetic field lines, it does not cut through them, so no EMF is induced. Maximum EMF occurs when the conductor cuts perpendicularly through the field lines (at 90 and 270 degrees)."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The UK mains supply operates at 50 Hz. How many complete cycles occur in one second?",
    options: [
      "25 cycles",
      "50 cycles",
      "100 cycles",
      "230 cycles"
    ],
    correctAnswer: 1,
    explanation: "Frequency in Hertz (Hz) represents cycles per second. Therefore, 50 Hz means 50 complete cycles occur every second. This is the standard frequency for UK and European power systems."
  },
  {
    id: 2,
    question: "Which mathematical function best describes a pure AC waveform?",
    options: [
      "Linear function",
      "Exponential function",
      "Sine function",
      "Square root function"
    ],
    correctAnswer: 2,
    explanation: "A pure AC waveform is described by the sine function: v = Vmax sin(wt). The sinusoidal shape results from the rotation of a conductor in a uniform magnetic field, following the mathematical relationship of sine with angle."
  },
  {
    id: 3,
    question: "In a single-phase AC generator, how many times does the voltage reach its peak value during one complete cycle?",
    options: [
      "Once - at the positive peak only",
      "Twice - once positive and once negative",
      "Four times - at each quarter cycle",
      "Continuously throughout the cycle"
    ],
    correctAnswer: 1,
    explanation: "During one complete cycle, the voltage reaches its peak twice: once at the maximum positive value (90 degrees) and once at the maximum negative value (270 degrees). These are the points where the conductor is cutting maximum field lines."
  },
  {
    id: 4,
    question: "What determines the frequency of the generated AC waveform in a rotating machine?",
    options: [
      "The strength of the magnetic field",
      "The speed of rotation and number of pole pairs",
      "The diameter of the conductor",
      "The type of insulation used"
    ],
    correctAnswer: 1,
    explanation: "Frequency is determined by the speed of rotation and the number of pole pairs in the generator. The formula is f = (n x p) / 60, where n is speed in RPM and p is the number of pole pairs. A 2-pole machine at 3000 RPM produces 50 Hz."
  },
  {
    id: 5,
    question: "The instantaneous value of an AC voltage is described by v = 325 sin(wt). What is the peak voltage?",
    options: [
      "230 V",
      "325 V",
      "460 V",
      "162.5 V"
    ],
    correctAnswer: 1,
    explanation: "In the equation v = Vmax sin(wt), the coefficient of sin(wt) represents the peak or maximum voltage. Therefore, the peak voltage is 325 V. This is consistent with UK mains where 230 V RMS x 1.414 = 325 V peak."
  },
  {
    id: 6,
    question: "What is the angular velocity (omega) in radians per second for a 50 Hz supply?",
    options: [
      "50 rad/s",
      "100 rad/s",
      "157 rad/s",
      "314 rad/s"
    ],
    correctAnswer: 3,
    explanation: "Angular velocity omega = 2 x pi x f. For 50 Hz: omega = 2 x 3.14159 x 50 = 314.16 rad/s. This is approximately 314 rad/s and represents how quickly the angle changes in radians per second."
  },
  {
    id: 7,
    question: "A waveform completes one cycle in 20 milliseconds. What is its frequency?",
    options: [
      "20 Hz",
      "50 Hz",
      "100 Hz",
      "200 Hz"
    ],
    correctAnswer: 1,
    explanation: "Frequency = 1 / Period. The period is 20 ms = 0.02 seconds. Therefore f = 1 / 0.02 = 50 Hz. This is the standard UK mains frequency, with each cycle taking 20 milliseconds to complete."
  },
  {
    id: 8,
    question: "In a three-phase generator, what is the phase displacement between each phase?",
    options: [
      "90 degrees",
      "120 degrees",
      "180 degrees",
      "240 degrees"
    ],
    correctAnswer: 1,
    explanation: "In a three-phase system, the three phases are equally spaced around 360 degrees, giving 360/3 = 120 degrees between each phase. This arrangement provides smooth power transfer and efficient use of conductors."
  },
  {
    id: 9,
    question: "What is the purpose of slip rings in an AC generator?",
    options: [
      "To convert AC to DC output",
      "To increase the output voltage",
      "To maintain continuous electrical connection to the rotating coil",
      "To reduce the speed of rotation"
    ],
    correctAnswer: 2,
    explanation: "Slip rings provide a continuous electrical connection between the rotating coil (rotor) and the external circuit. Unlike a commutator in DC machines, slip rings maintain the AC nature of the generated voltage."
  },
  {
    id: 10,
    question: "At what point in the cycle is the rate of change of voltage at its maximum?",
    options: [
      "At the positive peak (90 degrees)",
      "At the negative peak (270 degrees)",
      "At the zero crossings (0 and 180 degrees)",
      "At 45 and 225 degrees"
    ],
    correctAnswer: 2,
    explanation: "The rate of change of a sine wave is maximum at the zero crossings. Mathematically, the derivative of sin(x) is cos(x), which equals 1 at 0 degrees and -1 at 180 degrees. This is important for understanding transformer and inductor behaviour."
  },
  {
    id: 11,
    question: "Which principle governs the generation of EMF in an AC generator?",
    options: [
      "Coulomb's Law",
      "Faraday's Law of electromagnetic induction",
      "Ohm's Law",
      "Kirchhoff's voltage law"
    ],
    correctAnswer: 1,
    explanation: "Faraday's Law states that EMF is induced when there is a change in magnetic flux linking a conductor. In a generator, this change occurs as the conductor rotates through the magnetic field, cutting lines of flux."
  },
  {
    id: 12,
    question: "The equation e = Em sin(omega t + phi) includes the term phi. What does this represent?",
    options: [
      "The maximum voltage",
      "The frequency in Hertz",
      "The phase angle or phase shift",
      "The angular velocity"
    ],
    correctAnswer: 2,
    explanation: "The term phi represents the phase angle or phase shift. It indicates where the waveform starts relative to a reference (usually zero degrees at t=0). A positive phi shifts the waveform to the left (leading), negative to the right (lagging)."
  }
];

const faqs = [
  {
    question: "Why is AC used for mains electricity instead of DC?",
    answer: "AC can be easily transformed to different voltage levels using transformers, which is essential for efficient power transmission. High voltage AC is used for long-distance transmission to reduce I squared R losses, then transformed down for safe distribution. DC would require costly power electronics for voltage conversion. Additionally, AC motors are simpler and more robust than DC motors for many applications."
  },
  {
    question: "What is the difference between single-phase and three-phase AC?",
    answer: "Single-phase AC has one alternating voltage waveform, while three-phase has three waveforms displaced by 120 degrees. Three-phase provides constant power delivery (unlike single-phase which pulses), more efficient use of conductors, and is essential for powering large motors and industrial equipment. Most UK domestic supplies are single-phase, while commercial and industrial premises use three-phase."
  },
  {
    question: "Why is 50 Hz used in the UK rather than other frequencies?",
    answer: "The 50 Hz frequency was standardised historically based on a balance between transformer efficiency (better at lower frequencies), motor performance, and lamp flicker (more noticeable at lower frequencies). Europe standardised on 50 Hz while North America chose 60 Hz. Modern equipment is often designed to work at either frequency. Changing frequency would require replacing all frequency-dependent equipment."
  },
  {
    question: "What happens if the frequency deviates from 50 Hz?",
    answer: "Grid frequency must be maintained close to 50 Hz to ensure system stability. Motors would run at incorrect speeds, clocks and timers would become inaccurate, and generators could fall out of synchronisation. The National Grid continuously balances generation and demand to maintain frequency. A drop below 49.5 Hz triggers load shedding, while generation is reduced if frequency rises above 50.5 Hz."
  },
  {
    question: "How does the shape of an AC waveform affect electrical equipment?",
    answer: "Most equipment is designed for sinusoidal waveforms. Non-sinusoidal waveforms contain harmonics that can cause additional heating in cables and transformers, nuisance tripping of RCDs, interference with sensitive electronics, and reduced motor efficiency. Power quality monitoring measures Total Harmonic Distortion (THD) to assess waveform purity. Non-linear loads like LEDs and VFDs can distort the supply waveform."
  },
  {
    question: "What determines the maximum voltage that can be generated?",
    answer: "Maximum generated voltage depends on the magnetic field strength, the number of turns in the coil, and the speed of rotation. The equation is E = B x l x v x N, where B is field strength, l is conductor length, v is velocity, and N is number of turns. In practice, voltage is also limited by insulation breakdown voltage and the mechanical size of the generator."
  }
];

const Level3Module3Section4_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">

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
            <span>Module 3.4.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            AC Waveforms
          </h1>
          <p className="text-white/80">
            Understanding alternating current generation and sinusoidal characteristics
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>AC generation:</strong> Conductor rotating in magnetic field</li>
              <li><strong>Waveform:</strong> Sinusoidal - follows sine function</li>
              <li><strong>One cycle:</strong> 360 degrees of rotation</li>
              <li><strong>UK standard:</strong> 50 Hz, 230 V RMS single-phase</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Formulas</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Instantaneous:</strong> v = Vmax sin(omega t)</li>
              <li><strong>Angular velocity:</strong> omega = 2 x pi x f</li>
              <li><strong>Period:</strong> T = 1/f seconds</li>
              <li><strong>UK mains:</strong> T = 1/50 = 20 ms per cycle</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand how AC voltage is generated in rotating machines",
              "Describe the sinusoidal waveform and its key characteristics",
              "Explain the relationship between rotation and angular measurement",
              "Calculate instantaneous values using the sine function",
              "Understand the significance of frequency and period",
              "Apply Faraday's Law to AC generation"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: The Principle of AC Generation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The Principle of AC Generation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Alternating current is generated when a conductor moves through a magnetic field in such a way that the direction of the induced electromotive force (EMF) periodically reverses. This fundamental principle, based on Faraday's Law of electromagnetic induction, underpins all AC generation from small alternators to massive power station generators.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">The basic AC generator consists of:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Field system:</strong> Permanent magnets or electromagnets creating a uniform magnetic field</li>
                <li><strong>Armature:</strong> A coil of wire that rotates within the magnetic field</li>
                <li><strong>Slip rings:</strong> Rotating contacts that maintain connection to the external circuit</li>
                <li><strong>Brushes:</strong> Stationary contacts that slide on the slip rings</li>
              </ul>
            </div>

            <p>
              As the armature rotates, the conductors alternately move up through the field, then down through it. When moving upward, the induced EMF is in one direction; when moving downward, the EMF reverses. This continuous reversal creates the alternating nature of the output voltage.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Faraday's Law:</strong> The magnitude of the induced EMF is proportional to the rate of change of magnetic flux linkage. Mathematically: e = -N x (d phi / dt), where N is the number of turns and phi is the magnetic flux.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: The Sinusoidal Waveform */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            The Sinusoidal Waveform
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The natural output of a rotating generator is a sinusoidal waveform - a smooth, continuously varying wave that follows the mathematical sine function. This shape arises because the rate at which the conductor cuts through magnetic field lines varies sinusoidally as it rotates.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Points on the Waveform</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>0 degrees:</strong> Zero voltage, rising positive</li>
                  <li><strong>90 degrees:</strong> Maximum positive voltage (Vmax)</li>
                  <li><strong>180 degrees:</strong> Zero voltage, falling negative</li>
                  <li><strong>270 degrees:</strong> Maximum negative voltage (-Vmax)</li>
                  <li><strong>360 degrees:</strong> Return to zero, cycle complete</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Mathematical Expression</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Basic form:</strong> v = Vmax sin(theta)</li>
                  <li><strong>With time:</strong> v = Vmax sin(omega t)</li>
                  <li><strong>With phase:</strong> v = Vmax sin(omega t + phi)</li>
                  <li><strong>Angular velocity:</strong> omega = 2 pi f rad/s</li>
                </ul>
              </div>
            </div>

            <p>
              The sinusoidal waveform is considered the "pure" AC waveform. Any deviation from this shape indicates the presence of harmonics - additional frequency components that can cause problems in electrical systems. Power quality measurements assess how closely the actual waveform matches the ideal sinusoid.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> For UK mains at 50 Hz, omega = 2 x pi x 50 = 314 rad/s. The peak voltage is 325 V, so the instantaneous voltage equation is v = 325 sin(314t) volts.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Angular Measurement and Rotation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Angular Measurement and Rotation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding AC waveforms requires familiarity with angular measurement. Since AC is generated by rotation, it is natural to describe waveform positions in degrees or radians. One complete cycle corresponds to one full rotation of 360 degrees or 2 pi radians.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Degrees</p>
                <p className="text-white/90 text-xs">360 degrees = full circle, familiar from geometry</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Radians</p>
                <p className="text-white/90 text-xs">2 pi radians = full circle, used in calculations</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Conversion</p>
                <p className="text-white/90 text-xs">Radians = degrees x (pi / 180)</p>
              </div>
            </div>

            <p>
              The angular velocity (omega) describes how fast the angle changes with time, measured in radians per second. This links angular position to time through the relationship theta = omega x t. For electrical calculations, omega = 2 pi f, where f is the frequency in Hertz.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Important angular relationships:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Quarter cycle: 90 degrees = pi/2 radians</li>
                <li>Half cycle: 180 degrees = pi radians</li>
                <li>Three-quarter cycle: 270 degrees = 3 pi/2 radians</li>
                <li>Full cycle: 360 degrees = 2 pi radians</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> For 50 Hz supply, one cycle takes 20 ms. At any instant, the angular position is theta = 314t radians (or 18000t degrees), where t is in seconds.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Instantaneous Values and Calculations */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Instantaneous Values and Calculations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The instantaneous value of an AC quantity is its value at any specific moment in time. Unlike the constant value of DC, AC values continuously change following the sinusoidal pattern. Understanding how to calculate instantaneous values is essential for analysing AC circuit behaviour.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Calculating instantaneous values:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Step 1:</strong> Identify Vmax (or Imax) - the peak value</li>
                <li><strong>Step 2:</strong> Calculate angular velocity: omega = 2 pi f</li>
                <li><strong>Step 3:</strong> Determine angle: theta = omega x t (in radians)</li>
                <li><strong>Step 4:</strong> Apply formula: v = Vmax sin(theta)</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Worked Example:</strong> For UK mains (Vmax = 325 V, f = 50 Hz), find voltage at t = 2.5 ms.
              <br />
              omega = 2 pi x 50 = 314 rad/s
              <br />
              theta = 314 x 0.0025 = 0.785 radians (45 degrees)
              <br />
              v = 325 sin(0.785) = 325 x 0.707 = 230 V
            </p>

            <p>
              Notice that at 45 degrees (one-eighth of a cycle), the instantaneous voltage equals the RMS value. This is a useful relationship for quick mental calculations. The RMS value represents the equivalent DC value in terms of power delivery.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical tip:</strong> When measuring with a multimeter, you typically read RMS values, not instantaneous or peak values. Digital multimeters sample the waveform rapidly and calculate the RMS mathematically.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Understanding Generator Operation</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>The generated frequency depends on rotational speed and number of poles: f = (n x p) / 60</li>
                <li>A 2-pole generator must spin at 3000 RPM to produce 50 Hz</li>
                <li>A 4-pole generator only needs 1500 RPM for the same frequency</li>
                <li>Large power station generators use multiple poles for practical speed limits</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">AC Waveform Analysis</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Oscilloscopes display the actual waveform shape - useful for power quality analysis</li>
                <li>Any distortion from sinusoidal indicates harmonics are present</li>
                <li>The zero crossings occur at 0, 180, and 360 degrees</li>
                <li>Three-phase systems have three sinusoids 120 degrees apart</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Misconceptions</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>230 V is not the peak voltage</strong> - it is the RMS value; peak is 325 V</li>
                <li><strong>AC does not flow in one direction then reverse</strong> - electrons oscillate back and forth</li>
                <li><strong>Frequency is fixed by the generator</strong> - not by the load or circuit components</li>
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
                <p className="font-medium text-white mb-1">Key Formulas</p>
                <ul className="space-y-0.5">
                  <li>v = Vmax sin(omega t)</li>
                  <li>omega = 2 pi f rad/s</li>
                  <li>T = 1/f seconds</li>
                  <li>f = (n x p) / 60 Hz</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">UK Mains Values</p>
                <ul className="space-y-0.5">
                  <li>Frequency: 50 Hz</li>
                  <li>Period: 20 ms</li>
                  <li>RMS voltage: 230 V</li>
                  <li>Peak voltage: 325 V</li>
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
            <Link to="/study-centre/apprentice/level3-module3-section3-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Motors and Generators
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module3-section4-2">
              Next: Frequency, Period and Amplitude
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module3Section4_1;
