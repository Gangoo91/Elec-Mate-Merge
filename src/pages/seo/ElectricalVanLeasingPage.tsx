import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  PoundSterling,
  Truck,
  FileCheck2,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Building2,
  TrendingUp,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Business Guides', href: '/guides/electrical-business-growth' },
  { label: 'Electrician Van Leasing', href: '/electrical-van-leasing' },
];

const tocItems = [
  { id: 'lease-vs-hp-vs-purchase', label: 'Lease vs HP vs Outright Purchase' },
  { id: 'tax-benefits-leasing', label: 'Tax Benefits of Leasing' },
  { id: 'benefit-in-kind', label: 'Benefit in Kind (Personal Use)' },
  { id: 'popular-vans', label: 'Popular Vans for Electricians' },
  { id: 'typical-costs', label: 'Typical Monthly Costs' },
  { id: 'what-to-include', label: 'What to Include in the Lease' },
  { id: 'maintenance-packages', label: 'Maintenance Packages' },
  { id: 'for-electricians', label: 'Managing Your Van for Business' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'For VAT-registered electricians, leasing a van allows 100% of the VAT on monthly rental payments to be reclaimed, provided the van is used exclusively for business purposes — making leasing highly tax-efficient.',
  'Finance lease and contract hire (operating lease) payments are 100% deductible against business profits for sole traders and partnerships. For limited companies, lease payments reduce corporation tax.',
  'The most popular vans among UK electricians in 2025 are the Ford Transit Custom, Vauxhall Vivaro, Mercedes-Benz Sprinter, and Stellantis (Peugeot Expert / Citroën Dispatch / Fiat Scudo), offering the best combination of payload, racking compatibility, and reliability.',
  'If a van is available for private use, a Benefit in Kind (BIK) charge arises. The 2025/26 van BIK is a flat rate of £4,020, generating an income tax charge of £806 at 20% or £1,609 at 40%.',
  'Always read the annual mileage limit in a contract hire lease carefully — excess mileage charges (typically 5–15p per mile) can turn an apparently good deal into an expensive one for high-mileage electricians.',
];

const faqs = [
  {
    question: 'What is the difference between contract hire and finance lease for a van?',
    answer:
      'Contract hire (also called operating lease) means you rent the van for a fixed period and return it at the end — you never own it. Monthly payments are fully tax-deductible and VAT is fully reclaimable if the van is used exclusively for business. Finance lease is similar but you typically take responsibility for the residual value at the end — you can sell the van and keep most of the proceeds, or continue leasing. Finance lease is better if you want the option of keeping or selling the van; contract hire is better if you want certainty and want the leasing company to take the residual value risk.',
  },
  {
    question: 'Can I reclaim 100% of the VAT on van lease payments?',
    answer:
      'Yes — if you are VAT registered and the van is used exclusively for business purposes. Unlike cars, commercial vans qualify for 100% VAT recovery on lease payments, maintenance contracts, fuel (using the fuel scale charge method), and accessories fitted before delivery. If the van is available for private use (even incidentally), HMRC may restrict the VAT reclaim. Most electricians who take their van home each evening can still reclaim 100% VAT, provided they can demonstrate the van is not available for private journeys — keeping mileage logs and a clear company vehicle policy helps.',
  },
  {
    question: 'What is the Benefit in Kind charge for a company van?',
    answer:
      'If a van is made available for private use, HMRC charges a Benefit in Kind (BIK) on the employee (or director). For 2025/26, the van BIK flat rate is £4,020. This is added to your taxable income: a basic rate taxpayer pays 20% of £4,020 = £804 in additional income tax per year. A higher rate taxpayer pays 40% = £1,608. There is also a separate fuel benefit charge if the employer provides fuel for private journeys (£769 flat rate for 2025/26). If the van is genuinely only used for business and commuting to a temporary workplace, no BIK arises.',
  },
  {
    question: 'How long is a typical van lease for an electrician?',
    answer:
      "Standard contract hire agreements run for 24, 36, or 48 months. For electricians, 36 or 48 months is most common — this keeps monthly payments lower and gives you a new van every three to four years with a full manufacturer warranty. Shorter terms have higher monthly payments but give more flexibility if your business needs change. The initial rental (effectively a deposit) is typically equivalent to three to six months' rental payments and is not refundable if you end the lease early.",
  },
  {
    question: 'What happens if I exceed the mileage limit on my van lease?',
    answer:
      'Excess mileage is charged at a rate agreed at the start of the contract — typically 5p to 15p per mile depending on the leasing company and the van. On a 10,000-mile excess, this means charges of £500 to £1,500 at the end of the contract. To avoid this, estimate your mileage accurately at the outset (most electricians underestimate), or build in a small buffer (10 to 15% above your expected mileage). Some leasing companies will adjust the mileage limit mid-contract for a small fee, which is usually cheaper than paying excess mileage charges at the end.',
  },
  {
    question: 'Is hire purchase better than leasing for an electrician?',
    answer:
      'Hire purchase (HP) allows you to own the van at the end of the agreement after making fixed monthly payments plus a final "option to purchase" fee. Unlike leasing, HP payments are not fully tax-deductible — only the interest portion and the annual capital allowances on the van\'s value can be claimed. However, HP gives you ownership of an asset that appears on your balance sheet. For sole traders, leasing is typically more tax-efficient. For limited companies, the comparison is more nuanced and depends on the van\'s CO2 emissions and the corporation tax capital allowance regime. Speak to your accountant before committing.',
  },
  {
    question: 'What credit checks do leasing companies run?',
    answer:
      'Van leasing companies carry out credit checks before approving an application. They look at personal credit history (for sole traders) or company credit history (for limited companies), trading history (most prefer at least 12 months of accounts), and existing financial commitments. Newly started businesses or those with poor credit history may find it harder to get approval or may face higher rates. In these cases, a balloon payment HP deal through a specialist lender, or outright purchase, may be more accessible than contract hire. Improving your business credit score and maintaining clean personal credit helps when it comes to renewal.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/electrician-tool-insurance-2025',
    title: 'Electrician Tool Insurance 2025',
    description: "What's covered, what's excluded, and how to choose the right policy.",
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/electrical-salary-benchmarking',
    title: 'Electrician Salary Benchmarking',
    description: 'JIB grade rates, London weighting, and regional pay variations.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-business-growth',
    title: 'Growing Your Electrical Business',
    description: 'Strategies for scaling from sole trader to employer.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Quote jobs quickly including van costs and travel time in your pricing.',
    icon: FileCheck2,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'lease-vs-hp-vs-purchase',
    heading: 'Lease vs Hire Purchase vs Outright Purchase',
    content: (
      <>
        <p>
          Choosing the right finance method for your van has significant tax and cash flow
          implications. The best option depends on your VAT registration status, the structure of
          your business, and how much flexibility you need.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Truck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Contract hire (operating lease)</strong> — fixed monthly payments for a set
                term (24 to 48 months). You return the van at the end. Payments are 100%
                tax-deductible. VAT is 100% reclaimable if the van is used exclusively for business.
                No residual value risk. Best for VAT-registered electricians who want simplicity and
                predictable costs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Truck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Finance lease</strong> — similar to contract hire but you bear the residual
                value risk at the end of the term. You typically sell the van (the leasing company
                takes a portion of the proceeds) or make a lump sum payment to own it. Slightly more
                flexible than contract hire for those who want the option to keep the van.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Truck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Hire purchase (HP)</strong> — you pay a deposit (typically 10 to 20%), then
                fixed monthly instalments, then a small option to purchase fee. You own the van at
                the end. Only the interest portion of HP payments is tax-deductible. The van's
                capital cost is recovered via Annual Investment Allowance (AIA) — allowing 100% of
                the cost in Year 1 for most businesses. Good for those who want to own the van and
                benefit from full capital allowances.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Truck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Outright purchase</strong> — maximum flexibility, no monthly commitments, no
                mileage limits. Tax relief via Annual Investment Allowance (AIA) in Year 1. Best for
                businesses with strong cash reserves that want to minimise ongoing costs. Less
                favourable for cash flow in Year 1 due to the upfront outlay.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'tax-benefits-leasing',
    heading: 'Tax Benefits of Leasing for Electricians',
    content: (
      <>
        <p>
          Van leasing is tax-efficient for the majority of electricians, particularly those who are
          VAT registered. Understanding the tax treatment helps you compare leasing against the
          alternatives on a true after-tax cost basis.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>100% VAT reclaim</strong> — if you are VAT registered and the van is used
                exclusively for business, reclaim 100% of the VAT on each monthly rental payment. On
                a £400/month ex-VAT lease, you reclaim £80/month in VAT — £960 per year.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Income tax / corporation tax deduction</strong> — lease payments are a
                business expense, deductible against profits. A sole trader in the higher rate tax
                band saves 40% of the lease cost in income tax. On £400/month ex-VAT, the net
                after-tax cost is £240/month — a significantly different proposition to the headline
                rental.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>No depreciation risk</strong> — you never own the van, so you are never
                exposed to the risk of its value falling more than expected. Electric van values in
                particular have been volatile — contract hire insulates you from this risk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fixed cost for budgeting</strong> — contract hire gives you a fixed monthly
                cost for the term, making budgeting straightforward. No unexpected repair bills if
                you add a maintenance package, and no worry about residual value at the end.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'benefit-in-kind',
    heading: 'Benefit in Kind: Avoiding Unexpected Tax',
    content: (
      <>
        <p>
          Benefit in Kind (BIK) arises when an employer makes a company van available for private
          use by an employee or director. For most sole traders and owner-managed businesses, this
          is a real consideration — particularly if you take the van home each evening.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>2025/26 van BIK rate — £4,020</strong> — this is added to your taxable
                income. Basic rate taxpayer: £804 extra tax. Higher rate taxpayer: £1,608 extra tax.
                Employer (or yourself as director) also pays Class 1A NIC at 13.8% on the BIK value:
                approximately £555 per year.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fuel benefit — £769 flat rate</strong> — if you (or your company) pay for
                fuel used on private journeys, an additional fuel benefit charge of £769 applies for
                2025/26. This stacks on top of the van BIK.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Avoiding BIK — business use only</strong> — if the van is genuinely only
                used for business travel (including travelling to temporary workplaces), no BIK
                arises. HMRC allows commuting to a temporary workplace (where you work for less than
                24 months) as business travel. Keep a mileage log and have a written company vehicle
                policy to evidence business-only use if HMRC ever enquires.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'popular-vans',
    heading: 'Popular Vans for Electricians in 2025',
    content: (
      <>
        <p>
          The right van for an electrician depends on the type of work, load requirements, and
          travel pattern. Here are the most popular choices among UK electricians in 2025, with
          their key characteristics.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Truck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ford Transit Custom (SWB)</strong> — the most popular electrician's van in
                the UK. 1,000 to 1,200kg payload, excellent racking compatibility, strong dealer
                network, and widespread parts availability. The 2.0L EcoBlue diesel is reliable and
                economical. A good mid-size option for domestic and light commercial work. Available
                as plug-in hybrid from 2024.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Truck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Vauxhall Vivaro / Peugeot Expert / Citroën Dispatch / Fiat Scudo</strong> —
                the Stellantis platform vans are popular alternatives offering competitive lease
                rates, good payload (typically 900 to 1,100kg), and an efficient diesel powertrain.
                Electric versions (e-Vivaro, e-Expert) available with up to 200 miles WLTP range —
                viable for electricians not travelling excessive daily distances.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Truck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mercedes-Benz Sprinter (MWB)</strong> — the choice for electricians on
                larger commercial or industrial projects who need maximum load space. 900 to 1,200kg
                payload in MWB form. Higher lease cost than Transit Custom but excellent build
                quality and strong residual values. Available with diesel or plug-in electric
                drivetrains.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Truck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Volkswagen Transporter T6.1 / T7</strong> — popular with electricians who
                value comfort and brand image on customer-facing domestic work. Slightly lower
                payload (around 800 to 1,000kg) but excellent reliability and strong residual
                values. Commands higher lease rates than equivalent Transit Custom.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'typical-costs',
    heading: 'Typical Monthly Lease Costs for Electricians (2025)',
    content: (
      <>
        <p>
          Van lease costs vary significantly depending on the van model, term length, annual mileage
          allowance, and your credit profile. The costs below are indicative ex-VAT figures for
          36-month contract hire at 10,000 miles per year, with a 3-month initial rental.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ford Transit Custom SWB (diesel)</strong> — approximately £280 to £380 per
                month ex-VAT. Initial rental: approximately £840 to £1,140. Total 3-year commitment:
                approximately £11,000 to £14,700 ex-VAT before VAT reclaim.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Vauxhall Vivaro SWB (diesel)</strong> — approximately £250 to £340 per month
                ex-VAT. Often slightly cheaper than the Transit Custom on comparable specs. Initial
                rental: approximately £750 to £1,020.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mercedes-Benz Sprinter MWB (diesel)</strong> — approximately £380 to £500
                per month ex-VAT. Higher initial rental: approximately £1,140 to £1,500. Justified
                for larger-volume work where the additional load space generates revenue.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electric van premium</strong> — electric versions of the above vans
                typically carry a £50 to £150/month premium over diesel equivalents. This premium is
                partially offset by lower fuel costs (charging vs diesel) and lower servicing costs,
                but the payback period depends heavily on mileage and charging costs.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Always compare quotes from multiple lease brokers and manufacturer finance arms. Lease
          deals change monthly and significant savings are available by timing your agreement around
          end-of-quarter fleet deals from manufacturers.
        </p>
      </>
    ),
  },
  {
    id: 'what-to-include',
    heading: 'What to Include in the Lease Agreement',
    content: (
      <>
        <p>
          Before signing a contract hire agreement, ensure you have considered and negotiated the
          following key terms. Many electricians focus only on the monthly payment and overlook
          conditions that can be expensive at the end of the term.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Annual mileage limit</strong> — set this accurately. Most electricians
                underestimate mileage. If you drive 20,000 miles per year and agree a 10,000-mile
                contract, excess mileage charges can easily double your effective monthly cost.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fair wear and tear</strong> — leasing companies assess the van on return
                against the BVRLA (British Vehicle Rental and Leasing Association) Fair Wear and
                Tear guide. Working vans pick up dents and scratches. Understand what is acceptable
                and consider professional repair of any damage in the final few months of the lease.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Racking and accessories</strong> — confirm whether you can fit racking, roof
                bars, or other accessories to the van. Most leasing companies permit professional
                racking that can be removed without damage, but always get written confirmation.
                Accessories fitted by the leasing company (e.g., reversing cameras, ply lining) can
                often be added to the contract.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Early termination</strong> — understand the cost of ending the lease early.
                Most contract hire agreements require you to pay 50 to 100% of remaining rentals on
                early termination. This can be very costly if your business circumstances change.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'maintenance-packages',
    heading: 'Maintenance Packages',
    content: (
      <>
        <p>
          Many leasing companies offer a maintenance package alongside contract hire, covering
          routine servicing, tyres, and breakdowns for a fixed additional monthly cost. For
          electricians, this can be excellent value.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>What's typically covered</strong> — all scheduled servicing, MOT (from Year
                3), tyres (subject to a fair wear and tear policy), replacement pads and discs, and
                breakdown assistance. Some packages also include replacement vehicle cover, which is
                particularly valuable for electricians who cannot work without transport.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Typical cost</strong> — maintenance packages for a mid-size diesel van add
                approximately £30 to £60 per month to the lease cost. This is fully tax-deductible
                and VAT-reclaimable on the same basis as the lease rental.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Is it worth it?</strong> — for high-mileage vans (15,000+ miles per year)
                the package is generally worth taking. Tyres alone on a working van can cost £400 to
                £600 per axle. For lower mileage, the package is marginal — compare the total
                package cost against your estimated actual maintenance spend.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'Managing Your Van Costs with Elec-Mate',
    content: (
      <>
        <p>
          Your van is one of your biggest business costs — making sure it earns its keep means
          keeping it fully utilised and factoring its cost correctly into every job quote.
          Elec-Mate's{' '}
          <SEOInternalLink href="/tools/electrical-quoting-app">quoting tools</SEOInternalLink> let
          you include van costs, fuel, and travel time automatically in every estimate.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <TrendingUp className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Include Van Costs in Every Quote</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>{' '}
                  to include your daily van cost (lease ÷ working days) and mileage allowance in
                  each quote. Never undercharge because you forgot to recover vehicle costs.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Truck className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Schedule Jobs to Minimise Travel</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/job-scheduling">
                    Elec-Mate scheduler
                  </SEOInternalLink>{' '}
                  to group jobs geographically and reduce unnecessary mileage. Fewer miles means
                  lower fuel costs and a better chance of staying within your lease mileage limit.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote and schedule jobs with Elec-Mate — built for UK electricians"
          description="Join 1,000+ UK electricians using Elec-Mate for quoting, invoicing, job scheduling, and electrical certificates. Include van costs in every quote automatically. 7-day free trial."
          icon={Truck}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricalVanLeasingPage() {
  return (
    <GuideTemplate
      title="Electrician Van Leasing UK | Van Finance Guide for Electricians"
      description="Complete guide to van leasing for electricians in the UK. Lease vs hire purchase vs outright purchase, 100% VAT reclaim on leasing, benefit in kind charges, popular vans (Transit Custom, Vivaro, Sprinter), typical monthly costs, maintenance packages."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Finance Guide"
      badgeIcon={Truck}
      heroTitle={
        <>
          Electrician Van Leasing UK:{' '}
          <span className="text-yellow-400">Complete Finance Guide 2025</span>
        </>
      }
      heroSubtitle="Lease vs hire purchase vs outright purchase for electricians. 100% VAT reclaim on leasing, benefit in kind charges, popular van choices, typical monthly costs, what to check in your lease agreement, and maintenance packages explained."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Van Leasing for Electricians"
      relatedPages={relatedPages}
      ctaHeading="Run your electrical business smarter with Elec-Mate"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for quoting, invoicing, job scheduling, and electrical certificates. 7-day free trial, cancel anytime."
    />
  );
}
