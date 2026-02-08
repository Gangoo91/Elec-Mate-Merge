import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Battery Technologies and Maintenance - MOET Module 3.5.2";
const DESCRIPTION = "Comprehensive guide to battery technologies and maintenance for electrical maintenance technicians: lead-acid, lithium-ion, nickel-cadmium, battery characteristics, charging methods, impedance testing, load testing, thermal runaway, safety and disposal under ST1426.";

const quickCheckQuestions = [
  {
    id: "vrla-types",
    question: "What are the two main types of VRLA (Valve Regulated Lead Acid) battery?",
    options: [
      "Wet cell and dry cell",
      "AGM (Absorbed Glass Mat) and Gel",
      "Flooded and sealed",
      "Primary and secondary"
    ],
    correctIndex: 1,
    explanation: "The two main types of VRLA battery are AGM (Absorbed Glass Mat), where the electrolyte is absorbed into a fibreglass mat separator, and Gel, where the electrolyte is immobilised in a silica gel. Both are sealed and maintenance-free (no electrolyte topping up). AGM is the more common type in UPS and standby power applications due to lower cost and better high-rate discharge performance."
  },
  {
    id: "c-rate",
    question: "What does a battery C-rate of C/10 mean?",
    options: [
      "The battery is 10% charged",
      "The battery will discharge at a rate that depletes its full capacity in 10 hours",
      "The battery has 10 cells",
      "The battery is rated for 10 cycles"
    ],
    correctIndex: 1,
    explanation: "A C-rate of C/10 means the battery will discharge at a rate that depletes its full rated capacity in 10 hours. For a 100 Ah battery, C/10 = 10 A discharge current. C/1 would be 100 A (full discharge in 1 hour), and C/20 would be 5 A (full discharge in 20 hours). Higher C-rates (faster discharge) reduce the usable capacity due to the Peukert effect in lead-acid batteries."
  },
  {
    id: "impedance-testing",
    question: "What does an increasing trend in battery impedance readings indicate?",
    options: [
      "The battery is improving with age",
      "The battery is degrading internally and approaching end of life",
      "The battery charger is faulty",
      "The ambient temperature is too low"
    ],
    correctIndex: 1,
    explanation: "An increasing trend in battery impedance readings indicates internal degradation — drying out of the electrolyte, corrosion of the plates, sulphation, or physical damage. By trending impedance values over time, maintenance technicians can predict battery failure and schedule replacement before a critical outage occurs. A single impedance reading is less useful than the trend."
  },
  {
    id: "thermal-runaway",
    question: "What is thermal runaway in a battery?",
    options: [
      "The battery overheating during normal charging",
      "An uncontrolled exothermic reaction where increasing temperature causes increasing current, which causes further temperature rise",
      "The battery running out of charge faster than expected",
      "Heat loss from the battery to the environment"
    ],
    correctIndex: 1,
    explanation: "Thermal runaway is a dangerous condition where an increase in battery temperature causes an increase in charging current, which generates more heat, causing further temperature rise in a positive feedback loop. This can lead to battery swelling, venting of gases, melting and potentially fire or explosion. Thermal runaway can occur in both lead-acid and lithium-ion batteries, though the mechanisms differ."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A flooded lead-acid battery differs from a VRLA battery primarily because:",
    options: [
      "It uses a different electrolyte chemical",
      "It has liquid electrolyte that requires periodic topping up with distilled water",
      "It has a shorter lifespan",
      "It cannot be used in standby applications"
    ],
    correctAnswer: 1,
    explanation: "A flooded (vented) lead-acid battery has a liquid sulphuric acid electrolyte that covers the lead plates. During charging, water in the electrolyte is decomposed into hydrogen and oxygen gases, which vent to the atmosphere. The electrolyte level drops over time and must be topped up with distilled water. VRLA batteries recombine these gases internally, eliminating the need for topping up."
  },
  {
    id: 2,
    question: "The nominal voltage of a single lead-acid cell is approximately:",
    options: [
      "1.2 V",
      "2.0 V",
      "3.6 V",
      "12 V"
    ],
    correctAnswer: 1,
    explanation: "A single lead-acid cell has a nominal voltage of approximately 2.0 V (float voltage typically 2.25-2.30 V per cell). A 12 V battery contains 6 cells in series. A 48 V battery string contains 24 cells. Understanding cell voltages is essential for monitoring battery health — individual cell voltages that deviate significantly from the average indicate a problem."
  },
  {
    id: 3,
    question: "Lithium iron phosphate (LiFePO4) batteries are preferred for many stationary applications because:",
    options: [
      "They are the cheapest lithium-ion chemistry",
      "They offer excellent thermal stability and safety compared to other lithium-ion chemistries",
      "They have the highest energy density of all lithium-ion types",
      "They do not require a Battery Management System"
    ],
    correctAnswer: 1,
    explanation: "LiFePO4 (Lithium Iron Phosphate) is considered the safest lithium-ion chemistry for stationary applications. It has a very stable crystal structure that is resistant to thermal runaway, does not release oxygen during thermal decomposition (unlike NMC or NCA), and has a lower energy density — which is actually a safety advantage in stationary applications where weight and size are less critical."
  },
  {
    id: 4,
    question: "The Peukert effect describes the phenomenon where:",
    options: [
      "Batteries charge faster at higher temperatures",
      "The usable capacity of a lead-acid battery decreases at higher discharge rates",
      "Battery voltage increases as the battery ages",
      "Lithium-ion batteries perform better in cold conditions"
    ],
    correctAnswer: 1,
    explanation: "The Peukert effect states that the usable capacity of a lead-acid battery decreases as the discharge rate increases. A battery rated at 100 Ah at C/20 (5 A for 20 hours) may deliver only 60-70 Ah at C/1 (100 A for less than 1 hour). This is because at higher discharge rates, the chemical reaction cannot penetrate the full depth of the lead plates. The Peukert effect is much less pronounced in lithium-ion batteries."
  },
  {
    id: 5,
    question: "What gas is produced during the charging of flooded lead-acid batteries?",
    options: [
      "Carbon dioxide",
      "Hydrogen and oxygen (potentially explosive mixture)",
      "Nitrogen",
      "Methane"
    ],
    correctAnswer: 1,
    explanation: "During charging, particularly at higher voltages (equalising charge), flooded lead-acid batteries produce hydrogen and oxygen gases through electrolysis of the water in the electrolyte. Hydrogen is lighter than air and collects at ceiling level. A hydrogen concentration of 4% in air is explosive. This is why battery rooms must have adequate ventilation (natural or forced) and why naked flames, sparks and smoking are prohibited."
  },
  {
    id: 6,
    question: "Sulphation in a lead-acid battery is caused by:",
    options: [
      "Overcharging",
      "Prolonged storage in a discharged state or chronic undercharging",
      "Operating at too low a temperature",
      "Using the wrong electrolyte"
    ],
    correctAnswer: 1,
    explanation: "Sulphation occurs when lead sulphate crystals form on the battery plates and harden over time. This happens when a battery is left in a discharged state for prolonged periods or is chronically undercharged. The hardened sulphate crystals reduce the active plate area, increasing internal resistance and reducing capacity. In severe cases, sulphation is irreversible and the battery must be replaced."
  },
  {
    id: 7,
    question: "A Battery Management System (BMS) in a lithium-ion battery performs which critical function?",
    options: [
      "Increases the battery capacity",
      "Monitors and balances individual cell voltages, temperatures and currents to prevent unsafe conditions",
      "Converts DC to AC",
      "Provides emergency lighting"
    ],
    correctAnswer: 1,
    explanation: "A BMS monitors each cell's voltage, temperature and current in a lithium-ion battery. It prevents overcharge, over-discharge, overcurrent and over-temperature conditions that could lead to thermal runaway. It also balances cell voltages to ensure equal ageing across the string. A BMS failure can lead to dangerous conditions — which is why BMS health is a key maintenance check."
  },
  {
    id: 8,
    question: "During a battery load test, the purpose is to:",
    options: [
      "Charge the battery to maximum capacity",
      "Verify the battery can deliver its rated capacity under load conditions",
      "Measure the float voltage of each cell",
      "Test the battery charger output"
    ],
    correctAnswer: 1,
    explanation: "A load test (discharge test) verifies that the battery can deliver its rated capacity under real or simulated load conditions. The battery is discharged at a defined rate (typically the same rate used in the UPS application) and the time to reach the end-of-discharge voltage is measured. If the battery delivers less than 80% of its rated capacity, replacement should be planned."
  },
  {
    id: 9,
    question: "The float charge voltage for a VRLA battery is typically set at:",
    options: [
      "1.8 V per cell",
      "2.25-2.30 V per cell",
      "3.6 V per cell",
      "12.0 V per cell"
    ],
    correctAnswer: 1,
    explanation: "The float charge voltage for VRLA batteries is typically 2.25-2.30 V per cell at 20°C. This voltage maintains the battery in a fully charged state without overcharging. Higher float voltages cause excessive gassing, water loss and shortened life. Lower float voltages allow the battery to gradually self-discharge. Temperature compensation should be applied — typically -3 mV/°C per cell above 20°C."
  },
  {
    id: 10,
    question: "Under the WEEE Regulations, batteries must be:",
    options: [
      "Disposed of in general waste",
      "Returned to the original manufacturer only",
      "Collected separately and recycled through an approved compliance scheme",
      "Buried in landfill"
    ],
    correctAnswer: 2,
    explanation: "The Waste Batteries and Accumulators Regulations 2009 (implementing the EU Battery Directive) require that all batteries — industrial, automotive and portable — are collected separately and recycled through an approved compliance scheme. Lead-acid batteries have a well-established recycling infrastructure with high recovery rates. Lithium-ion and NiCd batteries require specialist processing due to the hazardous materials involved."
  },
  {
    id: 11,
    question: "A nickel-cadmium (NiCd) battery cell has a nominal voltage of approximately:",
    options: [
      "1.2 V",
      "2.0 V",
      "3.2 V",
      "3.7 V"
    ],
    correctAnswer: 0,
    explanation: "A single NiCd cell has a nominal voltage of approximately 1.2 V. NiCd batteries are extremely robust with excellent temperature tolerance (-40°C to +60°C), very long cycle life (up to 2,000+ cycles) and a design life of 15-25 years. However, their use is being restricted due to the toxicity of cadmium, and they are being replaced by NiMH and lithium-ion alternatives."
  },
  {
    id: 12,
    question: "What first-aid action should be taken if battery acid (sulphuric acid) contacts the skin?",
    options: [
      "Apply a dry bandage immediately",
      "Flush the affected area with copious amounts of clean water for at least 20 minutes",
      "Apply a neutralising agent (sodium bicarbonate) directly",
      "No action needed — it will evaporate"
    ],
    correctAnswer: 1,
    explanation: "If battery acid contacts the skin, the affected area should be flushed immediately with copious amounts of clean water for at least 20 minutes. Do not attempt to neutralise the acid with sodium bicarbonate on the skin as the reaction generates heat. Remove contaminated clothing carefully. If acid contacts the eyes, irrigate with clean water for at least 20 minutes and seek immediate medical attention. Report all acid exposure incidents."
  }
];

