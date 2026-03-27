import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileText,
  AlertTriangle,
  PoundSterling,
  TrendingUp,
  ShieldCheck,
  ClipboardCheck,
  Zap,
  Building2,
  Users,
  BarChart2,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Finance Guides', href: '/guides/electrician-finance' },
  { label: 'Electrical Business Valuation', href: '/electrical-business-valuation' },
];

const tocItems = [
  { id: 'valuation-overview', label: 'How Electrical Businesses Are Valued' },
  { id: 'ebitda-multiple', label: 'EBITDA Multiple Method' },
  { id: 'revenue-multiple', label: 'Revenue Multiple Method' },
  { id: 'asset-value', label: 'Asset Value Method' },
  { id: 'what-increases-value', label: 'What Increases Your Business Value' },
  { id: 'typical-multiples', label: 'Typical Multiples for Electrical Contractors' },
  { id: 'preparing-for-sale', label: 'Preparing for Sale' },
  { id: 'earn-outs', label: 'Earn-Outs Explained' },
  { id: 'for-electricians', label: 'Building a Valuable Business with Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Small electrical contracting businesses (sole traders and small limited companies) typically sell for 1 to 3 times EBITDA (earnings before interest, tax, depreciation, and amortisation). Businesses with recurring contracts, trained staff, and strong reputation attract the higher end of the range.',
  'EBITDA is the most commonly used valuation metric for electrical businesses. Buyers focus on sustainable, repeatable profit rather than one-off income spikes.',
  'The three main valuation methods are: EBITDA multiple (profit-based), revenue multiple (turnover-based), and asset value (plant, vehicles, and work in progress). Most deals use a combination.',
  'Recurring maintenance contracts, certificated and trained staff, a strong online reputation, and diversification into growth areas (EV charging, solar PV) all increase business value and attractability to buyers.',
  'An earn-out arrangement, where the seller receives additional payments tied to future business performance, is common in electrical business sales where a significant portion of revenue is relationship-dependent.',
];

const faqs = [
  {
    question: 'How much is my electrical business worth?',
    answer:
      'The value of an electrical contracting business depends primarily on its sustainable profit (EBITDA) and the multiple a buyer is willing to pay. For small electrical businesses (sole traders and companies with under £1 million turnover), the multiple is typically 1 to 2 times EBITDA. For medium-sized businesses with recurring contracts, trained staff, and strong margins, multiples of 2 to 3 times EBITDA are achievable. For specialist businesses (commercial, industrial, data centres, or renewable energy focus) with significant recurring revenue, multiples can be higher. A business with £100,000 EBITDA might therefore be valued between £100,000 and £300,000 depending on quality.',
  },
  {
    question: 'What is EBITDA and how is it calculated for an electrical contractor?',
    answer:
      'EBITDA stands for Earnings Before Interest, Tax, Depreciation, and Amortisation. For an electrical contractor, it is broadly your operating profit adjusted to add back depreciation, amortisation, interest costs, and tax. Start with your net profit, then add back: depreciation on vehicles and equipment; interest on loans or finance; your own salary (if you work in the business, this is often added back and replaced with a market-rate management salary when presenting to buyers); and any one-off exceptional costs. The resulting normalised EBITDA represents the true ongoing earning power of the business. An accountant experienced in business sales can prepare a proper EBITDA calculation.',
  },
  {
    question: 'What is a revenue multiple and when is it used for electrical businesses?',
    answer:
      'A revenue multiple values the business at a proportion of its annual turnover (revenue). Revenue multiples for small electrical contractors are typically 0.3 to 0.8 times annual turnover. Revenue multiples are most useful as a sanity check alongside EBITDA multiples, or in situations where profit is distorted (e.g. the owner is paying themselves below market rate, or the business is in a growth phase with temporarily reduced margins). A business with £500,000 turnover might be valued at £150,000 to £400,000 on a revenue multiple basis. Revenue multiples should never be the sole valuation method — a loss-making business with £500,000 turnover is worth far less than a profitable one.',
  },
  {
    question: 'How do recurring maintenance contracts affect valuation?',
    answer:
      'Recurring maintenance contracts are among the most valuable assets in an electrical business. They provide predictable, contracted revenue that a buyer can rely on continuing after the sale. A business with £200,000 of annual recurring contract revenue is significantly more valuable than one with the same turnover from one-off projects, because the buyer is acquiring the income stream, not just the tools and van. Recurring contracts increase the EBITDA multiple achievable, reduce the earn-out risk, and make the business more attractive to a wider pool of buyers including trade buyers and private equity.',
  },
  {
    question: 'What is an earn-out and will I have to accept one?',
    answer:
      'An earn-out is a sale structure where part of the purchase price is paid after completion, contingent on the business meeting agreed performance targets in the post-sale period. Earn-outs are common in electrical business sales because buyers want protection against the risk that customers follow the seller rather than staying with the business. A typical earn-out might pay 50-70% of the price on completion, with the remainder paid over 12 to 24 months based on revenue or profit targets. Earn-outs are negotiable — the more systemised, contract-based, and staff-dependent (rather than owner-dependent) your business is, the less likely a buyer will insist on a significant earn-out.',
  },
  {
    question: 'What is the best way to prepare my electrical business for sale?',
    answer:
      'Start preparing 2 to 3 years before your target sale date. Key preparation steps include: ensuring your accounts are professionally prepared and show sustainable, growing profit; converting as many customers as possible to recurring maintenance contracts; documenting all systems and processes so the business does not depend on you personally; investing in training and certificating your workforce; building your online reputation (Google reviews, NICEIC/NAPIT membership, case studies); and reducing any personal expenses run through the business to show true profit. A business that can run without the owner is worth significantly more than one where all client relationships are held personally.',
  },
  {
    question: 'Should I use a business broker to sell my electrical business?',
    answer:
      'For businesses valued over approximately £150,000, using a specialist business broker is usually worthwhile. They market your business to a wider pool of trade buyers and private equity, handle confidentiality through non-disclosure agreements, manage due diligence, and negotiate on your behalf. Broker fees are typically 5 to 10% of the sale price. For smaller electrical businesses (valued under £100,000), direct sale to a trade buyer (another electrical contractor looking to expand, or a regional group) is often more practical and cost-effective. Always obtain an independent valuation before agreeing any deal.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/self-assessment-electrician',
    title: 'Self-Assessment for Electricians',
    description: 'Clean accounts prepared for self-assessment are the foundation of a good business valuation.',
    icon: FileText,
    category: 'Finance Guide',
  },
  {
    href: '/vat-for-electricians',
    title: 'VAT for Electricians',
    description: 'VAT registration, flat rate scheme, and domestic reverse charge for CIS subcontractors.',
    icon: PoundSterling,
    category: 'Finance Guide',
  },
  {
    href: '/electrician-mortgage',
    title: 'Electrician Mortgage Guide',
    description: 'How to get a mortgage as a self-employed electrician — SA302 and lenders.',
    icon: Building2,
    category: 'Finance Guide',
  },
  {
    href: '/cis-guide-electrician',
    title: 'CIS Guide for Electricians',
    description: 'How CIS works, deduction rates, and monthly returns for contractors.',
    icon: ClipboardCheck,
    category: 'Finance Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Professional quotes and invoices that support a strong, valuable business.',
    icon: Zap,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'valuation-overview',
    heading: 'How Electrical Businesses Are Valued',
    content: (
      <>
        <p>
          The value of an electrical contracting business is determined by its ability to
          generate sustainable profit, the quality and repeatability of that income, and the
          degree to which the business can operate without its owner. There is no single formula —
          buyers and sellers negotiate based on several valuation methods, market conditions,
          and deal-specific factors.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <BarChart2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three primary methods</strong> — EBITDA multiple (profit-based and most
                commonly used), revenue multiple (turnover-based, used as a cross-check or in
                early-stage discussions), and asset value (used where the business has significant
                plant, vehicles, and stock, or where it is loss-making).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BarChart2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Buyers are buying future income</strong> — a buyer is fundamentally paying
                for the future profit they expect to receive. Everything that makes future income
                more predictable, more reliable, and less dependent on the seller personally
                increases the price they will pay.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BarChart2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Who buys electrical businesses?</strong> — trade buyers (other electrical
                contractors looking to expand their area, capacity, or client base), management
                buyouts (your own staff buying the business), regional consolidators (multi-trade
                or electrical groups building scale), and occasionally private equity (for larger
                businesses with significant recurring revenue).
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5 my-4">
          <p className="text-white text-sm">
            <strong>Disclaimer:</strong> Business valuation is complex and situation-specific.
            The figures and multiples in this guide are general industry guidance only. Always
            obtain a professional valuation from a qualified business broker or accountant
            experienced in trade business sales before making any decisions about buying or
            selling your electrical business.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'ebitda-multiple',
    heading: 'EBITDA Multiple: The Primary Valuation Method',
    content: (
      <>
        <p>
          EBITDA (Earnings Before Interest, Tax, Depreciation, and Amortisation) is the most
          widely used profit measure for valuing small and medium-sized businesses. It represents
          the underlying operating profit of the business, stripped of financing and accounting
          decisions.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Calculating your EBITDA</strong> — start with your net profit. Add back:
                depreciation (on vehicles, equipment, etc.); amortisation (on intangible assets);
                interest paid on finance or loans; income tax; and any owner's salary above what
                a market-rate manager would be paid. The result is a "normalised" EBITDA that
                shows what the business would earn under new ownership.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Multiple applied</strong> — buyers multiply normalised EBITDA by a
                multiple to arrive at an enterprise value. For small electrical contractors,
                the multiple is typically 1 to 3 times. The quality of the business determines
                where in this range the multiple falls.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Example</strong> — a sole trader electrical contractor with normalised
                EBITDA of £80,000 per year might be valued at £80,000 to £240,000 (1x to 3x).
                A business at the higher end of the range would have recurring contracts, trained
                staff, and systems that allow it to operate without the owner.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'revenue-multiple',
    heading: 'Revenue Multiple: A Cross-Check, Not the Primary Method',
    content: (
      <>
        <p>
          Revenue multiples express business value as a proportion of annual turnover. For
          electrical contractors, the range is typically 0.3 to 0.8 times annual turnover,
          but this varies significantly with profitability and business quality.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>When revenue multiples are used</strong> — revenue multiples are useful
                early in negotiations (before detailed profit analysis is complete), for businesses
                in growth phases with temporarily suppressed margins, or as a cross-check against
                the EBITDA valuation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Limitations</strong> — revenue tells you nothing about profitability.
                A business with £600,000 turnover and 5% net margin is worth far less than one
                with £400,000 turnover and 20% margin. Never use revenue multiples as your sole
                valuation basis.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Recurring vs project revenue</strong> — recurring maintenance and service
                contract revenue attracts a higher multiple than project revenue. If 40% of your
                turnover is recurring, a buyer will apply a blended multiple weighted towards the
                recurring element.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'asset-value',
    heading: 'Asset Value Method',
    content: (
      <>
        <p>
          Asset value is the most basic valuation approach and represents the floor value of
          an electrical business — what it is worth if all assets are liquidated and liabilities
          settled. For most viable businesses, the EBITDA or revenue multiple will produce a
          higher value than the asset approach.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tangible assets included</strong> — vehicles (current market value, not
                book value), tools and test equipment, stock (materials and spares), trade debtors
                (invoices outstanding from customers), and any owned property.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Intangible assets</strong> — goodwill (the value of customer relationships
                and brand), trained and certificated workforce, and certifications (NICEIC, NAPIT,
                MCS, EV charging approved installer status). Intangibles are often a significant
                component of an electrical business's total value.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>When asset value is relevant</strong> — asset value is the primary
                method when a business is loss-making or when a buyer is primarily interested in
                the vehicles, equipment, and workforce rather than the customer base. It is also
                used in distressed sales.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'what-increases-value',
    heading: 'What Increases the Value of an Electrical Business',
    content: (
      <>
        <p>
          Buyers pay premiums for businesses that are easier to own, less risky, and more
          profitable. The following factors consistently increase valuation multiples for
          electrical contractors:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Recurring maintenance contracts</strong> — annual or multi-year contracts
                for periodic inspection and maintenance provide predictable revenue. This is the
                single most value-adding factor for electrical businesses.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Trained and certificated staff</strong> — a team that holds current
                qualifications (18th Edition, inspection and testing C&G 2391, EV charging,
                solar PV) and can win and complete work without the owner is significantly
                more valuable than a business where the owner is the only qualified person.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Plant and vehicles</strong> — owned (not leased) vehicles and well-maintained
                test equipment add to asset value. Buyers prefer businesses where the tools of
                the trade are assets of the business, not personal property of the owner.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Strong online reputation</strong> — Google reviews, Trustpilot, NICEIC or
                NAPIT "find an electrician" profile, and a professional website. Buyers acquire
                these reputational assets alongside the business.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Growth market diversification</strong> — electrical businesses with
                established EV charging installation, solar PV, battery storage, or smart home
                capabilities attract premiums because buyers are acquiring capability in growing
                markets.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Systems and processes</strong> — documented job management systems,
                standard operating procedures, and use of job management software demonstrate
                a business that can be handed over and operated without the founder.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'typical-multiples',
    heading: 'Typical EBITDA Multiples for Electrical Contractors',
    content: (
      <>
        <p>
          The EBITDA multiple achievable depends on business size, profitability, recurring
          revenue, and how dependent the business is on the owner. Here is a general guide to
          multiples for UK electrical contracting businesses in 2026:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <BarChart2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>1x EBITDA — Owner-operator, no recurring contracts</strong> — a sole
                trader who personally carries out most of the work, with no recurring contracts
                and customer relationships held entirely by the owner. High earn-out risk; buyers
                price in the uncertainty.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BarChart2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>1.5–2x EBITDA — Small team, some recurring revenue</strong> — a business
                with 2 to 5 employees or subcontractors, some recurring maintenance contracts,
                and a degree of systematisation. The owner is still involved but is not the only
                technically qualified person.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BarChart2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>2–3x EBITDA — Established business with strong recurring revenue</strong>
                — a business with significant recurring maintenance contracts (representing 30%
                or more of turnover), multiple certificated staff, documented systems, and a
                track record of consistent profitability.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BarChart2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>3x+ EBITDA — Specialist or high-growth business</strong> — specialist
                electrical businesses (data centres, healthcare, commercial with significant
                contracted maintenance) or businesses with strong growth in emerging markets
                (EV charging, solar PV) can achieve multiples above 3x.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These multiples assume a willing seller and buyer negotiating at arm's length. Distressed
          sales, urgent sales, or sales to connected parties typically achieve lower multiples.
        </p>
      </>
    ),
  },
  {
    id: 'preparing-for-sale',
    heading: 'Preparing Your Electrical Business for Sale',
    content: (
      <>
        <p>
          The most successful business sales are those planned 2 to 3 years in advance. Last-minute
          sales typically achieve lower multiples and require more earn-out protection for the buyer.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Clean accounts — 2 to 3 years before sale</strong> — work with your
                accountant to remove personal expenses from the business accounts, show a clear
                and growing profit trend, and prepare formal financial statements that will
                withstand buyer due diligence.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Convert customers to contracts</strong> — approach regular customers
                and offer annual electrical maintenance contracts. Even relatively modest recurring
                revenue dramatically improves your multiple and reduces earn-out risk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Document everything</strong> — prepare operations manuals, document your
                supplier relationships, and ensure all certifications (NICEIC/NAPIT, MCS, EV
                charging approvals) are current and transferable to new ownership.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Reduce owner dependency</strong> — transfer customer relationships to
                staff where possible. Train your team to handle technical queries and client
                communication. A business that can run without you is worth more and easier
                to sell.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'earn-outs',
    heading: 'Earn-Outs: Protecting the Buyer, Rewarding the Seller',
    content: (
      <>
        <p>
          An earn-out is a common structure in electrical business sales where part of the purchase
          price is deferred and paid based on the business's performance after the sale completes.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Typical structure</strong> — 50 to 70% of the agreed price paid on
                completion. The remaining 30 to 50% paid over 12 to 24 months, tied to the
                business meeting revenue or profit targets. The seller often stays involved for
                a transition period (6 to 12 months) to facilitate handover.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>When earn-outs are negotiated down</strong> — the more systemised and
                contract-based your business is, the less earn-out a buyer needs. If 60% of your
                revenue comes from annual maintenance contracts, the buyer has confidence the
                income will continue and can pay a higher proportion upfront.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Key considerations for sellers</strong> — ensure earn-out targets are
                realistic and based on factors within your control during the handover period.
                Agree clearly defined metrics (gross revenue, gross profit, or EBITDA) and the
                measurement period. Always have the earn-out terms reviewed by a commercial
                solicitor before signing.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'Building a More Valuable Business with Elec-Mate',
    content: (
      <>
        <p>
          The systems and professionalism of your business are a significant factor in its
          valuation. Buyers pay premiums for businesses that are well-organised, professionally
          presented, and easy to operate. Elec-Mate helps electricians build more valuable
          businesses from day one.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <BarChart2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Professional Systems That Buyers Value</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    Elec-Mate's quoting and invoicing tools
                  </SEOInternalLink>{' '}
                  to run a professional, organised business. Buyers see a business with proper
                  job management systems as lower risk — and price accordingly. Every job quoted,
                  invoiced, and tracked in a system is evidence of a business that can survive
                  under new ownership.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Certification Records That Transfer With the Business</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate's certificate tools
                  </SEOInternalLink>{' '}
                  to maintain digital records of every EICR, EIC, and test certificate. This
                  historical work record is a tangible asset — evidence of the client base, the
                  type of work you carry out, and the quality of your documentation.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Build a more valuable electrical business with Elec-Mate"
          description="Join 430+ UK electricians using Elec-Mate for professional quoting, invoicing, and electrical certification. Build the systems and records that make your business more valuable and easier to sell. 7-day free trial."
          icon={BarChart2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricalBusinessValuationPage() {
  return (
    <GuideTemplate
      title="Electrical Business Valuation UK | How Much Is My Electrical Company Worth?"
      description="Complete guide to valuing an electrical contracting business in the UK — EBITDA multiples (1–3x for small contractors), revenue multiples, asset value, what increases value (recurring contracts, trained staff, plant), preparing for sale, and earn-out structures."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Finance Guide"
      badgeIcon={BarChart2}
      heroTitle={
        <>
          Electrical Business Valuation UK:{' '}
          <span className="text-yellow-400">How Much Is My Electrical Company Worth?</span>
        </>
      }
      heroSubtitle="Everything UK electrical contractors need to know about business valuation — EBITDA multiples for small contractors (1–3x), revenue multiples, asset value, what increases your business value, typical multiples for electrical businesses, preparing for sale, and how earn-out structures work."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrical Business Valuation"
      relatedPages={relatedPages}
      ctaHeading="Build a More Valuable Electrical Business"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for professional quoting, invoicing, and certification. Build the systems and records that make your business more valuable and easier to sell. 7-day free trial, cancel anytime."
    />
  );
}
