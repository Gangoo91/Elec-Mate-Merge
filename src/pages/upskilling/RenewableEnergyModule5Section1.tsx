import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Heat Pump Fundamentals - Renewable Energy Module 5";
const DESCRIPTION = "Learn the fundamental principles of heat pump technology including thermodynamics, refrigeration cycle, and coefficient of performance for heating and cooling applications.";

const quickCheckQuestions = [
  {
    id: "hp-basic-principle",
    question: "What is the fundamental principle of heat pump operation?",
    options: ["Generating heat through combustion", "Moving heat from a cooler space to a warmer space using work input", "Converting electricity directly to heat", "Storing heat in thermal mass"],
    correctIndex: 1,
    explanation: "Heat pumps move heat from a cooler source (air, ground, water) to a warmer space (building interior) using electrical work to drive the refrigeration cycle, achieving efficiencies exceeding 100%."
  },
  {
    id: "hp-cop-meaning",
    question: "What does a Coefficient of Performance (COP) of 4 mean?",
    options: ["The system is 4% efficient", "For every 1 kW of electricity, 4 kW of heat is delivered", "The system runs 4 times per day", "Heating capacity is 4 kW"],
    correctIndex: 1,
    explanation: "A COP of 4 means for every 1 kW of electrical energy input, the heat pump delivers 4 kW of heat output. This includes both the electrical energy and the heat extracted from the source."
  },
  {
    id: "hp-refrigerant-function",
    question: "What is the primary function of refrigerant in a heat pump?",
    options: ["To generate heat", "To absorb and release heat through phase changes", "To lubricate the compressor", "To cool the electronics"],
    correctIndex: 1,
    explanation: "Refrigerant absorbs heat when it evaporates (low pressure) and releases heat when it condenses (high pressure), enabling heat transfer from cold to hot through the refrigeration cycle."
  },
  {
    id: "hp-source-types",
    question: "Which heat pump source typically provides the most stable year-round performance?",
    options: ["Air source", "Ground source", "Exhaust air", "Direct electric"],
    correctIndex: 1,
    explanation: "Ground source heat pumps provide the most stable performance because ground temperature remains relatively constant (8-12C in UK) year-round, unlike air temperature which varies significantly."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What are the four main components of the refrigeration cycle?",
    options: [
      "Boiler, radiator, pump, tank",
      "Compressor, condenser, expansion valve, evaporator",
      "Fan, coil, filter, duct",
      "Motor, generator, transformer, switch"
    ],
    correctAnswer: 1,
    explanation: "The refrigeration cycle consists of compressor (increases pressure/temperature), condenser (releases heat), expansion valve (reduces pressure), and evaporator (absorbs heat)."
  },
  {
    id: 2,
    question: "What happens to refrigerant in the evaporator?",
    options: [
      "It condenses and releases heat",
      "It evaporates and absorbs heat from the source",
      "It is compressed to high pressure",
      "It expands to create cooling"
    ],
    correctAnswer: 1,
    explanation: "In the evaporator, low-pressure liquid refrigerant evaporates (changes to gas) by absorbing heat from the heat source (air, ground, or water), cooling the source."
  },
  {
    id: 3,
    question: "What is the typical COP range for air source heat pumps in UK winter conditions?",
    options: [
      "1.0-1.5",
      "2.5-3.5",
      "5.0-6.0",
      "8.0-10.0"
    ],
    correctAnswer: 1,
    explanation: "Air source heat pumps typically achieve COP of 2.5-3.5 in UK winter conditions (0-7C ambient). COP decreases as outdoor temperature drops and increases in milder conditions."
  },
  {
    id: 4,
    question: "Why do heat pumps become less efficient at very low outdoor temperatures?",
    options: [
      "The compressor overheats",
      "Greater temperature lift requires more work for the same heat transfer",
      "Refrigerant freezes",
      "Electricity costs more at night"
    ],
    correctAnswer: 1,
    explanation: "Greater temperature difference between source and output (temperature lift) requires more compressor work. At -5C ambient heating to 45C requires more work than at 7C ambient."
  },
  {
    id: 5,
    question: "What is the function of the expansion valve in a heat pump?",
    options: [
      "To compress the refrigerant",
      "To reduce refrigerant pressure and temperature before the evaporator",
      "To heat the refrigerant",
      "To filter the refrigerant"
    ],
    correctAnswer: 1,
    explanation: "The expansion valve rapidly reduces refrigerant pressure, causing temperature drop through the Joule-Thomson effect, preparing refrigerant for heat absorption in the evaporator."
  },
  {
    id: 6,
    question: "What is SCOP and how does it differ from COP?",
    options: [
      "Same measurement, different units",
      "SCOP is seasonal average efficiency, COP is instantaneous",
      "SCOP is for cooling, COP is for heating",
      "No difference"
    ],
    correctAnswer: 1,
    explanation: "SCOP (Seasonal Coefficient of Performance) represents average efficiency across a typical heating season, accounting for varying conditions. COP is instantaneous efficiency at specific test conditions."
  },
  {
    id: 7,
    question: "What happens to refrigerant in the condenser?",
    options: [
      "It evaporates and absorbs heat",
      "It condenses and releases heat to the heating system",
      "It expands and cools",
      "It is compressed"
    ],
    correctAnswer: 1,
    explanation: "In the condenser, high-pressure gaseous refrigerant condenses (changes to liquid) by releasing heat to the heating system (water or air), warming the building."
  },
  {
    id: 8,
    question: "What is the typical ground temperature in the UK at 1.2m depth?",
    options: [
      "0-4C",
      "8-12C",
      "15-20C",
      "20-25C"
    ],
    correctAnswer: 1,
    explanation: "Ground temperature at typical collector depth (1.2m) in the UK remains relatively stable at 8-12C year-round, providing a consistent heat source for ground source heat pumps."
  },
  {
    id: 9,
    question: "What type of refrigerant is R32 and why is it increasingly used?",
    options: [
      "CFC with high efficiency",
      "HFC with lower GWP than R410A",
      "Natural refrigerant",
      "Hydrocarbon with zero GWP"
    ],
    correctAnswer: 1,
    explanation: "R32 is an HFC refrigerant with GWP of 675 compared to R410A's 2088. It offers similar performance with lower environmental impact, making it popular for new heat pump designs."
  },
  {
    id: 10,
    question: "What is the primary advantage of inverter-driven compressors?",
    options: [
      "Lower purchase cost",
      "Variable speed operation matches output to demand, improving efficiency",
      "Simpler installation",
      "No refrigerant required"
    ],
    correctAnswer: 1,
    explanation: "Inverter compressors vary speed to match heating demand, avoiding inefficient on/off cycling. This improves seasonal efficiency, reduces wear, and provides more stable temperatures."
  }
];

