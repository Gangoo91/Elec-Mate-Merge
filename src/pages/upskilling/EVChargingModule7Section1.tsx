import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "evcharging-m7s1-check1",
    question: "What is the maximum grant amount per socket under the Workplace Charging Scheme?",
    options: ["£250", "£350", "£500", "£750"],
    correctIndex: 1,
    explanation: "The WCS provides up to £350 per socket, covering up to 75% of total costs. The maximum number of sockets per applicant is 40."
  },
  {
    id: "evcharging-m7s1-check2",
    question: "What is the minimum charging power required for WCS-eligible equipment?",
    options: ["2.3kW", "3.6kW", "7kW", "11kW"],
    correctIndex: 1,
    explanation: "WCS-eligible charging equipment must have a minimum 3.6kW output power, be Mode 3 (Type 1 or Type 2), and have smart charging capability."
  },
  {
    id: "evcharging-m7s1-check3",
    question: "Who must install chargers funded under OZEV schemes?",
    options: [
      "Any qualified electrician",
      "OZEV approved installer",
      "Manufacturer representative",
      "Building control officer"
    ],
    correctIndex: 1,
    explanation: "OZEV grants require installation by an OZEV approved installer using OZEV approved equipment. This ensures quality standards and protects public investment."
  }
];

const faqs = [
  {
    question: "What is the difference between WCS and EVHS grants?",
    answer: "WCS (Workplace Charging Scheme) is for businesses, charities, and public sector organisations. EVHS (Electric Vehicle Homecharge Scheme) is for residential properties. Both provide up to £350 per socket/charger."
  },
  {
    question: "Can domestic landlords apply for OZEV grants?",
    answer: "Yes, residential landlords can apply for grants to install chargers in rental properties, allowing tenants with EVs to charge at home. Specific eligibility criteria apply."
  },
  {
    question: "What happens if installation costs exceed the grant amount?",
    answer: "Grants cover up to 75% of costs, with a maximum of £350 per socket. The customer pays the difference between total cost and grant value. Always provide clear quotes showing grant contribution."
  },
  {
    question: "How long does the grant application process take?",
    answer: "Typical processing is 4-8 weeks from application to payment. Installation must be completed within 6 months of approval, and evidence submitted within 30 days of completion."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A business wants to install 50 charging points under WCS. What is the maximum grant they can receive?",
  options: [
    "£17,500 (50 × £350)",
    "£14,000 (40 × £350 maximum)",
    "£12,500 (50 × £250)",
    "£25,000 (50 × £500)"
  ],
  correctAnswer: 1,
  explanation: "WCS limits grants to a maximum of 40 sockets per applicant. Even though 50 points are requested, only 40 qualify for grant funding: 40 × £350 = £14,000 maximum. The remaining 10 points must be fully funded by the customer."
  }
];

