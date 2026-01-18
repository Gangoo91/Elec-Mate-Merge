import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "amendment-3-date",
    question: "When did Amendment 3 to BS 7671 become mandatory?",
    options: [
      "1st January 2024",
      "31st July 2024",
      "1st September 2024",
      "31st December 2024"
    ],
    correctIndex: 1,
    explanation: "Amendment 3 to BS 7671 became mandatory on 31st July 2024. All new installations from this date must comply with Amendment 3 requirements."
  },
  {
    id: "bidirectional-scenario",
    question: "Which scenario REQUIRES bidirectional protection devices?",
    options: [
      "Standard domestic lighting circuits",
      "Solar PV system with battery storage",
      "Electric shower installation",
      "Garage socket outlets"
    ],
    correctIndex: 1,
    explanation: "Solar PV systems with battery storage require bidirectional protection because energy can flow in both directions - from the grid and back to the grid during generation."
  },
  {
    id: "anti-islanding-time",
    question: "What is the maximum time for anti-islanding protection to disconnect after grid loss?",
    options: [
      "1 second",
      "3 seconds",
      "5 seconds",
      "10 seconds"
    ],
    correctIndex: 2,
    explanation: "Anti-islanding protection must disconnect within 5 seconds of grid loss detection to prevent dangerous islanding conditions."
  }
];

const faqs = [
  {
    question: "Do existing installations need to comply immediately?",
    answer: "No immediate requirement to upgrade existing compliant installations. However, major alterations or addition of renewable energy triggers upgrade requirements."
  },
  {
    question: "What happens if standard MCBs are used instead of bidirectional devices?",
    answer: "Standard MCBs may not provide adequate reverse current protection, potentially leading to dangerous conditions, equipment damage, and non-compliance."
  },
  {
    question: "Which grid codes apply to renewable energy installations?",
    answer: "G98 applies to small-scale domestic systems (up to 16A per phase), while G99 applies to larger commercial systems. Both have protection requirements."
  },
  {
    question: "How does Amendment 3 affect EICR assessments?",
    answer: "EICR assessments should now reference Amendment 3 compliance for installations with renewable energy sources or bidirectional current flows."
  }
];

const quizQuestion = {
  question: "Which consumer unit component must remain effective under reverse current conditions?",
  options: [
    "Main switch only",
    "MCBs only",
    "RCD protection",
    "Meter tails"
  ],
  correctAnswer: 2,
  explanation: "RCD protection must remain effective under reverse current conditions. Standard RCDs may not operate correctly when current flows in reverse, requiring bidirectional RCD protection."
};

