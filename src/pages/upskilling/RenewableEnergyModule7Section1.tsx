import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "System Monitoring and Performance Analysis - Renewable Energy Module 7";
const DESCRIPTION =
  "Master renewable energy system monitoring, performance metrics, data analysis techniques, and remote monitoring platforms for optimising system operation and identifying issues.";

const quickCheckQuestions = [
  {
    id: "mon-perf-qc1",
    question: "What is the Performance Ratio (PR) of a solar PV system?",
    options: [
      "The ratio of actual to theoretical maximum energy output",
      "The ratio of peak power to average power",
      "The ratio of DC to AC power",
      "The ratio of summer to winter output",
    ],
    correctIndex: 0,
    explanation:
      "Performance Ratio compares actual energy produced to the theoretical maximum based on irradiance and system capacity, typically expressed as a percentage. A well-maintained system should achieve PR above 80%.",
  },
  {
    id: "mon-perf-qc2",
    question: "What is a typical expected annual degradation rate for crystalline silicon PV modules?",
    options: ["0.1-0.2%", "0.3-0.5%", "0.5-0.8%", "1.0-1.5%"],
    correctIndex: 2,
    explanation:
      "Crystalline silicon modules typically degrade at 0.5-0.8% per year. Higher degradation rates may indicate quality issues or environmental factors requiring investigation.",
  },
  {
    id: "mon-perf-qc3",
    question: "What does string-level monitoring enable that system-level monitoring cannot?",
    options: [
      "Total energy measurement",
      "Grid export measurement",
      "Identification of underperforming strings",
      "Weather data collection",
    ],
    correctIndex: 2,
    explanation:
      "String-level monitoring measures individual string currents and voltages, enabling identification of specific underperforming strings rather than just overall system issues.",
  },
  {
    id: "mon-perf-qc4",
    question: "What minimum irradiance level is typically required for meaningful PV performance testing?",
    options: ["100 W/m²", "200 W/m²", "500 W/m²", "800 W/m²"],
    correctIndex: 2,
    explanation:
      "A minimum of 500 W/m² is typically required for meaningful performance testing, though 700-800 W/m² is preferred. Lower irradiance levels introduce significant measurement uncertainty.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What is Specific Yield in solar PV system performance?",
    options: [
      "Power output per module",
      "Annual energy per kWp installed",
      "Efficiency percentage",
      "Peak power rating",
    ],
    correctAnswer: 1,
    explanation:
      "Specific Yield measures annual energy production per kilowatt-peak of installed capacity (kWh/kWp/year), enabling comparison between systems of different sizes.",
  },
  {
    id: 2,
    question: "What communication protocol is commonly used for inverter monitoring?",
    options: ["HTTP only", "Modbus RTU/TCP", "Bluetooth only", "USB only"],
    correctAnswer: 1,
    explanation:
      "Modbus RTU (serial) and Modbus TCP (Ethernet) are widely used industrial protocols for inverter communication, supported by most manufacturers and monitoring platforms.",
  },
  {
    id: 3,
    question: "What does a sudden drop in string current while voltage remains normal indicate?",
    options: [
      "Inverter failure",
      "Grid fault",
      "Partial shading or soiling",
      "Complete string failure",
    ],
    correctAnswer: 2,
    explanation:
      "Reduced current with normal voltage typically indicates partial shading or localised soiling, as the shaded cells limit current while unaffected cells maintain voltage.",
  },
  {
    id: 4,
    question: "What is the purpose of weather normalisation in performance analysis?",
    options: [
      "To predict weather patterns",
      "To compare performance across different conditions",
      "To adjust tariff rates",
      "To schedule maintenance",
    ],
    correctAnswer: 1,
    explanation:
      "Weather normalisation adjusts performance data for irradiance and temperature variations, enabling fair comparison of performance across different time periods and weather conditions.",
  },
  {
    id: 5,
    question: "What does high inverter clipping indicate about system design?",
    options: [
      "Undersized array",
      "Oversized inverter",
      "Oversized array relative to inverter",
      "Faulty MPPT",
    ],
    correctAnswer: 2,
    explanation:
      "Inverter clipping occurs when the array generates more DC power than the inverter can convert, indicating the DC/AC ratio may be higher than optimal, though some clipping is acceptable.",
  },
  {
    id: 6,
    question: "What monitoring data is essential for warranty claims?",
    options: [
      "Visual inspection photos only",
      "Timestamped performance data and environmental conditions",
      "Customer testimonials",
      "Installation date only",
    ],
    correctAnswer: 1,
    explanation:
      "Warranty claims require timestamped evidence of underperformance along with environmental data (irradiance, temperature) to demonstrate issues occurred under valid test conditions.",
  },
  {
    id: 7,
    question: "What is the typical data logging interval for commercial PV monitoring?",
    options: ["1 second", "5 minutes", "1 hour", "1 day"],
    correctAnswer: 1,
    explanation:
      "Five-minute intervals provide adequate resolution for performance analysis whilst managing data storage requirements. Higher resolution may be used for fault diagnosis.",
  },
  {
    id: 8,
    question: "What does availability percentage measure?",
    options: [
      "Energy production efficiency",
      "Time system was operational vs total time",
      "Grid connection quality",
      "Weather suitability",
    ],
    correctAnswer: 1,
    explanation:
      "Availability measures the percentage of time a system was operational and able to generate power, excluding periods of fault, maintenance, or forced outage.",
  },
  {
    id: 9,
    question: "What temperature coefficient information is needed for performance analysis?",
    options: [
      "Ambient temperature only",
      "Power temperature coefficient (typically negative)",
      "Inverter temperature",
      "Cable temperature",
    ],
    correctAnswer: 1,
    explanation:
      "The power temperature coefficient (typically -0.3% to -0.5% per degree C for silicon) is needed to normalise performance data to standard test conditions (25°C cell temperature).",
  },
  {
    id: 10,
    question: "What trend indicates potential inverter capacitor degradation?",
    options: [
      "Increased morning output",
      "Gradual reduction in efficiency over time",
      "Higher output in winter",
      "Stable efficiency readings",
    ],
    correctAnswer: 1,
    explanation:
      "Gradually declining inverter efficiency over time often indicates capacitor degradation, a common age-related failure mode requiring proactive replacement before complete failure.",
  },
];

