import { ArrowLeft, FileText, CheckCircle, HelpCircle, BarChart, TrendingUp, Database } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from '@/hooks/useSEO';

const InstrumentationModule4Section5 = () => {
  useSEO({
    title: "Interpreting and Logging Readings | Instrumentation Module 4",
    description: "Learn how to interpret measurement data and implement effective logging systems for real-world industrial applications."
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="px-4 py-3">
          <Link to=".." className="inline-flex items-center text-white hover:text-elec-yellow transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span className="text-sm">Back to Module 4</span>
          </Link>
        </div>
      </div>

      <div className="px-4 py-6 max-w-4xl mx-auto">
        {/* Title */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-elec-yellow/20 mb-4">
            <FileText className="h-6 w-6 text-elec-yellow" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Interpreting and Logging Readings in Real-World Systems
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Measurements mean little without interpretation. Learn how to apply data to real scenarios and document effectively for maintenance and compliance.
          </p>
        </div>

        {/* Quick Summary */}
        <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 mb-8">
          <h2 className="font-semibold text-white mb-2 flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-elec-yellow" />
            What You Will Learn
          </h2>
          <ul className="text-white/80 text-sm space-y-1">
            <li>- Analysing readings for system status and performance indicators</li>
            <li>- Identifying patterns, trends, and anomalies in measurement data</li>
            <li>- Implementing proper logging and reporting procedures</li>
            <li>- Using measurement data for predictive maintenance strategies</li>
            <li>- Building comprehensive diagnoses from multiple measurement sources</li>
          </ul>
        </div>

        {/* Section 01: Comparing Readings to Baselines */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">01</span>
            <h2 className="text-xl font-semibold text-white">Comparing Readings to Baselines</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Baseline measurements provide reference points for comparison. Without knowing what is normal, it is impossible to identify abnormal readings or developing problems.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <h3 className="text-blue-300 font-medium mb-3 flex items-center gap-2">
                  <BarChart className="h-4 w-4" />
                  Initial Commissioning Data
                </h3>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>- Motor current at rated load</li>
                  <li>- System operating temperatures</li>
                  <li>- Voltage levels under normal conditions</li>
                  <li>- Vibration and noise signatures</li>
                </ul>
              </div>
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <h3 className="text-green-300 font-medium mb-3">Performance Standards</h3>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>- Manufacturer specifications</li>
                  <li>- Industry standard values</li>
                  <li>- Historical performance data</li>
                  <li>- Regulatory compliance limits</li>
                </ul>
              </div>
            </div>

            <div className="bg-elec-yellow/10 border border-elec-yellow/20 rounded-lg p-4">
              <h3 className="text-elec-yellow font-medium mb-3">Variance Analysis Guidelines</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center py-1 border-b border-white/10">
                  <span className="text-white">+/-5% variation</span>
                  <span className="text-green-400">Normal operating range</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-white/10">
                  <span className="text-white">+/-10% variation</span>
                  <span className="text-yellow-400">Investigation recommended</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-white">&gt;+/-15% variation</span>
                  <span className="text-red-400">Action required</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <InlineCheck
          question="Why is timestamping measurements important?"
          answer="To track trends and correlate events over time"
          explanation="Timestamping allows correlation of measurements with events, tracking of trends over time, and proper sequence analysis for troubleshooting."
        />

        {/* Section 02: Recognising Anomalies and Patterns */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">02</span>
            <h2 className="text-xl font-semibold text-white">Recognising Anomalies and Patterns</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <h3 className="text-red-300 font-medium mb-2">Voltage Dips</h3>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>- Starting of large motors</li>
                  <li>- Transformer overloading</li>
                  <li>- Poor connections developing</li>
                  <li>- Supply system problems</li>
                </ul>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                <h3 className="text-orange-300 font-medium mb-2">Current Surges</h3>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>- Motor bearing deterioration</li>
                  <li>- Pump cavitation or blockage</li>
                  <li>- Insulation breakdown starting</li>
                  <li>- Mechanical binding or friction</li>
                </ul>
              </div>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
              <h3 className="text-purple-300 font-medium mb-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Trend Patterns to Watch
              </h3>
              <div className="space-y-3">
                <div>
                  <h4 className="text-white text-sm font-medium">Gradual Increase</h4>
                  <p className="text-white/60 text-sm">Often indicates wear, dirt accumulation, or developing mechanical problems</p>
                </div>
                <div>
                  <h4 className="text-white text-sm font-medium">Cyclic Variations</h4>
                  <p className="text-white/60 text-sm">May indicate temperature effects, load cycling, or seasonal influences</p>
                </div>
                <div>
                  <h4 className="text-white text-sm font-medium">Sudden Changes</h4>
                  <p className="text-white/60 text-sm">Usually indicate specific events: repairs, adjustments, or component failures</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <InlineCheck
          question="What does a steady increase in motor current often indicate?"
          answer="Equipment degradation or a failing component"
          explanation="A steady increase in current often indicates equipment degradation, increased friction in motors, worn bearings, or other developing problems that increase mechanical load."
        />

        {/* Section 03: Documentation and Logging Systems */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">03</span>
            <h2 className="text-xl font-semibold text-white">Documentation and Logging Systems</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                <Database className="h-4 w-4 text-elec-yellow" />
                Essential Documentation Elements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="text-white font-medium">Timestamp</span>
                    <p className="text-white/60">Date, time, and duration of measurement</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="text-white font-medium">Equipment ID</span>
                    <p className="text-white/60">Clear identification and location</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="text-white font-medium">Operating Conditions</span>
                    <p className="text-white/60">Load, temperature, environmental factors</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="text-white font-medium">Measurement Values</span>
                    <p className="text-white/60">Actual readings with units and accuracy</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="text-white font-medium">Technician Details</span>
                    <p className="text-white/60">Who performed the measurement</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="text-white font-medium">Observations</span>
                    <p className="text-white/60">Unusual conditions or concerns noted</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <h3 className="text-blue-300 font-medium mb-2">Data Loggers</h3>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>- Automatic data collection</li>
                  <li>- Long-term monitoring</li>
                  <li>- Battery powered operation</li>
                  <li>- Multiple sensor inputs</li>
                </ul>
              </div>
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <h3 className="text-green-300 font-medium mb-2">SCADA Systems</h3>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>- Real-time monitoring</li>
                  <li>- Centralised data collection</li>
                  <li>- Alarm and notification</li>
                  <li>- Historical data analysis</li>
                </ul>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                <h3 className="text-purple-300 font-medium mb-2">Mobile Apps</h3>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>- Field data entry</li>
                  <li>- Photo documentation</li>
                  <li>- Instant report generation</li>
                  <li>- Cloud synchronisation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <InlineCheck
          question="What tools assist with digital logging of measurement data?"
          answer="Data loggers, SCADA systems, and mobile apps"
          explanation="Modern digital logging uses various tools from simple data loggers for standalone monitoring, to sophisticated SCADA systems for centralised control, and mobile applications for convenient field data collection."
        />

        {/* Section 04: Building Comprehensive Diagnoses */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">04</span>
            <h2 className="text-xl font-semibold text-white">Building Comprehensive Diagnoses</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Effective diagnosis requires correlation of multiple measurements. Individual readings only tell part of the story - patterns across multiple parameters reveal the true system condition.
            </p>

            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-white font-medium mb-3">Multi-Parameter Analysis Examples</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between py-2 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="text-white">Motor Current ↑</span>
                    <span className="text-white/40">+</span>
                    <span className="text-white">Vibration ↑</span>
                  </div>
                  <span className="text-red-400">=</span>
                  <span className="text-red-400">Bearing Problem</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="text-white">Voltage ↓</span>
                    <span className="text-white/40">+</span>
                    <span className="text-white">Current ↑</span>
                  </div>
                  <span className="text-yellow-400">=</span>
                  <span className="text-yellow-400">Supply Problem</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <span className="text-white">Temperature ↑</span>
                    <span className="text-white/40">+</span>
                    <span className="text-white">Resistance ↓</span>
                  </div>
                  <span className="text-orange-400">=</span>
                  <span className="text-orange-400">Insulation Issue</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 05: Predictive Maintenance */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">05</span>
            <h2 className="text-xl font-semibold text-white">Predictive Maintenance Benefits</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Systematic logging and trend analysis enable predictive maintenance - identifying developing issues before they cause failures. This approach reduces unplanned downtime and extends equipment life.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-500/10 border-l-2 border-green-500/50 rounded-r-lg p-4">
                <h3 className="text-green-300 font-medium mb-2">Benefits</h3>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>- Reduced unplanned downtime</li>
                  <li>- Optimised maintenance scheduling</li>
                  <li>- Extended equipment lifespan</li>
                  <li>- Lower overall maintenance costs</li>
                  <li>- Improved safety through early detection</li>
                </ul>
              </div>
              <div className="bg-blue-500/10 border-l-2 border-blue-500/50 rounded-r-lg p-4">
                <h3 className="text-blue-300 font-medium mb-2">Key Indicators</h3>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>- Gradual current increases</li>
                  <li>- Temperature rise trends</li>
                  <li>- Vibration signature changes</li>
                  <li>- Insulation resistance decline</li>
                  <li>- Frequency or speed variations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Section 06: Real-World Scenario */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">06</span>
            <h2 className="text-xl font-semibold text-white">Real-World Application</h2>
          </div>

          <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
            <h3 className="text-white font-medium mb-2">Power Substation Monitoring</h3>
            <p className="text-white/70">
              In a power substation, engineers track current draw hourly. A gradual rise over three days signals a failing pump motor. By analysing the trend data and correlating with vibration readings, they schedule maintenance during a planned outage rather than experiencing an unexpected failure. The systematic logging approach prevented costly emergency repairs and potential equipment damage.
            </p>
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="h-5 w-5 text-elec-yellow" />
            <h2 className="text-xl font-semibold text-white">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-white font-medium mb-2">How often should I log measurements?</h3>
              <p className="text-white/70 text-sm">
                It depends on the application. Critical equipment may need continuous monitoring. Routine maintenance logs are typically daily, weekly, or monthly. Establish frequency based on equipment criticality, failure history, and regulatory requirements.
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-white font-medium mb-2">What is the benefit of trending data over time?</h3>
              <p className="text-white/70 text-sm">
                Trending reveals gradual changes that indicate developing problems, enabling predictive maintenance before failures occur. Single snapshots cannot show whether a reading is stable, improving, or deteriorating.
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-white font-medium mb-2">How can logging prevent unplanned downtime?</h3>
              <p className="text-white/70 text-sm">
                By identifying developing issues early, logging allows planned maintenance before unexpected failures occur. This enables scheduling repairs during convenient times rather than emergency situations.
              </p>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white/5 rounded-lg p-4 mb-8">
          <h2 className="text-white font-semibold mb-2">Summary</h2>
          <p className="text-white/70">
            Correct interpretation transforms raw numbers into action. Good logging supports predictive maintenance and regulatory compliance. By establishing baselines, recognising patterns, and maintaining comprehensive documentation, instrumentation professionals can ensure system reliability and prevent costly failures.
          </p>
        </div>

        {/* Quiz */}
        <SingleQuestionQuiz
          moduleId="instrumentation-4"
          sectionId="section-5"
          question="How can systematic logging prevent unplanned downtime?"
          options={[
            "By making equipment more reliable",
            "By identifying developing issues before they cause failures",
            "By reducing power consumption",
            "By eliminating operator errors"
          ]}
          correctAnswer={1}
          explanation="Systematic logging and analysis can identify developing problems early through trend analysis, allowing planned maintenance before unexpected failures occur. This transforms reactive maintenance into proactive prevention."
        />

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/10">
          <Link to="../section-4">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <Link to="/upskilling/instrumentation-module-5">
            <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
              Next Module
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InstrumentationModule4Section5;
