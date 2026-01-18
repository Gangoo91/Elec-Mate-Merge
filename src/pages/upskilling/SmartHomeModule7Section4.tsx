import { ArrowLeft, ArrowRight, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Electrical Safety and Isolation";
const DESCRIPTION = "Essential guidance on BS 7671 compliance, safe isolation procedures, and electrical safety considerations for smart home installations.";

const quickCheckQuestions = [
  {
    question: "What is the primary reason for safe isolation before working on smart devices connected to mains power?",
    options: ["To save electricity", "To prevent electric shock and ensure worker safety", "To preserve device settings", "To improve device performance"],
    correctIndex: 1,
    explanation: "Safe isolation prevents electric shock, which can be fatal. It is the most critical safety procedure before working on any electrical installation."
  },
  {
    question: "According to BS 7671, what type of RCD protection is required for socket outlets in domestic installations?",
    options: ["100mA", "300mA", "30mA", "No RCD required"],
    correctIndex: 2,
    explanation: "BS 7671 requires 30mA RCD protection for socket outlets in domestic installations to provide protection against electric shock."
  },
  {
    question: "When proving a circuit is dead, how many tests should be performed with a voltage indicator?",
    options: ["One test only", "Two tests - before and after", "Three tests - prove, test, prove", "No tests required"],
    correctIndex: 2,
    explanation: "The three-point test (prove-test-prove) confirms the voltage indicator works before testing, confirms the circuit is dead, and verifies the indicator still works after."
  }
];

const quizQuestions = [
  {
    question: "What document should be issued after completing electrical work on a smart home installation?",
    options: [
      "A simple receipt",
      "An appropriate electrical installation certificate or minor works certificate",
      "A warranty card only",
      "No documentation is required"
    ],
    correctIndex: 1,
    explanation: "Electrical work must be documented with appropriate certificates (EIC or Minor Works) as required by Part P and BS 7671 to demonstrate compliance and provide records."
  },
  {
    question: "Why is SPD (Surge Protection Device) protection recommended for smart home installations?",
    options: [
      "To reduce electricity bills",
      "To protect sensitive electronics from voltage surges",
      "To improve Wi-Fi signal",
      "It is not recommended"
    ],
    correctIndex: 1,
    explanation: "SPDs protect sensitive smart home electronics from damage caused by voltage surges from lightning strikes or switching events on the electrical network."
  },
  {
    question: "When installing smart devices in a bathroom, what must be considered?",
    options: [
      "Only the colour of the device",
      "IP rating, zone restrictions, and supplementary bonding requirements",
      "Just the customer's preference",
      "Nothing special - standard installation applies"
    ],
    correctIndex: 1,
    explanation: "Bathrooms are special locations under BS 7671. Equipment must have appropriate IP ratings for the zone, and supplementary bonding may be required."
  },
  {
    question: "What is the safe isolation procedure sequence?",
    options: [
      "Switch off, lock off, warn others",
      "Identify circuit, isolate, secure, prove dead",
      "Test with multimeter only",
      "Turn off main switch only"
    ],
    correctIndex: 1,
    explanation: "The safe isolation procedure involves: identifying the circuit, isolating at the correct point, securing the isolation (lock off), and proving the circuit is dead using approved equipment."
  },
  {
    question: "Under Part P of the Building Regulations, which smart home work is notifiable?",
    options: [
      "All smart device installations",
      "Only Wi-Fi device setup",
      "New circuits and work in special locations",
      "None - smart home work is exempt"
    ],
    correctIndex: 2,
    explanation: "Part P requires notification of new circuits, consumer unit work, and work in special locations (bathrooms, swimming pools, etc.). Minor alterations and additions may be exempt."
  }
];

const faqs = [
  {
    question: "Do I need to be a registered electrician to install smart switches?",
    answer: "If replacing like-for-like and no new wiring is required, this may be considered a minor works. However, if new circuits are needed, work is in special locations, or the consumer unit is affected, the work must be carried out by a competent person and may require Building Regulations notification. Always assess the scope of work against Part P requirements."
  },
  {
    question: "Can I install a smart switch without isolating the entire property?",
    answer: "Yes, you should isolate only the relevant circuit at the consumer unit. Identify the correct circuit using circuit charts or by switching off and testing. Always prove the circuit is dead at the point of work before proceeding. Locking off the circuit breaker prevents accidental re-energisation."
  },
  {
    question: "What testing is required after installing smart switches?",
    answer: "As a minimum, verify correct polarity, earth continuity, and insulation resistance. Functional testing should confirm the device operates correctly both locally and via the app. Document all test results on the appropriate certificate. For new circuits, full verification testing as per BS 7671 is required."
  }
];

const SmartHomeModule7Section4 = () => {
  useSEO({
    title: `${TITLE} | Smart Home Module 7`,
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
            <Link to="/electrician/upskilling/smart-home-module-7">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <span className="text-sm text-white">Section 4 of 6</span>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12 max-w-3xl mx-auto">
        {/* Centered Title Header */}
        <header className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Shield className="h-10 w-10 text-elec-yellow" />
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
            <h3 className="font-semibold text-white mb-1">Safety First</h3>
            <p className="text-white text-sm">Electrical safety procedures protect lives and property</p>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <h3 className="font-semibold text-white mb-1">Compliance Standard</h3>
            <p className="text-white text-sm">BS 7671 18th Edition requirements apply to all work</p>
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
              "Apply safe isolation procedures for smart home electrical work",
              "Understand BS 7671 requirements relevant to smart device installations",
              "Identify notifiable work under Part P Building Regulations",
              "Implement appropriate testing and certification procedures"
            ].map((outcome, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span className="text-white">{outcome}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Safe Isolation Procedures */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Safe Isolation Procedures
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Safe isolation is the most critical safety procedure when working on electrical installations.
              It must be performed correctly every time to prevent electric shock, which can be fatal.
            </p>
            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 p-4 rounded-r-lg">
              <h4 className="font-semibold text-white mb-2">Safe Isolation Sequence</h4>
              <ol className="list-decimal list-inside space-y-2 text-white">
                <li><span className="font-medium">Identify</span> - Locate the correct circuit to be isolated</li>
                <li><span className="font-medium">Isolate</span> - Switch off at the appropriate point (circuit breaker, isolator)</li>
                <li><span className="font-medium">Secure</span> - Lock off using a lock-out device to prevent re-energisation</li>
                <li><span className="font-medium">Prove</span> - Use approved voltage indicator (prove-test-prove method)</li>
              </ol>
            </div>
            <h4 className="font-semibold text-white">Prove-Test-Prove Method</h4>
            <p>
              This three-point test confirms the reliability of your voltage indicator:
            </p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Prove the voltage indicator works on a known live source</li>
              <li>Test the isolated circuit to confirm it is dead</li>
              <li>Prove the voltage indicator still works on the known live source</li>
            </ol>
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 mt-4">
              <h5 className="font-medium text-red-400 mb-2">Critical Warning</h5>
              <p className="text-white text-sm">
                Never assume a circuit is dead. Always test with an approved voltage indicator.
                Multimeters alone are not sufficient - use a proprietary voltage indicator (GS 38 compliant).
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* BS 7671 Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            BS 7671 Requirements for Smart Installations
          </h2>
          <div className="space-y-4 text-white">
            <p>
              All electrical work, including smart home installations, must comply with BS 7671.
              Key requirements particularly relevant to smart device work include:
            </p>
            <h4 className="font-semibold text-white">Circuit Protection</h4>
            <div className="grid gap-4">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h5 className="font-medium text-elec-yellow mb-2">RCD Protection</h5>
                <ul className="list-disc list-inside space-y-1 text-white text-sm">
                  <li>30mA RCD protection for socket outlets</li>
                  <li>30mA RCD for cables within 50mm of wall surface</li>
                  <li>Consider Type A or Type F RCDs for electronic equipment</li>
                  <li>RCBOs provide individual circuit protection</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h5 className="font-medium text-elec-yellow mb-2">Surge Protection (SPD)</h5>
                <ul className="list-disc list-inside space-y-1 text-white text-sm">
                  <li>Type 2 SPD recommended for smart home installations</li>
                  <li>Protects sensitive electronics from transient overvoltages</li>
                  <li>Install at consumer unit origin</li>
                  <li>Consider dedicated SPDs for high-value equipment</li>
                </ul>
              </div>
            </div>
            <h4 className="font-semibold text-white">Cable Selection and Installation</h4>
            <ul className="list-disc list-inside space-y-2">
              <li>Select cable size for current-carrying capacity and voltage drop</li>
              <li>Apply appropriate correction factors for grouping and thermal insulation</li>
              <li>Maintain segregation between mains and data cables</li>
              <li>Use appropriate containment for the installation environment</li>
            </ul>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Special Locations */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Special Locations and Considerations
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Part 7 of BS 7671 covers special installations and locations with additional requirements.
              Smart device installations in these areas require careful attention.
            </p>
            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 p-4 rounded-r-lg">
              <h4 className="font-semibold text-white mb-2">Bathrooms (Section 701)</h4>
              <ul className="list-disc list-inside space-y-1 text-white">
                <li>Zone 0, 1, 2: Equipment must have appropriate IP rating</li>
                <li>Zone 0: IPX7 minimum, SELV only (12V max)</li>
                <li>Zone 1: IPX4 minimum (IPX5 if water jets present)</li>
                <li>Zone 2: IPX4 minimum, shaver sockets permitted</li>
                <li>Supplementary bonding may be required in some installations</li>
              </ul>
            </div>
            <h4 className="font-semibold text-white">Other Special Considerations</h4>
            <div className="grid gap-3">
              <div className="flex gap-3 items-start">
                <span className="font-medium text-elec-yellow min-w-[100px]">Outdoors:</span>
                <span className="text-white">IP65 or higher for exposed locations, RCD protection essential</span>
              </div>
              <div className="flex gap-3 items-start">
                <span className="font-medium text-elec-yellow min-w-[100px]">Kitchens:</span>
                <span className="text-white">Consider moisture ingress near sinks, heat from cooking appliances</span>
              </div>
              <div className="flex gap-3 items-start">
                <span className="font-medium text-elec-yellow min-w-[100px]">Garages:</span>
                <span className="text-white">May require IP-rated equipment, consider vehicle movement risks</span>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Part P and Certification */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Part P and Certification Requirements
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Part P of the Building Regulations (England and Wales) governs electrical safety
              in dwellings. Understanding notification requirements prevents compliance issues.
            </p>
            <h4 className="font-semibold text-white">Notifiable Work Includes</h4>
            <ul className="list-disc list-inside space-y-2">
              <li>Installation of a new circuit</li>
              <li>Replacement of consumer unit</li>
              <li>Any work in bathrooms and swimming pool areas</li>
              <li>Work involving special installations (solar PV, EV charging)</li>
              <li>Additions or alterations in kitchens involving circuits</li>
            </ul>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10 mt-4">
              <h5 className="font-medium text-elec-yellow mb-2">Certification Requirements</h5>
              <p className="text-white text-sm mb-2">
                Issue appropriate documentation based on the scope of work:
              </p>
              <ul className="list-disc list-inside space-y-1 text-white text-sm">
                <li><span className="font-medium">EIC</span> - For new installations and new circuits</li>
                <li><span className="font-medium">Minor Works Certificate</span> - For alterations that do not require new circuits</li>
                <li>Include smart device details in schedule of items tested</li>
                <li>Provide copy to customer and retain records</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Testing Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Testing and Verification
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Proper testing verifies the safety of the installation and provides documented
              evidence of compliance. The extent of testing depends on the work scope.
            </p>
            <h4 className="font-semibold text-white">Minimum Tests for Smart Switch Replacement</h4>
            <ul className="list-disc list-inside space-y-2">
              <li>Visual inspection for damage and correct connections</li>
              <li>Polarity verification</li>
              <li>Earth continuity (where applicable)</li>
              <li>Insulation resistance</li>
              <li>Functional test of device operation</li>
            </ul>
            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 p-4 rounded-r-lg">
              <h4 className="font-semibold text-white mb-2">New Circuit Testing</h4>
              <p className="text-white mb-2">
                New circuits require full verification testing including:
              </p>
              <ul className="list-disc list-inside space-y-1 text-white">
                <li>Continuity of protective conductors</li>
                <li>Continuity of ring final circuit conductors</li>
                <li>Insulation resistance</li>
                <li>Polarity</li>
                <li>Earth fault loop impedance (Zs)</li>
                <li>RCD operation (where fitted)</li>
                <li>Prospective fault current verification</li>
              </ul>
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
            <Link to="../section-3">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous: Wi-Fi and RF Verification
            </Link>
          </Button>
          <Button
            className="bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation"
            asChild
          >
            <Link to="../section-5">
              Next: Customer Handover
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default SmartHomeModule7Section4;
