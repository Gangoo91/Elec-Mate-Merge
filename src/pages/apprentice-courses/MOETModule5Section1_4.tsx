import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Flow and Level Measurement - MOET Module 5 Section 1.4";
const DESCRIPTION = "Comprehensive guide to flow and level measurement for maintenance technicians: orifice plates, electromagnetic flow meters, ultrasonic level sensors, float switches and hydrostatic level measurement. ST1426 aligned.";

const quickCheckQuestions = [
  {
    id: "dp-flow-principle",
    question: "An orifice plate flow meter works by measuring:",
    options: [
      "The temperature change across the plate",
      "The differential pressure created as the fluid is forced through a restriction",
      "The electrical conductivity of the fluid",
      "The velocity of sound through the fluid"
    ],
    correctIndex: 1,
    explanation: "An orifice plate creates a restriction in the pipe. As fluid passes through the smaller opening, its velocity increases and its pressure decreases (Bernoulli's principle). A differential pressure transmitter measures the pressure drop across the plate. Flow rate is proportional to the square root of the differential pressure."
  },
  {
    id: "mag-flow-requirement",
    question: "An electromagnetic flow meter requires the fluid to be:",
    options: [
      "A gas at high pressure",
      "Electrically conductive (minimum conductivity typically 5 microS/cm)",
      "Transparent so the sensor can see through it",
      "At a temperature above 50 degrees C"
    ],
    correctIndex: 1,
    explanation: "Electromagnetic flow meters operate on Faraday's law of electromagnetic induction — a conductor moving through a magnetic field generates a voltage. The conductive fluid is the conductor. The fluid must have a minimum electrical conductivity (typically 5 microS/cm) for the meter to work. This makes mag flow meters ideal for water, slurries and chemicals, but unsuitable for hydrocarbons and gases."
  },
  {
    id: "ultrasonic-level",
    question: "An ultrasonic level sensor mounted at the top of a tank measures level by:",
    options: [
      "Measuring the weight of the tank contents",
      "Detecting the change in capacitance as the level rises",
      "Measuring the time of flight for an ultrasonic pulse to travel to the liquid surface and back",
      "Measuring the hydrostatic pressure at the bottom of the tank"
    ],
    correctIndex: 2,
    explanation: "The ultrasonic sensor emits a burst of high-frequency sound pulses downward toward the liquid surface. The pulses reflect from the surface and return to the sensor. The distance is calculated from d = (v x t) / 2, where v is the speed of sound in air and t is the round-trip time. Level = tank height minus distance to surface."
  },
  {
    id: "hydrostatic-level",
    question: "A submersible pressure transmitter measuring hydrostatic level uses the principle that:",
    options: [
      "Temperature increases with depth",
      "Pressure at a point in a liquid is proportional to the depth of liquid above that point (P = rho x g x h)",
      "The electrical resistance of the liquid changes with depth",
      "Ultrasonic waves travel faster through deeper liquid"
    ],
    correctIndex: 1,
    explanation: "Hydrostatic pressure at any point in a liquid column equals the product of the liquid density (rho), gravitational acceleration (g) and the height of liquid above the measurement point (h). A submersible pressure transmitter at the bottom of the tank directly measures this pressure and converts it to a level reading. The density must be known and constant for accurate measurement."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The relationship between flow rate and differential pressure across an orifice plate is:",
    options: [
      "Linear — double the DP means double the flow",
      "Square root — flow is proportional to the square root of the DP",
      "Inverse — higher DP means lower flow",
      "Exponential — flow increases exponentially with DP"
    ],
    correctAnswer: 1,
    explanation: "Flow rate Q is proportional to the square root of the differential pressure: Q = k x sqrt(delta P). This means that to double the flow, the DP increases by a factor of four. The square root relationship must be applied either in the transmitter, PLC or DCS to convert the linear DP signal to a linear flow reading."
  },
  {
    id: 2,
    question: "Which flow meter technology has no moving parts, creates no pressure drop, and can measure both conductive and non-conductive liquids?",
    options: [
      "Turbine flow meter",
      "Orifice plate with DP transmitter",
      "Ultrasonic (clamp-on transit time) flow meter",
      "Positive displacement flow meter"
    ],
    correctAnswer: 2,
    explanation: "Clamp-on ultrasonic flow meters mount externally on the pipe — the transducers are clamped to the outside surface. They measure the difference in transit time of ultrasonic pulses travelling with and against the flow. There are no wetted parts, no pressure drop and no pipe cutting required. They work with conductive and non-conductive clean liquids."
  },
  {
    id: 3,
    question: "A Coriolis flow meter directly measures:",
    options: [
      "Volumetric flow rate only",
      "Mass flow rate (and density) — independent of temperature, pressure and fluid properties",
      "Differential pressure across a restriction",
      "The rotational speed of a turbine"
    ],
    correctAnswer: 1,
    explanation: "A Coriolis meter vibrates a tube at its resonant frequency. Fluid flowing through the vibrating tube creates a Coriolis force that twists the tube. The degree of twist is directly proportional to mass flow rate. The resonant frequency changes with fluid density. This provides a direct mass flow measurement independent of fluid properties — the 'gold standard' for custody transfer and batching."
  },
  {
    id: 4,
    question: "A variable area flow meter (rotameter) indicates flow by:",
    options: [
      "Measuring the differential pressure across a fixed orifice",
      "A float that rises in a tapered tube — the float position indicates the flow rate",
      "Counting the revolutions of an impeller",
      "Measuring the velocity of ultrasonic pulses through the fluid"
    ],
    correctAnswer: 1,
    explanation: "In a rotameter, fluid flows upward through a tapered (conical) glass or metal tube. A float is lifted by the fluid flow and settles at a position where the upward drag force balances the downward gravitational force. As flow increases, the float rises to a wider section of the tube. The flow rate is read from a scale on the tube at the top of the float."
  },
  {
    id: 5,
    question: "For level measurement in an open-top atmospheric tank, which method is the simplest and most cost-effective?",
    options: [
      "Radar level transmitter",
      "Guided wave radar",
      "Hydrostatic pressure transmitter mounted at the bottom of the tank",
      "Nuclear level gauge"
    ],
    correctAnswer: 2,
    explanation: "A hydrostatic pressure transmitter at the bottom of an open tank is the simplest continuous level measurement method. The pressure is directly proportional to the liquid height (P = rho x g x h). For open tanks, the reference side of the transmitter is vented to atmosphere. This is cost-effective, reliable and suitable for most clean liquid applications."
  },
  {
    id: 6,
    question: "A capacitance level probe in a tank measures level by detecting:",
    options: [
      "The temperature gradient in the tank",
      "The change in capacitance between the probe and the tank wall as the dielectric (liquid) level changes",
      "The ultrasonic echo from the liquid surface",
      "The weight of the liquid pressing on the probe"
    ],
    correctAnswer: 1,
    explanation: "A capacitance probe acts as one plate of a capacitor; the tank wall (or a reference rod) acts as the other plate. As the liquid level rises around the probe, the dielectric between the plates changes from air (dielectric constant approximately 1) to the liquid (dielectric constant much higher). This increases the capacitance proportionally with level."
  },
  {
    id: 7,
    question: "Float switches are commonly used for:",
    options: [
      "Continuous, high-accuracy level measurement with 4-20 mA output",
      "Simple on/off level detection — high-level alarm, low-level alarm, pump control",
      "Measuring flow rate in open channels",
      "Detecting the density of the liquid"
    ],
    correctAnswer: 1,
    explanation: "Float switches are simple, reliable devices for point-level detection. A buoyant float rises with the liquid level and operates a magnetic reed switch or micro-switch at a fixed point. They provide a discrete on/off output for alarms, pump start/stop and overflow protection. They are not suitable for continuous measurement."
  },
  {
    id: 8,
    question: "When installing an electromagnetic flow meter, it is essential that:",
    options: [
      "The pipe is always vertical",
      "The meter is installed with a minimum of 5 pipe diameters of straight pipe upstream and 2 downstream to ensure a developed flow profile",
      "The fluid temperature is below 20 degrees C",
      "The pipe is made of stainless steel only"
    ],
    correctAnswer: 1,
    explanation: "Electromagnetic flow meters require a fully developed, symmetric flow profile for accurate measurement. Upstream disturbances (bends, valves, reducers) create asymmetric flow. The general rule is 5D (five pipe diameters) of straight pipe upstream and 2D downstream, though some manufacturers specify 10D upstream for critical applications."
  },
  {
    id: 9,
    question: "Radar level measurement is preferred over ultrasonic in applications where:",
    options: [
      "The liquid is at room temperature",
      "The tank contains clean water",
      "There is heavy vapour, foam, high temperature or pressure above the liquid surface",
      "The tank is open-topped and outdoors"
    ],
    correctAnswer: 2,
    explanation: "Radar (microwave) level measurement is unaffected by temperature, pressure, vapour, dust and most foams because electromagnetic waves travel through these conditions with minimal attenuation. Ultrasonic sensors rely on sound waves which are significantly affected by temperature changes (speed of sound varies), heavy vapour and foam. Radar is the technology of choice for demanding process conditions."
  },
  {
    id: 10,
    question: "A turbine flow meter generates an output signal that is:",
    options: [
      "A 4-20 mA analogue current proportional to flow",
      "A frequency (pulse) signal where the pulse rate is proportional to the volumetric flow rate",
      "A 0-10 V voltage signal",
      "A resistance change proportional to flow"
    ],
    correctAnswer: 1,
    explanation: "A turbine flow meter has a rotor that spins at a rate proportional to the fluid velocity. A magnetic or inductive pickup generates a pulse for each blade passing the sensor. The pulse frequency is directly proportional to the volumetric flow rate. A flow computer or PLC counter module converts the frequency to engineering units (litres per minute, cubic metres per hour)."
  },
  {
    id: 11,
    question: "In a closed (pressurised) vessel, level measurement using a DP transmitter requires:",
    options: [
      "Only one pressure connection at the bottom of the vessel",
      "Two pressure connections — one at the bottom (high side) and one at the top (low side) — to compensate for the vessel pressure above the liquid",
      "A vent to atmosphere on the vessel",
      "The vessel to be drained before measurement"
    ],
    correctAnswer: 1,
    explanation: "In a closed vessel, the gas space above the liquid is pressurised. A single bottom connection would measure total pressure (liquid head plus gas pressure). By connecting the 'high' side to the bottom and the 'low' side to the top of the vessel, the DP transmitter measures only the differential pressure due to the liquid column, which is proportional to level."
  },
  {
    id: 12,
    question: "A maintenance technician notices a flow reading that is consistently 10 % lower than expected. The orifice plate has been in service for 3 years. The most likely cause is:",
    options: [
      "The transmitter has drifted out of calibration",
      "Erosion or wear of the orifice plate bore, which has increased the bore diameter and reduced the DP for a given flow",
      "The pipe has expanded due to temperature",
      "The upstream straight pipe length has changed"
    ],
    correctAnswer: 1,
    explanation: "Orifice plates are subject to erosion, particularly with abrasive fluids, high velocities or two-phase flow. As the bore wears larger, the restriction is reduced, the DP decreases for a given flow rate, and the indicated flow reading drops below the actual flow. Regular inspection and replacement of orifice plates is essential for maintaining measurement accuracy."
  }
];

