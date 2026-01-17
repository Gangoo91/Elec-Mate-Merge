import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "datacabling-m3s3-check1",
    question: "What is the typical insertion loss for a good fusion splice?",
    options: ["~0.8 dB", "~0.5 dB", "~0.1 dB", "~0.05 dB"],
    correctIndex: 3,
    explanation: "A well-executed fusion splice typically achieves ~0.05 dB loss, making it the lowest-loss joining method available."
  },
  {
    id: "datacabling-m3s3-check2",
    question: "What is the target cleave angle for fusion splicing?",
    options: ["<5°", "<2°", "<0.5°", "<10°"],
    correctIndex: 2,
    explanation: "Poor cleave angles increase splice loss and reflections. The target for fusion splicing is <0.5° for optimal results."
  },
  {
    id: "datacabling-m3s3-check3",
    question: "Which item is essential for safe fibre handling?",
    options: ["PVC gloves", "Magnet tray", "Fibre disposal container", "Soldering mat"],
    correctIndex: 2,
    explanation: "Fibre shards are extremely dangerous - they can penetrate skin and are nearly invisible. Always use a designated disposal container."
  }
];

const faqs = [
  {
    question: "When should I choose fusion splicing over mechanical splicing?",
    answer: "Fusion splicing is preferred when lowest loss is required (0.05 dB vs 0.2-0.5 dB), for permanent installations, pigtail terminations, and any application where performance is critical. Mechanical splicing is useful for emergency repairs or where fusion equipment isn't available."
  },
  {
    question: "What's the best way to connectorise fibre cables?",
    answer: "Factory-polished pigtails fusion spliced to the cable typically deliver the best performance. While field termination with epoxy and polish can achieve good results, it requires more skill and time. Pre-polished mechanical connectors are fastest but have higher loss."
  },
  {
    question: "How often should I replace the cleaver blade?",
    answer: "Follow manufacturer schedules, typically rotating blade positions after a set number of cleaves. A dull blade produces poor cleave angles and increases splice loss. Most precision cleavers have multiple blade positions before replacement is needed."
  },
  {
    question: "Can I re-use heat shrink splice protectors?",
    answer: "No, heat shrink protectors are single-use. Once heated to protect a splice, they cannot be reliably reused. Always have adequate spare protectors on site - typically 20% more than expected splice count."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A client requires the lowest-loss connectorisation method for a singlemode backbone. What should you recommend?",
  options: [
    "No-epoxy/no-polish mechanical connectors",
    "Epoxy and polish field terminations",
    "Pre-terminated pigtail fusion splice",
    "Cold-cure crimp style connectors"
  ],
  correctAnswer: 2,
  explanation: "Factory-polished pigtails fusion spliced to the cable typically deliver the best and most consistent performance. The fusion splice adds only ~0.05 dB, and the factory-polished connector ensures optimal end-face quality."
  }
];

