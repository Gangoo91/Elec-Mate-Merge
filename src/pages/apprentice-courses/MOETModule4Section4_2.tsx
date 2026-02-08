import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Component Removal and Replacement - MOET Module 4.4.2";
const DESCRIPTION = "Detailed guide to component removal and replacement for electrical maintenance: contactor, MCB/MCCB, motor bearing, relay, and drive replacement, like-for-like principles, upgrade considerations and de-rating factors under BS 7671 and ST1426.";

const quickCheckQuestions = [
  {
    id: "like-for-like",
    question: "What does the 'like-for-like' principle mean when replacing an electrical component?",
    options: [
      "The replacement must be the exact same brand",
      "The replacement must match the original component's electrical ratings, physical dimensions and functional characteristics",
      "The replacement must be the cheapest available option",
      "The replacement must be newer than the original"
    ],
    correctIndex: 1,
    explanation: "Like-for-like replacement means the new component must match the original in all critical parameters: voltage rating, current rating, breaking capacity, operational characteristics (e.g., trip curve for MCBs), physical dimensions, mounting arrangement and functional specification. The brand may differ provided all technical parameters are equivalent or superior."
  },
  {
    id: "contactor-replacement",
    question: "When replacing a contactor, which parameter is critical to check in addition to the voltage and current ratings?",
    options: [
      "The colour of the contactor housing",
      "The coil voltage and the AC utilisation category (e.g., AC-3 for motor starting)",
      "The manufacturer's country of origin",
      "The contactor's weight"
    ],
    correctIndex: 1,
    explanation: "The coil voltage must match the control circuit voltage (e.g., 24 V DC, 110 V AC, 230 V AC). The AC utilisation category (AC-1 for resistive loads, AC-3 for motor starting, AC-4 for plugging/inching) determines the contactor's ability to make and break the specific type of load current. An AC-1 rated contactor used on an AC-3 duty will fail prematurely due to the higher inrush and breaking currents involved in motor starting."
  },
  {
    id: "mcb-breaking",
    question: "Why is the breaking capacity (kA rating) of an MCB critical when selecting a replacement?",
    options: [
      "It determines how quickly the MCB trips under overload",
      "It determines the maximum fault current the MCB can safely interrupt without damage or danger",
      "It determines the MCB's lifespan in years",
      "It only matters for three-phase MCBs"
    ],
    correctIndex: 1,
    explanation: "The breaking capacity (rated short-circuit capacity, Icn) is the maximum prospective fault current the MCB can safely interrupt. If the fault current exceeds the MCB's breaking capacity, the device may fail to interrupt the fault, resulting in an explosion, fire or sustained arcing. BS 7671 Regulation 432.1 requires that the rated short-circuit capacity of protective devices is not less than the prospective fault current at the point of installation."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Before removing a contactor from a motor control centre, the first step should be:",
    options: [
      "Disconnect the motor cables",
      "Carry out safe isolation, proving dead at the point of work",
      "Order the replacement contactor",
      "Take a photograph for reference"
    ],
    correctAnswer: 1,
    explanation: "Safe isolation must always be the first step before any component removal. The circuit must be isolated, locked off, and proved dead at the point of work using the prove-test-prove procedure before any physical work begins. Photographs and labelling of connections should follow immediately after proving dead."
  },
  {
    id: 2,
    question: "When replacing an MCB, which of the following must match the original specification?",
    options: [
      "Brand name only",
      "Current rating, trip curve (B, C or D), breaking capacity, number of poles, and physical compatibility with the distribution board",
      "Colour and size only",
      "Only the current rating needs to match"
    ],
    correctAnswer: 1,
    explanation: "All critical parameters must match: current rating (In), trip curve (B for general, C for motor/transformer inrush, D for high inrush), breaking capacity (kA), number of poles, and physical compatibility with the distribution board busbar system. Additionally, the MCB must be from a manufacturer approved for use with that specific distribution board — mixing brands can compromise safety."
  },
  {
    id: 3,
    question: "Motor bearings typically need replacement when they exhibit:",
    options: [
      "A slight warmth during operation",
      "Excessive noise, vibration, heat, or play (radial/axial movement beyond manufacturer's tolerances)",
      "Discolouration of the bearing housing paint",
      "The motor has been in service for more than one year"
    ],
    correctAnswer: 1,
    explanation: "Bearing failure symptoms include excessive noise (rumbling, grinding, squealing), increased vibration (detectable by vibration analysis), elevated bearing temperature, visible play when the shaft is moved by hand, and grease leakage or contamination. Bearing replacement is based on condition monitoring data, not arbitrary time intervals."
  },
  {
    id: 4,
    question: "When replacing a protection relay (e.g., an overcurrent relay), what must be verified after installation?",
    options: [
      "That the relay fits neatly in the panel",
      "That the relay settings match the protection coordination study and the relay operates correctly when tested with a secondary injection test set",
      "That the relay display shows the correct time",
      "That the relay is the newest model available"
    ],
    correctAnswer: 1,
    explanation: "Protection relay replacement requires verification that the relay type, CT ratio settings, pickup values, time multiplier settings and curve characteristics match the protection coordination study for the circuit. A secondary injection test must be performed to confirm the relay trips at the correct current and time values. Incorrect relay settings can result in nuisance tripping or, more dangerously, failure to trip during a fault."
  },
  {
    id: 5,
    question: "What is 'de-rating' in the context of component replacement?",
    options: [
      "Reducing the performance rating of a component due to environmental conditions (temperature, altitude, enclosure) that reduce its ability to dissipate heat",
      "Replacing a component with a lower-rated alternative to save cost",
      "Removing the rating label from the old component",
      "Testing a component at a lower voltage than its rated voltage"
    ],
    correctAnswer: 0,
    explanation: "De-rating is the reduction in a component's effective capacity due to environmental conditions. For example, an MCB rated at 32 A in free air at 30°C may need to be de-rated to 28 A when installed in a fully populated distribution board at 40°C ambient. Manufacturers provide de-rating factors for temperature, altitude (above 2000 m), grouping, and enclosure type. Failing to account for de-rating can lead to premature failure or overheating."
  },
  {
    id: 6,
    question: "When replacing a variable speed drive (VSD), which additional consideration applies compared to replacing a simple contactor?",
    options: [
      "VSDs do not require safe isolation",
      "The drive parameters (motor data, ramp times, speed limits, protection settings, PID configuration) must be programmed to match the application requirements",
      "VSDs are always plug-and-play with no setup required",
      "Only the power connections need to be reconnected"
    ],
    correctAnswer: 1,
    explanation: "Variable speed drives require extensive parameter configuration including motor nameplate data (voltage, current, frequency, power, speed, cos phi), ramp up/down times, speed limits, current limits, braking configuration, I/O assignments, communication settings, and application-specific parameters. These should be documented before the old drive is removed and programmed into the replacement. Many drives allow parameter upload/download via software or a parameter copy module."
  },
  {
    id: 7,
    question: "What precaution should be taken when labelling connections before removing a component?",
    options: [
      "Use pencil markings on the wires",
      "Label both the conductor and the terminal with matching unique identifiers, photograph the arrangement, and record in writing",
      "Rely on memory",
      "Only label the power connections; control wires can be reconnected by trial and error"
    ],
    correctAnswer: 1,
    explanation: "Every connection must be labelled with a unique identifier on both the conductor and the terminal point. A photograph provides additional backup. Written records should note conductor colours, sizes, and terminal designations. This is especially important for control wiring where multiple conductors of the same colour may be present. Reconnecting conductors to wrong terminals can cause equipment damage, incorrect operation, or safety hazards."
  },
  {
    id: 8,
    question: "MCCB replacement differs from MCB replacement primarily because:",
    options: [
      "MCCBs are always cheaper than MCBs",
      "MCCBs typically have adjustable trip settings (Ir, Isd, Ii) that must be correctly configured for the specific application, and their higher breaking capacities require careful verification against prospective fault current",
      "MCCBs do not need to match the original specification",
      "MCCBs can only be replaced by the manufacturer"
    ],
    correctAnswer: 1,
    explanation: "Moulded case circuit breakers (MCCBs) typically have adjustable overload (Ir), short-delay short-circuit (Isd) and instantaneous short-circuit (Ii) trip settings that must be configured to match the protection coordination study. Their higher breaking capacities (up to 150 kA) require verification against the prospective fault current. Additionally, MCCBs may have earth fault protection, zone selective interlocking (ZSI) and communication modules that must be correctly configured."
  },
  {
    id: 9,
    question: "When pressing out and pressing in motor bearings, the correct technique is to:",
    options: [
      "Apply force to whichever ring is most accessible",
      "Apply pressing force to the ring being fitted — inner ring when pressing onto the shaft, outer ring when pressing into the housing — never through the rolling elements",
      "Heat the bearing to 200°C and drop it onto the shaft",
      "Use a hammer and drift on the bearing cage"
    ],
    correctAnswer: 1,
    explanation: "Force must always be applied to the ring being fitted: to the inner ring when pressing onto a shaft, and to the outer ring when pressing into a housing. Force transmitted through the rolling elements (balls or rollers) causes brinelling — permanent dents in the raceways that lead to premature failure, noise and vibration. Induction heaters or oil baths (80-100°C maximum) can be used to expand the inner ring for interference fits, but excessive heat damages bearing seals and lubricant."
  },
  {
    id: 10,
    question: "After replacing a relay in a control circuit, the control sequence should be verified by:",
    options: [
      "Energising the full system immediately and observing",
      "Systematically testing each function of the relay — pickup, dropout, timing, contact configuration — and verifying the complete control sequence operates correctly before applying power to the final load",
      "Checking that the relay light is on",
      "Asking the operator if it feels right"
    ],
    correctAnswer: 1,
    explanation: "Relay function must be verified systematically: confirm coil voltage and pickup/dropout operation, check contact configuration (NO/NC) matches the circuit requirements, verify timing functions if applicable, and test the complete control sequence step by step. Only after confirming correct control circuit operation should power be applied to the load. This prevents equipment damage from incorrect control sequencing."
  },
  {
    id: 11,
    question: "If an exact like-for-like replacement component is no longer available due to obsolescence, the maintenance technician should:",
    options: [
      "Fit any component that physically fits",
      "Consult the manufacturer's recommended equivalent, verify all critical parameters meet or exceed the original specification, and document the substitution including any design change implications",
      "Leave the equipment out of service indefinitely",
      "Modify the mounting to fit an unrelated component"
    ],
    correctAnswer: 1,
    explanation: "When a like-for-like replacement is unavailable, the technician should identify the manufacturer's recommended replacement or cross-reference equivalent. All critical parameters must be verified: ratings, characteristics, physical compatibility and functional equivalence. The substitution must be documented as a design change, and the implications for protection coordination, space, ventilation and maintenance access must be assessed. This may require sign-off from a competent designer."
  },
  {
    id: 12,
    question: "What is the recommended torque for electrical connections, and why does it matter?",
    options: [
      "As tight as possible using maximum force",
      "Hand-tight only — torque tools are unnecessary",
      "The manufacturer's specified torque value for the terminal type — insufficient torque causes high-resistance joints and overheating; excessive torque damages threads, terminals and conductors",
      "Torque requirements only apply to high-voltage connections"
    ],
    correctAnswer: 2,
    explanation: "Electrical connections must be tightened to the manufacturer's specified torque value using a calibrated torque tool. Under-torqued connections result in high-resistance joints that cause localised heating, potentially leading to fire, insulation damage and equipment failure. Over-torqued connections damage threads, deform terminals and can sever conductor strands, also creating unreliable connections. BS 7671 Regulation 526.2 requires that connections are mechanically sound and electrically reliable."
  }
];

