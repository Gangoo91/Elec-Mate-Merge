import { ArrowLeft, Briefcase, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

/* ------------------------------------------------------------------ */
/*  Quick-check questions (InlineCheck — correctIndex, 0-indexed)      */
/* ------------------------------------------------------------------ */
const quickCheckQuestions = [
  {
    id: 'pf-1-1-check1',
    question:
      'An electrician works on a large commercial project through an agency. The agency deducts tax and National Insurance before paying them each week. The electrician has no say over which jobs they work on, what hours they work, or how they carry out the work. What is this electrician&rsquo;s most likely employment status?',
    options: [
      'Self-employed sole trader because they are working through an agency',
      'CIS subcontractor because they are on a construction site',
      'PAYE employed because the agency controls how, when, and where they work and deducts tax at source',
      'Limited company director because they are paid through a third party',
    ],
    correctIndex: 2,
    explanation:
      'The key indicators here are control and tax deduction at source. HMRC determines employment status primarily through the degree of control the engager has over the worker. Because the agency dictates the jobs, hours, and methods of work, and because tax and NI are deducted before payment, this is PAYE employment. Working through an agency does not automatically make someone self-employed &mdash; the substance of the working arrangement matters far more than its label. This is a critical distinction that many electricians get wrong, sometimes with serious HMRC consequences.',
  },
  {
    id: 'pf-1-1-check2',
    question:
      'A self-employed electrician registers for CIS but does not apply for gross payment status. What percentage of their payments from contractors will be deducted at source?',
    options: [
      '0% &mdash; CIS registration means no deductions',
      '20% &mdash; the standard CIS deduction rate for registered subcontractors',
      '30% &mdash; the higher rate for unregistered subcontractors',
      '45% &mdash; the additional rate of Income Tax',
    ],
    correctIndex: 1,
    explanation:
      'Under the Construction Industry Scheme, registered subcontractors have 20% deducted from their payments by the contractor. This is not a final tax bill &mdash; it is an advance payment towards the subcontractor&rsquo;s eventual Income Tax and National Insurance liability. If the subcontractor&rsquo;s actual tax bill is less than the total CIS deductions, they can claim a refund through their Self Assessment tax return. Unregistered subcontractors face a 30% deduction rate, which is why registration is strongly recommended. Gross payment status (0% deduction) is available but requires meeting strict HMRC criteria including a turnover threshold and a clean compliance record.',
  },
  {
    id: 'pf-1-1-check3',
    question:
      'A JIB Approved Electrician earns &pound;21.27 per hour on the JIB National Working Rule. Which of the following is NOT typically included in the JIB benefits package on top of the hourly rate?',
    options: [
      'Travel time allowance and daily travel allowance',
      'Death-in-service benefit and income protection insurance',
      'A company van and fuel card for personal use',
      'Industry pension contributions through the EPID scheme',
    ],
    correctIndex: 2,
    explanation:
      'The JIB (Joint Industry Board for the Electrical Contracting Industry) benefits package includes travel allowances, death-in-service benefit, income protection, and pension contributions through the EPID (Electrical and Plumbing Industries Defined) pension scheme. However, a company van and fuel card for personal use are not standard JIB benefits &mdash; these are discretionary benefits that individual employers may or may not offer. The total monetary value of the JIB package (including employer NI contributions, pension, and insurances) can add 25&ndash;35% on top of the basic hourly rate, which is a critical factor when comparing JIB-employed rates against self-employed day rates.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'Can I be employed and self-employed at the same time?',
    answer:
      'Yes, absolutely. Many electricians hold a PAYE employed position (for example, working for an electrical contractor Monday to Friday) and also do private domestic work as a self-employed sole trader in evenings and weekends. HMRC treats these as separate income streams. Your employed income is taxed through PAYE as normal, and your self-employed income must be reported through a Self Assessment tax return. You will pay Income Tax on the combined total of both incomes, and you will pay Class 2 and Class 4 National Insurance on your self-employed profits. It is important to keep meticulous records of your self-employed income and expenses, and to set aside money for your tax bill, because HMRC will not have collected the correct amount through PAYE alone.',
  },
  {
    question: 'What happens if HMRC decides I am not genuinely self-employed?',
    answer:
      'If HMRC determines that your working arrangement is actually employment disguised as self-employment, the consequences can be severe. The engager (the company that hired you) may be required to pay backdated PAYE, employer National Insurance contributions, interest, and penalties. In some cases, HMRC may also pursue the worker for unpaid employee National Insurance. The key tests HMRC applies are: mutuality of obligation (does the engager have to offer work, and do you have to accept it?), control (does the engager dictate how, when, and where you work?), and substitution (can you send someone else to do the work in your place?). If the answer to the first two is yes and the third is no, HMRC is likely to consider you employed regardless of what your contract says.',
  },
  {
    question: 'Is it better to be self-employed or to set up a limited company?',
    answer:
      'There is no universal answer &mdash; it depends on your turnover, profit level, personal circumstances, and appetite for administrative responsibility. As a rough guide, limited company structures tend to become more tax-efficient than sole trader status once your annual profits exceed approximately &pound;40,000&ndash;&pound;50,000, because you can use the salary/dividend split to reduce National Insurance liability. However, a limited company brings additional costs and obligations: you must file annual accounts with Companies House, submit a Corporation Tax return, maintain statutory records, and potentially pay for an accountant. You also lose the simplicity of sole trader accounting. Many electricians start as sole traders and incorporate later as their turnover grows. Always take professional advice before incorporating, as IR35 considerations may also apply.',
  },
  {
    question: 'What is the difference between JIB and non-JIB employed work?',
    answer:
      'JIB (Joint Industry Board) rates and conditions are a negotiated agreement between the Electrical Contractors Association (ECA) and Unite the Union. JIB-employed electricians receive standardised pay rates based on their grading, plus a comprehensive benefits package including pension contributions, death-in-service benefit, income protection, tool allowances, and travel allowances. Non-JIB employers are not bound by these terms and can set their own pay rates and conditions. Some non-JIB employers offer better base pay than JIB rates but fewer benefits; others offer lower pay and fewer benefits. When comparing JIB and non-JIB offers, it is essential to calculate the total package value rather than just comparing hourly rates, because the JIB benefits package can add 25&ndash;35% to the total employment cost.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions (Quiz — correctAnswer, 0-indexed)                   */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      'Under the Construction Industry Scheme (CIS), what is the deduction rate for a subcontractor who has NOT registered with HMRC?',
    options: [
      '0% &mdash; unregistered subcontractors are exempt from deductions',
      '20% &mdash; the standard registered rate',
      '30% &mdash; the higher rate for unregistered subcontractors',
      '45% &mdash; the additional rate of Income Tax',
    ],
    correctAnswer: 2,
    explanation:
      'Unregistered CIS subcontractors face a 30% deduction rate, compared to 20% for registered subcontractors and 0% for those with gross payment status. This higher rate is designed to encourage registration and is one of the most compelling reasons to register with HMRC before undertaking any CIS work. The deduction is not a penalty &mdash; it is still an advance payment towards your tax bill &mdash; but having 30% deducted rather than 20% creates significant cash flow pressure, especially for electricians with substantial material costs that are not covered by the deduction calculation.',
  },
  {
    id: 2,
    question:
      'Which of the following is the MOST important factor HMRC uses to determine whether an electrician is genuinely self-employed or actually employed?',
    options: [
      'Whether the electrician has registered as self-employed with HMRC',
      'Whether the electrician has their own tools and van',
      'The degree of control the engager has over how, when, and where the electrician works',
      'Whether the electrician has a written contract stating they are self-employed',
    ],
    correctAnswer: 2,
    explanation:
      'Control is the single most important factor in HMRC&rsquo;s employment status determination. If the engager controls how the work is done (not just what is done), when it is done, and where it is done, HMRC is likely to consider the arrangement employment regardless of what the contract says. The other factors listed &mdash; HMRC registration, owning tools, and contract wording &mdash; are relevant but secondary. HMRC consistently applies the principle of &ldquo;substance over form&rdquo;, meaning the reality of the working arrangement matters more than any paperwork. Many electricians have been caught out by assuming that a self-employed contract is sufficient protection when the actual working conditions indicate employment.',
  },
  {
    id: 3,
    question:
      'A JIB Approved Electrician working under the National Working Rule receives an hourly rate of &pound;21.27. Approximately what percentage does the total JIB employment package (including pension, insurances, and allowances) add on top of the basic hourly rate?',
    options: ['5&ndash;10%', '10&ndash;15%', '25&ndash;35%', '50&ndash;60%'],
    correctAnswer: 2,
    explanation:
      'The JIB benefits package typically adds 25&ndash;35% to the basic hourly rate when you include employer pension contributions (through the EPID scheme), death-in-service benefit, income protection insurance, tool allowance, travel time and travel cost allowances, and employer National Insurance contributions. For an Approved Electrician on &pound;21.27/hour, this means the total employment cost to the employer is approximately &pound;26.50&ndash;&pound;28.70 per hour. This is a critical calculation when comparing employed JIB rates against self-employed day rates, because many electricians look only at the headline hourly or daily figure without accounting for the benefits they would need to self-fund.',
  },
  {
    id: 4,
    question:
      'An electrician operates through a limited company and is the sole director and shareholder. They take a small salary of &pound;12,570 and the rest of their income as dividends. The primary tax advantage of this structure is:',
    options: [
      'Dividends are completely tax-free regardless of amount',
      'Dividends do not attract National Insurance contributions, unlike salary, reducing the overall tax burden',
      'Limited company directors do not need to file tax returns',
      'Corporation Tax is always lower than Income Tax',
    ],
    correctAnswer: 1,
    explanation:
      'The salary/dividend split is the primary tax efficiency mechanism for limited company directors. By taking a salary at or near the Personal Allowance (&pound;12,570), the director pays no Income Tax and minimal National Insurance on the salary. Dividends do not attract National Insurance contributions (neither employer nor employee), which is where the main saving lies compared to taking the entire income as salary. However, dividends are not tax-free &mdash; they are taxed at 8.75% (basic rate), 33.75% (higher rate), and 39.35% (additional rate) above the &pound;1,000 dividend allowance. Corporation Tax (25% for profits over &pound;250,000, or 19&ndash;25% with marginal relief) must also be paid before dividends can be distributed.',
  },
  {
    id: 5,
    question: 'IR35 (off-payroll working rules) applies when:',
    options: [
      'Any contractor works on a construction site',
      'A worker provides services through an intermediary (such as a personal service company) and would be considered an employee if engaged directly',
      'A sole trader earns more than &pound;85,000 per year',
      'A subcontractor is registered for CIS',
    ],
    correctAnswer: 1,
    explanation:
      'IR35 targets arrangements where a worker provides services through an intermediary (typically a personal service company &mdash; a limited company owned by the worker) but would be considered an employee if they were engaged directly by the end client. The rules were introduced by ITEPA 2003 (Income Tax (Earnings and Pensions) Act 2003) and were significantly reformed in April 2021 for the private sector. If a contract is &ldquo;inside IR35&rdquo;, the worker must be taxed as if they were employed, losing the tax advantages of the limited company structure. For medium and large private sector clients, the responsibility for determining IR35 status now lies with the end client, not the worker. This has significantly impacted electricians working through personal service companies on larger commercial projects.',
  },
  {
    id: 6,
    question:
      'Which JIB grading typically requires completion of an approved apprenticeship or equivalent qualification AND passing the AM2 assessment?',
    options: ['Electrical Labourer', 'Trainee Electrician', 'Approved Electrician', 'Technician'],
    correctAnswer: 2,
    explanation:
      'The JIB Approved Electrician grading requires completion of an approved apprenticeship (or equivalent qualification pathway) AND successful completion of the AM2 (Achievement Measurement 2) practical assessment. The AM2 is a two-day practical skills assessment that tests installation competence including conduit bending, trunking installation, wiring, testing, and fault finding. It is widely regarded as the industry standard entry point for a fully qualified electrician. The Technician grade sits above Approved Electrician and requires additional qualifications and/or experience, typically including design and inspection and testing competences. The Approved Electrician grading is the most common grading for qualified electricians working under JIB terms.',
  },
  {
    id: 7,
    question:
      'A CIS-registered subcontractor has &pound;10,000 deducted over the tax year through CIS. When they complete their Self Assessment return, their actual Income Tax and NI liability is &pound;7,500. What happens?',
    options: [
      'They must pay &pound;7,500 in addition to the &pound;10,000 already deducted',
      'They receive a &pound;2,500 refund from HMRC because their CIS deductions exceeded their actual tax liability',
      'The &pound;2,500 overpayment is lost and cannot be reclaimed',
      'They must register for VAT to reclaim the difference',
    ],
    correctAnswer: 1,
    explanation:
      'CIS deductions are advance payments towards the subcontractor&rsquo;s tax bill, not a final tax. When the subcontractor files their Self Assessment return, HMRC calculates the actual Income Tax and National Insurance liability. If the total CIS deductions (&pound;10,000) exceed the actual liability (&pound;7,500), the subcontractor receives a refund of the difference (&pound;2,500). This is why it is essential to file a Self Assessment return even if you think you have &ldquo;already paid your tax&rdquo; through CIS &mdash; you may be entitled to a significant refund. Conversely, if your actual liability exceeds your CIS deductions (for example, if you have other income sources), you will need to pay the shortfall.',
  },
  {
    id: 8,
    question:
      'An electrician is considering moving from PAYE employment to self-employment. Which of the following is a financial responsibility they will take on that was previously handled by their employer?',
    options: [
      'Paying for their own ECS card renewal',
      'Buying their own work boots',
      'Paying employer National Insurance contributions, pension contributions, holiday pay provision, sick pay provision, and professional indemnity insurance',
      'Purchasing their own test instruments',
    ],
    correctAnswer: 2,
    explanation:
      'When moving from PAYE employment to self-employment, the most significant financial shift is taking on responsibilities that were previously covered by the employer. These include: employer National Insurance contributions (13.8% on earnings above the secondary threshold), pension contributions (minimum 3% employer contribution under auto-enrolment), holiday pay provision (you must now save for your own holidays as there is no paid annual leave), sick pay provision (no Statutory Sick Pay as a self-employed person), and business insurances including public liability and professional indemnity. While buying tools and boots may also become your responsibility, these are relatively small costs compared to the employer-side obligations that self-employed electricians must now self-fund. This is why a self-employed day rate must be significantly higher than the equivalent employed hourly rate to provide the same standard of living.',
  },
];

export default function PFModule1Section1() {
  useSEO({
    title: 'Income Types for Electricians | Personal Finance Module 1.1',
    description:
      'PAYE employed, self-employed sole trader, CIS subcontractor, limited company director, JIB grading and pay rates, and IR35 off-payroll working rules.',
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../pf-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/30 mb-4">
            <Briefcase className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 1 &middot; SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Income Types for Electricians
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            PAYE employed, self-employed sole trader, CIS subcontractor, limited company director,
            JIB grading and pay rates, and IR35 off-payroll working rules
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Four main income structures</strong> for electricians: PAYE employed,
                self-employed sole trader, CIS subcontractor, and limited company director
              </li>
              <li>
                <strong>JIB grading</strong> sets standardised pay rates from Electrical Labourer
                through to Technician, with the Approved Electrician grade as the industry benchmark
              </li>
              <li>
                <strong>CIS deductions</strong> are advance tax payments (20% registered, 30%
                unregistered, 0% gross) &mdash; not final tax
              </li>
              <li>
                <strong>IR35</strong> determines whether limited company contractors are taxed as
                employees or genuinely self-employed
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Tax efficiency:</strong> Your employment structure determines how much tax
                and National Insurance you pay &mdash; the difference can be thousands of pounds per
                year
              </li>
              <li>
                <strong>Legal compliance:</strong> Getting your employment status wrong can result
                in backdated tax bills, penalties, and interest from HMRC
              </li>
              <li>
                <strong>Financial planning:</strong> Each structure has different implications for
                pensions, sick pay, holiday pay, and mortgage applications
              </li>
              <li>
                <strong>Career decisions:</strong> Understanding the true cost of each structure
                helps you make informed choices about how you work
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'Describe the four main income structures available to electricians and explain the key differences between them',
              'Explain the JIB grading structure from Electrical Labourer to Technician and identify the qualification requirements for each grade',
              'Calculate the true value of a JIB employment package including benefits, pension, and insurances',
              'Explain how the Construction Industry Scheme (CIS) works, including deduction rates and the refund mechanism',
              'Describe the salary/dividend split strategy used by limited company directors and explain why it reduces National Insurance',
              'Explain IR35 off-payroll working rules and identify the key factors HMRC uses to determine employment status',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: PAYE Employment */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            PAYE Employment &mdash; The Traditional Route
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                PAYE (Pay As You Earn) employment is the most straightforward income structure for
                electricians. Under PAYE, you work for an employer who is responsible for deducting
                Income Tax and National Insurance contributions from your pay before you receive it.
                Your employer also pays employer&rsquo;s National Insurance (currently 13.8% on
                earnings above the secondary threshold of &pound;9,100) and must auto-enrol you into
                a workplace pension scheme with a minimum employer contribution of 3% of qualifying
                earnings. You receive a regular payslip showing gross pay, deductions, and net pay.
                At the end of the tax year, your employer provides a P60 summarising your total
                earnings and deductions. In most cases, if PAYE employment is your only income
                source, you will not need to file a Self Assessment tax return because the correct
                amount of tax has already been collected through the payroll.
              </p>

              <p>
                The advantages of PAYE employment are significant and often undervalued by
                electricians who are attracted by the seemingly higher rates offered by
                self-employment. As a PAYE employee, you are entitled to Statutory Sick Pay (SSP) of
                &pound;109.40 per week for up to 28 weeks, paid annual leave (a minimum of 28 days
                including bank holidays for a full-time worker), statutory redundancy pay if you are
                made redundant, maternity and paternity pay, and protection under employment law
                including unfair dismissal rights (after two years&rsquo; qualifying service) and
                protection under the Equality Act 2010. Your employer also carries the cost of
                employer&rsquo;s liability insurance, public liability insurance, and professional
                indemnity insurance &mdash; costs that self-employed electricians must fund
                themselves. Many PAYE employers also provide additional benefits such as a company
                van, fuel card, tool allowance, and enhanced pension contributions that go well
                beyond the statutory minimum.
              </p>

              <p>
                Within PAYE employment, there is an important distinction between JIB and non-JIB
                employers. The Joint Industry Board for the Electrical Contracting Industry (JIB)
                negotiates standardised terms and conditions between the Electrical
                Contractors&rsquo; Association (ECA) and Unite the Union. JIB-registered employers
                agree to pay rates and provide benefits that meet or exceed the JIB National Working
                Rule. Non-JIB employers are free to set their own terms, which may be higher or
                lower than JIB rates. Understanding this distinction is essential when evaluating
                job offers, because a non-JIB employer offering a higher hourly rate may actually
                provide a lower total package once you account for the comprehensive JIB benefits.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Key PAYE Rights and Entitlements
                </p>
                <p className="text-base text-white leading-relaxed">
                  As a PAYE employee, you are legally entitled to: a written statement of employment
                  particulars (from day one since April 2020), the National Minimum Wage or National
                  Living Wage, paid annual leave, rest breaks, protection against unlawful
                  discrimination, Statutory Sick Pay, and auto-enrolment into a workplace pension.
                  These are minimum statutory rights &mdash; your employer may offer more, but they
                  cannot offer less.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: JIB Grading Structure */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            JIB Grading Structure &amp; Pay Rates
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The JIB grading structure provides a clear career progression pathway for
                electricians working under JIB terms. Each grade has specific qualification
                requirements and a corresponding pay rate set by the National Working Rule. The
                grades, from lowest to highest, are: Electrical Labourer, Trainee Electrician,
                Graded Electrician (sometimes called &ldquo;Electrician&rdquo;), Approved
                Electrician, and Technician. Understanding these grades is important not just for
                employed electricians but for anyone in the industry, because JIB rates are widely
                used as benchmarks even by non-JIB employers and are referenced in contract
                negotiations across the sector.
              </p>

              <p>
                The <strong>Electrical Labourer</strong> grade is the entry-level position for
                workers who assist qualified electricians but do not hold electrical qualifications.
                Labourers carry out tasks such as chasing walls, pulling cables, fitting back boxes,
                and general site tidying. They are not permitted to make electrical connections or
                carry out testing. The <strong>Trainee Electrician</strong> grade covers apprentices
                and those in training who are working towards their electrical qualifications.
                Trainee rates increase annually as the apprentice progresses through their training,
                with the rate in the final year of apprenticeship being significantly higher than
                the first year. The <strong>Graded Electrician</strong> is an electrician who has
                completed their qualifications but has not yet passed the AM2 assessment. This grade
                recognises that the individual is qualified but has not yet demonstrated their
                competence through the industry&rsquo;s practical assessment.
              </p>

              <p>
                The <strong>Approved Electrician</strong> grade is the most common and arguably the
                most important grade in the JIB structure. To achieve Approved Electrician status,
                an individual must have completed an approved apprenticeship or equivalent
                qualification pathway AND passed the AM2 (Achievement Measurement 2) practical
                assessment. The AM2 is a rigorous two-day assessment that tests practical
                installation skills including conduit bending, trunking installation, single-phase
                and three-phase wiring, testing and inspection, and fault diagnosis. The current JIB
                National Working Rule rate for an Approved Electrician is &pound;21.27 per hour (as
                of the most recent JIB agreement). This rate is the base &mdash; the total package
                value is significantly higher once benefits are included.
              </p>

              <p>
                The <strong>Technician</strong> grade sits above Approved Electrician and is
                designed for electricians who have developed additional competences in areas such as
                design, inspection and testing, or commissioning. Technicians typically hold
                additional qualifications beyond those required for Approved Electrician status,
                such as the City &amp; Guilds 2396 (Electrical Installation Design) or equivalent.
                The Technician hourly rate is higher than the Approved Electrician rate, reflecting
                the additional skills and responsibilities. The JIB also recognises a Senior
                Technician grade for those with significant experience and higher-level
                qualifications.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  The True Value of a JIB Employment Package
                </p>
                <p className="text-sm text-white leading-relaxed mb-3">
                  When comparing JIB-employed rates against self-employed day rates, you must
                  calculate the total package value, not just the hourly rate. For an Approved
                  Electrician on &pound;21.27/hour, the total employer cost includes:
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Employer NI contributions:</strong> 13.8% on earnings above
                      &pound;9,100/year &mdash; approximately &pound;4,200/year for a full-time
                      Approved Electrician
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>EPID pension contributions:</strong> Employer contributes to the
                      Electrical and Plumbing Industries Defined pension scheme &mdash; typically
                      &pound;1,500&ndash;&pound;2,500/year
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Death-in-service benefit:</strong> Typically 4x annual salary &mdash;
                      approximately &pound;175,000 cover at no cost to the employee
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Income protection insurance:</strong> Provides income replacement if
                      you are unable to work due to illness or injury &mdash; a policy that would
                      cost &pound;500&ndash;&pound;1,000/year to buy privately
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Travel allowances:</strong> Daily travel allowance and travel time
                      payment for journeys beyond a specified radius
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Paid annual leave:</strong> Minimum 28 days &mdash; worth
                      approximately &pound;4,000 in foregone earnings that a self-employed
                      electrician would not receive
                    </span>
                  </li>
                </ul>
                <p className="text-sm text-white mt-3">
                  <strong>Total package value:</strong> Approximately
                  &pound;53,000&ndash;&pound;58,000 per year, compared to a headline gross salary of
                  approximately &pound;44,000 based on &pound;21.27/hour for a standard 39-hour
                  week.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Self-Employed Sole Trader */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Self-Employed Sole Trader
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Self-employment as a sole trader is the most common alternative to PAYE employment
                for electricians. As a sole trader, you are the business &mdash; there is no legal
                distinction between you personally and your business. You keep all the profits after
                tax, but you also bear all the risk. You must register with HMRC as self-employed
                within three months of starting to trade, and you will be issued a Unique Taxpayer
                Reference (UTR) number. You must file a Self Assessment tax return by 31 January
                following the end of the tax year (5 April), or by 31 October if you file a paper
                return. Your profits are subject to Income Tax (at 20%, 40%, or 45% depending on the
                band) and National Insurance (Class 2 at &pound;3.45 per week, which became
                voluntary from April 2024, and Class 4 at 6% on profits between &pound;12,570 and
                &pound;50,270, plus 2% on profits above &pound;50,270).
              </p>

              <p>
                The appeal of self-employment for electricians is clear: higher headline rates, more
                control over which jobs you take, the ability to set your own hours, and the
                flexibility to work for multiple clients. A self-employed electrician working on
                domestic jobs might charge &pound;250&ndash;&pound;350 per day, while those on
                commercial or industrial projects might command &pound;250&ndash;&pound;400 per day
                depending on the specialism. These figures look significantly more attractive than a
                JIB Approved Electrician rate of &pound;21.27 per hour (&pound;170 for an eight-hour
                day). However, this comparison is deeply misleading because it ignores the extensive
                costs and responsibilities that self-employment brings, which we will examine in
                detail in Section 3.
              </p>

              <p>
                As a self-employed sole trader, you are personally responsible for a wide range of
                business costs and administrative obligations that are handled by your employer in a
                PAYE arrangement. These include: public liability insurance (typically
                &pound;200&ndash;&pound;500/year for a sole trader electrician), professional
                indemnity insurance (&pound;150&ndash;&pound;400/year), van costs (lease, fuel,
                insurance, maintenance, MOT &mdash; easily &pound;5,000&ndash;&pound;10,000/year),
                tools and equipment (including calibrated test instruments, which alone can cost
                &pound;1,500&ndash;&pound;3,000 for a full set), accounting fees
                (&pound;300&ndash;&pound;1,000/year for a sole trader), certification scheme
                membership (NICEIC, NAPIT, or equivalent &mdash;
                &pound;400&ndash;&pound;1,200/year), and CPD training. You must also set aside money
                for holidays (no paid leave), sickness (no Statutory Sick Pay), quiet periods (no
                guaranteed work), and your tax bill (which arrives in a lump sum or through payments
                on account).
              </p>

              <p>
                One of the most important aspects of sole trader status is that your personal assets
                are not protected from business debts. If your business fails or you face a
                significant liability claim, your personal assets &mdash; including your home
                &mdash; could be at risk. This is a fundamental difference from limited company
                status, where the company is a separate legal entity and your personal liability is
                limited to your investment in the company (subject to certain exceptions). For
                electricians who work on higher-value projects or employ other people, this
                unlimited personal liability can be a significant risk factor that weighs in favour
                of incorporating as a limited company.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  The Self-Employment Reality Check
                </p>
                <p className="text-base text-white leading-relaxed">
                  Before making the leap to self-employment, ask yourself these questions honestly:
                  Can I consistently find enough work to fill my diary? Do I have at least three
                  months&rsquo; living expenses saved as a financial buffer? Am I prepared to handle
                  my own tax, VAT, invoicing, and administration? Do I have the discipline to set
                  aside 25&ndash;30% of every payment for tax? Am I comfortable with the lack of
                  holiday pay, sick pay, and guaranteed income? If the answer to any of these is no,
                  you may not be ready for self-employment yet &mdash; and that is perfectly fine.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: CIS Subcontractor */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            The Construction Industry Scheme (CIS)
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Construction Industry Scheme (CIS) is a tax deduction scheme operated by HMRC
                that applies specifically to the construction industry. Under CIS, contractors
                (businesses that pay subcontractors for construction work) must deduct money from
                subcontractor payments and pass it to HMRC. These deductions count as advance
                payments towards the subcontractor&rsquo;s Income Tax and National Insurance
                liability. CIS applies to all construction work including electrical installation,
                maintenance, and repair. If you are a self-employed electrician working for a
                contractor (rather than directly for a domestic client), CIS almost certainly
                applies to your payments.
              </p>

              <p>
                The deduction rates under CIS are: <strong>20%</strong> for registered
                subcontractors, <strong>30%</strong> for unregistered subcontractors, and
                <strong> 0%</strong> for subcontractors with gross payment status. Registration is
                free and straightforward &mdash; you simply need a UTR number and to register with
                HMRC for CIS. Given the significant difference between 20% and 30% deduction rates,
                there is absolutely no reason not to register. Gross payment status (0% deduction)
                is more difficult to obtain and requires meeting three tests: a business test
                (demonstrating you are carrying on a construction business), a turnover test (a
                minimum annual turnover of &pound;30,000 excluding materials and VAT), and a
                compliance test (a clean record of filing tax returns and paying tax on time over
                the previous twelve months).
              </p>

              <p>
                A critical point that many electricians misunderstand is that CIS deductions are
                <strong> not your final tax bill</strong>. They are advance payments &mdash;
                effectively a forced saving mechanism for your tax. When you file your Self
                Assessment tax return, HMRC calculates your actual Income Tax and National Insurance
                liability based on your total income and allowable expenses. The CIS deductions you
                have already paid are then set against this liability. If your CIS deductions exceed
                your actual tax bill (which often happens when you have significant allowable
                expenses), you will receive a refund. If your actual tax bill exceeds your CIS
                deductions (for example, if you have other income), you will need to pay the
                difference. This is why filing your Self Assessment return is essential even if you
                believe you have &ldquo;already paid your tax&rdquo; &mdash; you may be leaving
                money on the table.
              </p>

              <p>
                CIS deductions are calculated on the labour element of the payment, not on materials
                that the subcontractor has purchased. This means that if a contractor pays you
                &pound;2,000 for a job and you can demonstrate that &pound;800 of that payment is
                for materials you purchased, the 20% CIS deduction applies only to the &pound;1,200
                labour element, resulting in a &pound;240 deduction rather than &pound;400. To claim
                this materials deduction, you must provide the contractor with evidence of your
                material costs (receipts or invoices). The contractor then includes the materials
                figure on the CIS voucher they provide to you. Keeping organised records of material
                purchases is therefore directly beneficial to your cash flow.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  CIS Deduction Rates at a Glance
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>0% (Gross payment status):</strong> No deduction at source. Requires
                      meeting business, turnover (&pound;30,000+), and compliance tests. Best for
                      established businesses with clean HMRC records and strong cash flow
                      management.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong>20% (Registered):</strong> Standard rate for CIS-registered
                      subcontractors. Registration is free and requires only a UTR number. This is
                      the minimum you should aim for. Deductions apply to the labour element only.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong>30% (Unregistered):</strong> The penalty rate for subcontractors who
                      have not registered. This 50% premium over the registered rate makes
                      non-registration financially irrational. Register immediately if you have not
                      already done so.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Limited Company Director */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Limited Company Director
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Operating through a limited company is the most complex income structure available
                to electricians but can offer significant tax advantages at higher income levels. A
                limited company is a separate legal entity from you personally. The company earns
                the income, pays Corporation Tax on its profits, and then distributes money to you
                as the director/shareholder through a combination of salary and dividends. The key
                advantage is that dividends do not attract National Insurance contributions, which
                can result in a meaningful tax saving compared to taking all income as salary (as a
                sole trader effectively does) or through PAYE employment.
              </p>

              <p>
                The typical structure for a one-person electrical company involves taking a
                director&rsquo;s salary at or near the Personal Allowance of &pound;12,570 per year.
                At this level, you pay no Income Tax on the salary and no employee National
                Insurance (because the salary is below the primary threshold). The employer&rsquo;s
                National Insurance liability is also minimal. The remaining company profit, after
                Corporation Tax, is distributed as dividends. Corporation Tax is currently 25% for
                companies with profits over &pound;250,000, with a small profits rate of 19% for
                companies with profits up to &pound;50,000 and marginal relief for profits between
                &pound;50,000 and &pound;250,000 (most one-person electrical companies fall into the
                small profits bracket). Dividends are then taxed at 8.75% (basic rate), 33.75%
                (higher rate), or 39.35% (additional rate) above the &pound;1,000 annual dividend
                allowance.
              </p>

              <p>
                To illustrate the potential saving: an electrician with &pound;60,000 in annual
                profit operating as a sole trader would pay Income Tax and Class 4 National
                Insurance on the full profit. The same electrician operating through a limited
                company, taking &pound;12,570 salary and the remainder as dividends, would pay
                significantly less National Insurance because dividends are NI-free. The exact
                saving depends on the specific numbers, but it is typically in the range of
                &pound;2,000&ndash;&pound;5,000 per year at this profit level. However, this saving
                must be weighed against the additional costs and administrative burden of running a
                limited company: annual accounts filed with Companies House, a Corporation Tax
                return filed with HMRC, a personal Self Assessment return, payroll processing for
                your salary, potential accountancy fees of &pound;1,000&ndash;&pound;2,500 per year,
                and Companies House filing fees.
              </p>

              <p>
                There are also important practical considerations. Limited company status can make
                mortgage applications more complex, because lenders often assess income based on
                salary plus dividends rather than company profits, which may be lower than the
                equivalent sole trader income figure. Banking is separate &mdash; you must maintain
                a business bank account and keep company finances completely separate from personal
                finances. You have legal duties as a company director under the Companies Act 2006,
                including duties to promote the success of the company, exercise independent
                judgment, and avoid conflicts of interest. And if you are working for a single
                client in a way that resembles employment, IR35 may apply, which would remove most
                of the tax advantages.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Sole Trader vs Limited Company: When Does Incorporation Make Sense?
                </p>
                <p className="text-sm text-white leading-relaxed mb-3">
                  As a general rule of thumb (always take professional advice for your specific
                  circumstances):
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Profits under &pound;30,000:</strong> Sole trader is usually simpler
                      and the tax saving from incorporation is minimal or non-existent after
                      accounting for additional costs
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Profits &pound;30,000&ndash;&pound;50,000:</strong> The break-even
                      zone. Incorporation may save &pound;500&ndash;&pound;2,000 per year, but the
                      additional administrative burden may not be worth it for everyone
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Profits over &pound;50,000:</strong> Incorporation typically becomes
                      clearly beneficial from a tax perspective, with savings of
                      &pound;2,000&ndash;&pound;5,000+ per year. The additional costs and
                      administration are more easily justified.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>IR35 consideration:</strong> If most of your work is for a single
                      client and you would be considered an employee if engaged directly, the tax
                      advantages of a limited company are largely negated by IR35
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: IR35 Off-Payroll Working Rules */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            IR35 &mdash; Off-Payroll Working Rules
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                IR35 is the name commonly given to the &ldquo;off-payroll working rules&rdquo;
                contained in the Income Tax (Earnings and Pensions) Act 2003 (ITEPA 2003), Chapter
                8. These rules target arrangements where a worker provides services to a client
                through an intermediary &mdash; typically a personal service company (PSC), which is
                a limited company owned and controlled by the worker &mdash; but would be considered
                an employee of the client if they were engaged directly without the intermediary.
                The purpose of IR35 is to ensure that individuals who work like employees pay
                broadly the same tax and National Insurance as employees, even if they are
                technically providing their services through a company.
              </p>

              <p>
                For electricians, IR35 is most relevant when working through a personal service
                company on contracts with larger businesses. Since April 2021 (when the off-payroll
                working reforms were extended to the private sector), medium and large private
                sector clients are responsible for determining whether IR35 applies to a particular
                engagement. If the client determines that IR35 applies (&ldquo;inside IR35&rdquo;),
                the fee-payer (usually the agency or contractor through which the electrician is
                engaged) must deduct Income Tax and employee National Insurance from the payment as
                if the electrician were an employee. The fee-payer must also pay employer National
                Insurance. This effectively removes most of the tax advantages of operating through
                a limited company for that particular contract.
              </p>

              <p>
                The key factors that HMRC and the courts consider when assessing IR35 status are
                commonly referred to as the &ldquo;tests of employment&rdquo;. The three most
                important are: <strong>control</strong> (does the client control how, when, and
                where you work, or do you have genuine autonomy?), <strong>substitution</strong> (do
                you have a genuine right to send a suitably qualified substitute to perform the work
                in your place?), and <strong>mutuality of obligation</strong> (is the client obliged
                to offer you work, and are you obliged to accept it, creating an ongoing employment
                relationship?). If the answers suggest an employment relationship, the contract is
                likely inside IR35. Other relevant factors include whether you provide your own
                equipment, whether you carry financial risk, whether you can profit from sound
                management, and whether you are &ldquo;part and parcel&rdquo; of the client&rsquo;s
                organisation.
              </p>

              <p>
                For small clients (those meeting at least two of: annual turnover not more than
                &pound;10.2 million, balance sheet total not more than &pound;5.1 million, not more
                than 50 employees), the responsibility for determining IR35 status remains with the
                worker&rsquo;s PSC. This means that electricians working through their own limited
                companies for small domestic clients, small electrical contractors, or other small
                businesses must self-assess their IR35 status. HMRC provides the Check Employment
                Status for Tax (CEST) tool to help with this determination, although the tool has
                been criticised for being overly simplistic and sometimes giving inconclusive
                results. Professional advice from a specialist tax adviser or employment status
                specialist is recommended for any ambiguous situation.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  IR35 &mdash; The Practical Impact for Electricians
                </p>
                <p className="text-base text-white leading-relaxed">
                  If you work through a personal service company and your contracts are consistently
                  determined to be inside IR35, the limited company structure provides very little
                  tax advantage. You are effectively paying employed levels of tax and NI, plus the
                  additional costs of running a company (accountancy, filing fees, administration).
                  In this scenario, you may be better off working as a PAYE employee or an umbrella
                  company worker. The limited company structure makes financial sense only when you
                  have genuine autonomy, work for multiple clients, and your contracts are genuinely
                  outside IR35.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Section Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">07</span>
            Section Summary
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                This section has established the four main income structures available to
                electricians and the key differences between them. The points to carry forward are:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>PAYE employment</strong> provides the most comprehensive package of
                    rights and benefits (sick pay, holiday pay, pension, insurances, employment
                    rights) but the lowest headline rates. JIB-employed packages can be worth
                    25&ndash;35% more than the basic hourly rate.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Self-employed sole trader</strong> offers higher headline rates and
                    greater flexibility but requires self-funding all benefits, managing all
                    administration, and accepting unlimited personal liability for business debts.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>CIS subcontractors</strong> have 20% (registered), 30% (unregistered),
                    or 0% (gross payment) deducted from payments. These are advance tax payments,
                    not final tax &mdash; always file a Self Assessment return to claim any
                    overpayment.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Limited company directors</strong> can reduce their tax burden through
                    the salary/dividend split, but face higher administrative costs and IR35 risk.
                    Incorporation typically becomes beneficial at profits above
                    &pound;40,000&ndash;&pound;50,000.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>IR35</strong> determines whether limited company contractors are taxed
                    as employees. The key tests are control, substitution, and mutuality of
                    obligation. If your contracts are inside IR35, the limited company structure
                    offers minimal tax advantage.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>There is no universally &ldquo;best&rdquo; structure.</strong> The right
                    choice depends on your income level, risk appetite, personal circumstances, and
                    the nature of your work. Always take professional advice before changing your
                    employment structure.
                  </span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Next:</strong> In Section 2, we will examine the
                  UK tax system in detail &mdash; Income Tax bands, National Insurance classes,
                  allowable expenses, capital allowances, and Making Tax Digital. Understanding how
                  tax works is the foundation of financial competence for every tradesperson.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz title="Section 1 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../pf-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../pf-module-1-section-2">
              Next: Tax Basics for Tradespeople
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
