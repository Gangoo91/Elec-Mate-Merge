import { ArrowLeft, Droplets, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Bernoulli's Equation - HNC Module 2 Section 2.3";
const DESCRIPTION = "Master Bernoulli's equation for fluid energy conservation. Learn pressure-velocity-elevation relationships and practical applications including venturi meters and pitot tubes.";

const quickCheckQuestions = [
  {
    id: "bernoulli-terms",
    question: "Bernoulli's equation states that the sum of which three energy terms remains constant along a streamline?",
    options: ["Kinetic, potential, thermal", "Pressure, velocity (kinetic), elevation (potential)", "Mass, volume, density", "Force, work, power"],
    correctIndex: 1,
    explanation: "Bernoulli's equation: P + ½ρv² + ρgh = constant. The three terms represent pressure energy, kinetic energy (velocity), and potential energy (elevation)."
  },
  {
    id: "velocity-pressure",
    question: "According to Bernoulli's principle, when fluid velocity increases through a constriction, what happens to static pressure?",
    options: ["Pressure increases", "Pressure decreases", "Pressure stays the same", "Pressure becomes zero"],
    correctIndex: 1,
    explanation: "As velocity increases, kinetic energy increases. Since total energy is constant, static pressure must decrease. This principle explains how venturi meters and aircraft wings work."
  },
  {
    id: "venturi-application",
    question: "A venturi meter uses Bernoulli's principle to measure:",
    options: ["Temperature", "Pressure only", "Flow rate", "Pipe diameter"],
    correctIndex: 2,
    explanation: "A venturi meter measures flow rate by creating a constriction. The pressure difference between the wide and narrow sections can be related to velocity, and hence flow rate, using Bernoulli's equation."
  },
  {
    id: "pitot-tube",
    question: "A pitot tube measures:",
    options: ["Static pressure only", "Dynamic (velocity) pressure only", "Stagnation (total) pressure", "Atmospheric pressure"],
    correctIndex: 2,
    explanation: "A pitot tube measures stagnation (total) pressure - the pressure when flow is brought to rest. Combined with static pressure measurement, this allows velocity calculation using P_total = P_static + ½ρv²."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What assumption is NOT required for the ideal form of Bernoulli's equation?",
    options: [
      "Steady flow conditions",
      "Incompressible fluid",
      "Turbulent flow",
      "No friction losses"
    ],
    correctAnswer: 2,
    explanation: "The ideal Bernoulli equation requires steady, incompressible flow with no friction (inviscid). It doesn't require laminar flow - it applies along a streamline regardless of whether overall flow is laminar or turbulent."
  },
  {
    id: 2,
    question: "In Bernoulli's equation P + ½ρv² + ρgh = constant, what does the term ½ρv² represent?",
    options: [
      "Static pressure",
      "Dynamic (velocity) pressure",
      "Elevation head",
      "Total pressure"
    ],
    correctAnswer: 1,
    explanation: "½ρv² is the dynamic or velocity pressure - the kinetic energy per unit volume of the moving fluid. It represents the pressure increase that would occur if the fluid were brought to rest."
  },
  {
    id: 3,
    question: "Water flows through a horizontal pipe that narrows from 100mm to 50mm diameter. If the velocity in the larger section is 1 m/s, what is the velocity in the smaller section?",
    options: ["2 m/s", "4 m/s", "8 m/s", "16 m/s"],
    correctAnswer: 1,
    explanation: "Using continuity: A₁v₁ = A₂v₂. Since A ∝ D², and diameter halves (ratio 2:1), area reduces by factor 4. Therefore v₂ = v₁ × (A₁/A₂) = 1 × 4 = 4 m/s."
  },
  {
    id: 4,
    question: "The pressure difference measured across a venturi meter throat is 20 kPa. If the approach velocity is negligible, what is the throat velocity? (ρ = 1000 kg/m³)",
    options: ["4.5 m/s", "6.3 m/s", "10 m/s", "20 m/s"],
    correctAnswer: 1,
    explanation: "Using Bernoulli: ΔP = ½ρv². Rearranging: v = √(2ΔP/ρ) = √(2 × 20000/1000) = √40 = 6.32 m/s"
  },
  {
    id: 5,
    question: "Which device uses Bernoulli's principle to measure air velocity in ductwork?",
    options: [
      "Thermometer",
      "Pitot-static tube",
      "Pressure gauge",
      "Flow switch"
    ],
    correctAnswer: 1,
    explanation: "A pitot-static tube measures both total (stagnation) pressure and static pressure. The difference gives dynamic pressure, from which velocity can be calculated: v = √(2×ΔP/ρ)."
  },
  {
    id: 6,
    question: "In a horizontal pipe, if flow velocity doubles, by what factor does the dynamic pressure change?",
    options: ["Doubles (×2)", "Triples (×3)", "Quadruples (×4)", "Halves (÷2)"],
    correctAnswer: 2,
    explanation: "Dynamic pressure = ½ρv². Since it depends on v², doubling velocity quadruples dynamic pressure. This is why high velocities create significant pressure drops."
  },
  {
    id: 7,
    question: "A water jet rises 5m vertically from a nozzle. Ignoring air resistance, what was the jet velocity at the nozzle exit? (g = 10 m/s²)",
    options: ["5 m/s", "10 m/s", "25 m/s", "50 m/s"],
    correctAnswer: 1,
    explanation: "Using energy conservation (Bernoulli): ½v² = gh. Therefore v = √(2gh) = √(2 × 10 × 5) = √100 = 10 m/s."
  },
  {
    id: 8,
    question: "The Bernoulli equation can be expressed in terms of 'head'. What are the units of head?",
    options: ["Pascals", "Metres", "kg/m³", "Watts"],
    correctAnswer: 1,
    explanation: "When Bernoulli's equation is divided by ρg, all terms have units of metres (length). Pressure head = P/ρg, velocity head = v²/2g, elevation head = h. This 'head' form is common in pump specifications."
  },
  {
    id: 9,
    question: "Why do real pipe systems require modification of Bernoulli's equation?",
    options: [
      "Fluids are always compressible",
      "Friction losses occur in real systems",
      "Gravity doesn't affect fluids",
      "Pressure is not conserved"
    ],
    correctAnswer: 1,
    explanation: "Real systems have friction losses in pipes and fittings. The extended Bernoulli equation adds a head loss term: P₁/ρg + v₁²/2g + z₁ = P₂/ρg + v₂²/2g + z₂ + h_loss"
  },
  {
    id: 10,
    question: "In building services, the Bernoulli principle explains why:",
    options: [
      "Pumps need electricity",
      "Partially closed valves cause large pressure drops",
      "Pipes expand when heated",
      "Water boils at 100°C"
    ],
    correctAnswer: 1,
    explanation: "Partially closed valves create constrictions that accelerate flow. By Bernoulli's principle, this converts pressure energy to kinetic energy, causing pressure drop. The energy is then dissipated as turbulence and heat."
  },
  {
    id: 11,
    question: "A pump adds energy to a fluid system. In the extended Bernoulli equation, this appears as:",
    options: [
      "Increased friction loss",
      "Reduced velocity",
      "Added head (positive pump term)",
      "Decreased elevation"
    ],
    correctAnswer: 2,
    explanation: "The extended Bernoulli equation includes pump head: P₁/ρg + v₁²/2g + z₁ + H_pump = P₂/ρg + v₂²/2g + z₂ + h_loss. Pump head H_pump is positive, representing energy added to the system."
  },
  {
    id: 12,
    question: "At a stagnation point in fluid flow, the velocity is zero. What happens to the pressure?",
    options: [
      "Pressure is zero",
      "Pressure is at its minimum",
      "Pressure reaches its maximum (stagnation pressure)",
      "Pressure equals atmospheric"
    ],
    correctAnswer: 2,
    explanation: "At a stagnation point, all kinetic energy converts to pressure energy. The stagnation pressure is the maximum pressure in the flow: P_stag = P_static + ½ρv². This is measured by a pitot tube."
  }
];

const faqs = [
  {
    question: "When can I use the simple Bernoulli equation in building services?",
    answer: "The simple form works well for short sections of pipe between two points, especially where elevation changes or velocity changes are dominant (like venturis or orifice plates). For full system analysis with significant pipe lengths, you must add friction losses using the extended equation."
  },
  {
    question: "What is the difference between static, dynamic, and total pressure?",
    answer: "Static pressure is the pressure measured perpendicular to flow (what a normal gauge reads). Dynamic pressure is ½ρv², representing kinetic energy. Total (stagnation) pressure is their sum. In a pitot-static measurement, total minus static equals dynamic, giving velocity."
  },
  {
    question: "Why does pressure drop at restrictions even though Bernoulli says energy is conserved?",
    answer: "Bernoulli shows static pressure drops at restrictions because kinetic energy increases. However, downstream the velocity slows but not all pressure is recovered - some energy is lost to turbulence and friction (not accounted for in ideal Bernoulli). The extended equation includes these losses."
  },
  {
    question: "How do venturi meters differ from orifice plates?",
    answer: "Both use Bernoulli's principle to measure flow. Venturi meters have gradual converging and diverging sections, recovering most pressure (low permanent loss, ~10%). Orifice plates are cheaper but have abrupt restrictions causing higher permanent losses (~60-70%). Venturis are preferred for large flows and permanent installations."
  },
  {
    question: "What is velocity head and why is it useful?",
    answer: "Velocity head is v²/2g (in metres). It represents kinetic energy in units of fluid height. This form is useful because pump heads, friction losses, and elevation changes can all be expressed in metres and directly compared. A flow at 2 m/s has velocity head of 2²/(2×9.81) = 0.2 m."
  },
  {
    question: "How does Bernoulli's equation apply to air handling systems?",
    answer: "The same principles apply to air, but density is much lower (~1.2 kg/m³). Pitot-static tubes measure duct velocities, and pressure drops through filters, coils, and dampers follow Bernoulli relationships. Air systems typically operate at much higher velocities (5-15 m/s) than water systems due to the lower density."
  }
];

const HNCModule2Section2_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module2-section2">
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
            <Droplets className="h-4 w-4" />
            <span>Module 2.2.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Bernoulli's Equation
          </h1>
          <p className="text-white/80">
            Energy conservation in fluid systems and practical measurement applications
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Bernoulli:</strong> P + ½ρv² + ρgh = constant</li>
              <li className="pl-1"><strong>Trade-off:</strong> Velocity up = pressure down</li>
              <li className="pl-1"><strong>Applications:</strong> Venturi, pitot tube, orifice plate</li>
              <li className="pl-1"><strong>Head form:</strong> P/ρg + v²/2g + z = constant</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Flow measurement:</strong> Differential pressure devices</li>
              <li className="pl-1"><strong>Valve losses:</strong> High velocity through restrictions</li>
              <li className="pl-1"><strong>Pump systems:</strong> Extended equation with losses</li>
              <li className="pl-1"><strong>Air systems:</strong> Duct velocity measurements</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "State and apply Bernoulli's equation for ideal fluid flow",
              "Understand the relationship between pressure, velocity, and elevation",
              "Calculate velocity from pressure measurements",
              "Explain how venturi meters and pitot tubes work",
              "Apply the extended Bernoulli equation with head losses",
              "Convert between pressure and head forms of the equation"
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

        {/* Section 1: Energy Conservation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Energy Conservation in Fluids
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Bernoulli's equation is an expression of energy conservation for flowing fluids. It states that
              the total mechanical energy per unit volume remains constant along a streamline in ideal flow.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Bernoulli's Equation (Energy Form)</p>
              <p className="font-mono text-center text-lg mb-2">P + ½ρv² + ρgh = constant</p>
              <div className="text-xs text-white/70 text-center space-y-1">
                <p>P = static pressure (Pa), ρ = density (kg/m³), v = velocity (m/s)</p>
                <p>g = gravitational acceleration (9.81 m/s²), h = elevation (m)</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">The three energy terms:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>P (Pressure energy):</strong> Work done by pressure forces (flow work)</li>
                <li className="pl-1"><strong>½ρv² (Kinetic energy):</strong> Energy due to fluid motion</li>
                <li className="pl-1"><strong>ρgh (Potential energy):</strong> Energy due to elevation</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Head Form (divided by ρg)</p>
              <div className="p-3 rounded bg-white/5">
                <p className="font-mono text-center text-lg mb-2">P/ρg + v²/2g + z = constant</p>
                <p className="text-xs text-white/70 text-center">All terms in metres - useful for pump calculations</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Assumptions for ideal Bernoulli:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Steady flow (no time variation)</li>
                <li className="pl-1">Incompressible fluid (constant density)</li>
                <li className="pl-1">Inviscid (no friction losses)</li>
                <li className="pl-1">Along a single streamline</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key insight:</strong> Energy can convert between forms, but the total is constant. Increasing velocity must come at the expense of pressure or elevation.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Pressure-Velocity Relationship */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Pressure-Velocity Relationship
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The most important consequence of Bernoulli's equation for building services is the inverse
              relationship between velocity and pressure in horizontal flow.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">For Horizontal Flow (z₁ = z₂)</p>
              <p className="font-mono text-center text-lg mb-2">P₁ + ½ρv₁² = P₂ + ½ρv₂²</p>
              <p className="text-xs text-white/70 text-center">If velocity increases, static pressure must decrease</p>
            </div>

            <div className="grid sm:grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-white/5">
                <p className="font-bold text-white mb-1">Static Pressure</p>
                <p className="text-white/70 text-xs">P - measured perpendicular to flow</p>
                <p className="text-white/70 text-xs">What gauges typically read</p>
              </div>
              <div className="p-3 rounded bg-white/5">
                <p className="font-bold text-white mb-1">Dynamic Pressure</p>
                <p className="text-white/70 text-xs">½ρv² - kinetic energy term</p>
                <p className="text-white/70 text-xs">Increases with velocity²</p>
              </div>
              <div className="p-3 rounded bg-white/5">
                <p className="font-bold text-white mb-1">Total Pressure</p>
                <p className="text-white/70 text-xs">P + ½ρv² = stagnation</p>
                <p className="text-white/70 text-xs">Measured by pitot tube</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Practical Implications</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Scenario</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Velocity</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Pressure</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Pipe constriction</td>
                      <td className="border border-white/10 px-3 py-2">Increases</td>
                      <td className="border border-white/10 px-3 py-2">Decreases</td>
                      <td className="border border-white/10 px-3 py-2">Venturi meter</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Pipe expansion</td>
                      <td className="border border-white/10 px-3 py-2">Decreases</td>
                      <td className="border border-white/10 px-3 py-2">Increases (recovery)</td>
                      <td className="border border-white/10 px-3 py-2">Diffuser sections</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Stagnation point</td>
                      <td className="border border-white/10 px-3 py-2">Zero</td>
                      <td className="border border-white/10 px-3 py-2">Maximum</td>
                      <td className="border border-white/10 px-3 py-2">Pitot tube tip</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Partially closed valve</td>
                      <td className="border border-white/10 px-3 py-2">Increases locally</td>
                      <td className="border border-white/10 px-3 py-2">Large drop</td>
                      <td className="border border-white/10 px-3 py-2">Flow control</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Dynamic pressure scales with v². Doubling velocity quadruples dynamic pressure, creating significant effects at high flow rates.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Practical Applications */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Practical Applications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Several important flow measurement and control devices in building services rely directly
              on Bernoulli's equation to relate pressure measurements to flow rates.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Venturi Meter</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Gradual convergent-divergent section</li>
                  <li className="pl-1">Measures ΔP between inlet and throat</li>
                  <li className="pl-1">Low permanent pressure loss (~10%)</li>
                  <li className="pl-1">Accurate flow measurement</li>
                  <li className="pl-1">Used for large pipe installations</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Orifice Plate</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Sharp-edged restriction in pipe</li>
                  <li className="pl-1">Measures ΔP across the plate</li>
                  <li className="pl-1">Higher permanent loss (~60-70%)</li>
                  <li className="pl-1">Simple and inexpensive</li>
                  <li className="pl-1">Common for temporary measurement</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Pitot-Static Tube</p>
              <p className="text-sm mb-2">
                Combines a forward-facing hole (total pressure) with side holes (static pressure).
                The velocity is calculated from the pressure difference.
              </p>
              <p className="font-mono text-center mb-2">v = √(2ΔP/ρ)</p>
              <p className="text-xs text-white/70">Where ΔP = P_total - P_static = dynamic pressure = ½ρv²</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Flow Rate from Differential Pressure</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Device</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Formula</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Cd Typical</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ideal (theoretical)</td>
                      <td className="border border-white/10 px-3 py-2">Q = A₂√(2ΔP/ρ(1-β⁴))</td>
                      <td className="border border-white/10 px-3 py-2">1.0</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Venturi</td>
                      <td className="border border-white/10 px-3 py-2">Q = Cd × A₂√(2ΔP/ρ(1-β⁴))</td>
                      <td className="border border-white/10 px-3 py-2">0.98</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Orifice plate</td>
                      <td className="border border-white/10 px-3 py-2">Q = Cd × A₂√(2ΔP/ρ(1-β⁴))</td>
                      <td className="border border-white/10 px-3 py-2">0.60-0.65</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-white/70 mt-2">β = d/D (diameter ratio), Cd = discharge coefficient</p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical note:</strong> Flow is proportional to √ΔP. To double the flow, you need four times the differential pressure.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Extended Bernoulli Equation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Extended Bernoulli with Losses and Pumps
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Real systems have friction losses in pipes and fittings, and may include pumps that add
              energy. The extended Bernoulli equation accounts for these real-world effects.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Extended Bernoulli Equation (Head Form)</p>
              <p className="font-mono text-center text-lg mb-2">P₁/ρg + v₁²/2g + z₁ + H<sub>p</sub> = P₂/ρg + v₂²/2g + z₂ + h<sub>f</sub></p>
              <div className="text-xs text-white/70 text-center space-y-1">
                <p>H<sub>p</sub> = pump head added (m), h<sub>f</sub> = total friction head loss (m)</p>
                <p>All terms in metres of fluid</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Energy Sources (+)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Pump head (H<sub>p</sub>):</strong> Energy added by pumps</li>
                  <li className="pl-1"><strong>Elevation (z₁):</strong> Gravity assists downward flow</li>
                  <li className="pl-1"><strong>Pressure (P₁):</strong> Upstream pressure available</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Energy Sinks (-)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Friction losses (h<sub>f</sub>):</strong> Energy lost in pipes/fittings</li>
                  <li className="pl-1"><strong>Elevation (z₂):</strong> Work against gravity for upward flow</li>
                  <li className="pl-1"><strong>Pressure (P₂):</strong> Required delivery pressure</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Rearranged for pump head required:</p>
              <div className="p-3 rounded bg-white/5">
                <p className="font-mono text-center mb-2">H<sub>p</sub> = (P₂-P₁)/ρg + (v₂²-v₁²)/2g + (z₂-z₁) + h<sub>f</sub></p>
                <p className="text-xs text-white/70 text-center">Pump head = Pressure rise + Velocity change + Elevation change + Friction losses</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Head Loss Components</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Component</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Loss Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Range</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Straight pipe</td>
                      <td className="border border-white/10 px-3 py-2">Friction (Darcy-Weisbach)</td>
                      <td className="border border-white/10 px-3 py-2">100-400 Pa/m</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">90° elbow</td>
                      <td className="border border-white/10 px-3 py-2">Minor loss (K factor)</td>
                      <td className="border border-white/10 px-3 py-2">K = 0.3-1.0</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Globe valve (open)</td>
                      <td className="border border-white/10 px-3 py-2">Minor loss (K factor)</td>
                      <td className="border border-white/10 px-3 py-2">K = 6-10</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Heat exchanger</td>
                      <td className="border border-white/10 px-3 py-2">Specified by manufacturer</td>
                      <td className="border border-white/10 px-3 py-2">20-80 kPa</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>System design:</strong> The pump must provide enough head to overcome all losses and deliver the required flow at the design pressure.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Velocity from Pitot Tube</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A pitot-static tube in a duct measures 120 Pa differential pressure. What is the air velocity? (ρ<sub>air</sub> = 1.2 kg/m³)
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Using v = √(2ΔP/ρ)</p>
                <p>v = √(2 × 120 / 1.2)</p>
                <p>v = √200 = <strong>14.1 m/s</strong></p>
                <p className="mt-2 text-white/60">→ Typical velocity for main supply ductwork</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Venturi Flow Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A venturi meter (Cd = 0.98) has 100mm inlet and 50mm throat. ΔP = 25 kPa. Calculate water flow rate.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>β = 50/100 = 0.5, so β⁴ = 0.0625</p>
                <p>A₂ = π × 0.05²/4 = 0.00196 m²</p>
                <p className="mt-2">Theoretical v₂ = √(2×25000/(1000×(1-0.0625)))</p>
                <p>v₂ = √(50000/937.5) = √53.3 = 7.3 m/s</p>
                <p className="mt-2">Q = Cd × A₂ × v₂ = 0.98 × 0.00196 × 7.3</p>
                <p>Q = <strong>0.014 m³/s = 14 l/s</strong></p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Pump Head Requirement</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Calculate pump head to deliver water to a tank 25m higher with 15m friction losses and 2 bar delivery pressure.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>H<sub>p</sub> = Elevation + Friction + Pressure head</p>
                <p>Pressure head = P/ρg = 200,000/(1000×9.81) = 20.4 m</p>
                <p className="mt-2">H<sub>p</sub> = 25 + 15 + 20.4 = <strong>60.4 m</strong></p>
                <p className="mt-2 text-white/60">→ Select pump with ≥60 m head at design flow</p>
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
                <li className="pl-1"><strong>P + ½ρv² + ρgh = constant</strong> — Bernoulli (energy form)</li>
                <li className="pl-1"><strong>P/ρg + v²/2g + z = constant</strong> — Bernoulli (head form)</li>
                <li className="pl-1"><strong>v = √(2ΔP/ρ)</strong> — Velocity from pitot tube</li>
                <li className="pl-1"><strong>Q ∝ √ΔP</strong> — Flow vs differential pressure</li>
                <li className="pl-1"><strong>h<sub>loss</sub> = K × v²/2g</strong> — Minor loss equation</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Velocity head: <strong>v²/2g</strong> (metres)</li>
                <li className="pl-1">1 m/s velocity head: <strong>0.05 m</strong></li>
                <li className="pl-1">3 m/s velocity head: <strong>0.46 m</strong></li>
                <li className="pl-1">Venturi Cd: <strong>~0.98</strong></li>
                <li className="pl-1">Orifice Cd: <strong>~0.62</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Forgetting friction:</strong> Ideal Bernoulli ignores losses - use extended form</li>
                <li className="pl-1"><strong>Elevation sign:</strong> Positive z is upward - be consistent</li>
                <li className="pl-1"><strong>Pressure units:</strong> Ensure Pa for SI calculations</li>
                <li className="pl-1"><strong>Discharge coefficient:</strong> Real devices need Cd correction</li>
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
                <p className="font-medium text-white mb-1">Bernoulli Components</p>
                <ul className="space-y-0.5">
                  <li>Static pressure: P (Pa)</li>
                  <li>Dynamic pressure: ½ρv² (Pa)</li>
                  <li>Elevation: ρgh (Pa)</li>
                  <li>Head form: divide by ρg (metres)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Flow Measurement</p>
                <ul className="space-y-0.5">
                  <li>Pitot tube: v = √(2ΔP/ρ)</li>
                  <li>Venturi: Cd ≈ 0.98, low loss</li>
                  <li>Orifice: Cd ≈ 0.62, high loss</li>
                  <li>Flow ∝ √ΔP</li>
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
            <Link to="../h-n-c-module2-section2-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Flow Characteristics
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module2-section2-4">
              Next: Pipe Sizing and Pressure Drop
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule2Section2_3;
