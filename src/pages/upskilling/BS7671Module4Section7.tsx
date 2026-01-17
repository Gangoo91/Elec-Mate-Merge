import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "amendment3-date",
    question: "When did Amendment 3 to BS 7671 become mandatory for new installations?",
    options: ["1st January 2024", "31st July 2024", "1st September 2024", "31st December 2024"],
    correctIndex: 1,
    explanation: "Amendment 3 to BS 7671 became mandatory on 31st July 2024. All new installations from this date must comply with the Amendment 3 requirements."
  },
  {
    id: "bidirectional-scenario",
    question: "Which scenario REQUIRES bidirectional protection devices?",
    options: ["Standard domestic lighting circuits", "Solar PV system with battery storage", "Electric shower installation", "Garage socket outlets"],
    correctIndex: 1,
    explanation: "Solar PV systems with battery storage require bidirectional protection because energy can flow in both directions - from the grid to charge batteries and from batteries back to the grid during discharge."
  },
  {
    id: "anti-islanding-time",
    question: "What is the maximum time allowed for anti-islanding protection to disconnect after grid loss?",
    options: ["1 second", "3 seconds", "5 seconds", "10 seconds"],
    correctIndex: 2,
    explanation: "Anti-islanding protection must disconnect the system within 5 seconds of detecting grid loss to prevent dangerous islanding conditions where local generation continues to energise the grid."
  }
];

const faqs = [
  {
    question: "What is bidirectional power flow?",
    answer: "Bidirectional power flow occurs when electrical installations can both consume power from the grid AND export power back to it. This happens with solar PV, battery storage, and V2G (vehicle-to-grid) EV charging systems."
  },
  {
    question: "Why do standard RCDs need upgrading for renewable energy?",
    answer: "Standard RCDs may not operate correctly when current flows in the reverse direction (from installation to grid). Bidirectional RCDs are designed to provide protection regardless of current flow direction."
  },
  {
    question: "What is anti-islanding protection?",
    answer: "Anti-islanding protection prevents a renewable energy system from continuing to energise the local grid during power outages. This protects utility workers and equipment from unexpected live circuits."
  },
  {
    question: "Do existing installations need upgrading for Amendment 3?",
    answer: "Existing compliant installations don't need immediate upgrades. However, when adding renewable energy systems or making major alterations, Amendment 3 requirements apply to the new/modified work."
  }
];

const quizQuestion = {
  question: "What must be tested when commissioning bidirectional protection devices?",
  options: [
    "Testing in the forward direction only",
    "Visual inspection only",
    "Testing operation in both current directions",
    "Insulation resistance testing only"
  ],
  correctAnswer: 2,
  explanation: "Bidirectional protection devices must be tested for operation in both current directions to ensure they provide adequate protection whether current flows from the grid to the installation or from the installation back to the grid."
};

