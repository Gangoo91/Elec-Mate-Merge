import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Briefcase,
  PoundSterling,
  ShieldCheck,
  FileText,
  Receipt,
  Calculator,
  Truck,
  Wrench,
  Users,
  TrendingUp,
  Building2,
  Scale,
  Zap,
  BarChart3,
  ClipboardCheck,
  Brain,
} from 'lucide-react';

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Going Self-Employed', href: '/guides/going-self-employed-electrician' },
];

const tocItems = [
  { id: 'when-to-go-self-employed', label: 'When to Make the Switch' },
  { id: 'sole-trader-vs-limited', label: 'Sole Trader vs Limited Company' },
  { id: 'registering-with-hmrc', label: 'Registering with HMRC' },
  { id: 'insurance', label: 'Insurance You Need' },
  { id: 'competent-person-scheme', label: 'Joining a Scheme' },
  { id: 'van-and-tools', label: 'Van and Tools' },
  { id: 'pricing-your-work', label: 'Pricing Your Work' },
  { id: 'finding-clients', label: 'Finding Clients' },
  { id: 'tax-and-ni', label: 'Tax, NI, and CIS' },
  { id: 'record-keeping', label: 'Record Keeping' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Most electricians go self-employed after 2-5 years of employed experience — long enough to work competently on your own and to have built a network of contacts for finding work.',
  'Sole trader is the simplest setup for starting out (register with HMRC, file Self Assessment), while a limited company offers tax advantages once profits exceed approximately £40,000-£50,000.',
  'You need four types of insurance as a minimum: public liability (£1-£5 million), professional indemnity, employers liability (if you hire anyone), and tool/van cover.',
  'Pricing jobs correctly is the single biggest factor in self-employed success — most electricians undercharge because they fail to account for non-billable time, overheads, and profit margin.',
  'Joining a competent person scheme (NICEIC, NAPIT, or ELECSA) allows you to self-certify notifiable work and is effectively essential for winning domestic and commercial customers.',
];

const faqs = [
  {
    question: 'How much can I earn as a self-employed electrician?',
    answer:
      'Self-employed electricians in the UK typically earn between £40,000 and £75,000 in annual turnover as a one-person operation, with top earners in specialist areas exceeding £80,000-£100,000. However, turnover is not profit — you must deduct business costs before calculating your actual income. Typical annual costs include: van costs (£5,000-£8,000 for lease, fuel, insurance, and maintenance), public liability and professional indemnity insurance (£500-£1,500), competent person scheme membership (£400-£800), accountancy fees (£500-£1,500), tools and test equipment replacement and calibration (£500-£2,000), marketing and advertising (£500-£2,000), materials for quoted jobs, phone and broadband, workwear, and CPD training. After all costs, a self-employed electrician turning over £60,000 might take home £40,000-£48,000 in net profit before personal tax. The key advantage is that there is no ceiling — employed electricians hit a pay cap, but self-employed earnings scale with your pricing, efficiency, and reputation.',
  },
  {
    question: 'Should I set up as a sole trader or limited company?',
    answer:
      'Most electricians start as a sole trader because it is simpler and cheaper to set up. As a sole trader, you register with HMRC for Self Assessment, file a tax return once a year, and pay Income Tax and Class 2/4 National Insurance on your profits. There is no distinction between you and the business — you are personally liable for any debts. A limited company creates a separate legal entity, which provides limited liability protection (your personal assets are protected if the business incurs debts). The main financial advantage comes from the ability to pay yourself a combination of a small salary (to use your Income Tax personal allowance and maintain NI contributions) and dividends (taxed at lower rates than Income Tax). This typically saves money once your net profits exceed approximately £40,000-£50,000 per year. However, a limited company has higher administrative costs: annual accounts must be filed with Companies House, you need to run payroll, corporation tax returns must be filed, and accountancy fees are higher (typically £1,000-£2,500 per year vs £300-£800 for a sole trader). Many electricians start as a sole trader and switch to a limited company once their profits grow.',
  },
  {
    question: 'What insurance do I need as a self-employed electrician?',
    answer:
      'As a self-employed electrician, you need several types of insurance. Public liability insurance (typically £1 million-£5 million cover) is essential — it covers you if your work causes damage to a client\'s property or injury to a third party. Most competent person schemes and commercial clients require at least £2 million public liability cover. Professional indemnity insurance covers you against claims arising from professional advice or design errors — for example, if a circuit design you specified turns out to be inadequate. Employers\' liability insurance is a legal requirement if you employ anyone, including apprentices, subcontractors in some arrangements, or labourers — it must provide at least £5 million cover. Tool and equipment insurance covers your tools, test instruments, and stock against theft, loss, or damage (particularly important given the cost of professional test equipment). Van insurance on a commercial vehicle policy is also essential — domestic car insurance does not cover using your vehicle for work. Some insurers offer combined "electrician business insurance" packages that bundle all of these together for £500-£1,500 per year, which is often cheaper than buying each policy separately.',
  },
  {
    question: 'How do I find my first clients as a new self-employed electrician?',
    answer:
      'Finding your first clients is often the biggest concern for electricians going self-employed, but most find that work comes more easily than expected if they approach it methodically. Start with your existing network: tell every builder, plumber, decorator, estate agent, letting agent, and property manager you have ever worked with that you are now available. Builders and property professionals generate a huge amount of electrical work and having a reliable electrician on speed dial is valuable to them. Register on trusted trade platforms such as Checkatrade, MyBuilder, Bark, and Rated People — these generate a steady stream of leads for domestic work, particularly in the early months. Create a simple but professional website and Google Business Profile — many homeowners search "electrician near me" and the Google local results are the first thing they see. Join local Facebook groups and community pages — many homeowners post requests for trade recommendations. Offer competitive but profitable pricing on your first jobs to build a portfolio of reviews and testimonials. As you build a reputation, word-of-mouth referrals will become your primary source of work. Within 6-12 months, most self-employed electricians find that the challenge shifts from finding work to managing their diary.',
  },
  {
    question: 'How does CIS (Construction Industry Scheme) work for electricians?',
    answer:
      'The Construction Industry Scheme (CIS) applies when you are working as a subcontractor for a contractor (such as a builder, main contractor, or another electrical company). Under CIS, the contractor deducts tax at source from your payments — either 20% (if you are registered with HMRC for CIS) or 30% (if you are not registered). These deductions are treated as advance payments of your Income Tax and National Insurance — they are not an additional tax. When you file your Self Assessment tax return at the end of the year, the CIS deductions are credited against your total tax liability, and any overpayment is refunded. To register for CIS, contact HMRC — it is free and straightforward. You should always register because the alternative (30% deduction for unregistered subcontractors) is punitively high. CIS only applies to payments from contractors for construction work — it does not apply to payments from homeowners, tenants, or non-construction businesses for direct electrical work. If you work primarily for domestic clients, CIS may not affect you at all. Keep detailed records of all CIS deductions (your contractor should provide a CIS payment and deduction statement for each payment) as you will need these when filing your tax return.',
  },
  {
    question: 'Do I need to register for VAT as a self-employed electrician?',
    answer:
      'You must register for VAT if your taxable turnover exceeds the VAT registration threshold, which is currently £90,000 (as of 2025-26 — check the latest HMRC guidance as this changes periodically). If your turnover is below this threshold, VAT registration is voluntary. The decision to register voluntarily has pros and cons. The main advantage is that you can reclaim VAT on your business purchases (van, tools, materials, fuel, insurance, accountancy fees) — if you spend heavily on materials, this can be significant. The main disadvantage is that you must charge your customers VAT at 20% on top of your prices, which makes you 20% more expensive than non-VAT-registered competitors for domestic customers (who cannot reclaim VAT). For electricians who primarily work for domestic clients, staying below the VAT threshold is often advantageous. For those who primarily work for VAT-registered commercial clients (who can reclaim the VAT you charge), registration is less of a competitive disadvantage. If you approach the threshold, consider the Flat Rate Scheme, which simplifies VAT accounting — you charge VAT at 20% but pay HMRC a lower flat rate percentage of your gross turnover. The flat rate for electrical installation is currently 10.5%, meaning you keep the difference.',
  },
  {
    question: 'What records do I need to keep as a self-employed electrician?',
    answer:
      'HMRC requires you to keep records of all business income and expenses for at least 5 years after the 31 January submission deadline for the relevant tax year. At a minimum, you need: records of all sales invoices and income received (including cash payments), records of all business expenses with receipts or proof of payment, bank statements for your business bank account (you should always have a separate business account, even as a sole trader), mileage records if you claim vehicle expenses using the simplified mileage rate, CIS payment and deduction statements from contractors, records of any assets purchased for the business (van, tools, equipment) and their costs, and VAT records if you are VAT-registered. Beyond tax records, you should also keep copies of all electrical certificates issued, test results, photographic records of installations, and customer correspondence — these protect you in the event of a dispute or claim against your work. Using accounting software (such as Xero, QuickBooks, or FreeAgent) or the Elec-Mate expense tracking tools makes record keeping much simpler and ensures you do not miss deductible expenses that reduce your tax bill.',
  },
];

const sections = [
  {
    id: 'when-to-go-self-employed',
    heading: 'When to Go Self-Employed as an Electrician',
    content: (
      <>
        <p>
          The decision to go self-employed is one of the biggest you will make in your electrical
          career. Get the timing right and it can transform your income and quality of life. Rush it
          and you risk financial stress and reputation damage.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">Signs You Are Ready</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>2-5 years of employed experience:</strong> You can confidently handle a wide
                range of jobs on your own — domestic rewires, consumer unit upgrades, fault finding,
                testing, and certification — without needing to ask for help.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>A network of contacts:</strong> You know builders, plumbers, estate agents,
                and property managers who would use you. Work will not appear from nowhere — your
                network is your pipeline.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Financial cushion:</strong> You have 3-6 months of living expenses saved.
                The first few months can be inconsistent, and you need to cover start-up costs (van,
                tools, insurance, scheme membership).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Full qualifications:</strong> You hold the 18th Edition, C&G 2391 (highly
                recommended), and ideally the AM2 with JIB Approved Electrician grading. These
                credentials give clients confidence.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Business mindset:</strong> You are willing to do the admin — quoting,
                invoicing, bookkeeping, tax returns, customer communication. The electrical work is
                only half the job when you are self-employed.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Many electricians test the waters before fully committing. Some take on private jobs in
          evenings and weekends while still employed, building a client base before making the leap.
          Others leave employment but initially work as a subcontractor for their previous employer,
          guaranteeing income while they build their own customer base. Both approaches reduce risk
          and help you validate that self-employment suits you.
        </p>
      </>
    ),
  },
  {
    id: 'sole-trader-vs-limited',
    heading: 'Sole Trader vs Limited Company',
    content: (
      <>
        <p>
          Your first legal decision is how to structure your business. The two main options for
          electricians are sole trader and limited company. Each has distinct advantages and
          drawbacks.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-6">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Sole Trader</h3>
            <ul className="space-y-2 text-white text-sm">
              <li>
                <strong>Setup:</strong> Free — register with HMRC online
              </li>
              <li>
                <strong>Admin:</strong> Minimal — Self Assessment tax return once per year
              </li>
              <li>
                <strong>Tax:</strong> Income Tax on all profits (20%/40%/45%) plus Class 2 and Class
                4 NI
              </li>
              <li>
                <strong>Liability:</strong> Unlimited — you are personally liable for business debts
              </li>
              <li>
                <strong>Accounting costs:</strong> £300-£800/year
              </li>
              <li>
                <strong>Best for:</strong> Starting out, profits under £40,000-£50,000
              </li>
            </ul>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Limited Company</h3>
            <ul className="space-y-2 text-white text-sm">
              <li>
                <strong>Setup:</strong> £12-£50 to register with Companies House
              </li>
              <li>
                <strong>Admin:</strong> Higher — annual accounts, confirmation statement, payroll,
                corporation tax return
              </li>
              <li>
                <strong>Tax:</strong> Corporation Tax on profits (currently 25%), then dividend tax
                on drawings
              </li>
              <li>
                <strong>Liability:</strong> Limited — personal assets generally protected
              </li>
              <li>
                <strong>Accounting costs:</strong> £1,000-£2,500/year
              </li>
              <li>
                <strong>Best for:</strong> Profits above £40,000-£50,000, those wanting liability
                protection
              </li>
            </ul>
          </div>
        </div>
        <p>
          The tax saving from a limited company comes from the salary-plus-dividends strategy. You
          pay yourself a small salary (typically around the NI primary threshold — approximately
          £12,570 in 2025-26) to maintain NI contributions, then withdraw additional profits as
          dividends, which are taxed at lower rates than employment income. At a profit level of
          £60,000, this can save £3,000-£5,000 per year compared to sole trader status. However, the
          extra admin and accountancy costs eat into some of that saving, so the break-even point is
          generally around £40,000-£50,000 of net profit.
        </p>
        <p>
          Most electricians start as a sole trader for simplicity and switch to a limited company as
          their profits grow. Speak to an accountant who specialises in trades and construction — a
          good accountant pays for themselves many times over in tax savings and advice.
        </p>
      </>
    ),
  },
  {
    id: 'registering-with-hmrc',
    heading: 'Registering with HMRC',
    content: (
      <>
        <p>
          When you start working for yourself, you must register with HMRC. As a sole trader, you
          need to register for Self Assessment within 3 months of your first day of self-employment
          (technically by 5 October following the end of the tax year in which you started, but
          registering early avoids problems).
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">Registration Checklist</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Register for Self Assessment:</strong> Online at gov.uk. You will receive a
                Unique Taxpayer Reference (UTR) number by post within 10 working days.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Register for CIS:</strong> If you will work as a subcontractor for
                contractors in the construction industry, register for the Construction Industry
                Scheme to ensure deductions are made at 20% rather than 30%.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Open a business bank account:</strong> Keep business and personal finances
                completely separate. Most banks offer free or low-cost business accounts for sole
                traders.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Set aside tax money:</strong> Put 25-30% of every payment you receive into a
                separate savings account. This prevents the common trap of spending tax money and
                facing a large Self Assessment bill you cannot afford.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Find an accountant:</strong> A good accountant who understands the
                construction industry will save you far more than their fee. Get recommendations
                from other tradespeople.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If you set up as a limited company instead, you register the company with Companies House
          online (takes about 24 hours) and then register for Corporation Tax with HMRC. You also
          need to set up a payroll scheme (even if you are the only employee/director) and register
          as an employer with HMRC. Your accountant will typically handle most of this for you.
        </p>
      </>
    ),
  },
  {
    id: 'insurance',
    heading: 'Insurance You Need as a Self-Employed Electrician',
    content: (
      <>
        <p>
          Insurance is not optional — it protects your livelihood, your assets, and your clients.
          Without adequate cover, a single claim could wipe you out financially. Here are the types
          of insurance every self-employed electrician needs.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">Essential Insurance Cover</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Public liability insurance (£1m-£5m):</strong> Covers claims if your work
                causes damage to a client's property or injury to a third party. Most competent
                person schemes require at least £2 million cover. Typical cost: £150-£400/year for
                £2m cover.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Professional indemnity insurance:</strong> Covers claims arising from
                professional advice or design errors. If you design circuits, specify cable sizes,
                or recommend solutions, this protects you if something goes wrong. Typical cost:
                £100-£300/year.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Employers' liability insurance (£5m minimum):</strong> A legal requirement
                if you employ anyone — including apprentices, labourers, or temporary workers. Fine
                of up to £2,500 per day for non-compliance. Typical cost: £100-£300/year for a small
                team.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Tool and equipment cover:</strong> Protects your tools, test instruments,
                and stock against theft, loss, or accidental damage. Essential given the cost of
                professional test equipment (a multifunction tester alone costs £600-£1,200).
                Typical cost: £100-£250/year.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Commercial van insurance:</strong> Your personal car insurance does not
                cover using a vehicle for work. A commercial van policy covers business use, goods
                in transit, and often provides breakdown cover. Typical cost: £800-£2,000/year
                depending on age, location, and claims history.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Many insurers offer combined trade insurance packages specifically designed for
          electricians that bundle all of the above together for £500-£1,500 per year — often
          cheaper than buying individual policies. Get quotes from specialist trade insurers such as
          Hiscox, Markel, Zurich, and Covea, or use a broker who specialises in construction and
          trades insurance.
        </p>
      </>
    ),
  },
  {
    id: 'competent-person-scheme',
    heading: 'Joining a Competent Person Scheme',
    content: (
      <>
        <p>
          As a self-employed electrician, joining a competent person scheme is effectively
          essential. Without scheme membership, you must notify building control for every
          notifiable job (consumer unit changes, new circuits, bathroom and kitchen work, outdoor
          installations) and pay their inspection fee. This adds £200-£400 to the cost of every job
          and causes delays.
        </p>
        <p>
          The three main schemes for electricians are{' '}
          <SEOInternalLink href="/guides/niceic-vs-napit">
            NICEIC, NAPIT, and ELECSA
          </SEOInternalLink>
          . All three are government-authorised and allow you to self-certify notifiable work under
          Part P of the Building Regulations. The main differences are cost, reputation, and the
          support services they offer.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">What Scheme Membership Involves</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Initial assessment:</strong> An assessor visits to verify your
                qualifications, inspect your tools and test equipment, review your insurance, and
                assess a sample of your work (they will ask for access to recent installations).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Annual fee:</strong> Typically £400-£800/year depending on the scheme and
                membership level. This includes the right to self-certify work, use the scheme's
                logo, and appear in their "find a contractor" directory.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Periodic inspections:</strong> The scheme will inspect a sample of your work
                annually to ensure ongoing compliance. They may visit jobs in progress or inspect
                completed work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Notification:</strong> You must notify the scheme of all notifiable work
                (they issue building regulation compliance certificates on your behalf). This is
                typically done through an online portal.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The cost of scheme membership pays for itself very quickly. If you do just 2-3 notifiable
          jobs per year that would otherwise require building control involvement (at £200-£400 per
          notification), the scheme fee is already covered. Beyond the financial benefit, scheme
          membership gives clients confidence and is often required by insurers and commercial
          clients.
        </p>
      </>
    ),
  },
  {
    id: 'van-and-tools',
    heading: 'Buying a Van and Essential Tools',
    content: (
      <>
        <p>
          Your van is your mobile workshop and your brand ambassador. The right van choice and a
          well-organised tool setup make a significant difference to your daily efficiency and
          professional image.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">Van Options</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Truck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Small van (Berlingo, Caddy, Connect):</strong> £15,000-£25,000 new,
                £8,000-£15,000 used. Economical, easy to park, sufficient for domestic work. Limited
                space for ladders and larger equipment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Truck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Medium van (Transit Custom, Vivaro, Trafic):</strong> £25,000-£35,000 new,
                £12,000-£22,000 used. The most popular choice for electricians. Good balance of
                space, economy, and manoeuvrability. Fits a full ladder set internally.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Truck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Large van (Transit, Master, Movano):</strong> £30,000-£40,000+ new. Only
                needed if you carry extensive stock, run a team, or do large-scale
                commercial/industrial work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Truck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Van racking:</strong> £500-£2,000 for a proper racking system (Sortimo,
                Bott, or similar). Keeps your van organised, tools accessible, and materials
                visible. Pays for itself in time saved.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">Essential Tool Kit</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Multifunction tester:</strong> Megger MFT1741, Fluke 1664FC, Metrel, or
                similar (£600-£1,200). The single most important tool for testing and certification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Voltage indicator and proving unit:</strong> Two-pole voltage indicator
                (Fluke T150 or similar) plus a proving unit. Essential for safe isolation —
                non-negotiable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Hand tools:</strong> VDE insulated screwdrivers, side cutters, pliers, cable
                strippers, crimp tool, adjustable spanners, SDS drill, combi drill, jigsaw,
                reciprocating saw, socket set.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Access equipment:</strong> Step ladders, extension ladder, platform step.
                Must comply with the Work at Height Regulations 2005.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Total budget:</strong> £1,500-£4,000 for a professional starter kit,
                depending on brands and whether you buy new or used.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'pricing-your-work',
    heading: 'Pricing Your Work Correctly',
    content: (
      <>
        <p>
          Pricing is the most important business skill you can develop. Most electricians
          undercharge — not because they are bad at their trade, but because they do not properly
          account for all costs, non-billable time, and the profit margin they need to build a
          sustainable business.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">The True Cost of Your Time</h3>
          <p className="text-white mb-4">
            Most electricians calculate their day rate by dividing their desired salary by 260
            working days. This is wrong. Here is why:
          </p>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>365 days in a year</strong> minus 104 weekend days = 261 weekdays
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">Minus 25 holiday days = 236 days</span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">Minus 5 sick/personal days = 231 days</span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">Minus 5 training/CPD days = 226 days</span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                Minus 20% non-billable time (quoting, admin, travel, purchasing) ={' '}
                <strong>approximately 180 billable days</strong>
              </span>
            </li>
          </ul>
          <p className="text-white mt-4 font-semibold">
            Your day rate = (target income + all business costs + profit margin) divided by 180
            billable days — not 260.
          </p>
        </div>
        <p>
          For quoted jobs (rather than day-rate work), you need to estimate materials, labour hours,
          overhead contribution, and profit margin for each job. Many electricians price based on
          "what feels right" or what they think the customer will accept. A systematic pricing
          approach — costing materials accurately, estimating labour realistically, adding an
          overhead percentage, and applying a profit margin — consistently produces higher earnings.
          For more detail, see our{' '}
          <SEOInternalLink href="/guides/how-to-price-electrical-jobs">
            pricing guide
          </SEOInternalLink>
          .
        </p>
        <SEOAppBridge
          title="AI Cost Engineer"
          description="Describe the job in plain English and the AI Cost Engineer generates a detailed quote — materials, labour hours, overheads, and profit margin. It uses real UK trade pricing data and practical labour timing intelligence. Stop guessing and start quoting with confidence."
          icon={Brain}
        />
      </>
    ),
  },
  {
    id: 'finding-clients',
    heading: 'Finding Your First Clients',
    content: (
      <>
        <p>
          The fear of not finding work is the biggest barrier to going self-employed. In reality,
          most electricians find that work comes more quickly than expected if they approach it
          systematically. The electrical trade has strong demand — the challenge is making yourself
          visible to clients who need you.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">Client Acquisition Strategies</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Your existing network:</strong> Tell every builder, plumber, decorator,
                estate agent, letting agent, and property manager you know. Leave business cards
                with all of them. Builders alone can fill your diary — most need a reliable
                electrician.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Google Business Profile:</strong> Free to set up. Optimise it with photos of
                your work, your qualifications, and your service area. "Electrician near me"
                searches are dominated by Google local results — this is where many homeowners
                start.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Trade platforms:</strong> Checkatrade, MyBuilder, Bark, Rated People. These
                generate leads for domestic work and help you build reviews. Cost varies
                (£30-£100/month or pay-per-lead).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Local social media:</strong> Facebook community groups, Nextdoor, local
                forums. Many homeowners post trade recommendations requests — being visible and
                responsive wins work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Landlord and letting agent relationships:</strong> Landlords need EICRs
                every 5 years and regular maintenance. One relationship with a letting agency can
                generate dozens of jobs per year.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Word of mouth:</strong> The long-term goal. Every satisfied client tells
                friends and family. Do excellent work, communicate well, be reliable, and the
                referrals will come.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Professional Quoting and Invoicing"
          description="First impressions count. Elec-Mate generates professional, branded quotes and invoices that make you look established and trustworthy. Send them from your phone on site — no going home to type them up. Clients who receive a quote within an hour of your visit are far more likely to accept."
          icon={Receipt}
        />
      </>
    ),
  },
  {
    id: 'tax-and-ni',
    heading: 'Tax, National Insurance, and CIS',
    content: (
      <>
        <p>
          Understanding your tax obligations is essential to avoid nasty surprises. As a
          self-employed electrician, you pay Income Tax and National Insurance on your profits, and
          you may also be subject to CIS deductions if you subcontract for other contractors.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">
            Tax Rates for Sole Traders (2025-26)
          </h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Personal allowance:</strong> £12,570 (no tax on the first £12,570 of profit)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Basic rate:</strong> 20% on profits from £12,571 to £50,270
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Higher rate:</strong> 40% on profits from £50,271 to £125,140
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Class 2 NI:</strong> £3.45/week (flat rate)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Class 4 NI:</strong> 6% on profits between £12,570 and £50,270, plus 2%
                above £50,270
              </span>
            </li>
          </ul>
        </div>
        <p>
          The Self Assessment tax return deadline is 31 January following the end of the tax year
          (which runs 6 April to 5 April). You must also make payments on account — advance payments
          towards next year's tax bill — on 31 January and 31 July. This means you effectively pay
          one and a half years of tax in your first year of Self Assessment, which catches many new
          self-employed electricians off guard. Set aside 25-30% of all income from day one.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">CIS (Construction Industry Scheme)</h3>
          <p className="text-white mb-3">
            If you work as a subcontractor for builders, main contractors, or other electrical
            companies, you will be subject to CIS. The contractor deducts tax at source:
          </p>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Registered subcontractor:</strong> 20% deduction
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Unregistered subcontractor:</strong> 30% deduction (always register to avoid
                this)
              </span>
            </li>
          </ul>
          <p className="text-white mt-3">
            CIS deductions are credited against your Income Tax and NI liability when you file your
            Self Assessment return. If the deductions exceed your tax liability, you receive a
            refund.
          </p>
        </div>
        <SEOAppBridge
          title="Expense Tracking and Tax Estimator"
          description="Track every business expense on your phone as it happens — fuel, materials, tools, insurance, meals. The tax estimator shows your running tax liability so there are no surprises at Self Assessment time. Snap receipts with your camera and they are filed automatically."
          icon={Receipt}
        />
      </>
    ),
  },
  {
    id: 'record-keeping',
    heading: 'Record Keeping for Self-Employed Electricians',
    content: (
      <>
        <p>
          Good record keeping is not optional — HMRC requires you to keep accurate business records,
          and your competent person scheme requires you to maintain records of all electrical work
          carried out. Poor record keeping leads to missed tax deductions (costing you money),
          problems with HMRC investigations, and difficulty defending yourself against claims.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">Records You Must Keep</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Financial records:</strong> All invoices issued, all expenses with receipts,
                bank statements, CIS payment statements, VAT records (if registered). Must be kept
                for 5 years after the Self Assessment deadline.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Electrical certificates:</strong> Copies of every EIC, EICR, Minor Works,
                and EIC for alterations you issue. Your scheme provider requires these, and they
                protect you in the event of a dispute.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Test results:</strong> Full schedule of test results for every installation
                you work on. These form part of the certificate and are your evidence that the
                installation was safe at handover.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Photos:</strong> Before and after photos of your work, particularly for
                rewires, consumer unit upgrades, and any work that will be covered up (chased
                cables, first fix, etc.).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Calibration records:</strong> Your test instruments must be calibrated
                regularly (typically annually). Keep the calibration certificates — they prove your
                test results are reliable.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The key to sustainable record keeping is doing it daily, not letting it pile up. Snap
          receipts on your phone the day you receive them. Send invoices the day you complete the
          job. Record test results digitally on site rather than scribbling on paper and
          transferring later. Elec-Mate's certificate and expense tools are designed for exactly
          this — capturing data on site, on your phone, in real time.
        </p>
        <SEOAppBridge
          title="All Your Business Records in One App"
          description="Certificates, test results, quotes, invoices, expenses, and client records — all stored in one place, synced to the cloud, searchable, and exportable. No more boxes of paper certificates, lost receipts, or searching through emails for test results."
          icon={FileText}
        />
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/guides/electrician-salary-uk',
    title: 'Electrician Salary UK',
    description:
      'Complete salary guide including self-employed earnings, day rates, and regional breakdowns.',
    icon: PoundSterling,
    category: 'Salary Guide',
  },
  {
    href: '/guides/how-to-price-electrical-jobs',
    title: 'How to Price Electrical Jobs',
    description:
      'Pricing methodology for electricians — materials, labour, overheads, and profit margin.',
    icon: Calculator,
    category: 'Business Guide',
  },
  {
    href: '/guides/electrician-tax-guide',
    title: 'Tax Guide for Electricians',
    description: 'Self Assessment, Class 2/4 NI, allowable expenses, and tax-saving strategies.',
    icon: Receipt,
    category: 'Tax Guide',
  },
  {
    href: '/guides/cis-for-electricians',
    title: 'CIS for Electricians',
    description: 'How the Construction Industry Scheme works and how to register.',
    icon: Building2,
    category: 'Tax Guide',
  },
  {
    href: '/guides/electrician-insurance-guide',
    title: 'Insurance Guide',
    description:
      'Public liability, professional indemnity, employers liability, and tool cover explained.',
    icon: ShieldCheck,
    category: 'Business Guide',
  },
  {
    href: '/guides/starting-electrical-business',
    title: 'Starting an Electrical Business',
    description:
      'From sole trader to limited company — setting up and growing your electrical business.',
    icon: Briefcase,
    category: 'Business Guide',
  },
];

export default function ElectricianSelfEmployedPage() {
  return (
    <GuideTemplate
      title="Going Self-Employed as an Electrician UK | Complete Guide"
      description="Complete guide to going self-employed as an electrician in the UK. Sole trader vs limited company, HMRC registration, insurance, competent person schemes, pricing, tax, CIS, finding clients, and record keeping."
      datePublished="2024-05-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Business Guide"
      badgeIcon={Briefcase}
      heroTitle={
        <>
          Going Self-Employed as an Electrician:{' '}
          <span className="text-yellow-400">Everything You Need to Know</span>
        </>
      }
      heroSubtitle="The complete, honest guide to setting up on your own. From registering with HMRC and getting insured to pricing jobs, finding clients, managing tax, and keeping records. Written by electricians who have done it."
      readingTime={24}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Self-Employment"
      relatedPages={relatedPages}
      ctaHeading="Run your business from your phone"
      ctaSubheading="Quoting, invoicing, expense tracking, certificates, calculators, and AI tools — everything a self-employed electrician needs. Start your 7-day free trial."
    />
  );
}
