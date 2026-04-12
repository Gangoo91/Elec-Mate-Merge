import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  PoundSterling,
  TrendingUp,
  Briefcase,
  ShieldCheck,
  Star,
  Clock,
  FileCheck2,
  GraduationCap,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Career Guides', href: '/guides/electrician-career-ladder-uk' },
  { label: 'Retirement Planning', href: '/guides/electrician-retirement-planning-uk' },
];

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'physical-demands', label: 'Physical Demands and Retirement Timing' },
  { id: 'sole-trader', label: 'Sole Trader Pension Planning' },
  { id: 'ltd-company', label: 'Limited Company and Corporation Tax' },
  { id: 'employed', label: 'Employed Electrician Pensions' },
  { id: 'state-pension', label: 'State Pension Considerations' },
  { id: 'business-value', label: 'Business Value and Exit' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Sole trader electricians have no employer pension contributions — the entire pension-building responsibility falls on them, requiring disciplined regular contributions to a SIPP or personal pension.',
  'Limited company directors can make employer pension contributions directly from the company, reducing Corporation Tax and bypassing higher income tax rates — this is one of the most tax-efficient retirement savings mechanisms available.',
  'The physical demands of electrical work (frequent kneeling, overhead work, working in confined spaces) mean many electricians effectively retire from hands-on work between age 58 and 62, even if they transition to supervisory or consultancy roles.',
  'An established electrical contracting business can have significant realisable value — goodwill, customer base, van and equipment, and a trading name — that forms a meaningful part of retirement planning if the business is structured and presented correctly for sale.',
  'All employed electricians are entitled to automatic enrolment in a workplace pension, with employer contributions of at least 3% of qualifying earnings (increasing to 10% by 2028 under current proposals).',
];

