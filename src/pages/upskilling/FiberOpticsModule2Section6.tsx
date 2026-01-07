import { useState } from "react";
import { ArrowLeft, Zap, CheckCircle, Info, BookOpen, Lightbulb, AlertTriangle, HelpCircle, ChevronDown, ChevronUp, Link2, Puzzle, Shield, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Connector Compatibility | Fibre Optics Module 2";
const DESCRIPTION = "Master fibre optic connector compatibility rules including fibre types, polish grades, and adaptor selection. Learn to identify and prevent damaging mismatches in UK installations.";

const quickCheckQuestions = [
  {
    id: "fo-m2s6-qc1",
    question: "What happens when connecting 62.5µm (OM1) fibre to 50µm (OM2-5) fibre?",
    options: ["Perfect connection", "Approximately 3dB loss", "No signal transfer", "Connector damage"],
    correctIndex: 1,
    explanation: "Connecting 62.5µm to 50µm causes approximately 3dB insertion loss due to core size mismatch. Light from the larger core overfills the smaller core, losing power to the cladding."
  },
  {
    id: "fo-m2s6-qc2",
    question: "Which adaptor type enables connection between LC and SC connectors?",
    options: ["Mode conditioning", "Hybrid adaptor", "Attenuator", "Splitter"],
    correctIndex: 1,
    explanation: "A hybrid adaptor (LC-SC) has different connector ports on each side, enabling connection between different connector types while maintaining the optical path."
  },
  {
    id: "fo-m2s6-qc3",
    question: "Can you connect a singlemode transceiver to multimode fibre?",
    options: ["Yes, with reduced distance", "Yes, using mode conditioning", "No, never compatible", "Yes, at lower speeds only"],
    correctIndex: 1,
    explanation: "With a mode conditioning patch cable, singlemode transceivers can sometimes work over multimode fibre for limited distances. The MCP offsets the launch to reduce modal dispersion."
  }
];

const quizQuestions = [
  {
    question: "The main compatibility rule for fibre optic connections is:",
    options: ["Speed must match", "Fibre type, core size, and polish grade must match", "Colour coding must match", "Manufacturer must match"],
    correctAnswer: 1
  },
  {
    question: "When multimode fibre connects to singlemode fibre directly:",
    options: ["Normal operation", "Extremely high loss (virtually no signal)", "Slight degradation", "Improved performance"],
    correctAnswer: 1
  },
  {
    question: "A 'hybrid patch cable' has:",
    options: ["Different fibre types at each end", "Different connector types at each end", "Different speeds at each end", "Built-in amplification"],
    correctAnswer: 1
  },
  {
    question: "To connect LC connectors in a panel designed for SC:",
    options: ["Force them in carefully", "Use LC-SC hybrid adaptors", "Replace the panel", "Use conversion cables only"],
    correctAnswer: 1
  },
  {
    question: "Mode conditioning cables are used to:",
    options: ["Increase signal power", "Launch singlemode sources into multimode fibre", "Convert wavelengths", "Test connector quality"],
    correctAnswer: 1
  },
  {
    question: "What loss is typical when connecting OM3 to OM4 fibre?",
    options: ["0 dB - fully compatible", "0.1-0.2 dB minimal loss", "1 dB moderate loss", "3 dB significant loss"],
    correctAnswer: 1
  },
  {
    question: "Connecting an 8-fibre MTP to a 12-fibre MTP port:",
    options: ["Works fine", "Causes physical damage", "Requires an adapter", "Uses only 8 fibres"],
    correctAnswer: 2
  },
  {
    question: "OS1 and OS2 singlemode fibres are:",
    options: ["Never compatible", "Compatible with minimal loss difference", "Only compatible at low speeds", "Physically different sizes"],
    correctAnswer: 1
  },
  {
    question: "To verify connector compatibility before mating:",
    options: ["Check colour only", "Verify connector type, fibre type, and polish grade", "Measure with OTDR", "Test at low power first"],
    correctAnswer: 1
  },
  {
    question: "Attenuators are used when:",
    options: ["Signal is too weak", "Signal is too strong (overload risk)", "Connectors don't match", "Distance is too long"],
    correctAnswer: 1
  }
];

const faqs = [
  {
    question: "Can I upgrade from OM2 to OM4 by just changing patch cables?",
    answer: "No—the entire fibre link must be OM4 (or better) to achieve OM4 performance. If permanent cabling is OM2, performance is limited to OM2 specifications regardless of patch cable grade. You'd need to replace the horizontal/backbone cabling to gain OM4 benefits. However, using OM4 patches with OM2 infrastructure doesn't cause compatibility problems—it just won't improve performance."
  },
  {
    question: "What's a 'launch cable' and when do I need one?",
    answer: "A launch cable (also called a launch lead or reference cable) is a known-good fibre used to establish measurement references for OTDR testing or insertion loss measurements. You need launch cables at both ends of the link under test to properly characterize the first and last connectors. They should match the fibre type (SM or MM) and connector type of the link being tested."
  },
  {
    question: "My equipment has SC ports but my cabling is LC—what are my options?",
    answer: "Three options: 1) LC-SC hybrid patch cables (one end LC, one end SC), 2) LC-SC hybrid adaptors at the patch panel, or 3) Convert patch panel positions to SC adaptors. Option 1 is usually simplest for a few connections. For many connections, option 3 provides cleaner cable management. Hybrid adaptors work but add an extra mated pair loss."
  },
  {
    question: "Is there any situation where mixing APC and UPC is acceptable?",
    answer: "The only acceptable situation is using a properly made hybrid patch cable with APC on one end and UPC on the other. Inside the cable, there's a transition point (often a splice) that properly couples the light. Direct mating of APC to UPC (connector to adaptor) is never acceptable and always causes damage. Some test equipment uses APC internally with UPC test ports via internal transitions."
  },
  {
    question: "How do I handle legacy FDDI or ESCON connectors?",
    answer: "FDDI (MIC) and ESCON connectors are rare in new installations but exist in some legacy systems. Hybrid cables or adaptors are available to convert to modern LC or SC. For long-term maintenance, consider upgrading the equipment to eliminate these obsolete connector types. When they must remain, stock replacement parts carefully—they're increasingly hard to source."
  },
  {
    question: "What happens if I connect 850nm and 1310nm transceivers?",
    answer: "No communication occurs—the receiver expects light at one wavelength but receives another. The receiver's filter or the photodiode's sensitivity won't properly respond. Unlike connector mismatches, wavelength mismatch doesn't cause physical damage, but the link won't function. Always verify both ends use matching wavelengths, especially in mixed transceiver inventories."
  }
];

const FiberOpticsModule2Section6 = () => {
  useSEO({
    title: TITLE,
    description: DESCRIPTION
  });

  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#1a1a1a]/95 backdrop-blur supports-[backdrop-filter]:bg-[#1a1a1a]/60">
        <div className="container flex h-14 max-w-screen-2xl items-center px-4">
          <Link
            to="/study-centre/apprentice/fibre-optics/module-2"
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors touch-manipulation min-h-[44px]"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Module 2</span>
          </Link>
        </div>
      </header>

      <main className="container max-w-4xl mx-auto px-4 py-6 space-y-8">
        {/* Title Section */}
        <section className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm font-medium px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/30">
            <Link2 className="h-4 w-4" />
            Module 2 • Section 6
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Connector Compatibility
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Essential rules for matching fibre types, connectors, and adaptors
          </p>
        </section>

        {/* Quick Summary Cards */}
        <section className="grid sm:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 rounded-xl p-5 border border-elec-yellow/30">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                <Zap className="h-5 w-5 text-elec-yellow" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">In 30 Seconds</h3>
                <p className="text-sm text-white/80">
                  Match: fibre type (SM/MM), core size (50/62.5µm), OM grade, polish (UPC/APC), and connector type. Mismatches cause loss, damage, or failure. Use hybrid cables/adaptors when conversion needed.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-xl p-5 border border-blue-500/30">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                <Info className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Check It / Verify It</h3>
                <p className="text-sm text-white/80">
                  Before connecting: verify jacket colour matches, check connector type and polish grade, read cable markings. When in doubt, inspect with scope. Never force connections.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Learning Outcomes */}
        <section className="bg-white/5 rounded-xl p-6 border border-white/10">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-elec-yellow" />
            What You'll Learn
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Fibre type compatibility rules",
              "Core size mismatch effects",
              "OM grade interoperability",
              "Polish grade compatibility",
              "Hybrid adaptors and cables",
              "Mode conditioning applications"
            ].map((outcome, index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">{outcome}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 1: Fundamental Compatibility Rules */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">01</span>
            <h2 className="text-2xl font-bold">Fundamental Compatibility Rules</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Fibre optic connectivity depends on precise <strong>optical and mechanical matching</strong> between components. Unlike copper cabling where slight mismatches might still work, fibre connections require compatible fibre types, core sizes, and connector specifications to function properly.
            </p>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-elec-yellow mb-3">The Compatibility Hierarchy</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-500/20 text-red-400 text-sm font-bold flex-shrink-0">1</span>
                  <div>
                    <p className="font-medium text-white">Fibre Mode (SM vs MM)</p>
                    <p className="text-sm text-white/60">Singlemode and multimode are fundamentally incompatible</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 text-sm font-bold flex-shrink-0">2</span>
                  <div>
                    <p className="font-medium text-white">Core Size (50µm vs 62.5µm)</p>
                    <p className="text-sm text-white/60">Mismatched cores cause significant insertion loss</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-yellow-500/20 text-yellow-400 text-sm font-bold flex-shrink-0">3</span>
                  <div>
                    <p className="font-medium text-white">Polish Grade (UPC vs APC)</p>
                    <p className="text-sm text-white/60">Mismatched polish causes damage and extreme loss</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20 text-green-400 text-sm font-bold flex-shrink-0">4</span>
                  <div>
                    <p className="font-medium text-white">Connector Type (LC, SC, etc.)</p>
                    <p className="text-sm text-white/60">Must match or use appropriate adaptors</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/30">
              <h4 className="font-semibold text-red-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Critical Incompatibilities
              </h4>
              <ul className="text-sm space-y-1">
                <li>• <strong>SM to MM direct:</strong> Virtually no signal transfer (multimode core too large for SM light)</li>
                <li>• <strong>APC to UPC:</strong> Physical damage to both ferrule end faces</li>
                <li>• <strong>62.5µm to 50µm:</strong> ~3dB loss per interface (unidirectional)</li>
              </ul>
            </div>

            <p>
              Beyond physical compatibility, ensure <strong>wavelength matching</strong> between transceivers. A 1310nm transmitter won't communicate with an 850nm receiver, though this doesn't cause physical damage—just no signal.
            </p>
          </div>
        </section>

        {/* Inline Check 1 */}
        <InlineCheck
          id={quickCheckQuestions[0].id}
          question={quickCheckQuestions[0].question}
          options={quickCheckQuestions[0].options}
          correctIndex={quickCheckQuestions[0].correctIndex}
          explanation={quickCheckQuestions[0].explanation}
        />

        {/* Section 2: Fibre Type Compatibility */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">02</span>
            <h2 className="text-2xl font-bold">Fibre Type Compatibility</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              The most fundamental compatibility requirement is matching <strong>fibre mode</strong>—singlemode or multimode. These represent different optical transmission physics and cannot be directly interconnected without specialised equipment.
            </p>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-elec-yellow mb-3">SM to MM Direct Connection</h4>
              <p className="text-sm mb-3">
                When singlemode (9µm core) connects directly to multimode (50µm or 62.5µm core):
              </p>
              <ul className="text-sm space-y-1">
                <li>• <strong>SM → MM direction:</strong> Works with some loss (small core to large core)</li>
                <li>• <strong>MM → SM direction:</strong> Massive loss (~20dB+) as large core light misses small core</li>
                <li>• <strong>Net result:</strong> Unidirectional at best, usually complete failure</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30">
                <h4 className="font-semibold text-green-400 mb-2">OM Grade Compatibility</h4>
                <p className="text-sm text-white/70 mb-2">Within 50µm multimode family:</p>
                <ul className="text-sm space-y-1">
                  <li>• OM2 ↔ OM3 ↔ OM4 ↔ OM5: Compatible</li>
                  <li>• Performance limited by lowest grade</li>
                  <li>• Minimal additional loss (~0.1dB)</li>
                  <li>• Mixing grades is acceptable</li>
                </ul>
              </div>
              <div className="bg-amber-500/10 rounded-lg p-4 border border-amber-500/30">
                <h4 className="font-semibold text-amber-400 mb-2">Core Size Mismatch</h4>
                <p className="text-sm text-white/70 mb-2">OM1 (62.5µm) to OM2+ (50µm):</p>
                <ul className="text-sm space-y-1">
                  <li>• ~3dB loss large→small direction</li>
                  <li>• ~0.5dB loss small→large direction</li>
                  <li>• Avoid where possible</li>
                  <li>• Document if unavoidable</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/30">
              <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                <Info className="h-4 w-4" />
                OS1 and OS2 Singlemode Compatibility
              </h4>
              <p className="text-sm">
                Both OS1 and OS2 use 9µm core singlemode fibre—they're <strong>fully compatible</strong> with negligible additional loss. The difference is in attenuation specifications and water peak performance, not physical dimensions. You can freely mix OS1 and OS2 in the same link.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Connector and Adaptor Compatibility */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">03</span>
            <h2 className="text-2xl font-bold">Connector and Adaptor Compatibility</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Different connector types (LC, SC, ST, etc.) use different physical dimensions and cannot be directly mated. However, they can be interconnected using <strong>hybrid adaptors</strong> or <strong>hybrid patch cables</strong> that provide proper transitions.
            </p>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-elec-yellow mb-3">Adaptor Options</h4>
              <div className="space-y-3">
                <div>
                  <h5 className="font-medium text-white">Standard Adaptors (Couplers)</h5>
                  <p className="text-sm text-white/70">Same connector on both sides (LC-LC, SC-SC). Used to connect patch cables or extend links. Each add ~0.2dB loss.</p>
                </div>
                <div>
                  <h5 className="font-medium text-white">Hybrid Adaptors</h5>
                  <p className="text-sm text-white/70">Different connectors (LC-SC, ST-SC). Enable connection between different connector systems. Slightly higher loss due to internal alignment.</p>
                </div>
                <div>
                  <h5 className="font-medium text-white">Hybrid Patch Cables</h5>
                  <p className="text-sm text-white/70">One connector type each end (e.g., LC to SC). Factory-made for reliable transition. Preferred over adaptors for permanent links.</p>
                </div>
              </div>
            </div>

            <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30">
              <h4 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
                <Puzzle className="h-4 w-4" />
                Common Hybrid Combinations
              </h4>
              <div className="grid grid-cols-2 gap-2 text-sm mt-2">
                <div>• LC to SC</div>
                <div>• LC to ST</div>
                <div>• SC to ST</div>
                <div>• LC to FC</div>
                <div>• MTP to 6×LC</div>
                <div>• SC to E2000</div>
              </div>
            </div>

            <div className="bg-amber-500/10 rounded-lg p-4 border border-amber-500/30">
              <h4 className="font-semibold text-amber-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                MTP/MPO Fibre Count
              </h4>
              <p className="text-sm">
                MTP connectors come in 8, 12, and 24 fibre variants. These are <strong>not interchangeable</strong>—an 8-fibre connector won't properly mate with a 12-fibre port. Always verify fibre count matches. Trunk cables and cassettes must have matching MTP configurations at each end.
              </p>
            </div>

            <p>
              When connecting different polish grades within the same connector family, remember: <strong>UPC connectors must use UPC adaptors</strong> and <strong>APC connectors must use APC adaptors</strong>. Never force an APC connector into a UPC adaptor—check the colour coding (green=APC, blue=UPC).
            </p>
          </div>
        </section>

        {/* Inline Check 2 */}
        <InlineCheck
          id={quickCheckQuestions[1].id}
          question={quickCheckQuestions[1].question}
          options={quickCheckQuestions[1].options}
          correctIndex={quickCheckQuestions[1].correctIndex}
          explanation={quickCheckQuestions[1].explanation}
        />

        {/* Section 4: Mode Conditioning */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">04</span>
            <h2 className="text-2xl font-bold">Mode Conditioning</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              <strong>Mode conditioning cables (MCCs)</strong> enable singlemode laser sources (like 1000BASE-LX transceivers) to work over multimode fibre for limited distances. They're used when equipment has only singlemode optics but installed cabling is multimode.
            </p>

            <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/30">
              <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                <Info className="h-4 w-4" />
                How Mode Conditioning Works
              </h4>
              <p className="text-sm">
                A singlemode laser launched centrally into multimode fibre causes <strong>differential mode delay (DMD)</strong>—different modal groups travel at different speeds, causing pulse spreading and errors. An MCC uses a short singlemode fibre section with an <strong>offset splice</strong> to multimode. This launches light off-centre, exciting a more uniform set of modes and reducing DMD.
              </p>
            </div>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-elec-yellow mb-3">MCC Specifications</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-white/60">Equipment Side</p>
                  <p className="font-medium">Singlemode (to transceiver)</p>
                </div>
                <div>
                  <p className="text-white/60">Network Side</p>
                  <p className="font-medium">Multimode (to cabling)</p>
                </div>
                <div>
                  <p className="text-white/60">Typical Application</p>
                  <p className="font-medium">1000BASE-LX over MMF</p>
                </div>
                <div>
                  <p className="text-white/60">Max Distance</p>
                  <p className="font-medium">550m (62.5µm) / 550m (50µm)</p>
                </div>
              </div>
            </div>

            <div className="bg-amber-500/10 rounded-lg p-4 border border-amber-500/30">
              <h4 className="font-semibold text-amber-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                MCC Limitations
              </h4>
              <ul className="text-sm space-y-1">
                <li>• Only works for 1G (1000BASE-LX)—not applicable to 10G+</li>
                <li>• Requires MCC at <strong>both</strong> ends of the link</li>
                <li>• Adds insertion loss (typically 1-2dB per cable)</li>
                <li>• Modern OM3/OM4 with VCSEL sources have made MCCs largely obsolete</li>
                <li>• Consider SR transceivers and upgrade plans instead</li>
              </ul>
            </div>

            <p>
              Mode conditioning cables are a <strong>legacy solution</strong>—most scenarios where they were needed are now better served by using appropriate multimode transceivers (like 1000BASE-SX) or planning infrastructure upgrades. They remain useful for maintaining older singlemode equipment on multimode campus networks.
            </p>
          </div>
        </section>

        {/* Inline Check 3 */}
        <InlineCheck
          id={quickCheckQuestions[2].id}
          question={quickCheckQuestions[2].question}
          options={quickCheckQuestions[2].options}
          correctIndex={quickCheckQuestions[2].correctIndex}
          explanation={quickCheckQuestions[2].explanation}
        />

        {/* Section 5: Attenuators and Power Matching */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">05</span>
            <h2 className="text-2xl font-bold">Attenuators and Power Matching</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              <strong>Optical attenuators</strong> reduce signal power when the received signal would otherwise be too strong. This typically occurs with short fibre runs where the transmitter power exceeds the receiver's maximum input, risking <strong>receiver saturation or damage</strong>.
            </p>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-elec-yellow mb-3">When Attenuation is Needed</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                  <span>Short singlemode links (metres instead of kilometres)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                  <span>High-power transmitters on short reaches</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                  <span>Receiver overload errors (despite good link)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                  <span>Testing equipment at reduced power levels</span>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-elec-yellow mb-2">Fixed Attenuators</h4>
                <ul className="text-sm space-y-1">
                  <li>• Set values: 1dB, 3dB, 5dB, 10dB, etc.</li>
                  <li>• In-line (male-female) design</li>
                  <li>• Plug into adaptor or between cables</li>
                  <li>• Low cost, simple installation</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-elec-yellow mb-2">Variable Attenuators</h4>
                <ul className="text-sm space-y-1">
                  <li>• Adjustable: 0-30dB typical range</li>
                  <li>• Dial or screw adjustment</li>
                  <li>• Used in test setups</li>
                  <li>• Higher cost, lab/test use</li>
                </ul>
              </div>
            </div>

            <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30">
              <h4 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Calculating Attenuation Need
              </h4>
              <p className="text-sm">
                Check transceiver specifications for <strong>transmit power</strong> and <strong>receiver sensitivity/overload</strong>. Example: If TX = 0dBm, link loss = 2dB, received power = -2dBm. If receiver overload is -3dBm, you're 1dB over—add a 3-5dB attenuator for safety margin. Many modern transceivers have wide dynamic range and rarely need attenuation.
              </p>
            </div>

            <div className="bg-amber-500/10 rounded-lg p-4 border border-amber-500/30">
              <h4 className="font-semibold text-amber-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Common Attenuator Errors
              </h4>
              <ul className="text-sm space-y-1">
                <li>• Adding attenuation when not needed (introduces unnecessary loss)</li>
                <li>• Wrong connector type or polish grade on attenuator</li>
                <li>• Using attenuators that don't match the wavelength</li>
                <li>• Forgetting attenuators during troubleshooting (they add loss!)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 6: Compatibility Verification */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">06</span>
            <h2 className="text-2xl font-bold">Compatibility Verification</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Before connecting any fibre components, follow a systematic <strong>verification process</strong> to prevent damage and ensure proper operation. This becomes second nature with experience but should be deliberate for new installations.
            </p>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-elec-yellow mb-3">Pre-Connection Checklist</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-sm">
                  <div className="w-6 h-6 rounded bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 text-elec-yellow font-bold">1</div>
                  <div>
                    <p className="font-medium text-white">Fibre Type Match</p>
                    <p className="text-white/60">Yellow = singlemode, Orange/Aqua/Lime = multimode. Verify both ends.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <div className="w-6 h-6 rounded bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 text-elec-yellow font-bold">2</div>
                  <div>
                    <p className="font-medium text-white">Core Size (Multimode)</p>
                    <p className="text-white/60">Check cable marking: 50/125 or 62.5/125. Match throughout link.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <div className="w-6 h-6 rounded bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 text-elec-yellow font-bold">3</div>
                  <div>
                    <p className="font-medium text-white">Connector Type</p>
                    <p className="text-white/60">LC, SC, ST, MTP? Ensure adaptor matches or use hybrid.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <div className="w-6 h-6 rounded bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 text-elec-yellow font-bold">4</div>
                  <div>
                    <p className="font-medium text-white">Polish Grade</p>
                    <p className="text-white/60">Blue = UPC, Green = APC. Must match connector AND adaptor.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <div className="w-6 h-6 rounded bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 text-elec-yellow font-bold">5</div>
                  <div>
                    <p className="font-medium text-white">Cleanliness</p>
                    <p className="text-white/60">Inspect and clean end faces before mating.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30">
              <h4 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Documentation Requirements
              </h4>
              <ul className="text-sm space-y-1">
                <li>• Record fibre type and grade for every cable run</li>
                <li>• Document connector types at each end</li>
                <li>• Note any hybrid cables or adaptors in the path</li>
                <li>• Include attenuators in link loss calculations</li>
                <li>• Update records when changes are made</li>
              </ul>
            </div>

            <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/30">
              <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                <Info className="h-4 w-4" />
                When to Use Visual Inspection
              </h4>
              <p className="text-sm">
                Use a fibre microscope to inspect end faces: before first connection of new cables, when troubleshooting high loss, when connections have been exposed to contamination, and whenever you suspect damage. This catches problems before they affect multiple connections.
              </p>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="bg-white/5 rounded-xl p-6 border border-white/10 space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Wrench className="h-5 w-5 text-elec-yellow" />
            Practical Guidance
          </h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-white mb-2">Best Practices</h3>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Standardise on one fibre type per system where possible</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Label all cables with fibre type, grade, and connector details</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Store patch cables by type to prevent accidental mixing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Train all personnel on colour coding and compatibility rules</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-2">Troubleshooting Compatibility Issues</h3>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>High loss? Check for core size mismatch or wrong polish grade adaptor</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>No signal? Verify SM/MM and wavelength match</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Intermittent? Look for damaged ferrules from APC/UPC mismatch</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Errors at short distance? May need attenuation</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-2">Common Mistakes to Avoid</h3>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Assuming all yellow fibre is the same (OS1/OS2, different polish)</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Forcing connections when they feel tight (could be wrong type)</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Not checking adaptors (connector may be right, adaptor wrong)</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Mixing suppliers without verifying specifications match</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-elec-yellow" />
            Frequently Asked Questions
          </h2>

          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/5 rounded-lg border border-white/10 overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-4 py-3 text-left flex items-center justify-between gap-4 hover:bg-white/5 transition-colors touch-manipulation min-h-[44px]"
                >
                  <span className="font-medium text-white">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-white/60 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-white/60 flex-shrink-0" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-4 pb-4 text-white/70 text-sm">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 rounded-xl p-6 border border-elec-yellow/30">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Link2 className="h-5 w-5 text-elec-yellow" />
            Quick Reference: Compatibility Rules
          </h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <span className="text-green-400 font-bold">✓</span>
              <span className="text-white/80"><strong>Compatible:</strong> OM2↔OM3↔OM4↔OM5 (same 50µm core)</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-green-400 font-bold">✓</span>
              <span className="text-white/80"><strong>Compatible:</strong> OS1↔OS2 (same 9µm core)</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-amber-400 font-bold">⚠</span>
              <span className="text-white/80"><strong>High Loss:</strong> 62.5µm↔50µm (~3dB one direction)</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-red-400 font-bold">✗</span>
              <span className="text-white/80"><strong>Incompatible:</strong> SM↔MM direct (no signal)</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-red-400 font-bold">✗</span>
              <span className="text-white/80"><strong>Damaging:</strong> APC↔UPC (ferrule damage)</span>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="bg-white/5 rounded-xl p-6 border border-white/10">
          <Quiz
            title="Connector Compatibility Quiz"
            questions={quizQuestions}
            passingScore={80}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-white/10">
          <Link
            to="/study-centre/apprentice/fibre-optics/module-2/section-5"
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors touch-manipulation min-h-[44px] active:scale-[0.98]"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Previous: Patch Panels</span>
          </Link>
          <Link
            to="/study-centre/apprentice/fibre-optics/module-3"
            className="flex items-center gap-2 text-elec-yellow hover:text-elec-yellow/80 transition-colors touch-manipulation min-h-[44px] sm:flex-row-reverse active:scale-[0.98]"
          >
            <span>Next: Module 3 - Fibre Components</span>
            <ArrowLeft className="h-5 w-5 rotate-180" />
          </Link>
        </nav>
      </main>
    </div>
  );
};

export default FiberOpticsModule2Section6;