const faqs = [
  {
    question: "What is the most accurate flow measurement technology?",
    answer: "Coriolis flow meters offer the highest accuracy for liquid mass flow measurement — typically plus or minus 0.1 to 0.2 % of reading. They measure mass flow directly, independent of fluid properties, temperature and pressure. They are the standard for custody transfer (buying and selling liquids/gases by flow). However, they are the most expensive flow meter type and are limited in pipe size."
  },
  {
    question: "Can I measure flow without cutting the pipe?",
    answer: "Yes — clamp-on ultrasonic flow meters mount externally on the pipe surface and measure flow using transit-time or Doppler principles. They require no pipe cutting, no process shutdown and create no pressure drop. They are ideal for temporary measurement, commissioning checks, energy auditing and retrofit applications. Accuracy is typically plus or minus 1-3 % depending on pipe condition and fluid."
  },
  {
    question: "Why does my ultrasonic level sensor give erratic readings?",
    answer: "Common causes include: condensation or deposits on the transducer face; foam on the liquid surface absorbing the sound energy; turbulent liquid surface scattering the echo; temperature gradients in the head space affecting the speed of sound; structural echoes from tank internals (baffles, pipes, ladders); and the target being within the sensor's dead zone (minimum range)."
  },
  {
    question: "What is the difference between a level switch and a level transmitter?",
    answer: "A level switch provides a simple on/off output at a fixed point — it tells you the level is above or below a threshold. A level transmitter provides a continuous output (4-20 mA) proportional to the actual level — it tells you the exact level at all times. Switches are used for alarms and simple pump control; transmitters are used for process control, inventory management and continuous monitoring."
  },
  {
    question: "How do I select the right flow meter for my application?",
    answer: "Key selection criteria include: fluid type (liquid, gas, steam, slurry), conductivity, viscosity, temperature and pressure, required accuracy, pipe size, allowable pressure drop, straight pipe availability, and whether volumetric or mass flow is needed. Consult the meter manufacturer's selection guide with full process data. Common choices: mag flow for conductive liquids, ultrasonic for clean liquids/gases, Coriolis for mass flow, vortex for steam."
  }
];

