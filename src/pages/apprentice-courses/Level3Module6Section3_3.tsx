/**
 * Level 3 Module 6 Section 3.3 - Correction Factors
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Correction Factors - Level 3 Module 6 Section 3.3";
const DESCRIPTION = "Master cable correction factors Ca, Cg, Ci for ambient temperature, grouping, and thermal insulation. Learn BS 7671 Appendix 4 tables and calculation methods.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What correction factor applies at 40C ambient temperature for 70C PVC cable?",
    options: ["1.0", "0.87", "0.79", "0.94"],
    correctIndex: 1,
    explanation: "From Table 4B1, at 40C ambient for 70C thermoplastic cable, Ca = 0.87. Higher ambient means less temperature difference available for heat dissipation."
  },
  {
    id: "check-2",
    question: "Four circuits are grouped in conduit. What is the grouping factor Cg?",
    options: ["1.0", "0.80", "0.65", "0.50"],
    correctIndex: 2,
    explanation: "From Table 4C1, for 4 circuits in conduit, Cg = 0.65. Grouping restricts heat dissipation, requiring cable derating."
  },
  {
    id: "check-3",
    question: "A cable passes through 100mm of thermal insulation. What Ci factor applies?",
    options: ["1.0", "0.89", "0.81", "0.50"],
    correctIndex: 3,
    explanation: "From Table 4A (Regulation 523.9), for cable surrounded by insulation, Ci = 0.50. This severe derating accounts for the insulation preventing heat escape."
  },
  {
    id: "check-4",
    question: "Protection is by BS 3036 semi-enclosed fuse. What additional factor applies?",
    options: ["No additional factor", "Cc = 0.725", "Cc = 0.80", "Cc = 1.0"],
    correctIndex: 1,
    explanation: "BS 3036 rewireable fuses have poor discrimination characteristics. A factor Cc = 0.725 must be applied to prevent fuse-wire damage during small overloads."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The formula It >= In / (Ca x Cg x Ci) is used to find:",
    options: ["The design current", "The minimum tabulated current rating", "The voltage drop", "The earth fault loop impedance"],
    correctAnswer: 1,
    explanation: "This formula calculates the minimum tabulated current (It) needed from the cable tables to ensure the cable has adequate capacity after correction factors are applied."
  },
  {
    id: 2,
    question: "At 35C ambient, what is Ca for 70C PVC cable?",
    options: ["0.94", "0.87", "0.79", "1.0"],
    correctAnswer: 0,
    explanation: "From Table 4B1, at 35C ambient for 70C thermoplastic cable, Ca = 0.94. Only 5C above reference, so minor derating."
  },
  {
    id: 3,
    question: "A 32A circuit with Ca=0.87, Cg=0.80, Ci=1.0. What minimum It is needed?",
    options: ["32A", "37A", "46A", "52A"],
    correctAnswer: 2,
    explanation: "It >= 32 / (0.87 x 0.80 x 1.0) = 32 / 0.696 = 45.98A. Round up to 46A minimum."
  },
  {
    id: 4,
    question: "Why does higher ambient temperature reduce cable capacity?",
    options: ["Increases cable resistance", "Reduces temperature difference available for heat dissipation", "Damages insulation", "Expands conductors"],
    correctAnswer: 1,
    explanation: "Cable must not exceed maximum conductor temperature (70C for PVC). Higher ambient means less room between ambient and maximum, so less heat can be dissipated."
  },
  {
    id: 5,
    question: "Two touching single-core cables on cable tray have what grouping factor?",
    options: ["1.0", "0.88", "0.79", "0.65"],
    correctAnswer: 1,
    explanation: "From Table 4C4, two touching single-core cables have Cg = 0.88. They share some heat, reducing individual capacity."
  },
  {
    id: 6,
    question: "What is the grouping factor for a single circuit (not grouped)?",
    options: ["0.5", "0.8", "0.9", "1.0"],
    correctAnswer: 3,
    explanation: "A single circuit not grouped with others has Cg = 1.0 (no derating needed). The tables assume single circuit as reference."
  },
  {
    id: 7,
    question: "Cable clipped to ceiling with 50mm thermal insulation above. What derating applies?",
    options: ["0.50 (full insulation)", "0.89 (partial)", "1.0 (no effect)", "0.65 (severe)"],
    correctAnswer: 1,
    explanation: "For less than 100mm thickness of insulation on one side only, Ci = 0.89 (Table 4A). Cable can still dissipate some heat from exposed side."
  },
  {
    id: 8,
    question: "A boiler room has 45C ambient. What Ca applies for PVC cable?",
    options: ["0.94", "0.87", "0.79", "0.71"],
    correctAnswer: 2,
    explanation: "From Table 4B1, at 45C for 70C PVC cable, Ca = 0.79. High ambient significantly reduces capacity."
  },
  {
    id: 9,
    question: "Six circuits in trunking - what is the grouping factor?",
    options: ["0.57", "0.54", "0.52", "0.50"],
    correctAnswer: 0,
    explanation: "From Table 4C1, for 6 circuits in conduit/trunking, Cg = 0.57. More circuits grouped = more mutual heating = lower factor."
  },
  {
    id: 10,
    question: "Which factor is NOT needed if using MCBs instead of BS 3036 fuses?",
    options: ["Ca (ambient)", "Cg (grouping)", "Ci (insulation)", "Cc (semi-enclosed fuse)"],
    correctAnswer: 3,
    explanation: "Cc = 0.725 only applies when using BS 3036 semi-enclosed fuses. MCBs don't need this factor as they have better overcurrent characteristics."
  }
];

const faqs = [
  { question: "Do I multiply or divide by correction factors?", answer: "To find minimum It needed: divide In by the factors. To find actual Iz from It: multiply It by the factors. Formula: It >= In / (Ca x Cg x Ci)." },
  { question: "What if only part of the cable route is affected by a factor?", answer: "The worst condition along the route determines the factor. If only a short section is in insulation, consider Regulation 523.9 for reduced derating." },
  { question: "Can I use 90C cables to avoid derating?", answer: "Yes, 90C thermosetting cables have more thermal headroom. They derate less at high ambient temperatures. Use Tables 4B2 for 90C cable factors." },
  { question: "What about cables in high ambient from other heat sources?", answer: "The ambient temperature used should be the actual local temperature, including any heat from nearby equipment, processes, or other cables." }
];

const Level3Module6Section3_3 = () => {
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
        

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Ca:</strong> Ambient temperature - Table 4B1/4B2</li>
              <li><strong>Cg:</strong> Grouping - Tables 4C1-4C5</li>
              <li><strong>Ci:</strong> Thermal insulation - Table 4A</li>
              <li><strong>Formula:</strong> It &gt;= In / (Ca x Cg x Ci)</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Cable sizing calculations, design documentation</li>
              <li><strong>Use:</strong> Adjust tabulated ratings for actual conditions</li>
              <li><strong>Apply:</strong> Every cable sizing where conditions differ from reference</li>
            </ul>
          </div>
        </div>

        

        

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3"><span className="text-elec-yellow/80 text-sm font-normal">01</span>Ambient Temperature (Ca)</h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Cable ratings assume 30C ambient for cables in air. When actual temperature is higher, the cable cannot dissipate as much heat, reducing capacity. Table 4B1 provides factors for 70C PVC cables, Table 4B2 for 90C thermosetting.</p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common Ca Values (70C PVC cable):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>25C: 1.03 (cooler than reference - slight increase)</li>
                <li>30C: 1.00 (reference condition)</li>
                <li>35C: 0.94</li>
                <li>40C: 0.87</li>
                <li>45C: 0.79</li>
                <li>50C: 0.71</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3"><span className="text-elec-yellow/80 text-sm font-normal">02</span>Grouping Factor (Cg)</h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>When cables are grouped together, they share heat and each cable cannot dissipate as effectively. Tables 4C1-4C5 provide grouping factors for different arrangements.</p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Cg from Table 4C1 (Circuits in Conduit/Trunking):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>1 circuit: 1.00</li>
                <li>2 circuits: 0.80</li>
                <li>3 circuits: 0.70</li>
                <li>4 circuits: 0.65</li>
                <li>5 circuits: 0.60</li>
                <li>6 circuits: 0.57</li>
                <li>9 circuits: 0.50</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3"><span className="text-elec-yellow/80 text-sm font-normal">03</span>Thermal Insulation (Ci)</h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Thermal insulation prevents heat escaping from cables, severely reducing capacity. Regulation 523.9 and Table 4A provide guidance.</p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Thermal Insulation Factors:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Cable surrounded by insulation: Ci = 0.50</li>
                <li>One side touching insulation (50mm+): Ci = 0.75</li>
                <li>One side touching insulation (&lt;50mm): Reduced derating per 523.9</li>
                <li>Not touching insulation: Ci = 1.00</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3"><span className="text-elec-yellow/80 text-sm font-normal">04</span>Semi-enclosed Fuse Factor (Cc)</h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>BS 3036 semi-enclosed (rewireable) fuses have poor overcurrent characteristics. To prevent fuse-wire damage, an additional factor of 0.725 applies.</p>
            <p>The formula with all factors: It &gt;= In / (Ca x Cg x Ci x Cc)</p>
            <p className="text-sm text-elec-yellow/70"><strong>Note:</strong> Cc only applies when protection is by BS 3036 fuses. For MCBs, RCBOs, or cartridge fuses, Cc = 1.0 (no additional derating).</p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Worked Example</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Circuit: 32A MCB protection</li>
                <li>Ambient: 35C (Ca = 0.94)</li>
                <li>Grouping: 4 circuits (Cg = 0.65)</li>
                <li>Insulation: Not applicable (Ci = 1.0)</li>
                <li>It &gt;= 32 / (0.94 x 0.65 x 1.0) = 32 / 0.611 = 52.4A</li>
                <li>Select cable with tabulated rating &gt;= 53A</li>
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
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference - Correction Factors</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Ca - Ambient (70C PVC)</p>
                <ul className="space-y-0.5">
                  <li>30C: 1.00 | 35C: 0.94</li>
                  <li>40C: 0.87 | 45C: 0.79</li>
                  <li>50C: 0.71 | 55C: 0.61</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Cg - Grouping (Conduit)</p>
                <ul className="space-y-0.5">
                  <li>1: 1.00 | 2: 0.80 | 3: 0.70</li>
                  <li>4: 0.65 | 5: 0.60 | 6: 0.57</li>
                  <li>7: 0.54 | 8: 0.52 | 9: 0.50</li>
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
            <Link to="/study-centre/apprentice/level3-module6-section3-2"><ArrowLeft className="w-4 h-4 mr-2" />Back: Current Capacity</Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold" asChild>
            <Link to="/study-centre/apprentice/level3-module6-section3-4">Next: Grouping & Thermal<ArrowLeft className="w-4 h-4 ml-2 rotate-180" /></Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default Level3Module6Section3_3;
