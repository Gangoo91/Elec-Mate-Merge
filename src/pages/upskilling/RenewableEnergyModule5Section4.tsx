import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Heat Pump System Integration - Renewable Energy Module 5";
const DESCRIPTION = "Learn about heat pump integration with existing heating systems, hot water production, underfloor heating, and system controls.";

const quickCheckQuestions = [
  {
    id: "hp-flow-temp",
    question: "Why is low flow temperature important for heat pump efficiency?",
    options: ["Reduces equipment cost", "Lower temperature lift means less compressor work and higher COP", "Faster heating response", "Reduces pipe sizes"],
    correctIndex: 1,
    explanation: "Lower flow temperature reduces the temperature lift (difference between source and output), requiring less compressor work. Every 1C reduction in flow temp improves COP by approximately 2-3%."
  },
  {
    id: "hp-ufh-advantage",
    question: "Why is underfloor heating ideal for heat pumps?",
    options: ["Lower installation cost", "Large surface area allows efficient heat transfer at low flow temperatures", "Faster warm-up time", "Less maintenance required"],
    correctIndex: 1,
    explanation: "Underfloor heating's large surface area allows effective heat delivery at 35-40C flow temperatures, compared to 50-55C needed for radiators, significantly improving heat pump efficiency."
  },
  {
    id: "hp-buffer-tank",
    question: "What is the primary purpose of a buffer tank in heat pump systems?",
    options: ["Hot water storage", "Prevents short cycling by adding thermal mass to the system", "Backup heating", "Noise reduction"],
    correctIndex: 1,
    explanation: "Buffer tanks add thermal mass to prevent frequent compressor cycling during low load conditions, protect minimum flow rates, and improve defrost recovery. Not for hot water storage."
  },
  {
    id: "hp-weather-comp",
    question: "How does weather compensation control improve heat pump efficiency?",
    options: ["Increases output in bad weather", "Automatically adjusts flow temperature based on outdoor conditions", "Predicts weather for scheduling", "Reduces defrost frequency"],
    correctIndex: 1,
    explanation: "Weather compensation reduces flow temperature when outdoor temperatures are mild (less heat needed), maximising efficiency. In cold weather, it increases flow temp to meet higher demand."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What radiator upsizing is typically needed for heat pump operation?",
    options: [
      "No change needed",
      "50-100% increase in radiator size",
      "25% reduction possible",
      "Triple the size"
    ],
    correctAnswer: 1,
    explanation: "Running radiators at 45C vs 70C requires 50-100% larger surface area to deliver equivalent heat output. Calculate actual output at intended flow temperature."
  },
  {
    id: 2,
    question: "What hot water temperature is typically needed for Legionella control?",
    options: [
      "40C",
      "50C",
      "60C minimum",
      "75C"
    ],
    correctAnswer: 2,
    explanation: "Hot water must reach 60C periodically to control Legionella bacteria. Heat pumps may use immersion backup or high-temperature cycles to achieve this."
  },
  {
    id: 3,
    question: "What is the benefit of a low-loss header in heat pump systems?",
    options: [
      "Reduces heat losses",
      "Hydraulically separates heat pump and distribution circuits",
      "Increases water temperature",
      "Reduces noise"
    ],
    correctAnswer: 1,
    explanation: "Low-loss headers hydraulically separate the heat pump circuit from distribution, allowing different flow rates in each without interference while maintaining low pressure drop."
  },
  {
    id: 4,
    question: "What cylinder coil surface area is typically needed for heat pump DHW production?",
    options: [
      "Same as boiler cylinders",
      "2-3 times larger than conventional boiler coils",
      "Smaller due to efficiency",
      "No coil needed"
    ],
    correctAnswer: 1,
    explanation: "Heat pump cylinders need 2-3x larger coil surface area because lower flow temperatures require more surface for adequate heat transfer to hot water."
  },
  {
    id: 5,
    question: "What flow temperature range is optimal for underfloor heating with heat pumps?",
    options: [
      "25-30C",
      "35-45C",
      "55-65C",
      "70-80C"
    ],
    correctAnswer: 1,
    explanation: "Underfloor heating operates optimally at 35-45C flow temperature, providing comfortable floor surface temperatures of 25-29C while maximising heat pump efficiency."
  },
  {
    id: 6,
    question: "What is the purpose of a zone valve in heat pump systems?",
    options: [
      "Pressure regulation",
      "Controls heating to individual zones based on demand",
      "Temperature measurement",
      "Flow indication"
    ],
    correctAnswer: 1,
    explanation: "Zone valves allow independent temperature control of different areas, closing when zones reach setpoint and opening when heating is needed."
  },
  {
    id: 7,
    question: "Why might a bivalent system include a boiler alongside a heat pump?",
    options: [
      "Heat pumps cannot heat buildings",
      "Backup during extreme cold or rapid heat-up requirements",
      "Lower installation cost",
      "Required by regulations"
    ],
    correctAnswer: 1,
    explanation: "Bivalent systems use backup heating (often existing boiler) during extreme cold when heat pump capacity reduces, or for rapid heat-up after setback periods."
  },
  {
    id: 8,
    question: "What is the typical recommended minimum heat pump run time?",
    options: [
      "2 minutes",
      "10-15 minutes minimum",
      "1 hour",
      "No minimum"
    ],
    correctAnswer: 1,
    explanation: "Heat pumps should run minimum 10-15 minutes per cycle to avoid compressor wear from short cycling. Buffer tanks and correct sizing help achieve this."
  },
  {
    id: 9,
    question: "How should radiator TRVs be set in heat pump systems?",
    options: [
      "Same as with boilers",
      "Higher settings or removed - let room thermostat control",
      "Lower settings for efficiency",
      "TRVs should not be used"
    ],
    correctAnswer: 1,
    explanation: "TRVs should be set high or removed in main living areas. Frequent TRV closure causes short cycling. Use room thermostat for primary control."
  },
  {
    id: 10,
    question: "What commissioning check verifies correct heat pump water flow?",
    options: [
      "Colour of water",
      "Temperature difference across heat pump (delta T)",
      "Pipe material",
      "Noise level"
    ],
    correctAnswer: 1,
    explanation: "Delta T across the heat pump (typically 5C for heating) indicates correct flow rate. Too high delta T means insufficient flow; too low means excessive flow."
  }
];

