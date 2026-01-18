import { ArrowLeft, Zap, CheckCircle, Bell, Target, Layers, FileText, TrendingUp, BellOff, Brain, Wrench, Clock, Activity, Settings, Shield, AlertTriangle, Info, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Quiz from "@/components/apprentice-courses/Quiz";
import InlineCheck from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Fault Alerts and Event Logging - Energy Efficiency Module 5 Section 3";
const DESCRIPTION = "Learn to configure meaningful alert thresholds, implement event logging for trend analysis, and integrate alerts with maintenance systems for electrical efficiency monitoring.";

const quickCheckQuestions = [
  {
    id: "ee5s3-qc1",
    question: "When setting alert thresholds for power factor on a motor, what statistical approach helps minimise false alarms while catching genuine issues?",
    options: [
      "Setting threshold at exactly the mean value",
      "Using mean plus 2-3 standard deviations from baseline",
      "Always using manufacturer specifications only",
      "Setting threshold at maximum recorded value"
    ],
    correctIndex: 1,
    explanation: "Using mean plus 2-3 standard deviations creates a threshold that accounts for normal variation while alerting on statistically significant deviations. This approach is based on actual operating data and reduces false positives while catching genuine anomalies."
  },
  {
    id: "ee5s3-qc2",
    question: "What is 'alert fatigue' and why is it dangerous in electrical monitoring systems?",
    options: [
      "Physical tiredness from responding to too many alerts",
      "When operators ignore or disable alerts due to excessive false alarms",
      "System slowdown from processing too many events",
      "Battery drain in portable monitoring devices"
    ],
    correctIndex: 1,
    explanation: "Alert fatigue occurs when operators become desensitised to alerts due to excessive false alarms or non-actionable notifications. This is dangerous because critical alerts may be ignored or disabled, potentially leading to missed equipment failures, safety hazards, or energy waste."
  },
  {
    id: "ee5s3-qc3",
    question: "What information should be included in a well-structured event log entry for an electrical fault?",
    options: [
      "Only the time and date of the event",
      "Just the equipment name and fault type",
      "Timestamp, equipment ID, measured values, threshold exceeded, and recommended action",
      "The name of the operator on duty"
    ],
    correctIndex: 2,
    explanation: "A comprehensive event log entry should include timestamp, equipment identification, actual measured values, which threshold was exceeded, severity level, and recommended corrective action. This data enables trend analysis, root cause investigation, and informed maintenance decisions."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "For a 100 kW motor with baseline current of 120A and standard deviation of 5A, what would be an appropriate warning threshold using the 2-sigma rule?",
    options: ["125A", "130A", "135A", "140A"],
    correctAnswer: 1,
    explanation: "Warning threshold = Mean + 2σ = 120A + (2 × 5A) = 130A. This captures 95.4% of normal variation."
  },
  {
    id: 2,
    question: "What is the primary purpose of alert escalation in electrical monitoring systems?",
    options: [
      "To increase the volume of all alerts",
      "To ensure critical issues reach appropriate personnel when initial responses fail",
      "To reduce the number of alerts generated",
      "To automatically fix all detected faults"
    ],
    correctAnswer: 1,
    explanation: "Alert escalation ensures that if initial responders do not acknowledge or resolve an alert within set timeframes, it automatically routes to supervisors and management."
  },
  {
    id: 3,
    question: "Which type of event logging approach provides the most useful data for trend analysis?",
    options: [
      "Logging only when thresholds are exceeded",
      "Continuous logging at regular intervals with event-triggered detailed capture",
      "Manual logging by operators",
      "Logging only during business hours"
    ],
    correctAnswer: 1,
    explanation: "Combining continuous baseline logging with detailed event-triggered capture provides both the trend data needed for long-term analysis and the high-resolution data needed to investigate specific incidents."
  },
  {
    id: 4,
    question: "What is the recommended approach to avoid alert fatigue in energy monitoring systems?",
    options: [
      "Disable all non-critical alerts",
      "Send all alerts to a single person",
      "Implement tiered severity levels with appropriate routing and suppression rules",
      "Only check alerts once per week"
    ],
    correctAnswer: 2,
    explanation: "Tiered severity levels ensure the right people receive the right alerts, while suppression rules prevent cascading alerts and reduce unnecessary notifications."
  },
  {
    id: 5,
    question: "Predictive analytics in electrical monitoring primarily uses which technique to forecast failures?",
    options: [
      "Random sampling of equipment",
      "Machine learning algorithms analysing historical patterns and trends",
      "Manual inspection schedules",
      "Fixed time-based replacement"
    ],
    correctAnswer: 1,
    explanation: "Machine learning algorithms analyse historical data to identify patterns that precede failures, enabling proactive maintenance before problems occur."
  },
  {
    id: 6,
    question: "When integrating alerts with a CMMS, what automatic action is most valuable?",
    options: [
      "Sending email notifications only",
      "Automatic work order generation with priority assignment",
      "Shutting down all equipment immediately",
      "Deleting old maintenance records"
    ],
    correctAnswer: 1,
    explanation: "Automatic work order generation ensures that alerts result in tracked, prioritised maintenance actions rather than being lost or forgotten."
  },
  {
    id: 7,
    question: "What does 'dead-band' or hysteresis in alert configuration prevent?",
    options: [
      "All alerts from being generated",
      "Rapid on-off cycling of alerts when values hover near threshold",
      "Equipment from being monitored",
      "Maintenance personnel from receiving notifications"
    ],
    correctAnswer: 1,
    explanation: "Dead-band creates a gap between alert activation and clearing thresholds, preventing rapid cycling when values fluctuate around a single threshold point."
  },
  {
    id: 8,
    question: "For voltage monitoring on a 400V system, what percentage deviation typically warrants a critical alert?",
    options: ["±1%", "±3%", "±5%", "±10% or greater"],
    correctAnswer: 3,
    explanation: "Voltage deviations of ±10% or greater indicate serious supply problems that could damage equipment or cause operational issues, warranting critical priority."
  },
  {
    id: 9,
    question: "What is the benefit of correlating multiple parameter alerts on the same equipment?",
    options: [
      "It reduces the total number of sensors needed",
      "It helps identify root causes and distinguish real faults from sensor errors",
      "It eliminates the need for maintenance",
      "It makes the system less complex"
    ],
    correctAnswer: 1,
    explanation: "When multiple related parameters (current, temperature, vibration) all indicate a problem simultaneously, it confirms a genuine issue. Single-parameter anomalies may indicate sensor faults rather than equipment problems."
  },
  {
    id: 10,
    question: "What retention period is typically recommended for detailed electrical event logs in industrial facilities?",
    options: [
      "24 hours",
      "1 week",
      "1-3 years minimum, with summary data retained longer",
      "Logs should never be retained"
    ],
    correctAnswer: 2,
    explanation: "Retaining 1-3 years of detailed logs enables trend analysis across seasons and operating cycles, while summary data retained longer supports long-term equipment lifecycle analysis."
  }
];

const faqs = [
  {
    question: "How do I determine the right alert threshold for a new piece of equipment?",
    answer: "Start by establishing a baseline during normal operation - collect data for at least 2-4 weeks covering various operating conditions. Calculate the mean and standard deviation of key parameters. Set warning thresholds at mean + 2 standard deviations and critical thresholds at mean + 3 standard deviations. Compare with manufacturer specifications and adjust based on equipment criticality. Review and refine thresholds quarterly based on actual alert history and operator feedback."
  },
  {
    question: "What is the difference between event logging and data logging in energy monitoring?",
    answer: "Data logging continuously records measured values at regular intervals (e.g., every 15 minutes) regardless of whether anything unusual occurs - this creates trend data. Event logging specifically captures when something noteworthy happens: threshold exceedances, equipment state changes, operator actions, or system errors. Best practice combines both: continuous data logging at moderate intervals with detailed event logging triggered by specific conditions."
  },
  {
    question: "How can I reduce false alarms without missing real problems?",
    answer: "Implement multiple strategies: Use statistical thresholds based on actual operating data rather than arbitrary values. Add time delays so brief transients do not trigger alerts. Implement dead-bands to prevent cycling. Correlate multiple parameters before alerting. Use rate-of-change detection for gradual drift. Establish different thresholds for different operating modes. Review alert history monthly and adjust thresholds that generate excessive false positives."
  },
  {
    question: "What alerts should route directly to maintenance vs operations?",
    answer: "Operations should receive alerts requiring immediate response: safety hazards, equipment trips, process impacts, and conditions requiring manual intervention. Maintenance receives alerts for degradation trends, preventive maintenance triggers, efficiency losses, and non-urgent equipment issues. Critical safety alerts should go to both simultaneously. Use escalation paths so unacknowledged alerts automatically route to supervisors."
  },
  {
    question: "How do I integrate electrical monitoring alerts with our existing CMMS?",
    answer: "Most modern energy monitoring systems support standard integration methods: API connections (REST/SOAP), database links, file-based exchange (CSV/XML), or dedicated CMMS connectors. Map alert severity levels to work order priorities. Include equipment ID, fault description, measured values, and timestamp in the data exchange. Configure automatic work order creation for specific alert types. Test integrations thoroughly before production deployment."
  }
];

const EnergyEfficiencyModule5Section3 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/energy-efficiency-module-5">
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
            <Bell className="h-4 w-4" />
            <span>Module 5 Section 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Fault Alerts and Event Logging
          </h1>
          <p className="text-white/80">
            Configure intelligent alerting systems and implement comprehensive event logging
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Thresholds:</strong> Mean + 2σ (warning), Mean + 3σ (critical)</li>
              <li><strong>Target:</strong> Less than 10 alerts per shift</li>
              <li><strong>Actionable:</strong> More than 80% of alerts need action</li>
              <li><strong>Retention:</strong> 1-3 years for detailed logs</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Alert fatigue when operators disable notifications</li>
              <li><strong>Use:</strong> Dead-band (hysteresis) to prevent alert cycling</li>
              <li><strong>Integrate:</strong> CMMS for automatic work order generation</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Calculate statistical thresholds for meaningful alerts",
              "Configure alert escalation and notification routing",
              "Implement comprehensive event logging",
              "Prevent alert fatigue with proper configuration",
              "Apply predictive analytics for early warning",
              "Integrate alerts with maintenance systems"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Setting Up Meaningful Alert Thresholds */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Setting Up Meaningful Alert Thresholds
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective alert thresholds distinguish between normal operational variation and genuine problems requiring attention. Poor threshold configuration leads to either missed faults or overwhelming false alarms.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Statistical Threshold Calculation:</p>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-white text-sm mb-2">Baseline Data Collection (2-4 weeks):</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Mean (μ) = Sum of all readings / Number of readings</li>
                  <li>Standard Deviation (σ) = √(Σ(x-μ)² / n)</li>
                  <li><strong className="text-yellow-400">Warning Threshold</strong> = μ + 2σ (95.4% confidence)</li>
                  <li><strong className="text-red-400">Critical Threshold</strong> = μ + 3σ (99.7% confidence)</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Example: Motor Current Threshold Setup (100 kW motor)</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                  <p className="text-elec-yellow text-sm font-medium mb-2">Baseline Data</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Mean current: 120A</li>
                    <li>Standard deviation: 5A</li>
                    <li>Operating range: 108A - 132A</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                  <p className="text-elec-yellow text-sm font-medium mb-2">Calculated Thresholds</p>
                  <ul className="text-sm text-white space-y-1">
                    <li><span className="text-yellow-400">Warning:</span> 130A (μ + 2σ)</li>
                    <li><span className="text-orange-400">High:</span> 135A (μ + 3σ)</li>
                    <li><span className="text-red-400">Critical:</span> 140A (trip point)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Electrical Parameters and Typical Thresholds</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm text-white">
                <div>
                  <p className="font-medium mb-1">Voltage (400V nominal)</p>
                  <ul className="space-y-0.5 ml-4">
                    <li>Warning: ±5% (380V-420V)</li>
                    <li>Critical: ±10% (360V-440V)</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-1">Power Factor</p>
                  <ul className="space-y-0.5 ml-4">
                    <li>Warning: Below 0.90</li>
                    <li>Critical: Below 0.85</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-1">Current Imbalance</p>
                  <ul className="space-y-0.5 ml-4">
                    <li>Warning: &gt;5%</li>
                    <li>Critical: &gt;10%</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-1">THD (Total Harmonic Distortion)</p>
                  <ul className="space-y-0.5 ml-4">
                    <li>Warning: &gt;5%</li>
                    <li>Critical: &gt;8%</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Alert Escalation and Notification Routing */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Alert Escalation and Notification Routing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Proper escalation ensures critical alerts reach the right people at the right time, while preventing notification overload for non-urgent issues.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-3">Alert Severity Levels:</p>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-500/10 border-l-2 border-blue-500/50">
                  <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-blue-400">INFORMATIONAL</p>
                    <p className="text-sm text-white">Normal events logged for reference. Equipment state changes, scheduled operations. No notification required - visible in dashboard only.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-yellow-500/10 border-l-2 border-yellow-500/50">
                  <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-yellow-400">WARNING</p>
                    <p className="text-sm text-white">Parameter approaching threshold, degradation detected. Email to maintenance queue, dashboard highlight. Response within 24-48 hours.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-orange-500/10 border-l-2 border-orange-500/50">
                  <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-orange-400">HIGH</p>
                    <p className="text-sm text-white">Threshold exceeded, equipment at risk. SMS/push notification to on-duty technician, email to supervisor. Response within 4 hours.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
                  <Zap className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-red-400">CRITICAL</p>
                    <p className="text-sm text-white">Immediate safety hazard or equipment failure imminent. Phone call, SMS, email to multiple recipients. Immediate response required.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-3">Escalation Path Example:</p>
              <div className="space-y-2 text-sm text-white">
                <div className="flex items-centre gap-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center text-elec-yellow font-medium flex-shrink-0">1</div>
                  <span>T+0: Alert generated - Primary technician notified (SMS + app push)</span>
                </div>
                <div className="flex items-centre gap-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center text-elec-yellow font-medium flex-shrink-0">2</div>
                  <span>T+15 min: Not acknowledged - Secondary technician added</span>
                </div>
                <div className="flex items-centre gap-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center text-elec-yellow font-medium flex-shrink-0">3</div>
                  <span>T+30 min: Still open - Maintenance supervisor notified (phone call)</span>
                </div>
                <div className="flex items-centre gap-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center text-elec-yellow font-medium flex-shrink-0">4</div>
                  <span>T+60 min: Unresolved - Plant manager + safety officer notified</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Event Logging and Trend Analysis */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Event Logging and Trend Analysis
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Comprehensive event logging creates the historical record needed for trend analysis, root cause investigation, compliance documentation, and continuous improvement.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Essential Event Log Fields</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-white">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-2 text-elec-yellow">Field</th>
                      <th className="text-left py-2 text-elec-yellow">Example</th>
                      <th className="text-left py-2 text-elec-yellow">Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/10">
                      <td className="py-2">Timestamp</td>
                      <td className="py-2 font-mono text-xs">2024-01-15 14:32:45.123</td>
                      <td className="py-2">Precise event timing</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2">Equipment ID</td>
                      <td className="py-2 font-mono text-xs">MTR-AHU-003</td>
                      <td className="py-2">Asset identification</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2">Event Type</td>
                      <td className="py-2 font-mono text-xs">THRESHOLD_EXCEEDED</td>
                      <td className="py-2">Event classification</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2">Parameter</td>
                      <td className="py-2 font-mono text-xs">Phase_A_Current</td>
                      <td className="py-2">What was measured</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2">Value</td>
                      <td className="py-2 font-mono text-xs">145.2 A</td>
                      <td className="py-2">Actual reading</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2">Threshold</td>
                      <td className="py-2 font-mono text-xs">140.0 A (Critical)</td>
                      <td className="py-2">Limit that was exceeded</td>
                    </tr>
                    <tr className="border-b border-white/10">
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

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Trend Analysis Techniques:</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                  <p className="text-elec-yellow text-sm font-medium mb-2">Short-term Analysis (Daily/Weekly)</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Peak demand patterns</li>
                    <li>Operating schedule correlation</li>
                    <li>Anomaly detection</li>
                    <li>Alert frequency tracking</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                  <p className="text-elec-yellow text-sm font-medium mb-2">Long-term Analysis (Monthly/Yearly)</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Equipment degradation curves</li>
                    <li>Seasonal variations</li>
                    <li>Efficiency trends</li>
                    <li>Maintenance effectiveness</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Data Retention Guidelines</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>High-resolution data (1-sec intervals):</strong> 7-30 days</li>
                <li><strong>Detailed logs (15-min intervals):</strong> 1-3 years</li>
                <li><strong>Summary/aggregate data:</strong> 5-10 years</li>
                <li><strong>Critical event records:</strong> Permanent or per compliance requirements</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 04: Avoiding Alert Fatigue */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Avoiding Alert Fatigue
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Alert fatigue is one of the most common failures in monitoring systems. When operators receive too many false or non-actionable alerts, they begin ignoring all alerts - including critical ones.
            </p>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
              <p className="text-sm font-medium text-red-400 mb-2">Warning Signs of Alert Fatigue</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Operators disabling or muting alert notifications</li>
                <li>Alerts being acknowledged without investigation</li>
                <li>Recurring alerts for the same issue with no resolution</li>
                <li>Average alert response time increasing over time</li>
                <li>Critical events discovered only after equipment failure</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-3">Strategies to Prevent Alert Fatigue:</p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-white">Time Delays and Persistence</p>
                    <p className="text-sm text-white">Require conditions to persist for a set duration (e.g., 30 seconds to 5 minutes) before alerting. Eliminates transient spikes from triggering false alarms.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Activity className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-white">Dead-band (Hysteresis)</p>
                    <p className="text-sm text-white">Set different thresholds for alert activation vs clearing. Example: Alert at 130A, clear at 125A. Prevents rapid on-off cycling when values hover near threshold.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Layers className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-white">Alert Suppression and Grouping</p>
                    <p className="text-sm text-white">Suppress secondary alerts when a root cause alert is active. Group related alerts into single notifications. Implement maintenance mode to suppress alerts during planned work.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Settings className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-white">Regular Threshold Review</p>
                    <p className="text-sm text-white">Monthly review of alert statistics. Adjust thresholds generating excessive false positives. Remove or consolidate redundant alerts. Benchmark against industry standards.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-3">Target Alert Metrics:</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="p-3 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                  <p className="text-2xl font-bold text-green-400">&lt;10</p>
                  <p className="text-xs text-white">Alerts per shift</p>
                </div>
                <div className="p-3 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                  <p className="text-2xl font-bold text-green-400">&gt;80%</p>
                  <p className="text-xs text-white">Actionable alerts</p>
                </div>
                <div className="p-3 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                  <p className="text-2xl font-bold text-green-400">&lt;5%</p>
                  <p className="text-xs text-white">False positive rate</p>
                </div>
                <div className="p-3 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                  <p className="text-2xl font-bold text-green-400">&lt;15 min</p>
                  <p className="text-xs text-white">Avg response time</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Predictive Analytics and Anomaly Detection */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Predictive Analytics and Anomaly Detection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Advanced monitoring systems use machine learning to detect subtle patterns that indicate developing problems, enabling proactive maintenance before failures occur.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-3">How Predictive Analytics Works:</p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-elec-yellow text-sm font-medium flex-shrink-0">1</div>
                  <div>
                    <p className="font-medium text-white">Baseline Learning</p>
                    <p className="text-sm text-white">System learns normal operating patterns from historical data including daily cycles, seasonal variations, and load relationships.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-elec-yellow text-sm font-medium flex-shrink-0">2</div>
                  <div>
                    <p className="font-medium text-white">Pattern Recognition</p>
                    <p className="text-sm text-white">Algorithms identify correlations between parameters (e.g., temperature rise rate vs current, vibration patterns vs bearing condition).</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-elec-yellow text-sm font-medium flex-shrink-0">3</div>
                  <div>
                    <p className="font-medium text-white">Anomaly Detection</p>
                    <p className="text-sm text-white">Real-time comparison of current behaviour to learned patterns. Deviations are flagged even if within fixed thresholds.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-elec-yellow text-sm font-medium flex-shrink-0">4</div>
                  <div>
                    <p className="font-medium text-white">Failure Prediction</p>
                    <p className="text-sm text-white">Based on degradation trends and historical failure data, system estimates remaining useful life and recommends maintenance timing.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Predictive Indicators for Electrical Equipment</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm text-white">
                <div>
                  <p className="font-medium text-elec-yellow mb-1">Motors</p>
                  <ul className="space-y-0.5 ml-4">
                    <li>Increasing current draw at same load</li>
                    <li>Growing phase imbalance</li>
                    <li>Temperature rise rate changes</li>
                    <li>Power factor degradation</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-elec-yellow mb-1">Transformers</p>
                  <ul className="space-y-0.5 ml-4">
                    <li>Oil temperature trending upward</li>
                    <li>Increasing harmonic distortion</li>
                    <li>Efficiency declining over time</li>
                    <li>Abnormal loading patterns</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-elec-yellow mb-1">Circuit Breakers</p>
                  <ul className="space-y-0.5 ml-4">
                    <li>Contact resistance increasing</li>
                    <li>Operating time changes</li>
                    <li>Temperature hotspots developing</li>
                    <li>Nuisance trip frequency</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-elec-yellow mb-1">Capacitor Banks</p>
                  <ul className="space-y-0.5 ml-4">
                    <li>Capacitance value drift</li>
                    <li>Increasing ESR</li>
                    <li>Harmonic current changes</li>
                    <li>Temperature anomalies</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Rate-of-Change Alerting</p>
              <p className="text-sm text-white mb-2">Beyond fixed thresholds, monitor how quickly parameters are changing:</p>
              <ul className="text-sm text-white space-y-1 ml-4 font-mono">
                <li>IF temperature_rise_rate &gt; 2°C/hour THEN alert "Abnormal heating"</li>
                <li>IF current_trend &gt; 5A/week THEN alert "Load increasing"</li>
                <li>IF power_factor_decline &gt; 0.02/month THEN alert "PF degradation"</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 06: Integrating Alerts with Maintenance Systems */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Integrating Alerts with Maintenance Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Connecting your energy monitoring system to your CMMS (Computerised Maintenance Management System) automates work order creation and ensures monitoring data informs maintenance decisions.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">CMMS Integration Benefits</p>
              <div className="grid sm:grid-cols-2 gap-2 text-sm text-white">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Automatic work order generation from alerts</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Priority assignment based on alert severity</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Equipment history with monitoring data attached</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Maintenance mode sync (suppress alerts during PM)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Closed-loop tracking (alert to work order to resolution)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Condition-based maintenance trigger automation</span>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Alert-to-Work Order Mapping:</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-white">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-2 text-elec-yellow">Alert Type</th>
                      <th className="text-left py-2 text-elec-yellow">CMMS Priority</th>
                      <th className="text-left py-2 text-elec-yellow">Work Order Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/10">
                      <td className="py-2">Critical fault</td>
                      <td className="py-2 text-red-400">Emergency</td>
                      <td className="py-2">Corrective - Immediate</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2">High alert</td>
                      <td className="py-2 text-orange-400">Urgent</td>
                      <td className="py-2">Corrective - Same day</td>
                    </tr>
                    <tr className="border-b border-white/10">
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

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Integration Methods:</p>
              <div className="space-y-3 text-sm text-white">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                  <span className="font-medium text-elec-yellow min-w-[80px]">API</span>
                  <span>REST or SOAP web services for real-time bi-directional data exchange. Most flexible but requires development effort.</span>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                  <span className="font-medium text-elec-yellow min-w-[80px]">Database</span>
                  <span>Direct database connection or shared database tables. Good for large data volumes but requires careful security configuration.</span>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                  <span className="font-medium text-elec-yellow min-w-[80px]">File-based</span>
                  <span>CSV or XML file exchange on scheduled intervals. Simple but introduces latency. Good for legacy systems.</span>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                  <span className="font-medium text-elec-yellow min-w-[80px]">Middleware</span>
                  <span>Integration platform (e.g., OSIsoft PI, Ignition) as intermediary. Adds cost but simplifies complex integrations.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Configuring Alerts</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Collect 2-4 weeks of baseline data before setting thresholds</li>
                <li>Start with conservative (wider) thresholds and tighten over time</li>
                <li>Use time delays of 30 seconds to 5 minutes for non-critical alerts</li>
                <li>Implement dead-bands of 5% between activation and clearing</li>
                <li>Document the rationale for each threshold setting</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Reviewing Alert Performance</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Track alert volume by type, severity, and equipment</li>
                <li>Calculate false positive rate for each alert type</li>
                <li>Measure average response and resolution times</li>
                <li>Identify recurring alerts that indicate underlying issues</li>
                <li>Survey operators quarterly about alert usefulness</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Using arbitrary thresholds</strong> - always base on actual operating data</li>
                <li><strong>Alerting on everything</strong> - focus on actionable conditions only</li>
                <li><strong>Ignoring alert fatigue signs</strong> - address root causes immediately</li>
                <li><strong>No escalation paths</strong> - critical alerts must reach someone</li>
                <li><strong>Poor log retention</strong> - maintain sufficient history for trend analysis</li>
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
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-elec-yellow mb-1">Threshold Calculation</p>
                <ul className="space-y-0.5">
                  <li>Warning = Mean + 2σ (95.4%)</li>
                  <li>High = Mean + 2.5σ</li>
                  <li>Critical = Mean + 3σ (99.7%)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-elec-yellow mb-1">Alert Severity Response</p>
                <ul className="space-y-0.5">
                  <li>INFO: Log only, no notification</li>
                  <li>WARNING: Email, 24-48hr response</li>
                  <li>HIGH: SMS, 4hr response</li>
                  <li>CRITICAL: Phone call, immediate</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-elec-yellow mb-1">Typical Thresholds</p>
                <ul className="space-y-0.5">
                  <li>Voltage: Warning ±5%, Critical ±10%</li>
                  <li>Current imbalance: Warning &gt;5%, Critical &gt;10%</li>
                  <li>Power factor: Warning &lt;0.90, Critical &lt;0.85</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-elec-yellow mb-1">Target Metrics</p>
                <ul className="space-y-0.5">
                  <li>&lt;10 alerts per shift</li>
                  <li>&gt;80% actionable alerts</li>
                  <li>&lt;5% false positive rate</li>
                  <li>&lt;15 min average response</li>
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

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/energy-efficiency/module-5/section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Dashboard Design
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/energy-efficiency/module-5/section-4">
              Next: Remote Control
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EnergyEfficiencyModule5Section3;
