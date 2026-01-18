import { ArrowLeft, ArrowRight, Calendar, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Schedule vs AI Learning Control";
const DESCRIPTION = "Compare traditional scheduled heating control with modern AI-based learning systems, understanding when each approach offers the best results for different households.";

const quickCheckQuestions = [
  {
    question: "What is the main limitation of schedule-based heating control?",
    options: ["It uses more electricity", "It cannot adapt to changing routines", "It requires Wi-Fi connection", "It only works with gas boilers"],
    correctAnswer: 1,
    explanation: "Schedule-based control follows fixed time programmes and cannot automatically adapt when occupancy patterns change. Manual reprogramming is required for any routine changes."
  },
  {
    question: "How does AI learning control detect occupancy patterns?",
    options: ["Through manual input only", "By analysing historical usage and sensor data", "By reading calendar appointments only", "It cannot detect patterns"],
    correctAnswer: 1,
    explanation: "AI learning systems analyse patterns in thermostat adjustments, sensor data, and sometimes smartphone location to understand when the home is typically occupied and adjust heating accordingly."
  },
  {
    question: "Which household would benefit most from schedule-based control?",
    options: ["Shift workers with irregular hours", "Retired couple with predictable routine", "Family with unpredictable activities", "Student with variable timetable"],
    correctAnswer: 1,
    explanation: "Households with highly predictable routines, such as retired couples who are home at the same times each day, can achieve excellent results with simple scheduled control."
  }
];

const quizQuestions = [
  {
    question: "What feature allows AI thermostats to heat the home before you arrive?",
    options: ["Weather forecasting", "Geofencing combined with learning", "Timer boost", "Manual pre-heat"],
    correctAnswer: 1,
    explanation: "AI thermostats combine geofencing (smartphone location tracking) with learned heating times to begin heating when you are heading home, so the property reaches temperature as you arrive."
  },
  {
    question: "What is 'optimum start' in smart heating systems?",
    options: ["Starting heating at the cheapest electricity time", "Calculating when to start heating to reach temperature at the desired time", "Running heating at maximum for faster warmup", "Starting all zones simultaneously"],
    correctAnswer: 1,
    explanation: "Optimum start calculates how long the property takes to heat up based on indoor/outdoor temperatures and starts heating early enough to reach the target temperature at the scheduled time."
  },
  {
    question: "What might cause an AI learning thermostat to heat an empty home?",
    options: ["Sensor malfunction", "Still learning during the training period", "Power outage", "Low battery"],
    correctAnswer: 1,
    explanation: "AI thermostats need time to learn patterns (typically 1-2 weeks). During this period, they may heat unnecessarily until they have enough data to predict occupancy accurately."
  },
  {
    question: "For a household with highly irregular routines, which approach is most energy efficient?",
    options: ["Fixed daily schedule", "AI learning with geofencing", "Manual control only", "Continuous heating at low temperature"],
    correctAnswer: 1,
    explanation: "Irregular routines benefit most from AI learning combined with geofencing, which responds to actual occupancy rather than trying to predict unpredictable schedules."
  },
  {
    question: "What is the typical learning period for AI-based thermostats?",
    options: ["1-2 hours", "1-2 weeks", "6-12 months", "They learn instantly"],
    correctAnswer: 1,
    explanation: "Most AI thermostats need 1-2 weeks to observe patterns and optimise heating schedules. During this period, they may behave less efficiently until learning is complete."
  }
];

const faqs = [
  {
    question: "Can I override AI learning when needed?",
    answer: "Yes. All AI thermostats allow manual overrides. You can boost heating, adjust temperatures, or switch to away mode at any time. The AI learns from these adjustments, so consistent overrides will be incorporated into future predictions."
  },
  {
    question: "Does AI learning work with multiple occupants?",
    answer: "Most systems can track multiple smartphones for geofencing, switching to away mode only when all registered devices have left. Some advanced systems learn individual preferences and adjust heating based on which occupants are home."
  },
  {
    question: "What happens if the internet goes down?",
    answer: "AI thermostats store learned schedules locally, so basic heating control continues without internet. However, geofencing, remote access, and real-time learning features require connectivity. Most systems fall back to the last learned schedule."
  }
];

const SmartHomeModule4Section4 = () => {
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
          <span className="text-sm text-white">Section 4 of 6</span>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12 max-w-3xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-elec-yellow/10 mb-6">
            <Calendar className="h-8 w-8 text-elec-yellow" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">{TITLE}</h1>
          <p className="text-white text-base sm:text-lg max-w-2xl mx-auto">{DESCRIPTION}</p>
        </header>

        {/* Quick Summary */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-sm font-medium text-elec-yellow mb-1">Key Focus</p>
            <p className="text-white text-sm">Comparing control strategies for different lifestyles</p>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-sm font-medium text-elec-yellow mb-1">Practical Skill</p>
            <p className="text-white text-sm">Recommending the right system for each customer</p>
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
              "Explain the operation of schedule-based and AI learning control",
              "Compare energy efficiency of different control approaches",
              "Match control strategies to household types and lifestyles",
              "Configure and optimise both scheduled and learning systems",
              "Advise customers on realistic expectations for each approach"
            ].map((outcome, i) => (
              <li key={i} className="flex items-start gap-3 text-white">
                <CheckCircle className="h-5 w-5 text-elec-yellow shrink-0 mt-0.5" />
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Schedule-Based Control */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Schedule-Based Control
          </h2>
          <p className="text-white mb-4">
            Traditional programmable thermostats and many smart thermostats offer
            schedule-based control, where heating times and temperatures are set
            manually for each day of the week.
          </p>
          <div className="space-y-3 mb-4">
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h4 className="font-medium text-elec-yellow mb-2">How It Works</h4>
              <p className="text-white text-sm">
                Users programme specific on/off times and target temperatures for
                each day. The thermostat follows this schedule regardless of actual
                occupancy, switching heating on and off at the programmed times.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h4 className="font-medium text-elec-yellow mb-2">Advantages</h4>
              <ul className="text-white text-sm space-y-1">
                <li>Predictable operation - you know exactly when heating will run</li>
                <li>Simple to understand and configure</li>
                <li>Works without internet or smartphone</li>
                <li>No learning period - works correctly from day one</li>
                <li>Lower cost than AI systems</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h4 className="font-medium text-elec-yellow mb-2">Limitations</h4>
              <ul className="text-white text-sm space-y-1">
                <li>Cannot adapt to routine changes automatically</li>
                <li>Heats empty homes when schedules do not match reality</li>
                <li>Requires manual adjustment for holidays and exceptions</li>
                <li>May heat too early or too late without optimum start</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* AI Learning Control */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            AI Learning Control
          </h2>
          <p className="text-white mb-4">
            Modern smart thermostats use machine learning algorithms to automatically
            create and adjust heating schedules based on observed behaviour and
            additional data sources.
          </p>
          <div className="space-y-4 mb-4">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="font-medium text-elec-yellow mb-2">Data Sources for Learning</h4>
              <ul className="text-white text-sm space-y-1">
                <li>Manual temperature adjustments (when you turn heating up/down)</li>
                <li>Smartphone location (geofencing for occupancy detection)</li>
                <li>Motion and occupancy sensors</li>
                <li>Outdoor temperature and weather forecasts</li>
                <li>Building thermal characteristics (how quickly it heats/cools)</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="font-medium text-elec-yellow mb-2">Key Features</h4>
              <ul className="text-white text-sm space-y-2">
                <li>
                  <span className="font-medium">Auto-scheduling:</span> Creates heating
                  schedule based on observed patterns
                </li>
                <li>
                  <span className="font-medium">Geofencing:</span> Detects when occupants
                  leave/return and adjusts accordingly
                </li>
                <li>
                  <span className="font-medium">Optimum start:</span> Calculates when to
                  start heating to reach temperature at the right time
                </li>
                <li>
                  <span className="font-medium">Weather adaptation:</span> Adjusts for
                  outdoor conditions and forecasts
                </li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Comparing Approaches */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Comparing Approaches
          </h2>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-4 text-elec-yellow font-medium">Feature</th>
                  <th className="text-left py-3 px-4 text-elec-yellow font-medium">Schedule</th>
                  <th className="text-left py-3 px-4 text-elec-yellow font-medium">AI Learning</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 text-white">Setup complexity</td>
                  <td className="py-3 px-4 text-white">Manual programming</td>
                  <td className="py-3 px-4 text-white">Automatic after learning</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 text-white">Routine adaptation</td>
                  <td className="py-3 px-4 text-white">Manual changes needed</td>
                  <td className="py-3 px-4 text-white">Automatic</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 text-white">Irregular schedules</td>
                  <td className="py-3 px-4 text-white">Poor performance</td>
                  <td className="py-3 px-4 text-white">Good with geofencing</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 text-white">Internet required</td>
                  <td className="py-3 px-4 text-white">Optional</td>
                  <td className="py-3 px-4 text-white">Essential for full features</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-white">Typical cost</td>
                  <td className="py-3 px-4 text-white">Lower</td>
                  <td className="py-3 px-4 text-white">Higher</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Matching to Household Types */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Matching to Household Types
          </h2>
          <p className="text-white mb-4">
            The best control approach depends on household occupancy patterns and
            user preferences. Here is guidance for common scenarios.
          </p>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h4 className="font-medium text-elec-yellow mb-2">Regular 9-5 Workers</h4>
              <p className="text-white text-sm">
                <span className="font-medium">Best fit:</span> Either approach works well.
                Schedule is simple and effective. AI adds optimum start and holiday detection.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h4 className="font-medium text-elec-yellow mb-2">Shift Workers / Irregular Hours</h4>
              <p className="text-white text-sm">
                <span className="font-medium">Best fit:</span> AI learning with geofencing.
                Schedules cannot accommodate variable patterns. Geofencing responds to actual
                movements regardless of schedule.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h4 className="font-medium text-elec-yellow mb-2">Work from Home</h4>
              <p className="text-white text-sm">
                <span className="font-medium">Best fit:</span> Schedule with daytime heating,
                or AI with presence detection. Key is ensuring daytime comfort without
                overheating during breaks away from desk.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h4 className="font-medium text-elec-yellow mb-2">Retired / Home Most of Day</h4>
              <p className="text-white text-sm">
                <span className="font-medium">Best fit:</span> Simple schedule often sufficient.
                Consistent routines mean AI learning offers minimal advantage. Focus on
                zoning to heat occupied rooms only.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h4 className="font-medium text-elec-yellow mb-2">Second Home / Holiday Let</h4>
              <p className="text-white text-sm">
                <span className="font-medium">Best fit:</span> Remote access essential.
                AI learning not useful due to irregular occupancy. Remote scheduling
                and manual control before visits works best.
              </p>
            </div>
          </div>
        </section>

        {/* Energy Efficiency Comparison */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Energy Efficiency Comparison
          </h2>
          <p className="text-white mb-4">
            Energy savings depend more on how well the control matches actual
            occupancy than on the technology itself.
          </p>
          <div className="p-4 rounded-lg bg-white/5 border border-white/10 mb-4">
            <h4 className="font-medium text-elec-yellow mb-2">Typical Savings Claims</h4>
            <p className="text-white text-sm mb-2">
              Manufacturers often claim 10-30% savings from smart thermostats. However,
              these figures compare against no controls or poorly programmed schedules.
              A well-programmed schedule can be equally efficient for predictable households.
            </p>
            <p className="text-white text-sm">
              The real benefit of AI learning is convenience and adaptation - maintaining
              efficiency without manual intervention when routines change.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-white text-sm">
              <span className="text-elec-yellow font-medium">Installer advice:</span> Set
              realistic expectations. Smart thermostats optimise heating, but actual
              savings depend on building efficiency, occupancy patterns, and previous
              heating behaviour. The biggest savings come from not heating empty homes.
            </p>
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
            title="Section 4 Knowledge Check"
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
            <Link to="../smart-home-module-4-section-3">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            className="bg-elec-yellow text-black hover:bg-elec-yellow/80 touch-manipulation"
            asChild
          >
            <Link to="../smart-home-module-4-section-5">
              Next Section
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default SmartHomeModule4Section4;
