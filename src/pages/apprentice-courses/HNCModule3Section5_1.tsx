import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Principles of Electromagnetic Induction - HNC Module 3 Section 5.1";
const DESCRIPTION = "Master electromagnetic induction for building services: Faraday's law, Lenz's law, transformer EMF, inductance, eddy currents and practical applications in generators, motors and transformers.";

const quickCheckQuestions = [
  {
    id: "faraday-law",
    question: "According to Faraday's law, what determines the magnitude of induced EMF?",
    options: ["The strength of the magnetic field", "The rate of change of magnetic flux", "The resistance of the conductor", "The area of the coil"],
    correctIndex: 1,
    explanation: "Faraday's law states that the induced EMF is proportional to the rate of change of magnetic flux linkage: e = -N(d\u03A6/dt). Faster changes produce larger EMFs."
  },
  {
    id: "lenz-law",
    question: "Lenz's law states that the induced current will:",
    options: ["Flow in the same direction as the applied field", "Create a field that opposes the change causing it", "Always be alternating current", "Be proportional to the conductor length"],
    correctIndex: 1,
    explanation: "Lenz's law states that the direction of induced current is such that it opposes the change in flux that caused it. This is why there is a negative sign in e = -N(d\u03A6/dt)."
  },
  {
    id: "motional-emf",
    question: "A 0.5m conductor moves at 10 m/s through a 0.8T magnetic field. What is the induced EMF?",
    options: ["0.4V", "4V", "8V", "40V"],
    correctIndex: 1,
    explanation: "Using e = Blv: e = 0.8T \u00d7 0.5m \u00d7 10m/s = 4V. This is the motional EMF equation for a conductor cutting magnetic field lines."
  },
  {
    id: "transformer-emf",
    question: "A transformer primary has 500 turns. If the flux changes by 0.02Wb in 0.01s, what is the induced EMF?",
    options: ["10V", "100V", "500V", "1000V"],
    correctIndex: 3,
    explanation: "Using e = -N(d\u03A6/dt): e = 500 \u00d7 (0.02/0.01) = 500 \u00d7 2 = 1000V. The negative sign indicates direction per Lenz's law."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the fundamental principle discovered by Faraday?",
    options: [
      "Electric current produces a magnetic field",
      "A changing magnetic field induces an EMF in a conductor",
      "Like poles repel and unlike poles attract",
      "Resistance is proportional to length"
    ],
    correctAnswer: 1,
    explanation: "Faraday discovered that a changing magnetic field (or relative motion between a conductor and field) induces an electromotive force (EMF) in the conductor. This is the basis of all generators and transformers."
  },
  {
    id: 2,
    question: "A conductor of length 0.4m moves at 15 m/s perpendicular to a magnetic field of 1.2T. What EMF is induced?",
    options: ["4.8V", "7.2V", "12V", "18V"],
    correctAnswer: 1,
    explanation: "Using motional EMF formula: e = Blv = 1.2 \u00d7 0.4 \u00d7 15 = 7.2V"
  },
  {
    id: 3,
    question: "Why does a transformer core use laminations rather than solid iron?",
    options: [
      "To reduce weight",
      "To reduce eddy current losses",
      "To increase magnetic flux",
      "To improve cooling"
    ],
    correctAnswer: 1,
    explanation: "Laminations break up the paths for eddy currents, dramatically reducing I\u00b2R losses. Solid cores would allow large circulating currents that waste energy as heat."
  },
  {
    id: 4,
    question: "The negative sign in Faraday's law (e = -N d\u03A6/dt) represents:",
    options: [
      "Power loss in the circuit",
      "Lenz's law - opposition to change",
      "The phase angle of AC",
      "Magnetic reluctance"
    ],
    correctAnswer: 1,
    explanation: "The negative sign represents Lenz's law: the induced EMF acts in a direction to oppose the change in flux that caused it. This is a consequence of energy conservation."
  },
  {
    id: 5,
    question: "What is flux linkage?",
    options: [
      "The magnetic field strength times area",
      "The total flux through a coil multiplied by number of turns",
      "The rate of change of flux",
      "The permeability of the core material"
    ],
    correctAnswer: 1,
    explanation: "Flux linkage (\u039b or N\u03A6) is the product of magnetic flux and the number of turns it links. It determines the total EMF induced in a multi-turn coil."
  },
  {
    id: 6,
    question: "A 200-turn coil has its flux changed from 0.05Wb to 0.02Wb in 0.1s. What is the average induced EMF?",
    options: ["6V", "60V", "100V", "600V"],
    correctAnswer: 1,
    explanation: "e = -N(d\u03A6/dt) = -200 \u00d7 (0.02 - 0.05)/0.1 = -200 \u00d7 (-0.03)/0.1 = -200 \u00d7 (-0.3) = 60V (magnitude)"
  },
  {
    id: 7,
    question: "Self-inductance is measured in:",
    options: ["Ohms", "Farads", "Henrys", "Webers"],
    correctAnswer: 2,
    explanation: "Self-inductance is measured in Henrys (H). 1 Henry means that a current change of 1A/s induces an EMF of 1V in the coil."
  },
  {
    id: 8,
    question: "In a building services installation, which equipment relies on electromagnetic induction?",
    options: [
      "LED lighting",
      "Transformers and motors",
      "Socket outlets",
      "Earth electrodes"
    ],
    correctAnswer: 1,
    explanation: "Transformers (voltage conversion), motors (mechanical work from electricity), and generators (electricity from mechanical work) all operate on electromagnetic induction principles."
  },
  {
    id: 9,
    question: "What happens when a conductor moves parallel to magnetic field lines?",
    options: [
      "Maximum EMF is induced",
      "No EMF is induced",
      "The conductor heats up",
      "The field is strengthened"
    ],
    correctAnswer: 1,
    explanation: "EMF is only induced when the conductor cuts across field lines. Moving parallel to the field produces no flux change and therefore no induced EMF."
  },
  {
    id: 10,
    question: "Mutual inductance between two coils depends on:",
    options: [
      "Only the number of turns in the primary",
      "Only the current flowing",
      "The coupling between the coils and their turns",
      "The resistance of the windings"
    ],
    correctAnswer: 2,
    explanation: "Mutual inductance M depends on the number of turns in both coils, the core material (permeability), and how much flux from one coil links with the other (coupling coefficient)."
  }
];

