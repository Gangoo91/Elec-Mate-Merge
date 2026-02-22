import { ArrowLeft, Wrench, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'pf-2-4-check1',
    question:
      'Which free business bank account includes a complimentary FreeAgent accounting subscription?',
    options: ['Starling Business', 'Monzo Business', 'Mettle by NatWest', 'Tide Free'],
    correctIndex: 2,
    explanation:
      'Mettle by NatWest includes a free FreeAgent subscription with every business account. FreeAgent is one of the most popular accounting packages among UK sole traders and normally costs around &pound;35 per month. This makes Mettle an excellent choice for tradespeople who want accounting software without the monthly cost.',
  },
  {
    id: 'pf-2-4-check2',
    question:
      'What is the primary purpose of a receipt management tool like Dext (formerly Receipt Bank)?',
    options: [
      'To design professional invoices',
      'To capture, digitise, and automatically categorise business receipts and expenses',
      'To track customer payments and send reminders',
      'To file your Self Assessment tax return',
    ],
    correctIndex: 1,
    explanation:
      'Receipt management tools like Dext and Xero Capture allow you to photograph paper receipts with your phone, then automatically extract the key information (date, supplier, amount, VAT) and categorise the expense. The digital record is then stored securely and can sync directly with your accounting software, eliminating the need to keep paper receipts and reducing manual data entry.',
  },
  {
    id: 'pf-2-4-check3',
    question: 'What is the minimum viable finance system for a newly self-employed electrician?',
    options: [
      'A shoebox of receipts and a personal bank account',
      'Enterprise accounting software and a dedicated finance manager',
      'A free business bank account, free accounting software, a phone camera for receipts, and the 30% tax provision rule',
      'Nothing &mdash; you only need financial systems once your turnover exceeds &pound;50,000',
    ],
    correctIndex: 2,
    explanation:
      'The minimum viable finance system requires just four things: (1) a free business bank account (Starling, Mettle, or Tide), (2) free or low-cost accounting software (FreeAgent via Mettle, or a spreadsheet), (3) a phone camera for photographing receipts, and (4) the discipline to transfer 30% of every payment to a tax account immediately. This costs nothing to set up and takes less than an hour.',
  },
];

