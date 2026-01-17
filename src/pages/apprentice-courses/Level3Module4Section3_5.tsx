/**
 * Level 3 Module 4 Section 3.5 - Appliance and Equipment Faults
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Appliance and Equipment Faults - Level 3 Module 4 Section 3.5";
const DESCRIPTION = "Diagnose common faults in electrical appliances and fixed equipment, understand Class I and Class II insulation, and determine when faults are in the installation versus connected equipment.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "An RCD trips when a washing machine is plugged in, even before switching it on. The fixed wiring tests healthy. What is the most likely cause?",
    options: [
      "Faulty RCD needing replacement",
      "Capacitive filter in the appliance creating momentary earth current",
      "Short circuit in the washing machine motor",
      "The socket circuit is overloaded"
    ],
    correctIndex: 1,
    explanation: "Many appliances have EMC filter capacitors that connect line to earth. When plugged in, these capacitors charge through the earth path, creating a momentary current imbalance. If this inrush exceeds the RCD's sensitivity (even briefly), it trips. Common in washing machines, dishwashers, and computing equipment."
  },
  {
    id: "check-2",
    question: "A Class I appliance has 0.8 ohms between the earth pin and the metal casing. Is this acceptable?",
    options: [
      "No - Class I requires less than 0.1 ohms",
      "Yes - this is within acceptable limits for in-service testing",
      "No - any reading above 0.5 ohms indicates a fault",
      "It depends on the appliance power rating"
    ],
    correctIndex: 1,
    explanation: "For in-service PAT testing, a Class I appliance should have less than 0.1 ohms plus cable resistance (typically up to 1 ohm for long leads). 0.8 ohms would be acceptable for an appliance with a longer cable. For new appliances or after repair, the standard is stricter. Always consider cable length in the reading."
  },
  {
    id: "check-3",
    question: "A tumble dryer works normally but has a burning smell. Insulation resistance tests at 2 megohms line to earth. What should you investigate?",
    options: [
      "The lint filter and exhaust duct for blockages",
      "The motor windings for short circuits",
      "The supply cable for damage",
      "The RCD for correct operation"
    ],
    correctIndex: 0,
    explanation: "A burning smell with normal electrical readings often indicates mechanical or thermal problems rather than electrical faults. Blocked lint filters or exhaust ducts cause overheating. The dryer element works harder, temperatures rise, and accumulated lint can char or catch fire. This is the most common tumble dryer fire cause."
  },
  {
    id: "check-4",
    question: "A customer's electric cooker has one hob ring that won't work. All others work fine. The most likely fault location is:",
    options: [
      "The main supply to the cooker",
      "The internal connection to that specific ring or the ring element itself",
      "The cooker control unit in the consumer unit",
      "A neutral fault affecting only that ring"
    ],
    correctIndex: 1,
    explanation: "With other rings working, the supply and main connections are proven. The fault is specific to one ring - either the element has failed (most common), the internal wiring to that ring is damaged, or the switch controlling that ring has failed. Diagnosis requires appliance-specific testing with the cooker isolated."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "An electric shower unit trips its RCBO after 10 minutes of use. When tested cold, insulation resistance is 50 megohms. What is the probable cause?",
    options: [
      "The RCBO is faulty and needs replacement",
      "Thermal breakdown of element insulation when hot",
      "Water ingress into the shower unit",
      "The circuit is overloaded"
    ],
    correctAnswer: 1,
    explanation: "Good IR when cold but trips when hot suggests thermal insulation breakdown. As the heating element operates, its insulation expands and degrades, allowing leakage current to earth. This increases until it exceeds the RCD trip threshold. The element needs replacement - this fault will worsen over time."
  },
  {
    id: 2,
    question: "A customer reports their fridge runs constantly but doesn't cool properly. The compressor is warm. This indicates:",
    options: [
      "An electrical fault in the compressor winding",
      "Probable refrigerant leak or blocked system - not an electrical fault",
      "Thermostat stuck in the 'on' position",
      "Damaged power cable causing voltage drop"
    ],
    correctAnswer: 1,
    explanation: "A warm, running compressor with poor cooling suggests the refrigeration system has a problem - refrigerant leak, blocked capillary tube, or failed evaporator. The electrical system is working (motor runs), but the mechanical/thermal system isn't. This requires refrigeration specialist attention, not electrical repair."
  },
  {
    id: 3,
    question: "A Class II power tool gives the user a tingle when used in damp conditions. What should you check first?",
    options: [
      "The supply earth connection",
      "The insulation integrity of the tool - Class II shouldn't tingle regardless of conditions",
      "Whether RCD protection is installed on the circuit",
      "The user's footwear and standing surface"
    ],
    correctAnswer: 1,
    explanation: "Class II (double insulated) equipment should NEVER give a tingle as there are no accessible conductive parts connected to internal electrics. A tingle indicates the double insulation has failed. The tool should be immediately withdrawn from service and either repaired by a competent person or replaced."
  },
  {
    id: 4,
    question: "Testing a suspect kettle, you measure 0.1 ohms between the earth pin and the metal body, and 1200 ohms between line and neutral. What do these readings indicate?",
    options: [
      "Both readings are faulty",
      "Good earth but the element has failed (open circuit)",
      "Good earth but partial short in the element",
      "Normal readings for a kettle"
    ],
    correctAnswer: 1,
    explanation: "The 0.1 ohm earth bond is good. However, a kettle element typically measures 15-25 ohms (for 2-3kW at 230V). 1200 ohms indicates the element has failed with an open circuit or very high resistance. The kettle won't heat or will heat very slowly. Element replacement or kettle replacement needed."
  },
  {
    id: 5,
    question: "An immersion heater trips the RCD randomly. Testing shows the element measures 3 megohms to earth when cold. After running for 20 minutes, it measures 0.4 megohms. What's happening?",
    options: [
      "Normal heating effect on insulation",
      "Element insulation is degrading when hot - element needs replacement",
      "The test instrument is affected by heat",
      "Water is getting into the element housing"
    ],
    correctAnswer: 1,
    explanation: "Insulation resistance should remain high regardless of temperature. Significant reduction when hot indicates the insulation material is breaking down with thermal stress. At 0.4 megohms, leakage current approaches levels that can trip 30mA RCDs. The element needs replacement before complete failure."
  },
  {
    id: 6,
    question: "A commercial food mixer trips its circuit breaker when starting, but runs fine if started on low speed first. This suggests:",
    options: [
      "The motor is faulty and needs replacement",
      "High starting current exceeds MCB magnetic trip threshold",
      "The gearbox is binding causing motor overload",
      "The supply cable is undersized"
    ],
    correctAnswer: 1,
    explanation: "Motors draw high starting (inrush) current - typically 6-8 times running current. Starting on load (high speed) maximises this. If the MCB magnetic trip threshold is exceeded, it trips instantly. Solutions include: starting on low speed/no load, using a Type C or D MCB, or installing a soft-start device."
  },
  {
    id: 7,
    question: "A portable heater has a damaged flexible cord with exposed conductors visible. The customer asks you to 'just tape it up'. What should you do?",
    options: [
      "Apply heat-shrink or insulation tape as a temporary repair",
      "Refuse and withdraw the appliance from service until properly repaired",
      "Test the appliance - if it passes PAT, the repair is acceptable",
      "Tape it and recommend replacement at their convenience"
    ],
    correctAnswer: 1,
    explanation: "Exposed conductors on a flexible cord are a serious shock and fire hazard. Tape is not an acceptable repair - it doesn't restore mechanical protection and can work loose with flexing. The cord must be replaced by a competent person, or the appliance withdrawn from service. Never compromise on cable integrity."
  },
  {
    id: 8,
    question: "A customer's induction hob shows an error code and won't operate. No electrical faults are found during testing. What should you advise?",
    options: [
      "Replace the entire hob as the control board has failed",
      "The error indicates an internal fault requiring manufacturer/specialist diagnosis",
      "Reset the hob by switching off at the consumer unit",
      "The installation wiring must be faulty"
    ],
    correctAnswer: 1,
    explanation: "Modern electronic appliances often have diagnostic systems that prevent operation when internal faults are detected. If the installation tests correctly, the appliance itself has an internal issue. These require manufacturer-trained technicians or authorised service agents who have access to error code meanings and replacement parts."
  },
  {
    id: 9,
    question: "During EICR, you find a wall-mounted electric fire with 0.3 megohms insulation resistance. The installation wiring to the outlet tests 250 megohms. What is your recommendation?",
    options: [
      "Code C2 for the installation wiring",
      "Advise replacement or repair of the fire - the fault is in the appliance",
      "Code C1 for immediate danger",
      "Accept the reading as normal for heating appliances"
    ],
    correctAnswer: 1,
    explanation: "The installation wiring tests healthy (250 megohms). The appliance fails with 0.3 megohms - below the 1 megohm minimum. This isn't an installation defect for coding, but you should advise the customer that the fire has degraded insulation. Recommend they have it tested by a competent person or replace it."
  },
  {
    id: 10,
    question: "A hand dryer in a washroom has become live to touch. Upon inspection, you find no earth connection to the unit. The unit is metal-cased with a standard 3-pin plug. What classification is this?",
    options: [
      "Class II equipment that doesn't need earthing",
      "Class I equipment installed without required earth - dangerous",
      "Class 0 equipment - outdated but acceptable if RCD protected",
      "SELV equipment with faulty insulation"
    ],
    correctAnswer: 1,
    explanation: "A metal-cased appliance with a 3-pin plug (including earth pin) is Class I - it REQUIRES the earth connection for safety. Operating without earth means a fault makes the casing live with no protection. This is dangerous and the appliance must be immediately isolated until the earth is connected correctly."
  },
  {
    id: 11,
    question: "A microwave oven operates but produces no heat. The turntable rotates and the light works. What is the likely fault?",
    options: [
      "Main supply fuse has partially failed",
      "Magnetron or high-voltage circuit has failed - requires specialist repair",
      "The door interlock is faulty",
      "The installation supply voltage is low"
    ],
    correctAnswer: 1,
    explanation: "The turntable and light operating prove the basic power supply works. No heating indicates the high-voltage circuit (magnetron, capacitor, diode, transformer) has failed. Microwave high-voltage components are dangerous even when unplugged (capacitors hold lethal charge). Only trained appliance technicians should work on these components."
  },
  {
    id: 12,
    question: "A bathroom shaver socket has stopped working. It has its own isolating transformer. Testing shows 230V at the input but 0V at the output. What is the fault?",
    options: [
      "The thermal overload has tripped",
      "The isolating transformer has likely failed (open circuit)",
      "The socket contacts are corroded",
      "There is a neutral fault on the supply circuit"
    ],
    correctAnswer: 1,
    explanation: "With input voltage present but no output, the transformer itself has failed - likely an open-circuit winding. Some shaver sockets have thermal cutouts that reset automatically; try waiting 15 minutes and testing again. If still no output, the transformer needs replacement. The entire shaver socket unit is usually replaced."
  }
];

const faqs = [
  {
    question: "How do I determine if a fault is in the fixed wiring or the connected appliance?",
    answer: "Disconnect all appliances and test the circuit. If insulation resistance returns to normal, the fault is in an appliance. Reconnect one at a time to identify which one. Also test with appliances unplugged but sockets left switched on - this tests the wiring. If the circuit fails with nothing connected, the fixed wiring is faulty."
  },
  {
    question: "What's the difference between Class I, Class II, and Class III equipment?",
    answer: "Class I has basic insulation and relies on an earth connection for fault protection - metal cases must be earthed. Class II has double or reinforced insulation and no earth connection - marked with the double-square symbol. Class III operates on SELV (less than 50V AC) and has no shock risk from the output. Each requires different testing approaches."
  },
  {
    question: "Can I repair appliance flexible cables, or must they be replaced completely?",
    answer: "BS 7671 and PAT testing guidance prefer complete cable replacement. If repairing, ensure the repair provides equivalent mechanical and electrical integrity. For appliances in commercial use, repair may not satisfy insurance or duty-of-care requirements. For trailing leads and extension cables, always replace rather than repair."
  },
  {
    question: "Why does my appliance work on one socket but not another?",
    answer: "Check if both sockets are working (test with a known good appliance). If one socket doesn't work with any appliance, the socket or its circuit has a fault. If the appliance works on some sockets but not others, the 'failing' sockets may have weak earth connections or the appliance may have marginal faults that only manifest under certain conditions."
  },
  {
    question: "An appliance has 'E' or 'CE' marks - does this mean it's safe?",
    answer: "CE marking indicates the manufacturer claims compliance with EU safety directives - but self-certification means no third-party testing may have occurred. 'E' marks, BEAB, or BSI kitemarks indicate independent testing. Neither marking guarantees the specific appliance is safe - age, damage, misuse, or defects can make any appliance unsafe regardless of its original certification."
  },
  {
    question: "How often should fixed appliances (cookers, water heaters) be tested?",
    answer: "Unlike portable appliances, there's no statutory requirement for testing fixed appliances in domestic premises. However, they should be checked during periodic inspection (EICR). In commercial premises, risk assessment determines frequency - kitchens and industrial equipment may need annual inspection. Any appliance showing signs of distress should be tested immediately."
  }
];

const Level3Module4Section3_5 = () => {
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
            <Link to="/study-centre/apprentice/level3-module4-section3">
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
            <span>Module 4.3.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Appliance and Equipment Faults
          </h1>
          <p className="text-white/80">
            Diagnosing electrical appliance problems and separating installation faults from equipment faults
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>RCD trips on plugging in:</strong> Capacitive filter inrush</li>
              <li><strong>Trips when hot:</strong> Thermal insulation breakdown</li>
              <li><strong>Class I tingling:</strong> Earth connection faulty</li>
              <li><strong>Class II tingling:</strong> Double insulation failed - danger</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Burning smell = check mechanical not just electrical</li>
              <li><strong>Spot:</strong> Works cold, fails hot = thermal degradation</li>
              <li><strong>Use:</strong> Disconnect all loads to isolate appliance vs wiring</li>
              <li><strong>Use:</strong> Compare IR readings hot vs cold</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Differentiate between installation and appliance faults",
              "Understand Class I, II, and III equipment testing",
              "Diagnose common appliance failure modes",
              "Recognise thermal degradation symptoms",
              "Apply appropriate testing for fixed equipment",
              "Advise customers on appliance safety"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Separating Installation from Appliance Faults */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Separating Installation from Appliance Faults
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              When called to a fault, one of the first diagnostic steps is determining whether the problem lies in the fixed installation or connected equipment. This distinction affects whose responsibility the repair is, what testing is appropriate, and whether the electrician can remedy the fault or needs to recommend an appliance repair specialist.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Signs of Installation Faults</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Problem persists with all appliances disconnected</li>
                  <li>Multiple appliances affected on same circuit</li>
                  <li>Fault disappears when tested at consumer unit</li>
                  <li>Visible damage to fixed wiring or accessories</li>
                  <li>Problem specific to certain socket outlets</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Signs of Appliance Faults</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Fault follows appliance to different circuits</li>
                  <li>Fixed wiring tests healthy with load disconnected</li>
                  <li>Only one specific appliance causes trips</li>
                  <li>Appliance shows physical damage or wear</li>
                  <li>Problem occurs regardless of which socket used</li>
                </ul>
              </div>
            </div>

            <p>
              The systematic approach is: test the installation with all loads disconnected. If it passes, reconnect loads one by one until the fault appears. This isolates the specific appliance causing the problem. Remember that appliance faults can sometimes damage the installation - check for burnt terminals or damaged socket outlets.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>BS 7671 Reference:</strong> Part 6 requires verification that equipment is suitable and correctly installed, but doesn't cover internal appliance testing. PAT testing follows IET Code of Practice for In-Service Inspection and Testing of Electrical Equipment.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Equipment Classes and Their Faults */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Equipment Classes and Their Faults
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electrical equipment is classified according to its method of protection against electric shock. Each class has different failure modes and testing requirements. Understanding these classes helps diagnose faults and apply appropriate tests.
            </p>

            <div className="grid sm:grid-cols-3 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Class I Equipment</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Basic insulation plus earth connection</li>
                  <li>Metal parts connected to earth pin</li>
                  <li>Examples: kettles, washing machines, cookers</li>
                  <li>Fault mode: earth connection failure</li>
                  <li>Test: earth continuity must be low</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Class II Equipment</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Double or reinforced insulation</li>
                  <li>No earth connection needed or provided</li>
                  <li>Examples: power tools, phone chargers</li>
                  <li>Fault mode: insulation breakdown</li>
                  <li>Test: insulation resistance between L/N and accessible parts</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Class III Equipment</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Safety Extra-Low Voltage (SELV)</li>
                  <li>Less than 50V AC, supplied by safety transformer</li>
                  <li>Examples: laptop chargers, phone chargers</li>
                  <li>Fault mode: transformer or secondary failure</li>
                  <li>Test: verify SELV source is isolated</li>
                </ul>
              </div>
            </div>

            <p>
              Class II equipment is particularly critical - any shock from a Class II item indicates complete failure of the protective system. These appliances have no backup protection (no earth), so when double insulation fails, the user receives the full fault current. Class II appliances giving any tingle must be immediately withdrawn from service.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> A Class II power drill gives a slight tingle when used in damp conditions. Investigation shows moisture has penetrated the casing and created a leakage path through condensation on the motor winding. Even though it dries out and tests normally later, the insulation has been compromised and the tool should be replaced or professionally refurbished.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Common Appliance Failure Modes */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Common Appliance Failure Modes
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Different appliance types have characteristic failure modes. Recognising these patterns speeds diagnosis and helps provide accurate advice to customers. Many appliance faults are not electrical in origin but have electrical symptoms.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Heating appliances (kettles, heaters, showers):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Element failure:</strong> Open circuit - appliance doesn't heat. Test: high resistance between L and N</li>
                <li><strong>Element insulation breakdown:</strong> Trips RCD. Test: low IR between element and body/earth</li>
                <li><strong>Thermostat failure:</strong> Stuck on (overheating) or stuck off (no heat)</li>
                <li><strong>Scale buildup:</strong> Poor heat transfer causing element overheating</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Motor appliances (washing machines, fridges, fans):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Winding failure:</strong> Open circuit (won't run) or short circuit (trips protection)</li>
                <li><strong>Capacitor failure:</strong> Motor hums but won't start, or starts slowly</li>
                <li><strong>Bearing seizure:</strong> Motor draws high current, overheats, trips thermal protection</li>
                <li><strong>Carbon brush wear:</strong> Intermittent operation, sparking visible through vents</li>
              </ul>
            </div>

            <p>
              Many apparent electrical faults are actually mechanical problems. A tumble dryer that trips its MCB may have a seized drum bearing causing motor overload. A washing machine that trips the RCD may have water ingress into the door seal switch. Always consider mechanical causes alongside electrical testing.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical tip:</strong> Listen to the appliance. Unusual sounds (grinding, humming, clicking) often indicate mechanical problems that precede electrical failure. A motor struggling against mechanical resistance draws excessive current even though the motor itself is healthy.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Fixed Equipment Testing */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Fixed Equipment Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Fixed equipment (cookers, immersion heaters, storage heaters, showers) forms part of the permanent installation but also has appliance characteristics. Testing must verify both the installation connection and the equipment condition. These items are not normally covered by portable appliance testing but should be checked during periodic inspection.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Tests</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Continuity of circuit CPC to equipment</li>
                  <li>Insulation resistance of supply cable</li>
                  <li>Earth fault loop impedance at the equipment</li>
                  <li>Correct operation of any local switching</li>
                  <li>Adequate cable rating for the load</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Equipment Tests</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Earth continuity within the equipment</li>
                  <li>Insulation resistance between phases and earth</li>
                  <li>Element or load resistance (where accessible)</li>
                  <li>Thermostat operation (if testable)</li>
                  <li>Visual inspection for damage or deterioration</li>
                </ul>
              </div>
            </div>

            <p>
              Testing fixed equipment requires careful isolation. Many items have no local means of isolation other than the supply MCB/RCBO. Elements in heaters and showers may retain charge briefly. Always prove dead before testing internal components. Be aware that testing with load connected gives different readings to testing the supply alone.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> Testing a storage heater circuit, you find IR of 0.5 megohms L-E. Disconnecting the heater at its terminal block, the cable tests 200 megohms. Reconnecting and testing the heater alone shows 0.6 megohms to earth. The heater elements have degraded insulation - advise the customer the heater needs professional servicing or replacement.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Appliance Fault-Finding Checklist</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Verify the installation supply is healthy with appliance disconnected</li>
                <li>Test insulation resistance with appliance cold, then after operation if safe to do so</li>
                <li>Check earth continuity on Class I equipment - should be less than 0.1 ohms plus cable resistance</li>
                <li>Measure element/load resistance where accessible to verify not open/short circuit</li>
                <li>Consider non-electrical causes - mechanical, thermal, control system</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When to Recommend Specialist Repair</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Electronic control boards with error codes - need manufacturer diagnostics</li>
                <li>Refrigeration systems - require F-gas certification for refrigerant work</li>
                <li>Gas appliances - require Gas Safe registration</li>
                <li>Microwave high-voltage components - lethal capacitor discharge hazard</li>
                <li>Manufacturer warranty items - own-repair may void warranty</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Testing with load connected</strong> - Results may be misleading; always test installation and equipment separately</li>
                <li><strong>Assuming new = safe</strong> - New appliances can have manufacturing defects; test before connecting</li>
                <li><strong>Ignoring thermal faults</strong> - Many faults only appear when equipment is hot; test after operation if possible</li>
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
                <p className="font-medium text-white mb-1">PAT Test Limits</p>
                <ul className="space-y-0.5">
                  <li>Class I earth: less than 0.1 ohms + R lead</li>
                  <li>Class I insulation: more than 1 megohm</li>
                  <li>Class II insulation: more than 2 megohms</li>
                  <li>Touch current: less than 0.25mA (Class I) / 0.5mA (Class II)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Common Element Resistances (at 230V)</p>
                <ul className="space-y-0.5">
                  <li>3kW kettle: approximately 17 ohms</li>
                  <li>2kW heater: approximately 26 ohms</li>
                  <li>9.5kW shower: approximately 5.5 ohms</li>
                  <li>3kW immersion: approximately 17 ohms</li>
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
            <Link to="/study-centre/apprentice/level3-module4-section3-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Earthing and Bonding
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module4-section3-6">
              Next: Overheating and Insulation Breakdown
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module4Section3_5;
