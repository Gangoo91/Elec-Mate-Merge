import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import { bmsModule4Section5QuizData } from "@/data/upskilling/bmsModule4Section5QuizData";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "combined-savings",
    question: "Why do combined HVAC and lighting strategies achieve greater savings than individual systems?",
    options: [
      "They use fewer sensors",
      "They share data for coordinated response to building conditions",
      "They require less commissioning",
      "They cost less to install"
    ],
    correctIndex: 1,
    explanation: "Combined systems share occupancy, daylight, and scheduling data, allowing coordinated responses. When a zone becomes vacant, both lighting and HVAC can respond together, and solar control can coordinate with both systems for maximum efficiency."
  },
  {
    id: "roi-example",
    question: "What factor most significantly impacts the ROI of energy-saving BMS strategies?",
    options: [
      "Brand of equipment used",
      "Occupancy patterns and how well controls match actual use",
      "Number of sensors installed",
      "Speed of communication protocols"
    ],
    correctIndex: 1,
    explanation: "Buildings with variable occupancy patterns (meeting rooms, hot-desking) see the greatest ROI because controls can respond to actual use rather than fixed schedules. Systems that accurately match energy supply to actual demand achieve the best returns."
  },
  {
    id: "commissioning-critical",
    question: "Why is commissioning critical for achieving design energy savings?",
    options: [
      "It reduces equipment costs",
      "It ensures systems are tuned to actual building operation",
      "It eliminates the need for ongoing maintenance",
      "It speeds up installation"
    ],
    correctIndex: 1,
    explanation: "Commissioning tunes control setpoints, schedules, and interactions to match actual building operation patterns. Without proper commissioning, systems often operate at default settings that don't reflect real conditions, losing potential savings."
  },
  {
    id: "kpi-monitoring",
    question: "What is the purpose of ongoing energy KPI monitoring after commissioning?",
    options: [
      "To generate reports for management",
      "To identify savings drift and optimisation opportunities",
      "To comply with regulations",
      "To justify system costs"
    ],
    correctIndex: 1,
    explanation: "Ongoing KPI monitoring identifies 'savings drift' where performance degrades over time due to changed patterns, sensor drift, or control changes. It also reveals new optimisation opportunities as building use evolves."
  }
];

const faqs = [
  {
    question: "What is 'savings drift' and how is it prevented?",
    answer: "Savings drift occurs when initial energy savings gradually decrease over time due to changed occupancy patterns, sensor calibration drift, or unauthorised control changes. Prevention requires regular monitoring, scheduled recommissioning, and change management procedures."
  },
  {
    question: "How do you prioritise which energy-saving measures to implement first?",
    answer: "Prioritise based on: 1) Payback period (quick wins first), 2) Ease of implementation (low disruption), 3) Capital availability, 4) Interaction benefits (measures that enable others). Often PIR lighting and scheduling deliver fastest ROI."
  },
  {
    question: "What typical energy savings can integrated BMS strategies achieve?",
    answer: "Well-implemented integrated strategies typically achieve: 30-50% HVAC savings, 40-60% lighting savings, 20-30% overall building energy reduction. Actual results depend on baseline efficiency and occupancy patterns."
  },
  {
    question: "How do you measure the success of energy-saving strategies?",
    answer: "Use normalised metrics: kWh/m²/year for benchmarking, energy intensity by occupant, degree-day adjusted consumption for weather effects, and comparison to CIBSE TM46 benchmarks for building type."
  }
];

