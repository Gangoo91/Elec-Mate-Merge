import { ArrowLeft, ArrowRight, Settings, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Radiator Valves, Boilers, and Heat Pumps";
const DESCRIPTION = "Master the integration of smart controls with different heating system types, including radiator-based systems, gas boilers, and air source heat pumps.";

const quickCheckQuestions = [
  {
    question: "What is the primary function of a smart TRV?",
    options: ["Generate heat for the radiator", "Control water flow based on room temperature", "Measure boiler efficiency", "Filter heating system water"],
    correctAnswer: 1,
    explanation: "Smart TRVs regulate the flow of hot water through individual radiators based on the set temperature and actual room temperature, allowing independent control of each radiator."
  },
  {
    question: "How does OpenTherm differ from simple relay boiler control?",
    options: ["It uses higher voltage", "It allows two-way communication and modulation", "It only works with oil boilers", "It requires no wiring"],
    correctAnswer: 1,
    explanation: "OpenTherm enables two-way digital communication between the thermostat and boiler, allowing the boiler to modulate its output rather than simply switching on and off."
  },
  {
    question: "Why do heat pumps require different control strategies than gas boilers?",
    options: ["They are more expensive", "They work most efficiently at lower flow temperatures", "They only work in summer", "They use more electricity"],
    correctAnswer: 1,
    explanation: "Heat pumps achieve their best efficiency at lower flow temperatures (35-45 degrees C), requiring weather compensation and longer heating periods rather than rapid on/off cycling."
  }
];

const quizQuestions = [
  {
    question: "When retrofitting smart TRVs to an existing radiator system, what must be checked first?",
    options: ["Radiator colour", "Valve body thread size (M30 vs M28)", "Pipe material", "Room carpet type"],
    correctAnswer: 1,
    explanation: "Smart TRV heads must match the valve body thread. Most UK radiators use M30 threads, but some older installations use M28. Adaptors are available for most common sizes."
  },
  {
    question: "What is a call-for-heat relay in smart heating systems?",
    options: ["A device that measures heat output", "A signal that tells the boiler to fire", "A safety cut-out", "A noise reduction feature"],
    correctAnswer: 1,
    explanation: "The call-for-heat relay is triggered when any zone requires heating, signalling the boiler to fire. Smart systems aggregate multiple zone calls to prevent excessive boiler cycling."
  },
  {
    question: "Which control strategy is most appropriate for air source heat pumps?",
    options: ["Rapid on/off cycling", "Weather compensation with low flow temperatures", "High temperature boost mode", "Manual switching only"],
    correctAnswer: 1,
    explanation: "Heat pumps work most efficiently with weather compensation, adjusting flow temperature based on outdoor conditions and running for longer periods at lower temperatures."
  },
  {
    question: "What issue might occur if smart TRVs close simultaneously without proper system design?",
    options: ["Increased energy savings", "Boiler damage from lack of flow", "Radiators getting too hot", "Wi-Fi interference"],
    correctAnswer: 1,
    explanation: "If all TRVs close while the boiler is firing, there is nowhere for the heated water to go, potentially causing boiler lockout or damage. A bypass valve prevents this."
  },
  {
    question: "What is the typical commissioning requirement after installing smart TRVs?",
    options: ["Paint them to match radiators", "Calibrate each TRV to its radiator", "Replace all radiators", "Drain the entire system"],
    correctAnswer: 1,
    explanation: "Smart TRVs should be calibrated to learn the valve stroke and response characteristics of their specific radiator, ensuring accurate temperature control."
  }
];

const faqs = [
  {
    question: "Do I need to drain the heating system to fit smart TRVs?",
    answer: "No. Smart TRV heads simply screw onto the existing valve body, replacing the manual head. The valve remains in place and there is no need to drain the system. This makes retrofit installation quick and straightforward."
  },
  {
    question: "Can smart heating controls work with combi boilers?",
    answer: "Yes. Smart thermostats and TRVs work with combi boilers. The thermostat typically connects to the boiler via a receiver/heat link unit. Some combi boilers have built-in OpenTherm connections for enhanced integration."
  },
  {
    question: "Are heat pumps compatible with standard smart thermostats?",
    answer: "Basic on/off smart thermostats can control heat pumps, but for optimal efficiency you need a thermostat designed for heat pump operation with weather compensation and optimum start features. Check manufacturer compatibility."
  }
];

const SmartHomeModule4Section2 = () => {
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
            <Link to="..">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <span className="text-sm text-white">Section 2 of 6</span>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12 max-w-3xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-elec-yellow/10 mb-6">
            <Settings className="h-8 w-8 text-elec-yellow" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">{TITLE}</h1>
          <p className="text-white text-base sm:text-lg max-w-2xl mx-auto">{DESCRIPTION}</p>
        </header>

        {/* Quick Summary */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-sm font-medium text-elec-yellow mb-1">Key Focus</p>
            <p className="text-white text-sm">Integrating smart controls with heat sources</p>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-sm font-medium text-elec-yellow mb-1">Practical Skill</p>
            <p className="text-white text-sm">TRV installation and boiler integration</p>
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
              "Install and configure smart thermostatic radiator valves",
              "Understand boiler integration methods (relay, OpenTherm, bus systems)",
              "Apply appropriate control strategies for heat pumps",
              "Troubleshoot common integration issues",
              "Advise customers on system compatibility"
            ].map((outcome, i) => (
              <li key={i} className="flex items-start gap-3 text-white">
                <CheckCircle className="h-5 w-5 text-elec-yellow shrink-0 mt-0.5" />
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Smart Radiator Valves */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Smart Radiator Valves (TRVs)
          </h2>
          <p className="text-white mb-4">
            Smart TRVs replace the manual thermostatic heads on radiator valves, adding
            wireless connectivity and programmable temperature control to each radiator.
          </p>
          <div className="space-y-3 mb-4">
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h4 className="font-medium text-elec-yellow mb-2">How They Work</h4>
              <p className="text-white text-sm">
                Smart TRVs contain a motor that adjusts the valve pin position based on
                temperature readings from a built-in sensor. They communicate wirelessly
                with a hub or bridge to receive schedules and setpoint changes.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h4 className="font-medium text-elec-yellow mb-2">Installation Process</h4>
              <ol className="text-white text-sm space-y-1 list-decimal list-inside">
                <li>Remove existing manual TRV head (usually unscrews or unclips)</li>
                <li>Check valve body thread size matches new TRV (or use adaptor)</li>
                <li>Screw on smart TRV head hand-tight</li>
                <li>Insert batteries and pair with system hub</li>
                <li>Run calibration routine to learn valve stroke</li>
              </ol>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <h4 className="font-medium text-white mb-2">Common Thread Sizes</h4>
            <ul className="text-white text-sm space-y-1">
              <li><span className="text-elec-yellow">M30 x 1.5:</span> Most common UK/European standard</li>
              <li><span className="text-elec-yellow">M28 x 1.5:</span> Some older Danfoss valves</li>
              <li><span className="text-elec-yellow">RA:</span> Danfoss snap-fit (requires adaptor)</li>
            </ul>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Boiler Integration */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Boiler Integration Methods
          </h2>
          <p className="text-white mb-4">
            Smart thermostats must communicate with the boiler to control heating output.
            The integration method affects both functionality and efficiency.
          </p>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="font-medium text-elec-yellow mb-2">Simple Relay (On/Off)</h4>
              <p className="text-white text-sm mb-2">
                The most basic connection uses volt-free contacts to switch the boiler on
                when heat is required. The boiler fires at full output until satisfied.
              </p>
              <p className="text-white text-sm">
                <span className="text-elec-yellow">Pros:</span> Simple, universal compatibility.
                <span className="text-elec-yellow ml-2">Cons:</span> Less efficient, more cycling.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="font-medium text-elec-yellow mb-2">OpenTherm</h4>
              <p className="text-white text-sm mb-2">
                Digital two-way communication protocol. The thermostat can request specific
                flow temperatures and the boiler modulates its output accordingly.
              </p>
              <p className="text-white text-sm">
                <span className="text-elec-yellow">Pros:</span> Higher efficiency, weather compensation.
                <span className="text-elec-yellow ml-2">Cons:</span> Requires compatible boiler.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="font-medium text-elec-yellow mb-2">Manufacturer-Specific Bus</h4>
              <p className="text-white text-sm mb-2">
                Some manufacturers use proprietary communication protocols (eBus, EMS+,
                Vitoconnect) that offer similar features to OpenTherm.
              </p>
              <p className="text-white text-sm">
                <span className="text-elec-yellow">Pros:</span> Full boiler feature access.
                <span className="text-elec-yellow ml-2">Cons:</span> Limited to specific brands.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Heat Pump Integration */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Heat Pump Integration
          </h2>
          <p className="text-white mb-4">
            Heat pumps require different control strategies than gas boilers. Understanding
            these differences is essential for efficient system operation.
          </p>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-4">
            <h4 className="font-medium text-elec-yellow mb-2">Key Differences from Boilers</h4>
            <ul className="text-white text-sm space-y-2">
              <li>
                <span className="font-medium">Lower flow temperatures:</span> Heat pumps work
                best at 35-45 degrees C, not the 60-80 degrees C typical of boilers
              </li>
              <li>
                <span className="font-medium">Slower response:</span> Heat pumps ramp up gradually
                and should run for longer periods rather than short bursts
              </li>
              <li>
                <span className="font-medium">Weather sensitivity:</span> Efficiency varies
                significantly with outdoor temperature
              </li>
              <li>
                <span className="font-medium">Defrost cycles:</span> Air source units periodically
                reverse to remove ice, temporarily stopping heating
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <h4 className="font-medium text-white mb-2">Recommended Control Features</h4>
            <ul className="text-white text-sm space-y-1">
              <li>Weather compensation (automatic flow temperature adjustment)</li>
              <li>Optimum start (pre-heating based on thermal mass)</li>
              <li>Setback mode rather than complete switch-off overnight</li>
              <li>Integration with heat pump controller for efficient operation</li>
            </ul>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* System Design Considerations */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            System Design Considerations
          </h2>
          <p className="text-white mb-4">
            When integrating smart controls with heating systems, several design factors
            must be addressed to ensure reliable operation.
          </p>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="font-medium text-elec-yellow mb-2">Bypass Protection</h4>
              <p className="text-white text-sm">
                When all smart TRVs close, the boiler needs somewhere to circulate water.
                Install an automatic bypass valve or designate one radiator (e.g., bathroom
                towel rail) without a TRV to provide minimum flow.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="font-medium text-elec-yellow mb-2">Call-for-Heat Logic</h4>
              <p className="text-white text-sm">
                The system must signal the boiler to fire when any zone requires heat.
                Quality smart systems aggregate zone calls to prevent excessive boiler
                cycling from single TRV demands.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="font-medium text-elec-yellow mb-2">Hot Water Priority</h4>
              <p className="text-white text-sm">
                In systems with stored hot water, ensure the smart controls respect
                hot water priority settings to prevent the cylinder running cold during
                high heating demand periods.
              </p>
            </div>
          </div>
        </section>

        {/* Common Issues and Troubleshooting */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Common Issues and Troubleshooting
          </h2>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="font-medium text-white mb-2">TRV not controlling properly</h4>
              <p className="text-white text-sm mb-2">
                Check calibration has completed. Ensure the valve pin is not stuck.
                Verify the TRV has good wireless signal to the hub.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="font-medium text-white mb-2">Boiler not responding to thermostat</h4>
              <p className="text-white text-sm mb-2">
                Check wiring connections at the receiver/heat link. Verify the thermostat
                is paired with the receiver. Test with manual override if available.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="font-medium text-white mb-2">Radiators staying cold despite demand</h4>
              <p className="text-white text-sm mb-2">
                Check if the call-for-heat signal is reaching the boiler. Verify the TRV
                is actually opening. Check system pressure and bleed radiators if needed.
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
            title="Section 2 Knowledge Check"
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
            <Link to="../section-1">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            className="bg-elec-yellow text-black hover:bg-elec-yellow/80 touch-manipulation"
            asChild
          >
            <Link to="../section-3">
              Next Section
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default SmartHomeModule4Section2;
