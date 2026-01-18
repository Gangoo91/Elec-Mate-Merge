import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "evcharging-m4s1-check1",
    question: "Which earthing system requires an RCD for fault protection in EV charging?",
    options: ["TN-S only", "TN-C-S only", "TT system", "All earthing systems"],
    correctIndex: 2,
    explanation: "TT systems have high earth fault loop impedance, so RCDs are mandatory for fault protection. While RCDs are recommended for all EV charging, they're essential for TT where overcurrent devices alone cannot disconnect faults fast enough."
  },
  {
    id: "evcharging-m4s1-check2",
    question: "What is the main concern with TN-C-S (PME) for outdoor EV charging?",
    options: [
      "High electricity costs",
      "Dangerous voltages on exposed metalwork if PEN conductor fails",
      "Slower charging speeds",
      "More expensive equipment required"
    ],
    correctIndex: 1,
    explanation: "If the PEN conductor becomes open circuit, dangerous voltages up to 230V can appear on exposed metalwork. Regulation 722.411.4.1 restricts PME use for EV charging and requires additional protective measures."
  },
  {
    id: "evcharging-m4s1-check3",
    question: "What is the maximum earth electrode resistance for a 30mA RCD on a TT system?",
    options: ["50Ω", "100Ω", "200Ω", "500Ω"],
    correctIndex: 2,
    explanation: "For 30mA RCD protection, maximum earth resistance = 50V ÷ 0.03A = 1,667Ω theoretically. However, BS 7671 recommends maximum 200Ω (RA × IΔn ≤ 50V) to ensure reliable operation with safety margins."
  }
];

const faqs = [
  {
    question: "Can I use my existing TN-C-S supply for outdoor EV charging?",
    answer: "It depends on the specific installation. PME restrictions under Regulation 722.411.4.1 may require additional measures such as earth electrodes or equipotential bonding. A risk assessment is essential."
  },
  {
    question: "How do I determine if my supply is TN-S or TN-C-S?",
    answer: "Check the supply arrangement at the meter position. TN-S has separate neutral and earth conductors from the DNO; TN-C-S has a combined PEN conductor that splits into separate N and PE at the service position."
  },
  {
    question: "What's the benefit of converting to TT for public charging?",
    answer: "TT systems eliminate PME restrictions and provide enhanced safety isolation from supply earth faults, making them ideal for publicly accessible charging points where the public may contact metalwork."
  },
  {
    question: "Why can't Type AC RCDs be used for EV charging?",
    answer: "Modern EV chargers can produce DC fault currents that Type AC RCDs cannot detect. BS 7671 requires minimum Type A RCD, with Type B preferred for comprehensive protection against all residual current types."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A public car park requires 10 EV charging points. The site has a TN-C-S supply. What earthing arrangement is most appropriate?",
  options: [
    "Use existing PME with standard bonding",
    "Install a TT system with dedicated earth electrode",
    "No earthing changes required",
    "Use TN-S arrangement from DNO"
  ],
  correctAnswer: 1,
  explanation: "For public charging accessible to the general public, TT is preferred as it eliminates PME restrictions, provides isolation from supply earth faults, and automatically complies with Regulation 722.411.4.1 requirements."
  }
];

