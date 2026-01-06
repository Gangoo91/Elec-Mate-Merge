import { ArrowLeft, ArrowRight, Package, Target, CheckCircle, AlertTriangle, Cloud, Lock, Database, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Site Documentation Storage and Access - Module 5.7.5 | Level 2 Electrical Course";
const DESCRIPTION = "Learn about proper storage and access of site documentation for electrical installations. Understand best practices for managing drawings, certificates, and records.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "Name one type of site documentation that must be stored.",
    options: ["Shopping lists", "Drawings and as-builts", "Personal notes", "Weather reports"],
    correctIndex: 1,
    explanation: "Drawings and as-builts are critical site documentation that must be properly stored, along with specifications, test certificates, RAMS, and manufacturer instructions."
  },
  {
    id: 2,
    question: "True or False: Out-of-date drawings can be used as long as they are close to the final design.",
    options: ["True - close enough is acceptable", "False - only current versions should be used", "True - if no other copies available", "False - but only for large projects"],
    correctIndex: 1,
    explanation: "False. Only current, up-to-date versions of drawings should be used. Out-of-date drawings can lead to serious mistakes and compliance issues."
  },
  {
    id: 3,
    question: "Give one benefit of digital storage.",
    options: ["Takes up physical space", "Easy backup and instant access", "Requires no maintenance", "Cannot be shared"],
    correctIndex: 1,
    explanation: "Digital storage provides easy backup, instant access, version control, and can be shared with multiple team members simultaneously."
  }
];

