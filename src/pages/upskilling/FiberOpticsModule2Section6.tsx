import { ArrowLeft, Zap, CheckCircle, Link2, Puzzle, Shield, Wrench } from "lucide-react";
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
    id: 1,
    question: "The main compatibility rule for fibre optic connections is:",
    options: ["Speed must match", "Fibre type, core size, and polish grade must match", "Colour coding must match", "Manufacturer must match"],
    correctAnswer: 1,
    explanation: "Fibre type, core size, and polish grade must all match for proper optical coupling and to prevent damage."
  },
  {
    id: 2,
    question: "When multimode fibre connects to singlemode fibre directly:",
    options: ["Normal operation", "Extremely high loss (virtually no signal)", "Slight degradation", "Improved performance"],
    correctAnswer: 1,
    explanation: "Direct SM to MM connection results in extremely high loss because the multimode core is too large to couple efficiently with singlemode."
  },
  {
    id: 3,
    question: "A 'hybrid patch cable' has:",
    options: ["Different fibre types at each end", "Different connector types at each end", "Different speeds at each end", "Built-in amplification"],
    correctAnswer: 1,
    explanation: "A hybrid patch cable has different connector types at each end (e.g., LC to SC), enabling connection between different connector systems."
  },
  {
    id: 4,
    question: "To connect LC connectors in a panel designed for SC:",
    options: ["Force them in carefully", "Use LC-SC hybrid adaptors", "Replace the panel", "Use conversion cables only"],
    correctAnswer: 1,
    explanation: "LC-SC hybrid adaptors enable connection between different connector types without panel replacement."
  },
  {
    id: 5,
    question: "Mode conditioning cables are used to:",
    options: ["Increase signal power", "Launch singlemode sources into multimode fibre", "Convert wavelengths", "Test connector quality"],
    correctAnswer: 1,
    explanation: "Mode conditioning cables enable singlemode laser sources to work over multimode fibre by offsetting the launch point."
  },
  {
    id: 6,
    question: "What loss is typical when connecting OM3 to OM4 fibre?",
    options: ["0 dB - fully compatible", "0.1-0.2 dB minimal loss", "1 dB moderate loss", "3 dB significant loss"],
    correctAnswer: 1,
    explanation: "OM3 and OM4 have the same 50µm core size, so they're compatible with only minimal additional loss."
  },
  {
    id: 7,
    question: "Connecting an 8-fibre MTP to a 12-fibre MTP port:",
    options: ["Works fine", "Causes physical damage", "Requires an adapter", "Uses only 8 fibres"],
    correctAnswer: 2,
    explanation: "Different fibre count MTP connectors are not directly interchangeable and require adapters."
  },
  {
    id: 8,
    question: "OS1 and OS2 singlemode fibres are:",
    options: ["Never compatible", "Compatible with minimal loss difference", "Only compatible at low speeds", "Physically different sizes"],
    correctAnswer: 1,
    explanation: "OS1 and OS2 both use 9µm core singlemode fibre and are fully compatible."
  },
  {
    id: 9,
    question: "To verify connector compatibility before mating:",
    options: ["Check colour only", "Verify connector type, fibre type, and polish grade", "Measure with OTDR", "Test at low power first"],
    correctAnswer: 1,
    explanation: "Always verify connector type, fibre type, and polish grade before mating connectors."
  },
  {
    id: 10,
    question: "Attenuators are used when:",
    options: ["Signal is too weak", "Signal is too strong (overload risk)", "Connectors don't match", "Distance is too long"],
    correctAnswer: 1,
    explanation: "Attenuators reduce signal power when it would otherwise be too strong and risk receiver saturation."
  }
];

