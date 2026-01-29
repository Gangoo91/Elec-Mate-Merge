import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Electrical Losses (I²R, Eddy Current, Hysteresis) - HNC Module 3 Section 6.1";
const DESCRIPTION = "Master electrical power losses in building services: resistive I²R losses, skin effect, eddy currents, hysteresis in transformers and motors, cable derating, and loss reduction strategies.";

const quickCheckQuestions = [
  {
    id: "i2r-loss",
    question: "If current through a cable doubles, how does the I²R power loss change?",
    options: ["Doubles", "Quadruples", "Halves", "Stays the same"],
    correctIndex: 1,
    explanation: "Power loss P = I²R. If current doubles (2I), power becomes (2I)² × R = 4I²R - it quadruples. This is why cable sizing is critical for high-current circuits."
  },
  {
    id: "eddy-current",
    question: "Why are transformer cores made from laminated steel sheets rather than solid steel?",
    options: ["To reduce weight", "To reduce eddy current losses", "To increase magnetic flux", "To improve cooling"],
    correctIndex: 1,
    explanation: "Laminations break up the paths for eddy currents, dramatically reducing these losses. The thin insulating layers between laminations increase resistance to circulating currents."
  },
  {
    id: "hysteresis-loss",
    question: "What property of magnetic materials causes hysteresis loss?",
    options: ["High conductivity", "Low permeability", "Magnetic domain resistance to realignment", "High thermal conductivity"],
    correctIndex: 2,
    explanation: "Hysteresis loss occurs because energy is required to repeatedly realign magnetic domains as the AC field reverses. This energy appears as heat in the core material."
  },
  {
    id: "skin-effect",
    question: "At what frequency does skin effect become significant in copper conductors?",
    options: ["50 Hz only", "Above 1 kHz", "Below 10 Hz", "At DC only"],
    correctIndex: 1,
    explanation: "Skin effect becomes significant above about 1 kHz. At 50 Hz, it is minimal for typical cable sizes, but at higher frequencies current concentrates near the conductor surface, increasing effective resistance."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the formula for resistive power loss in a conductor?",
    options: [
      "P = V/I",
      "P = I²R",
      "P = R/I²",
      "P = V × R"
    ],
    correctAnswer: 1,
    explanation: "P = I²R (also known as Joule heating) shows that power loss is proportional to the square of current and the resistance. This is fundamental to understanding cable losses."
  },
  {
    id: 2,
    question: "A 100m cable run with resistance 0.5Ω carries 20A. What is the power loss?",
    options: ["10W", "40W", "200W", "400W"],
    correctAnswer: 2,
    explanation: "Using P = I²R: P = 20² × 0.5 = 400 × 0.5 = 200W. This significant loss highlights the importance of cable sizing for long runs."
  },
  {
    id: 3,
    question: "Which type of loss is frequency-dependent and proportional to f²?",
    options: ["Resistive loss", "Hysteresis loss", "Eddy current loss", "Stray loss"],
    correctAnswer: 2,
    explanation: "Eddy current losses are proportional to frequency squared (Pe ∝ f²). This is why they become increasingly significant at higher frequencies."
  },
  {
    id: 4,
    question: "A distribution transformer has iron losses of 500W and full-load copper losses of 2000W. What are the total losses at full load?",
    options: ["500W", "2000W", "2500W", "1500W"],
    correctAnswer: 2,
    explanation: "Total losses = iron losses + copper losses = 500W + 2000W = 2500W. Iron losses (hysteresis + eddy current) are constant; copper losses (I²R) vary with load."
  },
  {
    id: 5,
    question: "What is the typical skin depth in copper at 50 Hz?",
    options: ["0.3mm", "3mm", "9mm", "30mm"],
    correctAnswer: 2,
    explanation: "At 50 Hz, skin depth in copper is approximately 9mm. Since most building cables are smaller than 18mm diameter, skin effect is negligible at mains frequency."
  },
  {
    id: 6,
    question: "Which material property is most important for reducing hysteresis losses?",
    options: ["High resistivity", "Low coercivity (soft magnetic material)", "High permeability", "Low thermal conductivity"],
    correctAnswer: 1,
    explanation: "Low coercivity (soft magnetic materials like silicon steel) have narrow hysteresis loops, requiring less energy to reverse magnetisation each cycle."
  },
  {
    id: 7,
    question: "A motor nameplate shows 90% efficiency at 15kW output. What is the input power?",
    options: ["13.5kW", "15kW", "16.67kW", "18kW"],
    correctAnswer: 2,
    explanation: "Efficiency = Output/Input, so Input = Output/Efficiency = 15kW/0.90 = 16.67kW. The losses are 16.67 - 15 = 1.67kW."
  },
  {
    id: 8,
    question: "Why must cables be derated when grouped together?",
    options: ["To reduce voltage drop", "Because I²R losses cause heat that cannot dissipate", "To meet BS 7671 aesthetics", "To reduce material costs"],
    correctAnswer: 1,
    explanation: "Grouped cables cannot dissipate heat as effectively as isolated cables. The I²R losses generate heat; if this cannot escape, temperature rises and insulation may be damaged."
  },
  {
    id: 9,
    question: "At what load does a transformer typically operate most efficiently?",
    options: ["25% load", "50-75% load", "100% load", "No load"],
    correctAnswer: 1,
    explanation: "Transformers are most efficient when copper losses equal iron losses, typically around 50-75% load. At light loads, constant iron losses dominate; at heavy loads, I²R losses dominate."
  },
  {
    id: 10,
    question: "Which IE efficiency class represents the highest motor efficiency under IEC 60034-30-1?",
    options: ["IE1 Standard", "IE2 High", "IE3 Premium", "IE4 Super Premium"],
    correctAnswer: 3,
    explanation: "IE4 Super Premium is the highest standard efficiency class (IE5 Ultra Premium exists but is not yet widely mandated). Higher IE classes have lower losses and better efficiency."
  }
];

