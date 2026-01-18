import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Remote Monitoring and Fault Alerts - BMS Module 6 Section 6";
const DESCRIPTION = "Learn about remote access and notification systems for modern BMS installations, including fault alerts and cybersecurity considerations.";

const quickCheckQuestions = [
  {
    id: "bms6-6-qc1",
    question: "Why does remote monitoring improve response times?",
    options: [
      "Because it reduces the amount of data collected",
      "Because staff can receive instant notifications and take action from any location",
      "Because it eliminates the need for maintenance staff",
      "Because it only monitors critical systems"
    ],
    correctIndex: 1,
    explanation: "Remote monitoring improves response times because staff can receive instant notifications and take immediate action from any location, rather than waiting to physically visit the site. This 24/7 accessibility means critical issues can be addressed within minutes instead of hours."
  },
  {
    id: "bms6-6-qc2",
    question: "What is one benefit of escalation in remote fault alerts?",
    options: [
      "It reduces the number of alerts generated",
      "It ensures critical issues reach appropriate personnel if the primary contact does not respond",
      "It eliminates the need for backup systems",
      "It allows staff to ignore low-priority alerts"
    ],
    correctIndex: 1,
    explanation: "Escalation ensures that critical issues reach appropriate personnel if the primary contact does not respond, preventing important alerts from being missed. It also automatically involves senior staff for high-priority faults that require management-level decisions."
  },
  {
    id: "bms6-6-qc3",
    question: "What is one risk of relying solely on remote monitoring?",
    options: [
      "It costs more than manual monitoring",
      "Staff may become complacent and assume alerts are always working correctly",
      "It requires too many sensors",
      "It only works during business hours"
    ],
    correctIndex: 1,
    explanation: "Staff may become complacent and assume alerts are always working correctly, potentially missing critical issues if the alert system fails or is misconfigured. This is why redundancy and regular testing are essential."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the primary purpose of remote monitoring in BMS?",
    options: [
      "To replace all on-site maintenance staff",
      "To allow authorised staff to view and control BMS functions off-site",
      "To reduce the number of sensors needed",
      "To eliminate the need for local control panels"
    ],
    correctAnswer: 1,
    explanation: "Remote monitoring allows authorised staff to view and control BMS functions off-site, improving response times and enabling 24/7 oversight of critical building systems."
  },
  {
    id: 2,
    question: "Which method provides the most secure remote access to BMS systems?",
    options: [
      "Public web portals without authentication",
      "Unencrypted mobile apps",
      "VPN connections through IT-managed encrypted tunnels",
      "Direct internet exposure of BMS controllers"
    ],
    correctAnswer: 2,
    explanation: "VPN connections through IT-managed encrypted tunnels provide secure direct access to site BMS servers with integration to corporate network security policies."
  },
  {
    id: 3,
    question: "What backup communication method works independently of internet connectivity?",
    options: [
      "Email alerts",
      "Web portal notifications",
      "SMS via GSM modules",
      "Push notifications through apps"
    ],
    correctAnswer: 2,
    explanation: "SMS via GSM modules works independently of internet connectivity, providing instant delivery even during network outages through cellular networks."
  },
  {
    id: 4,
    question: "What is the purpose of escalation protocols in fault alerting?",
    options: [
      "To reduce the number of alerts",
      "To ensure issues reach appropriate personnel if primary contacts do not respond",
      "To eliminate low-priority alarms",
      "To delay notification delivery"
    ],
    correctAnswer: 1,
    explanation: "Escalation protocols ensure critical issues reach appropriate personnel if primary contacts do not respond, automatically involving senior staff when needed and preventing important alerts from being missed."
  },
  {
    id: 5,
    question: "What is a key cybersecurity risk of remote BMS access?",
    options: [
      "Too many notifications",
      "Poorly secured remote access can be exploited by attackers",
      "Increased energy consumption",
      "Slower system response"
    ],
    correctAnswer: 1,
    explanation: "Poorly secured remote access can be exploited by attackers, making proper security measures including VPN, strong authentication, and firewalls essential."
  },
  {
    id: 6,
    question: "What minimum GSM signal strength is recommended for reliable communication?",
    options: [
      "-90dBm",
      "-80dBm",
      "-70dBm",
      "-60dBm"
    ],
    correctAnswer: 2,
    explanation: "A minimum signal strength of -70dBm is recommended for reliable GSM communication in remote monitoring applications."
  },
  {
    id: 7,
    question: "How often should remote alert systems be tested for critical systems?",
    options: [
      "Annually",
      "Quarterly",
      "Monthly",
      "Only during commissioning"
    ],
    correctAnswer: 2,
    explanation: "Monthly testing is recommended for critical systems, including all alert paths and staff response procedures, not just technical functionality."
  },
  {
    id: 8,
    question: "What should GSM modules have for reliable operation during power outages?",
    options: [
      "Faster processors",
      "Larger antennas",
      "Battery backup for minimum 8 hours",
      "Multiple SIM cards"
    ],
    correctAnswer: 2,
    explanation: "GSM modules should have battery backup for minimum 8 hours operation to ensure alerts can be sent during power outages."
  },
  {
    id: 9,
    question: "Why is redundancy important in remote monitoring systems?",
    options: [
      "To increase costs",
      "To ensure alerts are delivered even if one communication method fails",
      "To reduce the number of staff needed",
      "To simplify system design"
    ],
    correctAnswer: 1,
    explanation: "Redundancy ensures alerts are delivered even if one communication method fails, preventing critical issues from being missed due to a single point of failure."
  },
  {
    id: 10,
    question: "What regulation requires appropriate data protection measures for remote access systems?",
    options: [
      "Building Regulations Part L",
      "BS 7671",
      "GDPR and Data Protection",
      "BS EN 12101"
    ],
    correctAnswer: 2,
    explanation: "GDPR and Data Protection regulations require appropriate data protection measures including encryption of data in transit, secure authentication, and audit logging of access attempts."
  }
];

