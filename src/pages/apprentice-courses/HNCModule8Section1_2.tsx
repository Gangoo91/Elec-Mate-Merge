import { ArrowLeft, ThermometerSun, CheckCircle, Zap, Gauge, Settings, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Heat Pump Integration - HNC Module 8 Section 1.2";
const DESCRIPTION = "Master heat pump integration for building services: ASHP/GSHP principles, COP and SCOP calculations, MCS requirements, buffer vessel sizing, low temperature heating systems, hybrid configurations and Part L compliance.";

const quickCheckQuestions = [
  {
    id: "cop-definition",
    question: "A heat pump has a COP of 4.0. If it consumes 3kW of electrical power, what is its heat output?",
    options: ["3kW", "7kW", "12kW", "0.75kW"],
    correctIndex: 2,
    explanation: "COP = Heat Output / Electrical Input. Therefore Heat Output = COP x Electrical Input = 4.0 x 3kW = 12kW. This means the heat pump is moving 9kW of free heat from the environment while using 3kW of electricity."
  },
  {
    id: "flow-temp-radiators",
    question: "What is the recommended maximum flow temperature for heat pump systems with oversized radiators?",
    options: ["75-80degC", "55-65degC", "35-45degC", "20-25degC"],
    correctIndex: 2,
    explanation: "Heat pumps operate most efficiently at low flow temperatures of 35-45degC. Radiators must be oversized (typically 2-2.5 times larger) to deliver adequate heat output at these lower temperatures compared to traditional boiler systems running at 70-80degC."
  },
  {
    id: "buffer-vessel-purpose",
    question: "What is the primary purpose of a buffer vessel in a heat pump system?",
    options: [
      "To store domestic hot water",
      "To prevent short cycling and provide system stability",
      "To increase the COP of the heat pump",
      "To reduce electricity consumption"
    ],
    correctIndex: 1,
    explanation: "Buffer vessels prevent short cycling by providing thermal mass, ensuring minimum run times are achieved. They also help balance variable heat demand from zone valves and thermostatic radiator valves (TRVs), protecting the compressor and improving system efficiency."
  },
  {
    id: "mcs-certification",
    question: "Why is MCS certification important for heat pump installations in the UK?",
    options: [
      "It is optional but reduces insurance costs",
      "It is required for Building Regulations approval only",
      "It is required for Boiler Upgrade Scheme grants and demonstrates quality",
      "It only applies to commercial installations"
    ],
    correctIndex: 2,
    explanation: "MCS (Microgeneration Certification Scheme) certification is mandatory for accessing the Boiler Upgrade Scheme (BUS) grants of up to 7,500 pounds. It ensures installations meet quality standards, proper design methodology is followed, and the system will perform as specified."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What does ASHP stand for?",
    options: [
      "Automatic System Heat Processor",
      "Air Source Heat Pump",
      "Auxiliary Solar Heat Panel",
      "Advanced System Heating Plant"
    ],
    correctAnswer: 1,
    explanation: "ASHP stands for Air Source Heat Pump. These extract heat from outdoor air, even at temperatures down to -20degC, and transfer it into the building via a refrigerant cycle."
  },
  {
    id: 2,
    question: "The COP of a heat pump typically decreases when:",
    options: [
      "The outdoor temperature increases",
      "The flow temperature decreases",
      "The temperature difference between source and sink increases",
      "The system is correctly sized"
    ],
    correctAnswer: 2,
    explanation: "COP decreases as the temperature lift (difference between source and delivery temperature) increases. This is why low flow temperatures (35-45degC) are essential for efficient heat pump operation - smaller temperature lift means higher efficiency."
  },
  {
    id: 3,
    question: "What is the typical SCOP for a well-designed air source heat pump system in the UK?",
    options: ["1.5-2.0", "2.5-3.5", "5.0-6.0", "7.0-8.0"],
    correctAnswer: 1,
    explanation: "SCOP (Seasonal Coefficient of Performance) accounts for performance variation throughout the heating season. A well-designed UK ASHP system typically achieves SCOP of 2.5-3.5, meaning for every 1kWh of electricity, 2.5-3.5kWh of heat is delivered over the year."
  },
  {
    id: 4,
    question: "Ground source heat pumps (GSHPs) typically have higher COPs than ASHPs because:",
    options: [
      "They use more electricity",
      "Ground temperatures are more stable and higher in winter",
      "They are always larger systems",
      "They do not require defrost cycles"
    ],
    correctAnswer: 1,
    explanation: "Ground temperatures at collector depth (typically 1-2m) remain relatively stable at 8-12degC year-round in the UK. This provides a more consistent and warmer heat source in winter compared to cold air, reducing temperature lift and improving COP."
  },
  {
    id: 5,
    question: "What is the minimum recommended buffer vessel size for a 12kW heat pump?",
    options: ["10 litres", "20-30 litres", "50-100 litres", "200+ litres"],
    correctAnswer: 2,
    explanation: "The rule of thumb is 10-20 litres per kW of heat pump capacity. For a 12kW unit, this means 120-240 litres, but practical minimum is typically 50-100 litres. Actual sizing depends on the number of zones, TRV coverage, and heat pump modulation range."
  },
  {
    id: 6,
    question: "During a defrost cycle, an ASHP:",
    options: [
      "Continues heating normally",
      "Temporarily reverses to remove ice from the outdoor coil",
      "Switches to backup electric heating permanently",
      "Reduces output by 50%"
    ],
    correctAnswer: 1,
    explanation: "Defrost cycles temporarily reverse the refrigerant flow, using heat from the building to melt ice on the outdoor evaporator coil. This typically takes 2-10 minutes and occurs when outdoor temperatures are between -7degC and +7degC with high humidity."
  },
  {
    id: 7,
    question: "What is the typical electrical supply requirement for a domestic ASHP of 8-12kW?",
    options: [
      "Single-phase 13A",
      "Single-phase 32A or three-phase",
      "Three-phase 63A minimum",
      "Single-phase 16A"
    ],
    correctAnswer: 1,
    explanation: "Domestic ASHPs of 8-12kW typically require single-phase 32A supplies or three-phase connections. The electrical demand is approximately 25-35% of heat output due to COP. Larger commercial units (&gt;15kW) usually require three-phase supplies."
  },
  {
    id: 8,
    question: "In a hybrid heat pump system, the boiler typically operates when:",
    options: [
      "The heat pump is switched off for maintenance",
      "Outdoor temperatures are very low or high-temperature DHW is needed",
      "The system first starts up each day",
      "Electricity prices are at their lowest"
    ],
    correctAnswer: 1,
    explanation: "Hybrid systems use the heat pump as primary when efficient (milder conditions), switching to the boiler when outdoor temperatures drop significantly (reducing heat pump COP) or when high-temperature domestic hot water is required quickly."
  },
  {
    id: 9,
    question: "What is the maximum flow temperature at which most heat pumps can operate efficiently?",
    options: ["35degC", "45-55degC", "65-75degC", "80degC"],
    correctAnswer: 1,
    explanation: "Most heat pumps operate efficiently up to 45-55degC flow temperature. Some high-temperature models can reach 65-70degC but with reduced efficiency. For optimal COP, systems should be designed for 35-45degC flow using UFH or oversized radiators."
  },
  {
    id: 10,
    question: "Part L of the Building Regulations requires heat pumps to achieve a minimum:",
    options: [
      "COP of 2.0",
      "SCOP of 2.5 (for wet heating systems)",
      "Flow temperature of 55degC",
      "Electrical efficiency of 90%"
    ],
    correctAnswer: 1,
    explanation: "Part L 2021 requires heat pumps serving wet central heating systems to achieve minimum SCOP of 2.5. This ensures carbon savings compared to gas boilers and is verified through MCS design methodology during installation."
  },
  {
    id: 11,
    question: "What is the primary advantage of a monobloc ASHP over a split system?",
    options: [
      "Higher COP in all conditions",
      "No F-gas qualified installer required for installation",
      "Lower noise levels",
      "Smaller outdoor unit"
    ],
    correctAnswer: 1,
    explanation: "Monobloc units contain all refrigerant in the outdoor unit, with only water pipes running to the building. This means installation does not require F-gas certified technicians, simplifying installation and reducing costs compared to split systems."
  },
  {
    id: 12,
    question: "Weather compensation in heat pump systems:",
    options: [
      "Increases flow temperature when outdoor temperature rises",
      "Adjusts flow temperature based on outdoor conditions to optimise efficiency",
      "Only operates during defrost cycles",
      "Is optional and rarely used in modern systems"
    ],
    correctAnswer: 1,
    explanation: "Weather compensation automatically adjusts the heating flow temperature based on outdoor temperature. As it gets colder outside, flow temperature increases; as it warms up, flow temperature decreases. This optimises efficiency by minimising temperature lift when possible."
  },
  {
    id: 13,
    question: "The refrigerant R32 commonly used in modern ASHPs:",
    options: [
      "Has zero global warming potential",
      "Has lower GWP than R410A but is mildly flammable (A2L)",
      "Requires no special handling or certification",
      "Cannot operate below 0degC"
    ],
    correctAnswer: 1,
    explanation: "R32 has a GWP of 675 compared to R410A's GWP of 2088, making it more environmentally friendly. However, R32 is classified as A2L (mildly flammable), requiring appropriate handling procedures and F-gas certification for any refrigerant work."
  },
  {
    id: 14,
    question: "When sizing radiators for a heat pump system designed for 40degC flow temperature:",
    options: [
      "Use standard radiator sizing from boiler calculations",
      "Radiators should be approximately 2-2.5 times larger than for 75degC systems",
      "Radiators should be 50% smaller to reduce costs",
      "Only panel radiators can be used"
    ],
    correctAnswer: 1,
    explanation: "At 40degC flow (vs 75degC for boilers), radiator output is significantly reduced. Radiators must be 2-2.5 times larger (or use higher output types like double-panel plus convector) to achieve the same heat output at lower flow temperatures."
  }
];

const faqs = [
  {
    question: "Can a heat pump replace my gas boiler directly?",
    answer: "In most cases, heat pumps can replace gas boilers but system modifications are usually required. The key considerations are: radiator sizing (may need upgrading for low-temperature operation), hot water cylinder (heat pumps work best with larger, well-insulated cylinders), electrical supply (typically 32A single-phase or three-phase for larger units), and building fabric (heat pumps perform best in well-insulated properties). A heat loss calculation should be completed first to size the system correctly."
  },
  {
    question: "What is the difference between COP and SCOP?",
    answer: "COP (Coefficient of Performance) is the instantaneous efficiency measured at specific test conditions - it tells you heat output divided by electrical input at that moment. SCOP (Seasonal Coefficient of Performance) accounts for efficiency variations throughout an entire heating season, including part-load operation, defrost cycles, standby losses, and varying outdoor temperatures. SCOP gives a more realistic picture of annual running costs and is the figure used for Part L compliance and MCS calculations."
  },
  {
    question: "Do heat pumps work in cold UK winters?",
    answer: "Yes, modern ASHPs operate efficiently down to -20degC outdoor temperature. At very low temperatures, COP decreases (typically from 4.0 at 7degC to 2.5 at -7degC) but the system continues to provide heat. Defrost cycles become more frequent in cold, humid conditions. Ground source heat pumps are less affected by outdoor temperature as ground temperatures remain stable at 8-12degC year-round. Proper system design accounts for peak winter heating demand."
  },
  {
    question: "Why do heat pump systems need buffer vessels?",
    answer: "Buffer vessels serve several critical functions: preventing short cycling when heating demand is low (protecting the compressor), providing thermal mass during defrost cycles, balancing flow when zone valves close, and allowing the heat pump to run for longer periods at optimal efficiency. Sizing depends on heat pump capacity, system design, and the degree of zoning. Some inverter-driven heat pumps with wide modulation ranges may require smaller or no buffer vessels."
  },
  {
    question: "What grants are available for heat pump installations?",
    answer: "The Boiler Upgrade Scheme (BUS) provides grants of 7,500 pounds for air source heat pumps and 7,500 pounds for ground source heat pumps in England and Wales. To qualify, the property must have an EPC (with no outstanding loft or cavity wall insulation recommendations for ASHPs), the installer must be MCS certified, and the property must not be a new build. Scotland has separate schemes including Home Energy Scotland grants and loans. Check current availability as schemes are periodically updated."
  },
  {
    question: "What electrical work is required for heat pump installation?",
    answer: "Electrical requirements include: dedicated circuit from consumer unit (typically 32A single-phase or three-phase for larger units), appropriate MCB/RCBO protection, correct cable sizing for the load and route length, external isolator adjacent to outdoor unit, controls wiring to cylinder and heating system, and potential earthing/bonding requirements. The electrical installation must comply with BS 7671 and Part P of Building Regulations. Some installations may require DNO notification or supply upgrade."
  }
];

const HNCModule8Section1_2 = () => {
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
            <ThermometerSun className="h-4 w-4" />
            <span>Module 8.1.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Heat Pump Integration
          </h1>
          <p className="text-white/80">
            Principles, system integration, buffer vessels, flow temperatures and hybrid systems for building services
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>COP:</strong> Heat output / electrical input (typically 2.5-4.0 for ASHPs)</li>
              <li className="pl-1"><strong>Flow temp:</strong> 35-45degC optimal for efficiency</li>
              <li className="pl-1"><strong>Buffer vessel:</strong> 10-20 litres per kW capacity</li>
              <li className="pl-1"><strong>MCS:</strong> Required for BUS grants (7,500 pounds)</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Electrical Requirements</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Small ASHP (&lt;8kW):</strong> Single-phase 20A</li>
              <li className="pl-1"><strong>Medium ASHP (8-12kW):</strong> Single-phase 32A</li>
              <li className="pl-1"><strong>Large ASHP (&gt;15kW):</strong> Three-phase supply</li>
              <li className="pl-1"><strong>Controls:</strong> Weather compensation, BMS integration</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain ASHP and GSHP operating principles and refrigerant cycles",
              "Calculate and interpret COP and SCOP values",
              "Design heat pump systems with appropriate buffer vessel sizing",
              "Specify low-temperature heating emitters (35-45degC flow)",
              "Understand MCS requirements and Part L compliance",
              "Configure hybrid heat pump systems with gas/oil backup",
              "Specify electrical supplies for heat pump installations",
              "Manage defrost cycles and weather compensation"
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

        {/* Section 1: Heat Pump Principles */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Heat Pump Principles - ASHP and GSHP
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Heat pumps extract low-grade heat from the environment (air, ground, or water) and upgrade it
              to useful temperatures for space heating and hot water. They operate on the vapour compression
              refrigerant cycle, the same principle as refrigerators but in reverse - moving heat into the
              building rather than out of it.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Air Source Heat Pumps (ASHP)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Extract heat from outdoor air using a fan-assisted evaporator coil</li>
                <li className="pl-1">Operate efficiently down to -20degC (with reduced COP at extremes)</li>
                <li className="pl-1">Require defrost cycles in cold, humid conditions (typically -7degC to +7degC)</li>
                <li className="pl-1">Available as monobloc (all-in-one) or split system configurations</li>
                <li className="pl-1">Typical SCOP range: 2.5-3.5 in UK climate conditions</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Ground Source Heat Pumps (GSHP)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Extract heat from the ground via horizontal trenches or vertical boreholes</li>
                <li className="pl-1">Ground temperature stable at 8-12degC year-round (1-2m depth)</li>
                <li className="pl-1">Higher installation cost but better SCOP (3.0-4.5 typical)</li>
                <li className="pl-1">No defrost cycles required - more consistent performance</li>
                <li className="pl-1">Require significant land area for horizontal collectors or drilling access</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Refrigerant Cycle</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm text-white/90">
                <div>
                  <p className="font-medium mb-1">1. Evaporator (Outdoor)</p>
                  <p className="text-white/70 text-xs">Low-pressure liquid refrigerant absorbs heat from air/ground, becoming a gas</p>
                </div>
                <div>
                  <p className="font-medium mb-1">2. Compressor</p>
                  <p className="text-white/70 text-xs">Compresses the gas, raising its temperature significantly (this is where electricity is used)</p>
                </div>
                <div>
                  <p className="font-medium mb-1">3. Condenser (Indoor)</p>
                  <p className="text-white/70 text-xs">Hot gas releases heat to heating water, condensing back to liquid</p>
                </div>
                <div>
                  <p className="font-medium mb-1">4. Expansion Valve</p>
                  <p className="text-white/70 text-xs">Pressure drops rapidly, cooling the refrigerant ready for evaporator</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">COP and SCOP Calculations</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Measure</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Formula</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">COP</td>
                      <td className="border border-white/10 px-3 py-2">Heat Output (kW) / Electrical Input (kW)</td>
                      <td className="border border-white/10 px-3 py-2">Instantaneous efficiency at test conditions</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">SCOP</td>
                      <td className="border border-white/10 px-3 py-2">Total Heat (kWh) / Total Electricity (kWh)</td>
                      <td className="border border-white/10 px-3 py-2">Seasonal average including all operating modes</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">SPF</td>
                      <td className="border border-white/10 px-3 py-2">Measured annual heat / annual electricity</td>
                      <td className="border border-white/10 px-3 py-2">Actual field performance (varies by installation)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Example: COP Calculation</p>
              <p className="font-mono text-center text-base mb-2">COP = Q<sub>heat</sub> / W<sub>elec</sub></p>
              <p className="text-sm text-white/90 text-center mb-2">
                If a heat pump uses 2.5kW electricity and outputs 10kW heat:
              </p>
              <p className="font-mono text-center text-lg text-elec-yellow">COP = 10 / 2.5 = 4.0</p>
              <p className="text-xs text-white/70 text-center mt-2">
                This means 7.5kW of "free" environmental heat is added to 2.5kW of electrical energy
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key principle:</strong> COP decreases as the temperature lift increases. Minimising the difference between source temperature (outdoor/ground) and delivery temperature (flow) maximises efficiency.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: System Integration and Buffer Vessels */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            System Integration and Buffer Vessels
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Successful heat pump integration requires careful system design to match the heat pump's
              operating characteristics with building heat demand. Unlike boilers that can modulate quickly,
              heat pumps prefer steady-state operation and are sensitive to short cycling and rapid load changes.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Buffer Vessel Functions</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Prevent short cycling:</strong> Provides thermal mass for minimum compressor run times (typically 6+ minutes)</li>
                <li className="pl-1"><strong>Defrost support:</strong> Supplies heat during defrost cycles when heat pump reverses</li>
                <li className="pl-1"><strong>Zone balancing:</strong> Accommodates flow variations when TRVs or zone valves close</li>
                <li className="pl-1"><strong>Hydraulic separation:</strong> Decouples heat pump flow from heating circuit flow rates</li>
                <li className="pl-1"><strong>Efficiency optimisation:</strong> Allows heat pump to operate at optimal conditions</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Buffer Vessel Sizing Guidelines</p>
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-elec-yellow mb-1">Basic Rule of Thumb</p>
                  <p className="text-white/70 text-xs">10-20 litres per kW of heat pump capacity</p>
                  <p className="text-white/70 text-xs mt-1">12kW ASHP = 120-240 litre buffer</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-elec-yellow mb-1">MCS Minimum Calculation</p>
                  <p className="text-white/70 text-xs">V = (Q x t<sub>min</sub>) / (deltaT x 4.18)</p>
                  <p className="text-white/70 text-xs mt-1">Where t<sub>min</sub> = minimum run time (6 mins)</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Buffer Vessel Configuration Options</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Configuration</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Considerations</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2-pipe buffer</td>
                      <td className="border border-white/10 px-3 py-2">Standard residential</td>
                      <td className="border border-white/10 px-3 py-2">Simple, cost-effective, good for single-zone</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4-pipe buffer</td>
                      <td className="border border-white/10 px-3 py-2">Multi-zone systems</td>
                      <td className="border border-white/10 px-3 py-2">Better stratification, separates HP and heating circuits</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Low-loss header</td>
                      <td className="border border-white/10 px-3 py-2">Variable flow systems</td>
                      <td className="border border-white/10 px-3 py-2">Minimal storage, hydraulic separation only</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">No buffer</td>
                      <td className="border border-white/10 px-3 py-2">Wide-modulating inverter HP</td>
                      <td className="border border-white/10 px-3 py-2">Only if HP can modulate &gt;5:1 and single large zone</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">System Hydraulics</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Primary circuit:</strong> Heat pump to buffer - constant flow, pump sized for HP requirements</li>
                <li className="pl-1"><strong>Secondary circuit:</strong> Buffer to emitters - variable flow based on demand</li>
                <li className="pl-1"><strong>Blending valve:</strong> May be required to achieve specific flow temperatures</li>
                <li className="pl-1"><strong>Expansion vessel:</strong> Sized for total system volume including buffer</li>
                <li className="pl-1"><strong>Pressure relief:</strong> Set according to system pressure rating (typically 3 bar)</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg border border-orange-500/30 bg-orange-500/10">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-orange-300 mb-1">Critical Design Points</p>
                  <ul className="text-sm text-white/90 space-y-1 list-disc list-outside ml-4">
                    <li>Never bypass the buffer vessel - this leads to short cycling and compressor damage</li>
                    <li>Ensure adequate flow through heat pump at all times (minimum flow switches)</li>
                    <li>Automatic air vents essential at high points - air locks affect efficiency</li>
                    <li>Glycol antifreeze may reduce heat transfer - adjust sizing accordingly</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>MCS requirement:</strong> The MCS Heat Pump Standard (MIS 3005) specifies buffer vessel sizing methodology. Non-compliance can affect warranty and grant eligibility.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Low Temperature Heating and Flow Temperatures */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Low Temperature Heating and Flow Temperatures
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Heat pumps achieve optimal efficiency when operating at low flow temperatures, typically
              35-45degC compared to 70-80degC for traditional gas boilers. This fundamental difference
              requires careful consideration of heat emitter selection and building fabric performance.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Why Low Flow Temperatures Matter</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Reduced temperature lift:</strong> Smaller difference between source and sink = higher COP</li>
                <li className="pl-1"><strong>COP improvement:</strong> Each 1degC reduction in flow temperature increases COP by approximately 2-3%</li>
                <li className="pl-1"><strong>Part L compliance:</strong> Low-temperature operation essential for meeting SCOP requirements</li>
                <li className="pl-1"><strong>System longevity:</strong> Reduced thermal stress on components</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Heat Emitter Options for Low Temperature Systems</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Emitter Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Ideal Flow Temp</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Suitability</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Underfloor heating (UFH)</td>
                      <td className="border border-white/10 px-3 py-2">30-40degC</td>
                      <td className="border border-white/10 px-3 py-2">Excellent - ideal partner for heat pumps</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fan convectors</td>
                      <td className="border border-white/10 px-3 py-2">35-45degC</td>
                      <td className="border border-white/10 px-3 py-2">Very good - forced air improves output</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Oversized radiators (2-2.5x)</td>
                      <td className="border border-white/10 px-3 py-2">40-50degC</td>
                      <td className="border border-white/10 px-3 py-2">Good - requires larger radiators</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Standard radiators</td>
                      <td className="border border-white/10 px-3 py-2">55-70degC</td>
                      <td className="border border-white/10 px-3 py-2">Poor - significantly reduces COP</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Radiator Output at Different Flow Temperatures</p>
              <p className="text-sm text-white/90 mb-3">
                Radiator output varies with the mean water temperature (MWT) difference from room temperature.
                At lower flow temperatures, output drops significantly:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-sm">
                <div className="p-2 rounded bg-white/5">
                  <p className="text-elec-yellow font-bold">75degC flow</p>
                  <p className="text-white/70 text-xs">100% output</p>
                  <p className="text-white/60 text-xs">(MWT 60degC)</p>
                </div>
                <div className="p-2 rounded bg-white/5">
                  <p className="text-elec-yellow font-bold">55degC flow</p>
                  <p className="text-white/70 text-xs">~60% output</p>
                  <p className="text-white/60 text-xs">(MWT 45degC)</p>
                </div>
                <div className="p-2 rounded bg-white/5">
                  <p className="text-elec-yellow font-bold">45degC flow</p>
                  <p className="text-white/70 text-xs">~45% output</p>
                  <p className="text-white/60 text-xs">(MWT 37degC)</p>
                </div>
                <div className="p-2 rounded bg-white/5">
                  <p className="text-elec-yellow font-bold">35degC flow</p>
                  <p className="text-white/70 text-xs">~25% output</p>
                  <p className="text-white/60 text-xs">(MWT 30degC)</p>
                </div>
              </div>
              <p className="text-xs text-white/60 mt-2 text-center">Based on Delta T50 rated output and 20degC room temperature</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Weather Compensation Control</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Principle:</strong> Flow temperature varies automatically with outdoor temperature</li>
                <li className="pl-1"><strong>Heating curve:</strong> Defines relationship between outdoor temp and flow temp</li>
                <li className="pl-1"><strong>Steeper curves:</strong> For poorly insulated buildings or undersized emitters</li>
                <li className="pl-1"><strong>Shallower curves:</strong> For well-insulated buildings with UFH</li>
                <li className="pl-1"><strong>Parallel shift:</strong> Adjusts overall level while maintaining curve slope</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Weather Compensation Settings</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Outdoor Temp</th>
                      <th className="border border-white/10 px-3 py-2 text-left">UFH System</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Oversized Radiators</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">15degC</td>
                      <td className="border border-white/10 px-3 py-2">25degC</td>
                      <td className="border border-white/10 px-3 py-2">30degC</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">7degC</td>
                      <td className="border border-white/10 px-3 py-2">32degC</td>
                      <td className="border border-white/10 px-3 py-2">40degC</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">0degC</td>
                      <td className="border border-white/10 px-3 py-2">38degC</td>
                      <td className="border border-white/10 px-3 py-2">48degC</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">-5degC</td>
                      <td className="border border-white/10 px-3 py-2">42degC</td>
                      <td className="border border-white/10 px-3 py-2">55degC</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Defrost Cycle Management</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>When required:</strong> Typically -7degC to +7degC outdoor with high humidity</li>
                <li className="pl-1"><strong>Duration:</strong> 2-10 minutes depending on ice build-up</li>
                <li className="pl-1"><strong>Method:</strong> Reverses refrigerant cycle to heat outdoor coil</li>
                <li className="pl-1"><strong>Heat source:</strong> Uses building heat (via buffer vessel) during defrost</li>
                <li className="pl-1"><strong>Impact:</strong> Reduces effective SCOP by 5-10% during defrost conditions</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design target:</strong> Aim for maximum flow temperature of 45degC at design outdoor temperature (-3degC typical for UK). This ensures efficient operation across the heating season.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Hybrid Systems, Electrical Requirements and Part L Compliance */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Hybrid Systems, Electrical Requirements and Part L Compliance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Hybrid heat pump systems combine a heat pump with a conventional boiler, offering flexibility
              to optimise efficiency and meet peak demands. Understanding electrical requirements and
              regulatory compliance is essential for successful installations.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Hybrid System Operation</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Bivalent point:</strong> Outdoor temperature at which boiler supplements heat pump</li>
                <li className="pl-1"><strong>Parallel operation:</strong> Both systems run simultaneously during peak demand</li>
                <li className="pl-1"><strong>Alternative operation:</strong> Boiler takes over completely when HP efficiency drops</li>
                <li className="pl-1"><strong>Cost optimisation:</strong> Controllers can switch based on electricity/gas price</li>
                <li className="pl-1"><strong>DHW boost:</strong> Boiler provides rapid hot water recovery when needed</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Hybrid System Control Strategies</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-white mb-1">Temperature-Based</p>
                  <ul className="text-white/70 text-xs space-y-1 list-disc list-outside ml-4">
                    <li>HP only above bivalent point (e.g., -2degC)</li>
                    <li>Boiler assists below bivalent point</li>
                    <li>Boiler only below cut-off (e.g., -10degC)</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-1">Cost-Based</p>
                  <ul className="text-white/70 text-xs space-y-1 list-disc list-outside ml-4">
                    <li>Calculates running cost at current COP</li>
                    <li>Compares with gas cost for same heat output</li>
                    <li>Selects cheapest option automatically</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Electrical Supply Requirements</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Heat Pump Size</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Supply</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Circuit Protection</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">&lt;8kW heat output</td>
                      <td className="border border-white/10 px-3 py-2">Single-phase 20A</td>
                      <td className="border border-white/10 px-3 py-2">20A Type C MCB or RCBO</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">8-12kW heat output</td>
                      <td className="border border-white/10 px-3 py-2">Single-phase 32A</td>
                      <td className="border border-white/10 px-3 py-2">32A Type C MCB or RCBO</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">12-16kW heat output</td>
                      <td className="border border-white/10 px-3 py-2">Single-phase 40A or 3-phase</td>
                      <td className="border border-white/10 px-3 py-2">40A Type C or TP 16A per phase</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">&gt;16kW heat output</td>
                      <td className="border border-white/10 px-3 py-2">Three-phase supply</td>
                      <td className="border border-white/10 px-3 py-2">TP&N sized to manufacturer spec</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Electrical Installation Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Dedicated circuit:</strong> Heat pump must have its own final circuit from consumer unit</li>
                <li className="pl-1"><strong>Cable sizing:</strong> As per BS 7671 Table 4D1A/B/C - consider route length and grouping</li>
                <li className="pl-1"><strong>External isolator:</strong> Rotary isolator required adjacent to outdoor unit (within 3m)</li>
                <li className="pl-1"><strong>RCD protection:</strong> 30mA RCD required for outdoor units (Regulation 411.3.3)</li>
                <li className="pl-1"><strong>Surge protection:</strong> SPD recommended for inverter-driven heat pumps</li>
                <li className="pl-1"><strong>Controls wiring:</strong> Low voltage connections to cylinder, room stats, BMS</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">DNO Notification Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>G98:</strong> Applies to heat pumps with export capability (rare for heating-only units)</li>
                <li className="pl-1"><strong>Supply upgrade:</strong> May be required if existing supply is inadequate</li>
                <li className="pl-1"><strong>Load notification:</strong> Some DNOs require notification for loads &gt;13.8kW</li>
                <li className="pl-1"><strong>Three-phase upgrade:</strong> Application required if converting from single-phase</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Part L Compliance Requirements (England 2021)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Minimum SCOP:</strong> 2.5 for wet central heating systems</li>
                <li className="pl-1"><strong>Design methodology:</strong> MCS Heat Pump Calculator or equivalent required</li>
                <li className="pl-1"><strong>Heat loss calculation:</strong> Room-by-room heat loss to BS EN 12831</li>
                <li className="pl-1"><strong>Controls:</strong> Weather compensation mandatory for new installations</li>
                <li className="pl-1"><strong>Commissioning:</strong> Evidence of proper balancing and performance testing</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">MCS Certification Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>MIS 3005:</strong> Heat pump installation standard - mandatory for BUS grants</li>
                <li className="pl-1"><strong>Design process:</strong> Heat loss calculation, emitter sizing, heat pump selection</li>
                <li className="pl-1"><strong>Documentation:</strong> Design certificate, commissioning checklist, user handover</li>
                <li className="pl-1"><strong>Performance estimate:</strong> Annual heat demand, electricity consumption, running costs</li>
                <li className="pl-1"><strong>Warranty:</strong> Minimum 2-year installation warranty required</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg border border-orange-500/30 bg-orange-500/10">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-orange-300 mb-1">Common Compliance Issues</p>
                  <ul className="text-sm text-white/90 space-y-1 list-disc list-outside ml-4">
                    <li>Oversized heat pump for heat loss (reduces efficiency)</li>
                    <li>Undersized emitters requiring high flow temperatures</li>
                    <li>Missing or incorrect weather compensation setup</li>
                    <li>Insufficient buffer vessel capacity</li>
                    <li>Inadequate electrical supply or incorrect protection</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Grant eligibility:</strong> Only MCS-certified installations by MCS-registered installers qualify for the Boiler Upgrade Scheme. Ensure all documentation is completed correctly before applying.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: COP and Running Cost Comparison</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 10kW ASHP has a COP of 3.5 at 2degC outdoor/40degC flow. Compare running cost with a 90% efficient gas boiler. Electricity = 28p/kWh, Gas = 8p/kWh.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Heat pump electrical input:</p>
                <p>P<sub>elec</sub> = Heat output / COP = 10kW / 3.5 = <strong>2.86kW</strong></p>
                <p className="mt-2">Heat pump running cost per hour:</p>
                <p>Cost<sub>HP</sub> = 2.86 x 28p = <strong>80p/hour</strong></p>
                <p className="mt-2">Gas boiler input for same heat:</p>
                <p>P<sub>gas</sub> = Heat output / efficiency = 10kW / 0.90 = <strong>11.1kW</strong></p>
                <p className="mt-2">Gas boiler running cost per hour:</p>
                <p>Cost<sub>gas</sub> = 11.1 x 8p = <strong>89p/hour</strong></p>
                <p className="mt-2 text-green-400">Heat pump is 10% cheaper at COP 3.5</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Buffer Vessel Sizing</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Size a buffer vessel for a 12kW ASHP with 6-minute minimum run time and 5K temperature differential.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Using MCS formula:</p>
                <p>V = (Q x t<sub>min</sub>) / (deltaT x 4.18)</p>
                <p className="mt-2">Where:</p>
                <p>Q = 12kW = 12kJ/s</p>
                <p>t<sub>min</sub> = 6 minutes = 360 seconds</p>
                <p>deltaT = 5K</p>
                <p>4.18 = specific heat capacity of water (kJ/kg.K)</p>
                <p className="mt-2">Calculation:</p>
                <p>V = (12 x 360) / (5 x 4.18)</p>
                <p>V = 4320 / 20.9 = <strong>207 litres</strong></p>
                <p className="mt-2 text-white/60">Select 200-250 litre buffer vessel</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Radiator Sizing for Low Temperature</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A room requires 2kW heat output. An existing radiator is rated at 1.5kW at Delta T50 (75/65/20degC). Is it suitable for 45degC flow?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Original conditions (Delta T50):</p>
                <p>Flow 75degC, Return 65degC, Room 20degC</p>
                <p>Mean water temp = (75+65)/2 = 70degC</p>
                <p>Delta T = 70 - 20 = 50K</p>
                <p className="mt-2">New conditions (45degC flow, 5K drop):</p>
                <p>Flow 45degC, Return 40degC, Room 20degC</p>
                <p>Mean water temp = (45+40)/2 = 42.5degC</p>
                <p>Delta T = 42.5 - 20 = 22.5K</p>
                <p className="mt-2">Output correction (using n=1.3 exponent):</p>
                <p>Correction factor = (22.5/50)^1.3 = 0.34</p>
                <p>New output = 1.5kW x 0.34 = <strong>0.51kW</strong></p>
                <p className="mt-2 text-red-400">Radiator only provides 0.51kW vs 2kW required</p>
                <p className="text-white/60">Need radiator 4x larger (6kW Delta T50 rating)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 4: Electrical Circuit Sizing</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Size the electrical circuit for a 12kW ASHP with maximum electrical input of 4.2kW at 230V single-phase. Cable run is 25m.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Maximum current:</p>
                <p>I<sub>max</sub> = P / V = 4200W / 230V = <strong>18.3A</strong></p>
                <p className="mt-2">Starting current consideration:</p>
                <p>Compressor inrush can be 3-5x running current</p>
                <p>Soft start usually limits to 2x = ~37A</p>
                <p className="mt-2">Circuit protection:</p>
                <p>Select 32A Type C MCB (handles starting current)</p>
                <p className="mt-2">Cable sizing (BS 7671 Table 4D1A - clipped direct):</p>
                <p>For 32A protection: 4mm squared = 36A capacity</p>
                <p>Voltage drop check: 4mm squared = 11mV/A/m</p>
                <p>V<sub>drop</sub> = 18.3 x 25 x 0.011 = 5.0V (2.2%)</p>
                <p className="mt-2 text-green-400">4mm squared T&E adequate - meets 5% limit</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 5: Hybrid System Bivalent Point</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Determine when gas backup becomes more economical. HP COP varies with outdoor temperature. Electricity 30p/kWh, Gas 10p/kWh, Boiler 90% efficient.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Gas cost per kWh heat:</p>
                <p>Cost<sub>gas</sub> = 10p / 0.90 = <strong>11.1p/kWh</strong></p>
                <p className="mt-2">HP cost per kWh heat at various COPs:</p>
                <p>COP 4.0: 30p / 4.0 = 7.5p/kWh (HP cheaper)</p>
                <p>COP 3.0: 30p / 3.0 = 10.0p/kWh (HP cheaper)</p>
                <p>COP 2.7: 30p / 2.7 = 11.1p/kWh (breakeven)</p>
                <p>COP 2.5: 30p / 2.5 = 12.0p/kWh (gas cheaper)</p>
                <p className="mt-2">Breakeven COP:</p>
                <p>COP<sub>break</sub> = Elec price / (Gas price / Boiler eff)</p>
                <p>COP<sub>break</sub> = 30 / (10/0.9) = <strong>2.7</strong></p>
                <p className="mt-2 text-white/60">Switch to gas when outdoor temp causes COP &lt; 2.7</p>
                <p className="text-white/60">Typically around -5degC to -7degC for most ASHPs</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Essential Heat Pump Parameters</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>COP formula:</strong> Heat Output (kW) / Electrical Input (kW)</li>
                <li className="pl-1"><strong>Typical ASHP SCOP:</strong> 2.5-3.5 (UK climate)</li>
                <li className="pl-1"><strong>Typical GSHP SCOP:</strong> 3.0-4.5</li>
                <li className="pl-1"><strong>Optimal flow temp:</strong> 35-45degC for best efficiency</li>
                <li className="pl-1"><strong>Part L minimum SCOP:</strong> 2.5 for wet heating systems</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">System Design Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Heat loss calculation to BS EN 12831 (room by room)</li>
                <li className="pl-1">Heat pump sized to 100% of design heat loss (avoid oversizing)</li>
                <li className="pl-1">Emitters sized for 45degC maximum flow temperature</li>
                <li className="pl-1">Buffer vessel sized per MCS methodology</li>
                <li className="pl-1">Hot water cylinder minimum 200 litres with heat pump coil</li>
                <li className="pl-1">Weather compensation configured and tested</li>
                <li className="pl-1">Electrical supply adequate with correct protection</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Commissioning Essentials</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">System flushed and filled with inhibitor</li>
                <li className="pl-1">Pressure tested and leak-free</li>
                <li className="pl-1">Heating circuits balanced</li>
                <li className="pl-1">Weather compensation curve set and verified</li>
                <li className="pl-1">Defrost operation verified</li>
                <li className="pl-1">Controls operation demonstrated to user</li>
                <li className="pl-1">All documentation completed (MCS certificate, user manual)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Installation Errors</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Oversized heat pump:</strong> Leads to short cycling and reduced efficiency</li>
                <li className="pl-1"><strong>Missing buffer:</strong> Compressor damage from short cycling</li>
                <li className="pl-1"><strong>High flow temps:</strong> Poor COP from running at 55-65degC</li>
                <li className="pl-1"><strong>Small cylinder:</strong> Insufficient recovery time for DHW</li>
                <li className="pl-1"><strong>No weather comp:</strong> Fixed flow temperature wastes energy</li>
                <li className="pl-1"><strong>Air locks:</strong> Reduce heat output and damage pumps</li>
                <li className="pl-1"><strong>Incorrect refrigerant charge:</strong> Affects performance (F-gas work only)</li>
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
                <p className="font-medium text-white mb-1">Heat Pump Efficiency</p>
                <ul className="space-y-0.5">
                  <li>COP = Heat Output / Electrical Input</li>
                  <li>SCOP = Seasonal average performance</li>
                  <li>Part L minimum SCOP: 2.5</li>
                  <li>Typical ASHP SCOP: 2.5-3.5</li>
                  <li>Typical GSHP SCOP: 3.0-4.5</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">System Sizing</p>
                <ul className="space-y-0.5">
                  <li>Buffer: 10-20 litres per kW</li>
                  <li>Radiators: 2-2.5x at 40degC flow</li>
                  <li>Cylinder: 200L minimum</li>
                  <li>Electrical: 32A typical for 8-12kW</li>
                  <li>Three-phase: &gt;15kW heat output</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Flow Temperatures</p>
                <ul className="space-y-0.5">
                  <li>UFH optimal: 30-40degC</li>
                  <li>Heat pump optimal: 35-45degC</li>
                  <li>Oversized radiators: 40-50degC</li>
                  <li>Standard radiators: 55-70degC</li>
                  <li>Max efficient: 45-55degC</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Grants and Standards</p>
                <ul className="space-y-0.5">
                  <li>BUS grant: 7,500 pounds (ASHP/GSHP)</li>
                  <li>MCS certification required</li>
                  <li>MIS 3005: Installation standard</li>
                  <li>Part L 2021: Building regs</li>
                  <li>BS 7671: Electrical installation</li>
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
            <Link to="../h-n-c-module8-section1-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Boiler Systems
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section1-3">
              Next: Underfloor Heating
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule8Section1_2;
