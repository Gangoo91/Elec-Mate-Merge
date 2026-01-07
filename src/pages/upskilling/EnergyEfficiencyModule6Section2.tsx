import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Quiz from '@/components/apprentice-courses/Quiz';
import InlineCheck from '@/components/apprentice-courses/InlineCheck';
import { useSEO } from '@/hooks/useSEO';
import {
  Calculator,
  TrendingUp,
  Clock,
  PoundSterling,
  FileSpreadsheet,
  PieChart,
  AlertTriangle,
  Presentation,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  Zap,
  Target,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Settings,
  DollarSign
} from 'lucide-react';

const EnergyEfficiencyModule6Section2: React.FC = () => {
  const navigate = useNavigate();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  useSEO({
    title: 'ROI Models: Payback, IRR, Life Cycle Costing | Energy Efficiency Module 6.2',
    description: 'Master financial analysis for energy efficiency projects. Learn payback periods, NPV, IRR, and Life Cycle Costing with UK public sector discount rates and practical Excel functions.',
    keywords: [
      'ROI energy efficiency',
      'payback period calculation',
      'NPV energy projects',
      'IRR internal rate return',
      'life cycle costing',
      'UK public sector discount rate',
      'energy investment analysis',
      'electrical apprentice finance'
    ],
    canonicalUrl: '/upskilling/energy-efficiency/module-6/section-2'
  });

  const quickCheckQuestions = [
    {
      id: 'qc1-payback',
      question: 'A £12,000 LED lighting upgrade saves £3,000 per year. What is the simple payback period?',
      options: ['3 years', '4 years', '5 years', '6 years'],
      correctIndex: 1,
      explanation: 'Simple Payback = Initial Cost ÷ Annual Savings = £12,000 ÷ £3,000 = 4 years. This is the most basic investment appraisal metric and doesn\'t account for time value of money.'
    },
    {
      id: 'qc2-npv',
      question: 'What does a positive NPV indicate about an energy efficiency project?',
      options: [
        'The project costs more than it saves',
        'The project will break even exactly',
        'The project adds value above the required return rate',
        'The project has a short payback period'
      ],
      correctIndex: 2,
      explanation: 'A positive NPV means the project generates returns above the discount rate (cost of capital). It indicates the investment will add value to the organisation and should be considered for approval.'
    },
    {
      id: 'qc3-lcc',
      question: 'Which costs are typically included in Life Cycle Costing for electrical equipment?',
      options: [
        'Purchase price only',
        'Purchase price and installation',
        'Purchase, installation, energy, maintenance, and disposal',
        'Energy costs only'
      ],
      correctIndex: 2,
      explanation: 'Life Cycle Costing captures ALL costs over the equipment\'s lifespan: capital (purchase, installation), operating (energy, maintenance), and end-of-life (disposal/recycling). For motors, energy typically represents 95%+ of total LCC.'
    }
  ];

  const quizQuestions = [
    {
      question: 'The UK public sector discount rate recommended by HM Treasury is:',
      options: ['2.5%', '3.5%', '5.0%', '7.0%'],
      correctAnswer: '3.5%'
    },
    {
      question: 'Which Excel function calculates Net Present Value?',
      options: ['=PAYBACK()', '=NPV()', '=IRR()', '=FV()'],
      correctAnswer: '=NPV()'
    },
    {
      question: 'A project has an IRR of 12% and the organisation\'s hurdle rate is 8%. Should the project proceed?',
      options: [
        'No - IRR is too high',
        'Yes - IRR exceeds the hurdle rate',
        'No - need more information',
        'Only if payback is under 3 years'
      ],
      correctAnswer: 'Yes - IRR exceeds the hurdle rate'
    },
    {
      question: 'In Life Cycle Costing for an IE4 motor, what percentage of total cost is typically energy?',
      options: ['50-60%', '70-80%', '85-90%', '95%+'],
      correctAnswer: '95%+'
    },
    {
      question: 'Discounted payback differs from simple payback by:',
      options: [
        'Including maintenance costs',
        'Accounting for time value of money',
        'Using monthly instead of annual figures',
        'Including tax benefits'
      ],
      correctAnswer: 'Accounting for time value of money'
    },
    {
      question: 'Sensitivity analysis helps decision makers understand:',
      options: [
        'The exact ROI of a project',
        'How results change when assumptions vary',
        'The best supplier to use',
        'Installation timelines'
      ],
      correctAnswer: 'How results change when assumptions vary'
    },
    {
      question: 'When comparing two motor options, LCC analysis reveals Option A (£800) has lower total cost than Option B (£500) because:',
      options: [
        'Option A is a better brand',
        'Option B has higher operating costs over its lifetime',
        'Option A is more efficient at part load',
        'Option B requires more maintenance'
      ],
      correctAnswer: 'Option B has higher operating costs over its lifetime'
    },
    {
      question: 'The Excel function =IRR() returns:',
      options: [
        'The discount rate that makes NPV equal zero',
        'The total return on investment',
        'The payback period in years',
        'The annual savings amount'
      ],
      correctAnswer: 'The discount rate that makes NPV equal zero'
    },
    {
      question: 'For a 10-year energy project, which metric best captures long-term value?',
      options: [
        'Simple payback period',
        'First year savings',
        'Net Present Value or Life Cycle Cost',
        'Installation cost'
      ],
      correctAnswer: 'Net Present Value or Life Cycle Cost'
    },
    {
      question: 'When presenting a business case, which approach is most effective?',
      options: [
        'Focus only on environmental benefits',
        'Present technical specifications in detail',
        'Lead with financial returns and risk mitigation',
        'Emphasise the latest technology features'
      ],
      correctAnswer: 'Lead with financial returns and risk mitigation'
    }
  ];

  const faqs = [
    {
      question: 'Why use 3.5% as the discount rate for UK public sector projects?',
      answer: 'HM Treasury\'s Green Book mandates 3.5% as the Social Time Preference Rate (STPR) for public sector investment appraisals. This rate reflects the value society places on present consumption versus future consumption. For projects over 30 years, declining rates apply (3.0% for years 31-75). Private sector organisations typically use their Weighted Average Cost of Capital (WACC), which may be 6-12% depending on the company.'
    },
    {
      question: 'When should I use NPV versus IRR for project evaluation?',
      answer: 'Use NPV as your primary metric - it shows absolute value added in pounds. IRR is useful for comparing projects of different sizes and communicating returns in percentage terms that managers understand. However, IRR can give misleading results with non-conventional cash flows (multiple sign changes). Always calculate both: NPV for decision-making, IRR for communication. If NPV is positive and IRR exceeds your hurdle rate, the project is financially sound.'
    },
    {
      question: 'How do I handle uncertainty in energy price forecasts?',
      answer: 'Use sensitivity analysis with three scenarios: Base Case (current prices + 3% annual inflation), High Case (+5-7% annually reflecting supply constraints), and Low Case (+1-2% reflecting efficiency improvements). Present the NPV range rather than a single figure. For major investments, use Monte Carlo simulation if available. Document your assumptions clearly - BEIS publishes energy price projections that provide credible baseline forecasts.'
    },
    {
      question: 'What\'s the difference between simple and discounted payback?',
      answer: 'Simple payback divides initial cost by annual savings - quick and easy but ignores time value of money. A £10,000 saving in Year 5 is worth less than £10,000 today. Discounted payback applies the discount rate to future savings, giving a more accurate picture. Example: Simple payback of 4 years might become 4.5-5 years when discounted at 3.5%. Use simple payback for quick screening, discounted payback for formal business cases.'
    },
    {
      question: 'How do I compare equipment with different lifespans using LCC?',
      answer: 'Use the Equivalent Annual Cost (EAC) method. Calculate each option\'s NPV of total lifecycle costs, then divide by the annuity factor for its lifespan. This gives a comparable annual cost figure. Alternatively, analyse over a common period (e.g., 20 years) and include replacement costs for shorter-life equipment. For motors, compare 15-20 year horizons; for lighting, use 50,000-100,000 operating hours as the comparison basis.'
    },
    {
      question: 'What should I include in a business case for senior management?',
      answer: 'Structure your business case with: 1) Executive Summary (one-page with key financials), 2) Problem Statement (current costs, inefficiencies, risks), 3) Proposed Solution (technical overview, not detail), 4) Financial Analysis (NPV, IRR, payback with sensitivity analysis), 5) Risk Assessment (technical, financial, operational risks and mitigations), 6) Implementation Plan (timeline, resources, disruption), 7) Recommendation. Lead with money saved, risk reduced, and payback achieved - technical benefits support but don\'t lead.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
            <BookOpen className="w-4 h-4" />
            <span>Module 6: Financial Analysis for Energy Projects</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-elec-yellow mb-2">
            Section 2: ROI Models - Payback, IRR, Life Cycle Costing
          </h1>
          <p className="text-gray-300">
            Master the financial tools that turn energy efficiency ideas into approved projects
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Introduction */}
        <div className="bg-[#242424] rounded-lg p-6 mb-8 border-l-4 border-elec-yellow">
          <div className="flex items-start gap-4">
            <Calculator className="w-8 h-8 text-elec-yellow flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-semibold text-elec-yellow mb-2">Why Financial Analysis Matters</h2>
              <p className="text-gray-300">
                The best energy efficiency projects fail without proper financial justification. This section
                equips you with the ROI models that finance directors and procurement teams expect to see.
                You'll learn to speak the language of business cases, using UK-standard discount rates and
                professional analysis techniques that get projects approved and funded.
              </p>
            </div>
          </div>
        </div>

        {/* Section 1: Simple and Discounted Payback */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-black w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
              1
            </div>
            <h2 className="text-xl md:text-2xl font-semibold text-white">
              Simple and Discounted Payback Periods
            </h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Payback period is often the first question asked about any energy investment: "How long until
              we get our money back?" Understanding both simple and discounted payback gives you the tools
              to answer confidently.
            </p>

            <div className="bg-[#242424] rounded-lg p-5 border border-gray-700">
              <h3 className="text-lg font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Simple Payback Period
              </h3>
              <div className="bg-[#1a1a1a] rounded p-4 mb-4 font-mono text-center">
                <span className="text-elec-yellow">Simple Payback (years)</span> = Initial Investment ÷ Annual Net Savings
              </div>
              <div className="space-y-3">
                <p><strong className="text-white">Worked Example - LED Upgrade:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Initial cost: £24,000 (materials + installation)</li>
                  <li>Annual energy savings: £7,200</li>
                  <li>Annual maintenance savings: £800</li>
                  <li>Total annual savings: £8,000</li>
                  <li className="text-elec-yellow">Simple Payback = £24,000 ÷ £8,000 = 3.0 years</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#242424] rounded-lg p-5 border border-gray-700">
              <h3 className="text-lg font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Discounted Payback Period
              </h3>
              <p className="mb-3">
                Discounted payback accounts for the <strong className="text-white">time value of money</strong> -
                a pound today is worth more than a pound in five years. This gives a more accurate picture
                for longer-term projects.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left py-2 px-3 text-elec-yellow">Year</th>
                      <th className="text-right py-2 px-3 text-elec-yellow">Savings</th>
                      <th className="text-right py-2 px-3 text-elec-yellow">Discount Factor (3.5%)</th>
                      <th className="text-right py-2 px-3 text-elec-yellow">Present Value</th>
                      <th className="text-right py-2 px-3 text-elec-yellow">Cumulative PV</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-700">
                      <td className="py-2 px-3">0</td>
                      <td className="text-right py-2 px-3 text-red-400">-£24,000</td>
                      <td className="text-right py-2 px-3">1.000</td>
                      <td className="text-right py-2 px-3">-£24,000</td>
                      <td className="text-right py-2 px-3">-£24,000</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2 px-3">1</td>
                      <td className="text-right py-2 px-3 text-green-400">+£8,000</td>
                      <td className="text-right py-2 px-3">0.966</td>
                      <td className="text-right py-2 px-3">£7,729</td>
                      <td className="text-right py-2 px-3">-£16,271</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2 px-3">2</td>
                      <td className="text-right py-2 px-3 text-green-400">+£8,000</td>
                      <td className="text-right py-2 px-3">0.934</td>
                      <td className="text-right py-2 px-3">£7,469</td>
                      <td className="text-right py-2 px-3">-£8,802</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2 px-3">3</td>
                      <td className="text-right py-2 px-3 text-green-400">+£8,000</td>
                      <td className="text-right py-2 px-3">0.902</td>
                      <td className="text-right py-2 px-3">£7,217</td>
                      <td className="text-right py-2 px-3">-£1,585</td>
                    </tr>
                    <tr className="bg-[#1a1a1a]">
                      <td className="py-2 px-3">4</td>
                      <td className="text-right py-2 px-3 text-green-400">+£8,000</td>
                      <td className="text-right py-2 px-3">0.871</td>
                      <td className="text-right py-2 px-3">£6,974</td>
                      <td className="text-right py-2 px-3 text-elec-yellow">+£5,389</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-elec-yellow">
                <strong>Discounted Payback ≈ 3.2 years</strong> (vs 3.0 years simple payback)
              </p>
            </div>

            <div className="bg-blue-900/30 rounded-lg p-4 border border-blue-700">
              <h4 className="font-semibold text-blue-400 mb-2">Excel Tip: Discount Factor Formula</h4>
              <code className="bg-[#1a1a1a] px-2 py-1 rounded text-sm block">
                =1/(1+discount_rate)^year_number
              </code>
              <p className="text-sm mt-2">
                For Year 3 at 3.5%: =1/(1+0.035)^3 = 0.902
              </p>
            </div>
          </div>
        </section>

        {/* Quick Check 1 */}
        <div className="mb-10">
          <InlineCheck
            id={quickCheckQuestions[0].id}
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
        </div>

        {/* Section 2: NPV Deep Dive */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-black w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
              2
            </div>
            <h2 className="text-xl md:text-2xl font-semibold text-white">
              Net Present Value (NPV) Deep Dive
            </h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              NPV is the gold standard for investment appraisal. It tells you the total value a project
              adds (or destroys) in today's pounds, accounting for the time value of money.
            </p>

            <div className="bg-[#242424] rounded-lg p-5 border border-gray-700">
              <h3 className="text-lg font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                <PoundSterling className="w-5 h-5" />
                NPV Formula and Interpretation
              </h3>
              <div className="bg-[#1a1a1a] rounded p-4 mb-4 font-mono text-center text-sm md:text-base">
                <span className="text-elec-yellow">NPV</span> = Σ [Cash Flow<sub>t</sub> ÷ (1 + r)<sup>t</sup>] - Initial Investment
              </div>
              <div className="grid md:grid-cols-3 gap-4 mt-4">
                <div className="bg-green-900/30 rounded p-3 border border-green-700 text-center">
                  <CheckCircle2 className="w-6 h-6 text-green-400 mx-auto mb-2" />
                  <p className="font-semibold text-green-400">NPV {'>'} 0</p>
                  <p className="text-sm">Project adds value - ACCEPT</p>
                </div>
                <div className="bg-gray-700/30 rounded p-3 border border-gray-600 text-center">
                  <Target className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                  <p className="font-semibold text-gray-300">NPV = 0</p>
                  <p className="text-sm">Returns equal cost of capital</p>
                </div>
                <div className="bg-red-900/30 rounded p-3 border border-red-700 text-center">
                  <AlertTriangle className="w-6 h-6 text-red-400 mx-auto mb-2" />
                  <p className="font-semibold text-red-400">NPV {'<'} 0</p>
                  <p className="text-sm">Project destroys value - REJECT</p>
                </div>
              </div>
            </div>

            <div className="bg-[#242424] rounded-lg p-5 border border-gray-700">
              <h3 className="text-lg font-semibold text-elec-yellow mb-3">
                Worked Example: VSD Installation for HVAC Pumps
              </h3>
              <div className="space-y-3">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Investment: £18,500</li>
                  <li>Project life: 10 years</li>
                  <li>Annual energy savings: £4,200</li>
                  <li>Annual maintenance savings: £300</li>
                  <li>Discount rate: 3.5% (UK public sector)</li>
                </ul>
                <div className="bg-[#1a1a1a] rounded p-4 mt-4">
                  <p className="font-semibold text-white mb-2">Excel NPV Calculation:</p>
                  <code className="text-elec-yellow block mb-2">
                    =NPV(0.035, B2:B11) - B1
                  </code>
                  <p className="text-sm">Where B1 = initial investment, B2:B11 = annual cash flows</p>
                  <div className="mt-3 pt-3 border-t border-gray-700">
                    <p><strong>Annual cash flow:</strong> £4,500</p>
                    <p><strong>NPV (10 years):</strong> £18,776</p>
                    <p className="text-green-400 font-semibold mt-2">
                      Positive NPV of £18,776 - project more than doubles the investment value!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-amber-900/30 rounded-lg p-4 border border-amber-700">
              <h4 className="font-semibold text-amber-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Common NPV Mistakes to Avoid
              </h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Excel's NPV function assumes cash flows start in Year 1 - add Year 0 separately</li>
                <li>Using nominal vs real discount rates inconsistently with cash flows</li>
                <li>Forgetting to include residual/salvage value at project end</li>
                <li>Not adjusting for inflation in long-term energy price assumptions</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quick Check 2 */}
        <div className="mb-10">
          <InlineCheck
            id={quickCheckQuestions[1].id}
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
        </div>

        {/* Section 3: IRR Methodology */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-black w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
              3
            </div>
            <h2 className="text-xl md:text-2xl font-semibold text-white">
              Internal Rate of Return (IRR) Methodology
            </h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              IRR answers the question: "What return does this project actually generate?" It's the
              discount rate that makes NPV equal to zero - essentially the project's break-even cost of capital.
            </p>

            <div className="bg-[#242424] rounded-lg p-5 border border-gray-700">
              <h3 className="text-lg font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                IRR Decision Rule
              </h3>
              <div className="bg-[#1a1a1a] rounded p-4 mb-4">
                <p className="text-center text-lg">
                  If <span className="text-elec-yellow font-semibold">IRR {'>'} Hurdle Rate</span> → Accept Project
                </p>
              </div>
              <div className="space-y-3">
                <p>
                  <strong className="text-white">Hurdle Rate</strong> = minimum acceptable return, typically:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>UK Public Sector: 3.5% (HM Treasury Green Book)</li>
                  <li>Private Sector: 8-15% (depends on company's WACC)</li>
                  <li>High-risk projects: Add 2-5% premium</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#242424] rounded-lg p-5 border border-gray-700">
              <h3 className="text-lg font-semibold text-elec-yellow mb-3">
                Worked Example: Motor Replacement IRR
              </h3>
              <div className="space-y-3">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Replace IE2 motor with IE4: £2,800</li>
                  <li>Annual energy savings: £620</li>
                  <li>Motor life: 15 years</li>
                </ul>
                <div className="bg-[#1a1a1a] rounded p-4 mt-4">
                  <p className="font-semibold text-white mb-2">Excel IRR Calculation:</p>
                  <code className="text-elec-yellow block mb-2">
                    =IRR(A1:A16)
                  </code>
                  <p className="text-sm mb-3">Where A1 = -2800, A2:A16 = 620 (15 years of savings)</p>
                  <p className="text-green-400 font-semibold">
                    IRR = 20.8% - significantly exceeds any typical hurdle rate!
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-900/30 rounded-lg p-4 border border-green-700">
                <h4 className="font-semibold text-green-400 mb-2">IRR Strengths</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Percentage return easy to understand</li>
                  <li>Compares projects of different sizes</li>
                  <li>Intuitive for non-financial managers</li>
                  <li>Shows project's inherent profitability</li>
                </ul>
              </div>
              <div className="bg-red-900/30 rounded-lg p-4 border border-red-700">
                <h4 className="font-semibold text-red-400 mb-2">IRR Limitations</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Can give multiple values with irregular cash flows</li>
                  <li>Assumes reinvestment at IRR rate</li>
                  <li>Doesn't show absolute value added</li>
                  <li>Can mislead when comparing project scale</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Life Cycle Costing */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-black w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
              4
            </div>
            <h2 className="text-xl md:text-2xl font-semibold text-white">
              Life Cycle Costing (LCC) for Equipment Decisions
            </h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Life Cycle Costing reveals the true cost of ownership, not just purchase price. For electrical
              equipment, this analysis often completely changes the "cheapest" option.
            </p>

            <div className="bg-[#242424] rounded-lg p-5 border border-gray-700">
              <h3 className="text-lg font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                LCC Components
              </h3>
              <div className="bg-[#1a1a1a] rounded p-4 mb-4 font-mono text-center">
                <span className="text-elec-yellow">LCC</span> = Capital + Installation + Energy + Maintenance + Disposal
              </div>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <h4 className="font-semibold text-white mb-2">Capital Costs</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Equipment purchase price</li>
                    <li>Delivery and handling</li>
                    <li>Installation labour</li>
                    <li>Commissioning and testing</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Operating Costs</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Energy consumption</li>
                    <li>Planned maintenance</li>
                    <li>Repairs and downtime</li>
                    <li>Consumables and spares</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#242424] rounded-lg p-5 border border-gray-700">
              <h3 className="text-lg font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Motor LCC Comparison: IE2 vs IE4
              </h3>
              <p className="mb-4 text-sm">11kW motor, 6,000 operating hours/year, 15-year life, £0.22/kWh</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left py-2 px-3 text-elec-yellow">Cost Component</th>
                      <th className="text-right py-2 px-3 text-elec-yellow">IE2 Motor</th>
                      <th className="text-right py-2 px-3 text-elec-yellow">IE4 Motor</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-700">
                      <td className="py-2 px-3">Purchase Price</td>
                      <td className="text-right py-2 px-3">£680</td>
                      <td className="text-right py-2 px-3">£1,150</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2 px-3">Efficiency</td>
                      <td className="text-right py-2 px-3">87.6%</td>
                      <td className="text-right py-2 px-3">92.6%</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2 px-3">Annual Energy Use</td>
                      <td className="text-right py-2 px-3">75,342 kWh</td>
                      <td className="text-right py-2 px-3">71,274 kWh</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2 px-3">Annual Energy Cost</td>
                      <td className="text-right py-2 px-3">£16,575</td>
                      <td className="text-right py-2 px-3">£15,680</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2 px-3">15-Year Energy Cost</td>
                      <td className="text-right py-2 px-3">£248,625</td>
                      <td className="text-right py-2 px-3">£235,200</td>
                    </tr>
                    <tr className="bg-[#1a1a1a]">
                      <td className="py-2 px-3 font-semibold">Total LCC</td>
                      <td className="text-right py-2 px-3 text-red-400 font-semibold">£249,305</td>
                      <td className="text-right py-2 px-3 text-green-400 font-semibold">£236,350</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-elec-yellow font-semibold">
                The "expensive" IE4 motor saves £12,955 over its lifetime - a 6x return on the £470 premium!
              </p>
            </div>

            <div className="bg-[#242424] rounded-lg p-5 border border-gray-700">
              <h3 className="text-lg font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Lighting LCC Comparison: T8 Fluorescent vs LED
              </h3>
              <p className="mb-4 text-sm">Warehouse with 200 fittings, 4,000 hours/year, 10-year analysis</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left py-2 px-3 text-elec-yellow">Cost Component</th>
                      <th className="text-right py-2 px-3 text-elec-yellow">T8 Fluorescent</th>
                      <th className="text-right py-2 px-3 text-elec-yellow">LED Panel</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-700">
                      <td className="py-2 px-3">Capital Cost (200 units)</td>
                      <td className="text-right py-2 px-3">£8,000</td>
                      <td className="text-right py-2 px-3">£22,000</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2 px-3">Wattage per Fitting</td>
                      <td className="text-right py-2 px-3">72W</td>
                      <td className="text-right py-2 px-3">36W</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2 px-3">Annual Energy Cost</td>
                      <td className="text-right py-2 px-3">£12,672</td>
                      <td className="text-right py-2 px-3">£6,336</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2 px-3">Lamp Replacements (10yr)</td>
                      <td className="text-right py-2 px-3">£6,000</td>
                      <td className="text-right py-2 px-3">£0</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2 px-3">10-Year Energy + Maint</td>
                      <td className="text-right py-2 px-3">£132,720</td>
                      <td className="text-right py-2 px-3">£63,360</td>
                    </tr>
                    <tr className="bg-[#1a1a1a]">
                      <td className="py-2 px-3 font-semibold">Total LCC</td>
                      <td className="text-right py-2 px-3 text-red-400 font-semibold">£140,720</td>
                      <td className="text-right py-2 px-3 text-green-400 font-semibold">£85,360</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-elec-yellow font-semibold">
                LED LCC is £55,360 lower despite £14,000 higher capital cost - 39% lifetime savings!
              </p>
            </div>
          </div>
        </section>

        {/* Quick Check 3 */}
        <div className="mb-10">
          <InlineCheck
            id={quickCheckQuestions[2].id}
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
        </div>

        {/* Section 5: Sensitivity Analysis */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-black w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
              5
            </div>
            <h2 className="text-xl md:text-2xl font-semibold text-white">
              Sensitivity Analysis and Risk Assessment
            </h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Real-world projects face uncertainty. Sensitivity analysis shows how your results change
              when key assumptions vary, giving decision makers confidence in robustness.
            </p>

            <div className="bg-[#242424] rounded-lg p-5 border border-gray-700">
              <h3 className="text-lg font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                <PieChart className="w-5 h-5" />
                Key Variables to Test
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-white mb-2">Financial Variables</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Energy price escalation (±2% pa)</li>
                    <li>Discount rate (±1-2%)</li>
                    <li>Capital cost overrun (+10-20%)</li>
                    <li>Project life (±2-3 years)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Technical Variables</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Actual vs predicted savings (±15%)</li>
                    <li>Operating hours variation</li>
                    <li>Maintenance cost changes</li>
                    <li>Equipment degradation rates</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#242424] rounded-lg p-5 border border-gray-700">
              <h3 className="text-lg font-semibold text-elec-yellow mb-3">
                Scenario Analysis Framework
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left py-2 px-3 text-elec-yellow">Scenario</th>
                      <th className="text-center py-2 px-3 text-elec-yellow">Energy Inflation</th>
                      <th className="text-center py-2 px-3 text-elec-yellow">Savings Achieved</th>
                      <th className="text-right py-2 px-3 text-elec-yellow">NPV Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-700">
                      <td className="py-2 px-3 text-red-400">Pessimistic</td>
                      <td className="text-center py-2 px-3">+1% pa</td>
                      <td className="text-center py-2 px-3">85%</td>
                      <td className="text-right py-2 px-3">£12,450</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2 px-3 text-gray-300">Base Case</td>
                      <td className="text-center py-2 px-3">+3% pa</td>
                      <td className="text-center py-2 px-3">100%</td>
                      <td className="text-right py-2 px-3">£18,776</td>
                    </tr>
                    <tr className="bg-[#1a1a1a]">
                      <td className="py-2 px-3 text-green-400">Optimistic</td>
                      <td className="text-center py-2 px-3">+5% pa</td>
                      <td className="text-center py-2 px-3">110%</td>
                      <td className="text-right py-2 px-3">£26,890</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-sm">
                <strong className="text-white">Result:</strong> NPV remains positive across all scenarios,
                demonstrating project robustness to assumption changes.
              </p>
            </div>

            <div className="bg-purple-900/30 rounded-lg p-4 border border-purple-700">
              <h4 className="font-semibold text-purple-400 mb-2 flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5" />
                Excel Data Table for Sensitivity
              </h4>
              <p className="text-sm mb-2">
                Use Excel's Data Table feature to automatically calculate NPV across variable ranges:
              </p>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Set up your NPV formula referencing input cells</li>
                <li>Create a row/column of test values</li>
                <li>Select the table range → Data → What-If Analysis → Data Table</li>
                <li>Link row/column input cells to your variables</li>
              </ol>
            </div>

            <div className="bg-[#242424] rounded-lg p-5 border border-gray-700">
              <h3 className="text-lg font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Risk Register Template
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left py-2 px-3 text-elec-yellow">Risk</th>
                      <th className="text-center py-2 px-3 text-elec-yellow">Likelihood</th>
                      <th className="text-center py-2 px-3 text-elec-yellow">Impact</th>
                      <th className="text-left py-2 px-3 text-elec-yellow">Mitigation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-700">
                      <td className="py-2 px-3">Savings below forecast</td>
                      <td className="text-center py-2 px-3">Medium</td>
                      <td className="text-center py-2 px-3">High</td>
                      <td className="py-2 px-3">M&V plan, performance guarantee</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2 px-3">Cost overrun</td>
                      <td className="text-center py-2 px-3">Medium</td>
                      <td className="text-center py-2 px-3">Medium</td>
                      <td className="py-2 px-3">Fixed-price contracts, contingency</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2 px-3">Equipment failure</td>
                      <td className="text-center py-2 px-3">Low</td>
                      <td className="text-center py-2 px-3">High</td>
                      <td className="py-2 px-3">Warranty, reputable suppliers</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">Energy price drop</td>
                      <td className="text-center py-2 px-3">Low</td>
                      <td className="text-center py-2 px-3">Medium</td>
                      <td className="py-2 px-3">Conservative base case</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Presenting Financial Cases */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-black w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
              6
            </div>
            <h2 className="text-xl md:text-2xl font-semibold text-white">
              Presenting Financial Cases to Decision Makers
            </h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Even the best analysis fails if poorly communicated. Learn to present business cases that
              resonate with finance directors, board members, and procurement teams.
            </p>

            <div className="bg-[#242424] rounded-lg p-5 border border-gray-700">
              <h3 className="text-lg font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                <Presentation className="w-5 h-5" />
                Business Case Structure
              </h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="bg-elec-yellow text-black w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Executive Summary (1 page)</h4>
                    <p className="text-sm">Investment request, key returns, payback, recommendation. Decision makers read this first - some only read this.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="bg-elec-yellow text-black w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Problem Statement</h4>
                    <p className="text-sm">Current state costs, inefficiencies, risks of inaction (compliance, maintenance, energy prices).</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="bg-elec-yellow text-black w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Proposed Solution</h4>
                    <p className="text-sm">Technical overview (not detail), scope, timeline, options considered.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="bg-elec-yellow text-black w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Financial Analysis</h4>
                    <p className="text-sm">NPV, IRR, payback, LCC comparison with sensitivity analysis and clear assumptions.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="bg-elec-yellow text-black w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    5
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Risk Assessment</h4>
                    <p className="text-sm">Technical, financial, operational risks with mitigations. Shows you've thought it through.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="bg-elec-yellow text-black w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    6
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Recommendation</h4>
                    <p className="text-sm">Clear ask with next steps and approval required.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#242424] rounded-lg p-5 border border-gray-700">
              <h3 className="text-lg font-semibold text-elec-yellow mb-3">
                Executive Summary Template
              </h3>
              <div className="bg-[#1a1a1a] rounded p-4 text-sm space-y-3">
                <div className="border-b border-gray-700 pb-3">
                  <p className="font-semibold text-white">Investment Request: £24,000</p>
                  <p className="text-gray-400">LED Lighting Upgrade - Manufacturing Hall</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-gray-400 text-xs">Simple Payback</p>
                    <p className="text-elec-yellow font-semibold text-lg">3.0 years</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">NPV (10 years)</p>
                    <p className="text-green-400 font-semibold text-lg">£38,500</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">IRR</p>
                    <p className="text-green-400 font-semibold text-lg">28.4%</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">Annual Savings</p>
                    <p className="text-green-400 font-semibold text-lg">£8,000</p>
                  </div>
                </div>
                <div className="border-t border-gray-700 pt-3">
                  <p className="text-gray-400 text-xs mb-1">Key Benefits</p>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>50% energy reduction for lighting</li>
                    <li>Eliminates lamp replacement costs (£800/year)</li>
                    <li>Improved light quality and worker satisfaction</li>
                    <li>Reduced maintenance access requirements</li>
                  </ul>
                </div>
                <div className="border-t border-gray-700 pt-3">
                  <p className="font-semibold text-white">Recommendation: APPROVE</p>
                  <p className="text-gray-400 text-sm">Strong financial returns with low technical risk. Project aligns with carbon reduction targets.</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-900/30 rounded-lg p-4 border border-green-700">
                <h4 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Do's
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Lead with financial returns</li>
                  <li>Use graphs and visuals for trends</li>
                  <li>State assumptions clearly</li>
                  <li>Acknowledge risks and mitigations</li>
                  <li>Provide a clear recommendation</li>
                  <li>Include sensitivity analysis</li>
                </ul>
              </div>
              <div className="bg-red-900/30 rounded-lg p-4 border border-red-700">
                <h4 className="font-semibold text-red-400 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Don'ts
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Lead with technical specifications</li>
                  <li>Use jargon without explanation</li>
                  <li>Hide unfavourable assumptions</li>
                  <li>Present only best-case scenario</li>
                  <li>Bury the ask in the middle</li>
                  <li>Provide excessive technical detail</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-900/30 rounded-lg p-4 border border-blue-700">
              <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Know Your Audience
              </h4>
              <div className="grid md:grid-cols-3 gap-4 mt-3 text-sm">
                <div>
                  <p className="font-semibold text-white">Finance Director</p>
                  <p className="text-gray-400">Wants: NPV, IRR, cash flow impact, risk profile</p>
                </div>
                <div>
                  <p className="font-semibold text-white">Operations Manager</p>
                  <p className="text-gray-400">Wants: Disruption, reliability, maintenance benefits</p>
                </div>
                <div>
                  <p className="font-semibold text-white">Sustainability Lead</p>
                  <p className="text-gray-400">Wants: Carbon savings, reporting metrics, certifications</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="mb-10">
          <div className="bg-gradient-to-r from-[#2a2a2a] to-[#1a1a1a] rounded-lg p-6 border border-elec-yellow">
            <h2 className="text-xl font-bold text-elec-yellow mb-4 flex items-center gap-2">
              <Calculator className="w-6 h-6" />
              Quick Reference: ROI Formulas & Excel Functions
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-white mb-2">Simple Payback</h3>
                  <code className="bg-[#1a1a1a] px-3 py-2 rounded block text-sm text-elec-yellow">
                    = Initial Cost / Annual Savings
                  </code>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Discount Factor</h3>
                  <code className="bg-[#1a1a1a] px-3 py-2 rounded block text-sm text-elec-yellow">
                    = 1 / (1 + r)^n
                  </code>
                  <p className="text-xs text-gray-400 mt-1">Excel: =1/(1+rate)^year</p>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Present Value</h3>
                  <code className="bg-[#1a1a1a] px-3 py-2 rounded block text-sm text-elec-yellow">
                    = Future Value × Discount Factor
                  </code>
                  <p className="text-xs text-gray-400 mt-1">Excel: =PV(rate, nper, pmt, fv)</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-white mb-2">Net Present Value</h3>
                  <code className="bg-[#1a1a1a] px-3 py-2 rounded block text-sm text-elec-yellow">
                    = Sum of PVs - Initial Investment
                  </code>
                  <p className="text-xs text-gray-400 mt-1">Excel: =NPV(rate, values) + Year0</p>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Internal Rate of Return</h3>
                  <code className="bg-[#1a1a1a] px-3 py-2 rounded block text-sm text-elec-yellow">
                    = Rate where NPV = 0
                  </code>
                  <p className="text-xs text-gray-400 mt-1">Excel: =IRR(values, [guess])</p>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Life Cycle Cost</h3>
                  <code className="bg-[#1a1a1a] px-3 py-2 rounded block text-sm text-elec-yellow">
                    = Capital + NPV(Operating) + NPV(Disposal)
                  </code>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-700">
              <h3 className="font-semibold text-white mb-2">UK Public Sector Discount Rates (HM Treasury Green Book)</h3>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <p className="text-elec-yellow font-semibold text-lg">3.5%</p>
                  <p className="text-gray-400">Years 0-30</p>
                </div>
                <div className="text-center">
                  <p className="text-elec-yellow font-semibold text-lg">3.0%</p>
                  <p className="text-gray-400">Years 31-75</p>
                </div>
                <div className="text-center">
                  <p className="text-elec-yellow font-semibold text-lg">2.5%</p>
                  <p className="text-gray-400">Years 76-125</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-elec-yellow mb-4 flex items-center gap-2">
            <Lightbulb className="w-6 h-6" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-[#242424] rounded-lg border border-gray-700 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left min-h-[44px] touch-manipulation hover:bg-[#2a2a2a] transition-colors"
                >
                  <span className="font-medium text-white pr-4">{faq.question}</span>
                  {expandedFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                  )}
                </button>
                {expandedFAQ === index && (
                  <div className="px-4 pb-4 text-gray-300 border-t border-gray-700 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <section className="mb-10">
          <Quiz
            title="Section 2 Knowledge Check"
            questions={quizQuestions}
            passingScore={70}
          />
        </section>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-gray-700">
          <Button
            onClick={() => navigate('/upskilling/energy-efficiency/module-6/section-1')}
            variant="outline"
            className="min-h-[44px] touch-manipulation bg-transparent border-gray-600 text-white hover:bg-gray-800 hover:text-elec-yellow flex items-center gap-2"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous: Section 1 - Energy Audit Fundamentals</span>
          </Button>
          <Button
            onClick={() => navigate('/upskilling/energy-efficiency/module-6/section-3')}
            className="min-h-[44px] touch-manipulation bg-elec-yellow text-black hover:bg-yellow-400 flex items-center gap-2"
          >
            <span>Next: Section 3 - Financing & Incentives</span>
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EnergyEfficiencyModule6Section2;
