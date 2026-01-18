import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "tns-characteristic",
    question: "What is the main advantage of a TN-S system?",
    options: [
      "Lower installation cost",
      "Separate neutral and earth conductors throughout",
      "No earthing required",
      "Higher fault currents"
    ],
    correctIndex: 1,
    explanation: "TN-S provides separate neutral (N) and protective earth (PE) conductors throughout, giving the most reliable earthing arrangement with low earth fault loop impedance."
  },
  {
    id: "pme-risk",
    question: "What is the main risk unique to TN-C-S (PME) systems?",
    options: [
      "High installation cost",
      "Need for RCD protection",
      "Neutral conductor failure making metalwork live",
      "High earth electrode resistance"
    ],
    correctIndex: 2,
    explanation: "In TN-C-S systems, if the supply neutral fails, all earthed metalwork can become live because the PEN conductor combines neutral and earth."
  },
  {
    id: "tt-system",
    question: "Why is RCD protection essential in TT systems?",
    options: [
      "It's cheaper than MCBs",
      "High earth fault loop impedance prevents overcurrent device operation",
      "TT systems don't have earthing",
      "It provides overcurrent protection"
    ],
    correctIndex: 1,
    explanation: "TT systems have high earth fault loop impedance (often >200Ω) due to the independent earth electrode, making RCD protection essential as conventional overcurrent devices cannot operate fast enough."
  }
];

const faqs = [
  {
    question: "Which earthing system is most common in UK domestic installations?",
    answer: "TN-C-S (PME) is most common in UK domestic installations because it's economical for supply networks while providing reliable earthing."
  },
  {
    question: "When would you use an IT system?",
    answer: "IT systems are used where continuity of supply is critical - operating theatres, intensive care units, process industries, and safety-critical systems where the first fault shouldn't cause disconnection."
  },
  {
    question: "Can TN-C-S be used for outdoor or mobile installations?",
    answer: "No. TN-C-S cannot be exported for outdoor installations, caravan sites, marinas, or mobile equipment due to the risk of neutral conductor failure."
  },
  {
    question: "What is typical earth fault loop impedance for TN-S?",
    answer: "TN-S systems typically have Zs of 0.8Ω or less, ensuring reliable automatic disconnection of supply operation."
  }
];

const quizQuestion = {
  question: "What does IT system provide that makes it suitable for hospitals?",
  options: [
    "Lowest cost installation",
    "No earthing required",
    "Continuity of supply during first earth fault",
    "Highest fault currents"
  ],
  correctAnswer: 2,
  explanation: "IT systems allow continued operation during the first earth fault, giving time to locate and repair the fault without interrupting critical medical equipment. An insulation monitoring device provides early warning."
};

