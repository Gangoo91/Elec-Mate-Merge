import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Users,
  PoundSterling,
  ShieldCheck,
  Scale,
  GraduationCap,
  FileCheck2,
  Briefcase,
  ClipboardCheck,
  Calculator,
  Wrench,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Business', href: '/guides/how-to-get-first-electrical-customer' },
  { label: 'Hiring', href: '/guides/hiring-first-employee-electrician' },
];

const tocItems = [
  { id: 'overview', label: 'When to Hire' },
  { id: 'employer-responsibilities', label: 'Employer Responsibilities' },
  { id: 'paye-setup', label: 'PAYE and Payroll' },
  { id: 'pension', label: 'Pension Auto-Enrolment' },
  { id: 'apprentice-vs-qualified', label: 'Apprentice vs Qualified Hire' },
  { id: 'employment-contracts', label: 'Employment Contract Basics' },
  { id: 'cis-vs-paye', label: 'CIS vs PAYE for Subcontractors' },
  { id: 'ir35', label: 'IR35 Considerations' },
  { id: 'true-cost', label: 'True Cost of an Employee' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'You must register as an employer with HMRC before your first employee starts work. This includes setting up PAYE (Pay As You Earn) to deduct income tax and National Insurance from their wages and report to HMRC each pay period.',
  'Employers liability insurance is a legal requirement from the moment you have one employee — the minimum cover is £5 million, and you can be fined £2,500 per day without it.',
  'Pension auto-enrolment is mandatory. You must enrol eligible employees (aged 22 to State Pension age, earning over £10,000/year) into a qualifying pension scheme and contribute a minimum of 3% of qualifying earnings.',
  'The true cost of an employee earning £35,000 is approximately £42,000 to £48,000 when you include employers NI (13.8%), pension contributions (3%+), employers liability insurance, tools, training, van costs, and annual leave.',
  'CIS (Construction Industry Scheme) applies when you pay subcontractors for construction work. Getting CIS vs PAYE wrong can result in significant penalties from HMRC — if HMRC deems a subcontractor should have been an employee, you owe the unpaid tax, NI, and penalties.',
];

const faqs = [
  {
    question: 'When is the right time to hire my first employee?',
    answer:
      'The right time to hire is when you are consistently turning away work because you cannot physically do it all yourself. Key indicators: your diary is booked 3 to 4 weeks in advance, you are turning down jobs every week, you are working excessive hours (consistently more than 50 hours per week), and your annual turnover is sufficient to cover the full cost of an employee (salary plus 25% to 35% for on-costs) while still leaving you a reasonable profit. As a rough guide, if your annual turnover is above £80,000 as a sole trader and you are turning away £30,000+ of work per year, hiring makes financial sense. Do not hire based on one busy month — wait until the pattern is sustained for at least 3 to 6 months.',
  },
  {
    question: 'How much does employers liability insurance cost?',
    answer:
      'Employers liability insurance for a small electrical business typically costs £300 to £800 per year for one to three employees. The exact cost depends on the number of employees, the type of work (domestic vs commercial), your claims history, and the insurer. It is a legal requirement from the day you hire your first employee — you must have at least £5 million of cover, and the certificate must be displayed at your workplace (or available electronically). The fine for not having employers liability insurance is up to £2,500 per day. Most trade insurance providers (Hiscox, Simply Business, Rhino Trade Insurance) offer employers liability as part of a business insurance package.',
  },
  {
    question: 'What is the difference between CIS and PAYE for subcontractors?',
    answer:
      'PAYE (Pay As You Earn) applies to employees — you deduct income tax and National Insurance from their wages and pay it to HMRC. CIS (Construction Industry Scheme) applies to self-employed subcontractors who do construction work (which includes electrical work) — you deduct 20% (or 30% if they are not CIS-registered) from their payment and pay it to HMRC as an advance tax payment. The crucial distinction is employment status. If a worker is genuinely self-employed (they control when, where, and how they work, they provide their own tools, they can send a substitute, and they are in business on their own account), CIS applies. If they are under your direction and control, work set hours, use your tools, and cannot send a substitute, they are an employee regardless of what the contract says — and PAYE applies. HMRC actively investigates misclassification, and the penalties for getting it wrong are severe.',
  },
  {
    question: 'Do I need to auto-enrol an apprentice into a pension?',
    answer:
      'It depends on their age and earnings. If the apprentice is aged 22 or over and earns more than £10,000 per year, they must be automatically enrolled into a qualifying pension scheme. If they are under 22 or earn less than £10,000, they are not eligible for auto-enrolment — but they can opt in if they choose. First-year apprentices typically earn below the auto-enrolment earnings threshold, but second and third-year apprentices earning the full apprentice rate may qualify. You still need to assess them each pay period. Use a payroll provider or software that handles auto-enrolment assessment automatically.',
  },
  {
    question: 'What training am I responsible for if I hire an apprentice?',
    answer:
      'As an employer of an apprentice, you are responsible for: providing a genuine working environment where the apprentice gains practical experience in electrical installation, allowing them paid time off (at least 20% of their working hours, known as "off-the-job training") to attend college or training provider sessions, providing a workplace mentor or supervisor, ensuring they are supervised appropriately for their level of competence (an apprentice must not work unsupervised on live electrical systems), and supporting them through their End-Point Assessment. You also need to sign an apprenticeship agreement and a commitment statement. The apprentice training costs are usually covered by the apprenticeship levy (if your payroll exceeds £3 million) or 95% government-funded (if it does not) — your contribution for a non-levy employer is 5% of the training cost, typically £500 to £800 over the apprenticeship.',
  },
  {
    question: 'What are the IR35 rules and do they affect me?',
    answer:
      'IR35 is tax legislation designed to catch "disguised employment" — where a worker operates through a limited company but would be an employee if contracted directly. Since April 2021, for medium and large businesses, the client (not the worker) is responsible for determining IR35 status. For small businesses (fewer than 50 employees, turnover under £10.2 million, balance sheet under £5.1 million), the contractor still determines their own status. If you are a small electrical business hiring a contractor through their limited company, the contractor determines their own IR35 status. However, if HMRC disagrees with that determination, both parties can face consequences. The safest approach: if a worker looks, acts, and is treated like an employee, put them on PAYE. Only use CIS or limited company contractors for genuinely independent subcontractors who have multiple clients, provide their own tools, and control their own work.',
  },
  {
    question: 'How do I set up PAYE as a new employer?',
    answer:
      'Register as an employer with HMRC online — you can do this up to 4 weeks before your first employee start date. HMRC will issue you a PAYE reference number and an Accounts Office reference. You then need payroll software (or a payroll provider) to calculate tax, National Insurance, and pension deductions for each pay period. Free options include HMRC Basic PAYE Tools (for up to 9 employees) and several commercial packages (Xero, QuickBooks, FreeAgent, BrightPay). Each pay period, you run the payroll, issue payslips, report to HMRC via RTI (Real Time Information) on or before payday, and pay the deductions to HMRC by the 22nd of the following month (or 19th if paying by post). Many small employers use an accountant or payroll bureau — the cost is typically £10 to £25 per employee per month, which is well worth it for compliance peace of mind.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/how-to-get-first-electrical-customer',
    title: 'Getting Your First Customer',
    description:
      'Start your electrical business right — pre-trading checklist, pricing, marketing, and lead generation.',
    icon: Briefcase,
    category: 'Guide',
  },
  {
    href: '/guides/mileage-claims-electricians',
    title: 'Mileage Claims for Electricians',
    description:
      'HMRC mileage rates, van vs car rules, and how employee vehicle use affects your claims.',
    icon: TrendingUp,
    category: 'Guide',
  },
  {
    href: '/compare/checkatrade-vs-mybuilder-vs-bark',
    title: 'Checkatrade vs MyBuilder vs Bark',
    description:
      'Generate enough work to justify hiring — compare lead platforms for growing your pipeline.',
    icon: TrendingUp,
    category: 'Comparison',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description:
      'Quote jobs quickly and accurately as your team grows. Consistent pricing across your business.',
    icon: PoundSterling,
    category: 'Tool',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Issue certificates on site with your team. Professional documentation from every member of your team.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/electrician-van-setup-guide',
    title: 'Electrician Van Setup Guide',
    description:
      'Setting up a second van? Racking, tools, security, and branding for your growing fleet.',
    icon: Wrench,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'When Is the Right Time to Hire?',
    content: (
      <>
        <p>
          Hiring your first employee is one of the biggest decisions you will make as a self-
          employed electrician. It changes everything — your income, your responsibilities, your
          daily routine, and the structure of your business. Get it right and it doubles your
          capacity and revenue. Get it wrong and it becomes a financial drain that puts your entire
          business at risk.
        </p>
        <p>
          The right time to hire is when the work demand consistently exceeds what you can deliver
          alone — not for one busy week, but for a sustained period of 3 to 6 months. You should be
          turning down profitable work regularly, your diary should be booked 2 to 4 weeks in
          advance, and your turnover should be high enough to cover the true cost of an employee
          (which is 25% to 35% more than their salary) while leaving you a reasonable profit.
        </p>
        <p>
          If your annual turnover is £80,000+ and you are turning away £30,000+ of work per year,
          the numbers usually work. Below that, consider using subcontractors for overflow work
          before committing to the ongoing cost of an employee.
        </p>
      </>
    ),
  },
  {
    id: 'employer-responsibilities',
    heading: 'Your Responsibilities as an Employer',
    content: (
      <>
        <p>
          The moment you hire someone, you take on significant legal obligations. These are not
          optional — failure to comply results in fines, penalties, and potential prosecution.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Employers liability insurance</strong> — minimum £5 million cover, required
                by law from day one. Fine: up to £2,500 per day without it. The certificate must be
                displayed or accessible to employees.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>PAYE registration</strong> — register as an employer with HMRC before your
                employee starts. Deduct income tax and National Insurance from their wages and
                report to HMRC each pay period via RTI (Real Time Information).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Pension auto-enrolment</strong> — set up a qualifying workplace pension
                scheme and enrol eligible employees. Minimum employer contribution: 3% of qualifying
                earnings. Minimum total contribution (employer + employee): 8%.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Employment contract</strong> — issue a written statement of employment
                particulars on or before the first day of employment. This must include pay, hours,
                holiday entitlement, notice period, and other key terms.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Right to work check</strong> — verify that every employee has the legal
                right to work in the UK before they start. Keep a copy of the relevant documents
                (passport, visa, share code) for the duration of employment and for 2 years after.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Health and safety</strong> — provide a safe working environment, appropriate
                PPE, and relevant training. If you have 5 or more employees, you must have a written
                health and safety policy. Risk assessments are required regardless of employee
                count.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Holiday and statutory rights</strong> — employees are entitled to a minimum
                of 5.6 weeks (28 days for full-time) paid annual leave, statutory sick pay (SSP),
                and protection against unfair dismissal (after 2 years service).
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'paye-setup',
    heading: 'Setting Up PAYE and Payroll',
    content: (
      <>
        <p>
          PAYE is the system HMRC uses to collect income tax and National Insurance from employees.
          As an employer, you are responsible for calculating deductions, paying employees the net
          amount, and reporting to HMRC.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 1: Register with HMRC</strong> — register as an employer online at
                gov.uk. You can register up to 4 weeks before your first employee starts. HMRC will
                send your PAYE reference number and Accounts Office reference.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 2: Choose payroll software</strong> — HMRC Basic PAYE Tools (free, for
                up to 9 employees) or commercial software (Xero Payroll, QuickBooks, FreeAgent,
                BrightPay). Alternatively, use a payroll bureau or your accountant (typically £10 to
                £25 per employee per month).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 3: Collect employee information</strong> — full name, address, date of
                birth, National Insurance number, P45 (or starter checklist if no P45), and bank
                details. The starter checklist determines their initial tax code.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 4: Run payroll each period</strong> — calculate gross pay, deduct
                income tax (using the employee's tax code), deduct employee NI, deduct pension
                contribution, and pay the net amount. Submit a Full Payment Submission (FPS) to HMRC
                on or before payday.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 5: Pay HMRC</strong> — pay the total tax, employee NI, and employer NI
                deductions to HMRC by the 22nd of the following month (19th if paying by cheque).
                Late payment attracts automatic penalties and interest.
              </span>
            </li>
          </ul>
        </div>
        <p>
          <strong>Employers National Insurance</strong> is an additional cost on top of the
          employee's salary. For 2026/27, the rate is 13.8% on earnings above £175 per week (the
          secondary threshold). On a salary of £35,000, employer NI is approximately £3,760 per year
          — a cost many new employers forget to budget for.
        </p>
      </>
    ),
  },
  {
    id: 'pension',
    heading: 'Pension Auto-Enrolment',
    content: (
      <>
        <p>
          Every employer, regardless of size, must comply with pension auto-enrolment. You cannot
          opt out of this obligation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Who must be enrolled</strong> — eligible jobholders: aged between 22 and
                State Pension age, earning more than £10,000 per year, and working in the UK. They
                must be automatically enrolled — you do not need their consent.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Minimum contributions</strong> — employer minimum: 3% of qualifying earnings
                (earnings between £6,240 and £50,270 for 2026/27). Employee minimum: 5%. Total
                minimum: 8%. You can choose to pay more than the minimum — it is a useful benefit
                for attracting and retaining good staff.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Choosing a pension provider</strong> — NEST (National Employment Savings
                Trust) is the government-backed scheme and must accept any employer. Other options
                include The People's Pension, NOW Pensions, and Smart Pension. Setup is usually
                free; charges are deducted from the pension fund.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Employee opt-out</strong> — employees can choose to opt out within one month
                of enrolment. If they opt out, you must refund their contributions. However, you
                must re-enrol them every 3 years. You must NOT encourage employees to opt out — this
                is an offence.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For an employee earning £35,000, the minimum employer pension contribution is
          approximately £870 per year (3% of qualifying earnings between £6,240 and £35,000 = 3% of
          £28,760). This is a direct cost to your business on top of salary and employer NI.
        </p>
      </>
    ),
  },
  {
    id: 'apprentice-vs-qualified',
    heading: 'Apprentice vs Qualified Hire',
    content: (
      <>
        <p>
          Your first hire is a significant decision. The choice between taking on an apprentice and
          hiring a qualified electrician depends on your workload, budget, and long-term plans.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Apprentice</h3>
            <p className="text-white text-sm leading-relaxed">
              <strong>Salary:</strong> £6.40/hour minimum (apprentice rate 2026/27), rising with age
              and experience. Typically £12,000 to £18,000 per year.
              <br />
              <strong>Pros:</strong> Lower cost, trainable to your standards, long-term loyalty,
              government training funding (95% of training costs for non-levy employers).
              <br />
              <strong>Cons:</strong> Cannot work unsupervised for 3 to 4 years, slows you down
              initially, requires 20% off-the-job training time, you need patience and teaching
              ability.
              <br />
              <strong>Best for:</strong> Established businesses with consistent domestic work where
              you can supervise an apprentice while working.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Qualified Electrician</h3>
            <p className="text-white text-sm leading-relaxed">
              <strong>Salary:</strong> £28,000 to £40,000 per year depending on experience and
              location.
              <br />
              <strong>Pros:</strong> Productive from day one, can work independently, doubles your
              capacity immediately, can handle their own jobs and customers.
              <br />
              <strong>Cons:</strong> Higher cost, may have established habits (good or bad), may
              leave for better offers, harder to find reliable candidates.
              <br />
              <strong>Best for:</strong> Businesses with more work than one person can handle, where
              you need someone productive immediately.
            </p>
          </div>
        </div>
        <p>
          Some electricians hire a qualified electrician first (for immediate capacity) and then
          take on an apprentice 6 to 12 months later once the business is stable enough to absorb
          the training overhead. The qualified hire generates revenue on their own while you
          supervise the apprentice alongside your own work.
        </p>
      </>
    ),
  },
  {
    id: 'employment-contracts',
    heading: 'Employment Contract Basics',
    content: (
      <>
        <p>
          Since April 2020, all employees and workers must receive a written statement of employment
          particulars on or before their first day of work. This is your legal obligation — not
          providing one can result in a tribunal awarding the employee 2 to 4 weeks pay as
          compensation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Required on day one:</strong> employer and employee name, job title and
                description, start date, pay rate and frequency, hours of work, holiday entitlement,
                workplace location, notice period, probationary period (if any), and any other
                benefits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Required within 2 months:</strong> pension scheme details, collective
                agreements, training requirements, disciplinary and grievance procedures.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional clauses to consider:</strong> van use policy, tool ownership (who
                owns tools purchased by the business), social media policy, confidentiality,
                restrictive covenants (non-compete clauses — though these are hard to enforce for
                electricians), and a clause on private work (whether the employee can do side jobs).
              </span>
            </li>
          </ul>
        </div>
        <p>
          Use a template from a reputable source (ACAS, Citizens Advice, or your HR advisor) and
          customise it. Do not download a generic template from the internet without checking it is
          current and compliant with UK employment law. If in doubt, spend £200 to £500 on an HR
          consultant to review your contract — it is cheap insurance against tribunal claims.
        </p>
      </>
    ),
  },
  {
    id: 'cis-vs-paye',
    heading: 'CIS vs PAYE: Subcontractors vs Employees',
    content: (
      <>
        <p>
          One of the most common (and expensive) mistakes small electrical businesses make is
          treating someone as a self-employed subcontractor under CIS when HMRC considers them an
          employee who should be on PAYE.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
            <div className="text-white text-sm space-y-3">
              <p>
                <strong>If HMRC decides a worker was an employee, you owe:</strong> all the PAYE tax
                and National Insurance that should have been deducted, employer National Insurance
                on all payments made, interest on the unpaid amounts, and potentially penalties of
                up to 100% of the tax due for deliberate non-compliance.
              </p>
              <p>
                This can be financially devastating. A worker paid £35,000 under CIS who should have
                been on PAYE could result in a bill of £15,000 to £20,000 in back-tax, NI, and
                penalties.
              </p>
            </div>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Genuine Subcontractor (CIS)</h3>
            <p className="text-white text-sm leading-relaxed">
              Controls when, where, and how they work. Provides their own tools and equipment. Can
              send a substitute to do the work. Has their own business (multiple clients, own
              insurance, own van). Invoices you for completed work. Bears financial risk (fixed
              price for a job, responsible for defects). Is not integrated into your business
              structure.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Employee (PAYE)</h3>
            <p className="text-white text-sm leading-relaxed">
              Works set hours determined by you. Uses your tools and van. Cannot send a substitute.
              Works exclusively or mainly for you. Is paid a regular wage (hourly, daily, or
              weekly). You direct where they go and what they do. Is integrated into your business —
              wears your uniform, answers to your customers. Has no financial risk beyond their
              employment.
            </p>
          </div>
        </div>
        <p>
          <strong>The CIS deduction rates:</strong> 20% for CIS-registered subcontractors (the
          majority), 30% for unregistered subcontractors, and 0% for subcontractors with gross
          payment status. You must verify all subcontractors with HMRC before making the first
          payment and submit a monthly CIS return.
        </p>
      </>
    ),
  },
  {
    id: 'ir35',
    heading: 'IR35: When Contractors Use Limited Companies',
    content: (
      <>
        <p>
          IR35 applies when a worker provides their services through an intermediary (usually their
          own limited company) but would be an employee if contracted directly. The legislation aims
          to ensure they pay the same tax as an employee.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Small business exemption</strong> — if your business has fewer than 50
                employees, annual turnover under £10.2 million, and a balance sheet under £5.1
                million (meeting 2 of 3 criteria), you are a small business. The contractor is
                responsible for determining their own IR35 status. You are not liable for their tax
                classification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Medium/large business rules</strong> — if your business exceeds the small
                business thresholds, you must assess the IR35 status of every contractor, provide a
                Status Determination Statement, and account for PAYE if the engagement is inside
                IR35.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Practical advice</strong> — most small electrical businesses do not need to
                worry about IR35 in practice. If you are hiring a one-person limited company
                electrician to work alongside you every day, using your tools, on your jobs, under
                your direction — that is inside IR35 and they should be on PAYE (or CIS if genuinely
                self-employed without a limited company). Reserve IR35/limited company arrangements
                for genuinely independent specialist contractors on specific projects.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'true-cost',
    heading: 'The True Cost of an Employee vs a Subcontractor',
    content: (
      <>
        <p>Many new employers budget only for the salary. The true cost is significantly higher.</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="grid gap-4 sm:grid-cols-2 text-white text-sm">
            <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-4">
              <h4 className="font-bold text-white mb-3">Employee (£35,000 salary)</h4>
              <ul className="space-y-2">
                <li>
                  Gross salary: <strong>£35,000</strong>
                </li>
                <li>
                  Employer NI (13.8%): <strong>£3,760</strong>
                </li>
                <li>
                  Pension (3% qualifying): <strong>£870</strong>
                </li>
                <li>
                  Employers liability insurance: <strong>£400</strong>
                </li>
                <li>
                  Tools and equipment: <strong>£1,000</strong>
                </li>
                <li>
                  Van costs (share or second van): <strong>£3,000</strong>
                </li>
                <li>
                  Training and CPD: <strong>£500</strong>
                </li>
                <li>
                  Workwear and PPE: <strong>£300</strong>
                </li>
                <li>
                  Holiday cover (28 days at cost): <strong>£3,770</strong>
                </li>
                <li className="font-bold text-yellow-400 border-t border-white/20 pt-2">
                  Total: approximately £48,600/year
                </li>
              </ul>
            </div>
            <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-4">
              <h4 className="font-bold text-white mb-3">Subcontractor (equivalent)</h4>
              <ul className="space-y-2">
                <li>
                  Day rate: £200/day x 220 days: <strong>£44,000</strong>
                </li>
                <li>
                  Employer NI: <strong>£0</strong>
                </li>
                <li>
                  Pension: <strong>£0</strong>
                </li>
                <li>
                  Insurance: <strong>Their own</strong>
                </li>
                <li>
                  Tools: <strong>Their own</strong>
                </li>
                <li>
                  Van: <strong>Their own</strong>
                </li>
                <li>
                  Training: <strong>Their own</strong>
                </li>
                <li>
                  Holiday pay: <strong>£0</strong>
                </li>
                <li>
                  CIS admin: <strong>£200</strong>
                </li>
                <li className="font-bold text-yellow-400 border-t border-white/20 pt-2">
                  Total: approximately £44,200/year
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p>
          At first glance, a subcontractor appears cheaper. But there are important trade-offs: you
          have less control over their work, they can leave at any time, they may not share your
          standards, and you are paying a premium for their flexibility. An employee, over time,
          becomes more productive, more loyal, and more aligned with your business.
        </p>
        <p>
          The right choice depends on the nature of your work. Overflow on a single large project?
          Subcontractor. Consistent daily domestic work that you need covered reliably? Employee.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Scale Your Business with Confidence',
    content: (
      <>
        <p>
          Hiring your first employee is a growth milestone. Having the right tools ensures your team
          delivers the same quality and professionalism you built your reputation on.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Consistent Quoting</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>{' '}
                  to ensure every team member quotes accurately and consistently. No more
                  underquoting because someone forgot to include the cost of an employee.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Team Certification</h4>
                <p className="text-white text-sm leading-relaxed">
                  Your team can complete{' '}
                  <SEOInternalLink href="/tools/eic-certificate">EICs</SEOInternalLink> and{' '}
                  <SEOInternalLink href="/tools/minor-works-certificate">
                    Minor Works
                  </SEOInternalLink>{' '}
                  on site with Elec-Mate. Professional certificates from every member of your team,
                  all stored centrally.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <GraduationCap className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Apprentice Training</h4>
                <p className="text-white text-sm leading-relaxed">
                  If you take on an apprentice, the{' '}
                  <SEOInternalLink href="/study-centre/apprentice">
                    Elec-Mate study centre
                  </SEOInternalLink>{' '}
                  supports their learning with structured modules covering Level 2 and Level 3
                  electrical installation. On-the-job training supported by structured study.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Scale your electrical business with professional tools"
          description="Elec-Mate helps your team quote, certify, and manage jobs consistently. As your business grows, keep the quality that built your reputation. 7-day free trial."
          icon={Users}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function HiringFirstEmployeePage() {
  return (
    <GuideTemplate
      title="Hiring Your First Employee as an Electrician | Guide"
      description="Complete guide to hiring your first employee as a self-employed electrician. PAYE, pension auto-enrolment, employers liability insurance, apprentice vs qualified hire, CIS vs PAYE, IR35, employment contracts, and true cost analysis."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Business Guide"
      badgeIcon={Users}
      heroTitle={
        <>
          Hiring Your First Employee as an Electrician:{' '}
          <span className="text-yellow-400">Everything You Need to Know</span>
        </>
      }
      heroSubtitle="Ready to grow? Hiring your first employee transforms your business — but it comes with PAYE, pensions, insurance, contracts, and costs that catch many electricians off guard. This guide covers every step, from legal obligations to the true cost of employment."
      readingTime={15}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Hiring Employees"
      relatedPages={relatedPages}
      ctaHeading="Grow Your Team with Professional Tools"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for quoting, certification, and job management. Consistent quality across your team. 7-day free trial, cancel anytime."
    />
  );
}
