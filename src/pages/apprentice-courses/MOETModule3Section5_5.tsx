import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Critical Load Management - MOET Module 3.5.5";
const DESCRIPTION =
  "Comprehensive guide to critical load management for electrical maintenance technicians: load prioritisation, demand management, power quality monitoring, load shedding strategies and emergency procedures under ST1426.";

/* ------------------------------------------------------------------ */
/*  Quick-check questions (4) — shown after each content section       */
/* ------------------------------------------------------------------ */
const quickCheckQuestions = [
  {
    id: "load-priority",
    question:
      "How are electrical loads typically categorised for critical load management?",
    options: [
      "By cable size",
      "Into priority tiers: life safety (highest — fire alarm, emergency lighting), critical (essential operations — IT, medical, process), essential (important but deferrable — HVAC, general lighting) and non-essential (lowest — convenience loads)",
      "By colour coding",
      "Alphabetically",
    ],
    correctIndex: 1,
    explanation:
      "Load categorisation creates a hierarchy for power management during emergencies. Life-safety loads (fire alarm, emergency lighting, smoke ventilation) have the highest priority and must never be shed. Critical loads (IT servers, medical equipment, essential process control) are maintained wherever possible. Essential loads (general HVAC, standard lighting) can be temporarily shed. Non-essential loads (vending machines, decorative lighting, non-critical heating) are shed first. This tiered approach ensures that when generator or supply capacity is limited, the most important loads continue to receive power.",
  },
  {
    id: "demand-response",
    question:
      "What is the purpose of automated load shedding during generator operation?",
    options: [
      "To test individual circuits",
      "To prevent the generator from being overloaded by automatically disconnecting non-essential loads when the total demand exceeds the generator's rated capacity",
      "To reduce noise",
      "To extend cable life",
    ],
    correctIndex: 1,
    explanation:
      "Generators typically have lower capacity than the normal mains supply. Automated load shedding disconnects pre-programmed non-essential loads when the generator is supplying the installation, keeping the total demand within the generator's rated capacity. Without load shedding, the generator could overload, causing voltage and frequency instability, overheating, and ultimately protective shutdown — leaving all loads without power including the critical ones the generator was installed to protect.",
  },
  {
    id: "power-monitoring",
    question:
      "What does a power quality analyser measure that is relevant to critical load management?",
    options: [
      "Only voltage",
      "Voltage, current, power factor, harmonics, voltage dips and swells, frequency variations and transient events — providing a comprehensive picture of the supply quality",
      "Only the electricity bill",
      "Only the cable temperature",
    ],
    correctIndex: 1,
    explanation:
      "Power quality analysers measure and record all parameters that affect the performance of sensitive equipment: voltage magnitude and waveform (detecting dips, swells, flicker, harmonics); current magnitude and waveform (detecting harmonic distortion, imbalance); power factor (real and apparent power); frequency stability; and transient events. This data is essential for diagnosing equipment malfunctions, sizing generators and UPS systems, and verifying that the installation meets the power quality requirements of sensitive loads.",
  },
  {
    id: "restoration-sequence",
    question:
      "Why must loads be restored in a controlled sequence after a power outage?",
    options: [
      "To test each circuit individually",
      "Simultaneous re-energisation causes massive inrush currents from motors, transformers and capacitors — potentially overloading the supply or generator and tripping protection devices, causing a second outage",
      "To reduce electricity costs",
      "It is not necessary — all loads can be switched on at once",
    ],
    correctIndex: 1,
    explanation:
      "When power is restored after an outage, motors draw 6-8 times their running current during starting, transformers draw magnetising inrush current, and capacitors charge rapidly. If all loads re-energise simultaneously, the combined inrush can be many times the normal running demand. This can cause: voltage collapse on the supply; generator stalling or protective shutdown; upstream MCBs or fuses tripping. Controlled restoration in stages (life safety first, then critical, then essential, then non-essential) with time delays between groups allows each group's inrush to subside before the next group is connected.",
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions (12) — end-of-page assessment                       */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question: "A load schedule for critical load management should include:",
    options: [
      "Only the total building load",
      "Every circuit listed with its connected load, diversity factor, demand load, priority category and the supply source (normal, essential, critical, life safety)",
      "Only motor loads",
      "Only lighting loads",
    ],
    correctAnswer: 1,
    explanation:
      "A comprehensive load schedule is the foundation of critical load management. Each circuit is listed with: connected load (the total rated power of all equipment on the circuit); diversity factor (the proportion of connected load expected to be in use simultaneously); demand load (connected load x diversity); priority category (life safety, critical, essential, non-essential); and which supply source/distribution board it is connected to. This schedule enables accurate generator sizing, load shedding programming and emergency power planning.",
  },
  {
    id: 2,
    question:
      "Diversity factor in load management calculations represents:",
    options: [
      "The number of different load types",
      "The ratio of actual maximum demand to the total connected load, accounting for the fact that not all loads operate simultaneously at full power",
      "The distance between loads",
      "The cable diversity",
    ],
    correctAnswer: 1,
    explanation:
      "Diversity recognises that not all connected loads operate simultaneously. For example, a building with 100 kW of connected lighting load may have a diversity factor of 0.7, meaning the actual maximum demand is 70 kW. BS 7671 Appendix 1 provides typical diversity factors for different installation types. Accurate diversity estimation is critical for generator sizing — overestimating diversity leads to an undersized generator; underestimating leads to an oversized (and inefficient) generator.",
  },
  {
    id: 3,
    question:
      "Power factor correction is important for critical load management because:",
    options: [
      "It changes the cable colours",
      "Poor power factor increases apparent power demand (kVA) for the same real power (kW), reducing the effective capacity of generators, UPS systems and distribution equipment",
      "It only affects the electricity bill",
      "It has no practical effect",
    ],
    correctAnswer: 1,
    explanation:
      "Power factor is the ratio of real power (kW) to apparent power (kVA). A power factor of 0.8 means that for every kW of real power, the system must supply 1.25 kVA of apparent power. Generators and UPS systems are rated in kVA, so poor power factor reduces the real power they can deliver. A 500 kVA generator at 0.8 PF delivers only 400 kW. Power factor correction (using capacitors or active PFC) improves this ratio, maximising the usable capacity of standby power equipment.",
  },
  {
    id: 4,
    question:
      "Harmonic distortion affects critical load management by:",
    options: [
      "Improving power quality",
      "Causing additional heating in cables, transformers and generators, reducing their effective capacity and potentially causing nuisance tripping of protection devices",
      "Reducing energy consumption",
      "Having no effect",
    ],
    correctAnswer: 1,
    explanation:
      "Harmonic currents (generated by non-linear loads such as VSDs, LED drivers, IT equipment and UPS rectifiers) cause additional heating in neutral conductors, transformers and generators beyond that caused by the fundamental frequency current. This derating can be significant — a generator supplying a high-harmonic load may need to be rated 30-50% larger than the kW demand suggests. Harmonics also cause nuisance tripping of RCDs and MCBs, equipment malfunction and communication interference.",
  },
  {
    id: 5,
    question:
      "During an emergency (generator operation with load shedding active), the maintenance technician must:",
    options: [
      "Switch off all loads",
      "Monitor the generator loading continuously, verify that all life-safety and critical loads are energised, confirm load shedding has disconnected the correct non-essential circuits, and be prepared to manually intervene if automatic systems fail",
      "Leave the building",
      "Wait for the power company to restore supply",
    ],
    correctAnswer: 1,
    explanation:
      "Active monitoring during emergency operation is essential: verify the generator is operating within its rated capacity (typically 75-80% continuous load); confirm all life-safety loads are energised (fire alarm, emergency lighting, smoke ventilation); verify critical loads are operational; confirm non-essential loads have been correctly shed; monitor voltage and frequency for stability; check generator fuel level and cooldown systems; and be prepared to manually shed additional loads or restart tripped circuits if the automatic system malfunctions.",
  },
  {
    id: 6,
    question:
      "A building management system (BMS) contributes to critical load management by:",
    options: [
      "Only controlling heating",
      "Providing centralised monitoring and control of all building services, enabling automated load shedding, demand limiting, scheduling of non-essential loads, and real-time power monitoring with alarm management",
      "Replacing the ATS",
      "Only monitoring fire alarms",
    ],
    correctAnswer: 1,
    explanation:
      "Modern BMS platforms integrate with the electrical distribution system to provide: real-time monitoring of power consumption by zone and system; automated load shedding sequences triggered by generator operation or demand limiting; scheduling of non-essential loads (shifting heavy loads to off-peak periods); trend analysis for demand forecasting; alarm management for power quality events; and integration with ATS, UPS and generator control systems. This centralised approach enables more sophisticated load management than standalone ATS controllers.",
  },
  {
    id: 7,
    question:
      "The maximum demand indicator (MDI) on a building's metering system shows:",
    options: [
      "The instantaneous power",
      "The highest average power demand recorded over any half-hour period since the MDI was last reset, which is used by the DNO for billing and supply capacity planning",
      "The total energy consumed",
      "The power factor",
    ],
    correctAnswer: 1,
    explanation:
      "Maximum demand (MD) is measured as the highest average kW or kVA over any 30-minute period (half-hourly maximum demand). This is the value used by DNOs and energy suppliers for demand charges and for assessing whether the building's agreed supply capacity (ASC) is adequate. If MD regularly approaches or exceeds the ASC, the DNO may require a supply upgrade. Monitoring MD trends helps maintenance technicians identify opportunities for demand reduction through load scheduling and power factor correction.",
  },
  {
    id: 8,
    question:
      "Selective coordination (discrimination) of protective devices in a critical power system ensures:",
    options: [
      "All devices trip simultaneously",
      "Only the device nearest to a fault operates, isolating the faulty circuit while maintaining supply to all other circuits — preventing a single fault from causing a total blackout",
      "The most expensive device trips first",
      "Devices operate in alphabetical order",
    ],
    correctAnswer: 1,
    explanation:
      "Selective coordination means that in the event of a fault, only the protective device immediately upstream of the fault operates, while all other devices remain closed. This prevents a fault on a single circuit from cascading to trip upstream devices and blacking out the entire installation. In critical power systems, cascade tripping can take down life-safety and critical loads due to a fault on a non-essential circuit. Discrimination is achieved through careful selection of device types, ratings and time-current characteristics.",
  },
  {
    id: 9,
    question:
      "Energy storage systems (batteries, flywheels) support critical load management by:",
    options: [
      "Replacing the generator entirely",
      "Providing ride-through power during the gap between mains failure and generator startup, peak shaving to reduce maximum demand charges, and frequency regulation to support power quality",
      "Only providing lighting",
      "Reducing cable sizes",
    ],
    correctAnswer: 1,
    explanation:
      "Energy storage serves multiple roles in critical load management: ride-through power — bridging the gap (typically 10-30 seconds) between mains failure and generator reaching stable output; peak shaving — discharging during peak demand periods to reduce the maximum demand and associated charges; frequency regulation — providing fast-responding power injection to stabilise frequency during load transients; and renewable integration — storing excess solar/wind generation for use during peak demand. Battery energy storage systems (BESS) are increasingly common in commercial and industrial installations.",
  },
  {
    id: 10,
    question:
      "A critical load audit for an existing building should assess:",
    options: [
      "Only the number of socket outlets",
      "Every load in the building: its power rating, priority category, current supply arrangement, and whether its supply and backup provision match its actual criticality",
      "Only the generator size",
      "Only the UPS capacity",
    ],
    correctAnswer: 1,
    explanation:
      "A critical load audit systematically evaluates every electrical load: power rating and demand; operational importance and consequence of failure; current supply arrangement (is it on a backed-up supply?); and whether its priority categorisation matches its actual criticality. Common findings include: truly critical loads on non-backed-up supplies; non-essential loads consuming backed-up supply capacity; and loads whose criticality has changed since the original installation. Regular audits ensure the critical power system remains aligned with the building's actual operational needs.",
  },
  {
    id: 11,
    question:
      "The generator sizing margin for a critical installation is typically:",
    options: [
      "Exactly equal to the calculated load",
      "20-30% above the calculated maximum demand of the loads it must supply, to allow for motor starting inrush, future load growth, power factor effects and the derating effect of harmonics",
      "50% below the total load",
      "100% above the total load",
    ],
    correctAnswer: 1,
    explanation:
      "Generator sizing must account for: the calculated demand of all loads it will supply (after diversity and load shedding); motor starting inrush currents (typically 6-8 times running current, causing transient overload); power factor effects (generator rated in kVA, loads consume kW); harmonic derating (non-linear loads require generator oversizing); and future load growth (typically 10-20% allowance). A margin of 20-30% above the calculated demand provides a safe operating point, typically loading the generator at 70-80% of its rated capacity.",
  },
  {
    id: 12,
    question: "Load restoration after a power outage should follow:",
    options: [
      "All loads switched on simultaneously",
      "A controlled sequence: life-safety loads first, then critical loads, then essential loads, with time delays between groups to prevent simultaneous inrush current from overloading the supply or generator",
      "Non-essential loads first",
      "No particular sequence",
    ],
    correctAnswer: 1,
    explanation:
      "Controlled load restoration prevents the massive inrush current surge that occurs when all loads are re-energised simultaneously. The sequence is: (1) life-safety loads (immediate); (2) critical loads (after 30-60 seconds); (3) essential loads (after 2-5 minutes); (4) non-essential loads (after 5-10 minutes). Time delays between groups allow motors and transformers to magnetise, capacitors to charge, and the supply to stabilise before the next group is connected. Simultaneous re-energisation can cause voltage collapse, generator stalling or upstream protection tripping.",
  },
];