const DataCablingModule3Section3 = () => {
  useSEO({
    title: "Cleaving, Splicing and Connectorisation | Data Cabling Module 3.3",
    description: "Learn fibre cleaving, fusion and mechanical splicing techniques, and connectorisation methods with quality targets and safety practices."
  });

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
            <Link to="/study-centre/upskilling/data-cabling-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 3
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 3.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Cleaving, Splicing and Connectorisation
          </h1>
          <p className="text-white/80">
            Reliable fibre joining methods and quality targets
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Fusion splice:</strong> ~0.05 dB, permanent, best quality</li>
              <li><strong>Mechanical splice:</strong> 0.2-0.5 dB, quick, field repairs</li>
              <li><strong>Cleave angle:</strong> &lt;0.5° for fusion splicing</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Splice trays with heat-shrink protectors</li>
              <li><strong>Use:</strong> Fusion pigtails for best connector performance</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Prepare fibre and achieve near-perfect cleaves",
              "Perform fusion and mechanical splicing",
              "Choose appropriate connectorisation methods",
              "Inspect and verify joint quality",
              "Apply safe working practices",
              "Meet quality targets for each method"
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
            Cleaving Essentials
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The cleave is the foundation of a good splice or connector. A clean, perpendicular
              end-face with minimal angle is essential for low-loss joints.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cleaving Procedure</p>
                <ul className="text-sm text-white space-y-1">
                  <li>1. Strip primary coating to specified length</li>
                  <li>2. Clean fibre with lint-free wipe and IPA</li>
                  <li>3. Place fibre in cleaver with correct length stop</li>
                  <li>4. Actuate blade in one smooth motion</li>
                  <li>5. Inspect end-face; re-cleave if chipped</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Quality Targets</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Cleave angle:</strong> &lt;0.5° for fusion</li>
                  <li><strong>End-face:</strong> Mirror finish, no chips</li>
                  <li><strong>Length:</strong> Consistent strip lengths</li>
                  <li><strong>Cleanliness:</strong> No contamination</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Strip</p>
                <p className="text-white/90 text-xs">Remove coating</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Clean</p>
                <p className="text-white/90 text-xs">IPA + lint-free</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Cleave</p>
                <p className="text-white/90 text-xs">&lt;0.5° angle</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Splicing Methods
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Choose the splicing method based on performance targets, environment, and available
              equipment. Fusion splicing provides the lowest loss for permanent installations.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fusion Splice</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Typical loss: 0.05-0.1 dB</li>
                  <li>Lowest loss and reflection</li>
                  <li>Requires fusion splicer</li>
                  <li>Ideal for pigtail connectorisation</li>
                  <li>Permanent installation</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Mechanical Splice</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Typical loss: 0.2-0.5 dB</li>
                  <li>No arc equipment required</li>
                  <li>Quick field repairs</li>
                  <li>Requires careful alignment</li>
                  <li>Index-matching gel used</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Quality Targets:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Fusion splice:</strong> ≤0.1 dB (typical 0.05 dB)</li>
                <li><strong>Mechanical splice:</strong> 0.2-0.5 dB</li>
                <li><strong>Return loss:</strong> ≥50 dB (UPC), ≥60 dB (APC)</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Connectorisation Options
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Three main approaches to achieving connectorised fibre ends, each with different
              performance characteristics and installation requirements.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Connectorisation Methods:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Fusion Pigtail:</strong> Best performance, requires splice trays</li>
                <li><strong>Epoxy & Polish:</strong> Good results with skill, labour intensive</li>
                <li><strong>No-Epoxy/No-Polish:</strong> Fast but higher loss, temporary use</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Essential Toolkit</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Fibre stripper and cleaver</li>
                  <li>Isopropyl alcohol and wipes</li>
                  <li>Fusion splicer or mechanical kit</li>
                  <li>Heat-shrink protectors and trays</li>
                  <li>Visual fault locator and power meter</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Safe Working (UK)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Use PPE and shard containers</li>
                  <li>Maintain segregation from LV (BS7671)</li>
                  <li>Keep bend radius per datasheet</li>
                  <li>Never look into live fibres</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Splice Tray Management</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Plan fibre order to match panel mapping</li>
                <li>Route loose tubes with radius limiters</li>
                <li>Apply heat-shrink protection sleeves</li>
                <li>Lash fibres neatly; avoid crossing</li>
                <li>Label trays, cassettes and ports consistently</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Poor cleaves:</strong> — Causes high splice loss</li>
                <li><strong>Dirty fibres:</strong> — Contamination degrades joints</li>
                <li><strong>Improper shard disposal:</strong> — Safety hazard</li>
                <li><strong>Skipping inspection:</strong> — Quality issues go undetected</li>
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
              <p className="font-medium text-white mb-1">Splice Loss Targets</p>
              <ul className="space-y-0.5">
                <li>Fusion: ≤0.1 dB (typ. 0.05)</li>
                <li>Mechanical: 0.2-0.5 dB</li>
                <li>Cleave angle: &lt;0.5°</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Safety Essentials</p>
              <ul className="space-y-0.5">
                <li>Shard disposal container</li>
                <li>Never look into live fibre</li>
                <li>PPE and proper ventilation</li>
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
            <Link to="/study-centre/upskilling/data-cabling-module-3-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/data-cabling-module-3-section-4">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default DataCablingModule3Section3;