import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Zap, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Developing Energy KPI Dashboards - Energy Efficiency Module 6 Section 4';
const DESCRIPTION = 'Learn to develop effective energy KPI dashboards including SMART KPI setting, degree day normalisation, CUSUM charts, ISO 50001 EnPIs, and practical dashboard design for UK buildings.';

const quickCheckQuestions = [
  {
    id: 'ee-m6s4-qc1',
    question: 'What does EUI (Energy Use Intensity) measure?',
    options: [
      'Total energy cost per year',
      'Energy consumption per unit floor area (kWh/m²)',
      'Percentage of renewable energy used',
      'Carbon emissions per employee'
    ],
    correctIndex: 1,
    explanation: 'Energy Use Intensity (EUI) measures energy consumption per unit of floor area, typically expressed as kWh/m²/year. It allows meaningful comparison between buildings of different sizes and is a fundamental energy KPI.'
  },
  {
    id: 'ee-m6s4-qc2',
    question: 'What is the purpose of degree day normalisation?',
    options: [
      'To calculate solar panel output',
      'To adjust energy data for weather variations',
      'To measure building insulation',
      'To schedule maintenance activities'
    ],
    correctIndex: 1,
    explanation: 'Degree day normalisation removes the effect of weather from energy consumption data, allowing fair comparison between different periods. A mild winter will show lower heating energy, but normalisation reveals true underlying performance.'
  },
  {
    id: 'ee-m6s4-qc3',
    question: 'In a CUSUM chart, what does an upward slope indicate?',
    options: [
      'Energy performance improving',
      'Energy consumption lower than expected',
      'Energy consumption higher than expected',
      'No change in performance'
    ],
    correctIndex: 2,
    explanation: 'CUSUM (Cumulative Sum) charts plot the running total of differences between actual and expected energy use. An upward slope means actual consumption consistently exceeds the target, indicating deteriorating performance.'
  }
];

const quizQuestions = [
  {
    id: 1,
    question: 'What does SMART stand for in SMART KPIs?',
    options: [
      'Standard, Measured, Accurate, Relevant, Timely',
      'Specific, Measurable, Achievable, Relevant, Time-bound',
      'Simple, Monitored, Actionable, Recorded, Tracked',
      'Strategic, Managed, Aligned, Responsive, Targeted'
    ],
    correctAnswer: 1,
    explanation: 'SMART KPIs are Specific, Measurable, Achievable, Relevant, and Time-bound - ensuring targets are clear, quantifiable, realistic, aligned with objectives, and have defined deadlines.'
  },
  {
    id: 2,
    question: 'What is the typical unit for heating degree days in the UK?',
    options: ['°C·days', 'kWh/m²', 'BTU/hour', 'W/m²K'],
    correctAnswer: 0,
    explanation: 'Heating degree days are measured in °C·days, calculated as the sum of differences between the base temperature (typically 15.5°C in the UK) and the mean daily temperature for each day.'
  },
  {
    id: 3,
    question: 'Which ISO standard specifically addresses Energy Performance Indicators (EnPIs)?',
    options: ['ISO 9001', 'ISO 14001', 'ISO 50001', 'ISO 45001'],
    correctAnswer: 2,
    explanation: 'ISO 50001 is the energy management standard that requires organisations to establish and monitor EnPIs as part of a systematic approach to improving energy performance.'
  },
  {
    id: 4,
    question: 'What is baseline energy consumption used for?',
    options: [
      'Setting minimum legal requirements',
      'Providing a reference point to measure improvement',
      'Calculating electricity tariffs',
      'Determining building size'
    ],
    correctAnswer: 1,
    explanation: 'A baseline establishes the starting point for measuring energy performance improvement. It captures energy use during a representative period before improvements are made.'
  },
  {
    id: 5,
    question: 'What does a flat CUSUM line indicate?',
    options: [
      'Increasing energy consumption',
      'Decreasing energy consumption',
      'No equipment running',
      'Performance matching the target'
    ],
    correctAnswer: 3,
    explanation: 'A flat (horizontal) CUSUM line indicates actual consumption matches expected consumption - performance is on target with no deviation.'
  },
  {
    id: 6,
    question: 'Which factor should NOT be included in a normalisation model for heating energy?',
    options: ['Degree days', 'Building floor area', 'Electricity tariff', 'Occupancy levels'],
    correctAnswer: 2,
    explanation: 'Electricity tariff is a financial factor, not a physical driver of energy consumption. Normalisation should adjust for physical variables like weather, floor area, and occupancy that affect energy use.'
  },
  {
    id: 7,
    question: 'What is the typical EUI benchmark for UK offices?',
    options: ['50-100 kWh/m²/year', '100-200 kWh/m²/year', '200-400 kWh/m²/year', '500-700 kWh/m²/year'],
    correctAnswer: 1,
    explanation: 'UK office buildings typically achieve EUIs of 100-200 kWh/m²/year depending on type and air conditioning. CIBSE TM46 provides detailed benchmarks by building type.'
  },
  {
    id: 8,
    question: 'In ISO 50001, what is an SEU?',
    options: [
      'Standard Energy Unit',
      'Significant Energy Use',
      'System Efficiency Upgrade',
      'Strategic Energy Utility'
    ],
    correctAnswer: 1,
    explanation: 'Significant Energy Use (SEU) identifies the equipment, processes, or facilities that account for substantial energy consumption and offer significant potential for improvement.'
  },
  {
    id: 9,
    question: 'What dashboard update frequency is typical for monthly management reports?',
    options: ['Real-time', 'Daily', 'Monthly', 'Annually'],
    correctAnswer: 2,
    explanation: 'Monthly dashboards suit management review cycles, aligning with billing periods and providing enough time for meaningful trends. Real-time suits operational monitoring; annual suits strategic review.'
  },
  {
    id: 10,
    question: 'What is the Plan-Do-Check-Act (PDCA) cycle used for in energy management?',
    options: [
      'Calculating energy bills',
      'Continuous improvement of energy performance',
      'Scheduling equipment maintenance',
      'Training new staff'
    ],
    correctAnswer: 1,
    explanation: 'PDCA is a continuous improvement methodology central to ISO 50001. Plan establishes objectives, Do implements actions, Check monitors results, and Act takes corrective action for ongoing improvement.'
  }
];

