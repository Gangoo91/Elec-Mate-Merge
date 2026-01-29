import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Phase Difference and Vector Representation - HNC Module 3 Section 3.3";
const DESCRIPTION = "Master phase angles, phasor diagrams and vector representation in AC circuits for building services applications including motor starting, capacitor effects and power factor correction.";

const quickCheckQuestions = [
  {
    id: "phase-angle-def",
    question: "What does a phase angle of +30 degrees indicate?",
    options: ["Current lags voltage by 30 degrees", "Current leads voltage by 30 degrees", "Voltage and current are in phase", "The circuit is purely resistive"],
    correctIndex: 1,
    explanation: "A positive phase angle indicates that current leads voltage. This occurs in capacitive circuits where current flows to charge the capacitor before voltage builds up across it."
  },
  {
    id: "lagging-current",
    question: "In which type of circuit does current lag behind voltage?",
    options: ["Purely resistive", "Purely capacitive", "Inductive", "Open circuit"],
    correctIndex: 2,
    explanation: "In inductive circuits (motors, transformers, fluorescent ballasts), current lags voltage because the inductor opposes changes in current flow. This is remembered by 'ELI' - voltage (E) leads current (I) in inductors (L)."
  },
  {
    id: "phasor-length",
    question: "What does the length of a phasor represent?",
    options: ["Phase angle", "Frequency", "RMS magnitude", "Time period"],
    correctIndex: 2,
    explanation: "The length (magnitude) of a phasor represents the RMS value of the quantity (voltage or current). The angle represents the phase relationship, and the phasor rotates at the supply frequency."
  },
  {
    id: "power-factor-angle",
    question: "If power factor is 0.8 lagging, what is the phase angle?",
    options: ["36.87 degrees", "53.13 degrees", "45 degrees", "60 degrees"],
    correctIndex: 0,
    explanation: "Power factor = cos(phi), so phi = arccos(0.8) = 36.87 degrees. 'Lagging' indicates current lags voltage, typical of inductive loads like motors."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is phase difference in an AC circuit?",
    options: [
      "The difference in frequency between voltage and current",
      "The angular displacement between voltage and current waveforms",
      "The difference in peak values",
      "The time taken for one complete cycle"
    ],
    correctAnswer: 1,
    explanation: "Phase difference is the angular displacement (measured in degrees or radians) between voltage and current waveforms. It indicates how much one waveform is shifted relative to the other."
  },
  {
    id: 2,
    question: "What is the phase relationship in a purely resistive AC circuit?",
    options: ["Current leads voltage by 90 degrees", "Current lags voltage by 90 degrees", "Voltage and current are in phase", "Phase varies with frequency"],
    correctAnswer: 2,
    explanation: "In a purely resistive circuit, voltage and current are in phase (phi = 0 degrees). The current instantaneously follows the applied voltage according to Ohm's Law."
  },
  {
    id: 3,
    question: "What is the mnemonic for remembering phase relationships in L and C circuits?",
    options: ["CIVIL", "ELI the ICE man", "SOHCAHTOA", "ROY G BIV"],
    correctAnswer: 1,
    explanation: "ELI the ICE man: In inductors (L), voltage (E) leads current (I). In capacitors (C), current (I) leads voltage (E). This helps remember the 90-degree phase shifts in reactive components."
  },
  {
    id: 4,
    question: "When adding two phasors graphically, what method is used?",
    options: ["Multiply their magnitudes", "Add their angles only", "Head-to-tail vector addition", "Subtract the smaller from larger"],
    correctAnswer: 2,
    explanation: "Phasors are added using the head-to-tail (parallelogram) method. Place the tail of the second phasor at the head of the first, then draw the resultant from the origin to the final head."
  },
  {
    id: 5,
    question: "In a three-phase system with correct phase sequence, what is the angular separation between phases?",
    options: ["90 degrees", "120 degrees", "180 degrees", "60 degrees"],
    correctAnswer: 1,
    explanation: "In a balanced three-phase system, the phases (L1, L2, L3) are separated by 120 degrees. With correct sequence (L1-L2-L3), each phase reaches its peak 120 degrees after the previous one."
  },
  {
    id: 6,
    question: "What happens to a three-phase motor if two phases are swapped?",
    options: ["It runs at half speed", "It runs in reverse direction", "It draws more current", "No effect"],
    correctAnswer: 1,
    explanation: "Swapping any two phases reverses the phase sequence, causing the motor to run in the opposite direction. This is critical for pumps, fans and conveyors where rotation direction matters."
  },
  {
    id: 7,
    question: "A motor has a power factor of 0.7 lagging. How can this be improved?",
    options: ["Add series inductance", "Add parallel capacitance", "Increase the load", "Reduce the supply voltage"],
    correctAnswer: 1,
    explanation: "Parallel capacitors provide leading reactive current that partially cancels the lagging reactive current of the motor. This reduces the overall phase angle and improves power factor towards unity."
  },
  {
    id: 8,
    question: "What is the resultant of two equal phasors at 90 degrees to each other?",
    options: ["Zero", "Twice the magnitude at 45 degrees", "Square root of 2 times magnitude at 45 degrees", "Same magnitude at 90 degrees"],
    correctAnswer: 2,
    explanation: "Using Pythagoras: resultant = sqrt(V squared + V squared) = V times sqrt(2) = 1.414V. The resultant bisects the angle, so it's at 45 degrees to both original phasors."
  },
  {
    id: 9,
    question: "Why do large induction motors require reduced voltage starting?",
    options: ["To improve power factor", "To limit starting current which can be 6-8 times full load current", "To increase starting torque", "To match supply frequency"],
    correctAnswer: 1,
    explanation: "Induction motors can draw 6-8 times full load current at start (locked rotor current). Star-delta or soft starters reduce voltage to limit starting current and prevent supply disturbance."
  },
  {
    id: 10,
    question: "What is the relationship between power factor and phase angle?",
    options: ["Power factor = sin(phi)", "Power factor = tan(phi)", "Power factor = cos(phi)", "Power factor = 1/phi"],
    correctAnswer: 2,
    explanation: "Power factor = cos(phi), where phi is the phase angle between voltage and current. Unity power factor (pf = 1) means phi = 0 degrees, i.e., voltage and current are in phase."
  }
];

