import { ArrowLeft, FileText, CheckCircle, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Documentation, Warranty, and Aftercare";
const DESCRIPTION = "Establish professional standards for record keeping, warranty management, and ongoing client support to build reputation and referrals.";

const quickCheckQuestions = [
  {
    question: "Why is comprehensive installation documentation important?",
    options: ["Only for legal compliance", "For future maintenance, troubleshooting, and warranty claims", "To increase job price", "Documentation is not important for smart home work"],
    correctIndex: 1,
    explanation: "Documentation serves multiple purposes: enabling future maintenance, supporting warranty claims, assisting troubleshooting, and demonstrating professional standards."
  },
  {
    question: "What should be included in a commissioning record?",
    options: ["Just the customer signature", "Device list, configuration settings, test results, and customer sign-off", "Only photographs", "The invoice only"],
    correctIndex: 1,
    explanation: "A comprehensive commissioning record documents everything needed to verify, maintain, or troubleshoot the installation in the future."
  },
  {
    question: "How should you advise customers about manufacturer warranties?",
    options: ["Tell them warranties are not your responsibility", "Explain warranty terms, registration requirements, and support contacts", "Avoid discussing warranties", "Promise to handle all warranty issues personally"],
    correctIndex: 1,
    explanation: "Customers need clear guidance on warranty registration, coverage periods, and how to claim. This empowers them to use warranty support appropriately."
  }
];

const quizQuestions = [
  {
    question: "What information should an as-built drawing include for a smart home installation?",
    options: [
      "Only the location of the consumer unit",
      "Device locations, cable routes, hub position, and network infrastructure",
      "Just a floor plan with no annotations",
      "Manufacturer logos only"
    ],
    correctIndex: 1,
    explanation: "As-built drawings should show all installed components, cable routes, and infrastructure to enable future maintenance and modifications."
  },
  {
    question: "Why is device registration important for warranty purposes?",
    options: [
      "It is not important",
      "It activates warranty coverage and provides proof of purchase date",
      "Only for marketing emails",
      "To void the warranty"
    ],
    correctIndex: 1,
    explanation: "Many manufacturers require product registration to activate warranties. Registration also creates a record of the purchase date for warranty claims."
  },
  {
    question: "What should be included in a maintenance schedule recommendation?",
    options: [
      "Nothing - smart devices do not need maintenance",
      "Battery replacement intervals, firmware updates, and periodic system checks",
      "Only cleaning instructions",
      "Daily reboot requirements"
    ],
    correctIndex: 1,
    explanation: "A maintenance schedule helps customers keep their system running reliably, including battery changes, software updates, and periodic checks."
  },
  {
    question: "How should you store customer installation records?",
    options: [
      "Discard after job completion",
      "Securely with GDPR compliance, accessible for future reference",
      "Share publicly for marketing",
      "Only keep paper copies"
    ],
    correctIndex: 1,
    explanation: "Records must be stored securely following data protection requirements, while remaining accessible for future support, warranty claims, or regulatory inspections."
  },
  {
    question: "What is the benefit of offering a maintenance agreement for smart home installations?",
    options: [
      "No benefit - customers prefer one-time purchases",
      "Recurring revenue and proactive customer relationship management",
      "It complicates the business model",
      "Maintenance agreements are illegal"
    ],
    correctIndex: 1,
    explanation: "Maintenance agreements provide predictable revenue, encourage ongoing customer relationships, and help identify issues before they become major problems."
  }
];

const faqs = [
  {
    question: "How long should I retain customer installation records?",
    answer: "Retain records for at least the warranty period of installed devices (typically 2-5 years) and preferably longer for liability protection. Electrical certificates should be kept indefinitely or until the property changes ownership. Ensure compliance with GDPR for personal data."
  },
  {
    question: "Should I offer extended warranty or maintenance packages?",
    answer: "Maintenance packages can be valuable for customers and provide recurring revenue. Consider offering annual check-ups, priority support, and discounted call-outs. Be clear about what is and is not covered to manage expectations."
  },
  {
    question: "What should I do if a customer reports a problem months after installation?",
    answer: "Review your installation records to understand the original configuration. Assess whether the issue is installation-related, device failure (warranty), or user error. Provide appropriate support or refer to manufacturer warranty as needed. Good records make this process much smoother."
  }
];

const SmartHomeModule7Section6 = () => {
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
          <span className="text-sm text-white">Section 6 of 6</span>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12 max-w-3xl mx-auto">
        {/* Centered Title Header */}
        <header className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <FileText className="h-10 w-10 text-elec-yellow" />
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
            <h3 className="font-semibold text-white mb-1">Professional Standard</h3>
            <p className="text-white text-sm">Quality documentation reflects installation quality</p>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <h3 className="font-semibold text-white mb-1">Business Growth</h3>
            <p className="text-white text-sm">Aftercare relationships generate referrals and repeat business</p>
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
              "Create comprehensive installation documentation packages",
              "Manage warranty information and registration for customers",
              "Develop effective aftercare and maintenance programmes",
              "Build long-term customer relationships through professional service"
            ].map((outcome, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span className="text-white">{outcome}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Installation Documentation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Installation Documentation Standards
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Professional documentation demonstrates quality workmanship, protects your business,
              and enables efficient future support. Every installation should have a complete
              documentation package.
            </p>
            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 p-4 rounded-r-lg">
              <h4 className="font-semibold text-white mb-2">Essential Documentation</h4>
              <ul className="list-disc list-inside space-y-1 text-white">
                <li>Electrical installation certificates (EIC/Minor Works)</li>
                <li>As-built drawings showing device locations and cable routes</li>
                <li>Device inventory with model numbers and serial numbers</li>
                <li>Network configuration details</li>
                <li>Commissioning checklist with test results</li>
                <li>Customer handover acknowledgement</li>
              </ul>
            </div>
            <h4 className="font-semibold text-white">As-Built Drawings</h4>
            <p>
              Create clear drawings showing installed device locations, cable routes, hub and
              network equipment positions, and any changes from the original plan. These are
              invaluable for future maintenance, modifications, or troubleshooting.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Commissioning Records */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Commissioning Records
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Commissioning records document that each device was properly installed, configured,
              and tested. This protects both you and the customer.
            </p>
            <h4 className="font-semibold text-white">Commissioning Record Contents</h4>
            <div className="grid gap-4">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h5 className="font-medium text-elec-yellow mb-2">Device Information</h5>
                <ul className="list-disc list-inside space-y-1 text-white text-sm">
                  <li>Device name and assigned room</li>
                  <li>Manufacturer and model number</li>
                  <li>Serial number or MAC address</li>
                  <li>Firmware version at installation</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h5 className="font-medium text-elec-yellow mb-2">Configuration Details</h5>
                <ul className="list-disc list-inside space-y-1 text-white text-sm">
                  <li>Network/protocol settings (Z-Wave node ID, Zigbee address)</li>
                  <li>Assigned automations and scenes</li>
                  <li>Integration with other platforms</li>
                  <li>Any custom configuration applied</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h5 className="font-medium text-elec-yellow mb-2">Test Results</h5>
                <ul className="list-disc list-inside space-y-1 text-white text-sm">
                  <li>Local control functionality confirmed</li>
                  <li>Remote/app control confirmed</li>
                  <li>Voice control tested (if applicable)</li>
                  <li>Automation trigger verified</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Warranty Management */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Warranty Management
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Understanding and managing warranties protects your customers and reduces your
              liability. Help customers register products and understand their warranty coverage.
            </p>
            <h4 className="font-semibold text-white">Warranty Types</h4>
            <div className="grid gap-3">
              <div className="flex gap-3 items-start">
                <span className="font-medium text-elec-yellow min-w-[140px]">Manufacturer:</span>
                <span className="text-white">Covers device defects, typically 1-3 years</span>
              </div>
              <div className="flex gap-3 items-start">
                <span className="font-medium text-elec-yellow min-w-[140px]">Installer:</span>
                <span className="text-white">Your workmanship guarantee, scope defined by your terms</span>
              </div>
              <div className="flex gap-3 items-start">
                <span className="font-medium text-elec-yellow min-w-[140px]">Extended:</span>
                <span className="text-white">Optional additional coverage, often available at purchase</span>
              </div>
            </div>
            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 p-4 rounded-r-lg">
              <h4 className="font-semibold text-white mb-2">Registration Best Practices</h4>
              <ul className="list-disc list-inside space-y-1 text-white">
                <li>Register products during commissioning where possible</li>
                <li>Provide customer with registration confirmation</li>
                <li>Record warranty expiry dates in documentation</li>
                <li>Explain claim process to customer</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Aftercare and Maintenance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Aftercare and Maintenance Programmes
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Proactive aftercare builds customer loyalty, generates recurring revenue, and
              positions you as a trusted partner rather than a one-time contractor.
            </p>
            <h4 className="font-semibold text-white">Maintenance Programme Components</h4>
            <div className="grid gap-4">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h5 className="font-medium text-elec-yellow mb-2">Annual System Health Check</h5>
                <ul className="list-disc list-inside space-y-1 text-white text-sm">
                  <li>Verify all devices online and responsive</li>
                  <li>Check battery levels in sensors</li>
                  <li>Update firmware where beneficial</li>
                  <li>Review and optimise automations</li>
                  <li>Test backup systems (if applicable)</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h5 className="font-medium text-elec-yellow mb-2">Priority Support Benefits</h5>
                <ul className="list-disc list-inside space-y-1 text-white text-sm">
                  <li>Faster response times for issues</li>
                  <li>Remote troubleshooting included</li>
                  <li>Discounted call-out rates</li>
                  <li>New feature training sessions</li>
                </ul>
              </div>
            </div>
            <h4 className="font-semibold text-white">Maintenance Schedule Recommendations</h4>
            <ul className="list-disc list-inside space-y-2">
              <li>Battery replacement: Check annually, replace when below 20%</li>
              <li>Firmware updates: Review quarterly, apply as recommended</li>
              <li>Network health: Check mesh network status annually</li>
              <li>Automation review: Confirm customer needs are still met</li>
            </ul>
          </div>
        </section>

        {/* Building Long-Term Relationships */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Building Long-Term Customer Relationships
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Smart home customers often expand their systems over time. Maintaining relationships
              positions you as their preferred installer for future work and referrals.
            </p>
            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 p-4 rounded-r-lg">
              <h4 className="font-semibold text-white mb-2">Relationship Building Strategies</h4>
              <ul className="list-disc list-inside space-y-1 text-white">
                <li>Follow up after installation to check satisfaction</li>
                <li>Send periodic tips or updates about new features</li>
                <li>Notify customers about relevant new products</li>
                <li>Request reviews and referrals from satisfied customers</li>
                <li>Maintain accessible support channels</li>
              </ul>
            </div>
            <h4 className="font-semibold text-white">Professional Standards</h4>
            <p>
              Consistent professionalism throughout the customer journey - from initial consultation
              through installation, handover, and aftercare - builds reputation and generates
              word-of-mouth referrals that are invaluable for business growth.
            </p>
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

        {/* Module 7 Completion */}
        <section className="mb-10 p-6 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-full bg-elec-yellow/20">
              <Award className="h-8 w-8 text-elec-yellow" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Module 7 Complete</h2>
              <p className="text-white">Installation and Commissioning Best Practices</p>
            </div>
          </div>
          <p className="text-white mb-4">
            Congratulations on completing Module 7! You have covered the essential skills for
            professional smart home installation, from wiring and commissioning to customer
            handover and ongoing aftercare. These practices will help you deliver reliable
            installations and build lasting customer relationships.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation"
              asChild
            >
              <Link to="/electrician/upskilling/smart-home-course">
                Return to Course Overview
              </Link>
            </Button>
          </div>
        </section>

        {/* Course Completion */}
        <section className="mb-10 p-6 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-full bg-green-500/20">
              <Award className="h-8 w-8 text-green-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Smart Home Course Complete</h2>
              <p className="text-white">All 7 Modules Finished</p>
            </div>
          </div>
          <p className="text-white mb-4">
            You have completed the entire Smart Home Installation course. You now have
            comprehensive knowledge covering protocols, lighting, climate control, security,
            voice integration, and professional installation practices. Apply these skills
            to deliver exceptional smart home solutions for your customers.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            <div className="p-3 rounded-lg bg-white/5">
              <h4 className="font-medium text-green-400 mb-1">Skills Acquired</h4>
              <ul className="text-white text-sm space-y-1">
                <li>Protocol selection and integration</li>
                <li>Lighting and climate system design</li>
                <li>Security and access control</li>
                <li>Voice assistant configuration</li>
                <li>Professional installation standards</li>
              </ul>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <h4 className="font-medium text-green-400 mb-1">Next Steps</h4>
              <ul className="text-white text-sm space-y-1">
                <li>Practice installations with real systems</li>
                <li>Stay current with new protocols (Matter)</li>
                <li>Consider manufacturer certifications</li>
                <li>Build portfolio with project documentation</li>
                <li>Explore advanced integrations</li>
              </ul>
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
              Previous: Customer Handover
            </Link>
          </Button>
          <Button
            className="bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation"
            asChild
          >
            <Link to="/electrician/upskilling/smart-home-course">
              Back to Course
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default SmartHomeModule7Section6;
