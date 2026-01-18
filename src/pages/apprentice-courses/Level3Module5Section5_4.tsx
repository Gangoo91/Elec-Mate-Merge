/**
 * Level 3 Module 5 Section 5.4 - Electronic vs Paper Certification Systems
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Electronic vs Paper Certification Systems - Level 3 Module 5 Section 5.4";
const DESCRIPTION = "Compare electronic and paper certification systems, understanding their advantages, requirements, and best practices for each approach.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "Are electronic certificates legally equivalent to paper certificates?",
    options: [
      "No, paper is always required",
      "Yes, provided they contain all required information and are securely stored",
      "Only for domestic work",
      "Only if printed within 24 hours"
    ],
    correctIndex: 1,
    explanation: "Electronic certificates are legally equivalent to paper certificates provided they contain all the information required by BS 7671 and are securely stored and retrievable. The format (paper or electronic) does not affect legal validity."
  },
  {
    id: "check-2",
    question: "What is a key advantage of electronic certification systems?",
    options: [
      "They don't require test results",
      "Automatic validation, secure storage, and easier retrieval of records",
      "They are always free to use",
      "They don't need signatures"
    ],
    correctIndex: 1,
    explanation: "Electronic systems offer automatic validation (flagging missing data or out-of-range values), secure cloud storage, easy retrieval of records, professional presentation, and often integration with test equipment or scheme databases."
  },
  {
    id: "check-3",
    question: "When using electronic certification, what is essential for the client copy?",
    options: [
      "It must be printed on special paper",
      "The client must receive it in a format they can access and retain",
      "It must be hand-signed separately",
      "Electronic copies are not permitted for clients"
    ],
    correctIndex: 1,
    explanation: "The client must receive their certificate in a format they can access and retain for the life of the installation. This may be a printed copy, email PDF, or access to an online portal - whatever suits the client's needs and ability to keep records."
  },
  {
    id: "check-4",
    question: "What security consideration applies to electronic certification systems?",
    options: [
      "No security is needed",
      "Systems must protect personal data under GDPR and prevent unauthorized alterations",
      "Only company names need protecting",
      "Security is optional for domestic work"
    ],
    correctIndex: 1,
    explanation: "Electronic systems must comply with GDPR (containing personal data), prevent unauthorized alterations (maintaining certificate integrity), and use secure access controls. The system provider should demonstrate appropriate security measures."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What must an electronic certificate contain compared to a paper certificate?",
    options: [
      "Less information as it's stored electronically",
      "Exactly the same information as required by BS 7671",
      "More information due to available space",
      "Only test results without declarations"
    ],
    correctAnswer: 1,
    explanation: "Electronic certificates must contain exactly the same information as paper certificates - all the declarations, test results, and schedules required by BS 7671 Appendix 6. The format changes but the content requirements remain identical."
  },
  {
    id: 2,
    question: "Which of these is a benefit of paper certification?",
    options: [
      "Automatic backup storage",
      "Works without internet or power, no subscription costs",
      "Automatic data validation",
      "Integration with test equipment"
    ],
    correctAnswer: 1,
    explanation: "Paper certificates work anywhere without internet or power, have no ongoing subscription costs, and are familiar to all electricians. They remain a valid and reliable option, especially for those who prefer traditional methods."
  },
  {
    id: 3,
    question: "How should electronic signatures be handled on certification?",
    options: [
      "Not required for electronic certificates",
      "Must be secure, attributable to the signer, and tamper-evident",
      "Any typed name is sufficient",
      "Only the client needs to sign"
    ],
    correctAnswer: 1,
    explanation: "Electronic signatures must be secure and uniquely attributable to the person signing. They should be tamper-evident (showing if altered after signing). Many systems use PIN codes, passwords, or biometric verification to authenticate signatures."
  },
  {
    id: 4,
    question: "What happens to electronic certificates if the provider's system fails?",
    options: [
      "All records are automatically preserved",
      "This is why backup and data export capabilities are essential",
      "Records transfer to government database",
      "The DNO stores all copies"
    ],
    correctAnswer: 1,
    explanation: "Service provider failure is a real risk. Choose systems with robust backup procedures, data export capabilities (PDF/CSV), and consider maintaining local copies. Check the provider's business continuity and data retention policies."
  },
  {
    id: 5,
    question: "When completing certificates on tablet devices on site, what should you ensure?",
    options: [
      "The device doesn't need charging",
      "Data is saved locally/offline and synced when connected",
      "Only use company devices",
      "WiFi is always available on site"
    ],
    correctAnswer: 1,
    explanation: "Sites often lack reliable internet. Good electronic systems allow offline data entry with later synchronization. Ensure data saves locally so work isn't lost if connection drops. Some systems queue uploads until connectivity returns."
  },
  {
    id: 6,
    question: "How long should electronic certification records be retained?",
    options: [
      "1 year",
      "5 years",
      "Minimum 6 years recommended, ideally life of installation",
      "Only until next inspection"
    ],
    correctAnswer: 2,
    explanation: "Records should be retained for minimum 6 years for legal liability purposes, though ideally for the life of the installation. Electronic systems make long-term storage easier but require proper backup and provider reliability."
  },
  {
    id: 7,
    question: "What advantage do competent person scheme electronic systems offer?",
    options: [
      "They are cheaper than paper",
      "Automatic notification to Building Control and record keeping",
      "They don't require competent person registration",
      "Testing is not required"
    ],
    correctAnswer: 1,
    explanation: "Scheme-integrated electronic systems automatically notify Building Control (for Part P notifiable work), maintain required records for scheme compliance, and may provide audit trails for quality assurance purposes."
  },
  {
    id: 8,
    question: "When transferring paper records to electronic format, what is important?",
    options: [
      "Only recent records need transferring",
      "Accurate transcription with quality checks, retaining originals during transition",
      "Only test results need transferring",
      "Building Control must approve the transfer"
    ],
    correctAnswer: 1,
    explanation: "When digitizing records: ensure accurate transcription, implement quality checks (second person verification), retain original paper records during transition period, and consider scanning original documents as backup verification."
  },
  {
    id: 9,
    question: "What should you verify when choosing an electronic certification provider?",
    options: [
      "Only the monthly cost",
      "Data security, backup procedures, export capabilities, and long-term viability",
      "Only that they're the cheapest option",
      "Just that they have a mobile app"
    ],
    correctAnswer: 1,
    explanation: "Before committing to a provider: verify data security measures (GDPR compliance), backup and disaster recovery procedures, ability to export your data, company stability, and support availability. Your records depend on their reliability."
  },
  {
    id: 10,
    question: "Can test results be transferred directly from test equipment to electronic certificates?",
    options: [
      "This is not possible",
      "Yes, many modern systems support Bluetooth or USB data transfer from compatible instruments",
      "Only in commercial installations",
      "Only for RCD test results"
    ],
    correctAnswer: 1,
    explanation: "Many electronic certification systems integrate with test equipment, allowing direct transfer of readings via Bluetooth, USB, or WiFi. This reduces transcription errors, saves time, and provides verifiable data trails."
  },
  {
    id: 11,
    question: "What is the status of handwritten amendments on printed electronic certificates?",
    options: [
      "Always acceptable",
      "Should be avoided - amendments should be made in the electronic system and reprinted",
      "Only acceptable if initialed",
      "Required for all changes"
    ],
    correctAnswer: 1,
    explanation: "Handwritten amendments undermine the integrity of electronic certificates and may not be captured in the electronic record. Corrections should be made in the electronic system and a new certificate printed/issued. Document why changes were made."
  },
  {
    id: 12,
    question: "For hybrid approaches (some paper, some electronic), what is essential?",
    options: [
      "All records must eventually be paper",
      "Consistent organization and clear indexing so all records can be located",
      "Only electronic for new work",
      "Building Control must approve the approach"
    ],
    correctAnswer: 1,
    explanation: "If using both systems, maintain consistent organization: clear reference numbering, index linking paper and electronic records, defined procedures for which system to use when, and regular audits to ensure completeness of records."
  }
];

const faqs = [
  {
    question: "Is electronic certification mandatory?",
    answer: "No, electronic certification is not mandatory. Paper certificates remain fully valid and acceptable. The choice between electronic and paper is a business decision based on your preferences, client needs, and working practices."
  },
  {
    question: "What if my client wants a paper copy of an electronic certificate?",
    answer: "Always provide what the client needs. Electronic systems should allow printing of certificates in the standard format. Many electricians provide both an electronic copy (email) and printed hard copy to ensure client satisfaction and record keeping."
  },
  {
    question: "Can I switch between electronic providers?",
    answer: "Yes, but plan carefully. Before switching, export all records in a portable format (PDF, CSV). Verify the new provider can import or reference old records. Maintain access to old system during transition. Never lose access to historical records."
  },
  {
    question: "Do electronic certificates need physical signatures?",
    answer: "Electronic signatures are legally valid alternatives to physical signatures when properly implemented. The signature method must be secure and attributable to the signer. Some clients may request physically signed printed copies - accommodate their preferences."
  },
  {
    question: "How do I handle electronic certification on sites without internet?",
    answer: "Use systems with offline capability - enter data offline and sync later. Alternatively, record data on paper on site and enter electronically when back online. Many tablet/phone apps store data locally until connectivity is available."
  },
  {
    question: "Are there free electronic certification options?",
    answer: "Some competent person schemes include electronic certification in membership. Free standalone options exist but may lack features or support. Consider total cost of ownership including time saved, professional presentation, and record keeping benefits."
  }
];

const Level3Module5Section5_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">

      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module5-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Article Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 5.5.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Electronic vs Paper Certification Systems
          </h1>
          <p className="text-white/80">
            Choosing and using the right certification format for your business
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Both valid:</strong> Electronic and paper are legally equivalent</li>
              <li><strong>Same content:</strong> Required information is identical</li>
              <li><strong>Client needs:</strong> Provide format they can access and keep</li>
              <li><strong>Security:</strong> GDPR compliance and data protection essential</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> PDF certificates, tablet apps, paper pads</li>
              <li><strong>Use:</strong> Whichever suits your workflow and clients</li>
              <li><strong>Apply:</strong> Ensure secure storage and easy retrieval</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Compare advantages of electronic and paper systems",
              "Understand legal equivalence of both formats",
              "Implement secure electronic signature practices",
              "Plan for data backup and long-term storage",
              "Choose appropriate systems for your business",
              "Meet client needs with flexible delivery options"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Overview of Both Systems */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Overview of Both Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Both electronic and paper certification systems are legally valid methods of documenting electrical work. The choice between them depends on your working practices, client preferences, and business requirements. Many electricians use a combination of both.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Electronic Systems</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Tablet/phone apps or web-based platforms</li>
                  <li>Automatic calculations and validation</li>
                  <li>Cloud storage and easy retrieval</li>
                  <li>Integration with test equipment</li>
                  <li>Professional PDF output</li>
                  <li>Scheme database integration</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Paper Systems</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Pre-printed certificate pads</li>
                  <li>Carbon copy duplicates</li>
                  <li>No technology dependency</li>
                  <li>Works anywhere, any conditions</li>
                  <li>Familiar and straightforward</li>
                  <li>No subscription costs</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Same Content</p>
                <p className="text-white/90 text-xs">Both must contain all required information</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Same Validity</p>
                <p className="text-white/90 text-xs">Legally equivalent when properly completed</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The method of certification doesn't change what must be certified. Whether electronic or paper, all required declarations, test results, and schedules must be complete and accurate.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Advantages of Electronic Systems */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Advantages of Electronic Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electronic certification systems offer significant benefits for efficiency, accuracy, and record management. For businesses handling multiple certifications, the time savings and reduced errors can be substantial.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key benefits include:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Automatic validation:</strong> Flags missing fields, out-of-range values, impossible results</li>
                <li><strong>Calculations:</strong> Automatic Zs limits lookup, compliance checking</li>
                <li><strong>Storage:</strong> Cloud backup, searchable records, easy retrieval</li>
                <li><strong>Professional output:</strong> Consistent, clean PDF certificates</li>
                <li><strong>Integration:</strong> Direct test equipment data transfer, scheme notification</li>
                <li><strong>Audit trail:</strong> When created, modified, by whom</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-green-400/80 mb-2">Time Savers</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Pre-populated client/address details</li>
                  <li>Circuit templates for common setups</li>
                  <li>Copy previous certificates as templates</li>
                  <li>Batch printing for multiple certificates</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-green-400/80 mb-2">Error Prevention</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Mandatory field completion</li>
                  <li>Range checking on test values</li>
                  <li>Calculation verification</li>
                  <li>Legibility always consistent</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> Many electronic systems flag if you enter a Zs value that exceeds the limit for the protective device you've specified, prompting you to check the reading or device selection before completing the certificate.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Client Delivery and Storage */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Client Delivery and Storage
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Regardless of which system you use, the client must receive their certificate in a format they can access and retain for the life of the installation. Consider your clients' needs and technical abilities when choosing delivery methods.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Delivery options:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Printed hard copy:</strong> Universal, tangible, can be filed physically</li>
                <li><strong>Email PDF:</strong> Convenient, client can print if needed</li>
                <li><strong>Online portal access:</strong> Always available, but relies on service continuation</li>
                <li><strong>Both print and electronic:</strong> Belt and braces approach</li>
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Domestic</p>
                <p className="text-white/90 text-xs">Often prefer printed copy</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Commercial</p>
                <p className="text-white/90 text-xs">Usually accept electronic</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Landlords</p>
                <p className="text-white/90 text-xs">Need accessible records</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Certificates must be retained for the life of the installation. If using electronic-only delivery, ensure the client can access and store the document long-term. Elderly clients or those without computers may need printed copies.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Security and Compliance */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Security and Compliance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electronic certification systems handle personal data and must comply with data protection regulations. Security measures protect both you and your clients, and maintain the integrity of certification records.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Security requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>GDPR compliance:</strong> Personal data (names, addresses) must be protected</li>
                <li><strong>Access controls:</strong> Only authorized users can view/edit certificates</li>
                <li><strong>Tamper evidence:</strong> Changes after signing should be detectable</li>
                <li><strong>Secure signatures:</strong> Attributable to specific individuals</li>
                <li><strong>Backup systems:</strong> Data protected against loss</li>
                <li><strong>Encryption:</strong> Data protected in transit and at rest</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Provider Due Diligence</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Check their data protection policy</li>
                  <li>Verify backup procedures</li>
                  <li>Understand data export options</li>
                  <li>Assess business stability</li>
                  <li>Review terms of service</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Your Responsibilities</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Use strong passwords</li>
                  <li>Secure your devices</li>
                  <li>Regular data exports/backups</li>
                  <li>Control who has access</li>
                  <li>Report any breaches</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> If a certification provider fails or discontinues service, you need access to your records. Regularly export data in portable formats (PDF, CSV) and maintain local backups of important certificates.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Choosing a System</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Consider your typical job types and volume</li>
                <li>Evaluate total cost (subscription vs. paper pads)</li>
                <li>Check compatibility with your test equipment</li>
                <li>Assess offline capabilities for site work</li>
                <li>Review scheme integration if applicable</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Best Practices</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Complete certificates promptly while details are fresh</li>
                <li>Verify client contact details for electronic delivery</li>
                <li>Keep backup copies of all issued certificates</li>
                <li>Regularly export data from electronic systems</li>
                <li>Establish consistent file naming conventions</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Sole reliance on provider:</strong> Always maintain backup copies</li>
                <li><strong>Assuming client has email:</strong> Confirm delivery preference</li>
                <li><strong>Handwriting on printed electronic:</strong> Make changes in system</li>
                <li><strong>Weak passwords:</strong> Use strong, unique credentials</li>
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

        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Electronic System Features</p>
                <ul className="space-y-0.5">
                  <li>Offline mode for site work</li>
                  <li>Test equipment integration</li>
                  <li>Automatic validation</li>
                  <li>Data export capability</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Paper System Features</p>
                <ul className="space-y-0.5">
                  <li>No technology required</li>
                  <li>Carbon copy duplicates</li>
                  <li>Immediate client copy</li>
                  <li>No subscription costs</li>
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
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module5-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 5
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module5-section5-5-5">
              Next: Legal Responsibilities
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module5Section5_4;
