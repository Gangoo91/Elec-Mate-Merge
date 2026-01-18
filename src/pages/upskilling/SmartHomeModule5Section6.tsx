import { ArrowLeft, ArrowRight, Shield, CheckCircle, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Network Security and User Privacy";
const DESCRIPTION = "Securing smart home networks and protecting user data from cyber threats";

const quickCheckQuestions = [
  {
    question: "Why should IoT devices be on a separate network from main computers and phones?",
    options: [
      "To improve Wi-Fi speed for streaming",
      "To isolate vulnerable devices and limit breach impact",
      "To reduce electricity usage",
      "To make setup easier"
    ],
    correctAnswer: 1,
    explanation: "Network segmentation isolates IoT devices from sensitive devices like computers and phones. If an IoT device is compromised, the attacker cannot easily access banking details or personal files on other devices."
  },
  {
    question: "What is the primary privacy risk of cloud-connected smart home devices?",
    options: [
      "Increased electricity bills",
      "Data collection and potential third-party access to personal information",
      "Slower device response times",
      "Higher purchase costs"
    ],
    correctAnswer: 1,
    explanation: "Cloud-connected devices often collect usage data, voice recordings, or video footage that is stored on manufacturer servers. This data may be accessed by the company, shared with partners, or vulnerable to breaches."
  },
  {
    question: "What should electricians recommend for router security?",
    options: [
      "Using the default password for convenience",
      "Disabling all encryption",
      "Using WPA3 encryption with a strong, unique password",
      "Leaving the network open for easier setup"
    ],
    correctAnswer: 2,
    explanation: "WPA3 encryption (or WPA2 if WPA3 unavailable) with a strong, unique password provides essential protection against unauthorised network access and eavesdropping on smart home traffic."
  }
];

const quizQuestions = [
  {
    question: "What does VLAN stand for?",
    options: [
      "Virtual Local Area Network",
      "Variable Lighting and Network",
      "Voice Link Access Node",
      "Verified Login Authentication Network"
    ],
    correctAnswer: 0,
    explanation: "VLAN stands for Virtual Local Area Network. VLANs allow network segmentation on a single physical network, keeping IoT devices isolated from sensitive data on computers and phones."
  },
  {
    question: "Why is firmware updating important for smart home devices?",
    options: [
      "To change the device colour",
      "To patch security vulnerabilities and improve functionality",
      "To increase power consumption",
      "To void the warranty"
    ],
    correctAnswer: 1,
    explanation: "Firmware updates patch security vulnerabilities discovered after manufacture, fix bugs, and may add new features. Keeping devices updated is essential for maintaining security."
  },
  {
    question: "What is the risk of using devices from manufacturers with poor security track records?",
    options: [
      "Lower purchase price",
      "Vulnerabilities may never be patched, leaving devices exposed",
      "Better aesthetics",
      "Faster setup"
    ],
    correctAnswer: 1,
    explanation: "Manufacturers with poor security records may not issue timely patches, may use weak encryption, or may have insecure cloud infrastructure, leaving devices permanently vulnerable."
  },
  {
    question: "What is end-to-end encryption?",
    options: [
      "Encrypting only the first data packet",
      "Data encrypted from source to destination, unreadable in transit",
      "Encryption used only at night",
      "A type of Wi-Fi protocol"
    ],
    correctAnswer: 1,
    explanation: "End-to-end encryption ensures data is encrypted from the sending device to the receiving device, meaning even the service provider cannot read the data in transit."
  },
  {
    question: "What role should electricians play in smart home security?",
    options: [
      "None - security is not their concern",
      "Advising customers on basic security practices and secure configuration",
      "Hacking into the system to test it",
      "Installing antivirus software"
    ],
    correctAnswer: 1,
    explanation: "Electricians should advise customers on basic security practices including strong passwords, network segmentation, and firmware updates, and ensure devices are configured securely during installation."
  }
];

const faqs = [
  {
    question: "Should I recommend specific smart home brands for security?",
    answer: "Recommend established brands with good security track records, regular firmware updates, clear privacy policies, and support for local control without mandatory cloud connectivity. Research recent security audits and vulnerability disclosures before recommending specific products."
  },
  {
    question: "What if a customer refuses to change default passwords?",
    answer: "Document your recommendation in writing and explain the risks clearly. Ultimately the customer decides, but ensure they understand the potential consequences. Consider including basic security setup as part of your standard installation service."
  },
  {
    question: "Are voice assistants a security risk?",
    answer: "Voice assistants can be security and privacy risks as they continuously listen for wake words and may send audio to cloud servers for processing. Advise customers to review privacy settings, consider muting when not needed, and understand what data is collected and stored."
  }
];

const SmartHomeModule5Section6 = () => {
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
            <Link to="..">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <span className="text-sm text-white">Section 6 of 6</span>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12 max-w-3xl mx-auto">
        {/* Centred Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-elec-yellow/10 border border-elec-yellow/30">
            <Shield className="h-4 w-4 text-elec-yellow" />
            <span className="text-sm font-medium text-elec-yellow">Smart Security and Access Control</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">{TITLE}</h1>
          <p className="text-lg text-white max-w-2xl mx-auto">{DESCRIPTION}</p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <h3 className="font-semibold text-white mb-1">Network Security</h3>
            <p className="text-sm text-white">Encryption, segmentation, firewalls</p>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <h3 className="font-semibold text-white mb-1">Privacy Risks</h3>
            <p className="text-sm text-white">Data collection and cloud storage</p>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <h3 className="font-semibold text-white mb-1">Best Practices</h3>
            <p className="text-sm text-white">Passwords, updates, monitoring</p>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <h3 className="font-semibold text-white mb-1">Electrician Role</h3>
            <p className="text-sm text-white">Advising and secure configuration</p>
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
                <span className="text-white">Understand common cyber threats targeting smart home systems</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span className="text-white">Explain network security principles including segmentation and encryption</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span className="text-white">Identify privacy risks associated with cloud-connected devices</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span className="text-white">Apply best practices for secure smart home installation and customer guidance</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Cyber Threat Landscape */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Cyber Threat Landscape
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Smart home devices are attractive targets for cybercriminals due to often weak security, always-on connectivity, and access to personal spaces and data.
            </p>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Common Attack Vectors</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-elec-yellow text-sm">Default Credentials</h4>
                  <p className="text-white text-sm">
                    Many devices ship with default usernames and passwords that are publicly known. Attackers scan the internet for devices with unchanged credentials.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-elec-yellow text-sm">Unpatched Vulnerabilities</h4>
                  <p className="text-white text-sm">
                    Devices with outdated firmware contain known security flaws that attackers can exploit. Many IoT devices are never updated after installation.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-elec-yellow text-sm">Weak Encryption</h4>
                  <p className="text-white text-sm">
                    Some devices use weak or no encryption for data transmission, allowing attackers to intercept sensitive information including video feeds and access codes.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-elec-yellow text-sm">Botnet Recruitment</h4>
                  <p className="text-white text-sm">
                    Compromised IoT devices are often recruited into botnets for distributed denial-of-service (DDoS) attacks against other targets.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Network Security Fundamentals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Network Security Fundamentals
          </h2>
          <div className="space-y-4 text-white">
            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Network Segmentation</h3>
              <p className="text-white mb-3">
                Separating IoT devices from computers and phones limits the damage from a compromised device. If a smart plug is hacked, attackers cannot access banking on the laptop.
              </p>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span><strong>Guest network:</strong> Many routers support guest networks that can isolate IoT devices</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span><strong>VLAN:</strong> Advanced routers support VLANs for more robust segmentation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span><strong>Dedicated IoT router:</strong> Separate router for smart home devices</span>
                </li>
              </ul>
            </div>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Wi-Fi Security</h3>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span><strong>WPA3:</strong> Use WPA3 encryption where supported, WPA2 as minimum</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span><strong>Strong password:</strong> Minimum 12 characters with mixed case, numbers, symbols</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span><strong>Hidden SSID:</strong> Consider hiding network name (limited security benefit)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span><strong>Disable WPS:</strong> Wi-Fi Protected Setup is vulnerable to brute force attacks</span>
                </li>
              </ul>
            </div>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Router Security</h3>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Change default admin password immediately</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Keep router firmware updated</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Disable remote management unless required</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Enable firewall features where available</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Privacy Considerations */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Privacy Considerations
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Smart home devices collect significant amounts of data about occupants' daily lives. Understanding and mitigating privacy risks is essential.
            </p>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Data Collection Concerns</h3>
              <ul className="space-y-3">
                <li>
                  <strong className="text-elec-yellow">Usage patterns:</strong>
                  <span className="text-white"> When lights are used, heating schedules, occupancy patterns - reveals when home is empty.</span>
                </li>
                <li>
                  <strong className="text-elec-yellow">Voice recordings:</strong>
                  <span className="text-white"> Voice assistants may record and store conversations, potentially reviewed by human contractors.</span>
                </li>
                <li>
                  <strong className="text-elec-yellow">Video footage:</strong>
                  <span className="text-white"> Cloud-stored camera footage accessible to manufacturer employees or through data breaches.</span>
                </li>
                <li>
                  <strong className="text-elec-yellow">Location data:</strong>
                  <span className="text-white"> Geofencing features track smartphone location and presence patterns.</span>
                </li>
              </ul>
            </div>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Privacy Protection Strategies</h3>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Review privacy policies before purchasing devices</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Choose local-processing options where available (no cloud dependency)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Disable features that collect unnecessary data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Use local storage for cameras rather than cloud subscriptions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Mute voice assistants when not needed</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Regularly review and delete stored data in manufacturer apps</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Best Practices for Electricians */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Best Practices for Electricians
          </h2>
          <div className="space-y-4 text-white">
            <p>
              As trusted professionals, electricians have an opportunity and responsibility to guide customers on security best practices during installation.
            </p>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">During Installation</h3>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Always change default passwords during setup</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Update firmware to latest version before handover</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Enable two-factor authentication where available</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Configure devices on appropriate network (IoT network if available)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Disable unnecessary features that increase attack surface</span>
                </li>
              </ul>
            </div>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Customer Guidance</h3>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Explain the importance of keeping firmware updated</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Recommend strong, unique passwords for each service</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Advise on network segmentation options</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Discuss privacy implications of cloud-connected devices</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span>Provide written documentation of security recommendations</span>
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
            title="Network Security and Privacy Quiz"
            questions={quizQuestions}
            courseId="smart-home-module-5"
            sectionId="section-6"
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
                <h3 className="text-xl font-bold text-white">Module 5 Complete</h3>
                <p className="text-white">Smart Security and Access Control</p>
              </div>
            </div>
            <p className="text-white mb-4">
              Congratulations on completing Module 5! You have learned about smart locks, CCTV systems, security sensors, remote access, lighting integration, and network security for smart home installations.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                className="bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation"
                asChild
              >
                <Link to="/study-centre/upskilling/smart-home-module-6">
                  Continue to Module 6
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 touch-manipulation"
                asChild
              >
                <Link to="/study-centre/upskilling/smart-home">
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
            <Link to="../section-5">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Lighting and Emergency Scenes
            </Link>
          </Button>
          <Button
            className="bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation"
            asChild
          >
            <Link to="/study-centre/upskilling/smart-home-module-6">
              Module 6: Voice Control
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default SmartHomeModule5Section6;
