import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Scene-Based Control and Schedules";
const DESCRIPTION = "Programming lighting scenes and automated schedules for comfort and efficiency";

const quickCheckQuestions = [
  {
    question: "What is a lighting scene?",
    options: ["A single light setting", "A pre-programmed combination of multiple light settings", "A light fixture type", "A wiring configuration"],
    correctIndex: 1,
    explanation: "A lighting scene is a pre-programmed combination of brightness levels, colours, and states across multiple lights that can be activated with a single command."
  },
  {
    question: "What type of schedule activates based on time of day?",
    options: ["Event-based", "Time-based", "Condition-based", "Manual"],
    correctIndex: 1,
    explanation: "Time-based schedules trigger at specific times (e.g., 7am, sunset) regardless of other factors. They are the simplest form of automated scheduling."
  },
  {
    question: "What is a risk of over-automation in lighting systems?",
    options: ["Higher electricity bills", "Lights that frustrate users by changing unexpectedly", "Faster bulb wear", "Reduced Wi-Fi speed"],
    correctIndex: 1,
    explanation: "Over-automation can lead to lights changing when users do not expect or want them to, creating frustration and undermining the user experience."
  }
];

const quizQuestions = [
  {
    question: "Which is an example of a condition-based schedule?",
    options: ["Lights on at 7am", "Lights dim when TV turns on", "Lights off at midnight", "Lights on for 10 minutes"],
    correctIndex: 1,
    explanation: "Condition-based schedules trigger based on events or states (TV turning on) rather than time. They respond to what is happening in the home."
  },
  {
    question: "What is the benefit of sunrise/sunset-based scheduling?",
    options: ["Simpler programming", "Automatically adjusts to seasonal daylight changes", "Lower power consumption", "Works without internet"],
    correctIndex: 1,
    explanation: "Sunrise/sunset scheduling automatically adjusts throughout the year, ensuring lights come on at dusk regardless of the time of year."
  },
  {
    question: "Which best practice helps prevent automation frustration?",
    options: ["Add as many automations as possible", "Ensure manual override is always available", "Hide all controls from users", "Use only time-based triggers"],
    correctIndex: 1,
    explanation: "Always providing easy manual override ensures users can adjust lighting when automation does not match their current needs."
  },
  {
    question: "What information should you gather before programming scenes?",
    options: ["Customer's favourite colours", "Customer's daily routines and lighting preferences", "Number of social media followers", "Brand of furniture"],
    correctIndex: 1,
    explanation: "Understanding daily routines (wake time, meal times, bedtime) and lighting preferences ensures scenes match actual usage patterns."
  },
  {
    question: "Which tool is commonly used for creating scenes in a Zigbee ecosystem?",
    options: ["Multimeter", "Hub manufacturer app (e.g., Hue app)", "Oscilloscope", "Cable tester"],
    correctIndex: 1,
    explanation: "Manufacturer apps like the Philips Hue app or SmartThings app provide interfaces for creating, editing, and triggering lighting scenes."
  }
];

const faqs = [
  {
    question: "How many scenes should I create for a typical home?",
    answer: "Start with 4-6 core scenes per main living area: Morning, Day, Evening, Night, Entertainment, and Away. Add specialised scenes based on customer requests. Too many scenes become confusing."
  },
  {
    question: "Should schedules run locally or in the cloud?",
    answer: "Prefer local execution where possible. Local schedules continue working during internet outages. Check whether your hub supports local schedule execution."
  },
  {
    question: "How do I handle multi-user households with different preferences?",
    answer: "Create personal scenes for individual preferences and shared scenes for common activities. Use presence detection or manual selection to activate appropriate scenes."
  }
];

