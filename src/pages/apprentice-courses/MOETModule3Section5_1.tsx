import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Uninterruptible Power Supply (UPS) - MOET Module 3.5.1";
const DESCRIPTION = "Comprehensive guide to UPS systems for maintenance technicians: offline, line-interactive and online double-conversion topologies, sizing, battery types, bypass systems, maintenance procedures, monitoring and common failure modes under ST1426.";

const quickCheckQuestions = [
  {
    id: "ups-topology",
    question: "Which UPS topology provides the highest level of power protection with zero transfer time?",
    options: [
      "Offline (standby) UPS",
      "Line-interactive UPS",
      "Online double-conversion UPS",
      "All topologies provide the same level of protection"
    ],
    correctIndex: 2,
    explanation: "Online double-conversion UPS provides the highest level of protection because the load is always powered from the inverter, which is continuously supplied by the rectifier/charger. There is zero transfer time because the load never experiences a switch from mains to battery — it is always on the inverter output. The rectifier converts AC to DC, and the inverter converts DC back to clean, regulated AC."
  },
  {
    id: "ups-sizing",
    question: "When sizing a UPS, what two parameters must be determined?",
    options: [
      "Voltage and frequency",
      "kVA/kW rating and autonomy (runtime) required",
      "Physical dimensions and weight",
      "Number of outlets and cable length"
    ],
    correctIndex: 1,
    explanation: "The two critical sizing parameters are: (1) the kVA/kW rating, which must be sufficient to support the total connected load, and (2) the autonomy (runtime), which is the time the UPS must support the load on battery power during a mains failure. The kVA rating is determined by the total load, and the autonomy is determined by the battery capacity."
  },
  {
    id: "ups-bypass",
    question: "What is the purpose of the UPS bypass system?",
    options: [
      "To increase the power output of the UPS",
      "To allow the load to be transferred to raw mains supply for UPS maintenance or in case of UPS failure",
      "To charge the batteries faster",
      "To reduce the noise level of the UPS"
    ],
    correctIndex: 1,
    explanation: "The bypass system allows the load to be transferred directly to the raw mains supply, bypassing the UPS electronics. This is essential for two purposes: (1) maintenance bypass — allows the UPS to be completely de-energised for servicing while maintaining power to the load; and (2) automatic bypass — transfers the load to mains if the UPS inverter fails or is overloaded, preventing a complete power loss."
  },
  {
    id: "ups-battery-test",
    question: "How often should UPS batteries typically be tested under a preventive maintenance programme?",
    options: [
      "Once every 5 years",
      "Annually, with more frequent checks for critical installations",
      "Only when a fault is suspected",
      "Every month"
    ],
    correctIndex: 1,
    explanation: "UPS batteries should be tested at least annually as part of a preventive maintenance programme. Critical installations (data centres, hospitals) may require more frequent testing — quarterly or even monthly. Testing includes impedance testing of individual cells/blocks, visual inspection, temperature measurement, float voltage checks and periodic discharge testing."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "In an offline (standby) UPS, during normal mains operation, the load is powered by:",
    options: [
      "The inverter at all times",
      "The battery at all times",
      "The raw mains supply, filtered by a basic surge suppressor",
      "A combination of mains and inverter"
    ],
    correctAnswer: 2,
    explanation: "In an offline UPS, the load is powered directly from the mains supply during normal operation, with basic filtering and surge suppression. The inverter only activates when the mains fails, resulting in a brief transfer time (typically 5-12 ms). This is the simplest and cheapest UPS topology but provides the least protection."
  },
  {
    id: 2,
    question: "A line-interactive UPS improves on the offline topology by adding:",
    options: [
      "A second battery bank",
      "An autotransformer (AVR) that regulates voltage without switching to battery",
      "A diesel generator",
      "Additional surge protection"
    ],
    correctAnswer: 1,
    explanation: "A line-interactive UPS incorporates an autotransformer or buck-boost regulator that can adjust the output voltage without switching to battery operation. This allows the UPS to handle voltage sags and surges (within a range) without battery drain. Transfer to battery only occurs if the mains voltage falls outside the AVR correction range or fails completely."
  },
  {
    id: 3,
    question: "The power factor of a UPS load is important because:",
    options: [
      "It determines the colour of the indicator lights",
      "It affects the real power (kW) the UPS can deliver for a given kVA rating",
      "It determines the battery type required",
      "It affects the noise level of the UPS"
    ],
    correctAnswer: 1,
    explanation: "UPS systems are rated in kVA (apparent power) and kW (real power). The relationship is: kW = kVA x power factor. A 10 kVA UPS with a power factor of 0.8 can deliver 8 kW of real power. Modern UPS systems typically have a unity (1.0) power factor, meaning kVA = kW. Older UPS systems with 0.8 power factor deliver 20% less real power than their kVA rating suggests."
  },
  {
    id: 4,
    question: "VRLA batteries used in UPS systems stand for:",
    options: [
      "Variable Resistance Lead Acid",
      "Valve Regulated Lead Acid",
      "Voltage Regulated Lithium Alkaline",
      "Very Reliable Long-life Acid"
    ],
    correctAnswer: 1,
    explanation: "VRLA stands for Valve Regulated Lead Acid. These are sealed batteries with a pressure relief valve. They are maintenance-free (no electrolyte topping up required) and can be installed in any orientation. VRLA batteries include AGM (Absorbed Glass Mat) and gel types. They are the most common battery type in commercial UPS systems due to their reliability and lower maintenance requirements."
  },
  {
    id: 5,
    question: "What is the typical design life of VRLA batteries in a UPS system?",
    options: [
      "1-2 years",
      "3-5 years (standard) or 10-12 years (long-life)",
      "15-20 years",
      "25+ years"
    ],
    correctAnswer: 1,
    explanation: "Standard VRLA batteries have a design life of 3-5 years, while long-life (Eurobat classified) VRLA batteries have a design life of 10-12 years. Actual life depends on operating temperature, charging regime and number of discharge cycles. For every 10°C above the recommended 20°C operating temperature, battery life is approximately halved (Arrhenius equation)."
  },
  {
    id: 6,
    question: "During UPS maintenance, what is the purpose of impedance testing individual battery blocks?",
    options: [
      "To check the voltage of each block",
      "To detect internal degradation that indicates a block approaching end of life",
      "To verify the battery charger is working correctly",
      "To measure the temperature of each block"
    ],
    correctAnswer: 1,
    explanation: "Impedance testing measures the internal impedance of each battery block/cell. As a battery degrades, its internal impedance increases. By trending impedance values over time, it is possible to identify blocks that are approaching end of life before they fail during a mains outage. A block with impedance significantly higher than its baseline or its neighbours should be flagged for replacement."
  },
  {
    id: 7,
    question: "A UPS maintenance bypass switch (external wrap-around bypass) allows:",
    options: [
      "The batteries to be charged faster",
      "The entire UPS to be isolated while maintaining power to the critical load",
      "The UPS output voltage to be adjusted",
      "Remote monitoring of the UPS"
    ],
    correctAnswer: 1,
    explanation: "An external maintenance bypass switch (often called a wrap-around bypass) allows the entire UPS — including the internal electronics, bypass and batteries — to be completely isolated while the load continues to receive power directly from the mains. This is essential for safe UPS maintenance, repair and replacement without shutting down the critical load."
  },
  {
    id: 8,
    question: "Which environmental factor most significantly reduces UPS battery life?",
    options: [
      "Humidity",
      "Elevated ambient temperature",
      "Altitude",
      "Vibration"
    ],
    correctAnswer: 1,
    explanation: "Elevated ambient temperature is the single most significant factor in reducing UPS battery life. The Arrhenius equation states that for every 10°C increase above the recommended 20°C, battery life is approximately halved. A battery rated for 5 years at 20°C may last only 2.5 years at 30°C. This is why battery rooms and UPS installations must be adequately ventilated or air-conditioned."
  },
  {
    id: 9,
    question: "UPS monitoring systems typically communicate using which protocol?",
    options: [
      "Bluetooth only",
      "SNMP (Simple Network Management Protocol) over Ethernet",
      "Infrared",
      "FM radio"
    ],
    correctAnswer: 1,
    explanation: "SNMP (Simple Network Management Protocol) over Ethernet is the standard communication protocol for UPS monitoring. It allows the UPS to send status information, alarms and events to a network management system (NMS) or building management system (BMS). Common SNMP parameters include input/output voltage, frequency, load percentage, battery status, temperature and alarm conditions."
  },
  {
    id: 10,
    question: "Capacitors in UPS systems require periodic replacement because:",
    options: [
      "They run out of charge",
      "Electrolytic capacitors dry out over time, leading to increased ripple and potential failure",
      "They become physically larger with age",
      "Their colour changes indicating degradation"
    ],
    correctAnswer: 1,
    explanation: "Electrolytic capacitors (used in rectifiers, inverters and DC bus filtering) dry out over time as the electrolyte evaporates, particularly at elevated temperatures. This leads to increased ESR (equivalent series resistance), higher ripple current, and eventually capacitor failure. Preventive replacement of capacitors is typically recommended at 7-10 year intervals for critical UPS systems."
  },
  {
    id: 11,
    question: "Lithium-ion batteries are increasingly being used in UPS systems because they offer:",
    options: [
      "Lower purchase cost than VRLA",
      "Longer life, higher energy density and better high-temperature performance",
      "No need for a battery management system",
      "Simpler disposal requirements"
    ],
    correctAnswer: 1,
    explanation: "Lithium-ion batteries offer several advantages over VRLA for UPS applications: 2-3x longer life (10-15+ years), 3x higher energy density (smaller and lighter), better performance at elevated temperatures, faster recharge times, and integrated BMS for cell-level monitoring. The higher purchase cost is offset by the longer life and reduced replacement frequency."
  },
  {
    id: 12,
    question: "A common failure mode in UPS systems is the fan failure. What is the consequence of a failed cooling fan?",
    options: [
      "No effect on UPS operation",
      "Increased noise level only",
      "Overheating of power electronics, leading to thermal shutdown or component failure",
      "Reduced battery charging speed"
    ],
    correctAnswer: 2,
    explanation: "UPS power electronics (rectifier, inverter, IGBT modules) generate significant heat during operation. Cooling fans are essential to maintain safe operating temperatures. If a fan fails, internal temperatures will rise, potentially triggering a thermal alarm and automatic shutdown, or causing premature failure of capacitors, IGBTs and other heat-sensitive components. Fan replacement is a routine preventive maintenance task."
  }
];

