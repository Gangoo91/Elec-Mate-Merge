import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import UnitsPocketCard from "@/components/apprentice-courses/UnitsPocketCard";
import useSEO from "@/hooks/useSEO";

const TITLE = "Troubleshooting Low Insulation - Module 4 Section 6";
const DESCRIPTION = "Learn systematic fault-finding techniques for low insulation resistance readings including common causes and solutions.";

const quickCheckQuestions = [
  {
    id: "half-split",
    question: "The half-split method works by:",
    options: [
      "Testing at half voltage",
      "Disconnecting at midpoint and testing each half",
      "Using two meters simultaneously",
      "Testing only half the conductors"
    ],
    correctIndex: 1,
    explanation: "Disconnect at the midpoint and test each half. The faulty section shows low IR. Repeat to narrow down location efficiently."
  },
  {
    id: "accessory-check",
    question: "When checking accessories for IR faults:",
    options: [
      "Leave everything connected",
      "Disconnect and test accessories separately",
      "Only check visually",
      "Replace all accessories"
    ],
    correctIndex: 1,
    explanation: "Disconnect accessories and test cable alone. If cable passes, the accessory is faulty. This avoids unnecessary cable replacement."
  },
  {
    id: "moisture-test",
    question: "If IR improves after drying, this indicates:",
    options: [
      "Permanent cable damage",
      "Moisture was the problem",
      "The meter was faulty",
      "Further testing is impossible"
    ],
    correctIndex: 1,
    explanation: "Improved readings after drying confirm moisture was the cause. However, the moisture source must still be identified and addressed."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The most common cause of low IR readings is:",
    options: ["Mechanical damage", "Moisture ingress", "Age alone", "Poor cable type"],
    correctAnswer: 1,
    explanation: "Moisture is the most common cause - from water ingress, condensation, or humidity. It creates conductive paths on insulation surfaces."
  },
  {
    id: 2,
    question: "The half-split method involves:",
    options: [
      "Testing at half voltage",
      "Disconnecting at midpoint and testing each half",
      "Using two meters simultaneously",
      "Testing only half the conductors"
    ],
    correctAnswer: 1,
    explanation: "Disconnect at the midpoint, test each half separately. The faulty section shows low reading. Repeat to narrow down location."
  },
  {
    id: 3,
    question: "How many half-splits to locate a fault in 100m to within 1m?",
    options: ["About 3", "About 7", "About 15", "About 50"],
    correctAnswer: 1,
    explanation: "Each split halves the area: 100-50-25-12.5-6.25-3.125-1.56-0.78m. Seven splits locate to under 1m."
  },
  {
    id: 4,
    question: "A low L-E reading but good N-E and L-N suggests:",
    options: [
      "Problem with neutral insulation",
      "Problem with phase conductor to earth only",
      "Water in the whole cable",
      "Incorrect test procedure"
    ],
    correctAnswer: 1,
    explanation: "Only L-E failing indicates a specific problem with phase conductor insulation to earth - possibly damage or contamination affecting only that core."
  },
  {
    id: 5,
    question: "When checking accessories for IR faults:",
    options: [
      "Leave everything connected",
      "Disconnect and test accessories separately",
      "Only check visually",
      "Replace all accessories"
    ],
    correctAnswer: 1,
    explanation: "Disconnect accessories and test them individually. A faulty accessory can pull down the whole circuit's IR reading."
  },
  {
    id: 6,
    question: "If IR improves after drying, this indicates:",
    options: [
      "Permanent cable damage",
      "Moisture was the problem",
      "The meter was faulty",
      "Further testing is impossible"
    ],
    correctAnswer: 1,
    explanation: "Improved readings after drying confirm moisture was the cause. However, the source of moisture must be identified and addressed."
  },
  {
    id: 7,
    question: "Rodent damage typically causes:",
    options: [
      "Uniformly low readings across all cables",
      "Localised damage with bite marks visible",
      "Only neutral faults",
      "High IR readings"
    ],
    correctAnswer: 1,
    explanation: "Rodent damage creates localised insulation damage with characteristic bite marks. It often affects multiple conductors in the same location."
  },
  {
    id: 8,
    question: "The Polarisation Index (PI) test measures:",
    options: [
      "Voltage polarity",
      "How IR changes over time under test",
      "Earth electrode resistance",
      "RCD trip time"
    ],
    correctAnswer: 1,
    explanation: "PI testing compares IR at 1 minute vs 10 minutes. Good insulation shows increasing reading; degraded insulation shows decreasing or stable reading."
  },
  {
    id: 9,
    question: "Before replacing cable for low IR, you should:",
    options: [
      "Just replace it immediately",
      "Investigate and confirm the cause",
      "Only visual inspection is needed",
      "Wait one year"
    ],
    correctAnswer: 1,
    explanation: "Investigate thoroughly first. The fault may be easily repairable (moisture, poor termination, damaged accessory) without cable replacement."
  },
  {
    id: 10,
    question: "Junction boxes with low IR may have:",
    options: [
      "Too many cables",
      "Moisture, contamination, or poor connections",
      "Wrong cable colours",
      "Oversized terminals"
    ],
    correctAnswer: 1,
    explanation: "Junction boxes are common fault locations due to moisture ingress, contamination, loose connections causing heat, or poor installation."
  }
];