const faqs = [
  {
    question: 'How do I get started with energy KPIs if we have no monitoring?',
    answer: 'Start simple with utility bill data. Calculate monthly kWh consumption and track trends. Divide by floor area to get EUI. Compare with CIBSE benchmarks. This basic approach can identify significant issues before investing in advanced monitoring. When ready, add sub-metering to major loads.'
  },
  {
    question: 'What is the best software for energy dashboards?',
    answer: 'Options range from spreadsheets for small sites to dedicated platforms for portfolios. Excel works well for basic tracking and CUSUM charts. Power BI and Tableau create professional dashboards from multiple sources. Dedicated energy management platforms like Stark, SystemsLink, or Coherent offer sector-specific features and automatic data collection.'
  },
  {
    question: 'How accurate should energy data be?',
    answer: 'Aim for ±2% accuracy on main meters for compliance and benchmarking. Sub-meters may be ±5% acceptable for internal monitoring. More important than absolute accuracy is consistency - the same meter measured the same way over time reveals trends even if slightly inaccurate. Document any known limitations.'
  },
  {
    question: 'Should I normalise for occupancy as well as weather?',
    answer: 'Yes, if occupancy varies significantly. Buildings with hybrid working may see large differences in energy use based on actual occupancy. Include occupancy hours or headcount in your normalisation model. This is especially important post-pandemic when comparing current performance to pre-2020 baselines.'
  },
  {
    question: 'How often should we review KPIs and targets?',
    answer: 'Review KPI data monthly for operational management. Review targets annually or after significant changes (new equipment, building modifications, occupancy changes). ISO 50001 requires management review at defined intervals covering EnPIs, objectives, and the energy management system effectiveness.'
  },
  {
    question: 'What KPIs should electricians track for their own business?',
    answer: 'Track your van fleet fuel consumption (mpg or kWh/mile for EVs), workshop energy use, tool charging costs, and carbon footprint per job. This demonstrates credibility when advising clients and helps identify your own efficiency improvements. Some clients specifically look for contractors monitoring their own environmental performance.'
  }
];

