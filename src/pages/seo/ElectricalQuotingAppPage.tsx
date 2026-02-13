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
  Clock,
  Brain,
  Send,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    question: 'Why do electricians need quoting software?',
    answer:
      'Most electricians still produce quotes using pen and paper, spreadsheets, or basic Word documents. This approach is slow, inconsistent, and often inaccurate. Quoting software solves these problems by providing a structured template that ensures every cost is captured — materials, labour, travel, waste, overheads, and profit margin. It eliminates arithmetic errors, produces professional-looking documents that clients trust, and stores every quote for future reference. A well-presented quote also increases the win rate: clients are more likely to accept a quote that looks professional, itemises the work clearly, and is delivered promptly. Elec-Mate\'s quoting tool is designed specifically for electrical contractors, with built-in material pricing, labour rate calculations, and templates for common job types like consumer unit upgrades, rewires, EICR inspections, and EV charger installations.',
  },
  {
    question: 'How does the AI cost estimation work?',
    answer:
      'Elec-Mate uses 8 Elec-AI agents and 12 AI tools to assist with quoting. When you describe a job — for example, "full rewire of a 3-bed semi, 12 circuits, consumer unit upgrade" — the AI Cost Engineer analyses the description, identifies the materials required (cable, accessories, consumer unit, fixings), estimates the labour time based on historical data from similar jobs, and produces an itemised cost breakdown. The AI draws on a database of current UK trade pricing and real-world labour timing data collected from electricians across the country. You can adjust any line item, add or remove materials, and change the labour rate to match your pricing. The AI provides a starting point that is typically within 10 to 15% of the final quote, saving you 30 to 60 minutes of manual estimation per job.',
  },
  {
    question: 'Can I create professional PDF quotes?',
    answer:
      'Yes. Elec-Mate generates professional PDF quotes with your business logo, company details, and contact information. Each quote includes a clear scope of works, itemised materials and labour (or a single lump-sum price — you choose the level of detail shown to the client), payment terms, validity period, and terms and conditions. The PDF is formatted to A4, ready to print or email. You can also send quotes directly from the app with a single tap — the client receives a link to view the quote online, accept it, or request changes. Accepted quotes can be converted to invoices with one click, carrying all the details forward without re-entry.',
  },
  {
    question: 'Does Elec-Mate integrate with Xero and QuickBooks?',
    answer:
      'Elec-Mate is designed to integrate with Xero and QuickBooks — the two most popular accounting platforms for UK small businesses and sole traders. When you create a quote or invoice in Elec-Mate, it can be synced to your accounting software automatically. This means the invoice appears in your Xero or QuickBooks account without manual re-entry, payments are reconciled, and your accounts are always up to date. For electricians who use an accountant, this integration saves hours of bookkeeping each month and reduces the risk of errors that can cause problems with HMRC. The integration also supports CIS (Construction Industry Scheme) deductions, ensuring that subcontractor payments are calculated correctly.',
  },
  {
    question: 'How does the quote-to-invoice conversion work?',
    answer:
      'Once a client accepts a quote, you can convert it to an invoice with a single tap. All the details from the quote — client name, address, line items, prices, VAT, payment terms — are carried forward to the invoice automatically. You can adjust the invoice if the final job differed from the quote (additional work, fewer materials, etc.) before sending it. The invoice is generated as a professional PDF with a unique invoice number, your company details, VAT registration number (if applicable), and payment instructions. If you use Stripe payment links, the client can pay the invoice online by card — the payment is automatically reconciled in Elec-Mate and synced to your accounting software.',
  },
  {
    question: 'Is there a client portal for my customers?',
    answer:
      'Yes. When you send a quote or invoice from Elec-Mate, the client receives a link to a simple, clean portal where they can view the document, accept quotes, make payments, and communicate with you. The portal is branded with your business details, not Elec-Mate, so it appears professional and consistent with your brand. Clients do not need to create an account or download an app — they simply click the link in the email. The portal shows the current status of each document (sent, viewed, accepted, paid, overdue) and allows clients to leave notes or ask questions. This reduces the number of phone calls and text messages you need to handle and keeps a clear record of all client communications.',
  },
];

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Cost Estimation',
    description:
      'Describe the job in plain English and the AI Cost Engineer produces an itemised estimate. Uses real UK trade pricing and labour timing data from 8 Elec-AI agents and 12 AI tools.',
  },
  {
    icon: FileText,
    title: 'Professional PDF Quotes',
    description:
      'Generate branded A4 quotes with your logo, company details, scope of works, itemised pricing, and terms. Send directly from the app — clients can view, accept, or query online.',
  },
  {
    icon: PoundSterling,
    title: 'Material Pricing Database',
    description:
      'Built-in UK trade pricing for cables, accessories, consumer units, EV chargers, and more. Prices updated regularly from major wholesalers. Adjust to match your supplier\'s rates.',
  },
  {
    icon: Clock,
    title: 'Labour Time Estimator',
    description:
      'AI-estimated labour hours for common job types — rewires, board changes, additional circuits, EICR inspections. Based on real data from UK electricians. Adjust to your pace.',
  },
  {
    icon: Send,
    title: 'Quote-to-Invoice Conversion',
    description:
      'Convert accepted quotes to invoices with one tap. All details carry forward automatically. Adjust for variations, add the final certificate reference, and send instantly.',
  },
  {
    icon: Users,
    title: 'Client Portal',
    description:
      'Clients receive a branded link to view quotes, accept work, make payments, and communicate. No app download required. Keeps a clear audit trail of all interactions.',
  },
];

