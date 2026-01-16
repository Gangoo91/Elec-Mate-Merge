import { useState } from "react";
import { ArrowLeft, Zap, CheckCircle, ChevronDown, Scissors, Target, AlertTriangle, Shield, BookOpen, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Cleaving and Fibre Prep - Fiber Optics Technology";
const DESCRIPTION = "Master fibre preparation techniques including stripping, cleaning, and precision cleaving for successful splicing and termination operations.";

const quickCheckQuestions = [
  {
    id: "cleaving-qc1",
    question: "What is the maximum acceptable cleave angle for fusion splicing?",
    options: [
      "5 degrees",
      "2 degrees",
      "1 degree or less",
      "3 degrees"
    ],
    correctIndex: 2,
    explanation: "For quality fusion splices, the cleave angle should be 1 degree or less. Poor cleave angles result in high splice loss or splice failure."
  },
  {
    id: "cleaving-qc2",
    question: "What is the first step in fibre preparation?",
    options: [
      "Cleaving",
      "Stripping the coating",
      "Cleaning with alcohol",
      "Visual inspection"
    ],
    correctIndex: 1,
    explanation: "Stripping removes the protective coating to expose bare fibre for cleaning and cleaving. Always strip before any other preparation step."
  },
  {
    id: "cleaving-qc3",
    question: "Why must stripped fibre never be touched with bare fingers?",
    options: [
      "It will shock you",
      "Oils contaminate the fibre surface",
      "The fibre will break",
      "It damages the coating"
    ],
    correctIndex: 1,
    explanation: "Skin oils contaminate the glass surface, causing splice defects. Always handle fibre with clean tools or gloved hands, never touching the stripped section."
  }
];

const quizQuestions = [
  {
    question: "What tool is used to remove the buffer coating from optical fibre?",
    options: [
      "Wire strippers",
      "Fibre stripping tool with precision holes",
      "Knife",
      "Sandpaper"
    ],
    correctAnswer: 1
  },
  {
    question: "What is the purpose of scoring the fibre before cleaving?",
    options: [
      "To mark the cut position",
      "To create a controlled fracture point",
      "To weaken the coating",
      "To clean the fibre"
    ],
    correctAnswer: 1
  },
  {
    question: "What type of wipe should be used for cleaning stripped fibre?",
    options: [
      "Paper tissue",
      "Cotton cloth",
      "Lint-free optical wipes",
      "Any clean fabric"
    ],
    correctAnswer: 2
  },
  {
    question: "What cleaning solution is typically used for fibre preparation?",
    options: [
      "Water",
      "Isopropyl alcohol (IPA) 99%+",
      "General purpose cleaner",
      "Acetone only"
    ],
    correctAnswer: 1
  },
  {
    question: "What happens if fibre is cleaved at too steep an angle?",
    options: [
      "Better reflection",
      "High splice loss or splice failure",
      "Improved alignment",
      "No significant effect"
    ],
    correctAnswer: 1
  },
  {
    question: "How should cleaved fibre ends be handled?",
    options: [
      "Place anywhere convenient",
      "Keep protected, never touch, inspect before use",
      "Touch to check sharpness",
      "Leave exposed in open air"
    ],
    correctAnswer: 1
  },
  {
    question: "What is the typical cleave length for fusion splicing?",
    options: [
      "5-8mm",
      "10-16mm (per splicer specification)",
      "20-25mm",
      "2-4mm"
    ],
    correctAnswer: 1
  },
  {
    question: "What visual defect indicates a poor cleave?",
    options: [
      "Clean mirror-like surface",
      "Lip, hackle, or angled face",
      "Round profile",
      "Clear end face"
    ],
    correctAnswer: 1
  },
  {
    question: "Why is cleave length consistency important?",
    options: [
      "For appearance only",
      "Fusion splicer requires specific length for proper alignment",
      "To save fibre",
      "For documentation"
    ],
    correctAnswer: 1
  },
  {
    question: "What should you do if a cleave looks poor under inspection?",
    options: [
      "Try splicing anyway",
      "Re-cleave with fresh fibre end",
      "Use more gel",
      "Adjust the splicer"
    ],
    correctAnswer: 1
  }
];

const faqs = [
  {
    question: "How do I know if my cleave is good enough?",
    answer: "A good cleave has a mirror-like flat end face perpendicular to the fibre axis. Inspect under magnification - look for no lips, hackle marks, chips, or angles. Fusion splicers display cleave angle; aim for under 1°. If in doubt, re-cleave. The few seconds spent re-cleaving saves time on failed splices."
  },
  {
    question: "What causes lip or hackle defects in cleaves?",
    answer: "Lips (raised edges) and hackle (rough texture) result from incorrect cleave technique - typically too much or too little tension, incorrect blade pressure, or a worn cleave blade. Ensure consistent technique: score lightly, apply clean tension, let fibre break naturally. Replace blades when quality degrades."
  },
  {
    question: "Can I reuse optical cleaning wipes?",
    answer: "No. Always use fresh cleaning areas or new wipes for each fibre. A used area can transfer contamination. Use the fold-and-wipe technique: fold the wipe, wipe once, fold to fresh area, repeat. Never re-use the same wipe surface."
  },
  {
    question: "Why does my stripper sometimes damage the fibre?",
    answer: "Strippers have specific hole sizes for different fibre types. Using wrong size damages the cladding. Check you're using the correct stripper for your fibre coating diameter (250μm or 900μm typical). Also check stripper blade condition - worn blades cause nicking. Practice consistent technique with proper tension."
  },
  {
    question: "How often should cleaver blades be rotated or replaced?",
    answer: "Diamond blades on precision cleavers typically have 12-16 positions that can be rotated to fresh cutting edges. Rotate when cleave quality degrades (increased angles, lips). A blade position typically good for 500-2000 cleaves depending on fibre type. Replace the blade when all positions are used."
  },
  {
    question: "What's the difference between stripping 250μm and 900μm buffered fibre?",
    answer: "250μm coated fibre (loose tube cables) has a thin soft coating stripped with thermal strippers or appropriate mechanical strippers. 900μm tight-buffered fibre (patch cords, indoor cables) has a harder buffer requiring specific strippers with larger holes. Some tools have adjustable settings for both types."
  }
];

const FiberOpticsModule4Section2 = () => {
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
            to="/apprentice/study-centre/upskilling/fiber-optics/module4"
            className="flex items-center gap-2 text-white/70 hover:text-white active:scale-[0.98] touch-manipulation min-h-[44px]"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Back to Module 4</span>
          </Link>
          <span className="text-xs text-white/40 hidden sm:block">Section 2 of 5</span>
        </div>
      </header>

      <main className="pt-20 pb-24 px-4 max-w-3xl mx-auto">
        {/* Module Number Badge */}
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-1.5 text-sm text-elec-yellow">
            <Scissors className="w-4 h-4" />
            Module 4 · Section 2
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Cleaving and Fibre Prep
        </h1>

        {/* Quick Summary Card */}
        <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl p-5 border border-orange-500/30 mb-6">
          <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Zap className="w-5 h-5 text-elec-yellow" />
            In 30 Seconds
          </h2>
          <p className="text-white/80 text-sm leading-relaxed">
            Fibre preparation is the foundation of successful splicing. Strip the coating carefully,
            clean thoroughly with IPA and lint-free wipes, then cleave to achieve a perpendicular
            mirror-finish end face. Cleave angles must be under 1° for fusion splicing. Poor
            preparation causes most splice failures - take time to do it right.
          </p>
        </div>

        {/* Spot it / Use it Card */}
        <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-2xl p-5 border border-red-500/20 mb-8">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold text-red-400 mb-2">Tools Required</h3>
              <ul className="text-white/70 text-sm space-y-1">
                <li>• Fibre stripping tool</li>
                <li>• Precision cleaver</li>
                <li>• Lint-free wipes</li>
                <li>• IPA (99%+)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-orange-400 mb-2">Quality Targets</h3>
              <ul className="text-white/70 text-sm space-y-1">
                <li>• Cleave angle: &lt;1°</li>
                <li>• Mirror-like end face</li>
                <li>• No contamination</li>
                <li>• Correct cleave length</li>
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
              "Fibre stripping techniques",
              "Cleaning procedures and materials",
              "Precision cleaving methods",
              "Quality inspection criteria",
              "Common defects and causes",
              "Tool maintenance and care"
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

        {/* Section 1: Stripping Techniques */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
              <span className="text-lg font-bold">01</span>
            </div>
            <h2 className="text-xl font-bold">Fibre Stripping Techniques</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Stripping removes the protective coating to expose bare glass fibre. This must be
              done cleanly without damaging the underlying cladding, which would compromise the
              splice.
            </p>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3">Coating Types</h4>
              <ul className="space-y-2 text-sm">
                <li><strong>250μm primary coating:</strong> Soft acrylate directly on cladding (loose tube cables). Strip 30-40mm for splicing.</li>
                <li><strong>900μm tight buffer:</strong> Hard buffer over primary coating (indoor/patch cables). Strip in stages - first 900μm, then 250μm.</li>
                <li><strong>3mm jacket:</strong> Outer protection on patch cords. Remove with cable stripper or scissors.</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3">Stripping Process</h4>
              <ol className="space-y-2 text-sm">
                <li><strong>1. Select correct stripper:</strong> Match hole size to coating diameter</li>
                <li><strong>2. Position fibre:</strong> Insert through appropriate hole at correct angle</li>
                <li><strong>3. Close and grip:</strong> Apply firm but not excessive pressure</li>
                <li><strong>4. Pull smoothly:</strong> Single steady motion, don't twist</li>
                <li><strong>5. Inspect result:</strong> No coating residue or fibre damage</li>
              </ol>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/30">
                <h4 className="font-semibold text-green-400 mb-2">Good Strip</h4>
                <ul className="text-sm space-y-1 text-white/70">
                  <li>• Clean break at coating edge</li>
                  <li>• No coating residue</li>
                  <li>• No scratches on glass</li>
                  <li>• Bare fibre visible</li>
                </ul>
              </div>
              <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/30">
                <h4 className="font-semibold text-red-400 mb-2">Poor Strip</h4>
                <ul className="text-sm space-y-1 text-white/70">
                  <li>• Coating residue remaining</li>
                  <li>• Nicks in cladding</li>
                  <li>• Broken fibre</li>
                  <li>• Jagged coating edge</li>
                </ul>
              </div>
            </div>

            <div className="bg-elec-yellow/10 rounded-xl p-4 border border-elec-yellow/30">
              <h4 className="font-semibold text-elec-yellow mb-2">Thermal Stripping</h4>
              <p className="text-sm text-white/80">
                For 250μm coated fibres, thermal strippers heat the coating to soften it before
                removal. This reduces stress on the fibre and produces cleaner results than
                mechanical stripping alone. Set temperature per fibre/coating type (typically
                100-150°C).
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Cleaning Procedures */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
              <span className="text-lg font-bold">02</span>
            </div>
            <h2 className="text-xl font-bold">Cleaning Procedures</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Cleaning removes any contamination from the stripped fibre that would cause splice
              defects. This step is critical - even microscopic contamination affects splice
              quality.
            </p>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-400" />
                Cleaning Materials
              </h4>
              <ul className="space-y-2 text-sm">
                <li><strong>Isopropyl alcohol (IPA):</strong> 99%+ purity optical grade. Standard cleaner for fibre work.</li>
                <li><strong>Lint-free wipes:</strong> Purpose-made optical wipes (e.g., Kimwipes). Never use tissues or cloth.</li>
                <li><strong>Optional solvents:</strong> Specialist optical cleaners for stubborn contamination.</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl p-4">
              <h4 className="font-semibold text-white mb-3">The Wet-Dry Wipe Technique</h4>
              <ol className="space-y-2 text-sm">
                <li><strong>1.</strong> Fold lint-free wipe to create multiple clean surfaces</li>
                <li><strong>2.</strong> Wet one section with IPA (not dripping)</li>
                <li><strong>3.</strong> Grip fibre with wet wipe, pull through once</li>
                <li><strong>4.</strong> Fold to dry section</li>
                <li><strong>5.</strong> Pull fibre through dry section once</li>
                <li><strong>6.</strong> Repeat with fresh wipe areas until clean</li>
              </ol>
            </div>

            <div className="bg-orange-500/10 rounded-xl p-4 border border-orange-500/30">
              <h4 className="font-semibold text-orange-300 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Critical Rules
              </h4>
              <ul className="text-sm space-y-1 text-white/80">
                <li>• <strong>Never touch stripped fibre with fingers</strong> - skin oils contaminate</li>
                <li>• <strong>Never re-use wipe surfaces</strong> - transfers contamination</li>
                <li>• <strong>Work in clean area</strong> - avoid dust and debris</li>
                <li>• <strong>Clean immediately before cleaving</strong> - don't let dust settle</li>
                <li>• <strong>Store IPA in sealed container</strong> - absorbs moisture from air</li>
              </ul>
            </div>

            <p>
              After cleaning, the fibre should be cleaved within 30 seconds to prevent dust
              settling. Keep the fibre protected from the environment until ready to cleave.
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

        {/* Section 3: Precision Cleaving */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
              <span className="text-lg font-bold">03</span>
            </div>
            <h2 className="text-xl font-bold">Precision Cleaving</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Cleaving creates a flat, perpendicular end face by controlled fracturing of the
              glass fibre. A diamond blade scores the surface, then tension causes the fibre
              to break cleanly along the score line.
            </p>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Target className="w-4 h-4 text-orange-400" />
                Cleaving Principles
              </h4>
              <ul className="space-y-2 text-sm">
                <li><strong>Scoring:</strong> Diamond blade creates micro-fracture on fibre surface</li>
                <li><strong>Tension:</strong> Controlled pull causes fracture to propagate perpendicular to axis</li>
                <li><strong>Result:</strong> Clean, flat end face with mirror-like finish</li>
                <li><strong>Critical factor:</strong> Angle must be &lt;1° for quality splices</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3">Cleaving Process</h4>
              <ol className="space-y-2 text-sm">
                <li><strong>1. Position fibre:</strong> Place in cleaver with correct stripped length exposed</li>
                <li><strong>2. Secure clamps:</strong> Clamp fibre firmly on both sides of cut point</li>
                <li><strong>3. Set cleave length:</strong> Adjust to splicer specification (typically 10-16mm)</li>
                <li><strong>4. Operate cleaver:</strong> Score and tension (automatic or manual depending on cleaver)</li>
                <li><strong>5. Remove cleaved fibre:</strong> Handle carefully, don't touch end face</li>
                <li><strong>6. Dispose of offcut:</strong> Safely in sharps container - glass splinters are dangerous</li>
              </ol>
            </div>

            <div className="bg-elec-yellow/10 rounded-xl p-4 border border-elec-yellow/30">
              <h4 className="font-semibold text-elec-yellow mb-2">Cleave Length Requirements</h4>
              <p className="text-sm text-white/80 mb-2">
                The cleave length (exposed bare fibre) must match your splicer's specification:
              </p>
              <ul className="text-sm text-white/70 space-y-1">
                <li>• <strong>Typical fusion splicers:</strong> 10-16mm</li>
                <li>• <strong>Ribbon splicers:</strong> May differ - check specification</li>
                <li>• <strong>Mechanical splices:</strong> Per manufacturer (often 10-12mm)</li>
              </ul>
              <p className="text-xs text-white/50 mt-2">
                Incorrect length causes alignment errors or prevents proper splice completion.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h4 className="font-semibold text-orange-400 mb-2">Automatic Cleavers</h4>
                <ul className="text-sm text-white/60 space-y-1">
                  <li>• Consistent results</li>
                  <li>• Controlled tension</li>
                  <li>• Higher cost (£500-2000+)</li>
                  <li>• Faster operation</li>
                  <li>• Recommended for production</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h4 className="font-semibold text-red-400 mb-2">Manual Cleavers</h4>
                <ul className="text-sm text-white/60 space-y-1">
                  <li>• Technique dependent</li>
                  <li>• Manual tension control</li>
                  <li>• Lower cost (£100-500)</li>
                  <li>• Requires more skill</li>
                  <li>• Suitable for low volume</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Quality Inspection */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
              <span className="text-lg font-bold">04</span>
            </div>
            <h2 className="text-xl font-bold">Cleave Quality Inspection</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Inspecting the cleave before splicing catches poor preparations that would cause
              splice failures. Modern fusion splicers display cleave angle, but visual inspection
              is still valuable.
            </p>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Eye className="w-4 h-4 text-blue-400" />
                What to Look For
              </h4>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-green-400 font-medium mb-1">Good Cleave:</p>
                  <ul className="text-white/60 space-y-1">
                    <li>• Mirror-like flat surface</li>
                    <li>• Perpendicular to axis</li>
                    <li>• No chips or cracks</li>
                    <li>• Clean edge profile</li>
                    <li>• Angle &lt;1° on splicer display</li>
                  </ul>
                </div>
                <div>
                  <p className="text-red-400 font-medium mb-1">Defective Cleave:</p>
                  <ul className="text-white/60 space-y-1">
                    <li>• Lip (raised edge)</li>
                    <li>• Hackle (rough/feathered)</li>
                    <li>• Angled face</li>
                    <li>• Chips or breaks</li>
                    <li>• Contamination visible</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl p-4">
              <h4 className="font-semibold text-white mb-3">Common Cleave Defects</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-orange-300 font-medium">Lip</p>
                  <p className="text-white/60">Raised edge on one side. Cause: Uneven tension or blade wear.</p>
                </div>
                <div>
                  <p className="text-red-300 font-medium">Hackle</p>
                  <p className="text-white/60">Rough, feathered surface. Cause: Incorrect tension or contaminated blade.</p>
                </div>
                <div>
                  <p className="text-yellow-300 font-medium">Angle</p>
                  <p className="text-white/60">End face not perpendicular. Cause: Fibre not properly seated, worn blade.</p>
                </div>
                <div>
                  <p className="text-purple-300 font-medium">Chip</p>
                  <p className="text-white/60">Missing section of end face. Cause: Damage during handling or excessive blade pressure.</p>
                </div>
              </div>
            </div>

            <div className="bg-orange-500/10 rounded-xl p-4 border border-orange-500/30">
              <h4 className="font-semibold text-orange-300 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                When to Re-Cleave
              </h4>
              <p className="text-sm text-white/80">
                If inspection reveals any defect, re-cleave immediately. Strip additional coating
                if needed to provide fresh fibre for the new cleave. Never attempt to splice
                a poor cleave - it wastes time and materials. The few seconds to re-cleave is
                always worthwhile.
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

        {/* Section 5: Common Problems */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
              <span className="text-lg font-bold">05</span>
            </div>
            <h2 className="text-xl font-bold">Troubleshooting Common Problems</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Most splice failures trace back to preparation issues. Understanding common problems
              helps prevent them and diagnose issues when they occur.
            </p>

            <div className="space-y-3">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h4 className="font-semibold text-red-400 mb-2">Problem: Fibre Breaking During Stripping</h4>
                <p className="text-sm text-white/60 mb-2"><strong>Causes:</strong> Wrong stripper size, excessive grip pressure, twisting</p>
                <p className="text-sm text-white/70"><strong>Solution:</strong> Match stripper to coating diameter, use firm but not excessive pressure, pull straight without twisting. Check stripper blade condition.</p>
              </div>

              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h4 className="font-semibold text-orange-400 mb-2">Problem: Coating Residue After Stripping</h4>
                <p className="text-sm text-white/60 mb-2"><strong>Causes:</strong> Worn stripper blades, wrong technique, cold coating</p>
                <p className="text-sm text-white/70"><strong>Solution:</strong> Replace or sharpen stripper blades. Use thermal stripper for 250μm. Clean residue with IPA-soaked wipe - may need gentle scrubbing.</p>
              </div>

              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h4 className="font-semibold text-yellow-400 mb-2">Problem: Inconsistent Cleave Angles</h4>
                <p className="text-sm text-white/60 mb-2"><strong>Causes:</strong> Fibre not properly seated, varying tension, worn blade</p>
                <p className="text-sm text-white/70"><strong>Solution:</strong> Ensure fibre fully seated in clamps. Maintain consistent technique. Rotate blade to fresh position. Check cleaver calibration.</p>
              </div>

              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h4 className="font-semibold text-purple-400 mb-2">Problem: High Splice Loss Despite Good Cleaves</h4>
                <p className="text-sm text-white/60 mb-2"><strong>Causes:</strong> Contamination, wrong cleave length, MFD mismatch</p>
                <p className="text-sm text-white/70"><strong>Solution:</strong> Verify cleaning procedure. Check cleave length matches splicer spec. Confirm fibre types are compatible. Clean splicer V-grooves.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Tool Maintenance */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
              <span className="text-lg font-bold">06</span>
            </div>
            <h2 className="text-xl font-bold">Tool Care and Maintenance</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Proper tool maintenance ensures consistent preparation quality and extends tool
              life. Clean tools produce clean results.
            </p>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-elec-yellow" />
                Cleaver Maintenance
              </h4>
              <ul className="space-y-2 text-sm">
                <li><strong>Blade rotation:</strong> Move to fresh cutting position when cleave quality degrades</li>
                <li><strong>Blade cleaning:</strong> Gently clean with IPA if contaminated</li>
                <li><strong>Blade replacement:</strong> Replace when all positions used (track usage)</li>
                <li><strong>Rubber pads:</strong> Replace when worn - they affect grip and tension</li>
                <li><strong>Calibration:</strong> Some cleavers need periodic calibration check</li>
                <li><strong>Storage:</strong> Keep in case, blade protected, away from dust</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3">Stripper Maintenance</h4>
              <ul className="space-y-2 text-sm">
                <li><strong>Clean regularly:</strong> Remove coating debris from holes and blades</li>
                <li><strong>Check blade condition:</strong> Look for nicks or wear that could damage fibre</li>
                <li><strong>Verify hole sizes:</strong> Ensure proper sizing for fibre types</li>
                <li><strong>Replace blades:</strong> When stripping quality degrades</li>
                <li><strong>Store properly:</strong> Keep clean and protected</li>
              </ul>
            </div>

            <div className="bg-elec-yellow/10 rounded-xl p-4 border border-elec-yellow/30">
              <h4 className="font-semibold text-elec-yellow mb-2">Consumables Management</h4>
              <ul className="text-sm space-y-1 text-white/80">
                <li>• <strong>IPA:</strong> Keep sealed, use optical grade, replace if contaminated</li>
                <li>• <strong>Wipes:</strong> Store in sealed container, don't touch cleaning surfaces</li>
                <li>• <strong>Track usage:</strong> Log cleave blade position changes and replacements</li>
                <li>• <strong>Stock spares:</strong> Keep replacement blades, pads, and consumables on hand</li>
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
              <h4 className="font-semibold text-green-400 mb-2">Best Practice Tips</h4>
              <ul className="text-sm text-white/70 space-y-2">
                <li>• <strong>Consistent workflow:</strong> Strip → Clean → Cleave → Splice - same order every time</li>
                <li>• <strong>Work clean:</strong> Keep work area free of dust and debris</li>
                <li>• <strong>Quality first:</strong> Re-do any preparation step that doesn't look right</li>
                <li>• <strong>Practice technique:</strong> Develop muscle memory for consistent results</li>
                <li>• <strong>Inspect always:</strong> Never skip visual inspection of cleaves</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-xl p-4 border border-red-500/20">
              <h4 className="font-semibold text-red-400 mb-2">Safety Reminders</h4>
              <ul className="text-sm text-white/70 space-y-2">
                <li>• <strong>Glass hazard:</strong> Fibre offcuts are sharp - use sharps container</li>
                <li>• <strong>Eye protection:</strong> Wear safety glasses when cleaving</li>
                <li>• <strong>No eating/drinking:</strong> Glass fragments are dangerous if ingested</li>
                <li>• <strong>Clean up thoroughly:</strong> Glass splinters can cause injury hours later</li>
                <li>• <strong>Ventilation:</strong> Use IPA in well-ventilated area</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 rounded-xl p-4 border border-orange-500/20">
              <h4 className="font-semibold text-orange-400 mb-2">Field Work Considerations</h4>
              <ul className="text-sm text-white/70 space-y-2">
                <li>• <strong>Wind protection:</strong> Work in vehicle or shelter - wind contaminates fibres</li>
                <li>• <strong>Temperature:</strong> Cold affects coating flexibility - warm if needed</li>
                <li>• <strong>Lighting:</strong> Good light essential for inspection</li>
                <li>• <strong>Organisation:</strong> Keep tools accessible but protected</li>
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
          <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl p-5 border border-orange-500/30">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Scissors className="w-5 h-5 text-orange-400" />
              Quick Reference: Fibre Preparation
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-semibold text-orange-300 mb-2">Process Checklist</h4>
                <ul className="text-xs text-white/70 space-y-1">
                  <li>☐ Strip coating cleanly</li>
                  <li>☐ Clean with IPA + lint-free wipe</li>
                  <li>☐ Cleave to correct length</li>
                  <li>☐ Inspect cleave angle &lt;1°</li>
                  <li>☐ Verify mirror-like end face</li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-red-300 mb-2">Quality Standards</h4>
                <ul className="text-xs text-white/70 space-y-1">
                  <li>• Cleave angle: &lt;1° (0.5° ideal)</li>
                  <li>• No lip, hackle, or chips</li>
                  <li>• No contamination visible</li>
                  <li>• Cleave length per splicer spec</li>
                  <li>• If in doubt, re-cleave!</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-xs text-white/50">
                Remember: 90% of splice problems trace back to preparation. Take time to do it right.
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
            to="/apprentice/study-centre/upskilling/fiber-optics/module4/section1"
            className="w-full sm:w-auto"
          >
            <Button
              variant="ghost"
              className="w-full sm:w-auto gap-2 text-white/70 hover:text-white min-h-[44px] touch-manipulation"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous: Mechanical vs Fusion Splicing
            </Button>
          </Link>
          <Link
            to="/apprentice/study-centre/upskilling/fiber-optics/module4/section3"
            className="w-full sm:w-auto"
          >
            <Button
              className="w-full sm:w-auto gap-2 bg-elec-yellow text-black hover:bg-elec-yellow/90 min-h-[44px] touch-manipulation"
            >
              Next: Splicing Equipment Overview
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default FiberOpticsModule4Section2;