const BS7671Module2Section4 = () => {
  useSEO({
    title: "Amendment 3 Highlights & Current Requirements | BS 7671 Module 2.4",
    description: "Comprehensive guide to BS 7671 Amendment 3 requirements including bidirectional protection, consumer unit upgrades, and grid interaction safety for renewable energy installations."
  });

  const outcomes = [
    "Identify when bidirectional protection devices are required",
    "Understand enhanced consumer unit requirements for renewables",
    "Apply grid interaction safety and anti-islanding protection",
    "Specify testing procedures for bidirectional systems",
    "Assess compliance requirements from 31st July 2024",
    "Evaluate cost implications and safety benefits"
  ];

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/bs7671-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Page Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 2.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Amendment 3 Highlights & Current Requirements
          </h1>
          <p className="text-white/80">
            Bidirectional protection for renewable energy installations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>When:</strong> Mandatory from 31st July 2024</li>
              <li><strong>What:</strong> Bidirectional protection for prosumer installations</li>
              <li><strong>Why:</strong> Reverse current flows from renewables</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Requirements</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Protection:</strong> Bidirectional MCBs/RCDs</li>
              <li><strong>Safety:</strong> Anti-islanding within 5 seconds</li>
              <li><strong>Compliance:</strong> G98/G99 grid codes</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {outcomes.map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Amendment 3 Overview */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Amendment 3 Overview
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Amendment 3 to BS 7671, effective from 31st July 2024, introduces critical requirements for bidirectional protection in electrical installations, particularly focusing on renewable energy systems and grid interaction safety.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-transparent border border-elec-yellow/30">
                <p className="text-sm font-medium text-elec-yellow mb-3">Implementation Timeline</p>
                <p className="text-xs text-white">Amendment 3 became mandatory on 31st July 2024. All new installations must comply with these requirements, while existing installations may require upgrades during major alterations or replacements.</p>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-white mb-3">Key Focus Areas</p>
                <ul className="text-xs space-y-1">
                  <li>• <strong>Bidirectional Protection:</strong> Devices to isolate reverse current</li>
                  <li>• <strong>Consumer Unit Enhancements:</strong> Renewable energy integration</li>
                  <li>• <strong>Grid Interaction Safety:</strong> Back-feed and islanding protection</li>
                  <li>• <strong>Testing Procedures:</strong> Updated commissioning methods</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-transparent border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Critical Compliance Note</p>
              <p className="text-xs text-white">Non-compliance with Amendment 3 requirements can result in dangerous operating conditions, insurance voidance, and regulatory enforcement action. Understanding these requirements is essential for current electrical practice.</p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Bidirectional Protection Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Bidirectional Protection Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Amendment 3 mandates bidirectional protection where electrical installations can generate power that flows back into the supply system. This applies to prosumer installations with renewable energy sources.
            </p>

            <div className="space-y-4 my-6">
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow mb-2">Solar PV Systems with Battery Storage</p>
                <div className="grid sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <p className="font-medium text-white mb-1">Requirement:</p>
                    <p className="text-white/80">Bidirectional protection mandatory</p>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Reason:</p>
                    <p className="text-white/80">Energy flows in both directions depending on generation and consumption</p>
                  </div>
                </div>
                <p className="text-xs mt-2"><span className="text-elec-yellow">Solution:</span> MCCBs or MCBs with bidirectional capability</p>
              </div>

              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-green-400 mb-2">Electric Vehicle Charging with V2G</p>
                <div className="grid sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <p className="font-medium text-white mb-1">Requirement:</p>
                    <p className="text-white/80">Enhanced grid interaction protection</p>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Reason:</p>
                    <p className="text-white/80">Vehicle-to-grid technology creates reverse current flows</p>
                  </div>
                </div>
                <p className="text-xs mt-2"><span className="text-elec-yellow">Solution:</span> Specialist EV protective devices with anti-islanding</p>
              </div>

              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-orange-400 mb-2">Domestic Solar Installations</p>
                <div className="grid sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <p className="font-medium text-white mb-1">Requirement:</p>
                    <p className="text-white/80">Consumer unit upgrades may be required</p>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Reason:</p>
                    <p className="text-white/80">Standard MCBs may not provide adequate reverse current protection</p>
                  </div>
                </div>
                <p className="text-xs mt-2"><span className="text-elec-yellow">Solution:</span> Type 2 coordination with bidirectional devices</p>
              </div>

              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-white mb-2">Commercial Renewable Systems</p>
                <div className="grid sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <p className="font-medium text-white mb-1">Requirement:</p>
                    <p className="text-white/80">Comprehensive grid interaction study</p>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Reason:</p>
                    <p className="text-white/80">Large-scale generation affects local grid stability</p>
                  </div>
                </div>
                <p className="text-xs mt-2"><span className="text-elec-yellow">Solution:</span> G98/G99 compliant protection schemes</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Consumer Unit Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Enhanced Consumer Unit Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Consumer units in installations with renewable energy sources must meet enhanced requirements to ensure safety under bidirectional current conditions.
            </p>

            <div className="p-4 rounded-lg bg-transparent border border-white/10 my-6">
              <p className="text-sm font-medium text-white mb-3">Key Consumer Unit Requirements</p>
              <ul className="text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  RCD protection must remain effective under reverse current conditions
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Main switch ratings must accommodate bidirectional current flows
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Overcurrent devices must provide protection in both directions
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Neutral isolation must be maintained during grid disconnection
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Arc fault protection may be required for PV DC circuits
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4 my-6">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white text-sm mb-1">Standard MCB</p>
                <p className="text-xs text-white/70">Designed for unidirectional current flow only</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-green-500/30">
                <p className="font-medium text-green-400 text-sm mb-1">Bidirectional MCB</p>
                <p className="text-xs text-white/70">Protects against faults in both directions</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Testing and Commissioning */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Testing and Commissioning Procedures
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Amendment 3 introduces specific testing requirements to verify bidirectional protection effectiveness and grid interaction safety.
            </p>

            <div className="space-y-4 my-6">
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow mb-2">Bidirectional Continuity Test</p>
                <div className="grid sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <p className="font-medium text-white/80">Method:</p>
                    <p>Verify protective device operation in both current directions</p>
                  </div>
                  <div>
                    <p className="font-medium text-white/80">Acceptance:</p>
                    <p>Operation within manufacturer's specs for both polarities</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-orange-400 mb-2">Anti-Islanding Function Test</p>
                <div className="grid sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <p className="font-medium text-white/80">Method:</p>
                    <p>Simulate grid disconnection during reverse power flow</p>
                  </div>
                  <div>
                    <p className="font-medium text-white/80">Acceptance:</p>
                    <p>System isolation within 5 seconds of grid loss detection</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-green-400 mb-2">RCD Operation Under Reverse Current</p>
                <div className="grid sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <p className="font-medium text-white/80">Method:</p>
                    <p>Test RCD tripping with current flowing from installation to grid</p>
                  </div>
                  <div>
                    <p className="font-medium text-white/80">Acceptance:</p>
                    <p>Trip time and sensitivity within BS 7671 limits regardless of current direction</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-white mb-2">Grid Interaction Compliance Test</p>
                <div className="grid sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <p className="font-medium text-white/80">Method:</p>
                    <p>Verify compliance with G98/G99 grid codes</p>
                  </div>
                  <div>
                    <p className="font-medium text-white/80">Acceptance:</p>
                    <p>All protection settings within grid code limits</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Implementation Timeline */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Implementation and Compliance Timeline
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-transparent border border-green-500/30">
                <p className="text-sm font-medium text-green-400 mb-3">From 31st July 2024</p>
                <ul className="text-xs space-y-1">
                  <li>• All new installations must comply with Amendment 3</li>
                  <li>• New renewable energy systems require bidirectional protection</li>
                  <li>• Consumer unit replacements must meet enhanced requirements</li>
                  <li>• Testing procedures must include bidirectional verification</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-elec-yellow/30">
                <p className="text-sm font-medium text-elec-yellow mb-3">Existing Installations</p>
                <ul className="text-xs space-y-1">
                  <li>• No immediate requirement to upgrade existing compliant installations</li>
                  <li>• Major alterations must consider Amendment 3 requirements</li>
                  <li>• Addition of renewable energy triggers upgrade requirements</li>
                  <li>• EICR assessments should reference Amendment 3 compliance</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-transparent border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Non-Compliance Risks</p>
              <p className="text-xs text-white">Failure to implement Amendment 3 requirements can result in dangerous back-feed conditions, equipment damage, fire risks, and potential liability issues. Insurance coverage may be affected for non-compliant installations.</p>
            </div>
          </div>
        </section>

        {/* Section 06: Real World Scenario */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Real World Scenario
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="p-4 rounded-lg bg-transparent border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-3">Domestic Solar PV Installation (Post July 2024)</p>
              <div className="text-sm space-y-3">
                <p><strong>Project:</strong> A homeowner wants to install a 4kW solar PV system with 10kWh battery storage and grid export capability. The existing consumer unit has standard MCBs and a Type A RCD.</p>

                <div>
                  <p className="font-medium mb-1">Amendment 3 Requirements:</p>
                  <ul className="text-xs space-y-0.5 ml-4">
                    <li>• Consumer unit upgrade to include bidirectional protection</li>
                    <li>• Type A or Type B RCD with bidirectional capability</li>
                    <li>• Anti-islanding protection verified and tested</li>
                    <li>• G98 compliance for grid connection</li>
                    <li>• Documentation of bidirectional testing results</li>
                  </ul>
                </div>

                <div>
                  <p className="font-medium mb-1">Installation Approach:</p>
                  <ul className="text-xs space-y-0.5 ml-4">
                    <li>• New consumer unit with bidirectional main switch</li>
                    <li>• Bidirectional RCBOs for solar circuits</li>
                    <li>• Inverter with G98 compliant protection</li>
                    <li>• Battery system with integrated anti-islanding</li>
                    <li>• Full bidirectional testing at commissioning</li>
                  </ul>
                </div>

                <div>
                  <p className="font-medium mb-1">Testing Required:</p>
                  <ul className="text-xs space-y-0.5 ml-4">
                    <li>• RCD operation in both current directions</li>
                    <li>• Anti-islanding response time verification</li>
                    <li>• Grid interaction safety checks</li>
                    <li>• Documentation for DNO notification</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Questions */}
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
              <p className="font-medium text-elec-yellow/80 mb-1">Key Dates</p>
              <ul className="space-y-0.5">
                <li>Amendment 3 effective: 31st July 2024</li>
                <li>All new installations must comply</li>
                <li>Renewables trigger upgrade requirements</li>
                <li>Major alterations must consider A3</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-elec-yellow/80 mb-1">Protection Requirements</p>
              <ul className="space-y-0.5">
                <li>Bidirectional MCBs for prosumer installations</li>
                <li>RCDs effective in both directions</li>
                <li>Anti-islanding within 5 seconds</li>
                <li>G98/G99 grid code compliance</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <section className="mb-10 mt-12">
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
            <Link to="/study-centre/upskilling/bs7671-module-2-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bs7671-module-3">
              Next: Module 3
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BS7671Module2Section4;