const faqs = [
  {
    question: "How often should I review monitoring data for a residential system?",
    answer:
      "For residential systems, weekly automated reports supplemented by monthly detailed reviews are typically sufficient. Set up automatic alerts for significant production drops (e.g., greater than 20% below expected) to catch issues promptly without constant manual monitoring.",
  },
  {
    question: "What causes discrepancies between monitoring data and meter readings?",
    answer:
      "Common causes include monitoring system calibration errors, meter accuracy tolerances, different measurement points (DC vs AC, gross vs net), timing differences in data capture, and communication dropouts causing data gaps. Regular cross-checking helps identify systematic errors.",
  },
  {
    question: "How do I calculate expected output for performance comparison?",
    answer:
      "Expected output = System capacity (kWp) x Irradiance (kWh/m²) x Performance Ratio. Use local irradiance data from weather stations or satellite services, and apply appropriate PR values (typically 0.75-0.85 for well-designed systems).",
  },
  {
    question: "What monitoring features should I specify for new installations?",
    answer:
      "Specify string-level current monitoring, environmental sensors (irradiance, temperature), remote access capability, automatic alert generation, data export functionality, and minimum 5-year data retention. For commercial systems, add revenue-grade metering and API access.",
  },
  {
    question: "How do I identify the cause of gradual performance decline?",
    answer:
      "Compare Performance Ratio trends over time, normalised for weather. Check for new shading sources, soiling patterns, module degradation patterns, and inverter efficiency trends. String-level data helps isolate whether issues are system-wide or localised.",
  },
  {
    question: "What performance data should be included in O&M reports?",
    answer:
      "Include actual vs expected energy, Performance Ratio, availability percentage, fault summary, maintenance completed, irradiance data, string performance comparison, inverter efficiency, and trend analysis. Commercial reports often include financial performance metrics.",
  },
];

