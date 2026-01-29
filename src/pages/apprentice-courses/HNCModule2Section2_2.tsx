import { ArrowLeft, Droplets, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Flow Characteristics - HNC Module 2 Section 2.2";
const DESCRIPTION = "Understand laminar and turbulent flow, Reynolds number calculations, flow patterns and velocity profiles for building services hydraulic system design.";

const quickCheckQuestions = [
  {
    id: "reynolds-transition",
    question: "At what Reynolds number does flow typically transition from laminar to turbulent in pipes?",
    options: ["Re < 500", "Re ≈ 2300", "Re ≈ 4000", "Re > 10,000"],
    correctIndex: 1,
    explanation: "The critical Reynolds number for pipe flow is approximately 2300. Below this, flow is laminar; above approximately 4000, flow is fully turbulent. Between 2300-4000 is the transition zone."
  },
  {
    id: "laminar-profile",
    question: "What is the shape of the velocity profile in fully developed laminar pipe flow?",
    options: ["Flat (uniform)", "Parabolic", "Triangular", "Logarithmic"],
    correctIndex: 1,
    explanation: "Laminar flow has a parabolic velocity profile with maximum velocity at the centre (twice the average velocity) and zero velocity at the pipe wall due to the no-slip condition."
  },
  {
    id: "reynolds-formula",
    question: "Which formula correctly calculates Reynolds number?",
    options: ["Re = μvD/ρ", "Re = ρvD/μ", "Re = ρμ/vD", "Re = vD/ρμ"],
    correctIndex: 1,
    explanation: "Re = ρvD/μ where ρ is density (kg/m³), v is velocity (m/s), D is diameter (m), and μ is dynamic viscosity (Pa·s). This can also be written as Re = vD/ν using kinematic viscosity."
  },
  {
    id: "flow-type-hvac",
    question: "In typical HVAC pipe systems, flow is usually:",
    options: ["Always laminar", "Usually turbulent", "Always transitional", "Supersonic"],
    correctIndex: 1,
    explanation: "HVAC systems typically operate with turbulent flow (Re > 4000) due to practical flow velocities of 1-3 m/s in pipes. This actually improves heat transfer but increases friction losses."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What characterises laminar flow?",
    options: [
      "Chaotic fluid motion with mixing between layers",
      "Smooth, parallel fluid layers with no mixing",
      "Pulsating flow patterns",
      "Flow only possible at high velocities"
    ],
    correctAnswer: 1,
    explanation: "Laminar flow is characterised by smooth, orderly fluid motion where adjacent layers slide past each other without mixing. It occurs at low Reynolds numbers and has predictable, calculable behaviour."
  },
  {
    id: 2,
    question: "What does the Reynolds number represent?",
    options: [
      "The ratio of pressure forces to gravity forces",
      "The ratio of inertial forces to viscous forces",
      "The ratio of flow velocity to sound velocity",
      "The ratio of pipe diameter to length"
    ],
    correctAnswer: 1,
    explanation: "Reynolds number (Re) is the ratio of inertial forces to viscous forces in a fluid. High Re means inertial forces dominate (turbulent flow); low Re means viscous forces dominate (laminar flow)."
  },
  {
    id: 3,
    question: "Water flows at 2 m/s through a 50mm diameter pipe. Calculate the Reynolds number. (ρ = 1000 kg/m³, μ = 0.001 Pa·s)",
    options: ["1,000", "10,000", "100,000", "1,000,000"],
    correctAnswer: 2,
    explanation: "Re = ρvD/μ = (1000 × 2 × 0.05) / 0.001 = 100,000. This is well into the turbulent regime, typical for HVAC pipe systems."
  },
  {
    id: 4,
    question: "In turbulent flow, the velocity profile is:",
    options: [
      "Parabolic with maximum at centre",
      "Flat across most of the pipe with thin boundary layers",
      "Maximum at the pipe wall",
      "Constant throughout"
    ],
    correctAnswer: 1,
    explanation: "Turbulent flow has a much flatter velocity profile than laminar flow, with thin boundary layers near the walls. The average velocity is closer to the maximum velocity (about 80-85%)."
  },
  {
    id: 5,
    question: "What is the maximum velocity in fully developed laminar pipe flow compared to the average velocity?",
    options: [
      "Equal to average velocity",
      "1.5 times average velocity",
      "2 times average velocity",
      "3 times average velocity"
    ],
    correctAnswer: 2,
    explanation: "In laminar flow, the parabolic profile means the centreline (maximum) velocity is exactly twice the average velocity: v_max = 2 × v_avg."
  },
  {
    id: 6,
    question: "Which factor does NOT directly affect the Reynolds number?",
    options: ["Fluid velocity", "Pipe diameter", "Fluid viscosity", "Pipe material roughness"],
    correctAnswer: 3,
    explanation: "Re = ρvD/μ involves density, velocity, diameter, and viscosity. Pipe roughness affects friction factor but not the Reynolds number itself."
  },
  {
    id: 7,
    question: "Why is turbulent flow generally preferred for heat transfer in HVAC systems?",
    options: [
      "Lower pumping energy required",
      "Better mixing improves heat transfer coefficient",
      "Simpler calculations",
      "Lower noise levels"
    ],
    correctAnswer: 1,
    explanation: "Turbulent flow enhances heat transfer because the chaotic mixing brings more fluid into contact with heat transfer surfaces. Heat transfer coefficients can be 5-10 times higher than laminar flow."
  },
  {
    id: 8,
    question: "The transition zone for pipe flow occurs between Reynolds numbers of approximately:",
    options: ["500 - 1000", "1000 - 2000", "2300 - 4000", "4000 - 10000"],
    correctAnswer: 2,
    explanation: "The transition zone is between Re ≈ 2300 (laminar breakdown) and Re ≈ 4000 (fully turbulent). Flow in this region is unstable and unpredictable."
  },
  {
    id: 9,
    question: "How does increasing fluid temperature typically affect the Reynolds number for water flow?",
    options: [
      "Decreases Re (more laminar tendency)",
      "Increases Re (more turbulent tendency)",
      "No effect on Re",
      "Makes Re unpredictable"
    ],
    correctAnswer: 1,
    explanation: "Higher temperature reduces water viscosity, which increases Re (since Re = ρvD/μ). This means heated water is more likely to be turbulent than cold water at the same velocity."
  },
  {
    id: 10,
    question: "What is the entry length for flow to become fully developed?",
    options: [
      "Always 10 pipe diameters",
      "Depends on Reynolds number - longer for laminar flow",
      "Same for laminar and turbulent flow",
      "Entry effects are negligible"
    ],
    correctAnswer: 1,
    explanation: "Entry length depends on Re. For laminar flow: L_e ≈ 0.06 Re × D (can be very long). For turbulent flow: L_e ≈ 10-60 D (much shorter). This affects pressure drop calculations near fittings."
  },
  {
    id: 11,
    question: "In a Y-junction where flow splits, what happens to velocity if one branch has twice the cross-sectional area of the other?",
    options: [
      "Velocity is equal in both branches",
      "Velocity is higher in the smaller branch",
      "Velocity is higher in the larger branch",
      "Velocity depends only on pressure difference"
    ],
    correctAnswer: 1,
    explanation: "From continuity (Q = Av), if flow splits based on resistance, the smaller area branch will have higher velocity. For equal pressure drop, more flow goes through the larger branch but at lower velocity."
  },
  {
    id: 12,
    question: "What is the continuity equation for incompressible flow?",
    options: [
      "A₁v₁ = A₂v₂",
      "P₁ + ρv₁² = P₂ + ρv₂²",
      "F = ma",
      "Q = ΔP/R"
    ],
    correctAnswer: 0,
    explanation: "The continuity equation A₁v₁ = A₂v₂ (or Q = constant) states that mass flow rate is conserved. For incompressible fluids, this means volumetric flow rate is constant through a system."
  }
];

const faqs = [
  {
    question: "Why do HVAC systems typically operate in the turbulent regime?",
    answer: "Practical flow velocities in HVAC systems (1-3 m/s for water) combined with typical pipe sizes result in Reynolds numbers well above the turbulent threshold (>4000). While turbulent flow has higher friction losses, it provides much better heat transfer and is unavoidable at practical flow rates. Systems are designed to work efficiently within this regime."
  },
  {
    question: "How does Reynolds number affect pump selection?",
    answer: "Reynolds number indirectly affects pump selection through its influence on friction factor and hence system pressure drop. Most pump curves are developed for turbulent flow conditions. For very viscous fluids (low Re), special corrections may be needed as the pump efficiency reduces and the curve shape changes."
  },
  {
    question: "What is the no-slip condition and why is it important?",
    answer: "The no-slip condition states that fluid velocity at a solid boundary equals zero - the fluid 'sticks' to the wall. This fundamental principle explains why velocity profiles develop from uniform at entry to parabolic (laminar) or flattened (turbulent) shapes. It's the reason boundary layers and friction exist."
  },
  {
    question: "Can flow be laminar in large diameter pipes?",
    answer: "Theoretically yes, but practically it's very difficult. For Re < 2300 with large D, velocity must be extremely low (Re = ρvD/μ). For a 100mm pipe with water, v would need to be below 0.023 m/s - essentially stagnant. Large pipes in HVAC systems always operate turbulently at normal flow rates."
  },
  {
    question: "How do I calculate flow velocity from volume flow rate?",
    answer: "Use v = Q/A where Q is volumetric flow rate (m³/s) and A is cross-sectional area (m²). For circular pipes: A = πD²/4. Remember to convert units consistently - litres/second to m³/s (divide by 1000) and mm to m for diameter. Typical HVAC velocities are 1-3 m/s for water and 3-8 m/s for air."
  },
  {
    question: "What happens in the transition zone (Re 2300-4000)?",
    answer: "The transition zone is inherently unstable - flow may switch between laminar and turbulent unpredictably. Pressure drop and heat transfer are difficult to predict accurately. Designers typically aim to operate clearly in either laminar or turbulent regimes, with turbulent being normal for HVAC. Avoid designing systems to operate in the transition zone."
  }
];

const HNCModule2Section2_2 = () => {
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
            <span>Module 2.2.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Flow Characteristics
          </h1>
          <p className="text-white/80">
            Understanding laminar and turbulent flow regimes, Reynolds number, and velocity profiles in building services systems
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Laminar:</strong> Smooth parallel layers, Re &lt; 2300</li>
              <li className="pl-1"><strong>Turbulent:</strong> Chaotic mixing, Re &gt; 4000</li>
              <li className="pl-1"><strong>Reynolds:</strong> Re = ρvD/μ (inertia/viscous ratio)</li>
              <li className="pl-1"><strong>Continuity:</strong> Q = A₁v₁ = A₂v₂ (mass conservation)</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>HVAC pipes:</strong> Typically turbulent (Re &gt; 10,000)</li>
              <li className="pl-1"><strong>Design velocity:</strong> 1-3 m/s for water systems</li>
              <li className="pl-1"><strong>Heat transfer:</strong> Turbulent flow improves performance</li>
              <li className="pl-1"><strong>Friction:</strong> Higher in turbulent but predictable</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Distinguish between laminar and turbulent flow characteristics",
              "Calculate Reynolds number for pipe flow applications",
              "Understand the significance of the critical Reynolds number",
              "Describe velocity profiles for different flow regimes",
              "Apply the continuity equation to pipe systems",
              "Recognise flow patterns in building services applications"
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

        {/* Section 1: Laminar vs Turbulent Flow */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Laminar vs Turbulent Flow
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Fluid flow can be classified into two distinct regimes based on how the fluid particles move.
              Understanding these regimes is essential for predicting pressure losses and heat transfer in building services.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Laminar Flow</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Smooth, orderly fluid motion</li>
                  <li className="pl-1">Parallel layers slide past each other</li>
                  <li className="pl-1">No mixing between layers</li>
                  <li className="pl-1">Parabolic velocity profile</li>
                  <li className="pl-1">Lower friction losses</li>
                  <li className="pl-1">Poor heat transfer</li>
                  <li className="pl-1">Re &lt; 2300 in pipes</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Turbulent Flow</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Chaotic, irregular fluid motion</li>
                  <li className="pl-1">Random fluctuations and eddies</li>
                  <li className="pl-1">Strong mixing between layers</li>
                  <li className="pl-1">Flatter velocity profile</li>
                  <li className="pl-1">Higher friction losses</li>
                  <li className="pl-1">Excellent heat transfer</li>
                  <li className="pl-1">Re &gt; 4000 in pipes</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Flow Regime Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Characteristic</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Laminar</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Turbulent</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Reynolds number</td>
                      <td className="border border-white/10 px-3 py-2">Re &lt; 2300</td>
                      <td className="border border-white/10 px-3 py-2">Re &gt; 4000</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Friction factor</td>
                      <td className="border border-white/10 px-3 py-2">f = 64/Re</td>
                      <td className="border border-white/10 px-3 py-2">Moody diagram</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">v<sub>max</sub>/v<sub>avg</sub></td>
                      <td className="border border-white/10 px-3 py-2">2.0</td>
                      <td className="border border-white/10 px-3 py-2">~1.2</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Entry length</td>
                      <td className="border border-white/10 px-3 py-2">~0.06 Re × D</td>
                      <td className="border border-white/10 px-3 py-2">10-60 D</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical note:</strong> The transition zone (Re 2300-4000) is unstable and unpredictable - avoid designing systems to operate in this range.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Reynolds Number */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Reynolds Number
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Reynolds number (Re) is a dimensionless quantity that predicts flow regime by comparing
              inertial forces (which cause turbulence) to viscous forces (which dampen turbulence).
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Reynolds Number Formula</p>
              <p className="font-mono text-center text-lg mb-2">Re = ρvD/μ = vD/ν</p>
              <div className="text-xs text-white/70 text-center space-y-1">
                <p>Where: ρ = density (kg/m³), v = velocity (m/s), D = diameter (m)</p>
                <p>μ = dynamic viscosity (Pa·s), ν = kinematic viscosity (m²/s)</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Physical interpretation:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Inertial forces (ρv²):</strong> Tend to cause mixing and turbulence</li>
                <li className="pl-1"><strong>Viscous forces (μv/D):</strong> Tend to dampen disturbances and maintain order</li>
                <li className="pl-1"><strong>High Re:</strong> Inertia dominates → turbulent flow</li>
                <li className="pl-1"><strong>Low Re:</strong> Viscosity dominates → laminar flow</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Critical Reynolds Numbers</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Geometry</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Critical Re</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Circular pipe</td>
                      <td className="border border-white/10 px-3 py-2">~2300</td>
                      <td className="border border-white/10 px-3 py-2">Most common case</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Flat plate</td>
                      <td className="border border-white/10 px-3 py-2">~500,000</td>
                      <td className="border border-white/10 px-3 py-2">Based on length</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Open channel</td>
                      <td className="border border-white/10 px-3 py-2">~500</td>
                      <td className="border border-white/10 px-3 py-2">Based on hydraulic radius</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Re is dimensionless - ensure all units are consistent (SI units: m, s, kg, Pa).
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 3: Velocity Profiles */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Velocity Profiles
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The velocity profile describes how fluid velocity varies across a pipe cross-section.
              This varies significantly between laminar and turbulent flow regimes.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Laminar Profile (Parabolic)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Zero velocity at pipe wall (no-slip)</li>
                  <li className="pl-1">Maximum velocity at centreline</li>
                  <li className="pl-1">v<sub>max</sub> = 2 × v<sub>avg</sub></li>
                  <li className="pl-1">Smooth parabolic shape</li>
                  <li className="pl-1">Velocity: v(r) = v<sub>max</sub>[1 - (r/R)²]</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Turbulent Profile (Flattened)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Zero velocity at wall (no-slip)</li>
                  <li className="pl-1">Nearly uniform across core</li>
                  <li className="pl-1">v<sub>max</sub> ≈ 1.2 × v<sub>avg</sub></li>
                  <li className="pl-1">Thin boundary layer near wall</li>
                  <li className="pl-1">Better for flow measurement</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The No-Slip Condition</p>
              <p className="text-sm mb-2">
                At any solid boundary, the fluid velocity equals the boundary velocity. For stationary pipes,
                this means v = 0 at the wall. This fundamental principle explains why velocity profiles develop
                and why friction exists.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Entry length and developing flow:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Flow enters pipes with approximately uniform velocity</li>
                <li className="pl-1">Boundary layers grow from walls until fully developed</li>
                <li className="pl-1"><strong>Laminar entry:</strong> L<sub>e</sub> ≈ 0.06 × Re × D (can be very long)</li>
                <li className="pl-1"><strong>Turbulent entry:</strong> L<sub>e</sub> ≈ 10-60 × D (much shorter)</li>
                <li className="pl-1">Fittings disrupt the profile, requiring re-development</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Flow measurement:</strong> Turbulent flow's flatter profile makes single-point velocity measurements more accurate for determining average flow rate.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Continuity and Flow Patterns */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Continuity Equation and Flow Patterns
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The continuity equation expresses conservation of mass - what flows in must flow out.
              For incompressible fluids like water, this becomes a powerful tool for analysing pipe systems.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Continuity Equation</p>
              <p className="font-mono text-center text-lg mb-2">Q = A₁v₁ = A₂v₂ = constant</p>
              <p className="text-xs text-white/70 text-center">For circular pipes: A = πD²/4, so v₁D₁² = v₂D₂²</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key implications:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Reducer:</strong> Smaller area → higher velocity</li>
                <li className="pl-1"><strong>Expander:</strong> Larger area → lower velocity</li>
                <li className="pl-1"><strong>Branches:</strong> Total flow in = total flow out</li>
                <li className="pl-1"><strong>Headers:</strong> Flow distributes based on branch resistances</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical HVAC Water Velocities</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Velocity Range</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Considerations</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Pump suction</td>
                      <td className="border border-white/10 px-3 py-2">0.5 - 1.5 m/s</td>
                      <td className="border border-white/10 px-3 py-2">Low to prevent cavitation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Pump discharge</td>
                      <td className="border border-white/10 px-3 py-2">1.5 - 3.0 m/s</td>
                      <td className="border border-white/10 px-3 py-2">Balance friction vs pipe cost</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Mains distribution</td>
                      <td className="border border-white/10 px-3 py-2">1.0 - 2.0 m/s</td>
                      <td className="border border-white/10 px-3 py-2">Noise and erosion limits</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Branch connections</td>
                      <td className="border border-white/10 px-3 py-2">1.0 - 1.5 m/s</td>
                      <td className="border border-white/10 px-3 py-2">Lower for small pipes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Flow patterns in fittings:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Elbows:</strong> Flow separation on inner radius, reattachment downstream</li>
                <li className="pl-1"><strong>Tees:</strong> Complex mixing and flow splitting/combining</li>
                <li className="pl-1"><strong>Valves:</strong> High turbulence and pressure drop when partially closed</li>
                <li className="pl-1"><strong>Sudden expansion:</strong> Recirculation zones, high losses</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Design tip:</strong> Allow 10-20 pipe diameters of straight pipe upstream of flow meters for accurate measurement.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Reynolds Number Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Water at 20°C flows at 1.5 m/s through a 65mm diameter pipe. Determine the flow regime.
                (ρ = 998 kg/m³, μ = 0.001 Pa·s)
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Re = ρvD/μ</p>
                <p>Re = (998 × 1.5 × 0.065) / 0.001</p>
                <p>Re = 97.3 / 0.001 = <strong>97,305</strong></p>
                <p className="mt-2 text-white/60">Re &gt;&gt; 4000, therefore flow is fully turbulent</p>
                <p className="mt-2 text-green-400">✓ Typical for HVAC systems</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Velocity from Continuity</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 100mm pipe carrying 8 l/s reduces to 50mm diameter. What is the velocity in each section?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Q = 8 l/s = 0.008 m³/s</p>
                <p className="mt-2">100mm pipe:</p>
                <p>A₁ = π × 0.1² / 4 = 0.00785 m²</p>
                <p>v₁ = Q/A₁ = 0.008 / 0.00785 = <strong>1.02 m/s</strong></p>
                <p className="mt-2">50mm pipe:</p>
                <p>A₂ = π × 0.05² / 4 = 0.00196 m²</p>
                <p>v₂ = Q/A₂ = 0.008 / 0.00196 = <strong>4.08 m/s</strong></p>
                <p className="mt-2 text-white/60">→ Halving diameter quadruples velocity (v ∝ 1/D²)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Effect of Temperature on Reynolds Number</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Compare Re for the same flow rate (2 m/s, 50mm pipe) at 20°C and 80°C.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>At 20°C: ρ = 998 kg/m³, μ = 0.001 Pa·s</p>
                <p>Re₂₀ = (998 × 2 × 0.05) / 0.001 = <strong>99,800</strong></p>
                <p className="mt-2">At 80°C: ρ = 972 kg/m³, μ = 0.00035 Pa·s</p>
                <p>Re₈₀ = (972 × 2 × 0.05) / 0.00035 = <strong>277,714</strong></p>
                <p className="mt-2 text-white/60">→ Hot water Re is ~2.8× higher due to lower viscosity</p>
                <p className="mt-2 text-white/60">→ Both are well into turbulent regime</p>
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
                <li className="pl-1"><strong>Re = ρvD/μ = vD/ν</strong> — Reynolds number</li>
                <li className="pl-1"><strong>Q = Av</strong> — Volume flow rate</li>
                <li className="pl-1"><strong>A₁v₁ = A₂v₂</strong> — Continuity equation</li>
                <li className="pl-1"><strong>A = πD²/4</strong> — Circular pipe area</li>
                <li className="pl-1"><strong>f = 64/Re</strong> — Laminar friction factor</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Critical Re (pipe): <strong>~2300</strong></li>
                <li className="pl-1">Fully turbulent Re: <strong>&gt;4000</strong></li>
                <li className="pl-1">Laminar v<sub>max</sub>/v<sub>avg</sub>: <strong>2.0</strong></li>
                <li className="pl-1">Turbulent v<sub>max</sub>/v<sub>avg</sub>: <strong>~1.2</strong></li>
                <li className="pl-1">Water at 20°C: μ = <strong>0.001 Pa·s</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Unit errors:</strong> D in metres, μ in Pa·s for Re calculation</li>
                <li className="pl-1"><strong>Confusing viscosities:</strong> Use dynamic (μ) or kinematic (ν) correctly</li>
                <li className="pl-1"><strong>Ignoring temperature:</strong> Viscosity varies significantly with temperature</li>
                <li className="pl-1"><strong>Transition zone:</strong> Avoid designing systems to operate at Re 2300-4000</li>
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
                <p className="font-medium text-white mb-1">Flow Regimes</p>
                <ul className="space-y-0.5">
                  <li>Laminar: Re &lt; 2300, parabolic profile</li>
                  <li>Transition: Re 2300-4000, unstable</li>
                  <li>Turbulent: Re &gt; 4000, flat profile</li>
                  <li>HVAC typical: Re &gt; 10,000</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Design Velocities (Water)</p>
                <ul className="space-y-0.5">
                  <li>Pump suction: 0.5-1.5 m/s</li>
                  <li>Pump discharge: 1.5-3.0 m/s</li>
                  <li>Distribution: 1.0-2.0 m/s</li>
                  <li>Branches: 1.0-1.5 m/s</li>
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
            <Link to="../h-n-c-module2-section2-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Fluid Properties
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module2-section2-3">
              Next: Bernoulli's Equation
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule2Section2_2;