const faqs = [
  {
    question: "Can I replace a Type B MCB with a Type C if the same current rating is available?",
    answer: "No — not without an engineering assessment. Type B MCBs trip at 3-5 times rated current (designed for resistive and lightly inductive loads). Type C MCBs trip at 5-10 times rated current (designed for motor and transformer inrush). Replacing a Type B with a Type C on a socket circuit would increase the let-through energy during a fault and may exceed the cable's energy withstand capability, violating BS 7671 Regulation 434.5.2. The trip curve must match the original design intent."
  },
  {
    question: "How do I know if a motor bearing needs replacing versus just re-greasing?",
    answer: "Vibration analysis is the most reliable indicator. Elevated vibration at bearing-related frequencies (BPFO, BPFI, BSF, FTF) indicates bearing damage that cannot be resolved by re-greasing. Additionally, if the bearing exhibits audible noise (rumbling, grinding), excessive temperature, visible contamination in the grease, or any detectable play when the shaft is moved by hand, replacement is required. Re-greasing is appropriate for bearings showing normal wear and no damage indicators during routine maintenance."
  },
  {
    question: "What documentation should I complete when replacing a component?",
    answer: "Document the following: description of the fault, original component details (make, model, ratings, serial number), replacement component details (same information), date and time of replacement, tests carried out before and after (IR, continuity, functional), any settings or parameters configured, the name of the person carrying out the work, and any deviations from like-for-like. This documentation forms part of the asset maintenance history and supports future troubleshooting, warranty claims and regulatory compliance."
  },
  {
    question: "Why should I photograph connections before removal?",
    answer: "Photographs provide an invaluable reference for reconnection, especially in complex control panels where multiple conductors of similar colours connect to adjacent terminals. They supplement written labels (which can fall off or become illegible) and help resolve disputes about the original configuration. Photographs also document the condition of the equipment before your intervention, which can be important if further issues arise. Take clear, well-lit photographs from multiple angles before disconnecting anything."
  },
  {
    question: "Can I upgrade a component to a higher-rated replacement as a safety margin?",
    answer: "Upgrading ratings requires careful consideration. For protective devices (MCBs, fuses, MCCBs), increasing the current rating can compromise cable protection — the conductor may overheat before the device trips. For contactors and switchgear, a higher-rated device is generally acceptable provided it is physically compatible and the protection coordination is maintained. Any upgrade must be treated as a design change and assessed by a competent person for its impact on the overall installation safety."
  }
];

