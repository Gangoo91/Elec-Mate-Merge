/**
 * MOET · Module 3 · Section 3.5 · Subsection 1 — Uninterruptible Power Supply (UPS)
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option. NOT ST0154 (the "MOET" the course is named after) —
 * ST0154 v1.6 is still live, but its own EPA plan records that the Electrical
 * Technician option "was retired 31/12/2025" and was replaced by ST1426
 * (single discipline) or ST1443 (dual discipline). The course keeps the MOET
 * name because that is what employers and colleges still call the role.
 *
 * KSBs covered, quoted rather than numbered — the published K/S/B
 * numbering is unverified, so never write a code here:
 *   · "Electrical. Electrical plant, equipment, and systems maintenance
 *     requirements: removing and replacing parts, inspecting, testing,
 *     setting up, adjusting, cleaning, and functional testing."
 *   · "Electrical. Principles of single phase and three-phase equipment,
 *     plant, and systems, the operation of motors and generators, and the
 *     use of monitoring and protection equipment."
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt.
 */

import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import {
  StudyPage,
  Bleed,
  ReadingProgress,
  TLDR,
  ConceptBlock,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Uninterruptible Power Supply (UPS) - MOET Module 3.5.1';
const DESCRIPTION =
  'Comprehensive guide to UPS systems for maintenance technicians: offline, line-interactive and online double-conversion topologies, sizing, battery types, bypass systems, maintenance procedures, monitoring and common failure modes under ST1426.';

const quickCheckQuestions = [
  {
    id: 'ups-topology',
    question:
      'Which UPS topology provides the highest level of power protection with zero transfer time?',
    options: [
      'Offline (standby) UPS',
      'Online double-conversion UPS',
      'Line-interactive UPS',
      'All topologies provide the same level of protection',
    ],
    correctIndex: 1,
    explanation:
      'Online double-conversion UPS provides the highest level of protection because the load is always powered from the inverter, which is continuously supplied by the rectifier/charger. There is zero transfer time because the load never experiences a switch from mains to battery — it is always on the inverter output. The rectifier converts AC to DC, and the inverter converts DC back to clean, regulated AC.',
  },
  {
    id: 'ups-sizing',
    question: 'When sizing a UPS, what two parameters must be determined?',
    options: [
      'Cable colour and circuit reference only',
      'Ambient humidity and floor loading',
      'kVA/kW rating and autonomy (runtime) required',
      'Earth loop impedance and prospective fault current',
    ],
    correctIndex: 2,
    explanation:
      'The two critical sizing parameters are: (1) the kVA/kW rating, which must be sufficient to support the total connected load, and (2) the autonomy (runtime), which is the time the UPS must support the load on battery power during a mains failure. The kVA rating is determined by the total load, and the autonomy is determined by the battery capacity.',
  },
  {
    id: 'ups-bypass',
    question: 'What is the purpose of the UPS bypass system?',
    options: [
      'To allow the load to be transferred to raw mains supply for UPS maintenance or in case of UPS failure',
      'To increase the autonomy time by adding extra battery banks in parallel',
      'To convert the UPS output from single-phase to three-phase for larger loads',
      'To regulate the charging current to the batteries during normal operation',
    ],
    correctIndex: 0,
    explanation:
      'The bypass system allows the load to be transferred directly to the raw mains supply, bypassing the UPS electronics. This is essential for two purposes: (1) maintenance bypass — allows the UPS to be completely de-energised for servicing while maintaining power to the load; and (2) automatic bypass — transfers the load to mains if the UPS inverter fails or is overloaded, preventing a complete power loss.',
  },
  {
    id: 'ups-battery-test',
    question:
      'How often should UPS batteries typically be tested under a preventive maintenance programme?',
    options: [
      'Only once, when the UPS is first commissioned',
      'Every five years, to coincide with battery replacement',
      'Only after a mains failure has occurred',
      'Annually, with more frequent checks for critical installations',
    ],
    correctIndex: 3,
    explanation:
      'UPS batteries should be tested at least annually as part of a preventive maintenance programme. Critical installations (data centres, hospitals) may require more frequent testing — quarterly or even monthly. Testing includes impedance testing of individual cells/blocks, visual inspection, temperature measurement, float voltage checks and periodic discharge testing.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'In an offline (standby) UPS, during normal mains operation, the load is powered by:',
    options: [
      'The inverter, which is continuously fed from the rectifier',
      'The raw mains supply, filtered by a basic surge suppressor',
      'The battery, which is trickle-charged from the mains',
      'An autotransformer that regulates the output voltage',
    ],
    correctAnswer: 1,
    explanation:
      'In an offline UPS, the load is powered directly from the mains supply during normal operation, with basic filtering and surge suppression. The inverter only activates when the mains fails, resulting in a brief transfer time (typically 5-12 ms). This is the simplest and cheapest UPS topology but provides the least protection.',
  },
  {
    id: 2,
    question: 'A line-interactive UPS improves on the offline topology by adding:',
    options: [
      'A second independent battery bank for redundancy',
      'A continuous double-conversion rectifier and inverter chain',
      'An autotransformer (AVR) that regulates voltage without switching to battery',
      'A static bypass that removes the need for batteries entirely',
    ],
    correctAnswer: 2,
    explanation:
      'A line-interactive UPS incorporates an autotransformer or buck-boost regulator that can adjust the output voltage without switching to battery operation. This allows the UPS to handle voltage sags and surges (within a range) without battery drain. Transfer to battery only occurs if the mains voltage falls outside the AVR correction range or fails completely.',
  },
  {
    id: 3,
    question: 'The power factor of a UPS load is important because:',
    options: [
      'It determines how long the batteries will last on a single charge',
      'It sets the transfer time between mains and battery operation',
      'It fixes the maximum ambient temperature the UPS can tolerate',
      'It affects the real power (kW) the UPS can deliver for a given kVA rating',
    ],
    correctAnswer: 3,
    explanation:
      'UPS systems are rated in kVA (apparent power) and kW (real power). The relationship is: kW = kVA x power factor. A 10 kVA UPS with a power factor of 0.8 can deliver 8 kW of real power. Modern UPS systems typically have a unity (1.0) power factor, meaning kVA = kW. Older UPS systems with 0.8 power factor deliver 20% less real power than their kVA rating suggests.',
  },
  {
    id: 4,
    question: 'VRLA batteries used in UPS systems stand for:',
    options: [
      'Valve Regulated Lead Acid',
      'Variable Resistance Lead Acid',
      'Voltage Regulated Lithium Alkaline',
      'Very Reliable Long-life Acid',
    ],
    correctAnswer: 0,
    explanation:
      'VRLA stands for Valve Regulated Lead Acid. These are sealed batteries with a pressure relief valve. They are maintenance-free (no electrolyte topping up required) and can be installed in any orientation. VRLA batteries include AGM (Absorbed Glass Mat) and gel types. They are the most common battery type in commercial UPS systems due to their reliability and lower maintenance requirements.',
  },
  {
    id: 5,
    question: 'What is the typical design life of VRLA batteries in a UPS system?',
    options: [
      '6-12 months (standard) or 2-3 years (long-life)',
      '3-5 years (standard) or 10-12 years (long-life)',
      '15-20 years (standard) or 25-30 years (long-life)',
      '1-2 years (standard) or 4-5 years (long-life)',
    ],
    correctAnswer: 1,
    explanation:
      'Standard VRLA batteries have a design life of 3-5 years, while long-life (Eurobat classified) VRLA batteries have a design life of 10-12 years. Actual life depends on operating temperature, charging regime and number of discharge cycles. For every 10°C above the recommended 20°C operating temperature, battery life is approximately halved (Arrhenius equation).',
  },
  {
    id: 6,
    question:
      'During UPS maintenance, what is the purpose of impedance testing individual battery blocks?',
    options: [
      'To measure the total kVA capacity of the UPS output',
      'To confirm the charging voltage is set to the correct float level',
      'To detect internal degradation that indicates a block approaching end of life',
      'To verify the cooling fans are maintaining the correct temperature',
    ],
    correctAnswer: 2,
    explanation:
      'Impedance testing measures the internal impedance of each battery block/cell. As a battery degrades, its internal impedance increases. By trending impedance values over time, it is possible to identify blocks that are approaching end of life before they fail during a mains outage. A block with impedance significantly higher than its baseline or its neighbours should be flagged for replacement.',
  },
  {
    id: 7,
    question: 'A UPS maintenance bypass switch (external wrap-around bypass) allows:',
    options: [
      'The batteries to be charged faster during recovery from an outage',
      'The output voltage to be stepped up for higher-power loads',
      'The internal static bypass to be disabled during normal running',
      'The entire UPS to be isolated while maintaining power to the critical load',
    ],
    correctAnswer: 3,
    explanation:
      'An external maintenance bypass switch (often called a wrap-around bypass) allows the entire UPS — including the internal electronics, bypass and batteries — to be completely isolated while the load continues to receive power directly from the mains. This is essential for safe UPS maintenance, repair and replacement without shutting down the critical load.',
  },
  {
    id: 8,
    question: 'Which environmental factor most significantly reduces UPS battery life?',
    options: [
      'Elevated ambient temperature',
      'Low relative humidity',
      'High altitude above sea level',
      'Background electromagnetic interference',
    ],
    correctAnswer: 0,
    explanation:
      'Elevated ambient temperature is the single most significant factor in reducing UPS battery life. The Arrhenius equation states that for every 10°C increase above the recommended 20°C, battery life is approximately halved. A battery rated for 5 years at 20°C may last only 2.5 years at 30°C. This is why battery rooms and UPS installations must be adequately ventilated or air-conditioned.',
  },
  {
    id: 9,
    question: 'UPS monitoring systems typically communicate using which protocol?',
    options: [
      'HDMI (High-Definition Multimedia Interface)',
      'SNMP (Simple Network Management Protocol) over Ethernet',
      'DALI (Digital Addressable Lighting Interface)',
      'PWM (Pulse Width Modulation) over a control pilot',
    ],
    correctAnswer: 1,
    explanation:
      'SNMP (Simple Network Management Protocol) over Ethernet is the standard communication protocol for UPS monitoring. It allows the UPS to send status information, alarms and events to a network management system (NMS) or building management system (BMS). Common SNMP parameters include input/output voltage, frequency, load percentage, battery status, temperature and alarm conditions.',
  },
  {
    id: 10,
    question: 'Capacitors in UPS systems require periodic replacement because:',
    options: [
      'They lose their colour coding and become hard to identify',
      'They increase in capacitance and overload the inverter',
      'Electrolytic capacitors dry out over time, leading to increased ripple and potential failure',
      'They absorb moisture and short the DC bus to earth',
    ],
    correctAnswer: 2,
    explanation:
      'Electrolytic capacitors (used in rectifiers, inverters and DC bus filtering) dry out over time as the electrolyte evaporates, particularly at elevated temperatures. This leads to increased ESR (equivalent series resistance), higher ripple current, and eventually capacitor failure. Preventive replacement of capacitors is typically recommended at 7-10 year intervals for critical UPS systems.',
  },
  {
    id: 11,
    question:
      'Lithium-ion batteries are increasingly being used in UPS systems because they offer:',
    options: [
      'Lower purchase cost than equivalent VRLA batteries',
      'The ability to operate without any battery management system',
      'Greater tolerance of deep discharge without any cell monitoring',
      'Longer life, higher energy density and better high-temperature performance',
    ],
    correctAnswer: 3,
    explanation:
      'Lithium-ion batteries offer several advantages over VRLA for UPS applications: 2-3x longer life (10-15+ years), 3x higher energy density (smaller and lighter), better performance at elevated temperatures, faster recharge times, and integrated BMS for cell-level monitoring. The higher purchase cost is offset by the longer life and reduced replacement frequency.',
  },
  {
    id: 12,
    question:
      'A common failure mode in UPS systems is the fan failure. What is the consequence of a failed cooling fan?',
    options: [
      'Overheating of power electronics, leading to thermal shutdown or component failure',
      'An immediate increase in the available autonomy time',
      'A change in the output voltage from 230 V to 110 V',
      'Automatic transfer of the load to the battery for protection',
    ],
    correctAnswer: 0,
    explanation:
      'UPS power electronics (rectifier, inverter, IGBT modules) generate significant heat during operation. Cooling fans are essential to maintain safe operating temperatures. If a fan fails, internal temperatures will rise, potentially triggering a thermal alarm and automatic shutdown, or causing premature failure of capacitors, IGBTs and other heat-sensitive components. Fan replacement is a routine preventive maintenance task.',
  },
];

const faqs = [
  {
    question: 'How do I know when UPS batteries need replacing?',
    answer:
      'Key indicators include: the UPS reports a battery fault or reduced autonomy alarm; impedance testing shows a significant increase from baseline values; the batteries are approaching or have exceeded their design life (3-5 years for standard VRLA); a discharge test shows reduced runtime; visual inspection reveals swollen or leaking battery cases; or the battery room temperature has been consistently above 25°C, which accelerates degradation. Trending impedance data over time is the most reliable predictive method.',
  },
  {
    question: 'What is the difference between static and rotary UPS?',
    answer:
      'Static UPS uses solid-state electronics (rectifier, inverter, batteries) to provide uninterruptible power. Rotary UPS uses a motor-generator set with a flywheel to provide short-term energy storage and power conditioning. Some rotary systems also include battery or diesel backup for extended autonomy. Rotary UPS is typically used in large industrial and data centre applications where very high power ratings (>500 kVA) and excellent power conditioning are required.',
  },
  {
    question: 'What should I check during a routine UPS inspection?',
    answer:
      'A routine UPS inspection should include: reading and recording all display parameters (input/output voltage, current, frequency, load percentage, battery status); checking for alarms and events in the log; visual inspection of the UPS cabinet (cleanliness, fan operation, unusual noise or smell); checking battery room temperature; visual inspection of batteries (swelling, leaking, corrosion on terminals); checking the tightness of battery connections (thermal imaging is preferred); verifying the bypass switch position; and confirming the SNMP/BMS connection is active.',
  },
  {
    question: 'Can a UPS protect against all types of power disturbance?',
    answer:
      'An online double-conversion UPS protects against virtually all power disturbances: outages, sags, surges, spikes, frequency variations, harmonic distortion and electrical noise. Offline and line-interactive UPS provide protection against outages and some voltage disturbances but do not provide the same level of power conditioning. No UPS can protect against a sustained mains failure beyond its battery autonomy — for extended outages, a generator with automatic transfer switch is required.',
  },
  {
    question: 'What safety precautions are required when working on UPS batteries?',
    answer:
      'UPS batteries present significant hazards: DC shock risk (battery strings can be 200-700 V DC); arc flash risk (high short-circuit current from battery banks); chemical risk (acid electrolyte in lead-acid batteries, thermal runaway risk in lithium-ion); and hydrogen gas risk (flooded lead-acid batteries in ventilated rooms). Required precautions include: insulated tools, PPE (safety glasses, acid-resistant gloves, face shield for battery work), safe isolation procedures, battery disconnect before working on battery connections, and verification of ventilation in battery rooms.',
  },
];

const MOETModule3Section5_1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 3 · Section 3.5 · Subsection 1"
        title="Uninterruptible Power Supply (UPS)"
        backTo="/study-centre/apprentice/m-o-e-t-module3-section5"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            UPS topologies, sizing, battery types, bypass systems and maintenance.
          </p>

          <TLDR
            points={[
              'Offline: Simplest — load on raw mains, 5-12 ms transfer time.',
              'Line-interactive: AVR regulates voltage without battery use.',
              'Online double-conversion: Zero transfer time — highest protection.',
              'Batteries: VRLA (3-5 yr) or Li-ion (10-15 yr) — temperature critical.',
            ]}
          />

          <ConceptBlock title="Regulatory context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>BS EN 62040:</strong> UPS systems — performance and testing.
              </li>
              <li>
                <strong>BS 7671:</strong> Installation requirements for UPS systems.
              </li>
              <li>
                <strong>EAWR 1989:</strong> Safe working on UPS and battery systems.
              </li>
              <li>
                <strong>ST1426:</strong> Maintain and test auxiliary power systems.
              </li>
            </ul>
          </ConceptBlock>

          <LearningOutcomes
            outcomes={[
              'Describe offline, line-interactive and online double-conversion UPS topologies',
              'Explain UPS sizing in terms of kVA/kW rating and autonomy',
              'Compare VRLA and lithium-ion battery technologies for UPS applications',
              'Describe bypass systems including automatic and maintenance bypass',
              'Outline a UPS preventive maintenance programme including battery testing',
              'Identify common UPS failure modes and monitoring requirements',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>UPS topologies</ContentEyebrow>

          <ConceptBlock title="Three topologies, progressively higher protection at increasing cost and complexity">
            <p>
              An Uninterruptible Power Supply (UPS) provides conditioned, continuous electrical
              power to critical loads during mains supply disturbances including outages, voltage
              sags, surges, spikes, frequency variations and harmonic distortion. The three
              principal UPS topologies — offline, line-interactive and online double-conversion —
              offer progressively higher levels of protection at increasing cost and complexity.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Offline (standby) UPS">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Load powered directly from mains during normal operation.</li>
              <li>Basic surge suppression and filtering on the mains path.</li>
              <li>Inverter activates only when mains fails — transfer time 5-12 ms.</li>
              <li>Simplest topology, lowest cost, smallest physical size.</li>
              <li>Suitable for desktop PCs, home networking, non-critical loads.</li>
              <li>Does not condition the mains supply — passes through disturbances.</li>
              <li>Typical ratings: 300 VA to 1.5 kVA.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Line-interactive UPS">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Load powered from mains through an autotransformer (AVR).</li>
              <li>AVR regulates voltage sags and surges without battery discharge.</li>
              <li>Transfer to battery if mains falls outside AVR correction range — 2-4 ms.</li>
              <li>Better protection than offline at moderate cost increase.</li>
              <li>Suitable for network equipment, small servers, telecoms.</li>
              <li>Typical ratings: 500 VA to 5 kVA.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Online double-conversion UPS"
            onSite="Key point: the topology selection depends on the criticality of the load, the quality of the mains supply, the budget, and the acceptable level of risk. For truly critical loads where any power disturbance is unacceptable, online double-conversion is the only choice."
          >
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Load always powered from the inverter — zero transfer time.</li>
              <li>Rectifier converts mains AC to DC, charges batteries and feeds inverter.</li>
              <li>Inverter converts DC back to clean, regulated AC.</li>
              <li>Complete isolation of load from mains disturbances.</li>
              <li>Highest level of protection — the gold standard for critical loads.</li>
              <li>Higher cost, higher heat output, larger physical size.</li>
              <li>Suitable for data centres, hospitals, financial systems, process control.</li>
              <li>Typical ratings: 1 kVA to 1+ MVA (modular and parallel systems).</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Sizing and battery systems</ContentEyebrow>

          <ConceptBlock title="Correct sizing ensures the system supports the load and provides adequate autonomy">
            <p>
              Correct UPS sizing ensures that the system can support the connected load and provide
              adequate autonomy during a mains failure. Undersizing leads to overload and potential
              failure; oversizing wastes capital expenditure and reduces efficiency. Battery
              selection and management is critical as batteries are the most failure-prone component
              in a UPS system.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Sizing parameters">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Load survey:</strong> Measure or calculate the total load in kVA and kW
                (including power factor).
              </li>
              <li>
                <strong>Growth margin:</strong> Add 20-30% for future load growth.
              </li>
              <li>
                <strong>Autonomy:</strong> Define the required battery runtime (e.g., 5, 10, 15 or
                30 minutes).
              </li>
              <li>
                <strong>Redundancy:</strong> N+1 or 2N configurations for high-availability
                installations.
              </li>
              <li>
                <strong>Efficiency:</strong> Consider UPS efficiency (typically 92-97% for modern
                online systems).
              </li>
              <li>
                <strong>Environment:</strong> Temperature, altitude and humidity affect battery
                performance.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="UPS battery types">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Type</th>
                    <th className="py-2 pr-4 font-medium text-white">Design life</th>
                    <th className="py-2 pr-4 font-medium text-white">Advantages</th>
                    <th className="py-2 font-medium text-white">Disadvantages</th>
                  </tr>
                </thead>
                <tbody className="text-xs text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">VRLA (AGM)</td>
                    <td className="py-2 pr-4">3-5 yr / 10-12 yr</td>
                    <td className="py-2 pr-4">Maintenance-free, low cost, proven</td>
                    <td className="py-2">Heavy, temperature-sensitive, shorter life</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">VRLA (Gel)</td>
                    <td className="py-2 pr-4">10-12 yr</td>
                    <td className="py-2 pr-4">Better deep-discharge tolerance</td>
                    <td className="py-2">More expensive, lower charge rate</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Lithium-ion</td>
                    <td className="py-2 pr-4">10-15+ yr</td>
                    <td className="py-2 pr-4">Lighter, longer life, faster recharge</td>
                    <td className="py-2">Higher cost, requires BMS, disposal regulations</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">Nickel-cadmium</td>
                    <td className="py-2 pr-4">15-25 yr</td>
                    <td className="py-2 pr-4">Extremely robust, wide temperature range</td>
                    <td className="py-2">Very expensive, cadmium toxicity, being phased out</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock
            title="Temperature effect on battery life"
            onSite="Maintenance tip: always record battery room temperature during routine inspections. If the temperature consistently exceeds 25°C, escalate to facilities management for HVAC review. The cost of cooling is far less than premature battery replacement."
          >
            <p>
              Battery life is critically dependent on operating temperature. The Arrhenius equation
              governs the relationship: for every 10°C increase above the recommended 20°C, VRLA
              battery life is approximately halved. A battery room at 30°C will reduce a 5-year
              battery to approximately 2.5 years. At 40°C, life drops to approximately 1.25 years.
              Maintaining correct battery room temperature through ventilation or air conditioning
              is one of the most cost-effective maintenance investments.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Bypass systems and monitoring</ContentEyebrow>

          <ConceptBlock title="Bypass provides an alternative power path; monitoring gives real-time visibility">
            <p>
              Bypass systems are a critical safety feature of UPS installations, providing an
              alternative power path for the load when the UPS must be taken out of service for
              maintenance, or in the event of a UPS failure. Monitoring systems provide real-time
              visibility of UPS status, enabling proactive maintenance and rapid fault response.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Bypass types">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Internal automatic bypass (static switch):</strong> Solid-state switch that
                transfers the load to mains if the inverter fails or is overloaded. Transfer is
                near-instantaneous (less than 1 ms). Part of the UPS electronics.
              </li>
              <li>
                <strong>Internal maintenance bypass:</strong> Manual switch within the UPS that
                allows the load to be transferred to mains so the UPS can be serviced without
                disconnecting the load. Present in most commercial UPS systems.
              </li>
              <li>
                <strong>External maintenance bypass (wrap-around):</strong> An external panel with a
                make-before-break switch that allows the entire UPS to be completely isolated while
                maintaining power to the load. Essential for safe battery replacement and major
                maintenance.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="UPS monitoring parameters"
            onSite="Key point: never place the load on bypass and leave it unmonitored. While on bypass, the load is powered by raw, unprotected mains — a mains failure will cause an immediate loss of power to the critical load. Bypass operation should be planned, time-limited, and supervised."
          >
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Input:</strong> Voltage, current, frequency, power factor.
              </li>
              <li>
                <strong>Output:</strong> Voltage, current, frequency, load percentage, power factor.
              </li>
              <li>
                <strong>Battery:</strong> Voltage, current (charge/discharge), temperature,
                estimated remaining time.
              </li>
              <li>
                <strong>Alarms:</strong> Mains failure, battery low, overload, bypass active,
                over-temperature, fan failure.
              </li>
              <li>
                <strong>Communication:</strong> SNMP, Modbus, dry contacts, email alerts, BMS
                integration.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Maintenance and failure modes</ContentEyebrow>

          <ConceptBlock title="A UPS that has not been maintained may fail at the moment it is needed most">
            <p>
              UPS preventive maintenance is essential to ensure reliability when a mains failure
              occurs. A UPS that has not been maintained may fail at the very moment it is needed
              most. The maintenance programme must cover batteries, power electronics, cooling,
              connections and firmware/software.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Preventive maintenance schedule">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Monthly:</strong> Visual inspection, check display parameters, check alarms,
                verify room temperature, check fan operation.
              </li>
              <li>
                <strong>Quarterly:</strong> Record all operating parameters, check battery float
                voltages, thermal imaging of connections.
              </li>
              <li>
                <strong>Annually:</strong> Full battery impedance test, load bank test (or
                mains-fail simulation), check capacitor condition, clean air filters, firmware
                updates, verify bypass operation.
              </li>
              <li>
                <strong>3-5 yearly:</strong> Battery replacement (standard VRLA), capacitor
                replacement assessment, full service by manufacturer/specialist.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Common failure modes"
            onSite="ST1426 link: the maintenance technician standard requires competence in maintaining UPS systems as part of auxiliary power systems. You must be able to carry out routine inspections, identify common faults, and understand when to escalate to a specialist."
          >
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Battery failure:</strong> The most common cause of UPS failure. Batteries
                degrade with age and temperature. A single failed cell can reduce autonomy or
                prevent operation.
              </li>
              <li>
                <strong>Capacitor failure:</strong> Electrolytic capacitors dry out over time,
                causing increased ripple, overheating and potential failure of power electronics.
              </li>
              <li>
                <strong>Fan failure:</strong> Cooling fan failure leads to over-temperature
                condition and potential thermal shutdown.
              </li>
              <li>
                <strong>Control board failure:</strong> Firmware bugs, component ageing or power
                surges can cause control board malfunction.
              </li>
              <li>
                <strong>Loose connections:</strong> High-current connections can loosen over time
                due to thermal cycling, causing hot spots and potential arcing.
              </li>
              <li>
                <strong>Overload:</strong> Additional loads connected without updating the UPS
                capacity assessment.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Offline UPS: load on raw mains, inverter only activates on mains failure, 5-12 ms transfer time — lowest cost and protection.',
              'Line-interactive UPS: an autotransformer (AVR) corrects voltage sags and surges without switching to battery, 2-4 ms transfer time if it does switch.',
              'Online double-conversion UPS: the load is always on the inverter, so transfer time is zero — the standard for data centres, hospitals and process control.',
              'Standard VRLA batteries last 3-5 years, long-life VRLA 10-12 years, lithium-ion 10-15+ years — every 10°C above 20°C roughly halves VRLA life.',
              'Bypass has three forms: internal automatic (static switch, under 1 ms), internal maintenance bypass, and an external wrap-around bypass that isolates the whole UPS.',
              'UPS monitoring communicates over SNMP, reporting input/output voltage, frequency, load, battery status and alarms to a BMS or NMS.',
              'Battery failure is the leading cause of UPS failure — annual impedance testing and trending is the key predictive maintenance tool.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz title="Test Your Knowledge" questions={quizQuestions} />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module3-section5')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Back to section
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Section 3.5 hub
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module3-section5-2')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Battery Technologies
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule3Section5_1;
