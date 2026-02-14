import BusinessTemplate from '@/pages/seo/templates/BusinessTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import {
  Calculator,
  PoundSterling,
  TrendingUp,
  Truck,
  Shield,
  Wrench,
  Fuel,
  GraduationCap,
  Megaphone,
  BarChart3,
  Receipt,
  Briefcase,
  Clock,
  Target,
} from 'lucide-react';

const PAGE_PATH = '/tools/business-cost-calculator';

export default function BusinessCostCalculatorPage() {
  return (
    <BusinessTemplate
      title="Business Cost Calculator | Electrician Overheads Tool"
      description="Calculate the true running costs of your electrical business. Van costs, tools, insurance, fuel, training, marketing — know exactly what your business costs to operate every month and price your work accordingly."
      datePublished="2025-06-15"
      dateModified="2026-02-13"
      breadcrumbs={[
        { label: 'Business Tools', href: '/tools' },
        { label: 'Business Cost Calculator', href: PAGE_PATH },
      ]}
      tocItems={[
        { id: 'why-know-your-costs', label: 'Why Know Your Costs' },
        { id: 'van-costs', label: 'Van Running Costs' },
        { id: 'tools-equipment', label: 'Tools & Equipment' },
        { id: 'insurance-certification', label: 'Insurance & Certification' },
        { id: 'fuel-travel', label: 'Fuel & Travel' },
        { id: 'training-cpd', label: 'Training & CPD' },
        { id: 'marketing-admin', label: 'Marketing & Admin' },
        { id: 'features', label: 'Elec-Mate Features' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Pages' },
      ]}
      badge="Business Calculators"
      badgeIcon={Calculator}
      heroTitle={
        <>
          Business Cost Calculator
          <span className="block text-yellow-400 mt-1">For UK Electricians</span>
        </>
      }
      heroSubtitle="Most electricians underestimate their true business running costs by 20% or more. This means every quote you send is underpriced. Elec-Mate's Business Cost Calculator captures every overhead — van, tools, insurance, fuel, training, marketing — so you can price your work to cover your real costs and make a genuine profit."
      readingTime={10}
      stats={[
        { value: '£12,000+', label: 'Average annual overheads for a sole trader sparky' },
        { value: '43%', label: 'Of electricians underestimate their true business costs' },
        { value: '£8.50/hr', label: 'Average hidden overhead cost per billable hour' },
        { value: '14', label: 'Business calculators in Elec-Mate' },
      ]}
      keyTakeaways={[
        'Most electricians forget 5 or more overhead categories when pricing jobs, leading to consistent undercharging.',
        'Your true hourly cost includes van, insurance, tools, certification, training, and marketing — not just materials and labour.',
        'Knowing your exact overhead cost per hour lets you set day rates and fixed prices that guarantee profit on every job.',
        'Van costs alone can exceed £6,000 per year when you include lease, fuel, insurance, road tax, MOT, and servicing.',
        'Elec-Mate calculates your total business costs, converts them to an hourly overhead rate, and applies it automatically to every quote.',
      ]}
      sections={[
        {
          id: 'why-know-your-costs',
          heading: 'Why Every Electrician Must Know Their True Business Costs',
          content: (
            <>
              <p>
                If you do not know what your business costs to run, you cannot know whether your
                prices are profitable. It sounds obvious, but the majority of sole trader
                electricians in the UK set their day rate by looking at what competitors charge and
                matching it — without understanding whether that rate actually covers their costs.
                The result is that thousands of skilled electricians work full-time, stay busy, and
                still struggle financially because their prices do not reflect their true overheads.
              </p>
              <p>
                Your business costs fall into two categories:{' '}
                <strong className="text-yellow-400">fixed costs</strong> that you pay regardless of
                how many jobs you do (van lease, insurance, certification fees, phone contract), and{' '}
                <strong className="text-yellow-400">variable costs</strong> that change with your
                workload (fuel, materials, consumables). Both need to be captured and allocated to
                your jobs. If you only track materials and labour when quoting, you are ignoring the
                £10,000 to £20,000 per year of overhead that your business needs to cover.
              </p>
              <p>
                Elec-Mate's Business Cost Calculator walks you through every category of business
                expense, totals them up, and converts them into an hourly overhead rate. This figure
                gets added to your labour rate in the{' '}
                <SEOInternalLink href="/tools/pricing-strategy-electrician">
                  pricing strategy tool
                </SEOInternalLink>{' '}
                and the{' '}
                <SEOInternalLink href="/tools/job-profitability-calculator">
                  job profitability calculator
                </SEOInternalLink>
                , so every quote you produce reflects your real costs.
              </p>
            </>
          ),
          appBridge: {
            title: 'Calculate Your True Business Costs Now',
            description:
              'Elec-Mate captures every business expense — van, tools, insurance, fuel, training, marketing — and converts them into an hourly overhead rate for accurate job pricing.',
            icon: Calculator,
          },
        },
        {
          id: 'van-costs',
          heading: 'Van Running Costs — Your Biggest Single Overhead',
          content: (
            <>
              <p>
                For most UK electricians, the van is the single largest business expense. Whether
                you lease, finance, or own outright, the total cost of running a van typically
                exceeds £6,000 per year. Here is what you need to include:
              </p>
              <p>
                <strong className="text-yellow-400">Lease or finance payments:</strong> A typical
                electrician's van (Ford Transit Custom, Vauxhall Vivaro, or similar) costs £250 to
                £400 per month on a 3 to 4 year lease, or £300 to £500 per month on finance. If you
                own the van outright, you still need to account for depreciation — a van losing
                £3,000 to £5,000 in value per year is a real cost even if no money leaves your bank
                account each month.
              </p>
              <p>
                <strong className="text-yellow-400">Insurance:</strong> Commercial van insurance for
                an electrician with tools-in-transit cover typically costs £1,200 to £2,500 per year
                depending on your age, location, claims history, and the value of tools carried. Do
                not skimp on tools-in-transit cover — losing £5,000 of test equipment and power
                tools to theft can be devastating.
              </p>
              <p>
                <strong className="text-yellow-400">Fuel:</strong> An electrician covering 15,000 to
                25,000 miles per year at current fuel prices will spend £2,500 to £4,500 on diesel
                or petrol. Electric vans reduce this significantly but have higher purchase costs.
              </p>
              <p>
                <strong className="text-yellow-400">Maintenance:</strong> Servicing, MOT, road tax,
                tyres, and repairs typically add another £800 to £1,500 per year. Budget for at
                least two new tyres annually and one unexpected repair.
              </p>
            </>
          ),
        },
        {
          id: 'tools-equipment',
          heading: 'Tools and Equipment Costs',
          content: (
            <>
              <p>
                Your tools and test equipment are essential to doing your job, and they represent a
                significant ongoing investment. A qualified electrician's toolkit — including MFT,
                power tools, hand tools, access equipment, and sundries — can easily be worth £5,000
                to £10,000 at replacement cost. These need replacing, repairing, and calibrating on
                a regular cycle.
              </p>
              <p>
                <strong className="text-yellow-400">Test equipment calibration:</strong> Your
                multifunction tester (MFT) should be calibrated annually, which costs £80 to £150.
                Other instruments (insulation resistance testers, earth loop testers, PAT testers)
                also need periodic calibration. Budget £200 to £400 per year for calibration across
                all your test instruments.
              </p>
              <p>
                <strong className="text-yellow-400">Power tool replacement:</strong> Drills,
                drivers, grinders, and SDS drills have a working life of 2 to 5 years depending on
                use intensity. Batteries degrade over time and need replacing. Budget £500 to £1,000
                per year for power tool maintenance and replacement.
              </p>
              <p>
                <strong className="text-yellow-400">Hand tools and consumables:</strong> Side
                cutters, strippers, screwdrivers, levels, and measuring tools wear out and need
                replacing. Consumable items like drill bits, hole saws, and cutting discs are
                ongoing costs. Budget £300 to £600 per year. Use Elec-Mate's{' '}
                <SEOInternalLink href="/tools/business-analytics-electrician">
                  business analytics dashboard
                </SEOInternalLink>{' '}
                to track these costs over time and spot trends.
              </p>
            </>
          ),
        },
        {
          id: 'insurance-certification',
          heading: 'Insurance and Certification Body Fees',
          content: (
            <>
              <p>
                Insurance and professional registrations are non-negotiable costs for any legitimate
                electrical business. Cutting corners here puts your livelihood at risk.
              </p>
              <p>
                <strong className="text-yellow-400">Public liability insurance:</strong> Essential
                for any electrician working on client premises. Typical cover of £2 million to £5
                million costs £200 to £500 per year for a sole trader. Many commercial clients and
                main contractors require proof of at least £5 million cover.
              </p>
              <p>
                <strong className="text-yellow-400">Professional indemnity insurance:</strong>{' '}
                Covers you if your professional advice or design causes a financial loss. Not all
                electricians carry it, but it is increasingly expected for design work and
                commercial projects. Costs £150 to £400 per year.
              </p>
              <p>
                <strong className="text-yellow-400">Certification body membership:</strong> NICEIC,
                NAPIT, or ELECSA registration typically costs £400 to £800 per year including the
                annual assessment visit. This is the cost of being able to self-certify work under
                Part P of the Building Regulations. Without it, you need to notify Building Control
                for notifiable work, which costs your clients £200 to £400 per job and makes you
                less competitive.
              </p>
              <p>
                Use the{' '}
                <SEOInternalLink href="/tools/vat-scheme-comparison">
                  VAT scheme comparison tool
                </SEOInternalLink>{' '}
                to understand how these costs interact with your VAT position, and the{' '}
                <SEOInternalLink href="/tools/electrician-tax-guide">tax guide</SEOInternalLink> to
                ensure you claim all allowable deductions.
              </p>
            </>
          ),
        },
        {
          id: 'fuel-travel',
          heading: 'Fuel and Travel Expenses',
          content: (
            <>
              <p>
                Fuel and travel costs are often underestimated because they feel like small daily
                expenses. But they accumulate rapidly. An electrician driving 20,000 miles per year
                at 35 mpg and £1.45 per litre of diesel is spending approximately £3,800 on fuel
                alone. Add in parking charges, congestion zone fees (if you work in cities), and
                toll roads, and the annual travel cost can exceed £4,500.
              </p>
              <p>
                <strong className="text-yellow-400">HMRC mileage allowance:</strong> If you use your
                personal vehicle for business (unusual for electricians but possible), you can claim
                45p per mile for the first 10,000 miles and 25p per mile thereafter. If you have a
                dedicated business van, you claim actual fuel costs plus all running expenses.
                Elec-Mate's expense tracker categorises travel costs automatically.
              </p>
              <p>
                <strong className="text-yellow-400">Travel time as a cost:</strong> Beyond the
                direct cost of fuel, travel time is a hidden cost because it is time you cannot bill
                to a client. An electrician spending 1.5 hours per day travelling (average across UK
                tradespeople) loses over 350 billable hours per year. At £40 per hour, that is
                £14,000 of potential income consumed by travel. This is why job selection and
                geographic focus are so important — accepting work too far from your base can
                destroy profitability even on well-priced jobs.
              </p>
            </>
          ),
        },
        {
          id: 'training-cpd',
          heading: 'Training, CPD, and Qualifications',
          content: (
            <>
              <p>
                Continuing professional development is essential to maintain your competence and
                your certification body registration. The electrical industry is evolving rapidly —
                BS 7671 amendments, new technologies like EV charging, solar PV, battery storage,
                and smart home systems all require ongoing learning.
              </p>
              <p>
                <strong className="text-yellow-400">18th Edition updates:</strong> When BS 7671 is
                amended (Amendment 3 was issued in July 2024, with Amendment 4 expected in 2026),
                you may need to attend an update course. These typically cost £150 to £300 for a
                one-day course.
              </p>
              <p>
                <strong className="text-yellow-400">Specialist qualifications:</strong> EV charger
                installation (City & Guilds 2919), solar PV, battery storage, fire alarm systems,
                and emergency lighting courses typically cost £300 to £800 each. These
                qualifications open up new revenue streams, so they are investments as much as costs
                — but they still need budgeting for.
              </p>
              <p>
                <strong className="text-yellow-400">CPD hours:</strong> Your certification body
                requires evidence of ongoing CPD. Elec-Mate's{' '}
                <SEOInternalLink href="/tools/cpd-for-electricians">CPD tracking</SEOInternalLink>{' '}
                feature logs your training automatically. Budget £500 to £1,500 per year for
                training and development, depending on how actively you are expanding your skill
                set. The{' '}
                <SEOInternalLink href="/tools/starting-electrical-business">
                  starting an electrical business guide
                </SEOInternalLink>{' '}
                covers how to plan training investment in your first years.
              </p>
            </>
          ),
        },
        {
          id: 'marketing-admin',
          heading: 'Marketing, Admin, and Hidden Costs',
          content: (
            <>
              <p>
                Marketing and administrative costs are the most frequently forgotten overheads. Many
                electricians do not think of them as "business costs" because they do not involve
                buying physical things — but they consume both money and time.
              </p>
              <p>
                <strong className="text-yellow-400">Marketing costs:</strong> Website hosting and
                maintenance (£100 to £500 per year), Google Ads or local advertising (£50 to £300
                per month), printed materials (business cards, van livery, branded workwear),
                directory listings (Checkatrade, Bark, MyBuilder), and social media management time.
                Even if you rely entirely on word-of-mouth, your van livery and branded workwear are
                marketing costs.
              </p>
              <p>
                <strong className="text-yellow-400">Admin costs:</strong> Accountancy fees (£300 to
                £1,200 per year for a sole trader), software subscriptions (accounting, scheduling,
                certification), phone contract (£20 to £50 per month), stationery and printing.
                Elec-Mate replaces multiple software subscriptions with a single platform — your
                quoting app, invoice app, expense tracker, and certificate system all in one place.
              </p>
              <p>
                <strong className="text-yellow-400">Workwear and PPE:</strong> Steel-toe boots,
                hi-vis, work trousers, and polo shirts need replacing regularly. Specialist PPE for
                specific jobs (arc flash protection, harnesses) is an additional cost. Budget £200
                to £500 per year.
              </p>
              <p>
                The{' '}
                <SEOInternalLink href="/tools/customer-management-electrician">
                  customer management tool
                </SEOInternalLink>{' '}
                helps you track where your work comes from, so you can measure the return on your
                marketing spend and focus on what works.
              </p>
            </>
          ),
          appBridge: {
            title: 'Track Every Business Expense in One Place',
            description:
              'Elec-Mate combines expense tracking, receipt scanning, mileage logging, and overhead calculation into a single app built for electricians. Know your true costs, price with confidence.',
            icon: Receipt,
          },
        },
      ]}
      features={[
        {
          icon: Calculator,
          title: 'Complete Overhead Calculator',
          description:
            'Walk through every business expense category — van, tools, insurance, fuel, training, marketing. Nothing gets missed.',
        },
        {
          icon: PoundSterling,
          title: 'Hourly Overhead Rate',
          description:
            'Convert your total annual overheads into a per-hour cost that gets added to every quote automatically.',
        },
        {
          icon: TrendingUp,
          title: 'Cost Trend Analysis',
          description:
            'Track how your business costs change over time. Spot increasing expenses early and take action before they erode your margins.',
        },
        {
          icon: Receipt,
          title: 'Expense Categorisation',
          description:
            'Categorise every expense — van, tools, insurance, fuel, training, marketing, admin. See exactly where your money goes.',
        },
        {
          icon: Target,
          title: 'Break-Even Calculator',
          description:
            'Calculate how many billable hours or jobs you need per month to cover all your costs and start making profit.',
        },
        {
          icon: BarChart3,
          title: 'Monthly Cost Dashboard',
          description:
            'Visual dashboard showing your business costs by category, month, and trend. Compare against industry benchmarks.',
        },
      ]}
      featuresHeading="How Elec-Mate Tracks Your Business Costs"
      featuresSubheading="Purpose-built for UK electricians. Every overhead captured, every cost allocated, every quote accurately priced."
      faqs={[
        {
          question: 'What are the typical overheads for an electrician in the UK?',
          answer:
            'Typical annual overheads for a sole trader electrician in the UK range from £10,000 to £20,000 depending on your setup. This includes van costs (£3,000 to £7,000 covering lease or finance, fuel, insurance, road tax, MOT, and servicing), tools and test equipment (£500 to £1,500 for calibration, replacement, and new purchases), insurance (£400 to £900 for public liability and professional indemnity), certification body fees (£400 to £800 for NICEIC, NAPIT, or ELECSA), training and CPD (£200 to £1,000), accountancy fees (£300 to £800), phone and software (£300 to £600), marketing (£200 to £2,000), and workwear (£200 to £500). Elec-Mate helps you capture every category so nothing is missed.',
        },
        {
          question: 'How do I calculate my hourly overhead rate?',
          answer:
            'To calculate your hourly overhead rate, total up all your annual business running costs (everything except direct job materials and your own labour). Then divide by the number of billable hours you work per year. A typical sole trader electrician works around 1,400 to 1,600 billable hours per year after deducting holidays (28 days), sick days, training days, admin time, and unbillable hours. For example, if your total overheads are £15,000 and you work 1,500 billable hours, your overhead rate is £10 per hour. This £10 must be added to your labour rate when pricing jobs — otherwise your overheads eat into your profit.',
        },
        {
          question: 'What costs do electricians forget when pricing jobs?',
          answer:
            'The most commonly forgotten costs are: travel time (both the fuel cost and the opportunity cost of unbillable hours), test equipment calibration (annual calibration of your MFT, insulation tester, and other instruments), certification body fees (the annual cost of NICEIC or NAPIT membership divided across your jobs), tool replacement and repair, training and CPD costs, phone contract, software subscriptions, PPE and workwear replacement, marketing spend, accountancy fees, and van depreciation (if you own rather than lease). Elec-Mate prompts you through every category to ensure nothing is missed.',
        },
        {
          question: 'Should I include my own wages as a business cost?',
          answer:
            'Yes, absolutely. As a sole trader, your drawings (the money you take out of the business for personal use) are a business cost, even though HMRC treats them differently from employed wages for tax purposes. When calculating whether your business is profitable, you must include a realistic salary for yourself — what you would need to earn to maintain your desired lifestyle. If your business turnover minus all overheads and materials does not leave enough to pay yourself a fair wage, your prices are too low. Many electricians make the mistake of thinking whatever is left after expenses is their "profit" — but if that amount is less than they could earn working for someone else, the business is actually making a loss on their time.',
        },
        {
          question: 'How often should I review my business costs?',
          answer:
            'Review your business costs at least quarterly and do a full annual review. Costs change throughout the year — fuel prices fluctuate, insurance premiums change at renewal, new tool purchases are made, and training costs vary. A quarterly review lets you spot cost increases early and adjust your pricing accordingly. Many electricians only review costs at year-end when their accountant prepares their tax return, by which point they have been undercharging for months. Elec-Mate tracks your expenses in real time and alerts you when spending in any category exceeds your budget.',
        },
        {
          question: 'What is the difference between fixed and variable costs?',
          answer:
            'Fixed costs stay the same regardless of how much work you do — van lease payments, insurance premiums, certification body fees, phone contract, and software subscriptions are all fixed costs. Variable costs change based on your workload — fuel, materials, consumables, subcontractor costs, and travel expenses are variable. Understanding the split is important because your fixed costs must be covered even in quiet months. If your fixed costs are £1,500 per month, you need to earn at least £1,500 before you make any money at all. Elec-Mate categorises your expenses automatically so you always know your fixed cost base.',
        },
      ]}
      relatedPages={[
        {
          href: '/tools/pricing-strategy-electrician',
          title: 'Pricing Strategy for Electricians',
          description:
            'Fixed price vs day rate vs hourly — choose the right pricing model for every job type.',
          icon: PoundSterling,
          category: 'Business Tools',
        },
        {
          href: '/tools/job-profitability-calculator',
          title: 'Job Profitability Calculator',
          description:
            'Calculate the true profit on every electrical job including all hidden costs.',
          icon: TrendingUp,
          category: 'Business Calculators',
        },
        {
          href: '/tools/vat-scheme-comparison',
          title: 'VAT Scheme Comparison',
          description:
            'Compare flat rate, standard rate, and cash accounting VAT schemes for electricians.',
          icon: Receipt,
          category: 'Business Tools',
        },
        {
          href: '/tools/business-analytics-electrician',
          title: 'Business Analytics Dashboard',
          description:
            'Track revenue, profitability, and KPIs across your entire electrical business.',
          icon: BarChart3,
          category: 'Business Tools',
        },
        {
          href: '/tools/cash-flow-planner',
          title: 'Cash Flow Planner',
          description: 'Forecast your cash position and never be caught short by a cash gap.',
          icon: Briefcase,
          category: 'Business Calculators',
        },
        {
          href: '/tools/starting-electrical-business',
          title: 'Starting an Electrical Business',
          description: 'Complete guide to setting up as a self-employed electrician in the UK.',
          icon: Wrench,
          category: 'Business Guides',
        },
      ]}
      ctaHeading="Know Your True Business Costs"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate to calculate overheads, price jobs accurately, and run profitable businesses. 7-day free trial, cancel anytime."
      extraSchemas={[
        {
          '@type': 'SoftwareApplication',
          name: 'Elec-Mate Business Cost Calculator',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web, iOS, Android',
          description:
            'Calculate the true running costs of your electrical business. Van, tools, insurance, fuel, training, marketing — know your overheads and price every job to profit.',
          url: 'https://elec-mate.com/tools/business-cost-calculator',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'GBP',
            description: '7-day free trial, then from £9.99/month',
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            ratingCount: '430',
            bestRating: '5',
          },
        },
      ]}
      pagePath={PAGE_PATH}
    />
  );
}
