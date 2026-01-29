import { ArrowLeft, Fan, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Fan Selection - HNC Module 8 Section 2.3";
const DESCRIPTION = "Master fan selection for HVAC systems: centrifugal and axial fan types, fan characteristics, system curves, duty point selection, fan laws, SFP requirements, ErP regulations, EC motors, and fan efficiency grades (FEG).";

const quickCheckQuestions = [
  {
    id: "fan-type-selection",
    question: "Which fan type is most suitable for high-pressure ductwork systems with significant resistance?",
    options: ["Axial fan", "Centrifugal fan", "Propeller fan", "Cross-flow fan"],
    correctIndex: 1,
    explanation: "Centrifugal fans are best suited for high-pressure systems due to their ability to generate higher static pressures. The curved blades accelerate air outward, creating the pressure needed to overcome significant ductwork resistance. Axial fans are better for high-volume, low-pressure applications."
  },
  {
    id: "fan-law-speed",
    question: "According to the fan laws, if fan speed is doubled, what happens to the power consumption?",
    options: ["It doubles (2x)", "It quadruples (4x)", "It increases eightfold (8x)", "It remains the same"],
    correctIndex: 2,
    explanation: "The third fan law states that power varies with the cube of the speed ratio (P2 = P1 × (n2/n1)³). Doubling the speed means power increases by 2³ = 8 times. This is why even small speed reductions via VSDs achieve significant energy savings."
  },
  {
    id: "duty-point",
    question: "The duty point on a fan performance curve represents:",
    options: ["Maximum possible airflow", "The point of lowest efficiency", "The intersection of fan and system curves", "The stall region boundary"],
    correctIndex: 2,
    explanation: "The duty point is where the fan characteristic curve intersects the system resistance curve. At this point, the fan delivers the required airflow at the corresponding pressure. Selecting a fan with the duty point near peak efficiency ensures optimal performance."
  },
  {
    id: "sfp-limit",
    question: "What is the maximum Specific Fan Power (SFP) typically permitted for central mechanical ventilation systems under Building Regulations?",
    options: ["0.5 W/(l/s)", "1.0 W/(l/s)", "1.6 W/(l/s)", "2.5 W/(l/s)"],
    correctIndex: 2,
    explanation: "Building Regulations Part L and associated guidance typically limit SFP to 1.6 W/(l/s) for central mechanical ventilation with heating and cooling. Lower values apply to simpler systems. Meeting SFP targets requires careful fan selection and efficient system design."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which blade configuration on a centrifugal fan provides the highest efficiency for clean air applications?",
    options: [
      "Forward-curved blades",
      "Backward-curved or backward-inclined blades",
      "Radial blades",
      "Paddle blades"
    ],
    correctAnswer: 1,
    explanation: "Backward-curved and backward-inclined blades offer the highest efficiency (up to 85%) for clean air applications. Forward-curved blades are less efficient but more compact. Radial blades are better suited for dirty or particulate-laden air."
  },
  {
    id: 2,
    question: "According to the fan laws, if fan speed is reduced by 50%, the volume flow rate will:",
    options: [
      "Reduce by 25%",
      "Reduce by 50%",
      "Reduce by 75%",
      "Reduce by 87.5%"
    ],
    correctAnswer: 1,
    explanation: "The first fan law states that volume flow rate varies directly with speed (Q2 = Q1 × n2/n1). A 50% speed reduction means flow reduces to 50% of original. This linear relationship is the basis for variable speed fan control strategies."
  },
  {
    id: 3,
    question: "What does the term 'stall' mean in relation to axial fans?",
    options: [
      "The fan has reached maximum speed",
      "Airflow separation from the blades causing unstable operation",
      "The motor has overheated",
      "The fan bearings have failed"
    ],
    correctAnswer: 1,
    explanation: "Stall occurs when airflow separates from the fan blades due to operating at excessively high pressures. This causes turbulence, noise, vibration, and reduced performance. Axial fans are particularly susceptible and must not operate in the stall region."
  },
  {
    id: 4,
    question: "The system resistance curve on a pressure-volume graph follows which relationship?",
    options: [
      "Linear - pressure proportional to flow",
      "Parabolic - pressure proportional to flow squared",
      "Exponential - pressure increases exponentially with flow",
      "Constant - pressure independent of flow"
    ],
    correctAnswer: 1,
    explanation: "System resistance follows the square law: ΔP = kQ². As airflow doubles, the pressure drop quadruples. This parabolic relationship is fundamental to understanding how fans interact with ductwork systems and why the duty point exists."
  },
  {
    id: 5,
    question: "What is the primary advantage of EC (electronically commutated) motors over AC induction motors for fans?",
    options: [
      "Lower initial purchase cost",
      "Higher efficiency across the speed range, especially at part load",
      "Simpler installation without additional controls",
      "No requirement for protective devices"
    ],
    correctAnswer: 1,
    explanation: "EC motors maintain high efficiency (typically 80-90%) across their speed range, unlike AC motors which lose efficiency significantly at reduced speeds. This makes EC motors ideal for variable speed fan applications, offering substantial energy savings."
  },
  {
    id: 6,
    question: "Under ErP (Energy-related Products) Lot 6, which component efficiency is regulated for fans?",
    options: [
      "Impeller efficiency only",
      "Motor efficiency only",
      "Complete fan unit efficiency including motor",
      "Ductwork system efficiency"
    ],
    correctAnswer: 2,
    explanation: "ErP Lot 6 regulates the efficiency of complete fan units, expressed as Fan Efficiency Grade (FEG). This holistic approach ensures manufacturers optimise the entire assembly rather than individual components, leading to better real-world performance."
  },
  {
    id: 7,
    question: "A fan with a steep characteristic curve is better suited for:",
    options: [
      "Systems with varying resistance (damper control)",
      "Systems with constant resistance",
      "Systems requiring maximum flow at all times",
      "Open discharge applications"
    ],
    correctAnswer: 0,
    explanation: "Fans with steep curves maintain relatively stable airflow despite changes in system resistance. This makes them ideal for systems with variable resistance such as damper-controlled VAV systems, where flow stability is important despite pressure changes."
  },
  {
    id: 8,
    question: "What is the minimum Fan Efficiency Grade (FEG) typically required under current ErP regulations?",
    options: [
      "FEG 50",
      "FEG 60",
      "FEG 67",
      "FEG 75"
    ],
    correctAnswer: 2,
    explanation: "ErP regulations typically mandate minimum FEG67, meaning the fan must achieve at least 67% of the efficiency of an ideal reference fan at the same duty point. Higher grades (FEG71, FEG85) indicate better performance above minimum requirements."
  },
  {
    id: 9,
    question: "When selecting a fan, operating in which region of the fan curve is most desirable?",
    options: [
      "At the peak pressure point",
      "Near the peak efficiency point",
      "At maximum flow rate",
      "In the stall region for maximum pressure"
    ],
    correctAnswer: 1,
    explanation: "Fans should be selected to operate near their peak efficiency point for optimal energy consumption and stable operation. Operating too far from this point wastes energy and may cause noise, vibration, or unstable performance."
  },
  {
    id: 10,
    question: "Specific Fan Power (SFP) is calculated as:",
    options: [
      "Motor power (W) × airflow (l/s)",
      "Motor power (W) ÷ airflow (l/s)",
      "Airflow (l/s) ÷ motor power (W)",
      "Pressure (Pa) × airflow (l/s)"
    ],
    correctAnswer: 1,
    explanation: "SFP = total fan power (W) ÷ airflow (l/s), expressed as W/(l/s). It measures the energy efficiency of the complete ventilation system including fans, drives, and controls. Lower SFP values indicate more efficient systems."
  },
  {
    id: 11,
    question: "Which statement about mixed-flow fans is correct?",
    options: [
      "They can only be used for exhaust applications",
      "They combine characteristics of axial and centrifugal fans",
      "They are less efficient than both axial and centrifugal fans",
      "They cannot be used with variable speed drives"
    ],
    correctAnswer: 1,
    explanation: "Mixed-flow fans combine axial and centrifugal design principles, providing moderate pressure capability with compact dimensions. They offer a compromise between the high flow of axial fans and the pressure generation of centrifugal fans."
  },
  {
    id: 12,
    question: "What effect does increasing air temperature have on fan performance?",
    options: [
      "No effect - fans are temperature independent",
      "Reduced mass flow rate due to lower air density",
      "Increased pressure due to thermal expansion",
      "Increased motor efficiency"
    ],
    correctAnswer: 1,
    explanation: "Higher temperatures reduce air density, which decreases the mass flow rate even though volumetric flow remains constant. Fan power consumption also reduces slightly, but the useful work (moving a certain mass of air) is diminished."
  },
  {
    id: 13,
    question: "In a twin-fan arrangement operating in parallel, what happens to the system duty point compared to single fan operation?",
    options: [
      "Pressure doubles, flow remains the same",
      "Flow approximately doubles at the same pressure",
      "Both pressure and flow double",
      "Flow increases but less than double due to system curve"
    ],
    correctAnswer: 3,
    explanation: "Parallel fans theoretically double available flow at any given pressure. However, because system resistance increases with the square of flow, the actual combined duty point delivers increased flow but significantly less than double."
  },
  {
    id: 14,
    question: "The purpose of inlet guide vanes on a centrifugal fan is to:",
    options: [
      "Increase maximum fan speed",
      "Provide pre-rotation to regulate airflow and improve part-load efficiency",
      "Reduce noise at full load",
      "Prevent motor overload during start-up"
    ],
    correctAnswer: 1,
    explanation: "Inlet guide vanes create a pre-swirl in the airflow entering the impeller, which reduces the work done by the fan and hence the power consumed. This provides efficient flow control compared to outlet dampers, especially at moderate part loads."
  }
];

const faqs = [
  {
    question: "What is the difference between static pressure and total pressure in fan selection?",
    answer: "Static pressure is the pressure exerted perpendicular to airflow direction - the pressure available to overcome ductwork resistance. Total pressure is the sum of static pressure and velocity pressure (the kinetic energy of moving air). Fan catalogues may quote either, so it's essential to clarify. For ducted systems, static pressure is typically used for selection as it represents useful pressure available to push air through the system. Total pressure includes energy that may be lost at discharge."
  },
  {
    question: "How do I size a fan for a system with unknown exact resistance?",
    answer: "When exact system resistance is unknown, estimate using established design guidelines (e.g., CIBSE Guide B) based on duct sizing criteria (typically 1 Pa/m for low-velocity systems). Add allowances for fittings using equivalent lengths or k-factors. Apply a safety margin of 10-15% on pressure. Select a fan operating in the stable region of its curve with capacity for future adjustments. Variable speed drives provide flexibility to adjust performance once the system is commissioned and actual resistance is known."
  },
  {
    question: "Why do EC motors offer better efficiency at reduced speeds compared to AC motors with VSDs?",
    answer: "EC motors are brushless DC motors with integral electronic commutation. They maintain high efficiency (80-90%) across their speed range because losses scale proportionally with load. AC induction motors suffer from magnetising losses and slip that become proportionally larger at reduced speeds. Even with VSDs, AC motor efficiency drops significantly below 50% speed. EC motors also eliminate separate VSD losses and offer precise speed control, making them ideal for fan applications requiring frequent part-load operation."
  },
  {
    question: "What happens if a fan is selected too large for the system?",
    answer: "An oversized fan operating against lower-than-designed resistance will deliver excessive airflow and consume more power than necessary. The duty point shifts along the fan curve toward higher flow and lower pressure. This causes: increased energy consumption, potential noise issues from high velocities, over-cooling or over-ventilation, and premature wear. Dampers may be throttled to compensate, wasting energy. The correct approach is accurate system design and fan selection near peak efficiency."
  },
  {
    question: "How does altitude affect fan selection?",
    answer: "At higher altitudes, air density decreases (approximately 12% per 1000m). Lower density reduces the mass flow rate for a given volumetric flow, affecting the fan's ability to move the required quantity of air by mass. Fan power consumption reduces slightly, but so does useful work. Selection must account for density corrections: standard catalogue data assumes sea level conditions (1.2 kg/m³). For significant altitudes, derate fan performance or select larger fans to maintain required mass flow rates."
  },
  {
    question: "What are the implications of the ErP regulations for fan replacement projects?",
    answer: "ErP (Ecodesign) regulations mandate minimum efficiency standards for fans. Replacement fans must meet current FEG requirements (typically FEG67 minimum), which may be stricter than when original equipment was installed. This can affect like-for-like replacements where the original fan type no longer meets regulations. Benefits include guaranteed energy savings and reduced lifecycle costs. Specifiers should verify ErP compliance early in projects and consider whether system modifications might be needed to accommodate compliant fan selections."
  }
];

const HNCModule8Section2_3 = () => {
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
            <Fan className="h-4 w-4" />
            <span>Module 8.2.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Fan Selection
          </h1>
          <p className="text-white/80">
            Fan types, characteristics, system curves, duty point selection and efficiency considerations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Centrifugal:</strong> High pressure, backward-curved for efficiency</li>
              <li className="pl-1"><strong>Axial:</strong> High volume, low pressure applications</li>
              <li className="pl-1"><strong>Fan laws:</strong> Flow ∝ speed, pressure ∝ speed², power ∝ speed³</li>
              <li className="pl-1"><strong>SFP target:</strong> ≤1.6 W/(l/s) for central mechanical systems</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Standards</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>ErP Lot 6:</strong> Fan efficiency requirements (FEG)</li>
              <li className="pl-1"><strong>Part L:</strong> Building Regulations SFP limits</li>
              <li className="pl-1"><strong>CIBSE Guide B:</strong> Fan selection methodology</li>
              <li className="pl-1"><strong>BS EN ISO 5801:</strong> Fan performance testing</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Differentiate between centrifugal, axial, and mixed-flow fan types",
              "Apply fan laws to predict performance at different speeds",
              "Interpret fan and system characteristic curves",
              "Select fans for optimal duty point and efficiency",
              "Calculate and verify Specific Fan Power (SFP) compliance",
              "Understand ErP regulations and Fan Efficiency Grades (FEG)"
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

        {/* Section 1: Fan Types and Characteristics */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Fan Types and Characteristics
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Fans are the primary air-moving devices in HVAC systems. Selecting the appropriate fan type
              depends on the required airflow, pressure, space constraints, noise requirements, and
              efficiency targets. The three main categories are centrifugal, axial, and mixed-flow fans.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Centrifugal Fans</p>
              <p className="text-sm text-white/90 mb-3">
                Centrifugal fans accelerate air radially outward from the impeller, converting velocity
                energy into pressure. They are characterised by their blade configuration:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Backward-curved/inclined:</strong> Highest efficiency (up to 85%), non-overloading characteristic, ideal for clean air HVAC applications</li>
                <li className="pl-1"><strong>Forward-curved:</strong> Compact design, lower efficiency, suitable for low-pressure applications like fan coil units</li>
                <li className="pl-1"><strong>Radial/paddle:</strong> Self-cleaning, handles particulate-laden air, used in industrial extraction</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Axial Fans</p>
              <p className="text-sm text-white/90 mb-3">
                Axial fans move air parallel to the shaft axis, providing high airflow at relatively
                low pressures. Types include:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Propeller fans:</strong> Simple design for free-air applications, wall-mounted extract</li>
                <li className="pl-1"><strong>Tube-axial:</strong> Enclosed in cylindrical housing, moderate pressure capability</li>
                <li className="pl-1"><strong>Vane-axial:</strong> Guide vanes improve pressure and efficiency, suitable for ducted systems</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Mixed-Flow Fans</p>
              <p className="text-sm text-white/90">
                Mixed-flow fans combine axial and centrifugal principles. Air enters axially and exits
                at an angle between axial and radial. They offer moderate pressure capability in a
                compact form factor, making them popular for in-line duct applications where space is limited.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fan Type Selection Guide</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Recommended Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Advantage</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Central AHU supply/extract</td>
                      <td className="border border-white/10 px-3 py-2">Centrifugal backward-curved</td>
                      <td className="border border-white/10 px-3 py-2">High efficiency, stable operation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fan coil units</td>
                      <td className="border border-white/10 px-3 py-2">Centrifugal forward-curved</td>
                      <td className="border border-white/10 px-3 py-2">Compact size</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Car park ventilation</td>
                      <td className="border border-white/10 px-3 py-2">Axial (jet fans)</td>
                      <td className="border border-white/10 px-3 py-2">High volume, impulse ventilation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">In-line duct booster</td>
                      <td className="border border-white/10 px-3 py-2">Mixed-flow</td>
                      <td className="border border-white/10 px-3 py-2">Compact, moderate pressure</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Kitchen extract</td>
                      <td className="border border-white/10 px-3 py-2">Centrifugal radial</td>
                      <td className="border border-white/10 px-3 py-2">Handles grease-laden air</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Roof extract</td>
                      <td className="border border-white/10 px-3 py-2">Axial or mixed-flow</td>
                      <td className="border border-white/10 px-3 py-2">Weather protection, direct discharge</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Selection principle:</strong> Choose centrifugal fans for high-pressure systems (&gt;500 Pa), axial fans for high-volume low-pressure applications, and mixed-flow where space is constrained.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Fan Laws and Performance Prediction */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Fan Laws and Performance Prediction
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The fan laws (also called affinity laws) describe how fan performance changes with
              speed, size, or density. These relationships are fundamental to understanding variable
              speed operation and predicting performance at conditions different from catalogue data.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-3">The Three Fan Laws (for constant fan size)</p>
              <div className="text-sm space-y-2">
                <p><strong>Law 1 - Flow:</strong> Q₂ = Q₁ × (n₂/n₁)</p>
                <p className="text-white/70 ml-4">Volume flow rate varies directly with speed</p>
                <p className="mt-2"><strong>Law 2 - Pressure:</strong> P₂ = P₁ × (n₂/n₁)²</p>
                <p className="text-white/70 ml-4">Pressure varies with the square of speed</p>
                <p className="mt-2"><strong>Law 3 - Power:</strong> W₂ = W₁ × (n₂/n₁)³</p>
                <p className="text-white/70 ml-4">Power varies with the cube of speed</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Practical Implications of Fan Laws</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Energy savings:</strong> Reducing speed by 20% reduces power by 49% (0.8³ = 0.512)</li>
                <li className="pl-1"><strong>Oversizing penalty:</strong> Running a large fan slowly is inefficient - motor and drive losses increase</li>
                <li className="pl-1"><strong>VSD benefits:</strong> Variable speed drives exploit the cube law for significant energy savings</li>
                <li className="pl-1"><strong>Noise reduction:</strong> Lower speeds typically result in reduced noise levels</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fan Laws Application Table</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Speed Ratio</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Flow Ratio</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Pressure Ratio</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Power Ratio</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">100%</td>
                      <td className="border border-white/10 px-3 py-2">100%</td>
                      <td className="border border-white/10 px-3 py-2">100%</td>
                      <td className="border border-white/10 px-3 py-2">100%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">90%</td>
                      <td className="border border-white/10 px-3 py-2">90%</td>
                      <td className="border border-white/10 px-3 py-2">81%</td>
                      <td className="border border-white/10 px-3 py-2">73%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">80%</td>
                      <td className="border border-white/10 px-3 py-2">80%</td>
                      <td className="border border-white/10 px-3 py-2">64%</td>
                      <td className="border border-white/10 px-3 py-2">51%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">70%</td>
                      <td className="border border-white/10 px-3 py-2">70%</td>
                      <td className="border border-white/10 px-3 py-2">49%</td>
                      <td className="border border-white/10 px-3 py-2">34%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">50%</td>
                      <td className="border border-white/10 px-3 py-2">50%</td>
                      <td className="border border-white/10 px-3 py-2">25%</td>
                      <td className="border border-white/10 px-3 py-2">12.5%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Density Corrections</p>
              <p className="text-sm text-white/90">
                Fan laws assume constant air density. When operating at different temperatures or
                altitudes, corrections are needed. At higher temperatures, air density decreases,
                reducing mass flow rate for a given volumetric flow. Standard conditions are typically
                20°C at sea level (density ≈ 1.2 kg/m³). For every 1000m elevation, density reduces
                by approximately 12%.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design tip:</strong> The cubic power relationship makes variable speed control extremely effective - even small speed reductions yield significant energy savings.
            </p>
          </div>
        </section>

        {/* Section 3: System Curves and Duty Point Selection */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            System Curves and Duty Point Selection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The duty point is where the fan actually operates within a system. It occurs at the
              intersection of the fan characteristic curve and the system resistance curve. Correct
              duty point selection ensures the fan delivers required performance efficiently and stably.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Understanding System Resistance</p>
              <p className="text-sm text-white/90 mb-3">
                System resistance follows the square law: ΔP = kQ², where k is the system constant
                determined by ductwork configuration, fittings, filters, coils, and terminal devices.
                On a pressure-flow graph, this creates a parabolic curve starting from the origin.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Low resistance:</strong> Short duct runs, few fittings, clean filters</li>
                <li className="pl-1"><strong>High resistance:</strong> Long duct runs, many bends, dirty filters, terminal devices</li>
                <li className="pl-1"><strong>Variable resistance:</strong> Systems with dampers, VAV terminals, or changing filter condition</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Fan Curve Regions</p>
              <ul className="text-sm space-y-1">
                <li>- <strong>Stable region:</strong> Right of peak pressure - desired operating zone</li>
                <li>- <strong>Peak efficiency zone:</strong> Typically 60-80% of maximum flow</li>
                <li>- <strong>Stall region:</strong> Left of peak - unstable, noisy, avoid operation here</li>
                <li>- <strong>Surge line:</strong> Boundary between stable and unstable operation</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Duty Point Selection Criteria</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Criterion</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Requirement</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Consequence of Poor Selection</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Flow rate</td>
                      <td className="border border-white/10 px-3 py-2">Match design requirement</td>
                      <td className="border border-white/10 px-3 py-2">Inadequate ventilation or overcooling</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Pressure</td>
                      <td className="border border-white/10 px-3 py-2">Overcome system resistance + margin</td>
                      <td className="border border-white/10 px-3 py-2">Insufficient airflow at terminals</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Efficiency</td>
                      <td className="border border-white/10 px-3 py-2">Near peak efficiency point</td>
                      <td className="border border-white/10 px-3 py-2">Excessive energy consumption</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Stability</td>
                      <td className="border border-white/10 px-3 py-2">Well clear of stall region</td>
                      <td className="border border-white/10 px-3 py-2">Noise, vibration, unreliable operation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Future capacity</td>
                      <td className="border border-white/10 px-3 py-2">Margin for system changes</td>
                      <td className="border border-white/10 px-3 py-2">Unable to accommodate modifications</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Effect of System Changes on Duty Point</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Dirty filters:</strong> Increased resistance shifts duty point left (less flow, more pressure)</li>
                <li className="pl-1"><strong>Dampers closing:</strong> Increased resistance, reduced flow</li>
                <li className="pl-1"><strong>Duct leakage:</strong> Reduced effective resistance, increased wasteful flow</li>
                <li className="pl-1"><strong>Speed change:</strong> Duty point moves along system curve following fan laws</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Selection guidance:</strong> Select fans to operate between 60-80% of maximum flow for best efficiency, with the duty point clearly within the stable operating region and well clear of stall.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Efficiency Standards and Regulations */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Efficiency Standards and Regulations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Fan efficiency is regulated through multiple frameworks including Building Regulations
              Part L (SFP limits), ErP Directive (Fan Efficiency Grades), and motor efficiency
              standards. Compliance is mandatory and significantly influences fan and system selection.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Specific Fan Power (SFP)</p>
              <p className="text-sm text-white/90 mb-3">
                SFP measures the energy efficiency of the complete ventilation system, expressed as
                watts per litre per second (W/(l/s)). It accounts for all fans, drives, and controls
                serving a ventilation system.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>SFP = Total fan power (W) ÷ Design airflow (l/s)</p>
                <p className="text-white/60 mt-2">Example:</p>
                <p>Supply fan: 2.2 kW, Extract fan: 1.8 kW</p>
                <p>Design airflow: 2500 l/s</p>
                <p>SFP = (2200 + 1800) ÷ 2500 = 1.6 W/(l/s)</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Regulations Part L - SFP Limits</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">System Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Maximum SFP W/(l/s)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Central mechanical ventilation (supply and extract)</td>
                      <td className="border border-white/10 px-3 py-2">1.6</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Central mechanical ventilation with heating/cooling</td>
                      <td className="border border-white/10 px-3 py-2">1.6</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Local supply or extract (non-domestic)</td>
                      <td className="border border-white/10 px-3 py-2">0.5</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Zonal supply with central extract</td>
                      <td className="border border-white/10 px-3 py-2">1.5</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fan coil systems</td>
                      <td className="border border-white/10 px-3 py-2">0.8</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">ErP Directive and Fan Efficiency Grades (FEG)</p>
              <p className="text-sm text-white/90 mb-3">
                The Energy-related Products (ErP) Directive Lot 6 mandates minimum efficiency for
                fans. Compliance is measured using Fan Efficiency Grades comparing actual efficiency
                to an ideal reference fan.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>FEG67:</strong> Minimum requirement - 67% of reference fan efficiency</li>
                <li className="pl-1"><strong>FEG71:</strong> Good efficiency - exceeds minimum</li>
                <li className="pl-1"><strong>FEG75:</strong> High efficiency</li>
                <li className="pl-1"><strong>FEG85:</strong> Premium efficiency for best-in-class applications</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">EC Motors and Variable Speed Drives</p>
              <p className="text-sm text-white/90 mb-3">
                EC (electronically commutated) motors are increasingly specified for fan applications
                due to their efficiency advantages:
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mt-3">
                <div className="p-3 rounded bg-black/20">
                  <p className="font-medium text-white mb-2">EC Motor Advantages</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>- 80-90% efficiency across speed range</li>
                    <li>- Integral speed control</li>
                    <li>- No separate VSD required</li>
                    <li>- Compact installation</li>
                    <li>- Lower heat generation</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-black/20">
                  <p className="font-medium text-white mb-2">AC + VSD Comparison</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>- Efficiency drops at low speeds</li>
                    <li>- Separate VSD adds losses</li>
                    <li>- More installation space needed</li>
                    <li>- Higher maintenance requirement</li>
                    <li>- Better for larger motors (&gt;15kW)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-green-500/10 border border-green-400/30">
              <p className="text-sm font-medium text-green-400 mb-2">Achieving SFP Compliance</p>
              <ul className="text-sm space-y-1">
                <li>- Select high-efficiency fans (FEG71+)</li>
                <li>- Use EC motors or efficient AC motors with quality VSDs</li>
                <li>- Design low-resistance ductwork (oversized ducts, smooth fittings)</li>
                <li>- Minimise system pressure drops (select appropriate terminal devices)</li>
                <li>- Regular filter maintenance to prevent increased resistance</li>
                <li>- Commission and balance systems correctly</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Compliance note:</strong> ErP efficiency requirements are mandatory for fans placed on the market. Replacement projects must use compliant products, which may affect like-for-like specifications.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Fan Law Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> A fan operating at 1450 rpm delivers 2.5 m³/s at 400 Pa, consuming 1.8 kW. Calculate performance at 1200 rpm.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Given data:</p>
                <p>n₁ = 1450 rpm, Q₁ = 2.5 m³/s, P₁ = 400 Pa, W₁ = 1.8 kW</p>
                <p>n₂ = 1200 rpm</p>
                <p className="mt-2 text-white/60">Calculations:</p>
                <p>Speed ratio = n₂/n₁ = 1200/1450 = 0.828</p>
                <p className="mt-2">Q₂ = Q₁ × (n₂/n₁) = 2.5 × 0.828 = 2.07 m³/s</p>
                <p>P₂ = P₁ × (n₂/n₁)² = 400 × 0.828² = 274 Pa</p>
                <p>W₂ = W₁ × (n₂/n₁)³ = 1.8 × 0.828³ = 1.02 kW</p>
                <p className="mt-2 text-green-400">Result: 17% speed reduction achieves 43% power saving</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: SFP Calculation and Compliance</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Verify SFP compliance for a supply and extract system serving an office building.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">System data:</p>
                <p>Design airflow: 3,000 l/s (3.0 m³/s)</p>
                <p>Supply fan motor: 3.0 kW</p>
                <p>Extract fan motor: 2.2 kW</p>
                <p className="mt-2 text-white/60">SFP calculation:</p>
                <p>Total fan power = 3,000 + 2,200 = 5,200 W</p>
                <p>SFP = 5,200 ÷ 3,000 = 1.73 W/(l/s)</p>
                <p className="mt-2">Part L limit for central mechanical ventilation: 1.6 W/(l/s)</p>
                <p className="mt-2 text-red-400">Result: NON-COMPLIANT (1.73 &gt; 1.6)</p>
                <p className="mt-2 text-white/60">Options to achieve compliance:</p>
                <p className="ml-4">- Reduce duct resistance (larger ducts, fewer fittings)</p>
                <p className="ml-4">- Select higher efficiency fans</p>
                <p className="ml-4">- Use EC motors instead of AC + VSD</p>
                <p className="ml-4">- Increase airflow if system allows (reduces SFP)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Fan Selection for Variable Load System</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Select a fan for a VAV system requiring 1.5 m³/s at 500 Pa design duty, operating between 40-100% flow.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Design requirements:</p>
                <p>Design flow: 1.5 m³/s (1500 l/s)</p>
                <p>Design pressure: 500 Pa</p>
                <p>Operating range: 40-100% (0.6-1.5 m³/s)</p>
                <p className="mt-2 text-white/60">Fan type selection:</p>
                <p>- Centrifugal backward-curved (high efficiency)</p>
                <p>- Steep characteristic (stable across pressure range)</p>
                <p>- EC motor (maintains efficiency at part load)</p>
                <p className="mt-2 text-white/60">Selection criteria:</p>
                <p>- Duty point in stable region (avoid stall)</p>
                <p>- Peak efficiency near 70-80% of max flow</p>
                <p>- Select fan where 1.5 m³/s @ 500 Pa is 70-75% max flow</p>
                <p className="mt-2 text-green-400">Recommendation: Select fan with max flow ~2.0-2.1 m³/s</p>
                <p className="text-green-400">This places design duty near peak efficiency</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Fan Selection Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Define required airflow rate (l/s or m³/s) from design calculations</li>
                <li className="pl-1">Calculate total system pressure including ductwork, fittings, filters, and terminals</li>
                <li className="pl-1">Add 10-15% safety margin to pressure for system uncertainties</li>
                <li className="pl-1">Select fan type appropriate to application and pressure requirements</li>
                <li className="pl-1">Ensure duty point is in stable region near peak efficiency</li>
                <li className="pl-1">Verify ErP compliance (FEG rating) and SFP contribution</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">SFP limit (central mechanical): <strong>1.6 W/(l/s)</strong></li>
                <li className="pl-1">Minimum FEG: <strong>FEG67</strong> (67% of reference efficiency)</li>
                <li className="pl-1">Backward-curved efficiency: up to <strong>85%</strong></li>
                <li className="pl-1">EC motor efficiency: <strong>80-90%</strong> across speed range</li>
                <li className="pl-1">50% speed = <strong>12.5%</strong> power (fan law)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Oversizing fans</strong> - wastes energy and increases noise</li>
                <li className="pl-1"><strong>Ignoring system curve</strong> - actual performance differs from catalogue data</li>
                <li className="pl-1"><strong>Operating in stall region</strong> - causes instability and damage</li>
                <li className="pl-1"><strong>Not accounting for dirty filters</strong> - system resistance increases over time</li>
                <li className="pl-1"><strong>Specifying non-compliant fans</strong> - fails ErP requirements</li>
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
                <p className="font-medium text-white mb-1">Fan Type Selection</p>
                <ul className="space-y-0.5">
                  <li>Centrifugal BC: High pressure, max efficiency</li>
                  <li>Centrifugal FC: Compact, low-medium pressure</li>
                  <li>Axial: High flow, low pressure</li>
                  <li>Mixed-flow: Moderate pressure, space-constrained</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Fan Laws Summary</p>
                <ul className="space-y-0.5">
                  <li>Flow: Q₂ = Q₁ × (n₂/n₁)</li>
                  <li>Pressure: P₂ = P₁ × (n₂/n₁)²</li>
                  <li>Power: W₂ = W₁ × (n₂/n₁)³</li>
                  <li>Halve speed = 12.5% power</li>
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
            <Link to="../h-n-c-module8-section2-4">
              Next: Heat Recovery Systems
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule8Section2_3;
