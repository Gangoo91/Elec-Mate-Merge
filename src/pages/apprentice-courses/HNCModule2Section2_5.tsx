import { ArrowLeft, Droplets, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Pump Characteristics - HNC Module 2 Section 2.5";
const DESCRIPTION = "Master pump performance curves, types, efficiency calculations and NPSH requirements for building services applications including HVAC and plumbing systems.";

const quickCheckQuestions = [
  {
    id: "pump-curve",
    question: "What does a centrifugal pump H-Q curve show?",
    options: ["Pressure vs temperature", "Head vs flow rate", "Power vs speed", "Efficiency vs time"],
    correctIndex: 1,
    explanation: "The H-Q curve (head-flow curve) shows the relationship between the total head developed by the pump and the volumetric flow rate. Head decreases as flow increases for centrifugal pumps."
  },
  {
    id: "pump-bep",
    question: "What is the Best Efficiency Point (BEP) of a pump?",
    options: ["Maximum flow rate", "Maximum head", "Optimal operating point for efficiency", "Minimum power consumption"],
    correctIndex: 2,
    explanation: "The BEP is where the pump operates at maximum efficiency. Operating significantly away from BEP wastes energy and can cause premature wear and vibration problems."
  },
  {
    id: "centrifugal-start",
    question: "Why should centrifugal pumps be started with the discharge valve closed or throttled?",
    options: ["To prevent cavitation", "To reduce starting current and power", "To avoid reverse flow", "To prime the pump faster"],
    correctIndex: 1,
    explanation: "Starting with a closed discharge valve minimises the starting torque and current because the pump operates at shutoff head. The motor reaches full speed before the valve is opened to establish flow."
  },
  {
    id: "npsh-meaning",
    question: "What does NPSH stand for in pump terminology?",
    options: ["Net Pressure System Head", "Net Positive Suction Head", "Normal Pump Suction Height", "Net Power Supply Horsepower"],
    correctIndex: 1,
    explanation: "NPSH (Net Positive Suction Head) is the absolute pressure at the pump suction above the vapour pressure. It determines whether the pump will cavitate or operate satisfactorily."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What type of pump is most commonly used for HVAC heating and chilled water systems?",
    options: [
      "Positive displacement (gear pump)",
      "Centrifugal (end-suction or inline)",
      "Reciprocating piston pump",
      "Diaphragm pump"
    ],
    correctAnswer: 1,
    explanation: "Centrifugal pumps (end-suction, inline, or split-case) are standard for HVAC water systems because they provide smooth, pulsation-free flow at moderate heads and are well-suited to variable speed control."
  },
  {
    id: 2,
    question: "As flow rate increases through a centrifugal pump, what happens to the developed head?",
    options: ["Head increases proportionally", "Head remains constant", "Head decreases", "Head fluctuates randomly"],
    correctAnswer: 2,
    explanation: "Centrifugal pump H-Q curves slope downward from left to right. At zero flow (shutoff), head is maximum. As flow increases, head decreases due to internal losses and velocity changes."
  },
  {
    id: 3,
    question: "A pump manufacturer states NPSHr = 3.5m. What does this mean?",
    options: [
      "The pump needs 3.5m of discharge head",
      "The pump requires minimum 3.5m pressure at suction to avoid cavitation",
      "The pump efficiency is 3.5%",
      "The pump must be 3.5m above the water level"
    ],
    correctAnswer: 1,
    explanation: "NPSHr (required) is the minimum suction head the pump needs to operate without cavitation. The system must provide NPSHa (available) greater than NPSHr, typically with a safety margin of 0.5-1.0m."
  },
  {
    id: 4,
    question: "What happens when pump speed is reduced to 80% of design speed (using affinity laws)?",
    options: [
      "Flow reduces to 80%, head to 64%, power to 51%",
      "Flow reduces to 64%, head to 80%, power to 51%",
      "Flow, head, and power all reduce to 80%",
      "Only flow reduces; head and power stay the same"
    ],
    correctAnswer: 0,
    explanation: "The affinity laws state: Q ∝ N, H ∝ N², P ∝ N³. At 80% speed: Q = 0.8, H = 0.64 (0.8²), P = 0.512 (0.8³). This is why variable speed drives save significant energy."
  },
  {
    id: 5,
    question: "A pump has a duty point of 12 l/s at 25m head. Calculate the hydraulic power.",
    options: ["2.94 kW", "3.0 kW", "0.3 kW", "29.4 kW"],
    correctAnswer: 0,
    explanation: "Hydraulic power Ph = ρgQH = 1000 × 9.81 × 0.012 × 25 = 2943W = 2.94 kW. This is the useful power delivered to the water; shaft power will be higher due to pump efficiency."
  },
  {
    id: 6,
    question: "If the hydraulic power is 2.94 kW and pump efficiency is 72%, what shaft power is required?",
    options: ["2.12 kW", "4.08 kW", "3.83 kW", "2.94 kW"],
    correctAnswer: 1,
    explanation: "Shaft power = Hydraulic power / Efficiency = 2.94 / 0.72 = 4.08 kW. The motor must deliver at least this power to the pump shaft."
  },
  {
    id: 7,
    question: "Which pump type delivers a fixed volume per revolution regardless of discharge pressure?",
    options: [
      "Single-stage centrifugal",
      "Multi-stage centrifugal",
      "Positive displacement",
      "Axial flow"
    ],
    correctAnswer: 2,
    explanation: "Positive displacement pumps (gear, vane, piston, diaphragm) trap and move a fixed volume each cycle. Flow is nearly independent of pressure, making them suitable for dosing and high-pressure applications."
  },
  {
    id: 8,
    question: "What is the primary purpose of a multi-stage centrifugal pump?",
    options: [
      "Increase flow rate",
      "Increase total head",
      "Reduce cavitation",
      "Improve priming"
    ],
    correctAnswer: 1,
    explanation: "Multi-stage pumps stack impellers in series, each adding to the total head. Flow rate remains the same through all stages, but heads add together. Used for high-rise buildings, booster sets, and pressure boosting."
  },
  {
    id: 9,
    question: "At what point on the pump curve is vibration typically lowest?",
    options: [
      "At shutoff (zero flow)",
      "At maximum flow",
      "At the Best Efficiency Point (BEP)",
      "At 50% of rated flow"
    ],
    correctAnswer: 2,
    explanation: "At the BEP, hydraulic forces are balanced and flow patterns are optimal. Operating far from BEP causes recirculation, turbulence, and increased vibration that can damage bearings and seals."
  },
  {
    id: 10,
    question: "What is specific speed (Ns) used to determine?",
    options: [
      "The actual rotational speed of the pump",
      "The type of impeller design suited to the duty",
      "The motor power requirement",
      "The NPSH requirement"
    ],
    correctAnswer: 1,
    explanation: "Specific speed is a dimensionless number characterising pump design. Low Ns (500-2000) suits radial impellers for high head/low flow; high Ns (8000+) suits axial flow for low head/high flow."
  },
  {
    id: 11,
    question: "A HVAC system requires 8 l/s at 18m head. The pump selected has efficiency 68% at this duty. What is the absorbed power?",
    options: ["1.41 kW", "2.07 kW", "1.0 kW", "3.5 kW"],
    correctAnswer: 1,
    explanation: "Hydraulic power = ρgQH = 1000 × 9.81 × 0.008 × 18 = 1412W = 1.41 kW. Absorbed power = 1.41 / 0.68 = 2.07 kW."
  },
  {
    id: 12,
    question: "Why is it important to maintain NPSHa > NPSHr + margin in pump installations?",
    options: [
      "To prevent motor overload",
      "To prevent cavitation damage and noise",
      "To increase flow rate",
      "To reduce pipe sizes"
    ],
    correctAnswer: 1,
    explanation: "If NPSHa drops below NPSHr, the liquid boils at the impeller inlet creating vapour bubbles (cavitation). These collapse violently, causing noise, vibration, erosion damage, and reduced performance."
  }
];

const faqs = [
  {
    question: "What is the difference between NPSHa and NPSHr?",
    answer: "NPSHa (available) is what the system provides: atmospheric pressure + static head - friction losses - vapour pressure. NPSHr (required) is what the pump needs, specified by the manufacturer. The system must provide NPSHa > NPSHr (typically by 0.5-1.0m margin) to prevent cavitation."
  },
  {
    question: "Why do pump curves show multiple impeller diameters?",
    answer: "Manufacturers offer pumps with trimmed impellers to match different duties without changing pump size. A smaller impeller reduces head and power proportionally (H ∝ D², P ∝ D³). This allows one pump model to cover a range of applications and fine-tune performance to the exact system requirement."
  },
  {
    question: "When should I use a positive displacement pump instead of centrifugal?",
    answer: "Use positive displacement for: precise metering/dosing, high viscosity fluids, high pressure with low flow, self-priming applications, or when flow must be independent of discharge pressure. Centrifugal pumps are better for moderate heads, high flows, variable speed control, and when pulsation-free flow is needed."
  },
  {
    question: "How do I calculate pump power consumption?",
    answer: "Three power levels exist: Hydraulic power Ph = ρgQH (useful power to water), Shaft power Ps = Ph/ηpump (power to pump shaft), Electrical power Pe = Ps/ηmotor (power from supply). For quick estimates, use Pe ≈ (Q × H × 10) / (ηpump × ηmotor) where Q is in l/s and H in metres."
  },
  {
    question: "What are the affinity laws and why are they important?",
    answer: "The affinity laws relate speed changes to performance: Q₂/Q₁ = N₂/N₁, H₂/H₁ = (N₂/N₁)², P₂/P₁ = (N₂/N₁)³. The cubic relationship for power means small speed reductions yield large energy savings. Reducing speed by 20% cuts power by nearly 50%, making variable speed drives highly cost-effective."
  },
  {
    question: "How do I select the right pump for an HVAC system?",
    answer: "Calculate system flow rate from heating/cooling loads (Q = P/(ρ × cp × ΔT)) and determine total head from pipe friction plus fittings plus equipment losses plus static height. Select a pump with BEP near the duty point. Check NPSH is adequate, verify motor power includes margin, and consider VSD for variable flow systems."
  }
];

const HNCModule2Section2_5 = () => {
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

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Droplets className="h-4 w-4" />
            <span>Module 2.2.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Pump Characteristics
          </h1>
          <p className="text-white/80">
            Understanding pump curves, types, efficiency and NPSH for building services design
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>H-Q Curve:</strong> Shows head vs flow rate relationship</li>
              <li className="pl-1"><strong>BEP:</strong> Best Efficiency Point - optimal operation</li>
              <li className="pl-1"><strong>Affinity Laws:</strong> Q∝N, H∝N², P∝N³</li>
              <li className="pl-1"><strong>NPSH:</strong> Suction conditions to prevent cavitation</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>HVAC:</strong> Centrifugal pumps for heating/chilled water</li>
              <li className="pl-1"><strong>Boosters:</strong> Multi-stage for high-rise buildings</li>
              <li className="pl-1"><strong>VSDs:</strong> Variable speed drives for energy savings</li>
              <li className="pl-1"><strong>Selection:</strong> Match BEP to system duty point</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Interpret pump performance curves (H-Q, efficiency, power)",
              "Apply the pump affinity laws for speed and impeller changes",
              "Calculate hydraulic power, shaft power and absorbed power",
              "Understand NPSH requirements and cavitation prevention",
              "Select appropriate pump types for different applications",
              "Determine pump efficiency and operating costs"
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

        {/* Section 1: Pump Types */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Pump Types and Applications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Pumps are broadly classified into centrifugal (rotodynamic) and positive displacement types.
              The choice depends on flow rate, head, fluid properties, and control requirements.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Centrifugal Pumps</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Convert rotational kinetic energy into fluid pressure energy</li>
                <li className="pl-1">Smooth, pulsation-free flow ideal for HVAC and domestic water</li>
                <li className="pl-1">Flow varies with system resistance (head-flow curve)</li>
                <li className="pl-1">Excellent for variable speed control and energy savings</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Centrifugal Pump Types in Building Services</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Head</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">End-suction</td>
                      <td className="border border-white/10 px-3 py-2">HVAC primary/secondary circuits</td>
                      <td className="border border-white/10 px-3 py-2">10-60m</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Inline (glandless)</td>
                      <td className="border border-white/10 px-3 py-2">Domestic heating, small HVAC</td>
                      <td className="border border-white/10 px-3 py-2">2-15m</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Split-case</td>
                      <td className="border border-white/10 px-3 py-2">Large HVAC, district heating</td>
                      <td className="border border-white/10 px-3 py-2">20-100m</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Multi-stage</td>
                      <td className="border border-white/10 px-3 py-2">High-rise boosters, pressure sets</td>
                      <td className="border border-white/10 px-3 py-2">50-300m</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Submersible</td>
                      <td className="border border-white/10 px-3 py-2">Drainage, sewage, borehole</td>
                      <td className="border border-white/10 px-3 py-2">5-200m</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Positive Displacement Pumps</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Gear pumps:</strong> Oil transfer, lubrication systems</li>
                <li className="pl-1"><strong>Diaphragm:</strong> Chemical dosing, water treatment</li>
                <li className="pl-1"><strong>Peristaltic:</strong> Precise metering, sensitive fluids</li>
                <li className="pl-1">Flow nearly independent of discharge pressure</li>
                <li className="pl-1">Self-priming capability (can draw suction lift)</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>HVAC Design:</strong> 90%+ of building services pumping uses centrifugal pumps due to their efficiency, controllability, and suitability for closed-loop water systems.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Pump Performance Curves */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Pump Performance Curves (H-Q Curves)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Pump performance curves show the relationship between head, flow, efficiency, and power.
              Understanding these curves is essential for proper pump selection and system matching.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key curve characteristics:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>H-Q curve:</strong> Head decreases as flow increases</li>
                <li className="pl-1"><strong>Shutoff head:</strong> Maximum head at zero flow</li>
                <li className="pl-1"><strong>Efficiency curve:</strong> Peaks at Best Efficiency Point (BEP)</li>
                <li className="pl-1"><strong>Power curve:</strong> Usually increases with flow</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Best Efficiency Point (BEP)</p>
              <p className="text-sm text-white mb-3">
                The BEP is where pump efficiency is maximum. For optimal operation:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Select pumps with BEP close to the design duty point</li>
                <li className="pl-1">Acceptable operating range: typically 70-120% of BEP flow</li>
                <li className="pl-1">Operating far from BEP causes increased wear, noise, vibration</li>
                <li className="pl-1">Variable speed operation shifts the BEP along affinity law lines</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Reading a Pump Curve</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Curve Element</th>
                      <th className="border border-white/10 px-3 py-2 text-left">What It Shows</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Design Use</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">H-Q line</td>
                      <td className="border border-white/10 px-3 py-2">Head vs flow relationship</td>
                      <td className="border border-white/10 px-3 py-2">Determine operating point</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Efficiency islands</td>
                      <td className="border border-white/10 px-3 py-2">Contours of equal efficiency</td>
                      <td className="border border-white/10 px-3 py-2">Select pump for best efficiency</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Power curves</td>
                      <td className="border border-white/10 px-3 py-2">Absorbed power vs flow</td>
                      <td className="border border-white/10 px-3 py-2">Size motor correctly</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">NPSHr curve</td>
                      <td className="border border-white/10 px-3 py-2">Required NPSH vs flow</td>
                      <td className="border border-white/10 px-3 py-2">Check cavitation margin</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Impeller diameters</td>
                      <td className="border border-white/10 px-3 py-2">Multiple H-Q lines</td>
                      <td className="border border-white/10 px-3 py-2">Trim impeller to match duty</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Selection tip:</strong> Choose a pump where the duty point falls on an efficiency contour of 70% or higher, and within 20% of the BEP flow rate.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Affinity Laws and Power Calculations */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Affinity Laws and Power Calculations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The affinity laws describe how pump performance changes with speed or impeller diameter.
              They are fundamental to understanding variable speed pump operation and energy savings.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Pump Affinity Laws</p>
              <div className="grid grid-cols-3 gap-3 text-center text-sm">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-elec-yellow mb-1">Q₂/Q₁ = N₂/N₁</p>
                  <p className="text-white/70 text-xs">Flow ∝ Speed</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-elec-yellow mb-1">H₂/H₁ = (N₂/N₁)²</p>
                  <p className="text-white/70 text-xs">Head ∝ Speed²</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-elec-yellow mb-1">P₂/P₁ = (N₂/N₁)³</p>
                  <p className="text-white/70 text-xs">Power ∝ Speed³</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Speed reduction energy savings:</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Speed Reduction</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Flow</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Head</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Power</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">100% (full speed)</td>
                      <td className="border border-white/10 px-3 py-2">100%</td>
                      <td className="border border-white/10 px-3 py-2">100%</td>
                      <td className="border border-white/10 px-3 py-2">100%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">80%</td>
                      <td className="border border-white/10 px-3 py-2">80%</td>
                      <td className="border border-white/10 px-3 py-2">64%</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">51%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">60%</td>
                      <td className="border border-white/10 px-3 py-2">60%</td>
                      <td className="border border-white/10 px-3 py-2">36%</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">22%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">50%</td>
                      <td className="border border-white/10 px-3 py-2">50%</td>
                      <td className="border border-white/10 px-3 py-2">25%</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">12.5%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Pump Power Calculations</p>
              <div className="bg-black/30 p-4 rounded text-sm">
                <p className="font-mono text-white mb-2">Hydraulic Power: P<sub>h</sub> = ρgQH</p>
                <p className="text-white/70 text-xs mb-3">Where ρ = 1000 kg/m³ (water), g = 9.81 m/s², Q in m³/s, H in metres</p>

                <p className="font-mono text-white mb-2">Shaft Power: P<sub>s</sub> = P<sub>h</sub> / η<sub>pump</sub></p>
                <p className="text-white/70 text-xs mb-3">Accounts for pump mechanical and hydraulic efficiency</p>

                <p className="font-mono text-white mb-2">Electrical Power: P<sub>e</sub> = P<sub>s</sub> / η<sub>motor</sub></p>
                <p className="text-white/70 text-xs">Total power consumed from electrical supply</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Quick estimate:</strong> P(kW) ≈ (Q × H) / 100, where Q is in l/s and H in metres, assuming 70% combined pump/motor efficiency.
            </p>
          </div>
        </section>

        {/* Section 4: NPSH and Cavitation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            NPSH and Cavitation Prevention
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Net Positive Suction Head (NPSH) determines whether a pump will operate satisfactorily
              or suffer from cavitation - the formation and collapse of vapour bubbles that damages impellers.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Understanding NPSH:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>NPSHa:</strong> Available from the system installation</li>
                <li className="pl-1"><strong>NPSHr:</strong> Required by the pump (from manufacturer)</li>
                <li className="pl-1"><strong>Rule:</strong> NPSHa must exceed NPSHr by at least 0.5-1.0m margin</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Calculating NPSHa</p>
              <p className="font-mono text-center text-lg mb-2">NPSHa = P<sub>atm</sub>/ρg + h<sub>s</sub> - h<sub>f</sub> - P<sub>v</sub>/ρg</p>
              <div className="text-xs text-white/70 mt-3">
                <p><strong>P<sub>atm</sub>/ρg</strong> = Atmospheric pressure head ≈ 10.3m at sea level</p>
                <p><strong>h<sub>s</sub></strong> = Static suction head (+ve if pump below water, -ve if above)</p>
                <p><strong>h<sub>f</sub></strong> = Friction losses in suction pipework</p>
                <p><strong>P<sub>v</sub>/ρg</strong> = Vapour pressure head (0.24m for water at 20°C)</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Vapour Pressure of Water</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Temperature (°C)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Vapour Pressure (kPa)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Vapour Head (m)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">20</td>
                      <td className="border border-white/10 px-3 py-2">2.34</td>
                      <td className="border border-white/10 px-3 py-2">0.24</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">40</td>
                      <td className="border border-white/10 px-3 py-2">7.38</td>
                      <td className="border border-white/10 px-3 py-2">0.75</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">60</td>
                      <td className="border border-white/10 px-3 py-2">19.9</td>
                      <td className="border border-white/10 px-3 py-2">2.03</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">80</td>
                      <td className="border border-white/10 px-3 py-2">47.4</td>
                      <td className="border border-white/10 px-3 py-2">4.83</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">100</td>
                      <td className="border border-white/10 px-3 py-2">101.3</td>
                      <td className="border border-white/10 px-3 py-2">10.3</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Cavitation Warning Signs</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Noise:</strong> Crackling/rattling sound like pumping gravel</li>
                <li className="pl-1"><strong>Vibration:</strong> Increased bearing and seal wear</li>
                <li className="pl-1"><strong>Performance drop:</strong> Reduced head and flow</li>
                <li className="pl-1"><strong>Damage:</strong> Pitting/erosion of impeller surfaces</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Hot water systems:</strong> Higher water temperatures significantly increase vapour pressure. LTHW at 80°C has vapour head of 4.8m, reducing available NPSH compared to cold water systems.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Pump Power Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Calculate the electrical power consumption for a pump delivering 15 l/s at 22m head. Pump efficiency is 74%, motor efficiency is 92%.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Convert flow: Q = 15 l/s = 0.015 m³/s</p>
                <p className="mt-2">Hydraulic power:</p>
                <p>P<sub>h</sub> = ρgQH = 1000 × 9.81 × 0.015 × 22 = <strong>3237W = 3.24 kW</strong></p>
                <p className="mt-2">Shaft power:</p>
                <p>P<sub>s</sub> = P<sub>h</sub> / η<sub>pump</sub> = 3.24 / 0.74 = <strong>4.38 kW</strong></p>
                <p className="mt-2">Electrical power:</p>
                <p>P<sub>e</sub> = P<sub>s</sub> / η<sub>motor</sub> = 4.38 / 0.92 = <strong>4.76 kW</strong></p>
                <p className="mt-2 text-white/60">→ Select 5.5 kW motor to allow starting margin</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Affinity Law Application</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A pump runs at 1450 rpm delivering 20 l/s at 30m head consuming 8 kW. What is the performance at 1160 rpm (80% speed)?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Speed ratio: N₂/N₁ = 1160/1450 = 0.80</p>
                <p className="mt-2">New flow: Q₂ = Q₁ × (N₂/N₁)</p>
                <p>Q₂ = 20 × 0.80 = <strong>16 l/s</strong></p>
                <p className="mt-2">New head: H₂ = H₁ × (N₂/N₁)²</p>
                <p>H₂ = 30 × 0.64 = <strong>19.2m</strong></p>
                <p className="mt-2">New power: P₂ = P₁ × (N₂/N₁)³</p>
                <p>P₂ = 8 × 0.512 = <strong>4.1 kW</strong></p>
                <p className="mt-2 text-green-400">✓ 49% power reduction for 20% speed reduction</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: NPSH Check</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A pump with NPSHr = 3.0m draws water at 60°C from a tank 1.5m below pump centreline. Suction pipe friction loss is 0.8m. Is NPSHa adequate?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>NPSHa = P<sub>atm</sub>/ρg + h<sub>s</sub> - h<sub>f</sub> - P<sub>v</sub>/ρg</p>
                <p className="mt-2">P<sub>atm</sub>/ρg = 10.3m (atmospheric)</p>
                <p>h<sub>s</sub> = -1.5m (pump above water = negative)</p>
                <p>h<sub>f</sub> = 0.8m (friction loss)</p>
                <p>P<sub>v</sub>/ρg = 2.03m (vapour pressure at 60°C)</p>
                <p className="mt-2">NPSHa = 10.3 - 1.5 - 0.8 - 2.03 = <strong>5.97m</strong></p>
                <p className="mt-2">Margin = NPSHa - NPSHr = 5.97 - 3.0 = 2.97m</p>
                <p className="mt-2 text-green-400">✓ Adequate - margin exceeds 0.5m minimum</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Essential Formulas</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>P<sub>h</sub> = ρgQH</strong> — Hydraulic power (W)</li>
                <li className="pl-1"><strong>P<sub>s</sub> = P<sub>h</sub>/η<sub>pump</sub></strong> — Shaft power</li>
                <li className="pl-1"><strong>Q₂/Q₁ = N₂/N₁</strong> — Flow affinity law</li>
                <li className="pl-1"><strong>H₂/H₁ = (N₂/N₁)²</strong> — Head affinity law</li>
                <li className="pl-1"><strong>P₂/P₁ = (N₂/N₁)³</strong> — Power affinity law</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Design Values</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Atmospheric pressure: <strong>10.3m</strong> head at sea level</li>
                <li className="pl-1">Water density: <strong>1000 kg/m³</strong></li>
                <li className="pl-1">NPSH margin: <strong>≥0.5m</strong> (1.0m preferred)</li>
                <li className="pl-1">BEP operating range: <strong>70-120%</strong> of rated flow</li>
                <li className="pl-1">Typical pump efficiency: <strong>65-85%</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Oversizing pumps</strong> — Operates far from BEP, wastes energy</li>
                <li className="pl-1"><strong>Ignoring vapour pressure</strong> — Critical for hot water NPSH</li>
                <li className="pl-1"><strong>Wrong units</strong> — l/s must convert to m³/s for power calc</li>
                <li className="pl-1"><strong>No NPSH check</strong> — Leads to cavitation damage</li>
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
                <p className="font-medium text-white mb-1">Pump Performance</p>
                <ul className="space-y-0.5">
                  <li>H-Q curve - head decreases with flow</li>
                  <li>BEP - maximum efficiency point</li>
                  <li>NPSHr - minimum suction head needed</li>
                  <li>Power increases with flow rate</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Affinity Laws</p>
                <ul className="space-y-0.5">
                  <li>Flow ∝ Speed (linear)</li>
                  <li>Head ∝ Speed² (square)</li>
                  <li>Power ∝ Speed³ (cube)</li>
                  <li>50% speed = 12.5% power</li>
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
            <Link to="../h-n-c-module2-section2-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Pipe Sizing
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module2-section2-6">
              Next: System Curves
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule2Section2_5;
