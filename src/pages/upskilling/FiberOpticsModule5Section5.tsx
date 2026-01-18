import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Fibre Testing Pass/Fail Criteria - Fibre Optics Technology";
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
    id: 1,
    question: "Which standard series specifically addresses premises cabling requirements including fibre?",
    options: [
      "ISO 9001",
      "TIA-568",
      "IEEE 802.3",
      "ITU-T G.652"
    ],
    correctAnswer: 1,
    explanation: "TIA-568 is the structured cabling standard that defines premises cabling requirements including fibre optic components."
  },
  {
    id: 2,
    question: "What is the maximum splice loss allowance per TIA-568 for fusion splices?",
    options: [
      "0.1 dB",
      "0.3 dB",
      "0.5 dB",
      "0.75 dB"
    ],
    correctAnswer: 1,
    explanation: "TIA-568 specifies 0.3 dB maximum loss for fusion splices. Quality splices typically achieve 0.02-0.1 dB."
  },
  {
    id: 3,
    question: "For OM3 multimode fibre at 850nm, what is the maximum attenuation per TIA-568?",
    options: [
      "1.5 dB/km",
      "2.5 dB/km",
      "3.5 dB/km",
      "4.5 dB/km"
    ],
    correctAnswer: 2,
    explanation: "OM3 multimode fibre has a maximum attenuation of 3.5 dB/km at 850nm per TIA-568 specifications."
  },
  {
    id: 4,
    question: "How do you calculate total link loss budget?",
    options: [
      "Cable loss only",
      "Cable loss + connector losses + splice losses + margin",
      "Just connector losses",
      "Equipment transmit power"
    ],
    correctAnswer: 1,
    explanation: "Total link budget includes all loss components: cable attenuation, connector losses, splice losses, plus recommended margin."
  },
  {
    id: 5,
    question: "What does ISO 11801 Class EA require for connector grades?",
    options: [
      "Any grade connector",
      "Grade B or better connectors (0.25 dB typical)",
      "Only fusion spliced connections",
      "Grade D connectors"
    ],
    correctAnswer: 1,
    explanation: "ISO 11801 Class EA requires Grade B or better connectors with typical loss of 0.25 dB or less."
  },
  {
    id: 6,
    question: "A 500m OS2 link with 4 connectors and 1 splice has a measured loss of 2.1 dB. Using TIA limits, what is the verdict?",
    options: [
      "Pass (within budget)",
      "Fail (exceeds budget)",
      "Cannot determine",
      "Marginal"
    ],
    correctAnswer: 0,
    explanation: "Budget: 0.5km x 0.4dB/km + 4 x 0.75dB + 1 x 0.3dB = 0.2 + 3.0 + 0.3 = 3.5 dB max. Measured 2.1 dB is well within budget - Pass."
  },
  {
    id: 7,
    question: "Why is 1550nm testing often required in addition to 1310nm for singlemode?",
    options: [
      "It's faster",
      "Bending losses are more apparent at 1550nm",
      "Equipment requires it",
      "It's optional"
    ],
    correctAnswer: 1,
    explanation: "1550nm is more sensitive to macrobending losses, revealing installation issues that may not appear at 1310nm."
  },
  {
    id: 8,
    question: "What safety factor should be included for future repairs and degradation?",
    options: [
      "0 dB - standards cover everything",
      "1.5-3.0 dB margin recommended",
      "10 dB minimum",
      "50% of total budget"
    ],
    correctAnswer: 1,
    explanation: "A 1.5-3.0 dB margin allows for future repairs, connector ageing, and additional splices over the link's lifetime."
  },
  {
    id: 9,
    question: "Per ISO 11801, what is a Grade A connector maximum insertion loss?",
    options: [
      "0.10 dB",
      "0.15 dB",
      "0.25 dB",
      "0.50 dB"
    ],
    correctAnswer: 1,
    explanation: "ISO 11801 Grade A connectors have a maximum insertion loss of 0.15 dB - the highest quality grade."
  },
  {
    id: 10,
    question: "If measured loss exceeds budget but equipment still functions, what should you do?",
    options: [
      "Accept as pass",
      "Document as marginal pass, recommend remediation",
      "Ignore the measurement",
      "Retest until it passes"
    ],
    correctAnswer: 1,
    explanation: "Document the actual values, note it as marginal/conditional pass, and recommend remediation of high-loss points."
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

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 5 Section 5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Fibre Testing Pass/Fail Criteria
          </h1>
          <p className="text-white/80">
            Standards-based testing and link budget calculations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Standards:</strong> TIA-568 and ISO 11801</li>
              <li><strong>Connector:</strong> 0.75 dB max per pair</li>
              <li><strong>Splice:</strong> 0.3 dB max (fusion)</li>
              <li><strong>Margin:</strong> 1.5-3.0 dB recommended</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Values</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>OS2 at 1310nm:</strong> 0.4 dB/km max</li>
              <li><strong>OS2 at 1550nm:</strong> 0.3 dB/km max</li>
              <li><strong>OM3 at 850nm:</strong> 3.5 dB/km max</li>
              <li><strong>Test both:</strong> 1310nm and 1550nm</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "TIA-568 and ISO 11801 requirements",
              "Connector and splice loss limits",
              "Fibre attenuation specifications",
              "Link budget calculations",
              "Margin requirements",
              "Documenting test results"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Industry Standards
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Fibre optic testing pass/fail criteria are defined by industry standards. Knowing which standard applies to your project is essential.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">TIA-568 (ANSI/TIA-568):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Primary standard in North America</li>
                <li>Covers structured cabling for commercial buildings</li>
                <li>Defines component specifications and performance</li>
                <li>Updated regularly (current versions TIA-568.3-D for optical fibre)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">ISO/IEC 11801:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>International standard used globally</li>
                <li>Class-based performance system (D, E, EA, F, FA)</li>
                <li>Defines channel and permanent link requirements</li>
                <li>Connector grading system (Grade A, B, C, D)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Related standards:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>IEC 61280:</strong> Fibre optic test procedures</li>
                <li><strong>IEC 61300:</strong> Fibre optic connector tests</li>
                <li><strong>IEC 61300-3-35:</strong> Connector end face inspection</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Component Loss Limits
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Standards specify maximum allowable loss for each component type. These values are used to calculate total link budgets.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Connector loss (TIA-568):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Maximum per mated pair:</strong> 0.75 dB</li>
                <li><strong>Typical quality connector:</strong> 0.2-0.5 dB</li>
                <li><strong>High-performance:</strong> Under 0.2 dB</li>
                <li>Includes both ferrules and adapter</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">ISO 11801 connector grades:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Grade A:</strong> 0.15 dB maximum (highest quality)</li>
                <li><strong>Grade B:</strong> 0.25 dB maximum</li>
                <li><strong>Grade C:</strong> 0.50 dB maximum</li>
                <li><strong>Grade D:</strong> 0.75 dB maximum</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Splice loss (TIA-568):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Fusion splice maximum:</strong> 0.3 dB</li>
                <li><strong>Typical fusion splice:</strong> 0.02-0.1 dB</li>
                <li><strong>Mechanical splice maximum:</strong> 0.3 dB</li>
                <li><strong>Typical mechanical splice:</strong> 0.1-0.2 dB</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 03 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Fibre Attenuation Specifications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Different fibre types have different attenuation characteristics. Standards specify maximum attenuation per kilometre.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Singlemode (OS1/OS2):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>At 1310nm:</strong> 0.4 dB/km maximum</li>
                <li><strong>At 1550nm:</strong> 0.3 dB/km maximum</li>
                <li>OS2 (low water peak) performs better across all wavelengths</li>
                <li>Typical actual values: 0.32-0.35 dB/km at 1310nm</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Multimode (OM1-OM5):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>OM1/OM2 at 850nm:</strong> 3.5 dB/km maximum</li>
                <li><strong>OM3/OM4/OM5 at 850nm:</strong> 3.5 dB/km maximum</li>
                <li><strong>All OM at 1300nm:</strong> 1.5 dB/km maximum</li>
                <li>Higher attenuation limits multimode to shorter distances</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-elec-yellow text-sm font-medium mb-2">Why Test Both Wavelengths</p>
              <p className="text-sm text-white">
                For singlemode, always test at both 1310nm and 1550nm. While 1310nm detects connector and splice losses effectively, 1550nm is more sensitive to macrobending. A link that passes at 1310nm but fails at 1550nm has installation issues (tight bends, stressed cable) that need correction.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Link Budget Calculations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A link budget calculates the maximum allowable loss for a fibre link. Measured loss must be at or below this calculated budget.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Link budget formula:</p>
              <p className="text-sm text-white ml-4 p-3 bg-white/5 rounded font-mono">
                Total Budget = (Length x Attenuation) + (Connectors x Loss) + (Splices x Loss) + Margin
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Example calculation (singlemode at 1310nm):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Cable length: 2 km</li>
                <li>Fibre attenuation: 2 km x 0.4 dB/km = <strong>0.8 dB</strong></li>
                <li>Connectors: 4 pairs x 0.75 dB = <strong>3.0 dB</strong></li>
                <li>Splices: 2 x 0.3 dB = <strong>0.6 dB</strong></li>
                <li>Margin: <strong>2.0 dB</strong></li>
                <li><strong>Total budget: 6.4 dB</strong></li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Pass/fail determination:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>If measured loss is 5.2 dB: <strong>Pass</strong> (under 6.4 dB budget)</li>
                <li>If measured loss is 6.8 dB: <strong>Fail</strong> (exceeds budget)</li>
                <li>Remaining margin: Budget minus Measured = Available headroom</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 05 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Margin Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Including margin in your budget accounts for future changes and degradation over the link's lifetime.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Why margin matters:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Future repairs:</strong> Additional splices from cable breaks</li>
                <li><strong>Connector ageing:</strong> Slight degradation over time</li>
                <li><strong>Environmental changes:</strong> Temperature variations</li>
                <li><strong>Additional connections:</strong> Patches added later</li>
                <li><strong>Measurement uncertainty:</strong> Test equipment tolerance</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Recommended margin values:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Minimum:</strong> 1.5 dB for stable environments</li>
                <li><strong>Typical:</strong> 2.0-3.0 dB for most installations</li>
                <li><strong>High-reliability:</strong> 3.0 dB or more</li>
                <li>Consider application criticality when selecting margin</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Low margin warnings:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Margin under 1.5 dB: Flag as 'low margin' in report</li>
                <li>Margin under 1.0 dB: Recommend investigation</li>
                <li>Negative margin: Investigate high-loss points immediately</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Documentation and Reporting
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Proper documentation of test results is essential for handover, troubleshooting, and future reference.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Required documentation:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Link identification:</strong> Clear labelling of both ends</li>
                <li><strong>Test date and time:</strong> When testing was performed</li>
                <li><strong>Test equipment:</strong> OTDR/power meter model, serial, calibration date</li>
                <li><strong>Test parameters:</strong> Wavelength, reference method, settings</li>
                <li><strong>Measured values:</strong> Loss, ORL, event table</li>
                <li><strong>Calculated budget:</strong> Show workings</li>
                <li><strong>Pass/fail verdict:</strong> Clear determination</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Report elements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Summary page with pass/fail status</li>
                <li>Individual link test results</li>
                <li>OTDR traces (saved files)</li>
                <li>Any noted issues or recommendations</li>
                <li>Operator signature/certification</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-elec-yellow text-sm font-medium mb-2">Marginal Results</p>
              <p className="text-sm text-white">
                For links that pass but with low margin: Document as 'Pass (Low Margin)' and note specific recommendations. Identify the highest-loss events and suggest remediation priorities. This provides valuable information for future troubleshooting and maintenance planning.
              </p>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Budget Calculation Checklist</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>1. Measure or confirm cable length</li>
                <li>2. Count all connector pairs</li>
                <li>3. Count all splice points</li>
                <li>4. Apply appropriate loss values per standard</li>
                <li>5. Add margin (minimum 1.5 dB)</li>
                <li>6. Compare measured loss against budget</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Typical vs Worst-Case Values</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Certification:</strong> Use maximum (worst-case) values from standards</li>
                <li><strong>Design:</strong> May use typical values with adequate margin</li>
                <li><strong>Always document:</strong> Which approach was used</li>
                <li><strong>Worst-case:</strong> Provides inherent safety factor</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">When Results Exceed Budget</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Clean all connectors and retest first</li>
                <li>Identify highest-loss events on OTDR</li>
                <li>Clean, reterminate, or resplice as needed</li>
                <li>Document all remediation actions</li>
                <li>Retest and verify improvement</li>
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

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference: Loss Values</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Components (TIA-568)</p>
                <ul className="space-y-0.5">
                  <li>Connector pair: 0.75 dB max</li>
                  <li>Fusion splice: 0.3 dB max</li>
                  <li>Mechanical splice: 0.3 dB max</li>
                  <li>Margin: 1.5-3.0 dB</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Fibre (per km)</p>
                <ul className="space-y-0.5">
                  <li>OS2 @ 1310nm: 0.4 dB/km</li>
                  <li>OS2 @ 1550nm: 0.3 dB/km</li>
                  <li>OM3/OM4 @ 850nm: 3.5 dB/km</li>
                  <li>OM @ 1300nm: 1.5 dB/km</li>
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

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-6">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default FiberOpticsModule5Section5;
