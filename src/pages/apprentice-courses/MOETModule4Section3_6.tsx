import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Intermittent Faults and Environmental Factors - MOET Module 4 Section 3.6";
const DESCRIPTION = "Identifying intermittent faults and environmental influences on electrical equipment including temperature effects, moisture ingress, vibration, EMC interference and systematic approaches to elusive faults.";

const quickCheckQuestions = [
  {
    id: "intermittent-connection",
    question: "An intermittent fault that appears when ambient temperature rises but clears when the temperature drops is most likely caused by:",
    options: [
      "A software error in the control system",
      "Thermal expansion causing a marginal connection to open, or insulation resistance dropping with temperature",
      "The equipment being the wrong voltage rating",
      "Incorrect fuse rating"
    ],
    correctIndex: 1,
    explanation: "Temperature-dependent intermittent faults typically involve marginal connections where thermal expansion opens a barely-adequate joint, or insulation that is degraded to the point where its resistance drops below a critical threshold when warm. As the temperature drops, the connection remakes or the insulation resistance rises, and the fault disappears. These are classic symptoms of a dry joint or degraded insulation."
  },
  {
    id: "moisture-ingress",
    question: "An RCD trips repeatedly during damp weather but operates normally in dry conditions. The most likely cause is:",
    options: [
      "The RCD is faulty and needs replacing",
      "Moisture ingress into the wiring, accessories or equipment causing earth leakage current to exceed the RCD threshold",
      "The supply voltage is too high in damp weather",
      "The circuit is overloaded only during damp weather"
    ],
    correctIndex: 1,
    explanation: "Moisture is a conductor. When it enters wiring accessories, junction boxes, cable joints or equipment enclosures, it creates a leakage path between live conductors and earth. This leakage current, even if small, may exceed the 30 mA threshold of a Type A RCD. The fault clears as conditions dry out because the leakage path evaporates. Locating the point of ingress requires systematic testing during the damp period."
  },
  {
    id: "vibration-fault",
    question: "A machine fault that appears only when a nearby compressor is running suggests the cause may be:",
    options: [
      "The compressor drawing too much current from the same supply",
      "Vibration from the compressor causing a marginal connection or component to make intermittent contact",
      "The compressor producing excessive heat",
      "An earth fault in the compressor"
    ],
    correctIndex: 1,
    explanation: "Vibration-induced intermittent faults are common in industrial environments. Machinery vibration can cause loose terminations to intermittently open and close, relay contacts to bounce, connectors to make poor contact, and cracked solder joints to break and remake. The correlation with the compressor operation is the diagnostic clue — the fault timing matches the vibration source."
  },
  {
    id: "emc-interference",
    question: "A PLC input shows intermittent false signals that coincide with a nearby VSD starting a motor. The most likely cause is:",
    options: [
      "The PLC programme has a bug",
      "Electromagnetic interference (EMI) from the VSD coupling into the PLC input wiring",
      "The motor has a winding fault",
      "The PLC needs a firmware update"
    ],
    correctIndex: 1,
    explanation: "VSDs are significant sources of electromagnetic interference due to their high-frequency PWM switching. If the PLC input cables are not adequately screened, separated from power cables, or properly earthed, the electromagnetic noise can couple into the signal wiring and create false input signals. EMC mitigation includes screened cables, proper earthing of screens at one end, physical separation from power cables, and input filters."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The most challenging aspect of diagnosing intermittent faults is:",
    options: [
      "They always occur at the same time every day",
      "The fault may not be present when you arrive to investigate, making it difficult to observe and measure",
      "They only affect new equipment",
      "They are always caused by software errors"
    ],
    correctAnswer: 1,
    explanation: "Intermittent faults are notorious because they often disappear by the time the technician arrives. The fault conditions (temperature, vibration, humidity, load level) that trigger the fault may not be present during the investigation. This is why detailed operator information, data logging, and understanding of environmental triggers are essential for diagnosing intermittent faults."
  },
  {
    id: 2,
    question: "A data logger is a useful tool for intermittent fault diagnosis because it can:",
    options: [
      "Only measure voltage",
      "Continuously record electrical parameters over extended periods, capturing events that occur when no one is present",
      "Repair the fault automatically",
      "Only work when connected to a computer"
    ],
    correctAnswer: 1,
    explanation: "Data loggers record voltage, current, power, temperature and other parameters over hours, days or weeks. They capture the exact conditions at the moment a fault occurs — even if it happens at 3 AM on a Sunday. This timestamped data can then be correlated with environmental conditions, operational patterns and other events to identify the fault trigger."
  },
  {
    id: 3,
    question: "Condensation inside an electrical enclosure is most likely to occur when:",
    options: [
      "The ambient temperature is constant",
      "The ambient temperature drops below the dew point of the air inside the enclosure, typically during evening cooling after a warm day",
      "The enclosure is at maximum operating temperature",
      "The enclosure is brand new"
    ],
    correctAnswer: 1,
    explanation: "Condensation forms when the temperature of a surface drops below the dew point of the surrounding air. This commonly occurs when enclosures cool down overnight after being warmed during the day by the equipment inside them or by ambient conditions. Anti-condensation heaters are fitted to enclosures in vulnerable locations to maintain the internal temperature above the dew point."
  },
  {
    id: 4,
    question: "An IP65-rated enclosure should be protected against:",
    options: [
      "Submersion in water",
      "Dust ingress (total protection) and water jets from any direction",
      "Only light rain",
      "Dust only, not water"
    ],
    correctAnswer: 1,
    explanation: "IP (Ingress Protection) ratings have two digits: the first for solids, the second for liquids. IP65 means: 6 = total protection against dust ingress; 5 = protection against water jets from any direction. If moisture is found inside an IP65 enclosure, check for damaged seals, incorrectly fitted cable glands, missing blanking plugs, or cracks in the enclosure — the IP rating has been compromised."
  },
  {
    id: 5,
    question: "Harmonic distortion from non-linear loads such as VSDs and LED lighting can cause:",
    options: [
      "No problems in any installation",
      "Overheating of neutral conductors, transformer overheating, capacitor failure and nuisance tripping of protective devices",
      "Only cosmetic flickering of lights",
      "Problems only in high voltage systems"
    ],
    correctAnswer: 1,
    explanation: "Triplen harmonics (3rd, 9th, 15th) add in the neutral conductor of a three-phase system rather than cancelling, potentially causing neutral current to exceed phase current. Harmonics cause additional heating in transformers, can resonate with power factor correction capacitors causing premature failure, and may cause nuisance tripping of some types of circuit breakers and RCDs."
  },
  {
    id: 6,
    question: "When investigating an intermittent fault, the operator report states it happens 'about twice a week, usually on Monday mornings'. This timing pattern suggests:",
    options: [
      "The fault is random and unpredictable",
      "A thermal or environmental trigger related to the weekend shutdown — cold start, condensation from temperature cycling, or equipment warming up from cold",
      "The operator is causing the fault",
      "The equipment needs a software update on Mondays"
    ],
    correctAnswer: 1,
    explanation: "A Monday morning pattern strongly suggests a thermal or environmental trigger. Equipment that is warm during the working week cools over the weekend. Monday morning start-up subjects cold equipment to thermal shock, and condensation may have formed during the temperature cycling. Reduced load over the weekend may also allow insulation resistance to recover, only to fail again under full load on Monday."
  },
  {
    id: 7,
    question: "Cable route separation requirements in BS 7671 exist primarily to prevent:",
    options: [
      "Untidy installation",
      "Electromagnetic interference between power cables and data/signal cables",
      "Cables getting too warm",
      "Confusion during maintenance"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 Chapter 52 requires separation between power circuits and communication/data circuits to prevent electromagnetic interference. Power cables, especially those carrying distorted waveforms from VSDs, generate electromagnetic fields that can couple into nearby signal cables, causing data errors, false sensor readings and erratic control system behaviour. Physical separation, screening and crossed (not parallel) routing are the primary mitigation measures."
  },
  {
    id: 8,
    question: "A 'dry joint' in an electrical connection is characterised by:",
    options: [
      "A joint that has no moisture present",
      "A joint that appears mechanically intact but has high resistance due to poor metal-to-metal contact, oxidation or contamination",
      "A joint that was made without flux",
      "A joint that is too tight"
    ],
    correctAnswer: 1,
    explanation: "A dry joint (or high-resistance joint) looks connected but has inadequate metal-to-metal contact. The high resistance causes localised heating under load (I²R losses), which can cause intermittent behaviour — the joint may work when cool but fail when hot as thermal expansion opens the marginal contact further. Dry joints are a leading cause of electrical fires and intermittent faults."
  },
  {
    id: 9,
    question: "An anti-condensation heater in a motor control centre (MCC) should be:",
    options: [
      "Switched off when the MCC is energised",
      "Energised continuously (or thermostatically controlled) to maintain the enclosure temperature above the dew point",
      "Only used during summer months",
      "Connected to the same supply as the motor it protects"
    ],
    correctAnswer: 1,
    explanation: "Anti-condensation heaters should remain energised whenever there is a risk of condensation, which is typically when the equipment inside the enclosure is not generating enough heat to maintain the temperature above the dew point. Many are thermostatically controlled to energise when the temperature drops below a set point. They are particularly important during shutdowns, weekends and holiday periods when equipment is not running."
  },
  {
    id: 10,
    question: "Dust accumulation on electrical equipment can cause faults by:",
    options: [
      "Making the equipment look untidy",
      "Acting as thermal insulation (causing overheating), absorbing moisture (creating conductive paths), and bridging clearances between conductors",
      "Only affecting the aesthetic appearance",
      "Increasing the insulation resistance"
    ],
    correctAnswer: 1,
    explanation: "Dust is a significant environmental hazard for electrical equipment. It acts as thermal insulation, trapping heat and causing components to overheat. When damp, dust becomes conductive and can create leakage paths between live parts and earth, or between phases. Conductive dust (carbon, metal filings) can bridge clearances between conductors, causing tracking or flashover. Regular cleaning is an essential preventive maintenance task."
  },
  {
    id: 11,
    question: "To diagnose a fault that only occurs under heavy load, you would:",
    options: [
      "Wait for the fault to occur naturally and hope to be nearby",
      "Use data logging equipment to record electrical parameters during high-load periods, or arrange controlled load testing while monitoring the suspect circuit",
      "Replace all components in the circuit",
      "Reduce the load permanently to avoid the fault"
    ],
    correctAnswer: 1,
    explanation: "Load-dependent faults require investigation under the load conditions that trigger them. Data loggers can record continuously and capture the fault event automatically. Alternatively, if the process allows, arrange a controlled load test while monitoring voltage, current, temperature and other parameters at the suspect location. This focused approach is far more productive than waiting for a random occurrence."
  },
  {
    id: 12,
    question: "Voltage sags (dips) on an industrial supply are commonly caused by:",
    options: [
      "The electricity meter being incorrectly calibrated",
      "Large motor starting currents, heavy inductive loads switching, and supply network events affecting the local transformer",
      "Using energy-efficient lighting",
      "Having too many socket outlets on a circuit"
    ],
    correctAnswer: 1,
    explanation: "Voltage sags are short-duration reductions in supply voltage, typically caused by large current demands on the same supply network. DOL motor starts, electric arc furnaces, large welding equipment and heavy inductive load switching all cause voltage dips. These sags can cause VSD undervoltage trips, contactor dropout, and PLC resets if the equipment does not have adequate ride-through capability."
  }
];

const faqs = [
  {
    question: "How do I approach an intermittent fault that I cannot reproduce?",
    answer: "Start with a thorough investigation of the operator reports — look for patterns in timing, environmental conditions, load levels and correlations with other events. Inspect all connections in the affected circuit for signs of overheating, corrosion or looseness. Install data logging equipment to capture the next occurrence. Check environmental factors (temperature, humidity, vibration) and look for correlations. Sometimes a thorough visual inspection and re-making of all connections resolves the fault without identifying the specific cause."
  },
  {
    question: "What environmental factors should I check when investigating a fault?",
    answer: "Temperature (ambient, equipment, seasonal variation), humidity and moisture (condensation, water ingress, proximity to wet processes), dust and contamination (industrial processes, construction work, agricultural dust), vibration (nearby machinery, building works, traffic), electromagnetic interference (VSDs, welding, radio transmitters, power lines), and chemical exposure (corrosive atmospheres, cleaning chemicals, process chemicals). Any of these can cause or contribute to electrical faults."
  },
  {
    question: "How does IP rating relate to fault diagnosis?",
    answer: "The IP (Ingress Protection) rating tells you what level of protection an enclosure should provide against solid particles and water. If you find moisture or contamination inside an enclosure, compare what you find against the stated IP rating. If moisture is present inside an IP65 enclosure, something has compromised the sealing — look for damaged glands, missing blanking plugs, cracked housings or deteriorated gaskets. The IP rating gives you a benchmark for what should not be getting in."
  },
  {
    question: "What is EMC and why does it matter for fault finding?",
    answer: "EMC (Electromagnetic Compatibility) is the ability of equipment to function correctly in its electromagnetic environment without causing unacceptable interference to other equipment. In fault finding, EMC is relevant because electromagnetic interference can cause false signals, data corruption, erratic sensor readings and equipment malfunction. Common sources include VSDs, radio transmitters, welding equipment, and switched-mode power supplies. EMC-related faults are often intermittent and difficult to reproduce outside the affected environment."
  },
  {
    question: "Should I always re-make connections when investigating an intermittent fault?",
    answer: "Re-making connections is a practical and effective approach when a high-resistance or intermittent connection is suspected. It is good practice to clean the contact surfaces, apply appropriate contact treatment, and re-torque to the manufacturer's specification. However, be aware that this may 'fix' the fault without confirming the root cause. If the fault recurs, the underlying cause (vibration, thermal cycling, corrosion, undersized conductor) has not been addressed."
  }
];

const MOETModule4Section3_6 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 4.3.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Intermittent Faults and Environmental Factors
          </h1>
          <p className="text-white/80">
            Identifying intermittent faults and environmental influences on electrical equipment
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Intermittent:</strong> Faults that appear and disappear — temperature, vibration, load dependent</li>
              <li className="pl-1"><strong>Moisture:</strong> Condensation, ingress cause earth leakage, tracking, corrosion</li>
              <li className="pl-1"><strong>EMC:</strong> VSD noise, radio interference cause false signals in control circuits</li>
              <li className="pl-1"><strong>Data logging:</strong> Essential tool for capturing events when you are not present</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Maintenance Technician Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Pattern recognition:</strong> Timing, weather, load patterns provide diagnostic clues</li>
              <li className="pl-1"><strong>IP ratings:</strong> Benchmark for acceptable environmental protection</li>
              <li className="pl-1"><strong>Dry joints:</strong> Leading cause of intermittent faults and electrical fires</li>
              <li className="pl-1"><strong>ST1426:</strong> Environmental awareness is part of maintenance competence</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify the characteristics and common causes of intermittent electrical faults",
              "Recognise the effects of temperature, humidity and moisture on electrical equipment",
              "Diagnose vibration-induced faults in industrial environments",
              "Understand electromagnetic compatibility issues and their effect on control systems",
              "Apply data logging techniques to capture intermittent fault events",
              "Assess environmental conditions during fault investigation and recommend preventive measures"
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
            Understanding Intermittent Faults
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Intermittent faults are the most challenging category of faults that a maintenance technician will encounter. Unlike permanent faults — which are present whenever you test for them — intermittent faults appear and disappear, often seemingly at random. They are frustrating, time-consuming and can persist for weeks or months before being resolved. However, they are rarely truly random; almost all intermittent faults have a trigger, and identifying that trigger is the key to diagnosis.
            </p>
            <p>
              The most common triggers for intermittent faults are environmental: temperature changes, humidity and moisture levels, vibration, electromagnetic interference and load variation. By understanding these triggers and looking for patterns in when the fault occurs, you can narrow the search dramatically. The operator's description of the fault timing and conditions is your most valuable diagnostic tool for intermittent faults.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Categories of Intermittent Fault</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Temperature-dependent:</strong> Fault appears when equipment is hot (or cold) and clears when temperature changes — typically marginal connections or degraded insulation</li>
                <li className="pl-1"><strong>Moisture-dependent:</strong> Fault appears in damp or humid conditions and clears when dry — typically insulation leakage or tracking</li>
                <li className="pl-1"><strong>Vibration-dependent:</strong> Fault appears when nearby machinery is running — typically loose connections, cracked solder joints or relay contact bounce</li>
                <li className="pl-1"><strong>Load-dependent:</strong> Fault appears only under heavy load — typically marginal connections that develop high resistance under high current</li>
                <li className="pl-1"><strong>EMC-dependent:</strong> Fault appears when specific equipment operates — typically electromagnetic interference coupling into sensitive circuits</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">The Danger of Intermittent Faults</p>
              <p className="text-sm text-white">
                Intermittent faults are not just an inconvenience — they can be dangerous. A high-resistance connection that intermittently arcs is a fire risk. An intermittent earth fault that occasionally trips an RCD may progress to a permanent fault that exposes someone to electric shock. An intermittent control circuit fault may cause unexpected machine behaviour. Never dismiss an intermittent fault as "not important" — it is a fault that has not yet become permanent.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> When investigating an intermittent fault, your first priority is to understand the pattern. Ask: When does it happen? How often? What are the conditions? What else is happening at the time? Is there a correlation with time of day, weather, production schedule, or other equipment?
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Temperature, Moisture and Condensation Effects
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Temperature and moisture are the two most significant environmental factors affecting electrical equipment reliability. They influence insulation performance, connection integrity, component lifespan and the behaviour of protective devices. Understanding these effects is essential for diagnosing environmentally triggered faults and recommending preventive measures.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Temperature Effects</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Insulation resistance:</strong> Decreases as temperature increases — a circuit that passes IR testing when cold may fail when hot</li>
                <li className="pl-1"><strong>Conductor resistance:</strong> Increases with temperature — affects voltage drop and protective device operation</li>
                <li className="pl-1"><strong>Thermal expansion:</strong> Causes connections to work loose over time due to repeated heating and cooling cycles</li>
                <li className="pl-1"><strong>Component ratings:</strong> Most components are rated for a maximum ambient of 40 degrees C — exceeding this reduces capacity and lifespan</li>
                <li className="pl-1"><strong>Capacitor life:</strong> Electrolytic capacitor life halves for every 10 degrees C above rated temperature — VSDs in hot environments fail earlier</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Moisture and Condensation</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Earth leakage:</strong> Moisture creates conductive paths between live parts and earth, causing RCD tripping</li>
                <li className="pl-1"><strong>Tracking:</strong> Moisture on contaminated surfaces allows current to track along the surface, creating carbon paths that become permanently conductive</li>
                <li className="pl-1"><strong>Corrosion:</strong> Moisture accelerates corrosion of copper conductors, terminals and contacts, increasing resistance</li>
                <li className="pl-1"><strong>Condensation:</strong> Forms when equipment temperature drops below the dew point — particularly during cooling after shutdown</li>
                <li className="pl-1"><strong>IP protection:</strong> Enclosure IP ratings define the level of protection against water ingress — compromised seals allow moisture entry</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Seasonal and Weather Patterns</p>
              <p className="text-sm text-white">
                Some intermittent faults follow seasonal patterns. High humidity in summer causes insulation leakage. Cold winter mornings cause condensation in enclosures. Autumn rain increases moisture ingress. Spring pollen and agricultural dust contaminate ventilation systems. If a fault has a seasonal pattern, this is a powerful diagnostic clue pointing to an environmental root cause.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Preventive measures:</strong> Anti-condensation heaters, properly rated IP enclosures, correct cable gland selection, silica gel desiccant packs, ventilation management and regular enclosure seal inspection all reduce the risk of moisture-related faults.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Vibration, Dust and Physical Environment
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The physical environment in which electrical equipment operates has a direct impact on its reliability. Industrial environments subject equipment to vibration, dust, chemical exposure and physical damage that can cause or accelerate faults. Understanding these environmental stressors helps you identify root causes and recommend preventive measures that address the underlying environmental issue rather than just repairing the symptom.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Vibration Effects on Electrical Equipment</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Loose connections:</strong> Vibration works screw terminals loose over time, creating high-resistance joints</li>
                <li className="pl-1"><strong>Contact bounce:</strong> Relay and contactor contacts can momentarily open under vibration, causing erratic switching</li>
                <li className="pl-1"><strong>Solder joint failure:</strong> Cracked or fractured solder joints on PCBs are a classic vibration-induced fault</li>
                <li className="pl-1"><strong>Cable fatigue:</strong> Cables in vibrating environments develop conductor fractures, especially at termination points</li>
                <li className="pl-1"><strong>Component fatigue:</strong> Repeated vibration causes mechanical fatigue in mounting brackets, DIN rail clips and busbar connections</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Dust and Contamination</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Thermal insulation:</strong> Dust accumulation on heatsinks, ventilation grilles and component surfaces reduces cooling effectiveness</li>
                <li className="pl-1"><strong>Conductive contamination:</strong> Metal dust, carbon dust and certain chemical deposits are electrically conductive and can bridge clearances</li>
                <li className="pl-1"><strong>Moisture absorption:</strong> Hygroscopic dust absorbs atmospheric moisture, creating conductive surface films</li>
                <li className="pl-1"><strong>Mechanical interference:</strong> Dust can jam moving parts such as relay armatures, switch mechanisms and fan bearings</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> When a fault recurs after repair, always consider whether an environmental factor is causing the recurrence. Replacing a component that failed due to vibration-induced fatigue without addressing the vibration will result in the replacement failing in the same way. Root cause analysis must include the operating environment.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Electromagnetic Compatibility and Power Quality
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electromagnetic compatibility (EMC) is an increasingly important consideration in modern electrical installations. The proliferation of electronic switching equipment — particularly variable speed drives, switched-mode power supplies and LED lighting — has created a more hostile electromagnetic environment. EMC-related faults are often intermittent, difficult to diagnose, and may require specialist instrumentation such as power quality analysers and oscilloscopes to identify.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common EMC Issues in Electrical Maintenance</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Issue</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Source</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Effect</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Conducted noise</td>
                      <td className="border border-white/10 px-3 py-2">VSDs, SMPS, LED drivers</td>
                      <td className="border border-white/10 px-3 py-2">RCD nuisance tripping, meter errors, capacitor failure</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Radiated noise</td>
                      <td className="border border-white/10 px-3 py-2">VSD output cables, welding, radio transmitters</td>
                      <td className="border border-white/10 px-3 py-2">False PLC inputs, sensor errors, communication faults</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Voltage transients</td>
                      <td className="border border-white/10 px-3 py-2">Inductive load switching, lightning, supply events</td>
                      <td className="border border-white/10 px-3 py-2">Equipment damage, data loss, PLC resets</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Harmonic distortion</td>
                      <td className="border border-white/10 px-3 py-2">VSDs, UPS, LED lighting, IT loads</td>
                      <td className="border border-white/10 px-3 py-2">Neutral overheating, transformer overheating, capacitor failure</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">EMC Mitigation Measures</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Cable segregation:</strong> Maintain physical separation between power and signal cables as specified in BS 7671 Chapter 52</li>
                <li className="pl-1"><strong>Screened cables:</strong> Use screened (shielded) cables for signal and communication wiring, with screens correctly earthed</li>
                <li className="pl-1"><strong>EMC filters:</strong> Fit input and output filters to VSDs as recommended by the manufacturer</li>
                <li className="pl-1"><strong>Ferrite cores:</strong> Fit ferrite suppressors on signal cables near sensitive equipment to attenuate high-frequency noise</li>
                <li className="pl-1"><strong>Earthing:</strong> Ensure a clean, low-impedance earth system — essential for EMC and for safety</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Diagnostic clue:</strong> If a fault coincides with the operation of specific equipment (VSD starting, welder operating, process changing), EMC interference should be considered. Try to correlate the fault timing with the operating state of nearby equipment. A power quality analyser or oscilloscope can confirm the presence of interference.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Data Logging and Systematic Intermittent Fault Diagnosis
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              When an intermittent fault cannot be observed directly, data logging becomes an essential diagnostic tool. Modern data loggers can record electrical parameters (voltage, current, power, frequency, harmonics) and environmental conditions (temperature, humidity) continuously for days or weeks, capturing the exact conditions at the moment the fault occurs. This data transforms an elusive, frustrating problem into a tangible, analysable event.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Data Logging Strategy</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Define what to measure:</strong> Based on the suspected fault type — voltage for supply issues, current for overload/imbalance, temperature for thermal faults, humidity for moisture faults</li>
                <li className="pl-1"><strong>Set trigger thresholds:</strong> Configure the logger to flag events when parameters exceed normal limits — this highlights the significant events in weeks of data</li>
                <li className="pl-1"><strong>Record the context:</strong> Log environmental data alongside electrical data so you can correlate fault events with conditions</li>
                <li className="pl-1"><strong>Maintain an event diary:</strong> Ask operators to note when the fault occurs (date, time, conditions) alongside the data logger record</li>
                <li className="pl-1"><strong>Analyse for patterns:</strong> Look for correlations between fault events and time of day, day of week, weather, load patterns or other equipment operation</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Data Logging Is Essential</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Faults occurring outside working hours</li>
                  <li className="pl-1">Faults with no clear pattern</li>
                  <li className="pl-1">Supply quality suspected</li>
                  <li className="pl-1">Suspected harmonic issues</li>
                  <li className="pl-1">Multiple possible causes</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Practical Diagnostic Steps</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Gather all operator reports and identify any pattern</li>
                  <li className="pl-1">Inspect all connections for signs of overheating</li>
                  <li className="pl-1">Check environmental conditions at the equipment</li>
                  <li className="pl-1">Install data loggers on suspect circuits</li>
                  <li className="pl-1">Correlate logged data with fault events</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Intermittent faults test your patience and professionalism. Resist the temptation to make speculative replacements hoping the fault will go away. A systematic, evidence-based approach — even if it takes longer initially — is the only reliable path to a permanent solution. Document every observation and test result; this record often reveals the pattern that leads to the diagnosis.
            </p>
          </div>
        </section>

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
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Intermittent Fault Triggers</p>
                <ul className="space-y-0.5">
                  <li>Temperature — thermal expansion, insulation degradation</li>
                  <li>Moisture — earth leakage, tracking, corrosion</li>
                  <li>Vibration — loose connections, contact bounce</li>
                  <li>Load — high-resistance joints under current</li>
                  <li>EMC — interference from switching equipment</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key References</p>
                <ul className="space-y-0.5">
                  <li>BS 7671 Chapter 52 — Cable routing and separation</li>
                  <li>BS EN 60529 — IP rating classification</li>
                  <li>BS EN 61000 — EMC standards series</li>
                  <li>HSG85 — Safe working practices</li>
                  <li>ST1426 — Environmental awareness KSBs</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <Quiz title="Test Your Knowledge" questions={quizQuestions} />
        </section>

        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section3-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back: Control Circuit Faults
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section3-7">
              Next: Documentation of Faults
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default MOETModule4Section3_6;
