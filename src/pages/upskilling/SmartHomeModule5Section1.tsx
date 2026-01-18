import { ArrowLeft, ArrowRight, Lock, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Smart Locks and Keypads";
const DESCRIPTION = "Secure, flexible, and trackable access control systems for modern smart homes";

const quickCheckQuestions = [
  {
    question: "What is a key advantage of retrofit smart locks over full replacement models?",
    options: [
      "They offer better security",
      "They preserve the existing external lock appearance",
      "They are always cheaper",
      "They work without batteries"
    ],
    correctAnswer: 1,
    explanation: "Retrofit smart locks fit inside the door and work with the existing external cylinder, preserving the traditional appearance whilst adding smart functionality."
  },
  {
    question: "Why should temporary PIN codes have an expiry time?",
    options: [
      "To save battery power",
      "To reduce memory usage",
      "To prevent unauthorised access after the intended period",
      "To comply with Bluetooth standards"
    ],
    correctAnswer: 2,
    explanation: "Time-limited PIN codes ensure that access is automatically revoked after the intended period, preventing misuse by contractors or guests who no longer require entry."
  },
  {
    question: "What is the recommended backup for smart locks in case of power or connectivity failure?",
    options: [
      "Remote cloud access",
      "Voice assistant control",
      "Physical key override",
      "Bluetooth mesh"
    ],
    correctAnswer: 2,
    explanation: "A physical key override ensures that occupants can always gain entry even if batteries fail, Wi-Fi is down, or the smart system malfunctions."
  }
];

const quizQuestions = [
  {
    question: "Which smart lock type completely replaces the existing lock mechanism?",
    options: [
      "Retrofit lock",
      "Full replacement lock",
      "Keypad overlay",
      "Cylinder adapter"
    ],
    correctAnswer: 1,
    explanation: "Full replacement smart locks replace the entire lock mechanism with an integrated smart unit, often including a keypad or fingerprint reader."
  },
  {
    question: "What authentication method uses unique physical characteristics?",
    options: [
      "PIN codes",
      "RFID cards",
      "Biometric scanning",
      "Bluetooth proximity"
    ],
    correctAnswer: 2,
    explanation: "Biometric authentication uses unique physical characteristics such as fingerprints or facial recognition to verify identity."
  },
  {
    question: "What is the purpose of auto-lock functionality?",
    options: [
      "To save battery power",
      "To automatically secure the door after a set time",
      "To enable remote access",
      "To integrate with CCTV"
    ],
    correctAnswer: 1,
    explanation: "Auto-lock automatically engages the lock after a configurable time period, ensuring the door is secured even if the occupant forgets to lock it manually."
  },
  {
    question: "Which protocol allows local control without internet dependency?",
    options: [
      "Cloud API",
      "Z-Wave or Zigbee",
      "HTTPS",
      "SMS messaging"
    ],
    correctAnswer: 1,
    explanation: "Z-Wave and Zigbee protocols enable local mesh communication with a hub, allowing smart lock operation even without internet connectivity."
  },
  {
    question: "What should be verified before installing a smart lock on a fire door?",
    options: [
      "Battery capacity",
      "Colour matching",
      "Fire door certification compliance",
      "Voice assistant compatibility"
    ],
    correctAnswer: 2,
    explanation: "Smart locks on fire doors must maintain the door's fire rating and comply with building regulations. Some smart locks are not suitable for fire doors."
  }
];

const faqs = [
  {
    question: "Can smart locks be fitted to any door?",
    answer: "Most standard wooden and composite doors can accommodate smart locks, but door thickness, material, and existing cutouts must be checked. Fire doors, multipoint locking systems, and doors with non-standard dimensions may require specialist solutions or may not be suitable."
  },
  {
    question: "How long do smart lock batteries typically last?",
    answer: "Battery life varies by model and usage but typically ranges from 6 to 12 months on standard AA or CR123A batteries. Low battery warnings are sent via the app well in advance, and most locks include a physical key backup for emergencies."
  },
  {
    question: "Are smart locks secure against hacking?",
    answer: "Reputable smart locks use AES-128 or AES-256 encryption and secure authentication protocols. However, security depends on firmware updates, strong user passwords, and proper network configuration. Always choose locks with good security track records and keep firmware updated."
  }
];

const SmartHomeModule5Section1 = () => {
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
          <span className="text-sm text-white">Section 1 of 6</span>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12 max-w-3xl mx-auto">
        {/* Centred Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-elec-yellow/10 border border-elec-yellow/30">
            <Lock className="h-4 w-4 text-elec-yellow" />
            <span className="text-sm font-medium text-elec-yellow">Smart Security and Access Control</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">{TITLE}</h1>
          <p className="text-lg text-white max-w-2xl mx-auto">{DESCRIPTION}</p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <h3 className="font-semibold text-white mb-1">Lock Types</h3>
            <p className="text-sm text-white">Retrofit vs full replacement options</p>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <h3 className="font-semibold text-white mb-1">Authentication</h3>
            <p className="text-sm text-white">PIN, RFID, biometric, and app access</p>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <h3 className="font-semibold text-white mb-1">Integration</h3>
            <p className="text-sm text-white">Hub connectivity and automation</p>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <h3 className="font-semibold text-white mb-1">Best Practices</h3>
            <p className="text-sm text-white">Security, backup, and installation</p>
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
                <span className="text-white">Understand the differences between retrofit and full replacement smart locks</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span className="text-white">Compare authentication methods including PIN, RFID, biometric, and app-based access</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span className="text-white">Identify key features such as auto-lock, access logs, and temporary codes</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span className="text-white">Apply best practices for smart lock installation and security configuration</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Retrofit vs Full Replacement */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Retrofit vs Full Replacement Locks
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Smart locks come in two main configurations, each suited to different installation requirements and customer preferences.
            </p>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Retrofit Smart Locks</h3>
              <p className="text-white mb-3">
                Retrofit locks mount on the inside of the door and attach to the existing deadbolt or cylinder. The external appearance remains unchanged, which appeals to customers who want to maintain traditional aesthetics or comply with lease restrictions.
              </p>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Preserves existing external lock appearance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Simpler installation with no door modifications</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Physical key still works from outside</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Battery-powered with typical 6-12 month life</span>
                </li>
              </ul>
            </div>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Full Replacement Locks</h3>
              <p className="text-white mb-3">
                Full replacement locks replace the entire lock mechanism with an integrated smart unit. These typically include a keypad, touchscreen, or fingerprint reader on the exterior face.
              </p>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Integrated design with all components in one unit</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Built-in keypad or fingerprint reader</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>May require door modification for fit</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Often includes physical key backup cylinder</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Authentication Methods */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Authentication Methods
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Smart locks support various authentication methods, often combining multiple options for flexibility and security layering.
            </p>

            <div className="grid gap-4">
              <div className="bg-elec-gray/30 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-elec-yellow mb-2">PIN Codes</h4>
                <p className="text-white text-sm">
                  Numeric codes entered via keypad. Support permanent codes for household members and temporary time-limited codes for guests or contractors. Most systems allow 10-50 unique codes with activity logging.
                </p>
              </div>

              <div className="bg-elec-gray/30 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-elec-yellow mb-2">RFID and NFC</h4>
                <p className="text-white text-sm">
                  Contactless cards, fobs, or smartphone NFC for tap-to-unlock access. Useful for users who prefer not to remember codes. Cards can be individually registered and revoked.
                </p>
              </div>

              <div className="bg-elec-gray/30 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-elec-yellow mb-2">Biometric</h4>
                <p className="text-white text-sm">
                  Fingerprint readers provide secure, personal authentication. Multiple fingerprints can be enrolled per user. Not recommended as sole access method due to potential sensor failures.
                </p>
              </div>

              <div className="bg-elec-gray/30 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-elec-yellow mb-2">Smartphone App</h4>
                <p className="text-white text-sm">
                  Bluetooth proximity unlock or manual app control. Enables remote unlocking for visitors and real-time notifications. Requires phone battery and app connectivity.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Key Features */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Key Smart Lock Features
          </h2>
          <div className="space-y-4 text-white">
            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Auto-Lock</h3>
              <p className="text-white">
                Automatically engages the lock after a configurable time period (typically 30 seconds to 5 minutes). Ensures security even when occupants forget to lock manually. Some models include door sensor confirmation to prevent locking when the door is ajar.
              </p>
            </div>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Access Logs</h3>
              <p className="text-white">
                Records timestamped entries showing which code or user unlocked the door. Valuable for monitoring contractor access, children arriving home, or investigating security incidents. Logs typically stored locally and in the cloud.
              </p>
            </div>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Temporary Access Codes</h3>
              <p className="text-white">
                Time-limited codes that automatically expire after a set period or number of uses. Ideal for Airbnb hosts, cleaners, or tradespeople. Eliminates the need to share permanent codes or physical keys.
              </p>
            </div>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Integration and Automation</h3>
              <p className="text-white">
                Connect with smart home hubs for automation scenes. Examples include unlocking triggering lights and disarming alarms, or locking activating night mode. Integration via Z-Wave, Zigbee, or proprietary bridges.
              </p>
            </div>
          </div>
        </section>

        {/* Installation Best Practices */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Installation Best Practices
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Professional installation ensures optimal security and reliability. Key considerations include:
            </p>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-elec-yellow font-semibold">1.</span>
                  <span><strong>Door Assessment:</strong> Check door thickness (typically 35-70mm supported), material, and existing cutouts. Verify the door closes and latches correctly without binding.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-elec-yellow font-semibold">2.</span>
                  <span><strong>Fire Door Compliance:</strong> Verify the lock maintains fire door certification if applicable. Not all smart locks are suitable for fire doors.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-elec-yellow font-semibold">3.</span>
                  <span><strong>Physical Key Backup:</strong> Always ensure a physical key override is available and test it before completing installation.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-elec-yellow font-semibold">4.</span>
                  <span><strong>Wi-Fi Signal:</strong> Check signal strength at the door location. Weak signals cause connectivity issues and delayed notifications.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-elec-yellow font-semibold">5.</span>
                  <span><strong>Battery Access:</strong> Ensure batteries can be easily replaced without removing the lock from the door.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Security Configuration */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Security Configuration
          </h2>
          <div className="space-y-4 text-white">
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <p className="text-white">
                <strong>Important:</strong> Smart locks are only as secure as their configuration. Always guide customers through proper security setup.
              </p>
            </div>

            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-elec-yellow">-</span>
                <span>Enable two-factor authentication on the associated app account</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-elec-yellow">-</span>
                <span>Use strong, unique passwords for cloud accounts</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-elec-yellow">-</span>
                <span>Disable unused authentication methods (e.g., turn off Bluetooth if only using Wi-Fi)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-elec-yellow">-</span>
                <span>Set wrong code lockout after multiple failed attempts</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-elec-yellow">-</span>
                <span>Keep firmware updated for security patches</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-elec-yellow">-</span>
                <span>Review and revoke temporary codes promptly after use</span>
              </li>
            </ul>
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
            title="Smart Locks and Keypads Quiz"
            questions={quizQuestions}
            courseId="smart-home-module-5"
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
            <Link to="/electrician/upskilling/smart-home-module-5">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            className="bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation"
            asChild
          >
            <Link to="../section-2">
              CCTV Types and Storage
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default SmartHomeModule5Section1;
