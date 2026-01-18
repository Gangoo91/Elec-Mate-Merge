import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "MCS Requirements and Certification Pathways - Renewable Energy Module 8";
const DESCRIPTION = "Learn about Microgeneration Certification Scheme requirements, certification pathways, and how to become an MCS certified installer for solar PV, heat pumps, and battery storage systems.";

const quickCheckQuestions = [
  {
    id: "mcs-check-1",
    question: "What does MCS certification primarily demonstrate?",
    options: [
      "Basic electrical competence",
      "Competence in installing microgeneration technologies to recognised standards",
      "Experience in commercial electrical work",
      "Knowledge of general building regulations"
    ],
    correctIndex: 1,
    explanation: "MCS certification demonstrates that an installer is competent to install microgeneration technologies (solar PV, heat pumps, batteries) to recognised industry standards, giving consumers confidence in quality installations."
  },
  {
    id: "mcs-check-2",
    question: "Which certification body accredits MCS installers?",
    options: [
      "NICEIC only",
      "Any electrical trade body",
      "UKAS-accredited certification bodies",
      "Local building control"
    ],
    correctIndex: 2,
    explanation: "MCS installers must be certified by UKAS-accredited certification bodies such as NICEIC, NAPIT, or HIES to ensure consistent assessment standards across the industry."
  },
  {
    id: "mcs-check-3",
    question: "What is required for customers to access government incentives like the Smart Export Guarantee?",
    options: [
      "Any qualified electrician can certify",
      "Installation by an MCS certified installer",
      "Self-certification by the homeowner",
      "Approval from the local council"
    ],
    correctIndex: 1,
    explanation: "Access to government incentives such as the Smart Export Guarantee (SEG) requires installation by an MCS certified installer, making MCS certification essential for customers seeking financial support."
  },
  {
    id: "mcs-check-4",
    question: "What ongoing requirement must MCS installers meet?",
    options: [
      "No ongoing requirements after initial certification",
      "Annual recertification only",
      "Continuous professional development and periodic surveillance audits",
      "Monthly reporting to MCS"
    ],
    correctIndex: 2,
    explanation: "MCS installers must complete continuous professional development (CPD), maintain competence records, and undergo periodic surveillance audits by their certification body to retain their certification."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the primary purpose of the Microgeneration Certification Scheme (MCS)?",
    options: [
      "To regulate electricity prices",
      "To certify microgeneration products and installer competence",
      "To provide grants for renewable energy",
      "To manage the national grid"
    ],
    correctAnswer: 1,
    explanation: "MCS is a quality assurance scheme that certifies both microgeneration products (ensuring they meet performance standards) and installer competence (ensuring installations meet quality requirements)."
  },
  {
    id: 2,
    question: "Which technologies does MCS cover?",
    options: [
      "Solar PV only",
      "Heat pumps only",
      "Solar PV, solar thermal, heat pumps, wind, hydro, and battery storage",
      "Large-scale commercial installations only"
    ],
    correctAnswer: 2,
    explanation: "MCS covers multiple microgeneration technologies including solar PV, solar thermal, heat pumps (ASHP and GSHP), small wind, micro-hydro, and battery storage systems, providing certification pathways for each."
  },
  {
    id: 3,
    question: "What training is typically required before applying for MCS certification?",
    options: [
      "No formal training required",
      "Technology-specific training from an MCS-approved training provider",
      "University degree in renewable energy",
      "Online course completion only"
    ],
    correctAnswer: 1,
    explanation: "Prospective MCS installers must complete technology-specific training from MCS-approved training providers, covering system design, installation standards, commissioning, and relevant regulations."
  },
  {
    id: 4,
    question: "What does the MCS Installation Standard (MIS) document specify?",
    options: [
      "Product pricing guidelines",
      "Marketing requirements for installers",
      "Detailed technical requirements for installation quality and safety",
      "Customer service standards only"
    ],
    correctAnswer: 2,
    explanation: "MCS Installation Standards (MIS) documents specify detailed technical requirements for installation quality, safety, performance, and compliance that all MCS certified installers must follow."
  },
  {
    id: 5,
    question: "How often do MCS certified installers typically undergo surveillance audits?",
    options: [
      "Never after initial certification",
      "Every 5 years",
      "Annually or according to certification body requirements",
      "Monthly"
    ],
    correctAnswer: 2,
    explanation: "MCS certified installers undergo regular surveillance audits, typically annually, where the certification body reviews installations, documentation, and competence to ensure ongoing compliance."
  },
  {
    id: 6,
    question: "What documentation must be provided for each MCS registered installation?",
    options: [
      "Invoice only",
      "Handover pack including commissioning records, certificates, warranties, and user guides",
      "Photograph only",
      "Verbal confirmation"
    ],
    correctAnswer: 1,
    explanation: "Every MCS installation requires a comprehensive handover pack including commissioning records, MCS certificate, product warranties, user operating guides, and maintenance schedules."
  },
  {
    id: 7,
    question: "What is the MCS database used for?",
    options: [
      "Marketing purposes only",
      "Registering certified installations and enabling access to government schemes",
      "Storing customer payment details",
      "Tracking installer locations"
    ],
    correctAnswer: 1,
    explanation: "The MCS database records all certified installations, providing verification for customers and enabling access to government incentive schemes like the Smart Export Guarantee."
  },
  {
    id: 8,
    question: "What happens if an MCS installer fails to meet scheme requirements?",
    options: [
      "Nothing - certification is permanent",
      "Verbal warning only",
      "Suspension or withdrawal of certification with potential re-assessment requirements",
      "Automatic transfer to another certification body"
    ],
    correctAnswer: 2,
    explanation: "Non-compliance can result in suspension or withdrawal of MCS certification. Installers may need to address non-conformities, undergo re-assessment, or face removal from the scheme."
  },
  {
    id: 9,
    question: "Which insurance requirement applies to MCS certified installers?",
    options: [
      "No insurance required",
      "Basic public liability only",
      "Public liability, professional indemnity, and appropriate workmanship warranties",
      "Health insurance only"
    ],
    correctAnswer: 2,
    explanation: "MCS installers must maintain adequate public liability insurance, professional indemnity insurance, and offer appropriate workmanship warranties/guarantees to protect consumers."
  },
  {
    id: 10,
    question: "What is the benefit of MCS certification for consumers?",
    options: [
      "Lower equipment costs only",
      "Quality assurance, access to incentives, and consumer protection mechanisms",
      "Faster installation times",
      "No planning permission required"
    ],
    correctAnswer: 1,
    explanation: "MCS certification provides consumers with quality assurance through certified products and installers, access to government incentives, warranty protection, and dispute resolution mechanisms."
  }
];

