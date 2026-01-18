import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import { bmsModule3Section1QuizData } from "@/data/upskilling/bmsModule3Section1QuizData";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "hvac-check1",
    question: "Why would a BMS increase AHU airflow when CO₂ levels rise?",
    options: [
      "To reduce energy consumption",
      "To indicate higher occupancy requiring more fresh air",
      "To test the ventilation system",
      "To cool down the space"
    ],
    correctIndex: 1,
    explanation: "Higher CO₂ levels indicate more people in the space, requiring increased fresh air ventilation to maintain air quality and comfort for occupants."
  },
  {
    id: "hvac-check2",
    question: "Why do FCUs often suit hotels and offices more than AHUs?",
    options: [
      "FCUs are cheaper to install",
      "FCUs provide individual room/zone control",
      "FCUs use less electricity",
      "FCUs don't require maintenance"
    ],
    correctIndex: 1,
    explanation: "FCUs provide individual room or zone control, making them ideal for hotels and offices where different spaces may have different occupancy patterns and comfort requirements."
  },
  {
    id: "hvac-check3",
    question: "What is the benefit of sequencing multiple chillers rather than running all of them constantly?",
    options: [
      "It reduces installation costs",
      "It matches cooling output to demand, avoiding waste",
      "It makes maintenance easier",
      "It reduces noise levels"
    ],
    correctIndex: 1,
    explanation: "Sequencing chillers matches cooling output to actual demand, running only what's needed. Multiple chillers at part-load are less efficient than fewer chillers at optimal load."
  },
  {
    id: "hvac-check4",
    question: "How does scheduling boilers through BMS reduce wasted fuel?",
    options: [
      "By running boilers at maximum output all day",
      "By heating spaces only when occupied or just before occupancy",
      "By using electric heating instead",
      "By reducing the number of boilers installed"
    ],
    correctIndex: 1,
    explanation: "BMS scheduling allows boilers to heat spaces only when needed or just before occupancy, rather than maintaining temperature continuously during unoccupied periods, significantly reducing fuel consumption."
  }
];

const faqs = [
  {
    question: "What's the difference between an AHU and an FCU?",
    answer: "An AHU is a large centralised system that conditions and circulates air through ducts to multiple spaces. An FCU is a smaller, decentralised unit typically serving individual rooms or zones with local heating/cooling via a coil and fan."
  },
  {
    question: "Why are chillers staged rather than run continuously?",
    answer: "Staging matches cooling output to actual demand. Running all chillers at part-load is inefficient. Sequencing allows fewer chillers to run at optimal efficiency while meeting actual building loads."
  },
  {
    question: "What safety systems do boilers require?",
    answer: "Boilers need flame detection (UV/ionisation), high limit controls to prevent overheating, low water cutoff, combustion air proving, and high/low pressure safety switches. These protect both the equipment and building occupants."
  },
  {
    question: "How does a VFD improve HVAC efficiency?",
    answer: "Variable Frequency Drives allow fans and pumps to operate at reduced speeds during partial load conditions. Since power varies as the cube of speed, reducing speed to 50% uses only about 12.5% of full-speed power."
  }
];

