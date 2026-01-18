import { ArrowLeft, Zap, CheckCircle, Award, FileCheck, Building2, Lightbulb, Settings, ClipboardCheck, Target, Shield, Factory, Gauge } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "BS EN and ISO Standards Overview - Energy Efficiency Course";
const DESCRIPTION = "Learn about key energy efficiency standards including ISO 50001, BS EN 16247, BS EN 15232, motor efficiency classes IE1-IE5, and UK Building Regulations Part L compliance.";

const quickCheckQuestions = [
  {
    id: "qc1-iso50001",
    question: "What is the primary focus of ISO 50001?",
    options: ["Electrical installation testing", "Energy management systems", "Building construction standards", "Workplace safety regulations"],
    correctIndex: 1,
    explanation: "ISO 50001 is specifically designed for Energy Management Systems (EnMS). It provides a framework for organisations to develop policies, set targets, and implement action plans to improve energy performance systematically."
  },
  {
    id: "qc2-motorefficiency",
    question: "Which motor efficiency class represents the highest efficiency level under current standards?",
    options: ["IE1 Standard Efficiency", "IE2 High Efficiency", "IE3 Premium Efficiency", "IE5 Ultra Premium Efficiency"],
    correctIndex: 3,
    explanation: "IE5 Ultra Premium Efficiency represents the highest motor efficiency class. The scale runs from IE1 (Standard) through to IE5 (Ultra Premium), with each level representing approximately 15-20% reduction in losses compared to the previous class."
  },
  {
    id: "qc3-bsen16247",
    question: "What does BS EN 16247 specifically address?",
    options: ["Building automation systems", "Energy auditing procedures and requirements", "Lighting design calculations", "Electrical installation certification"],
    correctIndex: 1,
    explanation: "BS EN 16247 is a multi-part standard that establishes requirements, methodology, and deliverables for energy audits. It covers general requirements (Part 1) and specific sectors including buildings, industrial processes, and transport."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What management principle does ISO 50001 follow for continuous improvement?",
    options: ["Six Sigma methodology", "Plan-Do-Check-Act (PDCA) cycle", "Lean manufacturing principles", "Total Quality Management"],
    correctAnswer: 1,
    explanation: "ISO 50001 follows the Plan-Do-Check-Act (PDCA) cycle for continuous improvement of energy performance."
  },
  {
    id: 2,
    question: "From July 2023, what is the minimum efficiency class required for new motors between 75kW and 200kW in the EU/UK?",
    options: ["IE2 High Efficiency", "IE3 Premium Efficiency", "IE4 Super Premium Efficiency", "IE5 Ultra Premium Efficiency"],
    correctAnswer: 2,
    explanation: "From July 2023, motors between 75kW and 200kW must meet IE4 Super Premium Efficiency standards."
  },
  {
    id: 3,
    question: "Which part of BS EN 16247 specifically covers energy audits for buildings?",
    options: ["BS EN 16247-1", "BS EN 16247-2", "BS EN 16247-3", "BS EN 16247-4"],
    correctAnswer: 1,
    explanation: "BS EN 16247-2 specifically covers energy audits for buildings, while Part 1 covers general requirements."
  },
  {
    id: 4,
    question: "What does BS EN 15232 primarily assess?",
    options: ["Thermal insulation performance", "Impact of building automation and controls on energy efficiency", "Renewable energy integration", "Electrical safety compliance"],
    correctAnswer: 1,
    explanation: "BS EN 15232 assesses the impact of building automation and control systems (BACS) on energy efficiency."
  },
  {
    id: 5,
    question: "Which BS EN 15232 class represents buildings with high energy performance through advanced automation?",
    options: ["Class D - Non-energy efficient", "Class C - Standard", "Class B - Advanced", "Class A - High energy performance"],
    correctAnswer: 3,
    explanation: "Class A represents the highest energy performance with advanced automation including demand-based control and integrated functions."
  },
  {
    id: 6,
    question: "Under ESOS (Energy Savings Opportunity Scheme), which organisations must comply?",
    options: ["All businesses regardless of size", "Large undertakings with 250+ employees OR turnover over 44 million pounds", "Only public sector organisations", "Manufacturing companies only"],
    correctAnswer: 1,
    explanation: "ESOS applies to large undertakings with 250 or more employees, or with annual turnover exceeding 44 million pounds."
  },
  {
    id: 7,
    question: "What is the minimum efficacy requirement for general lighting in new non-domestic buildings under Part L 2021?",
    options: ["60 lumens per watt", "80 lumens per watt", "95 lumens per watt", "120 lumens per watt"],
    correctAnswer: 2,
    explanation: "Part L 2021 requires a minimum lighting efficacy of 95 lumens per watt for general lighting in new non-domestic buildings."
  },
  {
    id: 8,
    question: "How often must ISO 50001 certified organisations undergo surveillance audits?",
    options: ["Every 6 months", "Annually", "Every 2 years", "Every 3 years"],
    correctAnswer: 1,
    explanation: "ISO 50001 certified organisations must undergo annual surveillance audits to maintain their certification."
  },
  {
    id: 9,
    question: "Which standard provides the framework for calculating building energy performance certificates (EPCs)?",
    options: ["ISO 50001", "BS EN 16247", "BS EN 15232", "BS EN ISO 52000 series"],
    correctAnswer: 3,
    explanation: "The BS EN ISO 52000 series provides the calculation methodology for building energy performance certificates."
  },
  {
    id: 10,
    question: "What percentage energy savings can typically be achieved by upgrading from IE2 to IE4 motors?",
    options: ["1-2%", "3-5%", "10-15%", "25-30%"],
    correctAnswer: 1,
    explanation: "Upgrading from IE2 to IE4 motors typically achieves 3-5% energy savings, which compounds significantly over the motor's lifetime."
  }
];

