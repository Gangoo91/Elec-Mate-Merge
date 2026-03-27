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
  Shield,
  Building2,
  Scale,
  FileText,
  AlertTriangle,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Business', href: '/guides/how-to-get-first-electrical-customer' },
  { label: 'Business Structure', href: '/guides/partnership-vs-sole-trader-vs-ltd-electrician' },
];

const tocItems = [
  { id: 'overview', label: 'Choosing Your Business Structure' },
  { id: 'sole-trader', label: 'Sole Trader' },
  { id: 'partnership', label: 'Partnership' },
  { id: 'limited-company', label: 'Limited Company (Ltd)' },
  { id: 'tax-comparison', label: 'Tax Comparison' },
  { id: 'liability', label: 'Liability and Risk' },
  { id: 'admin-burden', label: 'Admin Burden and Costs' },
  { id: 'when-to-incorporate', label: 'When to Incorporate' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Most electricians should start as sole traders. It is the simplest, cheapest, and fastest way to set up. You can always incorporate later if your profits justify it.',
  'A limited company becomes tax-efficient when your annual profits consistently exceed £40,000 to £50,000. Below that level, the additional accountancy costs and admin often outweigh the tax saving.',
  'Partnerships (including LLPs) are useful when two or more electricians want to run a business together. An ordinary partnership offers no liability protection — each partner is personally liable for ALL partnership debts. An LLP provides limited liability but has more admin.',
  'The biggest difference between sole trader and Ltd is liability. As a sole trader, you are personally liable for all business debts — your house, car, and savings are at risk. A limited company separates your personal assets from business liabilities (with exceptions for personal guarantees and fraud).',
  'IR35 does not apply to electricians working for their own domestic and commercial customers. It only applies if you work through a limited company and provide services to a client in a way that resembles employment. If you run a genuine independent electrical business, IR35 is not a concern.',
];

const faqs = [
  {
    question: 'Should I start as a sole trader or limited company?',
    answer:
      'Start as a sole trader unless you have a specific reason to incorporate immediately (such as a business partner requiring it, a contract that requires Ltd status, or projected profits above £50,000 from year one). As a sole trader, you register with HMRC for Self Assessment (free, takes 10 minutes online), start trading immediately, and file a tax return once a year. Your accountant costs will be £300 to £800/year compared to £1,000 to £2,500 for a limited company. You can always incorporate later when it makes financial sense — the transition is straightforward and your accountant can advise on the optimal timing.',
  },
  {
    question: 'At what profit level should I incorporate?',
    answer:
      'The break-even point where a limited company becomes more tax-efficient than a sole trader is approximately £40,000 to £50,000 in annual profit (2026/27 tax year). Below this level, the additional costs of running a limited company (higher accountancy fees, annual confirmation statement, payroll administration) often cancel out the tax saving. Above £50,000 profit, the savings from paying yourself a low salary plus dividends typically exceed the additional costs. At £70,000 profit, the annual tax saving of a limited company over a sole trader is approximately £3,000 to £5,000. Your accountant can model the exact figures for your situation — the numbers depend on your personal circumstances, any other income, and whether you have a spouse who could be a shareholder.',
  },
  {
    question: 'What is the difference between a partnership and an LLP?',
    answer:
      'An ordinary partnership is the simplest form: two or more people trading together. You register with HMRC, file a partnership tax return, and each partner files a personal tax return for their share of profits. Crucially, each partner has UNLIMITED personal liability for ALL partnership debts — not just their share. If your partner runs up debts and disappears, you are liable for the full amount. A Limited Liability Partnership (LLP) provides limited liability (similar to a limited company) — each partner liability is limited to the amount they have invested. However, LLPs must file accounts at Companies House, comply with company law requirements, and have higher accountancy costs. For two electricians starting a business together, an LLP is usually the better choice because of the liability protection.',
  },
  {
    question: 'How does tax work for a limited company electrician?',
    answer:
      'A limited company is a separate legal entity. It pays corporation tax on its profits (25% in 2026/27 for profits above £250,000, or 19% to 25% marginal rate for profits between £50,000 and £250,000, effectively 26.5% marginal rate in the band). You extract money from the company in two ways: a salary (which the company pays employer NI on, and you pay income tax and employee NI on) and dividends (which are paid from after-tax profits and taxed at lower rates: 8.75% basic rate, 33.75% higher rate). The optimal strategy in 2026/27 is typically: pay yourself a salary up to the NI threshold (approximately £12,570) to preserve your state pension qualifying year, and take the rest as dividends. This minimises NI contributions. Your accountant should set up the optimal salary/dividend split.',
  },
  {
    question: 'Do I need a business bank account?',
    answer:
      'As a sole trader, there is no legal requirement for a separate business bank account — but you should absolutely have one. Mixing personal and business finances makes bookkeeping a nightmare, increases your accountancy costs, and makes it harder to understand your business performance. As a limited company, you MUST have a separate business bank account — the company money is not your money, and mixing the two is a breach of your fiduciary duties as a director. Many banks offer free business banking for the first 12 to 24 months (Starling, Tide, Mettle are popular for sole traders). For limited companies, expect to pay £5 to £15/month after the free period.',
  },
  {
    question: 'What about VAT registration?',
    answer:
      'You must register for VAT if your taxable turnover exceeds the VAT threshold (£90,000 in 2026/27) in any rolling 12-month period. You can voluntarily register below the threshold if you want to reclaim VAT on purchases (useful if you buy a lot of materials). The Flat Rate Scheme (FRS) allows small businesses to pay a fixed percentage of turnover as VAT instead of calculating input and output VAT on every transaction — for electricians, the FRS rate is 14.5%. On the standard scheme, you charge 20% VAT on your invoices and reclaim VAT on your business purchases. The standard scheme is usually better for electricians because material costs are high, generating significant input VAT to reclaim. Discuss with your accountant before registering voluntarily.',
  },
  {
    question: 'Can I be a sole trader and then switch to a limited company?',
    answer:
      'Yes, and this is the most common path. You can cease trading as a sole trader and start trading through a limited company at any time. The process involves: forming a limited company at Companies House (£12 online), opening a company bank account, transferring customer relationships and contracts, informing your competent person scheme, updating your insurance, and potentially transferring assets (van, tools) from you personally to the company. Your accountant handles the tax transition — you file a final sole trader tax return for the period up to the changeover date, and the company files its first corporation tax return from that date forward. The changeover typically takes 2 to 4 weeks to set up.',
  },
  {
    question: 'Does my business structure affect my electrical qualifications?',
    answer:
      'Your qualifications are personal to you — they do not change when you change business structure. Your competent person scheme registration (NICEIC, NAPIT, etc.) may need to be updated to reflect the new business entity. If you move from sole trader to limited company, contact your scheme to transfer the registration to the company. Your personal qualifications (18th Edition, 2391, etc.) remain valid. Insurance policies will need to be reissued in the company name. ECS/CSCS cards are personal and unaffected.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/electrical-business-plan-template',
    title: 'Electrical Business Plan',
    description:
      'Model different business structures in your financial projections.',
    icon: Briefcase,
    category: 'Guide',
  },
  {
    href: '/guides/cash-flow-management-electricians',
    title: 'Cash Flow Management',
    description:
      'Tax timing varies by structure — plan your cash flow accordingly.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-estimating-guide',
    title: 'Electrical Estimating Guide',
    description:
      'Your business structure affects your true costs — factor it into your rates.',
    icon: Calculator,
    category: 'Guide',
  },
  {
    href: '/guides/hiring-first-employee-electrician',
    title: 'Hiring Your First Employee',
    description:
      'Hiring usually triggers the conversation about incorporating.',
    icon: Users,
    category: 'Guide',
  },
  {
    href: '/guides/how-to-get-first-electrical-customer',
    title: 'Getting Your First Customer',
    description:
      'Start trading quickly as a sole trader — incorporate later when it makes sense.',
    icon: Briefcase,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description:
      'Professional quotes with your business details — sole trader or Ltd.',
    icon: PoundSterling,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Choosing Your Business Structure: It Affects Everything',
    content: (
      <>
        <p>
          Your business structure determines how much tax you pay, how much personal liability
          you carry, how much admin you deal with, and how much it costs to run your business.
          For electricians, there are three realistic options: sole trader, partnership (or
          LLP), and limited company.
        </p>
        <p>
          There is no one-size-fits-all answer. The right structure depends on your projected
          income, whether you have a business partner, your appetite for risk, and how much
          admin you are willing to handle. This guide compares all three options with specific
          numbers for the 2026/27 tax year so you can make an informed decision.
        </p>
      </>
    ),
  },
  {
    id: 'sole-trader',
    heading: 'Sole Trader: Simple, Cheap, Fast',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="grid gap-6 sm:grid-cols-2 text-white text-sm">
            <div>
              <h4 className="font-bold text-white mb-3 text-green-400">Advantages</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 shrink-0" />
                  Free to set up — register online with HMRC in 10 minutes
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 shrink-0" />
                  Simplest bookkeeping — income, expenses, and one tax return per year
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 shrink-0" />
                  Cheapest accountancy fees (£300 to £800/year)
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 shrink-0" />
                  All profits are yours — no company formalities to extract money
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 shrink-0" />
                  Private — your accounts are NOT public (unlike a limited company)
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3 text-red-400">Disadvantages</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                  Unlimited personal liability — your house, car, savings are all at risk
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                  Higher tax at profit levels above £40,000 to £50,000
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                  No income splitting with a spouse (unlike a Ltd with dividends)
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                  Less credibility with some commercial clients
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                  Cannot sell the business as a separate entity
                </li>
              </ul>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'partnership',
    heading: 'Partnership and LLP: Sharing the Business',
    content: (
      <>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Ordinary Partnership</h3>
            <p className="text-white text-sm leading-relaxed">
              Two or more people trading together. Each partner files a personal tax return
              for their share of profits. Simple to set up — just register with HMRC.
              <strong className="text-red-400"> CRITICAL: each partner has UNLIMITED personal
              liability for ALL partnership debts</strong> — not just their share. If your
              partner makes a mistake, you are personally liable for the full amount.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">LLP (Limited Liability Partnership)</h3>
            <p className="text-white text-sm leading-relaxed">
              Registered at Companies House. Combines the tax transparency of a partnership
              (each partner taxed on their share) with the liability protection of a limited
              company (each partner&apos;s liability limited to their investment). Must file
              accounts at Companies House. Higher accountancy costs (£1,000 to £2,000/year).
              <strong className="text-green-400"> Recommended over ordinary partnership for
              liability protection.</strong>
            </p>
          </div>
        </div>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <h4 className="font-bold text-white mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-400" /> Partnership Agreement: Non-Negotiable
          </h4>
          <p className="text-white text-sm leading-relaxed">
            ALWAYS have a written partnership agreement. Cover: profit-sharing ratios, decision
            making (equal or weighted), what happens if one partner wants to leave, how
            disputes are resolved, who owns what assets, capital contributions, and non-compete
            clauses. Without an agreement, the Partnership Act 1890 applies by default — which
            assumes equal sharing regardless of who does more work or invested more money.
            A solicitor can draft a partnership agreement for £500 to £1,500. It is the best
            £500 you will ever spend.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'limited-company',
    heading: 'Limited Company: Separate Legal Entity',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="grid gap-6 sm:grid-cols-2 text-white text-sm">
            <div>
              <h4 className="font-bold text-white mb-3 text-green-400">Advantages</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 shrink-0" />
                  Limited liability — personal assets protected (with exceptions)
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 shrink-0" />
                  Tax-efficient above £40,000 to £50,000 profit (salary + dividends)
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 shrink-0" />
                  Income splitting with spouse as shareholder
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 shrink-0" />
                  Greater credibility with commercial clients
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 shrink-0" />
                  Can sell the company as a going concern
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 shrink-0" />
                  Pension contributions through the company are corporation tax deductible
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3 text-red-400">Disadvantages</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                  Higher accountancy costs (£1,000 to £2,500/year)
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                  More admin: payroll, corporation tax return, annual accounts, confirmation statement
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                  Public accounts — anyone can see your filed accounts on Companies House
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                  Director responsibilities and fiduciary duties
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                  Money in the company is NOT your money — must be extracted as salary or dividends
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                  Personal guarantees for van finance/business loans negate the liability protection
                </li>
              </ul>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'tax-comparison',
    heading: 'Tax Comparison: Sole Trader vs Limited Company (2026/27)',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h4 className="font-bold text-white mb-4 flex items-center gap-2">
            <Calculator className="w-4 h-4 text-yellow-400" /> Tax Comparison at Different Profit Levels
          </h4>
          <div className="space-y-3 text-white text-sm">
            <div className="grid grid-cols-3 gap-4 font-bold border-b border-white/10 pb-3">
              <span>Annual Profit</span>
              <span>Sole Trader Tax</span>
              <span>Ltd Tax (Optimal)</span>
            </div>
            <div className="grid grid-cols-3 gap-4 border-b border-white/10 pb-2">
              <span>£30,000</span>
              <span className="text-yellow-400">£5,700</span>
              <span className="text-yellow-400">£5,400 (-£300)</span>
            </div>
            <div className="grid grid-cols-3 gap-4 border-b border-white/10 pb-2">
              <span>£40,000</span>
              <span className="text-yellow-400">£8,200</span>
              <span className="text-yellow-400">£7,200 (-£1,000)</span>
            </div>
            <div className="grid grid-cols-3 gap-4 border-b border-white/10 pb-2">
              <span>£50,000</span>
              <span className="text-yellow-400">£11,200</span>
              <span className="text-yellow-400">£9,400 (-£1,800)</span>
            </div>
            <div className="grid grid-cols-3 gap-4 border-b border-white/10 pb-2">
              <span>£60,000</span>
              <span className="text-yellow-400">£14,700</span>
              <span className="text-yellow-400">£11,800 (-£2,900)</span>
            </div>
            <div className="grid grid-cols-3 gap-4 border-b border-white/10 pb-2">
              <span>£70,000</span>
              <span className="text-yellow-400">£18,200</span>
              <span className="text-yellow-400">£14,500 (-£3,700)</span>
            </div>
            <div className="grid grid-cols-3 gap-4 pb-2">
              <span>£100,000</span>
              <span className="text-yellow-400">£29,200</span>
              <span className="text-yellow-400">£22,500 (-£6,700)</span>
            </div>
          </div>
        </div>
        <p>
          <strong>Important:</strong> These figures are approximate and assume optimal
          salary/dividend extraction, no other income, and basic rate taxpayer status for
          dividends up to the relevant thresholds. Your actual figures will depend on your
          personal circumstances. The Ltd figures do NOT include the additional accountancy
          costs of £500 to £1,500/year — at £30,000 profit, the £300 tax saving is wiped out
          by accountancy fees. The break-even point where Ltd genuinely saves you money
          (after all costs) is approximately £40,000 to £50,000.
        </p>
      </>
    ),
  },
  {
    id: 'liability',
    heading: 'Liability and Risk: What Is at Stake',
    content: (
      <>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-400" /> Sole Trader: Unlimited Liability
            </h3>
            <p className="text-white text-sm leading-relaxed">
              You and your business are legally the same entity. If your business owes money —
              to suppliers, to a customer who sues you, to HMRC — your personal assets are on
              the line. Your house (if you own one), your van, your savings, everything. Public
              liability insurance covers third-party claims, but it does not cover business
              debts, tax liabilities, or contractual disputes.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-400" /> Limited Company: Limited Liability
            </h3>
            <p className="text-white text-sm leading-relaxed">
              A limited company is a separate legal entity. Its debts are its own — your
              personal liability is limited to the amount you invested in shares (typically
              £1). However, this protection has limits: personal guarantees on loans or
              leases bypass it (and most van finance and business loans require personal
              guarantees), fraudulent or wrongful trading removes it, and HMRC can pursue
              directors personally in some cases. Limited liability is valuable but not
              bulletproof.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'admin-burden',
    heading: 'Admin Burden and Running Costs',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="space-y-3 text-white text-sm">
            <div className="grid grid-cols-3 gap-4 font-bold border-b border-white/10 pb-3">
              <span>Item</span>
              <span>Sole Trader</span>
              <span>Limited Company</span>
            </div>
            <div className="grid grid-cols-3 gap-4 border-b border-white/10 pb-2">
              <span>Setup cost</span>
              <span className="text-yellow-400">Free</span>
              <span className="text-yellow-400">£12 (Companies House)</span>
            </div>
            <div className="grid grid-cols-3 gap-4 border-b border-white/10 pb-2">
              <span>Annual accountancy</span>
              <span className="text-yellow-400">£300 to £800</span>
              <span className="text-yellow-400">£1,000 to £2,500</span>
            </div>
            <div className="grid grid-cols-3 gap-4 border-b border-white/10 pb-2">
              <span>Tax returns</span>
              <span className="text-yellow-400">1 (Self Assessment)</span>
              <span className="text-yellow-400">3+ (CT, SA, payroll)</span>
            </div>
            <div className="grid grid-cols-3 gap-4 border-b border-white/10 pb-2">
              <span>Payroll</span>
              <span className="text-yellow-400">Not needed</span>
              <span className="text-yellow-400">Monthly (even for just you)</span>
            </div>
            <div className="grid grid-cols-3 gap-4 border-b border-white/10 pb-2">
              <span>Annual accounts</span>
              <span className="text-yellow-400">Not filed publicly</span>
              <span className="text-yellow-400">Filed at Companies House</span>
            </div>
            <div className="grid grid-cols-3 gap-4 border-b border-white/10 pb-2">
              <span>Confirmation statement</span>
              <span className="text-yellow-400">Not needed</span>
              <span className="text-yellow-400">Annual (£13)</span>
            </div>
            <div className="grid grid-cols-3 gap-4 pb-2">
              <span>Extracting profits</span>
              <span className="text-yellow-400">Automatic (it is yours)</span>
              <span className="text-yellow-400">Via salary and dividends</span>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'when-to-incorporate',
    heading: 'When to Incorporate: The Decision Framework',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Incorporate when:</strong> Your annual profit consistently exceeds
                £40,000 to £50,000 for at least 2 consecutive years. You want to split income
                with a spouse through dividends. You are taking on significant commercial
                contracts and want liability protection. You are planning to take on employees.
                You want to build a business that can be sold.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Stay as a sole trader when:</strong> Your profits are below £40,000. You
                value simplicity and low admin. You are just starting out and your income is
                uncertain. You do not have a spouse to split income with. You do not need the
                credibility of a limited company for your customer base.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consider a partnership/LLP when:</strong> You are going into business
                with another electrician. You want to share profits, risks, and workload.
                Choose an LLP over an ordinary partnership for liability protection. Always
                have a written partnership agreement.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Start Simple, Scale Smart',
    content: (
      <>
        <p>
          The best advice is: start as a sole trader, learn the business, build your income,
          and incorporate when the numbers justify it. Do not overcomplicate your first year
          with company formation, payroll, and complex accounting when you could be spending
          that time finding customers and doing work.
        </p>
        <SEOAppBridge
          title="Manage your electrical business whatever your structure"
          description="Elec-Mate handles quoting, certification, invoicing, and job management for sole traders and limited companies alike. 7-day free trial."
          icon={Briefcase}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function PartnershipVsSoleTraderPage() {
  return (
    <GuideTemplate
      title="Partnership vs Sole Trader vs Ltd for Electricians UK 2026 | Tax Guide"
      description="Compare sole trader, partnership, LLP, and limited company for electricians. Tax comparison with 2026/27 figures, liability, admin burden, and when to incorporate."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Tax Guide"
      badgeIcon={Scale}
      heroTitle={
        <>
          Sole Trader vs Partnership vs Ltd:{' '}
          <span className="text-yellow-400">Which Structure Saves You the Most?</span>
        </>
      }
      heroSubtitle="Tax comparison with 2026/27 figures, liability differences, admin burden, and a clear framework for when to incorporate. The practical guide for UK electricians choosing a business structure."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Business Structure for Electricians"
      relatedPages={relatedPages}
      ctaHeading="Run Your Business Your Way"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for quoting, certification, invoicing, and job management. Works for sole traders, partnerships, and limited companies. 7-day free trial, cancel anytime."
    />
  );
}
