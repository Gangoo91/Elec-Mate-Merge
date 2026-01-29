import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Mechanical Commissioning - HNC Module 5 Section 5.3";
const DESCRIPTION = "Master mechanical commissioning for building services: CIBSE codes A, W and R, system balancing, flow measurement, pressure testing and performance verification techniques.";

const quickCheckQuestions = [
  {
    id: "cibse-code-w",
    question: "What does CIBSE Code W primarily cover?",
    options: ["Air distribution systems", "Water distribution systems", "Refrigeration systems", "Electrical distribution systems"],
    correctIndex: 1,
    explanation: "CIBSE Commissioning Code W covers water distribution systems including LTHW (low temperature hot water), MTHW (medium temperature hot water), CHW (chilled water), and condenser water systems."
  },
  {
    id: "proportional-balancing",
    question: "In proportional balancing, what is the first step?",
    options: ["Set all valves fully open", "Close the index circuit valve", "Measure total system flow", "Identify the index circuit"],
    correctIndex: 3,
    explanation: "The first step in proportional balancing is to identify the index circuit - the circuit with the greatest resistance to flow. All other circuits are then balanced relative to this reference."
  },
  {
    id: "air-flow-tolerance",
    question: "What is the typical acceptable tolerance for air flow rates at terminals under CIBSE Code A?",
    options: ["+/- 5%", "+/- 10%", "+/- 15%", "+/- 20%"],
    correctIndex: 1,
    explanation: "CIBSE Code A specifies +/- 10% as the typical acceptable tolerance for air flow rates at terminals. This ensures adequate air distribution whilst acknowledging practical measurement limitations."
  },
  {
    id: "pressure-test-duration",
    question: "What is the minimum duration for a hydronic system pressure test under BSRIA guidance?",
    options: ["30 minutes", "1 hour", "2 hours", "24 hours"],
    correctIndex: 2,
    explanation: "BSRIA guidance recommends a minimum 2-hour pressure test at 1.5 times the working pressure for hydronic systems, allowing sufficient time to identify slow leaks and stabilise temperature effects."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which CIBSE Commissioning Code covers refrigeration systems?",
    options: [
      "CIBSE Code A",
      "CIBSE Code W",
      "CIBSE Code R",
      "CIBSE Code M"
    ],
    correctAnswer: 2,
    explanation: "CIBSE Commissioning Code R covers refrigeration systems including chillers, heat pumps, VRF/VRV systems, and direct expansion equipment."
  },
  {
    id: 2,
    question: "What does the term 'index circuit' refer to in water system balancing?",
    options: ["The circuit with the smallest flow rate", "The circuit with the greatest resistance to flow", "The first circuit off the main header", "The circuit closest to the pump"],
    correctAnswer: 1,
    explanation: "The index circuit is the circuit with the greatest resistance to flow (longest run, most fittings, or smallest pipework). It determines the system head requirements and serves as the reference for proportional balancing."
  },
  {
    id: 3,
    question: "When commissioning a variable air volume (VAV) system, terminals should first be tested at:",
    options: ["Minimum air flow", "Design air flow", "Maximum air flow", "50% of design flow"],
    correctAnswer: 2,
    explanation: "VAV terminals are first commissioned at maximum air flow to verify the system can deliver peak capacity. Minimum flow settings are then checked to ensure adequate ventilation at low load conditions."
  },
  {
    id: 4,
    question: "What is the purpose of a differential pressure regulating valve (DPRV) in a water system?",
    options: [
      "To regulate water temperature",
      "To maintain constant flow through terminal units",
      "To isolate sections for maintenance",
      "To prevent water hammer"
    ],
    correctAnswer: 1,
    explanation: "DPRVs maintain constant differential pressure across terminal branches regardless of system loading. This ensures consistent flow through two-port control valves and improves control stability."
  },
  {
    id: 5,
    question: "What is the correct sequence for commissioning an air handling unit?",
    options: [
      "Ductwork, coils, fans, filters, controls",
      "Fans, ductwork, coils, filters, controls",
      "Filters, fans, ductwork, coils, controls",
      "Controls, fans, coils, ductwork, filters"
    ],
    correctAnswer: 2,
    explanation: "The correct sequence is: install clean filters, check fan rotation and motor currents, verify ductwork integrity, test coil performance, then commission controls. Clean filters protect components during commissioning."
  },
  {
    id: 6,
    question: "A chilled water system shows design flow of 4.5 l/s. Measured flow is 4.2 l/s. What is the percentage deviation?",
    options: ["-6.7%", "-7.1%", "+6.7%", "+7.1%"],
    correctAnswer: 0,
    explanation: "Percentage deviation = ((Measured - Design) / Design) x 100 = ((4.2 - 4.5) / 4.5) x 100 = -6.7%. This is within the typical +/- 10% tolerance for water systems."
  },
  {
    id: 7,
    question: "What is the minimum superheat reading expected at a properly charged DX evaporator coil?",
    options: ["2-4K", "5-8K", "10-12K", "15-20K"],
    correctAnswer: 1,
    explanation: "A properly charged DX system should show 5-8K superheat at the evaporator outlet. Lower values indicate overcharge or liquid floodback risk; higher values suggest undercharge or restricted flow."
  },
  {
    id: 8,
    question: "When pressure testing a refrigeration system, what gas should be used?",
    options: ["Air", "Oxygen-free nitrogen (OFN)", "Carbon dioxide", "The working refrigerant"],
    correctAnswer: 1,
    explanation: "Oxygen-free nitrogen (OFN) must be used for pressure testing refrigeration systems. Air contains moisture and oxygen which can cause corrosion and contamination. Never use oxygen or the working refrigerant for testing."
  },
  {
    id: 9,
    question: "What does BSRIA BG 29 cover?",
    options: [
      "Electrical installation testing",
      "Pre-commissioning cleaning of water systems",
      "Fire alarm commissioning",
      "Lift commissioning"
    ],
    correctAnswer: 1,
    explanation: "BSRIA BG 29 'Pre-commission Cleaning of Pipework Systems' provides guidance on flushing, cleaning, and water treatment of hydronic systems prior to commissioning to ensure optimal performance and longevity."
  },
  {
    id: 10,
    question: "What instrument is used to measure air flow at a grille or diffuser?",
    options: ["Manometer", "Balometer (capture hood)", "Thermometer", "Hygrometer"],
    correctAnswer: 1,
    explanation: "A balometer (flow capture hood) is placed over the grille or diffuser to directly measure air volume flow rate (l/s or m³/h). It provides accurate readings without complex calculations or traverse measurements."
  },
  {
    id: 11,
    question: "In a constant volume air system, what is the typical design velocity in main ductwork?",
    options: ["1-2 m/s", "4-6 m/s", "8-10 m/s", "12-15 m/s"],
    correctAnswer: 1,
    explanation: "Main ductwork in constant volume systems is typically designed for 4-6 m/s velocity. This balances pressure drop (energy cost) against duct size (capital cost). Higher velocities increase noise and running costs."
  },
  {
    id: 12,
    question: "What documentation must be provided upon completion of mechanical commissioning?",
    options: [
      "Only test certificates",
      "Commissioning records, O&M manuals, and as-built drawings",
      "Manufacturer warranties only",
      "Training records only"
    ],
    correctAnswer: 1,
    explanation: "Complete commissioning handover documentation includes: commissioning records showing all test results, O&M manuals for all equipment, as-built drawings, training records, and equipment warranties."
  }
];