const faqs = [
  {
    question: "Can I upgrade from OM2 to OM4 by just changing patch cables?",
    answer: "No—the entire fibre link must be OM4 (or better) to achieve OM4 performance. If permanent cabling is OM2, performance is limited to OM2 specifications regardless of patch cable grade. You'd need to replace the horizontal/backbone cabling to gain OM4 benefits. However, using OM4 patches with OM2 infrastructure doesn't cause compatibility problems—it just won't improve performance."
  },
  {
    question: "What's a 'launch cable' and when do I need one?",
    answer: "A launch cable (also called a launch lead or reference cable) is a known-good fibre used to establish measurement references for OTDR testing or insertion loss measurements. You need launch cables at both ends of the link under test to properly characterise the first and last connectors. They should match the fibre type (SM or MM) and connector type of the link being tested."
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

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/fiber-optics-module-2">
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
            <Link2 className="h-4 w-4" />
            <span>Module 2 Section 6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Connector Compatibility
          </h1>
          <p className="text-white/80">
            Essential rules for matching fibre types, connectors, and adaptors
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Match:</strong> Fibre type, core size, OM grade, polish</li>
              <li><strong>Mismatch:</strong> Causes loss, damage, or failure</li>
              <li><strong>Convert:</strong> Use hybrid cables/adaptors when needed</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Check It / Verify It</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Colour:</strong> Verify jacket colour matches</li>
              <li><strong>Type:</strong> Check connector and polish grade</li>
              <li><strong>Inspect:</strong> Use scope when in doubt</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Fibre type compatibility rules",
              "Core size mismatch effects",
              "OM grade interoperability",
              "Polish grade compatibility",
              "Hybrid adaptors and cables",
              "Mode conditioning applications"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Fundamental Compatibility Rules */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Fundamental Compatibility Rules
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Fibre optic connectivity depends on precise <strong>optical and mechanical matching</strong> between components. Unlike copper cabling where slight mismatches might still work, fibre connections require compatible fibre types, core sizes, and connector specifications to function properly.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">The Compatibility Hierarchy:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>1. Fibre Mode (SM vs MM):</strong> Singlemode and multimode are fundamentally incompatible</li>
                <li><strong>2. Core Size (50µm vs 62.5µm):</strong> Mismatched cores cause significant insertion loss</li>
                <li><strong>3. Polish Grade (UPC vs APC):</strong> Mismatched polish causes damage and extreme loss</li>
                <li><strong>4. Connector Type (LC, SC, etc.):</strong> Must match or use appropriate adaptors</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Critical Incompatibilities</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>SM to MM direct:</strong> Virtually no signal transfer (multimode core too large for SM light)</li>
                <li><strong>APC to UPC:</strong> Physical damage to both ferrule end faces</li>
                <li><strong>62.5µm to 50µm:</strong> ~3dB loss per interface (unidirectional)</li>
              </ul>
            </div>

            <p>
              Beyond physical compatibility, ensure <strong>wavelength matching</strong> between transceivers. A 1310nm transmitter won't communicate with an 850nm receiver, though this doesn't cause physical damage—just no signal.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Fibre Type Compatibility */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Fibre Type Compatibility
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The most fundamental compatibility requirement is matching <strong>fibre mode</strong>—singlemode or multimode. These represent different optical transmission physics and cannot be directly interconnected without specialised equipment.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">SM to MM Direct Connection:</p>
              <p className="text-sm text-white mb-2 ml-4">When singlemode (9µm core) connects directly to multimode (50µm or 62.5µm core):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>SM → MM direction:</strong> Works with some loss (small core to large core)</li>
                <li><strong>MM → SM direction:</strong> Massive loss (~20dB+) as large core light misses small core</li>
                <li><strong>Net result:</strong> Unidirectional at best, usually complete failure</li>
              </ul>
            </div>

            <div className="my-6 grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">OM Grade Compatibility</p>
                <p className="text-sm text-white mb-2 ml-4">Within 50µm multimode family:</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>OM2 ↔ OM3 ↔ OM4 ↔ OM5: Compatible</li>
                  <li>Performance limited by lowest grade</li>
                  <li>Minimal additional loss (~0.1dB)</li>
                  <li>Mixing grades is acceptable</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Core Size Mismatch</p>
                <p className="text-sm text-white mb-2 ml-4">OM1 (62.5µm) to OM2+ (50µm):</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>~3dB loss large→small direction</li>
                  <li>~0.5dB loss small→large direction</li>
                  <li>Avoid where possible</li>
                  <li>Document if unavoidable</li>
                </ul>
              </div>
            </div>

            <p>
              <strong>OS1 and OS2 Singlemode Compatibility:</strong> Both OS1 and OS2 use 9µm core singlemode fibre—they're <strong>fully compatible</strong> with negligible additional loss. The difference is in attenuation specifications and water peak performance, not physical dimensions. You can freely mix OS1 and OS2 in the same link.
            </p>
          </div>
        </section>

        {/* Section 03: Connector and Adaptor Compatibility */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Connector and Adaptor Compatibility
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Different connector types (LC, SC, ST, etc.) use different physical dimensions and cannot be directly mated. However, they can be interconnected using <strong>hybrid adaptors</strong> or <strong>hybrid patch cables</strong> that provide proper transitions.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Adaptor Options:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Standard Adaptors (Couplers):</strong> Same connector on both sides (LC-LC, SC-SC). Used to connect patch cables or extend links. Each adds ~0.2dB loss.</li>
                <li><strong>Hybrid Adaptors:</strong> Different connectors (LC-SC, ST-SC). Enable connection between different connector systems. Slightly higher loss due to internal alignment.</li>
                <li><strong>Hybrid Patch Cables:</strong> One connector type each end (e.g., LC to SC). Factory-made for reliable transition. Preferred over adaptors for permanent links.</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Hybrid Combinations</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm text-white ml-4">
                <span>LC to SC</span>
                <span>LC to ST</span>
                <span>SC to ST</span>
                <span>LC to FC</span>
                <span>MTP to 6×LC</span>
                <span>SC to E2000</span>
              </div>
            </div>

            <p>
              <strong>MTP/MPO Fibre Count:</strong> MTP connectors come in 8, 12, and 24 fibre variants. These are <strong>not interchangeable</strong>—an 8-fibre connector won't properly mate with a 12-fibre port. Always verify fibre count matches. Trunk cables and cassettes must have matching MTP configurations at each end.
            </p>

            <p>
              When connecting different polish grades within the same connector family, remember: <strong>UPC connectors must use UPC adaptors</strong> and <strong>APC connectors must use APC adaptors</strong>. Never force an APC connector into a UPC adaptor—check the colour coding (green=APC, blue=UPC).
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Mode Conditioning */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Mode Conditioning
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              <strong>Mode conditioning cables (MCCs)</strong> enable singlemode laser sources (like 1000BASE-LX transceivers) to work over multimode fibre for limited distances. They're used when equipment has only singlemode optics but installed cabling is multimode.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">How Mode Conditioning Works</p>
              <p className="text-sm text-white ml-4">
                A singlemode laser launched centrally into multimode fibre causes <strong>differential mode delay (DMD)</strong>—different modal groups travel at different speeds, causing pulse spreading and errors. An MCC uses a short singlemode fibre section with an <strong>offset splice</strong> to multimode. This launches light off-centre, exciting a more uniform set of modes and reducing DMD.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">MCC Specifications:</p>
              <div className="grid grid-cols-2 gap-4 text-sm text-white ml-4">
                <div>
                  <p className="text-elec-yellow/80">Equipment Side</p>
                  <p>Singlemode (to transceiver)</p>
                </div>
                <div>
                  <p className="text-elec-yellow/80">Network Side</p>
                  <p>Multimode (to cabling)</p>
                </div>
                <div>
                  <p className="text-elec-yellow/80">Typical Application</p>
                  <p>1000BASE-LX over MMF</p>
                </div>
                <div>
                  <p className="text-elec-yellow/80">Max Distance</p>
                  <p>550m (62.5µm) / 550m (50µm)</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">MCC Limitations</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Only works for 1G (1000BASE-LX)—not applicable to 10G+</li>
                <li>Requires MCC at <strong>both</strong> ends of the link</li>
                <li>Adds insertion loss (typically 1-2dB per cable)</li>
                <li>Modern OM3/OM4 with VCSEL sources have made MCCs largely obsolete</li>
                <li>Consider SR transceivers and upgrade plans instead</li>
              </ul>
            </div>

            <p>
              Mode conditioning cables are a <strong>legacy solution</strong>—most scenarios where they were needed are now better served by using appropriate multimode transceivers (like 1000BASE-SX) or planning infrastructure upgrades. They remain useful for maintaining older singlemode equipment on multimode campus networks.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Attenuators and Power Matching */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Attenuators and Power Matching
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              <strong>Optical attenuators</strong> reduce signal power when the received signal would otherwise be too strong. This typically occurs with short fibre runs where the transmitter power exceeds the receiver's maximum input, risking <strong>receiver saturation or damage</strong>.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">When Attenuation is Needed:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Short singlemode links (metres instead of kilometres)</li>
                <li>High-power transmitters on short reaches</li>
                <li>Receiver overload errors (despite good link)</li>
                <li>Testing equipment at reduced power levels</li>
              </ul>
            </div>

            <div className="my-6 grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fixed Attenuators</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Set values: 1dB, 3dB, 5dB, 10dB, etc.</li>
                  <li>In-line (male-female) design</li>
                  <li>Plug into adaptor or between cables</li>
                  <li>Low cost, simple installation</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Variable Attenuators</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Adjustable: 0-30dB typical range</li>
                  <li>Dial or screw adjustment</li>
                  <li>Used in test setups</li>
                  <li>Higher cost, lab/test use</li>
                </ul>
              </div>
            </div>

            <p>
              <strong>Calculating Attenuation Need:</strong> Check transceiver specifications for transmit power and receiver sensitivity/overload. Example: If TX = 0dBm, link loss = 2dB, received power = -2dBm. If receiver overload is -3dBm, you're 1dB over—add a 3-5dB attenuator for safety margin. Many modern transceivers have wide dynamic range and rarely need attenuation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Common Attenuator Errors</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Adding attenuation when not needed (introduces unnecessary loss)</li>
                <li>Wrong connector type or polish grade on attenuator</li>
                <li>Using attenuators that don't match the wavelength</li>
                <li>Forgetting attenuators during troubleshooting (they add loss!)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 06: Compatibility Verification */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Compatibility Verification
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Before connecting any fibre components, follow a systematic <strong>verification process</strong> to prevent damage and ensure proper operation. This becomes second nature with experience but should be deliberate for new installations.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Pre-Connection Checklist:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>1. Fibre Type Match:</strong> Yellow = singlemode, Orange/Aqua/Lime = multimode. Verify both ends.</li>
                <li><strong>2. Core Size (Multimode):</strong> Check cable marking: 50/125 or 62.5/125. Match throughout link.</li>
                <li><strong>3. Connector Type:</strong> LC, SC, ST, MTP? Ensure adaptor matches or use hybrid.</li>
                <li><strong>4. Polish Grade:</strong> Blue = UPC, Green = APC. Must match connector AND adaptor.</li>
                <li><strong>5. Cleanliness:</strong> Inspect and clean end faces before mating.</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Documentation Requirements</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Record fibre type and grade for every cable run</li>
                <li>Document connector types at each end</li>
                <li>Note any hybrid cables or adaptors in the path</li>
                <li>Include attenuators in link loss calculations</li>
                <li>Update records when changes are made</li>
              </ul>
            </div>

            <p>
              <strong>When to Use Visual Inspection:</strong> Use a fibre microscope to inspect end faces: before first connection of new cables, when troubleshooting high loss, when connections have been exposed to contamination, and whenever you suspect damage. This catches problems before they affect multiple connections.
            </p>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Best Practices</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Standardise on one fibre type per system where possible</li>
                <li>Label all cables with fibre type, grade, and connector details</li>
                <li>Store patch cables by type to prevent accidental mixing</li>
                <li>Train all personnel on colour coding and compatibility rules</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Troubleshooting Compatibility Issues</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>High loss? Check for core size mismatch or wrong polish grade adaptor</li>
                <li>No signal? Verify SM/MM and wavelength match</li>
                <li>Intermittent? Look for damaged ferrules from APC/UPC mismatch</li>
                <li>Errors at short distance? May need attenuation</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Assuming all yellow fibre is the same</strong> — OS1/OS2, different polish</li>
                <li><strong>Forcing connections</strong> — could be wrong type</li>
                <li><strong>Not checking adaptors</strong> — connector may be right, adaptor wrong</li>
                <li><strong>Mixing suppliers</strong> — without verifying specifications match</li>
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
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference: Compatibility Rules</h3>
            <div className="space-y-2 text-sm text-white">
              <p><strong className="text-elec-yellow">Compatible:</strong> OM2↔OM3↔OM4↔OM5 (same 50µm core)</p>
              <p><strong className="text-elec-yellow">Compatible:</strong> OS1↔OS2 (same 9µm core)</p>
              <p><strong className="text-elec-yellow/80">High Loss:</strong> 62.5µm↔50µm (~3dB one direction)</p>
              <p><strong className="text-red-400/80">Incompatible:</strong> SM↔MM direct (no signal)</p>
              <p><strong className="text-red-400/80">Damaging:</strong> APC↔UPC (ferrule damage)</p>
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
            <Link to="../section-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Patch Panels
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/fiber-optics-module-3">
              Next: Module 3
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default FiberOpticsModule2Section6;
