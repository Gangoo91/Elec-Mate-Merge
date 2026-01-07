/**
 * Level 3 Module 7 Section 5.2 - Running Your Own Business
 *
 * Design pattern: Level3ContentTemplate.tsx
 * Dark theme with elec-yellow accent
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

// ============================================
// SEO CONFIGURATION
// ============================================
const TITLE = "Running Your Own Electrical Business - Level 3 Module 7 Section 5.2";
const DESCRIPTION = "Essential guide to starting and running an electrical contracting business in the UK. Learn about business structures, registration requirements, financial management, and marketing.";

// ============================================
// INLINE CHECK QUESTIONS
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the key difference between being a sole trader and a limited company?",
    options: [
      "Sole traders earn more money",
      "Limited companies provide personal liability protection - your personal assets are separate from the business",
      "Only limited companies can employ staff",
      "Sole traders don't pay tax"
    ],
    correctIndex: 1,
    explanation: "The main advantage of a limited company is limited liability - your personal assets are protected if the business fails. Sole traders have unlimited liability, meaning personal assets could be at risk for business debts."
  },
  {
    id: "check-2",
    question: "When must you register for VAT?",
    options: [
      "Immediately when starting a business",
      "When your taxable turnover exceeds the VAT threshold (currently around 90,000 GBP)",
      "Only if you want to",
      "Never for electrical businesses"
    ],
    correctIndex: 1,
    explanation: "VAT registration is mandatory when your taxable turnover exceeds the threshold (currently around 90,000 GBP annually). You can voluntarily register below this threshold, which may benefit you if you primarily deal with VAT-registered businesses."
  },
  {
    id: "check-3",
    question: "Why is cash flow management particularly important for electrical contractors?",
    options: [
      "It isn't important",
      "Because you often pay for materials before receiving payment from clients",
      "Only large companies need to worry about cash flow",
      "Cash flow only matters at year-end"
    ],
    correctIndex: 1,
    explanation: "Electrical contractors typically purchase materials and pay wages before receiving client payment. Poor cash flow management can lead to inability to pay suppliers or wages even when technically profitable. It's a leading cause of business failure."
  },
  {
    id: "check-4",
    question: "What records must you keep for HMRC purposes?",
    options: [
      "Just your bank statements",
      "All business income, expenses, receipts, invoices, and financial records for at least 5 years",
      "Only records of large transactions",
      "Records are optional for small businesses"
    ],
    correctIndex: 1,
    explanation: "HMRC requires you to keep comprehensive records of all income and expenses, including receipts, invoices, bank statements, and financial accounts for at least 5 years (6 years for limited companies). Good record-keeping is essential for accurate tax returns."
  }
];

// ============================================
// QUIZ QUESTIONS
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "Which business structure offers the simplest setup with minimal paperwork?",
    options: [
      "Limited company",
      "Partnership",
      "Sole trader",
      "Limited liability partnership"
    ],
    correctAnswer: 2,
    explanation: "Sole trader is the simplest business structure. You simply register with HMRC for self-assessment and start trading. There's no company registration, fewer accounts requirements, and simpler tax returns."
  },
  {
    id: 2,
    question: "What is a Unique Taxpayer Reference (UTR)?",
    options: [
      "A reference number for your ECS card",
      "A unique number issued by HMRC for tax purposes when you register as self-employed",
      "A company registration number",
      "A VAT registration number"
    ],
    correctAnswer: 1,
    explanation: "The UTR is a 10-digit reference number issued by HMRC when you register for self-assessment. You'll need it for filing tax returns and corresponding with HMRC about your tax affairs."
  },
  {
    id: 3,
    question: "What is the Construction Industry Scheme (CIS)?",
    options: [
      "An insurance scheme for construction workers",
      "A tax deduction scheme where contractors deduct tax from subcontractor payments and pay to HMRC",
      "A training scheme for construction skills",
      "A certification scheme for competent persons"
    ],
    correctAnswer: 1,
    explanation: "CIS requires contractors in the construction industry to deduct tax from payments to subcontractors and pass this to HMRC. Electricians working as subcontractors will have CIS deductions made. Being CIS registered at gross status avoids deductions."
  },
  {
    id: 4,
    question: "What should a business plan include?",
    options: [
      "Just your expected income",
      "Business description, market analysis, services offered, pricing strategy, financial projections, and marketing plan",
      "Only financial figures",
      "A business plan is not necessary"
    ],
    correctAnswer: 1,
    explanation: "A comprehensive business plan should cover your business concept, target market, competition analysis, services and pricing, financial projections, marketing strategy, and operational plans. It's essential for planning and may be needed for loans."
  },
  {
    id: 5,
    question: "Which insurance is a legal requirement if you employ staff?",
    options: [
      "Public liability insurance",
      "Employers' liability insurance",
      "Professional indemnity insurance",
      "Tool insurance"
    ],
    correctAnswer: 1,
    explanation: "Employers' liability insurance is legally required if you employ anyone, even part-time. It covers claims by employees who are injured or become ill due to their work. You could be fined for not having valid cover."
  },
  {
    id: 6,
    question: "What is the purpose of a trading name?",
    options: [
      "A legal requirement for all businesses",
      "A business name that's different from your personal name or limited company registered name",
      "A name registered with Companies House",
      "An alternative to registering with HMRC"
    ],
    correctAnswer: 1,
    explanation: "A trading name (like 'Smith's Electrical Services') allows you to trade under a more professional or memorable name than your personal name or company registered name. It doesn't need to be registered but must appear on business documents alongside your legal name."
  },
  {
    id: 7,
    question: "When is payment typically due for a Self-Assessment tax return?",
    options: [
      "31 December each year",
      "31 January following the end of the tax year (with payment on account in July)",
      "31 March each year",
      "Whenever you can afford it"
    ],
    correctAnswer: 1,
    explanation: "Self-Assessment tax returns are due by 31 January following the tax year end (5 April). The balancing payment is due by 31 January, with payments on account due 31 January and 31 July. Late payment incurs penalties and interest."
  },
  {
    id: 8,
    question: "What should you consider when setting your charge-out rates?",
    options: [
      "Only what competitors charge",
      "Labour costs, overheads, materials, profit margin, market rates, and your value proposition",
      "The minimum wage",
      "Only the cost of materials"
    ],
    correctAnswer: 1,
    explanation: "Charge-out rates must cover all costs (labour, overheads, vehicle, insurance, tools, training) plus profit. Consider local market rates, your skills and qualifications, and the value you provide. Too low and you won't survive; too high and you won't win work."
  },
  {
    id: 9,
    question: "What is the benefit of keeping business and personal finances separate?",
    options: [
      "There is no benefit",
      "Clearer records, easier tax returns, better professional appearance, and easier accounting",
      "It's a legal requirement for sole traders",
      "Banks require it"
    ],
    correctAnswer: 1,
    explanation: "Separating business and personal finances makes accounting simpler, tax returns more accurate, provides clearer financial picture of business health, and appears more professional to clients and suppliers. Use a dedicated business bank account."
  },
  {
    id: 10,
    question: "What marketing method is often most effective for electrical contractors?",
    options: [
      "National television advertising",
      "Word of mouth, referrals, and local reputation building",
      "Cold calling only",
      "Marketing is not necessary"
    ],
    correctAnswer: 1,
    explanation: "Word of mouth and referrals are typically the most effective marketing for electrical contractors. Doing quality work, being reliable, and asking satisfied customers for reviews and referrals builds sustainable business. Local online presence and trade directories also help."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "How much money do I need to start an electrical business?",
    answer: "Start-up costs vary but typically include: van (new or used), tools and test equipment, initial stock/materials, insurance, competent person scheme fees, marketing/website, and working capital for at least 3 months of expenses. Budget 15,000-30,000 GBP minimum for a realistic start, though you can start smaller working from home without a van."
  },
  {
    question: "Should I register as a sole trader or limited company?",
    answer: "Sole trader is simpler and cheaper to set up, with less administration. Limited company offers limited liability protection and may be more tax-efficient at higher earnings. Many start as sole traders and incorporate later as they grow. Consider consulting an accountant for advice based on your circumstances."
  },
  {
    question: "Do I need to join a competent person scheme immediately?",
    answer: "If you'll be doing notifiable domestic work (new circuits, consumer unit changes, bathroom work), you either need scheme membership or must use building control for each job. For commercial-only work or non-notifiable domestic work, it's not essential but may help win work."
  },
  {
    question: "How do I price my work competitively without undercharging?",
    answer: "Calculate your true costs (including all overheads, not just materials and labour), add your required profit margin, and check against local market rates. Don't compete on price alone - compete on quality, reliability, and service. Undercharging leads to unsustainable business."
  },
  {
    question: "Should I use an accountant?",
    answer: "While not legally required, an accountant can save you money through tax efficiency, ensure compliance, handle year-end accounts, and free your time for earning work. A good accountant typically saves more than they cost. At minimum, consider one for annual accounts and tax returns."
  },
  {
    question: "How long before I can expect to be profitable?",
    answer: "This varies widely. Many electrical businesses become profitable within the first year if costs are controlled and work is consistent. However, building a sustainable client base typically takes 2-3 years. Plan to support yourself during the early growth phase."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module7Section5_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">

      {/* STICKY HEADER */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module7-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* MAIN ARTICLE CONTENT */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* HEADER */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 7.5.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Running Your Own Business
          </h1>
          <p className="text-white/80">
            From employed electrician to successful business owner
          </p>
        </header>

        {/* QUICK SUMMARY BOXES */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Structure:</strong> Sole trader (simple) vs Limited company (protection)</li>
              <li><strong>Registration:</strong> HMRC, VAT if applicable, CIS, insurance</li>
              <li><strong>Finance:</strong> Separate accounts, cash flow management, records</li>
              <li><strong>Marketing:</strong> Reputation, referrals, online presence</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Opportunities and risks before starting</li>
              <li><strong>Use:</strong> Proper planning and professional advice</li>
              <li><strong>Apply:</strong> Business skills alongside technical expertise</li>
            </ul>
          </div>
        </div>

        {/* LEARNING OUTCOMES */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Choose appropriate business structure for your circumstances",
              "Understand registration and compliance requirements",
              "Manage business finances and cash flow effectively",
              "Set up proper record-keeping systems",
              "Market your services and build a client base",
              "Plan for sustainable business growth"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* CONTENT SECTION 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Choosing Your Business Structure
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The first major decision when starting a business is choosing your legal structure. This affects taxation, liability, administration burden, and how others perceive your business. The two most common options for electrical contractors are sole trader and limited company.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Sole Trader</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Simple to set up - register with HMRC</li>
                  <li>Minimal paperwork and accounts</li>
                  <li>Keep all profits after tax</li>
                  <li>Personal liability for business debts</li>
                  <li>Pay Income Tax and National Insurance</li>
                  <li>Less credibility with larger clients</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Limited Company</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Register with Companies House</li>
                  <li>More complex accounts and reporting</li>
                  <li>Limited liability - personal assets protected</li>
                  <li>Pay Corporation Tax on profits</li>
                  <li>Can be more tax efficient at higher earnings</li>
                  <li>Often preferred by commercial clients</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Many electricians start as sole traders for simplicity and incorporate later as their business grows. There's no one-size-fits-all answer - consider your circumstances and get professional advice.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 01 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* CONTENT SECTION 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Registration and Compliance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Starting a business involves various registrations and ongoing compliance requirements. Getting these right from the start prevents problems with HMRC and ensures you operate legally.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Essential Registrations:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>HMRC Self-Assessment:</strong> Register within 3 months of starting to trade. You'll receive a UTR.</li>
                <li><strong>VAT Registration:</strong> Required if turnover exceeds threshold. Can register voluntarily below.</li>
                <li><strong>CIS Registration:</strong> Register if working in construction industry, especially as subcontractor.</li>
                <li><strong>Companies House:</strong> Required for limited companies only.</li>
                <li><strong>ICO Registration:</strong> Required if you hold customer data (most businesses).</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Industry-Specific Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Competent person scheme membership (for domestic notifiable work)</li>
                <li>ECS card (for site access and proving qualifications)</li>
                <li>Public liability insurance (minimum 2 million typically)</li>
                <li>Employers' liability insurance (if employing anyone)</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> A sole trader doing domestic rewires needs: HMRC registration, public liability insurance, competent person scheme membership, ECS card, and potentially VAT registration depending on turnover.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 02 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* CONTENT SECTION 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Financial Management
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Good financial management is essential for business survival. Many technically excellent electricians fail in business due to poor financial planning and cash flow management. Understand your numbers from day one.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Cash Flow</p>
                <p className="text-white/90 text-xs">Money in and out timing</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Profit</p>
                <p className="text-white/90 text-xs">Income minus all expenses</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Records</p>
                <p className="text-white/90 text-xs">Track everything accurately</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Cash Flow Essentials:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Invoice promptly - the day you complete work</li>
                <li>Request deposits on larger jobs (typically 25-50%)</li>
                <li>Set clear payment terms (14-30 days typical)</li>
                <li>Chase overdue payments systematically</li>
                <li>Build a cash reserve for quiet periods and unexpected costs</li>
                <li>Negotiate credit terms with suppliers</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Critical Point:</strong> Profit doesn't equal cash. You can be profitable on paper but run out of cash if clients pay slowly and you must pay suppliers quickly. Cash flow kills more businesses than lack of profit.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 03 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* CONTENT SECTION 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Marketing and Building Your Business
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The best technical skills mean nothing without customers. Marketing for electrical contractors focuses on building reputation and trust rather than aggressive advertising. Most successful electrical businesses grow through referrals and repeat customers.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Effective Marketing Strategies:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Quality work:</strong> Your best marketing - do excellent work every time</li>
                <li><strong>Ask for reviews:</strong> Google, Checkatrade, Trustpilot - satisfied customers will help</li>
                <li><strong>Professional image:</strong> Clean van, tidy appearance, business cards</li>
                <li><strong>Online presence:</strong> Website, Google Business Profile, social media</li>
                <li><strong>Local networking:</strong> Build relationships with other trades for referrals</li>
                <li><strong>Trade directories:</strong> Scheme listings (NICEIC Find a Contractor, etc.)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Building Sustainable Growth:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Focus on customer service, not just installation</li>
                <li>Follow up after jobs - check satisfaction, ask for referrals</li>
                <li>Specialise to differentiate from competitors</li>
                <li>Build relationships with commercial clients for steady work</li>
                <li>Develop maintenance contracts for recurring income</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> An electrician who always cleans up, explains work clearly, provides proper documentation, and follows up a week later asking if everything is working well will naturally generate referrals and repeat business.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 04 */}
        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* PRACTICAL GUIDANCE */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Before You Start</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Gain sufficient experience as an employed electrician first</li>
                <li>Save enough to cover start-up costs and 3-6 months expenses</li>
                <li>Obtain necessary qualifications (especially 2391 for Approved Electrician)</li>
                <li>Research your local market and competition</li>
                <li>Create a realistic business plan</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Professional Support</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Accountant - for tax efficiency and compliance</li>
                <li>Insurance broker - for comprehensive cover</li>
                <li>Bank - business account with overdraft facility</li>
                <li>Mentor - experienced contractor for advice</li>
                <li>Trade association - ECA, SELECT (Scotland) for support</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Underpricing</strong> - Calculate true costs, don't just match cheap competitors</li>
                <li><strong>Poor cash flow</strong> - Invoice promptly, chase debts, keep reserves</li>
                <li><strong>No records</strong> - Keep receipts, track expenses, use accounting software</li>
                <li><strong>Growing too fast</strong> - Take on what you can manage well</li>
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

        {/* QUICK REFERENCE */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference - Starting a Business</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Essential Registrations</p>
                <ul className="space-y-0.5">
                  <li>HMRC Self-Assessment</li>
                  <li>VAT (if above threshold)</li>
                  <li>CIS (construction work)</li>
                  <li>ICO (data protection)</li>
                  <li>Companies House (limited only)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Documents</p>
                <ul className="space-y-0.5">
                  <li>Business bank account</li>
                  <li>Public liability insurance certificate</li>
                  <li>Competent person scheme certificate</li>
                  <li>Terms and conditions</li>
                  <li>Quotation/invoice templates</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* QUIZ */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* NAVIGATION */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module7-section5-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module7-section5-3">
              Next: Section 5.3
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module7Section5_2;
