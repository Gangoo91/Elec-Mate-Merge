import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "What Is a Fault? - Module 7.1.1 | Level 2 Electrical Course";
const DESCRIPTION = "Understanding the definition of electrical faults and distinguishing between normal operation and fault conditions in electrical installations.";

const quickCheckQuestions = [
  {
    id: "fault-definition-check",
    question: "What is the general definition of an electrical fault?",
    options: ["A minor problem that can be ignored", "Any defect that prevents a circuit from functioning safely or correctly", "A temporary power cut", "Normal wear and tear"],
    correctIndex: 1,
    explanation: "A fault is any defect that prevents a circuit from functioning safely or correctly according to BS 7671 standards."
  },
  {
    id: "normal-vs-fault-check",
    question: "How does a fault condition differ from normal operation in a circuit?",
    options: ["No difference", "Fault conditions create abnormal current flow and safety risks", "Faults make circuits work better", "Faults only affect old installations"],
    correctIndex: 1,
    explanation: "Fault conditions create abnormal current flow, introduce safety risks, and mean the system is no longer operating within safe limits."
  },
  {
    id: "fault-types-check",
    question: "Give two examples of common electrical faults.",
    options: ["Good connections and proper polarity", "Short circuits and earth faults", "New cables and clean terminals", "Correct voltage and frequency"],
    correctIndex: 1,
    explanation: "Short circuits and earth faults are two common types of electrical faults that create safety hazards."
  },
  {
    id: "importance-check",
    question: "Why is it essential for electricians to clearly understand what a fault is?",
    options: ["To work faster", "To identify hazards early and prevent accidents", "To use more expensive tools", "To avoid paperwork"],
    correctIndex: 1,
    explanation: "Understanding faults allows electricians to test intelligently, interpret results correctly, and recognise unsafe conditions before they cause accidents."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the general definition of an electrical fault?",
    options: ["A broken light bulb", "Any defect that prevents a circuit from functioning safely or correctly", "A power cut from the supplier", "Normal equipment wear"],
    correctAnswer: 1,
    explanation: "A fault is any defect that prevents a circuit from functioning safely or correctly according to BS 7671 standards."
  },
  {
    id: 2,
    question: "What makes a fault different from normal circuit operation?",
    options: ["Faults are louder", "Faults introduce abnormal conditions and safety risks", "Faults use more electricity", "Faults are always visible"],
    correctAnswer: 1,
    explanation: "Fault conditions create abnormal current flow, safety risks, and mean the system is no longer operating within safe limits set by BS 7671."
  },
  {
    id: 3,
    question: "What does a short circuit involve?",
    options: ["Normal current flow", "Unintended contact between line and neutral or line-to-line conductors", "Slow current flow", "No current flow"],
    correctAnswer: 1,
    explanation: "A short circuit occurs when line and neutral or line-to-line conductors make unintended contact, creating dangerous current levels."
  },
  {
    id: 4,
    question: "What is an earth fault?",
    options: ["Normal earthing", "When live conductors make contact with earth or earthed metalwork", "A broken earth cable", "Good earth connection"],
    correctAnswer: 1,
    explanation: "An earth fault occurs when live conductors make unintended contact with earth or earthed metalwork, creating a safety hazard."
  },
  {
    id: 5,
    question: "What is an open circuit?",
    options: ["A circuit that's switched on", "When a conductor is broken or disconnected, stopping current flow", "A circuit without protection", "A very long circuit"],
    correctAnswer: 1,
    explanation: "An open circuit occurs when a conductor is broken or disconnected, preventing current from flowing to complete the circuit."
  },
  {
    id: 6,
    question: "What happens when insulation breaks down in a cable?",
    options: ["The cable works better", "Leakage currents can flow, creating safety hazards", "Nothing happens", "The cable becomes stronger"],
    correctAnswer: 1,
    explanation: "When insulation breaks down, leakage currents can flow between conductors or to earth, creating safety hazards and potential shock risks."
  },
  {
    id: 7,
    question: "Why is reversed polarity considered a fault?",
    options: ["It makes no difference", "Conductors are connected incorrectly, creating safety risks", "It improves performance", "It's just a preference"],
    correctAnswer: 1,
    explanation: "Reversed polarity means conductors are connected incorrectly, which can create safety risks and equipment malfunction even if the circuit appears to work."
  },
  {
    id: 8,
    question: "True or False: If equipment still works, there cannot be a fault.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation: "False. A system can appear to function while being unsafe - for example, reversed polarity may not stop equipment working but creates hidden dangers."
  },
  {
    id: 9,
    question: "Why is it important to correctly identify faults during testing?",
    options: ["To use more equipment", "To prevent accidents, legal non-compliance, and property damage", "To take longer on jobs", "To charge more money"],
    correctAnswer: 1,
    explanation: "Identifying faults prevents accidents, ensures legal compliance with BS 7671, and prevents costly damage to property and equipment."
  },
  {
    id: 10,
    question: "In the real-world example, what mistake did the apprentice make when investigating the tripping circuit?",
    options: ["He tested too much", "He assumed the breaker was faulty instead of recognising a possible short circuit", "He worked too slowly", "He called for help"],
    correctAnswer: 1,
    explanation: "The apprentice incorrectly assumed the breaker was faulty instead of recognising the repeated tripping as a sign of a possible short circuit fault."
  }
];

