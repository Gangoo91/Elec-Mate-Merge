import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "evcharging-m1s3-check1",
    question: "Which regulation requires competence for all electrical work?",
    options: ["Building Regulations Part P", "Health and Safety at Work Act 1974", "Electricity at Work Regulations 1989", "CDM Regulations 2015"],
    correctIndex: 2,
    explanation: "The Electricity at Work Regulations 1989 specifically requires competence for all electrical work, including proper construction, maintenance, and safe working practices."
  },
  {
    id: "evcharging-m1s3-check2",
    question: "What is the minimum recommended public liability insurance for EV installers?",
    options: ["£500,000", "£1 million", "£2 million", "£5 million"],
    correctIndex: 2,
    explanation: "A minimum of £2 million public liability insurance is recommended for EV charging installers due to the high-value property damage potential and personal injury risks associated with high-power electrical installations."
  },
  {
    id: "evcharging-m1s3-check3",
    question: "How often should public EV charging installations typically be inspected?",
    options: ["Every 6 months", "1-3 years", "5 years", "10 years"],
    correctIndex: 1,
    explanation: "Public EV charging installations should typically be inspected every 1-3 years due to high usage levels. Higher usage locations may require annual inspection."
  }
];

const faqs = [
  {
    question: "Do I need to be part of a competent person scheme to install EV chargers?",
    answer: "While not strictly mandatory, membership of a competent person scheme (NICEIC, NAPIT, etc.) allows self-certification under Part P of the Building Regulations and is required for OZEV grant eligibility. It also provides insurance benefits and demonstrates professional competence."
  },
  {
    question: "What documentation must I provide after an EV charger installation?",
    answer: "You must provide an Electrical Installation Certificate (EIC) for new circuits, including test results. Additional documentation includes user manuals, warranty information, maintenance requirements, and G98/G99 notification confirmation if applicable."
  },
  {
    question: "What insurance do I need for EV charging installations?",
    answer: "Essential coverage includes public liability (minimum £2M), professional indemnity insurance, employer's liability if employing staff, and product liability. Cyber liability should be considered for smart charging systems."
  },
  {
    question: "What is the OZEV Approved Installer Scheme?",
    answer: "The OZEV (Office for Zero Emission Vehicles) scheme certifies installers who meet specific competency requirements, allowing them to install grant-funded chargers. Requirements include MCS certification, Level 3+ electrical qualification, 18th Edition certification, and appropriate insurance."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "An employer asks you to install EV chargers at their premises but skip the risk assessment to save time. What should you do?",
  options: [
    "Proceed without the risk assessment as they are the client",
    "Refuse the work and explain the legal requirement",
    "Complete a basic verbal risk assessment",
    "Install and do the risk assessment later"
  ],
  correctAnswer: 1,
  explanation: "Risk assessment is a legal requirement under the Health and Safety at Work Act 1974 and CDM Regulations 2015. Refusing work without proper safety procedures is the professional response. Installers have a duty of care that cannot be waived by client requests."
  }
];

