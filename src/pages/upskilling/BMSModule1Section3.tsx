import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import { bmsModule1Section3QuizData } from "@/data/upskilling/bmsModule1Section3QuizData";
import useSEO from "@/hooks/useSEO";

const TITLE = "Benefits of BMS: Efficiency, Comfort, Control - BMS Module 1 Section 3";
const DESCRIPTION = "Learn the three main benefits of Building Management Systems: energy efficiency, occupant comfort, and centralised control. ROI analysis and implementation strategies.";

const quickCheckQuestions = [
  {
    id: "energy-reduction",
    question: "How does a BMS help reduce wasted energy in heating or cooling?",
    options: [
      "By running systems at maximum capacity constantly",
      "By using occupancy scheduling, weather compensation, and zone-based control",
      "By turning off all systems permanently",
      "By relying solely on manual adjustments"
    ],
    correctIndex: 1,
    explanation: "BMS reduces energy waste through demand-based control, using occupancy scheduling, weather compensation, and zone-based control to operate systems only when and where needed."
  },
  {
    id: "comfort-improvement",
    question: "Give one way BMS improves comfort for building occupants.",
    options: [
      "By keeping all rooms at the same temperature regardless of use",
      "By automatic adjustments based on environmental conditions or occupancy",
      "By disabling all environmental controls",
      "By requiring manual temperature adjustments"
    ],
    correctIndex: 1,
    explanation: "BMS improves comfort through automatic adjustments based on environmental conditions, occupancy patterns, and even weather forecasts, maintaining consistent conditions proactively."
  },
  {
    id: "centralised-advantage",
    question: "What is one advantage of centralised control through a BMS?",
    options: [
      "Increased response times to issues",
      "Single point visibility, faster response times, and improved operational efficiency",
      "Less visibility into building systems",
      "More manual intervention required"
    ],
    correctIndex: 1,
    explanation: "Centralised control provides unprecedented visibility into all building systems, enabling faster response times, proactive management, and improved operational efficiency."
  },
  {
    id: "equipment-life",
    question: "How does BMS contribute to extending the lifespan of equipment?",
    options: [
      "By running equipment at maximum capacity continuously",
      "By operating equipment at optimal efficiency points and enabling predictive maintenance",
      "By ignoring maintenance schedules",
      "By overriding all safety limits"
    ],
    correctIndex: 1,
    explanation: "BMS extends equipment life through operational optimisation (running at optimal efficiency points) and predictive maintenance based on actual equipment performance data."
  }
];

const faqs = [
  {
    question: "What energy savings can typically be achieved with BMS?",
    answer: "Modern buildings typically achieve 15-30% energy reduction through intelligent system optimisation, with payback periods of 2-5 years through energy savings alone."
  },
  {
    question: "How does BMS improve occupant productivity?",
    answer: "Research indicates proper environmental control can improve cognitive performance by up to 15% and reduce sick building syndrome symptoms significantly through optimal temperature, humidity, and air quality management."
  },
  {
    question: "What compliance standards does BMS help with?",
    answer: "BMS supports EN 15232 (building automation energy performance), MEES regulations, Building Regulations Part L, BREEAM/LEED certifications, and corporate ESG reporting requirements."
  }
];

