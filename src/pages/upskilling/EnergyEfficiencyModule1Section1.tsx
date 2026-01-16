import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { useSEO } from '@/hooks/useSEO';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  PoundSterling,
  Leaf,
  Shield,
  Trophy,
  Rocket,
  BookOpen,
  Target,
  TrendingDown,
  Building2,
  Zap,
  CheckCircle2
} from 'lucide-react';

const EnergyEfficiencyModule1Section1: React.FC = () => {
  const navigate = useNavigate();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  useSEO({
    title: 'The Purpose and Business Case for Efficiency | Energy Efficiency Module 1',
    description: 'Learn why energy efficiency matters for UK businesses, including cost reduction, carbon targets, and competitive advantage. Comprehensive guide with real statistics and practical insights.',
    keywords: 'energy efficiency, UK business energy, carbon reduction, sustainability, cost savings, ESOS, net zero'
  });

  const quickCheckQuestions = [
    {
      id: 'qc1-business-case',
      question: 'What percentage of UK businesses cite energy costs as a significant operational concern according to recent surveys?',
      options: ['Around 45%', 'Around 65%', 'Around 85%', 'Around 95%'],
      correctIndex: 2,
      explanation: 'Around 85% of UK businesses now cite energy costs as a significant operational concern, particularly following the energy price increases of 2022-2023 which saw some businesses face bills 3-4 times higher than previous years.'
    },
    {
      id: 'qc2-payback',
      question: 'What is the typical payback period for LED lighting upgrades in commercial buildings?',
      options: ['6-12 months', '1-3 years', '5-7 years', '10+ years'],
      correctIndex: 1,
      explanation: 'LED lighting upgrades typically achieve payback within 1-3 years, making them one of the quickest wins for energy efficiency. With energy prices remaining elevated, many installations now pay back even faster.'
    },
    {
      id: 'qc3-net-zero',
      question: 'By what year has the UK legally committed to achieving net zero carbon emissions?',
      options: ['2030', '2040', '2050', '2060'],
      correctIndex: 2,
      explanation: 'The UK has a legally binding commitment under the Climate Change Act to achieve net zero greenhouse gas emissions by 2050. Interim targets include a 78% reduction by 2035 compared to 1990 levels.'
    }
  ];

  const quizQuestions = [
    {
      question: 'Which UK regulation requires large enterprises to conduct energy audits every 4 years?',
      options: ['Building Regulations Part L', 'ESOS (Energy Savings Opportunity Scheme)', 'MEES Regulations', 'Climate Change Levy'],
      correctAnswer: 'ESOS (Energy Savings Opportunity Scheme)'
    },
    {
      question: 'What is the minimum EPC rating required for commercial properties to be legally let in England and Wales?',
      options: ['Rating A', 'Rating C', 'Rating E', 'Rating G'],
      correctAnswer: 'Rating E'
    },
    {
      question: 'Approximately what percentage of a typical commercial building\'s energy consumption is used for HVAC systems?',
      options: ['10-20%', '25-35%', '40-60%', '70-80%'],
      correctAnswer: '40-60%'
    },
    {
      question: 'Which of these is NOT typically considered a direct benefit of energy efficiency?',
      options: ['Reduced operational costs', 'Lower carbon emissions', 'Increased property value', 'Higher staff turnover'],
      correctAnswer: 'Higher staff turnover'
    },
    {
      question: 'What does SECR stand for in UK energy reporting requirements?',
      options: [
        'Sustainable Energy Carbon Reporting',
        'Streamlined Energy and Carbon Reporting',
        'Standard Environmental Compliance Review',
        'Strategic Energy Cost Reduction'
      ],
      correctAnswer: 'Streamlined Energy and Carbon Reporting'
    },
    {
      question: 'By what percentage did UK non-domestic electricity prices increase between 2021 and 2023?',
      options: ['50-75%', '100-150%', '150-200%', '200-300%'],
      correctAnswer: '150-200%'
    },
    {
      question: 'Which approach to energy management involves continuous monitoring and optimisation?',
      options: ['One-off audit', 'ISO 50001', 'Visual inspection', 'Annual review'],
      correctAnswer: 'ISO 50001'
    },
    {
      question: 'What is "Scope 2" emissions in carbon accounting?',
      options: [
        'Direct emissions from owned sources',
        'Indirect emissions from purchased electricity',
        'All supply chain emissions',
        'Employee commuting emissions'
      ],
      correctAnswer: 'Indirect emissions from purchased electricity'
    },
    {
      question: 'Which of these typically offers the fastest return on investment for energy efficiency?',
      options: ['Building fabric insulation', 'Solar PV installation', 'Behavioural change programmes', 'Building Management System upgrade'],
      correctAnswer: 'Behavioural change programmes'
    },
    {
      question: 'What percentage of UK SMEs report that sustainability credentials influence their choice of suppliers?',
      options: ['Around 25%', 'Around 45%', 'Around 65%', 'Around 85%'],
      correctAnswer: 'Around 65%'
    }
  ];

  const faqs = [
    {
      question: 'How much can a typical UK business save through energy efficiency measures?',
      answer: 'Most UK businesses can achieve energy savings of 10-30% through no-cost and low-cost measures such as behavioural changes, optimising heating schedules, and switching off equipment. With capital investment in efficient equipment and building improvements, savings of 30-50% are commonly achieved. The Carbon Trust estimates that UK SMEs alone could save £2.5 billion annually through cost-effective efficiency measures.'
    },
    {
      question: 'What are the legal requirements for energy efficiency in UK businesses?',
      answer: 'Legal requirements vary by business size and sector. Large enterprises (250+ employees or £44m+ turnover) must comply with ESOS and SECR reporting. Commercial landlords must meet MEES regulations (minimum EPC E, with proposals to increase to C by 2027-2030). All businesses must comply with Building Regulations Part L for new installations. Public sector bodies have additional requirements under the Greening Government Commitments.'
    },
    {
      question: 'What is the best first step for improving energy efficiency?',
      answer: 'The best first step is understanding your current energy consumption through metering and monitoring. This baseline allows you to identify the biggest opportunities and measure improvements. Start by reviewing your energy bills, installing smart meters if you haven\'t already, and conducting a walk-through survey to identify obvious waste such as heating empty spaces or lighting areas unnecessarily.'
    },
    {
      question: 'How does energy efficiency contribute to net zero targets?',
      answer: 'Energy efficiency is often called "the first fuel" because reducing energy demand is the most cost-effective way to cut carbon emissions. For most businesses, purchased electricity and gas (Scope 1 and 2 emissions) represent a significant portion of their carbon footprint. Reducing consumption directly reduces emissions and makes the transition to renewable energy sources more affordable and practical.'
    },
    {
      question: 'What funding is available for business energy efficiency in the UK?',
      answer: 'Various funding options exist including: Enhanced Capital Allowances for qualifying equipment, government-backed loans through the British Business Bank, local authority grants and schemes, supplier-funded Energy Company Obligation (ECO) measures for eligible businesses, and sector-specific programmes. The government\'s Find Business Support portal provides a searchable database of available grants and support.'
    },
    {
      question: 'How long do energy efficiency projects typically take to pay back?',
      answer: 'Payback periods vary significantly by measure. Behavioural changes and operational improvements often pay back immediately with no capital cost. LED lighting typically achieves 1-3 year payback. Building Management Systems and controls achieve 2-5 years. Building fabric improvements like insulation may take 5-10 years but offer the longest lifespan of benefits (30+ years). Heat pumps typically achieve 5-8 year payback with current incentives.'
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a] text-white">
      {/* Header */}
      <div className="bg-[#1a1a1a]/95 border-b border-gray-800">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
            <BookOpen className="w-4 h-4" />
            <span>Module 1: Foundations of Energy Efficiency</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-elec-yellow mb-2">
            Section 1: The Purpose and Business Case for Efficiency
          </h1>
          <p className="text-gray-300">
            Understanding why energy efficiency is essential for modern UK businesses
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-12">
        {/* Section 1: Why Energy Efficiency Matters */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold">
              1
            </div>
            <h2 className="text-xl md:text-2xl font-semibold flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-elec-yellow" />
              Why Energy Efficiency Matters for Businesses
            </h2>
          </div>

          <div className="bg-[#2a2a2a] rounded-lg p-6 space-y-4">
            <p className="text-gray-300 leading-relaxed">
              Energy efficiency has moved from a "nice to have" environmental initiative to a
              <span className="text-elec-yellow font-medium"> business-critical priority</span> for
              UK organisations of all sizes. The energy crisis of 2022-2023 brought this reality into
              sharp focus, with many businesses seeing their energy bills triple or quadruple in just
              twelve months.
            </p>

            <p className="text-gray-300 leading-relaxed">
              According to the British Chambers of Commerce, <span className="text-elec-yellow font-medium">85% of UK businesses</span> now
              cite energy costs as a significant operational concern. For energy-intensive sectors
              like manufacturing, hospitality, and retail, energy can represent 10-30% of total
              operating costs—making efficiency improvements directly visible on the bottom line.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingDown className="w-5 h-5 text-green-400" />
                  <span className="font-medium">Energy Demand</span>
                </div>
                <p className="text-sm text-gray-400">
                  UK business electricity demand fell 7% in 2023 as companies implemented efficiency measures
                </p>
              </div>
              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className="w-5 h-5 text-blue-400" />
                  <span className="font-medium">Building Stock</span>
                </div>
                <p className="text-sm text-gray-400">
                  80% of buildings that will exist in 2050 have already been built—retrofitting is essential
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Cost Reduction and Financial Benefits */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold">
              2
            </div>
            <h2 className="text-xl md:text-2xl font-semibold flex items-center gap-2">
              <PoundSterling className="w-6 h-6 text-elec-yellow" />
              Cost Reduction and Financial Benefits
            </h2>
          </div>

          <div className="bg-[#2a2a2a] rounded-lg p-6 space-y-4">
            <p className="text-gray-300 leading-relaxed">
              The financial case for energy efficiency has never been stronger. With UK non-domestic
              electricity prices averaging <span className="text-elec-yellow font-medium">30-40p per kWh</span> (compared
              to 12-15p pre-crisis), every kilowatt-hour saved delivers significantly greater value than before.
            </p>

            <h3 className="text-lg font-medium text-white mt-6 mb-3">Key Financial Benefits:</h3>

            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium text-white">Direct cost savings</span>
                  <p className="text-sm text-gray-400">
                    Every £1 invested in energy efficiency typically returns £3-5 over the measure's lifetime
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium text-white">Reduced price volatility exposure</span>
                  <p className="text-sm text-gray-400">
                    Lower consumption means less exposure to wholesale market price swings
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium text-white">Enhanced asset value</span>
                  <p className="text-sm text-gray-400">
                    Buildings with better EPC ratings command 10-20% higher rents and sale prices
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium text-white">Tax benefits and incentives</span>
                  <p className="text-sm text-gray-400">
                    Enhanced Capital Allowances allow 100% first-year write-off for qualifying equipment
                  </p>
                </div>
              </li>
            </ul>

            <div className="bg-[#1a1a1a] rounded-lg p-4 mt-6 border-l-4 border-elec-yellow">
              <p className="text-sm text-gray-300">
                <span className="font-medium text-elec-yellow">Case Study:</span> A medium-sized
                manufacturing firm in the Midlands reduced their annual energy bill by £127,000
                through a combination of LED lighting, compressed air leak repairs, and motor
                replacements—achieving full payback within 18 months.
              </p>
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

        {/* Section 3: Environmental and Sustainability Drivers */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold">
              3
            </div>
            <h2 className="text-xl md:text-2xl font-semibold flex items-center gap-2">
              <Leaf className="w-6 h-6 text-elec-yellow" />
              Environmental and Sustainability Drivers
            </h2>
          </div>

          <div className="bg-[#2a2a2a] rounded-lg p-6 space-y-4">
            <p className="text-gray-300 leading-relaxed">
              The UK has set one of the world's most ambitious climate targets: achieving
              <span className="text-elec-yellow font-medium"> net zero greenhouse gas emissions by 2050</span>,
              with an interim target of 78% reduction by 2035 compared to 1990 levels. Businesses
              are increasingly expected—and in many cases required—to contribute to these goals.
            </p>

            <h3 className="text-lg font-medium text-white mt-6 mb-3">Regulatory Framework:</h3>

            <div className="grid gap-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-700">
                <h4 className="font-medium text-elec-yellow mb-2">ESOS (Energy Savings Opportunity Scheme)</h4>
                <p className="text-sm text-gray-400">
                  Mandatory energy audits every 4 years for large enterprises. Phase 3 added requirements
                  for action plans and progress reporting on recommended measures.
                </p>
              </div>
              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-700">
                <h4 className="font-medium text-elec-yellow mb-2">SECR (Streamlined Energy and Carbon Reporting)</h4>
                <p className="text-sm text-gray-400">
                  Annual reporting of energy use and carbon emissions in director's reports for
                  quoted companies and large unquoted companies.
                </p>
              </div>
              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-700">
                <h4 className="font-medium text-elec-yellow mb-2">MEES (Minimum Energy Efficiency Standards)</h4>
                <p className="text-sm text-gray-400">
                  Commercial properties must meet minimum EPC E to be legally let. Proposed increase
                  to EPC C by 2027-2030 will affect approximately 50% of commercial stock.
                </p>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed mt-4">
              Beyond compliance, many businesses are setting voluntary science-based targets aligned
              with limiting global warming to 1.5°C. Over <span className="text-elec-yellow font-medium">400 UK companies</span> have
              committed to science-based targets through the SBTi (Science Based Targets initiative).
            </p>
          </div>
        </section>

        {/* Section 4: Risk Mitigation and Resilience */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold">
              4
            </div>
            <h2 className="text-xl md:text-2xl font-semibold flex items-center gap-2">
              <Shield className="w-6 h-6 text-elec-yellow" />
              Risk Mitigation and Resilience
            </h2>
          </div>

          <div className="bg-[#2a2a2a] rounded-lg p-6 space-y-4">
            <p className="text-gray-300 leading-relaxed">
              Energy efficiency is increasingly recognised as a key component of business resilience.
              The energy crisis demonstrated how vulnerable businesses can be to supply disruptions
              and price shocks—those with lower energy intensity weathered the storm far better.
            </p>

            <h3 className="text-lg font-medium text-white mt-6 mb-3">Key Risk Factors Addressed:</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-white">Price Volatility</span>
                    <p className="text-sm text-gray-400">
                      Reduced consumption means reduced exposure to wholesale price swings
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-white">Supply Security</span>
                    <p className="text-sm text-gray-400">
                      Lower demand reduces strain during peak periods and supply constraints
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-white">Regulatory Risk</span>
                    <p className="text-sm text-gray-400">
                      Proactive efficiency reduces future compliance costs as standards tighten
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-white">Stranded Assets</span>
                    <p className="text-sm text-gray-400">
                      Inefficient buildings may become unlettable or unsaleable
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 mt-6 border-l-4 border-orange-400">
              <p className="text-sm text-gray-300">
                <span className="font-medium text-orange-400">Industry Insight:</span> Research by
                the UK Green Building Council suggests that up to 80% of commercial property value
                could be at risk from climate-related factors by 2050 if buildings are not upgraded
                to meet evolving efficiency and resilience standards.
              </p>
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

        {/* Section 5: Competitive Advantage and Reputation */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold">
              5
            </div>
            <h2 className="text-xl md:text-2xl font-semibold flex items-center gap-2">
              <Trophy className="w-6 h-6 text-elec-yellow" />
              Competitive Advantage and Reputation
            </h2>
          </div>

          <div className="bg-[#2a2a2a] rounded-lg p-6 space-y-4">
            <p className="text-gray-300 leading-relaxed">
              Sustainability credentials have become a significant factor in business relationships.
              Research consistently shows that customers, employees, and investors increasingly
              favour organisations that demonstrate genuine commitment to environmental responsibility.
            </p>

            <h3 className="text-lg font-medium text-white mt-6 mb-3">Stakeholder Expectations:</h3>

            <div className="space-y-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-700">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-white">B2B Customers</span>
                  <span className="text-elec-yellow font-bold">65%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-elec-yellow h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  Of UK SMEs report that sustainability credentials influence supplier selection
                </p>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-700">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-white">Employees</span>
                  <span className="text-elec-yellow font-bold">70%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-elec-yellow h-2 rounded-full" style={{ width: '70%' }}></div>
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  Of workers consider company environmental commitment when choosing employers
                </p>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-700">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-white">Investors</span>
                  <span className="text-elec-yellow font-bold">£2.3tn</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  Value of ESG-focused investment funds in the UK, with strong growth trajectory
                </p>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed mt-4">
              Large corporations are increasingly cascading their net zero commitments through supply
              chains. Being able to demonstrate verified energy efficiency and carbon reduction can
              be essential for winning and retaining contracts with major customers.
            </p>
          </div>
        </section>

        {/* Section 6: Getting Started */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold">
              6
            </div>
            <h2 className="text-xl md:text-2xl font-semibold flex items-center gap-2">
              <Rocket className="w-6 h-6 text-elec-yellow" />
              Getting Started with Efficiency Programmes
            </h2>
          </div>

          <div className="bg-[#2a2a2a] rounded-lg p-6 space-y-4">
            <p className="text-gray-300 leading-relaxed">
              Effective energy efficiency programmes follow a structured approach. The most successful
              initiatives combine quick wins with longer-term strategic improvements, building momentum
              and demonstrating value along the way.
            </p>

            <h3 className="text-lg font-medium text-white mt-6 mb-3">Recommended Approach:</h3>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-[#1a1a1a] rounded-lg border border-gray-700">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-medium text-white">Establish Baseline</h4>
                  <p className="text-sm text-gray-400 mt-1">
                    Collect 12 months of energy data, install sub-metering for major loads,
                    calculate your carbon footprint and identify your biggest energy consumers.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-[#1a1a1a] rounded-lg border border-gray-700">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-medium text-white">Identify Opportunities</h4>
                  <p className="text-sm text-gray-400 mt-1">
                    Conduct energy audits (DIY walk-through or professional assessment),
                    benchmark against similar organisations, prioritise by payback and impact.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-[#1a1a1a] rounded-lg border border-gray-700">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-medium text-white">Implement Quick Wins</h4>
                  <p className="text-sm text-gray-400 mt-1">
                    Start with no-cost/low-cost measures: behavioural changes, optimising controls,
                    eliminating waste. These build confidence and fund larger projects.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-[#1a1a1a] rounded-lg border border-gray-700">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <h4 className="font-medium text-white">Plan Strategic Investments</h4>
                  <p className="text-sm text-gray-400 mt-1">
                    Develop a multi-year capital plan for major upgrades: lighting, HVAC,
                    building fabric, renewable generation. Align with asset replacement cycles.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-[#1a1a1a] rounded-lg border border-gray-700">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold flex-shrink-0">
                  5
                </div>
                <div>
                  <h4 className="font-medium text-white">Monitor and Optimise</h4>
                  <p className="text-sm text-gray-400 mt-1">
                    Implement ongoing monitoring, verify savings, adjust and improve continuously.
                    Consider ISO 50001 certification for systematic energy management.
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

        {/* Quick Reference Card */}
        <section className="bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] rounded-xl p-6 border border-elec-yellow/30">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-6 h-6 text-elec-yellow" />
            <h2 className="text-xl font-semibold text-elec-yellow">Quick Reference Card</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-white mb-3">Key Statistics</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-elec-yellow rounded-full"></span>
                  UK net zero target: 2050
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-elec-yellow rounded-full"></span>
                  Interim target: 78% reduction by 2035
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-elec-yellow rounded-full"></span>
                  85% of businesses cite energy as concern
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-elec-yellow rounded-full"></span>
                  Typical savings potential: 10-30%
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-elec-yellow rounded-full"></span>
                  HVAC = 40-60% of building energy
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-white mb-3">Key Regulations</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-elec-yellow rounded-full"></span>
                  ESOS: 4-yearly audits (large enterprises)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-elec-yellow rounded-full"></span>
                  SECR: Annual carbon reporting
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-elec-yellow rounded-full"></span>
                  MEES: Minimum EPC E (rising to C)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-elec-yellow rounded-full"></span>
                  Part L: Building efficiency standards
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-elec-yellow rounded-full"></span>
                  Climate Change Levy: Energy tax
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-700">
            <h3 className="font-medium text-white mb-3">Typical Payback Periods</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div className="bg-[#1a1a1a] rounded p-2 text-center">
                <div className="text-elec-yellow font-bold">Immediate</div>
                <div className="text-gray-400">Behavioural</div>
              </div>
              <div className="bg-[#1a1a1a] rounded p-2 text-center">
                <div className="text-elec-yellow font-bold">1-3 years</div>
                <div className="text-gray-400">LED Lighting</div>
              </div>
              <div className="bg-[#1a1a1a] rounded p-2 text-center">
                <div className="text-elec-yellow font-bold">2-5 years</div>
                <div className="text-gray-400">BMS/Controls</div>
              </div>
              <div className="bg-[#1a1a1a] rounded p-2 text-center">
                <div className="text-elec-yellow font-bold">5-10 years</div>
                <div className="text-gray-400">Insulation</div>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-semibold text-elec-yellow">
            Section Quiz
          </h2>
          <p className="text-gray-400">
            Test your understanding of the business case for energy efficiency with this 10-question quiz.
          </p>
          <Quiz questions={quizQuestions} />
        </section>

        {/* FAQs */}
        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-semibold text-elec-yellow">
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-[#2a2a2a] rounded-lg border border-gray-700 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left min-h-[44px] touch-manipulation active:scale-[0.98] hover:bg-[#333333] transition-colors"
                >
                  <span className="font-medium text-white pr-4">{faq.question}</span>
                  {expandedFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                  )}
                </button>
                {expandedFAQ === index && (
                  <div className="px-4 pb-4 text-gray-300 text-sm leading-relaxed border-t border-gray-700 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row justify-between gap-4 pt-8 border-t border-gray-700">
          <Button
            onClick={() => navigate('/upskilling/energy-efficiency-module-1')}
            variant="outline"
            className="min-h-[44px] touch-manipulation active:scale-[0.98] flex items-center gap-2 bg-transparent border-gray-600 text-white hover:bg-[#2a2a2a] hover:text-elec-yellow"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Module 1 Overview</span>
          </Button>

          <Button
            onClick={() => navigate('/upskilling/energy-efficiency-module-1-section-2')}
            className="min-h-[44px] touch-manipulation active:scale-[0.98] flex items-center gap-2 bg-elec-yellow text-[#1a1a1a] hover:bg-yellow-400"
          >
            <span>Next: Section 2 - Energy Fundamentals</span>
            <ChevronRight className="w-5 h-5" />
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default EnergyEfficiencyModule1Section1;
