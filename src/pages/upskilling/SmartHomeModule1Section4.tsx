import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Smart Home Architectures - Smart Home Technology Module 1 Section 4";
const DESCRIPTION = "Learn about local, cloud, and hybrid smart home architectures. Compare advantages, disadvantages, and choose the right system for different applications.";

const quickCheckQuestions = [
  {
    id: "local-architecture",
    question: "What is the main advantage of a local smart home architecture?",
    options: [
      "Requires constant internet connection",
      "Faster response times and works offline",
      "Lower initial cost",
      "Simpler setup process"
    ],
    correctIndex: 1,
    explanation: "Local architectures process automation on-premises, providing faster response times and continued operation during internet outages."
  },
  {
    id: "cloud-architecture",
    question: "What is a key benefit of cloud-based smart home systems?",
    options: [
      "Works without internet",
      "Zero subscription costs",
      "Easy remote access and advanced AI features",
      "No privacy concerns"
    ],
    correctIndex: 2,
    explanation: "Cloud-based systems offer easy remote access from anywhere and can leverage powerful AI and machine learning capabilities hosted in data centres."
  },
  {
    id: "hybrid-architecture",
    question: "What does a hybrid smart home architecture combine?",
    options: [
      "Only wireless protocols",
      "Local processing with cloud connectivity",
      "Only wired systems",
      "Manual and automatic controls only"
    ],
    correctIndex: 1,
    explanation: "Hybrid architectures combine local processing for fast, reliable automation with cloud connectivity for remote access and advanced features."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which architecture type processes all automation locally without requiring internet?",
    options: [
      "Cloud-only architecture",
      "Local architecture",
      "Hybrid architecture",
      "Distributed architecture"
    ],
    correctAnswer: 1,
    explanation: "Local architecture processes all automation on-premises using a hub or controller, without requiring internet connectivity for basic operation."
  },
  {
    id: 2,
    question: "What is a disadvantage of cloud-only smart home systems?",
    options: [
      "Too fast response times",
      "Dependence on internet connectivity",
      "Too much local storage",
      "Limited remote access"
    ],
    correctAnswer: 1,
    explanation: "Cloud-only systems require internet connectivity to function, meaning outages can disable automation and control capabilities."
  },
  {
    id: 3,
    question: "Which architecture type is best for maintaining privacy of home data?",
    options: [
      "Cloud-only",
      "Local-only",
      "Social media integrated",
      "Public cloud"
    ],
    correctAnswer: 1,
    explanation: "Local-only architectures keep all data on-premises, providing maximum privacy as no data is sent to external servers."
  },
  {
    id: 4,
    question: "What is edge computing in smart home context?",
    options: [
      "Computing at network boundaries",
      "Processing at the device or hub level rather than cloud",
      "Computing at room edges",
      "External computing services"
    ],
    correctAnswer: 1,
    explanation: "Edge computing refers to processing data at the device or hub level locally, reducing latency and cloud dependence."
  },
  {
    id: 5,
    question: "Which feature typically requires cloud connectivity in smart homes?",
    options: [
      "Local light switching",
      "Motion sensor triggering",
      "Voice assistant integration and remote access",
      "Timer-based automation"
    ],
    correctAnswer: 2,
    explanation: "Voice assistants like Alexa and Google Home typically process voice commands in the cloud, and remote access from outside the home requires cloud connectivity."
  },
  {
    id: 6,
    question: "What is a hybrid architecture's response during internet outage?",
    options: [
      "Complete system failure",
      "Local automation continues, remote access unavailable",
      "All features continue normally",
      "Only lighting works"
    ],
    correctAnswer: 1,
    explanation: "In hybrid systems, local automation continues functioning during outages, but cloud-dependent features like remote access and voice control become unavailable."
  },
  {
    id: 7,
    question: "Which architecture requires the most powerful local hardware?",
    options: [
      "Cloud-only",
      "Local processing",
      "Basic timer systems",
      "Manual control"
    ],
    correctAnswer: 1,
    explanation: "Local processing architectures require more powerful local hardware (hub/controller) to handle all automation processing on-premises."
  },
  {
    id: 8,
    question: "What ongoing cost is typically associated with cloud-based systems?",
    options: [
      "No ongoing costs",
      "Subscription fees for cloud services",
      "Only electricity costs",
      "Hardware replacement costs"
    ],
    correctAnswer: 1,
    explanation: "Many cloud-based systems require subscription fees for cloud storage, advanced features, or continued service access."
  },
  {
    id: 9,
    question: "Which architecture provides the lowest latency for automation responses?",
    options: [
      "Cloud-only",
      "Local processing",
      "Internet-dependent",
      "Satellite-based"
    ],
    correctAnswer: 1,
    explanation: "Local processing provides the lowest latency as commands are processed on-premises without the round-trip delay to cloud servers."
  },
  {
    id: 10,
    question: "For a client prioritising reliability and privacy, which architecture would you recommend?",
    options: [
      "Cloud-only system",
      "Local or hybrid system with strong local processing",
      "Public cloud system",
      "Shared network system"
    ],
    correctAnswer: 1,
    explanation: "A local or hybrid system with strong local processing provides reliability during outages and keeps data private on-premises."
  }
];