const EVChargingModule1Section3 = () => {
  useSEO({
    title: "Installer Responsibilities | EV Charging Module 1.3",
    description: "Understand the legal, professional and safety responsibilities for EV charging installers including competent person schemes and documentation requirements."
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../ev-charging-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 1
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 1.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Installer Responsibilities and Regulations
          </h1>
          <p className="text-white/80">
            Professional duties and regulatory compliance for EV charging
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Legal:</strong> H&S Act 1974, EAWR 1989, Building Regs</li>
              <li><strong>Schemes:</strong> NICEIC, NAPIT, ECA for self-certification</li>
              <li><strong>Docs:</strong> EIC, risk assessment, G98/G99 notifications</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Part P requirements, OZEV scheme eligibility</li>
              <li><strong>Use:</strong> Risk assessment before every installation</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify key legal responsibilities for installers",
              "Understand competent person scheme requirements",
              "Apply risk assessment and safety procedures",
              "Complete proper documentation and certification",
              "Recognise ongoing maintenance responsibilities",
              "Navigate OZEV approved installer requirements"
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
            Legal Framework
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              EV charging installations must comply with multiple legal requirements. Understanding
              your obligations protects you, your clients, and ensures safe installations.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Primary Legislation</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>H&S at Work Act 1974:</strong> Duty of care</li>
                  <li><strong>EAWR 1989:</strong> Competence requirement</li>
                  <li><strong>Building Regs Part P:</strong> Notification</li>
                  <li><strong>CDM 2015:</strong> Construction safety</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Insurance Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Public liability:</strong> £2M minimum</li>
                  <li><strong>Professional indemnity:</strong> Design errors</li>
                  <li><strong>Employer's liability:</strong> If employing staff</li>
                  <li><strong>Product liability:</strong> Equipment defects</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm text-white">
                <strong className="text-red-400">Critical:</strong> EV charging installations operate
                at high power levels with potentially lethal voltages. Professional competence,
                regulatory compliance, and safety awareness are non-negotiable requirements.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Competent Person Schemes
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Competent person schemes allow qualified installers to self-certify work under
              Building Regulations Part P without involving Building Control.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">NICEIC</p>
                <p className="text-white/90 text-xs">Approved contractor</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">NAPIT</p>
                <p className="text-white/90 text-xs">Flexible membership</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">ECA/JIB</p>
                <p className="text-white/90 text-xs">Trade association</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Typical Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Level 3 electrical qualification minimum</li>
                <li>18th Edition BS 7671 certification (current)</li>
                <li>Inspection and Testing qualification (2391-52)</li>
                <li>EV charging specific training</li>
                <li>Annual assessment and technical monitoring</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">OZEV Approved Installer Scheme</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Purpose:</strong> Required for grant-funded installations</li>
                <li><strong>Requirements:</strong> MCS certification, Level 3+ qualification, 18th Edition</li>
                <li><strong>Benefits:</strong> Grant eligibility, customer confidence, market differentiation</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Risk Assessment and Safety
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Systematic risk assessment is both a legal requirement and essential for safe
              installations. Every EV charging project requires documented assessment.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Site-Specific Hazards</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Existing electrical installation condition</li>
                  <li>Working at height requirements</li>
                  <li>Underground services and utilities</li>
                  <li>Public access and traffic management</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Electrical Safety</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Isolation and lock-off procedures</li>
                  <li>Voltage testing and proving</li>
                  <li>PPE requirements</li>
                  <li>Arc flash and shock protection</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Safe Systems of Work:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Method statements:</strong> Step-by-step installation procedures</li>
                <li><strong>Permit to work:</strong> High-risk activity authorisation</li>
                <li><strong>Emergency procedures:</strong> First aid and incident response</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Documentation Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Proper documentation protects both installer and client while demonstrating
              compliance with regulations.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Certificates</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>EIC:</strong> Required for all new circuits</li>
                  <li><strong>MEIWC:</strong> Additions to existing circuits</li>
                  <li><strong>Test results:</strong> Full schedule required</li>
                  <li><strong>Departures:</strong> Note any deviations from BS 7671</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Additional Documents</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Building Control:</strong> Part P self-certification</li>
                  <li><strong>DNO notifications:</strong> G98/G99 applications</li>
                  <li><strong>Handover pack:</strong> User manuals, warranty info</li>
                  <li><strong>Maintenance schedule:</strong> Recommended intervals</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Periodic Inspection Intervals:</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex justify-between p-2 bg-white/5 rounded">
                  <span>Domestic:</span>
                  <span className="text-elec-yellow">10 years</span>
                </div>
                <div className="flex justify-between p-2 bg-white/5 rounded">
                  <span>Commercial:</span>
                  <span className="text-elec-yellow">5 years</span>
                </div>
                <div className="flex justify-between p-2 bg-white/5 rounded">
                  <span>Public charging:</span>
                  <span className="text-elec-yellow">1-3 years</span>
                </div>
                <div className="flex justify-between p-2 bg-white/5 rounded">
                  <span>High usage:</span>
                  <span className="text-elec-yellow">1 year</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Professional Best Practice</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Maintain current qualifications and CPD records</li>
                <li>Document all risk assessments before starting work</li>
                <li>Issue certificates promptly after completion</li>
                <li>Keep copies of all documentation for insurance purposes</li>
                <li>Register with OZEV scheme for grant-funded work</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Skipping risk assessment:</strong> — Legal requirement, not optional</li>
                <li><strong>Incomplete certificates:</strong> — All sections must be completed</li>
                <li><strong>Missing DNO notification:</strong> — G98/G99 required for applicable installations</li>
                <li><strong>Inadequate insurance:</strong> — Review coverage annually as work expands</li>
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
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Reference */}
        <div className="mt-6 p-5 rounded-lg bg-transparent">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">Key Legislation</p>
              <ul className="space-y-0.5">
                <li>Health & Safety at Work Act 1974</li>
                <li>Electricity at Work Regulations 1989</li>
                <li>Building Regulations Part P</li>
                <li>CDM Regulations 2015</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Documentation</p>
              <ul className="space-y-0.5">
                <li>Electrical Installation Certificate</li>
                <li>Risk assessment records</li>
                <li>G98/G99 notifications</li>
                <li>Part P self-certification</li>
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
            <Link to="../ev-charging-module-1-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../ev-charging-module-1-section-4">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EVChargingModule1Section3;