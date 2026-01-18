import { ArrowLeft, ArrowRight, Settings, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Commissioning and Device Pairing";
const DESCRIPTION = "Learn systematic commissioning procedures and device pairing techniques for reliable smart home system operation.";

const quickCheckQuestions = [
  {
    question: "What should be the first step when commissioning a smart home system?",
    options: ["Pair all devices immediately", "Verify network connectivity and infrastructure", "Install the control app", "Configure automation routines"],
    correctIndex: 1,
    explanation: "Verifying network connectivity and infrastructure ensures a stable foundation before attempting to pair devices, preventing connection issues later."
  },
  {
    question: "What is 'pairing mode' on a smart device?",
    options: ["A diagnostic self-test", "A state where the device broadcasts its presence for discovery", "Power saving mode", "A security lockout"],
    correctIndex: 1,
    explanation: "Pairing mode is when a device broadcasts its identity to be discovered by the hub or controller, allowing it to join the smart home network."
  },
  {
    question: "Why is it important to commission devices one at a time rather than all together?",
    options: ["To save battery power", "To avoid network congestion and ensure each device pairs correctly", "It takes less time", "The hub cannot handle multiple devices"],
    correctIndex: 1,
    explanation: "Commissioning devices individually prevents confusion, allows verification of each device's operation, and avoids potential pairing conflicts on the network."
  }
];

const quizQuestions = [
  {
    question: "What documentation should you prepare before starting the commissioning process?",
    options: [
      "Only the invoice for the customer",
      "Device list, network credentials, hub access details, and room assignments",
      "Just the user manuals",
      "The electrical installation certificate only"
    ],
    correctIndex: 1,
    explanation: "Having the device list, network credentials, hub access, and room assignments prepared ensures efficient commissioning without delays searching for information."
  },
  {
    question: "When a Z-Wave device fails to pair, what is the recommended first troubleshooting step?",
    options: [
      "Replace the device immediately",
      "Perform an exclusion process before attempting to pair again",
      "Move the hub to a different location",
      "Factory reset the entire system"
    ],
    correctIndex: 1,
    explanation: "Z-Wave devices may retain previous network information. Running an exclusion process clears this data, allowing successful pairing to a new network."
  },
  {
    question: "What is the purpose of device naming conventions during commissioning?",
    options: [
      "To personalise the system for the customer",
      "To enable clear identification for automation and troubleshooting",
      "To comply with regulations",
      "To reduce app loading time"
    ],
    correctIndex: 1,
    explanation: "Consistent naming conventions (e.g., 'Kitchen Light - Pendant') enable clear identification in automation rules and simplify troubleshooting."
  },
  {
    question: "After pairing a smart switch, what verification should you perform?",
    options: [
      "Check the warranty card",
      "Test on/off operation both locally and remotely through the app",
      "Only verify the LED indicator",
      "Wait 24 hours before testing"
    ],
    correctIndex: 1,
    explanation: "Testing both local (physical switch) and remote (app) operation confirms the device is fully functional and properly communicating with the system."
  },
  {
    question: "What is mesh network healing in the context of Z-Wave or Zigbee commissioning?",
    options: [
      "Repairing broken devices",
      "The process where devices optimise their communication routes",
      "Connecting devices to the internet",
      "Updating device firmware"
    ],
    correctIndex: 1,
    explanation: "Mesh network healing is when devices automatically discover optimal communication routes, improving reliability. It typically occurs overnight or can be manually triggered."
  }
];

const faqs = [
  {
    question: "How long should I wait for mesh network healing after commissioning?",
    answer: "Allow 24-48 hours for the mesh network to fully optimise. During this time, devices discover the best communication routes. Avoid making major changes to device positions during this period. If issues persist after 48 hours, consider adding repeater devices or repositioning the hub."
  },
  {
    question: "Can I commission devices using multiple apps simultaneously?",
    answer: "This is generally not recommended. Use a single primary app or hub for initial commissioning to avoid confusion and conflicts. Once devices are commissioned, they can often be controlled by multiple platforms (e.g., Apple HomeKit, Google Home) through bridges or integrations."
  },
  {
    question: "What should I do if a device keeps dropping offline after commissioning?",
    answer: "First check signal strength at the device location. For wireless devices, ensure the mesh network has adequate repeaters. Verify power supply stability and check for interference sources. Review firmware versions and update if available. If problems persist, the device may be faulty or incompatible."
  }
];

const SmartHomeModule7Section2 = () => {
  useSEO({
    title: `${TITLE} | Smart Home Module 7`,
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
          <span className="text-sm text-white">Section 2 of 6</span>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12 max-w-3xl mx-auto">
        {/* Centered Title Header */}
        <header className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Settings className="h-10 w-10 text-elec-yellow" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {TITLE}
          </h1>
          <p className="text-white text-lg max-w-2xl mx-auto">
            {DESCRIPTION}
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <h3 className="font-semibold text-white mb-1">Key Principle</h3>
            <p className="text-white text-sm">Systematic approach ensures reliable device integration</p>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <h3 className="font-semibold text-white mb-1">Time Investment</h3>
            <p className="text-white text-sm">Thorough commissioning prevents callbacks and customer issues</p>
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
              "Follow a systematic commissioning procedure for smart home systems",
              "Successfully pair devices using various protocols (Z-Wave, Zigbee, Wi-Fi)",
              "Implement consistent device naming and organisation strategies",
              "Verify device functionality through comprehensive testing procedures"
            ].map((outcome, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span className="text-white">{outcome}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Pre-Commissioning Preparation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Pre-Commissioning Preparation
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Successful commissioning begins with thorough preparation. Gather all necessary
              information and verify infrastructure before starting the device pairing process.
            </p>
            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 p-4 rounded-r-lg">
              <h4 className="font-semibold text-white mb-2">Pre-Commissioning Checklist</h4>
              <ul className="list-disc list-inside space-y-1 text-white">
                <li>Verify Wi-Fi network is operational with adequate coverage</li>
                <li>Confirm hub is powered and connected to the network</li>
                <li>Prepare device inventory list with serial numbers</li>
                <li>Create room/zone naming scheme with customer</li>
                <li>Have manufacturer apps and accounts ready</li>
                <li>Ensure physical installation is complete and tested</li>
              </ul>
            </div>
            <h4 className="font-semibold text-white">Network Verification</h4>
            <p>
              Test Wi-Fi signal strength in all device locations using a smartphone or dedicated
              app. Document any weak areas requiring access points or mesh extenders. For Z-Wave
              and Zigbee systems, plan device commissioning order to build a strong mesh network
              from the hub outward.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Device Pairing Procedures */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Device Pairing by Protocol
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Different wireless protocols have distinct pairing procedures. Understanding
              these differences ensures efficient commissioning regardless of device type.
            </p>
            <div className="grid gap-4">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h5 className="font-medium text-elec-yellow mb-2">Z-Wave Pairing</h5>
                <ol className="list-decimal list-inside space-y-1 text-white text-sm">
                  <li>Put hub into inclusion mode via app or controller</li>
                  <li>Activate pairing mode on device (usually triple-press or hold button)</li>
                  <li>Wait for hub to discover and add device</li>
                  <li>If unsuccessful, run exclusion first then retry inclusion</li>
                  <li>Commission mains-powered devices first to build mesh</li>
                </ol>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h5 className="font-medium text-elec-yellow mb-2">Zigbee Pairing</h5>
                <ol className="list-decimal list-inside space-y-1 text-white text-sm">
                  <li>Enable permit join on the coordinator/hub</li>
                  <li>Reset device or put into pairing mode</li>
                  <li>Device should appear in hub within 60 seconds</li>
                  <li>For stubborn devices, move closer to hub temporarily</li>
                  <li>Router devices strengthen mesh, commission these first</li>
                </ol>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h5 className="font-medium text-elec-yellow mb-2">Wi-Fi Device Pairing</h5>
                <ol className="list-decimal list-inside space-y-1 text-white text-sm">
                  <li>Download manufacturer app and create account</li>
                  <li>Put device in setup mode (often indicated by flashing LED)</li>
                  <li>Follow app instructions to connect device to network</li>
                  <li>Ensure phone is on 2.4GHz band if device requires it</li>
                  <li>Link to smart home platform (Alexa, Google, HomeKit)</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Device Organisation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Device Naming and Organisation
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Consistent naming conventions make systems easier to manage, troubleshoot,
              and explain to customers. Establish a naming scheme before commissioning.
            </p>
            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 p-4 rounded-r-lg">
              <h4 className="font-semibold text-white mb-2">Recommended Naming Format</h4>
              <p className="text-white mb-2">
                Use format: <span className="font-mono bg-black/30 px-2 py-1 rounded">Room - Device Type - Location</span>
              </p>
              <ul className="list-disc list-inside space-y-1 text-white text-sm">
                <li>Kitchen - Light - Island</li>
                <li>Living Room - Blind - Bay Window</li>
                <li>Master Bedroom - Socket - Bedside Left</li>
                <li>Hallway - Sensor - Motion Upstairs</li>
              </ul>
            </div>
            <h4 className="font-semibold text-white">Room and Zone Assignment</h4>
            <p>
              Group devices by room immediately after pairing. This enables room-based
              voice commands ("Turn off the kitchen") and simplifies automation setup.
              Consider creating zones for multi-room control (e.g., "Downstairs", "All Lights").
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Testing and Verification */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Testing and Verification
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Every commissioned device requires thorough testing before handover.
              Document test results as part of the commissioning record.
            </p>
            <h4 className="font-semibold text-white">Device Test Procedure</h4>
            <div className="grid gap-3">
              <div className="flex gap-3 items-start">
                <span className="font-medium text-elec-yellow min-w-[100px]">Switches:</span>
                <span className="text-white">Test physical operation, app control, voice command response</span>
              </div>
              <div className="flex gap-3 items-start">
                <span className="font-medium text-elec-yellow min-w-[100px]">Sensors:</span>
                <span className="text-white">Trigger sensor, verify status update in app, test automation response</span>
              </div>
              <div className="flex gap-3 items-start">
                <span className="font-medium text-elec-yellow min-w-[100px]">Thermostats:</span>
                <span className="text-white">Verify temperature reading, test setpoint changes, confirm heating/cooling response</span>
              </div>
              <div className="flex gap-3 items-start">
                <span className="font-medium text-elec-yellow min-w-[100px]">Blinds:</span>
                <span className="text-white">Test open, close, and percentage positions via app and manual control</span>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h5 className="font-medium text-elec-yellow mb-2">Communication Testing</h5>
              <p className="text-white text-sm">
                For each device, verify response time is acceptable (under 2 seconds for local
                control, under 5 seconds for cloud-dependent devices). Test from multiple locations
                within the property to confirm consistent connectivity.
              </p>
            </div>
          </div>
        </section>

        {/* Troubleshooting Common Issues */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Troubleshooting Common Pairing Issues
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Even with proper procedures, pairing issues occur. Understanding common
              problems and solutions enables efficient troubleshooting.
            </p>
            <div className="grid gap-4">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h5 className="font-medium text-elec-yellow mb-2">Device Not Discovered</h5>
                <ul className="list-disc list-inside space-y-1 text-white text-sm">
                  <li>Verify device is in pairing mode (check LED status)</li>
                  <li>Move device closer to hub temporarily</li>
                  <li>For Z-Wave: run exclusion process first</li>
                  <li>Check device is compatible with hub/system</li>
                  <li>Factory reset device and retry</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h5 className="font-medium text-elec-yellow mb-2">Wi-Fi Device Connection Failure</h5>
                <ul className="list-disc list-inside space-y-1 text-white text-sm">
                  <li>Confirm device supports 2.4GHz (most do not support 5GHz)</li>
                  <li>Check Wi-Fi password entered correctly</li>
                  <li>Ensure phone is on same network as device will connect to</li>
                  <li>Disable mobile data temporarily during setup</li>
                  <li>Verify router allows new device connections</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h5 className="font-medium text-elec-yellow mb-2">Intermittent Connectivity</h5>
                <ul className="list-disc list-inside space-y-1 text-white text-sm">
                  <li>Check mesh network coverage (add repeaters if needed)</li>
                  <li>Look for interference sources (microwave, 2.4GHz cordless phones)</li>
                  <li>Verify power supply stability</li>
                  <li>Update device firmware</li>
                  <li>Allow mesh network healing time (24-48 hours)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Knowledge Check
          </h2>
          <Quiz questions={quizQuestions} />
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">08</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-semibold text-elec-yellow mb-2">{faq.question}</h4>
                <p className="text-white text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
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
              Previous: Device Wiring
            </Link>
          </Button>
          <Button
            className="bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation"
            asChild
          >
            <Link to="../section-3">
              Next: Wi-Fi and RF Verification
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default SmartHomeModule7Section2;
