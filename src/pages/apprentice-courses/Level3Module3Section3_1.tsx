import { ArrowLeft, ArrowRight, Zap, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";

const quickCheckQuestions = [
  {
    question: "What is the unit of magnetic flux (Phi)?",
    options: ["Tesla (T)", "Weber (Wb)", "Ampere-turns (At)", "Henry (H)"],
    correctIndex: 1,
    explanation: "Magnetic flux is measured in Webers (Wb). One Weber equals one volt-second, representing the total magnetic field passing through a surface."
  },
  {
    question: "What is the relationship between flux density B and flux Phi?",
    options: ["B = Phi x A", "B = Phi / A", "B = A / Phi", "B = Phi + A"],
    correctIndex: 1,
    explanation: "Flux density B = Phi / A, where Phi is flux in Webers and A is area in square metres. Flux density is measured in Tesla (T) or Wb/m squared."
  },
  {
    question: "What property of a material indicates how easily it can be magnetised?",
    options: ["Reluctance", "Permeability", "Retentivity", "Coercivity"],
    correctIndex: 1,
    explanation: "Permeability (mu) indicates how easily a material can be magnetised - how well it conducts magnetic flux. High permeability materials like iron are easily magnetised."
  },
  {
    question: "A coil of 500 turns carries 2A. What is the magnetomotive force?",
    options: ["250 At", "500 At", "1000 At", "2500 At"],
    correctIndex: 2,
    explanation: "MMF = N x I = 500 x 2 = 1000 Ampere-turns (At). This is the magnetic equivalent of voltage in an electrical circuit."
  }
];

const quizQuestions = [
  {
    question: "Calculate the flux density in a core with cross-sectional area 0.01 m squared carrying 0.05 Wb of flux.",
    options: ["0.5 T", "5 T", "0.005 T", "50 T"],
    correctIndex: 1,
    explanation: "B = Phi / A = 0.05 / 0.01 = 5 Tesla. This is a high flux density, typical of transformer cores at maximum loading."
  },
  {
    question: "What is the magnetic field strength H in a 200mm long magnetic circuit with 400 At MMF?",
    options: ["2000 At/m", "80 At/m", "200 At/m", "800 At/m"],
    correctIndex: 0,
    explanation: "H = MMF / l = F / l = 400 / 0.2 = 2000 At/m. Magnetic field strength is measured in Ampere-turns per metre."
  },
  {
    question: "If the relative permeability of iron is 5000, what is its absolute permeability?",
    options: ["6.28 x 10^-3 H/m", "5000 H/m", "4 x 10^-7 H/m", "6.28 x 10^-7 H/m"],
    correctIndex: 0,
    explanation: "mu = mu_r x mu_0 = 5000 x 4pi x 10^-7 = 5000 x 1.257 x 10^-6 = 6.28 x 10^-3 H/m."
  },
  {
    question: "What is the reluctance of a magnetic path 0.5m long with area 0.002 m squared and permeability 0.005 H/m?",
    options: ["50,000 At/Wb", "500 At/Wb", "5,000 At/Wb", "0.002 At/Wb"],
    correctIndex: 0,
    explanation: "Reluctance S = l / (mu x A) = 0.5 / (0.005 x 0.002) = 0.5 / 0.00001 = 50,000 At/Wb."
  },
  {
    question: "In the BH curve, what does the region after saturation indicate?",
    options: ["Increasing permeability", "Decreasing flux density", "Little change in B despite increasing H", "Maximum reluctance"],
    correctIndex: 2,
    explanation: "After saturation, further increases in magnetic field strength H produce little additional flux density B. The material's magnetic domains are fully aligned."
  },
  {
    question: "What is hysteresis loss in magnetic materials?",
    options: ["Energy lost due to resistance", "Energy lost reversing magnetic domains each cycle", "Energy lost to eddy currents", "Energy stored in the magnetic field"],
    correctIndex: 1,
    explanation: "Hysteresis loss is energy required to reverse the magnetic domain alignment in each AC cycle. It appears as heat and is proportional to the area of the BH loop."
  },
  {
    question: "A magnetic circuit has reluctance 100,000 At/Wb and MMF of 500 At. What is the flux?",
    options: ["0.005 Wb", "50 Wb", "200 Wb", "0.05 Wb"],
    correctIndex: 0,
    explanation: "Using Ohm's law for magnetic circuits: Phi = MMF / S = 500 / 100,000 = 0.005 Wb = 5 mWb."
  },
  {
    question: "Why are transformer cores laminated?",
    options: ["To increase flux density", "To reduce eddy current losses", "To increase permeability", "To reduce hysteresis loss"],
    correctIndex: 1,
    explanation: "Laminations break up the path for eddy currents, which are induced currents that circulate in the core and cause I squared R heating. Thinner laminations mean lower eddy current losses."
  },
  {
    question: "What is the permeability of free space (mu_0)?",
    options: ["4pi x 10^-7 H/m", "8.85 x 10^-12 F/m", "1 H/m", "9 x 10^9 Nm squared/C squared"],
    correctIndex: 0,
    explanation: "The permeability of free space mu_0 = 4pi x 10^-7 H/m = 1.257 x 10^-6 H/m. This is a fundamental constant in electromagnetism."
  },
  {
    question: "What does high retentivity in a magnetic material indicate?",
    options: ["Easy to magnetise", "Retains magnetism well after field removed", "High resistance", "Low permeability"],
    correctIndex: 1,
    explanation: "High retentivity means the material retains significant flux density after the magnetising force is removed. This is desirable for permanent magnets but undesirable for transformer cores."
  },
  {
    question: "Calculate the total flux in a core with B = 1.2T and cross-sectional area of 50 cm squared.",
    options: ["6 mWb", "60 mWb", "0.6 mWb", "600 mWb"],
    correctIndex: 0,
    explanation: "Phi = B x A = 1.2 x 0.005 = 0.006 Wb = 6 mWb. Note: 50 cm squared = 50 x 10^-4 m squared = 0.005 m squared."
  },
  {
    question: "Which type of magnetic material would be best for an electromagnet that must quickly switch on and off?",
    options: ["Hard magnetic material with high retentivity", "Soft magnetic material with low retentivity", "Permanent magnet material", "Non-magnetic material"],
    correctIndex: 1,
    explanation: "Soft magnetic materials with low retentivity and low coercivity can be magnetised and demagnetised quickly, making them ideal for electromagnets and transformer cores."
  }
];

const faqItems = [
  {
    question: "What is the difference between magnetic flux and flux density?",
    answer: "Magnetic flux (Phi) is the total amount of magnetic field passing through a surface, measured in Webers (Wb). Flux density (B) is the flux per unit area, measured in Tesla (T) or Wb/m squared. If you imagine magnetic field lines, flux is the total number of lines through a surface, while flux density is how closely packed those lines are."
  },
  {
    question: "Why is the BH curve important for electrical engineers?",
    answer: "The BH curve shows the relationship between magnetic field strength (H) and flux density (B) for a material. It reveals important properties: initial permeability (slope), saturation point (where the curve flattens), and hysteresis characteristics. Engineers use this to select appropriate materials for transformers, motors and other magnetic devices."
  },
  {
    question: "What is the magnetic circuit analogy to Ohm's Law?",
    answer: "Ohm's Law for magnetic circuits states: Flux (Phi) = MMF / Reluctance, analogous to Current = Voltage / Resistance. MMF (Magnetomotive Force) is like voltage, Flux is like current, and Reluctance is like resistance. This analogy helps in analysing complex magnetic circuits using familiar electrical concepts."
  },
  {
    question: "How do air gaps affect magnetic circuits?",
    answer: "Air gaps have very high reluctance compared to magnetic materials (about 2000-5000 times higher for the same dimensions). Even a small air gap can dominate the total reluctance of a magnetic circuit, significantly reducing flux for a given MMF. However, air gaps are sometimes deliberately used to prevent saturation or store energy."
  },
  {
    question: "What causes magnetic saturation?",
    answer: "Magnetic saturation occurs when all the magnetic domains in a material have aligned with the applied field. Further increases in field strength produce little additional flux density because there are no more domains to align. Operating past saturation wastes energy and can cause overheating in transformers and motors."
  },
  {
    question: "What is the difference between soft and hard magnetic materials?",
    answer: "Soft magnetic materials (like silicon steel) are easily magnetised and demagnetised, with low hysteresis loss - ideal for transformers and motor cores. Hard magnetic materials (like alnico, ferrite) retain their magnetism after the field is removed - used for permanent magnets. The distinction is about ease of magnetisation reversal, not physical hardness."
  }
];

const Level3Module3Section3_1 = () => {
  useSEO(
    "Magnetic Fields and Flux - Level 3 Electrical Science | Elec-Mate",
    "Master magnetic field theory including flux, flux density, permeability, reluctance and the BH curve. Essential knowledge for understanding transformers and motors in City & Guilds Level 3 qualifications."
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
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
          3.1 Magnetic Fields and Flux
        </h1>
        <p className="text-xl text-white/70 mb-8">
          Understanding magnetic field strength, flux density and the fundamental principles of magnetic circuits
        </p>

        {/* Quick Summary Box */}
        <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-green-400 mb-3 flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Quick Summary
          </h3>
          <ul className="text-white/80 space-y-2">
            <li>Magnetic flux (Phi) measured in Webers (Wb) - total field through a surface</li>
            <li>Flux density B = Phi / A, measured in Tesla (T) - field concentration</li>
            <li>MMF (F) = N x I ampere-turns - the magnetic driving force</li>
            <li>Reluctance S = l / (mu x A) - opposition to magnetic flux</li>
            <li>Ohm's Law for magnetics: Phi = F / S (Flux = MMF / Reluctance)</li>
          </ul>
        </div>

        {/* Learning Outcomes */}
        <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-blue-400 mb-3">Learning Outcomes</h3>
          <ul className="text-white/80 space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-1 text-green-400 flex-shrink-0" />
              Define magnetic flux, flux density and their units of measurement
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-1 text-green-400 flex-shrink-0" />
              Calculate magnetomotive force and magnetic field strength
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-1 text-green-400 flex-shrink-0" />
              Explain permeability and its relationship to magnetic materials
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-1 text-green-400 flex-shrink-0" />
              Apply Ohm's Law for magnetic circuits using reluctance
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-1 text-green-400 flex-shrink-0" />
              Interpret BH curves and understand saturation and hysteresis
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-1 text-green-400 flex-shrink-0" />
              Distinguish between soft and hard magnetic materials and their applications
            </li>
          </ul>
        </div>

        {/* Main Content Sections */}
        <div className="prose prose-invert max-w-none">
          {/* Section 1 */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</span>
              Magnetic Flux and Flux Density
            </h2>
            <div className="bg-[#242424] rounded-lg p-6 border border-white/10">
              <p className="text-white/80 mb-4">
                <strong>Magnetic flux (Phi)</strong> represents the total magnetic field passing through a given surface. It can be visualised as the total number of magnetic field lines passing through an area.
              </p>

              <h4 className="text-lg font-semibold text-green-400 mb-3">Magnetic Flux</h4>
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
                <p className="text-white/80 mb-2"><strong>Symbol:</strong> Phi (Greek letter phi)</p>
                <p className="text-white/80 mb-2"><strong>Unit:</strong> Weber (Wb)</p>
                <p className="text-white/80 mb-2"><strong>Definition:</strong> 1 Weber = 1 Volt-second</p>
                <p className="text-white/70 text-sm">A Weber is the flux that, when reduced to zero in one second, induces 1 volt in a single-turn coil.</p>
              </div>

              <h4 className="text-lg font-semibold text-green-400 mb-3">Flux Density</h4>
              <p className="text-white/80 mb-4">
                <strong>Flux density (B)</strong> is the flux per unit area - how concentrated the magnetic field is at a point.
              </p>
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4 text-center">
                <p className="text-green-400 font-mono text-lg mb-2">B = Phi / A</p>
                <p className="text-white/80 text-sm">Where B = flux density (T), Phi = flux (Wb), A = area (m squared)</p>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
                <p className="text-white/80 mb-2"><strong>Unit:</strong> Tesla (T) = Wb/m squared</p>
                <p className="text-white/80 mb-2"><strong>Typical values:</strong></p>
                <ul className="text-white/70 text-sm space-y-1 ml-4">
                  <li>Earth's magnetic field: approximately 50 microTesla</li>
                  <li>Permanent magnet: 0.1 - 1 T</li>
                  <li>Transformer core: 1.2 - 1.7 T</li>
                  <li>MRI scanner: 1.5 - 7 T</li>
                </ul>
              </div>

              <InlineCheck
                question="A transformer core has a cross-sectional area of 40 cm squared and carries 8 mWb of flux. What is the flux density?"
                options={["0.2 T", "2 T", "0.02 T", "20 T"]}
                correctIndex={1}
                explanation="B = Phi / A = 0.008 / 0.004 = 2 T. Note: 40 cm squared = 40 x 10^-4 m squared = 0.004 m squared."
              />
            </div>
          </div>

          {/* Section 2 */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</span>
              Magnetomotive Force and Field Strength
            </h2>
            <div className="bg-[#242424] rounded-lg p-6 border border-white/10">
              <h4 className="text-lg font-semibold text-green-400 mb-3">Magnetomotive Force (MMF)</h4>
              <p className="text-white/80 mb-4">
                <strong>Magnetomotive force (F or MMF)</strong> is the magnetic equivalent of electromotive force (voltage) in electrical circuits. It is the force that drives magnetic flux through a magnetic circuit.
              </p>
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4 text-center">
                <p className="text-green-400 font-mono text-lg mb-2">F = N x I</p>
                <p className="text-white/80 text-sm">Where F = MMF (At), N = number of turns, I = current (A)</p>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
                <p className="text-white/80 mb-2"><strong>Unit:</strong> Ampere-turns (At)</p>
                <p className="text-white/80">MMF increases with more turns or more current - both have equal effect.</p>
              </div>

              <h4 className="text-lg font-semibold text-green-400 mb-3">Magnetic Field Strength</h4>
              <p className="text-white/80 mb-4">
                <strong>Magnetic field strength (H)</strong> is the MMF per unit length of the magnetic path - how hard the field is "pushing" the flux through each metre of the circuit.
              </p>
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4 text-center">
                <p className="text-green-400 font-mono text-lg mb-2">H = F / l = (N x I) / l</p>
                <p className="text-white/80 text-sm">Where H = field strength (At/m), F = MMF (At), l = length (m)</p>
              </div>

              <p className="text-white/80 mb-4">
                The relationship between B and H is fundamental to understanding magnetic materials:
              </p>
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4 text-center">
                <p className="text-green-400 font-mono text-lg mb-2">B = mu x H = mu_0 x mu_r x H</p>
                <p className="text-white/80 text-sm">Where mu = absolute permeability, mu_0 = permeability of free space, mu_r = relative permeability</p>
              </div>

              <InlineCheck
                question="A coil with 1000 turns and 0.5A current is wound on a ring core with mean length 400mm. What is H?"
                options={["1250 At/m", "2500 At/m", "500 At/m", "200 At/m"]}
                correctIndex={0}
                explanation="First calculate MMF: F = NI = 1000 x 0.5 = 500 At. Then H = F/l = 500/0.4 = 1250 At/m."
              />
            </div>
          </div>

          {/* Section 3 */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</span>
              Permeability and Reluctance
            </h2>
            <div className="bg-[#242424] rounded-lg p-6 border border-white/10">
              <h4 className="text-lg font-semibold text-green-400 mb-3">Permeability</h4>
              <p className="text-white/80 mb-4">
                <strong>Permeability (mu)</strong> is a measure of how easily a material allows magnetic flux to pass through it - its magnetic "conductivity".
              </p>

              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
                <p className="text-white/80 mb-2"><strong>Permeability of free space:</strong> mu_0 = 4pi x 10^-7 H/m = 1.257 x 10^-6 H/m</p>
                <p className="text-white/80 mb-2"><strong>Relative permeability:</strong> mu_r = mu / mu_0 (dimensionless ratio)</p>
                <p className="text-white/80"><strong>Absolute permeability:</strong> mu = mu_0 x mu_r</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-[#1a1a1a] rounded-lg p-4">
                  <h5 className="font-semibold text-white mb-2">Typical Relative Permeabilities</h5>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>Air, vacuum: 1</li>
                    <li>Aluminium, copper: approximately 1</li>
                    <li>Cast iron: 100 - 300</li>
                    <li>Silicon steel: 3000 - 8000</li>
                    <li>Mumetal: up to 100,000</li>
                  </ul>
                </div>
                <div className="bg-[#1a1a1a] rounded-lg p-4">
                  <h5 className="font-semibold text-white mb-2">Why Permeability Matters</h5>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>High mu = more flux for same MMF</li>
                    <li>Determines transformer core efficiency</li>
                    <li>Affects motor torque production</li>
                    <li>Varies with flux density (non-linear)</li>
                  </ul>
                </div>
              </div>

              <h4 className="text-lg font-semibold text-green-400 mb-3">Reluctance</h4>
              <p className="text-white/80 mb-4">
                <strong>Reluctance (S or R_m)</strong> is the opposition to magnetic flux in a magnetic circuit - the magnetic equivalent of electrical resistance.
              </p>
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4 text-center">
                <p className="text-green-400 font-mono text-lg mb-2">S = l / (mu x A) = l / (mu_0 x mu_r x A)</p>
                <p className="text-white/80 text-sm">Where S = reluctance (At/Wb), l = length (m), mu = permeability, A = area (m squared)</p>
              </div>

              <h4 className="text-lg font-semibold text-green-400 mb-3">Ohm's Law for Magnetic Circuits</h4>
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
                <p className="text-green-400 font-mono text-lg mb-2 text-center">Phi = F / S (Flux = MMF / Reluctance)</p>
                <table className="w-full text-white/80 mt-4">
                  <thead>
                    <tr>
                      <th className="text-left pb-2">Electrical</th>
                      <th className="text-left pb-2">Magnetic</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr><td>Voltage (V)</td><td>MMF (F) in At</td></tr>
                    <tr><td>Current (I)</td><td>Flux (Phi) in Wb</td></tr>
                    <tr><td>Resistance (R)</td><td>Reluctance (S) in At/Wb</td></tr>
                    <tr><td>Conductance (G)</td><td>Permeance in Wb/At</td></tr>
                  </tbody>
                </table>
              </div>

              <InlineCheck
                question="What happens to reluctance if the air gap in a magnetic circuit is doubled?"
                options={["Halved", "Doubled", "Unchanged", "Quadrupled"]}
                correctIndex={1}
                explanation="Reluctance S = l / (mu x A). If length l doubles, reluctance doubles. Air gaps have very high reluctance due to low permeability (mu_r = 1)."
              />
            </div>
          </div>

          {/* Section 4 */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</span>
              The BH Curve and Magnetic Materials
            </h2>
            <div className="bg-[#242424] rounded-lg p-6 border border-white/10">
              <p className="text-white/80 mb-4">
                The <strong>BH curve</strong> (magnetisation curve) shows the relationship between flux density (B) and magnetic field strength (H) for a material. It reveals the material's magnetic characteristics.
              </p>

              <h4 className="text-lg font-semibold text-green-400 mb-3">Key Features of the BH Curve</h4>
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
                <p className="text-white/80 mb-3"><strong>Initial region:</strong> B increases steeply with H as magnetic domains align</p>
                <p className="text-white/80 mb-3"><strong>Knee region:</strong> Rate of increase starts to slow</p>
                <p className="text-white/80 mb-3"><strong>Saturation region:</strong> Curve flattens - little increase in B despite increasing H</p>
                <p className="text-white/70 text-sm">The slope of the curve at any point represents the permeability at that operating point.</p>
              </div>

              <h4 className="text-lg font-semibold text-green-400 mb-3">Hysteresis</h4>
              <p className="text-white/80 mb-4">
                When the magnetic field is cycled (as in AC), the BH curve forms a loop. The material "remembers" its previous state, requiring energy to reverse the magnetisation.
              </p>
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
                <p className="text-white/80 mb-2"><strong>Retentivity (Br):</strong> Flux density remaining when H = 0 (residual magnetism)</p>
                <p className="text-white/80 mb-2"><strong>Coercivity (Hc):</strong> Field strength needed to reduce B to zero</p>
                <p className="text-white/80"><strong>Hysteresis loss:</strong> Energy lost per cycle = area inside the BH loop</p>
              </div>

              <h4 className="text-lg font-semibold text-green-400 mb-3">Types of Magnetic Materials</h4>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-[#1a1a1a] rounded-lg p-4">
                  <h5 className="font-semibold text-white mb-2">Soft Magnetic Materials</h5>
                  <p className="text-white/70 text-sm mb-2">Low retentivity, low coercivity, narrow hysteresis loop</p>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>Silicon steel (transformers)</li>
                    <li>Soft iron (electromagnets)</li>
                    <li>Ferrites (high frequency)</li>
                    <li>Mumetal (shielding)</li>
                  </ul>
                </div>
                <div className="bg-[#1a1a1a] rounded-lg p-4">
                  <h5 className="font-semibold text-white mb-2">Hard Magnetic Materials</h5>
                  <p className="text-white/70 text-sm mb-2">High retentivity, high coercivity, wide hysteresis loop</p>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>Alnico (Al-Ni-Co alloy)</li>
                    <li>Ferrite (ceramic magnets)</li>
                    <li>Rare earth (NdFeB, SmCo)</li>
                    <li>Used for permanent magnets</li>
                  </ul>
                </div>
              </div>

              <h4 className="text-lg font-semibold text-green-400 mb-3">Core Losses</h4>
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
                <p className="text-white/80 mb-2"><strong>Hysteresis loss:</strong> Proportional to frequency and loop area. Reduced by using soft magnetic materials.</p>
                <p className="text-white/80 mb-2"><strong>Eddy current loss:</strong> Proportional to frequency squared and thickness squared. Reduced by laminating cores.</p>
                <p className="text-white/70 text-sm mt-3">Total core loss = Hysteresis loss + Eddy current loss</p>
              </div>

              <InlineCheck
                question="Which material property is most important for a permanent magnet?"
                options={["High permeability", "Low retentivity", "High coercivity", "Low reluctance"]}
                correctIndex={2}
                explanation="High coercivity means the magnet resists demagnetisation - a strong external field is needed to reduce its flux to zero. This keeps the magnet strong over time."
              />
            </div>
          </div>

          {/* Practical Guidance */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4">Practical Guidance</h2>
            <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-yellow-400 mb-3">Applications in Electrical Installations</h4>
              <ul className="text-white/80 space-y-2">
                <li><strong>Transformer design:</strong> Core material chosen for high permeability and low hysteresis loss. Laminations (typically 0.35mm thick) reduce eddy currents. Operating flux density kept below saturation.</li>
                <li><strong>Motor cores:</strong> Similar requirements to transformers. Grain-oriented silicon steel improves efficiency. Air gaps carefully controlled to balance torque and magnetising current.</li>
                <li><strong>Contactors and relays:</strong> Use soft iron for fast operation. Air gap determines pull-in force and holding current. Shading rings prevent chatter on AC.</li>
                <li><strong>RCDs:</strong> High-permeability toroidal cores detect small imbalance currents. Core must not saturate during fault conditions.</li>
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
                    <li>B = Phi / A (Tesla)</li>
                    <li>F = N x I (Ampere-turns)</li>
                    <li>H = F / l (At/m)</li>
                    <li>B = mu x H</li>
                    <li>S = l / (mu x A)</li>
                    <li>Phi = F / S</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-green-400 mb-3">Key Constants</h4>
                  <ul className="text-white/70 text-sm space-y-2">
                    <li>mu_0 = 4pi x 10^-7 H/m</li>
                    <li>mu_0 = 1.257 x 10^-6 H/m</li>
                    <li>1 Tesla = 1 Wb/m squared</li>
                    <li>1 Weber = 1 Volt-second</li>
                    <li>mu_r (air) = 1</li>
                    <li>mu_r (silicon steel) = 3000-8000</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-4">Test Your Knowledge</h2>
          <p className="text-white/70 mb-4">Complete this quiz to check your understanding of magnetic fields and flux:</p>
          <Quiz questions={quizQuestions} moduleId="L3M3S3.1" />
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
            <Link to="/study-centre/apprentice/level3-module3-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 3
            </Link>
          </Button>
          <Button className="bg-green-600 hover:bg-green-700 text-white" asChild>
            <Link to="/study-centre/apprentice/level3-module3-section3-2">
              Next: Electromagnetic Induction
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Level3Module3Section3_1;
