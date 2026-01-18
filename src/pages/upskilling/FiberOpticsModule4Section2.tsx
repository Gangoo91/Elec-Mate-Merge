import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Cleaving and Fibre Prep - Fibre Optics Technology";
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
    id: 1,
    question: "What tool is used to remove the buffer coating from optical fibre?",
    options: [
      "Wire strippers",
      "Fibre stripping tool with precision holes",
      "Knife",
      "Sandpaper"
    ],
    correctAnswer: 1,
    explanation: "Fibre stripping tools have precision-sized holes that match specific coating diameters, allowing clean removal without damaging the cladding."
  },
  {
    id: 2,
    question: "What is the purpose of scoring the fibre before cleaving?",
    options: [
      "To mark the cut position",
      "To create a controlled fracture point",
      "To weaken the coating",
      "To clean the fibre"
    ],
    correctAnswer: 1,
    explanation: "Scoring creates a micro-fracture on the fibre surface that controls where the break occurs when tension is applied."
  },
  {
    id: 3,
    question: "What type of wipe should be used for cleaning stripped fibre?",
    options: [
      "Paper tissue",
      "Cotton cloth",
      "Lint-free optical wipes",
      "Any clean fabric"
    ],
    correctAnswer: 2,
    explanation: "Lint-free optical wipes are purpose-made to clean fibre without leaving fibres or residue that would contaminate the end face."
  },
  {
    id: 4,
    question: "What cleaning solution is typically used for fibre preparation?",
    options: [
      "Water",
      "Isopropyl alcohol (IPA) 99%+",
      "General purpose cleaner",
      "Acetone only"
    ],
    correctAnswer: 1,
    explanation: "High-purity IPA (99%+) is the standard cleaner for fibre work as it evaporates cleanly without leaving residue."
  },
  {
    id: 5,
    question: "What happens if fibre is cleaved at too steep an angle?",
    options: [
      "Better reflection",
      "High splice loss or splice failure",
      "Improved alignment",
      "No significant effect"
    ],
    correctAnswer: 1,
    explanation: "Angled cleaves prevent proper core alignment during splicing, resulting in high loss or complete splice failure."
  },
  {
    id: 6,
    question: "How should cleaved fibre ends be handled?",
    options: [
      "Place anywhere convenient",
      "Keep protected, never touch, inspect before use",
      "Touch to check sharpness",
      "Leave exposed in open air"
    ],
    correctAnswer: 1,
    explanation: "Cleaved ends must be protected from contamination and physical contact to maintain the quality needed for splicing."
  },
  {
    id: 7,
    question: "What is the typical cleave length for fusion splicing?",
    options: [
      "5-8mm",
      "10-16mm (per splicer specification)",
      "20-25mm",
      "2-4mm"
    ],
    correctAnswer: 1,
    explanation: "Most fusion splicers require 10-16mm of exposed fibre. Check your specific splicer's requirements."
  },
  {
    id: 8,
    question: "What visual defect indicates a poor cleave?",
    options: [
      "Clean mirror-like surface",
      "Lip, hackle, or angled face",
      "Round profile",
      "Clear end face"
    ],
    correctAnswer: 1,
    explanation: "Lips (raised edges), hackle (rough texture), and angled faces all indicate cleaving problems that will affect splice quality."
  },
  {
    id: 9,
    question: "Why is cleave length consistency important?",
    options: [
      "For appearance only",
      "Fusion splicer requires specific length for proper alignment",
      "To save fibre",
      "For documentation"
    ],
    correctAnswer: 1,
    explanation: "Splicers are designed for specific fibre lengths. Incorrect length causes alignment errors or prevents proper splice completion."
  },
  {
    id: 10,
    question: "What should you do if a cleave looks poor under inspection?",
    options: [
      "Try splicing anyway",
      "Re-cleave with fresh fibre end",
      "Use more gel",
      "Adjust the splicer"
    ],
    correctAnswer: 1,
    explanation: "Re-cleaving takes only seconds and prevents wasted time on failed splices. Never attempt to splice a poor cleave."
  }
];

