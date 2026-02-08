import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Wind and Other Renewables - MOET Module 3.6.2";
const DESCRIPTION = "Overview of wind power, hydro, heat pumps and other renewable energy technologies for electrical maintenance technicians: operating principles, electrical systems, grid connection, maintenance requirements and UK regulatory framework under ST1426.";

const quickCheckQuestions = [
  {
    id: "wind-generation",
    question: "How does a wind turbine generate electricity?",
    options: [
      "Through solar panels mounted on the blades",
      "Wind turns the rotor blades, which drive a generator (typically through a gearbox) to convert kinetic energy from the wind into electrical energy — either AC from a synchronous/asynchronous generator or variable-frequency AC converted to grid-frequency AC via power electronics",
      "Through piezoelectric crystals in the tower",
      "By burning biomass at the base"
    ],
    correctIndex: 1,
    explanation: "Wind turbines extract kinetic energy from moving air. The rotor blades convert wind energy into rotational mechanical energy, which is transmitted (usually via a gearbox, though direct-drive turbines exist) to an electrical generator. Modern turbines typically use either a doubly-fed induction generator (DFIG) or a permanent magnet synchronous generator (PMSG) with full power conversion. The output is conditioned by power electronics to match grid voltage and frequency before export."
  },
  {
    id: "heat-pump-cop",
    question: "What does the Coefficient of Performance (COP) of a heat pump represent?",
    options: [
      "The maximum temperature the heat pump can achieve",
      "The ratio of useful heat output to electrical energy input — a COP of 3.0 means the heat pump delivers 3 kW of heat for every 1 kW of electricity consumed, by extracting additional energy from the air, ground or water source",
      "The noise level of the compressor",
      "The refrigerant pressure"
    ],
    correctIndex: 1,
    explanation: "COP is the key efficiency metric for heat pumps. A COP of 3.0 means the system delivers three times more thermal energy than the electrical energy it consumes. The additional energy comes from the renewable heat source (air, ground or water). COP varies with conditions — air-source heat pumps (ASHPs) have lower COP in cold weather because there is less heat to extract from cold air. Seasonal COP (SCOP) gives a more realistic annual average, typically 2.5-3.5 for ASHPs and 3.5-4.5 for ground-source (GSHPs) in the UK."
  },
  {
    id: "grid-connection-renewables",
    question: "What engineering recommendation governs the connection of renewable generation above 3.68 kW per phase to the UK distribution network?",
    options: [
      "G12",
      "G99 (which replaced G59 in 2019) — it requires formal application, technical assessment and DNO approval before connection, and specifies protection settings, power quality limits and anti-islanding requirements",
      "G83",
      "BS 7671 only"
    ],
    correctIndex: 1,
    explanation: "G99 is the engineering recommendation that governs connection of generation above 3.68 kW per phase to the distribution network. It applies to all generation types — wind, solar, hydro, CHP, batteries, etc. G99 requires: formal application to the DNO; network impact assessment (including fault level contribution, voltage rise, and harmonic analysis); agreed protection settings; commissioning witness testing (for larger installations); and ongoing compliance. G98 covers smaller installations up to 3.68 kW per phase under a simpler 'fit and notify' process."
  },
  {
    id: "micro-hydro",
    question: "What type of generator is typically used in micro-hydro installations?",
    options: [
      "Solar cells",
      "An induction generator (connected to the grid, drawing magnetising current from the network) or a synchronous generator (self-exciting, can operate independently) — driven by a water turbine suited to the available head and flow rate",
      "A diesel engine",
      "A fuel cell"
    ],
    correctIndex: 1,
    explanation: "Micro-hydro installations use water turbines (Pelton, Turgo, Crossflow or Kaplan depending on head and flow rate) to drive an electrical generator. Induction (asynchronous) generators are common for grid-connected schemes because they are robust, low-maintenance, and inherently synchronise with the grid. Synchronous generators are used for off-grid installations or where reactive power control is needed. The choice of turbine type depends on the site characteristics: Pelton wheels for high head/low flow, Kaplan turbines for low head/high flow."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The main components of a horizontal-axis wind turbine electrical system are:",
    options: [
      "Only a generator",
      "Rotor and blades, gearbox (in geared designs), generator, power converter (rectifier/inverter), transformer, switchgear, control system and grid connection equipment",
      "Only blades and a motor",
      "Only a transformer"
    ],
    correctAnswer: 1,
    explanation: "A modern wind turbine electrical system comprises: rotor and blades (extracting kinetic energy); main shaft and gearbox (speed multiplication, absent in direct-drive designs); generator (DFIG or PMSG); power electronics (AC-DC-AC conversion for variable-speed operation); step-up transformer (raising voltage for grid connection); switchgear (protection and isolation); yaw system (orienting the nacelle into the wind); pitch system (adjusting blade angle for speed/power control); and the SCADA control system monitoring all parameters."
  },
  {
    id: 2,
    question: "An air-source heat pump (ASHP) differs from a ground-source heat pump (GSHP) in that:",
    options: [
      "An ASHP produces electricity",
      "An ASHP extracts heat from the ambient air using an external evaporator coil, while a GSHP extracts heat from the ground via buried pipe loops (horizontal trenches or vertical boreholes) — ASHPs are cheaper to install but have lower COP in cold weather",
      "A GSHP uses solar panels",
      "There is no difference"
    ],
    correctAnswer: 1,
    explanation: "ASHPs extract heat from outdoor air through a refrigerant evaporator (similar to a reversed air conditioning unit). They are cheaper to install (no ground works required) but their COP drops in cold weather when there is less heat available in the air. GSHPs extract heat from the ground via closed-loop pipes buried in trenches (1-2 m deep) or boreholes (50-200 m deep), where the ground temperature is relatively stable year-round (10-13 degrees C in the UK), giving higher and more consistent COP."
  },
  {
    id: 3,
    question: "A variable-speed wind turbine uses power electronics to:",
    options: [
      "Reduce the generator size",
      "Allow the rotor to operate at varying speeds (matching wind conditions for maximum energy capture) while delivering power at fixed grid frequency — the variable-frequency AC from the generator is converted to DC then back to grid-frequency AC",
      "Charge batteries only",
      "Control the tower lighting"
    ],
    correctAnswer: 1,
    explanation: "Variable-speed operation allows the turbine to adjust rotor speed to match wind conditions, maintaining the optimum tip-speed ratio for maximum aerodynamic efficiency. The generator produces variable-frequency AC which is rectified to DC and then inverted back to 50 Hz AC for grid export. This full power conversion also enables reactive power control and fault ride-through capability. The most common configurations are DFIG (partial power conversion) and PMSG with full converter."
  },
  {
    id: 4,
    question: "The Boiler Upgrade Scheme (BUS) in the UK provides:",
    options: [
      "Free boilers for all homes",
      "Capital grants towards the cost of installing heat pumps and certain biomass boilers in existing domestic and small non-domestic buildings, replacing fossil fuel heating systems — encouraging the transition to low-carbon heating",
      "Loans for wind turbines",
      "Subsidies for diesel generators"
    ],
    correctAnswer: 1,
    explanation: "The Boiler Upgrade Scheme (BUS) provides upfront capital grants to support the installation of heat pumps in England and Wales. As of 2025/2026, grants of up to GBP 7,500 are available for air-source heat pumps and ground-source heat pumps. The scheme supports the UK government's target to phase out new fossil fuel boilers by 2035. For maintenance technicians, this means a growing installed base of heat pump systems requiring ongoing electrical maintenance."
  },
  {
    id: 5,
    question: "Micro-hydro installations in the UK typically require:",
    options: [
      "No permissions at all",
      "An abstraction licence from the Environment Agency (or Natural Resources Wales/SEPA in Scotland), planning permission, and DNO connection approval under G98 or G99 — plus Fish and Environmental Impact assessments for the watercourse",
      "Only a building regulations certificate",
      "Only an electricity supply agreement"
    ],
    correctAnswer: 1,
    explanation: "Micro-hydro has significant regulatory requirements: abstraction licence (to take water from a watercourse), planning permission (for the turbine house, weir, intake and tailrace), environmental assessment (fish passage, sediment transport, minimum residual flow), DNO connection approval under G98/G99, and compliance with BS 7671 for the electrical installation. These requirements mean micro-hydro installations are less common than solar PV despite the UK having excellent hydro resources."
  },
  {
    id: 6,
    question: "Biomass Combined Heat and Power (CHP) systems:",
    options: [
      "Only produce heat",
      "Generate both electricity and useful heat simultaneously from biomass fuel (wood chip, pellets, agricultural waste), achieving overall efficiencies of 70-85% by utilising the waste heat from electricity generation",
      "Only produce electricity",
      "Use solar energy"
    ],
    correctAnswer: 1,
    explanation: "Biomass CHP burns biomass fuel to drive a generator (steam turbine, organic Rankine cycle, or gasification engine) while capturing the waste heat for space heating or industrial process heat. The overall efficiency (electrical + thermal) reaches 70-85%, compared to 30-40% for electricity-only generation. For maintenance technicians, CHP systems involve: generator maintenance, switchgear, synchronising controls, heat recovery equipment, and fuel handling systems."
  },
  {
    id: 7,
    question: "The main electrical maintenance requirement for an ASHP is:",
    options: [
      "Replacing the compressor annually",
      "Regular inspection of the electrical supply, control wiring, contactor condition, defrost system operation, refrigerant pressure/temperature readings, and compressor current draw — comparing with commissioning data to identify degradation",
      "Only checking the thermostat",
      "Painting the external unit"
    ],
    correctAnswer: 1,
    explanation: "ASHP electrical maintenance includes: supply circuit inspection and testing (MCB/RCD, cable condition); compressor current measurement (compare with rated and commissioning values — increased current indicates compressor wear or refrigerant issues); contactor inspection (pitting, welding); control board diagnostics (fault codes, sensor readings); defrost cycle verification (essential in UK winters); fan motor condition; and earthing/bonding continuity. Refrigerant system checks require F-Gas certification."
  },
  {
    id: 8,
    question: "A doubly-fed induction generator (DFIG) in a wind turbine:",
    options: [
      "Has no connection to the grid",
      "Has its stator connected directly to the grid and its rotor connected via a partial-rated power converter (typically 30% of full power), allowing variable-speed operation with a smaller, cheaper converter than a full-power conversion system",
      "Is the same as a standard induction motor",
      "Only works at one speed"
    ],
    correctAnswer: 1,
    explanation: "The DFIG is widely used in wind turbines. The stator connects directly to the grid, while the rotor is fed with variable-frequency AC from a power converter. The converter only handles the slip power (typically 30% of rated power), making it smaller and cheaper than a full-power converter. The rotor can operate at +/- 30% of synchronous speed, giving adequate variable-speed range for most wind conditions. Disadvantages include the need for slip rings and brushes on the rotor, which require maintenance."
  },
  {
    id: 9,
    question: "When connecting a renewable generator to the grid, the key electrical parameters that must be matched are:",
    options: [
      "Only voltage",
      "Voltage magnitude, frequency (50 Hz), phase sequence and phase angle — these must match the grid supply within specified tolerances before the generator can be synchronised and connected",
      "Only current",
      "Only power factor"
    ],
    correctAnswer: 1,
    explanation: "Synchronising a generator with the grid requires matching: voltage magnitude (within typically 5% of grid voltage); frequency (within 0.5 Hz of 50 Hz); phase sequence (same rotation direction — R-Y-B); and phase angle (the instantaneous voltage must be closely aligned at the moment of connection). Connecting an unsynchronised generator causes severe transient currents that can damage the generator, trip protection, and disturb other network users. Modern power converters handle synchronisation automatically."
  },
  {
    id: 10,
    question: "The UK's target for net zero greenhouse gas emissions by 2050 means:",
    options: [
      "No effect on electrical maintenance",
      "A massive increase in renewable generation, heat pumps, EV charging and battery storage — all requiring installation, maintenance and integration by electrical technicians, making emerging technology skills essential for the ST1426 maintenance technician",
      "Only gas boilers will be used",
      "Electricity demand will decrease"
    ],
    correctAnswer: 1,
    explanation: "The Climate Change Act 2008 (amended 2019) commits the UK to net zero by 2050. This requires: decarbonisation of electricity generation (80%+ renewables by 2035); electrification of heating (heat pump installations growing to 600,000 per year by 2028); electrification of transport (EV charging infrastructure); and grid-scale energy storage. For maintenance technicians, this means an increasing proportion of their work will involve renewable and low-carbon technologies — making the emerging technologies knowledge in ST1426 critical for career development."
  },
  {
    id: 11,
    question: "Tidal and wave energy technologies are:",
    options: [
      "Fully mature and widely deployed",
      "Still largely at demonstration and pre-commercial stage in the UK, with several prototype devices being tested in Scottish waters and the Severn Estuary — they offer predictable generation but face engineering challenges from the harsh marine environment",
      "Not possible in the UK",
      "Already the largest source of UK electricity"
    ],
    correctAnswer: 1,
    explanation: "Tidal and wave technologies are at an earlier stage of development than wind and solar. The UK has excellent tidal and wave resources (estimated 20-30 GW potential). Technologies include: tidal stream turbines (underwater turbines in strong tidal flows), tidal range/barrage (damming an estuary), and various wave energy converters. The European Marine Energy Centre (EMEC) in Orkney is the world's leading test facility. The harsh marine environment creates significant engineering and maintenance challenges, but the predictability of tidal generation is a major advantage over wind and solar."
  },
  {
    id: 12,
    question: "Under the Electricity at Work Regulations 1989, renewable energy systems:",
    options: [
      "Are exempt from the regulations",
      "Are treated as any other electrical system — the duty holder must ensure they are properly installed, maintained, and that persons working on them are competent and use safe systems of work appropriate to the specific hazards of each technology",
      "Only need inspection every 10 years",
      "Are only covered during installation"
    ],
    correctAnswer: 1,
    explanation: "The EAWR 1989 applies to all electrical systems, including all renewable energy technologies. Each technology has specific hazards: wind turbines involve working at height, rotating machinery, and high voltages; solar PV involves DC hazards that cannot be switched off; heat pumps involve refrigerant handling alongside electrical work; and hydro involves water hazards alongside electrical systems. The duty holder must ensure appropriate risk assessments, safe systems of work, and competent persons for each technology. ST1426 requires maintenance technicians to understand these requirements."
  }
];

