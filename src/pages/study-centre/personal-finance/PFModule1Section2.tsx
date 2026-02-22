import { ArrowLeft, Receipt, CheckCircle } from 'lucide-react';
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
    id: 'pf-1-2-check1',
    question:
      'A self-employed electrician earns &pound;45,000 in taxable profit after allowable expenses. How much Income Tax do they owe for the 2024/25 tax year? (Assume the standard Personal Allowance of &pound;12,570 applies.)',
    options: [
      '&pound;6,486 &mdash; 20% of the full &pound;45,000',
      '&pound;9,000 &mdash; 20% on the amount above the Personal Allowance',
      '&pound;6,486 &mdash; 20% on the taxable income of &pound;32,430 (i.e. &pound;45,000 minus &pound;12,570)',
      '&pound;4,500 &mdash; 10% of &pound;45,000',
    ],
    correctIndex: 2,
    explanation:
      'The calculation is: &pound;45,000 minus the Personal Allowance of &pound;12,570 = &pound;32,430 of taxable income. All of this falls within the basic rate band (which runs from &pound;12,571 to &pound;50,270), so it is taxed at 20%. &pound;32,430 x 20% = &pound;6,486. This is the Income Tax liability only &mdash; National Insurance (Class 2 and Class 4) would be payable in addition. Many electricians make the mistake of thinking that 20% applies to their total income rather than just the portion above the Personal Allowance.',
  },
  {
    id: 'pf-1-2-check2',
    question:
      'An electrician buys a new &pound;2,400 multifunction tester (Megger MFT1845) for their self-employed business. Under the Annual Investment Allowance (AIA), how much of this cost can they deduct from their taxable profit in the year of purchase?',
    options: [
      'Nothing &mdash; test instruments are not allowable expenses',
      '&pound;600 &mdash; 25% of the cost, spread over four years',
      'The full &pound;2,400 &mdash; the AIA allows 100% first-year deduction for qualifying equipment',
      '&pound;1,200 &mdash; 50% in the first year, 50% in the second year',
    ],
    correctIndex: 2,
    explanation:
      'The Annual Investment Allowance (AIA) allows businesses to deduct 100% of the cost of qualifying plant and machinery in the year of purchase, up to the AIA limit (currently &pound;1,000,000 per year). A multifunction tester is qualifying plant and machinery, so the full &pound;2,400 can be deducted from taxable profit in the tax year it was purchased. This is a capital allowance rather than a revenue expense, but the effect is the same &mdash; it reduces your taxable profit by the full amount. This is significantly more generous than the old writing-down allowance, which spread the deduction over several years. For most sole trader electricians, the AIA limit is more than sufficient to cover all equipment purchases in a given year.',
  },
  {
    id: 'pf-1-2-check3',
    question:
      'Making Tax Digital for Income Tax Self Assessment (MTD for ITSA) will require quarterly digital reporting. From April 2026, which self-employed individuals will be required to comply?',
    options: [
      'All self-employed individuals regardless of income',
      'Self-employed individuals with gross income over &pound;50,000',
      'Only limited company directors',
      'Only those registered for VAT',
    ],
    correctIndex: 1,
    explanation:
      'MTD for ITSA is being rolled out in phases. From April 2026, self-employed individuals and landlords with gross income over &pound;50,000 must comply. From April 2027, the threshold drops to &pound;30,000. There are currently no confirmed plans for income below &pound;30,000, although HMRC has indicated that the threshold may be lowered further in future. Under MTD, affected individuals must keep digital records using compatible software and submit quarterly updates to HMRC, followed by an end-of-period statement and a final declaration. This is a significant change from the current annual Self Assessment system and will require many electricians to invest in accounting software and potentially change how they keep records.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'What happens if I miss the 31 January Self Assessment deadline?',
    answer:
      'If you miss the 31 January deadline for filing your online Self Assessment return, HMRC will impose an automatic &pound;100 late filing penalty, even if you have no tax to pay or have already paid any tax due. If the return is more than three months late, additional daily penalties of &pound;10 per day begin (up to a maximum of &pound;900). After six months, a further penalty of 5% of the tax due or &pound;300 (whichever is greater) is charged. After twelve months, another 5%/&pound;300 penalty applies, and in serious cases HMRC may charge penalties of up to 100% of the tax due. Late payment of tax (as opposed to late filing of the return) attracts interest at the HMRC rate, plus a 5% surcharge after 30 days, a further 5% after six months, and another 5% after twelve months. The message is clear: file and pay on time.',
  },
  {
    question: 'Can I claim the cost of my work clothing as an allowable expense?',
    answer:
      'You can claim the cost of specialist protective clothing that is required for your work and would not be worn outside of work. This includes safety boots, hi-vis jackets, hard hats, and other PPE that is necessary for your role. However, you cannot claim the cost of ordinary clothing even if you wear it exclusively for work. HMRC draws a clear line: if the clothing could reasonably be worn as ordinary everyday wear, it is not an allowable expense. Work trousers, polo shirts, and fleeces are generally not allowable unless they carry a permanent company logo or are specialist items (such as flame-retardant clothing). Branded uniforms with a permanent company logo may qualify as they are considered distinctive work clothing.',
  },
  {
    question: 'Do I need to register for VAT?',
    answer:
      'You must register for VAT if your taxable turnover exceeds the VAT registration threshold (currently &pound;90,000 for the 2024/25 tax year) in any rolling twelve-month period, or if you expect it to exceed the threshold in the next 30 days. Voluntary registration is available below the threshold and can be beneficial if your clients are VAT-registered businesses (because they can reclaim the VAT you charge), but it adds administrative burden and may put you at a competitive disadvantage with domestic clients who cannot reclaim VAT. Once registered, you must charge VAT on your services (standard rate 20%), file quarterly VAT returns, and pay the VAT collected to HMRC. You can reclaim VAT on your business purchases. The Flat Rate Scheme is available for businesses with turnover under &pound;150,000 and simplifies the process by allowing you to pay a fixed percentage of your turnover as VAT.',
  },
  {
    question: 'What is the difference between an allowable expense and a capital allowance?',
    answer:
      'Allowable expenses (also called revenue expenses) are day-to-day costs of running your business that are deducted directly from your income to calculate taxable profit. Examples include fuel, insurance, phone bills, consumable materials, and small tools. Capital allowances apply to capital expenditure &mdash; purchases of assets that have a lasting value beyond the current accounting period. Examples include vans, test equipment, major tools, and computers. Under the Annual Investment Allowance (AIA), most capital expenditure can be deducted in full in the year of purchase (up to the &pound;1,000,000 limit), making the practical difference less significant than it used to be. However, the distinction still matters for record-keeping and for assets that exceed the AIA limit or are excluded from it (such as cars, which have separate capital allowance rules).',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions (Quiz — correctAnswer, 0-indexed)                   */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question: 'The Personal Allowance for the 2024/25 tax year is:',
    options: ['&pound;10,000', '&pound;11,850', '&pound;12,570', '&pound;15,000'],
    correctAnswer: 2,
    explanation:
      'The Personal Allowance for 2024/25 is &pound;12,570. This is the amount of income you can earn before paying any Income Tax. It has been frozen at this level since 2021/22 and is expected to remain frozen until at least April 2028 as part of the government&rsquo;s fiscal drag policy. The Personal Allowance reduces by &pound;1 for every &pound;2 of income above &pound;100,000, meaning it is completely eliminated at income of &pound;125,140. This creates an effective marginal tax rate of 60% on income between &pound;100,000 and &pound;125,140 &mdash; a trap that catches some higher-earning electrical contractors.',
  },
  {
    id: 2,
    question:
      'A self-employed electrician has a taxable profit of &pound;55,000. They will pay Income Tax at:',
    options: [
      '20% on the entire &pound;55,000',
      '20% on &pound;12,571&ndash;&pound;50,270 and 40% on &pound;50,271&ndash;&pound;55,000',
      '40% on the entire &pound;55,000 because they are a higher-rate taxpayer',
      '20% on &pound;0&ndash;&pound;55,000 with no Personal Allowance because they are self-employed',
    ],
    correctAnswer: 1,
    explanation:
      'Income Tax is a marginal system. The first &pound;12,570 is tax-free (Personal Allowance). The next &pound;37,700 (from &pound;12,571 to &pound;50,270) is taxed at 20% (basic rate). The remaining &pound;4,730 (from &pound;50,271 to &pound;55,000) is taxed at 40% (higher rate). The total Income Tax is (&pound;37,700 x 20%) + (&pound;4,730 x 40%) = &pound;7,540 + &pound;1,892 = &pound;9,432. A common misconception is that crossing into the higher-rate band means all your income is taxed at 40% &mdash; this is not the case. Only the portion above the higher-rate threshold is taxed at 40%.',
  },
  {
    id: 3,
    question: 'Class 4 National Insurance for self-employed individuals is charged at:',
    options: [
      '12% on all self-employed profits',
      '6% on profits between &pound;12,570 and &pound;50,270, plus 2% on profits above &pound;50,270',
      '13.8% on all profits above the secondary threshold',
      '8% flat rate on all profits',
    ],
    correctAnswer: 1,
    explanation:
      'Class 4 NI is charged at 6% on profits between &pound;12,570 (the lower profits limit) and &pound;50,270 (the upper profits limit), plus 2% on profits above &pound;50,270. For a self-employed electrician with &pound;50,000 profit, the Class 4 NI would be: (&pound;50,000 - &pound;12,570) x 6% = &pound;37,430 x 6% = &pound;2,245.80. The 6% rate was reduced from 9% in the 2024/25 tax year as part of the government&rsquo;s National Insurance reduction programme. Class 2 NI (&pound;3.45 per week) became voluntary from April 2024 but is still payable if you wish to protect your State Pension entitlement.',
  },
  {
    id: 4,
    question: 'Which of the following is NOT an allowable expense for a self-employed electrician?',
    options: [
      'Professional subscription to the IET (Institution of Engineering and Technology)',
      'Cost of a new Megger multifunction tester',
      'A fine for speeding while driving to a job',
      'Public liability insurance premium',
    ],
    correctAnswer: 2,
    explanation:
      'Fines and penalties for breaking the law are never allowable expenses, regardless of whether the offence occurred during business activities. HMRC is explicit about this &mdash; it includes parking fines, speeding fines, and any other legal penalties. The IET subscription is allowable as a professional subscription directly related to your trade. The Megger tester is allowable as either a capital allowance (under AIA) or a revenue expense depending on how you choose to treat it. Public liability insurance is a core business expense. The key test for any expense is whether it was incurred &ldquo;wholly and exclusively for the purposes of the trade&rdquo; &mdash; fines fail this test because they are a consequence of illegal behaviour, not a necessary business cost.',
  },
  {
    id: 5,
    question:
      'Under the simplified expenses system, a self-employed electrician who uses their own car for business can claim:',
    options: [
      'The actual cost of all fuel purchased during the year',
      '45p per mile for the first 10,000 business miles, then 25p per mile after that',
      'A flat &pound;500 per month vehicle allowance',
      '30p per mile for all business miles with no limit',
    ],
    correctAnswer: 1,
    explanation:
      'The approved mileage rate under simplified expenses is 45p per mile for the first 10,000 business miles in the tax year, dropping to 25p per mile for any additional business miles. This rate is designed to cover all motoring costs: fuel, insurance, road tax, maintenance, repairs, and depreciation. If you use the mileage rate method, you cannot also claim the actual costs of running the vehicle. The alternative is to claim the actual costs and apply a business-use percentage, but this requires detailed record-keeping. Most sole trader electricians find the mileage rate method simpler. Note: these rates apply to cars only. If you use a van, you can claim the actual costs or the flat-rate van mileage allowance, which is different.',
  },
  {
    id: 6,
    question:
      'An electrician who works from home one day a week doing paperwork, invoicing, and design work can claim home office expenses under the simplified method at:',
    options: [
      '&pound;6 per week without needing to provide evidence of actual costs',
      '&pound;26 per month regardless of hours worked',
      '10% of their mortgage or rent',
      'Nothing &mdash; home office expenses are not claimable for tradespeople',
    ],
    correctAnswer: 0,
    explanation:
      'Under the simplified expenses system, you can claim a flat rate for business use of your home without calculating the actual costs. The rates are based on hours of business use per month: 25&ndash;50 hours = &pound;10/month, 51&ndash;100 hours = &pound;18/month, 101+ hours = &pound;26/month. The &pound;6 per week figure (&pound;312 per year) is the HMRC-approved flat rate that PAYE employees can claim for working from home, and many self-employed individuals use this as a simpler alternative. The key requirement is that you genuinely use part of your home for business purposes. For electricians, this typically covers time spent on administration, quoting, invoicing, and design work. You do not need to have a dedicated room &mdash; regular use of a kitchen table is sufficient.',
  },
  {
    id: 7,
    question:
      'Payments on account are advance payments towards your tax bill. They are typically required when:',
    options: [
      'You owe any amount of tax through Self Assessment',
      'Your Self Assessment tax bill is more than &pound;1,000 AND less than 80% of your total tax was collected at source',
      'You earn more than the Personal Allowance',
      'You are registered for CIS',
    ],
    correctAnswer: 1,
    explanation:
      'Payments on account are required when your Self Assessment tax bill is more than &pound;1,000 AND less than 80% of your total tax liability for the year was deducted at source (through PAYE or CIS). Each payment on account is 50% of the previous year&rsquo;s tax bill. The first payment is due on 31 January (during the tax year) and the second on 31 July (after the tax year ends). A balancing payment (or refund) is then made on the following 31 January when the actual tax bill is calculated. This system catches many first-year self-employed electricians off guard because their first Self Assessment bill includes the full year&rsquo;s tax PLUS the first payment on account for the following year &mdash; effectively 18 months&rsquo; worth of tax in one payment.',
  },
  {
    id: 8,
    question: 'Making Tax Digital for Income Tax (MTD for ITSA) requires affected individuals to:',
    options: [
      'Pay their tax monthly instead of annually',
      'Keep digital records using compatible software and submit quarterly updates to HMRC',
      'File their Self Assessment return by 31 October instead of 31 January',
      'Register all business expenses with HMRC in advance before incurring them',
    ],
    correctAnswer: 1,
    explanation:
      'MTD for ITSA requires affected self-employed individuals and landlords to keep digital records using HMRC-compatible software, submit quarterly updates summarising income and expenses, submit an end-of-period statement after the tax year ends, and submit a final declaration (replacing the current Self Assessment return). The quarterly updates do not change when tax is due &mdash; they are information submissions, not payment deadlines. The purpose is to give HMRC a more up-to-date picture of taxpayers&rsquo; affairs and to reduce errors in Self Assessment returns. From April 2026, this applies to those with gross income over &pound;50,000; from April 2027, the threshold drops to &pound;30,000.',
  },
];

