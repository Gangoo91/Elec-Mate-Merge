import { Helmet } from 'react-helmet';
import useSEO from '@/hooks/useSEO';
import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import { SEOCTASection } from '@/components/seo/SEOCTASection';
import { SEOFeatureGrid } from '@/components/seo/SEOFeatureGrid';
import {
  Zap,
  CheckCircle2,
  BookOpen,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  ArrowDown,
  FileText,
  PoundSterling,
  CreditCard,
  Clock,
  TrendingUp,
  Shield,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    question: 'Why should electricians use digital invoicing instead of paper?',
    answer:
      "Paper invoices are slow, easy to lose, difficult to track, and impossible to automate. A paper invoice takes days to arrive by post, can be misplaced by the client, and gives you no visibility into whether it has been received or read. If the client does not pay on time, you have no automated reminder system — you have to pick up the phone and chase payment manually. Digital invoicing solves all of these problems. Invoices are delivered instantly by email, with read receipts so you know when the client has opened them. Automatic payment reminders are sent on your schedule — 7 days, 14 days, 21 days — without any effort from you. Clients can pay by card with a single click, improving your cash flow. And every invoice is stored digitally, searchable, and backed up — no more rummaging through filing cabinets to find last year's invoice for a particular job.",
  },
  {
    question: 'How does Stripe payment integration work?',
    answer:
      'Elec-Mate integrates with Stripe to allow your clients to pay invoices by debit or credit card. When you create an invoice, Elec-Mate generates a secure payment link powered by Stripe. The client receives the invoice with a "Pay Now" button. When they click it, they are taken to a secure Stripe checkout page where they enter their card details. The payment is processed immediately, and you receive the funds in your bank account within 2 working days (typically next business day). Stripe charges a transaction fee of 1.4% + 20p for UK cards. For a £500 invoice, the fee is £7.20 — a small price for getting paid immediately instead of waiting 30 days for a bank transfer. The payment is automatically recorded in Elec-Mate and synced to your Xero or QuickBooks account.',
  },
  {
    question: 'Does Elec-Mate handle VAT on invoices?',
    answer:
      'Yes. If you are VAT-registered, Elec-Mate automatically adds VAT to your invoices at the correct rate (currently 20% standard rate, with support for reduced rate and zero-rated items). Your VAT registration number is displayed on every invoice as required by HMRC. The invoice shows the net amount, the VAT amount, and the gross total. For flat-rate VAT scheme users, the invoice still shows the full VAT amount to the client, but Elec-Mate tracks the flat-rate percentage internally for your records. If you are not VAT-registered, invoices are produced without VAT and include a note that VAT is not applicable. When you integrate with Xero or QuickBooks, the VAT figures are synced automatically, making it easy to prepare your quarterly VAT return.',
  },
  {
    question: 'What is CIS and how does Elec-Mate handle it?',
    answer:
      'The Construction Industry Scheme (CIS) is an HMRC scheme that requires contractors in the construction industry to deduct tax at source from payments to subcontractors. If you work as an electrical subcontractor for a main contractor, the main contractor must deduct CIS tax from your invoice — typically 20% for verified subcontractors or 30% for unverified. Elec-Mate handles CIS by allowing you to create CIS-compliant invoices that show the gross amount, the CIS deduction, and the net payment due. The main contractor pays the net amount and sends the CIS deduction to HMRC on your behalf. The CIS deduction is then credited against your self-assessment tax bill. Elec-Mate tracks all CIS deductions and provides reports for your accountant, making it easy to reclaim the deductions on your tax return.',
  },
  {
    question: 'How does the overdue payment chasing work?',
    answer:
      'Elec-Mate automatically tracks the due date of every invoice and sends payment reminders to clients who have not paid on time. You configure the reminder schedule — for example, a friendly reminder on the due date, a follow-up 7 days after the due date, and a firmer reminder 14 days after. Each reminder email is professional and polite, includes a link to view and pay the invoice, and is branded with your business details. You can customise the wording of each reminder. For seriously overdue invoices (30+ days), Elec-Mate can send a final notice with a stronger tone. At every stage, you can override the automatic reminders and contact the client directly. The system also shows you a dashboard of all outstanding invoices, sorted by age, so you can see at a glance which clients owe you money and how overdue each invoice is.',
  },
  {
    question: 'Can I track expenses against specific jobs?',
    answer:
      'Yes. Elec-Mate allows you to record expenses — material purchases, tool hire, sub-contractor costs, fuel, parking — and link them to specific jobs. When you buy materials from the wholesaler, snap a photo of the receipt and record the amount against the job. At the end of the job, you can see the total expenses, compare them against the quoted amount, and calculate the actual profit. This job-by-job profitability tracking is invaluable for understanding which types of work make you the most money and which are eating into your margins. The expenses are also synced to your accounting software, categorised correctly for your tax return. No more shoeboxes full of receipts at the end of the year.',
  },
  {
    question: 'How does the quote-to-invoice workflow save time?',
    answer:
      'Without quoting software, creating an invoice means starting from scratch — entering the client details, the job description, the line items, and the prices all over again. With Elec-Mate, you create the quote once, and when the job is done, you convert it to an invoice with a single tap. All the details are carried forward: client name and address, line items, prices, VAT, payment terms. If the final job differed from the quote (additional work, fewer materials), you adjust the invoice before sending. This saves 10 to 20 minutes per invoice, eliminates transcription errors, and ensures consistency between quotes and invoices. Over a year, if you invoice 200 jobs, that is 30 to 60 hours saved — almost a full working week.',
  },
];

