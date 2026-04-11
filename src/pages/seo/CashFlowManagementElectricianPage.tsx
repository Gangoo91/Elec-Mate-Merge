import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Calculator,
  PoundSterling,
  ClipboardCheck,
  FileCheck2,
  Users,
  TrendingUp,
  Briefcase,
  AlertTriangle,
  Clock,
  Banknote,
  Receipt,
  Shield,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Business', href: '/guides/how-to-get-first-electrical-customer' },
  { label: 'Cash Flow', href: '/guides/cash-flow-management-electricians' },
];

const tocItems = [
  { id: 'overview', label: 'Cash Flow: Why It Matters' },
  { id: 'invoicing-terms', label: 'Invoicing Terms and Timing' },
  { id: 'deposits', label: 'Deposit Strategy' },
  { id: 'staged-payments', label: 'Staged Payments for Larger Jobs' },
  { id: 'chasing-debt', label: 'Chasing Late Payments' },
  { id: 'cash-flow-forecast', label: 'Cash Flow Forecasting' },
  { id: 'tax-payments', label: 'Planning for Tax Payments' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Cash flow is not the same as profit. You can be profitable on paper and still run out of cash if your customers pay late and your costs come out on time. More trade businesses fail from cash flow problems than from lack of work.',
  'Invoice on the day of completion — not "when you get round to it". Every day between finishing the job and sending the invoice is a day of free credit you are giving the customer.',
  'Take deposits of 25% to 40% on jobs over £500. This covers your material costs, confirms the customer is serious, and improves your cash position before you start the work.',
  'For jobs over £2,000, use staged payments: deposit before start, progress payment at first fix, and balance on completion. This keeps your cash flow positive throughout the project.',
  'Set aside 25% to 30% of all income for tax from day one. Put it in a separate bank account and do not touch it. The biggest cash flow crisis for self-employed electricians is their first tax bill.',
];

const faqs = [
  {
    question: 'When should I invoice my customers?',
    answer:
      'Invoice on the same day you complete the job. For domestic customers, present the invoice on site and ask for immediate payment (bank transfer or card). For commercial customers, send the invoice by email on the day of completion with your payment terms clearly stated. Every day you delay invoicing is a day of free credit. If you complete a job on Friday and invoice the following Wednesday, you have given the customer 5 extra days — on 30-day terms, that means you get paid on day 35 instead of day 30. Over a year of weekly delays, that is equivalent to losing a full month of cash flow.',
  },
  {
    question: 'Can I charge a deposit before starting work?',
    answer:
      'Yes, and you should for any job over £500. A deposit of 25% to 40% is standard practice in the trades. It covers your material costs (so you are not funding the customer materials from your own cash), confirms the customer is committed to the job, and reduces your financial risk if they cancel. State the deposit requirement clearly in your quote: "A deposit of £X (30%) is required to confirm the booking and order materials. The balance of £Y is due on completion." For domestic customers, take the deposit by bank transfer before you order materials. Never start a job for a new customer without a deposit — it is the single most effective cash flow tool you have.',
  },
  {
    question: 'What payment terms should I use?',
    answer:
      'For domestic customers: payment on completion (or within 7 days at most). Domestic customers have no reason to delay — the work is done, pay up. For commercial customers: 14 to 30 days is standard. Some main contractors will push for 45 or 60 days — resist this if possible, or factor the longer payment terms into your pricing (add 2% to 3% for 60-day terms vs 30-day). For subcontracting: match the main contractor terms if you can afford to, but be aware that 60-day terms plus CIS deductions can create significant cash flow gaps. Always state your terms on every invoice and in your terms and conditions.',
  },
  {
    question: 'What should I do if a customer does not pay?',
    answer:
      'Follow a structured process: (1) Send a polite reminder at 7 days overdue by email or text. (2) Phone the customer at 14 days — often a phone call resolves it immediately. (3) Send a formal letter at 21 days stating the amount owed, the original due date, and that you will charge statutory interest if not paid within 7 days. (4) At 30 days overdue, send a Letter Before Action giving 14 days notice before court proceedings. (5) If still unpaid, use the Small Claims Court (Money Claim Online) for amounts up to £10,000 — the fee is £115 for a £3,000 claim. You are also entitled to charge statutory late payment interest of 8% plus the Bank of England base rate (currently 4.5%), giving you 12.5% annual interest on the overdue amount, plus a fixed compensation of £40 to £100 depending on the invoice size.',
  },
  {
    question: 'How do I manage cash flow when tax is due?',
    answer:
      'Set aside 25% to 30% of every payment you receive into a separate savings account — do not touch this money until your tax bill arrives. As a sole trader, you pay income tax and National Insurance through Self Assessment. Your first tax bill includes a "payment on account" — effectively paying 150% of your normal tax bill in the first year. For example, if your tax bill is £8,000, you will pay £8,000 plus a £4,000 payment on account = £12,000 due on 31 January. If you have not been saving, this will be a crisis. The savings account approach prevents this — by the time the bill arrives, the money is already there.',
  },
  {
    question: 'Should I offer card payments?',
    answer:
      'Yes. Offering card payments (via a card reader or payment link) significantly reduces the time between completing a job and getting paid. Domestic customers increasingly expect to pay by card. The processing fee is 1.5% to 2.5% per transaction — on a £500 job, that is £7.50 to £12.50. The benefit of getting paid immediately (instead of waiting for a bank transfer that may take 3 to 7 days) far outweighs the fee. Square, SumUp, and Zettle all offer card readers for under £30 with no monthly fees. Payment links (sent by text or email) are even easier — the customer clicks and pays instantly.',
  },
  {
    question: 'How much cash reserve should I keep?',
    answer:
      'Aim for 3 months of business expenses as a minimum cash reserve. For a sole trader with monthly expenses of £3,000 (van, insurance, tools, phone, fuel, etc.), that means £9,000. This buffer protects you against: seasonal dips (January and February are typically slow for domestic work), late-paying commercial customers, unexpected costs (van repair, tool replacement, insurance excess), and illness or injury that prevents you from working. Build this reserve gradually — set aside 5% to 10% of every payment until you reach your target. Once you have it, do not spend it on anything other than genuine emergencies.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/electrical-estimating-guide',
    title: 'Electrical Estimating Guide',
    description:
      'Price your work to cover costs and generate profit — the foundation of healthy cash flow.',
    icon: Calculator,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-business-plan-template',
    title: 'Electrical Business Plan',
    description: 'Financial projections and cash flow forecasting for your business plan.',
    icon: Briefcase,
    category: 'Guide',
  },
  {
    href: '/guides/pricing-electrical-work-per-point',
    title: 'Pricing Per Point Guide',
    description: 'Set the right per-point rates to maintain healthy margins and cash flow.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/guides/partnership-vs-sole-trader-vs-ltd-electrician',
    title: 'Sole Trader vs Ltd',
    description: 'Tax structure affects your cash flow — understand the differences.',
    icon: TrendingUp,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Send professional quotes and invoices that get paid faster.',
    icon: PoundSterling,
    category: 'Tool',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Complete certificates on site so you can invoice the same day.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Cash Flow: The Reason Good Businesses Fail',
    content: (
      <>
        <p>
          Cash flow is the movement of money in and out of your business. Money comes in when
          customers pay you. Money goes out for materials, van costs, fuel, insurance, tools, and
          your own wages. If more money goes out than comes in during any given month, you have a
          cash flow problem — even if your business is technically profitable over the year.
        </p>
        <p>
          This is the most common way trade businesses fail. The electrician is busy, the work is
          profitable, but they run out of cash because they are paying for materials and fuel today
          while waiting 30 to 60 days for customers to pay their invoices.
        </p>
        <p>
          Managing cash flow is not complicated, but it requires discipline: invoice immediately,
          take deposits, use staged payments, chase debt aggressively, and save for tax. This guide
          covers each of these in detail.
        </p>
      </>
    ),
  },
  {
    id: 'invoicing-terms',
    heading: 'Invoicing Terms and Timing',
    content: (
      <>
        <p>
          The speed at which you get paid starts with the speed at which you invoice. Every day
          between completing a job and sending the invoice is a day of free credit.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h4 className="font-bold text-white mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-yellow-400" /> Recommended Payment Terms
          </h4>
          <div className="space-y-3 text-white text-sm">
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Domestic customers (small jobs under £500)</span>
              <strong className="text-yellow-400">Payment on completion</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Domestic customers (larger jobs over £500)</span>
              <strong className="text-yellow-400">Deposit + balance on completion</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Commercial clients (direct)</span>
              <strong className="text-yellow-400">14 to 30 days</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Main contractors</span>
              <strong className="text-yellow-400">30 days (push back on 60+)</strong>
            </div>
            <div className="flex justify-between pb-2">
              <span>Property management / FM companies</span>
              <strong className="text-yellow-400">30 days (standard)</strong>
            </div>
          </div>
        </div>
        <p>
          <strong>Invoice on the day of completion.</strong> Use an invoicing app on your phone so
          you can invoice from site. Include your bank details, a clear description of the work, and
          your payment terms. The easier you make it to pay, the faster you get paid.
        </p>
      </>
    ),
  },
  {
    id: 'deposits',
    heading: 'Deposit Strategy: Get Paid Before You Start',
    content: (
      <>
        <p>
          Taking a deposit is standard practice and protects both you and the customer. It covers
          your material costs and confirms the booking.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h4 className="font-bold text-white mb-4 flex items-center gap-2">
            <Banknote className="w-4 h-4 text-yellow-400" /> Deposit Guidelines
          </h4>
          <div className="space-y-3 text-white text-sm">
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Jobs £500 to £1,000</span>
              <strong className="text-yellow-400">30% to 40% deposit</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Jobs £1,000 to £3,000</span>
              <strong className="text-yellow-400">25% to 35% deposit</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Jobs £3,000 to £10,000</span>
              <strong className="text-yellow-400">20% to 30% deposit</strong>
            </div>
            <div className="flex justify-between pb-2">
              <span>Jobs over £10,000</span>
              <strong className="text-yellow-400">15% to 25% deposit + staged payments</strong>
            </div>
          </div>
        </div>
        <p>
          <strong>Legal note:</strong> Under consumer protection law, a deposit should be reasonable
          and proportionate. 25% to 40% is widely accepted as reasonable for trade work where you
          need to purchase materials. Do not take more than 50% as a deposit — this could be
          challenged as unfair. Deposits should be clearly stated as non-refundable if the customer
          cancels after materials have been ordered.
        </p>
      </>
    ),
  },
  {
    id: 'staged-payments',
    heading: 'Staged Payments for Larger Jobs',
    content: (
      <>
        <p>
          For any job lasting more than a week or costing more than £2,000, use staged payments.
          This keeps your cash flow positive throughout the project instead of waiting until
          completion.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h4 className="font-bold text-white mb-4">Example: 3-Bed Rewire (£5,500 total)</h4>
          <div className="space-y-3 text-white text-sm">
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Stage 1: Deposit on booking (25%)</span>
              <strong className="text-yellow-400">£1,375</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Stage 2: First fix complete (35%)</span>
              <strong className="text-yellow-400">£1,925</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Stage 3: Second fix and testing complete (40%)</span>
              <strong className="text-yellow-400">£2,200</strong>
            </div>
            <div className="flex justify-between pt-2 font-bold">
              <span>Total</span>
              <strong className="text-yellow-400">£5,500</strong>
            </div>
          </div>
        </div>
        <p>
          State the staging schedule clearly in your quote. This is not unusual — customers expect
          it on larger jobs. It also protects you if the customer has financial problems
          mid-project: you are never more than one stage ahead of payments received.
        </p>
      </>
    ),
  },
  {
    id: 'chasing-debt',
    heading: 'Chasing Late Payments: A Step-by-Step Process',
    content: (
      <>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-4">
              <Receipt className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Day 7 Overdue: Friendly Reminder</h4>
                <p className="text-white text-sm leading-relaxed">
                  Send a polite email or text: "Just a quick reminder that invoice #123 for £X was
                  due on [date]. Would you be able to arrange payment this week?" Most late payments
                  are resolved at this stage — the customer simply forgot.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-4">
              <Receipt className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Day 14 Overdue: Phone Call</h4>
                <p className="text-white text-sm leading-relaxed">
                  Call the customer directly. A phone call is harder to ignore than an email. Be
                  firm but professional: confirm the amount, ask when you can expect payment, and
                  note what was agreed.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-4">
              <Receipt className="w-6 h-6 text-red-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Day 21 Overdue: Formal Letter</h4>
                <p className="text-white text-sm leading-relaxed">
                  Send a formal letter stating the amount, original due date, that statutory
                  interest is now accruing (8% + Bank of England base rate = 12.5% in 2026), and
                  that you will take further action if payment is not received within 7 days.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-red-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Day 30+ Overdue: Letter Before Action</h4>
                <p className="text-white text-sm leading-relaxed">
                  A Letter Before Action (LBA) gives the debtor 14 days to pay before you issue
                  court proceedings. This letter must be sent before you can use the Small Claims
                  Court. Use Money Claim Online (HMCTS) for debts up to £10,000 — the court fee is
                  £35 for claims up to £300, £115 for claims up to £5,000. Most debtors pay when
                  they receive an LBA because they know court action is next.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'cash-flow-forecast',
    heading: 'Cash Flow Forecasting: See Problems Before They Hit',
    content: (
      <>
        <p>
          A cash flow forecast is a month-by-month projection of money in and money out. It shows
          you in advance when you might run short — so you can take action (chase payments, delay a
          purchase, push for a deposit) before the crisis arrives.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h4 className="font-bold text-white mb-4">Monthly Cash Flow Template</h4>
          <div className="space-y-3 text-white text-sm">
            <div className="flex justify-between border-b border-white/10 pb-2 font-bold">
              <span>Category</span>
              <span>Example (Monthly)</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2 text-green-400">
              <span>Customer payments received</span>
              <strong>+£6,500</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2 text-green-400">
              <span>Deposits received</span>
              <strong>+£1,200</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2 text-red-400">
              <span>Materials purchased</span>
              <strong>-£2,100</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2 text-red-400">
              <span>Van (lease/fuel/insurance)</span>
              <strong>-£650</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2 text-red-400">
              <span>Insurance, subscriptions, admin</span>
              <strong>-£250</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2 text-red-400">
              <span>Personal drawings</span>
              <strong>-£3,000</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2 text-red-400">
              <span>Tax savings (25% set aside)</span>
              <strong>-£1,625</strong>
            </div>
            <div className="flex justify-between pt-2 font-bold text-lg">
              <span>Net cash flow</span>
              <strong className="text-yellow-400">+£75</strong>
            </div>
          </div>
        </div>
        <p>
          Update this forecast weekly with actual figures. If you see a negative month approaching,
          act now — not when the bank account hits zero.
        </p>
      </>
    ),
  },
  {
    id: 'tax-payments',
    heading: 'Planning for Tax: The Cash Flow Trap',
    content: (
      <>
        <p>
          The single biggest cash flow surprise for self-employed electricians is their tax bill.
          HMRC does not deduct tax from your earnings like an employer does — you receive the full
          amount and must save the tax portion yourself.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <h4 className="font-bold text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-400" /> First Year Tax Shock
          </h4>
          <div className="space-y-3 text-white text-sm">
            <p className="text-white">
              In your first year of self-employment, your January tax bill includes your actual tax
              for the year PLUS a "payment on account" (50% advance payment for the next year). This
              means your first bill is approximately 150% of your normal annual tax.
            </p>
            <div className="flex justify-between border-b border-white/10 pb-2 mt-4">
              <span>Example: Year 1 profit</span>
              <strong className="text-yellow-400">£40,000</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Income tax + NI (approximately)</span>
              <strong className="text-yellow-400">£8,200</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>First payment on account (50% of above)</span>
              <strong className="text-yellow-400">£4,100</strong>
            </div>
            <div className="flex justify-between pt-2 font-bold text-lg">
              <span>Total due 31 January</span>
              <strong className="text-red-400">£12,300</strong>
            </div>
          </div>
        </div>
        <p>
          <strong>The solution is simple:</strong> set aside 25% to 30% of every payment you receive
          into a separate savings account from day one. By the time your tax bill arrives, the money
          is already there. This is non-negotiable discipline for self-employed survival.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Take Control of Your Cash',
    content: (
      <>
        <p>
          Cash flow management is not glamorous, but it is the difference between a business that
          thrives and one that is always scraping by. Invoice immediately, take deposits, use staged
          payments, chase debt promptly, and save for tax. These five habits will keep your business
          solvent.
        </p>
        <SEOAppBridge
          title="Invoice and get paid faster"
          description="Elec-Mate lets you create and send professional invoices from site, take deposits, and track payments. Stop chasing paper — get paid on the day. 7-day free trial."
          icon={PoundSterling}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function CashFlowManagementElectricianPage() {
  return (
    <GuideTemplate
      title="Cash Flow Management for Electricians UK 2026 | Business Guide"
      description="Cash flow guide for self-employed electricians. Invoicing terms, deposit strategy, staged payments, chasing late payments, tax planning, and cash flow forecasting."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Business Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          Cash Flow Management for Electricians:{' '}
          <span className="text-yellow-400">Stay Profitable, Stay Solvent</span>
        </>
      }
      heroSubtitle="More trade businesses fail from cash flow problems than from lack of work. Invoicing terms, deposits, staged payments, chasing debt, and tax planning — the practical cash flow guide for UK electricians."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Cash Flow for Electricians"
      relatedPages={relatedPages}
      ctaHeading="Invoice Faster, Get Paid Sooner"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for invoicing, quoting, and job management. Send invoices from site and get paid on the day. 7-day free trial, cancel anytime."
    />
  );
}
