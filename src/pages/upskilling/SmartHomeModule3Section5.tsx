import { ArrowLeft, ArrowRight, Link as LinkIcon, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Grouping, Linking, and Motion Logic";
const DESCRIPTION = "Learn to create powerful lighting automations by grouping lights into zones, linking with other systems, and implementing intelligent motion-based control logic.";

const quickCheckQuestions = [
  {
    question: "What is the main advantage of grouping lights into zones?",
    options: ["Reduces electricity bills", "Allows multiple lights to be controlled with a single command", "Increases bulb lifespan", "Improves Wi-Fi signal strength"],
    correctAnswer: 1,
    explanation: "Grouping lights into zones allows you to control multiple lights simultaneously with a single command, scene, or automation, simplifying operation for the user."
  },
  {
    question: "When linking lighting to a security system, what typically happens when the alarm is triggered?",
    options: ["Lights turn off to save energy", "Lights flash or turn on to full brightness", "Lights change to red colour", "Nothing happens to lighting"],
    correctAnswer: 1,
    explanation: "When linked to security systems, lights typically flash or turn on to full brightness to deter intruders and alert occupants or neighbours to the alarm condition."
  },
  {
    question: "What is the purpose of a motion sensor timeout setting?",
    options: ["To limit how many times the sensor activates", "To delay lights turning on", "To determine how long lights stay on after motion stops", "To calibrate sensor sensitivity"],
    correctAnswer: 2,
    explanation: "The timeout setting determines how long the lights remain on after the sensor stops detecting motion, allowing the room to stay lit for a comfortable period after the occupant stops moving."
  }
];

const quizQuestions = [
  {
    question: "A homeowner wants all hallway lights to turn on together. What should you configure?",
    options: ["Individual schedules for each light", "A lighting group or zone", "Separate motion sensors for each light", "Multiple smart switches"],
    correctAnswer: 1,
    explanation: "Creating a lighting group or zone allows all hallway lights to respond to a single command, whether from a switch, app, or automation trigger."
  },
  {
    question: "Which system linking would be most useful for a home cinema room?",
    options: ["Security alarm integration", "Heating system integration", "AV system integration for movie scenes", "Door lock integration"],
    correctAnswer: 2,
    explanation: "AV system integration allows lighting to automatically adjust when watching movies - dimming when content plays and brightening when paused, creating an optimal viewing experience."
  },
  {
    question: "What is occupancy-based lighting?",
    options: ["Lights that change colour based on mood", "Lights controlled only by wall switches", "Lights that respond to human presence in a space", "Lights that turn on at sunset"],
    correctAnswer: 2,
    explanation: "Occupancy-based lighting uses sensors to detect human presence, automatically turning lights on when someone enters and off when the space becomes unoccupied."
  },
  {
    question: "A client complains that bathroom lights turn off while they are in the bath. What adjustment would help?",
    options: ["Increase motion sensor sensitivity", "Extend the timeout period", "Add more motion sensors", "Reduce brightness levels"],
    correctAnswer: 1,
    explanation: "Extending the timeout period allows lights to stay on longer after the last detected motion, accommodating situations where the occupant is stationary for extended periods."
  },
  {
    question: "What is the benefit of linking outdoor lighting to sunrise/sunset data?",
    options: ["Lights automatically adjust throughout the year", "Reduces the need for timers", "Both A and B", "Neither, this is not possible"],
    correctAnswer: 2,
    explanation: "Linking to astronomical data means outdoor lights automatically adjust their on/off times throughout the year as daylight hours change, eliminating the need to manually update timers."
  }
];

const faqs = [
  {
    question: "How many lights can typically be in one group?",
    answer: "This depends on the smart home platform. Most hubs support 50 or more devices per group. However, for reliable performance, keeping groups under 20-30 lights is recommended. Very large groups may experience slight delays in all lights responding simultaneously."
  },
  {
    question: "Can motion sensors work with any smart lighting system?",
    answer: "Motion sensors must be compatible with your smart home platform. Zigbee sensors work with Zigbee hubs, Z-Wave with Z-Wave controllers, and Wi-Fi sensors directly with compatible systems. Some platforms like Home Assistant can integrate multiple protocols, allowing greater flexibility in sensor selection."
  },
  {
    question: "How do I prevent motion sensors triggering lights during daytime?",
    answer: "Most smart home platforms allow conditional automations based on ambient light levels. You can set motion automations to only trigger when lux levels are below a threshold (e.g., 100 lux), or during specific time windows. Some motion sensors include built-in light level sensing for this purpose."
  }
];

const SmartHomeModule3Section5 = () => {
  useSEO({
    title: `${TITLE} | Smart Home Module 3`,
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
          <span className="text-sm text-white">Section 5 of 5</span>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12 max-w-3xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-elec-yellow/10 mb-6">
            <LinkIcon className="h-8 w-8 text-elec-yellow" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">{TITLE}</h1>
          <p className="text-white text-base sm:text-lg max-w-2xl mx-auto">{DESCRIPTION}</p>
        </header>

        {/* Quick Summary */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-sm font-medium text-elec-yellow mb-1">Key Focus</p>
            <p className="text-white text-sm">Creating intelligent lighting automations</p>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-sm font-medium text-elec-yellow mb-1">Practical Skill</p>
            <p className="text-white text-sm">Configuring motion sensors and system links</p>
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
              "Create effective lighting groups and zones",
              "Link lighting systems with security, HVAC, and AV systems",
              "Implement motion-based lighting control with appropriate logic",
              "Configure timeout and sensitivity settings for reliable operation",
              "Troubleshoot common automation issues"
            ].map((outcome, i) => (
              <li key={i} className="flex items-start gap-3 text-white">
                <CheckCircle className="h-5 w-5 text-elec-yellow shrink-0 mt-0.5" />
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Grouping Lights into Zones */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Grouping Lights into Zones
          </h2>
          <p className="text-white mb-4">
            Grouping lights allows multiple fixtures to be controlled as a single entity,
            simplifying both manual operation and automation. Well-planned zones make the
            smart home more intuitive for occupants.
          </p>
          <div className="space-y-3 mb-4">
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h4 className="font-medium text-elec-yellow mb-2">Room-Based Groups</h4>
              <p className="text-white text-sm">
                The most common approach: all lights in a room form one group. "Turn on
                living room" controls ceiling lights, lamps, and accent lighting together.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h4 className="font-medium text-elec-yellow mb-2">Activity-Based Groups</h4>
              <p className="text-white text-sm">
                Group lights by function regardless of physical location. "Work lights"
                might include desk lamp, overhead light, and monitor bias lighting.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h4 className="font-medium text-elec-yellow mb-2">Floor or Area Groups</h4>
              <p className="text-white text-sm">
                Useful for larger properties. "Upstairs" or "Ground floor" groups allow
                quick control of multiple rooms, particularly for goodnight routines.
              </p>
            </div>
          </div>
          <p className="text-white text-sm">
            Lights can belong to multiple groups simultaneously. A hallway light might be
            in both the "Hallway" group and the "Ground floor" group, responding to commands
            sent to either.
          </p>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Linking Lighting to Other Systems */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Linking Lighting to Other Systems
          </h2>
          <p className="text-white mb-4">
            Integrating lighting with other smart home systems creates cohesive experiences
            and adds functionality beyond simple on/off control.
          </p>
          <div className="space-y-4 mb-4">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="font-medium text-elec-yellow mb-2">Security System Integration</h4>
              <p className="text-white text-sm mb-2">
                When the alarm triggers, lights can flash or turn on to full brightness.
                During "away" mode, lights can simulate occupancy with random patterns.
              </p>
              <p className="text-white text-sm">
                <span className="text-elec-yellow">Example:</span> Doorbell camera detects
                motion at night, porch light turns on automatically.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="font-medium text-elec-yellow mb-2">HVAC Integration</h4>
              <p className="text-white text-sm mb-2">
                Link lighting to heating schedules for unified "home" and "away" modes.
                Lights and heating can work together based on occupancy detection.
              </p>
              <p className="text-white text-sm">
                <span className="text-elec-yellow">Example:</span> When heating switches to
                "comfort" mode, living room lights turn on to welcome settings.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="font-medium text-elec-yellow mb-2">AV System Integration</h4>
              <p className="text-white text-sm mb-2">
                Create cinema experiences where lights dim when content plays and brighten
                when paused. Gaming modes can match RGB lighting to on-screen action.
              </p>
              <p className="text-white text-sm">
                <span className="text-elec-yellow">Example:</span> TV turns on, room lights
                dim to 20% warm white automatically.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="font-medium text-elec-yellow mb-2">Door and Window Sensors</h4>
              <p className="text-white text-sm mb-2">
                Entry lighting activates when doors open, garage lights turn on when the
                garage door opens, or blinds adjust along with artificial lighting.
              </p>
              <p className="text-white text-sm">
                <span className="text-elec-yellow">Example:</span> Front door opens after
                sunset, hallway lights turn on for 5 minutes.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Motion Logic and Occupancy Detection */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Motion Logic and Occupancy Detection
          </h2>
          <p className="text-white mb-4">
            Motion-activated lighting is one of the most practical smart home features,
            but requires careful configuration to avoid frustrating the occupants.
          </p>
          <div className="space-y-3 mb-4">
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h4 className="font-medium text-elec-yellow mb-2">PIR Sensors</h4>
              <p className="text-white text-sm">
                Passive infrared sensors detect body heat and movement. Best for rooms with
                active movement like hallways and kitchens. May miss stationary occupants.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h4 className="font-medium text-elec-yellow mb-2">mmWave/Radar Sensors</h4>
              <p className="text-white text-sm">
                Detect presence even when stationary by sensing breathing and micro-movements.
                Ideal for offices and bathrooms where occupants may be still for long periods.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h4 className="font-medium text-elec-yellow mb-2">Combined Sensors</h4>
              <p className="text-white text-sm">
                Some devices combine PIR for instant motion detection with mmWave for presence
                confirmation, offering the best of both technologies.
              </p>
            </div>
          </div>
          <h3 className="text-lg font-medium text-white mb-3">Key Configuration Parameters</h3>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-4 text-elec-yellow font-medium">Setting</th>
                  <th className="text-left py-3 px-4 text-elec-yellow font-medium">Purpose</th>
                  <th className="text-left py-3 px-4 text-elec-yellow font-medium">Typical Values</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 text-white">Sensitivity</td>
                  <td className="py-3 px-4 text-white">Detection range and threshold</td>
                  <td className="py-3 px-4 text-white">Low/Medium/High or 1-10</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 text-white">Timeout</td>
                  <td className="py-3 px-4 text-white">Time lights stay on after motion stops</td>
                  <td className="py-3 px-4 text-white">30 seconds to 30 minutes</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 text-white">Lux threshold</td>
                  <td className="py-3 px-4 text-white">Minimum darkness to trigger lights</td>
                  <td className="py-3 px-4 text-white">50-200 lux typical</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-white">Cool-down</td>
                  <td className="py-3 px-4 text-white">Delay before sensor can retrigger</td>
                  <td className="py-3 px-4 text-white">0-60 seconds</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Best Practices for Motion Automation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Best Practices for Motion Automation
          </h2>
          <p className="text-white mb-4">
            Follow these guidelines to create reliable, user-friendly motion-activated lighting.
          </p>
          <ul className="space-y-3 text-white mb-4">
            <li className="flex items-start gap-3">
              <span className="text-elec-yellow font-bold">1.</span>
              <span>
                <strong>Position sensors carefully</strong> - Avoid pointing at windows (sunlight
                can cause false triggers) or heating sources (radiators, fireplaces).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-elec-yellow font-bold">2.</span>
              <span>
                <strong>Set appropriate timeouts</strong> - Hallways: 1-2 minutes. Bathrooms:
                10-15 minutes. Bedrooms: consider longer or disable motion control entirely.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-elec-yellow font-bold">3.</span>
              <span>
                <strong>Include manual override</strong> - Always provide a way for occupants
                to disable motion control when needed (e.g., watching a film).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-elec-yellow font-bold">4.</span>
              <span>
                <strong>Consider time-of-day</strong> - Night-time motion lighting might be
                dimmer to avoid disturbing sleep, while daytime might trigger brighter levels.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-elec-yellow font-bold">5.</span>
              <span>
                <strong>Test thoroughly</strong> - Walk through normal usage patterns. Test
                what happens when someone is stationary (reading, bathing, working).
              </span>
            </li>
          </ul>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-white text-sm">
              <span className="text-elec-yellow font-medium">Pro tip:</span> For bathrooms,
              use mmWave sensors or extend PIR timeout to 15-20 minutes. Nobody wants the
              lights turning off while they are in the shower.
            </p>
          </div>
        </section>

        {/* Common Challenges and Solutions */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Common Challenges and Solutions
          </h2>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="font-medium text-white mb-2">Problem: Lights turn off while room is occupied</h4>
              <p className="text-white text-sm mb-2">
                PIR sensors may not detect stationary occupants, especially when seated or lying down.
              </p>
              <p className="text-elec-yellow text-sm">
                Solution: Increase timeout, add mmWave sensor, or reposition PIR for better coverage.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="font-medium text-white mb-2">Problem: Lights trigger when room is unoccupied</h4>
              <p className="text-white text-sm mb-2">
                False triggers from pets, sunlight movement, heating systems, or passing traffic.
              </p>
              <p className="text-elec-yellow text-sm">
                Solution: Reduce sensitivity, reposition sensor away from trigger source, add pet immunity setting.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="font-medium text-white mb-2">Problem: Multiple automations conflict</h4>
              <p className="text-white text-sm mb-2">
                Motion turns on lights that a schedule just turned off, or scenes override motion settings.
              </p>
              <p className="text-elec-yellow text-sm">
                Solution: Create priority rules, use modes (away/home/sleep) to enable/disable automations.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="font-medium text-white mb-2">Problem: Response time too slow</h4>
              <p className="text-white text-sm mb-2">
                Noticeable delay between motion detection and lights turning on.
              </p>
              <p className="text-elec-yellow text-sm">
                Solution: Use local processing (Zigbee/Z-Wave) rather than cloud-based automations.
              </p>
            </div>
          </div>
        </section>

        {/* Real-World Application Example */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Real-World Application Example
          </h2>
          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <h4 className="font-medium text-elec-yellow mb-3">Comprehensive Hallway Automation</h4>
            <p className="text-white text-sm mb-3">
              A client wants their hallway lights to respond intelligently to movement,
              time of day, and other factors. Here is a complete automation strategy:
            </p>
            <ul className="space-y-2 text-white text-sm">
              <li>
                <span className="text-elec-yellow">Daytime (high lux):</span> Motion triggers
                no action - natural light is sufficient
              </li>
              <li>
                <span className="text-elec-yellow">Evening (after sunset):</span> Motion turns
                on lights at 80% warm white, 3-minute timeout
              </li>
              <li>
                <span className="text-elec-yellow">Night mode (11pm-6am):</span> Motion turns
                on lights at 10% warm white, 2-minute timeout
              </li>
              <li>
                <span className="text-elec-yellow">Alarm armed (away):</span> Motion triggers
                lights at 100% and sends notification to owner
              </li>
              <li>
                <span className="text-elec-yellow">Front door opens:</span> Hallway lights
                turn on regardless of motion sensor state
              </li>
            </ul>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">08</span>
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

        {/* Module Completion */}
        <section className="mb-10 p-6 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30 text-center">
          <CheckCircle className="h-12 w-12 text-elec-yellow mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Module 3 Complete</h3>
          <p className="text-white mb-4">
            You have completed all sections of Module 3: Smart Lighting Systems. You now
            understand lighting types, scenes, dimming, load compatibility, and automation.
          </p>
          <p className="text-white text-sm">
            Continue to Module 4 to learn about environmental sensors and monitoring.
          </p>
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            className="text-white hover:text-elec-yellow hover:bg-transparent touch-manipulation"
            asChild
          >
            <Link to="../smart-home-module-3-section-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            className="bg-elec-yellow text-black hover:bg-elec-yellow/80 touch-manipulation"
            asChild
          >
            <Link to="../smart-home-module-4">
              Module 4
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default SmartHomeModule3Section5;
