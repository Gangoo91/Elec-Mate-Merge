import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Phase Angle and Phasor Diagrams - HNC Module 3 Section 2.3";
const DESCRIPTION = "Master phase angle concepts and phasor diagram techniques for AC circuit analysis in building services: sinusoidal waveforms, leading/lagging relationships, and R-L-C circuit behaviour.";

const quickCheckQuestions = [
  {
    id: "phase-angle-def",
    question: "What does a phase angle of +30 degrees indicate?",
    options: ["Current lags voltage by 30 degrees", "Current leads voltage by 30 degrees", "Voltage and current are in phase", "The frequency is 30Hz"],
    correctIndex: 1,
    explanation: "A positive phase angle indicates that the quantity leads the reference. So +30 degrees means current leads voltage by 30 degrees, as seen in capacitive circuits."
  },
  {
    id: "inductor-phase",
    question: "In a pure inductor, by how much does current lag voltage?",
    options: ["0 degrees", "45 degrees", "90 degrees", "180 degrees"],
    correctIndex: 2,
    explanation: "In a pure inductor, current lags voltage by exactly 90 degrees (or pi/2 radians). This is because the induced EMF opposes changes in current, causing a quarter-cycle delay."
  },
  {
    id: "phasor-length",
    question: "What does the length of a phasor represent?",
    options: ["Frequency", "Phase angle", "Peak or RMS magnitude", "Angular velocity"],
    correctIndex: 2,
    explanation: "The length (magnitude) of a phasor represents the peak or RMS value of the sinusoidal quantity. The angle represents the phase, and all phasors rotate at the same angular frequency."
  },
  {
    id: "capacitor-phase",
    question: "In a capacitive circuit, which statement is correct?",
    options: ["Current lags voltage", "Current leads voltage", "Current and voltage are in phase", "Voltage leads current by 180 degrees"],
    correctIndex: 1,
    explanation: "In a capacitor, current leads voltage by up to 90 degrees. The mnemonic 'CIVIL' helps: in a Capacitor (C), I leads V; in an Inductor (L), V leads I."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the angular frequency (omega) of a 50Hz AC supply?",
    options: [
      "50 rad/s",
      "100 rad/s",
      "157 rad/s",
      "314 rad/s"
    ],
    correctAnswer: 3,
    explanation: "Angular frequency omega = 2 times pi times f = 2 times 3.14159 times 50 = 314.16 rad/s. This represents how fast the phasor rotates."
  },
  {
    id: 2,
    question: "A voltage is expressed as v = 325 sin(314t + 30 degrees). What is the RMS voltage?",
    options: ["325V", "230V", "163V", "460V"],
    correctAnswer: 1,
    explanation: "The peak voltage Vm = 325V. RMS = Vm divided by root 2 = 325 / 1.414 = 230V. The phase angle (30 degrees) does not affect the magnitude."
  },
  {
    id: 3,
    question: "Two phasors are 90 degrees apart and have magnitudes of 3 and 4 units. What is the magnitude of their phasor sum?",
    options: ["1 unit", "5 units", "7 units", "12 units"],
    correctAnswer: 1,
    explanation: "When phasors are 90 degrees apart, use Pythagoras: magnitude = root(3 squared + 4 squared) = root(9 + 16) = root 25 = 5 units."
  },
  {
    id: 4,
    question: "In the expression v = Vm sin(omega t + phi), what does phi represent?",
    options: ["Peak voltage", "Angular frequency", "Phase angle at t=0", "Time period"],
    correctAnswer: 2,
    explanation: "Phi is the phase angle at t=0, measured in degrees or radians. It indicates where the waveform starts relative to a reference sine wave."
  },
  {
    id: 5,
    question: "What is the phase relationship between voltage and current in a pure resistor?",
    options: ["Current leads by 90 degrees", "Current lags by 90 degrees", "They are in phase (0 degrees)", "Current leads by 45 degrees"],
    correctAnswer: 2,
    explanation: "In a pure resistor, voltage and current are in phase - they reach their peaks and zero crossings at the same instant. Phase angle = 0 degrees."
  },
  {
    id: 6,
    question: "A motor draws 20A at 0.8 power factor lagging. What is the phase angle between voltage and current?",
    options: ["36.87 degrees lagging", "53.13 degrees lagging", "36.87 degrees leading", "0 degrees"],
    correctAnswer: 0,
    explanation: "Power factor = cos(phi), so phi = arccos(0.8) = 36.87 degrees. Since it is lagging, current lags voltage by 36.87 degrees (inductive load)."
  },
  {
    id: 7,
    question: "Which mnemonic helps remember the phase relationships in inductors and capacitors?",
    options: ["OHM", "CIVIL", "WAPITI", "SOHCAHTOA"],
    correctAnswer: 1,
    explanation: "CIVIL: in a Capacitor (C), I leads V; in an Inductor (L), V leads I. The middle letters spell 'IV' and 'VI' showing the leading quantity."
  },
  {
    id: 8,
    question: "Two voltages V1 = 100V at 0 degrees and V2 = 100V at 60 degrees are added. What is the resultant magnitude?",
    options: ["100V", "141V", "173V", "200V"],
    correctAnswer: 2,
    explanation: "Using the formula for phasor addition: V = root(V1 squared + V2 squared + 2 times V1 times V2 times cos(theta)) = root(10000 + 10000 + 20000 times 0.5) = root 30000 = 173V."
  },
  {
    id: 9,
    question: "A 7.5kW motor has high starting current. Adding a capacitor bank would:",
    options: [
      "Increase the starting current further",
      "Reduce the phase angle, improving power factor",
      "Increase the phase angle",
      "Have no effect on phase relationships"
    ],
    correctAnswer: 1,
    explanation: "Capacitors supply leading reactive current that partially cancels the lagging reactive current of inductive loads. This reduces the overall phase angle and improves power factor."
  },
  {
    id: 10,
    question: "On a phasor diagram, if voltage is the reference (at 0 degrees), where would you draw current for an RL circuit?",
    options: [
      "Ahead of voltage (anti-clockwise)",
      "Behind voltage (clockwise)",
      "At 90 degrees leading",
      "Exactly on the voltage phasor"
    ],
    correctAnswer: 1,
    explanation: "In an RL circuit, current lags voltage due to the inductance. On a phasor diagram with anti-clockwise rotation, lagging means the current phasor is drawn clockwise from (behind) the voltage reference."
  },
  {
    id: 11,
    question: "What is the period of one complete rotation of a phasor at 50Hz?",
    options: ["10ms", "20ms", "50ms", "100ms"],
    correctAnswer: 1,
    explanation: "Period T = 1/f = 1/50 = 0.02 seconds = 20ms. This is the time for one complete cycle of the AC waveform or one full rotation of the phasor."
  },
  {
    id: 12,
    question: "For a series RLC circuit at resonance, what is the phase angle between supply voltage and current?",
    options: ["90 degrees leading", "90 degrees lagging", "45 degrees", "0 degrees"],
    correctAnswer: 3,
    explanation: "At resonance, XL = XC, so the reactive components cancel. The circuit behaves as pure resistance, and voltage and current are in phase (0 degrees)."
  }
];