const faqs = [
  {
    question: "How long do UPS batteries actually last?",
    answer: "Standard VRLA batteries typically last 3-5 years in real-world conditions (20-25°C, well-maintained charger). Long-life VRLA batteries last 8-10 years. Lithium-ion batteries last 10-15+ years. Actual life is heavily dependent on ambient temperature — every 10°C above 20°C approximately halves the life. Other factors include charging regime, depth and frequency of discharge, and manufacturing quality. Always plan for replacement before end of life rather than waiting for failure."
  },
  {
    question: "What is the difference between impedance testing and load testing?",
    answer: "Impedance testing measures the internal impedance (resistance) of individual cells/blocks using a specialised instrument — it is non-disruptive and can be carried out while the battery is in service. Load testing (discharge testing) actually discharges the battery under a controlled load to verify capacity — it is disruptive and requires the battery to be taken out of service (or the UPS to be on bypass). Impedance testing is used for trending and early warning; load testing is the definitive test of capacity."
  },
  {
    question: "Can I mix old and new batteries in the same string?",
    answer: "Mixing old and new batteries in the same string is not recommended. The older batteries will have higher internal impedance and lower capacity, causing them to discharge more quickly and be subjected to deeper cycling. The newer batteries will be forced to compensate, leading to uneven ageing and potential overcharging of the older batteries. If individual blocks must be replaced, replace all blocks in the affected string to maintain balanced performance."
  },
  {
    question: "What PPE is required for battery maintenance?",
    answer: "Battery maintenance requires: safety glasses or goggles (acid splash protection); acid-resistant gloves (neoprene or nitrile); face shield (for work involving exposed electrolyte or making/breaking connections); insulated tools (to prevent short circuits across battery terminals); flame-retardant clothing (batteries can produce hydrogen gas); and safety boots. For large battery installations, an emergency eye wash station and spill kit should be available in the battery room."
  },
  {
    question: "What is an equalising charge and when is it used?",
    answer: "An equalising charge is a controlled overcharge applied to flooded lead-acid batteries to equalise the voltage and specific gravity across all cells. Over time, cells can drift apart in state of charge. The equalising charge brings all cells back to a fully charged condition and helps to reverse mild sulphation. Equalising charges are typically applied quarterly or when individual cell voltages vary by more than 0.05 V. VRLA batteries generally should not be equalised unless specifically recommended by the manufacturer."
  }
];

