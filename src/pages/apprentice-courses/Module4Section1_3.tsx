import { ArrowLeft, ArrowRight, Package, Wrench, Shield, Eye, CheckCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const Module4Section1_3 = () => {
  useSEO(
    "Selecting Materials, Tools, and PPE | Level 2 Electrical",
    "Choose the right electrical materials, tools, and personal protective equipment for safe, compliant installations to BS 7671 standards."
  );

  // Quiz (end of page)
  const quizQuestions = [
    {
      id: 1,
      question: "Which cable type would you select for outdoor installation requiring mechanical protection?",
      options: ["Twin and earth", "Steel wire armoured (SWA)", "PVC singles in trunking", "Flexible cord"],
      correctAnswer: 1,
      explanation: "Steel wire armoured (SWA) cable provides mechanical protection and is suitable for outdoor installations.",
    },
    {
      id: 2,
      question: "True or False: The cheapest tool option is always the best for the job.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False – quality and suitability are more important than cost for professional electrical work.",
    },
    {
      id: 3,
      question: "What marking should PPE have to confirm compliance in the UK?",
      options: ["BS marking only", "CE or UKCA marking", "Manufacturer logo", "No marking required"],
      correctAnswer: 1,
      explanation: "CE or UKCA marking confirms that PPE meets required safety and performance standards in the UK.",
    },
    {
      id: 4,
      question: "Give two examples of mechanical containment systems.",
      options: ["Cable ties and tape", "Conduit, trunking, tray, basket", "Insulation and sheathing", "Plugs and sockets"],
      correctAnswer: 1,
      explanation: "Conduit, trunking, cable tray, and cable basket are all mechanical containment systems for cable protection.",
    },
    {
      id: 5,
      question: "What PPE is required when drilling masonry?",
      options: ["Just safety boots", "Eye protection, dust mask, hearing protection", "Only gloves", "Hard hat only"],
      correctAnswer: 1,
      explanation: "Drilling masonry requires eye protection from debris, dust mask for respiratory protection, and hearing protection from noise.",
    },
    {
      id: 6,
      question: "Name one risk of using the wrong cable size.",
      options: ["Better performance", "Overheating, voltage drop, potential fire hazard", "Improved efficiency", "Cost savings"],
      correctAnswer: 1,
      explanation: "Wrong cable size can cause overheating, excessive voltage drop, and create fire hazards.",
    },
    {
      id: 7,
      question: "How should insulated tools be stored?",
      options: ["Anywhere convenient", "In a clean, dry place, away from sharp or abrasive items", "With other metal tools", "In damp conditions"],
      correctAnswer: 1,
      explanation: "Insulated tools must be stored in clean, dry conditions away from damage to maintain their protective properties.",
    },
    {
      id: 8,
      question: "What does CE or UKCA marking indicate?",
      options: ["Country of manufacture", "They meet required safety and performance standards", "Price category", "Installation method"],
      correctAnswer: 1,
      explanation: "CE or UKCA marking indicates that products meet required safety and performance standards for the UK market.",
    },
  ];

  // Inline knowledge checks
  const quickChecks = [
    {
      id: "material-check",
      question: "What factor is most important when selecting cable insulation type?",
      options: ["Colour preference", "Environmental conditions and temperature", "Brand reputation", "Cost only"],
      correctIndex: 1,
      explanation: "Environmental conditions and operating temperature are critical factors in selecting appropriate insulation materials for cable longevity and safety.",
    },
    {
      id: "tool-check",
      question: "Why is tool quality important in electrical work?",
      options: ["It looks more professional", "Quality tools ensure safety, accuracy, and reliability", "They cost more", "They are heavier"],
      correctIndex: 1,
      explanation: "Quality tools ensure safety through proper insulation, provide accuracy for precise work, and offer reliability for consistent performance.",
    },
    {
      id: "ppe-check",
      question: "When should PPE be inspected?",
      options: ["Once a year", "Before each use and periodically per manufacturer guidance", "Only when damaged", "Never needed"],
      correctIndex: 1,
      explanation: "PPE should be inspected before each use to identify damage and periodically according to manufacturer guidelines to ensure continued protection.",
    },
  ];

  const materialTypes = [
    {
      category: "Cables",
      examples: "Twin & earth (T&E), Steel Wire Armoured (SWA), PVC singles, XLPE, LSF cables",
      considerations: "Current rating, voltage drop, environmental temperature, mechanical protection, fire performance, installation method",
      standards: "BS 6004 (PVC insulated), BS 5467 (Armoured cables), BS EN 50525 (Harmonised cables)",
      applications: "T&E for domestic circuits, SWA for underground/outdoor, Singles in conduit/trunking",
      commonMistakes: "Using T&E outdoors without protection, undersizing cables, ignoring grouping factors"
    },
    {
      category: "Containment Systems",
      examples: "PVC conduit, galvanised steel conduit, plastic/metal trunking, cable tray, cable basket, cable ladder",
      considerations: "Environment (indoor/outdoor), IP rating, thermal expansion, accessibility for maintenance, cable capacity",
      standards: "BS EN 61386 (conduit systems), BS EN 50085 (cable trunking), IEC 61537 (cable tray)",
      applications: "PVC conduit for concealed wiring, steel for mechanical protection, trunking for accessible runs",
      commonMistakes: "Wrong IP rating for location, inadequate expansion joints, overcrowding containment"
    },
    {
      category: "Fixings and Fasteners",
      examples: "Masonry anchors, rawl plugs, cable cleats, saddle clips, cable ties, girder clamps",
      considerations: "Substrate type (masonry/steel/wood), load capacity, corrosion resistance, vibration, temperature cycling",
      standards: "BS EN 61914 (cable cleats), BS EN 1993 (structural fixings), manufacturer specifications",
      applications: "Masonry anchors for walls, girder clamps for steelwork, cleats for SWA terminations",
      commonMistakes: "Wrong anchor for substrate, insufficient load rating, poor corrosion protection"
    },
    {
      category: "Electrical Accessories",
      examples: "Switches, sockets, junction boxes, consumer units, distribution boards, isolators",
      considerations: "Current rating, IP protection level, environmental conditions, aesthetic requirements, switching capacity",
      standards: "BS 1363 (plugs/sockets), BS EN 60669 (switches), BS EN 61439 (switchgear), BS EN 60670 (boxes)",
      applications: "IP65 for outdoor use, fire-rated boxes in escape routes, RCD protection where required",
      commonMistakes: "Inadequate IP rating, wrong current rating, non-compliant mounting heights"
    },
  ];

  const toolCategories = [
    {
      type: "Basic Hand Tools",
      examples: "Insulated screwdrivers (flathead/phillips/pozidrive), combination pliers, side cutters, wire strippers, adjustable spanners",
      applications: "Terminating conductors, mechanical assembly, general fixing work, panel wiring",
      safety: "Always use VDE insulated tools near live parts (1000V rated), inspect for damage before use",
      qualityTips: "Invest in quality brands, proper handle design reduces fatigue, magnetic tips useful for panel work",
      maintenance: "Clean after use, check insulation integrity, store in dry conditions"
    },
    {
      type: "Cable Preparation Tools", 
      examples: "Automatic wire strippers, ratchet crimping tools, cable knives, armour cutting tools, cable pulling grips",
      applications: "Stripping cable insulation, crimping terminals, cutting armoured cables, preparing cable ends",
      safety: "Sharp blade safety - cut away from body, secure cable before cutting, proper PPE for armour work",
      qualityTips: "Precision strippers prevent conductor damage, quality crimping tools ensure reliable connections",
      maintenance: "Keep blades sharp, calibrate crimping tools, lubricate moving parts"
    },
    {
      type: "Power Tools",
      examples: "Cordless drills, SDS hammer drills, jigsaws, angle grinders, cable pulling machines, core drilling equipment",
      applications: "Drilling fixing holes, cutting cable routes, surface preparation, heavy-duty installation work",
      safety: "PPE mandatory, secure workpiece, correct speeds/feeds, PAT testing, battery safety",
      qualityTips: "Brushless motors for longevity, lithium batteries for power/weight, quality bits/blades essential",
      maintenance: "Regular servicing, battery care, blade/bit replacement, proper storage"
    },
    {
      type: "Measuring and Layout Tools",
      examples: "Steel tape measures, laser levels, spirit levels, cable detectors, multimeters, insulation testers",
      applications: "Accurate measurement, level installation, detecting hidden services, electrical testing",
      safety: "Ladder safety with measuring, laser eye protection, electrical safety with test equipment",
      qualityTips: "Accuracy critical for professional work, automatic laser levels save time, quality detectors prevent accidents",
      maintenance: "Regular calibration, protect from damage, battery maintenance, proper storage"
    },
  ];

  const ppeMatrix = [
    {
      bodyPart: "Head Protection",
      protectionType: "Hard hats, safety helmets, bump caps",
      whenRequired: "Construction sites, overhead work, confined spaces, risk of falling objects or head impact",
      standards: "BS EN 397 (industrial helmets), BS EN 12492 (climbing helmets)",
      selectionTips: "Adjustable suspension, ventilation in hot conditions, electrical insulation rating if required",
      maintenance: "Replace after impact, check for cracks, clean regularly, respect expiry dates"
    },
    {
      bodyPart: "Eye Protection", 
      protectionType: "Safety glasses, goggles, face shields, welding masks",
      whenRequired: "Drilling, cutting, grinding, chemical exposure, bright light/UV, flying particles",
      standards: "BS EN 166 (eye protection), BS EN 169 (welding filters)",
      selectionTips: "Anti-fog coating, side protection, correct shade for welding, prescription safety glasses available",
      maintenance: "Clean lenses regularly, replace scratched lenses, proper storage, check strap condition"
    },
    {
      bodyPart: "Hand Protection",
      protectionType: "Insulated gloves, cut-resistant gloves, chemical gloves, general work gloves",
      whenRequired: "Electrical work, handling sharp materials, chemical exposure, general protection from cuts/abrasions",
      standards: "BS EN 60903 (electrical), BS EN 388 (mechanical), BS EN 374 (chemical)",
      selectionTips: "Correct voltage rating for electrical work, dexterity vs protection balance, proper sizing crucial",
      maintenance: "Electrical test before use, check for holes/damage, proper cleaning, respect test intervals"
    },
    {
      bodyPart: "Foot Protection",
      protectionType: "Steel toe-capped boots, electrical hazard boots, slip-resistant soles, wellington boots",
      whenRequired: "Heavy lifting, falling objects, electrical hazards, slippery surfaces, chemical exposure",
      standards: "BS EN ISO 20345 (safety footwear), BS EN 50321 (electrical hazard)",
      selectionTips: "Comfort for long wear, ankle support, electrical insulation rating, sole pattern for grip",
      maintenance: "Regular cleaning, inspect for damage, replace worn soles, proper drying after wet conditions"
    },
    {
      bodyPart: "Hearing Protection",
      protectionType: "Ear defenders, foam ear plugs, silicone ear plugs, electronic hearing protection",
      whenRequired: "Power tools use, noisy environments (>85dB), prolonged noise exposure, impact noise",
      standards: "BS EN 352 (hearing protectors), noise reduction ratings",
      selectionTips: "Comfort for extended wear, adequate noise reduction, communication needs, hygiene factors",
      maintenance: "Replace foam plugs after each use, clean reusable types, check seal integrity"
    },
    {
      bodyPart: "Respiratory Protection", 
      protectionType: "Disposable dust masks, half-face respirators, full-face respirators, powered air systems",
      whenRequired: "Dusty environments, drilling masonry, spray applications, confined spaces, harmful vapours",
      standards: "BS EN 149 (disposable), BS EN 136 (full face), BS EN 143 (filters)",
      selectionTips: "Correct filter type for hazard, fit testing essential, comfort for extended wear",
      maintenance: "Replace filters regularly, clean respirators properly, fit test annually, check valves"
    },
  ];

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Top header bar */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 4.1
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg ">
              <Package className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              Section 4.1.3
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Selecting Materials, Tools, and PPE
          </h1>
          <p className="text-white">
            Choose the right electrical materials, tools, and personal protective equipment for safe, compliant installations.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Select materials based on environment, load, and BS 7671 requirements.</li>
                <li>Choose tools for efficiency and safety - quality matters for professional work.</li>
                <li>Match PPE to specific hazards: hard hats, safety glasses, insulated gloves.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Environmental factors, load requirements, safety hazards.</li>
                <li><strong>Use:</strong> Quality tools, appropriate fixings, correct PPE for each task.</li>
                <li><strong>Check:</strong> CE/UKCA marking, BS standards, manufacturer specifications.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-white">
            <li>Select electrical materials appropriate to the installation environment and load requirements.</li>
            <li>Identify the correct tools for cutting, stripping, fixing, and terminating cables.</li>
            <li>Choose PPE suited to specific tasks and hazards.</li>
            <li>Understand the impact of quality and specification compliance when selecting materials and tools.</li>
            <li>Recognise the importance of proper maintenance and storage of tools and PPE.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content</h2>

          {/* Material Selection */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Material Selection</h3>
            <p className="text-xs sm:text-sm text-white mb-4">
              Selecting the right materials ensures safety, compliance, and long-term reliability. Poor material selection 
              is one of the leading causes of electrical failures and non-compliance issues.
            </p>
            
            <div className="space-y-4">
              {materialTypes.map((material, i) => (
                <div key={i} className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                  <div className="flex items-start gap-3 mb-2">
                    <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-elec-yellow dark:text-elec-yellow mb-1">{material.category}</p>
                      <p className="text-xs sm:text-sm text-white mb-2"><strong>Examples:</strong> {material.examples}</p>
                      <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border mb-2">
                        <strong>Key considerations:</strong> {material.considerations}
                      </div>
                      <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border mb-2">
                        <strong>Applications:</strong> {material.applications}
                      </div>
                      <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border mb-2">
                        <strong>Standards:</strong> {material.standards}
                      </div>
                      <div className="text-xs text-white bg-[#121212]/30 p-2 rounded border border-red-300 dark:border-red-700">
                        <strong>Common mistakes:</strong> {material.commonMistakes}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 bg-transparent border border-border/30 rounded-lg">
              <p className="text-sm font-medium text-white mb-1">Professional Selection Process</p>
              <p className="text-xs text-white">
                1. Analyse environmental conditions and electrical requirements
                2. Check BS 7671 requirements and local regulations
                3. Consider installation method and accessibility needs
                4. Verify compatibility with existing systems
                5. Confirm availability and cost-effectiveness
                6. Ensure traceability and certification
              </p>
            </div>
          </section>

          <InlineCheck {...quickChecks[0]} />
          <Separator className="my-6" />

          {/* Tool Selection */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4 flex items-center gap-2">
              <Wrench className="w-5 h-5" /> Tool Selection
            </h3>
            <div className="space-y-4">
              {toolCategories.map((tool, i) => (
                <div key={i} className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                  <div className="flex items-start gap-3 mb-2">
                    <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-green-600 dark:text-green-400 mb-1">{tool.type}</p>
                      <p className="text-xs sm:text-sm text-white mb-2">{tool.examples}</p>
                      <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                        <strong>Applications:</strong> {tool.applications}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <InlineCheck {...quickChecks[1]} />
          <Separator className="my-6" />

          {/* PPE Selection */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5" /> PPE Selection
            </h3>
            <p className="text-xs sm:text-sm text-white mb-4">
              Personal protective equipment must match specific hazards and tasks. PPE is the last line of defence 
              when other controls cannot eliminate risks. Proper selection, fitting, and maintenance are critical.
            </p>
            
            <div className="space-y-4">
              {ppeMatrix.map((ppe, i) => (
                <div key={i} className="rounded-lg p-5 border-l-4 border-l-purple-500 ">
                  <div className="flex items-start gap-3 mb-2">
                    <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-purple-600 dark:text-elec-yellow mb-1">{ppe.bodyPart}</p>
                      <p className="text-xs sm:text-sm text-white mb-2"><strong>Type:</strong> {ppe.protectionType}</p>
                      <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border mb-2">
                        <strong>When required:</strong> {ppe.whenRequired}
                      </div>
                      <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border mb-2">
                        <strong>Standards:</strong> {ppe.standards}
                      </div>
                      <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border mb-2">
                        <strong>Selection tips:</strong> {ppe.selectionTips}
                      </div>
                      <div className="text-xs text-white bg-[#121212]/30 p-2 rounded border border-purple-300 dark:border-purple-700">
                        <strong>Maintenance:</strong> {ppe.maintenance}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 bg-transparent border border-border/30 rounded-lg">
              <p className="text-sm font-medium text-white mb-1">PPE Hierarchy of Control</p>
              <p className="text-xs text-white">
                PPE is the last resort after elimination, substitution, engineering controls, and administrative controls. 
                However, in electrical work, PPE is often essential. Always conduct risk assessment to determine 
                appropriate protection levels.
              </p>
            </div>
          </section>

          <InlineCheck {...quickChecks[2]} />
        </Card>

        {/* Real-world examples */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Real-World Examples
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-transparent border border-border/30 rounded-lg border-l-4 border-l-red-500">
              <h4 className="font-medium text-white mb-2">Case Study 1: Poor Material Selection</h4>
              <p className="text-xs sm:text-sm text-white mb-3">
                A team installed light fittings in a corrosive marine environment using standard mild steel screws 
                instead of stainless steel. Within six months, severe corrosion caused fittings to loosen and fall, 
                requiring complete reinstallation at double the original cost plus emergency repairs.
              </p>
              <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                <strong>Lesson:</strong> The extra £20 for stainless steel screws would have saved £2,000 in remedial work, 
                downtime costs, and reputation damage. Always specify materials for the actual environment.
              </div>
            </div>

            <div className="p-4 bg-transparent border border-border/30 rounded-lg border-l-4 border-l-red-500">
              <h4 className="font-medium text-white mb-2">Case Study 2: Cheap Tool Consequences</h4>
              <p className="text-xs sm:text-sm text-white mb-3">
                An apprentice used a cheap wire stripper that damaged conductor cores, leading to poor connections. 
                Three months later, several joints overheated causing equipment failure and a small fire. Investigation 
                traced the problem to the damaged conductors.
              </p>
              <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                <strong>Lesson:</strong> Quality wire strippers cost £30 more but prevent conductor damage. 
                The fire damage cost £15,000 plus downtime and insurance excess. Professional tools pay for themselves.
              </div>
            </div>

            <div className="p-4 bg-transparent border border-border/30 rounded-lg border-l-4 border-l-red-500">
              <h4 className="font-medium text-white mb-2">Case Study 3: PPE Failure</h4>
              <p className="text-xs sm:text-sm text-white mb-3">
                A worker suffered eye injury when drilling overhead using expired safety glasses that had become brittle. 
                The glasses shattered on impact from falling debris, causing permanent partial vision loss. 
                Investigation found the glasses were 2 years past replacement date.
              </p>
              <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                <strong>Lesson:</strong> PPE expiry dates are critical safety limits, not suggestions. 
                Regular inspection and replacement schedules must be maintained. Personal injury claims can exceed £100,000.
              </div>
            </div>

            <div className="p-4 bg-transparent border border-green-400/30 rounded-lg border-l-4 border-l-green-500">
              <h4 className="font-medium text-white mb-2">Success Story: Quality Investment</h4>
              <p className="text-xs sm:text-sm text-white mb-3">
                A contractor invested in high-quality armoured cable cutting tools costing £500. Over 5 years, 
                these tools maintained precision, required minimal maintenance, and improved productivity by 25%. 
                Comparable cheap tools would have cost £200 initially but needed replacement every 18 months.
              </p>
              <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                <strong>Result:</strong> Quality tools cost £500 once vs £600 for cheap replacements, plus improved 
                productivity worth £5,000+ over 5 years. Quality is always the economical choice long-term.
              </div>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-8 p-6 ">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <div className="text-white space-y-6">
            <div>
              <h4 className="font-medium mb-2">Q: Can I substitute one cable type for another if it's cheaper?</h4>
              <p className="text-sm text-white/90 mb-2">
                A: Only if it meets the same performance, safety, and compliance requirements. 
                Never compromise on specifications for cost savings.
              </p>
              <p className="text-xs text-white/80">
                Consider: current rating, voltage drop, environmental suitability, fire performance, 
                and installation method compatibility before any substitution.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Q: How often should PPE be inspected?</h4>
              <p className="text-sm text-white/90 mb-2">
                A: Before each use for visual inspection, plus scheduled detailed inspections 
                according to manufacturer guidelines and risk assessment.
              </p>
              <p className="text-xs text-white/80">
                Daily: visual check for damage. Weekly: detailed inspection and cleaning. 
                Monthly: formal inspection with records. Annually: professional testing where required.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Q: Do I need insulated tools for all electrical work?</h4>
              <p className="text-sm text-white/90 mb-2">
                A: Yes, whenever there's any possibility of contact with live parts, 
                even when following proper isolation procedures.
              </p>
              <p className="text-xs text-white/80">
                VDE insulated tools provide essential backup protection. Standard tools should never 
                be used for electrical work, even on "dead" circuits.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Q: What's the difference between CE and UKCA marking?</h4>
              <p className="text-sm text-white/90 mb-2">
                A: CE marking shows compliance with EU standards, UKCA marking shows compliance 
                with UK standards post-Brexit. Both indicate safety and performance compliance.
              </p>
              <p className="text-xs text-white/80">
                Products placed on UK market after 1 January 2021 should have UKCA marking. 
                CE marking still accepted for most products during transition period.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Q: How do I justify spending more on quality tools to my employer?</h4>
              <p className="text-sm text-white/90 mb-2">
                A: Calculate total cost of ownership including productivity, replacement costs, 
                safety benefits, and professional reputation over 5+ years.
              </p>
              <p className="text-xs text-white/80">
                Present business case showing: reduced downtime, improved quality, safety benefits, 
                warranty coverage, and enhanced company reputation with clients.
              </p>
            </div>
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Summary</h2>
          <div className="space-y-3">
            <p className="text-xs sm:text-sm text-white">
              <strong>Material selection</strong> must consider environmental conditions, electrical requirements, 
              compliance standards, and long-term performance. Never compromise on specifications for cost savings.
            </p>
            <p className="text-xs sm:text-sm text-white">
              <strong>Tool quality</strong> directly impacts safety, efficiency, and work quality. Professional-grade 
              tools are essential investments that pay for themselves through improved productivity and reliability.
            </p>
            <p className="text-xs sm:text-sm text-white">
              <strong>PPE selection</strong> must match specific hazards through proper risk assessment. Regular inspection, 
              maintenance, and timely replacement are critical for continued protection.
            </p>
            <p className="text-xs sm:text-sm text-white">
              <strong>Quality and compliance</strong> are non-negotiable in electrical work. The cost of cutting corners 
              always exceeds the cost of doing it right the first time.
            </p>
          </div>
        </Card>

        {/* Quiz */}
        <Quiz questions={quizQuestions} />

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 pt-8 border-t border-white/10">
          <Button variant="outline" asChild>
            <Link to="../1-2" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Previous: Cable Routes
            </Link>
          </Button>
          <Button asChild>
            <Link to="../1-4" className="flex items-center gap-2">
              Next: Installation Methods
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module4Section1_3;