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
  Target,
  BarChart3,
  FileText,
  Building2,
  Megaphone,
  Shield,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Business', href: '/guides/how-to-get-first-electrical-customer' },
  { label: 'Business Plan', href: '/guides/electrical-business-plan-template' },
];

const tocItems = [
  { id: 'overview', label: 'Why You Need a Business Plan' },
  { id: 'sections', label: 'Sections Your Plan Must Include' },
  { id: 'financial-projections', label: 'Financial Projections' },
  { id: 'pricing-strategy', label: 'Pricing Strategy' },
  { id: 'marketing-plan', label: 'Marketing Plan' },
  { id: 'growth-strategy', label: 'Growth Strategy' },
  { id: 'common-mistakes', label: 'Common Mistakes' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A business plan is not just for banks — it forces you to think through your pricing, costs, marketing, and growth before you commit money. Electricians who plan make more money than those who wing it.',
  'Your financial projections must include realistic revenue (based on billable hours, not calendar hours), all business costs, and a cash flow forecast showing when money comes in versus when it goes out.',
  'The marketing section is where most electrical business plans fail. "Word of mouth" is not a marketing plan. You need at least three customer acquisition channels with measurable costs per lead.',
  'Plan for year one survival (£30,000 to £45,000 turnover is realistic for a sole trader), year two stability (£50,000 to £70,000), and year three growth (£70,000+ or the decision to hire).',
  'Review and update your business plan quarterly. A plan that sits in a drawer is worthless. The value is in the thinking process and the regular comparison of plan vs reality.',
];

const faqs = [
  {
    question: 'Do I really need a business plan to start an electrical business?',
    answer:
      'You do not legally need one, but you practically need one. Without a plan, you are guessing at your pricing, hoping your costs work out, and reacting to problems instead of anticipating them. A business plan forces you to calculate: how many billable hours you need per week, what hourly rate covers your costs plus profit, how much money you need before you start earning, and where your first customers will come from. If you need a business bank account, loan, or van finance, the lender will almost certainly ask for a business plan. Even if nobody else reads it, the exercise of creating it will save you from expensive mistakes in your first year.',
  },
  {
    question: 'How long should an electrical business plan be?',
    answer:
      'For a sole trader starting a domestic electrical business, 10 to 15 pages is sufficient. This covers: an executive summary (1 page), business description and services (1 to 2 pages), market analysis (1 to 2 pages), marketing plan (2 to 3 pages), financial projections with 12-month cash flow (3 to 4 pages), and operational plan (1 to 2 pages). If you are applying for significant funding or setting up a limited company with partners, you may need 20 to 30 pages with more detailed financials. Do not pad it — banks and investors can spot filler. Every section should contain specific, realistic numbers.',
  },
  {
    question: 'What financial projections should I include?',
    answer:
      'At minimum: a 12-month cash flow forecast (month by month, showing exactly when money comes in and goes out), a profit and loss projection for years one, two, and three, a list of startup costs (tools, van, insurance, registration, first month expenses before you earn anything), and a break-even analysis showing how many billable hours per week you need at your hourly rate to cover all costs. The cash flow forecast is the most important — many profitable businesses fail because they run out of cash between invoicing and getting paid.',
  },
  {
    question: 'How much does it cost to start an electrical business in 2026?',
    answer:
      'Typical startup costs for a sole trader domestic electrician in 2026: tools and test equipment (£3,000 to £8,000 if starting from scratch, less if you already own tools), van deposit or first lease payment (£1,500 to £5,000), van signwriting (£300 to £800), public liability insurance (£300 to £600/year), competent person scheme registration (£300 to £500/year), initial material stock (£500 to £1,000), website and marketing (£500 to £2,000), accountant setup (£200 to £500), uniforms and PPE (£200 to £400). Total: approximately £7,000 to £19,000 depending on what you already have. Budget for 3 months of living expenses on top — it takes time to build a customer base.',
  },
  {
    question: 'What should my marketing plan include?',
    answer:
      'Your marketing plan should list at least three customer acquisition channels with specific tactics, costs, and expected returns. Example: (1) Google Business Profile — free, optimised for local search, target 10+ reviews in first 3 months; (2) Checkatrade or MyBuilder — budget £100 to £200/month, target 5 to 10 leads/month; (3) Social media — Facebook and Instagram, 2 to 3 posts per week showing completed work, budget £50/month for boosted posts. Also include: your unique selling proposition (what makes you different), your target customer profile (domestic, commercial, or both), your pricing position (premium, mid-market, or value), and referral strategy (how you encourage word of mouth systematically, not passively).',
  },
  {
    question: 'Should I plan for a limited company or sole trader?',
    answer:
      'Most electricians start as sole traders and incorporate later if it becomes tax-efficient. As a sole trader, you pay income tax and Class 2/4 National Insurance on your profits. As a limited company, you pay corporation tax (25% in 2026) on profits and can pay yourself a combination of salary and dividends, which can be more tax-efficient above approximately £50,000 profit. However, a limited company has more admin (annual accounts, confirmation statement, payroll) and higher accountancy costs (£1,000 to £2,500/year vs £300 to £800 for a sole trader). Your business plan should model both structures to see which is better for your projected income. Most accountants recommend incorporating when your annual profit consistently exceeds £40,000 to £50,000.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/electrical-estimating-guide',
    title: 'Electrical Estimating Guide',
    description: 'Price your work correctly — per-point rates, labour rates, and material markup.',
    icon: Calculator,
    category: 'Guide',
  },
  {
    href: '/guides/partnership-vs-sole-trader-vs-ltd-electrician',
    title: 'Sole Trader vs Ltd vs Partnership',
    description: 'Tax comparison, liability, and when to incorporate your electrical business.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/guides/cash-flow-management-electricians',
    title: 'Cash Flow Management',
    description: 'Invoicing terms, deposits, and staged payments to keep cash flowing.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/guides/finding-commercial-electrical-work',
    title: 'Finding Commercial Work',
    description: 'Expand into commercial — tenders, frameworks, and FM companies.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/guides/how-to-get-first-electrical-customer',
    title: 'Getting Your First Customer',
    description: 'Practical steps to land your first paying customer as a new electrical business.',
    icon: Briefcase,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Professional PDF quotes with itemised pricing. Built for electricians.',
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
    heading: 'Why Every Electrician Needs a Business Plan',
    content: (
      <>
        <p>
          A business plan is not a document you write once and file away — it is the thinking
          process that separates electricians who build profitable businesses from those who are
          always chasing the next job to pay last month's bills.
        </p>
        <p>
          The UK electrical industry is competitive. There are approximately 60,000 registered
          electrical contractors. Most are sole traders or small businesses with 1 to 5 employees.
          The ones that survive and grow are the ones that know their numbers: what it costs them to
          operate, what they need to charge, where their customers come from, and when to invest in
          growth.
        </p>
        <p>
          Whether you are starting from scratch, going self-employed after years as an employee, or
          looking to grow an existing business, a business plan gives you the framework to make
          informed decisions instead of guessing.
        </p>
      </>
    ),
  },
  {
    id: 'sections',
    heading: 'Sections Your Business Plan Must Include',
    content: (
      <>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-4">
              <FileText className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">1. Executive Summary</h4>
                <p className="text-white text-sm leading-relaxed">
                  One page. Who you are, what you do, your target market, your competitive
                  advantage, and your financial summary (projected turnover, profit, and startup
                  costs). Write this last — it summarises everything else.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-4">
              <Target className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">2. Business Description and Services</h4>
                <p className="text-white text-sm leading-relaxed">
                  Your business structure (sole trader, Ltd, partnership), the services you offer
                  (domestic rewires, testing, EV charging, commercial), your qualifications and
                  competent person scheme, and your service area.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-4">
              <BarChart3 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">3. Market Analysis</h4>
                <p className="text-white text-sm leading-relaxed">
                  Your local market: how many households, how many competing electricians, what
                  types of work are in demand, seasonal patterns, and opportunities (new housing
                  developments, EV growth, solar installations).
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-4">
              <Megaphone className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">4. Marketing Plan</h4>
                <p className="text-white text-sm leading-relaxed">
                  How you will find customers — at least three channels with costs and expected
                  returns. Online presence, lead platforms, referral strategy, and pricing position.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">5. Financial Projections</h4>
                <p className="text-white text-sm leading-relaxed">
                  Startup costs, 12-month cash flow forecast, profit and loss for years 1 to 3,
                  break-even analysis, and pricing schedule. This is the most important section.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-red-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">6. Risk Assessment</h4>
                <p className="text-white text-sm leading-relaxed">
                  What could go wrong and how you will handle it: injury or illness, van breakdown,
                  slow-paying customers, seasonal dips, losing a key client, and regulatory changes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'financial-projections',
    heading: 'Financial Projections: The Numbers That Matter',
    content: (
      <>
        <p>
          Your financial projections must be realistic. Overly optimistic projections are useless —
          they will not convince a bank and they will mislead you into spending money you do not
          have.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h4 className="font-bold text-white mb-4 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-yellow-400" /> Realistic Year 1 Projections (Sole
            Trader, 2026)
          </h4>
          <div className="space-y-3 text-white text-sm">
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Billable hours per week (realistic)</span>
              <strong className="text-yellow-400">25 to 30 hours</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Working weeks per year (minus holidays, illness)</span>
              <strong className="text-yellow-400">46 weeks</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Total billable hours (year 1)</span>
              <strong className="text-yellow-400">1,150 to 1,380</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Average charge-out rate</span>
              <strong className="text-yellow-400">£50 to £55/hour</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Labour revenue (year 1)</span>
              <strong className="text-yellow-400">£57,500 to £75,900</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Material sales (with markup)</span>
              <strong className="text-yellow-400">£15,000 to £25,000</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2 font-bold">
              <span>Total turnover (year 1)</span>
              <strong className="text-yellow-400">£72,500 to £100,900</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Total business costs</span>
              <strong className="text-yellow-400">£25,000 to £35,000</strong>
            </div>
            <div className="flex justify-between pt-2 text-lg font-bold">
              <span>Net profit (before tax)</span>
              <strong className="text-yellow-400">£37,500 to £65,900</strong>
            </div>
          </div>
        </div>
        <p>
          <strong>Important:</strong> Year one will typically start slowly. You may only bill 15 to
          20 hours per week in the first 3 months while building your customer base. Your cash flow
          forecast must account for this ramp-up period.
        </p>
      </>
    ),
  },
  {
    id: 'pricing-strategy',
    heading: 'Pricing Strategy',
    content: (
      <>
        <p>
          Your pricing strategy should be based on your costs plus a profit margin — not on what the
          cheapest competitor charges. There are three common positions:
        </p>
        <div className="grid gap-4 sm:grid-cols-3 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Value</h3>
            <p className="text-white text-sm leading-relaxed">
              Competitive pricing, high volume. Works if you can complete jobs quickly. Risk: thin
              margins mean any problem wipes out your profit.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Mid-Market</h3>
            <p className="text-white text-sm leading-relaxed">
              Fair pricing, good service. Where most successful sole traders position themselves.
              Sustainable margins with a steady flow of work.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Premium</h3>
            <p className="text-white text-sm leading-relaxed">
              Higher prices, fewer jobs, exceptional service and presentation. Requires strong
              branding, reviews, and a reputation. Highest margins.
            </p>
          </div>
        </div>
        <p>
          Your business plan should state which position you are targeting and why. Your pricing,
          marketing, and customer experience must all align with your chosen position.
        </p>
      </>
    ),
  },
  {
    id: 'marketing-plan',
    heading: 'Marketing Plan: Where Will Your Customers Come From?',
    content: (
      <>
        <p>
          "Word of mouth" is not a marketing plan — it is the result of good marketing and good
          work. Your plan needs specific, actionable channels.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="space-y-4 text-white text-sm">
            <div className="border-b border-white/10 pb-3">
              <h4 className="font-bold text-white mb-2">Google Business Profile (Free)</h4>
              <p>
                Claim and optimise your profile. Add photos of completed work, respond to reviews,
                post updates weekly. Target: 10+ five-star reviews in first 3 months. This is the
                single most effective free marketing channel for local trades.
              </p>
            </div>
            <div className="border-b border-white/10 pb-3">
              <h4 className="font-bold text-white mb-2">Lead Platform (£100 to £250/month)</h4>
              <p>
                Checkatrade, MyBuilder, or Bark. Budget for 3 to 6 months to build reviews and
                conversion rate. Track cost per lead and cost per won job. Stop if the cost per won
                job exceeds 10% of the job value.
              </p>
            </div>
            <div className="border-b border-white/10 pb-3">
              <h4 className="font-bold text-white mb-2">Social Media (£50 to £100/month)</h4>
              <p>
                Facebook and Instagram. Post 2 to 3 times per week — before/after photos, tips,
                completed projects. Boost posts in your local area. Join local community groups (do
                not spam — be helpful and the work follows).
              </p>
            </div>
            <div className="pb-3">
              <h4 className="font-bold text-white mb-2">Referral Programme (Low Cost)</h4>
              <p>
                Offer existing customers £25 to £50 off their next job for every referral that
                converts. This systematises word of mouth instead of leaving it to chance.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'growth-strategy',
    heading: 'Growth Strategy: Year 1 to Year 3',
    content: (
      <>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Year 1: Survive and Stabilise</h3>
            <p className="text-white text-sm leading-relaxed">
              Focus on building a customer base, establishing your reputation, and learning the
              business side. Target: £40,000 to £70,000 turnover. Keep costs low — do not hire, do
              not take on expensive premises. Reinvest profits into better tools and marketing.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Year 2: Optimise and Grow</h3>
            <p className="text-white text-sm leading-relaxed">
              Review your pricing (raise rates by 5% to 10%), drop unprofitable work, focus on
              higher-margin jobs. Target: £60,000 to £90,000 turnover. Start building repeat
              customer relationships. Consider whether to add services (EV charging, testing, fire
              alarm).
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Year 3: Scale or Specialise</h3>
            <p className="text-white text-sm leading-relaxed">
              Decision point: hire your first employee and grow, or stay as a sole trader and
              specialise in higher-value work. Target: £80,000 to £120,000+ turnover. If hiring,
              plan for the true cost of employment (salary + 15% to 20% for employer NI, pension,
              insurance, van, tools, training).
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'common-mistakes',
    heading: 'Common Business Plan Mistakes',
    content: (
      <>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Overestimating billable hours</strong> — you will NOT bill 40 hours per
                week. After travel, quoting, material collection, admin, and downtime, 25 to 30
                billable hours is realistic for a sole trader.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ignoring cash flow timing</strong> — you buy materials and pay for fuel on
                day one, but may not get paid for 14 to 30 days. Your cash flow forecast must show
                this gap and your plan for bridging it.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>No contingency fund</strong> — plan for 3 months of expenses as a cash
                buffer. Without it, one slow month or a late-paying customer can put you under.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Copying someone else&apos;s plan</strong> — templates are useful for
                structure, but the numbers must be yours. Your costs, your area, your target market.
                Generic numbers are worse than no numbers.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Plan Your Business, Build Your Future',
    content: (
      <>
        <p>
          A business plan does not need to be perfect — it needs to be honest. Write down your real
          numbers, review them quarterly, and adjust as you learn. The process of planning is more
          valuable than the document itself.
        </p>
        <SEOAppBridge
          title="Run your electrical business from one app"
          description="Elec-Mate handles quoting, certification, invoicing, and job management — so you can focus on the work. 7-day free trial."
          icon={Briefcase}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricalBusinessPlanPage() {
  return (
    <GuideTemplate
      title="Electrical Business Plan Template UK 2026 | Start-Up Guide"
      description="Free electrical business plan template. Financial projections, marketing plan, pricing strategy, and growth roadmap for UK electricians starting or growing a business in 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Business Guide"
      badgeIcon={Briefcase}
      heroTitle={
        <>
          Electrical Business Plan Template:{' '}
          <span className="text-yellow-400">Build a Business, Not Just a Job</span>
        </>
      }
      heroSubtitle="A practical business plan template for UK electricians. Financial projections, pricing strategy, marketing plan, and a realistic growth roadmap from startup to scaling."
      readingTime={15}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrical Business Plans"
      relatedPages={relatedPages}
      ctaHeading="Manage Your Electrical Business in One Place"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for quoting, certification, invoicing, and job management. 7-day free trial, cancel anytime."
    />
  );
}
