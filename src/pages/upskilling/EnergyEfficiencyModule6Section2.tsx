import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Zap, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const TITLE = 'ROI Models: Payback, IRR, Life Cycle Costing - Energy Efficiency Module 6 Section 2';
const DESCRIPTION = 'Master financial analysis for energy efficiency projects. Learn payback periods, NPV, IRR, and Life Cycle Costing with UK public sector discount rates and practical Excel functions.';

const quickCheckQuestions = [
  {
    id: 'ee-m6s2-qc1',
    question: 'A £10,000 LED lighting upgrade saves £2,500 per year. What is the simple payback period?',
    options: ['2.5 years', '4 years', '5 years', '10 years'],
    correctIndex: 1,
    explanation: 'Simple payback = Initial cost / Annual savings = £10,000 / £2,500 = 4 years. This is the time required to recover the initial investment through energy savings.'
  },
  {
    id: 'ee-m6s2-qc2',
    question: 'What does a positive Net Present Value (NPV) indicate about an energy efficiency project?',
    options: [
      'The project will break even',
      'The project destroys value and should be rejected',
      'The project creates value above the required rate of return',
      'The payback period is less than 5 years'
    ],
    correctIndex: 2,
    explanation: 'A positive NPV means the present value of future cash flows exceeds the initial investment when discounted at the required rate of return. The project creates value and should generally be accepted.'
  },
  {
    id: 'ee-m6s2-qc3',
    question: 'What is the current UK Treasury Green Book discount rate for public sector projects?',
    options: ['1.5%', '3.5%', '5%', '8%'],
    correctIndex: 1,
    explanation: 'The UK Treasury Green Book specifies a 3.5% discount rate for public sector project appraisal (reducing to 3% for periods beyond 30 years). This rate is used to calculate present values of future costs and benefits.'
  }
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which financial metric accounts for the time value of money?',
    options: ['Simple payback period', 'Return on investment percentage', 'Net Present Value (NPV)', 'Annual savings'],
    correctAnswer: 2,
    explanation: 'NPV discounts future cash flows to their present value, accounting for the time value of money - the principle that money available today is worth more than the same amount in the future.'
  },
  {
    id: 2,
    question: 'What does IRR (Internal Rate of Return) represent?',
    options: [
      'The annual energy savings as a percentage',
      'The discount rate at which NPV equals zero',
      'The percentage reduction in energy consumption',
      'The inflation rate used in calculations'
    ],
    correctAnswer: 1,
    explanation: 'IRR is the discount rate that makes the NPV of all cash flows equal to zero. It represents the effective annual return rate of the investment.'
  },
  {
    id: 3,
    question: 'In Life Cycle Costing, which costs are typically included?',
    options: [
      'Only initial capital costs',
      'Initial costs plus operating costs',
      'Initial, operating, maintenance, and disposal costs',
      'Only energy costs over the project lifetime'
    ],
    correctAnswer: 2,
    explanation: 'Life Cycle Costing includes all costs over the asset\'s lifetime: initial capital, installation, operating (energy), maintenance, repairs, and end-of-life disposal or replacement costs.'
  },
  {
    id: 4,
    question: 'Why might simple payback be misleading for energy efficiency investments?',
    options: [
      'It is too complicated to calculate',
      'It ignores savings beyond the payback period and the time value of money',
      'It always underestimates the investment value',
      'It cannot be used for lighting projects'
    ],
    correctAnswer: 1,
    explanation: 'Simple payback ignores any benefits after the payback period and doesn\'t account for the time value of money. A project with a 5-year payback and 20-year life creates far more value than simple payback suggests.'
  },
  {
    id: 5,
    question: 'What Excel function calculates Net Present Value?',
    options: ['=PAYBACK()', '=NPV(rate, values)', '=IRR(values)', '=FV(rate, nper, pmt)'],
    correctAnswer: 1,
    explanation: 'The =NPV(rate, values) function calculates Net Present Value. Note: Excel\'s NPV function assumes cash flows occur at the end of each period, so the initial investment is typically added separately.'
  },
  {
    id: 6,
    question: 'A project has an IRR of 12% and the company\'s hurdle rate is 8%. Should the project be accepted?',
    options: [
      'No, because IRR should be lower than the hurdle rate',
      'Yes, because IRR exceeds the hurdle rate',
      'Cannot determine without NPV',
      'No, because the difference is only 4%'
    ],
    correctAnswer: 1,
    explanation: 'When IRR exceeds the hurdle rate (required rate of return), the project creates value and should generally be accepted. The 12% return exceeds the 8% minimum requirement.'
  },
  {
    id: 7,
    question: 'What is the discount rate used for NHS and other public sector energy projects?',
    options: ['Bank of England base rate', '3.5% per Green Book guidance', '0% as public money', '10% commercial rate'],
    correctAnswer: 1,
    explanation: 'The UK Treasury Green Book mandates 3.5% for public sector project appraisal. This social time preference rate reflects opportunity cost of public funds.'
  },
  {
    id: 8,
    question: 'Which factor should be included when calculating total cost of ownership for lighting?',
    options: [
      'Only the lamp purchase price',
      'Lamp cost, energy cost, and maintenance/replacement labour',
      'Only energy costs over the lamp life',
      'Just the installation cost'
    ],
    correctAnswer: 1,
    explanation: 'Total cost of ownership includes purchase price, energy consumption costs, maintenance costs, and labour for replacements over the product lifetime.'
  },
  {
    id: 9,
    question: 'How does inflation affect energy efficiency investment analysis?',
    options: [
      'It has no effect on calculations',
      'Energy prices typically rise with inflation, improving future savings',
      'It always makes projects look worse',
      'It is illegal to include inflation in business cases'
    ],
    correctAnswer: 1,
    explanation: 'Energy prices often rise faster than general inflation. Including realistic price escalation in analysis typically improves the business case for energy efficiency investments.'
  },
  {
    id: 10,
    question: 'What is a limitation of using IRR for comparing projects?',
    options: [
      'IRR cannot be calculated in Excel',
      'IRR assumes reinvestment at the IRR rate, which may be unrealistic',
      'IRR is always lower than NPV',
      'IRR only works for 10-year projects'
    ],
    correctAnswer: 1,
    explanation: 'IRR implicitly assumes cash flows can be reinvested at the IRR rate. For projects with high IRRs, this may be unrealistic. NPV uses a more realistic reinvestment assumption (the discount rate).'
  }
];

