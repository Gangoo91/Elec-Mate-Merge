import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  BarChart3,
  Target,
  Gauge,
  Users,
  RefreshCw,
  TrendingUp,
  Lightbulb,
  ClipboardList,
  Building2,
  ThermometerSun,
  Calculator,
  LineChart,
  PieChart,
  Activity,
  Zap,
  CheckCircle2,
} from 'lucide-react';

const EnergyEfficiencyModule6Section4: React.FC = () => {
  const navigate = useNavigate();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  useSEO({
    title: 'Developing Energy KPI Dashboards | Energy Efficiency Module 6 Section 4 | Elec-Mate',
    description:
      'Learn to develop effective energy KPI dashboards including SMART KPI setting, degree day normalisation, CUSUM charts, ISO 50001 EnPIs, and practical dashboard design for UK buildings.',
    keywords: [
      'energy KPI',
      'dashboard design',
      'energy performance indicators',
      'EUI',
      'degree day normalisation',
      'CUSUM charts',
      'ISO 50001',
      'EnPIs',
      'energy management',
      'UK buildings',
    ],
    canonicalUrl: '/upskilling/energy-efficiency/module-6/section-4',
  });

  const quickCheckQuestions = [
    {
      id: 'qc1',
      question:
        'What does the "M" in SMART KPIs stand for when setting energy performance targets?',
      options: ['Meaningful', 'Measurable', 'Maximum', 'Monthly'],
      correctIndex: 1,
      explanation:
        'SMART KPIs must be Measurable - you need to quantify the metric so progress can be tracked objectively. Without measurement capability, you cannot determine if targets are being met or improvements achieved.',
    },
    {
      id: 'qc2',
      question:
        'Why is degree day normalisation important when comparing energy consumption across different periods?',
      options: [
        'It makes calculations simpler',
        'It removes the effect of weather variations on heating/cooling demand',
        'It converts energy units to standard measurements',
        'It adjusts for electricity price changes',
      ],
      correctIndex: 1,
      explanation:
        'Degree day normalisation removes weather variations from energy data, allowing fair comparison between periods with different outdoor temperatures. This ensures genuine efficiency changes are identified rather than weather-driven consumption differences.',
    },
    {
      id: 'qc3',
      question:
        'What does a rising CUSUM line indicate in energy performance monitoring?',
      options: [
        'Energy consumption is below the baseline',
        'Energy consumption is matching the baseline exactly',
        'Energy consumption is above the baseline - potential waste',
        'The monitoring system has an error',
      ],
      correctIndex: 2,
      explanation:
        'A rising CUSUM (Cumulative Sum) line indicates that actual consumption is consistently exceeding the baseline prediction. This signals potential energy waste or system degradation requiring investigation and corrective action.',
    },
  ];

  const quizQuestions = [
    {
      question:
        'According to ISO 50001, what is the correct term for a quantifiable measure of energy performance?',
      options: [
        'Energy Use Indicator (EUI)',
        'Energy Performance Indicator (EnPI)',
        'Key Performance Index (KPI)',
        'Energy Efficiency Ratio (EER)',
      ],
      correctAnswer: 'Energy Performance Indicator (EnPI)',
    },
    {
      question:
        'What is the typical unit for Energy Use Intensity (EUI) in UK commercial buildings?',
      options: ['kW/m²', 'kWh/m²/year', 'MJ/ft²', 'BTU/m²/month'],
      correctAnswer: 'kWh/m²/year',
    },
    {
      question:
        'When setting an energy baseline, what minimum period of data is typically recommended?',
      options: ['1 month', '3 months', '12 months', '5 years'],
      correctAnswer: '12 months',
    },
    {
      question:
        'Which dashboard element is most appropriate for showing energy consumption trends over time?',
      options: ['Pie chart', 'Line graph', 'Data table', 'Single number display'],
      correctAnswer: 'Line graph',
    },
    {
      question:
        'What does a Heating Degree Day (HDD) base temperature of 15.5°C mean?',
      options: [
        'The building requires heating when outside temperature is above 15.5°C',
        'The building requires heating when outside temperature is below 15.5°C',
        'The indoor temperature must be maintained at exactly 15.5°C',
        'Energy consumption doubles at 15.5°C',
      ],
      correctAnswer:
        'The building requires heating when outside temperature is below 15.5°C',
    },
    {
      question:
        'For executive-level stakeholders, which KPI presentation format is most effective?',
      options: [
        'Detailed hourly consumption data tables',
        'Raw meter readings with technical annotations',
        'High-level summary with cost implications and trends',
        'Complex multi-variable scatter plots',
      ],
      correctAnswer: 'High-level summary with cost implications and trends',
    },
    {
      question:
        'What is the primary advantage of automated data collection for energy KPIs?',
      options: [
        'It eliminates the need for any human oversight',
        'It reduces manual errors and enables real-time monitoring',
        'It makes energy cheaper',
        'It replaces the need for meters',
      ],
      correctAnswer: 'It reduces manual errors and enables real-time monitoring',
    },
    {
      question:
        'In CUSUM analysis, what does it mean when the cumulative sum line is flat and horizontal?',
      options: [
        'No energy is being consumed',
        'Actual consumption matches the predicted baseline',
        'The monitoring system has stopped working',
        'Energy consumption is at maximum capacity',
      ],
      correctAnswer: 'Actual consumption matches the predicted baseline',
    },
    {
      question:
        'Which of these is NOT a relevant variable for normalising office building energy consumption?',
      options: [
        'Heating degree days',
        'Occupied floor area',
        'Number of occupants',
        'Age of the energy manager',
      ],
      correctAnswer: 'Age of the energy manager',
    },
    {
      question:
        'What frequency of KPI review is recommended for operational energy management in most commercial buildings?',
      options: [
        'Annually only',
        'Every 5 years',
        'Monthly with weekly spot checks',
        'Once at building handover',
      ],
      correctAnswer: 'Monthly with weekly spot checks',
    },
  ];

  const faqs = [
    {
      question: 'How many KPIs should I track for effective energy management?',
      answer:
        'Focus on 5-8 key KPIs rather than tracking everything possible. Start with the essentials: total energy consumption, EUI (kWh/m²), cost per unit, and one or two process-specific metrics. Too many KPIs dilute attention and make it harder to identify genuine issues. As your energy management matures, you can add more specific indicators. ISO 50001 recommends selecting EnPIs that reflect significant energy uses (SEUs) - the 80/20 rule often applies where 20% of your systems consume 80% of energy.',
    },
    {
      question: 'What is the difference between leading and lagging energy KPIs?',
      answer:
        'Lagging KPIs measure outcomes after they happen - like monthly energy bills or annual EUI figures. Leading KPIs predict future performance - such as equipment efficiency trends, maintenance compliance rates, or behaviour change metrics. Effective dashboards include both: lagging KPIs confirm results while leading KPIs enable proactive intervention. For example, tracking chiller COP weekly (leading) helps prevent the poor monthly consumption figures (lagging) that would result from degraded performance.',
    },
    {
      question: 'How do I handle missing data when calculating energy KPIs?',
      answer:
        'Missing data is common and needs consistent handling. Options include: interpolation from adjacent readings (suitable for small gaps), using average values from equivalent periods (e.g., same day last week), or flagging the period as incomplete. Document your approach and apply it consistently. For automated systems, set up alerts for data gaps exceeding acceptable thresholds (typically 2-4 hours for half-hourly data). Never simply ignore gaps as this distorts trends and comparisons. Consider data quality as a KPI itself - percentage data availability should exceed 98% for reliable analysis.',
    },
    {
      question:
        'Should I use actual or normalised figures on my energy dashboard?',
      answer:
        "Include both, clearly labelled. Actual figures show real consumption and costs - essential for budgeting and billing verification. Normalised figures (adjusted for weather, occupancy, production) enable fair performance comparisons and genuine efficiency tracking. For executive dashboards, lead with normalised performance metrics but include actual cost summaries. For operational dashboards, show both alongside each other. Always explain the normalisation method used - stakeholders need to understand what 'good' and 'bad' really mean in context.",
    },
    {
      question: 'How often should I update my energy baseline?',
      answer:
        "Review baselines annually and update when significant changes occur: major equipment replacements, building extensions, occupancy pattern changes, or operational shifts. ISO 50001 requires baseline adjustment for 'static factors' - changes that aren't reflected in your regression variables. Document all baseline changes with clear justification. A common approach is maintaining a rolling 3-year baseline that automatically accounts for gradual changes while requiring manual adjustment for step changes. Never change baselines simply because performance looks poor - that defeats the purpose.",
    },
    {
      question: 'What tools can I use to create energy KPI dashboards?',
      answer:
        "Options range from simple to sophisticated. Excel/Google Sheets work for basic dashboards with manual data entry. Power BI, Tableau, or Google Data Studio offer more powerful visualisation with data connections. Dedicated energy management software (EMS) like SMAP, Stark, or Inspired provides automated meter data collection, degree day normalisation, and pre-built KPI templates. Building management systems (BMS) often include dashboard modules. For UK buildings, the CIBSE TM22 benchmarking tool and Display Energy Certificate (DEC) ratings provide standardised comparative KPIs. Start simple and upgrade as needs grow.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a] text-white">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-elec-yellow mb-2">
            <BarChart3 className="w-6 h-6" />
            <span className="text-sm font-medium">Module 6 - Section 4</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Developing Energy KPI Dashboards
          </h1>
          <p className="text-gray-300 text-lg">
            Master the art of creating meaningful energy Key Performance Indicator
            dashboards that drive real improvements. Learn SMART KPI setting, degree
            day normalisation, CUSUM analysis, and ISO 50001 EnPIs for UK buildings.
          </p>
        </div>

        {/* Section 1: Selecting Meaningful Energy KPIs */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-black rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
              1
            </div>
            <h2 className="text-2xl font-bold">Selecting Meaningful Energy KPIs</h2>
          </div>
          <div className="bg-[#242424] rounded-lg p-6 space-y-4">
            <div className="flex items-start gap-3">
              <Target className="w-6 h-6 text-elec-yellow flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">The SMART Framework for Energy KPIs</h3>
                <p className="text-gray-300 mb-4">
                  Effective energy KPIs follow the SMART criteria, ensuring they deliver
                  actionable insights rather than just data:
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">Specific:</strong> Clearly defined
                      metrics tied to particular systems or processes (e.g., "HVAC electricity
                      consumption" not just "energy use")
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">Measurable:</strong> Quantifiable values
                      from reliable data sources - sub-meters, BMS points, or utility bills
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">Achievable:</strong> Targets within
                      realistic bounds based on technical and financial constraints
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">Relevant:</strong> Aligned with
                      organisational energy objectives and significant energy uses
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">Time-bound:</strong> Clear reporting
                      periods and target dates for achievement
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 mt-4">
              <h4 className="font-semibold text-elec-yellow mb-3">
                ISO 50001 Energy Performance Indicators (EnPIs)
              </h4>
              <p className="text-gray-300 mb-3">
                ISO 50001 requires organisations to establish EnPIs that demonstrate
                energy performance improvement. Common EnPI types include:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-[#242424] p-3 rounded">
                  <p className="font-medium text-white">Absolute Metrics</p>
                  <p className="text-sm text-gray-400">
                    Total kWh, total cost, peak demand (kW)
                  </p>
                </div>
                <div className="bg-[#242424] p-3 rounded">
                  <p className="font-medium text-white">Ratio Metrics</p>
                  <p className="text-sm text-gray-400">
                    kWh/m², kWh/unit produced, kWh/occupant
                  </p>
                </div>
                <div className="bg-[#242424] p-3 rounded">
                  <p className="font-medium text-white">Regression Models</p>
                  <p className="text-sm text-gray-400">
                    kWh vs degree days, consumption vs production
                  </p>
                </div>
                <div className="bg-[#242424] p-3 rounded">
                  <p className="font-medium text-white">Statistical Models</p>
                  <p className="text-sm text-gray-400">
                    CUSUM, control charts, trend analysis
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Energy Use Intensity and Normalisation */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-black rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
              2
            </div>
            <h2 className="text-2xl font-bold">
              Energy Use Intensity (EUI) and Normalisation
            </h2>
          </div>
          <div className="bg-[#242424] rounded-lg p-6 space-y-4">
            <div className="flex items-start gap-3">
              <Building2 className="w-6 h-6 text-elec-yellow flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Understanding EUI</h3>
                <p className="text-gray-300">
                  Energy Use Intensity (EUI) is the fundamental benchmark for building
                  energy performance in the UK. Expressed as <strong>kWh/m²/year</strong>,
                  it allows comparison between buildings of different sizes and enables
                  benchmarking against CIBSE TM46 or Display Energy Certificate standards.
                </p>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Calculator className="w-5 h-5 text-elec-yellow" />
                <h4 className="font-semibold">EUI Calculation</h4>
              </div>
              <div className="bg-[#2a2a2a] p-4 rounded font-mono text-center text-lg">
                EUI = Total Annual Energy (kWh) ÷ Gross Internal Area (m²)
              </div>
              <p className="text-sm text-gray-400 mt-2">
                Note: Include all energy sources (electricity, gas, oil) converted to kWh
                for a complete picture.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <ThermometerSun className="w-6 h-6 text-elec-yellow flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Degree Day Normalisation</h3>
                <p className="text-gray-300 mb-3">
                  Degree days quantify heating or cooling demand based on outdoor
                  temperature. The UK standard uses a base temperature of 15.5°C for
                  Heating Degree Days (HDD).
                </p>
                <div className="bg-[#1a1a1a] rounded-lg p-4">
                  <p className="text-sm text-gray-300 mb-2">
                    <strong>Heating Degree Day (HDD):</strong> For each day where the
                    mean temperature is below 15.5°C, the HDD value equals (15.5 - mean
                    temperature).
                  </p>
                  <p className="text-sm text-gray-300">
                    <strong>Example:</strong> A day with mean temperature of 10°C
                    contributes 5.5 HDD. Monthly totals are summed for normalisation.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-400 mb-2">
                Weather Normalisation Formula
              </h4>
              <p className="text-gray-300 text-sm mb-2">
                To compare consumption between periods with different weather:
              </p>
              <div className="bg-[#1a1a1a] p-3 rounded font-mono text-sm">
                Normalised Consumption = Actual Consumption × (Standard DD ÷ Actual DD)
              </div>
              <p className="text-gray-400 text-sm mt-2">
                Standard DD typically uses a 20-year average for your location. UK
                degree day data is available from{' '}
                <span className="text-elec-yellow">degree-days.net</span> or the Carbon
                Trust.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Check 1 */}
        <div className="mb-12">
          <InlineCheck
            id={quickCheckQuestions[0].id}
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
        </div>

        {/* Section 3: Setting Targets and Baselines */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-black rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
              3
            </div>
            <h2 className="text-2xl font-bold">Setting Targets and Baselines</h2>
          </div>
          <div className="bg-[#242424] rounded-lg p-6 space-y-4">
            <div className="flex items-start gap-3">
              <LineChart className="w-6 h-6 text-elec-yellow flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Establishing an Energy Baseline</h3>
                <p className="text-gray-300 mb-3">
                  A baseline is the reference point against which future performance is
                  measured. ISO 50001 requires a minimum 12-month baseline period to
                  capture seasonal variations and operational cycles.
                </p>
                <div className="space-y-2">
                  <div className="bg-[#1a1a1a] p-3 rounded">
                    <p className="font-medium text-white">Data Requirements</p>
                    <p className="text-sm text-gray-400">
                      Collect energy consumption data (minimum half-hourly for electricity),
                      relevant variables (degree days, occupancy, production), and
                      operational conditions during the baseline period.
                    </p>
                  </div>
                  <div className="bg-[#1a1a1a] p-3 rounded">
                    <p className="font-medium text-white">Regression Analysis</p>
                    <p className="text-sm text-gray-400">
                      Develop a mathematical model relating consumption to key variables.
                      For heating: kWh = (a × HDD) + b, where 'a' is the gradient and 'b'
                      is the base load.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Activity className="w-6 h-6 text-elec-yellow flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">CUSUM Analysis</h3>
                <p className="text-gray-300 mb-3">
                  Cumulative Sum (CUSUM) charts are powerful tools for detecting
                  performance changes over time. They plot the running total of
                  differences between actual and expected consumption.
                </p>
                <div className="grid md:grid-cols-3 gap-3">
                  <div className="bg-green-900/30 border border-green-500/50 p-3 rounded">
                    <TrendingUp className="w-5 h-5 text-green-400 mb-2 rotate-180" />
                    <p className="font-medium text-green-400">Falling Line</p>
                    <p className="text-sm text-gray-300">
                      Consumption below baseline - good performance
                    </p>
                  </div>
                  <div className="bg-gray-700/30 border border-gray-500/50 p-3 rounded">
                    <Activity className="w-5 h-5 text-gray-400 mb-2" />
                    <p className="font-medium text-gray-400">Flat Line</p>
                    <p className="text-sm text-gray-300">
                      Matching baseline - stable performance
                    </p>
                  </div>
                  <div className="bg-red-900/30 border border-red-500/50 p-3 rounded">
                    <TrendingUp className="w-5 h-5 text-red-400 mb-2" />
                    <p className="font-medium text-red-400">Rising Line</p>
                    <p className="text-sm text-gray-300">
                      Above baseline - investigate waste
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h4 className="font-semibold text-elec-yellow mb-3">
                Target Setting Approaches
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <span className="bg-elec-yellow text-black px-2 py-0.5 rounded text-sm font-medium">
                    1
                  </span>
                  <p className="text-gray-300">
                    <strong className="text-white">Historical improvement:</strong> Reduce
                    EUI by X% from baseline (typically 2-5% annually for mature buildings)
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="bg-elec-yellow text-black px-2 py-0.5 rounded text-sm font-medium">
                    2
                  </span>
                  <p className="text-gray-300">
                    <strong className="text-white">Benchmark targets:</strong> Achieve
                    CIBSE Guide F "good practice" or "best practice" levels for building type
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="bg-elec-yellow text-black px-2 py-0.5 rounded text-sm font-medium">
                    3
                  </span>
                  <p className="text-gray-300">
                    <strong className="text-white">Net zero pathway:</strong> Science-based
                    targets aligned with UK carbon budgets and 2050 commitments
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Check 2 */}
        <div className="mb-12">
          <InlineCheck
            id={quickCheckQuestions[1].id}
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
        </div>

        {/* Section 4: Dashboard Design for Different Audiences */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-black rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
              4
            </div>
            <h2 className="text-2xl font-bold">
              Dashboard Design for Different Audiences
            </h2>
          </div>
          <div className="bg-[#242424] rounded-lg p-6 space-y-4">
            <div className="flex items-start gap-3">
              <Users className="w-6 h-6 text-elec-yellow flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  Tailoring Dashboards to Stakeholders
                </h3>
                <p className="text-gray-300">
                  Effective dashboards match complexity and detail to audience needs.
                  A single dashboard rarely serves all users well - consider creating
                  tiered views for different stakeholder groups.
                </p>
              </div>
            </div>

            <div className="grid gap-4">
              {/* Executive Dashboard */}
              <div className="bg-[#1a1a1a] rounded-lg p-4 border-l-4 border-purple-500">
                <div className="flex items-center gap-2 mb-2">
                  <PieChart className="w-5 h-5 text-purple-400" />
                  <h4 className="font-semibold text-purple-400">
                    Executive/Board Level
                  </h4>
                </div>
                <p className="text-gray-300 text-sm mb-2">
                  Focus: Strategic overview, costs, and compliance
                </p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Total energy cost vs budget (monthly/YTD)</li>
                  <li>• Portfolio EUI with RAG status</li>
                  <li>• Carbon emissions progress to targets</li>
                  <li>• Key risks and compliance status (DEC, ESOS, SECR)</li>
                </ul>
              </div>

              {/* Facility Manager Dashboard */}
              <div className="bg-[#1a1a1a] rounded-lg p-4 border-l-4 border-blue-500">
                <div className="flex items-center gap-2 mb-2">
                  <Gauge className="w-5 h-5 text-blue-400" />
                  <h4 className="font-semibold text-blue-400">
                    Facility/Energy Manager
                  </h4>
                </div>
                <p className="text-gray-300 text-sm mb-2">
                  Focus: Operational performance and trends
                </p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Daily/weekly consumption profiles</li>
                  <li>• Weather-normalised performance vs baseline</li>
                  <li>• CUSUM charts for major systems</li>
                  <li>• Sub-meter breakdown by end use</li>
                  <li>• Alerts for consumption anomalies</li>
                </ul>
              </div>

              {/* Technical Dashboard */}
              <div className="bg-[#1a1a1a] rounded-lg p-4 border-l-4 border-green-500">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-5 h-5 text-green-400" />
                  <h4 className="font-semibold text-green-400">
                    Technical/Operations Team
                  </h4>
                </div>
                <p className="text-gray-300 text-sm mb-2">
                  Focus: Real-time monitoring and diagnostics
                </p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Live power demand and load profiles</li>
                  <li>• Equipment efficiency metrics (COP, EER, SFP)</li>
                  <li>• Half-hourly data with drilling capability</li>
                  <li>• Peak demand tracking and alerts</li>
                  <li>• Maintenance-linked performance flags</li>
                </ul>
              </div>

              {/* Public Display */}
              <div className="bg-[#1a1a1a] rounded-lg p-4 border-l-4 border-elec-yellow">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-elec-yellow" />
                  <h4 className="font-semibold text-elec-yellow">
                    Public/Occupant Display
                  </h4>
                </div>
                <p className="text-gray-300 text-sm mb-2">
                  Focus: Engagement and behaviour change
                </p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Simple, visual current consumption indicator</li>
                  <li>• Comparison to typical/target levels</li>
                  <li>• Tips for energy saving actions</li>
                  <li>• Progress towards sustainability goals</li>
                </ul>
              </div>
            </div>

            <div className="bg-amber-900/30 border border-amber-500/50 rounded-lg p-4">
              <h4 className="font-semibold text-amber-400 mb-2">
                Dashboard Design Best Practices
              </h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Use consistent colour coding (RAG status) across all views</li>
                <li>• Place most critical KPIs in top-left (natural reading pattern)</li>
                <li>• Limit each screen to 5-7 key metrics to avoid overload</li>
                <li>• Include clear date/time stamps and data freshness indicators</li>
                <li>• Provide context - show targets, benchmarks, and historical comparisons</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5: Automating Data Collection and Reporting */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-black rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
              5
            </div>
            <h2 className="text-2xl font-bold">
              Automating Data Collection and Reporting
            </h2>
          </div>
          <div className="bg-[#242424] rounded-lg p-6 space-y-4">
            <div className="flex items-start gap-3">
              <RefreshCw className="w-6 h-6 text-elec-yellow flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  Building an Automated Data Pipeline
                </h3>
                <p className="text-gray-300">
                  Manual data collection is error-prone and time-consuming. Automation
                  enables real-time monitoring, consistent calculations, and timely
                  alerts. A typical automated pipeline includes:
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#1a1a1a] p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-3">Data Sources</h4>
                <ul className="text-sm text-gray-300 space-y-2">
                  <li className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                    <span>Smart meters via supplier API or AMR</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                    <span>BMS points via BACnet/Modbus integration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                    <span>Sub-meters with pulse outputs or M-Bus</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                    <span>Weather data APIs (Met Office, Open Weather)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                    <span>Occupancy systems and access control</span>
                  </li>
                </ul>
              </div>
              <div className="bg-[#1a1a1a] p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-3">Processing Steps</h4>
                <ul className="text-sm text-gray-300 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Data validation and gap detection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Unit conversion and aggregation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Degree day normalisation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>KPI calculations and comparisons</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Alert generation for exceptions</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h4 className="font-semibold text-elec-yellow mb-3">
                Automated Reporting Schedule
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left py-2 text-gray-400">Report Type</th>
                      <th className="text-left py-2 text-gray-400">Frequency</th>
                      <th className="text-left py-2 text-gray-400">Audience</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-700">
                      <td className="py-2">Exception alerts</td>
                      <td className="py-2">Real-time</td>
                      <td className="py-2">Operations team</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2">Daily summary</td>
                      <td className="py-2">Daily (AM)</td>
                      <td className="py-2">Energy manager</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2">Performance review</td>
                      <td className="py-2">Weekly</td>
                      <td className="py-2">FM team</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2">KPI dashboard</td>
                      <td className="py-2">Monthly</td>
                      <td className="py-2">Management</td>
                    </tr>
                    <tr>
                      <td className="py-2">Strategic review</td>
                      <td className="py-2">Quarterly</td>
                      <td className="py-2">Executive/Board</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Check 3 */}
        <div className="mb-12">
          <InlineCheck
            id={quickCheckQuestions[2].id}
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
        </div>

        {/* Section 6: Continuous Improvement Using KPI Data */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-black rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
              6
            </div>
            <h2 className="text-2xl font-bold">
              Continuous Improvement Using KPI Data
            </h2>
          </div>
          <div className="bg-[#242424] rounded-lg p-6 space-y-4">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-6 h-6 text-elec-yellow flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  The Plan-Do-Check-Act Cycle
                </h3>
                <p className="text-gray-300">
                  KPIs are only valuable if they drive action. The ISO 50001 PDCA cycle
                  provides a framework for using KPI data to achieve continuous improvement
                  in energy performance.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-900/30 border border-blue-500/50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-400 mb-2">Plan</h4>
                <p className="text-sm text-gray-300">
                  Analyse KPI trends to identify improvement opportunities. Set targets
                  based on baseline data and benchmark comparisons. Develop action plans
                  with resource requirements and timelines.
                </p>
              </div>
              <div className="bg-green-900/30 border border-green-500/50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-400 mb-2">Do</h4>
                <p className="text-sm text-gray-300">
                  Implement improvement actions - operational changes, maintenance
                  interventions, equipment upgrades. Document changes and expected
                  impacts on relevant KPIs.
                </p>
              </div>
              <div className="bg-amber-900/30 border border-amber-500/50 p-4 rounded-lg">
                <h4 className="font-semibold text-amber-400 mb-2">Check</h4>
                <p className="text-sm text-gray-300">
                  Monitor KPIs to verify improvements. Use CUSUM to detect performance
                  changes. Compare actual savings to predictions using M&V protocols
                  (IPMVP).
                </p>
              </div>
              <div className="bg-purple-900/30 border border-purple-500/50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-400 mb-2">Act</h4>
                <p className="text-sm text-gray-300">
                  Standardise successful improvements. Investigate and correct
                  underperformance. Update baselines and targets. Share learnings
                  across the organisation.
                </p>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h4 className="font-semibold text-elec-yellow mb-3">
                Key Questions for KPI Review Meetings
              </h4>
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-start gap-2">
                  <ClipboardList className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                  <span>
                    Are we on track to meet our annual targets? If not, what corrective
                    actions are needed?
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <ClipboardList className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                  <span>
                    What caused any significant deviations from expected performance this
                    period?
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <ClipboardList className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                  <span>
                    Which buildings/systems are underperforming relative to peers or
                    benchmarks?
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <ClipboardList className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                  <span>
                    What actions from previous meetings have been completed and what were
                    the results?
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <ClipboardList className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                  <span>
                    Are there any data quality issues affecting KPI reliability?
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-5 h-5 text-green-400" />
                <h4 className="font-semibold text-green-400">Pro Tip</h4>
              </div>
              <p className="text-gray-300 text-sm">
                Create a "KPI action log" that links every identified issue to a
                responsible owner, target completion date, and expected KPI impact.
                Review this log at each meeting to ensure accountability and track
                whether interventions delivered expected results. This closes the loop
                between measurement and action.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-elec-yellow/20 to-amber-500/20 border border-elec-yellow/50 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <ClipboardList className="w-6 h-6 text-elec-yellow" />
              <h2 className="text-xl font-bold text-elec-yellow">
                Quick Reference: Energy KPI Dashboard Essentials
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-white mb-2">Essential KPIs</h3>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• EUI (kWh/m²/year) - building efficiency</li>
                  <li>• Total cost and cost/m² - financial tracking</li>
                  <li>• Peak demand (kW) - capacity management</li>
                  <li>• Carbon intensity (kgCO2e/m²) - sustainability</li>
                  <li>• Weather-normalised consumption - true performance</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">UK Benchmarks (CIBSE TM46)</h3>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• General office: 95 kWh/m² (typical)</li>
                  <li>• School: 110 kWh/m² (typical)</li>
                  <li>• Hospital: 420 kWh/m² (typical)</li>
                  <li>• Retail: 165 kWh/m² (typical)</li>
                  <li>• Hotel: 330 kWh/m² (typical)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">CUSUM Interpretation</h3>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Rising line = consumption above baseline (investigate)</li>
                  <li>• Falling line = consumption below baseline (success)</li>
                  <li>• Flat line = matching baseline (stable)</li>
                  <li>• Step change = sudden event (identify cause)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Review Frequencies</h3>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Real-time: Exception alerts, peak warnings</li>
                  <li>• Daily: Consumption patterns, anomalies</li>
                  <li>• Monthly: KPI performance vs targets</li>
                  <li>• Annually: Baseline review, target setting</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Test Your Knowledge</h2>
          <Quiz
            questions={quizQuestions}
            moduleId="energy-efficiency-m6s4"
            sectionTitle="Developing Energy KPI Dashboards"
          />
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-[#242424] rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-4 text-left min-h-[44px] touch-manipulation active:scale-[0.98]"
                >
                  <span className="font-medium pr-4">{faq.question}</span>
                  {expandedFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                  )}
                </button>
                {expandedFAQ === index && (
                  <div className="px-4 pb-4">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <Button
            onClick={() =>
              navigate('/upskilling/energy-efficiency/module-6/section-3')
            }
            variant="outline"
            className="min-h-[44px] touch-manipulation active:scale-[0.98] bg-transparent border-gray-600 hover:border-elec-yellow hover:text-elec-yellow"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous: Section 3
          </Button>
          <Button
            onClick={() =>
              navigate('/upskilling/energy-efficiency/module-6/section-5')
            }
            className="min-h-[44px] touch-manipulation active:scale-[0.98] bg-elec-yellow text-black hover:bg-yellow-400"
          >
            Next: Section 5
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EnergyEfficiencyModule6Section4;