const faqs = [
  {
    question: "Can I keep my existing radiators with a heat pump?",
    answer: "Often yes, but assessment is needed. Calculate radiator output at intended flow temperature (typically 45C vs original 70C). Outputs drop 50% or more. Some radiators may need replacement or supplementing. Underfloor heating additions in extensions help."
  },
  {
    question: "How does a heat pump provide hot water efficiently?",
    answer: "Dedicated heat pump hot water cylinders have larger coils for low-temperature heat transfer. Heating to 50C is efficient (COP 3+), but Legionella cycles to 60C require more energy. Some systems use immersion heater for final temperature boost."
  },
  {
    question: "What controls are essential for heat pump systems?",
    answer: "Weather compensation is essential for efficiency. Room thermostat controls overall demand. Buffer tank protection prevents cycling. Flow temperature limiting prevents inefficient high-temp operation. Smart controls can optimise for time-of-use tariffs."
  },
  {
    question: "Should heating run continuously with a heat pump?",
    answer: "Heat pumps perform best with continuous or extended operation at lower temperatures rather than intermittent high-temperature blasts. Slight overnight setback (2-3C) is acceptable, but deep setback causes inefficient recovery periods."
  },
  {
    question: "How do I integrate a heat pump with an existing boiler system?",
    answer: "Options include: bivalent parallel (both connected to same distribution), bivalent alternative (switch between), or hybrid (automatic selection based on conditions/costs). Low-loss header typically connects different heat sources."
  },
  {
    question: "What happens if my heat pump undersizes for the coldest days?",
    answer: "Options include: accept slightly lower temperatures on coldest days (rare in UK), install backup heating (immersion, boiler), or use thermal mass to pre-heat before cold spells. Slight undersizing is often acceptable and more efficient overall."
  }
];