const EVChargingModule7Section1 = () => {
  useSEO({
    title: "OZEV and Workplace Charging Scheme Explained | EV Charging Module 7.1",
    description: "Learn about OZEV grants, workplace charging schemes, and government incentives for EV infrastructure installations."
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
            <Link to="/study-centre/upskilling/ev-charging-module-7">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 7
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 7.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            OZEV and Workplace Charging Scheme
          </h1>
          <p className="text-white/80">
            Understanding government incentives for EV charging infrastructure
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>WCS:</strong> Up to £350/socket, max 40 sockets</li>
              <li><strong>EVHS:</strong> Up to £350 or 75% of costs</li>
              <li><strong>Requirement:</strong> OZEV approved installer</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Requirements</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Equipment:</strong> OZEV approved, min 3.6kW</li>
              <li><strong>Smart charging:</strong> Mandatory capability</li>
              <li><strong>Mode 3:</strong> Type 1 or Type 2 required</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the purpose and structure of OZEV grants",
              "Identify eligibility criteria for different schemes",
              "Understand WCS requirements and application",
              "Navigate the approval and claim process",
              "Recognise installer obligations under grants",
              "Calculate grant funding and project costs"
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
            What is OZEV?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Office for Zero Emission Vehicles (OZEV) is a government body that administers
              various grant schemes to accelerate EV charging infrastructure deployment across the UK.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">OZEV Objectives</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• Reduce barriers to EV adoption</li>
                  <li>• Support charging infrastructure growth</li>
                  <li>• Drive innovation in zero emission transport</li>
                  <li>• Ensure equitable access to charging</li>
                  <li>• Protect public investment with standards</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Available Schemes</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• Workplace Charging Scheme (WCS)</li>
                  <li>• Electric Vehicle Homecharge Scheme (EVHS)</li>
                  <li>• On-Street Residential Scheme</li>
                  <li>• Local EV Infrastructure Fund (LEVI)</li>
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
            Workplace Charging Scheme (WCS)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              WCS provides vouchers towards the purchase and installation of EV charge points
              for eligible businesses, charities, and public sector organisations.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Grant Details</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• Up to £350 per socket</li>
                  <li>• Maximum 40 sockets per applicant</li>
                  <li>• Covers up to 75% of total costs</li>
                  <li>• Includes equipment and installation</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Eligibility</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• UK-based organisations</li>
                  <li>• Dedicated parking spaces required</li>
                  <li>• Staff or fleet use charging</li>
                  <li>• Smart charging capability mandatory</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-sm font-medium text-red-400 mb-2">Scheme Status</p>
              <p className="text-sm text-white/80">
                WCS availability varies — always check the current status on the OZEV website
                before advising clients. Schemes can close or change without warning.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Technical Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              All OZEV-funded installations must meet specific technical standards to
              ensure quality and protect the public investment.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Charging Point Standards</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• Mode 3 charging (Type 1 or Type 2)</li>
                  <li>• Minimum 3.6kW output power</li>
                  <li>• Smart charging capability required</li>
                  <li>• OZEV approved equipment only</li>
                  <li>• Network connectivity required</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Standards</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• BS 7671 compliance mandatory</li>
                  <li>• IET Code of Practice adherence</li>
                  <li>• Building Regulations compliance</li>
                  <li>• Appropriate RCD protection</li>
                  <li>• Load management where required</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Application Process
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="my-6 space-y-4">
              <div className="p-3 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-elec-yellow/80 mb-1">1. Pre-Application Checks</p>
                <p className="text-xs text-white/80">Verify eligibility, site survey, electrical assessment, DNO capacity check</p>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-elec-yellow/80 mb-1">2. Online Application</p>
                <p className="text-xs text-white/80">Complete form, upload site plans, provide installer certifications</p>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-elec-yellow/80 mb-1">3. Installation Phase</p>
                <p className="text-xs text-white/80">Use OZEV approved equipment, complete testing, issue certificates</p>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-elec-yellow/80 mb-1">4. Grant Claim</p>
                <p className="text-xs text-white/80">Submit evidence, final invoices, installation photos for reimbursement</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key Timelines:</p>
              <ul className="text-sm text-white/80 space-y-1 ml-4">
                <li>• Installation: Within 6 months of approval</li>
                <li>• Evidence: Within 30 days of completion</li>
                <li>• Processing: 4-8 weeks typical</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Application Best Practice</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always verify equipment is on OZEV approved list</li>
                <li>Complete site surveys before application</li>
                <li>Keep detailed photographic evidence throughout</li>
                <li>Submit documentation promptly after installation</li>
                <li>Maintain copies of all grant correspondence</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Non-approved equipment:</strong> — always check OZEV database</li>
                <li><strong>Missing smart capability:</strong> — mandatory for all grants</li>
                <li><strong>Incomplete documentation:</strong> — leads to delayed payments</li>
                <li><strong>Expired installer approval:</strong> — invalidates the grant</li>
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
              <p className="font-medium text-white mb-1">Grant Amounts</p>
              <ul className="space-y-0.5">
                <li>WCS: £350/socket (max 40)</li>
                <li>EVHS: £350 or 75% (lower)</li>
                <li>Both: OZEV approved installer</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Equipment Requirements</p>
              <ul className="space-y-0.5">
                <li>Mode 3 (Type 1/2)</li>
                <li>Minimum 3.6kW</li>
                <li>Smart charging capable</li>
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
            <Link to="/study-centre/upskilling/ev-charging-module-7">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Module Overview
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/ev-charging-module-7-section-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EVChargingModule7Section1;