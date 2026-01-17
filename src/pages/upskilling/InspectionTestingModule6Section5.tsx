import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import UnitsPocketCard from "@/components/apprentice-courses/UnitsPocketCard";
import useSEO from "@/hooks/useSEO";

const TITLE = "Discriminating & Selective RCDs - Module 6 Section 5";
const DESCRIPTION = "Master RCD discrimination and selectivity to ensure correct sequential tripping and maintain supply to unaffected circuits during fault conditions.";

const quickCheckQuestions = [
  {
    id: "discrimination-meaning",
    question: "What is meant by 'discrimination' or 'selectivity' between RCDs?",
    options: [
      "The ability to detect different types of faults",
      "Ensuring only the RCD nearest the fault trips, not upstream RCDs",
      "The difference between 30mA and 100mA rated RCDs",
      "The time taken for an RCD to reset after tripping"
    ],
    correctIndex: 1,
    explanation: "Discrimination (selectivity) means the RCD nearest the fault trips while upstream RCDs remain closed, maintaining supply to unaffected circuits."
  },
  {
    id: "s-type-delay",
    question: "What is the minimum trip delay for an S-type RCD at 1xIdn?",
    options: [
      "40ms",
      "130ms",
      "300ms",
      "500ms"
    ],
    correctIndex: 1,
    explanation: "S-type RCDs have a minimum delay of 130ms at rated residual current. They must still trip within 500ms at 1xIdn and 200ms at 5xIdn."
  },
  {
    id: "s-type-protection",
    question: "Why shouldn't S-type RCDs be used for circuits requiring additional protection?",
    options: [
      "They cost more",
      "They have a minimum delay of 50ms at 5xIdn, not meeting 40ms requirement",
      "They only work on TT systems",
      "They require special test equipment"
    ],
    correctIndex: 1,
    explanation: "S-type RCDs have a minimum delay of 50ms at 5xIdn, which doesn't meet the 40ms maximum required for additional protection. General-type 30mA RCDs must be used."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is meant by 'discrimination' or 'selectivity' between RCDs?",
    options: [
      "The ability to detect different types of faults",
      "Ensuring only the RCD nearest the fault trips, not upstream RCDs",
      "The difference between 30mA and 100mA rated RCDs",
      "The time taken for an RCD to reset after tripping"
    ],
    correctAnswer: 1,
    explanation: "Discrimination (selectivity) means the RCD nearest the fault trips while upstream RCDs remain closed, maintaining supply to unaffected circuits."
  },
  {
    id: 2,
    question: "What does the 'S' in an S-type RCD stand for?",
    options: [
      "Standard",
      "Selective (time-delayed)",
      "Single-phase",
      "Surge-protected"
    ],
    correctAnswer: 1,
    explanation: "S-type (Selective) RCDs have an intentional time delay to allow downstream general-type RCDs to trip first, achieving discrimination."
  },
  {
    id: 3,
    question: "What is the minimum trip delay for an S-type RCD at 1xIdn?",
    options: [
      "40ms",
      "130ms",
      "300ms",
      "500ms"
    ],
    correctAnswer: 1,
    explanation: "S-type RCDs have a minimum delay of 130ms at rated residual current. They must still trip within 500ms at 1xIdn and 200ms at 5xIdn."
  },
  {
    id: 4,
    question: "For discrimination to work between two RCDs in series, what should their Idn ratings be?",
    options: [
      "Both the same rating",
      "Upstream should be lower than downstream",
      "Upstream should be at least 3x the downstream rating",
      "Rating doesn't matter if time discrimination is used"
    ],
    correctAnswer: 2,
    explanation: "For current discrimination, the upstream RCD should typically be at least 3x the rating of the downstream RCD. This can be combined with time delay for better discrimination."
  },
  {
    id: 5,
    question: "A 30mA general RCD and 100mA S-type RCD are installed in series. Which should be upstream?",
    options: [
      "30mA general RCD upstream",
      "100mA S-type RCD upstream",
      "Either can be upstream",
      "They should not be installed in series"
    ],
    correctAnswer: 1,
    explanation: "The 100mA S-type should be upstream. Its higher rating and time delay allow the 30mA general RCD to trip first for faults on its circuit while maintaining supply to other circuits."
  },
  {
    id: 6,
    question: "What is the maximum trip time for an S-type RCD at 5xIdn?",
    options: [
      "40ms",
      "150ms",
      "200ms",
      "500ms"
    ],
    correctAnswer: 2,
    explanation: "S-type RCDs must trip within 200ms at 5xIdn (compared to 40ms for general-type RCDs), allowing time for downstream devices to operate first."
  },
  {
    id: 7,
    question: "In a domestic installation with an RCBO board, how is discrimination typically achieved?",
    options: [
      "All RCBOs trip simultaneously",
      "The incomer RCD is S-type, individual RCBOs are general-type",
      "No discrimination is possible with RCBO boards",
      "Higher rated RCBOs trip first"
    ],
    correctAnswer: 1,
    explanation: "An upstream S-type RCD (100mA or 300mA) at the incomer combined with general-type 30mA RCBOs provides discrimination - the RCBO trips first, the incomer remains closed."
  },
  {
    id: 8,
    question: "What test confirms discrimination between series-connected RCDs?",
    options: [
      "Insulation resistance test",
      "Ramp testing to determine actual trip thresholds",
      "Earth electrode resistance test",
      "Prospective fault current test"
    ],
    correctAnswer: 1,
    explanation: "Ramp testing reveals the actual trip current of each RCD, confirming the downstream RCD will trip before the upstream device reaches its trip threshold."
  },
  {
    id: 9,
    question: "Why might nuisance tripping occur if discrimination fails?",
    options: [
      "The fault current is too low",
      "The upstream RCD trips, disconnecting all circuits instead of just the faulty one",
      "The downstream RCD trips too slowly",
      "Earth leakage is cumulative"
    ],
    correctAnswer: 1,
    explanation: "Without discrimination, the upstream RCD may trip first, disconnecting all circuits including healthy ones - causing inconvenience and potential safety issues."
  },
  {
    id: 10,
    question: "For an S-type RCD at 1xIdn, what is the trip time window?",
    options: [
      "0 to 300ms",
      "130ms to 500ms",
      "40ms to 200ms",
      "0 to 40ms"
    ],
    correctAnswer: 1,
    explanation: "S-type RCDs have a trip time window of 130ms (minimum delay) to 500ms (maximum) at 1xIdn, allowing time for downstream general-type RCDs to operate first."
  }
];

