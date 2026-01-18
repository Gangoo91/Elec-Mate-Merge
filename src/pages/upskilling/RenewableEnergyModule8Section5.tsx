import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Handover Documentation & Operation Manuals - Renewable Energy Module 8";
const DESCRIPTION = "Learn to prepare comprehensive handover documentation and operation manuals for solar PV, battery storage, and heat pump installations that meet MCS requirements and customer needs.";

const quickCheckQuestions = [
  {
    id: "handover-check-1",
    question: "What is the primary purpose of handover documentation?",
    options: [
      "Legal protection for the installer",
      "To enable the customer to safely operate, maintain, and understand their system",
      "Marketing material for future sales",
      "Regulatory requirement only"
    ],
    correctIndex: 1,
    explanation: "Handover documentation enables customers to safely operate and maintain their system, understand its performance, and access support when needed. It empowers informed ownership."
  },
  {
    id: "handover-check-2",
    question: "Which document must be included in every MCS installation handover?",
    options: [
      "Marketing brochures",
      "MCS Installation Certificate",
      "Installer's business plan",
      "DNO approval letter"
    ],
    correctIndex: 1,
    explanation: "The MCS Installation Certificate is mandatory for all MCS registered installations. It confirms the installation meets MCS standards and enables access to incentive schemes."
  },
  {
    id: "handover-check-3",
    question: "What information should the system performance estimate include?",
    options: [
      "Only the total system cost",
      "Expected annual generation/savings and key assumptions used",
      "Competitor comparisons",
      "Future price predictions"
    ],
    correctIndex: 1,
    explanation: "Performance estimates should include expected annual generation or savings along with the assumptions used (location, orientation, shading, consumption patterns), enabling customers to verify system performance."
  },
  {
    id: "handover-check-4",
    question: "How long should customers retain handover documentation?",
    options: [
      "1 year",
      "5 years",
      "For the lifetime of the system",
      "Until the warranty expires"
    ],
    correctIndex: 2,
    explanation: "Handover documentation should be retained for the lifetime of the system. It is needed for maintenance, warranty claims, property sales, and demonstrating compliance with regulations."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What electrical certification must be included in PV system handover?",
    options: [
      "Visual inspection report only",
      "Electrical Installation Certificate (EIC) with test results",
      "PAT test certificate",
      "Fuse board photograph only"
    ],
    correctAnswer: 1,
    explanation: "An Electrical Installation Certificate (EIC) with full test results is required for new electrical installations. This confirms compliance with BS 7671 and documents inspection and testing."
  },
  {
    id: 2,
    question: "What commissioning data should be recorded for a solar PV system?",
    options: [
      "Only the installation date",
      "String voltages, currents, insulation resistance, and inverter parameters",
      "Panel serial numbers only",
      "Roof measurements"
    ],
    correctAnswer: 1,
    explanation: "Commissioning records should include string open-circuit voltages, operating currents, insulation resistance measurements, earth continuity, and inverter commissioning parameters."
  },
  {
    id: 3,
    question: "What warranty documentation should be included in handover?",
    options: [
      "Verbal warranty only",
      "Product warranties, workmanship warranty, and warranty registration details",
      "Warranty exclusions only",
      "Manufacturer contact details only"
    ],
    correctAnswer: 1,
    explanation: "Handover should include all product warranties (panels, inverter, batteries), the installer's workmanship warranty, and any warranty registration details or certificates."
  },
  {
    id: 4,
    question: "What user guide content is essential for heat pump installations?",
    options: [
      "Technical specifications only",
      "Operating instructions, thermostat controls, and efficiency tips",
      "Installation photographs only",
      "Manufacturer history"
    ],
    correctAnswer: 1,
    explanation: "Heat pump user guides should explain how to operate the system, set thermostats and timers, optimise efficiency, and identify when professional service is needed."
  },
  {
    id: 5,
    question: "What maintenance schedule information should be provided?",
    options: [
      "No maintenance schedule needed",
      "Recommended maintenance intervals and tasks, plus professional service requirements",
      "Only cleaning instructions",
      "Emergency repairs only"
    ],
    correctAnswer: 1,
    explanation: "Maintenance schedules should specify customer tasks (cleaning, visual checks), recommended professional service intervals, and what each maintenance visit should include."
  },
  {
    id: 6,
    question: "What information enables customers to monitor system performance?",
    options: [
      "Installation cost only",
      "Monitoring app details, expected performance data, and interpretation guidance",
      "Installer's profit margin",
      "Competitor system data"
    ],
    correctAnswer: 1,
    explanation: "Customers need monitoring system access details, expected performance benchmarks (seasonal variations), and guidance on interpreting data to identify potential issues."
  },
  {
    id: 7,
    question: "What Building Regulations documentation should be included?",
    options: [
      "No building regulations documentation",
      "Part P compliance certificate or building control approval as applicable",
      "Planning permission only",
      "Council tax records"
    ],
    correctAnswer: 1,
    explanation: "Part P compliance documentation (self-certification certificate or building control approval) must be included, confirming the electrical installation meets Building Regulations."
  },
  {
    id: 8,
    question: "What safety information must be clearly communicated at handover?",
    options: [
      "Marketing safety claims",
      "Emergency shutdown procedures and isolation switch locations",
      "General home safety",
      "Vehicle safety"
    ],
    correctAnswer: 1,
    explanation: "Customers must understand emergency shutdown procedures, isolation switch locations, when to use them, and what information to give emergency services if needed."
  },
  {
    id: 9,
    question: "What system diagrams should be included in documentation?",
    options: [
      "Artistic impressions only",
      "Single line diagrams and layout drawings showing component locations",
      "Marketing graphics",
      "Generic industry diagrams"
    ],
    correctAnswer: 1,
    explanation: "Documentation should include single line electrical diagrams and layout drawings showing equipment locations, cable routes, and isolation points specific to the installation."
  },
  {
    id: 10,
    question: "How should handover documentation be presented to customers?",
    options: [
      "Verbal explanation only",
      "Organised folder with clear sections, walkthrough explanation, and contact details",
      "Posted after installation",
      "Digital only with no explanation"
    ],
    correctAnswer: 1,
    explanation: "Documentation should be presented in an organised format, explained in a handover meeting, and include installer contact details for future support. Both physical and digital copies are ideal."
  }
];