const EnergyEfficiencyModule6Section4: React.FC = () => {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  useSEO({
    title: TITLE,
    description: DESCRIPTION,
    keywords: ['energy KPI', 'dashboard', 'EUI', 'degree day normalisation', 'CUSUM', 'ISO 50001', 'EnPIs'],
    canonicalUrl: '/study-centre/upskilling/energy-efficiency/module-6/section-4'
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/energy-efficiency-module-6">
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
            <span>Module 6 Section 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Developing Energy KPI Dashboards
          </h1>
          <p className="text-white/80">
            Measuring and visualising energy performance
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">Key KPIs</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>EUI:</strong> kWh per m² floor area</li>
              <li><strong>EnPI:</strong> ISO 50001 performance indicators</li>
              <li><strong>Degree Days:</strong> Weather normalisation</li>
              <li><strong>CUSUM:</strong> Cumulative deviation tracking</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">PDCA Cycle</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Plan:</strong> Set targets and baselines</li>
              <li><strong>Do:</strong> Implement improvements</li>
              <li><strong>Check:</strong> Monitor KPIs</li>
              <li><strong>Act:</strong> Correct and improve</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Set SMART energy performance targets',
              'Calculate and use Energy Use Intensity (EUI)',
              'Apply degree day normalisation',
              'Create and interpret CUSUM charts',
              'Design effective energy dashboards',
              'Understand ISO 50001 EnPI requirements'
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: SMART KPIs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Setting SMART Energy KPIs
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective energy management requires clear, measurable targets. SMART criteria ensure your KPIs drive real improvement rather than vague aspirations. Each KPI should pass all five SMART tests.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">SMART criteria:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Specific:</strong> Clear definition of what is being measured</li>
                <li><strong>Measurable:</strong> Quantifiable with available data</li>
                <li><strong>Achievable:</strong> Realistic given resources and constraints</li>
                <li><strong>Relevant:</strong> Aligned with business objectives</li>
                <li><strong>Time-bound:</strong> Clear deadline for achievement</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Example SMART KPI:</p>
              <p className="text-sm text-white ml-4 bg-white/5 p-3 rounded">
                "Reduce electricity consumption in Building A by 10% (from 180 to 162 kWh/m²/year) by 31 December 2025, measured against 2023 baseline, normalised for degree days."
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Poor KPI example:</p>
              <p className="text-sm text-white ml-4 bg-white/5 p-3 rounded">
                "Improve energy efficiency" - Not specific, not measurable, no target, no deadline
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Energy Use Intensity */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Energy Use Intensity (EUI)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              EUI normalises energy consumption by building size, allowing fair comparison between different buildings. It is the most widely used building energy benchmark and forms the basis of Display Energy Certificates (DECs).
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Formula:</p>
              <p className="text-sm text-white ml-4 font-mono bg-white/5 p-3 rounded">
                EUI (kWh/m²/year) = Total Annual Energy (kWh) / Gross Internal Area (m²)
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">UK benchmarks (CIBSE TM46):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>General office:</strong> 95-190 kWh/m²</li>
                <li><strong>Retail:</strong> 120-340 kWh/m²</li>
                <li><strong>Schools:</strong> 85-150 kWh/m²</li>
                <li><strong>Hotels:</strong> 280-430 kWh/m²</li>
                <li><strong>Hospitals:</strong> 340-660 kWh/m²</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Using EUI effectively:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Compare your building to sector benchmarks</li>
                <li>Track year-on-year trends for the same building</li>
                <li>Break down by fuel type (electricity EUI, gas EUI)</li>
                <li>Consider separating base load from weather-dependent load</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 03: Degree Day Normalisation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Degree Day Normalisation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Weather significantly affects heating and cooling energy consumption. Degree day normalisation removes weather effects, revealing true underlying performance changes. This is essential for fair comparison between different time periods.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Understanding degree days:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Heating degree days (HDD):</strong> Sum of differences below base temperature (15.5°C UK)</li>
                <li><strong>Cooling degree days (CDD):</strong> Sum of differences above base temperature (18°C typical)</li>
                <li>Higher degree days = more heating/cooling required</li>
                <li>UK regional data available from Degree Days Direct</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Simple normalisation formula:</p>
              <p className="text-sm text-white ml-4 font-mono bg-white/5 p-3 rounded">
                Normalised Energy = Actual Energy x (Standard DD / Actual DD)
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Example:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Actual gas consumption: 45,000 kWh</li>
                <li>Actual heating degree days: 1,800</li>
                <li>20-year average (standard): 2,000 HDD</li>
                <li>Normalised = 45,000 x (2,000/1,800) = 50,000 kWh</li>
                <li>The mild weather saved energy, but performance was actually worse than it appeared</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: CUSUM Charts */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            CUSUM Charts
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              CUSUM (Cumulative Sum) charts are powerful tools for detecting performance changes over time. They plot the running total of differences between actual and expected energy use, making trends and step changes clearly visible.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">How CUSUM works:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Calculate expected consumption from baseline model</li>
                <li>Find difference: Actual - Expected for each period</li>
                <li>Calculate cumulative sum of these differences</li>
                <li>Plot cumulative sum over time</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Interpreting CUSUM patterns:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Flat line:</strong> Performance matching target - on track</li>
                <li><strong>Upward slope:</strong> Consuming more than expected - investigate</li>
                <li><strong>Downward slope:</strong> Consuming less than expected - improvement</li>
                <li><strong>Step change:</strong> Sudden shift indicates specific event or failure</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">When to use CUSUM:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Monthly energy management review</li>
                <li>Detecting heating system faults</li>
                <li>Verifying energy project savings</li>
                <li>Identifying operational changes affecting consumption</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: ISO 50001 EnPIs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            ISO 50001 and EnPIs
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              ISO 50001 is the international standard for energy management systems. It requires organisations to establish Energy Performance Indicators (EnPIs) and Significant Energy Uses (SEUs) as part of a systematic approach to continuous improvement.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key ISO 50001 concepts:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>EnPI:</strong> Energy Performance Indicator - quantitative measure of performance</li>
                <li><strong>EnB:</strong> Energy Baseline - reference point for measuring change</li>
                <li><strong>SEU:</strong> Significant Energy Use - major consumers offering improvement potential</li>
                <li><strong>Energy review:</strong> Analysis to identify SEUs and improvement opportunities</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">PDCA cycle in ISO 50001:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Plan:</strong> Energy review, objectives, targets, action plans</li>
                <li><strong>Do:</strong> Implement energy management programmes</li>
                <li><strong>Check:</strong> Monitor EnPIs, audit compliance</li>
                <li><strong>Act:</strong> Management review, continual improvement</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Benefits of ISO 50001 certification:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Typical 10-20% energy savings in first three years</li>
                <li>Demonstrates commitment to sustainability</li>
                <li>Meets ESOS compliance requirements</li>
                <li>Supports tender and supply chain requirements</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 06: Dashboard Design */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Effective Dashboard Design
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A well-designed energy dashboard communicates performance clearly to different audiences. The key is matching detail level to user needs - executives need headline figures while engineers need granular data.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Dashboard by audience:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Executive:</strong> 3-5 headline KPIs, traffic light status, cost focus</li>
                <li><strong>Management:</strong> Monthly trends, comparisons, target progress</li>
                <li><strong>Operations:</strong> Daily/hourly data, alerts, drill-down capability</li>
                <li><strong>Public display:</strong> Simple visuals, real-time consumption, educational</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Essential dashboard elements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Current consumption vs target (gauge or bar chart)</li>
                <li>Trend over time (line chart)</li>
                <li>Comparison to baseline or benchmark</li>
                <li>Cost impact (translated to financial terms)</li>
                <li>Carbon footprint (tCO2e)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Design principles:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>One screen, minimal scrolling</li>
                <li>Clear visual hierarchy - most important data prominent</li>
                <li>Consistent colour coding (green/amber/red)</li>
                <li>Context provided (targets, comparisons, benchmarks)</li>
                <li>Update frequency matched to decision cycle</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Getting started with KPIs</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Start with utility bill data - no monitoring required</li>
                <li>Calculate basic EUI for each building</li>
                <li>Compare to CIBSE benchmarks for your building type</li>
                <li>Set up monthly tracking spreadsheet</li>
                <li>Add normalisation when you have degree day data</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Data collection tips</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Automate meter reading where possible (smart meters, BMS)</li>
                <li>Schedule manual reads at consistent times</li>
                <li>Validate data - check for missing readings, outliers</li>
                <li>Document any meter changes or resets</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common pitfalls</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Too many KPIs</strong> - Focus on 3-5 key metrics</li>
                <li><strong>Comparing unadjusted data</strong> - Always normalise for weather</li>
                <li><strong>Static baselines</strong> - Update when major changes occur</li>
                <li><strong>Data without action</strong> - Ensure reviews lead to decisions</li>
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
                  <li>EUI = kWh / m²</li>
                  <li>HDD = Sum(15.5°C - Tmean) when positive</li>
                  <li>Normalised = Actual x (Std DD / Actual DD)</li>
                  <li>CUSUM = Running total of (Actual - Expected)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">UK Benchmarks</p>
                <ul className="space-y-0.5">
                  <li>Office: 95-190 kWh/m²</li>
                  <li>Retail: 120-340 kWh/m²</li>
                  <li>Schools: 85-150 kWh/m²</li>
                  <li>Base temp: 15.5°C heating</li>
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
            <Link to="../section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-5">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EnergyEfficiencyModule6Section4;