const MOETModule5Section1_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section1">
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
            <Shield className="h-4 w-4" />
            <span>Module 5.1.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Flow and Level Measurement
          </h1>
          <p className="text-white/80">
            Flow meters, level sensors and industrial measurement techniques for process control
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>DP flow:</strong> Orifice plate creates pressure drop — flow proportional to sqrt of DP</li>
              <li className="pl-1"><strong>Mag flow:</strong> Faraday's law — conductive fluid through magnetic field generates voltage</li>
              <li className="pl-1"><strong>Level:</strong> Hydrostatic pressure, ultrasonic time-of-flight, radar, capacitance, floats</li>
              <li className="pl-1"><strong>Selection:</strong> Match technology to fluid, accuracy, pipe size and environment</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Fault-finding:</strong> Check impulse lines, verify 4-20 mA output, inspect orifice plates</li>
              <li className="pl-1"><strong>Commissioning:</strong> Verify zero, span and scaling against process conditions</li>
              <li className="pl-1"><strong>Replacement:</strong> Match meter type, size, materials, signal output and process rating</li>
              <li className="pl-1"><strong>ST1426:</strong> Maps to process measurement and instrumentation maintenance</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain differential pressure flow measurement using orifice plates and the square root relationship",
              "Describe electromagnetic, ultrasonic, Coriolis and turbine flow meter principles",
              "Identify hydrostatic, ultrasonic, radar and capacitance level measurement methods",
              "Distinguish between continuous level transmitters and point-level switches",
              "Select appropriate flow and level instruments for common industrial applications",
              "Apply maintenance and fault-finding procedures to flow and level instrumentation"
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

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Differential Pressure Flow Measurement
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Differential pressure (DP) flow measurement is the oldest and most widely installed flow measurement technology in industry. Despite the availability of more modern alternatives, DP flow meters remain dominant in process industries because of their simplicity, reliability, well-understood physics and the availability of international standards (BS EN ISO 5167) for their design and installation.
            </p>
            <p>
              The principle is straightforward: a restriction (primary element) is placed in the pipe. As fluid flows through the restriction, its velocity increases and its static pressure decreases according to Bernoulli's principle. A differential pressure transmitter measures the pressure drop across the restriction, and the flow rate is calculated from the square root relationship: Q = k x sqrt(delta P).
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Primary Elements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Orifice plate:</strong> A thin plate with a concentric hole — the most common type. Low cost, no moving parts, but creates permanent pressure loss. Beta ratio (bore/pipe diameter) typically 0.3-0.7.</li>
                <li className="pl-1"><strong>Venturi tube:</strong> A gradually converging section followed by a throat and a gradual diverging section. Lower permanent pressure loss than an orifice plate. Higher cost, larger physical size.</li>
                <li className="pl-1"><strong>Flow nozzle:</strong> A compromise between orifice plate and venturi — better pressure recovery than an orifice but smaller than a venturi. Used in steam flow measurement.</li>
                <li className="pl-1"><strong>Pitot tube:</strong> Measures the difference between total (stagnation) pressure and static pressure at a point in the flow. Used for air velocity measurement in ducts.</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">The Square Root Problem</p>
              <p className="text-sm text-white">
                Because flow is proportional to the square root of DP, the measurement accuracy deteriorates significantly at low flows. At 25 % flow, the DP is only 6.25 % of full scale, making the signal difficult to measure accurately. This limits the useful rangeability of DP flow meters to approximately 3:1 or 4:1 (compared with 10:1 or better for mag flow and Coriolis meters). Multivariable transmitters with advanced characterisation can improve this to some extent.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance tip:</strong> Impulse lines connecting the orifice plate tappings to the DP transmitter are a common source of measurement errors. Blocked impulse lines, leaking fittings, trapped air (in liquid service) or trapped condensate (in gas service) will all cause incorrect readings. Regular impulse line maintenance — blowing through, checking for leaks, verifying valve positions — is essential.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Electromagnetic and Ultrasonic Flow Meters
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Modern flow measurement has moved increasingly toward technologies that offer wider rangeability, lower maintenance, no moving parts and no pressure drop. Electromagnetic and ultrasonic flow meters lead this trend and are now the preferred choice for new installations in water, wastewater, chemical processing and HVAC applications.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Electromagnetic (Mag) Flow Meters</h3>
              <p className="text-sm text-white mb-3">
                Based on Faraday's law of electromagnetic induction: a voltage is induced in a conductor moving through a magnetic field. The conductive fluid is the conductor, electromagnetic coils generate the field, and electrodes in the pipe wall measure the induced voltage, which is proportional to the fluid velocity.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Requirements:</strong> Fluid must be electrically conductive (minimum approximately 5 microS/cm) — suitable for water, acids, alkalis, slurries</li>
                <li className="pl-1"><strong>Not suitable for:</strong> Hydrocarbons, gases, deionised water, solvents (low conductivity)</li>
                <li className="pl-1"><strong>Advantages:</strong> No moving parts, no pressure drop, handles slurries and dirty fluids, wide rangeability (100:1), bidirectional</li>
                <li className="pl-1"><strong>Pipe lining:</strong> The meter tube must have a non-conductive lining (PTFE, rubber, ceramic) to prevent the signal short-circuiting through the pipe wall</li>
                <li className="pl-1"><strong>Installation:</strong> Must be full bore (pipe must be completely full of liquid) — not suitable for partially filled pipes</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Ultrasonic Flow Meters</h3>
              <p className="text-sm text-white mb-3">
                Ultrasonic flow meters use sound waves to measure fluid velocity. Two main principles are used:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Transit time:</strong> Two transducers send ultrasonic pulses diagonally across the pipe in both directions. The pulse travelling with the flow arrives faster than the one against the flow. The difference in transit times is proportional to the fluid velocity. Works with clean liquids and gases.</li>
                <li className="pl-1"><strong>Doppler:</strong> Ultrasonic pulses are reflected from particles or bubbles in the fluid. The frequency shift (Doppler effect) is proportional to velocity. Requires particles or bubbles in the fluid. Used for slurries and dirty fluids.</li>
                <li className="pl-1"><strong>Clamp-on:</strong> Transducers mount on the outside of the pipe — no pipe cutting, no wetted parts, no shutdown required. Ideal for retrofit and temporary measurement.</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> When selecting between mag flow and ultrasonic, the fluid conductivity is the deciding factor. If the fluid is conductive (water, chemicals, slurries), mag flow is typically preferred for its accuracy and reliability. If the fluid is non-conductive (hydrocarbons, gases) or pipe cutting is not possible, ultrasonic is the better choice.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Level Measurement — Continuous Methods
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Level measurement determines the quantity of material (liquid, solid or slurry) in a tank or vessel. Continuous level measurement provides a proportional output (4-20 mA) representing the actual level at all times, enabling process control, inventory management and safety monitoring. Several technologies are available, each suited to different applications and environments.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Hydrostatic Pressure</h3>
                <p className="text-sm text-white">
                  The simplest continuous level method for liquid-filled tanks. A pressure transmitter at the bottom of the tank measures the hydrostatic head: P = rho x g x h. For open tanks, the transmitter reference is vented to atmosphere. For closed (pressurised) vessels, a differential pressure transmitter is used with the high side at the bottom and the low side at the top of the vessel. Submersible pressure sensors can be lowered into deep tanks or wells.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Ultrasonic Level</h3>
                <p className="text-sm text-white">
                  A non-contact method using time-of-flight measurement. The sensor is mounted at the top of the tank and measures the distance to the liquid surface. Level = tank height minus distance. Suitable for liquids and solids. Affected by foam, heavy vapour, temperature gradients and turbulent surfaces. Cost-effective for many applications up to approximately 10 m range.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Radar (Microwave) Level</h3>
                <p className="text-sm text-white">
                  Uses electromagnetic waves instead of sound waves. Unaffected by temperature, pressure, vapour, dust and most chemical atmospheres. Two variants: free-space radar (antenna transmits through the vapour space) and guided wave radar (GWR — the signal is guided along a probe immersed in the liquid). Guided wave radar can measure interface levels (e.g., oil on water) and is highly accurate in turbulent conditions.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Capacitance Level</h3>
                <p className="text-sm text-white">
                  A probe and the tank wall form a capacitor. As the liquid (dielectric) rises around the probe, the capacitance changes proportionally. Suitable for conductive and non-conductive liquids, granular solids and powders. Requires calibration for the specific fluid dielectric constant. Insulated probes are used for conductive liquids.
                </p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance tip:</strong> When a level transmitter reading disagrees with a sight glass or manual dip measurement, do not automatically assume the transmitter is wrong. Check the sight glass isolation valves, verify the specific gravity (density) used in the hydrostatic calculation, inspect for blockages in impulse lines, and verify the transmitter zero and span before condemning the instrument.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Point Level Detection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Point level switches provide simple on/off detection at a specific level — high alarm, low alarm, pump start, pump stop, or overfill protection. Unlike continuous transmitters, they do not indicate the actual level — only whether the material is above or below the switch point. They are simpler, cheaper and often more reliable for safety-critical alarm functions.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Point Level Technologies</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Float switches:</strong> A buoyant float rises with the liquid and operates a reed switch or micro-switch. Simple, reliable, low cost. Affected by foam, turbulence and sticky materials.</li>
                <li className="pl-1"><strong>Vibrating fork (tuning fork):</strong> Two tines vibrate at their resonant frequency. When immersed in liquid, the frequency changes, triggering the output. Excellent for liquids, slurries and light powders. Self-cleaning due to vibration.</li>
                <li className="pl-1"><strong>Conductive (conductivity) probes:</strong> Two or more electrodes detect the presence of a conductive liquid (water-based). Simple and low cost. Not suitable for non-conductive liquids.</li>
                <li className="pl-1"><strong>Paddle (rotary) switches:</strong> A motor-driven paddle rotates slowly. When immersed in solid material (grain, powder), the paddle stalls and the torque increase triggers the switch. Used in silos and hoppers.</li>
                <li className="pl-1"><strong>Admittance (RF capacitance):</strong> Detects the presence of material by capacitance change. Handles coatings and build-up better than standard capacitance probes.</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Safety-Critical Level Applications</h3>
              <p className="text-sm text-white mb-3">
                In applications where high level could cause a safety hazard (tank overfill, chemical spill, boiler overpressure), the level switch is part of a safety-instrumented system (SIS). Requirements include:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Independent of the control system level transmitter (diversity)</li>
                <li className="pl-1">Self-monitoring or regularly proof-tested</li>
                <li className="pl-1">Fail-safe design — output drops out on failure (de-energise to trip)</li>
                <li className="pl-1">SIL-rated to the required safety integrity level (IEC 61511)</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Under ST1426, maintenance technicians should understand the basic principles of flow and level measurement, be able to identify common instrument types installed on plant, carry out basic checks and calibration verification, and recognise when specialist instrumentation support is required.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

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
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section1-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Temperature and Pressure Sensors
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section1-5">
              Next: Signal Conditioning
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule5Section1_4;