const faqs = [
  {
    question: 'Which financial metric should I use when presenting to clients?',
    answer: 'Match the metric to your audience. Simple payback resonates with small business owners who want to know "how long until I get my money back?" NPV and IRR are appropriate for finance departments and public sector clients. For maintenance managers, emphasise total cost of ownership. Always calculate multiple metrics and lead with the one most relevant to the decision-maker.'
  },
  {
    question: 'How do I account for energy price uncertainty?',
    answer: 'Use sensitivity analysis to show outcomes under different price scenarios. Present a base case using current prices with modest inflation (2-3% real increase), a conservative case with flat real prices, and an optimistic case with higher price escalation. This demonstrates robustness and helps clients understand risk.'
  },
  {
    question: 'Should maintenance savings be included in the business case?',
    answer: 'Yes, but be realistic and document assumptions. LED lighting reduces lamp replacement frequency significantly - a 50,000-hour LED versus 1,000-hour halogen represents 50x fewer replacements. Include labour savings for reduced maintenance access, especially in difficult locations like high ceilings or clean rooms. Get quotes for current maintenance costs to support figures.'
  },
  {
    question: 'How do I handle projects with different lifetimes?',
    answer: 'Use equivalent annual cost (EAC) to compare projects with different lifetimes on a like-for-like basis. Calculate NPV for each project, then convert to an annual equivalent using the annuity formula. This allows fair comparison between, for example, a 5-year solution and a 15-year alternative.'
  },
  {
    question: 'What about carbon pricing in investment analysis?',
    answer: 'The UK government uses shadow carbon prices for policy appraisal, currently around £80-250/tonne CO2. For private sector, include carbon if there is a carbon tax, ETS obligation, or corporate carbon pricing policy. For public sector, Green Book requires carbon valuation. Always separate financial and carbon benefits clearly.'
  },
  {
    question: 'How do I calculate savings for variable loads?',
    answer: 'Obtain actual energy consumption data rather than using nameplate ratings. Request utility bills or sub-meter data covering at least 12 months. Calculate load factors (actual consumption / theoretical maximum) and apply these to efficiency improvement calculations. Be conservative - measured savings often fall short of theoretical calculations due to operational factors.'
  }
];

