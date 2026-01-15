import { ArrowLeft, ArrowRight, FileText, Target, CheckCircle, AlertTriangle, Clipboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Importance of Accurate Records for Compliance and Safety - Module 5.7.1 | Level 2 Electrical Course";
const DESCRIPTION = "Learn why accurate records are essential in electrical work for BS 7671 compliance, safety, and future maintenance. Understand key documentation requirements.";

const quickCheckQuestions = [
  {
    id: 1,
    question: "Which wiring regulation standard requires proper documentation of electrical installations?",
    options: ["BS 5266", "BS 7671", "ISO 14001", "BS 6004"],
    correctIndex: 1,
    explanation: "BS 7671 is the UK wiring regulations standard that requires proper documentation of all electrical installations to prove compliance."
  },
  {
    id: 2,
    question: "What is the main purpose of inspection and test records?",
    options: ["To provide an installation design", "To prove safety and compliance", "To track project costs", "To record material usage"],
    correctIndex: 1,
    explanation: "Inspection and test records provide essential proof that installations are safe and comply with BS 7671 requirements."
  },
  {
    id: 3,
    question: "When should documentation be completed?",
    options: ["At the end of the project", "Weekly", "Immediately after the work is carried out", "Monthly"],
    correctIndex: 2,
    explanation: "Documentation should always be completed immediately after work is carried out to ensure accuracy and prevent loss of important details."
  }
];

const Module5Section7_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "Which wiring regulation standard requires proper documentation of electrical installations?",
      options: ["BS 5266", "BS 7671", "ISO 14001", "BS 6004"],
      correctAnswer: 1,
      explanation: "BS 7671 is the UK wiring regulations standard that requires proper documentation of all electrical installations to prove compliance."
    },
    {
      id: 2,
      question: "Which certificate is used for small alterations or additions to electrical systems?",
      options: ["Installation Certificate", "Minor Works Certificate", "Fire Safety Certificate", "Compliance Certificate"],
      correctAnswer: 1,
      explanation: "Minor Works Certificates are specifically designed for documenting small alterations, additions, or replacements to existing electrical installations."
    },
    {
      id: 3,
      question: "What is the main purpose of inspection and test records?",
      options: ["To provide an installation design", "To prove safety and compliance", "To track project costs", "To record equipment deliveries"],
      correctAnswer: 1,
      explanation: "Inspection and test records provide essential proof that installations are safe, properly installed, and comply with BS 7671 requirements."
    },
    {
      id: 4,
      question: "What is a RAMS document used for?",
      options: ["Recording site deliveries", "Health and safety planning", "Checking circuit continuity", "Material specifications"],
      correctAnswer: 1,
      explanation: "RAMS (Risk Assessments and Method Statements) are used for health and safety planning, identifying hazards and control measures."
    },
    {
      id: 5,
      question: "What is a site diary or work log used for?",
      options: ["Recording testing only", "Recording daily progress, incidents, and variations", "Recording equipment stock", "Recording client meetings"],
      correctAnswer: 1,
      explanation: "Site diaries or work logs record daily progress, incidents, variations, delays, and other important project information for traceability."
    },
    {
      id: 6,
      question: "What is one key consequence of poor record keeping?",
      options: ["Reduced installation time", "Better site communication", "Increased risk of legal and safety issues", "Lower material costs"],
      correctAnswer: 2,
      explanation: "Poor record keeping increases the risk of legal penalties, safety issues, compliance failures, and costly rework."
    },
    {
      id: 7,
      question: "When should documentation be completed?",
      options: ["At the end of the project", "Weekly", "Immediately after the work is carried out", "Monthly"],
      correctAnswer: 2,
      explanation: "Documentation should always be completed immediately after work is carried out to ensure accuracy and prevent loss of important details."
    },
    {
      id: 8,
      question: "Why are accurate records important for future maintenance?",
      options: ["They allow reuse of old materials", "They help electricians quickly understand the system", "They reduce paperwork", "They eliminate testing requirements"],
      correctAnswer: 1,
      explanation: "Accurate records help future electricians quickly understand the installation without guesswork, making maintenance safer and more efficient."
    },
    {
      id: 9,
      question: "Who is responsible for ensuring accurate records are kept?",
      options: ["The apprentice only", "The site manager and responsible electricians", "The client only", "The supplier only"],
      correctAnswer: 1,
      explanation: "The site manager and responsible electricians are accountable for ensuring accurate records are kept throughout the project."
    },
    {
      id: 10,
      question: "In the real-world scenario, what problem occurred due to missing records?",
      options: ["The client failed an audit and the project was delayed", "The cables overheated", "The client refused to pay", "The materials were stolen"],
      correctAnswer: 0,
      explanation: "Missing records led to duplicated work, missed faults, compliance audit failure, and costly project delays."
    }
  ];

  const faqs = [
    {
      question: "What happens if I don't keep proper records?",
      answer: "Poor record keeping can result in legal penalties, failed compliance audits, increased safety risks, costly rework, and potential disputes with clients or inspectors."
    },
    {
      question: "How long should electrical records be kept?",
      answer: "Installation certificates and test results should be kept for the life of the installation. Other project records should typically be retained for at least 6 years for contractual purposes."
    },
    {
      question: "Can I use digital systems for record keeping?",
      answer: "Yes, digital systems are acceptable and often preferred for their accuracy and accessibility. Ensure proper backup systems and that digital signatures comply with legal requirements."
    },
    {
      question: "What should I do if I make an error in documentation?",
      answer: "Never alter or cover up errors. Cross out mistakes clearly, initial and date the correction, then write the correct information. For digital records, use the amendment function."
    },
    {
      question: "Who can access electrical installation records?",
      answer: "Records should be accessible to authorised personnel including the installation owner, competent electricians, inspectors, and emergency services when required for safety purposes."
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/5 -ml-2 min-h-[44px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 7
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 5</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 7.1</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Importance of Accurate Records for Compliance and Safety
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Understanding why accurate documentation is vital for legal compliance, safety, and effective maintenance in electrical work
            </p>
          </header>

          {/* Introduction */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">00</span>
              Introduction
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 text-white/90">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Accurate records prove compliance with BS 7671 and support safe working practices</li>
                  <li>Documentation provides traceability and helps future maintenance work</li>
                  <li>Poor record keeping can cause legal issues, safety hazards, and costly delays</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li><strong>Spot:</strong> Installation certificates, test results, RAMS documents, site logs</li>
                  <li><strong>Use:</strong> Complete documentation immediately, use standard templates, store securely</li>
                  <li><strong>Check:</strong> Records are accurate, complete, and comply with requirements</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <FileText className="w-5 h-5 text-elec-yellow/80" />
              Learning Outcomes
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>Explain why accurate records are essential for compliance and safety</li>
              <li>Identify key documents used in electrical projects</li>
              <li>Recognise the consequences of poor record keeping</li>
              <li>Apply best practices for storing and maintaining documentation</li>
              <li>Understand how accurate records assist with future maintenance and inspections</li>
            </ul>
          </section>

          {/* Section 1 - Legal and Regulatory Compliance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Why Records Are Essential
            </h2>
            <p className="text-white/80 mb-4 leading-relaxed">
              Accurate records form the foundation of professional electrical installation work and serve multiple critical purposes:
            </p>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-white mb-2">Legal and Regulatory Compliance</p>
                <p className="text-white/80 text-sm mb-2"><strong>Compliance with BS 7671:</strong> Every installation must be documented to prove it meets current wiring regulations.</p>
                <ul className="text-white/70 ml-4 list-disc space-y-1 text-sm">
                  <li>Installation certificates demonstrate compliance with electrical safety standards</li>
                  <li>Test results provide evidence that installations are safe and correctly installed</li>
                  <li>Documentation supports building regulations approval and insurance requirements</li>
                  <li>Records enable effective inspection and maintenance throughout the installation's life</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-blue-500/50">
                <p className="font-medium text-white mb-2">Health and Safety</p>
                <p className="text-white/80 text-sm mb-2">Keeping track of risks, inspections, and incidents ensures safe working conditions.</p>
                <ul className="text-white/70 ml-4 list-disc space-y-1 text-sm">
                  <li>RAMS documents identify hazards and control measures for safe working</li>
                  <li>Incident records help prevent similar accidents and demonstrate due diligence</li>
                  <li>Regular inspection records track safety performance over time</li>
                  <li>Emergency procedures documentation ensures rapid, effective response to incidents</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-purple-500/50">
                <p className="font-medium text-white mb-2">Traceability</p>
                <p className="text-white/80 text-sm mb-2">Provides a clear history of who completed which tasks, when, and to what standard.</p>
                <ul className="text-white/70 ml-4 list-disc space-y-1 text-sm">
                  <li>Individual accountability for specific work activities and quality standards</li>
                  <li>Timeline documentation for project progress and milestone achievement</li>
                  <li>Material traceability from delivery through to final installation location</li>
                  <li>Change management records showing design modifications and approvals</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm text-white/90"><strong className="text-red-400">Legal requirement:</strong> Failure to maintain proper records can result in prosecution and unlimited fines under health and safety legislation</p>
            </div>
          </section>

          <InlineCheck
            id="records-purpose-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          {/* Section 2 - Key Types of Records */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Key Types of Records
            </h2>
            <p className="text-white/80 mb-4 leading-relaxed">
              Different types of records serve specific purposes in electrical installation projects:
            </p>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50">
                <p className="font-medium text-white mb-2">Installation Certificates</p>
                <p className="text-white/80 text-sm mb-2">Confirm compliance for new works.</p>
                <ul className="text-white/70 ml-4 list-disc space-y-1 text-sm">
                  <li>Required for all new electrical installations under BS 7671</li>
                  <li>Certify that design, construction, and testing meet regulatory standards</li>
                  <li>Must be completed by competent electricians with appropriate qualifications</li>
                  <li>Include details of design calculations, materials used, and test results</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-blue-500/50">
                <p className="font-medium text-white mb-2">Minor Works Certificates</p>
                <p className="text-white/80 text-sm mb-2">For small additions and alterations.</p>
                <ul className="text-white/70 ml-4 list-disc space-y-1 text-sm">
                  <li>Cover additions, alterations, or replacements to existing installations</li>
                  <li>Simpler format than full installation certificates but equally important</li>
                  <li>Include essential safety tests and verification of existing protective measures</li>
                  <li>Must reference relevant sections of BS 7671 and building regulations</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-purple-500/50">
                <p className="font-medium text-white mb-2">Inspection & Test Results</p>
                <p className="text-white/80 text-sm mb-2">Essential for proving safety.</p>
                <ul className="text-white/70 ml-4 list-disc space-y-1 text-sm">
                  <li>Document all electrical safety tests including continuity, insulation, and earth fault loop impedance</li>
                  <li>Provide benchmark readings for future testing and maintenance</li>
                  <li>Include photographic evidence where appropriate for future reference</li>
                  <li>Must be signed and dated by the person carrying out the tests</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-orange-500/50">
                <p className="font-medium text-white mb-2">Risk Assessments & Method Statements (RAMS)</p>
                <p className="text-white/80 text-sm mb-2">For health and safety compliance.</p>
                <ul className="text-white/70 ml-4 list-disc space-y-1 text-sm">
                  <li>Identify specific hazards associated with electrical installation work</li>
                  <li>Define control measures and safe working procedures</li>
                  <li>Specify required personal protective equipment (PPE) and safety equipment</li>
                  <li>Include emergency procedures and contact information</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-teal-500/50">
                <p className="font-medium text-white mb-2">Site Diaries / Work Logs</p>
                <p className="text-white/80 text-sm mb-2">Progress, delays, accidents, and variations.</p>
                <ul className="text-white/70 ml-4 list-disc space-y-1 text-sm">
                  <li>Daily record of work progress and activities completed</li>
                  <li>Weather conditions affecting outdoor or temporary installations</li>
                  <li>Material deliveries, shortages, and quality issues</li>
                  <li>Visitors to site including inspectors and client representatives</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm text-white/90"><strong className="text-blue-400">Retention period:</strong> Electrical certificates and test results should be kept for the entire life of the installation. Other project records should typically be retained for at least 6 years</p>
            </div>
          </section>

          <InlineCheck
            id="test-records-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          {/* Section 3 - Consequences of Poor Record Keeping */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Consequences of Poor Record Keeping
            </h2>
            <p className="text-white/80 mb-4 leading-relaxed">
              Inadequate documentation can have serious consequences for projects, organisations, and individual professionals:
            </p>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
                <p className="font-medium text-white mb-2">Legal Penalties</p>
                <ul className="text-white/70 ml-4 list-disc space-y-1 text-sm">
                  <li>Prosecution under health and safety legislation with unlimited fines</li>
                  <li>Contractual disputes leading to financial penalties and damaged reputation</li>
                  <li>Insurance claims rejection due to inability to prove compliance</li>
                  <li>Potential criminal liability for serious accidents or fatalities</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-orange-500/10 border-l-2 border-orange-500/50">
                <p className="font-medium text-white mb-2">Safety Risks</p>
                <ul className="text-white/70 ml-4 list-disc space-y-1 text-sm">
                  <li>Inability to identify potential hazards without proper risk assessments</li>
                  <li>Lack of traceability making fault-finding and maintenance dangerous</li>
                  <li>Incomplete testing records masking safety-critical defects</li>
                  <li>Emergency response compromised by lack of system information</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-amber-500/10 border-l-2 border-amber-500/50">
                <p className="font-medium text-white mb-2">Commercial Impact</p>
                <ul className="text-white/70 ml-4 list-disc space-y-1 text-sm">
                  <li>Duplicated work due to uncertainty about completed tasks</li>
                  <li>Extended project timelines causing cost overruns and client dissatisfaction</li>
                  <li>Rework requirements when inspections fail due to missing documentation</li>
                  <li>Loss of competitive advantage and damage to professional reputation</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-3 rounded-lg bg-green-500/10 border border-green-500/30">
              <p className="text-sm text-white/90"><strong className="text-green-400">Prevention:</strong> Implement robust documentation procedures from project start to avoid these costly consequences</p>
            </div>
          </section>

          {/* Section 4 - Benefits of Accurate Records */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Benefits of Accurate Records
            </h2>
            <p className="text-white/80 mb-4 leading-relaxed">
              Proper documentation provides significant advantages beyond basic compliance:
            </p>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50">
                <p className="font-medium text-white mb-2">Efficiency Gains</p>
                <ul className="text-white/70 ml-4 list-disc space-y-1 text-sm">
                  <li>Clear installation records prevent unnecessary re-testing</li>
                  <li>Documented procedures reduce training time for new personnel</li>
                  <li>Material tracking reduces waste and over-ordering</li>
                  <li>Progress tracking enables better resource allocation</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-blue-500/50">
                <p className="font-medium text-white mb-2">Maintenance Support</p>
                <ul className="text-white/70 ml-4 list-disc space-y-1 text-sm">
                  <li>Future electricians can quickly understand the installation without guesswork</li>
                  <li>Circuit identification reduces fault-finding time</li>
                  <li>Historical test results show performance trends</li>
                  <li>Modification records prevent accidental damage</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-purple-500/50">
                <p className="font-medium text-white mb-2">Business Development</p>
                <ul className="text-white/70 ml-4 list-disc space-y-1 text-sm">
                  <li>Demonstrate professionalism to potential clients</li>
                  <li>Support tender submissions with proven track record</li>
                  <li>Enable ISO 9001 quality management certification</li>
                  <li>Provide evidence for insurance premium reductions</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-3 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
              <p className="text-sm text-white/90"><strong className="text-elec-yellow">Investment return:</strong> Time spent on proper documentation saves significantly more time in the long term</p>
            </div>
          </section>

          <InlineCheck
            id="documentation-timing-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          {/* Real-World Scenario */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Real-World Scenario
            </h2>
            <div className="p-4 rounded-lg bg-amber-500/10 border-l-2 border-amber-500/50">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-white mb-2">Missing Records Lead to Project Delays</h3>
                  <p className="text-white/80 text-sm mb-3">
                    You are working on a new office installation. Halfway through the project, a different team takes over the lighting circuits. Without proper records, they don't know which circuits have been tested or which cables serve which areas. This results in duplicated testing, wasted time, and eventually a missed fault on one circuit. The client fails their compliance audit, and the contractor faces costly delays.
                  </p>
                  <div className="bg-amber-500/10 p-3 rounded-lg mb-3">
                    <p className="font-medium text-amber-400 text-sm mb-1">What went wrong:</p>
                    <ul className="text-white/70 list-disc ml-4 space-y-1 text-xs">
                      <li>No handover documentation between teams</li>
                      <li>Test results not recorded or shared</li>
                      <li>Circuit identification incomplete</li>
                      <li>Progress records not maintained</li>
                    </ul>
                  </div>
                  <div className="bg-green-500/10 p-3 rounded-lg">
                    <p className="font-medium text-green-400 text-sm mb-1">Prevention measures:</p>
                    <ul className="text-white/70 list-disc ml-4 space-y-1 text-xs">
                      <li>Daily progress logs with circuit completion status</li>
                      <li>Test certificate completion before handover</li>
                      <li>Clear circuit labelling and documentation</li>
                      <li>Team briefing with record review</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
                <h4 className="font-medium text-white mb-2 text-sm">Incomplete Test Records</h4>
                <p className="text-white/70 text-xs mb-2">
                  An apprentice fails to record RCD test results. Six months later, an electrical incident occurs and the insurance company refuses the claim because compliance cannot be proven.
                </p>
                <p className="text-red-400 text-xs font-medium">Impact: £50,000+ claim rejection</p>
              </div>
              <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
                <h4 className="font-medium text-white mb-2 text-sm">Missing Risk Assessments</h4>
                <p className="text-white/70 text-xs mb-2">
                  A contractor starts work without completing RAMS documentation. An accident occurs and HSE investigation reveals poor planning. Result: prosecution and £75,000 fine.
                </p>
                <p className="text-red-400 text-xs font-medium">Impact: Unlimited fine + prosecution</p>
              </div>
            </div>
          </section>

          {/* Practical Guidance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <Target className="w-5 h-5 text-elec-yellow/80" />
              Practical Guidance
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50">
                <h3 className="font-medium text-white mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Best Practices
                </h3>
                <ul className="text-white/70 space-y-1 text-sm">
                  <li>• Always complete documentation immediately after tasks</li>
                  <li>• Use standard templates or digital software for consistency</li>
                  <li>• Keep certificates and logs securely stored but accessible</li>
                  <li>• Review and update documents when changes occur</li>
                  <li>• Train all site staff on the importance of record keeping</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h3 className="font-medium text-white mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4 text-elec-yellow" />
                  Key Actions
                </h3>
                <ul className="text-white/70 space-y-1 text-sm">
                  <li>• Document all installations, tests, and modifications</li>
                  <li>• Use the correct certificates (Installation, Minor Works)</li>
                  <li>• Keep daily site logs for traceability</li>
                  <li>• Store records securely but accessibly</li>
                  <li>• Update documents with every change</li>
                </ul>
              </div>
            </div>

            {/* Digital vs Paper Records */}
            <div className="mb-6">
              <h3 className="font-medium text-white mb-4">Digital vs Paper Records</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="font-medium text-white mb-2 text-sm">Digital Systems</h4>
                  <p className="text-green-400 text-xs font-medium mb-1">Advantages:</p>
                  <ul className="text-white/70 list-disc ml-4 space-y-1 text-xs">
                    <li>Automatic backup and version control</li>
                    <li>Easy searching and filtering</li>
                    <li>Integration with test equipment</li>
                    <li>Reduced storage space requirements</li>
                  </ul>
                  <p className="text-amber-400 text-xs font-medium mt-2 mb-1">Considerations:</p>
                  <ul className="text-white/70 list-disc ml-4 space-y-1 text-xs">
                    <li>Requires reliable power and connectivity</li>
                    <li>Staff training on software systems</li>
                    <li>Data security and backup procedures</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="font-medium text-white mb-2 text-sm">Paper Systems</h4>
                  <p className="text-green-400 text-xs font-medium mb-1">Advantages:</p>
                  <ul className="text-white/70 list-disc ml-4 space-y-1 text-xs">
                    <li>No power or technology dependencies</li>
                    <li>Familiar to all site personnel</li>
                    <li>Original signatures widely accepted</li>
                    <li>Can be completed in any conditions</li>
                  </ul>
                  <p className="text-amber-400 text-xs font-medium mt-2 mb-1">Considerations:</p>
                  <ul className="text-white/70 list-disc ml-4 space-y-1 text-xs">
                    <li>Risk of loss or damage</li>
                    <li>Difficult to search and analyse</li>
                    <li>Storage space requirements</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Daily Checklist */}
            <div className="p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-green-500/10 border border-blue-500/20">
              <h3 className="font-medium text-white mb-3">Daily Record-Keeping Checklist</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-white/90 font-medium text-sm mb-2">Before Work Starts:</p>
                  <ul className="text-white/70 space-y-1 text-xs">
                    <li>☐ RAMS reviewed and understood</li>
                    <li>☐ Test equipment calibration checked</li>
                    <li>☐ Previous day's work verified</li>
                    <li>☐ Material delivery records updated</li>
                  </ul>
                </div>
                <div>
                  <p className="text-white/90 font-medium text-sm mb-2">End of Day:</p>
                  <ul className="text-white/70 space-y-1 text-xs">
                    <li>☐ Work progress recorded</li>
                    <li>☐ Test results documented</li>
                    <li>☐ Any variations noted</li>
                    <li>☐ Tomorrow's plan documented</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Pocket Guide */}
          <section className="mb-10">
            <div className="p-5 rounded-lg bg-gradient-to-br from-elec-yellow/10 to-amber-600/5 border border-elec-yellow/30">
              <div className="flex items-center gap-3 mb-4">
                <Clipboard className="w-5 h-5 text-elec-yellow" />
                <h2 className="text-xl font-semibold text-white">Pocket Guide</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-white mb-2">✅ Always document installations, tests, and modifications</p>
                  <p className="font-medium text-white mb-2">✅ Use the correct certificates (Installation, Minor Works)</p>
                  <p className="font-medium text-white mb-2">✅ Keep daily site logs for traceability</p>
                </div>
                <div>
                  <p className="font-medium text-white mb-2">✅ Store records securely but accessibly</p>
                  <p className="font-medium text-white mb-2">✅ Update documents with every change</p>
                  <p className="font-medium text-white mb-2">✅ Complete documentation immediately after work</p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                  <h3 className="font-medium text-white mb-2">Q: {faq.question}</h3>
                  <p className="text-white/80 text-sm">A: {faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Recap */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <h2 className="text-xl font-semibold text-white">Recap</h2>
            </div>
            <p className="text-white/80 mb-4">
              In this subsection, you learned the importance of accurate records for compliance and safety. You explored the types of records used in electrical work, the risks of poor documentation, and how proper record keeping ensures compliance, safety, and efficiency.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>Accurate records prove compliance with BS 7671 and support safe working practices</li>
              <li>Key documents include installation certificates, test results, RAMS, and site logs</li>
              <li>Poor record keeping can result in legal penalties, safety hazards, and commercial losses</li>
              <li>Documentation should be completed immediately and stored securely</li>
            </ul>
          </section>

          {/* Quiz */}
          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          {/* Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 mt-8 border-t border-white/10">
            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="..">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Section 7
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../7-2">
                Next: Cable Labelling
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module5Section7_1;