const faqs = [
  {
    question: "Will my smart home work if the internet goes down?",
    answer: "It depends on your architecture. Local and hybrid systems continue local automation during outages. Cloud-only systems may lose functionality. Check your system type and ensure critical automations can run locally."
  },
  {
    question: "Are cloud-based smart home systems secure?",
    answer: "Reputable cloud providers implement strong security measures, but data does leave your home. Ensure you use strong passwords, enable two-factor authentication, and choose providers with good security track records. Consider what data you are comfortable sharing."
  },
  {
    question: "What happens to my smart home if the manufacturer goes out of business?",
    answer: "Cloud-dependent systems may stop working if servers are shut down. Local systems are more resilient as they do not depend on external services. Consider systems with local processing capabilities and open standards for long-term reliability."
  },
  {
    question: "Can I mix local and cloud devices in one system?",
    answer: "Yes, hybrid systems are designed for this. Many hubs can integrate both local devices (Zigbee, Z-Wave) and cloud-connected devices (Wi-Fi smart plugs), allowing flexibility in device selection."
  },
  {
    question: "How do I choose between local and cloud systems?",
    answer: "Consider your priorities: if reliability and privacy are paramount, lean towards local. If remote access and AI features are important, consider hybrid or cloud. Budget, technical ability, and specific use cases all factor into the decision."
  },
  {
    question: "Do local systems still allow remote access?",
    answer: "Many local systems can be configured for secure remote access through VPN connections or secure tunnelling. This provides remote capability while keeping processing local, though setup may be more complex than cloud-based remote access."
  }
];

