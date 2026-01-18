/**
 * Level 3 Module 6 Section 3.4 - Grouping and Thermal Effects
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Grouping and Thermal Effects - Level 3 Module 6 Section 3.4";
const DESCRIPTION = "Understand cable grouping effects and thermal considerations in electrical design. Learn to apply grouping factors from BS 7671 Tables 4C1-4C5 for conduit, trunking, and cable tray installations.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "Why do grouped cables need to be derated?",
    options: ["They are harder to install", "Each cable generates heat that affects neighbouring cables", "The insulation quality reduces", "Copper becomes less conductive"],
    correctIndex: 1,
    explanation: "Each current-carrying cable generates heat. When grouped, cables cannot dissipate heat as effectively because they are surrounded by other warm cables instead of cooler air."
  },
  {
    id: "check-2",
    question: "Three circuits in conduit have grouping factor of:",
    options: ["0.50", "0.65", "0.70", "0.80"],
    correctIndex: 2,
    explanation: "From Table 4C1, three circuits enclosed in conduit or trunking have a grouping factor (Cg) of 0.70."
  },
  {
    id: "check-3",
    question: "Which arrangement gives the highest current capacity for grouped cables?",
    options: ["Touching in conduit", "Spaced apart on perforated tray", "Bunched on solid tray", "Enclosed in trunking"],
    correctIndex: 1,
    explanation: "Cables spaced apart on perforated cable tray allow maximum air circulation around each cable, giving highest capacity. Enclosed methods restrict airflow."
  },
  {
    id: "check-4",
    question: "If not all circuits carry full load simultaneously, what may be applied?",
    options: ["Larger protective devices", "Reduced grouping factor", "Load factor adjustment to grouping", "No change needed"],
    correctIndex: 2,
    explanation: "BS 7671 Note 2 to Table 4C1 allows reduced grouping factors if cables don't all carry full load simultaneously. This requires careful assessment of actual loading."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Table 4C1 applies to cables installed in which arrangement?",
    options: ["On cable tray spaced", "Direct in ground", "In conduit, trunking, or ducting", "In free air"],
    correctAnswer: 2,
    explanation: "Table 4C1 provides grouping factors for cables enclosed in conduit, cable ducting, or trunking, whether clipped to a surface or not."
  },
  {
    id: 2,
    question: "What is the grouping factor for 5 circuits in conduit?",
    options: ["0.70", "0.65", "0.60", "0.57"],
    correctAnswer: 2,
    explanation: "From Table 4C1, five circuits in conduit have Cg = 0.60."
  },
  {
    id: 3,
    question: "Six single-core cables touching on cable tray. What grouping applies?",
    options: ["Use Table 4C1", "Use Table 4C4", "No grouping needed", "Use Table 4C3"],
    correctAnswer: 1,
    explanation: "Table 4C4 provides grouping factors for single-core cables laid touching in one layer on cable tray or cleats."
  },
  {
    id: 4,
    question: "What does 'one circuit' mean for grouping calculation purposes?",
    options: ["One cable only", "One phase only", "All conductors of one circuit including neutral", "One MCB way"],
    correctAnswer: 2,
    explanation: "One circuit includes all live conductors of that circuit. For single-phase, this is L and N. For three-phase, this is L1, L2, L3 (and N if used). The CPC is not counted."
  },
  {
    id: 5,
    question: "A cable tray has circuits spaced at least one cable diameter apart. What grouping factor applies?",
    options: ["0.65", "0.80", "0.90", "1.0"],
    correctAnswer: 3,
    explanation: "Cables spaced at least one cable diameter apart are considered as single circuits for grouping purposes (Cg = 1.0) as each can dissipate heat independently."
  },
  {
    id: 6,
    question: "Nine circuits bunched in conduit have grouping factor of:",
    options: ["0.38", "0.45", "0.50", "0.54"],
    correctAnswer: 2,
    explanation: "From Table 4C1, nine or more circuits bunched in conduit have Cg = 0.50. This severe derating reflects significant mutual heating."
  },
  {
    id: 7,
    question: "How does thermal resistivity of cable surroundings affect capacity?",
    options: ["No effect", "Higher resistivity = lower capacity", "Higher resistivity = higher capacity", "Only affects voltage drop"],
    correctAnswer: 1,
    explanation: "Higher thermal resistivity means heat is conducted away less easily. This reduces cable capacity. Ground cables particularly affected by soil type."
  },
  {
    id: 8,
    question: "Table 4C4 gives factor 0.79 for four touching single-core cables. This means:",
    options: ["Each cable carries 79% of tabulated rating", "Combined capacity is 79% of total", "Voltage drop is 79%", "Use 79mm2 cable"],
    correctAnswer: 0,
    explanation: "The grouping factor 0.79 means each cable can carry 79% of its tabulated single-circuit rating when four cables are touching on tray."
  },
  {
    id: 9,
    question: "Cables in vertical runs generate more heat because:",
    options: ["Gravity increases current", "Natural convection is restricted at the top", "Insulation degrades faster", "Copper expands vertically"],
    correctAnswer: 1,
    explanation: "In vertical runs, hot air rises and accumulates at the top, reducing the temperature difference for heat transfer from cables at the top of the run."
  },
  {
    id: 10,
    question: "What grouping factor applies to multicore cables on perforated tray touching?",
    options: ["Table 4C1", "Table 4C2", "Table 4C3", "Table 4C4"],
    correctAnswer: 2,
    explanation: "Table 4C3 provides grouping factors for multicore cables installed on perforated cable tray (touching or spaced)."
  }
];

const faqs = [
  { question: "Do I count the CPC when determining number of circuits?", answer: "No. Circuit count includes only live conductors. The CPC carries fault current briefly, not continuous load current, so doesn't contribute significantly to heating." },
  { question: "What if cables are different sizes in the group?", answer: "Apply grouping factor based on total number of circuits. All cables in the group must be derated. The factor applies to each cable's individual rating." },
  { question: "Can I reduce grouping factor if some circuits are lightly loaded?", answer: "Yes, BS 7671 Note 2 to Table 4C1 allows this where not all cables carry full load simultaneously. Requires careful analysis and documentation." },
  { question: "Does grouping factor apply to cables in different conduits side by side?", answer: "Generally no, if conduits are spaced apart. If conduits are touching or very close, some derating may be appropriate based on mutual heating assessment." }
];

const Level3Module6Section3_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5" asChild>
            <Link to="/study-centre/apprentice/level3-module6-section3"><ArrowLeft className="w-4 h-4 mr-2" />Back</Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3"><Zap className="h-4 w-4" /><span>Module 6.3.4</span></div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">Grouping and Thermal Effects</h1>
          <p className="text-white/80">Understanding mutual heating between grouped cables</p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Problem:</strong> Grouped cables share heat, reducing capacity</li>
              <li><strong>Tables:</strong> 4C1 (conduit), 4C3 (tray multicore), 4C4 (tray singles)</li>
              <li><strong>Spacing:</strong> One diameter apart = Cg of 1.0</li>
              <li><strong>9+ circuits:</strong> Cg = 0.50 (severe derating)</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Multiple cables in same containment</li>
              <li><strong>Use:</strong> Apply Cg factor before selecting cable size</li>
              <li><strong>Apply:</strong> Any installation with grouped cables</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {["Explain why grouped cables have reduced capacity", "Select correct grouping table for installation method", "Count circuits correctly for grouping calculations", "Apply grouping factors from BS 7671 tables", "Understand thermal effects on cable capacity", "Design cable routes to minimise grouping derating"].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" /><span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3"><span className="text-elec-yellow/80 text-sm font-normal">01</span>Why Grouping Matters</h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Every current-carrying conductor generates heat due to I2R losses. When cables are grouped together, each cable is surrounded by other warm cables instead of cooler air, reducing its ability to dissipate heat safely.</p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Effects of Grouping:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Reduced temperature difference between cable and surroundings</li>
                <li>Less effective convection and radiation cooling</li>
                <li>Higher conductor operating temperature</li>
                <li>Risk of insulation damage if not derated</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3"><span className="text-elec-yellow/80 text-sm font-normal">02</span>Grouping Tables</h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>BS 7671 provides different grouping tables for different installation arrangements:</p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Table Selection:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Table 4C1:</strong> Circuits in conduit, trunking, or ducting</li>
                <li><strong>Table 4C2:</strong> Cables clipped direct to non-metallic surface</li>
                <li><strong>Table 4C3:</strong> Multicore cables on perforated tray</li>
                <li><strong>Table 4C4:</strong> Single-core cables on tray or cleats</li>
                <li><strong>Table 4C5:</strong> Cables direct in ground or in ducts in ground</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3"><span className="text-elec-yellow/80 text-sm font-normal">03</span>Cable Tray Installations</h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Cable tray offers flexibility in installation. The grouping factor depends on whether cables touch or are spaced, and whether the tray is perforated or solid.</p>
            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Perforated Tray Benefits</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Air can circulate under and around cables</li>
                  <li>Better heat dissipation than solid tray</li>
                  <li>Higher grouping factors possible</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Spacing Benefits</p>
                <ul className="text-sm text-white space-y-1">
                  <li>One diameter space = Cg of 1.0</li>
                  <li>Each cable effectively isolated</li>
                  <li>Maximum current capacity achieved</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3"><span className="text-elec-yellow/80 text-sm font-normal">04</span>Practical Considerations</h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>In practice, several factors can affect the appropriate grouping factor to use:</p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Modifying Factors:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Actual loading:</strong> If circuits don't all carry full load, reduced derating may apply</li>
                <li><strong>Vertical runs:</strong> May need additional consideration due to convection effects</li>
                <li><strong>Horizontal vs vertical spacing:</strong> Affects airflow patterns</li>
                <li><strong>Enclosure ventilation:</strong> Ventilated enclosures improve heat dissipation</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Minimising Grouping Derating</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Use perforated cable tray where possible</li>
                <li>Space cables at least one diameter apart</li>
                <li>Split large groups into smaller separate containment systems</li>
                <li>Use larger containment to allow natural spacing</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Counting CPCs in circuit count (don't)</li>
                <li>Using wrong table for installation method</li>
                <li>Not considering cables added during route</li>
                <li>Ignoring grouping for short bunched sections</li>
              </ul>
            </div>
          </div>
        </section>

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

        <hr className="border-white/5 my-12" />

        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference - Grouping Factors (Table 4C1)</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Circuits in Conduit/Trunking</p>
                <ul className="space-y-0.5">
                  <li>1: 1.00 | 2: 0.80 | 3: 0.70</li>
                  <li>4: 0.65 | 5: 0.60 | 6: 0.57</li>
                  <li>7: 0.54 | 8: 0.52 | 9+: 0.50</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Points</p>
                <ul className="space-y-0.5">
                  <li>Circuit = all live conductors (not CPC)</li>
                  <li>Spaced 1x diameter = Cg 1.0</li>
                  <li>Perforated tray better than solid</li>
                  <li>Touching cables = use grouping factor</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <Quiz title="Test Your Knowledge" questions={quizQuestions} />
        </section>

        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5" asChild>
            <Link to="/study-centre/apprentice/level3-module6-section3-3"><ArrowLeft className="w-4 h-4 mr-2" />Back: Correction Factors</Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold" asChild>
            <Link to="/study-centre/apprentice/level3-module6-section3-5">Next: Cable Sizing<ArrowLeft className="w-4 h-4 ml-2 rotate-180" /></Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default Level3Module6Section3_4;