const faqs = [
  {
    question: "What's the most common cause of low IR?",
    answer: "Moisture is the most common cause - either from water ingress, condensation, or high humidity. The good news is moisture-related failures often improve when dried out, though the source must be identified and addressed."
  },
  {
    question: "How does the half-split method work?",
    answer: "Disconnect the circuit at the midpoint. Test both halves separately. The faulty half reads low. Then split that half again and repeat. Each step halves the search area. A 100m cable takes only 7 tests to locate fault to within 1m."
  },
  {
    question: "Can damaged insulation be repaired?",
    answer: "Minor damage can sometimes be repaired using appropriate insulation tape or heat-shrink for cables, or by replacing damaged accessories. Significant or multiple damage points usually require cable replacement."
  },
  {
    question: "Why would only one conductor have low IR?",
    answer: "Single conductor failure often indicates mechanical damage affecting only that core, or water tracking along one conductor. It could also be a poor termination at one end allowing moisture into that specific core."
  },
  {
    question: "Should I test individual accessories?",
    answer: "Yes. Disconnect accessories and test them separately. A faulty socket, switch, or junction box with degraded insulation will affect the whole circuit reading. Also check accessory internal wiring."
  },
  {
    question: "What if the cable route is inaccessible?",
    answer: "Test from both ends and at any accessible intermediate points. Consider megger testing with extended test duration - degraded insulation may show decreasing readings over time under sustained test voltage (Polarisation Index testing)."
  }
];