const faqs = [
  {
    question: "What is the difference between commissioning and testing?",
    answer: "Testing verifies that individual components work to specification (e.g., motor rotates correctly, valve opens). Commissioning is the integrated process of setting the complete system to deliver design performance - adjusting flows, pressures, and temperatures across interconnected systems. Testing is a subset of commissioning."
  },
  {
    question: "Why must water systems be flushed before commissioning?",
    answer: "Construction debris, flux residue, and mill scale contaminate water systems. BSRIA BG 29 requires pre-commissioning cleaning to remove debris that would block strainers, damage pump seals, foul heat exchanger surfaces, and impair control valve operation. Clean systems achieve design performance and have longer service life."
  },
  {
    question: "How do I balance a system with variable speed pumps?",
    answer: "Set the pump to fixed speed (design duty) during commissioning to establish baseline flows. Balance all circuits proportionally, then return the pump to variable speed mode. The BMS will modulate pump speed based on differential pressure, maintaining balanced conditions across varying loads."
  },
  {
    question: "What causes poor air distribution despite correct total air flow?",
    answer: "Common causes include: incorrect balancing damper positions, damaged or kinked flexible connections, blocked or dirty filters/grilles, missing volume control dampers, incorrect diffuser pattern settings, or pressure differences between zones. Systematic checking of each terminal against design values identifies the fault location."
  },
  {
    question: "When should refrigerant charge be adjusted during commissioning?",
    answer: "Refrigerant charge should only be adjusted after: system evacuation confirms no moisture or air, oil levels are correct, and the system has operated at stable conditions for 15-20 minutes. Check superheat and subcooling against manufacturer specifications before adding or removing charge."
  },
  {
    question: "What tolerances apply to building services commissioning?",
    answer: "Typical CIBSE tolerances are: air flow rates +/- 10% at terminals, water flow rates +/- 10%, room temperatures +/- 1K, supply air temperatures +/- 2K, and relative humidity +/- 5%. Specific project specifications may require tighter tolerances for critical applications like operating theatres or data centres."
  }
];