const SmartHomeModule1Section4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 1 Section 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Smart Home Architectures
          </h1>
          <p className="text-white/80">
            Local, cloud, and hybrid systems for smart home automation
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Local:</strong> Fast, private, works offline</li>
              <li><strong>Cloud:</strong> Remote access, AI features, subscription costs</li>
              <li><strong>Hybrid:</strong> Best of both, most flexible</li>
              <li><strong>Choice:</strong> Based on reliability, privacy, features needed</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Hub location, internet dependency, data flow</li>
              <li><strong>Use:</strong> Architecture selection, client consultations</li>
              <li><strong>Apply:</strong> Matching architecture to client needs</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand local smart home architecture and its benefits",
              "Explain cloud-based system advantages and limitations",
              "Describe hybrid architecture combining local and cloud",
              "Compare architectures for different use cases",
              "Evaluate privacy and reliability considerations",
              "Recommend appropriate architecture based on client needs"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 1: Local Architecture */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Local Architecture
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Local architecture processes all automation on-premises using a hub or controller installed
              in the home. All device communication, rule processing, and automation execution happens
              locally without requiring internet connectivity.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Advantages</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Fast response times (no cloud latency)</li>
                  <li>Works during internet outages</li>
                  <li>Maximum privacy (data stays local)</li>
                  <li>No subscription fees typically</li>
                  <li>Not dependent on manufacturer servers</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-white mb-2">Disadvantages</p>
                <ul className="text-sm text-white space-y-1">
                  <li>More complex initial setup</li>
                  <li>Remote access requires additional config</li>
                  <li>Limited AI and voice assistant features</li>
                  <li>Requires more powerful local hardware</li>
                  <li>User responsible for updates and backups</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Examples of Local Systems:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Home Assistant:</strong> Open-source, highly customisable, runs on local hardware</li>
                <li><strong>Hubitat:</strong> Consumer-friendly local hub with Z-Wave/Zigbee support</li>
                <li><strong>OpenHAB:</strong> Java-based open platform for smart home integration</li>
                <li><strong>HomeSeer:</strong> Professional-grade local automation system</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Cloud Architecture */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Cloud Architecture
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Cloud architecture relies on remote servers to process automation rules, store data,
              and provide the interface between users and devices. Devices connect to the manufacturer's
              cloud service, and all processing happens externally.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Advantages</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Easy setup and configuration</li>
                  <li>Built-in remote access</li>
                  <li>Advanced AI and machine learning features</li>
                  <li>Automatic updates and maintenance</li>
                  <li>Integration with voice assistants</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-white mb-2">Disadvantages</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Requires constant internet connection</li>
                  <li>Privacy concerns (data on external servers)</li>
                  <li>Subscription fees may apply</li>
                  <li>Dependent on manufacturer staying in business</li>
                  <li>Higher latency for automation responses</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Examples of Cloud Systems:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Google Home:</strong> Cloud-based with strong AI integration</li>
                <li><strong>Amazon Alexa:</strong> Voice-first cloud platform</li>
                <li><strong>Apple HomeKit:</strong> Cloud-enabled with local execution option</li>
                <li><strong>Many Wi-Fi smart devices:</strong> Rely on manufacturer cloud services</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Hybrid Architecture */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Hybrid Architecture
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Hybrid architecture combines local processing with cloud connectivity, offering the
              benefits of both approaches. Critical automation runs locally for reliability, while
              cloud services provide remote access and advanced features.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">How Hybrid Systems Work:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Local hub processes time-critical automation</li>
                <li>Cloud provides remote access and voice control</li>
                <li>Critical functions work during internet outages</li>
                <li>AI features available when connected</li>
                <li>Data can be stored locally with cloud backup</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Best For</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Users wanting reliability and convenience</li>
                  <li>Homes with critical automation needs</li>
                  <li>Those requiring remote access</li>
                  <li>Integration of multiple ecosystems</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-white mb-2">Examples</p>
                <ul className="text-sm text-white space-y-1">
                  <li>SmartThings (local + cloud)</li>
                  <li>Home Assistant with cloud add-ons</li>
                  <li>Apple HomeKit ecosystem</li>
                  <li>Many professional systems</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Architecture Comparison */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Architecture Comparison
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Response Time Comparison:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Local:</strong> 10-50ms typical response</li>
                <li><strong>Hybrid:</strong> 10-100ms depending on function</li>
                <li><strong>Cloud:</strong> 100-500ms+ depending on connection</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Privacy Comparison:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Local:</strong> All data stays on-premises</li>
                <li><strong>Hybrid:</strong> Critical data local, some cloud sharing</li>
                <li><strong>Cloud:</strong> All data processed externally</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Reliability During Outages:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Local:</strong> Full functionality maintained</li>
                <li><strong>Hybrid:</strong> Local functions continue, cloud features unavailable</li>
                <li><strong>Cloud:</strong> Most or all functionality lost</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5: Choosing the Right Architecture */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Choosing the Right Architecture
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Choose Local When:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Privacy is the top priority</li>
                <li>Internet connectivity is unreliable</li>
                <li>Critical safety automation is involved</li>
                <li>Long-term independence from vendors is important</li>
                <li>Technical expertise is available for setup</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Choose Cloud When:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Easy setup is essential</li>
                <li>Voice assistant integration is primary use</li>
                <li>Remote access is frequently needed</li>
                <li>AI features are important</li>
                <li>Minimal technical maintenance is preferred</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Choose Hybrid When:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Balance of reliability and convenience is needed</li>
                <li>Some critical automation must work offline</li>
                <li>Remote access and voice control are desired</li>
                <li>Future expansion flexibility is important</li>
                <li>Budget allows for quality hub investment</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Consulting with Clients</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Ask about internet reliability in their area</li>
                <li>Discuss privacy concerns and data preferences</li>
                <li>Understand their technical comfort level</li>
                <li>Identify critical vs nice-to-have features</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Designing Systems</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Ensure critical automation can run locally</li>
                <li>Plan for graceful degradation during outages</li>
                <li>Document architecture decisions for future reference</li>
                <li>Consider long-term vendor viability</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Over-reliance on cloud</strong> - critical functions should work locally</li>
                <li><strong>Ignoring privacy concerns</strong> - discuss data handling with clients</li>
                <li><strong>No offline contingency</strong> - plan for internet outages</li>
                <li><strong>Vendor lock-in</strong> - consider open standards where possible</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Reference Card */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Architecture Summary</p>
                <ul className="space-y-0.5">
                  <li>Local: Private, fast, offline capable</li>
                  <li>Cloud: Easy, remote, AI features</li>
                  <li>Hybrid: Balanced, flexible</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Considerations</p>
                <ul className="space-y-0.5">
                  <li>Internet reliability</li>
                  <li>Privacy requirements</li>
                  <li>Technical expertise</li>
                  <li>Long-term vendor support</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-5">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default SmartHomeModule1Section4;
