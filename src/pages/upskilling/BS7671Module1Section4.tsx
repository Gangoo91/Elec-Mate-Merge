import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "amendment-3-focus",
    question: "What is the main focus of Amendment 3?",
    options: [
      "Arc fault detection devices",
      "Bidirectional protective devices",
      "Surge protective devices",
      "Emergency lighting"
    ],
    correctIndex: 1,
    explanation: "Amendment 3 primarily focuses on bidirectional protective devices and their application in modern installations with renewable energy systems that can export power."
  },
  {
    id: "bidirectional-when-required",
    question: "Which type of installations require bidirectional protective devices?",
    options: [
      "All domestic installations",
      "Only commercial buildings",
      "Installations with solar PV and battery storage that can export power",
      "Emergency lighting circuits only"
    ],
    correctIndex: 2,
    explanation: "Bidirectional protective devices are required for installations with renewable energy sources like solar PV and battery storage that can export power to the grid."
  },
  {
    id: "bidirectional-vs-unidirectional",
    question: "How do bidirectional protective devices differ from unidirectional devices?",
    options: [
      "They only work in one direction",
      "They can detect and interrupt fault currents flowing in both directions",
      "They are cheaper to manufacture",
      "They have lower breaking capacity"
    ],
    correctIndex: 1,
    explanation: "Bidirectional protective devices can detect and safely interrupt fault currents flowing in both directions, essential for installations that both consume and generate electricity."
  }
];

const faqs = [
  {
    question: "When did Amendment 3 come into effect?",
    answer: "Amendment 3 to BS 7671:2018 came into effect on July 31st, 2024. It is now the current version of BS 7671, and installations must comply with these latest requirements."
  },
  {
    question: "What's the difference between Amendment 2 and Amendment 3?",
    answer: "Amendment 2 (March 2022) introduced Part 8 - Prosumer Installations and AFDD requirements. Amendment 3 (July 2024) builds upon this with specific requirements for bidirectional protective devices and enhanced consumer unit requirements for renewable energy systems."
  },
  {
    question: "Do all prosumer installations need bidirectional protection?",
    answer: "Bidirectional protection is required for prosumer installations where power can flow in both directions - typically solar PV with export, battery storage systems, and vehicle-to-grid (V2G) charging points."
  },
  {
    question: "Can I still use standard MCBs in prosumer installations?",
    answer: "Standard unidirectional MCBs may still be used for consumption-only circuits, but circuits with potential reverse current flow from generation or storage systems require bidirectional MCBs or RCBOs to comply with Amendment 3."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "What consumer unit requirement is introduced in Amendment 3 for prosumer installations?",
  options: [
    "All units must be metal-clad",
    "Enhanced protection for bidirectional power flow",
    "Mandatory AFDD in all circuits",
    "Type B RCDs only"
  ],
  correctAnswer: 1,
  explanation: "Amendment 3 introduces enhanced consumer unit requirements specifically for prosumer installations to handle bidirectional power flow safely, including proper protective device selection and coordination."
  }
];

