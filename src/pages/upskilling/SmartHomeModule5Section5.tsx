import { ArrowLeft, ArrowRight, Lightbulb, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Linking with Lighting and Emergency Scenes";
const DESCRIPTION = "Integrating lighting automation with security systems and emergency protocols";

const quickCheckQuestions = [
  {
    question: "What is a lighting scene in smart home terminology?",
    options: [
      "A single light bulb",
      "A pre-configured combination of multiple lights at specific settings",
      "A light switch",
      "A dimmer dial"
    ],
    correctAnswer: 1,
    explanation: "A lighting scene is a pre-configured combination of multiple lights set to specific brightness levels and colours, activated with a single command to create a desired ambiance."
  },
  {
    question: "How can security lighting deter intruders?",
    options: [
      "By staying off at all times",
      "By simulating occupancy when away and activating on motion detection",
      "By using only low-brightness settings",
      "By operating on a fixed schedule only"
    ],
    correctAnswer: 1,
    explanation: "Security lighting deters intruders by simulating occupancy patterns when the home is empty and activating bright lights when motion is detected, making the property appear occupied and monitored."
  },
  {
    question: "What should happen to smart lighting when a fire alarm triggers?",
    options: [
      "Lights should turn off to save energy",
      "Lights should flash red",
      "All lights should turn on fully to illuminate escape routes",
      "Only bedroom lights should activate"
    ],
    correctAnswer: 2,
    explanation: "When a fire alarm triggers, smart lighting should turn on fully throughout the property to illuminate escape routes, helping occupants navigate safely in smoke or darkness."
  }
];

const quizQuestions = [
  {
    question: "What is the purpose of an 'Away' lighting scene?",
    options: [
      "To turn all lights off permanently",
      "To simulate occupancy by varying lights throughout the evening",
      "To provide maximum brightness",
      "To disable the smart home system"
    ],
    correctAnswer: 1,
    explanation: "An 'Away' scene simulates occupancy by turning lights on and off at realistic intervals throughout the evening, deterring burglars who target empty properties."
  },
  {
    question: "What trigger could activate a 'Panic' lighting scene?",
    options: [
      "Sunset",
      "Alarm trigger or manual panic button activation",
      "Low battery warning",
      "Wi-Fi disconnection"
    ],
    correctAnswer: 1,
    explanation: "A 'Panic' scene activates when an alarm triggers or the homeowner presses a panic button, turning on all external lights at maximum brightness and potentially flashing to attract attention."
  },
  {
    question: "Why is it important that emergency lighting operates independently of smart home hubs?",
    options: [
      "To reduce energy consumption",
      "To ensure function even if the smart system fails",
      "To save money",
      "To improve aesthetics"
    ],
    correctAnswer: 1,
    explanation: "Emergency lighting must operate independently to ensure it functions even if the smart home hub fails, loses power, or experiences software issues during an emergency."
  },
  {
    question: "What is the recommended action when linking lighting to a security alarm?",
    options: [
      "Keep all lights off during an alarm",
      "Turn on all lights to illuminate the property and deter intruders",
      "Only use coloured lights",
      "Disable automatic responses"
    ],
    correctAnswer: 1,
    explanation: "Linking lighting to security alarms should turn on all lights to illuminate the property, making it harder for intruders to hide and drawing attention to the incident."
  },
  {
    question: "What should electricians verify when integrating smart lighting with emergency systems?",
    options: [
      "That the lights are the cheapest available",
      "That emergency functions work without smart system dependency",
      "That only one light is connected",
      "That the system uses maximum wattage"
    ],
    correctAnswer: 1,
    explanation: "Electricians must verify that emergency lighting functions independently and is not solely dependent on the smart system, ensuring safety compliance and reliable operation during emergencies."
  }
];

const faqs = [
  {
    question: "Can smart lighting replace emergency lighting?",
    answer: "No, smart lighting cannot replace properly certified emergency lighting in commercial or rental properties. Building regulations require specific emergency lighting systems with battery backup that operate independently. Smart lighting can complement but not substitute for compliant emergency lighting."
  },
  {
    question: "What happens to lighting scenes if the internet goes down?",
    answer: "Local hubs (Zigbee, Z-Wave) continue operating scenes without internet. Cloud-dependent systems may lose scene functionality during outages. For security-critical lighting, ensure the system can operate locally without cloud connectivity."
  },
  {
    question: "How do I prevent neighbours being disturbed by security lighting?",
    answer: "Use motion-activated lights with appropriate sensitivity settings, PIR detection angles that avoid triggering from public paths, warm colour temperatures for less intrusive illumination, and ensure lights are positioned to illuminate your property without light spill onto neighbouring properties."
  }
];

const SmartHomeModule5Section5 = () => {
  useSEO({
    title: `${TITLE} | Smart Home Module 5`,
    description: DESCRIPTION
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
            <Link to="/electrician/upskilling/smart-home-module-5">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <span className="text-sm text-white">Section 5 of 6</span>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12 max-w-3xl mx-auto">
        {/* Centred Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-elec-yellow/10 border border-elec-yellow/30">
            <Lightbulb className="h-4 w-4 text-elec-yellow" />
            <span className="text-sm font-medium text-elec-yellow">Smart Security and Access Control</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">{TITLE}</h1>
          <p className="text-lg text-white max-w-2xl mx-auto">{DESCRIPTION}</p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <h3 className="font-semibold text-white mb-1">Lighting Scenes</h3>
            <p className="text-sm text-white">Pre-configured ambiance settings</p>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <h3 className="font-semibold text-white mb-1">Security Integration</h3>
            <p className="text-sm text-white">Alarm-triggered lighting responses</p>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <h3 className="font-semibold text-white mb-1">Emergency Protocols</h3>
            <p className="text-sm text-white">Fire and panic scene activation</p>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <h3 className="font-semibold text-white mb-1">Best Practices</h3>
            <p className="text-sm text-white">Testing and failsafe design</p>
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
                <span className="text-white">Understand lighting scenes and their role in smart home automation</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span className="text-white">Configure security lighting responses linked to alarm events</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span className="text-white">Design emergency lighting protocols for fire and panic situations</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span className="text-white">Apply best practices for testing and failsafe design in lighting integration</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Lighting Scenes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Understanding Lighting Scenes
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Lighting scenes are pre-configured combinations of multiple lights set to specific brightness levels, colours, and states. They enable complex lighting arrangements to be activated with a single command.
            </p>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Common Scene Types</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-elec-yellow text-sm">Evening</h4>
                  <p className="text-white text-sm">
                    Warm, dimmed lighting in living areas for relaxation. Kitchen and utility at functional brightness.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-elec-yellow text-sm">Movie</h4>
                  <p className="text-white text-sm">
                    Living room lights dimmed to 10-20%, bias lighting behind TV, other rooms off or minimal.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-elec-yellow text-sm">Night</h4>
                  <p className="text-white text-sm">
                    All main lights off, motion-activated pathway lighting at low brightness for safe navigation.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-elec-yellow text-sm">Away</h4>
                  <p className="text-white text-sm">
                    Simulated occupancy with lights turning on and off at realistic intervals throughout evening hours.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Scene Triggers</h3>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span><strong>Manual:</strong> Button press, app activation, voice command</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span><strong>Time-based:</strong> Sunset/sunrise, scheduled times</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span><strong>Motion:</strong> PIR or camera detection activating pathway lighting</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span><strong>Security:</strong> Alarm arm/disarm, sensor triggers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span><strong>Location:</strong> Geofencing when approaching or leaving home</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Security Lighting Integration */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Security Lighting Integration
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Linking lighting to security systems enhances both deterrence and response capabilities. Smart integration allows lighting to respond automatically to security events.
            </p>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Deterrence Lighting</h3>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span><strong>Occupancy simulation:</strong> Random light patterns when away to suggest presence</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span><strong>Dusk-to-dawn:</strong> Exterior lights activate at sunset, turn off at sunrise</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span><strong>Motion-activated:</strong> Flood lights trigger on external PIR detection</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span><strong>Approach lighting:</strong> Pathway lights activate as someone approaches</span>
                </li>
              </ul>
            </div>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Alarm-Triggered Responses</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-elec-yellow text-sm">Intrusion Alarm</h4>
                  <ul className="text-white text-sm space-y-1 mt-1">
                    <li>- All internal and external lights on at 100%</li>
                    <li>- External lights may flash to attract attention</li>
                    <li>- Maintains illumination until alarm is reset</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-elec-yellow text-sm">System Armed</h4>
                  <ul className="text-white text-sm space-y-1 mt-1">
                    <li>- Internal lights turn off or dim to night mode</li>
                    <li>- External security lighting remains active</li>
                    <li>- Away simulation activates if configured</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-elec-yellow text-sm">System Disarmed</h4>
                  <ul className="text-white text-sm space-y-1 mt-1">
                    <li>- Welcome scene activates (hallway, entrance)</li>
                    <li>- Time-appropriate lighting based on current conditions</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Emergency Lighting Protocols */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Emergency Lighting Protocols
          </h2>
          <div className="space-y-4 text-white">
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <p className="text-white">
                <strong>Important:</strong> Smart home lighting must not be the sole emergency lighting provision in properties where building regulations require dedicated emergency lighting systems.
              </p>
            </div>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Fire Alarm Integration</h3>
              <p className="text-white mb-3">
                When smoke or heat detectors trigger, smart lighting should support safe evacuation:
              </p>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>All lights turn on to maximum brightness</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Pathway lighting illuminates escape routes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>External lights activate to guide emergency services</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Lighting remains on regardless of other automations</span>
                </li>
              </ul>
            </div>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Panic Scene</h3>
              <p className="text-white mb-3">
                A panic scene activates when homeowners feel threatened or require urgent assistance:
              </p>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>All external lights on at maximum, potentially flashing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Attracts attention from neighbours and passers-by</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Can be triggered via app, voice, or dedicated panic button</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>May integrate with alarm system siren</span>
                </li>
              </ul>
            </div>

            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 p-4 rounded-r-lg">
              <p className="text-white">
                <strong>Best practice:</strong> Emergency scenes should override all other automations and remain active until manually cancelled, ensuring lighting support during the entire emergency response period.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Setup and Testing */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Setup and Testing Best Practices
          </h2>
          <div className="space-y-4 text-white">
            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Configuration Guidelines</h3>
              <ol className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-elec-yellow font-semibold">1.</span>
                  <span><strong>Map all lights:</strong> Document which lights are included in each scene and their intended settings.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-elec-yellow font-semibold">2.</span>
                  <span><strong>Define triggers:</strong> Clearly specify what events should activate each scene.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-elec-yellow font-semibold">3.</span>
                  <span><strong>Set priorities:</strong> Ensure emergency scenes take precedence over routine automations.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-elec-yellow font-semibold">4.</span>
                  <span><strong>Test failsafes:</strong> Verify lights respond correctly if hub loses power or connectivity.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-elec-yellow font-semibold">5.</span>
                  <span><strong>Document handover:</strong> Provide customer with written guide to scene operation.</span>
                </li>
              </ol>
            </div>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Testing Checklist</h3>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Test each scene activation method (app, voice, button, automation)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Verify alarm-triggered lighting with test alarm activation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Confirm emergency scenes override routine automations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Test operation during simulated internet outage</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Check timing and brightness levels match specifications</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Validate external lighting does not cause light pollution to neighbours</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
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
            title="Lighting and Emergency Scenes Quiz"
            questions={quizQuestions}
            courseId="smart-home-module-5"
            sectionId="section-5"
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
              Remote Access and Alerts
            </Link>
          </Button>
          <Button
            className="bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation"
            asChild
          >
            <Link to="../section-6">
              Network Security and Privacy
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default SmartHomeModule5Section5;
