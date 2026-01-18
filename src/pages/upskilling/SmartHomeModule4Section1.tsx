import { ArrowLeft, ArrowRight, Thermometer, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Smart Thermostats and Room Zoning";
const DESCRIPTION = "Learn to install and configure smart thermostats and room zoning systems for precise temperature control and energy efficiency in residential properties.";

const quickCheckQuestions = [
  {
    question: "What is the main advantage of a smart thermostat over a traditional programmable thermostat?",
    options: ["Lower purchase price", "Remote access and learning capabilities", "Simpler installation", "Longer battery life"],
    correctAnswer: 1,
    explanation: "Smart thermostats offer remote access via smartphone apps and can learn household patterns to automatically optimise heating schedules, features not available on traditional programmable models."
  },
  {
    question: "What is room zoning in the context of heating systems?",
    options: ["Installing multiple boilers", "Controlling temperature independently in different areas", "Connecting rooms with ducts", "Measuring outdoor temperature"],
    correctAnswer: 1,
    explanation: "Room zoning allows different areas of a property to be heated to different temperatures independently, improving comfort and efficiency by only heating occupied spaces."
  },
  {
    question: "What type of valve is commonly used for radiator-based room zoning?",
    options: ["Gate valve", "Smart thermostatic radiator valve (TRV)", "Ball valve", "Check valve"],
    correctAnswer: 1,
    explanation: "Smart TRVs (thermostatic radiator valves) replace manual TRVs and can be controlled wirelessly to regulate the temperature of individual radiators as part of a zoning system."
  }
];

const quizQuestions = [
  {
    question: "Which feature allows smart thermostats to pre-heat a home before occupants arrive?",
    options: ["Weather compensation", "Geofencing", "Load balancing", "Demand response"],
    correctAnswer: 1,
    explanation: "Geofencing uses smartphone location to detect when occupants are heading home, allowing the thermostat to start heating in advance so the property is warm on arrival."
  },
  {
    question: "What is weather compensation in smart heating systems?",
    options: ["Adjusting heating based on outdoor temperature forecasts", "Compensating for wind chill factor", "Balancing humidity levels", "Measuring solar gain"],
    correctAnswer: 0,
    explanation: "Weather compensation adjusts the heating output based on outdoor temperature data or forecasts, running the boiler more efficiently by reducing flow temperature on milder days."
  },
  {
    question: "For underfloor heating, what is the typical method for zone control?",
    options: ["Smart TRVs on each loop", "Motorised zone valves on manifold", "Individual boilers per zone", "Manual adjustment only"],
    correctAnswer: 1,
    explanation: "Underfloor heating systems typically use motorised zone valves fitted to the manifold, controlled by room thermostats to regulate water flow to each heating zone."
  },
  {
    question: "What protocol do many smart TRVs use to communicate with their hub?",
    options: ["Ethernet", "Zigbee or Z-Wave", "HDMI", "USB"],
    correctAnswer: 1,
    explanation: "Most smart TRVs communicate via Zigbee or Z-Wave wireless protocols, which are designed for low-power, reliable communication in smart home applications."
  },
  {
    question: "What is a key consideration when retrofitting smart zoning to an existing heating system?",
    options: ["The colour of the radiators", "Compatibility with existing boiler controls", "The age of the property", "Carpet thickness"],
    correctAnswer: 1,
    explanation: "When retrofitting smart zoning, compatibility with the existing boiler and its controls is crucial. Some systems require specific boiler relay connections or compatible OpenTherm interfaces."
  }
];

const faqs = [
  {
    question: "Do smart thermostats work with all boiler types?",
    answer: "Most smart thermostats work with standard on/off boilers via relay control. For maximum efficiency, look for thermostats with OpenTherm support, which allows two-way communication with compatible boilers to modulate output rather than simply switching on and off."
  },
  {
    question: "How many zones should a typical home have?",
    answer: "This depends on the property size and layout. As a minimum, separating upstairs from downstairs is beneficial. Larger homes benefit from individual room control. For most 3-4 bedroom homes, 4-6 zones provide a good balance of control and complexity."
  },
  {
    question: "Can smart TRVs work without a smart thermostat?",
    answer: "Smart TRVs can work independently to control individual radiator temperatures, but for full system control (including boiler firing), they typically need to connect to a hub or smart thermostat that can signal the boiler to run when heat is required in any zone."
  }
];

const SmartHomeModule4Section1 = () => {
  useSEO({
    title: `${TITLE} | Smart Home Module 4`,
    description: DESCRIPTION,
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
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
          <span className="text-sm text-white">Section 1 of 6</span>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12 max-w-3xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-elec-yellow/10 mb-6">
            <Thermometer className="h-8 w-8 text-elec-yellow" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">{TITLE}</h1>
          <p className="text-white text-base sm:text-lg max-w-2xl mx-auto">{DESCRIPTION}</p>
        </header>

        {/* Quick Summary */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-sm font-medium text-elec-yellow mb-1">Key Focus</p>
            <p className="text-white text-sm">Smart heating controls and zone configuration</p>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-sm font-medium text-elec-yellow mb-1">Practical Skill</p>
            <p className="text-white text-sm">Installing and commissioning smart thermostats</p>
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
              "Explain the features and benefits of smart thermostats",
              "Understand room zoning principles and applications",
              "Install and configure smart TRVs and zone controls",
              "Integrate smart heating with existing boiler systems",
              "Advise customers on energy-saving heating strategies"
            ].map((outcome, i) => (
              <li key={i} className="flex items-start gap-3 text-white">
                <CheckCircle className="h-5 w-5 text-elec-yellow shrink-0 mt-0.5" />
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* What is a Smart Thermostat */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            What is a Smart Thermostat?
          </h2>
          <p className="text-white mb-4">
            A smart thermostat is a Wi-Fi connected heating controller that offers advanced
            features beyond simple time-based programming. Unlike traditional thermostats,
            smart models can be controlled remotely and often incorporate learning algorithms.
          </p>
          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h4 className="font-medium text-elec-yellow mb-2">Remote Control</h4>
              <p className="text-white text-sm">
                Adjust heating from anywhere using a smartphone app. Useful for turning
                heating on before arriving home or off when leaving unexpectedly.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h4 className="font-medium text-elec-yellow mb-2">Learning Algorithms</h4>
              <p className="text-white text-sm">
                Many smart thermostats learn household routines and automatically create
                efficient heating schedules without manual programming.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h4 className="font-medium text-elec-yellow mb-2">Energy Reporting</h4>
              <p className="text-white text-sm">
                Track energy usage over time, compare heating costs, and receive suggestions
                for improving efficiency through the companion app.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Room Zoning Fundamentals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Room Zoning Fundamentals
          </h2>
          <p className="text-white mb-4">
            Room zoning divides a property into separate heating areas, each with independent
            temperature control. This prevents heating unoccupied rooms and allows different
            temperatures for different activities.
          </p>
          <div className="space-y-4 mb-4">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="font-medium text-elec-yellow mb-2">Why Zone Your Heating?</h4>
              <ul className="space-y-2 text-white text-sm">
                <li>Bedrooms can be cooler than living areas during the day</li>
                <li>Guest rooms need not be heated when unoccupied</li>
                <li>Working from home allows targeted heating of the home office</li>
                <li>Different family members may prefer different temperatures</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="font-medium text-elec-yellow mb-2">Typical Energy Savings</h4>
              <p className="text-white text-sm">
                Proper room zoning can reduce heating bills by 20-40% compared to whole-house
                heating at a single temperature. The exact savings depend on property size,
                insulation, and occupancy patterns.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Types of Zoning Systems */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Types of Zoning Systems
          </h2>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h4 className="font-medium text-elec-yellow mb-2">Smart TRVs (Radiator Systems)</h4>
              <p className="text-white text-sm mb-2">
                Replace existing manual TRV heads with smart versions. Each radiator becomes
                independently controllable. Suitable for most wet radiator systems.
              </p>
              <p className="text-white text-sm">
                <span className="text-elec-yellow">Installation:</span> Typically DIY-friendly.
                Screw onto existing valve bodies. Battery powered (1-2 year life).
              </p>
            </div>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h4 className="font-medium text-elec-yellow mb-2">Motorised Zone Valves (UFH)</h4>
              <p className="text-white text-sm mb-2">
                Used with underfloor heating manifolds. Actuators fitted to each loop
                control water flow based on room thermostat signals.
              </p>
              <p className="text-white text-sm">
                <span className="text-elec-yellow">Installation:</span> Requires manifold access.
                Typically 230V or 24V actuators. Professional installation recommended.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h4 className="font-medium text-elec-yellow mb-2">Multi-Zone Controllers</h4>
              <p className="text-white text-sm mb-2">
                Centralised control units that manage multiple zones through wired connections
                to room thermostats and zone valves.
              </p>
              <p className="text-white text-sm">
                <span className="text-elec-yellow">Installation:</span> Hardwired system. Requires
                cable runs to each zone. Ideal for new builds or major renovations.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Integration with Existing Systems */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Integration with Existing Systems
          </h2>
          <p className="text-white mb-4">
            Smart heating controls must work with the existing boiler and any legacy controls.
            Understanding the integration requirements is essential for successful installation.
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-4 text-elec-yellow font-medium">Integration Type</th>
                  <th className="text-left py-3 px-4 text-elec-yellow font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 text-white font-medium">Relay Control</td>
                  <td className="py-3 px-4 text-white">Simple on/off switching via volt-free contacts</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 text-white font-medium">OpenTherm</td>
                  <td className="py-3 px-4 text-white">Two-way digital communication for modulating boilers</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 text-white font-medium">Bus Systems</td>
                  <td className="py-3 px-4 text-white">eBus, EMS+ for advanced boiler integration</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-white font-medium">Heat Link</td>
                  <td className="py-3 px-4 text-white">Proprietary receivers (e.g., Nest, Hive heat link)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-white text-sm">
              <span className="text-elec-yellow font-medium">Installer note:</span> Always check
              the smart thermostat's compatibility with the existing boiler before purchasing.
              Some systems require specific wiring configurations or additional receiver units.
            </p>
          </div>
        </section>

        {/* Challenges and Limitations */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Challenges and Limitations
          </h2>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="font-medium text-white mb-2">Battery Life Management</h4>
              <p className="text-white text-sm">
                Smart TRVs are battery powered. In a typical 10-radiator home, expect to
                replace batteries throughout the year. Some users find this maintenance
                burden inconvenient.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="font-medium text-white mb-2">Boiler Short-Cycling</h4>
              <p className="text-white text-sm">
                With individual room control, the boiler may fire frequently for short
                periods. Quality systems include call-for-heat aggregation to minimise
                this issue.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="font-medium text-white mb-2">Wi-Fi Dependency</h4>
              <p className="text-white text-sm">
                Smart features require reliable internet connection. Most systems maintain
                basic operation during outages but lose remote access and learning features.
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
            title="Section 1 Knowledge Check"
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
            <Link to="/electrician/upskilling/smart-home-module-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            className="bg-elec-yellow text-black hover:bg-elec-yellow/80 touch-manipulation"
            asChild
          >
            <Link to="../section-2">
              Next Section
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default SmartHomeModule4Section1;
