import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Briefcase,
  PoundSterling,
  Calculator,
  Receipt,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Truck,
  Wrench,
  FileText,
  Users,
  Target,
  Rocket,
  BarChart3,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Business', href: '/guides/going-self-employed-electrician' },
  { label: 'Self-Employed', href: '/guides/going-self-employed-electrician' },
];

const tocItems = [
  { id: 'when-to-go', label: 'When to Make the Leap' },
  { id: 'registration', label: 'Registration Checklist' },
  { id: 'competent-person', label: 'Competent Person Schemes' },
  { id: 'pricing-your-work', label: 'Pricing Your Work' },
  { id: 'getting-work', label: 'Getting Work' },
  { id: 'tools-and-van', label: 'Tools and Van' },
  { id: 'financial-setup', label: 'Financial Setup' },
  { id: 'first-six-months', label: 'The First Six Months' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Register with HMRC as self-employed, join a competent person scheme (NICEIC, NAPIT, or ELECSA), and get public liability insurance before taking your first job.',
  'Price your work to cover all overheads — van, insurance, tools, training, fuel, phone, software — not just your day rate. Use a proper hourly rate calculation.',
  'Build a pipeline before you leave employment. Line up your first 4 to 6 weeks of work through contacts, former colleagues, and local builders before handing in your notice.',
  'Keep records from day one. Track every invoice, receipt, and expense digitally — this is your tax return, your business plan, and your proof of income for mortgages.',
  'Elec-Mate provides the complete business toolkit — quoting, invoicing, expense tracking, cash flow planning, job profitability analysis, and AI cost engineering — all from your phone.',
];

const faqs = [
  {
    question: 'How much can I earn as a self-employed electrician?',
    answer:
      'Self-employed electricians in the UK typically earn between £35,000 and £70,000 per year, with some earning significantly more. Your income depends on several factors: the type of work (domestic vs commercial), your location (London and the South East command higher rates), your efficiency (how many billable hours you achieve per week), and your pricing. A domestic electrician charging £45 per hour and working 35 billable hours per week earns £1,575 per week gross — about £81,900 per year before expenses. After expenses (van, insurance, materials, fuel, tools, training, accountant), a realistic net profit is £40,000 to £55,000. Subcontract work through CIS often pays day rates of £180 to £280 depending on the trade and location. Specialising in higher-value work (EV charging, solar PV, commercial fit-outs, fire alarm systems) can push earnings above £70,000.',
  },
  {
    question: 'Do I need qualifications to work as a self-employed electrician?',
    answer:
      'There is no single legal qualification required to work as an electrician in the UK — it is not a legally protected title. However, to carry out notifiable electrical work under Part P of the Building Regulations (England and Wales), you must either be registered with a competent person scheme or notify Building Control before starting the work. To register with a competent person scheme (NICEIC, NAPIT, ELECSA), you typically need: NVQ Level 3 in Electrical Installation or equivalent, the 18th Edition qualification (C&G 2382), and an Inspection and Testing qualification (C&G 2391 or equivalent). You also need to pass the scheme assessment. Without scheme registration, you can still work on non-notifiable work (like-for-like replacements, work in non-special locations), but your ability to take on full installations, rewires, and consumer unit changes is severely limited.',
  },
  {
    question: 'Which competent person scheme should I join?',
    answer:
      'The three main competent person schemes for electricians are NICEIC, NAPIT, and ELECSA. All three are government-authorised and allow you to self-certify notifiable electrical work under Part P. NICEIC is the oldest and most widely recognised — many customers specifically ask for "NICEIC-approved" electricians. NAPIT is popular and often slightly cheaper. ELECSA is also well-respected. The choice often comes down to cost, assessment availability in your area, and personal preference. Annual fees range from £300 to £600 depending on the scheme and your business size. All three require an initial assessment (a scheme assessor visits you on a live job), annual technical assessments, and ongoing CPD. The assessment checks your technical competence, your understanding of BS 7671, and your ability to complete and issue correct certificates.',
  },
  {
    question: 'How do I get my first customers as a self-employed electrician?',
    answer:
      'Start by telling everyone you know that you are now working independently — former colleagues, friends, family, neighbours. Word of mouth is the single most powerful source of work for electricians. Next, build relationships with local builders, plumbers, kitchen fitters, and estate agents — they all need electricians and are happy to refer a reliable one. Register on Checkatrade, MyBuilder, or Bark and build up reviews quickly by asking every customer for a review. Set up a Google Business Profile — this is free and puts you on Google Maps when someone searches for "electrician near me." Post your work on social media (before and after photos of consumer unit upgrades, EV charger installations, rewires). Consider leaflet drops in your target area. The key is consistency — the first 3 to 6 months are the hardest, but once you have 20 to 30 positive reviews and a regular flow of referrals, the phone starts ringing.',
  },
  {
    question: 'How much money do I need to start as a self-employed electrician?',
    answer:
      'The startup costs for a self-employed electrician depend on what you already have. If you own your tools and van, the costs are lower. As a rough guide: competent person scheme registration (£300 to £600), public liability insurance (£150 to £400), professional indemnity insurance (£80 to £200), tools and test equipment (£3,000 to £8,000 if starting from scratch), van (£5,000 to £15,000 used, or lease at £200 to £400 per month), van insurance (£600 to £1,500), signwriting and branding (£200 to £500), accountant setup (£100 to £300), software subscriptions including Elec-Mate (£20 to £50 per month), marketing materials and website (£300 to £1,000), and a financial buffer for the first 2 to 3 months while you build a customer base (£3,000 to £6,000). Total realistic startup cost: £8,000 to £25,000 depending on whether you already have tools and a van.',
  },
  {
    question: 'Should I go self-employed or start a limited company?',
    answer:
      'Most electricians start as sole traders because it is simpler and cheaper to set up. You register with HMRC, start trading, and file one Self-Assessment tax return per year. There is no Companies House filing, no corporation tax return, and lower accountancy costs. As your profits grow (above £40,000 to £50,000 per year), a limited company becomes more tax-efficient because you can pay yourself a small salary and take remaining profits as dividends at lower tax rates. However, a limited company adds administrative complexity and higher accountancy costs. Many electricians trade as sole traders for the first 1 to 3 years and then incorporate when profits are consistently high enough to justify the additional costs. Speak to an accountant before making the decision — they can model both scenarios for your specific situation.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/electrician-tax-guide-uk',
    title: 'Electrician Tax Guide UK',
    description:
      'Self-assessment, allowable expenses, CIS deductions, VAT threshold, and record keeping.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/guides/hourly-rate-calculator-electrician',
    title: 'Hourly Rate Calculator',
    description:
      'Work out your true hourly rate including every overhead, profit margin, and non-billable time.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/electrician-insurance-uk',
    title: 'Electrician Insurance UK',
    description:
      'Public liability, professional indemnity, employers liability, tools cover, and van insurance.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/cis-for-electricians',
    title: 'CIS for Electricians',
    description:
      'The Construction Industry Scheme explained — registration, deduction rates, and monthly returns.',
    icon: FileText,
    category: 'Guide',
  },
  {
    href: '/guides/debt-recovery-electricians',
    title: 'Debt Recovery for Electricians',
    description:
      'Getting paid on time — payment terms, late payment interest, and small claims court.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/tools/invoice-generator',
    title: 'Invoice App',
    description:
      'Create and send professional invoices from your phone. Track payments and chase overdue invoices.',
    icon: Receipt,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'when-to-go',
    heading: 'When to Make the Leap: Signs You Are Ready',
    content: (
      <>
        <p>
          Going self-employed is one of the best decisions you can make as an electrician — but
          timing matters. Leaving a stable employed position too early can put you under financial
          pressure. Leaving too late means years of earning less than you could.
        </p>
        <p>Here are the signs that you are ready:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>You have the qualifications.</strong> 18th Edition (C&G 2382), Inspection
                and Testing (C&G 2391), NVQ Level 3, and ideally AM2. Without these, getting onto a
                competent person scheme is difficult, and without a scheme, your earning potential
                is capped.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>You have experience.</strong> At least 3 to 5 years working as a qualified
                electrician, ideally across a range of work types — domestic, commercial, testing,
                fault-finding. Competent person scheme assessors will evaluate your practical skills
                on a live job.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>You have contacts.</strong> People who will give you work — builders,
                project managers, property managers, former colleagues, friends and family who need
                electrical work done. Having 4 to 6 weeks of work lined up before you start is
                ideal.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>You have a financial buffer.</strong> At least 2 to 3 months of living
                expenses saved. Income is unpredictable in the early months, and you need to cover
                rent, bills, and van costs even when work is quiet.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>You can handle the business side.</strong> Pricing, quoting, invoicing,
                chasing payments, bookkeeping, scheduling. This is where many technically excellent
                electricians struggle — and where tools like Elec-Mate make the difference.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If you tick all five boxes, you are ready. If you are missing one or two, work on those
          gaps while still employed. There is no rush — but there is also no reason to wait
          indefinitely if you are prepared.
        </p>
      </>
    ),
  },
  {
    id: 'registration',
    heading: 'Registration Checklist: Everything You Need to Do',
    content: (
      <>
        <p>
          Before you take your first self-employed job, you need to complete these registrations.
          Some are legal requirements; others are practical necessities.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMRC Self-Assessment registration.</strong> Register as self-employed with
                HMRC within the first few months of trading. You will receive a UTR (Unique Taxpayer
                Reference) within 10 working days. You must register by 5 October in the second tax
                year of trading.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>
                  <SEOInternalLink href="/guides/cis-for-electricians">
                    CIS registration
                  </SEOInternalLink>
                </strong>{' '}
                — if you will do any subcontract work for contractors, register as a CIS
                subcontractor. This ensures the 20% deduction rate rather than 30%.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person scheme.</strong> Join NICEIC, NAPIT, or ELECSA to
                self-certify notifiable work under Part P. Allow 4 to 8 weeks for the application
                and initial assessment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>
                  <SEOInternalLink href="/guides/electrician-insurance-uk">
                    Insurance
                  </SEOInternalLink>
                </strong>{' '}
                — public liability (minimum £2 million), professional indemnity, and tools cover.
                Get these in place before you start work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Business bank account.</strong> Keep business and personal finances
                separate. Most banks offer free business current accounts for the first year. This
                makes bookkeeping and{' '}
                <SEOInternalLink href="/guides/electrician-tax-guide-uk">
                  tax returns
                </SEOInternalLink>{' '}
                much simpler.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Accountant.</strong> Find an accountant who understands the construction
                trade, CIS, and small business tax. A good accountant will save you more in tax than
                they cost in fees.
              </span>
            </li>
          </ul>
        </div>
        <p>
          This list looks long, but most of it can be done in 2 to 4 weeks alongside your current
          job. The competent person scheme application takes the longest — start that process first.
        </p>
      </>
    ),
  },
  {
    id: 'competent-person',
    heading: 'Competent Person Schemes: NICEIC, NAPIT, and ELECSA',
    content: (
      <>
        <p>
          A competent person scheme registration is essential for any electrician who wants to carry
          out notifiable electrical work under Part P of the Building Regulations. Without it, you
          must notify Building Control before starting any notifiable work — which adds cost, delay,
          and inconvenience.
        </p>
        <div className="grid gap-4 sm:grid-cols-3 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">NICEIC</h3>
            <p className="text-white text-sm leading-relaxed">
              The oldest and most recognised scheme. Options include Domestic Installer (domestic
              work only) and Approved Contractor (domestic and commercial). Annual fees from around
              £350 to £500+. Widely recognised by customers and main contractors.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">NAPIT</h3>
            <p className="text-white text-sm leading-relaxed">
              A popular alternative, often slightly cheaper than NICEIC. Offers Domestic Installer
              and Full Scope registration. Annual fees from around £300 to £450. Good assessment
              availability across the UK. Well-regarded by customers.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">ELECSA</h3>
            <p className="text-white text-sm leading-relaxed">
              A growing scheme with competitive pricing. Offers multiple registration categories.
              Annual fees from around £300 to £400. Provides online certification portal and
              technical support. A solid choice with good customer recognition.
            </p>
          </div>
        </div>
        <p>
          The initial assessment involves a scheme assessor visiting you on a live job (or at a
          completed job) to evaluate your practical competence, your understanding of BS 7671, and
          your ability to complete certificates correctly. They will also check your qualifications,
          insurance, test equipment calibration certificates, and a sample of your previous
          certificates.
        </p>
        <p>
          Prepare thoroughly for the assessment. Review your BS 7671, make sure your test equipment
          is calibrated, and have examples of completed certificates ready. First-time pass rates
          vary, but being well-prepared makes a significant difference.
        </p>
      </>
    ),
  },
  {
    id: 'pricing-your-work',
    heading: 'Pricing Your Work: Do Not Sell Yourself Short',
    content: (
      <>
        <p>
          The single biggest mistake new self-employed electricians make is pricing too low. You
          look at what employed electricians earn, add a bit on top, and think that is your rate.
          But you are forgetting the overheads that your employer used to pay — van, fuel,
          insurance, tools, training, phone, software, downtime, holiday, sick pay. All of those
          costs come out of your pocket now.
        </p>
        <p>
          Use a proper{' '}
          <SEOInternalLink href="/guides/hourly-rate-calculator-electrician">
            hourly rate calculation
          </SEOInternalLink>{' '}
          that accounts for every overhead. Here is the formula in simple terms:
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <p className="text-white font-mono text-sm mb-4">
            Hourly Rate = (Target Annual Income + Annual Overheads + Tax Provision) / Billable Hours
            Per Year
          </p>
          <ul className="space-y-2 text-white text-sm">
            <li>
              <strong>Target income:</strong> What you want to take home after tax (for example,
              £40,000)
            </li>
            <li>
              <strong>Overheads:</strong> Van, fuel, insurance, tools, training, phone, software,
              accountant (for example, £15,000)
            </li>
            <li>
              <strong>Tax provision:</strong> Income tax + NI on your target income (for example,
              £10,000)
            </li>
            <li>
              <strong>Billable hours:</strong> Not 40 hours per week — you lose time to quoting,
              admin, travel, training, and quiet periods. Realistically 1,200 to 1,500 billable
              hours per year.
            </li>
          </ul>
        </div>
        <p>
          Using the example above: (£40,000 + £15,000 + £10,000) / 1,300 = £50 per hour. That is the
          minimum you need to charge to hit your target income. If you are charging £35 per hour,
          you are losing money — or you are not accounting for all your costs.
        </p>
        <p>
          Elec-Mate's{' '}
          <SEOInternalLink href="/tools/quote-generator">AI cost engineer</SEOInternalLink> helps
          you price jobs accurately by calculating the true cost of labour, materials, and
          overheads. It ensures your quotes are competitive but profitable.
        </p>
        <SEOAppBridge
          title="Price every job for profit, not just survival"
          description="Elec-Mate's AI cost engineer calculates the true cost of each job — labour, materials, overheads, and profit margin. Generate professional quotes from your phone that cover your costs and grow your business."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'getting-work',
    heading: 'Getting Work: Building Your Customer Pipeline',
    content: (
      <>
        <p>
          Technical skill gets you the qualifications. Business skill gets you the customers. The
          most talented electrician in the country earns nothing if nobody knows they exist. Here is
          how to build a steady pipeline of work:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Users className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Word of Mouth and Referrals</h4>
                <p className="text-white text-sm leading-relaxed">
                  The number one source of work for electricians. Do excellent work, be reliable, be
                  tidy, and communicate well. Ask every happy customer for a referral. Tell friends,
                  family, and former colleagues you are now self-employed. Most electricians get 60%
                  to 80% of their work through word of mouth once established.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Target className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Trade Relationships</h4>
                <p className="text-white text-sm leading-relaxed">
                  Build relationships with local builders, plumbers, kitchen fitters, estate agents,
                  landlords, and property managers. They all need electricians regularly and are
                  happy to refer someone reliable. Introduce yourself, do a great job, and the work
                  follows. One good relationship with a busy builder can keep you working full time.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Rocket className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Online Presence</h4>
                <p className="text-white text-sm leading-relaxed">
                  Set up a Google Business Profile (free) to appear on Google Maps. Register on
                  Checkatrade, MyBuilder, or Bark. Post before-and-after photos on social media. Ask
                  every customer for a Google review. Online reviews build trust and generate
                  enquiries. A website helps but is not essential in the first year — your Google
                  Business Profile matters more.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          The first 3 to 6 months are the hardest. Work is inconsistent, cash flow is tight, and you
          question whether you made the right decision. Push through. Every customer is a potential
          referral source. Every good review builds your reputation. After 6 to 12 months, most
          self-employed electricians have more work than they can handle.
        </p>
      </>
    ),
  },
  {
    id: 'tools-and-van',
    heading: 'Tools and Van: What You Need to Start',
    content: (
      <>
        <p>
          You cannot work without tools and transport. Here is a practical guide to what you need
          from day one and what can wait.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">
              <Wrench className="w-5 h-5 inline mr-2" />
              Essential Tools
            </h3>
            <ul className="text-white text-sm leading-relaxed space-y-2">
              <li>Multifunction tester (calibrated)</li>
              <li>Socket tester and proving unit</li>
              <li>Voltage indicator (GS38 compliant)</li>
              <li>Insulation resistance tester</li>
              <li>Side cutters, strippers, pliers</li>
              <li>Various screwdrivers (VDE insulated)</li>
              <li>SDS drill and core drill</li>
              <li>Cable detection tool</li>
              <li>PPE — safety boots, hi-vis, eye protection</li>
              <li>Cable rods and accessories</li>
              <li>Level, tape measure, pencil</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">
              <Truck className="w-5 h-5 inline mr-2" />
              Van
            </h3>
            <ul className="text-white text-sm leading-relaxed space-y-2">
              <li>Medium van (Berlingo, Partner, Caddy)</li>
              <li>Internal racking for tools and materials</li>
              <li>Deadlocks and security upgrades</li>
              <li>Business use insurance (Class 3)</li>
              <li>Signwriting with name and number</li>
              <li>Dashcam (front and rear)</li>
              <li>Breakdown cover</li>
              <li>Budget: £5,000 to £15,000 used</li>
              <li>Or lease: £200 to £400 per month</li>
            </ul>
          </div>
        </div>
        <p>
          Buy quality tools that will last. A cheap multifunction tester will frustrate you daily
          and slow you down. Invest in the best you can afford for the tools you use most. You can
          buy less-frequently-used items later as work demands them.
        </p>
        <p>
          All tool and van purchases are{' '}
          <SEOInternalLink href="/guides/electrician-tax-guide-uk">
            allowable expenses
          </SEOInternalLink>{' '}
          — reducing your taxable profit. Keep every receipt. Use Elec-Mate's expenses tracker to
          photograph and categorise receipts as you go.
        </p>
      </>
    ),
  },
  {
    id: 'financial-setup',
    heading: 'Financial Setup: Getting the Money Side Right',
    content: (
      <>
        <p>
          Many electricians are brilliant with wiring and terrible with money. Do not let poor
          financial management undermine your technical skills. Set up the right systems from day
          one.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Separate business bank account.</strong> Open a dedicated business account
                and put all business income and expenses through it. This makes bookkeeping
                straightforward and gives your accountant a clean record to work from.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Set aside tax money.</strong> As a rule of thumb, put 25% to 30% of every
                payment you receive into a separate savings account for tax. Do not touch this money
                until your tax bill arrives. Too many new self-employed electricians spend
                everything and then face a shock tax bill in January.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Invoice promptly.</strong> Send invoices the same day you complete the work
                — or before you leave the property. The longer you wait, the slower you get paid.
                Elec-Mate lets you create and send professional invoices from your phone on site.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Track every expense.</strong> Every receipt is a potential tax deduction.
                Photograph receipts immediately and log them digitally. Do not throw receipts in the
                van door pocket and hope you remember at year end.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Run your business from your phone — quoting, invoicing, expenses, and cash flow"
          description="Elec-Mate gives you the complete business toolkit. Create quotes with the AI cost engineer, send professional invoices, track expenses with receipt scanning, and see your real-time profit and cash flow. 7-day free trial."
          icon={BarChart3}
        />
      </>
    ),
  },
  {
    id: 'first-six-months',
    heading: 'The First Six Months: What to Expect',
    content: (
      <>
        <p>
          The first six months of self-employment are an emotional rollercoaster. Understanding what
          to expect helps you push through the tough periods.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Month 1 to 2:</strong> Adrenaline and momentum. You have your first few jobs
                lined up, you are excited, and the freedom feels incredible. Enjoy it — but stay
                disciplined with your financial systems. Start tracking expenses and sending
                invoices from day one.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Month 3 to 4:</strong> The initial work pipeline dries up and you have a
                quiet week or two. This is normal. Use the quiet time to market yourself, follow up
                on quotes, build trade relationships, and get your online presence set up. Do not
                panic-price — lowering your rates attracts the wrong customers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Month 5 to 6:</strong> Referrals start coming in. Customers you did good
                work for recommend you to others. Your online reviews are building. Work becomes
                more consistent. You start to see the pattern: good work leads to referrals, which
                leads to more work.
              </span>
            </li>
          </ul>
        </div>
        <p>
          By the end of the first year, most electricians who stuck with it are fully booked 2 to 4
          weeks in advance. The key ingredients are technical competence, reliability, good
          communication, and consistent marketing. The business side — pricing, invoicing, credit
          control, expense tracking — is what Elec-Mate handles for you, so you can focus on the
          work.
        </p>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function GoingSelfEmployedElectricianPage() {
  return (
    <GuideTemplate
      title="Going Self-Employed as an Electrician | Complete Guide"
      description="Complete guide to going self-employed as an electrician in the UK. Covers HMRC registration, competent person schemes, pricing, getting customers, tools and van, insurance, and financial setup."
      datePublished="2026-01-12"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Self-Employed Guide"
      badgeIcon={Briefcase}
      heroTitle={
        <>
          Going Self-Employed as an Electrician:{' '}
          <span className="text-yellow-400">The Complete Guide</span>
        </>
      }
      heroSubtitle="Everything you need to know about setting up as a self-employed electrician in the UK. From registering with HMRC and joining a competent person scheme to pricing your work, getting customers, and managing your finances. A practical guide from electricians who have done it."
      readingTime={15}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Going Self-Employed"
      relatedPages={relatedPages}
      ctaHeading="The Business App Built for Self-Employed Electricians"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate to manage their business. Quotes, invoices, expenses, cash flow, certificates, and AI-powered job pricing — all from your phone. 7-day free trial, cancel anytime."
    />
  );
}
