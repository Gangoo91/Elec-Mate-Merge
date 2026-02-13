import { Helmet } from 'react-helmet';
import useSEO from '@/hooks/useSEO';
import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import { SEOCTASection } from '@/components/seo/SEOCTASection';
import { SEOFeatureGrid } from '@/components/seo/SEOFeatureGrid';
import {
  Zap,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  ArrowDown,
  PoundSterling,
  Clock,
  TrendingUp,
  Calculator,
  BarChart3,
  AlertTriangle,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    question: 'How do I calculate profit on an electrical job?',
    answer:
      "To calculate profit on an electrical job, you need to add up all your costs — materials, labour hours (including your own time at your true hourly rate), travel time, waste, consumables, and a share of your fixed overheads (van, insurance, tools, certification fees). Subtract the total cost from the price you quoted or invoiced. The result is your gross profit. Divide the gross profit by the quoted price and multiply by 100 to get your gross profit margin as a percentage. A healthy gross margin for electrical work in the UK is typically between 25% and 40%, depending on the job type. Elec-Mate's Job Profitability Calculator automates this entire calculation — enter the job details, and it produces a full breakdown including profit per hour worked, so you can see which jobs are genuinely worth your time.",
  },
  {
    question: 'What is a good profit margin for an electrician?',
    answer:
      'A good gross profit margin for an electrician in the UK is typically between 25% and 40%. Labour-intensive jobs with low material costs (such as testing, inspection, and fault-finding) tend to have higher margins, often 35% to 50%. Material-heavy jobs (such as rewires or consumer unit upgrades) tend to have lower margins, typically 20% to 30%, because a large portion of the invoice is materials that you cannot mark up significantly without becoming uncompetitive. Net profit margin — after deducting all business overheads, tax, and National Insurance — is typically 15% to 25% for a well-run sole trader electrical business. If your net margin is consistently below 15%, you are likely undercharging or your overhead costs are too high.',
  },
  {
    question: 'Why do electricians lose money on jobs?',
    answer:
      "The most common reasons electricians lose money on jobs are: underestimating labour time (especially on rewires and first fixes where cable routes are difficult), forgetting to account for travel time and return visits, underpricing materials (not including wastage, fixings, and consumables like tape, clips, and gland kits), not charging for testing and certification time, absorbing the cost of call-backs and snagging without adjusting future quotes, and failing to include a share of fixed overheads in the job cost. Many electricians also undercharge because they compare themselves to competitors without understanding those competitors' cost structures — a competitor charging £30 per hour may be running at a loss without realising it. Elec-Mate's calculator forces you to account for every cost, making hidden losses visible.",
  },
  {
    question: 'Should I charge for travel time?',
    answer:
      "Yes, you should account for travel time in your job pricing. Travel time is productive time that you cannot bill to another client. The question is how you account for it — some electricians add a call-out fee (typically £30 to £60), others build travel time into their hourly rate, and others add a line item for travel on the quote. The approach depends on your market and client expectations. For domestic work, a call-out fee is common and accepted. For commercial work, travel is usually built into the day rate. For jobs more than 30 minutes from your base, you should definitely charge explicitly — either as a line item or by increasing the labour hours to include travel. Elec-Mate's Job Profitability Calculator includes a travel time field so you can see the true impact of travel on your profit margin.",
  },
  {
    question: 'How do I account for overheads in my job pricing?',
    answer:
      'Your overheads are the fixed costs of running your business that exist whether you are on a job or not — van costs (lease, fuel, insurance, MOT, road tax), tools and test equipment (purchase, calibration, replacement), insurance (public liability, professional indemnity), certification body fees (NICEIC, NAPIT, ELECSA), accounting fees, phone and internet, marketing, training and CPD, and workwear. To allocate overheads to individual jobs, calculate your total annual overheads, divide by the number of billable hours you work per year (typically 1,400 to 1,600 hours for a sole trader after holidays, training, admin, and unbillable time), and add that hourly overhead figure to your labour cost for each job. For example, if your annual overheads are £15,000 and you work 1,500 billable hours, your overhead rate is £10 per hour. Elec-Mate lets you set your overhead percentage once and applies it automatically to every job calculation.',
  },
  {
    question: 'What is profit per hour worked and why does it matter?',
    answer:
      'Profit per hour worked is arguably the most important metric for any electrician running their own business. It tells you how much actual profit you make for every hour of your time spent on a job — including travel, admin, and snagging, not just the hours on site. A job that pays £2,000 profit sounds great, but if it took 80 hours of your time (including quoting, site visits, procurement, the work itself, testing, certification, and invoicing), that is only £25 per hour profit. Compare that with a smaller job paying £400 profit that took 8 hours total — that is £50 per hour profit. Profit per hour helps you identify which job types are genuinely most profitable and should be prioritised, and which ones are consuming your time for inadequate return. Elec-Mate calculates this automatically for every job.',
  },
];

