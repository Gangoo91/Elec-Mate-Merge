import BusinessTemplate from '@/pages/seo/templates/BusinessTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Calculator,
  Briefcase,
  TrendingUp,
  PoundSterling,
  Wrench,
  Car,
  GraduationCap,
  BarChart3,
  Clock,
  Zap,
  ShieldCheck,
  Receipt,
  FileText,
  Target,
} from 'lucide-react';

const breadcrumbs = [
  { label: 'Business Tools', href: '/tools' },
  { label: 'Equipment ROI Calculator', href: '/tools/equipment-roi-calculator' },
];

const tocItems = [
  { id: 'what-is-roi', label: 'What Is ROI' },
  { id: 'test-equipment', label: 'Test Equipment ROI' },
  { id: 'van-investment', label: 'Van Investment' },
  { id: 'power-tools', label: 'Power Tools' },
  { id: 'training-investment', label: 'Training ROI' },
  { id: 'how-calculator-works', label: 'How the Calculator Works' },
  { id: 'features', label: 'Features' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'ROI (Return on Investment) tells you how long it takes for a purchase to pay for itself through increased revenue, saved time, or reduced costs -- essential for making smart business decisions.',
  'A multifunction tester at GBP 900 that enables you to do testing work worth GBP 150 per day has a payback period of just 6 days of testing work.',
  'A new van at GBP 30,000 on finance may cost more monthly than an older van, but savings on fuel, repairs, and breakdown time can make the total cost of ownership lower.',
  'Training courses like the C&G 2391 or EV charger installation cost GBP 500-GBP 1,500 but unlock work worth GBP 10,000+ per year that you cannot otherwise do.',
  'The equipment ROI calculator factors in purchase cost, financing, expected lifespan, maintenance costs, and the revenue or time savings the investment generates.',
];

const stats = [
  { value: '6 days', label: 'Typical payback on a multifunction tester' },
  { value: 'GBP 10k+', label: 'Extra annual revenue from 2391 qualification' },
  { value: '3-5 yrs', label: 'Typical lifespan of professional test equipment' },
  { value: '43%', label: 'Average ROI on professional training investment' },
];

const faqs = [
  {
    question: 'How do I calculate ROI on test equipment?',
    answer:
      'To calculate the ROI on test equipment, you need to know the purchase cost, the expected lifespan, any ongoing costs (calibration, batteries, accessories), and the revenue it enables. For a multifunction tester costing GBP 900 with annual calibration at GBP 80, the total 5-year cost is approximately GBP 1,300. If the tester enables you to carry out EICR inspections, EIC certification, and periodic testing work that generates GBP 150-GBP 300 per day, the payback period is just 5-9 days of testing work. Over 5 years, assuming you do testing work 2 days per week (100 days per year), the tester generates GBP 75,000-GBP 150,000 in revenue against a GBP 1,300 cost -- an ROI of 5,670% to 11,438%. The Elec-Mate Equipment ROI Calculator performs this calculation automatically, including financing costs if you purchase on credit.',
  },
  {
    question: 'Should I buy a new or used van?',
    answer:
      'The decision between a new and used van depends on your financial situation and how you value reliability versus upfront cost. A new Ford Transit Custom costs approximately GBP 30,000-GBP 35,000 and comes with a manufacturer warranty (typically 3 years), lower maintenance costs, better fuel economy, and zero unexpected repair bills in the early years. On finance, the monthly payment might be GBP 400-GBP 600. A 3-year-old used Transit Custom costs approximately GBP 15,000-GBP 22,000 but may need servicing, tyres, and repairs sooner, and will not have the latest fuel efficiency improvements. The ROI calculator compares total cost of ownership over 5 years including purchase price (or finance costs), fuel, insurance, servicing, MOT, road tax, repairs, and depreciation. For many electricians, a nearly-new van (1-2 years old, ex-demo or short-term lease return) offers the best balance of cost and reliability.',
  },
  {
    question: 'Is the C&G 2391 worth the investment?',
    answer:
      'The City and Guilds 2391 (or 2394/2395) inspection and testing qualification typically costs GBP 600-GBP 1,200 for the course plus GBP 100-GBP 200 for the exam. It takes 1-2 weeks of your time. In return, it qualifies you to carry out initial verification (EIC) and periodic inspection and testing (EICR) and to sign off the results. This opens up a significant revenue stream: a domestic EICR typically charges GBP 150-GBP 250 and takes 2-4 hours. A commercial EICR can charge GBP 500-GBP 2,000+ depending on the installation size. If you do just 2 EICRs per week at GBP 180 average, that is GBP 18,720 per year of additional revenue. Against a one-off cost of GBP 1,000 and a week of time, the payback period is approximately 3 weeks. The 2391 is widely regarded as the single most valuable qualification investment for electricians after the 18th Edition.',
  },
  {
    question: 'How do I calculate the payback period on a tool purchase?',
    answer:
      "The payback period is the time it takes for the tool to generate enough revenue (or save enough cost) to cover its purchase price. The formula is: Payback Period = Purchase Cost divided by (Daily Revenue Enabled minus Daily Running Cost). For example, a GBP 300 cordless SDS drill that saves you 30 minutes per day compared to a corded drill (by eliminating setup time, extension leads, and RCD units) effectively saves you GBP 22.50 per day at a GBP 45/hour rate. The payback period is GBP 300 divided by GBP 22.50 = 13.3 working days -- roughly 2.5 weeks. After that, every day you use it is pure time saving. The Elec-Mate calculator handles more complex scenarios including financing, maintenance costs, and diminishing returns over the tool's lifespan.",
  },
  {
    question: 'Should I buy or lease equipment?',
    answer:
      "Buying gives you ownership and no ongoing payments once the item is paid for, but requires the full amount upfront (or a finance agreement). Leasing gives you access to the latest equipment with lower monthly payments, but you never own the item and the total cost over the lease period is usually higher than buying outright. For test equipment with a 5-year lifespan, buying is almost always more cost-effective -- the total finance cost over 5 years is typically 10-15% more than the cash price, whereas leasing can be 30-40% more. For vehicles, leasing can make sense because depreciation is highest in the first 3 years and a lease lets you hand the van back before the expensive maintenance years. Elec-Mate's ROI calculator compares the total cost of buying (cash or finance) versus leasing for any piece of equipment.",
  },
  {
    question: 'What is the ROI on EV charger installation training?',
    answer:
      'EV charger installation training (such as the City and Guilds 2919 or manufacturer-specific courses) typically costs GBP 300-GBP 800 and takes 1-3 days. The UK EV charger market is growing rapidly, with over 300,000 domestic charge points installed in 2025. A typical domestic EV charger installation charges GBP 800-GBP 1,200 (including the unit) with a profit margin of 30-40%, giving GBP 240-GBP 480 profit per installation. If you do just 2 EV installations per month, that is GBP 5,760-GBP 11,520 per year of additional profit. Against a training cost of GBP 500 and 2 days of your time, the payback period is less than 1 month. The brand-specific training also gives you access to manufacturer referral networks which generate leads.',
  },
];

const features = [
  {
    icon: Calculator,
    title: 'Payback Period Calculator',
    description:
      'Enter the purchase cost, running costs, and expected revenue or time savings. See exactly how many days or weeks it takes for the investment to pay for itself.',
  },
  {
    icon: TrendingUp,
    title: 'Lifetime ROI Analysis',
    description:
      "See the total return over the equipment's expected lifespan. A GBP 900 tester generating GBP 15,000+ per year over 5 years has a very different ROI from a GBP 900 tool used twice a month.",
  },
  {
    icon: PoundSterling,
    title: 'Buy vs Lease Comparison',
    description:
      'Compare the total cost of buying (cash or finance) versus leasing. See which option is cheapest over 3, 5, and 7 year periods.',
  },
  {
    icon: BarChart3,
    title: 'Revenue Impact Projection',
    description:
      'Project how much additional revenue or profit a tool, qualification, or vehicle will generate over its lifetime. Based on your actual charge rates and workload.',
  },
  {
    icon: Clock,
    title: 'Time Savings Calculator',
    description:
      'Calculate the value of time saved by a faster or more efficient tool. Convert minutes saved per job into annual revenue at your hourly rate.',
  },
  {
    icon: Target,
    title: 'Investment Priority Ranking',
    description:
      'Compare multiple potential purchases side by side. See which investment has the shortest payback and highest lifetime ROI to prioritise your spending.',
  },
];

const sections = [
  {
    id: 'what-is-roi',
    heading: 'What Is ROI and Why Does It Matter for Electricians',
    content: (
      <>
        <p>
          ROI -- Return on Investment -- is the simplest and most powerful tool for making business
          decisions. It answers one question: if I spend this money, will I get more back than I put
          in, and how quickly? For electricians, who regularly face decisions about buying tools,
          test equipment, vehicles, and training courses, ROI thinking is the difference between
          smart investment and wasted money.
        </p>
        <p>
          <strong className="text-yellow-400">The basic ROI formula is:</strong> ROI = (Gain from
          Investment minus Cost of Investment) divided by Cost of Investment, expressed as a
          percentage. A 100% ROI means you doubled your money. A 500% ROI means you got back five
          times what you spent.
        </p>
        <p>
          <strong className="text-yellow-400">The payback period</strong> is the complementary
          metric: how long it takes for the investment to pay for itself. A GBP 900 multifunction
          tester that enables GBP 150 per day of testing work has a payback period of 6 days. After
          that, every day of testing work is pure profit contribution. A GBP 1,200{' '}
          <SEOInternalLink href="/courses/city-guilds-2391">C&G 2391 course</SEOInternalLink> that
          unlocks GBP 18,000 per year of inspection work has a payback period of about 3 weeks.
        </p>
        <p>
          Most electricians make investment decisions based on gut feeling -- "I need a new drill"
          or "everyone is doing EV chargers". ROI analysis replaces gut feeling with data. It does
          not tell you what to buy -- it tells you what to buy <em>first</em>, and whether the
          investment makes financial sense at all.
        </p>
      </>
    ),
  },
  {
    id: 'test-equipment',
    heading: 'Test Equipment ROI: Is the Upgrade Worth It?',
    content: (
      <>
        <p>
          Test equipment is one of the best investments an electrician can make, because it directly
          enables revenue-generating work. Without a{' '}
          <SEOInternalLink href="/guides/electrician-tool-list-uk">
            multifunction tester
          </SEOInternalLink>
          , you cannot carry out initial verification, periodic inspection, or produce electrical
          certificates. With one, you unlock the entire testing and certification market.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">Multifunction Tester ROI Example</h3>
          <ul className="space-y-2 text-white">
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Purchase cost:</strong> GBP 900 (Megger MFT1741 or equivalent)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Annual calibration:</strong> GBP 80
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>5-year total cost:</strong> GBP 1,300
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Revenue per testing day:</strong> GBP 150-GBP 300
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Testing days per year:</strong> 50-100 (1-2 days per week)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>5-year revenue enabled:</strong> GBP 37,500-GBP 150,000
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>5-year ROI:</strong> 2,785% to 11,438%
              </span>
            </li>
          </ul>
        </div>
        <p>
          When comparing models, the ROI calculation helps you decide whether the premium model is
          worth the extra cost. A GBP 1,200 tester with Bluetooth data download might save you 15
          minutes per test compared to a GBP 700 model without it. If you do 100 tests per year,
          that is 25 hours saved -- worth GBP 1,125 at GBP 45 per hour. The GBP 500 premium pays for
          itself in under 6 months.
        </p>
      </>
    ),
  },
  {
    id: 'van-investment',
    heading: 'Van Investment: Total Cost of Ownership',
    content: (
      <>
        <p>
          Your van is probably your single biggest business asset and your largest ongoing cost. The
          decision between new, nearly-new, or used -- and between buying, financing, and leasing --
          has a significant impact on your annual costs and therefore your pricing and
          profitability.
        </p>
        <p>
          <strong className="text-yellow-400">Total cost of ownership (TCO)</strong> is the right
          metric, not just the purchase price. TCO includes the purchase price (or total
          finance/lease payments), fuel costs, insurance, road tax, servicing and MOT, repairs,
          breakdown cover, and depreciation (the loss of value over time). A GBP 15,000 used van
          that needs GBP 2,000 of repairs per year and gets 30 mpg may cost more to own over 5 years
          than a GBP 30,000 new van on finance that needs minimal repairs and gets 40 mpg.
        </p>
        <p>
          Elec-Mate's Equipment ROI Calculator handles van TCO comparisons. Enter the purchase price
          (or monthly finance/lease payment), estimated annual mileage, fuel efficiency, insurance
          cost, and expected maintenance costs. The calculator shows the annual and monthly cost of
          ownership for each option, making it easy to compare. It also factors in the tax treatment
          -- a sole trader can either claim HMRC mileage rates or deduct actual vehicle costs, and
          the calculator shows which is more beneficial.
        </p>
        <p>
          For electricians considering their{' '}
          <SEOInternalLink href="/guides/electrician-van-setup">first van setup</SEOInternalLink> or
          upgrading from a small to a medium van, the calculator also models the revenue impact. A
          larger van that carries more stock reduces trips to the wholesaler. A van with proper{' '}
          <SEOInternalLink href="/guides/electrician-van-setup">racking</SEOInternalLink> saves
          10-15 minutes per day in finding tools and materials. These time savings translate into
          revenue.
        </p>
        <SEOAppBridge
          title="Van Cost Comparison"
          description="Compare the total cost of owning different vans over 3, 5, or 7 years. Factor in finance, fuel, insurance, maintenance, and depreciation. See which option gives you the lowest cost per mile."
          icon={Car}
        />
      </>
    ),
  },
  {
    id: 'power-tools',
    heading: 'Power Tool ROI: Speed Equals Money',
    content: (
      <>
        <p>
          Power tool purchases are often driven by brand loyalty or what is on sale at the tool
          shop. But the right tool for the job -- and the right <em>quality</em> of tool -- can have
          a measurable impact on your productivity and therefore your earnings.
        </p>
        <p>
          <strong className="text-yellow-400">Time is the key metric.</strong> A cordless SDS drill
          that eliminates the need for extension leads, RCDs, and finding a socket on site might
          save 10-15 minutes per use. If you use it 3 times per day, that is 30-45 minutes per day
          saved. At GBP 45 per hour, that is GBP 22 to GBP 34 per day in time savings. A GBP 350
          drill pays for itself in 10-16 working days.
        </p>
        <p>
          Similarly, a high-quality cable stripper that processes cable 3 times faster than a basic
          one might only save 5 minutes per use, but used 10 times per day on a rewire, that is 50
          minutes -- nearly an hour per day. A GBP 80 cable stripper paying for itself in 2-3 days.
        </p>
        <p>
          The calculator also considers durability. A GBP 150 impact driver that lasts 5 years has a
          daily cost of GBP 0.13 (over 1,150 working days). A GBP 60 budget impact driver that lasts
          18 months has a daily cost of GBP 0.17 and needs replacing more often. The premium tool is
          cheaper per day <em>and</em>
          more reliable. For a full guide on essential tools, see our{' '}
          <SEOInternalLink href="/guides/electrician-tool-list-uk">
            electrician tool list
          </SEOInternalLink>
          .
        </p>
      </>
    ),
  },
  {
    id: 'training-investment',
    heading: 'Training ROI: Qualifications That Pay for Themselves',
    content: (
      <>
        <p>
          Training is the highest-ROI investment most electricians can make, because it unlocks
          entirely new revenue streams. Unlike a tool (which helps you do existing work faster), a
          qualification lets you do work you could not do before.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">Training Investment Comparison</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>C&G 2391 (Inspection & Testing):</strong> Cost GBP 600-GBP 1,200. Unlocks
                EICR and EIC certification work. Estimated additional revenue: GBP 10,000-GBP 20,000
                per year. Payback: 3-6 weeks.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>EV Charger Installation (C&G 2919):</strong> Cost GBP 300-GBP 800. Unlocks
                domestic and commercial EV charger installations. Estimated additional revenue: GBP
                5,000-GBP 15,000 per year. Payback: 1-3 months.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Fire Alarm (BS 5839):</strong> Cost GBP 400-GBP 900. Unlocks fire alarm
                installation, commissioning, and servicing. Estimated additional revenue: GBP
                8,000-GBP 15,000 per year. Payback: 2-4 months.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Solar PV (C&G 2399):</strong> Cost GBP 500-GBP 1,200. Unlocks domestic and
                commercial solar installations. Estimated additional revenue: GBP 10,000-GBP 25,000
                per year. Payback: 2-5 months.
              </span>
            </li>
          </ul>
        </div>
        <p>
          When calculating training ROI, factor in the opportunity cost of the days you spend in the
          classroom instead of earning. A 5-day course means GBP 1,125 in lost earnings (at GBP 225
          per day). Add this to the course fee for the true investment cost. Even with this
          adjustment, the ROI on most electrical training courses is extraordinary -- typically 500%
          to 2,000% in the first year alone.
        </p>
        <p>
          Elec-Mate's <SEOInternalLink href="/study-centre">Study Centre</SEOInternalLink> includes
          36+ training courses covering the 18th Edition, inspection and testing, EV chargers, fire
          alarms, solar PV, and business skills. All accessible within your subscription.
        </p>
      </>
    ),
  },
  {
    id: 'how-calculator-works',
    heading: 'How the Equipment ROI Calculator Works',
    content: (
      <>
        <p>
          Elec-Mate's Equipment ROI Calculator guides you through a structured analysis of any
          potential investment. You do not need to be a financial analyst -- the calculator asks the
          right questions and does the maths.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">Calculator Inputs</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Purchase cost:</strong> The price of the equipment, training course, or
                vehicle. If financing, enter the deposit and monthly payment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Running costs:</strong> Annual maintenance, calibration, fuel, insurance, or
                any recurring costs associated with the investment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Expected lifespan:</strong> How many years you expect the equipment to last
                before replacement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Revenue enabled:</strong> The daily, weekly, or annual revenue the
                investment will generate (or the time/cost it will save).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Usage frequency:</strong> How often you will use the equipment -- daily,
                weekly, monthly, or a specific number of days per year.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The calculator produces a clear output: payback period (in days, weeks, or months), total
          lifetime ROI as a percentage, annual return, and a month-by-month cash flow projection
          showing when the investment breaks even. If you are comparing multiple investments, the
          priority ranking view shows all of them side by side, ordered by payback speed and
          lifetime ROI.
        </p>
        <p>
          The calculator is part of the Business Hub alongside 13 other business tools including the{' '}
          <SEOInternalLink href="/tools/job-profitability-calculator">
            job profitability calculator
          </SEOInternalLink>
          , <SEOInternalLink href="/tools/cash-flow-planner">cash flow planner</SEOInternalLink>,
          and{' '}
          <SEOInternalLink href="/tools/expenses-manager-electrician">
            expenses manager
          </SEOInternalLink>
          .
        </p>
        <SEOAppBridge
          title="Equipment ROI Calculator"
          description="Enter the cost, running expenses, and expected revenue for any investment. See the payback period, lifetime ROI, and whether the purchase makes financial sense. Compare multiple investments to prioritise your spending."
          icon={Calculator}
        />
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/guides/electrician-tool-list-uk',
    title: 'Electrician Tool List UK',
    description: 'Complete guide to essential tools, test equipment, and PPE for UK electricians.',
    icon: Wrench,
    category: 'Guide',
  },
  {
    href: '/guides/electrician-van-setup',
    title: 'Electrician Van Setup',
    description: 'Best vans, racking systems, tool organisation, and security for electricians.',
    icon: Car,
    category: 'Guide',
  },
  {
    href: '/tools/job-profitability-calculator',
    title: 'Job Profitability Calculator',
    description:
      'Calculate true profit margins on every job including all labour and overhead costs.',
    icon: BarChart3,
    category: 'Business Tool',
  },
  {
    href: '/tools/cash-flow-planner',
    title: 'Cash Flow Planner',
    description: 'Forecast your cash position and plan major purchases around income timing.',
    icon: TrendingUp,
    category: 'Business Tool',
  },
  {
    href: '/tools/expenses-manager-electrician',
    title: 'Expenses Manager',
    description:
      'Track all business expenses including tools, equipment, and vehicle costs for tax.',
    icon: Receipt,
    category: 'Business Tool',
  },
  {
    href: '/guides/how-to-price-electrical-jobs',
    title: 'How to Price Electrical Jobs',
    description: 'Pricing methodology including overhead allocation for tools and equipment.',
    icon: PoundSterling,
    category: 'Business Guide',
  },
];

export default function EquipmentROICalculatorPage() {
  return (
    <BusinessTemplate
      title="Equipment ROI Calculator | Tool Investment Tool"
      description="Calculate the return on investment for test equipment, vans, tools, and training courses. See payback periods, lifetime ROI, and compare investments side by side. Built for UK electricians."
      datePublished="2025-06-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Business Tools"
      badgeIcon={Calculator}
      heroTitle={
        <>
          Equipment ROI Calculator <span className="text-yellow-400">for UK Electricians</span>
        </>
      }
      heroSubtitle="Is that new tester worth it? Should you upgrade your van? Will the 2391 course pay for itself? The Equipment ROI Calculator answers these questions with data, not gut feeling."
      readingTime={9}
      keyTakeaways={keyTakeaways}
      stats={stats}
      sections={sections}
      features={features}
      featuresHeading="ROI Calculator Features"
      featuresSubheading="Make smarter investment decisions with data-driven analysis built for electrical businesses."
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Equipment ROI"
      relatedPages={relatedPages}
      ctaHeading="Make Smarter Investment Decisions"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for business calculations, job costing, and financial planning. 7-day free trial, cancel anytime."
      pagePath="/tools/equipment-roi-calculator"
    />
  );
}
