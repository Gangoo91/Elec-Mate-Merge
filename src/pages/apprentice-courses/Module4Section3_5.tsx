import { ArrowLeft, ArrowRight, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Common Bending Faults and How to Correct Them - Module 4.3.5 | Level 2 Electrical Course";
const DESCRIPTION = "Learn to identify, correct, and prevent common conduit bending faults including kinking, flattening, and misalignment. Master troubleshooting techniques for BS 7671 compliance.";

const quickCheckQuestions = [
  {
    id: 1,
    question: "What is the main cause of kinking when bending conduit?",
    options: ["Using wrong size conduit", "Bending too quickly without support", "Measuring incorrectly"],
    correctIndex: 1,
    explanation: "Kinking occurs when excessive force is applied too quickly without proper support, causing the conduit to buckle internally."
  },
  {
    id: 2,
    question: "How should over-bending be corrected?",
    options: ["Start again with new conduit", "Gently re-bend in opposite direction", "Apply more force"],
    correctIndex: 1,
    explanation: "Over-bending can be corrected by gently applying counter-pressure, but avoid repeated bending in the same location."
  },
  {
    id: 3,
    question: "Why is bend radius critical per BS 7671?",
    options: ["For visual appearance", "To protect cable insulation", "To save materials"],
    correctIndex: 1,
    explanation: "Correct bend radius prevents cable stress and insulation damage, ensuring electrical safety and compliance."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the main cause of kinking in conduit?",
    options: [
      "Overheating PVC",
      "Using too much force without support",
      "Cutting too short"
    ],
    correctAnswer: 1,
    explanation: "Kinking occurs when excessive force is applied without proper support, causing the conduit walls to buckle inward."
  },
  {
    id: 2,
    question: "Which fault occurs when the bend angle is too shallow?",
    options: [
      "Over-bending",
      "Under-bending",
      "Flattening"
    ],
    correctAnswer: 1,
    explanation: "Under-bending results in angles that are too shallow, causing poor alignment and unprofessional appearance."
  },
  {
    id: 3,
    question: "True or False: Misalignment is usually caused by poor marking or positioning.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation: "True. Most misalignment issues stem from inaccurate marking or incorrect positioning in the bending tool."
  },
  {
    id: 4,
    question: "How can you correct over-bending?",
    options: [
      "Cut out and start again",
      "Gently re-bend in the opposite direction",
      "Apply more force"
    ],
    correctAnswer: 1,
    explanation: "Over-bending can often be corrected by carefully applying counter-pressure, but avoid repeated working of the same area."
  },
  {
    id: 5,
    question: "What happens if the bend radius is too tight?",
    options: [
      "Better cable protection",
      "Risk of cable damage and non-compliance",
      "Faster installation"
    ],
    correctAnswer: 1,
    explanation: "Tight bend radii can damage cable insulation through excessive stress and violate BS 7671 requirements."
  },
  {
    id: 6,
    question: "Name one prevention method for flattening.",
    options: [
      "Use bigger conduit",
      "Use the correct former and steady pressure",
      "Work faster"
    ],
    correctAnswer: 1,
    explanation: "Using the correct size former with steady, controlled pressure prevents the conduit from deforming during bending."
  },
  {
    id: 7,
    question: "Which regulation covers bend radius requirements?",
    options: [
      "BS 7671",
      "Building Regulations",
      "Health & Safety at Work Act"
    ],
    correctAnswer: 0,
    explanation: "BS 7671 (IET Wiring Regulations) specifies minimum bend radii to protect cables from mechanical damage."
  },
  {
    id: 8,
    question: "Why should you avoid repeated bending in the same spot?",
    options: [
      "It takes too long",
      "It weakens the conduit and can cause cracks",
      "It looks untidy"
    ],
    correctAnswer: 1,
    explanation: "Repeated bending work-hardens the material, creating stress points that can lead to cracking and failure."
  }
];

const Module4Section3_5 = () => {
  useSEO(TITLE, DESCRIPTION);

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
              Back to Section 3
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 4</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 3.5</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Common Bending Faults and How to Correct Them
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Learn to identify, diagnose, and correct common conduit bending faults to maintain quality installations and BS 7671 compliance.
            </p>
          </header>

          {/* Introduction */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Introduction
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 text-sm text-white/80">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-elec-yellow mb-2">In 30 Seconds</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Common faults: kinking, flattening, over-bending, under-bending, misalignment</li>
                  <li>Most faults are preventable with correct technique and preparation</li>
                  <li>Quick identification and correction saves time and materials</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-elec-yellow mb-2">Spot it / Use it</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Spot:</strong> Visible deformation, measurement discrepancies, poor alignment</li>
                  <li><strong>Use:</strong> Correction techniques, preventive measures, quality checks</li>
                  <li><strong>Check:</strong> Compliance with drawings, cable protection maintained</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Learning Outcomes
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-sm text-white/80">
              <li>Identify common bending faults through visual inspection and measurement</li>
              <li>Understand the root causes of each type of bending fault</li>
              <li>Apply appropriate corrective techniques for different fault types</li>
              <li>Implement preventive measures to avoid faults during initial bending</li>
              <li>Assess bend quality against BS 7671 standards and installation drawings</li>
            </ul>
          </section>

          {/* Fault Identification and Diagnosis */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Fault Identification and Diagnosis
            </h2>
            <p className="text-sm text-white/80 mb-4">
              Quick identification of bending faults is crucial for efficient correction and quality control:
            </p>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-elec-yellow mb-2">Kinking Faults</p>
                <p className="text-sm text-white/80 mb-2"><strong>Visual symptoms:</strong> Visible inward buckle, sharp crease in conduit wall, localised compression.</p>
                <p className="text-sm text-white/80 mb-2"><strong>Root causes:</strong> Excessive force applied too quickly, inadequate support, wrong bending tool, cold weather making PVC brittle.</p>
                <div className="text-xs text-white/60">
                  <strong>Professional tip:</strong> Always perform "coin test" - a 5p coin should slide freely through the bend
                </div>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-elec-yellow mb-2">Flattening Faults</p>
                <p className="text-sm text-white/80 mb-2"><strong>Visual indicators:</strong> Oval cross-section, reduced height dimension, compression marks on sides.</p>
                <p className="text-sm text-white/80 mb-2"><strong>Causes:</strong> Wrong former size (40%), excessive clamping force (30%), over-tight bend radius (20%), material fatigue (10%).</p>
                <div className="text-xs text-white/60">
                  <strong>BS 7671 compliance:</strong> &gt;5% reduction = monitoring required, &gt;10% = mandatory replacement
                </div>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-elec-yellow mb-2">Angular Faults (Over/Under-Bending)</p>
                <p className="text-sm text-white/80 mb-2"><strong>Over-bending:</strong> Angle exceeds specification, poor alignment with accessories, conduit doesn't meet surfaces square.</p>
                <p className="text-sm text-white/80 mb-2"><strong>Under-bending:</strong> Insufficient clearance around obstacles, unprofessional appearance, difficult cable terminations.</p>
                <div className="text-xs text-white/60">
                  <strong>Measurement standard:</strong> ±2° tolerance for commercial work, ±1° for high-end installations
                </div>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-elec-yellow mb-2">Misalignment Faults</p>
                <p className="text-sm text-white/80 mb-2"><strong>Types:</strong> Horizontal twist, vertical sag, side drift, compound errors.</p>
                <p className="text-sm text-white/80 mb-2"><strong>Detection:</strong> String line test, spirit level on multiple planes, laser level for long runs, plumb bob for vertical sections.</p>
                <div className="text-xs text-white/60">
                  <strong>Industry standard:</strong> Maximum 5mm deviation per 3m run, 15mm total for entire installation
                </div>
              </div>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck
              id="fault-identification-check"
              question={quickCheckQuestions[0].question}
              options={quickCheckQuestions[0].options}
              correctIndex={quickCheckQuestions[0].correctIndex}
              explanation={quickCheckQuestions[0].explanation}
            />
          </div>

          {/* Correction Techniques */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Professional Correction Techniques
            </h2>
            <p className="text-sm text-white/80 mb-4">
              Effective correction methods can salvage most bending faults when applied correctly:
            </p>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-green-500/50">
                <p className="font-medium text-green-400 mb-2">Kink Correction</p>
                <p className="text-sm text-white/80 mb-2"><strong>Emergency field repair:</strong> Mark 50mm either side of kink → Cut out damaged section → Deburr both ends → Install appropriate coupling → Test cable pull.</p>
                <p className="text-sm text-white/80 mb-2"><strong>Heat correction (PVC only):</strong> Insert internal mandrel → Apply gentle heat (60-80°C) → Work gradually → Allow complete cooling → Check internal diameter.</p>
                <div className="text-xs text-white/60">
                  <strong>Safety critical:</strong> Never attempt to straighten severe kinks (&gt;30° compression) - material integrity is compromised
                </div>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-green-500/50">
                <p className="font-medium text-green-400 mb-2">Angular Correction</p>
                <p className="text-sm text-white/80 mb-2"><strong>Over-bending:</strong> Measure current angle → Calculate correction needed → Apply gentle counter-pressure → Work in 2° increments → Stop if material shows stress.</p>
                <p className="text-sm text-white/80 mb-2"><strong>Under-bending:</strong> Reposition in original orientation → Continue bend slowly to target → Use angle finder for real-time feedback.</p>
                <div className="text-xs text-white/60">
                  <strong>Material limit:</strong> Maximum 2-3 correction attempts before work-hardening makes material brittle
                </div>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-green-500/50">
                <p className="font-medium text-green-400 mb-2">Misalignment Correction</p>
                <p className="text-sm text-white/80 mb-2"><strong>Horizontal twist:</strong> Secure one end firmly → Use pipe grips to rotate free end gradually → Check alignment with string line every 15°.</p>
                <p className="text-sm text-white/80 mb-2"><strong>Vertical/horizontal drift:</strong> Install temporary adjustable supports → Use laser level as reference → Adjust incrementally → Work from fixed end.</p>
                <div className="text-xs text-white/60">
                  <strong>Tolerance check:</strong> Maximum 5mm deviation per 3m run - use as go/no-go gauge
                </div>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-green-500/50">
                <p className="font-medium text-green-400 mb-2">Flattening Recovery</p>
                <p className="text-sm text-white/80 mb-2"><strong>Minor flattening (&lt;5%):</strong> Insert appropriate mandrel → For PVC: apply gentle heat → For metal: use internal expander if available → Cool completely → Re-measure diameter.</p>
                <p className="text-sm text-white/80 mb-2"><strong>When to abandon:</strong> &gt;10% diameter reduction, visible cracking, multiple correction attempts, long sections affected (&gt;300mm).</p>
                <div className="text-xs text-white/60">
                  <strong>Cost analysis:</strong> Correction time &gt;15 minutes usually exceeds replacement cost
                </div>
              </div>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck
              id="correction-technique-check"
              question={quickCheckQuestions[1].question}
              options={quickCheckQuestions[1].options}
              correctIndex={quickCheckQuestions[1].correctIndex}
              explanation={quickCheckQuestions[1].explanation}
            />
          </div>

          {/* Advanced Prevention Methods */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Advanced Prevention Methods
            </h2>
            <p className="text-sm text-white/80 mb-4">
              Prevention is always more cost-effective than correction:
            </p>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-purple-500/50">
                <p className="font-medium text-purple-400 mb-2">Pre-Bending Preparation</p>
                <p className="text-sm text-white/80 mb-2"><strong>Material assessment:</strong> Check for damage, verify temperature (&gt;5°C for PVC), confirm size matches bender.</p>
                <p className="text-sm text-white/80 mb-2"><strong>Tool setup:</strong> Confirm bender calibration with test piece, check former condition, verify pressure settings.</p>
                <div className="text-xs text-white/60">
                  <strong>Time saver:</strong> 5 minutes of preparation prevents 30 minutes of correction work
                </div>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-purple-500/50">
                <p className="font-medium text-purple-400 mb-2">Bending Technique Mastery</p>
                <p className="text-sm text-white/80 mb-2"><strong>Force application:</strong> Start minimal, increase gradually, maintain steady pressure, support full length.</p>
                <p className="text-sm text-white/80 mb-2"><strong>Speed control:</strong> 20mm: 10-15 seconds per 90°, 25mm: 15-20 seconds, 32mm: 20-30 seconds. Add 5 seconds per size increase.</p>
                <div className="text-xs text-white/60">
                  <strong>Professional standard:</strong> Experienced benders achieve 95%+ success rate using these methods
                </div>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-purple-500/50">
                <p className="font-medium text-purple-400 mb-2">Real-Time Quality Monitoring</p>
                <p className="text-sm text-white/80 mb-2"><strong>Progressive checking:</strong> Check angle at 30°, 60°, and 90° intervals. Feel for resistance or unusual feedback.</p>
                <p className="text-sm text-white/80 mb-2"><strong>Early warning signs:</strong> Cracking sounds, excessive resistance, twisting/slipping, visible flattening - stop immediately.</p>
                <div className="text-xs text-white/60">
                  <strong>Recovery tip:</strong> Stop at first sign of problems - early intervention prevents major faults
                </div>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-purple-500/50">
                <p className="font-medium text-purple-400 mb-2">Template and Jig Systems</p>
                <p className="text-sm text-white/80 mb-2"><strong>Creating templates:</strong> Use first successful bend as pattern, mark key points on board, include angle references.</p>
                <p className="text-sm text-white/80 mb-2"><strong>Quality benefits:</strong> Eliminates measurement errors, reduces skill dependency, speeds production by 40-60%.</p>
                <div className="text-xs text-white/60">
                  <strong>Investment payback:</strong> Template creation pays for itself after 5-10 identical bends
                </div>
              </div>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck
              id="prevention-methods-check"
              question={quickCheckQuestions[2].question}
              options={quickCheckQuestions[2].options}
              correctIndex={quickCheckQuestions[2].correctIndex}
              explanation={quickCheckQuestions[2].explanation}
            />
          </div>

          {/* Quality Assessment and Standards */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Quality Assessment and Standards
            </h2>
            <p className="text-sm text-white/80 mb-4">
              Systematic quality checks ensure compliance and prevent installation problems:
            </p>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-orange-500/50">
                <p className="font-medium text-orange-400 mb-2">Dimensional Checks</p>
                <p className="text-sm text-white/80 mb-2">Verify bend angles with protractor, check radius against BS 7671 minimums, measure internal diameter retention.</p>
                <div className="text-xs text-white/60">
                  <strong>BS 7671:</strong> Minimum bend radius = 2.5 × external diameter for most cables
                </div>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-orange-500/50">
                <p className="font-medium text-orange-400 mb-2">Visual Inspection</p>
                <p className="text-sm text-white/80 mb-2">Check for cracks, kinks, excessive flattening, surface damage, professional appearance against drawings.</p>
                <div className="text-xs text-white/60">
                  <strong>Reject criteria:</strong> Any visible crack or kink, &gt;10% diameter reduction
                </div>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-orange-500/50">
                <p className="font-medium text-orange-400 mb-2">Functional Testing</p>
                <p className="text-sm text-white/80 mb-2">Test cable pull through bent sections, check fitting alignment, verify accessibility for maintenance.</p>
                <div className="text-xs text-white/60">
                  <strong>Pull test:</strong> Cables should draw smoothly without snagging or resistance
                </div>
              </div>
            </div>
          </section>

          {/* Real-World Example */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400" />
              Real-World Example
            </h2>
            <div className="p-4 rounded-lg bg-orange-500/10 border-l-2 border-orange-500/50">
              <p className="text-sm text-white/80 mb-4">
                On a commercial lighting project, an installer was rushing to complete conduit runs before the end of shift. Multiple bends showed flattening due to using an incorrectly sized former. During cable installation, several cables snagged on the deformed sections, causing insulation damage.
              </p>
              <p className="text-sm text-white/80 mb-4">
                The electrical test revealed insulation resistance failures, requiring complete removal of affected cables and conduit replacement. The installation had to be dismantled, re-bent correctly, and re-pulled, costing an entire day of labour plus materials.
              </p>
              <div className="p-3 rounded bg-elec-yellow/10 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-elec-yellow mb-2">Lessons Learned:</p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-white/70">
                  <li>Always use the correct former size for your conduit diameter</li>
                  <li>Check bend quality before proceeding to the next bend</li>
                  <li>A few minutes of preparation prevents hours of rework</li>
                  <li>Quality checks during bending save time and materials</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="font-medium text-white mb-1">Q: Can flattened bends be fixed without replacing the conduit?</p>
                <p className="text-sm text-white/70">A: Minor flattening (less than 5%) can sometimes be improved with careful reshaping, but significant deformation usually requires replacement to ensure cable protection.</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="font-medium text-white mb-1">Q: How many times can you re-bend the same section of metal conduit?</p>
                <p className="text-sm text-white/70">A: Ideally only once. Repeated bending work-hardens the material, creating stress concentrations that can lead to cracking. If multiple corrections are needed, replace the section.</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="font-medium text-white mb-1">Q: How do I prevent misalignment when bending?</p>
                <p className="text-sm text-white/70">A: Always mark the conduit clearly, ensure proper seating in the bender, and check alignment against a string line or laser level before and during bending.</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="font-medium text-white mb-1">Q: Is it worth trying to correct minor kinks?</p>
                <p className="text-sm text-white/70">A: No. Any visible kink compromises cable protection and installation integrity. Cut out the affected section and rejoin with a coupling - it's faster and safer.</p>
              </div>
            </div>
          </section>

          {/* Summary */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
              Summary
            </h2>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm text-white/80 mb-2">
                Bending faults are common but largely preventable with proper technique and preparation. Understanding the causes helps prevent occurrence, while knowing correction methods saves time when faults do occur. Prevention through correct tool selection, proper technique, and quality checks is always more efficient than correction.
              </p>
              <p className="text-sm text-white/80">
                Regular quality assessment against BS 7671 standards ensures both compliance and professional installation quality. Remember: when in doubt about a bend quality, replace rather than risk cable damage or installation failure.
              </p>
            </div>
          </section>

          {/* Quiz */}
          <section className="mb-10">
            <Quiz questions={quizQuestions} />
          </section>

          {/* Navigation Footer */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 mt-8 border-t border-white/10">
            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../3-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Cutting and Preparing
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="..">
                Complete Section 3
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module4Section3_5;
