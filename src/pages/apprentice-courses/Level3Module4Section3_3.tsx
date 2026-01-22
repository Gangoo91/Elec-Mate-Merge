/**
 * Level 3 Module 4 Section 3.3 - Protective Device Tripping
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Protective Device Tripping - Level 3 Module 4 Section 3.3";
const DESCRIPTION = "Understand why MCBs, RCDs, and RCBOs trip, diagnose the underlying causes, and apply systematic fault-finding techniques to resolve protective device operation issues.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "An MCB trips instantly when switched on, without any load connected. What type of fault is most likely?",
    options: [
      "Overload on the circuit",
      "Short circuit or very low resistance fault on the fixed wiring",
      "Earth leakage through an appliance",
      "The MCB is faulty and needs replacement"
    ],
    correctIndex: 1,
    explanation: "Instant tripping without load indicates a dead short - line to neutral or line to earth with very low resistance. The MCB's magnetic trip operates within milliseconds when fault current exceeds its instantaneous trip threshold (typically 3-5 times rating for Type B). No load means the fault is in the fixed wiring."
  },
  {
    id: "check-2",
    question: "An RCD trips randomly at different times with no apparent pattern. Which of these is the most likely cause?",
    options: [
      "Overloaded circuits causing thermal stress",
      "Cumulative earth leakage from multiple appliances approaching 30mA",
      "Voltage fluctuations from the supply",
      "The RCD operating coil is failing"
    ],
    correctIndex: 1,
    explanation: "Random RCD tripping often occurs when cumulative leakage from multiple devices approaches the trip threshold. Individual appliances may leak 5-10mA each - acceptable individually, but collectively they approach 30mA. When one more small leakage occurs (motor starting, heater cycling), the RCD trips."
  },
  {
    id: "check-3",
    question: "A Type B MCB takes 30 seconds to trip when a 3kW heater is connected to a 16A circuit. Is this correct behaviour?",
    options: [
      "No - the MCB should trip instantly",
      "No - the MCB should not trip at all for this load",
      "Yes - this is normal thermal operation for a slight overload",
      "Yes - but only if the cable is adequately sized"
    ],
    correctIndex: 2,
    explanation: "3kW at 230V draws 13A - within the 16A MCB rating. However, if the circuit already has some load, or if the MCB has been repeatedly stressed, its thermal element may operate over time. The 30-second trip time indicates thermal operation (overload), not magnetic operation (fault). Check total circuit load."
  },
  {
    id: "check-4",
    question: "An RCBO trips on both the overcurrent test button and the RCD test button. What does this tell you?",
    options: [
      "The RCBO is faulty and should be replaced",
      "Both protection functions are working correctly",
      "There is both an overload and an earth fault present",
      "The test buttons are cross-wired internally"
    ],
    correctIndex: 1,
    explanation: "Both test buttons operating correctly indicates the RCBO is functioning as designed. The overcurrent test verifies the thermal/magnetic mechanism works, while the RCD test confirms the earth leakage detection operates. This is normal verification behaviour, not a fault indication."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A 32A Type B MCB protects a ring circuit. It trips after 10 minutes of normal use. Insulation resistance tests at 150 megohms. What is the most likely cause?",
    options: [
      "Short circuit in the wiring",
      "Cumulative overload from connected appliances",
      "Earth fault at an accessory",
      "Faulty MCB requiring replacement"
    ],
    correctAnswer: 1,
    explanation: "Good insulation resistance rules out short circuits and earth faults. A trip after 10 minutes indicates thermal operation from sustained overload. Add up the ratings of connected appliances - kettles (13A), heaters, etc. can easily exceed 32A cumulatively. This is correct MCB operation, not a fault."
  },
  {
    id: 2,
    question: "An RCD protecting bathroom and kitchen circuits trips when the washing machine enters its spin cycle. All other times it operates normally. The likely cause is:",
    options: [
      "Overload from the motor during spin",
      "Increased earth leakage from motor windings under stress",
      "Short circuit in the motor windings",
      "Water ingress into the washing machine door seal"
    ],
    correctAnswer: 1,
    explanation: "During spin, the motor works hardest and winding temperature increases. Older or worn motors can have marginally degraded insulation that leaks more current when hot and under load. The increased leakage during spin pushes total circuit leakage over the 30mA threshold."
  },
  {
    id: 3,
    question: "You're called to investigate nuisance tripping of a 30mA RCD. Measuring earth leakage with a clamp meter on neutral shows 22mA with all loads connected. What action should you recommend?",
    options: [
      "Replace the RCD with a less sensitive 100mA unit",
      "Split the circuits across multiple RCDs to reduce cumulative leakage",
      "The reading is acceptable - look elsewhere for the fault",
      "Replace all connected appliances"
    ],
    correctAnswer: 1,
    explanation: "22mA standing leakage leaves only 8mA headroom before tripping. Any transient (motor starting, filter capacitor charging) can cause trips. BS 7671 recommends splitting circuits so each RCD protects fewer circuits with lower cumulative leakage. This is the correct engineering solution."
  },
  {
    id: 4,
    question: "A Type C MCB is installed on a lighting circuit. The electrician who installed it says 'it's more robust'. Is this appropriate?",
    options: [
      "Yes - Type C provides better protection",
      "No - Type C has higher instantaneous trip current, providing less protection for lighting cables",
      "Yes - all MCB types provide equivalent protection",
      "No - Type C MCBs are not permitted on lighting circuits"
    ],
    correctAnswer: 1,
    explanation: "Type C MCBs trip magnetically at 5-10 times rated current (vs 3-5 times for Type B). On a lighting circuit with lower prospective fault currents, a Type C may not provide adequate instantaneous protection for cable short-circuit faults. Type B is correct for most final circuits."
  },
  {
    id: 5,
    question: "An MCB trips when an induction hob is switched on, but only on the 'boost' setting. Lower settings work fine. What is happening?",
    options: [
      "Earth fault that only occurs at high power",
      "Inrush current on boost exceeds the MCB instantaneous trip threshold",
      "The hob has an internal short circuit",
      "The MCB thermal element is faulty"
    ],
    correctAnswer: 1,
    explanation: "Induction hobs can draw significant inrush current when the magnetic field energises. On boost, this is maximised. If the inrush exceeds the MCB's magnetic trip threshold (even momentarily), it trips. Solutions include Type C MCB (if cable protection is maintained) or a time-delay MCB."
  },
  {
    id: 6,
    question: "Testing RCD operation, you find it trips at 28mA when it should trip between 15-30mA. The trip time is 25ms. Is this RCD serviceable?",
    options: [
      "No - it's tripping too close to the upper limit",
      "Yes - it meets the BS EN 61008 requirements",
      "No - the trip time is too slow",
      "It needs recalibration by the manufacturer"
    ],
    correctAnswer: 1,
    explanation: "BS EN 61008 requires a 30mA RCD to trip between 50% and 100% of rated current (15-30mA) within 300ms at rated current, or 40ms at 5x rated (150mA). 28mA and 25ms both meet requirements. The RCD is functioning correctly within specification."
  },
  {
    id: 7,
    question: "A customer reports their RCD trips every morning around 7am. They have electric underfloor heating on a timer. What is the likely connection?",
    options: [
      "The heating elements have degraded insulation that leaks when cold",
      "Morning voltage dips cause the RCD to malfunction",
      "Condensation forms overnight and causes leakage when heating energises",
      "The timer mechanism is faulty"
    ],
    correctAnswer: 2,
    explanation: "Overnight, temperatures drop and moisture can condense on or near heating elements. When the heating energises in the morning, this moisture creates temporary earth leakage paths. As the floor warms and moisture evaporates, the leakage stops. Check for inadequate insulation or sealing of the heating mat."
  },
  {
    id: 8,
    question: "You find a consumer unit with the main switch off but individual MCBs still on. The customer says 'the whole house tripped'. What actually happened?",
    options: [
      "All MCBs tripped simultaneously",
      "The supply fuse blew",
      "The main switch RCD tripped due to earth fault",
      "The meter isolator tripped"
    ],
    correctAnswer: 2,
    explanation: "If the main switch is off but MCBs are on, the main switch (which incorporates the RCD in most modern boards) has tripped. Individual MCBs don't trip the main switch. An earth fault on any circuit will trip the main RCD, appearing to kill all circuits even though MCBs remain on."
  },
  {
    id: 9,
    question: "A dual RCD consumer unit has tripping on the left side only. Swapping an appliance from left to right stops the tripping. This confirms:",
    options: [
      "The left RCD is faulty",
      "The appliance has an earth leakage fault",
      "The left side circuits have higher impedance",
      "The wiring on the left side is damaged"
    ],
    correctAnswer: 1,
    explanation: "If moving the appliance stops tripping on one RCD and starts it on another, the appliance is the source of the leakage. The RCDs are both functioning correctly by detecting the leakage. The appliance needs investigation - motor insulation, heating element, or filter capacitor could be leaking."
  },
  {
    id: 10,
    question: "An MCB repeatedly trips and won't stay reset. Each reset attempt results in immediate tripping. What should you check first?",
    options: [
      "Replace the MCB - it has failed mechanically",
      "Test insulation resistance on the circuit to identify the fault",
      "Check if the MCB is the correct rating for the cable",
      "Measure supply voltage for anomalies"
    ],
    correctAnswer: 1,
    explanation: "Immediate tripping indicates a persistent fault, not an MCB problem. Test insulation resistance between conductors to find the short circuit or earth fault. The MCB is correctly doing its job by refusing to energise a faulty circuit. Only replace the MCB after the circuit fault is found and repaired."
  },
  {
    id: 11,
    question: "A 30mA RCD and a 100mA RCD are installed in series. The 30mA RCD keeps tripping but the 100mA doesn't. This is:",
    options: [
      "Correct discrimination - the more sensitive device trips first",
      "Incorrect - both should trip together",
      "Indicating the 100mA RCD is faulty",
      "Showing reverse polarity on the circuit"
    ],
    correctAnswer: 0,
    explanation: "This is correct discrimination. Earth leakage between 30mA and 100mA will trip only the 30mA device. If leakage exceeded 100mA, both would trip (though the 30mA trips faster). Discrimination allows localised protection without affecting upstream devices. BS 7671 recommends time-delayed upstream RCDs for better discrimination."
  },
  {
    id: 12,
    question: "Following a power cut, multiple RCDs in a building trip when supply is restored. No faults are found on testing. What caused this?",
    options: [
      "Power surge damaged the RCDs",
      "Transient inrush currents and capacitor charging caused momentary imbalance",
      "The supply neutral was momentarily disconnected",
      "Static electricity built up during the outage"
    ],
    correctAnswer: 1,
    explanation: "When power is restored, all connected equipment energises simultaneously. Motors, transformers, LED drivers, and filter capacitors all draw inrush current and create transient earth currents. The cumulative effect can momentarily exceed RCD trip thresholds. Usually a one-time event - simply reset if no fault is found."
  }
];

const faqs = [
  {
    question: "Why does my RCD trip when I plug in a specific appliance, even before I switch it on?",
    answer: "Many appliances have EMC filter capacitors that connect line to earth. When plugged in, these capacitors charge through the earth path, creating a momentary current imbalance that can trip sensitive RCDs. It's more common with older appliances, IT equipment, and some LED drivers. If it happens consistently, the appliance may have excessive filter capacitance or degraded components."
  },
  {
    question: "What's the difference between MCB thermal and magnetic tripping?",
    answer: "MCBs have two trip mechanisms: thermal (bimetallic strip) responds to sustained overload by heating and bending over seconds to minutes - the higher the overload, the faster it trips. Magnetic (solenoid) responds to high fault currents instantly (milliseconds) - this handles short circuits. Type B/C/D ratings refer to the magnetic trip threshold as a multiple of rated current."
  },
  {
    question: "Can I replace a 30mA RCD with 100mA to stop nuisance tripping?",
    answer: "Generally no - 30mA is required for additional protection against electric shock on socket circuits and bathroom circuits per BS 7671. 100mA provides fire protection but not adequate shock protection. The correct solution is to find and fix the source of leakage, or split circuits across multiple 30mA RCDs to reduce cumulative leakage on each."
  },
  {
    question: "Why would an RCBO trip on overload when an MCB of the same rating doesn't?",
    answer: "RCBOs and MCBs should have identical overload characteristics, but manufacturing tolerances exist. More likely, the RCBO is responding to earth leakage that coincides with high load - the appliance may leak more when hot or under stress. Check earth leakage with a clamp meter when the load is connected."
  },
  {
    question: "How do I determine if an RCD itself is faulty versus detecting real leakage?",
    answer: "Use a clamp meter on the circuit neutral to measure earth leakage current. If you see significant leakage (more than half the RCD rating) when the RCD trips, it's detecting real current. If there's minimal leakage but it still trips, the RCD may be faulty. Also try the test button - if it doesn't trip correctly, the RCD mechanism has failed."
  },
  {
    question: "My MCB trips in hot weather but not in winter. Why?",
    answer: "MCB thermal elements are affected by ambient temperature. In hot weather, the bimetallic strip is already partially heated, so less load current is needed to reach trip temperature. Also, cables have reduced current capacity in higher ambient temperatures. The circuit may be marginally overloaded, with hot weather pushing it over the edge."
  }
];

const Level3Module4Section3_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">

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
        

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>MCB instant trip:</strong> Short circuit or earth fault - magnetic operation</li>
              <li><strong>MCB slow trip:</strong> Overload condition - thermal operation</li>
              <li><strong>RCD trip:</strong> Earth leakage exceeding threshold (typically 30mA)</li>
              <li><strong>RCBO trip:</strong> Either overcurrent or earth leakage - identify which</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Trips with no load = wiring fault, not appliance</li>
              <li><strong>Spot:</strong> Trips at specific time = timed load causing issue</li>
              <li><strong>Use:</strong> Clamp meter on neutral measures earth leakage</li>
              <li><strong>Use:</strong> IR test while disconnecting loads isolates fault</li>
            </ul>
          </div>
        </div>

        

        

        {/* Section 01: MCB Operation and Faults */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            MCB Operation and Faults
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Miniature Circuit Breakers (MCBs) protect cables from damage due to overcurrent. They have two distinct trip mechanisms that respond to different fault types: thermal for overloads and magnetic for short circuits. Understanding which mechanism operated tells you what type of fault you're dealing with.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Thermal Operation (Overload)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Bimetallic strip heats and bends with overcurrent</li>
                  <li>Trip time inversely proportional to current magnitude</li>
                  <li>1.13x rated current: may not trip (designed load)</li>
                  <li>1.45x rated current: trips within 1 hour</li>
                  <li>2x rated current: trips within seconds to minutes</li>
                  <li>Indicates too many/powerful loads for circuit rating</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Magnetic Operation (Short Circuit)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Solenoid trips instantly at high current</li>
                  <li>Type B: 3-5x rated current (general use)</li>
                  <li>Type C: 5-10x rated current (motor circuits)</li>
                  <li>Type D: 10-20x rated current (high inrush)</li>
                  <li>Trip time: milliseconds</li>
                  <li>Indicates dead short or very low resistance fault</li>
                </ul>
              </div>
            </div>

            <p>
              When an MCB trips, note how it trips. Instant tripping (can't even complete the switch action) indicates magnetic operation and a fault current many times the rating. Delayed tripping suggests thermal operation from sustained overload. A trip that can be reset but trips again after some time under load confirms thermal/overload conditions.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>BS 7671 Reference:</strong> Regulation 433.1 requires that every circuit be designed so that conductors are protected against overcurrent by devices that disconnect before the conductor insulation is damaged. The MCB characteristics must coordinate with cable current-carrying capacity.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: RCD Tripping Diagnosis */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            RCD Tripping Diagnosis
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Residual Current Devices (RCDs) compare current flowing out on the line conductor with current returning on the neutral. Any difference means current is escaping to earth - potentially through a person. A 30mA RCD trips when this imbalance exceeds 30mA. RCD tripping always indicates earth current flow, but finding the source requires systematic investigation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common causes of RCD tripping:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Appliance fault:</strong> Degraded insulation, failed heating element, water ingress</li>
                <li><strong>Wiring fault:</strong> Damaged cable, moisture in junction box, nail/screw through cable</li>
                <li><strong>Cumulative leakage:</strong> Multiple items each leaking small amounts that total over 30mA</li>
                <li><strong>Transient events:</strong> Motor starting, power-on inrush, lightning transients</li>
                <li><strong>Neutral-earth fault:</strong> Neutral connected to earth downstream of RCD (borrowed neutral)</li>
              </ul>
            </div>

            <p>
              The half-split method is invaluable for RCD diagnosis. Turn off half the circuits on that RCD and test. If it holds, the fault is in the disconnected half. Continue splitting until you isolate the faulty circuit. Then disconnect appliances on that circuit one by one. This systematic approach finds faults faster than random testing.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> An RCD trips randomly. Using a clamp meter, you measure 24mA leakage with all loads connected. Disconnecting the electric shower reduces it to 12mA. Disconnecting the washing machine reduces it to 3mA. Individually each appliance is acceptable, but together they approach the 30mA threshold. When any transient occurs, the RCD trips. Solution: split circuits across two RCDs.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: RCBO Diagnosis */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            RCBO Diagnosis
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Residual Current Breakers with Overcurrent protection (RCBOs) combine MCB and RCD functions in one device. When an RCBO trips, you need to determine whether it was the overcurrent function or the RCD function that operated. Modern RCBOs sometimes have indicators, but often you must deduce the cause from the circumstances.
            </p>

            <div className="grid sm:grid-cols-3 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Overcurrent Trip Indicators</p>
                <ul className="text-sm text-white space-y-1">
                  <li>High load was connected when trip occurred</li>
                  <li>Trips under load, holds with no load</li>
                  <li>Insulation resistance tests healthy</li>
                  <li>No earth leakage measurable</li>
                  <li>Pattern matches thermal trip timing</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">RCD Trip Indicators</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Trips with low or no load</li>
                  <li>Trips when specific appliance used</li>
                  <li>Measurable earth leakage present</li>
                  <li>Low insulation resistance reading</li>
                  <li>Weather-related patterns</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Combination Scenarios</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Appliance shorts to earth (both causes)</li>
                  <li>Overloaded appliance has insulation breakdown</li>
                  <li>High leakage that increases under load</li>
                  <li>Motor with degraded winding insulation</li>
                  <li>Heating element with earth fault</li>
                </ul>
              </div>
            </div>

            <p>
              RCBOs provide the advantage of isolating only the faulty circuit while others remain powered. However, this means each circuit needs individual investigation when tripping occurs. Keep records of which circuits trip most often - patterns can reveal underlying issues like moisture ingress routes or aging appliances.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical tip:</strong> Test the RCBO with its test button before concluding it's faulty. If the test button operates the RCD element, the device is likely healthy. Confirm by measuring insulation resistance on the circuit - a good reading means the circuit is healthy and the RCBO is (correctly) protecting it from a connected load's leakage.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Systematic Fault Location */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Systematic Fault Location
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              When protective devices trip, resist the urge to simply reset them. Each trip is telling you something - either there's a genuine fault, or the installation has a design issue that needs addressing. Systematic investigation identifies not just what's tripping, but why, so you can apply the correct remedy.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Fault location procedure:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Step 1:</strong> Identify which device tripped and note the circumstances (time, load, weather)</li>
                <li><strong>Step 2:</strong> Attempt reset with no load connected - does it hold?</li>
                <li><strong>Step 3:</strong> If it trips unloaded, test insulation resistance to find wiring fault</li>
                <li><strong>Step 4:</strong> If it holds unloaded, reconnect loads progressively (half-split)</li>
                <li><strong>Step 5:</strong> Identify the specific load that causes tripping</li>
                <li><strong>Step 6:</strong> Determine if the trip is correct operation or nuisance tripping</li>
              </ul>
            </div>

            <p>
              Remember: most trips are correct protective device operation, not device failures. The goal is to find what the device is protecting against. Only after ruling out genuine faults should you consider whether the device itself is faulty or the installation design is inadequate (too many loads on one RCD, undersized cables, etc.).
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> A consumer reports their electrics "keep tripping". Investigation reveals only the cooker RCBO trips, and only when both ovens are used simultaneously. Load calculation shows 52A total demand on a 45A RCBO. This is correct thermal operation from genuine overload. Options: advise customer to limit simultaneous use, or upgrade to larger cable and 63A protection if the supply permits.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Tools for Protective Device Diagnosis</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Clamp meter on neutral conductor - measures earth leakage current directly</li>
                <li>Insulation resistance tester - identifies degraded insulation causing leakage</li>
                <li>RCD tester - verifies RCD trips within specification</li>
                <li>Current clamp - measures actual load current vs device rating</li>
                <li>Thermal imaging - reveals hot joints and overloaded cables</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Nuisance Trip Solutions</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>High cumulative leakage: split circuits across multiple RCDs</li>
                <li>Inrush current trips: consider Type C MCB (if cable protection maintained)</li>
                <li>Moisture-related trips: improve sealing on external fittings, ventilation</li>
                <li>Appliance leakage: repair/replace the offending appliance</li>
                <li>Power restoration surges: install time-delayed RCD upstream</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Uprating protection without checking cables</strong> - A 32A MCB on cable rated for 20A creates fire risk</li>
                <li><strong>Reducing RCD sensitivity to stop trips</strong> - 30mA is required for shock protection on most circuits</li>
                <li><strong>Assuming device failure</strong> - Most trips are correct operation; find the fault first</li>
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
                <p className="font-medium text-white mb-1">MCB Type Magnetic Trip Thresholds</p>
                <ul className="space-y-0.5">
                  <li>Type B: 3-5 x In (general circuits)</li>
                  <li>Type C: 5-10 x In (motor circuits)</li>
                  <li>Type D: 10-20 x In (high inrush)</li>
                  <li>Thermal trip: 1.45 x In within 1 hour</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">RCD Testing Requirements</p>
                <ul className="space-y-0.5">
                  <li>30mA RCD: trips between 15-30mA</li>
                  <li>Trip time at In: within 300ms</li>
                  <li>Trip time at 5xIn: within 40ms</li>
                  <li>Test button: monthly by user</li>
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
            <Link to="/study-centre/apprentice/level3-module4-section3-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Lighting Circuit Faults
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module4-section3-4">
              Next: Earthing and Bonding Issues
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module4Section3_3;
