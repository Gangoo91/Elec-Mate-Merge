import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Quiz from '@/components/apprentice-courses/Quiz';
import InlineCheck from '@/components/apprentice-courses/InlineCheck';
import { useSEO } from '@/hooks/useSEO';
import {
  Bell,
  AlertTriangle,
  FileText,
  TrendingUp,
  BellOff,
  Brain,
  Wrench,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Zap,
  Settings,
  Activity,
  Shield,
  Clock,
  Target,
  Layers,
  CheckCircle2,
  AlertCircle,
  Info,
} from 'lucide-react';

const EnergyEfficiencyModule5Section3: React.FC = () => {
  const navigate = useNavigate();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  useSEO({
    title: 'Fault Alerts and Event Logging | Energy Efficiency Module 5 Section 3 | Elec-Mate',
    description:
      'Learn to configure meaningful alert thresholds, implement event logging for trend analysis, and integrate alerts with maintenance systems for electrical efficiency monitoring.',
    keywords:
      'fault alerts, event logging, alert thresholds, CMMS integration, predictive analytics, electrical monitoring, energy efficiency',
  });

  const quickCheckQuestions = [
    {
      id: 'qc1',
      question:
        'When setting alert thresholds for power factor on a motor, what statistical approach helps minimize false alarms while catching genuine issues?',
      options: [
        'Setting threshold at exactly the mean value',
        'Using mean plus 2-3 standard deviations from baseline',
        'Always using manufacturer specifications only',
        'Setting threshold at maximum recorded value',
      ],
      correctIndex: 1,
      explanation:
        'Using mean plus 2-3 standard deviations creates a threshold that accounts for normal variation while alerting on statistically significant deviations. This approach is based on actual operating data and reduces false positives while catching genuine anomalies.',
    },
    {
      id: 'qc2',
      question:
        'What is "alert fatigue" and why is it dangerous in electrical monitoring systems?',
      options: [
        'Physical tiredness from responding to too many alerts',
        'When operators ignore or disable alerts due to excessive false alarms',
        'System slowdown from processing too many events',
        'Battery drain in portable monitoring devices',
      ],
      correctIndex: 1,
      explanation:
        'Alert fatigue occurs when operators become desensitized to alerts due to excessive false alarms or non-actionable notifications. This is dangerous because critical alerts may be ignored or disabled, potentially leading to missed equipment failures, safety hazards, or energy waste.',
    },
    {
      id: 'qc3',
      question:
        'What information should be included in a well-structured event log entry for an electrical fault?',
      options: [
        'Only the time and date of the event',
        'Just the equipment name and fault type',
        'Timestamp, equipment ID, measured values, threshold exceeded, and recommended action',
        'The name of the operator on duty',
      ],
      correctIndex: 2,
      explanation:
        'A comprehensive event log entry should include timestamp, equipment identification, actual measured values, which threshold was exceeded, severity level, and recommended corrective action. This data enables trend analysis, root cause investigation, and informed maintenance decisions.',
    },
  ];

  const quizQuestions = [
    {
      question:
        'For a 100 kW motor with baseline current of 120A and standard deviation of 5A, what would be an appropriate warning threshold using the 2-sigma rule?',
      options: ['125A', '130A', '135A', '140A'],
      correctAnswer: '130A',
    },
    {
      question:
        'What is the primary purpose of alert escalation in electrical monitoring systems?',
      options: [
        'To increase the volume of all alerts',
        'To ensure critical issues reach appropriate personnel when initial responses fail',
        'To reduce the number of alerts generated',
        'To automatically fix all detected faults',
      ],
      correctAnswer:
        'To ensure critical issues reach appropriate personnel when initial responses fail',
    },
    {
      question:
        'Which type of event logging approach provides the most useful data for trend analysis?',
      options: [
        'Logging only when thresholds are exceeded',
        'Continuous logging at regular intervals with event-triggered detailed capture',
        'Manual logging by operators',
        'Logging only during business hours',
      ],
      correctAnswer:
        'Continuous logging at regular intervals with event-triggered detailed capture',
    },
    {
      question:
        'What is the recommended approach to avoid alert fatigue in energy monitoring systems?',
      options: [
        'Disable all non-critical alerts',
        'Send all alerts to a single person',
        'Implement tiered severity levels with appropriate routing and suppression rules',
        'Only check alerts once per week',
      ],
      correctAnswer:
        'Implement tiered severity levels with appropriate routing and suppression rules',
    },
    {
      question:
        'Predictive analytics in electrical monitoring primarily uses which technique to forecast failures?',
      options: [
        'Random sampling of equipment',
        'Machine learning algorithms analyzing historical patterns and trends',
        'Manual inspection schedules',
        'Fixed time-based replacement',
      ],
      correctAnswer:
        'Machine learning algorithms analyzing historical patterns and trends',
    },
    {
      question:
        'When integrating alerts with a CMMS (Computerized Maintenance Management System), what automatic action is most valuable?',
      options: [
        'Sending email notifications only',
        'Automatic work order generation with priority assignment',
        'Shutting down all equipment immediately',
        'Deleting old maintenance records',
      ],
      correctAnswer: 'Automatic work order generation with priority assignment',
    },
    {
      question:
        'What does "dead-band" or hysteresis in alert configuration prevent?',
      options: [
        'All alerts from being generated',
        'Rapid on-off cycling of alerts when values hover near threshold',
        'Equipment from being monitored',
        'Maintenance personnel from receiving notifications',
      ],
      correctAnswer:
        'Rapid on-off cycling of alerts when values hover near threshold',
    },
    {
      question:
        'For voltage monitoring on a 480V system, what percentage deviation typically warrants a critical alert?',
      options: [
        '±1%',
        '±3%',
        '±5%',
        '±10% or greater',
      ],
      correctAnswer: '±10% or greater',
    },
    {
      question:
        'What is the benefit of correlating multiple parameter alerts (e.g., current, temperature, vibration) on the same equipment?',
      options: [
        'It reduces the total number of sensors needed',
        'It helps identify root causes and distinguish real faults from sensor errors',
        'It eliminates the need for maintenance',
        'It makes the system less complex',
      ],
      correctAnswer:
        'It helps identify root causes and distinguish real faults from sensor errors',
    },
    {
      question:
        'What retention period is typically recommended for detailed electrical event logs in industrial facilities?',
      options: [
        '24 hours',
        '1 week',
        '1-3 years minimum, with summary data retained longer',
        'Logs should never be retained',
      ],
      correctAnswer: '1-3 years minimum, with summary data retained longer',
    },
  ];

  const faqs = [
    {
      question: 'How do I determine the right alert threshold for a new piece of equipment?',
      answer:
        'Start by establishing a baseline during normal operation - collect data for at least 2-4 weeks covering various operating conditions. Calculate the mean and standard deviation of key parameters. Set warning thresholds at mean + 2 standard deviations and critical thresholds at mean + 3 standard deviations. Compare with manufacturer specifications and adjust based on equipment criticality. Review and refine thresholds quarterly based on actual alert history and operator feedback.',
    },
    {
      question: 'What is the difference between event logging and data logging in energy monitoring?',
      answer:
        'Data logging continuously records measured values at regular intervals (e.g., every 15 minutes) regardless of whether anything unusual occurs - this creates trend data. Event logging specifically captures when something noteworthy happens: threshold exceedances, equipment state changes, operator actions, or system errors. Best practice combines both: continuous data logging at moderate intervals with detailed event logging triggered by specific conditions, capturing high-resolution data around events.',
    },
    {
      question: 'How can I reduce false alarms without missing real problems?',
      answer:
        'Implement multiple strategies: Use statistical thresholds based on actual operating data rather than arbitrary values. Add time delays so brief transients dont trigger alerts. Implement dead-bands to prevent cycling. Correlate multiple parameters before alerting. Use rate-of-change detection for gradual drift. Establish different thresholds for different operating modes. Review alert history monthly and adjust thresholds that generate excessive false positives. Consider machine learning for pattern-based anomaly detection.',
    },
    {
      question: 'What alerts should route directly to maintenance vs. operations?',
      answer:
        'Operations should receive alerts requiring immediate response: safety hazards, equipment trips, process impacts, and conditions requiring manual intervention. Maintenance receives alerts for degradation trends, preventive maintenance triggers, efficiency losses, and non-urgent equipment issues. Critical safety alerts should go to both simultaneously. Use escalation paths so unacknowledged alerts automatically route to supervisors. Consider time-of-day routing for after-hours coverage.',
    },
    {
      question: 'How do I integrate electrical monitoring alerts with our existing CMMS?',
      answer:
        'Most modern energy monitoring systems support standard integration methods: API connections (REST/SOAP), database links, file-based exchange (CSV/XML), or dedicated CMMS connectors. Map alert severity levels to work order priorities. Include equipment ID, fault description, measured values, and timestamp in the data exchange. Configure automatic work order creation for specific alert types. Ensure bi-directional updates so completed work orders update the monitoring system. Test integrations thoroughly before production deployment.',
    },
    {
      question: 'What is predictive analytics and do I need it for my facility?',
      answer:
        'Predictive analytics uses machine learning algorithms to analyze historical data patterns and forecast future equipment behavior, including potential failures. Its most valuable for facilities with critical equipment where unplanned downtime is costly, sufficient historical data (typically 6+ months), and resources to act on predictions. Start with simpler rule-based alerting and trend analysis. Consider predictive analytics when you have mastered basic monitoring and want to move from reactive to proactive maintenance strategies.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a] text-white">
      {/* Header */}
      <div className="bg-[#1a1a1a]/95 border-b border-gray-700">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <Bell className="w-8 h-8 text-elec-yellow" />
            <span className="text-elec-yellow text-sm font-medium">
              Module 5 - Section 3
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Fault Alerts and Event Logging
          </h1>
          <p className="text-gray-400">
            Configure intelligent alerting systems that catch real problems while avoiding alert
            fatigue, and implement comprehensive event logging for trend analysis and maintenance
            integration.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        {/* Section 1: Setting Up Meaningful Alert Thresholds */}
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow/20 p-2 rounded-lg">
              <Target className="w-6 h-6 text-elec-yellow" />
            </div>
            <h2 className="text-xl font-semibold text-white">
              1. Setting Up Meaningful Alert Thresholds
            </h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Effective alert thresholds distinguish between normal operational variation and
              genuine problems requiring attention. Poor threshold configuration leads to either
              missed faults or overwhelming false alarms.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-elec-yellow font-medium mb-3 flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Statistical Threshold Calculation
              </h3>
              <div className="space-y-3">
                <p>
                  The most reliable thresholds are based on statistical analysis of actual operating
                  data:
                </p>
                <div className="bg-[#2a2a2a] rounded p-3 font-mono text-sm">
                  <p className="text-elec-yellow mb-2">Baseline Data Collection (2-4 weeks):</p>
                  <p>Mean (μ) = Sum of all readings / Number of readings</p>
                  <p>Standard Deviation (σ) = √(Σ(x-μ)² / n)</p>
                  <p className="mt-2 text-green-400">Warning Threshold = μ + 2σ (95.4% confidence)</p>
                  <p className="text-red-400">Critical Threshold = μ + 3σ (99.7% confidence)</p>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-white font-medium mb-3">
                Example: Motor Current Threshold Setup
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm text-gray-400">Baseline Data (100 kW motor):</p>
                  <ul className="text-sm space-y-1">
                    <li>• Mean current: 120A</li>
                    <li>• Standard deviation: 5A</li>
                    <li>• Operating range: 108A - 132A</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-400">Calculated Thresholds:</p>
                  <ul className="text-sm space-y-1">
                    <li className="text-yellow-400">• Warning: 130A (μ + 2σ)</li>
                    <li className="text-orange-400">• High: 135A (μ + 3σ)</li>
                    <li className="text-red-400">• Critical: 140A (trip point)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
              <h4 className="text-blue-400 font-medium mb-2 flex items-center gap-2">
                <Info className="w-5 h-5" />
                Common Electrical Parameters and Typical Thresholds
              </h4>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="font-medium text-white">Voltage (480V nominal):</p>
                  <p>• Warning: ±5% (456V-504V)</p>
                  <p>• Critical: ±10% (432V-528V)</p>
                </div>
                <div>
                  <p className="font-medium text-white">Power Factor:</p>
                  <p>• Warning: Below 0.90</p>
                  <p>• Critical: Below 0.85</p>
                </div>
                <div>
                  <p className="font-medium text-white">Current Imbalance:</p>
                  <p>• Warning: {'>'}5%</p>
                  <p>• Critical: {'>'}10%</p>
                </div>
                <div>
                  <p className="font-medium text-white">THD (Total Harmonic Distortion):</p>
                  <p>• Warning: {'>'}5%</p>
                  <p>• Critical: {'>'}8%</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Alert Escalation and Notification Routing */}
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow/20 p-2 rounded-lg">
              <Layers className="w-6 h-6 text-elec-yellow" />
            </div>
            <h2 className="text-xl font-semibold text-white">
              2. Alert Escalation and Notification Routing
            </h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Proper escalation ensures critical alerts reach the right people at the right time,
              while preventing notification overload for non-urgent issues.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-elec-yellow font-medium mb-3">Alert Severity Levels</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-blue-900/20 rounded border border-blue-700">
                  <Info className="w-5 h-5 text-blue-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-400">INFORMATIONAL</p>
                    <p className="text-sm">
                      Normal events logged for reference. Equipment state changes, scheduled
                      operations. No notification required - visible in dashboard only.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-yellow-900/20 rounded border border-yellow-700">
                  <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-yellow-400">WARNING</p>
                    <p className="text-sm">
                      Parameter approaching threshold, degradation detected. Email to maintenance
                      queue, dashboard highlight. Response within 24-48 hours.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-orange-900/20 rounded border border-orange-700">
                  <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-orange-400">HIGH</p>
                    <p className="text-sm">
                      Threshold exceeded, equipment at risk. SMS/push notification to on-duty
                      technician, email to supervisor. Response within 4 hours.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-red-900/20 rounded border border-red-700">
                  <Zap className="w-5 h-5 text-red-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-red-400">CRITICAL</p>
                    <p className="text-sm">
                      Immediate safety hazard or equipment failure imminent. Phone call, SMS, email
                      to multiple recipients. Immediate response required.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-white font-medium mb-3">Escalation Path Example</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center text-elec-yellow font-medium">
                    1
                  </div>
                  <span>
                    T+0: Alert generated → Primary technician notified (SMS + app push)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center text-elec-yellow font-medium">
                    2
                  </div>
                  <span>T+15 min: Not acknowledged → Secondary technician added</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center text-elec-yellow font-medium">
                    3
                  </div>
                  <span>T+30 min: Still open → Maintenance supervisor notified (phone call)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center text-elec-yellow font-medium">
                    4
                  </div>
                  <span>T+60 min: Unresolved → Plant manager + safety officer notified</span>
                </div>
              </div>
            </div>

            <div className="bg-green-900/30 border border-green-700 rounded-lg p-4">
              <h4 className="text-green-400 font-medium mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Routing Best Practices
              </h4>
              <ul className="text-sm space-y-1">
                <li>• Route safety-critical alerts to both operations AND maintenance</li>
                <li>• Use different channels for different severities (email vs SMS vs call)</li>
                <li>• Implement time-based routing for after-hours coverage</li>
                <li>• Require acknowledgment for high/critical alerts</li>
                <li>• Log all notification deliveries and acknowledgments</li>
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

        {/* Section 3: Event Logging and Trend Analysis */}
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow/20 p-2 rounded-lg">
              <FileText className="w-6 h-6 text-elec-yellow" />
            </div>
            <h2 className="text-xl font-semibold text-white">
              3. Event Logging and Trend Analysis
            </h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Comprehensive event logging creates the historical record needed for trend analysis,
              root cause investigation, compliance documentation, and continuous improvement.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-elec-yellow font-medium mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Essential Event Log Fields
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left py-2 text-elec-yellow">Field</th>
                      <th className="text-left py-2 text-elec-yellow">Example</th>
                      <th className="text-left py-2 text-elec-yellow">Purpose</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-700">
                      <td className="py-2">Timestamp</td>
                      <td className="py-2 font-mono text-xs">2024-01-15 14:32:45.123</td>
                      <td className="py-2">Precise event timing</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2">Equipment ID</td>
                      <td className="py-2 font-mono text-xs">MTR-AHU-003</td>
                      <td className="py-2">Asset identification</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2">Event Type</td>
                      <td className="py-2 font-mono text-xs">THRESHOLD_EXCEEDED</td>
                      <td className="py-2">Event classification</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2">Parameter</td>
                      <td className="py-2 font-mono text-xs">Phase_A_Current</td>
                      <td className="py-2">What was measured</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2">Value</td>
                      <td className="py-2 font-mono text-xs">145.2 A</td>
                      <td className="py-2">Actual reading</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2">Threshold</td>
                      <td className="py-2 font-mono text-xs">140.0 A (Critical)</td>
                      <td className="py-2">Limit that was exceeded</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2">Severity</td>
                      <td className="py-2 font-mono text-xs">CRITICAL</td>
                      <td className="py-2">Alert priority</td>
                    </tr>
                    <tr>
                      <td className="py-2">Action</td>
                      <td className="py-2 font-mono text-xs">Check motor load</td>
                      <td className="py-2">Recommended response</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-elec-yellow" />
                Trend Analysis Techniques
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="font-medium text-elec-yellow">Short-term Analysis (Daily/Weekly)</p>
                  <ul className="text-sm space-y-1">
                    <li>• Peak demand patterns</li>
                    <li>• Operating schedule correlation</li>
                    <li>• Anomaly detection</li>
                    <li>• Alert frequency tracking</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="font-medium text-elec-yellow">Long-term Analysis (Monthly/Yearly)</p>
                  <ul className="text-sm space-y-1">
                    <li>• Equipment degradation curves</li>
                    <li>• Seasonal variations</li>
                    <li>• Efficiency trends</li>
                    <li>• Maintenance effectiveness</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-purple-900/30 border border-purple-700 rounded-lg p-4">
              <h4 className="text-purple-400 font-medium mb-2">Data Retention Guidelines</h4>
              <ul className="text-sm space-y-1">
                <li>• <strong>High-resolution data (1-sec intervals):</strong> 7-30 days</li>
                <li>• <strong>Detailed logs (15-min intervals):</strong> 1-3 years</li>
                <li>• <strong>Summary/aggregate data:</strong> 5-10 years</li>
                <li>• <strong>Critical event records:</strong> Permanent or per compliance requirements</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: Avoiding Alert Fatigue */}
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow/20 p-2 rounded-lg">
              <BellOff className="w-6 h-6 text-elec-yellow" />
            </div>
            <h2 className="text-xl font-semibold text-white">4. Avoiding Alert Fatigue</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Alert fatigue is one of the most common failures in monitoring systems. When operators
              receive too many false or non-actionable alerts, they begin ignoring all alerts -
              including critical ones.
            </p>

            <div className="bg-red-900/30 border border-red-700 rounded-lg p-4">
              <h4 className="text-red-400 font-medium mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Warning Signs of Alert Fatigue
              </h4>
              <ul className="text-sm space-y-1">
                <li>• Operators disabling or muting alert notifications</li>
                <li>• Alerts being acknowledged without investigation</li>
                <li>• Recurring alerts for the same issue with no resolution</li>
                <li>• Average alert response time increasing over time</li>
                <li>• Critical events discovered only after equipment failure</li>
              </ul>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-elec-yellow font-medium mb-3">Strategies to Prevent Alert Fatigue</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-elec-yellow/20 p-1.5 rounded text-elec-yellow">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Time Delays and Persistence</p>
                    <p className="text-sm">
                      Require conditions to persist for a set duration (e.g., 30 seconds to 5
                      minutes) before alerting. Eliminates transient spikes from triggering false
                      alarms.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-elec-yellow/20 p-1.5 rounded text-elec-yellow">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Dead-band (Hysteresis)</p>
                    <p className="text-sm">
                      Set different thresholds for alert activation vs. clearing. Example: Alert at
                      130A, clear at 125A. Prevents rapid on-off cycling when values hover near
                      threshold.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-elec-yellow/20 p-1.5 rounded text-elec-yellow">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Alert Suppression and Grouping</p>
                    <p className="text-sm">
                      Suppress secondary alerts when a root cause alert is active. Group related
                      alerts into single notifications. Implement maintenance mode to suppress
                      alerts during planned work.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-elec-yellow/20 p-1.5 rounded text-elec-yellow">
                    <Settings className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Regular Threshold Review</p>
                    <p className="text-sm">
                      Monthly review of alert statistics. Adjust thresholds generating excessive
                      false positives. Remove or consolidate redundant alerts. Benchmark against
                      industry standards.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-white font-medium mb-3">Target Alert Metrics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-3 bg-[#2a2a2a] rounded">
                  <p className="text-2xl font-bold text-green-400">{'<'}10</p>
                  <p className="text-xs text-gray-400">Alerts per shift</p>
                </div>
                <div className="p-3 bg-[#2a2a2a] rounded">
                  <p className="text-2xl font-bold text-green-400">{'>'}80%</p>
                  <p className="text-xs text-gray-400">Actionable alerts</p>
                </div>
                <div className="p-3 bg-[#2a2a2a] rounded">
                  <p className="text-2xl font-bold text-green-400">{'<'}5%</p>
                  <p className="text-xs text-gray-400">False positive rate</p>
                </div>
                <div className="p-3 bg-[#2a2a2a] rounded">
                  <p className="text-2xl font-bold text-green-400">{'<'}15 min</p>
                  <p className="text-xs text-gray-400">Avg response time</p>
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

        {/* Section 5: Predictive Analytics and Anomaly Detection */}
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow/20 p-2 rounded-lg">
              <Brain className="w-6 h-6 text-elec-yellow" />
            </div>
            <h2 className="text-xl font-semibold text-white">
              5. Predictive Analytics and Anomaly Detection
            </h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Advanced monitoring systems use machine learning to detect subtle patterns that
              indicate developing problems, enabling proactive maintenance before failures occur.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-elec-yellow font-medium mb-3 flex items-center gap-2">
                <Brain className="w-5 h-5" />
                How Predictive Analytics Works
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-elec-yellow text-sm font-medium">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-white">Baseline Learning</p>
                    <p className="text-sm">
                      System learns normal operating patterns from historical data including daily
                      cycles, seasonal variations, and load relationships.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-elec-yellow text-sm font-medium">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-white">Pattern Recognition</p>
                    <p className="text-sm">
                      Algorithms identify correlations between parameters (e.g., temperature rise
                      rate vs. current, vibration patterns vs. bearing condition).
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-elec-yellow text-sm font-medium">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-white">Anomaly Detection</p>
                    <p className="text-sm">
                      Real-time comparison of current behavior to learned patterns. Deviations are
                      flagged even if within fixed thresholds.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-elec-yellow text-sm font-medium">
                    4
                  </div>
                  <div>
                    <p className="font-medium text-white">Failure Prediction</p>
                    <p className="text-sm">
                      Based on degradation trends and historical failure data, system estimates
                      remaining useful life and recommends maintenance timing.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-white font-medium mb-3">Common Predictive Indicators for Electrical Equipment</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <p className="font-medium text-elec-yellow">Motors</p>
                  <ul className="space-y-1">
                    <li>• Increasing current draw at same load</li>
                    <li>• Growing phase imbalance</li>
                    <li>• Temperature rise rate changes</li>
                    <li>• Power factor degradation</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="font-medium text-elec-yellow">Transformers</p>
                  <ul className="space-y-1">
                    <li>• Oil temperature trending upward</li>
                    <li>• Increasing harmonic distortion</li>
                    <li>• Efficiency declining over time</li>
                    <li>• Abnormal loading patterns</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="font-medium text-elec-yellow">Circuit Breakers</p>
                  <ul className="space-y-1">
                    <li>• Contact resistance increasing</li>
                    <li>• Operating time changes</li>
                    <li>• Temperature hotspots developing</li>
                    <li>• Nuisance trip frequency</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="font-medium text-elec-yellow">Capacitor Banks</p>
                  <ul className="space-y-1">
                    <li>• Capacitance value drift</li>
                    <li>• Increasing ESR (equivalent series resistance)</li>
                    <li>• Harmonic current changes</li>
                    <li>• Temperature anomalies</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-green-900/30 border border-green-700 rounded-lg p-4">
              <h4 className="text-green-400 font-medium mb-2 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Rate-of-Change Alerting
              </h4>
              <p className="text-sm mb-2">
                Beyond fixed thresholds, monitor how quickly parameters are changing:
              </p>
              <div className="bg-[#1a1a1a] rounded p-3 font-mono text-xs">
                <p>IF temperature_rise_rate {'>'} 2°C/hour THEN alert "Abnormal heating"</p>
                <p>IF current_trend {'>'} 5A/week THEN alert "Load increasing - investigate"</p>
                <p>IF power_factor_decline {'>'} 0.02/month THEN alert "PF degradation detected"</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Integrating Alerts with Maintenance Systems */}
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow/20 p-2 rounded-lg">
              <Wrench className="w-6 h-6 text-elec-yellow" />
            </div>
            <h2 className="text-xl font-semibold text-white">
              6. Integrating Alerts with Maintenance Systems
            </h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Connecting your energy monitoring system to your CMMS (Computerized Maintenance
              Management System) automates work order creation and ensures monitoring data informs
              maintenance decisions.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-elec-yellow font-medium mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                CMMS Integration Benefits
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5" />
                    <span>Automatic work order generation from alerts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5" />
                    <span>Priority assignment based on alert severity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5" />
                    <span>Equipment history with monitoring data attached</span>
                  </li>
                </ul>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5" />
                    <span>Maintenance mode sync (suppress alerts during PM)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5" />
                    <span>Closed-loop tracking (alert → work order → resolution)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5" />
                    <span>Condition-based maintenance trigger automation</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-white font-medium mb-3">Alert-to-Work Order Mapping</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left py-2 text-elec-yellow">Alert Type</th>
                      <th className="text-left py-2 text-elec-yellow">CMMS Priority</th>
                      <th className="text-left py-2 text-elec-yellow">Work Order Type</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-700">
                      <td className="py-2">Critical fault</td>
                      <td className="py-2 text-red-400">Emergency</td>
                      <td className="py-2">Corrective - Immediate</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2">High alert</td>
                      <td className="py-2 text-orange-400">Urgent</td>
                      <td className="py-2">Corrective - Same day</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2">Warning</td>
                      <td className="py-2 text-yellow-400">Normal</td>
                      <td className="py-2">Planned maintenance</td>
                    </tr>
                    <tr>
                      <td className="py-2">Predictive indicator</td>
                      <td className="py-2 text-blue-400">Low</td>
                      <td className="py-2">Condition-based PM</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-white font-medium mb-3">Integration Methods</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3 p-3 bg-[#2a2a2a] rounded">
                  <span className="font-medium text-elec-yellow min-w-[80px]">API</span>
                  <span>
                    REST or SOAP web services for real-time bi-directional data exchange. Most
                    flexible but requires development effort.
                  </span>
                </div>
                <div className="flex items-start gap-3 p-3 bg-[#2a2a2a] rounded">
                  <span className="font-medium text-elec-yellow min-w-[80px]">Database</span>
                  <span>
                    Direct database connection or shared database tables. Good for large data
                    volumes but requires careful security configuration.
                  </span>
                </div>
                <div className="flex items-start gap-3 p-3 bg-[#2a2a2a] rounded">
                  <span className="font-medium text-elec-yellow min-w-[80px]">File-based</span>
                  <span>
                    CSV or XML file exchange on scheduled intervals. Simple but introduces latency.
                    Good for legacy systems.
                  </span>
                </div>
                <div className="flex items-start gap-3 p-3 bg-[#2a2a2a] rounded">
                  <span className="font-medium text-elec-yellow min-w-[80px]">Middleware</span>
                  <span>
                    Integration platform (e.g., OSIsoft PI, Ignition) as intermediary. Adds cost
                    but simplifies complex integrations.
                  </span>
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
        <section className="bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 rounded-lg p-6 border border-elec-yellow/30">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-6 h-6 text-elec-yellow" />
            <h2 className="text-xl font-semibold text-white">Quick Reference Card</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-elec-yellow font-medium">Threshold Calculation</h3>
              <div className="bg-[#1a1a1a] rounded p-3 text-sm font-mono">
                <p className="text-yellow-400">Warning = Mean + 2σ</p>
                <p className="text-orange-400">High = Mean + 2.5σ</p>
                <p className="text-red-400">Critical = Mean + 3σ</p>
              </div>
              <h3 className="text-elec-yellow font-medium mt-4">Alert Severity Levels</h3>
              <ul className="text-sm space-y-1 text-gray-300">
                <li>
                  <span className="text-blue-400">INFO:</span> Log only, no notification
                </li>
                <li>
                  <span className="text-yellow-400">WARNING:</span> Email, 24-48hr response
                </li>
                <li>
                  <span className="text-orange-400">HIGH:</span> SMS, 4hr response
                </li>
                <li>
                  <span className="text-red-400">CRITICAL:</span> Phone call, immediate
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-elec-yellow font-medium">Typical Electrical Thresholds</h3>
              <ul className="text-sm space-y-1 text-gray-300">
                <li>• Voltage: Warning ±5%, Critical ±10%</li>
                <li>• Current imbalance: Warning {'>'}5%, Critical {'>'}10%</li>
                <li>• Power factor: Warning {'<'}0.90, Critical {'<'}0.85</li>
                <li>• THD: Warning {'>'}5%, Critical {'>'}8%</li>
              </ul>
              <h3 className="text-elec-yellow font-medium mt-4">Alert Fatigue Prevention</h3>
              <ul className="text-sm space-y-1 text-gray-300">
                <li>• Target {'<'}10 alerts per shift</li>
                <li>• {'>'}80% should be actionable</li>
                <li>• Use time delays (30s-5min)</li>
                <li>• Implement dead-bands (5% hysteresis)</li>
                <li>• Review thresholds monthly</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Info className="w-6 h-6 text-elec-yellow" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-600 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-4 text-left bg-[#1a1a1a] hover:bg-[#2a2a2a] transition-colors min-h-[44px] touch-manipulation active:scale-[0.98]"
                >
                  <span className="font-medium text-white pr-4">{faq.question}</span>
                  {expandedFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                  )}
                </button>
                {expandedFAQ === index && (
                  <div className="p-4 bg-[#242424] text-gray-300 text-sm border-t border-gray-600">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-elec-yellow" />
            Section Quiz
          </h2>
          <Quiz questions={quizQuestions} />
        </section>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6">
          <Button
            variant="outline"
            onClick={() => navigate('/upskilling/energy-efficiency/module-5/section-2')}
            className="flex items-center gap-2 min-h-[44px] touch-manipulation active:scale-[0.98] bg-transparent border-gray-600 text-white hover:bg-gray-700 hover:text-white"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous: Section 2 - Dashboard Design</span>
          </Button>
          <Button
            onClick={() => navigate('/upskilling/energy-efficiency/module-5/section-4')}
            className="flex items-center gap-2 min-h-[44px] touch-manipulation active:scale-[0.98] bg-elec-yellow text-black hover:bg-elec-yellow/90"
          >
            <span>Next: Section 4 - Reporting & KPIs</span>
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EnergyEfficiencyModule5Section3;