const features = [
  {
    icon: Calculator,
    title: 'Complete Cost Breakdown',
    description:
      'Enter materials, labour hours, travel, waste, and overheads. The calculator totals every cost so nothing is missed — no more "I forgot to include the fixings" moments.',
  },
  {
    icon: PoundSterling,
    title: 'Markup & Margin Calculator',
    description:
      'Set your desired markup percentage or target margin. The calculator shows the difference between the two and helps you price to hit your profit target every time.',
  },
  {
    icon: Clock,
    title: 'Profit Per Hour Worked',
    description:
      'See your actual profit per hour of time invested — including travel, admin, quoting, and snagging. Compare jobs to find which types deliver the best return on your time.',
  },
  {
    icon: TrendingUp,
    title: 'Actual vs Quoted Comparison',
    description:
      'After the job, enter actual costs and compare against the original quote. Identify where you over or underestimated and improve future pricing accuracy.',
  },
  {
    icon: BarChart3,
    title: 'Job Type Profitability Trends',
    description:
      'Track profitability across different job types — rewires, board changes, testing, EV chargers. See which work generates the highest margin and focus your marketing there.',
  },
  {
    icon: AlertTriangle,
    title: 'Hidden Cost Alerts',
    description:
      'The calculator flags common hidden costs that electricians forget — travel time, call-back allowance, certification time, waste percentage, and overhead allocation.',
  },
];

const softwareAppSchema = {
  '@type': 'SoftwareApplication',
  name: 'Elec-Mate Job Profitability Calculator',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, iOS, Android',
  description:
    'Calculate profit margins on every electrical job. Track material costs, labour hours, overheads, and actual vs quoted prices. Part of 14 business calculators for UK electricians.',
  url: 'https://elec-mate.com/tools/job-profitability-calculator',
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
};