/* ------------------------------------------------------------------ */
/*  FAQs (5)                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: "How do I create a load schedule for an existing building?",
    answer:
      "Survey every circuit: identify the connected load (from nameplate data or metering), measure actual demand (using a clamp meter or power logger over representative periods), determine the diversity factor, assign a priority category based on the consequence of power loss, and record the supply source. Use the building's distribution drawings as a starting point and verify against actual installation. Modern power monitoring systems can provide demand data by circuit automatically.",
  },
  {
    question:
      "What is the typical generator capacity vs total building load?",
    answer:
      "Generators are rarely sized for the total building load. Typically, the generator supplies only the essential and critical loads, which may be 30-50% of the total building demand. Non-essential loads are shed during generator operation. The generator is then sized at 120-130% of this reduced demand to allow for motor starting, future growth and derating factors. For very critical installations (hospitals, data centres), generator capacity may approach 80-100% of total load with redundant generators.",
  },
  {
    question:
      "How often should critical load management plans be reviewed?",
    answer:
      "Review the critical load management plan: after any significant change in building use or tenancy; after major electrical modifications; when new equipment is added to backed-up supplies; annually as part of preventive maintenance; and after any power outage event (to assess whether the plan worked as intended). Technology changes (e.g., LED lighting replacing fluorescent, new IT equipment) can significantly alter the load profile, making previous plans inaccurate.",
  },
  {
    question: "What is demand-side response (DSR)?",
    answer:
      "Demand-side response is the practice of reducing electricity consumption during peak demand periods in response to signals from the grid operator or energy supplier. Building operators can participate in DSR schemes by temporarily reducing non-essential loads during grid stress events, in exchange for financial incentives. For maintenance technicians, this means understanding which loads can be safely shed, for how long, and ensuring the automated systems that control DSR are correctly configured and maintained.",
  },
  {
    question: "How does power factor affect generator capacity?",
    answer:
      "A generator is rated in kVA (apparent power), but loads consume kW (real power). The relationship is kW = kVA x power factor. At a power factor of 0.8, a 500 kVA generator delivers only 400 kW. At a power factor of 0.95 (with correction), the same generator delivers 475 kW — an effective 19% increase in usable capacity. Installing power factor correction equipment on the generator-backed distribution can significantly improve the generator's ability to support critical loads without the cost of a larger generator.",
  },
];

/* ================================================================== */
/*  Component                                                          */
/* ================================================================== */
const MOETModule3Section5_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* ---- Sticky header ---- */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section Overview
            </Link>
          </Button>
        </div>
      </div>

      {/* ---- Main article ---- */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* ---- Header ---- */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Shield className="h-4 w-4" />
            <span>Module 3.5.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Critical Load Management
          </h1>
          <p className="text-white/80">
            Load prioritisation and management during emergency conditions for
            electrical systems
          </p>
        </header>

        {/* ---- Summary boxes ---- */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">
              In 30 Seconds
            </p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1">
                <strong>Priority tiers:</strong> Life safety, critical,
                essential, non-essential
              </li>
              <li className="pl-1">
                <strong>Load shedding:</strong> Automatic disconnection of
                non-essential loads
              </li>
              <li className="pl-1">
                <strong>Monitoring:</strong> Power quality, demand, harmonics,
                power factor
              </li>
              <li className="pl-1">
                <strong>Restoration:</strong> Controlled sequence to prevent
                inrush overload
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">
              Maintenance Context
            </p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1">
                <strong>Load audits:</strong> Regular review of load priorities
                and allocations
              </li>
              <li className="pl-1">
                <strong>Generator sizing:</strong> Must account for diversity, PF
                and harmonics
              </li>
              <li className="pl-1">
                <strong>Discrimination:</strong> Selective coordination prevents
                cascade tripping
              </li>
              <li className="pl-1">
                <strong>ST1426:</strong> Maps to electrical systems maintenance
                and operations KSBs
              </li>
            </ul>
          </div>
        </div>

        {/* ---- Learning outcomes ---- */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">
            What You Will Learn
          </h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Categorise electrical loads into priority tiers for emergency management",
              "Explain automated load shedding strategies and their implementation",
              "Describe the impact of power factor and harmonics on standby system capacity",
              "Apply controlled load restoration sequences after power outages",
              "Carry out critical load audits for existing installations",
              "Understand demand management and its role in building energy strategy",
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

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* ---- Section 01 ---- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Load Prioritisation and Classification
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective critical load management begins with understanding which
              loads matter most. In every building, from a hospital to an office
              block, electrical loads have different levels of importance. The
              consequence of losing power to a fire alarm panel is fundamentally
              different from losing power to a coffee machine. Categorising every
              load into a clear priority hierarchy enables rational decisions
              during power emergencies.
            </p>
            <p>
              The load schedule is the master document that records every
              circuit's priority classification. It must be comprehensive,
              accurate and regularly reviewed. Changes in building use, new
              equipment installations and evolving business requirements can all
              change a load's criticality over time.
            </p>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                Load Priority Categories
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">
                        Category
                      </th>
                      <th className="border border-white/10 px-3 py-2 text-left">
                        Definition
                      </th>
                      <th className="border border-white/10 px-3 py-2 text-left">
                        Examples
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">
                        Life Safety
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Must never be shed; legally required backup
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Fire alarm, emergency lighting, smoke ventilation,
                        sprinkler pumps
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">
                        Critical
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Essential for core operations; significant impact if lost
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        IT servers, medical equipment, security systems, lifts
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">
                        Essential
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Important but can be temporarily shed
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        General HVAC, standard lighting, refrigeration
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">
                        Non-essential
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Shed first; minimal operational impact
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Decorative lighting, vending, non-critical heating
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Life-safety loads are defined by
              legislation (BS 5839 for fire alarm, BS 5266 for emergency
              lighting, Building Regulations Approved Document B for smoke
              ventilation). These cannot be compromised regardless of the power
              situation.
            </p>
          </div>
        </section>

        {/* Quick check 1 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ---- Section 02 ---- */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Load Shedding and Demand Management
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Load shedding is the controlled disconnection of lower-priority
              loads to prevent overloading of a limited power source — typically
              a standby generator. It is implemented through a combination of
              automatic controls (programmed into the ATS or BMS) and manual
              intervention capabilities for maintenance technicians.
            </p>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">
                Load Shedding Implementation
              </h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Automatic:</strong> Pre-programmed contactors
                  controlled by the ATS or BMS disconnect non-essential circuits
                  when generator operation is detected
                </li>
                <li className="pl-1">
                  <strong>Stepped:</strong> Loads shed in stages — non-essential
                  first, then essential if generator loading exceeds threshold
                </li>
                <li className="pl-1">
                  <strong>Dynamic:</strong> Real-time monitoring of generator
                  loading triggers additional shedding if demand rises (e.g.,
                  large motor starts)
                </li>
                <li className="pl-1">
                  <strong>Manual override:</strong> Maintenance technicians can
                  manually shed or restore loads to manage unexpected conditions
                </li>
              </ul>
            </div>
            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">
                Generator Overload Protection
              </p>
              <p className="text-sm text-white">
                If the generator is overloaded beyond its rated capacity, it will
                experience voltage and frequency drop, overheating and ultimately
                protective shutdown. A generator shutdown during a mains failure
                leaves the entire installation without power — including
                life-safety systems. Load shedding is therefore not just an
                energy management tool; it is a safety system that protects the
                generator's ability to supply the most critical loads.
              </p>
            </div>
            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Test load shedding sequences during the
              monthly ATS test. Verify that the correct loads are shed, in the
              correct order, and that they restore correctly when normal supply
              returns.
            </p>
          </div>
        </section>

        {/* Quick check 2 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ---- Section 03 ---- */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Power Quality and Capacity Factors
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Critical load management is not just about having enough kilowatts
              — the quality of the power supply matters as much as the quantity.
              Poor power factor, harmonic distortion and voltage instability all
              reduce the effective capacity of generators and UPS systems, and
              can cause sensitive equipment to malfunction.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                  Power Factor Impact
                </h3>
                <p className="text-sm text-white">
                  A generator rated at 500 kVA delivers only 400 kW at a power
                  factor of 0.8. Installing power factor correction capacitors
                  to improve the PF to 0.95 increases the usable real power to
                  475 kW — a 19% improvement without changing the generator. For
                  critical installations, power factor correction on the
                  generator-backed distribution is a cost-effective way to
                  maximise standby power capacity.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                  Harmonic Derating
                </h3>
                <p className="text-sm text-white">
                  Non-linear loads (VSDs, LED drivers, IT power supplies)
                  generate harmonic currents that cause additional heating in
                  generators and transformers. A generator supplying a high
                  proportion of non-linear loads may need to be derated by
                  30-50%. Power quality monitoring during commissioning and
                  periodic reviews identifies harmonic issues before they cause
                  equipment failure or capacity shortfalls during emergencies.
                </p>
              </div>
            </div>
            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Power quality monitoring should be part
              of every critical load management programme. Understanding the
              actual power characteristics of the installation's loads enables
              accurate generator sizing and prevents capacity surprises during
              genuine emergencies.
            </p>
          </div>
        </section>

        {/* Quick check 3 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ---- Section 04 ---- */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Load Restoration and Emergency Procedures
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              How loads are restored after a power outage is as important as how
              they are managed during one. Uncontrolled simultaneous
              re-energisation can cause voltage collapse, generator overload or
              upstream protection tripping — potentially causing a second outage
              worse than the first.
            </p>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">
                Controlled Restoration Sequence
              </h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Stage 1 (immediate):</strong> Life-safety loads —
                  always connected, never shed
                </li>
                <li className="pl-1">
                  <strong>Stage 2 (30-60 seconds):</strong> Critical loads — IT,
                  medical, essential process
                </li>
                <li className="pl-1">
                  <strong>Stage 3 (2-5 minutes):</strong> Essential loads —
                  general HVAC, standard lighting
                </li>
                <li className="pl-1">
                  <strong>Stage 4 (5-10 minutes):</strong> Non-essential loads —
                  reconnected last
                </li>
              </ul>
              <p className="text-sm text-white mt-3">
                Time delays between stages allow motor inrush currents to
                subside, transformers to magnetise and the supply to stabilise
                before the next load group is connected.
              </p>
            </div>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">
                Emergency Procedures for Maintenance Technicians
              </h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  Know the load shedding and restoration sequence before an
                  emergency occurs
                </li>
                <li className="pl-1">
                  Have the load schedule readily accessible in the main switch
                  room
                </li>
                <li className="pl-1">
                  Know the manual override procedures for the ATS and load
                  shedding contactors
                </li>
                <li className="pl-1">
                  Understand the generator capacity limitations and the
                  consequences of overloading
                </li>
                <li className="pl-1">
                  Practice the restoration sequence during planned test events
                </li>
                <li className="pl-1">
                  Document all actions taken during emergency events for
                  post-event review
                </li>
              </ul>
            </div>
            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Under ST1426, maintenance technicians must
              understand emergency power systems and their operation. This
              includes load management, generator operation, ATS testing and
              controlled shutdown/startup procedures. Demonstrating competence in
              emergency procedures is part of the practical skills assessment.
            </p>
          </div>
        </section>

        {/* Quick check 4 */}
        <InlineCheck {...quickCheckQuestions[3]} />

        {/* ---- Section 05 ---- */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Critical Load Audits and Continuous Improvement
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A critical load management plan is not a static document -- it must
              evolve as the building's use, occupancy and electrical systems
              change. A critical load audit systematically evaluates every
              electrical load in the building, assessing whether its priority
              classification and supply arrangement match its actual operational
              importance. Buildings that have not been audited since original
              installation frequently have misallocated loads.
            </p>
            <p>
              Common audit findings include: truly critical IT equipment
              connected to non-backed-up supplies because it was installed after
              the original design; non-essential loads consuming valuable
              generator capacity because they were never disconnected from the
              essential distribution board; and load priorities that no longer
              reflect the building's current use. Regular audits identify these
              discrepancies and enable the critical power system to be realigned
              with actual operational needs.
            </p>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">
                Critical Load Audit Procedure
              </h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Step 1:</strong> Obtain the existing load schedule,
                  distribution drawings and single-line diagram
                </li>
                <li className="pl-1">
                  <strong>Step 2:</strong> Survey every circuit -- verify the
                  connected load, measure actual demand, and identify what
                  equipment is on each circuit
                </li>
                <li className="pl-1">
                  <strong>Step 3:</strong> Interview building operators and
                  department managers to understand the operational consequence
                  of losing power to each load
                </li>
                <li className="pl-1">
                  <strong>Step 4:</strong> Reclassify each load into the correct
                  priority tier based on current operational importance
                </li>
                <li className="pl-1">
                  <strong>Step 5:</strong> Compare the actual supply arrangement
                  (backed-up or non-backed-up) with the required priority
                  classification
                </li>
                <li className="pl-1">
                  <strong>Step 6:</strong> Identify loads that need to be moved
                  to backed-up supplies or removed from them
                </li>
                <li className="pl-1">
                  <strong>Step 7:</strong> Update the load schedule, generator
                  sizing calculation, and load shedding configuration
                </li>
              </ul>
            </div>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">
                Continuous Improvement Triggers
              </h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  Any significant change in building use or tenancy
                </li>
                <li className="pl-1">
                  Major electrical modification or new equipment installation
                </li>
                <li className="pl-1">
                  Annual review as part of the preventive maintenance programme
                </li>
                <li className="pl-1">
                  After any power outage event -- post-event review of what
                  worked and what failed
                </li>
                <li className="pl-1">
                  Technology changes affecting the load profile (e.g., LED
                  retrofit reducing lighting demand)
                </li>
                <li className="pl-1">
                  Regulatory changes affecting life-safety requirements
                </li>
              </ul>
            </div>
            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Under ST1426, maintenance technicians must
              demonstrate understanding of critical power systems and emergency
              procedures. This includes the ability to review load schedules,
              verify load priorities, and recommend improvements based on
              operational experience. The critical load audit process is a
              practical application of the knowledge, skills and behaviours
              assessed in the end-point assessment.
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
                  Load Priority Tiers
                </p>
                <ul className="space-y-0.5">
                  <li>Life safety -- fire alarm, emergency lighting</li>
                  <li>Critical -- IT, medical, security, lifts</li>
                  <li>Essential -- HVAC, standard lighting</li>
                  <li>Non-essential -- vending, decorative</li>
                  <li>Never shed life-safety loads</li>
                  <li>Shed non-essential first</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">
                  Capacity and Restoration
                </p>
                <ul className="space-y-0.5">
                  <li>PF 0.8: 500 kVA = only 400 kW</li>
                  <li>Harmonics: derate gen 30-50%</li>
                  <li>Generator margin: 20-30% above demand</li>
                  <li>
                    Restore: life safety, critical, essential, non-essential
                  </li>
                  <li>Time delays between restoration stages</li>
                  <li>Audit load schedule annually</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ---- Quiz ---- */}
        <section className="mb-10">
          <Quiz title="Test Your Knowledge" questions={quizQuestions} />
        </section>

        {/* ---- Navigation ---- */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section5-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Transfer Switches
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section5">
              Back to Section Overview
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default MOETModule3Section5_5;
