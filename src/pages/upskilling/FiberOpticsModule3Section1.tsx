import { useState } from "react";
import { ArrowLeft, Zap, CheckCircle, Info, BookOpen, Lightbulb, AlertTriangle, HelpCircle, ChevronDown, ChevronUp, Cable, Shield, Building, TreePine } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Fibre Cable Types: Indoor, Outdoor, Armoured | Fibre Optics Module 3";
const DESCRIPTION = "Master fibre optic cable construction types including indoor, outdoor, and armoured cables. Learn selection criteria, environmental ratings, and installation requirements for UK applications.";

const quickCheckQuestions = [
  {
    id: "fo-m3s1-qc1",
    question: "What type of fibre buffer construction uses a gel-filled tube around loose fibres?",
    options: ["Tight-buffered", "Loose-tube", "Ribbon", "Direct-buried"],
    correctIndex: 1,
    explanation: "Loose-tube construction houses fibres loosely in gel-filled tubes, providing protection against temperature changes and mechanical stress in outdoor applications."
  },
  {
    id: "fo-m3s1-qc2",
    question: "What is the primary purpose of steel wire armour (SWA) in fibre cables?",
    options: ["Improved bandwidth", "Rodent and mechanical protection", "Better bend radius", "Lower attenuation"],
    correctIndex: 1,
    explanation: "Steel wire armour provides mechanical protection against crushing, impact, and rodent damage, essential for direct burial and external applications."
  },
  {
    id: "fo-m3s1-qc3",
    question: "LSZH sheathing is required in UK buildings primarily for:",
    options: ["Better waterproofing", "Lower cost", "Fire safety - reduced toxic fumes", "Easier stripping"],
    correctIndex: 2,
    explanation: "Low Smoke Zero Halogen (LSZH) sheathing emits minimal smoke and no toxic halogen gases when burned, crucial for occupied buildings per UK building regulations."
  }
];

const quizQuestions = [
  {
    question: "Tight-buffered fibre cables are most suitable for:",
    options: ["Direct burial", "Indoor and riser applications", "Submarine installations", "Overhead aerial"],
    correctAnswer: 1
  },
  {
    question: "The gel in loose-tube cables serves to:",
    options: ["Increase bandwidth", "Protect fibres from moisture and allow thermal expansion", "Improve bend radius", "Reduce weight"],
    correctAnswer: 1
  },
  {
    question: "What does 'CST' stand for in fibre cable construction?",
    options: ["Copper Shielded Tube", "Corrugated Steel Tape", "Central Strength Tube", "Cable Support Tray"],
    correctAnswer: 1
  },
  {
    question: "Plenum-rated cables in the UK equivalent are typically:",
    options: ["PVC sheathed", "PE sheathed", "LSZH sheathed with Euroclass ratings", "Armoured only"],
    correctAnswer: 2
  },
  {
    question: "For a cable run between buildings through an underground duct:",
    options: ["Indoor tight-buffer is adequate", "External-grade loose-tube is required", "Any cable with LSZH", "Only armoured cables"],
    correctAnswer: 1
  },
  {
    question: "The Euroclass fire rating 'Cca' indicates:",
    options: ["Combustible, poor performance", "Non-combustible", "Limited fire spread with low smoke", "No rating required"],
    correctAnswer: 2
  },
  {
    question: "Water-blocking in fibre cables is achieved using:",
    options: ["Tight buffering only", "Water-swellable tapes and gels", "Metal armouring", "PVC inner sheath"],
    correctAnswer: 1
  },
  {
    question: "Messenger wire is used with fibre cables for:",
    options: ["Grounding", "Aerial/overhead installation support", "Rodent protection", "Termination"],
    correctAnswer: 1
  },
  {
    question: "When selecting cable for a riser between floors:",
    options: ["External grade is required", "Riser-rated (CMR/Cca equivalent) with flame retardance", "Any indoor cable", "Only singlemode"],
    correctAnswer: 1
  },
  {
    question: "Direct burial without conduit requires cable with:",
    options: ["LSZH sheath only", "Armoured construction and water-blocking", "Tight-buffered design", "Messenger wire"],
    correctAnswer: 1
  }
];

