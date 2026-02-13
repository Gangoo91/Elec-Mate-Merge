import { Helmet } from 'react-helmet';
import useSEO from '@/hooks/useSEO';
import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import { SEOCTASection } from '@/components/seo/SEOCTASection';
import { SEOFeatureGrid } from '@/components/seo/SEOFeatureGrid';
import {
  Zap,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  ArrowDown,
  PoundSterling,
  TrendingUp,
  Calendar,
  AlertTriangle,
  Receipt,
  Wallet,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    question: 'Why is cash flow important for electricians?',
    answer:
      'Cash flow is the timing of money coming in and going out of your business. Even a profitable business can fail if it runs out of cash — this happens when expenses are due before income arrives. For electricians, the problem is particularly acute because you often buy materials upfront (paying your wholesaler within 30 days), pay for fuel weekly, and cover insurance and van costs monthly, but clients may not pay your invoice for 14 to 60 days after the work is complete. If you have several large jobs finishing in the same month but invoices are not paid until the following month, you can find yourself unable to cover your costs despite having tens of thousands of pounds in outstanding invoices. Cash flow planning means forecasting these gaps in advance so you can arrange an overdraft, chase invoices early, or time your material purchases to match incoming payments.',
  },
  {
    question: 'How do I forecast cash flow for my electrical business?',
    answer:
      "To forecast cash flow, start with your current bank balance. Then list all expected income for the next 3 months — confirmed jobs (with expected completion and payment dates), recurring maintenance contracts, and any other income. Next, list all expected expenses — materials for confirmed jobs (with payment dates to your supplier), van costs (monthly lease or fuel), insurance premiums, certification body fees, tool purchases, training costs, HMRC payments (tax, NI, VAT), accountancy fees, phone, and any loan repayments. Plot these on a weekly or monthly timeline and calculate the running balance. Any week or month where the balance drops below your safety buffer (typically 2 to 4 weeks of expenses) is a danger period that needs attention. Elec-Mate's Cash Flow Planner automates this process, pulling data from your jobs, quotes, and invoices to build the forecast automatically.",
  },
  {
    question: 'How do I deal with late-paying clients?',
    answer:
      'Late payment is the single biggest cash flow problem for UK electricians. The best approach is prevention: set clear payment terms on every quote and invoice (14 days is standard for domestic work, 30 days for commercial), request a deposit or staged payments on larger jobs (30% upfront, 40% at first fix, 30% on completion is a common structure), and offer card payment via Stripe payment links (clients who can pay by card typically pay 3 to 5 times faster than those who must set up a bank transfer). For overdue invoices, send a reminder at 7 days overdue, a firmer reminder at 14 days, and a formal letter at 30 days. Elec-Mate tracks invoice status automatically and can send payment reminders, so you do not have to remember to chase each one manually.',
  },
  {
    question: 'Should I take deposits for electrical work?',
    answer:
      "Yes, taking deposits is standard practice for larger electrical jobs and is an important cash flow management tool. For domestic work, a deposit of 20% to 30% is reasonable for jobs over £500 and helps cover your initial material costs. For larger projects (rewires, new builds, commercial fit-outs), staged payments are essential: a typical structure is 30% on acceptance, 40% at first fix stage, and 30% on completion. For smaller jobs (under £500), a deposit is less common and may not be practical, but you should aim to collect payment on completion rather than offering payment terms. Elec-Mate's quoting system allows you to specify deposit amounts and staged payment milestones on your quotes, making it clear to the client when payments are expected.",
  },
  {
    question: 'What is seasonal cash flow and how do I manage it?',
    answer:
      "Most UK electrical businesses experience seasonal fluctuations. Domestic work tends to be busier in spring and autumn (homeowners preparing for summer or winter), while summer and Christmas periods are often quieter. Commercial work may follow different patterns depending on your sector. EV charger installations tend to peak after new car registration months (March and September). These fluctuations mean your income is not evenly distributed across the year, but many of your expenses (van, insurance, certification fees) are constant. Managing seasonal cash flow means building a cash reserve during busy months to cover quieter periods. A rule of thumb is to keep 2 to 3 months of fixed expenses in reserve. Elec-Mate's Cash Flow Planner helps you visualise seasonal patterns and plan accordingly.",
  },
  {
    question: 'How does Making Tax Digital affect my cash flow planning?',
    answer:
      "Making Tax Digital (MTD) for Income Tax Self Assessment is being rolled out for sole traders and landlords with income over £50,000 from April 2026, and for those over £30,000 from April 2027. Under MTD, you will need to submit quarterly updates to HMRC using compatible software, rather than a single annual self-assessment return. This means you will need to keep your income and expenses up to date throughout the year, not just at year-end. From a cash flow perspective, MTD makes it more important than ever to track your income and expenses in real time. Elec-Mate's cash flow tools and expense tracking features are designed to support MTD compliance by keeping an accurate, up-to-date record of all your business transactions — ready for quarterly reporting to HMRC.",
  },
];

