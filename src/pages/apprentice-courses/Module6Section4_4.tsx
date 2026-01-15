import { ArrowLeft, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { useState } from "react";

const Module6Section4_4 = () => {
  useSEO(
    "Common Faults Found During Continuity/Polarity Tests - Level 2 Electrical Testing & Inspection",
    "Identifying and understanding common faults discovered during continuity and polarity testing"
  );

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const quizQuestions = [
    {
      id: 1,
      question: "What is an open circuit?",
      options: ["A circuit with too many connections", "A break in continuity of the conductor", "A short circuit", "A perfectly working circuit"],
      correctAnswer: 1,
      explanation: "An open circuit is a break in continuity of the conductor, preventing current flow through the complete circuit path."
    },
    {
      id: 2,
      question: "What does a high resistance joint cause?",
      options: ["Cooling of the conductor", "Overheating and possible fire risk", "Faster current flow", "Better circuit performance"],
      correctAnswer: 1,
      explanation: "High resistance joints cause overheating due to increased I²R losses, creating a significant fire risk."
    },
    {
      id: 3,
      question: "What is the risk of a disconnected CPC?",
      options: ["Equipment may not function", "Exposed parts may become live under fault conditions", "Nothing, as neutral protects the system", "Improved energy efficiency"],
      correctAnswer: 1,
      explanation: "A disconnected CPC means exposed parts may become live under fault conditions, creating a serious shock hazard."
    },
    {
      id: 4,
      question: "What happens if line and neutral are reversed at a socket?",
      options: ["Circuit won't energise", "Appliances work but safety is compromised", "Protective devices trip instantly", "Power consumption increases"],
      correctAnswer: 1,
      explanation: "Appliances may work normally but safety is compromised as protective devices won't disconnect correctly during faults."
    },
    {
      id: 5,
      question: "Which instrument is best for confirming continuity?",
      options: ["Clamp meter", "Low resistance ohmmeter", "Socket tester", "Multimeter on voltage setting"],
      correctAnswer: 1,
      explanation: "A low resistance ohmmeter is specifically designed for accurate continuity measurements in electrical circuits."
    },
    {
      id: 6,
      question: "Why must a switch always interrupt the line conductor?",
      options: ["To reduce energy bills", "To prevent equipment being live when 'off'", "To make neutral visible", "To improve circuit efficiency"],
      correctAnswer: 1,
      explanation: "Switches must interrupt the line conductor to ensure equipment is truly dead when switched off, preventing shock hazards."
    },
    {
      id: 7,
      question: "Which of the following is a common cause of open circuits?",
      options: ["Over-tightened CPC", "Loose terminations or damaged cable", "Correct polarity at sockets", "Proper cable routing"],
      correctAnswer: 1,
      explanation: "Loose terminations or damaged cables are the most common causes of open circuits in electrical installations."
    },
    {
      id: 8,
      question: "What effect can poor workmanship have on polarity?",
      options: ["No effect at all", "Can cause reversed polarity or missing CPC connections", "Can only cause high insulation readings", "Only affects aesthetics"],
      correctAnswer: 1,
      explanation: "Poor workmanship commonly results in reversed polarity or missing CPC connections, compromising installation safety."
    },
    {
      id: 9,
      question: "How should faults be recorded during testing?",
      options: ["Ignored if the circuit works", "Clearly on the test sheet and rectified before energising", "Noted verbally only", "Recorded after energising"],
      correctAnswer: 1,
      explanation: "All faults must be clearly recorded on test sheets and rectified before energising for safety and compliance."
    },
    {
      id: 10,
      question: "What should never be done if a CPC fault is found?",
      options: ["Continue testing other circuits", "Energise the circuit", "Record the fault", "Report to supervisor"],
      correctAnswer: 1,
      explanation: "Never energise a circuit with a known CPC fault as this creates serious shock hazards to users."
    }
  ];

  const faqs = [
    {
      question: "Can appliances still work if polarity is reversed?",
      answer: "Yes, but the installation is unsafe because protective devices may not operate correctly."
    },
    {
      question: "Is a high resistance joint always obvious?",
      answer: "No, often the circuit works normally but generates heat over time, posing a fire risk."
    },
    {
      question: "What should be done if an open circuit is found?",
      answer: "Locate and repair the break or loose connection before the circuit is energised."
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/5 -ml-2 min-h-[44px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 6.4
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 6</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 6.4.4</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Common Faults Found During Continuity/Polarity Tests
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Recognise common faults found during continuity and polarity tests
            </p>
          </header>

          {/* Summary Box */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <h2 className="font-semibold text-white mb-3">Quick Summary</h2>
            <ul className="space-y-2 text-sm text-white/80">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Open circuits break conductor continuity</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>High resistance joints cause overheating</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Disconnected CPC = shock hazard</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Reversed polarity compromises safety</span>
              </li>
            </ul>
          </div>

          {/* Introduction */}
          <section className="mb-10">
            <p className="text-white/80 leading-relaxed">
              Continuity and polarity testing are designed not only to confirm correct wiring but also to identify common faults that compromise safety and functionality. These tests reveal issues such as open circuits, incorrect polarity, high resistance joints, and missing CPCs. If left undetected, these faults can result in electric shock, fire hazards, or premature equipment failure.
            </p>
          </section>

          {/* Section 1: Common Continuity Faults */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Common Continuity Faults
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-medium text-white mb-3">Open Circuit Conductors</h3>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Caused by loose terminations at accessories or distribution boards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Broken wires due to damage during installation or maintenance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Missing links or connections in ring circuits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Detected by infinite resistance readings during continuity tests</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <h3 className="font-medium text-white mb-3">High Resistance Joints</h3>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">⚠</span>
                    <span>Poor connections due to inadequate tightening of terminals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">⚠</span>
                    <span>Corroded terminals from moisture ingress or age</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">⚠</span>
                    <span>Causes overheating due to increased I²R losses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">⚠</span>
                    <span>Creates significant fire risk from excessive heat generation</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <h3 className="font-medium text-white mb-3">Disconnected CPC</h3>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">⚠</span>
                    <span>Loss of protective earthing creating severe shock risk</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">⚠</span>
                    <span>Exposed metalwork may become live under fault conditions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">⚠</span>
                    <span>Protective devices cannot operate effectively without earth path</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            id="continuity-faults-check"
            question="Which reading most strongly indicates an open circuit during continuity testing?"
            options={["Very low resistance", "Infinite resistance", "230 V present", "0 A current"]}
            correctIndex={1}
            explanation="An infinite resistance reading (often displayed as 'OL' or no reading) indicates a complete break in the circuit path, confirming an open circuit."
          />

          {/* Section 2: Common Polarity Faults */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Common Polarity Faults
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-medium text-white mb-3">Line and Neutral Reversed</h3>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Appliances may still operate but protective devices won't function correctly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Internal fuses and switches in appliances designed to break line conductor only</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>RCD protection effectiveness reduced when polarity is incorrect</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <h3 className="font-medium text-white mb-3">Switch Wired in Neutral</h3>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">⚠</span>
                    <span>Equipment remains permanently live even when switched off</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">⚠</span>
                    <span>Serious shock hazard during maintenance, lamp changes, or cleaning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">⚠</span>
                    <span>Violates BS 7671 Regulation 132.7 requiring single-pole devices to break line</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            id="polarity-faults-check"
            question="Why must a single-pole switch break the line conductor rather than the neutral?"
            options={["To reduce energy bills", "To ensure equipment isn't live when switched off", "To share load on neutrals", "To prevent RCD tripping"]}
            correctIndex={1}
            explanation="Single-pole switches must break the line conductor to ensure equipment is truly dead when switched off, preventing shock hazards during maintenance or lamp changes."
          />

          {/* Section 3: Interpretation of Results */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Interpretation of Results
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-medium text-white mb-3">Acceptable Values and Limits</h3>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>CPC continuity: should not exceed (R1 + R2) values specified in BS 7671</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Ring circuit end-to-end resistance: typically 0.05Ω to 1.67Ω depending on cable size</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Polarity confirmation: correct at all points - no tolerance for incorrect connections</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>High resistance joints: any reading significantly above cable resistance indicates problems</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            id="results-interpretation-check"
            question="A much higher than expected R1+R2 reading suggests what type of fault?"
            options={["Short circuit", "High resistance joint", "Correct continuity", "Open circuit in CPC"]}
            correctIndex={1}
            explanation="A much higher than expected R1+R2 reading typically indicates a high resistance joint somewhere in the circuit, which could cause overheating and fire risk."
          />

          {/* Section 4: Real-World Example */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Real-World Example: Kitchen Circuit Fault
            </h2>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h3 className="font-medium text-white mb-3">Scenario</h3>
              <p className="text-sm text-white/80 mb-4">
                A domestic kitchen was being rewired with a new 32A ring final circuit. The circuit included 8 socket outlets and was wired with 2.5mm² T&E cable.
              </p>

              <h4 className="font-medium text-white mb-2">Test Results</h4>
              <div className="bg-[#121212] rounded p-3 mb-4">
                <ul className="text-sm text-white/80 space-y-1">
                  <li>End-to-end line resistance: 0.82Ω (expected ~0.8Ω)</li>
                  <li>End-to-end neutral resistance: 0.84Ω (expected ~0.8Ω)</li>
                  <li>End-to-end CPC resistance: Infinite (∞) - FAULT DETECTED</li>
                </ul>
              </div>

              <h4 className="font-medium text-white mb-2">Investigation</h4>
              <p className="text-sm text-white/80 mb-4">
                Testing each socket in sequence revealed the fault between sockets 4 and 5. Visual inspection at socket 4 showed the CPC terminal screw was finger-tight only - the cable had pulled out during final fitting.
              </p>

              <h4 className="font-medium text-white mb-2">Corrective Action</h4>
              <ul className="text-sm text-white/80 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Terminal properly tightened and retested</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Final readings: Line 0.82Ω, Neutral 0.84Ω, CPC 0.85Ω - all acceptable</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Circuit successfully energised after completing all tests</span>
                </li>
              </ul>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Frequently Asked Questions
            </h2>
            <div className="space-y-2">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-white/10 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full p-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors min-h-[44px] touch-manipulation"
                  >
                    <span className="font-medium text-white text-sm">{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-white/60 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === index && (
                    <div className="px-4 pb-4">
                      <p className="text-sm text-white/70">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Key Takeaways */}
          <section className="mb-10">
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h2 className="font-semibold text-white mb-3">Key Takeaways</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-white mb-2">Know It</h3>
                  <p className="text-sm text-white/70">Common faults: open circuits, high resistance joints, disconnected CPCs, and reversed polarity</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white mb-2">Spot It</h3>
                  <p className="text-sm text-white/70">Visual cues: scorching, loose terminals, incorrect connections, and damaged cables</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white mb-2">Test It</h3>
                  <p className="text-sm text-white/70">Measurements: infinite resistance = open circuit, high R1+R2 = poor joints</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white mb-2">Fix It</h3>
                  <p className="text-sm text-white/70">Actions: rectify all faults, document clearly, retest, then safely energise</p>
                </div>
              </div>
            </div>
          </section>

          {/* Quiz */}
          <Quiz questions={quizQuestions} />

          {/* Navigation Footer */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10 mt-10">
            <Button
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../4-3">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Polarity Testing
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="..">
                Section Overview
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module6Section4_4;
