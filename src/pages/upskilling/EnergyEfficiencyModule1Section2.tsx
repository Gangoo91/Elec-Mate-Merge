import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { Button } from '@/components/ui/button';
import Quiz from '@/components/apprentice-courses/Quiz';
import InlineCheck from '@/components/apprentice-courses/InlineCheck';
import {
  ChevronLeft,
  ChevronRight,
  Target,
  Factory,
  Zap,
  Building2,
  Scale,
  Wrench,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Leaf,
  AlertTriangle,
  TrendingDown,
  Calendar,
  FileText
} from 'lucide-react';

const EnergyEfficiencyModule1Section2: React.FC = () => {
  const navigate = useNavigate();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  useSEO({
    title: 'UK Carbon Targets and Net Zero | Energy Efficiency Module 1 Section 2 | Elec-Mate',
    description: 'Learn about UK Climate Change Act, carbon budgets, net zero targets, and how grid decarbonisation affects electricians. Essential knowledge for sustainable electrical installations.',
    keywords: 'UK net zero, Climate Change Act 2008, carbon budgets, scope emissions, grid decarbonisation, electrician sustainability'
  });

  const quickCheckQuestions = [
    {
      id: 'qc1-net-zero-target',
      question: 'By what year must the UK achieve net zero greenhouse gas emissions under the Climate Change Act?',
      options: ['2030', '2040', '2050', '2060'],
      correctIndex: 2,
      explanation: 'The Climate Change Act was amended in 2019 to set a legally binding target of net zero greenhouse gas emissions by 2050, making the UK the first major economy to pass such legislation.'
    },
    {
      id: 'qc2-scope-emissions',
      question: 'Which scope of emissions covers the indirect emissions from purchased electricity used by a business?',
      options: ['Scope 1', 'Scope 2', 'Scope 3', 'Scope 4'],
      correctIndex: 1,
      explanation: 'Scope 2 emissions are indirect emissions from the generation of purchased energy, including electricity. Scope 1 covers direct emissions, while Scope 3 covers other indirect emissions in the value chain.'
    },
    {
      id: 'qc3-carbon-budgets',
      question: 'How many years does each UK carbon budget period cover?',
      options: ['3 years', '5 years', '10 years', '15 years'],
      correctIndex: 1,
      explanation: 'UK carbon budgets are set in 5-year periods, providing a clear pathway towards the 2050 net zero target. Each budget caps the total amount of greenhouse gases that can be emitted during that period.'
    }
  ];

  const quizQuestions = [
    {
      question: 'When was the UK Climate Change Act originally passed?',
      options: ['2005', '2008', '2015', '2019'],
      correctAnswer: '2008'
    },
    {
      question: 'What was the original emissions reduction target in the Climate Change Act before amendment?',
      options: ['60% by 2050', '80% by 2050', '100% by 2050', '50% by 2030'],
      correctAnswer: '80% by 2050'
    },
    {
      question: 'Which body is responsible for advising the UK government on carbon budgets?',
      options: ['Environment Agency', 'Climate Change Committee (CCC)', 'Ofgem', 'Carbon Trust'],
      correctAnswer: 'Climate Change Committee (CCC)'
    },
    {
      question: 'Scope 1 emissions refer to which type of emissions?',
      options: ['Purchased electricity', 'Direct emissions from owned sources', 'Supply chain emissions', 'Employee commuting'],
      correctAnswer: 'Direct emissions from owned sources'
    },
    {
      question: 'What is the approximate grid carbon intensity target for UK electricity by 2035?',
      options: ['100g CO2/kWh', '50g CO2/kWh', 'Near zero (fully decarbonised)', '200g CO2/kWh'],
      correctAnswer: 'Near zero (fully decarbonised)'
    },
    {
      question: 'Which regulation requires large UK companies to report their energy use and carbon emissions?',
      options: ['Part L Building Regulations', 'ESOS (Energy Savings Opportunity Scheme)', 'SECR (Streamlined Energy and Carbon Reporting)', 'EPC regulations'],
      correctAnswer: 'SECR (Streamlined Energy and Carbon Reporting)'
    },
    {
      question: 'What percentage of UK emissions come from buildings (heating, cooling, and electricity use)?',
      options: ['About 10%', 'About 20%', 'About 30%', 'About 50%'],
      correctAnswer: 'About 30%'
    },
    {
      question: 'Which carbon budget period runs from 2033-2037?',
      options: ['Fourth Carbon Budget', 'Fifth Carbon Budget', 'Sixth Carbon Budget', 'Seventh Carbon Budget'],
      correctAnswer: 'Sixth Carbon Budget'
    },
    {
      question: 'Under ESOS, which organisations must conduct energy audits every 4 years?',
      options: ['All businesses', 'Large undertakings (250+ employees or £44m+ turnover)', 'Only public sector bodies', 'Only manufacturing companies'],
      correctAnswer: 'Large undertakings (250+ employees or £44m+ turnover)'
    },
    {
      question: 'What does "net zero" mean in the context of UK climate targets?',
      options: ['Zero energy consumption', 'Balancing emissions produced with emissions removed', 'No use of fossil fuels', 'Zero carbon electricity only'],
      correctAnswer: 'Balancing emissions produced with emissions removed'
    }
  ];

  const faqs = [
    {
      question: 'What is the difference between "net zero" and "zero carbon"?',
      answer: 'Zero carbon means producing no carbon emissions at all, which is virtually impossible for most activities. Net zero is more achievable - it means balancing the greenhouse gases emitted with an equivalent amount removed from the atmosphere, through methods like carbon capture, tree planting, or carbon offset schemes. The UK\'s 2050 target is net zero, acknowledging that some residual emissions will need to be offset.'
    },
    {
      question: 'How do carbon budgets affect the electrical industry?',
      answer: 'Carbon budgets create a framework that drives increasingly strict building regulations, appliance standards, and grid policies. For electricians, this means growing demand for energy-efficient installations, heat pump systems, EV charging infrastructure, and smart controls. Each successive carbon budget requires deeper emissions cuts, directly influencing the technologies and practices electricians must master.'
    },
    {
      question: 'Why should electricians understand scope emissions?',
      answer: 'Understanding scope emissions helps electricians advise clients effectively. When businesses need to reduce Scope 2 emissions (from electricity), electricians can recommend LED lighting, efficient motors, and smart controls. For Scope 1 (direct emissions like gas heating), electricians can propose heat pump alternatives. This knowledge positions electricians as valuable sustainability consultants, not just installers.'
    },
    {
      question: 'What is grid decarbonisation and why does it matter?',
      answer: 'Grid decarbonisation is the process of reducing carbon emissions from electricity generation by replacing fossil fuel power stations with renewable sources like wind, solar, and nuclear. As the grid gets cleaner, switching from gas to electric heating (heat pumps) becomes increasingly beneficial for emissions. Electricians installing electric heating and EV chargers are directly supporting this transition.'
    },
    {
      question: 'What compliance requirements might affect my electrical clients?',
      answer: 'Large businesses may need ESOS energy audits and SECR carbon reporting. Public sector buildings often have Display Energy Certificates (DECs). From 2025, MEES regulations prevent letting commercial properties with EPC ratings below E. Many clients are also making voluntary net zero commitments. Understanding these drivers helps electricians identify upgrade opportunities and communicate the value of energy-efficient solutions.'
    },
    {
      question: 'How will the 2035 clean power target affect electrical work?',
      answer: 'The UK government aims for a fully decarbonised electricity grid by 2035. This will massively increase demand for electricians skilled in renewable energy integration, battery storage systems, smart grid technologies, and electric heating installations. The shift from gas to electricity for heating will require significant electrical infrastructure upgrades in millions of properties.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a] text-white">
      {/* Header */}
      <div className="bg-[#1a1a1a]/95 border-b border-green-700/30">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <div className="flex items-center gap-2 text-green-400 text-sm mb-2">
            <Leaf className="w-4 h-4" />
            <span>Energy Efficiency Module 1</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Section 2: UK Carbon Targets and Net Zero
          </h1>
          <p className="text-gray-300">
            Understanding the UK's legally binding climate commitments and their impact on the electrical industry
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Introduction */}
        <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-4">
            <Target className="w-8 h-8 text-green-400 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-semibold text-green-400 mb-2">Why This Matters</h2>
              <p className="text-gray-300">
                The UK has committed to legally binding carbon reduction targets that will fundamentally transform
                how buildings use energy. As an electrician, understanding these targets helps you anticipate
                market changes, advise clients on future-proof installations, and position yourself at the
                forefront of the green transition.
              </p>
            </div>
          </div>
        </div>

        {/* Section 1: Climate Change Act */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
              1
            </div>
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-elec-yellow" />
              UK Climate Change Act and 2050 Net Zero Target
            </h2>
          </div>

          <div className="bg-[#242424] rounded-lg p-6 border border-gray-700">
            <p className="text-gray-300 mb-4">
              The <strong className="text-white">Climate Change Act 2008</strong> made the UK the first country
              in the world to set legally binding, long-term emissions reduction targets. Originally, it
              committed to reducing greenhouse gas emissions by 80% compared to 1990 levels by 2050.
            </p>

            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-elec-yellow mb-2">The 2019 Amendment</h3>
              <p className="text-gray-300">
                In June 2019, the target was strengthened to <strong className="text-white">net zero by 2050</strong>,
                making the UK the first major economy to pass net zero legislation. This means the UK must
                balance any emissions produced with an equivalent amount removed from the atmosphere.
              </p>
            </div>

            <h3 className="font-semibold text-white mb-3">Key Elements of the Act:</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">•</span>
                <span><strong className="text-white">Legal Requirement:</strong> Government must ensure emissions targets are met - it's the law, not just policy</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">•</span>
                <span><strong className="text-white">Independent Oversight:</strong> Climate Change Committee (CCC) advises government and monitors progress</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">•</span>
                <span><strong className="text-white">Carbon Budgets:</strong> Five-year caps on total emissions create a pathway to the 2050 target</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">•</span>
                <span><strong className="text-white">Regular Reporting:</strong> Government must report annually on emissions and progress</span>
              </li>
            </ul>

            <div className="mt-4 p-4 bg-blue-900/20 border border-blue-700/30 rounded-lg">
              <p className="text-blue-300 text-sm">
                <strong>For Electricians:</strong> This legislation drives every building regulation change,
                appliance standard update, and grid investment decision. When Part L gets stricter or heat
                pumps become mandatory, it's because of this Act.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Carbon Budgets */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
              2
            </div>
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-elec-yellow" />
              Carbon Budgets and Interim Targets
            </h2>
          </div>

          <div className="bg-[#242424] rounded-lg p-6 border border-gray-700">
            <p className="text-gray-300 mb-4">
              Carbon budgets act like a "spending limit" for greenhouse gas emissions over five-year periods.
              The UK cannot exceed its carbon budget, just as you can't exceed a financial budget. Each
              budget is progressively tighter, creating a clear trajectory towards net zero.
            </p>

            <h3 className="font-semibold text-white mb-3">Current Carbon Budget Periods:</h3>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="text-left py-2 px-3 text-elec-yellow">Budget</th>
                    <th className="text-left py-2 px-3 text-elec-yellow">Period</th>
                    <th className="text-left py-2 px-3 text-elec-yellow">Reduction vs 1990</th>
                    <th className="text-left py-2 px-3 text-elec-yellow">Status</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr className="border-b border-gray-700">
                    <td className="py-2 px-3">First</td>
                    <td className="py-2 px-3">2008-2012</td>
                    <td className="py-2 px-3">25%</td>
                    <td className="py-2 px-3 text-green-400">Met</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-2 px-3">Second</td>
                    <td className="py-2 px-3">2013-2017</td>
                    <td className="py-2 px-3">31%</td>
                    <td className="py-2 px-3 text-green-400">Met</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-2 px-3">Third</td>
                    <td className="py-2 px-3">2018-2022</td>
                    <td className="py-2 px-3">37%</td>
                    <td className="py-2 px-3 text-green-400">Met</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-2 px-3">Fourth</td>
                    <td className="py-2 px-3">2023-2027</td>
                    <td className="py-2 px-3">51%</td>
                    <td className="py-2 px-3 text-elec-yellow">Current</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-2 px-3">Fifth</td>
                    <td className="py-2 px-3">2028-2032</td>
                    <td className="py-2 px-3">57%</td>
                    <td className="py-2 px-3 text-gray-400">Upcoming</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3">Sixth</td>
                    <td className="py-2 px-3">2033-2037</td>
                    <td className="py-2 px-3">78%</td>
                    <td className="py-2 px-3 text-gray-400">Set in law</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-amber-400 mb-1">The Challenge Ahead</h4>
                  <p className="text-gray-300 text-sm">
                    The Sixth Carbon Budget requires a 78% reduction - almost doubling the effort of previous
                    budgets. This will require massive changes to building heating, transport, and industry.
                    The demand for electricians skilled in low-carbon technologies will surge significantly.
                  </p>
                </div>
              </div>
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

        {/* Section 3: Scope Emissions */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
              3
            </div>
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <Factory className="w-5 h-5 text-elec-yellow" />
              Scope 1, 2, and 3 Emissions Explained
            </h2>
          </div>

          <div className="bg-[#242424] rounded-lg p-6 border border-gray-700">
            <p className="text-gray-300 mb-4">
              The Greenhouse Gas Protocol divides emissions into three "scopes" to help organisations
              understand and manage their carbon footprint. Understanding these categories helps
              electricians identify where they can make the biggest impact for clients.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {/* Scope 1 */}
              <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4">
                <h3 className="font-bold text-red-400 mb-2">Scope 1</h3>
                <p className="text-sm text-white font-semibold mb-2">Direct Emissions</p>
                <p className="text-gray-300 text-sm mb-3">
                  Emissions from sources the organisation owns or controls directly.
                </p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Gas boilers on-site</li>
                  <li>• Company vehicle fleet</li>
                  <li>• On-site generators</li>
                  <li>• Industrial processes</li>
                  <li>• Refrigerant leaks</li>
                </ul>
              </div>

              {/* Scope 2 */}
              <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-4">
                <h3 className="font-bold text-amber-400 mb-2">Scope 2</h3>
                <p className="text-sm text-white font-semibold mb-2">Indirect - Energy</p>
                <p className="text-gray-300 text-sm mb-3">
                  Emissions from purchased energy consumed by the organisation.
                </p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Purchased electricity</li>
                  <li>• Purchased steam</li>
                  <li>• Purchased heating</li>
                  <li>• Purchased cooling</li>
                  <li>• District heating</li>
                </ul>
              </div>

              {/* Scope 3 */}
              <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
                <h3 className="font-bold text-blue-400 mb-2">Scope 3</h3>
                <p className="text-sm text-white font-semibold mb-2">Indirect - Value Chain</p>
                <p className="text-gray-300 text-sm mb-3">
                  All other indirect emissions in the value chain.
                </p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Supply chain emissions</li>
                  <li>• Business travel</li>
                  <li>• Employee commuting</li>
                  <li>• Product end-of-life</li>
                  <li>• Investments</li>
                </ul>
              </div>
            </div>

            <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
              <h4 className="font-semibold text-green-400 mb-2">How Electricians Impact Each Scope:</h4>
              <ul className="text-gray-300 text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">Scope 1:</span>
                  <span>Install heat pumps to replace gas boilers, reducing direct combustion emissions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">Scope 2:</span>
                  <span>LED upgrades, efficient motors, smart controls all reduce electricity consumption and associated emissions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 font-bold">Scope 3:</span>
                  <span>EV charging installations help clients reduce transport emissions; solar PV can supply chain partners</span>
                </li>
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

        {/* Section 4: Grid Decarbonisation */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
              4
            </div>
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-elec-yellow" />
              How Electricity Grid Decarbonisation Affects Buildings
            </h2>
          </div>

          <div className="bg-[#242424] rounded-lg p-6 border border-gray-700">
            <p className="text-gray-300 mb-4">
              The UK electricity grid has been rapidly decarbonising, with the carbon intensity of
              electricity dropping dramatically. This transformation has major implications for how
              we heat buildings and design electrical systems.
            </p>

            <h3 className="font-semibold text-white mb-3">Grid Carbon Intensity Trends:</h3>
            <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">1990</span>
                  <div className="flex-1 mx-4 h-4 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                  <span className="text-gray-300 w-32 text-right">~700g CO2/kWh</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">2010</span>
                  <div className="flex-1 mx-4 h-4 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 rounded-full" style={{ width: '71%' }}></div>
                  </div>
                  <span className="text-gray-300 w-32 text-right">~500g CO2/kWh</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">2020</span>
                  <div className="flex-1 mx-4 h-4 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500 rounded-full" style={{ width: '29%' }}></div>
                  </div>
                  <span className="text-gray-300 w-32 text-right">~200g CO2/kWh</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">2024</span>
                  <div className="flex-1 mx-4 h-4 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                  <span className="text-gray-300 w-32 text-right">~140g CO2/kWh</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-elec-yellow">2035 Target</span>
                  <div className="flex-1 mx-4 h-4 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-green-400 rounded-full" style={{ width: '5%' }}></div>
                  </div>
                  <span className="text-elec-yellow w-32 text-right">Near zero</span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
                <h4 className="font-semibold text-green-400 mb-2">Why This Matters for Heat Pumps</h4>
                <p className="text-gray-300 text-sm">
                  As grid carbon intensity falls, the emissions benefit of heat pumps over gas boilers
                  grows dramatically. A heat pump using electricity at 140g CO2/kWh already beats a
                  gas boiler. With near-zero grid carbon by 2035, heat pumps will be virtually
                  carbon-free in operation.
                </p>
              </div>
              <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
                <h4 className="font-semibold text-blue-400 mb-2">Impact on Building Strategies</h4>
                <p className="text-gray-300 text-sm">
                  Electrification becomes the primary decarbonisation strategy. All-electric buildings
                  with heat pumps, efficient lighting, and smart controls will achieve near-zero
                  operational carbon as the grid cleans up - without needing further modifications.
                </p>
              </div>
            </div>

            <div className="p-4 bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg">
              <p className="text-elec-yellow text-sm font-medium">
                <TrendingDown className="w-4 h-4 inline mr-2" />
                The UK aims for a fully decarbonised electricity grid by 2035. This 15-year window
                represents the biggest transformation in UK energy history - and electricians are
                at the centre of making it happen.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Business Responsibilities */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
              5
            </div>
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-elec-yellow" />
              Business Responsibilities and Compliance Drivers
            </h2>
          </div>

          <div className="bg-[#242424] rounded-lg p-6 border border-gray-700">
            <p className="text-gray-300 mb-4">
              Multiple regulations and drivers push businesses towards energy efficiency and carbon
              reduction. Understanding these helps electricians identify opportunities and communicate
              the value of upgrades to commercial clients.
            </p>

            <h3 className="font-semibold text-white mb-3">Key Compliance Frameworks:</h3>
            <div className="space-y-4 mb-6">
              {/* ESOS */}
              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
                <h4 className="font-semibold text-elec-yellow mb-2">ESOS - Energy Savings Opportunity Scheme</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Applies to large undertakings (250+ employees OR £44m+ turnover AND £38m+ balance sheet)</li>
                  <li>• Mandatory energy audits every 4 years covering buildings, transport, and processes</li>
                  <li>• Must identify energy saving opportunities (implementation is voluntary)</li>
                  <li>• Phase 3 compliance deadline was December 2023; Phase 4 expected 2027</li>
                </ul>
              </div>

              {/* SECR */}
              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
                <h4 className="font-semibold text-elec-yellow mb-2">SECR - Streamlined Energy and Carbon Reporting</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Applies to quoted companies and large unquoted companies</li>
                  <li>• Annual reporting of energy use (kWh) and greenhouse gas emissions</li>
                  <li>• Must include at least one intensity ratio (e.g., kgCO2 per m² or per employee)</li>
                  <li>• Published in company annual reports - publicly visible</li>
                </ul>
              </div>

              {/* MEES */}
              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
                <h4 className="font-semibold text-elec-yellow mb-2">MEES - Minimum Energy Efficiency Standards</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Commercial properties must meet minimum EPC rating to be let</li>
                  <li>• Currently minimum E rating required (since 2023 for all commercial leases)</li>
                  <li>• Future trajectory towards EPC B by 2030 for commercial properties</li>
                  <li>• Non-compliance can result in penalties up to £150,000</li>
                </ul>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-purple-900/20 border border-purple-700/30 rounded-lg p-4">
                <h4 className="font-semibold text-purple-400 mb-2">Voluntary Commitments</h4>
                <p className="text-gray-300 text-sm">
                  Many businesses make voluntary net zero pledges, often driven by investor pressure,
                  customer expectations, or corporate responsibility. These create demand for
                  energy efficiency upgrades beyond regulatory minimums.
                </p>
              </div>
              <div className="bg-cyan-900/20 border border-cyan-700/30 rounded-lg p-4">
                <h4 className="font-semibold text-cyan-400 mb-2">Public Sector Requirements</h4>
                <p className="text-gray-300 text-sm">
                  Public buildings require Display Energy Certificates (DECs), making energy
                  performance publicly visible. Government has committed public sector to net zero
                  by 2050, driving significant upgrade programmes.
                </p>
              </div>
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

        {/* Section 6: Practical Implications */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
              6
            </div>
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <Wrench className="w-5 h-5 text-elec-yellow" />
              Practical Implications for Electricians
            </h2>
          </div>

          <div className="bg-[#242424] rounded-lg p-6 border border-gray-700">
            <p className="text-gray-300 mb-4">
              Understanding carbon targets isn't just academic - it directly shapes the work
              electricians will do for decades to come. Here's how these policies translate
              to practical opportunities and requirements.
            </p>

            <h3 className="font-semibold text-white mb-3">Growing Demand Areas:</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-[#1a1a1a] rounded-lg">
                  <Zap className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-white">Heat Pump Installations</h4>
                    <p className="text-sm text-gray-400">Massive growth as gas boilers phased out. 600,000/year target by 2028.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-[#1a1a1a] rounded-lg">
                  <Building2 className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-white">Electrical Infrastructure Upgrades</h4>
                    <p className="text-sm text-gray-400">Many properties need larger supplies for heat pumps and EV chargers.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-[#1a1a1a] rounded-lg">
                  <TrendingDown className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-white">Energy Efficiency Retrofits</h4>
                    <p className="text-sm text-gray-400">LED lighting, smart controls, efficient motors for MEES compliance.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-[#1a1a1a] rounded-lg">
                  <Leaf className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-white">Solar PV and Battery Storage</h4>
                    <p className="text-sm text-gray-400">On-site generation increasingly common for commercial and domestic.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-[#1a1a1a] rounded-lg">
                  <Target className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-white">Smart Building Controls</h4>
                    <p className="text-sm text-gray-400">BMS integration, demand response, and automated energy management.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-[#1a1a1a] rounded-lg">
                  <Factory className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-white">EV Charging Infrastructure</h4>
                    <p className="text-sm text-gray-400">Workplace, domestic, and public charging installations growing rapidly.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-elec-yellow mb-2">Skills Development Priority</h4>
              <p className="text-gray-300 text-sm">
                Electricians who upskill in heat pump electrical requirements, solar PV, battery storage,
                and EV charging will be in highest demand. Consider industry certifications like MCS
                for heat pumps and solar, and manufacturer training for specific technologies.
              </p>
            </div>

            <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
              <h4 className="font-semibold text-green-400 mb-2">Client Advisory Role</h4>
              <p className="text-gray-300 text-sm">
                Understanding carbon targets positions you as a consultant, not just an installer.
                You can help clients understand compliance requirements, prioritise investments,
                and future-proof their properties. This advisory value commands premium rates
                and builds long-term client relationships.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="mb-10">
          <div className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 border border-green-600/40 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-6 h-6 text-green-400" />
              <h2 className="text-xl font-bold text-green-400">Quick Reference Card</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-white mb-2">Key Dates</h3>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• <strong className="text-elec-yellow">2008:</strong> Climate Change Act passed</li>
                  <li>• <strong className="text-elec-yellow">2019:</strong> Net zero target adopted</li>
                  <li>• <strong className="text-elec-yellow">2035:</strong> Clean electricity grid target</li>
                  <li>• <strong className="text-elec-yellow">2050:</strong> Net zero deadline</li>
                </ul>

                <h3 className="font-semibold text-white mb-2 mt-4">Carbon Budget Periods</h3>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Each budget spans <strong className="text-white">5 years</strong></li>
                  <li>• Fourth Budget: 2023-2027 (51% reduction)</li>
                  <li>• Fifth Budget: 2028-2032 (57% reduction)</li>
                  <li>• Sixth Budget: 2033-2037 (78% reduction)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-2">Scope Emissions</h3>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• <strong className="text-red-400">Scope 1:</strong> Direct emissions (gas boilers, vehicles)</li>
                  <li>• <strong className="text-amber-400">Scope 2:</strong> Purchased energy (electricity)</li>
                  <li>• <strong className="text-blue-400">Scope 3:</strong> Supply chain and indirect</li>
                </ul>

                <h3 className="font-semibold text-white mb-2 mt-4">Compliance Drivers</h3>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• <strong className="text-elec-yellow">ESOS:</strong> Energy audits for large businesses</li>
                  <li>• <strong className="text-elec-yellow">SECR:</strong> Annual carbon reporting</li>
                  <li>• <strong className="text-elec-yellow">MEES:</strong> Minimum EPC for lettings</li>
                  <li>• <strong className="text-elec-yellow">DECs:</strong> Public building displays</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-elec-yellow" />
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-[#242424] border border-gray-700 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-4 text-left min-h-[44px] touch-manipulation active:scale-[0.98] hover:bg-[#2a2a2a] transition-colors"
                >
                  <span className="font-medium text-white pr-4">{faq.question}</span>
                  {expandedFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {expandedFAQ === index && (
                  <div className="px-4 pb-4 border-t border-gray-700">
                    <p className="text-gray-300 pt-4">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <section className="mb-10">
          <Quiz
            title="Section 2 Quiz: UK Carbon Targets and Net Zero"
            questions={quizQuestions}
            passingScore={70}
          />
        </section>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-gray-700">
          <Button
            onClick={() => navigate('/upskilling/energy-efficiency/module-1/section-1')}
            variant="outline"
            className="min-h-[44px] touch-manipulation active:scale-[0.98] border-gray-600 text-gray-300 hover:text-white hover:bg-[#242424] flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous: Why Energy Efficiency Matters</span>
          </Button>
          <Button
            onClick={() => navigate('/upskilling/energy-efficiency/module-1/section-3')}
            className="min-h-[44px] touch-manipulation active:scale-[0.98] bg-elec-yellow text-black hover:bg-elec-yellow/90 flex items-center gap-2"
          >
            <span>Next: Building Fabric Fundamentals</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EnergyEfficiencyModule1Section2;
