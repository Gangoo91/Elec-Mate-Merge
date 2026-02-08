import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Direct Current Principles - MOET Module 2.2.1";
const DESCRIPTION = "Comprehensive guide to direct current principles for maintenance technicians: DC characteristics, battery systems, DC motors, rectification, smoothing, DC distribution in industrial settings, DC testing and polarity under BS 7671 and ST1426.";

const quickCheckQuestions = [
  {
    id: "dc-characteristic",
    question: "What is the defining characteristic of direct current (DC)?",
    options: [
      "It alternates direction 50 times per second",
      "Current flows in one direction only with a constant or near-constant magnitude",
      "It can only be produced by solar panels",
      "It has a frequency of 50 Hz"
    ],
    correctIndex: 1,
    explanation: "Direct current flows in one direction only. Unlike AC, the electrons move consistently from the negative terminal to the positive terminal of the source. The magnitude may be constant (as from a regulated supply) or may vary (as from an unsmoothed rectifier), but the direction remains the same."
  },
  {
    id: "battery-series",
    question: "Three 12 V batteries are connected in series. What is the total EMF?",
    options: [
      "4 V",
      "12 V",
      "36 V",
      "144 V"
    ],
    correctIndex: 2,
    explanation: "In a series connection, individual battery EMFs are added together. Three 12 V batteries in series give 12 + 12 + 12 = 36 V. The total capacity (Ah) remains the same as a single battery. Series connection is used when a higher voltage is required."
  },
  {
    id: "rectification-type",
    question: "Which type of rectifier uses four diodes to convert AC to DC using both half-cycles of the waveform?",
    options: [
      "Half-wave rectifier",
      "Full-wave centre-tap rectifier",
      "Full-wave bridge rectifier",
      "Three-phase rectifier"
    ],
    correctIndex: 2,
    explanation: "A full-wave bridge rectifier uses four diodes arranged in a bridge configuration. During each half-cycle, two diodes conduct and two are reverse-biased, meaning both positive and negative half-cycles of the AC input are converted to a pulsating DC output. This is the most common rectifier configuration in industrial power supplies."
  },
  {
    id: "dc-polarity",
    question: "Why is correct polarity essential when connecting DC equipment?",
    options: [
      "Incorrect polarity has no effect on DC equipment",
      "It only matters for batteries, not other DC equipment",
      "Reversed polarity can damage components, cause overheating, or create safety hazards",
      "Polarity only affects the brightness of lamps"
    ],
    correctIndex: 2,
    explanation: "Correct polarity is critical in DC circuits. Reversed polarity can destroy electrolytic capacitors (which may explode), damage semiconductor devices, reverse-bias protective diodes rendering them ineffective, cause incorrect motor rotation, and damage sensitive electronic control equipment. Always verify polarity before energising DC circuits."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which of the following is a primary source of direct current?",
    options: [
      "A transformer",
      "An alternator",
      "A battery or electrochemical cell",
      "A three-phase induction motor"
    ],
    correctAnswer: 2,
    explanation: "Batteries and electrochemical cells are primary sources of DC — they convert chemical energy directly into electrical energy. Transformers and alternators produce AC. While rectifiers can convert AC to DC, the primary generating source of direct current is the electrochemical cell."
  },
  {
    id: 2,
    question: "What happens to the total capacity (Ah) when batteries are connected in parallel?",
    options: [
      "The capacity is halved",
      "The capacity remains the same as one battery",
      "The total capacity equals the sum of all individual capacities",
      "The capacity is unpredictable"
    ],
    correctAnswer: 2,
    explanation: "When batteries of the same voltage are connected in parallel, the total capacity (Ah) is the sum of all individual capacities. The voltage remains the same as a single battery. For example, three 12 V 100 Ah batteries in parallel give 12 V at 300 Ah. This is used when extended run-time is required."
  },
  {
    id: 3,
    question: "In a half-wave rectifier, what percentage of the AC input waveform is utilised?",
    options: [
      "25%",
      "50%",
      "75%",
      "100%"
    ],
    correctAnswer: 1,
    explanation: "A half-wave rectifier uses only one half-cycle (positive or negative) of the AC waveform, blocking the other. This means only 50% of the input waveform is utilised, resulting in a lower average DC output and higher ripple. Full-wave rectification is preferred for most applications."
  },
  {
    id: 4,
    question: "What is the primary function of a smoothing capacitor in a DC power supply?",
    options: [
      "To increase the output voltage",
      "To reduce ripple and produce a steadier DC output",
      "To convert AC to DC",
      "To provide overcurrent protection"
    ],
    correctAnswer: 1,
    explanation: "A smoothing (reservoir) capacitor is connected across the rectifier output. It charges during the peaks of the pulsating DC and discharges during the troughs, filling in the gaps and reducing the ripple voltage. This produces a much smoother DC output. Larger capacitance values and lower load currents give better smoothing."
  },
  {
    id: 5,
    question: "A DC motor in a maintenance workshop suddenly reverses direction. The most likely cause is:",
    options: [
      "The motor has overheated",
      "The supply polarity has been reversed",
      "The motor brushes are worn",
      "The supply frequency has changed"
    ],
    correctAnswer: 1,
    explanation: "Reversing the polarity of the supply to a permanent-magnet DC motor reverses the direction of current through the armature, reversing the motor's direction of rotation. This is actually the standard method of reversing DC motors in many applications. DC motors do not depend on supply frequency (they operate on DC), and worn brushes would cause poor running rather than reversal."
  },
  {
    id: 6,
    question: "Which instrument would you use to verify correct polarity on a DC circuit?",
    options: [
      "A clamp meter set to AC",
      "An insulation resistance tester",
      "A multimeter set to DC volts",
      "An earth loop impedance tester"
    ],
    correctAnswer: 2,
    explanation: "A multimeter set to DC volts will show both the magnitude and polarity of the voltage. A positive reading confirms the red probe is on the positive conductor; a negative reading indicates reversed polarity. This is the standard method for verifying DC polarity during maintenance and commissioning."
  },
  {
    id: 7,
    question: "What is the main advantage of DC distribution in data centres?",
    options: [
      "DC equipment is always cheaper than AC equipment",
      "Fewer conversion stages reduce energy losses and improve efficiency",
      "DC is safer than AC in all circumstances",
      "DC cables are always smaller than AC cables"
    ],
    correctAnswer: 1,
    explanation: "In a conventional data centre, power is converted multiple times: AC to DC (UPS rectifier), DC to AC (UPS inverter), AC to DC (server PSU). Each conversion introduces losses (typically 2-5% per stage). DC distribution eliminates intermediate conversion stages, reducing losses and improving overall efficiency by 5-15%."
  },
  {
    id: 8,
    question: "When measuring the internal resistance of a battery, a significant increase from the baseline value indicates:",
    options: [
      "The battery is fully charged",
      "The battery is new and performing well",
      "The battery is degrading and may need replacement",
      "The measurement equipment is faulty"
    ],
    correctAnswer: 2,
    explanation: "Internal resistance increases as a battery ages and degrades. Lead-acid batteries develop sulphation on the plates, lithium-ion batteries develop internal resistance from electrode degradation. A significant increase (typically >25% above baseline) indicates the battery's ability to deliver current under load is compromised and it may need replacement."
  },
  {
    id: 9,
    question: "What is the ripple factor of a power supply?",
    options: [
      "The ratio of DC output to AC input voltage",
      "The ratio of AC ripple component to the DC component of the output",
      "The number of diodes in the rectifier circuit",
      "The resistance of the smoothing capacitor"
    ],
    correctAnswer: 1,
    explanation: "The ripple factor is the ratio of the RMS value of the AC (ripple) component to the DC component of the rectifier output. A lower ripple factor indicates better smoothing and a purer DC output. A half-wave rectifier has a ripple factor of approximately 1.21, while a full-wave bridge rectifier has approximately 0.48 before smoothing."
  },
  {
    id: 10,
    question: "Under BS 7671, what is the upper voltage limit for Band I DC circuits?",
    options: [
      "50 V",
      "60 V",
      "120 V",
      "1500 V"
    ],
    correctAnswer: 2,
    explanation: "Under BS 7671:2018+A3:2024, Band I for DC extends up to 120 V ripple-free DC (compared to 50 V for AC). This higher threshold reflects the fact that DC is less likely to cause ventricular fibrillation at equivalent voltages. Band II DC extends from 120 V to 1500 V."
  },
  {
    id: 11,
    question: "Which type of DC motor uses permanent magnets in the stator and is commonly found in small maintenance tools?",
    options: [
      "Shunt-wound DC motor",
      "Series-wound DC motor",
      "Compound-wound DC motor",
      "Permanent magnet DC motor (PMDC)"
    ],
    correctAnswer: 3,
    explanation: "Permanent magnet DC (PMDC) motors use permanent magnets to create the stator field, eliminating the need for field windings. They are compact, efficient, easy to control and commonly found in cordless power tools, small fans, pumps and automotive applications. Their speed is controlled by varying the armature voltage."
  },
  {
    id: 12,
    question: "What safety precaution is essential before working on a DC battery bank?",
    options: [
      "Wear rubber-soled shoes only",
      "Remove insulated tools from the work area",
      "Remove all metallic jewellery and use insulated tools to prevent short circuits",
      "Ensure the room temperature is below 20 °C"
    ],
    correctAnswer: 2,
    explanation: "Battery banks can deliver extremely high short-circuit currents (thousands of amps) because they have very low internal impedance. A metal ring, watch or tool placed across terminals can cause an immediate short circuit, resulting in explosive arcing, severe burns and molten metal. Always remove jewellery and use insulated tools rated for the voltage present."
  }
];

