import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Smart Grids and Smart Meters - MOET Module 3.6.4";
const DESCRIPTION = "Comprehensive guide to smart grid technology and smart metering for electrical maintenance technicians: distribution automation, demand-side response, smart meter operation, SMETS2 specifications, communication infrastructure, cybersecurity and UK rollout under ST1426.";

const quickCheckQuestions = [
  {
    id: "smart-grid-definition",
    question: "What is a smart grid?",
    options: [
      "A grid made of smart materials",
      "An electricity network that uses digital communication technology, sensors, automation and data analytics to monitor and manage the transport of electricity from all generation sources to meet the varying electricity demands of end users — enabling two-way power flow and real-time network optimisation",
      "A grid that only supplies smart devices",
      "A grid powered by artificial intelligence only"
    ],
    correctIndex: 1,
    explanation: "A smart grid transforms the traditional one-way electricity network (generation to consumption) into an intelligent, two-way system. It uses sensors, communications, and automation throughout the network to: monitor real-time power flows; detect and respond to faults automatically; integrate distributed generation (solar PV, wind, batteries); manage demand-side response; optimise voltage and power quality; and enable consumer participation in energy markets. The transition from Distribution Network Operators (DNOs) to Distribution System Operators (DSOs) reflects this shift to active network management."
  },
  {
    id: "smets2-meter",
    question: "What does SMETS2 stand for and why is it significant?",
    options: [
      "Smart Meter Technical Specification",
      "Smart Metering Equipment Technical Specifications version 2 — the current UK standard ensuring all smart meters can communicate via the Data Communications Company (DCC) national network, operate with any energy supplier, and provide consumers with real-time energy usage data",
      "Standard Measurement Equipment Testing Standard",
      "System Monitoring and Evaluation Testing Scheme"
    ],
    correctIndex: 1,
    explanation: "SMETS2 is the second-generation smart meter specification mandated in the UK. Unlike SMETS1 meters (which used supplier-specific communications and often 'went dumb' when switching supplier), SMETS2 meters communicate via the DCC national network, ensuring they work with any supplier. They provide: 30-minute consumption data to the supplier; real-time usage display on the in-home display (IHD); remote meter reading (eliminating estimated bills); remote tariff switching; and prepayment top-up capability. Over 33 million SMETS2 meters have been installed in the UK."
  },
  {
    id: "demand-side-response",
    question: "What is demand-side response (DSR)?",
    options: [
      "Customers generating their own electricity",
      "The deliberate adjustment of electricity consumption by end users in response to price signals, grid conditions or direct requests from the system operator — shifting demand away from peak periods to reduce strain on the network and avoid the need for expensive peaking generation",
      "A type of smart meter",
      "The grid responding to consumer complaints"
    ],
    correctIndex: 1,
    explanation: "DSR is a fundamental smart grid capability. Instead of building more generation to meet peak demand, DSR reduces or shifts demand. Examples: smart EV chargers delaying charging to off-peak hours; heat pumps pre-heating buildings before the evening peak; industrial loads curtailing during grid stress events; battery storage systems discharging during peak hours. DSR is enabled by smart meters (providing real-time price signals), smart appliances (responding automatically), and aggregator platforms (coordinating multiple small loads into significant demand reduction). National Grid ESO procures DSR as part of its balancing services."
  },
  {
    id: "dcc-communications",
    question: "How do SMETS2 smart meters communicate with energy suppliers?",
    options: [
      "Via the household WiFi",
      "Via the Data Communications Company (DCC) national network — using a dedicated wide-area network (cellular for most areas, long-range radio for rural areas) that is separate from the household internet, ensuring secure, reliable communication independent of the consumer's broadband",
      "Via Bluetooth only",
      "Via satellite"
    ],
    correctIndex: 1,
    explanation: "The DCC operates a dedicated secure communications network specifically for smart metering. It uses: cellular technology (2G/4G) for most of Great Britain; long-range radio (Arqiva network) for areas with poor cellular coverage; and mesh radio in some northern areas. This is completely separate from the householder's internet — the meter works even if the broadband fails. Communications pass through the DCC hub, which authenticates messages and routes data to the correct supplier. Security is critical — the network uses end-to-end encryption and strict access controls to prevent tampering or unauthorised access to consumption data."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The transition from DNO (Distribution Network Operator) to DSO (Distribution System Operator) involves:",
    options: [
      "Changing the company name only",
      "Moving from passive network management (simply delivering power from source to consumer) to active network management — using real-time monitoring, flexible connections, and automated control to optimise power flows, manage constraints, and integrate distributed generation and storage",
      "Reducing the number of substations",
      "Only upgrading cables"
    ],
    correctAnswer: 1,
    explanation: "Traditional DNOs manage a passive, one-way network. DSOs actively manage a complex, two-way network with distributed generation, storage, EV charging, and flexible demand. DSO functions include: real-time monitoring of network conditions at LV level; active network management (curtailing or boosting distributed generation); flexible connections (allowing more generation/demand on existing assets); local energy markets (enabling peer-to-peer trading); and data sharing (network data for planning and innovation). All UK DNOs are transitioning to DSO functions, with full transition expected by 2030."
  },
  {
    id: 2,
    question: "A smart meter installation comprises:",
    options: [
      "Only an electricity meter",
      "An electricity meter, a gas meter (if applicable), a communications hub (connecting to the DCC network), and an in-home display (IHD) showing real-time energy usage and cost information",
      "Only a display screen",
      "Only a communications hub"
    ],
    correctAnswer: 1,
    explanation: "A complete SMETS2 smart meter installation includes: electricity meter (measuring import and export if applicable, recording 30-minute profiles); gas meter (with a small battery-powered module communicating via ZigBee to the electricity meter hub); communications hub (fitted to the electricity meter, providing WAN connection to DCC and HAN connection to the IHD); and in-home display (wireless display showing real-time electricity and gas consumption in kWh and cost). The electricity meter also hosts the HAN (Home Area Network) ZigBee coordinator, allowing future smart appliances to communicate with the meter."
  },
  {
    id: 3,
    question: "Network automation in a smart grid enables:",
    options: [
      "Only remote meter reading",
      "Automatic fault detection, location and isolation (FLISR — Fault Location, Isolation and Service Restoration) — reducing the number of customers affected by faults and the duration of power cuts by automatically reconfiguring the network",
      "Only voltage monitoring",
      "Selling electricity online"
    ],
    correctAnswer: 1,
    explanation: "FLISR is a key smart grid capability. When a fault occurs on a distribution feeder, smart sensors detect the fault and its approximate location. Automated switchgear isolates the faulted section. Healthy sections are automatically reconnected via alternative feeds, restoring supply to unaffected customers within seconds. Without automation, this process requires manual investigation and switching, potentially leaving hundreds of customers without supply for hours. FLISR can reduce customer interruptions by 30-50% and is a major driver for smart grid investment."
  },
  {
    id: 4,
    question: "The Home Area Network (HAN) in a smart meter system uses:",
    options: [
      "WiFi only",
      "ZigBee (IEEE 802.15.4) — a low-power, short-range wireless protocol operating at 2.4 GHz that connects the electricity meter, gas meter, in-home display and potentially future smart appliances within the home",
      "5G cellular",
      "Powerline communication only"
    ],
    correctAnswer: 1,
    explanation: "ZigBee is chosen for the HAN because: low power consumption (critical for the battery-powered gas meter module); adequate range for domestic properties (10-30 m); mesh networking capability (devices can relay messages); established standard (IEEE 802.15.4); and secure encryption (128-bit AES). The electricity meter acts as the ZigBee coordinator, the gas meter and IHD are ZigBee end devices. Future Consumer Access Devices (CADs) can join the HAN to access real-time energy data for smart home energy management systems."
  },
  {
    id: 5,
    question: "Smart grid voltage optimisation reduces energy consumption by:",
    options: [
      "Increasing voltage to maximum",
      "Maintaining supply voltage at the lower end of the statutory range (216.2-253 V, with a nominal of 230 V) — since many electrical devices consume less power at lower voltage, reducing voltage from 245 V to 225 V can reduce energy consumption by 5-10% without affecting equipment performance",
      "Eliminating voltage entirely",
      "Using only DC"
    ],
    correctAnswer: 1,
    explanation: "UK statutory voltage is 230 V +10%/-6% (216.2-253 V). Many networks supply at the upper end (240-250 V) because historically there was no dynamic control. Voltage optimisation uses automatic tap changers on distribution transformers or power electronic devices to maintain voltage closer to 220-225 V. Resistive loads (heaters, incandescent lighting) consume power proportional to V squared, so a 5% voltage reduction gives approximately 10% energy saving. Motor loads are less affected. Smart grid technology enables dynamic voltage optimisation that adjusts in real-time based on demand and generation patterns."
  },
  {
    id: 6,
    question: "Cybersecurity in smart grid systems is critical because:",
    options: [
      "Hackers might read energy bills",
      "Unauthorised access to grid control systems could enable: remote disconnection of millions of consumers; manipulation of demand-side response to cause grid instability; theft of consumer data; interference with energy billing; and potentially cascading failures across interconnected networks",
      "It is only a minor concern",
      "Only the meter needs protecting"
    ],
    correctAnswer: 1,
    explanation: "Smart grid cybersecurity is a national security concern. The attack surface includes: smart meters (millions of connected devices with communications capabilities); distribution automation (remote-controlled switchgear); SCADA systems (supervisory control of the entire network); DCC communications (the central data hub); and consumer-facing systems (apps, web portals). Protection measures include: end-to-end encryption; multi-factor authentication; network segmentation; intrusion detection systems; regular security audits; and the DCC's security architecture (designed to Government NCSC standards). The maintenance technician must follow security protocols when accessing smart meter systems."
  },
  {
    id: 7,
    question: "A Consumer Access Device (CAD) connected to the smart meter HAN:",
    options: [
      "Replaces the smart meter",
      "Allows third-party devices and energy management systems to access real-time energy consumption data from the smart meter via the ZigBee Home Area Network — enabling automated energy management, tariff optimisation and demand-side response",
      "Is the same as the in-home display",
      "Provides internet access"
    ],
    correctAnswer: 1,
    explanation: "A CAD is an additional ZigBee device that joins the smart meter HAN. Unlike the IHD (which is a simple display), a CAD provides data to other systems: home energy management systems (HEMS), smart home controllers, EV charge point controllers, battery storage EMS, and cloud-based energy management platforms. This enables: real-time tariff-aware automation (e.g., charge EV when price drops below threshold); demand-side response participation; and detailed energy analytics. CADs require consumer authorisation and registration with the DCC."
  },
  {
    id: 8,
    question: "When a maintenance technician encounters a smart meter during electrical work:",
    options: [
      "They can remove it without restriction",
      "They must not tamper with, remove, or bypass the meter without authority from the energy supplier — the meter is the property of the metering company, and interference is a criminal offence under the Theft Act 1968 and Electricity Act 1989",
      "They can reconfigure it freely",
      "They should always replace it with an analogue meter"
    ],
    correctAnswer: 1,
    explanation: "Smart meters are the property of the metering equipment owner (typically the energy supplier or a metering company). Unauthorised interference — including removal, bypass, or reconfiguration — is a criminal offence. During electrical work: do not remove meter seals; do not disconnect the meter without supplier authority; if the meter must be moved (e.g., for consumer unit replacement), arrange temporary disconnection with the energy supplier or DNO; report any meter defects to the supplier; and do not interfere with the communications hub. The maintenance technician should be aware of meter locations and avoid damaging meter equipment during adjacent work."
  },
  {
    id: 9,
    question: "Distributed Energy Resources (DER) in a smart grid include:",
    options: [
      "Only large power stations",
      "Solar PV, wind turbines, battery storage, EV chargers, heat pumps, micro-CHP, and demand-side response — all connected at distribution level and managed by the DSO as part of a flexible, integrated energy system",
      "Only smart meters",
      "Only electric vehicles"
    ],
    correctAnswer: 1,
    explanation: "DERs are energy resources connected at distribution (rather than transmission) level. The smart grid must manage these bidirectional resources: solar PV (export varies with weather); wind (variable generation); batteries (charge and discharge flexibly); EV chargers (large but flexible loads); heat pumps (significant but shiftable demand); micro-CHP (heat-led generation); and demand-side response (aggregated load flexibility). The DSO coordinates these resources to: manage network constraints; defer network reinforcement; provide system services; and enable local energy markets. The maintenance technician increasingly maintains these interconnected DER systems."
  },
  {
    id: 10,
    question: "Smart meter data can be used by maintenance technicians to:",
    options: [
      "Nothing — it is only for billing",
      "Analyse consumption patterns to identify electrical faults, assess load profiles for circuit design, verify the performance of energy efficiency measures, and diagnose issues such as high standing loads (indicating equipment left on), sudden consumption changes, or power quality problems",
      "Only read the meter",
      "Replace the energy supplier"
    ],
    correctAnswer: 1,
    explanation: "Smart meter data provides valuable diagnostic information: 30-minute consumption profiles reveal: unusual overnight consumption (equipment faults, immersion heater stuck on); sudden step changes (new loads or failed equipment); seasonal patterns (heating system performance); power factor issues (in half-hourly meters for larger consumers); and the effectiveness of energy efficiency measures (comparing before and after consumption data). The maintenance technician can use this data to: advise building operators on energy use; identify faulty equipment; verify the performance of installed renewables/storage; and support building energy management."
  },
  {
    id: 11,
    question: "The Electricity Act 1989 (as amended) gives Ofgem the power to:",
    options: [
      "Generate electricity",
      "Regulate the electricity industry including: licensing of suppliers and network operators; setting price controls for networks; establishing standards of service; enforcing competition; protecting consumer interests; and overseeing the smart meter rollout programme",
      "Install smart meters",
      "Manufacture electrical equipment"
    ],
    correctAnswer: 1,
    explanation: "Ofgem (Office of Gas and Electricity Markets) is the independent energy regulator. Relevant to smart grids and meters: Ofgem sets the RIIO (Revenue = Incentives + Innovation + Outputs) price control framework that funds network investment including smart grid technology; licenses energy suppliers and network operators; enforces the smart meter rollout obligation on suppliers; protects consumer data rights (smart meter data belongs to the consumer); and manages innovation funding through the Strategic Innovation Fund. The maintenance technician operates within this regulatory framework."
  },
  {
    id: 12,
    question: "The future smart grid will increasingly use:",
    options: [
      "Only coal power stations",
      "Artificial intelligence and machine learning for predictive network management, digital twin technology for network planning, blockchain for peer-to-peer energy trading, 5G communications for ultra-low-latency control, and internet of things (IoT) sensors for comprehensive real-time monitoring",
      "Only manual switching",
      "No technology"
    ],
    correctAnswer: 1,
    explanation: "The smart grid is evolving rapidly: AI/ML enables predictive maintenance (anticipating equipment failure before it happens), demand forecasting (predicting consumption patterns), and optimal network configuration. Digital twins create virtual models of the physical network for planning and scenario testing. Blockchain enables secure peer-to-peer energy trading between prosumers. 5G provides the low-latency, high-bandwidth communications needed for real-time network control. IoT sensors provide granular monitoring data from millions of network assets. These technologies are being deployed now and will transform network operation over the next decade."
  }
];

