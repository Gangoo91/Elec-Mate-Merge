/**
 * Level 3 Module 4 Section 3.2 - Lighting Circuit Faults
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Lighting Circuit Faults - Level 3 Module 4 Section 3.2";
const DESCRIPTION = "Diagnose common lighting circuit faults including switching problems, flickering lights, two-way and intermediate switching issues, and LED compatibility problems.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "A two-way lighting circuit doesn't work from either switch, but the lamp holder has 230V present. What is the most likely fault?",
    options: [
      "Faulty lamp",
      "Open circuit in the neutral or CPC",
      "Both switches are faulty",
      "The MCB has tripped"
    ],
    correctIndex: 1,
    explanation: "If 230V is present at the lamp holder but the light doesn't work, the circuit is incomplete. With voltage present on the line side, the break must be in the return path - either the neutral conductor or a connection issue. The neutral being open means current cannot flow to complete the circuit."
  },
  {
    id: "check-2",
    question: "LED downlights on a dimmer circuit flicker constantly. The dimmer is a standard leading-edge type. What is the likely cause?",
    options: [
      "The LED drivers are failing",
      "Incompatible dimmer - LEDs require trailing-edge dimmers",
      "The neutral has high resistance",
      "The circuit is overloaded"
    ],
    correctIndex: 1,
    explanation: "Standard leading-edge dimmers are designed for incandescent and halogen loads. LEDs require trailing-edge dimmers because of their different electrical characteristics. Leading-edge dimmers can cause flickering, buzzing, and premature LED failure due to the sharp voltage transitions."
  },
  {
    id: "check-3",
    question: "One light on a radial lighting circuit is dead, but all others work. The MCB is on. What should you check first?",
    options: [
      "The lamp itself, then the lamp holder connections",
      "The main fuse at the consumer unit",
      "All other lights on the circuit",
      "The earthing at the consumer unit"
    ],
    correctIndex: 0,
    explanation: "With other lights working, the supply is healthy up to the junction point before this light. Start with the simplest causes: the lamp itself (most common), then the lamp holder connections. Check for loose terminals, corroded contacts, or a failed lamp holder before investigating wiring."
  },
  {
    id: "check-4",
    question: "A three-way intermediate switching circuit only works from two of the three switch positions. What is the likely fault?",
    options: [
      "The intermediate switch is wired incorrectly or faulty",
      "One of the two-way switches has failed",
      "The lamp has a loose connection",
      "The neutral is disconnected"
    ],
    correctIndex: 0,
    explanation: "In intermediate switching, if two positions work but one doesn't, the intermediate switch is the prime suspect. Either it's wired incorrectly (common wiring error) or the switch mechanism has failed. The intermediate switch has four terminals that must cross-connect the two strappers correctly."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A lighting circuit MCB trips when a specific light switch is operated. Insulation resistance between L and E on that circuit shows 0.3 megohms. This indicates:",
    options: [
      "Normal insulation resistance for a lighting circuit",
      "Insulation breakdown - likely damaged cable or faulty fitting",
      "The MCB is oversensitive and should be replaced",
      "Too many lights on the circuit"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 requires minimum 1 megohm insulation resistance. 0.3 megohms indicates significant insulation breakdown, likely where the cable is damaged or a fitting has moisture ingress. This allows earth leakage current that may trip RCDs, or in severe cases can cause short circuits."
  },
  {
    id: 2,
    question: "A customer reports that their hallway light 'takes a second to come on'. The fitting uses a CFL lamp. What should you advise?",
    options: [
      "The switch contacts are worn and need replacement",
      "This is normal CFL behaviour - they warm up before reaching full brightness",
      "There is a high resistance connection that needs investigation",
      "The circuit cable is undersized"
    ],
    correctAnswer: 1,
    explanation: "CFLs (Compact Fluorescent Lamps) have an inherent warm-up time due to the gas ionisation process. This is normal behaviour, not a fault. If the customer finds this unacceptable, suggest upgrading to LED lamps which reach full brightness instantly."
  },
  {
    id: 3,
    question: "On a loop-in ceiling rose system, you find three cables at the rose but the light doesn't work from either switch position. Voltage testing shows 230V between L and N at the rose. The fault is likely:",
    options: [
      "In the switch wire cable between the rose and switches",
      "In the supply cable from the previous rose",
      "The lamp is blown",
      "The neutral block in the rose is damaged"
    ],
    correctAnswer: 0,
    explanation: "With 230V present between L and N at the rose, supply is reaching the fitting. If both switch positions fail to light the lamp, the switch wire is the problem - either an open circuit in the cable, faulty switches, or incorrect connections at the rose terminals."
  },
  {
    id: 4,
    question: "LED lamps on a circuit controlled by an occupancy sensor flash briefly every few seconds when the room is unoccupied. What causes this?",
    options: [
      "Faulty LED driver circuitry",
      "The sensor is detecting small movements",
      "Leakage current through the sensor keeps the LEDs partially charged",
      "The circuit has a neutral fault"
    ],
    correctAnswer: 2,
    explanation: "Many electronic switches, sensors, and dimmers allow small leakage currents when 'off'. Incandescent lamps dissipate this as heat, but LED drivers can charge up and flash when the accumulated energy discharges. Solutions include fitting a bypass capacitor or using sensor-compatible LEDs."
  },
  {
    id: 5,
    question: "When testing a two-way switch circuit, you measure 230V between COM and L1 on one switch, and 0V between COM and L1 on the other. What does this tell you?",
    options: [
      "One switch is faulty",
      "The circuit is wired correctly - voltage depends on switch positions",
      "There is a short circuit in the strapper cables",
      "The neutral is connected to a switch terminal"
    ],
    correctAnswer: 1,
    explanation: "This is normal operation. In two-way switching, voltage readings at the switches depend on the positions of both switches. When the strappers are on different terminals, one switch will show voltage (feeding dead strapper) while the other shows none (live strapper connected to lamp)."
  },
  {
    id: 6,
    question: "All lights on a circuit work, but there's a burning smell from one ceiling rose. Investigation reveals discoloured terminals. What is the diagnosis?",
    options: [
      "The lamp wattage exceeds the rose rating",
      "High resistance joint causing localised overheating",
      "The cable insulation is inadequate",
      "Normal heating from long-term use"
    ],
    correctAnswer: 1,
    explanation: "Discoloured terminals indicate overheating from a high resistance joint. Even small resistances at connections cause P=I2R heating. This is particularly dangerous in plastic ceiling roses which can melt or ignite. The joint requires re-termination with properly tightened connections."
  },
  {
    id: 7,
    question: "A customer's bathroom extract fan runs but the light doesn't work. Both are controlled by the same switch. What should you check?",
    options: [
      "The light fitting connections - the fan proves the switch and supply work",
      "The switch contacts - they may only partially work",
      "The circuit MCB - it may be faulty",
      "The extract fan wiring - it may be stealing current"
    ],
    correctAnswer: 0,
    explanation: "If the fan runs, the switch is operating and supply is present. The fault must be in the light circuit specifically - either the lamp, lamp holder, or connections to the light fitting. Check the lamp first, then the terminations at the light fitting and any junction boxes in the lighting spur."
  },
  {
    id: 8,
    question: "A lighting circuit has six ceiling fittings. Insulation resistance tests 150 megohms with all lamps removed, but only 0.8 megohms with lamps installed. What does this indicate?",
    options: [
      "The installed lamps are faulty and should all be replaced",
      "This is normal - some lamp types have inherent insulation leakage",
      "The lamp holders have moisture ingress",
      "The circuit wiring has degraded"
    ],
    correctAnswer: 1,
    explanation: "Some lamp types, particularly CFLs and older electronic lamps, have capacitors or filters that create paths to earth. This can significantly reduce measured insulation resistance. The test with lamps removed (150 megohms) shows the fixed wiring is healthy. This is normal behaviour, not a fault."
  },
  {
    id: 9,
    question: "Emergency lighting fails to illuminate during a mains power cut. The batteries test fully charged. What is the likely fault?",
    options: [
      "The charger circuit is malfunctioning",
      "The changeover relay or inverter has failed",
      "The lamps need replacing",
      "The circuit neutral is disconnected"
    ],
    correctAnswer: 1,
    explanation: "With healthy batteries and failed operation on mains loss, the changeover mechanism has failed. This is the relay or electronic circuit that switches from mains to battery power when supply is lost. Emergency lighting requires regular testing and maintenance to ensure changeover reliability."
  },
  {
    id: 10,
    question: "Kitchen downlights have a noticeable warm-up period where they're dim for 2-3 minutes. The lamps are halogen. What is the cause?",
    options: [
      "Normal halogen behaviour in cold environments",
      "Voltage drop due to long cable runs",
      "Likely electronic transformer issue - not providing full output initially",
      "The dimmer switch is faulty"
    ],
    correctAnswer: 2,
    explanation: "Halogen lamps should reach full brightness almost instantly. A warm-up period suggests the electronic transformer isn't providing full output voltage initially, possibly due to a failing component or thermal protection activating. Replace the transformer if this behaviour persists."
  },
  {
    id: 11,
    question: "A lighting circuit tests correctly but the RCD trips when certain lights are switched on during wet weather. What should you investigate?",
    options: [
      "The RCD sensitivity setting",
      "External fittings or junction boxes with moisture ingress",
      "The cable size throughout the circuit",
      "The supply voltage during wet weather"
    ],
    correctAnswer: 1,
    explanation: "Symptoms that correlate with weather conditions strongly suggest moisture ingress. External fittings, junction boxes in unheated spaces, or cables passing through damp areas can accumulate moisture that creates leakage paths. Inspect all accessible points for signs of water, corrosion, or condensation."
  },
  {
    id: 12,
    question: "A 1.5mm2 lighting circuit is 35 metres from the consumer unit to the furthest fitting. Voltage drop calculations show 4.2% with the design load. Is this acceptable?",
    options: [
      "No - lighting circuits are limited to 3% voltage drop",
      "Yes - BS 7671 allows up to 5% voltage drop for lighting",
      "No - 1.5mm2 cable cannot be used for runs over 30 metres",
      "Yes - but only if the circuit has fewer than 8 points"
    ],
    correctAnswer: 0,
    explanation: "BS 7671 Table 4Ab recommends maximum 3% voltage drop for lighting circuits (compared to 5% for power). 4.2% exceeds this and could cause noticeable dimming, particularly at the end of the circuit. Solutions include using larger cable (2.5mm2) or reducing the load."
  }
];

const faqs = [
  {
    question: "Why do my LED lights flicker when the dimmer is at low settings?",
    answer: "Most LED flickering is caused by incompatible dimmers. Standard leading-edge dimmers designed for incandescent lamps cause LEDs to flicker because the minimum load is too low and the switching method doesn't suit LED drivers. Use a trailing-edge LED-specific dimmer, ensure your LEDs are dimmable, and check the dimmer's minimum load rating matches your LED load."
  },
  {
    question: "How do I identify which cable is which at a two-way switch?",
    answer: "At a two-way switch, COM is the common terminal (switch output), L1 and L2 are the strapper terminals. Test with a voltmeter: the cable with permanent 230V to earth feeds COM on one switch. The two strapper cables connect L1 to L1 and L2 to L2 between switches. The final cable from COM on switch two goes to the lamp."
  },
  {
    question: "Can I replace a ceiling rose with a junction box and separate lamp holder?",
    answer: "Yes, provided you maintain the same wiring arrangement. Ensure the junction box is accessible (loft space above) and suitable for the cable size. Mark the switch wire clearly as it will be live when the switch is on. This is often done when installing modern fittings that don't accommodate multiple cables."
  },
  {
    question: "Why would a light work intermittently with the switch in one position only?",
    answer: "This indicates a problem with one strapper (in two-way switching) or a faulty switch. If it works in one position but not the other, the switch or strapper cable for the failing position has an open circuit. Test continuity through each switch position and check the strapper cable for damage, especially at terminations."
  },
  {
    question: "How do I test if a lamp holder is faulty?",
    answer: "Isolate the circuit and remove the lamp. Test continuity from the incoming line terminal to the centre contact, and from the neutral terminal to the outer contact (screw shell). Both should show low resistance when properly connected. Also check for physical damage, burnt contacts, or loose terminal screws that could cause intermittent connections."
  },
  {
    question: "My lights dim when other appliances switch on. Is this a fault?",
    answer: "Brief dimming when large loads start (kettles, heaters) can be normal due to voltage drop. However, persistent or significant dimming indicates a problem: undersized supply cables, loose connections at the consumer unit or meter, or supply issues. Check terminations in the consumer unit first - high resistance here affects all circuits."
  }
];

const Level3Module4Section3_2 = () => {
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
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 4.3.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Lighting Circuit Faults
          </h1>
          <p className="text-white/80">
            Diagnosing switching problems, flickering lights, and modern lamp compatibility issues
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Single light out:</strong> Check lamp, holder, then connections</li>
              <li><strong>Flickering LEDs:</strong> Usually dimmer incompatibility</li>
              <li><strong>Switch doesn't work:</strong> Test switch, strappers, terminations</li>
              <li><strong>All lights out:</strong> MCB, main neutral, supply issue</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Discoloured rose = high resistance joint</li>
              <li><strong>Spot:</strong> Works one position only = strapper fault</li>
              <li><strong>Use:</strong> Voltage test at lamp holder confirms supply</li>
              <li><strong>Use:</strong> Lamp removed IR test isolates fitting from circuit</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Diagnose faults in one-way, two-way, and intermediate switching",
              "Understand LED and CFL compatibility issues with dimmers",
              "Identify high resistance joints in lighting circuits",
              "Test loop-in and junction box wiring systems",
              "Troubleshoot intermittent lighting faults",
              "Apply voltage drop limits to lighting circuit design"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Lighting Circuit Fundamentals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Lighting Circuit Fundamentals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Lighting circuits in UK domestic installations typically use 1.0mm2 or 1.5mm2 cable, protected by a 6A MCB (or sometimes 10A for larger circuits). The low current nature of lighting means faults often manifest differently from power circuits - high resistance joints may not trip protective devices but can cause flickering, dimming, or overheating.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Two common wiring methods:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Loop-in at ceiling rose:</strong> All connections made at the rose - supply, switch wire, and feed to next point. Three cables typically present.</li>
                <li><strong>Junction box system:</strong> Supply runs to junction boxes in ceiling void. Separate drops to switches and fittings. Ceiling rose has one cable only.</li>
                <li>Modern installations often use a combination, with junction boxes for complex switching and loop-in for simple arrangements.</li>
              </ul>
            </div>

            <p>
              Understanding which system is installed helps locate faults. In loop-in systems, problems often occur at ceiling roses where multiple connections are made. In junction box systems, accessible J-boxes in the loft space are common fault locations where connections loosen over time.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>BS 7671 Reference:</strong> Regulation 559.6.1.2 requires that luminaire supporting couplers and DCL connectors are not used as a means of connecting luminaire wiring to the fixed installation in circuits exceeding 16A or where conductor size exceeds 2.5mm2.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Two-Way and Intermediate Switching */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Two-Way and Intermediate Switching
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Two-way switching is common in hallways, stairs, and bedrooms - anywhere a light needs control from two locations. Add an intermediate switch for three or more control positions. These circuits have more connection points and are therefore more prone to faults than simple one-way switching.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Two-Way Switch Terminals</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>COM (Common):</strong> Switch output - connects to supply or lamp</li>
                  <li><strong>L1:</strong> Strapper 1 terminal</li>
                  <li><strong>L2:</strong> Strapper 2 terminal</li>
                  <li>Strappers connect L1 to L1 and L2 to L2</li>
                  <li>Switching selects which strapper is live</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Intermediate Switch Terminals</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>L1, L2:</strong> Input from one two-way switch</li>
                  <li><strong>L3, L4:</strong> Output to the other two-way switch</li>
                  <li>Switch cross-connects L1/L2 to L3/L4</li>
                  <li>Two internal switching positions</li>
                  <li>Effectively reverses the strapper connections</li>
                </ul>
              </div>
            </div>

            <p>
              Common faults include: loose strapper connections at terminals, broken strapper cables (especially where run through door frames), failed switch mechanisms, and incorrect wiring where switches have been replaced. Always test at multiple switch positions to isolate which component has failed.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> A staircase light works from downstairs but not from upstairs. Both switch positions downstairs work correctly. This indicates the fault is specific to the upstairs switch - either the switch mechanism itself or the connections at that switch. The strappers and lamp are proven working by the downstairs operation.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: LED and Modern Lamp Issues */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            LED and Modern Lamp Issues
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The transition from incandescent to LED lighting has created new fault categories. LED lamps contain electronic driver circuits that interact differently with dimmers, sensors, and even the installation wiring. Understanding these differences is essential for modern fault diagnosis.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common LED problems and their causes:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Flickering on dimmers:</strong> Leading-edge dimmers incompatible with LED drivers - need trailing-edge</li>
                <li><strong>Flashing when 'off':</strong> Leakage current through electronic switches, dimmers, or neon indicators</li>
                <li><strong>Short lifespan:</strong> Overheating in enclosed fittings, poor quality drivers, voltage fluctuations</li>
                <li><strong>Colour inconsistency:</strong> Mixed LED batches, driver failure affecting colour temperature</li>
                <li><strong>Buzzing/humming:</strong> Dimmer incompatibility, poor quality LED driver, vibrating components</li>
              </ul>
            </div>

            <p>
              When diagnosing LED issues, first check compatibility between the lamp, dimmer (if fitted), and any control devices. Many problems are solved by upgrading to LED-compatible dimmers or fitting bypass capacitors to eliminate ghost currents. For non-dimmable circuits, ensure the switch is purely mechanical - electronic switches may cause issues.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical tip:</strong> The minimum load of a dimmer matters. A 60W leading-edge dimmer may not function correctly with a 4W LED. Either upgrade to a low-load dimmer or fit a resistive 'dummy load' to reach the minimum threshold (though this wastes energy).
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Systematic Lighting Fault Diagnosis */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Systematic Lighting Fault Diagnosis
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Lighting faults require systematic diagnosis. Start with the simplest possibilities (lamp failure) before investigating wiring. Use logic to narrow down fault locations based on what is and isn't working.
            </p>

            <div className="grid sm:grid-cols-3 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Single Light Out</p>
                <ul className="text-sm text-white space-y-1">
                  <li>1. Check lamp - most common cause</li>
                  <li>2. Check lamp holder contacts</li>
                  <li>3. Check switch operation</li>
                  <li>4. Test voltage at lamp holder</li>
                  <li>5. Trace back to last working point</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Multiple Lights Out</p>
                <ul className="text-sm text-white space-y-1">
                  <li>1. Check MCB at consumer unit</li>
                  <li>2. Test supply at first light</li>
                  <li>3. Find last working light</li>
                  <li>4. Fault is between working and dead sections</li>
                  <li>5. Check junction boxes in sequence</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Intermittent Faults</p>
                <ul className="text-sm text-white space-y-1">
                  <li>1. Check for loose connections</li>
                  <li>2. Look for heat damage at joints</li>
                  <li>3. Test when fault is present</li>
                  <li>4. Consider thermal cycling effects</li>
                  <li>5. Use thermal imaging if available</li>
                </ul>
              </div>
            </div>

            <p>
              For circuits that trip protective devices, isolate sections progressively. Remove lamps and test insulation resistance to identify the faulty section. Then examine that section visually before detailed testing. Common issues include moisture in external fittings, rodent damage to cables, and nail/screw damage through concealed cables.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> A kitchen/utility lighting circuit trips the RCD only in wet weather. Visual inspection reveals the external security light has a cracked lens allowing water ingress. The fitting tests 0.4 megohms between live and earth when damp - just enough leakage to trip a 30mA RCD. Replacing the fitting resolves the fault.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Voltage Testing at Light Fittings</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Test between line and neutral - should be approximately 230V with switch on</li>
                <li>Test between line and earth - should also be approximately 230V</li>
                <li>Test between neutral and earth - should be very low (under 2V typically)</li>
                <li>High N-E voltage indicates neutral fault or borrowed neutral</li>
                <li>Zero voltage with switch on indicates open circuit before that point</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Ceiling Rose Inspection Checklist</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Check for discolouration indicating overheating</li>
                <li>Verify all terminal screws are tight</li>
                <li>Confirm correct cables in correct terminals (supply, switch, out)</li>
                <li>Check pendant flex condition and grip</li>
                <li>Look for cable damage or strain at entry points</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Not checking the lamp first</strong> - It's still the most common cause of 'light not working'</li>
                <li><strong>Assuming LED compatibility</strong> - Always verify dimmer and switch compatibility with LED loads</li>
                <li><strong>Ignoring discolouration</strong> - Any heat damage indicates a serious fault requiring attention</li>
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
                <p className="font-medium text-white mb-1">Lighting Circuit Standards</p>
                <ul className="space-y-0.5">
                  <li>Maximum voltage drop: 3%</li>
                  <li>Typical protection: 6A MCB</li>
                  <li>Standard cable: 1.0mm2 or 1.5mm2</li>
                  <li>Min insulation resistance: 1 megohm</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">LED Compatibility Requirements</p>
                <ul className="space-y-0.5">
                  <li>Trailing-edge dimmer for LEDs</li>
                  <li>Check minimum dimmer load</li>
                  <li>Dimmable LEDs only on dimmer circuits</li>
                  <li>Consider bypass capacitor for 'flashing off'</li>
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
            <Link to="/study-centre/apprentice/level3-module4-section3-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Ring and Radial Faults
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module4-section3-3">
              Next: Protective Device Tripping
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module4Section3_2;
