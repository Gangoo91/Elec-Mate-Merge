import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "spd-purpose",
    question: "What is the main purpose of an SPD?",
    options: ["Provide overcurrent protection", "Divert surge energy to earth and clamp voltage", "Detect earth faults", "Provide isolation"],
    correctIndex: 1,
    explanation: "SPDs protect against transient overvoltages by diverting surge energy to earth and clamping voltage to safe levels, protecting connected equipment."
  },
  {
    id: "type1-spd",
    question: "When is a Type 1 SPD used?",
    options: ["General protection in consumer units", "Point-of-use protection", "Direct lightning strikes at main distribution boards", "Only industrial installations"],
    correctIndex: 2,
    explanation: "Type 1 SPDs are designed for direct lightning strikes or external surges and are typically installed at the main distribution board."
  },
  {
    id: "spd-location",
    question: "Where should SPDs be placed for effective protection?",
    options: ["At the end of long cable runs", "As close as possible to the origin of the installation", "Only in outdoor locations", "In every room"],
    correctIndex: 1,
    explanation: "SPDs should be placed as close as possible to the origin of the installation to provide effective protection, typically at the main distribution board."
  }
];

const faqs = [
  {
    question: "Are SPDs mandatory in all installations?",
    answer: "SPDs are mandatory where consequences could cause serious injury/loss of life, affect public services or cultural heritage, damage commercial/industrial activity, or affect large groups. Risk assessment determines the need."
  },
  {
    question: "What's the difference between Type 2 and Type 3 SPDs?",
    answer: "Type 2 SPDs provide general protection from switching surges in distribution boards. Type 3 SPDs offer point-of-use protection for sensitive electronics and are used alongside upstream Type 2 SPDs."
  },
  {
    question: "How long do SPD connection leads need to be?",
    answer: "Connection leads should be as short as possible - maximum 0.5m total lead length. Shorter leads reduce inductance and improve protection effectiveness."
  },
  {
    question: "Do SPDs need replacing after a surge event?",
    answer: "SPDs have status indicators showing their condition. MOV-based SPDs degrade with each surge event and may need replacement when the indicator shows end-of-life. Regular inspection is essential."
  }
];

const quizQuestion = {
  question: "What four consequences trigger mandatory SPD installation under BS 7671?",
  options: [
    "Cost, availability, installation time, maintenance",
    "Serious injury/loss of life, public services/cultural heritage, commercial/industrial damage, affecting large groups",
    "Voltage levels, current ratings, environmental conditions, building type",
    "Lightning risk, switching surges, utility faults, equipment sensitivity"
  ],
  correctAnswer: 1,
  explanation: "SPDs are mandatory where consequences could cause serious injury/loss of life, affect public services or cultural heritage, damage commercial/industrial activity, or affect large groups of people."
};

