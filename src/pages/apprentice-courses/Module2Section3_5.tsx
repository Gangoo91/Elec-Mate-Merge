import React from "react";
import { ArrowLeft, ArrowRight, Scale, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import UnitsPocketCard from "@/components/apprentice-courses/UnitsPocketCard";
import SeriesParallelCalculators from "@/components/apprentice-courses/SeriesParallelCalculators";
import OhmsCalculator from "@/components/apprentice-courses/OhmsCalculator";
import useSEO from "@/hooks/useSEO";

const TITLE = "Series vs Parallel: Pros and Cons - Level 2 Module 2 Section 3.5";
const DESCRIPTION = "Compare series and parallel circuit advantages and disadvantages for UK electrical installations. BS 7671 aligned guidance.";

const quickCheckQuestions = [
  {
    id: "series-fault-impact",
    question: "What happens when one component fails in a series circuit?",
    options: ["Only that component stops", "Other components work normally", "The entire circuit stops working", "Current increases"],
    correctIndex: 2,
    explanation: "In series circuits, one failure breaks the single current path, stopping all components."
  },
  {
    id: "parallel-independence", 
    question: "Why do parallel circuits offer better reliability?",
    options: ["They use less current", "Each branch operates independently", "They're easier to wire", "They cost less"],
    correctIndex: 1,
    explanation: "Each parallel branch has its own path, so failures in one branch don't affect others."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What happens if one component in a series circuit fails?",
    options: ["The circuit keeps working", "Only the failed component stops", "The whole circuit stops working", "The voltage increases"],
    correctAnswer: 2,
    explanation: "In series, one open circuit breaks the single current path, stopping all components."
  },
  {
    id: 2,
    question: "Which circuit configuration is typically used in domestic lighting?",
    options: ["Series", "Parallel", "Mixed", "Single loop"],
    correctAnswer: 1,
    explanation: "Lighting points are supplied in parallel to provide full voltage at each luminaire."
  },
  {
    id: 3,
    question: "Which is a drawback of parallel circuits?",
    options: ["Voltage drops across each load", "One failure affects the entire circuit", "Higher complexity and material use", "Current cannot be calculated"],
    correctAnswer: 2,
    explanation: "Parallel wiring needs more cable and connections; design must consider current and protection."
  },
  {
    id: 4,
    question: "A major advantage of parallel circuits is:",
    options: ["Easy to wire", "Lower fault tolerance", "Independent operation of each load", "Voltage is split across loads"],
    correctAnswer: 2,
    explanation: "Each branch operates independently at full supply voltage."
  },
  {
    id: 5,
    question: "Where might you encounter series circuits in real life?",
    options: ["Kitchen socket rings", "Distribution boards", "Decorative fairy lights", "Shower isolators"],
    correctAnswer: 2,
    explanation: "Series chains are common in decorative lighting, not in modern final circuits."
  },
  {
    id: 6,
    question: "Which BS 7671 regulation supports dividing installations to minimise inconvenience?",
    options: ["Regulation 314.1", "Regulation 411.3.3", "Regulation 132.16", "Regulation 522.6.202"],
    correctAnswer: 0,
    explanation: "Reg 314.1 requires division of the installation to reduce inconvenience in case of fault."
  },
  {
    id: 7,
    question: "In a parallel lighting circuit, adding another luminaire primarily affects:",
    options: ["Total circuit current", "Supply voltage", "Voltage at each lamp", "Earth fault loop impedance"],
    correctAnswer: 0,
    explanation: "Branch current increases overall load; voltage at points remains close to nominal if designed correctly."
  },
  {
    id: 8,
    question: "Two identical 60 W lamps in series on 230 V supply will:",
    options: ["Each see ~115 V and both are dim", "Both run at full brightness", "One is brighter, one dimmer", "Trip the MCB"],
    correctAnswer: 0,
    explanation: "Each lamp shares the voltage, current reduces, so both run dim and below rated power."
  },
  {
    id: 9,
    question: "Why are parallel circuits preferred for socket outlets?",
    options: ["Lower current draw", "Simpler wiring", "Each socket gets full voltage", "Cheaper installation"],
    correctAnswer: 2,
    explanation: "Each socket outlet needs full supply voltage to operate appliances correctly."
  },
  {
    id: 10,
    question: "Series circuits are most suitable for:",
    options: ["Main distribution boards", "Socket ring finals", "Decorative lighting chains", "Shower circuits"],
    correctAnswer: 2,
    explanation: "Series is mainly used in decorative lighting where voltage division is acceptable."
  }
];

const faqs = [
  {
    question: "Why aren't series circuits used for domestic lighting anymore?",
    answer: "Series circuits have poor fault tolerance - one failed bulb breaks the entire chain. Modern installations use parallel wiring where each luminaire operates independently, following BS 7671 requirements for circuit division."
  },
  {
    question: "What makes parallel circuits more expensive to install?",
    answer: "Parallel circuits require more cable (each branch needs its own conductors), more junction boxes, and more complex routing. However, the reliability and performance benefits justify the extra cost in most applications."
  },
  {
    question: "How does BS 7671 influence circuit type selection?",
    answer: "Regulation 314.1 requires dividing installations to minimise inconvenience during faults. This strongly favours parallel circuits for final circuits, as they maintain power to unaffected areas."
  },
  {
    question: "Can you mix series and parallel in the same installation?",
    answer: "Yes, many installations combine both. For example, LED tape might use series sections connected in parallel branches, or control circuits might use series switching with parallel loads."
  },
  {
    question: "What current considerations apply to parallel circuits?",
    answer: "Total current is the sum of all branch currents. This requires careful design of protective devices and cable sizing to handle the combined load safely."
  },
  {
    question: "Why do Christmas lights sometimes use series wiring?",
    answer: "Low-voltage decorative lights often use series to divide voltage across multiple LEDs. Modern versions include bypass circuits to maintain operation when individual LEDs fail."
  }
];

const Module2Section3_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2.3
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Scale className="h-8 w-8 text-elec-yellow" />
            <div>
              <span className="inline-block bg-elec-yellow text-black px-3 py-1 rounded-full text-sm font-semibold mb-2">
                Module 2.3.5
              </span>
              <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-white">
                Series vs Parallel: Pros and Cons
              </h1>
              <p className="text-xl text-white max-w-3xl mt-2">
                Compare advantages and disadvantages to choose the right circuit configuration
              </p>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20 bg-none shadow-none">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Series:</strong> Simple, low cost, but one failure stops all.</li>
                <li><strong>Parallel:</strong> Independent operation, full voltage, fault tolerant.</li>
                <li><strong>Current:</strong> Series limits total, parallel adds branches.</li>
                <li><strong>Applications:</strong> Series for decorative lights, parallel for mains circuits.</li>
                <li><strong>BS 7671:</strong> Favours parallel for circuit division and reliability.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Socket outlets, lighting points, radial/ring finals.</li>
                <li><strong>Use:</strong> Circuit design decisions, fault tolerance planning.</li>
                <li><strong>Apply:</strong> Installation design, upgrade planning, fault diagnosis.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20 bg-none shadow-none">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning Outcomes</h2>
          <p className="text-white mb-4">By the end of this section, you'll be able to:</p>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Compare advantages and disadvantages of series and parallel circuits</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Select appropriate circuit configurations for different applications</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Evaluate fault tolerance and reliability implications</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Apply BS 7671 requirements for circuit division</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Consider cost and complexity factors in circuit design</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Justify circuit type choices for real installations</span>
            </li>
          </ul>
        </Card>

        {/* Section 1: Series Circuit Analysis */}
        <div className="mb-8">
          <div className="border-l-4 border-elec-yellow dark:bg-card p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="bg-elec-yellow text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
              Series Circuits - Advantages and Disadvantages
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Series circuits connect components end-to-end in a single chain. This simple arrangement has both benefits and significant limitations.
              </p>
              
              <div className="space-y-4">
                <div>
                  <p className="font-bold text-elec-yellow">Advantages of series circuits:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li><strong>Simple design:</strong> Easy to understand and wire</li>
                    <li><strong>Low material cost:</strong> Minimal cabling required</li>
                    <li><strong>Current limiting:</strong> Total current limited by total resistance</li>
                    <li><strong>Voltage division:</strong> Useful for dropping voltage to components</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold text-elec-yellow">Disadvantages of series circuits:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li><strong>Poor fault tolerance:</strong> One failure stops entire circuit</li>
                    <li><strong>Voltage sharing:</strong> Components don't get full supply voltage</li>
                    <li><strong>Interdependence:</strong> Adding/removing components affects all others</li>
                    <li><strong>Limited applications:</strong> Not suitable for most mains installations</li>
                  </ul>
                </div>

                <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                  <p className="text-yellow-300">
                    <strong>Real example:</strong> Christmas lights with 50 LEDs in series on 230V means each LED gets about 4.6V.
                    If one LED fails open-circuit, the entire string goes dark.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Parallel Circuit Analysis */}
        <div className="mb-8">
          <div className="border-l-4 border-elec-yellow dark:bg-card p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="bg-elec-yellow text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
              Parallel Circuits - Advantages and Disadvantages
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Parallel circuits provide separate paths for current to each component. This configuration is standard for most electrical installations.
              </p>
              
              <div className="space-y-4">
                <div>
                  <p className="font-bold text-elec-yellow">Advantages of parallel circuits:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li><strong>Independent operation:</strong> Each component works separately</li>
                    <li><strong>Full voltage:</strong> Every component gets full supply voltage</li>
                    <li><strong>Fault tolerance:</strong> One failure doesn't affect others</li>
                    <li><strong>Flexible control:</strong> Individual switching possible</li>
                    <li><strong>BS 7671 compliance:</strong> Meets circuit division requirements</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold text-elec-yellow">Disadvantages of parallel circuits:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li><strong>Complex wiring:</strong> More cables and connections needed</li>
                    <li><strong>Higher cost:</strong> More materials and labour required</li>
                    <li><strong>Current summation:</strong> Total current is sum of all branches</li>
                    <li><strong>Protection complexity:</strong> Need to consider total load</li>
                  </ul>
                </div>

                <div className="bg-card border border-elec-yellow/30 p-4 rounded-lg">
                  <p className="text-elec-yellow">
                    <strong>Circuit calculation example:</strong><br/>
                    Three 100W loads in parallel on 230V:<br/>
                    • Each load: I = 100W ÷ 230V = 0.43A<br/>
                    • Total current: 3 × 0.43A = 1.3A<br/>
                    • Each load operates at full power independently
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Decision Matrix and Comparison */}
        <div className="mb-8">
          <div className="border-l-4 border-teal-500 bg-teal-500/10 dark:bg-teal-500/10 p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="bg-teal-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
              Circuit Selection Decision Matrix
            </h2>
            <div className="space-y-6 text-white">
              
              {/* Decision criteria */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-teal-300">Selection Criteria Analysis</h3>
                <div className="bg-teal-500/10 border border-teal-400/30 p-4 rounded-lg">
                  <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-sm">
                    <div>
                      <p className="font-bold text-teal-300 mb-3">Cost Considerations:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li><strong>Series:</strong> Lower material costs, simple installation</li>
                        <li><strong>Parallel:</strong> Higher cable costs, more labour intensive</li>
                        <li><strong>Long-term:</strong> Parallel reduces maintenance call-outs</li>
                        <li><strong>Compliance:</strong> BS 7671 requirements favour parallel</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-bold text-teal-300 mb-3">Performance Factors:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li><strong>Reliability:</strong> Parallel wins for fault tolerance</li>
                        <li><strong>Flexibility:</strong> Parallel allows individual control</li>
                        <li><strong>Efficiency:</strong> Parallel operates at rated voltages</li>
                        <li><strong>Maintenance:</strong> Parallel enables partial shutdowns</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Practical comparison */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-teal-300">Real-World Impact Assessment</h3>
                
                <div className="bg-card/30 border border-slate-600/30 p-4 rounded-lg">
                  <h4 className="font-bold text-white mb-3">Customer Satisfaction Analysis</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-300">
                    <div>
                      <p className="font-medium mb-2">Series Circuit Issues:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Complete failure from single fault</li>
                        <li>Difficult fault location</li>
                        <li>Reduced appliance performance</li>
                        <li>Frequent service calls</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium mb-2">Parallel Circuit Benefits:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Isolated failures, others work</li>
                        <li>Easy fault identification</li>
                        <li>Full voltage to all loads</li>
                        <li>Minimal disruption</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card/30 border border-slate-600/30 p-4 rounded-lg">
                  <h4 className="font-bold text-white mb-3">Installation Planning Considerations</h4>
                  <div className="text-sm text-slate-300">
                    <p className="mb-3">When planning circuit configurations, consider:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li><strong>Load requirements:</strong> Do devices need full supply voltage?</li>
                      <li><strong>Control needs:</strong> Independent switching required?</li>
                      <li><strong>Future expansion:</strong> Will circuits need modification?</li>
                      <li><strong>Regulatory compliance:</strong> BS 7671 circuit division requirements</li>
                      <li><strong>Safety implications:</strong> Emergency lighting and essential circuits</li>
                      <li><strong>Maintenance access:</strong> Partial isolation for servicing</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: BS 7671 Context and Safety */}
        <div className="mb-8">
          <div className="border-l-4 border-amber-500 dark:bg-card p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">4</span>
              BS 7671 Requirements and Practical Application
            </h2>
            <div className="space-y-4 text-white">
              <p>
                BS 7671 strongly influences circuit configuration choices through regulations on circuit division, protection, and reliability.
              </p>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-amber-300">Key BS 7671 Considerations</h3>
                
                <div className="bg-card border border-amber-400/30 p-4 rounded-lg">
                  <ul className="list-disc pl-6 space-y-2 text-sm">
                    <li><strong>Regulation 314.1:</strong> Divide installation to minimise inconvenience - favours parallel</li>
                    <li><strong>Regulation 132.16:</strong> Assess existing installations before modifications</li>
                    <li><strong>Part 4 Protection:</strong> Consider fault current and protection coordination</li>
                    <li><strong>Part 5 Selection:</strong> Cable sizing must account for total load</li>
                  </ul>
                </div>
                
                <h3 className="text-lg font-semibold text-amber-300">Safety and Maintenance</h3>
                
                <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                  <p className="text-yellow-300">
                    <strong>Important:</strong> Always consider the impact of circuit configuration on:
                    • Fault finding and maintenance access • Emergency lighting and essential services
                    • User convenience and safety • Future modification requirements
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20 bg-none shadow-none">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-white/10 pb-4 last:border-b-0">
                <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-white text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Circuit Selection Pocket Guide */}
        <div className="mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Circuit Selection Quick Guide</h2>
          <Card className="p-6 bg-transparent border-white/20 bg-none shadow-none">
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div className="space-y-3">
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <span className="bg-elec-yellow text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">S</span>
                  Series Selection
                </h3>
                <div className="bg-card border border-border/30 p-3 rounded">
                  <p className="font-medium text-elec-yellow mb-2">Use When:</p>
                  <ul className="list-disc pl-4 space-y-1 text-white text-xs">
                    <li>Decorative lighting chains</li>
                    <li>Voltage division needed</li>
                    <li>Current limiting required</li>
                    <li>Temporary installations</li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <span className="bg-elec-yellow text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">P</span>
                  Parallel Selection
                </h3>
                <div className="bg-card border border-elec-yellow/30 p-3 rounded">
                  <p className="font-medium text-elec-yellow mb-2">Use When:</p>
                  <ul className="list-disc pl-4 space-y-1 text-elec-yellow text-xs">
                    <li>Socket outlet circuits</li>
                    <li>Lighting final circuits</li>
                    <li>Independent control needed</li>
                    <li>BS 7671 compliance required</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <span className="bg-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">!</span>
                  Key Questions
                </h3>
                <div className="bg-card border border-amber-400/30 p-3 rounded">
                  <p className="font-medium text-amber-300 mb-2">Ask Yourself:</p>
                  <ul className="list-disc pl-4 space-y-1 text-white text-xs">
                    <li>Fault tolerance critical?</li>
                    <li>Individual control needed?</li>
                    <li>Full voltage required?</li>
                    <li>Future expansion likely?</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-white/10">
              <p className="text-center text-white text-sm">
                <strong>BS 7671 Reminder:</strong> Regulation 314.1 requires circuit division to minimise inconvenience - parallel circuits are preferred for final circuits
              </p>
            </div>
          </Card>
        </div>

        {/* Quick Reference Card */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20 bg-none shadow-none">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Quick Reference: Circuit Selection Guide</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-sm">
            <div className="space-y-3">
              <h3 className="font-semibold text-white">Series Circuit Checklist</h3>
              <ul className="list-disc pl-6 space-y-1 text-white">
                <li>Simple installation acceptable?</li>
                <li>Voltage division required?</li>
                <li>Low current draw needed?</li>
                <li>Fault tolerance not critical?</li>
                <li>Decorative/temporary use?</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-white">Parallel Circuit Checklist</h3>
              <ul className="list-disc pl-6 space-y-1 text-white">
                <li>Full voltage to all loads?</li>
                <li>Independent operation required?</li>
                <li>Fault tolerance important?</li>
                <li>Individual control needed?</li>
                <li>BS 7671 compliance required?</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Quiz */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20 bg-none shadow-none">
          <Quiz title="Circuit Configuration Knowledge Check" questions={quizQuestions} />
        </Card>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5" asChild>
            <Link to="../3-4"><ArrowLeft className="w-4 h-4 mr-2" />Previous</Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a]" asChild>
            <Link to="../3-6">Next<ArrowLeft className="w-4 h-4 ml-2 rotate-180" /></Link>
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default Module2Section3_5;