const BMSModule3Section1 = () => {
  useSEO({
    title: "HVAC Systems in BMS | BMS Module 3.1",
    description: "Learn how AHU, FCU, chillers, and boilers integrate with Building Management Systems for efficient HVAC control and energy optimisation."
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/bms-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 3.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            HVAC Systems in BMS
          </h1>
          <p className="text-white">
            AHU, FCU, Chillers, and Boilers Integration
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>AHUs:</strong> Centralised air conditioning for large spaces</li>
              <li><strong>FCUs:</strong> Local zone control for individual rooms</li>
              <li><strong>Chillers:</strong> Centralised cooling water production</li>
              <li><strong>Boilers:</strong> Hot water/steam for heating</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Large mechanical plant rooms with ducts</li>
              <li><strong>Use:</strong> BMS integration for efficient sequencing</li>
              <li><strong>Wire:</strong> Sensors, actuators, VFDs to controllers</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Role of AHUs, FCUs, chillers, and boilers in building environments",
              "How BMS optimises HVAC operation for efficiency and comfort",
              "Electrician's responsibilities during HVAC integration",
              "Best practice installation and testing methods"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1: Air Handling Units */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Air Handling Units (AHUs)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              An Air Handling Unit is a large mechanical system designed to condition and circulate air through ducts.
              It may heat, cool, filter, and dehumidify air before supplying it to occupied spaces.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Components:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Filters:</strong> Remove particles, monitored by differential pressure sensors</li>
                <li><strong>Heating/Cooling Coils:</strong> Condition air temperature using hot/chilled water</li>
                <li><strong>Supply/Return Fans:</strong> Move air through ductwork, controlled by VFDs</li>
                <li><strong>Dampers:</strong> Control fresh air intake, return air, and relief air mixing</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">BMS Integration</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Fan control:</strong> Digital or analog outputs (on/off or VFD)</li>
                  <li><strong>Damper control:</strong> Actuators for fresh/recirculated air</li>
                  <li><strong>Filter monitoring:</strong> Alarms when replacement needed</li>
                  <li><strong>Temperature sequencing:</strong> Based on supply air setpoints</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Electrical Connections</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Sensors:</strong> Supply, return, mixed air to analog inputs</li>
                  <li><strong>Status monitoring:</strong> Auxiliary contacts on motor starters</li>
                  <li><strong>Speed control:</strong> 0-10V or 4-20mA to VFDs</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-transparent border border-white/10">
              <p className="text-sm text-white">
                <strong>Example:</strong> In a theatre, an AHU linked to CO₂ sensors increases ventilation automatically
                when occupancy levels rise. This improves comfort while saving energy compared to running fans at full speed constantly.
              </p>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[0]} />
        </section>

        {/* Section 2: Fan Coil Units */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Fan Coil Units (FCUs)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Fan Coil Units are smaller, decentralised HVAC devices often located in individual rooms or zones.
              They contain a coil that passes hot or chilled water and a fan that blows conditioned air into the space.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Types</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Ceiling-mounted:</strong> Hidden above false ceiling, ducted to grilles</li>
                  <li><strong>Wall-mounted:</strong> Visible units with direct air discharge</li>
                  <li><strong>Floor-standing:</strong> Cabinet units in plant rooms or cupboards</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Control Components</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>2-Port valve:</strong> Modulates hot/chilled water flow</li>
                  <li><strong>Room thermostat:</strong> Senses temperature, provides setpoint</li>
                  <li><strong>Fan speed control:</strong> 3-speed or variable via triac/VFD</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Wiring Considerations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Separate mains supply for fan motor and low voltage for controls</li>
                <li>Valve actuator wiring: typically 24V AC or 230V depending on type</li>
                <li>BMS communication cables for remote monitoring and control</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-transparent border border-white/10">
              <p className="text-sm text-white">
                <strong>Example:</strong> In a hotel, FCUs are controlled by occupancy sensors — when a guest leaves,
                the unit turns off, preventing wasted heating or cooling.
              </p>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[1]} />
        </section>

        {/* Section 3: Chillers */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Chillers
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A chiller is a centralised unit that removes heat from water to supply chilled water for cooling systems.
              It typically serves large buildings with significant cooling demand.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Compressor Types</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Reciprocating:</strong> Smaller capacity, good part-load efficiency</li>
                  <li><strong>Screw:</strong> Medium to large, robust and reliable</li>
                  <li><strong>Centrifugal:</strong> Large capacity, high efficiency at full load</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Condenser Systems</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Air-cooled:</strong> Outdoor fans reject heat to atmosphere</li>
                  <li><strong>Water-cooled:</strong> Uses cooling tower, more efficient</li>
                  <li><strong>Evaporative:</strong> Combines air and water cooling</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BMS Integration:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Controls compressor staging to match cooling demand</li>
                <li>Adjusts chilled water setpoints based on outdoor conditions</li>
                <li>Optimises pump operation for efficiency</li>
                <li>Provides safety interlocks (low temp, high/low pressure)</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-transparent border border-white/10">
              <p className="text-sm text-white">
                <strong>Example:</strong> In an office block, chillers are sequenced so only one runs at low demand,
                but two or three start automatically in peak summer. This avoids unnecessary energy use while maintaining comfort.
              </p>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[2]} />
        </section>

        {/* Section 4: Boilers */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Boilers
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Boilers provide hot water or steam for space heating and hot water distribution.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Burner Controls</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Single stage:</strong> Simple on/off for small boilers</li>
                  <li><strong>Two stage:</strong> Low/high fire for better load matching</li>
                  <li><strong>Modulating:</strong> Continuous gas/oil flow adjustment</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-red-400/80 mb-2">Safety Systems</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Flame detection:</strong> UV or ionisation probes</li>
                  <li><strong>High limit:</strong> Prevent overheating</li>
                  <li><strong>Low water cutoff:</strong> Shuts down if level drops</li>
                  <li><strong>Combustion air proving:</strong> Ensures adequate air supply</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BMS Integration:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Monitors return water temperature and fires boilers only when required</li>
                <li>Controls pumps, valves, and burner stages to match demand</li>
                <li>Provides safety interlocks (e.g., shut-down if overheating occurs)</li>
                <li>Lead/lag pump operation to equalise equipment wear</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-transparent border border-white/10">
              <p className="text-sm text-white">
                <strong>Example:</strong> In a school, boilers are scheduled via the BMS to pre-heat classrooms 1 hour
                before lessons, then reduce output during empty periods. This cuts fuel bills significantly compared to running boilers all day.
              </p>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[3]} />
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">As an Electrician</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Wire sensors (temperature, pressure, flow) into BMS input terminals</li>
                <li>Connect actuators on valves and dampers for BMS control</li>
                <li>Ensure correct segregation between mains and low-voltage control signals</li>
                <li>Test circuits so commissioning engineers can program sequences with confidence</li>
                <li>Label all control points — poor documentation causes delays later</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Poor labelling</strong> — makes troubleshooting difficult</li>
                <li><strong>Mixed voltage levels</strong> — keep mains separate from control wiring</li>
                <li><strong>Wrong sensor placement</strong> — affects system accuracy</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Real World Example */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">Real World Example</h2>
          <div className="p-5 rounded-lg bg-transparent border border-white/10">
            <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Shopping Centre in Leeds</h3>
            <div className="text-sm text-white space-y-3">
              <p><strong>Challenge:</strong> HVAC consumed over half of total energy use.</p>
              <p><strong>Solution:</strong> Integrated AHUs, FCUs, chillers, and boilers into the BMS with smarter sequencing:</p>
              <ul className="ml-4 space-y-1">
                <li>• AHUs reduced speed when CO₂ was low</li>
                <li>• Boilers fired only when heating demand exceeded thresholds</li>
                <li>• Chillers were staged based on load demand</li>
              </ul>
              <p><strong>Result:</strong> 25% reduction in HVAC energy costs in the first year. The key success factor was accurate wiring and sensor placement by the electrical team.</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Reference */}
        <div className="mt-6 p-5 rounded-lg bg-transparent border border-white/10">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-elec-yellow/80 mb-1">HVAC Equipment Types</p>
              <ul className="space-y-0.5">
                <li>AHU: Centralised air conditioning</li>
                <li>FCU: Local zone heating/cooling</li>
                <li>Chiller: Chilled water production</li>
                <li>Boiler: Hot water/steam production</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-elec-yellow/80 mb-1">Control Signals</p>
              <ul className="space-y-0.5">
                <li>VFD control: 0-10V or 4-20mA</li>
                <li>Valve actuators: 24V AC or 230V</li>
                <li>Temperature sensors: Analog inputs</li>
                <li>Status monitoring: Digital inputs</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <section className="my-10">
          <SingleQuestionQuiz
            questions={bmsModule3Section1QuizData}
            title="Test Your Knowledge"
          />
        </section>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/bms-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 3
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bms-module-3-section-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BMSModule3Section1;