const faqs = [
  {
    question: "Why do we use phasors instead of sine wave diagrams?",
    answer: "Phasors simplify AC circuit analysis. Instead of complex trigonometric equations with time-varying quantities, phasors reduce everything to simple vector addition and subtraction. The rotating nature of phasors (at supply frequency) captures all the information in a static diagram."
  },
  {
    question: "What causes lagging power factor in buildings?",
    answer: "Inductive loads cause lagging power factor: motors (lifts, HVAC, pumps), transformers, fluorescent lighting with magnetic ballasts, and welding equipment. In commercial buildings, motors typically account for 60-70% of the load, making power factor correction essential."
  },
  {
    question: "How does power factor correction save money?",
    answer: "Electricity suppliers charge penalties for poor power factor (typically below 0.95) because it requires them to supply more current for the same real power. Correcting power factor reduces maximum demand charges, network losses, and may allow existing cables and transformers to supply additional loads."
  },
  {
    question: "What is the difference between displacement and distortion power factor?",
    answer: "Displacement power factor is caused by phase shift between voltage and current fundamental frequencies (what we discuss here). Distortion power factor is caused by harmonic currents from non-linear loads (VFDs, LEDs, computers). Total power factor combines both effects."
  },
  {
    question: "Why is phase sequence important for three-phase motors?",
    answer: "Phase sequence determines motor rotation direction. L1-L2-L3 gives forward rotation, L1-L3-L2 gives reverse. For pumps, fans and conveyors, wrong rotation can cause damage (e.g., centrifugal pump running dry) or safety issues (conveyor moving wrong way)."
  },
  {
    question: "Can you have leading power factor?",
    answer: "Yes, capacitive loads create leading power factor where current leads voltage. This occurs with capacitor banks, long unloaded cables, and synchronous motors running over-excited. Some sites deliberately over-correct to offset network losses."
  }
];