const faqs = [
  {
    question: "Do I need to understand smart meters for the ST1426 qualification?",
    answer: "Yes. The ST1426 standard requires maintenance technicians to demonstrate awareness of emerging technologies and their impact on electrical systems. Smart meters and smart grid technology are explicitly relevant because: they affect how electrical installations interact with the supply network; they enable demand-side response and energy management; they provide diagnostic data for maintenance; and they are increasingly integrated with other systems (PV, batteries, EV chargers, heat pumps) that the maintenance technician must maintain."
  },
  {
    question: "What happens if a smart meter loses its communication signal?",
    answer: "If the SMETS2 meter loses its WAN (wide area network) connection to the DCC, it continues to: measure and record consumption data locally (storing up to 13 months of 30-minute data); provide real-time display on the IHD via the ZigBee HAN; operate in prepayment mode (if applicable). When communication is restored, the stored data is automatically uploaded to the DCC. The meter does not 'go dumb' — it simply cannot send or receive remote commands until the connection is re-established. If the ZigBee HAN fails, the IHD loses its real-time display, but the meter continues recording data."
  },
  {
    question: "Can a maintenance technician install or replace a smart meter?",
    answer: "No. Smart meter installation and removal is restricted to authorised meter operators working under the energy supplier's authority. Installation requires specific training (including gas safety for dual fuel), DCC registration, and access to secure commissioning systems. A maintenance technician may work on circuits downstream of the meter (after the isolator), but must not: break meter seals, disconnect the meter tails, interfere with the communications hub, or bypass the meter. If the meter needs to be temporarily removed for electrical work (e.g., consumer unit replacement), this must be arranged with the energy supplier."
  },
  {
    question: "How does a smart grid handle voltage rise from solar PV?",
    answer: "High concentrations of solar PV on a distribution feeder can push voltage above the upper statutory limit (253 V) during peak generation. Smart grid solutions include: automatic voltage control (on-load tap changers on distribution transformers adjusting in real-time); reactive power control (PV inverters absorbing reactive power to reduce voltage); export limitation (curtailing PV export when voltage is high); battery storage (absorbing excess generation); and active network management (coordinating multiple DERs to manage voltage). Without these measures, the DNO would need to reinforce the network with larger cables and transformers — a much more expensive solution."
  },
  {
    question: "What is the relationship between smart meters and half-hourly settlement?",
    answer: "Market-Wide Half-Hourly Settlement (MHHS), fully implemented from 2025/2026, means that all electricity consumption is settled on a half-hourly basis (previously, domestic consumption was settled using estimated profiles). Smart meters enable this by recording actual 30-minute consumption data. The impact is: suppliers can offer time-of-use tariffs reflecting actual wholesale costs; consumers are incentivised to shift consumption to cheaper periods; demand-side response becomes commercially viable; and the market accurately values flexible demand. For maintenance technicians, this means the systems they maintain (heat pumps, EV chargers, batteries) are increasingly operated on time-of-use schedules that affect their loading patterns."
  }
];

