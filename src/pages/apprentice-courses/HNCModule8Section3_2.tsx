import { ArrowLeft, Snowflake, CheckCircle, Thermometer, Zap, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "DX Systems - HNC Module 8 Section 3.2";
const DESCRIPTION = "Master direct expansion (DX) air conditioning systems: split systems, multi-split configurations, VRF/VRV technology, 2-pipe and 3-pipe systems, heat recovery, refrigerant pipe sizing and electrical requirements for building services.";

const quickCheckQuestions = [
  {
    id: "split-components",
    question: "What are the two main units in a split system air conditioning installation?",
    options: [
      "Compressor unit and fan unit",
      "Indoor unit (evaporator) and outdoor unit (condenser/compressor)",
      "Refrigerant tank and heat exchanger",
      "Expansion vessel and pump unit"
    ],
    correctIndex: 1,
    explanation: "A split system comprises an indoor unit containing the evaporator and fan, connected via refrigerant pipework to an outdoor unit housing the compressor and condenser. This separation allows the noisy compressor to be located externally."
  },
  {
    id: "vrf-advantage",
    question: "What is the primary advantage of VRF/VRV systems over conventional split systems?",
    options: [
      "Lower initial cost",
      "Simpler installation",
      "Variable refrigerant flow to multiple indoor units with individual zone control",
      "No requirement for refrigerant pipework"
    ],
    correctIndex: 2,
    explanation: "VRF (Variable Refrigerant Flow) systems can modulate refrigerant flow to multiple indoor units independently, providing precise individual zone temperature control and improved energy efficiency through inverter-driven compressors."
  },
  {
    id: "three-pipe-system",
    question: "What additional capability does a 3-pipe VRF system provide compared to a 2-pipe system?",
    options: [
      "Higher cooling capacity only",
      "Simultaneous heating and cooling in different zones",
      "Reduced refrigerant charge",
      "Lower electrical consumption"
    ],
    correctIndex: 1,
    explanation: "3-pipe VRF systems (heat recovery) can simultaneously heat some zones whilst cooling others, recovering heat from cooling zones to assist heating zones. This provides superior energy efficiency in buildings with diverse thermal loads."
  },
  {
    id: "inverter-compressor",
    question: "Why do VRF systems use inverter-driven compressors?",
    options: [
      "To reduce initial cost",
      "To eliminate the need for refrigerant",
      "To vary compressor speed and match output to actual demand",
      "To simplify the electrical installation"
    ],
    correctIndex: 2,
    explanation: "Inverter compressors can continuously vary their speed to precisely match the cooling or heating demand, avoiding inefficient on/off cycling, reducing energy consumption by up to 30%, and providing more stable temperature control."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "In a split system, where is the expansion device typically located?",
    options: [
      "In the outdoor unit only",
      "At the indoor unit, upstream of the evaporator",
      "In the refrigerant piping midway between units",
      "External to both units in a separate enclosure"
    ],
    correctAnswer: 1,
    explanation: "The expansion device (typically a thermostatic expansion valve or electronic expansion valve) is located at the indoor unit, upstream of the evaporator, where it reduces refrigerant pressure and controls superheat."
  },
  {
    id: 2,
    question: "What is the typical maximum refrigerant pipe length for a standard residential split system?",
    options: [
      "10 metres",
      "15-25 metres",
      "50 metres",
      "100 metres"
    ],
    correctAnswer: 1,
    explanation: "Standard residential split systems typically allow 15-25 metres maximum pipe length, though this varies by manufacturer. Longer runs require additional refrigerant charge and may affect system performance."
  },
  {
    id: 3,
    question: "What electrical supply is typically required for a 7kW single-phase split system outdoor unit?",
    options: [
      "13A socket outlet",
      "Dedicated 20A radial circuit",
      "32A ring final circuit",
      "Three-phase supply"
    ],
    correctAnswer: 1,
    explanation: "A 7kW split system typically draws around 10-12A at full load on 230V, requiring a dedicated 20A radial circuit with appropriate isolation and RCD protection as per BS 7671."
  },
  {
    id: 4,
    question: "In a multi-split system, how many indoor units can typically be connected to one outdoor unit?",
    options: [
      "Maximum 2 units",
      "Maximum 5 units",
      "2-9 units depending on system capacity",
      "Unlimited units"
    ],
    correctAnswer: 2,
    explanation: "Multi-split systems typically support 2-9 indoor units per outdoor unit, depending on the outdoor unit capacity and individual indoor unit sizes. The total connected capacity must not exceed the outdoor unit rating."
  },
  {
    id: 5,
    question: "What does VRV stand for in air conditioning terminology?",
    options: [
      "Variable Rate Ventilation",
      "Variable Refrigerant Volume",
      "Volumetric Refrigerant Valve",
      "Variable Recovery Ventilation"
    ],
    correctAnswer: 1,
    explanation: "VRV (Variable Refrigerant Volume) is Daikin's trademarked name for their variable refrigerant flow technology. VRF (Variable Refrigerant Flow) is the generic industry term for the same technology."
  },
  {
    id: 6,
    question: "What is the purpose of an oil separator in a VRF system?",
    options: [
      "To filter contaminated refrigerant",
      "To remove moisture from the system",
      "To separate and return compressor oil to prevent accumulation in heat exchangers",
      "To reduce system operating pressure"
    ],
    correctAnswer: 2,
    explanation: "Oil separators capture lubricating oil that leaves the compressor with refrigerant discharge gas, returning it to the compressor crankcase. This prevents oil accumulation in heat exchangers which would reduce efficiency."
  },
  {
    id: 7,
    question: "For a VRF system serving a 5-storey building, what is the typical maximum height difference allowed between outdoor and indoor units?",
    options: [
      "15 metres",
      "30-50 metres",
      "75 metres",
      "100 metres"
    ],
    correctAnswer: 1,
    explanation: "Most VRF systems allow 30-50 metres vertical height difference between outdoor and highest/lowest indoor units. Oil return and refrigerant pressure drop become critical factors in taller installations."
  },
  {
    id: 8,
    question: "What type of refrigerant pipe sizing determines the liquid line diameter?",
    options: [
      "Based on pressure drop only",
      "Based on ensuring liquid state and acceptable subcooling",
      "Same size as suction line",
      "Based on maximum velocity only"
    ],
    correctAnswer: 1,
    explanation: "Liquid line sizing ensures refrigerant remains in liquid state with adequate subcooling. Undersized liquid lines cause flash gas which reduces system capacity and can damage the expansion device."
  },
  {
    id: 9,
    question: "What is the typical electrical supply requirement for a commercial VRF outdoor unit rated at 45kW cooling?",
    options: [
      "Single-phase 230V, 63A",
      "Three-phase 400V, 32A typical",
      "Three-phase 400V, 100A",
      "Single-phase 230V, 100A"
    ],
    correctAnswer: 1,
    explanation: "A 45kW VRF outdoor unit typically requires three-phase 400V supply drawing approximately 25-30A per phase at full load. A 32A three-phase supply with appropriate protection is common."
  },
  {
    id: 10,
    question: "During VRF system commissioning, what must be verified before initial start-up?",
    options: [
      "Interior decoration is complete",
      "Refrigerant pipe pressure test, evacuation to below 500 Pa, and correct refrigerant charge",
      "All windows are closed",
      "BMS connection is operational"
    ],
    correctAnswer: 1,
    explanation: "Pre-start commissioning requires nitrogen pressure testing (typically 3.0 MPa), deep vacuum evacuation to below 500 Pa absolute, and correct refrigerant charge calculated from pipe lengths. These ensure system integrity and performance."
  },
  {
    id: 11,
    question: "In a heat recovery VRF system, what component distributes refrigerant between heating and cooling indoor units?",
    options: [
      "Standard Y-branch",
      "BC (Branch Controller) or BS (Branch Selector) box",
      "Simple tee connection",
      "Manual isolation valve"
    ],
    correctAnswer: 1,
    explanation: "Heat recovery VRF systems use BC (Branch Controller) or BS (Branch Selector) boxes containing solenoid valves to route refrigerant appropriately to indoor units operating in either heating or cooling mode simultaneously."
  },
  {
    id: 12,
    question: "What is the primary consideration when selecting VRF pipe sizes for long horizontal runs?",
    options: [
      "Pipe material cost",
      "Aesthetic appearance",
      "Refrigerant velocity and pressure drop affecting system capacity",
      "Ease of insulation"
    ],
    correctAnswer: 2,
    explanation: "Long horizontal runs increase pressure drop, reducing available capacity at distant indoor units. Pipe sizing must balance velocity (for oil return) against pressure drop to maintain system performance across all connected units."
  }
];

const faqs = [
  {
    question: "What is the difference between R410A and R32 refrigerants in split systems?",
    answer: "R410A has been the dominant refrigerant but has high GWP (2088). R32 has lower GWP (675) and better thermodynamic properties, requiring smaller charges for equivalent capacity. However, R32 is mildly flammable (A2L classification), requiring compliance with additional safety requirements under BS EN 378 and F-gas regulations. Most new systems are transitioning to R32."
  },
  {
    question: "How do I calculate additional refrigerant charge for long pipe runs?",
    answer: "Manufacturers provide charging tables based on liquid line diameter and length exceeding the factory charge allowance (typically 7.5-10m). For example, a system might require 30g/m for 6.35mm liquid line and 90g/m for 9.52mm line. Suction line length generally does not require additional charge. Always refer to specific manufacturer data."
  },
  {
    question: "Can a 2-pipe VRF system provide heating and cooling to different zones simultaneously?",
    answer: "No, standard 2-pipe VRF systems operate in either heating or cooling mode for all connected units - the mode is determined by the majority demand. For simultaneous heating and cooling capability, a 3-pipe heat recovery system is required, which includes branch selector boxes to route refrigerant appropriately."
  },
  {
    question: "What electrical isolation is required for split system outdoor units?",
    answer: "BS 7671 requires a local means of isolation adjacent to outdoor units for maintenance safety. This should be a lockable isolator rated for the full load current, with clear labelling. The supply circuit requires RCD protection (30mA for accessible outdoor units) and appropriate overcurrent protection sized per manufacturer requirements."
  },
  {
    question: "Why do VRF systems require specific pipe brazing procedures?",
    answer: "VRF systems operate at higher pressures than older systems and require oxygen-free brazing with nitrogen purge to prevent internal oxidation. Copper oxide contamination can block expansion devices and damage compressors. All joints must be made with silver-bearing brazing alloy (minimum 5% silver) and 100% visually inspected before insulation."
  },
  {
    question: "What commissioning tests are required before VRF system handover?",
    answer: "Key commissioning tests include: nitrogen pressure test (typically 3.0 MPa for 24 hours), standing vacuum test (below 500 Pa for minimum 2 hours), refrigerant charge verification, compressor and fan current measurement, superheat and subcooling verification, airflow measurement at each indoor unit, control system function test, and full documentation of all readings."
  }
];

const HNCModule8Section3_2 = () => {
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

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Snowflake className="h-4 w-4" />
            <span>Module 8.3.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            DX Systems
          </h1>
          <p className="text-white/80">
            Direct expansion air conditioning: split systems, multi-split, VRF/VRV technology and electrical requirements
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>DX Systems:</strong> Refrigerant directly cools the air (no secondary medium)</li>
              <li className="pl-1"><strong>Split Systems:</strong> Indoor unit + outdoor unit connected by refrigerant pipes</li>
              <li className="pl-1"><strong>VRF/VRV:</strong> Variable refrigerant flow to multiple indoor units</li>
              <li className="pl-1"><strong>Heat Recovery:</strong> 3-pipe systems for simultaneous heating and cooling</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Applications:</strong> Offices, retail, hotels, healthcare</li>
              <li className="pl-1"><strong>Electrical:</strong> Single-phase or three-phase supplies</li>
              <li className="pl-1"><strong>Controls:</strong> Individual zone control, BMS integration</li>
              <li className="pl-1"><strong>F-gas:</strong> Refrigerant handling regulations</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the operation and components of split system air conditioning",
              "Compare multi-split and VRF/VRV system configurations",
              "Distinguish between 2-pipe and 3-pipe (heat recovery) VRF systems",
              "Apply refrigerant pipe sizing principles for DX installations",
              "Specify electrical supplies for single and three-phase DX equipment",
              "Describe inverter compressor technology and its energy benefits",
              "Outline commissioning procedures for VRF systems"
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

        {/* Section 1: Split System Fundamentals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Split System Fundamentals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Split systems are the most common form of air conditioning, separating the noisy compressor
              and condenser (outdoor unit) from the quiet evaporator and air distribution (indoor unit).
              This arrangement provides flexibility in installation whilst maintaining efficient heat rejection.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Split System Components:</p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-2">Indoor Unit</p>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">Evaporator coil (heat exchanger)</li>
                    <li className="pl-1">Fan (centrifugal or cross-flow)</li>
                    <li className="pl-1">Expansion device (TXV or EEV)</li>
                    <li className="pl-1">Air filter and condensate tray</li>
                    <li className="pl-1">Control PCB and sensors</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-2">Outdoor Unit</p>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">Compressor (scroll, rotary or inverter)</li>
                    <li className="pl-1">Condenser coil (air-cooled)</li>
                    <li className="pl-1">Axial fan(s) for heat rejection</li>
                    <li className="pl-1">Reversing valve (heat pump systems)</li>
                    <li className="pl-1">Service valves and filter drier</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Split System Types</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Capacity Range</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Wall-mounted</td>
                      <td className="border border-white/10 px-3 py-2">2.5 - 8 kW</td>
                      <td className="border border-white/10 px-3 py-2">Small offices, bedrooms, server rooms</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ceiling cassette</td>
                      <td className="border border-white/10 px-3 py-2">3.5 - 14 kW</td>
                      <td className="border border-white/10 px-3 py-2">Open plan offices, retail, restaurants</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ducted</td>
                      <td className="border border-white/10 px-3 py-2">5 - 25 kW</td>
                      <td className="border border-white/10 px-3 py-2">Concealed installations, multiple rooms</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Floor-standing</td>
                      <td className="border border-white/10 px-3 py-2">3.5 - 7 kW</td>
                      <td className="border border-white/10 px-3 py-2">Server rooms, areas without ceiling void</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Under-ceiling</td>
                      <td className="border border-white/10 px-3 py-2">3.5 - 14 kW</td>
                      <td className="border border-white/10 px-3 py-2">Exposed ceiling applications</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Refrigerant Connections</p>
              <p className="text-sm text-white mb-3">
                Split systems require two refrigerant pipes between indoor and outdoor units:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Liquid line (smaller):</strong> High-pressure liquid from condenser to expansion device</li>
                <li className="pl-1"><strong>Suction/gas line (larger):</strong> Low-pressure gas from evaporator to compressor</li>
                <li className="pl-1"><strong>Pipe sizing:</strong> Typically 6.35mm liquid, 9.52-15.88mm suction for residential units</li>
                <li className="pl-1"><strong>Insulation:</strong> Both pipes require insulation; suction line prevents condensation</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Installation note:</strong> Maximum pipe lengths are typically 15-25m for standard systems. Longer runs require additional refrigerant charge and may need larger pipe sizes to maintain performance.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Multi-Split and VRF/VRV Technology */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Multi-Split and VRF/VRV Technology
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Multi-split systems connect multiple indoor units to a single outdoor unit, whilst VRF
              (Variable Refrigerant Flow) systems extend this concept with sophisticated inverter control
              and the ability to serve large numbers of indoor units with precise individual control.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Multi-Split vs VRF Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Feature</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Multi-Split</th>
                      <th className="border border-white/10 px-3 py-2 text-left">VRF/VRV</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Indoor units per outdoor</td>
                      <td className="border border-white/10 px-3 py-2">2-9 units</td>
                      <td className="border border-white/10 px-3 py-2">Up to 64+ units</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Capacity range</td>
                      <td className="border border-white/10 px-3 py-2">4-14 kW outdoor</td>
                      <td className="border border-white/10 px-3 py-2">14-150+ kW outdoor</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Piping configuration</td>
                      <td className="border border-white/10 px-3 py-2">Individual runs or branch boxes</td>
                      <td className="border border-white/10 px-3 py-2">Header and branch system</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Capacity modulation</td>
                      <td className="border border-white/10 px-3 py-2">Stepped or basic inverter</td>
                      <td className="border border-white/10 px-3 py-2">Full inverter, 10-100%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Simultaneous heat/cool</td>
                      <td className="border border-white/10 px-3 py-2">Not available</td>
                      <td className="border border-white/10 px-3 py-2">3-pipe systems only</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Maximum pipe length</td>
                      <td className="border border-white/10 px-3 py-2">25-50m typical</td>
                      <td className="border border-white/10 px-3 py-2">165-200m+ from outdoor unit</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">VRF System Architecture:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Outdoor unit(s):</strong> Modular, can be combined for larger capacity</li>
                <li className="pl-1"><strong>Refrigerant piping:</strong> Header system with Y-branches to each indoor unit</li>
                <li className="pl-1"><strong>BC/BS boxes:</strong> Branch controller/selector boxes for heat recovery systems</li>
                <li className="pl-1"><strong>Indoor units:</strong> Any combination of wall, cassette, ducted, floor units</li>
                <li className="pl-1"><strong>Controls:</strong> Centralised controller, individual remotes, BMS integration</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-400/20">
                <p className="text-sm font-medium text-blue-300 mb-2">2-Pipe VRF Systems</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Heat pump operation - all units heat or cool</li>
                  <li className="pl-1">Mode determined by majority demand</li>
                  <li className="pl-1">Simpler piping installation</li>
                  <li className="pl-1">Lower initial cost</li>
                  <li className="pl-1">Suitable for uniform load buildings</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-400/20">
                <p className="text-sm font-medium text-purple-300 mb-2">3-Pipe VRF (Heat Recovery)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Simultaneous heating and cooling</li>
                  <li className="pl-1">Heat recovered from cooling zones</li>
                  <li className="pl-1">Superior energy efficiency</li>
                  <li className="pl-1">Requires BC/BS branch boxes</li>
                  <li className="pl-1">Ideal for buildings with diverse loads</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">VRF Energy Efficiency</p>
              <p className="text-sm text-white mb-3">
                VRF systems achieve high seasonal efficiency through:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Inverter compressors:</strong> Variable speed operation matches load precisely</li>
                <li className="pl-1"><strong>Part-load efficiency:</strong> Optimum COP often achieved at 40-60% capacity</li>
                <li className="pl-1"><strong>Heat recovery:</strong> Energy from cooling zones supplements heating zones</li>
                <li className="pl-1"><strong>Reduced duct losses:</strong> Refrigerant distribution more efficient than air</li>
              </ul>
              <p className="text-sm text-white/70 mt-3">
                Typical seasonal efficiency: SEER 6-8 (cooling), SCOP 4-5 (heating) for modern systems.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design tip:</strong> VRF connected capacity ratio (total indoor to outdoor) typically ranges from 50-130%. Higher ratios rely on diversity but reduce available capacity per unit at peak times.
            </p>
          </div>
        </section>

        {/* Section 3: Refrigerant Pipe Sizing and Installation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Refrigerant Pipe Sizing and Installation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Correct refrigerant pipe sizing is critical for DX system performance. Undersized pipes
              cause excessive pressure drop reducing capacity, whilst oversized pipes can result in
              poor oil return and increased refrigerant charge.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Pipe Sizing Criteria</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Line</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Primary Criterion</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Velocity Range</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Liquid line</td>
                      <td className="border border-white/10 px-3 py-2">Maintain subcooling, prevent flash gas</td>
                      <td className="border border-white/10 px-3 py-2">0.5 - 1.5 m/s typical</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Suction line (horizontal)</td>
                      <td className="border border-white/10 px-3 py-2">Oil return, pressure drop</td>
                      <td className="border border-white/10 px-3 py-2">&gt; 3.5 m/s minimum</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Suction line (vertical rise)</td>
                      <td className="border border-white/10 px-3 py-2">Oil lift against gravity</td>
                      <td className="border border-white/10 px-3 py-2">&gt; 5-7 m/s minimum</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Discharge line</td>
                      <td className="border border-white/10 px-3 py-2">Noise, pressure drop</td>
                      <td className="border border-white/10 px-3 py-2">10-18 m/s typical</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical VRF Pipe Sizes (R410A)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Indoor Unit Capacity</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Liquid Line OD</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Suction Line OD</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2.2 - 3.6 kW</td>
                      <td className="border border-white/10 px-3 py-2">6.35 mm (1/4")</td>
                      <td className="border border-white/10 px-3 py-2">9.52 mm (3/8")</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4.5 - 5.6 kW</td>
                      <td className="border border-white/10 px-3 py-2">6.35 mm (1/4")</td>
                      <td className="border border-white/10 px-3 py-2">12.7 mm (1/2")</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">7.1 - 11.2 kW</td>
                      <td className="border border-white/10 px-3 py-2">9.52 mm (3/8")</td>
                      <td className="border border-white/10 px-3 py-2">15.88 mm (5/8")</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">14 - 22.4 kW</td>
                      <td className="border border-white/10 px-3 py-2">9.52 mm (3/8")</td>
                      <td className="border border-white/10 px-3 py-2">19.05 mm (3/4")</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Installation Requirements:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Brazing:</strong> Nitrogen purge during brazing to prevent oxidation</li>
                <li className="pl-1"><strong>Pressure test:</strong> 3.0 MPa with dry nitrogen for 24 hours minimum</li>
                <li className="pl-1"><strong>Evacuation:</strong> Deep vacuum to below 500 Pa (0.5 mbar) absolute</li>
                <li className="pl-1"><strong>Leak test:</strong> Electronic leak detector after evacuation</li>
                <li className="pl-1"><strong>Insulation:</strong> 10-19mm thickness depending on pipe size and location</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">VRF Piping Limitations</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-white/70 mb-1">Maximum Lengths (typical)</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Total pipe length: 165-200m</li>
                    <li>Equivalent length: 175-230m</li>
                    <li>First branch to furthest unit: 40-90m</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-white/70 mb-1">Height Differences (typical)</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Outdoor to indoor: 30-50m</li>
                    <li>Between indoor units: 15-30m</li>
                    <li>Outdoor below indoor: 30-40m</li>
                  </ul>
                </div>
              </div>
              <p className="text-xs text-white/60 mt-3">
                Note: Exact limits vary by manufacturer and system model - always consult specific documentation.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Critical:</strong> Oil traps may be required on suction risers exceeding 10m. Pipe sizing software from manufacturers should be used for complex VRF installations to verify pressure drop and oil return.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Electrical Requirements and Commissioning */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Electrical Requirements and Commissioning
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              DX systems require careful electrical design to ensure safe operation, compliance with
              BS 7671, and compatibility with inverter-driven equipment. Commissioning procedures
              verify both refrigeration and electrical systems function correctly.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Electrical Supply Requirements</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">System Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Capacity</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Supply</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical MCB</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Small split (residential)</td>
                      <td className="border border-white/10 px-3 py-2">2.5-3.5 kW</td>
                      <td className="border border-white/10 px-3 py-2">230V 1-ph</td>
                      <td className="border border-white/10 px-3 py-2">16A Type C</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Medium split</td>
                      <td className="border border-white/10 px-3 py-2">5-7 kW</td>
                      <td className="border border-white/10 px-3 py-2">230V 1-ph</td>
                      <td className="border border-white/10 px-3 py-2">20A Type C</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Large split</td>
                      <td className="border border-white/10 px-3 py-2">10-14 kW</td>
                      <td className="border border-white/10 px-3 py-2">230V 1-ph or 400V 3-ph</td>
                      <td className="border border-white/10 px-3 py-2">32A Type C</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">VRF outdoor (small)</td>
                      <td className="border border-white/10 px-3 py-2">14-28 kW</td>
                      <td className="border border-white/10 px-3 py-2">400V 3-ph</td>
                      <td className="border border-white/10 px-3 py-2">20-25A Type C</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">VRF outdoor (medium)</td>
                      <td className="border border-white/10 px-3 py-2">33-56 kW</td>
                      <td className="border border-white/10 px-3 py-2">400V 3-ph</td>
                      <td className="border border-white/10 px-3 py-2">32-40A Type C</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">VRF outdoor (large)</td>
                      <td className="border border-white/10 px-3 py-2">73-150+ kW</td>
                      <td className="border border-white/10 px-3 py-2">400V 3-ph</td>
                      <td className="border border-white/10 px-3 py-2">63-100A Type C</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Electrical Installation Requirements:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Dedicated circuit:</strong> Each outdoor unit requires dedicated supply</li>
                <li className="pl-1"><strong>Local isolation:</strong> Lockable isolator within sight of outdoor unit</li>
                <li className="pl-1"><strong>RCD protection:</strong> 30mA RCD for accessible outdoor units per BS 7671</li>
                <li className="pl-1"><strong>Cable sizing:</strong> Based on manufacturer MCA (Maximum Circuit Amps)</li>
                <li className="pl-1"><strong>MCB selection:</strong> Type C or D for motor starting currents</li>
                <li className="pl-1"><strong>EMC:</strong> Screened cables may be required for inverter units</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="h-5 w-5 text-elec-yellow" />
                <p className="text-sm font-medium text-elec-yellow/80">Inverter Considerations</p>
              </div>
              <p className="text-sm text-white mb-3">
                VRF systems use inverter-driven compressors which create specific electrical challenges:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Harmonic distortion:</strong> May require harmonic filters on larger systems</li>
                <li className="pl-1"><strong>High frequency noise:</strong> Can affect sensitive equipment nearby</li>
                <li className="pl-1"><strong>Earth leakage:</strong> Capacitive currents may cause nuisance RCD tripping</li>
                <li className="pl-1"><strong>Soft start:</strong> Reduced inrush current vs fixed speed compressors</li>
                <li className="pl-1"><strong>Power factor:</strong> Generally &gt; 0.95 at full load</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Commissioning Procedures</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-white/70 mb-1">Pre-Start Checks</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>• Verify pipe pressure test records</li>
                    <li>• Confirm vacuum test completed</li>
                    <li>• Check refrigerant charge calculation</li>
                    <li>• Verify electrical connections</li>
                    <li>• Check phase rotation (3-phase)</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-white/70 mb-1">Operational Tests</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>• Measure compressor current</li>
                    <li>• Verify superheat (5-10K typical)</li>
                    <li>• Check subcooling (5-8K typical)</li>
                    <li>• Measure airflows at each unit</li>
                    <li>• Test all control functions</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <div className="flex items-center gap-2 mb-3">
                <Settings className="h-5 w-5 text-blue-400" />
                <p className="text-sm font-medium text-blue-300">VRF System Configuration</p>
              </div>
              <p className="text-sm text-white mb-3">
                VRF systems require address setting and network configuration:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Refrigerant address:</strong> Each indoor unit assigned unique address</li>
                <li className="pl-1"><strong>Capacity tables:</strong> Entered via outdoor unit or central controller</li>
                <li className="pl-1"><strong>Communication check:</strong> Verify all units communicate correctly</li>
                <li className="pl-1"><strong>Charge calculation:</strong> Additional charge based on pipe lengths</li>
                <li className="pl-1"><strong>Auto-commissioning:</strong> Many systems run automatic charge check</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Documentation:</strong> Complete commissioning records including pressure tests, vacuum records, refrigerant charge, electrical readings and control settings must be retained and provided to the client as part of O&amp;M manuals.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Split System Electrical Sizing</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 7kW single-phase split system has a maximum operating current of 12.5A and inrush current of 35A. Specify the electrical supply requirements.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Operating current: 12.5A at 230V</p>
                <p>Inrush current: 35A (inverter soft-start)</p>
                <p className="mt-2">MCB selection:</p>
                <p>• Type C MCB can handle 5-10× In inrush</p>
                <p>• 20A Type C: handles up to 200A peak</p>
                <p>• 35A inrush &lt; 200A ✓</p>
                <p className="mt-2">Cable sizing:</p>
                <p>• 20A circuit requires 2.5mm² minimum (Method C)</p>
                <p>• With voltage drop check for run length</p>
                <p className="mt-2 text-green-400">→ Specify: 20A Type C MCB, 2.5mm² T+E, local isolator</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: VRF Additional Refrigerant Charge</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A VRF system has 85m of 9.52mm liquid line and 95m of 19.05mm suction line beyond the factory allowance. Calculate additional refrigerant charge if the liquid line requires 90g/m.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Liquid line additional length: 85m</p>
                <p>Charge rate for 9.52mm: 90 g/m</p>
                <p className="mt-2">Additional charge calculation:</p>
                <p>Additional charge = 85m × 90 g/m = <strong>7,650g = 7.65 kg</strong></p>
                <p className="mt-2 text-white/60">Note: Suction line length typically does not require</p>
                <p className="text-white/60">additional charge in most manufacturer calculations.</p>
                <p className="mt-2 text-green-400">→ Add 7.65 kg R410A to factory pre-charge</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Three-Phase VRF Current Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 56kW VRF outdoor unit operates at 0.97 power factor on 400V three-phase. Calculate the line current and select appropriate protection.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Using: P = √3 × VL × IL × cos φ</p>
                <p className="mt-2">Rearranging: IL = P / (√3 × VL × cos φ)</p>
                <p>IL = 56,000 / (1.732 × 400 × 0.97)</p>
                <p>IL = 56,000 / 672.3 = <strong>83.3A per phase</strong></p>
                <p className="mt-2">Protection selection:</p>
                <p>• Check manufacturer MCA (Max Circuit Amps)</p>
                <p>• Typically MCA &gt; calculated current by 20-25%</p>
                <p>• Select 100A Type C MCCB or 100A fuses</p>
                <p className="mt-2 text-green-400">→ Specify: 100A 3-phase supply, 25mm² 4-core SWA</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">System Selection Criteria</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Single split:</strong> Individual rooms, server closets, residential</li>
                <li className="pl-1"><strong>Multi-split:</strong> Small commercial, 2-5 zones, limited outdoor space</li>
                <li className="pl-1"><strong>2-pipe VRF:</strong> Medium buildings, uniform loads, heat pump operation</li>
                <li className="pl-1"><strong>3-pipe VRF:</strong> Large buildings, diverse loads, heat recovery potential</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Design Considerations</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Outdoor unit location:</strong> Adequate airflow, noise impact, maintenance access</li>
                <li className="pl-1"><strong>Pipe routes:</strong> Shortest practical, avoid heat sources, provision for expansion</li>
                <li className="pl-1"><strong>Condensate drainage:</strong> Falls to drain points, trace heating if exposed</li>
                <li className="pl-1"><strong>Controls integration:</strong> BMS connectivity, scheduling, energy monitoring</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Installation Errors</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Inadequate brazing:</strong> Not purging with nitrogen causes internal oxidation</li>
                <li className="pl-1"><strong>Poor vacuum:</strong> Moisture contamination leads to compressor failure</li>
                <li className="pl-1"><strong>Wrong refrigerant charge:</strong> Under or overcharge reduces efficiency and life</li>
                <li className="pl-1"><strong>Incorrect addressing:</strong> Indoor units not responding to controls</li>
                <li className="pl-1"><strong>Missing isolation:</strong> No local isolator for outdoor unit maintenance</li>
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
                <p className="font-medium text-white mb-1">DX System Types</p>
                <ul className="space-y-0.5">
                  <li>Split: 1 outdoor, 1 indoor unit</li>
                  <li>Multi-split: 1 outdoor, 2-9 indoor units</li>
                  <li>2-pipe VRF: Heat pump, uniform mode</li>
                  <li>3-pipe VRF: Heat recovery, simultaneous H/C</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Electrical Essentials</p>
                <ul className="space-y-0.5">
                  <li>Dedicated circuits for outdoor units</li>
                  <li>Type C MCBs for motor loads</li>
                  <li>Local lockable isolator required</li>
                  <li>RCD protection per BS 7671</li>
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
            <Link to="../h-n-c-module8-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section3-3">
              Next: Chilled Water Systems
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule8Section3_2;
