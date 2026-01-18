import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "evcharging-m7s4-check1",
    question: "How long must installation records be retained under OZEV requirements?",
    options: ["3 years", "5 years", "7 years", "10 years minimum"],
    correctIndex: 3,
    explanation: "Installation records must be retained for a minimum of 10 years. Financial records require 7 years (HMRC), and certain health and safety records must be kept for 40 years."
  },
  {
    id: "evcharging-m7s4-check2",
    question: "What is the recommended Recovery Time Objective (RTO) for critical systems?",
    options: ["24 hours", "12 hours", "4 hours", "1 hour"],
    correctIndex: 2,
    explanation: "Critical systems should have an RTO of 4 hours, meaning you can recover operations within that timeframe. Recovery Point Objective (RPO) should be maximum 1 hour data loss."
  },
  {
    id: "evcharging-m7s4-check3",
    question: "Which backup strategy is recommended for business records?",
    options: ["Single backup only", "3-2-1 rule", "Monthly backups", "Cloud only"],
    correctIndex: 1,
    explanation: "The 3-2-1 backup rule means: 3 copies of data, on 2 different media types, with 1 copy stored off-site. This provides robust protection against data loss."
  }
];

const faqs = [
  {
    question: "What documents should be readily available for an audit?",
    answer: "Installation certificates, customer contracts, equipment specifications, test results, training records, insurance certificates, complaint handling documentation, and quality management procedures should all be easily accessible."
  },
  {
    question: "How often are OZEV audits conducted?",
    answer: "Initial approval audit, annual surveillance audits, random spot checks, and renewal audits every 3 years. Customer complaint investigations may also trigger additional audits."
  },
  {
    question: "What are the key GDPR requirements for EV installers?",
    answer: "Lawful processing with customer consent, purpose limitation, data minimisation, accuracy, storage limitation, and security. You must also manage subject access requests and report data breaches."
  },
  {
    question: "What happens if records are unavailable during an audit?",
    answer: "Missing records can result in non-conformities, delayed approval renewal, or in serious cases, suspension of approved installer status. Always maintain comprehensive, organised documentation."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "An installer is preparing for their first OZEV audit in 4 weeks. What should be their priority action?",
  options: [
    "Wait until the week before to gather documents",
    "Conduct internal document review and organise archives",
    "Focus only on recent installations",
    "Delete outdated records to simplify the audit"
  ],
  correctAnswer: 1,
  explanation: "Comprehensive document review and organisation is critical. Verify completeness of all project files, check document versions are current, organise both physical and digital archives, and prepare a document index."
  }
];