const MOETModule3Section6_4 = () => {
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
            <span>Module 3.6.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Smart Grids and Smart Meters
          </h1>
          <p className="text-white/80">
            Digital grid technology, smart metering and demand management for maintenance technicians
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Smart grid:</strong> Two-way digital network with real-time monitoring and control</li>
              <li className="pl-1"><strong>SMETS2:</strong> UK smart meter standard — DCC network, any-supplier compatible</li>
              <li className="pl-1"><strong>DSR:</strong> Shifting demand to balance supply and reduce peak loading</li>
              <li className="pl-1"><strong>DSO:</strong> Active network management replacing passive DNO model</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Data:</strong> Smart meter data aids fault diagnosis and load analysis</li>
              <li className="pl-1"><strong>Integration:</strong> PV, batteries, EV, heat pumps all connect to smart grid</li>
              <li className="pl-1"><strong>Meters:</strong> Do not tamper — meter work requires supplier authority</li>
              <li className="pl-1"><strong>ST1426:</strong> Emerging technologies awareness required</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the principles of smart grid technology and the DNO to DSO transition",
              "Describe SMETS2 smart meter specification, components and communication architecture",
              "Identify demand-side response mechanisms and their role in grid balancing",
              "Understand the DCC national communications network and cybersecurity requirements",
              "Recognise the maintenance technician's responsibilities regarding smart meters",
              "Apply smart meter data for diagnostic purposes in electrical maintenance"
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
            Smart Grid Principles and the DSO Transition
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The electricity grid is undergoing the most significant transformation since its creation.
              The traditional model — large centralised power stations generating electricity that flows
              one way to passive consumers — is being replaced by a smart grid with distributed generation,
              active demand management, energy storage, and two-way power flows. This transformation is
              driven by the need to integrate renewable energy, electrify heating and transport, and achieve
              net zero emissions.
            </p>
            <p>
              For the maintenance technician, this means the electrical systems you maintain are increasingly
              interconnected, digitally monitored, and actively managed. Understanding the smart grid context
              helps you appreciate why systems are designed and operated as they are, and enables you to
              diagnose faults more effectively when equipment behaves differently from what you might expect
              on a traditional passive network.
            </p>
            <p>
              The DNO-to-DSO transition is at the heart of this change. Traditional DNOs simply delivered
              power from the transmission grid to consumers, with limited real-time visibility of conditions
              at LV (low voltage) level. DSOs actively manage a complex, two-way network using sensors,
              communications, and automated control. This enables integration of millions of distributed
              energy resources (solar PV, batteries, EVs, heat pumps) without the prohibitive cost of
              upgrading every cable and transformer on the network.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Traditional Grid vs Smart Grid</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Feature</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Traditional Grid</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Smart Grid</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Power flow</td>
                      <td className="border border-white/10 px-3 py-2">One-way (generation to consumer)</td>
                      <td className="border border-white/10 px-3 py-2">Two-way (prosumers export and import)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Generation</td>
                      <td className="border border-white/10 px-3 py-2">Centralised (large power stations)</td>
                      <td className="border border-white/10 px-3 py-2">Distributed (millions of small generators)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Monitoring</td>
                      <td className="border border-white/10 px-3 py-2">Limited (substation level)</td>
                      <td className="border border-white/10 px-3 py-2">Comprehensive (real-time at LV level)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Control</td>
                      <td className="border border-white/10 px-3 py-2">Manual switching</td>
                      <td className="border border-white/10 px-3 py-2">Automated, real-time optimisation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Demand management</td>
                      <td className="border border-white/10 px-3 py-2">Supply follows demand</td>
                      <td className="border border-white/10 px-3 py-2">Demand responds to supply (DSR)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Consumer role</td>
                      <td className="border border-white/10 px-3 py-2">Passive consumer</td>
                      <td className="border border-white/10 px-3 py-2">Active prosumer (produces, stores, trades)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Smart Grid Technologies</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>SCADA and DMS:</strong> Supervisory control and data acquisition, distribution management systems for real-time network operation</li>
                <li className="pl-1"><strong>FLISR:</strong> Fault location, isolation and service restoration — automatic fault response within seconds</li>
                <li className="pl-1"><strong>ANM:</strong> Active Network Management — real-time constraint management for distributed generation</li>
                <li className="pl-1"><strong>OLTC:</strong> On-Load Tap Changers — automatic voltage regulation on distribution transformers</li>
                <li className="pl-1"><strong>Smart meters:</strong> Real-time consumption data, remote reading, tariff switching, load control</li>
                <li className="pl-1"><strong>LV monitoring:</strong> Sensors on LV feeders providing visibility previously only available at HV level</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The DNO to DSO transition is creating new roles and capabilities
              in network management. Maintenance technicians will increasingly work on equipment that is
              remotely monitored and controlled by the DSO — understanding the smart grid context helps
              you work safely and effectively within this system.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Smart Meter Technology (SMETS2)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Smart meters are the consumer-facing element of the smart grid. Over 33 million SMETS2 meters
              have been installed in Great Britain, making the smart meter the most widely deployed smart grid
              technology. For maintenance technicians, understanding smart meter technology is essential because
              these devices are present in almost every domestic and small commercial installation, and they
              interact with the systems you maintain.
            </p>
            <p>
              The SMETS2 specification was developed to address the shortcomings of the earlier SMETS1 meters.
              SMETS1 meters used supplier-specific communication systems, meaning they often lost their smart
              functionality when a consumer switched energy supplier. SMETS2 meters communicate via the DCC
              national network, ensuring interoperability with any supplier. This is a critical distinction that
              the maintenance technician should understand when advising building operators about meter
              functionality.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">SMETS2 System Components</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Electricity meter (ESME):</strong> Measures import/export energy (kWh), records 30-min profiles, hosts the ZigBee HAN coordinator, contains a load-control switch (for supplier remote disconnection/reconnection)</li>
                <li className="pl-1"><strong>Gas meter (GSME):</strong> Battery-powered meter with ZigBee module communicating to the ESME; measures gas consumption in cubic metres (converted to kWh)</li>
                <li className="pl-1"><strong>Communications hub (CHF):</strong> Fitted to the ESME; provides WAN connection (cellular or radio) to the DCC and LAN/HAN ZigBee connections</li>
                <li className="pl-1"><strong>In-home display (IHD):</strong> Wireless display showing real-time electricity and gas consumption in kWh and pounds</li>
                <li className="pl-1"><strong>Consumer Access Device (CAD):</strong> Optional ZigBee device allowing third-party systems to access real-time energy data</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Communication Architecture</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>HAN (Home Area Network):</strong> ZigBee (2.4 GHz) connecting meter, gas module, IHD and CADs within the home</li>
                <li className="pl-1"><strong>WAN (Wide Area Network):</strong> Cellular (2G/4G) or long-range radio connecting the meter to the DCC national hub</li>
                <li className="pl-1"><strong>DCC (Data Communications Company):</strong> Central hub routing data between meters, suppliers, network operators and authorised parties</li>
                <li className="pl-1"><strong>Security:</strong> End-to-end encryption, digital certificates, NCSC-assured security architecture</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Important: Meter Tampering is a Criminal Offence</p>
              <p className="text-sm text-white">
                Smart meters are the property of the metering company. Interfering with, bypassing, or
                tampering with a smart meter is a criminal offence under the Theft Act 1968 (abstracting
                electricity) and the Electricity Act 1989. The maintenance technician must: never break
                meter seals; never disconnect meter tails without supplier authority; never interfere with
                the communications hub; and report any suspected meter tampering to the energy supplier. If
                electrical work requires meter disconnection, arrange this through the supplier or DNO.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The SMETS2 specification ensures interoperability — every meter
              works with every supplier via the DCC. This resolved the SMETS1 problem where meters lost
              smart functionality when consumers switched supplier. Understanding this architecture helps
              the technician advise building operators on smart meter capabilities and limitations.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Demand-Side Response and Energy Management
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Demand-side response is a fundamental smart grid strategy that shifts or reduces electricity
              consumption in response to grid conditions, price signals, or direct instructions. As the UK
              moves to a highly electrified energy system (heat pumps, EV charging, cooking), the peak
              demand on the network will increase significantly. Without DSR, massive network reinforcement
              would be needed. With DSR, existing network capacity can be used more efficiently.
            </p>
            <p>
              For the maintenance technician, DSR has direct practical implications. The equipment you
              maintain — EV chargers, heat pumps, battery storage systems — is increasingly operated on
              DSR schedules. An EV charger that does not start immediately when plugged in is not necessarily
              faulty; it may be waiting for an off-peak tariff window. A heat pump that runs at 3 am is not
              malfunctioning; it is pre-heating the building before the morning peak. Understanding DSR
              prevents misdiagnosis and unnecessary call-outs.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Types of Demand-Side Response</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Price-based DSR:</strong> Consumers respond to time-of-use tariffs — charging EVs and batteries overnight when prices are low</li>
                  <li className="pl-1"><strong>Incentive-based DSR:</strong> Consumers/businesses receive payments for reducing demand during grid stress events</li>
                  <li className="pl-1"><strong>Direct load control:</strong> DNO/supplier remotely controls specific loads (e.g., EV chargers, storage heaters) via smart meters or dedicated control systems</li>
                  <li className="pl-1"><strong>Aggregated DSR:</strong> An aggregator coordinates hundreds of small flexible loads (heat pumps, batteries, EVs) into a virtual power plant offering grid services</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">DSR-Enabled Equipment (maintained by technicians)</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Smart EV chargers:</strong> Schedule charging to off-peak periods; respond to DNO constraints</li>
                  <li className="pl-1"><strong>Heat pumps:</strong> Pre-heat buildings before peak period; modulate output based on tariff</li>
                  <li className="pl-1"><strong>Battery storage:</strong> Charge from grid/PV during cheap periods; discharge during expensive periods</li>
                  <li className="pl-1"><strong>Hot water cylinders:</strong> Heat water during cheap periods for later use (thermal storage)</li>
                  <li className="pl-1"><strong>Industrial loads:</strong> Shift production processes to avoid peak tariff periods</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> As a maintenance technician, the equipment you maintain is
              increasingly operated on DSR schedules. Understanding why an EV charger delays charging,
              a heat pump modulates output, or a battery charges at 3 am helps you distinguish normal
              DSR behaviour from faults — avoiding unnecessary call-outs and ensuring DSR-enabled
              equipment is maintained to operate correctly.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Cybersecurity and Future Smart Grid Developments
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              As the grid becomes increasingly digitalised, cybersecurity becomes a critical concern.
              The smart grid represents critical national infrastructure — a successful cyber-attack could
              disrupt power supply to millions of consumers. For maintenance technicians, this means
              following security protocols when accessing smart meter and control systems, and being aware
              of the broader security landscape.
            </p>
            <p>
              The cybersecurity threat to energy infrastructure is real and growing. Nation-state actors,
              criminal organisations, and hacktivists have all targeted energy networks globally. The UK's
              National Cyber Security Centre (NCSC) classifies the energy sector as critical national
              infrastructure requiring enhanced protection. The DCC's security architecture was designed
              to Government security standards, and smart meter communications use end-to-end encryption
              with digital certificates for device authentication.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Cybersecurity Layers</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">End-to-end encryption (meter to DCC to supplier)</li>
                  <li className="pl-1">Digital certificates for device authentication</li>
                  <li className="pl-1">Network segmentation (OT separate from IT)</li>
                  <li className="pl-1">Intrusion detection systems (IDS) on SCADA networks</li>
                  <li className="pl-1">Multi-factor authentication for control access</li>
                  <li className="pl-1">Regular penetration testing and security audits</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Emerging Technologies</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">AI/ML for predictive network management</li>
                  <li className="pl-1">Digital twins for network simulation</li>
                  <li className="pl-1">Blockchain for peer-to-peer energy trading</li>
                  <li className="pl-1">5G for ultra-low-latency grid control</li>
                  <li className="pl-1">IoT sensors for comprehensive network monitoring</li>
                  <li className="pl-1">Vehicle-to-grid (V2G) for EV battery grid services</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Security: Technician Responsibilities</p>
              <p className="text-sm text-white">
                While the maintenance technician is not responsible for network cybersecurity, you have a
                role in maintaining the security of the systems you access. This includes: never sharing
                access credentials for charger management platforms, inverter monitoring systems, or BMS
                portals; reporting any suspicious activity or unknown devices connected to smart meter HANs;
                ensuring firmware updates are applied from verified sources only; and following the
                manufacturer's security guidelines for remote access to equipment. A compromised charger
                or inverter could provide a gateway into the broader energy network.
              </p>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Under ST1426, maintenance technicians must demonstrate awareness
              of smart grid and smart metering technologies as part of the emerging technologies module.
              The smart grid context affects how every electrical installation operates — from the supply
              voltage to the load profiles of the equipment you maintain. Technicians who understand this
              context deliver better maintenance outcomes and can advise building operators on energy
              management opportunities.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            The Maintenance Technician and Smart Grid Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Smart grid technology is not an abstract concept for the maintenance technician — it directly
              affects how the systems you maintain operate day to day. Smart meter data, demand-side response
              schedules, and network automation all influence the loads, voltages, and operating patterns of
              the electrical installations in your care. Understanding this context transforms your ability to
              diagnose faults, advise building operators, and carry out effective preventive maintenance.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">
                Using Smart Meter Data for Maintenance Diagnostics
              </h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Baseline consumption:</strong> Establish normal consumption profiles for a
                  building — any significant deviation indicates a potential fault or change in usage
                </li>
                <li className="pl-1">
                  <strong>Overnight standing load:</strong> High consumption between 01:00 and 05:00 may
                  indicate equipment left running, immersion heater stuck on, or faulty controls
                </li>
                <li className="pl-1">
                  <strong>Step changes:</strong> A sudden permanent increase in consumption suggests a
                  new load or failed equipment (e.g., a failed thermostat causing continuous heating)
                </li>
                <li className="pl-1">
                  <strong>Seasonal comparison:</strong> Comparing winter and summer profiles reveals
                  heating system performance — degraded heat pump COP shows as increased consumption
                </li>
                <li className="pl-1">
                  <strong>Post-maintenance verification:</strong> Comparing consumption before and after
                  maintenance work confirms the effectiveness of repairs or efficiency improvements
                </li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">
                Practical Implications for Daily Work
              </h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>DSR-controlled equipment:</strong> An EV charger that does not start
                  immediately may be on a DSR schedule, not faulty — check the smart charging
                  settings before diagnosing a fault
                </li>
                <li className="pl-1">
                  <strong>Voltage variations:</strong> Smart grid voltage optimisation may reduce
                  supply voltage — equipment designed for 240 V operating at 220 V is normal
                  in an optimised network
                </li>
                <li className="pl-1">
                  <strong>Remote monitoring alerts:</strong> Building management systems connected
                  to smart meters may generate alerts that the maintenance technician must investigate
                </li>
                <li className="pl-1">
                  <strong>Meter tampering awareness:</strong> During any work near the meter position,
                  take care not to disturb seals, connections, or the communications hub
                </li>
                <li className="pl-1">
                  <strong>Consumer advice:</strong> Help building operators understand their IHD
                  data and identify energy-saving opportunities based on consumption patterns
                </li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The smart grid is not separate from your daily work — it is
              the operating context for every electrical installation. Technicians who understand smart
              meter data, DSR schedules, and network automation can diagnose faults more accurately,
              avoid unnecessary call-outs, and provide higher-value maintenance services to building
              operators.
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
                  Smart Grid Technology
                </p>
                <ul className="space-y-0.5">
                  <li>FLISR: automatic fault detection, isolation, restoration</li>
                  <li>ANM: active network management for DER</li>
                  <li>OLTC: on-load tap changers for voltage control</li>
                  <li>DSO: Distribution System Operator (replaces DNO)</li>
                  <li>DCC: Data Communications Company (meter hub)</li>
                  <li>DSR: demand-side response (shift/reduce demand)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">
                  Smart Meter (SMETS2)
                </p>
                <ul className="space-y-0.5">
                  <li>ESME: electricity smart metering equipment</li>
                  <li>GSME: gas smart metering equipment</li>
                  <li>CHF: communications hub function</li>
                  <li>HAN: ZigBee (2.4 GHz) home area network</li>
                  <li>WAN: cellular/radio to DCC</li>
                  <li>IHD: in-home display (real-time usage)</li>
                  <li>CAD: consumer access device (third-party data)</li>
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
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section6-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Energy Storage Systems
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section6-5">
              Next: EV Charging Infrastructure
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default MOETModule3Section6_4;
