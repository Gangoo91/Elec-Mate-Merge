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
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-white/10">
        <div className="px-4 py-3 flex items-center gap-3">
          <Link to="..">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <span className="text-white font-medium truncate">System Monitoring & Performance</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="px-4 py-6 text-center">
        <div className="inline-flex items-center gap-2 bg-elec-yellow/10 border border-elec-yellow/30 rounded-full px-3 py-1 mb-3">
          <Zap className="w-4 h-4 text-elec-yellow" />
          <span className="text-elec-yellow text-sm font-medium">Module 7 - Section 1</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          System Monitoring & Performance Analysis
        </h1>
        <p className="text-white/70 text-sm sm:text-base max-w-xl mx-auto">
          Understanding monitoring systems, performance metrics, and data analysis for renewable energy installations
        </p>
      </div>

      {/* Quick Summary */}
      <div className="px-4 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">In 30 Seconds:</span> Performance Ratio compares actual vs theoretical output to assess system health
            </p>
          </div>
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">Spot it:</span> PR above 80% indicates a well-designed and maintained system
            </p>
          </div>
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">Use it:</span> String-level monitoring isolates faults to specific strings
            </p>
          </div>
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">Key Metric:</span> Specific Yield (kWh/kWp/year) enables cross-system comparison
            </p>
          </div>
        </div>
      </div>

      {/* Learning Outcomes */}
      <div className="px-4 pb-6">
        <h2 className="text-lg font-semibold text-white mb-3">What You Will Learn</h2>
        <div className="space-y-2">
          {[
            "Understand key performance metrics for renewable systems",
            "Interpret monitoring data to identify issues",
            "Configure and use remote monitoring platforms",
            "Calculate Performance Ratio and Specific Yield",
            "Apply weather normalisation techniques",
            "Generate meaningful performance reports",
          ].map((outcome, index) => (
            <div key={index} className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-elec-yellow mt-0.5 shrink-0" />
              <span className="text-white/80 text-sm">{outcome}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 space-y-6 pb-8">
        {/* Section 01 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">01</span>
            <h2 className="text-xl font-semibold text-white">Key Performance Metrics</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Effective system monitoring relies on understanding and tracking key performance indicators that reveal system health and highlight potential issues.
            </p>
            <p>
              <span className="text-white font-medium">Performance Ratio (PR):</span> The ratio of actual energy output to theoretical maximum based on measured irradiance. Calculated as PR = (Actual Energy / (Irradiance x Capacity x Time)) x 100%. Well-designed systems achieve PR greater than 80%. This accounts for all losses including temperature, soiling, inverter, and wiring losses.
            </p>
            <p>
              <span className="text-white font-medium">Specific Yield:</span> Annual energy production per unit of installed capacity (kWh/kWp/year). UK typical range is 800-1,100 kWh/kWp/year. Varies significantly with location and orientation, useful for comparing sites and validating designs. Track year-on-year to identify degradation.
            </p>
            <p>
              <span className="text-white font-medium">System Availability:</span> Percentage of time the system was operational and able to generate. Target availability is greater than 98%. This excludes scheduled maintenance windows and tracks fault frequency and duration. Important for O&M contract KPIs.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[0]]} />

        {/* Section 02 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">02</span>
            <h2 className="text-xl font-semibold text-white">Monitoring System Architecture</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Modern monitoring systems collect data from multiple sources to provide comprehensive visibility of system performance and health.
            </p>
            <p>
              <span className="text-white font-medium">Data Collection Points:</span> Inverter data includes DC input, AC output, efficiency, temperatures, and fault codes. String monitoring provides individual string currents and voltages. Energy meters record generation, export, and import measurements. Environmental sensors capture irradiance, module temperature, and ambient temperature.
            </p>
            <p>
              <span className="text-white font-medium">Communication Protocols:</span> Modbus RTU is serial communication over RS485, widely supported. Modbus TCP is Ethernet-based and standard for commercial systems. SunSpec provides standardised data models for interoperability. Manufacturer protocols are proprietary systems from SolarEdge, Enphase, and others.
            </p>
            <p>
              <span className="text-white font-medium">Monitoring Levels:</span> System level provides total generation and export for basic monitoring. Inverter level shows per-inverter performance for fault isolation. String level enables detailed diagnosis through individual string data. Module level offers maximum visibility through per-panel optimisation.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[1]]} />

        {/* Section 03 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">03</span>
            <h2 className="text-xl font-semibold text-white">Data Analysis Techniques</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Raw monitoring data must be processed and analysed to extract meaningful insights about system performance and identify developing issues.
            </p>
            <p>
              <span className="text-white font-medium">Weather Normalisation:</span> Adjusting performance data for environmental conditions enables fair comparison. Irradiance correction normalises to standard 1000 W/m². Temperature correction applies module temperature coefficients. Reference cells provide calibrated irradiance measurements, whilst satellite data offers an alternative when sensors are unavailable.
            </p>
            <p>
              <span className="text-white font-medium">Trend Analysis:</span> Rolling averages smooth daily variations for trend identification. Year-on-year comparison accounts for seasonal and weather variations. Degradation tracking monitors long-term performance decline, and anomaly detection identifies sudden changes requiring investigation.
            </p>
            <p>
              <span className="text-white font-medium">Comparative Analysis:</span> String comparison identifies underperforming strings. Inverter comparison spots efficiency variations. Fleet benchmarking compares similar systems, and design validation compares actual versus predicted yield.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[2]]} />

        {/* Section 04 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">04</span>
            <h2 className="text-xl font-semibold text-white">Alert Configuration and Response</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Effective alert systems provide early warning of issues without overwhelming operators with false alarms.
            </p>
            <p>
              <span className="text-white font-medium">Alert Categories:</span> Critical alerts cover complete system failure and safety issues requiring immediate response. Warning alerts address significant underperformance and component faults requiring same-day response. Advisory alerts note minor issues and developing trends for scheduled review. Informational alerts provide status updates and scheduled events requiring no action.
            </p>
            <p>
              <span className="text-white font-medium">Common Alert Thresholds:</span> Performance drop alerts trigger at greater than 10-20% below expected after weather normalisation. String current imbalance alerts at greater than 5% variation between parallel strings. Communication loss alerts after greater than 1 hour without data. Inverter efficiency alerts when below 95% of rated specification.
            </p>
            <p>
              <span className="text-white font-medium">Response Procedures:</span> Acknowledge alert and review monitoring data. Check for obvious causes such as weather, grid outage, or scheduled work. Review historical data for patterns or previous occurrences. Attempt remote diagnosis or reset if applicable, then schedule site visit if issue cannot be resolved remotely.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[3]]} />

        {/* Section 05 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">05</span>
            <h2 className="text-xl font-semibold text-white">Reporting and Documentation</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Regular performance reports provide stakeholders with system status information and support maintenance planning and warranty claims.
            </p>
            <p>
              <span className="text-white font-medium">Report Contents:</span> Executive summary covers key metrics and highlights. Energy production section shows actual vs expected with variance analysis. Performance indicators include PR, availability, and efficiency trends. Environmental data provides irradiance, temperatures, and weather summary. Fault summary lists alarms raised with duration and resolution.
            </p>
            <p>
              <span className="text-white font-medium">Report Frequency:</span> Operational reports are weekly or monthly focusing on production, faults, and actions. Performance reports are monthly or quarterly covering KPIs, trends, and analysis. Annual reports provide comprehensive yearly reviews.
            </p>
            <p>
              <span className="text-white font-medium">Documentation Requirements:</span> Maintain calibration records for all sensors. Document any data quality issues affecting analysis. Keep historical data for warranty claims and long-term trend analysis. Ensure reports meet O&M contract requirements.
            </p>
          </div>
        </section>

        {/* Practical Guidance */}
        <div className="bg-gradient-to-r from-elec-yellow/10 to-amber-500/10 border border-elec-yellow/20 rounded-xl p-4">
          <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
            <Zap className="w-4 h-4 text-elec-yellow" />
            Practical Guidance
          </h3>
          <div className="space-y-2 text-white/80 text-sm">
            <p>
              <span className="text-white font-medium">Setting up effective monitoring:</span> Ensure sensors are correctly calibrated and positioned. Configure appropriate alert thresholds based on system characteristics. Establish clear escalation procedures and responsibilities for alert response.
            </p>
            <p>
              <span className="text-white font-medium">Data quality management:</span> Regularly verify data against independent measurements such as meter readings. Address communication gaps promptly. Maintain calibration records for sensors and document any data quality issues affecting analysis.
            </p>
            <p>
              <span className="text-white font-medium">Using data for maintenance planning:</span> Track component-level performance to identify degradation before failure. Use historical fault data to predict maintenance needs. Schedule preventive maintenance based on trends rather than just calendar intervals.
            </p>
          </div>
        </div>

        {/* FAQs */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h3 className="text-white font-medium mb-2">{faq.question}</h3>
                <p className="text-white/70 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz
          title="System Monitoring Quiz"
          questions={quizQuestions}
        />

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center pt-4 border-t border-white/10">
          <Link to="/upskilling/renewable-energy/module-6/section-5">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Module
            </Button>
          </Link>
          <Link to="../section-2">
            <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule7Section1;
