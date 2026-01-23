import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  ClipboardCheck,
  BarChart3,
  Leaf,
  Calculator,
  Presentation,
  BookOpen,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  PoundSterling,
  Zap,
  Target,
  FileBarChart,
  Users
} from 'lucide-react';

const EnergyEfficiencyModule3Section5: React.FC = () => {
  useSEO({
    title: 'Audit Reports & Cost/Carbon Breakdown | Energy Efficiency Module 3.5',
    description: 'Master professional energy audit report writing including BS EN 16247 requirements, carbon calculations using UK grid factors, cost-benefit analysis, and effective presentation techniques.',
    keywords: ['energy audit report', 'BS EN 16247', 'carbon footprint', 'UK grid factors', 'cost-benefit analysis', 'Sankey diagram', 'energy balance', 'ROI calculation'],
    canonical: '/upskilling/energy-efficiency/module-3/section-5'
  });

  const quickCheckQuestions = [
    {
      id: 'qc1-audit-reports',
      question: 'According to BS EN 16247, what must the executive summary of an energy audit report include?',
      options: [
        'Only the total cost of recommended measures',
        'Ranked energy saving opportunities with estimated savings and investment costs',
        'Detailed technical specifications of all equipment',
        'A complete history of energy consumption'
      ],
      correctIndex: 1,
      explanation: 'BS EN 16247 requires the executive summary to include ranked energy saving opportunities with their estimated savings (in kWh and cost) and required investment costs, enabling decision-makers to quickly assess priorities.'
    },
    {
      id: 'qc2-carbon-factors',
      question: 'What is the approximate UK grid electricity carbon conversion factor (2023/24) published by DESNZ?',
      options: [
        '0.527 kgCO₂e/kWh',
        '0.207 kgCO₂e/kWh',
        '0.384 kgCO₂e/kWh',
        '0.612 kgCO₂e/kWh'
      ],
      correctIndex: 1,
      explanation: 'The UK grid electricity factor has decreased significantly to approximately 0.207 kgCO₂e/kWh (location-based, 2023/24) due to increased renewable generation. This is published annually by DESNZ (Department for Energy Security and Net Zero) in the GHG Conversion Factors.'
    },
    {
      id: 'qc3-payback',
      question: 'A lighting upgrade costs £12,000 and saves £3,000 per year in energy costs. What is the simple payback period?',
      options: [
        '2 years',
        '3 years',
        '4 years',
        '5 years'
      ],
      correctIndex: 2,
      explanation: 'Simple payback = Capital Cost ÷ Annual Savings = £12,000 ÷ £3,000 = 4 years. This basic calculation helps clients understand how quickly their investment will be recovered through energy savings.'
    }
  ];

  const quizQuestions = [
    {
      question: 'What standard defines the requirements for energy audit reports in the UK and EU?',
      options: ['ISO 50001', 'BS EN 16247', 'CIBSE TM54', 'ASHRAE Level II'],
      correctAnswer: 'BS EN 16247'
    },
    {
      question: 'In a Sankey diagram for energy auditing, what does the width of each flow represent?',
      options: ['The cost of energy', 'The magnitude of energy flow', 'The carbon content', 'The efficiency rating'],
      correctAnswer: 'The magnitude of energy flow'
    },
    {
      question: 'Which scope of carbon emissions covers purchased electricity?',
      options: ['Scope 1', 'Scope 2', 'Scope 3', 'Scope 4'],
      correctAnswer: 'Scope 2'
    },
    {
      question: 'What does NPV stand for in investment analysis?',
      options: ['Net Present Value', 'Normal Payment Verification', 'New Project Valuation', 'Nominal Price Variable'],
      correctAnswer: 'Net Present Value'
    },
    {
      question: 'For a project with £50,000 investment and £10,000 annual savings, what is the simple payback?',
      options: ['3 years', '4 years', '5 years', '6 years'],
      correctAnswer: '5 years'
    },
    {
      question: 'What unit is used for UK carbon conversion factors?',
      options: ['kgCO₂/kWh', 'kgCO₂e/kWh', 'tCO₂/MWh', 'gCO₂/Wh'],
      correctAnswer: 'kgCO₂e/kWh'
    },
    {
      question: 'Which section of an energy audit report should contain the methodology used?',
      options: ['Executive summary', 'Introduction and scope', 'Analysis section', 'Appendices'],
      correctAnswer: 'Introduction and scope'
    },
    {
      question: 'What percentage of total energy consumption typically needs to be covered by sub-metering for a Type 2 audit?',
      options: ['50%', '70%', '80%', '90%'],
      correctAnswer: '90%'
    },
    {
      question: 'In energy balance calculations, what should input energy equal?',
      options: ['Useful output only', 'Losses only', 'Useful output plus losses', 'Demand minus supply'],
      correctAnswer: 'Useful output plus losses'
    },
    {
      question: 'What is the recommended maximum payback period for "quick win" energy measures?',
      options: ['1 year', '2 years', '3 years', '5 years'],
      correctAnswer: '2 years'
    }
  ];

  const faqs = [
    {
      question: 'What is the difference between location-based and market-based carbon reporting?',
      answer: 'Location-based reporting uses average grid emission factors for your region (e.g., UK grid average of 0.207 kgCO₂e/kWh). Market-based reporting reflects the specific electricity you have contracted, such as renewable energy tariffs (which can claim zero emissions) or Renewable Energy Guarantees of Origin (REGOs). For UK audits, you should report both methods. Location-based shows your physical impact on the grid, while market-based reflects your purchasing decisions. SECR (Streamlined Energy and Carbon Reporting) requires at least location-based reporting.'
    },
    {
      question: 'How do I calculate the carbon savings from an energy efficiency measure?',
      answer: 'Carbon savings = Energy savings (kWh) × Carbon conversion factor (kgCO₂e/kWh). For electricity, use the current DESNZ grid factor (approximately 0.207 kgCO₂e/kWh for 2023/24). For gas, use 0.183 kgCO₂e/kWh (gross CV). Remember to include transmission and distribution losses for electricity (add approximately 8% to consumption). For future projections, consider that grid carbon intensity is decreasing as renewables increase - DESNZ provides projected factors for business case calculations.'
    },
    {
      question: 'What financial metrics should I include in an energy audit report?',
      answer: 'Include multiple metrics to suit different decision-makers: Simple Payback Period (years to recover investment), Return on Investment (ROI as percentage), Net Present Value (NPV - accounting for time value of money), Internal Rate of Return (IRR - the discount rate at which NPV equals zero), and Lifecycle Cost Analysis. For public sector clients, also consider the HM Treasury Green Book discount rate (currently 3.5% for projects under 30 years). Present costs in current prices and state all assumptions about energy price inflation.'
    },
    {
      question: 'How should recommendations be prioritised in an audit report?',
      answer: 'Use a structured prioritisation matrix considering: 1) Energy/carbon savings potential (high/medium/low), 2) Capital cost and payback period, 3) Implementation complexity and disruption, 4) Co-benefits (comfort, maintenance, compliance), and 5) Risk factors. Group recommendations into: Quick Wins (low cost, <2 year payback), Medium-term measures (moderate cost, 2-5 year payback), and Strategic investments (higher cost, >5 year payback but significant long-term benefits). Always present a "do nothing" baseline scenario for comparison.'
    },
    {
      question: 'What should be included in the appendices of an energy audit report?',
      answer: 'Appendices should contain: detailed energy consumption data and analysis, equipment schedules and specifications, measurement and monitoring data logs, calculation methodologies and assumptions, photographs of key equipment and issues identified, relevant drawings and schematics, calibration certificates for monitoring equipment, staff interview summaries, benchmarking data sources, carbon conversion factors used (with source and date), and financial calculation spreadsheets. This supporting evidence validates your findings while keeping the main report accessible.'
    },
    {
      question: 'How do I present audit findings to non-technical stakeholders?',
      answer: 'Focus on business outcomes rather than technical details: lead with potential savings in pounds and tonnes CO₂, use visual aids like Sankey diagrams and comparison charts, relate findings to their business objectives (cost reduction, sustainability targets, compliance), provide clear next steps with timelines, and offer tiered options (minimum/recommended/optimal). Avoid jargon - explain terms like "payback" and "kWh" if needed. Use analogies (e.g., "equivalent to X homes\' annual electricity use"). Prepare a one-page summary with key numbers that can be shared with board members or finance teams.'
    }
  ];

  return (
    <div className="bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild className="text-white hover:text-elec-yellow hover:bg-transparent p-2">
            <Link to="/electrician/upskilling/energy-efficiency-module-3">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="flex-1 min-w-0">
            <p className="text-elec-yellow text-sm font-medium">Module 3 • Section 5</p>
            <h1 className="text-white font-semibold truncate">Audit Reports and Cost/Carbon Breakdown</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-12">
        {/* Quick Summary */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li>• BS EN 16247 defines audit report structure</li>
              <li>• UK grid factor: 0.207 kgCO₂e/kWh</li>
              <li>• Simple payback = Cost ÷ Annual Saving</li>
              <li>• Present findings in business terms</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-white/5 border-l-2 border-white/30">
            <p className="text-white/80 text-sm font-medium mb-2">You Will Learn</p>
            <ul className="text-sm text-white/70 space-y-1">
              <li>• BS EN 16247 report requirements</li>
              <li>• Create energy balance diagrams</li>
              <li>• Calculate carbon footprints</li>
              <li>• Perform cost-benefit analysis</li>
            </ul>
          </div>
        </div>

        {/* Section 1: BS EN 16247 Report Requirements */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            BS EN 16247 Report Requirements
          </h2>

          <div className="bg-white/5 rounded-lg p-6 space-y-4">
            <div className="flex items-start gap-3">
              <FileText className="w-6 h-6 text-elec-yellow mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-white mb-2">Understanding the Standard</h3>
                <p className="text-white leading-relaxed">
                  BS EN 16247 is the European standard that defines requirements for energy audits. Part 1 covers
                  general requirements, while parts 2-5 address specific sectors. All compliant audit reports
                  must follow a defined structure.
                </p>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-elec-yellow mb-3 flex items-center gap-2">
                <ClipboardCheck className="w-5 h-5" />
                Mandatory Report Elements
              </h4>
              <div className="space-y-3">
                <div className="border-l-2 border-elec-yellow pl-4">
                  <p className="font-medium text-white">Executive Summary</p>
                  <p className="text-white/70 text-sm">Ranked recommendations with savings estimates, investment costs, and key findings</p>
                </div>
                <div className="border-l-2 border-blue-400 pl-4">
                  <p className="font-medium text-white">Background and Scope</p>
                  <p className="text-white/70 text-sm">Audit objectives, boundaries, methodology, data sources, and limitations</p>
                </div>
                <div className="border-l-2 border-green-400 pl-4">
                  <p className="font-medium text-white">Description of Audited Object</p>
                  <p className="text-white/70 text-sm">Building/process characteristics, operating patterns, energy systems overview</p>
                </div>
                <div className="border-l-2 border-purple-400 pl-4">
                  <p className="font-medium text-white">Energy Analysis</p>
                  <p className="text-white/70 text-sm">Consumption breakdown, energy balance, benchmarking, significant energy uses</p>
                </div>
                <div className="border-l-2 border-orange-400 pl-4">
                  <p className="font-medium text-white">Improvement Opportunities</p>
                  <p className="text-white/70 text-sm">Detailed recommendations with technical specifications, costs, and savings</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-blue-400 mb-1">ESOS Compliance Note</h4>
                  <p className="text-white text-sm">
                    For ESOS (Energy Savings Opportunity Scheme) compliance, audits must be conducted by
                    a Lead Assessor registered with an approved register. Reports must cover at least 90%
                    of the organisation's total energy consumption and be signed off by a board-level director.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-white mb-3">Report Quality Checklist</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2 text-white">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span>Clear audit objectives stated</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span>Boundaries and exclusions defined</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span>Data sources and dates recorded</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span>Measurement accuracy stated</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span>Assumptions clearly documented</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span>Recommendations prioritised</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Executive Summary Writing */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Executive Summary Writing for Decision Makers
          </h2>

          <div className="bg-white/5 rounded-lg p-6 space-y-4">
            <div className="flex items-start gap-3">
              <Users className="w-6 h-6 text-elec-yellow mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-white mb-2">Writing for Your Audience</h3>
                <p className="text-white leading-relaxed">
                  The executive summary is often the only section read by senior decision-makers. It must
                  communicate the business case clearly within 1-2 pages, enabling investment decisions
                  without reading the full report.
                </p>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-elec-yellow mb-3">Executive Summary Structure</h4>
              <div className="space-y-4">
                <div className="bg-white/5 rounded p-3">
                  <p className="font-medium text-white mb-2">1. Key Findings (2-3 sentences)</p>
                  <p className="text-white/70 text-sm italic">
                    "The audit identified annual energy costs of £245,000 with potential savings of
                    £52,000 (21%). Implementation of all recommendations would reduce carbon emissions
                    by 89 tonnes CO₂e annually."
                  </p>
                </div>
                <div className="bg-white/5 rounded p-3">
                  <p className="font-medium text-white mb-2">2. Summary Savings Table</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/20">
                          <th className="text-left py-2 text-elec-yellow">Category</th>
                          <th className="text-right py-2 text-elec-yellow">Saving</th>
                          <th className="text-right py-2 text-elec-yellow">Cost</th>
                          <th className="text-right py-2 text-elec-yellow">Payback</th>
                        </tr>
                      </thead>
                      <tbody className="text-white">
                        <tr className="border-b border-white/10">
                          <td className="py-2">Quick Wins</td>
                          <td className="text-right">£12,000/yr</td>
                          <td className="text-right">£8,000</td>
                          <td className="text-right">0.7 yrs</td>
                        </tr>
                        <tr className="border-b border-white/10">
                          <td className="py-2">Medium-term</td>
                          <td className="text-right">£28,000/yr</td>
                          <td className="text-right">£85,000</td>
                          <td className="text-right">3.0 yrs</td>
                        </tr>
                        <tr>
                          <td className="py-2">Strategic</td>
                          <td className="text-right">£12,000/yr</td>
                          <td className="text-right">£120,000</td>
                          <td className="text-right">10.0 yrs</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4">
              <h4 className="font-medium text-green-400 mb-2">Writing Tips</h4>
              <ul className="text-white text-sm space-y-1">
                <li>• Lead with the total savings opportunity - the headline number</li>
                <li>• Use pounds, not kilowatt-hours, as the primary metric</li>
                <li>• Include carbon savings for sustainability-focused organisations</li>
                <li>• Avoid technical jargon - explain in business terms</li>
                <li>• Make it scannable with bullet points and tables</li>
              </ul>
            </div>
          </div>

          {/* Quick Check 1 */}
          <InlineCheck
            id={quickCheckQuestions[0].id}
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
        </section>

        {/* Section 3: Energy Balance and Sankey Diagrams */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Energy Balance and Sankey Diagrams
          </h2>

          <div className="bg-white/5 rounded-lg p-6 space-y-4">
            <div className="flex items-start gap-3">
              <BarChart3 className="w-6 h-6 text-elec-yellow mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-white mb-2">Understanding Energy Balance</h3>
                <p className="text-white leading-relaxed">
                  An energy balance accounts for all energy entering and leaving a system. The fundamental
                  principle: <strong>Energy In = Useful Output + Losses</strong>. Any discrepancy indicates
                  measurement errors or unaccounted loads.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-medium text-green-400 mb-2">Energy Inputs</h4>
                <ul className="text-white text-sm space-y-1">
                  <li>• Grid electricity (kWh)</li>
                  <li>• Natural gas (kWh)</li>
                  <li>• Oil/LPG (litres → kWh)</li>
                  <li>• On-site generation (solar PV, CHP)</li>
                  <li>• District heating/cooling</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-medium text-orange-400 mb-2">Energy Outputs & Losses</h4>
                <ul className="text-white text-sm space-y-1">
                  <li>• Space heating (useful)</li>
                  <li>• Lighting (useful)</li>
                  <li>• Process energy (useful)</li>
                  <li>• Fabric heat losses</li>
                  <li>• Ventilation losses</li>
                </ul>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-elec-yellow mb-3">Understanding Sankey Diagrams</h4>
              <p className="text-white/70 text-sm mb-4">
                Sankey diagrams visualise energy flows where the width of each arrow is proportional
                to the energy quantity. They immediately show where the biggest losses occur.
              </p>
              <div className="bg-white/10 rounded p-3 font-mono text-xs text-white overflow-x-auto">
                <pre>{`Gas (500,000 kWh) ─────┬───► Boiler ───┬──► Space Heating (350,000 kWh)
                       │              └──► Flue Losses (100,000 kWh)
                       └──────────────────► Standing Losses (50,000 kWh)

Elec (200,000 kWh) ────┬───► Lighting (60,000 kWh)
                       ├───► HVAC (80,000 kWh)
                       ├───► Equipment (40,000 kWh)
                       └───► Small Power (20,000 kWh)`}</pre>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-white mb-3">Energy Balance Calculation Example</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-white">
                  <span className="text-white/70">Electricity from meter:</span>
                  <span>200,000 kWh</span>
                </div>
                <div className="flex justify-between text-white">
                  <span className="text-white/70">Sub-metered loads total:</span>
                  <span>185,000 kWh</span>
                </div>
                <div className="border-t border-white/20 pt-2 flex justify-between">
                  <span className="text-white/70">Unaccounted load:</span>
                  <span className="text-orange-400">15,000 kWh (7.5%)</span>
                </div>
                <p className="text-white/60 text-xs italic mt-2">
                  Unaccounted loads above 10% require investigation - possible unmeasured equipment,
                  meter errors, or energy theft
                </p>
              </div>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <h4 className="font-medium text-purple-400 mb-2">Tools for Creating Sankey Diagrams</h4>
              <ul className="text-white text-sm space-y-1">
                <li>• <strong>SankeyMATIC</strong> - Free online tool, simple interface</li>
                <li>• <strong>e!Sankey</strong> - Professional software with templates</li>
                <li>• <strong>Microsoft Visio</strong> - Using flow diagram shapes</li>
                <li>• <strong>Excel/Google Sheets</strong> - With stacked bar chart workaround</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: Carbon Footprint Calculations */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Carbon Footprint Calculations (UK Grid Factors)
          </h2>

          <div className="bg-white/5 rounded-lg p-6 space-y-4">
            <div className="flex items-start gap-3">
              <Leaf className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-white mb-2">DESNZ GHG Conversion Factors</h3>
                <p className="text-white leading-relaxed">
                  Carbon calculations in the UK use DESNZ GHG Conversion Factors (formerly BEIS),
                  updated annually. These factors express carbon dioxide equivalent (CO₂e) emissions
                  per unit of energy consumed.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-2 text-elec-yellow">Fuel Type</th>
                    <th className="text-right py-2 text-elec-yellow">Factor</th>
                    <th className="text-right py-2 text-elec-yellow">Unit</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/10">
                    <td className="py-2">Grid Electricity (location-based)</td>
                    <td className="text-right font-mono">0.207</td>
                    <td className="text-right">kgCO₂e/kWh</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2">Natural Gas</td>
                    <td className="text-right font-mono">0.183</td>
                    <td className="text-right">kgCO₂e/kWh</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2">Gas Oil (red diesel)</td>
                    <td className="text-right font-mono">0.257</td>
                    <td className="text-right">kgCO₂e/kWh</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2">LPG</td>
                    <td className="text-right font-mono">0.214</td>
                    <td className="text-right">kgCO₂e/kWh</td>
                  </tr>
                  <tr>
                    <td className="py-2">T&D Losses (electricity)</td>
                    <td className="text-right font-mono">0.018</td>
                    <td className="text-right">kgCO₂e/kWh</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-white/60 text-xs">
              * Always check for latest factors at gov.uk - these decrease annually as the grid decarbonises
            </p>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-elec-yellow mb-3">Carbon Calculation Example</h4>
              <p className="text-white/70 text-sm mb-3">Building annual consumption:</p>
              <div className="space-y-2 text-sm">
                <div className="grid grid-cols-4 gap-2 text-white/70 border-b border-white/10 pb-2">
                  <span>Fuel</span>
                  <span className="text-right">Consumption</span>
                  <span className="text-right">Factor</span>
                  <span className="text-right">CO₂e</span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-white">
                  <span>Electricity</span>
                  <span className="text-right">150,000 kWh</span>
                  <span className="text-right">× 0.207</span>
                  <span className="text-right text-green-400">31.05 t</span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-white">
                  <span>+ T&D losses</span>
                  <span className="text-right">150,000 kWh</span>
                  <span className="text-right">× 0.018</span>
                  <span className="text-right text-green-400">2.70 t</span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-white">
                  <span>Natural Gas</span>
                  <span className="text-right">400,000 kWh</span>
                  <span className="text-right">× 0.183</span>
                  <span className="text-right text-green-400">73.20 t</span>
                </div>
                <div className="grid grid-cols-4 gap-2 border-t border-white/20 pt-2 font-semibold text-white">
                  <span>Total</span>
                  <span></span>
                  <span></span>
                  <span className="text-right text-elec-yellow">106.95 t CO₂e</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-blue-400 mb-1">Scope 1, 2, and 3 Emissions</h4>
                  <div className="text-white text-sm space-y-1">
                    <p><strong>Scope 1:</strong> Direct emissions from owned/controlled sources (on-site gas, vehicles)</p>
                    <p><strong>Scope 2:</strong> Indirect emissions from purchased electricity, heat, steam</p>
                    <p><strong>Scope 3:</strong> All other indirect emissions in the value chain</p>
                    <p className="text-white/60 italic mt-2">Energy audits typically focus on Scope 1 and 2 emissions as these are directly controllable.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Check 2 */}
          <InlineCheck
            id={quickCheckQuestions[1].id}
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
        </section>

        {/* Section 5: Cost-Benefit Analysis */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Cost-Benefit Analysis and Payback Calculations
          </h2>

          <div className="bg-white/5 rounded-lg p-6 space-y-4">
            <div className="flex items-start gap-3">
              <Calculator className="w-6 h-6 text-elec-yellow mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-white mb-2">Key Financial Metrics</h3>
                <p className="text-white leading-relaxed">
                  Financial analysis is crucial for securing investment in energy efficiency. Different
                  stakeholders prefer different metrics - always present multiple financial indicators
                  to suit finance directors, operations managers, and sustainability teams.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-medium text-white mb-2">Simple Payback Period</h4>
                <div className="bg-white/10 rounded p-3 mb-2">
                  <code className="text-elec-yellow">Payback (years) = Capital Cost (£) ÷ Annual Savings (£/year)</code>
                </div>
                <p className="text-white/70 text-sm">
                  Quick to calculate but ignores time value of money and savings beyond payback period
                </p>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-medium text-white mb-2">Return on Investment (ROI)</h4>
                <div className="bg-white/10 rounded p-3 mb-2">
                  <code className="text-elec-yellow">ROI (%) = (Annual Savings ÷ Capital Cost) × 100</code>
                </div>
                <p className="text-white/70 text-sm">
                  Expressed as percentage - easy to compare with other investments
                </p>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-medium text-white mb-2">Net Present Value (NPV)</h4>
                <div className="bg-white/10 rounded p-3 mb-2">
                  <code className="text-elec-yellow text-sm">NPV = Σ [Cash Flow / (1 + r)^n] - Initial Investment</code>
                </div>
                <p className="text-white/70 text-sm">
                  Accounts for time value of money using discount rate (r). Positive NPV = good investment.
                  HM Treasury Green Book recommends 3.5% for public sector projects under 30 years.
                </p>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-medium text-white mb-2">Internal Rate of Return (IRR)</h4>
                <p className="text-white/70 text-sm">
                  The discount rate at which NPV equals zero. Higher IRR = better investment.
                  Compare against organisation's hurdle rate (minimum acceptable return).
                </p>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-elec-yellow mb-3 flex items-center gap-2">
                <PoundSterling className="w-5 h-5" />
                Worked Example: LED Lighting Upgrade
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-white mb-2">Project Details</p>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>Capital cost: £25,000</li>
                    <li>Energy saving: 45,000 kWh/year</li>
                    <li>Electricity price: £0.25/kWh</li>
                    <li>Annual cost saving: £11,250</li>
                    <li>Maintenance saving: £1,500/year</li>
                    <li>Expected life: 10 years</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-2">Calculations</p>
                  <ul className="text-sm space-y-1">
                    <li className="text-white">Total annual saving: £12,750</li>
                    <li className="text-elec-yellow">Simple payback: 2.0 years</li>
                    <li className="text-elec-yellow">ROI: 51%</li>
                    <li className="text-green-400">Carbon saving: 9.3 tCO₂e/year</li>
                    <li className="text-green-400">10-year saving: £127,500</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <TrendingUp className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-orange-400 mb-1">Energy Price Assumptions</h4>
                  <p className="text-white text-sm">
                    Always state your energy price assumptions clearly. Consider presenting scenarios:
                    Conservative (prices held flat), Central (3-5% annual increase), High (7-10% increase).
                    Higher future energy prices improve the business case for efficiency measures.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Check 3 */}
          <InlineCheck
            id={quickCheckQuestions[2].id}
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
        </section>

        {/* Section 6: Professional Report Presentation */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Professional Report Presentation and Delivery
          </h2>

          <div className="bg-white/5 rounded-lg p-6 space-y-4">
            <div className="flex items-start gap-3">
              <Presentation className="w-6 h-6 text-elec-yellow mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-white mb-2">Effective Presentation</h3>
                <p className="text-white leading-relaxed">
                  The most thorough audit is worthless if recommendations aren't implemented.
                  Professional presentation and delivery significantly increases the likelihood
                  of action being taken.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="border-l-2 border-elec-yellow pl-4">
                <h4 className="font-medium text-white">Tailor to Your Audience</h4>
                <ul className="text-white/70 text-sm mt-2 space-y-1">
                  <li>• <strong className="text-white">Board/Finance:</strong> Focus on ROI, payback, risk mitigation</li>
                  <li>• <strong className="text-white">Operations:</strong> Focus on implementation practicalities, disruption</li>
                  <li>• <strong className="text-white">Sustainability:</strong> Focus on carbon savings, compliance, targets</li>
                  <li>• <strong className="text-white">Technical:</strong> Detailed specifications, performance data</li>
                </ul>
              </div>

              <div className="border-l-2 border-blue-400 pl-4">
                <h4 className="font-medium text-white">Visual Communication</h4>
                <ul className="text-white/70 text-sm mt-2 space-y-1">
                  <li>• Use graphs and charts rather than tables of numbers</li>
                  <li>• Include photographs of issues found</li>
                  <li>• Show before/after comparisons where possible</li>
                  <li>• Use Sankey diagrams to show energy flows</li>
                </ul>
              </div>

              <div className="border-l-2 border-green-400 pl-4">
                <h4 className="font-medium text-white">Actionable Recommendations Format</h4>
                <div className="bg-white/5 rounded p-3 mt-2 text-sm">
                  <p className="font-medium text-elec-yellow">Recommendation 1: LED Lighting Upgrade</p>
                  <div className="mt-2 space-y-1 text-white/70">
                    <p><strong className="text-white">What:</strong> Replace T8 fluorescents with LED panels</p>
                    <p><strong className="text-white">Why:</strong> High energy use, poor light quality</p>
                    <p><strong className="text-white">Savings:</strong> £11,250/year + £1,500 maintenance</p>
                    <p><strong className="text-white">Cost:</strong> £25,000 installed</p>
                    <p><strong className="text-white">Payback:</strong> 2.0 years</p>
                    <p><strong className="text-white">Next step:</strong> Obtain 3 quotes from approved contractors</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-medium text-green-400 mb-2">Do</h4>
                <ul className="text-white text-sm space-y-1">
                  <li>✓ Schedule a face-to-face presentation</li>
                  <li>✓ Prepare a slide deck summary (10-15 slides)</li>
                  <li>✓ Bring hard copies of the full report</li>
                  <li>✓ Allow time for questions</li>
                  <li>✓ Offer to attend implementation meetings</li>
                  <li>✓ Provide a clear follow-up timeline</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-medium text-red-400 mb-2">Don't</h4>
                <ul className="text-white text-sm space-y-1">
                  <li>✗ Just email the report without context</li>
                  <li>✗ Use excessive technical jargon</li>
                  <li>✗ Present only problems without solutions</li>
                  <li>✗ Overwhelm with too many recommendations</li>
                  <li>✗ Forget to prioritise actions</li>
                  <li>✗ Omit next steps and responsibilities</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-elec-yellow" />
            <h2 className="text-xl font-semibold text-white">Quick Reference Card</h2>
          </div>

          <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-lg border border-elec-yellow/30 p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  UK Carbon Factors (2023/24)
                </h4>
                <ul className="text-sm text-white space-y-1">
                  <li>Electricity: 0.207 kgCO₂e/kWh</li>
                  <li>Natural Gas: 0.183 kgCO₂e/kWh</li>
                  <li>T&D Losses: 0.018 kgCO₂e/kWh</li>
                  <li>Gas Oil: 0.257 kgCO₂e/kWh</li>
                  <li>LPG: 0.214 kgCO₂e/kWh</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                  <Calculator className="w-4 h-4" />
                  Financial Formulas
                </h4>
                <ul className="text-sm text-white space-y-1">
                  <li>Payback = Cost ÷ Annual Saving</li>
                  <li>ROI = (Saving ÷ Cost) × 100%</li>
                  <li>Carbon = kWh × Factor</li>
                  <li>Discount rate (public): 3.5%</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                  <ClipboardCheck className="w-4 h-4" />
                  BS EN 16247 Report Sections
                </h4>
                <ul className="text-sm text-white space-y-1">
                  <li>1. Executive summary</li>
                  <li>2. Background & scope</li>
                  <li>3. Description of object</li>
                  <li>4. Energy analysis</li>
                  <li>5. Recommendations</li>
                  <li>6. Appendices</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Priority Categories
                </h4>
                <ul className="text-sm text-white space-y-1">
                  <li>Quick Wins: &lt;2 year payback</li>
                  <li>Medium-term: 2-5 year payback</li>
                  <li>Strategic: &gt;5 year payback</li>
                  <li>No-cost: Behavioural changes</li>
                </ul>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/20">
              <h4 className="font-semibold text-white mb-2">Key Sources</h4>
              <ul className="text-sm text-white/80 space-y-1">
                <li>• DESNZ GHG Conversion Factors: gov.uk</li>
                <li>• BS EN 16247 Parts 1-5: Energy audits standard</li>
                <li>• CIBSE TM54: Evaluating operational energy use</li>
                <li>• HM Treasury Green Book: Appraisal guidance</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <FileBarChart className="w-6 h-6 text-elec-yellow" />
            Section Quiz
          </h2>
          <Quiz questions={quizQuestions} />
        </section>

        {/* FAQs */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-elec-yellow" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white/5 rounded-lg overflow-hidden"
              >
                <div className="p-4">
                  <h3 className="font-medium text-white mb-2">{faq.question}</h3>
                  <p className="text-white/80 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Module Completion */}
        <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            <span className="font-medium text-green-400">Module 3 Complete!</span>
          </div>
          <p className="text-white text-sm">
            Congratulations! You have completed Module 3: Energy Auditing Methodology.
            Continue to Module 4 to learn about implementation and verification.
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row gap-4 justify-between pt-6 border-t border-white/10">
          <Button asChild variant="outline" className="min-h-[44px] touch-manipulation border-white/20 hover:border-elec-yellow hover:text-elec-yellow bg-transparent text-white">
            <Link to="../section-4" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Previous: Tools and Software</span>
            </Link>
          </Button>
          <Button asChild className="min-h-[44px] touch-manipulation bg-elec-yellow text-black hover:bg-elec-yellow/90">
            <Link to="../../module-4" className="flex items-center gap-2">
              <span>Next: Module 4 - Implementation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default EnergyEfficiencyModule3Section5;
