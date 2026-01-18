import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "UTP, FTP, STP Explained | Data Cabling Module 2.2";
const DESCRIPTION = "Understand cable shielding types including UTP, FTP, and STP, with grounding requirements and EMI mitigation strategies.";

const quickCheckQuestions = [
  {
    id: "datacabling-m2s2-check1",
    question: "What does UTP stand for?",
    options: [
      "Universal Twisted Pair",
      "Unshielded Twisted Pair",
      "Ultra Transmission Protocol",
      "Unified Termination Process"
    ],
    correctIndex: 1,
    explanation: "UTP stands for Unshielded Twisted Pair - cable that relies solely on the twisting of wire pairs for EMI protection, without additional metallic shielding."
  },
  {
    id: "datacabling-m2s2-check2",
    question: "What is the primary requirement for shielded cable installations?",
    options: [
      "Higher quality connectors",
      "Proper grounding at both ends",
      "Longer cable lengths",
      "Larger conduit sizes"
    ],
    correctIndex: 1,
    explanation: "Shielded cables require proper grounding at both ends to effectively drain noise. Without proper grounding, the shield can actually worsen interference by acting as an antenna."
  },
  {
    id: "datacabling-m2s2-check3",
    question: "In the cable designation F/UTP, what does the F represent?",
    options: [
      "Fibre optic",
      "Flexible",
      "Foil (overall shield)",
      "Frequency rated"
    ],
    correctIndex: 2,
    explanation: "In ISO/IEC cable designations, F represents foil shielding. F/UTP means an overall foil shield around unshielded twisted pairs."
  }
];

const faqs = [
  {
    question: "How do I know if I need shielded cables in my environment?",
    answer: "Conduct an EMI assessment. Look for electrical equipment like motors, VFDs, welding machines, or heavy machinery. If you can hear electrical humming, see fluorescent lights flickering, or have experienced network issues near electrical equipment, consider shielded cables. A simple EMI meter can help quantify interference levels."
  },
  {
    question: "Can I use FTP cable with standard unshielded patch panels?",
    answer: "No, this breaks the shield continuity and negates the EMI protection. All components in the channel must be shielded - cables, connectors, patch panels, and outlets. The shield must be continuous from end to end with proper termination."
  },
  {
    question: "What's the difference between F/UTP and S/FTP cable designations?",
    answer: "F/UTP means foiled/unshielded twisted pair (overall foil shield only). S/FTP means screened/foiled twisted pair (individual pair shields plus overall screen). The format is (overall shield)/(pair shield)TP, where F=foil, S=braid screen, U=unshielded."
  },
  {
    question: "Can I retrofit shielding to an existing UTP installation?",
    answer: "No, you cannot add shielding to existing UTP cables. However, you can selectively upgrade problem areas to shielded cables whilst keeping UTP in clean environments. This hybrid approach can be cost-effective when properly planned and implemented."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A manufacturing plant has VFDs, welding equipment, and large motors near network cable routes. Which cable type is most appropriate?",
  options: [
    "UTP with careful routing",
    "F/UTP with overall foil shield",
    "S/FTP with individual pair shields and overall braid",
    "Standard Cat5e is sufficient"
  ],
  correctAnswer: 2,
  explanation: "S/FTP provides the highest level of EMI protection with both individual pair foil shields and an overall braided screen. Heavy industrial environments with multiple EMI sources require this maximum protection."
  }
];