const faqs = [
  {
    question: "Can heat pumps work in very cold UK winters?",
    answer: "Yes, modern air source heat pumps operate effectively down to -15C to -25C depending on model. Performance (COP) decreases at lower temperatures but remains above 1.0 (better than direct electric). Ground source maintains consistent performance regardless of air temperature."
  },
  {
    question: "Why do heat pumps require larger radiators than boilers?",
    answer: "Heat pumps operate most efficiently at lower flow temperatures (35-45C vs 60-75C for boilers). Lower water temperature requires larger heat emitter surface area to deliver the same heat output. This is why underfloor heating pairs well with heat pumps."
  },
  {
    question: "What is defrost cycle and why is it needed?",
    answer: "In cold, humid conditions, ice forms on air source heat pump outdoor coils. Defrost cycles periodically reverse the refrigeration cycle to melt ice, maintaining efficiency. This uses energy and temporarily reduces heating output."
  },
  {
    question: "How does a heat pump provide both heating and cooling?",
    answer: "Reversible heat pumps use a four-way valve to reverse refrigerant flow direction. In heating mode, the outdoor unit is the evaporator. In cooling mode, it becomes the condenser, rejecting heat outdoors."
  },
  {
    question: "What factors affect heat pump efficiency most?",
    answer: "Key factors include: source temperature (higher is better), output temperature (lower is better), temperature lift (difference between source and output), compressor technology, and system design. Proper sizing and installation are critical."
  },
  {
    question: "Are heat pumps suitable for older properties with poor insulation?",
    answer: "Heat pumps can work in older properties but perform best in well-insulated buildings. Poor insulation requires higher output temperatures, reducing efficiency. Fabric improvements, larger radiators, or hybrid systems may be needed for older properties."
  }
];