const BMSModule4Section5 = () => {
  useSEO({
    title: "Combined Energy Saving Scenarios | BMS Module 4.5",
    description: "Master integrated HVAC and lighting energy strategies in BMS. Learn combined control approaches, ROI calculations, commissioning best practices, and performance monitoring for maximum efficiency."
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../bms-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12 max-w-3xl mx-auto">
        {/* Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 4.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Combined Energy Saving Scenarios
          </h1>
          <p className="text-white/80">
            Integrating HVAC and lighting systems for maximum efficiency gains
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Combined:</strong> HVAC + Lighting + Shading coordination</li>
              <li><strong>HVAC Savings:</strong> 30-50% with proper integration</li>
              <li><strong>Lighting Savings:</strong> 40-60% with daylight/occupancy</li>
              <li><strong>Critical:</strong> Commissioning determines success</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Coordinated schedules, shared sensors, central control</li>
              <li><strong>Use:</strong> Maximum efficiency, consistent comfort, lower bills</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Combined control strategy principles",
              "HVAC and lighting integration methods",
              "ROI calculation approaches",
              "Commissioning best practices",
              "Energy KPI selection and monitoring",
              "Common implementation pitfalls",
              "Case study analysis techniques",
              "Performance verification methods"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Combined Control Strategy Principles
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The most effective energy management comes from coordinating multiple building systems rather than
              optimising each in isolation. Combined strategies leverage shared data and coordinated responses
              to achieve savings beyond what individual systems can deliver.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Integration Benefits:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Shared Occupancy Data:</strong> One PIR feeds both HVAC and lighting</li>
                <li><strong>Coordinated Schedules:</strong> Systems start/stop together</li>
                <li><strong>Solar Coordination:</strong> Shading affects both cooling and lighting</li>
                <li><strong>Demand Response:</strong> Unified response to peak events</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">HVAC Only</p>
                <p className="text-white/90 text-xs">20-30% savings</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Lighting Only</p>
                <p className="text-white/90 text-xs">30-40% savings</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-elec-yellow mb-1">Combined</p>
                <p className="text-white/90 text-xs">40-60% total savings</p>
              </div>
            </div>

            <InlineCheck {...quickCheckQuestions[0]} />
          </div>
        </section>

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            ROI and Business Case Development
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Successful energy projects require solid business cases that demonstrate return on investment.
              Understanding cost structures, savings calculations, and risk factors helps secure project approval
              and set realistic expectations.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cost Categories</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Capital:</strong> Sensors, controllers, wiring</li>
                  <li><strong>Installation:</strong> Labour, commissioning</li>
                  <li><strong>Ongoing:</strong> Maintenance, monitoring</li>
                  <li><strong>Opportunity:</strong> Disruption during install</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Savings Sources</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Energy:</strong> Reduced kWh consumption</li>
                  <li><strong>Demand:</strong> Lower peak charges</li>
                  <li><strong>Maintenance:</strong> Extended equipment life</li>
                  <li><strong>Productivity:</strong> Improved comfort</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Payback Periods:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>PIR lighting control:</strong> 1-2 years</li>
                <li><strong>Daylight harvesting:</strong> 2-3 years</li>
                <li><strong>HVAC scheduling:</strong> 1-3 years</li>
                <li><strong>Full BMS integration:</strong> 3-5 years</li>
              </ul>
            </div>

            <InlineCheck {...quickCheckQuestions[1]} />
          </div>
        </section>

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Commissioning for Energy Performance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Commissioning is where potential energy savings become actual savings. Systems installed without
              proper commissioning often operate at default settings that don't reflect real building conditions,
              losing 20-40% of potential savings.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Commissioning Phases:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Phase 1:</strong> Pre-functional testing (wiring, connections)</li>
                <li><strong>Phase 2:</strong> Functional testing (individual system operation)</li>
                <li><strong>Phase 3:</strong> Integrated testing (systems working together)</li>
                <li><strong>Phase 4:</strong> Seasonal commissioning (summer/winter tuning)</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Critical Adjustments</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Occupancy schedule alignment</li>
                  <li>Setpoint optimisation</li>
                  <li>Sensor calibration verification</li>
                  <li>Deadband configuration</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-red-400/80 mb-2">Common Deficiencies</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Default schedules not adjusted</li>
                  <li>Sensors in wrong locations</li>
                  <li>System interactions not tested</li>
                  <li>Override limits not set</li>
                </ul>
              </div>
            </div>

            <InlineCheck {...quickCheckQuestions[2]} />
          </div>
        </section>

        {/* Section 4 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Ongoing Performance Monitoring
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Energy performance naturally degrades over time without active monitoring. Continuous measurement
              and verification (M&V) identifies savings drift early and reveals new optimisation opportunities
              as building use patterns evolve.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Performance Indicators:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>kWh/m²/year:</strong> Building energy intensity benchmark</li>
                <li><strong>kWh/occupant:</strong> Efficiency per person</li>
                <li><strong>DEC Rating:</strong> Display Energy Certificate (UK)</li>
                <li><strong>Peak demand:</strong> Maximum kW and timing</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Warning Signs of Savings Drift:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Energy use increasing despite stable occupancy</li>
                <li>Out-of-hours consumption creeping up</li>
                <li>Comfort complaints despite energy use</li>
                <li>Manual overrides increasing</li>
              </ul>
            </div>

            <InlineCheck {...quickCheckQuestions[3]} />
          </div>
        </section>

        {/* Case Study */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Case Study: Multi-Tenant Office Building</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm text-white">
                <strong>Challenge:</strong> 12-floor office building with 8 tenants, energy costs 35% above CIBSE
                benchmark. Previous BMS installed but never properly commissioned. Variable occupancy patterns
                making fixed schedules ineffective.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 text-sm text-white">
              <div>
                <p className="font-medium text-elec-yellow/80 mb-2">Implementation</p>
                <ul className="space-y-1">
                  <li>PIR occupancy detection all floors</li>
                  <li>Daylight harvesting perimeter zones</li>
                  <li>HVAC setback for unoccupied areas</li>
                  <li>Coordinated scheduling by tenant</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-elec-yellow/80 mb-2">Results (Year 1)</p>
                <ul className="space-y-1">
                  <li>42% reduction in lighting energy</li>
                  <li>28% reduction in HVAC energy</li>
                  <li>£127,000 annual savings</li>
                  <li>Payback: 2.3 years</li>
                </ul>
              </div>
            </div>
            <div className="p-3 rounded bg-transparent border border-white/10 text-sm">
              <p className="text-white"><strong>Key Learning:</strong> The largest savings came from proper commissioning
              of existing equipment rather than new installations. Recommissioning alone delivered 60% of total savings.</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
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

        {/* Quick Reference */}
        <div className="mt-6 p-5 rounded-lg bg-transparent border border-white/10">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">Typical Savings</p>
              <ul className="space-y-0.5">
                <li>HVAC: 30-50%</li>
                <li>Lighting: 40-60%</li>
                <li>Combined: 40-60% total</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Payback Periods</p>
              <ul className="space-y-0.5">
                <li>PIR lighting: 1-2 years</li>
                <li>HVAC scheduling: 1-3 years</li>
                <li>Full integration: 3-5 years</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <section className="mb-10 mt-12">
          <SingleQuestionQuiz
            title="Test Your Knowledge"
            questions={bmsModule4Section5QuizData}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../bms-module-4-section-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../bms-module-5">
              Next Module
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BMSModule4Section5;
