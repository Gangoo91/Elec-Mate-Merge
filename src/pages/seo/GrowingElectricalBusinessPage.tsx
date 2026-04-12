import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  TrendingUp,
  Users,
  PoundSterling,
  Briefcase,
  Search,
  Star,
  Globe,
  CheckCircle2,
  BarChart3,
  Building2,
  Clock,
  FileCheck2,
  Zap,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Business Guides', href: '/guides/growing-electrical-business' },
  { label: 'Growing Your Electrical Business', href: '/growing-electrical-business' },
];

const tocItems = [
  { id: 'stages-of-growth', label: 'Stages of Business Growth' },
  { id: 'hiring-first-employee', label: 'Hiring Your First Employee' },
  { id: 'systems-for-scale', label: 'Systems for Quoting, Invoicing, Scheduling' },
  { id: 'van-management', label: 'Van and Fleet Management' },
  { id: 'limited-company', label: 'When to Move to Ltd Company' },
  { id: 'profit-targets', label: 'Gross Profit Targets' },
  { id: 'using-elec-mate', label: 'Using Elec-Mate to Scale' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Most electrical businesses grow through three broad stages: sole trader (1 van, sub-£100k turnover), small team (2–5 vans, £100k–£500k), and established contractor (5+ vans, £500k+). Each stage requires different systems, disciplines, and mindset.',
  'Hiring your first employee — whether an apprentice or an experienced electrician — is the most significant step in scaling. Get the employment contract, insurance, and payroll right from day one; mistakes here are expensive and difficult to undo.',
  'The systems that constrain growth earliest are not technical electrical skills — they are quoting, invoicing, scheduling, and customer management. Electricians who implement professional business systems before they need them scale more smoothly than those who retrofit them during a growth phase.',
  'A gross profit margin of 35–50 per cent on labour and materials is healthy for a small electrical business. Below 30 per cent, you are trading rather than building. Track it monthly.',
  'Moving from sole trader to a limited company makes financial sense when your taxable profit exceeds approximately £30,000–£35,000 per year. Take advice from an accountant who specialises in trades businesses before making the switch.',
  'The electricians who scale most successfully systemise everything they can and delegate everything they should — holding onto all the technical work and all the admin simultaneously is the most common ceiling that prevents growth.',
];

const faqs = [
  {
    question: 'What turnover should an electrician aim for as a sole trader before hiring?',
    answer:
      'There is no universal answer, but common indicators that it is time to consider your first hire: you are regularly turning down work or your diary is full six or more weeks ahead; you are spending significant evening time on admin that could be delegated; your income has plateaued and additional work would require more hands. In revenue terms, a sole trader consistently generating £80,000–£120,000 in turnover (not profit) who has maximised their own efficiency is typically in a position to consider a first hire. Below this, the employment costs (salary, NI, insurance, tools, van) may not be supported by the available work.',
  },
  {
    question: 'Should I hire an apprentice or an experienced electrician first?',
    answer:
      'Both have merits. An apprentice (4-year apprenticeship, salary £6,000–£14,000/year) is lower cost and allows you to train them to your standards from the start — but they cannot operate independently for several years, limiting the work uplift in the short term. An experienced electrician (salary £28,000–£40,000/year depending on location and experience) can generate revenue from day one but costs significantly more and may bring habits or working practices that conflict with yours. Many sole traders find that an apprentice in year one, progressively taking on more work as they develop, is the best long-term investment. Others need immediate capacity and hire an experienced electrician. The right choice depends on your immediate revenue and longer-term goals.',
  },
  {
    question: 'When should an electrician become a limited company?',
    answer:
      'The financial tipping point for most UK electricians is taxable profit of around £30,000–£35,000 per year. Below this level, the administrative burden of running a limited company (filing accounts, corporation tax returns, payroll, director responsibilities) typically outweighs the tax saving. Above this level, the ability to take a combination of salary (PAYE) and dividends (taxed at a lower rate than income tax) produces a meaningful saving. An accountant specialising in trades businesses can model the exact saving for your situation. Do not switch without taking professional advice — the difference between doing it correctly and incorrectly can be substantial.',
  },
  {
    question: 'What gross profit margin should an electrician target?',
    answer:
      "Gross profit margin (revenue minus direct costs of labour and materials, before overheads) should be 35–50 per cent for a healthy electrical business. If you are charging £600 for a consumer unit upgrade and your materials cost £200 and your labour cost (your own time valued at your target daily rate, or your employee's wage) is £200, your gross profit is £200 (33 per cent). Net profit (after overheads: van, insurance, tools, software, marketing, accountant) will be lower — typically 15–25 per cent for a well-run small electrical business. Track gross margin monthly and investigate any month where it drops below 30 per cent.",
  },
  {
    question: 'What business systems do I need to scale beyond one van?',
    answer:
      'The systems that break first during growth are: quoting (taking too long, inconsistent pricing), invoicing (chasing slow payers while also doing the work), scheduling (double-bookings, missed appointments), and customer records (not knowing what was done at which property). You need: a professional quoting app that produces consistent, branded quotes in minutes; an invoicing system with automated payment reminders; a scheduling system visible to all team members; and a CRM or job management system that stores customer history. Many sole traders manage without these because they hold everything in their head — the moment a second person joins the business, that approach fails.',
  },
  {
    question: 'How do I find good subcontractors to use before I am ready to hire?',
    answer:
      "NICEIC, NAPIT, and ELECSA all have online registers of registered electricians by location. Local trade networks, Facebook groups for electricians, and word of mouth in your area are also effective. When using subcontractors (as opposed to employees), ensure they have their own public liability insurance (£2m minimum), their own scheme registration, and that you have a written subcontractor agreement covering payment terms, quality standards, and responsibility for their work. HMRC's IR35 rules apply if a subcontractor works exclusively for you under your direction — take advice if you are unsure about the employment status distinction.",
  },
  {
    question: 'How do I manage cash flow as my electrical business grows?',
    answer:
      "Cash flow problems are the most common reason small electrical businesses struggle during growth phases — you are spending on wages, materials, and equipment before customers pay. Key cash flow practices: invoice immediately on job completion, not days later; set payment terms of 14 days on commercial work; require a deposit (25–50 per cent) on larger domestic jobs such as rewires and consumer unit upgrades; use automated payment reminders (most invoicing software has these built in); and maintain a cash reserve of at least two months' fixed costs. Consider invoice finance if you have significant commercial work with 30+ day payment terms — it is not expensive and solves the timing problem.",
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/electrician-referral-programme',
    title: 'Electrician Referral Programme',
    description: 'Building the referral network that fuels sustained growth.',
    icon: Users,
    category: 'Guide',
  },
  {
    href: '/seo-for-electricians',
    title: 'SEO for Electricians',
    description: 'Online visibility that generates a consistent flow of new enquiries.',
    icon: Search,
    category: 'Guide',
  },
  {
    href: '/google-ads-electricians',
    title: 'Google Ads for Electricians',
    description: 'Paid advertising to accelerate growth at each business stage.',
    icon: BarChart3,
    category: 'Guide',
  },
  {
    href: '/customer-reviews-electrician',
    title: 'Getting Customer Reviews',
    description: 'Building the review base that supports every growth stage.',
    icon: Star,
    category: 'Guide',
  },
  {
    href: '/electrician-business-website',
    title: 'Electrician Website Guide',
    description: 'Your online presence — the marketing foundation for a growing business.',
    icon: Globe,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'stages-of-growth',
    heading: 'The Three Stages of Electrical Business Growth',
    content: (
      <>
        <p>
          Most electrical businesses follow a broadly similar growth trajectory. Understanding which
          stage you are at — and what the specific challenges and opportunities of the next stage
          look like — helps you plan and invest accordingly.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-5 text-white">
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <strong className="block mb-1">
                  Stage 1: Sole Trader (1 van, sub-£100k turnover)
                </strong>
                <span>
                  You do everything — the electrical work, the quotes, the invoicing, the customer
                  calls. Your income is limited by your available hours. Growth here comes from
                  charging more (improving your pricing and positioning), working more efficiently
                  (reducing wasted travel time, improving job scheduling), and generating more
                  enquiries (reviews, referrals, basic SEO). The ceiling is typically your own
                  capacity.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <strong className="block mb-1">
                  Stage 2: Small Team (2–5 vans, £100k–£500k turnover)
                </strong>
                <span>
                  You have moved beyond your own capacity by hiring. Your income can now grow beyond
                  your personal billable hours. The challenge shifts from finding work to managing
                  people, maintaining quality, managing cash flow, and running the business while
                  also doing technical electrical work. Systems that worked informally as a sole
                  trader break down under team pressure. This stage requires investment in systems,
                  administration, and possibly a part-time business manager.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <strong className="block mb-1">
                  Stage 3: Established Contractor (5+ vans, £500k+ turnover)
                </strong>
                <span>
                  You have transitioned from being an electrician who runs a business to being a
                  business owner who happens to have an electrical background. At this level, you
                  need formal management structures, dedicated administration staff, a quality
                  management system, and likely a dedicated estimator or contracts manager. Growth
                  here comes from winning commercial contracts, niche specialisation, or geographic
                  expansion.
                </span>
              </div>
            </li>
          </ul>
        </div>
        <p>
          Most electricians find Stage 2 — the transition from sole trader to small team — the most
          difficult phase. The management and cash flow challenges of early hiring are significant,
          and the temptation to revert to doing everything yourself is strong. Persistence through
          this phase is what separates electrical businesses that scale from those that plateau.
        </p>
      </>
    ),
  },
  {
    id: 'hiring-first-employee',
    heading: 'Hiring Your First Employee — What You Need to Get Right',
    content: (
      <>
        <p>
          Taking on your first employee is the most significant milestone in scaling an electrical
          business. Done correctly, it unlocks growth beyond your personal capacity. Done poorly, it
          creates expensive legal, financial, and operational problems. Here is what you need to
          have in place from day one.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Employment contract</strong> — a written statement of employment particulars
                is a legal requirement from day one. Include: job title, start date, pay and payment
                frequency, hours, holiday entitlement (minimum 28 days including bank holidays for
                full-time), notice period, and place of work. Use a reputable template (ACAS
                provides free guidance and templates) or pay an employment lawyer £200–£400 to draft
                one.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Employers' liability insurance</strong> — legally required from day one of
                employment, minimum £5m cover. Your existing public liability policy does not cover
                you as an employer. A combined trades policy (public liability + employers'
                liability) typically costs £800–£1,500/year and covers both.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>PAYE registration</strong> — register as an employer with HMRC before your
                first employee starts. PAYE registration is free and done online via GOV.UK. You
                will need payroll software (Xero, Sage, or QuickBooks all have payroll modules; free
                HMRC Basic PAYE Tools is also available) to calculate and report PAYE and National
                Insurance monthly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Workplace pension (auto-enrolment)</strong> — employers must auto-enrol
                eligible workers (aged 22–66, earning over £10,000/year) into a pension scheme. The
                minimum employer contribution is 3 per cent of qualifying earnings. Set up a scheme
                (NEST is free for employers) before your first eligible employee starts.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Apprentice vs experienced electrician</strong> — apprentices cost
                significantly less (£6,000–£14,000/year) but generate limited independent revenue
                for the first two to three years. Experienced electricians (£28,000–£40,000/year)
                generate revenue from day one but require a more significant immediate work pipeline
                to justify the cost. Model both scenarios against your current and projected
                workload before deciding.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'systems-for-scale',
    heading: 'Systems for Quoting, Invoicing, and Scheduling',
    content: (
      <>
        <p>
          The systems that constrain growth earliest are rarely technical electrical skills — they
          are business administration. Electricians who implement professional systems early scale
          more smoothly. Here are the critical ones.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <strong className="block mb-1">Quoting</strong>
                <span>
                  Inconsistent quoting — sometimes charging market rates, sometimes undercharging
                  out of habit — is the most common reason small electrical businesses leave money
                  on the table. Use a{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    professional quoting app
                  </SEOInternalLink>{' '}
                  with pre-built price lists for your common jobs. This ensures consistency, speeds
                  up the quoting process, and produces professional branded proposals that position
                  you as a credible business.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <strong className="block mb-1">Invoicing</strong>
                <span>
                  Invoice on the day of job completion, not days or weeks later. Late invoicing
                  delays payment and signals to commercial customers that chasing is acceptable. Use
                  invoicing software with automated payment reminders (three days, seven days,
                  fourteen days overdue). Set payment terms of 14 days for domestic work and 30 days
                  for commercial.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <strong className="block mb-1">Job scheduling</strong>
                <span>
                  When you have more than one person working, a shared scheduling system is
                  essential. Google Calendar (free) works for small teams. Purpose-built job
                  management software (Tradify, Jobber, ServiceM8) provides job cards, customer
                  history, scheduling, and invoicing in one system.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <strong className="block mb-1">Certificate management</strong>
                <span>
                  Issuing certificates on site — rather than completing paperwork in the evening —
                  saves hours per week and impresses customers. The{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate certificate app
                  </SEOInternalLink>{' '}
                  handles EICRs, EICs, Minor Works, and other certificates on your phone with
                  AI-assisted completion and instant PDF export.
                </span>
              </div>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'van-management',
    heading: 'Van and Fleet Management',
    content: (
      <>
        <p>
          Your van is your most visible marketing asset and your most critical piece of
          infrastructure. As you add vehicles to the fleet, managing them efficiently becomes
          increasingly important.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Van livery</strong> — a well-designed, professionally installed van livery
                is one of the most cost-effective forms of advertising for an electrician. A branded
                van parked outside a job generates enquiries from neighbours, and driving around
                your service area provides constant passive advertising. Budget £600–£1,500 for a
                professional full livery.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Stock management</strong> — running out of a common component on a job and
                needing to visit a trade counter is expensive in time. A well-organised van stock
                system — a standard stock list for each vehicle checked weekly — reduces this
                significantly. Many electricians find that investing an hour per week in van stock
                saves two to three hours of reactive trade counter runs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Vehicle tracking (for a team)</strong> — GPS tracking systems (from
                £15/month per vehicle) provide route optimisation data, help manage employee van
                use, support insurance claims, and provide accountability. Many insurers offer
                premium discounts for tracked commercial vehicles.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electric vans</strong> — as EV infrastructure improves and fuel costs remain
                significant, electric commercial vans are increasingly viable for electricians. The
                irony of an electrician driving a diesel van is not lost on customers — an electric
                van can be a genuine conversation starter and differentiator, particularly for
                environmentally conscious commercial customers.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'limited-company',
    heading: 'When to Move to a Limited Company',
    content: (
      <>
        <p>
          Most UK electricians start as sole traders because it is simpler. But as income grows,
          operating through a limited company can produce significant tax savings. Here is how to
          think about the transition.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>The financial tipping point</strong> — the tax saving from incorporation
                (taking salary and dividends through a limited company rather than all income as
                sole trader profits) typically becomes meaningful when taxable profit exceeds
                £30,000–£35,000 per year. Below this, the saving may not justify the additional
                administration. Your accountant can model the exact saving for your situation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Credibility and commercial access</strong> — some commercial clients and
                larger contractors will only engage with limited companies. Operating as a limited
                company signals permanence and financial accountability, which can open doors to
                larger contracts. This consideration sometimes justifies earlier incorporation than
                the tax mathematics alone.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional costs</strong> — limited company costs include: company formation
                (£12–£50), annual accounts preparation by an accountant (£500–£1,500), corporation
                tax return, Companies House filing, and the additional time cost of director
                responsibilities. Factor these against the tax saving to determine the net benefit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Take professional advice first</strong> — do not make this decision based on
                online research alone. An accountant specialising in trades businesses (many offer a
                free initial consultation) will model the exact saving for your specific situation
                and advise on the optimal salary/dividend split and timing.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'profit-targets',
    heading: 'Gross Profit Targets for a Growing Electrical Business',
    content: (
      <>
        <p>
          Tracking your gross profit margin — the percentage of revenue remaining after paying for
          direct labour and materials — is one of the most important financial disciplines for a
          growing electrical business. It tells you whether your pricing is sustainable before
          overheads eat into your net profit.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Target gross margin: 35–50 per cent</strong> — after paying for materials
                and the direct cost of labour (your own time at your target daily rate, or your
                employees' wages and on-costs), you should retain 35–50 pence per pound of revenue.
                Below 30 per cent, your overheads will erode net profit to an unsustainable level.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Target net margin: 15–25 per cent</strong> — after paying all overheads (van
                costs, insurance, tools, software, marketing, accountant, phone, training), a
                healthy electrical business should retain 15–25 pence per pound of revenue as net
                profit. Below 10 per cent, you are working hard for a thin return that leaves little
                buffer for slow periods or unexpected costs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Materials margin</strong> — buying trade account discounts of 25–40 per cent
                below retail (from Rexel, Edmundson, City Electrical Factors, or similar) and
                charging customers at close to retail price is standard practice. This materials
                margin contributes to your gross profit. Understand your typical materials discount
                and factor it into your pricing model.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Review monthly</strong> — calculate your gross margin monthly, not just
                annually. A month where it drops below 30 per cent signals a problem — usually a
                mis-priced job, unexpected materials costs, or excessive time on a job. Identify the
                cause and adjust.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'using-elec-mate',
    heading: 'Using Elec-Mate to Scale Your Electrical Business',
    content: (
      <>
        <p>
          Scaling requires systemising. The electricians who grow successfully are not necessarily
          the most technically skilled — they are the ones who build the systems that allow quality
          work to be delivered consistently without their personal involvement in every task.
          Elec-Mate is designed to support every stage of that journey.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">From Quote to Certificate in One App</h4>
                <p className="text-white text-sm leading-relaxed">
                  Send a branded quote, convert it to an invoice when the job is done, issue the
                  certificate on site, and store the customer record — all from your phone. As you
                  add team members, each one can use Elec-Mate on their own device. No paperwork. No
                  evening admin. No lost certificates.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <BarChart3 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Business Intelligence That Drives Decisions
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Know which job types generate the most revenue. Know which customers are most
                  valuable. Know which months are consistently slow so you can plan your marketing
                  spend accordingly. The data that a growing electrical business needs to make
                  informed decisions is sitting in your job records — Elec-Mate makes it accessible.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">AI Business Assistant on WhatsApp</h4>
                <p className="text-white text-sm leading-relaxed">
                  Elec-Mate's AI assistant (Mate) handles customer queries, generates quotes,
                  reminds you about follow-ups, and provides a morning brief of the day's schedule —
                  all via WhatsApp. As your business grows, having an always-on assistant takes the
                  administrative pressure off so you can focus on the work that matters.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="The business platform built for growing electrical companies"
          description="Join 1,000+ UK electricians using Elec-Mate for quoting, invoicing, job management, and certification. From sole trader to multi-van operation. 7-day free trial."
          icon={TrendingUp}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function GrowingElectricalBusinessPage() {
  return (
    <GuideTemplate
      title="How to Grow Your Electrical Business UK | Scaling Guide"
      description="Complete guide to growing a UK electrical business — from sole trader to small team to established contractor. Hiring your first employee, business systems, van management, when to go Ltd, and gross profit targets."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Business Guide"
      badgeIcon={TrendingUp}
      heroTitle={
        <>
          How to Grow Your Electrical Business UK:{' '}
          <span className="text-yellow-400">The Scaling Guide</span>
        </>
      }
      heroSubtitle="A practical guide to growing a UK electrical business — the three stages of growth, hiring your first employee (apprentice vs experienced), systems for quoting and invoicing, van management, when to move to a limited company, gross profit targets, and using technology to scale."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Growing an Electrical Business"
      relatedPages={relatedPages}
      ctaHeading="Scale Your Electrical Business With Elec-Mate"
      ctaSubheading="Professional quoting, invoicing, job management, and certification for UK electricians at every stage of growth. Join 1,000+ electrical businesses. 7-day free trial."
    />
  );
}