const features = [
  {
    icon: FileText,
    title: 'Professional Digital Invoices',
    description:
      'Generate branded PDF invoices with your logo, company details, VAT number, and sequential invoice numbering. Send by email in seconds. Clients view and pay online.',
  },
  {
    icon: CreditCard,
    title: 'Stripe Card Payments',
    description:
      'Clients pay invoices by debit or credit card with a single click. Funds arrive in your bank within 2 days. No more waiting 30 days for bank transfers.',
  },
  {
    icon: PoundSterling,
    title: 'Xero and QuickBooks Sync',
    description:
      'Invoices, payments, and expenses sync automatically to your accounting software. No manual re-entry. VAT, CIS, and payment reconciliation handled for you.',
  },
  {
    icon: Clock,
    title: 'Automatic Payment Reminders',
    description:
      'Set your reminder schedule and Elec-Mate chases overdue invoices automatically. Professional, branded reminder emails sent on the due date, 7 days, 14 days, and 30 days.',
  },
  {
    icon: Shield,
    title: 'CIS and VAT Compliance',
    description:
      'CIS deductions calculated and displayed on subcontractor invoices. VAT at standard, reduced, or zero rate. Flat-rate VAT scheme supported. All compliant with HMRC requirements.',
  },
  {
    icon: TrendingUp,
    title: 'Job-by-Job Profitability',
    description:
      'Track expenses against each job. See the true profit on every job — materials, labour, overheads, and margin. Identify your most profitable work types and price accordingly.',
  },
];