const faqs = [
  {
    question: "Why do we use phasors instead of waveform diagrams?",
    answer: "Phasors simplify AC calculations enormously. Adding two sinusoidal waveforms mathematically requires complex trigonometric integration. With phasors, you simply add vectors using parallelogram rules or component methods. This is particularly valuable when analysing circuits with multiple voltage sources or parallel branches."
  },
  {
    question: "What is the practical significance of power factor in building services?",
    answer: "Power factor affects the current drawn from the supply. A 10kW load at 0.7 pf draws 62A, but the same real power at 0.95 pf draws only 46A. This impacts cable sizes, transformer ratings, and electricity bills (as suppliers charge for poor power factor). Motors, discharge lighting, and VFDs often require power factor correction."
  },
  {
    question: "How do I remember whether current leads or lags in different components?",
    answer: "Use the mnemonic CIVIL: in a Capacitor (C), I (current) leads V (voltage); in an Inductor (L), V leads I. Alternatively, think physically: capacitors must charge before voltage builds up (I leads V), while inductors resist current changes (I lags V)."
  },
  {
    question: "Why does motor starting current have such a poor power factor?",
    answer: "At standstill, a motor is essentially a large inductor - the rotor is not yet generating back-EMF. The current is almost purely reactive, giving power factors as low as 0.2-0.3. As the motor accelerates, back-EMF develops and the power factor improves to the running value (typically 0.8-0.9)."
  },
  {
    question: "How do phasor diagrams help with three-phase systems?",
    answer: "Three-phase phasors are separated by 120 degrees. Phasor diagrams clearly show why line voltage is root 3 times phase voltage (the phasor difference between two phases). They also help analyse unbalanced loads and understand neutral currents in star-connected systems."
  }
];