const faqs = [
  {
    question: "What is the difference between ISO 50001 and BS EN 16247?",
    answer: "ISO 50001 is a management system standard that provides an ongoing framework for energy management within an organisation, requiring continuous improvement and regular internal audits. BS EN 16247 focuses specifically on how to conduct energy audits - it defines the methodology, requirements, and deliverables for one-off or periodic energy assessments. Many organisations use BS EN 16247 audits as part of their ISO 50001 implementation to identify improvement opportunities."
  },
  {
    question: "Are these standards mandatory in the UK?",
    answer: "Most standards are voluntary, but they often support mandatory requirements. For example, ESOS requires qualifying organisations to conduct energy audits to ISO 50001 or BS EN 16247 standards. Part L Building Regulations mandate minimum energy efficiency requirements that reference these standards. Motor efficiency regulations make IE3/IE4 mandatory for new installations. ISO 50001 certification can provide ESOS compliance exemption."
  },
  {
    question: "How do motor efficiency classes affect running costs?",
    answer: "Motor efficiency directly impacts electricity consumption. An IE4 motor typically has 1-3% better efficiency than IE3, which may seem small but compounds significantly over time. For a continuously running 30kW motor, upgrading from IE2 to IE4 could save approximately 500-800 pounds annually in electricity costs. Over a typical 15-20 year motor lifespan, this represents substantial savings and reduced carbon emissions."
  },
  {
    question: "What are the benefits of ISO 50001 certification?",
    answer: "Benefits include: exemption from ESOS audit requirements, average energy savings of 10-20% in the first three years, improved corporate sustainability credentials, competitive advantage in tenders requiring environmental management, reduced carbon tax exposure, better regulatory compliance preparation, and systematic approach to identifying and implementing efficiency improvements."
  },
  {
    question: "How does BS EN 15232 relate to BACS (Building Automation and Control Systems)?",
    answer: "BS EN 15232 provides a classification system (A-D) for BACS based on their energy impact. Class A systems include demand-based control, optimised scheduling, and integration with renewable energy sources. The standard helps specifiers and building managers understand how different levels of automation affect energy consumption, with potential savings of 20-30% achievable by upgrading from Class C to Class A systems."
  },
  {
    question: "What documentation is needed for standards compliance?",
    answer: "Requirements vary by standard. ISO 50001 requires an energy policy, objectives, action plans, energy baseline data, EnPIs (Energy Performance Indicators), and records of management reviews. BS EN 16247 audits must produce reports including methodology, findings, recommendations with payback calculations, and executive summary. Part L compliance requires design stage calculations, as-built documentation, and commissioning certificates."
  }
];

