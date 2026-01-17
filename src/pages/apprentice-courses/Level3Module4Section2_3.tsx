/**
 * Level 3 Module 4 Section 2.3 - Clamp Meters and Thermal Imaging
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Clamp Meters and Thermal Imaging - Level 3 Module 4 Section 2.3";
const DESCRIPTION = "Learn to use clamp meters for current measurement and thermal imaging cameras to identify hot spots, overloaded circuits, and developing faults in electrical installations.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the primary advantage of a clamp meter over a standard multimeter for current measurement?",
    options: [
      "Clamp meters are more accurate",
      "Clamp meters can measure current without breaking the circuit",
      "Clamp meters can measure higher voltages",
      "Clamp meters are cheaper to purchase"
    ],
    correctIndex: 1,
    explanation: "Clamp meters measure current by detecting the magnetic field around a conductor using a current transformer. This allows measurement without disconnecting or breaking the circuit - essential for testing live installations safely and for ongoing monitoring without disruption to supplies."
  },
  {
    id: "check-2",
    question: "When using a clamp meter to measure the current in a single-core cable, what must you ensure?",
    options: [
      "The jaws are perpendicular to the cable",
      "Only one conductor is enclosed by the jaws",
      "The cable insulation is removed",
      "The circuit is isolated"
    ],
    correctIndex: 1,
    explanation: "The clamp must only enclose one conductor. If line and neutral are both inside the jaws (as with a twin cable), their magnetic fields cancel out and the reading will be approximately zero - only the earth leakage current would be measured, which is usually very small."
  },
  {
    id: "check-3",
    question: "A thermal image shows a significantly hotter terminal compared to others in the same distribution board. What does this likely indicate?",
    options: [
      "Normal operation - some variation is expected",
      "A high-resistance connection requiring investigation",
      "The terminal is correctly rated for the load",
      "The thermal camera needs calibration"
    ],
    correctIndex: 1,
    explanation: "Localised hot spots at terminals, connections, or devices often indicate high-resistance joints. Power dissipated at the resistance (P = I squared R) generates heat. This is a developing fault that could lead to fire if not remediated. Temperature differences of more than 10-15 degrees C above similar components warrant investigation."
  },
  {
    id: "check-4",
    question: "What is emissivity and why is it important in thermal imaging?",
    options: [
      "The brightness of the thermal camera display",
      "The ability of a surface to emit infrared radiation, affecting temperature accuracy",
      "The resolution of the thermal sensor",
      "The range of temperatures the camera can measure"
    ],
    correctIndex: 1,
    explanation: "Emissivity describes how efficiently a surface emits thermal radiation. Shiny metal surfaces have low emissivity and can give inaccurate temperature readings. Most thermal cameras require emissivity adjustment for accurate absolute temperature measurement. Relative temperature comparison is often more useful for fault finding."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A clamp meter placed around all conductors of a single-phase circuit (line, neutral, and CPC together) reads 45mA. What does this indicate?",
    options: [
      "The circuit is drawing 45mA load current",
      "There is approximately 45mA of earth leakage current",
      "The meter is faulty",
      "The circuit is overloaded"
    ],
    correctAnswer: 1,
    explanation: "With all conductors clamped together, the load current cancels out (line out equals neutral return). Any reading indicates imbalance - current not returning through neutral, i.e., earth leakage. 45mA exceeds the typical 30mA RCD threshold and would likely cause tripping. This technique is useful for identifying circuits with earth leakage."
  },
  {
    id: 2,
    question: "When would you use a DC clamp meter rather than an AC clamp meter?",
    options: [
      "For higher accuracy on mains circuits",
      "For measuring current in solar PV systems, battery installations, or DC control circuits",
      "Only for three-phase measurements",
      "When testing RCDs"
    ],
    correctAnswer: 1,
    explanation: "DC clamp meters use Hall-effect sensors rather than current transformers, enabling them to measure direct current. They're essential for solar PV systems, battery installations, UPS systems, DC lighting, and control circuits. Standard AC clamps cannot measure DC as there's no alternating magnetic field to detect."
  },
  {
    id: 3,
    question: "What is the benefit of using a flexible current probe compared to a rigid clamp meter?",
    options: [
      "Higher accuracy",
      "Lower cost",
      "Ability to wrap around large conductors or awkward spaces where rigid jaws won't fit",
      "Better for measuring voltage"
    ],
    correctAnswer: 2,
    explanation: "Flexible current probes (Rogowski coils) can wrap around busbars, large cables, or cables in tight spaces where rigid jaws can't reach. They're commonly used in distribution boards, panel enclosures, and for measuring current on large industrial cables or bundled conductors."
  },
  {
    id: 4,
    question: "A thermal imaging survey of a consumer unit shows all MCBs at similar temperatures except one which is 25 degrees C hotter than the others. What is the likely cause?",
    options: [
      "Faulty thermal camera",
      "Normal variation in MCB design",
      "The circuit is drawing proportionally higher current, or has a poor connection",
      "The MCB has recently been reset"
    ],
    correctAnswer: 2,
    explanation: "A significantly hotter MCB indicates either higher current (overloading or normal heavy use) or a poor connection generating excess heat. Compare the current reading with the MCB rating. If current is within normal limits, investigate the connections. Temperature differences over 10-15 degrees C are significant."
  },
  {
    id: 5,
    question: "Why might thermal imaging not detect a fault immediately after a circuit has been switched on?",
    options: [
      "Thermal cameras don't work on live circuits",
      "Thermal anomalies take time to develop as the circuit warms up under load",
      "The camera needs time to calibrate",
      "Electromagnetic interference affects the readings"
    ],
    correctAnswer: 1,
    explanation: "Thermal imaging detects heat generated by current flow. A cold circuit won't show hot spots until current has been flowing long enough to heat any resistive points. Best practice is to survey equipment that has been under typical load for at least 10-15 minutes, preferably during peak demand periods."
  },
  {
    id: 6,
    question: "What range of current can a typical earth leakage clamp meter measure?",
    options: [
      "100A to 1000A",
      "Microamps to milliamps (typically 0.001mA to 100mA)",
      "1A to 100A",
      "Only exactly 30mA"
    ],
    correctAnswer: 1,
    explanation: "Earth leakage clamp meters are highly sensitive, measuring from microamps up to around 100-200mA. This sensitivity is needed to detect small leakage currents that could cause RCD tripping or indicate insulation degradation. They're much more sensitive than standard clamp meters which typically start at around 0.1A or 1A."
  },
  {
    id: 7,
    question: "When interpreting thermal images of electrical equipment, what does a 'Delta T' measurement represent?",
    options: [
      "The absolute temperature of the hottest point",
      "The temperature difference between a reference point and the point of concern",
      "The time taken for the equipment to reach operating temperature",
      "The thermal camera's measurement accuracy"
    ],
    correctAnswer: 1,
    explanation: "Delta T is the temperature difference between a reference point (usually ambient or a similar component under the same load) and the suspect point. This relative measurement is often more useful than absolute temperature because it accounts for ambient conditions and loading. Standards typically specify Delta T thresholds for action levels."
  },
  {
    id: 8,
    question: "A three-phase motor thermal image shows one supply cable significantly hotter than the other two. What might this indicate?",
    options: [
      "Normal three-phase operation",
      "Single phasing - one phase has failed or has high resistance",
      "The motor is running correctly",
      "The thermal camera is faulty"
    ],
    correctAnswer: 1,
    explanation: "In balanced three-phase operation, all phases should carry similar current and show similar temperatures. One phase significantly hotter suggests it's carrying more current (possibly compensating for a lost phase) or has high resistance. Single phasing damages motors and requires immediate investigation."
  },
  {
    id: 9,
    question: "What is the purpose of the 'inrush current' function on some clamp meters?",
    options: [
      "To measure steady-state running current",
      "To capture the high current peak when motors or other inductive loads start",
      "To measure current in multiple conductors simultaneously",
      "To detect earth faults"
    ],
    correctAnswer: 1,
    explanation: "Inrush current function captures the brief high-current surge when inductive loads (motors, transformers, ballasts) start. This can be 6-10 times the running current for motors. Normal sampling may miss this brief peak. Knowing inrush current helps with circuit design, protection selection, and diagnosing nuisance tripping."
  },
  {
    id: 10,
    question: "Why is it important to document the load conditions when performing thermal imaging surveys?",
    options: [
      "For warranty purposes only",
      "Because thermal patterns vary with load - comparisons require similar conditions",
      "The camera requires this information to function",
      "It's not important - thermal patterns are independent of load"
    ],
    correctAnswer: 1,
    explanation: "Heat generation is proportional to current squared (P = I squared R). A connection that's cool at 50% load may overheat at 100% load. Thermal surveys should ideally be performed at typical maximum load, and the load level recorded. Repeat surveys should aim for similar conditions to enable valid comparisons."
  },
  {
    id: 11,
    question: "What PPE or safety consideration is specific to thermal imaging surveys?",
    options: [
      "Thermal imaging requires working on isolated circuits only",
      "Thermal cameras emit dangerous radiation requiring shielding",
      "Enclosures may need to be opened, requiring arc flash protection in high-energy situations",
      "No special PPE is required for thermal imaging"
    ],
    correctAnswer: 2,
    explanation: "Thermal imaging often requires opening enclosures to view connections and components. In high-energy installations, this creates arc flash hazards requiring appropriate PPE. The camera itself presents no hazard, but gaining visual access to equipment does. Risk assessment and appropriate protection levels are essential."
  },
  {
    id: 12,
    question: "A clamp meter reads zero when placed around a known live cable carrying load. What is the most likely cause?",
    options: [
      "The circuit is actually dead",
      "Multiple conductors are enclosed, cancelling the magnetic fields",
      "The clamp meter is on the wrong range",
      "The load is purely resistive"
    ],
    correctAnswer: 1,
    explanation: "A zero reading on a live cable almost always means both line and neutral (or all phases) are enclosed by the jaws. The magnetic fields cancel, showing zero or only the small difference (earth leakage). Separate the conductors and clamp only one to measure the actual load current."
  }
];

const faqs = [
  {
    question: "Can I use a standard clamp meter to detect earth leakage current?",
    answer: "Not accurately. Standard clamp meters typically have minimum resolution of 0.1A or 1A - far too coarse for earth leakage currents in the milliamp range. Dedicated earth leakage clamp meters have resolution to 0.001mA (1 microamp) and are designed specifically for this purpose. Using the 'clamp all conductors' technique with a sensitive meter reveals the imbalance as leakage current."
  },
  {
    question: "Why do shiny or polished surfaces give inaccurate thermal imaging readings?",
    answer: "Shiny surfaces have low emissivity - they don't emit infrared radiation efficiently and instead reflect radiation from surrounding objects. A polished terminal might show the temperature of something it's reflecting rather than its own temperature. Solutions include adjusting emissivity settings, applying high-emissivity tape, or using the camera for relative comparisons rather than absolute temperature measurement."
  },
  {
    question: "How do I choose between an AC-only and an AC/DC clamp meter?",
    answer: "If you only work on standard mains installations, AC-only meters are sufficient and often more affordable. If you work with solar PV, battery systems, DC control circuits, or EV charging infrastructure, an AC/DC meter (using Hall-effect technology) is essential. Many modern professional clamp meters offer both AC and DC measurement."
  },
  {
    question: "What temperature difference is significant in thermal imaging?",
    answer: "Industry guidelines (such as NETA) suggest: 1-10 degrees C above reference indicates possible deficiency requiring investigation; 11-20 degrees C indicates probable deficiency requiring repair soon; 21-40 degrees C indicates serious deficiency requiring repair immediately; over 40 degrees C indicates critical - major defect, disconnect if possible. These are guidelines - context matters."
  },
  {
    question: "Can thermal imaging find faults in cables concealed in walls?",
    answer: "Only sometimes. The thermal camera sees the surface temperature. Heat from a buried overloaded cable or poor connection may warm the wall surface enough to be visible, but insulation and depth reduce this effect. Thermal imaging is most effective on visible, accessible components. Infrared can't see through walls - it only shows surface temperature effects."
  },
  {
    question: "How often should thermal imaging surveys be performed?",
    answer: "BS 7671 Guidance Note 3 suggests thermal imaging can form part of periodic inspection. Critical installations (hospitals, data centres) may benefit from annual surveys. Commercial properties typically every 3-5 years. More frequent surveys after any changes to loading or equipment. Initial surveys provide a baseline for future comparison."
  }
];

const Level3Module4Section2_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">

      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module4-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Article Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 4.2.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Clamp Meters and Thermal Imaging
          </h1>
          <p className="text-white/80">
            Advanced diagnostic tools for current measurement and thermal fault detection
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Clamp meter:</strong> Measures current without breaking circuit - uses magnetic field</li>
              <li><strong>Earth leakage clamp:</strong> Clamp all conductors to measure milliamp leakage</li>
              <li><strong>Thermal camera:</strong> Identifies hot spots indicating high resistance or overload</li>
              <li><strong>Key principle:</strong> Heat = problem - P = I squared R at resistive joints</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Use:</strong> Single conductor in jaws for load current</li>
              <li><strong>Use:</strong> All conductors together for leakage current</li>
              <li><strong>Spot:</strong> Hot terminal = high resistance joint</li>
              <li><strong>Spot:</strong> One hot phase = single phasing or imbalance</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand how clamp meters measure current using electromagnetic principles",
              "Select appropriate clamp meter types for AC, DC, and earth leakage measurement",
              "Interpret thermal images to identify developing electrical faults",
              "Apply thermal imaging effectively for preventive maintenance surveys",
              "Recognise limitations and sources of error in both measurement techniques",
              "Integrate clamp meter and thermal imaging findings into fault diagnosis"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Clamp Meter Principles */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Clamp Meter Principles and Types
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Clamp meters allow current measurement without breaking the circuit - a significant advantage for testing live installations. The basic principle uses electromagnetic induction: current flowing through a conductor creates a magnetic field, and the clamp meter's jaws (forming a current transformer) detect this field and convert it to a readable current value. This non-contact measurement is safer and more convenient than series ammeter connections.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Types of Clamp Meter Technology:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Current transformer (CT) type:</strong> AC only - detects alternating magnetic field. Most common for mains work.</li>
                <li><strong>Hall-effect type:</strong> AC and DC capable - detects static and varying magnetic fields. Essential for PV, batteries, DC systems.</li>
                <li><strong>Rogowski coil (flexible):</strong> Flexible probe wraps around conductors. Ideal for large cables, busbars, tight spaces.</li>
              </ul>
            </div>

            <p>
              When measuring load current, only the conductor of interest should be within the clamp jaws. If both line and neutral are enclosed, their magnetic fields cancel (current out on line equals current returning on neutral) and the meter reads approximately zero. The small reading that remains would be the earth leakage current - current not returning via neutral.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Site example:</strong> Investigating a circuit suspected of overloading, you clamp around the line conductor at the consumer unit. The meter shows 28A on a 32A circuit - high but acceptable. You recommend monitoring during peak use and considering circuit division if it regularly exceeds 80% of rating (25.6A).
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Specifications to Consider:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Current range:</strong> From milliamps to hundreds of amps depending on model</li>
                <li><strong>Jaw size:</strong> Must fit around the conductor - check diameter for large cables</li>
                <li><strong>Resolution:</strong> Important for low currents - earth leakage requires 0.01mA resolution</li>
                <li><strong>Inrush function:</strong> Captures motor starting currents that standard sampling misses</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Clamp meter accuracy is affected by conductor position within the jaws and by external magnetic fields. Centre the conductor in the jaws and keep away from adjacent current-carrying cables for best accuracy.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Earth Leakage Detection */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Earth Leakage Detection with Clamp Meters
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A specialised application of clamp meters is detecting earth leakage current. By clamping around all current-carrying conductors of a circuit together (line, neutral, and CPC if separate), the load current cancels out and only the imbalance - earth leakage - is measured. This technique is invaluable for tracking down nuisance RCD tripping and identifying circuits with insulation degradation.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Why Leakage Current Matters:</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Cumulative leakage can trip 30mA RCDs</li>
                  <li>Indicates insulation degradation over time</li>
                  <li>May precede full insulation breakdown</li>
                  <li>Can waste energy in larger installations</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Leakage Sources:</p>
                <ul className="text-sm text-white space-y-1">
                  <li>EMC filters in electronic equipment</li>
                  <li>LED drivers and electronic ballasts</li>
                  <li>Heating elements (especially immersion heaters)</li>
                  <li>Damp or damaged insulation</li>
                </ul>
              </div>
            </div>

            <p>
              Earth leakage clamp meters require very high sensitivity - typically 0.001mA (1 microamp) resolution to detect small leakages. Standard clamp meters are far too coarse for this work. The clamp must fully enclose all conductors with no gaps, and the meter should be allowed to stabilise before recording the reading.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Fault-Finding Procedure:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>1. Clamp meter around all conductors at RCD output - measure total downstream leakage</li>
                <li>2. If high, progressively clamp individual circuits to identify which has highest leakage</li>
                <li>3. On problem circuit, disconnect loads one by one and re-measure after each</li>
                <li>4. Identify the equipment or section contributing most to the total</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Site example:</strong> A 30mA RCD keeps tripping. Clamping all downstream conductors shows 35mA total leakage - just over the threshold. Testing individual circuits reveals the kitchen ring has 18mA, lounge has 8mA, and others are minimal. On the kitchen circuit, disconnecting the dishwasher drops leakage to 6mA. The dishwasher's filter capacitors are likely causing the issue.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Thermal Imaging Fundamentals */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Thermal Imaging Fundamentals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Thermal imaging cameras detect infrared radiation emitted by objects and convert it to a visible image showing temperature distribution. In electrical installations, this enables identification of hot spots that indicate problems - high-resistance connections, overloaded components, or failing equipment. Unlike visual inspection, thermal imaging reveals heating that may not be visible to the naked eye and can detect developing faults before failure occurs.
            </p>

            <p>
              All objects above absolute zero emit infrared radiation proportional to their temperature. The camera sensor detects this radiation and displays it as colours - typically a palette where blue/black represents cool, through yellow/orange for warm, to white/red for hot. The temperature scale can be adjusted to highlight the range of interest.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Applications in Electrical Inspection:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Distribution boards:</strong> Loose connections, overloaded MCBs, busbar hot spots</li>
                <li><strong>Cables and containment:</strong> Overloaded cables, compression damage, poor joints</li>
                <li><strong>Motors and drives:</strong> Bearing failure, winding problems, ventilation issues</li>
                <li><strong>Switchgear:</strong> Contact degradation, inadequate ratings, connection problems</li>
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Temperature Difference</p>
                <p className="text-white/90 text-xs">Delta T compared to similar components is more meaningful than absolute values</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Load Conditions</p>
                <p className="text-white/90 text-xs">Survey at typical maximum load - faults don't show when cold</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Emissivity</p>
                <p className="text-white/90 text-xs">Shiny surfaces need adjustment or comparative analysis</p>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Site example:</strong> During a periodic inspection thermal survey of an industrial distribution board, you notice one contactor is 35 degrees C hotter than identical contactors on adjacent phases. Investigation reveals a loose incoming connection. Tightening to correct torque and resurveying shows temperatures are now equal - fault resolved before it caused failure or fire.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Practical Thermal Imaging */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Practical Thermal Imaging Application
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective thermal imaging requires understanding both the equipment and the physics of heat generation and radiation. The key principle is that unwanted electrical resistance converts electrical energy to heat (P = I squared R). A poor connection carrying 30A might generate several watts of heat - enough to damage insulation and potentially cause fire over time. Thermal imaging makes this invisible heating visible.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Survey Best Practices:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Load conditions:</strong> Equipment should be under typical maximum load for at least 10-15 minutes before survey. Cold equipment won't show thermal anomalies.</li>
                <li><strong>Reference comparison:</strong> Compare similar components under similar load - one hot MCB among several cold ones is significant.</li>
                <li><strong>Document conditions:</strong> Record load levels, ambient temperature, and any enclosure modifications for future comparison.</li>
                <li><strong>Multiple angles:</strong> View from different angles as some hot spots may be hidden by other components.</li>
              </ul>
            </div>

            <p>
              Interpreting results requires understanding what's normal versus abnormal. Some heating is expected - transformers, motor windings, and semiconductor devices all generate heat in normal operation. The concern is comparative: is this component hotter than it should be compared to similar components, its historical data, or manufacturer specifications?
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Action Levels (Industry Guidelines):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>1-10 degrees C above reference:</strong> Monitor - possible developing issue</li>
                <li><strong>11-20 degrees C above reference:</strong> Plan repair - probable deficiency</li>
                <li><strong>21-40 degrees C above reference:</strong> Repair immediately - serious issue</li>
                <li><strong>Over 40 degrees C above reference:</strong> Critical - consider immediate disconnection</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Site example:</strong> A thermal survey of motor control centres reveals a contactor showing 28 degrees C above ambient and 22 degrees C above similar contactors. This falls into the 'repair immediately' category. Further investigation with the supply isolated shows pitting and oxidation on the contact surfaces. The contactor is replaced, and a follow-up survey confirms the new unit runs at normal temperature.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Thermal imaging is a condition monitoring tool, not a pass/fail test. Results should be documented, compared with baselines, and used to prioritise maintenance. Regular surveys build a historical record that helps identify gradual deterioration before it causes failure.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Clamp Meter Best Practice</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Ensure only one conductor is in the jaws for load current measurement</li>
                <li>Centre the conductor in the jaws for best accuracy</li>
                <li>Keep away from adjacent high-current conductors to avoid interference</li>
                <li>Use appropriate range - auto-ranging may be slow on fluctuating loads</li>
                <li>For DC measurement, ensure you have a Hall-effect type meter</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Thermal Imaging Survey Procedure</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Allow equipment to reach operating temperature under load before survey</li>
                <li>Record load conditions, ambient temperature, and time of survey</li>
                <li>Scan systematically - don't just look for obvious hot spots</li>
                <li>Document anomalies with images, temperature data, and location</li>
                <li>Compare with previous surveys where available to identify trends</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Safety Considerations</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Arc flash risk:</strong> Opening enclosures for thermal access may require arc flash PPE</li>
                <li><strong>Live working:</strong> Both techniques are used on live equipment - maintain safe distances and procedures</li>
                <li><strong>Hot surfaces:</strong> Components identified as hot by thermal imaging may cause burns - don't touch</li>
                <li><strong>Clamp position:</strong> Ensure the clamp jaws close fully - incomplete closure affects accuracy</li>
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

        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Clamp Meter Applications</p>
                <ul className="space-y-0.5">
                  <li>Single conductor = load current</li>
                  <li>All conductors = earth leakage</li>
                  <li>Hall-effect type for DC circuits</li>
                  <li>Inrush function for motor starting</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Thermal Imaging Action Levels</p>
                <ul className="space-y-0.5">
                  <li>1-10 degrees C: Monitor</li>
                  <li>11-20 degrees C: Plan repair</li>
                  <li>21-40 degrees C: Repair immediately</li>
                  <li>Over 40 degrees C: Critical</li>
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
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module4-section2-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: RCD and Loop Impedance Testers
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module4-section2-4">
              Next: Safe Use and Calibration
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module4Section2_3;