const faqs = [
  {
    question: "How long does it take to become MCS certified?",
    answer: "The timeline varies depending on your existing qualifications. Typically, completing approved training takes 3-5 days per technology, followed by application processing and initial assessment which can take 4-8 weeks. Some installers achieve certification within 3 months, while others may take 6 months or more depending on their experience level and assessment scheduling."
  },
  {
    question: "Can I be MCS certified for multiple technologies?",
    answer: "Yes, you can hold MCS certification for multiple technologies simultaneously. Each technology requires separate training, assessment, and certification. Many installers hold certifications for complementary technologies such as solar PV and battery storage, or heat pumps and solar thermal, allowing them to offer comprehensive renewable energy solutions."
  },
  {
    question: "What are the costs involved in MCS certification?",
    answer: "Costs include approved training courses (typically 500-1500 per technology), certification body application and assessment fees (varying by body), annual certification fees, and ongoing costs for insurance, CPD, and surveillance audits. Total initial costs typically range from 2000-5000 depending on the technology and certification body chosen."
  },
  {
    question: "Do I need to be an electrician to become MCS certified for solar PV?",
    answer: "While you do not need to be a fully qualified electrician, you must demonstrate electrical competence. Many installers hold qualifications such as NVQ Level 3 Electrical, City & Guilds 2365/2357, or equivalent. You must also be able to self-certify electrical work under Part P or work under supervision of a competent person scheme member."
  },
  {
    question: "What happens if I receive a customer complaint about an MCS installation?",
    answer: "MCS has a Consumer Code that requires installers to have complaints procedures in place. If complaints cannot be resolved directly, customers can access MCS dispute resolution services. Serious or repeated complaints may trigger additional surveillance visits or affect your certification status. Maintaining high installation standards and good customer communication helps prevent complaints."
  },
  {
    question: "How do I maintain my MCS certification once obtained?",
    answer: "Maintaining certification requires completing annual CPD requirements, passing surveillance audits, maintaining required insurance levels, correctly registering all installations on the MCS database, following current MIS standards, and promptly addressing any non-conformities identified. Annual fees must also be paid to your certification body."
  }
];