const faqs = [
  {
    question: "How do I know if my cleave is good enough?",
    answer: "A good cleave has a mirror-like flat end face perpendicular to the fibre axis. Inspect under magnification - look for no lips, hackle marks, chips, or angles. Fusion splicers display cleave angle; aim for under 1 degree. If in doubt, re-cleave. The few seconds spent re-cleaving saves time on failed splices."
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
    answer: "Strippers have specific hole sizes for different fibre types. Using wrong size damages the cladding. Check you are using the correct stripper for your fibre coating diameter (250 micrometre or 900 micrometre typical). Also check stripper blade condition - worn blades cause nicking. Practice consistent technique with proper tension."
  },
  {
    question: "How often should cleaver blades be rotated or replaced?",
    answer: "Diamond blades on precision cleavers typically have 12-16 positions that can be rotated to fresh cutting edges. Rotate when cleave quality degrades (increased angles, lips). A blade position typically good for 500-2000 cleaves depending on fibre type. Replace the blade when all positions are used."
  },
  {
    question: "What is the difference between stripping 250 micrometre and 900 micrometre buffered fibre?",
    answer: "250 micrometre coated fibre (loose tube cables) has a thin soft coating stripped with thermal strippers or appropriate mechanical strippers. 900 micrometre tight-buffered fibre (patch cords, indoor cables) has a harder buffer requiring specific strippers with larger holes. Some tools have adjustable settings for both types."
  }
];

