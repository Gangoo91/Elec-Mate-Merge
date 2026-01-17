import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "afdd-purpose",
    question: "What does AFDD stand for and what risk does it help prevent?",
    options: [
      "Automatic Fire Detection Device - detects smoke",
      "Arc Fault Detection Device - prevents fire caused by arc faults",
      "Advanced Fault Detection Device - detects overcurrent",
      "Automatic Fault Disconnection Device - protects against short circuits"
    ],
    correctIndex: 1,
    explanation: "AFDD stands for Arc Fault Detection Device. It detects dangerous arcing conditions that traditional protective devices cannot sense, helping prevent fires caused by damaged cables or poor connections."
  },
  {
    id: "functional-earthing",
    question: "How is functional earthing different from protective earthing?",
    options: [
      "Functional earthing uses smaller conductors",
      "Functional earthing is for equipment operation, not safety",
      "Functional earthing is only for DC systems",
      "There is no difference"
    ],
    correctIndex: 1,
    explanation: "Functional earthing is used for equipment operation (like signal integrity or EMI suppression), while protective earthing is specifically for safety."
  },
  {
    id: "bidirectional-protection",
    question: "Which installations require bidirectional protective devices under Amendment 3?",
    options: [
      "All domestic installations",
      "Only commercial premises",
      "Prosumer installations with renewable generation or energy storage",
      "Traditional installations without generation"
    ],
    correctIndex: 2,
    explanation: "Amendment 3 requires bidirectional protective devices specifically for prosumer installations that have renewable generation or energy storage capabilities."
  }
];

const faqs = [
  {
    question: "When did Amendment 3 become effective?",
    answer: "Amendment 3 became effective on 31st July 2024 for new installations."
  },
  {
    question: "What type of systems might require PEI?",
    answer: "Smart home systems and other installations with sensitive electronic equipment that could be affected by electromagnetic interference."
  },
  {
    question: "Why were new definitions introduced in Amendment 2?",
    answer: "Amendment 2 introduced new definitions to address technological developments like smart homes, renewable energy, and emerging safety challenges."
  },
  {
    question: "What is a prosumer installation?",
    answer: "An electrical installation that both consumes and produces electrical energy, typically through renewable sources like solar PV."
  }
];

const quizQuestion = {
  question: "What is the key focus of Amendment 3's bidirectional protection requirements?",
  options: [
    "Improving traditional circuit protection",
    "Protecting against reverse current flow from renewable energy sources",
    "Enhancing RCD performance",
    "Reducing installation costs"
  ],
  correctAnswer: 1,
  explanation: "Amendment 3 focuses on bidirectional protection to manage reverse current flows from renewable energy sources like solar PV and energy storage systems."
};

