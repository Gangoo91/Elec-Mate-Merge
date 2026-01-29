import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Heat Pump Technology - HNC Module 6 Section 2.2";
const DESCRIPTION = "Master heat pump technology for building services: ASHP and GSHP systems, COP and SCOP calculations, system design and sizing, integration with heating systems, and MCS certification requirements.";

const quickCheckQuestions = [
  {
    id: "cop-definition",
    question: "What does COP (Coefficient of Performance) measure in a heat pump system?",
    options: ["The maximum temperature output", "The ratio of heat output to electrical input", "The refrigerant flow rate", "The compressor efficiency rating"],
    correctIndex: 1,
    explanation: "COP is the ratio of useful heat output to electrical energy input. A COP of 3.5 means the heat pump produces 3.5 kW of heat for every 1 kW of electrical energy consumed."
  },
  {
    id: "ashp-vs-gshp",
    question: "Why do GSHP systems typically achieve higher seasonal efficiency than ASHP systems?",
    options: ["They use more powerful compressors", "Ground temperatures remain more stable throughout the year", "They operate at higher refrigerant pressures", "They have larger heat exchangers"],
    correctIndex: 1,
    explanation: "Ground temperatures at depth remain relatively constant (8-12°C in the UK) throughout the year, whilst air temperatures vary significantly. This stability allows GSHP systems to maintain higher efficiency across all seasons."
  },
  {
    id: "flow-temperature",
    question: "What is the maximum recommended flow temperature for heat pump systems to maintain good efficiency?",
    options: ["65°C", "55°C", "45°C", "35°C"],
    correctIndex: 2,
    explanation: "Heat pumps operate most efficiently at flow temperatures of 45°C or below. Higher temperatures significantly reduce COP and are typically only achieved using supplementary heating or during defrost cycles."
  },
  {
    id: "mcs-requirement",
    question: "What is the primary purpose of MCS certification for heat pump installations?",
    options: ["To reduce installation costs", "To qualify for government incentive schemes like BUS", "To allow higher operating temperatures", "To eliminate commissioning requirements"],
    correctIndex: 1,
    explanation: "MCS (Microgeneration Certification Scheme) certification is required for installations to qualify for government incentive schemes such as the Boiler Upgrade Scheme (BUS). It ensures quality standards and consumer protection."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A heat pump produces 10 kW of heat output whilst consuming 2.5 kW of electrical power. What is the COP?",
    options: [
      "2.5",
      "4.0",
      "7.5",
      "12.5"
    ],
    correctAnswer: 1,
    explanation: "COP = Heat Output ÷ Electrical Input = 10 kW ÷ 2.5 kW = 4.0. This means the heat pump delivers 4 units of heat for every 1 unit of electricity consumed."
  },
  {
    id: 2,
    question: "What does SCOP measure that COP does not?",
    options: ["Peak efficiency only", "Efficiency including auxiliary energy over a heating season", "Cooling mode performance", "Defrost cycle efficiency only"],
    correctAnswer: 1,
    explanation: "SCOP (Seasonal Coefficient of Performance) measures the average efficiency across an entire heating season, including standby losses, auxiliary equipment energy, and varying outdoor conditions. COP is measured at a single test point."
  },
  {
    id: 3,
    question: "At what depth do horizontal ground loop collectors for GSHP systems typically need to be installed?",
    options: ["0.5 to 0.8 metres", "1.0 to 1.5 metres", "2.0 to 2.5 metres", "3.0 to 4.0 metres"],
    correctAnswer: 1,
    explanation: "Horizontal ground loops are typically installed at 1.0 to 1.5 metres depth, below the frost line but shallow enough to benefit from solar gain. This provides relatively stable temperatures whilst minimising excavation costs."
  },
  {
    id: 4,
    question: "Why is a buffer vessel often required in heat pump installations?",
    options: [
      "To increase the hot water storage capacity",
      "To reduce short-cycling and ensure minimum run times",
      "To eliminate the need for a circulation pump",
      "To improve refrigerant charge levels"
    ],
    correctAnswer: 1,
    explanation: "Buffer vessels increase system water volume, preventing short-cycling (frequent on/off cycling) which reduces efficiency and compressor life. They ensure the heat pump can run for adequate periods, typically minimum 6-10 minutes."
  },
  {
    id: 5,
    question: "For MCS compliance, what is the maximum permitted design flow temperature for radiator systems?",
    options: [
      "75°C",
      "65°C",
      "55°C",
      "45°C"
    ],
    correctAnswer: 2,
    explanation: "MCS Heat Pump Standard MIS 3005 permits a maximum design flow temperature of 55°C for radiator systems. Lower temperatures (35-45°C) are preferred for optimal efficiency, requiring correctly sized emitters."
  },
  {
    id: 6,
    question: "What is the approximate ground temperature at 100 metres depth in the UK?",
    options: ["4-6°C", "8-12°C", "14-18°C", "20-24°C"],
    correctAnswer: 1,
    explanation: "In the UK, ground temperatures at depth stabilise at approximately 8-12°C, close to the annual average air temperature. This remains relatively constant throughout the year, providing a stable heat source for GSHP systems."
  },
  {
    id: 7,
    question: "When sizing radiators for a heat pump system operating at 45°C flow temperature, approximately what factor should be applied compared to a 75°C conventional boiler system?",
    options: ["1.5 times larger", "2.0 times larger", "2.5 to 3.0 times larger", "4.0 times larger"],
    correctAnswer: 2,
    explanation: "At 45°C flow temperature versus 75°C, radiators need to be approximately 2.5 to 3 times larger to deliver the same heat output. This is due to the significantly reduced temperature difference between the radiator surface and room air."
  },
  {
    id: 8,
    question: "What is the current grant value available under the Boiler Upgrade Scheme (BUS) for ASHP installations in England?",
    options: ["£5,000", "£6,000", "£7,500", "£10,000"],
    correctAnswer: 2,
    explanation: "The Boiler Upgrade Scheme provides £7,500 towards air source heat pump installations in England (as of 2024). The property must be existing (not new build) and the installer must be MCS certified."
  },
  {
    id: 9,
    question: "During defrost cycles, what happens to the ASHP's heating output?",
    options: [
      "Output increases temporarily",
      "Output is maintained at normal levels",
      "Output reduces or stops whilst the outdoor unit defrosts",
      "The system switches to cooling mode"
    ],
    correctAnswer: 2,
    explanation: "During defrost cycles, the heat pump temporarily reverses to remove ice from the outdoor coil. This reduces or stops heating output for 2-10 minutes. Systems must be sized to account for defrost impact on overall capacity."
  },
  {
    id: 10,
    question: "What is the typical brine concentration used in GSHP ground loop systems?",
    options: ["10% ethylene glycol", "25% propylene glycol", "50% methanol", "Pure water"],
    correctAnswer: 1,
    explanation: "Ground loops typically use 25-30% propylene glycol (food-grade antifreeze) mixed with water. This provides freeze protection to approximately -15°C whilst maintaining acceptable heat transfer properties and being environmentally safer than ethylene glycol."
  },
  {
    id: 11,
    question: "According to MCS requirements, what must be provided to the customer after heat pump installation?",
    options: [
      "Only the manufacturer's warranty certificate",
      "A handover pack including MCS certificate, operating instructions, and performance data",
      "Just the electrical installation certificate",
      "The commissioning data only"
    ],
    correctAnswer: 1,
    explanation: "MCS requires a comprehensive handover pack including the MCS certificate, user operating instructions, maintenance requirements, commissioning data, performance expectations, and warranty information. This ensures customers can operate and maintain their system correctly."
  },
  {
    id: 12,
    question: "What is the primary advantage of inverter-driven (variable speed) compressors in heat pumps?",
    options: [
      "Lower installation cost",
      "Ability to modulate output to match heating demand",
      "Higher maximum temperatures",
      "Elimination of defrost requirements"
    ],
    correctAnswer: 1,
    explanation: "Inverter compressors modulate speed to match heating demand, avoiding the on/off cycling of fixed-speed units. This improves seasonal efficiency (SCOP), reduces wear, maintains more stable temperatures, and often eliminates the need for buffer vessels."
  }
];