const EVChargingModule4Section1 = () => {
  useSEO({
    title: "Earthing System Selection | EV Charging Module 4.1",
    description: "Learn to select appropriate earthing systems (TT, TN-S, TN-C-S) for EV charging installations according to BS 7671 requirements."
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician/upskilling/ev-charging-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 4.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Earthing System Selection
          </h1>
          <p className="text-white/80">
            TT, TN-S, and TN-C-S systems for EV charging
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>TN-S:</strong> Best for EV, low impedance, reliable</li>
              <li><strong>TN-C-S (PME):</strong> Common but has restrictions</li>
              <li><strong>TT:</strong> Preferred for outdoor/public charging</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Check supply type at meter position</li>
              <li><strong>Use:</strong> Reg 722.411.4.1 for PME restrictions</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Classify different earthing system types",
              "Evaluate suitability for EV charging applications",
              "Apply BS 7671 earthing requirements",
              "Design fault protection for each system",
              "Calculate earth fault loop impedance",
              "Specify protective devices correctly"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1 - TN-S */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            TN-S Earthing Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              TN-S systems have separate neutral and protective earth conductors throughout,
              providing a direct, low-impedance path for fault currents back to the source.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">System Characteristics</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• Separate N and PE throughout</li>
                  <li>• Single earthing point at transformer</li>
                  <li>• Typical in new underground supplies</li>
                  <li>• Low earth fault loop impedance</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Advantages for EV</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• Excellent overcurrent protection</li>
                  <li>• Minimal N-E voltage differences</li>
                  <li>• Good EMC characteristics</li>
                  <li>• Predictable fault currents</li>
                </ul>
              </div>
            </div>

            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left p-2 text-elec-yellow">Protection</th>
                    <th className="text-left p-2 text-elec-yellow">Requirement</th>
                    <th className="text-left p-2 text-elec-yellow">BS 7671</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/10">
                    <td className="p-2">Disconnection time</td>
                    <td className="p-2">≤0.4s (≤32A circuits)</td>
                    <td className="p-2">Table 41.1</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="p-2">Earth fault loop (32A Type B)</td>
                    <td className="p-2">Zs ≤ 1.44Ω</td>
                    <td className="p-2">Appendix 3</td>
                  </tr>
                  <tr>
                    <td className="p-2">RCD protection</td>
                    <td className="p-2">≤30mA Type A minimum</td>
                    <td className="p-2">722.531.2</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 - TN-C-S */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            TN-C-S Systems (PME)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              TN-C-S (Protective Multiple Earthing) combines neutral and earth functions
              into a single PEN conductor in the supply network. Within the installation,
              the PEN splits into separate N and PE conductors.
            </p>

            <div className="p-3 rounded bg-transparent border border-red-400/30">
              <p className="text-sm font-medium text-red-400/80 mb-2">PME Restrictions - Regulation 722.411.4.1</p>
              <ul className="text-sm text-white space-y-1">
                <li>• Open PEN conductor creates dangerous voltages on metalwork</li>
                <li>• Outdoor charging points require special consideration</li>
                <li>• May need additional earth electrode or equipotential bonding</li>
                <li>• Risk assessment essential for all PME EV installations</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-3 rounded bg-transparent border border-green-400/30">
                <p className="text-sm font-medium text-white mb-2">Method 1: Earth Electrode</p>
                <ul className="text-xs text-white space-y-1">
                  <li>• Install TT earth electrode (≤200Ω)</li>
                  <li>• RCD protection mandatory</li>
                  <li>• Isolate from PME earth</li>
                  <li className="text-elec-yellow">Suitable for outdoor charging</li>
                </ul>
              </div>
              <div className="p-3 rounded bg-transparent border border-green-400/30">
                <p className="text-sm font-medium text-white mb-2">Method 2: Equipotential Zone</p>
                <ul className="text-xs text-white space-y-1">
                  <li>• Create local bonding network</li>
                  <li>• Bond metalwork within 2.5m</li>
                  <li>• Mesh earthing if required</li>
                  <li className="text-elec-yellow">Suitable for dedicated areas</li>
                </ul>
              </div>
            </div>

            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left p-2 text-elec-yellow">Installation Type</th>
                    <th className="text-left p-2 text-elec-yellow">PME Suitability</th>
                    <th className="text-left p-2 text-elec-yellow">Measures Required</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/10">
                    <td className="p-2">Internal garage</td>
                    <td className="p-2 text-green-400">Suitable</td>
                    <td className="p-2">Standard bonding</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="p-2">Domestic driveway</td>
                    <td className="p-2 text-elec-yellow">Restricted</td>
                    <td className="p-2">Earth electrode or bonding</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="p-2">Public charging</td>
                    <td className="p-2 text-red-400">Not suitable</td>
                    <td className="p-2">Convert to TT</td>
                  </tr>
                  <tr>
                    <td className="p-2">Commercial car park</td>
                    <td className="p-2 text-elec-yellow">Case by case</td>
                    <td className="p-2">Risk assessment required</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 - TT */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            TT Earthing Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              TT systems use a local earth electrode completely independent of the supply
              earthing. This isolation eliminates imported earth faults and voltage rises,
              making TT ideal for EV charging in public or exposed locations.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">System Characteristics</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• Local earth electrode (isolated)</li>
                  <li>• High Zs requires RCD protection</li>
                  <li>• Immunity from supply faults</li>
                  <li>• Preferred for public charging</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Advantages for EV</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• No PME restrictions</li>
                  <li>• Enhanced public safety</li>
                  <li>• Automatic Reg 722 compliance</li>
                  <li>• Independent of DNO earthing</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
              <p className="text-sm font-medium text-elec-yellow mb-2">Earth Electrode Requirements</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm text-white">
                <div>
                  <p className="font-medium mb-1">Rod Electrodes</p>
                  <ul className="text-xs space-y-0.5">
                    <li>• Copper-bonded steel: 20-200Ω typical</li>
                    <li>• Multiple rods reduce resistance</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-1">Max Resistance (30mA RCD)</p>
                  <ul className="text-xs space-y-0.5">
                    <li>• RA × IΔn ≤ 50V</li>
                    <li>• Practical target: &lt;100Ω</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4 - Selection Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            System Selection Summary
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-2">TN-S</p>
                <ul className="text-xs text-white space-y-1">
                  <li>• Best overall performance</li>
                  <li>• Low Zs, fast disconnection</li>
                  <li>• May not be available</li>
                </ul>
                <p className="text-xs text-green-400 mt-2">Excellent for EV</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-2">TN-C-S</p>
                <ul className="text-xs text-white space-y-1">
                  <li>• Most common UK supply</li>
                  <li>• PME restrictions apply</li>
                  <li>• Risk assessment needed</li>
                </ul>
                <p className="text-xs text-elec-yellow mt-2">With measures</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-2">TT</p>
                <ul className="text-xs text-white space-y-1">
                  <li>• Independent earthing</li>
                  <li>• RCD mandatory</li>
                  <li>• No PME restrictions</li>
                </ul>
                <p className="text-xs text-green-400 mt-2">Preferred for public</p>
              </div>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Selecting Earthing Systems</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Verify existing supply type from DNO documentation</li>
                <li>Assess installation location (indoor/outdoor/public)</li>
                <li>Consider PME restrictions for outdoor installations</li>
                <li>Specify appropriate RCD types (Type A minimum, Type B preferred)</li>
                <li>Document earthing arrangement in installation records</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Ignoring PME restrictions:</strong> — Creates serious shock hazards</li>
                <li><strong>Using Type AC RCDs:</strong> — Non-compliant for EV charging</li>
                <li><strong>No earth electrode test:</strong> — TT systems may fail to disconnect</li>
                <li><strong>Inadequate bonding:</strong> — Touch voltages exceed safe limits</li>
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
                <p className="text-sm text-white leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Reference */}
        <div className="mt-6 p-5 rounded-lg bg-transparent border border-white/10">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">System Selection</p>
              <ul className="space-y-0.5">
                <li>TT: Public/outdoor charging</li>
                <li>TN-S: Private/commercial</li>
                <li>TN-C-S: With PME measures</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Key Regulations</p>
              <ul className="space-y-0.5">
                <li>722.411.4.1: PME restrictions</li>
                <li>722.531.2: RCD requirements</li>
                <li>Table 41.1: Disconnection times</li>
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
            <Link to="/study-centre/upskilling/ev-charging-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/ev-charging-module-4-section-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EVChargingModule4Section1;