const BS7671Module1Section4 = () => {
  useSEO({
    title: "Amendment 3 Highlights | BS7671 Module 1.4",
    description: "Understand Amendment 3 changes including bidirectional protection requirements, consumer unit provisions, and prosumer installation safety."
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bs7671-module-1">
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
            <span>Module 1.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Amendment 3 Highlights
          </h1>
          <p className="text-white/80">
            Bidirectional protection and consumer unit requirements (2024)
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Effective:</strong> 31st July 2024 (current version)</li>
              <li><strong>Focus:</strong> Bidirectional protection for prosumers</li>
              <li><strong>Applies to:</strong> Solar PV, batteries, V2G systems</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Any installation that can export power</li>
              <li><strong>Use:</strong> Specify bidirectional MCBs/RCBOs for two-way circuits</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand bidirectional vs unidirectional protective devices",
              "Apply Amendment 3 requirements to prosumer installations",
              "Recognise when bidirectional protection is required",
              "Specify appropriate devices for two-way power flow"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1: Key Changes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Key Changes in Amendment 3
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-sm text-white">
                <strong className="text-red-400">Current Standard:</strong> Amendment 3 is now the current
                version of BS 7671. Installations must comply with these requirements for legal
                compliance and professional best practice.
              </p>
            </div>

            <p>
              Amendment 3 addresses the critical gap in protective device technology for installations
              with bidirectional power flow, building upon Amendment 2's prosumer installation framework.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
                <p className="font-medium text-elec-yellow mb-2">Core Changes</p>
                <ul className="text-sm text-white/90 space-y-1">
                  <li>Bidirectional protective device definitions</li>
                  <li>Enhanced consumer unit requirements</li>
                  <li>Grid connection safety provisions</li>
                  <li>Two-way power flow protection</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <p className="font-medium text-green-400 mb-2">Timeline</p>
                <ul className="text-sm text-white/90 space-y-1">
                  <li>March 2022 - Amendment 2 published</li>
                  <li>July 31, 2024 - Amendment 3 effective</li>
                  <li>Now - Amendment 3 mandatory</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Bidirectional Protection */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Bidirectional Protective Devices
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
              <p className="text-sm font-medium text-elec-yellow mb-2">Key Innovation</p>
              <p className="text-sm text-white">
                Amendment 3 introduces bidirectional protective devices to safely handle two-way
                power flow in modern renewable energy installations where power can flow both
                to and from the grid.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="font-medium text-red-400 mb-2">Unidirectional (Traditional)</p>
                <ul className="text-sm text-white/90 space-y-1">
                  <li>Designed for one-way current flow</li>
                  <li>Suitable for conventional installations</li>
                  <li>Cannot detect reverse fault currents</li>
                  <li>May fail to protect prosumer systems</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <p className="font-medium text-green-400 mb-2">Bidirectional (Amendment 3)</p>
                <ul className="text-sm text-white/90 space-y-1">
                  <li>Detect faults in both directions</li>
                  <li>Essential for renewable energy systems</li>
                  <li>Protect against reverse fault currents</li>
                  <li>Ensure safe grid interaction</li>
                </ul>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">When Bidirectional Protection is Required</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-white/70 mb-1">Installation Types:</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>Solar PV systems with grid export</li>
                    <li>Battery energy storage systems</li>
                    <li>Wind generation installations</li>
                    <li>Vehicle-to-grid (V2G) charging points</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-white/70 mb-1">Safety Considerations:</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>Protection during export conditions</li>
                    <li>Fault detection in both directions</li>
                    <li>Safe isolation during maintenance</li>
                    <li>Emergency shutdown capability</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Consumer Unit Requirements */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Consumer Unit Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Amendment 3 introduces specific consumer unit requirements for installations with
              renewable energy sources to ensure safe bidirectional power management and grid interaction.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Protective Device Selection</p>
                <ul className="text-sm text-white space-y-2 ml-4">
                  <li><strong>Bidirectional MCBs/RCBOs:</strong> For circuits with reverse current flow</li>
                  <li><strong>Enhanced Breaking Capacity:</strong> Handle faults from both sources</li>
                  <li><strong>Coordination:</strong> Proper discrimination between generation and load</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Considerations</p>
                <ul className="text-sm text-white space-y-2 ml-4">
                  <li><strong>Labelling:</strong> Clear identification of bidirectional circuits</li>
                  <li><strong>Isolation:</strong> Safe isolation for maintenance</li>
                  <li><strong>Testing:</strong> Verification of bidirectional operation</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
                <p className="font-medium text-white text-sm mb-1">Solar PV Circuits</p>
                <ul className="text-xs text-white/80 space-y-0.5">
                  <li>Bidirectional protection required</li>
                  <li>Export limitation compliance</li>
                  <li>G99 connection requirements</li>
                </ul>
              </div>
              <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                <p className="font-medium text-white text-sm mb-1">Battery Storage</p>
                <ul className="text-xs text-white/80 space-y-0.5">
                  <li>Charge/discharge protection</li>
                  <li>Emergency shutdown systems</li>
                  <li>Thermal management</li>
                </ul>
              </div>
              <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <p className="font-medium text-white text-sm mb-1">EV V2G Systems</p>
                <ul className="text-xs text-white/80 space-y-0.5">
                  <li>Vehicle-to-grid protection</li>
                  <li>Dynamic load management</li>
                  <li>Grid support functions</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Real World Scenario */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Real World Scenario
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-sm font-medium text-red-400 mb-3">Solar PV Installation with Inadequate Protection</p>
              <div className="space-y-2 text-sm text-white/90">
                <p>
                  <strong>Situation:</strong> A contractor installs a 5kW solar PV system with battery
                  storage in September 2024, using standard unidirectional MCBs in the consumer unit.
                </p>
                <p>
                  <strong>Problem:</strong> During a fault condition where the battery discharges into
                  a short circuit on the AC side, the unidirectional MCBs fail to detect the reverse
                  fault current, creating a dangerous situation.
                </p>
                <p>
                  <strong>Consequences:</strong>
                </p>
                <ul className="text-sm text-white/80 space-y-1 ml-4">
                  <li>Inadequate protection against reverse fault currents</li>
                  <li>Non-compliance with Amendment 3 requirements</li>
                  <li>Potential fire risk and safety hazard</li>
                  <li>Installation fails electrical safety inspection</li>
                  <li>DNO may refuse grid connection approval</li>
                </ul>
                <p>
                  <strong>Solution:</strong> Replace with bidirectional MCBs/RCBOs as required by
                  Amendment 3 for proper protection of prosumer installations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Why Amendment 3 Matters */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Why Amendment 3 Matters
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Amendment 3 addresses critical safety gaps in renewable energy installations.
              As bidirectional power flow becomes standard, proper protection is essential
              for safety and grid stability.
            </p>

            <div className="grid sm:grid-cols-3 gap-3 my-6">
              <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                <p className="font-medium text-white text-sm mb-1">Renewable Growth</p>
                <ul className="text-xs text-white/80 space-y-0.5">
                  <li>Solar PV adoption</li>
                  <li>Battery storage proliferation</li>
                  <li>V2G development</li>
                </ul>
              </div>
              <div className="p-3 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
                <p className="font-medium text-white text-sm mb-1">Safety Requirements</p>
                <ul className="text-xs text-white/80 space-y-0.5">
                  <li>Bidirectional fault protection</li>
                  <li>Grid interaction safety</li>
                  <li>Reverse current detection</li>
                </ul>
              </div>
              <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <p className="font-medium text-white text-sm mb-1">Grid Evolution</p>
                <ul className="text-xs text-white/80 space-y-0.5">
                  <li>Smart grid development</li>
                  <li>Distributed generation</li>
                  <li>Energy storage integration</li>
                </ul>
              </div>
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
        <div className="mt-6 p-5 rounded-lg bg-transparent border border-white/10">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">Amendment 3 Requirements</p>
              <ul className="space-y-0.5 text-white/80">
                <li>Bidirectional MCBs/RCBOs for generation</li>
                <li>Enhanced breaking capacity</li>
                <li>Proper labelling and isolation</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">When Required</p>
              <ul className="space-y-0.5 text-white/80">
                <li>Solar PV with export</li>
                <li>Battery storage systems</li>
                <li>V2G charging points</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <section className="mb-10 mt-10">
          <SingleQuestionQuiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bs7671-module-1-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bs7671-module-2">
              Next: Module 2
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BS7671Module1Section4;