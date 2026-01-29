import { ArrowLeft, Flame, CheckCircle, ThermometerSun, Gauge, Shield, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Boiler Systems - HNC Module 8 Section 1.1";
const DESCRIPTION = "Understanding boiler types, ErP efficiency ratings, cascade systems, flue requirements and safety controls for heating installations in accordance with Building Regulations and BS 7671.";

const quickCheckQuestions = [
  {
    id: "condensing-efficiency",
    question: "What is the minimum seasonal efficiency required for a condensing boiler under ErP regulations?",
    options: ["86%", "90%", "92%", "94%"],
    correctIndex: 2,
    explanation: "Under ErP (Energy-related Products) regulations, condensing boilers must achieve a minimum seasonal efficiency of 92% to qualify for the highest efficiency class. This is measured under the Seasonal Space Heating Energy Efficiency (SEDBUK 2009) methodology."
  },
  {
    id: "flue-terminal-position",
    question: "According to Building Regulations Part J, what is the minimum distance from a flue terminal to an opening window?",
    options: ["150mm", "300mm", "450mm", "600mm"],
    correctIndex: 1,
    explanation: "Building Regulations Approved Document J specifies that flue terminals must be at least 300mm from any opening into the building, including openable windows, doors, and air vents. This prevents flue gases from re-entering the building."
  },
  {
    id: "cascade-control",
    question: "In a cascade boiler system, how are the boilers typically controlled to optimise efficiency?",
    options: ["All boilers fire simultaneously", "Lead boiler fires first with lag boilers sequenced as demand increases", "Random boiler selection", "Largest boiler always fires first"],
    correctIndex: 1,
    explanation: "Cascade systems use sequencing control where the lead boiler fires first, with additional lag boilers brought online as heat demand increases. The lead boiler is rotated periodically to ensure even wear across all units. This maintains high efficiency at all load conditions."
  },
  {
    id: "gas-safety-interlock",
    question: "Which safety device must be wired into the boiler control circuit to meet Gas Safe requirements?",
    options: ["Time clock only", "Room thermostat only", "Overheat thermostat and gas solenoid valve interlock", "Frost thermostat only"],
    correctIndex: 2,
    explanation: "Gas Safe regulations require that an overheat (high limit) thermostat is wired to shut off the gas supply via a solenoid valve interlock. This provides positive shut-off in the event of overheating, preventing dangerous conditions from developing."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the primary characteristic that distinguishes a condensing boiler from a conventional boiler?",
    options: [
      "Higher operating pressure",
      "Recovery of latent heat from flue gases by condensing water vapour",
      "Larger combustion chamber",
      "Higher gas input rate"
    ],
    correctAnswer: 1,
    explanation: "Condensing boilers achieve higher efficiency by recovering latent heat from the water vapour in flue gases. When the flue gases cool below the dew point (approximately 55°C), the water vapour condenses, releasing additional heat energy to the system."
  },
  {
    id: 2,
    question: "Under the Energy-related Products (ErP) directive, what efficiency class represents the highest performance for space heating?",
    options: [
      "Class B",
      "Class A",
      "Class A+",
      "Class A+++"
    ],
    correctAnswer: 3,
    explanation: "The ErP directive uses an energy labelling system from G (lowest) to A+++ (highest) for space heating. Modern condensing boilers typically achieve A or A+ ratings, with heat pumps capable of A++ and A+++ ratings."
  },
  {
    id: 3,
    question: "What is the typical return water temperature required for a condensing boiler to operate in condensing mode?",
    options: [
      "Below 35°C",
      "Below 45°C",
      "Below 55°C",
      "Below 65°C"
    ],
    correctAnswer: 2,
    explanation: "For a condensing boiler to operate in condensing mode, the return water temperature must be below the dew point of the flue gases, approximately 55°C. Lower return temperatures result in greater condensation and higher efficiency gains."
  },
  {
    id: 4,
    question: "What type of boiler is most suitable for a property with no hot water cylinder and limited space?",
    options: [
      "System boiler",
      "Regular (heat-only) boiler",
      "Combination (combi) boiler",
      "Condensing floor-standing boiler"
    ],
    correctAnswer: 2,
    explanation: "A combination (combi) boiler provides both space heating and instantaneous domestic hot water without the need for a separate hot water storage cylinder. This makes it ideal for smaller properties with limited space."
  },
  {
    id: 5,
    question: "According to Building Regulations Part L, what is the minimum boiler efficiency requirement for new installations?",
    options: [
      "86% SEDBUK",
      "88% SEDBUK",
      "90% SEDBUK",
      "92% SEDBUK"
    ],
    correctAnswer: 2,
    explanation: "Building Regulations Approved Document L requires that new boiler installations achieve a minimum seasonal efficiency of 90% SEDBUK (2009). In practice, this means condensing boilers are required for virtually all new installations."
  },
  {
    id: 6,
    question: "In a cascade boiler system, what is the purpose of lead-lag rotation?",
    options: [
      "To increase total system output",
      "To reduce installation costs",
      "To ensure even wear and extend service life across all boilers",
      "To improve combustion efficiency"
    ],
    correctAnswer: 2,
    explanation: "Lead-lag rotation periodically changes which boiler operates as the primary (lead) unit. This distributes operating hours evenly across all boilers, ensuring even wear and extending the service life of the entire system."
  },
  {
    id: 7,
    question: "What material is typically used for condensate drainage pipework from condensing boilers?",
    options: [
      "Copper",
      "Mild steel",
      "PVC or ABS plastic",
      "Cast iron"
    ],
    correctAnswer: 2,
    explanation: "Condensate from condensing boilers is acidic (pH 3-5) and would corrode metal pipework. PVC or ABS plastic pipework is used as it is resistant to the acidic condensate and provides a long service life."
  },
  {
    id: 8,
    question: "What is the minimum internal diameter for a condensate drainage pipe from a domestic condensing boiler?",
    options: [
      "15mm",
      "22mm",
      "28mm",
      "32mm"
    ],
    correctAnswer: 1,
    explanation: "The minimum internal diameter for condensate pipework is 22mm to prevent blockages and ensure adequate flow. External condensate pipes may need to be larger (32mm) and must be insulated or traced to prevent freezing."
  },
  {
    id: 9,
    question: "According to BS 7671, what type of electrical supply is typically required for a domestic boiler?",
    options: [
      "Three-phase supply",
      "Fused connection unit on a dedicated radial circuit",
      "13A socket outlet",
      "Direct connection to the consumer unit"
    ],
    correctAnswer: 1,
    explanation: "Domestic boilers are typically connected via a fused connection unit (FCU), usually rated at 3A or 5A, on a dedicated radial circuit. This provides a readily accessible means of isolation for maintenance while preventing accidental disconnection."
  },
  {
    id: 10,
    question: "What is the purpose of the condensate trap on a condensing boiler?",
    options: [
      "To increase boiler pressure",
      "To prevent flue gases escaping via the condensate drain",
      "To filter the condensate",
      "To heat the condensate before discharge"
    ],
    correctAnswer: 1,
    explanation: "The condensate trap maintains a water seal that prevents combustion gases from escaping through the condensate drain. The trap must be properly filled with water and checked during commissioning and servicing."
  },
  {
    id: 11,
    question: "What type of flue is required when a condensing boiler is installed in an internal room with no external wall?",
    options: [
      "Natural draught flue",
      "Open flue with draught diverter",
      "Vertical balanced flue through the roof",
      "Room-sealed with no flue required"
    ],
    correctAnswer: 2,
    explanation: "When a condensing boiler cannot be located on an external wall, a vertical balanced flue system through the roof is required. This maintains the room-sealed principle while providing combustion air supply and flue gas discharge."
  },
  {
    id: 12,
    question: "Under Gas Safe requirements, what documentation must be provided to the customer after boiler installation?",
    options: [
      "Manufacturer's brochure only",
      "Benchmark commissioning checklist and Building Regulations notification",
      "Invoice only",
      "Verbal confirmation of satisfactory installation"
    ],
    correctAnswer: 1,
    explanation: "Gas Safe registered engineers must complete the Benchmark commissioning checklist (or equivalent manufacturer documentation) and notify Building Control of the installation. A copy must be provided to the customer for their records."
  },
  {
    id: 13,
    question: "What is the maximum horizontal length for a room-sealed balanced flue on a typical domestic boiler?",
    options: [
      "500mm",
      "1000mm equivalent",
      "As specified by the manufacturer, typically 4-8 metres equivalent",
      "Unlimited length"
    ],
    correctAnswer: 2,
    explanation: "Maximum flue lengths are specified by the boiler manufacturer and vary depending on the model. Typically, room-sealed balanced flues can extend 4-8 metres equivalent, with deductions for bends. Always refer to manufacturer instructions."
  },
  {
    id: 14,
    question: "In a cascade boiler installation, what is the typical method of hydraulic separation between boilers and the heating system?",
    options: [
      "Direct connection",
      "Low-loss header or hydraulic separator",
      "Check valves only",
      "Thermostatic mixing valve"
    ],
    correctAnswer: 1,
    explanation: "A low-loss header or hydraulic separator provides hydraulic separation between the boiler primary circuit and the secondary heating system. This allows independent flow rates, prevents boiler short-cycling, and ensures proper return temperatures."
  }
];

const faqs = [
  {
    question: "What is the difference between a system boiler and a combination boiler?",
    answer: "A system boiler heats water for a separate hot water storage cylinder, making it suitable for properties with higher hot water demand and multiple bathrooms. A combination (combi) boiler provides instantaneous hot water without a storage cylinder, making it more compact but with limited hot water flow rate. System boilers can supply multiple outlets simultaneously, while combi boilers may struggle with simultaneous demand."
  },
  {
    question: "Why do condensing boilers produce condensate and how should it be disposed of?",
    answer: "Condensing boilers recover latent heat from flue gases by cooling them below the dew point (approximately 55°C), causing water vapour to condense. This condensate is slightly acidic (pH 3-5) and must be safely drained. It can discharge to an internal soil stack, external drain, or purpose-made soakaway. External pipework must be insulated or traced to prevent freezing. The typical condensate production is 2-3 litres per hour during full operation."
  },
  {
    question: "What electrical connections are required for a modern condensing boiler?",
    answer: "A typical domestic condensing boiler requires: a fused connection unit (3A or 5A fuse) for permanent live supply, connections for room thermostat, cylinder thermostat (system boilers), programmer/time clock, and potentially external weather compensation sensor. All wiring must comply with BS 7671, with adequate isolation facilities for maintenance. Low voltage (typically 24V) control circuits are common on modern boilers."
  },
  {
    question: "How does weather compensation improve boiler efficiency?",
    answer: "Weather compensation uses an external temperature sensor to adjust the boiler flow temperature based on outside conditions. In milder weather, lower flow temperatures are used, which increases condensing operation and improves efficiency. Modern systems can achieve 5-15% additional efficiency gains compared to fixed temperature operation. This also improves comfort by preventing overheating in milder conditions."
  },
  {
    question: "What are the key considerations when specifying a cascade boiler system?",
    answer: "Key considerations include: total heat load calculation with diversity factors, number and size of boilers (typically 2-4 units), hydraulic separation design, cascade controller specification, flue arrangements (individual or shared), condensate disposal for multiple units, commissioning requirements, and maintenance access. The system should be sized so that normal operation uses 1-2 boilers, with additional units for peak demand and resilience."
  },
  {
    question: "What safety devices are mandatory on gas boilers under current regulations?",
    answer: "Mandatory safety devices include: flame supervision device (ionisation probe or thermocouple), overheat thermostat (high limit stat), pressure relief valve, automatic air vent, and for room-sealed appliances, a flue gas analyser point. Modern boilers also incorporate: ignition lockout after failed attempts, frost protection, pump overrun, and anti-cycling controls. All safety devices must fail to a safe condition (fail-safe)."
  }
];

const HNCModule8Section1_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section1">
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
            <Flame className="h-4 w-4" />
            <span>Module 8.1.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Boiler Systems
          </h1>
          <p className="text-white/80">
            Boiler types, ErP efficiency ratings, cascade systems, flue requirements and safety controls for heating installations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Condensing boilers:</strong> Minimum 92% efficiency (ErP)</li>
              <li className="pl-1"><strong>Cascade systems:</strong> Multiple boilers with sequencing control</li>
              <li className="pl-1"><strong>Flue requirements:</strong> Building Regulations Part J compliant</li>
              <li className="pl-1"><strong>Safety controls:</strong> Flame supervision, overheat protection</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Regulatory Framework</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Building Regs Part J:</strong> Combustion appliances and flues</li>
              <li className="pl-1"><strong>Building Regs Part L:</strong> Conservation of fuel and power</li>
              <li className="pl-1"><strong>BS 7671:</strong> Electrical connections and isolation</li>
              <li className="pl-1"><strong>Gas Safety Regs:</strong> Installation and maintenance</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify and compare different boiler types and their applications",
              "Understand ErP efficiency ratings and SEDBUK methodology",
              "Design and specify cascade boiler systems with sequencing control",
              "Apply Building Regulations Part J flue requirements correctly",
              "Specify appropriate safety controls and electrical connections",
              "Commission boilers in accordance with Gas Safe and manufacturer requirements"
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

        {/* Section 1: Boiler Types and Classifications */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Boiler Types and Classifications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Modern heating systems utilise various boiler types, each suited to specific applications
              and building requirements. Understanding the characteristics, advantages and limitations
              of each type is essential for correct specification and installation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Primary Boiler Classifications:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Combination (Combi) boilers:</strong> Provide space heating and instantaneous DHW from a single unit</li>
                <li className="pl-1"><strong>System boilers:</strong> Heat water for an unvented or vented hot water cylinder, with integral pump and expansion vessel</li>
                <li className="pl-1"><strong>Regular (heat-only) boilers:</strong> Require separate pump, expansion vessel and controls, typically with vented cylinders</li>
                <li className="pl-1"><strong>Condensing boilers:</strong> High-efficiency units that recover latent heat from flue gases</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Boiler Type Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">DHW Method</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Best Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Output</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Combi</td>
                      <td className="border border-white/10 px-3 py-2">Instantaneous</td>
                      <td className="border border-white/10 px-3 py-2">Small-medium properties, 1-2 bathrooms</td>
                      <td className="border border-white/10 px-3 py-2">24-42 kW</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">System</td>
                      <td className="border border-white/10 px-3 py-2">Stored (cylinder)</td>
                      <td className="border border-white/10 px-3 py-2">Larger properties, multiple bathrooms</td>
                      <td className="border border-white/10 px-3 py-2">12-35 kW</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Regular</td>
                      <td className="border border-white/10 px-3 py-2">Stored (cylinder)</td>
                      <td className="border border-white/10 px-3 py-2">Replacement in existing systems</td>
                      <td className="border border-white/10 px-3 py-2">12-30 kW</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Commercial</td>
                      <td className="border border-white/10 px-3 py-2">Various</td>
                      <td className="border border-white/10 px-3 py-2">Large buildings, cascade systems</td>
                      <td className="border border-white/10 px-3 py-2">50-150+ kW</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Condensing Boiler Operation</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-white/80">Key principles:</p>
                  <ul className="text-white/70 space-y-1 mt-2">
                    <li>• Flue gas cooled below dew point (~55°C)</li>
                    <li>• Water vapour condenses releasing latent heat</li>
                    <li>• Requires low return temperature (&lt;55°C)</li>
                    <li>• Secondary heat exchanger for heat recovery</li>
                  </ul>
                </div>
                <div>
                  <p className="text-white/80">Efficiency factors:</p>
                  <ul className="text-white/70 space-y-1 mt-2">
                    <li>• Return water temperature critical</li>
                    <li>• Weather compensation improves operation</li>
                    <li>• Oversized radiators enhance condensing</li>
                    <li>• Underfloor heating ideal for condensing</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Building Regulations requirement:</strong> Part L mandates minimum 90% seasonal efficiency (SEDBUK 2009) for new boiler installations, effectively requiring condensing technology in virtually all cases.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Efficiency Ratings and ErP Directive */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Efficiency Ratings and ErP Directive
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Energy-related Products (ErP) directive establishes minimum efficiency standards
              and energy labelling requirements for heating appliances. Understanding these ratings
              is essential for specifying compliant and efficient heating systems.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">ErP Energy Labels</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">A+++ to G rating scale</li>
                  <li className="pl-1">Space heating efficiency</li>
                  <li className="pl-1">Water heating efficiency</li>
                  <li className="pl-1">Sound power level (dB)</li>
                  <li className="pl-1">Annual energy consumption</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">SEDBUK Methodology</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Seasonal efficiency calculation</li>
                  <li className="pl-1">Full and part load testing</li>
                  <li className="pl-1">UK climate conditions</li>
                  <li className="pl-1">Standardised test procedures</li>
                  <li className="pl-1">2009 and 2005 versions</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Minimum Standards</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Space heaters: 86% minimum</li>
                  <li className="pl-1">Combi DHW: 82% minimum</li>
                  <li className="pl-1">NOx emissions: &lt;56 mg/kWh</li>
                  <li className="pl-1">Smart controls required</li>
                  <li className="pl-1">Ecodesign compliance</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">ErP Efficiency Classes - Space Heating</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Class</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Seasonal Efficiency</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Technology</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-green-500/10">
                      <td className="border border-white/10 px-3 py-2 font-bold">A+++</td>
                      <td className="border border-white/10 px-3 py-2">&gt;150%</td>
                      <td className="border border-white/10 px-3 py-2">Heat pumps (GSHP)</td>
                    </tr>
                    <tr className="bg-green-500/5">
                      <td className="border border-white/10 px-3 py-2 font-bold">A++</td>
                      <td className="border border-white/10 px-3 py-2">125-150%</td>
                      <td className="border border-white/10 px-3 py-2">Heat pumps (ASHP)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-bold">A+</td>
                      <td className="border border-white/10 px-3 py-2">98-125%</td>
                      <td className="border border-white/10 px-3 py-2">Condensing + solar thermal</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-bold">A</td>
                      <td className="border border-white/10 px-3 py-2">90-98%</td>
                      <td className="border border-white/10 px-3 py-2">Condensing boilers</td>
                    </tr>
                    <tr className="bg-orange-500/10">
                      <td className="border border-white/10 px-3 py-2 font-bold">B-D</td>
                      <td className="border border-white/10 px-3 py-2">82-90%</td>
                      <td className="border border-white/10 px-3 py-2">Non-condensing (limited use)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <div className="flex items-start gap-3">
                <ThermometerSun className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-orange-400 mb-1">Weather Compensation Benefits</p>
                  <p className="text-sm text-white/80">
                    Weather compensation adjusts boiler flow temperature based on external conditions.
                    In milder weather, lower flow temperatures (&lt;55°C) maximise condensing operation,
                    improving seasonal efficiency by 5-15%. Modern ErP regulations require temperature
                    controls with weather compensation capability as standard.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Compliance note:</strong> All boilers sold in the UK must display ErP energy labels. Installers must provide customers with product fiche documentation showing efficiency data and advise on appropriate controls to achieve stated performance.
            </p>
          </div>
        </section>

        {/* Section 3: Cascade Systems and Sequencing Control */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Cascade Systems and Sequencing Control
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Cascade boiler systems utilise multiple boilers operating together to meet varying
              heat demands efficiently. Sequencing control brings boilers online progressively,
              maintaining high efficiency across the full load range while providing resilience.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Cascade System Advantages:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Improved efficiency:</strong> Boilers operate closer to optimal load point (70-80% capacity)</li>
                <li className="pl-1"><strong>Resilience:</strong> System continues operating if one boiler fails (N+1 redundancy)</li>
                <li className="pl-1"><strong>Flexibility:</strong> Scalable capacity to match building demand profiles</li>
                <li className="pl-1"><strong>Maintenance:</strong> Individual boilers can be serviced without total system shutdown</li>
                <li className="pl-1"><strong>Extended life:</strong> Reduced running hours per unit with lead-lag rotation</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Cascade Control Methods</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-white font-medium mb-1">Sequencing Control</p>
                  <ul className="text-white/70 space-y-1">
                    <li>• Lead boiler fires on initial demand</li>
                    <li>• Lag boilers staged as load increases</li>
                    <li>• Time delay between staging (typically 3-5 mins)</li>
                    <li>• Reverse sequence on falling demand</li>
                    <li>• Hysteresis prevents short cycling</li>
                  </ul>
                </div>
                <div>
                  <p className="text-white font-medium mb-1">Lead-Lag Rotation</p>
                  <ul className="text-white/70 space-y-1">
                    <li>• Periodic rotation of lead boiler</li>
                    <li>• Options: time-based, run-hours, demand-based</li>
                    <li>• Typical rotation: daily or weekly</li>
                    <li>• Run-hour equalisation over time</li>
                    <li>• Fault condition triggers auto-rotation</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cascade System Components</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Component</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Function</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Specification Considerations</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Low-loss header</td>
                      <td className="border border-white/10 px-3 py-2">Hydraulic separation</td>
                      <td className="border border-white/10 px-3 py-2">Size for total system flow rate, air/dirt separation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cascade controller</td>
                      <td className="border border-white/10 px-3 py-2">Sequencing logic</td>
                      <td className="border border-white/10 px-3 py-2">BMS integration, weather compensation, optimisation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Primary pumps</td>
                      <td className="border border-white/10 px-3 py-2">Boiler circuit flow</td>
                      <td className="border border-white/10 px-3 py-2">Individual or common, variable speed recommended</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Non-return valves</td>
                      <td className="border border-white/10 px-3 py-2">Prevent reverse flow</td>
                      <td className="border border-white/10 px-3 py-2">Spring-loaded type, low resistance design</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Isolation valves</td>
                      <td className="border border-white/10 px-3 py-2">Maintenance isolation</td>
                      <td className="border border-white/10 px-3 py-2">Full bore, lockable handles</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Common flue</td>
                      <td className="border border-white/10 px-3 py-2">Shared flue system</td>
                      <td className="border border-white/10 px-3 py-2">Fan-assisted, sized for all boilers firing</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Worked Example: Cascade Sizing</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Office building with 200 kW design heat load. Specify cascade system.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Design heat load: 200 kW</p>
                <p className="text-white/60">Diversity factor: 0.8 (typical office)</p>
                <p className="text-white/60">Operating load: 200 × 0.8 = 160 kW</p>
                <p className="mt-2">Option A: 3 × 80 kW boilers (240 kW total)</p>
                <p>  - Normal operation: 2 boilers at 80% = 128 kW</p>
                <p>  - Peak demand: All 3 boilers = 240 kW capacity</p>
                <p>  - N+1 redundancy maintained</p>
                <p className="mt-2">Option B: 4 × 60 kW boilers (240 kW total)</p>
                <p>  - Better modulation range</p>
                <p>  - Higher capital cost</p>
                <p>  - More maintenance items</p>
                <p className="mt-2 text-green-400">Recommendation: Option A - balances efficiency, cost and resilience</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design principle:</strong> Size cascade systems so that normal operation uses fewer than all boilers, reserving capacity for peak demand and providing redundancy. Typical designs operate at 60-80% of total installed capacity during average conditions.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Flue Requirements and Safety Controls */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Flue Requirements and Safety Controls
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Correct flue installation is critical for safe boiler operation. Building Regulations
              Approved Document J specifies requirements for combustion appliances, while Gas Safe
              regulations mandate specific safety controls and interlocks.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Flue Types and Applications</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Room-sealed balanced flue:</strong> Concentric or twin-pipe system drawing air from outside - most common for modern boilers</li>
                <li className="pl-1"><strong>Open flue:</strong> Draws combustion air from the room - requires adequate ventilation</li>
                <li className="pl-1"><strong>Fan-assisted flue:</strong> Uses fan to overcome longer flue runs</li>
                <li className="pl-1"><strong>Vertical balanced flue:</strong> Through-roof installation for internal locations</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Regulations Part J - Terminal Positions</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Location</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Room-Sealed (&lt;7 kW)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Room-Sealed (7-14 kW)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Room-Sealed (&gt;14 kW)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Below opening window</td>
                      <td className="border border-white/10 px-3 py-2">300mm</td>
                      <td className="border border-white/10 px-3 py-2">300mm</td>
                      <td className="border border-white/10 px-3 py-2">300mm</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Above opening window</td>
                      <td className="border border-white/10 px-3 py-2">300mm</td>
                      <td className="border border-white/10 px-3 py-2">300mm</td>
                      <td className="border border-white/10 px-3 py-2">300mm</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Horizontally from opening</td>
                      <td className="border border-white/10 px-3 py-2">300mm</td>
                      <td className="border border-white/10 px-3 py-2">400mm</td>
                      <td className="border border-white/10 px-3 py-2">600mm</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Below eaves/gutter</td>
                      <td className="border border-white/10 px-3 py-2">200mm</td>
                      <td className="border border-white/10 px-3 py-2">300mm</td>
                      <td className="border border-white/10 px-3 py-2">300mm</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">From internal corner</td>
                      <td className="border border-white/10 px-3 py-2">300mm</td>
                      <td className="border border-white/10 px-3 py-2">600mm</td>
                      <td className="border border-white/10 px-3 py-2">600mm</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Above ground level</td>
                      <td className="border border-white/10 px-3 py-2">300mm</td>
                      <td className="border border-white/10 px-3 py-2">300mm</td>
                      <td className="border border-white/10 px-3 py-2">300mm</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-red-400 mb-1">Safety Controls - Mandatory Requirements</p>
                  <ul className="text-sm text-white/80 space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1"><strong>Flame supervision device:</strong> Ionisation probe or thermocouple - shuts off gas if flame fails</li>
                    <li className="pl-1"><strong>Overheat thermostat:</strong> High limit stat (typically 95-100°C) - manual reset required</li>
                    <li className="pl-1"><strong>Pressure relief valve:</strong> PRV set at 3 bar - discharges to safe location</li>
                    <li className="pl-1"><strong>Pressure gauge:</strong> Visual indication of system pressure</li>
                    <li className="pl-1"><strong>Automatic air vent:</strong> Releases air from heat exchanger</li>
                    <li className="pl-1"><strong>Frost protection:</strong> Prevents freezing damage - integral to most modern boilers</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Electrical Connections (BS 7671)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Connection</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Requirement</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Permanent supply</td>
                      <td className="border border-white/10 px-3 py-2">FCU, 3A or 5A fuse</td>
                      <td className="border border-white/10 px-3 py-2">Dedicated circuit recommended</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Isolation</td>
                      <td className="border border-white/10 px-3 py-2">Accessible double-pole</td>
                      <td className="border border-white/10 px-3 py-2">Within 3m of boiler</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Room thermostat</td>
                      <td className="border border-white/10 px-3 py-2">Volt-free contacts</td>
                      <td className="border border-white/10 px-3 py-2">Breaks call for heat</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cylinder stat</td>
                      <td className="border border-white/10 px-3 py-2">Volt-free contacts</td>
                      <td className="border border-white/10 px-3 py-2">System/regular boilers only</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Programmer</td>
                      <td className="border border-white/10 px-3 py-2">Mains or low voltage</td>
                      <td className="border border-white/10 px-3 py-2">Time control for CH and DHW</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">External sensor</td>
                      <td className="border border-white/10 px-3 py-2">Manufacturer specific</td>
                      <td className="border border-white/10 px-3 py-2">Weather compensation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-white mb-1">Condensate Drainage Requirements</p>
                  <ul className="text-sm text-white/80 space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">Minimum 22mm internal diameter pipework</li>
                    <li className="pl-1">PVC or ABS plastic (acid resistant)</li>
                    <li className="pl-1">Fall of 2.5° minimum (45mm per metre)</li>
                    <li className="pl-1">External runs: insulated or traced heating</li>
                    <li className="pl-1">Discharge to internal soil stack preferred</li>
                    <li className="pl-1">External discharge: above gully trap water level</li>
                    <li className="pl-1">Neutralisation kit for sensitive drainage systems</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Gas Safe requirement:</strong> All gas boiler installations must be carried out by a Gas Safe registered engineer. The Benchmark commissioning checklist (or manufacturer equivalent) must be completed, and Building Control notified via a Competent Persons Scheme or direct application.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Domestic Boiler Selection</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> 3-bedroom semi-detached house with 2 bathrooms. Select appropriate boiler type and size.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90 overflow-x-auto">
                <p className="text-white/60">Property details:</p>
                <p>- 3 bedrooms, 2 bathrooms (family bathroom + en-suite)</p>
                <p>- Heat loss calculation: 12 kW space heating</p>
                <p>- DHW demand: 2 showers potentially simultaneous</p>
                <p className="mt-2 text-white/60">Analysis:</p>
                <p>- Multiple bathrooms = higher DHW demand</p>
                <p>- Combi may struggle with simultaneous demand</p>
                <p>- System boiler with unvented cylinder provides better DHW</p>
                <p className="mt-2 text-white/60">Recommendation:</p>
                <p>Option 1: 35 kW combi (if DHW priority acceptable)</p>
                <p>Option 2: 24 kW system boiler + 180L unvented cylinder</p>
                <p className="mt-2 text-green-400">Selected: System boiler for superior DHW performance</p>
                <p className="text-green-400">ErP Rating: A (space) + A (water)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Flue Position Assessment</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> 28 kW combi boiler to be installed in kitchen. Assess flue terminal position.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Proposed location: External wall below kitchen window</p>
                <p className="text-white/60">Boiler output: 28 kW (14-70 kW category)</p>
                <p className="mt-2">Distance requirements (Part J):</p>
                <p>- Below opening window: 300mm min ✓</p>
                <p>- Horizontally from opening: 600mm min</p>
                <p>- Above ground level: 300mm min ✓</p>
                <p className="mt-2 text-white/60">Site measurement:</p>
                <p>- Window sill height: 900mm</p>
                <p>- Proposed terminal height: 500mm</p>
                <p>- Vertical clearance: 400mm (300mm req) ✓</p>
                <p>- Horizontal from window edge: 450mm</p>
                <p className="mt-2 text-red-400">Issue: Horizontal clearance 450mm &lt; 600mm required</p>
                <p className="text-yellow-400">Solution: Reposition boiler to achieve 600mm clearance</p>
                <p className="text-yellow-400">or use plume management kit</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Cascade Controller Setup</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Configure cascade controller for 3 × 80 kW boilers serving office building.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">System: 3 × 80 kW condensing boilers</p>
                <p className="text-white/60">Design flow temp: 70°C, Return: 50°C (ΔT = 20K)</p>
                <p className="mt-2">Cascade controller parameters:</p>
                <p>- Staging setpoint: 80% of current capacity</p>
                <p>- De-staging setpoint: 30% of current capacity</p>
                <p>- Staging delay: 5 minutes</p>
                <p>- De-staging delay: 10 minutes</p>
                <p>- Lead-lag rotation: Weekly (Monday 00:00)</p>
                <p className="mt-2">Weather compensation:</p>
                <p>- Outside temp: 0°C → Flow: 70°C</p>
                <p>- Outside temp: 10°C → Flow: 55°C</p>
                <p>- Outside temp: 15°C → Flow: 45°C</p>
                <p>- Heating curve: 1.2</p>
                <p className="mt-2">Frost protection: Enable below 3°C external</p>
                <p>Optimum start: Enable (learns building response)</p>
                <p className="mt-2 text-green-400">BMS integration: Modbus RTU for monitoring</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 4: Condensate Pipe Sizing</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Design condensate drainage for external run to drain.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Boiler: 30 kW condensing combi</p>
                <p className="text-white/60">Route: 2m internal + 3m external to gully</p>
                <p className="mt-2">Internal section (2m):</p>
                <p>- Pipe: 22mm PVC overflow pipe</p>
                <p>- Fall: 2.5° minimum (45mm per metre)</p>
                <p>- Total fall: 2 × 45 = 90mm</p>
                <p className="mt-2">External section (3m):</p>
                <p>- Pipe: 32mm PVC (increased for external)</p>
                <p>- Insulation: 19mm wall foam lagging</p>
                <p>- Trace heating: Self-regulating 10W/m</p>
                <p>- Fall: 3 × 45 = 135mm</p>
                <p className="mt-2">Discharge point:</p>
                <p>- Above gully water level</p>
                <p>- Air gap to prevent back-siphonage</p>
                <p className="mt-2 text-green-400">Complies with manufacturer instructions</p>
                <p className="text-green-400">and BS 6798 condensate requirements</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Verify gas supply pressure and pipe sizing adequate for boiler input</li>
                <li className="pl-1">Check flue terminal position against Part J requirements before installation</li>
                <li className="pl-1">Ensure condensate drain route is viable with adequate fall</li>
                <li className="pl-1">Confirm electrical supply available with adequate isolation facilities</li>
                <li className="pl-1">Check system is flushed and treated before commissioning</li>
                <li className="pl-1">Complete Benchmark checklist and notify Building Control</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Commissioning Requirements</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Gas tightness test on all new pipework</li>
                <li className="pl-1">Combustion analysis: CO₂, CO, flue temperature</li>
                <li className="pl-1">Gas rate check against data plate</li>
                <li className="pl-1">System pressure test and fill</li>
                <li className="pl-1">Check all safety controls operate correctly</li>
                <li className="pl-1">Set controls and demonstrate operation to user</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Installation Errors</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Incorrect flue position:</strong> Fails to meet Part J clearances - remedy before commissioning</li>
                <li className="pl-1"><strong>Condensate freezing:</strong> External pipe not insulated/traced - causes boiler lockout</li>
                <li className="pl-1"><strong>Poor system cleanliness:</strong> Debris damages heat exchanger - flush and filter</li>
                <li className="pl-1"><strong>Inadequate isolation:</strong> No accessible double-pole switch - BS 7671 non-compliance</li>
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
                <p className="font-medium text-white mb-1">Boiler Types</p>
                <ul className="space-y-0.5">
                  <li>Combi - instant DHW, no cylinder</li>
                  <li>System - stored DHW, integral pump/vessel</li>
                  <li>Regular - stored DHW, separate components</li>
                  <li>All new installations: condensing required</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">ErP Ratings</p>
                <ul className="space-y-0.5">
                  <li>A+++ - Heat pumps (GSHP)</li>
                  <li>A++ - Heat pumps (ASHP)</li>
                  <li>A/A+ - Condensing boilers</li>
                  <li>Minimum: 90% SEDBUK (Part L)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Flue Clearances (Part J)</p>
                <ul className="space-y-0.5">
                  <li>Below opening: 300mm min</li>
                  <li>Horizontal (&gt;14kW): 600mm min</li>
                  <li>Above ground: 300mm min</li>
                  <li>Below eaves: 200-300mm min</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Safety Controls</p>
                <ul className="space-y-0.5">
                  <li>Flame supervision device (FSD)</li>
                  <li>Overheat thermostat (high limit)</li>
                  <li>Pressure relief valve (3 bar)</li>
                  <li>Frost protection (integral)</li>
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
        <nav className="flex justify-start pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 1
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule8Section1_1;
