import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "evcharging-m4s4-check1",
    question: "What is the maximum earth resistance for a TT system with 30mA RCD protection?",
    options: ["50Ω", "100Ω", "200Ω", "1667Ω"],
    correctIndex: 3,
    explanation: "Mathematically, 50V ÷ 0.03A = 1667Ω. However, practical targets of <100Ω are recommended to ensure reliable RCD operation and allow for electrode deterioration over time."
  },
  {
    id: "evcharging-m4s4-check2",
    question: "What is the minimum spacing between parallel earth rods for optimal effectiveness?",
    options: ["Equal to rod length", "1.5 times rod length", "2.5 times rod length (minimum 6m)", "5 times rod length"],
    correctIndex: 2,
    explanation: "Earth rods should be spaced at least 2.5 times their length apart, preferably 6m minimum. This avoids mutual interference between the resistance areas and achieves additive resistance reduction."
  },
  {
    id: "evcharging-m4s4-check3",
    question: "When using the fall-of-potential test method, where should the potential probe be positioned?",
    options: ["At 0.25D from the electrode", "At 0.62D from the electrode", "At 0.90D from the electrode", "Directly at the electrode"],
    correctIndex: 1,
    explanation: "The potential probe should be positioned at 0.62D (62% of the distance to the current probe). Additional readings at 0.52D and 0.72D verify test validity - readings should be within ±5% of each other."
  }
];

const faqs = [
  {
    question: "How deep should earth rods be installed?",
    answer: "Earth rods should penetrate to a minimum depth of 2.4m in most soil types. They should extend below the frost line and reach moist soil layers for optimal performance. In rocky conditions, consider augered installation or horizontal electrodes."
  },
  {
    question: "Can I use existing foundation steel as an earth electrode?",
    answer: "Foundation electrodes can be used if the steel is in direct contact with earth (not isolated by membranes) and connection points are accessible for testing. Many modern buildings use isolated foundations, making this unsuitable."
  },
  {
    question: "What causes earth electrode resistance to change over time?",
    answer: "Resistance varies with soil moisture, temperature, and seasonal changes. Corrosion, loose connections, and changes in soil chemistry can increase resistance. Regular testing and maintenance are essential for ongoing safety."
  },
  {
    question: "How do I improve earth resistance in high resistivity soil?",
    answer: "Use multiple rods in parallel, consider longer rods, add bentonite clay around electrodes, or install horizontal earth tape. Soil treatment with conductive compounds can also reduce resistance in problematic soils."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "You're installing earth electrodes for an EV charging installation in sandy soil. Initial testing of a single 2.4m rod shows 180Ω resistance. What is the most appropriate solution?",
  options: [
    "Accept the result as it meets the 200Ω requirement",
    "Install additional parallel rods spaced 6m apart",
    "Replace the rod with a longer single rod",
    "Add salt to the soil around the electrode"
  ],
  correctAnswer: 1,
  explanation: "Installing additional parallel rods is the most appropriate solution. While 180Ω technically meets requirements, it has no margin for seasonal variation or degradation. Multiple rods properly spaced will reduce resistance significantly and provide long-term reliability. Salt is not recommended due to environmental concerns and limited duration."
  }
];