const faqs = [
  {
    question: 'Do I need accounting software or can I use a spreadsheet?',
    answer:
      'A spreadsheet (Google Sheets or Excel) is perfectly adequate for record-keeping and Self Assessment if you are a sole trader with simple finances. However, when Making Tax Digital for Income Tax becomes mandatory (April 2026 for income above &pound;50,000), you will need MTD-compatible software to submit quarterly updates. Using accounting software from the start means you are already set up when MTD arrives, and it also saves time through features like automatic bank feeds, receipt scanning, and invoice generation. If cost is the concern, the Mettle + FreeAgent combination is completely free.',
  },
  {
    question: 'Is YNAB worth the subscription cost for a self-employed tradesperson?',
    answer:
      'YNAB (You Need A Budget) costs &pound;8.99 per month or &pound;89.99 per year. It is the best implementation of zero-based budgeting available as an app and is particularly powerful for irregular income because it forces you to budget only with money you actually have. Whether it is &ldquo;worth it&rdquo; depends on your spending habits: if you regularly overspend by more than &pound;90 per year because you lack visibility of where your money goes, YNAB will pay for itself many times over. They offer a 34-day free trial, which is long enough to see results.',
  },
  {
    question: 'What HMRC digital tools should I be using right now?',
    answer:
      'At minimum, you should have: (1) a Government Gateway account &mdash; this is your login for all HMRC online services, (2) the HMRC app installed on your phone &mdash; it gives you quick access to your tax position, UTR number, and payment deadlines, and (3) your Personal Tax Account set up &mdash; this shows your income tax summary, National Insurance record, and any tax codes. All three are free. If you are VAT-registered, you also need MTD-compatible software for VAT returns (this has been mandatory since April 2022).',
  },
  {
    question: 'Can I use my personal banking app for business if I create separate pots?',
    answer:
      'Technically yes, but it is not recommended. While you can create named pots in a personal Monzo or Starling account, HMRC and accountants prefer to see a dedicated business account because it makes the separation cleaner and more defensible in the event of an enquiry. Business accounts also come with features designed for business use &mdash; invoicing, accounting integrations, and business-specific support. Given that several business accounts are completely free, there is little reason not to open one.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which accounting software is specifically designed for UK sole traders and small businesses and integrates tightly with UK tax requirements?',
    options: ['QuickBooks', 'Sage', 'FreeAgent', 'Xero'],
    correctAnswer: 2,
    explanation:
      'While all four packages support UK businesses, FreeAgent was specifically designed for UK freelancers and sole traders. It includes built-in Self Assessment filing, automatic tax calculations based on UK rules, and is the only one offered free through a banking partnership (Mettle by NatWest). It also has excellent support for the Construction Industry Scheme (CIS).',
  },
  {
    id: 2,
    question:
      'What is the approximate monthly cost of Xero Starter (the entry-level plan) as of 2024?',
    options: [
      '&pound;5 per month',
      '&pound;15 per month',
      '&pound;25 per month',
      '&pound;40 per month',
    ],
    correctAnswer: 1,
    explanation:
      'Xero Starter costs approximately &pound;15 per month (after an introductory discount period). It allows up to 20 invoices and 5 bills per month, which is sufficient for many sole traders. The Standard plan at around &pound;30 per month removes these limits and adds multi-currency support.',
  },
  {
    id: 3,
    question: 'Which receipt management tool is owned by Xero?',
    options: ['Dext', 'Xero Capture', 'Hubdoc', 'AutoEntry'],
    correctAnswer: 2,
    explanation:
      'Xero Capture (formerly known as Hubdoc) is owned by Xero and is included free with all Xero subscriptions. It allows you to photograph receipts and bills, which are then automatically processed and matched to transactions in your Xero account. Dext (formerly Receipt Bank) is a third-party tool that works with multiple accounting packages.',
  },
  {
    id: 4,
    question: 'What does YNAB stand for, and what budgeting method does it implement?',
    options: [
      'Your Net Asset Balance &mdash; implements the 50/30/20 rule',
      'You Need A Budget &mdash; implements zero-based budgeting',
      'Yearly National Accounting Bulletin &mdash; implements cash flow forecasting',
      'Your New Account Builder &mdash; implements the envelope system',
    ],
    correctAnswer: 1,
    explanation:
      'YNAB stands for &ldquo;You Need A Budget&rdquo; and is the leading implementation of zero-based budgeting as an app. Its core principle is that every pound is assigned a job before it is spent. It is particularly effective for irregular income because you budget only with money you have actually received, not money you expect to receive.',
  },
  {
    id: 5,
    question: 'Which of the following is NOT a feature of the HMRC app?',
    options: [
      'Viewing your Self Assessment tax position',
      'Checking your National Insurance record',
      'Submitting your Self Assessment tax return',
      'Automatically categorising your business expenses',
    ],
    correctAnswer: 3,
    explanation:
      'The HMRC app allows you to view your tax position, check your NI record, see payment deadlines, and even submit your Self Assessment return. However, it does not automatically categorise business expenses &mdash; that is the role of accounting software like FreeAgent, Xero, or QuickBooks.',
  },
  {
    id: 6,
    question: 'What is a Government Gateway account used for?',
    options: [
      'Ordering materials from trade suppliers at discounted prices',
      'Logging into HMRC online services such as Self Assessment and VAT',
      'Applying for a business bank account',
      'Registering your business with Companies House',
    ],
    correctAnswer: 1,
    explanation:
      'A Government Gateway account is your login for all HMRC online services, including Self Assessment, VAT, PAYE, and your Personal Tax Account. Every self-employed person needs one. It requires a user ID and password, and increasingly uses two-factor authentication for security. Registration is free and can be done at gov.uk.',
  },
  {
    id: 7,
    question:
      'Which budgeting app uses AI to analyse spending patterns and automatically move money into savings?',
    options: ['YNAB', 'Emma', 'Plum', 'Monzo'],
    correctAnswer: 2,
    explanation:
      'Plum uses AI to analyse your income and spending patterns, then automatically moves affordable amounts into savings. It connects to your bank accounts via open banking and identifies money you can save without noticing. Emma is an aggregation app that shows all accounts in one place and identifies wasteful subscriptions. YNAB is a manual zero-based budgeting tool.',
  },
  {
    id: 8,
    question:
      'For a newly self-employed electrician, what is the recommended order of financial system setup?',
    options: [
      'Accounting software first, then bank account, then receipt system',
      'Business bank account first, then tax provision habit, then accounting software, then receipt management',
      'Receipt management first, then accounting software, then bank account',
      'VAT registration first, then accounting software, then business bank account',
    ],
    correctAnswer: 1,
    explanation:
      'The recommended order is: (1) Open a free business bank account to separate finances immediately. (2) Establish the 30% tax provision habit from your very first payment. (3) Set up accounting software (free via Mettle/FreeAgent or a spreadsheet). (4) Implement receipt management (even just a dedicated photo album on your phone). This order prioritises the most impactful actions first.',
  },
];

