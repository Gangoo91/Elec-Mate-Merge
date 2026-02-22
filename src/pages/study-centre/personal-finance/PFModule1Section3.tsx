import { ArrowLeft, TrendingDown, CheckCircle } from 'lucide-react';
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
    id: 'pf-1-3-check1',
    question:
      'A self-employed electrician charges &pound;280 per day and works 220 days per year, giving a gross income of &pound;61,600. After deducting &pound;12,000 in business expenses, their taxable profit is &pound;49,600. An employed Approved Electrician on JIB rates earns approximately &pound;44,000 gross per year. Without considering benefits, which appears to earn more?',
    options: [
      'The self-employed electrician, because &pound;49,600 is higher than &pound;44,000',
      'The employed electrician, because they pay less tax',
      'They are roughly equal when you deduct the self-employed person&rsquo;s Income Tax and National Insurance',
      'It is impossible to compare without knowing the day rate',
    ],
    correctIndex: 0,
    explanation:
      'On the surface, the self-employed electrician&rsquo;s taxable profit of &pound;49,600 is higher than the employed electrician&rsquo;s &pound;44,000 gross salary. However, this comparison is deeply misleading because it ignores the employed electrician&rsquo;s benefits package (pension contributions, sick pay, holiday pay, death-in-service, insurances) which can add 25&ndash;35% to the total package value, and the self-employed electrician&rsquo;s additional costs that are not captured in the &pound;12,000 expenses figure (holiday provision, sick pay provision, pension contributions, admin time). The correct comparison method is covered in detail later in this section.',
  },
  {
    id: 'pf-1-3-check2',
    question:
      'An employed electrician receives 28 days of paid annual leave per year. A self-employed electrician does not receive paid leave. If the self-employed electrician takes the same 28 days off, approximately how much does this &ldquo;cost&rdquo; them in lost earnings at &pound;280/day?',
    options: ['&pound;2,800', '&pound;5,600', '&pound;7,840', '&pound;11,200'],
    correctIndex: 2,
    explanation:
      '28 days of unpaid leave at &pound;280 per day = &pound;7,840 in lost gross income. This is one of the most significant hidden costs of self-employment. The employed electrician receives &pound;7,840 worth of holiday pay as a benefit that is invisible on their payslip &mdash; they receive the same monthly salary whether they are working or on holiday. The self-employed electrician must either earn this amount during their working days (by charging higher rates) or accept a lower annual income. When comparing employed and self-employed earnings, this &pound;7,840 must be added to the employed package for a fair comparison, or deducted from the self-employed income.',
  },
  {
    id: 'pf-1-3-check3',
    question:
      'When comparing a self-employed day rate against an employed salary, which of the following costs should be included in the self-employed person&rsquo;s total cost calculation but are NOT incurred by the employed person?',
    options: [
      'Income Tax and National Insurance only',
      'Holiday provision, sick pay provision, pension contributions, business insurance, van costs, admin time, and accountancy fees',
      'The cost of travelling to the workplace',
      'The cost of personal clothing',
    ],
    correctIndex: 1,
    explanation:
      'When making a like-for-like comparison, all costs borne by the self-employed person that are provided by the employer for the employed person must be included. These include: holiday provision (the equivalent of paid annual leave), sick pay provision (Statutory Sick Pay at minimum, often enhanced), pension contributions (minimum 3% employer contribution), business insurances (public liability, professional indemnity, employer&rsquo;s liability), van and travel costs (if employer-provided), administration time (quoting, invoicing, bookkeeping &mdash; unpaid hours), and accountancy fees. Income Tax and NI are incurred by both employed and self-employed individuals (at different rates) so are part of the comparison but not unique to self-employment.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'Is self-employment always financially worse than PAYE employment?',
    answer:
      'No, absolutely not. Self-employment can be financially superior to PAYE employment, but only when the day rate is genuinely high enough to cover all the hidden costs and still leave a surplus. The issue is not that self-employment is inherently worse, but that many electricians compare headline figures without accounting for the true costs. A self-employed electrician charging &pound;350&ndash;&pound;400 per day with steady work, good expense management, and disciplined financial habits can earn significantly more than a JIB-employed Approved Electrician. The critical skill is making the comparison accurately so you can make informed decisions about which structure is right for you at any given stage of your career.',
  },
  {
    question: 'How do I calculate whether a specific day rate is worth leaving employment for?',
    answer:
      'Start by calculating the total value of your current employment package: gross salary + employer pension contributions + employer NI (which funds your benefits) + estimated value of paid holidays + estimated value of sick pay provision + any other benefits (van, fuel card, training, tools). Then calculate the minimum day rate you would need to match this: divide the total package value by your likely working days (typically 200&ndash;220 after holidays), add your anticipated business expenses per day, add a provision for admin time (typically 10&ndash;15% of working time), and add a margin for risk (self-employment is inherently less stable). If your prospective day rate exceeds this figure, self-employment may be financially advantageous. If not, you may be better off staying employed &mdash; at least until you can command a higher rate.',
  },
  {
    question: 'What about admin time &mdash; how much does that really cost?',
    answer:
      'Admin time is one of the most overlooked costs of self-employment. As a self-employed electrician, you must spend time on: quoting and estimating (reviewing job specifications, calculating materials, writing quotations), invoicing and credit control (issuing invoices, chasing payments, reconciling accounts), bookkeeping and record-keeping (tracking expenses, categorising receipts, maintaining mileage logs), marketing and business development (maintaining a website, responding to enquiries, networking), compliance (certification body audits, ECS card renewal, CPD logging), and tax administration (quarterly VAT returns if registered, Self Assessment preparation, liaising with your accountant). Realistically, this represents 0.5&ndash;1 full day per week, or approximately 25&ndash;50 days per year. At a notional value of &pound;280/day, that is &pound;7,000&ndash;&pound;14,000 of productive time that you are not being paid for. An employed electrician spends zero hours on these tasks.',
  },
  {
    question: 'Should I factor mortgage affordability into the employed vs self-employed decision?',
    answer:
      'Yes, and this is an often-overlooked practical consideration. Mortgage lenders generally treat employed and self-employed income very differently. For PAYE employees, most lenders will offer 4&ndash;4.5 times the gross annual salary, verified with a P60 and recent payslips. For self-employed applicants, lenders typically require at least two years of Self Assessment tax returns (some require three) and base their lending calculation on the average of the last two or three years&rsquo; net profit (or taxable income for limited company directors). This means a newly self-employed electrician may find it significantly harder to obtain a mortgage, even if their income is higher than it was when employed. If you are planning to buy a home or remortgage in the near future, this is a significant factor in the timing of any move to self-employment.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions (Quiz — correctAnswer, 0-indexed)                   */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question: 'The "day rate illusion" refers to:',
    options: [
      'The fact that self-employed day rates are always lower than employed hourly rates',
      'The tendency to compare self-employed gross day rates against employed gross salaries without accounting for the hidden costs of self-employment',
      'The illusion that employed workers earn more because of their benefits',
      'The fact that day rates fluctuate throughout the year',
    ],
    correctAnswer: 1,
    explanation:
      'The "day rate illusion" describes the common error of comparing a self-employed gross day rate (e.g. &pound;280/day) directly against an employed gross salary (e.g. &pound;44,000/year) without accounting for the substantial hidden costs of self-employment. These hidden costs include: no paid holidays, no sick pay, no employer pension contributions, business insurances, van costs, admin time, accountancy fees, and the higher financial risk of self-employment. When these costs are properly accounted for, the apparent advantage of the higher day rate is often significantly reduced or even reversed.',
  },
  {
    id: 2,
    question:
      'A JIB Approved Electrician earns &pound;44,000 gross per year. With the full JIB benefits package (pension, insurances, holidays, allowances), the total package is worth approximately:',
    options: [
      '&pound;44,000 &mdash; the benefits are worth nothing',
      '&pound;46,000&ndash;&pound;48,000',
      '&pound;53,000&ndash;&pound;58,000',
      '&pound;70,000&ndash;&pound;80,000',
    ],
    correctAnswer: 2,
    explanation:
      'The full JIB employment package typically adds 25&ndash;35% to the gross salary. For an Approved Electrician on &pound;44,000 gross, this brings the total package value to approximately &pound;53,000&ndash;&pound;58,000. The additional value comes from: employer NI contributions (&pound;4,200), EPID pension contributions (&pound;1,500&ndash;&pound;2,500), death-in-service benefit (value of equivalent insurance premium), income protection insurance (&pound;500&ndash;&pound;1,000 equivalent premium), paid annual leave (&pound;4,700 at the daily rate), travel allowances, and tool allowances. This is the figure that a self-employed day rate must exceed, after all business costs, to represent a genuine financial improvement.',
  },
  {
    id: 3,
    question:
      'A self-employed electrician charges &pound;280/day, works 220 days, has &pound;12,000 in business expenses, and pays &pound;8,000 in tax and NI. Their take-home pay is approximately:',
    options: ['&pound;61,600', '&pound;49,600', '&pound;41,600', '&pound;37,600'],
    correctAnswer: 2,
    explanation:
      'The calculation is: Gross income (&pound;280 x 220 days = &pound;61,600) minus business expenses (&pound;12,000) = taxable profit of &pound;49,600. Minus Income Tax and NI (&pound;8,000) = &pound;41,600 cash in hand. However, this figure still does not represent true disposable income because it has not yet accounted for: holiday provision (28 days x &pound;280 = &pound;7,840 of lost earning capacity), pension contributions (if the electrician wants to match the employer pension they would receive in employment), or the value of admin time spent on unpaid business tasks.',
  },
  {
    id: 4,
    question:
      'Which of the following is NOT a hidden cost of self-employment that should be factored into a like-for-like comparison with employment?',
    options: [
      'Holiday pay provision &mdash; the lost earning capacity when taking unpaid leave',
      'Income Tax &mdash; which is paid by both employed and self-employed individuals',
      'Employer pension contributions &mdash; which the self-employed must self-fund',
      'Professional indemnity insurance &mdash; which the employer provides in PAYE employment',
    ],
    correctAnswer: 1,
    explanation:
      'Income Tax is not a hidden cost of self-employment because it is paid by both employed and self-employed individuals (albeit at different effective rates). It is part of the comparison, not unique to one side. Holiday pay provision, employer pension contributions, and professional indemnity insurance are all genuine hidden costs because they are provided by the employer in a PAYE arrangement but must be self-funded by the self-employed individual. The like-for-like comparison should include all costs that are borne by one party but not the other.',
  },
  {
    id: 5,
    question:
      'An employed electrician earns &pound;44,000 gross. After PAYE tax (&pound;6,286), employee NI (&pound;2,594), and a 5% pension contribution (&pound;2,200), their monthly take-home pay is approximately:',
    options: ['&pound;3,667', '&pound;2,743', '&pound;2,200', '&pound;3,100'],
    correctAnswer: 1,
    explanation:
      'Gross salary: &pound;44,000. Minus PAYE Income Tax: &pound;6,286. Minus employee NI: &pound;2,594. Minus employee pension contribution (5%): &pound;2,200. Net annual take-home: &pound;44,000 - &pound;6,286 - &pound;2,594 - &pound;2,200 = &pound;32,920. Monthly: &pound;32,920 / 12 = &pound;2,743. This is the amount that actually arrives in the employed electrician&rsquo;s bank account each month. Note that the employer is also paying an additional 3% pension contribution (&pound;1,320) and employer NI (&pound;4,200) on top of this &mdash; money that benefits the employee but does not appear on their payslip.',
  },
  {
    id: 6,
    question:
      'A self-employed electrician working 220 days per year at &pound;280/day wants to take 28 days of annual leave, save 5% of earnings for a pension, and set aside 5 days for sickness. The effective number of productive earning days is:',
    options: ['220 days', '192 days', '187 days', '200 days'],
    correctAnswer: 2,
    explanation:
      '220 available working days minus 28 days annual leave minus 5 days sickness provision = 187 productive earning days. At &pound;280/day, this generates &pound;52,360 in gross income (not &pound;61,600 based on 220 days). The pension contribution (5% of &pound;52,360 = &pound;2,618) further reduces the available income. This is a more realistic picture of self-employed earning capacity. The employed electrician, by contrast, earns their &pound;44,000 regardless of holidays and sick days, and their pension is partially funded by the employer.',
  },
  {
    id: 7,
    question:
      'When asked "Is &pound;250/day self-employed better than &pound;45,000 employed?", the correct approach is:',
    options: [
      'Compare the annual totals: &pound;250 x 220 = &pound;55,000 vs &pound;45,000, so self-employment wins',
      'Calculate the self-employed person&rsquo;s take-home after ALL costs (business expenses, tax, NI, holiday provision, pension, insurances, admin time) and compare it against the employed person&rsquo;s total package (salary + employer pension + benefits)',
      'Compare the daily rates: &pound;250 vs &pound;45,000/260 = &pound;173, so self-employment wins',
      'It is impossible to make a meaningful comparison',
    ],
    correctAnswer: 1,
    explanation:
      'The only valid comparison is a total cost / total benefit analysis. For the self-employed person, this means deducting ALL costs from the gross day rate income: business expenses, Income Tax, National Insurance, holiday pay provision, sick pay provision, pension contributions, business insurances, admin time, and accountancy fees. For the employed person, this means adding the employer-funded benefits to the gross salary: employer pension contributions, paid leave, sick pay, death-in-service, income protection, and any other employer-provided benefits. Only when both sides are expressed as total packages can a meaningful comparison be made.',
  },
  {
    id: 8,
    question:
      'An electrician is considering going self-employed. They currently earn &pound;44,000 employed with a total package worth &pound;55,000. What is the MINIMUM self-employed day rate they should charge to be financially equivalent, assuming 200 productive working days and &pound;12,000 in annual business expenses?',
    options: [
      '&pound;220/day (&pound;44,000 / 200 days)',
      '&pound;275/day (&pound;55,000 / 200 days)',
      '&pound;335/day ((&pound;55,000 + &pound;12,000) / 200 days)',
      '&pound;375/day ((&pound;55,000 + &pound;12,000 + risk margin) / 200 days)',
    ],
    correctAnswer: 2,
    explanation:
      'To match the &pound;55,000 total package, the self-employed income must cover: the &pound;55,000 equivalent value PLUS the &pound;12,000 in business expenses that the employed person does not pay. Total required gross income: &pound;67,000. Divided by 200 productive days: &pound;335/day. This is the break-even figure &mdash; the point at which self-employment matches employment financially. To be genuinely better off, the rate would need to exceed this, ideally with a risk margin on top (option D at &pound;375/day would provide an approximate 12% risk margin). This calculation demonstrates why a &pound;250/day rate, which looks much higher than the employed equivalent, may actually represent a pay cut.',
  },
];