const MOETModule3Section5_2 = () => {
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
            <span>Module 3.5.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Battery Technologies and Maintenance
          </h1>
          <p className="text-white/80">
            Battery types, characteristics, testing methods, safety and disposal
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Lead-acid:</strong> 2.0 V/cell — flooded (maintenance) or VRLA (sealed)</li>
              <li className="pl-1"><strong>Lithium-ion:</strong> 3.2-3.7 V/cell — requires BMS, longer life</li>
              <li className="pl-1"><strong>Testing:</strong> Impedance trending, load testing, visual inspection</li>
              <li className="pl-1"><strong>Safety:</strong> Hydrogen gas, acid, arc flash, thermal runaway risks</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Regulatory Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>BS EN 50272:</strong> Safety for stationary batteries</li>
              <li className="pl-1"><strong>WEEE Regs:</strong> Battery disposal and recycling requirements</li>
              <li className="pl-1"><strong>EAWR 1989:</strong> Safe working on battery systems</li>
              <li className="pl-1"><strong>ST1426:</strong> Maintain auxiliary power systems including batteries</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Compare lead-acid, lithium-ion and nickel-cadmium battery technologies",
              "Explain battery characteristics including voltage, capacity, C-rate and cycle life",
              "Describe charging methods including float, boost and equalising charges",
              "Carry out impedance testing and load testing procedures",
              "Identify thermal runaway risks and implement safety precautions",
              "Explain battery disposal requirements under WEEE and hazardous waste regulations"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Battery Technologies Overview
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Batteries are the energy storage backbone of standby power systems, emergency lighting,
              UPS installations and increasingly renewable energy systems. Maintenance technicians must
              understand the characteristics, limitations and maintenance requirements of the principal
              battery technologies encountered in electrical installations.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Lead-Acid Battery Types</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Flooded (vented):</strong> Liquid electrolyte, requires topping up with distilled water, produces hydrogen gas during charging, needs ventilation, long life (15-20 years), low cost per Ah for large installations</li>
                <li className="pl-1"><strong>VRLA-AGM:</strong> Electrolyte absorbed in glass mat separator, sealed, maintenance-free, recombines gases internally, 3-12 year design life, most common in UPS and telecoms</li>
                <li className="pl-1"><strong>VRLA-Gel:</strong> Electrolyte immobilised in silica gel, sealed, better deep-discharge tolerance than AGM, 10-12 year design life, used in cyclic applications and solar storage</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Lithium-Ion Battery Types</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>LiFePO4 (Lithium Iron Phosphate):</strong> 3.2 V/cell nominal. Safest Li-ion chemistry, excellent thermal stability, 3,000-5,000+ cycle life, 10-15+ year design life. Preferred for stationary applications</li>
                <li className="pl-1"><strong>NMC (Nickel Manganese Cobalt):</strong> 3.7 V/cell nominal. Higher energy density than LiFePO4 but less thermally stable. Common in EV batteries and some commercial storage systems</li>
                <li className="pl-1"><strong>LTO (Lithium Titanate):</strong> 2.4 V/cell nominal. Extremely fast charging, 15,000+ cycle life, operates at low temperatures, very safe but lower energy density and higher cost</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Nickel-Cadmium (NiCd)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">1.2 V/cell nominal. Extremely robust — operates -40°C to +60°C</li>
                <li className="pl-1">15-25 year design life, 2,000+ cycle life</li>
                <li className="pl-1">Excellent high-rate discharge performance</li>
                <li className="pl-1">Used in critical standby applications (substations, telecoms, railway)</li>
                <li className="pl-1">Being phased out due to cadmium toxicity (EU Battery Directive restrictions)</li>
                <li className="pl-1">Replaced by NiMH and LiFePO4 in new installations</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Battery selection depends on the application requirements: cycle
              life, operating temperature range, required autonomy, space and weight constraints, safety
              requirements and total cost of ownership (not just purchase price).
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Battery Characteristics and Charging
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding battery characteristics is essential for correct sizing, charging, monitoring
              and maintenance. The key parameters — voltage, capacity, C-rate, cycle life and charging
              regime — directly affect the performance and longevity of the battery system.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Battery Parameters</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Parameter</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Unit</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Nominal voltage</td>
                      <td className="border border-white/10 px-3 py-2">V</td>
                      <td className="border border-white/10 px-3 py-2">Average voltage during discharge (e.g., 2.0 V/cell lead-acid)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Capacity</td>
                      <td className="border border-white/10 px-3 py-2">Ah</td>
                      <td className="border border-white/10 px-3 py-2">Charge the battery can deliver at a specified C-rate (e.g., 100 Ah at C/10)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">C-rate</td>
                      <td className="border border-white/10 px-3 py-2">C/n</td>
                      <td className="border border-white/10 px-3 py-2">Discharge rate relative to capacity (C/10 = 10 hr, C/1 = 1 hr)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Cycle life</td>
                      <td className="border border-white/10 px-3 py-2">Cycles</td>
                      <td className="border border-white/10 px-3 py-2">Number of charge/discharge cycles to 80% capacity at specified DOD</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">DOD (Depth of Discharge)</td>
                      <td className="border border-white/10 px-3 py-2">%</td>
                      <td className="border border-white/10 px-3 py-2">Percentage of capacity used per cycle (deeper DOD = shorter cycle life)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Self-discharge</td>
                      <td className="border border-white/10 px-3 py-2">%/month</td>
                      <td className="border border-white/10 px-3 py-2">Rate of capacity loss when idle (lead-acid ~3-5%, Li-ion ~1-2%)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Charging Methods</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Float charge:</strong> Continuous low-voltage charge (2.25-2.30 V/cell for VRLA) that maintains the battery at full charge. Standard for standby applications (UPS, emergency lighting)</li>
                <li className="pl-1"><strong>Boost (fast) charge:</strong> Higher voltage charge (2.35-2.40 V/cell) applied after a discharge event to restore the battery to full charge more quickly. Time-limited to prevent overcharging</li>
                <li className="pl-1"><strong>Equalising charge:</strong> Controlled overcharge (2.35-2.40 V/cell) for flooded lead-acid batteries to equalise cell voltages and reverse mild sulphation. Applied periodically</li>
                <li className="pl-1"><strong>CC-CV (Constant Current - Constant Voltage):</strong> Standard lithium-ion charging profile. Charges at constant current until voltage limit is reached, then switches to constant voltage until current tapers to a low level</li>
                <li className="pl-1"><strong>Temperature compensation:</strong> Float voltage is adjusted based on ambient temperature — typically -3 mV/°C per cell above 20°C for lead-acid</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance tip:</strong> Incorrect charging is a leading cause of premature battery failure.
              Verify charger output voltage is within the manufacturer's specification for the battery type
              and temperature. A charger set too high causes gassing and thermal runaway risk; too low causes
              sulphation and reduced capacity.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Battery Testing Methods
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Battery testing is the cornerstone of a preventive maintenance programme. Testing confirms
              that the battery system will perform when called upon and identifies degrading cells or
              blocks before they fail during a critical mains outage.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Testing Methods</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Visual inspection:</strong> Check for swollen cases, leaking electrolyte, corrosion on terminals, loose connections, damage to cables and trays. Record battery room temperature</li>
                <li className="pl-1"><strong>Float voltage measurement:</strong> Measure individual cell/block float voltages. All should be within ±0.05 V of the average. Significant deviation indicates a problem cell</li>
                <li className="pl-1"><strong>Impedance testing:</strong> Measure internal impedance of each cell/block using a handheld impedance tester. Trend values over time — increasing impedance indicates degradation</li>
                <li className="pl-1"><strong>Load (discharge) testing:</strong> Discharge the battery under a controlled load to verify actual capacity. The definitive test but disruptive — requires bypass or alternative power</li>
                <li className="pl-1"><strong>Conductance testing:</strong> Similar principle to impedance testing but measures conductance (inverse of impedance). Some instruments prefer this approach</li>
                <li className="pl-1"><strong>Thermal imaging:</strong> Infrared scan of battery connections and cells to identify hot spots caused by high-resistance joints or internally failing cells</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Interpreting Impedance Results</p>
              <p className="text-sm text-white">
                A single impedance reading has limited value — the power of impedance testing is in trending.
                Record baseline impedance values for each cell/block when the battery is new, and repeat at
                regular intervals (quarterly or annually). An impedance increase of more than 25% from baseline
                indicates significant degradation. An impedance increase of more than 50% from baseline indicates
                the cell/block is approaching end of life and should be flagged for replacement.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The 80% capacity rule: when a battery's actual capacity (measured
              by load test) drops below 80% of its rated capacity, it should be scheduled for replacement.
              Below 80%, degradation accelerates rapidly and failure can occur without warning.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Safety, Thermal Runaway and Disposal
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Battery systems present multiple hazards: electrical shock and arc flash from high-voltage
              DC strings, chemical hazards from acid electrolyte, explosive hydrogen gas generation, and
              the risk of thermal runaway particularly in lithium-ion systems. Safe working practices and
              proper disposal procedures are essential competencies for maintenance technicians.
            </p>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Thermal Runaway</p>
              <p className="text-sm text-white mb-3">
                Thermal runaway is an uncontrolled exothermic reaction that can lead to fire or explosion.
                The mechanisms differ between lead-acid and lithium-ion:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Lead-acid:</strong> Overcharging at elevated temperature causes increased current draw, which generates more heat, causing further current increase. Battery swells, vents acid vapour, and can melt the case</li>
                <li className="pl-1"><strong>Lithium-ion:</strong> Internal short circuit, overcharge, mechanical damage or external heat source triggers an exothermic decomposition of the cathode material. Temperatures can reach 500°C+. Venting of flammable gases, fire and cell-to-cell propagation can occur</li>
                <li className="pl-1"><strong>Prevention:</strong> Correct charging voltage, temperature compensation, BMS monitoring (Li-ion), adequate ventilation, regular inspection for swelling or hot spots</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Battery Room Safety Requirements (BS EN 50272)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Ventilation:</strong> Natural or forced ventilation to maintain hydrogen concentration below 1% (25% of LEL). Calculation based on battery type, charging current and room volume</li>
                <li className="pl-1"><strong>Signage:</strong> Warning signs — 'Battery Room', 'No Smoking', 'No Naked Flames', 'Acid — Wear PPE'</li>
                <li className="pl-1"><strong>Eye wash:</strong> Emergency eye wash station within the battery room or immediately adjacent</li>
                <li className="pl-1"><strong>Spill kit:</strong> Acid spill neutralising absorbent available</li>
                <li className="pl-1"><strong>Fire suppression:</strong> CO₂ or dry powder extinguisher (not water for lithium-ion battery fires)</li>
                <li className="pl-1"><strong>Access control:</strong> Restricted access to authorised and trained personnel only</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Battery Disposal</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Lead-acid:</strong> Classified as hazardous waste. Must be collected by an approved waste carrier and recycled. Lead recovery rates exceed 99%. Do not drain acid — transport batteries intact</li>
                <li className="pl-1"><strong>Lithium-ion:</strong> Classified as dangerous goods for transport (UN 3480/3481). Must be handled and transported by a trained and approved carrier. Specialist recycling required to recover lithium, cobalt, nickel and manganese</li>
                <li className="pl-1"><strong>Nickel-cadmium:</strong> Classified as hazardous waste due to cadmium content. Specialist recycling through an approved compliance scheme. Cadmium recovery is mandatory</li>
                <li className="pl-1"><strong>Documentation:</strong> Waste transfer notes (or consignment notes for hazardous waste) must be completed for every battery disposal</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The maintenance technician standard requires competence in
              maintaining battery systems safely, including awareness of hazards, use of appropriate PPE,
              testing procedures and waste disposal compliance.
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
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section5-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Prev: Uninterruptible Power Supply
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section5-3">
              Next: Emergency Generators
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default MOETModule3Section5_2;