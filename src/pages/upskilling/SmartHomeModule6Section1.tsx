import { ArrowLeft, ArrowRight, CircleDot, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Hub Types: Home Assistant, SmartThings, Proprietary";
const DESCRIPTION = "Understanding different smart home hub options and their applications for various installation scenarios";

const quickCheckQuestions = [
  {
    question: "What is the primary advantage of Home Assistant over proprietary hub systems?",
    options: [
      "Lower purchase price",
      "Better customer support",
      "Open-source flexibility and wide device compatibility",
      "Simpler setup process"
    ],
    correctAnswer: 2,
    explanation: "Home Assistant is open-source, allowing maximum flexibility and compatibility with thousands of devices from different manufacturers, though it requires more technical knowledge to set up and maintain."
  },
  {
    question: "Which type of hub would you recommend for a customer who wants simple setup and prefers a single brand ecosystem?",
    options: [
      "Home Assistant",
      "SmartThings",
      "Proprietary single-brand hub",
      "Custom-built hub"
    ],
    correctAnswer: 2,
    explanation: "Proprietary hubs from single brands offer the simplest setup and guaranteed compatibility within their ecosystem, ideal for customers who prefer ease of use over flexibility."
  },
  {
    question: "What is a key consideration when choosing SmartThings as a hub solution?",
    options: [
      "It only works offline",
      "It requires cloud connectivity for most features",
      "It cannot integrate with third-party devices",
      "It requires professional installation"
    ],
    correctAnswer: 1,
    explanation: "SmartThings relies heavily on cloud connectivity for automations and integrations. While it supports local control for some functions, many features require an internet connection."
  }
];

const quizQuestions = [
  {
    question: "What distinguishes a hub from a bridge in smart home terminology?",
    options: [
      "Hubs are wireless, bridges are wired",
      "Hubs control multiple protocols and devices, bridges typically translate one protocol",
      "Hubs are more expensive",
      "Bridges support more devices"
    ],
    correctAnswer: 1,
    explanation: "A hub is the central controller that manages multiple protocols and device types, whilst a bridge typically translates between one specific protocol (like Hue Zigbee) and the home network."
  },
  {
    question: "Which protocol does SmartThings support natively without additional hardware?",
    options: [
      "Z-Wave only",
      "Zigbee only",
      "Both Zigbee and Z-Wave",
      "Neither - bridges required"
    ],
    correctAnswer: 2,
    explanation: "SmartThings hubs include built-in radios for both Zigbee and Z-Wave protocols, allowing direct connection to devices using either standard without additional bridges."
  },
  {
    question: "What is the main trade-off when choosing a proprietary ecosystem?",
    options: [
      "Higher cost for less features",
      "Simpler setup but limited device choice",
      "Better support but slower updates",
      "More features but complex setup"
    ],
    correctAnswer: 1,
    explanation: "Proprietary ecosystems offer simpler setup and guaranteed compatibility within their brand, but limit device choice to that manufacturer's range and certified partners."
  },
  {
    question: "Why might an electrician recommend Home Assistant for a technically confident customer?",
    options: [
      "It's the cheapest option",
      "It offers maximum customisation and local control",
      "It has the best mobile app",
      "It requires no maintenance"
    ],
    correctAnswer: 1,
    explanation: "Home Assistant provides maximum customisation, works with thousands of devices, and can operate entirely locally without cloud dependency - ideal for technically confident users who want full control."
  },
  {
    question: "What happens to SmartThings automations if the internet connection fails?",
    options: [
      "All automations continue normally",
      "Only local automations continue, cloud-based ones stop",
      "The entire system stops working",
      "Devices continue but cannot be controlled"
    ],
    correctAnswer: 1,
    explanation: "SmartThings supports some local automations that continue during internet outages, but many cloud-based routines and integrations stop working until connectivity is restored."
  }
];

const faqs = [
  {
    question: "Can I mix different hubs in one installation?",
    answer: "Yes, multiple hubs can coexist, but this adds complexity. Typically, one primary hub (like Home Assistant) integrates with others via APIs or bridges. However, this requires careful planning to avoid conflicts and ensure reliable automation."
  },
  {
    question: "Should I recommend Matter-compatible hubs now?",
    answer: "Matter is becoming increasingly important for interoperability. Recommend hubs that support or plan to support Matter, but explain that the ecosystem is still maturing. Current SmartThings and Home Assistant both support Matter."
  },
  {
    question: "What hub should I recommend for rental properties?",
    answer: "For rental properties, consider portable, easy-to-remove solutions. Proprietary hubs like SmartThings or simple ecosystems (Hue, Ring) are easier to relocate than wired solutions like Home Assistant running on dedicated hardware."
  }
];

const SmartHomeModule6Section1 = () => {
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
          <span className="text-sm text-white">Section 1 of 5</span>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12 max-w-3xl mx-auto">
        {/* Centred Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-elec-yellow/10 border border-elec-yellow/30">
            <CircleDot className="h-4 w-4 text-elec-yellow" />
            <span className="text-sm font-medium text-elec-yellow">Voice Control and Hub Integration</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">{TITLE}</h1>
          <p className="text-lg text-white max-w-2xl mx-auto">{DESCRIPTION}</p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <h3 className="font-semibold text-white mb-1">Home Assistant</h3>
            <p className="text-sm text-white">Open-source, maximum flexibility</p>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <h3 className="font-semibold text-white mb-1">SmartThings</h3>
            <p className="text-sm text-white">Samsung hub with wide compatibility</p>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <h3 className="font-semibold text-white mb-1">Proprietary Hubs</h3>
            <p className="text-sm text-white">Brand-specific ecosystems</p>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <h3 className="font-semibold text-white mb-1">Selection Criteria</h3>
            <p className="text-sm text-white">Matching hubs to customer needs</p>
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
                <span className="text-white">Understand the role of smart home hubs as central controllers</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span className="text-white">Compare Home Assistant, SmartThings, and proprietary hub options</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span className="text-white">Identify the best hub solution for different customer requirements</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span className="text-white">Explain protocol support, cloud dependency, and local control considerations</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Purpose of Smart Home Hubs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            The Purpose of Smart Home Hubs
          </h2>
          <div className="space-y-4 text-white">
            <p>
              A smart home hub acts as the central brain of a smart home system, coordinating communication between devices using different protocols and enabling unified control and automation.
            </p>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Key Hub Functions</h3>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span><strong>Protocol translation:</strong> Converting between Zigbee, Z-Wave, Wi-Fi, and other protocols</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span><strong>Automation engine:</strong> Running if-then logic and schedules</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span><strong>Unified interface:</strong> Single app for controlling diverse devices</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span><strong>Voice integration:</strong> Connecting to Alexa, Google, and Siri</span>
                </li>
              </ul>
            </div>

            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 p-4 rounded-r-lg">
              <p className="text-white">
                <strong>Key distinction:</strong> A hub is not the same as a bridge. Bridges typically translate one specific protocol, whilst hubs manage multiple protocols and provide the automation logic layer.
              </p>
            </div>
          </div>
        </section>

        {/* Home Assistant */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Home Assistant
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Home Assistant is an open-source home automation platform that runs locally on dedicated hardware (Raspberry Pi, mini PC, or dedicated appliance). It offers the widest device compatibility and maximum customisation.
            </p>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Strengths</h3>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <span className="text-green-400">+</span>
                  <span>Supports 2000+ integrations across all major brands</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">+</span>
                  <span>Runs entirely locally - no cloud dependency</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">+</span>
                  <span>Highly customisable with YAML configuration or UI</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">+</span>
                  <span>Active community with regular updates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">+</span>
                  <span>No subscription fees</span>
                </li>
              </ul>
            </div>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Considerations</h3>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <span className="text-red-400">-</span>
                  <span>Requires technical knowledge for setup and maintenance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">-</span>
                  <span>Hardware purchase required (or cloud subscription for hosted version)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">-</span>
                  <span>Updates occasionally break configurations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">-</span>
                  <span>No official manufacturer support - community-driven</span>
                </li>
              </ul>
            </div>

            <p className="text-white">
              <strong>Best for:</strong> Tech-savvy customers who want maximum flexibility, local control, and are comfortable with occasional troubleshooting.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* SmartThings */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Samsung SmartThings
          </h2>
          <div className="space-y-4 text-white">
            <p>
              SmartThings is Samsung's consumer-focused smart home platform. The hub includes built-in Zigbee and Z-Wave radios, with a cloud-based automation engine and mobile app.
            </p>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Strengths</h3>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <span className="text-green-400">+</span>
                  <span>User-friendly app with straightforward setup</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">+</span>
                  <span>Built-in Zigbee and Z-Wave support</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">+</span>
                  <span>Wide third-party device compatibility</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">+</span>
                  <span>Matter support for future-proofing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">+</span>
                  <span>Integration with Samsung appliances</span>
                </li>
              </ul>
            </div>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Considerations</h3>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <span className="text-red-400">-</span>
                  <span>Relies heavily on cloud for automations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">-</span>
                  <span>Limited local processing capabilities</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">-</span>
                  <span>Platform changes have disrupted users historically</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">-</span>
                  <span>Less customisation than Home Assistant</span>
                </li>
              </ul>
            </div>

            <p className="text-white">
              <strong>Best for:</strong> Customers wanting good device compatibility with easier setup than Home Assistant, who are comfortable with cloud dependency.
            </p>
          </div>
        </section>

        {/* Proprietary Hubs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Proprietary Hub Systems
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Proprietary hubs are designed to work specifically with one manufacturer's ecosystem. Examples include Philips Hue Bridge, Lutron Caseta Hub, and Apple HomePod (HomeKit).
            </p>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Strengths</h3>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <span className="text-green-400">+</span>
                  <span>Guaranteed compatibility within ecosystem</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">+</span>
                  <span>Simple, polished setup experience</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">+</span>
                  <span>Official manufacturer support</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">+</span>
                  <span>Often reliable with thorough testing</span>
                </li>
              </ul>
            </div>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Considerations</h3>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <span className="text-red-400">-</span>
                  <span>Limited to brand's device range</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">-</span>
                  <span>May require multiple hubs for different brands</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">-</span>
                  <span>Potential vendor lock-in</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">-</span>
                  <span>Premium pricing for ecosystem products</span>
                </li>
              </ul>
            </div>

            <p className="text-white">
              <strong>Best for:</strong> Customers who value simplicity, want professional-grade reliability, and are happy to stay within one brand's ecosystem.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Selecting the Right Hub */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Selecting the Right Hub
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Choosing the appropriate hub requires understanding the customer's technical ability, existing devices, and priorities.
            </p>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Key Questions to Ask</h3>
              <ol className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-elec-yellow font-semibold">1.</span>
                  <span><strong>Technical comfort:</strong> How comfortable are they with technology and troubleshooting?</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-elec-yellow font-semibold">2.</span>
                  <span><strong>Existing devices:</strong> What smart devices do they already own or plan to purchase?</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-elec-yellow font-semibold">3.</span>
                  <span><strong>Privacy concerns:</strong> Do they prefer local control or accept cloud services?</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-elec-yellow font-semibold">4.</span>
                  <span><strong>Budget:</strong> Initial investment vs ongoing costs (subscriptions)?</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-elec-yellow font-semibold">5.</span>
                  <span><strong>Support needs:</strong> Do they want manufacturer support or community resources?</span>
                </li>
              </ol>
            </div>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Quick Recommendation Guide</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-start border-b border-white/10 pb-2">
                  <span className="text-white">Tech-savvy, wants maximum control</span>
                  <span className="text-elec-yellow">Home Assistant</span>
                </div>
                <div className="flex justify-between items-start border-b border-white/10 pb-2">
                  <span className="text-white">Good balance of ease and flexibility</span>
                  <span className="text-elec-yellow">SmartThings</span>
                </div>
                <div className="flex justify-between items-start border-b border-white/10 pb-2">
                  <span className="text-white">Simple, reliable, single-brand focus</span>
                  <span className="text-elec-yellow">Proprietary hub</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-white">Apple-focused household</span>
                  <span className="text-elec-yellow">HomeKit (HomePod)</span>
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
            title="Hub Types Quiz"
            questions={quizQuestions}
            courseId="smart-home-module-6"
            sectionId="section-1"
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            className="text-white hover:text-elec-yellow hover:bg-transparent touch-manipulation"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            className="bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation"
            asChild
          >
            <Link to="../section-2">
              Voice Assistant Integration
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default SmartHomeModule6Section1;
