import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import { bmsModule2Section3QuizData } from "@/data/upskilling/bmsModule2Section3QuizData";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "actuator-difference",
    question: "What is the difference between an on/off actuator and a modulating actuator?",
    options: [
      "On/off actuators are faster than modulating actuators",
      "On/off actuators move fully open or closed, while modulating actuators adjust position gradually",
      "On/off actuators use more power than modulating actuators",
      "On/off actuators are only used for safety systems"
    ],
    correctIndex: 1,
    explanation: "On/off (digital) actuators provide binary control with only two positions - fully open or fully closed. Modulating (analog) actuators allow precise positioning at any point between 0-100% for proportional control."
  },
  {
    id: "valve-type",
    question: "What type of valve diverts flow between two different circuits?",
    options: [
      "2-way valve",
      "Ball valve",
      "3-way valve",
      "Globe valve"
    ],
    correctIndex: 2,
    explanation: "3-way valves can divert flow between two different circuits. They can be configured as mixing valves (combining two inlet flows) or diverting valves (splitting one inlet to two outlets)."
  },
  {
    id: "damper-use",
    question: "Give one example of how dampers are used in a ventilation system.",
    options: [
      "To control water temperature in heating coils",
      "To detect occupancy in meeting rooms",
      "To control fresh air intake for ventilation",
      "To measure CO2 levels in classrooms"
    ],
    correctIndex: 2,
    explanation: "Dampers are commonly used to control fresh air intake in ventilation systems, regulating the amount of outside air entering the building for proper ventilation and energy efficiency."
  },
  {
    id: "commissioning-test",
    question: "Why must electricians test actuator movement during commissioning?",
    options: [
      "To check the actuator's power consumption",
      "To confirm correct operation and system response before handover",
      "To measure the actuator's noise levels",
      "To verify the actuator's warranty coverage"
    ],
    correctIndex: 1,
    explanation: "Testing actuator movement during commissioning confirms that the actuator operates correctly, responds to control signals, and moves in the right direction before the system is handed over to the client."
  }
];

const faqs = [
  {
    question: "What's the difference between spring return and non-spring return actuators?",
    answer: "Spring return actuators automatically move to a predetermined safe position (open or closed) on power loss - essential for safety applications like freeze protection. Non-spring return actuators hold their last position during power failure."
  },
  {
    question: "How do I know if an actuator needs analog or digital control?",
    answer: "Check the valve/damper application: on/off isolation uses digital (24V switching), while temperature/flow modulation needs analog (0-10V or 4-20mA). The BMS design documents should specify the control type for each actuator."
  },
  {
    question: "What is Cv rating on a valve?",
    answer: "Cv (flow coefficient) indicates the valve's flow capacity - GPM of water at 1 PSI pressure drop. Proper Cv sizing is critical; oversized valves cause poor control resolution, undersized valves restrict flow. HVAC engineers calculate this during design."
  },
  {
    question: "How long should actuators take to operate?",
    answer: "Typical stroke times: 15-60 seconds for small actuators, 60-180 seconds for larger ones. Faster isn't always better - too fast can cause water hammer in pipes or pressure spikes in ducts. Match stroke time to system requirements."
  }
];