const HNCModule3Section2_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section2">
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
            <span>Module 3.2.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Phase Angle and Phasor Diagrams
          </h1>
          <p className="text-white/80">
            Understanding AC phase relationships and graphical analysis techniques for building services circuits
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Phase angle (phi):</strong> Angular difference between waveforms</li>
              <li className="pl-1"><strong>Phasors:</strong> Rotating vectors representing AC quantities</li>
              <li className="pl-1"><strong>Leading:</strong> Waveform peaks before reference (positive phi)</li>
              <li className="pl-1"><strong>Lagging:</strong> Waveform peaks after reference (negative phi)</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Motor circuits:</strong> Current lags voltage (inductive)</li>
              <li className="pl-1"><strong>Capacitor banks:</strong> Power factor correction</li>
              <li className="pl-1"><strong>Discharge lighting:</strong> Requires PF correction</li>
              <li className="pl-1"><strong>VFDs:</strong> Complex harmonic phase relationships</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Express sinusoidal waveforms using v = Vm sin(omega t + phi)",
              "Interpret and calculate phase angles in degrees and radians",
              "Construct phasor diagrams for AC voltages and currents",
              "Add and subtract phasors graphically and mathematically",
              "Determine voltage-current phase relationships in R, L, and C",
              "Apply phasor analysis to motor starting and capacitor correction"
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

        {/* Section 1: Sinusoidal Waveforms */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Sinusoidal Waveforms and Phase Angle
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Alternating current varies sinusoidally with time. The instantaneous value at any moment
              depends on the peak value, angular frequency, and phase angle - all captured in the
              standard sinusoidal equation.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Sinusoidal Equation</p>
              <p className="font-mono text-center text-lg mb-2">v = V<sub>m</sub> sin(omega t + phi)</p>
              <div className="text-xs text-white/70 space-y-1 mt-3">
                <p><strong>v</strong> = instantaneous voltage at time t</p>
                <p><strong>V<sub>m</sub></strong> = peak (maximum) voltage</p>
                <p><strong>omega</strong> = angular frequency = 2 pi f (rad/s)</p>
                <p><strong>t</strong> = time (seconds)</p>
                <p><strong>phi</strong> = phase angle at t = 0 (degrees or radians)</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key relationships:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Angular frequency:</strong> omega = 2 pi f = 2 x 3.14159 x 50 = 314 rad/s (UK)</li>
                <li className="pl-1"><strong>Period:</strong> T = 1/f = 1/50 = 0.02s = 20ms</li>
                <li className="pl-1"><strong>RMS value:</strong> V<sub>RMS</sub> = V<sub>m</sub> / root 2 = 0.707 x V<sub>m</sub></li>
                <li className="pl-1"><strong>UK mains:</strong> V<sub>m</sub> = 230 x root 2 = 325V peak</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Phase Angle Interpretation</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Phase Angle</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Meaning</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Waveform Shift</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">phi = 0 degrees</td>
                      <td className="border border-white/10 px-3 py-2">In phase with reference</td>
                      <td className="border border-white/10 px-3 py-2">No shift - standard sine wave</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">phi = +30 degrees</td>
                      <td className="border border-white/10 px-3 py-2">Leads reference by 30 degrees</td>
                      <td className="border border-white/10 px-3 py-2">Shifted left (earlier in time)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">phi = -45 degrees</td>
                      <td className="border border-white/10 px-3 py-2">Lags reference by 45 degrees</td>
                      <td className="border border-white/10 px-3 py-2">Shifted right (later in time)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">phi = +90 degrees</td>
                      <td className="border border-white/10 px-3 py-2">Leads by quarter cycle</td>
                      <td className="border border-white/10 px-3 py-2">Starts at peak (cosine wave)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">phi = 180 degrees</td>
                      <td className="border border-white/10 px-3 py-2">In anti-phase</td>
                      <td className="border border-white/10 px-3 py-2">Inverted waveform</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Conversion:</strong> To convert degrees to radians, multiply by pi/180. For example, 90 degrees = 90 x pi/180 = pi/2 radians.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Phasor Representation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Phasor Representation of AC Quantities
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A phasor is a rotating vector that represents a sinusoidal quantity. The length represents
              magnitude (peak or RMS), and the angle represents phase. All phasors in a circuit rotate
              at the same angular frequency omega, so we can "freeze" them and analyse their relative positions.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Phasor fundamentals:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Length:</strong> Represents peak or RMS magnitude</li>
                <li className="pl-1"><strong>Angle:</strong> Measured anti-clockwise from positive x-axis (reference)</li>
                <li className="pl-1"><strong>Rotation:</strong> All phasors rotate anti-clockwise at omega rad/s</li>
                <li className="pl-1"><strong>Projection:</strong> Vertical component gives instantaneous value</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Phasor Notation</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium mb-1">Polar form:</p>
                  <p className="font-mono">V = |V| angle phi</p>
                  <p className="text-white/70 text-xs mt-1">e.g., 230V angle 30 degrees</p>
                </div>
                <div>
                  <p className="font-medium mb-1">Rectangular form:</p>
                  <p className="font-mono">V = a + jb</p>
                  <p className="text-white/70 text-xs mt-1">where a = |V| cos phi, b = |V| sin phi</p>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Drawing Phasor Diagrams</p>
                <ol className="text-sm text-white space-y-1.5 list-decimal list-outside ml-5">
                  <li className="pl-1">Choose a reference phasor (usually voltage)</li>
                  <li className="pl-1">Draw reference horizontally to the right (0 degrees)</li>
                  <li className="pl-1">Draw other phasors at correct angle and length</li>
                  <li className="pl-1">Leading angles: anti-clockwise from reference</li>
                  <li className="pl-1">Lagging angles: clockwise from reference</li>
                </ol>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Converting Forms</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Polar to rectangular:</strong><br />a = |V| cos phi, b = |V| sin phi</li>
                  <li className="pl-1"><strong>Rectangular to polar:</strong><br />|V| = root(a squared + b squared)<br />phi = arctan(b/a)</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Convention:</strong> In building services, we typically use RMS values for phasor magnitudes unless otherwise stated.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 3: Phase Relationships in R, L, C */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Voltage-Current Phase Relationships in R, L, C
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Each circuit element - resistor, inductor, and capacitor - has a characteristic phase
              relationship between voltage and current. Understanding these is essential for
              analysing AC circuits in building services.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Component Phase Behaviour</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Component</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Phase Relationship</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Reason</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Building Services Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Resistor (R)</td>
                      <td className="border border-white/10 px-3 py-2">V and I in phase<br />(phi = 0 degrees)</td>
                      <td className="border border-white/10 px-3 py-2">Ohm's law: V = IR at all instants</td>
                      <td className="border border-white/10 px-3 py-2">Electric heaters, incandescent lamps</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Inductor (L)</td>
                      <td className="border border-white/10 px-3 py-2">I lags V by 90 degrees<br />(V leads I)</td>
                      <td className="border border-white/10 px-3 py-2">Induced EMF opposes current change</td>
                      <td className="border border-white/10 px-3 py-2">Motor windings, chokes, transformers</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Capacitor (C)</td>
                      <td className="border border-white/10 px-3 py-2">I leads V by 90 degrees<br />(V lags I)</td>
                      <td className="border border-white/10 px-3 py-2">Current flows to charge plates before voltage builds</td>
                      <td className="border border-white/10 px-3 py-2">PF correction capacitors, filter circuits</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">The CIVIL Mnemonic</p>
              <p className="text-sm text-white">
                <strong>C-I-V-I-L:</strong> In a <strong>C</strong>apacitor, <strong>I</strong> leads <strong>V</strong>.
                In an <strong>I</strong>nductor (<strong>L</strong>), <strong>V</strong> leads <strong>I</strong>.
              </p>
              <p className="text-xs text-white/70 mt-2">
                The middle letters show which quantity leads: "IV" (I leads V) for capacitor, "VI" (V leads I) for inductor.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Combined Circuits</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>RL circuit:</strong> Current lags voltage by angle between 0 degrees and 90 degrees</li>
                <li className="pl-1"><strong>RC circuit:</strong> Current leads voltage by angle between 0 degrees and 90 degrees</li>
                <li className="pl-1"><strong>RLC circuit:</strong> Current may lead or lag depending on whether X<sub>L</sub> &gt; X<sub>C</sub> or X<sub>C</sub> &gt; X<sub>L</sub></li>
                <li className="pl-1"><strong>At resonance:</strong> X<sub>L</sub> = X<sub>C</sub>, phase angle = 0 degrees (purely resistive)</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Power factor:</strong> cos(phi) where phi is the phase angle between V and I. Unity power factor (pf = 1) means V and I are in phase.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Phasor Addition and Building Services Applications */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Phasor Addition and Building Services Applications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Phasor addition is essential for calculating resultant voltages and currents in AC circuits.
              In building services, this applies to voltage drops in circuits, parallel branch currents,
              and power factor correction.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Phasor Addition Methods</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-sm mb-2">Graphical (Parallelogram)</p>
                  <ol className="text-xs text-white/90 space-y-1 list-decimal list-outside ml-4">
                    <li>Draw first phasor from origin</li>
                    <li>Draw second phasor from origin</li>
                    <li>Complete parallelogram</li>
                    <li>Diagonal from origin = resultant</li>
                  </ol>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-sm mb-2">Mathematical (Rectangular)</p>
                  <ol className="text-xs text-white/90 space-y-1 list-decimal list-outside ml-4">
                    <li>Convert each phasor to a + jb form</li>
                    <li>Add real parts: a<sub>total</sub> = a<sub>1</sub> + a<sub>2</sub></li>
                    <li>Add imaginary parts: b<sub>total</sub> = b<sub>1</sub> + b<sub>2</sub></li>
                    <li>Convert back to polar if needed</li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Formula for Two Phasors at Angle theta</p>
              <p className="font-mono text-center text-sm mb-2">|V<sub>R</sub>| = root(V<sub>1</sub><sup>2</sup> + V<sub>2</sub><sup>2</sup> + 2V<sub>1</sub>V<sub>2</sub>cos theta)</p>
              <p className="text-xs text-white/70 text-center">Special cases: theta = 0 degrees gives V<sub>1</sub> + V<sub>2</sub>; theta = 90 degrees gives root(V<sub>1</sub><sup>2</sup> + V<sub>2</sub><sup>2</sup>); theta = 180 degrees gives |V<sub>1</sub> - V<sub>2</sub>|</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Services Applications</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Phasor Analysis Use</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Motor starting</td>
                      <td className="border border-white/10 px-3 py-2">High inductive current (6-8x full load) at 0.2-0.3 pf; current phasor nearly 90 degrees behind voltage</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Power factor correction</td>
                      <td className="border border-white/10 px-3 py-2">Capacitor current (leading) cancels inductive current (lagging); resultant closer to voltage reference</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Series voltage drops</td>
                      <td className="border border-white/10 px-3 py-2">V<sub>R</sub>, V<sub>L</sub>, V<sub>C</sub> add as phasors; supply = phasor sum of component voltages</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Parallel branch currents</td>
                      <td className="border border-white/10 px-3 py-2">Total current = phasor sum of branch currents (different phases)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Three-phase systems</td>
                      <td className="border border-white/10 px-3 py-2">Line voltages = phasor difference between phases (120 degrees apart)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical note:</strong> When correcting power factor from 0.7 to 0.95 on a 50kVA load, current reduces from 71A to 53A - allowing smaller cables or more capacity from existing infrastructure.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Sinusoidal Expression</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> UK mains voltage has RMS value 230V at 50Hz, referenced as 0 degrees. Write the expression for instantaneous voltage.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Peak voltage: V<sub>m</sub> = V<sub>RMS</sub> x root 2</p>
                <p>V<sub>m</sub> = 230 x 1.414 = <strong>325V</strong></p>
                <p className="mt-2">Angular frequency: omega = 2 pi f</p>
                <p>omega = 2 x 3.14159 x 50 = <strong>314 rad/s</strong></p>
                <p className="mt-2">Phase angle: phi = 0 degrees (reference)</p>
                <p className="mt-2 text-green-400">v = 325 sin(314t) volts</p>
                <p className="text-white/60 mt-1">or equivalently: v = 325 sin(100 pi t) volts</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Phase Angle from Power Factor</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> An AHU motor operates at 0.85 power factor lagging. Calculate the phase angle and describe the current phasor position.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Power factor = cos(phi)</p>
                <p>0.85 = cos(phi)</p>
                <p>phi = arccos(0.85) = <strong>31.8 degrees</strong></p>
                <p className="mt-2">Since power factor is lagging (inductive load):</p>
                <p>Current lags voltage by 31.8 degrees</p>
                <p className="mt-2 text-white/60">On phasor diagram: draw voltage at 0 degrees,</p>
                <p className="text-white/60">current at -31.8 degrees (clockwise from voltage)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Phasor Addition for Series RL Circuit</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A series RL circuit has V<sub>R</sub> = 120V and V<sub>L</sub> = 90V. Calculate the supply voltage.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>In series RL: V<sub>R</sub> is in phase with current</p>
                <p>V<sub>L</sub> leads current (and V<sub>R</sub>) by 90 degrees</p>
                <p className="mt-2">Since V<sub>R</sub> and V<sub>L</sub> are 90 degrees apart:</p>
                <p>V<sub>S</sub> = root(V<sub>R</sub><sup>2</sup> + V<sub>L</sub><sup>2</sup>)</p>
                <p>V<sub>S</sub> = root(120<sup>2</sup> + 90<sup>2</sup>)</p>
                <p>V<sub>S</sub> = root(14400 + 8100) = root(22500)</p>
                <p className="mt-2 text-green-400">V<sub>S</sub> = 150V</p>
                <p className="mt-2 text-white/60">Phase angle: phi = arctan(V<sub>L</sub>/V<sub>R</sub>) = arctan(90/120) = 36.87 degrees</p>
                <p className="text-white/60">Supply leads current by 36.87 degrees</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 4: Motor Starting Current Analysis</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 7.5kW motor has full-load current of 15A at 0.85 pf. Starting current is 6 times FLC at 0.25 pf. Analyse the starting condition.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p><strong>Full-load condition:</strong></p>
                <p>I<sub>FL</sub> = 15A at pf = 0.85</p>
                <p>Phase angle = arccos(0.85) = 31.8 degrees lagging</p>
                <p className="mt-2"><strong>Starting condition:</strong></p>
                <p>I<sub>start</sub> = 6 x 15 = <strong>90A</strong></p>
                <p>Phase angle = arccos(0.25) = <strong>75.5 degrees lagging</strong></p>
                <p className="mt-3 text-white/60">At start, current is nearly in quadrature with voltage</p>
                <p className="text-white/60">(75.5 degrees vs 90 degrees for pure inductor)</p>
                <p className="mt-2 text-orange-400">Warning: This 90A starting current causes significant</p>
                <p className="text-orange-400">voltage drop on supply cables and may require</p>
                <p className="text-orange-400">star-delta or soft starter for larger installations</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 5: Power Factor Correction with Capacitors</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 20kW load operates at 0.7 pf lagging. Calculate the capacitor kVAr needed to improve pf to 0.95 lagging.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p><strong>Original condition (pf = 0.7):</strong></p>
                <p>phi<sub>1</sub> = arccos(0.7) = 45.6 degrees</p>
                <p>kVA<sub>1</sub> = kW / pf = 20 / 0.7 = 28.6 kVA</p>
                <p>kVAr<sub>1</sub> = kVA x sin(phi) = 28.6 x sin(45.6) = 20.4 kVAr (lagging)</p>
                <p className="mt-2"><strong>Target condition (pf = 0.95):</strong></p>
                <p>phi<sub>2</sub> = arccos(0.95) = 18.2 degrees</p>
                <p>kVAr<sub>2</sub> = kW x tan(phi<sub>2</sub>) = 20 x tan(18.2) = 6.6 kVAr (lagging)</p>
                <p className="mt-2"><strong>Capacitor required:</strong></p>
                <p>kVAr<sub>C</sub> = kVAr<sub>1</sub> - kVAr<sub>2</sub> = 20.4 - 6.6</p>
                <p className="mt-2 text-green-400">Capacitor bank required: 13.8 kVAr (leading)</p>
                <p className="mt-2 text-white/60">Current reduction: from 28.6 / 0.23 = 124A</p>
                <p className="text-white/60">to 21.1 / 0.23 = 92A (26% reduction)</p>
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
                <li className="pl-1"><strong>v = V<sub>m</sub> sin(omega t + phi)</strong> - Instantaneous voltage</li>
                <li className="pl-1"><strong>omega = 2 pi f</strong> - Angular frequency (314 rad/s at 50Hz)</li>
                <li className="pl-1"><strong>V<sub>RMS</sub> = V<sub>m</sub> / root 2</strong> - RMS from peak</li>
                <li className="pl-1"><strong>phi = arccos(pf)</strong> - Phase angle from power factor</li>
                <li className="pl-1"><strong>pf = cos(phi)</strong> - Power factor from phase angle</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Phasor Diagram Rules</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Choose voltage as reference (0 degrees) unless stated otherwise</li>
                <li className="pl-1">Phasors rotate anti-clockwise; leading = anti-clockwise from reference</li>
                <li className="pl-1">In series circuits: current is common - draw current then add voltage phasors</li>
                <li className="pl-1">In parallel circuits: voltage is common - draw voltage then add current phasors</li>
                <li className="pl-1">Resultant = phasor sum using parallelogram or component method</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">UK mains: omega = <strong>314 rad/s</strong>, T = <strong>20ms</strong></li>
                <li className="pl-1">UK mains: V<sub>peak</sub> = <strong>325V</strong>, V<sub>RMS</sub> = <strong>230V</strong></li>
                <li className="pl-1">Pure R: phi = <strong>0 degrees</strong>, pf = 1</li>
                <li className="pl-1">Pure L: phi = <strong>90 degrees lagging</strong>, pf = 0</li>
                <li className="pl-1">Pure C: phi = <strong>90 degrees leading</strong>, pf = 0</li>
                <li className="pl-1">Typical motor pf: <strong>0.8-0.9</strong> lagging (running)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Confusing lead/lag</strong> - Remember CIVIL: C = I leads V, L = V leads I</li>
                <li className="pl-1"><strong>Adding magnitudes directly</strong> - Only valid when phasors are in phase</li>
                <li className="pl-1"><strong>Degrees vs radians</strong> - Calculator must be in correct mode</li>
                <li className="pl-1"><strong>Forgetting direction</strong> - State whether leading or lagging</li>
                <li className="pl-1"><strong>RMS vs peak</strong> - Be clear which is being used in calculations</li>
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
                <p className="font-medium text-white mb-1">Sinusoidal Quantities</p>
                <ul className="space-y-0.5">
                  <li>v = V<sub>m</sub> sin(omega t + phi)</li>
                  <li>omega = 2 pi f = 314 rad/s (50Hz)</li>
                  <li>V<sub>RMS</sub> = V<sub>m</sub> / root 2</li>
                  <li>UK: 325V peak, 230V RMS</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Phase Relationships</p>
                <ul className="space-y-0.5">
                  <li>Resistor: V and I in phase</li>
                  <li>Inductor: I lags V by 90 degrees</li>
                  <li>Capacitor: I leads V by 90 degrees</li>
                  <li>pf = cos(phi)</li>
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
            <Link to="../h-n-c-module3-section2-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Capacitance
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section2-4">
              Next: Complex Notation
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule3Section2_3;
