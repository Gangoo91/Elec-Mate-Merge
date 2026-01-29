import { ArrowLeft, Wind, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Terminal Units - HNC Module 8 Section 3.4";
const DESCRIPTION = "Master HVAC terminal units for building services: fan coil units (2-pipe, 4-pipe), active and passive chilled beams, cassette units, VAV boxes, control valves, EC fan motors, and condensate drainage requirements.";

const quickCheckQuestions = [
  {
    id: "fcu-pipe-config",
    question: "What is the main advantage of a 4-pipe fan coil unit over a 2-pipe system?",
    options: ["Lower installation cost", "Reduced maintenance requirements", "Simultaneous heating and cooling capability in different zones", "Smaller physical footprint"],
    correctIndex: 2,
    explanation: "4-pipe FCUs have separate heating and cooling coils with independent pipework, allowing simultaneous heating and cooling in different zones. This is essential for buildings where some zones need cooling (south-facing) while others need heating (north-facing) at the same time."
  },
  {
    id: "chilled-beam-type",
    question: "What distinguishes an active chilled beam from a passive chilled beam?",
    options: ["Active beams use refrigerant directly", "Active beams incorporate a primary air supply that induces room air across the coil", "Active beams have built-in fans", "Active beams only provide cooling"],
    correctIndex: 1,
    explanation: "Active chilled beams use a primary air supply (ducted from an AHU) that passes through nozzles, inducing room air across the cooling coil through the venturi effect. Passive beams rely solely on natural convection with no primary air connection."
  },
  {
    id: "control-valve-type",
    question: "When should a 3-way control valve be used instead of a 2-way valve on a chilled water terminal unit?",
    options: ["When precise temperature control is required", "When the system uses constant flow primary pumping", "When condensate management is critical", "When the unit has an EC motor"],
    correctIndex: 1,
    explanation: "3-way valves maintain constant flow through the system by bypassing water around the coil when not needed. They are used with constant flow pumping systems. 2-way valves are preferred for variable flow systems as they allow pump speed reduction when demand drops."
  },
  {
    id: "condensate-requirement",
    question: "What is the minimum recommended fall for FCU condensate drain pipework?",
    options: ["1:10 (10%)", "1:50 (2%)", "1:100 (1%)", "1:200 (0.5%)"],
    correctIndex: 2,
    explanation: "A minimum fall of 1:100 (1% or 10mm per metre) is typically required for condensate drainage to ensure water flows freely to the drain point. Steeper gradients (1:50) are preferred where possible to prevent standing water and biological growth."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A 2-pipe fan coil unit system requires changeover between heating and cooling modes. What does this mean?",
    options: [
      "The fan speed must be manually adjusted",
      "The entire building system must switch between circulating chilled water and hot water",
      "Individual units can switch between modes independently",
      "The electrical supply must be isolated during changeover"
    ],
    correctAnswer: 1,
    explanation: "In a 2-pipe system, the same pipework serves both heating and cooling. The central plant must switch ('changeover') between producing chilled water and hot water for the whole building, meaning all zones operate in the same mode."
  },
  {
    id: 2,
    question: "What is the typical sensible cooling capacity range for a ceiling-mounted cassette unit in an office application?",
    options: ["0.5 - 1.5 kW", "2 - 8 kW", "15 - 25 kW", "50 - 100 kW"],
    correctAnswer: 1,
    explanation: "Ceiling cassette units typically provide 2-8 kW sensible cooling capacity, making them suitable for individual offices, meeting rooms, and retail spaces. Larger spaces may require multiple units or alternative terminal types."
  },
  {
    id: 3,
    question: "Why must chilled water flow temperature to passive chilled beams typically be maintained above 14°C?",
    options: [
      "To maximise cooling output",
      "To prevent condensation forming on the beam surfaces",
      "To reduce pump energy consumption",
      "To comply with F-gas regulations"
    ],
    correctAnswer: 1,
    explanation: "Passive chilled beams have no condensate drainage provision. The chilled water temperature must be kept above the room dew point (typically 14-16°C for office conditions) to prevent condensation forming on the beam surfaces."
  },
  {
    id: 4,
    question: "An EC (electronically commutated) fan motor in an FCU offers advantages over an AC induction motor. Which statement is correct?",
    options: [
      "EC motors are cheaper to purchase",
      "EC motors offer variable speed control with high efficiency across the speed range",
      "EC motors require no electrical connection",
      "EC motors can only operate at fixed speeds"
    ],
    correctAnswer: 1,
    explanation: "EC motors incorporate permanent magnets and electronic commutation, providing efficient variable speed operation with typical efficiency of 80-90% even at part load. AC motors lose significant efficiency when speed-controlled via voltage reduction."
  },
  {
    id: 5,
    question: "What is the primary function of a VAV (Variable Air Volume) terminal box?",
    options: [
      "To filter the supply air",
      "To modulate airflow to a zone based on temperature demand",
      "To provide heating via a hot water coil",
      "To humidify the supply air"
    ],
    correctAnswer: 1,
    explanation: "VAV boxes modulate the volume of conditioned air delivered to a zone by adjusting a damper position. This varies the cooling/heating capacity while maintaining constant supply air temperature from the central AHU."
  },
  {
    id: 6,
    question: "A fan coil unit specification states 'Delta P = 40 kPa'. What does this indicate?",
    options: [
      "The unit's fan static pressure capability",
      "The pressure drop across the coil at design water flow rate",
      "The maximum allowable system pressure",
      "The condensate pump discharge pressure"
    ],
    correctAnswer: 1,
    explanation: "Delta P (pressure drop) across the coil is critical for system hydraulic design. The water circuit must overcome this resistance plus pipework losses. A 40 kPa coil pressure drop is typical for FCUs."
  },
  {
    id: 7,
    question: "Which control signal type provides the most precise modulation of a chilled water valve on a fan coil unit?",
    options: [
      "On/off switching",
      "3-point floating control",
      "0-10V DC analogue signal",
      "Manual handwheel adjustment"
    ],
    correctAnswer: 2,
    explanation: "0-10V DC (or 4-20mA) analogue signals provide proportional, continuous modulation of valve position. This enables precise temperature control compared to on/off (cycling) or 3-point (incremental adjustment) control methods."
  },
  {
    id: 8,
    question: "What is the typical induction ratio for an active chilled beam?",
    options: [
      "1:1 - equal primary and induced air",
      "1:3 to 1:5 - three to five times more room air than primary air",
      "1:10 - ten times more room air",
      "No induction occurs in active beams"
    ],
    correctAnswer: 1,
    explanation: "Active chilled beams typically achieve induction ratios of 1:3 to 1:5, meaning for every 1 volume of primary air, 3-5 volumes of room air are induced across the cooling coil. This provides significant cooling with minimal ductwork."
  },
  {
    id: 9,
    question: "A 4-way ceiling cassette unit has adjustable louvres. What is the primary purpose of individual louvre control?",
    options: [
      "To reduce noise levels",
      "To direct airflow away from occupants and optimise air distribution",
      "To increase cooling capacity",
      "To reduce condensate production"
    ],
    correctAnswer: 1,
    explanation: "Adjustable louvres allow airflow direction to be optimised for the room layout, avoiding direct air streams onto occupants (draughts) while ensuring good air distribution. Modern units offer individual louvre angle control via the controller."
  },
  {
    id: 10,
    question: "What is the purpose of a condensate pump on a fan coil unit?",
    options: [
      "To increase cooling capacity",
      "To lift condensate to a drain point when gravity drainage is not possible",
      "To circulate chilled water through the coil",
      "To provide humidity control"
    ],
    correctAnswer: 1,
    explanation: "When FCUs are positioned below the nearest drain connection or where gravity falls cannot be achieved, a condensate pump lifts the water to the drainage system. Pumps typically include a float switch and alarm contact."
  },
  {
    id: 11,
    question: "For a VRF cassette unit, what determines the refrigerant pipe sizes to the indoor unit?",
    options: [
      "The electrical supply cable size",
      "The unit cooling/heating capacity and equivalent refrigerant pipe length",
      "The ceiling void height only",
      "The drain pipe diameter"
    ],
    correctAnswer: 1,
    explanation: "Refrigerant pipe sizing depends on the unit capacity (refrigerant flow rate) and the equivalent pipe length including fittings. Manufacturer sizing tables must be followed precisely to ensure correct refrigerant distribution and oil return."
  },
  {
    id: 12,
    question: "What minimum electrical protection is typically required for a fan coil unit with EC motor and electric reheat?",
    options: [
      "Fused spur only",
      "MCB protection with RCD where accessible to non-skilled persons",
      "No protection required as units are low voltage",
      "Manual isolator only"
    ],
    correctAnswer: 1,
    explanation: "FCUs require MCB protection sized for the total load (fan motor plus any electric reheat). RCD protection (30mA) is required where units are accessible to non-skilled persons per BS 7671. An adjacent isolator is also typically required for maintenance."
  }
];

const faqs = [
  {
    question: "What are the main differences between fan coil units and chilled beams?",
    answer: "Fan coil units use a fan to force air across coils, providing higher capacity in a compact size but with fan noise and energy consumption. They can handle latent loads (dehumidification) with condensate drainage. Chilled beams are passive or use induced airflow with no local fans - they are quieter and require less maintenance but cannot handle latent loads (no condensate collection) and need careful dewpoint control to prevent condensation."
  },
  {
    question: "How do I select between 2-pipe and 4-pipe fan coil systems?",
    answer: "2-pipe systems are simpler and cheaper to install but require building-wide changeover between heating and cooling modes - suitable for buildings with uniform loads. 4-pipe systems have independent heating and cooling coils allowing simultaneous operation in different zones - essential for buildings with diverse orientations, internal heat gains, or 24/7 areas requiring year-round cooling alongside perimeter heating."
  },
  {
    question: "What causes condensation problems with chilled water terminal units?",
    answer: "Condensation occurs when surface temperatures fall below the room air dewpoint. For FCUs, this is normal and managed via drip trays and drainage. For chilled beams without drainage, water temperature must stay above dewpoint (typically 14-16°C minimum). Problems arise from: low chilled water temperatures, high room humidity, inadequate dehumidification by the primary air system, or poor commissioning of water temperature controls."
  },
  {
    question: "What are the electrical requirements for fan coil unit installations?",
    answer: "Typical FCU electrical requirements include: single-phase 230V supply (some larger units need 3-phase), MCB protection sized for fan motor plus any electric reheat (typically 6-16A), local isolator within 1m for maintenance, control wiring (0-10V, DALI, or BACnet) to BMS, and sometimes separate supplies for condensate pumps. Ensure compliance with BS 7671 including RCD protection where applicable."
  },
  {
    question: "How do VAV boxes differ from fan coil units in terms of control strategy?",
    answer: "VAV boxes modulate supply airflow volume (via damper) while receiving air at constant temperature from a central AHU - they control capacity by varying airflow. FCUs typically receive water at constant temperature and control capacity by modulating water flow or fan speed - they handle their own conditioning locally. VAV systems are more energy-efficient for cooling but require careful minimum airflow settings to maintain ventilation."
  },
  {
    question: "What maintenance considerations affect terminal unit selection?",
    answer: "Key maintenance factors include: filter access frequency and ease (monthly for FCUs in dusty environments), condensate drain cleaning requirements, coil cleaning accessibility, fan/motor replacement complexity, and control component access. Ceiling-mounted units need adequate void space and access panels. Chilled beams require less maintenance than FCUs (no filters, fans, or condensate) but coil cleaning access is still needed."
  }
];

const HNCModule8Section3_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section3">
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
            <span>Module 8.3.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Terminal Units
          </h1>
          <p className="text-white/80 text-lg">
            Fan coil units, chilled beams, cassettes, unit selection and control strategies
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>FCUs:</strong> Fan-driven, high capacity, handles latent loads</li>
              <li className="pl-1"><strong>Chilled beams:</strong> Quiet, low maintenance, sensible only</li>
              <li className="pl-1"><strong>2-pipe vs 4-pipe:</strong> Changeover vs simultaneous H/C</li>
              <li className="pl-1"><strong>Control:</strong> 2-way valves for variable flow systems</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Selection:</strong> Based on load, noise, ceiling void, access</li>
              <li className="pl-1"><strong>Electrical:</strong> MCB protection, isolators, control wiring</li>
              <li className="pl-1"><strong>Commissioning:</strong> Water flow, air balance, controls</li>
              <li className="pl-1"><strong>Standards:</strong> BS EN 1397, BS EN 15116</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Compare 2-pipe and 4-pipe fan coil unit configurations",
              "Distinguish between active and passive chilled beam operation",
              "Select appropriate terminal units for different applications",
              "Specify control valves and actuators for HVAC systems",
              "Understand EC motor advantages and electrical requirements",
              "Design condensate drainage systems for terminal units"
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

        {/* Section 1: Fan Coil Units */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Fan Coil Units (FCUs)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Fan coil units are the most common terminal devices in commercial HVAC systems. They consist of
              a fan, one or more heat exchanger coils, a filter, and a drip tray, all housed in a compact
              enclosure. FCUs provide localised heating and cooling with individual zone control capability.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">FCU Configurations</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5">
                  <p className="text-sm font-medium text-white mb-2">2-Pipe System</p>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">Single coil serves both heating and cooling</li>
                    <li className="pl-1">One flow and one return pipe per unit</li>
                    <li className="pl-1">Building-wide changeover required</li>
                    <li className="pl-1">Lower capital cost, simpler pipework</li>
                    <li className="pl-1">Suitable for uniform load buildings</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5">
                  <p className="text-sm font-medium text-white mb-2">4-Pipe System</p>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">Separate heating and cooling coils</li>
                    <li className="pl-1">Four pipes: CHW flow/return + HHW flow/return</li>
                    <li className="pl-1">Simultaneous heating and cooling capability</li>
                    <li className="pl-1">Higher capital cost, more complex</li>
                    <li className="pl-1">Essential for diverse load buildings</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">FCU Mounting Types</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Location</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Applications</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ceiling concealed</td>
                      <td className="border border-white/10 px-3 py-2">Above suspended ceiling</td>
                      <td className="border border-white/10 px-3 py-2">Offices, hotels - most common type</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ceiling exposed</td>
                      <td className="border border-white/10 px-3 py-2">Below ceiling, visible</td>
                      <td className="border border-white/10 px-3 py-2">Industrial, retail where voids unavailable</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Floor standing</td>
                      <td className="border border-white/10 px-3 py-2">At floor level</td>
                      <td className="border border-white/10 px-3 py-2">Perimeter heating, glazed facades</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Vertical</td>
                      <td className="border border-white/10 px-3 py-2">Wall or column mounted</td>
                      <td className="border border-white/10 px-3 py-2">Where floor/ceiling space limited</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Horizontal ducted</td>
                      <td className="border border-white/10 px-3 py-2">In ceiling void with ductwork</td>
                      <td className="border border-white/10 px-3 py-2">Larger zones, distributed outlets</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Typical FCU Specifications</p>
              <div className="text-sm space-y-1">
                <p><span className="text-white/60">Cooling capacity:</span> <span className="text-white">1.5 - 15 kW sensible (typical office units)</span></p>
                <p><span className="text-white/60">Fan motor:</span> <span className="text-white">20 - 150W (EC motors preferred)</span></p>
                <p><span className="text-white/60">Airflow:</span> <span className="text-white">150 - 1500 m³/h (3-speed or variable)</span></p>
                <p><span className="text-white/60">Coil pressure drop:</span> <span className="text-white">20 - 50 kPa at design flow</span></p>
                <p><span className="text-white/60">Noise level:</span> <span className="text-white">30 - 45 dB(A) at 1m (speed dependent)</span></p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">FCU components:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Fan section:</strong> Centrifugal fan, typically 3-speed or EC variable speed</li>
                <li className="pl-1"><strong>Coil(s):</strong> Copper tube, aluminium fin heat exchanger(s)</li>
                <li className="pl-1"><strong>Filter:</strong> G3/G4 panel filter, typically washable or disposable</li>
                <li className="pl-1"><strong>Drip tray:</strong> Stainless steel or plastic, with drain connection</li>
                <li className="pl-1"><strong>Casing:</strong> Galvanised steel, insulated to prevent condensation</li>
                <li className="pl-1"><strong>Control valve(s):</strong> 2-way or 3-way, typically 15-20mm</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design consideration:</strong> FCU capacity is typically quoted at specific entering water and air temperatures. Verify design conditions match actual project parameters and apply derating factors where necessary.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Chilled Beams */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Chilled Beams - Active and Passive
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Chilled beams provide space cooling (and sometimes heating) using chilled water coils mounted
              at ceiling level. They offer quiet, low-maintenance operation but are limited to sensible
              cooling only - latent loads must be handled by the primary air system or separate dehumidification.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Passive vs Active Chilled Beams</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5">
                  <p className="text-sm font-medium text-white mb-2">Passive Chilled Beams</p>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">No primary air connection - convection only</li>
                    <li className="pl-1">Warm room air rises, contacts cold coil, falls</li>
                    <li className="pl-1">Typical capacity: 150 - 300 W/m of beam</li>
                    <li className="pl-1">Very quiet operation (no air movement noise)</li>
                    <li className="pl-1">Limited cooling capacity</li>
                    <li className="pl-1">Requires separate ventilation system</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5">
                  <p className="text-sm font-medium text-white mb-2">Active Chilled Beams</p>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">Primary air supply through induction nozzles</li>
                    <li className="pl-1">Venturi effect induces room air across coil</li>
                    <li className="pl-1">Typical capacity: 300 - 600 W/m of beam</li>
                    <li className="pl-1">Higher capacity than passive beams</li>
                    <li className="pl-1">Provides ventilation air directly</li>
                    <li className="pl-1">Primary air handles latent load</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Active Chilled Beam Operation</p>
              <div className="text-sm space-y-2">
                <p><strong>Induction principle:</strong> Primary conditioned air (typically 12-15°C) is supplied through small nozzles at high velocity. This creates a low-pressure zone that draws room air through the coil - the venturi or ejector effect.</p>
                <p><strong>Induction ratio:</strong> Typically 1:3 to 1:5, meaning for every 1 part primary air, 3-5 parts of room air are induced. This multiplies the apparent air supply rate without increasing ductwork size.</p>
                <p><strong>Discharge temperature:</strong> Mixed air (primary + induced) leaves at 16-18°C, well above the room dew point, eliminating condensation risk from the beam discharge.</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Chilled Beam Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Parameter</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Passive Beam</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Active Beam</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cooling capacity</td>
                      <td className="border border-white/10 px-3 py-2">150-300 W/m</td>
                      <td className="border border-white/10 px-3 py-2">300-600 W/m</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Heating capability</td>
                      <td className="border border-white/10 px-3 py-2">Limited (stratification issues)</td>
                      <td className="border border-white/10 px-3 py-2">Good (forced air distribution)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Primary air duct</td>
                      <td className="border border-white/10 px-3 py-2">Not required</td>
                      <td className="border border-white/10 px-3 py-2">Required</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ventilation</td>
                      <td className="border border-white/10 px-3 py-2">Separate system needed</td>
                      <td className="border border-white/10 px-3 py-2">Integrated</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">CHW temperature</td>
                      <td className="border border-white/10 px-3 py-2">&gt;14°C (above dewpoint)</td>
                      <td className="border border-white/10 px-3 py-2">10-16°C (primary air dehumidifies)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Noise level</td>
                      <td className="border border-white/10 px-3 py-2">Silent</td>
                      <td className="border border-white/10 px-3 py-2">20-35 NR (nozzle noise)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Critical: Condensation Prevention</p>
              <div className="text-sm text-white">
                <p className="mb-2">Chilled beams (especially passive) have no condensate drainage provision. Condensation on beam surfaces causes:</p>
                <ul className="list-disc list-outside ml-5 space-y-1">
                  <li className="pl-1">Water dripping onto occupants and furniture</li>
                  <li className="pl-1">Ceiling tile staining and damage</li>
                  <li className="pl-1">Mould and bacterial growth</li>
                </ul>
                <p className="mt-2"><strong>Prevention:</strong> Maintain CHW temperature above room dewpoint. Typical office at 24°C, 50% RH has dewpoint of ~13°C. CHW is typically limited to 14-16°C with dewpoint monitoring and automatic CHW temperature rise.</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design note:</strong> Active chilled beams are specified per BS EN 15116. Ensure primary air is dehumidified to handle latent loads and maintain room dewpoint below CHW temperature.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Cassettes and VAV Boxes */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Cassette Units and VAV Boxes
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Ceiling cassette units and VAV (Variable Air Volume) boxes represent different approaches to
              zone conditioning. Cassettes are self-contained terminal units (often DX or chilled water),
              while VAV boxes modulate airflow from a central air handling system.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Ceiling Cassette Units</p>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm text-white mb-2">
                  Ceiling cassettes are compact, ceiling-recessed units that provide local heating and cooling.
                  They are available in chilled water, DX (split/VRF), and heat pump configurations.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mt-3">
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Cassette configurations:</p>
                    <ul className="text-xs text-white space-y-1 list-disc list-outside ml-4">
                      <li className="pl-1"><strong>4-way:</strong> Air discharge in 4 directions, most common</li>
                      <li className="pl-1"><strong>2-way:</strong> Discharge in 2 opposite directions</li>
                      <li className="pl-1"><strong>1-way:</strong> Single direction discharge</li>
                      <li className="pl-1"><strong>Round flow:</strong> 360° circular discharge pattern</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Typical specifications:</p>
                    <ul className="text-xs text-white space-y-1 list-disc list-outside ml-4">
                      <li className="pl-1">Capacity: 2-14 kW cooling</li>
                      <li className="pl-1">Ceiling cut-out: 575×575mm to 950×950mm</li>
                      <li className="pl-1">Ceiling void: minimum 250-350mm</li>
                      <li className="pl-1">Noise: 28-45 dB(A) depending on speed</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">VRF/DX Cassette Considerations</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Aspect</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Chilled Water Cassette</th>
                      <th className="border border-white/10 px-3 py-2 text-left">DX/VRF Cassette</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Medium</td>
                      <td className="border border-white/10 px-3 py-2">Chilled/hot water</td>
                      <td className="border border-white/10 px-3 py-2">Refrigerant (R410A, R32)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Pipework</td>
                      <td className="border border-white/10 px-3 py-2">Steel/copper, larger diameter</td>
                      <td className="border border-white/10 px-3 py-2">Copper, small diameter (6-16mm)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Leak risk</td>
                      <td className="border border-white/10 px-3 py-2">Water damage</td>
                      <td className="border border-white/10 px-3 py-2">Refrigerant release (F-gas implications)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Control</td>
                      <td className="border border-white/10 px-3 py-2">Valve + fan speed</td>
                      <td className="border border-white/10 px-3 py-2">Inverter compressor + fan</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Maintenance</td>
                      <td className="border border-white/10 px-3 py-2">Filter, valve, fan</td>
                      <td className="border border-white/10 px-3 py-2">Filter, fan, refrigerant check</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">VAV Terminal Boxes</p>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm text-white mb-2">
                  VAV boxes modulate the volume of conditioned air supplied to a zone. The central AHU
                  provides air at constant temperature; capacity is controlled by varying airflow.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mt-3">
                  <div>
                    <p className="text-sm font-medium text-white mb-1">VAV box types:</p>
                    <ul className="text-xs text-white space-y-1 list-disc list-outside ml-4">
                      <li className="pl-1"><strong>Pressure-independent:</strong> Maintains setpoint regardless of duct pressure changes</li>
                      <li className="pl-1"><strong>Pressure-dependent:</strong> Simpler, affected by system pressure</li>
                      <li className="pl-1"><strong>With reheat:</strong> Hot water or electric coil for heating</li>
                      <li className="pl-1"><strong>Fan-powered:</strong> Integral fan for constant room airflow</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">VAV control strategy:</p>
                    <ul className="text-xs text-white space-y-1 list-disc list-outside ml-4">
                      <li className="pl-1">Zone thermostat signals controller</li>
                      <li className="pl-1">Controller modulates damper 0-100%</li>
                      <li className="pl-1">Minimum position maintains ventilation</li>
                      <li className="pl-1">Airflow sensor provides feedback</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">VAV Minimum Airflow Settings</p>
              <div className="text-sm text-white">
                <p className="mb-2">VAV boxes have minimum and maximum airflow limits:</p>
                <ul className="list-disc list-outside ml-5 space-y-1">
                  <li className="pl-1"><strong>Minimum:</strong> Typically 20-30% of design airflow for ventilation requirements</li>
                  <li className="pl-1"><strong>Maximum:</strong> 100% design airflow (damper fully open)</li>
                  <li className="pl-1"><strong>Dead band:</strong> Range where no action occurs (typically 1-2°C)</li>
                </ul>
                <p className="mt-2">Setting minimums too low reduces energy but risks inadequate ventilation and poor air distribution. Too high wastes fan energy. Balance based on occupancy density and fresh air requirements.</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Selection guide:</strong> VAV suits large open-plan areas with varying loads. Cassettes suit individual rooms or areas requiring independent control. Consider noise, ceiling void, and maintenance access in selection.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 4: Control Valves and Strategies */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Control Valves, EC Motors, and Condensate Drainage
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective terminal unit operation depends on properly specified control components: valves for
              water flow modulation, efficient fan motors, and adequate condensate management. These elements
              significantly impact energy performance, comfort, and maintenance requirements.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Control Valve Types</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5">
                  <p className="text-sm font-medium text-white mb-2">2-Way Valves</p>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">Throttles flow through the coil</li>
                    <li className="pl-1">System flow varies with demand</li>
                    <li className="pl-1">Allows variable speed pumping</li>
                    <li className="pl-1">Energy efficient - reduced pump power</li>
                    <li className="pl-1">Requires pressure-independent control</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5">
                  <p className="text-sm font-medium text-white mb-2">3-Way Valves</p>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">Bypasses water around the coil</li>
                    <li className="pl-1">Maintains constant system flow</li>
                    <li className="pl-1">Used with constant speed pumps</li>
                    <li className="pl-1">Higher pump energy consumption</li>
                    <li className="pl-1">Simpler system hydraulics</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Valve Sizing and Authority</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Parameter</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Guidance</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Values</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Valve authority</td>
                      <td className="border border-white/10 px-3 py-2">Valve ΔP / (Valve ΔP + Circuit ΔP)</td>
                      <td className="border border-white/10 px-3 py-2">&gt;0.5 for good control</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Valve Kvs</td>
                      <td className="border border-white/10 px-3 py-2">Size to achieve design ΔP at design flow</td>
                      <td className="border border-white/10 px-3 py-2">Typically Kvs 0.4 - 4.0 for FCUs</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Connection size</td>
                      <td className="border border-white/10 px-3 py-2">Match coil connections</td>
                      <td className="border border-white/10 px-3 py-2">15mm, 20mm, 25mm</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Close-off pressure</td>
                      <td className="border border-white/10 px-3 py-2">Must exceed system static pressure</td>
                      <td className="border border-white/10 px-3 py-2">100 - 400 kPa typical</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Actuator Types</p>
              <div className="p-4 rounded-lg bg-white/5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Thermal actuators:</p>
                    <ul className="text-xs text-white space-y-1 list-disc list-outside ml-4">
                      <li className="pl-1">On/off operation only</li>
                      <li className="pl-1">Slow response (2-5 minutes)</li>
                      <li className="pl-1">24V AC supply typical</li>
                      <li className="pl-1">Low cost, simple</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Modulating actuators:</p>
                    <ul className="text-xs text-white space-y-1 list-disc list-outside ml-4">
                      <li className="pl-1">Proportional positioning (0-100%)</li>
                      <li className="pl-1">Fast response (30-90 seconds)</li>
                      <li className="pl-1">0-10V DC or 4-20mA control signal</li>
                      <li className="pl-1">Better temperature control</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">EC Fan Motors</p>
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                <p className="text-sm text-white mb-2">
                  Electronically Commutated (EC) motors are now standard in quality FCUs, replacing traditional
                  AC induction motors with shaded-pole or PSC (permanent split capacitor) windings.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mt-3">
                  <div>
                    <p className="text-sm font-medium text-white mb-1">EC motor advantages:</p>
                    <ul className="text-xs text-white space-y-1 list-disc list-outside ml-4">
                      <li className="pl-1">70-90% efficiency vs 25-50% for AC</li>
                      <li className="pl-1">Efficient across full speed range</li>
                      <li className="pl-1">Built-in speed control (0-10V)</li>
                      <li className="pl-1">Lower heat generation</li>
                      <li className="pl-1">Quieter operation</li>
                      <li className="pl-1">Longer bearing life</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Electrical requirements:</p>
                    <ul className="text-xs text-white space-y-1 list-disc list-outside ml-4">
                      <li className="pl-1">230V AC single phase supply</li>
                      <li className="pl-1">0-10V DC speed control signal</li>
                      <li className="pl-1">Low in-rush current</li>
                      <li className="pl-1">Power factor &gt;0.9</li>
                      <li className="pl-1">EMC compliant (CE marked)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Condensate Drainage Requirements</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Requirement</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Specification</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Minimum fall</td>
                      <td className="border border-white/10 px-3 py-2">1:100 (1% or 10mm/m)</td>
                      <td className="border border-white/10 px-3 py-2">1:50 preferred where possible</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Pipe material</td>
                      <td className="border border-white/10 px-3 py-2">PVC, ABS, or copper</td>
                      <td className="border border-white/10 px-3 py-2">PVC-U most common</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Pipe diameter</td>
                      <td className="border border-white/10 px-3 py-2">21.5mm (3/4") minimum</td>
                      <td className="border border-white/10 px-3 py-2">Match FCU connection</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Trap requirement</td>
                      <td className="border border-white/10 px-3 py-2">50mm water seal minimum</td>
                      <td className="border border-white/10 px-3 py-2">Prevents air being drawn in</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Air break</td>
                      <td className="border border-white/10 px-3 py-2">Tundish or visible gap</td>
                      <td className="border border-white/10 px-3 py-2">Required before connection to drainage</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Condensate Pump Requirements</p>
              <div className="text-sm text-white">
                <p className="mb-2">When gravity drainage is not achievable, condensate pumps are required:</p>
                <ul className="list-disc list-outside ml-5 space-y-1">
                  <li className="pl-1"><strong>Pump type:</strong> Centrifugal mini-pump, typically 10-20W</li>
                  <li className="pl-1"><strong>Lift capacity:</strong> Typically 3-6m head</li>
                  <li className="pl-1"><strong>Flow rate:</strong> Match peak condensate production (0.5-2 l/hr typical)</li>
                  <li className="pl-1"><strong>Float switch:</strong> Activates pump when tray fills</li>
                  <li className="pl-1"><strong>High-level alarm:</strong> Volt-free contact to BMS</li>
                  <li className="pl-1"><strong>Electrical supply:</strong> Typically from FCU isolator or separate fused spur</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">FCU Electrical Installation Summary</p>
              <div className="text-sm space-y-1">
                <p><span className="text-white/60">Supply:</span> <span className="text-white">230V single phase (check unit requirements)</span></p>
                <p><span className="text-white/60">Protection:</span> <span className="text-white">MCB 6-16A depending on load, RCD where applicable</span></p>
                <p><span className="text-white/60">Isolation:</span> <span className="text-white">Local isolator within 1m of unit</span></p>
                <p><span className="text-white/60">Control wiring:</span> <span className="text-white">0-10V fan speed, valve actuator, room sensor</span></p>
                <p><span className="text-white/60">BMS connection:</span> <span className="text-white">Status, alarms, setpoint adjustment</span></p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Commissioning note:</strong> Terminal units require water flow balancing, air flow measurement (where ducted), control loop tuning, and condensate drainage testing before handover.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: FCU Selection for Office Zone</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Select a ceiling-concealed FCU for an office zone with 6 kW sensible cooling load and 2 kW heating load. The system uses 4-pipe chilled/hot water with 2-way valves.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Given requirements:</p>
                <p className="ml-4">Cooling load: 6 kW sensible</p>
                <p className="ml-4">Heating load: 2 kW</p>
                <p className="ml-4">CHW: 6°C flow, 12°C return</p>
                <p className="ml-4">HHW: 70°C flow, 50°C return</p>
                <p className="ml-4">Room condition: 24°C, 50% RH</p>
                <p className="mt-2 text-white/60">Selection process:</p>
                <p className="ml-4">1. Select FCU with cooling capacity &gt;6 kW at design conditions</p>
                <p className="ml-4">2. Verify heating capacity &gt;2 kW</p>
                <p className="ml-4">3. Check noise level suits office (NR35-40 typically)</p>
                <p className="ml-4">4. Confirm ceiling void depth (typically 300mm minimum)</p>
                <p className="mt-2 text-green-400">Selected: Model FCU-600 (7.2 kW cooling, 3.1 kW heating)</p>
                <p className="ml-4">Fan: EC motor, 3 speeds (low/medium/high)</p>
                <p className="ml-4">Noise: NR32 at medium speed</p>
                <p className="ml-4">Water connections: 15mm (CHW), 15mm (HHW)</p>
                <p className="ml-4">Electrical: 230V, 95W, 0.5A running</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Chilled Beam Dewpoint Analysis</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Determine the minimum chilled water temperature for passive chilled beams in a meeting room designed for 22°C, 50% RH.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Given conditions:</p>
                <p className="ml-4">Room temperature: 22°C</p>
                <p className="ml-4">Relative humidity: 50%</p>
                <p className="mt-2 text-white/60">Dewpoint calculation:</p>
                <p className="ml-4">Using psychrometric chart or formula:</p>
                <p className="ml-4">Dewpoint = T - ((100 - RH)/5)</p>
                <p className="ml-4">Dewpoint = 22 - ((100 - 50)/5) = 22 - 10 = 12°C (approximate)</p>
                <p className="mt-2">More precise from psychrometric tables:</p>
                <p className="ml-4 text-green-400">Dewpoint at 22°C, 50% RH = 11.1°C</p>
                <p className="mt-2">Safety margin (typically 2-3°C above dewpoint):</p>
                <p className="ml-4 text-green-400">Minimum CHW temperature = 11.1 + 3 = 14.1°C</p>
                <p className="ml-4 text-green-400">Specify: CHW not below 14°C</p>
                <p className="mt-2 text-white/60">Implement dewpoint sensor to modulate CHW valve if humidity varies.</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Control Valve Sizing</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Size a 2-way control valve for an FCU with design water flow rate of 0.15 l/s and target valve pressure drop of 15 kPa.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Given data:</p>
                <p className="ml-4">Water flow rate: 0.15 l/s = 0.54 m³/h</p>
                <p className="ml-4">Target valve ΔP: 15 kPa = 1.5 bar</p>
                <p className="ml-4">Coil ΔP at design flow: 20 kPa = 2.0 bar</p>
                <p className="mt-2 text-white/60">Kvs calculation:</p>
                <p className="ml-4">Kvs = Q × √(1/ΔP)</p>
                <p className="ml-4">Where Q in m³/h, ΔP in bar</p>
                <p className="ml-4">Kvs = 0.54 × √(1/1.5) = 0.54 × 0.816 = 0.44</p>
                <p className="mt-2 text-white/60">Valve authority check:</p>
                <p className="ml-4">Authority = Valve ΔP / (Valve ΔP + Coil ΔP)</p>
                <p className="ml-4">Authority = 15 / (15 + 20) = 15/35 = 0.43</p>
                <p className="ml-4 text-orange-400">Authority 0.43 is acceptable but borderline</p>
                <p className="ml-4">Consider increasing valve ΔP to 20 kPa for better control</p>
                <p className="mt-2 text-green-400">Select: DN15 valve with Kvs = 0.4</p>
                <p className="ml-4">Actual ΔP at design flow = (0.54/0.4)² = 1.82 bar = 18.2 kPa</p>
                <p className="ml-4">Revised authority = 18.2/(18.2+20) = 0.48 (good)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 4: EC vs AC Motor Energy Comparison</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Compare annual energy consumption of EC and AC motors for an FCU operating at 60% average speed for 3000 hours per year.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Motor specifications:</p>
                <p className="ml-4">Full speed power: 80W</p>
                <p className="ml-4">Operating speed: 60% average</p>
                <p className="ml-4">Operating hours: 3000 h/year</p>
                <p className="mt-2"><strong>AC motor (voltage-controlled):</strong></p>
                <p className="ml-4">Efficiency at 60% speed: ~35%</p>
                <p className="ml-4">Mechanical power at 60% speed: 80 × 0.6³ = 17.3W (cube law)</p>
                <p className="ml-4">Electrical input: 17.3 / 0.35 = 49W</p>
                <p className="ml-4">Annual energy: 49 × 3000 = 147 kWh</p>
                <p className="mt-2"><strong>EC motor:</strong></p>
                <p className="ml-4">Efficiency at 60% speed: ~80%</p>
                <p className="ml-4">Mechanical power: 17.3W</p>
                <p className="ml-4">Electrical input: 17.3 / 0.80 = 21.6W</p>
                <p className="ml-4">Annual energy: 21.6 × 3000 = 65 kWh</p>
                <p className="mt-2 text-green-400">Annual saving: 147 - 65 = 82 kWh per unit</p>
                <p className="ml-4">At £0.15/kWh: £12.30/year saving per FCU</p>
                <p className="ml-4">Building with 100 FCUs: £1,230/year</p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Unit Selection Guide */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Terminal Unit Selection Guide</h2>

          <div className="my-6">
            <div className="overflow-x-auto">
              <table className="text-sm text-white w-full border-collapse">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Recommended Unit</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Key Considerations</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Open-plan office</td>
                    <td className="border border-white/10 px-3 py-2">Ceiling FCU or active chilled beam</td>
                    <td className="border border-white/10 px-3 py-2">Noise (NR35-40), uniform distribution</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Private office</td>
                    <td className="border border-white/10 px-3 py-2">4-way cassette or ceiling FCU</td>
                    <td className="border border-white/10 px-3 py-2">Individual control, aesthetics</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Meeting room</td>
                    <td className="border border-white/10 px-3 py-2">Passive chilled beam or ceiling FCU</td>
                    <td className="border border-white/10 px-3 py-2">Low noise critical, variable occupancy</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Hotel bedroom</td>
                    <td className="border border-white/10 px-3 py-2">Vertical FCU or under-window unit</td>
                    <td className="border border-white/10 px-3 py-2">Low noise (NR25-30), individual control</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Retail</td>
                    <td className="border border-white/10 px-3 py-2">Cassette or ducted FCU</td>
                    <td className="border border-white/10 px-3 py-2">Capacity for high gains, aesthetics</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Laboratory</td>
                    <td className="border border-white/10 px-3 py-2">VAV box with reheat</td>
                    <td className="border border-white/10 px-3 py-2">High air change rates, fume extraction</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Data centre</td>
                    <td className="border border-white/10 px-3 py-2">In-row coolers, CRAC units</td>
                    <td className="border border-white/10 px-3 py-2">High density, close control</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Terminal Unit Specification Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Confirm cooling and heating capacity at actual design conditions</li>
                <li className="pl-1">Verify noise level suits application (specify NR rating required)</li>
                <li className="pl-1">Check physical dimensions fit available ceiling void/floor space</li>
                <li className="pl-1">Ensure access for filter cleaning and maintenance</li>
                <li className="pl-1">Specify control valve type, size, and actuator (0-10V preferred)</li>
                <li className="pl-1">Confirm electrical load and protection requirements</li>
                <li className="pl-1">Plan condensate drainage route and verify falls achievable</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Minimum CHW temperature for passive beams: <strong>14-16°C</strong> (above dewpoint)</li>
                <li className="pl-1">Active chilled beam induction ratio: <strong>1:3 to 1:5</strong></li>
                <li className="pl-1">Condensate drain minimum fall: <strong>1:100 (1%)</strong></li>
                <li className="pl-1">Control valve authority target: <strong>&gt;0.5</strong></li>
                <li className="pl-1">EC motor efficiency at part load: <strong>70-90%</strong></li>
                <li className="pl-1">FCU coil pressure drop typical: <strong>20-50 kPa</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Using 3-way valves with variable speed pumps</strong> - wastes pump energy</li>
                <li className="pl-1"><strong>Undersizing valve authority</strong> - poor temperature control, hunting</li>
                <li className="pl-1"><strong>Insufficient condensate drainage fall</strong> - standing water, biological growth</li>
                <li className="pl-1"><strong>Ignoring dewpoint for chilled beams</strong> - condensation damage</li>
                <li className="pl-1"><strong>Inadequate ceiling void for FCUs</strong> - maintenance access problems</li>
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
                <p className="font-medium text-white mb-1">Terminal Unit Types</p>
                <ul className="space-y-0.5">
                  <li>FCU - Fan driven, handles latent loads</li>
                  <li>Passive beam - Convection only, sensible</li>
                  <li>Active beam - Induced air, higher capacity</li>
                  <li>Cassette - Ceiling recessed, DX or CHW</li>
                  <li>VAV - Modulates airflow from central AHU</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Control Valves</p>
                <ul className="space-y-0.5">
                  <li>2-way - Variable flow, with VSD pumps</li>
                  <li>3-way - Constant flow, bypass water</li>
                  <li>Authority &gt;0.5 for good control</li>
                  <li>Kvs sized for design ΔP and flow</li>
                  <li>Modulating actuators (0-10V) preferred</li>
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
            <Link to="../h-n-c-module8-section3-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Chilled Water Systems
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section3-5">
              Next: System Selection
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule8Section3_4;
