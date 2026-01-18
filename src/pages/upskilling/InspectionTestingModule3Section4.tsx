import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import UnitsPocketCard from "@/components/apprentice-courses/UnitsPocketCard";
import useSEO from "@/hooks/useSEO";

const TITLE = "Supplementary Bonding Verification - Module 3 Section 4";
const DESCRIPTION = "Learn supplementary bonding requirements, testing methods, and compliance verification for special locations.";

const quickCheckQuestions = [
  {
    id: "supp-bonding-purpose",
    question: "What is the primary purpose of supplementary bonding?",
    options: [
      "To provide the main earth connection",
      "To create a local equipotential zone",
      "To protect against overcurrent",
      "To test insulation resistance"
    ],
    correctIndex: 1,
    explanation: "Supplementary bonding creates a local equipotential zone by connecting all simultaneously accessible conductive parts, reducing touch voltage during faults."
  },
  {
    id: "supp-bonding-formula",
    question: "For a 30mA RCD, what is the maximum permissible resistance between bonded parts?",
    options: [
      "50Ω",
      "500Ω",
      "1667Ω",
      "16670Ω"
    ],
    correctIndex: 2,
    explanation: "R ≤ 50V ÷ 0.03A = 1667Ω. This is the calculated maximum, though good connections will measure much lower."
  },
  {
    id: "supp-bonding-size",
    question: "What minimum conductor size is required for supplementary bonding if mechanically protected?",
    options: [
      "1.5mm²",
      "2.5mm²",
      "4mm²",
      "6mm²"
    ],
    correctIndex: 1,
    explanation: "Per BS 7671 Table 54.8, minimum 2.5mm² if mechanically protected, 4mm² if not mechanically protected."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What formula determines supplementary bonding compliance?",
    options: ["R ≤ 50V × Ia", "R ≤ 50V ÷ Ia", "R ≤ 230V ÷ Ia", "R ≤ Ia × Zs"],
    correctAnswer: 1,
    explanation: "The resistance must satisfy R ≤ 50V ÷ Ia, where Ia is the operating current of the protective device (typically RCD trip current)."
  },
  {
    id: 2,
    question: "For a 30mA RCD, what is the maximum permissible supplementary bonding resistance?",
    options: ["50Ω", "167Ω", "1667Ω", "16670Ω"],
    correctAnswer: 2,
    explanation: "R ≤ 50V ÷ 0.03A = 1667Ω. However, practical connections should be much lower than this maximum."
  },
  {
    id: 3,
    question: "What is the minimum supplementary bonding conductor size if mechanically protected?",
    options: ["1.5mm²", "2.5mm²", "4mm²", "6mm²"],
    correctAnswer: 1,
    explanation: "Per BS 7671 Table 54.8, minimum 2.5mm² if mechanically protected, 4mm² if not mechanically protected."
  },
  {
    id: 4,
    question: "Which of these does NOT typically require supplementary bonding in a bathroom?",
    options: ["Metal water pipes", "Plastic waste pipes", "Metal bath", "Radiator"],
    correctAnswer: 1,
    explanation: "Plastic pipes are not extraneous-conductive-parts and do not require bonding. Only metallic parts that could introduce a potential need bonding."
  },
  {
    id: 5,
    question: "Under what conditions can supplementary bonding be omitted from a bathroom?",
    options: [
      "If the installation is less than 5 years old",
      "If all circuits are RCD-protected and main bonding is in place",
      "If SELV lighting is used",
      "It can never be omitted"
    ],
    correctAnswer: 1,
    explanation: "Regulation 701.415.2 permits omission if automatic disconnection requirements are met, all circuits have ≤30mA RCD protection, and main protective bonding is effective."
  },
  {
    id: 6,
    question: "What instrument is used for supplementary bonding tests?",
    options: ["Insulation resistance tester", "Earth fault loop impedance tester", "Low-resistance ohmmeter", "RCD tester"],
    correctAnswer: 2,
    explanation: "A low-resistance ohmmeter measures the small resistances in bonding conductors, typically giving readings in milliohms."
  },
  {
    id: 7,
    question: "What does 'simultaneously accessible' mean for bonding?",
    options: [
      "Parts that can be seen at the same time",
      "Parts that can be touched at the same time",
      "Parts in the same room",
      "Parts on the same circuit"
    ],
    correctAnswer: 1,
    explanation: "Simultaneously accessible means parts that could be touched at the same time, creating a potential shock hazard if at different potentials."
  },
  {
    id: 8,
    question: "The supplementary bonding conductor size must be at least:",
    options: [
      "Equal to the circuit CPC",
      "Half the circuit CPC (min 2.5mm²)",
      "Quarter the circuit CPC",
      "Same as the phase conductor"
    ],
    correctAnswer: 1,
    explanation: "The supplementary bonding conductor must be not less than half the CPC, with an absolute minimum of 2.5mm² (protected) or 4mm² (unprotected)."
  },
  {
    id: 9,
    question: "In zone 1 of a bathroom, which bonding connection method is NOT acceptable?",
    options: ["BS 951 clamp", "Compression fitting", "Solder joint", "Mechanical connector"],
    correctAnswer: 2,
    explanation: "Soldered connections are not acceptable for protective bonding as the solder could melt under fault conditions, compromising the protective connection."
  },
  {
    id: 10,
    question: "What reading would typically indicate a good supplementary bonding connection?",
    options: ["<1Ω", "<100Ω", "<500Ω", "<1667Ω"],
    correctAnswer: 0,
    explanation: "While the formula allows up to 1667Ω for a 30mA RCD, practical bonding connections should be <1Ω, indicating sound metallic connections throughout."
  }
];

