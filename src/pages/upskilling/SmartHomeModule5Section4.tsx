import { ArrowLeft, ArrowRight, Smartphone, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Remote Access and Alerts";
const DESCRIPTION = "Monitor and control smart home security systems from anywhere via mobile apps";

const quickCheckQuestions = [
  {
    question: "What enables homeowners to control their security system whilst away from home?",
    options: [
      "Local Bluetooth connection",
      "Cloud connectivity and mobile app",
      "Landline telephone",
      "Physical key fob"
    ],
    correctAnswer: 1,
    explanation: "Remote access relies on cloud connectivity that bridges the home network to internet-accessible servers, allowing mobile apps to communicate with the security system from anywhere."
  },
  {
    question: "What type of notification would a smart lock send when a cleaner uses their temporary code?",
    options: [
      "System error alert",
      "Push notification with user identification and timestamp",
      "Silent log entry only",
      "Audio alarm"
    ],
    correctAnswer: 1,
    explanation: "Smart locks send push notifications identifying which code was used and when, allowing homeowners to verify expected access such as cleaners or tradespeople arriving."
  },
  {
    question: "What is a key risk of remote access functionality?",
    options: [
      "Increased battery consumption",
      "Potential unauthorised access if credentials are compromised",
      "Slower local response times",
      "Higher equipment costs"
    ],
    correctAnswer: 1,
    explanation: "Remote access creates an attack surface where compromised passwords or weak security could allow unauthorised users to control the system, making strong credentials and 2FA essential."
  }
];

const quizQuestions = [
  {
    question: "What is required for remote access to function?",
    options: [
      "Bluetooth connection",
      "Working internet connection at the property",
      "Landline telephone",
      "Direct radio link"
    ],
    correctAnswer: 1,
    explanation: "Remote access requires a working internet connection at the property to communicate with cloud servers, which then relay commands and notifications to mobile apps."
  },
  {
    question: "What feature allows users to see live camera feeds from their phone?",
    options: [
      "Local storage playback",
      "Remote streaming via cloud or P2P",
      "Bluetooth video transfer",
      "SMS image delivery"
    ],
    correctAnswer: 1,
    explanation: "Live viewing uses either cloud streaming or peer-to-peer (P2P) connections to deliver real-time video from cameras to the mobile app over the internet."
  },
  {
    question: "What does 2FA stand for in security contexts?",
    options: [
      "Two-Factor Authentication",
      "Two-Form Access",
      "Twice-Filtered Authorisation",
      "Twin-File Attachment"
    ],
    correctAnswer: 0,
    explanation: "Two-Factor Authentication requires two different types of verification (e.g., password plus phone code) before granting access, significantly improving security."
  },
  {
    question: "What should happen if internet connectivity is lost?",
    options: [
      "All sensors stop working",
      "Local hub continues operating and stores events for later sync",
      "System completely disarms",
      "Cameras delete all footage"
    ],
    correctAnswer: 1,
    explanation: "Well-designed systems maintain local operation during internet outages. The hub continues monitoring sensors and storing events, syncing to the cloud when connectivity returns."
  },
  {
    question: "What is the purpose of activity logs in security apps?",
    options: [
      "To use more storage space",
      "To provide historical record of all system events and access",
      "To slow down the system",
      "To increase battery usage"
    ],
    correctAnswer: 1,
    explanation: "Activity logs provide a timestamped record of all events including sensor triggers, arm/disarm actions, and user access, valuable for security review and incident investigation."
  }
];

const faqs = [
  {
    question: "What happens if my internet goes down?",
    answer: "The local hub continues operating sensors and can trigger local sirens. You will lose remote access and notifications until connectivity returns. Events are logged locally and sync when internet is restored. Some systems include mobile data backup SIMs."
  },
  {
    question: "Can someone hack into my security system remotely?",
    answer: "Risk exists but can be minimised with strong, unique passwords, two-factor authentication, regular firmware updates, and choosing reputable manufacturers with good security track records. Avoid default passwords and use separate email accounts for security systems."
  },
  {
    question: "How much mobile data does remote viewing use?",
    answer: "Live video streaming typically uses 1-3 GB per hour depending on resolution and compression. Motion clips and thumbnails use less. Monitor data usage if on a limited mobile plan, and use Wi-Fi viewing when possible."
  }
];

const SmartHomeModule5Section4 = () => {
  useSEO({
    title: `${TITLE} | Smart Home Module 5`,
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
            <Link to="/electrician/upskilling/smart-home-module-5">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <span className="text-sm text-white">Section 4 of 6</span>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12 max-w-3xl mx-auto">
        {/* Centred Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-elec-yellow/10 border border-elec-yellow/30">
            <Smartphone className="h-4 w-4 text-elec-yellow" />
            <span className="text-sm font-medium text-elec-yellow">Smart Security and Access Control</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">{TITLE}</h1>
          <p className="text-lg text-white max-w-2xl mx-auto">{DESCRIPTION}</p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <h3 className="font-semibold text-white mb-1">Remote Access</h3>
            <p className="text-sm text-white">Control from anywhere via cloud</p>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <h3 className="font-semibold text-white mb-1">Push Notifications</h3>
            <p className="text-sm text-white">Instant alerts for events</p>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <h3 className="font-semibold text-white mb-1">Live Viewing</h3>
            <p className="text-sm text-white">Stream cameras remotely</p>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <h3 className="font-semibold text-white mb-1">Security Risks</h3>
            <p className="text-sm text-white">Authentication and encryption</p>
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
                <span className="text-white">Explain how cloud connectivity enables remote system access</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span className="text-white">Describe push notification types and their practical applications</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span className="text-white">Understand remote monitoring capabilities including live viewing and playback</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span className="text-white">Identify security risks and apply best practices for remote access configuration</span>
              </li>
            </ul>
          </div>
        </section>

        {/* How Remote Access Works */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            How Remote Access Works
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Remote access bridges the gap between local smart home systems and mobile devices anywhere in the world. Understanding the architecture helps electricians explain capabilities and limitations to customers.
            </p>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Connection Architecture</h3>
              <ol className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-elec-yellow font-semibold">1.</span>
                  <span><strong>Local Hub:</strong> The central controller connects to the home router via Ethernet or Wi-Fi, communicating with all local sensors and devices.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-elec-yellow font-semibold">2.</span>
                  <span><strong>Cloud Server:</strong> The hub maintains a persistent connection to manufacturer cloud servers, relaying status and receiving commands.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-elec-yellow font-semibold">3.</span>
                  <span><strong>Mobile App:</strong> The smartphone app connects to the same cloud servers, enabling two-way communication with the home system.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-elec-yellow font-semibold">4.</span>
                  <span><strong>Push Services:</strong> Cloud servers use Apple Push Notification Service (APNS) or Firebase Cloud Messaging (FCM) to deliver instant alerts.</span>
                </li>
              </ol>
            </div>

            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 p-4 rounded-r-lg">
              <p className="text-white">
                <strong>Key point:</strong> The home requires a working internet connection for remote access. If broadband fails, local operation continues but remote control and notifications are unavailable until connectivity returns.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Push Notifications */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Push Notifications and Alerts
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Push notifications provide immediate awareness of security events, enabling rapid response whether at home or away.
            </p>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Common Notification Types</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-elec-yellow text-sm">Alarm Events</h4>
                  <p className="text-white text-sm">
                    Immediate alerts when sensors trigger whilst armed: "Front door opened - System Armed" or "Motion detected in Hallway"
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-elec-yellow text-sm">Access Notifications</h4>
                  <p className="text-white text-sm">
                    Smart lock activity: "Front door unlocked by John's code at 15:42" or "Cleaner code used - valid until 17:00"
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-elec-yellow text-sm">System Status</h4>
                  <p className="text-white text-sm">
                    Arm/disarm confirmations, low battery warnings, offline device alerts, and firmware update notifications
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-elec-yellow text-sm">Video Alerts</h4>
                  <p className="text-white text-sm">
                    Motion-triggered clips from cameras with thumbnail previews, doorbell press notifications with live view option
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Notification Configuration</h3>
              <p className="text-white">
                Help customers configure appropriate notification levels to avoid alert fatigue whilst maintaining security awareness:
              </p>
              <ul className="space-y-2 text-white mt-2">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Enable critical alerts (alarms) as immediate push notifications</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Set routine events (arm/disarm) to silent log only if preferred</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Use motion zones to reduce unnecessary camera alerts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Enable multiple user accounts for household members</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Remote Monitoring and Control */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Remote Monitoring and Control
          </h2>
          <div className="space-y-4 text-white">
            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Live Camera Viewing</h3>
              <p className="text-white mb-3">
                Stream real-time video from any camera to check on the property, verify alerts, or monitor deliveries and visitors.
              </p>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>View single camera or multi-camera grid layouts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Two-way audio for communication with visitors</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>PTZ control for cameras with pan/tilt/zoom capability</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Manual recording trigger during live viewing</span>
                </li>
              </ul>
            </div>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Remote Control Functions</h3>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span><strong>Arm/Disarm:</strong> Change system mode remotely - useful for letting in expected visitors</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span><strong>Lock Control:</strong> Lock or unlock smart locks, grant temporary access codes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span><strong>Siren Activation:</strong> Trigger sirens manually in emergency or to deter intruders</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span><strong>Scene Activation:</strong> Trigger lighting scenes or automation routines</span>
                </li>
              </ul>
            </div>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Activity Logs and History</h3>
              <p className="text-white">
                Comprehensive logs record all system activity with timestamps, enabling historical review:
              </p>
              <ul className="space-y-2 text-white mt-2">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Sensor activation history</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Arm/disarm events with user identification</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Lock access records showing which code was used</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Video clips linked to motion events</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Security Risks */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Security Risks and Mitigation
          </h2>
          <div className="space-y-4 text-white">
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <p className="text-white">
                <strong>Important:</strong> Remote access creates potential attack vectors. Proper security configuration is essential to protect against unauthorised access.
              </p>
            </div>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Primary Risks</h3>
              <ul className="space-y-3">
                <li>
                  <strong className="text-elec-yellow">Credential Compromise:</strong>
                  <span className="text-white"> Weak or reused passwords allow attackers to gain full system control.</span>
                </li>
                <li>
                  <strong className="text-elec-yellow">Man-in-the-Middle:</strong>
                  <span className="text-white"> Unencrypted connections can be intercepted to capture credentials or video streams.</span>
                </li>
                <li>
                  <strong className="text-elec-yellow">Vendor Breaches:</strong>
                  <span className="text-white"> Cloud server compromises at manufacturer level can expose user data.</span>
                </li>
                <li>
                  <strong className="text-elec-yellow">Malicious Apps:</strong>
                  <span className="text-white"> Fake or compromised apps can steal credentials or install malware.</span>
                </li>
              </ul>
            </div>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Security Best Practices</h3>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Use strong, unique passwords for security system accounts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Enable two-factor authentication (2FA) on all accounts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Keep firmware and app versions updated</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Only download apps from official app stores</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Use separate email address for security system registration</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Review and revoke access for devices no longer in use</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Choose manufacturers with strong security reputations</span>
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
            title="Remote Access and Alerts Quiz"
            questions={quizQuestions}
            courseId="smart-home-module-5"
            sectionId="section-4"
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            className="text-white hover:text-elec-yellow hover:bg-transparent touch-manipulation"
            asChild
          >
            <Link to="../section-3">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Contact Sensors and PIR
            </Link>
          </Button>
          <Button
            className="bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation"
            asChild
          >
            <Link to="../section-5">
              Lighting and Emergency Scenes
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default SmartHomeModule5Section4;