const softwareAppSchema = {
  '@type': 'SoftwareApplication',
  name: 'Elec-Mate Electrician Invoice App',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, iOS, Android',
  description:
    'Digital invoicing app for UK electricians. Stripe card payments, Xero and QuickBooks integration, automatic payment reminders, VAT and CIS compliance, expense tracking.',
  url: 'https://elec-mate.com/tools/electrician-invoice-app',
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

export default function ElectricianInvoiceAppPage() {
  useSEO({
    title: 'Electrician Invoice App UK | Digital Invoicing & Payments',
    description:
      'Digital invoicing app for UK electricians. Stripe card payments, Xero and QuickBooks sync, automatic payment chasing, VAT and CIS compliance, expense tracking.',
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
            Part of the Complete Elec-Mate Platform
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight mb-5">
            Electrician Invoice App
            <span className="block text-yellow-400 mt-1">
              Digital Invoicing and Payments for UK Electricians
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-2xl mx-auto mb-8 leading-relaxed">
            Create professional invoices in seconds, get paid by card or bank transfer, and sync
            everything to your accounts. Stop chasing payments manually — let Elec-Mate do it for
            you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/auth/signup"
              className="h-11 px-8 inline-flex items-center justify-center rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-semibold touch-manipulation transition-colors"
            >
              Start Invoicing Free
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
            <a
              href="#why-digital"
              className="h-11 px-8 inline-flex items-center justify-center rounded-xl border border-white/20 text-white font-medium hover:border-yellow-500/40 touch-manipulation transition-colors"
            >
              Why Go Digital
              <ArrowDown className="w-4 h-4 ml-1" />
            </a>
          </div>
        </div>
      </section>

      {/* Why Digital Invoicing */}
      <section id="why-digital" className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <FileText className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Why Digital Invoicing Matters for Electricians
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Cash flow is the lifeblood of any electrical business. You cannot buy materials for
              the next job if the client from the last job has not paid you yet. You cannot pay your
              VAT bill if half your invoices are overdue. You cannot grow your business if you are
              spending your evenings writing invoices and chasing payments instead of quoting new
              work.
            </p>
            <p>
              The average UK small business is owed over £8,500 in late payments at any given time.
              For electricians, who typically invoice between £200 and £5,000 per job, just three or
              four overdue invoices can create a serious cash flow problem. The root cause is
              usually not that clients refuse to pay — it is that the invoicing process is slow and
              manual, reminders are not sent consistently, and payment is inconvenient (bank
              transfer requires the client to log into their banking app, copy your details, and set
              up a payment).
            </p>
            <p>
              <strong className="text-yellow-400">
                Digital invoicing fixes every part of this chain.
              </strong>{' '}
              The invoice is created in seconds (not hours), delivered instantly (not days),
              includes a "Pay Now" button for instant card payment (not bank transfer), and overdue
              reminders are sent automatically (not forgotten). The result is faster payment, better
              cash flow, and less time spent on administration.
            </p>
            <p>
              Elec-Mate's invoicing system is designed specifically for UK electricians. It
              understands the structure of electrical work — certificates, testing, materials,
              labour — and produces invoices that reflect this. It handles VAT (standard rate,
              flat-rate scheme, and non-VAT-registered), CIS deductions for subcontractors, and
              integrates with the quoting system so you never have to enter the same information
              twice.
            </p>
          </div>
        </div>
      </section>

      {/* Stripe Integration */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <CreditCard className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Stripe Payment Integration
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Stripe is the world's leading online payment platform, trusted by millions of
              businesses from startups to Fortune 500 companies. Elec-Mate uses Stripe to process
              card payments on your invoices, giving your clients a fast, secure, and familiar
              payment experience.
            </p>
            <p>
              <strong className="text-yellow-400">How it works:</strong> When you create an invoice
              in Elec-Mate, a unique Stripe payment link is generated automatically. The client
              receives the invoice by email, with a prominent "Pay Now" button. Clicking the button
              takes them to a Stripe-hosted checkout page — fully PCI-DSS compliant and secured with
              SSL — where they enter their card details. The payment is processed in seconds, and
              you receive a confirmation notification immediately.
            </p>
            <p>
              Stripe supports all major card types — Visa, Mastercard, American Express — as well as
              Apple Pay and Google Pay on mobile devices. The funds are transferred to your
              nominated UK bank account within 2 working days. For a £1,000 invoice, the Stripe fee
              is £14.20 (1.4% + 20p for UK cards), which most electricians consider a worthwhile
              cost for getting paid immediately instead of waiting 14 to 30 days.
            </p>
            <p>
              <strong className="text-yellow-400">The payment is automatically reconciled</strong>{' '}
              in Elec-Mate — the invoice status changes from "Sent" to "Paid", and the payment
              record is synced to your Xero or QuickBooks account. No manual reconciliation, no
              checking bank statements, no matching payments to invoices. It just works.
            </p>
            <p>
              You can also accept bank transfer payments alongside Stripe. If a client prefers to
              pay by bank transfer, your bank details are displayed on the invoice. When the
              transfer clears, you mark the invoice as paid in Elec-Mate (or it is matched
              automatically if your accounting software bank feed detects the payment).
            </p>
          </div>
        </div>
      </section>

      {/* Accounting Sync */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <BookOpen className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Xero and QuickBooks Sync</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Elec-Mate is designed to integrate with Xero and QuickBooks, the two most popular
              accounting platforms used by UK electricians and their accountants. The integration
              eliminates the need to manually re-enter invoices, payments, and expenses into your
              accounting software — everything syncs automatically.
            </p>
            <p>
              <strong className="text-yellow-400">Invoices:</strong> When you create and send an
              invoice in Elec-Mate, it appears in your Xero or QuickBooks account as a new sales
              invoice. The client name, address, line items, amounts, VAT, and payment terms are all
              transferred correctly. When the invoice is paid, the payment is recorded and
              reconciled against the invoice in your accounting software.
            </p>
            <p>
              <strong className="text-yellow-400">Expenses:</strong> Material purchases, tool costs,
              sub-contractor payments, and other expenses recorded in Elec-Mate are synced to your
              accounting software as purchase transactions. They are categorised correctly (cost of
              sales, overheads, etc.) and linked to the relevant job, giving you accurate
              profit-and-loss figures by job and by period.
            </p>
            <p>
              <strong className="text-yellow-400">VAT:</strong> All VAT calculations are synced,
              whether you are on the standard VAT scheme, the flat-rate scheme, or the cash
              accounting scheme. Your quarterly VAT return can be prepared directly from your
              accounting software, with no manual adjustments needed for invoices created in
              Elec-Mate.
            </p>
            <p>
              <strong className="text-yellow-400">Bank reconciliation:</strong> Stripe payments
              appear in your Xero or QuickBooks bank feed and are automatically matched to the
              corresponding invoice. Bank transfer payments are also matched if the bank feed
              detects them. The result is a set of accounts that is always up to date, always
              balanced, and always ready for your accountant to review.
            </p>
          </div>
        </div>
      </section>

      {/* VAT and CIS */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Shield className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              VAT Handling and CIS Compliance
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              <strong className="text-yellow-400">VAT:</strong> If you are VAT-registered (mandatory
              once your turnover exceeds £90,000, voluntary below that), every invoice you issue
              must show the net amount, the VAT amount, and the gross total. Your VAT registration
              number must also be displayed. Elec-Mate handles all of this automatically — you set
              your VAT scheme (standard, flat-rate, or cash accounting) and your VAT registration
              number in your profile, and every invoice is produced with the correct VAT treatment.
            </p>
            <p>
              For the flat-rate VAT scheme, the invoice shows the full 20% VAT to the client (as
              required by HMRC), but Elec-Mate tracks the flat-rate percentage internally (typically
              14.5% for electrical installation services in the first year, 16.5% thereafter). This
              ensures your VAT return is correct regardless of which scheme you use.
            </p>
            <p>
              <strong className="text-yellow-400">CIS:</strong> The Construction Industry Scheme
              applies to electricians who work as subcontractors under a main contractor. The main
              contractor is required to deduct CIS tax from the subcontractor's invoice and pay it
              to HMRC. Elec-Mate produces CIS-compliant invoices that show the gross payment, the
              CIS deduction (20% for verified subcontractors, 30% for unverified), and the net
              payment due.
            </p>
            <p>
              The CIS deduction is a payment on account of your income tax — it is credited against
              your self-assessment tax bill at the end of the year. If your CIS deductions exceed
              your tax liability, HMRC will refund the difference. Elec-Mate tracks all CIS
              deductions throughout the year and provides a summary report for your accountant,
              making the self-assessment process straightforward.
            </p>
          </div>
        </div>
      </section>

      {/* Chasing Payments and Cash Flow */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Clock className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Chasing Overdue Payments and Cash Flow Management
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Chasing late payments is one of the most frustrating parts of running an electrical
              business. It is time-consuming, uncomfortable, and takes you away from productive
              work. Elec-Mate automates this process entirely, so you never have to make an awkward
              phone call about an unpaid invoice again.
            </p>
            <p>
              <strong className="text-yellow-400">Automatic reminders:</strong> You set your
              reminder schedule once — for example, a polite reminder on the due date, a follow-up 7
              days later, and a firmer reminder at 14 days. Elec-Mate sends the emails automatically
              on your behalf, branded with your company details, including a direct link to pay the
              invoice. Each reminder is worded professionally and can be customised to match your
              tone and style.
            </p>
            <p>
              <strong className="text-yellow-400">Overdue dashboard:</strong> The invoice dashboard
              shows all outstanding invoices sorted by age — current, 1 to 7 days overdue, 8 to 14
              days overdue, 15 to 30 days overdue, and 30+ days overdue. The total amount owed is
              displayed prominently, along with the average days to payment. This gives you a clear
              picture of your cash flow position at any moment.
            </p>
            <p>
              <strong className="text-yellow-400">Cash flow forecasting:</strong> Based on your
              outstanding invoices, upcoming jobs, and historical payment patterns, Elec-Mate can
              project your cash flow for the next 30, 60, and 90 days. This helps you plan major
              purchases (new van, new tools, stock), manage VAT and tax payments, and decide whether
              to take on additional work or focus on collecting outstanding payments.
            </p>
            <p>
              For electricians who struggle with late-paying clients, the single biggest improvement
              is offering card payment. When the client can pay with a single click (Apple Pay,
              Google Pay, or entering card details), the friction of payment is reduced to almost
              zero. Many Elec-Mate users report that enabling Stripe payment links reduced their
              average payment time from 21 days to 3 days.
            </p>
          </div>
        </div>
      </section>

      {/* Expense Tracking */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <TrendingUp className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Expense Tracking and Job Profitability
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Knowing your overall business profit is important, but knowing the profit on each
              individual job is transformative. It tells you which types of work are worth pursuing
              and which are eating into your margins. It shows you whether your quoting is accurate
              or whether you are consistently underestimating certain job types.
            </p>
            <p>
              Elec-Mate allows you to record expenses against each job as they occur. When you buy
              materials from the wholesaler, photograph the receipt and log the amount against the
              job. When you hire a specialist tool, record the hire cost. When you pay a
              sub-contractor, log the payment. At the end of the job, Elec-Mate shows you the
              complete picture: invoice total minus materials minus labour cost minus overheads
              equals profit.
            </p>
            <p>
              Over time, this data builds up to give you powerful insights. You might discover that
              consumer unit upgrades are your most profitable job type (high value, predictable
              scope, fast to complete), while partial rewires are your least profitable
              (unpredictable scope, frequent variations, more time spent on making good). Armed with
              this data, you can focus your marketing on the most profitable work and price the less
              profitable work higher to compensate for the additional risk.
            </p>
            <p>
              All expenses are synced to your accounting software, correctly categorised, and
              available for your accountant at year-end. No more shoeboxes full of crumpled
              receipts. No more trying to remember what that £47.50 Visa payment was for three
              months ago.
            </p>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <CheckCircle2 className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              What You Get with Elec-Mate
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Elec-Mate is not just an invoicing app — it is the complete platform for running an
              electrical business. Your subscription includes 70 calculators (56 technical + 14
              business), 8 Elec-AI agents and 12 AI tools, 36+ training courses with 8 certificate
              types, digital EICR and EIC certification, quoting with AI cost estimation, invoicing
              with Stripe payments, and accounting integration.
            </p>
            <p>
              The quoting and invoicing system is part of the 14 business calculators that
              complement the 56 technical calculators. Together with the AI tools and training
              courses, Elec-Mate covers every aspect of electrical work — from design and
              calculation, through installation and testing, to certification, invoicing, and
              payment. One platform, one subscription, no gaps.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-3">
            Why Use Elec-Mate for Invoicing?
          </h2>
          <p className="text-white text-center mb-10 max-w-2xl mx-auto">
            Purpose-built for UK electricians. Get paid faster, spend less time on admin, and keep
            your accounts in order.
          </p>
          <SEOFeatureGrid features={features} columns={3} />
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-5">
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
        heading="Get Paid Faster, Chase Less"
        subheading="Join 430+ UK electricians using Elec-Mate for professional invoicing and payments. 7-day free trial, cancel anytime."
      />

      {/* Bottom padding for mobile sticky CTA */}
      <div className="h-20 sm:h-0" />
    </PublicPageLayout>
  );
}