const RenewableEnergyModule5Section1 = () => {
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
            <span>Module 5 Section 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Heat Pump Fundamentals
          </h1>
          <p className="text-white/80">
            Thermodynamic principles, refrigeration cycle, and efficiency metrics
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">Key Principles</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Function:</strong> Moves heat from cold to hot</li>
              <li><strong>COP:</strong> Heat output / electrical input</li>
              <li><strong>SCOP:</strong> Seasonal average efficiency</li>
              <li><strong>Typical COP:</strong> 2.5-4.5 depending on type</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Refrigeration Cycle</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Evaporator:</strong> Absorbs heat (low pressure)</li>
              <li><strong>Compressor:</strong> Increases pressure/temp</li>
              <li><strong>Condenser:</strong> Releases heat (high pressure)</li>
              <li><strong>Expansion:</strong> Reduces pressure/temp</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand heat pump thermodynamic principles",
              "Explain the refrigeration cycle operation",
              "Calculate and interpret COP and SCOP",
              "Compare different heat source types",
              "Identify factors affecting efficiency",
              "Understand refrigerant properties and selection"
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
            Basic Thermodynamic Principles
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Heat pumps exploit the thermodynamic principle that heat naturally flows from hot to cold, but can be made to flow the opposite direction by applying external work - in this case, electrical energy to drive a compressor.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Heat Transfer Principles:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Natural flow:</strong> Heat moves from hot to cold spontaneously</li>
                <li><strong>Reversed flow:</strong> Work input can move heat from cold to hot</li>
                <li><strong>Phase change:</strong> Evaporation absorbs heat, condensation releases heat</li>
                <li><strong>Pressure-temperature:</strong> Refrigerant boiling point varies with pressure</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Energy Balance:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Heat delivered:</strong> Heat from source + electrical input</li>
                <li><strong>Example:</strong> 3 kW from source + 1 kW electrical = 4 kW delivered</li>
                <li><strong>COP calculation:</strong> 4 kW output / 1 kW input = COP 4.0</li>
                <li><strong>Efficiency &gt;100%:</strong> Not violating physics - moving existing heat</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-white mb-2">Temperature Lift:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Definition:</strong> Difference between source and output temperature</li>
                <li><strong>Impact:</strong> Higher lift requires more work, reducing COP</li>
                <li><strong>Example:</strong> 7C source to 35C output = 28C lift (efficient)</li>
                <li><strong>Example:</strong> -5C source to 55C output = 60C lift (less efficient)</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            The Refrigeration Cycle
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The refrigeration cycle is the heart of heat pump operation, using phase changes of refrigerant to absorb heat at low temperature and release it at high temperature.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Cycle Stages:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>1. Evaporation:</strong> Cold liquid refrigerant absorbs heat from source, becoming gas</li>
                <li><strong>2. Compression:</strong> Compressor increases gas pressure and temperature</li>
                <li><strong>3. Condensation:</strong> Hot gas releases heat to heating system, becoming liquid</li>
                <li><strong>4. Expansion:</strong> Expansion valve reduces pressure and temperature</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Component Functions:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Evaporator:</strong> Heat exchanger where refrigerant absorbs heat</li>
                <li><strong>Compressor:</strong> Pump that circulates refrigerant and raises pressure</li>
                <li><strong>Condenser:</strong> Heat exchanger where refrigerant releases heat</li>
                <li><strong>Expansion valve:</strong> Throttling device that controls refrigerant flow</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Refrigerant State Changes:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Evaporator outlet:</strong> Low pressure, low temperature gas</li>
                <li><strong>Compressor outlet:</strong> High pressure, high temperature gas</li>
                <li><strong>Condenser outlet:</strong> High pressure, medium temperature liquid</li>
                <li><strong>Expansion valve outlet:</strong> Low pressure, low temperature liquid/mixture</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Efficiency Metrics
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding efficiency metrics is essential for comparing heat pump performance and predicting running costs across different operating conditions.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Coefficient of Performance (COP):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Formula:</strong> COP = Heat output (kW) / Electrical input (kW)</li>
                <li><strong>Heating mode:</strong> COP typically 2.5-5.0 depending on conditions</li>
                <li><strong>Cooling mode:</strong> Called EER (Energy Efficiency Ratio)</li>
                <li><strong>Test conditions:</strong> Measured at specific temperatures (e.g., A7/W35)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Seasonal Performance:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>SCOP:</strong> Seasonal COP - average across heating season</li>
                <li><strong>SEER:</strong> Seasonal EER - average across cooling season</li>
                <li><strong>SPF:</strong> Seasonal Performance Factor - measured in-situ</li>
                <li><strong>Calculation:</strong> Based on climate zone and load profile</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Test Condition Notation</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>A7/W35:</strong> Air 7C, Water flow 35C</li>
                <li><strong>A7/W55:</strong> Air 7C, Water flow 55C</li>
                <li><strong>B0/W35:</strong> Brine 0C, Water flow 35C</li>
                <li><strong>W10/W35:</strong> Water source 10C, Water flow 35C</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Heat Source Types
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Different heat sources offer varying characteristics in terms of temperature stability, installation requirements, and seasonal performance.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Air Source:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Temperature range:</strong> -15C to +35C typical operating range</li>
                <li><strong>Advantages:</strong> Lower installation cost, easier retrofit</li>
                <li><strong>Challenges:</strong> Performance varies with ambient temperature</li>
                <li><strong>Defrost:</strong> Required in cold, humid conditions</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Ground Source:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Temperature:</strong> 8-12C year-round in UK at 1.2m depth</li>
                <li><strong>Advantages:</strong> Stable temperature, higher seasonal efficiency</li>
                <li><strong>Collectors:</strong> Horizontal (land area) or vertical (boreholes)</li>
                <li><strong>Challenges:</strong> Higher installation cost, ground works required</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Water Source:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Sources:</strong> Rivers, lakes, aquifers, sea water</li>
                <li><strong>Temperature:</strong> Generally stable, varies by source</li>
                <li><strong>Advantages:</strong> High efficiency, no ground loops needed</li>
                <li><strong>Challenges:</strong> Site-specific availability, permits required</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Refrigerants
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Refrigerant selection affects heat pump efficiency, environmental impact, and safety considerations. The industry is transitioning to lower GWP alternatives.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common Refrigerants:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>R410A:</strong> Widely used HFC, GWP 2088, being phased down</li>
                <li><strong>R32:</strong> Lower GWP (675), increasingly used in ASHPs</li>
                <li><strong>R290:</strong> Propane, GWP 3, flammable, high efficiency</li>
                <li><strong>R744:</strong> CO2, GWP 1, requires high pressure systems</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Selection Factors:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>GWP:</strong> Global Warming Potential (lower is better)</li>
                <li><strong>Efficiency:</strong> Thermodynamic properties affect COP</li>
                <li><strong>Safety:</strong> Flammability and toxicity classifications</li>
                <li><strong>Operating range:</strong> Suitable for application temperatures</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">F-Gas Regulations</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Phase-down:</strong> HFC quota reducing to 2036</li>
                <li><strong>Training:</strong> F-Gas certification required for handling</li>
                <li><strong>Leak checks:</strong> Regular checks for systems &gt;5 tonnes CO2e</li>
                <li><strong>Records:</strong> Logbook requirements for refrigerant handling</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Explaining Heat Pumps to Customers</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Focus on moving heat rather than generating it</li>
                <li>Use COP to explain efficiency in practical terms</li>
                <li>Set realistic expectations for winter performance</li>
                <li>Explain the importance of low flow temperatures</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Assessing Suitability</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Evaluate building insulation and heat loss</li>
                <li>Consider existing heat distribution system</li>
                <li>Assess available space for outdoor unit or ground loops</li>
                <li>Check electrical supply capacity</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Oversizing</strong> - leads to short cycling and inefficiency</li>
                <li><strong>High flow temps</strong> - using heat pump like a boiler</li>
                <li><strong>Ignoring heat loss</strong> - mismatch between capacity and demand</li>
                <li><strong>Poor defrost management</strong> - reduces ASHP performance</li>
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
            <Link to="/electrician/upskilling/renewable-energy-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default RenewableEnergyModule5Section1;