const RenewableEnergyModule5Section4 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/renewable-energy-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12 max-w-3xl mx-auto">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 5 Section 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Heat Pump System Integration
          </h1>
          <p className="text-white/80">
            Distribution systems, hot water, controls, and hybrid configurations
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">Integration Essentials</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Flow temp:</strong> 35-45C for best efficiency</li>
              <li><strong>UFH:</strong> Ideal for low-temp operation</li>
              <li><strong>Radiators:</strong> May need 50-100% upsize</li>
              <li><strong>Buffer:</strong> Prevents short cycling</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Control Strategy</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Weather comp:</strong> Essential for efficiency</li>
              <li><strong>Room stat:</strong> Overall demand control</li>
              <li><strong>Continuous:</strong> Better than intermittent</li>
              <li><strong>Min run time:</strong> 10-15 minutes</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Design low-temperature distribution systems",
              "Integrate hot water production efficiently",
              "Apply buffer tank and hydraulic separation",
              "Configure weather compensation controls",
              "Assess radiator adequacy for heat pumps",
              "Design hybrid and bivalent systems"
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
            Heat Distribution Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective heat distribution at low temperatures is crucial for heat pump efficiency. The distribution system must deliver adequate warmth while minimising required flow temperature.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Underfloor Heating:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Flow temperature:</strong> 35-45C optimal for heat pumps</li>
                <li><strong>Surface temp:</strong> 25-29C comfortable floor surface</li>
                <li><strong>Output:</strong> 50-100 W/m2 depending on floor type</li>
                <li><strong>Response:</strong> Slower than radiators, suits continuous operation</li>
                <li><strong>Ideal pairing:</strong> Best distribution for heat pump efficiency</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Radiator Considerations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Output reduction:</strong> 50% or more at 45C vs 70C flow</li>
                <li><strong>Upsizing:</strong> Calculate actual output at intended flow temp</li>
                <li><strong>Options:</strong> Larger radiators, additional radiators, or fan convectors</li>
                <li><strong>Assessment:</strong> Room-by-room heat loss vs radiator output</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-white mb-2">Radiator Output Factors:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>At 70C:</strong> 100% of rated output</li>
                <li><strong>At 55C:</strong> Approximately 60% of rated</li>
                <li><strong>At 45C:</strong> Approximately 40% of rated</li>
                <li><strong>At 35C:</strong> Approximately 25% of rated</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Hot Water Integration
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Domestic hot water production with heat pumps requires specific cylinder design and consideration of Legionella control requirements.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Hot Water Cylinders:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Coil size:</strong> 2-3x larger than standard boiler cylinders</li>
                <li><strong>Temperature:</strong> Store at 50-55C for daily use</li>
                <li><strong>Legionella:</strong> Periodic heating to 60C required</li>
                <li><strong>Recovery:</strong> Slower than boiler - size for usage pattern</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Legionella Control Options:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Heat pump boost:</strong> High-temp models can reach 60C+</li>
                <li><strong>Immersion backup:</strong> Electric top-up for pasteurisation</li>
                <li><strong>Weekly cycle:</strong> Automated 60C heating cycle</li>
                <li><strong>WRAS compliance:</strong> System design must address Legionella</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Cylinder Sizing:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Domestic:</strong> 150-300 litres typical</li>
                <li><strong>Based on:</strong> Occupants, bathing preferences, recovery rate</li>
                <li><strong>Buffer vs DHW:</strong> Separate tanks for different functions</li>
                <li><strong>Location:</strong> Close to heat pump for efficiency</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Hydraulic Design
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Proper hydraulic design ensures adequate flow through the heat pump while accommodating variable flow in the distribution system.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Buffer Tanks:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Purpose:</strong> Prevent short cycling, ensure minimum flow</li>
                <li><strong>Sizing:</strong> 10-20 litres per kW of heat pump capacity</li>
                <li><strong>Temperature:</strong> Acts as thermal buffer, not storage</li>
                <li><strong>Position:</strong> Between heat pump and distribution</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Low-Loss Headers:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Function:</strong> Hydraulically separates circuits</li>
                <li><strong>Benefit:</strong> Different flow rates in each circuit</li>
                <li><strong>Design:</strong> Low velocity through header minimises mixing</li>
                <li><strong>Applications:</strong> Multiple heat sources, variable distribution</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Flow Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Heat pump:</strong> Fixed or minimum flow requirement</li>
                <li><strong>Delta T:</strong> Typically 5C for heating (check manufacturer)</li>
                <li><strong>Circulation pump:</strong> Sized for system head loss</li>
                <li><strong>Balancing:</strong> Ensure flow to all emitters</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Control Strategies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective controls maximise heat pump efficiency by matching output to demand and optimising operating conditions.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Weather Compensation:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Principle:</strong> Adjust flow temp based on outdoor temp</li>
                <li><strong>Cold weather:</strong> Higher flow temperature for more output</li>
                <li><strong>Mild weather:</strong> Lower flow temperature for efficiency</li>
                <li><strong>Curve setting:</strong> Adjusted based on building heat loss</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Room Control:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Room thermostat:</strong> Master on/off control</li>
                <li><strong>TRV considerations:</strong> Set high to avoid short cycling</li>
                <li><strong>Zone control:</strong> Multiple room thermostats possible</li>
                <li><strong>Smart controls:</strong> Learning thermostats optimise operation</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Operating Strategy</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Continuous operation:</strong> Better efficiency than intermittent</li>
                <li><strong>Setback:</strong> Mild overnight reduction (2-3C max)</li>
                <li><strong>Pre-heat:</strong> Avoid morning boost periods</li>
                <li><strong>Time-of-use:</strong> Align with cheap electricity periods</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Hybrid and Bivalent Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Hybrid systems combine heat pumps with other heat sources, providing flexibility for challenging buildings or as a transition approach.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Bivalent Configurations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Bivalent parallel:</strong> Both sources can operate simultaneously</li>
                <li><strong>Bivalent alternative:</strong> Switchover between sources</li>
                <li><strong>Bivalent point:</strong> Outdoor temp where switchover occurs</li>
                <li><strong>Control:</strong> Automatic selection based on conditions</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Hybrid Systems:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Heat pump + boiler:</strong> Automatic switching based on efficiency</li>
                <li><strong>Cost optimisation:</strong> Select source based on energy prices</li>
                <li><strong>Retrofit friendly:</strong> Keep existing boiler as backup</li>
                <li><strong>Transition approach:</strong> Move to full heat pump later</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">When to Consider Hybrid:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Poor insulation:</strong> Building needs high temps some times</li>
                <li><strong>Limited capacity:</strong> Electrical supply constraints</li>
                <li><strong>Customer concern:</strong> Reassurance of backup heating</li>
                <li><strong>Economics:</strong> May reduce capital cost</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Designing Integration</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Calculate radiator outputs at intended flow temperature</li>
                <li>Specify heat pump-compatible hot water cylinder</li>
                <li>Include buffer tank for cycling protection</li>
                <li>Ensure weather compensation is configured</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Commissioning</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Set weather compensation curve appropriately</li>
                <li>Verify delta T across heat pump</li>
                <li>Configure Legionella cycles for hot water</li>
                <li>Educate customer on continuous operation benefits</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Using boiler setpoints</strong> - running too hot wastes efficiency</li>
                <li><strong>Deep setback</strong> - causes inefficient recovery periods</li>
                <li><strong>TRVs too low</strong> - causes short cycling</li>
                <li><strong>Ignoring radiator output</strong> - rooms may not reach temperature</li>
              </ul>
            </div>
          </div>
        </section>

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

        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-5">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default RenewableEnergyModule5Section4;