const MOETModule4Section4_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section4">
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
            <span>Module 4.4.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Component Removal and Replacement
          </h1>
          <p className="text-white/80">
            Correct procedures for removing and replacing contactors, MCBs, MCCBs, motor bearings, relays and drives
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Like-for-like:</strong> Match all ratings, characteristics and dimensions</li>
              <li className="pl-1"><strong>Label everything:</strong> Photograph and label all connections before removal</li>
              <li className="pl-1"><strong>De-rating:</strong> Account for temperature, grouping and enclosure effects</li>
              <li className="pl-1"><strong>Torque:</strong> Use manufacturer-specified values for all connections</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Component Types Covered</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Contactors:</strong> Coil voltage, utilisation category, auxiliary contacts</li>
              <li className="pl-1"><strong>MCBs/MCCBs:</strong> Trip curves, breaking capacity, adjustable settings</li>
              <li className="pl-1"><strong>Motor bearings:</strong> Pressing techniques, alignment, lubrication</li>
              <li className="pl-1"><strong>Relays and drives:</strong> Parameter transfer, functional verification</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Describe the correct procedure for removing and replacing contactors, including coil voltage and utilisation category selection",
              "Explain MCB and MCCB replacement considerations including trip curves, breaking capacity and adjustable settings",
              "Outline motor bearing replacement techniques including pressing, alignment and lubrication",
              "Identify the critical parameters for relay and variable speed drive replacement",
              "Apply like-for-like principles and recognise when upgrade considerations require a design change assessment",
              "Calculate and apply de-rating factors for temperature, altitude, grouping and enclosure effects"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Contactor and Relay Replacement
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Contactors are electromechanical switching devices used to control motors, heating loads, lighting
              and other high-current circuits. They are among the most frequently replaced components in industrial
              maintenance because their contacts wear over time due to arcing during switching operations. Correct
              replacement requires matching several critical parameters beyond the simple current rating.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Contactor Replacement — Critical Parameters</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Rated operational current (Ie):</strong> Must match or exceed the full load current of the controlled load</li>
                <li className="pl-1"><strong>Rated operational voltage (Ue):</strong> Must be suitable for the system voltage (e.g., 400 V AC)</li>
                <li className="pl-1"><strong>Coil voltage:</strong> Must match the control circuit voltage exactly (e.g., 24 V DC, 110 V AC, 230 V AC)</li>
                <li className="pl-1"><strong>AC utilisation category:</strong> AC-1 (resistive), AC-3 (motor starting), AC-4 (plugging/inching) — each has different making and breaking requirements</li>
                <li className="pl-1"><strong>Number of poles:</strong> Typically 3-pole for three-phase motor control, but 4-pole for switching the neutral</li>
                <li className="pl-1"><strong>Auxiliary contacts:</strong> Number and configuration of NO (normally open) and NC (normally closed) auxiliary contacts for control interlocking</li>
                <li className="pl-1"><strong>Physical dimensions:</strong> Frame size, mounting centres, terminal orientation must be compatible with the existing panel layout</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Relay Replacement Considerations</p>
              <p className="text-sm text-white mb-3">
                Control relays, timer relays and protection relays each have specific replacement requirements.
                The type of relay determines the critical parameters.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Control relays:</strong> Coil voltage, contact configuration (SPDT, DPDT, 4PDT), contact rating, base socket compatibility</li>
                <li className="pl-1"><strong>Timer relays:</strong> Timing function (on-delay, off-delay, star-delta, pulse), timing range, display type, connection diagram</li>
                <li className="pl-1"><strong>Protection relays:</strong> Protection function (overcurrent, earth fault, differential), CT ratio, pickup settings, time-current curves, communication protocol</li>
                <li className="pl-1"><strong>Safety relays:</strong> SIL rating (Safety Integrity Level), category (BS EN ISO 13849-1), redundancy requirements — safety relays must be certified for the application</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Common Mistake — Contact Wear Assessment</p>
              <p className="text-sm text-white">
                Before replacing a contactor, inspect the contacts for wear. If the silver contact layer has
                worn through to the copper base material, replacement is required. However, light pitting
                and discolouration of the contacts is normal and does NOT require replacement. Never file
                or dress contactor contacts — this removes the silver layer and accelerates wear. Contact
                tips are available as replaceable spare parts for many contactor ranges, avoiding the need
                to replace the entire contactor.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            MCB and MCCB Replacement
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Miniature circuit breakers (MCBs) and moulded case circuit breakers (MCCBs) are protective devices
              that must be correctly specified to provide both overload and short-circuit protection for the cables
              and equipment they protect. Incorrect replacement can result in a failure to protect against faults,
              potentially leading to fire or electrocution.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">MCB Trip Curves</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Curve</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Magnetic Trip Range</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Type B</td>
                      <td className="border border-white/10 px-3 py-2">3-5 x In</td>
                      <td className="border border-white/10 px-3 py-2">Domestic, commercial — resistive and lightly inductive loads</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Type C</td>
                      <td className="border border-white/10 px-3 py-2">5-10 x In</td>
                      <td className="border border-white/10 px-3 py-2">Motors, transformers, fluorescent lighting — moderate inrush</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Type D</td>
                      <td className="border border-white/10 px-3 py-2">10-20 x In</td>
                      <td className="border border-white/10 px-3 py-2">Welding equipment, X-ray machines, large motors — high inrush</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">MCCB Adjustable Settings</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Ir (overload):</strong> Adjustable from typically 0.63-1.0 x In — sets the thermal overload trip threshold</li>
                <li className="pl-1"><strong>tr (overload time):</strong> Some MCCBs allow adjustment of the thermal trip time characteristic</li>
                <li className="pl-1"><strong>Isd (short-delay):</strong> Adjustable short-circuit trip level — provides time delay for coordination with downstream devices</li>
                <li className="pl-1"><strong>tsd (short-delay time):</strong> Time delay for the short-circuit trip — 0 to 0.4 seconds typically</li>
                <li className="pl-1"><strong>Ii (instantaneous):</strong> Non-adjustable or adjustable instantaneous trip for high fault currents</li>
                <li className="pl-1"><strong>Ig (earth fault):</strong> Some MCCBs include adjustable earth fault protection</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Breaking Capacity Verification</p>
              <p className="text-sm text-white">
                The replacement MCB or MCCB must have a breaking capacity (Icn or Icu) that equals or exceeds
                the prospective fault current (Ipf) at the point of installation. This is a fundamental requirement
                of BS 7671 Regulation 432.1. If the Ipf has increased since the original installation (e.g., due
                to a transformer upgrade or network changes), the replacement device may need a higher breaking
                capacity than the original. Always verify the current Ipf before selecting a replacement.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Motor Bearing Replacement
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Motor bearings are the most common failure point in electric motors. They support the rotor shaft,
              maintain the air gap between rotor and stator, and must handle radial and axial loads during
              operation. Correct bearing replacement technique is essential — improper handling or installation
              is the leading cause of premature bearing failure, often resulting in the replacement bearing
              lasting only a fraction of its design life.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Bearing Replacement Procedure</p>
              <ol className="text-sm text-white space-y-2 list-decimal list-outside ml-5">
                <li className="pl-1"><strong>Record bearing designation:</strong> Note the bearing number from the old bearing or motor nameplate (e.g., 6205-2RS, 6308-ZZ)</li>
                <li className="pl-1"><strong>Inspect shaft and housing:</strong> Check for scoring, corrosion, wear marks or damage. Measure shaft and housing dimensions against manufacturer's tolerance</li>
                <li className="pl-1"><strong>Remove old bearing:</strong> Use a bearing puller — never prise with a screwdriver. Apply force to the inner ring only. Inspect the removed bearing for failure mode evidence</li>
                <li className="pl-1"><strong>Clean surfaces:</strong> Clean the shaft and housing bore thoroughly with a suitable solvent. Remove all traces of old grease and contaminants</li>
                <li className="pl-1"><strong>Install new bearing:</strong> Press the inner ring onto the shaft using a bearing press or induction heater (80-100°C max). Never apply force through the rolling elements</li>
                <li className="pl-1"><strong>Lubricate:</strong> Apply the correct type and quantity of grease. Over-greasing causes overheating; under-greasing causes premature wear</li>
                <li className="pl-1"><strong>Reassemble:</strong> Ensure correct endplay, check shaft rotates freely, verify alignment</li>
              </ol>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Bearing Failure Modes</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Fatigue spalling:</strong> Flaking of raceway surface — natural end-of-life failure mode</li>
                <li className="pl-1"><strong>Brinelling:</strong> Permanent dents in raceways from excessive static load or installation damage</li>
                <li className="pl-1"><strong>Fretting corrosion:</strong> Rust-coloured wear on shaft or housing contact surfaces from micro-movement (loose fit)</li>
                <li className="pl-1"><strong>Contamination:</strong> Ingress of dirt, moisture or process material past the seals</li>
                <li className="pl-1"><strong>Electrical pitting:</strong> Craters caused by bearing currents (common with VSD-fed motors without shaft grounding)</li>
                <li className="pl-1"><strong>Lubrication failure:</strong> Overheating, discolouration and destruction from insufficient, excessive or incorrect lubricant</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Drive Replacement, Upgrade Considerations and De-Rating
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Variable speed drives (VSDs) require particular care during replacement because they contain
              extensive parameter configurations that control the motor's operation. Additionally, when
              considering upgrades or substitute components, de-rating factors must be applied to ensure
              the replacement operates within safe limits in the actual installation environment.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">VSD Replacement Procedure</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Back up parameters:</strong> Download all drive parameters using the manufacturer's software, a parameter copy module, or manual recording. Include motor data, ramp times, speed limits, protection settings, I/O assignments and communication settings</li>
                <li className="pl-1"><strong>Verify compatibility:</strong> Confirm the replacement drive has the same power rating, voltage, control mode capability (V/f, vector, servo), communication protocol and I/O configuration</li>
                <li className="pl-1"><strong>Physical installation:</strong> Ensure adequate ventilation clearances, cable routing and EMC considerations (screened motor cables, cable glands)</li>
                <li className="pl-1"><strong>Upload parameters:</strong> Program all parameters into the replacement drive. If migrating to a different manufacturer, parameters must be translated to the new drive's parameter structure</li>
                <li className="pl-1"><strong>Commission:</strong> Run the motor uncoupled where possible, check rotation direction, verify speed reference tracking, test all protection functions, then couple and load test</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">De-Rating Factors</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Ambient temperature:</strong> Standard ratings assume 40°C ambient. Higher temperatures require de-rating — typically 2-3% per degree above 40°C</li>
                <li className="pl-1"><strong>Altitude:</strong> Above 1000 m (some manufacturers 2000 m), reduced air density impairs cooling. Typical de-rating: 1% per 100 m above the threshold</li>
                <li className="pl-1"><strong>Switching frequency:</strong> VSD output switching frequency affects power loss. Higher switching frequencies improve motor performance but require drive de-rating</li>
                <li className="pl-1"><strong>Grouping:</strong> Multiple components in the same enclosure increase the ambient temperature for each device</li>
                <li className="pl-1"><strong>Enclosure type:</strong> Sealed enclosures (IP54/65) without forced ventilation require greater de-rating than ventilated enclosures</li>
                <li className="pl-1"><strong>Duty cycle:</strong> Continuous duty vs intermittent duty — heavy-duty applications (frequent starting/stopping) may require de-rating or upsizing</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The ability to correctly remove, replace and commission electrical
              components is a core maintenance technician competence. Understanding like-for-like principles,
              de-rating factors and the importance of documentation demonstrates the professional approach
              expected of a qualified maintenance technician.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

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

        <hr className="border-white/5 my-12" />

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge — Component Removal and Replacement"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section4-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Safe Isolation
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section4-3">
              Next: Cable Jointing and Termination
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule4Section4_2;