const HNCModule5Section5_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module5-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 5.5.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Mechanical Commissioning
          </h1>
          <p className="text-white/80">
            CIBSE codes A, W and R, system balancing, flow measurement, pressure testing and performance verification
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>CIBSE Code A:</strong> Air distribution systems</li>
              <li className="pl-1"><strong>CIBSE Code W:</strong> Water distribution systems</li>
              <li className="pl-1"><strong>CIBSE Code R:</strong> Refrigeration systems</li>
              <li className="pl-1"><strong>Key tolerance:</strong> +/- 10% for air and water flows</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Proportional balancing:</strong> Relative flow adjustment</li>
              <li className="pl-1"><strong>Pressure testing:</strong> 1.5x working pressure</li>
              <li className="pl-1"><strong>Pre-commissioning:</strong> Flushing per BSRIA BG 29</li>
              <li className="pl-1"><strong>Documentation:</strong> Records, O&M, as-builts</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand CIBSE Commissioning Codes A, W and R",
              "Apply proportional balancing techniques to water systems",
              "Commission air distribution systems to design parameters",
              "Perform pressure testing on hydronic and refrigeration systems",
              "Verify system performance against design criteria",
              "Prepare comprehensive commissioning documentation"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 1: CIBSE Commissioning Codes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            CIBSE Commissioning Codes
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Chartered Institution of Building Services Engineers (CIBSE) publishes commissioning codes
              that define standard procedures and acceptable performance criteria for building services systems.
              These codes are referenced in specifications and form the basis for commissioning contracts.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key CIBSE Commissioning Codes:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Code A:</strong> Air distribution systems (ductwork, AHUs, terminals)</li>
                <li className="pl-1"><strong>Code W:</strong> Water distribution systems (LTHW, CHW, condenser water)</li>
                <li className="pl-1"><strong>Code R:</strong> Refrigeration systems (chillers, VRF, DX equipment)</li>
                <li className="pl-1"><strong>Code C:</strong> Automatic controls (BMS, DDC systems)</li>
                <li className="pl-1"><strong>Code B:</strong> Boiler plant (now largely superseded)</li>
                <li className="pl-1"><strong>Code L:</strong> Lighting systems</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">CIBSE Code Overview</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Code</th>
                      <th className="border border-white/10 px-3 py-2 text-left">System Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Measurements</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Tolerance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Code A</td>
                      <td className="border border-white/10 px-3 py-2">Air distribution</td>
                      <td className="border border-white/10 px-3 py-2">Air flow (l/s), pressure (Pa)</td>
                      <td className="border border-white/10 px-3 py-2">+/- 10% terminals</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Code W</td>
                      <td className="border border-white/10 px-3 py-2">Water distribution</td>
                      <td className="border border-white/10 px-3 py-2">Flow (l/s), dT (K)</td>
                      <td className="border border-white/10 px-3 py-2">+/- 10% circuits</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Code R</td>
                      <td className="border border-white/10 px-3 py-2">Refrigeration</td>
                      <td className="border border-white/10 px-3 py-2">Superheat (K), subcooling (K)</td>
                      <td className="border border-white/10 px-3 py-2">Per manufacturer</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Real-World Example: Office Building HVAC</p>
              <p className="text-sm text-white/90">
                A new 10-storey office block requires commissioning of: 4 AHUs (Code A), LTHW heating circuit with
                200 FCUs (Code W), CHW cooling circuit (Code W), 2 air-cooled chillers (Code R), and BMS integration
                (Code C). The commissioning engineer must coordinate all trades, ensure pre-requisites are met, and
                demonstrate integrated system performance before handover.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design principle:</strong> CIBSE codes provide a common language between designers, installers, and commissioning engineers - ensuring consistent quality standards.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Water System Balancing */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Water System Balancing (CIBSE Code W)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Water system balancing ensures that each terminal unit receives its design flow rate. Without
              balancing, circuits closest to the pump receive excessive flow whilst remote circuits are starved,
              resulting in poor temperature control and wasted pump energy.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Proportional Balancing Method</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Identify index circuit (greatest resistance)</li>
                  <li className="pl-1">Set index regulating valve fully open</li>
                  <li className="pl-1">Measure flow at all circuits</li>
                  <li className="pl-1">Calculate flow ratios vs design</li>
                  <li className="pl-1">Adjust valves to achieve proportional balance</li>
                  <li className="pl-1">Re-measure and fine-tune</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Pre-commissioning Requirements</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">System flushed per BSRIA BG 29</li>
                  <li className="pl-1">Strainers cleaned and baskets fitted</li>
                  <li className="pl-1">Pumps proven and running correctly</li>
                  <li className="pl-1">All air vented from system</li>
                  <li className="pl-1">Expansion vessel charged correctly</li>
                  <li className="pl-1">All isolation valves fully open</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Flow Measurement Methods</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Method</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Equipment</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Accuracy</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Double regulating valve</td>
                      <td className="border border-white/10 px-3 py-2">Manometer + valve Kv</td>
                      <td className="border border-white/10 px-3 py-2">+/- 5%</td>
                      <td className="border border-white/10 px-3 py-2">Branch circuits</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Orifice plate</td>
                      <td className="border border-white/10 px-3 py-2">Differential pressure</td>
                      <td className="border border-white/10 px-3 py-2">+/- 2%</td>
                      <td className="border border-white/10 px-3 py-2">Main pipework</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ultrasonic clamp-on</td>
                      <td className="border border-white/10 px-3 py-2">Transit time meter</td>
                      <td className="border border-white/10 px-3 py-2">+/- 1-3%</td>
                      <td className="border border-white/10 px-3 py-2">Non-invasive checks</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Electromagnetic</td>
                      <td className="border border-white/10 px-3 py-2">Mag flow meter</td>
                      <td className="border border-white/10 px-3 py-2">+/- 0.5%</td>
                      <td className="border border-white/10 px-3 py-2">Permanent metering</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Calculating Flow from Differential Pressure</p>
              <p className="font-mono text-center text-lg mb-2">Q = Kv x sqrt(dP)</p>
              <p className="text-xs text-white/70 text-center mb-3">Where Q = flow (m³/h), Kv = valve coefficient, dP = differential pressure (bar)</p>
              <p className="text-sm text-white/80">
                Example: A regulating valve with Kv = 2.5 shows dP = 0.16 bar. Flow = 2.5 x sqrt(0.16) = 2.5 x 0.4 = 1.0 m³/h (0.28 l/s)
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Balance in sequence from index circuit outward, not randomly. This minimises iterations and ensures stable final settings.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Air System Commissioning */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Air System Commissioning (CIBSE Code A)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Air system commissioning verifies that ductwork, air handling units, and terminal devices deliver
              the specified air quantities to each space. This affects indoor air quality, thermal comfort, and
              energy efficiency.
            </p>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Pre-commissioning Checklist</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Ductwork pressure tested and sealed to specified leakage class</li>
                <li className="pl-1">Clean filters installed (commissioning set, not operating filters)</li>
                <li className="pl-1">Fan belts tensioned and guards fitted</li>
                <li className="pl-1">Fire dampers released and access doors closed</li>
                <li className="pl-1">All flexible connections intact and not kinked</li>
                <li className="pl-1">Volume control dampers accessible and labelled</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Air Flow Measurement Techniques</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">At Terminals</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Balometer (capture hood) - direct reading</li>
                    <li>Rotating vane anemometer with cone</li>
                    <li>Hot wire anemometer for low velocities</li>
                    <li>Calculate from face velocity x area</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">In Ductwork</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Pitot-static traverse (log-Tchebycheff)</li>
                    <li>Minimum 5D upstream, 2D downstream</li>
                    <li>Thermal anemometer traverse</li>
                    <li>Orifice plate with manometer</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">System Type Considerations</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">System Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Commissioning Approach</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Checks</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Constant Volume (CAV)</td>
                      <td className="border border-white/10 px-3 py-2">Set dampers for design flow at each terminal</td>
                      <td className="border border-white/10 px-3 py-2">Total flow, individual terminals</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Variable Air Volume (VAV)</td>
                      <td className="border border-white/10 px-3 py-2">Test at max and min positions</td>
                      <td className="border border-white/10 px-3 py-2">Box response, leakage at min</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fan Coil Units</td>
                      <td className="border border-white/10 px-3 py-2">Check each speed setting</td>
                      <td className="border border-white/10 px-3 py-2">Fan currents, filter dP, noise</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Extract/LEV</td>
                      <td className="border border-white/10 px-3 py-2">Verify capture velocities</td>
                      <td className="border border-white/10 px-3 py-2">Face velocity, containment</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Real-World Example: VAV System</p>
              <p className="text-sm text-white/90">
                A 50-box VAV system serving open-plan offices. Commissioning sequence: (1) Set AHU to 100% supply,
                (2) Drive all boxes to maximum, (3) Measure and record each box flow, (4) Adjust main dampers for
                +/- 10%, (5) Test box minimum positions for ventilation compliance, (6) Verify pressure-independent
                operation by changing system pressure, (7) Commission reheat coils if fitted.
              </p>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Site tip:</strong> Always balance supply and extract systems together. Unbalanced pressures cause door opening issues, noise, and uncontrolled infiltration.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Pressure Testing and Performance Verification */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Pressure Testing and Performance Verification
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Pressure testing verifies system integrity before commissioning begins. Performance verification
              confirms that the complete, integrated system delivers the specified conditions under representative
              load conditions.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Hydronic System Pressure Testing</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Test pressure:</strong> 1.5 x maximum working pressure (typically 4.5 bar for 3 bar systems)</li>
                <li className="pl-1"><strong>Duration:</strong> Minimum 2 hours, preferably overnight</li>
                <li className="pl-1"><strong>Acceptance:</strong> No visible leaks, pressure drop less than 0.1 bar after temperature stabilisation</li>
                <li className="pl-1"><strong>Documentation:</strong> Record initial pressure, temperature, time, and final readings</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Refrigeration System Testing</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Test</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Method</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Criteria</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Strength test</td>
                      <td className="border border-white/10 px-3 py-2">OFN at 1.1x design pressure</td>
                      <td className="border border-white/10 px-3 py-2">Hold for 10 minutes</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Leak test</td>
                      <td className="border border-white/10 px-3 py-2">OFN at design pressure</td>
                      <td className="border border-white/10 px-3 py-2">24 hours, no drop</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Evacuation</td>
                      <td className="border border-white/10 px-3 py-2">Vacuum pump to less than 500 microns</td>
                      <td className="border border-white/10 px-3 py-2">Rise test - max 200 microns/hour</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Charge verification</td>
                      <td className="border border-white/10 px-3 py-2">Superheat/subcooling measurement</td>
                      <td className="border border-white/10 px-3 py-2">Per manufacturer specs</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Performance Verification Tests</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Full load capacity test</li>
                  <li className="pl-1">Part load efficiency check</li>
                  <li className="pl-1">Setpoint response verification</li>
                  <li className="pl-1">Safety interlock testing</li>
                  <li className="pl-1">BMS point verification</li>
                  <li className="pl-1">Alarm and trend logging</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Acceptance Tolerances</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Room temperature: +/- 1K</li>
                  <li className="pl-1">Supply air temperature: +/- 2K</li>
                  <li className="pl-1">Relative humidity: +/- 5%</li>
                  <li className="pl-1">Flow rates: +/- 10%</li>
                  <li className="pl-1">Noise levels: NC/NR as specified</li>
                  <li className="pl-1">Energy consumption: within design</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Documentation Requirements</p>
              <p className="text-sm text-white/90 mb-2">Complete commissioning handover includes:</p>
              <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Commissioning records:</strong> All test sheets with measured values, design values, and deviations</li>
                <li className="pl-1"><strong>Setting schedules:</strong> Final valve positions, damper settings, BMS setpoints</li>
                <li className="pl-1"><strong>O&M manuals:</strong> Equipment data, maintenance procedures, spare parts</li>
                <li className="pl-1"><strong>As-built drawings:</strong> Reflecting actual installation</li>
                <li className="pl-1"><strong>Training records:</strong> Evidence of operator training</li>
                <li className="pl-1"><strong>Warranties:</strong> Equipment warranties and maintenance contracts</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Lead times:</strong> Allow adequate time for performance verification - summer testing of heating or winter testing of cooling may require seasonal witnessing.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Water Flow Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A double regulating valve has Kv = 4.0. The manometer reads 25 kPa differential pressure. What is the flow rate?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Convert pressure: 25 kPa = 0.25 bar</p>
                <p className="mt-2">Q = Kv x sqrt(dP)</p>
                <p>Q = 4.0 x sqrt(0.25) = 4.0 x 0.5 = <strong>2.0 m³/h</strong></p>
                <p className="mt-2">Convert to l/s: 2.0 / 3.6 = <strong>0.56 l/s</strong></p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Air Flow Deviation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A supply grille has design flow of 120 l/s. Measured flow with balometer is 108 l/s. Is this acceptable?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Deviation = ((Measured - Design) / Design) x 100%</p>
                <p>Deviation = ((108 - 120) / 120) x 100% = <strong>-10%</strong></p>
                <p className="mt-2">CIBSE Code A tolerance: +/- 10%</p>
                <p className="mt-2 text-green-400">Result: Acceptable (just within tolerance)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Proportional Balancing</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Three circuits have design flows of 1.0, 0.8, and 0.6 l/s. Measured flows with index valve (Circuit 1) fully open are: 1.2, 1.1, and 0.9 l/s. Calculate required flow ratios.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Design ratios (relative to index): 1.0/1.0=1.0, 0.8/1.0=0.8, 0.6/1.0=0.6</p>
                <p className="mt-2">Current ratios: 1.2/1.2=1.0, 1.1/1.2=0.92, 0.9/1.2=0.75</p>
                <p className="mt-2">Required adjustment:</p>
                <p>Circuit 2: 0.8/0.92 = 0.87 (close valve to reduce flow)</p>
                <p>Circuit 3: 0.6/0.75 = 0.80 (close valve to reduce flow)</p>
                <p className="mt-2 text-white/60">Adjust valves, re-measure, iterate until all within tolerance</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 4: Refrigerant Superheat Check</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> R410A system shows suction pressure of 10 bar (saturation temp 5°C) and suction line temperature of 12°C. What is the superheat?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Superheat = Actual temperature - Saturation temperature</p>
                <p>Superheat = 12°C - 5°C = <strong>7K</strong></p>
                <p className="mt-2">Normal range: 5-8K</p>
                <p className="mt-2 text-green-400">Result: Correct charge, system operating normally</p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Commissioning Sequence Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Verify all pre-commissioning activities complete (cleaning, testing)</li>
                <li className="pl-1">Obtain design data, drawings, and equipment schedules</li>
                <li className="pl-1">Check instruments calibrated within date</li>
                <li className="pl-1">Commission central plant before distribution</li>
                <li className="pl-1">Balance primary circuits before secondary</li>
                <li className="pl-1">Record all measurements systematically</li>
                <li className="pl-1">Identify and resolve defects before sign-off</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Air/water flow tolerance: <strong>+/- 10%</strong></li>
                <li className="pl-1">Room temperature tolerance: <strong>+/- 1K</strong></li>
                <li className="pl-1">Hydronic test pressure: <strong>1.5 x working pressure</strong></li>
                <li className="pl-1">Superheat target: <strong>5-8K</strong></li>
                <li className="pl-1">Duct main velocity: <strong>4-6 m/s</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Commissioning dirty systems</strong> - debris damages pumps and valves</li>
                <li className="pl-1"><strong>Balancing without design data</strong> - no target means no compliance</li>
                <li className="pl-1"><strong>Ignoring temperature effects</strong> - pressure tests vary with temperature</li>
                <li className="pl-1"><strong>Insufficient documentation</strong> - unmeasured terminals cause future disputes</li>
                <li className="pl-1"><strong>Using air for refrigeration testing</strong> - moisture causes corrosion</li>
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

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">CIBSE Commissioning Codes</p>
                <ul className="space-y-0.5">
                  <li>Code A - Air distribution systems</li>
                  <li>Code W - Water distribution systems</li>
                  <li>Code R - Refrigeration systems</li>
                  <li>Code C - Automatic controls</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Performance Tolerances</p>
                <ul className="space-y-0.5">
                  <li>Air/water flows: +/- 10%</li>
                  <li>Room temperature: +/- 1K</li>
                  <li>Supply air temp: +/- 2K</li>
                  <li>Relative humidity: +/- 5%</li>
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
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module5-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Commissioning & Handover
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module5-section5-4">
              Next: Electrical Commissioning
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule5Section5_3;
