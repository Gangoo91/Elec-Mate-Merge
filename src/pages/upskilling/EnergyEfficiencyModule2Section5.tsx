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
  FileBarChart,
  AlertTriangle,
  Target,
  FileText,
  Users,
  ListOrdered,
  Lightbulb,
  BarChart3,
  TrendingUp,
  Flame,
  Clock,
  Zap,
  CheckCircle2,
  PieChart,
  Presentation,
  ClipboardList,
} from 'lucide-react';

const EnergyEfficiencyModule2Section5: React.FC = () => {
  const navigate = useNavigate();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);

  useSEO({
    title: 'Reporting Load Profiles and Variations | Energy Efficiency Module 2 Section 5 | Elec-Mate',
    description: 'Learn professional reporting techniques for load profiles including visualisations, anomaly identification, benchmarking, and presenting actionable recommendations to clients.',
    keywords: [
      'load profile reporting',
      'energy audit reports',
      'load visualisation',
      'heatmaps',
      'carpet plots',
      'energy benchmarking',
      'client presentations',
      'energy recommendations',
    ],
  });

  const quickCheckQuestions = [
    {
      id: 'qc1-m2s5',
      question: 'What type of visualisation is best for showing energy consumption patterns across both time of day and days of the week?',
      options: [
        'Simple bar chart',
        'Carpet plot or heatmap',
        'Pie chart',
        'Scatter plot',
      ],
      correctIndex: 1,
      explanation: 'Carpet plots and heatmaps are ideal for displaying two-dimensional time-based data, allowing viewers to quickly identify patterns across hours of the day and days of the week simultaneously. They use colour intensity to represent consumption levels.',
    },
    {
      id: 'qc2-m2s5',
      question: 'When presenting energy efficiency findings to a client, what should be the primary focus?',
      options: [
        'Technical specifications and raw data',
        'Actionable recommendations with clear ROI',
        'Detailed methodology explanations',
        'Industry jargon and complex formulas',
      ],
      correctIndex: 1,
      explanation: 'Clients are primarily interested in actionable recommendations that show clear return on investment. While technical data supports your findings, the focus should be on practical outcomes, costs, savings, and payback periods that help clients make informed decisions.',
    },
    {
      id: 'qc3-m2s5',
      question: 'What is the most effective way to prioritise energy efficiency recommendations?',
      options: [
        'Alphabetically by equipment name',
        'By the order they were discovered',
        'By a combination of savings potential, cost, and ease of implementation',
        'Randomly to avoid bias',
      ],
      correctIndex: 2,
      explanation: 'Effective prioritisation uses a matrix approach considering multiple factors: potential energy savings, implementation cost, ease of implementation, and payback period. This helps clients understand which actions offer the best value and where to focus their budget.',
    },
  ];

  const quizQuestions = [
    {
      question: 'What is a carpet plot used for in energy reporting?',
      options: [
        'Calculating total energy costs',
        'Visualising consumption patterns across time of day and date',
        'Measuring power factor',
        'Determining cable sizes',
      ],
      correctAnswer: 'Visualising consumption patterns across time of day and date',
    },
    {
      question: 'Which metric is essential for benchmarking commercial building energy use?',
      options: [
        'Total kilowatt-hours only',
        'kWh per square metre per year',
        'Maximum demand in amps',
        'Number of light fittings',
      ],
      correctAnswer: 'kWh per square metre per year',
    },
    {
      question: 'What does a high baseload during non-operational hours typically indicate?',
      options: [
        'Efficient equipment operation',
        'Normal building function',
        'Potential energy waste from equipment left running',
        'Accurate metering',
      ],
      correctAnswer: 'Potential energy waste from equipment left running',
    },
    {
      question: 'In a professional energy report, what should the executive summary contain?',
      options: [
        'All raw data and measurements',
        'Key findings, recommendations, and potential savings overview',
        'Only the methodology used',
        'Detailed technical specifications',
      ],
      correctAnswer: 'Key findings, recommendations, and potential savings overview',
    },
    {
      question: 'What colour typically represents high energy consumption in a heatmap?',
      options: [
        'Blue or green (cool colours)',
        'White or grey (neutral colours)',
        'Red or orange (warm colours)',
        'Black (no colour)',
      ],
      correctAnswer: 'Red or orange (warm colours)',
    },
    {
      question: 'What is the recommended maximum payback period for "quick win" energy efficiency measures?',
      options: [
        '10+ years',
        '5-10 years',
        '2-3 years or less',
        '15-20 years',
      ],
      correctAnswer: '2-3 years or less',
    },
    {
      question: 'When identifying load profile anomalies, what pattern suggests equipment malfunction?',
      options: [
        'Consistent daily peaks during business hours',
        'Sudden unexplained spikes or erratic consumption patterns',
        'Gradual seasonal variations',
        'Weekend reduction in consumption',
      ],
      correctAnswer: 'Sudden unexplained spikes or erratic consumption patterns',
    },
    {
      question: 'What software tool is commonly used for creating professional load profile visualisations?',
      options: [
        'Word processor only',
        'Excel with charts, or specialised energy software',
        'Basic calculator',
        'Email client',
      ],
      correctAnswer: 'Excel with charts, or specialised energy software',
    },
    {
      question: 'What is the purpose of including comparison benchmarks in energy reports?',
      options: [
        'To make the report longer',
        'To provide context and show how the site compares to similar facilities',
        'To confuse the client',
        'To hide poor performance',
      ],
      correctAnswer: 'To provide context and show how the site compares to similar facilities',
    },
    {
      question: 'Which recommendation format is most effective for client presentations?',
      options: [
        'Long paragraphs of technical text',
        'Prioritised list with costs, savings, and payback periods',
        'Verbal-only explanations',
        'Raw spreadsheet data',
      ],
      correctAnswer: 'Prioritised list with costs, savings, and payback periods',
    },
  ];

  const faqs = [
    {
      question: 'What software tools are best for creating load profile reports?',
      answer: 'Microsoft Excel remains the most accessible tool for creating load profile visualisations, including line charts, heatmaps, and pivot tables. For more advanced analysis, consider specialised energy management software like EnergyCAP, Utility Manager, or Power BI. Many smart meter portals also provide built-in reporting features. The key is choosing tools your client can also access and understand for ongoing monitoring.',
    },
    {
      question: 'How do I explain technical findings to non-technical clients?',
      answer: 'Focus on outcomes rather than technical processes. Use analogies (e.g., "leaving equipment on overnight is like leaving taps running"), visual comparisons, and dollar figures rather than kilowatt-hours. Prepare a one-page summary with key points, avoid jargon, and use colour-coded charts that intuitively show good (green) vs concerning (red) patterns. Always relate findings back to their business operations and costs.',
    },
    {
      question: 'What benchmarks should I use for Australian commercial buildings?',
      answer: 'The NABERS (National Australian Built Environment Rating System) provides excellent benchmarks for offices, hotels, shopping centres, and data centres. For offices, typical consumption ranges from 100-200 kWh/m²/year for 4-5 star ratings. The Commercial Building Disclosure (CBD) program also provides comparison data. Always compare like-for-like: similar building types, climate zones, and operational hours.',
    },
    {
      question: 'How detailed should load profile reports be?',
      answer: 'Match detail level to your audience. Executive summaries should fit on one page with key metrics and recommendations. Technical appendices can contain detailed data, methodologies, and supporting calculations for those who want to verify findings. Most clients want to understand: what is the problem, what will it cost to fix, how much will they save, and how long until they see returns.',
    },
    {
      question: 'What are the most common load profile anomalies to look for?',
      answer: 'Key anomalies include: high baseload during non-operational hours (equipment left on), unexpected demand spikes (faulty equipment or poor power factor), inconsistent patterns compared to similar days (operational issues), gradual consumption creep over time (degrading equipment), and misalignment between occupancy and energy use (control system issues). Seasonal anomalies like heating running in summer also indicate problems.',
    },
    {
      question: 'How do I prioritise recommendations when clients have limited budgets?',
      answer: 'Use a prioritisation matrix scoring each recommendation on: potential savings (annual $), implementation cost, ease of implementation, and payback period. Categorise into "quick wins" (low cost, fast payback), "strategic investments" (higher cost but significant savings), and "long-term upgrades" (major capital works). Present options in tiers so clients can choose based on their budget and risk tolerance.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <FileBarChart className="w-8 h-8 text-elec-yellow" />
            <span className="text-elec-yellow text-sm font-medium">Module 2 • Section 5</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Reporting Load Profiles and Variations
          </h1>
          <p className="text-gray-400">
            Master professional reporting techniques to communicate load profile findings effectively
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Introduction */}
        <div className="bg-[#242424] rounded-xl p-6 border border-gray-800">
          <p className="text-gray-300 leading-relaxed">
            Collecting and analysing load profile data is only valuable if you can communicate findings
            clearly to clients. This section covers professional reporting techniques, from creating
            impactful visualisations to presenting prioritised recommendations that drive action.
            You'll learn to transform raw data into compelling narratives that help clients understand
            their energy use and make informed decisions about efficiency improvements.
          </p>
        </div>

        {/* Section 1: Creating Clear Load Profile Visualisations */}
        <section className="bg-[#242424] rounded-xl p-6 border border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-elec-yellow/20 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-elec-yellow" />
            </div>
            <h2 className="text-xl font-semibold">1. Creating Clear Load Profile Visualisations</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Effective visualisations transform complex data into instantly understandable insights.
              The right chart type depends on what patterns you want to highlight.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <PieChart className="w-4 h-4 text-elec-yellow" />
                Visualisation Types and Applications
              </h3>
              <div className="space-y-3">
                <div className="border-l-2 border-elec-yellow pl-3">
                  <p className="font-medium text-white">Line Charts</p>
                  <p className="text-sm">Best for showing demand over time (24-hour profiles, weekly trends).
                  Use multiple lines to compare different days or periods.</p>
                </div>
                <div className="border-l-2 border-blue-500 pl-3">
                  <p className="font-medium text-white">Heatmaps / Carpet Plots</p>
                  <p className="text-sm">Ideal for showing patterns across two time dimensions (hour vs day).
                  Colour intensity represents consumption level - immediately reveals operational patterns.</p>
                </div>
                <div className="border-l-2 border-green-500 pl-3">
                  <p className="font-medium text-white">Bar Charts</p>
                  <p className="text-sm">Effective for comparing categories (monthly totals, equipment breakdown,
                  before/after comparisons). Easy for clients to understand.</p>
                </div>
                <div className="border-l-2 border-purple-500 pl-3">
                  <p className="font-medium text-white">Stacked Area Charts</p>
                  <p className="text-sm">Shows how different loads contribute to total consumption over time.
                  Useful for identifying which equipment dominates at different times.</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4">
              <h4 className="font-semibold text-blue-400 mb-2">Excel Heatmap Creation Tips</h4>
              <ol className="text-sm space-y-1 list-decimal list-inside">
                <li>Arrange data with hours (0-23) as rows and dates as columns</li>
                <li>Select data range and apply Conditional Formatting → Colour Scales</li>
                <li>Choose red-yellow-green or similar intuitive colour scheme</li>
                <li>Adjust column widths to create square cells for cleaner appearance</li>
                <li>Add clear axis labels and a colour legend</li>
              </ol>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-medium text-white mb-2">Do's</h4>
                <ul className="text-sm space-y-1">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Use consistent scales across comparisons
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Label axes clearly with units
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Annotate key events or anomalies
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Include titles that explain the insight
                  </li>
                </ul>
              </div>
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-medium text-white mb-2">Don'ts</h4>
                <ul className="text-sm space-y-1">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    Truncate axes to exaggerate changes
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    Use 3D effects (distorts perception)
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    Overcrowd with too many data series
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    Use confusing colour combinations
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Identifying Anomalies and Waste Patterns */}
        <section className="bg-[#242424] rounded-xl p-6 border border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-500" />
            </div>
            <h2 className="text-xl font-semibold">2. Identifying Anomalies and Waste Patterns</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Anomaly detection is where load profile analysis delivers the most value. Learning to
              spot unusual patterns helps identify waste, equipment faults, and optimisation opportunities.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h3 className="font-semibold text-white mb-3">Common Anomaly Types</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Flame className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-white">Elevated Baseload</p>
                    <p className="text-sm">High consumption during non-operational hours indicates equipment
                    running unnecessarily. Compare night/weekend loads to minimum possible (security, refrigeration, etc.).</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-white">Unexplained Demand Spikes</p>
                    <p className="text-sm">Sudden peaks not correlating with known activities may indicate
                    equipment faults, poor power factor, or uncontrolled motor starts.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-white">Schedule Misalignment</p>
                    <p className="text-sm">HVAC or lighting operating outside business hours, or starting
                    too early/finishing too late. Often indicates BMS or timer issues.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-white">Consumption Creep</p>
                    <p className="text-sm">Gradual increase in consumption over months/years without operational
                    changes. May indicate degrading equipment efficiency or control drift.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-900/20 border border-yellow-800 rounded-lg p-4">
              <h4 className="font-semibold text-elec-yellow mb-2">Analysis Checklist</h4>
              <div className="grid md:grid-cols-2 gap-2 text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  Compare weekday vs weekend profiles
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  Check overnight minimum (baseload)
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  Verify HVAC start/stop times
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  Look for holiday period differences
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  Identify peak demand timing
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  Note any erratic/unstable patterns
                </label>
              </div>
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

        {/* Section 3: Benchmarking Against Typical Profiles */}
        <section className="bg-[#242424] rounded-xl p-6 border border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-green-500" />
            </div>
            <h2 className="text-xl font-semibold">3. Benchmarking Against Typical Profiles</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Benchmarking puts your findings in context. Without comparison data, clients can't
              assess whether their consumption is reasonable or excessive for their building type.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h3 className="font-semibold text-white mb-3">Key Benchmarking Metrics</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-2 pr-4 text-elec-yellow">Metric</th>
                      <th className="text-left py-2 pr-4 text-elec-yellow">Unit</th>
                      <th className="text-left py-2 text-elec-yellow">Application</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    <tr>
                      <td className="py-2 pr-4">Energy Use Intensity (EUI)</td>
                      <td className="py-2 pr-4">kWh/m²/year</td>
                      <td className="py-2">Commercial buildings (NABERS)</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">Load Factor</td>
                      <td className="py-2 pr-4">% (0-100)</td>
                      <td className="py-2">Demand consistency measure</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">Baseload Ratio</td>
                      <td className="py-2 pr-4">% of peak</td>
                      <td className="py-2">Out-of-hours efficiency</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">kWh per unit output</td>
                      <td className="py-2 pr-4">kWh/unit</td>
                      <td className="py-2">Manufacturing facilities</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">kWh per employee</td>
                      <td className="py-2 pr-4">kWh/FTE/year</td>
                      <td className="py-2">Office buildings</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-medium text-white mb-2">NABERS Office Benchmarks</h4>
                <ul className="text-sm space-y-1">
                  <li>5 Star: &lt;100 kWh/m²/year</li>
                  <li>4 Star: 100-150 kWh/m²/year</li>
                  <li>3 Star: 150-200 kWh/m²/year</li>
                  <li>2 Star: 200-270 kWh/m²/year</li>
                  <li>1 Star: &gt;270 kWh/m²/year</li>
                </ul>
                <p className="text-xs text-gray-500 mt-2">*Varies by climate zone</p>
              </div>
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-medium text-white mb-2">Typical Baseload Ratios</h4>
                <ul className="text-sm space-y-1">
                  <li>Well-managed office: 20-30%</li>
                  <li>Average office: 40-50%</li>
                  <li>Poor control: 60-70%+</li>
                  <li>24/7 operations: 70-90%</li>
                  <li>Retail: 30-50%</li>
                </ul>
              </div>
            </div>

            <div className="bg-green-900/20 border border-green-800 rounded-lg p-4">
              <h4 className="font-semibold text-green-400 mb-2">Benchmark Sources</h4>
              <ul className="text-sm space-y-1">
                <li>• <strong>NABERS:</strong> nabers.gov.au - Australian building ratings</li>
                <li>• <strong>Energy Rating:</strong> energyrating.gov.au - Appliance benchmarks</li>
                <li>• <strong>CBD Program:</strong> cbd.gov.au - Commercial disclosure data</li>
                <li>• <strong>Industry associations:</strong> Sector-specific benchmarks</li>
                <li>• <strong>Utility data:</strong> Some retailers provide comparison data</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: Report Structure and Key Metrics */}
        <section className="bg-[#242424] rounded-xl p-6 border border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-500" />
            </div>
            <h2 className="text-xl font-semibold">4. Report Structure and Key Metrics</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              A well-structured report guides readers from summary to detail, allowing busy
              decision-makers to grasp key points quickly while providing supporting data for those
              who want deeper analysis.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-elec-yellow" />
                Recommended Report Structure
              </h3>
              <ol className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-elec-yellow text-black rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                  <div>
                    <p className="font-medium text-white">Executive Summary (1 page)</p>
                    <p className="text-sm">Key findings, total savings potential, top 3 recommendations, payback overview</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-elec-yellow text-black rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                  <div>
                    <p className="font-medium text-white">Site Overview</p>
                    <p className="text-sm">Building details, operational hours, major equipment, current energy costs</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-elec-yellow text-black rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                  <div>
                    <p className="font-medium text-white">Load Profile Analysis</p>
                    <p className="text-sm">Visualisations, patterns identified, anomalies, benchmark comparisons</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-elec-yellow text-black rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                  <div>
                    <p className="font-medium text-white">Findings and Opportunities</p>
                    <p className="text-sm">Detailed analysis of each issue, evidence, quantified waste</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-elec-yellow text-black rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">5</span>
                  <div>
                    <p className="font-medium text-white">Recommendations</p>
                    <p className="text-sm">Prioritised actions with costs, savings, payback periods</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-elec-yellow text-black rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">6</span>
                  <div>
                    <p className="font-medium text-white">Appendices</p>
                    <p className="text-sm">Raw data, detailed calculations, methodology, equipment lists</p>
                  </div>
                </li>
              </ol>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h3 className="font-semibold text-white mb-3">Essential Metrics to Include</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-elec-yellow text-sm font-medium mb-2">Consumption Metrics</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Total annual consumption (kWh)</li>
                    <li>• Monthly/seasonal breakdown</li>
                    <li>• Energy Use Intensity (kWh/m²)</li>
                    <li>• Baseload (kW and % of peak)</li>
                    <li>• Peak demand (kW/kVA)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-elec-yellow text-sm font-medium mb-2">Financial Metrics</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Current annual energy cost ($)</li>
                    <li>• Cost per kWh (effective rate)</li>
                    <li>• Potential annual savings ($)</li>
                    <li>• Implementation costs ($)</li>
                    <li>• Simple payback period (years)</li>
                  </ul>
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

        {/* Section 5: Presenting Findings to Clients */}
        <section className="bg-[#242424] rounded-xl p-6 border border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-500" />
            </div>
            <h2 className="text-xl font-semibold">5. Presenting Findings to Clients</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Your analysis is only as good as your ability to communicate it. Tailor your
              presentation style to your audience - facility managers need different information
              than CEOs or finance directors.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Presentation className="w-4 h-4 text-elec-yellow" />
                Audience-Specific Communication
              </h3>
              <div className="space-y-3">
                <div className="border-l-2 border-elec-yellow pl-3">
                  <p className="font-medium text-white">Executive / Finance</p>
                  <p className="text-sm">Focus on ROI, payback periods, risk reduction, compliance. Use dollar
                  figures prominently. Keep technical detail minimal. One-page summary with clear recommendations.</p>
                </div>
                <div className="border-l-2 border-blue-500 pl-3">
                  <p className="font-medium text-white">Facility Managers</p>
                  <p className="text-sm">Technical detail appreciated but practical focus essential. Emphasise
                  operational changes, BMS adjustments, maintenance implications. Show before/after potential.</p>
                </div>
                <div className="border-l-2 border-green-500 pl-3">
                  <p className="font-medium text-white">Operations / Maintenance</p>
                  <p className="text-sm">Detailed equipment-level findings. Specific faults, schedules to adjust,
                  maintenance requirements. Practical step-by-step guidance.</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-900/20 border border-green-800 rounded-lg p-4">
                <h4 className="font-semibold text-green-400 mb-2">Effective Presentation Tips</h4>
                <ul className="text-sm space-y-1">
                  <li>• Start with the bottom line (savings potential)</li>
                  <li>• Use visual comparisons (before/after)</li>
                  <li>• Translate kWh to dollars consistently</li>
                  <li>• Prepare for "so what?" questions</li>
                  <li>• Have backup data ready but don't lead with it</li>
                  <li>• End with clear next steps</li>
                </ul>
              </div>
              <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
                <h4 className="font-semibold text-red-400 mb-2">Common Pitfalls to Avoid</h4>
                <ul className="text-sm space-y-1">
                  <li>• Overwhelming with raw data</li>
                  <li>• Using unexplained jargon</li>
                  <li>• Presenting problems without solutions</li>
                  <li>• Vague savings estimates</li>
                  <li>• Ignoring client's budget constraints</li>
                  <li>• Failing to prioritise recommendations</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4">
              <h4 className="font-semibold text-blue-400 mb-2">The "Money Slide"</h4>
              <p className="text-sm mb-2">
                Every presentation should include a clear summary slide/page showing:
              </p>
              <div className="bg-[#1a1a1a] rounded p-3 text-sm font-mono">
                <p>Total Identified Savings: $XX,XXX per year</p>
                <p>Implementation Cost: $XX,XXX</p>
                <p>Simple Payback: X.X years</p>
                <p>10-Year Net Benefit: $XXX,XXX</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Recommendations and Priority Ranking */}
        <section className="bg-[#242424] rounded-xl p-6 border border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <ListOrdered className="w-5 h-5 text-orange-500" />
            </div>
            <h2 className="text-xl font-semibold">6. Recommendations and Priority Ranking</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Effective recommendations are specific, quantified, and prioritised. A long list of
              unranked suggestions leaves clients unsure where to start. Use a systematic approach
              to help them allocate limited budgets effectively.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h3 className="font-semibold text-white mb-3">Priority Matrix Approach</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-green-900/30 rounded p-3 text-center">
                  <p className="font-bold text-green-400">QUICK WINS</p>
                  <p>Low Cost + High Savings</p>
                  <p className="text-xs mt-1">Do First</p>
                </div>
                <div className="bg-blue-900/30 rounded p-3 text-center">
                  <p className="font-bold text-blue-400">STRATEGIC</p>
                  <p>High Cost + High Savings</p>
                  <p className="text-xs mt-1">Plan & Budget</p>
                </div>
                <div className="bg-yellow-900/30 rounded p-3 text-center">
                  <p className="font-bold text-yellow-400">CONSIDER</p>
                  <p>Low Cost + Low Savings</p>
                  <p className="text-xs mt-1">When Convenient</p>
                </div>
                <div className="bg-red-900/30 rounded p-3 text-center">
                  <p className="font-bold text-red-400">QUESTION</p>
                  <p>High Cost + Low Savings</p>
                  <p className="text-xs mt-1">Justify Carefully</p>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h3 className="font-semibold text-white mb-3">Recommendation Format Template</h3>
              <div className="border border-gray-700 rounded-lg p-4 text-sm">
                <p className="text-elec-yellow font-bold mb-2">Recommendation #1: Optimise HVAC Start Times</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p><span className="text-gray-400">Issue:</span> HVAC starts 2 hours before occupancy</p>
                    <p><span className="text-gray-400">Action:</span> Adjust BMS start time to 7:00 AM</p>
                    <p><span className="text-gray-400">Priority:</span> <span className="text-green-400">Quick Win</span></p>
                  </div>
                  <div>
                    <p><span className="text-gray-400">Est. Cost:</span> $500 (BMS programming)</p>
                    <p><span className="text-gray-400">Annual Savings:</span> $3,200</p>
                    <p><span className="text-gray-400">Payback:</span> 2 months</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h3 className="font-semibold text-white mb-3">Typical Quick Wins from Load Profile Analysis</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Adjust HVAC schedules to match actual occupancy</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Implement time switches on non-essential equipment</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Fix faulty sensors causing equipment to run continuously</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Stagger equipment starts to reduce demand peaks</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Install occupancy sensors for lighting/HVAC zones</span>
                </li>
              </ul>
            </div>

            <div className="bg-yellow-900/20 border border-yellow-800 rounded-lg p-4">
              <h4 className="font-semibold text-elec-yellow mb-2">Payback Period Guidelines</h4>
              <ul className="text-sm space-y-1">
                <li>• <strong>&lt;1 year:</strong> Highly attractive - implement immediately</li>
                <li>• <strong>1-3 years:</strong> Good return - strong recommendation</li>
                <li>• <strong>3-5 years:</strong> Acceptable for most businesses</li>
                <li>• <strong>5-10 years:</strong> Consider for major equipment upgrades</li>
                <li>• <strong>&gt;10 years:</strong> Usually only justified by other benefits (comfort, compliance)</li>
              </ul>
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
        <section className="bg-gradient-to-br from-elec-yellow/20 to-orange-500/20 rounded-xl p-6 border border-elec-yellow/30">
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="w-6 h-6 text-elec-yellow" />
            <h2 className="text-xl font-semibold">Quick Reference Card</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-elec-yellow mb-2">Report Checklist</h3>
              <ul className="text-sm space-y-1 text-gray-300">
                <li>□ Executive summary (1 page max)</li>
                <li>□ Site overview with key details</li>
                <li>□ Load profile visualisations</li>
                <li>□ Anomalies identified and explained</li>
                <li>□ Benchmark comparisons included</li>
                <li>□ Prioritised recommendations</li>
                <li>□ Cost/savings/payback for each action</li>
                <li>□ Clear next steps defined</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-elec-yellow mb-2">Key Visualisation Types</h3>
              <ul className="text-sm space-y-1 text-gray-300">
                <li>• <strong>Heatmap:</strong> Hour vs day patterns</li>
                <li>• <strong>Line chart:</strong> Daily/weekly trends</li>
                <li>• <strong>Bar chart:</strong> Category comparisons</li>
                <li>• <strong>Stacked area:</strong> Load composition</li>
              </ul>
              <h3 className="font-semibold text-elec-yellow mb-2 mt-4">Benchmarks to Include</h3>
              <ul className="text-sm space-y-1 text-gray-300">
                <li>• Energy Use Intensity (kWh/m²/yr)</li>
                <li>• Baseload ratio (% of peak)</li>
                <li>• NABERS rating equivalent</li>
                <li>• Industry averages</li>
              </ul>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-elec-yellow/30">
            <h3 className="font-semibold text-elec-yellow mb-2">Golden Rules for Client Presentations</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <span className="text-elec-yellow font-bold">1.</span>
                Lead with the money (potential savings)
              </div>
              <div className="flex items-center gap-2">
                <span className="text-elec-yellow font-bold">2.</span>
                Show, don't just tell (use visuals)
              </div>
              <div className="flex items-center gap-2">
                <span className="text-elec-yellow font-bold">3.</span>
                Prioritise ruthlessly (what first?)
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-[#242424] rounded-xl p-6 border border-gray-800">
          <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-700 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-4 text-left min-h-[44px] touch-manipulation hover:bg-[#2a2a2a] transition-colors"
                >
                  <span className="font-medium pr-4">{faq.question}</span>
                  {expandedFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {expandedFAQ === index && (
                  <div className="px-4 pb-4 text-gray-300 text-sm leading-relaxed border-t border-gray-700 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <section className="bg-[#242424] rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Section Quiz</h2>
            <Button
              onClick={() => setShowQuiz(!showQuiz)}
              variant="outline"
              className="min-h-[44px] touch-manipulation border-elec-yellow text-elec-yellow hover:bg-elec-yellow hover:text-black"
            >
              {showQuiz ? 'Hide Quiz' : 'Take Quiz'}
            </Button>
          </div>
          {showQuiz && (
            <Quiz
              questions={quizQuestions}
              moduleId="energy-efficiency-m2s5"
              onComplete={(score) => {
                console.log(`Quiz completed with score: ${score}/${quizQuestions.length}`);
              }}
            />
          )}
        </section>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row gap-4 justify-between pt-6 border-t border-gray-800">
          <Button
            onClick={() => navigate('/upskilling/energy-efficiency/module-2/section-4')}
            variant="outline"
            className="min-h-[44px] touch-manipulation border-gray-600 hover:border-elec-yellow hover:text-elec-yellow flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous: Section 4 - Load Profile Analysis Tools</span>
          </Button>
          <Button
            onClick={() => navigate('/upskilling/energy-efficiency/module-3')}
            className="min-h-[44px] touch-manipulation bg-elec-yellow text-black hover:bg-yellow-400 flex items-center gap-2"
          >
            <span>Next: Module 3 - Energy Auditing</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default EnergyEfficiencyModule2Section5;