import { ArrowLeft, Building, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quizQuestions = [
  {
    id: 1,
    question:
      'Under auto-enrolment legislation, what is the minimum total pension contribution on qualifying earnings?',
    options: ['5%', '6%', '8%', '10%'],
    correctAnswer: 2,
    explanation:
      'The minimum total contribution is 8% of qualifying earnings, split as a minimum of 3% from the employer and 5% from the employee.',
  },
  {
    id: 2,
    question: 'Which Act of Parliament introduced automatic enrolment into workplace pensions?',
    options: [
      'Finance Act 2004',
      'Pensions Act 2008',
      'Pensions Act 2014',
      'Employment Rights Act 1996',
    ],
    correctAnswer: 1,
    explanation:
      'The Pensions Act 2008 introduced automatic enrolment. It was phased in from 2012 for large employers, with all employers included by 2018.',
  },
  {
    id: 3,
    question: 'What are "qualifying earnings" for auto-enrolment contributions?',
    options: [
      'Your total gross pay',
      'Your take-home pay after tax',
      'Earnings between &pound;6,240 and &pound;50,270 per year (2024/25)',
      'Your basic salary excluding overtime',
    ],
    correctAnswer: 2,
    explanation:
      'Qualifying earnings are the band of earnings between the lower limit (&pound;6,240) and the upper limit (&pound;50,270) for 2024/25. Contributions are calculated on this band, not your full salary.',
  },
  {
    id: 4,
    question: 'What is the JIB/ECA default pension scheme for electricians?',
    options: ['NEST', "The People's Pension", 'Scottish Widows', 'Royal London'],
    correctAnswer: 1,
    explanation:
      "The Joint Industry Board (JIB) and the Electrical Contractors' Association (ECA) use The People's Pension as their default workplace pension scheme for the electrical industry.",
  },
  {
    id: 5,
    question: 'If an employee opts out of auto-enrolment, what happens?',
    options: [
      'They can never rejoin',
      'Their employer must re-enrol them roughly every three years',
      'They receive the employer contribution as extra salary instead',
      'Nothing further happens unless they request to rejoin',
    ],
    correctAnswer: 1,
    explanation:
      "Employers must re-enrol opted-out workers approximately every three years (on the employer's re-enrolment date). The worker can opt out again, but this cyclical process is designed to catch people who may change their mind.",
  },
  {
    id: 6,
    question: 'What is the annual management charge (AMC) cap for NEST?',
    options: ['0.1%', '0.3%', '0.5%', '0.75%'],
    correctAnswer: 1,
    explanation:
      'NEST charges 0.3% annual management charge plus a 1.8% contribution charge on each payment in. The 0.3% AMC is competitive with most workplace pension providers.',
  },
  {
    id: 7,
    question:
      'What is the effective rate of "return" from the employer\'s minimum 3% contribution if you earn &pound;30,000 per year?',
    options: [
      'You get an immediate 37.5% boost on your own contribution',
      'You get an immediate 60% boost on your own contribution',
      'You get an immediate 100% boost on your own contribution',
      'There is no meaningful boost',
    ],
    correctAnswer: 1,
    explanation:
      'If you contribute 5% and your employer adds 3%, the employer contribution is 60% of what you put in. This is an immediate 60% return before any investment growth &mdash; no other savings product offers this.',
  },
  {
    id: 8,
    question: 'At what age are workers first eligible for auto-enrolment?',
    options: ['16', '18', '21', '22'],
    correctAnswer: 3,
    explanation:
      'Auto-enrolment applies to workers aged 22 or over who earn above &pound;10,000 per year. Workers aged 16-21 can opt in and still receive employer contributions, but they are not automatically enrolled.',
  },
];

export default function PFModule4Section2() {
  useSEO({
    title:
      'Workplace Pensions & Auto-Enrolment | Pensions & Retirement Planning | Personal Finance',
    description:
      'Pensions Act 2008, minimum contributions, JIB pension scheme, NEST, opting out rules, and employer duties for UK electricians.',
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
                <Building className="h-6 w-6 text-rose-400" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-1">
                  <span className="text-rose-400 text-xs font-semibold">MODULE 4</span>
                  <span className="text-white text-xs">&bull;</span>
                  <span className="text-white text-xs">SECTION 2</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                  Workplace Pensions &amp; Auto-Enrolment
                </h1>
              </div>
            </div>
            <p className="text-white text-sm sm:text-base leading-relaxed">
              Since 2012, every UK employer must automatically enrol eligible workers into a
              workplace pension. For employed electricians, this is one of the most powerful tools
              for building retirement savings &mdash; because your employer is legally required to
              contribute alongside you.
            </p>
          </div>

          {/* Quick Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-rose-500/5 border-l-2 border-rose-500/50 p-4 rounded-r-lg">
              <h3 className="text-white font-semibold text-sm mb-2">In 30 Seconds</h3>
              <p className="text-white text-sm leading-relaxed">
                Every employer must auto-enrol workers aged 22+ earning over &pound;10,000 into a
                workplace pension. The minimum total contribution is 8% of qualifying earnings (3%
                employer + 5% employee). The JIB scheme uses The People&rsquo;s Pension. Opting out
                means refusing free money. If you employ staff yourself, you have legal duties too.
              </p>
            </div>
            <div className="bg-rose-500/5 border-l-2 border-rose-500/50 p-4 rounded-r-lg">
              <h3 className="text-white font-semibold text-sm mb-2">Why It Matters</h3>
              <p className="text-white text-sm leading-relaxed">
                Your employer&rsquo;s 3% contribution is free money on top of your salary. Combined
                with tax relief, every &pound;1 you contribute becomes roughly &pound;1.60 in your
                pension pot before any investment growth. No other savings vehicle offers this.
                Opting out throws away thousands of pounds over a career.
              </p>
            </div>
          </div>

          {/* Learning Outcomes */}
          <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
            <h2 className="text-white font-bold text-lg mb-4">What You Will Learn</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'How the Pensions Act 2008 changed workplace pensions forever',
                'The minimum contribution rates and how qualifying earnings work',
                'The JIB/ECA pension scheme and how it applies to electricians',
                'What NEST is and how default workplace schemes operate',
                'Why opting out is almost always the wrong decision',
                'Your legal duties if you employ apprentices or other staff',
              ].map((outcome, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white text-sm leading-relaxed">{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 01: The Pensions Act 2008 */}
          <section className="space-y-4">
            <div className="border-l-2 border-rose-500 pl-4">
              <span className="text-rose-400 text-xs font-bold tracking-wider">01</span>
              <h2 className="text-white text-xl sm:text-2xl font-bold mt-1">
                The Pensions Act 2008 &mdash; A Game Changer
              </h2>
            </div>
            <div className="space-y-4 text-white text-sm sm:text-base leading-relaxed">
              <p>
                Before 2012, saving into a workplace pension was entirely voluntary. The result was
                predictable: millions of people reached retirement with little or no private pension
                savings, relying entirely on the State Pension. The Pensions Act 2008 changed this
                by introducing <strong className="text-white">automatic enrolment</strong> &mdash;
                requiring every employer to enrol eligible workers into a workplace pension and
                contribute to it.
              </p>
              <p>
                The rollout was phased over six years. Large employers (250+ staff) went first in
                October 2012. Medium employers followed, and by February 2018 every employer &mdash;
                including sole traders with one member of staff &mdash; was included. Today, over 10
                million people are saving into a workplace pension who were not before.
              </p>

              <h3 className="text-white font-semibold text-base sm:text-lg mt-6">
                Who Is Eligible?
              </h3>
              <p>
                Automatic enrolment applies to &ldquo;eligible jobholders&rdquo; who meet all three
                criteria:
              </p>
              <ul className="space-y-2 ml-1">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">&bull;</span>
                  <span className="text-white">Aged 22 or over</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">&bull;</span>
                  <span className="text-white">Under State Pension age</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">&bull;</span>
                  <span className="text-white">
                    Earning above &pound;10,000 per year (the &ldquo;earnings trigger&rdquo;)
                  </span>
                </li>
              </ul>
              <p>
                Workers aged 16&ndash;21 or earning between &pound;6,240 and &pound;10,000 are
                &ldquo;non-eligible jobholders&rdquo; &mdash; they can opt in to the workplace
                pension and receive employer contributions, but they are not automatically enrolled.
                If you are an apprentice under 22, you should strongly consider opting in.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <h4 className="text-white font-semibold text-sm mb-2">
                  Apprentices &mdash; Do Not Miss Out
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Many electrical apprentices are under 22 and not automatically enrolled. But you
                  have the right to opt in and receive employer contributions from day one. At 18,
                  starting to save even small amounts gives you a massive head start thanks to
                  compound growth over 40+ years. Ask your employer about opting in &mdash; they
                  cannot refuse.
                </p>
              </div>
            </div>
          </section>

          {/* Section 02: Minimum Contributions */}
          <section className="space-y-4">
            <div className="border-l-2 border-amber-500 pl-4">
              <span className="text-amber-400 text-xs font-bold tracking-wider">02</span>
              <h2 className="text-white text-xl sm:text-2xl font-bold mt-1">
                Minimum Contributions &amp; Qualifying Earnings
              </h2>
            </div>
            <div className="space-y-4 text-white text-sm sm:text-base leading-relaxed">
              <p>
                The law sets minimum contribution rates. Both you and your employer must contribute
                a percentage of your <strong className="text-white">qualifying earnings</strong>.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h4 className="text-white font-semibold text-sm mb-3">
                  Minimum Contribution Rates (2024/25)
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-white text-sm font-semibold">Employer minimum</span>
                    <span className="text-rose-400 font-bold">3%</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-white text-sm font-semibold">Employee minimum</span>
                    <span className="text-rose-400 font-bold">5%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm font-semibold">Total minimum</span>
                    <span className="text-rose-400 font-bold">8%</span>
                  </div>
                </div>
              </div>

              <h3 className="text-white font-semibold text-base sm:text-lg mt-6">
                What Are Qualifying Earnings?
              </h3>
              <p>
                Contributions are not calculated on your full salary. They are calculated on your
                <strong className="text-white"> qualifying earnings</strong> &mdash; the band of
                earnings between a lower limit and an upper limit set by the government each year.
              </p>
              <p>
                For 2024/25, qualifying earnings are between{' '}
                <strong className="text-white">&pound;6,240</strong> and
                <strong className="text-white"> &pound;50,270</strong> per year. This means:
              </p>
              <ul className="space-y-2 ml-1">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">&bull;</span>
                  <span className="text-white">
                    The first &pound;6,240 of your earnings does not attract pension contributions
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">&bull;</span>
                  <span className="text-white">
                    Earnings above &pound;50,270 are also excluded (though some employers contribute
                    on full salary instead)
                  </span>
                </li>
              </ul>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h4 className="text-white font-semibold text-sm mb-2">Worked Example</h4>
                <p className="text-white text-sm leading-relaxed">
                  Sarah is an employed electrician earning &pound;35,000 per year. Her qualifying
                  earnings are &pound;35,000 &minus; &pound;6,240 ={' '}
                  <strong className="text-white">&pound;28,760</strong>.
                </p>
                <div className="mt-3 space-y-2">
                  <p className="text-white text-sm">
                    Employer contribution (3%): &pound;28,760 &times; 3% ={' '}
                    <strong className="text-white">&pound;862.80/year</strong>
                  </p>
                  <p className="text-white text-sm">
                    Employee contribution (5%): &pound;28,760 &times; 5% ={' '}
                    <strong className="text-white">&pound;1,438.00/year</strong>
                  </p>
                  <p className="text-white text-sm">
                    Total going into Sarah&rsquo;s pension:{' '}
                    <strong className="text-white">&pound;2,300.80/year</strong>
                  </p>
                  <p className="text-white text-sm">
                    But Sarah&rsquo;s actual cost after tax relief (basic rate): &pound;1,438
                    &minus; 20% tax relief ={' '}
                    <strong className="text-white">&pound;1,150.40/year</strong>{' '}
                    (&pound;95.87/month)
                  </p>
                </div>
              </div>

              <p>
                In this example, Sarah pays &pound;95.87 per month from her take-home pay, but
                &pound;191.73 per month goes into her pension (including employer contribution and
                tax relief). That is effectively a 100% return before any investment growth. No
                savings account or ISA can match this.
              </p>

              <h3 className="text-white font-semibold text-base sm:text-lg mt-6">
                Going Beyond the Minimum
              </h3>
              <p>
                The 8% minimum is just that &mdash; a minimum. Many pension experts recommend saving
                12&ndash;15% of salary for a comfortable retirement. Some employers offer to match
                higher contributions (for example, &ldquo;we will match whatever you put in up to
                6%&rdquo;). Always check if your employer offers this and take full advantage
                &mdash; it is the best pay rise you can give yourself.
              </p>
            </div>
          </section>

          {/* Inline Check 1 */}
          <InlineCheck
            id="pf-4-2-check1"
            question="An electrician earns &pound;30,000 per year. What are their qualifying earnings for auto-enrolment in 2024/25?"
            options={['&pound;30,000', '&pound;23,760', '&pound;19,730', '&pound;26,240']}
            correctIndex={1}
            explanation="Qualifying earnings = &pound;30,000 minus the lower limit of &pound;6,240 = &pound;23,760. This is the amount on which the 3% employer and 5% employee contributions are calculated."
          />

          {/* Section 03: JIB Pension Scheme */}
          <section className="space-y-4">
            <div className="border-l-2 border-green-500 pl-4">
              <span className="text-green-400 text-xs font-bold tracking-wider">03</span>
              <h2 className="text-white text-xl sm:text-2xl font-bold mt-1">
                The JIB/ECA Pension Scheme
              </h2>
            </div>
            <div className="space-y-4 text-white text-sm sm:text-base leading-relaxed">
              <p>
                The electrical industry has its own pension arrangement through the
                <strong className="text-white"> Joint Industry Board (JIB)</strong> and the
                <strong className="text-white">
                  {' '}
                  Electrical Contractors&rsquo; Association (ECA)
                </strong>
                . The default pension provider for the electrical industry is
                <strong className="text-white"> The People&rsquo;s Pension</strong>, managed by
                B&amp;CE.
              </p>

              <h3 className="text-white font-semibold text-base sm:text-lg mt-6">How It Works</h3>
              <p>
                If you work for a JIB-registered contractor, your employer should automatically
                enrol you into The People&rsquo;s Pension (or an equivalent qualifying scheme). The
                JIB rates often exceed the statutory minimum &mdash; the standard JIB contribution
                rates are typically higher than the basic 8% total.
              </p>
              <p>The People&rsquo;s Pension is a defined contribution (DC) scheme. This means:</p>
              <ul className="space-y-2 ml-1">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">&bull;</span>
                  <span className="text-white">
                    Contributions from you and your employer go into a personal pot
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">&bull;</span>
                  <span className="text-white">
                    Your pot is invested in a default fund (or you can choose your own)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">&bull;</span>
                  <span className="text-white">
                    The amount you receive at retirement depends on how much was contributed and how
                    investments performed
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">&bull;</span>
                  <span className="text-white">
                    There are no guarantees about the final amount (unlike the old defined benefit
                    schemes)
                  </span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <h4 className="text-white font-semibold text-sm mb-2">Changing Employers?</h4>
                <p className="text-white text-sm leading-relaxed">
                  If you move between JIB contractors, your People&rsquo;s Pension pot stays with
                  you &mdash; your new employer simply starts contributing to the same account. If
                  you move to a non-JIB employer, your old pot remains invested and your new
                  employer will enrol you into their own scheme. Over a career, you may end up with
                  several pension pots from different employers. Keep track of all of them.
                </p>
              </div>

              <h3 className="text-white font-semibold text-base sm:text-lg mt-6">
                Checking Your People&rsquo;s Pension Account
              </h3>
              <p>
                You can log in to your People&rsquo;s Pension account online at
                <strong className="text-white"> thepeoplespension.co.uk</strong>. Your online
                account shows:
              </p>
              <ul className="space-y-2 ml-1">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">&bull;</span>
                  <span className="text-white">Your current pot value</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">&bull;</span>
                  <span className="text-white">
                    Contributions received (yours and your employer&rsquo;s)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">&bull;</span>
                  <span className="text-white">Investment performance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">&bull;</span>
                  <span className="text-white">
                    A retirement forecast based on current contribution levels
                  </span>
                </li>
              </ul>
              <p>
                If you have never logged in, do so this week. Knowing how much is in your pot is the
                starting point for any retirement plan.
              </p>
            </div>
          </section>

          {/* Section 04: NEST */}
          <section className="space-y-4">
            <div className="border-l-2 border-blue-500 pl-4">
              <span className="text-blue-400 text-xs font-bold tracking-wider">04</span>
              <h2 className="text-white text-xl sm:text-2xl font-bold mt-1">
                NEST &mdash; The Government-Backed Default Scheme
              </h2>
            </div>
            <div className="space-y-4 text-white text-sm sm:text-base leading-relaxed">
              <p>
                <strong className="text-white">NEST</strong> (the National Employment Savings Trust)
                was set up by the government specifically for auto-enrolment. It is designed as a
                no-frills, low-cost default pension for employers who do not have their own scheme.
                Many smaller electrical contractors and sole traders with employees use NEST.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h4 className="text-white font-semibold text-sm mb-3">NEST Key Features</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="bg-rose-500/20 text-rose-400 text-xs font-bold px-2 py-1 rounded flex-shrink-0">
                      AMC
                    </span>
                    <span className="text-white text-sm">
                      0.3% annual management charge &mdash; competitive with most workplace pensions
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-amber-500/20 text-amber-400 text-xs font-bold px-2 py-1 rounded flex-shrink-0">
                      Fee
                    </span>
                    <span className="text-white text-sm">
                      1.8% contribution charge on each payment in (this is unique to NEST and
                      reduces over time as the scheme grows)
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-1 rounded flex-shrink-0">
                      Default
                    </span>
                    <span className="text-white text-sm">
                      NEST Retirement Date Fund &mdash; automatically adjusts investments as you
                      approach retirement (more cautious as you get older)
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-blue-500/20 text-blue-400 text-xs font-bold px-2 py-1 rounded flex-shrink-0">
                      Access
                    </span>
                    <span className="text-white text-sm">
                      Every employer has a duty to accept NEST &mdash; it cannot refuse any
                      employer. This is its key advantage for the self-employed with staff.
                    </span>
                  </div>
                </div>
              </div>

              <h3 className="text-white font-semibold text-base sm:text-lg mt-6">
                NEST vs Other Workplace Pensions
              </h3>
              <p>
                NEST is perfectly adequate for most workers, but it is not necessarily the best
                option. Some differences worth knowing:
              </p>
              <ul className="space-y-2 ml-1">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">&bull;</span>
                  <span className="text-white">
                    The 1.8% contribution charge means your money is slightly reduced on the way in
                    (every &pound;100 contributed becomes &pound;98.20 in your pot)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">&bull;</span>
                  <span className="text-white">
                    NEST had an annual contribution limit of &pound;4,900 until April 2017 &mdash;
                    this has been removed, but some people still believe it exists
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">&bull;</span>
                  <span className="text-white">
                    Investment fund choice is more limited than SIPPs or larger workplace schemes
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">&bull;</span>
                  <span className="text-white">
                    The 0.3% AMC is competitive &mdash; some workplace pensions charge 0.5% or more
                  </span>
                </li>
              </ul>
              <p>
                If your employer uses NEST, there is no reason to opt out. The contribution charge
                is a minor drag compared to the massive benefit of employer contributions and tax
                relief.
              </p>
            </div>
          </section>

          {/* Inline Check 2 */}
          <InlineCheck
            id="pf-4-2-check2"
            question="What are the two charges that NEST levies on pension members?"
            options={[
              '0.5% AMC plus a &pound;10 annual fee',
              '0.3% AMC plus a 1.8% charge on each contribution',
              '0.75% AMC with no contribution charge',
              '1% AMC plus a 0.5% exit fee',
            ]}
            correctIndex={1}
            explanation="NEST charges a 0.3% annual management charge (AMC) on your total pot and a 1.8% contribution charge on each payment going in. The contribution charge is unique to NEST but the overall cost remains competitive."
          />

          {/* Section 05: Opting Out */}
          <section className="space-y-4">
            <div className="border-l-2 border-purple-500 pl-4">
              <span className="text-purple-400 text-xs font-bold tracking-wider">05</span>
              <h2 className="text-white text-xl sm:text-2xl font-bold mt-1">
                Opting Out &mdash; Why It Almost Never Makes Sense
              </h2>
            </div>
            <div className="space-y-4 text-white text-sm sm:text-base leading-relaxed">
              <p>
                You have the legal right to opt out of your workplace pension within one month of
                being enrolled. If you opt out within this window, all contributions are refunded.
                But opting out is almost always a poor financial decision.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <h4 className="text-white font-semibold text-sm mb-2">The Cost of Opting Out</h4>
                <p className="text-white text-sm leading-relaxed">
                  If you earn &pound;30,000 and opt out of your workplace pension, you lose your
                  employer&rsquo;s 3% contribution on qualifying earnings: &pound;712.80 per year.
                  Over a 30-year career, that is &pound;21,384 in employer contributions alone
                  &mdash; before any investment growth. With typical investment returns, those
                  contributions could have grown to &pound;40,000&ndash;&pound;60,000. You also lose
                  the 20% tax relief on your own contributions. Opting out is refusing free money.
                </p>
              </div>

              <h3 className="text-white font-semibold text-base sm:text-lg mt-6">
                Common Reasons People Opt Out (and Why They Are Wrong)
              </h3>
              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-white font-semibold text-sm mb-1">
                    &ldquo;I cannot afford it right now&rdquo;
                  </p>
                  <p className="text-white text-sm leading-relaxed">
                    At minimum contributions on &pound;30,000, your actual take-home pay reduction
                    is around &pound;75 per month after tax relief. Meanwhile, &pound;150+ per month
                    goes into your pension. If you genuinely cannot afford &pound;75 per month, the
                    answer is to address your spending or income &mdash; not to sacrifice your
                    retirement.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-white font-semibold text-sm mb-1">
                    &ldquo;I will sort my pension out later&rdquo;
                  </p>
                  <p className="text-white text-sm leading-relaxed">
                    Every year you delay costs you significantly due to lost compound growth.
                    &pound;100 invested at 25 is worth roughly &pound;1,000 at 65 (at 6% annual
                    growth). &pound;100 invested at 45 is worth only &pound;320 at 65. Time is the
                    most powerful factor in pension savings &mdash; and you cannot buy it back.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-white font-semibold text-sm mb-1">
                    &ldquo;I do not trust pensions&rdquo;
                  </p>
                  <p className="text-white text-sm leading-relaxed">
                    Workplace pensions are regulated by The Pensions Regulator and protected by the
                    Financial Services Compensation Scheme (FSCS). Your money is held in trust,
                    separate from your employer&rsquo;s business. If your employer goes bust, your
                    pension pot is protected. Distrust of pensions is usually based on outdated
                    information about old-style defined benefit schemes.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-white font-semibold text-sm mb-1">
                    &ldquo;I am going self-employed soon anyway&rdquo;
                  </p>
                  <p className="text-white text-sm leading-relaxed">
                    Even if you leave employment next month, any contributions already made are
                    yours to keep. Your pot remains invested and grows until you access it. There is
                    no minimum period &mdash; even one month of contributions with employer match is
                    better than nothing.
                  </p>
                </div>
              </div>

              <h3 className="text-white font-semibold text-base sm:text-lg mt-6">
                Re-Enrolment Every Three Years
              </h3>
              <p>
                If you do opt out, your employer is legally required to re-enrol you approximately
                every three years (on their re-enrolment date). You can opt out again, but the
                process is designed to prompt you to reconsider. Each time, you forfeit the
                contributions that would have been made in the intervening years.
              </p>
            </div>
          </section>

          {/* Inline Check 3 */}
          <InlineCheck
            id="pf-4-2-check3"
            question="If you opt out of your workplace pension, what happens to your employer&rsquo;s 3% contribution?"
            options={[
              'It is paid to you as extra salary instead',
              'It is saved in a separate account for you',
              'It is not paid at all &mdash; the employer keeps it',
              'It is donated to NEST on your behalf',
            ]}
            correctIndex={2}
            explanation="If you opt out, your employer does not have to pay their contribution at all. The money is not redirected to you &mdash; it simply is not paid. You lose the employer contribution entirely."
          />

          {/* Section 06: Employer Duties */}
          <section className="space-y-4">
            <div className="border-l-2 border-rose-500 pl-4">
              <span className="text-rose-400 text-xs font-bold tracking-wider">06</span>
              <h2 className="text-white text-xl sm:text-2xl font-bold mt-1">
                Employer Duties &mdash; When You Hire Staff
              </h2>
            </div>
            <div className="space-y-4 text-white text-sm sm:text-base leading-relaxed">
              <p>
                Many electricians eventually take on apprentices, labourers, or other electricians.
                The moment you employ someone &mdash; even one person &mdash; you have legal duties
                under auto-enrolment legislation. Non-compliance can result in significant fines
                from The Pensions Regulator.
              </p>

              <h3 className="text-white font-semibold text-base sm:text-lg mt-6">
                Your Legal Obligations as an Employer
              </h3>
              <ol className="space-y-3 ml-1">
                <li className="flex items-start gap-3">
                  <span className="bg-rose-500/20 text-rose-400 text-xs font-bold px-2 py-1 rounded flex-shrink-0">
                    1
                  </span>
                  <span className="text-white">
                    <strong className="text-white">Choose a pension scheme</strong> &mdash; NEST
                    accepts every employer. The People&rsquo;s Pension, NOW: Pensions, and others
                    are alternatives. Your accountant can advise.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-rose-500/20 text-rose-400 text-xs font-bold px-2 py-1 rounded flex-shrink-0">
                    2
                  </span>
                  <span className="text-white">
                    <strong className="text-white">Assess your staff</strong> &mdash; determine who
                    is an eligible jobholder (22+, earning 10k+), who is a non-eligible jobholder,
                    and who is an entitled worker
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-rose-500/20 text-rose-400 text-xs font-bold px-2 py-1 rounded flex-shrink-0">
                    3
                  </span>
                  <span className="text-white">
                    <strong className="text-white">Enrol eligible workers</strong> &mdash; within
                    six weeks of their start date (or the date they become eligible)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-rose-500/20 text-rose-400 text-xs font-bold px-2 py-1 rounded flex-shrink-0">
                    4
                  </span>
                  <span className="text-white">
                    <strong className="text-white">Pay contributions on time</strong> &mdash; by the
                    22nd of the month following the pay period (or 19th if paying by cheque)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-rose-500/20 text-rose-400 text-xs font-bold px-2 py-1 rounded flex-shrink-0">
                    5
                  </span>
                  <span className="text-white">
                    <strong className="text-white">Keep records</strong> &mdash; you must maintain
                    records of enrolment, opt-outs, and contributions for six years
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-rose-500/20 text-rose-400 text-xs font-bold px-2 py-1 rounded flex-shrink-0">
                    6
                  </span>
                  <span className="text-white">
                    <strong className="text-white">Re-enrol every three years</strong> &mdash;
                    workers who opted out must be re-enrolled on your re-enrolment date
                  </span>
                </li>
              </ol>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <h4 className="text-white font-semibold text-sm mb-2">
                  Penalties for Non-Compliance
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  The Pensions Regulator can issue fixed penalty notices of &pound;400, followed by
                  escalating daily penalties of &pound;50&ndash;&pound;10,000 per day depending on
                  the number of staff. Directors can also face criminal prosecution for wilful
                  non-compliance. If you employ anyone, even an apprentice, set up auto-enrolment
                  properly from day one.
                </p>
              </div>

              <h3 className="text-white font-semibold text-base sm:text-lg mt-6">
                Practical Steps for Small Electrical Firms
              </h3>
              <p>
                Most accountants and payroll providers can handle auto-enrolment for you. The key is
                to raise it with your accountant <strong className="text-white">before</strong> you
                hire your first employee, not after. NEST has a free employer setup process, and
                many payroll software packages (Xero, Sage, QuickBooks) integrate directly with
                pension providers.
              </p>
              <p>
                If you use a CIS subcontractor rather than employing someone directly,
                auto-enrolment does not apply to them (they are self-employed). But be aware that
                HMRC may challenge &ldquo;false self-employment&rdquo; if the working relationship
                looks more like employment. Get the employment status right &mdash; it affects
                pension duties, tax, and employment rights.
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="space-y-4">
            <h2 className="text-white text-xl sm:text-2xl font-bold">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">
                  Can I contribute more than the minimum 5%?
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  Yes. You can increase your contributions at any time by contacting your pension
                  provider or HR department. Some employers offer matched contributions &mdash; for
                  example, &ldquo;we will match up to 6%&rdquo;. Always take the maximum match
                  available. You can also make additional one-off lump sum payments.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">
                  What happens to my workplace pension if I leave my employer?
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  Your pot stays invested with the same provider. Your old employer stops
                  contributing, but the pot continues to grow (or shrink) based on investment
                  performance. You can leave it where it is, transfer it to your new
                  employer&rsquo;s scheme, or transfer it to a SIPP. Avoid cashing it in early
                  unless absolutely necessary, as you will face heavy tax charges before age 55.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">
                  I am an agency electrician. Am I covered by auto-enrolment?
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  Yes. If you are on an agency&rsquo;s payroll (not CIS self-employed), the agency
                  is your employer for auto-enrolment purposes and must enrol you and contribute. If
                  you work through an umbrella company, the umbrella company has the same duties.
                  Check your payslip &mdash; if pension contributions are being deducted, you are
                  enrolled.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-white font-semibold text-sm mb-2">
                  How does tax relief work on pension contributions?
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  Most workplace pensions use &ldquo;relief at source&rdquo;. Your contribution is
                  taken from your net (after-tax) pay, and the pension provider claims 20% basic
                  rate tax back from HMRC and adds it to your pot. If you are a higher rate
                  taxpayer, you claim the additional 20% through your Self Assessment. Some schemes
                  use &ldquo;net pay&rdquo; &mdash; contributions are deducted before tax, so you
                  get full relief automatically.
                </p>
              </div>
            </div>
          </section>

          {/* Quiz */}
          <section>
            <Quiz
              questions={quizQuestions}
              title="Workplace Pensions &amp; Auto-Enrolment &mdash; Quick Quiz"
            />
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
              <Link to="../pf-module-4-section-3">
                Self-Employed Pension Options
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </div>
  );
}