const faqs = [
  {
    question: "Can two 30mA RCDs be installed in series?",
    answer: "Yes, but discrimination may not be achievable without time delay. If an upstream 30mA S-type and downstream 30mA general-type are used, the time delay provides some discrimination. However, for better selectivity, the upstream should have a higher rating (e.g., 100mA S-type upstream, 30mA general downstream)."
  },
  {
    question: "What happens if discrimination doesn't work?",
    answer: "Without discrimination, a fault on one circuit may trip the upstream RCD, disconnecting all circuits protected by that device. This causes unnecessary disruption to unaffected circuits and can create safety issues if essential equipment (like emergency lighting) loses power."
  },
  {
    question: "Why is time-delayed discrimination important in commercial installations?",
    answer: "Commercial installations often have critical loads that must remain operational during faults on other circuits. Time-delayed upstream RCDs ensure only the faulty circuit loses power while maintaining supply to essential services like servers, refrigeration, or emergency systems."
  },
  {
    question: "Can RCBOs provide discrimination?",
    answer: "Individual RCBOs don't provide discrimination between each other as they typically have the same rating and response time. Discrimination is achieved by having an S-type RCD upstream of general-type RCBOs, or by using RCBOs with different ratings where appropriate."
  },
  {
    question: "How do I verify discrimination has been achieved?",
    answer: "Ramp testing each RCD reveals actual trip thresholds. For discrimination, the downstream RCD's trip current must be below the upstream RCD's minimum sensitivity (50% of Idn). Time discrimination can be verified by comparing trip times at test currents."
  },
  {
    question: "Are S-type RCDs suitable for personal protection circuits?",
    answer: "S-type RCDs are typically used upstream for discrimination, not for final circuits requiring personal protection. The time delay means they don't provide the rapid disconnection needed for personal protection (max 40ms at 5xIdn) - general-type 30mA RCDs are required for this."
  }
];