const BS7671Module3Section1 = () => {
  useSEO({
    title: "Supply Systems - TN-S, TN-C-S, TT, IT | BS 7671 Module 3.1",
    description: "Master electrical earthing systems including TN-S, TN-C-S (PME), TT, and IT. Learn safety implications, protection requirements, and system selection for different installations."
  });

  const outcomes = [
    "Define and distinguish between TN-S, TN-C-S, TT, and IT earthing systems",
    "Explain operational principles and fault current paths",
    "Describe safety implications and protection requirements",
    "Evaluate earthing system suitability for different installations",
    "Analyse protection coordination requirements for each system",
    "Compare installation complexity, costs, and maintenance"
  ];

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/bs7671-module-3">
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
            <span>Module 3.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Supply Systems – TN-S, TN-C-S, TT, IT
          </h1>
          <p className="text-white/80">
            Understanding earthing arrangements and their safety implications
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>TN-S:</strong> Separate N & PE - most reliable earthing</li>
              <li><strong>TN-C-S:</strong> PME - common UK domestic supply</li>
              <li><strong>TT:</strong> Independent earth electrode - RCD essential</li>
              <li><strong>IT:</strong> Isolated supply - critical applications</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Selection Factors</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Supply:</strong> What DNO provides</li>
              <li><strong>Safety:</strong> Fault current paths</li>
              <li><strong>Continuity:</strong> Critical applications</li>
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

        {/* Section 01: TN-S System */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            TN-S System: Separate Neutral and Earth
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The TN-S system provides separate neutral (N) and protective earth (PE) conductors throughout the entire installation, from the supply transformer to final circuits. This separation provides the most reliable earthing arrangement.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-green-400/80 mb-2">Technical Advantages</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Low Zs:</strong> Typically 0.8Ω or less for reliable ADS</li>
                  <li><strong>No N-E voltage:</strong> Separate conductors eliminate voltage</li>
                  <li><strong>Predictable faults:</strong> Reliable fault current for protection</li>
                  <li><strong>EMC performance:</strong> Better compatibility, separate earth</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Applications</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Commercial:</strong> Office complexes, shopping centres</li>
                  <li><strong>Industrial:</strong> Data centres, manufacturing plants</li>
                  <li><strong>Residential:</strong> New housing estates, apartments</li>
                  <li><strong>Specialist:</strong> Schools, hospitals (non-critical areas)</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent border border-green-500/30">
                <p className="font-medium text-green-400 mb-1">Zs</p>
                <p className="text-white/90 text-xs">≤0.8Ω typical</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Supply Cable</p>
                <p className="text-white/90 text-xs">4 or 5 core</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">N & PE</p>
                <p className="text-white/90 text-xs">Separate throughout</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">RCD</p>
                <p className="text-white/90 text-xs">Additional protection</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: TN-C-S System */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            TN-C-S System: Protective Multiple Earthing (PME)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              TN-C-S combines neutral and earth (PEN conductor) in the supply network but separates them at the service position. The neutral is earthed at multiple points along the supply network - hence "Protective Multiple Earthing."
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Advantages</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Economic supply:</strong> 3-core instead of 4-core cables</li>
                  <li><strong>Reliable earth:</strong> Multiple connections provide stability</li>
                  <li><strong>Good fault performance:</strong> Low Zs when system intact</li>
                  <li><strong>Wide availability:</strong> Standard UK domestic supply</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-red-400/80 mb-2">Critical Safety Risks</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Neutral failure:</strong> All earthed metalwork becomes live</li>
                  <li><strong>N-E voltage:</strong> Voltage appears under load</li>
                  <li><strong>Broken neutral:</strong> Over/under voltage on circuits</li>
                  <li><strong>Export prohibition:</strong> Not for portable/mobile use</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-transparent border border-red-500/30 my-6">
              <p className="text-sm font-medium text-red-400 mb-2">Warning: Enhanced Bonding Required</p>
              <p className="text-xs text-white mb-2">TN-C-S systems require comprehensive main equipotential bonding due to neutral failure risk:</p>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <ul className="space-y-0.5">
                  <li>• Water service pipes</li>
                  <li>• Gas service pipes</li>
                  <li>• Structural steel</li>
                </ul>
                <ul className="space-y-0.5">
                  <li>• Central heating</li>
                  <li>• Lightning protection</li>
                  <li>• Telecom cable sheaths</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: TT System */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            TT System: Earth Electrode Required
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              In TT systems, the installation earth is independent of the supply earth. The installation requires its own earth electrode, typically with earth fault loop impedance exceeding 200Ω. This high impedance makes RCD protection essential.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">System Advantages</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Independent earth:</strong> Isolated from supply faults</li>
                  <li><strong>No export restrictions:</strong> Suitable for mobile equipment</li>
                  <li><strong>Supply independence:</strong> No dependency on supply earth</li>
                  <li><strong>Retrofit capability:</strong> Where supply earth unavailable</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-orange-400/80 mb-2">Design Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>RCD essential:</strong> 30mA for sockets and most circuits</li>
                  <li><strong>Earth electrode:</strong> Proper design and installation</li>
                  <li><strong>Ra × IΔn ≤ 50V:</strong> Earth resistance calculation essential</li>
                  <li><strong>Seasonal check:</strong> Resistance changes with weather</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Rural</p>
                <p className="text-white/90 text-xs">Farms, remote cottages, caravans</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Temporary</p>
                <p className="text-white/90 text-xs">Construction sites, events</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Specialist</p>
                <p className="text-white/90 text-xs">Petrol stations, marinas</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: IT System */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            IT System: Isolated or High Impedance Earthing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              IT systems have the supply either isolated from earth or connected through high impedance. The first earth fault does not require immediate disconnection, allowing continued operation whilst the fault is located and repaired.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">System Benefits</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Continuity:</strong> First fault allows continued operation</li>
                  <li><strong>Enhanced safety:</strong> Low first fault current</li>
                  <li><strong>Early warning:</strong> IMD provides advance notice</li>
                  <li><strong>Planned maintenance:</strong> Repair during scheduled downtime</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>IMD:</strong> Insulation monitoring with audible/visual alarm</li>
                  <li><strong>Second fault:</strong> Overcurrent or RCD protection required</li>
                  <li><strong>Skilled personnel:</strong> Competent persons for maintenance</li>
                  <li><strong>System complexity:</strong> Higher installation requirements</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-transparent border border-elec-yellow/30 my-6">
              <p className="text-sm font-medium text-elec-yellow mb-2">Critical Applications</p>
              <div className="grid grid-cols-3 gap-4 text-xs">
                <div>
                  <p className="font-medium text-white mb-1">Medical</p>
                  <ul className="space-y-0.5">
                    <li>• Operating theatres</li>
                    <li>• Intensive care units</li>
                    <li>• Life support systems</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-1">Industrial</p>
                  <ul className="space-y-0.5">
                    <li>• Chemical processing</li>
                    <li>• Petrochemical plants</li>
                    <li>• Continuous manufacturing</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-1">Safety-Critical</p>
                  <ul className="space-y-0.5">
                    <li>• Emergency lighting</li>
                    <li>• Fire safety systems</li>
                    <li>• Data centres</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: System Selection Guide */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            System Selection Guide
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="p-4 rounded-lg bg-transparent border border-white/10 my-6">
              <p className="text-sm font-medium text-white mb-3">Decision Matrix</p>
              <div className="grid sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="font-medium text-elec-yellow/80 mb-1">System Selection:</p>
                  <ul className="space-y-0.5">
                    <li><strong>TN-S:</strong> New installations with dedicated supply</li>
                    <li><strong>TN-C-S:</strong> Standard domestic/commercial supply</li>
                    <li><strong>TT:</strong> Remote locations or supply restrictions</li>
                    <li><strong>IT:</strong> Critical applications requiring continuity</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-elec-yellow/80 mb-1">Selection Factors:</p>
                  <ul className="space-y-0.5">
                    <li>• Available supply arrangements</li>
                    <li>• Installation complexity and cost</li>
                    <li>• Safety and reliability requirements</li>
                    <li>• Maintenance and testing considerations</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-transparent border border-red-500/30">
                <p className="text-sm font-medium text-red-400 mb-2">Common Selection Errors</p>
                <ul className="text-xs space-y-0.5">
                  <li>• Assuming TN-C-S is always available</li>
                  <li>• Ignoring export restrictions for TN-C-S</li>
                  <li>• Underestimating TT system RCD requirements</li>
                  <li>• IT system complexity underestimation</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-green-500/30">
                <p className="text-sm font-medium text-green-400 mb-2">Best Practices</p>
                <ul className="text-xs space-y-0.5">
                  <li>• Verify supply arrangements early</li>
                  <li>• Consider long-term operational needs</li>
                  <li>• Factor in maintenance requirements</li>
                  <li>• Plan for future modifications</li>
                </ul>
              </div>
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
              <p className="text-sm font-medium text-orange-400 mb-3">Hospital Emergency Power System Failure</p>
              <div className="text-sm space-y-3">
                <p><strong>Situation:</strong> A contractor installs a TN-C-S system for emergency medical equipment, not realising the critical nature of supply continuity.</p>

                <p><strong>Problem:</strong> During a neutral conductor fault, all emergency equipment loses earth reference simultaneously, compromising patient safety.</p>

                <div>
                  <p className="font-medium mb-1">What Went Wrong:</p>
                  <ul className="text-xs space-y-0.5 ml-4">
                    <li>• TN-C-S neutral failure risk not assessed</li>
                    <li>• Critical equipment not identified as needing IT system</li>
                    <li>• BS 7671 Section 710 (Medical Locations) not followed</li>
                  </ul>
                </div>

                <p><strong>Correct Solution:</strong> IT system specified with insulation monitoring, ensuring first earth fault doesn't interrupt critical medical equipment. Patient safety maintained through continued supply during fault conditions.</p>
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
              <p className="font-medium text-elec-yellow/80 mb-1">System Characteristics</p>
              <ul className="space-y-0.5">
                <li>TN-S: Zs ≤0.8Ω, separate N & PE</li>
                <li>TN-C-S: PEN in supply, enhanced bonding</li>
                <li>TT: Independent earth, RCD essential</li>
                <li>IT: IMD required, first fault allowed</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-elec-yellow/80 mb-1">Protection Requirements</p>
              <ul className="space-y-0.5">
                <li>TN systems: ADS with overcurrent devices</li>
                <li>TT: 30mA RCD mandatory for sockets</li>
                <li>IT: IMD + second fault protection</li>
                <li>All: Verify Zs against disconnection times</li>
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
            <Link to="/study-centre/upskilling/bs7671-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bs7671-module-3-section-2">
              Next: Maximum Demand & Diversity
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BS7671Module3Section1;