const HNCModule3Section3_3 = () => {
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
            <span>Module 3.3.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Phase Difference and Vector Representation
          </h1>
          <p className="text-white/80">
            Understanding phasor diagrams and phase relationships for AC circuit analysis in building services
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Phase angle (phi):</strong> Angular displacement between V and I</li>
              <li className="pl-1"><strong>Leading:</strong> Current reaches peak before voltage (capacitive)</li>
              <li className="pl-1"><strong>Lagging:</strong> Current reaches peak after voltage (inductive)</li>
              <li className="pl-1"><strong>Phasors:</strong> Rotating vectors representing AC quantities</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Motors:</strong> Lagging power factor, starting current</li>
              <li className="pl-1"><strong>PFC capacitors:</strong> Correct lagging power factor</li>
              <li className="pl-1"><strong>Three-phase:</strong> 120-degree phase separation</li>
              <li className="pl-1"><strong>Phase sequence:</strong> Critical for motor rotation</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define phase angle and explain its significance in AC circuits",
              "Distinguish between leading and lagging current conditions",
              "Draw and interpret phasor diagrams for R, L, C circuits",
              "Add phasors graphically using vector methods",
              "Explain phase relationships in three-phase systems",
              "Calculate power factor from phase angle and vice versa",
              "Apply phase concepts to motor starting and capacitor correction"
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

        {/* Section 1: Phase Angle Definition */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Phase Angle - Definition and Measurement
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              In AC circuits, voltage and current do not always reach their peak values at the same instant.
              The <strong>phase angle (phi)</strong> measures this time difference as an angular displacement,
              typically expressed in degrees or radians.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Phase Angle Definition</p>
              <p className="text-center font-mono text-lg mb-2">phi = (delta t / T) x 360 degrees</p>
              <p className="text-xs text-white/70 text-center">Where delta t = time difference, T = period of one cycle</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key concepts:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>In phase:</strong> phi = 0 degrees - V and I peak together (resistive)</li>
                <li className="pl-1"><strong>Leading:</strong> phi positive - current peaks before voltage</li>
                <li className="pl-1"><strong>Lagging:</strong> phi negative - current peaks after voltage</li>
                <li className="pl-1">One complete cycle = 360 degrees = 2 pi radians</li>
                <li className="pl-1">At 50Hz, one cycle takes 20ms, so 1 degree = 0.056ms</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Phase Angle in Different Circuits</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Circuit Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Phase Angle (phi)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Power Factor</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Pure resistance</td>
                      <td className="border border-white/10 px-3 py-2">0 degrees</td>
                      <td className="border border-white/10 px-3 py-2">1.0 (unity)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Pure inductance</td>
                      <td className="border border-white/10 px-3 py-2">-90 degrees (lag)</td>
                      <td className="border border-white/10 px-3 py-2">0 (lagging)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Pure capacitance</td>
                      <td className="border border-white/10 px-3 py-2">+90 degrees (lead)</td>
                      <td className="border border-white/10 px-3 py-2">0 (leading)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">R-L (typical motor)</td>
                      <td className="border border-white/10 px-3 py-2">-30 to -40 degrees</td>
                      <td className="border border-white/10 px-3 py-2">0.75-0.85 lagging</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">R-C (PFC corrected)</td>
                      <td className="border border-white/10 px-3 py-2">-5 to -10 degrees</td>
                      <td className="border border-white/10 px-3 py-2">0.95-0.99 lagging</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Power factor = cos(phi). A smaller phase angle means higher power factor and more efficient use of the supply.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Leading and Lagging Currents */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Leading and Lagging Currents
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding whether current leads or lags voltage is essential for power factor correction
              and reactive power management in building services installations.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">The ELI the ICE Man Mnemonic</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-mono text-lg mb-1">ELI</p>
                  <p>In an <strong>L</strong> (inductor):</p>
                  <p><strong>E</strong> (voltage) leads <strong>I</strong> (current)</p>
                  <p className="text-white/70 mt-1">Current lags voltage by up to 90 degrees</p>
                </div>
                <div>
                  <p className="font-mono text-lg mb-1">ICE</p>
                  <p>In a <strong>C</strong> (capacitor):</p>
                  <p><strong>I</strong> (current) leads <strong>E</strong> (voltage)</p>
                  <p className="text-white/70 mt-1">Current leads voltage by up to 90 degrees</p>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-orange-400/80 mb-2">Lagging Current (Inductive)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Current peaks after voltage</li>
                  <li className="pl-1">Caused by magnetic field energy storage</li>
                  <li className="pl-1"><strong>Building loads:</strong> motors, transformers, fluorescent ballasts</li>
                  <li className="pl-1">Requires capacitors to correct</li>
                  <li className="pl-1">Most common in commercial/industrial</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-green-400/80 mb-2">Leading Current (Capacitive)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Current peaks before voltage</li>
                  <li className="pl-1">Caused by electric field energy storage</li>
                  <li className="pl-1"><strong>Building loads:</strong> PFC capacitors, lightly loaded cables</li>
                  <li className="pl-1">Requires inductors to correct (rare)</li>
                  <li className="pl-1">Less common - usually intentional</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Why Current Lags in Inductors</p>
              <p className="text-sm text-white/90">
                An inductor opposes changes in current. When voltage is applied, the magnetic field builds up,
                which opposes current flow. The current gradually increases, reaching its maximum 90 degrees
                (quarter cycle) after the voltage peak. This is why motors, which are essentially large
                inductors, have lagging power factor.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Why Current Leads in Capacitors</p>
              <p className="text-sm text-white/90">
                A capacitor allows current to flow freely when uncharged. Maximum current flows at the instant
                voltage begins rising (to charge the capacitor). As voltage reaches its peak, the capacitor
                is fully charged and current drops to zero. Current therefore peaks 90 degrees before voltage.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical tip:</strong> In most building services, you'll encounter lagging power factor because inductive motor loads dominate.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Vector/Phasor Representation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Vector and Phasor Representation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A <strong>phasor</strong> is a rotating vector that represents a sinusoidal quantity.
              Phasor diagrams simplify AC circuit analysis by converting time-varying sine waves
              into static vector diagrams.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Phasor properties:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Length:</strong> Represents the RMS magnitude of the quantity</li>
                <li className="pl-1"><strong>Angle:</strong> Represents the phase relative to a reference (usually voltage)</li>
                <li className="pl-1"><strong>Direction:</strong> Anti-clockwise rotation represents positive angle</li>
                <li className="pl-1"><strong>Rotation:</strong> Phasors rotate at angular frequency omega = 2 x pi x f</li>
                <li className="pl-1"><strong>Reference:</strong> Voltage is typically placed along the positive x-axis</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Standard Phasor Conventions</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-sm">
                <div className="p-3 rounded bg-black/30">
                  <p className="font-bold text-elec-yellow mb-1">Reference</p>
                  <p className="text-white/70 text-xs">Voltage at 0 degrees</p>
                </div>
                <div className="p-3 rounded bg-black/30">
                  <p className="font-bold text-green-400 mb-1">Leading</p>
                  <p className="text-white/70 text-xs">Anti-clockwise from V</p>
                </div>
                <div className="p-3 rounded bg-black/30">
                  <p className="font-bold text-orange-400 mb-1">Lagging</p>
                  <p className="text-white/70 text-xs">Clockwise from V</p>
                </div>
                <div className="p-3 rounded bg-black/30">
                  <p className="font-bold text-blue-400 mb-1">In Phase</p>
                  <p className="text-white/70 text-xs">Same direction as V</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Drawing Phasor Diagrams</p>
              <ol className="text-sm text-white space-y-1.5 list-decimal list-outside ml-5">
                <li className="pl-1">Draw the reference phasor (usually voltage) horizontally to the right</li>
                <li className="pl-1">Scale the length to represent RMS magnitude</li>
                <li className="pl-1">Draw current phasor at the appropriate angle:
                  <ul className="list-disc list-outside ml-5 mt-1">
                    <li>In phase: same direction as voltage</li>
                    <li>Lagging: rotated clockwise (below the reference)</li>
                    <li>Leading: rotated anti-clockwise (above the reference)</li>
                  </ul>
                </li>
                <li className="pl-1">Label phasors with their symbol and magnitude</li>
                <li className="pl-1">Mark the phase angle phi clearly</li>
              </ol>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Mathematical Representation</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Form</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Expression</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Use</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Polar</td>
                      <td className="border border-white/10 px-3 py-2">V angle phi or V at phi degrees</td>
                      <td className="border border-white/10 px-3 py-2">Multiplication, division</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Rectangular</td>
                      <td className="border border-white/10 px-3 py-2">a + jb</td>
                      <td className="border border-white/10 px-3 py-2">Addition, subtraction</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Conversion</td>
                      <td className="border border-white/10 px-3 py-2">a = V cos(phi), b = V sin(phi)</td>
                      <td className="border border-white/10 px-3 py-2">Between forms</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Note:</strong> j is used in electrical engineering (instead of i) to represent the square root of -1, as i already represents current.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Adding Phasors Graphically */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Adding Phasors Graphically
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              When combining AC quantities (such as voltages in series or currents in parallel),
              phasors must be added vectorially, not algebraically. The phase relationships
              determine whether quantities reinforce or partially cancel each other.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Head-to-Tail Method (Polygon Method)</p>
              <ol className="text-sm text-white space-y-1.5 list-decimal list-outside ml-5">
                <li className="pl-1">Draw the first phasor from the origin</li>
                <li className="pl-1">Draw the second phasor with its tail at the head of the first</li>
                <li className="pl-1">Maintain the correct angle for each phasor</li>
                <li className="pl-1">The resultant is drawn from the origin to the final head</li>
                <li className="pl-1">Measure the resultant length and angle</li>
              </ol>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Parallelogram Method (Two Phasors)</p>
              <ol className="text-sm text-white space-y-1.5 list-decimal list-outside ml-5">
                <li className="pl-1">Draw both phasors from a common origin</li>
                <li className="pl-1">Complete the parallelogram using parallel lines</li>
                <li className="pl-1">The diagonal from the origin is the resultant</li>
              </ol>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Special Cases</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium mb-1">In Phase (0 degrees)</p>
                  <p className="text-white/70">Resultant = V1 + V2</p>
                  <p className="text-white/70">Phasors simply add</p>
                </div>
                <div>
                  <p className="font-medium mb-1">Anti-Phase (180 degrees)</p>
                  <p className="text-white/70">Resultant = |V1 - V2|</p>
                  <p className="text-white/70">Phasors subtract</p>
                </div>
                <div>
                  <p className="font-medium mb-1">Quadrature (90 degrees)</p>
                  <p className="text-white/70">Resultant = sqrt(V1 squared + V2 squared)</p>
                  <p className="text-white/70">Pythagoras applies</p>
                </div>
                <div>
                  <p className="font-medium mb-1">General Case</p>
                  <p className="text-white/70">Use cosine rule or resolve into components</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Resolving into Components</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>For phasor V at angle theta:</p>
                <p className="mt-1">Horizontal component: Vx = V x cos(theta)</p>
                <p>Vertical component: Vy = V x sin(theta)</p>
                <p className="mt-2">To add two phasors:</p>
                <p>Resultant Vx = V1x + V2x</p>
                <p>Resultant Vy = V1y + V2y</p>
                <p className="mt-2">Magnitude = sqrt(Vx squared + Vy squared)</p>
                <p>Angle = arctan(Vy / Vx)</p>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Practical application:</strong> In three-phase systems, the line voltage is the phasor difference
              between two phase voltages, giving 400V = 230V x sqrt(3) from the 120-degree phase relationship.
            </p>
          </div>
        </section>

        {/* Section 5: Phase Relationships in R, L, C Circuits */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Phase Relationships in R, L, C Circuits
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Each circuit element creates a specific phase relationship between voltage and current.
              Understanding these relationships is essential for analysing practical circuits.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Resistor (R)</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Phase angle: phi = 0 degrees</li>
                  <li className="pl-1">V and I are in phase</li>
                  <li className="pl-1">V = IR (Ohm's Law)</li>
                  <li className="pl-1">Power = VI (all real power)</li>
                </ul>
                <div className="p-3 rounded bg-white/5 text-sm">
                  <p className="text-white/70">Building examples: heaters, incandescent lamps, resistive heating elements</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Inductor (L)</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Phase angle: phi = -90 degrees</li>
                  <li className="pl-1">Current lags voltage by 90 degrees</li>
                  <li className="pl-1">VL = I x XL where XL = 2 x pi x f x L</li>
                  <li className="pl-1">Power oscillates, average = 0 (reactive)</li>
                </ul>
                <div className="p-3 rounded bg-white/5 text-sm">
                  <p className="text-white/70">Building examples: motor windings, transformer cores, chokes, solenoid valves</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Capacitor (C)</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Phase angle: phi = +90 degrees</li>
                  <li className="pl-1">Current leads voltage by 90 degrees</li>
                  <li className="pl-1">VC = I x XC where XC = 1 / (2 x pi x f x C)</li>
                  <li className="pl-1">Power oscillates, average = 0 (reactive)</li>
                </ul>
                <div className="p-3 rounded bg-white/5 text-sm">
                  <p className="text-white/70">Building examples: PFC capacitors, motor run capacitors, filter capacitors</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Series R-L Circuit (Typical Motor)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Parameter</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Formula</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Impedance (Z)</td>
                      <td className="border border-white/10 px-3 py-2">sqrt(R squared + XL squared)</td>
                      <td className="border border-white/10 px-3 py-2">Total opposition to current</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Phase angle (phi)</td>
                      <td className="border border-white/10 px-3 py-2">arctan(XL / R)</td>
                      <td className="border border-white/10 px-3 py-2">Current lags (negative)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Power factor</td>
                      <td className="border border-white/10 px-3 py-2">cos(phi) = R / Z</td>
                      <td className="border border-white/10 px-3 py-2">Lagging</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Voltage phasors</td>
                      <td className="border border-white/10 px-3 py-2">V = sqrt(VR squared + VL squared)</td>
                      <td className="border border-white/10 px-3 py-2">VR and VL at 90 degrees</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key insight:</strong> In a series circuit, current is the reference phasor (same through all components). Voltage phasors are drawn relative to this common current.
            </p>
          </div>
        </section>

        {/* Section 6: Phase Sequence in Three-Phase Systems */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Phase Sequence in Three-Phase Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              In three-phase systems, the three phases (L1, L2, L3) are separated by 120 degrees.
              The <strong>phase sequence</strong> determines the order in which each phase reaches
              its positive peak, which is critical for motor rotation direction.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Three-Phase Relationships</p>
              <div className="grid grid-cols-3 gap-3 text-center text-sm">
                <div className="p-3 rounded bg-black/30">
                  <p className="font-bold text-red-400 mb-1">L1</p>
                  <p className="text-white/70 text-xs">Reference: 0 degrees</p>
                </div>
                <div className="p-3 rounded bg-black/30">
                  <p className="font-bold text-yellow-400 mb-1">L2</p>
                  <p className="text-white/70 text-xs">Lags L1 by 120 degrees</p>
                </div>
                <div className="p-3 rounded bg-black/30">
                  <p className="font-bold text-blue-400 mb-1">L3</p>
                  <p className="text-white/70 text-xs">Lags L1 by 240 degrees</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Phase sequence conventions:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Positive sequence (ABC or L1-L2-L3):</strong> Standard rotation, phases reach peak in order L1 then L2 then L3</li>
                <li className="pl-1"><strong>Negative sequence (ACB or L1-L3-L2):</strong> Reverse rotation, phases reach peak in order L1 then L3 then L2</li>
                <li className="pl-1">Swapping any two phases reverses the sequence</li>
                <li className="pl-1">Line voltage = sqrt(3) x phase voltage = 1.732 x 230V = 400V</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Phase Sequence Importance in Building Services</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Equipment</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Consequence of Wrong Sequence</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Centrifugal pumps</td>
                      <td className="border border-white/10 px-3 py-2">Run dry, overheat, mechanical damage</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Extract fans</td>
                      <td className="border border-white/10 px-3 py-2">Push instead of extract, ventilation failure</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lifts</td>
                      <td className="border border-white/10 px-3 py-2">Move in wrong direction, safety system trip</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Conveyor systems</td>
                      <td className="border border-white/10 px-3 py-2">Material moves wrong way, production issues</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Compressors</td>
                      <td className="border border-white/10 px-3 py-2">No compression, potential damage</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Phase Sequence Indicators</p>
              <p className="text-sm text-white/90">
                Always use a phase sequence indicator before connecting three-phase motors.
                Modern indicators show rotation direction with LED lights. The instrument is
                connected to L1, L2, L3 and indicates whether the sequence will give clockwise
                or anti-clockwise motor rotation.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Testing tip:</strong> After installation, briefly run motors unloaded to verify rotation before coupling to driven equipment.
            </p>
          </div>
        </section>

        {/* Section 7: Power Factor Relationship to Phase Angle */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Power Factor Relationship to Phase Angle
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Power factor is the cosine of the phase angle between voltage and current.
              It indicates what proportion of the apparent power (VA) is converted to
              useful work (Watts).
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Power Triangle</p>
              <div className="grid grid-cols-3 gap-3 text-center text-sm">
                <div className="p-3 rounded bg-black/30">
                  <p className="font-bold text-elec-yellow mb-1">P (kW)</p>
                  <p className="text-white/70 text-xs">Real power</p>
                  <p className="text-white/70 text-xs">Horizontal side</p>
                </div>
                <div className="p-3 rounded bg-black/30">
                  <p className="font-bold text-blue-400 mb-1">Q (kVAr)</p>
                  <p className="text-white/70 text-xs">Reactive power</p>
                  <p className="text-white/70 text-xs">Vertical side</p>
                </div>
                <div className="p-3 rounded bg-black/30">
                  <p className="font-bold text-purple-400 mb-1">S (kVA)</p>
                  <p className="text-white/70 text-xs">Apparent power</p>
                  <p className="text-white/70 text-xs">Hypotenuse</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Power Factor Equations</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Power factor = cos(phi) = P / S = kW / kVA</p>
                <p className="mt-2">Real power: P = V x I x cos(phi)</p>
                <p>Reactive power: Q = V x I x sin(phi)</p>
                <p>Apparent power: S = V x I = sqrt(P squared + Q squared)</p>
                <p className="mt-2">Phase angle: phi = arccos(pf) = arccos(kW / kVA)</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Power Factor Values</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Power Factor</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Phase Angle</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Interpretation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1.0 (unity)</td>
                      <td className="border border-white/10 px-3 py-2">0 degrees</td>
                      <td className="border border-white/10 px-3 py-2">All power is real - ideal</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">0.95</td>
                      <td className="border border-white/10 px-3 py-2">18.2 degrees</td>
                      <td className="border border-white/10 px-3 py-2">Typical target for PFC</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">0.85</td>
                      <td className="border border-white/10 px-3 py-2">31.8 degrees</td>
                      <td className="border border-white/10 px-3 py-2">Typical motor at full load</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">0.70</td>
                      <td className="border border-white/10 px-3 py-2">45.6 degrees</td>
                      <td className="border border-white/10 px-3 py-2">Lightly loaded motor</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">0.50</td>
                      <td className="border border-white/10 px-3 py-2">60 degrees</td>
                      <td className="border border-white/10 px-3 py-2">Poor - significant reactive power</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">0 (zero)</td>
                      <td className="border border-white/10 px-3 py-2">90 degrees</td>
                      <td className="border border-white/10 px-3 py-2">Pure reactive - no real power</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Why Power Factor Matters</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Supply capacity:</strong> Low pf means higher current for same real power</li>
                <li className="pl-1"><strong>Cable losses:</strong> I squared R losses increase with higher current</li>
                <li className="pl-1"><strong>Voltage drop:</strong> Higher current causes greater voltage drop</li>
                <li className="pl-1"><strong>Transformer sizing:</strong> Transformers rated in kVA, not kW</li>
                <li className="pl-1"><strong>Utility charges:</strong> Penalties applied for pf below 0.95</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Example:</strong> A 100kW load at 0.7 pf draws 143kVA (current for 143kVA). At 0.95 pf, it draws only 105kVA - a 26% reduction in current.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 8: Building Services Applications */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">08</span>
            Building Services: Motor Starting and Capacitor Effects
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Phase relationships have significant practical implications in building services,
              particularly for motor starting methods and power factor correction.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Motor Starting Current</p>
              <p className="text-sm text-white/90 mb-3">
                Induction motors draw very high starting current (locked rotor current) because
                the rotor is stationary. At standstill, the motor acts almost as a short-circuited
                transformer with very low impedance.
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Starting Method</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Starting Current</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Starting Torque</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Direct-on-line (DOL)</td>
                      <td className="border border-white/10 px-3 py-2">6-8 x FLC</td>
                      <td className="border border-white/10 px-3 py-2">100%</td>
                      <td className="border border-white/10 px-3 py-2">Small motors less than 7.5kW</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Star-delta</td>
                      <td className="border border-white/10 px-3 py-2">2-3 x FLC</td>
                      <td className="border border-white/10 px-3 py-2">33%</td>
                      <td className="border border-white/10 px-3 py-2">Pumps, fans (low starting load)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Soft starter</td>
                      <td className="border border-white/10 px-3 py-2">2-4 x FLC</td>
                      <td className="border border-white/10 px-3 py-2">Adjustable</td>
                      <td className="border border-white/10 px-3 py-2">General purpose, conveyors</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">VFD (Variable Frequency Drive)</td>
                      <td className="border border-white/10 px-3 py-2">1-1.5 x FLC</td>
                      <td className="border border-white/10 px-3 py-2">Adjustable</td>
                      <td className="border border-white/10 px-3 py-2">Speed control required</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Star-Delta Starting - Phase Relationships</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-yellow-400 mb-1">Star Connection (Start)</p>
                  <ul className="text-sm text-white/90 space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Each winding sees 230V (phase voltage)</li>
                    <li className="pl-1">Current reduced by factor of sqrt(3)</li>
                    <li className="pl-1">Power reduced to 1/3</li>
                    <li className="pl-1">Torque reduced to 1/3</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-green-400 mb-1">Delta Connection (Run)</p>
                  <ul className="text-sm text-white/90 space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Each winding sees 400V (line voltage)</li>
                    <li className="pl-1">Full rated current</li>
                    <li className="pl-1">Full power capability</li>
                    <li className="pl-1">Full torque available</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Power Factor Correction Capacitors</p>
              <p className="text-sm text-white/90 mb-3">
                Capacitors provide leading reactive current that cancels the lagging reactive
                current drawn by motors. This reduces the total current from the supply.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Required kVAr = kW x (tan(phi1) - tan(phi2))</p>
                <p className="mt-2">Where:</p>
                <p>phi1 = original phase angle = arccos(original pf)</p>
                <p>phi2 = target phase angle = arccos(target pf)</p>
                <p className="mt-2">Example: 100kW at 0.7 pf, improve to 0.95</p>
                <p>phi1 = arccos(0.7) = 45.6 degrees</p>
                <p>phi2 = arccos(0.95) = 18.2 degrees</p>
                <p>kVAr = 100 x (tan(45.6) - tan(18.2))</p>
                <p>kVAr = 100 x (1.02 - 0.33) = <strong>69 kVAr</strong></p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Capacitor Installation Options</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Location</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Advantages</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Disadvantages</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Individual motor</td>
                      <td className="border border-white/10 px-3 py-2">Reduces cable current, switched with motor</td>
                      <td className="border border-white/10 px-3 py-2">Higher total cost, many units to maintain</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Group correction</td>
                      <td className="border border-white/10 px-3 py-2">Lower cost per kVAr, easier maintenance</td>
                      <td className="border border-white/10 px-3 py-2">Distribution cables not relieved</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Central automatic</td>
                      <td className="border border-white/10 px-3 py-2">Lowest cost, adapts to load changes</td>
                      <td className="border border-white/10 px-3 py-2">No cable relief, complex control</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Capacitor Safety Warning</p>
              <ul className="text-sm text-white/90 space-y-1 list-disc list-outside ml-5">
                <li className="pl-1">Capacitors store dangerous charge - allow discharge time before working</li>
                <li className="pl-1">Never exceed motor no-load magnetising current with individual capacitors</li>
                <li className="pl-1">Self-excitation can occur if capacitor too large for motor</li>
                <li className="pl-1">Always use discharge resistors built into capacitor units</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design note:</strong> For individual motor correction, size capacitors at approximately 30-40% of motor kW rating to stay below magnetising current.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Phase Angle from Power Factor</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 22kW motor has a power factor of 0.82 lagging at full load. Calculate the phase angle and the reactive power drawn.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Phase angle: phi = arccos(0.82) = <strong>34.9 degrees lagging</strong></p>
                <p className="mt-2">Apparent power: S = P / pf = 22 / 0.82 = 26.83 kVA</p>
                <p className="mt-2">Reactive power: Q = S x sin(phi)</p>
                <p>Q = 26.83 x sin(34.9) = 26.83 x 0.572 = <strong>15.35 kVAr</strong></p>
                <p className="mt-2 text-white/60">Alternatively: Q = sqrt(S squared - P squared) = sqrt(26.83 squared - 22 squared) = 15.35 kVAr</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Adding Phasors</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Two currents of 10A at 0 degrees and 8A at 60 degrees flow into a junction. Find the resultant current.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Resolve into components:</p>
                <p>I1: I1x = 10 x cos(0) = 10A, I1y = 10 x sin(0) = 0A</p>
                <p>I2: I2x = 8 x cos(60) = 4A, I2y = 8 x sin(60) = 6.93A</p>
                <p className="mt-2">Total components:</p>
                <p>Ix = 10 + 4 = 14A</p>
                <p>Iy = 0 + 6.93 = 6.93A</p>
                <p className="mt-2">Resultant magnitude:</p>
                <p>I = sqrt(14 squared + 6.93 squared) = sqrt(196 + 48) = <strong>15.6A</strong></p>
                <p className="mt-2">Resultant angle:</p>
                <p>theta = arctan(6.93 / 14) = arctan(0.495) = <strong>26.3 degrees</strong></p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Power Factor Correction</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> An installation has a load of 150kW at 0.75 power factor lagging. Calculate the capacitor bank size needed to improve to 0.95 pf.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Original angle: phi1 = arccos(0.75) = 41.4 degrees</p>
                <p>Target angle: phi2 = arccos(0.95) = 18.2 degrees</p>
                <p className="mt-2">Required kVAr = kW x (tan(phi1) - tan(phi2))</p>
                <p>kVAr = 150 x (tan(41.4) - tan(18.2))</p>
                <p>kVAr = 150 x (0.882 - 0.329)</p>
                <p>kVAr = 150 x 0.553 = <strong>83 kVAr</strong></p>
                <p className="mt-2 text-white/60">Standard capacitor bank: 90 kVAr (next standard size up)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 4: Three-Phase Line Voltage</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Using phasor addition, show why three-phase line voltage is sqrt(3) times the phase voltage.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Line voltage VL1-L2 = V1 - V2 (phasor difference)</p>
                <p className="mt-2">V1 = Vp at 0 degrees = Vp</p>
                <p>V2 = Vp at -120 degrees</p>
                <p className="mt-2">Converting to rectangular:</p>
                <p>V1 = Vp + j0</p>
                <p>V2 = Vp x cos(-120) + j x Vp x sin(-120)</p>
                <p>V2 = -0.5Vp - j0.866Vp</p>
                <p className="mt-2">V1 - V2 = Vp - (-0.5Vp - j0.866Vp)</p>
                <p>V1 - V2 = 1.5Vp + j0.866Vp</p>
                <p className="mt-2">Magnitude = sqrt(1.5 squared + 0.866 squared) x Vp</p>
                <p>= sqrt(2.25 + 0.75) x Vp = sqrt(3) x Vp = <strong>1.732 x Vp</strong></p>
                <p className="mt-2 text-white/60">Therefore VL = sqrt(3) x Vp = 1.732 x 230 = 400V</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Essential Formulae</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Power factor = cos(phi)</strong> - phase angle to power factor</li>
                <li className="pl-1"><strong>phi = arccos(pf)</strong> - power factor to phase angle</li>
                <li className="pl-1"><strong>kVAr = kW x (tan(phi1) - tan(phi2))</strong> - capacitor sizing</li>
                <li className="pl-1"><strong>VL = sqrt(3) x Vph</strong> - line to phase voltage relationship</li>
                <li className="pl-1"><strong>Resultant = sqrt(Vx squared + Vy squared)</strong> - phasor magnitude</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Three-phase separation: <strong>120 degrees</strong></li>
                <li className="pl-1">sqrt(3) = <strong>1.732</strong></li>
                <li className="pl-1">Target power factor: <strong>0.95 or better</strong></li>
                <li className="pl-1">DOL starting current: <strong>6-8 x FLC</strong></li>
                <li className="pl-1">Star-delta starting current: <strong>1/3 of DOL</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Calculator mode:</strong> Ensure calculator is in degrees (not radians) for trigonometry</li>
                <li className="pl-1"><strong>Sign convention:</strong> Lagging = negative angle, leading = positive</li>
                <li className="pl-1"><strong>Adding phasors:</strong> Cannot simply add magnitudes - must use vector methods</li>
                <li className="pl-1"><strong>Oversizing capacitors:</strong> Can cause self-excitation and overvoltage</li>
                <li className="pl-1"><strong>Phase sequence:</strong> Always verify before connecting motors</li>
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
                <p className="font-medium text-white mb-1">Phase Relationships</p>
                <ul className="space-y-0.5">
                  <li>Resistor: phi = 0 degrees (in phase)</li>
                  <li>Inductor: phi = -90 degrees (I lags V)</li>
                  <li>Capacitor: phi = +90 degrees (I leads V)</li>
                  <li>Power factor = cos(phi)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Three-Phase</p>
                <ul className="space-y-0.5">
                  <li>Phase separation: 120 degrees</li>
                  <li>VL = sqrt(3) x Vph = 400V</li>
                  <li>L1-L2-L3: forward sequence</li>
                  <li>Swap any two: reverse rotation</li>
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
            <Link to="../h-n-c-module3-section3-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: RMS Values
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section3-4">
              Next: Impedance
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule3Section3_3;