const BS7671Module4Section7 = () => {
  useSEO({
    title: "Bidirectional Protection Systems (Amendment 3) | BS7671 Module 4.7",
    description: "Understand Amendment 3 requirements for bidirectional protection in renewable energy, EV charging, and battery storage installations."
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
            <span>Module 4.7</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Bidirectional Protection Systems
          </h1>
          <p className="text-white/80">
            Amendment 3 Requirements for Renewable Energy
          </p>
        </header>

        {/* Quick Summary */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Effective:</strong> 31st July 2024 (mandatory)</li>
              <li><strong>Applies to:</strong> Solar PV, battery storage, V2G EV charging</li>
              <li><strong>Key:</strong> Protection for both current directions</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Any installation that exports power</li>
              <li><strong>Use:</strong> Bidirectional RCDs, G98/G99 compliance</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify when bidirectional protection devices are required",
              "Understand enhanced consumer unit requirements for renewable energy",
              "Apply grid interaction safety measures and anti-islanding protection",
              "Specify appropriate testing procedures for bidirectional systems"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1: Amendment 3 Overview */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Amendment 3 Overview
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Amendment 3 to BS 7671, effective from 31st July 2024, introduces critical requirements for bidirectional protection in electrical installations. This fundamentally changes how we approach installations that can both consume and generate electricity.
            </p>
            <p>
              The key driver is the rapid growth in renewable energy installations - solar PV, battery storage, EV charging with V2G capability, and heat pumps. These technologies create bidirectional power flows that traditional protection devices were not designed to handle safely.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Focus Areas</p>
                <ul className="text-xs space-y-1">
                  <li><strong>Bidirectional Protection:</strong> Devices isolating faults in either direction</li>
                  <li><strong>Consumer Unit Upgrades:</strong> Enhanced components for renewables</li>
                  <li><strong>Grid Interaction Safety:</strong> Anti-islanding and grid code compliance</li>
                  <li><strong>Updated Testing:</strong> New commissioning procedures</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-sm font-medium text-red-400/80 mb-2">Compliance Note</p>
                <p className="text-xs">
                  Non-compliance can result in dangerous back-feed conditions, equipment damage, fire risks, and potential liability issues. Insurance coverage may be affected for non-compliant installations.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Bidirectional Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Bidirectional Protection Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Bidirectional protection is mandatory where installations can generate power that flows back into the supply system. Traditional protection devices may not operate correctly under reverse current conditions.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Traditional Flow (Grid → Installation)</p>
                <ul className="text-xs space-y-1">
                  <li>Power consumed from supplier</li>
                  <li>Current flows one direction</li>
                  <li>Standard protection designed for this</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Bidirectional Flow (Installation ↔ Grid)</p>
                <ul className="text-xs space-y-1">
                  <li>Power flows both ways</li>
                  <li>Current direction changes dynamically</li>
                  <li>Special protection required</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Systems Requiring Bidirectional Protection:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Solar PV with Battery Storage:</strong> Energy flows based on generation/consumption</li>
                <li><strong>V2G EV Charging:</strong> Vehicle-to-grid creates reverse current flows</li>
                <li><strong>Domestic Solar:</strong> Consumer unit upgrades may be required</li>
                <li><strong>Commercial Renewables:</strong> G98/G99 compliant protection schemes</li>
                <li><strong>Heat Pump with Solar:</strong> Load balancing and export control</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Consumer Unit Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Enhanced Consumer Unit Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Consumer units in installations with renewable energy sources must meet enhanced requirements to ensure safety under bidirectional current conditions.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>RCD protection must remain effective under reverse current</li>
                <li>Main switch ratings must accommodate bidirectional flows</li>
                <li>Overcurrent devices must protect in both directions</li>
                <li>Neutral isolation maintained during grid disconnection</li>
                <li>Type A or Type B RCDs may be required for certain inverters</li>
                <li>Smart meters capable of measuring import and export</li>
                <li>Arc fault protection may be required for PV DC circuits</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: Grid Interaction Safety */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Grid Interaction and Anti-Islanding
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Anti-islanding protection prevents renewable energy systems from continuing to energise the local grid during power outages, protecting utility workers and equipment.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">V2G Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Bidirectional inverters with grid-tie capability</li>
                  <li>Anti-islanding protection for grid disconnection</li>
                  <li>Dynamic export limitation control</li>
                  <li>Smart charging coordination</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Smart Grid Communication</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Real-time grid condition monitoring</li>
                  <li>Demand response capability</li>
                  <li>Grid frequency and voltage regulation</li>
                  <li>Remote control and monitoring</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Critical Requirement</p>
              <p className="text-xs text-white">
                Anti-islanding must disconnect within 5 seconds of grid loss detection. G98/G99 grid code compliance is required for renewable installations.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 5: Testing Procedures */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Testing and Commissioning
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Amendment 3 introduces specific testing requirements to verify bidirectional protection effectiveness and grid interaction safety.
            </p>

            <div className="space-y-4 my-6">
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm font-medium text-white mb-1">Bidirectional Continuity Test</p>
                <p className="text-xs text-white/80">Verify protective device operation in both current directions - must operate within manufacturer's specifications for both polarities.</p>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm font-medium text-white mb-1">Anti-Islanding Function Test</p>
                <p className="text-xs text-white/80">Simulate grid disconnection during reverse power flow - system must isolate within 5 seconds of grid loss detection.</p>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm font-medium text-white mb-1">RCD Operation Under Reverse Current</p>
                <p className="text-xs text-white/80">Test RCD tripping with current flowing from installation to grid - trip time and sensitivity must be within BS 7671 limits.</p>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm font-medium text-white mb-1">Export Limitation Test</p>
                <p className="text-xs text-white/80">Verify maximum export power doesn't exceed connection agreement under all operating conditions.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Real World Scenarios */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Real World Applications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10 mb-4">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Scenario 1: Domestic Solar with Battery Storage</p>
              <p className="text-xs mb-2"><strong>Challenge:</strong> 4kW solar PV system with 10kWh battery storage on existing installation.</p>
              <p className="text-xs mb-2"><strong>Requirements:</strong> Consumer unit must handle bidirectional current, RCD protection effective in both directions, anti-islanding mandatory.</p>
              <p className="text-xs"><strong>Solution:</strong> Upgrade to Type A RCD, install G98-compliant inverter with anti-islanding, verify all MCBs suitable for reverse current.</p>
            </div>

            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Scenario 2: Commercial EV Charging Hub with V2G</p>
              <p className="text-xs mb-2"><strong>Challenge:</strong> 50kW bidirectional EV charging station with grid support functionality.</p>
              <p className="text-xs mb-2"><strong>Requirements:</strong> G99 compliance, comprehensive protection coordination, smart grid communication.</p>
              <p className="text-xs"><strong>Solution:</strong> Dedicated protection panel with bidirectional devices, smart control system, comprehensive testing regime.</p>
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
              <p className="font-medium text-white mb-1">Key Dates</p>
              <ul className="space-y-0.5">
                <li>Amendment 3 mandatory: 31st July 2024</li>
                <li>Anti-islanding max time: 5 seconds</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Grid Codes</p>
              <ul className="space-y-0.5">
                <li>G98: Smaller installations</li>
                <li>G99: Larger commercial systems</li>
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
            <Link to="/study-centre/upskilling/bs7671-module-4-section-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bs7671-module-4">
              Complete Module 4
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BS7671Module4Section7;