const InspectionTestingModule6Section5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-6">
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
            <span>Module 6 Section 5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Discriminating & Selective RCDs
          </h1>
          <p className="text-white/80">
            Ensure correct sequential operation to maintain supply during faults
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Goal:</strong> Only RCD nearest fault trips</li>
              <li><strong>S-type:</strong> Time-delayed (130-500ms at 1xIdn)</li>
              <li><strong>Current:</strong> Upstream at least 3x downstream</li>
              <li><strong>Combine:</strong> Both methods for best results</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">S-Type Trip Times</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>1xIdn:</strong> 130ms - 500ms</li>
              <li><strong>2xIdn:</strong> 60ms - 200ms</li>
              <li><strong>5xIdn:</strong> 50ms - 150ms</li>
              <li><strong>NOT for:</strong> Additional protection circuits</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand discrimination between series-connected RCDs",
              "Explain time-delayed (S-type) RCD characteristics",
              "Design selective RCD protection schemes",
              "Calculate discrimination requirements",
              "Verify selectivity through testing",
              "Apply discrimination in practical installations"
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

        {/* Section 1: What is Discrimination? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What is Discrimination?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Discrimination (also called selectivity) is the coordination of protective devices to ensure that only the device nearest to a fault operates, leaving upstream devices closed and maintaining supply to unaffected circuits.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Why Discrimination Matters:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Minimises disruption during fault conditions</li>
                <li>Maintains supply to critical loads</li>
                <li>Aids fault location by indicating which circuit has the fault</li>
                <li>Prevents unnecessary tripping of healthy circuits</li>
              </ul>
            </div>

            <p>
              Without discrimination, a fault on a single socket outlet could trip the main RCD and disconnect the entire installation - an unacceptable situation in most modern installations.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Methods of Achieving Discrimination */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Methods of Achieving Discrimination
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              RCD discrimination can be achieved through two methods, ideally used in combination for optimum selectivity:
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">1. Current Discrimination</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Upstream RCD has higher Idn than downstream</li>
                  <li>Ratio of at least 3:1 recommended</li>
                  <li>Example: 100mA upstream, 30mA downstream</li>
                  <li>Downstream trips before upstream threshold</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">2. Time Discrimination</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Upstream RCD has intentional time delay</li>
                  <li>S-type RCDs have built-in delay</li>
                  <li>Downstream trips before upstream times out</li>
                  <li>Most effective when combined with current</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: S-Type RCD Characteristics */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            S-Type RCD Characteristics
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              S-type (Selective) RCDs are designed specifically for upstream installation in discriminating systems. They have an intentional time delay before tripping:
            </p>

            <div className="my-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-2 text-white/60">Test Current</th>
                    <th className="text-center py-2 text-white/60">Min Delay</th>
                    <th className="text-center py-2 text-white/60">Max Trip</th>
                  </tr>
                </thead>
                <tbody className="text-white/80">
                  <tr className="border-b border-white/10">
                    <td className="py-2">1xIdn</td>
                    <td className="py-2 text-center font-mono text-elec-yellow">130ms</td>
                    <td className="py-2 text-center font-mono">500ms</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2">2xIdn</td>
                    <td className="py-2 text-center font-mono text-elec-yellow">60ms</td>
                    <td className="py-2 text-center font-mono">200ms</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2">5xIdn</td>
                    <td className="py-2 text-center font-mono text-elec-yellow">50ms</td>
                    <td className="py-2 text-center font-mono">150ms</td>
                  </tr>
                  <tr>
                    <td className="py-2">1/2xIdn</td>
                    <td className="py-2 text-center text-emerald-400" colSpan={2}>No trip</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm text-amber-300/80">
              <strong>Important:</strong> S-type RCDs are NOT suitable for additional protection (personal protection circuits) as they don't meet the 40ms requirement at 5xIdn. Use general-type 30mA RCDs for final circuits.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Practical Discrimination Schemes */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Practical Discrimination Schemes
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Common discrimination arrangements in UK installations:
            </p>

            <div className="my-6 space-y-4">
              <div className="border-l-4 border-emerald-500 pl-4">
                <p className="text-emerald-400 font-semibold">Domestic with Split-Load Board</p>
                <p className="text-white/70 text-sm">100mA S-type at incomer → 30mA RCBOs for final circuits</p>
                <p className="text-emerald-400/70 text-xs mt-1">Good discrimination</p>
              </div>
              <div className="border-l-4 border-emerald-500 pl-4">
                <p className="text-emerald-400 font-semibold">Commercial Sub-Distribution</p>
                <p className="text-white/70 text-sm">300mA S-type at sub-main → 100mA S-type at DB → 30mA general at final circuits</p>
                <p className="text-emerald-400/70 text-xs mt-1">Three-stage discrimination</p>
              </div>
              <div className="border-l-4 border-red-500 pl-4">
                <p className="text-red-400 font-semibold">Poor Practice to Avoid</p>
                <p className="text-white/70 text-sm">30mA general at incomer → 30mA general at final circuits</p>
                <p className="text-red-400/70 text-xs mt-1">No discrimination - both may trip</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 5: Testing for Discrimination */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Testing for Discrimination
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              To verify discrimination will work in practice, test both RCDs and compare their characteristics:
            </p>

            <div className="my-6 space-y-3">
              {[
                { step: 1, text: "Ramp test downstream RCD - note trip current" },
                { step: 2, text: "Ramp test upstream RCD - note trip current" },
                { step: 3, text: "Verify downstream trips at lower current than upstream's 50% threshold" },
                { step: 4, text: "Test trip times to confirm time delay discrimination" },
                { step: 5, text: "Document results on schedule of test results" }
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow/20 text-elec-yellow text-sm font-bold flex items-center justify-center flex-shrink-0">
                    {item.step}
                  </span>
                  <span className="text-white/80">{item.text}</span>
                </div>
              ))}
            </div>

            <p className="text-sm text-white/80 italic">
              <strong>Example:</strong> If a 30mA downstream RCD trips at 24mA, and a 100mA upstream S-type won't trip below 50mA (50% of 100mA), discrimination is assured by current alone, plus the time delay provides additional margin.
            </p>
          </div>
        </section>

        {/* Section 6: Documentation Requirements */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Documentation Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Where discrimination is required, the design and testing should be documented to demonstrate compliance and aid future maintenance:
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Documentation Checklist:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li>RCD types and ratings at each level</li>
                <li>Trip times at 1xIdn and 5xIdn for each RCD</li>
                <li>Ramp test results showing actual trip currents</li>
                <li>Circuit arrangement showing RCD locations</li>
                <li>Notes on discrimination achieved</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Use Both Methods</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Combine current ratio AND time delay for reliable discrimination</li>
                <li>Current alone may not be sufficient for all fault levels</li>
                <li>Time delay provides backup if current discrimination fails</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Consider Earth Leakage</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Cumulative leakage from multiple circuits may affect upstream RCDs</li>
                <li>Standing leakage reduces discrimination margin</li>
                <li>Account for leakage when selecting upstream ratings</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Personal Protection Circuits</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>S-type must NOT be used</strong> where additional protection is required</li>
                <li>Final circuits need general-type 30mA for 40ms trip at 5xIdn</li>
                <li>S-type is only for upstream discrimination</li>
              </ul>
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

        {/* Reference Card */}
        <section className="mb-10">
          <UnitsPocketCard />

          <div className="mt-6 p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">RCD Discrimination Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">S-Type Times</p>
                <ul className="space-y-0.5">
                  <li>1xIdn: 130-500ms</li>
                  <li>5xIdn: 50-150ms</li>
                  <li>Not for personal protection</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Current Ratio</p>
                <ul className="space-y-0.5">
                  <li>Upstream: 3x downstream</li>
                  <li>General @ 1xIdn: max 300ms</li>
                  <li>General @ 5xIdn: max 40ms</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Module Complete */}
        <section className="mb-10">
          <div className="p-6 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-elec-yellow/20 mb-4">
              <Zap className="w-6 h-6 text-elec-yellow" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Module 6 Complete!</h3>
            <p className="text-white/70 mb-2">
              You've mastered RCD testing including types, trip times, ramp testing, and discrimination.
            </p>
            <p className="text-elec-yellow text-sm">
              Continue to Module 7: Polarity & Functional Testing
            </p>
          </div>
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
            <Link to="/study-centre/upskilling/inspection-testing/module-6/section-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-7">
              Next Module
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default InspectionTestingModule6Section5;
