import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
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
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content - Full width, minimal padding */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 2.3.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Series vs Parallel: Pros and Cons
          </h1>
          <p className="text-white/80">
            Compare advantages and disadvantages to choose the right circuit configuration
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Series:</strong> Simple, low cost, but one failure stops all</li>
              <li><strong>Parallel:</strong> Independent operation, full voltage, fault tolerant</li>
              <li><strong>Current:</strong> Series limits total, parallel adds branches</li>
              <li><strong>Applications:</strong> Series for decorative lights, parallel for mains circuits</li>
              <li><strong>BS 7671:</strong> Favours parallel for circuit division and reliability</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Socket outlets, lighting points, radial/ring finals</li>
              <li><strong>Use:</strong> Circuit design decisions, fault tolerance planning</li>
              <li><strong>Apply:</strong> Installation design, upgrade planning, fault diagnosis</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes - Simple list */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Compare advantages and disadvantages of series and parallel circuits",
              "Select appropriate circuit configurations for different applications",
              "Evaluate fault tolerance and reliability implications",
              "Apply BS 7671 requirements for circuit division",
              "Consider cost and complexity factors in circuit design",
              "Justify circuit type choices for real installations"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 1: Series Circuit Analysis */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Series Circuits - Advantages and Disadvantages
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Series circuits connect components end-to-end in a single chain. This simple arrangement has both benefits and significant limitations.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Advantages of series circuits:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Simple design:</strong> Easy to understand and wire</li>
                <li><strong>Low material cost:</strong> Minimal cabling required</li>
                <li><strong>Current limiting:</strong> Total current limited by total resistance</li>
                <li><strong>Voltage division:</strong> Useful for dropping voltage to components</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Disadvantages of series circuits:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Poor fault tolerance:</strong> One failure stops entire circuit</li>
                <li><strong>Voltage sharing:</strong> Components don't get full supply voltage</li>
                <li><strong>Interdependence:</strong> Adding/removing components affects all others</li>
                <li><strong>Limited applications:</strong> Not suitable for most mains installations</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Real example:</strong> Christmas lights with 50 LEDs in series on 230V means each LED gets about 4.6V.
              If one LED fails open-circuit, the entire string goes dark.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Parallel Circuit Analysis */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Parallel Circuits - Advantages and Disadvantages
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Parallel circuits provide separate paths for current to each component. This configuration is standard for most electrical installations.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Advantages of parallel circuits:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Independent operation:</strong> Each component works separately</li>
                <li><strong>Full voltage:</strong> Every component gets full supply voltage</li>
                <li><strong>Fault tolerance:</strong> One failure doesn't affect others</li>
                <li><strong>Flexible control:</strong> Individual switching possible</li>
                <li><strong>BS 7671 compliance:</strong> Meets circuit division requirements</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Disadvantages of parallel circuits:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Complex wiring:</strong> More cables and connections needed</li>
                <li><strong>Higher cost:</strong> More materials and labour required</li>
                <li><strong>Current summation:</strong> Total current is sum of all branches</li>
                <li><strong>Protection complexity:</strong> Need to consider total load</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Circuit calculation example:</strong><br />
              Three 100W loads in parallel on 230V:<br />
              Each load: I = 100W ÷ 230V = 0.43A<br />
              Total current: 3 × 0.43A = 1.3A<br />
              Each load operates at full power independently
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Decision Matrix and Comparison */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Circuit Selection Decision Matrix
          </h2>
          <div className="text-white space-y-6 leading-relaxed">

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cost Considerations:</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li><strong>Series:</strong> Lower material costs, simple installation</li>
                  <li><strong>Parallel:</strong> Higher cable costs, more labour intensive</li>
                  <li><strong>Long-term:</strong> Parallel reduces maintenance call-outs</li>
                  <li><strong>Compliance:</strong> BS 7671 requirements favour parallel</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Performance Factors:</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li><strong>Reliability:</strong> Parallel wins for fault tolerance</li>
                  <li><strong>Flexibility:</strong> Parallel allows individual control</li>
                  <li><strong>Efficiency:</strong> Parallel operates at rated voltages</li>
                  <li><strong>Maintenance:</strong> Parallel enables partial shutdowns</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <p className="font-medium text-white mb-2">Customer Satisfaction Analysis</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-white/70 mb-1">Series Circuit Issues:</p>
                  <ul className="text-white space-y-0.5">
                    <li>Complete failure from single fault</li>
                    <li>Difficult fault location</li>
                    <li>Reduced appliance performance</li>
                    <li>Frequent service calls</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white/70 mb-1">Parallel Circuit Benefits:</p>
                  <ul className="text-white space-y-0.5">
                    <li>Isolated failures, others work</li>
                    <li>Easy fault identification</li>
                    <li>Full voltage to all loads</li>
                    <li>Minimal disruption</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Planning Considerations</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Load requirements:</strong> Do devices need full supply voltage?</li>
                <li><strong>Control needs:</strong> Independent switching required?</li>
                <li><strong>Future expansion:</strong> Will circuits need modification?</li>
                <li><strong>Regulatory compliance:</strong> BS 7671 circuit division requirements</li>
                <li><strong>Safety implications:</strong> Emergency lighting and essential circuits</li>
                <li><strong>Maintenance access:</strong> Partial isolation for servicing</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: BS 7671 Context and Safety */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            BS 7671 Requirements and Practical Application
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 7671 strongly influences circuit configuration choices through regulations on circuit division, protection, and reliability.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key BS 7671 Considerations</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Regulation 314.1:</strong> Divide installation to minimise inconvenience - favours parallel</li>
                <li><strong>Regulation 132.16:</strong> Assess existing installations before modifications</li>
                <li><strong>Part 4 Protection:</strong> Consider fault current and protection coordination</li>
                <li><strong>Part 5 Selection:</strong> Cable sizing must account for total load</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Important:</strong> Always consider the impact of circuit configuration on:
              fault finding and maintenance access, emergency lighting and essential services,
              user convenience and safety, and future modification requirements.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

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

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Circuit Selection Pocket Guide */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Circuit Selection Quick Guide</h3>
            <div className="grid grid-cols-3 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Series Selection</p>
                <p className="text-white/70">Use for decorative lighting chains, voltage division needed, current limiting required, temporary installations</p>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Parallel Selection</p>
                <p className="text-white/70">Use for socket outlet circuits, lighting final circuits, independent control needed, BS 7671 compliance required</p>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Questions</p>
                <p className="text-white/70">Fault tolerance critical? Individual control needed? Full voltage required? Future expansion likely?</p>
              </div>
            </div>
            <p className="text-center text-white text-xs mt-4">
              <strong>BS 7671 Reminder:</strong> Regulation 314.1 requires circuit division to minimise inconvenience - parallel circuits are preferred for final circuits
            </p>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz title="Circuit Configuration Knowledge Check" questions={quizQuestions} />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../3-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../3-6">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Module2Section3_5;
