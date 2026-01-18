import { ArrowLeft, ArrowRight, Wind, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "HVAC Integration and Interlocks";
const DESCRIPTION = "Learn how heating, ventilation, and air conditioning systems work together through smart integration and interlocks to maximise efficiency and comfort.";

const quickCheckQuestions = [
  {
    question: "What is the primary purpose of HVAC interlocks?",
    options: ["To increase system power", "To prevent conflicting operations (e.g., heating and cooling simultaneously)", "To reduce installation costs", "To simplify wiring"],
    correctAnswer: 1,
    explanation: "HVAC interlocks prevent conflicting operations that would waste energy, such as the heating and cooling systems running at the same time working against each other."
  },
  {
    question: "What happens when a window sensor detects an open window in a properly integrated system?",
    options: ["Heating increases to compensate", "Nothing changes", "Heating/cooling pauses for that zone", "Alarm sounds"],
    correctAnswer: 2,
    explanation: "A properly integrated system will pause heating or cooling for the affected zone when windows are open, preventing energy waste from trying to condition outdoor air."
  },
  {
    question: "What is demand-controlled ventilation?",
    options: ["Ventilation that only runs during the day", "Adjusting ventilation based on occupancy or air quality", "Maximum ventilation at all times", "Ventilation controlled by outdoor temperature only"],
    correctAnswer: 1,
    explanation: "Demand-controlled ventilation adjusts airflow based on actual need, typically using CO2 sensors or occupancy detection to increase ventilation when needed and reduce it when spaces are unoccupied."
  }
];

const quizQuestions = [
  {
    question: "In a smart home, what should happen when the air conditioning activates?",
    options: ["Heating should also activate for balance", "Windows should open automatically", "Heating should be locked out", "Lighting should dim"],
    correctAnswer: 2,
    explanation: "When cooling activates, the heating system should be interlocked (locked out) to prevent both systems running simultaneously and working against each other."
  },
  {
    question: "What is a dead band in HVAC control?",
    options: ["A faulty temperature sensor", "A temperature range where neither heating nor cooling operates", "A type of ventilation duct", "Emergency shutdown mode"],
    correctAnswer: 1,
    explanation: "The dead band is a temperature range (typically 2-4 degrees C) between the heating and cooling setpoints where neither system operates, preventing rapid switching between modes."
  },
  {
    question: "Why should bathroom extraction be interlocked with whole-house ventilation?",
    options: ["To reduce noise", "To ensure adequate make-up air and prevent negative pressure issues", "To save installation cost", "To increase humidity"],
    correctAnswer: 1,
    explanation: "When bathroom extraction runs, the whole-house ventilation system should provide adequate make-up air to prevent negative pressure, which can cause backdraught from flues and poor extraction performance."
  },
  {
    question: "What smart sensor data is most useful for HVAC integration?",
    options: ["Light level only", "Sound level only", "Temperature, humidity, and CO2", "Vibration only"],
    correctAnswer: 2,
    explanation: "Temperature, humidity, and CO2 sensors provide the key data for intelligent HVAC control - enabling demand-based heating, cooling, and ventilation decisions."
  },
  {
    question: "What is the benefit of linking HVAC to occupancy detection?",
    options: ["Improved security", "Energy savings by reducing conditioning of unoccupied spaces", "Better lighting", "Faster internet"],
    correctAnswer: 1,
    explanation: "Occupancy-linked HVAC can reduce energy consumption significantly by automatically reducing heating, cooling, and ventilation in unoccupied rooms while maintaining comfort in occupied spaces."
  }
];

const faqs = [
  {
    question: "Can I integrate different HVAC brands into one smart system?",
    answer: "Yes, using a universal smart home platform like Home Assistant, Control4, or manufacturer-agnostic systems. The key is ensuring each component has accessible controls (relay, 0-10V, Modbus, etc.) that can be interfaced with the central system."
  },
  {
    question: "What happens if the smart system fails?",
    answer: "Well-designed systems include fail-safe operation. Heating and cooling typically default to maintaining safe temperatures. Ventilation continues at a base rate. Manual overrides should always be available. Critical interlocks may use hardwired connections as backup."
  },
  {
    question: "How do I prevent heating and cooling fighting each other?",
    answer: "Implement a dead band (typically 2-4 degrees C gap between heating and cooling setpoints), use interlocks to prevent simultaneous operation, and consider changeover delays to prevent rapid switching. Smart systems can learn optimal switching points."
  }
];

const SmartHomeModule4Section5 = () => {
  useSEO({
    title: `${TITLE} | Smart Home Module 4`,
    description: DESCRIPTION,
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 h-14 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:text-elec-yellow hover:bg-transparent touch-manipulation"
            asChild
          >
            <Link to="/electrician/upskilling/smart-home-module-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <span className="text-sm text-white">Section 5 of 6</span>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12 max-w-3xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-elec-yellow/10 mb-6">
            <Wind className="h-8 w-8 text-elec-yellow" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">{TITLE}</h1>
          <p className="text-white text-base sm:text-lg max-w-2xl mx-auto">{DESCRIPTION}</p>
        </header>

        {/* Quick Summary */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-sm font-medium text-elec-yellow mb-1">Key Focus</p>
            <p className="text-white text-sm">Coordinating heating, cooling, and ventilation</p>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-sm font-medium text-elec-yellow mb-1">Practical Skill</p>
            <p className="text-white text-sm">Configuring interlocks and system integration</p>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Learning Outcomes
          </h2>
          <ul className="space-y-3">
            {[
              "Understand the principles of HVAC system integration",
              "Design and implement appropriate interlocks",
              "Configure dead bands and changeover controls",
              "Integrate ventilation with heating and cooling systems",
              "Troubleshoot common integration issues"
            ].map((outcome, i) => (
              <li key={i} className="flex items-start gap-3 text-white">
                <CheckCircle className="h-5 w-5 text-elec-yellow shrink-0 mt-0.5" />
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* What is HVAC Integration */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            What is HVAC Integration?
          </h2>
          <p className="text-white mb-4">
            HVAC integration connects heating, ventilation, and air conditioning systems
            so they work together intelligently rather than as independent systems. This
            coordination improves comfort, efficiency, and reduces energy waste.
          </p>
          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h4 className="font-medium text-elec-yellow mb-2">Shared Sensors</h4>
              <p className="text-white text-sm">
                A single temperature sensor can serve both heating and cooling control,
                ensuring consistent setpoint references and eliminating sensor discrepancies.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h4 className="font-medium text-elec-yellow mb-2">Coordinated Schedules</h4>
              <p className="text-white text-sm">
                Heating and cooling schedules align with occupancy patterns. Ventilation
                rates adjust based on actual need rather than running constantly.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h4 className="font-medium text-elec-yellow mb-2">Unified Control Interface</h4>
              <p className="text-white text-sm">
                Users control all climate systems from a single app or panel, simplifying
                operation and ensuring consistent setpoint management.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Understanding Interlocks */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Understanding Interlocks
          </h2>
          <p className="text-white mb-4">
            Interlocks are control logic that prevents conflicting or wasteful system
            operations. They are essential for efficient HVAC coordination.
          </p>
          <div className="space-y-4 mb-4">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="font-medium text-elec-yellow mb-2">Heating/Cooling Interlock</h4>
              <p className="text-white text-sm">
                Prevents heating and cooling operating simultaneously. When cooling is
                active, heating is locked out, and vice versa. Essential in dual-mode
                systems like heat pump installations with backup heating.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="font-medium text-elec-yellow mb-2">Window/Door Interlock</h4>
              <p className="text-white text-sm">
                Pauses heating or cooling when windows or external doors are opened.
                Prevents wasted energy conditioning outdoor air. Can be per-zone for
                targeted control.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="font-medium text-elec-yellow mb-2">Ventilation/Extraction Interlock</h4>
              <p className="text-white text-sm">
                Ensures whole-house ventilation provides make-up air when local
                extraction runs. Prevents negative pressure that affects extraction
                performance and can cause backdraught from combustion appliances.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Dead Bands and Changeover */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Dead Bands and Changeover Control
          </h2>
          <p className="text-white mb-4">
            The dead band is a temperature range where neither heating nor cooling
            operates. This prevents rapid switching between modes and allows natural
            temperature drift.
          </p>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-4">
            <h4 className="font-medium text-elec-yellow mb-2">Example Configuration</h4>
            <ul className="text-white text-sm space-y-1">
              <li>Heating setpoint: 20 degrees C</li>
              <li>Cooling setpoint: 24 degrees C</li>
              <li>Dead band: 20-24 degrees C (4 degree gap)</li>
              <li>Neither system operates between 20 and 24 degrees C</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <h4 className="font-medium text-white mb-2">Changeover Delays</h4>
            <p className="text-white text-sm">
              In addition to dead bands, changeover delays prevent immediate switching
              from heating to cooling (or vice versa). A typical delay of 15-30 minutes
              prevents short-cycling when temperatures fluctuate around setpoints.
            </p>
          </div>
        </section>

        {/* Ventilation Integration */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Ventilation Integration
          </h2>
          <p className="text-white mb-4">
            Ventilation is the often-overlooked component of HVAC. Proper integration
            ensures fresh air without compromising heating or cooling efficiency.
          </p>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h4 className="font-medium text-elec-yellow mb-2">MVHR Integration</h4>
              <p className="text-white text-sm">
                Mechanical ventilation with heat recovery (MVHR) should be linked to
                heating demand. Some systems can increase supply air temperature slightly
                to assist heating, reducing boiler run time.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h4 className="font-medium text-elec-yellow mb-2">Demand-Controlled Ventilation</h4>
              <p className="text-white text-sm">
                CO2 or occupancy sensors modulate ventilation rates. High occupancy or
                CO2 levels trigger increased airflow. Empty spaces receive minimum
                ventilation, saving energy while maintaining air quality.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h4 className="font-medium text-elec-yellow mb-2">Summer Bypass</h4>
              <p className="text-white text-sm">
                MVHR systems can bypass heat recovery in summer when outdoor air is
                cooler than indoor, providing free cooling. Integration with temperature
                sensors automates bypass operation.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Smart Integration Strategies */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Smart Integration Strategies
          </h2>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="font-medium text-elec-yellow mb-2">Zone-Based Priority</h4>
              <p className="text-white text-sm">
                Different zones may have different priorities. Living areas prioritise
                comfort during occupied hours. Bedrooms prioritise comfort at night.
                Utility spaces have lower priority and wider dead bands.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="font-medium text-elec-yellow mb-2">Weather-Responsive Operation</h4>
              <p className="text-white text-sm">
                Outdoor temperature and forecasts inform mode selection. Cool mornings
                may need heating even in summer. Weather compensation adjusts heating
                intensity based on conditions.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="font-medium text-elec-yellow mb-2">Occupancy-Based Setback</h4>
              <p className="text-white text-sm">
                When all occupants leave, systems enter setback mode with wider dead
                bands and reduced ventilation. Pre-conditioning begins before expected
                return based on geofencing or schedule.
              </p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-medium text-elec-yellow mb-2">{faq.question}</h4>
                <p className="text-white text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section Quiz */}
        <section className="mb-10">
          <Quiz
            title="Section 5 Knowledge Check"
            questions={quizQuestions}
            passingScore={80}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            className="text-white hover:text-elec-yellow hover:bg-transparent touch-manipulation"
            asChild
          >
            <Link to="../section-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            className="bg-elec-yellow text-black hover:bg-elec-yellow/80 touch-manipulation"
            asChild
          >
            <Link to="../section-6">
              Next Section
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default SmartHomeModule4Section5;