const faqs = [
  {
    question: "Why are electrical losses important in building services?",
    answer: "Losses represent wasted energy (increased running costs), generate heat (requiring adequate ventilation/cooling and limiting cable capacity), and reduce system efficiency (affecting carbon footprint). BS 7671 voltage drop limits exist partly to control I²R losses. Transformer and motor efficiency directly impacts building energy performance."
  },
  {
    question: "What is the difference between copper losses and iron losses?",
    answer: "Copper losses (I²R) occur in windings and vary with load current squared - they are zero at no load. Iron losses (hysteresis + eddy current) occur in magnetic cores and are essentially constant whenever the equipment is energised, regardless of load. This distinction is crucial for transformer efficiency at different loading conditions."
  },
  {
    question: "How do laminations reduce eddy current losses?",
    answer: "Laminations are thin steel sheets (typically 0.35-0.5mm) with insulating coatings between them. Eddy currents are induced in planes perpendicular to the magnetic flux. Laminations break these current paths into smaller loops with higher resistance, dramatically reducing the magnitude of circulating currents and hence power loss (which is proportional to I²)."
  },
  {
    question: "Why is skin effect not a major concern at 50 Hz?",
    answer: "At 50 Hz, skin depth in copper is about 9mm. Most building cables are smaller than this, so current distributes fairly uniformly. However, for very large conductors (>300mm²) or at higher frequencies (variable speed drives, harmonics), skin effect increases effective resistance and must be considered."
  },
  {
    question: "How do I calculate cable losses for a circuit?",
    answer: "For single-phase: P_loss = 2 × I² × R × L, where R is resistance per metre and L is one-way length (×2 for go and return). For three-phase: P_loss = 3 × I² × R × L. Use the cable resistance from manufacturer data or BS 7671 tables, and remember resistance increases with temperature."
  },
  {
    question: "What is the Steinmetz equation for hysteresis loss?",
    answer: "Ph = η × B_max^n × f × V, where η is the Steinmetz coefficient (material-dependent), B_max is peak flux density, n is the Steinmetz exponent (typically 1.6-2.0), f is frequency, and V is core volume. This shows hysteresis loss is proportional to frequency and increases rapidly with flux density."
  }
];

