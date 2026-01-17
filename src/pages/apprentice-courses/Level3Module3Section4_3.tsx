/**
 * Level 3 Module 3 Section 4.3 - Phasor Diagrams and Vectors
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Phasor Diagrams and Vectors - Level 3 Module 3 Section 4.3";
const DESCRIPTION = "Master phasor representation of AC quantities, vector addition, and phase relationships essential for understanding AC circuit behaviour.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What does the length of a phasor represent?",
    options: [
      "The frequency of the waveform",
      "The magnitude (RMS or peak value) of the quantity",
      "The time period of one cycle",
      "The phase angle only"
    ],
    correctIndex: 1,
    explanation: "The length of a phasor represents the magnitude of the AC quantity - typically the RMS value. The angle of the phasor represents the phase relationship with respect to a reference."
  },
  {
    id: "check-2",
    question: "In an RL circuit, current lags voltage by the phase angle. How is this shown on a phasor diagram?",
    options: [
      "Current phasor is shorter than voltage phasor",
      "Current phasor is drawn clockwise from voltage phasor",
      "Current phasor is drawn anticlockwise from voltage phasor",
      "Both phasors are drawn vertically"
    ],
    correctIndex: 1,
    explanation: "When current lags voltage, the current phasor is drawn clockwise from the voltage phasor. Phasors rotate anticlockwise, so a lagging quantity appears behind (clockwise from) the reference."
  },
  {
    id: "check-3",
    question: "Two phasors of equal magnitude are 90 degrees apart. What is their resultant magnitude?",
    options: [
      "Equal to one of the phasors",
      "Double the magnitude of one phasor",
      "1.414 times the magnitude of one phasor",
      "Zero - they cancel out"
    ],
    correctIndex: 2,
    explanation: "Using Pythagoras: resultant = sqrt(A squared + A squared) = A x sqrt(2) = 1.414 x A. When phasors are at right angles, we use the root of sum of squares."
  },
  {
    id: "check-4",
    question: "What is the purpose of a reference phasor?",
    options: [
      "To show the maximum possible voltage",
      "To provide a fixed direction from which other phase angles are measured",
      "To indicate the frequency of the system",
      "To calculate power factor"
    ],
    correctIndex: 1,
    explanation: "The reference phasor (often voltage or current) is typically drawn horizontally and provides the zero-degree reference. All other phase angles are measured relative to this reference, either leading (anticlockwise) or lagging (clockwise)."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "In a purely capacitive circuit, current leads voltage by:",
    options: [
      "45 degrees",
      "90 degrees",
      "180 degrees",
      "0 degrees"
    ],
    correctAnswer: 1,
    explanation: "In a pure capacitor, current leads voltage by exactly 90 degrees. This is because current must flow to charge the capacitor before voltage builds up across it. Memory aid: ICE - In Capacitor, current leads EMF."
  },
  {
    id: 2,
    question: "On a phasor diagram, an anticlockwise rotation indicates:",
    options: [
      "A lagging phase relationship",
      "A leading phase relationship",
      "Decreasing frequency",
      "Increasing magnitude"
    ],
    correctAnswer: 1,
    explanation: "Anticlockwise rotation represents a leading phase angle. If phasor B is anticlockwise from reference phasor A, then B leads A. This matches the mathematical convention of positive angles being anticlockwise."
  },
  {
    id: 3,
    question: "Two voltages V1 = 100 V and V2 = 100 V are in phase with each other. What is their phasor sum?",
    options: [
      "100 V",
      "141 V",
      "200 V",
      "0 V"
    ],
    correctAnswer: 2,
    explanation: "When phasors are in phase (0 degrees apart), they add algebraically: 100 + 100 = 200 V. The resultant phasor has the same direction and the magnitudes simply add."
  },
  {
    id: 4,
    question: "What is the phasor sum of two equal voltages that are 180 degrees out of phase?",
    options: [
      "Double the magnitude",
      "The same magnitude",
      "Zero",
      "1.414 times the magnitude"
    ],
    correctAnswer: 2,
    explanation: "When two equal phasors are 180 degrees apart (antiphase), they point in opposite directions and completely cancel: the resultant is zero. This is important in balanced three-phase systems where line currents sum to zero."
  },
  {
    id: 5,
    question: "In an RL series circuit with R = XL, what is the phase angle between voltage and current?",
    options: [
      "0 degrees",
      "45 degrees",
      "60 degrees",
      "90 degrees"
    ],
    correctAnswer: 1,
    explanation: "Phase angle = arctan(XL/R). When XL = R, arctan(1) = 45 degrees. The current lags the voltage by 45 degrees. This is the midpoint between purely resistive (0 degrees) and purely inductive (90 degrees) behaviour."
  },
  {
    id: 6,
    question: "How are three-phase voltages represented on a phasor diagram?",
    options: [
      "Three phasors of equal length, all in the same direction",
      "Three phasors of equal length, 90 degrees apart",
      "Three phasors of equal length, 120 degrees apart",
      "Three phasors of different lengths, 120 degrees apart"
    ],
    correctAnswer: 2,
    explanation: "In a balanced three-phase system, the three voltages have equal magnitude and are displaced by 120 degrees from each other. This arrangement means their phasor sum is zero, which is a fundamental property of balanced three-phase."
  },
  {
    id: 7,
    question: "The horizontal component of a phasor represents:",
    options: [
      "The imaginary or reactive component",
      "The real or active component",
      "The phase angle",
      "The frequency"
    ],
    correctAnswer: 1,
    explanation: "In standard notation, the horizontal axis represents the real (active) component and the vertical axis represents the imaginary (reactive) component. The phasor's projection onto the horizontal axis gives the in-phase component."
  },
  {
    id: 8,
    question: "A voltage phasor has magnitude 100 V at 30 degrees. What is its horizontal component?",
    options: [
      "50 V",
      "70.7 V",
      "86.6 V",
      "100 V"
    ],
    correctAnswer: 2,
    explanation: "Horizontal component = V cos(theta) = 100 x cos(30) = 100 x 0.866 = 86.6 V. The horizontal component gives the real or in-phase portion of the phasor."
  },
  {
    id: 9,
    question: "In complex notation, a phasor at angle theta is written as:",
    options: [
      "V + theta",
      "V / theta",
      "V at angle theta",
      "V times theta"
    ],
    correctAnswer: 2,
    explanation: "Phasors are often written in polar form as V at angle theta (sometimes shown as V angle-symbol theta). This notation clearly shows both magnitude (V) and phase angle (theta). Rectangular form uses V = Vcos(theta) + jVsin(theta)."
  },
  {
    id: 10,
    question: "Why do phasors rotate anticlockwise rather than clockwise?",
    options: [
      "It's an arbitrary convention with no significance",
      "It matches the positive angle convention in mathematics",
      "Electrical current flows anticlockwise",
      "Generator rotors spin anticlockwise"
    ],
    correctAnswer: 1,
    explanation: "Anticlockwise rotation for positive angles is the standard mathematical convention. Since AC waveforms are represented by rotating phasors, adopting this convention ensures consistency with mathematical analysis and complex number theory."
  },
  {
    id: 11,
    question: "What happens to all phasors in a circuit if we double the supply frequency?",
    options: [
      "All phasors double in length",
      "All phasors rotate twice as fast",
      "The phase angles between phasors change",
      "The phasor diagram is unaffected"
    ],
    correctAnswer: 1,
    explanation: "Phasors represent rotating vectors at the supply frequency. Doubling frequency means they rotate twice as fast (omega = 2 pi f). However, the phase relationships between phasors in the same diagram remain unchanged - the whole diagram rotates faster."
  },
  {
    id: 12,
    question: "When adding phasors graphically, you should:",
    options: [
      "Draw them all from the same point and measure the longest",
      "Draw them nose-to-tail and measure from start to end",
      "Multiply their magnitudes together",
      "Average their angles"
    ],
    correctAnswer: 1,
    explanation: "Phasors add using the parallelogram or nose-to-tail (head-to-tail) method, just like vectors. Draw the second phasor starting from the tip of the first. The resultant is drawn from the origin to the final tip."
  }
];

const faqs = [
  {
    question: "Why do we use phasors instead of waveform diagrams?",
    answer: "Phasors simplify AC circuit analysis by representing sinusoids as rotating vectors. Instead of dealing with trigonometric functions that vary with time, we work with fixed-length arrows at specific angles. This makes adding or subtracting AC quantities straightforward - just add vectors. It also clearly shows phase relationships at a glance and enables the use of complex algebra for calculations."
  },
  {
    question: "What is the relationship between a phasor and its time-domain waveform?",
    answer: "A phasor is a snapshot of a rotating vector at one instant. The projection of this rotating phasor onto the vertical axis gives the instantaneous value at any time. As the phasor rotates at angular velocity omega = 2 pi f, its vertical projection traces out the sinusoidal waveform. The phasor length equals the peak (or RMS) value, and its angle shows where in the cycle we are."
  },
  {
    question: "How do you determine if a quantity is leading or lagging?",
    answer: "Compare the positions of phasors: if phasor A is anticlockwise from reference B, A leads B. If A is clockwise from B, A lags B. Practically, current leads voltage in capacitive circuits (ICE: In Capacitor, current leads EMF) and lags in inductive circuits (ELI: EMF leads current in Inductor). The phase angle determines how much lead or lag exists."
  },
  {
    question: "Can phasors be used for non-sinusoidal waveforms?",
    answer: "Phasors strictly apply only to sinusoidal quantities of the same frequency. For non-sinusoidal waveforms, we use Fourier analysis to decompose them into sinusoidal harmonics. Each harmonic can then be represented by its own phasor, but phasors at different frequencies cannot be directly combined - each frequency must be analysed separately, then results combined appropriately."
  },
  {
    question: "What is the j operator in phasor calculations?",
    answer: "The j operator (or i in mathematics) represents a 90-degree rotation. Multiplying by j rotates a phasor 90 degrees anticlockwise. j squared = -1, which represents 180 degrees rotation (reversal). This allows phasors to be expressed as complex numbers: Z = R + jX, where R is the real (horizontal) component and X is the imaginary (vertical) component."
  },
  {
    question: "How do phasor diagrams help with power factor?",
    answer: "The phase angle between voltage and current phasors directly relates to power factor: PF = cos(phi), where phi is this angle. On a phasor diagram, you can immediately see if current leads or lags voltage and by how much. A large angle means poor power factor; a small angle means good power factor. This visual representation helps in understanding and correcting power factor problems."
  }
];

const Level3Module3Section4_3 = () => {
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
            <span>Module 3.4.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Phasor Diagrams and Vectors
          </h1>
          <p className="text-white/80">
            Vector representation of AC quantities and phase relationships
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Phasor:</strong> Rotating vector representing AC quantity</li>
              <li><strong>Length:</strong> Represents magnitude (RMS value)</li>
              <li><strong>Angle:</strong> Represents phase relative to reference</li>
              <li><strong>Rotation:</strong> Anticlockwise = positive/leading</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Memory Aids</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>ELI:</strong> EMF leads I in inductors</li>
              <li><strong>ICE:</strong> I leads EMF in capacitors</li>
              <li><strong>Pure R:</strong> V and I in phase (0 degrees)</li>
              <li><strong>Pure L/C:</strong> 90 degrees phase shift</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Construct phasor diagrams for AC circuits",
              "Add and subtract phasors using vector methods",
              "Interpret phase relationships from diagrams",
              "Convert between polar and rectangular forms",
              "Apply phasor analysis to RL and RC circuits",
              "Understand three-phase phasor relationships"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Introduction to Phasors */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Introduction to Phasors
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A phasor is a rotating vector that represents a sinusoidal AC quantity. The length of the phasor indicates the magnitude (usually RMS value), while the angle shows the phase relationship with respect to a reference. Phasors simplify AC analysis by converting time-varying quantities into fixed vectors that can be manipulated algebraically.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key properties of phasors:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Magnitude:</strong> Length represents RMS (or peak) value of the quantity</li>
                <li><strong>Phase angle:</strong> Angular position relative to reference (usually horizontal)</li>
                <li><strong>Rotation:</strong> All phasors rotate anticlockwise at angular velocity omega = 2 pi f</li>
                <li><strong>Frequency:</strong> All phasors in a diagram must be at the same frequency</li>
              </ul>
            </div>

            <p>
              The reference phasor is typically drawn horizontally (at 0 degrees) and usually represents the supply voltage or the current in a series circuit. All other phase angles are measured from this reference: anticlockwise for leading quantities, clockwise for lagging quantities.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key insight:</strong> As a phasor rotates, its projection onto the vertical axis traces out the instantaneous value of the AC waveform. The phasor diagram is essentially a snapshot at one instant in time.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Phase Relationships */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Phase Relationships
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Phase relationships describe how AC quantities are displaced in time relative to each other. In resistive circuits, voltage and current are in phase. In inductive circuits, current lags voltage; in capacitive circuits, current leads voltage. These relationships are clearly visible on phasor diagrams.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Pure Resistance</p>
                <ul className="text-sm text-white space-y-1">
                  <li>V and I in phase</li>
                  <li>Phase angle = 0 degrees</li>
                  <li>Phasors overlap</li>
                  <li>Power factor = 1</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Pure Inductance</p>
                <ul className="text-sm text-white space-y-1">
                  <li>I lags V by 90 degrees</li>
                  <li>I phasor clockwise from V</li>
                  <li>ELI memory aid</li>
                  <li>Power factor = 0</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Pure Capacitance</p>
                <ul className="text-sm text-white space-y-1">
                  <li>I leads V by 90 degrees</li>
                  <li>I phasor anticlockwise from V</li>
                  <li>ICE memory aid</li>
                  <li>Power factor = 0</li>
                </ul>
              </div>
            </div>

            <p>
              In practical circuits with combinations of R, L, and C, the phase angle lies somewhere between 0 and 90 degrees. The exact angle depends on the relative values of resistance and reactance. An RL circuit has current lagging voltage by arctan(XL/R); an RC circuit has current leading by arctan(XC/R).
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Adding and Subtracting Phasors */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Adding and Subtracting Phasors
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Phasors add vectorially, not algebraically. Two voltages of 100 V each might produce a resultant of 200 V (if in phase), 0 V (if antiphase), or values in between depending on their phase relationship. The graphical method uses the parallelogram or nose-to-tail rule familiar from mechanics.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Vector addition methods:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Nose-to-tail:</strong> Draw second phasor from tip of first; resultant is from origin to final tip</li>
                <li><strong>Parallelogram:</strong> Draw both from origin; complete parallelogram; diagonal is resultant</li>
                <li><strong>Component method:</strong> Add horizontal and vertical components separately, then combine</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Worked Example:</strong> Add phasors V1 = 100 V at 0 degrees and V2 = 100 V at 90 degrees.
              <br />
              Horizontal: 100 + 0 = 100 V
              <br />
              Vertical: 0 + 100 = 100 V
              <br />
              Resultant = sqrt(100 squared + 100 squared) = 141.4 V at 45 degrees
            </p>

            <p>
              For subtraction, reverse the direction of the phasor being subtracted (add 180 degrees to its angle), then add normally. This is useful for finding voltage drops or current differences.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Complex Notation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Complex Notation and the j Operator
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Complex notation provides an algebraic method for phasor calculations. The horizontal axis represents the real component, and the vertical axis represents the imaginary component (multiplied by j). This allows phasors to be expressed as complex numbers: Z = R + jX.
            </p>

            <div className="grid grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Rectangular Form</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Z = a + jb</li>
                  <li>a = horizontal (real) component</li>
                  <li>b = vertical (imaginary) component</li>
                  <li>Good for addition/subtraction</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Polar Form</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Z = r at angle theta</li>
                  <li>r = magnitude = sqrt(a squared + b squared)</li>
                  <li>theta = angle = arctan(b/a)</li>
                  <li>Good for multiplication/division</li>
                </ul>
              </div>
            </div>

            <p>
              The j operator represents a 90-degree anticlockwise rotation. Key properties: j squared = -1 (180 degree rotation), j cubed = -j (270 degrees), j to the fourth = 1 (360 degrees, back to start). In electrical engineering, j is used instead of i to avoid confusion with current.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Conversion formulas:</strong> From rectangular to polar: magnitude = sqrt(a squared + b squared), angle = arctan(b/a). From polar to rectangular: a = r cos(theta), b = r sin(theta).
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Drawing Phasor Diagrams</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Choose a clear reference (usually voltage for parallel circuits, current for series)</li>
                <li>Draw the reference phasor horizontally to the right</li>
                <li>Use consistent scale for magnitude</li>
                <li>Mark angles clearly, measured from the reference</li>
                <li>Label each phasor with its quantity symbol and value</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Three-Phase Phasor Diagrams</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Three phasors of equal length, 120 degrees apart</li>
                <li>Phase sequence typically L1-L2-L3 anticlockwise</li>
                <li>Balanced three-phase: phasor sum = zero</li>
                <li>Line voltage phasors form a larger triangle</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Adding algebraically:</strong> Remember 100 V + 100 V is not always 200 V</li>
                <li><strong>Mixing frequencies:</strong> Phasors at different frequencies cannot be on the same diagram</li>
                <li><strong>Wrong rotation direction:</strong> Leading is anticlockwise, lagging is clockwise</li>
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
                <p className="font-medium text-white mb-1">Phase Relationships</p>
                <ul className="space-y-0.5">
                  <li>Pure R: V and I in phase</li>
                  <li>Pure L: I lags V by 90 deg</li>
                  <li>Pure C: I leads V by 90 deg</li>
                  <li>RL: I lags V by arctan(XL/R)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">j Operator Properties</p>
                <ul className="space-y-0.5">
                  <li>j = 90 deg rotation</li>
                  <li>j squared = -1 (180 deg)</li>
                  <li>j cubed = -j (270 deg)</li>
                  <li>j to fourth = 1 (360 deg)</li>
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
            <Link to="/study-centre/apprentice/level3-module3-section4-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Frequency, Period and Amplitude
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module3-section4-4">
              Next: Impedance and Admittance
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module3Section4_3;
