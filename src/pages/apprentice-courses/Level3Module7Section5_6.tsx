/**
 * Level 3 Module 7 Section 5.6 - Insurance and Liability
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
const TITLE = "Insurance and Liability for Electricians - Level 3 Module 7 Section 5.6";
const DESCRIPTION = "Essential guide to insurance and liability for UK electrical contractors. Learn about public liability, employers' liability, professional indemnity, and managing risk in your business.";

// ============================================
// INLINE CHECK QUESTIONS
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "Which insurance is a legal requirement if you employ staff?",
    options: [
      "Public liability insurance",
      "Employers' liability insurance with minimum 5 million cover",
      "Professional indemnity insurance",
      "Tool insurance"
    ],
    correctIndex: 1,
    explanation: "Employers' liability insurance is required by law if you employ anyone, even part-time. The minimum cover is 5 million GBP. You can be fined up to 2,500 per day without valid cover, and must display the certificate."
  },
  {
    id: "check-2",
    question: "What does public liability insurance typically cover?",
    options: [
      "Only damage to your own tools",
      "Claims from third parties for injury or property damage caused by your work",
      "Your personal illness",
      "Theft of your materials"
    ],
    correctIndex: 1,
    explanation: "Public liability insurance covers claims from third parties (including clients and members of the public) for bodily injury or property damage caused by your work or business activities. It's essential for any contractor."
  },
  {
    id: "check-3",
    question: "What is 'professional indemnity' insurance for?",
    options: [
      "Covering your professional fees",
      "Claims arising from professional advice, designs, or specifications you provide that cause financial loss",
      "Personal injury cover",
      "Vehicle insurance"
    ],
    correctIndex: 1,
    explanation: "Professional indemnity covers claims arising from professional advice, design work, or specifications that cause financial loss to clients. Important if you provide design services or professional advice beyond basic installation."
  },
  {
    id: "check-4",
    question: "What is 'product liability' insurance?",
    options: [
      "Insurance for products you buy",
      "Cover for claims arising from defective products you supply or install that cause injury or damage",
      "Insurance for your stock levels",
      "Cover for product returns"
    ],
    correctIndex: 1,
    explanation: "Product liability covers claims arising from products you supply or install if they turn out to be defective and cause injury or damage. Often included in public liability policies but check your cover."
  }
];

// ============================================
// QUIZ QUESTIONS
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "What is the typical minimum public liability cover recommended for electrical contractors?",
    options: [
      "100,000",
      "500,000",
      "2 million to 5 million",
      "10 million"
    ],
    correctAnswer: 2,
    explanation: "Most commercial clients and competent person schemes require minimum public liability cover of 2 million GBP. Many contractors carry 5 million or more. The right level depends on the type and scale of work you do."
  },
  {
    id: 2,
    question: "What must you display if you have employers' liability insurance?",
    options: [
      "Nothing - it's private",
      "The certificate of insurance where employees can see it",
      "Only the premium amount",
      "The policy number on your van"
    ],
    correctAnswer: 1,
    explanation: "You must display your employers' liability certificate where employees can easily read it, or make it available electronically where employees have reasonable access. Failure to display can result in a fine."
  },
  {
    id: 3,
    question: "What does 'all risks' tool insurance typically cover?",
    options: [
      "Only theft from locked premises",
      "Theft, accidental damage, and loss of tools in various circumstances",
      "Only electrical test equipment",
      "Tools older than 5 years only"
    ],
    correctAnswer: 1,
    explanation: "All risks tool insurance covers theft, accidental damage, and loss of tools in various circumstances (on site, in transit, from vehicles). Check policy terms - some exclude theft from unattended vehicles overnight."
  },
  {
    id: 4,
    question: "When might you need contract works insurance?",
    options: [
      "Never - it's not relevant to electricians",
      "When working on contracts where you're responsible for work in progress",
      "Only for paperwork",
      "Only for international work"
    ],
    correctAnswer: 1,
    explanation: "Contract works insurance covers work in progress against damage or loss (fire, flood, theft). Important for larger contracts where you have significant value in incomplete work. Check who's responsible for this insurance on each contract."
  },
  {
    id: 5,
    question: "What is an 'excess' on an insurance policy?",
    options: [
      "The maximum the insurer will pay",
      "The amount you pay towards any claim before the insurer pays",
      "Extra cover above the limit",
      "The annual premium"
    ],
    correctAnswer: 1,
    explanation: "The excess (or deductible) is the amount you must pay towards any claim before the insurer pays. Higher excesses usually mean lower premiums. Consider what excess you can afford when choosing policies."
  },
  {
    id: 6,
    question: "What should you do if an incident occurs that might lead to a claim?",
    options: [
      "Wait to see if anyone complains",
      "Report it to your insurer promptly, preserve evidence, and don't admit liability",
      "Try to hide it",
      "Pay the claimant directly to avoid involving insurance"
    ],
    correctAnswer: 1,
    explanation: "Report potential claims to your insurer promptly - many policies require notification within specific timeframes. Preserve evidence (photos, statements). Don't admit liability - let the insurer handle negotiations."
  },
  {
    id: 7,
    question: "What is subrogation in insurance?",
    options: [
      "A type of premium payment",
      "The insurer's right to pursue recovery from third parties after paying your claim",
      "Cancelling a policy",
      "Increasing cover limits"
    ],
    correctAnswer: 1,
    explanation: "Subrogation is the insurer's right to 'step into your shoes' and recover costs from third parties after paying a claim. This is why you shouldn't settle claims yourself or admit liability - it can affect the insurer's ability to recover."
  },
  {
    id: 8,
    question: "What does 'claims made' basis mean for professional indemnity insurance?",
    options: [
      "Claims are made annually",
      "You're covered for claims made during the policy period, regardless of when the work was done",
      "You make the claims yourself",
      "Claims are automatic"
    ],
    correctAnswer: 1,
    explanation: "Claims made policies cover claims made during the policy period, even if the work was done years ago. This is why you need run-off cover if you stop trading - to cover claims that arise after you cease business."
  },
  {
    id: 9,
    question: "Why might your insurance be voided?",
    options: [
      "If you make any claim",
      "Non-disclosure of material facts, fraud, or breach of policy conditions",
      "If your turnover increases",
      "Insurance cannot be voided once purchased"
    ],
    correctAnswer: 1,
    explanation: "Insurance can be voided for non-disclosure of material facts (information affecting risk), fraud, or serious breach of policy conditions. Always answer questions honestly and comply with policy requirements."
  },
  {
    id: 10,
    question: "What is the purpose of an indemnity clause in a contract?",
    options: [
      "To increase insurance premiums",
      "To transfer or share risk between parties, specifying who is responsible for certain losses",
      "To cancel the contract",
      "To guarantee payment"
    ],
    correctAnswer: 1,
    explanation: "Indemnity clauses transfer or share risk between parties. They specify who bears responsibility for certain losses or liabilities. Review these carefully - some can make you liable for things beyond your control. Check they align with your insurance."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "What insurance do I need as a minimum?",
    answer: "At minimum: public liability insurance (typically 2 million+), and employers' liability if you employ anyone (5 million minimum, legally required). Most add tool insurance and vehicle insurance. Professional indemnity is recommended if you provide design or advisory services."
  },
  {
    question: "How much does contractor insurance cost?",
    answer: "Costs vary significantly based on cover levels, turnover, claims history, and work types. Public liability (2 million) typically costs 200-500 per year for sole traders. Employers' liability adds 150-400+. Comprehensive packages often offer better value than separate policies."
  },
  {
    question: "Can I work without public liability insurance?",
    answer: "There's no legal requirement for public liability insurance, but it's practically essential. Most clients, competent person schemes, and main contractors require it. Without it, you'd personally bear any claims - potentially bankrupting amounts."
  },
  {
    question: "What happens if I'm underinsured?",
    answer: "If your cover is insufficient, you may have to pay the excess yourself. If you've undervalued what you've insured (e.g., tools), claims may be proportionally reduced ('averaging'). Worse, insufficient cover could leave you personally liable for large claims."
  },
  {
    question: "Do I need insurance to work as a subcontractor?",
    answer: "Most main contractors require subcontractors to have their own public liability insurance (often 5-10 million for larger projects). Even if not contractually required, you need protection against claims. Check contract requirements before starting work."
  },
  {
    question: "What should I look for when choosing an insurance provider?",
    answer: "Consider: cover levels and what's included/excluded, excess amounts, claims handling reputation, whether they understand the electrical trade, price (but not just price), and whether they're authorised by the FCA. Trade-specific insurers often provide better cover."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module7Section5_6 = () => {
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
            <Link to="/study-centre/apprentice/level3-module7-section5">
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
            <span>Module 7.5.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Insurance and Liability
          </h1>
          <p className="text-white/80">
            Protecting yourself and your business from risk
          </p>
        </header>

        {/* QUICK SUMMARY BOXES */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Public Liability:</strong> Essential - covers third party claims</li>
              <li><strong>Employers' Liability:</strong> Legal requirement if you employ anyone</li>
              <li><strong>Professional Indemnity:</strong> For design and advisory work</li>
              <li><strong>Tool Insurance:</strong> Protect your livelihood</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Risks that need insurance cover</li>
              <li><strong>Use:</strong> Appropriate cover for your work type</li>
              <li><strong>Apply:</strong> Report incidents promptly, maintain cover</li>
            </ul>
          </div>
        </div>

        {/* LEARNING OUTCOMES */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand different types of business insurance",
              "Know which insurance is legally required",
              "Assess your insurance needs for different work types",
              "Handle incidents and potential claims correctly",
              "Read and understand policy terms and conditions",
              "Manage risk to minimise claims"
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
            Essential Insurance Types
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Different types of insurance protect against different risks. Understanding what each type covers helps you build appropriate protection for your business activities.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Public Liability Insurance:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Covers claims from third parties for injury or property damage</li>
                <li>Example: You accidentally damage a client's floor during a rewire</li>
                <li>Example: A member of public trips over your cable on site</li>
                <li>Typical cover: 2 million to 10 million</li>
                <li>Required by most clients and competent person schemes</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Employers' Liability Insurance:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Legally required if you employ anyone (even part-time or casual)</li>
                <li>Minimum cover: 5 million (10 million recommended)</li>
                <li>Covers claims from employees injured or made ill by their work</li>
                <li>Certificate must be displayed where employees can see it</li>
                <li>Fines up to 2,500 per day for non-compliance</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Even if you only occasionally use helpers or take on an apprentice, you need employers' liability insurance from day one of employing anyone.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 01 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* CONTENT SECTION 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Additional Insurance Options
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Beyond the basics, additional insurance types provide protection for specific risks. The right combination depends on your work type, scale, and risk appetite.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Professional Indemnity</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Covers claims from professional advice/design</li>
                  <li>Important if you provide specifications</li>
                  <li>Covers financial loss to clients</li>
                  <li>Often 'claims made' basis</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Tool Insurance</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Covers theft and damage to tools</li>
                  <li>Check what's covered (van theft, site loss)</li>
                  <li>Keep inventory with values and receipts</li>
                  <li>Consider new-for-old cover</li>
                </ul>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Contract Works</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Covers work in progress</li>
                  <li>Protection against fire, flood, theft</li>
                  <li>Important for larger contracts</li>
                  <li>Check who's responsible per contract</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Personal Accident/Income</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Covers you if you can't work</li>
                  <li>Provides income during illness/injury</li>
                  <li>Critical if self-employed with no sick pay</li>
                  <li>Consider waiting period and benefit length</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> You design a lighting layout that requires more circuits than the existing consumer unit can accommodate, but don't notice. The client incurs extra costs. Professional indemnity would cover this design error.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 02 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* CONTENT SECTION 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Understanding Your Policy
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Insurance policies are contracts with specific terms and conditions. Understanding these helps you ensure you're properly covered and avoid invalidating your cover.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Cover</p>
                <p className="text-white/90 text-xs">What's included and excluded</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Conditions</p>
                <p className="text-white/90 text-xs">What you must do to stay covered</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Limits</p>
                <p className="text-white/90 text-xs">Maximum payouts and excesses</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key Policy Terms to Understand:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Indemnity limit:</strong> Maximum the insurer will pay per claim or per year</li>
                <li><strong>Excess/deductible:</strong> Amount you pay towards each claim</li>
                <li><strong>Exclusions:</strong> What's specifically NOT covered</li>
                <li><strong>Conditions:</strong> Requirements you must meet (security, notification)</li>
                <li><strong>Warranties:</strong> Promises you make (e.g., qualifications held)</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Critical Point:</strong> Read your policy document, not just the certificate. Understand exclusions and conditions. Breaching conditions or warranties can void your cover when you need it most.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 03 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* CONTENT SECTION 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Managing Risk and Claims
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Good risk management reduces the likelihood of claims. When incidents do occur, handling them correctly is essential for maintaining your insurance position.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Risk Management:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Maintain high work standards - quality work reduces claims</li>
                <li>Use proper safety procedures and PPE</li>
                <li>Document your work thoroughly</li>
                <li>Keep qualifications and training current</li>
                <li>Maintain your tools and equipment properly</li>
                <li>Have clear contracts with clients</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">When an Incident Occurs:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>1. Make the situation safe (priority one)</li>
                <li>2. Document everything - photos, notes, witness details</li>
                <li>3. Notify your insurer promptly (check policy for timeframes)</li>
                <li>4. Don't admit liability or make offers of payment</li>
                <li>5. Cooperate with the insurer's investigation</li>
                <li>6. Keep records of all communications</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> A ceiling light you installed falls and injures someone. Make sure they're okay, take photos, get details of what happened, notify your insurer immediately. Don't say "it was my fault" even if you think it might be - let the investigation determine liability.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Getting the Right Cover</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Be honest about your work type and turnover when applying</li>
                <li>Check scheme requirements for minimum cover levels</li>
                <li>Review cover annually as your business changes</li>
                <li>Compare quotes but don't just choose cheapest</li>
                <li>Use a broker who understands the electrical trade</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Maintaining Your Cover</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Pay premiums on time - lapsed cover leaves you exposed</li>
                <li>Notify insurers of significant changes in your business</li>
                <li>Keep certificates current and accessible</li>
                <li>Comply with all policy conditions</li>
                <li>Renew before expiry to avoid gaps</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Underinsuring</strong> - Inadequate cover leaves you personally liable</li>
                <li><strong>Not reading exclusions</strong> - You might not be covered for what you think</li>
                <li><strong>Late notification</strong> - Delays can invalidate claims</li>
                <li><strong>Admitting liability</strong> - Let insurers handle this</li>
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
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference - Insurance</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Minimum Cover Levels</p>
                <ul className="space-y-0.5">
                  <li>Public Liability: 2 million+ (5 million common)</li>
                  <li>Employers' Liability: 5 million (legal minimum)</li>
                  <li>Professional Indemnity: 250,000+ (if applicable)</li>
                  <li>Tool Insurance: Replacement value</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">When Claims Arise</p>
                <ul className="space-y-0.5">
                  <li>Make situation safe</li>
                  <li>Document everything</li>
                  <li>Notify insurer promptly</li>
                  <li>Don't admit liability</li>
                  <li>Cooperate with investigation</li>
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
            <Link to="/study-centre/apprentice/level3-module7-section5-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module7">
              Complete Module 7
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module7Section5_6;