const faqSchema = {
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

export default function JobProfitabilityCalculatorPage() {
  useSEO({
    title: 'Job Profitability Calculator for Electricians',
    description:
      'Calculate profit margins on every electrical job. Track material costs, labour hours, overheads, and actual vs quoted prices. Make every job profitable. Part of 14 business calculators.',
  });

  return (
    <PublicPageLayout>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({ '@context': 'https://schema.org', ...softwareAppSchema })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({ '@context': 'https://schema.org', ...faqSchema })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-28 px-5">
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            Part of 14 Business Calculators
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight mb-5">
            Job Profitability Calculator
            <span className="block text-yellow-400 mt-1">Know Your Profit on Every Job</span>
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-2xl mx-auto mb-8 leading-relaxed">
            Stop guessing whether a job made money. Elec-Mate's Job Profitability Calculator tracks
            every cost — materials, labour, travel, overheads — and shows you the true profit margin
            and profit per hour worked.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/auth/signup"
              className="h-11 px-8 inline-flex items-center justify-center rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-semibold touch-manipulation transition-colors"
            >
              Start Calculating Free
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
            <a
              href="#what-is-job-profitability"
              className="h-11 px-8 inline-flex items-center justify-center rounded-xl border border-white/20 text-white font-medium hover:border-yellow-500/40 touch-manipulation transition-colors"
            >
              How It Works
              <ArrowDown className="w-4 h-4 ml-1" />
            </a>
          </div>
        </div>
      </section>

      {/* What Is Job Profitability */}
      <section id="what-is-job-profitability" className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <TrendingUp className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              What Is Job Profitability and Why Does It Matter?
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Job profitability is the difference between what you charge for a job and what it
              actually costs you to deliver it. It sounds simple, but most electricians do not
              calculate it accurately — and many do not calculate it at all. They finish a job,
              deposit the payment, and assume they made money because their bank balance went up.
              But without tracking every cost, you cannot know whether a specific job was
              profitable, breakeven, or a loss.
            </p>
            <p>
              The formula is straightforward:{' '}
              <strong className="text-yellow-400">
                Total Revenue - Total Costs = Gross Profit
              </strong>
              . The challenge is capturing all the costs. Total costs include direct costs
              (materials purchased for the job, labour hours at your true rate, subcontractor costs)
              and indirect costs (a share of your van, insurance, tools, certification body fees,
              and other overheads). Most electricians capture the materials and their time on site,
              but forget about travel time, procurement time (visiting the wholesaler), admin time
              (writing the quote, producing the certificate, sending the invoice), waste,
              consumables, and the overhead allocation.
            </p>
            <p>
              <strong className="text-yellow-400">The result of not tracking profitability</strong>{' '}
              is that electricians unknowingly subsidise unprofitable jobs with profitable ones. A
              domestic rewire might look like it pays well at £4,500, but when you account for 5
              days of labour, 2 return visits for snagging, 3 hours of testing and certification, 2
              hours of procurement, travel costs, and material wastage, the actual profit might be
              £800 — or £16 per hour worked. Meanwhile, a 2-hour EICR inspection at £180 might yield
              £120 profit — £60 per hour worked. Without tracking, you would never see this
              disparity.
            </p>
            <p>
              Elec-Mate's Job Profitability Calculator is designed to make this tracking simple and
              automatic. It is one of 14 specialist business calculators in the Business Hub,
              alongside tools for hourly rate calculation, cash flow planning, tax estimation, VAT
              scheme comparison, and quote variance tracking. Together, they give you a complete
              financial picture of your electrical business.
            </p>
          </div>
        </div>
      </section>

      {/* How to Calculate Job Profitability */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Calculator className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              How to Calculate Job Profitability Step by Step
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              <strong className="text-yellow-400">Step 1 — Material costs:</strong> List every
              material used on the job, including the items you do not normally think about — cable
              clips, gland kits, fixings, earth sleeving, labels, fire hoods, and sealant. Add a
              wastage factor of 5% to 10% for cable and 3% to 5% for accessories. Include delivery
              charges if applicable. Use trade prices, not retail — your supplier invoices are the
              source of truth, not the wholesaler website.
            </p>
            <p>
              <strong className="text-yellow-400">Step 2 — Labour hours:</strong> Include all time
              spent on the job, not just the hours on site. This means travel time (both ways, every
              visit), time spent at the wholesaler, time spent writing the quote and producing the
              certificate, time testing, and any return visits for snagging or remedial work.
              Multiply the total hours by your true hourly rate (which should include your desired
              salary plus a contribution to overheads — see the Hourly Rate Calculator for how to
              work this out).
            </p>
            <p>
              <strong className="text-yellow-400">Step 3 — Overhead allocation:</strong> Your fixed
              costs exist whether you are on a job or not. They include van costs (lease or
              depreciation, fuel, insurance, MOT, road tax, servicing), tool and test equipment
              costs (purchase, calibration, replacement), insurance (public liability, professional
              indemnity, employer's liability if you have staff), certification body fees (NICEIC,
              NAPIT, ELECSA), accounting fees, phone and internet, website and marketing, and
              training. Calculate your total annual overheads, divide by your annual billable hours,
              and multiply by the hours spent on this job.
            </p>
            <p>
              <strong className="text-yellow-400">Step 4 — Calculate profit:</strong> Add material
              costs + labour costs + overhead allocation = total cost. Subtract total cost from the
              quoted or invoiced price to get gross profit. Divide gross profit by the invoiced
              price and multiply by 100 to get your gross margin percentage. Divide gross profit by
              total hours worked to get profit per hour — this is the number that really tells you
              whether the job was worth doing.
            </p>
          </div>
        </div>
      </section>

      {/* Common Pricing Mistakes */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Common Pricing Mistakes Electricians Make
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              <strong className="text-yellow-400">Forgetting travel time:</strong> A job 45 minutes
              from your base costs you 1.5 hours of travel per visit (both ways). Over 3 visits,
              that is 4.5 hours of unbilled time. At £45 per hour, that is over £200 of lost income
              — enough to turn a profitable job into a breakeven one.
            </p>
            <p>
              <strong className="text-yellow-400">Underpricing materials:</strong> Using retail
              prices instead of trade prices is one mistake, but the more common one is forgetting
              consumables. Cable clips, earth sleeving, labels, fire barrier compound, expanding
              foam, fixings, and gland kits might only cost £20 to £40 per job, but over 200 jobs a
              year that is £4,000 to £8,000 of unrecovered costs.
            </p>
            <p>
              <strong className="text-yellow-400">Not accounting for call-backs:</strong> Even the
              best electricians get call-backs. A snagging visit to tighten a connection, replace a
              damaged faceplate, or adjust a light fitting typically takes 1 to 2 hours including
              travel. If you get called back on 10% of jobs, and each call-back costs you £80 in
              time and fuel, that is a significant hidden cost that should be built into your
              pricing.
            </p>
            <p>
              <strong className="text-yellow-400">Ignoring certification time:</strong> Testing a
              domestic installation properly takes 1 to 3 hours depending on the size and
              complexity. Producing the EICR, EIC, or Minor Works certificate, uploading it to your
              certification body portal, and emailing it to the client takes another 30 to 60
              minutes. If you are not pricing this time into the job, you are doing it for free.
            </p>
            <p>
              <strong className="text-yellow-400">Confusing markup with margin:</strong> A 30%
              markup on a £1,000 cost gives a price of £1,300 and a profit of £300 — but that is a
              23% margin, not 30%. If you are aiming for a 30% margin, you need a 43% markup.
              Elec-Mate's calculator shows both figures so you can price accurately regardless of
              which method you use.
            </p>
          </div>
        </div>
      </section>

      {/* How Elec-Mate's Calculator Works */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <BarChart3 className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              How Elec-Mate's Job Profitability Calculator Works
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Elec-Mate's calculator is built specifically for electrical contractors. It
              understands the cost structure of electrical work and prompts you for every relevant
              input so nothing is missed. Enter the job details — description, quoted price, job
              type (rewire, board change, additional circuits, testing, EV charger, commercial
              fit-out) — and the calculator guides you through capturing every cost.
            </p>
            <p>
              <strong className="text-yellow-400">Material costs</strong> can be entered manually or
              pulled from the built-in material pricing database with current UK trade prices. The
              calculator automatically applies your wastage percentage and includes delivery
              charges. You can add multiple material categories — cable, accessories, protective
              devices, containment, fixings, and sundries.
            </p>
            <p>
              <strong className="text-yellow-400">Labour costs</strong> are calculated from the
              hours worked multiplied by the operative's rate. The calculator supports multiple
              operatives at different rates — qualified electrician, improver, apprentice, labourer
              — reflecting the reality of larger jobs. Travel time and admin time are tracked
              separately so you can see their impact on profitability.
            </p>
            <p>
              <strong className="text-yellow-400">Overhead allocation</strong> uses the overhead
              percentage you set in your business profile. This figure is calculated by the Hourly
              Rate Calculator (another tool in the Business Hub) and represents the hourly cost of
              running your business beyond direct job costs.
            </p>
            <p>
              The output is a comprehensive profitability report showing total costs, gross profit,
              gross margin percentage, net margin, profit per hour worked, and a comparison against
              your target margin. If the job falls below your target, the calculator shows you what
              price you should have quoted to achieve it — information you can use to improve future
              pricing.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-3">
            Key Features of the Job Profitability Calculator
          </h2>
          <p className="text-white text-center mb-10 max-w-2xl mx-auto">
            Purpose-built for UK electricians. Every cost captured, every margin calculated, every
            job analysed.
          </p>
          <SEOFeatureGrid features={features} columns={3} />
        </div>
      </section>

      {/* Why Electricians Choose Elec-Mate */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <CheckCircle2 className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Why Electricians Choose Elec-Mate for Job Profitability
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Elec-Mate is not a generic business tool — it is built exclusively for UK
              electricians. The Job Profitability Calculator is one of 14 business calculators in
              the Business Hub, sitting alongside 56 technical calculators (cable sizing, voltage
              drop, fault current, Zs values, and more), 8 certificate types (EICR, EIC, Minor
              Works, EV charger, and more), 8 Elec-AI agents with 12 AI tools, and 36+ training
              courses. Everything works together in one platform.
            </p>
            <p>
              The profitability data you generate feeds into your business reports, helping you spot
              trends over time. You can see which job types are most profitable, which clients
              generate the best margins, and which areas of your business need attention. Over 430
              UK electricians already use Elec-Mate to run more profitable businesses — from sole
              traders doing domestic work to companies managing multiple operatives on commercial
              projects.
            </p>
            <p>
              Compliance is built in: all calculations reference BS 7671:2018+A3:2024 (the 18th
              Edition with Amendment 3, issued July 2024) where relevant, and the platform is fully
              GDPR compliant. Your financial data is encrypted in transit and at rest, stored
              securely on UK-region servers, and never shared with third parties.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <HelpCircle className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group border border-white/10 rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between p-4 min-h-[44px] touch-manipulation cursor-pointer text-white font-medium">
                  <span>{faq.question}</span>
                  <ChevronDown className="w-5 h-5 text-yellow-400 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-4 pb-4 text-white text-sm leading-relaxed">{faq.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <SEOCTASection
        heading="Make Every Job Profitable"
        subheading="Join 430+ UK electricians using Elec-Mate to track job profitability, calculate true margins, and price with confidence. 7-day free trial, cancel anytime."
      />

      {/* Bottom padding for mobile sticky CTA */}
      <div className="h-20 sm:h-0" />
    </PublicPageLayout>
  );
}