const faqs = [
  {
    question: "Why is DC making a comeback in modern electrical installations?",
    answer: "DC is increasingly used because many modern loads (LED lighting, IT equipment, variable speed drives, EV chargers) ultimately require DC. Solar PV panels and batteries also produce DC. By distributing DC directly, intermediate AC-DC-AC conversion stages are eliminated, improving efficiency by 5-15%. Data centres, telecommunications and renewable energy systems are leading this trend."
  },
  {
    question: "Can you get a fatal electric shock from a 12 V battery?",
    answer: "A 12 V battery cannot normally drive sufficient current through intact skin to cause electrocution — the voltage is too low to overcome the skin's resistance. However, a 12 V battery can deliver extremely high short-circuit currents (hundreds or thousands of amps), which can cause explosive arcing, severe burns and fire if a conductor is placed across the terminals. The risk is thermal, not shock."
  },
  {
    question: "What is the difference between EMF and terminal voltage in a battery?",
    answer: "EMF (electromotive force) is the voltage produced by the battery's internal chemistry with no load connected — it represents the total energy per coulomb. Terminal voltage is the voltage measured at the battery's terminals when a load is connected. Terminal voltage is always lower than EMF because of the voltage drop across the battery's internal resistance: V_terminal = EMF - (I x r_internal). As the battery ages, internal resistance increases and terminal voltage under load decreases."
  },
  {
    question: "How do you safely dispose of industrial batteries?",
    answer: "Industrial batteries (lead-acid, lithium-ion, nickel-cadmium) are classified as hazardous waste under the Waste Batteries and Accumulators Regulations 2009. They must be collected by an approved waste carrier and recycled at a licensed facility. Never dispose of batteries in general waste. Lead-acid batteries are almost 100% recyclable. Lithium-ion batteries require specialist handling due to the risk of thermal runaway if damaged."
  },
  {
    question: "Why do DC arcs not self-extinguish like AC arcs?",
    answer: "AC arcs naturally extinguish briefly at every zero-crossing point (100 times per second at 50 Hz), giving the arc gap a chance to de-ionise and recover its insulating properties. DC has no zero-crossing — the current is continuous — so once a DC arc is established, it is sustained indefinitely until the circuit is broken by external means. This is why DC circuit breakers and fuses require special arc-quenching mechanisms and are rated differently from AC devices."
  }
];

