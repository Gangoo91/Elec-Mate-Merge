import { ArrowLeft, ArrowRight, Users, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Customer Handover and App Training";
const DESCRIPTION = "Develop professional handover skills that ensure customers can confidently use and maintain their smart home systems.";

const quickCheckQuestions = [
  {
    question: "What is the primary goal of a customer handover session?",
    options: ["To demonstrate technical expertise", "To ensure the customer can confidently operate and maintain the system", "To upsell additional products", "To complete paperwork quickly"],
    correctIndex: 1,
    explanation: "The handover should focus on empowering the customer to use their system independently, reducing support calls and improving satisfaction."
  },
  {
    question: "When demonstrating app functionality, what approach is most effective?",
    options: ["Show every feature available", "Let the customer discover features themselves", "Focus on daily use features first, with advanced features as follow-up", "Only show features they specifically ask about"],
    correctIndex: 2,
    explanation: "Starting with essential daily functions prevents overwhelm. Advanced features can be introduced once basic operation is comfortable."
  },
  {
    question: "What documentation should be left with the customer after handover?",
    options: ["Just the invoice", "System overview, login details, emergency procedures, and support contacts", "Manufacturer manuals only", "No documentation is needed"],
    correctIndex: 1,
    explanation: "Comprehensive documentation enables customers to reference information later and contact appropriate support when needed."
  }
];

const quizQuestions = [
  {
    question: "How should you handle a customer who seems overwhelmed during app training?",
    options: [
      "Continue with the full demonstration to complete the handover",
      "Slow down, focus on essentials, and offer a follow-up session",
      "Suggest they read the manual instead",
      "Skip the training entirely"
    ],
    correctIndex: 1,
    explanation: "Recognising customer comfort levels and adapting the training pace ensures better retention and reduces anxiety about new technology."
  },
  {
    question: "What should be included in the system overview document?",
    options: [
      "Technical specifications only",
      "Device list, network details, account information, and basic troubleshooting",
      "Marketing materials",
      "Installation photographs only"
    ],
    correctIndex: 1,
    explanation: "A practical system overview helps customers and future technicians understand the installation without needing to investigate from scratch."
  },
  {
    question: "When is the best time to conduct the customer handover?",
    options: [
      "Before installation is complete",
      "Immediately after completion when system is fresh in mind",
      "Several days after installation",
      "Only if the customer requests it"
    ],
    correctIndex: 1,
    explanation: "Handover immediately after completion allows demonstration of the actual installed system while details are fresh, enabling practical hands-on training."
  },
  {
    question: "What voice command training approach is most effective?",
    options: [
      "Give the customer a written list of commands",
      "Have the customer practice commands during the session",
      "Demonstrate commands without customer participation",
      "Voice commands are not important to cover"
    ],
    correctIndex: 1,
    explanation: "Active participation builds muscle memory and confidence. Customers who practice during training are more likely to use features independently."
  },
  {
    question: "How should you explain the process for getting system support?",
    options: [
      "Tell them to search online",
      "Provide clear contacts for different types of issues (your company vs manufacturer)",
      "Say you will always be available 24/7",
      "Avoid discussing support to prevent concern"
    ],
    correctIndex: 1,
    explanation: "Clear support pathways prevent customer frustration. Differentiating between installation support and manufacturer support sets appropriate expectations."
  }
];

const faqs = [
  {
    question: "How long should a customer handover session take?",
    answer: "Plan for 30-60 minutes depending on system complexity. A simple lighting system may need 20-30 minutes, while a comprehensive system with security, climate, and AV integration may require a full hour. Always ask if the customer has time available before starting."
  },
  {
    question: "Should I create user accounts on behalf of the customer?",
    answer: "It is best practice to let the customer create their own accounts using their own email addresses. You can guide them through the process. This ensures they own their accounts and passwords, avoiding security and access issues if they need support later."
  },
  {
    question: "What if the customer has multiple household members who need training?",
    answer: "Ideally, conduct the handover when all primary users are present. If this is not possible, train the main contact thoroughly and provide written guides or video links for other family members. Consider offering a brief phone call for secondary users if needed."
  }
];

const SmartHomeModule7Section5 = () => {
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
            <Link to="/electrician/upskilling/smart-home-module-7">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <span className="text-sm text-white">Section 5 of 6</span>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12 max-w-3xl mx-auto">
        {/* Centered Title Header */}
        <header className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Users className="h-10 w-10 text-elec-yellow" />
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
            <h3 className="font-semibold text-white mb-1">Professional Service</h3>
            <p className="text-white text-sm">Quality handover differentiates professional installers</p>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <h3 className="font-semibold text-white mb-1">Reduced Callbacks</h3>
            <p className="text-white text-sm">Thorough training prevents unnecessary support calls</p>
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
              "Structure effective customer handover sessions",
              "Demonstrate app functionality at appropriate skill levels",
              "Create useful handover documentation",
              "Set clear expectations for ongoing support and maintenance"
            ].map((outcome, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span className="text-white">{outcome}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Planning the Handover */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Planning the Handover Session
          </h2>
          <div className="space-y-4 text-white">
            <p>
              A successful handover requires planning. Consider the customer's technical comfort level,
              available time, and which household members should be present.
            </p>
            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 p-4 rounded-r-lg">
              <h4 className="font-semibold text-white mb-2">Pre-Handover Checklist</h4>
              <ul className="list-disc list-inside space-y-1 text-white">
                <li>Confirm all devices are commissioned and functional</li>
                <li>Prepare documentation package</li>
                <li>Test all automations and scenes</li>
                <li>Ensure customer has smartphone ready with apps installed</li>
                <li>Schedule adequate time without rushing</li>
                <li>Identify which household members should attend</li>
              </ul>
            </div>
            <h4 className="font-semibold text-white">Assessing Customer Technical Level</h4>
            <p>
              Tailor your approach based on the customer's comfort with technology. Ask about their
              current smartphone usage, whether they use other smart devices, and any concerns they
              have about the new system. This guides your training depth and pace.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* App Training Structure */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            App Training Structure
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Structure app training from basic to advanced, ensuring the customer masters
              essential functions before moving to more complex features.
            </p>
            <h4 className="font-semibold text-white">Training Sequence</h4>
            <div className="grid gap-4">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h5 className="font-medium text-elec-yellow mb-2">Stage 1: Basic Control</h5>
                <ul className="list-disc list-inside space-y-1 text-white text-sm">
                  <li>How to open the app and navigate</li>
                  <li>Controlling individual devices (on/off, dimming)</li>
                  <li>Understanding room organisation</li>
                  <li>Checking device status</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h5 className="font-medium text-elec-yellow mb-2">Stage 2: Scenes and Automations</h5>
                <ul className="list-disc list-inside space-y-1 text-white text-sm">
                  <li>Using pre-configured scenes</li>
                  <li>Triggering "Good Morning" or "Good Night" routines</li>
                  <li>Understanding how automations work</li>
                  <li>Enabling/disabling automations when needed</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h5 className="font-medium text-elec-yellow mb-2">Stage 3: Advanced Features</h5>
                <ul className="list-disc list-inside space-y-1 text-white text-sm">
                  <li>Creating or modifying scenes</li>
                  <li>Setting schedules</li>
                  <li>Adding family members to the system</li>
                  <li>Reviewing activity history</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Voice Control Training */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Voice Control Training
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Voice control is often the feature customers use most. Ensure they understand
              the available commands and practice using them during the handover.
            </p>
            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 p-4 rounded-r-lg">
              <h4 className="font-semibold text-white mb-2">Essential Voice Commands to Demonstrate</h4>
              <ul className="list-disc list-inside space-y-1 text-white">
                <li>Controlling individual devices by name</li>
                <li>Room-based commands ("Turn off the kitchen")</li>
                <li>Activating scenes ("Set movie mode")</li>
                <li>Adjusting brightness and temperature</li>
                <li>Asking device status ("Is the front door locked?")</li>
              </ul>
            </div>
            <h4 className="font-semibold text-white">Practice Exercises</h4>
            <p>
              Have the customer practice each type of command during the session. This builds
              confidence and helps identify any issues with device naming or voice recognition
              that need adjustment.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Documentation Package */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Handover Documentation
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Provide comprehensive documentation that customers can reference after you leave.
              This reduces support calls and helps if another technician needs to work on the system.
            </p>
            <h4 className="font-semibold text-white">Documentation Package Contents</h4>
            <div className="grid gap-3">
              <div className="flex gap-3 items-start">
                <span className="font-medium text-elec-yellow min-w-[130px]">System Overview:</span>
                <span className="text-white">List of all installed devices with locations and model numbers</span>
              </div>
              <div className="flex gap-3 items-start">
                <span className="font-medium text-elec-yellow min-w-[130px]">Network Info:</span>
                <span className="text-white">Wi-Fi network name, hub location, and IP addresses if relevant</span>
              </div>
              <div className="flex gap-3 items-start">
                <span className="font-medium text-elec-yellow min-w-[130px]">Account Details:</span>
                <span className="text-white">List of apps used and account email addresses (not passwords)</span>
              </div>
              <div className="flex gap-3 items-start">
                <span className="font-medium text-elec-yellow min-w-[130px]">Quick Start Guide:</span>
                <span className="text-white">Basic operating instructions for daily use</span>
              </div>
              <div className="flex gap-3 items-start">
                <span className="font-medium text-elec-yellow min-w-[130px]">Troubleshooting:</span>
                <span className="text-white">Common issues and solutions (device offline, app not responding)</span>
              </div>
              <div className="flex gap-3 items-start">
                <span className="font-medium text-elec-yellow min-w-[130px]">Support Contacts:</span>
                <span className="text-white">Your company details and manufacturer support information</span>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10 mt-4">
              <h5 className="font-medium text-elec-yellow mb-2">Electrical Certificates</h5>
              <p className="text-white text-sm">
                Include copies of all electrical installation certificates (EIC, Minor Works)
                with the documentation package. Explain what these documents are and why the
                customer should keep them safely.
              </p>
            </div>
          </div>
        </section>

        {/* Setting Expectations */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Setting Support Expectations
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Clear expectations about ongoing support prevent misunderstandings and ensure
              customers know where to turn for different types of issues.
            </p>
            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 p-4 rounded-r-lg">
              <h4 className="font-semibold text-white mb-2">Support Pathway Clarity</h4>
              <ul className="list-disc list-inside space-y-1 text-white">
                <li><span className="font-medium">Installation issues:</span> Contact your company</li>
                <li><span className="font-medium">Device faults:</span> Manufacturer warranty support</li>
                <li><span className="font-medium">App problems:</span> In-app help or manufacturer support</li>
                <li><span className="font-medium">Network issues:</span> Internet service provider</li>
              </ul>
            </div>
            <h4 className="font-semibold text-white">Maintenance Advice</h4>
            <ul className="list-disc list-inside space-y-2">
              <li>Keep apps updated for security and new features</li>
              <li>Replace batteries in sensors as indicated</li>
              <li>Restart hub periodically if issues occur</li>
              <li>Avoid moving devices without considering mesh network impact</li>
              <li>Contact installer before making major changes to the system</li>
            </ul>
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
            <Link to="../section-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous: Electrical Safety
            </Link>
          </Button>
          <Button
            className="bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation"
            asChild
          >
            <Link to="../section-6">
              Next: Documentation and Aftercare
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default SmartHomeModule7Section5;