const faqs = [
  {
    question: "When is supplementary bonding required?",
    answer: "Required in special locations like bathrooms (zones 1-3), swimming pools, saunas, and any location where BS 7671 specifies increased shock risk protection. Also needed where automatic disconnection times cannot be achieved."
  },
  {
    question: "What parts need supplementary bonding in a bathroom?",
    answer: "All accessible extraneous-conductive-parts: metallic pipes (hot/cold water, gas), radiators, metal baths, exposed metallic structural parts, and any Class I equipment. CPCs of circuits serving the location must also be included."
  },
  {
    question: "What resistance value indicates compliance?",
    answer: "The resistance between any two simultaneously accessible parts must satisfy: R ≤ 50V ÷ Ia. For a 30mA RCD, this gives R ≤ 50/0.03 = 1667Ω. In practice, much lower values (typically <1Ω) indicate good connections."
  },
  {
    question: "Can supplementary bonding be omitted from bathrooms?",
    answer: "Yes, under Regulation 701.415.2, supplementary bonding can be omitted if: (a) all circuits comply with automatic disconnection requirements, (b) all circuits are RCD-protected at ≤30mA, and (c) all extraneous-conductive-parts are effectively connected to the protective equipotential bonding."
  },
  {
    question: "How do you test supplementary bonding?",
    answer: "Use a low-resistance ohmmeter. Connect between the CPC at the local distribution point and each extraneous-conductive-part requiring bonding. Also test between simultaneously accessible parts. Resistance should be very low (<1Ω typically)."
  },
  {
    question: "What size conductor is required for supplementary bonding?",
    answer: "Per BS 7671 Table 54.8: minimum 2.5mm² if mechanically protected, 4mm² if not. The CSA must be not less than half the CPC of the circuit, with a minimum of 2.5mm²."
  }
];