const BS7671Module4Section5 = () => {
  useSEO({
    title: "Surge Protection Devices (SPDs) | BS7671 Module 4.5",
    description: "Learn about SPD types, when they're required under BS 7671, and how to protect electrical installations against transient overvoltages."
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bs7671-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 4.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Surge Protection Devices (SPDs)
          </h1>
          <p className="text-white/80">
            When and Why They're Required
          </p>
        </header>

        {/* Quick Summary */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Function:</strong> Divert surge energy, clamp voltage</li>
              <li><strong>Types:</strong> 1 (lightning), 2 (switching), 3 (point-of-use)</li>
              <li><strong>Location:</strong> Close to origin of installation</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Consumer units, distribution boards, near sensitive equipment</li>
              <li><strong>Use:</strong> Risk assessment determines need</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand what causes surges and how they affect installations",
              "Identify when SPDs are required under BS 7671",
              "Learn about the different types and locations for SPDs",
              "Understand coordination with other protective devices"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1: What Is a Surge */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What Is a Surge?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electrical surges are transient overvoltages caused by lightning strikes, switching events, or utility faults. Though they typically last only microseconds, they can cause insulation breakdown, equipment damage, or data loss.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Lightning</p>
                <p className="text-white/90 text-xs">Most severe, less common</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Switching</p>
                <p className="text-white/90 text-xs">Most common cause</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Utility Faults</p>
                <p className="text-white/90 text-xs">Transformer failures</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Potential Damage:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Immediate:</strong> Equipment destruction, data corruption, system shutdowns, fire risk</li>
                <li><strong>Long-term:</strong> Reduced equipment lifespan, degraded performance, increased maintenance</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: How SPDs Work */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            How SPDs Work
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              SPDs provide a low-impedance path to earth, diverting dangerous surge currents away from sensitive equipment and limiting (clamping) the voltage to safe levels.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Operating Sequence:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>1. Normal:</strong> SPD presents high impedance, allows normal current flow</li>
                <li><strong>2. Detection:</strong> When voltage exceeds threshold, SPD activates</li>
                <li><strong>3. Diversion:</strong> SPD conducts surge current to earth</li>
                <li><strong>4. Clamping:</strong> Voltage limited to safe level</li>
                <li><strong>5. Reset:</strong> After surge passes, returns to high impedance</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 3: Types of SPDs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Types of SPDs
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-red-400/80 mb-2">Type 1</p>
                <p className="text-xs mb-2">Direct lightning strikes</p>
                <ul className="text-xs space-y-1">
                  <li>Main distribution boards</li>
                  <li>Service entrance</li>
                  <li>25-100kA rating</li>
                  <li>Gas discharge tube based</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Type 2</p>
                <p className="text-xs mb-2">Switching surges (most common)</p>
                <ul className="text-xs space-y-1">
                  <li>Consumer units, sub-boards</li>
                  <li>Standard requirement</li>
                  <li>5-40kA rating</li>
                  <li>MOV based</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-green-400/80 mb-2">Type 3</p>
                <p className="text-xs mb-2">Point-of-use protection</p>
                <ul className="text-xs space-y-1">
                  <li>At sensitive equipment</li>
                  <li>IT/medical equipment</li>
                  <li>1-10kA rating</li>
                  <li>Fast response</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Coordination Strategy:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Type 1 at service entrance for lightning protection</li>
                <li>Type 2 at distribution boards for switching surges</li>
                <li>Type 3 for sensitive equipment point-of-use</li>
                <li>Maintain minimum separation distances between SPD types</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: When SPDs are Required */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            When are SPDs Required?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              SPDs are mandatory where the consequences of failure could be serious. Risk assessment determines the need based on lightning activity, building exposure, and consequences.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-red-400/80 mb-2">Mandatory Applications</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Serious injury or loss of life risk</li>
                  <li>Interruption to public services</li>
                  <li>Hospitals, emergency services</li>
                  <li>Cultural heritage locations</li>
                  <li>Commercial/industrial interruption</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Risk Assessment Factors</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Lightning activity level (Ng value)</li>
                  <li>Building height and exposure</li>
                  <li>Presence of external lightning protection</li>
                  <li>Soil resistivity and earthing</li>
                  <li>Equipment sensitivity</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 5: Installation Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Installation Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Location Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li>As close as possible to origin</li>
                  <li>Short connection leads (max 0.5m total)</li>
                  <li>Accessible for inspection</li>
                  <li>Clear labelling and identification</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Coordination Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Upstream overcurrent protection</li>
                  <li>Selectivity with other devices</li>
                  <li>Earth fault loop considerations</li>
                  <li>Regular testing schedule</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Critical Installation Points:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Low impedance earth connection is essential</li>
                <li>Keep connection leads as short as possible</li>
                <li>Avoid sharp bends and loops in conductors</li>
                <li>Use appropriate conductor sizes</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 6: Amendment 3 Updates */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Amendment 3: EV and Renewable Energy SPDs
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Amendment 3 introduces specific SPD considerations for EV charging infrastructure and renewable energy installations, addressing unique surge risks from bidirectional power flow and DC circuits.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">EV Charging Protection</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Type 2 SPDs mandatory for EV circuits</li>
                  <li>Coordination with DC fault protection</li>
                  <li>Protection against switching surges</li>
                  <li>Enhanced earthing requirements</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Renewable Energy Systems</p>
                <ul className="text-sm text-white space-y-1">
                  <li>SPDs for both AC and DC sides</li>
                  <li>Battery storage protection</li>
                  <li>Bidirectional power flow coordination</li>
                  <li>Grid-tie protection considerations</li>
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

        {/* Quick Reference */}
        <div className="mt-6 p-5 rounded-lg bg-transparent">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">SPD Types</p>
              <ul className="space-y-0.5">
                <li>Type 1: Lightning (25-100kA)</li>
                <li>Type 2: Switching (5-40kA)</li>
                <li>Type 3: Point-of-use (1-10kA)</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Key Requirements</p>
              <ul className="space-y-0.5">
                <li>Location: Close to origin</li>
                <li>Leads: Max 0.5m total</li>
                <li>Earth: Low impedance essential</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz */}
        <section className="mb-10">
          <SingleQuestionQuiz
            question={quizQuestion.question}
            options={quizQuestion.options}
            correctAnswer={quizQuestion.correctAnswer}
            explanation={quizQuestion.explanation}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bs7671-module-4-section-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bs7671-module-4-section-6">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BS7671Module4Section5;
