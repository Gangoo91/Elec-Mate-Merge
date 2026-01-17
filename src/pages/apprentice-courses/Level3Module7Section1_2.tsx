/**
 * Level 3 Module 7 Section 1.2 - Self-employment vs Employment Routes
 * Comparing employed and self-employed career paths in the electrical industry
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Self-employment vs Employment Routes - Level 3 Module 7 Section 1.2";
const DESCRIPTION = "Comparing employed and self-employed career paths in the UK electrical industry, including tax, insurance, and business considerations.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is a UTR number used for in the UK?",
    options: [
      "Proving electrical competence on site",
      "Registering with HMRC as self-employed for tax purposes",
      "Joining a trade body like NICEIC",
      "Applying for an ECS card"
    ],
    correctIndex: 1,
    explanation: "A Unique Taxpayer Reference (UTR) is a 10-digit number issued by HMRC when you register as self-employed. It is used for filing Self Assessment tax returns and managing your tax affairs."
  },
  {
    id: "check-2",
    question: "Which type of insurance is a legal requirement for self-employed electricians with employees?",
    options: [
      "Professional indemnity insurance",
      "Tool insurance",
      "Employers' liability insurance",
      "Building and contents insurance"
    ],
    correctIndex: 2,
    explanation: "Employers' liability insurance is a legal requirement if you employ anyone (including subcontractors in some cases). It covers compensation claims from employees injured or made ill through work."
  },
  {
    id: "check-3",
    question: "What is IR35 legislation designed to address?",
    options: [
      "Electrical safety standards",
      "Workers operating as contractors but actually working like employees",
      "VAT registration thresholds",
      "Health and safety requirements"
    ],
    correctIndex: 1,
    explanation: "IR35 (off-payroll working rules) targets 'disguised employment' - where workers provide services through their own company but would be classed as employees if engaged directly. It affects tax and National Insurance contributions."
  },
  {
    id: "check-4",
    question: "What is a key advantage of being employed rather than self-employed?",
    options: [
      "You can charge whatever rates you want",
      "Guaranteed income with holiday pay and sick pay",
      "You keep all the money you earn",
      "You can work for multiple companies simultaneously"
    ],
    correctIndex: 1,
    explanation: "Employment provides financial security through regular guaranteed income, statutory holiday pay (minimum 28 days), sick pay, pension contributions, and protection from unfair dismissal - benefits not available to the self-employed."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the main difference between being 'self-employed' and running a 'limited company'?",
    options: [
      "There is no difference",
      "Self-employed means you are personally liable; limited company provides liability protection",
      "Limited companies cannot employ anyone",
      "Self-employed people earn more"
    ],
    correctAnswer: 1,
    explanation: "As a sole trader (self-employed), you are personally liable for business debts. A limited company is a separate legal entity, providing some protection for personal assets, though directors can still be personally liable in certain circumstances."
  },
  {
    id: 2,
    question: "At what turnover threshold must a business register for VAT in the UK (2024/25)?",
    options: [
      "£50,000",
      "£90,000",
      "£100,000",
      "£150,000"
    ],
    correctAnswer: 1,
    explanation: "The VAT registration threshold is £90,000 (as of April 2024). Once your taxable turnover exceeds this in a 12-month period, you must register for VAT. You can voluntarily register below this threshold."
  },
  {
    id: 3,
    question: "Which of the following is NOT typically an advantage of self-employment?",
    options: [
      "Flexibility in choosing work and clients",
      "Potential for higher earnings",
      "Guaranteed pension contributions from an employer",
      "Tax efficiency through business expenses"
    ],
    correctAnswer: 2,
    explanation: "Self-employed workers do not receive employer pension contributions - they must arrange and fund their own pension. This is a significant benefit lost when leaving employment."
  },
  {
    id: 4,
    question: "What is public liability insurance designed to cover?",
    options: [
      "Damage to your own tools",
      "Your personal tax affairs",
      "Claims from third parties for injury or property damage caused by your work",
      "Vehicle breakdowns"
    ],
    correctAnswer: 2,
    explanation: "Public liability insurance covers claims made against you by members of the public or clients for injury, death, or damage to their property caused by your business activities. It is essential for electricians working on client premises."
  },
  {
    id: 5,
    question: "What does CIS stand for in the context of construction work?",
    options: [
      "Construction Industry Scheme - tax deduction system for subcontractors",
      "Certified Installation Scheme - quality assurance",
      "Contractor Insurance Standard",
      "Commercial Inspection Service"
    ],
    correctAnswer: 0,
    explanation: "The Construction Industry Scheme (CIS) is a tax deduction scheme where contractors deduct money from subcontractor payments and pass it to HMRC. The deduction counts towards the subcontractor's tax and NI bill."
  },
  {
    id: 6,
    question: "What is a key disadvantage of self-employment in the electrical industry?",
    options: [
      "You cannot join a competent person scheme",
      "Income can be irregular with no guaranteed work",
      "You cannot work on domestic installations",
      "You must always work alone"
    ],
    correctAnswer: 1,
    explanation: "Self-employed electricians face income uncertainty - work can be feast or famine, there is no sick pay, and finding consistent work requires ongoing marketing and networking effort."
  },
  {
    id: 7,
    question: "Which document would HMRC typically require from a self-employed electrician?",
    options: [
      "P60 form",
      "Self Assessment tax return",
      "P45 form",
      "PAYE coding notice"
    ],
    correctAnswer: 1,
    explanation: "Self-employed individuals must complete an annual Self Assessment tax return declaring income, expenses, and calculating tax due. P60 and P45 forms are for employees on PAYE."
  },
  {
    id: 8,
    question: "What is 'umbrella company' employment in the electrical industry?",
    options: [
      "Working for a company that makes umbrellas",
      "A weather-related insurance policy",
      "An intermediary that employs contractors while they work for end clients",
      "A type of limited company structure"
    ],
    correctAnswer: 2,
    explanation: "An umbrella company employs contractors and manages payroll, tax, and NI contributions. The worker is technically employed by the umbrella company while working for various clients. This simplifies administration but comes with fees."
  },
  {
    id: 9,
    question: "What should a self-employed electrician do BEFORE starting their business?",
    options: [
      "Wait until they have been working for at least 5 years",
      "Ensure they have adequate qualifications, insurance, and registration with relevant bodies",
      "Immediately buy a new van and tools",
      "Register as a limited company - there is no other option"
    ],
    correctAnswer: 1,
    explanation: "Before starting self-employment, you need: qualifications (Level 3, AM2), registration with a competent person scheme (or Building Control notification route), appropriate insurance, and registration with HMRC. Proper preparation is essential."
  },
  {
    id: 10,
    question: "What is a potential benefit of employment for newly qualified electricians?",
    options: [
      "Higher immediate earnings",
      "Complete independence",
      "Continued mentoring, varied experience, and skills development",
      "No requirement to follow company procedures"
    ],
    correctAnswer: 2,
    explanation: "For newly qualified electricians, employment offers valuable mentoring from experienced colleagues, exposure to varied work types, structured CPD, and the opportunity to build skills and confidence before potentially going self-employed."
  }
];

const faqs = [
  {
    question: "How soon after qualifying can I go self-employed?",
    answer: "Technically, you can go self-employed immediately after qualifying. However, most industry professionals recommend gaining 2-5 years of experience first. This builds your skills, confidence, industry contacts, and reputation. You also need time to understand business operations, customer relations, and industry standards before working independently."
  },
  {
    question: "Do I need to join a competent person scheme to work self-employed?",
    answer: "If you want to self-certify notifiable electrical work under Part P of the Building Regulations, you must be registered with a competent person scheme (such as NICEIC, NAPIT, ELECSA). Alternatively, you can notify Building Control for each notifiable job, but this adds cost and time. Most self-employed electricians join a scheme for credibility and efficiency."
  },
  {
    question: "What insurance do I actually need as a self-employed electrician?",
    answer: "Essential insurance includes: Public Liability (typically £2-5 million cover), Professional Indemnity (covers claims arising from advice or design errors), and Tool/Van Insurance. If you employ anyone, Employers' Liability is legally required (minimum £5 million). Personal Accident and Income Protection are also recommended."
  },
  {
    question: "Should I be a sole trader or set up a limited company?",
    answer: "Sole trader is simpler to set up and manage, with less paperwork, but you are personally liable for debts. A limited company offers liability protection and can be more tax-efficient at higher earnings, but requires more administration, accounts, and Companies House filings. Many electricians start as sole traders and incorporate later as their business grows."
  },
  {
    question: "How do I find work as a self-employed electrician?",
    answer: "Work comes from: word of mouth and referrals (your best source), local advertising, online presence (website, Google Business), trade platforms (MyBuilder, Checkatrade), networking with other trades (builders, plumbers), and developing relationships with property managers and letting agents. Building reputation takes time - quality work and reliability are key."
  },
  {
    question: "What are the tax implications of self-employment versus employment?",
    answer: "Employees have tax deducted at source via PAYE. Self-employed individuals pay tax through Self Assessment, usually in two payments (January and July). Self-employed can deduct business expenses (tools, van costs, materials) before calculating profit. National Insurance is also different - self-employed pay Class 2 and Class 4 NI rather than Class 1."
  }
];

const Level3Module7Section1_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module7-section1">
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
            <span>Module 7.1.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Self-employment vs Employment Routes
          </h1>
          <p className="text-white/80">
            Understanding the key differences between employed and self-employed career paths
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Employment:</strong> Regular income, benefits, less admin</li>
              <li><strong>Self-employed:</strong> Freedom, higher potential earnings, more risk</li>
              <li><strong>UTR Number:</strong> Required for HMRC registration</li>
              <li><strong>Insurance:</strong> Public liability is essential for both routes</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Considerations</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Tax:</strong> PAYE vs Self Assessment</li>
              <li><strong>Experience:</strong> 2-5 years recommended before self-employment</li>
              <li><strong>Business Skills:</strong> Quoting, invoicing, customer management</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "The advantages and disadvantages of employment",
              "Benefits and challenges of self-employment",
              "Tax implications of each route (PAYE vs Self Assessment)",
              "Insurance requirements for self-employed electricians",
              "How to register as self-employed with HMRC",
              "When to consider going self-employed"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01 - Employment Benefits */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Benefits of Employment
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Working as an employed electrician offers significant advantages, particularly for those early in their careers or those who value stability and security. Employment provides a structured environment where you can focus on developing your technical skills without the burden of running a business.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key Employment Benefits:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Guaranteed Income</strong> - Regular wages paid weekly or monthly regardless of workload</li>
                <li><strong>Statutory Benefits</strong> - Minimum 28 days paid holiday, sick pay, maternity/paternity leave</li>
                <li><strong>Pension Contributions</strong> - Employer must contribute to workplace pension (auto-enrolment)</li>
                <li><strong>Training & Development</strong> - Many employers fund qualifications and CPD</li>
                <li><strong>Employment Rights</strong> - Protection from unfair dismissal, redundancy pay, notice periods</li>
                <li><strong>No Business Admin</strong> - No invoicing, chasing payments, or tax returns</li>
              </ul>
            </div>

            <p>
              Employment also provides valuable exposure to varied work types, mentoring from experienced colleagues, and the opportunity to work on larger projects that would be difficult to access as a sole trader. Many successful business owners cite their employed years as essential for building the skills and contacts they later relied upon.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Reality Check:</strong> JIB rates ensure fair pay for employed electricians, and the total package (salary plus benefits) often equals or exceeds what self-employed electricians actually take home after expenses and tax.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 - Self-Employment Benefits */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Benefits and Challenges of Self-Employment
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Self-employment offers freedom and potentially higher earnings, but comes with significant responsibilities and risks. Understanding both sides is essential before making the decision to work for yourself.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Advantages</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Choose your own working hours and clients</li>
                  <li>Potential for higher earnings</li>
                  <li>Tax efficiency through business expenses</li>
                  <li>Build equity in your own business</li>
                  <li>Direct control over quality and reputation</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Challenges</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Income uncertainty - feast or famine</li>
                  <li>No sick pay, holiday pay, or pension</li>
                  <li>Administrative burden (accounts, tax, insurance)</li>
                  <li>Finding and keeping customers</li>
                  <li>Covering all business costs yourself</li>
                </ul>
              </div>
            </div>

            <p>
              The financial reality of self-employment is often misunderstood. While day rates may look attractive, you must deduct: materials, van costs, insurance, tool replacement, phone and admin costs, competent person scheme fees, training, pension contributions, and tax. What remains as actual income may be less than expected.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> A self-employed electrician charging £250/day might spend £50 on van/fuel, £20 on insurance/scheme fees, £10 on phone/admin, leaving £170 before tax. At 20% tax plus NI, they take home around £130 - similar to employed rates after benefits are considered.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 - Tax and Legal Requirements */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Tax and Legal Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Self-employment brings significant tax and legal obligations that employed workers do not face. Understanding these requirements is essential before starting your own business, as non-compliance can result in penalties, fines, and reputational damage.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Essential Registrations and Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>HMRC Registration</strong> - Register as self-employed within 3 months of starting, receive UTR number</li>
                <li><strong>Self Assessment</strong> - Annual tax return due by 31 January, with payments in January and July</li>
                <li><strong>National Insurance</strong> - Pay Class 2 (flat rate) and Class 4 (percentage of profits)</li>
                <li><strong>VAT Registration</strong> - Mandatory when turnover exceeds £90,000 (optional below)</li>
                <li><strong>CIS Registration</strong> - If working for contractors in construction, register to reduce tax deductions</li>
                <li><strong>Record Keeping</strong> - Maintain records of income, expenses, invoices for 5 years minimum</li>
              </ul>
            </div>

            <p>
              IR35 legislation is particularly important for electricians working through their own limited company. If HMRC determines you would be an employee if engaged directly, you may face significant additional tax. Understanding the rules and structuring your working arrangements correctly is essential.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Important:</strong> Consider using an accountant who understands the construction industry. The cost is usually offset by tax savings through proper expense claims and compliance advice. Good financial advice early prevents expensive mistakes later.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 - Insurance Requirements */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Insurance Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Adequate insurance is non-negotiable for self-employed electricians. A single claim without insurance could bankrupt your business and leave you personally liable for damages. Many clients and main contractors require proof of insurance before allowing you to work.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Public Liability</p>
                <p className="text-white/90 text-xs">£2-5 million cover typical. Covers third-party injury/damage claims</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Professional Indemnity</p>
                <p className="text-white/90 text-xs">Covers claims from advice, design errors, or specification mistakes</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Employers' Liability</p>
                <p className="text-white/90 text-xs">Legal requirement if employing anyone - min £5 million</p>
              </div>
            </div>

            <p>
              Additional insurances to consider include: tool insurance (theft, loss, damage), van insurance (commercial use essential), personal accident insurance, and income protection. Some competent person schemes offer discounted insurance packages to registered contractors.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Real Scenario:</strong> An electrician accidentally drilled through a water pipe, causing flooding that damaged furniture and electronics below. Without public liability insurance, the £15,000 repair and compensation bill would have come directly from personal savings.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Preparing for Self-Employment</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Build savings to cover 3-6 months of expenses before starting</li>
                <li>Develop contacts and potential first customers while still employed</li>
                <li>Invest in quality tools that will last and represent your professionalism</li>
                <li>Set up proper business banking, accounting systems, and insurance</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Making the Decision</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Honestly assess your technical skills and business aptitude</li>
                <li>Consider your personal circumstances - dependents, mortgage, risk tolerance</li>
                <li>Talk to self-employed electricians about the reality of running their business</li>
                <li>Start with evening/weekend work alongside employment to test the waters</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Going self-employed too soon</strong> - Build experience and contacts first</li>
                <li><strong>Underpricing work</strong> - Covering costs is essential; cheap quotes attract problem customers</li>
                <li><strong>Poor record keeping</strong> - Tax problems and missed deductions cost money</li>
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
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference - Employment vs Self-Employment</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Employment</p>
                <ul className="space-y-0.5">
                  <li>Tax via PAYE (automatic deductions)</li>
                  <li>Employer pension contributions</li>
                  <li>28+ days paid holiday</li>
                  <li>Statutory sick pay</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Self-Employment</p>
                <ul className="space-y-0.5">
                  <li>Tax via Self Assessment (annual return)</li>
                  <li>Arrange own pension</li>
                  <li>No paid holiday</li>
                  <li>No sick pay (consider insurance)</li>
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
            <Link to="/study-centre/apprentice/level3-module7-section1-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Industry Roles
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module7-section1-3">
              Next: Trade Bodies & Registration
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default Level3Module7Section1_2;