export default function PFModule1Section2() {
  useSEO({
    title: 'Tax Basics for Tradespeople | Personal Finance Module 1.2',
    description:
      'Self-assessment, Income Tax bands, National Insurance, allowable expenses, capital allowances, and Making Tax Digital for electricians.',
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
            <Receipt className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 1 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Tax Basics for Tradespeople
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Self-assessment, Income Tax bands, National Insurance, allowable expenses, capital
            allowances, and Making Tax Digital
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Personal Allowance:</strong> &pound;12,570 tax-free, then 20% basic rate,
                40% higher rate, 45% additional rate
              </li>
              <li>
                <strong>National Insurance:</strong> Class 2 &pound;3.45/week (voluntary), Class 4
                at 6% then 2% on profits
              </li>
              <li>
                <strong>Allowable expenses</strong> reduce your taxable profit &mdash; tools, van,
                fuel, insurance, training, and more
              </li>
              <li>
                <strong>Making Tax Digital:</strong> Quarterly digital reporting for income over
                &pound;50,000 from April 2026
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Legal obligation:</strong> Every self-employed electrician must file a Self
                Assessment return &mdash; failure to do so results in penalties
              </li>
              <li>
                <strong>Tax efficiency:</strong> Understanding allowable expenses can save you
                thousands of pounds per year in legitimate tax deductions
              </li>
              <li>
                <strong>Cash flow:</strong> Knowing about payments on account prevents the shock of
                a massive first-year tax bill
              </li>
              <li>
                <strong>Compliance:</strong> MTD is coming whether you are ready or not &mdash;
                preparation starts now
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'Explain the Self Assessment system including registration, UTR numbers, tax year dates, and filing deadlines',
              'Calculate Income Tax liability using the 2024/25 bands and rates for a given level of taxable profit',
              'Describe the National Insurance classes that apply to self-employed individuals and calculate the amounts due',
              'Identify at least ten allowable expenses relevant to self-employed electricians and explain the "wholly and exclusively" test',
              'Explain the difference between revenue expenses and capital allowances, including the Annual Investment Allowance',
              'Describe the Making Tax Digital requirements and timeline for self-employed individuals',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Self Assessment System */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            The Self Assessment System
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Self Assessment is HMRC&rsquo;s system for collecting Income Tax from individuals
                whose tax affairs are too complex to be handled entirely through PAYE. If you are
                self-employed, a company director, have income from property, or have other untaxed
                income, you must file a Self Assessment tax return. For electricians, the most
                common reason is self-employment &mdash; whether as a sole trader or through a
                partnership. The system requires you to report your income and expenses to HMRC,
                calculate your tax liability (or have HMRC calculate it for you), and pay the tax
                due by the prescribed deadlines.
              </p>

              <p>
                When you first become self-employed, you must register with HMRC by 5 October
                following the end of the tax year in which you started trading. For example, if you
                began self-employment in August 2024 (during the 2024/25 tax year which runs from 6
                April 2024 to 5 April 2025), you must register by 5 October 2025. Registration can
                be completed online through the HMRC website and typically takes about ten minutes.
                Upon registration, HMRC will issue you a Unique Taxpayer Reference (UTR) number
                &mdash; a ten-digit number that identifies you within the Self Assessment system.
                You will also need a Government Gateway user ID and password to access the online
                services. Keep your UTR number safe; you will need it every time you file a return,
                and contractors will ask for it when verifying your CIS registration.
              </p>

              <p>
                The UK tax year runs from 6 April to 5 April. Your Self Assessment return for a
                given tax year must be filed by <strong>31 October</strong> if you are submitting a
                paper return, or by <strong>31 January</strong> following the end of the tax year if
                you are filing online. For the 2024/25 tax year (6 April 2024 to 5 April 2025), the
                online filing deadline is 31 January 2026. Any tax owed must also be paid by 31
                January. If HMRC requires you to make payments on account (advance payments towards
                next year&rsquo;s tax bill), the first payment on account is due on 31 January and
                the second on 31 July. The balancing payment is then due the following 31 January.
              </p>

              <p>
                Payments on account are required when your Self Assessment tax bill is more than
                &pound;1,000 and less than 80% of your total tax liability was collected at source
                (through PAYE or CIS deductions). Each payment on account is 50% of the previous
                year&rsquo;s tax bill. This system is designed to spread the tax burden but it
                catches many first-year self-employed electricians by surprise. In your first year
                of Self Assessment, you will owe the full year&rsquo;s tax PLUS the first payment on
                account for the following year. If your first-year tax bill is &pound;8,000, you
                will owe &pound;8,000 plus &pound;4,000 (first payment on account) = &pound;12,000
                on 31 January. This is why setting aside money throughout the year is absolutely
                essential.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">The 25&ndash;30% Rule</p>
                <p className="text-base text-white leading-relaxed">
                  As a practical rule of thumb, set aside 25&ndash;30% of every payment you receive
                  into a separate savings account for tax. Do not touch this money. This figure
                  covers Income Tax, Class 4 National Insurance, and payments on account. If your
                  profits are higher (above &pound;50,270), you may need to set aside more because
                  the higher-rate tax band will apply to part of your income. When your tax bill
                  arrives, you will have the funds ready. This single habit is the difference
                  between electricians who manage their finances confidently and those who face an
                  annual January crisis.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Income Tax Bands */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            Income Tax Bands &amp; Rates (2024/25)
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Income Tax in the UK is a progressive, marginal tax. This means that different
                portions of your income are taxed at different rates, and moving into a higher tax
                band only affects the income within that band &mdash; not your entire income. This
                is one of the most commonly misunderstood aspects of the tax system, and getting it
                wrong can lead to poor financial decisions. For example, an electrician who believes
                that earning &pound;51,000 means ALL their income is taxed at 40% might turn down
                work or fail to invoice for additional jobs, when in reality only the &pound;730
                above the higher-rate threshold would be taxed at the higher rate.
              </p>

              <p>
                The 2024/25 Income Tax bands for England and Northern Ireland are as follows. The
                <strong> Personal Allowance</strong> is &pound;12,570 &mdash; this is the amount you
                can earn tax-free. It has been frozen at this level since 2021/22 and is expected to
                remain frozen until at least April 2028 (a policy known as &ldquo;fiscal drag&rdquo;
                which effectively increases your tax burden as wages rise but the allowance does
                not). The <strong>basic rate</strong> of 20% applies to taxable income from
                &pound;12,571 to &pound;50,270. The <strong>higher rate</strong> of 40% applies to
                taxable income from &pound;50,271 to &pound;125,140. The
                <strong> additional rate</strong> of 45% applies to taxable income above
                &pound;125,140. There is also a hidden trap: the Personal Allowance is reduced by
                &pound;1 for every &pound;2 of income above &pound;100,000, creating an effective
                marginal rate of 60% on income between &pound;100,000 and &pound;125,140.
              </p>

              <p>
                To illustrate with a worked example: an electrician with taxable profit of
                &pound;45,000 would pay: &pound;0 on the first &pound;12,570 (Personal Allowance),
                then 20% on the remaining &pound;32,430 = &pound;6,486. The effective tax rate is
                &pound;6,486 / &pound;45,000 = 14.4%, which is significantly lower than the headline
                20% basic rate. An electrician with &pound;60,000 in taxable profit would pay:
                &pound;0 on the first &pound;12,570, then 20% on &pound;37,700 (the basic rate band)
                = &pound;7,540, then 40% on the remaining &pound;9,730 = &pound;3,892. Total:
                &pound;11,432. The effective tax rate is &pound;11,432 / &pound;60,000 = 19.1%
                &mdash; still well below the 40% higher rate. These calculations demonstrate why
                understanding marginal taxation is so important for making informed financial
                decisions.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  2024/25 Income Tax Bands &mdash; England &amp; Northern Ireland
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Personal Allowance:</strong> &pound;0&ndash;&pound;12,570 &mdash; 0%
                      (tax-free)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong>Basic rate:</strong> &pound;12,571&ndash;&pound;50,270 &mdash; 20%
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong>Higher rate:</strong> &pound;50,271&ndash;&pound;125,140 &mdash; 40%
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong>Additional rate:</strong> Over &pound;125,140 &mdash; 45%
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong>Hidden 60% band:</strong> &pound;100,000&ndash;&pound;125,140 &mdash;
                      effective 60% due to Personal Allowance withdrawal
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: National Insurance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            National Insurance for the Self-Employed
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                National Insurance contributions (NICs) are a separate tax from Income Tax, although
                they are collected alongside it through Self Assessment. As a self-employed
                individual, you are liable for two classes of National Insurance: Class 2 and Class
                4. These work differently from the Class 1 NICs paid by employees and employers
                under PAYE. Understanding how NI works is essential because it represents a
                significant additional cost on top of Income Tax, and the rules have changed
                substantially in recent years.
              </p>

              <p>
                <strong>Class 2 National Insurance</strong> was historically a flat-rate
                contribution of &pound;3.45 per week (&pound;179.40 per year) paid by all
                self-employed individuals with profits above the Small Profits Threshold
                (&pound;6,725). From April 2024, Class 2 NI became <strong>voluntary</strong> rather
                than compulsory. Self-employed individuals are no longer required to pay it, but
                they may choose to pay voluntarily to build up their National Insurance record for
                State Pension purposes and to access certain contributory benefits such as the
                new-style Employment and Support Allowance. If your profits are above the lower
                profits limit (&pound;12,570), you are treated as having paid Class 2 for State
                Pension purposes even if you have not actually paid it &mdash; so the voluntary
                payment is most relevant for those with lower profits who want to protect their
                pension record.
              </p>

              <p>
                <strong>Class 4 National Insurance</strong> is the main NI contribution for the
                self-employed and is calculated as a percentage of your annual taxable profits. The
                2024/25 rates are: <strong>6%</strong> on profits between &pound;12,570 and
                &pound;50,270, and <strong>2%</strong> on profits above &pound;50,270. These rates
                were reduced from 9% and 2% respectively in the 2024/25 tax year, representing a
                significant cut. For a self-employed electrician with &pound;45,000 in taxable
                profit, the Class 4 NI liability would be: (&pound;45,000 - &pound;12,570) x 6% =
                &pound;32,430 x 6% = &pound;1,945.80. Class 4 NI is calculated and collected through
                your Self Assessment return, not through a separate payment process.
              </p>

              <p>
                It is worth noting that self-employed individuals pay significantly less National
                Insurance than employees on the same income level. An employee earning &pound;45,000
                would pay 8% employee NI on earnings between &pound;12,570 and &pound;50,270 =
                &pound;2,594.40, while their employer would also pay 13.8% employer NI. The combined
                employee/employer NI burden on &pound;45,000 employed income is therefore much
                higher than the 6% Class 4 the self-employed person pays. However, this lower NI
                rate is offset by the fact that self-employed individuals have no entitlement to
                employer-provided sick pay, holiday pay, pension contributions, or other employment
                benefits. The lower NI rate is, in effect, the price of those missing benefits.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Combined Tax &amp; NI on &pound;45,000 Self-Employed Profit (2024/25)
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Income Tax:</strong> &pound;6,486 (20% on &pound;32,430 taxable income
                      after Personal Allowance)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Class 4 NI:</strong> &pound;1,945.80 (6% on &pound;32,430)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Class 2 NI:</strong> &pound;0 (voluntary from April 2024; treated as
                      paid for pension purposes if profits above &pound;12,570)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Total tax &amp; NI:</strong> &pound;8,431.80
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Effective combined rate:</strong> 18.7% of gross profit
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Allowable Expenses */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Allowable Expenses for Electricians
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Allowable expenses are business costs that you can deduct from your gross income to
                arrive at your taxable profit. Every pound of legitimate expense you claim reduces
                your taxable profit by one pound, which in turn reduces your Income Tax and National
                Insurance liability. For a basic-rate taxpayer, each &pound;100 of allowable
                expenses saves approximately &pound;26 in tax and NI (20% Income Tax + 6% Class 4
                NI). For a higher-rate taxpayer, the saving is approximately &pound;42 per
                &pound;100. This is why thorough record-keeping and claiming all legitimate expenses
                is one of the most effective ways to manage your tax burden.
              </p>

              <p>
                The fundamental HMRC test for allowable expenses is that the cost must have been
                incurred{' '}
                <strong>&ldquo;wholly and exclusively for the purposes of the trade&rdquo;</strong>.
                This means the expense must be a genuine business cost with no significant private
                benefit. Costs that have both a business and personal element (known as
                &ldquo;dual-purpose&rdquo; expenses) can sometimes be apportioned &mdash; for
                example, a mobile phone used 70% for business can have 70% of its cost claimed. But
                purely personal costs are never allowable, even if they happen to be incurred during
                working hours.
              </p>

              <p>
                For self-employed electricians, the most common allowable expenses include:
                <strong> tools and equipment</strong> (hand tools, power tools, access equipment),
                <strong> test instruments</strong> (multifunction testers, insulation resistance
                testers, earth loop impedance testers, RCD testers), <strong>van costs</strong>
                (lease payments, fuel, insurance, road tax, maintenance, repairs, MOT),
                <strong> materials and consumables</strong> (cable, accessories, fixings, sundries
                not recharged to clients), <strong>insurance</strong> (public liability,
                professional indemnity, tool insurance, van insurance),
                <strong> professional subscriptions</strong> (IET membership, certification body
                fees such as NICEIC or NAPIT, ECS card renewal),
                <strong> training and CPD</strong> (18th Edition course, inspection and testing
                courses, renewable energy courses, first aid training),
                <strong> accountancy fees</strong> (cost of preparing accounts and tax returns),
                <strong> phone and internet</strong> (business proportion of mobile phone and
                broadband), <strong>PPE</strong> (safety boots, hi-vis clothing, hard hats, eye
                protection), <strong>stationery and printing</strong> (invoice books, certificates,
                printer ink), and <strong>advertising</strong> (website hosting, business cards,
                online advertising, vehicle livery).
              </p>

              <p>
                Several categories of expenditure are specifically NOT allowable: fines and
                penalties for breaking the law (parking fines, speeding tickets), entertaining
                clients or suppliers (HMRC explicitly disallows this), ordinary clothing (even if
                worn exclusively for work), travel between home and a regular workplace (this is
                commuting, not business travel), and capital expenditure that does not qualify for
                capital allowances. It is also important to note that you can only claim the
                business proportion of dual-use items &mdash; if your van is used 80% for business
                and 20% for personal journeys, only 80% of the running costs are allowable.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Record-Keeping: The Non-Negotiable Habit
                </p>
                <p className="text-base text-white leading-relaxed">
                  You must keep records of all business income and expenses for at least five years
                  after the 31 January submission deadline for the relevant tax year. HMRC can open
                  an enquiry into your tax return at any time during this period. If your records
                  are inadequate, HMRC can estimate your income and tax liability &mdash; and their
                  estimates tend not to be generous. Keep receipts (digital photos are acceptable),
                  bank statements, invoices, and mileage logs. Use accounting software or a
                  spreadsheet to track income and expenses in real time, not in a panic in January.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Capital Allowances & Simplified Expenses */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Capital Allowances &amp; Simplified Expenses
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Capital allowances are the mechanism through which you can claim tax relief on
                capital expenditure &mdash; the purchase of assets that have a lasting value beyond
                the current accounting period. For electricians, the most significant capital
                expenditure is typically vans, test equipment, and major tools. Unlike revenue
                expenses (which are deducted from profit in the year they are incurred), capital
                expenditure is treated differently because the asset provides value over multiple
                years. However, the <strong>Annual Investment Allowance (AIA)</strong> makes this
                distinction largely academic for most sole traders, because it allows you to deduct
                100% of qualifying capital expenditure in the year of purchase, up to a limit of
                &pound;1,000,000 per year.
              </p>

              <p>
                The AIA applies to most plant and machinery, which for electricians includes vans,
                test equipment, power tools, computers, and office equipment. Cars are excluded from
                the AIA and have their own capital allowance rules (based on CO2 emissions). If you
                purchase a van for &pound;25,000 and a complete set of test instruments for
                &pound;3,000, both can be fully deducted from your taxable profit in the year of
                purchase under the AIA. This is a significant tax benefit &mdash; at the basic rate,
                a &pound;25,000 van deduction saves approximately &pound;6,500 in tax and NI. It is
                important to plan major purchases with this in mind: buying equipment before the end
                of your accounting period allows you to claim the deduction in the current year
                rather than waiting until the next.
              </p>

              <p>
                <strong>Simplified expenses</strong> are an alternative system available to sole
                traders (not limited companies or partnerships) that replaces the need to calculate
                exact business costs for certain categories of expenditure. The two most relevant
                simplified expense categories for electricians are vehicle mileage and home office
                use. For vehicles, instead of tracking and apportioning actual running costs, you
                can claim a flat rate of <strong>45p per mile</strong> for the first 10,000 business
                miles in the tax year, and <strong>25p per mile</strong> for additional business
                miles. This rate covers all motoring costs &mdash; fuel, insurance, road tax,
                maintenance, and depreciation. You cannot claim actual vehicle costs AND the mileage
                rate; it is one or the other, and once chosen, you must stick with that method for
                the life of the vehicle.
              </p>

              <p>
                For home office use, the simplified expenses system allows you to claim a flat rate
                based on the number of hours you work from home per month: 25&ndash;50 hours =
                &pound;10/month, 51&ndash;100 hours = &pound;18/month, 101+ hours = &pound;26/month.
                The alternative is to calculate the actual costs (a proportion of mortgage interest
                or rent, council tax, electricity, gas, water, broadband, and insurance) based on
                the number of rooms used and the hours of use. For most electricians who do a day or
                two of office work per week, the simplified flat rate is easier to manage, although
                the actual cost method may produce a higher deduction if you have a dedicated home
                office. The &pound;6/week flat rate (&pound;312/year) commonly referenced is
                actually the rate for employed workers claiming under HMRC rules &mdash;
                self-employed individuals should use the monthly hours-based rates for potentially
                better claims.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Simplified Expenses Mileage Rates
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Cars:</strong> 45p per mile (first 10,000 miles), 25p per mile
                      thereafter
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Motorcycles:</strong> 24p per mile (all miles)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Bicycles:</strong> 20p per mile (all miles)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Vans:</strong> If you own a van, you should generally use the actual
                      cost method (tracking real expenses) as vans are treated as plant and
                      machinery for capital allowance purposes, which is often more tax-efficient
                      than the flat mileage rate
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Making Tax Digital */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            Making Tax Digital (MTD)
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Making Tax Digital (MTD) is HMRC&rsquo;s programme to modernise the UK tax system by
                requiring businesses and individuals to keep digital records and submit tax
                information to HMRC through compatible software. MTD for VAT has been in force since
                April 2019 (for VAT-registered businesses above the &pound;85,000 threshold) and was
                extended to all VAT-registered businesses from April 2022. The next phase,
                <strong> MTD for Income Tax Self Assessment (MTD for ITSA)</strong>, will affect
                self-employed individuals and landlords and represents the biggest change to the
                Self Assessment system in decades.
              </p>

              <p>
                The MTD for ITSA rollout is phased based on gross income. From
                <strong> April 2026</strong>, self-employed individuals and landlords with
                <strong> gross income over &pound;50,000</strong> must comply. From
                <strong> April 2027</strong>, the threshold drops to include those with
                <strong> gross income over &pound;30,000</strong>. HMRC has indicated that the
                threshold may be lowered further in future, potentially bringing all self-employed
                individuals into the MTD system, but no firm date has been set for income below
                &pound;30,000. &ldquo;Gross income&rdquo; in this context means your total
                self-employed turnover before deducting expenses, combined with any property income.
                For an electrician charging &pound;250/day working 220 days per year, gross income
                would be &pound;55,000, which would bring them into the April 2026 mandate even if
                their taxable profit after expenses is well below &pound;50,000.
              </p>

              <p>
                Under MTD for ITSA, affected individuals must: keep digital records of all business
                income and expenses using HMRC-compatible software (spreadsheets linked to bridging
                software may be acceptable, but a standalone spreadsheet will not be sufficient),
                submit <strong>quarterly updates</strong> to HMRC summarising income and expenses
                for each quarter of the tax year, submit an <strong>end-of-period statement</strong>
                after the tax year ends to finalise the figures, and submit a
                <strong> final declaration</strong> (which replaces the current Self Assessment tax
                return). The quarterly updates are due by the 7th of the month following the end of
                each quarter (i.e., 7 July, 7 October, 7 January, and 7 April). These are
                information submissions, not payment deadlines &mdash; the payment dates remain 31
                January and 31 July as now.
              </p>

              <p>
                The practical impact for electricians is that the days of handing a carrier bag of
                receipts to your accountant in January are numbered. You will need to adopt digital
                record-keeping practices throughout the year, not just at year-end. Several
                accounting software packages designed for sole traders and small businesses already
                support MTD, including FreeAgent, Xero, QuickBooks Self-Employed, and various HMRC-
                approved apps. Many electricians will find that the transition, while initially
                inconvenient, actually improves their financial management by forcing them to track
                income and expenses in real time rather than retrospectively. Starting to use
                compatible software now, even before you are legally required to, is strongly
                recommended as it will make the transition smoother and help you build good habits.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Preparing for MTD &mdash; Start Now
                </p>
                <p className="text-base text-white leading-relaxed">
                  Do not wait until April 2026 or 2027 to prepare for MTD. Steps you can take today:
                  (1) Choose HMRC-compatible accounting software and start using it for the current
                  tax year. (2) Set up a system for photographing and storing receipts digitally as
                  they occur. (3) Categorise income and expenses consistently using the same
                  categories your software supports. (4) If you use an accountant, discuss their MTD
                  readiness and what additional costs (if any) MTD compliance will involve. (5)
                  Consider subscribing to HMRC&rsquo;s MTD for ITSA pilot scheme to gain early
                  experience with the quarterly reporting process.
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
                This section has covered the core elements of the UK tax system as they apply to
                self-employed electricians. The key points to carry forward are:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Self Assessment</strong> is mandatory for self-employed electricians.
                    Register for a UTR, file by 31 January (online), and pay by 31 January. Be
                    prepared for payments on account in your first year.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Income Tax is marginal.</strong> The Personal Allowance (&pound;12,570)
                    is tax-free. Basic rate (20%) applies up to &pound;50,270. Higher rate (40%)
                    applies above that. Only the income in each band is taxed at that rate.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>National Insurance:</strong> Class 4 at 6% on profits
                    &pound;12,570&ndash;&pound;50,270, then 2% above. Class 2 is now voluntary.
                    Combined tax and NI on &pound;45,000 profit is approximately &pound;8,432.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Claim every legitimate expense.</strong> Tools, van, fuel, insurance,
                    training, professional subscriptions, phone, PPE, and accountancy fees all
                    reduce your tax bill. Keep receipts for five years.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Capital allowances (AIA)</strong> allow 100% first-year deduction for
                    qualifying equipment up to &pound;1,000,000. Simplified expenses offer flat-rate
                    alternatives for vehicle mileage and home office use.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Making Tax Digital</strong> requires quarterly digital reporting from
                    April 2026 (over &pound;50k) and April 2027 (over &pound;30k). Start preparing
                    now by adopting compatible accounting software.
                  </span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Next:</strong> In Section 3, we will examine
                  your true take-home pay &mdash; the gap between what you earn on paper and what
                  actually ends up in your pocket. We will work through detailed employed and
                  self-employed examples and build a like-for-like comparison framework.
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
        <Quiz title="Section 2 Knowledge Check" questions={quizQuestions} />

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
            <Link to="../pf-module-1-section-3">
              Next: Understanding Your True Take-Home Pay
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