const BMSModule2Section3 = () => {
  useSEO({
    title: "Actuators, Valves, and Dampers | BMS Course",
    description: "Learn about actuators, valves, and dampers in Building Management Systems. Understand control devices, installation requirements, and wiring for HVAC control."
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician/upskilling/bms-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 2.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Actuators, Valves, and Dampers
          </h1>
          <p className="text-white">
            Control devices and mechanical components
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Actuators:</strong> "Muscles" that convert signals to movement</li>
              <li><strong>Valves:</strong> Control water/fluid flow in pipes</li>
              <li><strong>Dampers:</strong> Control airflow in ducts</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">On Site</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Digital:</strong> 24V AC/DC for on/off control</li>
              <li><strong>Analog:</strong> 0-10V or 4-20mA for modulation</li>
              <li><strong>Test:</strong> Full stroke operation before handover</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the role of actuators in a BMS",
              "Identify different types of actuators used with valves and dampers",
              "Understand the difference between digital (on/off) and analog (modulating) control",
              "Recognise the electrician's responsibilities in installing and wiring actuators"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1: Actuators - The Basics */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Actuators – The Basics
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Actuators convert electrical signals into mechanical movement, serving as the physical interface
              between the digital BMS and mechanical building systems.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Types of Actuators</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>On/Off (Digital):</strong> Binary control - fully open or fully closed, 24V AC/DC operation</li>
                <li><strong>Modulating (Analog):</strong> Precise positioning 0-100%, accepts 0-10V DC or 4-20mA</li>
                <li><strong>Spring Return:</strong> Fail to predetermined position on power loss (safety applications)</li>
                <li><strong>Non-Spring Return:</strong> Hold last position during power failure</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Power Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li>24V AC/DC most common for HVAC</li>
                  <li>230V AC for larger industrial actuators</li>
                  <li>Power consumption: 3-10VA typical</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Control Signals</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Digital: 24V AC/DC or dry contacts</li>
                  <li>Analog: 0-10V DC or 4-20mA</li>
                  <li>Operating time: 15s to 4min full stroke</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Applications</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>HVAC Control:</strong> Temperature control through valve and damper positioning</li>
                <li><strong>Energy Optimisation:</strong> Variable flow control to match building demand</li>
                <li><strong>Safety Systems:</strong> Fire and smoke dampers for emergency isolation</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Valves in BMS */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Valves in BMS
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Control valves regulate the flow of water or other fluids in HVAC systems. Combined with actuators,
              they provide precise flow control for heating, cooling, and domestic water systems.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Types of Valves</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>2-Way Valves:</strong> Regulate flow rate in a single circuit, on/off or modulating</li>
                <li><strong>3-Way Valves:</strong> Divert flow between circuits - mixing or diverting configuration</li>
                <li><strong>Ball Valves:</strong> Quick 90° operation, full bore flow, good for isolation</li>
                <li><strong>Globe Valves:</strong> Better for throttling control, linear flow characteristics</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Valve Sizing (Cv)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Cv = Flow coefficient (GPM at 1 PSI drop)</li>
                  <li>Critical for proper system performance</li>
                  <li>Oversized = poor control resolution</li>
                  <li>Undersized = restricted flow</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Flow Characteristics</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Linear:</strong> Flow proportional to position</li>
                  <li><strong>Equal %:</strong> Better for variable loads</li>
                  <li><strong>Quick opening:</strong> Max flow with small movement</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Applications</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Chilled Water Systems:</strong> 2-way for variable flow, 3-way for constant flow</li>
                <li><strong>Heating Coils:</strong> Often require spring return for freeze protection</li>
                <li><strong>Hot Water Distribution:</strong> Temperature control and circulation management</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Dampers in BMS */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Dampers in BMS
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Dampers control airflow in ducts and ventilation systems. They can operate digitally
              (fully open/closed) or with analog control for precise airflow modulation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Types of Dampers</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Volume Control Dampers:</strong> Regulate airflow quantity in supply/return/exhaust</li>
                <li><strong>Fire/Smoke Dampers:</strong> Safety devices that close automatically during fire</li>
                <li><strong>Outside Air Dampers:</strong> Control fresh air intake, often linked to CO2 sensors</li>
                <li><strong>Mixed Air Dampers:</strong> Coordinate OA, RA, and exhaust for optimal control</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Blade Types</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Parallel blade:</strong> Better shutoff, higher pressure drop</li>
                  <li><strong>Opposed blade:</strong> Better flow control characteristics</li>
                  <li><strong>Multi-blade:</strong> Large area applications</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Leakage Classes</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Class I:</strong> Standard (3-4 CFM/ft²)</li>
                  <li><strong>Class II:</strong> Low leakage (1-2 CFM/ft²)</li>
                  <li><strong>Class III:</strong> Extra low (&lt;1 CFM/ft²)</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Control Applications</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Fresh Air Intake:</strong> Minimum ventilation rates per BS EN 16798</li>
                <li><strong>Smoke Control:</strong> Automatic fire dampers linked to fire alarm systems</li>
                <li><strong>Pressure Regulation:</strong> Building and zone pressure management</li>
                <li><strong>Free Cooling:</strong> Economiser operation when outside air is suitable</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Installation and Electrician's Role */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Installation and Electrician's Role
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Proper installation and wiring of actuators is critical for system performance and reliability.
              Electricians must understand control signal types and follow best practices.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Wiring Requirements</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Digital Control (DI/DO):</strong> 24V AC/DC or dry contact switching, 2 or 3-wire</li>
                <li><strong>Analog Control (AI/AO):</strong> 0-10V DC or 4-20mA, requires screened cable</li>
                <li><strong>Power Supply Separation:</strong> Keep power and control circuits separate</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-400/50 my-6">
              <p className="text-red-400/90 text-sm font-medium mb-2">Critical Installation Checks</p>
              <ul className="text-sm text-white space-y-1">
                <li><strong>Power supply:</strong> Confirm voltage matches actuator requirements</li>
                <li><strong>Control signals:</strong> Verify signal levels and polarity</li>
                <li><strong>Mechanical:</strong> Check alignment and coupling, no binding</li>
                <li><strong>Safety:</strong> Verify spring return operation for safety applications</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Commissioning and Testing</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Movement testing:</strong> Test full stroke operation, verify correct direction</li>
                <li><strong>Control response:</strong> Verify actuator responds correctly to BMS commands</li>
                <li><strong>Documentation:</strong> Record settings, stroke times, and calibration data</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 my-6">
              <p className="text-elec-yellow/90 text-sm font-medium mb-2">Coordination with HVAC Engineers</p>
              <ul className="text-sm text-white space-y-1">
                <li>Confirm actuator torque ratings match valve/damper requirements</li>
                <li>Verify stroke time specifications for system response needs</li>
                <li>Check spring return requirements for safety applications</li>
                <li>Coordinate control sequences and interlocks</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Practical Guidance Section */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">As an Electrician</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always verify the actuator type before installation — digital and analog wiring differ</li>
                <li>Label cables clearly; actuator wiring often involves multiple conductors</li>
                <li>Check actuator stroke time to ensure it matches system design needs</li>
                <li>Keep documentation of actuator settings for maintenance teams</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Wrong control type:</strong> — modulating actuator wired as on/off gives no intermediate control</li>
                <li><strong>Missing feedback:</strong> — position feedback not connected to BMS for verification</li>
                <li><strong>Incorrect torque:</strong> — undersized actuator can't move valve/damper properly</li>
                <li><strong>Poor alignment:</strong> — misaligned coupling causes binding and premature failure</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Real World Example */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Real World Example: Commercial Office Project
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              On a commercial office project, several modulating valve actuators were mistakenly wired as on/off devices.
              This meant the BMS could only open or close valves fully, instead of adjusting flow gradually.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-red-400/80 mb-2">The Impact</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Rooms either too hot or too cold</li>
                  <li>No comfortable intermediate temperatures</li>
                  <li>Occupant complaints increased</li>
                  <li>Energy consumption increased due to inefficiency</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Solution</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Rewired into analog I/O channels</li>
                  <li>Proper 0-10V control signals applied</li>
                  <li>Smooth modulation achieved</li>
                  <li>15% reduction in energy consumption</li>
                </ul>
              </div>
            </div>

            <div className="p-3 rounded bg-elec-yellow/5 border border-elec-yellow/20">
              <p className="text-sm text-white">
                <strong>Key Lesson:</strong> Always verify whether an actuator requires digital or analog control before wiring.
                A few minutes checking the design documents prevents major commissioning issues later.
              </p>
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

        {/* Quick Reference Card */}
        <div className="mt-6 p-5 rounded-lg bg-transparent">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">Actuator Types</p>
              <ul className="space-y-0.5">
                <li>On/Off: 24V AC/DC, binary control</li>
                <li>Modulating: 0-10V or 4-20mA, proportional</li>
                <li>Spring return: Fail-safe position</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Valves & Dampers</p>
              <ul className="space-y-0.5">
                <li>2-way: Single circuit flow control</li>
                <li>3-way: Mixing/diverting between circuits</li>
                <li>Fire dampers: Spring return, fail-closed</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Summary */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4">Summary</h2>
          <div className="space-y-2">
            {[
              "Actuators are the mechanical output devices, converting electrical signals into physical movement",
              "Valves control fluid flow in water systems; dampers control air movement in ventilation",
              "On/off actuators provide binary control, modulating actuators allow precise positional adjustment",
              "Correct wiring, thorough testing, and HVAC coordination are essential for reliable operation"
            ].map((point, index) => (
              <div key={index} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <section className="mb-10">
          <SingleQuestionQuiz
            questions={bmsModule2Section3QuizData}
            title="Test Your Knowledge"
          />
        </section>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/bms-module-2-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/bms-module-2-section-4">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BMSModule2Section3;