const faqs = [
  {
    question: "Will heat pumps replace gas boilers in the UK?",
    answer: "The UK government has confirmed that no new gas boilers will be installed in new-build homes from 2025, and the ambition is to phase out all new fossil fuel heating installations by 2035. Heat pumps (primarily ASHPs for retrofit and GSHPs for new-build) are the leading replacement technology. The Boiler Upgrade Scheme provides financial support for installations. For maintenance technicians, this represents a significant growth area — the UK aims to install 600,000 heat pumps per year by 2028, all requiring ongoing electrical maintenance."
  },
  {
    question: "What qualifications do I need to work on heat pump electrical systems?",
    answer: "The electrical installation and control wiring of heat pumps requires standard electrical qualifications (e.g., Level 3 Electrotechnical or equivalent). The refrigerant circuit requires separate F-Gas certification under the F-Gas Regulations (EU 517/2014, retained in UK law). Many maintenance technicians work on the electrical systems while specialist refrigeration engineers handle the refrigerant side. Some manufacturers offer combined training courses. The ST1426 standard covers knowledge of heat pump technologies as part of the emerging technologies module."
  },
  {
    question: "How does a wind turbine operate in very high winds?",
    answer: "Modern wind turbines have three operating modes: below cut-in speed (typically 3-4 m/s) they do not generate; between cut-in and rated speed they progressively increase output; at rated wind speed (typically 11-13 m/s) they reach maximum output and the pitch system feathers the blades to maintain constant power. Above the cut-out speed (typically 25 m/s), the turbine shuts down for safety — the blades are fully feathered, the rotor brake is applied, and the generator is disconnected. Some modern turbines use 'storm ride-through' to continue operating at reduced output in high winds rather than shutting down completely."
  },
  {
    question: "What is the typical lifespan of renewable energy systems?",
    answer: "Solar PV modules: 25-30 years (with degradation of approximately 0.5% per year); inverters: 10-15 years (typically the first component requiring replacement). Wind turbines: 20-25 years for the main structure, with gearbox replacement typically needed at 10-15 years. ASHPs: 15-20 years (compressor is the limiting component). GSHPs: 20-25 years (ground loops can last 50+ years). Hydro turbines: 30-50 years with regular maintenance. Battery storage: 10-15 years depending on chemistry and cycle depth. All systems require regular maintenance to achieve their design life."
  },
  {
    question: "How do renewable energy technologies affect the electrical distribution network?",
    answer: "High penetration of renewables creates challenges for the distribution network: voltage rise (generation pushing voltage above statutory limits at the end of feeders); reverse power flow (generation exceeding local demand, causing power to flow 'uphill' through transformers); fault level contribution (generators adding to short-circuit current); harmonic distortion (from power electronic converters); and intermittency (variable output requiring balancing). DNOs manage these through: network reinforcement, active network management (ANM), export limitation, reactive power control, and the transition to Distribution System Operators (DSOs) with real-time network management capability."
  }
];

