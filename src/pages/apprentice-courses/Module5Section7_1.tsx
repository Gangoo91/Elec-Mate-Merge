import { ArrowLeft, ArrowRight, FileText, Target, CheckCircle, AlertTriangle, Users, BookOpen, Clipboard, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Importance of Accurate Records for Compliance and Safety - Module 5.7.1 | Level 2 Electrical Course";
const DESCRIPTION = "Learn why accurate records are essential in electrical work for BS 7671 compliance, safety, and future maintenance. Understand key documentation requirements.";

// Inline check questions
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
      options: [
        "BS 5266",
        "BS 7671",
        "ISO 14001",
        "BS 6004"
      ],
      correctAnswer: 1,
      explanation: "BS 7671 is the UK wiring regulations standard that requires proper documentation of all electrical installations to prove compliance."
    },
    {
      id: 2,
      question: "Which certificate is used for small alterations or additions to electrical systems?",
      options: [
        "Installation Certificate",
        "Minor Works Certificate",
        "Fire Safety Certificate",
        "Compliance Certificate"
      ],
      correctAnswer: 1,
      explanation: "Minor Works Certificates are specifically designed for documenting small alterations, additions, or replacements to existing electrical installations."
    },
    {
      id: 3,
      question: "What is the main purpose of inspection and test records?",
      options: [
        "To provide an installation design",
        "To prove safety and compliance",
        "To track project costs",
        "To record equipment deliveries"
      ],
      correctAnswer: 1,
      explanation: "Inspection and test records provide essential proof that installations are safe, properly installed, and comply with BS 7671 requirements."
    },
    {
      id: 4,
      question: "What is a RAMS document used for?",
      options: [
        "Recording site deliveries",
        "Health and safety planning",
        "Checking circuit continuity",
        "Material specifications"
      ],
      correctAnswer: 1,
      explanation: "RAMS (Risk Assessments and Method Statements) are used for health and safety planning, identifying hazards and control measures."
    },
    {
      id: 5,
      question: "What is a site diary or work log used for?",
      options: [
        "Recording testing only",
        "Recording daily progress, incidents, and variations",
        "Recording equipment stock",
        "Recording client meetings"
      ],
      correctAnswer: 1,
      explanation: "Site diaries or work logs record daily progress, incidents, variations, delays, and other important project information for traceability."
    },
    {
      id: 6,
      question: "What is one key consequence of poor record keeping?",
      options: [
        "Reduced installation time",
        "Better site communication",
        "Increased risk of legal and safety issues",
        "Lower material costs"
      ],
      correctAnswer: 2,
      explanation: "Poor record keeping increases the risk of legal penalties, safety issues, compliance failures, and costly rework."
    },
    {
      id: 7,
      question: "When should documentation be completed?",
      options: [
        "At the end of the project",
        "Weekly",
        "Immediately after the work is carried out",
        "Monthly"
      ],
      correctAnswer: 2,
      explanation: "Documentation should always be completed immediately after work is carried out to ensure accuracy and prevent loss of important details."
    },
    {
      id: 8,
      question: "Why are accurate records important for future maintenance?",
      options: [
        "They allow reuse of old materials",
        "They help electricians quickly understand the system",
        "They reduce paperwork",
        "They eliminate testing requirements"
      ],
      correctAnswer: 1,
      explanation: "Accurate records help future electricians quickly understand the installation without guesswork, making maintenance safer and more efficient."
    },
    {
      id: 9,
      question: "Who is responsible for ensuring accurate records are kept?",
      options: [
        "The apprentice only",
        "The site manager and responsible electricians",
        "The client only",
        "The supplier only"
      ],
      correctAnswer: 1,
      explanation: "The site manager and responsible electricians are accountable for ensuring accurate records are kept throughout the project."
    },
    {
      id: 10,
      question: "In the real-world scenario, what problem occurred due to missing records?",
      options: [
        "The client failed an audit and the project was delayed",
        "The cables overheated",
        "The client refused to pay",
        "The materials were stolen"
      ],
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
              <FileText className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              Section 5.7.1
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Importance of Accurate Records for Compliance and Safety
          </h1>
          <p className="text-white">
            Understanding why accurate documentation is vital for legal compliance, safety, and effective maintenance in electrical work.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Accurate records prove compliance with BS 7671 and support safe working practices.</li>
                <li>Documentation provides traceability and helps future maintenance work.</li>
                <li>Poor record keeping can cause legal issues, safety hazards, and costly delays.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Installation certificates, test results, RAMS documents, site logs.</li>
                <li><strong>Use:</strong> Complete documentation immediately, use standard templates, store securely.</li>
                <li><strong>Check:</strong> Records are accurate, complete, and comply with requirements.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-base text-white">
            <li>Explain why accurate records are essential for compliance and safety.</li>
            <li>Identify key documents used in electrical projects.</li>
            <li>Recognise the consequences of poor record keeping.</li>
            <li>Apply best practices for storing and maintaining documentation.</li>
            <li>Understand how accurate records assist with future maintenance and inspections.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content / Learning</h2>

          {/* Definition and Purpose of Records */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Why Records Are Essential</h3>
            <p className="text-base text-white mb-4">
              Accurate records form the foundation of professional electrical installation work and serve multiple critical purposes:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow dark:text-elec-yellow mb-1">Legal and Regulatory Compliance</p>
                    <p className="text-base text-white mb-2"><strong>Compliance with BS 7671:</strong> Every installation must be documented to prove it meets current wiring regulations.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Installation certificates demonstrate compliance with electrical safety standards</li>
                      <li>Test results provide evidence that installations are safe and correctly installed</li>
                      <li>Documentation supports building regulations approval and insurance requirements</li>
                      <li>Records enable effective inspection and maintenance throughout the installation's life</li>
                      <li>Provides audit trail for regulatory inspections and compliance verification</li>
                      <li>Essential for Part P notification and Building Control approval processes</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Health and Safety:</strong> Keeping track of risks, inspections, and incidents ensures safe working conditions.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>RAMS documents identify hazards and control measures for safe working</li>
                      <li>Incident records help prevent similar accidents and demonstrate due diligence</li>
                      <li>Regular inspection records track safety performance over time</li>
                      <li>Emergency procedures documentation ensures rapid, effective response to incidents</li>
                      <li>Training records demonstrate competency and legal compliance</li>
                      <li>Risk assessment updates track changing site conditions and hazards</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Traceability:</strong> Provides a clear history of who completed which tasks, when, and to what standard.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Individual accountability for specific work activities and quality standards</li>
                      <li>Timeline documentation for project progress and milestone achievement</li>
                      <li>Material traceability from delivery through to final installation location</li>
                      <li>Change management records showing design modifications and approvals</li>
                      <li>Quality control checkpoints and verification signatures</li>
                      <li>Subcontractor work records and performance monitoring</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Legal requirement:</strong> Failure to maintain proper records can result in prosecution and unlimited fines under health and safety legislation
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="records-purpose-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
          <Separator className="my-6" />

          {/* Key Types of Records */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Key Types of Records</h3>
            <p className="text-base text-white mb-4">
              Different types of records serve specific purposes in electrical installation projects:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Essential Documentation Types</p>
                    <p className="text-base text-white mb-2"><strong>Installation Certificates:</strong> Confirm compliance for new works.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Required for all new electrical installations under BS 7671</li>
                      <li>Certify that design, construction, and testing meet regulatory standards</li>
                      <li>Must be completed by competent electricians with appropriate qualifications</li>
                      <li>Include details of design calculations, materials used, and test results</li>
                      <li>Specify protective device characteristics and earth fault loop impedance values</li>
                      <li>Document RCD testing results and insulation resistance measurements</li>
                      <li>Include circuit charts showing protective device ratings and cable sizes</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Minor Works Certificates:</strong> For small additions and alterations.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Cover additions, alterations, or replacements to existing installations</li>
                      <li>Simpler format than full installation certificates but equally important</li>
                      <li>Include essential safety tests and verification of existing protective measures</li>
                      <li>Must reference relevant sections of BS 7671 and building regulations</li>
                      <li>Document earth continuity and insulation resistance for new circuits</li>
                      <li>Verify RCD operation and polarity where applicable</li>
                      <li>Include recommendations for further investigation if required</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Inspection & Test Results:</strong> Essential for proving safety.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Document all electrical safety tests including continuity, insulation, and earth fault loop impedance</li>
                      <li>Provide benchmark readings for future testing and maintenance</li>
                      <li>Include photographic evidence where appropriate for future reference</li>
                      <li>Must be signed and dated by the person carrying out the tests</li>
                      <li>Record test instrument details including calibration dates</li>
                      <li>Document any limitations or restrictions during testing</li>
                      <li>Include remedial work recommendations and priority ratings</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Risk Assessments & Method Statements (RAMS):</strong> For health and safety compliance.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Identify specific hazards associated with electrical installation work</li>
                      <li>Define control measures and safe working procedures</li>
                      <li>Specify required personal protective equipment (PPE) and safety equipment</li>
                      <li>Include emergency procedures and contact information</li>
                      <li>Document competency requirements for different work activities</li>
                      <li>Regular review and updates as site conditions change</li>
                      <li>Integration with permit-to-work systems where applicable</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Site Diaries / Work Logs:</strong> Progress, delays, accidents, and variations.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Daily record of work progress and activities completed</li>
                      <li>Weather conditions affecting outdoor or temporary installations</li>
                      <li>Material deliveries, shortages, and quality issues</li>
                      <li>Personnel on site and their specific roles or qualifications</li>
                      <li>Visitors to site including inspectors and client representatives</li>
                      <li>Problems encountered and solutions implemented</li>
                      <li>Variations to original specifications and client approvals</li>
                      <li>Any incidents, near misses, or safety observations</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Retention period:</strong> Electrical certificates and test results should be kept for the entire life of the installation. Other project records should typically be retained for at least 6 years
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="test-records-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
          <Separator className="my-6" />

          {/* Consequences of Poor Record Keeping */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Consequences of Poor Record Keeping</h3>
            <p className="text-base text-white mb-4">
              Inadequate documentation can have serious consequences for projects, organisations, and individual professionals:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 dark:text-elec-yellow mb-1">Risks and Impact</p>
                    <p className="text-base text-white mb-2"><strong>Legal penalties:</strong> If compliance cannot be proven.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Prosecution under health and safety legislation with unlimited fines</li>
                      <li>Contractual disputes leading to financial penalties and damaged reputation</li>
                      <li>Insurance claims rejection due to inability to prove compliance</li>
                      <li>Potential criminal liability for serious accidents or fatalities</li>
                      <li>Professional body disciplinary action and loss of competent person status</li>
                      <li>Building Control enforcement notices and stop work orders</li>
                      <li>Personal liability for directors and senior managers under corporate manslaughter legislation</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Safety risks:</strong> Increased risk of accidents and unsafe systems.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Inability to identify potential hazards without proper risk assessments</li>
                      <li>Lack of traceability making fault-finding and maintenance dangerous</li>
                      <li>Incomplete testing records masking safety-critical defects</li>
                      <li>Emergency response compromised by lack of system information</li>
                      <li>Unknown electrical system modifications creating hidden dangers</li>
                      <li>Inability to verify protective device coordination and discrimination</li>
                      <li>Risk of electrocution due to unknown earth fault conditions</li>
                      <li>Fire risk from undocumented cable overloading or poor connections</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Commercial impact:</strong> Lost time and higher costs due to missing details.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Duplicated work due to uncertainty about completed tasks</li>
                      <li>Extended project timelines causing cost overruns and client dissatisfaction</li>
                      <li>Rework requirements when inspections fail due to missing documentation</li>
                      <li>Loss of competitive advantage and damage to professional reputation</li>
                      <li>Increased insurance premiums due to poor safety record</li>
                      <li>Client retention issues and reduced referral business</li>
                      <li>Additional testing costs to verify historical work</li>
                      <li>Potential liquidated damages for project delays</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Professional consequences:</strong> Impact on career and business development.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Loss of approved contractor status with professional bodies</li>
                      <li>Difficulty obtaining professional indemnity insurance</li>
                      <li>Exclusion from tender processes requiring quality assurance</li>
                      <li>Damaged relationships with suppliers and subcontractors</li>
                      <li>Difficulty recruiting skilled personnel due to poor reputation</li>
                      <li>Reduced profit margins due to increased supervision and checking</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Prevention:</strong> Implement robust documentation procedures from project start to avoid these costly consequences
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits of Accurate Records */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Benefits of Accurate Records</h3>
            <p className="text-base text-white mb-4">
              Proper documentation provides significant advantages beyond basic compliance:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-elec-yellow mb-1">Strategic Advantages</p>
                    <p className="text-base text-white mb-2"><strong>Efficiency gains:</strong> Reduces mistakes and duplication of work.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Clear installation records prevent unnecessary re-testing</li>
                      <li>Documented procedures reduce training time for new personnel</li>
                      <li>Material tracking reduces waste and over-ordering</li>
                      <li>Progress tracking enables better resource allocation</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Maintenance support:</strong> Future electricians can quickly understand the installation without guesswork.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Circuit identification reduces fault-finding time</li>
                      <li>Historical test results show performance trends</li>
                      <li>Modification records prevent accidental damage</li>
                      <li>Emergency isolation procedures clearly documented</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Business development:</strong> Quality records support business growth.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Demonstrate professionalism to potential clients</li>
                      <li>Support tender submissions with proven track record</li>
                      <li>Enable ISO 9001 quality management certification</li>
                      <li>Provide evidence for insurance premium reductions</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Investment return:</strong> Time spent on proper documentation saves significantly more time in the long term
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="documentation-timing-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
        </Card>

        {/* Real-World Scenario */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Real-World Scenario</h2>
          <div className="rounded-lg p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-amber-800 dark:text-amber-200 mb-2">Missing Records Lead to Project Delays</h3>
                <p className="text-base text-white mb-3">
                  You are working on a new office installation. Halfway through the project, a different team takes over the lighting circuits. Without proper records, they don't know which circuits have been tested or which cables serve which areas. This results in duplicated testing, wasted time, and eventually a missed fault on one circuit. The client fails their compliance audit, and the contractor faces costly delays.
                </p>
                <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-lg mb-3">
                  <p className="font-medium text-amber-800 dark:text-amber-200">What went wrong:</p>
                  <ul className="text-xs sm:text-sm text-white list-disc ml-4 space-y-1">
                    <li>No handover documentation between teams</li>
                    <li>Test results not recorded or shared</li>
                    <li>Circuit identification incomplete</li>
                    <li>Progress records not maintained</li>
                  </ul>
                </div>
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg">
                  <p className="font-medium text-green-800 dark:text-green-200">Prevention measures:</p>
                  <ul className="text-xs sm:text-sm text-white list-disc ml-4 space-y-1">
                    <li>Daily progress logs with circuit completion status</li>
                    <li>Test certificate completion before handover</li>
                    <li>Clear circuit labelling and documentation</li>
                    <li>Team briefing with record review</li>
                  </ul>
                </div>
                <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-lg mt-3">
                  <p className="font-medium text-amber-800 dark:text-amber-200">Lesson:</p>
                  <p className="text-base text-white">
                    Accurate, up-to-date records would have prevented errors, saved time, and avoided compliance issues. The cost of maintaining proper records is always less than the cost of the problems they prevent.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Additional Examples */}
          <div className="mt-6 space-y-4">
            <h3 className="font-medium text-white">Common Record-Keeping Failures</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-lg p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800">
                <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">Incomplete Test Records</h4>
                <p className="text-xs sm:text-sm text-white mb-2">
                  An apprentice fails to record RCD test results. Six months later, an electrical incident occurs and the insurance company refuses the claim because compliance cannot be proven.
                </p>
                <p className="text-xs text-white font-medium">Impact: £50,000+ claim rejection</p>
              </div>
              <div className="rounded-lg p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800">
                <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">Missing Risk Assessments</h4>
                <p className="text-xs sm:text-sm text-white mb-2">
                  A contractor starts work without completing RAMS documentation. An accident occurs and HSE investigation reveals poor planning. Result: prosecution and £75,000 fine.
                </p>
                <p className="text-xs text-white font-medium">Impact: Unlimited fine + prosecution</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Practical Guidance</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="rounded-lg p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800">
              <h3 className="font-medium text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Best Practices
              </h3>
              <ul className="text-xs sm:text-sm text-white space-y-2">
                <li>• Always complete documentation immediately after tasks</li>
                <li>• Use standard templates or digital software for consistency</li>
                <li>• Keep certificates and logs securely stored but accessible</li>
                <li>• Review and update documents when changes occur</li>
                <li>• Train all site staff on the importance of record keeping</li>
                <li>• Implement quality checks before document sign-off</li>
                <li>• Backup digital records to prevent data loss</li>
                <li>• Use clear, legible handwriting for manual records</li>
              </ul>
            </div>
            <div className="rounded-lg p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-blue-200 dark:border-blue-800">
              <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-3 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Key Actions
              </h3>
              <ul className="text-xs sm:text-sm text-white space-y-2">
                <li>• Document all installations, tests, and modifications</li>
                <li>• Use the correct certificates (Installation, Minor Works)</li>
                <li>• Keep daily site logs for traceability</li>
                <li>• Store records securely but accessibly</li>
                <li>• Update documents with every change</li>
                <li>• Include photographic evidence where helpful</li>
                <li>• Cross-reference related documents</li>
                <li>• Maintain calibration records for test equipment</li>
              </ul>
            </div>
          </div>
          
          {/* Digital vs Paper Records */}
          <div className="mb-6">
            <h3 className="font-medium text-white mb-4">Digital vs Paper Records</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-white/10">
                <h4 className="font-medium text-white mb-2">Digital Systems</h4>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-medium text-green-600 dark:text-green-400">Advantages:</p>
                    <ul className="text-xs text-white list-disc ml-4 space-y-1">
                      <li>Automatic backup and version control</li>
                      <li>Easy searching and filtering</li>
                      <li>Integration with test equipment</li>
                      <li>Reduced storage space requirements</li>
                      <li>Environmental benefits</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-red-600 dark:text-elec-yellow">Considerations:</p>
                    <ul className="text-xs text-white list-disc ml-4 space-y-1">
                      <li>Requires reliable power and connectivity</li>
                      <li>Staff training on software systems</li>
                      <li>Data security and backup procedures</li>
                      <li>Legal acceptance of digital signatures</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-white/10">
                <h4 className="font-medium text-white mb-2">Paper Systems</h4>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-medium text-green-600 dark:text-green-400">Advantages:</p>
                    <ul className="text-xs text-white list-disc ml-4 space-y-1">
                      <li>No power or technology dependencies</li>
                      <li>Familiar to all site personnel</li>
                      <li>Original signatures widely accepted</li>
                      <li>Can be completed in any conditions</li>
                      <li>Simple to implement</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-red-600 dark:text-elec-yellow">Considerations:</p>
                    <ul className="text-xs text-white list-disc ml-4 space-y-1">
                      <li>Risk of loss or damage</li>
                      <li>Difficult to search and analyse</li>
                      <li>Storage space requirements</li>
                      <li>Manual transcription errors</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Record-Keeping Checklist */}
          <div className="rounded-lg p-4 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950/20 dark:to-green-950/20 border border-blue-200 dark:border-blue-800">
            <h3 className="font-medium text-white mb-3">Daily Record-Keeping Checklist</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-white mb-2">Before Work Starts:</p>
                <ul className="text-xs text-white space-y-1">
                  <li>☐ RAMS reviewed and understood</li>
                  <li>☐ Test equipment calibration checked</li>
                  <li>☐ Previous day's work verified</li>
                  <li>☐ Material delivery records updated</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-white mb-2">End of Day:</p>
                <ul className="text-xs text-white space-y-1">
                  <li>☐ Work progress recorded</li>
                  <li>☐ Test results documented</li>
                  <li>☐ Any variations noted</li>
                  <li>☐ Tomorrow's plan documented</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Pocket Guide */}
        <Card className="mb-8 p-6 bg-gradient-to-r from-card/10 to-emerald-500/10 border-white/10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Clipboard className="w-5 h-5" />
            Pocket Guide
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
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
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-white/10 pb-4 last:border-b-0">
                <h3 className="font-medium text-white mb-2">{faq.question}</h3>
                <p className="text-sm text-white">{faq.answer}</p>
              </div>
            ))}
          </div>
          
          {/* Additional FAQs */}
          <div className="mt-6 pt-6 border-t border-white/10 space-y-4">
            <div className="border-b border-white/10 pb-4">
              <h3 className="font-medium text-white mb-2">What should I do if I find errors in existing records?</h3>
              <p className="text-sm text-white">Report errors immediately to your supervisor. For safety-critical information, stop work until corrected. Document any corrections properly with date, signature, and reason for change.</p>
            </div>
            <div className="border-b border-white/10 pb-4">
              <h3 className="font-medium text-white mb-2">How do I handle records during bad weather or difficult conditions?</h3>
              <p className="text-sm text-white">Use weatherproof covers for paper records and protective cases for electronic devices. Consider temporary recording methods with proper transfer to permanent records when conditions improve.</p>
            </div>
            <div className="border-b border-white/10 pb-4">
              <h3 className="font-medium text-white mb-2">What happens if records are lost or damaged?</h3>
              <p className="text-sm text-white">Notify your supervisor immediately. Reconstruct what you can from memory and other sources, but clearly mark reconstructed information. This may require additional testing to verify safety.</p>
            </div>
            <div>
              <h3 className="font-medium text-white mb-2">Can apprentices sign electrical certificates?</h3>
              <p className="text-sm text-white">No, only qualified electricians with appropriate competency can sign electrical certificates. Apprentices can assist with record keeping but qualified supervision is required for certification.</p>
            </div>
          </div>
        </Card>

        {/* Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Recap</h2>
          <p className="text-base text-white mb-4">
            In this subsection, you learned the importance of accurate records for compliance and safety. You explored the types of records used in electrical work, the risks of poor documentation, and how proper record keeping ensures compliance, safety, and efficiency. The real-world scenario showed how missing records can cause costly mistakes.
          </p>
        </Card>

        {/* Quiz */}
        <Quiz
          title="Test Your Knowledge"
          questions={quizQuestions}
        />

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-6 border-t border-white/10">
          <Button variant="outline" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 7
            </Link>
          </Button>
          <Button asChild>
            <Link to="../7-2">
              Next Subsection
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module5Section7_1;
