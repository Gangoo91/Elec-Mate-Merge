import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';
import {
  ArrowLeft,
  ArrowRight,
  LayoutDashboard,
  Cloud,
  Server,
  BarChart3,
  Users,
  Shield,
  Smartphone,
  RefreshCw,
  Zap,
  TrendingUp,
  AlertTriangle,
  Target,
  Eye,
  Settings,
  Database,
  Globe,
  Lock,
  BookOpen,
  Lightbulb,
  Building2,
  Gauge,
  PieChart,
  LineChart
} from 'lucide-react';

const EnergyEfficiencyModule5Section2: React.FC = () => {
  useSEO({
    title: 'Energy Dashboards and Cloud Portals | Energy Efficiency Module 5 Section 2 | Elec-Mate',
    description: 'Learn about energy management dashboards, cloud portals, KPIs, data visualisation, and UK platforms including Energy Elephant, ECON, and Stark. Professional upskilling for electricians.',
    keywords: 'energy dashboard, cloud portal, energy management, KPIs, Energy Elephant, ECON, Stark, data visualisation, UK energy platforms, building energy management'
  });

  const quickCheckQuestions = [
    {
      id: 'qc1',
      question: 'What is the recommended maximum data refresh rate for real-time energy dashboards in most commercial applications?',
      options: [
        'Every 1 second',
        'Every 15-30 seconds',
        'Every 5 minutes',
        'Every hour'
      ],
      correctIndex: 1,
      explanation: 'A 15-30 second refresh rate provides a good balance between real-time visibility and system performance. More frequent updates rarely add value for decision-making but significantly increase server load and data costs.'
    },
    {
      id: 'qc2',
      question: 'Which user role should typically have access to modify alarm thresholds and configure automated reports?',
      options: [
        'Viewer',
        'Operator',
        'Energy Manager',
        'All users'
      ],
      correctIndex: 2,
      explanation: 'Energy Managers require elevated access to configure alarm thresholds, set up automated reports, and adjust system parameters. Operators can acknowledge alarms and view data, while Viewers have read-only access to dashboards and reports.'
    },
    {
      id: 'qc3',
      question: 'When comparing cloud vs on-premise energy management platforms, which is typically a key advantage of cloud solutions?',
      options: [
        'Lower latency for real-time control',
        'No internet dependency',
        'Automatic updates and reduced IT overhead',
        'Complete data sovereignty'
      ],
      correctIndex: 2,
      explanation: 'Cloud platforms offer automatic software updates, reduced IT infrastructure requirements, and lower upfront costs. However, on-premise solutions provide better latency for real-time control and complete data sovereignty, which some organisations require.'
    }
  ];

  const quizQuestions = [
    {
      question: 'What is the primary purpose of an energy dashboard in building management?',
      options: [
        'To replace the building management system entirely',
        'To provide visual representation of energy consumption patterns and KPIs',
        'To automatically reduce energy consumption without human intervention',
        'To generate invoices for energy suppliers'
      ],
      correctAnswer: 'To provide visual representation of energy consumption patterns and KPIs'
    },
    {
      question: 'Which KPI measures the energy consumption per square metre of floor space?',
      options: [
        'Power Factor',
        'Peak Demand (kW)',
        'Energy Use Intensity (EUI)',
        'Carbon Intensity'
      ],
      correctAnswer: 'Energy Use Intensity (EUI)'
    },
    {
      question: 'Energy Elephant is a UK-based energy management platform primarily focused on:',
      options: [
        'Industrial process control only',
        'Multi-site portfolio management and sustainability reporting',
        'Residential smart home automation',
        'Grid-scale renewable energy trading'
      ],
      correctAnswer: 'Multi-site portfolio management and sustainability reporting'
    },
    {
      question: 'What does ECON Energy specialise in for UK commercial buildings?',
      options: [
        'Solar panel installation',
        'Automatic Meter Reading (AMR) and energy monitoring',
        'HVAC equipment manufacturing',
        'Electricity generation'
      ],
      correctAnswer: 'Automatic Meter Reading (AMR) and energy monitoring'
    },
    {
      question: 'When designing dashboard layouts, which principle ensures users can quickly identify critical information?',
      options: [
        'Maximising data density on every screen',
        'Using identical colours for all metrics',
        'Visual hierarchy with important KPIs prominently displayed',
        'Hiding navigation menus to increase screen space'
      ],
      correctAnswer: 'Visual hierarchy with important KPIs prominently displayed'
    },
    {
      question: 'What is a key consideration when implementing role-based access control (RBAC) on energy platforms?',
      options: [
        'All users should have administrator access for convenience',
        'Access levels should align with job responsibilities and data sensitivity',
        'Passwords should be shared among team members',
        'Only IT staff should have any access to energy data'
      ],
      correctAnswer: 'Access levels should align with job responsibilities and data sensitivity'
    },
    {
      question: 'Which data visualisation type is most appropriate for showing energy consumption trends over a 12-month period?',
      options: [
        'Pie chart',
        'Single number display',
        'Line chart or area chart',
        'Traffic light indicator'
      ],
      correctAnswer: 'Line chart or area chart'
    },
    {
      question: 'Stark Group provides energy management services in the UK with particular strength in:',
      options: [
        'Residential solar installations',
        'Bureau services including bill validation and procurement',
        'Electric vehicle charging networks',
        'Wind turbine maintenance'
      ],
      correctAnswer: 'Bureau services including bill validation and procurement'
    },
    {
      question: 'What is the typical data retention requirement for energy consumption data under UK regulations for large organisations?',
      options: [
        '30 days',
        '6 months',
        '2-7 years depending on reporting requirements',
        'No retention requirement exists'
      ],
      correctAnswer: '2-7 years depending on reporting requirements'
    },
    {
      question: 'Which feature is essential for mobile access to energy dashboards?',
      options: [
        'Flash-based animations',
        'Responsive design that adapts to screen size',
        'Desktop-only viewing mode',
        'Mandatory landscape orientation'
      ],
      correctAnswer: 'Responsive design that adapts to screen size'
    }
  ];

  const faqs = [
    {
      question: 'How often should energy dashboard data be refreshed for optimal performance?',
      answer: 'For most commercial applications, a 15-30 second refresh rate provides adequate real-time visibility without overloading systems. Critical process monitoring may require 5-10 second updates, while trend analysis dashboards can refresh every 5-15 minutes. Consider that more frequent updates increase server load, data storage requirements, and potentially API costs for cloud platforms. Most UK energy management platforms allow configurable refresh rates per dashboard or widget.'
    },
    {
      question: 'What are the main differences between Energy Elephant, ECON, and Stark platforms?',
      answer: 'Energy Elephant excels at multi-site portfolio management with strong sustainability reporting features, making it ideal for organisations with numerous buildings requiring SECR or ESOS compliance. ECON Energy focuses on Automatic Meter Reading (AMR) with robust sub-metering and monitoring capabilities, particularly strong for industrial and manufacturing environments. Stark Group offers comprehensive bureau services including bill validation, procurement support, and energy management, making them suitable for organisations wanting a managed service approach rather than self-service software.'
    },
    {
      question: 'Should we choose cloud-based or on-premise energy management software?',
      answer: 'Cloud platforms suit most organisations due to lower upfront costs, automatic updates, reduced IT overhead, and anywhere access. Choose on-premise when you have strict data sovereignty requirements, need ultra-low latency for real-time control systems, have limited internet reliability, or operate in highly regulated industries requiring air-gapped systems. Many modern deployments use hybrid approaches with local data collection and cloud analytics. Consider that cloud solutions typically involve ongoing subscription costs while on-premise has higher initial investment but lower long-term costs.'
    },
    {
      question: 'What user roles should be configured on an energy management platform?',
      answer: 'Typical role structure includes: Viewer (read-only access to dashboards and reports), Operator (can acknowledge alarms and add comments), Energy Manager (configure alarms, create reports, manage targets), Administrator (full system access including user management and integrations), and Executive (summary dashboards and high-level reports only). Some platforms offer site-specific roles limiting users to particular buildings or meters. Always follow the principle of least privilege - users should only have access necessary for their job function.'
    },
    {
      question: 'What KPIs should appear on a building energy dashboard?',
      answer: 'Essential KPIs include: Total consumption (kWh) with comparison to previous period, Peak demand (kW) and time of occurrence, Energy Use Intensity (kWh/m2), Cost per day/week/month, Carbon emissions (kgCO2e), Power factor (for sites with reactive power charges), and Degree day normalised consumption. Advanced dashboards may include occupancy-adjusted metrics, renewable generation percentage, and target vs actual comparisons. Prioritise 5-7 key metrics on the main dashboard with drill-down capability for detailed analysis.'
    },
    {
      question: 'How do we ensure data security on cloud energy platforms?',
      answer: 'Key security measures include: Ensure the provider holds ISO 27001 certification and complies with UK GDPR. Use platforms with data centres in the UK or EU for data residency compliance. Implement strong authentication including multi-factor authentication (MFA) for all users. Review and configure role-based access control appropriately. Ensure data encryption both in transit (TLS 1.2+) and at rest. Establish clear data processing agreements and understand data ownership terms. Regular security audits and penetration testing should be part of the provider\'s practices.'
    }
  ];

  return (
    <div className="bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild className="text-white hover:text-elec-yellow hover:bg-transparent p-2">
            <Link to="/electrician/upskilling/energy-efficiency-module-5">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="flex-1 min-w-0">
            <h1 className="text-white font-medium truncate">Energy Dashboards and Cloud Portals</h1>
            <p className="text-white/60 text-sm">Module 5 - Section 2</p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-8">
        {/* Quick Summary */}
        <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
          <p className="text-white/90 leading-relaxed">
            Energy dashboards and cloud portals transform raw consumption data into actionable insights.
            This section covers dashboard design principles, key performance indicators (KPIs), cloud vs
            on-premise considerations, and an overview of popular UK energy management platforms including
            Energy Elephant, ECON, and Stark. Understanding these systems helps electricians support
            effective energy management implementations.
          </p>
        </div>

        {/* Section 1: Dashboard Design Principles */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            <LayoutDashboard className="w-5 h-5 text-elec-yellow" />
            Dashboard Design Principles for Energy Management
          </h2>

          <div className="space-y-4 text-white/80">
            <p>
              Effective energy dashboards transform raw consumption data into actionable insights.
              The design must balance comprehensive information with clarity and usability.
            </p>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h3 className="text-elec-yellow font-medium mb-3 flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Visual Hierarchy Principles
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">-</span>
                  <span><strong className="text-white">Primary Zone:</strong> Key KPIs and alerts at top or centre - users should see critical information within 3 seconds</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">-</span>
                  <span><strong className="text-white">Secondary Zone:</strong> Trend charts and comparisons - supporting context for primary metrics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">-</span>
                  <span><strong className="text-white">Tertiary Zone:</strong> Detailed data tables and drill-down options - for investigation and analysis</span>
                </li>
              </ul>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="text-green-400 font-medium mb-2">Good Practice</h4>
                <ul className="space-y-1 text-sm text-white/70">
                  <li>- 5-7 key metrics per screen maximum</li>
                  <li>- Consistent colour coding across all views</li>
                  <li>- Clear labels with units displayed</li>
                  <li>- Logical grouping by function or building</li>
                  <li>- White space to reduce cognitive load</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="text-red-400 font-medium mb-2">Common Mistakes</h4>
                <ul className="space-y-1 text-sm text-white/70">
                  <li>- Overcrowded screens with 20+ metrics</li>
                  <li>- Inconsistent scales on comparison charts</li>
                  <li>- Missing context (no targets/baselines)</li>
                  <li>- Excessive use of pie charts</li>
                  <li>- Auto-scrolling or animated elements</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="text-blue-400 font-medium mb-2 flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                Mobile-First Considerations
              </h4>
              <p className="text-sm text-white/80">
                With increasing mobile access, design dashboards responsively. Touch targets should be
                minimum 44x44 pixels. Consider creating separate mobile-optimised views showing only
                essential KPIs rather than scaling down desktop layouts. UK platforms like Energy Elephant
                and ECON offer dedicated mobile apps for field access.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Key Performance Indicators */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            <Target className="w-5 h-5 text-elec-yellow" />
            Key Performance Indicators (KPIs) to Display
          </h2>

          <div className="space-y-4 text-white/80">
            <p>
              Selecting the right KPIs ensures stakeholders receive relevant information for their
              decision-making needs. Different user groups require different metrics.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-3 px-4 text-elec-yellow">KPI</th>
                    <th className="text-left py-3 px-4 text-elec-yellow">Unit</th>
                    <th className="text-left py-3 px-4 text-elec-yellow">Primary Audience</th>
                    <th className="text-left py-3 px-4 text-elec-yellow">Update Frequency</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  <tr>
                    <td className="py-3 px-4 text-white">Total Consumption</td>
                    <td className="py-3 px-4 text-white/70">kWh</td>
                    <td className="py-3 px-4 text-white/70">All users</td>
                    <td className="py-3 px-4 text-white/70">15-30 seconds</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-white">Peak Demand</td>
                    <td className="py-3 px-4 text-white/70">kW</td>
                    <td className="py-3 px-4 text-white/70">Energy Manager</td>
                    <td className="py-3 px-4 text-white/70">Real-time</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-white">Energy Use Intensity (EUI)</td>
                    <td className="py-3 px-4 text-white/70">kWh/m2</td>
                    <td className="py-3 px-4 text-white/70">Executives, FM</td>
                    <td className="py-3 px-4 text-white/70">Daily</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-white">Cost to Date</td>
                    <td className="py-3 px-4 text-white/70">GBP</td>
                    <td className="py-3 px-4 text-white/70">Finance, Executives</td>
                    <td className="py-3 px-4 text-white/70">Daily</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-white">Carbon Emissions</td>
                    <td className="py-3 px-4 text-white/70">kgCO2e</td>
                    <td className="py-3 px-4 text-white/70">Sustainability Team</td>
                    <td className="py-3 px-4 text-white/70">Daily</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-white">Power Factor</td>
                    <td className="py-3 px-4 text-white/70">ratio (0-1)</td>
                    <td className="py-3 px-4 text-white/70">Technical Staff</td>
                    <td className="py-3 px-4 text-white/70">15 minutes</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-white">Baseload</td>
                    <td className="py-3 px-4 text-white/70">kW</td>
                    <td className="py-3 px-4 text-white/70">Energy Manager</td>
                    <td className="py-3 px-4 text-white/70">Daily (overnight min)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h3 className="text-elec-yellow font-medium mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Contextual KPIs
              </h3>
              <p className="mb-3 text-white/80">
                Raw numbers mean little without context. Always display KPIs with:
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-white/5 rounded p-3 border border-white/10">
                  <span className="text-elec-yellow font-medium">Comparison to Target</span>
                  <p className="text-sm mt-1 text-white/70">Show percentage variance from budget or reduction target</p>
                </div>
                <div className="bg-white/5 rounded p-3 border border-white/10">
                  <span className="text-elec-yellow font-medium">Same Period Last Year</span>
                  <p className="text-sm mt-1 text-white/70">Year-on-year comparison accounting for seasonality</p>
                </div>
                <div className="bg-white/5 rounded p-3 border border-white/10">
                  <span className="text-elec-yellow font-medium">Degree Day Normalisation</span>
                  <p className="text-sm mt-1 text-white/70">Weather-adjusted consumption for fair comparison</p>
                </div>
                <div className="bg-white/5 rounded p-3 border border-white/10">
                  <span className="text-elec-yellow font-medium">Benchmark Comparison</span>
                  <p className="text-sm mt-1 text-white/70">Industry or portfolio averages for context</p>
                </div>
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

        {/* Section 3: Cloud vs On-Premise */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            <Cloud className="w-5 h-5 text-elec-yellow" />
            Cloud vs On-Premise Platform Considerations
          </h2>

          <div className="space-y-4 text-white/80">
            <p>
              The choice between cloud-hosted and on-premise energy management systems significantly
              impacts deployment, costs, and ongoing management requirements.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-4 border border-blue-500/30">
                <div className="flex items-center gap-2 mb-3">
                  <Cloud className="w-5 h-5 text-blue-400" />
                  <h3 className="text-blue-400 font-medium">Cloud Platform (SaaS)</h3>
                </div>
                <div className="space-y-2 text-sm text-white/70">
                  <p><span className="text-green-400">+</span> Lower upfront investment (OpEx model)</p>
                  <p><span className="text-green-400">+</span> Automatic updates and new features</p>
                  <p><span className="text-green-400">+</span> Access from anywhere with internet</p>
                  <p><span className="text-green-400">+</span> Scalable - add sites easily</p>
                  <p><span className="text-green-400">+</span> Reduced IT infrastructure needs</p>
                  <p><span className="text-red-400">-</span> Ongoing subscription costs</p>
                  <p><span className="text-red-400">-</span> Internet dependency</p>
                  <p><span className="text-red-400">-</span> Data sovereignty considerations</p>
                  <p><span className="text-red-400">-</span> Potential latency for real-time control</p>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-orange-500/30">
                <div className="flex items-center gap-2 mb-3">
                  <Server className="w-5 h-5 text-orange-400" />
                  <h3 className="text-orange-400 font-medium">On-Premise Platform</h3>
                </div>
                <div className="space-y-2 text-sm text-white/70">
                  <p><span className="text-green-400">+</span> Complete data sovereignty</p>
                  <p><span className="text-green-400">+</span> No internet dependency</p>
                  <p><span className="text-green-400">+</span> Lower latency for real-time control</p>
                  <p><span className="text-green-400">+</span> One-time licence (potentially lower TCO)</p>
                  <p><span className="text-green-400">+</span> Full customisation control</p>
                  <p><span className="text-red-400">-</span> Higher upfront costs (CapEx)</p>
                  <p><span className="text-red-400">-</span> IT infrastructure required</p>
                  <p><span className="text-red-400">-</span> Manual updates and maintenance</p>
                  <p><span className="text-red-400">-</span> Remote access requires VPN setup</p>
                </div>
              </div>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <h4 className="text-purple-400 font-medium mb-2 flex items-center gap-2">
                <Database className="w-5 h-5" />
                Hybrid Architecture
              </h4>
              <p className="text-sm text-white/80">
                Many modern deployments use hybrid approaches: local data loggers or edge devices collect
                and store data on-site, while cloud platforms provide analytics, reporting, and remote access.
                This provides resilience (local data storage if internet fails), reduced latency for critical
                monitoring, and the benefits of cloud-based analytics and accessibility. UK platforms like
                ECON typically support this architecture with their AMR hardware.
              </p>
            </div>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h3 className="text-elec-yellow font-medium mb-3">Decision Factors for UK Organisations</h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span><strong className="text-white">Data Protection:</strong> Ensure cloud providers comply with UK GDPR. Check if data centres are UK/EU-based.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span><strong className="text-white">Integration Needs:</strong> On-premise may be required for tight integration with legacy BMS systems.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span><strong className="text-white">Multi-Site Operations:</strong> Cloud platforms excel for portfolio management across multiple locations.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">-</span>
                  <span><strong className="text-white">Budget Structure:</strong> Cloud suits OpEx budgets; on-premise suits CapEx availability.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: Data Visualisation Best Practices */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            <BarChart3 className="w-5 h-5 text-elec-yellow" />
            Data Visualisation Best Practices
          </h2>

          <div className="space-y-4 text-white/80">
            <p>
              Choosing appropriate visualisation types ensures data is communicated effectively
              and users can quickly extract meaningful insights.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <LineChart className="w-5 h-5 text-elec-yellow" />
                  <h4 className="font-medium text-white">Line/Area Charts</h4>
                </div>
                <p className="text-sm mb-2 text-white/70">Best for showing trends over time</p>
                <ul className="text-xs text-white/60 space-y-1">
                  <li>- Consumption profiles (daily, weekly, monthly)</li>
                  <li>- Load curves and demand patterns</li>
                  <li>- Year-on-year comparisons</li>
                  <li>- Degree day correlations</li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="w-5 h-5 text-elec-yellow" />
                  <h4 className="font-medium text-white">Bar Charts</h4>
                </div>
                <p className="text-sm mb-2 text-white/70">Best for comparing categories</p>
                <ul className="text-xs text-white/60 space-y-1">
                  <li>- Site-by-site consumption comparison</li>
                  <li>- Monthly totals comparison</li>
                  <li>- Fuel type breakdown</li>
                  <li>- Target vs actual comparisons</li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <Gauge className="w-5 h-5 text-elec-yellow" />
                  <h4 className="font-medium text-white">Gauges/Dials</h4>
                </div>
                <p className="text-sm mb-2 text-white/70">Best for current status vs limits</p>
                <ul className="text-xs text-white/60 space-y-1">
                  <li>- Current demand vs maximum</li>
                  <li>- Power factor indication</li>
                  <li>- Progress towards targets</li>
                  <li>- Capacity utilisation</li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <PieChart className="w-5 h-5 text-elec-yellow" />
                  <h4 className="font-medium text-white">Pie/Donut Charts</h4>
                </div>
                <p className="text-sm mb-2 text-white/70">Limited use - part-to-whole only</p>
                <ul className="text-xs text-white/60 space-y-1">
                  <li>- End-use breakdown (lighting, HVAC, etc.)</li>
                  <li>- Fuel mix proportions</li>
                  <li>- Limit to 5-6 segments maximum</li>
                  <li>- Avoid for comparisons or trends</li>
                </ul>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <h4 className="text-amber-400 font-medium mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Colour Usage Guidelines
              </h4>
              <div className="grid md:grid-cols-3 gap-3 text-sm">
                <div>
                  <span className="text-green-400 font-medium">Green</span>
                  <p className="text-xs text-white/60">On target, normal operation, good performance</p>
                </div>
                <div>
                  <span className="text-amber-400 font-medium">Amber/Yellow</span>
                  <p className="text-xs text-white/60">Warning, approaching limits, attention needed</p>
                </div>
                <div>
                  <span className="text-red-400 font-medium">Red</span>
                  <p className="text-xs text-white/60">Alert, exceeded threshold, immediate action</p>
                </div>
              </div>
              <p className="text-xs text-white/60 mt-2">
                Ensure sufficient contrast and consider colour-blind users (approximately 8% of males).
                Use patterns or icons alongside colours where possible.
              </p>
            </div>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h3 className="text-elec-yellow font-medium mb-3 flex items-center gap-2">
                <RefreshCw className="w-5 h-5" />
                Data Refresh Rates by Use Case
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-white/80">Real-time monitoring displays</span>
                  <span className="text-elec-yellow">15-30 seconds</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-white/80">Process/production monitoring</span>
                  <span className="text-elec-yellow">5-15 seconds</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-white/80">Trend analysis dashboards</span>
                  <span className="text-elec-yellow">5-15 minutes</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-white/80">Management summary dashboards</span>
                  <span className="text-elec-yellow">Daily</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-white/80">Monthly reports</span>
                  <span className="text-elec-yellow">On demand / scheduled</span>
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

        {/* Section 5: User Roles and Access Management */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            <Users className="w-5 h-5 text-elec-yellow" />
            User Roles and Access Management
          </h2>

          <div className="space-y-4 text-white/80">
            <p>
              Implementing role-based access control (RBAC) ensures users see relevant information
              and prevents unauthorised configuration changes. This is essential for data security
              and system integrity.
            </p>

            <div className="space-y-3">
              <div className="bg-white/5 rounded-lg p-4 border-l-4 border-gray-500">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="w-5 h-5 text-white/60" />
                  <h4 className="font-medium text-white">Viewer</h4>
                </div>
                <p className="text-sm text-white/60 mb-2">Read-only access to assigned dashboards and reports</p>
                <ul className="text-xs text-white/50 grid grid-cols-2 gap-1">
                  <li>- View dashboards</li>
                  <li>- Download reports</li>
                  <li>- Export data (limited)</li>
                  <li>- View historical trends</li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border-l-4 border-blue-500">
                <div className="flex items-center gap-2 mb-2">
                  <Settings className="w-5 h-5 text-blue-400" />
                  <h4 className="font-medium text-white">Operator</h4>
                </div>
                <p className="text-sm text-white/60 mb-2">Day-to-day monitoring and alarm response</p>
                <ul className="text-xs text-white/50 grid grid-cols-2 gap-1">
                  <li>- All Viewer permissions</li>
                  <li>- Acknowledge alarms</li>
                  <li>- Add notes/comments</li>
                  <li>- Run ad-hoc reports</li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border-l-4 border-elec-yellow">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-elec-yellow" />
                  <h4 className="font-medium text-white">Energy Manager</h4>
                </div>
                <p className="text-sm text-white/60 mb-2">System configuration and analysis</p>
                <ul className="text-xs text-white/50 grid grid-cols-2 gap-1">
                  <li>- All Operator permissions</li>
                  <li>- Configure alarm thresholds</li>
                  <li>- Set targets and baselines</li>
                  <li>- Create/edit dashboards</li>
                  <li>- Schedule automated reports</li>
                  <li>- Manage meter configurations</li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border-l-4 border-red-500">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-red-400" />
                  <h4 className="font-medium text-white">Administrator</h4>
                </div>
                <p className="text-sm text-white/60 mb-2">Full system access and user management</p>
                <ul className="text-xs text-white/50 grid grid-cols-2 gap-1">
                  <li>- All Energy Manager permissions</li>
                  <li>- Create/manage user accounts</li>
                  <li>- Assign roles and permissions</li>
                  <li>- Configure integrations/APIs</li>
                  <li>- System settings and backup</li>
                  <li>- Audit log access</li>
                </ul>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <h4 className="text-green-400 font-medium mb-2 flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Security Best Practices
              </h4>
              <ul className="text-sm space-y-1 text-white/70">
                <li>- Implement multi-factor authentication (MFA) for all users</li>
                <li>- Apply principle of least privilege - minimum access required for role</li>
                <li>- Regular access reviews - remove leavers, audit permissions quarterly</li>
                <li>- Site-specific roles where users only need access to certain buildings</li>
                <li>- Session timeouts for inactive users (15-30 minutes recommended)</li>
                <li>- Audit logging of configuration changes and data exports</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 6: Popular UK Energy Management Platforms */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            <Globe className="w-5 h-5 text-elec-yellow" />
            Popular UK Energy Management Platforms
          </h2>

          <div className="space-y-4 text-white/80">
            <p>
              The UK has a mature market for energy management platforms, with several established
              providers offering different strengths and specialisations.
            </p>

            <div className="space-y-4">
              {/* Energy Elephant */}
              <div className="bg-white/5 rounded-lg p-4 border border-green-500/30">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-green-500/20 p-2 rounded-lg">
                    <Building2 className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-green-400">Energy Elephant</h3>
                    <p className="text-xs text-white/60">Cloud-based portfolio management</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="text-elec-yellow text-xs font-medium mb-1">KEY STRENGTHS</h4>
                    <ul className="space-y-1 text-white/60">
                      <li>- Multi-site portfolio management</li>
                      <li>- SECR and ESOS compliance reporting</li>
                      <li>- Automatic data collection from suppliers</li>
                      <li>- Carbon footprint tracking</li>
                      <li>- User-friendly interface</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-elec-yellow text-xs font-medium mb-1">BEST SUITED FOR</h4>
                    <ul className="space-y-1 text-white/60">
                      <li>- Organisations with multiple sites</li>
                      <li>- Sustainability reporting requirements</li>
                      <li>- Non-technical users</li>
                      <li>- Bill validation and cost tracking</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* ECON Energy */}
              <div className="bg-white/5 rounded-lg p-4 border border-blue-500/30">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-blue-500/20 p-2 rounded-lg">
                    <Gauge className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-blue-400">ECON Energy</h3>
                    <p className="text-xs text-white/60">AMR and sub-metering specialists</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="text-elec-yellow text-xs font-medium mb-1">KEY STRENGTHS</h4>
                    <ul className="space-y-1 text-white/60">
                      <li>- Automatic Meter Reading hardware</li>
                      <li>- Sub-metering and tenant billing</li>
                      <li>- Real-time monitoring capabilities</li>
                      <li>- Industrial and manufacturing focus</li>
                      <li>- Established UK presence since 1994</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-elec-yellow text-xs font-medium mb-1">BEST SUITED FOR</h4>
                    <ul className="space-y-1 text-white/60">
                      <li>- Sites requiring sub-metering</li>
                      <li>- Industrial/manufacturing facilities</li>
                      <li>- Landlords with tenant recharging</li>
                      <li>- Organisations wanting hardware + software</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Stark */}
              <div className="bg-white/5 rounded-lg p-4 border border-orange-500/30">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-orange-500/20 p-2 rounded-lg">
                    <Zap className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-orange-400">Stark Group</h3>
                    <p className="text-xs text-white/60">Bureau services and managed energy</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="text-elec-yellow text-xs font-medium mb-1">KEY STRENGTHS</h4>
                    <ul className="space-y-1 text-white/60">
                      <li>- Bill validation and processing</li>
                      <li>- Energy procurement support</li>
                      <li>- Bureau services (managed approach)</li>
                      <li>- Carbon reporting</li>
                      <li>- Large organisation experience</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-elec-yellow text-xs font-medium mb-1">BEST SUITED FOR</h4>
                    <ul className="space-y-1 text-white/60">
                      <li>- Organisations wanting managed service</li>
                      <li>- Complex multi-supplier billing</li>
                      <li>- Procurement and contract management</li>
                      <li>- Limited internal resource for energy management</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h3 className="text-elec-yellow font-medium mb-3">Other Notable UK Platforms</h3>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="font-medium text-white">Systemslink</span>
                  <p className="text-xs text-white/60">Bureau services and utility management</p>
                </div>
                <div>
                  <span className="font-medium text-white">Inspired Energy</span>
                  <p className="text-xs text-white/60">Procurement and optimisation services</p>
                </div>
                <div>
                  <span className="font-medium text-white">GridDuck</span>
                  <p className="text-xs text-white/60">IoT-focused monitoring for SMEs</p>
                </div>
                <div>
                  <span className="font-medium text-white">Schneider EcoStruxure</span>
                  <p className="text-xs text-white/60">Enterprise BMS integration</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="text-blue-400 font-medium mb-2 flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Platform Selection Guidance
              </h4>
              <p className="text-sm text-white/80">
                When selecting a platform, consider: number of sites, sub-metering requirements,
                internal technical capability, reporting obligations (SECR, ESOS), budget model
                (subscription vs capital), and integration requirements with existing BMS or ERP systems.
                Request demonstrations and reference sites from shortlisted vendors before committing.
              </p>
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
        <section className="bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 rounded-xl p-6 border border-elec-yellow/30">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-6 h-6 text-elec-yellow" />
            <h2 className="text-xl font-semibold text-elec-yellow">Quick Reference Card</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-white font-medium mb-2">Essential Dashboard KPIs</h3>
              <ul className="text-sm text-white/80 space-y-1">
                <li>- Total consumption (kWh) with period comparison</li>
                <li>- Peak demand (kW) and timing</li>
                <li>- Energy Use Intensity (kWh/m2)</li>
                <li>- Cost to date with budget variance</li>
                <li>- Carbon emissions (kgCO2e)</li>
                <li>- Power factor (for applicable sites)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-medium mb-2">Recommended Refresh Rates</h3>
              <ul className="text-sm text-white/80 space-y-1">
                <li>- Real-time monitoring: 15-30 seconds</li>
                <li>- Process monitoring: 5-15 seconds</li>
                <li>- Trend analysis: 5-15 minutes</li>
                <li>- Management dashboards: Daily</li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-medium mb-2">Platform Quick Comparison</h3>
              <ul className="text-sm text-white/80 space-y-1">
                <li>- <span className="text-green-400">Energy Elephant:</span> Portfolio and sustainability</li>
                <li>- <span className="text-blue-400">ECON:</span> AMR and sub-metering</li>
                <li>- <span className="text-orange-400">Stark:</span> Bureau and procurement</li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-medium mb-2">Security Checklist</h3>
              <ul className="text-sm text-white/80 space-y-1">
                <li>- Enable MFA for all users</li>
                <li>- Apply role-based access control</li>
                <li>- Check ISO 27001 certification</li>
                <li>- Verify UK/EU data residency</li>
                <li>- Review data retention policies</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-white/5 rounded-lg p-6 border border-white/10">
          <h2 className="text-xl font-semibold text-elec-yellow mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-white/10 pb-4 last:border-0 last:pb-0">
                <h3 className="font-medium text-white mb-2">{faq.question}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <section className="bg-white/5 rounded-lg p-6 border border-white/10">
          <h2 className="text-xl font-semibold text-elec-yellow mb-4">Section Quiz</h2>
          <p className="text-white/60 mb-6">
            Test your knowledge of energy dashboards and cloud portals with this 10-question quiz.
          </p>
          <Quiz questions={quizQuestions} moduleId="energy-efficiency-m5s2" />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-white/10">
          <Button variant="outline" asChild className="min-h-[44px] touch-manipulation bg-transparent border-white/20 text-white hover:bg-white/5 hover:border-elec-yellow">
            <Link to="../section-1">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Previous: Section 1
            </Link>
          </Button>
          <Button asChild className="min-h-[44px] touch-manipulation bg-elec-yellow text-black hover:bg-elec-yellow/90">
            <Link to="../section-3">
              Next: Section 3
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default EnergyEfficiencyModule5Section2;