const EnergyEfficiencyModule6Section2: React.FC = () => {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  useSEO({
    title: TITLE,
    description: DESCRIPTION,
    keywords: ['ROI energy efficiency', 'payback period calculation', 'NPV energy projects', 'IRR', 'life cycle costing'],
    canonicalUrl: '/study-centre/upskilling/energy-efficiency/module-6/section-2'
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 6 Section 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            ROI Models: Payback, IRR, Life Cycle Costing
          </h1>
          <p className="text-white/80">
            Financial analysis techniques for energy efficiency investments
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">Key Metrics</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Simple Payback:</strong> Years to recover investment</li>
              <li><strong>NPV:</strong> Present value of all cash flows</li>
              <li><strong>IRR:</strong> Effective annual return rate</li>
              <li><strong>LCC:</strong> Total lifetime ownership cost</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">UK Public Sector</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Discount rate:</strong> 3.5% (Green Book)</li>
              <li><strong>Carbon pricing:</strong> Required for appraisal</li>
              <li><strong>Salix funding:</strong> 0% interest available</li>
              <li><strong>ESOS/SECR:</strong> Compliance benefits</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Calculate simple and discounted payback periods',
              'Apply NPV and IRR to energy projects',
              'Understand UK public sector discount rates',
              'Perform life cycle cost analysis',
              'Use Excel functions for financial analysis',
              'Present investment cases to different audiences'
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Simple Payback */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Simple Payback Period
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Simple payback is the most intuitive financial metric - it answers the question "how long until I get my money back?" It divides the initial investment by the annual savings to determine the number of years to recover the capital cost.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Formula:</p>
              <p className="text-sm text-white ml-4 font-mono bg-white/5 p-3 rounded">
                Simple Payback (years) = Initial Investment / Annual Savings
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Example calculation:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>LED lighting upgrade cost: £15,000</li>
                <li>Annual energy savings: £3,500</li>
                <li>Reduced maintenance: £500/year</li>
                <li>Total annual benefit: £4,000</li>
                <li><strong>Payback = £15,000 / £4,000 = 3.75 years</strong></li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Advantages:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Easy to understand and calculate</li>
                <li>Universally recognised by decision-makers</li>
                <li>Useful for quick screening of projects</li>
                <li>Indicates liquidity and risk exposure time</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Limitations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Ignores savings after payback period</li>
                <li>Does not account for time value of money</li>
                <li>Treats all payback periods equally (5 years = 5 years regardless of project life)</li>
                <li>Can favour short-term thinking over better long-term investments</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Net Present Value */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Net Present Value (NPV)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              NPV accounts for the time value of money - the principle that £1 today is worth more than £1 in the future because today's pound can be invested to earn interest. NPV discounts future cash flows to their present value and sums them with the initial investment.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The concept:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Future savings are worth less than immediate savings</li>
                <li>The discount rate reflects the cost of capital or opportunity cost</li>
                <li>Positive NPV means the project creates value</li>
                <li>Negative NPV means the project destroys value</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Excel formula:</p>
              <p className="text-sm text-white ml-4 font-mono bg-white/5 p-3 rounded">
                NPV = -Initial Cost + NPV(discount_rate, year1_savings, year2_savings, ...)
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">UK discount rates:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Public sector:</strong> 3.5% (Treasury Green Book)</li>
                <li><strong>Long-term public (&gt;30 years):</strong> 3.0%</li>
                <li><strong>Private sector:</strong> Typically 8-15% depending on risk</li>
                <li><strong>Salix-funded:</strong> 0% interest (essentially free capital)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Decision rule:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>NPV &gt; 0:</strong> Accept the project (creates value)</li>
                <li><strong>NPV = 0:</strong> Indifferent (meets required return)</li>
                <li><strong>NPV &lt; 0:</strong> Reject the project (destroys value)</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Internal Rate of Return */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Internal Rate of Return (IRR)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              IRR is the discount rate at which NPV equals zero. It represents the effective annual return rate of the investment. IRR is useful for comparing projects of different sizes because it is expressed as a percentage rather than an absolute value.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Excel formula:</p>
              <p className="text-sm text-white ml-4 font-mono bg-white/5 p-3 rounded">
                IRR = IRR(values) where values includes the initial cost as negative
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Decision rule:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>IRR &gt; Hurdle rate:</strong> Accept the project</li>
                <li><strong>IRR = Hurdle rate:</strong> Indifferent</li>
                <li><strong>IRR &lt; Hurdle rate:</strong> Reject the project</li>
                <li>The hurdle rate is typically the company's cost of capital</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Typical IRRs for energy projects:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>LED lighting:</strong> 20-40% (short payback, long life)</li>
                <li><strong>Motors and drives:</strong> 15-30%</li>
                <li><strong>Building fabric:</strong> 5-15% (longer payback)</li>
                <li><strong>Solar PV:</strong> 8-15% (depending on tariffs)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">IRR limitations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Assumes reinvestment at IRR rate (may be unrealistic)</li>
                <li>Can give multiple solutions with unconventional cash flows</li>
                <li>Does not indicate absolute value created</li>
                <li>Small project with high IRR may be worse than large project with lower IRR</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Life Cycle Costing */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Life Cycle Costing (LCC)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Life Cycle Costing captures all costs associated with an asset over its entire lifetime, from acquisition through operation to disposal. This prevents decisions being made on purchase price alone when operating costs dominate total cost of ownership.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">LCC components:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Acquisition costs:</strong> Purchase price, delivery, installation</li>
                <li><strong>Operating costs:</strong> Energy consumption, consumables</li>
                <li><strong>Maintenance costs:</strong> Routine servicing, repairs, parts</li>
                <li><strong>Downtime costs:</strong> Lost production, temporary solutions</li>
                <li><strong>End-of-life costs:</strong> Disposal, decommissioning, or residual value</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Example - Lighting comparison:</p>
              <table className="text-sm text-white w-full mt-2">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2">Cost Element</th>
                    <th className="text-right py-2">Halogen</th>
                    <th className="text-right py-2">LED</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="py-2">Lamp cost (20 fittings)</td>
                    <td className="text-right">£100</td>
                    <td className="text-right">£800</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2">Annual energy (10 years)</td>
                    <td className="text-right">£12,000</td>
                    <td className="text-right">£2,400</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2">Lamp replacements (10 years)</td>
                    <td className="text-right">£2,000</td>
                    <td className="text-right">£0</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2">Labour for replacements</td>
                    <td className="text-right">£3,000</td>
                    <td className="text-right">£0</td>
                  </tr>
                  <tr className="font-medium">
                    <td className="py-2">10-year LCC</td>
                    <td className="text-right">£17,100</td>
                    <td className="text-right">£3,200</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">When to use LCC:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Comparing products with different purchase prices and running costs</li>
                <li>Public sector procurement (often mandatory)</li>
                <li>Major equipment decisions (motors, HVAC, generators)</li>
                <li>When operating costs exceed capital costs over the asset life</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 05: Practical Application */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Practical Application
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building a business case:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Step 1:</strong> Document baseline energy consumption (kWh and £)</li>
                <li><strong>Step 2:</strong> Calculate expected savings from the improvement</li>
                <li><strong>Step 3:</strong> Obtain accurate installation and equipment costs</li>
                <li><strong>Step 4:</strong> Identify maintenance cost changes</li>
                <li><strong>Step 5:</strong> Calculate payback, NPV, and IRR</li>
                <li><strong>Step 6:</strong> Present appropriate metrics to decision-makers</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Excel functions summary:</p>
              <ul className="text-sm text-white space-y-1 ml-4 font-mono">
                <li>=NPV(rate, value1, value2, ...) - Net present value</li>
                <li>=IRR(values, [guess]) - Internal rate of return</li>
                <li>=PMT(rate, nper, pv) - Loan payment calculation</li>
                <li>=PV(rate, nper, pmt) - Present value of annuity</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Sensitivity analysis:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Test impact of energy price changes (±20%)</li>
                <li>Vary operating hours assumptions</li>
                <li>Change discount rate for different stakeholders</li>
                <li>Consider best case, worst case, and most likely scenarios</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Presenting to different audiences</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>SME owners:</strong> Lead with simple payback, emphasise cash flow</li>
                <li><strong>Finance directors:</strong> NPV and IRR, compare to cost of capital</li>
                <li><strong>Public sector:</strong> NPV at 3.5%, include carbon valuation</li>
                <li><strong>Operations managers:</strong> Total cost of ownership, reliability benefits</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Common pitfalls to avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Using nameplate ratings</strong> - Always use measured or realistic load data</li>
                <li><strong>Ignoring installation costs</strong> - Include all costs in the investment</li>
                <li><strong>Overstating savings</strong> - Be conservative; underselling builds trust</li>
                <li><strong>Wrong discount rate</strong> - Use rates appropriate to the organisation</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Data sources for calculations</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Utility bills for baseline consumption and tariffs</li>
                <li>Sub-meter readings for specific equipment</li>
                <li>Manufacturer data for efficiency ratings</li>
                <li>Building energy benchmarks from CIBSE guides</li>
                <li>Treasury Green Book for public sector rates</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  className="w-full flex items-center justify-between text-left min-h-[44px] touch-manipulation"
                >
                  <h3 className="text-sm font-medium text-white pr-4">{faq.question}</h3>
                  {expandedFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                  )}
                </button>
                {expandedFAQ === index && (
                  <p className="text-sm text-white/90 leading-relaxed mt-2">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Reference Card */}
        <section className="mb-10">
          <div className="mt-6 p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Key Formulas</p>
                <ul className="space-y-0.5">
                  <li>Payback = Cost / Annual Savings</li>
                  <li>NPV = Sum of discounted cash flows</li>
                  <li>IRR = Rate where NPV = 0</li>
                  <li>LCC = Capital + Operating + Disposal</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Typical Targets</p>
                <ul className="space-y-0.5">
                  <li>Payback: &lt;5 years typical threshold</li>
                  <li>NPV: Positive = accept</li>
                  <li>IRR: &gt;8% private sector, &gt;3.5% public</li>
                  <li>LCC: Lowest total cost wins</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EnergyEfficiencyModule6Section2;