const faqs = [
  {
    question: "What happens if the GSM network goes down?",
    answer: "This is why redundancy is crucial. Configure multiple alert paths including email, SMS, and app notifications. Some systems can also use landline autodiallers as a backup."
  },
  {
    question: "How do we secure remote access against hackers?",
    answer: "Use VPN connections, strong authentication, regular password changes, and limit access to specific IP addresses. Work with IT security teams to implement proper firewalls and monitoring."
  },
  {
    question: "Can remote monitoring work during power outages?",
    answer: "Yes, if properly designed. GSM modules should have battery backup, and critical network equipment should be on UPS systems. Some systems can send 'last gasp' alerts when power fails."
  },
  {
    question: "Who is responsible for maintaining remote monitoring systems?",
    answer: "It is typically shared between electricians (hardware), IT teams (networks), and facilities managers (procedures). Clear responsibility matrices should be established during commissioning."
  },
  {
    question: "How often should we test remote alert systems?",
    answer: "Monthly testing is recommended for critical systems, quarterly for less critical ones. Tests should include all alert paths and staff response procedures, not just technical functionality."
  },
  {
    question: "What if staff do not respond to alerts after hours?",
    answer: "Implement escalation procedures that automatically notify backup staff or management. Some systems can escalate to security services or emergency contacts if no response is received."
  }
];

