import { ArrowLeft, ArrowRight, Zap, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";

const quickCheckQuestions = [
  {
    question: "According to Faraday's Law, what determines the magnitude of induced EMF?",
    options: ["The total flux linkage", "The rate of change of flux linkage", "The resistance of the conductor", "The permeability of the core"],
    correctIndex: 1,
    explanation: "Faraday's Law states that induced EMF equals the rate of change of flux linkage: e = -N x (d(Phi)/dt). Faster change means greater EMF."
  },
  {
    question: "What does Lenz's Law tell us about the direction of induced current?",
    options: ["It flows in the same direction as the primary current", "It opposes the change causing it", "It always flows clockwise", "It depends on conductor resistance"],
    correctIndex: 1,
    explanation: "Lenz's Law states that the direction of induced current is always such as to oppose the change producing it. This is represented by the negative sign in Faraday's equation."
  },
  {
    question: "A coil of 200 turns experiences a flux change of 0.01 Wb in 0.02 seconds. What is the induced EMF?",
    options: ["1 V", "10 V", "100 V", "0.1 V"],
    correctIndex: 2,
    explanation: "EMF = N x (change in Phi / change in t) = 200 x (0.01 / 0.02) = 200 x 0.5 = 100 V."
  },
  {
    question: "Which principle is used in electrical generators?",
    options: ["Motor effect only", "Electromagnetic induction", "Electrostatic attraction", "Thermionic emission"],
    correctIndex: 1,
    explanation: "Generators use electromagnetic induction - a conductor moving through a magnetic field has an EMF induced across it. This is the basis of all electrical generation."
  }
];

const quizQuestions = [
  {
    question: "A conductor 0.5m long moves at 20 m/s through a magnetic field of 0.8 T. What EMF is induced?",
    options: ["4 V", "8 V", "16 V", "32 V"],
    correctIndex: 1,
    explanation: "For a moving conductor: EMF = B x l x v = 0.8 x 0.5 x 20 = 8 V."
  },
  {
    question: "The flux through a 500-turn coil decreases from 20 mWb to 5 mWb in 10 ms. Calculate the average induced EMF.",
    options: ["75 V", "750 V", "7.5 V", "7500 V"],
    correctIndex: 1,
    explanation: "EMF = N x (change in Phi / change in t) = 500 x ((0.020 - 0.005) / 0.01) = 500 x (0.015 / 0.01) = 500 x 1.5 = 750 V."
  },
  {
    question: "Why is the negative sign important in Faraday's Law equation (e = -N x d(Phi)/dt)?",
    options: ["It indicates power loss", "It represents Lenz's Law - opposition to change", "It shows decreasing flux", "It corrects for measurement error"],
    correctIndex: 1,
    explanation: "The negative sign represents Lenz's Law, indicating that the induced EMF opposes the change in flux. Without this opposition, energy would not be conserved."
  },
  {
    question: "A coil rotates at 3000 rpm in a magnetic field. How many complete cycles occur per second?",
    options: ["50 Hz", "3000 Hz", "100 Hz", "25 Hz"],
    correctIndex: 0,
    explanation: "Frequency = rpm / 60 = 3000 / 60 = 50 Hz. Each rotation produces one complete AC cycle in a simple generator."
  },
  {
    question: "What is the induced EMF in a stationary conductor in a constant magnetic field?",
    options: ["Maximum", "Depends on field strength", "Zero", "Depends on conductor length"],
    correctIndex: 2,
    explanation: "No EMF is induced if there is no change in flux linkage. Either the conductor must move, the field must change, or both - a constant situation induces nothing."
  },
  {
    question: "The Fleming's Right-Hand Rule is used to determine:",
    options: ["Direction of force on a current-carrying conductor", "Direction of induced EMF in a generator", "Magnetic field direction", "Current direction in a motor"],
    correctIndex: 1,
    explanation: "Fleming's Right-Hand Rule (for generators) relates Motion, Field and induced EMF direction. The left-hand rule is for motors (force on current)."
  },
  {
    question: "If the speed of a generator is doubled while keeping the field constant, what happens to the induced EMF?",
    options: ["Halved", "Unchanged", "Doubled", "Quadrupled"],
    correctIndex: 2,
    explanation: "EMF is proportional to the rate of change of flux (or velocity in e = Blv). Doubling speed doubles the rate of flux cutting, hence doubling the EMF."
  },
  {
    question: "A transformer primary has 1000 turns and secondary has 100 turns. If primary flux is 10 mWb, what is the flux in the secondary?",
    options: ["1 mWb", "10 mWb", "100 mWb", "0.1 mWb"],
    correctIndex: 1,
    explanation: "In an ideal transformer, the same flux links both windings. The flux is 10 mWb in both primary and secondary - only the voltage differs due to different turns."
  },
  {
    question: "What is the peak EMF in a coil of 100 turns, area 0.02 m squared, rotating at 50 Hz in a 1.5 T field?",
    options: ["471 V", "942 V", "150 V", "300 V"],
    correctIndex: 1,
    explanation: "Peak EMF = N x B x A x omega = N x B x A x 2 x pi x f = 100 x 1.5 x 0.02 x 2 x 3.142 x 50 = 942 V."
  },
  {
    question: "Why must the core of an electromagnet be laminated for AC operation?",
    options: ["To increase flux", "To reduce eddy current losses", "To increase inductance", "To reduce resistance"],
    correctIndex: 1,
    explanation: "AC creates changing flux which induces eddy currents in the core. Laminations (thin insulated sheets) break up eddy current paths, reducing I squared R losses."
  },
  {
    question: "An RCD trips when:",
    options: ["Current exceeds 30A", "Voltage exceeds 253V", "Imbalance between live and neutral currents is detected", "Temperature exceeds safe limits"],
    correctIndex: 2,
    explanation: "RCDs use electromagnetic induction. If live and neutral currents are equal (balanced), the net flux is zero. Any imbalance (earth fault) creates net flux that induces EMF to trip the device."
  },
  {
    question: "The back-EMF in a motor:",
    options: ["Assists the supply voltage", "Opposes the supply voltage", "Only appears at start-up", "Is independent of speed"],
    correctIndex: 1,
    explanation: "As the motor armature rotates in the magnetic field, it acts like a generator producing back-EMF that opposes the supply. This limits current as speed increases - demonstrated by Lenz's Law."
  }
];

const faqItems = [
  {
    question: "What is the difference between Faraday's Law and Lenz's Law?",
    answer: "Faraday's Law describes the magnitude of induced EMF - it equals the rate of change of flux linkage (EMF = -N x d(Phi)/dt). Lenz's Law describes the direction - the induced EMF always opposes the change causing it. Together they fully describe electromagnetic induction: Faraday tells us 'how much', Lenz tells us 'which way'."
  },
  {
    question: "Why is electromagnetic induction so important in electrical engineering?",
    answer: "Electromagnetic induction is the principle behind generators (converting mechanical to electrical energy), transformers (changing voltage levels), inductors (storing energy and filtering), electric motors (back-EMF), and many sensors and protection devices. Without it, we could not generate, transmit or transform electrical power efficiently."
  },
  {
    question: "How does a transformer use electromagnetic induction?",
    answer: "In a transformer, AC current in the primary winding creates a changing magnetic flux in the core. This changing flux links with the secondary winding and, by Faraday's Law, induces an EMF. The voltage ratio equals the turns ratio because the same rate of flux change links both windings. No relative motion is needed - the AC naturally provides the changing flux."
  },
  {
    question: "What is the difference between statically induced and dynamically induced EMF?",
    answer: "Statically induced EMF occurs when the conductor is stationary but the flux changes (as in transformers). Dynamically induced EMF occurs when the conductor moves through a magnetic field (as in generators). Both are covered by Faraday's Law - what matters is the rate of change of flux linkage, not whether the conductor or field is moving."
  },
  {
    question: "How do eddy currents form and why are they usually undesirable?",
    answer: "When a changing magnetic flux passes through a solid conductor, it induces circulating currents (eddy currents) in the material. These cause I squared R heating, wasting energy and potentially causing overheating. We reduce eddy currents by laminating cores (thin sheets with insulation) or using ferrite materials that have high resistivity."
  },
  {
    question: "What practical applications use the principles of electromagnetic induction?",
    answer: "Key applications include: power generation (rotating generators), transformers (voltage conversion), induction motors (rotating field creates rotor currents), induction heating (eddy current heating), RCDs (detecting current imbalance), induction hobs (heating cookware), metal detectors, and current transformers for measurement."
  }
];

const Level3Module3Section3_2 = () => {
  useSEO(
    "Electromagnetic Induction - Level 3 Electrical Science | Elec-Mate",
    "Master Faraday's and Lenz's Laws of electromagnetic induction. Understand how generators, transformers and motors work using induced EMF principles for City & Guilds Level 3 qualifications."
  );

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 border-b border-white/10 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <Button variant="ghost" className="text-white/70 hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="/study-centre/apprentice/level3-module3-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 3
            </Link>
          </Button>
          <span className="text-sm font-bold text-white bg-green-600 rounded-full px-3 py-1">
            Level 3 Module 3
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">
          3.2 Electromagnetic Induction
        </h1>
        <p className="text-xl text-white/70 mb-8">
          Faraday's and Lenz's Laws - the foundation of electrical generation and transformation
        </p>

        {/* Quick Summary Box */}
        <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-green-400 mb-3 flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Quick Summary
          </h3>
          <ul className="text-white/80 space-y-2">
            <li>Faraday's Law: EMF = -N x (change in Phi / change in t) - rate of flux change</li>
            <li>Lenz's Law: Induced EMF opposes the change causing it (the negative sign)</li>
            <li>Dynamically induced: EMF = B x l x v (conductor moving in field)</li>
            <li>Statically induced: changing current creates changing flux (transformers)</li>
            <li>Fleming's Right-Hand Rule: relates Motion, Field and induced EMF direction</li>
          </ul>
        </div>

        {/* Learning Outcomes */}
        <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-blue-400 mb-3">Learning Outcomes</h3>
          <ul className="text-white/80 space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-1 text-green-400 flex-shrink-0" />
              State and apply Faraday's Law of electromagnetic induction
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-1 text-green-400 flex-shrink-0" />
              Explain Lenz's Law and its relationship to energy conservation
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-1 text-green-400 flex-shrink-0" />
              Calculate induced EMF in moving conductors and coils
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-1 text-green-400 flex-shrink-0" />
              Distinguish between statically and dynamically induced EMF
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-1 text-green-400 flex-shrink-0" />
              Apply Fleming's Right-Hand Rule to generator problems
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-1 text-green-400 flex-shrink-0" />
              Explain how induction principles apply to transformers, generators and motors
            </li>
          </ul>
        </div>

        {/* Main Content Sections */}
        <div className="prose prose-invert max-w-none">
          {/* Section 1 */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</span>
              Faraday's Law of Electromagnetic Induction
            </h2>
            <div className="bg-[#242424] rounded-lg p-6 border border-white/10">
              <p className="text-white/80 mb-4">
                <strong>Faraday's Law</strong> states that when the magnetic flux linking a circuit changes, an electromotive force (EMF) is induced. The magnitude of this EMF is proportional to the rate of change of flux linkage.
              </p>

              <h4 className="text-lg font-semibold text-green-400 mb-3">Mathematical Expression</h4>
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4 text-center">
                <p className="text-green-400 font-mono text-lg mb-2">e = -N x (d(Phi) / dt)</p>
                <p className="text-white/80 text-sm">Where e = induced EMF (V), N = number of turns, d(Phi)/dt = rate of flux change (Wb/s)</p>
              </div>

              <p className="text-white/80 mb-4">
                For calculations with average values:
              </p>
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4 text-center">
                <p className="text-green-400 font-mono text-lg mb-2">E(average) = N x (change in Phi / change in t)</p>
                <p className="text-white/80 text-sm">Change in Phi = Phi2 - Phi1 (the change in flux in Webers)</p>
              </div>

              <h4 className="text-lg font-semibold text-green-400 mb-3">Key Points from Faraday's Experiments</h4>
              <ul className="text-white/80 space-y-2 mb-4">
                <li>EMF is induced only when flux is <strong>changing</strong> - steady flux induces nothing</li>
                <li>Greater rate of change produces greater EMF</li>
                <li>More turns multiply the effect (flux linkage = N x Phi)</li>
                <li>The method of change doesn't matter - moving conductor, moving magnet, or changing current all work</li>
              </ul>

              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
                <h5 className="font-semibold text-white mb-2">Worked Example</h5>
                <p className="text-white/80 mb-2">A coil of 300 turns has its flux changed from 0.02 Wb to 0.005 Wb in 5 ms. Calculate the average induced EMF.</p>
                <p className="text-white/70 text-sm mb-2">Change in Phi = 0.02 - 0.005 = 0.015 Wb</p>
                <p className="text-white/70 text-sm mb-2">Change in t = 5 ms = 0.005 s</p>
                <p className="text-green-400 font-mono">E = N x (delta Phi / delta t) = 300 x (0.015 / 0.005) = 300 x 3 = 900 V</p>
              </div>

              <InlineCheck
                question="A 150-turn coil experiences a flux change of 40 mWb in 8 ms. What is the induced EMF?"
                options={["750 V", "188 V", "48 V", "1.2 kV"]}
                correctIndex={0}
                explanation="E = N x (delta Phi / delta t) = 150 x (0.04 / 0.008) = 150 x 5 = 750 V."
              />
            </div>
          </div>

          {/* Section 2 */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</span>
              Lenz's Law and Energy Conservation
            </h2>
            <div className="bg-[#242424] rounded-lg p-6 border border-white/10">
              <p className="text-white/80 mb-4">
                <strong>Lenz's Law</strong> states that the direction of the induced EMF (and hence induced current in a closed circuit) is always such as to oppose the change producing it. This is represented by the negative sign in Faraday's equation.
              </p>

              <h4 className="text-lg font-semibold text-green-400 mb-3">Understanding the Opposition</h4>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-[#1a1a1a] rounded-lg p-4">
                  <h5 className="font-semibold text-white mb-2">If Flux is Increasing</h5>
                  <p className="text-white/70 text-sm">Induced current creates a field that <strong>opposes</strong> the increase (in opposite direction to the applied field)</p>
                </div>
                <div className="bg-[#1a1a1a] rounded-lg p-4">
                  <h5 className="font-semibold text-white mb-2">If Flux is Decreasing</h5>
                  <p className="text-white/70 text-sm">Induced current creates a field that <strong>supports</strong> the original field (opposing the decrease)</p>
                </div>
              </div>

              <h4 className="text-lg font-semibold text-green-400 mb-3">Why Lenz's Law Must Be True</h4>
              <p className="text-white/80 mb-4">
                Lenz's Law is a consequence of the <strong>conservation of energy</strong>. If the induced current assisted rather than opposed the change, it would create more flux change, inducing more current, creating more flux... - a perpetual motion machine! Energy must be put into the system to cause the change.
              </p>

              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
                <h5 className="font-semibold text-white mb-2">Practical Examples</h5>
                <ul className="text-white/70 text-sm space-y-2">
                  <li><strong>Generator:</strong> Induced current creates force opposing rotation - mechanical work required to overcome this</li>
                  <li><strong>Transformer:</strong> Secondary current creates flux opposing primary flux - primary current increases to compensate</li>
                  <li><strong>Eddy currents:</strong> Oppose the motion that creates them - used in electromagnetic braking</li>
                  <li><strong>Motor back-EMF:</strong> Opposes supply voltage - limits current as motor speeds up</li>
                </ul>
              </div>

              <InlineCheck
                question="A magnet is dropped through a copper tube. What happens and why?"
                options={["Falls at normal speed - copper is non-magnetic", "Falls slowly due to induced currents opposing its motion", "Accelerates due to induced currents", "Stops completely in the tube"]}
                correctIndex={1}
                explanation="The falling magnet induces eddy currents in the copper. By Lenz's Law, these currents create magnetic fields that oppose the magnet's motion, slowing its fall. This is electromagnetic braking."
              />
            </div>
          </div>

          {/* Section 3 */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</span>
              Dynamically Induced EMF
            </h2>
            <div className="bg-[#242424] rounded-lg p-6 border border-white/10">
              <p className="text-white/80 mb-4">
                <strong>Dynamically induced EMF</strong> occurs when a conductor moves through a magnetic field, cutting through lines of flux. This is the principle behind electrical generators.
              </p>

              <h4 className="text-lg font-semibold text-green-400 mb-3">EMF in a Moving Conductor</h4>
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4 text-center">
                <p className="text-green-400 font-mono text-lg mb-2">e = B x l x v</p>
                <p className="text-white/80 text-sm">Where e = EMF (V), B = flux density (T), l = conductor length (m), v = velocity (m/s)</p>
              </div>

              <p className="text-white/80 mb-4">
                This formula assumes the conductor moves perpendicular to both the field and its own length. For movement at an angle theta:
              </p>
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4 text-center">
                <p className="text-green-400 font-mono text-lg mb-2">e = B x l x v x sin(theta)</p>
                <p className="text-white/80 text-sm">Maximum EMF when theta = 90 degrees (perpendicular motion)</p>
              </div>

              <h4 className="text-lg font-semibold text-green-400 mb-3">Fleming's Right-Hand Rule (Generators)</h4>
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
                <p className="text-white/80 mb-3">Hold your right hand with thumb, first finger and second finger mutually perpendicular:</p>
                <ul className="text-white/70 text-sm space-y-2">
                  <li><strong>thuMb:</strong> Motion of conductor</li>
                  <li><strong>First finger:</strong> Field direction (N to S)</li>
                  <li><strong>sEcond finger:</strong> EMF (and current) direction</li>
                </ul>
                <p className="text-white/70 text-sm mt-3">Remember: Right hand for generators (EMF), Left hand for motors (Force)</p>
              </div>

              <h4 className="text-lg font-semibold text-green-400 mb-3">EMF in a Rotating Coil</h4>
              <p className="text-white/80 mb-4">
                For a coil rotating in a magnetic field (AC generator):
              </p>
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
                <p className="text-green-400 font-mono mb-2">Instantaneous: e = E(max) x sin(omega x t)</p>
                <p className="text-green-400 font-mono mb-2">Maximum EMF: E(max) = N x B x A x omega = 2 x pi x f x N x B x A</p>
                <p className="text-white/80 text-sm mt-2">Where omega = angular velocity (rad/s), A = coil area (m squared)</p>
              </div>

              <InlineCheck
                question="A 0.4m conductor moves at 15 m/s perpendicular to a 1.2 T field. What is the induced EMF?"
                options={["7.2 V", "4.8 V", "18 V", "0.032 V"]}
                correctIndex={0}
                explanation="e = B x l x v = 1.2 x 0.4 x 15 = 7.2 V."
              />
            </div>
          </div>

          {/* Section 4 */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</span>
              Statically Induced EMF and Applications
            </h2>
            <div className="bg-[#242424] rounded-lg p-6 border border-white/10">
              <p className="text-white/80 mb-4">
                <strong>Statically induced EMF</strong> occurs when the conductor is stationary but the magnetic flux through it changes. This is the principle behind transformers and inductors.
              </p>

              <h4 className="text-lg font-semibold text-green-400 mb-3">Types of Static Induction</h4>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-[#1a1a1a] rounded-lg p-4">
                  <h5 className="font-semibold text-white mb-2">Self-Induction</h5>
                  <p className="text-white/70 text-sm">EMF induced in a coil by its own changing current. The coil opposes changes in its own current. This is inductance (L).</p>
                </div>
                <div className="bg-[#1a1a1a] rounded-lg p-4">
                  <h5 className="font-semibold text-white mb-2">Mutual Induction</h5>
                  <p className="text-white/70 text-sm">EMF induced in one coil by changing current in another nearby coil. The basis of transformer operation. Characterised by mutual inductance (M).</p>
                </div>
              </div>

              <h4 className="text-lg font-semibold text-green-400 mb-3">Practical Applications</h4>
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
                <ul className="text-white/80 space-y-3">
                  <li>
                    <strong>Transformers:</strong> AC in primary creates changing flux in core. This links with secondary winding, inducing EMF. Voltage transformation = turns ratio.
                  </li>
                  <li>
                    <strong>Inductors/Chokes:</strong> Oppose changes in current. Used in filters, motor starting, and power factor correction reactors.
                  </li>
                  <li>
                    <strong>Current Transformers:</strong> Measure high currents safely. Primary is the main conductor, secondary provides scaled-down current.
                  </li>
                  <li>
                    <strong>RCDs:</strong> Line and neutral pass through a toroid. Equal currents create zero net flux. Any imbalance induces EMF in sensing coil, triggering trip.
                  </li>
                  <li>
                    <strong>Induction Heating:</strong> High-frequency changing field induces eddy currents in metal workpiece, causing direct heating.
                  </li>
                </ul>
              </div>

              <h4 className="text-lg font-semibold text-green-400 mb-3">Eddy Currents</h4>
              <p className="text-white/80 mb-4">
                When a changing magnetic field passes through a solid conductor, it induces circulating currents called <strong>eddy currents</strong>. These can be useful or problematic:
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-[#1a1a1a] rounded-lg p-4">
                  <h5 className="font-semibold text-white mb-2">Useful Applications</h5>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>Induction heating</li>
                    <li>Electromagnetic braking</li>
                    <li>Metal detectors</li>
                    <li>Induction cooktops</li>
                  </ul>
                </div>
                <div className="bg-[#1a1a1a] rounded-lg p-4">
                  <h5 className="font-semibold text-white mb-2">Reducing Unwanted Eddy Currents</h5>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>Laminated cores (transformers/motors)</li>
                    <li>Ferrite materials (high resistivity)</li>
                    <li>Powdered iron cores</li>
                    <li>Slotted pole faces</li>
                  </ul>
                </div>
              </div>

              <InlineCheck
                question="Why must the secondary of a current transformer never be open-circuited while primary current is flowing?"
                options={["It would damage the primary winding", "Dangerous high voltage would be induced in the open secondary", "The core would demagnetise", "The meter would give wrong readings"]}
                correctIndex={1}
                explanation="Normally, secondary current creates flux that largely cancels primary flux. With secondary open, full primary flux links secondary, inducing dangerously high voltage - potentially thousands of volts."
              />
            </div>
          </div>

          {/* Practical Guidance */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4">Practical Guidance</h2>
            <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-yellow-400 mb-3">Safety and Installation Considerations</h4>
              <ul className="text-white/80 space-y-2">
                <li><strong>Back-EMF in motors:</strong> At standstill, motor current is very high (no back-EMF). DOL starters must handle starting current of 6-8 times full load. Star-delta and VFD starting reduce this.</li>
                <li><strong>CT secondary circuits:</strong> Never open-circuit a live CT. If meter must be removed, short secondary first. CT secondaries should be earthed at one point only.</li>
                <li><strong>Inductive loads:</strong> Opening inductive circuits suddenly causes high voltage spikes (Lenz's Law). Snubber circuits, flywheel diodes or RC suppressors protect contacts and electronics.</li>
                <li><strong>Electromagnetic compatibility:</strong> Changing currents induce voltages in nearby conductors. Proper segregation, screening and filtering required per BS 7671 Chapter 44.</li>
              </ul>
            </div>
          </div>

          {/* FAQs */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqItems.map((faq, index) => (
                <div key={index} className="bg-[#242424] rounded-lg p-4 border border-white/10">
                  <h4 className="font-semibold text-white mb-2">{faq.question}</h4>
                  <p className="text-white/70 text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Reference */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4">Quick Reference</h2>
            <div className="bg-[#242424] rounded-lg p-6 border border-white/10">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-green-400 mb-3">Essential Formulas</h4>
                  <ul className="text-white/70 text-sm space-y-2 font-mono">
                    <li>e = -N x (dPhi/dt)</li>
                    <li>e = N x (delta Phi / delta t)</li>
                    <li>e = B x l x v</li>
                    <li>e = B x l x v x sin(theta)</li>
                    <li>E(max) = N x B x A x omega</li>
                    <li>e = E(max) x sin(omega x t)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-green-400 mb-3">Key Rules</h4>
                  <ul className="text-white/70 text-sm space-y-2">
                    <li>Faraday: EMF = rate of flux change</li>
                    <li>Lenz: EMF opposes the change</li>
                    <li>Right-hand rule: Generators</li>
                    <li>Left-hand rule: Motors</li>
                    <li>1 Wb/s = 1 Volt</li>
                    <li>No change = no EMF</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-4">Test Your Knowledge</h2>
          <p className="text-white/70 mb-4">Complete this quiz to check your understanding of electromagnetic induction:</p>
          <Quiz questions={quizQuestions} moduleId="L3M3S3.2" />
        </div>

        {/* Quick Check Questions */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-4">Quick Check Questions</h2>
          <div className="space-y-4">
            {quickCheckQuestions.map((q, index) => (
              <InlineCheck
                key={index}
                question={q.question}
                options={q.options}
                correctIndex={q.correctIndex}
                explanation={q.explanation}
              />
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-white/10">
          <Button variant="outline" className="text-white border-white/30 hover:bg-white/10" asChild>
            <Link to="/study-centre/apprentice/level3-module3-section3-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Magnetic Fields and Flux
            </Link>
          </Button>
          <Button className="bg-green-600 hover:bg-green-700 text-white" asChild>
            <Link to="/study-centre/apprentice/level3-module3-section3-3">
              Next: Self and Mutual Inductance
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Level3Module3Section3_2;