const faqs = [
  {
    question: "Can I use indoor cable in an external duct if it's protected?",
    answer: "No—indoor cables lack the water-blocking, UV resistance, and temperature range needed for external environments. Even in ducts, moisture ingress, condensation, and temperature cycling will degrade indoor cable. Always use external-grade (loose-tube) cable for any run outside the building envelope, regardless of containment."
  },
  {
    question: "What's the difference between SWA and CST armoured cables?",
    answer: "SWA (Steel Wire Armour) uses helically wound steel wires providing excellent crush and impact protection—ideal for direct burial. CST (Corrugated Steel Tape) uses a corrugated metal tape offering good rodent protection with lighter weight, suitable for duct and tray installations. Both provide mechanical protection; choose based on installation method and specific threats."
  },
  {
    question: "Do I always need LSZH cable inside buildings?",
    answer: "UK building regulations and BS 6701 strongly recommend LSZH for cables in occupied areas, especially plenums, risers, and escape routes. Some industrial or well-ventilated areas may permit PVC. For new installations in commercial or public buildings, LSZH is effectively mandatory. Check with building control for specific requirements."
  },
  {
    question: "How do I identify cable type from markings?",
    answer: "Cable markings include: fibre type (SM/MM, OM grade), fibre count, construction (TB=tight-buffer, LT=loose-tube), sheath material (LSZH, PE, PVC), armour type if present, and fire rating. Example: 'OS2 12F LT PE/LSZH CST Cca' = singlemode OS2, 12 fibre, loose-tube, PE outer/LSZH inner, corrugated steel tape, Euroclass Cca fire rated."
  },
  {
    question: "When should I use armoured cable vs standard external cable in a duct?",
    answer: "Use armoured cable when: direct burying without duct, risk of third-party dig-in damage, rodent presence is known, ducts are shared with other services, or additional mechanical protection is specified. Standard external (unarmoured loose-tube) is adequate for dedicated ducts in low-risk environments where the duct provides mechanical protection."
  },
  {
    question: "What temperature range should I specify for external cables?",
    answer: "Standard external cables typically operate from -20°C to +70°C. For extreme UK conditions (Highland Scotland, freezing conditions), specify extended range (-40°C to +70°C). Installation temperature is also important—most cables shouldn't be installed below -5°C as the sheath becomes brittle. Store cables in warm conditions before cold-weather installation."
  }
];

