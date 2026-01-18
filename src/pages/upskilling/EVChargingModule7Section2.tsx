import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "evcharging-m7s2-check1",
    question: "Which qualification is specifically required for EV charging installation?",
    options: ["City & Guilds 2391", "City & Guilds 2919", "18th Edition only", "Part P only"],
    correctIndex: 1,
    explanation: "City & Guilds 2919 (Level 3 Award in Electric Vehicle Charging Equipment Installation) is the specific qualification required. Other qualifications like 18th Edition and 2391 are also needed but aren't EV-specific."
  },
  {
    id: "evcharging-m7s2-check2",
    question: "What is the minimum public liability insurance required for OZEV approval?",
    options: ["£500,000", "£1 million", "£2 million", "£5 million"],
    correctIndex: 2,
    explanation: "OZEV requires minimum £2 million public liability insurance. Professional indemnity must be at least £500,000. These minimums protect both installers and customers."
  },
  {
    id: "evcharging-m7s2-check3",
    question: "How many completed EV installations are typically required in a portfolio?",
    options: ["None required", "Minimum 3", "Minimum 5", "Minimum 10"],
    correctIndex: 2,
    explanation: "A minimum of 5 completed EV charging installations with full documentation is typically required. This demonstrates practical competency and real-world experience."
  }
];

const faqs = [
  {
    question: "How long does the OZEV approval process take?",
    answer: "The approval process typically takes 4-8 weeks from initial application to approval, depending on completeness of documentation and any queries raised during review."
  },
  {
    question: "What ongoing obligations do approved installers have?",
    answer: "Ongoing obligations include maintaining valid qualifications, insurance coverage, submitting accurate installation reports, participating in audits, and attending mandatory training updates annually."
  },
  {
    question: "Can I apply as a sole trader or must I be a limited company?",
    answer: "Both sole traders and limited companies can apply for OZEV approval, provided they meet all competency, insurance, and documentation requirements."
  },
  {
    question: "What happens if my approval lapses?",
    answer: "If approval lapses due to expired qualifications or insurance, you cannot claim grants until the issue is resolved. Multiple lapses may result in removal from the approved installer list."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "An electrician wants to become OZEV approved but only has 18th Edition and 2391 qualifications. What is their most critical next step?",
  options: [
    "Apply immediately with current qualifications",
    "Complete City & Guilds 2919 EV installation training",
    "Wait for automatic approval based on experience",
    "Only install non-grant funded chargers"
  ],
  correctAnswer: 1,
  explanation: "City & Guilds 2919 is mandatory for OZEV approval. Without this specific EV installation qualification, the application will be rejected regardless of other credentials."
  }
];

const EVChargingModule7Section2 = () => {
  useSEO({
    title: "Approved Installer Registration Process | EV Charging Module 7.2",
    description: "Learn how to become an OZEV approved installer including registration requirements, competency standards, and ongoing compliance obligations."
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
            <Link to="..">
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
            <span>Module 7.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Approved Installer Registration Process
          </h1>
          <p className="text-white/80">
            Becoming an approved EV charging installer with OZEV certification
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Key qual:</strong> City & Guilds 2919 (EV specific)</li>
              <li><strong>Insurance:</strong> £2M PL + £500K PI minimum</li>
              <li><strong>Portfolio:</strong> 5+ completed installations</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Business Benefits</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Access:</strong> Grant-funded projects</li>
              <li><strong>Trust:</strong> Government-backed credibility</li>
              <li><strong>Market:</strong> Growing EV infrastructure demand</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Requirements for OZEV installer approval",
              "Navigate the registration application process",
              "Identify required competencies and qualifications",
              "Recognise ongoing compliance obligations",
              "Implement quality management systems",
              "Understand insurance and liability requirements"
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
            Essential Qualifications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              To deliver EV charging installations under OZEV grant schemes, installers must hold
              specific qualifications demonstrating competency in both general electrical work
              and EV-specific installation requirements.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Mandatory Qualifications</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>City & Guilds 2919:</strong> EV Charging Installation</li>
                  <li><strong>18th Edition:</strong> BS 7671 Wiring Regulations</li>
                  <li><strong>2391-52:</strong> Inspection and Testing</li>
                  <li><strong>Part P:</strong> Building Regulations (domestic)</li>
                  <li><strong>Trade body:</strong> ECS/JIB/NICEIC registration</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Professional Development</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Minimum 20 hours CPD annually</li>
                  <li>Technical update seminars</li>
                  <li>Manufacturer-specific training</li>
                  <li>Regulation changes briefings</li>
                  <li>5-year 2919 renewal cycle</li>
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
            Insurance and Liability Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Appropriate insurance coverage is mandatory for OZEV approval. These requirements
              protect both the installer and customers throughout the installation process and
              warranty period.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Mandatory Insurance</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Public liability:</strong> Minimum £2 million</li>
                  <li><strong>Professional indemnity:</strong> Minimum £500,000</li>
                  <li><strong>Employers liability:</strong> If applicable</li>
                  <li><strong>Product liability:</strong> Included coverage</li>
                  <li><strong>Renewal:</strong> Annual policy required</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Coverage Areas</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Installation defects and errors</li>
                  <li>Property damage during work</li>
                  <li>Third-party injury claims</li>
                  <li>Equipment failure consequences</li>
                  <li>Legal defence costs</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Application Process
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The approval process involves several stages designed to verify competency and
              ensure compliance with OZEV standards. Preparation is key to a smooth application.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Registration Steps:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Step 1:</strong> Submit online application with documentation</li>
                <li><strong>Step 2:</strong> Document review and verification by OZEV</li>
                <li><strong>Step 3:</strong> Technical assessment and competency evaluation</li>
                <li><strong>Step 4:</strong> Approval decision and credentials issued</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Business Documentation</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Companies House registration</li>
                  <li>VAT registration certificate</li>
                  <li>Insurance certificates</li>
                  <li>Health and safety policy</li>
                  <li>Quality management procedures</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Portfolio Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Minimum 5 completed EV installations</li>
                  <li>EICs for each project</li>
                  <li>Customer testimonials</li>
                  <li>Installation photographs</li>
                  <li>Compliance evidence</li>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Quality Management Requirements</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Document control procedures for all installations</li>
                <li>Customer satisfaction monitoring and feedback</li>
                <li>Corrective action procedures for defects</li>
                <li>Initial response within 24 hours to enquiries</li>
                <li>12-month warranty on all installations minimum</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Application Mistakes</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Expired certificates:</strong> — Check all expiry dates before submission</li>
                <li><strong>Incomplete portfolio:</strong> — Prepare comprehensive project documentation</li>
                <li><strong>Poor quality documents:</strong> — Ensure high resolution, clearly legible files</li>
                <li><strong>Inadequate insurance:</strong> — Verify coverage meets OZEV minimums</li>
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
              <p className="font-medium text-white mb-1">Required Qualifications</p>
              <ul className="space-y-0.5">
                <li>City & Guilds 2919</li>
                <li>18th Edition BS 7671</li>
                <li>2391-52 Testing</li>
                <li>Part P (domestic)</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Insurance Minimums</p>
              <ul className="space-y-0.5">
                <li>Public liability: £2M</li>
                <li>Professional indemnity: £500K</li>
                <li>Portfolio: 5+ installations</li>
                <li>CPD: 20 hours/year</li>
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
            <Link to="/study-centre/upskilling/ev-charging-module-7-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/ev-charging-module-7-section-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EVChargingModule7Section2;