const softwareAppSchema = {
  '@type': 'SoftwareApplication',
  name: 'Elec-Mate Electrical Quoting App',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, iOS, Android',
  description:
    'Smart quoting app for UK electricians. AI-powered cost estimation, professional PDF quotes, material pricing, labour calculation, quote-to-invoice conversion, and client portal.',
  url: 'https://elec-mate.com/tools/electrical-quoting-app',
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

export default function ElectricalQuotingAppPage() {
  useSEO({
    title: 'Electrical Quoting App | Smart Quotes for Electricians',
    description:
      'AI-powered quoting app for UK electricians. Produce professional quotes with accurate material and labour costs. Quote-to-invoice conversion, client portal, Xero and QuickBooks integration.',
  });

  return (
    <PublicPageLayout>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', ...softwareAppSchema })}</script>
        <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', ...faqSchema })}</script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-28 px-5">
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            8 Elec-AI Agents + 12 AI Tools
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight mb-5">
            Electrical Quoting App
            <span className="block text-yellow-400 mt-1">Smart Quotes for UK Electricians</span>
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-2xl mx-auto mb-8 leading-relaxed">
            Stop guessing job costs and spending hours on spreadsheets. Elec-Mate's AI-powered quoting tool produces accurate, professional quotes in minutes — with real UK trade pricing and labour data built in.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/auth/signup"
              className="h-11 px-8 inline-flex items-center justify-center rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-semibold touch-manipulation transition-colors"
            >
              Start Quoting Free
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
            <a
              href="#why-quoting-matters"
              className="h-11 px-8 inline-flex items-center justify-center rounded-xl border border-white/20 text-white font-medium hover:border-yellow-500/40 touch-manipulation transition-colors"
            >
              Why Quoting Matters
              <ArrowDown className="w-4 h-4 ml-1" />
            </a>
          </div>
        </div>
      </section>

      {/* Why Electricians Need Quoting Software */}
      <section id="why-quoting-matters" className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <FileText className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Why Electricians Need Quoting Software</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Quoting is one of the most important — and most undervalued — activities in any electrical business. A quote is not just a price; it is a promise to the client about what work will be done, what it will cost, and when it will be completed. A poor quote leads to disputes, lost profits, and damaged reputation. A good quote wins work, protects your margin, and sets clear expectations.
            </p>
            <p>
              Yet most electricians still quote from memory, using rough calculations based on experience. "A rewire? That is about three grand." The problem is that "about three grand" can easily become two and a half or three and a half depending on the specifics — the number of circuits, the type of accessories, the difficulty of the cable routes, the condition of the existing installation, and the client's expectations. Without a systematic approach, quotes are inconsistent: the same electrician might quote different prices for the same job on different days, depending on how busy they are or how they feel about the client.
            </p>
            <p>
              <strong className="text-yellow-400">The cost of underquoting</strong> is immediate: you do the work and make less profit than expected, or worse, you lose money. The cost of overquoting is also significant but less visible: you lose the job to a competitor. The sweet spot is an accurate quote that covers all costs, includes a fair profit margin, and is competitive. Achieving this consistently requires a structured approach — which is exactly what quoting software provides.
            </p>
            <p>
              <strong className="text-yellow-400">Speed matters too.</strong> The electrician who sends a professional quote within an hour of a site visit wins the job more often than the one who sends a handwritten estimate three days later. Clients associate speed and professionalism with competence. If your quote arrives quickly, is well-presented, and clearly explains the work, the client is more likely to trust you with the job — even if your price is slightly higher than a competitor's scribbled note.
            </p>
          </div>
        </div>
      </section>

      {/* Elec-Mate Smart Quote Builder */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Brain className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">The Elec-Mate Smart Quote Builder</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Elec-Mate's quote builder is designed for electricians, not generic tradespeople. It understands the specific cost structure of electrical work — the materials, the labour time for different tasks, the fixed costs, and the variables. The AI Cost Engineer is one of 8 Elec-AI agents, supported by 12 AI tools, that power the Elec-Mate platform.
            </p>
            <p>
              <strong className="text-yellow-400">Describe the job:</strong> Start by describing the work in plain language — "Consumer unit upgrade, 10 ways, SPD, RCBO board, existing wiring in good condition" or "Full rewire, 3-bed detached, 14 circuits, all new accessories". The AI analyses the description and produces an itemised breakdown of materials and labour.
            </p>
            <p>
              <strong className="text-yellow-400">Review and adjust:</strong> Every line item is editable. If you prefer a different brand of consumer unit, swap it. If you know this particular job will take longer than average (difficult access, old property, plaster damage to repair), increase the labour hours. The AI provides the baseline; you apply your experience and knowledge of the specific job.
            </p>
            <p>
              <strong className="text-yellow-400">Add overheads and margin:</strong> The quote builder includes your standard overhead percentage (van, insurance, tools, certification body fees) and profit margin. You set these once in your profile, and they are applied to every quote automatically. You can override them on a per-quote basis — perhaps a repeat client gets a smaller margin, or a complex job needs a larger contingency.
            </p>
            <p>
              <strong className="text-yellow-400">Send instantly:</strong> When you are happy with the quote, tap "Send" and the client receives a professional PDF quote by email, with a link to view and accept it online. The quote is stored in your Elec-Mate account alongside the job details, client contact information, and any notes or photos you took during the site visit.
            </p>
          </div>
        </div>
      </section>

      {/* Material Pricing and Labour */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <PoundSterling className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Material Pricing and Labour Calculation</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Accurate material pricing is the foundation of a good quote. Elec-Mate includes a built-in database of current UK trade prices for the most commonly used electrical materials — cables, accessories (sockets, switches, plates), consumer units, MCBs, RCBOs, SPDs, trunking, conduit, fixings, fire hoods, downlights, EV chargers, and more.
            </p>
            <p>
              Prices are sourced from major UK wholesalers and updated regularly to reflect market changes. You can also override any price with your own supplier's rate — if you have a trade account that gives you better pricing on a particular brand, enter your price and it will be used in all future quotes. The material database also includes wastage factors — the percentage of additional material you should order to account for offcuts, damaged items, and measurement errors (typically 5 to 10% for cable, higher for specialist items).
            </p>
            <p>
              <strong className="text-yellow-400">Labour calculation</strong> is where many electricians struggle. How long does a consumer unit upgrade take? The answer depends on the number of ways, whether it is a straight swap or a relocation, the condition of the existing cables, and the electrician's experience. Elec-Mate's AI draws on practical work intelligence data — real timing data from UK electricians — to estimate labour hours for common tasks. A 10-way consumer unit swap with existing wiring in good condition: 4 to 6 hours. A full rewire of a 3-bed semi with 12 circuits: 4 to 5 days. A single socket addition from an existing ring: 2 to 3 hours including testing and certification.
            </p>
            <p>
              You enter your hourly or daily rate, and the calculator produces the labour cost. Elec-Mate supports both sole-trader pricing (your time only) and employer pricing (multiple operatives at different rates — qualified electrician, improver, apprentice).
            </p>
          </div>
        </div>
      </section>

      {/* Quote to Invoice */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Send className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Quote-to-Invoice Workflow</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The job does not end when the quote is accepted — it ends when you are paid. Elec-Mate connects the entire workflow from quote to payment, eliminating the duplicate data entry that wastes time and introduces errors.
            </p>
            <p>
              When a client accepts your quote (by clicking "Accept" in the client portal, or by confirming verbally and you marking it as accepted), the quote status changes to "Accepted" and you can begin scheduling the work. Once the work is complete, you convert the quote to an invoice with a single tap. All line items, prices, client details, and job references are carried forward automatically.
            </p>
            <p>
              If the final job differed from the quote — additional circuits were needed, fewer materials were used, or the client requested changes during the work — you can edit the invoice before sending. Add or remove line items, adjust quantities, and add notes explaining any variations. This ensures the invoice accurately reflects the work done, not just the work quoted.
            </p>
            <p>
              The invoice is generated as a professional PDF with your company branding, a unique sequential invoice number, VAT breakdown (if VAT-registered), payment terms, and bank details or a Stripe payment link for card payments. Clients can pay by bank transfer or by clicking the payment link to pay by card instantly — the payment is automatically recorded and reconciled.
            </p>
          </div>
        </div>
      </section>

      {/* Accounting Integration */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <BookOpen className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Xero and QuickBooks Integration</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              For electricians who use accounting software — or whose accountant requires it — Elec-Mate is designed to integrate with Xero and QuickBooks. These are the two most widely used accounting platforms for UK small businesses and sole traders, and integrating your quoting and invoicing with your accounts eliminates hours of manual bookkeeping each month.
            </p>
            <p>
              <strong className="text-yellow-400">How it works:</strong> When you create an invoice in Elec-Mate, it can be automatically pushed to your Xero or QuickBooks account. The invoice appears in your accounting software with the correct client, line items, amounts, VAT, and payment terms. When the client pays (either by bank transfer or by card through Stripe), the payment is reconciled automatically. Your profit and loss, VAT return, and cash flow reports are always up to date without any manual data entry.
            </p>
            <p>
              <strong className="text-yellow-400">CIS compliance:</strong> If you work as a subcontractor under the Construction Industry Scheme, Elec-Mate handles CIS deductions. The invoice shows the gross amount, the CIS deduction (currently 20% for verified subcontractors or 30% for unverified), and the net payment due. The CIS deductions are reported correctly in your accounting software, making it easy for your accountant to submit the monthly CIS returns to HMRC.
            </p>
            <p>
              <strong className="text-yellow-400">Expense tracking:</strong> Elec-Mate also tracks job-related expenses — materials purchased, tool hire, sub-contractor costs, travel — and links them to the relevant job and invoice. This gives you a true job-by-job profit figure, not just an overall business profit, so you can see which types of work are most profitable and price future jobs accordingly.
            </p>
          </div>
        </div>
      </section>

      {/* Client Portal */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Users className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Professional Client Portal</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              First impressions matter. When a client receives a quote from Elec-Mate, they see a clean, professional portal branded with your business details — not a generic app interface. The portal is designed to be simple for non-technical clients: they can view the quote, see the scope of works, review the pricing, and accept with a single click.
            </p>
            <p>
              The client portal also shows the status of every document — sent, viewed (you receive a notification when the client opens it), accepted, invoiced, paid, or overdue. This visibility saves you from chasing clients for updates: you can see at a glance whether they have looked at the quote or not. If a quote has been viewed but not accepted after a few days, the system can send an automatic follow-up reminder.
            </p>
            <p>
              For invoices, the portal includes a "Pay Now" button if you have Stripe payment links enabled. The client can pay by debit or credit card instantly, without needing to set up a bank transfer or remember your bank details. Card payments typically arrive in your account within 2 working days, improving your cash flow compared to the typical 14 to 30 day payment terms on bank transfer invoices.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-3">
            Why Use Elec-Mate for Quoting?
          </h2>
          <p className="text-white text-center mb-10 max-w-2xl mx-auto">
            Purpose-built for UK electricians. Accurate pricing, professional presentation, and a seamless workflow from quote to payment.
          </p>
          <SEOFeatureGrid features={features} columns={3} />
        </div>
      </section>

      {/* What Elec-Mate Includes */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <CheckCircle2 className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">What You Get with Elec-Mate</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Elec-Mate is not just a quoting app — it is the complete platform for running an electrical business. Your subscription includes access to 70 calculators (56 technical + 14 business), 8 Elec-AI agents and 12 AI tools, 36+ training courses with 8 certificate types, digital EICR and EIC certification, and the full quoting, invoicing, and payment system described on this page.
            </p>
            <p>
              Everything is designed to work together. The calculator results feed into your quotes. The certificates you produce are linked to the jobs. The invoices reference the quotes. And all of it syncs to your accounting software. One platform, one login, one subscription — no switching between apps, no duplicate data entry, no lost information.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <HelpCircle className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Frequently Asked Questions</h2>
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
        heading="Quote Faster, Win More Work"
        subheading="Join 430+ UK electricians using Elec-Mate for professional quotes and invoices. 7-day free trial, cancel anytime."
      />

      {/* Bottom padding for mobile sticky CTA */}
      <div className="h-20 sm:h-0" />
    </PublicPageLayout>
  );
}