const MOETModule2Section2_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module2-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section Overview
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
            <span>Module 2.2.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Direct Current Principles
          </h1>
          <p className="text-white/80">
            Understanding DC characteristics, sources, applications and testing for electrical maintenance
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>DC flows in one direction</strong> — from negative to positive (conventional: positive to negative)</li>
              <li className="pl-1"><strong>Batteries</strong> — series increases voltage, parallel increases capacity</li>
              <li className="pl-1"><strong>Rectification</strong> — converts AC to DC via half-wave or full-wave bridge circuits</li>
              <li className="pl-1"><strong>Applications</strong> — battery systems, UPS, solar PV, EV charging, data centres</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Regulatory Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>BS 7671:2018+A3:2024:</strong> DC voltage bands — Band I up to 120 V DC</li>
              <li className="pl-1"><strong>BS EN 62040:</strong> UPS systems — DC battery maintenance</li>
              <li className="pl-1"><strong>EAWR 1989:</strong> Applies equally to DC and AC installations</li>
              <li className="pl-1"><strong>ST1426:</strong> Understand AC/DC systems and test equipment</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Describe the characteristics of direct current and how it differs from AC",
              "Explain battery construction, series and parallel connections, and capacity calculations",
              "Describe rectification methods including half-wave and full-wave bridge circuits",
              "Explain the function of smoothing capacitors and voltage regulators",
              "Identify DC motor types and their applications in industrial maintenance",
              "Carry out DC polarity testing and interpret measurements correctly"
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

        {/* Section 01: DC Characteristics */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            DC Characteristics and Sources
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Direct current (DC) is defined as electric current that flows in one direction only. Unlike alternating
              current, which reverses direction periodically, DC maintains a constant polarity — the positive terminal
              remains positive and the negative terminal remains negative at all times. The magnitude of DC may be
              perfectly constant (as from a regulated power supply) or may vary over time (as from a solar panel
              under changing cloud conditions), but the direction of current flow does not change.
            </p>
            <p>
              In electron flow terms, electrons move from the negative terminal through the external circuit to the
              positive terminal. Conventional current flow (used in circuit analysis and on all standard diagrams)
              is defined as flowing from positive to negative. Both conventions are correct — they simply describe
              the same phenomenon from different perspectives. As a maintenance technician, you must be comfortable
              with both conventions, though conventional current is used in virtually all circuit diagrams, equipment
              labels and test instrument readings.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Primary DC Sources</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Electrochemical cells and batteries:</strong> Convert chemical energy to electrical energy — the most fundamental DC source. Examples: lead-acid, lithium-ion, nickel-metal hydride, alkaline cells</li>
                <li className="pl-1"><strong>Photovoltaic (solar) cells:</strong> Convert light energy to electrical energy via the photovoltaic effect in semiconductor junctions. Output varies with irradiance and temperature</li>
                <li className="pl-1"><strong>DC generators (dynamos):</strong> Convert mechanical energy to DC via electromagnetic induction with a commutator. Largely replaced by alternators with rectifiers in modern installations</li>
                <li className="pl-1"><strong>Rectified AC supplies:</strong> AC converted to DC through diode rectifier circuits — the most common source of DC in industrial installations</li>
                <li className="pl-1"><strong>Thermocouples:</strong> Generate a small DC voltage from the junction of two dissimilar metals at different temperatures — used extensively in temperature measurement</li>
                <li className="pl-1"><strong>Fuel cells:</strong> Convert hydrogen and oxygen to electricity and water — emerging technology for backup power and transport</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">DC vs AC — Key Comparisons</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Parameter</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Direct Current (DC)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Alternating Current (AC)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Direction</td>
                      <td className="border border-white/10 px-3 py-2">Unidirectional</td>
                      <td className="border border-white/10 px-3 py-2">Reverses periodically</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Frequency</td>
                      <td className="border border-white/10 px-3 py-2">0 Hz (zero)</td>
                      <td className="border border-white/10 px-3 py-2">50 Hz (UK), 60 Hz (US)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Transformation</td>
                      <td className="border border-white/10 px-3 py-2">Requires DC-DC converters</td>
                      <td className="border border-white/10 px-3 py-2">Simple transformer action</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Transmission</td>
                      <td className="border border-white/10 px-3 py-2">Lower losses over long distance (HVDC)</td>
                      <td className="border border-white/10 px-3 py-2">Easier to step up/down for distribution</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Storage</td>
                      <td className="border border-white/10 px-3 py-2">Batteries store DC directly</td>
                      <td className="border border-white/10 px-3 py-2">Must be converted to DC for storage</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Arc behaviour</td>
                      <td className="border border-white/10 px-3 py-2">Sustained — no zero crossing</td>
                      <td className="border border-white/10 px-3 py-2">Self-extinguishes at zero crossing</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> DC is increasingly prevalent in modern installations. Solar PV, battery
              energy storage, EV charging, LED lighting and IT equipment all fundamentally operate on DC. The
              maintenance technician must be equally competent with DC systems as with traditional AC installations.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Battery Systems */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Battery Systems and Connections
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Batteries are the most common DC source encountered in electrical maintenance. From small control
              circuit batteries to large UPS battery banks and emergency lighting systems, understanding battery
              technology, connection methods and maintenance procedures is essential. A battery consists of one
              or more electrochemical cells that convert chemical energy into electrical energy through redox
              (reduction-oxidation) reactions.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Battery Types in Maintenance</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Lead-acid (flooded):</strong> Cell voltage 2.0 V. Used in UPS systems, standby power and emergency lighting. Requires electrolyte level checking, specific gravity testing and terminal cleaning. Produces hydrogen gas during charging — ventilation essential</li>
                <li className="pl-1"><strong>Lead-acid (VRLA/sealed):</strong> Cell voltage 2.0 V. Valve-regulated, maintenance-reduced (not maintenance-free). Used in UPS, telecommunications and fire alarm panels. No electrolyte topping-up but still requires temperature monitoring and impedance testing</li>
                <li className="pl-1"><strong>Lithium-ion (Li-ion):</strong> Cell voltage 3.6-3.7 V. High energy density, low self-discharge. Used in portable tools, EV charging infrastructure and battery energy storage systems (BESS). Requires battery management systems (BMS) and thermal monitoring</li>
                <li className="pl-1"><strong>Nickel-cadmium (NiCd):</strong> Cell voltage 1.2 V. Very robust, wide temperature range, long life. Used in industrial standby systems and emergency lighting. Being phased out due to cadmium toxicity (WEEE regulations)</li>
                <li className="pl-1"><strong>Nickel-metal hydride (NiMH):</strong> Cell voltage 1.2 V. Replacement for NiCd in many applications. Higher capacity, less toxic, but shorter cycle life</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Series and Parallel Battery Connections</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Connection</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Voltage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Capacity (Ah)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Series</td>
                      <td className="border border-white/10 px-3 py-2">V₁ + V₂ + V₃ ...</td>
                      <td className="border border-white/10 px-3 py-2">Same as one cell</td>
                      <td className="border border-white/10 px-3 py-2">UPS battery strings (e.g., 20 x 12 V = 240 V DC)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Parallel</td>
                      <td className="border border-white/10 px-3 py-2">Same as one cell</td>
                      <td className="border border-white/10 px-3 py-2">Ah₁ + Ah₂ + Ah₃ ...</td>
                      <td className="border border-white/10 px-3 py-2">Extended run-time applications</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Series-Parallel</td>
                      <td className="border border-white/10 px-3 py-2">Sum of series string</td>
                      <td className="border border-white/10 px-3 py-2">Sum of parallel strings</td>
                      <td className="border border-white/10 px-3 py-2">Large battery banks (BESS, telecom)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Battery Safety Hazards</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Short circuit:</strong> Batteries deliver massive fault currents — a spanner across lead-acid terminals can weld itself and cause explosive arcing</li>
                <li className="pl-1"><strong>Hydrogen gas:</strong> Lead-acid batteries produce hydrogen during charging — explosive concentration reached at 4% in air. Adequate ventilation and no ignition sources required</li>
                <li className="pl-1"><strong>Acid/alkali:</strong> Flooded lead-acid contains sulphuric acid, NiCd contains potassium hydroxide — both cause severe chemical burns. PPE essential</li>
                <li className="pl-1"><strong>Thermal runaway:</strong> Lithium-ion cells can enter thermal runaway if overcharged, physically damaged or operated above temperature limits — resulting in fire and toxic gas emission</li>
                <li className="pl-1"><strong>Stored energy:</strong> Battery banks cannot be isolated by simply turning off a switch — the battery itself is always live. Physical disconnection is required</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance tip:</strong> When working on battery systems, always start disconnection from the
              load side and work back towards the battery. When reconnecting, start from the battery and work
              towards the load. This minimises the risk of accidental short circuits through the load circuit.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Rectification and Smoothing */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Rectification and Smoothing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Rectification is the process of converting alternating current to direct current. In modern electrical
              installations, rectification is the most common method of producing DC — far more prevalent than DC
              generators. Every power supply unit, battery charger, variable speed drive and LED driver contains
              a rectifier stage. Understanding rectifier operation is essential for fault-finding and maintenance.
            </p>
            <p>
              Rectification relies on the unidirectional conduction property of semiconductor diodes. A diode
              conducts current freely in the forward direction (anode positive with respect to cathode) but blocks
              current in the reverse direction. By arranging diodes in specific configurations, the alternating
              half-cycles of an AC supply can be directed to produce a unidirectional (DC) output.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Rectifier Types</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Half-wave rectifier:</strong> Uses a single diode. Only the positive half-cycle passes; the negative half-cycle is blocked. Simple but inefficient — 50% of the input waveform is wasted. Ripple frequency equals the supply frequency (50 Hz). Average DC output = 0.318 x V_peak</li>
                <li className="pl-1"><strong>Full-wave centre-tap:</strong> Uses two diodes and a centre-tapped transformer. Both half-cycles are utilised, doubling the output frequency to 100 Hz. Requires a special transformer with a centre-tap — less common in modern circuits</li>
                <li className="pl-1"><strong>Full-wave bridge rectifier:</strong> Uses four diodes in a bridge configuration. Both half-cycles are utilised without requiring a centre-tapped transformer. The most common configuration in industrial power supplies. Ripple frequency = 100 Hz. Average DC output = 0.636 x V_peak</li>
                <li className="pl-1"><strong>Three-phase rectifier:</strong> Uses six diodes to rectify a three-phase supply. Produces a much smoother output with lower ripple (ripple frequency = 300 Hz). Used in industrial drives, large battery chargers and high-power DC supplies</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Smoothing and Regulation</p>
              <p className="text-sm text-white mb-3">
                The output of a rectifier is pulsating DC — it has the correct polarity but varies significantly
                in magnitude. For most applications, this ripple must be reduced by smoothing circuits.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Reservoir capacitor:</strong> A large electrolytic capacitor connected across the rectifier output. It charges to the peak voltage during conduction and discharges into the load between peaks, filling in the troughs. Larger capacitance = less ripple. Typical values: 1,000-10,000 μF</li>
                <li className="pl-1"><strong>LC filter:</strong> An inductor (choke) in series with the load and a capacitor in parallel. The inductor opposes changes in current while the capacitor opposes changes in voltage — together they provide superior smoothing for high-current applications</li>
                <li className="pl-1"><strong>Voltage regulator:</strong> Maintains a constant output voltage despite variations in input voltage or load current. Linear regulators (e.g., 7805, 7812 series) are simple but waste energy as heat. Switch-mode regulators are more efficient but produce higher-frequency noise</li>
                <li className="pl-1"><strong>Ripple voltage:</strong> The remaining AC component after smoothing. Expressed as peak-to-peak ripple voltage or as a percentage of the DC output. Acceptable ripple depends on the application — typically less than 1% for sensitive electronics</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Maintenance Warning — Capacitor Safety</p>
              <p className="text-sm text-white">
                Smoothing capacitors in power supplies and variable speed drives can retain a lethal charge for
                minutes or even hours after the supply is disconnected. A 400 V DC bus capacitor in a VSD can
                store sufficient energy to cause a fatal shock. Always follow the manufacturer's specified
                discharge time before working inside equipment. Verify with a suitable voltage indicator that
                the capacitors have discharged to a safe level. Never rely on bleeder resistors alone — they
                can fail open-circuit.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Fault-finding tip:</strong> A common failure in power supplies is a dried-out or failed
              smoothing capacitor. Symptoms include excessive ripple on the DC output, audible hum from
              connected equipment, flickering LED drivers and intermittent operation of sensitive electronics.
              An oscilloscope or a multimeter with AC measurement on the DC output can confirm excessive ripple.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: DC Motors and Industrial Distribution */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            DC Motors, Testing and Industrial Distribution
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Although AC induction motors dominate industrial applications, DC motors remain important in
              specific applications where precise speed control, high starting torque or battery-powered operation
              is required. Understanding DC motor types, their characteristics and common faults is an essential
              maintenance competency. Additionally, DC distribution is becoming increasingly relevant in data
              centres, renewable energy installations and electric vehicle charging infrastructure.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">DC Motor Types</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Permanent magnet (PMDC):</strong> Stator field from permanent magnets. Simple, compact, easy speed control via armature voltage. Used in cordless tools, small fans, automotive applications. Speed decreases with increasing load</li>
                <li className="pl-1"><strong>Shunt-wound:</strong> Field winding connected in parallel with the armature. Provides relatively constant speed under varying load — good for machine tools, conveyors and pumps. Speed controlled by field current or armature voltage</li>
                <li className="pl-1"><strong>Series-wound:</strong> Field winding in series with the armature. Very high starting torque — ideal for cranes, hoists, traction motors and starter motors. Speed varies greatly with load; must never be run unloaded (can reach dangerously high speeds)</li>
                <li className="pl-1"><strong>Compound-wound:</strong> Combines series and shunt field windings. Provides a compromise between the constant speed of shunt motors and the high starting torque of series motors. Used in rolling mills, presses and elevators</li>
                <li className="pl-1"><strong>Brushless DC (BLDC):</strong> Permanent magnet rotor, electronically commutated stator. No brushes to wear — very low maintenance. Used in fans, pumps, HVAC compressors and electric vehicles</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">DC Testing and Measurement</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Polarity verification:</strong> Use a multimeter on DC volts range. Positive reading = correct polarity; negative reading = reversed. Essential before connecting any polarity-sensitive equipment</li>
                <li className="pl-1"><strong>Battery voltage (open circuit):</strong> Measure across terminals with no load connected. Compare to the nominal voltage. A fully charged lead-acid cell reads approximately 2.1 V; fully discharged approximately 1.75 V</li>
                <li className="pl-1"><strong>Battery voltage (under load):</strong> Apply a known load and measure voltage. A significant voltage drop indicates high internal resistance and a degraded battery</li>
                <li className="pl-1"><strong>Ripple measurement:</strong> Set multimeter to AC volts and measure across a DC supply. The AC reading represents the ripple component. Alternatively, use an oscilloscope for a visual representation of ripple waveform</li>
                <li className="pl-1"><strong>Internal resistance:</strong> Measured using a dedicated battery impedance tester. Rising internal resistance over time indicates battery degradation. Trend monitoring is essential for predictive maintenance of UPS battery banks</li>
                <li className="pl-1"><strong>Insulation resistance:</strong> DC circuits require insulation resistance testing at appropriate voltage (typically 500 V DC for LV circuits). Minimum acceptable value per BS 7671: 1 MΩ for circuits up to 500 V</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">DC Distribution in Industry</p>
              <p className="text-sm text-white mb-3">
                DC distribution is experiencing a renaissance driven by the proliferation of DC-native loads
                and generation sources. Key applications include:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Data centres:</strong> 380 V DC distribution eliminates multiple AC-DC-AC conversion stages. Google, Facebook and other hyperscale operators have adopted DC distribution for efficiency gains of 5-15%</li>
                <li className="pl-1"><strong>Telecommunications:</strong> -48 V DC has been the standard telecom power system for decades. The negative polarity minimises electrolytic corrosion on copper conductors</li>
                <li className="pl-1"><strong>Solar PV:</strong> PV panels produce DC, which is fed to inverters for AC connection or used directly in DC-coupled battery systems. DC string voltages can exceed 1000 V — requiring HV DC competency</li>
                <li className="pl-1"><strong>EV charging:</strong> DC fast chargers (50-350 kW) deliver DC directly to the vehicle battery, bypassing the vehicle's onboard AC charger. Voltages up to 1000 V DC are used in high-power charging</li>
                <li className="pl-1"><strong>HVDC transmission:</strong> High-voltage DC (up to 800 kV) is used for long-distance bulk power transmission, submarine cables and interconnectors. Lower losses than equivalent AC over distances exceeding approximately 600 km</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The maintenance technician standard requires understanding of both
              AC and DC systems, including the ability to carry out testing, interpret results and maintain DC
              equipment safely. DC competency is increasingly important as the energy landscape evolves.
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
            title="Test Your Knowledge — DC Principles"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module2-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section Overview
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module2-section2-2">
              Next: AC Principles
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule2Section2_1;