const faqs = [
  {
    question: "What if the customer loses their handover documentation?",
    answer: "Installers should retain copies of all documentation and be able to provide duplicates. MCS requires installers to maintain records for a minimum period. Customers should store documentation safely, and digital copies provide backup protection. Key documents like MCS certificates can be verified through the MCS database."
  },
  {
    question: "How do I explain complex technical information to customers?",
    answer: "Use plain language in user guides, avoiding jargon where possible. Include diagrams and photographs to illustrate key points. During handover, demonstrate operation rather than just describing it. Provide manufacturer user guides alongside your own documentation. Offer a follow-up call or visit if customers have questions after living with the system."
  },
  {
    question: "What handover documentation is required for battery storage systems?",
    answer: "Battery handover should include the MCS certificate (if MCS registered), commissioning data, product warranty and registration, user operating guide, safety information including fire safety, maintenance requirements, monitoring setup, and emergency procedures. Location-specific risk assessments may also be relevant."
  },
  {
    question: "How do I document performance expectations accurately?",
    answer: "Use recognised calculation methodologies (MCS performance estimation, SAP calculations for heat pumps) and clearly state your assumptions. Document factors that can affect performance (shading, orientation, consumption patterns). Explain that estimates are based on typical conditions and actual performance will vary. Avoid guaranteeing specific outputs."
  },
  {
    question: "What ongoing support should I offer customers?",
    answer: "Include clear contact details for technical support and warranty issues. Specify response times for different types of queries. Offer maintenance services and explain how to book them. Some installers provide monitoring services that proactively identify issues. Clear communication about support availability builds customer confidence."
  },
  {
    question: "Do I need to provide documentation in multiple formats?",
    answer: "Providing both physical and digital documentation is best practice. Physical folders are accessible during power outages and for those less comfortable with technology. Digital copies enable customers to access information on mobile devices and provide backup. MCS accepts either format for compliance purposes."
  }
];

