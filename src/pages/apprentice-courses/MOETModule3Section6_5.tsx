import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Electric Vehicle Charging Infrastructure - MOET Module 3.6.5";
const DESCRIPTION = "Comprehensive guide to EV charging infrastructure for electrical maintenance technicians: charging modes and types, BS 7671 Section 722, cable sizing, earthing requirements, smart charging, load management, DNO notification, vehicle-to-grid technology and maintenance under ST1426.";

const quickCheckQuestions = [
  {
    id: "ev-charging-modes",
    question: "What are the four IEC 61851 charging modes for electric vehicles?",
    options: [
      "Fast, slow, rapid, ultra-rapid",
      "Mode 1 (domestic socket, no protection), Mode 2 (domestic socket with in-cable control device — ICCD), Mode 3 (dedicated EVSE with control pilot — the standard for home and workplace charging), and Mode 4 (DC rapid charging with the charger converting AC to DC externally)",
      "Single-phase, three-phase, DC, wireless",
      "Level 1, Level 2, Level 3, Level 4"
    ],
    correctIndex: 1,
    explanation: "IEC 61851 defines four charging modes. Mode 1 uses a standard domestic socket with no additional protection (not recommended in the UK). Mode 2 uses a domestic socket with an in-cable control device (ICCD) providing earth fault and overcurrent protection — used for occasional/emergency charging. Mode 3 is the standard for permanent installations: a dedicated EVSE (Electric Vehicle Supply Equipment) with a Type 1 or Type 2 connector, control pilot communication, and integral protection. Mode 4 provides DC rapid charging where the charger contains the AC-DC converter, delivering DC directly to the vehicle battery via CCS or CHAdeMO connectors."
  },
  {
    id: "bs7671-section722",
    question: "What does BS 7671 Section 722 specifically require for EV charging installations?",
    options: [
      "Only a standard socket outlet",
      "Dedicated circuit(s) for each charging point with appropriate cable sizing; 30 mA Type A RCD as a minimum (or Type B where the EVSE does not contain integral DC fault protection); PME earthing considerations; labelling; and sizing for continuous load at the maximum rated output of the charger",
      "No specific requirements",
      "Only an outdoor installation"
    ],
    correctIndex: 1,
    explanation: "BS 7671 Section 722 covers the specific requirements for EV charging. Key requirements include: Regulation 722.411.4.1 — RCD protection (minimum 30 mA Type A, with Type B or Type B+ required if the EVSE does not have integral DC fault detection); Regulation 722.531.3 — dedicated circuit for each charging point; Regulation 722.311 — supply cable rated for continuous maximum demand (not diversity-reduced); Regulation 722.411.4 — PME earthing restrictions (earth rod may be required); and appropriate labelling. These requirements reflect the high-power, continuous-duty nature of EV charging."
  },
  {
    id: "pme-earthing",
    question: "Why does BS 7671 impose restrictions on using the PME earth for EV charging outdoors?",
    options: [
      "PME earths are too expensive",
      "Under PME (TN-C-S) earthing, if the DNO neutral conductor is lost (open PEN fault), the exposed metalwork of the EVSE and the vehicle could rise to a dangerous voltage — since a person touching the vehicle while standing on the ground could receive a fatal electric shock, the risk is greater outdoors where there is better contact with true earth",
      "PME earths do not work with electric vehicles",
      "It is a temporary requirement"
    ],
    correctIndex: 1,
    explanation: "In a PME (TN-C-S) system, the neutral and earth are combined in the DNO supply cable (PEN conductor). If this conductor is lost (open PEN fault), all metalwork connected to the installation earth rises towards line voltage via the load currents. Outdoors, a person has better contact with true earth (standing on wet ground), so the shock risk is much higher than indoors. BS 7671 Regulation 722.411.4 addresses this by requiring either: a separate earth electrode (TT earthing for the EV circuit); or the EVSE manufacturer confirming the equipment has appropriate protection against open PEN conditions."
  },
  {
    id: "smart-charging",
    question: "What is smart EV charging and why is it important?",
    options: [
      "Charging that uses artificial intelligence",
      "Smart charging enables the charge rate, timing and duration to be managed dynamically in response to grid conditions, electricity tariffs, local network constraints and user preferences — it is essential to prevent network overloading as millions of EVs connect to a grid that was not designed for their combined demand",
      "Charging that is faster than standard",
      "Charging only available at service stations"
    ],
    correctIndex: 1,
    explanation: "Smart charging is critical for managing the impact of mass EV adoption on the electricity network. A typical 7 kW home charger draws the equivalent of 2-3 additional houses. If millions of EVs charge simultaneously during the evening peak (when drivers arrive home), the additional demand would overwhelm local distribution networks. Smart charging shifts demand to off-peak periods (typically overnight), responds to grid frequency signals, participates in DSR, and manages local load to stay within the DNO connection capacity. The UK Electric Vehicles (Smart Charge Points) Regulations 2021 mandate that all new domestic and workplace chargers must have smart functionality."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A Type 2 connector (Mennekes) is:",
    options: [
      "Only used for DC charging",
      "The standard AC connector for EV charging in the UK and Europe — a 7-pin connector supporting single-phase (up to 7.4 kW at 32 A) and three-phase (up to 22 kW at 32 A) charging with integrated control pilot and proximity pilot pins",
      "A type of USB connector",
      "Only used for Mode 1 charging"
    ],
    correctAnswer: 1,
    explanation: "The Type 2 (IEC 62196-2) connector is the standard for AC EV charging in the UK and Europe. It has 7 pins: L1, L2, L3 (three phases — only L1 used for single-phase), N (neutral), PE (protective earth), CP (control pilot — communication between EVSE and vehicle), and PP (proximity pilot — cable current rating identification and plug detection). Single-phase charging via Type 2 delivers up to 7.4 kW (32 A at 230 V). Three-phase delivers up to 22 kW (32 A at 400 V). The Type 2 socket is incorporated into the EVSE; the vehicle end may be Type 2 (tethered cable) or a vehicle inlet."
  },
  {
    id: 2,
    question: "The Electric Vehicles (Smart Charge Points) Regulations 2021 require:",
    options: [
      "All EVs to be the same colour",
      "All new private charge points (domestic and workplace) to have smart functionality by default — including ability to respond to price signals, shift charging times, randomised delay at installation to prevent synchronised charging, and remote firmware update capability",
      "Only public chargers to be smart",
      "No specific requirements"
    ],
    correctAnswer: 1,
    explanation: "The 2021 Regulations mandate that all new domestic and workplace charge points must: be smart by default (capable of sending and receiving information); have a randomised delay of up to 10 minutes at first installation (preventing thousands of chargers starting simultaneously at the same off-peak tariff trigger); be able to respond to demand-side response signals; support scheduled charging; have remote firmware update capability; and meet cybersecurity requirements. These regulations are critical for managing the grid impact of mass EV adoption."
  },
  {
    id: 3,
    question: "The cable supplying a 7 kW single-phase EV charger must be rated for:",
    options: [
      "10 A",
      "32 A continuous duty — with no diversity reduction applied, since EV charging is a continuous load that draws rated current for extended periods (several hours), the cable must be sized for 100% of the rated current using the appropriate correction factors from BS 7671 Appendix 4",
      "16 A",
      "6 A"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 Regulation 722.311 requires EV charging circuits to be sized for the maximum demand of the charger with no diversity applied. A 7 kW single-phase charger draws 30.4 A at 230 V, requiring a 32 A circuit. The cable must be rated for 32 A continuous load, applying all relevant correction factors (ambient temperature Cf, grouping Cg, thermal insulation Ci, installation method). For a typical domestic installation in clipped cable, 6 mm² T+E is commonly used. Three-phase 22 kW chargers require a 32 A three-phase supply with appropriate cable sizing."
  },
  {
    id: 4,
    question: "CCS (Combined Charging System) is:",
    options: [
      "A type of vehicle key",
      "A connector that combines the Type 2 AC connector with two additional DC pins below it, enabling both AC charging (via the Type 2 portion) and DC rapid charging (via the DC pins) through a single vehicle inlet — supporting DC charging up to 350 kW",
      "A battery management system",
      "A type of smart meter"
    ],
    correctAnswer: 1,
    explanation: "CCS (also called Combo 2 in Europe) is the dominant DC rapid charging connector. It adds two large DC pins below the standard Type 2 AC connector, creating a single vehicle inlet that supports both AC and DC charging. Current CCS standards support up to 350 kW DC charging (500 V at 500 A or 920 V at 500 A). Most new EVs in the UK use CCS. The alternative DC standard, CHAdeMO (used primarily by older Nissan and Mitsubishi models), is being phased out in favour of CCS. Tesla vehicles in the UK now use CCS (or Type 2 for AC) following adoption of the European standard."
  },
  {
    id: 5,
    question: "Load management for multiple EV chargers involves:",
    options: [
      "Disconnecting chargers randomly",
      "Dynamically distributing the available electrical supply capacity across multiple chargers — reducing individual charge rates when total demand approaches the site supply limit, ensuring the electrical infrastructure is not overloaded while maximising the total energy delivered to all connected vehicles",
      "Only allowing one charger to work at a time",
      "Increasing the DNO supply"
    ],
    correctAnswer: 1,
    explanation: "Load management (also called load balancing or dynamic power sharing) is essential for sites with multiple chargers where the total installed charger capacity exceeds the available supply. For example, ten 7 kW chargers on a 100 A three-phase supply: if all charge at full power simultaneously, the total demand (70 kW) exceeds the supply capacity. A load management system monitors the total site demand and dynamically adjusts individual charger outputs to stay within the supply limit. As vehicles complete charging, the released capacity is redistributed to remaining vehicles. This avoids the cost of DNO supply upgrades."
  },
  {
    id: 6,
    question: "When installing an EV charger on a PME (TN-C-S) supply, the recommended earthing solution is:",
    options: [
      "Use the existing PME earth without modification",
      "Install a separate earth electrode (earth rod) for the EV charging circuit, creating TT earthing for that circuit, with an RCD providing earth fault protection — or use an EVSE that the manufacturer confirms has integral open-PEN protection meeting the requirements of BS 7671 Regulation 722.411.4",
      "No earthing is required",
      "Connect to the water pipe"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 Regulation 722.411.4 addresses the PME earthing risk for EV charging. The preferred solutions are: (1) Install a local earth electrode (typically an earth rod driven to achieve less than 200 ohms) and protect the EV circuit with an RCD, creating a TT earthing arrangement for the EV circuit only. The main installation remains on PME. (2) Use an EVSE with integral open-PEN protection (some manufacturers incorporate this, but the installer must verify compliance). The reason: outdoor EV charging presents a higher shock risk during an open-PEN fault because the vehicle occupant/charger user has better contact with true earth."
  },
  {
    id: 7,
    question: "The control pilot (CP) signal in a Mode 3 EVSE:",
    options: [
      "Controls the vehicle's speed",
      "Is a ±12 V PWM (pulse width modulation) signal between the EVSE and the vehicle that communicates: EVSE availability, maximum available current (encoded in the PWM duty cycle), vehicle connected status, and charge enable/disable — it is the fundamental communication protocol for AC charging",
      "Is the same as the mains supply",
      "Only monitors the battery temperature"
    ],
    correctAnswer: 1,
    explanation: "The control pilot is a 1 kHz PWM signal defined in IEC 61851-1. The EVSE generates a ±12 V square wave. The PWM duty cycle encodes the maximum current the EVSE can deliver (e.g., 50% duty cycle = 30 A). The vehicle modifies the signal to communicate its status: +12 V indicates no vehicle connected; +9 V indicates vehicle connected, not ready to charge; +6 V indicates vehicle connected, ready to charge; +3 V indicates vehicle requires ventilation. The EVSE uses the pilot state to control the supply contactor. This is the core safety interlock — the supply is only connected when a vehicle is correctly connected and requests charging."
  },
  {
    id: 8,
    question: "Vehicle-to-Grid (V2G) technology:",
    options: [
      "Uses the grid to move vehicles",
      "Allows EVs to discharge stored battery energy back to the grid or building during peak demand periods — effectively using the EV battery as a distributed energy storage resource, providing grid services and reducing electricity costs for the vehicle owner",
      "Is not technically possible",
      "Only charges the vehicle faster"
    ],
    correctAnswer: 1,
    explanation: "V2G is an emerging technology that makes EV batteries available as grid-connected storage. During off-peak hours (cheap electricity), the EV charges. During peak hours (expensive electricity or grid stress), the EV discharges stored energy back to the grid or building. This requires: a bidirectional charger (capable of both AC-DC and DC-AC conversion); appropriate control systems; grid connection compliance (G98/G99 for export); and user consent/scheduling. V2G creates commercial value for EV owners (earning revenue from grid services) and provides network operators with distributed storage. Pilot projects in the UK are demonstrating V2G viability."
  },
  {
    id: 9,
    question: "The DNO must be notified of EV charger installations when:",
    options: [
      "Never — no notification required",
      "All EV charger installations should be notified to the DNO via the appropriate notification scheme (e.g., Building Regulations Part P notification). Installations above 3.68 kW on a single-phase supply or adding significant load may require prior approval, particularly on constrained network areas",
      "Only for public chargers",
      "Only for three-phase chargers"
    ],
    correctAnswer: 1,
    explanation: "DNO notification requirements: all installations should be notified through the Building Regulations Part P notification process. The DNO needs to know about EV chargers because: they represent a significant additional load (7 kW is equivalent to 2-3 average houses); multiple installations on the same feeder can cause voltage drop and thermal overloading; the DNO needs demand data for network planning. Some DNOs require prior approval for chargers above 3.68 kW on single-phase supplies or in areas with known network constraints. Smart charging data also helps DNOs manage their networks. The installer should check the local DNO requirements before installation."
  },
  {
    id: 10,
    question: "When maintaining an EV charger, the technician should:",
    options: [
      "Only clean the connector",
      "Carry out visual inspection (cable condition, connector pins, enclosure integrity, ventilation), electrical testing (earth continuity, insulation resistance, RCD operation, loop impedance), verify smart functionality (communication, scheduling, firmware version), and check the control pilot signal is within specification",
      "Only read the display",
      "Only check the WiFi connection"
    ],
    correctAnswer: 1,
    explanation: "Comprehensive EVSE maintenance includes: visual inspection (cable condition including UV degradation, connector pin condition including carbon/corrosion, enclosure damage/water ingress, earthing connections, labels); electrical testing (protective earth continuity, insulation resistance at 500 V DC, RCD trip test — both time and current, earth fault loop impedance for TT installations, prospective fault current verification); functional testing (connect a vehicle or test adapter, verify pilot signal, check contactor operation, test emergency stop if fitted); smart features (verify communication with cloud platform, check firmware version, test scheduled charging, verify load management response); and documentation."
  },
  {
    id: 11,
    question: "A tethered EV charger differs from a socketed charger in that:",
    options: [
      "It charges faster",
      "A tethered charger has the charging cable permanently attached to the EVSE unit (convenient for home use — just plug into the vehicle), while a socketed charger has a Type 2 socket on the unit and the user provides their own cable (more flexible for workplace/public use where different cable lengths and vehicle connectors may be needed)",
      "It is larger",
      "It only works with one brand of vehicle"
    ],
    correctAnswer: 1,
    explanation: "Tethered chargers are standard for domestic installations: the cable (typically 5-10 m with Type 2 or Type 1 vehicle connector) is permanently attached, making charging as simple as plugging into the vehicle. Socketed chargers have a Type 2 socket on the unit: the user provides their own cable (which comes with the vehicle). Socketed chargers are preferred for: workplace installations (different employees have different vehicles/cables), public charging (Type 2 is universal), and locations where cable theft is a risk. The charging cable contains the proximity pilot, which communicates the cable's current rating to the EVSE."
  },
  {
    id: 12,
    question: "Under the Building Regulations 2022 (Part S), new buildings in England must:",
    options: [
      "Have no EV charging provision",
      "Provide EV charge points or cable routes in new residential buildings (one charge point per dwelling with associated parking) and new non-residential buildings (one charge point per five parking spaces plus cable routes to all remaining spaces) — ensuring the building is 'EV-ready' from construction",
      "Only provide parking spaces",
      "Only provide public transport links"
    ],
    correctAnswer: 1,
    explanation: "Building Regulations Part S (introduced in England from June 2022) requires: new residential buildings with associated parking to have at least one charge point per dwelling (minimum 7 kW, Mode 3, smart-enabled); new non-residential buildings with more than 10 parking spaces to provide one charge point for every five spaces plus cable routes to every remaining space; and major renovations of non-residential buildings with more than 10 spaces to provide at least one charge point. These requirements ensure that the building infrastructure supports EV charging from day one, avoiding the much higher cost of retrofit. Similar requirements apply in Scotland and Wales under their respective building regulations."
  }
];

const faqs = [
  {
    question: "Do I need specific qualifications to install EV chargers?",
    answer: "EV charger installation is notifiable electrical work under Building Regulations Part P. Installers must be competent electricians (e.g., holding a Level 3 Electrotechnical qualification or equivalent) and should hold EV charger installation training (e.g., City & Guilds 2919 or equivalent). Registration with a competent person scheme (e.g., NICEIC, NAPIT) enables self-certification. Additionally, familiarity with BS 7671 Section 722, the IET Code of Practice for EV Charging, and specific EVSE manufacturer training is essential. Under ST1426, maintenance technicians should understand EV charging as part of the emerging technologies module."
  },
  {
    question: "How do I determine if a DNO supply upgrade is needed for EV charging?",
    answer: "Assess the existing supply: check the main fuse rating (typically 60 A or 100 A single-phase for domestic), measure the maximum demand (using a demand logger or smart meter data), and calculate the available headroom. A 7 kW charger requires 32 A continuously. If the existing maximum demand plus the charger exceeds the supply fuse rating, options include: smart charging with load limiting (reducing charge rate when other demand is high); a DNO supply upgrade (can take 6-12 weeks and cost GBP 500-3,000+); or a three-phase supply upgrade. Load management systems can often avoid the need for a supply upgrade."
  },
  {
    question: "What maintenance does an EV charger require?",
    answer: "EVSE maintenance varies by type and location. Domestic chargers: annual visual inspection and electrical test (earth continuity, insulation resistance, RCD test). Workplace/public chargers: more frequent inspection (monthly visual, quarterly electrical) due to higher usage and vandalism risk. All chargers: check cable and connector condition (pins, scoring, contamination); verify RCD operation; check earthing connections; test smart functionality (communication, scheduling); update firmware; clean connectors and enclosure; check ventilation (forced-cooled units); and verify labelling. The manufacturer's maintenance schedule takes precedence where specified."
  },
  {
    question: "What is the difference between AC and DC EV charging?",
    answer: "In AC charging (Mode 2 and 3), the EVSE delivers AC power to the vehicle, and the vehicle's onboard charger converts AC to DC to charge the battery. Onboard chargers are typically rated at 3.6-22 kW, limiting AC charge speed. In DC charging (Mode 4), the external charger converts AC to DC and delivers DC power directly to the vehicle battery, bypassing the onboard charger. This enables much higher charge rates (50-350 kW) because the external charger can be much larger and more powerful than the onboard unit. DC chargers are significantly more expensive and require higher-rated electrical supplies."
  },
  {
    question: "How does V2G (Vehicle-to-Grid) affect the electrical installation?",
    answer: "V2G requires a bidirectional charger that can both charge the EV battery and discharge it back to the building or grid. This has significant implications for the electrical installation: the charger acts as a generator (requiring G98/G99 compliance for grid export); anti-islanding protection is mandatory; the RCD selection must accommodate bidirectional current flow; metering must record both import and export; and the DNO must be notified of the generation capability. V2G systems also require sophisticated control systems to manage charge/discharge schedules, protect battery health (limiting V2G cycles to preserve battery life), and respond to grid signals. Pilot schemes in the UK are establishing best practices."
  }
];

const MOETModule3Section6_5 = () => {
  useSEO(TITLE, DESCRIPTION);
  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section Overview
            </Link>
          </Button>
        </div>
      </div>
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Shield className="h-4 w-4" />
            <span>Module 3.6.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Electric Vehicle Charging Infrastructure
          </h1>
          <p className="text-white/80">
            EV charging systems, installation requirements and maintenance for electrical technicians
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">
              In 30 Seconds
            </p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1">
                <strong>Modes:</strong> Mode 2 (ICCD), Mode 3 (dedicated EVSE),
                Mode 4 (DC rapid)
              </li>
              <li className="pl-1">
                <strong>Connectors:</strong> Type 2 (AC standard), CCS (DC rapid),
                CHAdeMO (legacy)
              </li>
              <li className="pl-1">
                <strong>Standards:</strong> BS 7671 Section 722, IEC 61851,
                Building Regs Part S
              </li>
              <li className="pl-1">
                <strong>Smart:</strong> Mandatory smart functionality for new
                domestic/workplace chargers
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">
              Maintenance Context
            </p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1">
                <strong>Growth:</strong> EV charger installations exceeding
                500,000 in UK
              </li>
              <li className="pl-1">
                <strong>PME earthing:</strong> Earth electrode often required for
                outdoor charging
              </li>
              <li className="pl-1">
                <strong>Load management:</strong> Dynamic power sharing for
                multi-charger sites
              </li>
              <li className="pl-1">
                <strong>ST1426:</strong> Emerging technologies knowledge required
              </li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">
            What You Will Learn
          </h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Describe the four IEC 61851 charging modes and connector types for EV charging",
              "Apply BS 7671 Section 722 requirements including RCD selection and PME earthing",
              "Explain smart charging requirements under the 2021 Smart Charge Points Regulations",
              "Design load management solutions for multi-charger installations",
              "Carry out EV charger inspection, testing and maintenance procedures",
              "Understand Vehicle-to-Grid technology and its implications for electrical installations"
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-sm text-white"
              >
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
            Charging Modes, Connectors and Power Levels
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electric vehicle charging encompasses a range of technologies from slow
              overnight domestic charging to ultra-rapid motorway charging.
              Understanding the different charging modes, connector types, and power
              levels is fundamental for the maintenance technician, as each type has
              distinct installation requirements, protection measures, and maintenance
              needs. The IEC 61851 standard defines four charging modes, while
              IEC 62196 specifies the connector types used across the industry.
            </p>
            <p>
              The UK is transitioning rapidly towards electrified transport. The
              government has confirmed that no new petrol or diesel cars will be sold
              from 2035, and EV registrations already represent over 20% of new car
              sales. This drives massive demand for charging infrastructure — and for
              technicians who can install and maintain it. The scale of change is
              significant: the UK electricity system must accommodate an additional
              30-40 TWh of annual demand as the vehicle fleet electrifies, equivalent
              to roughly 10% of current total generation.
            </p>
            <p>
              From the technician's perspective, the critical distinction is between
              AC charging (Modes 2 and 3) and DC charging (Mode 4). In AC charging,
              the vehicle's onboard charger performs the AC-to-DC conversion, which
              limits the charge rate to the onboard charger's capacity (typically
              3.6-11 kW for domestic vehicles, up to 22 kW for some premium models).
              In DC charging, an external charger performs the conversion and delivers
              DC directly to the battery, enabling charge rates of 50-350 kW. The
              electrical installation requirements differ substantially between these
              two approaches — DC rapid chargers require three-phase supplies, larger
              cable cross-sections, and more sophisticated protection arrangements.
            </p>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                Charging Modes and Power Levels
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Mode</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Supply</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Power</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Use</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Mode 2</td>
                      <td className="border border-white/10 px-3 py-2">Domestic socket + ICCD</td>
                      <td className="border border-white/10 px-3 py-2">2.3 kW (10 A) max</td>
                      <td className="border border-white/10 px-3 py-2">Emergency/occasional only</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Mode 3 (single-phase)</td>
                      <td className="border border-white/10 px-3 py-2">Dedicated EVSE, Type 2</td>
                      <td className="border border-white/10 px-3 py-2">3.6-7.4 kW</td>
                      <td className="border border-white/10 px-3 py-2">Home, workplace (standard)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Mode 3 (three-phase)</td>
                      <td className="border border-white/10 px-3 py-2">Dedicated EVSE, Type 2</td>
                      <td className="border border-white/10 px-3 py-2">11-22 kW</td>
                      <td className="border border-white/10 px-3 py-2">Workplace, destination</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Mode 4 (DC rapid)</td>
                      <td className="border border-white/10 px-3 py-2">External DC charger, CCS</td>
                      <td className="border border-white/10 px-3 py-2">50-350 kW</td>
                      <td className="border border-white/10 px-3 py-2">Motorway, en-route, fleet</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                Connector Types
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Type 2 (Mennekes):</strong> 7-pin AC connector — the
                  UK/European standard for Mode 3 charging. Supports single and
                  three-phase. The control pilot (CP) and proximity pilot (PP) pins
                  enable communication between the EVSE and vehicle.
                </li>
                <li className="pl-1">
                  <strong>CCS (Combined Charging System):</strong> Type 2 AC pins
                  plus two DC pins — the dominant DC rapid charging standard. Up to
                  350 kW. Also known as Combo 2 in Europe.
                </li>
                <li className="pl-1">
                  <strong>CHAdeMO:</strong> Japanese DC rapid charging standard (up
                  to 100 kW). Being phased out in favour of CCS. Used on older Nissan
                  Leaf and Mitsubishi Outlander PHEV.
                </li>
                <li className="pl-1">
                  <strong>Type 1 (J1772):</strong> 5-pin AC connector used on some
                  older/imported vehicles. Declining in the UK market.
                </li>
              </ul>
            </div>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                Control Pilot Signal — The Communication Backbone
              </p>
              <p className="text-sm text-white mb-2">
                The control pilot (CP) is a 1 kHz pulse-width modulated (PWM) signal
                defined in IEC 61851-1 that forms the fundamental communication link
                between the EVSE and the vehicle. The EVSE generates a ±12 V square wave,
                and the PWM duty cycle encodes the maximum available current.
              </p>
              <div className="overflow-x-auto mt-2">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Pilot Voltage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">State</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Meaning</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">+12 V (DC)</td>
                      <td className="border border-white/10 px-3 py-2">A</td>
                      <td className="border border-white/10 px-3 py-2">No vehicle connected</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">+9 V (PWM)</td>
                      <td className="border border-white/10 px-3 py-2">B</td>
                      <td className="border border-white/10 px-3 py-2">Vehicle connected, not ready</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">+6 V (PWM)</td>
                      <td className="border border-white/10 px-3 py-2">C</td>
                      <td className="border border-white/10 px-3 py-2">Vehicle connected, charging</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">+3 V (PWM)</td>
                      <td className="border border-white/10 px-3 py-2">D</td>
                      <td className="border border-white/10 px-3 py-2">Ventilation required</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">
                Safety: Continuous Loading
              </p>
              <p className="text-sm text-white">
                EV charging is a continuous load — the charger draws its rated current
                for extended periods (often 4-8 hours overnight). Unlike most domestic
                loads that cycle on and off, EV charging represents a sustained thermal
                load on cables, connections, and protective devices. BS 7671
                Regulation 722.311 requires cable sizing for 100% of the rated output
                with no diversity reduction. Under-rated cables or connections can
                overheat, leading to fire. The most common installation fault is
                inadequate cable sizing or loose terminations that deteriorate under
                continuous thermal loading.
              </p>
            </div>
            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> A 7 kW home charger represents a load
              equivalent to 2-3 average UK houses. This has major implications for
              cable sizing, DNO supply capacity, and local network loading —
              especially when multiple chargers are installed on the same street or
              estate.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            BS 7671 Section 722 and Installation Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 7671 Section 722 contains specific requirements for EV charging
              installations that supplement the general wiring regulations. These
              requirements address the unique characteristics of EV charging: high
              continuous current, outdoor exposure, connection to vehicles (which are
              extraneous-conductive-parts), and the PME earthing safety concern. The
              maintenance technician must understand these requirements for periodic
              inspection and testing.
            </p>
            <p>
              The 18th Edition of BS 7671 (Amendment 2:2022) strengthened the EV
              charging requirements, particularly around RCD selection and PME
              earthing. One of the most significant changes was the explicit
              requirement for Type B or Type B+ RCD protection where the EVSE does
              not incorporate its own DC fault detection. This is because the
              power electronics in the vehicle's onboard charger can generate DC
              fault currents that a standard Type A RCD cannot detect — potentially
              leaving an earth fault unprotected. The IET Code of Practice for
              Electric Vehicle Charging Equipment Installation (now in its 4th
              Edition) provides essential supplementary guidance for implementing
              Section 722.
            </p>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                Key Section 722 Requirements
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>722.311:</strong> The supply cable shall be rated for the
                  maximum demand of the EVSE with no diversity applied (continuous load)
                </li>
                <li className="pl-1">
                  <strong>722.411.4.1:</strong> RCD protection: minimum 30 mA Type A
                  RCD. Where the EVSE does not incorporate DC fault detection, a Type B
                  or Type B+ (Type A with 6 mA DC detection) RCD is required
                </li>
                <li className="pl-1">
                  <strong>722.411.4:</strong> PME earthing restrictions for outdoor
                  charging — earth electrode (TT) or EVSE with integral open-PEN
                  protection
                </li>
                <li className="pl-1">
                  <strong>722.531.3:</strong> Each charge point shall be supplied by a
                  dedicated circuit
                </li>
                <li className="pl-1">
                  <strong>722.55:</strong> EVSE shall comply with BS EN 61851-1 and
                  the connector with BS EN 62196
                </li>
                <li className="pl-1">
                  <strong>722.514:</strong> Appropriate labelling at the distribution
                  board and at the EVSE
                </li>
              </ul>
            </div>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">
                RCD Selection Guide for EV Charging
              </h3>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">EVSE Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">DC Fault Detection</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Required RCD</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">EVSE with integral DC detection</td>
                      <td className="border border-white/10 px-3 py-2">Built in (6 mA DC)</td>
                      <td className="border border-white/10 px-3 py-2">Type A 30 mA</td>
                      <td className="border border-white/10 px-3 py-2">GBP 20-40</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">EVSE without DC detection</td>
                      <td className="border border-white/10 px-3 py-2">None</td>
                      <td className="border border-white/10 px-3 py-2">Type B or Type B+</td>
                      <td className="border border-white/10 px-3 py-2">GBP 150-300</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Three-phase EVSE</td>
                      <td className="border border-white/10 px-3 py-2">Varies by model</td>
                      <td className="border border-white/10 px-3 py-2">Type B (if no integral DC detection)</td>
                      <td className="border border-white/10 px-3 py-2">GBP 200-350</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">
                PME Earthing Solution
              </h3>
              <p className="text-sm text-white mb-2">
                The PME earthing issue is one of the most important installation
                considerations for EV charging. In a TN-C-S (PME) system, an
                open-PEN fault can cause exposed metalwork to rise to dangerous
                voltage. For outdoor EV charging, where a person touching the vehicle
                has good contact with true earth, this presents an increased risk of
                fatal electric shock.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Option 1:</strong> Install an earth electrode (earth rod) for
                  the EV circuit, creating TT earthing with RCD protection. The main
                  installation remains on PME. The earth rod must achieve adequate
                  resistance (typically below 200 ohms for 30 mA RCD).
                </li>
                <li className="pl-1">
                  <strong>Option 2:</strong> Use an EVSE with manufacturer-confirmed
                  integral open-PEN protection (PEN fault detection that disconnects
                  the supply within safe limits).
                </li>
                <li className="pl-1">
                  <strong>Option 3:</strong> Where the EVSE is indoors (e.g., in an
                  integral garage), the PME earth may be acceptable subject to risk
                  assessment, as the reduced contact with true earth lowers the shock
                  risk.
                </li>
              </ul>
            </div>
            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-300 mb-2">
                Inspection Note: Common Installation Defects
              </p>
              <p className="text-sm text-white">
                During periodic inspection of EV charging circuits, the maintenance
                technician should be alert to common defects: incorrect RCD type
                (Type AC instead of Type A minimum); absence of earth electrode where
                required on PME installations; cable undersized for continuous load
                (diversity incorrectly applied); lack of labelling at the distribution
                board; tethered cable showing UV degradation or rodent damage; and
                loose terminations at the charger or distribution board caused by
                thermal cycling under continuous load.
              </p>
            </div>
            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The IET Code of Practice for Electric
              Vehicle Charging Equipment Installation (4th Edition) provides detailed
              guidance on implementing Section 722 requirements. It is essential
              reading for anyone installing or maintaining EV charging equipment.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Smart Charging and Load Management
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Smart charging is not optional — the Electric Vehicles (Smart Charge
              Points) Regulations 2021 mandate that all new domestic and workplace
              charge points must have smart functionality. This reflects the critical
              importance of managing EV charging demand on the electricity network.
              Without smart charging, mass EV adoption would require billions of
              pounds in network reinforcement to handle the additional peak demand.
            </p>
            <p>
              The core challenge is straightforward: if 10 million EVs in the UK all
              begin charging at 7 kW when their owners arrive home between 17:00 and
              19:00, the additional demand would be 70 GW — more than double the
              current UK peak demand of approximately 45 GW. Smart charging addresses
              this by shifting demand to off-peak periods (typically 00:00-05:00),
              responding to real-time grid signals, and coordinating with local
              network constraints. For the maintenance technician, smart charging
              adds an IT and communications dimension to what was traditionally
              purely electrical work — chargers must connect to cloud platforms via
              WiFi, Ethernet, or 4G/5G, and firmware updates must be managed.
            </p>
            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                  Smart Charge Point Requirements (2021 Regulations)
                </h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">
                    Must be capable of sending and receiving data (WiFi, cellular,
                    or Ethernet)
                  </li>
                  <li className="pl-1">
                    Must support scheduled/delayed charging (shift to off-peak)
                  </li>
                  <li className="pl-1">
                    Must have a randomised delay of up to 10 minutes at installation
                    (preventing synchronised start)
                  </li>
                  <li className="pl-1">
                    Must respond to demand-side response signals
                  </li>
                  <li className="pl-1">
                    Must support remote firmware updates
                  </li>
                  <li className="pl-1">
                    Must meet cybersecurity requirements (ETSI EN 303 645)
                  </li>
                  <li className="pl-1">
                    Must default to off-peak charging schedule
                  </li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                  Load Management Solutions
                </h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">
                    <strong>Static load management:</strong> Fixed maximum power
                    allocation per charger (simple but inefficient)
                  </li>
                  <li className="pl-1">
                    <strong>Dynamic load management:</strong> CT clamp on mains
                    monitors total site demand; charger output adjusts in real-time
                  </li>
                  <li className="pl-1">
                    <strong>Sequential charging:</strong> Chargers take turns at full
                    power (suitable for overnight fleet charging)
                  </li>
                  <li className="pl-1">
                    <strong>First-come priority:</strong> First vehicle connected gets
                    full power; subsequent vehicles share remaining capacity
                  </li>
                  <li className="pl-1">
                    <strong>Equal sharing:</strong> Available capacity divided equally
                    among all connected vehicles
                  </li>
                  <li className="pl-1">
                    <strong>Priority-based:</strong> Certain chargers (e.g., emergency
                    vehicles, disabled bays) get priority allocation
                  </li>
                </ul>
              </div>
            </div>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">
                Worked Example: Workplace Load Management
              </h3>
              <p className="text-sm text-white mb-2">
                A workplace has a 100 A three-phase supply (69 kW at 400 V) with an
                existing maximum demand of 45 kW. The available headroom is 24 kW.
                The client wants to install 10 x 7 kW chargers (70 kW total
                installed capacity).
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Without load management:</strong> Only 3 chargers could
                  operate simultaneously (21 kW) within the 24 kW headroom — a DNO
                  supply upgrade would be needed at significant cost
                </li>
                <li className="pl-1">
                  <strong>With dynamic load management:</strong> All 10 chargers are
                  installed, but the system monitors total site demand via a CT clamp
                  and limits total EV charging to the available headroom. If 10
                  vehicles connect, each receives 2.4 kW (sufficient for 8-hour
                  overnight charge). As building load drops in the evening, more
                  capacity is released to the chargers
                </li>
                <li className="pl-1">
                  <strong>Result:</strong> All vehicles are charged by morning without
                  exceeding the supply capacity and without a DNO upgrade — saving
                  GBP 10,000-30,000+ in infrastructure costs
                </li>
              </ul>
            </div>
            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Load management is often the difference
              between needing a DNO supply upgrade (GBP 3,000-30,000+) and working
              within the existing supply capacity. A CT clamp on the incoming supply
              combined with a smart load management controller can support
              significantly more chargers than the supply could handle with dumb
              chargers.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Maintenance, V2G and Future Developments
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              EV charging infrastructure requires regular maintenance to ensure
              safety, reliability, and compliance. As chargers operate in exposed
              outdoor environments with high continuous currents and frequent
              connect/disconnect cycles, they are subject to wear, corrosion, and
              environmental damage. Additionally, emerging technologies such as
              Vehicle-to-Grid (V2G), wireless charging, and ultra-rapid charging are
              expanding the scope of EV infrastructure maintenance.
            </p>
            <p>
              The maintenance regime for EVSE differs from traditional fixed
              electrical equipment because of the high number of mechanical cycles
              (connect/disconnect), the exposure to weather and UV radiation, the
              continuous thermal loading on cables and terminations, and the
              software/firmware dimension of smart chargers. A public rapid charger
              may see 20-50 connections per day, each involving mechanical insertion
              and removal of a heavy connector — pin wear, contact resistance
              increase, and latch mechanism failure are all common maintenance issues
              that have no equivalent in conventional fixed electrical installations.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                  EVSE Maintenance Checklist
                </h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">
                    Cable condition: UV degradation, cuts, kinks, rodent damage
                  </li>
                  <li className="pl-1">
                    Connector pins: corrosion, carbon deposits, mechanical wear
                  </li>
                  <li className="pl-1">
                    Enclosure: water ingress, impact damage, ventilation
                  </li>
                  <li className="pl-1">
                    RCD trip test: 30 mA, verify trip time within limits
                  </li>
                  <li className="pl-1">
                    Earth continuity: main earth and earth electrode (TT)
                  </li>
                  <li className="pl-1">
                    Insulation resistance: 500 V DC test
                  </li>
                  <li className="pl-1">
                    Smart features: communication, firmware, scheduling
                  </li>
                  <li className="pl-1">
                    Labels: condition, legibility, compliance
                  </li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                  Future EV Charging Technologies
                </h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">
                    <strong>V2G:</strong> Bidirectional charging enabling EV batteries
                    to provide grid services
                  </li>
                  <li className="pl-1">
                    <strong>V2H:</strong> Vehicle-to-home — EV powers household during
                    outages
                  </li>
                  <li className="pl-1">
                    <strong>Wireless charging:</strong> Inductive charging pads in
                    parking spaces
                  </li>
                  <li className="pl-1">
                    <strong>Ultra-rapid:</strong> 350 kW+ DC charging (10-80% in
                    15-20 minutes)
                  </li>
                  <li className="pl-1">
                    <strong>Battery swapping:</strong> Automated battery exchange
                    stations
                  </li>
                  <li className="pl-1">
                    <strong>Solar canopy:</strong> PV-integrated car park charging
                    structures
                  </li>
                </ul>
              </div>
            </div>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">
                Vehicle-to-Grid (V2G) Implications
              </h3>
              <p className="text-sm text-white mb-2">
                V2G transforms the EV from a passive load into an active distributed
                energy resource. The implications for electrical installations are
                significant:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  Bidirectional charger required (not standard — additional cost and
                  complexity)
                </li>
                <li className="pl-1">
                  G98/G99 compliance required for grid export capability
                </li>
                <li className="pl-1">
                  Anti-islanding protection mandatory (same as PV and battery storage)
                </li>
                <li className="pl-1">
                  Export metering required for revenue settlement
                </li>
                <li className="pl-1">
                  DNO notification of generation capability
                </li>
                <li className="pl-1">
                  Battery degradation management (limiting V2G cycles to protect
                  battery health)
                </li>
                <li className="pl-1">
                  Cybersecurity for bidirectional energy flow and grid services commands
                </li>
              </ul>
            </div>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">
                Maintenance Frequency Guide
              </h3>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">
                        EVSE Location
                      </th>
                      <th className="border border-white/10 px-3 py-2 text-left">
                        Visual Inspection
                      </th>
                      <th className="border border-white/10 px-3 py-2 text-left">
                        Electrical Test
                      </th>
                      <th className="border border-white/10 px-3 py-2 text-left">
                        Firmware Check
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Domestic</td>
                      <td className="border border-white/10 px-3 py-2">Annually</td>
                      <td className="border border-white/10 px-3 py-2">Annually</td>
                      <td className="border border-white/10 px-3 py-2">Automatic (OTA)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Workplace</td>
                      <td className="border border-white/10 px-3 py-2">Monthly</td>
                      <td className="border border-white/10 px-3 py-2">Quarterly</td>
                      <td className="border border-white/10 px-3 py-2">Quarterly</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Public (AC)</td>
                      <td className="border border-white/10 px-3 py-2">Monthly</td>
                      <td className="border border-white/10 px-3 py-2">Quarterly</td>
                      <td className="border border-white/10 px-3 py-2">Monthly</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Public (DC Rapid)</td>
                      <td className="border border-white/10 px-3 py-2">Weekly</td>
                      <td className="border border-white/10 px-3 py-2">Quarterly</td>
                      <td className="border border-white/10 px-3 py-2">Monthly</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Under ST1426, maintenance technicians must
              demonstrate knowledge of EV charging technology as part of the emerging
              technologies module. With EV charger installations growing exponentially
              and Building Regulations Part S requiring EV provision in new buildings,
              EV charging maintenance will become a core competency for electrical
              maintenance technicians. Technicians who develop expertise in EV
              charging installation and maintenance will be well-positioned in a
              rapidly growing market.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Building Regulations Part S and the Growing EV Market
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Building Regulations 2022 (Approved Document S) represent a
              landmark requirement for EV charging infrastructure in new buildings
              across England. Similar provisions apply in Scotland and Wales under
              their respective building regulations. For the maintenance technician,
              Part S means that every new building with associated parking will have
              EV charging infrastructure from day one — creating a significant and
              growing maintenance workload.
            </p>
            <p>
              The rationale behind Part S is economic: retrofitting EV charging
              infrastructure into existing buildings typically costs 3-5 times more
              than installing it during construction. By requiring cable routes,
              electrical capacity, and active charge points from the outset, Part S
              ensures that buildings are future-proofed for the transition to electric
              vehicles. For large commercial developments, this means hundreds of
              cable routes and dozens of active charge points — each requiring
              commissioning, periodic inspection, and ongoing maintenance.
            </p>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">
                Part S Requirements Summary
              </h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>New residential:</strong> At least one charge point per
                  dwelling with associated parking — minimum 7 kW, Mode 3,
                  smart-enabled
                </li>
                <li className="pl-1">
                  <strong>New non-residential:</strong> One charge point per five
                  parking spaces plus cable routes to every remaining space (buildings
                  with more than 10 spaces)
                </li>
                <li className="pl-1">
                  <strong>Major renovations:</strong> Non-residential buildings with
                  more than 10 spaces undergoing major renovation must provide at
                  least one charge point
                </li>
                <li className="pl-1">
                  <strong>Cable routes:</strong> Where charge points are not installed
                  immediately, cable routes (ducting, containment) must be provided to
                  enable future installation
                </li>
                <li className="pl-1">
                  <strong>Smart functionality:</strong> All charge points must comply
                  with the Electric Vehicles (Smart Charge Points) Regulations 2021
                </li>
              </ul>
            </div>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">
                Impact on the Maintenance Technician
              </h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Volume:</strong> Hundreds of thousands of new charge points
                  installed annually, all requiring periodic inspection and testing
                  under BS 7671
                </li>
                <li className="pl-1">
                  <strong>Diversity:</strong> Multiple manufacturers, models, and
                  firmware versions across different sites — maintenance technicians
                  need broad product knowledge
                </li>
                <li className="pl-1">
                  <strong>Smart systems:</strong> Charge point management platforms
                  require IT/networking skills alongside traditional electrical
                  competence
                </li>
                <li className="pl-1">
                  <strong>Load management:</strong> Multi-charger sites with dynamic
                  load management need commissioning verification and ongoing
                  functional testing
                </li>
                <li className="pl-1">
                  <strong>Career opportunity:</strong> EV charging maintenance is a
                  rapidly growing specialism — technicians with this expertise are in
                  high demand
                </li>
              </ul>
            </div>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">
                Case Study: New-Build Office Development
              </h3>
              <p className="text-sm text-white mb-2">
                A new office building in Manchester has a 200-space car park. Under
                Part S requirements:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Active charge points:</strong> 40 (one per five spaces),
                  each 7 kW Mode 3 with smart functionality — total installed
                  capacity 280 kW
                </li>
                <li className="pl-1">
                  <strong>Cable routes:</strong> Ducting and containment to all
                  remaining 160 spaces for future charge point installation
                </li>
                <li className="pl-1">
                  <strong>Electrical infrastructure:</strong> Three-phase supply
                  upgrade, dedicated EV distribution board, dynamic load management
                  system with CT monitoring on the main incomer
                </li>
                <li className="pl-1">
                  <strong>Maintenance contract:</strong> Monthly visual inspection,
                  quarterly electrical testing, firmware management via cloud
                  platform, 24/7 fault monitoring with 4-hour response SLA
                </li>
                <li className="pl-1">
                  <strong>Annual maintenance cost:</strong> Approximately GBP
                  15,000-25,000 per year for 40 chargers — a significant recurring
                  revenue stream for electrical maintenance contractors
                </li>
              </ul>
            </div>
            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Part S ensures that EV charging is not an
              afterthought but a fundamental building service. The maintenance
              technician who understands EV charging installation standards, smart
              charging systems, and load management will be equipped for one of the
              fastest-growing areas in electrical maintenance.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* ---- FAQs ---- */}
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

        {/* ---- Quick Reference ---- */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">
              Quick Reference
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">
                  Charging Modes and Connectors
                </p>
                <ul className="space-y-0.5">
                  <li>Mode 2: domestic socket + ICCD (2.3 kW max)</li>
                  <li>Mode 3: dedicated EVSE + Type 2 (3.6-22 kW)</li>
                  <li>Mode 4: DC rapid + CCS/CHAdeMO (50-350 kW)</li>
                  <li>Type 2 (Mennekes): 7-pin AC standard</li>
                  <li>CCS: Type 2 + DC pins (dominant rapid)</li>
                  <li>Control pilot: 1 kHz PWM, duty = max current</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">
                  Standards and Regulations
                </p>
                <ul className="space-y-0.5">
                  <li>BS 7671 Section 722: EV charging requirements</li>
                  <li>IEC 61851: EV charging modes</li>
                  <li>IEC 62196: connector types</li>
                  <li>Part S (2022): EV provision in new builds</li>
                  <li>Smart Charge Points Regs 2021: mandatory smart</li>
                  <li>722.411.4: PME earthing restrictions</li>
                  <li>722.311: no diversity (continuous load)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ---- Quiz ---- */}
        <section className="mb-10">
          <Quiz title="Test Your Knowledge" questions={quizQuestions} />
        </section>

        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section6-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Smart Grids and Smart Meters
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section6">
              Back to Section Overview
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default MOETModule3Section6_5;