const MOETModule3Section6_2 = () => {
  useSEO(TITLE, DESCRIPTION);
  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section6">
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
            <span>Module 3.6.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Wind and Other Renewables
          </h1>
          <p className="text-white/80">
            Wind power, hydro, heat pumps and emerging renewable technologies for maintenance technicians
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Wind:</strong> Kinetic energy to electrical via generator and power electronics</li>
              <li className="pl-1"><strong>Heat pumps:</strong> Renewable heat from air/ground, COP 2.5-4.5</li>
              <li className="pl-1"><strong>Hydro:</strong> Turbine types matched to head and flow conditions</li>
              <li className="pl-1"><strong>Standards:</strong> G99/G98 grid connection, BS 7671, EAWR 1989</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Growth:</strong> Net zero drives massive expansion of all renewables</li>
              <li className="pl-1"><strong>Heat pumps:</strong> 600,000/year target by 2028 — major maintenance market</li>
              <li className="pl-1"><strong>Skills:</strong> Each technology has unique electrical hazards</li>
              <li className="pl-1"><strong>ST1426:</strong> Emerging technologies knowledge required</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Describe the operating principles of wind turbine electrical generation systems",
              "Explain heat pump technology including ASHP and GSHP operating principles and COP",
              "Identify the electrical systems in micro-hydro, biomass CHP and other renewables",
              "Apply G99/G98 grid connection requirements to renewable generation",
              "Describe the maintenance requirements for wind, heat pump and hydro electrical systems",
              "Relate the UK net zero targets to the growing demand for renewable technology maintenance skills"
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

        {/* Section 01: Wind Turbine Electrical Systems */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Wind Turbine Electrical Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Wind energy is the UK's largest source of renewable electricity, with over 28 GW of installed
              capacity (onshore and offshore combined as of 2025). While large-scale wind farms are maintained
              by specialist turbine technicians, smaller wind turbines (up to 100 kW) on industrial, agricultural
              and community sites fall within the scope of general electrical maintenance technicians. Understanding
              wind turbine electrical systems is therefore directly relevant to the ST1426 standard.
            </p>
            <p>
              A wind turbine converts kinetic energy from the wind into electrical energy. The rotor blades
              extract energy from the airstream and transfer it via a shaft (and usually a gearbox) to an
              electrical generator. The generator output is conditioned by power electronics to match grid
              voltage and frequency before being exported. The entire system is monitored and controlled by
              a SCADA (Supervisory Control and Data Acquisition) system that adjusts blade pitch, yaw angle,
              and power output in response to changing wind conditions.
            </p>
            <p>
              The power output of a wind turbine is proportional to the cube of the wind speed — doubling
              the wind speed increases the available power by a factor of eight. This cubic relationship
              explains why site selection is critical and why even modest increases in hub height (accessing
              higher wind speeds) significantly increase energy yield. Turbines typically operate between a
              cut-in speed of 3-4 m/s and a cut-out speed of 25 m/s, with rated power achieved at
              approximately 11-13 m/s.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Wind Turbine Generator Types</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Operation</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Advantages</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">DFIG (Doubly-Fed Induction)</td>
                      <td className="border border-white/10 px-3 py-2">Stator direct to grid, rotor via partial converter</td>
                      <td className="border border-white/10 px-3 py-2">Smaller converter (30% rating), proven technology</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">PMSG (Permanent Magnet Synchronous)</td>
                      <td className="border border-white/10 px-3 py-2">Full output via power converter</td>
                      <td className="border border-white/10 px-3 py-2">No gearbox possible (direct drive), higher efficiency</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Squirrel-cage Induction</td>
                      <td className="border border-white/10 px-3 py-2">Fixed speed, direct grid connection</td>
                      <td className="border border-white/10 px-3 py-2">Simple, robust, low cost — used in smaller turbines</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Electrical Subsystems in a Wind Turbine</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Power converter:</strong> Rectifier and inverter stages converting variable-frequency generator output to fixed 50 Hz grid frequency. Typically uses IGBT (insulated-gate bipolar transistor) switching devices with PWM control</li>
                <li className="pl-1"><strong>Step-up transformer:</strong> Raises the generator voltage (typically 690 V) to the local distribution voltage (11 kV or 33 kV for larger turbines) for grid connection</li>
                <li className="pl-1"><strong>Pitch system:</strong> Electrically or hydraulically actuated blade pitch mechanism that adjusts blade angle for speed control and power regulation — battery-backed for emergency feathering</li>
                <li className="pl-1"><strong>Yaw system:</strong> Electric motors that rotate the nacelle to face the wind, controlled by a wind vane and anemometer on the nacelle roof</li>
                <li className="pl-1"><strong>Lightning protection:</strong> Receptor system on blade tips, down-conductors through the blades, hub and tower to the earthing system — essential as turbines are prominent structures</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Safety: Wind Turbine Hazards</p>
              <p className="text-sm text-white">
                Wind turbines present unique electrical and mechanical hazards: high voltages (typically 690 V
                at the generator, stepped up to 11 kV or 33 kV for larger turbines); rotating machinery
                (blades, gearbox, generator); working at height (nacelle access via internal ladder or external
                hoist); confined spaces (nacelle and tower interior); and stored energy (capacitors in power
                converters, blade inertia). Safe isolation must address both electrical and mechanical energy
                sources. Lightning protection systems must be maintained as turbines are prominent structures.
                A permit to work system is essential for all maintenance activities on wind turbines.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Small wind turbines (under 50 kW) connected to the distribution
              network must comply with G98 or G99 depending on their capacity. The DNO must be notified
              or approval obtained before connection, and anti-islanding protection is mandatory to prevent
              the turbine energising a network that has been disconnected for maintenance.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Heat Pump Technology */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Heat Pump Technology
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Heat pumps are the UK government's preferred technology for decarbonising building heating.
              They use the refrigeration cycle in reverse — extracting heat from a low-temperature source
              (air, ground, or water) and delivering it at a higher temperature for space heating and hot
              water. For every unit of electricity consumed, a heat pump delivers 2.5 to 4.5 units of heat,
              making it far more efficient than direct electric heating or gas boilers.
            </p>
            <p>
              Electrical maintenance technicians will increasingly encounter heat pumps as the installed base
              grows rapidly under government policy. The electrical systems — supply circuits, control wiring,
              sensors, contactors, and inverter-driven compressors — all require competent maintenance. The
              refrigeration cycle itself (compressor, condenser, expansion valve, evaporator) is handled by
              F-Gas certified refrigeration engineers, but the maintenance technician must understand the
              complete system to diagnose faults effectively.
            </p>
            <p>
              The fundamental operating principle is the vapour compression cycle. A refrigerant fluid
              absorbs heat from the low-temperature source as it evaporates in the evaporator coil. The
              compressor then raises the pressure and temperature of the refrigerant gas. In the condenser,
              the high-temperature refrigerant releases its heat to the heating system. The expansion valve
              reduces the pressure, cooling the refrigerant before it returns to the evaporator to repeat
              the cycle. The COP is the ratio of heat delivered to electrical energy consumed by the compressor.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Air-Source Heat Pumps (ASHPs)</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Extract heat from outdoor air via an evaporator coil (works down to -15 degrees C or below)</li>
                  <li className="pl-1">Typical domestic ASHP: 5-12 kW heat output, 230 V or 400 V supply</li>
                  <li className="pl-1">Inverter-driven compressors modulate output to match demand (variable speed)</li>
                  <li className="pl-1">Defrost cycle required in cold weather — reverses the refrigeration cycle to melt ice on the evaporator</li>
                  <li className="pl-1">SCOP typically 2.5-3.5 in UK climate conditions</li>
                  <li className="pl-1">External unit requires minimum clearances for airflow — maintenance access essential</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Ground-Source Heat Pumps (GSHPs)</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Extract heat from the ground via closed-loop pipes (horizontal trenches or vertical boreholes)</li>
                  <li className="pl-1">Ground temperature stable at 10-13 degrees C year-round in the UK</li>
                  <li className="pl-1">Higher and more consistent COP than ASHPs (SCOP 3.5-4.5)</li>
                  <li className="pl-1">Higher installation cost (ground works) but lower running costs</li>
                  <li className="pl-1">Circulation pump for ground loop requires electrical maintenance</li>
                  <li className="pl-1">MCS certification required for Boiler Upgrade Scheme eligibility</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">ASHP vs GSHP Comparison</h3>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Feature</th>
                      <th className="border border-white/10 px-3 py-2 text-left">ASHP</th>
                      <th className="border border-white/10 px-3 py-2 text-left">GSHP</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">SCOP (UK)</td>
                      <td className="border border-white/10 px-3 py-2">2.5-3.5</td>
                      <td className="border border-white/10 px-3 py-2">3.5-4.5</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Install cost (domestic)</td>
                      <td className="border border-white/10 px-3 py-2">GBP 7,000-14,000</td>
                      <td className="border border-white/10 px-3 py-2">GBP 15,000-35,000</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">External space</td>
                      <td className="border border-white/10 px-3 py-2">Wall/ground mounting, min clearances</td>
                      <td className="border border-white/10 px-3 py-2">Large garden or borehole access</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Noise</td>
                      <td className="border border-white/10 px-3 py-2">Fan noise (consider neighbours)</td>
                      <td className="border border-white/10 px-3 py-2">Near-silent externally</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Electrical supply</td>
                      <td className="border border-white/10 px-3 py-2">230 V or 400 V (larger units)</td>
                      <td className="border border-white/10 px-3 py-2">230 V or 400 V (larger units)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Important: Electrical Supply Sizing</p>
              <p className="text-sm text-white">
                The electrical supply to a heat pump must be correctly sized for the compressor starting
                current (which can be 3-6 times the running current for non-inverter models). The supply
                circuit, protective device, and cable must comply with BS 7671 and the manufacturer's
                requirements. Inverter-driven heat pumps have softer starting characteristics but may
                require EMC filtering to prevent harmonic interference with other equipment on the same
                circuit. Always verify the supply capacity before installation — an undersized supply
                will cause nuisance tripping and premature contactor failure.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The Boiler Upgrade Scheme (BUS) provides grants of up to
              GBP 7,500 for heat pump installations. MCS certification of the installer is required
              for grant eligibility. As the installed base grows towards the 600,000 per year target,
              the demand for competent electrical maintenance of heat pump systems will increase
              proportionally.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Micro-Hydro, Biomass CHP and Other Technologies */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Micro-Hydro, Biomass CHP and Other Technologies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Beyond wind, solar and heat pumps, several other renewable and low-carbon technologies are
              relevant to the maintenance technician. Micro-hydro power exploits flowing water, biomass CHP
              generates both heat and electricity from organic fuels, and emerging technologies such as
              hydrogen fuel cells are entering the market. Each has distinct electrical systems and
              maintenance requirements that the technician must understand.
            </p>
            <p>
              While these technologies represent a smaller share of the total installed base than solar PV
              or heat pumps, they are disproportionately important in certain sectors. Micro-hydro is
              significant in rural Scotland, Wales, and northern England. Biomass CHP is common in
              agricultural, industrial, and district heating applications. Hydrogen fuel cells are emerging
              in commercial buildings and transport hubs. The maintenance technician who can work competently
              across these technologies has a significant competitive advantage.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Micro-Hydro Power</h3>
              <p className="text-sm text-white mb-2">
                Micro-hydro (up to 100 kW) uses the energy in flowing water to drive a turbine and
                generator. The UK has significant micro-hydro potential, particularly in Scotland, Wales
                and northern England. The available power depends on two factors: the head (vertical drop
                in metres) and the flow rate (volume of water in litres per second). Power output equals
                approximately head x flow x 7 watts (accounting for typical turbine and generator efficiency).
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Turbine types:</strong> Pelton (high head, low flow), Turgo (medium head), Crossflow (medium head, variable flow), Kaplan (low head, high flow)</li>
                <li className="pl-1"><strong>Generator:</strong> Induction generator (grid-connected) or synchronous generator (off-grid capable)</li>
                <li className="pl-1"><strong>Control:</strong> Electronic load controller (ELC) or governor to maintain frequency under varying load</li>
                <li className="pl-1"><strong>Grid connection:</strong> G98/G99 compliance, anti-islanding, power quality monitoring</li>
                <li className="pl-1"><strong>Maintenance:</strong> Generator bearings, brush gear (synchronous), intake screens, control electronics</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Biomass CHP Systems</h3>
              <p className="text-sm text-white mb-2">
                Biomass CHP generates electricity and heat simultaneously from organic fuel sources. The
                electrical systems are similar to conventional standby generation but with the added
                complexity of fuel handling, combustion control, and heat recovery systems. Overall
                efficiency of 70-85% (electrical plus thermal combined) far exceeds electricity-only
                generation, making CHP economically attractive where there is a consistent heat demand.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Technologies:</strong> Steam turbine, Organic Rankine Cycle (ORC), gasification engine</li>
                <li className="pl-1"><strong>Fuels:</strong> Wood chip, wood pellets, agricultural waste, anaerobic digestion biogas</li>
                <li className="pl-1"><strong>Efficiency:</strong> 70-85% overall (electrical + thermal combined)</li>
                <li className="pl-1"><strong>Electrical:</strong> Synchronous generator, synchronising controls, export/import metering</li>
                <li className="pl-1"><strong>Maintenance:</strong> Generator, switchgear, control systems, exhaust treatment, heat exchangers</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Emerging: Hydrogen Fuel Cells</h3>
              <p className="text-sm text-white mb-2">
                Hydrogen fuel cells convert hydrogen and oxygen directly into electricity, water, and heat
                through an electrochemical process. They produce no carbon emissions at the point of use
                (the carbon impact depends on how the hydrogen is produced). Proton exchange membrane (PEM)
                fuel cells are the most common type for building applications, offering quiet operation,
                rapid start-up, and modular scalability.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Output:</strong> DC electricity (requires inverter for AC loads), useful heat, and water</li>
                <li className="pl-1"><strong>Applications:</strong> Backup power, off-grid supply, commercial building CHP</li>
                <li className="pl-1"><strong>Hazards:</strong> Hydrogen is flammable and explosive in air (4-75% concentration range)</li>
                <li className="pl-1"><strong>Maintenance:</strong> Stack replacement (every 40,000-80,000 hours), humidification system, inverter</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> All generation technologies connected to the distribution network
              must comply with the same G99/G98 requirements, regardless of fuel source. The anti-islanding,
              protection settings, and power quality standards are technology-neutral — the grid does not
              distinguish between a watt produced by wind, hydro, biomass, or hydrogen.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: UK Renewable Energy Policy and Maintenance Implications */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            UK Renewable Energy Policy and Maintenance Implications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The UK's legally binding commitment to net zero greenhouse gas emissions by 2050 is driving
              a fundamental transformation of the energy system. For electrical maintenance technicians,
              this means a rapidly growing installed base of renewable and low-carbon technologies, each
              requiring ongoing maintenance. Understanding the policy landscape helps technicians anticipate
              demand for their skills and plan their professional development.
            </p>
            <p>
              The scale of the transition is unprecedented. The UK aims to fully decarbonise its electricity
              supply by 2035, install 600,000 heat pumps per year by 2028, end the sale of new petrol and
              diesel cars by 2035, and deploy grid-scale energy storage to balance intermittent renewables.
              Each of these targets creates a direct demand for electrical maintenance technicians with
              renewable technology competence.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key UK Targets</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Net zero emissions by 2050 (Climate Change Act)</li>
                  <li className="pl-1">Fully decarbonised electricity by 2035</li>
                  <li className="pl-1">No new gas boilers from 2035 (heat pump transition)</li>
                  <li className="pl-1">600,000 heat pump installations per year by 2028</li>
                  <li className="pl-1">50 GW offshore wind by 2030</li>
                  <li className="pl-1">70 GW solar by 2035</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Maintenance Market Growth</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Over 1.2 million PV installations already in UK (growing rapidly)</li>
                  <li className="pl-1">Heat pump installations doubling year-on-year</li>
                  <li className="pl-1">EV charger installations exceeding 500,000</li>
                  <li className="pl-1">Battery storage deployed at domestic and grid scale</li>
                  <li className="pl-1">All systems require periodic inspection and maintenance</li>
                  <li className="pl-1">Skills shortage in renewable technology maintenance</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Regulatory Framework Summary</h3>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Regulation/Standard</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Coverage</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">BS 7671 (18th Edition)</td>
                      <td className="border border-white/10 px-3 py-2">All electrical installations including renewable systems</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">EAWR 1989</td>
                      <td className="border border-white/10 px-3 py-2">Duty to maintain safe electrical systems</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">G98/G99</td>
                      <td className="border border-white/10 px-3 py-2">DNO connection requirements for generation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">MCS MIS 3002/3005</td>
                      <td className="border border-white/10 px-3 py-2">PV and heat pump installation standards</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">F-Gas Regulations</td>
                      <td className="border border-white/10 px-3 py-2">Heat pump refrigerant handling</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Building Regulations Part L/P</td>
                      <td className="border border-white/10 px-3 py-2">Energy efficiency and electrical safety</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Under ST1426, maintenance technicians must demonstrate awareness of
              emerging technologies and their impact on electrical maintenance practices. This includes
              understanding the operating principles, safety hazards, and maintenance requirements of
              renewable and low-carbon technologies. The growing installed base of these technologies
              means they will form an increasing proportion of the maintenance technician's workload.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05: Electrical Maintenance Across Renewable Technologies */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Electrical Maintenance Across Renewable Technologies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Each renewable technology presents distinct electrical maintenance requirements and safety
              hazards. The maintenance technician must understand these differences to work safely and
              effectively across the growing range of renewable installations encountered in buildings
              and on sites. While specialist contractors may handle the primary technology (turbine
              servicing, refrigerant handling), the electrical systems require competent electricians
              who understand the complete system context.
            </p>
            <p>
              A common theme across all renewables is the importance of commissioning data. Every
              renewable installation should be thoroughly documented at commissioning, with baseline
              performance data recorded for future comparison. Without this baseline, it is difficult
              to determine whether a system is degrading faster than expected or whether observed
              performance is within normal parameters. The commissioning record should include: rated
              output at specified conditions, protection settings, inverter/converter parameters,
              earthing resistance measurements, and insulation resistance values.
            </p>
            <p>
              Another cross-cutting theme is the increasing integration of multiple renewable
              technologies in a single installation. A modern domestic property may combine solar PV,
              battery storage, a heat pump, and an EV charger — all managed by an energy management
              system. The maintenance technician must understand how these systems interact and ensure
              that maintenance on one component does not adversely affect the operation of others.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Technology-Specific Maintenance Summary</h3>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Technology</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Electrical Maintenance Focus</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Hazards</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Small wind</td>
                      <td className="border border-white/10 px-3 py-2">Generator, converter, switchgear, earthing, lightning protection</td>
                      <td className="border border-white/10 px-3 py-2">Height, rotating parts, HV, stored energy</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">ASHP</td>
                      <td className="border border-white/10 px-3 py-2">Compressor current, contactors, controls, defrost, supply circuit</td>
                      <td className="border border-white/10 px-3 py-2">Refrigerant (F-Gas), inverter-driven EMC</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">GSHP</td>
                      <td className="border border-white/10 px-3 py-2">Compressor, circulation pumps, controls, earth loop monitoring</td>
                      <td className="border border-white/10 px-3 py-2">Refrigerant (F-Gas), antifreeze</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Micro-hydro</td>
                      <td className="border border-white/10 px-3 py-2">Generator bearings, brush gear, ELC, grid connection, protection</td>
                      <td className="border border-white/10 px-3 py-2">Water, remote location, HV generation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Biomass CHP</td>
                      <td className="border border-white/10 px-3 py-2">Generator, synchronising, switchgear, export metering, controls</td>
                      <td className="border border-white/10 px-3 py-2">Hot surfaces, exhaust gases, HV</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Cross-Technology Maintenance Principles</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Commissioning baseline:</strong> Record all performance parameters at commissioning for future comparison</li>
                <li className="pl-1"><strong>G99/G98 compliance:</strong> Verify anti-islanding protection and protection settings at every periodic inspection</li>
                <li className="pl-1"><strong>Earthing integrity:</strong> All renewable installations require comprehensive earthing and bonding — verify continuity regularly</li>
                <li className="pl-1"><strong>Power quality:</strong> Monitor inverter output for harmonics and power factor compliance</li>
                <li className="pl-1"><strong>Performance trending:</strong> Compare current output with historical data and expected values for the season</li>
                <li className="pl-1"><strong>Safety documentation:</strong> Maintain risk assessments and safe systems of work specific to each technology</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Case Study: Integrated Domestic Renewable System</h3>
              <p className="text-sm text-white">
                A typical modern domestic installation might include: 4 kWp solar PV array, 10 kWh
                battery storage, 8 kW air-source heat pump, and a 7 kW EV charger — all managed by a
                hybrid inverter and energy management system. The total connected load exceeds the
                typical 100 A single-phase supply, so the energy management system coordinates the
                operation of each component. During a periodic inspection, the maintenance technician
                must: verify each system's protection and isolation; test RCDs for all circuits; check
                the energy management system is correctly prioritising loads; confirm G98/G99 compliance
                for the PV and battery export; and ensure the EV charger's PME earthing provisions are
                intact. This integrated approach requires competence across multiple renewable technologies.
              </p>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Under ST1426, maintenance technicians must demonstrate awareness
              of renewable and emerging technologies as part of the standard's knowledge requirements.
              The growing installed base of wind, heat pump, hydro and CHP systems means that technicians
              who develop competence across multiple renewable technologies will be increasingly valuable
              in the labour market.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">
            Common Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="pb-4 border-b border-white/5 last:border-0"
              >
                <h3 className="text-sm font-medium text-white mb-1">
                  {faq.question}
                </h3>
                <p className="text-sm text-white/90 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">
              Quick Reference
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">
                  Renewable Technologies
                </p>
                <ul className="space-y-0.5">
                  <li>Wind DFIG: stator direct, rotor via converter</li>
                  <li>Wind PMSG: full output via converter</li>
                  <li>ASHP SCOP: 2.5-3.5 (UK climate)</li>
                  <li>GSHP SCOP: 3.5-4.5 (stable ground temp)</li>
                  <li>Hydro: Pelton (high head), Kaplan (low head)</li>
                  <li>CHP: 70-85% overall efficiency</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">
                  UK Policy and Standards
                </p>
                <ul className="space-y-0.5">
                  <li>Net zero by 2050 (Climate Change Act)</li>
                  <li>No new gas boilers from 2035</li>
                  <li>600,000 heat pumps/year by 2028</li>
                  <li>G98: up to 3.68 kW/phase</li>
                  <li>G99: above 3.68 kW/phase</li>
                  <li>F-Gas certification for refrigerants</li>
                  <li>MCS MIS 3005 heat pump standard</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz title="Test Your Knowledge" questions={quizQuestions} />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section6-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Solar PV Integration
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section6-3">
              Next: Energy Storage Systems
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default MOETModule3Section6_2;
