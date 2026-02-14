import BusinessTemplate from '@/pages/seo/templates/BusinessTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import {
  Users,
  PoundSterling,
  Calculator,
  GraduationCap,
  Calendar,
  ShieldCheck,
  TrendingUp,
  Clock,
  BarChart3,
  Briefcase,
  Receipt,
  Target,
} from 'lucide-react';

const PAGE_PATH = '/tools/staff-cost-calculator';

export default function StaffCostCalculatorPage() {
  return (
    <BusinessTemplate
      title="Staff Cost Calculator for Electricians"
      description="Calculate the true cost of employing an electrician, apprentice, or office staff. Employer NI, pension auto-enrolment, holiday pay, sick pay, training costs, and all hidden employment expenses — know the full picture before you hire."
      datePublished="2025-09-01"
      dateModified="2026-02-13"
      breadcrumbs={[
        { label: 'Business Tools', href: '/tools' },
        { label: 'Staff Cost Calculator', href: PAGE_PATH },
      ]}
      tocItems={[
        { id: 'true-cost-of-employment', label: 'The True Cost of Employment' },
        { id: 'employer-ni', label: 'Employer National Insurance' },
        { id: 'pension-auto-enrolment', label: 'Pension Auto-Enrolment' },
        { id: 'holiday-sick-pay', label: 'Holiday Pay and Sick Pay' },
        { id: 'training-costs', label: 'Training and Development Costs' },
        { id: 'apprentice-costs', label: 'Apprentice Employment Costs' },
        { id: 'total-cost-breakdown', label: 'Complete Cost Breakdown Example' },
        { id: 'features', label: 'Elec-Mate Features' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Pages' },
      ]}
      badge="Business Calculators"
      badgeIcon={Users}
      heroTitle={
        <>
          Staff Cost Calculator
          <span className="block text-yellow-400 mt-1">For Electrical Employers</span>
        </>
      }
      heroSubtitle="An employee on £35,000 salary does not cost you £35,000. When you add employer NI, pension contributions, holiday pay, sick pay, training, tools, van costs, and management time, the true cost is typically 30% to 50% higher. Elec-Mate's Staff Cost Calculator shows you the full picture before you commit to hiring."
      readingTime={10}
      stats={[
        { value: '30-50%', label: 'Hidden costs above base salary for an employed electrician' },
        { value: '£13.8%', label: 'Employer NI rate on earnings above the threshold (2025/26)' },
        { value: '3%', label: 'Minimum employer pension contribution under auto-enrolment' },
        { value: '28 days', label: 'Statutory holiday entitlement including bank holidays' },
      ]}
      keyTakeaways={[
        'The true cost of employing a qualified electrician on £35,000 salary is typically £45,000 to £52,000 when all employer costs are included.',
        'Employer NI alone adds 13.8% on top of salary for earnings above the secondary threshold (£9,100 in 2025/26) — that is £3,576 on a £35,000 salary.',
        'Pension auto-enrolment requires a minimum 3% employer contribution — adding £1,050 per year on a £35,000 salary.',
        'Holiday pay, tools, van costs, PPE, training, and management time can add another £5,000 to £10,000 per year on top of salary and statutory costs.',
        'Elec-Mate calculates the total cost per employee, converts it to a cost-per-hour, and helps you price jobs to cover the full employment cost.',
      ]}
      sections={[
        {
          id: 'true-cost-of-employment',
          heading: 'The True Cost of Employing an Electrician',
          content: (
            <>
              <p>
                When an electrical business owner considers hiring, the first question is usually
                "what salary do I need to offer?" But salary is only part of the cost. Employer
                National Insurance, pension contributions, holiday pay, sick pay, training,
                equipment, and management time all add to the total cost of employment — and failing
                to account for these hidden costs is one of the most common reasons small electrical
                businesses run into financial difficulty after hiring.
              </p>
              <p>
                The rule of thumb in the construction industry is that the true cost of an employee
                is 1.3 to 1.5 times their gross salary. An electrician on £35,000 salary actually
                costs the business £45,500 to £52,500 per year. If you have not budgeted for this,
                your profit margin disappears and you end up working harder for less money than
                before you hired.
              </p>
              <p>
                Elec-Mate's Staff Cost Calculator captures every component of employment cost and
                presents the full picture. It calculates the total annual cost, the cost per
                billable hour (accounting for holidays, training, and non-productive time), and the
                minimum revenue the employee needs to generate to justify their cost. This data
                feeds into your{' '}
                <SEOInternalLink href="/tools/pricing-strategy-electrician">
                  pricing strategy
                </SEOInternalLink>{' '}
                to ensure every job is priced to cover the true cost of your team.
              </p>
            </>
          ),
          appBridge: {
            title: 'Calculate Your True Staff Costs',
            description:
              'Enter a salary and Elec-Mate calculates every employer cost — NI, pension, holiday pay, training, tools, and van. Know the full cost before you hire.',
            icon: Users,
          },
        },
        {
          id: 'employer-ni',
          heading: 'Employer National Insurance Contributions',
          content: (
            <>
              <p>
                Employer NI is the single largest hidden cost of employment. For 2025/26, employers
                pay 13.8% NI on earnings above the secondary threshold of £9,100 per year. This is
                in addition to the employee's own NI, which is deducted from their pay.
              </p>
              <p>
                <strong className="text-yellow-400">On a £30,000 salary:</strong> Employer NI =
                13.8% x (£30,000 - £9,100) = 13.8% x £20,900 = £2,884.20 per year.
              </p>
              <p>
                <strong className="text-yellow-400">On a £35,000 salary:</strong> Employer NI =
                13.8% x (£35,000 - £9,100) = 13.8% x £25,900 = £3,574.20 per year.
              </p>
              <p>
                <strong className="text-yellow-400">On a £40,000 salary:</strong> Employer NI =
                13.8% x (£40,000 - £9,100) = 13.8% x £30,900 = £4,264.20 per year.
              </p>
              <p>
                <strong className="text-yellow-400">Employment Allowance:</strong> Small businesses
                may be eligible for the Employment Allowance, which reduces your employer NI bill by
                up to £5,000 per year. Most sole traders taking on their first employee will
                qualify, effectively eliminating employer NI for a single employee on a salary up to
                approximately £45,000. This is a significant saving — check eligibility with your
                accountant.
              </p>
              <p>
                If your employees work under{' '}
                <SEOInternalLink href="/tools/cis-for-electricians">
                  CIS as subcontractors
                </SEOInternalLink>
                , you do not pay employer NI on their earnings, but you also lose the benefits of
                direct employment (control over schedule, exclusivity, training investment). The{' '}
                <SEOInternalLink href="/tools/electrician-tax-guide">tax guide</SEOInternalLink>{' '}
                explains the difference between employment and self-employment status.
              </p>
            </>
          ),
        },
        {
          id: 'pension-auto-enrolment',
          heading: 'Pension Auto-Enrolment: Employer Obligations',
          content: (
            <>
              <p>
                All UK employers must automatically enrol eligible employees into a workplace
                pension scheme and make minimum contributions. This is a legal requirement, not an
                option. Eligible employees are those aged 22 to state pension age, earning above
                £10,000 per year, and working in the UK.
              </p>
              <p>
                <strong className="text-yellow-400">Minimum contributions:</strong> The current
                minimum total contribution is 8% of qualifying earnings, of which the employer must
                pay at least 3%. Qualifying earnings are those between £6,240 and £50,270 (2025/26).
                On a salary of £35,000, qualifying earnings are £28,760, so the minimum employer
                contribution is 3% x £28,760 = £862.80 per year.
              </p>
              <p>
                <strong className="text-yellow-400">In practice:</strong> Many employers contribute
                more than the minimum to attract and retain good staff. Offering 5% employer
                contribution on a £35,000 salary costs £1,438 per year but can make a significant
                difference in recruiting experienced electricians in a competitive market.
              </p>
              <p>
                <strong className="text-yellow-400">Administration:</strong> You need to choose a
                pension provider, set up the scheme, communicate with employees, process monthly
                contributions, and handle opt-outs and re-enrolment. The Pensions Regulator provides
                free tools for small employers, and most payroll software handles the calculation
                and submission automatically.
              </p>
              <p>
                Pension contributions are an allowable business expense and reduce your corporation
                tax bill (if you are a limited company) or your self-assessment bill (if you employ
                staff as a sole trader).
              </p>
            </>
          ),
        },
        {
          id: 'holiday-sick-pay',
          heading: 'Holiday Pay and Statutory Sick Pay',
          content: (
            <>
              <p>
                Full-time employees are entitled to a minimum of 28 days paid holiday per year
                (including bank holidays). For an electrician on £35,000 salary, 28 days of paid
                holiday costs: £35,000 / 260 working days x 28 = £3,769.23. This is not an
                additional cost on top of salary (the employee is already paid), but it is 28 days
                of zero productivity. You are paying for 260 days but getting only 232 productive
                days.
              </p>
              <p>
                <strong className="text-yellow-400">The productivity impact:</strong> If your
                employee generates £300 per day in billable revenue, 28 days of holiday represents
                £8,400 in lost billing opportunity. This must be factored into your job pricing and
                revenue targets. Effectively, each productive day needs to generate enough revenue
                to cover the cost of 1.12 days (232 productive days covering 260 paid days).
              </p>
              <p>
                <strong className="text-yellow-400">Statutory Sick Pay (SSP):</strong> You must pay
                SSP to eligible employees from the fourth consecutive day of sickness. The current
                rate is £116.75 per week (2025/26) for up to 28 weeks. Budget 5 to 8 sick days per
                year per employee. Beyond SSP, you lose the employee's productivity and may need to
                reorganise other jobs or hire temporary cover.
              </p>
              <p>
                <strong className="text-yellow-400">Other statutory obligations:</strong> Maternity
                pay, paternity pay, and shared parental pay are additional obligations. While less
                common in small electrical businesses, they must be budgeted for. Most of the
                statutory pay is reclaimable from HMRC, but the administrative burden and
                productivity loss remain.
              </p>
              <p>
                The{' '}
                <SEOInternalLink href="/tools/capacity-planning-calculator">
                  capacity planning calculator
                </SEOInternalLink>{' '}
                accounts for holiday and sick leave when calculating your team's available billable
                hours.
              </p>
            </>
          ),
        },
        {
          id: 'training-costs',
          heading: 'Training, Development, and Compliance Costs',
          content: (
            <>
              <p>
                Investing in your employees' training is both a cost and an investment. A
                well-trained electrician works more efficiently, produces better quality work, makes
                fewer costly mistakes, and can handle a wider range of jobs. But training has both
                direct costs and opportunity costs.
              </p>
              <p>
                <strong className="text-yellow-400">Direct training costs:</strong> BS 7671
                amendment update courses (£150 to £300 each), specialist qualifications (EV charger
                installation, solar PV, fire alarm — £300 to £800 each), health and safety refresher
                courses (£100 to £250), and first aid training (£100 to £200). Budget £500 to £1,500
                per employee per year for training, depending on the scope of work and
                qualifications needed.
              </p>
              <p>
                <strong className="text-yellow-400">Opportunity cost:</strong> Training days are
                non-billable. A 2-day course means 2 days of lost revenue (£600 to £800) plus the
                course fee. This doubles the effective cost of training, but the long-term benefit
                in capability and compliance justifies it.
              </p>
              <p>
                <strong className="text-yellow-400">Tools and equipment:</strong> Each employee
                needs their own toolkit — hand tools, power tools, test equipment, and PPE. A basic
                electrician's toolkit costs £2,000 to £4,000 to set up, with annual maintenance and
                replacement costs of £500 to £1,000. Test equipment calibration adds another £200 to
                £400 per year.
              </p>
              <p>
                <strong className="text-yellow-400">Apprenticeship Levy:</strong> If your annual
                payroll bill exceeds £3 million, you pay the Apprenticeship Levy at 0.5% of your
                total payroll. For most small electrical businesses, this does not apply, but if you
                are growing and adding employees, be aware of the threshold. Use Elec-Mate's{' '}
                <SEOInternalLink href="/guides/electrical-apprenticeship-guide">
                  apprenticeship employer guide
                </SEOInternalLink>{' '}
                for full details on funding and levy requirements.
              </p>
            </>
          ),
          appBridge: {
            title: 'Plan Your Training Investment',
            description:
              'Track training costs per employee, log CPD hours, and measure the return on your training investment. Elec-Mate makes compliance simple.',
            icon: GraduationCap,
          },
        },
        {
          id: 'apprentice-costs',
          heading: 'Apprentice Employment Costs',
          content: (
            <>
              <p>
                Employing an apprentice is often the most cost-effective way to grow your team, but
                the costs are different from employing a qualified electrician. Here is what to
                budget:
              </p>
              <p>
                <strong className="text-yellow-400">Wages:</strong> Apprentice minimum wage rates
                for 2025/26 are £6.40 per hour for apprentices in their first year or under 19, and
                the age-appropriate National Minimum Wage thereafter. A first-year apprentice
                working 37.5 hours per week costs approximately £12,480 per year. A third-year
                apprentice aged 21 or over costs approximately £21,840 (at the National Living Wage
                rate of £11.44 per hour).
              </p>
              <p>
                <strong className="text-yellow-400">Training costs:</strong> The apprenticeship
                training itself may be funded through the Apprenticeship Levy (if applicable) or
                government co-funding. For non-levy employers, the government pays 95% of training
                costs with most approved training providers. Your contribution is 5% of the training
                cost, which is typically £600 to £900 over the full apprenticeship. You may also be
                eligible for a £1,000 incentive payment for hiring an apprentice.
              </p>
              <p>
                <strong className="text-yellow-400">Productivity:</strong> An apprentice is not
                immediately productive. In year one, they may contribute 20% to 30% of a qualified
                electrician's output. By year three, this rises to 60% to 80%. You must factor in
                the supervision time — a qualified electrician mentoring an apprentice works more
                slowly themselves, reducing their personal productivity by 10% to 20%.
              </p>
              <p>
                <strong className="text-yellow-400">Off-the-job training:</strong> Apprentices must
                spend 20% of their paid working hours on off-the-job training (college, online
                learning, or workplace training that is not productive work). This is paid time, so
                you are paying for 5 days but getting approximately 4 days of productive work.
              </p>
              <p>
                Despite these costs, a well-managed apprenticeship typically delivers a positive
                return by year two or three, and by the end of the apprenticeship you have a
                qualified electrician trained to your standards and familiar with your business.
              </p>
            </>
          ),
        },
        {
          id: 'total-cost-breakdown',
          heading: 'Complete Cost Breakdown: Qualified Electrician on £35,000',
          content: (
            <>
              <p>
                Here is a detailed example of the total annual cost of employing a qualified
                electrician on a £35,000 gross salary:
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <ul className="space-y-3 text-white">
                  <li className="flex justify-between border-b border-white/10 pb-2">
                    <span>Gross salary</span>
                    <span className="font-bold">£35,000</span>
                  </li>
                  <li className="flex justify-between border-b border-white/10 pb-2">
                    <span>Employer NI (13.8% above £9,100)</span>
                    <span className="font-bold">£3,574</span>
                  </li>
                  <li className="flex justify-between border-b border-white/10 pb-2">
                    <span>Pension (3% employer contribution)</span>
                    <span className="font-bold">£863</span>
                  </li>
                  <li className="flex justify-between border-b border-white/10 pb-2">
                    <span>Tools and equipment (annual)</span>
                    <span className="font-bold">£1,200</span>
                  </li>
                  <li className="flex justify-between border-b border-white/10 pb-2">
                    <span>Van costs (share of fleet or van allowance)</span>
                    <span className="font-bold">£3,500</span>
                  </li>
                  <li className="flex justify-between border-b border-white/10 pb-2">
                    <span>Training and CPD</span>
                    <span className="font-bold">£800</span>
                  </li>
                  <li className="flex justify-between border-b border-white/10 pb-2">
                    <span>PPE and workwear</span>
                    <span className="font-bold">£350</span>
                  </li>
                  <li className="flex justify-between border-b border-white/10 pb-2">
                    <span>Test equipment calibration</span>
                    <span className="font-bold">£250</span>
                  </li>
                  <li className="flex justify-between border-b border-white/10 pb-2">
                    <span>Employer's liability insurance</span>
                    <span className="font-bold">£400</span>
                  </li>
                  <li className="flex justify-between border-b border-white/10 pb-2">
                    <span>Recruitment and HR admin</span>
                    <span className="font-bold">£300</span>
                  </li>
                  <li className="flex justify-between pt-2 text-yellow-400 font-bold">
                    <span>Total annual cost</span>
                    <span>£46,237</span>
                  </li>
                </ul>
              </div>
              <p>
                This is 32% above the base salary. If the employee works 1,500 billable hours per
                year (after holidays, training, sick days, and admin), the cost per billable hour is
                £30.82. This is the minimum hourly rate at which you must bill the employee's time
                to break even — before adding any profit margin or overhead allocation.
              </p>
              <p>
                Use the{' '}
                <SEOInternalLink href="/tools/break-even-calculator">
                  break-even calculator
                </SEOInternalLink>{' '}
                to model how the employee affects your overall business break-even point, and the{' '}
                <SEOInternalLink href="/tools/job-profitability-calculator">
                  job profitability calculator
                </SEOInternalLink>{' '}
                to ensure every job covers the true cost of the staff allocated to it.
              </p>
            </>
          ),
        },
      ]}
      features={[
        {
          icon: Calculator,
          title: 'Total Cost Calculator',
          description:
            'Enter a salary and the calculator adds every employer cost — NI, pension, holiday pay, tools, van, training, and PPE.',
        },
        {
          icon: PoundSterling,
          title: 'Cost Per Billable Hour',
          description:
            'Converts the total annual cost into a per-hour figure, accounting for holidays, training, and non-productive time.',
        },
        {
          icon: Users,
          title: 'Multi-Employee Comparison',
          description:
            'Compare the cost of different hiring scenarios — qualified electrician vs apprentice, full-time vs part-time, employed vs subcontracted.',
        },
        {
          icon: TrendingUp,
          title: 'Revenue Requirement Calculator',
          description:
            'Shows the minimum revenue each employee must generate to cover their cost and contribute to business profit.',
        },
        {
          icon: Calendar,
          title: 'Productivity Planner',
          description:
            'Calculate available billable hours per employee after holidays, training, sick leave, and admin time.',
        },
        {
          icon: BarChart3,
          title: 'Team Cost Dashboard',
          description:
            'See your total staff costs across all employees with breakdowns by cost category and per-employee comparison.',
        },
      ]}
      featuresHeading="How Elec-Mate Calculates Staff Costs"
      featuresSubheading="Know the true cost of every employee. Price jobs to cover employment costs and protect your margins."
      faqs={[
        {
          question: 'How much does it really cost to employ a qualified electrician?',
          answer:
            'The true annual cost of employing a qualified electrician is typically 30% to 50% above their gross salary. On a £35,000 salary, expect to pay £45,000 to £52,000 when you include employer NI (£3,574), pension (£863+), tools and equipment (£1,000 to £2,000), van costs (£3,000 to £5,000), training (£500 to £1,500), PPE (£300 to £500), insurance (£300 to £500), and recruitment or admin costs. The exact figure depends on your specific setup, but the 1.3x to 1.5x multiplier is a reliable guideline.',
        },
        {
          question: 'What is employer National Insurance and how much do I pay?',
          answer:
            "Employer NI is a tax you pay on each employee's earnings above the secondary threshold (£9,100 for 2025/26). The rate is 13.8%. On a £35,000 salary, you pay 13.8% x (£35,000 - £9,100) = £3,574.20 per year. This is on top of the employee's own NI deduction. Small businesses may claim the Employment Allowance, which reduces your employer NI bill by up to £5,000 per year — potentially eliminating it for your first employee.",
        },
        {
          question: 'How much does an apprentice cost to employ?',
          answer:
            'A first-year apprentice (under 19 or in first year) costs approximately £12,500 to £14,000 per year in wages at the apprentice minimum wage rate of £6.40 per hour. Add employer NI (minimal due to low wage), pension (if eligible), tools, PPE, and a share of supervision time, and the total is approximately £16,000 to £20,000. Training costs are largely funded by the government (95% for non-levy employers). By year three, wage costs increase to £18,000 to £22,000 as the apprentice moves to age-appropriate minimum wage rates, but their productivity also increases significantly.',
        },
        {
          question: 'Do I need employers liability insurance?',
          answer:
            "Yes. Employers' liability insurance is a legal requirement for all UK businesses with employees. You must have at least £5 million of cover and display the certificate (or make it available digitally). The cost is typically £300 to £600 per year for a small electrical business with 1 to 5 employees. Failure to have employers' liability insurance can result in a fine of £2,500 for every day you are not properly insured, plus up to £1,000 for not displaying the certificate.",
        },
        {
          question: 'Should I employ or subcontract to grow my business?',
          answer:
            'Both options have advantages. Employment gives you control over scheduling, quality, and training. The employee represents your business directly and you build a team with shared standards. But employment carries fixed costs (you pay even when work is quiet), legal obligations, and administrative burden. Subcontracting is more flexible — you pay per job or per day, scale up and down as needed, and avoid employment obligations. But subcontractors cost more per day (typically £200 to £350 for a qualified electrician), may not be available when needed, and you have less control over their work quality. Many electrical businesses use a hybrid model: employed staff for core capacity and subcontractors for peak demand.',
        },
      ]}
      relatedPages={[
        {
          href: '/tools/staff-management-electrician',
          title: 'Staff Management',
          description:
            'Manage your team — skills, availability, job allocation, and performance tracking.',
          icon: Users,
          category: 'Business Tools',
        },
        {
          href: '/tools/capacity-planning-calculator',
          title: 'Capacity Planning Calculator',
          description:
            'Plan workforce capacity, schedule jobs efficiently, and know when to hire or subcontract.',
          icon: Calendar,
          category: 'Business Calculators',
        },
        {
          href: '/tools/electrician-tax-guide',
          title: 'Electrician Tax Guide',
          description:
            'Complete guide to tax for self-employed electricians and electrical business owners.',
          icon: Receipt,
          category: 'Business Guides',
        },
        {
          href: '/guides/electrical-apprenticeship-guide',
          title: 'Apprenticeship Employer Guide',
          description:
            'Everything you need to know about employing an electrical apprentice — funding, training, and costs.',
          icon: GraduationCap,
          category: 'Business Guides',
        },
        {
          href: '/tools/break-even-calculator',
          title: 'Break-Even Calculator',
          description:
            'Calculate how adding staff affects your break-even point and minimum revenue targets.',
          icon: Target,
          category: 'Business Calculators',
        },
        {
          href: '/tools/business-analytics-electrician',
          title: 'Business Analytics Dashboard',
          description: 'Track revenue per employee, team profitability, and staff cost ratios.',
          icon: BarChart3,
          category: 'Business Tools',
        },
      ]}
      ctaHeading="Know the True Cost Before You Hire"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate to calculate staff costs, plan capacity, and grow their teams profitably. 7-day free trial, cancel anytime."
      extraSchemas={[
        {
          '@type': 'SoftwareApplication',
          name: 'Elec-Mate Staff Cost Calculator',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web, iOS, Android',
          description:
            'Calculate the true cost of employing electricians, apprentices, and support staff. Employer NI, pension, holiday pay, and all hidden costs.',
          url: 'https://elec-mate.com/tools/staff-cost-calculator',
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
