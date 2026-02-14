import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  PoundSterling,
  MapPin,
  TrendingUp,
  Briefcase,
  Calculator,
  Building,
  Wrench,
  BarChart3,
  Clock,
  Users,
  Receipt,
  GraduationCap,
  Zap,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Career', href: '/guides/electrician-career-progression' },
  { label: 'Day Rates', href: '/guides/electrician-day-rates-uk' },
];

const tocItems = [
  { id: 'average-day-rates', label: 'Average Day Rates 2026' },
  { id: 'by-region', label: 'Day Rates by Region' },
  { id: 'domestic-vs-commercial', label: 'Domestic vs Commercial' },
  { id: 'by-experience', label: 'Rates by Experience Level' },
  { id: 'specialist-rates', label: 'Specialist Day Rates' },
  { id: 'setting-your-rate', label: 'Setting Your Day Rate' },
  { id: 'negotiation-tips', label: 'Negotiation Tips' },
  { id: 'tracking-profitability', label: 'Tracking Profitability' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The average electrician day rate in the UK in 2026 is £220 to £300 for a standard 8-hour day, with London and the South East commanding the highest rates.',
  'Commercial and industrial electricians earn higher day rates (£250-£350) than domestic electricians (£200-£280) due to the scale and complexity of the work.',
  'Specialist electricians — testing and inspection, EV charging, data centres, hazardous areas — command day rates of £300 to £450.',
  'Your day rate must cover not just your time but also van, tools, insurance, pension, holidays, sick days, CPD, and profit margin.',
  'Elec-Mate job profitability calculator helps you set day rates that actually make money — factoring in all overheads, not just the hourly maths.',
];

const faqs = [
  {
    question: 'What is the average electrician day rate in the UK in 2026?',
    answer:
      'The average day rate for a qualified electrician in the UK in 2026 is between £220 and £300 for a standard 8-hour day, depending on location, experience, and sector. In London and the South East, day rates of £280 to £350 are common. In the North of England, Wales, and Scotland, typical rates are £200 to £260. These figures are for self-employed electricians providing labour only (no materials). If you are providing materials as well, the day rate is higher to cover material costs and markup. Commercial and industrial day rates are typically 15-25% higher than domestic rates, reflecting the need for additional certifications (CSCS, SSSTS) and the more demanding working environment.',
  },
  {
    question: 'Should I charge a day rate or price per job?',
    answer:
      'It depends on the type of work. Day rates are common for commercial and industrial work where you are providing labour to a main contractor or electrical contractor. They are also used for maintenance work, fault finding, and testing. Pricing per job (fixed price) is more common for domestic work — rewires, consumer unit changes, new circuits, and similar installations. Fixed pricing is riskier because you bear the cost of any overruns, but it is more profitable if you work efficiently. Many experienced domestic electricians use a hybrid approach: they calculate the job price based on their day rate multiplied by the estimated duration, then add materials, overheads, and profit margin. Elec-Mate quoting app makes this calculation fast and consistent.',
  },
  {
    question: 'How do I increase my day rate without losing clients?',
    answer:
      'The most effective ways to increase your day rate are: specialise in a higher-value area (testing, EV, solar, fire alarms), improve your speed and efficiency so you deliver more value per day, build a reputation that justifies premium pricing, target commercial clients who are less price-sensitive than domestic customers, and raise your rates gradually (5-10% per year) rather than in large jumps. When you raise your rate, some price-sensitive clients will leave — this is normal and healthy. Replace them with clients who value quality over the cheapest price. You should also review your pricing annually to keep pace with inflation, rising costs, and your growing experience.',
  },
  {
    question: 'What should I include when calculating my day rate?',
    answer:
      'Your day rate must cover far more than just your time. A proper calculation includes: your target annual income (the salary you want to pay yourself), employer National Insurance contributions, pension contributions, annual leave (you need to earn enough in working days to cover non-working days), sick pay allowance, public liability and professional indemnity insurance, van costs (finance, fuel, insurance, maintenance), tool replacements and calibration, workwear and PPE, phone and IT costs, competent person scheme fees, CPD and training costs, accountancy fees, and a profit margin (typically 10-20%). When you add all of these up and divide by the number of billable days per year (typically 200-220), you get your minimum viable day rate. Most electricians who charge less than £200 per day are not covering their true costs.',
  },
  {
    question: 'Are day rates going up or down for electricians?',
    answer:
      'Electrician day rates have been steadily increasing over the past 5 years. The average day rate has risen by approximately 4-7% per year since 2020, driven by a shortage of skilled electricians, increasing demand for electrical work (particularly EV charging and renewable energy), rising costs of living and materials, and new regulations creating more work (EICR requirements for landlords, AFDD requirements). The trend is expected to continue through 2026 and beyond. The UK has a significant skills shortage in the electrical trade, with an ageing workforce and insufficient new entrants to replace retiring electricians. This supply-demand imbalance supports continued upward pressure on day rates.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/electrician-rates-per-hour-uk',
    title: 'Electrician Rates Per Hour',
    description: 'Hourly rates, callout charges, emergency pricing, and how to set your rate.',
    icon: Clock,
    category: 'Guide',
  },
  {
    href: '/guides/electrician-salary-uk',
    title: 'Electrician Salary UK 2026',
    description: 'Full salary data for employed and self-employed electricians across the UK.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/guides/how-to-price-electrical-jobs',
    title: 'How to Price Electrical Jobs',
    description:
      'The complete guide to pricing domestic and commercial electrical work profitably.',
    icon: Calculator,
    category: 'Guide',
  },
  {
    href: '/guides/contractor-vs-employee-electrician',
    title: 'Contractor vs Employee',
    description: 'Financial comparison of self-employed contractor versus employed electrician.',
    icon: Briefcase,
    category: 'Guide',
  },
  {
    href: '/guides/going-self-employed-electrician',
    title: 'Going Self-Employed',
    description: 'Step-by-step guide to setting up as a self-employed electrician in the UK.',
    icon: TrendingUp,
    category: 'Guide',
  },
  {
    href: '/tools/job-profitability-calculator',
    title: 'Job Profitability Calculator',
    description:
      'Calculate your true profit on every job — materials, labour, overheads, and margin.',
    icon: BarChart3,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'average-day-rates',
    heading: 'Average Electrician Day Rates in the UK (2026)',
    content: (
      <>
        <p>
          The day rate is the standard pricing unit for self-employed electricians, particularly
          those working on commercial and industrial sites. It represents what you charge for a
          standard working day — typically 8 hours on site, excluding travel time.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">UK Average Day Rates 2026</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Domestic electrician:</strong> £200 to £280 per day. Covers rewires,
                consumer unit changes, additional circuits, fault finding, and general domestic
                installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commercial electrician:</strong> £250 to £320 per day. Office fit-outs,
                retail, schools, healthcare, and commercial new builds.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Industrial electrician:</strong> £280 to £380 per day. Factories,
                manufacturing, heavy industry, and process installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Specialist (testing, EV, data):</strong> £300 to £450 per day. Testing and
                inspection specialists, EV charger installers, data centre electricians, and
                hazardous area (CompEx) electricians.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These are labour-only rates — materials, travel, and accommodation are charged separately.
          If you are working for a main contractor on a CIS (Construction Industry Scheme) basis,
          the day rate is your gross payment before tax deductions. Self-employed electricians
          working directly for end clients typically charge more because they are also managing the
          project, sourcing materials, and handling customer service.
        </p>
      </>
    ),
  },
  {
    id: 'by-region',
    heading: 'Day Rates by Region',
    content: (
      <>
        <p>
          Location is one of the biggest factors affecting electrician day rates. The cost of
          living, local demand, and the concentration of large projects all influence what the
          market will bear:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>London:</strong> £280 to £380. The highest rates in the UK, driven by the
                cost of living, congestion, and the concentration of large commercial projects.
                Specialist rates can exceed £450.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>South East:</strong> £250 to £340. Close to London rates, particularly in
                cities like Reading, Brighton, Guildford, and the Thames Valley corridor.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>South West:</strong> £220 to £290. Bristol and Bath pay above average. Rural
                Devon and Cornwall are lower.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Midlands:</strong> £220 to £290. Birmingham and Coventry pay the most. Large
                HS2 and infrastructure projects have boosted rates in the region.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>North West:</strong> £210 to £280. Manchester and Liverpool offer
                competitive rates. Major regeneration projects continue to drive demand.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>North East and Yorkshire:</strong> £200 to £260. Leeds, Sheffield, and
                Newcastle are the best-paying cities in the region.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scotland:</strong> £210 to £280. Edinburgh and Glasgow pay the most.
                Offshore and renewable energy projects command premium rates.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wales:</strong> £200 to £260. Cardiff pays the most. Rural Wales has the
                lowest day rates in the UK.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Remember that higher day rates in London and the South East are offset by higher living
          costs, longer commute times, and congestion charges. An electrician earning £280 per day
          in London may keep less after expenses than one earning £240 per day in the Midlands.
        </p>
      </>
    ),
  },
  {
    id: 'domestic-vs-commercial',
    heading: 'Domestic vs Commercial Day Rates',
    content: (
      <>
        <p>
          The sector you work in has a major impact on your day rate. Domestic and commercial
          electrical work have different pricing structures, client expectations, and overhead
          requirements:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Domestic Day Rates</h3>
            <p className="text-white text-sm leading-relaxed">
              £200 to £280 per day. Domestic electricians work directly with homeowners and
              landlords. You set your own prices, source your own materials, manage the customer
              relationship, and handle all certification. The day rate appears lower but you are
              also marking up materials (typically 15-30%) and you have more control over your
              schedule. Many domestic electricians prefer to{' '}
              <SEOInternalLink href="/guides/how-to-price-electrical-jobs">
                price per job
              </SEOInternalLink>{' '}
              rather than quoting a day rate.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Commercial Day Rates</h3>
            <p className="text-white text-sm leading-relaxed">
              £250 to £350 per day. Commercial electricians typically work as subcontractors to
              electrical contractors or main contractors. The day rate is higher but it is labour
              only — materials are provided by the contractor. You need additional certifications
              (CSCS/ECS card, SSSTS/SMSTS) and must comply with site rules. Work is less flexible
              but more consistent, with multi-week or multi-month contracts available.
            </p>
          </div>
        </div>
        <p>
          When comparing domestic and commercial rates, factor in the full picture. A domestic
          electrician charging £240 per day who also earns 20% margin on £5,000 of materials per
          month is effectively earning £280+ per day. A commercial electrician at £300 per day
          labour-only but paying for their own CSCS cards, additional PPE, and daily travel to site
          may net less than it appears.
        </p>
      </>
    ),
  },
  {
    id: 'by-experience',
    heading: 'Day Rates by Experience Level',
    content: (
      <>
        <p>
          Your experience level directly affects what you can charge. Here is how day rates
          typically progress as you gain experience:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <BarChart3 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Newly qualified (0-2 years):</strong> £180 to £230. You are competent but
                still building speed and confidence. Some contractors refer to this as "improver"
                rate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BarChart3 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Experienced (2-5 years):</strong> £230 to £300. You are fully productive,
                can work unsupervised, and handle a wide range of installations. This is the
                standard "qualified electrician" rate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BarChart3 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Senior (5-10 years):</strong> £280 to £350. You have deep experience,
                specialist skills, and a reputation. Clients and contractors actively seek you out.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BarChart3 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Specialist (any experience with specialist quals):</strong> £300 to £450.
                Testing and inspection, EV, solar PV, data centres, hazardous areas. The
                qualification and expertise justify the premium.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The biggest jump in day rate comes from gaining specialist qualifications. An electrician
          with 3 years of general experience earning £250 per day can jump to £320+ per day by
          adding a{' '}
          <SEOInternalLink href="/guides/city-guilds-2391-inspection-testing">
            C&G 2391 inspection and testing
          </SEOInternalLink>{' '}
          qualification and targeting EICR work.
        </p>
      </>
    ),
  },
  {
    id: 'specialist-rates',
    heading: 'Specialist Day Rates',
    content: (
      <>
        <p>
          Specialist electricians command the highest day rates. Here are the current market rates
          for key specialisms:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing and inspection (C&G 2391):</strong> £280 to £380. Steady work from
                landlord EICRs, commercial compliance, and insurance requirements. High demand and
                recurring revenue.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV charger installation:</strong> £300 to £400. Growing rapidly with
                government incentives and increasing EV adoption. Domestic and commercial projects.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Data centre electrician:</strong> £320 to £450. Highly specialised work in a
                booming sector. Requires specific training and often security clearance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Hazardous areas (CompEx):</strong> £350 to £500. Oil, gas, chemical, and
                pharmaceutical environments. The CompEx qualification is essential and the rates
                reflect the risk and expertise involved.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Solar PV and battery storage:</strong> £280 to £380. MCS certification
                required. Strong demand driven by energy prices and environmental awareness.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Investing in specialist qualifications is one of the best returns on investment in the
          electrical trade. A C&G 2391 course costs £500 to £1,500. Within a month of qualifying,
          the higher day rate has paid for the course. Elec-Mate offers{' '}
          <SEOInternalLink href="/training/inspection-and-testing">
            46+ training courses
          </SEOInternalLink>{' '}
          to help you upskill and specialise.
        </p>
      </>
    ),
  },
  {
    id: 'setting-your-rate',
    heading: 'How to Set Your Day Rate: The Real Calculation',
    content: (
      <>
        <p>
          Most electricians set their day rate by looking at what others charge and picking a
          similar number. This is a mistake. Your day rate should be calculated from your costs
          upward, not from the market downward. Here is the correct method:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Target annual income:</strong> What salary do you want to take home? Include
              employer NI contributions, pension contributions, and student loan repayments if
              applicable.
            </li>
            <li>
              <strong>Annual business costs:</strong> Van (finance, insurance, fuel, maintenance,
              MOT), tools and equipment (purchase and calibration), insurance (public liability,
              professional indemnity), competent person scheme (NICEIC, NAPIT), accountant, phone
              and IT, workwear and PPE, marketing, and training/CPD.
            </li>
            <li>
              <strong>Non-billable days:</strong> You cannot bill for every day of the year. Deduct
              weekends (104 days), bank holidays (8 days), annual leave (20-25 days), sick days
              (5-10 days), admin and quoting time (15-25 days), and training days (5-10 days). Most
              self-employed electricians have 200 to 220 billable days per year.
            </li>
            <li>
              <strong>Profit margin:</strong> Add 10-20% profit margin on top. Profit is not the
              same as your salary — it is the return on the risk and capital you invest in the
              business.
            </li>
          </ol>
        </div>
        <p>
          <strong>Example calculation:</strong> Target income £45,000 + employer NI £5,000 + pension
          £3,000 + business costs £18,000 = £71,000 total. Divided by 210 billable days = £338 per
          day before profit. Add 15% profit = £389 per day. If you are charging less than this, you
          are either undercharging or your costs are lower than average.
        </p>
        <SEOAppBridge
          title="Know your true profit on every job"
          description="Elec-Mate job profitability calculator factors in your actual overheads, not just labour and materials. Set day rates and job prices that genuinely make money. 7-day free trial."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'negotiation-tips',
    heading: 'Negotiation Tips: Getting the Rate You Deserve',
    content: (
      <>
        <p>
          Whether you are negotiating with a main contractor, an electrical contractor, or a direct
          client, these tips will help you get the best rate:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Know the market rate for your area and specialism.</strong> Research what
                other electricians charge. If you are below market, raise your rate. If you are
                above, be ready to justify it with experience, qualifications, and reliability.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Never be the cheapest.</strong> Competing on price is a race to the bottom.
                Compete on quality, reliability, and professionalism. Clients who choose the
                cheapest electrician are the hardest to work with and the least likely to pay on
                time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Offer volume discounts, not rate cuts.</strong> If a contractor wants a
                lower rate for a long contract, negotiate on volume (guaranteed weeks of work)
                rather than cutting your daily rate. A guaranteed 12-week contract at £280 is better
                than ad-hoc work at £300 with gaps between jobs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Have a professional image.</strong> Send quotes on branded templates,
                invoice promptly, communicate clearly, and turn up when you say you will.
                Professionalism justifies premium pricing.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Professional quotes and invoices in minutes"
          description="Elec-Mate quoting app creates branded, professional quotes from your phone. Convert quotes to invoices with one tap. Look professional, get paid faster. 7-day free trial."
          icon={Receipt}
        />
      </>
    ),
  },
  {
    id: 'tracking-profitability',
    heading: 'Tracking Your Actual Profitability',
    content: (
      <>
        <p>
          Knowing your day rate is only half the battle. You also need to track whether you are
          actually making the profit you planned. Many self-employed electricians are surprised to
          discover they are earning less than they thought once they properly account for all their
          costs.
        </p>
        <p>The keys to tracking profitability are:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <BarChart3 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Track every expense.</strong> Fuel, materials, tools, insurance, meals on
                site, parking, phone, subscriptions — everything. Elec-Mate expense tracking lets
                you photograph receipts and categorise expenses as you go.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BarChart3 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Record your actual hours.</strong> How many hours did the job actually take,
                including travel, quoting, purchasing materials, and admin? Compare this to the
                hours you quoted.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BarChart3 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Review monthly.</strong> At the end of each month, calculate your total
                income, total expenses, and actual profit. Are you hitting your target? If not, why
                not? Use Elec-Mate{' '}
                <SEOInternalLink href="/tools/cash-flow-planner">cash flow planner</SEOInternalLink>{' '}
                to see where the money is going.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The electricians who earn the most are not necessarily the ones with the highest day rates
          — they are the ones who track their profitability, eliminate waste, and make data-driven
          decisions about pricing, jobs, and overheads. Treat your self-employed career as a
          business, not just a job.
        </p>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianDayRatesPage() {
  return (
    <GuideTemplate
      title="Electrician Day Rates UK 2026 | What to Charge"
      description="Complete guide to electrician day rates in the UK in 2026. Average rates by region, domestic vs commercial, experience levels, specialist premiums, and how to calculate and negotiate your day rate."
      datePublished="2025-07-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Career Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          Electrician Day Rates UK: <span className="text-yellow-400">What to Charge in 2026</span>
        </>
      }
      heroSubtitle="From £200 per day for domestic work to £450+ for specialist roles — this is the definitive guide to electrician day rates across the UK. Know the market, calculate your true costs, and set a rate that actually makes money."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrician Day Rates"
      relatedPages={relatedPages}
      ctaHeading="Price Every Job Profitably with Elec-Mate"
      ctaSubheading="Quoting app, job profitability calculator, expense tracking, and cash flow planner — all built for electricians who want to earn what they are worth. 7-day free trial, cancel anytime."
    />
  );
}