const InspectionTestingModule4Section6 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-4">
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
            <span>Module 4 Section 6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Troubleshooting Low Insulation
          </h1>
          <p className="text-white/80">
            Systematic fault-finding techniques for low IR readings
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Method:</strong> Systematic isolation and testing</li>
              <li><strong>Common:</strong> Moisture, damage, contamination</li>
              <li><strong>Technique:</strong> Half-split to locate quickly</li>
              <li><strong>Check:</strong> Accessories, junction boxes first</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Common Causes</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Moisture:</strong> Water ingress, condensation</li>
              <li><strong>Mechanical:</strong> Nails, screws, crushing</li>
              <li><strong>Heat:</strong> Overloading, poor connections</li>
              <li><strong>Age:</strong> Natural degradation over time</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify common causes of low IR",
              "Use the half-split method efficiently",
              "Conduct visual inspections",
              "Handle environmental factors",
              "Apply appropriate remedial actions",
              "Document fault-finding process"
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

        {/* Section 1: Common Causes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Common Causes
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="space-y-3 my-6">
              <div className="p-3 rounded-lg bg-blue-500/10">
                <p className="text-blue-400 font-medium text-sm">Moisture Ingress</p>
                <p className="text-white/70 text-sm">Water entering through damaged enclosures, rising damp, or condensation</p>
              </div>
              <div className="p-3 rounded-lg bg-red-500/10">
                <p className="text-red-400 font-medium text-sm">Mechanical Damage</p>
                <p className="text-white/70 text-sm">Nails, screws, crushing, abrasion, or rodent damage to cables</p>
              </div>
              <div className="p-3 rounded-lg bg-orange-500/10">
                <p className="text-orange-400 font-medium text-sm">Heat Damage</p>
                <p className="text-white/70 text-sm">Overloading, poor connections, or fire damage degrading insulation</p>
              </div>
              <div className="p-3 rounded-lg bg-amber-500/10">
                <p className="text-amber-400 font-medium text-sm">Age Degradation</p>
                <p className="text-white/70 text-sm">Natural breakdown of insulating materials over time</p>
              </div>
              <div className="p-3 rounded-lg bg-purple-500/10">
                <p className="text-purple-400 font-medium text-sm">Chemical Contamination</p>
                <p className="text-white/70 text-sm">Solvents, oils, cleaning fluids attacking insulation</p>
              </div>
              <div className="p-3 rounded-lg bg-elec-yellow/10">
                <p className="text-elec-yellow font-medium text-sm">Poor Installation</p>
                <p className="text-white/70 text-sm">Damaged during install, incorrect cable for environment</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Half-Split Method */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Half-Split Method
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="my-6 p-4 rounded-lg bg-elec-yellow/10">
              <p className="text-elec-yellow font-semibold">Efficient Fault Location</p>
              <p className="text-white/60 text-sm">Each test halves the search area</p>
            </div>

            <div className="my-6">
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>1.</strong> Test full circuit - confirm low IR</li>
                <li><strong>2.</strong> Disconnect at approximate midpoint</li>
                <li><strong>3.</strong> Test each half separately</li>
                <li><strong>4.</strong> Identify which half has low IR</li>
                <li><strong>5.</strong> Disconnect that half at its midpoint</li>
                <li><strong>6.</strong> Repeat until fault located</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Example:</strong> A 100m cable takes only 7 half-splits to locate fault to within 1m (100-50-25-12.5-6.25-3.1-1.6-0.8m)
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 3: Visual Inspection */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Visual Inspection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Before extensive testing, visual inspection often reveals the cause:
            </p>

            <div className="grid grid-cols-2 gap-2 my-6">
              {[
                "Water stains or damp patches",
                "Discoloured insulation",
                "Burn marks at terminations",
                "Physical cable damage",
                "Signs of rodent activity",
                "Corroded terminals",
                "Condensation in enclosures",
                "Cable entry seal failures"
              ].map((item, i) => (
                <div key={i} className="text-sm text-white/80">{item}</div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Accessory Checks */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Accessory Checks
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Accessories are common fault locations:
            </p>

            <div className="space-y-3 my-6">
              <div className="p-3 rounded-lg bg-amber-500/10">
                <p className="text-amber-400 font-medium text-sm">Socket Outlets</p>
                <p className="text-white/70 text-sm">Liquid spills, steam (kitchens/bathrooms), damaged terminals from plug insertion.</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-500/10">
                <p className="text-blue-400 font-medium text-sm">Junction Boxes</p>
                <p className="text-white/70 text-sm">Often in damp locations (lofts, under floors). Check seals and terminal condition.</p>
              </div>
              <div className="p-3 rounded-lg bg-purple-500/10">
                <p className="text-purple-400 font-medium text-sm">External Fittings</p>
                <p className="text-white/70 text-sm">Weathering, failed seals, condensation ingress. Particularly vulnerable.</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Test Method:</strong> Disconnect accessory and test cable alone. If cable passes, the accessory is faulty.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 5: Moisture Testing */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Moisture Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Moisture is the most common cause. Confirm by:
            </p>

            <div className="my-6">
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Apply heat with heat gun (carefully!) - reading improves if moisture present</li>
                <li>Leave circuit isolated overnight in heated building - re-test next day</li>
                <li>Compare readings on similar circuits in same area</li>
                <li>Check for condensation, water staining, damp smell</li>
              </ul>
            </div>

            <p className="text-sm text-red-400/80">
              <strong>Warning:</strong> Even if drying improves IR, identify and fix the moisture source or it will recur.
            </p>
          </div>
        </section>

        {/* Section 6: Remedial Actions */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Remedial Actions
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="space-y-4 my-6">
              <div className="border-l-2 border-emerald-500 pl-4">
                <p className="text-emerald-400 font-medium text-sm">Moisture</p>
                <p className="text-white/70 text-sm">Dry thoroughly, repair water ingress point, improve ventilation, consider IP-rated enclosures.</p>
              </div>
              <div className="border-l-2 border-blue-400 pl-4">
                <p className="text-blue-400 font-medium text-sm">Localised Damage</p>
                <p className="text-white/70 text-sm">Cut out damaged section and joint if sufficient slack. Otherwise replace affected cable length.</p>
              </div>
              <div className="border-l-2 border-amber-400 pl-4">
                <p className="text-amber-400 font-medium text-sm">Poor Terminations</p>
                <p className="text-white/70 text-sm">Strip back to clean insulation, re-terminate properly, ensure correct torque.</p>
              </div>
              <div className="border-l-2 border-purple-400 pl-4">
                <p className="text-purple-400 font-medium text-sm">Accessory Faults</p>
                <p className="text-white/70 text-sm">Replace faulty accessory. Check it hasn't damaged the cable at entry point.</p>
              </div>
              <div className="border-l-2 border-red-400 pl-4">
                <p className="text-red-400 font-medium text-sm">General Degradation</p>
                <p className="text-white/70 text-sm">If multiple circuits affected, may need full rewire. Age-related failure is typically widespread.</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Start Simple</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Check accessible points first - accessories, junction boxes, consumer unit</li>
                <li>Don't immediately assume cable damage</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Record Everything</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Document each test result during fault-finding</li>
                <li>This shows your systematic approach and helps if you need to revisit</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Consider History</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Ask about recent work, water leaks, or changes</li>
                <li>Recent building work often causes cable damage</li>
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

        {/* Reference Cards */}
        <section className="mb-10">
          <UnitsPocketCard />

          <div className="mt-6 p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Troubleshooting</p>
                <ul className="space-y-0.5">
                  <li>Most common: Moisture ingress</li>
                  <li>Half-split: Disconnect midpoint</li>
                  <li>100m cable: ~7 splits to 1m</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Best Practice</p>
                <ul className="space-y-0.5">
                  <li>Check accessories first</li>
                  <li>Test with heat to find moisture</li>
                  <li>Document all steps</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Module Complete */}
        <section className="mb-10">
          <div className="p-6 rounded-lg bg-elec-yellow/10 text-center">
            <CheckCircle className="w-12 h-12 text-elec-yellow mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Module 4 Complete!</h3>
            <p className="text-white/70 mb-4">
              You've mastered Insulation Resistance Testing. Ready for Earth Fault Loop Impedance?
            </p>
          </div>
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-4/section-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-5">
              Next Module
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default InspectionTestingModule4Section6;
