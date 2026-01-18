import { ArrowLeft, ArrowRight, Settings, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Voice Control Logic and Routine Mapping";
const DESCRIPTION = "Programming voice commands and automation routines for efficient smart home control";

const quickCheckQuestions = [
  {
    question: "What is a 'routine' in voice assistant terminology?",
    options: [
      "A single voice command",
      "A sequence of automated actions triggered by a single command or event",
      "A speaker volume setting",
      "A device reset procedure"
    ],
    correctAnswer: 1,
    explanation: "A routine is a sequence of multiple actions that execute automatically when triggered by a voice command, time, location, or other event. For example, 'Good night' triggering lights off, doors locked, and thermostat adjusted."
  },
  {
    question: "Why is it important to use logical device naming conventions?",
    options: [
      "To match manufacturer branding",
      "To ensure voice recognition accuracy and intuitive control",
      "To reduce power consumption",
      "To improve Wi-Fi signal"
    ],
    correctAnswer: 1,
    explanation: "Logical naming ensures voice assistants correctly interpret commands and makes control intuitive. 'Kitchen ceiling light' is clearer than 'Light A' for both the assistant and the user."
  },
  {
    question: "What should you test when verifying voice control logic?",
    options: [
      "Only that devices turn on",
      "Command recognition, execution timing, and correct device response",
      "Only speaker volume",
      "Only Wi-Fi speed"
    ],
    correctAnswer: 1,
    explanation: "Comprehensive testing verifies that voice commands are correctly recognised, executed in reasonable time, and that the intended devices respond correctly. This catches issues with naming, grouping, or integration."
  }
];

const quizQuestions = [
  {
    question: "What type of routine trigger executes at a specific time?",
    options: [
      "Voice trigger",
      "Location trigger",
      "Schedule trigger",
      "Sensor trigger"
    ],
    correctAnswer: 2,
    explanation: "Schedule triggers execute routines at specified times, such as turning on porch lights at sunset or adjusting heating before wake-up time."
  },
  {
    question: "What is a 'conditional' in automation logic?",
    options: [
      "A device brand",
      "An if-then rule that checks conditions before executing actions",
      "A speaker setting",
      "A network configuration"
    ],
    correctAnswer: 1,
    explanation: "Conditionals are if-then rules that check whether specific conditions are met before executing actions. For example, 'If motion detected AND after sunset, turn on lights'."
  },
  {
    question: "Why should complex automations be documented?",
    options: [
      "Legal requirement",
      "To enable troubleshooting and handover to customers",
      "To increase system speed",
      "To reduce power usage"
    ],
    correctAnswer: 1,
    explanation: "Documentation enables troubleshooting when issues arise and helps customers understand their system. It also aids future electricians who may service the installation."
  },
  {
    question: "What is a 'scene' in smart home terminology?",
    options: [
      "A camera view",
      "A pre-set combination of device states activated together",
      "A troubleshooting mode",
      "A network scan"
    ],
    correctAnswer: 1,
    explanation: "A scene is a pre-configured combination of device states that can be activated with a single command. 'Movie mode' might dim lights, close blinds, and turn on the TV."
  },
  {
    question: "What should be considered when creating voice command phrases?",
    options: [
      "Using the longest possible phrases",
      "Natural, memorable phrases that are distinct from other commands",
      "Using only single words",
      "Matching manufacturer default phrases"
    ],
    correctAnswer: 1,
    explanation: "Voice command phrases should be natural to say, easy to remember, and distinct from other commands to avoid accidental triggering. Custom phrases like 'Movie time' are more intuitive than default options."
  }
];

const faqs = [
  {
    question: "How many routines can I create?",
    answer: "Most platforms allow hundreds of routines, but complexity should be managed. Too many overlapping routines can cause conflicts. Document routines clearly and test for interactions before adding new ones."
  },
  {
    question: "Can routines be triggered by multiple methods?",
    answer: "Yes, most platforms allow routines to have multiple triggers. The same 'Movie mode' routine could be triggered by voice command, app button, or scheduled time. However, ensure different triggers don't cause unexpected behaviour."
  },
  {
    question: "What if a routine fails partway through?",
    answer: "Behaviour varies by platform. Some routines continue executing remaining actions, others stop. Test failure scenarios and consider creating separate routines for critical vs non-critical actions to ensure important actions always execute."
  }
];

const SmartHomeModule6Section3 = () => {
  useSEO({
    title: `${TITLE} | Smart Home Module 6`,
    description: DESCRIPTION
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
            <Link to="/electrician/upskilling/smart-home-module-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <span className="text-sm text-white">Section 3 of 5</span>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12 max-w-3xl mx-auto">
        {/* Centred Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-elec-yellow/10 border border-elec-yellow/30">
            <Settings className="h-4 w-4 text-elec-yellow" />
            <span className="text-sm font-medium text-elec-yellow">Voice Control and Hub Integration</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">{TITLE}</h1>
          <p className="text-lg text-white max-w-2xl mx-auto">{DESCRIPTION}</p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <h3 className="font-semibold text-white mb-1">Routines</h3>
            <p className="text-sm text-white">Multi-action automation sequences</p>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <h3 className="font-semibold text-white mb-1">Triggers</h3>
            <p className="text-sm text-white">Voice, time, location, sensors</p>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <h3 className="font-semibold text-white mb-1">Scenes</h3>
            <p className="text-sm text-white">Pre-set device combinations</p>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <h3 className="font-semibold text-white mb-1">Logic Design</h3>
            <p className="text-sm text-white">Conditionals and sequencing</p>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Learning Outcomes
          </h2>
          <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span className="text-white">Understand routine structure including triggers, conditions, and actions</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span className="text-white">Design effective voice commands that are intuitive and reliable</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span className="text-white">Create scenes for common scenarios like movie mode, bedtime, and away</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span className="text-white">Troubleshoot routine failures and optimise automation logic</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Understanding Routines */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Understanding Routines
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Routines are automated sequences that execute multiple actions in response to a trigger. They transform simple voice commands into powerful automation that controls multiple devices and services.
            </p>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Routine Components</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-elec-yellow text-sm">Trigger</h4>
                  <p className="text-white text-sm">
                    What initiates the routine: voice command, time schedule, location change, sensor activation, or manual button press.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-elec-yellow text-sm">Conditions (Optional)</h4>
                  <p className="text-white text-sm">
                    Requirements that must be met: time of day, device state, weather, or presence detection. Actions only execute if conditions pass.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-elec-yellow text-sm">Actions</h4>
                  <p className="text-white text-sm">
                    What happens: turn devices on/off, adjust settings, play media, send notifications, or trigger other routines.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 p-4 rounded-r-lg">
              <p className="text-white">
                <strong>Example routine:</strong> "Alexa, good morning" triggers: turn on kitchen lights, set thermostat to 20C, play news briefing, read calendar events. Condition: only between 6am-9am.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Trigger Types */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Trigger Types
          </h2>
          <div className="space-y-4 text-white">
            <div className="grid gap-4">
              <div className="bg-elec-gray/30 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-elec-yellow mb-2">Voice Triggers</h4>
                <p className="text-white text-sm">
                  Custom phrases like "Good night", "Movie time", or "I'm leaving". Should be distinct, memorable, and unlikely to be said accidentally.
                </p>
              </div>

              <div className="bg-elec-gray/30 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-elec-yellow mb-2">Schedule Triggers</h4>
                <p className="text-white text-sm">
                  Time-based activation: specific times, sunrise/sunset, or recurring schedules. Useful for consistent daily routines like morning warm-up or evening lighting.
                </p>
              </div>

              <div className="bg-elec-gray/30 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-elec-yellow mb-2">Location Triggers (Geofencing)</h4>
                <p className="text-white text-sm">
                  Activate when entering or leaving a defined area. "Arriving home" can turn on lights and adjust heating. Requires phone location services.
                </p>
              </div>

              <div className="bg-elec-gray/30 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-elec-yellow mb-2">Sensor Triggers</h4>
                <p className="text-white text-sm">
                  Motion detection, door opening, temperature thresholds, or other sensor events. Requires compatible sensors integrated with the voice platform.
                </p>
              </div>

              <div className="bg-elec-gray/30 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-elec-yellow mb-2">Device State Triggers</h4>
                <p className="text-white text-sm">
                  When a device changes state: smart lock unlocking, alarm disarming, or TV turning on. Enables responsive automation chains.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Device Naming Conventions */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Device Naming Conventions
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Effective device naming is essential for reliable voice control. Poor naming leads to confusion, misrecognition, and frustrated customers.
            </p>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Naming Best Practices</h3>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span><strong>Location + Function:</strong> "Kitchen ceiling light", "Living room lamp", "Bedroom fan"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span><strong>Avoid numbers:</strong> "Light 1" is meaningless; "Hall pendant" is clear</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span><strong>Distinct names:</strong> Avoid similar sounding names that confuse recognition</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span><strong>Short but descriptive:</strong> Long names are harder to say and recognise</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span><strong>Consistent format:</strong> Same pattern across all devices aids learning</span>
                </li>
              </ul>
            </div>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Room Groups</h3>
              <p className="text-white mb-3">
                Group devices by room for natural commands like "Turn off the bedroom" or "Dim the living room".
              </p>
              <ul className="space-y-1 text-white text-sm">
                <li>- Kitchen: Ceiling light, under-cabinet lights, pendant</li>
                <li>- Living room: Main light, lamp, TV, blinds</li>
                <li>- Bedroom: Ceiling light, bedside lamps, fan</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Common Scenes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Common Scene Patterns
          </h2>
          <div className="space-y-4 text-white">
            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Morning Routine</h3>
              <p className="text-white text-sm mb-2">Trigger: "Good morning" or schedule</p>
              <ul className="space-y-1 text-white text-sm">
                <li>- Turn on kitchen and bathroom lights</li>
                <li>- Set thermostat to comfort temperature</li>
                <li>- Play morning news or music</li>
                <li>- Read weather and calendar</li>
              </ul>
            </div>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Movie Mode</h3>
              <p className="text-white text-sm mb-2">Trigger: "Movie time" voice command</p>
              <ul className="space-y-1 text-white text-sm">
                <li>- Dim living room lights to 10%</li>
                <li>- Close blinds/curtains</li>
                <li>- Turn on TV and set to correct input</li>
                <li>- Set volume to preferred level</li>
              </ul>
            </div>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Bedtime</h3>
              <p className="text-white text-sm mb-2">Trigger: "Good night" voice command</p>
              <ul className="space-y-1 text-white text-sm">
                <li>- Turn off all lights except bedroom</li>
                <li>- Lock all doors</li>
                <li>- Set thermostat to night mode</li>
                <li>- Arm security system</li>
                <li>- Check windows/doors are closed</li>
              </ul>
            </div>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Away Mode</h3>
              <p className="text-white text-sm mb-2">Trigger: "I'm leaving" or geofence departure</p>
              <ul className="space-y-1 text-white text-sm">
                <li>- Turn off all lights</li>
                <li>- Lock all doors</li>
                <li>- Set thermostat to eco mode</li>
                <li>- Arm security system</li>
                <li>- Activate camera recording</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Testing and Troubleshooting */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Testing and Troubleshooting
          </h2>
          <div className="space-y-4 text-white">
            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Testing Checklist</h3>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Test each voice command from different locations in the room</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Verify all actions in the routine execute correctly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Test schedule triggers at the configured times</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Test conditions work as expected (time, device state)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Verify routines do not conflict with each other</span>
                </li>
              </ul>
            </div>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Common Issues</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-white"><strong>Command not recognised:</strong> Check phrase is unique and clearly spoken. Try rephrasing or check voice history for what was heard.</p>
                </div>
                <div>
                  <p className="text-white"><strong>Wrong device responds:</strong> Rename devices to be more distinct. Check room assignments.</p>
                </div>
                <div>
                  <p className="text-white"><strong>Routine partially executes:</strong> Check all devices are online and responsive. Test each action individually.</p>
                </div>
                <div>
                  <p className="text-white"><strong>Timing issues:</strong> Add delays between actions if devices need time to respond before next action.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
                <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-white">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <section className="mb-10">
          <Quiz
            title="Voice Control Logic Quiz"
            questions={quizQuestions}
            courseId="smart-home-module-6"
            sectionId="section-3"
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            className="text-white hover:text-elec-yellow hover:bg-transparent touch-manipulation"
            asChild
          >
            <Link to="../section-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voice Assistants
            </Link>
          </Button>
          <Button
            className="bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation"
            asChild
          >
            <Link to="../section-4">
              Bridging and Legacy Devices
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default SmartHomeModule6Section3;