const FiberOpticsModule4Section2 = () => {
  useSEO({
    title: TITLE,
    description: DESCRIPTION,
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/fiber-optics-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12 max-w-3xl mx-auto">
        {/* Centred Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 4 Section 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Cleaving and Fibre Prep
          </h1>
          <p className="text-white/80">
            Master fibre preparation techniques for successful splicing
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Process:</strong> Strip, clean, cleave</li>
              <li><strong>Cleave angle:</strong> Under 1 degree required</li>
              <li><strong>End face:</strong> Mirror-like flat surface</li>
              <li><strong>Critical:</strong> No contamination allowed</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Lip, hackle, or angled face = re-cleave</li>
              <li><strong>Use:</strong> Precision cleaver, lint-free wipes, IPA</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Fibre stripping techniques for different coating types",
              "Cleaning procedures and materials",
              "Precision cleaving methods and equipment",
              "Quality inspection criteria for cleaves",
              "Common defects and their causes",
              "Tool maintenance and care"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Fibre Stripping Techniques */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Fibre Stripping Techniques
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Stripping removes the protective coating to expose bare glass fibre. This must be
              done cleanly without damaging the underlying cladding, which would compromise the
              splice.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Coating Types:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>250 micrometre primary coating:</strong> Soft acrylate directly on cladding (loose tube cables). Strip 30-40mm for splicing.</li>
                <li><strong>900 micrometre tight buffer:</strong> Hard buffer over primary coating (indoor/patch cables). Strip in stages - first 900 micrometre, then 250 micrometre.</li>
                <li><strong>3mm jacket:</strong> Outer protection on patch cords. Remove with cable stripper or scissors.</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Stripping Process:</p>
              <ol className="text-sm text-white space-y-1 ml-4 list-decimal list-inside">
                <li>Select correct stripper: Match hole size to coating diameter</li>
                <li>Position fibre: Insert through appropriate hole at correct angle</li>
                <li>Close and grip: Apply firm but not excessive pressure</li>
                <li>Pull smoothly: Single steady motion, do not twist</li>
                <li>Inspect result: No coating residue or fibre damage</li>
              </ol>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Thermal Stripping</p>
              <p className="text-sm text-white">
                For 250 micrometre coated fibres, thermal strippers heat the coating to soften it before
                removal. This reduces stress on the fibre and produces cleaner results than
                mechanical stripping alone. Set temperature per fibre/coating type (typically
                100-150 degrees Celsius).
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Cleaning Procedures */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Cleaning Procedures
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Cleaning removes any contamination from the stripped fibre that would cause splice
              defects. This step is critical - even microscopic contamination affects splice
              quality.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Cleaning Materials:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Isopropyl alcohol (IPA):</strong> 99%+ purity optical grade. Standard cleaner for fibre work.</li>
                <li><strong>Lint-free wipes:</strong> Purpose-made optical wipes (e.g., Kimwipes). Never use tissues or cloth.</li>
                <li><strong>Optional solvents:</strong> Specialist optical cleaners for stubborn contamination.</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">The Wet-Dry Wipe Technique:</p>
              <ol className="text-sm text-white space-y-1 ml-4 list-decimal list-inside">
                <li>Fold lint-free wipe to create multiple clean surfaces</li>
                <li>Wet one section with IPA (not dripping)</li>
                <li>Grip fibre with wet wipe, pull through once</li>
                <li>Fold to dry section</li>
                <li>Pull fibre through dry section once</li>
                <li>Repeat with fresh wipe areas until clean</li>
              </ol>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
              <p className="text-sm font-medium text-red-400 mb-2">Critical Rules</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Never touch stripped fibre with fingers</strong> - skin oils contaminate</li>
                <li><strong>Never re-use wipe surfaces</strong> - transfers contamination</li>
                <li><strong>Work in clean area</strong> - avoid dust and debris</li>
                <li><strong>Clean immediately before cleaving</strong> - do not let dust settle</li>
                <li><strong>Store IPA in sealed container</strong> - absorbs moisture from air</li>
              </ul>
            </div>

            <p>
              After cleaning, the fibre should be cleaved within 30 seconds to prevent dust
              settling. Keep the fibre protected from the environment until ready to cleave.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Precision Cleaving */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Precision Cleaving
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Cleaving creates a flat, perpendicular end face by controlled fracturing of the
              glass fibre. A diamond blade scores the surface, then tension causes the fibre
              to break cleanly along the score line.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Cleaving Principles:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Scoring:</strong> Diamond blade creates micro-fracture on fibre surface</li>
                <li><strong>Tension:</strong> Controlled pull causes fracture to propagate perpendicular to axis</li>
                <li><strong>Result:</strong> Clean, flat end face with mirror-like finish</li>
                <li><strong>Critical factor:</strong> Angle must be under 1 degree for quality splices</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Cleaving Process:</p>
              <ol className="text-sm text-white space-y-1 ml-4 list-decimal list-inside">
                <li>Position fibre: Place in cleaver with correct stripped length exposed</li>
                <li>Secure clamps: Clamp fibre firmly on both sides of cut point</li>
                <li>Set cleave length: Adjust to splicer specification (typically 10-16mm)</li>
                <li>Operate cleaver: Score and tension (automatic or manual depending on cleaver)</li>
                <li>Remove cleaved fibre: Handle carefully, do not touch end face</li>
                <li>Dispose of offcut: Safely in sharps container - glass splinters are dangerous</li>
              </ol>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Cleave Length Requirements</p>
              <p className="text-sm text-white mb-2">
                The cleave length (exposed bare fibre) must match your splicer's specification:
              </p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Typical fusion splicers:</strong> 10-16mm</li>
                <li><strong>Ribbon splicers:</strong> May differ - check specification</li>
                <li><strong>Mechanical splices:</strong> Per manufacturer (often 10-12mm)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Cleaver Types:</p>
              <div className="grid sm:grid-cols-2 gap-4 mt-2">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-sm font-medium text-elec-yellow mb-2">Automatic Cleavers</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Consistent results</li>
                    <li>Controlled tension</li>
                    <li>Higher cost (500-2000 pounds+)</li>
                    <li>Faster operation</li>
                    <li>Recommended for production</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-sm font-medium text-elec-yellow mb-2">Manual Cleavers</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Technique dependent</li>
                    <li>Manual tension control</li>
                    <li>Lower cost (100-500 pounds)</li>
                    <li>Requires more skill</li>
                    <li>Suitable for low volume</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Quality Inspection */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Cleave Quality Inspection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Inspecting the cleave before splicing catches poor preparations that would cause
              splice failures. Modern fusion splicers display cleave angle, but visual inspection
              is still valuable.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">What to Look For:</p>
              <div className="grid sm:grid-cols-2 gap-4 mt-2">
                <div className="p-4 rounded-lg bg-green-500/10 border-l-2 border-green-500/50">
                  <p className="text-sm font-medium text-green-400 mb-2">Good Cleave</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Mirror-like flat surface</li>
                    <li>Perpendicular to axis</li>
                    <li>No chips or cracks</li>
                    <li>Clean edge profile</li>
                    <li>Angle under 1 degree on splicer display</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
                  <p className="text-sm font-medium text-red-400 mb-2">Defective Cleave</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Lip (raised edge)</li>
                    <li>Hackle (rough/feathered)</li>
                    <li>Angled face</li>
                    <li>Chips or breaks</li>
                    <li>Contamination visible</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common Cleave Defects:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Lip:</strong> Raised edge on one side. Cause: Uneven tension or blade wear.</li>
                <li><strong>Hackle:</strong> Rough, feathered surface. Cause: Incorrect tension or contaminated blade.</li>
                <li><strong>Angle:</strong> End face not perpendicular. Cause: Fibre not properly seated, worn blade.</li>
                <li><strong>Chip:</strong> Missing section of end face. Cause: Damage during handling or excessive blade pressure.</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">When to Re-Cleave</p>
              <p className="text-sm text-white">
                If inspection reveals any defect, re-cleave immediately. Strip additional coating
                if needed to provide fresh fibre for the new cleave. Never attempt to splice
                a poor cleave - it wastes time and materials. The few seconds to re-cleave is
                always worthwhile.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Common Problems */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Troubleshooting Common Problems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Most splice failures trace back to preparation issues. Understanding common problems
              helps prevent them and diagnose issues when they occur.
            </p>

            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm font-medium text-red-400 mb-2">Problem: Fibre Breaking During Stripping</p>
                <p className="text-sm text-white mb-1"><strong>Causes:</strong> Wrong stripper size, excessive grip pressure, twisting</p>
                <p className="text-sm text-white"><strong>Solution:</strong> Match stripper to coating diameter, use firm but not excessive pressure, pull straight without twisting. Check stripper blade condition.</p>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm font-medium text-elec-yellow mb-2">Problem: Coating Residue After Stripping</p>
                <p className="text-sm text-white mb-1"><strong>Causes:</strong> Worn stripper blades, wrong technique, cold coating</p>
                <p className="text-sm text-white"><strong>Solution:</strong> Replace or sharpen stripper blades. Use thermal stripper for 250 micrometre. Clean residue with IPA-soaked wipe - may need gentle scrubbing.</p>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm font-medium text-elec-yellow mb-2">Problem: Inconsistent Cleave Angles</p>
                <p className="text-sm text-white mb-1"><strong>Causes:</strong> Fibre not properly seated, varying tension, worn blade</p>
                <p className="text-sm text-white"><strong>Solution:</strong> Ensure fibre fully seated in clamps. Maintain consistent technique. Rotate blade to fresh position. Check cleaver calibration.</p>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm font-medium text-elec-yellow mb-2">Problem: High Splice Loss Despite Good Cleaves</p>
                <p className="text-sm text-white mb-1"><strong>Causes:</strong> Contamination, wrong cleave length, MFD mismatch</p>
                <p className="text-sm text-white"><strong>Solution:</strong> Verify cleaning procedure. Check cleave length matches splicer spec. Confirm fibre types are compatible. Clean splicer V-grooves.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Tool Maintenance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Tool Care and Maintenance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Proper tool maintenance ensures consistent preparation quality and extends tool
              life. Clean tools produce clean results.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Cleaver Maintenance:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Blade rotation:</strong> Move to fresh cutting position when cleave quality degrades</li>
                <li><strong>Blade cleaning:</strong> Gently clean with IPA if contaminated</li>
                <li><strong>Blade replacement:</strong> Replace when all positions used (track usage)</li>
                <li><strong>Rubber pads:</strong> Replace when worn - they affect grip and tension</li>
                <li><strong>Calibration:</strong> Some cleavers need periodic calibration check</li>
                <li><strong>Storage:</strong> Keep in case, blade protected, away from dust</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Stripper Maintenance:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Clean regularly:</strong> Remove coating debris from holes and blades</li>
                <li><strong>Check blade condition:</strong> Look for nicks or wear that could damage fibre</li>
                <li><strong>Verify hole sizes:</strong> Ensure proper sizing for fibre types</li>
                <li><strong>Replace blades:</strong> When stripping quality degrades</li>
                <li><strong>Store properly:</strong> Keep clean and protected</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Consumables Management</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>IPA:</strong> Keep sealed, use optical grade, replace if contaminated</li>
                <li><strong>Wipes:</strong> Store in sealed container, do not touch cleaning surfaces</li>
                <li><strong>Track usage:</strong> Log cleave blade position changes and replacements</li>
                <li><strong>Stock spares:</strong> Keep replacement blades, pads, and consumables on hand</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Best Practice Tips</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Consistent workflow:</strong> Strip, Clean, Cleave, Splice - same order every time</li>
                <li><strong>Work clean:</strong> Keep work area free of dust and debris</li>
                <li><strong>Quality first:</strong> Re-do any preparation step that does not look right</li>
                <li><strong>Practice technique:</strong> Develop muscle memory for consistent results</li>
                <li><strong>Inspect always:</strong> Never skip visual inspection of cleaves</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Safety Reminders</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Glass hazard:</strong> Fibre offcuts are sharp - use sharps container</li>
                <li><strong>Eye protection:</strong> Wear safety glasses when cleaving</li>
                <li><strong>No eating/drinking:</strong> Glass fragments are dangerous if ingested</li>
                <li><strong>Clean up thoroughly:</strong> Glass splinters can cause injury hours later</li>
                <li><strong>Ventilation:</strong> Use IPA in well-ventilated area</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Rushing preparation</strong> - quality suffers when you skip steps</li>
                <li><strong>Re-using wipe surfaces</strong> - transfers contamination</li>
                <li><strong>Touching stripped fibre</strong> - skin oils contaminate</li>
                <li><strong>Using wrong stripper size</strong> - damages cladding</li>
                <li><strong>Ignoring blade wear</strong> - produces poor cleaves</li>
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
          <div className="p-5 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference: Fibre Preparation</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-elec-yellow mb-1">Process Checklist</p>
                <ul className="space-y-0.5">
                  <li>1. Strip coating cleanly</li>
                  <li>2. Clean with IPA + lint-free wipe</li>
                  <li>3. Cleave to correct length</li>
                  <li>4. Inspect cleave angle (under 1 degree)</li>
                  <li>5. Verify mirror-like end face</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-elec-yellow mb-1">Quality Standards</p>
                <ul className="space-y-0.5">
                  <li>Cleave angle: Under 1 degree (0.5 degree ideal)</li>
                  <li>No lip, hackle, or chips</li>
                  <li>No contamination visible</li>
                  <li>Cleave length per splicer spec</li>
                  <li>If in doubt, re-cleave!</li>
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
            <Link to="../section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default FiberOpticsModule4Section2;
