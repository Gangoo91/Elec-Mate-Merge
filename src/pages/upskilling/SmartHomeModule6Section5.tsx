import { ArrowLeft, ArrowRight, AlertTriangle, CheckCircle, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Troubleshooting Ecosystem Conflicts";
const DESCRIPTION = "Diagnosing and resolving compatibility issues in multi-brand smart home systems";

const quickCheckQuestions = [
  {
    question: "What is the first step when troubleshooting a device that has stopped responding?",
    options: [
      "Replace the device immediately",
      "Check if the device is online and powered, then verify hub connectivity",
      "Reset all devices to factory settings",
      "Contact the manufacturer"
    ],
    correctAnswer: 1,
    explanation: "Start with the basics: verify the device has power, check if it shows as online in its app, and confirm the hub or bridge is connected. Most issues are resolved at this stage."
  },
  {
    question: "What might cause automation routines to stop working across multiple devices?",
    options: [
      "Individual device battery depletion",
      "Hub or cloud service outage affecting the automation engine",
      "Device firmware updates",
      "Room temperature changes"
    ],
    correctAnswer: 1,
    explanation: "When multiple devices are affected simultaneously, the issue is likely at the hub or cloud level. Check hub status, internet connectivity, and manufacturer service status pages."
  },
  {
    question: "Why is it important to keep manufacturer apps updated?",
    options: [
      "To change app colours",
      "Updates often fix bugs and improve compatibility with other systems",
      "To reduce battery usage",
      "To unlock paid features"
    ],
    correctAnswer: 1,
    explanation: "App and firmware updates frequently address compatibility issues, security vulnerabilities, and bugs. Outdated software is a common cause of integration problems."
  }
];

const quizQuestions = [
  {
    question: "What should you check if a Zigbee device is intermittently unresponsive?",
    options: [
      "Internet connection speed",
      "Zigbee mesh strength and router device placement",
      "Cloud subscription status",
      "Voice assistant settings"
    ],
    correctAnswer: 1,
    explanation: "Zigbee devices rely on mesh networking. Intermittent issues often indicate weak mesh coverage. Check that router devices (mains-powered) are positioned to provide good coverage to end devices."
  },
  {
    question: "What is a common cause of voice commands working but app control failing?",
    options: [
      "Speaker volume too low",
      "Voice assistant using different cloud path than app",
      "Device firmware outdated",
      "Room too cold"
    ],
    correctAnswer: 1,
    explanation: "Voice assistants may communicate with devices via different routes than manufacturer apps. If one works and not the other, investigate each communication path independently."
  },
  {
    question: "How can you isolate whether an issue is with a device or the hub?",
    options: [
      "Replace both simultaneously",
      "Test the device via its native app, bypassing the hub",
      "Wait 24 hours",
      "Contact the manufacturer"
    ],
    correctAnswer: 1,
    explanation: "Testing the device through its native app (bypassing the hub) helps isolate whether the problem is with the device itself or the hub integration. This determines where to focus troubleshooting."
  },
  {
    question: "What might cause two routines to conflict with each other?",
    options: [
      "Using different voice assistants",
      "Overlapping triggers or contradictory actions on the same device",
      "Different device brands",
      "Using Wi-Fi instead of Ethernet"
    ],
    correctAnswer: 1,
    explanation: "Routines can conflict if they have overlapping triggers (same time or event) with contradictory actions. For example, one turning lights on whilst another turns them off at the same time."
  },
  {
    question: "What is the best approach when a customer reports intermittent issues?",
    options: [
      "Tell them it's normal",
      "Document patterns, check logs, and identify common factors",
      "Replace all equipment",
      "Disable all automations"
    ],
    correctAnswer: 1,
    explanation: "Intermittent issues require systematic investigation. Document when issues occur, check hub and device logs, and look for patterns such as specific times, other device activity, or network congestion."
  }
];

const faqs = [
  {
    question: "Should I factory reset devices when troubleshooting?",
    answer: "Factory reset should be a last resort after other troubleshooting fails. It removes all configuration and may require re-pairing with hubs. Try power cycling, app updates, and re-linking accounts first."
  },
  {
    question: "How do I know if an issue is with my network or the smart home system?",
    answer: "Test non-smart devices on the same network. Check if multiple smart devices are affected. Use network diagnostic tools to verify connectivity. If other devices work fine, the issue is likely with the smart home system rather than the network."
  },
  {
    question: "What information should I collect before contacting manufacturer support?",
    answer: "Document: device model and firmware version, hub type and version, when the issue started, what troubleshooting you have tried, error messages or log entries, and whether the issue affects other devices."
  }
];

const SmartHomeModule6Section5 = () => {
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
          <span className="text-sm text-white">Section 5 of 5</span>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12 max-w-3xl mx-auto">
        {/* Centred Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-elec-yellow/10 border border-elec-yellow/30">
            <AlertTriangle className="h-4 w-4 text-elec-yellow" />
            <span className="text-sm font-medium text-elec-yellow">Voice Control and Hub Integration</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">{TITLE}</h1>
          <p className="text-lg text-white max-w-2xl mx-auto">{DESCRIPTION}</p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <h3 className="font-semibold text-white mb-1">Common Causes</h3>
            <p className="text-sm text-white">Network, firmware, configuration</p>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <h3 className="font-semibold text-white mb-1">Diagnostic Steps</h3>
            <p className="text-sm text-white">Systematic isolation process</p>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <h3 className="font-semibold text-white mb-1">Routine Conflicts</h3>
            <p className="text-sm text-white">Identifying automation clashes</p>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <h3 className="font-semibold text-white mb-1">Prevention</h3>
            <p className="text-sm text-white">Proactive maintenance practices</p>
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
                <span className="text-white">Identify common causes of smart home ecosystem conflicts</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span className="text-white">Apply systematic troubleshooting processes to isolate issues</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span className="text-white">Resolve automation routine conflicts and device communication issues</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span className="text-white">Implement preventive measures to reduce future conflicts</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Common Causes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Common Causes of Conflicts
          </h2>
          <div className="space-y-4 text-white">
            <div className="grid gap-4">
              <div className="bg-elec-gray/30 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-elec-yellow mb-2">Network Issues</h4>
                <p className="text-white text-sm">
                  Wi-Fi congestion, weak signal, router compatibility, IP address conflicts, or DNS problems can disrupt communication between devices, hubs, and cloud services.
                </p>
              </div>

              <div className="bg-elec-gray/30 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-elec-yellow mb-2">Firmware Incompatibility</h4>
                <p className="text-white text-sm">
                  Outdated firmware on devices, hubs, or bridges may cause integration issues. Conversely, new firmware updates can occasionally break existing integrations.
                </p>
              </div>

              <div className="bg-elec-gray/30 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-elec-yellow mb-2">Account and Authentication</h4>
                <p className="text-white text-sm">
                  Expired tokens, changed passwords, or account linking issues can disconnect devices from voice assistants or hub platforms.
                </p>
              </div>

              <div className="bg-elec-gray/30 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-elec-yellow mb-2">Cloud Service Outages</h4>
                <p className="text-white text-sm">
                  Manufacturer cloud services occasionally experience downtime, affecting device control and automations that rely on cloud connectivity.
                </p>
              </div>

              <div className="bg-elec-gray/30 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-elec-yellow mb-2">Mesh Network Problems</h4>
                <p className="text-white text-sm">
                  Zigbee and Z-Wave mesh networks can have coverage gaps, interference issues, or routing problems that cause intermittent device communication.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Systematic Troubleshooting */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Systematic Troubleshooting Process
          </h2>
          <div className="space-y-4 text-white">
            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Step 1: Define the Problem</h3>
              <ul className="space-y-2 text-white text-sm">
                <li>- What exactly is not working?</li>
                <li>- When did the issue start?</li>
                <li>- Is it affecting one device or multiple?</li>
                <li>- Is the issue consistent or intermittent?</li>
                <li>- What changed recently? (updates, new devices, network changes)</li>
              </ul>
            </div>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Step 2: Check the Basics</h3>
              <ul className="space-y-2 text-white text-sm">
                <li>- Device power: Is it on and powered?</li>
                <li>- Network connectivity: Is Wi-Fi/internet working?</li>
                <li>- Hub status: Is the hub online and responsive?</li>
                <li>- Cloud services: Check manufacturer status pages</li>
              </ul>
            </div>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Step 3: Isolate the Issue</h3>
              <ul className="space-y-2 text-white text-sm">
                <li>- Test device via native app (bypassing hub)</li>
                <li>- Test other devices on same hub</li>
                <li>- Test same device via different control method</li>
                <li>- Check logs for error messages</li>
              </ul>
            </div>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Step 4: Apply Fixes</h3>
              <ul className="space-y-2 text-white text-sm">
                <li>- Power cycle device and hub</li>
                <li>- Update firmware and apps</li>
                <li>- Re-link accounts if authentication issues</li>
                <li>- Rebuild mesh network if coverage issues</li>
                <li>- Factory reset as last resort</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Routine Conflicts */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Resolving Routine Conflicts
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Automation routines can conflict when they have overlapping triggers or contradictory actions. Identifying and resolving these conflicts requires systematic review.
            </p>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Common Conflict Types</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-white"><strong>Time overlap:</strong> Two routines triggered at the same time with different actions on the same device.</p>
                </div>
                <div>
                  <p className="text-white"><strong>Trigger overlap:</strong> Multiple routines responding to the same event (e.g., door unlock).</p>
                </div>
                <div>
                  <p className="text-white"><strong>State conflicts:</strong> One routine turns device on whilst another's condition expects it off.</p>
                </div>
                <div>
                  <p className="text-white"><strong>Loop creation:</strong> Routine A triggers Routine B which triggers Routine A.</p>
                </div>
              </div>
            </div>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Resolution Strategies</h3>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Audit all routines and document their triggers and actions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Stagger timing of routines that could overlap</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Add conditions to prevent unwanted triggering</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Consolidate overlapping routines into single comprehensive routine</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Test routines individually before combining</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Prevention */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Preventive Measures
          </h2>
          <div className="space-y-4 text-white">
            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Regular Maintenance</h3>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Keep all firmware and apps updated</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Monitor device battery levels for battery-powered devices</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Periodically verify all integrations are working</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Review and clean up unused routines</span>
                </li>
              </ul>
            </div>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Documentation</h3>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Maintain inventory of all devices and their integration method</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Document all routines with triggers and actions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Record account credentials securely</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Note any known issues or workarounds</span>
                </li>
              </ul>
            </div>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Customer Education</h3>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Explain importance of keeping apps updated</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Provide basic troubleshooting steps for common issues</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Explain how to check device and hub status</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Advise on when to contact you versus manufacturer support</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

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
            title="Troubleshooting Conflicts Quiz"
            questions={quizQuestions}
            courseId="smart-home-module-6"
            sectionId="section-5"
          />
        </section>

        {/* Module Completion */}
        <section className="mb-10">
          <div className="bg-gradient-to-br from-elec-yellow/20 to-amber-600/20 rounded-xl p-6 border border-elec-yellow/30">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-elec-yellow/20 flex items-center justify-center">
                <Award className="h-7 w-7 text-elec-yellow" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Module 6 Complete</h3>
                <p className="text-white">Voice Control and Hub Integration</p>
              </div>
            </div>
            <p className="text-white mb-4">
              Congratulations on completing Module 6! You have learned about smart home hubs, voice assistant integration, routine programming, legacy device bridging, and troubleshooting ecosystem conflicts.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                className="bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation"
                asChild
              >
                <Link to="/electrician/upskilling/smart-home-module-7">
                  Continue to Module 7
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 touch-manipulation"
                asChild
              >
                <Link to="/electrician/upskilling/smart-home-course">
                  Back to Course Overview
                </Link>
              </Button>
            </div>
          </div>
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
              Bridging and Legacy Devices
            </Link>
          </Button>
          <Button
            className="bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation"
            asChild
          >
            <Link to="/electrician/upskilling/smart-home-module-7">
              Module 7: Installation
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default SmartHomeModule6Section5;
