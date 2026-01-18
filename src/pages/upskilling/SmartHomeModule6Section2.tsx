import { ArrowLeft, ArrowRight, Mic, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Alexa, Google Home, and Siri Integration";
const DESCRIPTION = "Connecting smart home devices with voice assistants for hands-free control";

const quickCheckQuestions = [
  {
    question: "What is a 'skill' in Amazon Alexa terminology?",
    options: [
      "A voice command",
      "A third-party integration or app",
      "A speaker setting",
      "A user profile"
    ],
    correctAnswer: 1,
    explanation: "Alexa skills are third-party integrations that extend Alexa's capabilities, similar to apps on a smartphone. They enable control of smart home devices from different manufacturers."
  },
  {
    question: "Which voice assistant requires devices to be HomeKit-certified?",
    options: [
      "Amazon Alexa",
      "Google Assistant",
      "Apple Siri",
      "Samsung Bixby"
    ],
    correctAnswer: 2,
    explanation: "Apple Siri only works with HomeKit-certified devices or those exposed through HomeKit bridges. This certification ensures security and privacy standards but limits device choice."
  },
  {
    question: "What is the main advantage of Google Assistant's Routines feature?",
    options: [
      "Better sound quality",
      "Triggering multiple actions with a single voice command",
      "Lower power consumption",
      "Offline operation"
    ],
    correctAnswer: 1,
    explanation: "Google Assistant Routines allow multiple actions to be triggered by a single custom voice command, such as 'Good morning' activating lights, playing news, and adjusting heating."
  }
];

const quizQuestions = [
  {
    question: "How do smart home devices typically connect to Amazon Alexa?",
    options: [
      "Direct Bluetooth only",
      "Through skills and account linking",
      "Physical cable connection",
      "Infrared control"
    ],
    correctAnswer: 1,
    explanation: "Smart home devices connect to Alexa through manufacturer skills. Users enable the skill and link their device manufacturer account to allow Alexa to discover and control devices."
  },
  {
    question: "What is required for voice control to work when the internet is down?",
    options: [
      "Nothing - all voice assistants work offline",
      "A local processing capable assistant and locally-connected devices",
      "A backup battery",
      "A stronger Wi-Fi signal"
    ],
    correctAnswer: 1,
    explanation: "Most voice commands require internet for processing. Local voice processing (like some Alexa features) combined with locally-connected devices (Zigbee/Z-Wave) can provide limited offline functionality."
  },
  {
    question: "What is the purpose of 'device groups' in voice assistant apps?",
    options: [
      "To reduce Wi-Fi congestion",
      "To control multiple devices with a single command",
      "To improve sound quality",
      "To save battery power"
    ],
    correctAnswer: 1,
    explanation: "Device groups allow multiple devices to be controlled together with a single command, such as 'Turn off the living room' controlling all lights in that room."
  },
  {
    question: "Which privacy feature should customers be advised about regarding voice assistants?",
    options: [
      "Battery usage",
      "Voice recordings may be stored and reviewed",
      "Screen brightness",
      "Speaker volume limits"
    ],
    correctAnswer: 1,
    explanation: "Voice assistants may store recordings of commands for improving services. Customers should be advised about privacy settings, voice history deletion options, and mute functionality."
  },
  {
    question: "What should you verify during voice control testing?",
    options: [
      "Only that commands are recognised",
      "Command recognition, response time, and correct device action",
      "Only the speaker volume",
      "Only the Wi-Fi signal strength"
    ],
    correctAnswer: 1,
    explanation: "Thorough testing should verify that commands are correctly recognised, responses are timely, and the intended devices perform the correct actions. This ensures reliable operation."
  }
];

const faqs = [
  {
    question: "Can I use multiple voice assistants in the same home?",
    answer: "Yes, multiple voice assistants can coexist. Many devices support both Alexa and Google Assistant. However, automations and routines are typically platform-specific, so choose one primary platform for most automations to avoid complexity."
  },
  {
    question: "Why do some devices work with Alexa but not Siri?",
    answer: "Apple requires HomeKit certification for Siri compatibility, which involves meeting specific security requirements and paying certification fees. Some manufacturers choose not to pursue HomeKit certification, limiting Siri compatibility."
  },
  {
    question: "Do voice assistants work without internet?",
    answer: "Most voice commands require internet connection for cloud processing. Some newer devices support limited local processing for basic commands, but full functionality depends on internet connectivity. Always explain this limitation to customers."
  }
];

const SmartHomeModule6Section2 = () => {
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
            <Link to="..">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <span className="text-sm text-white">Section 2 of 5</span>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12 max-w-3xl mx-auto">
        {/* Centred Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-elec-yellow/10 border border-elec-yellow/30">
            <Mic className="h-4 w-4 text-elec-yellow" />
            <span className="text-sm font-medium text-elec-yellow">Voice Control and Hub Integration</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">{TITLE}</h1>
          <p className="text-lg text-white max-w-2xl mx-auto">{DESCRIPTION}</p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <h3 className="font-semibold text-white mb-1">Amazon Alexa</h3>
            <p className="text-sm text-white">Widest device compatibility</p>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <h3 className="font-semibold text-white mb-1">Google Assistant</h3>
            <p className="text-sm text-white">Natural language and routines</p>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <h3 className="font-semibold text-white mb-1">Apple Siri</h3>
            <p className="text-sm text-white">Privacy-focused HomeKit</p>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <h3 className="font-semibold text-white mb-1">Integration Setup</h3>
            <p className="text-sm text-white">Linking and configuration</p>
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
                <span className="text-white">Understand how voice assistants integrate with smart home devices</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span className="text-white">Compare Alexa, Google Assistant, and Siri capabilities and limitations</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span className="text-white">Configure device discovery and account linking for voice control</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span className="text-white">Advise customers on voice assistant selection based on their ecosystem</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Voice Control Fundamentals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Voice Control Fundamentals
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Voice assistants provide hands-free control of smart home devices through natural language commands. Understanding how each platform works helps match customers with the right solution.
            </p>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">How Voice Control Works</h3>
              <ol className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-elec-yellow font-semibold">1.</span>
                  <span><strong>Wake word detection:</strong> Device listens for "Alexa", "Hey Google", or "Hey Siri"</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-elec-yellow font-semibold">2.</span>
                  <span><strong>Speech to text:</strong> Audio sent to cloud servers for processing</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-elec-yellow font-semibold">3.</span>
                  <span><strong>Intent recognition:</strong> System determines what action is requested</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-elec-yellow font-semibold">4.</span>
                  <span><strong>Command execution:</strong> Action sent to smart home device via cloud or hub</span>
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* Amazon Alexa */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Amazon Alexa
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Amazon Alexa has the widest smart home device compatibility and largest marketplace of third-party skills. Available on Echo devices, Fire TV, and many third-party speakers.
            </p>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Key Features</h3>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span><strong>Skills:</strong> Third-party integrations extend functionality</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span><strong>Routines:</strong> Automated sequences triggered by voice or events</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span><strong>Groups:</strong> Combine devices for single command control</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span><strong>Hunches:</strong> Proactive suggestions based on patterns</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span><strong>Echo devices:</strong> Built-in Zigbee hub on some models</span>
                </li>
              </ul>
            </div>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Setup Process</h3>
              <ol className="space-y-2 text-white text-sm">
                <li>1. Enable the manufacturer's skill in the Alexa app</li>
                <li>2. Sign in to the manufacturer account to link devices</li>
                <li>3. Run "Alexa, discover devices" to find compatible devices</li>
                <li>4. Assign devices to rooms and create groups</li>
                <li>5. Test voice commands: "Alexa, turn on the living room lights"</li>
              </ol>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Google Assistant */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Google Assistant
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Google Assistant excels at natural language understanding and integrates deeply with Google services. Available on Nest speakers, displays, and Android devices.
            </p>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Key Features</h3>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span><strong>Natural language:</strong> Understands varied phrasing well</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span><strong>Routines:</strong> Custom voice triggers for multiple actions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span><strong>Household controls:</strong> Different settings per voice profile</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span><strong>Google Home app:</strong> Centralised device management</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span><strong>Nest ecosystem:</strong> Deep integration with Nest thermostats and cameras</span>
                </li>
              </ul>
            </div>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Setup Process</h3>
              <ol className="space-y-2 text-white text-sm">
                <li>1. Open Google Home app and tap + to add device</li>
                <li>2. Select "Works with Google" and find manufacturer</li>
                <li>3. Link manufacturer account</li>
                <li>4. Assign devices to rooms (Home)</li>
                <li>5. Test: "Hey Google, dim the bedroom lights to 50%"</li>
              </ol>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Apple Siri and HomeKit */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Apple Siri and HomeKit
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Apple's HomeKit prioritises privacy and security, with strict device certification requirements. Siri control is available on iPhone, iPad, Apple Watch, HomePod, and Apple TV.
            </p>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Key Features</h3>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span><strong>Privacy-focused:</strong> Local processing and encrypted communication</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span><strong>Scenes:</strong> Pre-configured device combinations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span><strong>Automations:</strong> Time and event-based triggers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span><strong>Home app:</strong> Clean interface with room organisation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span><strong>HomePod:</strong> Acts as home hub for remote access</span>
                </li>
              </ul>
            </div>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Considerations</h3>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <span className="text-red-400">-</span>
                  <span>Limited device selection - HomeKit certification required</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">-</span>
                  <span>Requires Apple devices for full functionality</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">-</span>
                  <span>Hub required for remote access (HomePod, Apple TV, or iPad)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">+</span>
                  <span>Matter support expanding device compatibility</span>
                </li>
              </ul>
            </div>

            <p className="text-white">
              <strong>Best for:</strong> Apple-centric households who prioritise privacy and prefer a curated, reliable experience over maximum device choice.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Practical Setup Tips */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Practical Setup Tips
          </h2>
          <div className="space-y-4 text-white">
            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Device Naming Best Practices</h3>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Use clear, distinct names: "Kitchen ceiling light" not "Light 1"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Avoid names that sound similar to avoid confusion</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Group devices by room for easier control</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Test that commands work naturally: "Turn off the bedroom"</span>
                </li>
              </ul>
            </div>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Testing Checklist</h3>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Test basic on/off commands for each device</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Test dimming/brightness adjustment where applicable</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Test room/group commands</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Test any configured scenes or routines</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Demonstrate to customer and document setup</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

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
            title="Voice Assistant Integration Quiz"
            questions={quizQuestions}
            courseId="smart-home-module-6"
            sectionId="section-2"
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
              Hub Types
            </Link>
          </Button>
          <Button
            className="bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation"
            asChild
          >
            <Link to="../section-3">
              Voice Control Logic
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default SmartHomeModule6Section2;