export default function Module5Section7_5() {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "Name one type of site documentation that must be stored.",
      options: [
        "Personal diary entries",
        "Drawings, specifications, test certificates, RAMS, manufacturer instructions",
        "Lunch menus",
        "Personal contact lists"
      ],
      correctAnswer: 1,
      explanation: "Essential site documentation includes drawings, specifications, test certificates, RAMS, and manufacturer instructions."
    },
    {
      id: 2,
      question: "What is the purpose of test certificates?",
      options: [
        "To look professional",
        "To verify safety and compliance of installations",
        "To increase project costs",
        "For filing purposes only"
      ],
      correctAnswer: 1,
      explanation: "Test certificates verify safety and compliance of electrical installations, providing proof that work meets required standards."
    },
    {
      id: 3,
      question: "True or False: Out-of-date drawings can be used as long as they are close to the final design.",
      options: [
        "True - close enough is acceptable",
        "False - only current versions should be used",
        "True - saves time and effort",
        "False - but only on large projects"
      ],
      correctAnswer: 1,
      explanation: "False. Only current, up-to-date versions should be used. Out-of-date drawings can lead to serious mistakes and compliance issues."
    },
    {
      id: 4,
      question: "What is one risk of poor physical document storage?",
      options: [
        "Documents look untidy",
        "Loss or damage from water, fire, or misplacement",
        "Takes too much time to organise",
        "Costs too much money"
      ],
      correctAnswer: 1,
      explanation: "Poor physical storage can lead to loss or damage from water, fire, theft, or misplacement of critical documents."
    },
    {
      id: 5,
      question: "Give one benefit of digital storage.",
      options: [
        "Takes up more space",
        "Easy backup, instant access, version control",
        "Requires constant internet",
        "Cannot be shared"
      ],
      correctAnswer: 1,
      explanation: "Digital storage provides easy backup, instant access, version control, and sharing capabilities with multiple team members."
    },
    {
      id: 6,
      question: "What is the correct way to issue drawings to site staff?",
      options: [
        "Any available version",
        "Ensure they are the latest, stamped/dated copies",
        "Handwritten copies only",
        "Photocopies without dates"
      ],
      correctAnswer: 1,
      explanation: "Only the latest versions should be issued, clearly stamped or dated to ensure everyone is working from current information."
    },
    {
      id: 7,
      question: "In the real-world scenario, what caused project delays?",
      options: [
        "Equipment failure",
        "Paper drawings were destroyed by water damage, with no backups available",
        "Staff shortage",
        "Material delivery delays"
      ],
      correctAnswer: 1,
      explanation: "The project was delayed because paper drawings were destroyed by water damage and no digital backups existed."
    },
    {
      id: 8,
      question: "Who should have editing rights for site documents?",
      options: [
        "Everyone on site",
        "Authorised supervisors/managers only",
        "Only the client",
        "Any electrician"
      ],
      correctAnswer: 1,
      explanation: "Only authorised supervisors or managers should have editing rights to maintain document control and prevent unauthorised changes."
    },
    {
      id: 9,
      question: "Why should documents be accessible to all relevant team members?",
      options: [
        "To increase paperwork",
        "To allow safe, compliant, and efficient working",
        "To create more work",
        "For entertainment purposes"
      ],
      correctAnswer: 1,
      explanation: "Document access enables safe, compliant, and efficient working by ensuring all team members have the information they need."
    },
    {
      id: 10,
      question: "List one best practice for protecting physical copies of documents.",
      options: [
        "Leave them in the van",
        "Store in waterproof folders or locked site cabinets",
        "Keep them in your pocket",
        "Store outside in the weather"
      ],
      correctAnswer: 1,
      explanation: "Physical documents should be stored in waterproof folders or locked site cabinets to protect from damage and unauthorised access."
    }
  ];

  const faqs = [
    {
      question: "What happens if I lose important site documents?",
      answer: "Lost documents can cause serious delays while replacements are obtained. Always maintain backups and follow proper storage procedures. Report losses immediately to site management."
    },
    {
      question: "Can I take photos of drawings instead of carrying physical copies?",
      answer: "Photos can be useful for quick reference, but ensure they're clear and current. Physical or official digital copies should still be maintained for formal reference and compliance purposes."
    },
    {
      question: "Who controls which version of documents are current on site?",
      answer: "Usually the site engineer, project manager, or document controller. They manage version control and ensure only current documents are in circulation."
    },
    {
      question: "How long should site documents be kept after project completion?",
      answer: "Follow company policy and regulatory requirements. Some documents like test certificates may need to be kept for many years for warranty and compliance purposes."
    },
    {
      question: "What should I do if I find an out-of-date drawing being used?",
      answer: "Stop the work if it affects safety or compliance. Inform the supervisor immediately and ensure the correct current version is obtained before continuing work."
    }
  ];

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Top header bar */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Button variant="ghost" className="text-white hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 7
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg ">
              <Package className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              Subsection 7.5
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Site Documentation Storage and Access
          </h1>
          <p className="text-white">
            Learn proper storage and access methods for site documentation to ensure safety, compliance, and efficiency in electrical installations.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Site documentation is only useful if properly stored and accessible.</li>
                <li>Drawings, certificates, and records must be organised for easy reference.</li>
                <li>Poor storage leads to delays, mistakes, and potential accidents.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Secure filing systems, digital backups, version control.</li>
                <li><strong>Use:</strong> Controlled access, waterproof storage, current documents only.</li>
                <li><strong>Check:</strong> Document availability, backup systems, access permissions.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-base text-white">
            <li>Identify different types of site documentation that need to be stored securely.</li>
            <li>Recognise the importance of controlled storage and access for electrical documentation.</li>
            <li>Explain how poor documentation management affects safety and operational efficiency.</li>
            <li>Apply best practices in storing and retrieving site documentation for electrical projects.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content</h2>

          {/* Types of Site Documentation */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Types of Site Documentation</h3>
            <p className="text-base text-white mb-4">
              Various types of documentation are essential for electrical installations and must be properly managed throughout the project lifecycle:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow text-elec-yellow mb-1">Essential Documentation Categories</p>
                    <p className="text-base text-white mb-2"><strong>Drawings and as-builts:</strong> Visual records of electrical installations.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Design drawings showing intended installation layouts and specifications</li>
                      <li>As-built drawings reflecting the actual completed installation</li>
                      <li>Schematic diagrams and circuit layouts for maintenance reference</li>
                      <li>Site plans showing cable routes and equipment locations</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Specifications and standards:</strong> Technical requirements and compliance documents.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Equipment specifications defining required materials and standards</li>
                      <li>Installation standards and compliance requirements</li>
                      <li>Client specifications and special requirements</li>
                      <li>Technical data sheets and performance criteria</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Test certificates and compliance records:</strong> Verification of safety and standards.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Electrical Installation Condition Reports (EICR) and test certificates</li>
                      <li>Installation certificates proving compliance with BS 7671</li>
                      <li>PAT testing records for portable electrical equipment</li>
                      <li>Inspection and testing documentation at various project stages</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Safety documentation:</strong> Risk management and procedural requirements.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Risk Assessments and Method Statements (RAMS) for specific tasks</li>
                      <li>Health and safety policies and site-specific procedures</li>
                      <li>Emergency procedures and evacuation plans</li>
                      <li>Manufacturer instructions for equipment installation and maintenance</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Comprehensive coverage:</strong> All documentation types are essential for safe, compliant, and efficient electrical work
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="documentation-types-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
          <Separator className="my-6" />

          {/* Why Proper Storage Matters */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Why Proper Storage Matters</h3>
            <p className="text-base text-white mb-4">
              Effective documentation storage is critical for maintaining project integrity, ensuring compliance, and supporting ongoing operations:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Critical Importance of Proper Document Management</p>
                    <p className="text-base text-white mb-2"><strong>Document protection and preservation:</strong> Preventing loss of critical information.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Prevents loss or damage of critical documents from environmental factors</li>
                      <li>Maintains document integrity and legibility over time</li>
                      <li>Protects against theft, unauthorised access, or accidental destruction</li>
                      <li>Ensures long-term availability for warranty and maintenance requirements</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Regulatory compliance and standards:</strong> Meeting legal and professional obligations.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Ensures compliance with BS 7671, CDM Regulations, and client requirements</li>
                      <li>Supports regulatory inspections and audit processes</li>
                      <li>Provides evidence of due diligence and professional standards</li>
                      <li>Meets insurance and warranty documentation requirements</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Operational efficiency and accessibility:</strong> Supporting daily work activities.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Provides quick access for audits, inspections, and site queries</li>
                      <li>Enables efficient troubleshooting and maintenance activities</li>
                      <li>Supports coordination between different trades and supervisors</li>
                      <li>Reduces time spent searching for information during work activities</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Communication and collaboration:</strong> Enhancing team coordination.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Improves communication between trades, supervisors, and clients</li>
                      <li>Ensures all team members work from the same current information</li>
                      <li>Facilitates handover processes between work shifts and project phases</li>
                      <li>Supports effective project management and decision-making</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Foundation for success:</strong> Proper storage underpins safety, compliance, and operational effectiveness
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="outdated-documents-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
          <Separator className="my-6" />

          {/* Methods of Storage */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Methods of Storage</h3>
            <p className="text-base text-white mb-4">
              Modern documentation storage combines physical and digital methods to ensure accessibility, security, and backup protection:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-amber-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-amber-600 dark:text-amber-400 mb-1">Comprehensive Storage Solutions</p>
                    <p className="text-base text-white mb-2"><strong>Physical storage systems:</strong> Secure on-site document management.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Secure site office filing cabinets with controlled access and locking systems</li>
                      <li>Laminated drawings and key documents for harsh site environment use</li>
                      <li>Waterproof document containers and protective storage solutions</li>
                      <li>Organised filing systems with clear labelling and version control</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Digital storage platforms:</strong> Cloud-based and networked solutions.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Cloud-based project management platforms (Procore, Viewpoint, SharePoint)</li>
                      <li>Shared network drives with controlled access permissions and backup systems</li>
                      <li>Document management systems with version control and audit trails</li>
                      <li>Integration with project management and collaboration tools</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Mobile access solutions:</strong> Field-accessible documentation systems.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Mobile apps for electricians to access drawings and documents on site</li>
                      <li>Tablet and smartphone solutions for field reference and updates</li>
                      <li>Offline access capabilities for areas with poor network coverage</li>
                      <li>Real-time synchronisation with central document repositories</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Hybrid storage approaches:</strong> Combining physical and digital benefits.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Physical copies for critical reference with digital backups</li>
                      <li>QR codes linking physical documents to digital versions</li>
                      <li>Local site servers with cloud backup and synchronisation</li>
                      <li>Print-on-demand capabilities for current document versions</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Multi-layered approach:</strong> Effective storage combines multiple methods for reliability and accessibility
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="digital-benefits-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
          <Separator className="my-6" />

          {/* Consequences of Poor Documentation Storage */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Consequences of Poor Documentation Storage</h3>
            <p className="text-base text-white mb-4">
              Inadequate documentation storage creates significant risks that affect safety, project delivery, and business operations:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 text-elec-yellow mb-1">Serious Risks from Poor Documentation Management</p>
                    <p className="text-base text-white mb-2"><strong>Operational failures and mistakes:</strong> Work quality and accuracy impacts.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Lost drawings lead to mistakes, incorrect installations, and costly rework</li>
                      <li>Use of out-of-date documents increases risk of non-compliance and defects</li>
                      <li>Inability to verify installation details during maintenance and troubleshooting</li>
                      <li>Confusion about specifications leading to incorrect material selection</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Project delays and inefficiencies:</strong> Time and cost implications.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Delays during inspections and sign-offs due to missing documentation</li>
                      <li>Work stoppages while replacement documents are obtained</li>
                      <li>Increased labour costs from time spent searching for information</li>
                      <li>Extended project timelines affecting subsequent work schedules</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Compliance and legal issues:</strong> Regulatory and contractual consequences.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Failed regulatory inspections due to inadequate documentation</li>
                      <li>Legal disputes without proper evidence of compliance and work completion</li>
                      <li>Insurance claim difficulties due to missing certification records</li>
                      <li>Potential enforcement action from health and safety authorities</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Safety and risk management failures:</strong> Hazard exposure and incident risks.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Inability to access emergency procedures during critical situations</li>
                      <li>Unknown hazards due to missing risk assessments and safety documentation</li>
                      <li>Incorrect isolation procedures due to missing or outdated circuit information</li>
                      <li>Compromised emergency response due to inaccessible building information</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Far-reaching impact:</strong> Poor storage affects every aspect of electrical project delivery and ongoing operations
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Card>

        {/* Real-world examples */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Real-world examples</h2>
          
          <div className="space-y-6">
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
              <h3 className="font-medium text-white mb-2">Commercial Office Project - Water Damage Disaster</h3>
              <p className="text-base text-white mb-2">
                <strong>Situation:</strong> On a commercial office project, the site drawings were stored loosely in a van rather than a controlled office environment.
              </p>
              <p className="text-xs sm:text-sm text-white mb-2">
                <strong>The Problem:</strong> A water leak ruined the only copies of critical drawings, and no digital backups existed. Work halted for two days until replacement drawings could be provided from the design office.
              </p>
              <p className="text-sm text-white">
                This incident cost the contractor significant time and money, highlighted the vulnerability of poor storage practices, and demonstrated the critical need for backup systems.
              </p>
            </div>

            <div className="rounded-lg p-4 bg-transparent border border-amber-400/30">
              <h3 className="font-medium text-white mb-2">Hospital Project - Version Control Failure</h3>
              <p className="text-base text-white mb-2">
                <strong>Situation:</strong> Multiple versions of electrical drawings were circulating on a hospital refurbishment project without proper version control.
              </p>
              <p className="text-xs sm:text-sm text-white mb-2">
                <strong>The Problem:</strong> Electricians worked from outdated drawings and installed circuits in wrong locations. The error wasn't discovered until final testing, requiring extensive rework in sensitive hospital areas.
              </p>
              <p className="text-sm text-white">
                Proper document control with clear version management would have prevented this costly mistake and reduced disruption to hospital operations.
              </p>
            </div>

            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
              <h3 className="font-medium text-white mb-2">Good Practice - Digital Document Management</h3>
              <p className="text-base text-white mb-2">
                <strong>Situation:</strong> A large electrical contractor implemented a cloud-based document management system with mobile access for all site teams.
              </p>
              <p className="text-xs sm:text-sm text-white mb-2">
                <strong>The Result:</strong> Real-time access to current drawings, automatic backup protection, and instant distribution of updates. Project efficiency improved significantly, and document-related delays virtually disappeared.
              </p>
              <p className="text-sm text-white">
                This modern approach demonstrates how proper digital storage can transform project delivery and eliminate traditional documentation problems.
              </p>
            </div>
          </div>
        </Card>

        {/* Practical guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Practical guidance</h2>
          
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <h3 className="font-medium text-white mb-3">Physical Storage Best Practices</h3>
              <ul className="text-xs sm:text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
                  Always store physical copies in waterproof folders or cabinets
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
                  Ensure only current versions are issued – stamp or date all copies
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
                  Use secure, lockable storage with controlled access
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
                  Maintain organised filing systems with clear labelling
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-white mb-3">Digital Management Strategies</h3>
              <ul className="text-xs sm:text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <Target className="w-4 h-4 mt-0.5 text-elec-yellow flex-shrink-0" />
                  Upload and back up all documents digitally with regular updates
                </li>
                <li className="flex items-start gap-2">
                  <Target className="w-4 h-4 mt-0.5 text-elec-yellow flex-shrink-0" />
                  Train all team members on where to find documents and access procedures
                </li>
                <li className="flex items-start gap-2">
                  <Target className="w-4 h-4 mt-0.5 text-elec-yellow flex-shrink-0" />
                  Restrict editing rights but allow viewing access to those who need it
                </li>
                <li className="flex items-start gap-2">
                  <Target className="w-4 h-4 mt-0.5 text-elec-yellow flex-shrink-0" />
                  Implement version control and audit trails for all document changes
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Pocket Guide */}
        <Card className="mb-8 p-6 bg-elec-yellow/5 border-elec-yellow/30">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Pocket Guide</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 mt-0.5 text-green-500 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-white">Store drawings, certificates, and manuals securely</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 mt-0.5 text-green-500 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-white">Always back up digital files with regular updates</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 mt-0.5 text-green-500 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-white">Ensure site staff can access documents quickly</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 mt-0.5 text-green-500 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-white">Only use the latest version of documents</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 mt-0.5 text-green-500 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-white">Protect physical copies from damage</span>
              </div>
            </div>
          </div>
        </Card>

        {/* FAQ Section */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Frequently asked questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-l-4 border-l-muted pl-4">
                <h3 className="font-medium text-white mb-2">Q: {faq.question}</h3>
                <p className="text-sm text-white">A: {faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Recap</h2>
          <p className="text-base text-white mb-4">
            In this subsection, you learned that site documentation storage is essential for safety, compliance, and efficiency. Documents must be organised, backed up, and made accessible to the right people. Poor storage practices can lead to costly delays, mistakes, or legal issues.
          </p>
          <ul className="text-xs sm:text-sm text-white space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
              Multiple types of documentation require secure storage and controlled access
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
              Proper storage prevents loss, ensures compliance, and supports operational efficiency
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
              Combination of physical and digital storage provides maximum protection and accessibility
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
              Poor storage leads to costly delays, safety risks, and compliance failures
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
              Best practices include version control, backup systems, and controlled access
            </li>
          </ul>
        </Card>

        {/* Quiz */}
        <Quiz title="Site Documentation Storage and Access Knowledge Check" questions={quizQuestions} />

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10">
          <Button variant="outline" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 7
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="..">
              Next Section
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}