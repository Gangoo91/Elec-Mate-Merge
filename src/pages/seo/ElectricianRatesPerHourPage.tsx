import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  PoundSterling,
  Clock,
  MapPin,
  TrendingUp,
  Calculator,
  Briefcase,
  AlertTriangle,
  BarChart3,
  Phone,
  Wrench,
  Receipt,
  Building,
  Zap,
  GraduationCap,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Career', href: '/guides/electrician-career-progression' },
  { label: 'Hourly Rates', href: '/guides/electrician-rates-per-hour-uk' },
];

const tocItems = [
  { id: 'average-hourly-rates', label: 'Average Hourly Rates 2026' },
  { id: 'callout-charges', label: 'Callout Charges' },
  { id: 'emergency-rates', label: 'Emergency and Out-of-Hours Rates' },
  { id: 'weekend-evening', label: 'Weekend and Evening Rates' },
  { id: 'by-job-type', label: 'Rates by Job Type' },
  { id: 'setting-your-rate', label: 'How to Set Your Hourly Rate' },
  { id: 'hourly-vs-fixed', label: 'Hourly Rate vs Fixed Price' },
  { id: 'common-mistakes', label: 'Common Pricing Mistakes' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The average electrician hourly rate in the UK in 2026 is £40 to £60 per hour for standard domestic work, with London and the South East at the higher end.',
  'Callout charges typically range from £50 to £100 for the first hour, covering travel time, diagnosis, and the first hour of labour.',
  'Emergency and out-of-hours rates are 1.5x to 2x the standard hourly rate — typically £80 to £120 per hour for evening and weekend callouts.',
  'Most experienced domestic electricians prefer fixed-price quoting over hourly rates because it rewards efficiency and gives the customer certainty.',
  'Elec-Mate quoting app calculates job prices based on your hourly rate, estimated time, materials, and overheads — producing professional quotes in minutes.',
];

const faqs = [
  {
    question: 'What is the average electrician hourly rate in the UK?',
    answer:
      'The average hourly rate for a qualified self-employed electrician in the UK in 2026 is between £40 and £60 per hour for standard domestic work during normal working hours. In London and the South East, rates of £55 to £75 per hour are common. In the North of England, Wales, and parts of Scotland, typical rates are £35 to £50 per hour. These rates are for labour only — materials are charged separately. The rate varies based on the electrician experience, qualifications, the type of work, and local market conditions. Commercial electricians working on sites typically charge day rates rather than hourly rates, but the hourly equivalent is usually similar or slightly higher.',
  },
  {
    question: 'Should I charge per hour or per job?',
    answer:
      'For most domestic electrical work, fixed-price quoting (per job) is better for both you and the customer. The customer knows exactly what they will pay, which reduces disputes and makes it easier for them to say yes. You benefit because fixed pricing rewards efficiency — the faster you complete the job, the higher your effective hourly rate. Hourly rates are more appropriate for work with unpredictable scope — fault finding, diagnostic work, and maintenance where you genuinely do not know how long it will take. Even then, many electricians offer a fixed-price diagnostic fee (e.g. £80 for the first hour) and then quote a fixed price for the repair based on their findings. The key is transparency: whichever method you use, make sure the customer understands what they are paying for before you start.',
  },
  {
    question: 'How much should I charge for a callout?',
    answer:
      'A callout charge covers your travel time to the property, initial diagnosis, and the first period of work (typically the first hour). Average callout charges in the UK range from £50 to £100 depending on your location and time of day. In London and the South East, £80 to £120 is common. For evening and weekend callouts, most electricians charge 1.5x to 2x their standard callout fee. The callout charge is separate from any additional work — if the repair takes longer than the first hour, you charge your standard hourly rate or quote a fixed price for the additional work. Always state your callout charge upfront when the customer calls. This avoids disputes and filters out customers who are purely price-shopping.',
  },
  {
    question: 'What should I charge for emergency electrical work?',
    answer:
      'Emergency callout rates for electricians typically range from £80 to £150 per hour, depending on the time of day and your location. Standard evening (after 6pm) and Saturday rates are usually 1.5x your normal rate. Sunday, bank holiday, and late-night (after 10pm) rates are typically 2x your normal rate. For example, if your standard rate is £50 per hour, your evening rate would be £75 and your Sunday rate would be £100. Emergency work should always be priced higher than standard work — you are providing an on-demand service outside normal hours, which means sacrificing your personal time. Some electricians charge a flat emergency callout fee (e.g. £120 to arrive within 2 hours) plus their hourly rate for work beyond the first hour. Whatever your pricing structure, make it clear to the customer before you attend.',
  },
  {
    question: 'How do electrician rates compare to other trades?',
    answer:
      'Electricians typically charge similar rates to plumbers and slightly more than general builders and carpenters. In 2026, average hourly rates across UK trades are approximately: electricians £40-£60, plumbers £40-£60, gas engineers £45-£65, carpenters £30-£45, general builders £30-£45, and decorators £25-£40. The higher rates for electricians, plumbers, and gas engineers reflect the longer training periods, the regulatory requirements (competent person schemes, certification), and the safety-critical nature of the work. Specialist electrical work (testing, EV charging, solar) commands even higher rates. The key point is that electricians should not feel uncomfortable charging £45 to £60 per hour — this is the market rate for skilled, qualified, insured, and regulated trade work.',
  },
  {
    question: 'How often should I increase my hourly rate?',
    answer:
      'You should review your rates at least once per year, ideally in January. Most electricians increase their rates by 3-7% annually to keep pace with inflation, rising costs (fuel, insurance, materials), and their growing experience. If you have not raised your rates for 2 or more years, you are effectively taking a pay cut after inflation. When you raise your rates, notify existing customers in advance and explain the reason (increased costs, additional qualifications, inflation). Most customers accept reasonable annual increases without complaint. If you lose a few price-sensitive customers, replace them with new clients at your higher rate. The electricians who earn the most are those who raise their rates consistently and confidently, not those who are afraid to charge what they are worth.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/electrician-day-rates-uk',
    title: 'Electrician Day Rates UK',
    description:
      'Day rates by region, sector, and experience level for self-employed electricians.',
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
    href: '/guides/electrician-salary-uk',
    title: 'Electrician Salary UK 2026',
    description: 'Full salary data for employed and self-employed electricians across the UK.',
    icon: BarChart3,
    category: 'Guide',
  },
  {
    href: '/guides/contractor-vs-employee-electrician',
    title: 'Contractor vs Employee',
    description: 'Financial comparison of contracting versus employment for electricians.',
    icon: Briefcase,
    category: 'Guide',
  },
  {
    href: '/guides/going-self-employed-electrician',
    title: 'Going Self-Employed',
    description: 'Step-by-step guide to starting your own electrical business.',
    icon: TrendingUp,
    category: 'Guide',
  },
  {
    href: '/tools/job-profitability-calculator',
    title: 'Job Profitability Calculator',
    description:
      'Calculate your true profit on every job — materials, labour, overheads, and margin.',
    icon: Receipt,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'average-hourly-rates',
    heading: 'Average Electrician Hourly Rates in the UK (2026)',
    content: (
      <>
        <p>
          The hourly rate is the most common way for domestic electricians to price their work,
          particularly for smaller jobs, fault finding, and maintenance work. Here are the current
          average hourly rates across the UK:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>London:</strong> £55 to £75 per hour. The highest rates in the UK,
                reflecting the cost of living, congestion, and strong demand.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>South East:</strong> £45 to £65 per hour. Close to London rates in cities
                like Brighton, Reading, and Guildford.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>South West:</strong> £40 to £55 per hour. Bristol and Bath at the higher
                end; rural areas lower.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Midlands:</strong> £38 to £55 per hour. Birmingham, Coventry, and Nottingham
                pay above average.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>North West:</strong> £35 to £50 per hour. Manchester and Liverpool at the
                higher end.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>North East and Yorkshire:</strong> £35 to £48 per hour. Leeds, Sheffield,
                and Newcastle are the best-paying cities.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scotland:</strong> £35 to £50 per hour. Edinburgh and Glasgow above average.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wales:</strong> £35 to £48 per hour. Cardiff above average; rural Wales at
                the lower end.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These rates are for labour only during normal working hours (typically 8am to 5pm, Monday
          to Friday). Materials, callout charges, and out-of-hours premiums are separate. If you are
          charging below the lower end of these ranges for your area, you are almost certainly
          undercharging.
        </p>
      </>
    ),
  },
  {
    id: 'callout-charges',
    heading: 'Callout Charges: What to Include',
    content: (
      <>
        <p>
          A callout charge covers the cost of travelling to the property, diagnosing the issue, and
          the first period of work. It is your minimum charge for attending — even if the job only
          takes 15 minutes, the customer pays the callout fee.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Typical Callout Charges 2026</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standard callout (daytime):</strong> £50 to £100, typically covering the
                first hour including travel, diagnosis, and initial work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Evening callout (after 6pm):</strong> £80 to £130. Premium for attending
                outside normal hours.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Weekend callout:</strong> £100 to £150. Saturday and Sunday work commands a
                significant premium.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency callout (immediate):</strong> £120 to £200. For urgent situations
                where you attend within 1-2 hours, any time of day or night.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Always state your callout charge when the customer first contacts you. This sets
          expectations, avoids disputes, and filters out customers who are not serious. A customer
          who balks at a £75 callout fee is unlikely to accept a £400 repair quote — better to know
          this before you drive to the property.
        </p>
      </>
    ),
  },
  {
    id: 'emergency-rates',
    heading: 'Emergency and Out-of-Hours Rates',
    content: (
      <>
        <p>
          Emergency electrical work is one of the most profitable services an electrician can offer.
          Customers calling with a power outage, sparking socket, or tripped RCD at 9pm on a
          Saturday are not price-shopping — they need the problem fixed and they will pay a premium
          for fast response.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Emergency Rate Structure</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Evening (6pm to 10pm):</strong> 1.5x standard rate. If your standard rate is
                £50/hour, charge £75/hour.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Saturday:</strong> 1.5x standard rate. Same premium as evening work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sunday and bank holidays:</strong> 2x standard rate. Double time reflects
                the sacrifice of your rest day.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Night (10pm to 8am):</strong> 2x to 2.5x standard rate. Late-night work
                disrupts your sleep and the next working day — price accordingly.
              </span>
            </li>
          </ul>
        </div>
        <p>
          A simple emergency rate card on your website and van makes it easy for customers to
          understand your pricing. Being transparent about emergency rates builds trust — customers
          appreciate knowing the cost before they commit.
        </p>
        <p>
          Some electricians choose not to offer emergency callouts because they value their evenings
          and weekends. This is a personal choice — there is no obligation to be available 24/7. But
          if you do offer emergency services, price them properly. Your personal time has value.
        </p>
      </>
    ),
  },
  {
    id: 'weekend-evening',
    heading: 'Weekend and Evening Rates',
    content: (
      <>
        <p>
          Weekend and evening work is increasingly common for domestic electricians because many
          customers work during the day and prefer tradespeople to attend outside their own working
          hours. If you offer weekend and evening appointments as standard, you need a clear pricing
          structure:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Saturday mornings:</strong> Many electricians treat Saturday mornings as
                normal working hours at standard rate. This is a competitive advantage — customers
                love Saturday availability without a premium.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Saturday afternoons and evenings:</strong> 1.5x standard rate is the market
                norm for planned work outside normal hours.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Weekday evenings (6pm to 9pm):</strong> 1.25x to 1.5x standard rate for
                pre-booked evening work. This is separate from emergency callouts.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sundays:</strong> 2x standard rate. Most electricians do not work Sundays
                unless it is emergency or premium-rate work.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Offering flexible hours at premium rates is a smart business strategy. You earn more per
          hour during unsociable hours, and customers who need weekend or evening appointments are
          often willing to pay extra for the convenience. Use your{' '}
          <SEOInternalLink href="/guides/how-to-price-electrical-jobs">
            pricing strategy
          </SEOInternalLink>{' '}
          to maximise income from your available hours.
        </p>
      </>
    ),
  },
  {
    id: 'by-job-type',
    heading: 'Rates by Job Type',
    content: (
      <>
        <p>
          While hourly rates provide a baseline, many common domestic electrical jobs have typical
          price ranges that reflect the time, skill, and materials involved:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Socket or switch replacement:</strong> £60 to £120. A simple like-for-like
                swap takes 30 to 60 minutes including testing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New socket or light point:</strong> £120 to £250. Running new cable, cutting
                in the back box, connecting, and testing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit replacement:</strong> £450 to £900. Half to full day job
                including new board, MCBs/RCBOs, testing, and certification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full house rewire (3-bed):</strong> £3,500 to £5,500. Major project taking 5
                to 8 days. Materials, first fix, second fix, board, testing, and certification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR (3-bed house):</strong> £150 to £250. Periodic inspection and testing
                taking 2 to 4 hours including the report.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fault finding:</strong> £80 to £150 per hour. Diagnostic work requires
                experience and specialist test equipment. Premium pricing is justified.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These prices include labour and certification but typically exclude materials (which are
          charged separately at cost plus 15-30% markup). Always quote a total inclusive price to
          the customer — they do not care about your hourly rate, they want to know the total cost.
        </p>
      </>
    ),
  },
  {
    id: 'setting-your-rate',
    heading: 'How to Set Your Hourly Rate',
    content: (
      <>
        <p>
          Your hourly rate should be calculated from your costs, not copied from a competitor. Here
          is the formula:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Calculate your annual costs:</strong> Target income + pension + insurance +
              van + tools + competent person scheme + accountant + phone + PPE + training +
              marketing = total annual costs.
            </li>
            <li>
              <strong>Calculate your billable hours:</strong> 52 weeks minus 5 weeks holiday minus 1
              week sick minus 1 week training = 45 working weeks. Multiply by 5 days = 225 days.
              Subtract 25-30 days for admin, quoting, and non-billable time = approximately 200
              billable days. Multiply by 7 productive hours per day = 1,400 billable hours.
            </li>
            <li>
              <strong>Divide costs by billable hours:</strong> If your annual costs are £65,000 and
              you have 1,400 billable hours, your minimum hourly rate is £46.43. Add 15% profit
              margin = £53.39. Round to £55 per hour.
            </li>
          </ol>
        </div>
        <p>
          This calculation tells you the minimum you need to charge. The market may support a higher
          rate — if so, charge more. Your rate should also account for your experience level, your
          qualifications, and the value you provide. An electrician with 15 years of experience, a
          C&G 2391, and a reputation for reliability should charge more than a newly qualified
          electrician with no track record.
        </p>
        <SEOAppBridge
          title="Calculate your true hourly rate and job profitability"
          description="Elec-Mate job profitability calculator works out your true costs per hour, factors in all overheads, and tells you whether each job actually makes money. Stop guessing, start knowing. 7-day free trial."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'hourly-vs-fixed',
    heading: 'Hourly Rate vs Fixed Price: Which Is Better?',
    content: (
      <>
        <p>
          This is one of the most debated topics among self-employed electricians. Both approaches
          have advantages, and the best choice depends on the type of work:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Hourly Rate</h3>
            <ul className="space-y-2 text-white text-sm leading-relaxed">
              <li>
                <strong>Best for:</strong> Fault finding, diagnostic work, maintenance, jobs with
                unpredictable scope.
              </li>
              <li>
                <strong>Pros:</strong> You always get paid for your time. No risk of underquoting.
                Simple to explain.
              </li>
              <li>
                <strong>Cons:</strong> Customers dislike open-ended costs. You earn the same whether
                you work fast or slow. Can create distrust if jobs take longer than expected.
              </li>
            </ul>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Fixed Price</h3>
            <ul className="space-y-2 text-white text-sm leading-relaxed">
              <li>
                <strong>Best for:</strong> Defined installation work — new circuits, rewires,
                consumer units, lighting, socket additions.
              </li>
              <li>
                <strong>Pros:</strong> Customers love certainty. You earn more if you work
                efficiently. Higher perceived professionalism.
              </li>
              <li>
                <strong>Cons:</strong> Risk of underquoting if the job takes longer than expected.
                Requires accurate time estimation skills.
              </li>
            </ul>
          </div>
        </div>
        <p>
          The most successful domestic electricians use a hybrid approach: fixed prices for defined
          installation work (where they can estimate time and materials accurately) and hourly rates
          for diagnostic and unpredictable work. The{' '}
          <SEOInternalLink href="/guides/how-to-price-electrical-jobs">
            Elec-Mate quoting app
          </SEOInternalLink>{' '}
          supports both approaches, letting you create professional quotes based on either method.
        </p>
      </>
    ),
  },
  {
    id: 'common-mistakes',
    heading: 'Common Pricing Mistakes to Avoid',
    content: (
      <>
        <p>
          Pricing mistakes cost electricians thousands of pounds every year. Here are the most
          common errors and how to avoid them:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Forgetting non-billable time.</strong> If you spend 2 hours per day on
                quoting, admin, purchasing materials, and travel, you only have 6 billable hours.
                Your rate needs to cover 8 hours of your time in 6 billable hours.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Not charging for certification time.</strong> Completing an EIC or Minor
                Works certificate takes 30 to 60 minutes. If you do not include this in the job
                price, you are working for free.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Underpricing materials.</strong> Always add a markup to materials — 15-30%
                is standard. You are providing a service by sourcing, transporting, and managing
                materials. The customer pays trade price plus your markup, which is still usually
                less than retail.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Racing to the bottom.</strong> Competing on price is a losing strategy. The
                cheapest electrician in an area attracts the worst customers — they will haggle,
                complain, and pay late. Compete on quality, reliability, and professionalism
                instead.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Not reviewing rates annually.</strong> Inflation, rising fuel costs, and
                increasing insurance premiums erode your margin every year. If you do not raise your
                rates, your real income is falling.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Professional quotes that win work at the right price"
          description="Elec-Mate quoting app builds in your overheads, materials markup, and profit margin automatically. Send branded quotes from site and convert them to invoices with one tap. 7-day free trial."
          icon={Receipt}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianRatesPerHourPage() {
  return (
    <GuideTemplate
      title="Electrician Rates Per Hour UK 2026 | Pricing Guide"
      description="Complete guide to electrician hourly rates in the UK. Average rates by region, callout charges, emergency rates, weekend and evening pricing, rate calculations, and common pricing mistakes to avoid."
      datePublished="2025-07-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Pricing Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          Electrician Rates Per Hour UK:{' '}
          <span className="text-yellow-400">The 2026 Pricing Guide</span>
        </>
      }
      heroSubtitle="From standard hourly rates to emergency callout charges — this is the definitive guide to electrician pricing in the UK. Know what to charge, how to structure your rates, and the common mistakes that cost you money."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrician Hourly Rates"
      relatedPages={relatedPages}
      ctaHeading="Price Every Job Right with Elec-Mate"
      ctaSubheading="Quoting app, job profitability calculator, and expense tracking — all built for electricians who want to earn what they are worth. 7-day free trial, cancel anytime."
    />
  );
}