const faqs = [
  {
    question: "How do I know when UPS batteries need replacing?",
    answer: "Key indicators include: the UPS reports a battery fault or reduced autonomy alarm; impedance testing shows a significant increase from baseline values; the batteries are approaching or have exceeded their design life (3-5 years for standard VRLA); a discharge test shows reduced runtime; visual inspection reveals swollen or leaking battery cases; or the battery room temperature has been consistently above 25°C, which accelerates degradation. Trending impedance data over time is the most reliable predictive method."
  },
  {
    question: "What is the difference between static and rotary UPS?",
    answer: "Static UPS uses solid-state electronics (rectifier, inverter, batteries) to provide uninterruptible power. Rotary UPS uses a motor-generator set with a flywheel to provide short-term energy storage and power conditioning. Some rotary systems also include battery or diesel backup for extended autonomy. Rotary UPS is typically used in large industrial and data centre applications where very high power ratings (>500 kVA) and excellent power conditioning are required."
  },
  {
    question: "What should I check during a routine UPS inspection?",
    answer: "A routine UPS inspection should include: reading and recording all display parameters (input/output voltage, current, frequency, load percentage, battery status); checking for alarms and events in the log; visual inspection of the UPS cabinet (cleanliness, fan operation, unusual noise or smell); checking battery room temperature; visual inspection of batteries (swelling, leaking, corrosion on terminals); checking the tightness of battery connections (thermal imaging is preferred); verifying the bypass switch position; and confirming the SNMP/BMS connection is active."
  },
  {
    question: "Can a UPS protect against all types of power disturbance?",
    answer: "An online double-conversion UPS protects against virtually all power disturbances: outages, sags, surges, spikes, frequency variations, harmonic distortion and electrical noise. Offline and line-interactive UPS provide protection against outages and some voltage disturbances but do not provide the same level of power conditioning. No UPS can protect against a sustained mains failure beyond its battery autonomy — for extended outages, a generator with automatic transfer switch is required."
  },
  {
    question: "What safety precautions are required when working on UPS batteries?",
    answer: "UPS batteries present significant hazards: DC shock risk (battery strings can be 200-700 V DC); arc flash risk (high short-circuit current from battery banks); chemical risk (acid electrolyte in lead-acid batteries, thermal runaway risk in lithium-ion); and hydrogen gas risk (flooded lead-acid batteries in ventilated rooms). Required precautions include: insulated tools, PPE (safety glasses, acid-resistant gloves, face shield for battery work), safe isolation procedures, battery disconnect before working on battery connections, and verification of ventilation in battery rooms."
  }
];

