import { ArrowLeft, Wind, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Ductwork Design - HNC Module 8 Section 2.5";
const DESCRIPTION = "Master ductwork design for HVAC systems: sizing methods including equal friction and velocity reduction, pressure drop calculations, DW/144 specification, duct materials, rectangular vs circular ducts, fire dampers, smoke dampers, acoustic attenuation, and duct leakage testing.";

const quickCheckQuestions = [
  {
    id: "equal-friction",
    question: "In the equal friction method of duct sizing, what parameter is kept constant throughout the duct system?",
    options: ["Air velocity", "Duct cross-sectional area", "Pressure drop per unit length", "Volume flow rate"],
    correctIndex: 2,
    explanation: "The equal friction method maintains a constant pressure drop per unit length (typically 1 Pa/m) throughout the duct system. This simplifies balancing as each branch experiences proportional pressure losses regardless of path length."
  },
  {
    id: "dw144-class",
    question: "According to DW/144, what leakage class is typically specified for low-pressure ductwork in commercial buildings?",
    options: ["Class A", "Class B", "Class C", "Class D"],
    correctIndex: 2,
    explanation: "Class C is the standard leakage class for low-pressure ductwork in commercial buildings per DW/144. Class A is the tightest (high-pressure systems), while Class D has the highest allowable leakage (used only where leakage is acceptable)."
  },
  {
    id: "fire-damper-rating",
    question: "What is the minimum integrity rating required for fire dampers in standard applications?",
    options: ["E30", "E60", "E90", "E120"],
    correctIndex: 1,
    explanation: "Fire dampers must provide a minimum E60 integrity rating (60 minutes) in standard applications. Higher ratings (E90, E120, ES120) may be required depending on the fire compartmentation strategy and building regulations."
  },
  {
    id: "circular-advantage",
    question: "What is the primary advantage of circular ductwork compared to rectangular ductwork of equal cross-sectional area?",
    options: ["Lower material cost", "Easier to fabricate", "Lower pressure drop and better airflow", "Simpler to install in ceiling voids"],
    correctIndex: 2,
    explanation: "Circular ducts have lower pressure drop than equivalent rectangular ducts because they have a smaller perimeter-to-area ratio, reducing frictional losses. They also promote more uniform airflow with less turbulence at the duct walls."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the typical design pressure drop per metre used in the equal friction sizing method for low-velocity systems?",
    options: [
      "0.5 Pa/m",
      "1.0 Pa/m",
      "2.0 Pa/m",
      "5.0 Pa/m"
    ],
    correctAnswer: 1,
    explanation: "The equal friction method typically uses 1.0 Pa/m for low-velocity comfort systems. This provides a good balance between duct size (cost) and fan energy consumption. Higher values (1.5-2.0 Pa/m) may be used where space is limited."
  },
  {
    id: 2,
    question: "In the velocity reduction method of duct sizing, what happens to duct velocity as air travels further from the fan?",
    options: ["Velocity increases", "Velocity remains constant", "Velocity decreases in steps", "Velocity fluctuates randomly"],
    correctAnswer: 2,
    explanation: "The velocity reduction method progressively reduces duct velocity in steps as air travels further from the fan. Starting velocities of 6-8 m/s at the main duct reduce to 3-4 m/s at final branches, helping to reduce noise at terminals."
  },
  {
    id: 3,
    question: "What is the hydraulic diameter used for when calculating pressure drop in rectangular ducts?",
    options: [
      "Converting rectangular duct dimensions to equivalent circular diameter",
      "Measuring the physical height of the duct",
      "Calculating the weight of the duct material",
      "Determining the acoustic properties"
    ],
    correctAnswer: 0,
    explanation: "Hydraulic diameter (Dh = 4A/P where A is area and P is perimeter) converts rectangular duct dimensions to an equivalent circular diameter for pressure drop calculations. This allows the use of circular duct friction charts for rectangular ducts."
  },
  {
    id: 4,
    question: "According to DW/144, what is the maximum allowable air leakage rate for Class C ductwork at 400 Pa test pressure?",
    options: [
      "0.009 × p^0.65 (L/s per m²)",
      "0.027 × p^0.65 (L/s per m²)",
      "0.081 × p^0.65 (L/s per m²)",
      "0.243 × p^0.65 (L/s per m²)"
    ],
    correctAnswer: 1,
    explanation: "Class C ductwork allows maximum leakage of 0.027 × p^0.65 L/s per m² of duct surface area, where p is the test pressure in Pa. At 400 Pa, this equates to approximately 1.32 L/s per m² of duct surface."
  },
  {
    id: 5,
    question: "What material thickness is typically specified for galvanised steel rectangular ductwork up to 450mm in the longest dimension?",
    options: ["0.5mm", "0.7mm", "0.8mm", "1.0mm"],
    correctAnswer: 1,
    explanation: "DW/144 specifies 0.7mm galvanised steel for rectangular ducts up to 450mm. Larger ducts require thicker material: 0.8mm up to 750mm, 1.0mm up to 1000mm, and 1.2mm for larger sizes to maintain structural integrity."
  },
  {
    id: 6,
    question: "What is the purpose of a smoke damper in HVAC ductwork systems?",
    options: [
      "To reduce noise transmission through ducts",
      "To prevent spread of smoke between fire compartments during fire conditions",
      "To control airflow volume to different zones",
      "To filter particulates from the air"
    ],
    correctAnswer: 1,
    explanation: "Smoke dampers prevent the spread of smoke through ductwork between fire compartments. They are activated by smoke detectors and close to maintain tenable conditions in escape routes. Combined fire/smoke dampers provide both fire integrity and smoke control."
  },
  {
    id: 7,
    question: "What is the relationship between duct velocity and noise generation?",
    options: [
      "Noise is proportional to velocity",
      "Noise is proportional to velocity squared",
      "Noise is proportional to velocity to the power of 5-6",
      "There is no relationship between velocity and noise"
    ],
    correctAnswer: 2,
    explanation: "Aerodynamic noise generation in ductwork is proportional to velocity raised to the power of 5-6. This means doubling the velocity can increase noise by 15-18 dB. This is why velocity limits are critical in noise-sensitive applications."
  },
  {
    id: 8,
    question: "What type of acoustic attenuator is most commonly used in HVAC ductwork?",
    options: [
      "Active noise cancellation units",
      "Lined duct sections (splitter attenuators)",
      "Resonance chambers",
      "Mass-loaded vinyl wraps"
    ],
    correctAnswer: 1,
    explanation: "Splitter attenuators (lined duct sections with acoustic absorbent material) are the most common type used in HVAC systems. They absorb sound energy as air passes through, typically providing 10-25 dB attenuation depending on length and design."
  },
  {
    id: 9,
    question: "What is the aspect ratio limit typically recommended for rectangular ductwork to maintain efficient airflow?",
    options: ["2:1", "4:1", "6:1", "8:1"],
    correctAnswer: 1,
    explanation: "Aspect ratios (width:height) should not exceed 4:1 for efficient airflow. Higher aspect ratios increase friction losses, make balancing difficult, and increase material usage. Where space permits, aspect ratios of 2:1 or lower are preferred."
  },
  {
    id: 10,
    question: "At what pressure classification does ductwork transition from low-pressure to medium-pressure according to DW/144?",
    options: ["250 Pa", "500 Pa", "1000 Pa", "1500 Pa"],
    correctAnswer: 1,
    explanation: "DW/144 classifies ductwork as low-pressure up to 500 Pa, medium-pressure from 500-1000 Pa, and high-pressure above 1000 Pa. Higher pressure classifications require tighter construction standards, better sealing, and more robust supports."
  },
  {
    id: 11,
    question: "What is the primary purpose of flexible duct connections at air handling units?",
    options: [
      "To reduce installation cost",
      "To isolate vibration and prevent transmission through ductwork",
      "To allow for thermal expansion only",
      "To improve airflow distribution"
    ],
    correctAnswer: 1,
    explanation: "Flexible connections (anti-vibration connectors) isolate mechanical vibration from fans and motors, preventing transmission through the rigid ductwork system. This reduces structure-borne noise and protects duct joints from fatigue failure."
  },
  {
    id: 12,
    question: "When designing ductwork, what minimum distance from a bend should flow measurement stations be located?",
    options: [
      "1 duct diameter",
      "2-3 duct diameters",
      "5-10 duct diameters",
      "No minimum distance required"
    ],
    correctAnswer: 2,
    explanation: "Flow measurement stations should be located 5-10 duct diameters downstream and 2-3 diameters upstream of disturbances (bends, dampers, branches) to ensure uniform velocity profiles and accurate measurements."
  },
  {
    id: 13,
    question: "What is the function of turning vanes in ductwork?",
    options: [
      "To increase airflow velocity",
      "To reduce pressure drop and improve airflow through bends",
      "To filter the air",
      "To create turbulence for better mixing"
    ],
    correctAnswer: 1,
    explanation: "Turning vanes guide airflow through bends, reducing turbulence and pressure drop. They can reduce bend pressure loss coefficients from 1.0-1.5 (without vanes) to 0.15-0.25 (with vanes), significantly improving system efficiency."
  },
  {
    id: 14,
    question: "What test is performed to verify ductwork airtightness per DW/143?",
    options: [
      "Smoke pencil test only",
      "Pressure decay or flow rate measurement test",
      "Visual inspection only",
      "Acoustic testing"
    ],
    correctAnswer: 1,
    explanation: "DW/143 specifies pressure testing methods: either measuring pressure decay over time or measuring the airflow required to maintain test pressure. Both methods quantify leakage rate against the specified class limits."
  }
];

const faqs = [
  {
    question: "What is the difference between equal friction and velocity reduction sizing methods?",
    answer: "The equal friction method maintains constant pressure drop per metre throughout the system (typically 1 Pa/m), resulting in varying velocities as duct sizes reduce. The velocity reduction method starts with high velocity at the fan and deliberately reduces it in steps along the duct run. Equal friction is simpler to design and balance, while velocity reduction can achieve lower noise levels at terminals but requires more careful balancing. Most commercial systems use equal friction for its simplicity and reliable balancing characteristics."
  },
  {
    question: "Why are circular ducts more efficient than rectangular ducts?",
    answer: "Circular ducts have the lowest perimeter-to-area ratio of any shape, meaning less frictional surface for a given airflow capacity. A circular duct has approximately 12% less surface area than an equivalent rectangular duct with 2:1 aspect ratio, resulting in lower pressure drop and fan energy. Circular ducts also provide more uniform velocity distribution, better structural strength, and easier cleaning. However, rectangular ducts may be preferred where ceiling void depth is limited or where multiple ducts must fit in constrained spaces."
  },
  {
    question: "What is the DW/144 specification and why is it important?",
    answer: "DW/144 is the HVCA (now BESA) Specification for Sheet Metal Ductwork, setting standards for ductwork construction in the UK. It defines material thicknesses, joint types, support spacing, and critically, air leakage classifications (A, B, C, D). Specifying DW/144 ensures ductwork is constructed to recognised standards, with appropriate leakage limits for the system pressure class. Class C is standard for low-pressure commercial systems, while Classes A and B are required for higher pressure or energy-critical applications."
  },
  {
    question: "How do fire dampers and smoke dampers differ in operation?",
    answer: "Fire dampers are primarily structural fire barriers that close when exposed to heat (typically via a fusible link at 72 degrees C) to maintain fire compartmentation. Smoke dampers are controlled devices activated by smoke detectors or fire alarm signals to prevent smoke spread before temperatures rise significantly. Combined fire/smoke dampers (classified ES) provide both functions. Fire dampers are mandatory where ducts penetrate fire-rated walls or floors; smoke dampers are specified based on smoke control strategy, typically in escape routes and smoke control zones."
  },
  {
    question: "What factors affect acoustic performance in ductwork systems?",
    answer: "Key factors include: air velocity (noise increases with v^5-6), duct type (lined ducts attenuate noise naturally), fittings (grilles, dampers, bends generate noise), and breakout (sound radiating through duct walls). Design for low noise by limiting velocities (3-5 m/s at terminals), using acoustic attenuators after fans, selecting low-noise grilles, and specifying adequate duct wall mass or acoustic lagging where ductwork passes through noise-sensitive areas. Terminal unit selection is often the critical factor in occupied spaces."
  },
  {
    question: "How is ductwork leakage tested and why does it matter?",
    answer: "Leakage testing per DW/143 involves pressurising duct sections and measuring either pressure decay or the airflow needed to maintain test pressure. Leakage matters because it represents wasted fan energy, reduced system capacity, and potential comfort issues. A system with 10% leakage may require 20-30% more fan power. Modern buildings increasingly specify Class A or B tightness for energy compliance. Testing should occur before insulation to allow remedial sealing, with test sections typically limited to 100-200m² of duct surface area."
  }
];

const HNCModule8Section2_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section2">
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
            <Wind className="h-4 w-4" />
            <span>Module 8.2.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Ductwork Design
          </h1>
          <p className="text-white/80">
            Sizing methods, pressure drop calculations, materials specification, acoustic treatment, and fire protection for HVAC ductwork
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Equal friction:</strong> Constant Pa/m pressure drop throughout</li>
              <li className="pl-1"><strong>Velocity reduction:</strong> Stepped velocity decrease from fan</li>
              <li className="pl-1"><strong>DW/144:</strong> UK ductwork construction specification</li>
              <li className="pl-1"><strong>Leakage classes:</strong> A (tightest) to D (most leakage)</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Standards</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>DW/144:</strong> Sheet metal ductwork specification</li>
              <li className="pl-1"><strong>DW/143:</strong> Ductwork leakage testing guide</li>
              <li className="pl-1"><strong>BS EN 1366-2:</strong> Fire damper testing</li>
              <li className="pl-1"><strong>BS EN 13779:</strong> Ventilation design guidance</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply equal friction and velocity reduction sizing methods",
              "Calculate pressure drop through duct systems and fittings",
              "Specify ductwork materials and construction to DW/144",
              "Compare rectangular and circular duct characteristics",
              "Select and position fire dampers and smoke dampers",
              "Design acoustic attenuation and conduct leakage testing"
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

        {/* Section 1: Duct Sizing Methods */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Duct Sizing Methods
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Duct sizing determines the cross-sectional area required to convey the design airflow at acceptable
              velocity and pressure drop. Two principal methods are used in UK practice: equal friction and
              velocity reduction, each with distinct advantages for different applications.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">The Equal Friction Method</p>
              <p className="text-sm text-white/90 mb-2">
                This method maintains constant pressure drop per unit length throughout the duct system,
                typically 1.0 Pa/m for low-velocity comfort systems or up to 2.0 Pa/m where space is limited.
              </p>
              <ul className="text-sm space-y-1 text-white/80">
                <li>- Duct velocity varies naturally as airflow reduces at each branch</li>
                <li>- Simplified balancing as path pressure drops are proportional to length</li>
                <li>- Self-balancing tendency in well-designed systems</li>
                <li>- Most common method for commercial HVAC systems</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <p className="text-sm font-medium text-green-400 mb-2">The Velocity Reduction Method</p>
              <p className="text-sm text-white/90 mb-2">
                Starting with higher velocity at the fan (6-8 m/s), velocity is progressively reduced
                in steps along the duct run to achieve lower velocities (3-4 m/s) at terminal outlets.
              </p>
              <ul className="text-sm space-y-1 text-white/80">
                <li>- Controls noise generation which increases with v^5-6</li>
                <li>- Larger ducts near fan where noise is less critical</li>
                <li>- Smaller, quieter ducts in occupied spaces</li>
                <li>- Requires careful balancing with dampers at each branch</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Recommended Duct Velocities</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Main Duct (m/s)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Branch Duct (m/s)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Terminal (m/s)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Residential/quiet office</td>
                      <td className="border border-white/10 px-3 py-2">4-6</td>
                      <td className="border border-white/10 px-3 py-2">3-4</td>
                      <td className="border border-white/10 px-3 py-2">2-3</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">General commercial</td>
                      <td className="border border-white/10 px-3 py-2">6-9</td>
                      <td className="border border-white/10 px-3 py-2">4-6</td>
                      <td className="border border-white/10 px-3 py-2">3-4</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Industrial/plant rooms</td>
                      <td className="border border-white/10 px-3 py-2">8-12</td>
                      <td className="border border-white/10 px-3 py-2">6-9</td>
                      <td className="border border-white/10 px-3 py-2">5-8</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Hospital/theatre</td>
                      <td className="border border-white/10 px-3 py-2">4-5</td>
                      <td className="border border-white/10 px-3 py-2">3-4</td>
                      <td className="border border-white/10 px-3 py-2">2-3</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Kitchen extract</td>
                      <td className="border border-white/10 px-3 py-2">10-15</td>
                      <td className="border border-white/10 px-3 py-2">8-10</td>
                      <td className="border border-white/10 px-3 py-2">6-8</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Pressure Drop Calculation</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Straight Duct Sections</p>
                  <p className="text-sm text-white/80 font-mono mb-2">ΔP = f × (L/D) × (ρv²/2)</p>
                  <ul className="text-xs text-white/70 space-y-1">
                    <li>f = friction factor (0.02-0.03 typical)</li>
                    <li>L = duct length (m)</li>
                    <li>D = hydraulic diameter (m)</li>
                    <li>ρ = air density (1.2 kg/m³)</li>
                    <li>v = velocity (m/s)</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Fittings and Components</p>
                  <p className="text-sm text-white/80 font-mono mb-2">ΔP = K × (ρv²/2)</p>
                  <ul className="text-xs text-white/70 space-y-1">
                    <li>K = loss coefficient (from tables)</li>
                    <li>90° bend (no vanes): K = 1.0-1.5</li>
                    <li>90° bend (with vanes): K = 0.15-0.25</li>
                    <li>Branch tee: K = 0.5-1.5</li>
                    <li>Damper (fully open): K = 0.1-0.3</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design tip:</strong> For hydraulic diameter of rectangular ducts, use D<sub>h</sub> = 4A/P where A = cross-sectional area and P = perimeter. This allows use of circular duct friction charts.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Ductwork Materials and Construction */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Ductwork Materials and Construction
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The DW/144 specification (BESA/HVCA) defines construction standards for sheet metal ductwork
              in the UK. Material selection depends on the application, with galvanised steel being the
              default for most commercial systems, whilst aluminium or stainless steel serve specialist needs.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Material Selection Guide</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Material</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Applications</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Advantages</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Galvanised steel</td>
                      <td className="border border-white/10 px-3 py-2">Standard commercial HVAC</td>
                      <td className="border border-white/10 px-3 py-2">Cost-effective, good corrosion resistance</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Stainless steel</td>
                      <td className="border border-white/10 px-3 py-2">Kitchen extract, pharmaceutical, corrosive atmospheres</td>
                      <td className="border border-white/10 px-3 py-2">Excellent corrosion resistance, cleanable</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Aluminium</td>
                      <td className="border border-white/10 px-3 py-2">Lightweight applications, external exposed</td>
                      <td className="border border-white/10 px-3 py-2">Lightweight (1/3 weight of steel), non-magnetic</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Phenolic/PIR board</td>
                      <td className="border border-white/10 px-3 py-2">Low-velocity supply, acoustic applications</td>
                      <td className="border border-white/10 px-3 py-2">Pre-insulated, low thermal bridging, quiet</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Flexible duct</td>
                      <td className="border border-white/10 px-3 py-2">Final connections, short runs only</td>
                      <td className="border border-white/10 px-3 py-2">Easy installation, absorbs vibration</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">DW/144 Material Thickness Requirements (Galvanised Steel)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Longest Dimension (mm)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Rectangular Duct</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Circular Duct</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Up to 300</td>
                      <td className="border border-white/10 px-3 py-2">0.5mm</td>
                      <td className="border border-white/10 px-3 py-2">0.5mm</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">301 - 450</td>
                      <td className="border border-white/10 px-3 py-2">0.7mm</td>
                      <td className="border border-white/10 px-3 py-2">0.5mm</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">451 - 750</td>
                      <td className="border border-white/10 px-3 py-2">0.8mm</td>
                      <td className="border border-white/10 px-3 py-2">0.6mm</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">751 - 1000</td>
                      <td className="border border-white/10 px-3 py-2">1.0mm</td>
                      <td className="border border-white/10 px-3 py-2">0.8mm</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1001 - 1500</td>
                      <td className="border border-white/10 px-3 py-2">1.2mm</td>
                      <td className="border border-white/10 px-3 py-2">1.0mm</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">&gt;1500</td>
                      <td className="border border-white/10 px-3 py-2">1.2mm + stiffeners</td>
                      <td className="border border-white/10 px-3 py-2">1.0mm + stiffeners</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Rectangular Duct Advantages</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Lower profile for restricted ceiling voids</li>
                  <li className="pl-1">Easier to fit multiple runs in parallel</li>
                  <li className="pl-1">Simpler branch connections</li>
                  <li className="pl-1">Flat surfaces easier to insulate</li>
                  <li className="pl-1">Better for acoustic lining installation</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Circular Duct Advantages</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Lower pressure drop (12-15% less friction)</li>
                  <li className="pl-1">More uniform velocity distribution</li>
                  <li className="pl-1">Better structural strength per material weight</li>
                  <li className="pl-1">Spiral wound construction is airtight</li>
                  <li className="pl-1">Easier to clean internally</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <p className="text-sm font-medium text-amber-400 mb-2">Aspect Ratio Considerations</p>
              <p className="text-sm text-white/90">
                For rectangular ducts, the aspect ratio (width ÷ height) should not exceed 4:1. Higher aspect
                ratios result in increased friction losses, uneven velocity distribution, and higher material
                usage. Where possible, aim for aspect ratios of 2:1 or less for optimal performance.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Specification note:</strong> Always specify DW/144 compliance in ductwork specifications to ensure construction quality. Include pressure class (low/medium/high) and leakage class (A/B/C/D) requirements.
            </p>
          </div>
        </section>

        {/* Section 3: Fire and Smoke Dampers */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Fire and Smoke Dampers
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Where ductwork penetrates fire-rated construction, fire dampers maintain the integrity of fire
              compartmentation. Smoke dampers prevent smoke spread through ductwork during the critical early
              stages of a fire when temperatures may not yet trigger fire dampers.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fire Damper Classifications (BS EN 15650)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Classification</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">E60</td>
                      <td className="border border-white/10 px-3 py-2">60 minutes integrity</td>
                      <td className="border border-white/10 px-3 py-2">Standard commercial - 60 min compartments</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">E90</td>
                      <td className="border border-white/10 px-3 py-2">90 minutes integrity</td>
                      <td className="border border-white/10 px-3 py-2">Enhanced protection - sleeping risk areas</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">E120</td>
                      <td className="border border-white/10 px-3 py-2">120 minutes integrity</td>
                      <td className="border border-white/10 px-3 py-2">High-risk areas, extended evacuation time</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">ES60/ES120</td>
                      <td className="border border-white/10 px-3 py-2">Integrity + smoke leakage control</td>
                      <td className="border border-white/10 px-3 py-2">Combined fire/smoke damper applications</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                <p className="text-sm font-medium text-red-400 mb-2">Fire Dampers</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Trigger:</strong> Fusible link (72°C) or motor operated</li>
                  <li className="pl-1"><strong>Function:</strong> Maintain fire compartment integrity</li>
                  <li className="pl-1"><strong>Required:</strong> At all fire-rated wall/floor penetrations</li>
                  <li className="pl-1"><strong>Testing:</strong> BS EN 1366-2 for fire resistance</li>
                  <li className="pl-1"><strong>Reset:</strong> Manual or automatic after inspection</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
                <p className="text-sm font-medium text-purple-400 mb-2">Smoke Dampers</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Trigger:</strong> Fire alarm signal or smoke detector</li>
                  <li className="pl-1"><strong>Function:</strong> Prevent smoke spread via ductwork</li>
                  <li className="pl-1"><strong>Required:</strong> Smoke control zones, escape routes</li>
                  <li className="pl-1"><strong>Testing:</strong> BS EN 1751 for air leakage classification</li>
                  <li className="pl-1"><strong>Operation:</strong> Motor-operated, fail-safe design</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fire Damper Installation Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Location:</strong> Within 150mm of the fire-rated element face</li>
                <li className="pl-1"><strong>Access:</strong> Minimum 300mm clear space for inspection and maintenance</li>
                <li className="pl-1"><strong>Sleeve:</strong> May be required to extend through fire barrier thickness</li>
                <li className="pl-1"><strong>Fire stopping:</strong> Gap between damper and construction sealed with fire-rated material</li>
                <li className="pl-1"><strong>Fusible link:</strong> Must be in airstream and visible through access panel</li>
                <li className="pl-1"><strong>Testing:</strong> Annual inspection and functional test required</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Smoke Damper Leakage Classes (BS EN 1751)</p>
              <div className="grid grid-cols-4 gap-2 text-center text-sm">
                <div className="p-2 rounded bg-white/5">
                  <p className="font-bold text-white mb-1">Class 0</p>
                  <p className="text-white/70 text-xs">No requirement</p>
                </div>
                <div className="p-2 rounded bg-white/5">
                  <p className="font-bold text-white mb-1">Class 1</p>
                  <p className="text-white/70 text-xs">Standard leakage</p>
                </div>
                <div className="p-2 rounded bg-white/5">
                  <p className="font-bold text-white mb-1">Class 2</p>
                  <p className="text-white/70 text-xs">Low leakage</p>
                </div>
                <div className="p-2 rounded bg-white/5">
                  <p className="font-bold text-green-400 mb-1">Class 3</p>
                  <p className="text-white/70 text-xs">Very low leakage</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Critical:</strong> Fire dampers must be installed strictly per manufacturer's instructions. Incorrect installation invalidates fire certification and may not function correctly in a fire.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Acoustic Attenuation and Leakage Testing */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Acoustic Attenuation and Leakage Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Acoustic treatment controls noise transmission through ductwork, whilst leakage testing verifies
              ductwork integrity. Both are essential for energy-efficient, comfortable building environments
              and must be considered during the design stage.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Sources of Ductwork Noise</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Noise Source</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Cause</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Mitigation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fan noise</td>
                      <td className="border border-white/10 px-3 py-2">Mechanical and aerodynamic sources</td>
                      <td className="border border-white/10 px-3 py-2">Attenuators, anti-vibration mounts</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Airflow noise</td>
                      <td className="border border-white/10 px-3 py-2">Turbulence at fittings (∝ v^5-6)</td>
                      <td className="border border-white/10 px-3 py-2">Reduce velocity, turning vanes</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Terminal noise</td>
                      <td className="border border-white/10 px-3 py-2">Diffuser/grille regenerated noise</td>
                      <td className="border border-white/10 px-3 py-2">Select low-noise terminals, reduce velocity</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Breakout noise</td>
                      <td className="border border-white/10 px-3 py-2">Sound radiating through duct walls</td>
                      <td className="border border-white/10 px-3 py-2">Acoustic lagging, heavier duct material</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Crosstalk</td>
                      <td className="border border-white/10 px-3 py-2">Sound transfer between rooms via ducts</td>
                      <td className="border border-white/10 px-3 py-2">Lined duct, acoustic crosstalk attenuators</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Splitter Attenuators</p>
              <p className="text-sm text-white/90 mb-2">
                The most common acoustic attenuator type uses parallel splitters of sound-absorbing material
                (typically glass fibre or mineral wool) to absorb sound energy as air passes through.
              </p>
              <ul className="text-sm space-y-1 text-white/80">
                <li>- Attenuation: 10-25 dB depending on length and splitter spacing</li>
                <li>- Typical length: 900-1800mm for significant attenuation</li>
                <li>- Splitter spacing: 100-200mm airways between splitters</li>
                <li>- Pressure drop: 20-80 Pa depending on velocity and design</li>
                <li>- Facing: Perforated metal or woven fabric to protect absorber</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">DW/144 Ductwork Leakage Classes</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Class</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Leakage Limit</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium text-green-400">Class A</td>
                      <td className="border border-white/10 px-3 py-2">0.009 × p^0.65 L/s per m²</td>
                      <td className="border border-white/10 px-3 py-2">High-pressure, energy-critical, cleanrooms</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium text-blue-400">Class B</td>
                      <td className="border border-white/10 px-3 py-2">0.027 × p^0.65 L/s per m²</td>
                      <td className="border border-white/10 px-3 py-2">Medium-pressure, enhanced commercial</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium text-yellow-400">Class C</td>
                      <td className="border border-white/10 px-3 py-2">0.081 × p^0.65 L/s per m²</td>
                      <td className="border border-white/10 px-3 py-2">Standard low-pressure commercial</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium text-red-400">Class D</td>
                      <td className="border border-white/10 px-3 py-2">0.243 × p^0.65 L/s per m²</td>
                      <td className="border border-white/10 px-3 py-2">Where leakage is acceptable (rare)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-white/60 mt-2">
                Note: p = test pressure in Pa. For Class C at 400 Pa: 0.081 × 400^0.65 = 4.0 L/s per m² duct surface
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Leakage Testing Procedure (DW/143)</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Pressure Decay Method</p>
                  <ul className="text-xs text-white/80 space-y-1">
                    <li>1. Seal all openings in test section</li>
                    <li>2. Pressurise to 110% of test pressure</li>
                    <li>3. Allow to stabilise for 2 minutes</li>
                    <li>4. Record pressure drop over 5 minutes</li>
                    <li>5. Calculate leakage rate from decay curve</li>
                    <li>6. Compare against class limit</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Constant Pressure Method</p>
                  <ul className="text-xs text-white/80 space-y-1">
                    <li>1. Seal all openings in test section</li>
                    <li>2. Connect calibrated flow meter to test rig</li>
                    <li>3. Pressurise to test pressure</li>
                    <li>4. Measure airflow to maintain pressure</li>
                    <li>5. Record flow rate (= leakage rate)</li>
                    <li>6. Divide by duct surface area, compare to limit</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <p className="text-sm font-medium text-amber-400 mb-2">Energy Impact of Ductwork Leakage</p>
              <p className="text-sm text-white/90">
                A system with 10% duct leakage requires approximately 20-30% more fan power to deliver the same
                airflow to terminals. Modern energy regulations increasingly require Class A or B tightness.
                Testing before insulation allows remedial sealing - test sections typically limited to 100-200m²
                of duct surface area for practical reasons.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Specify leakage testing in all ductwork contracts and witness testing on site. Remedial sealing after insulation is significantly more costly and may not achieve the required class.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Duct Sizing by Equal Friction</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Size a supply duct for 500 L/s (0.5 m³/s) using the equal friction method at 1 Pa/m.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">From CIBSE duct sizing chart at 1 Pa/m and 0.5 m³/s:</p>
                <p className="mt-2">Circular duct: Diameter = 350mm</p>
                <p>Velocity = 5.2 m/s</p>
                <p className="mt-2">Equivalent rectangular (4:1 max aspect):</p>
                <p className="ml-4">Area required = π × 0.175² = 0.096 m²</p>
                <p className="ml-4">Option 1: 400mm × 250mm (0.100 m², 2:1 aspect)</p>
                <p className="ml-4">Option 2: 500mm × 200mm (0.100 m², 2.5:1 aspect)</p>
                <p className="mt-2 text-green-400">Selected: 400mm × 250mm rectangular</p>
                <p className="text-white/60">(Better aspect ratio, similar space requirement)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Pressure Drop Through Fitting</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Calculate pressure drop through a 90° bend (no vanes) at 6 m/s velocity.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Using: ΔP = K × (ρv²/2)</p>
                <p className="mt-2">K factor for 90° bend (no vanes) = 1.2</p>
                <p>Air density ρ = 1.2 kg/m³</p>
                <p>Velocity v = 6 m/s</p>
                <p className="mt-2">ΔP = 1.2 × (1.2 × 6²/2)</p>
                <p>ΔP = 1.2 × (1.2 × 36/2)</p>
                <p>ΔP = 1.2 × 21.6</p>
                <p className="mt-2 text-green-400">ΔP = 25.9 Pa</p>
                <p className="mt-2 text-white/60">With turning vanes (K = 0.2):</p>
                <p>ΔP = 0.2 × 21.6 = <span className="text-green-400">4.3 Pa</span></p>
                <p className="text-white/60">Saving = 21.6 Pa per bend</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Ductwork Leakage Assessment</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Verify Class C compliance for a duct section with 150 m² surface area tested at 400 Pa.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Class C leakage limit formula:</p>
                <p>q = 0.081 × p^0.65 L/s per m²</p>
                <p className="mt-2">At test pressure p = 400 Pa:</p>
                <p>q = 0.081 × 400^0.65</p>
                <p>q = 0.081 × 49.2</p>
                <p>q = 3.98 L/s per m² of duct surface</p>
                <p className="mt-2">For 150 m² duct surface:</p>
                <p>Maximum allowable leakage = 3.98 × 150 = 597 L/s</p>
                <p className="mt-2 text-white/60">Test result: Measured 420 L/s to maintain 400 Pa</p>
                <p className="mt-2 text-green-400">✓ PASS - 420 L/s &lt; 597 L/s limit</p>
                <p className="text-white/60">Actual class achieved: 420/150 = 2.8 L/s per m²</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Ductwork Design Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Calculate airflow requirements for each zone and terminal</li>
                <li className="pl-1">Select sizing method (equal friction or velocity reduction)</li>
                <li className="pl-1">Size ducts maintaining velocity limits for application</li>
                <li className="pl-1">Calculate total system pressure drop including fittings</li>
                <li className="pl-1">Specify material and DW/144 pressure/leakage class</li>
                <li className="pl-1">Locate fire dampers at all fire-rated penetrations</li>
                <li className="pl-1">Include acoustic attenuators where noise criteria apply</li>
                <li className="pl-1">Specify leakage testing requirements in specification</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Equal friction design: <strong>1 Pa/m</strong> typical for comfort systems</li>
                <li className="pl-1">Maximum aspect ratio: <strong>4:1</strong> (preferably 2:1)</li>
                <li className="pl-1">Noise increases with velocity: <strong>v^5 to v^6</strong></li>
                <li className="pl-1">Fire damper position: within <strong>150mm</strong> of fire barrier</li>
                <li className="pl-1">Standard commercial leakage class: <strong>Class C</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Excessive flexible duct</strong> - high pressure drop, noise source, difficult to clean</li>
                <li className="pl-1"><strong>Ignoring fitting losses</strong> - often 50%+ of total system pressure drop</li>
                <li className="pl-1"><strong>Poor aspect ratios</strong> - flat ducts increase friction and make balancing difficult</li>
                <li className="pl-1"><strong>Missing access panels</strong> - fire dampers and attenuators need inspection access</li>
                <li className="pl-1"><strong>Late leakage testing</strong> - test before insulation to allow economical remedial work</li>
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
                <p className="font-medium text-white mb-1">Duct Sizing Methods</p>
                <ul className="space-y-0.5">
                  <li>Equal friction: Constant Pa/m throughout</li>
                  <li>Velocity reduction: Stepped velocity decrease</li>
                  <li>Design pressure drop: 1 Pa/m typical</li>
                  <li>Aspect ratio limit: 4:1 maximum</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">DW/144 Leakage Classes</p>
                <ul className="space-y-0.5">
                  <li>Class A: Tightest - high-pressure, cleanrooms</li>
                  <li>Class B: Enhanced commercial</li>
                  <li>Class C: Standard commercial (typical)</li>
                  <li>Class D: Where leakage acceptable</li>
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
            <Link to="../h-n-c-module8-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section2-6">
              Next: System Balancing
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule8Section2_5;
