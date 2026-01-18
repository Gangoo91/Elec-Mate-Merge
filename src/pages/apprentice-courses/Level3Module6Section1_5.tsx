/**
 * Level 3 Module 6 Section 1.5 - Designing for Energy Efficiency and Sustainability
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Designing for Energy Efficiency and Sustainability - Level 3 Module 6 Section 1.5";
const DESCRIPTION = "Learn to incorporate energy efficiency principles, sustainability requirements, and Building Regulations Part L compliance into electrical system designs.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "Which Building Regulation covers energy efficiency requirements for electrical installations?",
    options: [
      "Part P - Electrical Safety",
      "Part L - Conservation of Fuel and Power",
      "Part M - Access",
      "Part B - Fire Safety"
    ],
    correctIndex: 1,
    explanation: "Building Regulations Part L covers conservation of fuel and power. It sets requirements for energy-efficient lighting, controls, and metering that directly affect electrical design. Part L has different versions for new buildings (L1A/L2A) and existing buildings (L1B/L2B)."
  },
  {
    id: "check-2",
    question: "What is the purpose of sub-metering in commercial building electrical design?",
    options: [
      "Only to split electricity bills between tenants",
      "To enable monitoring of energy consumption by zone or end-use for management purposes",
      "To replace the main meter",
      "Only required for industrial buildings"
    ],
    correctIndex: 1,
    explanation: "Sub-metering enables energy consumption to be monitored by zone, floor, or end-use (lighting, power, HVAC). This data supports energy management, identifies waste, enables tenant billing, and is required by Part L for buildings over certain sizes."
  },
  {
    id: "check-3",
    question: "What is power factor and why does improving it benefit a commercial installation?",
    options: [
      "Power factor is cable thickness - thicker is better",
      "Power factor is the ratio of real power to apparent power - improving it reduces current for same load",
      "Power factor only matters for domestic installations",
      "Power factor is the number of phases - three is better than one"
    ],
    correctIndex: 1,
    explanation: "Power factor is the ratio of real power (kW) to apparent power (kVA). Poor power factor (below 0.9) means higher current flows for the same useful work, increasing losses, cable sizes, and often incurring reactive power charges from suppliers. Correction improves efficiency."
  },
  {
    id: "check-4",
    question: "What percentage of lighting energy can typically be saved by installing presence detection in suitable areas?",
    options: [
      "5-10%",
      "30-50%",
      "Less than 1%",
      "Over 90%"
    ],
    correctIndex: 1,
    explanation: "Presence detection typically saves 30-50% of lighting energy in areas with intermittent occupancy (toilets, meeting rooms, corridors). Savings vary with occupancy patterns - areas rarely occupied save more, continuously occupied areas save less. Part L requires automatic controls in many situations."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Building Regulations Part L requires minimum lighting efficacy (lumens per circuit watt) of:",
    options: [
      "25 lm/W for all areas",
      "60 lm/W average across the building with 55 lm/W minimum per luminaire",
      "100 lm/W minimum throughout",
      "No minimum - any lighting is acceptable"
    ],
    correctAnswer: 1,
    explanation: "Part L (2021) requires average lighting efficacy of 60 lumens per circuit watt across a building, with no luminaire below 55 lm/W. This effectively mandates LED lighting in most applications. Circuit watts include control gear losses, not just lamp power."
  },
  {
    id: 2,
    question: "What automatic control is required for lighting in Part L compliant buildings?",
    options: [
      "No controls required - manual only",
      "Time scheduling only",
      "Automatic on/off or dimming based on occupancy and/or daylight in appropriate areas",
      "Only emergency lighting needs controls"
    ],
    correctAnswer: 2,
    explanation: "Part L requires automatic lighting controls including: absence/presence detection for intermittently occupied areas, daylight dimming near windows, and time scheduling for after-hours operation. The specific requirements depend on building type and area use."
  },
  {
    id: 3,
    question: "Why is cable sizing relevant to energy efficiency?",
    options: [
      "It isn't - cables don't use energy",
      "Larger cables have lower resistance, reducing I²R power losses during current flow",
      "Smaller cables are always more efficient",
      "Cable colour affects efficiency"
    ],
    correctAnswer: 1,
    explanation: "Cables have resistance that causes power loss as heat (P = I²R). Larger cables have lower resistance, reducing these losses. For long, heavily loaded circuits, the cost of larger cables may be recovered through energy savings over the installation's life. This is economic cable sizing."
  },
  {
    id: 4,
    question: "What is a BREEAM assessment and how does it affect electrical design?",
    options: [
      "A type of cable test",
      "An environmental assessment method that awards credits for sustainable design features",
      "A Building Regulations requirement",
      "An electrical safety certification"
    ],
    correctAnswer: 1,
    explanation: "BREEAM (Building Research Establishment Environmental Assessment Method) rates buildings on sustainability. Electrical credits are available for energy efficient lighting, sub-metering provision, low-loss transformers, and responsive lighting controls. Many commercial projects target specific BREEAM ratings."
  },
  {
    id: 5,
    question: "Power factor correction capacitors should be installed:",
    options: [
      "At every socket outlet",
      "Centrally at the main distribution board or at major inductive loads",
      "Only in domestic installations",
      "Power factor correction is not permitted"
    ],
    correctAnswer: 1,
    explanation: "Power factor correction is typically provided centrally (automatic capacitor banks at the main intake) for site-wide correction, or at individual large motors/transformers for local correction. Central systems can be automatically controlled to match varying load conditions."
  },
  {
    id: 6,
    question: "What is the purpose of a Building Management System (BMS) interface in electrical design?",
    options: [
      "Only for fire alarm systems",
      "To enable central monitoring and control of lighting, power, and other building services",
      "To replace all manual switches",
      "Only required for hospitals"
    ],
    correctAnswer: 1,
    explanation: "BMS interfaces enable central monitoring of energy consumption, fault conditions, and equipment status. They allow coordinated control of lighting with HVAC, automatic scheduling, and collection of energy data. Provision for BMS interfaces should be included in electrical design from the outset."
  },
  {
    id: 7,
    question: "LED lighting has largely replaced older technologies because:",
    options: [
      "LEDs are cheaper to purchase",
      "LEDs offer much higher efficacy (lm/W), longer life, and better controllability",
      "Building Regulations require the LED brand",
      "LEDs don't need any wiring"
    ],
    correctAnswer: 1,
    explanation: "LED lighting offers efficacy of 100-200+ lm/W compared to 50-100 lm/W for fluorescent and 10-17 lm/W for incandescent. LED life is typically 50,000+ hours versus 15,000 for fluorescent. LEDs also dim more effectively and don't contain hazardous materials like mercury."
  },
  {
    id: 8,
    question: "What is 'daylight harvesting' in lighting design?",
    options: [
      "Using solar panels to power lights",
      "Automatically dimming or switching electric lighting in response to available daylight",
      "Painting walls white to reflect light",
      "Only using skylights"
    ],
    correctAnswer: 1,
    explanation: "Daylight harvesting uses photocells to measure available daylight and automatically dims electric lighting to maintain required illumination levels. Near windows during bright conditions, lights can dim significantly or switch off, saving substantial energy in perimeter zones."
  },
  {
    id: 9,
    question: "What advantage do variable speed drives (VSDs) offer for motor-driven equipment?",
    options: [
      "They make motors run faster",
      "They reduce energy consumption by matching motor speed to load requirements",
      "They are only used for lifts",
      "They replace the need for starters"
    ],
    correctAnswer: 1,
    explanation: "VSDs (also called inverters or VFDs) vary motor speed to match demand. For fans and pumps, power consumption is proportional to the cube of speed - running at 80% speed uses only about 50% power. VSDs enable significant energy savings compared to fixed-speed operation with mechanical throttling."
  },
  {
    id: 10,
    question: "What sub-metering provision does Part L require for non-domestic buildings?",
    options: [
      "No sub-metering is required",
      "Separate metering of end-use categories (lighting, power, heating) over specified thresholds",
      "Only the main meter is required",
      "Sub-metering is voluntary"
    ],
    correctAnswer: 1,
    explanation: "Part L requires non-domestic buildings to have separate metering for major energy uses where they exceed thresholds (typically 10% of building demand). This enables monitoring of lighting, small power, heating, cooling, and other services to identify waste and verify performance."
  },
  {
    id: 11,
    question: "When designing EV charging infrastructure, what energy efficiency consideration applies?",
    options: [
      "No efficiency considerations apply to EV charging",
      "Load management to prevent excessive peak demand and enable off-peak charging",
      "Only the cable colour matters",
      "EV charging should only use solar power"
    ],
    correctAnswer: 1,
    explanation: "EV charging can significantly increase peak demand if unmanaged. Smart charging with load management can schedule charging during off-peak periods, balance load across multiple charge points, and integrate with renewable generation. This reduces infrastructure costs and supports grid efficiency."
  },
  {
    id: 12,
    question: "What is the benefit of specifying low-loss distribution transformers?",
    options: [
      "They are smaller",
      "They reduce no-load and load losses, saving energy over their operational life",
      "They don't require earthing",
      "They are only used in power stations"
    ],
    correctAnswer: 1,
    explanation: "Distribution transformers have losses even when lightly loaded (no-load/core losses) and additional losses proportional to load (load/copper losses). Low-loss designs use improved core materials and windings to reduce both. Over a 20+ year life, the energy savings can significantly outweigh higher purchase cost."
  }
];

const faqs = [
  {
    question: "How do I demonstrate Part L compliance for lighting?",
    answer: "Calculate the average circuit efficacy (total lumens divided by total circuit watts) for the building and each luminaire's individual efficacy. Document lighting controls provision (occupancy, daylight, scheduling). Submit this with the building control application. Many projects use approved lighting design software to generate Part L compliance reports."
  },
  {
    question: "Is power factor correction always cost-effective?",
    answer: "It depends on the load profile and electricity tariff. If the supplier charges for reactive power (kVArh), correction directly reduces costs. Even without reactive charges, improving power factor reduces current, potentially allowing smaller cables and switchgear. Calculate payback based on actual tariffs and expected loads."
  },
  {
    question: "What BREEAM credits are available for electrical design?",
    answer: "Electrical credits include: Ene 01 (energy performance - lighting efficiency contributes), Ene 02 (energy monitoring via sub-metering), Hea 01 (visual comfort - lighting quality), and Pol 02 (NOx emissions from standby generation). Credit requirements are detailed in the BREEAM technical manual for the relevant scheme."
  },
  {
    question: "How do I size cables for economic efficiency rather than just minimum compliance?",
    answer: "Calculate energy loss cost over the cable's expected life using P = I²R for average loading. Compare cable sizes considering both capital cost and energy cost. For long, heavily-loaded circuits (especially 3-phase), one size larger than minimum may show positive return on investment through reduced losses."
  },
  {
    question: "What lighting controls are most cost-effective?",
    answer: "Presence detection gives highest returns in intermittently occupied spaces (toilets, meeting rooms) - 30-50% savings. Daylight dimming works well in perimeter zones with good glazing - 20-40% savings. Time scheduling is essential for out-of-hours control. Combine strategies for best results."
  },
  {
    question: "How does the design accommodate future renewable energy integration?",
    answer: "Include provisions for future PV installation: space in distribution boards, containment routes to roof, structural capacity. For EV charging: spare capacity in supply and distribution, containment for future charge points. Design main switchgear to accept renewable inputs with appropriate protection and metering."
  }
];

const Level3Module6Section1_5 = () => {
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
            <Link to="/study-centre/apprentice/level3-module6-section1">
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
            <span>Module 6.1.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Designing for Energy Efficiency and Sustainability
          </h1>
          <p className="text-white/80">
            Incorporating energy efficiency and sustainability into electrical design
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Part L:</strong> Building Regs energy requirements</li>
              <li><strong>Lighting:</strong> 60 lm/W average, auto controls</li>
              <li><strong>Metering:</strong> Sub-meters for major end-uses</li>
              <li><strong>Power factor:</strong> Correct to above 0.95</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Energy Measures</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>LED lighting:</strong> 100-200 lm/W efficacy</li>
              <li><strong>Presence detection:</strong> 30-50% savings</li>
              <li><strong>Daylight dimming:</strong> 20-40% savings</li>
              <li><strong>VSDs:</strong> Match speed to demand</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply Building Regulations Part L to electrical design",
              "Design energy-efficient lighting systems with controls",
              "Incorporate sub-metering for energy management",
              "Understand power factor correction requirements",
              "Specify variable speed drives for motor efficiency",
              "Design for BREEAM and other sustainability standards"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Building Regulations Part L */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Building Regulations Part L
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Building Regulations Part L sets mandatory requirements for energy efficiency in buildings. For electrical installations, this primarily affects lighting design, including lamp efficacy, control systems, and metering provisions. Compliance must be demonstrated through calculations and specifications submitted to building control.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Part L Key Requirements for Electrical:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Lighting efficacy:</strong> Average 60 lm/W circuit watts, minimum 55 lm/W per luminaire</li>
                <li><strong>Lighting controls:</strong> Automatic presence/absence detection in intermittent areas</li>
                <li><strong>Daylight control:</strong> Dimming or switching for zones within 6m of windows</li>
                <li><strong>Time scheduling:</strong> Automatic off for out-of-hours operation</li>
                <li><strong>Metering:</strong> Sub-metering for end uses exceeding 10% of total</li>
                <li><strong>Energy displays:</strong> For renewable generation where provided</li>
              </ul>
            </div>

            <p>
              Part L has separate requirements for new buildings (L1A for dwellings, L2A for other buildings) and work on existing buildings (L1B, L2B). The requirements also vary slightly between England, Wales, Scotland, and Northern Ireland. Always check the applicable version for your project.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Compliance Note:</strong> Circuit watts include all power consumed, including control gear losses. When calculating efficacy, use the total power drawn by the circuit, not just the lamp wattage. LED drivers and fluorescent ballasts add to circuit power.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Energy Efficient Lighting */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Energy Efficient Lighting Design
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Lighting typically accounts for 20-40% of electricity use in commercial buildings, making it a prime target for energy savings. Modern LED technology offers dramatic improvements over older lamp types, and intelligent controls ensure lighting is only used when and where needed.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">LED Advantages</p>
                <ul className="text-sm text-white space-y-1">
                  <li>100-200+ lm/W efficacy</li>
                  <li>50,000+ hour rated life</li>
                  <li>Instant start - no warm-up</li>
                  <li>Excellent dimming response</li>
                  <li>No mercury content</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Control Strategies</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Presence detection (PIR/microwave)</li>
                  <li>Absence detection (manual on)</li>
                  <li>Daylight dimming (photocells)</li>
                  <li>Time scheduling (BMS)</li>
                  <li>Scene setting (meeting rooms)</li>
                </ul>
              </div>
            </div>

            <p>
              Control strategy selection depends on the space use. Toilets benefit from presence detection (lights on when occupied). Open-plan offices may use absence detection (manual on, auto off after vacancy) with daylight dimming for perimeter zones. Meeting rooms need manual control plus auto-off when vacant.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Savings Example:</strong> A 1000m² office with 15 W/m² lighting load operating 3000 hours/year uses 45,000 kWh annually. Adding presence detection (30% saving) and daylight dimming (20% saving) reduces this to approximately 25,000 kWh - saving 20,000 kWh and around £3,000 per year at typical rates.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Sub-Metering and Monitoring */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Sub-Metering and Energy Monitoring
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              You cannot manage what you cannot measure. Sub-metering provides the data needed to understand energy consumption patterns, identify waste, verify savings from efficiency measures, and allocate costs to tenants or departments. Part L mandates sub-metering above specified thresholds.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Sub-Metering Strategy:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>By end use:</strong> Lighting, small power, HVAC, specialist equipment</li>
                <li><strong>By zone:</strong> Floor-by-floor, wing-by-wing, or tenant-by-tenant</li>
                <li><strong>Major loads:</strong> Individual metering for large equipment (chillers, kitchens, server rooms)</li>
                <li><strong>Renewable generation:</strong> Separate metering of PV output, heat pump consumption</li>
              </ul>
            </div>

            <p>
              Modern metering uses digital meters with communication capabilities - pulse outputs, Modbus, M-Bus, or IP connectivity. The design should include infrastructure for meter communication to a Building Management System or dedicated energy monitoring platform. Provisions for current transformers (CTs) should be included in distribution board design.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design Tip:</strong> Include CT pockets and meter mounting space in distribution board specifications from the outset. Retrofitting metering is expensive and disruptive. Even if meters aren't installed initially, the provisions allow easy future installation.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Power Factor and Losses */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Power Factor and Distribution Losses
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electrical efficiency extends beyond equipment selection to the distribution system itself. Power factor affects the current flowing for any given real power demand, while cable and transformer losses convert electrical energy into heat. Good design minimises these losses.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Power Factor</p>
                <p className="text-white/90 text-xs">Target 0.95+ to reduce current and losses</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Cable Sizing</p>
                <p className="text-white/90 text-xs">Consider economic size for long, loaded circuits</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Transformer Efficiency</p>
                <p className="text-white/90 text-xs">Specify low-loss designs for 24/7 loads</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Voltage Drop</p>
                <p className="text-white/90 text-xs">Lower voltage drop = lower losses</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Load Balancing</p>
                <p className="text-white/90 text-xs">Balance phases to minimise neutral current</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">VSDs</p>
                <p className="text-white/90 text-xs">Match motor speed to actual demand</p>
              </div>
            </div>

            <p>
              Power factor correction using capacitors (or active correction units) reduces the reactive current component, lowering total current for the same real power. This reduces cable losses (I²R), may allow smaller cables, and reduces or eliminates reactive power charges from electricity suppliers.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Power Factor Example:</strong> A 100kW load at 0.7 power factor draws 143kVA (619A at 230V). Correcting to 0.95 power factor reduces apparent power to 105kVA (457A at 230V). Cable losses reduce by about 45%, and reactive power charges are eliminated.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Part L Compliance Checklist</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Average lighting efficacy calculated and meets 60 lm/W minimum</li>
                <li>All luminaires individually meet 55 lm/W minimum</li>
                <li>Presence/absence detection in intermittently occupied spaces</li>
                <li>Daylight dimming/switching within 6m of windows</li>
                <li>Sub-metering provisions for end uses exceeding 10%</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Energy Efficiency Opportunities</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>VSDs for all variable-load pumps and fans</li>
                <li>Power factor correction above 0.95 if reactive charges apply</li>
                <li>Economic cable sizing for long distribution routes</li>
                <li>Smart EV charging with load management</li>
                <li>Low-loss transformers for 24/7 building services</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Using lamp watts instead of circuit watts</strong> - Underestimates actual power</li>
                <li><strong>Inadequate commissioning of controls</strong> - Controls that don't work waste the investment</li>
                <li><strong>Forgetting metering infrastructure</strong> - Retrofitting meters is expensive</li>
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
                <p className="font-medium text-white mb-1">Lamp Efficacy Comparison</p>
                <ul className="space-y-0.5">
                  <li>LED: 100-200+ lm/W</li>
                  <li>Fluorescent: 50-100 lm/W</li>
                  <li>Halogen: 15-25 lm/W</li>
                  <li>Incandescent: 10-17 lm/W</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Typical Control Savings</p>
                <ul className="space-y-0.5">
                  <li>Presence detection: 30-50%</li>
                  <li>Daylight dimming: 20-40%</li>
                  <li>Time scheduling: 10-30%</li>
                  <li>Combined strategies: 40-60%</li>
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
            <Link to="/study-centre/apprentice/level3-module6-section1-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Safety and Reliability
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module6-section2">
              Next: Circuit Design Calculations
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module6Section1_5;
