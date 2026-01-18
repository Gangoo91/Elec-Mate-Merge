import { ArrowLeft, Zap, CheckCircle, Cable, Shield, Building, TreePine } from "lucide-react";
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
    id: 1,
    question: "Tight-buffered fibre cables are most suitable for:",
    options: ["Direct burial", "Indoor and riser applications", "Submarine installations", "Overhead aerial"],
    correctAnswer: 1,
    explanation: "Tight-buffered cables are designed for indoor use where flexibility and direct termination are priorities."
  },
  {
    id: 2,
    question: "The gel in loose-tube cables serves to:",
    options: ["Increase bandwidth", "Protect fibres from moisture and allow thermal expansion", "Improve bend radius", "Reduce weight"],
    correctAnswer: 1,
    explanation: "Gel provides moisture protection and allows fibres to move freely during temperature cycling."
  },
  {
    id: 3,
    question: "What does 'CST' stand for in fibre cable construction?",
    options: ["Copper Shielded Tube", "Corrugated Steel Tape", "Central Strength Tube", "Cable Support Tray"],
    correctAnswer: 1,
    explanation: "CST stands for Corrugated Steel Tape, a type of metallic armour for rodent protection."
  },
  {
    id: 4,
    question: "Plenum-rated cables in the UK equivalent are typically:",
    options: ["PVC sheathed", "PE sheathed", "LSZH sheathed with Euroclass ratings", "Armoured only"],
    correctAnswer: 2,
    explanation: "UK installations use LSZH sheathing with Euroclass fire ratings (Cca, Dca, etc.) equivalent to US plenum ratings."
  },
  {
    id: 5,
    question: "For a cable run between buildings through an underground duct:",
    options: ["Indoor tight-buffer is adequate", "External-grade loose-tube is required", "Any cable with LSZH", "Only armoured cables"],
    correctAnswer: 1,
    explanation: "External runs require loose-tube construction with water-blocking and appropriate temperature range."
  },
  {
    id: 6,
    question: "The Euroclass fire rating 'Cca' indicates:",
    options: ["Combustible, poor performance", "Non-combustible", "Limited fire spread with low smoke", "No rating required"],
    correctAnswer: 2,
    explanation: "Cca indicates limited flame spread with low smoke production, suitable for most indoor installations."
  },
  {
    id: 7,
    question: "Water-blocking in fibre cables is achieved using:",
    options: ["Tight buffering only", "Water-swellable tapes and gels", "Metal armouring", "PVC inner sheath"],
    correctAnswer: 1,
    explanation: "Water-swellable tapes and gels expand when wet to block water ingress."
  },
  {
    id: 8,
    question: "Messenger wire is used with fibre cables for:",
    options: ["Grounding", "Aerial/overhead installation support", "Rodent protection", "Termination"],
    correctAnswer: 1,
    explanation: "Messenger wire supports fibre cables in overhead/aerial installations between poles."
  },
  {
    id: 9,
    question: "When selecting cable for a riser between floors:",
    options: ["External grade is required", "Riser-rated (CMR/Cca equivalent) with flame retardance", "Any indoor cable", "Only singlemode"],
    correctAnswer: 1,
    explanation: "Riser applications require enhanced fire-retardant ratings to prevent vertical fire spread."
  },
  {
    id: 10,
    question: "Direct burial without conduit requires cable with:",
    options: ["LSZH sheath only", "Armoured construction and water-blocking", "Tight-buffered design", "Messenger wire"],
    correctAnswer: 1,
    explanation: "Direct burial requires SWA armour for mechanical protection and water-blocking for moisture resistance."
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

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/fiber-optics-module-3">
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
            <Cable className="h-4 w-4" />
            <span>Module 3 Section 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Fibre Cable Types
          </h1>
          <p className="text-white/80">
            Indoor, outdoor, and armoured cable construction
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Indoor:</strong> Tight-buffer, LSZH sheath</li>
              <li><strong>Outdoor:</strong> Loose-tube, water-blocked, PE</li>
              <li><strong>Armoured:</strong> SWA/CST for burial/rodent protection</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Select It / Install It</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Environment:</strong> Indoor, outdoor, buried?</li>
              <li><strong>Fire rating:</strong> LSZH/Cca for buildings</li>
              <li><strong>Protection:</strong> Armour for mechanical risk</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Tight-buffer vs loose-tube construction",
              "Indoor cable requirements (LSZH, fire rating)",
              "External/outdoor cable specifications",
              "Armoured cable types (SWA, CST)",
              "Environmental and temperature ratings",
              "Selection criteria for different applications"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Cable Construction Fundamentals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Cable Construction Fundamentals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Fibre optic cables are engineered structures designed to protect delicate glass fibres while enabling practical installation and long-term reliability. The <strong>buffer type</strong>—how fibres are protected within the cable—is the primary construction difference affecting cable selection.
            </p>

            <div className="my-6 grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Tight-Buffered Construction</p>
                <p className="text-sm text-white mb-2 ml-4">Fibre coated directly with 900µm buffer</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Direct termination possible</li>
                  <li>Good for indoor/riser use</li>
                  <li>More robust handling</li>
                  <li>Limited temperature range</li>
                  <li>Higher cost per metre</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Loose-Tube Construction</p>
                <p className="text-sm text-white mb-2 ml-4">Fibres loose in gel-filled tubes</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Excellent temperature tolerance</li>
                  <li>Best for outdoor/external</li>
                  <li>Requires fan-out for termination</li>
                  <li>Higher fibre counts possible</li>
                  <li>Lower cost for high counts</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Cable Layer Structure:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>1. Fibre:</strong> 125µm glass with coating (250µm total)</li>
                <li><strong>2. Buffer:</strong> 900µm tight or loose-tube with gel</li>
                <li><strong>3. Strength Members:</strong> Aramid yarn (Kevlar) or fibreglass rods</li>
                <li><strong>4. Water Blocking:</strong> Gel, tapes, or swellable elements</li>
                <li><strong>5. Armour:</strong> Steel wire or tape (if required)</li>
                <li><strong>6. Outer Sheath:</strong> LSZH, PE, PVC depending on application</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Indoor Cable Types */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Indoor Cable Types
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Indoor fibre cables are designed for installation within building envelopes where fire safety, flexibility, and ease of termination are priorities. The key requirement is <strong>LSZH (Low Smoke Zero Halogen)</strong> sheathing to meet UK building regulations and protect occupants during fire events.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Indoor Cable Categories:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Distribution Cable (Tight-Buffer):</strong> Multiple 900µm tight-buffered fibres in a common sheath. Flexible, easy to route. Used for backbone and horizontal runs within buildings. Typically 4-48 fibres.</li>
                <li><strong>Breakout Cable:</strong> Individual tight-buffered fibres each with own sub-unit jacket. Direct termination without fan-out kits. Higher cost but faster installation. Typically 2-24 fibres.</li>
                <li><strong>Patch Cable / Jumper:</strong> Single or duplex fibre with connectors factory-fitted. Used for equipment connections. Simplex (1 fibre) or duplex (2 fibres in figure-8 or zip-cord format).</li>
                <li><strong>Riser Cable:</strong> Enhanced fire-retardant rating for vertical runs between floors. Prevents fire spreading through risers. Must meet Euroclass Cca or better in UK applications.</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">UK Fire Rating Requirements</p>
              <p className="text-sm text-white mb-2 ml-4">The Construction Products Regulation (CPR) requires cables in buildings to have Euroclass fire ratings:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Cca:</strong> Most common for indoor backbone/distribution (low flame spread, limited smoke)</li>
                <li><strong>Dca:</strong> Minimum for general areas (moderate performance)</li>
                <li><strong>B2ca:</strong> Enhanced protection for sensitive areas</li>
                <li><strong>Eca:</strong> Basic compliance, limited applications</li>
              </ul>
            </div>

            <p>
              <strong>LSZH vs PVC Sheathing:</strong> LSZH emits minimal smoke and no toxic halogens (chlorine, bromine) when burned—critical for occupied buildings. PVC produces dense smoke and toxic hydrogen chloride gas. While PVC is cheaper, LSZH is required by BS 6701 and building regulations for most UK commercial installations. PVC may be acceptable in industrial/well-ventilated areas only.
            </p>
          </div>
        </section>

        {/* Section 03: Outdoor Cable Types */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Outdoor Cable Types
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Outdoor (external) fibre cables are engineered to withstand environmental extremes: temperature cycling, moisture ingress, UV exposure, and mechanical stress. <strong>Loose-tube construction</strong> is standard for external cables, allowing fibres to move freely within gel-filled tubes as temperature changes cause expansion and contraction.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">External Cable Features:</p>
              <div className="grid grid-cols-2 gap-4 text-sm text-white ml-4">
                <div>
                  <p className="text-elec-yellow/80">Construction</p>
                  <p>Loose-tube, central tube, or ribbon</p>
                </div>
                <div>
                  <p className="text-elec-yellow/80">Water Blocking</p>
                  <p>Gel-filled tubes + water-swellable tapes</p>
                </div>
                <div>
                  <p className="text-elec-yellow/80">Outer Sheath</p>
                  <p>PE or MDPE (UV resistant)</p>
                </div>
                <div>
                  <p className="text-elec-yellow/80">Temperature Range</p>
                  <p>-20°C to +70°C (standard)</p>
                </div>
                <div>
                  <p className="text-elec-yellow/80">Typical Fibre Count</p>
                  <p>4 to 288+ fibres</p>
                </div>
                <div>
                  <p className="text-elec-yellow/80">Strength Members</p>
                  <p>Central GRP rod + aramid yarns</p>
                </div>
              </div>
            </div>

            <div className="my-6 grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Duct Cable</p>
                <p className="text-sm text-white mb-2 ml-4">For installation in underground ducts</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Smooth PE outer sheath</li>
                  <li>Water-blocked but not armoured</li>
                  <li>Designed for pulling through ducts</li>
                  <li>Lower cost than armoured</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Aerial Cable</p>
                <p className="text-sm text-white mb-2 ml-4">For overhead installation on poles</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Self-supporting (figure-8) or messenger</li>
                  <li>ADSS (All-Dielectric Self-Supporting)</li>
                  <li>UV-resistant outer sheath</li>
                  <li>Wind and ice loading rated</li>
                </ul>
              </div>
            </div>

            <p>
              <strong>Transition at Building Entry:</strong> External cables cannot be used inside buildings due to PE sheath (fire hazard). At building entry points, external cables must transition to internal cables via a <strong>splice enclosure</strong> or <strong>transition box</strong>. This is typically within 15m of building entry. Plan for adequate splice space and protect the transition point.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Armoured Cable Types */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Armoured Cable Types
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Armoured fibre cables add a metallic layer for mechanical protection against crushing, impact, rodent attack, and dig-in damage. The choice of armour type depends on the specific threats and installation method.
            </p>

            <div className="my-6 grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">SWA - Steel Wire Armour</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Helically wound galvanised steel wires</li>
                  <li>Excellent crush/impact protection</li>
                  <li>Best for direct burial</li>
                  <li>Higher weight and rigidity</li>
                  <li>Requires proper earthing</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">CST - Corrugated Steel Tape</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Longitudinally folded steel tape</li>
                  <li>Good rodent protection</li>
                  <li>Lighter than SWA</li>
                  <li>Suitable for duct/tray</li>
                  <li>Easier to strip/terminate</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">When to Specify Armoured Cable:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Direct burial:</strong> SWA provides protection against accidental dig-in</li>
                <li><strong>Rodent risk:</strong> CST or SWA in areas with known rodent activity</li>
                <li><strong>Shared ducts:</strong> Protection from other cable pulls and maintenance</li>
                <li><strong>Industrial areas:</strong> Mechanical protection from vehicles/equipment</li>
                <li><strong>Specification requirement:</strong> Client or network operator mandates armour</li>
              </ul>
            </div>

            <p>
              <strong>Earthing Requirements:</strong> Steel armour must be <strong>earthed at both ends</strong> to prevent induced voltages and ensure safety. Use proper armour glands and earth connections per BS 7671. The armour should be continuous—don't cut through during mid-span work. Some cables use aluminium armour (lighter, no earthing required but less mechanical protection).
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Special Cable Types */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Special Cable Types
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Beyond standard indoor, outdoor, and armoured cables, specialised types address specific installation requirements or environments.
            </p>

            <div className="my-6 space-y-4">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-1">Hybrid Cables</p>
                <p className="text-sm text-white ml-4">Combine fibre with copper conductors in single cable. Used for applications needing both data (fibre) and power or legacy signals (copper). Common in CCTV, access control, and industrial applications. Reduces installation complexity but requires careful segregation at termination.</p>
              </div>

              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-1">Ribbon Cable</p>
                <p className="text-sm text-white ml-4">Fibres arranged in flat ribbons of 4, 8, or 12 fibres. Enables mass fusion splicing (12 fibres at once). Used in high-fibre-count applications (96-864 fibres). Requires ribbon splicing equipment but dramatically reduces installation time for large counts.</p>
              </div>

              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-1">Micro-Duct Cable</p>
                <p className="text-sm text-white ml-4">Ultra-small diameter cables for blowing into micro-ducts. Typical 4-6mm diameter for 12-48 fibres. Used in FTTH deployments for efficient duct utilisation. Requires specialist blowing equipment but allows future capacity addition.</p>
              </div>

              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-1">Tactical/Deployable Cable</p>
                <p className="text-sm text-white ml-4">Ruggedised cable for temporary installations. Heavy-duty crush-resistant jacket. Used in military, events, and emergency services. Designed for repeated deployment/recovery. Often pre-terminated.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Cable Selection Guide */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Cable Selection Guide
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Selecting the correct cable type requires evaluating the <strong>installation environment</strong>, <strong>physical protection needs</strong>, <strong>regulatory requirements</strong>, and <strong>future scalability</strong>.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Selection Decision Tree:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>1.</strong> Indoor only? → Tight-buffer, LSZH, Cca rated</li>
                <li><strong>2.</strong> External in duct? → Loose-tube, PE sheath, water-blocked</li>
                <li><strong>3.</strong> Direct burial? → SWA armoured, PE sheath, water-blocked</li>
                <li><strong>4.</strong> Aerial? → ADSS or figure-8, UV resistant, wind/ice rated</li>
                <li><strong>5.</strong> Rodent risk? → Add CST or SWA armour</li>
                <li><strong>6.</strong> Building entry transition? → Plan splice enclosure location</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Specification Tips</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always specify fibre type (SM/MM) and grade (OS2, OM4, etc.)</li>
                <li>Include fibre count plus spare capacity (typically 25-50%)</li>
                <li>State sheath material and fire rating explicitly</li>
                <li>Define temperature range if extreme conditions expected</li>
                <li>Reference relevant standards (BS EN 60794, CPR)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Cable Handling</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Store cables in original packaging until installation</li>
                <li>Keep cables in warm environment before cold-weather installation</li>
                <li>Check for damage before installation—look for kinks, crushing</li>
                <li>Never exceed maximum pulling tension or bend radius</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Documentation</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Record cable manufacturer and part number</li>
                <li>Document drum number and meterage from drum</li>
                <li>Keep specification sheets for reference</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Using indoor cable for external run</strong> — even in duct</li>
                <li><strong>Using PE-sheathed cable inside buildings</strong> — fire hazard</li>
                <li><strong>Under-specifying fire rating</strong> — for the location</li>
                <li><strong>Not allowing spare fibres</strong> — for future growth</li>
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
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference: Cable Types</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-elec-yellow/80 mb-1">Indoor Cables</p>
                <ul className="space-y-0.5">
                  <li><strong>Construction:</strong> Tight-buffer</li>
                  <li><strong>Sheath:</strong> LSZH</li>
                  <li><strong>Fire Rating:</strong> Cca or better</li>
                  <li><strong>Use:</strong> Building backbone, risers</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-elec-yellow/80 mb-1">Outdoor Cables</p>
                <ul className="space-y-0.5">
                  <li><strong>Construction:</strong> Loose-tube</li>
                  <li><strong>Sheath:</strong> PE/MDPE</li>
                  <li><strong>Features:</strong> Water-blocked, UV resistant</li>
                  <li><strong>Use:</strong> Duct, direct burial, aerial</li>
                </ul>
              </div>
            </div>
            <p className="text-xs text-white mt-4 pt-4 border-t border-elec-yellow/30">
              <strong>Armour Options:</strong> SWA = direct burial, crush protection | CST = rodent protection, duct/tray
            </p>
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
            <Link to="/electrician/upskilling/fiber-optics-module-2-section-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Connector Compatibility
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-2">
              Next: Bend Radius
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default FiberOpticsModule3Section1;