const BS7671Module2Section3 = () => {
  useSEO({
    title: "Amendment 2 & 3 New Definitions - AFDD, PEI | BS 7671 Module 2.3",
    description: "Learn new definitions from BS 7671 Amendment 2 & 3 including AFDD, PEI, Functional Earthing, and bidirectional protection terminology for renewable energy systems."
  });

  const outcomes = [
    "Understand Amendment 2 definitions: AFDDs, PEI, and Functional Earthing",
    "Master Amendment 3 bidirectional protection terminology",
    "Recognise when bidirectional protective devices are required",
    "Apply current terminology in renewable energy installations",
    "Understand prosumer installation requirements",
    "Stay compliant with Amendment 3 effective from July 2024"
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bs7671-module-2">
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
            <span>Module 2.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            New Definitions from Amendment 2 & 3
          </h1>
          <p className="text-white/80">
            AFDD, PEI, Functional Earthing & Bidirectional Protection
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>AFDD:</strong> Detects arc faults to prevent fires</li>
              <li><strong>PEI:</strong> EMI protection for smart systems</li>
              <li><strong>Bidirectional:</strong> Required for prosumer installations</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Dates</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Amendment 2:</strong> Smart systems, AFDD terminology</li>
              <li><strong>Amendment 3:</strong> Effective 31st July 2024</li>
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

        {/* Section 01: AFDD */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            AFDD - Arc Fault Detection Device
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Arc Fault Detection Devices (AFDDs) represent a significant advancement in electrical fire prevention. They detect dangerous arcing conditions that traditional MCBs and RCDs cannot identify, providing enhanced protection against electrical fires.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">What Are Arc Faults?</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• Unintended electrical discharge between conductors</li>
                  <li>• Generate intense heat (over 6,000°C)</li>
                  <li>• Can occur without tripping conventional protection</li>
                  <li>• Major cause of electrical fires</li>
                  <li>• Often caused by damaged cables or poor connections</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Causes</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• Cable damage from nails or drilling</li>
                  <li>• Deteriorated insulation over time</li>
                  <li>• Loose or corroded connections</li>
                  <li>• Rodent damage to cables</li>
                  <li>• Overloaded extension leads</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-transparent border border-red-500/30 my-6">
              <p className="text-sm font-medium text-red-400 mb-3">How AFDDs Work</p>
              <p className="text-xs text-white mb-2">AFDDs use sophisticated algorithms to distinguish between:</p>
              <ul className="text-xs space-y-0.5">
                <li>• Normal electrical noise and dangerous arcs</li>
                <li>• Parallel arcs (line to neutral/earth)</li>
                <li>• Series arcs (in damaged conductors)</li>
                <li>• Load switching vs dangerous arcing</li>
              </ul>
              <p className="text-xs text-white mt-2">When a dangerous arc is detected, the AFDD disconnects the circuit within milliseconds.</p>
            </div>

            <div className="p-4 rounded-lg bg-transparent border border-white/10 my-6">
              <p className="text-sm font-medium text-white mb-3">AFDD vs Traditional Protection</p>
              <div className="grid grid-cols-3 gap-4 text-xs">
                <div>
                  <p className="font-medium text-elec-yellow/80 mb-1">MCB Protection</p>
                  <p>Detects overcurrent and short circuits but cannot sense dangerous arcing at normal current levels</p>
                </div>
                <div>
                  <p className="font-medium text-elec-yellow/80 mb-1">RCD Protection</p>
                  <p>Detects earth leakage currents but parallel arcs may not create sufficient imbalance to trip</p>
                </div>
                <div>
                  <p className="font-medium text-elec-yellow/80 mb-1">AFDD Protection</p>
                  <p>Specifically designed to detect the unique signatures of dangerous arcing conditions</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Requirements (Amendment 2):</p>
              <ul className="text-sm text-white space-y-1">
                <li>• Higher risk of ignition premises</li>
                <li>• Premises with sleeping accommodation</li>
                <li>• When cables are concealed in combustible construction</li>
                <li>• Circuits feeding socket outlets up to 32A</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: PEI */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            PEI - Protective Equipotential Bonding for Electrical Interference
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              PEI addresses the growing need to protect sensitive electronic equipment from electromagnetic interference (EMI) in modern smart installations. It's a specialized form of equipotential bonding designed for signal integrity rather than basic electrical safety.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Sources of EMI</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• Switching power supplies</li>
                  <li>• Variable frequency drives</li>
                  <li>• LED lighting with electronic control gear</li>
                  <li>• Wireless communication devices</li>
                  <li>• Electric vehicle charging equipment</li>
                  <li>• Renewable energy inverters</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Affected Equipment</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• Smart home automation systems</li>
                  <li>• Security and access control systems</li>
                  <li>• Fire alarm and detection systems</li>
                  <li>• Audio/visual equipment</li>
                  <li>• Computer networks and servers</li>
                  <li>• Building management systems</li>
                </ul>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-transparent border border-elec-yellow/30">
                <p className="text-sm font-medium text-elec-yellow mb-2">PEI Implementation</p>
                <ul className="text-xs space-y-0.5">
                  <li>• Low impedance bonding connections</li>
                  <li>• Star-point earthing arrangements where appropriate</li>
                  <li>• Separation of noisy and clean earth systems</li>
                  <li>• Dedicated EMI suppression measures</li>
                  <li>• Coordinated cable routing and screening</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-white mb-2">Practical Applications</p>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <p className="font-medium text-elec-yellow/80">Smart Homes</p>
                    <p>Home automation, security systems</p>
                  </div>
                  <div>
                    <p className="font-medium text-elec-yellow/80">Commercial</p>
                    <p>BMS, access control</p>
                  </div>
                  <div>
                    <p className="font-medium text-elec-yellow/80">Data Centers</p>
                    <p>Signal integrity, servers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 03: Functional Earthing */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Functional Earthing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Functional Earthing is earthing required for proper operation of electrical equipment, distinct from protective earthing which is required for safety. This definition clarifies the different purposes of earthing connections in modern installations.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div className="p-4 rounded-lg bg-transparent border border-red-500/30">
                <p className="text-sm font-medium text-red-400 mb-2">Protective Earthing</p>
                <p className="text-xs font-medium text-white mb-1">Purpose: Safety</p>
                <ul className="text-xs space-y-0.5">
                  <li>• Prevents dangerous voltages on metalwork</li>
                  <li>• Enables automatic disconnection during faults</li>
                  <li>• Required by safety regulations</li>
                  <li>• Sized for fault current capacity</li>
                  <li>• Cannot be switched during operation</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-elec-yellow/30">
                <p className="text-sm font-medium text-elec-yellow mb-2">Functional Earthing</p>
                <p className="text-xs font-medium text-white mb-1">Purpose: Operation</p>
                <ul className="text-xs space-y-0.5">
                  <li>• Required for equipment to function correctly</li>
                  <li>• Provides reference potential for circuits</li>
                  <li>• May be needed for EMI suppression</li>
                  <li>• Can be isolated for testing/maintenance</li>
                  <li>• Sizing based on functional requirements</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">IT Equipment</p>
                <p className="text-white/90 text-xs">Signal reference, static discharge, EMI filtering</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Control Systems</p>
                <p className="text-white/90 text-xs">Sensor potentials, analog signals, noise immunity</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Electronic Equipment</p>
                <p className="text-white/90 text-xs">Circuit operation, RF interference, voltage reference</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Amendment 3 - Bidirectional Protection */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Amendment 3 - Bidirectional Protection Terms
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Amendment 3, effective from 31st July 2024, introduces critical terminology for bidirectional protection in renewable energy and prosumer installations. These definitions address the unique challenges of managing reverse current flows from generation sources.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div className="p-4 rounded-lg bg-transparent border border-green-500/30">
                <p className="text-sm font-medium text-green-400 mb-2">Bidirectional Protective Device</p>
                <p className="text-xs text-white mb-2">A protective device that can interrupt fault currents flowing in both directions through the device.</p>
                <ul className="text-xs space-y-0.5">
                  <li>• Essential for prosumer installations</li>
                  <li>• Protects against reverse fault currents</li>
                  <li>• Ensures grid and installation safety</li>
                  <li>• Required for renewable energy sources</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-elec-yellow/30">
                <p className="text-sm font-medium text-elec-yellow mb-2">Prosumer Installation</p>
                <p className="text-xs text-white mb-2">An electrical installation that both consumes and produces electrical energy.</p>
                <ul className="text-xs space-y-0.5">
                  <li>• Solar PV installations</li>
                  <li>• Wind generation systems</li>
                  <li>• Energy storage systems</li>
                  <li>• Combined heat and power units</li>
                </ul>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white text-sm mb-1">When Required</p>
                <ul className="text-xs space-y-0.5">
                  <li>• New prosumer installations from 31st July 2024</li>
                  <li>• Solar PV systems with grid connection</li>
                  <li>• Energy storage systems that can export</li>
                  <li>• Wind generation and micro-CHP systems</li>
                </ul>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white text-sm mb-1">Implementation</p>
                <ul className="text-xs space-y-0.5">
                  <li>• Assessment of maximum reverse fault current</li>
                  <li>• Coordination with grid protection systems</li>
                  <li>• Selection of appropriate bidirectional devices</li>
                  <li>• Compliance with DNO requirements</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Real World Scenario */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Real World Scenario
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="p-4 rounded-lg bg-transparent border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-3">Modern Net-Zero Smart Home (2024)</p>
              <div className="text-sm space-y-3">
                <p><strong>Project:</strong> A new-build family home meeting 2024 building regulations with smart automation, 8kW solar PV, 13.5kWh battery storage, and EV charging. Must comply with both Amendment 2 and Amendment 3.</p>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium mb-1">Amendment 2 Definitions Applied:</p>
                    <ul className="text-xs space-y-0.5">
                      <li>• <strong>AFDD protection:</strong> Socket circuits in timber frame sleeping areas</li>
                      <li>• <strong>PEI implementation:</strong> Smart hub protected from inverter EMI</li>
                      <li>• <strong>Functional earthing:</strong> Signal reference for home automation</li>
                      <li>• <strong>Smart installation:</strong> Integrated energy management</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Amendment 3 Requirements:</p>
                    <ul className="text-xs space-y-0.5">
                      <li>• <strong>Bidirectional protection:</strong> For solar PV with grid export</li>
                      <li>• <strong>Prosumer installation:</strong> Consumes and exports energy</li>
                      <li>• <strong>Grid interaction safety:</strong> Bidirectional RCBO</li>
                      <li>• <strong>DNO coordination:</strong> G98 compliance</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <p className="font-medium mb-1">Design Challenges:</p>
                  <ul className="text-xs space-y-0.5 ml-4">
                    <li>• Coordinating AFDD protection with bidirectional protection devices</li>
                    <li>• Managing EMI from high-frequency solar inverters</li>
                    <li>• Implementing separate protective and functional earthing systems</li>
                    <li>• Ensuring fault current coordination for forward and reverse flows</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Other Amendment 2 Definitions */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Other Key Amendment 2 Definitions
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Energy Efficiency Definitions</p>
                <div className="space-y-2">
                  <div className="p-2 rounded bg-transparent border border-white/10">
                    <p className="text-xs font-medium">Energy Storage System</p>
                    <p className="text-xs text-white/80">One or more devices with power conversion and control systems</p>
                  </div>
                  <div className="p-2 rounded bg-transparent border border-white/10">
                    <p className="text-xs font-medium">DC Installation</p>
                    <p className="text-xs text-white/80">Installation using DC circuits for power distribution</p>
                  </div>
                  <div className="p-2 rounded bg-transparent border border-white/10">
                    <p className="text-xs font-medium">Prosumer</p>
                    <p className="text-xs text-white/80">Entity that consumes and produces electrical energy</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Smart Technology Definitions</p>
                <div className="space-y-2">
                  <div className="p-2 rounded bg-transparent border border-white/10">
                    <p className="text-xs font-medium">Smart Installation</p>
                    <p className="text-xs text-white/80">Incorporates communication for monitoring and control</p>
                  </div>
                  <div className="p-2 rounded bg-transparent border border-white/10">
                    <p className="text-xs font-medium">Load Management System</p>
                    <p className="text-xs text-white/80">Controls loads to optimize energy consumption</p>
                  </div>
                  <div className="p-2 rounded bg-transparent border border-white/10">
                    <p className="text-xs font-medium">Communication Network</p>
                    <p className="text-xs text-white/80">Enables data exchange between equipment</p>
                  </div>
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
              <p className="font-medium text-elec-yellow/80 mb-1">Amendment 2 Foundations</p>
              <ul className="space-y-0.5">
                <li>AFDD – arc fault fire prevention</li>
                <li>PEI – EMI protection for smart systems</li>
                <li>Functional earthing – equipment operation</li>
                <li>Smart installation definitions</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-elec-yellow/80 mb-1">Amendment 3 (July 2024)</p>
              <ul className="space-y-0.5">
                <li>Bidirectional protection – prosumer installations</li>
                <li>Required for solar PV and battery systems</li>
                <li>Manages reverse current flows</li>
                <li>Grid interaction safety</li>
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
            <Link to="/study-centre/upskilling/bs7671-module-2-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bs7671-module-2-section-4">
              Next: Amendment 3 Highlights
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BS7671Module2Section3;