const faqs = [
  {
    question: "Why is electromagnetic induction important in building services?",
    answer: "Electromagnetic induction is the operating principle behind transformers (voltage conversion for distribution, bell transformers, LED drivers), motors (HVAC fans, pumps, lifts), generators (standby power), and induction heating. Understanding these principles is essential for specifying, installing and troubleshooting this equipment."
  },
  {
    question: "What is the difference between self-inductance and mutual inductance?",
    answer: "Self-inductance is when a changing current in a coil induces an EMF in the same coil (back-EMF). Mutual inductance is when a changing current in one coil induces an EMF in a nearby coil - this is the transformer principle. Both are measured in Henrys."
  },
  {
    question: "Why do motors draw high current at start-up?",
    answer: "When a motor is stationary, there is no back-EMF to oppose the supply voltage. The current is limited only by the winding resistance, which is low. As the motor accelerates, increasing back-EMF reduces the net voltage and hence the current. This is why motor circuits need higher rated protective devices."
  },
  {
    question: "How do eddy currents affect transformer efficiency?",
    answer: "Eddy currents are circulating currents induced in the transformer core by the changing magnetic field. They cause I\u00b2R heating losses (eddy current losses). Laminating the core with thin, insulated sheets restricts eddy current paths and reduces these losses significantly."
  },
  {
    question: "What determines the direction of induced current?",
    answer: "Lenz's law determines direction: the induced current flows in a direction that opposes the change causing it. Alternatively, use Fleming's right-hand rule for generators: thumb = motion, first finger = field, second finger = induced current direction."
  },
  {
    question: "Why are transformers rated in kVA rather than kW?",
    answer: "Transformers must be sized for the apparent power (VA) they carry, regardless of power factor. The core and windings must handle the current associated with the VA rating. The actual useful power (kW) depends on the load's power factor, which the transformer cannot control."
  }
];

