import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Calculator,
  PoundSterling,
  Receipt,
  TrendingUp,
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  FileText,
  BarChart3,
  Target,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Business', href: '/guides/going-self-employed-electrician' },
  { label: 'Hourly Rate Calculator', href: '/guides/hourly-rate-calculator-electrician' },
];

const tocItems = [
  { id: 'why-calculate', label: 'Why You Must Calculate Your Rate' },
  { id: 'the-formula', label: 'The Formula' },
  { id: 'overheads', label: 'Listing Your Overheads' },
  { id: 'billable-hours', label: 'Billable Hours: The Hidden Factor' },
  { id: 'profit-margin', label: 'Adding Profit Margin' },
  { id: 'pricing-methods', label: 'Hourly vs Day Rate vs Fixed Price' },
  { id: 'adjusting-rate', label: 'When to Raise Your Rate' },
  { id: 'using-elec-mate', label: 'Using Elec-Mate to Price Jobs' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Your hourly rate must cover all overheads (van, insurance, tools, fuel, training, phone, software), not just your desired take-home pay — otherwise you are losing money on every job.',
  'Billable hours are not 40 per week. After travel, quoting, admin, training, and quiet periods, most electricians achieve 1,200 to 1,500 billable hours per year — plan your rate around this reality.',
  'The formula: (Target Income + Total Overheads + Tax Provision) / Annual Billable Hours = Minimum Hourly Rate. Most UK electricians need to charge £40 to £55+ per hour to run a profitable business.',
  'Fixed-price quoting is usually more profitable than hourly rates — you benefit from efficiency, and customers prefer knowing the total cost upfront.',
  'Elec-Mate AI cost engineer calculates job costs with accurate labour, materials, and overhead data — generating profitable quotes in minutes rather than hours.',
];

const faqs = [
  {
    question: 'What is the average hourly rate for an electrician in the UK?',
    answer:
      'The average hourly rate for a self-employed electrician in the UK in 2026 is £40 to £55 per hour, depending on location and type of work. London and the South East command higher rates (£50 to £70+), while rates in the North and Midlands are typically £35 to £50. These are labour-only rates — materials are charged separately. Day rates typically range from £250 to £350 for domestic work and £280 to £400 for commercial work. Subcontract CIS rates are often lower (£180 to £280 per day) because the contractor handles customer acquisition, materials, and project management. Specialist work (EV charging, solar PV, fire alarm, data cabling) commands premium rates. The key is that your rate must cover all your overheads and provide a profit — the "average" rate is irrelevant if it does not cover your specific costs.',
  },
  {
    question: 'How many billable hours can I realistically achieve per year?',
    answer:
      'Most self-employed electricians achieve 1,200 to 1,500 billable hours per year. This assumes working 46 to 48 weeks (allowing for holidays, sick days, and bank holidays) and achieving 26 to 32 billable hours per week out of a 40 to 45 hour working week. The remaining hours are consumed by: travel between jobs (5 to 8 hours per week), quoting and site surveys (3 to 5 hours per week), admin, invoicing, and bookkeeping (2 to 3 hours per week), materials collection (2 to 3 hours per week), training and CPD (occasional), and quiet periods with no work booked. New self-employed electricians may achieve fewer billable hours in their first year while building their customer base. Efficient electricians who use tools like Elec-Mate to handle quoting, invoicing, and admin on site can reclaim 3 to 5 hours per week — adding £150 to £275 of billable time.',
  },
  {
    question: 'Should I charge hourly or give fixed prices?',
    answer:
      'For most domestic work, fixed-price quoting is more profitable and more popular with customers. Customers want to know the total cost before committing — an hourly rate with an uncertain duration makes them nervous. Fixed-price quoting also rewards you for being efficient — if you quote £800 for a consumer unit upgrade and complete it in 4 hours, your effective hourly rate is £200 per hour (minus materials). If you quoted hourly at £50 per hour, you would earn only £200 for the same work. The exception is fault-finding and investigation work, where the scope is genuinely unknown — in these cases, an hourly rate with an estimated time range is appropriate. For commercial and subcontract work, day rates or contract prices are more common. The key to profitable fixed-price quoting is accurate cost estimation — which is exactly what Elec-Mate AI cost engineer provides.',
  },
  {
    question: 'What overheads should I include in my hourly rate calculation?',
    answer:
      'Every recurring cost of running your business should be included: van finance or depreciation (£200 to £500 per month), van insurance (£50 to £125 per month), fuel (£200 to £400 per month), public liability insurance (£15 to £35 per month), professional indemnity insurance (£7 to £17 per month), tools insurance (£8 to £25 per month), competent person scheme fees (£25 to £50 per month), accountant fees (£25 to £50 per month), phone and data (£30 to £60 per month), software subscriptions including Elec-Mate (£20 to £50 per month), training and CPD (£30 to £80 per month averaged), workwear and PPE (£10 to £20 per month), parking and tolls (£20 to £50 per month), test equipment calibration (£5 to £15 per month averaged), and marketing costs (£20 to £100 per month). Total monthly overheads for a typical sole trader electrician: £700 to £1,500 per month, or £8,400 to £18,000 per year.',
  },
  {
    question: 'How do I know if my rate is too low?',
    answer:
      'The clearest signs your rate is too low: you are working 50+ hours per week but your take-home pay does not reflect the effort. You cannot afford to replace a broken tool without stress. You do not take holidays because you cannot afford the lost income. Your van is ageing and you cannot afford to replace it. You are not putting money aside for tax and face a shock bill in January. You are turning away training and CPD because of the cost. If any of these apply, your rate is too low. Run the calculation: (Target Annual Income + Annual Overheads + Tax Provision) / Annual Billable Hours. If the result is higher than what you are currently charging, you need to raise your rate. Many electricians are surprised to find they need to charge £45 to £55+ per hour just to cover costs and earn a reasonable income.',
  },
  {
    question: 'How do I raise my rates without losing customers?',
    answer:
      'Raise your rates gradually and communicate clearly. Give existing customers 30 days notice of a rate increase. Explain that costs have increased (insurance, fuel, materials, training) and that the new rate reflects the true cost of delivering quality work. Most good customers understand — they value reliability and quality over the cheapest price. Focus on the customers who value your work and are willing to pay a fair rate. Customers who only care about price will always leave for the cheapest quote — let them go. When quoting for new customers, simply quote at your new rate. Do not apologise for it or offer discounts. Your rate is the price of your skill, experience, qualifications, insurance, and reliability. If you are fully booked at your current rate, that is the strongest signal that you should be charging more.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/going-self-employed-electrician',
    title: 'Going Self-Employed',
    description:
      'Complete guide to setting up as a self-employed electrician — from registration to getting customers.',
    icon: Briefcase,
    category: 'Guide',
  },
  {
    href: '/guides/electrician-tax-guide-uk',
    title: 'Electrician Tax Guide UK',
    description:
      'Self-assessment, allowable expenses, CIS deductions, and VAT — know what to claim.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/guides/electrician-insurance-uk',
    title: 'Electrician Insurance UK',
    description:
      'Factor insurance costs into your rate calculation. Full guide to cover types and costs.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/cis-for-electricians',
    title: 'CIS for Electricians',
    description: 'Understand how CIS deductions affect your take-home pay and cash flow.',
    icon: FileText,
    category: 'Guide',
  },
  {
    href: '/guides/debt-recovery-electricians',
    title: 'Debt Recovery for Electricians',
    description:
      'Getting paid what you are owed — payment terms, late payment interest, and legal options.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/tools/quote-generator',
    title: 'AI Cost Engineer',
    description:
      'Generate accurate, profitable quotes using AI-powered cost estimation with real trade pricing data.',
    icon: Calculator,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'why-calculate',
    heading: 'Why You Must Calculate Your Hourly Rate Properly',
    content: (
      <>
        <p>
          Most self-employed electricians pick a number — £35, £40, £45 per hour — based on what
          other electricians seem to charge, or what feels "about right." This is guesswork, and
          guesswork costs money.
        </p>
        <p>
          If your rate does not cover your overheads, you are subsidising every customer from your
          own pocket. If it does not include a profit margin, you are working for wages — with none
          of the benefits of employment (holiday pay, sick pay, pension, employer NI contributions).
          And if it does not account for non-billable time, you are overestimating how much you
          actually earn per hour.
        </p>
        <p>
          The difference between a correctly calculated rate and a guessed one can be £10 to £15 per
          hour. Over 1,300 billable hours per year, that is £13,000 to £19,500 in lost income. Not
          lost to tax, not lost to expenses — lost to poor pricing. That money should be in your
          pocket.
        </p>
        <p>
          This guide walks you through the exact calculation. By the end, you will know your minimum
          viable hourly rate — the rate below which you lose money — and your target rate that
          delivers the income you deserve.
        </p>
      </>
    ),
  },
  {
    id: 'the-formula',
    heading: 'The Formula: Simple Maths, Powerful Results',
    content: (
      <>
        <p>The hourly rate formula has three inputs and one output:</p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <p className="text-white font-bold text-lg mb-4">Hourly Rate = (A + B + C) / D</p>
          <ul className="space-y-3 text-white">
            <li>
              <strong>A = Target annual take-home income</strong> — what you want in your pocket
              after tax. For example, £40,000.
            </li>
            <li>
              <strong>B = Total annual overheads</strong> — every cost of running your business. For
              example, £14,000.
            </li>
            <li>
              <strong>C = Tax and National Insurance provision</strong> — the tax you will owe on
              your profit (A + profit margin). For example, £11,000.
            </li>
            <li>
              <strong>D = Annual billable hours</strong> — the hours you actually charge customers
              for. For example, 1,300 hours.
            </li>
          </ul>
          <div className="mt-4 pt-4 border-t border-yellow-500/20">
            <p className="text-white font-mono">
              (£40,000 + £14,000 + £11,000) / 1,300 = <strong>£50 per hour</strong>
            </p>
          </div>
        </div>
        <p>
          That is your minimum rate. Below this, you are losing money. At this rate, you are
          breaking even on your target income. Add a profit margin on top (typically 10% to 20%) and
          you have your target rate — in this example, £55 to £60 per hour.
        </p>
        <p>
          Let us break down each input in detail so you can calculate your own number accurately.
        </p>
      </>
    ),
  },
  {
    id: 'overheads',
    heading: 'Listing Your Overheads: Every Cost Matters',
    content: (
      <>
        <p>
          Your overheads are every recurring cost of running your business — whether or not you are
          working on a job that day. Here is a comprehensive list for a typical self-employed
          electrician:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white text-sm">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>Van finance/depreciation: £200 to £500/month (£2,400 to £6,000/year)</span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>Van insurance (business use): £50 to £125/month (£600 to £1,500/year)</span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>Fuel: £200 to £400/month (£2,400 to £4,800/year)</span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <SEOInternalLink href="/guides/electrician-insurance-uk">
                  Public liability insurance
                </SEOInternalLink>
                : £15 to £35/month (£150 to £400/year)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>Professional indemnity insurance: £7 to £17/month (£80 to £200/year)</span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>Tools insurance: £8 to £25/month (£100 to £300/year)</span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Competent person scheme (NICEIC/NAPIT): £25 to £50/month (£300 to £600/year)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>Accountant: £25 to £50/month (£300 to £600/year)</span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>Phone and data: £30 to £60/month (£360 to £720/year)</span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>Software (Elec-Mate, accounting): £20 to £50/month (£240 to £600/year)</span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>Training and CPD: £30 to £80/month averaged (£360 to £960/year)</span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>Workwear and PPE: £10 to £20/month (£120 to £240/year)</span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>Test equipment calibration: £5 to £15/month averaged (£60 to £180/year)</span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Marketing (Checkatrade, website, etc.): £20 to £100/month (£240 to £1,200/year)
              </span>
            </li>
          </ul>
          <div className="mt-4 pt-4 border-t border-white/10">
            <p className="text-white font-bold">
              Total typical overheads: £7,710 to £18,300 per year
            </p>
          </div>
        </div>
        <p>
          Use your actual numbers, not averages. If you know your van costs £350 per month and your
          fuel is £280 per month, use those figures. The more accurate your overhead calculation,
          the more accurate your hourly rate — and the more confident you can be that every job is
          profitable.
        </p>
        <p>
          Elec-Mate's{' '}
          <SEOInternalLink href="/tools/expense-tracker">expenses tracker</SEOInternalLink> captures
          every cost automatically. After a few months, you will have exact data on your overheads —
          no guesswork needed.
        </p>
      </>
    ),
  },
  {
    id: 'billable-hours',
    heading: 'Billable Hours: The Hidden Factor Most Electricians Ignore',
    content: (
      <>
        <p>
          This is where most hourly rate calculations go wrong. Electricians assume they will work
          40 hours per week and charge for all of them. In reality, a significant portion of your
          working week is non-billable.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Travel between jobs:</strong> 5 to 8 hours per week. You cannot charge the
                customer for your drive from the last job. If you do 3 domestic jobs per day, that
                is 1 to 2 hours of driving between them.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Quoting and site surveys:</strong> 3 to 5 hours per week. Not every quote
                converts. If you quote 5 jobs per week and convert 3, that is 2 wasted hours plus
                travel time. Using Elec-Mate's AI cost engineer can reduce quoting time
                significantly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Admin, invoicing, bookkeeping:</strong> 2 to 3 hours per week. Sending
                invoices, chasing payments, filing receipts, updating records. Elec-Mate handles
                most of this from your phone.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Materials collection:</strong> 2 to 3 hours per week. Trips to the
                wholesaler, waiting for deliveries, checking stock.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Quiet periods:</strong> Even busy electricians have quiet days and weeks.
                Seasonality, customer cancellations, weather delays, and gaps between jobs all
                reduce billable time.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Out of a 45-hour working week, most electricians achieve 26 to 32 billable hours. Over 47
          working weeks (allowing for 4 weeks holiday and 1 week sick/bank holidays), that is 1,222
          to 1,504 billable hours per year. Use 1,300 as a realistic planning figure for your first
          calculation, and adjust based on your actual experience after 6 to 12 months.
        </p>
        <p>
          The fewer billable hours you achieve, the higher your hourly rate needs to be. If you only
          manage 1,100 billable hours, the example calculation changes from £50/hour to £59/hour.
          Every hour reclaimed from admin is worth your hourly rate in additional earnings.
        </p>
      </>
    ),
  },
  {
    id: 'profit-margin',
    heading: 'Profit Margin: Why Break-Even Is Not Enough',
    content: (
      <>
        <p>
          The formula gives you your break-even rate — the rate at which you earn your target income
          and cover your overheads, with nothing left over. That is not enough. You need a profit
          margin on top.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Business growth:</strong> Profit funds better tools, a newer van, additional
                training, marketing, or hiring an apprentice. Without profit, your business stands
                still.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency fund:</strong> A broken-down van, a stolen tool kit, a quiet
                month, or an unexpected tax bill. Profit builds the buffer that keeps you trading
                through rough patches.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fair compensation:</strong> You carry the risk of self-employment — no sick
                pay, no holiday pay, no employer pension contributions. Profit compensates for that
                risk. If you are not earning more than you would as an employee, why take the risk?
              </span>
            </li>
          </ul>
        </div>
        <p>
          A healthy profit margin for a self-employed electrician is 10% to 20% on top of costs. On
          a break-even rate of £50 per hour, that means charging £55 to £60 per hour. This does not
          make you expensive — it makes you sustainable. The electrician charging £35 per hour and
          barely surviving is the one with the pricing problem, not you.
        </p>
      </>
    ),
  },
  {
    id: 'pricing-methods',
    heading: 'Hourly Rate vs Day Rate vs Fixed Price',
    content: (
      <>
        <p>
          Your calculated hourly rate is the foundation — but how you present your pricing to
          customers matters. Different situations call for different pricing methods.
        </p>
        <div className="grid gap-4 sm:grid-cols-3 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Hourly Rate</h3>
            <p className="text-white text-sm leading-relaxed">
              Best for: fault-finding, investigation work, and small jobs where the scope is
              genuinely uncertain. Quote an hourly rate with an estimated time range. Risk: if the
              job takes longer, the customer pays more — which can cause friction. Reward: you are
              paid for every hour worked.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Day Rate</h3>
            <p className="text-white text-sm leading-relaxed">
              Best for: subcontract work and longer projects. A day rate of £280 to £350 (based on
              your hourly rate times 7 to 8 hours) is straightforward. Common for{' '}
              <SEOInternalLink href="/guides/cis-for-electricians">CIS work</SEOInternalLink>. Risk:
              if you work 10 hours, your effective hourly rate drops. Reward: simple and
              predictable.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Fixed Price</h3>
            <p className="text-white text-sm leading-relaxed">
              Best for: defined jobs (consumer unit upgrade, rewire, EV charger installation). Quote
              a total price including labour and materials. Risk: if the job takes longer than
              estimated, your profit shrinks. Reward: if you are efficient, your effective hourly
              rate increases. Customers love fixed prices.
            </p>
          </div>
        </div>
        <p>
          Most successful self-employed electricians use a mix: fixed prices for standard domestic
          jobs, day rates for subcontract and commercial work, and hourly rates for diagnostic and
          fault-finding work. The key is that every pricing method starts from your calculated
          hourly rate — you just present it differently.
        </p>
        <SEOAppBridge
          title="Generate accurate fixed-price quotes in minutes"
          description="Elec-Mate's AI cost engineer uses real trade pricing data to calculate labour, materials, and overheads for any job. Generate professional quotes from your phone that cover your costs and protect your margin."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'adjusting-rate',
    heading: 'When to Raise Your Rate',
    content: (
      <>
        <p>
          Your hourly rate is not set in stone. Review it at least once a year — and raise it when
          the numbers tell you to.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>You are fully booked 3 to 4 weeks in advance.</strong> If demand exceeds
                your capacity, your rate is too low. Raise it until you are comfortably busy but not
                turning away so much work that you cannot cover quiet periods.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Your overheads have increased.</strong> Fuel, insurance, materials, and van
                costs all rise over time. If your overheads have gone up by 10% but your rate has
                not, your profit has dropped by more than 10% (because overheads are a larger
                proportion of the total).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>You have gained qualifications or specialist skills.</strong> Completing the
                2391, gaining AM2, or specialising in EV charging, solar PV, or fire alarm systems
                adds value. Specialist skills command premium rates.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Your take-home pay does not reflect your hours.</strong> If you are working
                50 hours per week but earning less than you would as an employee, something is
                wrong. Run the calculation again and adjust.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Elec-Mate's{' '}
          <SEOInternalLink href="/tools/expense-tracker">business analytics</SEOInternalLink> show
          you your actual profit margin, average job value, and effective hourly rate across all
          jobs. Use this data to make pricing decisions based on facts, not feelings.
        </p>
      </>
    ),
  },
  {
    id: 'using-elec-mate',
    heading: 'Using Elec-Mate to Price Jobs Accurately',
    content: (
      <>
        <p>
          Calculating your hourly rate is the foundation. But on each individual job, you also need
          to estimate the labour time, materials cost, and overhead allocation accurately. This is
          where most electricians underquote — and where Elec-Mate transforms your pricing.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">AI Cost Engineer</h4>
                <p className="text-white text-sm leading-relaxed">
                  Describe the job — "consumer unit upgrade, 10 circuits, SPD, throughout earthing
                  upgrade" — and the AI calculates the labour time, materials list with current
                  trade prices, and overhead allocation. It produces a profitable quote in minutes
                  that you can send to the customer immediately.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <BarChart3 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Job Profitability Analysis</h4>
                <p className="text-white text-sm leading-relaxed">
                  After each job, see the actual profit versus the quoted price. Track your
                  effective hourly rate by job type. Identify which types of work are most
                  profitable and which are costing you money. Use this data to refine your pricing.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <TrendingUp className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Cash Flow Planner</h4>
                <p className="text-white text-sm leading-relaxed">
                  See your income, expenses, and projected profit in real time. Forecast your tax
                  liability. Plan for quiet periods. Know exactly where you stand financially — not
                  at the end of the year, but today.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Stop guessing — start pricing for profit"
          description="Elec-Mate's AI cost engineer, job profitability tracker, and cash flow planner give you the financial clarity to price every job for profit. Know your numbers, grow your business. 7-day free trial."
          icon={Target}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function HourlyRateCalculatorGuidePage() {
  return (
    <GuideTemplate
      title="Hourly Rate Calculator for Electricians | Set Your Rate"
      description="Calculate your true hourly rate as a UK electrician. Covers overheads, billable hours, profit margin, pricing methods, and a step-by-step formula to set a rate that covers all costs and delivers the income you deserve."
      datePublished="2026-01-22"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Pricing Guide"
      badgeIcon={Calculator}
      heroTitle={
        <>
          Hourly Rate Calculator for Electricians:{' '}
          <span className="text-yellow-400">Set a Rate That Actually Works</span>
        </>
      }
      heroSubtitle="Most self-employed electricians undercharge because they do not calculate their rate properly. This guide gives you the exact formula — covering overheads, billable hours, tax, and profit margin — so you can set a rate that covers every cost and delivers the income you deserve."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrician Hourly Rates"
      relatedPages={relatedPages}
      ctaHeading="Price Every Job for Profit"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate to generate accurate quotes, track job profitability, and manage cash flow. AI cost engineer, expense tracking, and business analytics — all from your phone. 7-day free trial, cancel anytime."
    />
  );
}