const DataCablingModule2Section2 = () => {
  useSEO(TITLE, DESCRIPTION);

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
            <Link to="/electrician/upskilling/data-cabling-module-2">
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
            <span>Module 2.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            UTP, FTP, and STP Explained
          </h1>
          <p className="text-white/80">
            Cable shielding types and EMI protection
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>UTP:</strong> No shield, relies on twisting alone</li>
              <li><strong>FTP:</strong> Overall foil shield around all pairs</li>
              <li><strong>STP:</strong> Individual pair shields + overall screen</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Foil visible under jacket, drain wire present</li>
              <li><strong>Use:</strong> Shielded near motors, VFDs, heavy machinery</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify different cable shielding types",
              "Understand ISO/IEC cable designations",
              "Apply shielding selection criteria",
              "Implement proper grounding techniques",
              "Assess EMI environments",
              "Terminate shielded cables correctly"
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
            Unshielded Twisted Pair (UTP)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              UTP is the most common cable type in commercial installations. It relies entirely on
              the twisting of wire pairs to cancel electromagnetic interference and reduce crosstalk.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Advantages</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Lower cost than shielded alternatives</li>
                  <li>Easier to terminate and install</li>
                  <li>No grounding requirements</li>
                  <li>Smaller diameter, more flexible</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Limitations</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Susceptible to high EMI environments</li>
                  <li>Relies on installation quality</li>
                  <li>Alien crosstalk can be significant</li>
                  <li>Not suitable for industrial settings</li>
                </ul>
              </div>
            </div>

            <p>
              UTP performs well in typical office environments with moderate EMI levels. Most commercial
              installations use UTP unless specific interference issues are identified.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Shielded Cable Types
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Shielded cables add metallic barriers to block electromagnetic interference. The ISO/IEC
              designation system identifies shield configurations using a standard format.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">ISO/IEC Designation Format: XX/YTP</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>XX:</strong> Overall shield type (U=none, F=foil, S=braid, SF=both)</li>
                <li><strong>Y:</strong> Individual pair shield (U=none, F=foil)</li>
                <li><strong>TP:</strong> Twisted Pair</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">F/UTP (Foiled UTP)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Overall foil shield</li>
                  <li>Unshielded pairs</li>
                  <li>Good general EMI protection</li>
                  <li>Moderate cost increase</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">S/FTP (Screened FTP)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Overall braid screen</li>
                  <li>Individual pair foil shields</li>
                  <li>Maximum EMI protection</li>
                  <li>Highest cost and complexity</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">U/UTP</p>
                <p className="text-white/90 text-xs">No shields (standard)</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">F/UTP</p>
                <p className="text-white/90 text-xs">Overall foil only</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">S/FTP</p>
                <p className="text-white/90 text-xs">Full shield system</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Grounding and Installation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Shielded cable effectiveness depends entirely on proper grounding. The shield must
              provide a low-impedance path to earth to drain interference currents.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Grounding Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Both ends:</strong> Ground at patch panel and outlet for best results</li>
                <li><strong>Continuous shield:</strong> All components must be shielded and connected</li>
                <li><strong>Drain wire:</strong> Connect to grounding point at termination</li>
                <li><strong>Earth reference:</strong> Connect to building earth system</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Grounding Errors:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Ground loops:</strong> Multiple ground paths at different potentials</li>
                <li><strong>Ungrounded shields:</strong> Shield acts as antenna, worsening noise</li>
                <li><strong>Mixed systems:</strong> Shielded cable with unshielded connectors</li>
                <li><strong>Poor connections:</strong> High-resistance ground bonds</li>
              </ul>
            </div>

            <p>
              In buildings with significant ground potential differences, ground at one end only
              (typically the telecommunications room) to prevent ground loop currents.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When to Use Shielded Cable</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Industrial environments with motors, VFDs, welding</li>
                <li>Near high-power electrical equipment</li>
                <li>Where EMI testing shows interference issues</li>
                <li>For alien crosstalk control in dense installations</li>
                <li>When specified by design requirements</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Ungrounded shields:</strong> — Creates worse interference than UTP</li>
                <li><strong>Mixed components:</strong> — Shielded cable with UTP jacks</li>
                <li><strong>Ground loops:</strong> — Multiple grounds at different potentials</li>
                <li><strong>Over-specification:</strong> — Shielded cable where UTP suffices</li>
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
              <p className="font-medium text-white mb-1">Cable Designations</p>
              <ul className="space-y-0.5">
                <li>U/UTP: Unshielded (standard)</li>
                <li>F/UTP: Overall foil</li>
                <li>S/FTP: Braid + pair foils</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Grounding Rules</p>
              <ul className="space-y-0.5">
                <li>Ground all shields properly</li>
                <li>Maintain shield continuity</li>
                <li>Avoid ground loops</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <section className="mb-10 mt-12">
          <Quiz
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
            <Link to="/electrician/upskilling/data-cabling-module-2-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician/upskilling/data-cabling-module-2-section-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default DataCablingModule2Section2;