const faqs = [
  {
    question: "What is the difference between monobloc and split system heat pumps?",
    answer: "Monobloc units contain all refrigerant components in the outdoor unit, with only water pipes connecting to the building. This simplifies installation (no F-Gas certification required) and reduces refrigerant charge. Split systems have the evaporator outside and condenser inside, connected by refrigerant pipes - requiring F-Gas qualified installation but potentially offering slightly higher efficiency and more flexible placement."
  },
  {
    question: "How do I calculate the heat pump size required for a property?",
    answer: "Heat pump sizing requires a room-by-room heat loss calculation to MCS MIS 3005 standards. Key factors include: building fabric U-values, air infiltration rate, design temperatures (-3°C external for most UK locations), and ventilation requirements. The total heat loss determines heat pump capacity, typically with 10-20% margin. Oversizing wastes money and causes cycling issues; undersizing may require supplementary heating."
  },
  {
    question: "Can existing radiators be used with a heat pump?",
    answer: "Existing radiators can often be reused if they are adequately sized for lower flow temperatures. Calculate the required output at heat pump temperatures (typically 45-50°C) - radiators may need to be 2-3 times larger than for a 75°C boiler system. Individual room assessments determine if radiators need upgrading. Underfloor heating is ideal for heat pumps due to its large surface area and low temperature operation."
  },
  {
    question: "What maintenance do heat pump systems require?",
    answer: "Annual maintenance should include: checking refrigerant pressures and temperatures, cleaning filters and outdoor unit, inspecting electrical connections, verifying controls operation, checking antifreeze concentration (GSHP), and reviewing system performance data. The outdoor unit needs clear airflow - keep vegetation trimmed back 500mm minimum. Most manufacturers require annual servicing to maintain warranty."
  },
  {
    question: "Why is the BUS grant not available for new build properties?",
    answer: "The Boiler Upgrade Scheme targets existing buildings to encourage replacement of fossil fuel heating systems, reducing carbon emissions from the existing housing stock. New builds are required to meet Building Regulations Part L which already mandates low-carbon heating, making additional incentives unnecessary. New builds should comply with Future Homes Standard requirements."
  },
  {
    question: "What noise levels are typical for ASHP installations?",
    answer: "Modern ASHP units typically produce 40-60 dB(A) at 1 metre distance - similar to a refrigerator or quiet conversation. Planning guidance (MCS 020) requires assessment of noise impact on neighbours, with permitted development limits typically 42 dB(A) at the nearest boundary. Acoustic enclosures, anti-vibration mounts, and careful positioning can reduce noise impact. Night setback modes reduce output and noise during sleeping hours."
  }
];