const faqs = [
  {
    question: 'How much should a self-employed electrician save for retirement?',
    answer:
      'A useful starting point is the Retirement Living Standards published by the Pensions and Lifetime Savings Association (PLSA). In 2026, a "moderate" retirement (£31,300 per year for a single person, £43,100 for a couple) requires total retirement savings of approximately £450,000 to £600,000 at retirement, depending on when you retire and what State Pension you receive. For a sole trader electrician who starts saving at age 30 and wants to retire at 60, this requires saving approximately £15,000 to £20,000 per year into a pension — a significant but achievable target for a successful self-employed electrician earning £50,000+ per year. The sooner you start, the lower the required annual contribution because of the compounding effect of investment growth inside the pension wrapper.',
  },
  {
    question: 'What is a SIPP and why is it popular with self-employed electricians?',
    answer:
      'A SIPP (Self-Invested Personal Pension) is a pension where the individual controls the investment strategy — choosing from a wide range of funds, investment trusts, ETFs, and other assets. SIPPs are popular with self-employed workers because: they are flexible (you can contribute variable amounts each year, which suits the variable income of self-employment); they offer tax relief at your marginal income tax rate (a basic-rate taxpayer contributing £800 gets a £1,000 pension — HMRC tops up at 20%; higher-rate taxpayers can claim additional relief through self-assessment); they can be managed online and investments changed without cost; and they have the same inheritance tax advantages as other approved pension schemes. Popular SIPP providers for self-employed trades include Vanguard, AJ Bell, and Hargreaves Lansdown.',
  },
  {
    question: 'How does a limited company structure help with retirement savings?',
    answer:
      'For electricians operating through a limited company, employer pension contributions are one of the most tax-efficient tools available. The company can make pension contributions on your behalf directly from company profits, before Corporation Tax is applied. A £10,000 employer pension contribution costs the company £10,000 but reduces its Corporation Tax bill by £2,500 (at the 25% rate for profits above £50,000 in 2026). Compare this to drawing the same money as a dividend: the company pays Corporation Tax on the profit, then the shareholder pays dividend tax. The effective tax saving from routing retirement savings through employer pension contributions rather than dividend extraction can be substantial — typically 30 to 40% more efficient for higher-earning directors. However, this planning is complex and an accountant familiar with owner-managed businesses should be consulted.',
  },
  {
    question: 'At what age do electricians typically retire?',
    answer:
      'The physical demands of electrical work — frequent kneeling, working in confined spaces and loft spaces, overhead work, carrying cable drums and equipment, ladder work — mean that many electricians find the physical side of the job increasingly difficult in their mid-to-late 50s. The effective retirement from hands-on electrical work is often between age 58 and 62, even though the State Pension age is 67 (rising to 68 for those born after 1978). Many electricians transition to supervisory, consulting, or training roles in their late 50s — roles that allow continued income while reducing the physical demands. Those in management or contracts manager roles often continue to 65 or later, as the role is primarily office-based. Planning for the possibility of not being able to do physical electrical work from age 60 is prudent financial planning.',
  },
  {
    question: 'What is the State Pension worth for electricians in 2026?',
    answer:
      'The full new State Pension in 2026/27 is £11,502 per year (£221 per week, under the triple lock). You qualify for the full State Pension with 35 qualifying years of National Insurance contributions. Electricians who have been employed for most of their careers will typically have close to 35 qualifying years by retirement. Self-employed electricians who have consistently paid Class 4 NI contributions through self-assessment also build qualifying years. Gaps in NI records (for example, periods working abroad) can reduce the State Pension entitlement. You can top up gaps in your NI record with voluntary Class 3 contributions — this is very cost-effective as each additional qualifying year adds approximately £329 per year to State Pension for the rest of your life.',
  },
  {
    question: 'Can I sell my electrical contracting business when I retire?',
    answer:
      'Yes — an established electrical contracting business can have genuine realisable value at retirement, though valuation depends significantly on the business structure. A business with recurring maintenance contracts, a strong reputation, active client relationships, a skilled employee team, and systems that operate independently of the owner is sellable. A sole trader where all relationships and skills are held personally by the owner is much harder to sell. To maximise the value of your business for eventual sale: build a team that can operate without you, retain clients with contracts and service agreements, maintain good financial records, use a proper CRM and job management system, and begin the sale process 3 to 5 years before you want to retire. Business Asset Disposal Relief (formerly Entrepreneurs Relief) provides a 10% Capital Gains Tax rate on qualifying business disposals up to £1m lifetime gains.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/from-electrician-to-electrical-contractor',
    title: 'From Electrician to Contractor',
    description: 'Building a business that has value at retirement.',
    icon: Briefcase,
    category: 'Guide',
  },
  {
    href: '/guides/electrician-career-ladder-uk',
    title: 'Electrician Career Ladder UK',
    description: 'Complete career progression and salary guide.',
    icon: TrendingUp,
    category: 'Guide',
  },
  {
    href: '/guides/electrician-salary-london',
    title: 'Electrician Salary in London',
    description: 'Maximise earnings during your working years to fund a better retirement.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/guides/specialist-electrician-routes-uk',
    title: 'Specialist Electrician Routes',
    description: 'Higher-earning specialist paths to maximise retirement savings capacity.',
    icon: Star,
    category: 'Guide',
  },
  {
    href: '/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Quote accurately and improve profitability to fund your retirement.',
    icon: PoundSterling,
    category: 'Tool',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Professional certification that builds your business track record and value.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Retirement Planning for UK Electricians',
    content: (
      <>
        <p>
          Retirement planning is one of the most neglected aspects of financial management for
          self-employed electricians. When you are busy, billing well, and healthy, retirement
          feels distant. But the compounding effect of pension contributions means that starting
          early has an enormous impact on retirement outcomes — a 30-year-old who contributes
          £500 per month will retire with far more than a 45-year-old making the same contribution.
        </p>
        <p>
          Electricians face specific retirement planning challenges. The physical demands of the
          job mean the effective working life may be shorter than in many other professions. Sole
          traders have no employer pension contributions to rely on. And for those who own an
          electrical contracting business, understanding how to extract value from that business
          at retirement is an important additional dimension.
        </p>
        <p>
          This guide covers the pension options for sole traders, limited company directors, and
          employed electricians; the physical realities of working life; and how to think about
          business value as part of your retirement plan.
        </p>
      </>
    ),
  },
  {
    id: 'physical-demands',
    heading: 'Physical Demands and Realistic Retirement Timing',
    content: (
      <>
        <p>
          Electrical work is physically demanding. Common physical challenges that affect
          electricians as they age include:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Knee and joint problems</strong> — frequent kneeling during first-fix
                and board work accelerates wear on knee joints. Many electricians develop
                significant arthritis in their knees by their mid-50s.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Back and shoulder problems</strong> — overhead cable work, working in
                confined spaces (lofts, floor voids), and carrying heavy cable drums all place
                sustained strain on the back and shoulders.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Vibration white finger / HAVS</strong> — long-term use of SDS drills and
                impact drivers can cause Hand-Arm Vibration Syndrome, which is a prescribed
                industrial disease and can result in permanent nerve and circulatory damage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Eyesight</strong> — reading small print (cable ratings, circuit diagrams,
                schematic labels) becomes progressively more difficult in the late 40s and 50s.
                Good quality reading glasses and well-designed labelling are essential.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For these reasons, most electricians who have done hands-on electrical work throughout
          their career find they can no longer sustain the physical demands after age 58 to 62.
          Planning for a retirement from physical work at 60 (rather than 67, the current State
          Pension age) means saving more aggressively during your working years, or planning a
          gradual transition to lower-physical roles.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
            <p className="text-white text-sm">
              <strong>Planning tip:</strong> Structure your transition. At 55–58, consider
              reducing physical site work and moving into inspection and testing, supervision,
              training delivery, or consultancy. These roles maintain income while drastically
              reducing physical strain and can extend your working life significantly.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'sole-trader',
    heading: 'Pension Planning as a Sole Trader',
    content: (
      <>
        <p>
          As a sole trader, there is no employer to make pension contributions on your behalf.
          Every pound in your pension has to come from you. The key facts:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-5 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Annual allowance</strong> — you can contribute up to 100% of your annual
                earnings (net relevant earnings) or £60,000 (the annual allowance), whichever is
                lower, to a pension in 2026/27 and receive tax relief.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tax relief</strong> — pension contributions reduce your taxable profits.
                If you earn £50,000 and contribute £10,000 to a pension, your taxable income is
                effectively £40,000. For a basic-rate taxpayer, this saves £2,000 in income tax.
                For a higher-rate taxpayer, the saving is £4,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>SIPP — the standard choice</strong> — a Self-Invested Personal Pension
                offers flexibility, low costs (index fund options from 0.15% per year), and
                control over investment decisions. Regular monthly contributions combined with
                ad hoc larger contributions in good years is the typical approach for self-employed
                electricians.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Carry forward</strong> — if you have unused annual allowance from the
                previous three tax years, you can carry it forward and make a larger contribution
                in a single year. This is useful for sole traders whose income fluctuates — you
                can make smaller contributions in lean years and top up in profitable years.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Improve profitability to fund your retirement"
          description="Elec-Mate helps electricians quote accurately, reduce unbilled time, and improve the profitability that funds retirement savings. 7-day free trial."
          icon={PoundSterling}
        />
      </>
    ),
  },
  {
    id: 'ltd-company',
    heading: 'Limited Company Directors: Employer Pension Contributions',
    content: (
      <>
        <p>
          Operating through a limited company opens access to one of the most tax-efficient
          retirement savings mechanisms available to UK business owners — employer pension
          contributions.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-5 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>How it works</strong> — the company makes pension contributions directly
                into your SIPP or company pension scheme as an employer. These contributions are
                a business expense that reduces the company's taxable profit, cutting the
                Corporation Tax bill (25% for profits above £50,000 in 2026).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tax efficiency example</strong> — a limited company with £80,000 profit
                that makes a £20,000 employer pension contribution reduces taxable profit to
                £60,000, saving £5,000 in Corporation Tax (at 25%). The £20,000 goes into the
                pension with no income tax or NI — far more efficient than drawing it as a salary
                or dividend and then contributing personally.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>The annual allowance still applies</strong> — employer contributions count
                towards the £60,000 annual allowance. If you also make personal contributions,
                the total cannot exceed the allowance without triggering a tax charge. Get
                accountancy advice to ensure contributions are within the allowance each year.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Salary sacrifice</strong> — in addition to employer contributions, salary
                sacrifice (where you give up part of your salary in exchange for a larger employer
                pension contribution) can save both employee and employer NI contributions on the
                sacrificed amount.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'employed',
    heading: 'Employed Electrician Pensions: Automatic Enrolment',
    content: (
      <>
        <p>
          All employed electricians have a legal right to automatic enrolment in a workplace
          pension if they earn more than the enrolment threshold (£10,000 in 2026/27) and are
          aged 22 to 66. Key facts:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Minimum contributions</strong> — in 2026/27, the minimum total contribution
                is 8% of qualifying earnings (earnings between £6,240 and £50,270). At least 3%
                must come from the employer. The government has proposed increasing minimum
                employer contributions — check current rates with your employer.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Do not opt out</strong> — opting out of automatic enrolment loses the
                employer contribution, which is effectively a pay cut. Even if finances are tight,
                opting out should be a last resort.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>JIB pension scheme</strong> — electricians covered by the JIB national
                working rule agreement are enrolled in the JIB pension scheme (currently operated
                through Nest). Both employer and employee contribute. Contributions transfer when
                you change JIB employers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consider additional voluntary contributions (AVCs)</strong> — if you can
                afford to save more than the minimum, making additional contributions to the
                workplace pension or a personal SIPP above the employer contribution accelerates
                retirement savings significantly.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'state-pension',
    heading: 'State Pension Planning for Electricians',
    content: (
      <>
        <p>
          The State Pension is a valuable foundation for retirement income — £11,502 per year
          (the 2026/27 full new State Pension) covers approximately one-third of the "moderate"
          retirement income standard. Key actions to maximise your State Pension:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Check your State Pension forecast on the GOV.UK website (search "check State Pension
                forecast"). This shows your projected pension based on your NI record and how many
                more qualifying years you need for the full amount.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Consider buying missing NI years (Class 3 voluntary contributions, approximately
                £824 per missing year in 2026/27). Each year you buy adds £329 per year to your
                State Pension for life — a return of over 25% per year, making it exceptional
                value if you are in reasonable health.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Self-employed electricians should ensure they are registered for self-assessment
                and paying Class 4 NI contributions annually — these count towards qualifying
                years. Missing years from periods of inactivity or working abroad can be filled
                with voluntary Class 3 contributions.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'business-value',
    heading: 'Business Value and Retirement Exit for Electrical Contractors',
    content: (
      <>
        <p>
          For electricians who own a contracting business, the business itself can form a
          significant part of retirement planning — but only if the business is structured for
          transferability rather than personal dependence.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Briefcase className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">What makes a business saleable?</h4>
                <p className="text-white text-sm leading-relaxed">
                  Recurring maintenance contracts (ongoing revenue without new sales effort),
                  a team that operates independently of the owner, documented processes and
                  systems, clean financial records for the past 3 years, and active client
                  relationships that are with the business (not personally with the owner).
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Tax on business sale</h4>
                <p className="text-white text-sm leading-relaxed">
                  Business Asset Disposal Relief (BADR) — formerly Entrepreneurs Relief — provides
                  a 10% Capital Gains Tax rate on qualifying business sales up to a £1m lifetime
                  limit. An electrical business sold for £300,000 with a cost base of £50,000
                  generates £250,000 of gain taxed at 10% (£25,000 CGT) rather than 20% (£50,000
                  CGT) — a saving of £25,000.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <TrendingUp className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Start planning 5 years ahead</h4>
                <p className="text-white text-sm leading-relaxed">
                  The best business exits are planned 3 to 5 years in advance. This gives time
                  to build the management team, grow recurring revenues, and present 3 years of
                  strong financial accounts. A business sold on impulse or in poor health always
                  achieves less than one presented at its best.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianRetirementPlanningPage() {
  return (
    <GuideTemplate
      title="Electrician Retirement Planning UK | Pensions, Business Value & Exit"
      description="Retirement planning guide for UK electricians — sole trader SIPPs, limited company employer pension contributions, physical demands and realistic retirement age (58–62), and how to maximise business value for exit."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Financial Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          Electrician Retirement Planning:{' '}
          <span className="text-yellow-400">Pensions, Business Value and Exit</span>
        </>
      }
      heroSubtitle="Retirement planning for UK electricians — the physical realities of a trades career, pension options for sole traders and limited company directors, State Pension maximisation, and how to build and exit a business with real retirement value."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrician Retirement Planning"
      relatedPages={relatedPages}
      ctaHeading="Run a More Profitable Business to Fund Your Retirement"
      ctaSubheading="Elec-Mate helps UK electricians quote accurately, reduce unbilled time, and run a more profitable business — the foundation of a secure retirement. 7-day free trial."
    />
  );
}