const SmartHomeModule3Section2 = () => {
  useSEO({
    title: `${TITLE} | Smart Home Module 3`,
    description: DESCRIPTION
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 h-14 flex items-center justify-between">
          <Button variant="ghost" size="sm" className="text-white hover:text-elec-yellow hover:bg-transparent touch-manipulation" asChild>
            <Link to="..">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <span className="text-sm text-white">Section 2 of 5</span>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12 max-w-3xl mx-auto">
        {/* Header - Title Centred Only */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/30 text-elec-yellow text-sm font-medium mb-4">
            <Zap className="h-4 w-4" />
            Module 3 - Section 2
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">{TITLE}</h1>
          <p className="text-white text-lg">{DESCRIPTION}</p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-sm font-medium text-elec-yellow mb-1">Scenes</p>
            <p className="text-white text-sm">Pre-programmed multi-light configurations for different activities</p>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-sm font-medium text-elec-yellow mb-1">Schedules</p>
            <p className="text-white text-sm">Automated triggers based on time, events, or conditions</p>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Learning Outcomes
          </h2>
          <div className="space-y-3">
            {[
              "Create lighting scenes for different activities and moods",
              "Programme time-based, event-based, and condition-based schedules",
              "Avoid common automation pitfalls and frustrations",
              "Design user-friendly lighting control experiences"
            ].map((outcome, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow shrink-0 mt-0.5" />
                <span className="text-white">{outcome}</span>
              </div>
            ))}
          </div>
        </section>

        {/* What Are Lighting Scenes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            What Are Lighting Scenes?
          </h2>
          <p className="text-white mb-4">
            A lighting scene is a saved configuration of multiple lights with specific brightness levels, colours, and on/off states. Activating a scene applies all these settings simultaneously with a single command.
          </p>
          <div className="space-y-3 mb-4">
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Example: Movie Scene</p>
              <p className="text-white text-sm">Main lights off, bias lighting behind TV at 10% warm white, floor lamp at 5% dim amber. One tap transforms the room for watching films.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Example: Morning Scene</p>
              <p className="text-white text-sm">Kitchen lights at 80% cool white, bedroom lights gradually increasing over 15 minutes, hallway at 50%. Helps wake up naturally.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Example: Away Scene</p>
              <p className="text-white text-sm">Randomised lights simulating occupancy, exterior lights on, interior lights cycling between rooms. Deters burglars while owners are away.</p>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-sm font-medium text-elec-yellow mb-1">Design Principle</p>
            <p className="text-white text-sm">Name scenes based on activities (Movie, Dinner, Reading) rather than technical descriptions (Dim Warm Lights). This makes them intuitive for all household members.</p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Types of Schedules */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Types of Schedules
          </h2>
          <div className="space-y-4 mb-4">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h3 className="text-white font-semibold mb-2">Time-Based Schedules</h3>
              <p className="text-white text-sm mb-2">Trigger at specific times regardless of other factors.</p>
              <ul className="text-white text-sm space-y-1 ml-4">
                <li>Fixed time: "Turn on at 7:00 AM"</li>
                <li>Sunrise/sunset: "Turn on 30 minutes before sunset"</li>
                <li>Day-specific: "Only on weekdays"</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h3 className="text-white font-semibold mb-2">Event-Based Schedules</h3>
              <p className="text-white text-sm mb-2">Trigger in response to specific events or actions.</p>
              <ul className="text-white text-sm space-y-1 ml-4">
                <li>Motion detected: "Turn on when motion sensed"</li>
                <li>Door opened: "Turn on when front door opens"</li>
                <li>Device state: "Dim when TV turns on"</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h3 className="text-white font-semibold mb-2">Condition-Based Schedules</h3>
              <p className="text-white text-sm mb-2">Trigger based on environmental or system conditions.</p>
              <ul className="text-white text-sm space-y-1 ml-4">
                <li>Light level: "Turn on if room is dark"</li>
                <li>Occupancy: "Run only if home"</li>
                <li>Combined: "After sunset AND when motion detected"</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Benefits */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Benefits of Scenes and Schedules
          </h2>
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Convenience</p>
              <p className="text-white text-sm">Transform entire room lighting with a single tap or voice command instead of adjusting each light individually.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Energy Efficiency</p>
              <p className="text-white text-sm">Automated schedules ensure lights turn off when not needed, reducing electricity consumption.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Security</p>
              <p className="text-white text-sm">Away schedules simulate occupancy, making properties appear lived-in during vacations.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Wellbeing</p>
              <p className="text-white text-sm">Circadian lighting schedules adjust colour temperature throughout the day, supporting natural sleep patterns.</p>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Best Practices for Scene Programming
          </h2>
          <div className="space-y-3 mb-4">
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Gather Requirements First</p>
              <p className="text-white text-sm">Interview customers about daily routines, activities, and preferences before creating scenes. Do not assume what they want.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Start Simple</p>
              <p className="text-white text-sm">Begin with a few essential scenes. Add complexity gradually based on feedback rather than overwhelming users from the start.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Always Provide Manual Override</p>
              <p className="text-white text-sm">Ensure users can easily override any automation. Frustration occurs when smart systems prevent manual control.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Test Thoroughly</p>
              <p className="text-white text-sm">Test scenes at different times of day and under various conditions. What looks good at night may be too dim during daytime.</p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Common Pitfalls */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Common Pitfalls to Avoid
          </h2>
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Over-Automation</p>
              <p className="text-white text-sm">Too many automated triggers can result in lights changing unexpectedly, frustrating users. Less is often more.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Conflicting Automations</p>
              <p className="text-white text-sm">Multiple automations affecting the same lights can fight each other. Document all automations and check for conflicts.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Ignoring Edge Cases</p>
              <p className="text-white text-sm">Night-time bathroom visits should not trigger daytime brightness. Consider all scenarios when programming schedules.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Poor Transition Design</p>
              <p className="text-white text-sm">Abrupt changes (instant on/off) can be jarring. Use gradual transitions for comfort, especially for evening and morning scenes.</p>
            </div>
          </div>
        </section>

        {/* Real World Application */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Real World Application
          </h2>
          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <p className="text-white font-semibold mb-2">Scenario: Family Home Scene Design</p>
            <p className="text-white text-sm mb-3">
              A family with young children wants smart lighting that works for parents' evening relaxation and children's bedtime routine.
            </p>
            <p className="text-white text-sm mb-2"><span className="text-elec-yellow">Recommended Scenes:</span></p>
            <ul className="text-white text-sm space-y-1 ml-4">
              <li><span className="font-medium">Bedtime:</span> Children's rooms dim warm white, landing nightlight on, main living areas unchanged</li>
              <li><span className="font-medium">Evening:</span> Living room 40% warm white, kitchen off, landing nightlight on</li>
              <li><span className="font-medium">Night Check:</span> Minimal hallway lighting for parents checking on children without fully waking</li>
            </ul>
            <p className="text-white text-sm mt-3"><span className="text-elec-yellow">Schedule:</span> Bedtime scene triggered at 7:30 PM weekdays, transitioning to Evening scene 30 minutes later.</p>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">08</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-white/5">
                <p className="text-white font-medium mb-2">{faq.question}</p>
                <p className="text-white text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">09</span>
            Section Quiz
          </h2>
          <Quiz questions={quizQuestions} />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" className="text-white hover:text-elec-yellow hover:bg-transparent touch-manipulation" asChild>
            <Link to="../section-1">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation" asChild>
            <Link to="../section-3">
              Next Section
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default SmartHomeModule3Section2;
