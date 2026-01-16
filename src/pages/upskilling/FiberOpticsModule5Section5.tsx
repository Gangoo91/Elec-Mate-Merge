import { useState } from "react";
import { ArrowLeft, Zap, CheckCircle, ChevronDown, Scale, Target, AlertTriangle, Calculator, BookOpen, FileCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Fibre Testing Pass/Fail Criteria - Fiber Optics Technology";
const DESCRIPTION = "Master TIA-568 and ISO 11801 standards for fibre optic testing, including link budget calculations, connector and splice loss allowances, and margin requirements.";

const quickCheckQuestions = [
  {
    id: "passfail-qc1",
    question: "What is the maximum connector loss allowance per TIA-568 for a mated pair?",
    options: [
      "0.25 dB",
      "0.75 dB",
      "1.0 dB",
      "0.50 dB"
    ],
    correctIndex: 1,
    explanation: "TIA-568 specifies a maximum of 0.75 dB loss per mated connector pair. This includes both connector ends and the adapter. High-quality connectors typically achieve 0.3 dB or less."
  },
  {
    id: "passfail-qc2",
    question: "What attenuation rate does TIA-568 specify for OS2 singlemode fibre at 1310nm?",
    options: [
      "0.5 dB/km",
      "1.0 dB/km",
      "3.5 dB/km",
      "0.4 dB/km"
    ],
    correctIndex: 3,
    explanation: "TIA-568 specifies 0.4 dB/km maximum attenuation for OS2 singlemode fibre at 1310nm. At 1550nm, the specification is even lower at 0.3 dB/km due to lower absorption."
  },
  {
    id: "passfail-qc3",
    question: "What minimum margin is typically recommended above the calculated link loss budget?",
    options: [
      "0.5 dB",
      "1.5 to 3.0 dB",
      "5.0 dB",
      "No margin needed"
    ],
    correctIndex: 1,
    explanation: "A margin of 1.5 to 3.0 dB above the calculated loss budget is recommended. This accounts for future repairs, connector ageing, additional splices, and measurement uncertainty."
  }
];

const quizQuestions = [
  {
    question: "Which standard series specifically addresses premises cabling requirements including fibre?",
    options: [
      "ISO 9001",
      "TIA-568",
      "IEEE 802.3",
      "ITU-T G.652"
    ],
    correctAnswer: 1
  },
  {
    question: "What is the maximum splice loss allowance per TIA-568 for fusion splices?",
    options: [
      "0.1 dB",
      "0.3 dB",
      "0.5 dB",
      "0.75 dB"
    ],
    correctAnswer: 1
  },
  {
    question: "For OM3 multimode fibre at 850nm, what is the maximum attenuation per TIA-568?",
    options: [
      "1.5 dB/km",
      "2.5 dB/km",
      "3.5 dB/km",
      "4.5 dB/km"
    ],
    correctAnswer: 2
  },
  {
    question: "How do you calculate total link loss budget?",
    options: [
      "Cable loss only",
      "Cable loss + connector losses + splice losses + margin",
      "Just connector losses",
      "Equipment transmit power"
    ],
    correctAnswer: 1
  },
  {
    question: "What does ISO 11801 Class EA require for connector grades?",
    options: [
      "Any grade connector",
      "Grade B or better connectors (0.25 dB typical)",
      "Only fusion spliced connections",
      "Grade D connectors"
    ],
    correctAnswer: 1
  },
  {
    question: "A 500m OS2 link with 4 connectors and 1 splice has a measured loss of 2.1 dB. Using TIA limits, what is the verdict?",
    options: [
      "Pass (within budget)",
      "Fail (exceeds budget)",
      "Cannot determine",
      "Marginal"
    ],
    correctAnswer: 0
  },
  {
    question: "Why is 1550nm testing often required in addition to 1310nm for singlemode?",
    options: [
      "It's faster",
      "Bending losses are more apparent at 1550nm",
      "Equipment requires it",
      "It's optional"
    ],
    correctAnswer: 1
  },
  {
    question: "What safety factor should be included for future repairs and degradation?",
    options: [
      "0 dB - standards cover everything",
      "1.5-3.0 dB margin recommended",
      "10 dB minimum",
      "50% of total budget"
    ],
    correctAnswer: 1
  },
  {
    question: "Per ISO 11801, what is a Grade A connector maximum insertion loss?",
    options: [
      "0.10 dB",
      "0.15 dB",
      "0.25 dB",
      "0.50 dB"
    ],
    correctAnswer: 1
  },
  {
    question: "If measured loss exceeds budget but equipment still functions, what should you do?",
    options: [
      "Accept as pass",
      "Document as marginal pass, recommend remediation",
      "Ignore the measurement",
      "Retest until it passes"
    ],
    correctAnswer: 1
  }
];

const faqs = [
  {
    question: "What is the difference between TIA-568 and ISO 11801 standards?",
    answer: "TIA-568 is the American standard primarily used in North America, while ISO 11801 is the international standard used in Europe and many other regions. Both address premises cabling but have slightly different requirements. TIA-568 tends to be more prescriptive, while ISO 11801 uses a class-based system (Class D, E, EA, F, FA) for performance grades. For fibre, the loss values are similar, but always verify which standard applies to your project."
  },
  {
    question: "Do I need to test at both wavelengths for singlemode?",
    answer: "Yes, testing at both 1310nm and 1550nm is recommended for singlemode installations. The 1310nm wavelength tests for overall attenuation and connector losses, while 1550nm is more sensitive to macrobending losses. A fibre that passes at 1310nm but fails at 1550nm likely has installation issues like tight bends or cable stress. Dual-wavelength testing provides a complete picture of link quality."
  },
  {
    question: "How do I handle legacy installations with higher losses?",
    answer: "Legacy installations may use older fibre types or connectors with higher loss values. Document the actual performance, compare against the equipment requirements (not just standards), and calculate available margin. If the link supports the intended application with adequate margin, it may be acceptable. Always document deviations and get customer approval for non-compliant links."
  },
  {
    question: "What causes a connector to exceed the 0.75 dB limit?",
    answer: "Common causes include: contamination (dirt, oil, dust on end faces), poor polishing quality, fibre misalignment, incorrect connector installation, end face damage (scratches, chips), and air gaps between mated connectors. Always clean and inspect connectors before testing. Retermination may be required for persistently high-loss connections."
  },
  {
    question: "Should I use worst-case or typical values for budget calculations?",
    answer: "For certification testing, use the maximum values specified in standards (worst-case). For design and planning, you might use typical values but must include adequate margin. Always document which approach was used. Using worst-case values ensures the link will pass certification and provides inherent margin for future changes."
  },
  {
    question: "How do I document a marginally passing link?",
    answer: "Record the measured loss, calculated budget, and remaining margin. If margin is less than 1.5 dB, note this as 'low margin' in your report. Recommend inspection and potential remediation of high-loss connections. Document any known issues like visible damage or contamination. Provide clear pass/fail determination based on calculated budget, even if margin is minimal."
  }
];

const FiberOpticsModule5Section5 = () => {
  useSEO({
    title: TITLE,
    description: DESCRIPTION,
  });

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a] text-white">
      {/* Minimal Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-screen-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link
            to="/apprentice/study-centre/upskilling/fiber-optics/module5"
            className="flex items-center gap-2 text-white/70 hover:text-white active:scale-[0.98] touch-manipulation min-h-[44px]"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Back to Module 5</span>
          </Link>
          <span className="text-xs text-white/40 hidden sm:block">Section 5 of 6</span>
        </div>
      </header>

      <main className="pt-20 pb-24 px-4 max-w-3xl mx-auto">
        {/* Module Number Badge */}
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-1.5 text-sm text-elec-yellow">
            <CheckCircle className="w-4 h-4" />
            Module 5 · Section 5
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Fibre Testing Pass/Fail Criteria
        </h1>

        {/* Quick Summary Card */}
        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl p-5 border border-green-500/30 mb-6">
          <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Zap className="w-5 h-5 text-elec-yellow" />
            In 30 Seconds
          </h2>
          <p className="text-white/80 text-sm leading-relaxed">
            Pass/fail criteria for fibre testing are defined by industry standards including TIA-568
            and ISO 11801. These specify maximum allowable losses for connectors (0.75 dB), splices
            (0.3 dB), and cable attenuation by fibre type. Calculate total link budget by summing
            all loss components, then compare measured loss. Include 1.5-3.0 dB margin for future
            repairs and degradation.
          </p>
        </div>

        {/* Spot it / Use it Card */}
        <div className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-2xl p-5 border border-emerald-500/20 mb-8">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold text-emerald-400 mb-2">Key Standards</h3>
              <ul className="text-white/70 text-sm space-y-1">
                <li>• TIA-568 (North America)</li>
                <li>• ISO 11801 (International)</li>
                <li>• IEC 61280 (Test methods)</li>
                <li>• IEC 61300 (Connectors)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-green-400 mb-2">Critical Values</h3>
              <ul className="text-white/70 text-sm space-y-1">
                <li>• Connector pair: 0.75 dB max</li>
                <li>• Fusion splice: 0.3 dB max</li>
                <li>• SM fibre: 0.4 dB/km (1310nm)</li>
                <li>• Margin: 1.5-3.0 dB recommended</li>
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
              "TIA-568 and ISO 11801 requirements",
              "Link budget calculation methods",
              "Connector loss allowances and grades",
              "Splice loss specifications",
              "Cable attenuation limits by type",
              "Margin requirements and safety factors"
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

        {/* Section 1: TIA and ISO Standards Overview */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <span className="text-lg font-bold">01</span>
            </div>
            <h2 className="text-xl font-bold">TIA and ISO Standards Overview</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Industry standards define the performance requirements for fibre optic cabling systems.
              These standards ensure interoperability, quality, and consistent testing methodology
              across installations worldwide.
            </p>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Scale className="w-4 h-4 text-blue-400" />
                TIA-568 Standard Series
              </h4>
              <ul className="space-y-2 text-sm">
                <li><strong>TIA-568.3-D:</strong> Optical fibre cabling and components standard</li>
                <li><strong>Scope:</strong> Premises cabling including backbone and horizontal</li>
                <li><strong>Specifies:</strong> Fibre types, connector performance, channel limits</li>
                <li><strong>Test methods:</strong> References TIA-526 for measurement procedures</li>
                <li><strong>Application:</strong> Primary standard in North America</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3">ISO/IEC 11801 Standard</h4>
              <ul className="space-y-2 text-sm">
                <li><strong>ISO 11801-1:</strong> Generic cabling - General requirements</li>
                <li><strong>Class system:</strong> OF-300, OF-500, OF-2000 for channel lengths</li>
                <li><strong>Connector grades:</strong> Grade A, B, C, D for insertion loss</li>
                <li><strong>Global application:</strong> International standard used worldwide</li>
                <li><strong>Harmonised:</strong> Aligned with regional standards (EN 50173)</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl p-4">
              <h4 className="font-semibold text-white mb-2">Standard Comparison</h4>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="font-semibold text-white/60">Parameter</div>
                <div className="font-semibold text-white/60">TIA-568</div>
                <div className="font-semibold text-white/60">ISO 11801</div>

                <div className="text-white/70">Connector loss</div>
                <div className="text-white/70">0.75 dB max</div>
                <div className="text-white/70">Grade dependent</div>

                <div className="text-white/70">Splice loss</div>
                <div className="text-white/70">0.3 dB max</div>
                <div className="text-white/70">0.3 dB max</div>

                <div className="text-white/70">OS2 @ 1310nm</div>
                <div className="text-white/70">0.4 dB/km</div>
                <div className="text-white/70">0.4 dB/km</div>

                <div className="text-white/70">OM3 @ 850nm</div>
                <div className="text-white/70">3.5 dB/km</div>
                <div className="text-white/70">3.5 dB/km</div>
              </div>
            </div>

            <div className="bg-elec-yellow/10 rounded-xl p-4 border border-elec-yellow/30">
              <h4 className="font-semibold text-elec-yellow mb-2">Which Standard to Use?</h4>
              <p className="text-sm text-white/80">
                Check project specifications and local requirements. North American projects typically
                reference TIA-568, while international projects use ISO 11801. Many specifications
                reference both. When in doubt, apply the more stringent requirement to ensure
                compliance with either standard.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Link Budget Calculation */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <span className="text-lg font-bold">02</span>
            </div>
            <h2 className="text-xl font-bold">Link Budget Calculation</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              The link budget calculation determines the maximum allowable loss for a fibre channel.
              Compare your measured loss against this budget to determine pass or fail.
            </p>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Calculator className="w-4 h-4 text-green-400" />
                Link Budget Formula
              </h4>
              <div className="bg-black/30 rounded-lg p-4 font-mono text-sm mb-3">
                <p className="text-green-400">Total Budget = Cable Loss + Connector Losses + Splice Losses + Margin</p>
                <p className="text-white/60 mt-2">Where:</p>
                <p className="text-white/70">Cable Loss = Length (km) x Attenuation (dB/km)</p>
                <p className="text-white/70">Connector Losses = Number of pairs x Loss per pair</p>
                <p className="text-white/70">Splice Losses = Number of splices x Loss per splice</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-4">
              <h4 className="font-semibold text-white mb-3">Example Calculation - OS2 Singlemode</h4>
              <div className="space-y-2 text-sm">
                <p><strong>Scenario:</strong> 500m backbone link, 4 connector pairs, 2 fusion splices</p>
                <div className="bg-black/20 rounded-lg p-3 mt-2 space-y-1 font-mono text-xs">
                  <p>Cable loss: 0.5 km x 0.4 dB/km = <span className="text-green-400">0.20 dB</span></p>
                  <p>Connectors: 4 pairs x 0.75 dB = <span className="text-green-400">3.00 dB</span></p>
                  <p>Splices: 2 x 0.3 dB = <span className="text-green-400">0.60 dB</span></p>
                  <p>Margin: <span className="text-green-400">2.00 dB</span></p>
                  <p className="border-t border-white/20 pt-1 mt-1">
                    Total budget: <span className="text-elec-yellow font-bold">5.80 dB</span>
                  </p>
                </div>
                <p className="text-white/60 mt-2">If measured loss is 2.1 dB, result is <span className="text-green-400 font-semibold">PASS</span> with 3.7 dB margin remaining.</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h4 className="font-semibold text-green-400 mb-2">Channel vs Permanent Link</h4>
                <ul className="text-sm text-white/60 space-y-1">
                  <li>• <strong>Channel:</strong> Includes equipment cords</li>
                  <li>• <strong>Permanent link:</strong> Fixed cabling only</li>
                  <li>• Channel has more connectors</li>
                  <li>• Permanent link tested for acceptance</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h4 className="font-semibold text-emerald-400 mb-2">Bidirectional Testing</h4>
                <ul className="text-sm text-white/60 space-y-1">
                  <li>• Test both directions</li>
                  <li>• Results may differ slightly</li>
                  <li>• Average or use worst case</li>
                  <li>• Both must pass budget</li>
                </ul>
              </div>
            </div>
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

        {/* Section 3: Connector Loss Allowances */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <span className="text-lg font-bold">03</span>
            </div>
            <h2 className="text-xl font-bold">Connector Loss Allowances</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Connector losses are a significant portion of total link loss. Standards specify maximum
              values, while quality connectors typically perform much better than these limits.
            </p>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3">TIA-568 Connector Requirements</h4>
              <ul className="space-y-2 text-sm">
                <li><strong>Mated pair maximum:</strong> 0.75 dB insertion loss</li>
                <li><strong>Random mated:</strong> Any two compatible connectors</li>
                <li><strong>Applies to:</strong> LC, SC, ST, and MPO connectors</li>
                <li><strong>Return loss (SM):</strong> Minimum 26 dB (APC: 65 dB)</li>
                <li><strong>Typical performance:</strong> Quality connectors achieve 0.2-0.3 dB</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl p-4">
              <h4 className="font-semibold text-white mb-3">ISO 11801 Connector Grades</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-2 text-white/60">Grade</th>
                      <th className="text-left py-2 text-white/60">Max IL</th>
                      <th className="text-left py-2 text-white/60">Application</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/70">
                    <tr className="border-b border-white/10">
                      <td className="py-2 text-green-400 font-semibold">Grade A</td>
                      <td className="py-2">0.15 dB</td>
                      <td className="py-2">Premium, reference grade</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 text-blue-400 font-semibold">Grade B</td>
                      <td className="py-2">0.25 dB</td>
                      <td className="py-2">High performance</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 text-yellow-400 font-semibold">Grade C</td>
                      <td className="py-2">0.50 dB</td>
                      <td className="py-2">Standard performance</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-orange-400 font-semibold">Grade D</td>
                      <td className="py-2">1.00 dB</td>
                      <td className="py-2">Basic, legacy</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Target className="w-4 h-4 text-red-400" />
                MPO/MTP Connector Requirements
              </h4>
              <ul className="space-y-2 text-sm">
                <li><strong>12-fibre MPO:</strong> 0.75 dB maximum per mated pair</li>
                <li><strong>Per fibre average:</strong> Should not exceed limits</li>
                <li><strong>Polarity:</strong> Type A, B, or C - must match system design</li>
                <li><strong>Pin alignment:</strong> Critical for multi-fibre performance</li>
                <li><strong>Typical performance:</strong> 0.3-0.5 dB for quality MPO</li>
              </ul>
            </div>

            <div className="bg-orange-500/10 rounded-xl p-4 border border-orange-500/30">
              <h4 className="font-semibold text-orange-300 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Common Causes of High Connector Loss
              </h4>
              <ul className="text-sm space-y-1 text-white/80">
                <li>• <strong>Contamination:</strong> Dust, oil, fingerprints on end face</li>
                <li>• <strong>End face damage:</strong> Scratches, chips, pits</li>
                <li>• <strong>Poor polish:</strong> Incorrect geometry or finish</li>
                <li>• <strong>Core misalignment:</strong> Concentricity errors</li>
                <li>• <strong>Air gap:</strong> Connectors not fully seated</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: Splice Loss Allowances */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <span className="text-lg font-bold">04</span>
            </div>
            <h2 className="text-xl font-bold">Splice Loss Allowances</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Splices create permanent fibre joints with lower loss than connectors. Standards specify
              maximum allowable losses, while quality splices typically achieve much better results.
            </p>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3">Fusion Splice Requirements</h4>
              <ul className="space-y-2 text-sm">
                <li><strong>TIA-568 maximum:</strong> 0.3 dB per splice</li>
                <li><strong>Typical performance:</strong> 0.02-0.05 dB for quality splices</li>
                <li><strong>Singlemode:</strong> Often achieves less than 0.02 dB</li>
                <li><strong>Multimode:</strong> Typically 0.05-0.10 dB</li>
                <li><strong>Bidirectional average:</strong> Measure both directions</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3">Mechanical Splice Requirements</h4>
              <ul className="space-y-2 text-sm">
                <li><strong>Maximum allowed:</strong> 0.3 dB (same as fusion)</li>
                <li><strong>Typical performance:</strong> 0.1-0.2 dB</li>
                <li><strong>Application:</strong> Restoration, temporary repairs</li>
                <li><strong>Permanence:</strong> Less stable than fusion over time</li>
                <li><strong>Index matching:</strong> Gel required for low loss</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-4">
              <h4 className="font-semibold text-white mb-3">Splice Quality Indicators</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-green-400 font-semibold mb-1">Excellent (&lt;0.05 dB)</p>
                  <ul className="text-white/60 space-y-1">
                    <li>• Clean fibre preparation</li>
                    <li>• Correct arc parameters</li>
                    <li>• Matched fibre types</li>
                  </ul>
                </div>
                <div>
                  <p className="text-yellow-400 font-semibold mb-1">Acceptable (&lt;0.3 dB)</p>
                  <ul className="text-white/60 space-y-1">
                    <li>• Within specification</li>
                    <li>• May indicate issues</li>
                    <li>• Consider re-splicing if high</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-elec-yellow/10 rounded-xl p-4 border border-elec-yellow/30">
              <h4 className="font-semibold text-elec-yellow mb-2">Splice Loss Estimation</h4>
              <p className="text-sm text-white/80">
                Fusion splicer estimates may differ from actual measured loss. The splicer calculates
                loss from core alignment, but factors like cleave angle and fibre mismatch affect
                true loss. Always verify critical splices with OTDR or insertion loss testing.
                Estimated loss is a guide, not a guarantee.
              </p>
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

        {/* Section 5: Cable Attenuation Limits by Type */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <span className="text-lg font-bold">05</span>
            </div>
            <h2 className="text-xl font-bold">Cable Attenuation Limits by Type</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Different fibre types have specific attenuation limits at standard wavelengths.
              These values are used in link budget calculations and for pass/fail certification.
            </p>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3">Singlemode Fibre (OS1/OS2)</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-2 text-white/60">Type</th>
                      <th className="text-left py-2 text-white/60">1310nm</th>
                      <th className="text-left py-2 text-white/60">1550nm</th>
                      <th className="text-left py-2 text-white/60">Application</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/70">
                    <tr className="border-b border-white/10">
                      <td className="py-2 font-semibold">OS1</td>
                      <td className="py-2">1.0 dB/km</td>
                      <td className="py-2">1.0 dB/km</td>
                      <td className="py-2">Indoor tight buffer</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-semibold text-green-400">OS2</td>
                      <td className="py-2">0.4 dB/km</td>
                      <td className="py-2">0.3 dB/km</td>
                      <td className="py-2">Loose tube, outdoor</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3">Multimode Fibre (OM1-OM5)</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-2 text-white/60">Type</th>
                      <th className="text-left py-2 text-white/60">850nm</th>
                      <th className="text-left py-2 text-white/60">1300nm</th>
                      <th className="text-left py-2 text-white/60">Core</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/70">
                    <tr className="border-b border-white/10">
                      <td className="py-2 font-semibold">OM1</td>
                      <td className="py-2">3.5 dB/km</td>
                      <td className="py-2">1.5 dB/km</td>
                      <td className="py-2">62.5 um</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 font-semibold">OM2</td>
                      <td className="py-2">3.5 dB/km</td>
                      <td className="py-2">1.5 dB/km</td>
                      <td className="py-2">50 um</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 font-semibold text-cyan-400">OM3</td>
                      <td className="py-2">3.5 dB/km</td>
                      <td className="py-2">1.5 dB/km</td>
                      <td className="py-2">50 um (laser opt)</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 font-semibold text-blue-400">OM4</td>
                      <td className="py-2">3.5 dB/km</td>
                      <td className="py-2">1.5 dB/km</td>
                      <td className="py-2">50 um (laser opt+)</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-semibold text-green-400">OM5</td>
                      <td className="py-2">3.5 dB/km</td>
                      <td className="py-2">1.5 dB/km</td>
                      <td className="py-2">50 um (SWDM)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-4">
              <h4 className="font-semibold text-white mb-2">Wavelength Selection for Testing</h4>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-blue-400 font-semibold">Singlemode</p>
                  <ul className="text-white/60 space-y-1 mt-1">
                    <li>• Test at 1310nm AND 1550nm</li>
                    <li>• 1550nm shows bending losses</li>
                    <li>• Both must pass limits</li>
                  </ul>
                </div>
                <div>
                  <p className="text-cyan-400 font-semibold">Multimode</p>
                  <ul className="text-white/60 space-y-1 mt-1">
                    <li>• Test at 850nm AND 1300nm</li>
                    <li>• Match to application wavelength</li>
                    <li>• 850nm common for 10G+</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-orange-500/10 rounded-xl p-4 border border-orange-500/30">
              <h4 className="font-semibold text-orange-300 mb-2">Installed vs Specified Attenuation</h4>
              <p className="text-sm text-white/80">
                Installed cable attenuation may exceed manufacturer specifications due to installation
                stress, bends, and environmental factors. Use the TIA/ISO maximum values for budget
                calculations, not the manufacturer's typical values. If measured attenuation significantly
                exceeds expected values, investigate for damage or installation issues.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Margin Requirements and Safety Factors */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <span className="text-lg font-bold">06</span>
            </div>
            <h2 className="text-xl font-bold">Margin Requirements and Safety Factors</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Link margin is the difference between the total loss budget and measured loss. Adequate
              margin ensures the link remains functional despite ageing, repairs, and environmental changes.
            </p>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-green-400" />
                Recommended Margin Values
              </h4>
              <ul className="space-y-2 text-sm">
                <li><strong>Minimum margin:</strong> 1.5 dB for new installations</li>
                <li><strong>Recommended:</strong> 2.0-3.0 dB for long-term reliability</li>
                <li><strong>High-reliability:</strong> 3.0 dB or more for critical links</li>
                <li><strong>Repair allowance:</strong> 0.5-1.0 dB for future splice repairs</li>
                <li><strong>Temperature variation:</strong> 0.1-0.2 dB for extreme environments</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-4">
              <h4 className="font-semibold text-white mb-3">Margin Calculation Example</h4>
              <div className="bg-black/20 rounded-lg p-3 space-y-1 font-mono text-xs">
                <p>Total link budget: <span className="text-white/70">5.80 dB</span></p>
                <p>Measured loss: <span className="text-white/70">2.10 dB</span></p>
                <p className="border-t border-white/20 pt-1 mt-1">
                  Available margin: <span className="text-green-400 font-bold">3.70 dB</span>
                </p>
                <p className="text-white/50 mt-2">Result: PASS with excellent margin</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/30">
                <h4 className="font-semibold text-green-400 mb-2">Adequate Margin (&gt;3 dB)</h4>
                <ul className="text-sm space-y-1 text-white/70">
                  <li>• Room for repairs and changes</li>
                  <li>• Accommodates ageing</li>
                  <li>• Temperature tolerance</li>
                  <li>• Long-term reliability</li>
                </ul>
              </div>
              <div className="bg-yellow-500/10 rounded-xl p-4 border border-yellow-500/30">
                <h4 className="font-semibold text-yellow-400 mb-2">Low Margin (&lt;1.5 dB)</h4>
                <ul className="text-sm space-y-1 text-white/70">
                  <li>• Document and flag</li>
                  <li>• May need remediation</li>
                  <li>• Risk of future failure</li>
                  <li>• Investigate high-loss points</li>
                </ul>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3">Safety Factors to Consider</h4>
              <ul className="space-y-2 text-sm">
                <li><strong>Connector degradation:</strong> 0.1-0.2 dB per mating cycle</li>
                <li><strong>Future splices:</strong> 0.3 dB per potential repair point</li>
                <li><strong>Cable ageing:</strong> Up to 0.05 dB/km over 25 years</li>
                <li><strong>Measurement uncertainty:</strong> +/- 0.1 to 0.2 dB typical</li>
                <li><strong>Equipment margin:</strong> Transceiver tolerance range</li>
              </ul>
            </div>

            <div className="bg-elec-yellow/10 rounded-xl p-4 border border-elec-yellow/30">
              <h4 className="font-semibold text-elec-yellow mb-2">Pass/Fail Decision Process</h4>
              <ol className="text-sm text-white/80 space-y-1">
                <li>1. Calculate link budget using standard maximum values</li>
                <li>2. Measure insertion loss at required wavelengths</li>
                <li>3. Compare measured loss to calculated budget</li>
                <li>4. Verify minimum margin requirement is met</li>
                <li>5. Document result as PASS, MARGINAL PASS, or FAIL</li>
                <li>6. For marginal links, recommend corrective action</li>
              </ol>
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
              <h4 className="font-semibold text-green-400 mb-2">Budget Calculation Checklist</h4>
              <ul className="text-sm text-white/70 space-y-2">
                <li>• <strong>Count all connections:</strong> Include every mated connector pair</li>
                <li>• <strong>Identify splices:</strong> Count fusion and mechanical splices separately</li>
                <li>• <strong>Measure cable length:</strong> Use actual installed length, not straight-line</li>
                <li>• <strong>Select correct fibre type:</strong> OS2, OM3, etc. affect attenuation</li>
                <li>• <strong>Include margin:</strong> Minimum 1.5 dB, 2-3 dB recommended</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-xl p-4 border border-red-500/20">
              <h4 className="font-semibold text-red-400 mb-2">Common Certification Failures</h4>
              <ul className="text-sm text-white/70 space-y-2">
                <li>• <strong>Dirty connectors:</strong> Clean and re-test before failing</li>
                <li>• <strong>Bad terminations:</strong> Re-terminate high-loss connectors</li>
                <li>• <strong>Tight bends:</strong> Relocate cable or add slack</li>
                <li>• <strong>Wrong fibre type in budget:</strong> Verify fibre specification</li>
                <li>• <strong>Missing connections in count:</strong> Recheck connection points</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl p-4 border border-blue-500/20">
              <h4 className="font-semibold text-blue-400 mb-2">Documentation Requirements</h4>
              <ul className="text-sm text-white/70 space-y-2">
                <li>• Record measured loss at each wavelength</li>
                <li>• Document calculated budget and assumptions</li>
                <li>• Note available margin and pass/fail result</li>
                <li>• Include test equipment details and calibration</li>
                <li>• Flag marginal links for follow-up</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="mb-10">
          <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl p-5 border border-green-500/30">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-green-400" />
              Quick Reference: Pass/Fail Criteria
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-semibold text-green-300 mb-2">TIA-568 Limits</h4>
                <ul className="text-xs text-white/70 space-y-1">
                  <li>Connector pair: 0.75 dB max</li>
                  <li>Fusion splice: 0.3 dB max</li>
                  <li>OS2 @ 1310nm: 0.4 dB/km</li>
                  <li>OS2 @ 1550nm: 0.3 dB/km</li>
                  <li>OM3/4 @ 850nm: 3.5 dB/km</li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-emerald-300 mb-2">Budget Formula</h4>
                <ul className="text-xs text-white/70 space-y-1">
                  <li>Cable: Length x dB/km</li>
                  <li>Connectors: Pairs x 0.75</li>
                  <li>Splices: Count x 0.3</li>
                  <li>Margin: 1.5-3.0 dB</li>
                  <li>PASS if measured &lt; budget</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-xs text-white/50">
                Test both wavelengths | Clean before testing | Document all results | Include adequate margin
              </p>
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
            to="/apprentice/study-centre/upskilling/fiber-optics/module5/section4"
            className="w-full sm:w-auto"
          >
            <Button
              variant="ghost"
              className="w-full sm:w-auto gap-2 text-white/70 hover:text-white min-h-[44px] touch-manipulation"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous: Interpreting Test Results
            </Button>
          </Link>
          <Link
            to="/apprentice/study-centre/upskilling/fiber-optics/module5/section6"
            className="w-full sm:w-auto"
          >
            <Button
              className="w-full sm:w-auto gap-2 bg-elec-yellow text-black hover:bg-elec-yellow/90 min-h-[44px] touch-manipulation"
            >
              Next: Generating Test Reports
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default FiberOpticsModule5Section5;