export default function PFModule1Section3() {
  useSEO({
    title: 'Understanding Your True Take-Home Pay | Personal Finance Module 1.3',
    description:
      'The day rate illusion, employed vs self-employed worked examples, hidden costs of self-employment, and a like-for-like comparison framework.',
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
            <TrendingDown className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 1 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Understanding Your True Take-Home Pay
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            The day rate illusion, employed vs self-employed worked examples, hidden costs of
            self-employment, and a like-for-like comparison framework
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Day rates are not take-home pay</strong> &mdash; the gap between what you
                charge and what you keep can be 40&ndash;50% or more
              </li>
              <li>
                <strong>Employed packages</strong> include benefits worth 25&ndash;35% on top of the
                gross salary that most people ignore
              </li>
              <li>
                <strong>Self-employment</strong> has extensive hidden costs: no holiday pay, no sick
                pay, no pension match, business insurances, and unpaid admin time
              </li>
              <li>
                <strong>The only valid comparison</strong> is total package vs total package, not
                headline rate vs headline rate
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Career decisions:</strong> Many electricians leave well-paid employed
                positions for self-employment without realising they are taking a pay cut
              </li>
              <li>
                <strong>Rate setting:</strong> Understanding your true costs allows you to set day
                rates that actually make self-employment worthwhile
              </li>
              <li>
                <strong>Financial planning:</strong> Knowing your true take-home prevents
                overspending based on unrealistic income assumptions
              </li>
              <li>
                <strong>Negotiation:</strong> Armed with these numbers, you can negotiate
                confidently whether seeking employment or setting day rates
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'Explain the "day rate illusion" and why comparing gross day rates against gross salaries is misleading',
              'Calculate the true take-home pay for an employed electrician including all deductions',
              'Calculate the true take-home pay for a self-employed electrician after all business costs, tax, NI, and provisions',
              'Identify and quantify the hidden costs of self-employment that are not captured in simple day rate calculations',
              'Build a like-for-like comparison between employed and self-employed income using the total package framework',
              'Determine the minimum day rate required to match a given employed salary plus benefits',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: The Day Rate Illusion */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            The Day Rate Illusion
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Walk onto any construction site in the UK and you will hear electricians comparing
                day rates. &ldquo;I&rsquo;m on &pound;280 a day.&rdquo; &ldquo;I&rsquo;m getting
                &pound;300 on this job.&rdquo; &ldquo;The last site was only &pound;250 &mdash; not
                worth getting out of bed for.&rdquo; These conversations treat the day rate as if it
                were take-home pay. It is not. Not even close. The gap between what a self-employed
                electrician charges per day and what actually ends up in their bank account as
                spendable income is typically 40&ndash;50% or more. This gap is what we call the
                &ldquo;day rate illusion&rdquo; &mdash; the persistent and widespread
                misunderstanding that a higher day rate automatically means more money in your
                pocket.
              </p>

              <p>
                The illusion works like this. An employed electrician on JIB rates earns
                approximately &pound;21.27 per hour, which over an eight-hour day is &pound;170. A
                self-employed electrician charges &pound;280 per day. On the surface, the
                self-employed electrician is earning &pound;110 more per day &mdash; a massive 65%
                premium. Annualised over 220 working days, the self-employed electrician grosses
                &pound;61,600 versus the employed electrician&rsquo;s &pound;44,000 (based on a
                standard 39-hour week over 52 weeks). The difference &mdash; &pound;17,600 per year
                &mdash; looks like a compelling reason to go self-employed. But this headline
                comparison is almost entirely meaningless because it ignores everything that happens
                between the gross figure and the spendable income figure.
              </p>

              <p>
                The employed electrician&rsquo;s &pound;44,000 gross salary understates their total
                compensation because it excludes the employer-funded benefits: pension
                contributions, National Insurance (which funds their entitlement to State Pension,
                sick pay, and other benefits), paid annual leave, sick pay, death-in-service cover,
                income protection insurance, and potentially a van, fuel card, and tool allowance.
                The self-employed electrician&rsquo;s &pound;61,600 gross income overstates their
                spendable income because it includes money that must be spent on business costs,
                tax, National Insurance, and self-funded provisions that replicate the benefits they
                would receive in employment. The true comparison is not &pound;61,600 vs
                &pound;44,000. It is closer to &pound;34,000 vs &pound;33,000 &mdash; and when the
                employed benefits package is properly valued, the employed electrician may actually
                be better off.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  The Day Rate Illusion in Numbers
                </p>
                <p className="text-base text-white leading-relaxed">
                  <strong>&pound;280/day sounds like &pound;61,600/year. It is not.</strong> After
                  business expenses (&pound;12,000), Income Tax (&pound;7,540), Class 4 NI
                  (&pound;2,246), holiday provision (&pound;7,840), pension contributions
                  (&pound;2,500), and accountancy fees (&pound;800), the actual spendable income is
                  closer to &pound;28,674. That is &pound;110 per working day &mdash; not
                  &pound;280. The employed electrician on &pound;44,000 takes home approximately
                  &pound;32,920 after tax, NI, and pension &mdash; and has 28 days of paid leave,
                  sick pay, and a funded pension on top.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Employed Worked Example */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            Employed Worked Example &mdash; JIB Approved Electrician
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Let us work through the numbers for a JIB Approved Electrician in detail. This
                example uses the current JIB National Working Rule rate and standard tax and NI
                figures for 2024/25. The purpose is not just to calculate a number but to show you
                the methodology so you can apply it to your own specific circumstances.
              </p>

              <p>
                <strong>Starting point:</strong> JIB Approved Electrician rate of &pound;21.27 per
                hour, working a standard 39-hour week (7.8 hours per day, Monday to Friday). Weekly
                gross pay: &pound;21.27 x 39 = &pound;829.53. Annual gross pay (52 weeks):
                &pound;829.53 x 52 = &pound;43,135.56. We will round this to &pound;43,136 for
                simplicity. The electrician receives this gross pay for all 52 weeks of the year,
                including the weeks they are on annual leave &mdash; this is a critical difference
                from self-employment.
              </p>

              <p>
                <strong>Income Tax:</strong> Taxable income = &pound;43,136 - &pound;12,570
                (Personal Allowance) = &pound;30,566. All of this falls within the basic rate band,
                so Income Tax = &pound;30,566 x 20% = &pound;6,113.20. <strong>Employee NI:</strong>{' '}
                8% on earnings between &pound;12,570 and &pound;50,270 = 8% x &pound;30,566 =
                &pound;2,445.28. <strong>Pension (employee contribution 5%):</strong> &pound;43,136
                x 5% = &pound;2,156.80. This is the employee&rsquo;s own contribution; the employer
                also pays approximately 3&ndash;5% through the EPID scheme.
              </p>

              <p>
                <strong>Net take-home pay:</strong> &pound;43,136 - &pound;6,113 - &pound;2,445 -
                &pound;2,157 = <strong>&pound;32,421</strong> per year, or approximately
                <strong> &pound;2,702 per month</strong>. This is the amount that arrives in the
                electrician&rsquo;s bank account. They do not need to set anything aside for holiday
                pay (they are paid during holidays), sick pay (Statutory Sick Pay is provided by the
                employer), pension (the employer makes additional contributions on their behalf),
                business insurance (covered by the employer), or accountancy fees (no Self
                Assessment required if this is their only income).
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Employed Electrician &mdash; Full Package Breakdown
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Gross salary:</strong> &pound;43,136
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Employer pension (EPID, ~4%):</strong> +&pound;1,725
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Employer NI (13.8%):</strong> +&pound;4,220 (funds benefits and State
                      Pension record)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Death-in-service &amp; income protection:</strong> +&pound;800
                      (estimated insurance premium equivalent)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Paid annual leave (28 days):</strong> +&pound;4,764 (28 x
                      &pound;170.16/day)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Travel allowances (estimated):</strong> +&pound;1,500
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong>Total package value:</strong> approximately{' '}
                      <strong>&pound;56,145</strong>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Self-Employed Worked Example */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Self-Employed Worked Example &mdash; &pound;280/Day Electrician
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Now let us work through the same calculation for a self-employed electrician
                charging &pound;280 per day. We will use realistic figures for business expenses and
                assume the electrician works 220 days per year (260 weekdays minus 28 days annual
                leave minus 8 bank holidays minus 4 days sickness/downtime). This is already a more
                realistic assumption than the 260 days that some calculations use, because
                self-employed people do get ill, do need holidays, and do have quiet periods.
              </p>

              <p>
                <strong>Gross income:</strong> &pound;280 x 220 working days = &pound;61,600.
                However, we need to immediately recognise that 28 of the original 260 weekdays are
                annual leave with zero income. The employed electrician earns their salary during
                leave; the self-employed electrician earns nothing. The &ldquo;cost&rdquo; of
                holidays is 28 x &pound;280 = &pound;7,840 in foregone income.
              </p>

              <p>
                <strong>Business expenses:</strong> Van lease (&pound;3,600/year), fuel
                (&pound;3,000/year), van insurance (&pound;1,200/year), public liability insurance
                (&pound;350/year), professional indemnity insurance (&pound;250/year), NICEIC or
                NAPIT membership (&pound;800/year), test instrument calibration (&pound;200/year),
                mobile phone (business proportion, &pound;360/year), tools and consumables
                (&pound;500/year), PPE (&pound;200/year), accounting fees (&pound;800/year), ECS
                card (&pound;40/year), advertising and website (&pound;300/year), stationery and
                printing (&pound;200/year). Total: approximately <strong>&pound;11,800</strong>. We
                will round to &pound;12,000 to account for incidental costs.
              </p>

              <p>
                <strong>Taxable profit:</strong> &pound;61,600 - &pound;12,000 = &pound;49,600.
                <strong> Income Tax:</strong> &pound;49,600 - &pound;12,570 (Personal Allowance) =
                &pound;37,030 taxable. All within the basic rate band: &pound;37,030 x 20% =
                &pound;7,406. <strong>Class 4 NI:</strong> 6% on &pound;37,030 = &pound;2,221.80.
                <strong> Total tax and NI:</strong> &pound;9,628.{' '}
                <strong>Net income after tax and expenses:</strong> &pound;61,600 - &pound;12,000 -
                &pound;9,628 =<strong> &pound;39,972</strong>.
              </p>

              <p>
                But we are not done. To make this a fair comparison, we need to deduct the
                self-funded provisions that the employed electrician receives as benefits.
                <strong> Pension (5% employee + 4% employer equivalent):</strong> If the
                self-employed electrician wants to match the total pension contribution they would
                receive in JIB employment (approximately 9% of salary), they need to contribute
                approximately &pound;3,600/year from their own pocket.{' '}
                <strong>Income protection insurance:</strong> approximately &pound;500/year to
                self-fund the equivalent of the JIB scheme. <strong>Administration time:</strong>{' '}
                Conservatively 0.5 days per week spent on quoting, invoicing, bookkeeping, and
                chasing payments = 26 days x &pound;280 = &pound;7,280 in opportunity cost (time
                that could have been spent earning). This is not a cash cost but it is a real cost
                to your earning capacity.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Self-Employed Electrician &mdash; True Take-Home Breakdown
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Gross income (220 days x &pound;280):</strong> &pound;61,600
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Business expenses:</strong> -&pound;12,000
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Income Tax:</strong> -&pound;7,406
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Class 4 NI:</strong> -&pound;2,222
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Pension (self-funded 9%):</strong> -&pound;3,600
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Income protection insurance:</strong> -&pound;500
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Accountancy (already in expenses):</strong> &pound;0 (counted above)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong>Actual spendable income:</strong> approximately{' '}
                      <strong>&pound;35,872</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong>Monthly:</strong> approximately <strong>&pound;2,989</strong>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Hidden Costs of Self-Employment */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            The Hidden Costs of Self-Employment
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The worked examples above capture the quantifiable costs, but there are additional
                hidden costs of self-employment that are harder to put a number on but are
                nonetheless real. These costs affect your quality of life, your long-term financial
                security, and your ability to weather difficult periods. Ignoring them does not make
                them disappear &mdash; it just means they hit you unexpectedly when you can least
                afford it.
              </p>

              <p>
                <strong>No holiday pay.</strong> This is the single biggest hidden cost and the
                easiest to quantify. An employed electrician on &pound;43,136 receives 28 days of
                paid annual leave worth approximately &pound;4,764. A self-employed electrician
                taking the same 28 days off loses &pound;7,840 at a &pound;280/day rate. That is
                &pound;7,840 of gross income that simply does not exist. Many self-employed
                electricians respond to this by not taking holidays &mdash; which is a false economy
                that leads to burnout, reduced productivity, strained relationships, and ultimately
                worse financial outcomes. You must plan for and cost in your holidays as a business
                expense in everything but name.
              </p>

              <p>
                <strong>No sick pay.</strong> Statutory Sick Pay for employees is &pound;109.40 per
                week for up to 28 weeks. Many JIB employers offer enhanced sick pay beyond this.
                Self-employed electricians have no entitlement to SSP. If you break your wrist and
                cannot work for six weeks, your income drops to zero for that period (unless you
                have income protection insurance). At &pound;280/day, six weeks off is &pound;8,400
                in lost income. Even a five-day bout of flu costs &pound;1,400. Over a career, the
                average person takes 4&ndash;5 sick days per year &mdash; at &pound;280/day, that is
                &pound;1,120&ndash;&pound;1,400 per year in expected lost income.
              </p>

              <p>
                <strong>No employer pension match.</strong> Under auto-enrolment, employers must
                contribute at least 3% of qualifying earnings to a workplace pension. For a JIB
                Approved Electrician, the EPID pension contribution is typically higher. This is
                free money &mdash; the employer is paying into your retirement fund on top of your
                salary. As a self-employed person, every penny of your pension comes from your own
                pocket. If you want the same total pension contribution (employee + employer) as you
                would receive in employment, you need to fund the entire amount yourself.
              </p>

              <p>
                <strong>Administration time.</strong> This is the cost that self-employed
                electricians most consistently underestimate. Quoting jobs requires reviewing
                specifications, calculating materials, writing detailed quotations, and following up
                with clients. Invoicing and credit control requires issuing invoices, tracking
                payments, and chasing late payers (a common problem in the trade). Bookkeeping
                requires categorising every receipt, maintaining a mileage log, and reconciling bank
                statements. Tax compliance requires preparing for Self Assessment, liaising with
                your accountant, and (from 2026/27) submitting quarterly MTD updates. Marketing and
                business development requires maintaining your online presence, responding to
                enquiries, and networking. Conservatively, this adds up to 0.5&ndash;1 day per week
                of unpaid work. That is 26&ndash;52 days per year where you are working but not
                earning.
              </p>

              <p>
                <strong>Income volatility and feast-or-famine cycles.</strong> Employed electricians
                receive the same salary every month regardless of how busy the company is. Self-
                employed electricians experience significant income fluctuations: some months are
                packed with work, others are quiet. January and February are traditionally slow for
                domestic work; summer is busy. Commercial work is tied to project timelines that are
                outside your control. A cancelled project, a delayed start, or a client who goes
                quiet can leave a hole in your diary and your income. This volatility creates
                financial stress and makes budgeting difficult, especially for fixed costs like
                mortgage payments, van leases, and household bills that do not reduce during quiet
                periods.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  The Real Question to Ask Yourself
                </p>
                <p className="text-base text-white leading-relaxed">
                  The question is not &ldquo;Do I earn more as self-employed?&rdquo; The question
                  is:{' '}
                  <strong>
                    &ldquo;Does my self-employed income, after ALL costs, provisions, and risk
                    adjustments, exceed the total value of the employed package I would
                    receive?&rdquo;
                  </strong>{' '}
                  If the answer is yes by a meaningful margin (&pound;5,000+ per year),
                  self-employment is financially worthwhile. If the answer is no, or the margin is
                  slim, you are taking on significant additional risk, responsibility, and
                  administrative burden for no meaningful financial gain.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Like-for-Like Comparison Framework */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            The Like-for-Like Comparison Framework
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                To make a genuine comparison between employed and self-employed income, you need a
                structured framework that accounts for every relevant factor. The framework works by
                expressing both options as total annual packages, with all costs and benefits
                included. Here is how to apply it to the most common question electricians ask:
                <strong>
                  {' '}
                  &ldquo;Is &pound;250/day self-employed better than &pound;45,000 employed?&rdquo;
                </strong>
              </p>

              <p>
                <strong>Step 1: Calculate the employed total package.</strong> Start with the gross
                salary (&pound;45,000). Add employer pension contributions (minimum 3% =
                &pound;1,350; JIB might be 4&ndash;5% = &pound;1,800&ndash;&pound;2,250). Add the
                value of paid annual leave (28 days of salary you receive without working = 28/260 x
                &pound;45,000 = &pound;4,846). Add employer NI contribution (&pound;45,000 -
                &pound;9,100 = &pound;35,900 x 13.8% = &pound;4,954 &mdash; this funds your State
                Pension record and benefit entitlements). Add insurance benefits (death-in-service,
                income protection &mdash; estimated &pound;500&ndash;&pound;1,000). Add any other
                benefits (van, fuel card, tools &mdash; if applicable). Total employed package:
                approximately <strong>&pound;56,000&ndash;&pound;58,000</strong>.
              </p>

              <p>
                <strong>Step 2: Calculate the self-employed total cost.</strong> Start with the
                target day rate (&pound;250/day). Multiply by productive working days (approximately
                200 after holidays, sickness, and quiet periods) = &pound;50,000 gross income.
                Deduct business expenses (&pound;12,000 as calculated earlier) = &pound;38,000
                taxable profit. Deduct Income Tax (&pound;38,000 - &pound;12,570 = &pound;25,430 x
                20% = &pound;5,086). Deduct Class 4 NI (&pound;25,430 x 6% = &pound;1,525.80). This
                gives a net income of approximately &pound;31,388. Now deduct self-funded
                provisions: pension (&pound;3,000), income protection (&pound;500). Spendable
                income: approximately <strong>&pound;27,888</strong>.
              </p>

              <p>
                <strong>Step 3: Compare the two.</strong> The employed electrician takes home
                approximately &pound;32,920 in cash (after tax, NI, and pension deductions) and
                receives an additional &pound;13,000&ndash;&pound;15,000 in employer-funded
                benefits. The self-employed electrician takes home approximately &pound;27,888 in
                cash and has no additional benefits beyond what they have self-funded. The employed
                package is clearly superior at a &pound;250/day rate. The self-employed electrician
                would need to charge approximately <strong>&pound;335&ndash;&pound;350/day</strong>{' '}
                to match the employed package on a like-for-like basis.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Quick Formula: Minimum Day Rate to Match Employment
                </p>
                <p className="text-sm text-white leading-relaxed mb-3">
                  Use this formula to calculate the approximate minimum self-employed day rate
                  needed to match an employed salary:
                </p>
                <p className="text-base text-white font-medium mb-3">
                  Minimum day rate = (Employed total package + Annual business expenses) /
                  Productive working days
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Example:</strong> (&pound;56,000 package + &pound;12,000 expenses) /
                      200 days = <strong>&pound;340/day break-even</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>With 10% risk margin:</strong> &pound;340 x 1.10 =
                      <strong> &pound;374/day</strong> to be genuinely better off
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Key insight:</strong> A &pound;250/day rate against a &pound;45,000
                      employed salary is almost certainly a pay cut, not a pay rise
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06: Section Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            Section Summary
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                This section has dismantled the day rate illusion and provided the tools to make
                accurate financial comparisons between employed and self-employed income. The key
                takeaways are:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Gross day rates are not take-home pay.</strong> The gap between your day
                    rate and your spendable income is typically 40&ndash;50% or more once all costs
                    are properly accounted for.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Employed packages include significant hidden value.</strong> Pension,
                    holiday pay, sick pay, insurances, and employer NI can add 25&ndash;35% to the
                    gross salary figure.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Self-employment has extensive hidden costs.</strong> No holiday pay, no
                    sick pay, no pension match, business insurances, admin time, and income
                    volatility all reduce the true value of self-employed income.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Use the total package comparison framework.</strong> Express both
                    options as complete annual packages with all costs and benefits included before
                    comparing them.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>To match a &pound;45,000 employed package,</strong> you need
                    approximately &pound;335&ndash;&pound;375/day self-employed. A &pound;250/day
                    rate is almost certainly a pay cut, not a pay rise.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Self-employment CAN be financially superior</strong> &mdash; but only at
                    genuinely high day rates with consistent work and disciplined financial
                    management.
                  </span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Next:</strong> In Section 4, we will move from
                  the numbers to the mindset. We will explore your financial health score, common
                  money mistakes made by tradespeople, the feast-or-famine psychology, and how to
                  set your financial baseline as the starting point for building long-term financial
                  wellbeing.
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
        <Quiz title="Section 3 Knowledge Check" questions={quizQuestions} />

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
            <Link to="../pf-module-1-section-4">
              Next: Financial Health Check &amp; Money Mindset
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
