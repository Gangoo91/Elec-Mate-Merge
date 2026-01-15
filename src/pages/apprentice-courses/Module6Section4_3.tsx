import { ArrowLeft, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { useState } from "react";

const Module6Section4_3 = () => {
  useSEO(
    "Confirming Polarity of Switches and Accessories - Level 2 Electrical Testing & Inspection",
    "Essential polarity testing procedures to ensure correct wiring and electrical safety"
  );

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const quizQuestions = [
    {
      id: 1,
      question: "What does polarity testing confirm?",
      options: ["Correct connection of line, neutral, and CPC", "Earth loop impedance values", "Insulation resistance"],
      correctAnswer: 0,
      explanation: "Polarity testing confirms the correct connection of line, neutral, and CPC conductors to their intended terminals."
    },
    {
      id: 2,
      question: "Which conductor must always be switched?",
      options: ["Neutral", "Line", "CPC"],
      correctAnswer: 1,
      explanation: "The line conductor must always be switched to ensure proper isolation when the switch is in the off position."
    },
    {
      id: 3,
      question: "What tool is used to confirm polarity safely?",
      options: ["Socket tester", "Two-pole voltage tester", "Clamp meter"],
      correctAnswer: 1,
      explanation: "A two-pole voltage tester is the proper instrument for safely confirming polarity in electrical installations."
    },
    {
      id: 4,
      question: "What is the risk if the switch interrupts the neutral instead of the line?",
      options: ["No risk if CPC is present", "The circuit remains live, even if switched off", "Overheating only"],
      correctAnswer: 1,
      explanation: "If a switch interrupts the neutral instead of line, the circuit remains live even when switched off, creating a serious shock hazard."
    },
    {
      id: 5,
      question: "When must polarity testing be carried out?",
      options: ["Only during EICR inspections", "During initial verification, alterations, and fault-finding", "Only if sockets fail"],
      correctAnswer: 1,
      explanation: "Polarity testing is required during initial verification, after alterations or additions, and during fault-finding procedures."
    },
    {
      id: 6,
      question: "What happens if line and neutral are reversed at a socket?",
      options: ["Appliances won't work", "Appliances work but safety devices won't disconnect properly", "It has no effect"],
      correctAnswer: 1,
      explanation: "Reversed polarity means appliances may function but internal fuses and safety devices won't operate correctly during faults."
    },
    {
      id: 7,
      question: "Which test instrument can measure low resistance for polarity checks?",
      options: ["Insulation tester", "Low resistance ohmmeter", "Clamp meter"],
      correctAnswer: 1,
      explanation: "A low resistance ohmmeter is used for continuity checks to confirm polarity in electrical installations."
    },
    {
      id: 8,
      question: "Why is a socket tester not sufficient for polarity?",
      options: ["It is illegal to use them", "It only gives a basic indication, not full verification", "They cannot detect CPC"],
      correctAnswer: 1,
      explanation: "Socket testers only provide basic indication and are not a substitute for formal polarity testing with calibrated instruments."
    },
    {
      id: 9,
      question: "Which part of a lampholder must always be connected to neutral?",
      options: ["The shell (outer contact)", "The centre pin", "Both can be live"],
      correctAnswer: 0,
      explanation: "The lampholder shell (outer contact) must always be connected to neutral to prevent shock hazards when changing bulbs."
    },
    {
      id: 10,
      question: "What should be done if incorrect polarity is discovered?",
      options: ["Record it only", "Immediately rectify the fault before energising", "Ignore it if CPC is present"],
      correctAnswer: 1,
      explanation: "Incorrect polarity must be immediately rectified before energising as it poses serious safety risks regardless of CPC connection."
    }
  ];

  const faqs = [
    {
      question: "Can I rely on a plug-in socket tester for polarity?",
      answer: "No. Socket testers give a quick indication but do not replace formal polarity tests with calibrated instruments required for proper verification and certification."
    },
    {
      question: "Is polarity testing needed after replacing a light switch?",
      answer: "Yes, to ensure the switch is correctly interrupting the line conductor and not the neutral. This is essential for safety and compliance."
    },
    {
      question: "If polarity is wrong but CPC is connected, is it safe?",
      answer: "No - incorrect polarity is always unsafe and must be corrected regardless of CPC connection. The CPC doesn't mitigate polarity hazards."
    },
    {
      question: "How can I tell if polarity is correct just by looking?",
      answer: "Visual inspection alone cannot confirm polarity. Proper electrical testing with calibrated instruments is required to verify correct connections."
    },
    {
      question: "Do all circuits need polarity testing?",
      answer: "Yes, all final circuits must have polarity verified during initial verification, after modifications, and during periodic inspection and testing."
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/5 -ml-2 min-h-[44px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 6.4
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 6</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 6.4.3</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Confirming Polarity of Switches and Accessories
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Essential polarity testing procedures to ensure correct wiring and electrical safety
            </p>
          </header>

          {/* Summary Box */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <h2 className="font-semibold text-white mb-3">Quick Summary</h2>
            <ul className="space-y-2 text-sm text-white/80">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Switches must break line conductors only</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Line, neutral, CPC must connect correctly</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Wrong polarity = safety hazard</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Test at sockets, switches, lights</span>
              </li>
            </ul>
          </div>

          {/* Introduction */}
          <section className="mb-10">
            <p className="text-white/80 leading-relaxed mb-4">
              Polarity testing ensures that electrical accessories such as sockets, switches, and lighting points are wired correctly, with line, neutral, and CPC conductors connected to their intended terminals. Incorrect polarity can make switches ineffective, energise exposed parts, or leave appliances permanently live, posing serious shock risks.
            </p>
            <p className="text-white/80 leading-relaxed">
              Confirming polarity is therefore essential for compliance with BS 7671 and overall electrical safety.
            </p>
          </section>

          {/* Section 1: Importance of Polarity */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Importance of Polarity in Electrical Safety
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-medium text-white mb-3">Switch Operation and Safety</h3>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Ensures switches break the line conductor, not the neutral, providing true isolation when off</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Prevents circuits remaining live when switch appears to be in off position</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Critical for maintenance safety - workers expect switched-off circuits to be dead</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Single-pole switches must interrupt line conductor to comply with BS 7671 requirements</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <h3 className="font-medium text-white mb-3">Protection Against Electric Shock</h3>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">⚠</span>
                    <span>Prevents exposed metal parts from becoming live during normal operation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">⚠</span>
                    <span>Ensures lampholder shells connected to neutral, reducing shock risk during bulb changes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">⚠</span>
                    <span>Correct polarity enables proper operation of Class I appliance safety features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">⚠</span>
                    <span>Reversed polarity can energise appliance cases through internal wiring faults</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-medium text-white mb-3">Regulatory Compliance</h3>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>BS 7671:2018+A2:2022 Section 612.6 mandates polarity verification testing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Regulation 132.7 requires single-pole devices to break line conductors only</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Part P Building Regulations compliance depends on correct polarity verification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Professional liability requires demonstration of competent polarity verification</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2: Testing Methods */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Testing Methods and Procedures
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-medium text-white mb-3">Testing at Socket Outlets</h3>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Use multifunction tester or continuity test to confirm line, neutral, and CPC connections</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Verify line conductor connects to right-hand terminal when viewed from front (BS 1363 standard)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Confirm neutral connects to left-hand terminal and CPC to top earth terminal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Check switched socket outlets ensure switch interrupts line, not neutral</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-medium text-white mb-3">Testing at Switches</h3>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Verify that the switch interrupts the line conductor, not neutral</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Test continuity with switch open and closed to confirm correct conductor switching</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>For two-way switching: verify correct strappers and switch line identification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Smart switches and occupancy sensors must switch line conductor correctly</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-medium text-white mb-3">Testing at Lighting Points</h3>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Ensure the lampholder shell is connected to neutral, not line conductor</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Verify centre contact of lampholder connects to switched line</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Test ceiling roses for proper line, neutral, and CPC terminations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>LED fittings require verification of internal driver polarity</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-medium text-white mb-3">Instruments and Equipment</h3>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Low resistance ohmmeter for continuity checks and circuit identification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Two-pole voltage tester for proving live and confirming polarity safely</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Socket tester (basic tool only - not substitute for formal testing)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>GS38 compliant test leads for safe electrical testing</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3: Common Faults */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Common Faults and Consequences
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <h3 className="font-medium text-white mb-3">Typical Polarity Faults</h3>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">⚠</span>
                    <span>Line and neutral reversed at socket terminals - most common domestic fault</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">⚠</span>
                    <span>Switch installed in the neutral instead of the line conductor</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">⚠</span>
                    <span>CPC not connected, leading to unsafe exposed metalwork</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">⚠</span>
                    <span>Lampholder shell connected to line instead of neutral</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <h3 className="font-medium text-white mb-3">Safety Consequences</h3>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">⚠</span>
                    <span>Electric shock from supposedly dead circuits that remain live</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">⚠</span>
                    <span>Appliance internal fuses fail to provide protection during fault conditions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">⚠</span>
                    <span>Light fixtures remain energised even when switch is off</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">⚠</span>
                    <span>RCD devices may not operate correctly with reversed polarity</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Real World Example */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Real-World Example: Commercial Polarity Fault
            </h2>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h3 className="font-medium text-white mb-3">Scenario</h3>
              <p className="text-sm text-white/80 mb-4">
                On a commercial project, polarity testing revealed that several socket outlets had line and neutral reversed. While appliances appeared to work, the internal fuses would not have disconnected the fault correctly, leaving equipment live and dangerous.
              </p>

              <div className="p-3 rounded bg-red-500/10 border border-red-500/20 mb-4">
                <p className="text-sm text-white/80">
                  <strong className="text-red-400">Critical Finding:</strong> 8 out of 24 sockets had reversed line and neutral connections. Computer equipment internal protection would not operate correctly during faults.
                </p>
              </div>

              <h4 className="font-medium text-white mb-2">Resolution</h4>
              <ul className="text-sm text-white/80 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Installation halted immediately until polarity faults rectified</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>All affected sockets rewired with correct polarity</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Complete polarity verification repeated for entire installation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>EIC issued only after satisfactory polarity verification</span>
                </li>
              </ul>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Frequently Asked Questions
            </h2>
            <div className="space-y-2">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-white/10 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full p-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors min-h-[44px] touch-manipulation"
                  >
                    <span className="font-medium text-white text-sm">{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-white/60 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === index && (
                    <div className="px-4 pb-4">
                      <p className="text-sm text-white/70">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Key Takeaways */}
          <section className="mb-10">
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h2 className="font-semibold text-white mb-3">Key Takeaways</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <ul className="space-y-2 text-sm text-white/80">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Polarity ensures correct connection of line, neutral, and CPC</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Switches must interrupt line conductors only</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Test at sockets, switches, and lighting points</span>
                  </li>
                </ul>
                <ul className="space-y-2 text-sm text-white/80">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Wrong polarity = safety hazard</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Socket testers are not enough</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Use calibrated test equipment only</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Quiz */}
          <Quiz questions={quizQuestions} />

          {/* Navigation Footer */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10 mt-10">
            <Button
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../4-2">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: 4.2
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="..">
                Section Overview
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module6Section4_3;