const RenewableEnergyModule8Section5 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-white/10">
        <div className="px-4 py-3 flex items-center gap-3">
          <Link to="..">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <span className="text-white font-medium truncate">Handover Documentation</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="px-4 py-6 text-center">
        <div className="inline-flex items-center gap-2 bg-elec-yellow/10 border border-elec-yellow/30 rounded-full px-3 py-1 mb-3">
          <Zap className="w-4 h-4 text-elec-yellow" />
          <span className="text-elec-yellow text-sm font-medium">Module 8 - Section 5</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Handover Documentation & Operation Manuals
        </h1>
        <p className="text-white/70 text-sm sm:text-base max-w-xl mx-auto">
          Creating comprehensive documentation that empowers customers
        </p>
      </div>

      {/* Quick Summary */}
      <div className="px-4 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">Complete Pack:</span> All certificates, warranties, and user guides
            </p>
          </div>
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">Clear Language:</span> Plain English with visual aids
            </p>
          </div>
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">Walkthrough:</span> Demonstrate operation at handover
            </p>
          </div>
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">Lifetime Record:</span> Documentation for system life
            </p>
          </div>
        </div>
      </div>

      {/* Learning Outcomes */}
      <div className="px-4 pb-6">
        <h2 className="text-lg font-semibold text-white mb-3">What You Will Learn</h2>
        <div className="space-y-2">
          {[
            "Required documentation for MCS compliance",
            "Creating effective user guides and manuals",
            "Commissioning records and test data",
            "Warranty documentation and registration",
            "Conducting effective handover meetings"
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
            <h2 className="text-xl font-semibold text-white">Documentation Requirements</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Comprehensive handover documentation is both a professional obligation and an MCS requirement. It enables customers to understand, operate, and maintain their systems throughout their working life.
            </p>
            <p>
              <span className="text-white font-medium">MCS Certificate:</span> The MCS Installation Certificate confirms the installation meets MCS standards. It includes unique installation reference numbers that enable verification through the MCS database and are required for accessing incentive schemes like the Smart Export Guarantee.
            </p>
            <p>
              <span className="text-white font-medium">Electrical Certificates:</span> Electrical Installation Certificates (EIC) with full test results demonstrate compliance with BS 7671. These must be completed by a competent person and include all required test measurements.
            </p>
            <p>
              <span className="text-white font-medium">Building Regulations:</span> Part P compliance documentation (either self-certification certificate from a competent person scheme or building control approval) must be provided for notifiable electrical work.
            </p>
            <p>
              <span className="text-white font-medium">DNO Documentation:</span> Copies of G98 notifications or G99 approvals demonstrate that the system is correctly registered with the Distribution Network Operator.
            </p>
            <p>
              <span className="text-white font-medium">Product Documentation:</span> Include manufacturer documentation for all major components: panels, inverters, batteries, mounting systems, and any other significant equipment.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[0]]} />

        {/* Section 02 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">02</span>
            <h2 className="text-xl font-semibold text-white">User Guides and Operation Manuals</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              User guides translate technical systems into practical information that customers can understand and use. Good user guides reduce support calls and help customers get the best from their systems.
            </p>
            <p>
              <span className="text-white font-medium">System Overview:</span> Explain what components are installed and where they are located. Use photographs and simple diagrams. Describe how the system works in general terms without overwhelming technical detail.
            </p>
            <p>
              <span className="text-white font-medium">Operation Instructions:</span> For systems with user controls, explain how to use them. Include display meanings, alarm indications, and normal operating parameters. For heat pumps, cover thermostat programming and optimisation.
            </p>
            <p>
              <span className="text-white font-medium">Monitoring Guidance:</span> Explain how to access and interpret monitoring data. Include login details for monitoring apps or portals. Describe what to look for to verify the system is working correctly and what might indicate a problem.
            </p>
            <p>
              <span className="text-white font-medium">Safety Information:</span> Clearly explain emergency shutdown procedures, isolation switch locations, and when customers should contact professionals rather than attempting to resolve issues themselves.
            </p>
            <p>
              <span className="text-white font-medium">Troubleshooting:</span> Provide simple troubleshooting guidance for common issues. Include when to reset the system, what warning lights mean, and when to call for professional support.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[1]]} />

        {/* Section 03 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">03</span>
            <h2 className="text-xl font-semibold text-white">Commissioning Records</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Commissioning records document the system's condition at installation, providing baseline data for future maintenance and troubleshooting. They also demonstrate that proper commissioning was performed.
            </p>
            <p>
              <span className="text-white font-medium">Solar PV Commissioning:</span> Record string open-circuit voltages (Voc), string short-circuit currents (Isc), operating voltages and currents under load, insulation resistance measurements, and earth continuity. Document inverter commissioning parameters and settings.
            </p>
            <p>
              <span className="text-white font-medium">Battery Systems:</span> Record initial state of charge, commissioning test results, configured settings (charge/discharge rates, time-of-use schedules), and communication setup verification.
            </p>
            <p>
              <span className="text-white font-medium">Heat Pumps:</span> Document flow temperatures, pressure readings, refrigerant charge verification, control system programming, and initial performance measurements. Include heat loss calculations and system sizing documentation.
            </p>
            <p>
              <span className="text-white font-medium">Photographs:</span> Include photographs of the installation showing component locations, labels, isolation switches, and general workmanship. These support maintenance visits and warranty claims.
            </p>
            <p>
              <span className="text-white font-medium">Serial Numbers:</span> Record serial numbers for all major components. This information is essential for warranty claims and product safety notifications.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[2]]} />

        {/* Section 04 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">04</span>
            <h2 className="text-xl font-semibold text-white">Warranties and Maintenance</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Warranty documentation protects customers' investments and clarifies responsibilities. Maintenance information helps customers keep their systems in optimal condition.
            </p>
            <p>
              <span className="text-white font-medium">Product Warranties:</span> Include warranty documents for all major components. Explain warranty periods, what is covered, and any registration requirements. Some warranties require registration within a specified period to be valid.
            </p>
            <p>
              <span className="text-white font-medium">Workmanship Warranty:</span> Provide your workmanship warranty terms, explaining what is covered, for how long, and how to make a claim. MCS requires certain minimum warranty provisions.
            </p>
            <p>
              <span className="text-white font-medium">Insurance-Backed Guarantees:</span> If applicable, include details of any insurance-backed guarantees that provide protection if the installer is no longer trading.
            </p>
            <p>
              <span className="text-white font-medium">Maintenance Schedule:</span> Specify recommended maintenance activities and intervals. Include customer tasks (visual inspections, cleaning) and professional maintenance requirements. Explain that maintenance may be required to maintain warranties.
            </p>
            <p>
              <span className="text-white font-medium">Service Contact:</span> Provide clear contact information for maintenance bookings, technical support, and emergency assistance. Include normal response times and out-of-hours provisions.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[3]]} />

        {/* Section 05 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">05</span>
            <h2 className="text-xl font-semibold text-white">Conducting Handover Meetings</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              The handover meeting is your opportunity to ensure customers understand their system and feel confident operating it. A well-conducted handover reduces future support calls and increases customer satisfaction.
            </p>
            <p>
              <span className="text-white font-medium">Preparation:</span> Assemble all documentation in an organised folder with clear sections. Test that monitoring systems are working and accessible. Prepare any demonstration materials needed.
            </p>
            <p>
              <span className="text-white font-medium">Physical Walkthrough:</span> Show customers where all components are located. Demonstrate isolation switches and explain when to use them. Point out labels and their meanings. If safe and appropriate, show inside the consumer unit.
            </p>
            <p>
              <span className="text-white font-medium">System Demonstration:</span> Show monitoring apps or displays in action. Explain what normal operation looks like. For heat pumps, demonstrate thermostat programming. Answer questions about day-to-day operation.
            </p>
            <p>
              <span className="text-white font-medium">Documentation Review:</span> Walk through the documentation pack, explaining each section's purpose. Highlight important information like emergency procedures and contact details. Explain where to find specific information when needed.
            </p>
            <p>
              <span className="text-white font-medium">Questions and Follow-Up:</span> Allow plenty of time for questions. Reassure customers that questions after they have lived with the system are normal. Explain your follow-up support and how to contact you. Some installers offer a follow-up call a few weeks after installation.
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
              <span className="text-white font-medium">Professional presentation:</span> Quality documentation folders with your branding create a professional impression. This is your final customer touchpoint - make it count.
            </p>
            <p>
              <span className="text-white font-medium">Digital backup:</span> Provide digital copies via email or USB drive. Customers can access these from smartphones when physical documents are not to hand.
            </p>
            <p>
              <span className="text-white font-medium">Template systems:</span> Develop standard templates for your documentation. This ensures consistency, saves time, and reduces the risk of omitting important information.
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
          title="Handover Documentation Quiz"
          questions={quizQuestions}
        />

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center pt-4 border-t border-white/10">
          <Link to="../section-4">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Button>
          </Link>
          <Link to="/study-centre/upskilling/renewable-energy-course">
            <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
              Back to Course
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule8Section5;