const HNCModule3Section5_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section5">
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
            <Zap className="h-4 w-4" />
            <span>Module 3.5.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Principles of Electromagnetic Induction
          </h1>
          <p className="text-white/80">
            The fundamental principles behind generators, transformers and motors in building services
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Faraday's law:</strong> e = -N(d&#934;/dt) - EMF from changing flux</li>
              <li className="pl-1"><strong>Lenz's law:</strong> Induced current opposes the change</li>
              <li className="pl-1"><strong>Motional EMF:</strong> e = Blv for moving conductors</li>
              <li className="pl-1"><strong>Inductance:</strong> Opposition to current change (Henrys)</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Generators:</strong> Standby power, wind turbines</li>
              <li className="pl-1"><strong>Transformers:</strong> Voltage conversion, isolation</li>
              <li className="pl-1"><strong>Motors:</strong> HVAC, pumps, lifts, conveyors</li>
              <li className="pl-1"><strong>Eddy currents:</strong> Losses, braking, heating</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "State and apply Faraday's law of electromagnetic induction",
              "Apply Lenz's law to determine direction of induced EMF",
              "Calculate motional EMF using e = Blv",
              "Calculate transformer EMF using e = -N(d\u03A6/dt)",
              "Explain self and mutual inductance in practical terms",
              "Describe eddy current effects and mitigation methods",
              "Relate induction principles to building services equipment"
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

        {/* Section 1: Faraday's Law */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Faraday's Law of Electromagnetic Induction
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Michael Faraday's 1831 discovery that a changing magnetic field induces an electromotive force
              (EMF) in a conductor revolutionised electrical engineering. This principle underlies all
              generators, transformers and induction motors.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Faraday's Law Statement</p>
              <p className="font-mono text-center text-lg mb-2">e = -N &#215; (d&#934;/dt)</p>
              <div className="text-sm text-white/70 text-center space-y-1">
                <p>e = induced EMF (Volts)</p>
                <p>N = number of turns in the coil</p>
                <p>d&#934;/dt = rate of change of magnetic flux (Wb/s)</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key principles:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">EMF is induced only when flux through the coil is changing</li>
                <li className="pl-1">Greater rate of change produces greater EMF</li>
                <li className="pl-1">More turns means more EMF for the same flux change</li>
                <li className="pl-1">The negative sign represents Lenz's law (opposition to change)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Methods of Inducing EMF</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Method</th>
                      <th className="border border-white/10 px-3 py-2 text-left">How Flux Changes</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Moving conductor</td>
                      <td className="border border-white/10 px-3 py-2">Conductor cuts field lines</td>
                      <td className="border border-white/10 px-3 py-2">Generators</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Moving magnet</td>
                      <td className="border border-white/10 px-3 py-2">Field moves relative to coil</td>
                      <td className="border border-white/10 px-3 py-2">Dynamos, sensors</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Varying current</td>
                      <td className="border border-white/10 px-3 py-2">Electromagnet field changes</td>
                      <td className="border border-white/10 px-3 py-2">Transformers</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Rotating coil</td>
                      <td className="border border-white/10 px-3 py-2">Coil angle to field varies</td>
                      <td className="border border-white/10 px-3 py-2">AC generators</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> No change in flux = no induced EMF. Static conditions produce no induction regardless of field strength.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Lenz's Law */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Lenz's Law and Direction of Induced EMF
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Lenz's law provides the direction of the induced EMF and current. It states that the induced
              current will flow in a direction that opposes the change in flux that caused it.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Lenz's Law Statement</p>
              <p className="text-center italic mb-2">
                "The direction of the induced EMF is such that it opposes the change producing it."
              </p>
              <p className="text-sm text-white/70 text-center">
                This is a consequence of energy conservation - energy cannot be created from nothing.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Practical implications:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">If flux increases, induced current creates an opposing field</li>
                <li className="pl-1">If flux decreases, induced current tries to maintain it</li>
                <li className="pl-1">Moving a magnet toward a coil induces repelling current</li>
                <li className="pl-1">Moving a magnet away induces attracting current</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fleming's Right-Hand Rule (Generators)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Thumb:</strong> Motion of conductor</li>
                  <li className="pl-1"><strong>First finger:</strong> Field direction (N to S)</li>
                  <li className="pl-1"><strong>Second finger:</strong> Induced current direction</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Energy Consideration</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Opposition requires work to overcome</li>
                  <li className="pl-1">Mechanical energy converts to electrical</li>
                  <li className="pl-1">Conservation of energy is maintained</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key insight:</strong> Without Lenz's law, a generator would accelerate itself - violating conservation of energy.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Flux Linkage */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Flux Linkage and Rate of Change
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Flux linkage combines the concepts of magnetic flux and coil turns to give the total
              flux linked with a coil. It is the key quantity in determining induced EMF.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Flux Linkage Definition</p>
              <p className="font-mono text-center text-lg mb-2">&#923; = N &#215; &#934;</p>
              <div className="text-sm text-white/70 text-center space-y-1">
                <p>&#923; (Lambda, flux linkage) = Weber-turns (Wb-turns)</p>
                <p>N = number of turns</p>
                <p>&#934; = magnetic flux through one turn (Wb)</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Magnetic flux basics:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>&#934; = B &#215; A &#215; cos(&#952;)</strong> - flux through an area</li>
                <li className="pl-1">B = magnetic flux density (Tesla)</li>
                <li className="pl-1">A = area perpendicular to field (m&#178;)</li>
                <li className="pl-1">&#952; = angle between field and normal to area</li>
                <li className="pl-1">Maximum flux when field is perpendicular to area (&#952; = 0)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Faraday's Law Using Flux Linkage</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-mono text-center mb-1">e = -d&#923;/dt</p>
                  <p className="text-white/70 text-xs text-center">EMF equals rate of change of flux linkage</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-mono text-center mb-1">e = -(&#923;&#8322; - &#923;&#8321;) / t</p>
                  <p className="text-white/70 text-xs text-center">For average EMF over time interval t</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical note:</strong> Doubling either the turns or the rate of flux change doubles the induced EMF.
            </p>
          </div>
        </section>

        {/* Section 4: Motional EMF */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Motional EMF: e = Blv
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              When a conductor moves through a magnetic field, cutting field lines, an EMF is induced
              along its length. This is the basis of all rotating generators.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Motional EMF Equation</p>
              <p className="font-mono text-center text-lg mb-2">e = B &#215; l &#215; v</p>
              <div className="text-sm text-white/70 text-center space-y-1">
                <p>e = induced EMF (Volts)</p>
                <p>B = magnetic flux density (Tesla)</p>
                <p>l = length of conductor in field (metres)</p>
                <p>v = velocity of conductor (m/s)</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Conditions for maximum EMF:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Conductor moves perpendicular to field lines</li>
                <li className="pl-1">Conductor length is perpendicular to both field and motion</li>
                <li className="pl-1">If motion is at angle &#952;: e = Blv &#215; sin(&#952;)</li>
                <li className="pl-1">Parallel motion produces zero EMF</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Generator Applications</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Generator Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Motion</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Building Services Use</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Diesel generator</td>
                      <td className="border border-white/10 px-3 py-2">Rotating coil in field</td>
                      <td className="border border-white/10 px-3 py-2">Standby power systems</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Wind turbine</td>
                      <td className="border border-white/10 px-3 py-2">Rotating magnetic field</td>
                      <td className="border border-white/10 px-3 py-2">Renewable generation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Vehicle alternator</td>
                      <td className="border border-white/10 px-3 py-2">Belt-driven rotor</td>
                      <td className="border border-white/10 px-3 py-2">Mobile equipment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Micro-hydro</td>
                      <td className="border border-white/10 px-3 py-2">Water-driven turbine</td>
                      <td className="border border-white/10 px-3 py-2">Remote installations</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>AC generation:</strong> As a coil rotates, v sin(&#952;) varies sinusoidally, producing AC output naturally.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 5: Transformer EMF */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Transformer EMF: e = -N(d&#934;/dt)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Transformers use electromagnetic induction without any moving parts. An alternating current
              in the primary winding creates a changing magnetic flux that induces an EMF in the secondary winding.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Transformer EMF Equations</p>
              <div className="grid sm:grid-cols-2 gap-4 text-center">
                <div>
                  <p className="font-mono text-lg mb-1">e&#8321; = -N&#8321; &#215; (d&#934;/dt)</p>
                  <p className="text-xs text-white/70">Primary EMF</p>
                </div>
                <div>
                  <p className="font-mono text-lg mb-1">e&#8322; = -N&#8322; &#215; (d&#934;/dt)</p>
                  <p className="text-xs text-white/70">Secondary EMF</p>
                </div>
              </div>
              <p className="text-sm text-white/70 text-center mt-3">
                Same flux links both windings, so: e&#8322;/e&#8321; = N&#8322;/N&#8321;
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Transformer voltage relationship:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>V&#8322;/V&#8321; = N&#8322;/N&#8321;</strong> - voltage ratio equals turns ratio</li>
                <li className="pl-1">Step-up: N&#8322; &gt; N&#8321; gives V&#8322; &gt; V&#8321;</li>
                <li className="pl-1">Step-down: N&#8322; &lt; N&#8321; gives V&#8322; &lt; V&#8321;</li>
                <li className="pl-1">Ideal transformer: V&#8321;I&#8321; = V&#8322;I&#8322; (power conserved)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Transformers in Building Services</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Ratio</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Distribution transformer</td>
                      <td className="border border-white/10 px-3 py-2">11kV:400V</td>
                      <td className="border border-white/10 px-3 py-2">HV to LV supply</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Bell transformer</td>
                      <td className="border border-white/10 px-3 py-2">230V:8V</td>
                      <td className="border border-white/10 px-3 py-2">Door bells, chimes</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Isolating transformer</td>
                      <td className="border border-white/10 px-3 py-2">1:1</td>
                      <td className="border border-white/10 px-3 py-2">Safety isolation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">LED driver</td>
                      <td className="border border-white/10 px-3 py-2">230V:12V/24V</td>
                      <td className="border border-white/10 px-3 py-2">Low voltage lighting</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Site transformer (CTE)</td>
                      <td className="border border-white/10 px-3 py-2">230V:110V</td>
                      <td className="border border-white/10 px-3 py-2">55-0-55V for safety</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Important:</strong> Transformers only work with AC. DC produces constant flux and therefore no induced EMF.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 6: Self and Mutual Inductance */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Self and Mutual Inductance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Inductance quantifies the ability of a circuit to oppose changes in current. Self-inductance
              relates to a single coil; mutual inductance relates to coupling between two coils.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Self-Inductance (L)</p>
                <p className="font-mono text-center text-lg mb-2">e = -L &#215; (di/dt)</p>
                <div className="text-xs text-white/70 space-y-1">
                  <p>L = self-inductance (Henrys)</p>
                  <p>di/dt = rate of change of current</p>
                  <p>e = back-EMF opposing change</p>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Mutual Inductance (M)</p>
                <p className="font-mono text-center text-lg mb-2">e&#8322; = -M &#215; (di&#8321;/dt)</p>
                <div className="text-xs text-white/70 space-y-1">
                  <p>M = mutual inductance (Henrys)</p>
                  <p>di&#8321;/dt = rate of change in coil 1</p>
                  <p>e&#8322; = EMF induced in coil 2</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Inductance properties:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Unit: Henry (H) - 1H induces 1V when current changes at 1A/s</li>
                <li className="pl-1">Increases with: more turns, larger area, magnetic core material</li>
                <li className="pl-1">L proportional to N&#178; (doubling turns quadruples L)</li>
                <li className="pl-1">Stored energy: E = 0.5 &#215; L &#215; I&#178;</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Practical Effects of Inductance</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Effect</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Cause</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Practical Impact</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Motor back-EMF</td>
                      <td className="border border-white/10 px-3 py-2">Self-inductance of windings</td>
                      <td className="border border-white/10 px-3 py-2">Limits running current</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Inductive reactance</td>
                      <td className="border border-white/10 px-3 py-2">Opposition to AC</td>
                      <td className="border border-white/10 px-3 py-2">X&#8343; = 2&#960;fL (Ohms)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Switch arcing</td>
                      <td className="border border-white/10 px-3 py-2">Stored energy release</td>
                      <td className="border border-white/10 px-3 py-2">Contact wear, EMC issues</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lagging power factor</td>
                      <td className="border border-white/10 px-3 py-2">Current lags voltage</td>
                      <td className="border border-white/10 px-3 py-2">Reactive power demand</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design note:</strong> High mutual inductance with minimal leakage flux is the goal for efficient transformers.
            </p>
          </div>
        </section>

        {/* Section 7: Eddy Currents */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Eddy Currents and Their Effects
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Eddy currents are circulating currents induced in conducting materials by changing
              magnetic fields. They can cause unwanted losses or be harnessed for useful applications.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Eddy Current Formation</p>
              <p className="text-sm text-white/90">
                When a changing magnetic field passes through a conductor, EMF is induced throughout the
                material. This drives circulating currents (eddies) that follow closed loops within the conductor,
                generating heat through I&#178;R losses.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-red-400/80 mb-2">Unwanted Effects (Losses)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Transformer core heating</li>
                  <li className="pl-1">Motor and generator core losses</li>
                  <li className="pl-1">Efficiency reduction</li>
                  <li className="pl-1">Overheating of metal enclosures</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-green-400/80 mb-2">Useful Applications</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Induction heating (cooking, furnaces)</li>
                  <li className="pl-1">Electromagnetic braking (trains, rides)</li>
                  <li className="pl-1">Metal detectors</li>
                  <li className="pl-1">Damping in instruments</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Reducing Eddy Current Losses</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Method</th>
                      <th className="border border-white/10 px-3 py-2 text-left">How It Works</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Laminated cores</td>
                      <td className="border border-white/10 px-3 py-2">Thin sheets restrict eddy paths</td>
                      <td className="border border-white/10 px-3 py-2">Transformers, motors</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Silicon steel</td>
                      <td className="border border-white/10 px-3 py-2">Higher resistivity reduces currents</td>
                      <td className="border border-white/10 px-3 py-2">Power transformers</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ferrite cores</td>
                      <td className="border border-white/10 px-3 py-2">Non-conductive magnetic material</td>
                      <td className="border border-white/10 px-3 py-2">High-frequency transformers</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Non-magnetic enclosures</td>
                      <td className="border border-white/10 px-3 py-2">No field interaction</td>
                      <td className="border border-white/10 px-3 py-2">Switchgear, cable routes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Eddy current loss factors:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Losses proportional to frequency squared (f&#178;)</li>
                <li className="pl-1">Losses proportional to flux density squared (B&#178;)</li>
                <li className="pl-1">Losses proportional to lamination thickness squared</li>
                <li className="pl-1">Typical lamination thickness: 0.35mm to 0.5mm for 50Hz</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical example:</strong> A solid core transformer would waste 20-30% of energy as heat; lamination reduces this to 1-2%.
            </p>
          </div>
        </section>

        {/* Section 8: Building Services Applications */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">08</span>
            Building Services: Generators, Motors, Transformers
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electromagnetic induction principles are applied extensively in building services
              installations. Understanding these principles aids specification, installation and fault diagnosis.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Generators in Building Services</p>
              <div className="p-4 rounded-lg bg-white/5 space-y-3">
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Standby generators:</strong> Essential for hospitals, data centres, high-rise buildings</li>
                  <li className="pl-1"><strong>Operating principle:</strong> Diesel engine rotates field or armature, inducing AC in windings</li>
                  <li className="pl-1"><strong>Output:</strong> Typically 400V three-phase, 50Hz (synchronised to mains frequency)</li>
                  <li className="pl-1"><strong>Sizing:</strong> Must account for motor starting currents (up to 6&#215; running current)</li>
                  <li className="pl-1"><strong>AVR (Automatic Voltage Regulator):</strong> Maintains output voltage by adjusting field current</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Motors in Building Services</p>
              <div className="p-4 rounded-lg bg-white/5 space-y-3">
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Induction motors:</strong> Most common type - rotating magnetic field induces rotor current</li>
                  <li className="pl-1"><strong>Applications:</strong> HVAC fans, pumps, compressors, lifts, escalators</li>
                  <li className="pl-1"><strong>Back-EMF:</strong> Generated by rotor motion, reduces net voltage and hence current</li>
                  <li className="pl-1"><strong>Starting current:</strong> 6-8&#215; full load current (no back-EMF when stationary)</li>
                  <li className="pl-1"><strong>VSD control:</strong> Variable Speed Drives control motor speed by varying frequency</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Transformers in Building Services</p>
              <div className="p-4 rounded-lg bg-white/5 space-y-3">
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Distribution:</strong> 11kV/400V for large buildings, on-site substation</li>
                  <li className="pl-1"><strong>Isolation:</strong> Medical locations (IT systems), bathrooms, swimming pools</li>
                  <li className="pl-1"><strong>SELV:</strong> 230V/12V or 24V for bathroom lighting, garden lighting</li>
                  <li className="pl-1"><strong>Control:</strong> 230V/24V for BMS, fire alarm, access control</li>
                  <li className="pl-1"><strong>CTE:</strong> 230V/110V (55-0-55V) for construction site tools</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Installation Considerations</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Equipment</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Induction Effect</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Installation Requirement</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Large motors</td>
                      <td className="border border-white/10 px-3 py-2">High starting current</td>
                      <td className="border border-white/10 px-3 py-2">Suitably rated MCB/fuses, consider soft-start</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Transformers</td>
                      <td className="border border-white/10 px-3 py-2">Magnetising inrush</td>
                      <td className="border border-white/10 px-3 py-2">Time-delayed protection, inrush-rated MCB</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Generators</td>
                      <td className="border border-white/10 px-3 py-2">Voltage regulation</td>
                      <td className="border border-white/10 px-3 py-2">AVR settings, load shedding sequence</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Single-core cables</td>
                      <td className="border border-white/10 px-3 py-2">Induced EMF in metalwork</td>
                      <td className="border border-white/10 px-3 py-2">Non-ferrous glands, trefoil formation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>BS 7671 note:</strong> Regulation 521.5 requires all conductors of a circuit to be contained in the same cable or enclosure to prevent eddy current heating.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Generator EMF Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A generator armature has 200 conductors, each 0.3m long, rotating at the edge of a 0.15m radius drum at 1500 rpm in a 0.9T field. Calculate the average EMF per conductor.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Step 1: Calculate velocity</p>
                <p>v = 2 &#215; &#960; &#215; r &#215; (rpm/60) = 2 &#215; 3.14 &#215; 0.15 &#215; (1500/60)</p>
                <p>v = 2 &#215; 3.14 &#215; 0.15 &#215; 25 = <strong>23.6 m/s</strong></p>
                <p className="mt-2">Step 2: Calculate EMF per conductor</p>
                <p>e = Blv = 0.9 &#215; 0.3 &#215; 23.6 = <strong>6.4V</strong></p>
                <p className="mt-2 text-white/60">Total EMF depends on series/parallel conductor arrangement</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Transformer Turns Ratio</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A bell transformer has 1150 turns on the primary and 40 turns on the secondary. If connected to 230V mains, what is the secondary voltage?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Using transformer equation: V&#8322;/V&#8321; = N&#8322;/N&#8321;</p>
                <p className="mt-2">V&#8322; = V&#8321; &#215; (N&#8322;/N&#8321;)</p>
                <p>V&#8322; = 230 &#215; (40/1150)</p>
                <p>V&#8322; = 230 &#215; 0.0348 = <strong>8V</strong></p>
                <p className="mt-2 text-white/60">Suitable for door bells and chimes</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Rate of Change of Flux</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 400-turn coil is in a magnetic field. The flux through the coil changes from 0.08Wb to 0.02Wb in 50ms. Calculate the induced EMF.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Change in flux: d&#934; = 0.02 - 0.08 = -0.06Wb</p>
                <p>Time: dt = 50ms = 0.05s</p>
                <p className="mt-2">e = -N &#215; (d&#934;/dt)</p>
                <p>e = -400 &#215; (-0.06/0.05)</p>
                <p>e = -400 &#215; (-1.2) = <strong>480V</strong></p>
                <p className="mt-2 text-white/60">The positive result indicates EMF opposes the decreasing flux</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 4: Self-Inductance Back-EMF</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A relay coil has inductance of 0.5H. When the circuit is opened, the current falls from 0.2A to zero in 5ms. What back-EMF is generated?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Using: e = -L &#215; (di/dt)</p>
                <p className="mt-2">di = 0 - 0.2 = -0.2A</p>
                <p>dt = 5ms = 0.005s</p>
                <p className="mt-2">e = -0.5 &#215; (-0.2/0.005)</p>
                <p>e = -0.5 &#215; (-40) = <strong>20V</strong></p>
                <p className="mt-2 text-white/60">This is why relay contacts arc - the back-EMF can be much higher than supply</p>
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
                <li className="pl-1"><strong>e = -N(d&#934;/dt)</strong> - Faraday's law (transformer EMF)</li>
                <li className="pl-1"><strong>e = Blv</strong> - Motional EMF</li>
                <li className="pl-1"><strong>e = -L(di/dt)</strong> - Self-inductance back-EMF</li>
                <li className="pl-1"><strong>V&#8322;/V&#8321; = N&#8322;/N&#8321;</strong> - Transformer voltage ratio</li>
                <li className="pl-1"><strong>X&#8343; = 2&#960;fL</strong> - Inductive reactance</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Motor starting current: <strong>6-8&#215; full load current</strong></li>
                <li className="pl-1">Transformer inrush: <strong>Up to 12&#215; full load current</strong></li>
                <li className="pl-1">UK frequency: <strong>50Hz</strong></li>
                <li className="pl-1">Lamination thickness (50Hz): <strong>0.35-0.5mm</strong></li>
                <li className="pl-1">CTE output: <strong>55-0-55V</strong> (110V between lines)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>DC on transformer:</strong> Produces no output, only heating</li>
                <li className="pl-1"><strong>Ignoring inrush:</strong> MCBs may nuisance trip on transformer energisation</li>
                <li className="pl-1"><strong>Separating single-core cables:</strong> Causes eddy current heating in steel enclosures</li>
                <li className="pl-1"><strong>Undersizing for motors:</strong> Must account for starting current, not just running</li>
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
                <p className="font-medium text-white mb-1">Induction Laws</p>
                <ul className="space-y-0.5">
                  <li>Faraday: e = -N(d&#934;/dt)</li>
                  <li>Lenz: Opposes the change causing it</li>
                  <li>Motional: e = Blv (perpendicular)</li>
                  <li>Self-inductance: e = -L(di/dt)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Building Services</p>
                <ul className="space-y-0.5">
                  <li>Generators: Mechanical to electrical</li>
                  <li>Motors: Electrical to mechanical</li>
                  <li>Transformers: Voltage conversion</li>
                  <li>Laminations: Reduce eddy losses</li>
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
            <Link to="../h-n-c-module3-section4-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Section 4.8
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section5-2">
              Next: Section 5.2
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule3Section5_1;
