import { useState } from "react";
import { ArrowLeft, Zap, CheckCircle, ChevronDown, Eye, Sparkles, AlertTriangle, Shield, BookOpen, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Inspection Microscopes and Cleaning Tools - Fiber Optics Technology";
const DESCRIPTION = "Learn about fibre optic inspection equipment, cleaning methods, and best practices for maintaining connector quality and system reliability.";

const quickCheckQuestions = [
  {
    id: "inspection-qc1",
    question: "Why should you always inspect connectors before mating them?",
    options: [
      "To check the colour",
      "Contamination causes signal loss and can damage connectors",
      "Regulatory requirement only",
      "To verify connector type"
    ],
    correctIndex: 1,
    explanation: "Even microscopic contamination causes signal loss and can permanently damage connector end faces when mated. Inspection catches problems before they cause damage or system failures."
  },
  {
    id: "inspection-qc2",
    question: "What magnification is typically used for fibre end-face inspection?",
    options: [
      "10x-50x",
      "200x-400x",
      "1000x-2000x",
      "50x-100x"
    ],
    correctIndex: 1,
    explanation: "200x-400x magnification is standard for fibre inspection, allowing clear viewing of the core, cladding, and contact zones defined in IEC 61300-3-35."
  },
  {
    id: "inspection-qc3",
    question: "What is the 'inspect, clean, inspect' rule?",
    options: [
      "Inspect the connector three times",
      "Inspect before cleaning, clean, then inspect again to verify",
      "Use three different microscopes",
      "Clean three times before inspecting"
    ],
    correctIndex: 1,
    explanation: "First inspection identifies contamination type, cleaning removes it, second inspection verifies the end face is clean. Never skip the verification step."
  }
];

const quizQuestions = [
  {
    question: "What type of contamination commonly causes high insertion loss?",
    options: [
      "Magnetic particles",
      "Dust, oil, and debris on the end face",
      "Connector colour",
      "Cable jacket damage"
    ],
    correctAnswer: 1
  },
  {
    question: "What is a video probe microscope used for?",
    options: [
      "Testing cable length",
      "Inspecting connectors in patch panels and adapters",
      "Measuring loss",
      "Stripping cable"
    ],
    correctAnswer: 1
  },
  {
    question: "What cleaning method is recommended for connectors in adapters?",
    options: [
      "Compressed air only",
      "Wet-dry stick cleaners",
      "Water rinse",
      "Abrasive pads"
    ],
    correctAnswer: 1
  },
  {
    question: "How should used cleaning stick tips be handled?",
    options: [
      "Reuse until dirty",
      "Discard after single use",
      "Wash and reuse",
      "Share between technicians"
    ],
    correctAnswer: 1
  },
  {
    question: "What IEC standard defines end-face inspection criteria?",
    options: [
      "IEC 60793",
      "IEC 61300-3-35",
      "IEC 61754",
      "IEC 60794"
    ],
    correctAnswer: 1
  },
  {
    question: "What does a 'cassette cleaner' contain?",
    options: [
      "Compressed air",
      "Ribbon of dry cleaning material",
      "Liquid cleaner",
      "Polishing film"
    ],
    correctAnswer: 1
  },
  {
    question: "What contamination type is most likely from skin contact?",
    options: [
      "Dust",
      "Oil and fingerprints",
      "Metal particles",
      "Water"
    ],
    correctAnswer: 1
  },
  {
    question: "When should you use wet cleaning (IPA)?",
    options: [
      "Always as first step",
      "When dry cleaning doesn't remove contamination",
      "Never on fibre",
      "Only on outdoor connectors"
    ],
    correctAnswer: 1
  },
  {
    question: "What can result from mating a contaminated connector?",
    options: [
      "Improved signal",
      "Scratched/damaged end faces on both connectors",
      "No significant effect",
      "Cleaner connection"
    ],
    correctAnswer: 1
  },
  {
    question: "How should inspection equipment be stored?",
    options: [
      "Any convenient location",
      "In protective case, lens covers on, away from contamination",
      "In direct sunlight",
      "Loose in tool bag"
    ],
    correctAnswer: 1
  }
];

const faqs = [
  {
    question: "How often should I clean connectors?",
    answer: "Every time before mating and after any handling. Even new connectors from packaging should be inspected and cleaned. Make inspection and cleaning a standard step in every connection procedure - it takes seconds and prevents problems that take hours to diagnose."
  },
  {
    question: "Can I clean APC connectors the same way as UPC?",
    answer: "Yes, the cleaning process is similar. However, some cleaning tools have specific versions for APC (angled) to ensure proper contact with the angled end face. Check your cleaning tool specifications. The angled face may require slightly different technique to ensure full surface contact."
  },
  {
    question: "Is compressed air safe for fibre cleaning?",
    answer: "Use with caution. Only use filtered, dry, oil-free compressed air designed for electronics. Regular workshop air often contains oil and moisture. Compressed air alone doesn't remove all contamination types - it's best as a first step before other cleaning methods. Never use high pressure directly on end faces."
  },
  {
    question: "What if contamination won't come off after multiple cleanings?",
    answer: "If contamination persists after proper wet and dry cleaning, it may be damage rather than contamination (scratches, chips, or burned-in particles). Inspect closely under magnification. Damaged connectors must be re-terminated or replaced - continued cleaning won't fix physical damage."
  },
  {
    question: "Do I need different microscopes for different connector types?",
    answer: "The basic microscope can view most connector types, but you need appropriate adapters or tips for different form factors (LC, SC, MPO, etc.). Video probe microscopes are essential for inspecting connectors installed in panels and adapters where handheld microscopes can't reach."
  },
  {
    question: "How do I know if my cleaning supplies are contaminated?",
    answer: "Store supplies in sealed containers. Discard wipes exposed to dirty environments. Check IPA containers for contamination. If cleaning seems ineffective or you're seeing new contamination appear after cleaning, your supplies may be compromised. Use fresh supplies from sealed packaging."
  }
];

const FiberOpticsModule4Section5 = () => {
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
          <span className="text-xs text-white/40 hidden sm:block">Section 5 of 5</span>
        </div>
      </header>

      <main className="pt-20 pb-24 px-4 max-w-3xl mx-auto">
        {/* Module Number Badge */}
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-1.5 text-sm text-elec-yellow">
            <Eye className="w-4 h-4" />
            Module 4 · Section 5
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Inspection Microscopes and Cleaning Tools
        </h1>

        {/* Quick Summary Card */}
        <div className="bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-2xl p-5 border border-teal-500/30 mb-6">
          <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Zap className="w-5 h-5 text-elec-yellow" />
            In 30 Seconds
          </h2>
          <p className="text-white/80 text-sm leading-relaxed">
            Contaminated connectors are the leading cause of fibre network problems. Always
            inspect connectors at 200-400x magnification before mating. Clean using dry
            methods first, wet (IPA) if needed, then verify with final inspection. Proper
            cleaning takes seconds but prevents costly troubleshooting and permanent damage.
          </p>
        </div>

        {/* Spot it / Use it Card */}
        <div className="bg-gradient-to-br from-cyan-500/10 to-teal-500/10 rounded-2xl p-5 border border-cyan-500/20 mb-8">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold text-cyan-400 mb-2">Inspection Tools</h3>
              <ul className="text-white/70 text-sm space-y-1">
                <li>• Handheld microscope (200x)</li>
                <li>• Video probe microscope</li>
                <li>• Desktop microscope</li>
                <li>• USB/digital scopes</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-teal-400 mb-2">Cleaning Tools</h3>
              <ul className="text-white/70 text-sm space-y-1">
                <li>• Cassette/reel cleaners</li>
                <li>• Stick cleaners (wet/dry)</li>
                <li>• Lint-free wipes + IPA</li>
                <li>• Compressed air (filtered)</li>
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
              "Inspection microscope types and use",
              "IEC inspection criteria",
              "Cleaning tool types and selection",
              "Proper cleaning procedures",
              "Troubleshooting persistent contamination",
              "Equipment care and maintenance"
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

        {/* Section 1: Why Inspection Matters */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center">
              <span className="text-lg font-bold">01</span>
            </div>
            <h2 className="text-xl font-bold">Why Inspection Matters</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Contamination is the number one cause of fibre optic network problems. A particle
              as small as 1 micron on a 9-micron singlemode core can block significant light
              and cause signal loss.
            </p>

            <div className="bg-orange-500/10 rounded-xl p-4 border border-orange-500/30">
              <h4 className="font-semibold text-orange-300 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                The Cost of Contamination
              </h4>
              <ul className="text-sm space-y-1 text-white/80">
                <li>• <strong>Signal loss:</strong> Particles block light transmission</li>
                <li>• <strong>Back-reflection:</strong> Contamination causes unwanted reflections</li>
                <li>• <strong>Permanent damage:</strong> Dirt gets pressed into end faces when mated</li>
                <li>• <strong>Chain reaction:</strong> One dirty connector contaminates others it mates with</li>
                <li>• <strong>Troubleshooting cost:</strong> Hours finding problems that cleaning prevents</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3">Common Contamination Sources</h4>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-cyan-300 font-medium mb-1">Environmental:</p>
                  <ul className="text-white/60 space-y-1">
                    <li>• Dust and airborne particles</li>
                    <li>• Humidity and moisture</li>
                    <li>• Construction debris</li>
                    <li>• Office environment dust</li>
                  </ul>
                </div>
                <div>
                  <p className="text-teal-300 font-medium mb-1">Handling:</p>
                  <ul className="text-white/60 space-y-1">
                    <li>• Fingerprints and skin oils</li>
                    <li>• Clothing fibres</li>
                    <li>• Cable jacket debris</li>
                    <li>• Alcohol residue (if not dried)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-elec-yellow/10 rounded-xl p-4 border border-elec-yellow/30">
              <h4 className="font-semibold text-elec-yellow mb-2">The Golden Rule</h4>
              <p className="text-sm text-white/80">
                <strong>Inspect → Clean → Inspect</strong> before every connection. First inspection
                identifies contamination, cleaning removes it, final inspection verifies success.
                This takes only seconds but prevents hours of troubleshooting.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Inspection Microscopes */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center">
              <span className="text-lg font-bold">02</span>
            </div>
            <h2 className="text-xl font-bold">Inspection Microscope Types</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Different inspection tools serve different purposes. Most technicians need both
              handheld and video probe types for comprehensive inspection capability.
            </p>

            <div className="grid gap-4">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h4 className="font-semibold text-cyan-400 mb-2 flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Handheld Microscope
                </h4>
                <p className="text-sm text-white/60 mb-2">
                  Compact scope for inspecting patch cords and accessible connectors.
                </p>
                <ul className="text-sm text-white/60 space-y-1">
                  <li>• Magnification: 200x or 400x</li>
                  <li>• Built-in LED illumination</li>
                  <li>• Adapter tips for different connectors</li>
                  <li>• Price range: £50-300</li>
                  <li>• Use for: Patch cords, accessible ferrules</li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h4 className="font-semibold text-teal-400 mb-2">Video Probe Microscope</h4>
                <p className="text-sm text-white/60 mb-2">
                  Thin probe for inspecting connectors installed in adapters and panels.
                </p>
                <ul className="text-sm text-white/60 space-y-1">
                  <li>• Probe diameter: 1.25mm (LC) or 2.5mm (SC)</li>
                  <li>• LCD display or phone app connection</li>
                  <li>• Essential for installed connectors</li>
                  <li>• Price range: £500-2,000</li>
                  <li>• Use for: Panels, switches, adapters</li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h4 className="font-semibold text-blue-400 mb-2">Desktop/USB Microscope</h4>
                <p className="text-sm text-white/60 mb-2">
                  Fixed microscope with digital output for documentation and training.
                </p>
                <ul className="text-sm text-white/60 space-y-1">
                  <li>• Higher magnification options (up to 800x)</li>
                  <li>• Image capture and storage</li>
                  <li>• Computer connection</li>
                  <li>• Price range: £300-3,000</li>
                  <li>• Use for: Lab, QC, training, documentation</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-cyan-500/20 to-teal-500/20 rounded-xl p-4">
              <h4 className="font-semibold text-white mb-2">Recommended Setup</h4>
              <p className="text-sm text-white/70">
                For field work, carry both a handheld scope (for patch cords) and a video
                probe (for installed connectors). Many manufacturers offer combined kits.
                For workshop use, add a desktop microscope for detailed analysis and
                documentation.
              </p>
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

        {/* Section 3: IEC Inspection Criteria */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center">
              <span className="text-lg font-bold">03</span>
            </div>
            <h2 className="text-xl font-bold">IEC Inspection Criteria</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              IEC 61300-3-35 defines inspection zones and cleanliness criteria for fibre
              connector end faces. Understanding these zones helps evaluate inspection results.
            </p>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Target className="w-4 h-4 text-cyan-400" />
                End Face Zones (Singlemode)
              </h4>
              <ul className="space-y-2 text-sm">
                <li><strong>Zone A (Core):</strong> 0-25μm from centre. NO defects or contamination allowed.</li>
                <li><strong>Zone B (Cladding):</strong> 25-120μm. Limited scratches acceptable, no contamination.</li>
                <li><strong>Zone C (Adhesive):</strong> 120-130μm. Some defects acceptable, not critical.</li>
                <li><strong>Zone D (Contact):</strong> 130-250μm. Ferrule contact area, limited defects.</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-xl p-4">
              <h4 className="font-semibold text-white mb-3">Pass/Fail Criteria (Summary)</h4>
              <div className="overflow-x-auto">
                <table className="text-sm w-full">
                  <thead>
                    <tr className="text-left border-b border-white/20">
                      <th className="pb-2 text-white/80">Zone</th>
                      <th className="pb-2 text-white/80">Scratches</th>
                      <th className="pb-2 text-white/80">Defects</th>
                      <th className="pb-2 text-white/80">Contamination</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/60">
                    <tr className="border-b border-white/10">
                      <td className="py-2">A (Core)</td>
                      <td>None</td>
                      <td>None</td>
                      <td>None</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2">B (Cladding)</td>
                      <td>&lt;3μm wide</td>
                      <td>&lt;5 max</td>
                      <td>None</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2">C (Adhesive)</td>
                      <td>N/A</td>
                      <td>Limited</td>
                      <td>Limited</td>
                    </tr>
                    <tr>
                      <td className="py-2">D (Contact)</td>
                      <td>Limited</td>
                      <td>Limited</td>
                      <td>None on contact</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-elec-yellow/10 rounded-xl p-4 border border-elec-yellow/30">
              <h4 className="font-semibold text-elec-yellow mb-2">Practical Interpretation</h4>
              <p className="text-sm text-white/80">
                Focus on the core area (Zone A) - this is most critical. Any visible contamination
                or defect in the core fails inspection. Light scratches in the cladding are often
                acceptable. When in doubt, clean again and re-inspect. Never mate a connector
                with visible core contamination.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Cleaning Tools */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center">
              <span className="text-lg font-bold">04</span>
            </div>
            <h2 className="text-xl font-bold">Cleaning Tool Types</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Different cleaning tools suit different situations. Choose based on whether
              the connector is accessible (patch cord) or installed (in an adapter).
            </p>

            <div className="grid gap-4">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h4 className="font-semibold text-cyan-400 mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Cassette/Reel Cleaners
                </h4>
                <p className="text-sm text-white/60 mb-2">
                  Dry cleaning tape in a cassette. Swipe connector across exposed tape.
                </p>
                <ul className="text-sm text-white/60 space-y-1">
                  <li>• Quick and convenient</li>
                  <li>• 500+ cleans per cassette</li>
                  <li>• No consumables to manage</li>
                  <li>• For patch cords and accessible connectors</li>
                  <li>• Popular brands: Cletop, NTT-AT, AFL</li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h4 className="font-semibold text-teal-400 mb-2">Stick Cleaners (Swabs)</h4>
                <p className="text-sm text-white/60 mb-2">
                  Cleaning sticks for reaching connectors in adapters and ports.
                </p>
                <ul className="text-sm text-white/60 space-y-1">
                  <li>• 1.25mm tip for LC/MU ports</li>
                  <li>• 2.5mm tip for SC/FC/ST ports</li>
                  <li>• Available dry or with IPA</li>
                  <li>• Single-use disposable tips</li>
                  <li>• Essential for cleaning adapters and switch ports</li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h4 className="font-semibold text-blue-400 mb-2">Lint-Free Wipes + IPA</h4>
                <p className="text-sm text-white/60 mb-2">
                  Traditional wet cleaning for stubborn contamination.
                </p>
                <ul className="text-sm text-white/60 space-y-1">
                  <li>• 99%+ isopropyl alcohol</li>
                  <li>• Optical-grade lint-free wipes</li>
                  <li>• For stubborn contamination</li>
                  <li>• Requires dry follow-up</li>
                  <li>• Lower cost but more technique-dependent</li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h4 className="font-semibold text-purple-400 mb-2">Ferrule Cleaners</h4>
                <p className="text-sm text-white/60 mb-2">
                  Pen-style push cleaners for patch cords.
                </p>
                <ul className="text-sm text-white/60 space-y-1">
                  <li>• One-click operation</li>
                  <li>• Dry or combined wet/dry action</li>
                  <li>• Compact for tool bag</li>
                  <li>• Good for high-volume work</li>
                </ul>
              </div>
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

        {/* Section 5: Cleaning Procedures */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center">
              <span className="text-lg font-bold">05</span>
            </div>
            <h2 className="text-xl font-bold">Cleaning Procedures</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Proper cleaning technique ensures contamination is removed without damaging
              the end face or spreading contamination.
            </p>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-400" />
                Cleaning Patch Cords (Cassette Method)
              </h4>
              <ol className="space-y-2 text-sm">
                <li><strong>1.</strong> Inspect connector under microscope</li>
                <li><strong>2.</strong> Open cassette cleaner to expose cleaning surface</li>
                <li><strong>3.</strong> Hold connector perpendicular to cleaning surface</li>
                <li><strong>4.</strong> Press down and swipe across tape once</li>
                <li><strong>5.</strong> Advance tape to fresh area for next use</li>
                <li><strong>6.</strong> Re-inspect to verify clean</li>
              </ol>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3">Cleaning Adapters/Ports (Stick Method)</h4>
              <ol className="space-y-2 text-sm">
                <li><strong>1.</strong> Inspect with video probe if possible</li>
                <li><strong>2.</strong> Select correct stick size (1.25mm or 2.5mm)</li>
                <li><strong>3.</strong> Insert stick straight into adapter</li>
                <li><strong>4.</strong> Rotate 2-3 times with light pressure</li>
                <li><strong>5.</strong> Remove and discard used stick</li>
                <li><strong>6.</strong> Inspect to verify clean</li>
              </ol>
            </div>

            <div className="bg-gradient-to-r from-cyan-500/20 to-teal-500/20 rounded-xl p-4">
              <h4 className="font-semibold text-white mb-2">Wet Cleaning Procedure</h4>
              <p className="text-sm text-white/70 mb-2">
                Use when dry cleaning doesn't remove contamination:
              </p>
              <ol className="text-sm text-white/60 space-y-1">
                <li>1. Dampen (not soak) wipe or stick with IPA</li>
                <li>2. Clean end face with wet material</li>
                <li>3. Immediately follow with dry cleaning</li>
                <li>4. Ensure no residue remains before inspection</li>
              </ol>
              <p className="text-xs text-white/50 mt-2">
                Never leave IPA to air dry - it can leave residue.
              </p>
            </div>

            <div className="bg-orange-500/10 rounded-xl p-4 border border-orange-500/30">
              <h4 className="font-semibold text-orange-300 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Common Cleaning Mistakes
              </h4>
              <ul className="text-sm space-y-1 text-white/80">
                <li>• <strong>Reusing cleaning surfaces:</strong> Transfers contamination back</li>
                <li>• <strong>Skipping final inspection:</strong> Cleaning isn't complete until verified</li>
                <li>• <strong>Excessive pressure:</strong> Can damage end face</li>
                <li>• <strong>Circular motion on ferrule:</strong> Use straight wipes</li>
                <li>• <strong>Letting IPA dry naturally:</strong> Leaves residue</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 6: Equipment Care */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center">
              <span className="text-lg font-bold">06</span>
            </div>
            <h2 className="text-xl font-bold">Equipment Care and Maintenance</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Proper care of inspection and cleaning equipment ensures reliable performance
              and extends equipment life.
            </p>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-elec-yellow" />
                Microscope Care
              </h4>
              <ul className="space-y-2 text-sm">
                <li><strong>Lens protection:</strong> Always cap lenses when not in use</li>
                <li><strong>Lens cleaning:</strong> Use only optical-grade lens cleaners</li>
                <li><strong>Battery management:</strong> Remove batteries if storing long-term</li>
                <li><strong>Video probes:</strong> Protect thin probe from bending</li>
                <li><strong>Storage:</strong> Keep in protective case, away from dust</li>
                <li><strong>Calibration:</strong> Periodic check for focus and illumination</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3">Cleaning Supply Management</h4>
              <ul className="space-y-2 text-sm">
                <li><strong>Cassette cleaners:</strong> Advance tape fully after contaminated environments</li>
                <li><strong>Stick cleaners:</strong> Store in sealed packaging, check expiry dates</li>
                <li><strong>IPA:</strong> Keep tightly sealed, discard if contaminated</li>
                <li><strong>Wipes:</strong> Store in sealed containers, don't touch cleaning surfaces</li>
                <li><strong>Stock management:</strong> Rotate stock, use FIFO</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/30">
                <h4 className="font-semibold text-green-400 mb-2">Do</h4>
                <ul className="text-sm space-y-1 text-white/70">
                  <li>• Store in cases</li>
                  <li>• Use lens caps</li>
                  <li>• Keep supplies sealed</li>
                  <li>• Replace consumables regularly</li>
                  <li>• Clean equipment periodically</li>
                </ul>
              </div>
              <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/30">
                <h4 className="font-semibold text-red-400 mb-2">Don't</h4>
                <ul className="text-sm space-y-1 text-white/70">
                  <li>• Leave uncovered</li>
                  <li>• Touch optical surfaces</li>
                  <li>• Reuse single-use items</li>
                  <li>• Store in dirty environments</li>
                  <li>• Use expired supplies</li>
                </ul>
              </div>
            </div>

            <div className="bg-elec-yellow/10 rounded-xl p-4 border border-elec-yellow/30">
              <h4 className="font-semibold text-elec-yellow mb-2">Kit Checklist</h4>
              <p className="text-sm text-white/80 mb-2">
                Every fibre technician should carry:
              </p>
              <ul className="text-sm text-white/70 space-y-1">
                <li>☐ Handheld microscope with adapter tips</li>
                <li>☐ Video probe microscope (for installed connectors)</li>
                <li>☐ Cassette/reel cleaner</li>
                <li>☐ Stick cleaners (1.25mm and 2.5mm)</li>
                <li>☐ IPA and lint-free wipes (backup)</li>
                <li>☐ Spare batteries</li>
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
              <h4 className="font-semibold text-green-400 mb-2">Best Practices</h4>
              <ul className="text-sm text-white/70 space-y-2">
                <li>• <strong>Make it routine:</strong> Inspect and clean EVERY connection, EVERY time</li>
                <li>• <strong>Dry first:</strong> Try dry cleaning before wet - often sufficient</li>
                <li>• <strong>Don't assume:</strong> Even new connectors from packaging need inspection</li>
                <li>• <strong>Use proper tools:</strong> Right size stick for adapter type</li>
                <li>• <strong>Document issues:</strong> Photograph persistent problems for analysis</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-xl p-4 border border-red-500/20">
              <h4 className="font-semibold text-red-400 mb-2">Troubleshooting Persistent Contamination</h4>
              <ul className="text-sm text-white/70 space-y-2">
                <li>• <strong>Try wet cleaning:</strong> IPA removes oils that dry cleaning misses</li>
                <li>• <strong>Check cleaning supplies:</strong> Are they contaminated?</li>
                <li>• <strong>Evaluate environment:</strong> Is workspace too dirty?</li>
                <li>• <strong>Look for damage:</strong> What looks like dirt may be physical damage</li>
                <li>• <strong>Check mating connector:</strong> May be transferring contamination</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-cyan-500/10 to-teal-500/10 rounded-xl p-4 border border-cyan-500/20">
              <h4 className="font-semibold text-cyan-400 mb-2">When Cleaning Fails</h4>
              <p className="text-sm text-white/70">
                If contamination won't clean after multiple attempts with wet and dry methods,
                the end face may be damaged. Scratches, pits, or burned-in debris cannot be
                cleaned away. These connectors must be re-terminated or replaced. Continuing
                to use damaged connectors risks damaging mating connectors.
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

        {/* Quick Reference Card */}
        <section className="mb-10">
          <div className="bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-2xl p-5 border border-teal-500/30">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5 text-cyan-400" />
              Quick Reference: Inspect → Clean → Inspect
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-semibold text-cyan-300 mb-2">Inspection</h4>
                <ul className="text-xs text-white/70 space-y-1">
                  <li>• 200-400x magnification</li>
                  <li>• Focus on core area (Zone A)</li>
                  <li>• No defects in core = pass</li>
                  <li>• Use video probe for adapters</li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-teal-300 mb-2">Cleaning</h4>
                <ul className="text-xs text-white/70 space-y-1">
                  <li>• Dry clean first (cassette/stick)</li>
                  <li>• Wet clean if needed (IPA)</li>
                  <li>• Always dry after wet</li>
                  <li>• Verify with final inspection</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-xs text-white/50">
                Remember: Contamination is #1 cause of fibre problems. A few seconds of cleaning prevents hours of troubleshooting.
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
            to="/apprentice/study-centre/upskilling/fiber-optics/module4/section4"
            className="w-full sm:w-auto"
          >
            <Button
              variant="ghost"
              className="w-full sm:w-auto gap-2 text-white/70 hover:text-white min-h-[44px] touch-manipulation"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous: Connectorisation Techniques
            </Button>
          </Link>
          <Link
            to="/apprentice/study-centre/upskilling/fiber-optics/module5"
            className="w-full sm:w-auto"
          >
            <Button
              className="w-full sm:w-auto gap-2 bg-elec-yellow text-black hover:bg-elec-yellow/90 min-h-[44px] touch-manipulation"
            >
              Next Module: Testing & Measurement
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default FiberOpticsModule4Section5;