const RenewableEnergyModule7Section1 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#1a1a1a]/95 backdrop-blur supports-[backdrop-filter]:bg-[#1a1a1a]/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            to=".."
            className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Module Overview
          </Link>
          <span className="text-sm text-white">Module 7 • Section 1</span>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden py-12 sm:py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-elec-yellow/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-elec-yellow/10 px-4 py-1.5 text-sm font-medium text-elec-yellow">
              <Zap className="h-4 w-4" />
              Operation and Maintenance
            </div>
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              System Monitoring and Performance Analysis
            </h1>
            <p className="text-lg text-white sm:text-xl">
              Understanding monitoring systems, performance metrics, and data analysis for renewable energy installations.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Summary */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border-l-2 border-elec-yellow/50 bg-elec-yellow/5 p-4">
              <h3 className="mb-2 font-semibold text-white">Performance Metrics</h3>
              <p className="text-sm text-white">
                Key indicators including Performance Ratio, Specific Yield, and availability enable objective assessment of system health and identification of issues.
              </p>
            </div>
            <div className="rounded-lg border-l-2 border-elec-yellow/50 bg-elec-yellow/5 p-4">
              <h3 className="mb-2 font-semibold text-white">Remote Monitoring</h3>
              <p className="text-sm text-white">
                Modern monitoring platforms provide real-time data access, automatic alerts, and trend analysis essential for proactive maintenance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Outcomes */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-4 text-xl font-bold text-white">Learning Outcomes</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Understand key performance metrics for renewable systems",
                "Interpret monitoring data to identify issues",
                "Configure and use remote monitoring platforms",
                "Calculate Performance Ratio and Specific Yield",
                "Apply weather normalisation techniques",
                "Generate meaningful performance reports",
              ].map((outcome, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-elec-yellow" />
                  <span className="text-sm text-white">{outcome}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {/* Section 01 */}
          <section className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-elec-yellow text-lg font-bold text-black">
                01
              </span>
              <h2 className="text-2xl font-bold text-white">Key Performance Metrics</h2>
            </div>
            <div className="space-y-4 text-white">
              <p>
                Effective system monitoring relies on understanding and tracking key performance indicators that reveal system health and highlight potential issues.
              </p>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Performance Ratio (PR)</h4>
                <p className="mb-2">
                  The ratio of actual energy output to theoretical maximum based on measured irradiance:
                </p>
                <p className="mb-2 font-mono text-sm">
                  PR = (Actual Energy / (Irradiance x Capacity x Time)) x 100%
                </p>
                <ul className="list-inside list-disc space-y-1">
                  <li>Well-designed system: PR greater than 80%</li>
                  <li>Accounts for all losses (temperature, soiling, inverter, wiring)</li>
                  <li>Enables comparison between different systems and periods</li>
                  <li>Declining PR indicates developing issues</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Specific Yield</h4>
                <p className="mb-2">
                  Annual energy production per unit of installed capacity (kWh/kWp/year):
                </p>
                <ul className="list-inside list-disc space-y-1">
                  <li>UK typical range: 800-1,100 kWh/kWp/year</li>
                  <li>Varies significantly with location and orientation</li>
                  <li>Useful for comparing sites and validating designs</li>
                  <li>Track year-on-year to identify degradation</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">System Availability</h4>
                <p className="mb-2">
                  Percentage of time the system was operational and able to generate:
                </p>
                <ul className="list-inside list-disc space-y-1">
                  <li>Target availability: greater than 98%</li>
                  <li>Excludes scheduled maintenance windows</li>
                  <li>Track fault frequency and duration</li>
                  <li>Important for O&M contract KPIs</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          {/* Section 02 */}
          <section className="mb-12 mt-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-elec-yellow text-lg font-bold text-black">
                02
              </span>
              <h2 className="text-2xl font-bold text-white">Monitoring System Architecture</h2>
            </div>
            <div className="space-y-4 text-white">
              <p>
                Modern monitoring systems collect data from multiple sources to provide comprehensive visibility of system performance and health.
              </p>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Data Collection Points</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li><strong>Inverter data:</strong> DC input, AC output, efficiency, temperatures, fault codes</li>
                  <li><strong>String monitoring:</strong> Individual string currents and voltages</li>
                  <li><strong>Energy meters:</strong> Generation, export, import measurements</li>
                  <li><strong>Environmental sensors:</strong> Irradiance, module temperature, ambient temperature</li>
                  <li><strong>Battery systems:</strong> SoC, cell voltages, temperatures, charge/discharge power</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Communication Protocols</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li><strong>Modbus RTU:</strong> Serial communication over RS485, widely supported</li>
                  <li><strong>Modbus TCP:</strong> Ethernet-based, standard for commercial systems</li>
                  <li><strong>SunSpec:</strong> Standardised data models for interoperability</li>
                  <li><strong>Manufacturer protocols:</strong> Proprietary systems (SolarEdge, Enphase, etc.)</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Monitoring Levels</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="py-2 text-left text-white">Level</th>
                        <th className="py-2 text-left text-white">Data</th>
                        <th className="py-2 text-left text-white">Application</th>
                      </tr>
                    </thead>
                    <tbody className="text-white">
                      <tr className="border-b border-white/10">
                        <td className="py-2">System</td>
                        <td className="py-2">Total generation, export</td>
                        <td className="py-2">Basic monitoring</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-2">Inverter</td>
                        <td className="py-2">Per-inverter performance</td>
                        <td className="py-2">Fault isolation</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-2">String</td>
                        <td className="py-2">Individual string data</td>
                        <td className="py-2">Detailed diagnosis</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-2">Module</td>
                        <td className="py-2">Per-panel optimisation</td>
                        <td className="py-2">Maximum visibility</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          {/* Section 03 */}
          <section className="mb-12 mt-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-elec-yellow text-lg font-bold text-black">
                03
              </span>
              <h2 className="text-2xl font-bold text-white">Data Analysis Techniques</h2>
            </div>
            <div className="space-y-4 text-white">
              <p>
                Raw monitoring data must be processed and analysed to extract meaningful insights about system performance and identify developing issues.
              </p>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Weather Normalisation</h4>
                <p className="mb-2">
                  Adjusting performance data for environmental conditions enables fair comparison:
                </p>
                <ul className="list-inside list-disc space-y-1">
                  <li><strong>Irradiance correction:</strong> Normalise to standard 1000 W/m²</li>
                  <li><strong>Temperature correction:</strong> Apply module temperature coefficients</li>
                  <li><strong>Reference cells:</strong> Use calibrated irradiance sensors</li>
                  <li><strong>Satellite data:</strong> Alternative when sensors unavailable</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Trend Analysis</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li><strong>Rolling averages:</strong> Smooth daily variations for trend identification</li>
                  <li><strong>Year-on-year comparison:</strong> Account for seasonal and weather variations</li>
                  <li><strong>Degradation tracking:</strong> Monitor long-term performance decline</li>
                  <li><strong>Anomaly detection:</strong> Identify sudden changes requiring investigation</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Comparative Analysis</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li><strong>String comparison:</strong> Identify underperforming strings</li>
                  <li><strong>Inverter comparison:</strong> Spot efficiency variations</li>
                  <li><strong>Fleet benchmarking:</strong> Compare similar systems</li>
                  <li><strong>Design validation:</strong> Compare actual vs predicted yield</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          {/* Section 04 */}
          <section className="mb-12 mt-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-elec-yellow text-lg font-bold text-black">
                04
              </span>
              <h2 className="text-2xl font-bold text-white">Alert Configuration and Response</h2>
            </div>
            <div className="space-y-4 text-white">
              <p>
                Effective alert systems provide early warning of issues without overwhelming operators with false alarms.
              </p>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Alert Categories</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li><strong>Critical:</strong> Complete system failure, safety issues (immediate response)</li>
                  <li><strong>Warning:</strong> Significant underperformance, component faults (same-day response)</li>
                  <li><strong>Advisory:</strong> Minor issues, developing trends (scheduled review)</li>
                  <li><strong>Informational:</strong> Status updates, scheduled events (no action required)</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Common Alert Thresholds</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li>Performance drop: greater than 10-20% below expected (after weather normalisation)</li>
                  <li>String current imbalance: greater than 5% variation between parallel strings</li>
                  <li>Communication loss: greater than 1 hour without data</li>
                  <li>Inverter efficiency: below 95% of rated specification</li>
                  <li>Zero production: during daylight hours with adequate irradiance</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Response Procedures</h4>
                <ol className="list-inside list-decimal space-y-2">
                  <li>Acknowledge alert and review monitoring data</li>
                  <li>Check for obvious causes (weather, grid outage, scheduled work)</li>
                  <li>Review historical data for patterns or previous occurrences</li>
                  <li>Attempt remote diagnosis or reset if applicable</li>
                  <li>Schedule site visit if issue cannot be resolved remotely</li>
                  <li>Document findings and actions taken</li>
                </ol>
              </div>
            </div>
          </section>

          <InlineCheck
            question={quickCheckQuestions[3].question}
            options={quickCheckQuestions[3].options}
            correctIndex={quickCheckQuestions[3].correctIndex}
            explanation={quickCheckQuestions[3].explanation}
          />

          {/* Section 05 */}
          <section className="mb-12 mt-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-elec-yellow text-lg font-bold text-black">
                05
              </span>
              <h2 className="text-2xl font-bold text-white">Reporting and Documentation</h2>
            </div>
            <div className="space-y-4 text-white">
              <p>
                Regular performance reports provide stakeholders with system status information and support maintenance planning and warranty claims.
              </p>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Report Contents</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li><strong>Executive summary:</strong> Key metrics and highlights</li>
                  <li><strong>Energy production:</strong> Actual vs expected, with variance analysis</li>
                  <li><strong>Performance indicators:</strong> PR, availability, efficiency trends</li>
                  <li><strong>Environmental data:</strong> Irradiance, temperatures, weather summary</li>
                  <li><strong>Fault summary:</strong> Alarms raised, duration, resolution</li>
                  <li><strong>Maintenance log:</strong> Work completed, upcoming schedules</li>
                  <li><strong>Recommendations:</strong> Actions to improve performance</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Report Frequency</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="py-2 text-left text-white">Type</th>
                        <th className="py-2 text-left text-white">Frequency</th>
                        <th className="py-2 text-left text-white">Content Focus</th>
                      </tr>
                    </thead>
                    <tbody className="text-white">
                      <tr className="border-b border-white/10">
                        <td className="py-2">Operational</td>
                        <td className="py-2">Weekly/Monthly</td>
                        <td className="py-2">Production, faults, actions</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-2">Performance</td>
                        <td className="py-2">Monthly/Quarterly</td>
                        <td className="py-2">KPIs, trends, analysis</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-2">Annual</td>
                        <td className="py-2">Yearly</td>
                        <td className="py-2">Comprehensive review</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* Practical Guidance */}
          <section className="mb-12 mt-12">
            <div className="rounded-xl border border-elec-yellow/30 bg-elec-yellow/5 p-6">
              <h2 className="mb-4 text-xl font-bold text-white">Practical Guidance</h2>
              <div className="space-y-4 text-white">
                <div>
                  <h4 className="font-semibold text-elec-yellow">Setting Up Effective Monitoring</h4>
                  <p className="mt-1 text-sm">
                    Ensure sensors are correctly calibrated and positioned. Configure appropriate alert thresholds based on system characteristics. Establish clear escalation procedures and responsibilities for alert response.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-elec-yellow">Data Quality Management</h4>
                  <p className="mt-1 text-sm">
                    Regularly verify data against independent measurements (e.g., meter readings). Address communication gaps promptly. Maintain calibration records for sensors. Document any data quality issues affecting analysis.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-elec-yellow">Using Data for Maintenance Planning</h4>
                  <p className="mt-1 text-sm">
                    Track component-level performance to identify degradation before failure. Use historical fault data to predict maintenance needs. Schedule preventive maintenance based on trends rather than just calendar intervals.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-white">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <h3 className="mb-2 font-semibold text-elec-yellow">{faq.question}</h3>
                  <p className="text-sm text-white">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Quiz Section */}
          <section className="mb-12">
            <Quiz
              title="System Monitoring Quiz"
              questions={quizQuestions}
              onComplete={(score) => console.log("Quiz completed with score:", score)}
            />
          </section>

          {/* Navigation */}
          <nav className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:justify-between">
            <Link to="/upskilling/renewable-energy/module-6/section-5">
              <Button variant="outline" className="w-full gap-2 border-white/20 text-white hover:bg-white/10 sm:w-auto">
                <ArrowLeft className="h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="/upskilling/renewable-energy/module-7/section-2">
              <Button className="w-full gap-2 bg-elec-yellow text-black hover:bg-elec-yellow/90 sm:w-auto">
                Next Section
                <ArrowLeft className="h-4 w-4 rotate-180" />
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule7Section1;