const BMSModule6Section6 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
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
        {/* Centred Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 6 Section 6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Remote Monitoring and Fault Alerts
          </h1>
          <p className="text-white/80">
            Remote access and notification systems for modern BMS installations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>What:</strong> Off-site access to BMS dashboards and controls</li>
              <li><strong>Why:</strong> Faster response times, reduced downtime, 24/7 oversight</li>
              <li><strong>Risks:</strong> Cybersecurity vulnerabilities, missed alerts if misconfigured</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> GSM modules, network routers, notification hardware in panels</li>
              <li><strong>Use:</strong> Test all alert paths, implement redundancy, coordinate with IT</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the purpose of remote monitoring in a BMS",
              "Describe how fault alerts are sent to operators",
              "Recognise the benefits and risks of remote access",
              "Apply best practices for supporting remote monitoring hardware",
              "Understand cybersecurity considerations",
              "Know the relevant UK regulatory standards"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: What is Remote Monitoring */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What is Remote Monitoring?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Modern Building Management Systems are rarely monitored only from a control room. With remote monitoring and fault alerting, facility teams can access live data, receive alarm notifications, and even make adjustments from laptops, tablets, or smartphones.
            </p>
            <p>
              This improves response times and reduces downtime - but it also introduces new risks. If remote monitoring is not set up correctly, staff may miss critical alerts, or systems may become vulnerable to cyberattacks.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Remote Access Methods:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong className="text-elec-yellow">Web portals:</strong> Secure login to cloud-hosted dashboards with SSL encryption and multi-factor authentication for real-time data visualisation and system configuration</li>
                <li><strong className="text-elec-yellow">Mobile apps:</strong> Push notifications and live controls through dedicated BMS applications with instant alarm notifications and quick system overrides</li>
                <li><strong className="text-elec-yellow">VPN connections:</strong> Direct access to site BMS servers through IT-managed encrypted tunnels with full system access equivalent to local control</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Example</p>
              <p className="text-sm text-white">A maintenance manager receives a push notification at 2am about a chiller fault. Using the mobile app, they remotely switch to a standby unit, adjust temperature setpoints, and schedule an engineer visit for the next morning - all whilst preventing a complete system failure.</p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Fault Alerts */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Fault Alerts
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Fault alerts ensure that problems are flagged instantly, not hours later when someone checks the dashboard. Modern BMS systems can detect hundreds of different fault conditions and communicate them through multiple channels to ensure rapid response.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Alert Delivery Methods:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong className="text-elec-yellow">SMS via GSM modules:</strong> Text messages sent through cellular networks for immediate notification delivery, working independently of internet connectivity</li>
                <li><strong className="text-elec-yellow">Email alerts:</strong> Detailed notifications with graphs, images, and fault descriptions sent to multiple recipients with automatic escalation</li>
                <li><strong className="text-elec-yellow">Push notifications:</strong> Real-time alerts delivered directly to smartphones via dedicated applications with interactive acknowledgment</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Escalation Protocols:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong className="text-elec-yellow">Level 1:</strong> On-site technicians (0-5 minutes)</li>
                <li><strong className="text-elec-yellow">Level 2:</strong> Shift supervisors (5-15 minutes)</li>
                <li><strong className="text-elec-yellow">Level 3:</strong> Facilities management (15-30 minutes)</li>
                <li><strong className="text-elec-yellow">Critical:</strong> Emergency response team (immediate)</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Extended Example</p>
              <p className="text-sm text-white">A critical AHU bearing temperature rises above 75°C. The system immediately sends an SMS to the maintenance technician and displays a Level 2 alarm on the BMS. If not acknowledged within 10 minutes, it escalates to the facilities manager via email. After 20 minutes without response, it triggers an automated shutdown sequence and alerts the emergency response team.</p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Risks of Remote Access */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Risks of Remote Access
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Whilst remote monitoring offers significant benefits, it also introduces risks that must be managed through proper setup, testing, and training.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key Risks:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong className="text-elec-yellow">Missed alerts:</strong> If systems are misconfigured, messages may not be delivered. Staff may assume alerts are working when they are not</li>
                <li><strong className="text-elec-yellow">Over-reliance:</strong> Staff may assume alerts are always working, leading to complacency and missed manual checks</li>
                <li><strong className="text-elec-yellow">Cybersecurity risks:</strong> Poorly secured remote access can be exploited by attackers, potentially giving them control of building systems</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Key Point</p>
              <p className="text-sm text-white">These risks underline the need for proper testing, secure setup, and staff training. Never rely on a single alert method - always implement redundancy.</p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Real World Example */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Real World Example
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Distribution Warehouse Freezer Failure</p>
              <p className="text-sm text-white mb-3">
                <strong>The Problem:</strong> In a large distribution warehouse, a critical freezer unit failed overnight. The BMS was configured to send email alerts only - but the email server had been offline for weeks, and no one noticed.
              </p>
              <p className="text-sm text-white mb-3">
                <strong>Investigation:</strong> By the time staff discovered the fault the next morning, thousands of pounds of stock had spoiled. The investigation revealed that staff had become reliant on email notifications without checking if the system was actually working.
              </p>
              <p className="text-sm text-white mb-3">
                <strong>The Solution:</strong> GSM SMS modules were installed as a backup alert method, ensuring future alarms reached staff even if email servers failed. Regular testing of all alert paths was also implemented.
              </p>
              <p className="text-sm text-white">
                <strong>Key Lessons:</strong> Never rely on a single alert method. Always implement redundancy and test notification systems regularly. Staff training on acknowledging and escalating alerts is crucial.
              </p>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Setting Up Remote Monitoring</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Check connectivity - verify GSM signal strength (-70dBm minimum) or network availability</li>
                <li>Use redundancy - configure multiple reporting paths (SMS and email)</li>
                <li>Test notifications - send trial alerts to all recipients and confirm delivery</li>
                <li>Label equipment - clearly identify GSM modules, routers, and notification hardware</li>
                <li>Coordinate with IT - confirm correct firewall and security settings</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Technical Requirements</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Install external antenna with minimum 3dB gain for GSM modules</li>
                <li>Use shielded cables for RF connections</li>
                <li>Maintain 2m separation from high-power equipment</li>
                <li>Provide battery backup for minimum 8 hours operation</li>
                <li>Use Cat6A cables for Ethernet connections</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">UK Regulatory Standards</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>BS EN 16001:</strong> Energy management compliance and monitoring</li>
                <li><strong>GDPR:</strong> Data protection for remote access systems</li>
                <li><strong>Ofcom regulations:</strong> Commercial use of mobile communications</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Single alert method</strong> - always implement redundancy</li>
                <li><strong>No regular testing</strong> - test monthly for critical systems</li>
                <li><strong>Poor security</strong> - always use VPN and strong authentication</li>
                <li><strong>No battery backup</strong> - GSM modules need power during outages</li>
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

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bms-module-6-section-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Fire Panel Integration
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bms-module-7">
              Next Module: Advanced Applications
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BMSModule6Section6;