const RenewableEnergyModule8Section1 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-white/10">
        <div className="px-4 py-3 flex items-center gap-3">
          <Link to="/electrician/upskilling/renewable-energy-module-8">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <span className="text-white font-medium truncate">MCS Requirements and Certification Pathways</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="px-4 py-6 text-center">
        <div className="inline-flex items-center gap-2 bg-elec-yellow/10 border border-elec-yellow/30 rounded-full px-3 py-1 mb-3">
          <Zap className="w-4 h-4 text-elec-yellow" />
          <span className="text-elec-yellow text-sm font-medium">Module 8 - Section 1</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          MCS Requirements and Certification Pathways
        </h1>
        <p className="text-white/70 text-sm sm:text-base max-w-xl mx-auto">
          The Microgeneration Certification Scheme - your pathway to certified renewable energy installation
        </p>
      </div>

      {/* Quick Summary */}
      <div className="px-4 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">Quality Assurance:</span> MCS ensures installers meet recognised industry standards
            </p>
          </div>
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">Consumer Access:</span> Required for customers to access government incentives
            </p>
          </div>
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">Multiple Technologies:</span> Covers solar PV, heat pumps, wind, and battery storage
            </p>
          </div>
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">Ongoing Compliance:</span> Requires CPD and regular surveillance audits
            </p>
          </div>
        </div>
      </div>

      {/* Learning Outcomes */}
      <div className="px-4 pb-6">
        <h2 className="text-lg font-semibold text-white mb-3">What You Will Learn</h2>
        <div className="space-y-2">
          {[
            "Purpose and benefits of MCS certification",
            "Technologies covered by the MCS scheme",
            "Certification pathways and requirements",
            "Training and assessment processes",
            "Ongoing compliance and maintenance"
          ].map((outcome, index) => (
            <div key={index} className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-elec-yellow mt-0.5 shrink-0" />
              <span className="text-white/80 text-sm">{outcome}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 space-y-6 pb-8">
        {/* Section 01 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">01</span>
            <h2 className="text-xl font-semibold text-white">Understanding MCS</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              The Microgeneration Certification Scheme (MCS) is an industry-led quality assurance scheme that certifies both microgeneration products and the competence of installers. Established to give consumers confidence in renewable energy installations, MCS has become the recognised standard across the UK.
            </p>
            <p>
              MCS serves two primary functions: certifying that products meet stringent performance and safety standards, and certifying that installers have the competence to design, install, and commission systems correctly. This dual approach ensures that quality is maintained throughout the entire supply chain.
            </p>
            <p>
              For installers, MCS certification opens significant business opportunities. It is a requirement for customers wishing to access government incentives such as the Smart Export Guarantee (SEG), Boiler Upgrade Scheme, and various local authority grants. Without MCS certification, customers cannot benefit from these financial support mechanisms.
            </p>
            <p>
              The scheme is overseen by a board including industry representatives and consumer groups, ensuring that standards remain relevant and protect both installers and customers. Regular updates to installation standards reflect technological advances and lessons learned from the field.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[0]]} />

        {/* Section 02 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">02</span>
            <h2 className="text-xl font-semibold text-white">Technologies Covered</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              MCS covers a comprehensive range of microgeneration technologies, each with specific installation standards (MIS documents) that define requirements for design, installation, commissioning, and documentation.
            </p>
            <p>
              <span className="text-white font-medium">Solar Photovoltaics (MIS 3002):</span> The most common MCS technology, covering domestic and small commercial PV installations. The standard addresses system design, structural considerations, electrical safety, and performance requirements.
            </p>
            <p>
              <span className="text-white font-medium">Heat Pumps (MIS 3005):</span> Covering air source heat pumps (ASHP), ground source heat pumps (GSHP), and water source heat pumps. This standard includes heat loss calculations, system sizing, refrigerant handling, and integration with heating systems.
            </p>
            <p>
              <span className="text-white font-medium">Battery Storage (MIS 3012):</span> A newer addition addressing the growing battery storage market. This covers electrical safety, fire risk management, system integration with PV and grid connections, and appropriate isolation arrangements.
            </p>
            <p>
              <span className="text-white font-medium">Solar Thermal (MIS 3001):</span> Solar hot water systems using collectors to heat water. The standard covers collector selection, cylinder sizing, frost protection, and integration with existing heating systems.
            </p>
            <p>
              Additional technologies include small wind turbines (MIS 3003), biomass heating (MIS 3004), and micro-hydro (MIS 3006), each with their own specific standards and certification requirements.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[1]]} />

        {/* Section 03 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">03</span>
            <h2 className="text-xl font-semibold text-white">Certification Bodies and Process</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              MCS certification is delivered through UKAS-accredited certification bodies. These include well-known organisations such as NICEIC, NAPIT, HIES, and others who are authorised to assess installers against MCS requirements.
            </p>
            <p>
              <span className="text-white font-medium">Choosing a Certification Body:</span> While all certification bodies assess against the same MCS standards, they may differ in their fee structures, support services, and additional benefits. Research options carefully and consider factors such as existing memberships, geographic coverage, and customer service reputation.
            </p>
            <p>
              <span className="text-white font-medium">The Certification Process:</span> After completing approved training, you apply to your chosen certification body. The application requires evidence of qualifications, training certificates, insurance documentation, and business credentials. The certification body reviews your application and schedules an initial assessment.
            </p>
            <p>
              <span className="text-white font-medium">Initial Assessment:</span> This typically involves a witnessed installation where an assessor observes your work on a live project, reviewing design decisions, installation quality, safety practices, and documentation. You may also face technical questioning to demonstrate understanding.
            </p>
            <p>
              Upon successful assessment, you receive MCS certification for the specific technology assessed. Your company is added to the MCS Installer Directory, and you can begin registering installations on the MCS database.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[2]]} />

        {/* Section 04 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">04</span>
            <h2 className="text-xl font-semibold text-white">Training Requirements</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              MCS requires installers to complete technology-specific training from approved training providers before certification. This training ensures you understand the relevant MIS standards and can apply them correctly in practice.
            </p>
            <p>
              <span className="text-white font-medium">Solar PV Training:</span> Typically 3-5 days covering system design, DC electrical safety, string sizing, inverter selection, G98/G99 requirements, structural considerations, and commissioning procedures. Practical exercises reinforce theoretical knowledge.
            </p>
            <p>
              <span className="text-white font-medium">Heat Pump Training:</span> Comprehensive courses covering thermodynamics, heat loss calculations, system design, refrigerant handling (F-Gas requirements), controls integration, and MCS heat pump standard requirements. Courses typically run 5-10 days depending on depth.
            </p>
            <p>
              <span className="text-white font-medium">Battery Storage Training:</span> Addresses energy storage principles, battery chemistry and safety, system sizing, AC/DC coupling options, integration with PV and grid, fire safety requirements, and the specific requirements of MIS 3012.
            </p>
            <p>
              <span className="text-white font-medium">Prerequisites:</span> Most training providers require relevant background qualifications. For electrical technologies, this typically means proven electrical competence. For heat pumps, plumbing and heating backgrounds are advantageous but not always mandatory.
            </p>
            <p>
              Training providers must be approved by MCS to deliver certification-qualifying courses. Approved providers are listed on the MCS website, and completion certificates from these providers are required as part of your certification application.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[3]]} />

        {/* Section 05 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">05</span>
            <h2 className="text-xl font-semibold text-white">Maintaining Certification</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              MCS certification is not a one-time achievement but requires ongoing commitment to quality and professional development. Certification bodies conduct regular surveillance to ensure continued compliance with scheme requirements.
            </p>
            <p>
              <span className="text-white font-medium">Surveillance Audits:</span> Typically annual, these audits review a sample of your installations, checking documentation, workmanship, and compliance with current standards. Auditors may visit installed systems, review your processes, and verify that installations match your records.
            </p>
            <p>
              <span className="text-white font-medium">Continuous Professional Development:</span> MCS requires installers to maintain and develop their competence. This includes staying current with standard updates, attending relevant training, and demonstrating ongoing learning. Your certification body will specify CPD requirements.
            </p>
            <p>
              <span className="text-white font-medium">Installation Registration:</span> All MCS installations must be registered on the MCS database within specified timeframes. This creates an auditable record and enables customers to access incentive schemes. Failure to register installations correctly can affect your certification status.
            </p>
            <p>
              <span className="text-white font-medium">Insurance and Warranties:</span> You must maintain appropriate insurance levels and offer workmanship warranties that meet scheme requirements. Your certification body will verify these during annual renewals.
            </p>
            <p>
              <span className="text-white font-medium">Responding to Changes:</span> When MIS standards are updated, you must implement changes within specified transition periods. Certification bodies provide guidance on significant changes and may require additional training for major updates.
            </p>
          </div>
        </section>

        {/* Practical Guidance */}
        <div className="bg-gradient-to-r from-elec-yellow/10 to-amber-500/10 border border-elec-yellow/20 rounded-xl p-4">
          <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
            <Zap className="w-4 h-4 text-elec-yellow" />
            Practical Guidance
          </h3>
          <div className="space-y-2 text-white/80 text-sm">
            <p>
              <span className="text-white font-medium">Start with one technology:</span> Rather than attempting multiple certifications simultaneously, focus on achieving competence and certification in one technology first. This allows you to build experience and reputation before expanding your offerings.
            </p>
            <p>
              <span className="text-white font-medium">Document everything:</span> Good documentation practices from the start make surveillance audits straightforward. Use consistent templates, take photographs at key stages, and maintain organised records of every installation.
            </p>
            <p>
              <span className="text-white font-medium">Network with other installers:</span> Join industry groups, attend trade events, and connect with experienced MCS installers. Sharing knowledge and experiences helps you improve your practice and stay informed about industry developments.
            </p>
          </div>
        </div>

        {/* FAQs */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h3 className="text-white font-medium mb-2">{faq.question}</h3>
                <p className="text-white/70 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz
          title="MCS Requirements and Certification Quiz"
          questions={quizQuestions}
        />

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center pt-4 border-t border-white/10">
          <Link to="/electrician/upskilling/renewable-energy-module-8">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Button>
          </Link>
          <Link to="../section-2">
            <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule8Section1;