const BMSModule1Section3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bms-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 1.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Benefits of BMS: Efficiency, Comfort, Control
          </h1>
          <p className="text-white/80">
            Advantages and value proposition for modern buildings
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Energy:</strong> 15-30% reduction, 2-5 year payback</li>
              <li><strong>Comfort:</strong> Up to 15% productivity improvement</li>
              <li><strong>Control:</strong> Centralised monitoring, faster response</li>
              <li><strong>Compliance:</strong> EN 15232, Part L, BREEAM/LEED</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Energy reports, comfort complaints, maintenance logs</li>
              <li><strong>Use:</strong> Client discussions, project justification</li>
              <li><strong>Apply:</strong> ROI calculations, compliance documentation</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the three main benefits of BMS and their measurable impacts",
              "Describe how BMS reduces energy waste and operating costs",
              "Recognise how BMS contributes to comfort and productivity",
              "Understand how centralised control improves building operations",
              "Apply knowledge of BMS benefits to client discussions"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Energy Efficiency */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Energy Efficiency and Cost Savings
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Energy efficiency represents the most quantifiable benefit of BMS implementation. Modern
              buildings typically achieve <strong>15-30% energy reduction</strong> through intelligent
              system optimisation, translating directly to operational cost savings.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Energy Optimisation Strategies:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Demand-Based Control:</strong> Systems operate based on actual occupancy, not fixed schedules</li>
                <li><strong>Load Shedding:</strong> Non-critical systems reduce power during peak demand periods</li>
                <li><strong>Free Cooling:</strong> Maximise outside air when conditions permit</li>
                <li><strong>Equipment Optimisation:</strong> Motors, pumps, fans operate at optimal efficiency</li>
                <li><strong>Thermal Mass Management:</strong> Pre-cooling/heating during off-peak periods</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Occupant Comfort */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Occupant Comfort and Wellbeing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Optimal environmental conditions directly impact occupant productivity, health, and satisfaction.
              Research indicates proper environmental control can improve cognitive performance by <strong>up to 15%</strong>.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Environmental Parameters</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Temperature:</strong> ±1°C accuracy with zone-based management</li>
                  <li><strong>Humidity:</strong> 40-60% RH for optimal comfort</li>
                  <li><strong>Air Quality:</strong> CO₂, VOCs, and particulate monitoring</li>
                  <li><strong>Lighting:</strong> Daylight harvesting and circadian support</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Type Applications</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Offices:</strong> Productivity optimisation</li>
                  <li><strong>Healthcare:</strong> Infection control and patient comfort</li>
                  <li><strong>Education:</strong> Learning environment optimisation</li>
                  <li><strong>Retail:</strong> Customer experience enhancement</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Centralised Control */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Centralised Monitoring and Control
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Centralised control transforms building operations from reactive maintenance to proactive management.
              Facility managers gain unprecedented visibility into all building systems through integrated dashboards.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Monitored Systems</p>
                <ul className="text-sm text-white space-y-1">
                  <li>HVAC equipment and zones</li>
                  <li>Lighting circuits and emergency systems</li>
                  <li>Fire detection and suppression</li>
                  <li>Security and access control</li>
                  <li>Electrical distribution and metering</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Control Capabilities</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Remote equipment operation</li>
                  <li>Schedule management and overrides</li>
                  <li>Alarm acknowledgement and response</li>
                  <li>Energy demand management</li>
                  <li>Predictive maintenance scheduling</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Long-Term Value */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Long-Term Value and Compliance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Beyond immediate operational benefits, BMS delivers substantial long-term value through
              compliance support, asset protection, and future-proofing capabilities.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Regulatory Compliance</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>EN 15232:</strong> Building automation energy performance</li>
                  <li><strong>MEES:</strong> Minimum Energy Efficiency Standards</li>
                  <li><strong>Part L:</strong> Energy conservation compliance</li>
                  <li><strong>BREEAM/LEED:</strong> Sustainability certification</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Asset Protection</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Predictive Maintenance:</strong> Data-driven scheduling</li>
                  <li><strong>Equipment Optimisation:</strong> Reduced wear</li>
                  <li><strong>Fault Prevention:</strong> Early detection</li>
                  <li><strong>Documentation:</strong> Complete operational history</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05: ROI Analysis */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Implementation ROI Analysis
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cost Structure</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Initial:</strong> Hardware, software, installation, commissioning</li>
                  <li><strong>Ongoing:</strong> Licensing, support, maintenance, training</li>
                  <li><strong>Payback:</strong> Typically 2-5 years through energy savings</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Value Realisation</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Energy:</strong> 15-30% cost reductions</li>
                  <li><strong>Maintenance:</strong> 10-20% savings</li>
                  <li><strong>Equipment Life:</strong> 20-40% extension</li>
                  <li><strong>Building Value:</strong> Premium rental rates</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm text-white">
                <strong>Phased Implementation:</strong> Large installations benefit from starting with high-impact
                areas (HVAC and lighting), demonstrating value early and allowing operational experience before full deployment.
              </p>
            </div>
          </div>
        </section>

        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Client Communication</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Highlight energy savings as primary selling point - measurable and immediate</li>
                <li>Emphasise comfort improvements for productivity and satisfaction</li>
                <li>Demonstrate centralised control through mobile app examples</li>
                <li>Present compliance advantages for future-proofing investments</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Excellence</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Ensure accurate sensor placement for optimal monitoring</li>
                <li>Maintain proper cable segregation between power and data</li>
                <li>Verify all control connections before commissioning</li>
                <li>Document all installations for effective maintenance</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Pitfalls to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Unrealistic expectations</strong> — set clear performance metrics and timelines</li>
                <li><strong>Insufficient training</strong> — staff training is essential for system effectiveness</li>
                <li><strong>No follow-up reviews</strong> — regular optimisation ensures continued performance</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Case Study */}
        <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
          <p className="text-sm font-medium text-elec-yellow mb-2">Case Study: Retail Chain BMS Implementation</p>
          <p className="text-sm text-white mb-3">
            A major UK retail chain implemented BMS across 150 stores with remarkable results:
          </p>
          <ul className="text-sm text-white space-y-1">
            <li><strong>18% energy reduction</strong> across all sites</li>
            <li><strong>£400,000 annual savings</strong> in energy costs</li>
            <li><strong>24-month payback period</strong></li>
            <li><strong>30% maintenance cost reduction</strong></li>
          </ul>
        </div>

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

        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Core Benefits</p>
                <ul className="space-y-0.5">
                  <li>Energy efficiency - 15-30% savings</li>
                  <li>Occupant comfort - 15% productivity gain</li>
                  <li>Centralised control - faster response</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">ROI Metrics</p>
                <ul className="space-y-0.5">
                  <li>Payback period: 2-5 years</li>
                  <li>Equipment life: 20-40% extension</li>
                  <li>Maintenance: 10-20% reduction</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">Test Your Knowledge</h2>
          <p className="text-sm text-white/80 mb-6">
            Test your understanding of BMS benefits with this comprehensive assessment.
          </p>
          <SingleQuestionQuiz
            questions={bmsModule1Section3QuizData}
            title="BMS Benefits Assessment"
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bms-module-1-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bms-module-1-section-4">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default BMSModule1Section3;