const features = [
  {
    icon: TrendingUp,
    title: 'Cash Flow Forecasting',
    description:
      'Forecast your cash position for the next 3 to 6 months. See exactly when money will come in from confirmed jobs and when expenses are due. Spot cash gaps before they become crises.',
  },
  {
    icon: Receipt,
    title: 'Invoice Tracking',
    description:
      'Track every invoice — sent, viewed, accepted, paid, overdue. See your total outstanding at a glance. Automatic reminders chase late payers so you do not have to.',
  },
  {
    icon: Wallet,
    title: 'Expense Management',
    description:
      'Track all business expenses — materials, fuel, tools, insurance, subscriptions. Categorise by job or by type. Export for your accountant or for self-assessment.',
  },
  {
    icon: Calendar,
    title: 'Payment Calendar',
    description:
      'Visualise when payments are expected and when bills are due. Weekly and monthly views show your cash position at every point. Plan material purchases around incoming payments.',
  },
  {
    icon: AlertTriangle,
    title: 'Cash Gap Alerts',
    description:
      'Receive alerts when your forecast shows a cash shortfall. Early warning gives you time to chase invoices, delay non-essential purchases, or arrange temporary finance.',
  },
  {
    icon: PoundSterling,
    title: 'Profit vs Cash Analysis',
    description:
      'Understand the difference between profit and cash. A profitable month does not mean positive cash flow if clients have not paid. Track both metrics side by side.',
  },
];

const softwareAppSchema = {
  '@type': 'SoftwareApplication',
  name: 'Elec-Mate Cash Flow Planner',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, iOS, Android',
  description:
    'Plan and forecast cash flow for your electrical business. Track income, expenses, invoices, and predict cash positions. Stop cash flow surprises before they happen.',
  url: 'https://elec-mate.com/tools/cash-flow-planner',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'GBP',
    description: '7-day free trial, then from £9.99/month',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '430',
    bestRating: '5',
  },
};

