import BusinessTemplate from '@/pages/seo/templates/BusinessTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Calculator,
  PoundSterling,
  Clock,
  Percent,
  BarChart3,
  ShieldCheck,
  Briefcase,
  FileText,
  Receipt,
  TrendingUp,
  Users,
  Wrench,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Business Tools', href: '/tools' },
  { label: 'Cost Estimator', href: '/tools/electrical-project-cost-estimator' },
];

const tocItems = [
  { id: 'why-cost-estimating', label: 'Why Cost Estimating Matters' },
  { id: 'labour-rates', label: 'Labour Rates' },
  { id: 'materials-markup', label: 'Materials Markup' },
  { id: 'overhead-recovery', label: 'Overhead Recovery' },
  { id: 'contingency', label: 'Contingency Allowance' },
  { id: 'profit-margin', label: 'Profit Margin Calculation' },
  { id: 'quoting-process', label: 'The Quoting Process' },
  { id: 'features', label: 'Features' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Accurate cost estimating is the difference between a profitable electrical business and one that slowly bleeds money -- every job must cover labour, materials, overheads, contingency, and profit.',
  'Labour rates must account for the full employment cost (not just the hourly wage): employer NI, pension contributions, holiday pay, training, tools, and non-productive time (travel, admin, quoting).',
  'Materials markup of 15 to 30 percent is standard in the UK electrical trade, covering the cost of ordering, handling, storage, waste, returns, and the risk of price increases between quotation and installation.',
  'Overhead recovery ensures every job contributes to fixed costs -- vehicle, insurance, tools, software, accountancy, marketing, and premises. Divide annual overheads by chargeable hours to find the hourly overhead rate.',
  'Elec-Mate includes AI-powered quoting tools that calculate labour, materials, overheads, and profit automatically -- producing professional quotes in minutes instead of hours.',
];

const stats = [
  { value: '15-30%', label: 'Typical materials markup' },
  { value: '10-20%', label: 'Recommended contingency' },
  { value: '15-25%', label: 'Target net profit margin' },
  { value: '1,200-1,500', label: 'Chargeable hours per year' },
];

const faqs = [
  {
    question: 'How do I calculate my true labour rate?',
    answer:
      'Start with the gross hourly rate you pay the operative (or yourself). Add employer National Insurance contributions (13.8 percent above the secondary threshold), workplace pension contributions (minimum 3 percent of qualifying earnings), holiday pay provision (typically 12.07 percent of the hourly rate for workers accruing holiday), and any other employment costs such as training, PPE, and tool allowances. Then divide your total annual productive capacity (typically 1,200 to 1,500 chargeable hours after deducting holidays, bank holidays, sickness, training, and non-productive time) into the total cost. For example, if an electrician costs 45,000 pounds per year in total employment costs and delivers 1,300 chargeable hours, the true labour cost is approximately 34.60 pounds per hour. Your charge-out rate must be higher than this to cover overheads and profit.',
  },
  {
    question: 'What materials markup should I use?',
    answer:
      'The standard materials markup in the UK electrical trade ranges from 15 to 30 percent, depending on the type of work and the value of the materials. For high-value items (consumer units, distribution boards, large cable runs), a lower markup of 15 to 20 percent is common because the absolute margin is still significant. For lower-value consumables (clips, fixings, tape, glands), a higher markup of 25 to 30 percent is appropriate because the handling cost as a proportion of the item cost is higher. Some contractors use a flat percentage across all materials for simplicity. Others use a tiered approach. The markup covers ordering time, delivery costs, storage, handling, waste, returns, and the risk of price increases between quotation and installation. Never pass materials through at cost -- you are providing a procurement and logistics service that has real value.',
  },
  {
    question: 'How do I calculate my overhead rate?',
    answer:
      'List all your annual fixed costs that are not directly attributable to a specific job: vehicle costs (lease, fuel, insurance, maintenance, road tax), business insurance (public liability, professional indemnity, employers liability), tools and test equipment (purchase, calibration, replacement), software subscriptions (Elec-Mate, accounting software, CRM), professional memberships (NICEIC, NAPIT, IET), marketing costs, accountancy and bookkeeping, phone and broadband, office or storage costs, and any other business expenses. Total these up for the year. Then divide by your total chargeable hours per year to get an hourly overhead rate. For a typical sole trader electrician, annual overheads might total 15,000 to 25,000 pounds, giving an hourly overhead rate of 10 to 20 pounds per hour. This must be added to every quoted hour of labour.',
  },
  {
    question: 'What contingency should I include in quotes?',
    answer:
      'Contingency covers the unexpected: unforeseen difficulties discovered once work begins, additional materials needed, time overruns, and scope changes that are too small to warrant a formal variation but still cost you time and money. For straightforward jobs where the scope is well defined and the installation is accessible (new build, modern property, clear specification), 5 to 10 percent contingency is usually sufficient. For older properties, refurbishment projects, or jobs where the full scope cannot be determined until work begins (for example, a consumer unit change where the condition of existing cables is unknown), 15 to 20 percent is prudent. Include the contingency in your total price but do not show it as a separate line item on the quote -- clients sometimes view contingency as negotiable padding.',
  },
  {
    question: 'What profit margin should I target?',
    answer:
      'The target net profit margin (after all costs including your own salary or drawings) depends on your business model and ambitions. For a sole trader, a net profit margin of 15 to 20 percent on labour and materials is a reasonable target -- this provides a buffer against quiet periods, funds business investment, and rewards the risk of self-employment. For a contracting business with employees, 10 to 15 percent net profit is a healthy target. These margins may seem modest, but they compound: a sole trader turning over 100,000 pounds with a 20 percent net margin generates 20,000 pounds of profit on top of their salary. Margins below 10 percent leave very little room for error and make the business vulnerable to a single bad job or a quiet month.',
  },
  {
    question: 'How do I quote for jobs I have not done before?',
    answer:
      'Every electrician encounters unfamiliar job types. The key is to break the job down into its component tasks and estimate each one separately. Identify the tasks involved (first fix, second fix, testing, certification). Estimate the materials for each task using supplier catalogues or the Elec-Mate materials calculator. Estimate the labour time for each task -- if you have not done the specific job before, speak to experienced colleagues, check trade forums, or use AI estimation tools. Add your overhead rate to each hour of labour. Add materials markup. Add contingency (use a higher percentage for unfamiliar work -- 15 to 20 percent). Add profit margin. Total it up. If the resulting quote feels too high or too low compared to market rates, revisit your assumptions. Over time, you will build a library of actual job costs that makes future estimating faster and more accurate.',
  },
  {
    question: 'Should I give fixed quotes or day rates?',
    answer:
      'Both approaches have their place. Fixed quotes are preferred by most clients because they provide cost certainty. They also incentivise efficiency -- if you complete the job faster than estimated, you keep the margin. However, fixed quotes carry risk: if the job takes longer than expected, you absorb the cost. Day rates eliminate this risk but make clients nervous about open-ended costs. Best practice is to provide fixed quotes for well-defined work (new installations, specified upgrades, scheduled testing) and day rates for work where the scope cannot be fully determined in advance (fault finding, remedial work on older installations, exploratory work). When quoting a day rate, always provide an estimate of the number of days to manage client expectations.',
  },
];

const features = [
  {
    icon: Calculator,
    title: 'AI Cost Calculator',
    description:
      'Enter the job description and Elec-Mate calculates estimated labour, materials, overheads, and total price using real trade data and AI estimation.',
  },
  {
    icon: PoundSterling,
    title: 'Labour Rate Builder',
    description:
      'Build your true charge-out rate from first principles: base wage, NI, pension, holiday, overhead recovery, and profit margin. Know your numbers.',
  },
  {
    icon: Percent,
    title: 'Markup Calculator',
    description:
      'Apply materials markup, overhead recovery, contingency, and profit margin. See the impact of each component on the final price.',
  },
  {
    icon: FileText,
    title: 'Professional Quotes',
    description:
      'Generate branded PDF quotes with itemised breakdowns. Send to clients by email or WhatsApp directly from the app.',
  },
  {
    icon: BarChart3,
    title: 'Job Profitability Tracker',
    description:
      'Compare quoted price against actual costs (labour, materials, expenses) to see your true profit on every job. Learn and improve.',
  },
  {
    icon: TrendingUp,
    title: 'Historical Job Data',
    description:
      'Build a library of actual job costs over time. Use historical data to improve the accuracy of future estimates and spot pricing trends.',
  },
];

const sections = [
  {
    id: 'why-cost-estimating',
    heading: 'Why Cost Estimating Matters',
    content: (
      <>
        <p>
          Every electrical job has a cost. Labour, materials, travel, overhead, and the time spent
          quoting and administrating. If the price you charge does not cover all of these costs plus
          a margin for profit, you are effectively paying the client to let you work. That sounds
          absurd, but it is exactly what happens when electricians guess their prices instead of
          calculating them.
        </p>
        <p>
          <strong className="text-yellow-400">The most common pricing mistake</strong> in the
          electrical trade is quoting based on "what the market will bear" or "what the last person
          charged" without knowing whether that price actually covers your costs. Two electricians
          quoting the same job at the same price can have entirely different outcomes: one makes a
          healthy profit because their overheads are low and their processes are efficient; the
          other loses money because they have higher costs that the quote does not account for.
        </p>
        <p>
          Accurate cost estimating starts with knowing your numbers: your true labour cost per hour,
          your overhead rate, your materials procurement costs, and your target profit margin. Once
          you know these, pricing any job becomes a methodical process rather than a guess. The{' '}
          <SEOInternalLink href="/tools/electrical-quoting-app">
            Elec-Mate quoting tool
          </SEOInternalLink>{' '}
          automates this process, but understanding the underlying methodology is essential for
          every electrician who wants to run a profitable business.
        </p>
      </>
    ),
  },
  {
    id: 'labour-rates',
    heading: 'Calculating Your True Labour Rate',
    content: (
      <>
        <p>
          Your charge-out rate is not the same as what you pay yourself (or your employees) per
          hour. It must include the full cost of employment plus overheads and profit. Here is how
          to calculate it from first principles:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Base salary or drawings</strong> -- for employed electricians, this is the
                gross annual salary. For a sole trader, this is your target annual drawings (what
                you want to take home before tax). As a benchmark, qualified electricians in the UK
                earn between 35,000 and 55,000 pounds depending on location and experience.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Employer NI</strong> -- 13.8 percent of earnings above the secondary
                threshold. For an employee earning 40,000 pounds, this is approximately 4,200 pounds
                per year.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Pension contributions</strong> -- minimum 3 percent of qualifying earnings
                under auto-enrolment. Many employers contribute more. Budget 1,200 to 2,000 pounds
                per year.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Holiday pay and sick pay provision</strong> -- 28 days statutory holiday
                entitlement (including bank holidays) plus an allowance for sickness. Budget 12 to
                15 percent of the base salary.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Chargeable hours</strong> -- the number of hours per year that you can
                actually bill to clients. Start with 52 weeks, subtract holidays (5.6 weeks), bank
                holidays, training days, sickness allowance, and non-productive time (admin,
                quoting, travel between jobs). A realistic figure is 1,200 to 1,500 hours per year.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Divide the total annual cost by the chargeable hours to get your base labour cost per
          hour. Then add the overhead rate and profit margin to get the charge-out rate. For a sole
          trader targeting 45,000 pounds in drawings with 20,000 pounds of overheads and a 20
          percent profit margin on 1,300 chargeable hours, the charge-out rate is approximately 60
          pounds per hour. For employed electricians, the calculation is similar but uses the total
          employment cost.
        </p>
        <SEOAppBridge
          title="Labour Rate Calculator"
          description="Build your charge-out rate from first principles. Enter your costs and Elec-Mate calculates the minimum rate you need to charge to cover everything and make a profit."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'materials-markup',
    heading: 'Materials Markup',
    content: (
      <>
        <p>
          Materials are not free to procure, handle, and install. The markup you apply covers real
          costs that are easy to overlook:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ordering and administration time</strong> -- researching products, comparing
                prices, placing orders, chasing deliveries. This is time you cannot bill to a job.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Collection and delivery costs</strong> -- trips to the wholesaler, delivery
                charges, fuel costs. Every trip to the branch is at least 30 minutes of
                non-chargeable time plus fuel.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Waste and breakage</strong> -- cable off-cuts, damaged items, incorrect
                orders. Industry standard waste allowance for cable is 5 to 10 percent.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Price fluctuation risk</strong> -- copper prices, component shortages, and
                supplier price changes between quotation and installation. The markup provides a
                buffer.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Stock holding and van stock</strong> -- the capital tied up in materials you
                carry in your van (consumables, common accessories, cable). This has an opportunity
                cost.
              </span>
            </li>
          </ul>
        </div>
        <p>
          A markup of 15 to 30 percent is standard across the UK electrical trade. For large
          projects with high materials values (commercial installations, large domestic rewires),
          use the lower end of the range. For smaller jobs where materials handling represents a
          larger proportion of the total cost, use the higher end. Never pass materials through at
          cost -- you are providing procurement, logistics, and warranty management that has genuine
          value.
        </p>
      </>
    ),
  },
  {
    id: 'overhead-recovery',
    heading: 'Overhead Recovery',
    content: (
      <>
        <p>
          Overheads are the costs of running your business that are not directly attributable to any
          single job. They exist whether you are working or not, and every job must contribute to
          covering them. If your quotes do not include overhead recovery, you are subsidising your
          clients at your own expense.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">
            Typical Annual Overheads for a Sole Trader Electrician
          </h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Receipt className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Vehicle:</strong> lease or finance (3,000 to 6,000 pounds), fuel (2,500 to
                4,000 pounds), insurance (1,000 to 2,000 pounds), maintenance and tyres (500 to
                1,000 pounds), road tax (200 to 350 pounds).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Receipt className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insurance:</strong> public liability (400 to 800 pounds), professional
                indemnity (200 to 500 pounds), employers liability if applicable (500 to 1,000
                pounds), tool and equipment cover (200 to 400 pounds).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Receipt className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tools and equipment:</strong> test instrument calibration (200 to 400 pounds
                per year), replacement tools and accessories (500 to 1,000 pounds), PPE (100 to 200
                pounds).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Receipt className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Professional:</strong> competent person scheme registration (500 to 800
                pounds), IET membership (100 to 200 pounds), 18th Edition updates and CPD (200 to
                500 pounds).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Receipt className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Administration:</strong> accountancy (500 to 1,500 pounds), software
                subscriptions (300 to 600 pounds), phone and broadband (600 to 900 pounds),
                marketing (500 to 2,000 pounds).
              </span>
            </li>
          </ul>
        </div>
        <p>
          Total annual overheads for a sole trader typically range from 15,000 to 25,000 pounds.
          Divide this by your annual chargeable hours to get the hourly overhead rate. At 1,300
          chargeable hours and 20,000 pounds of overheads, the overhead rate is approximately 15
          pounds per hour. Every quoted hour of labour must include this amount on top of the base
          labour cost. Use the{' '}
          <SEOInternalLink href="/tools/expenses-manager-electrician">
            expenses manager
          </SEOInternalLink>{' '}
          to track your actual overheads and refine this figure over time.
        </p>
      </>
    ),
  },
  {
    id: 'contingency',
    heading: 'Contingency Allowance',
    content: (
      <>
        <p>
          Contingency is the allowance for the things you cannot predict at quotation stage. No
          matter how carefully you survey a job, there will be surprises: cables routed differently
          than expected, existing work that does not meet current standards, accessories that need
          replacing because the existing ones are damaged, and tasks that take longer than
          estimated.
        </p>
        <p>
          <strong className="text-yellow-400">
            The right contingency percentage depends on the risk profile of the job:
          </strong>
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Low risk (5 to 10 percent)</strong> -- new build installations where the
                specification is clear, the building is accessible, and there are no unknowns. Also
                suitable for straightforward like-for-like replacements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Medium risk (10 to 15 percent)</strong> -- refurbishment work in modern
                properties, consumer unit upgrades where the existing installation is in reasonable
                condition, and commercial work where the scope is well defined but access may be
                constrained.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>High risk (15 to 20 percent)</strong> -- older properties where the
                condition of existing wiring is unknown, extensive remedial work following an
                unsatisfactory <SEOInternalLink href="/guides/eicr-explained">EICR</SEOInternalLink>
                , work in listed buildings or properties with unusual construction, and any job
                where a full survey is not possible before quoting.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Include the contingency in your total price but do not itemise it separately on the quote.
          Clients who see "contingency 15 percent" often try to negotiate it away, leaving you
          exposed when the inevitable surprises occur. Instead, build it into the labour and
          materials totals.
        </p>
      </>
    ),
  },
  {
    id: 'profit-margin',
    heading: 'Profit Margin Calculation',
    content: (
      <>
        <p>
          After covering labour, materials, overheads, and contingency, profit is what remains.
          Profit is not optional -- it is the reward for the risk of running a business, the fund
          for future investment, and the buffer that keeps you solvent during quiet periods.
        </p>
        <p>
          <strong className="text-yellow-400">
            Understand the difference between markup and margin.
          </strong>{' '}
          If you add 20 percent markup to costs of 1,000 pounds, you charge 1,200 pounds and make
          200 pounds profit -- but your profit margin (as a percentage of the selling price) is only
          16.7 percent. To achieve a 20 percent margin on a 1,000-pound cost, you need to charge
          1,250 pounds. The formula is: selling price = cost divided by (1 minus the target margin).
          For a 20 percent margin: 1,000 divided by 0.80 = 1,250.
        </p>
        <p>
          Target profit margins for electrical work in the UK typically range from 15 to 25 percent
          of the selling price. Higher-value, more complex work (commercial installations, fire
          alarm systems, data cabling) can command higher margins because the expertise and risk
          justify it. Competitive domestic work (socket additions, light fitting replacements) may
          operate at lower margins but higher volume. The{' '}
          <SEOInternalLink href="/tools/job-profitability-calculator">
            job profitability calculator
          </SEOInternalLink>{' '}
          helps you track actual margins across all your jobs to see where you make money and where
          you do not.
        </p>
        <p>
          A sole trader turning over 100,000 pounds per year with a 20 percent net profit margin
          generates 20,000 pounds of profit on top of their salary. That is 20,000 pounds available
          for business investment, savings, or additional personal income. Drop the margin to 10
          percent and you have 10,000 pounds. At 5 percent, one bad job wipes out the profit for the
          entire quarter. Margins matter.
        </p>
      </>
    ),
  },
  {
    id: 'quoting-process',
    heading: 'The Quoting Process',
    content: (
      <>
        <p>
          A professional quoting process converts enquiries into profitable work. Speed matters --
          clients who receive a detailed quote within 24 hours of the site survey are significantly
          more likely to instruct than those who wait a week. Here is an efficient quoting workflow:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-yellow-400 text-black font-bold text-xs flex items-center justify-center mt-0.5 shrink-0">
                1
              </span>
              <span>
                <strong>Site survey</strong> -- visit the property, assess the scope, note access
                constraints, photograph the existing installation, measure cable runs, and identify
                any potential complications. Use Elec-Mate to record survey notes on your phone.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-yellow-400 text-black font-bold text-xs flex items-center justify-center mt-0.5 shrink-0">
                2
              </span>
              <span>
                <strong>Materials take-off</strong> -- list every item of material required. Use
                supplier catalogues or the Elec-Mate materials calculator for current pricing.
                Include consumables (clips, fixings, glands, tape) that are easy to forget.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-yellow-400 text-black font-bold text-xs flex items-center justify-center mt-0.5 shrink-0">
                3
              </span>
              <span>
                <strong>Labour estimate</strong> -- break the job into tasks and estimate hours for
                each. Include first fix, second fix, testing, certification, and clean-up. Add
                travel time if not covered by a separate day rate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-yellow-400 text-black font-bold text-xs flex items-center justify-center mt-0.5 shrink-0">
                4
              </span>
              <span>
                <strong>Calculate the price</strong> -- labour hours multiplied by charge-out rate,
                plus materials with markup, plus contingency, plus profit margin. Check that the
                total feels right compared to similar jobs you have completed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-yellow-400 text-black font-bold text-xs flex items-center justify-center mt-0.5 shrink-0">
                5
              </span>
              <span>
                <strong>Issue the quote</strong> -- send a professional PDF quote within 24 hours.
                Include a clear scope of works, itemised (or lump sum) pricing, payment terms,
                validity period, and your terms and conditions.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The{' '}
          <SEOInternalLink href="/tools/electrical-quoting-app">
            Elec-Mate AI quoting tool
          </SEOInternalLink>{' '}
          streamlines this entire process. Enter the job details and it calculates the estimated
          labour, suggests materials from its trade database, applies your configured markup and
          overhead rates, and generates a professional PDF quote ready to send. What used to take an
          hour of spreadsheet work takes minutes.
        </p>
        <SEOAppBridge
          title="AI-Powered Quoting"
          description="Enter the job details and Elec-Mate calculates labour, materials, overheads, and profit. Generate professional PDF quotes in minutes and send them to clients from your phone."
          icon={Calculator}
        />
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description:
      'AI-powered quoting tool that calculates labour, materials, and profit for any electrical job.',
    icon: Calculator,
    category: 'Business Tool',
  },
  {
    href: '/tools/job-profitability-calculator',
    title: 'Job Profitability Calculator',
    description:
      'Compare quoted prices against actual costs to see true profit margins on every job.',
    icon: BarChart3,
    category: 'Business Tool',
  },
  {
    href: '/guides/how-to-price-electrical-jobs',
    title: 'How to Price Electrical Jobs',
    description:
      'Complete pricing methodology covering labour rates, materials, overheads, and profit margins.',
    icon: PoundSterling,
    category: 'Business Guide',
  },
  {
    href: '/tools/expenses-manager-electrician',
    title: 'Expenses Manager',
    description: 'Track all business expenses and overheads to calculate your true overhead rate.',
    icon: Receipt,
    category: 'Business Tool',
  },
  {
    href: '/tools/cash-flow-planner',
    title: 'Cash Flow Planner',
    description:
      'Forecast cash position, track invoices, and ensure profitable jobs convert to cash in the bank.',
    icon: TrendingUp,
    category: 'Business Tool',
  },
  {
    href: '/guides/starting-electrical-business',
    title: 'Starting an Electrical Business',
    description:
      'From sole trader to employer -- setting up and growing a profitable electrical contracting business.',
    icon: Briefcase,
    category: 'Business Guide',
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricalProjectCostEstimatorPage() {
  return (
    <BusinessTemplate
      title="Electrical Project Cost Estimator | Quoting Tool"
      description="Electrical project cost estimator and quoting tool. Calculate labour rates, materials markup, overhead recovery, contingency, and profit margins. Generate professional quotes in minutes with Elec-Mate."
      datePublished="2026-01-20"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Business Tools"
      badgeIcon={Calculator}
      heroTitle={
        <>
          Electrical Project Cost Estimator:{' '}
          <span className="text-yellow-400">Quoting Tool for UK Electricians</span>
        </>
      }
      heroSubtitle="Accurate cost estimating is the foundation of a profitable electrical business. This tool covers labour rates, materials markup, overhead recovery, contingency, and profit margin calculation -- everything you need to price jobs properly and generate professional quotes."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      stats={stats}
      sections={sections}
      features={features}
      featuresHeading="Cost Estimating Features"
      featuresSubheading="Built for UK electricians who want to know their numbers and price every job for profit."
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrical Cost Estimating"
      relatedPages={relatedPages}
      ctaHeading="Price Every Job for Profit"
      ctaSubheading="AI-powered cost estimating, professional PDF quotes, and job profitability tracking. Join 430+ UK electricians using Elec-Mate to run a profitable business. 7-day free trial, cancel anytime."
      pagePath="/tools/electrical-project-cost-estimator"
    />
  );
}
