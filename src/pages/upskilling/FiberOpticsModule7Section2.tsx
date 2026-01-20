import { ArrowLeft, Droplets, Eye, Zap, CheckCircle, AlertTriangle, BookOpen, Target, Shield, Sparkles, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "End-Face Contamination and Cleaning - Fibre Optics Technology";
const DESCRIPTION = "Master fibre optic connector inspection and cleaning techniques including contamination types, inspection scopes, dry and wet cleaning methods, and IEC cleanliness standards.";

const quickCheckQuestions = [
  {
    question: "What is the correct sequence for fibre connector cleaning?",
    options: [
      { text: "Wet clean only, then connect", isCorrect: false },
      { text: "Inspect, clean, re-inspect before connecting", isCorrect: true },
      { text: "Clean without inspection, then connect", isCorrect: false },
      { text: "Connect first, clean only if problems occur", isCorrect: false }
    ],
    explanation: "The correct procedure is: Inspect → Clean → Re-inspect. Always verify cleanliness before mating connectors. Never connect without first confirming the end-face is clean."
  },
  {
    question: "When should wet cleaning be used instead of dry cleaning?",
    options: [
      { text: "For all routine cleaning", isCorrect: false },
      { text: "Only for APC connectors", isCorrect: false },
      { text: "When dry cleaning fails to remove contamination", isCorrect: true },
      { text: "Never—always use dry cleaning only", isCorrect: false }
    ],
    explanation: "Dry cleaning is preferred as the first attempt. Wet cleaning (using IPA or approved solvents) is used when dry cleaning fails to remove stubborn contamination like oils or residues."
  },
  {
    question: "According to IEC 61300-3-35, what contamination level requires cleaning before use?",
    options: [
      { text: "Any visible contamination in any zone", isCorrect: false },
      { text: "Contamination in core or cladding zones", isCorrect: true },
      { text: "Only contamination directly on the fibre core", isCorrect: false },
      { text: "More than 10 particles anywhere on end-face", isCorrect: false }
    ],
    explanation: "IEC 61300-3-35 specifies no defects or contamination in the core zone (Zone A) and limited contamination in the cladding zone (Zone B). The outer contact zone (Zone C/D) allows more contamination."
  }
];

const quizQuestions = [
  {
    question: "What is the primary cause of most fibre optic connection failures?",
    options: [
      { text: "Fibre breaks", isCorrect: false },
      { text: "Connector contamination", isCorrect: true },
      { text: "Incompatible equipment", isCorrect: false },
      { text: "Wrong fibre type", isCorrect: false }
    ],
    explanation: "Studies consistently show that contamination is responsible for the majority of fibre link problems—some estimates suggest up to 80% of all connection issues are contamination-related."
  },
  {
    question: "What magnification is typically required for proper fibre end-face inspection?",
    options: [
      { text: "10× magnification", isCorrect: false },
      { text: "100× magnification", isCorrect: false },
      { text: "200-400× magnification", isCorrect: true },
      { text: "1000× magnification", isCorrect: false }
    ],
    explanation: "200-400× magnification is standard for fibre inspection scopes. This provides sufficient detail to see contamination in the core and cladding zones while maintaining adequate field of view."
  },
  {
    question: "What type of contamination appears as dark spots that don't move when you blow on them?",
    options: [
      { text: "Dust particles", isCorrect: false },
      { text: "Oils or film contamination", isCorrect: false },
      { text: "Pits or scratches (permanent damage)", isCorrect: true },
      { text: "Index matching gel residue", isCorrect: false }
    ],
    explanation: "Dark spots that don't move with air flow and can't be cleaned are typically physical damage—pits, scratches, or chips in the glass. These require connector replacement."
  },
  {
    question: "Which cleaning method should be attempted first?",
    options: [
      { text: "Wet cleaning with IPA", isCorrect: false },
      { text: "Dry cleaning with lint-free wipes", isCorrect: true },
      { text: "Ultrasonic cleaning", isCorrect: false },
      { text: "Abrasive polishing", isCorrect: false }
    ],
    explanation: "Dry cleaning is preferred as the first method because it removes most contamination effectively without risk of leaving solvent residue. Wet cleaning is used only if dry cleaning fails."
  },
  {
    question: "What is the purpose of the 'push-and-turn' technique when using a cleaning stick?",
    options: [
      { text: "To polish the connector end-face", isCorrect: false },
      { text: "To ensure contact across the entire end-face and lift contamination", isCorrect: true },
      { text: "To test the connector spring tension", isCorrect: false },
      { text: "To align the fibre core", isCorrect: false }
    ],
    explanation: "The push-and-turn technique ensures the cleaning material contacts all areas of the end-face while the turning motion helps lift and remove contamination rather than just pushing it around."
  },
  {
    question: "What should you do if a connector fails inspection after multiple cleaning attempts?",
    options: [
      { text: "Use more aggressive cleaning chemicals", isCorrect: false },
      { text: "Connect it anyway—some contamination is acceptable", isCorrect: false },
      { text: "Assume permanent damage and replace the connector", isCorrect: true },
      { text: "Leave it overnight and try again", isCorrect: false }
    ],
    explanation: "If contamination won't clean off after proper wet cleaning attempts, it's likely permanent damage (scratches, pits). The connector should be replaced rather than risk damaging its mating partner."
  },
  {
    question: "Why should dust caps always be replaced after inspection/cleaning?",
    options: [
      { text: "To protect against ESD damage", isCorrect: false },
      { text: "To prevent contamination between cleaning and connection", isCorrect: true },
      { text: "Because regulations require it", isCorrect: false },
      { text: "To maintain connector alignment", isCorrect: false }
    ],
    explanation: "Dust caps protect cleaned connectors from re-contamination. Even seconds of exposure can allow dust to settle on the end-face. Keep caps on until immediately before mating."
  },
  {
    question: "What type of inspection scope allows viewing connectors installed in patch panels?",
    options: [
      { text: "Bench-top microscope", isCorrect: false },
      { text: "Hand-held video probe (tip inspection scope)", isCorrect: true },
      { text: "Standard magnifying glass", isCorrect: false },
      { text: "OTDR with visual display", isCorrect: false }
    ],
    explanation: "Tip inspection probes (video probes) have small diameter tips that insert into adapter sleeves to view installed connectors without removing them. Essential for patch panel inspection."
  },
  {
    question: "How does 99% IPA differ from 70% IPA for fibre cleaning?",
    options: [
      { text: "70% is more effective at cleaning", isCorrect: false },
      { text: "99% evaporates faster leaving less residue", isCorrect: true },
      { text: "They are identical for fibre cleaning", isCorrect: false },
      { text: "70% is safer to use", isCorrect: false }
    ],
    explanation: "99% (or higher) IPA is preferred because it evaporates quickly leaving minimal residue. 70% IPA contains more water which evaporates slowly and can leave residue or water marks."
  },
  {
    question: "What should you NEVER do when cleaning fibre connectors?",
    options: [
      { text: "Use a microscope before cleaning", isCorrect: false },
      { text: "Re-use the same cleaning surface twice", isCorrect: true },
      { text: "Clean both connector end-faces before mating", isCorrect: false },
      { text: "Inspect after cleaning", isCorrect: false }
    ],
    explanation: "Never re-use a cleaning surface—you risk transferring contamination back onto the connector. Always use a fresh section of cleaning material for each wipe."
  }
];

const faqs = [
  {
    question: "Can I clean connectors without an inspection scope?",
    answer: "While you can perform cleaning without inspection, it's strongly discouraged. Without inspection, you cannot verify the connector was dirty, confirm cleaning was successful, or identify permanent damage. Industry best practice requires 'inspect-clean-inspect' for all critical connections."
  },
  {
    question: "How often should I clean connectors in a patch panel?",
    answer: "Clean connectors each time they are mated—even if they were just cleaned previously. Also inspect periodically (every 6-12 months) in high-traffic areas. Dust accumulates even on protected connectors over time."
  },
  {
    question: "What's the difference between one-click cleaners and cleaning sticks?",
    answer: "One-click cleaners are pen-style devices with a built-in cleaning tip that advances with each click—convenient for field use. Cleaning sticks (cletops/swabs) are single-use sticks. Both are effective; choice depends on connector type and personal preference."
  },
  {
    question: "Can compressed air clean fibre connectors effectively?",
    answer: "Compressed air can remove loose particles but cannot remove oils, films, or stuck contamination. It should be used carefully (clean, dry, filtered air only) and is best as a first step before dry cleaning—never as the only cleaning method."
  },
  {
    question: "Why do APC connectors require special cleaning attention?",
    answer: "APC connectors have an 8° angled end-face which can be more prone to trapping contamination at the edge. The angle also makes inspection slightly more challenging. Use cleaners specifically designed for APC connectors to ensure proper contact across the angled surface."
  },
  {
    question: "Is isopropyl alcohol safe for all connector types?",
    answer: "99%+ IPA is safe for most connectors and recommended for fibre cleaning. However, some plastic components in certain connector housings may be sensitive to solvents. Always check manufacturer recommendations and avoid soaking—use minimal amounts that evaporate quickly."
  }
];

const FiberOpticsModule7Section2 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/electrical-upskilling/fiber-optics-module-7" className="flex items-center gap-2 text-elec-yellow hover:text-elec-yellow/80 transition-colors min-h-[44px] touch-manipulation active:scale-[0.98]">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Module 7</span>
          </Link>
          <span className="text-white/50 text-sm">Section 2 of 5</span>
        </div>
      </div>

      {/* Title Header */}
      <div className="px-4 pt-8 pb-6 bg-gradient-to-b from-[#1a1a1a] to-[#222]">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block bg-elec-yellow/20 text-elec-yellow text-xs font-bold px-3 py-1.5 rounded-full mb-4">
            MODULE 7 · SECTION 2
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            End-Face Contamination and Cleaning
          </h1>
          <p className="text-white/70 text-lg">
            Master inspection and cleaning techniques that prevent the majority of fibre problems
          </p>
        </div>
      </div>

      <div className="px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Quick Summary Boxes */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="bg-[#252525] rounded-lg p-4 border border-white/10">
              <Eye className="w-6 h-6 text-elec-yellow mb-2" />
              <h3 className="text-white font-semibold text-sm mb-1">Inspection</h3>
              <p className="text-white/60 text-xs">200-400× magnification scopes and techniques</p>
            </div>
            <div className="bg-[#252525] rounded-lg p-4 border border-white/10">
              <Sparkles className="w-6 h-6 text-elec-yellow mb-2" />
              <h3 className="text-white font-semibold text-sm mb-1">Cleaning</h3>
              <p className="text-white/60 text-xs">Dry and wet methods for all connector types</p>
            </div>
          </div>

          {/* Learning Outcomes */}
          <div className="bg-[#252525] rounded-xl p-6 border border-white/10 mb-10">
            <h2 className="flex items-center gap-2 text-xl font-bold text-white mb-4">
              <Target className="w-5 h-5 text-elec-yellow" />
              Learning Outcomes
            </h2>
            <ul className="space-y-3">
              {[
                "Identify different types of contamination and their sources",
                "Use inspection scopes to assess connector cleanliness",
                "Apply dry cleaning techniques correctly",
                "Perform wet cleaning when required",
                "Apply IEC 61300-3-35 cleanliness standards"
              ].map((outcome, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-white/80">{outcome}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 01: Why Cleaning Matters */}
          <section className="mb-12">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Why Cleaning Matters
            </h2>

            <div className="space-y-4 text-white/80 mb-6">
              <p>
                Fibre optic connectors present an extremely small optical interface—the core of a singlemode fibre is only 9 micrometres (µm) in diameter. For comparison, a human hair is approximately 70 µm, and common dust particles range from 1-10 µm. Even tiny contamination can significantly impact performance.
              </p>
            </div>

            {/* Impact Statistics */}
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-5 mb-6">
              <h4 className="font-semibold text-red-400 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                The Cost of Contamination
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-[#1a1a1a] rounded-lg">
                  <div className="text-3xl font-bold text-red-400">~80%</div>
                  <div className="text-white/60 text-sm">of link failures caused by contamination</div>
                </div>
                <div className="text-center p-3 bg-[#1a1a1a] rounded-lg">
                  <div className="text-3xl font-bold text-red-400">1 µm</div>
                  <div className="text-white/60 text-sm">particle can cover 1% of SM core</div>
                </div>
              </div>
            </div>

            {/* Size Comparison */}
            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4">Size Comparison</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-16 text-right text-elec-yellow font-mono text-sm">9 µm</div>
                  <div className="flex-1 h-2 bg-elec-yellow/80 rounded" style={{width: '9%'}}></div>
                  <span className="text-white/60 text-sm">Singlemode core</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-16 text-right text-blue-400 font-mono text-sm">50 µm</div>
                  <div className="flex-1 h-2 bg-blue-500/80 rounded" style={{width: '50%'}}></div>
                  <span className="text-white/60 text-sm">Multimode core</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-16 text-right text-amber-400 font-mono text-sm">70 µm</div>
                  <div className="flex-1 h-2 bg-amber-500/80 rounded" style={{width: '70%'}}></div>
                  <span className="text-white/60 text-sm">Human hair</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-16 text-right text-green-400 font-mono text-sm">125 µm</div>
                  <div className="flex-1 h-2 bg-green-500/80 rounded" style={{width: '100%'}}></div>
                  <span className="text-white/60 text-sm">Fibre cladding</span>
                </div>
              </div>
            </div>
          </section>

          {/* Section 02: Types of Contamination */}
          <section className="mb-12">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Types of Contamination
            </h2>

            <div className="space-y-4 text-white/80 mb-6">
              <p>
                Different contaminants require different cleaning approaches. Understanding what you're looking at during inspection helps determine the correct response.
              </p>
            </div>

            {/* Contamination Types */}
            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4">Contamination Categories</h4>
              <div className="space-y-4">
                <div className="border-b border-white/10 pb-4">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-amber-400 text-lg">•</span>
                    </div>
                    <div>
                      <h5 className="text-amber-400 font-medium">Dust and Particles</h5>
                      <p className="text-white/60 text-sm">Loose debris from environment—appears as distinct spots</p>
                    </div>
                  </div>
                  <p className="text-white/70 text-sm ml-11"><strong>Cleaning:</strong> Usually removes with dry cleaning</p>
                </div>

                <div className="border-b border-white/10 pb-4">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <Droplets className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <h5 className="text-blue-400 font-medium">Oils and Films</h5>
                      <p className="text-white/60 text-sm">From fingerprints, skin, lubricants—appears as hazy coating or smears</p>
                    </div>
                  </div>
                  <p className="text-white/70 text-sm ml-11"><strong>Cleaning:</strong> Requires wet cleaning with IPA</p>
                </div>

                <div className="border-b border-white/10 pb-4">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-400 text-lg">≋</span>
                    </div>
                    <div>
                      <h5 className="text-purple-400 font-medium">Index Matching Gel Residue</h5>
                      <p className="text-white/60 text-sm">From mechanical splices or old connectors—sticky residue</p>
                    </div>
                  </div>
                  <p className="text-white/70 text-sm ml-11"><strong>Cleaning:</strong> May require multiple wet cleaning cycles</p>
                </div>

                <div className="border-b border-white/10 pb-4">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-green-400 text-lg">◉</span>
                    </div>
                    <div>
                      <h5 className="text-green-400 font-medium">Buffer/Coating Residue</h5>
                      <p className="text-white/60 text-sm">From stripping process—usually at edges of end-face</p>
                    </div>
                  </div>
                  <p className="text-white/70 text-sm ml-11"><strong>Cleaning:</strong> Wet cleaning; if persistent, re-termination may be needed</p>
                </div>

                <div>
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-red-400 text-lg">✕</span>
                    </div>
                    <div>
                      <h5 className="text-red-400 font-medium">Permanent Damage</h5>
                      <p className="text-white/60 text-sm">Scratches, pits, chips, cracks—doesn't change with cleaning</p>
                    </div>
                  </div>
                  <p className="text-white/70 text-sm ml-11"><strong>Action:</strong> Cannot be cleaned—connector requires replacement</p>
                </div>
              </div>
            </div>

            {/* Sources of Contamination */}
            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 p-4 rounded-r-lg mb-6">
              <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-elec-yellow" />
                Common Contamination Sources
              </h4>
              <ul className="text-white/70 text-sm space-y-1">
                <li>• Touching end-faces with fingers (oils)</li>
                <li>• Leaving connectors uncapped (dust)</li>
                <li>• Dirty dust caps transferring contamination</li>
                <li>• Contaminated cleaning materials</li>
                <li>• Environmental dust during connection</li>
                <li>• Transfer from contaminated adapter sleeves</li>
              </ul>
            </div>
          </section>

          {/* Section 03: Inspection Tools and Techniques */}
          <section className="mb-12">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Inspection Tools and Techniques
            </h2>

            <div className="space-y-4 text-white/80 mb-6">
              <p>
                Proper inspection requires adequate magnification and good technique. The fibre core is too small to assess with the naked eye or low-power magnification.
              </p>
            </div>

            {/* Inspection Scope Types */}
            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4">Inspection Scope Types</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                    <Search className="w-5 h-5 text-elec-yellow" />
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Handheld Microscope (200-400×)</h5>
                    <p className="text-white/60 text-sm">Optical scope for inspecting patch cords and accessible connectors. User looks through eyepiece.</p>
                    <p className="text-green-400 text-xs mt-1">Best for: Patch cord inspection, bench work</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                    <Eye className="w-5 h-5 text-elec-yellow" />
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Video Probe / Tip Inspection Scope</h5>
                    <p className="text-white/60 text-sm">Probe tip inserts into adapters to view installed connectors. Image displayed on screen or phone.</p>
                    <p className="text-green-400 text-xs mt-1">Best for: Patch panels, installed connectors, documentation</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-elec-yellow" />
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Automated Pass/Fail Scope</h5>
                    <p className="text-white/60 text-sm">Captures image and automatically analyses against IEC standards. Provides objective pass/fail result.</p>
                    <p className="text-green-400 text-xs mt-1">Best for: High-volume testing, certification documentation</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Inspection Zones */}
            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4">IEC 61300-3-35 Inspection Zones</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                <div className="bg-red-500/20 p-3 rounded-lg border border-red-500/30 text-center">
                  <div className="text-red-400 font-bold text-sm">Zone A</div>
                  <div className="text-white/80 text-xs">Core</div>
                  <div className="text-white/60 text-xs mt-1">0-25µm (SM)</div>
                  <div className="text-red-300 text-xs mt-1">No defects</div>
                </div>
                <div className="bg-amber-500/20 p-3 rounded-lg border border-amber-500/30 text-center">
                  <div className="text-amber-400 font-bold text-sm">Zone B</div>
                  <div className="text-white/80 text-xs">Cladding</div>
                  <div className="text-white/60 text-xs mt-1">25-120µm</div>
                  <div className="text-amber-300 text-xs mt-1">Limited defects</div>
                </div>
                <div className="bg-blue-500/20 p-3 rounded-lg border border-blue-500/30 text-center">
                  <div className="text-blue-400 font-bold text-sm">Zone C</div>
                  <div className="text-white/80 text-xs">Adhesive</div>
                  <div className="text-white/60 text-xs mt-1">120-130µm</div>
                  <div className="text-blue-300 text-xs mt-1">More lenient</div>
                </div>
                <div className="bg-green-500/20 p-3 rounded-lg border border-green-500/30 text-center">
                  <div className="text-green-400 font-bold text-sm">Zone D</div>
                  <div className="text-white/80 text-xs">Contact</div>
                  <div className="text-white/60 text-xs mt-1">130-250µm</div>
                  <div className="text-green-300 text-xs mt-1">Scratches OK</div>
                </div>
              </div>
              <p className="text-white/60 text-sm">
                The core zone (A) is most critical—any contamination here directly affects the optical signal. Outer zones are progressively more tolerant.
              </p>
            </div>

            {/* Inline Check 1 */}
            <InlineCheck
              question={quickCheckQuestions[0].question}
              options={quickCheckQuestions[0].options}
              explanation={quickCheckQuestions[0].explanation}
            />
          </section>

          {/* Section 04: Dry Cleaning Methods */}
          <section className="mb-12">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Dry Cleaning Methods
            </h2>

            <div className="space-y-4 text-white/80 mb-6">
              <p>
                Dry cleaning is the preferred first-line method because it effectively removes most contamination without risk of solvent residue. Several dry cleaning tools are available.
              </p>
            </div>

            {/* Dry Cleaning Tools */}
            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4">Dry Cleaning Tools</h4>
              <div className="space-y-4">
                <div className="border-b border-white/10 pb-4">
                  <h5 className="text-elec-yellow font-medium mb-2">One-Click Cleaners</h5>
                  <p className="text-white/60 text-sm mb-2">Pen-style devices with replaceable cleaning cartridges. Press against end-face, the cleaning tip rotates and advances automatically.</p>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>✓ Fast and convenient for field use</li>
                    <li>✓ Consistent cleaning action</li>
                    <li>✓ Available for various connector types (LC, SC, MPO)</li>
                  </ul>
                </div>
                <div className="border-b border-white/10 pb-4">
                  <h5 className="text-elec-yellow font-medium mb-2">Cassette Cleaners (Cletop Style)</h5>
                  <p className="text-white/60 text-sm mb-2">Reel of cleaning tape in a cassette. Advance fresh tape for each use. Push connector against tape with slight rotation.</p>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>✓ Many cleans per cassette (500+)</li>
                    <li>✓ Very effective cleaning action</li>
                    <li>✓ Good for high-volume environments</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-elec-yellow font-medium mb-2">Cleaning Sticks/Swabs</h5>
                  <p className="text-white/60 text-sm mb-2">Single-use sticks with lint-free tips. Available in various sizes for different connector and adapter types.</p>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>✓ Can reach inside adapters to clean both connectors</li>
                    <li>✓ Low cost per clean</li>
                    <li>✓ Essential for adapter/bulkhead cleaning</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Dry Cleaning Procedure */}
            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 p-4 rounded-r-lg mb-6">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-elec-yellow" />
                Dry Cleaning Procedure
              </h4>
              <ol className="text-white/70 text-sm space-y-2">
                <li><span className="text-elec-yellow font-bold">1.</span> Inspect connector under magnification—note contamination type and location</li>
                <li><span className="text-elec-yellow font-bold">2.</span> Select appropriate cleaning tool for connector type</li>
                <li><span className="text-elec-yellow font-bold">3.</span> Advance to fresh cleaning surface (never re-use)</li>
                <li><span className="text-elec-yellow font-bold">4.</span> Apply gentle, consistent pressure—push and rotate slightly</li>
                <li><span className="text-elec-yellow font-bold">5.</span> Re-inspect to verify cleanliness</li>
                <li><span className="text-elec-yellow font-bold">6.</span> If contamination remains, try another dry clean or proceed to wet cleaning</li>
              </ol>
            </div>
          </section>

          {/* Section 05: Wet Cleaning Methods */}
          <section className="mb-12">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Wet Cleaning Methods
            </h2>

            <div className="space-y-4 text-white/80 mb-6">
              <p>
                When dry cleaning fails to remove contamination—particularly oils, films, or sticky residues—wet cleaning is required. The most common solvent is isopropyl alcohol (IPA) at 99% concentration or higher.
              </p>
            </div>

            {/* Wet Cleaning Solvents */}
            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4">Approved Cleaning Solvents</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-2 px-3 text-white/60 font-medium">Solvent</th>
                      <th className="text-left py-2 px-3 text-white/60 font-medium">Use Case</th>
                      <th className="text-left py-2 px-3 text-white/60 font-medium">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/80">
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3 text-elec-yellow">99%+ IPA</td>
                      <td className="py-2 px-3">General purpose, most contamination</td>
                      <td className="py-2 px-3 text-white/60">Most common choice</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3 text-elec-yellow">Optical-grade IPA</td>
                      <td className="py-2 px-3">Critical applications</td>
                      <td className="py-2 px-3 text-white/60">Higher purity, more expensive</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 text-elec-yellow">Specialist fibre cleaners</td>
                      <td className="py-2 px-3">Heavy contamination, residue</td>
                      <td className="py-2 px-3 text-white/60">Formulated for fibre use</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Warning */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-amber-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Important Warnings
              </h4>
              <ul className="text-white/70 text-sm space-y-1">
                <li>• <strong className="text-white">Never use 70% IPA</strong>—water content leaves residue</li>
                <li>• <strong className="text-white">Never use acetone</strong>—damages many plastic components</li>
                <li>• <strong className="text-white">Never spray solvent directly on connectors</strong>—use on cleaning material only</li>
                <li>• <strong className="text-white">Always follow wet clean with dry clean</strong>—removes solvent residue</li>
              </ul>
            </div>

            {/* Wet Cleaning Procedure */}
            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 p-4 rounded-r-lg mb-6">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Droplets className="w-4 h-4 text-elec-yellow" />
                Wet-Dry Cleaning Procedure
              </h4>
              <ol className="text-white/70 text-sm space-y-2">
                <li><span className="text-elec-yellow font-bold">1.</span> Apply small amount of IPA to lint-free wipe or cleaning stick</li>
                <li><span className="text-elec-yellow font-bold">2.</span> Wipe connector end-face with wet section—push and rotate</li>
                <li><span className="text-elec-yellow font-bold">3.</span> Immediately follow with dry section of same wipe (or fresh dry material)</li>
                <li><span className="text-elec-yellow font-bold">4.</span> Wait 2-3 seconds for any remaining solvent to evaporate</li>
                <li><span className="text-elec-yellow font-bold">5.</span> Inspect to verify cleanliness</li>
                <li><span className="text-elec-yellow font-bold">6.</span> Repeat if necessary—never connect until clean</li>
              </ol>
            </div>

            {/* Inline Check 2 */}
            <InlineCheck
              question={quickCheckQuestions[1].question}
              options={quickCheckQuestions[1].options}
              explanation={quickCheckQuestions[1].explanation}
            />
          </section>

          {/* Section 06: Cleaning Special Cases */}
          <section className="mb-12">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Special Cleaning Situations
            </h2>

            {/* MPO/MTP Connectors */}
            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4">MPO/MTP Connector Cleaning</h4>
              <p className="text-white/60 text-sm mb-3">
                MPO connectors have 12, 24, or more fibres in a rectangular array. Cleaning requires special tools designed for the larger end-face.
              </p>
              <ul className="text-white/70 text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Use MPO-specific cleaning sticks or cassette cleaners
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Clean entire array in single pass—don't scrub back and forth
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Also clean guide pin holes and guide pins
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Inspection scopes must be MPO-compatible (wider field of view)
                </li>
              </ul>
            </div>

            {/* Adapter Cleaning */}
            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4">Adapter/Bulkhead Cleaning</h4>
              <p className="text-white/60 text-sm mb-3">
                The inside of adapter sleeves accumulates contamination and can transfer it to clean connectors.
              </p>
              <ul className="text-white/70 text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Use long cleaning sticks designed for adapter cleaning
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Insert from both ends to clean entire sleeve
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Replace heavily contaminated adapters—cleaning has limits
                </li>
              </ul>
            </div>

            {/* APC Connectors */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                APC Connector Considerations
              </h4>
              <p className="text-white/70 text-sm">
                APC (Angled Physical Contact) connectors have an 8° angled end-face. Use cleaners specifically designed for APC—they account for the angle and ensure proper contact across the entire angled surface. Never use UPC cleaners on APC connectors.
              </p>
            </div>

            {/* Inline Check 3 */}
            <InlineCheck
              question={quickCheckQuestions[2].question}
              options={quickCheckQuestions[2].options}
              explanation={quickCheckQuestions[2].explanation}
            />
          </section>

          {/* Best Practices */}
          <section className="mb-12">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Best Practices Summary
            </h2>

            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4">Golden Rules of Fibre Cleaning</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-elec-yellow font-bold text-sm">1</span>
                  </div>
                  <div>
                    <span className="text-white font-medium">Always inspect before connecting</span>
                    <p className="text-white/60 text-sm">Never assume a connector is clean—always verify</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-elec-yellow font-bold text-sm">2</span>
                  </div>
                  <div>
                    <span className="text-white font-medium">Try dry cleaning first</span>
                    <p className="text-white/60 text-sm">Use wet cleaning only if dry cleaning fails</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-elec-yellow font-bold text-sm">3</span>
                  </div>
                  <div>
                    <span className="text-white font-medium">Never re-use cleaning surfaces</span>
                    <p className="text-white/60 text-sm">Fresh material for every cleaning action</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-elec-yellow font-bold text-sm">4</span>
                  </div>
                  <div>
                    <span className="text-white font-medium">Re-inspect after cleaning</span>
                    <p className="text-white/60 text-sm">Confirm contamination is removed before connecting</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-elec-yellow font-bold text-sm">5</span>
                  </div>
                  <div>
                    <span className="text-white font-medium">Keep dust caps on</span>
                    <p className="text-white/60 text-sm">Protect connectors until immediately before mating</p>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-12">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
              <BookOpen className="w-6 h-6 text-elec-yellow" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-[#252525] rounded-lg p-5 border border-white/10">
                  <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                  <p className="text-white/70 text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Quick Reference Card */}
          <section className="mb-12">
            <div className="bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 rounded-xl p-6 border border-elec-yellow/30">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-elec-yellow" />
                Quick Reference: Cleaning Procedure
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-semibold text-white mb-2">1. Inspect</h4>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• 200-400× magnification</li>
                    <li>• Note contamination type</li>
                    <li>• Check all zones</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">2. Clean</h4>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• Dry clean first</li>
                    <li>• Wet clean if needed</li>
                    <li>• Fresh surface each time</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">3. Verify</h4>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• Re-inspect after cleaning</li>
                    <li>• Replace dust cap</li>
                    <li>• Connect when confirmed clean</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Quiz Section */}
          <section className="mb-12">
            <Quiz
              title="Section 2 Knowledge Check"
              questions={quizQuestions}
              passingScore={80}
            />
          </section>

          {/* Bottom Navigation */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 pt-8 border-t border-white/10">
            <Link
              to="/electrical-upskilling/fiber-optics-module-7-section-1"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[#252525] text-white rounded-lg hover:bg-[#303030] transition-colors min-h-[44px] touch-manipulation active:scale-[0.98]"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous: Common Fibre Faults
            </Link>
            <Link
              to="/electrical-upskilling/fiber-optics-module-7-section-3"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-elec-yellow text-[#1a1a1a] font-semibold rounded-lg hover:bg-elec-yellow/90 transition-colors min-h-[44px] touch-manipulation active:scale-[0.98]"
            >
              Next: Troubleshooting Tools and OTDR
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiberOpticsModule7Section2;