const EnergyEfficiencyModule1Section4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/energy-efficiency-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Title Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <Zap className="h-4 w-4" />
              <span>Module 1 Section 4</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
              BS EN and ISO Standards Overview
            </h1>
            <p className="text-white/80">
              Understanding the key standards framework for energy efficiency compliance and best practice in the UK
            </p>
          </header>

          {/* Quick Summary Boxes */}
          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
              <ul className="text-sm text-white space-y-1">
                <li><strong>ISO 50001:</strong> Energy management systems</li>
                <li><strong>BS EN 16247:</strong> Energy audit methodology</li>
                <li><strong>BS EN 15232:</strong> BACS efficiency classes</li>
                <li><strong>IE1-IE5:</strong> Motor efficiency standards</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
              <ul className="text-sm text-white space-y-1">
                <li><strong>Spot:</strong> Motor nameplates for IE class</li>
                <li><strong>Spot:</strong> EPC ratings on buildings</li>
                <li><strong>Use:</strong> ESOS compliance requirements</li>
                <li><strong>Use:</strong> Part L for new installations</li>
              </ul>
            </div>
          </div>

          {/* Learning Outcomes */}
          <section className="mb-12">
            <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
            <div className="grid sm:grid-cols-2 gap-2">
              {[
                "Understand the purpose and scope of ISO 50001 energy management",
                "Apply BS EN 16247 energy audit requirements",
                "Classify building automation using BS EN 15232",
                "Identify motor efficiency classes and regulations",
                "Navigate Part L Building Regulations requirements",
                "Recognise ESOS and SECR compliance obligations"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-white">
                  <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          <hr className="border-white/5 mb-12" />

          {/* Section 01: ISO 50001 */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              ISO 50001: Energy Management Systems
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>ISO 50001 is the international standard for Energy Management Systems (EnMS). First published in 2011 and updated in 2018, it provides organisations with a systematic approach to achieving continual improvement in energy performance.</p>

              <div className="my-6">
                <p className="text-sm font-medium text-white mb-2 flex items-center gap-2"><Target className="h-4 w-4 text-elec-yellow" /> Key Principles of ISO 50001:</p>
                <ul className="text-sm text-white space-y-2 ml-4">
                  <li><strong>Plan-Do-Check-Act (PDCA)</strong> - Continuous improvement cycle embedded in all processes</li>
                  <li><strong>Energy Policy</strong> - Top management commitment with defined objectives and targets</li>
                  <li><strong>Energy Review</strong> - Analysis of energy use and consumption patterns</li>
                  <li><strong>Energy Performance Indicators (EnPIs)</strong> - Measurable metrics to track progress</li>
                  <li><strong>Energy Baseline</strong> - Reference point for measuring improvements</li>
                </ul>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 my-6">
                <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                  <p className="text-elec-yellow text-sm font-medium mb-2">Certification Benefits</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>ESOS compliance exemption</li>
                    <li>Average 10-20% energy savings</li>
                    <li>Enhanced corporate reputation</li>
                    <li>Tender competitive advantage</li>
                    <li>Reduced carbon tax exposure</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                  <p className="text-elec-yellow text-sm font-medium mb-2">Certification Process</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Gap analysis and implementation</li>
                    <li>Internal audits and management review</li>
                    <li>Stage 1 audit (documentation review)</li>
                    <li>Stage 2 audit (implementation verification)</li>
                    <li>Annual surveillance audits</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 02: BS EN 16247 */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              BS EN 16247: Energy Audits Series
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>BS EN 16247 is a multi-part European standard that defines requirements for energy audits. It ensures audits are conducted systematically and produce comparable, actionable results.</p>

              <div className="my-6">
                <p className="text-sm font-medium text-white mb-2 flex items-center gap-2"><FileCheck className="h-4 w-4 text-elec-yellow" /> Standard Parts Overview:</p>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-elec-yellow/5">
                    <p className="text-elec-yellow text-sm font-medium">Part 1 - General Requirements</p>
                    <p className="text-white text-sm">Common methodology, auditor competence, reporting requirements applicable to all sectors</p>
                  </div>
                  <div className="p-3 rounded-lg bg-elec-yellow/5">
                    <p className="text-elec-yellow text-sm font-medium">Part 2 - Buildings</p>
                    <p className="text-white text-sm">Specific requirements for building energy audits including HVAC, lighting, and building fabric</p>
                  </div>
                  <div className="p-3 rounded-lg bg-elec-yellow/5">
                    <p className="text-elec-yellow text-sm font-medium">Part 3 - Processes</p>
                    <p className="text-white text-sm">Industrial and manufacturing processes, production equipment, and process heating/cooling</p>
                  </div>
                  <div className="p-3 rounded-lg bg-elec-yellow/5">
                    <p className="text-elec-yellow text-sm font-medium">Part 4 - Transport</p>
                    <p className="text-white text-sm">Fleet operations, logistics, and transport-related energy consumption</p>
                  </div>
                  <div className="p-3 rounded-lg bg-elec-yellow/5">
                    <p className="text-elec-yellow text-sm font-medium">Part 5 - Competence of Energy Auditors</p>
                    <p className="text-white text-sm">Qualification requirements, knowledge, skills, and professional conduct</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-elec-yellow text-sm font-medium mb-2">ESOS Compliance Note</p>
                <p className="text-white text-sm">Under ESOS Phase 3, qualifying organisations must conduct energy audits compliant with BS EN 16247 or maintain ISO 50001 certification. Audits must cover at least 90% of total energy consumption and be conducted by approved lead assessors.</p>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[0]} />

          {/* Section 03: BS EN 15232 */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              BS EN 15232: Building Automation Impact
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>BS EN 15232 (now part of BS EN ISO 52120) provides a method for assessing the energy impact of Building Automation and Control Systems (BACS) and Technical Building Management (TBM). It classifies systems from A (most efficient) to D (least efficient).</p>

              <div className="my-6">
                <p className="text-sm font-medium text-white mb-2 flex items-center gap-2"><Building2 className="h-4 w-4 text-elec-yellow" /> BACS Efficiency Classes:</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-elec-yellow/5 border-l-2 border-green-500/50">
                    <p className="text-green-400 text-sm font-medium mb-1">Class A - High Energy Performance</p>
                    <ul className="text-white text-sm space-y-1">
                      <li>Demand-based control</li>
                      <li>Individual room control</li>
                      <li>Optimum start/stop</li>
                      <li>Integrated functions</li>
                      <li>Energy monitoring and targeting</li>
                    </ul>
                  </div>
                  <div className="p-3 rounded-lg bg-elec-yellow/5 border-l-2 border-blue-500/50">
                    <p className="text-blue-400 text-sm font-medium mb-1">Class B - Advanced</p>
                    <ul className="text-white text-sm space-y-1">
                      <li>Scheduled time control</li>
                      <li>Zone-based control</li>
                      <li>Compensated control</li>
                      <li>Some integration</li>
                      <li>Basic energy monitoring</li>
                    </ul>
                  </div>
                  <div className="p-3 rounded-lg bg-elec-yellow/5 border-l-2 border-amber-500/50">
                    <p className="text-amber-400 text-sm font-medium mb-1">Class C - Standard</p>
                    <ul className="text-white text-sm space-y-1">
                      <li>Basic automatic control</li>
                      <li>Central time scheduling</li>
                      <li>Limited zone control</li>
                      <li>No integration</li>
                      <li>Reference baseline</li>
                    </ul>
                  </div>
                  <div className="p-3 rounded-lg bg-elec-yellow/5 border-l-2 border-red-500/50">
                    <p className="text-red-400 text-sm font-medium mb-1">Class D - Non-Energy Efficient</p>
                    <ul className="text-white text-sm space-y-1">
                      <li>Manual control only</li>
                      <li>No central scheduling</li>
                      <li>No automatic control</li>
                      <li>No monitoring</li>
                      <li>Below reference performance</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-elec-yellow text-sm font-medium mb-2">Typical Energy Savings by Class Upgrade</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>D to C:</strong> 10-15% savings</li>
                  <li><strong>C to B:</strong> 15-25% savings</li>
                  <li><strong>B to A:</strong> 10-20% savings</li>
                  <li><strong>D to A:</strong> 40-50% total savings achievable</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 04: Motor Efficiency Standards */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Motor Efficiency Standards (IE1-IE5)
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>Motor efficiency classes are defined by IEC 60034-30-1 and enforced through the UK Ecodesign regulations. Electric motors account for approximately 70% of industrial electricity consumption, making efficiency standards crucial for energy reduction.</p>

              <div className="my-6">
                <p className="text-sm font-medium text-white mb-2 flex items-center gap-2"><Settings className="h-4 w-4 text-elec-yellow" /> International Efficiency (IE) Classes:</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="text-left py-3 px-2 text-white font-semibold">Class</th>
                        <th className="text-left py-3 px-2 text-white font-semibold">Name</th>
                        <th className="text-left py-3 px-2 text-white font-semibold">Typical Efficiency (11kW)</th>
                        <th className="text-left py-3 px-2 text-white font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="text-white">
                      <tr className="border-b border-white/10">
                        <td className="py-3 px-2 text-red-400 font-medium">IE1</td>
                        <td className="py-3 px-2">Standard Efficiency</td>
                        <td className="py-3 px-2">~87.6%</td>
                        <td className="py-3 px-2 text-red-400">Banned for new installations</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-3 px-2 text-amber-400 font-medium">IE2</td>
                        <td className="py-3 px-2">High Efficiency</td>
                        <td className="py-3 px-2">~89.4%</td>
                        <td className="py-3 px-2 text-amber-400">Limited applications only</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-3 px-2 text-blue-400 font-medium">IE3</td>
                        <td className="py-3 px-2">Premium Efficiency</td>
                        <td className="py-3 px-2">~91.4%</td>
                        <td className="py-3 px-2 text-blue-400">Minimum for 0.75-75kW</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-3 px-2 text-green-400 font-medium">IE4</td>
                        <td className="py-3 px-2">Super Premium Efficiency</td>
                        <td className="py-3 px-2">~93.0%</td>
                        <td className="py-3 px-2 text-green-400">Minimum for 75-200kW</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-2 text-elec-yellow font-medium">IE5</td>
                        <td className="py-3 px-2">Ultra Premium Efficiency</td>
                        <td className="py-3 px-2">~94.0%+</td>
                        <td className="py-3 px-2 text-elec-yellow">Best available technology</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 my-6">
                <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                  <p className="text-elec-yellow text-sm font-medium mb-2 flex items-center gap-2"><Factory className="h-4 w-4" /> Current UK Requirements (2024)</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>0.75kW - 75kW: Minimum IE3</li>
                    <li>75kW - 200kW: Minimum IE4</li>
                    <li>VSD-driven motors: May use IE2 in some cases</li>
                    <li>Hazardous area motors: Specific requirements apply</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                  <p className="text-elec-yellow text-sm font-medium mb-2 flex items-center gap-2"><Gauge className="h-4 w-4" /> Cost-Benefit Example</p>
                  <p className="text-white text-sm mb-2">30kW motor running 8,000 hours/year:</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>IE2 (90.1%): 21,240 pounds/year</li>
                    <li>IE3 (92.1%): 20,826 pounds/year</li>
                    <li>IE4 (93.6%): 20,513 pounds/year</li>
                    <li className="text-green-400 font-medium">IE2 to IE4 savings: 727 pounds/year</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[1]} />

          {/* Section 05: Lighting Standards and Part L */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Lighting Standards and Part L Building Regulations
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>Lighting typically accounts for 15-25% of a building's electricity consumption. UK Building Regulations Part L sets minimum efficiency requirements, supported by various BS EN standards for design and performance.</p>

              <div className="my-6">
                <p className="text-sm font-medium text-white mb-2 flex items-center gap-2"><Lightbulb className="h-4 w-4 text-elec-yellow" /> Part L 2021 Lighting Requirements:</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-elec-yellow text-sm font-medium mb-2">Non-Domestic Buildings</p>
                    <ul className="text-sm text-white space-y-1">
                      <li>Minimum 95 lumens/watt efficacy</li>
                      <li>Automatic presence/absence detection required</li>
                      <li>Daylight dimming in perimeter zones</li>
                      <li>Constant illuminance control recommended</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-elec-yellow text-sm font-medium mb-2">Domestic Dwellings</p>
                    <ul className="text-sm text-white space-y-1">
                      <li>75% of fixed outlets must be energy efficient</li>
                      <li>Minimum 75 lumens/watt for efficient fittings</li>
                      <li>External lighting requires PIR or daylight control</li>
                      <li>LED technology strongly recommended</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-elec-yellow text-sm font-medium mb-2">Related Standards</p>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-white"><strong>BS EN 12464-1:</strong> Lighting of indoor work places - light levels, uniformity, glare limits</p>
                  </div>
                  <div>
                    <p className="text-white"><strong>BS EN 12464-2:</strong> Lighting of outdoor work places</p>
                  </div>
                  <div>
                    <p className="text-white"><strong>BS EN 15193:</strong> Energy requirements for lighting - LENI calculation</p>
                  </div>
                  <div>
                    <p className="text-white"><strong>BS 5266:</strong> Emergency lighting - design, installation, and maintenance</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mt-4">
                <p className="text-elec-yellow text-sm font-medium mb-2">LENI Calculation</p>
                <p className="text-white text-sm">Lighting Energy Numeric Indicator (LENI) expressed in kWh/m squared/year is the standard metric for comparing lighting energy performance. Part L uses LENI values in building energy calculations, with typical targets of 10-15 kWh/m squared/year for well-designed office lighting.</p>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[2]} />

          {/* Section 06: Standards Integration and Compliance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Standards Integration and Compliance Requirements
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>Energy efficiency standards do not exist in isolation - they form an interconnected framework supporting UK regulatory requirements. Understanding how these standards integrate helps professionals deliver compliant, efficient solutions.</p>

              <div className="my-6">
                <p className="text-sm font-medium text-white mb-2 flex items-center gap-2"><ClipboardCheck className="h-4 w-4 text-elec-yellow" /> UK Compliance Framework:</p>
                <div className="space-y-3">
                  <div className="p-4 rounded-lg bg-elec-yellow/5">
                    <p className="text-elec-yellow text-sm font-medium mb-2 flex items-center gap-2"><Shield className="h-4 w-4" /> ESOS (Energy Savings Opportunity Scheme)</p>
                    <ul className="text-sm text-white space-y-1 ml-6">
                      <li>Applies to large undertakings (250+ staff OR 44m+ pounds turnover)</li>
                      <li>Phase 3 deadline: 5 December 2023 (Phase 4: December 2027)</li>
                      <li>Requires BS EN 16247 compliant audits OR ISO 50001 certification</li>
                      <li>Must cover 90% minimum of total energy consumption</li>
                      <li>Lead assessor must be registered with approved body</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-lg bg-elec-yellow/5">
                    <p className="text-elec-yellow text-sm font-medium mb-2 flex items-center gap-2"><Shield className="h-4 w-4" /> SECR (Streamlined Energy and Carbon Reporting)</p>
                    <ul className="text-sm text-white space-y-1 ml-6">
                      <li>Applies to quoted companies and large unquoted companies</li>
                      <li>Annual disclosure of energy use and carbon emissions</li>
                      <li>Requires at least one intensity ratio (e.g., kWh/m squared or kgCO2/revenue)</li>
                      <li>Standards provide methodology for consistent measurement</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-lg bg-elec-yellow/5">
                    <p className="text-elec-yellow text-sm font-medium mb-2 flex items-center gap-2"><Shield className="h-4 w-4" /> Building Regulations Part L</p>
                    <ul className="text-sm text-white space-y-1 ml-6">
                      <li>Mandatory for all new buildings and significant refurbishments</li>
                      <li>References multiple BS EN standards for calculations</li>
                      <li>2021 edition significantly tightened requirements</li>
                      <li>Future Homes/Buildings Standard (2025) will increase stringency</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-lg bg-elec-yellow/5">
                    <p className="text-elec-yellow text-sm font-medium mb-2 flex items-center gap-2"><Shield className="h-4 w-4" /> MEES (Minimum Energy Efficiency Standards)</p>
                    <ul className="text-sm text-white space-y-1 ml-6">
                      <li>Commercial properties must achieve EPC Band E minimum</li>
                      <li>EPC Band B target for 2030 (subject to consultation)</li>
                      <li>EPCs calculated using BS EN ISO 52000 series methodology</li>
                      <li>Non-compliance penalties up to 150,000 pounds</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Practical Guidance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Specifying Equipment</h3>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Check motor efficiency class matches current regulations (IE3/IE4 minimum)</li>
                  <li>Verify lighting meets Part L efficacy requirements (95 lm/W)</li>
                  <li>Consider BACS classification for automation systems</li>
                  <li>Request manufacturer efficiency data and certifications</li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">For Energy Audits</h3>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Follow BS EN 16247 methodology for ESOS compliance</li>
                  <li>Document energy baseline and performance indicators</li>
                  <li>Include payback calculations in recommendations</li>
                  <li>Reference relevant standards in audit reports</li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li><strong>Installing non-compliant motors</strong> - check IE class before ordering</li>
                  <li><strong>Ignoring Part L on refurbishments</strong> - triggered by substantial work</li>
                  <li><strong>Missing ESOS deadlines</strong> - plan audits well in advance</li>
                  <li><strong>Not considering BACS efficiency</strong> - major impact on building performance</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Quick Reference Card */}
          <section className="mb-10">
            <div className="p-5 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h3 className="text-sm font-medium text-white mb-4 flex items-center gap-2"><Award className="h-4 w-4 text-elec-yellow" /> Quick Reference: Key Standards Summary</h3>
              <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
                <div>
                  <p className="font-medium text-elec-yellow mb-1">Management and Auditing</p>
                  <ul className="space-y-0.5">
                    <li><strong>ISO 50001:</strong> Energy Management System framework (PDCA cycle)</li>
                    <li><strong>BS EN 16247-1 to 5:</strong> Energy audit requirements and methodology</li>
                    <li><strong>BS EN ISO 52000:</strong> Energy performance of buildings (EPCs)</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-elec-yellow mb-1">Building Systems</p>
                  <ul className="space-y-0.5">
                    <li><strong>BS EN 15232:</strong> BACS efficiency classes (A-D)</li>
                    <li><strong>BS EN 12464:</strong> Workplace lighting requirements</li>
                    <li><strong>BS EN 15193:</strong> LENI lighting energy calculation</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-elec-yellow mb-1">Equipment Efficiency</p>
                  <ul className="space-y-0.5">
                    <li><strong>IEC 60034-30:</strong> Motor efficiency classes IE1-IE5</li>
                    <li><strong>Current minimum:</strong> IE3 (0.75-75kW), IE4 (75-200kW)</li>
                    <li><strong>Part L 2021:</strong> 95 lm/W minimum lighting efficacy</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-elec-yellow mb-1">Key Compliance Points</p>
                  <ul className="space-y-0.5">
                    <li><strong>ESOS:</strong> Large organisations - ISO 50001 or BS EN 16247 audit</li>
                    <li><strong>MEES:</strong> Minimum EPC Band E for commercial lettings</li>
                    <li><strong>Part L:</strong> All new builds and major refurbishments</li>
                  </ul>
                </div>
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
              <Link to="/study-centre/upskilling/energy-efficiency/module-1/section-3">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous Section
              </Link>
            </Button>
            <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
              <Link to="/study-centre/upskilling/energy-efficiency/module-2">
                Next: Module 2
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default EnergyEfficiencyModule1Section4;