const FiberOpticsModule3Section1 = () => {
  useSEO({
    title: TITLE,
    description: DESCRIPTION
  });

  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a] text-white">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#1a1a1a]/95 backdrop-blur supports-[backdrop-filter]:bg-[#1a1a1a]/60">
        <div className="container flex h-14 max-w-screen-2xl items-center px-4">
          <Link
            to="/study-centre/apprentice/fibre-optics/module-3"
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors touch-manipulation min-h-[44px]"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Module 3</span>
          </Link>
        </div>
      </header>

      <main className="container max-w-3xl mx-auto px-4 py-6 space-y-8">
        {/* Title Section */}
        <section className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm font-medium px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/30">
            <Cable className="h-4 w-4" />
            Module 3 • Section 1
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Fibre Cable Types
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Indoor, outdoor, and armoured cable construction
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
                  Indoor = tight-buffer, LSZH sheath. Outdoor = loose-tube, water-blocked, PE/MDPE. Armoured = SWA/CST for burial/rodent protection. Match cable to environment.
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
                <h3 className="font-semibold text-white mb-1">Select It / Install It</h3>
                <p className="text-sm text-white/80">
                  Check environment: indoor, outdoor, buried? Check fire rating: LSZH/Cca for buildings. Check protection: armour for mechanical risk. Verify temperature range.
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
              "Tight-buffer vs loose-tube construction",
              "Indoor cable requirements (LSZH, fire rating)",
              "External/outdoor cable specifications",
              "Armoured cable types (SWA, CST)",
              "Environmental and temperature ratings",
              "Selection criteria for different applications"
            ].map((outcome, index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">{outcome}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 1: Cable Construction Fundamentals */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">01</span>
            <h2 className="text-2xl font-bold">Cable Construction Fundamentals</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Fibre optic cables are engineered structures designed to protect delicate glass fibres while enabling practical installation and long-term reliability. The <strong>buffer type</strong>—how fibres are protected within the cable—is the primary construction difference affecting cable selection.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/30">
                <h4 className="font-semibold text-blue-400 mb-2">Tight-Buffered Construction</h4>
                <p className="text-sm text-white/70 mb-2">Fibre coated directly with 900µm buffer</p>
                <ul className="text-sm space-y-1">
                  <li>• Direct termination possible</li>
                  <li>• Good for indoor/riser use</li>
                  <li>• More robust handling</li>
                  <li>• Limited temperature range</li>
                  <li>• Higher cost per metre</li>
                </ul>
              </div>
              <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30">
                <h4 className="font-semibold text-green-400 mb-2">Loose-Tube Construction</h4>
                <p className="text-sm text-white/70 mb-2">Fibres loose in gel-filled tubes</p>
                <ul className="text-sm space-y-1">
                  <li>• Excellent temperature tolerance</li>
                  <li>• Best for outdoor/external</li>
                  <li>• Requires fan-out for termination</li>
                  <li>• Higher fibre counts possible</li>
                  <li>• Lower cost for high counts</li>
                </ul>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-elec-yellow mb-3">Cable Layer Structure</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-elec-yellow font-bold">1.</span>
                  <span><strong>Fibre:</strong> 125µm glass with coating (250µm total)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-elec-yellow font-bold">2.</span>
                  <span><strong>Buffer:</strong> 900µm tight or loose-tube with gel</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-elec-yellow font-bold">3.</span>
                  <span><strong>Strength Members:</strong> Aramid yarn (Kevlar) or fibreglass rods</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-elec-yellow font-bold">4.</span>
                  <span><strong>Water Blocking:</strong> Gel, tapes, or swellable elements</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-elec-yellow font-bold">5.</span>
                  <span><strong>Armour:</strong> Steel wire or tape (if required)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-elec-yellow font-bold">6.</span>
                  <span><strong>Outer Sheath:</strong> LSZH, PE, PVC depending on application</span>
                </div>
              </div>
            </div>
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

        {/* Section 2: Indoor Cable Types */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">02</span>
            <h2 className="text-2xl font-bold">Indoor Cable Types</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Indoor fibre cables are designed for installation within building envelopes where fire safety, flexibility, and ease of termination are priorities. The key requirement is <strong>LSZH (Low Smoke Zero Halogen)</strong> sheathing to meet UK building regulations and protect occupants during fire events.
            </p>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-elec-yellow mb-3">Indoor Cable Categories</h4>
              <div className="space-y-4">
                <div>
                  <h5 className="font-medium text-white">Distribution Cable (Tight-Buffer)</h5>
                  <p className="text-sm text-white/70">Multiple 900µm tight-buffered fibres in a common sheath. Flexible, easy to route. Used for backbone and horizontal runs within buildings. Typically 4-48 fibres.</p>
                </div>
                <div>
                  <h5 className="font-medium text-white">Breakout Cable</h5>
                  <p className="text-sm text-white/70">Individual tight-buffered fibres each with own sub-unit jacket. Direct termination without fan-out kits. Higher cost but faster installation. Typically 2-24 fibres.</p>
                </div>
                <div>
                  <h5 className="font-medium text-white">Patch Cable / Jumper</h5>
                  <p className="text-sm text-white/70">Single or duplex fibre with connectors factory-fitted. Used for equipment connections. Simplex (1 fibre) or duplex (2 fibres in figure-8 or zip-cord format).</p>
                </div>
                <div>
                  <h5 className="font-medium text-white">Riser Cable</h5>
                  <p className="text-sm text-white/70">Enhanced fire-retardant rating for vertical runs between floors. Prevents fire spreading through risers. Must meet Euroclass Cca or better in UK applications.</p>
                </div>
              </div>
            </div>

            <div className="bg-amber-500/10 rounded-lg p-4 border border-amber-500/30">
              <h4 className="font-semibold text-amber-400 mb-2 flex items-center gap-2">
                <Building className="h-4 w-4" />
                UK Fire Rating Requirements
              </h4>
              <p className="text-sm mb-3">
                The Construction Products Regulation (CPR) requires cables in buildings to have Euroclass fire ratings:
              </p>
              <ul className="text-sm space-y-1">
                <li>• <strong>Cca:</strong> Most common for indoor backbone/distribution (low flame spread, limited smoke)</li>
                <li>• <strong>Dca:</strong> Minimum for general areas (moderate performance)</li>
                <li>• <strong>B2ca:</strong> Enhanced protection for sensitive areas</li>
                <li>• <strong>Eca:</strong> Basic compliance, limited applications</li>
              </ul>
            </div>

            <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/30">
              <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                <Info className="h-4 w-4" />
                LSZH vs PVC Sheathing
              </h4>
              <p className="text-sm">
                <strong>LSZH</strong> emits minimal smoke and no toxic halogens (chlorine, bromine) when burned—critical for occupied buildings. <strong>PVC</strong> produces dense smoke and toxic hydrogen chloride gas. While PVC is cheaper, LSZH is required by BS 6701 and building regulations for most UK commercial installations. PVC may be acceptable in industrial/well-ventilated areas only.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Outdoor Cable Types */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">03</span>
            <h2 className="text-2xl font-bold">Outdoor Cable Types</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Outdoor (external) fibre cables are engineered to withstand environmental extremes: temperature cycling, moisture ingress, UV exposure, and mechanical stress. <strong>Loose-tube construction</strong> is standard for external cables, allowing fibres to move freely within gel-filled tubes as temperature changes cause expansion and contraction.
            </p>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-elec-yellow mb-3">External Cable Features</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-white/60">Construction</p>
                  <p className="font-medium">Loose-tube, central tube, or ribbon</p>
                </div>
                <div>
                  <p className="text-white/60">Water Blocking</p>
                  <p className="font-medium">Gel-filled tubes + water-swellable tapes</p>
                </div>
                <div>
                  <p className="text-white/60">Outer Sheath</p>
                  <p className="font-medium">PE or MDPE (UV resistant)</p>
                </div>
                <div>
                  <p className="text-white/60">Temperature Range</p>
                  <p className="font-medium">-20°C to +70°C (standard)</p>
                </div>
                <div>
                  <p className="text-white/60">Typical Fibre Count</p>
                  <p className="font-medium">4 to 288+ fibres</p>
                </div>
                <div>
                  <p className="text-white/60">Strength Members</p>
                  <p className="font-medium">Central GRP rod + aramid yarns</p>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-elec-yellow mb-2 flex items-center gap-2">
                  <TreePine className="h-4 w-4" />
                  Duct Cable
                </h4>
                <p className="text-sm text-white/70 mb-2">For installation in underground ducts</p>
                <ul className="text-sm space-y-1">
                  <li>• Smooth PE outer sheath</li>
                  <li>• Water-blocked but not armoured</li>
                  <li>• Designed for pulling through ducts</li>
                  <li>• Lower cost than armoured</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-elec-yellow mb-2 flex items-center gap-2">
                  <Cable className="h-4 w-4" />
                  Aerial Cable
                </h4>
                <p className="text-sm text-white/70 mb-2">For overhead installation on poles</p>
                <ul className="text-sm space-y-1">
                  <li>• Self-supporting (figure-8) or messenger</li>
                  <li>• ADSS (All-Dielectric Self-Supporting)</li>
                  <li>• UV-resistant outer sheath</li>
                  <li>• Wind and ice loading rated</li>
                </ul>
              </div>
            </div>

            <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30">
              <h4 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Transition at Building Entry
              </h4>
              <p className="text-sm">
                External cables cannot be used inside buildings due to PE sheath (fire hazard). At building entry points, external cables must transition to internal cables via a <strong>splice enclosure</strong> or <strong>transition box</strong>. This is typically within 15m of building entry. Plan for adequate splice space and protect the transition point.
              </p>
            </div>
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

        {/* Section 4: Armoured Cable Types */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">04</span>
            <h2 className="text-2xl font-bold">Armoured Cable Types</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Armoured fibre cables add a metallic layer for mechanical protection against crushing, impact, rodent attack, and dig-in damage. The choice of armour type depends on the specific threats and installation method.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-elec-yellow mb-2">SWA - Steel Wire Armour</h4>
                <ul className="text-sm space-y-1">
                  <li>• Helically wound galvanised steel wires</li>
                  <li>• Excellent crush/impact protection</li>
                  <li>• Best for direct burial</li>
                  <li>• Higher weight and rigidity</li>
                  <li>• Requires proper earthing</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-elec-yellow mb-2">CST - Corrugated Steel Tape</h4>
                <ul className="text-sm space-y-1">
                  <li>• Longitudinally folded steel tape</li>
                  <li>• Good rodent protection</li>
                  <li>• Lighter than SWA</li>
                  <li>• Suitable for duct/tray</li>
                  <li>• Easier to strip/terminate</li>
                </ul>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-elec-yellow mb-3">When to Specify Armoured Cable</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                  <span><strong>Direct burial:</strong> SWA provides protection against accidental dig-in</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                  <span><strong>Rodent risk:</strong> CST or SWA in areas with known rodent activity</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                  <span><strong>Shared ducts:</strong> Protection from other cable pulls and maintenance</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                  <span><strong>Industrial areas:</strong> Mechanical protection from vehicles/equipment</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                  <span><strong>Specification requirement:</strong> Client or network operator mandates armour</span>
                </div>
              </div>
            </div>

            <div className="bg-amber-500/10 rounded-lg p-4 border border-amber-500/30">
              <h4 className="font-semibold text-amber-400 mb-2 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Earthing Requirements
              </h4>
              <p className="text-sm">
                Steel armour must be <strong>earthed at both ends</strong> to prevent induced voltages and ensure safety. Use proper armour glands and earth connections per BS 7671. The armour should be continuous—don't cut through during mid-span work. Some cables use aluminium armour (lighter, no earthing required but less mechanical protection).
              </p>
            </div>
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

        {/* Section 5: Special Cable Types */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">05</span>
            <h2 className="text-2xl font-bold">Special Cable Types</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Beyond standard indoor, outdoor, and armoured cables, specialised types address specific installation requirements or environments.
            </p>

            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-elec-yellow mb-2">Hybrid Cables</h4>
                <p className="text-sm text-white/70">Combine fibre with copper conductors in single cable. Used for applications needing both data (fibre) and power or legacy signals (copper). Common in CCTV, access control, and industrial applications. Reduces installation complexity but requires careful segregation at termination.</p>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-elec-yellow mb-2">Ribbon Cable</h4>
                <p className="text-sm text-white/70">Fibres arranged in flat ribbons of 4, 8, or 12 fibres. Enables mass fusion splicing (12 fibres at once). Used in high-fibre-count applications (96-864 fibres). Requires ribbon splicing equipment but dramatically reduces installation time for large counts.</p>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-elec-yellow mb-2">Micro-Duct Cable</h4>
                <p className="text-sm text-white/70">Ultra-small diameter cables for blowing into micro-ducts. Typical 4-6mm diameter for 12-48 fibres. Used in FTTH deployments for efficient duct utilisation. Requires specialist blowing equipment but allows future capacity addition.</p>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-elec-yellow mb-2">Tactical/Deployable Cable</h4>
                <p className="text-sm text-white/70">Ruggedised cable for temporary installations. Heavy-duty crush-resistant jacket. Used in military, events, and emergency services. Designed for repeated deployment/recovery. Often pre-terminated.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Cable Selection Guide */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">06</span>
            <h2 className="text-2xl font-bold">Cable Selection Guide</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Selecting the correct cable type requires evaluating the <strong>installation environment</strong>, <strong>physical protection needs</strong>, <strong>regulatory requirements</strong>, and <strong>future scalability</strong>.
            </p>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-elec-yellow mb-3">Selection Decision Tree</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-elec-yellow">1.</span>
                  <span>Indoor only? → Tight-buffer, LSZH, Cca rated</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-elec-yellow">2.</span>
                  <span>External in duct? → Loose-tube, PE sheath, water-blocked</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-elec-yellow">3.</span>
                  <span>Direct burial? → SWA armoured, PE sheath, water-blocked</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-elec-yellow">4.</span>
                  <span>Aerial? → ADSS or figure-8, UV resistant, wind/ice rated</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-elec-yellow">5.</span>
                  <span>Rodent risk? → Add CST or SWA armour</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-elec-yellow">6.</span>
                  <span>Building entry transition? → Plan splice enclosure location</span>
                </div>
              </div>
            </div>

            <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30">
              <h4 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Specification Tips
              </h4>
              <ul className="text-sm space-y-1">
                <li>• Always specify fibre type (SM/MM) and grade (OS2, OM4, etc.)</li>
                <li>• Include fibre count plus spare capacity (typically 25-50%)</li>
                <li>• State sheath material and fire rating explicitly</li>
                <li>• Define temperature range if extreme conditions expected</li>
                <li>• Reference relevant standards (BS EN 60794, CPR)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="bg-white/5 rounded-xl p-6 border border-white/10 space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Cable className="h-5 w-5 text-elec-yellow" />
            Practical Guidance
          </h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-white mb-2">Cable Handling</h3>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Store cables in original packaging until installation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Keep cables in warm environment before cold-weather installation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Check for damage before installation—look for kinks, crushing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Never exceed maximum pulling tension or bend radius</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-2">Documentation</h3>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Record cable manufacturer and part number</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Document drum number and meterage from drum</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Keep specification sheets for reference</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-2">Common Mistakes to Avoid</h3>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Using indoor cable for any external run (even in duct)</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Using PE-sheathed cable inside buildings</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Under-specifying fire rating for the location</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Not allowing spare fibres for future growth</span>
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
            <Cable className="h-5 w-5 text-elec-yellow" />
            Quick Reference: Cable Types
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-semibold text-white">Indoor Cables</h4>
              <div className="space-y-1 text-white/80">
                <p><strong>Construction:</strong> Tight-buffer</p>
                <p><strong>Sheath:</strong> LSZH</p>
                <p><strong>Fire Rating:</strong> Cca or better</p>
                <p><strong>Use:</strong> Building backbone, risers</p>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-white">Outdoor Cables</h4>
              <div className="space-y-1 text-white/80">
                <p><strong>Construction:</strong> Loose-tube</p>
                <p><strong>Sheath:</strong> PE/MDPE</p>
                <p><strong>Features:</strong> Water-blocked, UV resistant</p>
                <p><strong>Use:</strong> Duct, direct burial, aerial</p>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-elec-yellow/30 text-sm text-white/80">
            <p className="font-semibold text-white">Armour Options:</p>
            <p>SWA = direct burial, crush protection | CST = rodent protection, duct/tray</p>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="bg-white/5 rounded-xl p-6 border border-white/10">
          <Quiz
            title="Fibre Cable Types Quiz"
            questions={quizQuestions}
            passingScore={80}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-white/10">
          <Link
            to="/study-centre/apprentice/fibre-optics/module-2/section-6"
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors touch-manipulation min-h-[44px] active:scale-[0.98]"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Previous: Connector Compatibility</span>
          </Link>
          <Link
            to="/study-centre/apprentice/fibre-optics/module-3/section-2"
            className="flex items-center gap-2 text-elec-yellow hover:text-elec-yellow/80 transition-colors touch-manipulation min-h-[44px] sm:flex-row-reverse active:scale-[0.98]"
          >
            <span>Next: Bend Radius</span>
            <ArrowLeft className="h-5 w-5 rotate-180" />
          </Link>
        </nav>
      </main>
    </div>
  );
};

export default FiberOpticsModule3Section1;