const InspectionTestingModule3Section4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/inspection-testing-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 3.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Supplementary Bonding Verification
          </h1>
          <p className="text-white/80">
            Understanding when supplementary bonding is required and how to test for compliance
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Purpose:</strong> Local equipotential zone in special locations</li>
              <li><strong>Formula:</strong> R ≤ 50V ÷ Ia (device operating current)</li>
              <li><strong>30mA RCD:</strong> Max 1667Ω, practical {"<"}1Ω</li>
              <li><strong>Minimum:</strong> 2.5mm² protected, 4mm² unprotected</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Missing bonding in bathrooms, broken connections</li>
              <li><strong>Use:</strong> Low-resistance ohmmeter between bonded parts</li>
              <li><strong>Apply:</strong> Bathrooms, pools, saunas, special locations</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand when supplementary bonding is required",
              "Identify which conductive parts need bonding",
              "Measure bonding conductor resistance correctly",
              "Apply the 50V/Ia compliance formula",
              "Document supplementary bonding test results",
              "Verify bonding clamp integrity and connections"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 1: What is Supplementary Bonding? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What is Supplementary Bonding?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              <strong>Supplementary bonding</strong> is an additional protective measure that connects all simultaneously accessible exposed-conductive-parts and extraneous-conductive-parts within a specific location. It creates a local equipotential zone to reduce touch voltage during faults.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10">
              <p className="text-sm font-medium text-blue-400 mb-2">Key Difference from Main Bonding</p>
              <p className="text-sm text-white">
                Main protective bonding connects at the origin of the installation; supplementary bonding provides additional local protection in high-risk areas like bathrooms and swimming pools.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: When is it Required? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            When is it Required?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 7671 requires supplementary bonding in <strong>special locations</strong> where there is increased shock risk:
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Special Locations Requiring Supplementary Bonding:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Bathrooms - Section 701</li>
                <li>Swimming pools and fountains - Section 702</li>
                <li>Saunas and steam rooms - Section 703</li>
                <li>Agricultural premises - Section 705</li>
                <li>Medical locations - Section 710</li>
              </ul>
            </div>

            <p className="text-sm text-amber-400/80 italic">
              <strong>Also required:</strong> Where automatic disconnection times cannot be met, or where touch voltage limits require additional protection.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 3: Identifying Parts to Bond */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Identifying Parts to Bond
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="my-6 grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-green-500/10">
                <p className="text-green-400 font-semibold mb-2">Exposed-Conductive-Parts</p>
                <p className="text-sm text-white/70">Parts of equipment that can be touched and may become live under fault conditions (Class I equipment enclosures).</p>
              </div>
              <div className="p-4 rounded-lg bg-blue-500/10">
                <p className="text-blue-400 font-semibold mb-2">Extraneous-Conductive-Parts</p>
                <p className="text-sm text-white/70">Parts not part of the electrical installation that may introduce a potential (metal pipes, structural steelwork, radiators).</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">In a Bathroom:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Metal water pipes (hot and cold)</li>
                <li>Metal gas pipes</li>
                <li>Central heating pipes</li>
                <li>Radiators</li>
                <li>Metal baths</li>
                <li>Metal waste pipes (if metallic)</li>
                <li>CPCs of circuits in the location</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: The Compliance Formula */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            The Compliance Formula
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="my-6 p-4 rounded-lg bg-transparent border border-white/10">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Compliance Formula</p>
              <p className="text-center font-mono text-elec-yellow text-2xl">R ≤ 50V ÷ Ia</p>
              <p className="text-xs text-white/60 text-center mt-2">Where Ia = operating current of protective device</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">For a 30mA RCD:</p>
              <p className="text-white/70 font-mono text-center">R ≤ 50 ÷ 0.03 = 1667Ω</p>
              <p className="text-white/60 text-sm mt-2">
                While 1667Ω is the theoretical maximum, practical connections should measure well under 1Ω, indicating sound metallic continuity throughout the bonding network.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 5: Testing Procedure */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Testing Procedure
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Test Steps:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>1. Isolate:</strong> Isolate the installation safely</li>
                <li><strong>2. Instrument:</strong> Use a low-resistance ohmmeter (not an insulation tester)</li>
                <li><strong>3. CPC Test:</strong> Connect between the CPC at the local distribution point and each bonded part</li>
                <li><strong>4. Cross Test:</strong> Also test between simultaneously accessible parts</li>
                <li><strong>5. Record:</strong> Record all readings - should be {"<"}1Ω typically</li>
                <li><strong>6. Verify:</strong> Verify calculation: R ≤ 50V ÷ Ia</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Expected Results:</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10">
                  <span className="text-white/80 text-sm">Good bonding connection</span>
                  <span className="text-green-400 font-medium">{"<"}1Ω</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10">
                  <span className="text-white/80 text-sm">Maximum for 30mA RCD</span>
                  <span className="text-green-400 font-medium">1667Ω</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-amber-500/10">
                  <span className="text-white/80 text-sm">High readings</span>
                  <span className="text-amber-400 font-medium">Investigate connections</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Omission of Supplementary Bonding */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Omission of Supplementary Bonding
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              <strong>Regulation 701.415.2</strong> permits omission of supplementary bonding in bathrooms when ALL conditions are met:
            </p>

            <div className="my-6">
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><CheckCircle className="h-4 w-4 text-green-400 inline mr-2" />All circuits comply with automatic disconnection requirements</li>
                <li><CheckCircle className="h-4 w-4 text-green-400 inline mr-2" />All circuits are protected by a 30mA (or less) RCD</li>
                <li><CheckCircle className="h-4 w-4 text-green-400 inline mr-2" />Main protective bonding is in place and effective</li>
                <li><CheckCircle className="h-4 w-4 text-green-400 inline mr-2" />All extraneous-conductive-parts are reliably connected to the protective bonding</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Important</p>
              <p className="text-sm text-white">
                Even when omitted, you must verify main bonding is effective and document your reasoning on the certificate.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Top Tips</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Use BS 951 clamps - proper earthing clamps ensure reliable connections</li>
                <li>Never use soldered joints for protective bonding</li>
                <li>Check for plastic inserts in modern plumbing - don't assume metal pipes are continuous</li>
                <li>Test continuity even if bonding appears to be in place</li>
                <li>Apply "SAFETY ELECTRICAL CONNECTION - DO NOT REMOVE" labels to all bonding connections</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Using soldered connections</strong> - may melt under fault conditions</li>
                <li><strong>Forgetting CPCs</strong> - circuits in the location need including</li>
                <li><strong>Assuming plastic is throughout</strong> - check for metal sections</li>
                <li><strong>Missing accessible parts</strong> - check under baths, behind panels</li>
                <li><strong>Not documenting omission reasoning</strong> - must record why omitted</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key References</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>BS 7671:</strong> Section 415 - Additional protection by supplementary bonding</li>
                <li><strong>Regulation 701.415:</strong> Bathrooms supplementary bonding</li>
                <li><strong>Table 54.8:</strong> Minimum protective conductor sizes</li>
                <li><strong>GN3:</strong> Supplementary bonding testing guidance</li>
              </ul>
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

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Reference Cards */}
        <section className="mb-10">
          <UnitsPocketCard />

          <div className="mt-6 p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Supplementary Bonding Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Compliance</p>
                <ul className="space-y-0.5">
                  <li>Formula: R ≤ 50V ÷ Ia</li>
                  <li>30mA RCD: Max 1667Ω</li>
                  <li>Practical: {"<"}1Ω expected</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Conductor Sizes</p>
                <ul className="space-y-0.5">
                  <li>Protected: Min 2.5mm²</li>
                  <li>Unprotected: Min 4mm²</li>
                  <li>Half of circuit CPC minimum</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-5">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default InspectionTestingModule3Section4;
