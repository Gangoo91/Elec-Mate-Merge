import { ArrowLeft, Building2, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quizQuestions = [
  {
    id: 1,
    question: 'What is the full new State Pension amount for the 2024/25 tax year?',
    options: [
      '&pound;185.15 per week',
      '&pound;203.85 per week',
      '&pound;221.20 per week',
      '&pound;250.00 per week',
    ],
    correctAnswer: 2,
    explanation:
      'The full new State Pension is &pound;221.20 per week for 2024/25. This is guaranteed to rise each year by the triple lock.',
  },
  {
    id: 2,
    question:
      'How many qualifying years of National Insurance contributions do you need for the full new State Pension?',
    options: ['10 years', '25 years', '30 years', '35 years'],
    correctAnswer: 3,
    explanation:
      'You need 35 qualifying years of NI contributions or credits to receive the full new State Pension. With fewer than 10 qualifying years, you receive nothing.',
  },
  {
    id: 3,
    question:
      'What is the minimum number of qualifying years needed to receive any State Pension at all?',
    options: ['5 years', '10 years', '15 years', '20 years'],
    correctAnswer: 1,
    explanation:
      'You need at least 10 qualifying years to receive any State Pension. Each qualifying year between 10 and 35 adds 1/35th of the full amount.',
  },
  {
    id: 4,
    question: 'What is the &ldquo;triple lock&rdquo; guarantee?',
    options: [
      'The State Pension rises by the highest of wages growth, inflation, or 2.5%',
      'You receive three separate pension payments each month',
      'Your pension is protected by three layers of insurance',
      'You can claim the State Pension from three different countries',
    ],
    correctAnswer: 0,
    explanation:
      'The triple lock guarantees the State Pension rises each April by whichever is highest: average earnings growth, CPI inflation, or 2.5%. This protects its real value over time.',
  },
  {
    id: 5,
    question: 'How do self-employed electricians build qualifying years for the State Pension?',
    options: [
      'They are automatically enrolled through their trade body',
      'By paying Class 2 National Insurance contributions',
      'By paying income tax on time',
      'Self-employed people cannot qualify for the State Pension',
    ],
    correctAnswer: 1,
    explanation:
      'Self-employed workers build qualifying years through Class 2 NI contributions. Since April 2024 these are voluntary, so you must actively choose to pay them to protect your State Pension entitlement.',
  },
  {
    id: 6,
    question: 'What is the current State Pension age in the UK?',
    options: ['60', '65', '66', '67'],
    correctAnswer: 2,
    explanation:
      'The State Pension age is currently 66 for both men and women. It is due to rise to 67 between 2026 and 2028, with a further rise to 68 under review.',
  },
  {
    id: 7,
    question: 'Which website allows you to check your personal State Pension forecast?',
    options: [
      'pensionwise.gov.uk',
      'gov.uk/check-state-pension',
      'moneyhelper.org.uk',
      'hmrc.gov.uk/pensions',
    ],
    correctAnswer: 1,
    explanation:
      'You can check your personal State Pension forecast at gov.uk/check-state-pension. It shows how much you could get, when you can claim, and how to increase it.',
  },
  {
    id: 8,
    question:
      'According to the PLSA Retirement Living Standards, what annual income represents a &ldquo;moderate&rdquo; retirement for a single person?',
    options: ['&pound;12,800', '&pound;18,500', '&pound;23,300', '&pound;37,300'],
    correctAnswer: 2,
    explanation:
      'The PLSA &ldquo;moderate&rdquo; standard is &pound;23,300 per year for a single person. This covers a two-week European holiday, eating out a few times a month, and a reasonable standard of living.',
  },
];

export default function PFModule4Section1() {
  useSEO({
    title: 'State Pension Basics | Pensions & Retirement Planning | Personal Finance',
    description:
      'Full new State Pension amount, qualifying years, NI contributions, checking your forecast, and State Pension age for UK electricians.',
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-8 lg:px-12 py-2">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              size="lg"
              className="min-h-[44px] px-3 -ml-3 text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../pf-module-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Module 4
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto space-y-10">
          {/* Page header */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20">
                <Building2 className="h-6 w-6 text-rose-400" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-1">
                  <span className="text-rose-400 text-xs font-semibold">MODULE 4</span>
                  <span className="text-white text-xs">&bull;</span>
                  <span className="text-white text-xs">SECTION 1</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">State Pension Basics</h1>
              </div>
            </div>
            <p className="text-white text-sm sm:text-base leading-relaxed">
              The State Pension is the foundation of every UK retirement plan. Whether you are
              employed or self-employed, understanding how it works, how much you could receive, and
              what you need to do to protect your entitlement is essential knowledge for any
              electrician.
            </p>
          </div>

          {/* Quick Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-rose-500/5 border-l-2 border-rose-500/50 p-4 rounded-r-lg">
              <h3 className="text-white font-semibold text-sm mb-2">In 30 Seconds</h3>
              <p className="text-white text-sm leading-relaxed">
                The new State Pension pays up to &pound;221.20 per week (2024/25). You need 35
                qualifying years of National Insurance for the full amount and at least 10 years for
                any payment at all. The triple lock protects its value. Self-employed electricians
                must actively pay Class 2 NI to build qualifying years. You can check your personal
                forecast free at gov.uk.
              </p>
            </div>
            <div className="bg-rose-500/5 border-l-2 border-rose-500/50 p-4 rounded-r-lg">
              <h3 className="text-white font-semibold text-sm mb-2">Why It Matters</h3>
              <p className="text-white text-sm leading-relaxed">
                The State Pension alone is not enough for a comfortable retirement &mdash; it covers
                around &pound;11,500 a year &mdash; but it is guaranteed income for life, protected
                against inflation. Understanding your entitlement lets you plan how much extra you
                need to save and avoid costly gaps in your National Insurance record.
              </p>
            </div>
          </div>

          {/* Learning Outcomes */}
          <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
            <h2 className="text-white font-bold text-lg mb-4">What You Will Learn</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'The full new State Pension amount and the triple lock guarantee',
                'How qualifying years work and the 35-year / 10-year thresholds',
                'How NI contributions differ for employed and self-employed workers',
                'How to check your personal State Pension forecast online',
                'Current and future State Pension ages',
                'The PLSA Retirement Living Standards and what the State Pension covers',
              ].map((outcome, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white text-sm leading-relaxed">{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 01: The New State Pension */}
          <section className="space-y-4">
            <div className="border-l-2 border-rose-500 pl-4">
              <span className="text-rose-400 text-xs font-bold tracking-wider">01</span>
              <h2 className="text-white text-xl sm:text-2xl font-bold mt-1">
                The New State Pension
              </h2>
            </div>
            <div className="space-y-4 text-white text-sm sm:text-base leading-relaxed">
              <p>
                The new State Pension replaced the old basic State Pension and State Second Pension
                (S2P/SERPS) on 6 April 2016. If you reached State Pension age on or after that date,
                you receive the new-style pension. It is a single, flat-rate payment designed to be
                simpler than the old two-tier system.
              </p>
              <p>
                For the 2024/25 tax year, the full new State Pension is{' '}
                <strong className="text-white">&pound;221.20 per week</strong>, which works out to
                approximately &pound;11,502 per year. That is the maximum &mdash; you could receive
                less if you have fewer than 35 qualifying years, or slightly more if you built up
                entitlement under the old system before 2016.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <h4 className="text-white font-semibold text-sm mb-2">Key Amount to Remember</h4>
                <p className="text-white text-sm leading-relaxed">
                  Full new State Pension 2024/25:{' '}
                  <strong className="text-white">&pound;221.20 per week</strong> &mdash;
                  approximately &pound;961 per month or &pound;11,502 per year. This is paid every
                  four weeks directly into your bank account, not monthly.
                </p>
              </div>

              <p>
                The State Pension is taxable income, but it is paid gross (without tax deducted). If
                your total income in retirement exceeds your Personal Allowance (&pound;12,570 for
                2024/25), HMRC will collect tax through other pension income or through Self
                Assessment.
              </p>

              <h3 className="text-white font-semibold text-base sm:text-lg mt-6">
                The Triple Lock Guarantee
              </h3>
              <p>
                Since 2011, the State Pension has been protected by the{' '}
                <strong className="text-white">triple lock</strong>. This means it rises each April
                by whichever is highest out of:
              </p>
              <ul className="space-y-2 ml-1">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">&bull;</span>
                  <span className="text-white">Average earnings growth across the UK economy</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">&bull;</span>
                  <span className="text-white">Consumer Prices Index (CPI) inflation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">&bull;</span>
                  <span className="text-white">2.5% &mdash; a guaranteed minimum increase</span>
                </li>
              </ul>
              <p>
                In practice, the triple lock has meant the State Pension has risen substantially
                over the past decade. For example, the 2024/25 increase was 8.5%, reflecting strong
                average earnings growth. The 2.5% floor ensures the pension always rises
                meaningfully, even if wages and prices are flat.
              </p>
              <p>
                There has been political debate about whether the triple lock is sustainable long
                term, but as of 2024 all major parties have pledged to maintain it. For planning
                purposes, it is reasonable to assume the State Pension will at least keep pace with
                inflation.
              </p>
            </div>
          </section>

          {/* Inline Check 1 */}
          <InlineCheck
            id="pf-4-1-check1"
            question="The full new State Pension for 2024/25 is &pound;221.20 per week. Roughly how much is that per year?"
            options={[
              'About &pound;8,500',
              'About &pound;11,500',
              'About &pound;15,000',
              'About &pound;20,000',
            ]}
            correctIndex={1}
            explanation="&pound;221.20 per week multiplied by 52 weeks equals &pound;11,502 per year. Remember it is paid every four weeks, not monthly, so you receive 13 payments a year."
          />

          {/* Section 02: Qualifying Years */}
          <section className="space-y-4">
            <div className="border-l-2 border-amber-500 pl-4">
              <span className="text-amber-400 text-xs font-bold tracking-wider">02</span>
              <h2 className="text-white text-xl sm:text-2xl font-bold mt-1">
                Qualifying Years &mdash; Building Your Entitlement
              </h2>
            </div>
            <div className="space-y-4 text-white text-sm sm:text-base leading-relaxed">
              <p>
                Your State Pension amount depends on how many{' '}
                <strong className="text-white">qualifying years</strong> of National Insurance you
                have on your record. A qualifying year is a tax year (6 April to 5 April) in which
                you paid or were credited with enough National Insurance contributions.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h4 className="text-white font-semibold text-sm mb-3">The Key Thresholds</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="bg-rose-500/20 text-rose-400 text-xs font-bold px-2 py-1 rounded flex-shrink-0">
                      35 years
                    </span>
                    <span className="text-white text-sm">
                      Full State Pension &mdash; &pound;221.20/week (2024/25)
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-amber-500/20 text-amber-400 text-xs font-bold px-2 py-1 rounded flex-shrink-0">
                      10&ndash;34 years
                    </span>
                    <span className="text-white text-sm">
                      Proportional amount &mdash; each year adds 1/35th of the full pension
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-red-500/20 text-red-400 text-xs font-bold px-2 py-1 rounded flex-shrink-0">
                      Under 10 years
                    </span>
                    <span className="text-white text-sm">
                      No State Pension at all &mdash; you receive nothing
                    </span>
                  </div>
                </div>
              </div>

              <p>
                The maths is straightforward. If you have 20 qualifying years, you receive 20/35ths
                of &pound;221.20 = &pound;126.40 per week. If you have 28 years, you receive
                28/35ths = &pound;177.00 per week. Every missing year costs you &pound;6.32 per week
                &mdash; or &pound;328.64 per year &mdash; for the rest of your retirement.
              </p>

              <h3 className="text-white font-semibold text-base sm:text-lg mt-6">
                What Counts as a Qualifying Year
              </h3>
              <p>You can build qualifying years in several ways:</p>
              <ul className="space-y-2 ml-1">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">&bull;</span>
                  <span className="text-white">
                    <strong className="text-white">Employed</strong> &mdash; Class 1 NI is deducted
                    automatically from your pay if you earn above the Primary Threshold
                    (&pound;12,570 for 2024/25)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">&bull;</span>
                  <span className="text-white">
                    <strong className="text-white">Self-employed</strong> &mdash; Class 2 NI
                    contributions (voluntary since April 2024; currently &pound;3.45 per week)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">&bull;</span>
                  <span className="text-white">
                    <strong className="text-white">NI credits</strong> &mdash; awarded for periods
                    of unemployment (on Universal Credit/JSA), caring for a child under 12 (if
                    claiming Child Benefit), or caring for a disabled person
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">&bull;</span>
                  <span className="text-white">
                    <strong className="text-white">Voluntary Class 3 contributions</strong> &mdash;
                    you can pay to fill gaps in your record (currently &pound;17.45 per week)
                  </span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <h4 className="text-white font-semibold text-sm mb-2">
                  Warning for Self-Employed Electricians
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Since April 2024, Class 2 NI contributions became voluntary for the self-employed.
                  This means if you do not actively choose to pay them, you may not build a
                  qualifying year. At just &pound;3.45 per week (&pound;179.40 per year), Class 2 NI
                  is exceptionally good value for money &mdash; it buys you 1/35th of the full State
                  Pension (&pound;328.64 per year) for life. Always pay it.
                </p>
              </div>

              <p>
                If you started your apprenticeship at 16 and worked continuously until 66, you would
                have 50 qualifying years &mdash; well over the 35 needed. But gaps are common. Years
                spent abroad, periods between jobs, years earning below the threshold, or time spent
                self-employed without paying Class 2 NI can all create gaps.
              </p>

              <h3 className="text-white font-semibold text-base sm:text-lg mt-6">
                Filling Gaps in Your Record
              </h3>
              <p>
                You can pay voluntary NI contributions to fill gaps going back up to six years
                (currently extended to April 2006 under a temporary window). If you have gaps and
                are under 35 qualifying years, filling them is one of the best financial returns
                available anywhere. A single year of voluntary Class 3 contributions costs around
                &pound;907 but adds &pound;328.64 per year to your State Pension for life. If you
                live for 20 years after retirement, that is a return of over &pound;6,500 on a
                &pound;907 investment.
              </p>
            </div>
          </section>

          {/* Section 03: NI Contributions */}
          <section className="space-y-4">
            <div className="border-l-2 border-green-500 pl-4">
              <span className="text-green-400 text-xs font-bold tracking-wider">03</span>
              <h2 className="text-white text-xl sm:text-2xl font-bold mt-1">
                National Insurance Contributions Explained
              </h2>
            </div>
            <div className="space-y-4 text-white text-sm sm:text-base leading-relaxed">
              <p>
                National Insurance is the mechanism that builds your State Pension entitlement.
                There are different classes of NI depending on your employment status, and
                understanding which you pay &mdash; and whether you are paying enough &mdash; is
                crucial.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h4 className="text-white font-semibold text-sm mb-3">NI Classes at a Glance</h4>
                <div className="space-y-3">
                  <div className="border-b border-white/10 pb-3">
                    <p className="text-white font-semibold text-sm">
                      Class 1 &mdash; Employed Workers
                    </p>
                    <p className="text-white text-sm mt-1">
                      Deducted automatically from wages. Employee pays 8% on earnings between
                      &pound;12,570 and &pound;50,270, plus 2% above &pound;50,270. Employer pays
                      13.8% on top. Automatically builds qualifying years.
                    </p>
                  </div>
                  <div className="border-b border-white/10 pb-3">
                    <p className="text-white font-semibold text-sm">
                      Class 2 &mdash; Self-Employed
                    </p>
                    <p className="text-white text-sm mt-1">
                      &pound;3.45 per week (2024/25). Voluntary since April 2024. Builds qualifying
                      years for State Pension. Paid through Self Assessment or direct debit.
                    </p>
                  </div>
                  <div className="border-b border-white/10 pb-3">
                    <p className="text-white font-semibold text-sm">Class 3 &mdash; Voluntary</p>
                    <p className="text-white text-sm mt-1">
                      &pound;17.45 per week (2024/25). For filling gaps in your record. Only worth
                      paying if you are under 35 qualifying years and cannot pay the cheaper Class
                      2.
                    </p>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">
                      Class 4 &mdash; Self-Employed Profits
                    </p>
                    <p className="text-white text-sm mt-1">
                      6% on profits between &pound;12,570 and &pound;50,270, plus 2% above
                      &pound;50,270. This does NOT build qualifying years &mdash; it is a pure tax.
                      You need Class 2 for your pension record.
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="text-white font-semibold text-base sm:text-lg mt-6">
                Employed Electricians
              </h3>
              <p>
                If you work for a firm and earn above the Primary Threshold (&pound;12,570/year),
                your qualifying years are built automatically. You do not need to do anything extra.
                Your employer deducts Class 1 NI from your pay and sends it to HMRC. Even if you
                earn between the Lower Earnings Limit (&pound;6,396) and the Primary Threshold, you
                are treated as having paid NI and still build qualifying years &mdash; a
                lesser-known benefit of being employed.
              </p>

              <h3 className="text-white font-semibold text-base sm:text-lg mt-6">
                Self-Employed Electricians
              </h3>
              <p>
                This is where many tradespeople get caught out. Class 4 NI (paid on profits through
                Self Assessment) does <strong className="text-white">not</strong> count towards your
                State Pension. Only Class 2 builds qualifying years, and since April 2024 it is
                voluntary. You must actively choose to pay it.
              </p>
              <p>
                The best approach is to set up a direct debit for Class 2 NI or tick the box on your
                Self Assessment return. At &pound;3.45 per week (&pound;179.40 per year), it is a
                tiny cost that protects a very valuable entitlement.
              </p>

              <h3 className="text-white font-semibold text-base sm:text-lg mt-6">
                CIS Subcontractors
              </h3>
              <p>
                If you work through the Construction Industry Scheme (CIS), you are treated as
                self-employed for NI purposes even though your contractor deducts 20% or 30% tax
                from your payments. CIS deductions do not include NI contributions. You must pay
                your own Class 2 (and Class 4) NI through Self Assessment. Many CIS subcontractors
                are unaware of this and go years without building qualifying years.
              </p>
            </div>
          </section>

          {/* Inline Check 2 */}
          <InlineCheck
            id="pf-4-1-check2"
            question="A self-employed electrician pays Class 4 NI on their profits through Self Assessment. Does this build qualifying years for the State Pension?"
            options={[
              'Yes, Class 4 counts towards qualifying years',
              'No, only Class 2 NI builds qualifying years for the self-employed',
              'It depends on how much profit they make',
              'Class 4 builds half a qualifying year',
            ]}
            correctIndex={1}
            explanation="Class 4 NI is effectively a profits tax and does NOT count towards your State Pension. Only Class 2 contributions (&pound;3.45/week) build qualifying years for self-employed workers."
          />

          {/* Section 04: Check Your Forecast */}
          <section className="space-y-4">
            <div className="border-l-2 border-blue-500 pl-4">
              <span className="text-blue-400 text-xs font-bold tracking-wider">04</span>
              <h2 className="text-white text-xl sm:text-2xl font-bold mt-1">
                Checking Your State Pension Forecast
              </h2>
            </div>
            <div className="space-y-4 text-white text-sm sm:text-base leading-relaxed">
              <p>
                One of the most valuable free tools available to you is your personal State Pension
                forecast at <strong className="text-white">gov.uk/check-state-pension</strong>. It
                takes about five minutes to check and gives you a personalised picture of your
                pension entitlement.
              </p>

              <h3 className="text-white font-semibold text-base sm:text-lg mt-6">How to Check</h3>
              <ol className="space-y-3 ml-1">
                <li className="flex items-start gap-3">
                  <span className="bg-rose-500/20 text-rose-400 text-xs font-bold px-2 py-1 rounded flex-shrink-0">
                    1
                  </span>
                  <span className="text-white">
                    Go to <strong className="text-white">gov.uk/check-state-pension</strong> and
                    sign in with your Government Gateway ID (or create one &mdash; you will need
                    your National Insurance number and a form of ID)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-rose-500/20 text-rose-400 text-xs font-bold px-2 py-1 rounded flex-shrink-0">
                    2
                  </span>
                  <span className="text-white">
                    View your forecast &mdash; it shows the weekly amount you are currently on track
                    to receive
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-rose-500/20 text-rose-400 text-xs font-bold px-2 py-1 rounded flex-shrink-0">
                    3
                  </span>
                  <span className="text-white">
                    Check your NI record &mdash; it lists every tax year and whether it counts as a
                    full year, partial year, or gap
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-rose-500/20 text-rose-400 text-xs font-bold px-2 py-1 rounded flex-shrink-0">
                    4
                  </span>
                  <span className="text-white">
                    Identify any gaps &mdash; you may be able to fill them with voluntary
                    contributions
                  </span>
                </li>
              </ol>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <h4 className="text-white font-semibold text-sm mb-2">Action Point</h4>
                <p className="text-white text-sm leading-relaxed">
                  If you have not already checked your State Pension forecast, do it this week. It
                  is free, takes five minutes, and could save you thousands of pounds in retirement.
                  Pay particular attention to any &ldquo;gap&rdquo; years &mdash; these are years
                  where you did not pay enough NI and you may be able to fill them cheaply.
                </p>
              </div>

              <h3 className="text-white font-semibold text-base sm:text-lg mt-6">
                What Your Forecast Shows
              </h3>
              <p>Your forecast will show three key pieces of information:</p>
              <ul className="space-y-2 ml-1">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">&bull;</span>
                  <span className="text-white">
                    <strong className="text-white">Your forecast amount</strong> &mdash; the weekly
                    pension you are on track to receive based on your current NI record, assuming
                    you continue contributing until State Pension age
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">&bull;</span>
                  <span className="text-white">
                    <strong className="text-white">Your State Pension date</strong> &mdash; the
                    earliest date you can claim
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">&bull;</span>
                  <span className="text-white">
                    <strong className="text-white">How to improve it</strong> &mdash; suggestions
                    for filling gaps or deferring to increase your amount
                  </span>
                </li>
              </ul>
              <p>
                You can also view your full NI record, which lists every tax year since you started
                working. Look for years marked as &ldquo;Year is not full&rdquo; &mdash; these are
                potential gaps you could fill. The site tells you exactly how much it would cost to
                fill each gap.
              </p>

              <h3 className="text-white font-semibold text-base sm:text-lg mt-6">
                Deferring Your State Pension
              </h3>
              <p>
                You do not have to claim the State Pension when you reach State Pension age. If you
                defer, your pension increases by 1% for every nine weeks you delay &mdash; roughly
                5.8% per year. If you can afford to keep working and do not need the income
                immediately, deferring can provide a significantly higher weekly amount when you do
                eventually claim.
              </p>
              <p>
                For example, deferring for two years would increase your weekly pension from
                &pound;221.20 to approximately &pound;246.86 &mdash; an extra &pound;1,334 per year
                for the rest of your life. Whether this makes sense depends on your health, other
                income, and personal circumstances.
              </p>
            </div>
          </section>

          {/* Section 05: State Pension Age */}
          <section className="space-y-4">
            <div className="border-l-2 border-purple-500 pl-4">
              <span className="text-purple-400 text-xs font-bold tracking-wider">05</span>
              <h2 className="text-white text-xl sm:text-2xl font-bold mt-1">
                State Pension Age &mdash; When Can You Claim?
              </h2>
            </div>
            <div className="space-y-4 text-white text-sm sm:text-base leading-relaxed">
              <p>
                The State Pension age (SPA) is the earliest age at which you can claim the State
                Pension. It has risen significantly over the past decade and is set to rise further.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h4 className="text-white font-semibold text-sm mb-3">
                  State Pension Age Timeline
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-1 rounded flex-shrink-0">
                      Now
                    </span>
                    <span className="text-white text-sm">
                      <strong className="text-white">66</strong> for both men and women (since
                      October 2020)
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-amber-500/20 text-amber-400 text-xs font-bold px-2 py-1 rounded flex-shrink-0">
                      2026&ndash;2028
                    </span>
                    <span className="text-white text-sm">
                      Rising to <strong className="text-white">67</strong> (phased in between May
                      2026 and March 2028)
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-rose-500/20 text-rose-400 text-xs font-bold px-2 py-1 rounded flex-shrink-0">
                      Under review
                    </span>
                    <span className="text-white text-sm">
                      Rise to <strong className="text-white">68</strong> was originally planned for
                      2044&ndash;2046 but is under review &mdash; could be brought forward to
                      2035&ndash;2036
                    </span>
                  </div>
                </div>
              </div>

              <p>
                You can check your exact State Pension age at
                <strong className="text-white"> gov.uk/state-pension-age</strong> by entering your
                date of birth. This is especially important if you were born between 1960 and 1978,
                as you are most affected by the upcoming changes.
              </p>

              <h3 className="text-white font-semibold text-base sm:text-lg mt-6">
                Why This Matters for Electricians
              </h3>
              <p>
                Electrical work is physically demanding. Crawling through loft spaces, lifting heavy
                cable drums, and working in confined spaces takes a toll on your body. Many
                electricians find it increasingly difficult to do the physical aspects of the job in
                their late 50s and 60s. If the State Pension age rises to 68, that means potentially
                working until 68 before you receive any State Pension &mdash; or finding the income
                to bridge the gap if you stop physical work earlier.
              </p>
              <p>
                This is one of the strongest arguments for building private pension savings
                alongside the State Pension. A private pension can be accessed from age 55 (rising
                to 57 from 2028), giving you a bridge between stopping physical work and reaching
                State Pension age.
              </p>
            </div>
          </section>

          {/* Inline Check 3 */}
          <InlineCheck
            id="pf-4-1-check3"
            question="The State Pension age is currently 66. When is it due to rise to 67?"
            options={['2024 to 2025', '2026 to 2028', '2030 to 2032', '2044 to 2046']}
            correctIndex={1}
            explanation="The State Pension age is being phased up to 67 between May 2026 and March 2028. A further rise to 68 is under review and could be brought forward from the original 2044-2046 timeline."
          />

          {/* Section 06: PLSA Retirement Living Standards */}
          <section className="space-y-4">
            <div className="border-l-2 border-rose-500 pl-4">
              <span className="text-rose-400 text-xs font-bold tracking-wider">06</span>
              <h2 className="text-white text-xl sm:text-2xl font-bold mt-1">
                How Much Is Enough? The PLSA Retirement Living Standards
              </h2>
            </div>
            <div className="space-y-4 text-white text-sm sm:text-base leading-relaxed">
              <p>
                The Pensions and Lifetime Savings Association (PLSA) publishes
                <strong className="text-white"> Retirement Living Standards</strong> that show how
                much income you need in retirement for different lifestyles. These are based on real
                research into what people actually spend and are a useful benchmark.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h4 className="text-white font-semibold text-sm mb-3">
                  PLSA Standards &mdash; Single Person (per year)
                </h4>
                <div className="space-y-4">
                  <div className="border-b border-white/10 pb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white font-semibold text-sm">Minimum</span>
                      <span className="text-rose-400 font-bold">&pound;12,800</span>
                    </div>
                    <p className="text-white text-sm">
                      Covers basic needs. Budget supermarket shopping, holiday in the UK, limited
                      eating out. No car &mdash; public transport only.
                    </p>
                  </div>
                  <div className="border-b border-white/10 pb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white font-semibold text-sm">Moderate</span>
                      <span className="text-amber-400 font-bold">&pound;23,300</span>
                    </div>
                    <p className="text-white text-sm">
                      More financial security and flexibility. Two-week European holiday, eating out
                      a few times a month, a car, some gym or hobby spending.
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white font-semibold text-sm">Comfortable</span>
                      <span className="text-green-400 font-bold">&pound;37,300</span>
                    </div>
                    <p className="text-white text-sm">
                      Financial freedom. Regular beauty or grooming treatments, theatre trips, a
                      three-week long-haul holiday, helping family financially, a newer car.
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="text-white font-semibold text-base sm:text-lg mt-6">
                The Gap the State Pension Leaves
              </h3>
              <p>
                The full State Pension provides around &pound;11,500 per year. That is slightly
                below the PLSA &ldquo;minimum&rdquo; standard of &pound;12,800. For a
                &ldquo;moderate&rdquo; retirement at &pound;23,300, you need an additional
                &pound;11,800 per year from other sources. For a &ldquo;comfortable&rdquo;
                retirement at &pound;37,300, you need an extra &pound;25,800 per year.
              </p>
              <p>
                That extra income must come from workplace pensions, private pensions, savings,
                investments, rental income, or continuing to work part-time. The State Pension is a
                foundation &mdash; not the whole building.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <h4 className="text-white font-semibold text-sm mb-2">Real-World Example</h4>
                <p className="text-white text-sm leading-relaxed">
                  Dave is a 40-year-old self-employed electrician. He wants a &ldquo;moderate&rdquo;
                  retirement from age 66. The State Pension will cover &pound;11,500/year, leaving a
                  gap of &pound;11,800/year. Using the 4% rule (covered in Section 4), he needs a
                  pension pot of around &pound;295,000 to generate that income. That means saving
                  roughly &pound;500&ndash;&pound;600 per month for the next 26 years, assuming
                  typical investment growth. Without planning now, Dave faces a
                  &ldquo;minimum&rdquo; retirement &mdash; or working into his late 60s doing
                  physical labour.
                </p>
              </div>

              <h3 className="text-white font-semibold text-base sm:text-lg mt-6">
                Couples vs Singles
              </h3>
              <p>
                The PLSA standards are lower for couples because of shared housing costs. Two State
                Pensions together provide around &pound;23,000 &mdash; enough for a
                &ldquo;minimum&rdquo; couple standard. But many electricians are the main or sole
                earner, so it is wise to plan based on your own pension provision rather than
                assuming a partner&rsquo;s income.
              </p>

              <h3 className="text-white font-semibold text-base sm:text-lg mt-6">Key Takeaway</h3>
              <p>
                The State Pension is valuable but not sufficient on its own. Understanding your
                forecast, protecting your qualifying years, and recognising the gap between the
                State Pension and the retirement you want is the first step to taking action. In the
                next sections, we will look at how workplace and private pensions can fill that gap.
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="space-y-4">
            <h2 className="text-white text-xl sm:text-2xl font-bold">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">
                  Can I claim the State Pension and still work?
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  Yes. You can claim the State Pension and continue working with no earnings limit.
                  You will not pay National Insurance on your wages once you reach State Pension
                  age, though you will still pay income tax if your total income exceeds the
                  Personal Allowance.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">
                  What happens to my State Pension if I move abroad?
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  You can claim the UK State Pension from anywhere in the world. However, your
                  pension is only increased each year if you live in the UK, the European Economic
                  Area, Switzerland, or a country with a reciprocal agreement. In some countries
                  (including Australia and Canada), your pension is frozen at the rate when you left
                  or when you first claimed.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">
                  I have been self-employed for years and never paid Class 2 NI. Can I backdate?
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  You can normally fill gaps going back six years. There is currently an extended
                  deadline allowing you to fill gaps back to April 2006, but this window will not
                  remain open indefinitely. Contact HMRC&rsquo;s Future Pension Centre on 0800 731
                  0175 to discuss your options. Filling gaps at Class 2 rates (&pound;3.45/week) is
                  almost always worthwhile.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">
                  Is the triple lock safe? Could the government scrap it?
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  The triple lock is a political commitment, not legislation. It was temporarily
                  suspended in 2022/23 (the &ldquo;double lock&rdquo; year due to pandemic earnings
                  distortions). As of 2024, all major parties support maintaining it. However, it is
                  expensive and there are no guarantees it will survive long term. For planning
                  purposes, assuming the State Pension at least keeps pace with inflation is
                  prudent.
                </p>
              </div>
            </div>
          </section>

          {/* Quiz */}
          <section>
            <Quiz questions={quizQuestions} title="State Pension Basics &mdash; Quick Quiz" />
          </section>

          {/* Bottom Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
            <Button
              variant="ghost"
              size="lg"
              className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../pf-module-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Module
              </Link>
            </Button>
            <Button
              size="lg"
              className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../pf-module-4-section-2">
                Workplace Pensions &amp; Auto-Enrolment
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </div>
  );
}