const HNCModule3Section6_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section6">
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
            <span>Module 3.6.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Electrical Losses
          </h1>
          <p className="text-white/80 text-lg">
            I²R, Eddy Current, and Hysteresis Losses
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>I²R losses:</strong> Heat in conductors, proportional to current squared</li>
              <li className="pl-1"><strong>Eddy currents:</strong> Circulating currents in cores, reduced by laminations</li>
              <li className="pl-1"><strong>Hysteresis:</strong> Energy lost reversing magnetic domains each cycle</li>
              <li className="pl-1"><strong>Total losses:</strong> Copper losses + iron losses = wasted energy as heat</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Cable sizing:</strong> Limits based on I²R heating</li>
              <li className="pl-1"><strong>Transformer selection:</strong> Iron vs copper loss balance</li>
              <li className="pl-1"><strong>Motor efficiency:</strong> IE classes and regulations</li>
              <li className="pl-1"><strong>Energy costs:</strong> Losses directly impact running costs</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Calculate resistive (I²R) losses in cables and windings",
              "Understand skin effect and proximity effect at high frequencies",
              "Explain eddy current formation and reduction through laminations",
              "Describe hysteresis loss mechanism and material selection",
              "Apply derating factors for cable installations",
              "Evaluate transformer and motor efficiency for building services"
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

        {/* Section 1: Resistive Losses */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Resistive Losses (I²R) - Joule Heating
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Resistive or I²R losses occur whenever current flows through any conductor with resistance.
              This is the most fundamental form of electrical loss and is often called Joule heating
              after James Prescott Joule who quantified the effect.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Power Loss Equation</p>
              <p className="font-mono text-center text-xl mb-2">P<sub>loss</sub> = I² × R</p>
              <p className="text-xs text-white/70 text-center">Where I = current (A), R = resistance (Ω), P = power loss (W)</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key characteristics of I²R losses:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Proportional to I²:</strong> Doubling current quadruples losses</li>
                <li className="pl-1"><strong>Proportional to R:</strong> Lower resistance means lower losses</li>
                <li className="pl-1"><strong>Appears as heat:</strong> Energy is dissipated, not stored</li>
                <li className="pl-1"><strong>Occurs in all conductors:</strong> Cables, windings, busbars, connections</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-300 mb-2">Critical Understanding</p>
              <p className="text-sm text-white">
                The squared relationship is crucial. A circuit carrying 20A has four times the losses
                of one carrying 10A through the same resistance. This is why high-current circuits
                require proportionally larger cables - not just for current capacity, but to reduce
                losses and heat generation.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">I²R Loss Calculation for Cables</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Circuit Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Formula</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Single-phase</td>
                      <td className="border border-white/10 px-3 py-2 font-mono">P = 2 × I² × r × L</td>
                      <td className="border border-white/10 px-3 py-2">×2 for line and neutral</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Three-phase balanced</td>
                      <td className="border border-white/10 px-3 py-2 font-mono">P = 3 × I² × r × L</td>
                      <td className="border border-white/10 px-3 py-2">Neutral carries no current</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">DC circuit</td>
                      <td className="border border-white/10 px-3 py-2 font-mono">P = 2 × I² × r × L</td>
                      <td className="border border-white/10 px-3 py-2">Positive and negative</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-white/60 mt-2">Where r = resistance per metre (Ω/m), L = one-way cable length (m)</p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Cable resistance increases with temperature. At 70°C operating temperature,
              copper resistance is approximately 20% higher than at 20°C reference temperature.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Skin Effect */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Skin Effect at High Frequencies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              In AC circuits, current does not distribute uniformly across a conductor's cross-section.
              At higher frequencies, current concentrates near the surface - this is the skin effect.
              It effectively reduces the useful cross-sectional area, increasing resistance.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Skin Depth Formula</p>
              <p className="font-mono text-center text-lg mb-2">δ = √(ρ / (π × f × μ))</p>
              <p className="text-xs text-white/70 text-center">Where δ = skin depth (m), ρ = resistivity, f = frequency, μ = permeability</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Skin Depth in Copper at Various Frequencies</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Frequency</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Skin Depth</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">50 Hz</td>
                      <td className="border border-white/10 px-3 py-2">9.4 mm</td>
                      <td className="border border-white/10 px-3 py-2">Mains frequency - minimal effect</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1 kHz</td>
                      <td className="border border-white/10 px-3 py-2">2.1 mm</td>
                      <td className="border border-white/10 px-3 py-2">Harmonic frequencies</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">10 kHz</td>
                      <td className="border border-white/10 px-3 py-2">0.66 mm</td>
                      <td className="border border-white/10 px-3 py-2">VSD switching frequencies</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">100 kHz</td>
                      <td className="border border-white/10 px-3 py-2">0.21 mm</td>
                      <td className="border border-white/10 px-3 py-2">SMPS, high-frequency inverters</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-3 rounded bg-white/5">
                <p className="text-sm font-medium text-white mb-2">When Skin Effect Matters</p>
                <ul className="text-xs text-white space-y-1 list-disc list-outside ml-4">
                  <li className="pl-1">Large conductors (&gt;300mm² at 50 Hz)</li>
                  <li className="pl-1">Harmonic-rich supplies (VSD motor cables)</li>
                  <li className="pl-1">High-frequency circuits (SMPS, RF)</li>
                  <li className="pl-1">Busbar systems at higher frequencies</li>
                </ul>
              </div>
              <div className="p-3 rounded bg-white/5">
                <p className="text-sm font-medium text-white mb-2">Mitigation Techniques</p>
                <ul className="text-xs text-white space-y-1 list-disc list-outside ml-4">
                  <li className="pl-1">Use multiple smaller conductors in parallel</li>
                  <li className="pl-1">Litz wire (stranded, individually insulated)</li>
                  <li className="pl-1">Hollow conductors for very high currents</li>
                  <li className="pl-1">Flat busbars instead of round conductors</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-300 mb-2">Proximity Effect</p>
              <p className="text-sm text-white">
                Related to skin effect, proximity effect occurs when conductors carrying AC are close together.
                The magnetic field from one conductor distorts current distribution in adjacent conductors,
                further increasing effective resistance. This is significant in transformer windings and
                parallel cables.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical note:</strong> At 50 Hz, skin effect is negligible for cables up to about 150mm².
              For larger conductors or harmonic-rich environments, consult manufacturer AC resistance data.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 3: Eddy Current Losses */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Eddy Current Losses in Magnetic Cores
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              When a changing magnetic flux passes through a conducting material, it induces circulating
              currents within that material - these are eddy currents. Named because they flow in closed
              loops like eddies in water, they cause I²R heating in the core material.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Eddy Current Loss Formula</p>
              <p className="font-mono text-center text-lg mb-2">P<sub>e</sub> = K<sub>e</sub> × B<sub>max</sub>² × f² × t² × V</p>
              <p className="text-xs text-white/70 text-center">Where K<sub>e</sub> = constant, B<sub>max</sub> = peak flux, f = frequency, t = lamination thickness, V = volume</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key characteristics of eddy current losses:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Proportional to f²:</strong> Losses increase rapidly with frequency</li>
                <li className="pl-1"><strong>Proportional to t²:</strong> Thinner laminations dramatically reduce losses</li>
                <li className="pl-1"><strong>Induced by changing flux:</strong> Faraday's law of electromagnetic induction</li>
                <li className="pl-1"><strong>Flow perpendicular to flux:</strong> In planes at right angles to magnetic field</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Lamination Strategy</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Lamination</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Material</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Power transformers (50 Hz)</td>
                      <td className="border border-white/10 px-3 py-2">0.35-0.5 mm</td>
                      <td className="border border-white/10 px-3 py-2">Grain-oriented silicon steel</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Distribution transformers</td>
                      <td className="border border-white/10 px-3 py-2">0.27-0.35 mm</td>
                      <td className="border border-white/10 px-3 py-2">Cold-rolled silicon steel</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Motor cores</td>
                      <td className="border border-white/10 px-3 py-2">0.35-0.65 mm</td>
                      <td className="border border-white/10 px-3 py-2">Non-oriented silicon steel</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">High-frequency (&gt;400 Hz)</td>
                      <td className="border border-white/10 px-3 py-2">0.1-0.2 mm or ferrite</td>
                      <td className="border border-white/10 px-3 py-2">Thin steel or ferrite cores</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <p className="text-sm font-medium text-green-300 mb-2">How Laminations Work</p>
              <p className="text-sm text-white mb-2">
                Laminations break the core into thin sheets with insulating coatings between them.
                This creates high resistance paths perpendicular to the flux direction, where eddy
                currents would otherwise flow.
              </p>
              <ul className="text-xs text-white space-y-1 list-disc list-outside ml-4">
                <li className="pl-1">Each lamination acts as an independent thin conductor</li>
                <li className="pl-1">Eddy current paths are confined to individual laminations</li>
                <li className="pl-1">Smaller current loops = higher resistance = lower losses</li>
                <li className="pl-1">Halving lamination thickness reduces losses by factor of 4 (t² relationship)</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Alternative cores:</strong> For frequencies above a few kHz, ferrite cores (ceramic magnetic
              materials with very high resistivity) are used instead of laminated steel, as they have
              inherently low eddy current losses.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Hysteresis Losses */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Hysteresis Losses in Magnetic Materials
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Hysteresis loss occurs because energy is required to repeatedly magnetise and demagnetise
              magnetic core materials. In AC circuits, the magnetic field reverses every half-cycle,
              and each reversal requires energy to realign the magnetic domains within the material.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Steinmetz Equation for Hysteresis Loss</p>
              <p className="font-mono text-center text-lg mb-2">P<sub>h</sub> = η × B<sub>max</sub><sup>n</sup> × f × V</p>
              <p className="text-xs text-white/70 text-center">Where η = Steinmetz coefficient, n ≈ 1.6-2.0 (Steinmetz exponent), f = frequency, V = volume</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Understanding the B-H Hysteresis Loop:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Area of loop:</strong> Energy lost per cycle per unit volume</li>
                <li className="pl-1"><strong>Coercivity (H<sub>c</sub>):</strong> Field needed to demagnetise - lower is better</li>
                <li className="pl-1"><strong>Remanence (B<sub>r</sub>):</strong> Flux remaining when H = 0</li>
                <li className="pl-1"><strong>Soft magnetic materials:</strong> Narrow loops, low losses</li>
                <li className="pl-1"><strong>Hard magnetic materials:</strong> Wide loops, permanent magnets</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-3 rounded bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Soft Magnetic Materials</p>
                <p className="text-xs text-white/70 mb-2">Used in transformer and motor cores</p>
                <ul className="text-xs text-white space-y-1 list-disc list-outside ml-4">
                  <li className="pl-1">Silicon steel (3-4% Si)</li>
                  <li className="pl-1">Amorphous metals (metallic glass)</li>
                  <li className="pl-1">Nanocrystalline alloys</li>
                  <li className="pl-1">Ferrites (for high frequency)</li>
                </ul>
              </div>
              <div className="p-3 rounded bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Hard Magnetic Materials</p>
                <p className="text-xs text-white/70 mb-2">Used for permanent magnets</p>
                <ul className="text-xs text-white space-y-1 list-disc list-outside ml-4">
                  <li className="pl-1">Neodymium (NdFeB)</li>
                  <li className="pl-1">Samarium cobalt (SmCo)</li>
                  <li className="pl-1">Alnico alloys</li>
                  <li className="pl-1">Ferrite magnets (ceramic)</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
              <p className="text-sm font-medium text-purple-300 mb-2">Why Silicon is Added to Steel</p>
              <p className="text-sm text-white">
                Adding 3-4% silicon to steel increases its electrical resistivity (reducing eddy currents)
                and narrows the hysteresis loop (reducing hysteresis losses). However, silicon also makes
                the steel more brittle and harder to work. Grain-oriented silicon steel has even lower
                losses when the flux is aligned with the grain direction.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Comparing Core Materials</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Material</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Core Loss (W/kg @ 1.5T, 50Hz)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Standard silicon steel</td>
                      <td className="border border-white/10 px-3 py-2">2.5-4.0</td>
                      <td className="border border-white/10 px-3 py-2">Motors, small transformers</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Grain-oriented (GOES)</td>
                      <td className="border border-white/10 px-3 py-2">0.8-1.2</td>
                      <td className="border border-white/10 px-3 py-2">Power transformers</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Hi-B grade GOES</td>
                      <td className="border border-white/10 px-3 py-2">0.7-0.9</td>
                      <td className="border border-white/10 px-3 py-2">High-efficiency transformers</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Amorphous metal</td>
                      <td className="border border-white/10 px-3 py-2">0.2-0.3</td>
                      <td className="border border-white/10 px-3 py-2">Premium efficiency transformers</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key distinction:</strong> Hysteresis loss is proportional to f (linear), while eddy current
              loss is proportional to f² (quadratic). At 50 Hz, they are often comparable; at higher frequencies,
              eddy current losses dominate unless special materials are used.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 5: Stray Losses */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Stray Losses in Electrical Machines
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Stray losses are additional losses that occur in electrical machines beyond the calculated
              I²R and core losses. They are difficult to measure directly and are typically determined
              by subtracting known losses from total losses measured during testing.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Sources of stray losses:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Leakage flux:</strong> Flux that doesn't follow the intended magnetic path</li>
                <li className="pl-1"><strong>Harmonic losses:</strong> Non-sinusoidal flux causing additional core heating</li>
                <li className="pl-1"><strong>Slot leakage:</strong> Flux crossing slots in motor/generator cores</li>
                <li className="pl-1"><strong>End-winding losses:</strong> Eddy currents in structural parts near windings</li>
                <li className="pl-1"><strong>Bearing friction:</strong> Mechanical losses (often grouped separately)</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Loss Breakdown in Induction Motors</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Loss Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">% of Total Losses</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Varies With</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Stator I²R</td>
                      <td className="border border-white/10 px-3 py-2">25-40%</td>
                      <td className="border border-white/10 px-3 py-2">Load (current squared)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Rotor I²R</td>
                      <td className="border border-white/10 px-3 py-2">15-25%</td>
                      <td className="border border-white/10 px-3 py-2">Load (slip, current)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Core losses</td>
                      <td className="border border-white/10 px-3 py-2">15-25%</td>
                      <td className="border border-white/10 px-3 py-2">Constant (voltage dependent)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Friction & windage</td>
                      <td className="border border-white/10 px-3 py-2">5-15%</td>
                      <td className="border border-white/10 px-3 py-2">Speed</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Stray load losses</td>
                      <td className="border border-white/10 px-3 py-2">10-15%</td>
                      <td className="border border-white/10 px-3 py-2">Load (approximately I²)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design impact:</strong> Stray losses can be reduced through better magnetic circuit design,
              higher quality laminations, improved slot geometry, and careful attention to manufacturing tolerances.
              Premium efficiency motors achieve their ratings partly through reduced stray losses.
            </p>
          </div>
        </section>

        {/* Section 6: Cable Losses and Derating */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Cable Losses and Derating
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Cable current ratings in BS 7671 are based on limiting conductor temperature to protect
              insulation. The temperature rise is caused by I²R losses in the conductor. When cables
              cannot dissipate heat effectively, they must be derated.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Derating Factors (BS 7671 Correction Factors)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Factor</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Symbol</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Range</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ambient temperature</td>
                      <td className="border border-white/10 px-3 py-2">C<sub>a</sub></td>
                      <td className="border border-white/10 px-3 py-2">0.71 - 1.0</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Grouping</td>
                      <td className="border border-white/10 px-3 py-2">C<sub>g</sub></td>
                      <td className="border border-white/10 px-3 py-2">0.40 - 1.0</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Thermal insulation</td>
                      <td className="border border-white/10 px-3 py-2">C<sub>i</sub></td>
                      <td className="border border-white/10 px-3 py-2">0.5 - 1.0</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Soil thermal resistivity</td>
                      <td className="border border-white/10 px-3 py-2">C<sub>s</sub></td>
                      <td className="border border-white/10 px-3 py-2">0.85 - 1.0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-white/60 mt-2">Effective capacity I<sub>z</sub> = I<sub>t</sub> × C<sub>a</sub> × C<sub>g</sub> × C<sub>i</sub> × ...</p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-300 mb-2">Why Grouping Reduces Capacity</p>
              <p className="text-sm text-white">
                Each cable generates I²R heat. When cables are grouped together (in trunking, conduit, or trays),
                they share the surrounding air space. The heat from one cable warms adjacent cables, reducing
                their ability to dissipate their own heat. The grouping factor compensates for this mutual heating.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cable Loss Calculation Example</p>
              <div className="p-3 rounded bg-black/30">
                <p className="text-sm font-mono text-white/90 mb-2">
                  <strong>Problem:</strong> Calculate power loss in a 50m single-phase circuit using 4mm² cable carrying 25A
                </p>
                <p className="text-sm font-mono text-white/90">
                  Cable resistance at 70°C: r = 4.61 × 1.2 = 5.53 mΩ/m
                </p>
                <p className="text-sm font-mono text-white/90">
                  Total resistance: R = 2 × 50m × 5.53 mΩ/m = 0.553Ω
                </p>
                <p className="text-sm font-mono text-white/90">
                  Power loss: P = I²R = 25² × 0.553 = <strong>346W</strong>
                </p>
                <p className="text-xs text-white/60 mt-2">
                  This heat must be dissipated; if it cannot be, the cable will overheat.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-3 rounded bg-white/5">
                <p className="text-sm font-medium text-white mb-2">Factors Affecting Cable Losses</p>
                <ul className="text-xs text-white space-y-1 list-disc list-outside ml-4">
                  <li className="pl-1">Conductor material (copper vs aluminium)</li>
                  <li className="pl-1">Cross-sectional area (larger = lower R)</li>
                  <li className="pl-1">Operating temperature</li>
                  <li className="pl-1">Cable length</li>
                  <li className="pl-1">Load current (squared effect)</li>
                </ul>
              </div>
              <div className="p-3 rounded bg-white/5">
                <p className="text-sm font-medium text-white mb-2">Reducing Cable Losses</p>
                <ul className="text-xs text-white space-y-1 list-disc list-outside ml-4">
                  <li className="pl-1">Use larger cable cross-section</li>
                  <li className="pl-1">Minimise cable lengths</li>
                  <li className="pl-1">Use copper instead of aluminium</li>
                  <li className="pl-1">Improve ventilation</li>
                  <li className="pl-1">Consider higher voltage distribution</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Economic consideration:</strong> Using larger cables costs more initially but reduces
              ongoing energy losses. For heavily loaded circuits, the payback period can be surprisingly short.
            </p>
          </div>
        </section>

        {/* Section 7: Reducing Losses Through Design */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Reducing Losses Through Design
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Minimising electrical losses is essential for energy efficiency, reducing running costs,
              and meeting increasingly stringent building regulations. Loss reduction strategies must
              be considered at the design stage.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Strategies for Reducing I²R Losses</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Increase conductor size:</strong> Halving resistance halves losses (but cost increases)</li>
                <li className="pl-1"><strong>Reduce current:</strong> Use higher voltage distribution where practical</li>
                <li className="pl-1"><strong>Shorten cable runs:</strong> Locate distribution boards near load centres</li>
                <li className="pl-1"><strong>Improve power factor:</strong> Reduces current for same real power</li>
                <li className="pl-1"><strong>Balance loads:</strong> Reduce neutral current in three-phase systems</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Strategies for Reducing Core Losses</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Better materials:</strong> Grain-oriented steel, amorphous metals</li>
                <li className="pl-1"><strong>Thinner laminations:</strong> Reduce eddy current paths</li>
                <li className="pl-1"><strong>Lower flux density:</strong> Larger cores with more material</li>
                <li className="pl-1"><strong>Quality manufacturing:</strong> Avoid damage to lamination insulation</li>
                <li className="pl-1"><strong>Appropriate sizing:</strong> Avoid operating transformers at extreme loads</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Life Cycle Cost Analysis</p>
              <p className="text-sm text-white mb-3">
                Higher-efficiency equipment typically costs more to purchase but less to operate.
                The total cost of ownership includes both capital and running costs.
              </p>
              <div className="p-3 rounded bg-black/30">
                <p className="text-sm font-mono text-white/90 mb-2">
                  <strong>Example:</strong> Comparing two 100kVA transformers over 20 years
                </p>
                <p className="text-sm font-mono text-white/90">
                  Standard: Purchase £3,000, losses 2.5kW, annual cost £2,628 @ £0.12/kWh
                </p>
                <p className="text-sm font-mono text-white/90">
                  Premium: Purchase £4,500, losses 1.5kW, annual cost £1,577 @ £0.12/kWh
                </p>
                <p className="text-sm font-mono text-white/90 mt-2">
                  20-year saving: (£2,628 - £1,577) × 20 - £1,500 = <strong>£19,520</strong>
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-3 rounded bg-green-500/10 border border-green-500/30">
                <p className="text-sm font-medium text-green-300 mb-2">Design Stage Actions</p>
                <ul className="text-xs text-white space-y-1 list-disc list-outside ml-4">
                  <li className="pl-1">Specify high-efficiency transformers (Ecodesign)</li>
                  <li className="pl-1">Select IE3/IE4 motors</li>
                  <li className="pl-1">Optimise distribution voltage levels</li>
                  <li className="pl-1">Plan efficient cable routes</li>
                  <li className="pl-1">Consider power factor correction</li>
                </ul>
              </div>
              <div className="p-3 rounded bg-blue-500/10 border border-blue-500/30">
                <p className="text-sm font-medium text-blue-300 mb-2">Operational Actions</p>
                <ul className="text-xs text-white space-y-1 list-disc list-outside ml-4">
                  <li className="pl-1">De-energise lightly loaded transformers</li>
                  <li className="pl-1">Maintain power factor correction</li>
                  <li className="pl-1">Balance three-phase loads</li>
                  <li className="pl-1">Monitor and trend losses</li>
                  <li className="pl-1">Replace inefficient equipment</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Section 8: Building Services Applications */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">08</span>
            Building Services: Cable Sizing, Transformer Losses, Motor Efficiency
          </h2>
          <div className="text-white space-y-4 leading-relaxed">

            <div className="my-6">
              <h3 className="text-lg font-medium text-white mb-3">Cable Sizing for Loss Minimisation</h3>
              <p className="text-sm text-white mb-3">
                BS 7671 sets minimum cable sizes based on current capacity and voltage drop limits.
                However, economic cable sizing considers the cost of losses over the cable's lifetime.
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Load Current</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Min. Size (capacity)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Economic Size</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Loss Reduction</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">20A continuous</td>
                      <td className="border border-white/10 px-3 py-2">2.5mm²</td>
                      <td className="border border-white/10 px-3 py-2">4mm²</td>
                      <td className="border border-white/10 px-3 py-2">~40%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">32A continuous</td>
                      <td className="border border-white/10 px-3 py-2">4mm²</td>
                      <td className="border border-white/10 px-3 py-2">6mm²</td>
                      <td className="border border-white/10 px-3 py-2">~35%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">63A continuous</td>
                      <td className="border border-white/10 px-3 py-2">16mm²</td>
                      <td className="border border-white/10 px-3 py-2">25mm²</td>
                      <td className="border border-white/10 px-3 py-2">~35%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <h3 className="text-lg font-medium text-white mb-3">Transformer Losses and Efficiency</h3>
              <p className="text-sm text-white mb-3">
                Distribution transformers in buildings operate continuously. Their efficiency significantly
                impacts energy costs. The EU Ecodesign Directive sets minimum efficiency requirements.
              </p>

              <div className="my-4">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Transformer Loss Categories</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded bg-white/5">
                    <p className="text-sm font-medium text-white mb-1">No-Load (Iron) Losses</p>
                    <ul className="text-xs text-white/80 space-y-0.5 list-disc list-outside ml-4">
                      <li className="pl-1">Present whenever energised</li>
                      <li className="pl-1">Hysteresis + eddy current in core</li>
                      <li className="pl-1">Constant regardless of load</li>
                      <li className="pl-1">Typically 0.2-0.5% of rating</li>
                    </ul>
                  </div>
                  <div className="p-3 rounded bg-white/5">
                    <p className="text-sm font-medium text-white mb-1">Load (Copper) Losses</p>
                    <ul className="text-xs text-white/80 space-y-0.5 list-disc list-outside ml-4">
                      <li className="pl-1">I²R losses in windings</li>
                      <li className="pl-1">Proportional to load squared</li>
                      <li className="pl-1">Zero at no load</li>
                      <li className="pl-1">Typically 1-2% at full load</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="my-4 p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Ecodesign Tier 2 Requirements (from July 2021)</p>
                <div className="overflow-x-auto">
                  <table className="text-sm text-white w-full border-collapse">
                    <thead>
                      <tr className="bg-white/5">
                        <th className="border border-white/10 px-3 py-2 text-left">Rating (kVA)</th>
                        <th className="border border-white/10 px-3 py-2 text-left">Max No-Load Loss (W)</th>
                        <th className="border border-white/10 px-3 py-2 text-left">Max Load Loss (W)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-white/10 px-3 py-2">100</td>
                        <td className="border border-white/10 px-3 py-2">70</td>
                        <td className="border border-white/10 px-3 py-2">1,250</td>
                      </tr>
                      <tr>
                        <td className="border border-white/10 px-3 py-2">250</td>
                        <td className="border border-white/10 px-3 py-2">140</td>
                        <td className="border border-white/10 px-3 py-2">2,350</td>
                      </tr>
                      <tr>
                        <td className="border border-white/10 px-3 py-2">630</td>
                        <td className="border border-white/10 px-3 py-2">270</td>
                        <td className="border border-white/10 px-3 py-2">4,600</td>
                      </tr>
                      <tr>
                        <td className="border border-white/10 px-3 py-2">1000</td>
                        <td className="border border-white/10 px-3 py-2">380</td>
                        <td className="border border-white/10 px-3 py-2">6,500</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-white/60 mt-2">Values for oil-immersed three-phase transformers</p>
              </div>
            </div>

            <div className="my-6">
              <h3 className="text-lg font-medium text-white mb-3">Motor Efficiency Classes</h3>
              <p className="text-sm text-white mb-3">
                Motors are the largest single electrical load in most commercial buildings (HVAC, pumps, lifts).
                IEC 60034-30-1 defines efficiency classes, with EU regulations mandating minimum standards.
              </p>

              <div className="my-4">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">IE Efficiency Classes (IEC 60034-30-1)</p>
                <div className="overflow-x-auto">
                  <table className="text-sm text-white w-full border-collapse">
                    <thead>
                      <tr className="bg-white/5">
                        <th className="border border-white/10 px-3 py-2 text-left">Class</th>
                        <th className="border border-white/10 px-3 py-2 text-left">Name</th>
                        <th className="border border-white/10 px-3 py-2 text-left">Typical Efficiency (7.5kW)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-white/10 px-3 py-2">IE1</td>
                        <td className="border border-white/10 px-3 py-2">Standard</td>
                        <td className="border border-white/10 px-3 py-2">87.0%</td>
                      </tr>
                      <tr>
                        <td className="border border-white/10 px-3 py-2">IE2</td>
                        <td className="border border-white/10 px-3 py-2">High</td>
                        <td className="border border-white/10 px-3 py-2">89.1%</td>
                      </tr>
                      <tr>
                        <td className="border border-white/10 px-3 py-2">IE3</td>
                        <td className="border border-white/10 px-3 py-2">Premium</td>
                        <td className="border border-white/10 px-3 py-2">90.7%</td>
                      </tr>
                      <tr>
                        <td className="border border-white/10 px-3 py-2">IE4</td>
                        <td className="border border-white/10 px-3 py-2">Super Premium</td>
                        <td className="border border-white/10 px-3 py-2">92.0%</td>
                      </tr>
                      <tr>
                        <td className="border border-white/10 px-3 py-2">IE5</td>
                        <td className="border border-white/10 px-3 py-2">Ultra Premium</td>
                        <td className="border border-white/10 px-3 py-2">93.5%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="my-4 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                <p className="text-sm font-medium text-green-300 mb-2">EU Ecodesign Motor Requirements</p>
                <ul className="text-xs text-white space-y-1 list-disc list-outside ml-4">
                  <li className="pl-1">From July 2021: Motors 0.75-1000kW must meet IE3 minimum</li>
                  <li className="pl-1">From July 2023: Motors 75-200kW must meet IE4 minimum</li>
                  <li className="pl-1">VSD-driven motors can be IE2 if drive + motor meets system efficiency</li>
                  <li className="pl-1">Some applications (hazardous areas, high altitude) have exemptions</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Building Services Loss Reduction Checklist</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <p className="text-xs font-medium text-white mb-1">Design Stage</p>
                  <ul className="text-xs text-white/80 space-y-0.5 list-disc list-outside ml-4">
                    <li className="pl-1">Specify IE3/IE4 motors for all HVAC</li>
                    <li className="pl-1">Use VSDs for variable-load fans/pumps</li>
                    <li className="pl-1">Select Ecodesign-compliant transformers</li>
                    <li className="pl-1">Consider economic cable sizing</li>
                    <li className="pl-1">Install power factor correction</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-white mb-1">Operation Stage</p>
                  <ul className="text-xs text-white/80 space-y-0.5 list-disc list-outside ml-4">
                    <li className="pl-1">Monitor power quality and PF</li>
                    <li className="pl-1">Replace failing motors with higher IE class</li>
                    <li className="pl-1">Maintain PF correction capacitors</li>
                    <li className="pl-1">Balance three-phase loads</li>
                    <li className="pl-1">Review transformer loading annually</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Cable Loss Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 75m single-phase circuit uses 6mm² cable and carries 28A.
                Calculate the power loss and its cost over 8760 hours (one year) at £0.15/kWh.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Cable resistance at 70°C: r = 3.08 × 1.2 = 3.70 mΩ/m</p>
                <p>Total resistance: R = 2 × 75m × 3.70 mΩ/m = 0.555Ω</p>
                <p className="mt-2">Power loss: P = I²R = 28² × 0.555 = <strong>435W</strong></p>
                <p className="mt-2">Annual energy: E = 0.435kW × 8760h = 3,811 kWh</p>
                <p>Annual cost: 3,811 × £0.15 = <strong>£571.65</strong></p>
                <p className="mt-2 text-white/60">→ Upgrading to 10mm² would reduce losses by ~45%</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Transformer Efficiency</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 400kVA transformer has iron losses of 600W and copper losses
                of 4500W at full load. Calculate the efficiency at full load and at 50% load.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p><strong>At full load:</strong></p>
                <p>Output = 400kVA × 1.0 (assume pf=1) = 400kW</p>
                <p>Total losses = 600W + 4500W = 5100W = 5.1kW</p>
                <p>Efficiency = 400 / (400 + 5.1) × 100 = <strong>98.7%</strong></p>
                <p className="mt-2"><strong>At 50% load:</strong></p>
                <p>Output = 200kW</p>
                <p>Copper losses at 50% = 4500 × 0.5² = 1125W</p>
                <p>Total losses = 600 + 1125 = 1725W = 1.725kW</p>
                <p>Efficiency = 200 / (200 + 1.725) × 100 = <strong>99.1%</strong></p>
                <p className="mt-2 text-green-400">✓ Maximum efficiency occurs when iron losses ≈ copper losses</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Motor Efficiency Comparison</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> An 11kW AHU motor runs 6000 hours/year. Compare annual running
                costs between IE2 (89.4%) and IE4 (92.6%) motors at £0.15/kWh.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p><strong>IE2 motor:</strong></p>
                <p>Input power = 11 / 0.894 = 12.30kW</p>
                <p>Annual energy = 12.30 × 6000 = 73,826 kWh</p>
                <p>Annual cost = 73,826 × £0.15 = <strong>£11,074</strong></p>
                <p className="mt-2"><strong>IE4 motor:</strong></p>
                <p>Input power = 11 / 0.926 = 11.88kW</p>
                <p>Annual energy = 11.88 × 6000 = 71,274 kWh</p>
                <p>Annual cost = 71,274 × £0.15 = <strong>£10,691</strong></p>
                <p className="mt-2">Annual saving = £11,074 - £10,691 = <strong>£383/year</strong></p>
                <p className="text-white/60">→ Premium for IE4 typically recovered in 2-3 years</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 4: Core Loss Analysis</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A transformer core has total iron losses of 800W at 50Hz.
                If hysteresis losses are 60% of total, calculate the losses at 60Hz (same flux density).
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>At 50Hz:</p>
                <p>Hysteresis loss Ph = 0.6 × 800 = 480W (∝ f)</p>
                <p>Eddy current loss Pe = 0.4 × 800 = 320W (∝ f²)</p>
                <p className="mt-2">At 60Hz:</p>
                <p>New Ph = 480 × (60/50) = 480 × 1.2 = 576W</p>
                <p>New Pe = 320 × (60/50)² = 320 × 1.44 = 461W</p>
                <p className="mt-2">Total at 60Hz = 576 + 461 = <strong>1037W</strong></p>
                <p className="text-white/60">→ 30% increase in losses from 20% frequency increase</p>
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
                <li className="pl-1"><strong>P = I²R</strong> — Resistive power loss (Joule heating)</li>
                <li className="pl-1"><strong>P<sub>e</sub> ∝ f² × t²</strong> — Eddy current loss (frequency and lamination squared)</li>
                <li className="pl-1"><strong>P<sub>h</sub> ∝ f × B<sup>n</sup></strong> — Hysteresis loss (Steinmetz equation)</li>
                <li className="pl-1"><strong>δ = √(ρ/πfμ)</strong> — Skin depth</li>
                <li className="pl-1"><strong>η = P<sub>out</sub>/(P<sub>out</sub> + losses)</strong> — Efficiency</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Skin depth in copper at 50 Hz: <strong>≈9 mm</strong></li>
                <li className="pl-1">Copper resistance temperature coefficient: <strong>+0.4%/°C</strong></li>
                <li className="pl-1">Resistance increase at 70°C vs 20°C: <strong>×1.2</strong></li>
                <li className="pl-1">Typical transformer efficiency: <strong>97-99%</strong></li>
                <li className="pl-1">IE3 motor efficiency (typical): <strong>90-95%</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Forgetting squared relationships</strong> — I²R and f² for eddy currents</li>
                <li className="pl-1"><strong>Using cold resistance</strong> — Cable resistance at operating temperature is higher</li>
                <li className="pl-1"><strong>Ignoring iron losses at light load</strong> — They are constant and dominate efficiency</li>
                <li className="pl-1"><strong>Not considering derating</strong> — Grouped cables cannot dissipate heat effectively</li>
                <li className="pl-1"><strong>Overlooking power factor</strong> — Poor PF increases current and I²R losses</li>
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
                <p className="font-medium text-white mb-1">Loss Types</p>
                <ul className="space-y-0.5">
                  <li>I²R (Joule) - Conductors, windings</li>
                  <li>Eddy current - Magnetic cores (∝ f²)</li>
                  <li>Hysteresis - Magnetic cores (∝ f)</li>
                  <li>Stray - Leakage flux, harmonics</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Loss Reduction</p>
                <ul className="space-y-0.5">
                  <li>Larger conductors - Lower R</li>
                  <li>Laminations - Reduced eddy currents</li>
                  <li>Silicon steel - Lower hysteresis</li>
                  <li>Higher voltage - Lower current</li>
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
            <Link to="../h-n-c-module3-section5-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Section 5.8
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section6-2">
              Next: Section 6.2
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule3Section6_1;