const faqSchema = {
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

export default function CashFlowPlannerPage() {
  useSEO({
    title: 'Cash Flow Planner for Electricians | Financial Management',
    description:
      'Plan and forecast cash flow for your electrical business. Track income, expenses, invoices, and predict cash positions. Stop cash flow surprises before they happen.',
  });

  return (
    <PublicPageLayout>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({ '@context': 'https://schema.org', ...softwareAppSchema })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({ '@context': 'https://schema.org', ...faqSchema })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-28 px-5">
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            Part of 14 Business Calculators
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight mb-5">
            Cash Flow Planner
            <span className="block text-yellow-400 mt-1">For UK Electrical Businesses</span>
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-2xl mx-auto mb-8 leading-relaxed">
            Cash flow kills more businesses than lack of profit. Elec-Mate's Cash Flow Planner
            forecasts your cash position, tracks invoices and expenses, and alerts you to shortfalls
            before they become problems.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/auth/signup"
              className="h-11 px-8 inline-flex items-center justify-center rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-semibold touch-manipulation transition-colors"
            >
              Start Planning Free
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
            <a
              href="#why-cash-flow-matters"
              className="h-11 px-8 inline-flex items-center justify-center rounded-xl border border-white/20 text-white font-medium hover:border-yellow-500/40 touch-manipulation transition-colors"
            >
              Why Cash Flow Matters
              <ArrowDown className="w-4 h-4 ml-1" />
            </a>
          </div>
        </div>
      </section>

      {/* Why Cash Flow Matters */}
      <section id="why-cash-flow-matters" className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Why Cash Flow Kills More Businesses Than Lack of Profit
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              A profitable business can go bust. It sounds contradictory, but it happens every day —
              and electricians are particularly vulnerable. Here is how it works: you complete a
              £5,000 rewire with a healthy 30% margin, giving you £1,500 profit on paper. But you
              paid £2,000 for materials upfront, you have a £400 van payment due this week, your
              insurance direct debit is £150, and the client's payment terms are 30 days. Your
              profit exists on paper, but in your bank account you are £2,550 down with no income
              for a month.
            </p>
            <p>
              Now multiply that across several jobs. You might have £15,000 in outstanding invoices
              — all genuinely profitable work — but only £800 in the bank. Your wholesaler wants
              paying, HMRC wants their quarterly VAT payment, and your van lease company does not
              care about your outstanding invoices. This is the cash flow gap, and it is the number
              one reason small businesses fail in the UK. According to the Federation of Small
              Businesses, 50,000 businesses close each year due to cash flow problems, not because
              they were unprofitable.
            </p>
            <p>
              <strong className="text-yellow-400">For electricians specifically</strong>, the
              problem is amplified by several factors. You often buy materials before starting a job
              and pay your supplier within 30 days, but domestic clients may take 14 to 30 days to
              pay after completion, and commercial clients often take 60 to 90 days. Larger jobs
              (rewires, new-builds, commercial fit-outs) tie up significant capital in materials and
              labour for weeks before you can invoice. Seasonal fluctuations mean your income varies
              but your fixed costs do not. And unexpected expenses — a failed MFT, a van repair, a
              tool theft — can wipe out your cash buffer overnight.
            </p>
            <p>
              Cash flow planning is not complicated, but it does require discipline and the right
              tools. Elec-Mate's Cash Flow Planner is designed specifically for electrical
              businesses, pulling data from your jobs, quotes, invoices, and expenses to build an
              accurate cash flow forecast automatically.
            </p>
          </div>
        </div>
      </section>

      {/* How to Forecast Cash Flow */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <TrendingUp className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              How to Forecast Cash Flow for Your Electrical Business
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              <strong className="text-yellow-400">Start with what you know:</strong> Your current
              bank balance is your starting point. Then list every confirmed source of income for
              the next 3 months: jobs currently in progress (when will they be invoiced and when do
              you expect payment?), accepted quotes not yet started (when will you start, complete,
              and invoice?), recurring income (maintenance contracts, retainer clients), and
              deposits already collected. Be realistic about payment timescales — if your terms say
              14 days but clients typically pay in 21, use 21.
            </p>
            <p>
              <strong className="text-yellow-400">List your expenses:</strong> Include everything
              you know will need paying. Regular expenses include van costs (lease or finance, fuel,
              insurance, road tax, servicing, MOT), tool and equipment costs (calibration due dates,
              replacements planned), insurance premiums (annual or monthly), certification body
              fees, phone and internet, software subscriptions, and accountancy fees. Variable
              expenses include materials for confirmed jobs (when will you buy them and when must
              you pay your supplier?), subcontractor costs, and fuel for travel to specific job
              sites.
            </p>
            <p>
              <strong className="text-yellow-400">Do not forget HMRC:</strong> Tax payments are the
              most commonly forgotten cash flow item. If you are VAT-registered, you owe HMRC
              quarterly (or monthly on some schemes). Income tax and National Insurance are paid
              through self-assessment — two payments on account (31 January and 31 July) plus a
              balancing payment. These can be significant amounts: a sole trader earning £60,000
              profit might owe £7,000 to £10,000 per payment. If you have not budgeted for these,
              they will create a cash flow crisis.
            </p>
            <p>
              <strong className="text-yellow-400">Calculate the running balance:</strong> For each
              week or month, add expected income to your opening balance and subtract expected
              expenses. The closing balance becomes the opening balance for the next period. Any
              period where the balance drops below your safety buffer (ideally 2 to 4 weeks of fixed
              expenses) is a danger period. Elec-Mate visualises this as a chart, making it easy to
              spot problem periods at a glance and take action before they arrive.
            </p>
          </div>
        </div>
      </section>

      {/* Managing Payment Terms */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Receipt className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Managing Payment Terms and Late Payers
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Payment terms are the most powerful lever you have for managing cash flow. The
              difference between 7-day and 30-day terms on a £3,000 invoice is a month of cash — and
              that month can be the difference between comfort and crisis. For domestic work,
              payment on completion or within 7 days is perfectly reasonable and increasingly
              expected. For commercial work, 30-day terms are standard, but you should negotiate for
              14 days where possible, especially with new clients.
            </p>
            <p>
              <strong className="text-yellow-400">Staged payments</strong> are essential for larger
              jobs. A rewire at £5,000 should not be invoiced as a single payment on completion —
              you have had to pay for materials upfront and invest days of labour. A typical staging
              structure is: 30% deposit on acceptance of quote (covers materials and initial
              labour), 40% at first fix stage (covers the bulk of the labour), and 30% on completion
              (retained until the client is satisfied and the certificate is issued). This structure
              aligns your income with your costs and prevents you from financing the entire job out
              of your own pocket.
            </p>
            <p>
              <strong className="text-yellow-400">Card payments accelerate collection.</strong> When
              you include a Stripe payment link on your invoice, clients can pay by debit or credit
              card with a single click. Card payments are typically received within 2 working days,
              compared to 5 to 30 days for bank transfers. The processing fee (typically 1.5% to
              2.9% per transaction) is worth paying for the improvement in cash flow. Elec-Mate
              integrates with Stripe to include payment links on every invoice automatically.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-3">
            Key Features of the Cash Flow Planner
          </h2>
          <p className="text-white text-center mb-10 max-w-2xl mx-auto">
            Built for UK electrical businesses. Forecast, track, and manage every pound flowing
            through your business.
          </p>
          <SEOFeatureGrid features={features} columns={3} />
        </div>
      </section>

      {/* Why Electricians Choose Elec-Mate */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <CheckCircle2 className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Why Electricians Choose Elec-Mate for Cash Flow Management
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Generic accounting software can track transactions, but it does not understand the
              specific cash flow patterns of an electrical business. Elec-Mate is different because
              it is purpose-built for UK electricians. The Cash Flow Planner is part of the Business
              Hub, which includes 14 specialist business calculators alongside 56 technical
              calculators, 8 certificate types, 8 Elec-AI agents, and 36+ training courses.
              Everything is integrated — your jobs, quotes, invoices, expenses, and certificates all
              feed into the cash flow forecast.
            </p>
            <p>
              When you create a quote in Elec-Mate and it gets accepted, the expected income
              automatically appears in your cash flow forecast. When you buy materials and log the
              expense, it appears on the outgoings side. When you issue an invoice, the planner
              tracks it from "sent" through "viewed" to "paid" and adjusts your forecast in real
              time. You always have an accurate, up-to-date picture of your cash position without
              manual data entry.
            </p>
            <p>
              Over 430 UK electricians trust Elec-Mate to manage their business finances. The
              platform complies with BS 7671:2018+A3:2024 for all technical calculations and is
              fully GDPR compliant. All financial data is encrypted and securely stored. Your
              subscription starts with a 7-day free trial — no card required, cancel anytime.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <HelpCircle className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group border border-white/10 rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between p-4 min-h-[44px] touch-manipulation cursor-pointer text-white font-medium">
                  <span>{faq.question}</span>
                  <ChevronDown className="w-5 h-5 text-yellow-400 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-4 pb-4 text-white text-sm leading-relaxed">{faq.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <SEOCTASection
        heading="Take Control of Your Cash Flow"
        subheading="Join 430+ UK electricians using Elec-Mate to forecast cash flow, chase invoices, and never be surprised by a cash gap again. 7-day free trial, cancel anytime."
      />

      {/* Bottom padding for mobile sticky CTA */}
      <div className="h-20 sm:h-0" />
    </PublicPageLayout>
  );
}
