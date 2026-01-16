import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, AlertTriangle, Wrench, Lightbulb, HelpCircle, ChevronDown, ChevronUp, BookOpen, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import useSEO from '@/hooks/useSEO';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import UnitsPocketCard from '@/components/apprentice-courses/UnitsPocketCard';

const InspectionTestingModule4Section6 = () => {
  useSEO({
    title: "Troubleshooting Low Insulation | Inspection & Testing",
    description: "Learn systematic fault-finding techniques for low insulation resistance readings including common causes and solutions."
  });

  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const keyPoints = [
    "Systematic isolation and testing locates the source of low IR readings",
    "Common causes: moisture, damage, contamination, poor terminations, aged insulation",
    "Split circuits in half repeatedly to narrow down fault location efficiently"
  ];

  const learningOutcomes = [
    { title: "Common Causes", desc: "Identify typical problems" },
    { title: "Half-Split Method", desc: "Efficient fault location" },
    { title: "Visual Inspection", desc: "What to look for" },
    { title: "Environmental Factors", desc: "Moisture and contamination" },
    { title: "Remedial Actions", desc: "Fixing identified problems" },
    { title: "Documentation", desc: "Recording fault findings" }
  ];

  const faqs = [
    {
      q: "What's the most common cause of low IR?",
      a: "Moisture is the most common cause - either from water ingress, condensation, or high humidity. The good news is moisture-related failures often improve when dried out, though the source must be identified and addressed."
    },
    {
      q: "How does the half-split method work?",
      a: "Disconnect the circuit at the midpoint. Test both halves separately. The faulty half reads low. Then split that half again and repeat. Each step halves the search area. A 100m cable takes only 7 tests to locate fault to within 1m."
    },
    {
      q: "Can damaged insulation be repaired?",
      a: "Minor damage can sometimes be repaired using appropriate insulation tape or heat-shrink for cables, or by replacing damaged accessories. Significant or multiple damage points usually require cable replacement."
    },
    {
      q: "Why would only one conductor have low IR?",
      a: "Single conductor failure often indicates mechanical damage affecting only that core, or water tracking along one conductor. It could also be a poor termination at one end allowing moisture into that specific core."
    },
    {
      q: "Should I test individual accessories?",
      a: "Yes. Disconnect accessories and test them separately. A faulty socket, switch, or junction box with degraded insulation will affect the whole circuit reading. Also check accessory internal wiring."
    },
    {
      q: "What if the cable route is inaccessible?",
      a: "Test from both ends and at any accessible intermediate points. Consider megger testing with extended test duration - degraded insulation may show decreasing readings over time under sustained test voltage (Polarisation Index testing)."
    }
  ];

  const quizQuestions = [
    {
      question: "The most common cause of low IR readings is:",
      options: ["Mechanical damage", "Moisture ingress", "Age alone", "Poor cable type"],
      correctIndex: 1,
      explanation: "Moisture is the most common cause - from water ingress, condensation, or humidity. It creates conductive paths on insulation surfaces."
    },
    {
      question: "The half-split method involves:",
      options: [
        "Testing at half voltage",
        "Disconnecting at midpoint and testing each half",
        "Using two meters simultaneously",
        "Testing only half the conductors"
      ],
      correctIndex: 1,
      explanation: "Disconnect at the midpoint, test each half separately. The faulty section shows low reading. Repeat to narrow down location."
    },
    {
      question: "How many half-splits to locate a fault in 100m to within 1m?",
      options: ["About 3", "About 7", "About 15", "About 50"],
      correctIndex: 1,
      explanation: "Each split halves the area: 100→50→25→12.5→6.25→3.125→1.56→0.78m. Seven splits locate to under 1m."
    },
    {
      question: "A low L-E reading but good N-E and L-N suggests:",
      options: [
        "Problem with neutral insulation",
        "Problem with phase conductor to earth only",
        "Water in the whole cable",
        "Incorrect test procedure"
      ],
      correctIndex: 1,
      explanation: "Only L-E failing indicates a specific problem with phase conductor insulation to earth - possibly damage or contamination affecting only that core."
    },
    {
      question: "When checking accessories for IR faults:",
      options: [
        "Leave everything connected",
        "Disconnect and test accessories separately",
        "Only check visually",
        "Replace all accessories"
      ],
      correctIndex: 1,
      explanation: "Disconnect accessories and test them individually. A faulty accessory can pull down the whole circuit's IR reading."
    },
    {
      question: "If IR improves after drying, this indicates:",
      options: [
        "Permanent cable damage",
        "Moisture was the problem",
        "The meter was faulty",
        "Further testing is impossible"
      ],
      correctIndex: 1,
      explanation: "Improved readings after drying confirm moisture was the cause. However, the source of moisture must be identified and addressed."
    },
    {
      question: "Rodent damage typically causes:",
      options: [
        "Uniformly low readings across all cables",
        "Localised damage with bite marks visible",
        "Only neutral faults",
        "High IR readings"
      ],
      correctIndex: 1,
      explanation: "Rodent damage creates localised insulation damage with characteristic bite marks. It often affects multiple conductors in the same location."
    },
    {
      question: "The Polarisation Index (PI) test measures:",
      options: [
        "Voltage polarity",
        "How IR changes over time under test",
        "Earth electrode resistance",
        "RCD trip time"
      ],
      correctIndex: 1,
      explanation: "PI testing compares IR at 1 minute vs 10 minutes. Good insulation shows increasing reading; degraded insulation shows decreasing or stable reading."
    },
    {
      question: "Before replacing cable for low IR, you should:",
      options: [
        "Just replace it immediately",
        "Investigate and confirm the cause",
        "Only visual inspection is needed",
        "Wait one year"
      ],
      correctIndex: 1,
      explanation: "Investigate thoroughly first. The fault may be easily repairable (moisture, poor termination, damaged accessory) without cable replacement."
    },
    {
      question: "Junction boxes with low IR may have:",
      options: [
        "Too many cables",
        "Moisture, contamination, or poor connections",
        "Wrong cable colours",
        "Oversized terminals"
      ],
      correctIndex: 1,
      explanation: "Junction boxes are common fault locations due to moisture ingress, contamination, loose connections causing heat, or poor installation."
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* iOS Header */}
      <header className="sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between px-4 h-14">
          <button
            onClick={() => navigate('/study-centre/upskilling/inspection-testing/module4')}
            className="flex items-center gap-2 text-elec-yellow active:opacity-70 transition-opacity touch-manipulation"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-base">Module 4</span>
          </button>
          <span className="text-sm text-white/50 font-medium">Section 6 of 6</span>
        </div>
      </header>

      <main className="px-4 py-6 pb-safe space-y-8 max-w-3xl mx-auto">
        {/* Hero */}
        <section className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-500/20 rounded-full">
            <span className="text-purple-400 text-sm font-medium">Module 4 • Insulation Resistance</span>
          </div>
          <h1 className="text-ios-title-large font-bold text-white">
            Troubleshooting Low Insulation
          </h1>
          <p className="text-ios-body text-white/70">
            Systematic fault-finding techniques for low IR readings.
          </p>
        </section>

        {/* In 30 Seconds */}
        <Card variant="ios-elevated" className="p-5">
          <h2 className="text-ios-headline font-semibold text-white mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-elec-yellow" />
            In 30 Seconds
          </h2>
          <ul className="space-y-3">
            {keyPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-base">{point}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Learning Outcomes */}
        <section className="space-y-4">
          <h2 className="text-ios-title-2 font-bold text-white">Learning Outcomes</h2>
          <div className="grid grid-cols-2 gap-3">
            {learningOutcomes.map((outcome, i) => (
              <Card key={i} variant="ios" className="p-4">
                <p className="text-elec-yellow font-semibold text-sm mb-1">{outcome.title}</p>
                <p className="text-white/60 text-sm">{outcome.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Content Section 01 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">01</span>
            <h2 className="text-ios-title-2 font-bold text-white">Common Causes</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <div className="space-y-3">
              {[
                { cause: "Moisture Ingress", icon: "💧", desc: "Water entering through damaged enclosures, rising damp, or condensation" },
                { cause: "Mechanical Damage", icon: "🔨", desc: "Nails, screws, crushing, abrasion, or rodent damage to cables" },
                { cause: "Heat Damage", icon: "🔥", desc: "Overloading, poor connections, or fire damage degrading insulation" },
                { cause: "Age Degradation", icon: "⏳", desc: "Natural breakdown of insulating materials over time" },
                { cause: "Chemical Contamination", icon: "🧪", desc: "Solvents, oils, cleaning fluids attacking insulation" },
                { cause: "Poor Installation", icon: "⚠️", desc: "Damaged during install, incorrect cable for environment" }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-white/5 rounded-lg p-3">
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <p className="text-white font-semibold text-sm">{item.cause}</p>
                    <p className="text-white/60 text-xs">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Content Section 02 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">02</span>
            <h2 className="text-ios-title-2 font-bold text-white">Half-Split Method</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <div className="flex items-center gap-3 p-4 bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg">
              <Search className="w-8 h-8 text-elec-yellow" />
              <div>
                <p className="text-elec-yellow font-semibold">Efficient Fault Location</p>
                <p className="text-white/60 text-sm">Each test halves the search area</p>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { step: 1, text: "Test full circuit - confirm low IR" },
                { step: 2, text: "Disconnect at approximate midpoint" },
                { step: 3, text: "Test each half separately" },
                { step: 4, text: "Identify which half has low IR" },
                { step: 5, text: "Disconnect that half at its midpoint" },
                { step: 6, text: "Repeat until fault located" }
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow/20 text-elec-yellow text-sm font-bold flex items-center justify-center flex-shrink-0">
                    {item.step}
                  </span>
                  <span className="text-white/80">{item.text}</span>
                </div>
              ))}
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-sm text-white/70">
                <strong className="text-elec-yellow">Example:</strong> A 100m cable takes only 7 half-splits to locate fault to within 1m (100→50→25→12.5→6.25→3.1→1.6→0.8m)
              </p>
            </div>
          </Card>
        </section>

        <InlineCheck
          question="The half-split method works by:"
          options={[
            "Testing at half voltage",
            "Disconnecting at midpoint and testing each half",
            "Using two meters simultaneously",
            "Testing only half the conductors"
          ]}
          correctIndex={1}
          explanation="Disconnect at the midpoint and test each half. The faulty section shows low IR. Repeat to narrow down location efficiently."
        />

        {/* Content Section 03 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">03</span>
            <h2 className="text-ios-title-2 font-bold text-white">Visual Inspection</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <p className="text-white/80">
              Before extensive testing, visual inspection often reveals the cause:
            </p>
            <div className="grid grid-cols-2 gap-2">
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
                <div key={i} className="flex items-center gap-2 bg-white/5 rounded-lg p-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  <span className="text-white/80 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Content Section 04 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">04</span>
            <h2 className="text-ios-title-2 font-bold text-white">Accessory Checks</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <p className="text-white/80">
              Accessories are common fault locations:
            </p>
            <div className="space-y-3">
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                <p className="text-amber-400 font-semibold mb-1">Socket Outlets</p>
                <p className="text-white/70 text-sm">Liquid spills, steam (kitchens/bathrooms), damaged terminals from plug insertion.</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <p className="text-blue-400 font-semibold mb-1">Junction Boxes</p>
                <p className="text-white/70 text-sm">Often in damp locations (lofts, under floors). Check seals and terminal condition.</p>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <p className="text-purple-400 font-semibold mb-1">External Fittings</p>
                <p className="text-white/70 text-sm">Weathering, failed seals, condensation ingress. Particularly vulnerable.</p>
              </div>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-sm text-white/70">
                <strong className="text-elec-yellow">Test Method:</strong> Disconnect accessory and test cable alone. If cable passes, the accessory is faulty.
              </p>
            </div>
          </Card>
        </section>

        <InlineCheck
          question="When checking accessories for IR faults:"
          options={[
            "Leave everything connected",
            "Disconnect and test accessories separately",
            "Only check visually",
            "Replace all accessories"
          ]}
          correctIndex={1}
          explanation="Disconnect accessories and test cable alone. If cable passes, the accessory is faulty. This avoids unnecessary cable replacement."
        />

        {/* Content Section 05 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">05</span>
            <h2 className="text-ios-title-2 font-bold text-white">Moisture Testing</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <p className="text-white/80">
              Moisture is the most common cause. Confirm by:
            </p>
            <ul className="space-y-2">
              {[
                "Apply heat with heat gun (carefully!) - reading improves if moisture present",
                "Leave circuit isolated overnight in heated building - re-test next day",
                "Compare readings on similar circuits in same area",
                "Check for condensation, water staining, damp smell"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-white/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <p className="text-amber-300 text-sm">
                <AlertTriangle className="w-4 h-4 inline mr-2" />
                Even if drying improves IR, identify and fix the moisture source or it will recur.
              </p>
            </div>
          </Card>
        </section>

        {/* Content Section 06 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">06</span>
            <h2 className="text-ios-title-2 font-bold text-white">Remedial Actions</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <div className="space-y-4">
              <div className="border-l-4 border-emerald-500 pl-4">
                <p className="text-emerald-400 font-semibold">Moisture</p>
                <p className="text-white/70 text-sm">Dry thoroughly, repair water ingress point, improve ventilation, consider IP-rated enclosures.</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="text-blue-400 font-semibold">Localised Damage</p>
                <p className="text-white/70 text-sm">Cut out damaged section and joint if sufficient slack. Otherwise replace affected cable length.</p>
              </div>
              <div className="border-l-4 border-amber-500 pl-4">
                <p className="text-amber-400 font-semibold">Poor Terminations</p>
                <p className="text-white/70 text-sm">Strip back to clean insulation, re-terminate properly, ensure correct torque.</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <p className="text-purple-400 font-semibold">Accessory Faults</p>
                <p className="text-white/70 text-sm">Replace faulty accessory. Check it hasn't damaged the cable at entry point.</p>
              </div>
              <div className="border-l-4 border-red-500 pl-4">
                <p className="text-red-400 font-semibold">General Degradation</p>
                <p className="text-white/70 text-sm">If multiple circuits affected, may need full rewire. Age-related failure is typically widespread.</p>
              </div>
            </div>
          </Card>
        </section>

        <InlineCheck
          question="If IR improves after drying, this indicates:"
          options={[
            "Permanent cable damage",
            "Moisture was the problem",
            "The meter was faulty",
            "Further testing is impossible"
          ]}
          correctIndex={1}
          explanation="Improved readings after drying confirm moisture was the cause. However, the moisture source must still be identified and addressed."
        />

        {/* Practical Tips */}
        <section className="space-y-4">
          <h2 className="text-ios-title-2 font-bold text-white flex items-center gap-2">
            <Wrench className="w-6 h-6 text-elec-yellow" />
            Practical Tips
          </h2>
          <Card variant="ios" className="p-5 space-y-4">
            <div className="space-y-4">
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                <p className="text-emerald-400 font-semibold mb-1">Start Simple</p>
                <p className="text-white/70 text-sm">Check accessible points first - accessories, junction boxes, consumer unit. Don't immediately assume cable damage.</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <p className="text-blue-400 font-semibold mb-1">Record Everything</p>
                <p className="text-white/70 text-sm">Document each test result during fault-finding. This shows your systematic approach and helps if you need to revisit.</p>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                <p className="text-amber-400 font-semibold mb-1">Consider History</p>
                <p className="text-white/70 text-sm">Ask about recent work, water leaks, or changes. Recent building work often causes cable damage.</p>
              </div>
            </div>
          </Card>
        </section>

        {/* FAQs */}
        <section className="space-y-4">
          <h2 className="text-ios-title-2 font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-elec-yellow" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <Card
                key={i}
                variant="ios"
                className="overflow-hidden"
                onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
              >
                <button className="w-full p-4 flex items-center justify-between text-left touch-manipulation">
                  <span className="text-white font-medium pr-4">{faq.q}</span>
                  {expandedFaq === i ? (
                    <ChevronUp className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-white/40 flex-shrink-0" />
                  )}
                </button>
                {expandedFaq === i && (
                  <div className="px-4 pb-4">
                    <p className="text-white/70 text-sm">{faq.a}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* Reference Card */}
        <UnitsPocketCard
          title="IR Troubleshooting Reference"
          items={[
            { term: "Most Common Cause", definition: "Moisture ingress" },
            { term: "Half-Split", definition: "Disconnect midpoint, test halves" },
            { term: "100m cable", definition: "~7 splits to locate to 1m" },
            { term: "Check First", definition: "Accessories, junction boxes" },
            { term: "Moisture Test", definition: "Apply heat, re-test" },
            { term: "Document", definition: "All fault-finding steps" }
          ]}
        />

        {/* Quiz */}
        <section className="space-y-4">
          <h2 className="text-ios-title-2 font-bold text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-elec-yellow" />
            Section Quiz
          </h2>
          <Quiz
            questions={quizQuestions}
            onComplete={() => {}}
          />
        </section>

        {/* Module Complete Card */}
        <Card variant="ios-elevated" className="p-6 text-center">
          <CheckCircle2 className="w-12 h-12 text-purple-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Module 4 Complete!</h3>
          <p className="text-white/70 mb-4">
            You've mastered Insulation Resistance Testing. Ready for Earth Fault Loop Impedance?
          </p>
          <Button
            variant="ios-primary"
            className="w-full h-12 touch-manipulation"
            onClick={() => navigate('/study-centre/upskilling/inspection-testing/module5')}
          >
            Continue to Module 5
          </Button>
        </Card>

        {/* Navigation */}
        <nav className="flex gap-3 pt-6 pb-safe">
          <Button
            variant="ios-secondary"
            className="flex-1 h-12 touch-manipulation"
            onClick={() => navigate('/study-centre/upskilling/inspection-testing/module4/section5')}
          >
            Previous
          </Button>
          <Button
            variant="ios-primary"
            className="flex-1 h-12 touch-manipulation"
            onClick={() => navigate('/study-centre/upskilling/inspection-testing/module5')}
          >
            Next Module
          </Button>
        </nav>
      </main>
    </div>
  );
};

export default InspectionTestingModule4Section6;
