import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Briefcase,
  PoundSterling,
  Scale,
  ShieldCheck,
  Calculator,
  Building,
  TrendingUp,
  Receipt,
  FileText,
  Users,
  Clock,
  BarChart3,
  AlertTriangle,
  GraduationCap,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Career', href: '/guides/electrician-career-progression' },
  { label: 'Contractor vs Employee', href: '/guides/contractor-vs-employee-electrician' },
];

const tocItems = [
  { id: 'overview', label: 'The Big Decision' },
  { id: 'financial-comparison', label: 'Financial Comparison' },
  { id: 'tax-differences', label: 'Tax Differences' },
  { id: 'ir35-explained', label: 'IR35 Explained' },
  { id: 'cis-explained', label: 'CIS Explained' },
  { id: 'benefits-employment', label: 'Benefits of Employment' },
  { id: 'benefits-contracting', label: 'Benefits of Contracting' },
  { id: 'making-the-switch', label: 'Making the Switch' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Self-employed electricians typically earn 30-60% more gross income than employed equivalents, but take on all business costs, admin, and financial risk themselves.',
  'Employed electricians receive pension contributions, sick pay, holiday pay, and employer NI — benefits worth £5,000 to £12,000 per year on top of salary.',
  'IR35 legislation determines whether a contractor is genuinely self-employed or effectively an employee for tax purposes. Getting it wrong can result in a backdated tax bill.',
  'The Construction Industry Scheme (CIS) applies to most self-employed electricians working for contractors — 20% tax is deducted at source if you are registered.',
  'Elec-Mate business tools make contracting easier: quoting app, invoice app, expense tracking, cash flow planner, and job profitability calculator all in one platform.',
];

const faqs = [
  {
    question: 'Do self-employed electricians earn more than employed ones?',
    answer:
      'In most cases, yes. A self-employed electrician typically earns 30-60% more in gross income than an employed electrician doing similar work in the same area. However, the comparison is not straightforward. The self-employed electrician must pay for their own van, tools, insurance, pension, accountant, and training — costs that an employer covers for an employed electrician. They also have no paid holidays, no sick pay, and no employer pension contributions. When you factor in all costs and benefits, the gap narrows. A fair comparison would be: employed electrician on £40,000 salary with £8,000 in benefits (pension, NI, sick pay, holidays) = £48,000 total package. Self-employed electrician earning £60,000 gross minus £15,000 in business costs = £45,000 net before tax. The self-employed figure can be higher, but it requires discipline, good pricing, and consistent work.',
  },
  {
    question: 'What is IR35 and does it affect electricians?',
    answer:
      'IR35 is tax legislation that prevents workers from disguising employment as self-employment to pay less tax. If HMRC determines that a contractor is really an employee (based on factors like control, substitution, and mutuality of obligation), the contractor must pay income tax and National Insurance as if they were employed. For electricians, IR35 is most relevant when working through a limited company for a single client (especially a large contractor) over an extended period. If the client controls when, where, and how you work, provides your tools, and you cannot send a substitute, HMRC may consider you inside IR35. Since April 2021, medium and large companies are responsible for determining IR35 status for contractors they engage. This has made some contractors more cautious about hiring limited company electricians. Sole traders working under CIS are generally not affected by IR35 in the same way.',
  },
  {
    question: 'Should I be a sole trader or limited company as an electrician?',
    answer:
      'Most electricians start as sole traders because it is simpler — you register with HMRC for Self Assessment, keep records, and file one tax return per year. There is no company to set up, no corporation tax return, and no Companies House paperwork. A limited company becomes more tax-efficient when your profits exceed approximately £40,000 to £50,000 per year, because you can pay yourself a combination of a low salary and dividends, which attracts less National Insurance than drawing all income as a sole trader. However, a limited company has more administration — you need an accountant (£1,000-£2,000 per year), annual accounts, a corporation tax return, and Companies House filings. The right choice depends on your income level, appetite for admin, and future plans. If you intend to grow the business and take on employees, a limited company is usually the better long-term structure.',
  },
  {
    question: 'What is CIS and how does it work for electricians?',
    answer:
      'The Construction Industry Scheme (CIS) is a tax deduction scheme that applies to self-employed workers in the construction industry, including electricians. If you work as a subcontractor for a contractor (or main contractor), the contractor deducts tax from your payments at source — 20% if you are CIS-registered, or 30% if you are not registered. The deductions are credited against your tax liability when you file your Self Assessment return. To register for CIS, you need to contact HMRC. Registration is free and straightforward. You should always register, because the alternative is a 30% deduction rate. CIS applies to labour payments only — materials you supply are not subject to CIS deductions. Your contractor must verify your CIS status with HMRC before making the first payment. They will give you a monthly statement showing gross pay and deductions, which you need for your tax return.',
  },
  {
    question: 'Can I go back to employment after being self-employed?',
    answer:
      'Yes, absolutely. Many electricians move between employment and self-employment throughout their career. There is no restriction on returning to employed work after a period of self-employment. Some electricians contract during busy periods (when day rates are high and work is plentiful) and return to employment during quieter periods (for the security of a regular salary). When returning to employment, your self-employed experience is valuable — you understand business costs, customer management, and pricing, which makes you a better employee. You will need to deregister from CIS if applicable, file a final Self Assessment return covering your self-employed period, and notify HMRC of your change in employment status.',
  },
  {
    question: 'What insurance do I need as a self-employed electrician?',
    answer:
      'At minimum, you need public liability insurance (£1-5 million cover, typically £300-£600 per year), professional indemnity insurance (covers claims arising from your professional advice or certification), employers liability insurance (legally required if you employ anyone, even casually), and tool and van insurance. Many self-employed electricians also carry personal accident insurance (pays out if you are injured and cannot work), legal expenses insurance, and cyber insurance (if you hold client data). The total cost of comprehensive insurance is typically £1,500 to £3,000 per year. This is a non-negotiable business cost — working without adequate insurance is reckless and potentially illegal.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/going-self-employed-electrician',
    title: 'Going Self-Employed',
    description: 'Step-by-step guide to setting up as a self-employed electrician in the UK.',
    icon: Briefcase,
    category: 'Guide',
  },
  {
    href: '/guides/limited-company-electrician',
    title: 'Limited Company Setup',
    description:
      'How to set up a limited company — registration, corporation tax, dividends, and accountants.',
    icon: Building,
    category: 'Guide',
  },
  {
    href: '/guides/electrician-day-rates-uk',
    title: 'Electrician Day Rates UK',
    description: 'What to charge per day as a self-employed electrician across the UK in 2026.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/guides/electrician-salary-uk',
    title: 'Electrician Salary UK 2026',
    description:
      'Full salary data for employed electricians by region, specialism, and experience.',
    icon: BarChart3,
    category: 'Guide',
  },
  {
    href: '/guides/how-to-price-electrical-jobs',
    title: 'How to Price Electrical Jobs',
    description: 'The complete guide to pricing electrical work profitably as a contractor.',
    icon: Calculator,
    category: 'Guide',
  },
  {
    href: '/guides/electrician-career-progression',
    title: 'Career Progression',
    description: 'Every stage of the electrician career ladder from apprentice to MD.',
    icon: TrendingUp,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'The Big Decision: Contractor or Employee?',
    content: (
      <>
        <p>
          At some point in every electrician career, the question comes up: should I stay employed
          or go self-employed? It is one of the biggest financial decisions you will make, and the
          right answer depends on your circumstances, personality, and goals.
        </p>
        <p>
          There is no universally correct answer. Employment offers security, structure, and
          benefits. Contracting offers higher income, freedom, and control. Many electricians try
          both during their career, and some move back and forth depending on market conditions and
          personal circumstances.
        </p>
        <p>
          This guide breaks down the financial, tax, and lifestyle differences between contracting
          and employment so you can make an informed decision. If you have already decided to go{' '}
          <SEOInternalLink href="/guides/going-self-employed-electrician">
            self-employed
          </SEOInternalLink>
          , this guide will help you understand the financial implications.
        </p>
      </>
    ),
  },
  {
    id: 'financial-comparison',
    heading: 'Financial Comparison: Real Numbers',
    content: (
      <>
        <p>
          Let us compare two electricians doing similar work in the same area — one employed, one
          self-employed. This is a realistic example for a qualified electrician with 5 years of
          experience working in the Midlands:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Employed Electrician</h3>
            <ul className="space-y-2 text-white text-sm">
              <li className="flex justify-between">
                <span>Gross salary</span>
                <span className="font-semibold">£40,000</span>
              </li>
              <li className="flex justify-between">
                <span>Employer pension (5%)</span>
                <span className="font-semibold">+£2,000</span>
              </li>
              <li className="flex justify-between">
                <span>Employer NI contributions</span>
                <span className="font-semibold">+£4,300</span>
              </li>
              <li className="flex justify-between">
                <span>28 days paid holiday</span>
                <span className="font-semibold">+£4,300</span>
              </li>
              <li className="flex justify-between">
                <span>Sick pay, training, PPE</span>
                <span className="font-semibold">+£2,000</span>
              </li>
              <li className="flex justify-between border-t border-white/10 pt-2 mt-2">
                <span className="font-bold">Total package value</span>
                <span className="font-bold text-yellow-400">£52,600</span>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Self-Employed Electrician</h3>
            <ul className="space-y-2 text-white text-sm">
              <li className="flex justify-between">
                <span>Gross income (210 days x £280)</span>
                <span className="font-semibold">£58,800</span>
              </li>
              <li className="flex justify-between">
                <span>Van costs</span>
                <span className="font-semibold">-£6,000</span>
              </li>
              <li className="flex justify-between">
                <span>Insurance</span>
                <span className="font-semibold">-£2,000</span>
              </li>
              <li className="flex justify-between">
                <span>Tools, PPE, workwear</span>
                <span className="font-semibold">-£1,500</span>
              </li>
              <li className="flex justify-between">
                <span>Accountant, scheme, phone, other</span>
                <span className="font-semibold">-£4,000</span>
              </li>
              <li className="flex justify-between border-t border-white/10 pt-2 mt-2">
                <span className="font-bold">Net before tax</span>
                <span className="font-bold text-yellow-400">£45,300</span>
              </li>
            </ul>
          </div>
        </div>
        <p>
          In this example, the self-employed electrician earns £45,300 before tax, compared to
          £40,000 salary for the employed electrician. But the employed electrician total package
          (including employer contributions, holidays, and benefits) is £52,600. The self-employed
          electrician also has no paid holidays, no sick pay, and bears all the business risk.
        </p>
        <p>
          The financial advantage of self-employment becomes clearer at higher{' '}
          <SEOInternalLink href="/guides/electrician-day-rates-uk">day rates</SEOInternalLink>. At
          £350 per day, the self-employed electrician gross income rises to £73,500 — a much larger
          gap over the employed equivalent.
        </p>
      </>
    ),
  },
  {
    id: 'tax-differences',
    heading: 'Tax Differences: Employment vs Self-Employment',
    content: (
      <>
        <p>
          The tax treatment is fundamentally different for employees and self-employed workers. Here
          is how it works:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Employed</h3>
            <ul className="space-y-3 text-white text-sm leading-relaxed">
              <li>
                <strong>Income tax:</strong> Deducted at source via PAYE. You receive your net pay
                with tax already taken.
              </li>
              <li>
                <strong>National Insurance:</strong> Class 1 NI deducted from your pay (8% on
                earnings between £12,570 and £50,270, 2% above that). Your employer also pays
                employer NI (13.8%).
              </li>
              <li>
                <strong>No Self Assessment needed</strong> unless you have other income.
              </li>
            </ul>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Self-Employed (Sole Trader)</h3>
            <ul className="space-y-3 text-white text-sm leading-relaxed">
              <li>
                <strong>Income tax:</strong> Paid via Self Assessment. You file a tax return by 31
                January each year and pay tax on your profits.
              </li>
              <li>
                <strong>National Insurance:</strong> Class 2 NI (flat rate, approximately
                £3.45/week) plus Class 4 NI (6% on profits between £12,570 and £50,270, 2% above
                that).
              </li>
              <li>
                <strong>You can deduct business expenses</strong> — van, tools, insurance, fuel,
                phone, workwear — reducing your taxable profit.
              </li>
            </ul>
          </div>
        </div>
        <p>
          The ability to deduct business expenses is a significant advantage of self-employment. An
          employed electrician earning £40,000 pays tax on the full £40,000 (minus the personal
          allowance). A self-employed electrician earning £58,000 gross but spending £13,000 on
          legitimate business expenses pays tax on £45,000 — a lower taxable income.
        </p>
        <p>
          If you set up as a{' '}
          <SEOInternalLink href="/guides/limited-company-electrician">
            limited company
          </SEOInternalLink>
          , the tax treatment changes again. Corporation tax is paid on company profits (currently
          19-25%), and you extract income via a combination of salary and dividends. This structure
          can save significant tax at higher income levels.
        </p>
      </>
    ),
  },
  {
    id: 'ir35-explained',
    heading: 'IR35: What Electricians Need to Know',
    content: (
      <>
        <p>
          IR35 is one of the most misunderstood pieces of tax legislation in the UK. It targets
          "disguised employment" — situations where a worker operates through a limited company or
          as a sole trader but is effectively an employee of a single client.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Key IR35 Indicators</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Control:</strong> Does the client control when, where, and how you work? If
                yes, this points toward employment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Substitution:</strong> Can you send a substitute to do the work in your
                place? If you personally must do the work, this points toward employment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mutuality of obligation:</strong> Is the client obliged to offer you work
                and are you obliged to accept it? If yes, this points toward employment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Financial risk:</strong> Do you bear financial risk (e.g. fixing mistakes at
                your own cost, providing your own tools)? If you do, this points toward
                self-employment.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Since April 2021, medium and large clients are responsible for determining whether IR35
          applies to a contract. If the client determines you are inside IR35, they must deduct
          income tax and employee NI from your payments, effectively treating you as an employee for
          tax purposes. This significantly reduces the tax advantages of operating through a limited
          company.
        </p>
        <p>
          Most sole trader electricians working on CIS are not directly affected by IR35. It
          primarily affects limited company contractors working for a single large client. However,
          all self-employed electricians should understand IR35 and ensure their working
          arrangements genuinely reflect self-employment.
        </p>
      </>
    ),
  },
  {
    id: 'cis-explained',
    heading: 'CIS: The Construction Industry Scheme',
    content: (
      <>
        <p>
          The Construction Industry Scheme (CIS) applies to most self-employed electricians working
          as subcontractors in the construction industry. Under CIS, the contractor (the company
          paying you) deducts tax from your labour payments at source:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Registered subcontractor:</strong> 20% deducted from labour payments. This
                is the standard rate for most electricians.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Unregistered subcontractor:</strong> 30% deducted. Always register — there
                is no reason to pay 30% when you can pay 20%.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Gross payment status:</strong> 0% deducted. Available after 12 months of
                trading with a clean compliance record. Your accountant can apply for this.
              </span>
            </li>
          </ul>
        </div>
        <p>
          CIS deductions are not an additional tax — they are advance payments toward your total tax
          liability. When you file your Self Assessment return, the CIS deductions are credited
          against your income tax and NI bill. If you have been overcharged (because your expenses
          reduce your taxable profit below the amount implied by 20% flat deductions), you will
          receive a refund from HMRC.
        </p>
        <p>
          Keep your CIS statements from every contractor. You need these for your Self Assessment
          return. Elec-Mate expense tracking helps you keep all financial records organised and
          accessible.
        </p>
      </>
    ),
  },
  {
    id: 'benefits-employment',
    heading: 'Benefits of Employment',
    content: (
      <>
        <p>
          Employment offers genuine advantages that are often undervalued by electricians keen to go
          self-employed. Before you make the switch, consider what you are giving up:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Guaranteed income.</strong> Your salary arrives every month regardless of
                weather, client cancellations, or market conditions. You do not need to find work —
                your employer does that.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Paid holidays.</strong> 28 days paid leave per year (including bank
                holidays). As a self-employed electrician, every day off is a day without income.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Employer pension contributions.</strong> Your employer contributes at least
                3% of qualifying earnings to your pension — free money that compounds over decades.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sick pay.</strong> Statutory sick pay plus any employer sick pay scheme. If
                you are self-employed and break your wrist, your income drops to zero.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>No admin.</strong> No invoicing, no chasing payments, no tax returns, no
                bookkeeping, no insurance admin. You turn up, do the work, and go home.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Employment is particularly attractive for electricians with young families, mortgages, or
          a preference for work-life separation. There is nothing wrong with choosing employment
          over self-employment — it is a valid, well-paid career path.
        </p>
      </>
    ),
  },
  {
    id: 'benefits-contracting',
    heading: 'Benefits of Contracting',
    content: (
      <>
        <p>
          Self-employment offers a different set of advantages — higher income potential, more
          freedom, and the opportunity to build something of your own:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Higher earning potential.</strong> Self-employed electricians typically earn
                30-60% more gross income. At{' '}
                <SEOInternalLink href="/guides/electrician-day-rates-uk">
                  current day rates
                </SEOInternalLink>
                , a busy self-employed electrician can earn £55,000 to £85,000 per year.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tax efficiency.</strong> You can deduct all legitimate business expenses
                from your taxable income, reducing your tax bill. A limited company structure offers
                further tax advantages.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Freedom and control.</strong> Choose your own hours, clients, and types of
                work. Take time off when you want. Work harder during busy periods and ease off when
                you choose.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building business value.</strong> A self-employed business with a client
                base, reputation, and systems has value that can be sold or grown. An employed
                position has no transferable value.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Variety.</strong> You choose the work you take on. Specialise in what you
                enjoy, turn down jobs you do not want, and build a business around your strengths.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Everything you need to run your contracting business"
          description="Quoting app, invoice app, expense tracking, cash flow planner, and job profitability calculator. Elec-Mate handles the business side so you can focus on the electrical work. 7-day free trial."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'making-the-switch',
    heading: 'Making the Switch: From Employee to Contractor',
    content: (
      <>
        <p>
          If you have decided to go self-employed, do not jump in unprepared. The transition is
          smoother if you plan ahead:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Save 3 to 6 months of expenses.</strong> You need a financial buffer for the
                transition period when work may be inconsistent and startup costs are high.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Get your qualifications and registrations in order.</strong> Competent
                person scheme (NICEIC, NAPIT), ECS card, insurance, and all relevant qualifications
                should be arranged before you leave employment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Build a network.</strong> Start building relationships with potential
                clients, contractors, builders, and other tradespeople while you are still employed.
                Word of mouth is the primary source of work for most self-employed electricians.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Set up your business systems.</strong> Accounting software, quoting and
                invoicing tools, expense tracking, and a professional online presence.{' '}
                <SEOInternalLink href="/guides/starting-electrical-business">
                  Elec-Mate provides all the business tools
                </SEOInternalLink>{' '}
                you need in one app.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Find a good accountant.</strong> An accountant who specialises in
                construction or trades will save you more in tax than they cost in fees. Get one
                before you start, not after your first year.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Set up your business the right way from day one"
          description="Elec-Mate gives you professional quoting, instant invoicing, expense tracking, and cash flow visibility — all from your phone. Start looking professional from your very first job. 7-day free trial."
          icon={Receipt}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ContractorVsEmployeePage() {
  return (
    <GuideTemplate
      title="Contractor vs Employee | Which Is Better for Electricians?"
      description="Complete comparison of self-employed contractor versus employed electrician. Tax differences, IR35, CIS, financial comparison, benefits, job security vs freedom, and how to make the switch."
      datePublished="2025-07-10"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Career Guide"
      badgeIcon={Scale}
      heroTitle={
        <>
          Contractor vs Employee:{' '}
          <span className="text-yellow-400">Which Is Better for Electricians?</span>
        </>
      }
      heroSubtitle="Should you stay employed on a steady salary or go self-employed for higher earnings and more freedom? This guide compares the financial reality, tax implications, and lifestyle trade-offs of each path — so you can make the right decision for your career."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Contractor vs Employee"
      relatedPages={relatedPages}
      ctaHeading="Run Your Contracting Business with Elec-Mate"
      ctaSubheading="Quoting, invoicing, expense tracking, cash flow planning, and job profitability — all in one app built for self-employed electricians. 7-day free trial, cancel anytime."
    />
  );
}