const MOETModule3Section5_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section5">
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
            <span>Module 3.5.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Uninterruptible Power Supply (UPS)
          </h1>
          <p className="text-white/80">
            UPS topologies, sizing, battery types, bypass systems and maintenance
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Offline:</strong> Simplest — load on raw mains, 5-12 ms transfer time</li>
              <li className="pl-1"><strong>Line-interactive:</strong> AVR regulates voltage without battery use</li>
              <li className="pl-1"><strong>Online double-conversion:</strong> Zero transfer time — highest protection</li>
              <li className="pl-1"><strong>Batteries:</strong> VRLA (3-5 yr) or Li-ion (10-15 yr) — temperature critical</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Regulatory Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>BS EN 62040:</strong> UPS systems — performance and testing</li>
              <li className="pl-1"><strong>BS 7671:</strong> Installation requirements for UPS systems</li>
              <li className="pl-1"><strong>EAWR 1989:</strong> Safe working on UPS and battery systems</li>
              <li className="pl-1"><strong>ST1426:</strong> Maintain and test auxiliary power systems</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Describe offline, line-interactive and online double-conversion UPS topologies",
              "Explain UPS sizing in terms of kVA/kW rating and autonomy",
              "Compare VRLA and lithium-ion battery technologies for UPS applications",
              "Describe bypass systems including automatic and maintenance bypass",
              "Outline a UPS preventive maintenance programme including battery testing",
              "Identify common UPS failure modes and monitoring requirements"
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
            UPS Topologies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              An Uninterruptible Power Supply (UPS) provides conditioned, continuous electrical power to
              critical loads during mains supply disturbances including outages, voltage sags, surges,
              spikes, frequency variations and harmonic distortion. The three principal UPS topologies —
              offline, line-interactive and online double-conversion — offer progressively higher levels
              of protection at increasing cost and complexity.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Offline (Standby) UPS</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Load powered directly from mains during normal operation</li>
                <li className="pl-1">Basic surge suppression and filtering on the mains path</li>
                <li className="pl-1">Inverter activates only when mains fails — transfer time 5-12 ms</li>
                <li className="pl-1">Simplest topology, lowest cost, smallest physical size</li>
                <li className="pl-1">Suitable for desktop PCs, home networking, non-critical loads</li>
                <li className="pl-1">Does not condition the mains supply — passes through disturbances</li>
                <li className="pl-1">Typical ratings: 300 VA to 1.5 kVA</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Line-Interactive UPS</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Load powered from mains through an autotransformer (AVR)</li>
                <li className="pl-1">AVR regulates voltage sags and surges without battery discharge</li>
                <li className="pl-1">Transfer to battery if mains falls outside AVR correction range — 2-4 ms</li>
                <li className="pl-1">Better protection than offline at moderate cost increase</li>
                <li className="pl-1">Suitable for network equipment, small servers, telecoms</li>
                <li className="pl-1">Typical ratings: 500 VA to 5 kVA</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Online Double-Conversion UPS</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Load always powered from the inverter — zero transfer time</li>
                <li className="pl-1">Rectifier converts mains AC to DC, charges batteries and feeds inverter</li>
                <li className="pl-1">Inverter converts DC back to clean, regulated AC</li>
                <li className="pl-1">Complete isolation of load from mains disturbances</li>
                <li className="pl-1">Highest level of protection — the gold standard for critical loads</li>
                <li className="pl-1">Higher cost, higher heat output, larger physical size</li>
                <li className="pl-1">Suitable for data centres, hospitals, financial systems, process control</li>
                <li className="pl-1">Typical ratings: 1 kVA to 1+ MVA (modular and parallel systems)</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The topology selection depends on the criticality of the load, the
              quality of the mains supply, the budget, and the acceptable level of risk. For truly critical
              loads where any power disturbance is unacceptable, online double-conversion is the only choice.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            UPS Sizing and Battery Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Correct UPS sizing ensures that the system can support the connected load and provide adequate
              autonomy during a mains failure. Undersizing leads to overload and potential failure; oversizing
              wastes capital expenditure and reduces efficiency. Battery selection and management is critical
              as batteries are the most failure-prone component in a UPS system.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Sizing Parameters</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Load survey:</strong> Measure or calculate the total load in kVA and kW (including power factor)</li>
                <li className="pl-1"><strong>Growth margin:</strong> Add 20-30% for future load growth</li>
                <li className="pl-1"><strong>Autonomy:</strong> Define the required battery runtime (e.g., 5, 10, 15 or 30 minutes)</li>
                <li className="pl-1"><strong>Redundancy:</strong> N+1 or 2N configurations for high-availability installations</li>
                <li className="pl-1"><strong>Efficiency:</strong> Consider UPS efficiency (typically 92-97% for modern online systems)</li>
                <li className="pl-1"><strong>Environment:</strong> Temperature, altitude and humidity affect battery performance</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">UPS Battery Types</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Design Life</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Advantages</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Disadvantages</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">VRLA (AGM)</td>
                      <td className="border border-white/10 px-3 py-2">3-5 yr / 10-12 yr</td>
                      <td className="border border-white/10 px-3 py-2">Maintenance-free, low cost, proven</td>
                      <td className="border border-white/10 px-3 py-2">Heavy, temperature-sensitive, shorter life</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">VRLA (Gel)</td>
                      <td className="border border-white/10 px-3 py-2">10-12 yr</td>
                      <td className="border border-white/10 px-3 py-2">Better deep-discharge tolerance</td>
                      <td className="border border-white/10 px-3 py-2">More expensive, lower charge rate</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lithium-ion</td>
                      <td className="border border-white/10 px-3 py-2">10-15+ yr</td>
                      <td className="border border-white/10 px-3 py-2">Lighter, longer life, faster recharge</td>
                      <td className="border border-white/10 px-3 py-2">Higher cost, requires BMS, disposal regulations</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Nickel-cadmium</td>
                      <td className="border border-white/10 px-3 py-2">15-25 yr</td>
                      <td className="border border-white/10 px-3 py-2">Extremely robust, wide temperature range</td>
                      <td className="border border-white/10 px-3 py-2">Very expensive, cadmium toxicity, being phased out</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Temperature Effect on Battery Life</p>
              <p className="text-sm text-white">
                Battery life is critically dependent on operating temperature. The Arrhenius equation governs
                the relationship: for every 10°C increase above the recommended 20°C, VRLA battery life is
                approximately halved. A battery room at 30°C will reduce a 5-year battery to approximately
                2.5 years. At 40°C, life drops to approximately 1.25 years. Maintaining correct battery
                room temperature through ventilation or air conditioning is one of the most cost-effective
                maintenance investments.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance tip:</strong> Always record battery room temperature during routine
              inspections. If the temperature consistently exceeds 25°C, escalate to facilities management
              for HVAC review. The cost of cooling is far less than premature battery replacement.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Bypass Systems and Monitoring
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Bypass systems are a critical safety feature of UPS installations, providing an alternative
              power path for the load when the UPS must be taken out of service for maintenance, or in
              the event of a UPS failure. Monitoring systems provide real-time visibility of UPS status,
              enabling proactive maintenance and rapid fault response.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Bypass Types</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Internal automatic bypass (static switch):</strong> Solid-state switch that transfers the load to mains if the inverter fails or is overloaded. Transfer is near-instantaneous (less than 1 ms). Part of the UPS electronics</li>
                <li className="pl-1"><strong>Internal maintenance bypass:</strong> Manual switch within the UPS that allows the load to be transferred to mains so the UPS can be serviced without disconnecting the load. Present in most commercial UPS systems</li>
                <li className="pl-1"><strong>External maintenance bypass (wrap-around):</strong> An external panel with a make-before-break switch that allows the entire UPS to be completely isolated while maintaining power to the load. Essential for safe battery replacement and major maintenance</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">UPS Monitoring Parameters</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Input:</strong> Voltage, current, frequency, power factor</li>
                <li className="pl-1"><strong>Output:</strong> Voltage, current, frequency, load percentage, power factor</li>
                <li className="pl-1"><strong>Battery:</strong> Voltage, current (charge/discharge), temperature, estimated remaining time</li>
                <li className="pl-1"><strong>Alarms:</strong> Mains failure, battery low, overload, bypass active, over-temperature, fan failure</li>
                <li className="pl-1"><strong>Communication:</strong> SNMP, Modbus, dry contacts, email alerts, BMS integration</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Never place the load on bypass and leave it unmonitored. While on
              bypass, the load is powered by raw, unprotected mains — a mains failure will cause an immediate
              loss of power to the critical load. Bypass operation should be planned, time-limited, and
              supervised.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Maintenance and Common Failure Modes
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              UPS preventive maintenance is essential to ensure reliability when a mains failure occurs.
              A UPS that has not been maintained may fail at the very moment it is needed most. The
              maintenance programme must cover batteries, power electronics, cooling, connections and
              firmware/software.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Preventive Maintenance Schedule</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Monthly:</strong> Visual inspection, check display parameters, check alarms, verify room temperature, check fan operation</li>
                <li className="pl-1"><strong>Quarterly:</strong> Record all operating parameters, check battery float voltages, thermal imaging of connections</li>
                <li className="pl-1"><strong>Annually:</strong> Full battery impedance test, load bank test (or mains-fail simulation), check capacitor condition, clean air filters, firmware updates, verify bypass operation</li>
                <li className="pl-1"><strong>3-5 yearly:</strong> Battery replacement (standard VRLA), capacitor replacement assessment, full service by manufacturer/specialist</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Failure Modes</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Battery failure:</strong> The most common cause of UPS failure. Batteries degrade with age and temperature. A single failed cell can reduce autonomy or prevent operation</li>
                <li className="pl-1"><strong>Capacitor failure:</strong> Electrolytic capacitors dry out over time, causing increased ripple, overheating and potential failure of power electronics</li>
                <li className="pl-1"><strong>Fan failure:</strong> Cooling fan failure leads to over-temperature condition and potential thermal shutdown</li>
                <li className="pl-1"><strong>Control board failure:</strong> Firmware bugs, component ageing or power surges can cause control board malfunction</li>
                <li className="pl-1"><strong>Loose connections:</strong> High-current connections can loosen over time due to thermal cycling, causing hot spots and potential arcing</li>
                <li className="pl-1"><strong>Overload:</strong> Additional loads connected without updating the UPS capacity assessment</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The maintenance technician standard requires competence in
              maintaining UPS systems as part of auxiliary power systems. You must be able to carry out
              routine inspections, identify common faults, and understand when to escalate to a specialist.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

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

        <section className="mb-10">
          <Quiz title="Test Your Knowledge" questions={quizQuestions} />
        </section>

        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section Overview
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section5-2">
              Next: Battery Technologies
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule3Section5_1;