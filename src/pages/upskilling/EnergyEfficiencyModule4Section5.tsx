import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { useSEO } from '@/hooks/useSEO';
import {
  ArrowLeft,
  ArrowRight,
  Calculator,
  PoundSterling,
  TrendingUp,
  BarChart3,
  Clock,
  FileSpreadsheet,
  Briefcase,
  Target,
  Lightbulb,
  ExternalLink,
  CheckCircle2,
  Percent,
  BookOpen
} from 'lucide-react';

const EnergyEfficiencyModule4Section5: React.FC = () => {
  useSEO({
    title: 'ROI Calculators and Energy Saving Tools | Energy Efficiency Module 4 Section 5',
    description:
      'Master energy efficiency ROI calculations including payback periods, NPV, IRR, and life cycle cost analysis. Learn to build compelling business cases for efficiency investments using UK standards and free online tools.',
    keywords: [
      'energy ROI calculator',
      'payback period calculation',
      'NPV energy projects',
      'IRR calculation',
      'life cycle cost analysis',
      'Carbon Trust tools',
      'energy efficiency business case',
      'UK discount rates',
      'energy saving calculations',
    ],
  });

  const quickCheckQuestions = [
    {
      id: 'qc-payback-1',
      question:
        'A LED lighting upgrade costs 12,000 and saves 3,000 per year on energy bills. What is the simple payback period?',
      options: ['2 years', '3 years', '4 years', '5 years'],
      correctIndex: 2,
      explanation:
        'Simple Payback Period = Initial Cost / Annual Savings = 12,000 / 3,000 = 4 years. This means the investment will pay for itself through energy savings in 4 years.',
    },
    {
      id: 'qc-npv-2',
      question:
        'When calculating NPV for a public sector energy project in the UK, what discount rate is typically recommended by HM Treasury Green Book?',
      options: ['1.5%', '3.5%', '5.5%', '7.5%'],
      correctIndex: 1,
      explanation:
        'HM Treasury Green Book recommends a 3.5% discount rate for public sector projects. This rate is used to calculate the present value of future cash flows, reflecting the time value of money.',
    },
    {
      id: 'qc-irr-3',
      question:
        'If a project has an IRR of 15% and your organisation requires a minimum return of 10%, should the project proceed?',
      options: [
        'No, IRR is too high',
        'Yes, IRR exceeds minimum requirement',
        'Need more information',
        'Only if payback is under 2 years',
      ],
      correctIndex: 1,
      explanation:
        'When IRR exceeds the required rate of return (hurdle rate), the project is financially viable. A 15% IRR versus a 10% requirement indicates a good investment that exceeds minimum profitability expectations.',
    },
  ];

  const quizQuestions = [
    {
      question: 'What is the formula for calculating Simple Payback Period?',
      options: [
        'Annual Savings / Initial Cost',
        'Initial Cost / Annual Savings',
        'Initial Cost x Annual Savings',
        '(Initial Cost - Salvage Value) / Annual Savings',
      ],
      correctAnswer: 'Initial Cost / Annual Savings',
    },
    {
      question:
        'A heat pump installation costs 25,000 and saves 5,000 annually. What is the payback period?',
      options: ['3 years', '4 years', '5 years', '6 years'],
      correctAnswer: '5 years',
    },
    {
      question: 'What does NPV stand for in financial analysis?',
      options: [
        'New Project Value',
        'Net Present Value',
        'Nominal Payment Variable',
        'Net Payback Verification',
      ],
      correctAnswer: 'Net Present Value',
    },
    {
      question:
        'In NPV calculations, what happens to future cash flows when discounted?',
      options: [
        'They increase in value',
        'They decrease in value',
        'They remain the same',
        'They become negative',
      ],
      correctAnswer: 'They decrease in value',
    },
    {
      question: 'What does IRR represent in project evaluation?',
      options: [
        'The total profit over project lifetime',
        'The discount rate that makes NPV equal to zero',
        'The annual energy savings percentage',
        'The inflation rate for energy prices',
      ],
      correctAnswer: 'The discount rate that makes NPV equal to zero',
    },
    {
      question:
        'Which organisation provides free energy efficiency calculation tools in the UK?',
      options: ['Ofgem', 'Carbon Trust', 'Energy UK', 'British Gas'],
      correctAnswer: 'Carbon Trust',
    },
    {
      question: 'In Life Cycle Cost Analysis, which costs should be included?',
      options: [
        'Only the purchase price',
        'Purchase, installation, and energy costs',
        'All costs from acquisition to disposal',
        'Only maintenance and energy costs',
      ],
      correctAnswer: 'All costs from acquisition to disposal',
    },
    {
      question:
        'When comparing two energy efficiency projects, which metric best accounts for project scale differences?',
      options: [
        'Simple payback period',
        'Total energy savings',
        'IRR (Internal Rate of Return)',
        'Installation cost',
      ],
      correctAnswer: 'IRR (Internal Rate of Return)',
    },
    {
      question:
        'What Excel function is used to calculate Net Present Value?',
      options: ['=PMT()', '=NPV()', '=FV()', '=RATE()'],
      correctAnswer: '=NPV()',
    },
    {
      question:
        'When building a business case for energy efficiency, which factor is often most persuasive for decision-makers?',
      options: [
        'Environmental benefits alone',
        'Technical specifications',
        'Financial returns with risk mitigation',
        'Competitor analysis',
      ],
      correctAnswer: 'Financial returns with risk mitigation',
    },
  ];

  const faqs = [
    {
      question:
        'Why is simple payback period not always sufficient for investment decisions?',
      answer:
        "Simple payback period ignores the time value of money, cash flows after payback, and doesn't account for the total profitability of an investment. A project with a 3-year payback might generate excellent returns for 15 more years, while another with 2-year payback might have minimal savings thereafter. For comprehensive analysis, combine payback with NPV and IRR calculations.",
    },
    {
      question:
        'What discount rate should I use for private sector energy projects?',
      answer:
        "Private sector discount rates typically range from 8-15%, depending on the company's cost of capital, risk tolerance, and alternative investment opportunities. Many organisations use their Weighted Average Cost of Capital (WACC) as the discount rate. Consult your finance department for company-specific rates, as using incorrect rates can significantly skew investment decisions.",
    },
    {
      question: 'How do I account for energy price inflation in calculations?',
      answer:
        "You can either use 'real' discount rates (which exclude inflation) with constant energy prices, or use 'nominal' rates with inflated future energy prices. The Carbon Trust recommends using real rates with constant prices for simplicity. For long-term projects, consider energy price escalation scenarios (e.g., 2%, 4%, 6% annual increases) to stress-test your business case.",
    },
    {
      question:
        'What is the difference between NPV and IRR, and when should I use each?',
      answer:
        'NPV gives the absolute value created by a project in today\'s money - useful for understanding total benefit. IRR gives the percentage return - useful for comparing projects of different sizes. Use NPV when you have a fixed budget and want to maximise value; use IRR when comparing projects requiring different investment levels. Most robust analyses use both metrics together.',
    },
    {
      question:
        'How do I include non-financial benefits in a business case?',
      answer:
        "Quantify where possible: reduced maintenance (cost), improved comfort (productivity gains), carbon savings (potential carbon price), enhanced reputation (brand value). Present these as 'co-benefits' alongside financial returns. The Social Value Act may require public sector projects to include wider social value. Use sensitivity analysis to show how including these benefits affects overall project viability.",
    },
    {
      question:
        'What tools are available for energy efficiency calculations without expensive software?',
      answer:
        "Free tools include: Carbon Trust's online calculators, CIBSE TM54 spreadsheet tools, BRE's SBEM for non-domestic buildings, and EST's home energy check. Microsoft Excel can perform NPV (=NPV function), IRR (=IRR function), and payback calculations. Google Sheets offers identical functionality for collaborative analysis. Many equipment manufacturers also provide ROI calculators specific to their products.",
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a] text-white">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild className="text-white hover:text-elec-yellow hover:bg-transparent p-2">
            <Link to="..">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="flex-1 min-w-0">
            <p className="text-elec-yellow text-xs font-medium">Module 4 - Section 5</p>
            <h1 className="text-base font-semibold truncate">ROI Calculators and Energy Saving Tools</h1>
          </div>
          <div className="p-2 bg-elec-yellow/20 rounded-lg">
            <Calculator className="w-5 h-5 text-elec-yellow" />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-8">
        {/* Quick Summary */}
        <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
          <p className="text-white/90 leading-relaxed">
            Master the financial tools and calculations needed to evaluate and justify energy efficiency
            investments. Learn to calculate payback periods, NPV, IRR, and build compelling business cases
            that convince decision-makers.
          </p>
        </div>

        {/* Learning Objectives */}
        <div className="bg-white/5 border border-elec-yellow/30 rounded-lg p-5">
          <h2 className="text-lg font-semibold text-elec-yellow mb-4 flex items-center gap-2">
            <Target className="w-5 h-5" />
            Learning Objectives
          </h2>
          <ul className="space-y-2">
            {[
              'Calculate simple payback periods for energy efficiency investments',
              'Apply NPV analysis using appropriate UK discount rates',
              'Use IRR to compare competing project options',
              'Conduct comprehensive life cycle cost analysis',
              'Navigate free online calculation tools and resources',
              'Build compelling business cases that convince decision-makers',
            ].map((objective, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-white/80">{objective}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 1: Simple Payback Period */}
        <section className="bg-white/5 rounded-xl p-5 border border-white/10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            <Clock className="w-5 h-5 text-elec-yellow" />
            Simple Payback Period Calculations
          </h2>

          <div className="space-y-4 text-white/80">
            <p>
              Simple payback period is the most commonly used metric in energy efficiency, representing
              the time required for energy savings to recover the initial investment cost. While
              straightforward, understanding its limitations is crucial for sound decision-making.
            </p>

            {/* Formula Box */}
            <div className="bg-white/5 rounded-lg p-4 border border-elec-yellow/50">
              <h4 className="text-elec-yellow font-semibold mb-2">Simple Payback Formula</h4>
              <div className="text-center py-4">
                <span className="text-xl font-mono text-white">
                  Payback Period = Initial Cost / Annual Savings
                </span>
              </div>
              <p className="text-sm text-white/60 mt-2">
                Result expressed in years (or months if multiplied by 12)
              </p>
            </div>

            {/* Worked Example */}
            <div className="bg-white/5 rounded-lg p-5 border border-white/10">
              <h4 className="font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Worked Example: LED Lighting Retrofit
              </h4>
              <div className="space-y-3 text-white/70">
                <p>
                  <strong className="text-white">Scenario:</strong> A warehouse replaces 100 fluorescent
                  fittings with LED equivalents.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white/5 p-3 rounded">
                    <p className="text-sm text-white/60">Project Costs:</p>
                    <ul className="text-sm mt-1 space-y-1">
                      <li>LED fittings: 8,000</li>
                      <li>Installation: 2,500</li>
                      <li><strong className="text-white">Total: 10,500</strong></li>
                    </ul>
                  </div>
                  <div className="bg-white/5 p-3 rounded">
                    <p className="text-sm text-white/60">Annual Savings:</p>
                    <ul className="text-sm mt-1 space-y-1">
                      <li>Energy reduction: 25,000 kWh</li>
                      <li>At 0.14/kWh: 3,500/year</li>
                      <li><strong className="text-white">Total: 3,500</strong></li>
                    </ul>
                  </div>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
                  <p className="font-semibold text-green-400">
                    Payback = 10,500 / 3,500 = 3.0 years
                  </p>
                </div>
              </div>
            </div>

            {/* Limitations */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-amber-400 mb-2">Key Limitations to Consider</h4>
              <ul className="text-white/70 text-sm space-y-1">
                <li>Does not account for the time value of money (1 today worth more than 1 in 5 years)</li>
                <li>Ignores cash flows occurring after the payback period</li>
                <li>Does not consider project risk or uncertainty</li>
                <li>Cannot compare projects with different lifespans effectively</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quick Check 1 */}
        <InlineCheck
          id={quickCheckQuestions[0].id}
          question={quickCheckQuestions[0].question}
          options={quickCheckQuestions[0].options}
          correctIndex={quickCheckQuestions[0].correctIndex}
          explanation={quickCheckQuestions[0].explanation}
        />

        {/* Section 2: NPV and Discount Rates */}
        <section className="bg-white/5 rounded-xl p-5 border border-white/10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            <PoundSterling className="w-5 h-5 text-elec-yellow" />
            Net Present Value (NPV) and Discount Rates
          </h2>

          <div className="space-y-4 text-white/80">
            <p>
              NPV accounts for the fact that money received in the future is worth less than money today.
              By discounting future cash flows, NPV provides the true value of an investment in today's
              terms, enabling accurate comparison between projects with different timescales.
            </p>

            {/* NPV Formula */}
            <div className="bg-white/5 rounded-lg p-4 border border-elec-yellow/50">
              <h4 className="text-elec-yellow font-semibold mb-2">NPV Formula</h4>
              <div className="text-center py-4">
                <span className="text-lg font-mono text-white">
                  NPV = -Initial Cost + Sum of [Cash Flow / (1 + r)^n]
                </span>
              </div>
              <p className="text-sm text-white/60 mt-2">
                Where r = discount rate, n = year number
              </p>
            </div>

            {/* UK Discount Rates */}
            <div className="bg-white/5 rounded-lg p-5 border border-white/10">
              <h4 className="font-semibold text-elec-yellow mb-3">UK Standard Discount Rates</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded border border-blue-500/30">
                  <h5 className="text-blue-400 font-semibold mb-2">Public Sector</h5>
                  <p className="text-2xl font-bold text-white mb-1">3.5%</p>
                  <p className="text-sm text-white/60">
                    HM Treasury Green Book standard rate for projects up to 30 years
                  </p>
                  <p className="text-xs text-white/50 mt-2">
                    Declining rate schedule for longer-term projects: 3.0% for years 31-75
                  </p>
                </div>
                <div className="bg-white/5 p-4 rounded border border-green-500/30">
                  <h5 className="text-green-400 font-semibold mb-2">Private Sector</h5>
                  <p className="text-2xl font-bold text-white mb-1">8-15%</p>
                  <p className="text-sm text-white/60">
                    Varies by organisation, typically based on WACC or hurdle rate
                  </p>
                  <p className="text-xs text-white/50 mt-2">
                    Higher rates reflect risk premium and opportunity cost of capital
                  </p>
                </div>
              </div>
            </div>

            {/* Worked NPV Example */}
            <div className="bg-white/5 rounded-lg p-5 border border-white/10">
              <h4 className="font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Worked Example: HVAC Upgrade NPV Calculation
              </h4>
              <div className="space-y-3 text-white/70">
                <p>
                  <strong className="text-white">Scenario:</strong> Council building HVAC replacement,
                  10-year analysis at 3.5% discount rate
                </p>
                <div className="bg-white/5 p-3 rounded">
                  <p>Initial Investment: 50,000</p>
                  <p>Annual Energy Savings: 8,000</p>
                  <p>Project Life: 10 years</p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="text-left py-2 text-white/60">Year</th>
                        <th className="text-right py-2 text-white/60">Cash Flow</th>
                        <th className="text-right py-2 text-white/60">Discount Factor</th>
                        <th className="text-right py-2 text-white/60">Present Value</th>
                      </tr>
                    </thead>
                    <tbody className="text-white/70">
                      <tr className="border-b border-white/10">
                        <td className="py-2">0</td>
                        <td className="text-right text-red-400">-50,000</td>
                        <td className="text-right">1.000</td>
                        <td className="text-right text-red-400">-50,000</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-2">1</td>
                        <td className="text-right">8,000</td>
                        <td className="text-right">0.966</td>
                        <td className="text-right">7,729</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-2">2</td>
                        <td className="text-right">8,000</td>
                        <td className="text-right">0.934</td>
                        <td className="text-right">7,469</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-2 text-white/50">...</td>
                        <td className="text-right text-white/50">...</td>
                        <td className="text-right text-white/50">...</td>
                        <td className="text-right text-white/50">...</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-2">10</td>
                        <td className="text-right">8,000</td>
                        <td className="text-right">0.709</td>
                        <td className="text-right">5,671</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-green-500/10 border border-green-500/30 rounded p-3 mt-3">
                  <p className="font-semibold text-green-400">
                    Total NPV = 16,289 (Positive NPV = Financially Viable)
                  </p>
                  <p className="text-sm text-white/60 mt-1">
                    Excel formula: =NPV(0.035, B2:B11) + B1 (where B1 is the initial cost as negative)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Check 2 */}
        <InlineCheck
          id={quickCheckQuestions[1].id}
          question={quickCheckQuestions[1].question}
          options={quickCheckQuestions[1].options}
          correctIndex={quickCheckQuestions[1].correctIndex}
          explanation={quickCheckQuestions[1].explanation}
        />

        {/* Section 3: IRR */}
        <section className="bg-white/5 rounded-xl p-5 border border-white/10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            <Percent className="w-5 h-5 text-elec-yellow" />
            Internal Rate of Return (IRR) for Project Comparison
          </h2>

          <div className="space-y-4 text-white/80">
            <p>
              IRR is the discount rate at which NPV equals zero. It represents the project's effective
              annual return, making it ideal for comparing investments of different sizes. If IRR exceeds
              your required rate of return (hurdle rate), the project is worthwhile.
            </p>

            {/* IRR Concept */}
            <div className="bg-white/5 rounded-lg p-4 border border-elec-yellow/50">
              <h4 className="text-elec-yellow font-semibold mb-2">IRR Decision Rule</h4>
              <div className="grid md:grid-cols-2 gap-4 mt-3">
                <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
                  <p className="text-green-400 font-semibold">IRR &gt; Hurdle Rate</p>
                  <p className="text-sm text-white/70 mt-1">
                    Accept project - returns exceed minimum requirements
                  </p>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
                  <p className="text-red-400 font-semibold">IRR &lt; Hurdle Rate</p>
                  <p className="text-sm text-white/70 mt-1">
                    Reject project - returns fall below minimum threshold
                  </p>
                </div>
              </div>
            </div>

            {/* Comparison Example */}
            <div className="bg-white/5 rounded-lg p-5 border border-white/10">
              <h4 className="font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Worked Example: Comparing Two Projects
              </h4>
              <div className="space-y-4 text-white/70">
                <p>
                  <strong className="text-white">Scenario:</strong> Choose between two energy efficiency
                  options with different scales
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white/5 p-4 rounded border border-blue-500/30">
                    <h5 className="text-blue-400 font-semibold mb-2">Project A: LED Upgrade</h5>
                    <ul className="text-sm space-y-1">
                      <li>Cost: 15,000</li>
                      <li>Annual Savings: 4,500</li>
                      <li>Life: 8 years</li>
                      <li>Payback: 3.3 years</li>
                      <li className="text-blue-400 font-semibold pt-2">IRR: 24.5%</li>
                    </ul>
                  </div>
                  <div className="bg-white/5 p-4 rounded border border-purple-500/30">
                    <h5 className="text-purple-400 font-semibold mb-2">Project B: BMS Installation</h5>
                    <ul className="text-sm space-y-1">
                      <li>Cost: 80,000</li>
                      <li>Annual Savings: 18,000</li>
                      <li>Life: 15 years</li>
                      <li>Payback: 4.4 years</li>
                      <li className="text-purple-400 font-semibold pt-2">IRR: 19.8%</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white/5 p-3 rounded">
                  <p className="text-sm">
                    <strong className="text-elec-yellow">Analysis:</strong> While Project B has a longer
                    payback, Project A's higher IRR (24.5% vs 19.8%) indicates better return per pound
                    invested. However, Project B generates more total savings (270,000 vs 36,000 over
                    lifetime). Decision depends on budget constraints and strategic priorities.
                  </p>
                </div>

                <div className="bg-white/5 p-3 rounded border border-white/10">
                  <p className="text-sm text-white/60">
                    <strong className="text-white">Excel Formula:</strong> =IRR(range of cash flows) where
                    the first value is the negative initial investment
                  </p>
                  <p className="text-sm text-white/60 mt-1">
                    Example: =IRR(A1:A9) where A1=-15000 and A2:A9 contain 4500
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Check 3 */}
        <InlineCheck
          id={quickCheckQuestions[2].id}
          question={quickCheckQuestions[2].question}
          options={quickCheckQuestions[2].options}
          correctIndex={quickCheckQuestions[2].correctIndex}
          explanation={quickCheckQuestions[2].explanation}
        />

        {/* Section 4: Life Cycle Cost Analysis */}
        <section className="bg-white/5 rounded-xl p-5 border border-white/10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            <BarChart3 className="w-5 h-5 text-elec-yellow" />
            Life Cycle Cost Analysis
          </h2>

          <div className="space-y-4 text-white/80">
            <p>
              Life Cycle Cost (LCC) analysis captures all costs associated with an asset from acquisition
              through disposal. This comprehensive approach reveals the true cost of ownership and often
              shows that higher upfront costs deliver lower total costs over the asset's lifetime.
            </p>

            {/* LCC Components */}
            <div className="bg-white/5 rounded-lg p-4 border border-elec-yellow/50">
              <h4 className="text-elec-yellow font-semibold mb-3">Life Cycle Cost Components</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-white/5 p-3 rounded text-center">
                  <p className="text-elec-yellow font-semibold">Acquisition</p>
                  <p className="text-xs text-white/60 mt-1">Purchase, delivery, installation</p>
                </div>
                <div className="bg-white/5 p-3 rounded text-center">
                  <p className="text-elec-yellow font-semibold">Operating</p>
                  <p className="text-xs text-white/60 mt-1">Energy, water, consumables</p>
                </div>
                <div className="bg-white/5 p-3 rounded text-center">
                  <p className="text-elec-yellow font-semibold">Maintenance</p>
                  <p className="text-xs text-white/60 mt-1">Servicing, repairs, parts</p>
                </div>
                <div className="bg-white/5 p-3 rounded text-center">
                  <p className="text-elec-yellow font-semibold">End of Life</p>
                  <p className="text-xs text-white/60 mt-1">Disposal, recycling, salvage</p>
                </div>
              </div>
            </div>

            {/* LCC Example */}
            <div className="bg-white/5 rounded-lg p-5 border border-white/10">
              <h4 className="font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Worked Example: Motor Selection LCC Comparison
              </h4>
              <div className="space-y-4 text-white/70">
                <p>
                  <strong className="text-white">Scenario:</strong> Selecting a 15kW motor with 20-year
                  life, 4,000 operating hours/year
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="text-left py-2 text-white/60">Cost Element</th>
                        <th className="text-right py-2 text-white/60">Standard Motor (IE2)</th>
                        <th className="text-right py-2 text-white/60">High Efficiency (IE4)</th>
                      </tr>
                    </thead>
                    <tbody className="text-white/70">
                      <tr className="border-b border-white/10">
                        <td className="py-2">Purchase Price</td>
                        <td className="text-right">800</td>
                        <td className="text-right">1,400</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-2">Installation</td>
                        <td className="text-right">200</td>
                        <td className="text-right">200</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-2">Annual Energy Cost*</td>
                        <td className="text-right">6,720</td>
                        <td className="text-right">6,048</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-2">20-Year Energy Cost</td>
                        <td className="text-right">134,400</td>
                        <td className="text-right">120,960</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-2">Maintenance (20yr)</td>
                        <td className="text-right">2,000</td>
                        <td className="text-right">1,800</td>
                      </tr>
                      <tr className="border-b border-white/10 bg-white/5">
                        <td className="py-2 font-semibold text-white">Total LCC</td>
                        <td className="text-right font-semibold text-red-400">137,400</td>
                        <td className="text-right font-semibold text-green-400">124,360</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-xs text-white/50">
                  *Based on efficiency of 89% (IE2) vs 92% (IE4), electricity at 0.14/kWh
                </p>

                <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
                  <p className="font-semibold text-green-400">
                    LCC Savings with IE4: 13,040 over 20 years
                  </p>
                  <p className="text-sm text-white/60 mt-1">
                    The 600 premium delivers 22x return over the motor's lifetime
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Free Online Tools */}
        <section className="bg-white/5 rounded-xl p-5 border border-white/10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            <FileSpreadsheet className="w-5 h-5 text-elec-yellow" />
            Free Online Calculation Tools and Resources
          </h2>

          <div className="space-y-4 text-white/80">
            <p>
              Numerous free tools are available to support energy efficiency calculations. Knowing which
              tool to use for each situation saves time and improves accuracy.
            </p>

            {/* Tools Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <h4 className="text-elec-yellow font-semibold mb-2 flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Carbon Trust Resources
                </h4>
                <ul className="text-sm text-white/70 space-y-2">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-white/50 flex-shrink-0 mt-0.5" />
                    <span>Energy efficiency calculators for lighting, motors, HVAC</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-white/50 flex-shrink-0 mt-0.5" />
                    <span>Carbon footprint calculation tools</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-white/50 flex-shrink-0 mt-0.5" />
                    <span>Technology guides with ROI benchmarks</span>
                  </li>
                </ul>
                <p className="text-xs text-white/50 mt-2">carbontrust.com/resources</p>
              </div>

              <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <h4 className="text-elec-yellow font-semibold mb-2 flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Excel/Google Sheets Functions
                </h4>
                <ul className="text-sm text-white/70 space-y-2">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-white/50 flex-shrink-0 mt-0.5" />
                    <span>=NPV(rate, values) - Net Present Value</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-white/50 flex-shrink-0 mt-0.5" />
                    <span>=IRR(values) - Internal Rate of Return</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-white/50 flex-shrink-0 mt-0.5" />
                    <span>=PMT(rate, nper, pv) - Payment calculations</span>
                  </li>
                </ul>
                <p className="text-xs text-white/50 mt-2">Free and universally accessible</p>
              </div>

              <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <h4 className="text-elec-yellow font-semibold mb-2 flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  CIBSE Tools
                </h4>
                <ul className="text-sm text-white/70 space-y-2">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-white/50 flex-shrink-0 mt-0.5" />
                    <span>TM54 operational energy prediction</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-white/50 flex-shrink-0 mt-0.5" />
                    <span>Benchmarking databases for building types</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-white/50 flex-shrink-0 mt-0.5" />
                    <span>Degree day data for normalisation</span>
                  </li>
                </ul>
                <p className="text-xs text-white/50 mt-2">cibse.org - some tools require membership</p>
              </div>

              <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <h4 className="text-elec-yellow font-semibold mb-2 flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Government Resources
                </h4>
                <ul className="text-sm text-white/70 space-y-2">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-white/50 flex-shrink-0 mt-0.5" />
                    <span>BEIS conversion factors (emissions)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-white/50 flex-shrink-0 mt-0.5" />
                    <span>Green Book supplementary guidance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-white/50 flex-shrink-0 mt-0.5" />
                    <span>Salix Finance project criteria tools</span>
                  </li>
                </ul>
                <p className="text-xs text-white/50 mt-2">gov.uk/guidance</p>
              </div>
            </div>

            {/* Quick Reference for Tools */}
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-elec-yellow mb-3">Tool Selection Guide</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-2 text-white/60">Task</th>
                      <th className="text-left py-2 text-white/60">Recommended Tool</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/70">
                    <tr className="border-b border-white/10">
                      <td className="py-2">Quick payback estimate</td>
                      <td>Simple calculator or Excel formula</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2">Detailed NPV/IRR analysis</td>
                      <td>Excel/Google Sheets with cash flow model</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2">Lighting upgrade assessment</td>
                      <td>Carbon Trust lighting calculator</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2">Building energy benchmarking</td>
                      <td>CIBSE TM46 benchmarks</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2">Carbon emissions calculation</td>
                      <td>BEIS conversion factors spreadsheet</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Building Business Cases */}
        <section className="bg-white/5 rounded-xl p-5 border border-white/10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            <Briefcase className="w-5 h-5 text-elec-yellow" />
            Building Business Cases for Efficiency Investments
          </h2>

          <div className="space-y-4 text-white/80">
            <p>
              Technical excellence alone rarely secures project approval. A compelling business case speaks
              the language of finance, addresses risks, and aligns with organisational priorities.
            </p>

            {/* Business Case Structure */}
            <div className="bg-white/5 rounded-lg p-4 border border-elec-yellow/50">
              <h4 className="text-elec-yellow font-semibold mb-3">Business Case Structure</h4>
              <div className="space-y-3">
                {[
                  { num: '1', title: 'Executive Summary', desc: 'Key numbers upfront: investment required, annual savings, payback, NPV' },
                  { num: '2', title: 'Strategic Alignment', desc: 'Link to corporate objectives, net zero targets, regulations' },
                  { num: '3', title: 'Options Analysis', desc: "Compare alternatives including 'do nothing' baseline" },
                  { num: '4', title: 'Financial Analysis', desc: 'Payback, NPV, IRR with sensitivity analysis' },
                  { num: '5', title: 'Risk and Mitigation', desc: "Identify risks and explain how they'll be managed" },
                  { num: '6', title: 'Implementation Plan', desc: 'Timeline, resources, and success criteria' },
                ].map((item) => (
                  <div key={item.num} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-elec-yellow text-black flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {item.num}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{item.title}</p>
                      <p className="text-sm text-white/60">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Persuasion Points */}
            <div className="bg-white/5 rounded-lg p-5 border border-white/10">
              <h4 className="font-semibold text-elec-yellow mb-3">Key Persuasion Strategies</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-white">Frame as Risk Reduction</p>
                      <p className="text-sm text-white/60">Emphasise protection against energy price volatility</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-white">Show Multiple Scenarios</p>
                      <p className="text-sm text-white/60">Conservative, expected, and optimistic projections</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-white">Include Co-Benefits</p>
                      <p className="text-sm text-white/60">Maintenance savings, comfort, compliance, reputation</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-white">Use Credible Sources</p>
                      <p className="text-sm text-white/60">Reference Carbon Trust, BEIS, manufacturer data</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-white">Address the 'Do Nothing' Cost</p>
                      <p className="text-sm text-white/60">Show ongoing costs of inaction</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-white">Highlight Funding Options</p>
                      <p className="text-sm text-white/60">Grants, Salix loans, green finance</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sensitivity Analysis Example */}
            <div className="bg-white/5 rounded-lg p-5 border border-white/10">
              <h4 className="font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Sensitivity Analysis Example
              </h4>
              <p className="text-white/70 text-sm mb-3">
                Show decision-makers how project viability changes with different assumptions:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-2 text-white/60">Scenario</th>
                      <th className="text-right py-2 text-white/60">Energy Price</th>
                      <th className="text-right py-2 text-white/60">NPV</th>
                      <th className="text-right py-2 text-white/60">Payback</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/70">
                    <tr className="border-b border-white/10">
                      <td className="py-2 text-red-400">Conservative</td>
                      <td className="text-right">0.12/kWh</td>
                      <td className="text-right">8,200</td>
                      <td className="text-right">5.2 years</td>
                    </tr>
                    <tr className="border-b border-white/10 bg-white/5">
                      <td className="py-2 text-elec-yellow">Expected</td>
                      <td className="text-right">0.14/kWh</td>
                      <td className="text-right">16,289</td>
                      <td className="text-right">4.4 years</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 text-green-400">Optimistic</td>
                      <td className="text-right">0.18/kWh</td>
                      <td className="text-right">28,400</td>
                      <td className="text-right">3.4 years</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-white/50 mt-2">
                Even conservative estimates show positive NPV, reducing perceived risk
              </p>
            </div>
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 rounded-xl p-5 border border-elec-yellow/30">
          <h2 className="text-xl font-bold text-elec-yellow mb-4 flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            Quick Reference: Essential Formulas
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="font-semibold text-white mb-2">Simple Payback</h3>
              <p className="font-mono text-elec-yellow text-sm">
                Payback = Initial Cost / Annual Savings
              </p>
              <p className="text-xs text-white/60 mt-1">Result in years</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="font-semibold text-white mb-2">Discount Factor</h3>
              <p className="font-mono text-elec-yellow text-sm">
                DF = 1 / (1 + r)^n
              </p>
              <p className="text-xs text-white/60 mt-1">r = rate, n = year number</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="font-semibold text-white mb-2">NPV (Excel)</h3>
              <p className="font-mono text-elec-yellow text-sm">
                =NPV(rate, cash_flows) + initial_cost
              </p>
              <p className="text-xs text-white/60 mt-1">Initial cost as negative value</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="font-semibold text-white mb-2">IRR (Excel)</h3>
              <p className="font-mono text-elec-yellow text-sm">
                =IRR(all_cash_flows)
              </p>
              <p className="text-xs text-white/60 mt-1">Include initial cost in range</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="font-semibold text-white mb-2">Annual Savings</h3>
              <p className="font-mono text-elec-yellow text-sm">
                Savings = kWh_reduced x price/kWh
              </p>
              <p className="text-xs text-white/60 mt-1">Use actual tariff rates</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="font-semibold text-white mb-2">UK Public Sector Rate</h3>
              <p className="font-mono text-elec-yellow text-sm">
                Discount Rate = 3.5%
              </p>
              <p className="text-xs text-white/60 mt-1">HM Treasury Green Book standard</p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-white/5 rounded-xl p-5 border border-white/10">
          <h2 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
            <Lightbulb className="w-6 h-6" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white/5 rounded-lg border border-white/10 overflow-hidden"
              >
                <div className="p-4">
                  <h3 className="font-medium text-white">{faq.question}</h3>
                  <p className="text-white/60 text-sm leading-relaxed mt-2">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <section className="bg-white/5 rounded-xl p-5 border border-white/10">
          <h2 className="text-xl font-semibold text-elec-yellow mb-4">Section Quiz</h2>
          <Quiz questions={quizQuestions} />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-white/10">
          <Button
            variant="outline"
            asChild
            className="min-h-[44px] touch-manipulation bg-transparent border-white/20 text-white hover:bg-white/5 hover:border-elec-yellow"
          >
            <Link to="../section-4">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Previous: Section 4
            </Link>
          </Button>
          <Button
            asChild
            className="min-h-[44px] touch-manipulation bg-elec-yellow text-black hover:bg-elec-yellow/90"
          >
            <Link to="../../module-5">
              Next: Module 5
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default EnergyEfficiencyModule4Section5;