const faqs = [
  {
    question: "Is a tripped circuit breaker always a sign of a fault?",
    answer: "Not always — it could be due to overload or a one-off event, but repeated tripping usually indicates a fault that needs investigation."
  },
  {
    question: "Are all faults dangerous?",
    answer: "Yes, even minor faults can escalate into serious hazards if left uncorrected. All faults represent a breakdown in safe operation and should be addressed."
  },
  {
    question: "Do hidden faults still count as faults if the installation appears to work?",
    answer: "Yes. A system can appear to function while being unsafe — for example, reversed polarity. Hidden faults are often the most dangerous because they're not immediately obvious."
  },
  {
    question: "How can I tell the difference between a fault and normal wear?",
    answer: "Normal wear is gradual degradation that doesn't immediately compromise safety (like slight contact wear in switches). A fault is any condition that takes the system outside safe operating parameters defined in BS 7671."
  },
  {
    question: "What should I do if I suspect a fault but can't confirm it?",
    answer: "Always err on the side of caution. Isolate the circuit if safe to do so, and seek guidance from a qualified person. Never ignore unexplained symptoms."
  }
];

const Module7Section1_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
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

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 7.1.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            What Is a Fault?
          </h1>
          <p className="text-white/80">
            Understanding the definition of electrical faults and distinguishing between normal operation and fault conditions
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Definition:</strong> Any defect preventing safe circuit operation</li>
              <li><strong>Types:</strong> Short circuits, earth faults, open circuits</li>
              <li><strong>Danger:</strong> Faults create safety risks even if equipment works</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Repeated tripping, abnormal readings, unusual behaviour</li>
              <li><strong>Use:</strong> Test equipment, visual inspection, correct terminology</li>
              <li><strong>Check:</strong> All circuits before energising</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define what an electrical fault is",
              "Distinguish between normal operation and fault conditions",
              "Identify the different ways faults may appear",
              "Appreciate why recognising faults is critical to safety"
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

        {/* Section 1: Definition of a Fault */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Definition of a Fault
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A fault in electrical terms is any defect that prevents a circuit from functioning safely or correctly
              according to BS 7671 standards. Faults may involve unexpected connections, breaks in continuity, or
              abnormal current flow that creates danger or disruption.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Primary Types of Electrical Faults:</p>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white text-sm mb-1">Short Circuits</p>
                  <p className="text-xs text-white/80">Unintended connection between line and neutral or between phases</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white text-sm mb-1">Earth Faults</p>
                  <p className="text-xs text-white/80">Live conductors making contact with earth or earthed metalwork</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white text-sm mb-1">Open Circuits</p>
                  <p className="text-xs text-white/80">Broken or disconnected conductors preventing current flow</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white text-sm mb-1">Insulation Breakdown</p>
                  <p className="text-xs text-white/80">Deteriorated insulation allowing dangerous leakage currents</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Secondary Fault Types:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Polarity faults:</strong> Incorrect connection of line and neutral conductors</li>
                <li><strong>High resistance connections:</strong> Loose or corroded joints creating heat</li>
                <li><strong>Cross-connections:</strong> Wires connected to wrong terminals or circuits</li>
                <li><strong>Mechanical damage:</strong> Physical damage affecting conductor integrity</li>
                <li><strong>Overloading:</strong> Current demand exceeding design capacity</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">BS 7671 Requirements</p>
              <ul className="text-sm text-white space-y-1">
                <li>All circuits must be protected against overcurrent (Regulation 433.1)</li>
                <li>Fault protection must be provided for all circuits (Chapter 41)</li>
                <li>Earth fault loop impedance must not exceed specified values (Regulation 411.4.5)</li>
                <li>Insulation resistance must meet minimum standards (Regulation 612.3)</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Normal vs Fault Operation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Normal Operation vs Fault Conditions
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding the clear distinction between normal and fault conditions is essential for safe
              electrical work and proper testing.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Normal Operation</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Current flows only along intended paths</li>
                  <li>Voltage levels within ±10% of nominal</li>
                  <li>Insulation resistance &gt;1MΩ for most circuits</li>
                  <li>Earth fault loop impedance within limits</li>
                  <li>Protective devices remain inactive</li>
                  <li>No unwanted voltages on exposed metalwork</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-red-400/80 mb-2">Fault Conditions</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Current flowing through unintended paths</li>
                  <li>Dangerous voltages on metalwork</li>
                  <li>Excessive current causing overheating</li>
                  <li>Loss of protective earthing integrity</li>
                  <li>Electric shock or fire risk</li>
                  <li>Legal non-compliance with BS 7671</li>
                </ul>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-white text-sm mb-2">Obvious Faults</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>Circuit breakers tripping immediately</li>
                  <li>RCDs operating under load</li>
                  <li>Visible sparking or burning</li>
                  <li>Complete loss of supply</li>
                </ul>
              </div>
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-white text-sm mb-2">Hidden Faults</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>Reversed polarity connections</li>
                  <li>High resistance earth faults</li>
                  <li>Degraded insulation (still &gt;1MΩ)</li>
                  <li>Loose connections causing heating</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> A system can appear to function while being unsafe. Hidden faults are
              often the most dangerous because they're not immediately obvious.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Common Ways Faults Appear */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Common Ways Faults Appear
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electrical faults can take many different forms, each with unique characteristics that
              electricians must learn to recognise.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 my-6">
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-white text-sm mb-1">Short Circuit</p>
                <p className="text-xs text-white/80">Line and neutral or line-to-line conductors make unintended contact, creating dangerous current levels</p>
              </div>
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-white text-sm mb-1">Earth Fault</p>
                <p className="text-xs text-white/80">Live conductors make contact with earth or earthed metalwork, creating shock hazards</p>
              </div>
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-white text-sm mb-1">Open Circuit</p>
                <p className="text-xs text-white/80">Conductor is broken or disconnected, stopping current flow completely</p>
              </div>
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-white text-sm mb-1">Insulation Fault</p>
                <p className="text-xs text-white/80">Insulation breaks down, allowing leakage currents between conductors</p>
              </div>
            </div>

            <p className="text-sm text-white/90">
              Each type of fault has unique characteristics, but all represent a breakdown in safe operation
              that must be investigated and corrected.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Why Understanding Faults Matters */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Why Understanding Faults Matters
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Clear understanding of faults is essential for safe electrical practice and professional competence.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Professional Benefits</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Enables intelligent testing and accurate result interpretation</li>
                  <li>Allows recognition of unsafe circuit conditions</li>
                  <li>Builds foundation for safe working practices</li>
                  <li>Supports proper communication with supervisors and clients</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Safety Impact</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Prevents accidents and injuries</li>
                  <li>Ensures legal compliance with BS 7671</li>
                  <li>Protects property from fire and damage</li>
                  <li>Maintains electrical system reliability</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
              <p className="text-sm font-medium text-red-400 mb-2">Critical Warning</p>
              <p className="text-sm text-white">
                Faults are not just technical issues — they are direct hazards that can cause serious injury
                or death if not properly identified and corrected. The HSE reports over 1,000 workplace
                electrical accidents per year in the UK.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">On-Site Best Practices</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Treat all unexplained test results as a potential fault until proven otherwise</li>
                <li>Always isolate and prove dead before investigating suspected faults</li>
                <li>Use systematic testing procedures following BS 7671 guidance</li>
                <li>Document all fault findings with photographs and detailed notes</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Communication and Reporting</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Use correct technical terminology when describing faults</li>
                <li>Clearly explain safety implications to non-technical personnel</li>
                <li>Provide recommendations for fault rectification with priority levels</li>
                <li>Follow company procedures for reporting dangerous conditions</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Assuming circuits are dead</strong> — always test first</li>
                <li><strong>Replacing components without testing</strong> — diagnose before replacing</li>
                <li><strong>Ignoring intermittent faults</strong> — they often indicate serious problems</li>
                <li><strong>Poor documentation</strong> — always record findings accurately</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Real-World Example */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Real-World Example</h2>
          <div className="p-4 rounded-lg bg-white/5">
            <h3 className="text-sm font-medium text-white mb-3">Case Study: Misdiagnosed Circuit Breaker Problem</h3>
            <p className="text-sm text-white mb-4">
              An apprentice was asked to investigate a socket circuit that repeatedly tripped the 32A Type B MCB
              within minutes of being reset. Instead of recognising this pattern as indicating a possible short
              circuit fault, he assumed the circuit breaker itself was faulty and replaced it with a new one.
              The problem continued with the new MCB also tripping repeatedly.
            </p>

            <p className="text-sm text-white mb-3">
              A qualified electrician then conducted proper fault-finding procedures:
            </p>

            <ol className="list-decimal ml-6 space-y-1 text-sm text-white mb-4">
              <li>Isolated the circuit and proved dead</li>
              <li>Conducted insulation resistance tests between conductors</li>
              <li>Found very low resistance (0.02Ω) between line and neutral</li>
              <li>Traced the fault to a socket where conductors had been pinched together</li>
              <li>Rectified by repositioning conductors and ensuring adequate space</li>
            </ol>

            <div className="p-3 rounded bg-red-500/10 border-l-2 border-red-500/50">
              <p className="text-sm text-white">
                <strong>Cost of Misdiagnosis:</strong> Wasted time (4 hours), unnecessary parts cost (£45 for new MCB),
                and potential safety risks from the unresolved short circuit fault.
              </p>
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

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Pocket Guide */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Quick Reference</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h3 className="text-sm font-medium text-white mb-3">Fault Recognition Signs</h3>
              <ul className="text-xs text-white space-y-1">
                <li>Repeated circuit breaker tripping</li>
                <li>Unusual readings during testing</li>
                <li>Equipment not working as expected</li>
                <li>Signs of overheating or burning</li>
                <li>Unexpected voltages on metalwork</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-white mb-3">Action Steps</h3>
              <ul className="text-xs text-white space-y-1">
                <li>Isolate the circuit immediately</li>
                <li>Document the fault symptoms</li>
                <li>Use correct test procedures</li>
                <li>Report findings accurately</li>
                <li>Never ignore unexplained results</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Recap */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">Recap</h2>
          <p className="text-white leading-relaxed">
            A fault is any defect or abnormal condition that prevents a circuit from operating safely and correctly.
            Common examples include short circuits, earth faults, open circuits, insulation breakdown, and polarity faults.
            Recognising faults is critical because they create risks of shock, fire, or equipment damage. Understanding
            the definition of a fault is the first step in learning how to test, diagnose, and correct problems in
            electrical installations.
          </p>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../1-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Module7Section1_1;