const EVChargingModule4Section4 = () => {
  useSEO({
    title: "Earth Rod Installation and Testing | EV Charging Module 4.4",
    description: "Learn proper earth electrode installation and verification for EV charging systems. Covers rod selection, installation techniques, testing methods, and BS 7671 compliance."
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/ev-charging-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 4.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Earth Rod Installation and Testing
          </h1>
          <p className="text-white/80">
            Proper earth electrode installation and verification for EV charging safety
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Target:</strong> &lt;100Ω practical, &lt;200Ω maximum</li>
              <li><strong>Depth:</strong> Minimum 2.4m below ground</li>
              <li><strong>Spacing:</strong> 2.5× rod length (min 6m) apart</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Copper-bonded steel rod, inspection pit</li>
              <li><strong>Use:</strong> Fall-of-potential test at 0.62D position</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Select appropriate electrode types for soil conditions",
              "Install earth rods using correct techniques",
              "Perform earth resistance testing using fall-of-potential",
              "Calculate parallel electrode arrangements",
              "Verify earthing system effectiveness",
              "Maintain and monitor electrode performance"
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
            Earth Electrode Types and Selection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Earth electrode selection depends on soil conditions, required resistance, and
              installation constraints. Proper selection ensures effective fault protection
              for EV charging systems.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Copper-Bonded Steel Rods</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Diameter:</strong> 14.2mm, 16mm, or 19mm</li>
                  <li><strong>Length:</strong> 1.2m, 1.5m, 2.4m, 3m</li>
                  <li><strong>Coating:</strong> Minimum 250 microns copper</li>
                  <li><strong>Use:</strong> Most soil conditions</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Alternative Types</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Stainless steel:</strong> Marine/aggressive soils</li>
                  <li><strong>Copper strip:</strong> Horizontal in trenches</li>
                  <li><strong>Earth mats:</strong> Very low resistance</li>
                  <li><strong>Deep bore:</strong> Problem soil conditions</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Selection Criteria:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Soil resistivity (Wenner four-probe testing)</li>
                <li>Corrosion potential and soil chemistry</li>
                <li>Required earth resistance target</li>
                <li>Installation space and access constraints</li>
                <li>Long-term maintenance requirements</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Installation Techniques
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Proper installation technique ensures good soil contact and long-term
              reliability. Always locate underground services before installation.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Driven Installation</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Equipment:</strong> Pneumatic hammer, driving head</li>
                  <li><strong>Position:</strong> Start vertical, drive to depth</li>
                  <li><strong>Leave:</strong> 150mm above ground</li>
                  <li><strong>Finish:</strong> Earth clamp and backfill</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Multiple Rod Configuration</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Spacing:</strong> 2.5× rod length (min 6m)</li>
                  <li><strong>Connection:</strong> Copper tape or cable</li>
                  <li><strong>Testing:</strong> Individual and combined</li>
                  <li><strong>Benefit:</strong> Additive resistance reduction</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Safety Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always locate underground services using CAT scanner</li>
                <li>Maintain minimum 600mm spacing from other services</li>
                <li>Install warning tape 300mm above buried electrodes</li>
                <li>Use appropriate PPE including safety glasses</li>
                <li>Maintain safe distances from overhead power lines</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Earth Resistance Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The fall-of-potential method is the standard test for earth electrode
              resistance. Accurate testing requires proper probe positioning and
              multiple readings to verify validity.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Fall-of-Potential Test Procedure:</p>
              <ol className="text-sm text-white space-y-1 ml-4 list-decimal list-inside">
                <li>Disconnect electrode from installation via removable link</li>
                <li>Position current probe (C2) at distance D (10× electrode length)</li>
                <li>Position potential probe (P2) at 0.62D from electrode</li>
                <li>Connect earth resistance tester</li>
                <li>Take readings at 0.52D, 0.62D, and 0.72D positions</li>
                <li>Verify readings are within ±5% for test validity</li>
                <li>Record highest reading as earth resistance value</li>
              </ol>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Results Interpretation</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>TT target:</strong> &lt;200Ω (practical &lt;100Ω)</li>
                  <li><strong>Accuracy:</strong> ±2% of reading typical</li>
                  <li><strong>Seasonal:</strong> 3-5× higher when dry</li>
                  <li><strong>Validity:</strong> Readings within ±5%</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Testing Best Practices</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Timing:</strong> Test during dry conditions</li>
                  <li><strong>Leads:</strong> Use proper connections</li>
                  <li><strong>Interference:</strong> Check for stray currents</li>
                  <li><strong>Documentation:</strong> Record all conditions</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Earth Enhancement Techniques</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Bentonite clay:</strong> Surround electrode, reduces resistance 30-70%</li>
                <li><strong>Longer rods:</strong> Extend to reach lower resistivity layers</li>
                <li><strong>Multiple electrodes:</strong> Parallel configuration with proper spacing</li>
                <li><strong>Horizontal tape:</strong> Large surface area for shallow soil</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Insufficient depth:</strong> — Must reach stable moisture level</li>
                <li><strong>Rods too close:</strong> — Interference reduces effectiveness</li>
                <li><strong>No margin:</strong> — Allow for seasonal variation and aging</li>
                <li><strong>Testing when wet:</strong> — Gives falsely low readings</li>
              </ul>
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
        <div className="mt-6 p-5 rounded-lg bg-transparent">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">Installation Standards</p>
              <ul className="space-y-0.5">
                <li>Minimum depth: 2.4m</li>
                <li>Parallel spacing: 6m minimum</li>
                <li>Service clearance: 600mm</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Testing Requirements</p>
              <ul className="space-y-0.5">
                <li>Method: Fall-of-potential (0.62D)</li>
                <li>Target: &lt;100Ω practical</li>
                <li>Frequency: Annual verification</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <section className="mb-10 mt-12">
          <SingleQuestionQuiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/ev-charging-module-4-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/ev-charging-module-4-section-5">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EVChargingModule4Section4;