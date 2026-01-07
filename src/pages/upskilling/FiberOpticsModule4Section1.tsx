import { useState } from "react";
import { ArrowLeft, Zap, CheckCircle, ChevronDown, Wrench, Scissors, Target, Settings, BookOpen, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Mechanical vs Fusion Splicing - Fiber Optics Technology";
const DESCRIPTION = "Compare mechanical and fusion splicing methods for fibre optics. Learn when to use each technique, their advantages, limitations, and application scenarios.";

const quickCheckQuestions = [
  {
    id: "splicing-qc1",
    question: "Which splicing method permanently joins fibres using an electric arc?",
    options: [
      "Mechanical splicing",
      "Fusion splicing",
      "Connector termination",
      "Crimp splicing"
    ],
    correctIndex: 1,
    explanation: "Fusion splicing uses an electric arc to melt and permanently fuse the fibre ends together, creating the lowest loss and most reliable permanent joint."
  },
  {
    id: "splicing-qc2",
    question: "What is the typical insertion loss of a quality fusion splice?",
    options: [
      "0.5-1.0 dB",
      "0.1-0.5 dB",
      "Less than 0.1 dB",
      "1.0-2.0 dB"
    ],
    correctIndex: 2,
    explanation: "Quality fusion splices typically achieve less than 0.1 dB insertion loss (often 0.02-0.05 dB), significantly lower than mechanical splices."
  },
  {
    id: "splicing-qc3",
    question: "What is the main advantage of mechanical splicing over fusion?",
    options: [
      "Lower loss",
      "No expensive equipment needed",
      "More permanent joint",
      "Better for singlemode"
    ],
    correctIndex: 1,
    explanation: "Mechanical splicing requires simpler, lower-cost tools compared to fusion splicers, making it suitable for emergency repairs and low-volume work."
  }
];

const quizQuestions = [
  {
    question: "What holds the fibres together in a mechanical splice?",
    options: [
      "Welded glass",
      "Index-matching gel and mechanical alignment",
      "Epoxy adhesive only",
      "Heat shrink tubing"
    ],
    correctAnswer: 1
  },
  {
    question: "What is the typical insertion loss for a mechanical splice?",
    options: [
      "Less than 0.1 dB",
      "0.1-0.5 dB",
      "0.5-2.0 dB",
      "Greater than 3 dB"
    ],
    correctAnswer: 1
  },
  {
    question: "Which type of splice is most suitable for permanent backbone installations?",
    options: [
      "Mechanical splice",
      "Fusion splice",
      "Quick connector",
      "They are equally suitable"
    ],
    correctAnswer: 1
  },
  {
    question: "What is required after fusion splicing to protect the splice point?",
    options: [
      "Electrical tape",
      "Fusion splice protector/heat shrink",
      "Crimping",
      "No protection needed"
    ],
    correctAnswer: 1
  },
  {
    question: "What does index-matching gel do in a mechanical splice?",
    options: [
      "Glues fibres permanently",
      "Reduces reflection and fills air gaps",
      "Provides mechanical strength",
      "Protects from moisture"
    ],
    correctAnswer: 1
  },
  {
    question: "For how many splices is a mechanical splice kit typically used?",
    options: [
      "Unlimited - reusable",
      "Single use only",
      "10 uses per unit",
      "5 uses per unit"
    ],
    correctAnswer: 1
  },
  {
    question: "What factor most affects fusion splice quality?",
    options: [
      "Room temperature",
      "Fibre cleave angle and cleanliness",
      "Splice protector type",
      "Cable jacket colour"
    ],
    correctAnswer: 1
  },
  {
    question: "Which scenario best suits mechanical splicing?",
    options: [
      "Permanent data centre backbone",
      "Emergency restoration/temporary repair",
      "Long-haul telecommunications",
      "High-density patch panel"
    ],
    correctAnswer: 1
  },
  {
    question: "What is the approximate cost difference between methods?",
    options: [
      "Fusion equipment costs 10x more than mechanical",
      "They cost about the same",
      "Mechanical equipment costs more",
      "Fusion equipment can cost £3,000-£30,000+ vs £100-500 for mechanical"
    ],
    correctAnswer: 3
  },
  {
    question: "Can mechanical splices be used on singlemode fibre?",
    options: [
      "No, only multimode",
      "Yes, but alignment is more critical",
      "Only with special equipment",
      "Only for temporary repairs"
    ],
    correctAnswer: 1
  }
];

const faqs = [
  {
    question: "Which splicing method should I learn first?",
    answer: "Start with mechanical splicing to understand fibre preparation fundamentals (stripping, cleaving, cleaning) with lower-cost equipment. These skills transfer directly to fusion splicing. Many organisations train technicians on mechanical splices before progressing to fusion splicing equipment."
  },
  {
    question: "How long does each type of splice take?",
    answer: "An experienced technician can complete a mechanical splice in 2-5 minutes including fibre prep. Fusion splicing takes similar preparation time but the actual splice is faster (under 10 seconds for the arc). However, fusion includes heat-shrink protection time. Overall, both methods take similar time per splice once proficient."
  },
  {
    question: "Can I convert a mechanical splice to fusion later?",
    answer: "Yes. If a mechanical splice was installed as a temporary repair, you can cut it out and fusion splice the fibres for a permanent solution. Allow sufficient fibre length for this when installing mechanical splices. The mechanical splice housing is removed, fibres re-prepared, and fusion spliced."
  },
  {
    question: "Do mechanical splices degrade over time?",
    answer: "Quality mechanical splices can last years if properly installed, but the index-matching gel can be affected by temperature cycling, moisture ingress, or contamination. For critical permanent installations, fusion splicing provides better long-term reliability. Mechanical splices should be periodically checked."
  },
  {
    question: "What about loss testing - is it the same for both types?",
    answer: "Yes, both splice types require loss testing using an OTDR or power meter. The test method is identical - only acceptable loss values differ. Fusion splices should be under 0.1 dB; mechanical splices under 0.3-0.5 dB typically. Document all test results regardless of splice type."
  },
  {
    question: "Are there hybrid solutions?",
    answer: "Yes, some field-installable connectors use mechanical splice technology to join factory-terminated pigtails to field fibres. These offer connector convenience with mechanical splice installation simplicity. 'Splice-on' or 'fusion splice' connectors are also available using fusion splicing of connector pigtails."
  }
];

const FiberOpticsModule4Section1 = () => {
  useSEO({
    title: TITLE,
    description: DESCRIPTION,
  });

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Minimal Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-screen-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link
            to="/apprentice/study-centre/upskilling/fiber-optics/module4"
            className="flex items-center gap-2 text-white/70 hover:text-white active:scale-[0.98] touch-manipulation min-h-[44px]"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Back to Module 4</span>
          </Link>
          <span className="text-xs text-white/40 hidden sm:block">Section 1 of 5</span>
        </div>
      </header>

      <main className="pt-20 pb-24 px-4 max-w-4xl mx-auto">
        {/* Module Number Badge */}
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-1.5 text-sm text-elec-yellow">
            <Wrench className="w-4 h-4" />
            Module 4 · Section 1
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Mechanical vs Fusion Splicing
        </h1>

        {/* Quick Summary Card */}
        <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl p-5 border border-blue-500/30 mb-6">
          <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Zap className="w-5 h-5 text-elec-yellow" />
            In 30 Seconds
          </h2>
          <p className="text-white/80 text-sm leading-relaxed">
            Fibre splicing joins two fibres into a continuous optical path. Fusion splicing uses
            an electric arc to permanently melt fibres together (lowest loss, highest cost).
            Mechanical splicing aligns fibres in a holder with index-matching gel (higher loss,
            lower cost). Choose fusion for permanent backbone installations; mechanical for
            emergency repairs and low-volume work.
          </p>
        </div>

        {/* Spot it / Use it Card */}
        <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-2xl p-5 border border-purple-500/20 mb-8">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold text-purple-400 mb-2">Fusion Splicing</h3>
              <ul className="text-white/70 text-sm space-y-1">
                <li>• Arc welds fibre ends together</li>
                <li>• Loss: &lt;0.1 dB typical</li>
                <li>• Equipment: £3,000-£30,000+</li>
                <li>• Permanent, reliable joints</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-blue-400 mb-2">Mechanical Splicing</h3>
              <ul className="text-white/70 text-sm space-y-1">
                <li>• Aligns fibres mechanically</li>
                <li>• Loss: 0.1-0.5 dB typical</li>
                <li>• Equipment: £100-£500</li>
                <li>• Repairs, low-volume work</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Learning Outcomes */}
        <div className="bg-white/5 rounded-2xl p-5 border border-white/10 mb-8">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            What You'll Learn
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Fusion splicing principles and process",
              "Mechanical splicing operation",
              "Loss characteristics comparison",
              "Equipment and cost considerations",
              "Application selection criteria",
              "Quality and reliability factors"
            ].map((outcome, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-elec-yellow">{index + 1}</span>
                </div>
                <span className="text-sm text-white/80">{outcome}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 1: Fusion Splicing Fundamentals */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <span className="text-lg font-bold">01</span>
            </div>
            <h2 className="text-xl font-bold">Fusion Splicing Fundamentals</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Fusion splicing creates a permanent, low-loss joint by melting two optical fibre
              ends together using an electric arc. The process fuses the glass cores and cladding
              into a single continuous structure, providing the highest quality splice available.
            </p>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-400" />
                The Fusion Process
              </h4>
              <ol className="space-y-2 text-sm">
                <li><strong>1. Fibre preparation:</strong> Strip coating, clean fibre, precision cleave to &lt;1° angle</li>
                <li><strong>2. Alignment:</strong> Machine automatically aligns fibre cores using cameras and micro-positioners</li>
                <li><strong>3. Arc fusion:</strong> Electric arc (2000°C+) melts and fuses fibre ends together</li>
                <li><strong>4. Loss estimation:</strong> Machine estimates splice loss based on geometry</li>
                <li><strong>5. Protection:</strong> Heat-shrink sleeve applied to protect the splice point</li>
              </ol>
            </div>

            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-4">
              <h4 className="font-semibold text-white mb-2">Typical Fusion Splice Performance</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-blue-300">Singlemode:</p>
                  <ul className="text-white/70 mt-1 space-y-1">
                    <li>• Typical loss: 0.02-0.05 dB</li>
                    <li>• Maximum: 0.1 dB</li>
                    <li>• Reflectance: &lt;-60 dB</li>
                  </ul>
                </div>
                <div>
                  <p className="text-purple-300">Multimode:</p>
                  <ul className="text-white/70 mt-1 space-y-1">
                    <li>• Typical loss: 0.01-0.03 dB</li>
                    <li>• Maximum: 0.1 dB</li>
                    <li>• Core alignment less critical</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-elec-yellow/10 rounded-xl p-4 border border-elec-yellow/30">
              <h4 className="font-semibold text-elec-yellow mb-2">Key Advantages</h4>
              <ul className="text-sm space-y-1 text-white/80">
                <li>• <strong>Lowest loss:</strong> Best possible optical performance</li>
                <li>• <strong>Permanent:</strong> Glass-to-glass fusion creates lasting joint</li>
                <li>• <strong>Consistent:</strong> Machine-controlled process reduces variability</li>
                <li>• <strong>High reliability:</strong> No gel degradation or mechanical wear</li>
                <li>• <strong>Small size:</strong> Compact splice protectors fit in enclosures</li>
              </ul>
            </div>

            <p>
              Modern fusion splicers use sophisticated imaging and alignment systems. Core
              alignment splicers (used for singlemode) achieve the best results by directly
              viewing and aligning the fibre cores, while clad-alignment splicers (for multimode)
              are more economical.
            </p>
          </div>
        </section>

        {/* Section 2: Mechanical Splicing */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <span className="text-lg font-bold">02</span>
            </div>
            <h2 className="text-xl font-bold">Mechanical Splicing</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Mechanical splicing aligns and holds two fibre ends together in a precision housing
              without permanently fusing them. Index-matching gel fills the gap between fibres,
              reducing reflections and transmission loss.
            </p>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Wrench className="w-4 h-4 text-purple-400" />
                Mechanical Splice Construction
              </h4>
              <ul className="space-y-2 text-sm">
                <li><strong>Alignment mechanism:</strong> V-groove or precision tube holds fibres in alignment</li>
                <li><strong>Index-matching gel:</strong> Optical gel with refractive index matching glass fills gap</li>
                <li><strong>Locking mechanism:</strong> Clamp, snap, or cam lock secures fibres in place</li>
                <li><strong>Outer housing:</strong> Protective enclosure provides mechanical protection</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3">Installation Process</h4>
              <ol className="space-y-2 text-sm">
                <li><strong>1. Strip fibre:</strong> Remove coating to expose bare fibre</li>
                <li><strong>2. Clean fibre:</strong> Remove debris with lint-free wipes and alcohol</li>
                <li><strong>3. Cleave fibre:</strong> Cut to specified length with precision cleaver</li>
                <li><strong>4. Insert fibres:</strong> Push fibres into splice body from each end</li>
                <li><strong>5. Engage lock:</strong> Activate locking mechanism to clamp fibres</li>
                <li><strong>6. Test:</strong> Verify acceptable loss with power meter or OTDR</li>
              </ol>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/30">
                <h4 className="font-semibold text-green-400 mb-2">Advantages</h4>
                <ul className="text-sm space-y-1 text-white/70">
                  <li>• Low equipment cost</li>
                  <li>• Portable - no power needed</li>
                  <li>• Quick training time</li>
                  <li>• Suitable for emergency repairs</li>
                  <li>• Can be re-made if needed</li>
                </ul>
              </div>
              <div className="bg-orange-500/10 rounded-xl p-4 border border-orange-500/30">
                <h4 className="font-semibold text-orange-400 mb-2">Limitations</h4>
                <ul className="text-sm space-y-1 text-white/70">
                  <li>• Higher loss than fusion</li>
                  <li>• Gel can degrade over time</li>
                  <li>• Temperature sensitivity</li>
                  <li>• Larger physical size</li>
                  <li>• Higher cost per splice</li>
                </ul>
              </div>
            </div>

            <p>
              Common mechanical splice products include the 3M Fibrlok™, Corning Unicam™
              pre-polished connector, and various manufacturer-specific designs. Each requires
              specific tools and follows particular installation procedures.
            </p>
          </div>
        </section>

        {/* Quick Check 1 */}
        <div className="mb-10">
          <InlineCheck
            id={quickCheckQuestions[0].id}
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
        </div>

        {/* Section 3: Loss Comparison */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <span className="text-lg font-bold">03</span>
            </div>
            <h2 className="text-xl font-bold">Loss Characteristics Comparison</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Understanding the loss characteristics of each method is crucial for link budget
              calculations and meeting system requirements.
            </p>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-400" />
                Typical Loss Values (dB)
              </h4>
              <div className="overflow-x-auto">
                <table className="text-sm w-full">
                  <thead>
                    <tr className="text-left border-b border-white/20">
                      <th className="pb-2 text-white/80">Splice Type</th>
                      <th className="pb-2 text-white/80">Typical</th>
                      <th className="pb-2 text-white/80">Maximum</th>
                      <th className="pb-2 text-white/80">Spec Standard</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/60">
                    <tr className="border-b border-white/10">
                      <td className="py-2">Fusion (SM)</td>
                      <td>0.02-0.05 dB</td>
                      <td>0.1 dB</td>
                      <td>TIA-568</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2">Fusion (MM)</td>
                      <td>0.01-0.03 dB</td>
                      <td>0.1 dB</td>
                      <td>TIA-568</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2">Mechanical (SM)</td>
                      <td>0.1-0.2 dB</td>
                      <td>0.3 dB</td>
                      <td>Manufacturer</td>
                    </tr>
                    <tr>
                      <td className="py-2">Mechanical (MM)</td>
                      <td>0.1-0.2 dB</td>
                      <td>0.5 dB</td>
                      <td>Manufacturer</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-elec-yellow/10 rounded-xl p-4 border border-elec-yellow/30">
              <h4 className="font-semibold text-elec-yellow mb-2">Link Budget Impact</h4>
              <p className="text-sm text-white/80 mb-2">
                Example: 10-splice backbone link calculation:
              </p>
              <ul className="text-sm text-white/70 space-y-1">
                <li>• <strong>Fusion splices:</strong> 10 × 0.05 dB = 0.5 dB total splice loss</li>
                <li>• <strong>Mechanical splices:</strong> 10 × 0.2 dB = 2.0 dB total splice loss</li>
                <li>• <strong>Difference:</strong> 1.5 dB additional margin with fusion</li>
              </ul>
              <p className="text-xs text-white/50 mt-2">
                On long links with many splices, this difference can determine if the link works.
              </p>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-2">Loss Factors</h4>
              <p className="text-sm text-white/70 mb-2">Factors affecting splice loss for both methods:</p>
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <ul className="text-white/60 space-y-1">
                  <li>• Cleave angle (critical)</li>
                  <li>• Fibre cleanliness</li>
                  <li>• Core diameter mismatch</li>
                  <li>• Mode field diameter</li>
                </ul>
                <ul className="text-white/60 space-y-1">
                  <li>• Alignment accuracy</li>
                  <li>• End-face quality</li>
                  <li>• Index-matching (mechanical)</li>
                  <li>• Arc parameters (fusion)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Equipment and Costs */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <span className="text-lg font-bold">04</span>
            </div>
            <h2 className="text-xl font-bold">Equipment and Cost Analysis</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              The significant difference in equipment costs influences the choice between methods
              based on volume of work and budget constraints.
            </p>

            <div className="grid gap-4">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h4 className="font-semibold text-blue-400 mb-2">Fusion Splicing Equipment</h4>
                <ul className="text-sm text-white/60 space-y-1">
                  <li>• <strong>Fusion splicer:</strong> £3,000-£30,000+ depending on features</li>
                  <li>• <strong>Precision cleaver:</strong> £500-£2,000</li>
                  <li>• <strong>Splice protectors:</strong> £0.50-£2 each</li>
                  <li>• <strong>Stripping tools:</strong> £50-£200</li>
                  <li>• <strong>Consumables:</strong> Electrodes, cleaning supplies</li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h4 className="font-semibold text-purple-400 mb-2">Mechanical Splicing Equipment</h4>
                <ul className="text-sm text-white/60 space-y-1">
                  <li>• <strong>Mechanical splice kit:</strong> £100-£500 for tool set</li>
                  <li>• <strong>Basic cleaver:</strong> £100-£500</li>
                  <li>• <strong>Splice units:</strong> £5-£20 each (single use)</li>
                  <li>• <strong>Stripping tools:</strong> £50-£100</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-4">
              <h4 className="font-semibold text-white mb-2">Cost Per Splice Comparison</h4>
              <div className="text-sm text-white/70 space-y-2">
                <p><strong>Fusion (after equipment investment):</strong></p>
                <p className="ml-4">Splice protector + consumables ≈ £1-3 per splice</p>
                <p><strong>Mechanical:</strong></p>
                <p className="ml-4">Splice unit ≈ £5-20 per splice</p>
                <p className="mt-2 text-white/50 text-xs">
                  Crossover point: Fusion becomes more economical at ~200-500 splices depending on
                  equipment choice. For high-volume contractors, fusion splicing is significantly
                  more cost-effective.
                </p>
              </div>
            </div>

            <div className="bg-elec-yellow/10 rounded-xl p-4 border border-elec-yellow/30">
              <h4 className="font-semibold text-elec-yellow mb-2">Equipment Considerations</h4>
              <ul className="text-sm space-y-1 text-white/80">
                <li>• <strong>Portability:</strong> Both can be field-used; mechanical needs no power</li>
                <li>• <strong>Training:</strong> Fusion requires more training but produces consistent results</li>
                <li>• <strong>Maintenance:</strong> Fusion splicers need calibration and electrode replacement</li>
                <li>• <strong>Rental:</strong> Fusion splicers available for hire for occasional use</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quick Check 2 */}
        <div className="mb-10">
          <InlineCheck
            id={quickCheckQuestions[1].id}
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
        </div>

        {/* Section 5: Application Selection */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <span className="text-lg font-bold">05</span>
            </div>
            <h2 className="text-xl font-bold">Application Selection Criteria</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Choosing the right splicing method depends on the application requirements,
              environment, budget, and permanence needed.
            </p>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-blue-400 mb-2">Use Fusion Splicing When:</h4>
              <ul className="text-sm space-y-1 text-white/70">
                <li>• Permanent backbone or infrastructure installation</li>
                <li>• Maximum performance and reliability required</li>
                <li>• Long-haul telecommunications</li>
                <li>• High fibre count cables (cost per splice matters)</li>
                <li>• Specification requires low splice loss (&lt;0.1 dB)</li>
                <li>• Data centre and enterprise backbone</li>
                <li>• Submarine or inaccessible cable installations</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-purple-400 mb-2">Use Mechanical Splicing When:</h4>
              <ul className="text-sm space-y-1 text-white/70">
                <li>• Emergency restoration and temporary repairs</li>
                <li>• Low-volume installations (fewer than 50-100 splices)</li>
                <li>• No access to power for equipment</li>
                <li>• Budget constraints on equipment purchase</li>
                <li>• Training time is limited</li>
                <li>• Future access for reconfiguration needed</li>
                <li>• Field-installable connector applications</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl p-4">
              <h4 className="font-semibold text-white mb-3">Decision Matrix</h4>
              <div className="overflow-x-auto">
                <table className="text-sm w-full">
                  <thead>
                    <tr className="text-left border-b border-white/20">
                      <th className="pb-2 text-white/80">Factor</th>
                      <th className="pb-2 text-blue-300">Fusion</th>
                      <th className="pb-2 text-purple-300">Mechanical</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/60">
                    <tr className="border-b border-white/10">
                      <td className="py-2">Permanence</td>
                      <td>★★★</td>
                      <td>★★</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2">Low loss</td>
                      <td>★★★</td>
                      <td>★★</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2">Low equipment cost</td>
                      <td>★</td>
                      <td>★★★</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2">Field portability</td>
                      <td>★★</td>
                      <td>★★★</td>
                    </tr>
                    <tr>
                      <td className="py-2">High volume cost</td>
                      <td>★★★</td>
                      <td>★</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Quality and Reliability */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <span className="text-lg font-bold">06</span>
            </div>
            <h2 className="text-xl font-bold">Quality and Reliability Factors</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Long-term reliability and consistent quality are critical considerations,
              particularly for permanent infrastructure installations.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30">
                <h4 className="font-semibold text-blue-400 mb-2">Fusion Splice Reliability</h4>
                <ul className="text-sm space-y-1 text-white/70">
                  <li>• Glass-to-glass bond is permanent</li>
                  <li>• No degradation over time</li>
                  <li>• Temperature stable</li>
                  <li>• No moving parts to fail</li>
                  <li>• Expected life: 25+ years</li>
                </ul>
              </div>
              <div className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/30">
                <h4 className="font-semibold text-purple-400 mb-2">Mechanical Splice Reliability</h4>
                <ul className="text-sm space-y-1 text-white/70">
                  <li>• Gel can dry or migrate</li>
                  <li>• Temperature cycling effects</li>
                  <li>• Potential for moisture ingress</li>
                  <li>• Mechanical parts can loosen</li>
                  <li>• Periodic inspection recommended</li>
                </ul>
              </div>
            </div>

            <div className="bg-orange-500/10 rounded-xl p-4 border border-orange-500/30">
              <h4 className="font-semibold text-orange-300 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Quality Assurance
              </h4>
              <p className="text-sm text-white/80">
                Regardless of method, quality depends on:
              </p>
              <ul className="text-sm text-white/70 mt-2 space-y-1">
                <li>• Proper fibre preparation (stripping, cleaning, cleaving)</li>
                <li>• Following manufacturer procedures exactly</li>
                <li>• Testing every splice and documenting results</li>
                <li>• Proper protection of completed splices</li>
                <li>• Competent, trained technicians</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-elec-yellow" />
                Testing Requirements
              </h4>
              <p className="text-sm text-white/70 mb-2">
                Both splice types require post-installation testing:
              </p>
              <ul className="text-sm text-white/60 space-y-1">
                <li>• <strong>OTDR testing:</strong> Verifies splice loss and location</li>
                <li>• <strong>Insertion loss:</strong> End-to-end power measurement</li>
                <li>• <strong>Visual inspection:</strong> Fusion splicer provides splice image</li>
                <li>• <strong>Documentation:</strong> Record all test results for handover</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quick Check 3 */}
        <div className="mb-10">
          <InlineCheck
            id={quickCheckQuestions[2].id}
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
        </div>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">Practical Guidance</h2>

          <div className="space-y-4">
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl p-4 border border-green-500/20">
              <h4 className="font-semibold text-green-400 mb-2">Industry Best Practice</h4>
              <ul className="text-sm text-white/70 space-y-2">
                <li>• <strong>Permanent infrastructure:</strong> Always specify fusion splicing</li>
                <li>• <strong>Emergency kits:</strong> Keep mechanical splice kit for repairs</li>
                <li>• <strong>Training:</strong> Ensure technicians trained on equipment being used</li>
                <li>• <strong>Documentation:</strong> Record all splice loss values and locations</li>
                <li>• <strong>Cleaving:</strong> Invest in quality cleavers - they're critical for both methods</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-xl p-4 border border-red-500/20">
              <h4 className="font-semibold text-red-400 mb-2">Common Mistakes</h4>
              <ul className="text-sm text-white/70 space-y-2">
                <li>• <strong>Dirty fibres:</strong> Contamination causes high loss - always clean thoroughly</li>
                <li>• <strong>Poor cleave:</strong> Bad cleave angle ruins any splice - practice technique</li>
                <li>• <strong>Wrong method selection:</strong> Using mechanical for permanent backbone work</li>
                <li>• <strong>Skipping tests:</strong> Every splice must be tested - no exceptions</li>
                <li>• <strong>Inadequate protection:</strong> Splices need proper heat-shrink or housing</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-4 border border-blue-500/20">
              <h4 className="font-semibold text-blue-400 mb-2">Method Selection Checklist</h4>
              <ul className="text-sm text-white/70 space-y-2">
                <li>• Is this a permanent installation? → Fusion</li>
                <li>• Is budget extremely limited? → Mechanical (short term)</li>
                <li>• Are there many splices? → Fusion (cost per splice)</li>
                <li>• Is this emergency repair? → Mechanical (then replace later)</li>
                <li>• Does specification require &lt;0.1 dB? → Fusion only</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white/5 rounded-xl border border-white/10 overflow-hidden"
              >
                <button
                  className="w-full px-4 py-3 flex items-center justify-between text-left min-h-[44px] touch-manipulation"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="text-sm font-medium text-white/90">{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-white/60 transition-transform ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-4 pb-3">
                    <p className="text-sm text-white/70">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="mb-10">
          <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl p-5 border border-blue-500/30">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-blue-400" />
              Quick Reference: Splicing Methods
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-semibold text-blue-300 mb-2">Fusion Splicing</h4>
                <ul className="text-xs text-white/70 space-y-1">
                  <li>• Loss: &lt;0.1 dB (typical 0.02-0.05)</li>
                  <li>• Equipment: £3,000-30,000+</li>
                  <li>• Per splice: £1-3</li>
                  <li>• Permanent, highest reliability</li>
                  <li>• Backbone, infrastructure</li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-purple-300 mb-2">Mechanical Splicing</h4>
                <ul className="text-xs text-white/70 space-y-1">
                  <li>• Loss: 0.1-0.5 dB typical</li>
                  <li>• Equipment: £100-500</li>
                  <li>• Per splice: £5-20</li>
                  <li>• Re-workable, portable</li>
                  <li>• Repairs, low volume</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-xs text-white/50">
                Key: Quality depends on cleave angle + fibre cleanliness. Test every splice!
              </p>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="mb-10">
          <Quiz
            title="Section Quiz"
            questions={quizQuestions}
            onComplete={(score, total) => {
              console.log(`Quiz completed: ${score}/${total}`);
            }}
          />
        </section>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-white/10">
          <Link
            to="/apprentice/study-centre/upskilling/fiber-optics/module3/section6"
            className="w-full sm:w-auto"
          >
            <Button
              variant="ghost"
              className="w-full sm:w-auto gap-2 text-white/70 hover:text-white min-h-[44px] touch-manipulation"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous: Earthing and Segregation
            </Button>
          </Link>
          <Link
            to="/apprentice/study-centre/upskilling/fiber-optics/module4/section2"
            className="w-full sm:w-auto"
          >
            <Button
              className="w-full sm:w-auto gap-2 bg-elec-yellow text-black hover:bg-elec-yellow/90 min-h-[44px] touch-manipulation"
            >
              Next: Cleaving and Fibre Prep
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default FiberOpticsModule4Section1;
