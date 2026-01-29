import { ArrowLeft, Droplets, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Pipe Sizing and Pressure Drop - HNC Module 2 Section 2.4";
const DESCRIPTION = "Master pipe sizing calculations using Darcy-Weisbach equation, friction factors from Moody diagram, fitting losses with K factors, and CIBSE design tables for building services.";

const quickCheckQuestions = [
  {
    id: "darcy-weisbach",
    question: "The Darcy-Weisbach equation calculates head loss as h_f = f(L/D)(v²/2g). What does 'f' represent?",
    options: ["Flow rate", "Friction factor", "Fluid density", "Force"],
    correctIndex: 1,
    explanation: "The friction factor 'f' (also called Darcy friction factor) accounts for pipe wall roughness and flow conditions. It's determined from the Moody diagram using Reynolds number and relative roughness."
  },
  {
    id: "k-factor",
    question: "A 90° elbow has K = 0.75. For flow at 2 m/s, what is the head loss? (g = 10 m/s²)",
    options: ["0.075 m", "0.15 m", "0.30 m", "1.5 m"],
    correctIndex: 1,
    explanation: "Minor loss h = K × v²/2g = 0.75 × 2²/(2×10) = 0.75 × 0.2 = 0.15 m. K factors allow quick calculation of fitting losses without complex geometry analysis."
  },
  {
    id: "pipe-roughness",
    question: "Which pipe material typically has the lowest absolute roughness?",
    options: ["Cast iron", "Galvanised steel", "Copper", "Concrete"],
    correctIndex: 2,
    explanation: "Copper has very low roughness (ε ≈ 0.0015 mm) compared to galvanised steel (ε ≈ 0.15 mm) or cast iron (ε ≈ 0.26 mm). Lower roughness means lower friction factors and pressure drops."
  },
  {
    id: "cibse-tables",
    question: "CIBSE pipe sizing tables typically give pressure drop in:",
    options: ["Pa per metre of pipe", "Bar total", "Metres head", "PSI per foot"],
    correctIndex: 0,
    explanation: "CIBSE tables give pressure drop rate in Pa/m (Pascals per metre of pipe run). This allows quick calculation of total pipe friction loss by multiplying by pipe length."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the Darcy-Weisbach equation for head loss?",
    options: [
      "h_f = fLv²/2gD",
      "h_f = ρgh",
      "h_f = P/ρg",
      "h_f = Kv²/2g"
    ],
    correctAnswer: 0,
    explanation: "The Darcy-Weisbach equation h_f = f(L/D)(v²/2g) relates head loss to friction factor (f), pipe length (L), diameter (D), velocity (v), and gravity (g). It's the fundamental equation for pipe friction."
  },
  {
    id: 2,
    question: "On a Moody diagram, friction factor depends on which two parameters?",
    options: [
      "Pressure and temperature",
      "Reynolds number and relative roughness",
      "Flow rate and pipe length",
      "Density and viscosity"
    ],
    correctAnswer: 1,
    explanation: "The Moody diagram plots friction factor (f) against Reynolds number (Re) with curves for different relative roughness (ε/D). For turbulent flow, both Re and roughness affect friction factor."
  },
  {
    id: 3,
    question: "For fully turbulent flow in rough pipes, the friction factor:",
    options: [
      "Depends only on Reynolds number",
      "Depends only on relative roughness",
      "Is always 64/Re",
      "Approaches zero"
    ],
    correctAnswer: 1,
    explanation: "In the fully rough turbulent zone, friction factor depends only on relative roughness (ε/D), not on Reynolds number. This is shown by the horizontal portions of curves on the Moody diagram."
  },
  {
    id: 4,
    question: "The Colebrook-White equation is used to:",
    options: [
      "Calculate flow rate directly",
      "Determine friction factor for turbulent flow",
      "Size pipe diameters",
      "Calculate pump power"
    ],
    correctAnswer: 1,
    explanation: "The Colebrook-White equation: 1/√f = -2log₁₀(ε/3.7D + 2.51/Re√f) is the basis for the Moody diagram. It requires iteration to solve but gives accurate friction factors for turbulent flow."
  },
  {
    id: 5,
    question: "What is 'equivalent length' for fittings?",
    options: [
      "The actual length of the fitting",
      "Length of straight pipe giving the same pressure drop",
      "The pipe diameter",
      "Distance between fittings"
    ],
    correctAnswer: 1,
    explanation: "Equivalent length (L_e) expresses fitting losses as an equivalent length of straight pipe. For example, an elbow with L_e = 30D in 50mm pipe equals 30×0.05 = 1.5m of straight pipe friction."
  },
  {
    id: 6,
    question: "A system has 50m of pipe with pressure drop rate 200 Pa/m and fittings totalling 15m equivalent length. What is total friction loss?",
    options: ["10 kPa", "13 kPa", "15 kPa", "20 kPa"],
    correctAnswer: 1,
    explanation: "Total equivalent length = 50 + 15 = 65m. Total loss = 65 × 200 = 13,000 Pa = 13 kPa. This is the combined pipe and fitting friction loss."
  },
  {
    id: 7,
    question: "CIBSE recommends a maximum pressure drop rate of approximately:",
    options: ["50 Pa/m", "100 Pa/m", "250-350 Pa/m", "500 Pa/m"],
    correctIndex: 2,
    explanation: "CIBSE typically recommends 250-350 Pa/m for index circuits to balance pipe cost against pump energy. Higher rates may be used for short runs; lower rates for long circuits."
  },
  {
    id: 8,
    question: "Why do balancing valves and strainers often dominate pressure drop in HVAC systems?",
    options: [
      "They are always larger than pipes",
      "They create significant flow restrictions (high K values)",
      "They are made of rough materials",
      "They are always at high elevations"
    ],
    correctAnswer: 1,
    explanation: "Valves and strainers have high K values due to flow restrictions, changes in direction, and turbulence. A partially closed valve or dirty strainer can have K > 10, creating substantial pressure drops."
  },
  {
    id: 9,
    question: "When pipe diameter is doubled (all else equal), how does friction head loss change?",
    options: [
      "Halves",
      "Quarters",
      "Reduces to 1/32",
      "Doubles"
    ],
    correctAnswer: 2,
    explanation: "From h_f = fLv²/2gD: if D doubles, v reduces by factor 4 (continuity), so v² reduces by 16. Combined with 1/D term, loss reduces by factor 32. Larger pipes dramatically reduce friction."
  },
  {
    id: 10,
    question: "The 'index circuit' in a pipe system is:",
    options: [
      "The shortest route",
      "The route with highest pressure drop",
      "The first circuit installed",
      "The circuit nearest the pump"
    ],
    correctAnswer: 1,
    explanation: "The index circuit has the highest total pressure drop from pump to the furthest/most resistant terminal. The pump must overcome this pressure drop; other circuits are balanced to match."
  },
  {
    id: 11,
    question: "What is relative roughness?",
    options: [
      "ε × D",
      "ε / D",
      "D / ε",
      "ε + D"
    ],
    correctAnswer: 1,
    explanation: "Relative roughness = ε/D where ε is absolute roughness (mm) and D is internal diameter (mm). It's dimensionless and used on the Moody diagram. Larger pipes have lower relative roughness."
  },
  {
    id: 12,
    question: "For copper pipe with ε = 0.0015mm and D = 15mm, what is the relative roughness?",
    options: ["0.0001", "0.001", "0.01", "0.1"],
    correctAnswer: 0,
    explanation: "ε/D = 0.0015/15 = 0.0001 (or 1×10⁻⁴). This very low relative roughness means copper pipes operate close to the 'smooth pipe' line on the Moody diagram."
  }
];

const faqs = [
  {
    question: "When should I use K factors versus equivalent length?",
    answer: "K factors (h = Kv²/2g) are more accurate as they're independent of friction factor. Equivalent lengths (L_e) are convenient when you have a constant pressure drop rate. K factors are preferred for detailed analysis; equivalent lengths work well for quick estimates using tables."
  },
  {
    question: "Why do CIBSE tables only cover certain pipe sizes and flow rates?",
    answer: "Tables are generated for common building services applications with typical water temperatures (10-80°C) and standard pipe materials. For unusual conditions (glycol, very high temperatures, non-standard materials), you should use Darcy-Weisbach with appropriate fluid properties and roughness values."
  },
  {
    question: "How do I account for aging and fouling in pipe systems?",
    answer: "Roughness increases with age due to corrosion and scale deposits. Design typically includes a safety factor of 10-20% on pressure drop. For critical systems, use higher roughness values than new pipe specifications. Regular maintenance and water treatment reduce fouling."
  },
  {
    question: "What's the difference between major and minor losses?",
    answer: "Major losses are friction losses in straight pipe (Darcy-Weisbach). Minor losses occur at fittings, valves, and changes in section. Despite the names, minor losses often dominate in building services where there are many fittings in relatively short pipe runs."
  },
  {
    question: "How do I size pipes for noise control?",
    answer: "High velocities cause noise from turbulence and cavitation. CIBSE recommends maximum velocities of 1.5-2 m/s for occupied spaces, 2-3 m/s for plant rooms. This often results in larger pipes than pressure drop alone would require, especially near terminals."
  },
  {
    question: "Can I use the same friction factor for heating and chilled water?",
    answer: "No - viscosity differs significantly. Chilled water (~10°C) has higher viscosity than LPHW (~80°C), giving lower Reynolds numbers and potentially different friction factors. Always check fluid properties at operating temperature. Most tables specify the temperature range they cover."
  }
];

const HNCModule2Section2_4 = () => {
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
            <span>Module 2.2.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Pipe Sizing and Pressure Drop
          </h1>
          <p className="text-white/80">
            Calculating friction losses in pipes and fittings for building services system design
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Darcy-Weisbach:</strong> h<sub>f</sub> = f(L/D)(v²/2g)</li>
              <li className="pl-1"><strong>Moody diagram:</strong> f from Re and ε/D</li>
              <li className="pl-1"><strong>Minor losses:</strong> h = Kv²/2g for fittings</li>
              <li className="pl-1"><strong>CIBSE tables:</strong> Pa/m for quick sizing</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Design rate:</strong> 250-350 Pa/m typical</li>
              <li className="pl-1"><strong>Index circuit:</strong> Highest resistance path</li>
              <li className="pl-1"><strong>Fittings:</strong> Often dominate total losses</li>
              <li className="pl-1"><strong>Noise limit:</strong> Max 2-3 m/s velocity</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply the Darcy-Weisbach equation for pipe friction losses",
              "Determine friction factors using the Moody diagram",
              "Calculate fitting losses using K factors and equivalent lengths",
              "Use CIBSE pipe sizing tables for practical design",
              "Identify and calculate the index circuit pressure drop",
              "Balance pressure drop, velocity, and noise requirements"
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

        {/* Section 1: Darcy-Weisbach Equation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Darcy-Weisbach Equation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Darcy-Weisbach equation is the fundamental relationship for calculating friction head loss
              in pipes. It applies to both laminar and turbulent flow.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Darcy-Weisbach Equation</p>
              <p className="font-mono text-center text-lg mb-2">h<sub>f</sub> = f × (L/D) × (v²/2g)</p>
              <div className="text-xs text-white/70 text-center space-y-1">
                <p>h<sub>f</sub> = friction head loss (m), f = Darcy friction factor (dimensionless)</p>
                <p>L = pipe length (m), D = internal diameter (m), v = velocity (m/s)</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Alternative forms:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Pressure form:</strong> ΔP = f × (L/D) × (ρv²/2) Pa</li>
                <li className="pl-1"><strong>Pressure rate:</strong> ΔP/L = f × (ρv²/2D) Pa/m</li>
                <li className="pl-1">Convert head to pressure: ΔP = ρg × h<sub>f</sub></li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Friction Factor Determination</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Flow Regime</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Friction Factor</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Laminar (Re &lt; 2300)</td>
                      <td className="border border-white/10 px-3 py-2">f = 64/Re</td>
                      <td className="border border-white/10 px-3 py-2">Independent of roughness</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Turbulent smooth</td>
                      <td className="border border-white/10 px-3 py-2">Blasius: f = 0.316/Re⁰·²⁵</td>
                      <td className="border border-white/10 px-3 py-2">Re &lt; 100,000</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Turbulent rough</td>
                      <td className="border border-white/10 px-3 py-2">Moody diagram</td>
                      <td className="border border-white/10 px-3 py-2">Depends on Re and ε/D</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fully rough</td>
                      <td className="border border-white/10 px-3 py-2">f = f(ε/D) only</td>
                      <td className="border border-white/10 px-3 py-2">Independent of Re</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Head loss is proportional to v² - doubling velocity quadruples friction loss.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Moody Diagram and Roughness */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Moody Diagram and Pipe Roughness
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Moody diagram graphically relates friction factor to Reynolds number and relative roughness.
              It's the standard tool for determining friction factors in turbulent pipe flow.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Absolute Roughness Values (ε)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Pipe Material</th>
                      <th className="border border-white/10 px-3 py-2 text-left">ε (mm)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Copper</td>
                      <td className="border border-white/10 px-3 py-2">0.0015</td>
                      <td className="border border-white/10 px-3 py-2">DHW, small bore heating</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Plastic (PE, PVC)</td>
                      <td className="border border-white/10 px-3 py-2">0.003</td>
                      <td className="border border-white/10 px-3 py-2">Cold water, underfloor</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Steel (new)</td>
                      <td className="border border-white/10 px-3 py-2">0.046</td>
                      <td className="border border-white/10 px-3 py-2">LPHW mains</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Galvanised steel</td>
                      <td className="border border-white/10 px-3 py-2">0.15</td>
                      <td className="border border-white/10 px-3 py-2">Cold water services</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cast iron</td>
                      <td className="border border-white/10 px-3 py-2">0.26</td>
                      <td className="border border-white/10 px-3 py-2">Drainage, old mains</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Using the Moody Diagram</p>
              <ol className="text-sm text-white space-y-1.5 list-decimal list-outside ml-5">
                <li className="pl-1">Calculate Reynolds number: Re = ρvD/μ</li>
                <li className="pl-1">Calculate relative roughness: ε/D</li>
                <li className="pl-1">Enter diagram at Re on x-axis</li>
                <li className="pl-1">Move up to appropriate ε/D curve</li>
                <li className="pl-1">Read friction factor f from y-axis</li>
              </ol>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Moody Diagram Zones</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Laminar:</strong> Single line, f = 64/Re</li>
                  <li className="pl-1"><strong>Transition:</strong> Re 2300-4000 (avoid)</li>
                  <li className="pl-1"><strong>Smooth turbulent:</strong> Curves converge</li>
                  <li className="pl-1"><strong>Rough turbulent:</strong> Horizontal lines</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Colebrook-White Equation</p>
                <div className="p-3 rounded bg-black/30">
                  <p className="font-mono text-xs mb-2">1/√f = -2log₁₀(ε/3.7D + 2.51/Re√f)</p>
                  <p className="text-xs text-white/70">Implicit equation - requires iteration</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical tip:</strong> For building services with typical pipe sizes and velocities, f is usually in the range 0.02-0.04.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 3: Fitting Losses */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Fitting Losses (Minor Losses)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Fittings, valves, and changes in section cause additional pressure losses beyond pipe friction.
              These are called 'minor' losses but often dominate in building services with many fittings.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">K Factor Method</p>
              <p className="font-mono text-center text-lg mb-2">h = K × v²/2g</p>
              <p className="text-xs text-white/70 text-center">Where K is the loss coefficient (dimensionless) and v is the velocity at the fitting</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical K Values for Fittings</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Fitting</th>
                      <th className="border border-white/10 px-3 py-2 text-left">K Value</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Equiv. Length (L/D)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">90° elbow (standard)</td>
                      <td className="border border-white/10 px-3 py-2">0.75</td>
                      <td className="border border-white/10 px-3 py-2">30</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">90° elbow (long radius)</td>
                      <td className="border border-white/10 px-3 py-2">0.45</td>
                      <td className="border border-white/10 px-3 py-2">20</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">45° elbow</td>
                      <td className="border border-white/10 px-3 py-2">0.35</td>
                      <td className="border border-white/10 px-3 py-2">15</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Tee (through flow)</td>
                      <td className="border border-white/10 px-3 py-2">0.4</td>
                      <td className="border border-white/10 px-3 py-2">20</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Tee (branch flow)</td>
                      <td className="border border-white/10 px-3 py-2">1.5</td>
                      <td className="border border-white/10 px-3 py-2">60</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Gate valve (open)</td>
                      <td className="border border-white/10 px-3 py-2">0.2</td>
                      <td className="border border-white/10 px-3 py-2">8</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Globe valve (open)</td>
                      <td className="border border-white/10 px-3 py-2">6-10</td>
                      <td className="border border-white/10 px-3 py-2">300</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Check valve (swing)</td>
                      <td className="border border-white/10 px-3 py-2">2.5</td>
                      <td className="border border-white/10 px-3 py-2">100</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Strainer</td>
                      <td className="border border-white/10 px-3 py-2">2-5</td>
                      <td className="border border-white/10 px-3 py-2">100-200</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Equivalent length method:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Convert K to equivalent length: L<sub>e</sub> = K × D / f</li>
                <li className="pl-1">Or use tabulated L/D ratios directly</li>
                <li className="pl-1">Add equivalent lengths to pipe length</li>
                <li className="pl-1">Calculate total loss using combined length</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design note:</strong> For initial estimates, add 30-50% to straight pipe length to account for fittings. Refine in detailed design.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: CIBSE Tables and Practical Sizing */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            CIBSE Tables and Practical Pipe Sizing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              CIBSE provides pre-calculated pipe sizing tables that simplify design. These tables give
              pressure drop rates and velocities for standard pipe sizes and flow rates.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Using CIBSE Pipe Sizing Tables</p>
              <ol className="text-sm text-white space-y-1.5 list-decimal list-outside ml-5">
                <li className="pl-1">Determine required flow rate (from heat load calculation)</li>
                <li className="pl-1">Choose target pressure drop rate (typically 250-350 Pa/m)</li>
                <li className="pl-1">Enter table at flow rate</li>
                <li className="pl-1">Select pipe size that meets velocity and ΔP criteria</li>
                <li className="pl-1">Read actual ΔP/m and velocity</li>
              </ol>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Recommended Pressure Drop Rates</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">ΔP Rate (Pa/m)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Index circuit (general)</td>
                      <td className="border border-white/10 px-3 py-2">250-350</td>
                      <td className="border border-white/10 px-3 py-2">Balance cost and energy</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Long pipe runs</td>
                      <td className="border border-white/10 px-3 py-2">100-200</td>
                      <td className="border border-white/10 px-3 py-2">Limit total head</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Short runs/bypasses</td>
                      <td className="border border-white/10 px-3 py-2">400-500</td>
                      <td className="border border-white/10 px-3 py-2">Accept higher loss</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Pump connections</td>
                      <td className="border border-white/10 px-3 py-2">&lt;150</td>
                      <td className="border border-white/10 px-3 py-2">Low velocity critical</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Index Circuit Calculation</p>
              <p className="text-sm mb-2">
                The index circuit is the flow path with highest total pressure drop. Pump selection is based on this circuit.
              </p>
              <ol className="text-sm text-white space-y-1 list-decimal list-outside ml-5">
                <li className="pl-1">Trace route from pump to furthest terminal and back</li>
                <li className="pl-1">Sum pipe friction losses (ΔP/m × length)</li>
                <li className="pl-1">Add fitting losses (K × ρv²/2)</li>
                <li className="pl-1">Add terminal equipment losses (from data sheets)</li>
                <li className="pl-1">Include balancing valve allowance</li>
              </ol>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Maximum velocity limits (noise control):</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Occupied spaces:</strong> 1.5 m/s maximum</li>
                <li className="pl-1"><strong>Service corridors:</strong> 2.0 m/s maximum</li>
                <li className="pl-1"><strong>Plant rooms:</strong> 3.0 m/s maximum</li>
                <li className="pl-1"><strong>Pump suction:</strong> 1.5 m/s maximum (cavitation)</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Design process:</strong> Size pipes for index circuit first, then check other circuits are at lower pressure drop (or add balancing allowance).
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Darcy-Weisbach Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Calculate pressure drop for 30m of 50mm steel pipe carrying water at 2 m/s. (f = 0.025, ρ = 1000 kg/m³)
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>h<sub>f</sub> = f × (L/D) × (v²/2g)</p>
                <p>h<sub>f</sub> = 0.025 × (30/0.05) × (2²/(2×9.81))</p>
                <p>h<sub>f</sub> = 0.025 × 600 × 0.204 = <strong>3.06 m</strong></p>
                <p className="mt-2">ΔP = ρgh = 1000 × 9.81 × 3.06 = <strong>30 kPa</strong></p>
                <p className="mt-2 text-white/60">→ Pressure drop rate = 30000/30 = 1000 Pa/m (high!)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Fitting Loss Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Calculate total fitting loss for: 4 × 90° elbows (K=0.75), 2 × tee branches (K=1.5), 1 × globe valve (K=8). Velocity = 1.5 m/s.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Total K = (4 × 0.75) + (2 × 1.5) + 8 = 3 + 3 + 8 = 14</p>
                <p className="mt-2">h = K × v²/2g = 14 × 1.5²/(2×9.81)</p>
                <p>h = 14 × 0.115 = <strong>1.6 m</strong></p>
                <p className="mt-2">ΔP = 1000 × 9.81 × 1.6 = <strong>15.7 kPa</strong></p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Index Circuit Sizing</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Size pump for index circuit: 80m pipe at 300 Pa/m, fittings = 25m equiv, coil = 20 kPa, balancing = 10 kPa.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Pipe + fittings = (80 + 25) × 300 = 31,500 Pa = 31.5 kPa</p>
                <p className="mt-2">Total = Pipe + Coil + Balancing</p>
                <p>Total = 31.5 + 20 + 10 = <strong>61.5 kPa</strong></p>
                <p className="mt-2">Head = 61,500 / (1000 × 9.81) = <strong>6.3 m</strong></p>
                <p className="mt-2 text-white/60">→ Select pump with ≥6.5 m head at design flow</p>
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
                <li className="pl-1"><strong>h<sub>f</sub> = f(L/D)(v²/2g)</strong> — Darcy-Weisbach</li>
                <li className="pl-1"><strong>h = Kv²/2g</strong> — Minor loss</li>
                <li className="pl-1"><strong>ε/D</strong> — Relative roughness</li>
                <li className="pl-1"><strong>f = 64/Re</strong> — Laminar friction factor</li>
                <li className="pl-1"><strong>ΔP = ρgh</strong> — Head to pressure conversion</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Typical f for turbulent: <strong>0.02-0.04</strong></li>
                <li className="pl-1">CIBSE design rate: <strong>250-350 Pa/m</strong></li>
                <li className="pl-1">Max velocity (occupied): <strong>1.5 m/s</strong></li>
                <li className="pl-1">Globe valve K: <strong>6-10</strong></li>
                <li className="pl-1">90° elbow K: <strong>0.75</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Ignoring fittings:</strong> Can equal or exceed pipe losses</li>
                <li className="pl-1"><strong>Wrong diameter:</strong> Use internal, not nominal diameter</li>
                <li className="pl-1"><strong>Temperature effects:</strong> Viscosity affects friction factor</li>
                <li className="pl-1"><strong>Forgetting return:</strong> Index circuit is flow AND return</li>
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
                <p className="font-medium text-white mb-1">Pipe Friction</p>
                <ul className="space-y-0.5">
                  <li>Darcy-Weisbach: h = f(L/D)(v²/2g)</li>
                  <li>Laminar f = 64/Re</li>
                  <li>Turbulent f: Moody diagram</li>
                  <li>Design rate: 250-350 Pa/m</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Fittings (K values)</p>
                <ul className="space-y-0.5">
                  <li>90° elbow: K = 0.75</li>
                  <li>Tee branch: K = 1.5</li>
                  <li>Globe valve: K = 6-10</li>
                  <li>h = Kv²/2g</li>
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
            <Link to="../h-n-c-module2-section2-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Bernoulli's Equation
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module2-section2-5">
              Next: Pump Characteristics
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule2Section2_4;
