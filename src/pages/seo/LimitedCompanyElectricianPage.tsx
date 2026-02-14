import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Building,
  PoundSterling,
  Calculator,
  FileText,
  ShieldCheck,
  Briefcase,
  TrendingUp,
  Receipt,
  BarChart3,
  Scale,
  Users,
  Clock,
  AlertTriangle,
  GraduationCap,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Career', href: '/guides/electrician-career-progression' },
  { label: 'Limited Company', href: '/guides/limited-company-electrician' },
];

const tocItems = [
  { id: 'why-limited', label: 'Why Go Limited?' },
  { id: 'ltd-vs-sole-trader', label: 'Ltd vs Sole Trader' },
  { id: 'setting-up', label: 'Setting Up a Limited Company' },
  { id: 'corporation-tax', label: 'Corporation Tax' },
  { id: 'salary-and-dividends', label: 'Salary and Dividends' },
  { id: 'choosing-accountant', label: 'Choosing an Accountant' },
  { id: 'running-costs', label: 'Running Costs' },
  { id: 'common-mistakes', label: 'Common Mistakes' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A limited company becomes more tax-efficient than sole trader status once your annual profits exceed approximately £40,000 to £50,000.',
  'Setting up a limited company costs as little as £12 through Companies House, but you will need an accountant (£1,000 to £2,500 per year) to manage accounts and tax returns.',
  'The most tax-efficient way to extract income is a low salary (around the NI threshold) plus dividends from remaining profits.',
  'Corporation tax is currently 19% on profits up to £50,000 and 25% on profits over £250,000, with marginal relief between these thresholds.',
  'Elec-Mate business tools — quoting app, invoice app, expense tracking, and cash flow planner — help limited company electricians keep financial records organised and make quarterly VAT returns painless.',
];

const faqs = [
  {
    question: 'When should an electrician set up a limited company?',
    answer:
      'The general rule is that a limited company becomes more tax-efficient when your annual profits consistently exceed £40,000 to £50,000. Below this threshold, the additional costs and administration of a limited company (accountant fees, annual accounts, corporation tax return, Companies House filings) often outweigh the tax savings. However, the decision is not purely about tax. A limited company also provides limited liability protection (your personal assets are separate from business debts), a more professional image (some commercial clients prefer to work with limited companies), and a structure that supports growth (easier to take on employees, secure contracts, and eventually sell the business). If you are a sole trader earning under £40,000, stay as you are. If you are earning over £50,000, a limited company is almost certainly worth it. Between £40,000 and £50,000, ask your accountant to run the numbers.',
  },
  {
    question: 'How much does it cost to set up a limited company?',
    answer:
      'Setting up a limited company through Companies House costs £12 for online registration and £40 for postal registration. The process takes 24 to 48 hours online. You will need a company name (which must be unique), a registered office address (can be your home address or your accountant address), at least one director (you), and confirmation of shares (a standard setup is 100 ordinary shares of £1 each). Many accountants offer a company formation service as part of their annual fee. The initial setup cost is minimal — the ongoing costs are where the real expense lies: accountant fees (£1,000-£2,500/year), corporation tax return filing, annual confirmation statement (£13/year), and potentially payroll software and VAT return filing.',
  },
  {
    question: 'What is the most tax-efficient salary for a limited company electrician?',
    answer:
      'The most tax-efficient salary for a limited company director in the 2025/26 tax year is typically set at or just below the NI primary threshold — approximately £12,570 per year (£1,047.50 per month). At this level, you earn enough to qualify for a full National Insurance record (protecting your state pension entitlement) but pay no income tax (it falls within the personal allowance) and no employee NI. Above this salary, you start paying both employee NI and employer NI, which is less tax-efficient than taking additional income as dividends. Your accountant will confirm the optimal salary for your specific circumstances, as the thresholds change annually.',
  },
  {
    question: 'How do dividends work for a limited company electrician?',
    answer:
      'After paying corporation tax on your company profits, the remaining money can be distributed as dividends to shareholders (you). Dividends are taxed differently from salary: there is a £1,000 dividend allowance (2025/26), after which you pay 8.75% basic rate, 33.75% higher rate, or 39.35% additional rate on dividends. Crucially, dividends do not attract National Insurance contributions — this is the main tax advantage of a limited company. For example, a sole trader earning £60,000 profit pays income tax and Class 4 NI on the full amount. A limited company director takes a £12,570 salary (tax-free, minimal NI) and £47,430 as dividends. Corporation tax at 19% on the profit reduces it, but the combined tax bill is typically £3,000 to £5,000 lower than the sole trader equivalent. Your accountant will calculate the optimal salary/dividend split for your income level.',
  },
  {
    question: 'Do I need to register for VAT as a limited company electrician?',
    answer:
      'You must register for VAT if your taxable turnover exceeds £90,000 in any 12-month period (2025/26 threshold). You can also voluntarily register below this threshold if your clients are VAT-registered businesses (they can reclaim the VAT you charge, so it makes no difference to them). If most of your clients are domestic homeowners, VAT registration below the threshold is usually disadvantageous because you would need to add 20% to your prices (homeowners cannot reclaim VAT) or absorb the 20% yourself. Once registered, you must charge VAT on all your invoices, submit quarterly VAT returns, and pay the VAT you have collected to HMRC (minus any VAT you have paid on business purchases). The Flat Rate Scheme can simplify VAT for small businesses — your accountant can advise whether it is beneficial for your situation.',
  },
  {
    question: 'Can I switch from sole trader to limited company?',
    answer:
      'Yes, and it is a common transition for electricians whose earnings have grown. The process involves: setting up the limited company through Companies House, opening a business bank account in the company name, transferring your business activity to the limited company (new contracts and invoices should be in the company name), notifying HMRC that you are ceasing self-employment and filing a final Self Assessment return, notifying your competent person scheme (NICEIC, NAPIT) of the change of trading entity, updating your insurance policies to the company name, and informing customers and contractors of the change. Your accountant should manage the transition to ensure there are no tax complications. The key timing consideration is the tax year — it is cleanest to switch at the start of a new tax year (6 April). Your NICEIC or NAPIT registration will need to be transferred to the limited company, which may involve a new assessment.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/going-self-employed-electrician',
    title: 'Going Self-Employed',
    description:
      'Step-by-step guide to setting up as a self-employed electrician, including sole trader setup.',
    icon: Briefcase,
    category: 'Guide',
  },
  {
    href: '/guides/contractor-vs-employee-electrician',
    title: 'Contractor vs Employee',
    description:
      'Full financial comparison of self-employed contractor versus employed electrician.',
    icon: Scale,
    category: 'Guide',
  },
  {
    href: '/guides/electrician-day-rates-uk',
    title: 'Electrician Day Rates UK',
    description: 'What to charge per day as a self-employed or limited company electrician.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/guides/how-to-price-electrical-jobs',
    title: 'How to Price Electrical Jobs',
    description: 'Pricing strategies for domestic and commercial electrical work.',
    icon: Calculator,
    category: 'Guide',
  },
  {
    href: '/guides/electrician-career-progression',
    title: 'Career Progression',
    description: 'Every stage of the electrician career ladder from apprentice to business owner.',
    icon: TrendingUp,
    category: 'Guide',
  },
  {
    href: '/tools/cash-flow-planner',
    title: 'Cash Flow Planner',
    description: 'Track income, expenses, tax reserves, and cash flow forecasts from your phone.',
    icon: BarChart3,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'why-limited',
    heading: 'Why Set Up a Limited Company as an Electrician?',
    content: (
      <>
        <p>
          A limited company is a separate legal entity from you. It has its own bank account, files
          its own tax returns, and is liable for its own debts. This is fundamentally different from
          being a sole trader, where you and the business are legally the same person.
        </p>
        <p>Electricians set up limited companies for three main reasons:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tax efficiency.</strong> A limited company pays corporation tax on its
                profits (19-25%), and you extract income via a combination of salary and dividends.
                This structure typically saves £3,000 to £8,000 per year in tax compared to sole
                trader status at profit levels above £50,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Limited liability.</strong> If something goes wrong — a client does not pay
                a large invoice, a liability claim exceeds your insurance cover, or the business
                runs into financial difficulty — your personal assets (home, car, savings) are
                protected. As a sole trader, your personal assets are at risk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Professional image.</strong> Some commercial clients, main contractors, and
                housing associations prefer to work with limited companies. Having "Ltd" after your
                name signals permanence and professionalism.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If you are a{' '}
          <SEOInternalLink href="/guides/going-self-employed-electrician">
            self-employed electrician
          </SEOInternalLink>{' '}
          earning over £50,000 per year and still operating as a sole trader, you are almost
          certainly paying more tax than you need to. Speak to an accountant about whether a limited
          company is right for you.
        </p>
      </>
    ),
  },
  {
    id: 'ltd-vs-sole-trader',
    heading: 'Limited Company vs Sole Trader: The Full Comparison',
    content: (
      <>
        <p>
          This is the decision every growing electrician faces. Here is a comprehensive comparison:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Sole Trader</h3>
            <ul className="space-y-2 text-white text-sm leading-relaxed">
              <li>
                <strong>Setup:</strong> Register with HMRC for Self Assessment. Free. Takes 10
                minutes.
              </li>
              <li>
                <strong>Tax:</strong> Income tax and Class 2/4 NI on all profits. Paid via Self
                Assessment.
              </li>
              <li>
                <strong>Admin:</strong> One tax return per year. Simple bookkeeping. Many sole
                traders manage their own accounts.
              </li>
              <li>
                <strong>Liability:</strong> Unlimited. Your personal assets are at risk.
              </li>
              <li>
                <strong>Accountant cost:</strong> £250 to £600 per year (optional but recommended).
              </li>
              <li>
                <strong>Best for:</strong> Earnings under £40,000. Simple setup. Minimum admin.
              </li>
            </ul>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Limited Company</h3>
            <ul className="space-y-2 text-white text-sm leading-relaxed">
              <li>
                <strong>Setup:</strong> Register with Companies House (£12 online). Open a business
                bank account.
              </li>
              <li>
                <strong>Tax:</strong> Corporation tax on company profits. Income tax and NI on your
                salary. Dividend tax on dividends.
              </li>
              <li>
                <strong>Admin:</strong> Annual accounts, corporation tax return, confirmation
                statement, payroll, VAT returns (if registered). Accountant is essential.
              </li>
              <li>
                <strong>Liability:</strong> Limited to company assets. Personal assets protected.
              </li>
              <li>
                <strong>Accountant cost:</strong> £1,000 to £2,500 per year (essential).
              </li>
              <li>
                <strong>Best for:</strong> Earnings over £50,000. Growth plans. Commercial work.
              </li>
            </ul>
          </div>
        </div>
        <p>
          The crossover point — where a limited company saves you money compared to sole trader — is
          approximately £40,000 to £50,000 annual profit. Below this, the accountant fees and
          additional admin eat into any tax savings. Above this, the savings grow with your income.
          At £60,000 profit, a limited company typically saves £4,000 to £6,000 per year in tax. At
          £80,000, the saving can exceed £8,000.
        </p>
      </>
    ),
  },
  {
    id: 'setting-up',
    heading: 'Setting Up a Limited Company: Step by Step',
    content: (
      <>
        <p>Setting up a limited company is straightforward. Here is the process:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Choose a company name.</strong> It must be unique — check availability on the
              Companies House website. Most electricians use their name plus "Electrical" or
              "Electrical Services" — for example, "Smith Electrical Services Ltd". Avoid names that
              are too similar to existing companies.
            </li>
            <li>
              <strong>Register with Companies House.</strong> Online registration costs £12 and
              takes 24 to 48 hours. You will need: company name, registered office address (can be
              your home), director details (at least one director — you), shareholder details (you
              will own 100% of shares), SIC code (43210 — Electrical installation).
            </li>
            <li>
              <strong>Open a business bank account.</strong> You must keep company finances
              completely separate from your personal finances. Most banks offer free or low-cost
              business accounts for new companies. Starling, Tide, and Mettle are popular digital
              options with quick setup.
            </li>
            <li>
              <strong>Register for corporation tax.</strong> HMRC will send you a letter after
              Companies House registration. You must register for corporation tax within 3 months of
              starting to trade.
            </li>
            <li>
              <strong>Set up payroll.</strong> Even if you are the only employee, you need to set up
              PAYE to pay yourself a salary. Your accountant will typically handle this.
            </li>
            <li>
              <strong>Consider VAT registration.</strong> Mandatory if turnover exceeds £90,000.
              Optional below this — your accountant will advise.
            </li>
          </ol>
        </div>
        <p>
          The entire setup process can be completed in a week. Most of the time is spent waiting for
          Companies House and HMRC to process your applications. Your accountant can handle the
          entire process for you if you prefer — many include company formation in their annual fee.
        </p>
      </>
    ),
  },
  {
    id: 'corporation-tax',
    heading: 'Corporation Tax: What You Will Pay',
    content: (
      <>
        <p>
          Corporation tax is the tax your limited company pays on its profits. The current rates
          (2025/26) are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Small profits rate:</strong> 19% on profits up to £50,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Main rate:</strong> 25% on profits over £250,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Marginal relief:</strong> Profits between £50,000 and £250,000 are taxed at
                an effective rate between 19% and 25%, calculated using marginal relief.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For most electrician limited companies, profits fall within the small profits band (under
          £50,000), so the effective rate is 19%. This is significantly lower than the combined
          income tax and NI rate that a sole trader would pay on the same profits.
        </p>
        <p>
          Corporation tax is paid 9 months and 1 day after the end of your company financial year.
          This means you have time to save for the tax bill — but you must actually save it. One of
          the most common mistakes new limited company owners make is spending money that should be
          set aside for corporation tax. Use Elec-Mate{' '}
          <SEOInternalLink href="/tools/cash-flow-planner">cash flow planner</SEOInternalLink> to
          track your tax reserves.
        </p>
      </>
    ),
  },
  {
    id: 'salary-and-dividends',
    heading: 'Salary and Dividends: The Tax-Efficient Way to Pay Yourself',
    content: (
      <>
        <p>
          As a limited company director, you do not simply take money out of the company whenever
          you want. Income is extracted via two main routes: salary and dividends. The tax-efficient
          strategy is to take a low salary and make up the rest in dividends.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Optimal Extraction Strategy 2025/26</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Salary:</strong> £12,570 per year (the personal allowance). This is tax-free
                and keeps your NI record up to date. Your company deducts this as an expense,
                reducing its corporation tax bill.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dividends:</strong> Paid from post-tax profits. The first £1,000 is tax-free
                (dividend allowance). Dividends above this are taxed at 8.75% (basic rate), 33.75%
                (higher rate), or 39.35% (additional rate).
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Worked Example: £60,000 Profit</h3>
          <ul className="space-y-2 text-white text-sm">
            <li className="flex justify-between">
              <span>Company profit before salary</span>
              <span className="font-semibold">£60,000</span>
            </li>
            <li className="flex justify-between">
              <span>Director salary</span>
              <span className="font-semibold">-£12,570</span>
            </li>
            <li className="flex justify-between">
              <span>Employer NI on salary</span>
              <span className="font-semibold">-£0 (below threshold)</span>
            </li>
            <li className="flex justify-between">
              <span>Taxable company profit</span>
              <span className="font-semibold">£47,430</span>
            </li>
            <li className="flex justify-between">
              <span>Corporation tax at 19%</span>
              <span className="font-semibold">-£9,012</span>
            </li>
            <li className="flex justify-between">
              <span>Available for dividends</span>
              <span className="font-semibold">£38,418</span>
            </li>
            <li className="flex justify-between">
              <span>Dividend tax (8.75% on £37,418)</span>
              <span className="font-semibold">-£3,274</span>
            </li>
            <li className="flex justify-between border-t border-white/10 pt-2 mt-2">
              <span className="font-bold">Total tax paid</span>
              <span className="font-bold text-yellow-400">£12,286</span>
            </li>
            <li className="flex justify-between">
              <span className="font-bold">Take-home (salary + dividends)</span>
              <span className="font-bold text-yellow-400">£47,714</span>
            </li>
          </ul>
        </div>
        <p>
          Compare this to a sole trader on the same £60,000 profit: income tax of approximately
          £9,432 plus Class 4 NI of approximately £3,432 plus Class 2 NI of approximately £180 =
          total tax of approximately £13,044. The limited company saves approximately £758 in this
          example. The savings increase significantly at higher profit levels — at £80,000 profit,
          the limited company saving is typically £3,000 to £5,000.
        </p>
      </>
    ),
  },
  {
    id: 'choosing-accountant',
    heading: 'Choosing an Accountant: What to Look For',
    content: (
      <>
        <p>
          A good accountant is essential for a limited company electrician. They will save you more
          in tax than they cost in fees — but only if you choose the right one. Here is what to look
          for:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Construction or trades experience.</strong> An accountant who understands
                CIS, the VAT flat rate scheme for trades, capital allowances on tools and vans, and
                the specific tax rules for the construction industry will add more value than a
                generalist.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fixed fees.</strong> Always agree a fixed annual fee upfront. This should
                include: annual accounts, corporation tax return, personal Self Assessment return,
                payroll processing, Companies House filings, and ad-hoc tax advice.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cloud accounting.</strong> A modern accountant will use cloud software
                (Xero, FreeAgent, or QuickBooks) so you can see your financial position in real time
                and share data easily.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Proactive tax planning.</strong> A good accountant does not just file your
                returns — they actively advise on how to minimise your tax bill, when to declare
                dividends, and how to structure your finances for maximum efficiency.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Responsive communication.</strong> You need an accountant who answers
                questions promptly — not one who takes 3 weeks to respond to an email. Ask about
                their typical response time before signing up.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Expect to pay £1,000 to £2,500 per year for a good accountant for a one-person limited
          company. This is a legitimate business expense that reduces your corporation tax bill. The
          accountant fee pays for itself many times over through tax savings, compliance, and peace
          of mind.
        </p>
      </>
    ),
  },
  {
    id: 'running-costs',
    heading: 'Running Costs of a Limited Company',
    content: (
      <>
        <p>
          A limited company has ongoing costs beyond what a sole trader faces. Budget for these when
          deciding whether to go limited:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Accountant fees:</strong> £1,000 to £2,500 per year. This is your biggest
                additional cost and is non-negotiable — you cannot realistically run a limited
                company without an accountant.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Companies House confirmation statement:</strong> £13 per year.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Business bank account:</strong> £0 to £15 per month depending on the
                provider. Some offer free accounts for small businesses.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Accounting software:</strong> £10 to £30 per month for Xero, FreeAgent, or
                QuickBooks. Often included in your accountant fee.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insurance:</strong> Similar to sole trader but policies must be in the
                company name. Employers liability insurance is legally required even if you are the
                only employee/director.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Total additional running costs for a limited company (compared to sole trader) are
          approximately £1,500 to £3,000 per year. If your tax savings exceed this amount, a limited
          company is financially worthwhile. At £60,000 profit, your net tax saving after accountant
          fees is typically £0 to £1,000. At £80,000 profit, it is typically £3,000 to £5,000. The
          higher your profits, the stronger the case for going limited.
        </p>
        <SEOAppBridge
          title="Track every business expense from your phone"
          description="Elec-Mate expense tracking lets you photograph receipts, categorise expenses, and export data for your accountant. Keep your limited company records organised without the paperwork. 7-day free trial."
          icon={Receipt}
        />
      </>
    ),
  },
  {
    id: 'common-mistakes',
    heading: 'Common Mistakes Limited Company Electricians Make',
    content: (
      <>
        <p>
          Running a limited company gives you more control over your finances, but it also creates
          more opportunities for expensive mistakes:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mixing personal and business finances.</strong> This is the most common
                mistake. Every penny in and out of the company must go through the business bank
                account. Using the company account for personal purchases, or paying business
                expenses from your personal account, creates a mess for your accountant and can
                trigger HMRC scrutiny.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Spending the corporation tax reserve.</strong> Corporation tax is due 9
                months after your year end. If you have spent the money, you will have a cash flow
                crisis. Set aside 20-25% of every payment you receive in a separate savings account
                for tax.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Taking too much salary.</strong> Taking a high salary defeats the purpose of
                a limited company. Your salary should be at or near the NI threshold — not your full
                desired income. The rest comes as dividends.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Declaring dividends without sufficient profit.</strong> You can only pay
                dividends from retained profits. If the company does not have sufficient profits,
                the dividend is illegal and must be repaid. Your accountant should confirm the
                available profit before each dividend declaration.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Not keeping receipts and records.</strong> HMRC can investigate your company
                up to 6 years back. Every expense needs a receipt or invoice. Elec-Mate expense
                tracking makes this easy — photograph receipts on your phone and they are stored
                digitally.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Cash flow planner built for electricians"
          description="Elec-Mate cash flow planner tracks your income, expenses, tax reserves, and profit in real time. See exactly where your money is going and never be surprised by a tax bill. 7-day free trial."
          icon={BarChart3}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function LimitedCompanyElectricianPage() {
  return (
    <GuideTemplate
      title="Limited Company for Electricians | Setup Guide UK"
      description="Complete guide to setting up a limited company as an electrician in the UK. Ltd vs sole trader comparison, Companies House registration, corporation tax, salary and dividends, accountant selection, and common mistakes."
      datePublished="2025-08-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Business Guide"
      badgeIcon={Building}
      heroTitle={
        <>
          Limited Company for Electricians:{' '}
          <span className="text-yellow-400">The Complete Setup Guide</span>
        </>
      }
      heroSubtitle="Should you set up a limited company? How does it save tax? What does it cost to run? This guide covers everything — from sole trader vs ltd comparison to company formation, corporation tax, salary and dividend strategy, choosing an accountant, and the mistakes to avoid."
      readingTime={15}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Limited Companies for Electricians"
      relatedPages={relatedPages}
      ctaHeading="Manage Your Limited Company with Elec-Mate"
      ctaSubheading="Quoting, invoicing, expense tracking, cash flow planning, and job profitability — all in one app built for electricians running their own business. 7-day free trial, cancel anytime."
    />
  );
}