const HNCModule6Section2_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module6-section2">
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
            <span>Module 6.2.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Heat Pump Technology
          </h1>
          <p className="text-white/80">
            ASHP and GSHP systems, COP and SCOP performance metrics, system design principles, and MCS certification requirements
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>COP:</strong> Heat output divided by electrical input (typically 2.5-4.5)</li>
              <li className="pl-1"><strong>SCOP:</strong> Seasonal average efficiency including all losses</li>
              <li className="pl-1"><strong>Flow temperature:</strong> Maximum 45°C for optimal efficiency</li>
              <li className="pl-1"><strong>MCS:</strong> Required for BUS grant eligibility (£7,500)</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">System Types</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>ASHP:</strong> Air source - most common, lower installation cost</li>
              <li className="pl-1"><strong>GSHP:</strong> Ground source - higher efficiency, higher capital cost</li>
              <li className="pl-1"><strong>Hybrid:</strong> Heat pump with gas boiler backup</li>
              <li className="pl-1"><strong>Monobloc vs Split:</strong> Installation complexity varies</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain ASHP and GSHP operating principles and applications",
              "Calculate and interpret COP and SCOP performance values",
              "Apply heat pump sizing methodology to building heat loss",
              "Design heating systems for low-temperature heat pump operation",
              "Specify buffer vessels, emitters, and controls for heat pump integration",
              "Understand MCS certification and BUS grant requirements"
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

        {/* Section 1: Heat Pump Fundamentals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Heat Pump Operating Principles
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Heat pumps extract low-grade heat from ambient sources (air, ground, or water) and upgrade it
              to useful temperatures for space heating and hot water. They operate on the vapour compression
              cycle, using electrical energy to drive a compressor that transfers heat from a cold source
              to a warmer sink.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">The Refrigeration Cycle in Heat Pumps:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Evaporator:</strong> Low-pressure refrigerant absorbs heat from the source (air/ground), evaporating from liquid to gas</li>
                <li className="pl-1"><strong>Compressor:</strong> Raises refrigerant pressure and temperature using electrical energy</li>
                <li className="pl-1"><strong>Condenser:</strong> High-pressure refrigerant releases heat to the heating system, condensing back to liquid</li>
                <li className="pl-1"><strong>Expansion valve:</strong> Reduces pressure, cooling refrigerant ready to absorb heat again</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Air Source vs Ground Source Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Characteristic</th>
                      <th className="border border-white/10 px-3 py-2 text-left">ASHP</th>
                      <th className="border border-white/10 px-3 py-2 text-left">GSHP</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Heat source temperature</td>
                      <td className="border border-white/10 px-3 py-2">-15°C to +35°C (variable)</td>
                      <td className="border border-white/10 px-3 py-2">8-12°C (stable)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Typical SCOP</td>
                      <td className="border border-white/10 px-3 py-2">2.8 - 3.5</td>
                      <td className="border border-white/10 px-3 py-2">3.5 - 4.5</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Installation cost (typical)</td>
                      <td className="border border-white/10 px-3 py-2">£8,000 - £15,000</td>
                      <td className="border border-white/10 px-3 py-2">£15,000 - £35,000</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Land requirement</td>
                      <td className="border border-white/10 px-3 py-2">Outdoor unit location only</td>
                      <td className="border border-white/10 px-3 py-2">Borehole or extensive trenching</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Defrost cycles</td>
                      <td className="border border-white/10 px-3 py-2">Required in cold/humid conditions</td>
                      <td className="border border-white/10 px-3 py-2">Not required</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Noise considerations</td>
                      <td className="border border-white/10 px-3 py-2">Fan noise requires assessment</td>
                      <td className="border border-white/10 px-3 py-2">Indoor equipment only</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key principle:</strong> The smaller the temperature lift (difference between source and output), the higher the efficiency. This is why heat pumps work best with low-temperature heating systems.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: COP and SCOP Performance */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            COP and SCOP Performance Metrics
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding heat pump efficiency metrics is essential for system selection, sizing,
              and predicting running costs. COP and SCOP provide different but complementary
              measures of performance.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">COP Calculation</p>
              <div className="font-mono text-sm space-y-1">
                <p><span className="text-white">COP = Heat Output (kW) ÷ Electrical Input (kW)</span></p>
                <p className="mt-2 text-white/60">Example:</p>
                <p><span className="text-white/60">Heat output:</span> <span className="text-white">12 kW</span></p>
                <p><span className="text-white/60">Electrical input:</span> <span className="text-white">3 kW</span></p>
                <p><span className="text-white/60">COP:</span> <span className="text-green-400">12 ÷ 3 = 4.0</span></p>
                <p className="mt-2 text-white/60">Energy delivered: 4 kW heat for every 1 kW electricity</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">COP (Coefficient of Performance)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Instantaneous efficiency at test conditions</li>
                  <li className="pl-1">Measured at specific source/output temperatures</li>
                  <li className="pl-1">Does not include standby or auxiliary losses</li>
                  <li className="pl-1">Useful for comparing at specific operating points</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">SCOP (Seasonal COP)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Average efficiency over heating season</li>
                  <li className="pl-1">Includes part-load operation and cycling</li>
                  <li className="pl-1">Accounts for standby and auxiliary power</li>
                  <li className="pl-1">Better predictor of actual running costs</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Factors Affecting COP</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Factor</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Effect on COP</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Design Implication</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Source temperature ↑</td>
                      <td className="border border-white/10 px-3 py-2">COP increases</td>
                      <td className="border border-white/10 px-3 py-2">GSHP preferred in cold climates</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Flow temperature ↓</td>
                      <td className="border border-white/10 px-3 py-2">COP increases</td>
                      <td className="border border-white/10 px-3 py-2">Design for 35-45°C where possible</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Part-load operation</td>
                      <td className="border border-white/10 px-3 py-2">Inverter units maintain efficiency</td>
                      <td className="border border-white/10 px-3 py-2">Avoid oversizing fixed-speed units</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Defrost cycles</td>
                      <td className="border border-white/10 px-3 py-2">Reduces effective output</td>
                      <td className="border border-white/10 px-3 py-2">Allow for defrost in ASHP sizing</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cycling frequency</td>
                      <td className="border border-white/10 px-3 py-2">Frequent cycling reduces SCOP</td>
                      <td className="border border-white/10 px-3 py-2">Buffer vessels or modulating units</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <p className="text-sm font-medium text-green-400 mb-2">Running Cost Calculation Example</p>
              <div className="font-mono text-sm space-y-1">
                <p><span className="text-white/60">Annual heat demand:</span> <span className="text-white">18,000 kWh</span></p>
                <p><span className="text-white/60">SCOP:</span> <span className="text-white">3.2</span></p>
                <p><span className="text-white/60">Electricity required:</span> <span className="text-white">18,000 ÷ 3.2 = 5,625 kWh</span></p>
                <p><span className="text-white/60">Electricity rate:</span> <span className="text-white">24p/kWh</span></p>
                <p><span className="text-white/60">Annual running cost:</span> <span className="text-green-400">5,625 × £0.24 = £1,350</span></p>
                <p className="mt-2 text-white/60">Compare: Gas boiler (90% efficiency, 7p/kWh) = £1,400/year</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Efficiency benchmark:</strong> MCS requires a minimum SPF (Seasonal Performance Factor) of 2.5 for installations to qualify for incentive schemes.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: System Design and Sizing */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            System Design and Sizing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Correct sizing is critical for heat pump performance. Undersizing leads to comfort issues
              and supplementary heating dependency; oversizing causes cycling, reduced efficiency, and
              wasted capital expenditure.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Heat Loss Calculation Process (MCS MIS 3005)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Room-by-room calculation:</strong> Calculate fabric and ventilation losses for each room</li>
                <li className="pl-1"><strong>U-values:</strong> Use actual or estimated values for walls, roof, floor, windows, doors</li>
                <li className="pl-1"><strong>Design temperatures:</strong> Internal 21°C, external typically -3°C for most UK locations</li>
                <li className="pl-1"><strong>Ventilation:</strong> Air change rates based on room type and building airtightness</li>
                <li className="pl-1"><strong>Thermal bridging:</strong> Add allowance for heat loss at junctions (typically 10-15%)</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Heat Loss Calculation Example</p>
              <div className="font-mono text-sm space-y-1">
                <p className="text-white/60">Living room: 5m × 4m × 2.4m ceiling</p>
                <p className="mt-2"><span className="text-white/60">External wall area:</span> <span className="text-white">12 m² (after windows)</span></p>
                <p><span className="text-white/60">U-value:</span> <span className="text-white">0.35 W/m²K</span></p>
                <p><span className="text-white/60">Temperature difference:</span> <span className="text-white">21 - (-3) = 24K</span></p>
                <p><span className="text-white/60">Wall loss:</span> <span className="text-white">12 × 0.35 × 24 = 100.8 W</span></p>
                <p className="mt-2 text-white/60">+ Window loss + Floor loss + Roof loss + Ventilation loss</p>
                <p><span className="text-white/60">Total room heat loss:</span> <span className="text-green-400">850 W</span></p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Emitter Sizing for Low Temperatures</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Flow/Return Temp</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Mean Water Temp</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Correction Factor</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Radiator Size vs 75/65°C</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">75/65°C (boiler)</td>
                      <td className="border border-white/10 px-3 py-2">70°C</td>
                      <td className="border border-white/10 px-3 py-2">1.00</td>
                      <td className="border border-white/10 px-3 py-2">Baseline</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">55/45°C</td>
                      <td className="border border-white/10 px-3 py-2">50°C</td>
                      <td className="border border-white/10 px-3 py-2">0.52</td>
                      <td className="border border-white/10 px-3 py-2">1.9× larger</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">45/40°C</td>
                      <td className="border border-white/10 px-3 py-2">42.5°C</td>
                      <td className="border border-white/10 px-3 py-2">0.37</td>
                      <td className="border border-white/10 px-3 py-2">2.7× larger</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">35/30°C (UFH)</td>
                      <td className="border border-white/10 px-3 py-2">32.5°C</td>
                      <td className="border border-white/10 px-3 py-2">0.21</td>
                      <td className="border border-white/10 px-3 py-2">4.8× larger</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Buffer Vessel Sizing</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Minimum run time: 6-10 minutes</li>
                  <li className="pl-1">Typical sizing: 10-20 litres per kW</li>
                  <li className="pl-1">Not needed with inverter units (usually)</li>
                  <li className="pl-1">Consider low-loss header alternative</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Hot Water Cylinder Sizing</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Minimum 150-200 litres for heat pump</li>
                  <li className="pl-1">Large coil area essential (3+ m²)</li>
                  <li className="pl-1">Consider pre-heat/preheat cylinders</li>
                  <li className="pl-1">Legionella cycle provision required</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Sizing rule:</strong> For ASHP, allow 10-15% additional capacity for defrost impact. Never size to peak load only - consider annual energy requirements and part-load efficiency.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: MCS and BUS Requirements */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            MCS Certification and BUS Grant Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Microgeneration Certification Scheme (MCS) provides quality assurance for heat pump
              installations in the UK. MCS certification is mandatory for accessing government incentive
              schemes including the Boiler Upgrade Scheme (BUS).
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">MCS Heat Pump Standard (MIS 3005) Key Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Heat loss calculation:</strong> Room-by-room to approved methodology</li>
                <li className="pl-1"><strong>System design:</strong> Documented design including all components</li>
                <li className="pl-1"><strong>Product certification:</strong> Heat pump must be MCS-certified product</li>
                <li className="pl-1"><strong>Installer certification:</strong> Company must hold MCS installer certificate</li>
                <li className="pl-1"><strong>Commissioning:</strong> Full commissioning to manufacturer requirements</li>
                <li className="pl-1"><strong>Documentation:</strong> Comprehensive handover pack for customer</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <p className="text-sm font-medium text-green-400 mb-2">Boiler Upgrade Scheme (BUS) - Key Facts</p>
              <div className="text-sm space-y-2">
                <p><strong>Grant values (2024):</strong></p>
                <ul className="ml-4 space-y-1">
                  <li>- Air source heat pump: <strong>£7,500</strong></li>
                  <li>- Ground source heat pump: <strong>£7,500</strong></li>
                  <li>- Biomass boiler (rural only): <strong>£5,000</strong></li>
                </ul>
                <p className="mt-2"><strong>Eligibility requirements:</strong></p>
                <ul className="ml-4 space-y-1">
                  <li>- Existing building (not new build)</li>
                  <li>- Valid EPC (no loft/cavity wall recommendations outstanding)</li>
                  <li>- MCS-certified installer and product</li>
                  <li>- Replacing fossil fuel or electric heating system</li>
                  <li>- England and Wales (Scotland has separate scheme)</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">MCS Documentation Requirements</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Document</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Purpose</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Timing</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Heat loss calculation</td>
                      <td className="border border-white/10 px-3 py-2">Justifies system sizing</td>
                      <td className="border border-white/10 px-3 py-2">Pre-installation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">System design</td>
                      <td className="border border-white/10 px-3 py-2">Component specification</td>
                      <td className="border border-white/10 px-3 py-2">Pre-installation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Commissioning record</td>
                      <td className="border border-white/10 px-3 py-2">Performance verification</td>
                      <td className="border border-white/10 px-3 py-2">Completion</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">MCS certificate</td>
                      <td className="border border-white/10 px-3 py-2">Scheme compliance</td>
                      <td className="border border-white/10 px-3 py-2">Post-installation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Handover pack</td>
                      <td className="border border-white/10 px-3 py-2">Customer information</td>
                      <td className="border border-white/10 px-3 py-2">Handover</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Electrical certificate</td>
                      <td className="border border-white/10 px-3 py-2">BS 7671 compliance</td>
                      <td className="border border-white/10 px-3 py-2">Completion</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Electrical Installation Requirements</p>
              <div className="text-sm space-y-2">
                <ul className="text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Supply capacity:</strong> Verify DNO supply adequate (typically 60-100A single phase, or three phase)</li>
                  <li className="pl-1"><strong>Dedicated circuit:</strong> Separate MCB/RCBO for heat pump (typically 20-32A)</li>
                  <li className="pl-1"><strong>Isolator:</strong> Local isolation adjacent to outdoor unit</li>
                  <li className="pl-1"><strong>Earth bonding:</strong> Supplementary bonding to metal pipework</li>
                  <li className="pl-1"><strong>Outdoor wiring:</strong> UV-resistant cable or conduit for external runs</li>
                  <li className="pl-1"><strong>RCD protection:</strong> 30mA RCD protection as per BS 7671</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Compliance note:</strong> Building Regulations Part L notification is required for heat pump installations. The installation must also comply with Part P for electrical work and Part G for unvented hot water where applicable.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: COP to Running Cost Comparison</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Compare annual running costs: heat pump (SCOP 3.5) vs gas boiler (90% efficiency).
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Annual heat demand: 15,000 kWh</p>
                <p className="mt-2">Heat Pump:</p>
                <p className="ml-4">Electricity required = 15,000 ÷ 3.5 = 4,286 kWh</p>
                <p className="ml-4">Cost at 24p/kWh = 4,286 × £0.24 = £1,029</p>
                <p className="mt-2">Gas Boiler:</p>
                <p className="ml-4">Gas required = 15,000 ÷ 0.90 = 16,667 kWh</p>
                <p className="ml-4">Cost at 7p/kWh = 16,667 × £0.07 = £1,167</p>
                <p className="mt-2 text-green-400">Annual saving with heat pump: £138</p>
                <p className="text-white/60">Note: Actual savings depend on electricity/gas prices</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Radiator Sizing for Heat Pump</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Room requires 1.5 kW heat output. Size radiator for 45/40°C heat pump operation.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Required output at 45/40°C: 1,500 W</p>
                <p className="mt-2">At 75/65°C (catalogue rating):</p>
                <p className="ml-4">Correction factor for 45/40°C = 0.37</p>
                <p className="ml-4">Catalogue output required = 1,500 ÷ 0.37 = 4,054 W</p>
                <p className="mt-2">Radiator selection:</p>
                <p className="ml-4 text-green-400">Select radiator rated 4,100 W at 75/65°C</p>
                <p className="ml-4">e.g., 600mm × 1800mm double panel plus</p>
                <p className="mt-2 text-white/60">The radiator is 2.7× larger than for a boiler system</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: GSHP Ground Loop Sizing</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Size horizontal ground loop for 10 kW GSHP in clay soil.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Heat pump capacity: 10 kW</p>
                <p>Assumed COP: 4.0</p>
                <p className="mt-2">Heat extraction from ground:</p>
                <p className="ml-4">= Heat output - Electrical input</p>
                <p className="ml-4">= 10 - (10 ÷ 4) = 10 - 2.5 = 7.5 kW</p>
                <p className="mt-2">Ground extraction rate (clay soil): 20-30 W/m²</p>
                <p className="ml-4">Using 25 W/m² average:</p>
                <p className="ml-4">Ground area = 7,500 ÷ 25 = 300 m²</p>
                <p className="mt-2">Loop pipe length (at 1m spacing):</p>
                <p className="ml-4 text-green-400">Approximately 300m of pipe required</p>
                <p className="text-white/60">Trench area: 300 m² at 1.2m depth</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Pre-Installation Assessment Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Verify electrical supply capacity (single phase usually sufficient up to 12 kW)</li>
                <li className="pl-1">Assess outdoor unit location (airflow, noise, drainage, access)</li>
                <li className="pl-1">Survey existing heating system (emitters, pipework, controls)</li>
                <li className="pl-1">Calculate room-by-room heat loss using MCS-approved method</li>
                <li className="pl-1">Check EPC and address any recommendations before BUS application</li>
                <li className="pl-1">Assess hot water requirements and cylinder location</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Optimal flow temperature: <strong>35-45°C</strong></li>
                <li className="pl-1">Maximum MCS flow temperature: <strong>55°C</strong></li>
                <li className="pl-1">Typical ASHP SCOP: <strong>2.8-3.5</strong></li>
                <li className="pl-1">Typical GSHP SCOP: <strong>3.5-4.5</strong></li>
                <li className="pl-1">Buffer vessel sizing: <strong>10-20 litres/kW</strong></li>
                <li className="pl-1">BUS grant (ASHP/GSHP): <strong>£7,500</strong></li>
                <li className="pl-1">Ground temperature (UK): <strong>8-12°C</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Installation Mistakes</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Oversizing:</strong> Causes cycling, reduced efficiency, wasted cost</li>
                <li className="pl-1"><strong>Inadequate emitters:</strong> System cannot achieve design temperatures</li>
                <li className="pl-1"><strong>Poor outdoor unit location:</strong> Restricted airflow or recirculation</li>
                <li className="pl-1"><strong>Insufficient electrical supply:</strong> Trips or voltage drop issues</li>
                <li className="pl-1"><strong>Missing flow control:</strong> No weather compensation or incorrect curves</li>
                <li className="pl-1"><strong>Undersized hot water coil:</strong> Long reheat times, legionella risk</li>
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
                <p className="font-medium text-white mb-1">Performance Metrics</p>
                <ul className="space-y-0.5">
                  <li>COP = Heat Output ÷ Electrical Input</li>
                  <li>SCOP = Seasonal average including losses</li>
                  <li>SPF = System efficiency in real use</li>
                  <li>MCS minimum SPF: 2.5</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Design Temperatures</p>
                <ul className="space-y-0.5">
                  <li>Optimal flow: 35-45°C</li>
                  <li>MCS maximum: 55°C</li>
                  <li>UFH typical: 35°C</li>
                  <li>Radiator typical: 45-50°C</li>
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
            <Link to="../h-n-c-module6-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module6-section2-3">
              Next: Photovoltaic Systems
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule6Section2_2;