export default function PFModule2Section4() {
  useSEO({
    title: 'Tools & Systems for Financial Management | Personal Finance Module 2.4',
    description:
      'Accounting software comparison, banking apps, receipt management, budgeting tools, HMRC digital tools, and the minimum viable finance system for self-employed electricians.',
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../pf-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/30 mb-4">
            <Wrench className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 2 &middot; SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Tools &amp; Systems for Financial Management
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            The best accounting software, banking apps, receipt management tools, budgeting apps,
            and HMRC digital services for self-employed tradespeople &mdash; plus the minimum viable
            system to get started today
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Accounting:</strong> FreeAgent (free via Mettle), Xero, QuickBooks, Sage
              </li>
              <li>
                <strong>Banking:</strong> Starling, Monzo Business, Tide &mdash; all free
              </li>
              <li>
                <strong>Receipts:</strong> Dext, Xero Capture &mdash; photograph and forget
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>MTD ready:</strong> You will need compatible software by April 2026/27
              </li>
              <li>
                <strong>Time saved:</strong> Good tools cut admin from hours to minutes per week
              </li>
              <li>
                <strong>Zero cost:</strong> The minimum viable system costs nothing to set up
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Compare the four main accounting software options for sole traders',
              'Choose a banking app that fits your business needs',
              'Set up a receipt management workflow using your phone',
              'Evaluate budgeting apps and choose one for personal finances',
              'Navigate HMRC digital tools: Government Gateway, HMRC app, Personal Tax Account',
              'Build a minimum viable finance system in under an hour',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Accounting Software Comparison */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">01</span>
            Accounting Software Comparison
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Accounting software has gone from an optional luxury to a near-essential tool for
                self-employed tradespeople. With Making Tax Digital requiring quarterly digital
                submissions from April 2026 (for income above &pound;50,000), most sole traders will
                need MTD-compatible software within the next few years. Starting now means you are
                already comfortable with the tool when the deadline arrives.
              </p>

              <p>
                There are four main options for UK sole traders. Each has different strengths, and
                the right choice depends on your priorities:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Accounting Software Comparison
                </p>
                <div className="space-y-4">
                  <div className="p-3 bg-white/5 rounded-lg">
                    <p className="text-sm font-medium text-rose-400 mb-1">FreeAgent</p>
                    <ul className="text-sm text-white space-y-1">
                      <li>
                        &bull; <strong>Cost:</strong> &pound;0 with Mettle by NatWest; otherwise
                        &pound;35/month
                      </li>
                      <li>
                        &bull; <strong>Built for:</strong> UK freelancers and sole traders
                        specifically
                      </li>
                      <li>
                        &bull; <strong>Strengths:</strong> Self Assessment filing built in, CIS
                        support, automatic tax timeline, excellent UK tax calculations
                      </li>
                      <li>
                        &bull; <strong>Weaknesses:</strong> Less suited to larger businesses;
                        limited inventory management
                      </li>
                      <li>
                        &bull; <strong>MTD ready:</strong> Yes &mdash; both VAT and Income Tax
                      </li>
                      <li>
                        &bull; <strong>Best for:</strong> Sole-trader electricians who want a
                        &ldquo;set and forget&rdquo; system that handles UK tax automatically
                      </li>
                    </ul>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg">
                    <p className="text-sm font-medium text-amber-400 mb-1">Xero</p>
                    <ul className="text-sm text-white space-y-1">
                      <li>
                        &bull; <strong>Cost:</strong> From &pound;15/month (Starter) to
                        &pound;42/month (Premium)
                      </li>
                      <li>
                        &bull; <strong>Built for:</strong> Small businesses of all types globally
                      </li>
                      <li>
                        &bull; <strong>Strengths:</strong> Huge app marketplace (1,000+
                        integrations), excellent bank feeds, strong multi-user support, Xero Capture
                        for receipts
                      </li>
                      <li>
                        &bull; <strong>Weaknesses:</strong> Not UK-specific; tax features require
                        more manual setup; Starter plan limits invoices to 20/month
                      </li>
                      <li>
                        &bull; <strong>MTD ready:</strong> Yes &mdash; both VAT and Income Tax
                      </li>
                      <li>
                        &bull; <strong>Best for:</strong> Tradespeople who expect to grow into a
                        larger business and want an ecosystem of integrated apps
                      </li>
                    </ul>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg">
                    <p className="text-sm font-medium text-blue-400 mb-1">
                      QuickBooks Self-Employed / Simple Start
                    </p>
                    <ul className="text-sm text-white space-y-1">
                      <li>
                        &bull; <strong>Cost:</strong> From &pound;8/month (Self-Employed) to
                        &pound;15/month (Simple Start)
                      </li>
                      <li>
                        &bull; <strong>Built for:</strong> Self-employed individuals and small
                        businesses
                      </li>
                      <li>
                        &bull; <strong>Strengths:</strong> Lowest entry price, automatic mileage
                        tracking, Self Assessment integration, good mobile app
                      </li>
                      <li>
                        &bull; <strong>Weaknesses:</strong> Self-Employed plan is quite basic;
                        transition to Simple Start required as you grow
                      </li>
                      <li>
                        &bull; <strong>MTD ready:</strong> Yes &mdash; both VAT and Income Tax
                      </li>
                      <li>
                        &bull; <strong>Best for:</strong> Budget-conscious sole traders who want the
                        cheapest paid option
                      </li>
                    </ul>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg">
                    <p className="text-sm font-medium text-green-400 mb-1">Sage Accounting</p>
                    <ul className="text-sm text-white space-y-1">
                      <li>
                        &bull; <strong>Cost:</strong> From &pound;14/month (Start) to
                        &pound;30/month (Standard)
                      </li>
                      <li>
                        &bull; <strong>Built for:</strong> UK small businesses (Sage has deep UK
                        roots)
                      </li>
                      <li>
                        &bull; <strong>Strengths:</strong> Strong UK market presence, excellent
                        payroll integration if you hire staff, detailed reporting
                      </li>
                      <li>
                        &bull; <strong>Weaknesses:</strong> Interface feels more traditional than
                        competitors; steeper learning curve for first-time users
                      </li>
                      <li>
                        &bull; <strong>MTD ready:</strong> Yes &mdash; both VAT and Income Tax
                      </li>
                      <li>
                        &bull; <strong>Best for:</strong> Tradespeople who expect to hire employees
                        and need payroll integration
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Our Recommendation:</strong> For most
                  sole-trader electricians starting out, <strong>Mettle + FreeAgent</strong> is the
                  best option because it costs nothing and is specifically designed for UK sole
                  traders. If you outgrow FreeAgent or need more integrations, Xero is the natural
                  step up. QuickBooks is a solid budget choice if you do not qualify for the free
                  Mettle deal.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Banking Apps */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">02</span>
            Banking Apps for Business
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                We covered business bank accounts in Section 3, but it is worth diving deeper into
                the banking apps themselves because the right app can automate significant portions
                of your financial management.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Banking App Features That Matter for Tradespeople
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-rose-400">Instant notifications:</strong> Know the
                      moment a customer payment arrives or a direct debit goes out. Starling, Monzo,
                      and Tide all send push notifications within seconds of every transaction
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong className="text-amber-400">Automatic categorisation:</strong> Some
                      apps automatically tag transactions by category (fuel, materials, insurance)
                      based on the merchant. This saves time when reconciling in your accounting
                      software
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-blue-400">Named pots/spaces:</strong> Ring-fence money
                      for tax, VAT, and savings within the same account. Starling Spaces and Monzo
                      Pots are the best implementations
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong className="text-green-400">Accounting integration:</strong> Direct
                      feeds to FreeAgent, Xero, or QuickBooks so transactions appear in your
                      accounting software automatically, eliminating manual entry
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-purple-400">Receipt attachment:</strong> Some apps let
                      you photograph a receipt and attach it directly to the transaction in your
                      banking app, creating a complete digital record
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                <strong>Starling Business</strong> consistently ranks as the best overall business
                banking app for sole traders. Its Spaces feature allows you to create multiple named
                sub-accounts (Tax, VAT, Savings, Emergency) that can receive automated
                percentage-based transfers. Combined with instant notifications and accounting
                software integration, it automates most of the Five-Account System described in
                Section 1.
              </p>

              <p>
                <strong>Monzo Business</strong> offers similar functionality with Pots, plus a
                strong invoicing feature and tax pot that can automatically set aside a percentage
                of incoming payments. The Lite plan is free; the Pro plan (&pound;5/month) adds
                extra features including accounting integration.
              </p>

              <p>
                <strong>Tide</strong> differentiates itself with built-in invoicing that
                automatically matches payments to invoices. When a customer pays, Tide recognises
                the payment and marks the invoice as paid. This is particularly useful for
                tradespeople who issue many small invoices and struggle to track which ones have
                been paid.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Receipt Management */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">03</span>
            Receipt Management
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Lost receipts are the single biggest cause of overpaid tax among self-employed
                tradespeople. Every receipt you lose is a business expense you cannot claim, which
                means you pay tax on money you have already spent. If you lose an average of
                &pound;50 of receipts per week, that is &pound;2,600 per year in unclaimed expenses
                &mdash; costing you approximately &pound;680 in unnecessary tax (at the basic rate
                plus NI).
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Key Rule:</strong> The moment you receive a
                  receipt, photograph it. Do not put it in your pocket &ldquo;to deal with
                  later&rdquo; &mdash; later never comes, and faded thermal receipts become
                  unreadable within weeks. Photograph it immediately and the digital copy becomes
                  your permanent record. HMRC accepts digital copies as evidence.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Receipt Management Tools</p>
                <div className="space-y-4">
                  <div className="p-3 bg-white/5 rounded-lg">
                    <p className="text-sm font-medium text-rose-400 mb-1">
                      Dext (formerly Receipt Bank)
                    </p>
                    <ul className="text-sm text-white space-y-1">
                      <li>
                        &bull; <strong>Cost:</strong> From &pound;14/month
                      </li>
                      <li>
                        &bull; <strong>How it works:</strong> Photograph receipt with app, email it,
                        or forward supplier emails. Dext extracts date, supplier, amount, and VAT
                        automatically
                      </li>
                      <li>
                        &bull; <strong>Integrations:</strong> Xero, QuickBooks, Sage, FreeAgent
                      </li>
                      <li>
                        &bull; <strong>Best for:</strong> High-volume expense tracking with
                        automatic data extraction
                      </li>
                    </ul>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg">
                    <p className="text-sm font-medium text-amber-400 mb-1">
                      Xero Capture (included with Xero)
                    </p>
                    <ul className="text-sm text-white space-y-1">
                      <li>
                        &bull; <strong>Cost:</strong> Free with any Xero subscription
                      </li>
                      <li>
                        &bull; <strong>How it works:</strong> Photograph receipts in the Xero app.
                        OCR extracts key data and matches it to bank transactions
                      </li>
                      <li>
                        &bull; <strong>Integrations:</strong> Xero only (built-in)
                      </li>
                      <li>
                        &bull; <strong>Best for:</strong> Xero users who want an all-in-one solution
                        without extra cost
                      </li>
                    </ul>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg">
                    <p className="text-sm font-medium text-green-400 mb-1">
                      Free Alternative: Dedicated Phone Album
                    </p>
                    <ul className="text-sm text-white space-y-1">
                      <li>
                        &bull; <strong>Cost:</strong> &pound;0
                      </li>
                      <li>
                        &bull; <strong>How it works:</strong> Create a folder called &ldquo;Receipts
                        2024-25&rdquo; in your phone&rsquo;s photo app. Photograph every receipt
                        into that folder
                      </li>
                      <li>
                        &bull; <strong>Backup:</strong> Enable iCloud Photos or Google Photos so
                        receipts are automatically backed up to the cloud
                      </li>
                      <li>
                        &bull; <strong>Best for:</strong> Anyone who wants a zero-cost starting
                        point before investing in dedicated software
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <p>
                Whatever method you choose, the habit is more important than the tool. The best
                receipt management system is the one you actually use every time you get a receipt.
                A dedicated phone album that you use consistently will always beat expensive
                software that you forget to use.
              </p>
            </div>
          </div>
        </section>

        {/* Section 04: Budgeting Apps */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">04</span>
            Budgeting Apps
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                While accounting software tracks your business finances, budgeting apps track your{' '}
                <strong>personal</strong> finances. They connect to your bank accounts via open
                banking and give you visibility of where your money goes each month. For
                tradespeople using the Five-Account System, a budgeting app monitors the Spending
                and Bills accounts to prevent overspending.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Budgeting App Comparison</p>
                <div className="space-y-4">
                  <div className="p-3 bg-white/5 rounded-lg">
                    <p className="text-sm font-medium text-rose-400 mb-1">
                      YNAB (You Need A Budget)
                    </p>
                    <ul className="text-sm text-white space-y-1">
                      <li>
                        &bull; <strong>Cost:</strong> &pound;8.99/month or &pound;89.99/year (34-day
                        free trial)
                      </li>
                      <li>
                        &bull; <strong>Method:</strong> Zero-based budgeting &mdash; every pound
                        gets a job
                      </li>
                      <li>
                        &bull; <strong>Strengths:</strong> Best implementation of zero-based
                        budgeting; excellent for irregular income; forces intentional spending;
                        strong community and educational content
                      </li>
                      <li>
                        &bull; <strong>Weaknesses:</strong> Subscription cost; learning curve for
                        first-time budgeters; requires active engagement
                      </li>
                      <li>
                        &bull; <strong>Best for:</strong> Disciplined budgeters who want total
                        control over every pound
                      </li>
                    </ul>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg">
                    <p className="text-sm font-medium text-amber-400 mb-1">Emma</p>
                    <ul className="text-sm text-white space-y-1">
                      <li>
                        &bull; <strong>Cost:</strong> Free (basic) / &pound;4.99 or
                        &pound;9.99/month (premium)
                      </li>
                      <li>
                        &bull; <strong>Method:</strong> Account aggregation and spending analysis
                      </li>
                      <li>
                        &bull; <strong>Strengths:</strong> Shows all bank accounts, credit cards,
                        and savings in one view; identifies wasteful subscriptions; tracks net
                        worth; beautiful interface
                      </li>
                      <li>
                        &bull; <strong>Weaknesses:</strong> More passive than YNAB (shows where
                        money went rather than planning where it goes); some features locked behind
                        paywall
                      </li>
                      <li>
                        &bull; <strong>Best for:</strong> People who want visibility without the
                        effort of manual budgeting
                      </li>
                    </ul>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg">
                    <p className="text-sm font-medium text-green-400 mb-1">Plum</p>
                    <ul className="text-sm text-white space-y-1">
                      <li>
                        &bull; <strong>Cost:</strong> Free (basic) / &pound;2.99 or
                        &pound;9.99/month (premium)
                      </li>
                      <li>
                        &bull; <strong>Method:</strong> AI-powered automatic savings
                      </li>
                      <li>
                        &bull; <strong>Strengths:</strong> Analyses spending patterns and
                        automatically moves affordable amounts into savings; investment options
                        (stocks and shares ISA); round-up feature
                      </li>
                      <li>
                        &bull; <strong>Weaknesses:</strong> Less control than YNAB; automatic
                        savings can be unsettling if you are not expecting them; investment returns
                        not guaranteed
                      </li>
                      <li>
                        &bull; <strong>Best for:</strong> People who struggle to save and want AI to
                        do it for them
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Our Recommendation:</strong> If you are serious
                  about controlling personal spending, YNAB is the gold standard despite the
                  subscription cost &mdash; most users report saving significantly more than the
                  &pound;90 annual fee. If you want something lighter, Emma is excellent for getting
                  visibility of all your accounts in one place. Plum is ideal if your main problem
                  is not saving enough rather than overspending.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: HMRC Digital Tools */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">05</span>
            HMRC Digital Tools
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                HMRC has invested heavily in digital tools over the past decade, and there are now
                several free services that every self-employed tradesperson should be using. Many
                people are unaware these tools exist or have not taken the time to set them up
                &mdash; but they provide valuable information and can prevent surprises at tax time.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Essential HMRC Digital Tools</p>
                <div className="space-y-4">
                  <div className="p-3 bg-white/5 rounded-lg">
                    <p className="text-sm font-medium text-rose-400 mb-1">
                      Government Gateway Account
                    </p>
                    <ul className="text-sm text-white space-y-1">
                      <li>
                        &bull; <strong>What it is:</strong> Your login for all HMRC online services
                      </li>
                      <li>
                        &bull; <strong>What it does:</strong> Provides access to Self Assessment,
                        VAT, PAYE, and all other HMRC services
                      </li>
                      <li>
                        &bull; <strong>Setup:</strong> Register at gov.uk &mdash; you will receive a
                        User ID by post within 10 working days
                      </li>
                      <li>
                        &bull; <strong>Priority:</strong> Essential &mdash; you cannot do anything
                        online with HMRC without it
                      </li>
                    </ul>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg">
                    <p className="text-sm font-medium text-amber-400 mb-1">HMRC App</p>
                    <ul className="text-sm text-white space-y-1">
                      <li>
                        &bull; <strong>What it is:</strong> The official HMRC mobile app (iOS and
                        Android)
                      </li>
                      <li>
                        &bull; <strong>What it does:</strong> View your tax position, check payment
                        deadlines, view your UTR number, see your National Insurance record, and
                        submit your Self Assessment return
                      </li>
                      <li>
                        &bull; <strong>Setup:</strong> Download from App Store or Google Play; log
                        in with your Government Gateway credentials
                      </li>
                      <li>
                        &bull; <strong>Priority:</strong> Highly recommended &mdash; quick access to
                        your tax information on the go
                      </li>
                    </ul>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg">
                    <p className="text-sm font-medium text-blue-400 mb-1">Personal Tax Account</p>
                    <ul className="text-sm text-white space-y-1">
                      <li>
                        &bull; <strong>What it is:</strong> Your personal tax dashboard on the HMRC
                        website
                      </li>
                      <li>
                        &bull; <strong>What it does:</strong> Shows your income tax summary,
                        estimated tax position, National Insurance record, tax codes, student loan
                        balances, and marriage allowance status
                      </li>
                      <li>
                        &bull; <strong>Setup:</strong> Accessible via Government Gateway login at
                        gov.uk/personal-tax-account
                      </li>
                      <li>
                        &bull; <strong>Priority:</strong> Highly recommended &mdash; gives you a
                        complete picture of your tax affairs
                      </li>
                    </ul>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg">
                    <p className="text-sm font-medium text-green-400 mb-1">
                      Check Your State Pension Forecast
                    </p>
                    <ul className="text-sm text-white space-y-1">
                      <li>
                        &bull; <strong>What it is:</strong> A tool that shows your projected State
                        Pension amount
                      </li>
                      <li>
                        &bull; <strong>What it does:</strong> Shows how much State Pension you are
                        on track to receive, how many qualifying years you have, and whether you
                        have any gaps that could be filled by voluntary NI contributions
                      </li>
                      <li>
                        &bull; <strong>Setup:</strong> Access via your Personal Tax Account or
                        gov.uk/check-state-pension
                      </li>
                      <li>
                        &bull; <strong>Priority:</strong> Check at least once a year &mdash; gaps in
                        your NI record can be filled voluntarily, but only within time limits
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Action Point:</strong> If you have not already,
                  set up your Government Gateway account this week. It takes 5 minutes online, then
                  10 working days for your User ID to arrive by post. Once you have it, download the
                  HMRC app and log in. Check your Personal Tax Account and your State Pension
                  forecast. These three steps take less than 30 minutes total and give you a clear
                  picture of your tax position.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Minimum Viable Finance System */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">06</span>
            The Minimum Viable Finance System
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                If you are newly self-employed and feeling overwhelmed by all the tools and systems
                described in this section, here is the good news: you can set up a fully functional
                finance system in under an hour, at zero cost. This is the minimum viable system
                &mdash; it covers all the essentials and can be expanded later as your business
                grows.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Setup Checklist (Under 1 Hour)
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-rose-400">Step 1 (10 minutes):</strong> Open a free
                      business bank account. We recommend Mettle by NatWest (includes free
                      FreeAgent) or Starling Business (best Spaces feature). Download the app and
                      complete registration
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong className="text-amber-400">Step 2 (5 minutes):</strong> Create a Tax
                      pot/space within your business account (or open a separate instant-access
                      savings account). Label it clearly: &ldquo;TAX &mdash; DO NOT TOUCH&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong className="text-green-400">Step 3 (5 minutes):</strong> Set a reminder
                      on your phone for every customer payment: &ldquo;Transfer 30% to Tax account
                      NOW&rdquo;. If your bank supports automatic percentage transfers, set that up
                      instead
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-blue-400">Step 4 (15 minutes):</strong> Set up
                      FreeAgent (free via Mettle) or create a simple Google Sheets spreadsheet with
                      two tabs: Income (date, customer, amount) and Expenses (date, supplier,
                      amount, category). This is your accounting system
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-purple-400">Step 5 (5 minutes):</strong> Create a
                      folder on your phone called &ldquo;Receipts 2024-25&rdquo;. Every time you get
                      a receipt for a business purchase, photograph it and save it to this folder.
                      Enable cloud backup (iCloud or Google Photos)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-rose-400">Step 6 (5 minutes):</strong> Set a weekly
                      recurring calendar event: &ldquo;Friday 4pm &mdash; Admin 30 mins&rdquo;. This
                      is your weekly habit trigger
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong className="text-amber-400">Step 7 (10 minutes):</strong> Register for
                      a Government Gateway account at gov.uk if you do not already have one. Your
                      User ID will arrive by post within 10 working days
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Total Cost:</strong> &pound;0.{' '}
                  <strong>Total Time:</strong> Under 1 hour. <strong>Impact:</strong> Immediate
                  separation of business and personal money, protected tax fund, digital receipt
                  trail, weekly admin habit, and a foundation that can scale as your business grows.
                  You can add more sophisticated tools later &mdash; YNAB for personal budgeting,
                  Dext for receipt automation, Xero for advanced accounting &mdash; but this minimum
                  viable system covers everything you need to stay compliant and in control.
                </p>
              </div>

              <p>
                The most important thing is to start. Do not wait until you find the
                &ldquo;perfect&rdquo; system. The minimum viable system described above is good
                enough to run a successful sole-trader business for years. Perfection is the enemy
                of action &mdash; open that business account today and transfer 30% of your next
                payment into the tax pot. Everything else is refinement.
              </p>

              <p>
                Remember: the goal of all these tools and systems is not to turn you into an
                accountant. The goal is to give you <strong>financial confidence</strong> &mdash;
                the knowledge that your tax is covered, your records are in order, your spending is
                under control, and your business is on solid ground. With that confidence, you can
                focus on what you actually love doing: the electrical work itself.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz title="Section 4 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../pf-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../pf-module-3">
              Next: Module 3 &mdash; Debt Management &amp; Credit
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