const EVChargingModule7Section4 = () => {
  useSEO({
    title: "Audit-Readiness and Record-Keeping | EV Charging Module 7.4",
    description: "Master comprehensive record-keeping systems and audit preparation for OZEV compliance and business excellence in EV charging installations."
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician/upskilling/ev-charging-module-7">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 7.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Audit-Readiness and Record-Keeping
          </h1>
          <p className="text-white/80">
            Maintaining comprehensive records for compliance and audit excellence
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Retention:</strong> 10+ years for installations</li>
              <li><strong>Backup:</strong> 3-2-1 rule (3 copies, 2 media, 1 off-site)</li>
              <li><strong>RTO:</strong> 4 hours for critical systems</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Audit Frequency</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Initial:</strong> Before approval granted</li>
              <li><strong>Annual:</strong> Surveillance audits</li>
              <li><strong>Renewal:</strong> Every 3 years</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Establish record-keeping systems for OZEV compliance",
              "Prepare effectively for audits and inspections",
              "Implement digital document management",
              "Understand legal record retention requirements",
              "Develop quality assurance monitoring",
              "Create business continuity plans"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Legal Record-Keeping Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Comprehensive record-keeping is fundamental for OZEV approved installers. Understanding
              retention periods and mandatory documentation ensures compliance and protects your business.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Mandatory Records</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Installation certificates (all projects)</li>
                  <li>Customer contracts and agreements</li>
                  <li>Equipment specifications and warranties</li>
                  <li>Testing and commissioning results</li>
                  <li>Training and qualification records</li>
                  <li>Insurance certificates and renewals</li>
                  <li>Complaint handling documentation</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Retention Periods</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Installation records:</strong> 10 years minimum</li>
                  <li><strong>Financial records:</strong> 7 years (HMRC)</li>
                  <li><strong>Training certificates:</strong> Validity + 2 years</li>
                  <li><strong>Insurance records:</strong> 7 years post-expiry</li>
                  <li><strong>Customer contracts:</strong> 7 years post-completion</li>
                  <li><strong>H&S records:</strong> Up to 40 years (certain types)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Digital Document Management
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A robust digital document management system ensures rapid retrieval during audits,
              protects against data loss, and maintains security compliance.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">File Organisation</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Master folder: Company_Documents</li>
                  <li>Year folders: 2024, 2023, etc.</li>
                  <li>Project folders: ProjectRef_ClientName</li>
                  <li>Categories: Pre-install, Installation, Post</li>
                  <li>Version control: v1, v2, v_FINAL</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Security Measures</p>
                <ul className="text-sm text-white space-y-1">
                  <li>End-to-end encryption</li>
                  <li>Multi-factor authentication</li>
                  <li>Role-based access permissions</li>
                  <li>Audit trails and logging</li>
                  <li>Regular security updates</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">3 Copies</p>
                <p className="text-white text-xs">Multiple backups</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">2 Media</p>
                <p className="text-white text-xs">Different types</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">1 Off-site</p>
                <p className="text-white text-xs">Remote location</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Audit Preparation and Response
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective audit preparation ensures smooth inspections and demonstrates professional
              compliance. A systematic approach prevents last-minute stress and missed documentation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Pre-Audit Checklist:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Step 1:</strong> Review and organise all project files</li>
                <li><strong>Step 2:</strong> Verify document versions and currency</li>
                <li><strong>Step 3:</strong> Check qualification and insurance validity</li>
                <li><strong>Step 4:</strong> Brief staff on audit procedures</li>
                <li><strong>Step 5:</strong> Prepare document index and register</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">During Audit</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Designate audit liaison person</li>
                  <li>Respond promptly to requests</li>
                  <li>Honest, transparent communication</li>
                  <li>Professional workspace</li>
                  <li>Rapid document retrieval</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">KPI Targets</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Installation success rate: &gt;95%</li>
                  <li>Customer satisfaction: &gt;4.5/5</li>
                  <li>Defect rate: &lt;2%</li>
                  <li>Compliance score: 100%</li>
                  <li>Grant claim success: &gt;98%</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Business Continuity Planning</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Recovery Time Objective (RTO): 4 hours for critical systems</li>
                <li>Recovery Point Objective (RPO): Maximum 1 hour data loss</li>
                <li>Quarterly disaster recovery testing and validation</li>
                <li>Annual business continuity plan review</li>
                <li>Staff training on emergency procedures</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Audit Findings to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Incomplete project files:</strong> — Use checklists for every installation</li>
                <li><strong>Outdated qualifications:</strong> — Set expiry alerts for all certificates</li>
                <li><strong>Poor organisation:</strong> — Standardise naming and filing systems</li>
                <li><strong>Weak complaint handling:</strong> — Document all customer interactions</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Reference */}
        <div className="mt-6 p-5 rounded-lg bg-transparent">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">Key Retention Periods</p>
              <ul className="space-y-0.5">
                <li>Installation records: 10 years</li>
                <li>Financial records: 7 years</li>
                <li>Insurance: 7 years post-expiry</li>
                <li>Contracts: 7 years post-completion</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Recovery Objectives</p>
              <ul className="space-y-0.5">
                <li>RTO: 4 hours (critical)</li>
                <li>RPO: 1 hour max data loss</li>
                <li>Backup testing: Quarterly</li>
                <li>Plan review: Annually</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <section className="mb-10 mt-12">
          <SingleQuestionQuiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/ev-charging-module-7-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/ev-charging-course">
              Complete Course
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EVChargingModule7Section4;