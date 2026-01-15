import { ArrowLeft, ArrowRight, Package, Wrench, Shield, Eye, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
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
      applications: "T&E for domestic circuits, SWA for underground/outdoor, Singles in conduit/trunking",
    },
    {
      category: "Containment Systems",
      examples: "PVC conduit, galvanised steel conduit, plastic/metal trunking, cable tray, cable basket, cable ladder",
      considerations: "Environment (indoor/outdoor), IP rating, thermal expansion, accessibility for maintenance, cable capacity",
      applications: "PVC conduit for concealed wiring, steel for mechanical protection, trunking for accessible runs",
    },
    {
      category: "Fixings and Fasteners",
      examples: "Masonry anchors, rawl plugs, cable cleats, saddle clips, cable ties, girder clamps",
      considerations: "Substrate type (masonry/steel/wood), load capacity, corrosion resistance, vibration, temperature cycling",
      applications: "Masonry anchors for walls, girder clamps for steelwork, cleats for SWA terminations",
    },
    {
      category: "Electrical Accessories",
      examples: "Switches, sockets, junction boxes, consumer units, distribution boards, isolators",
      considerations: "Current rating, IP protection level, environmental conditions, aesthetic requirements, switching capacity",
      applications: "IP65 for outdoor use, fire-rated boxes in escape routes, RCD protection where required",
    },
  ];

  const toolCategories = [
    {
      type: "Basic Hand Tools",
      examples: "Insulated screwdrivers (flathead/phillips/pozidrive), combination pliers, side cutters, wire strippers, adjustable spanners",
      applications: "Terminating conductors, mechanical assembly, general fixing work, panel wiring",
    },
    {
      type: "Cable Preparation Tools",
      examples: "Automatic wire strippers, ratchet crimping tools, cable knives, armour cutting tools, cable pulling grips",
      applications: "Stripping cable insulation, crimping terminals, cutting armoured cables, preparing cable ends",
    },
    {
      type: "Power Tools",
      examples: "Cordless drills, SDS hammer drills, jigsaws, angle grinders, cable pulling machines, core drilling equipment",
      applications: "Drilling fixing holes, cutting cable routes, surface preparation, heavy-duty installation work",
    },
    {
      type: "Measuring and Layout Tools",
      examples: "Steel tape measures, laser levels, spirit levels, cable detectors, multimeters, insulation testers",
      applications: "Accurate measurement, level installation, detecting hidden services, electrical testing",
    },
  ];

  const ppeMatrix = [
    {
      bodyPart: "Head Protection",
      protectionType: "Hard hats, safety helmets, bump caps",
      whenRequired: "Construction sites, overhead work, confined spaces, risk of falling objects or head impact",
    },
    {
      bodyPart: "Eye Protection",
      protectionType: "Safety glasses, goggles, face shields, welding masks",
      whenRequired: "Drilling, cutting, grinding, chemical exposure, bright light/UV, flying particles",
    },
    {
      bodyPart: "Hand Protection",
      protectionType: "Insulated gloves, cut-resistant gloves, chemical gloves, general work gloves",
      whenRequired: "Electrical work, handling sharp materials, chemical exposure, general protection from cuts/abrasions",
    },
    {
      bodyPart: "Foot Protection",
      protectionType: "Steel toe-capped boots, electrical hazard boots, slip-resistant soles, wellington boots",
      whenRequired: "Heavy lifting, falling objects, electrical hazards, slippery surfaces, chemical exposure",
    },
    {
      bodyPart: "Hearing Protection",
      protectionType: "Ear defenders, foam ear plugs, silicone ear plugs, electronic hearing protection",
      whenRequired: "Power tools use, noisy environments (>85dB), prolonged noise exposure, impact noise",
    },
    {
      bodyPart: "Respiratory Protection",
      protectionType: "Disposable dust masks, half-face respirators, full-face respirators, powered air systems",
      whenRequired: "Dusty environments, drilling masonry, spray applications, confined spaces, harmful vapours",
    },
  ];

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
              Back to Section 1
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 4</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 1.3</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Selecting Materials, Tools, and PPE
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Choose the right electrical materials, tools, and personal protective equipment for safe, compliant installations.
            </p>
          </header>

          {/* Introduction */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Introduction
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-white/90">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Select materials based on environment, load, and BS 7671 requirements.</li>
                  <li>Choose tools for efficiency and safety - quality matters for professional work.</li>
                  <li>Match PPE to specific hazards: hard hats, safety glasses, insulated gloves.</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Spot:</strong> Environmental factors, load requirements, safety hazards.</li>
                  <li><strong>Use:</strong> Quality tools, appropriate fixings, correct PPE for each task.</li>
                  <li><strong>Check:</strong> CE/UKCA marking, BS standards, manufacturer specifications.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Learning outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Learning Outcomes
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-sm text-white/90">
              <li>Select electrical materials appropriate to the installation environment and load requirements.</li>
              <li>Identify the correct tools for cutting, stripping, fixing, and terminating cables.</li>
              <li>Choose PPE suited to specific tasks and hazards.</li>
              <li>Understand the impact of quality and specification compliance when selecting materials and tools.</li>
              <li>Recognise the importance of proper maintenance and storage of tools and PPE.</li>
            </ul>
          </section>

          {/* Material Selection */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              <Package className="w-5 h-5" /> Material Selection
            </h2>
            <p className="text-sm text-white/80 mb-4">
              Selecting the right materials ensures safety, compliance, and long-term reliability. Poor material selection
              is one of the leading causes of electrical failures and non-compliance issues.
            </p>

            <div className="space-y-4">
              {materialTypes.map((material, i) => (
                <div key={i} className="rounded-lg p-4 border-l-2 border-elec-yellow/50 bg-white/5">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 bg-elec-yellow text-black rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-elec-yellow mb-1">{material.category}</p>
                      <p className="text-sm text-white/80 mb-2"><strong>Examples:</strong> {material.examples}</p>
                      <div className="text-xs text-white/70 bg-black/20 p-2 rounded mb-2">
                        <strong>Key considerations:</strong> {material.considerations}
                      </div>
                      <div className="text-xs text-white/70 bg-black/20 p-2 rounded">
                        <strong>Applications:</strong> {material.applications}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 bg-white/5 border border-white/10 rounded-lg">
              <p className="text-sm font-medium text-white mb-1">Professional Selection Process</p>
              <p className="text-xs text-white/70">
                1. Analyse environmental conditions and electrical requirements
                2. Check BS 7671 requirements and local regulations
                3. Consider installation method and accessibility needs
                4. Verify compatibility with existing systems
                5. Confirm availability and cost-effectiveness
                6. Ensure traceability and certification
              </p>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck {...quickChecks[0]} />
          </div>

          {/* Tool Selection */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              <Wrench className="w-5 h-5" /> Tool Selection
            </h2>
            <div className="space-y-4">
              {toolCategories.map((tool, i) => (
                <div key={i} className="rounded-lg p-4 border-l-2 border-green-500/50 bg-green-500/5">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-green-400 mb-1">{tool.type}</p>
                      <p className="text-sm text-white/80 mb-2">{tool.examples}</p>
                      <div className="text-xs text-white/70 bg-black/20 p-2 rounded">
                        <strong>Applications:</strong> {tool.applications}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck {...quickChecks[1]} />
          </div>

          {/* PPE Selection */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              <Shield className="w-5 h-5" /> PPE Selection
            </h2>
            <p className="text-sm text-white/80 mb-4">
              Personal protective equipment must match specific hazards and tasks. PPE is the last line of defence
              when other controls cannot eliminate risks. Proper selection, fitting, and maintenance are critical.
            </p>

            <div className="space-y-4">
              {ppeMatrix.map((ppe, i) => (
                <div key={i} className="rounded-lg p-4 border-l-2 border-purple-500/50 bg-purple-500/5">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-purple-400 mb-1">{ppe.bodyPart}</p>
                      <p className="text-sm text-white/80 mb-2"><strong>Type:</strong> {ppe.protectionType}</p>
                      <div className="text-xs text-white/70 bg-black/20 p-2 rounded">
                        <strong>When required:</strong> {ppe.whenRequired}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 bg-white/5 border border-white/10 rounded-lg">
              <p className="text-sm font-medium text-white mb-1">PPE Hierarchy of Control</p>
              <p className="text-xs text-white/70">
                PPE is the last resort after elimination, substitution, engineering controls, and administrative controls.
                However, in electrical work, PPE is often essential. Always conduct risk assessment to determine
                appropriate protection levels.
              </p>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck {...quickChecks[2]} />
          </div>

          {/* Real-world examples */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              <Eye className="w-5 h-5" /> Real-World Examples
            </h2>

            <div className="space-y-4">
              <div className="p-4 bg-white/5 border border-white/10 rounded-lg border-l-2 border-l-red-500">
                <h4 className="font-medium text-white mb-2">Case Study 1: Poor Material Selection</h4>
                <p className="text-sm text-white/80 mb-3">
                  A team installed light fittings in a corrosive marine environment using standard mild steel screws
                  instead of stainless steel. Within six months, severe corrosion caused fittings to loosen and fall,
                  requiring complete reinstallation at double the original cost plus emergency repairs.
                </p>
                <div className="text-xs text-white/70 bg-black/20 p-2 rounded">
                  <strong>Lesson:</strong> The extra £20 for stainless steel screws would have saved £2,000 in remedial work,
                  downtime costs, and reputation damage. Always specify materials for the actual environment.
                </div>
              </div>

              <div className="p-4 bg-white/5 border border-white/10 rounded-lg border-l-2 border-l-red-500">
                <h4 className="font-medium text-white mb-2">Case Study 2: Cheap Tool Consequences</h4>
                <p className="text-sm text-white/80 mb-3">
                  An apprentice used a cheap wire stripper that damaged conductor cores, leading to poor connections.
                  Three months later, several joints overheated causing equipment failure and a small fire. Investigation
                  traced the problem to the damaged conductors.
                </p>
                <div className="text-xs text-white/70 bg-black/20 p-2 rounded">
                  <strong>Lesson:</strong> Quality wire strippers cost £30 more but prevent conductor damage.
                  The fire damage cost £15,000 plus downtime and insurance excess. Professional tools pay for themselves.
                </div>
              </div>

              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg border-l-2 border-l-green-500">
                <h4 className="font-medium text-white mb-2">Success Story: Quality Investment</h4>
                <p className="text-sm text-white/80 mb-3">
                  A contractor invested in high-quality armoured cable cutting tools costing £500. Over 5 years,
                  these tools maintained precision, required minimal maintenance, and improved productivity by 25%.
                  Comparable cheap tools would have cost £200 initially but needed replacement every 18 months.
                </p>
                <div className="text-xs text-white/70 bg-black/20 p-2 rounded">
                  <strong>Result:</strong> Quality tools cost £500 once vs £600 for cheap replacements, plus improved
                  productivity worth £5,000+ over 5 years. Quality is always the economical choice long-term.
                </div>
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
              <div className="rounded-lg border border-white/10 p-4">
                <p className="font-medium text-white mb-1">Can I substitute one cable type for another if it's cheaper?</p>
                <p className="text-sm text-white/70">
                  Only if it meets the same performance, safety, and compliance requirements.
                  Never compromise on specifications for cost savings.
                </p>
              </div>
              <div className="rounded-lg border border-white/10 p-4">
                <p className="font-medium text-white mb-1">How often should PPE be inspected?</p>
                <p className="text-sm text-white/70">
                  Before each use for visual inspection, plus scheduled detailed inspections
                  according to manufacturer guidelines and risk assessment.
                </p>
              </div>
              <div className="rounded-lg border border-white/10 p-4">
                <p className="font-medium text-white mb-1">Do I need insulated tools for all electrical work?</p>
                <p className="text-sm text-white/70">
                  Yes, whenever there's any possibility of contact with live parts,
                  even when following proper isolation procedures.
                </p>
              </div>
              <div className="rounded-lg border border-white/10 p-4">
                <p className="font-medium text-white mb-1">What's the difference between CE and UKCA marking?</p>
                <p className="text-sm text-white/70">
                  CE marking shows compliance with EU standards, UKCA marking shows compliance
                  with UK standards post-Brexit. Both indicate safety and performance compliance.
                </p>
              </div>
            </div>
          </section>

          {/* Summary */}
          <section className="mb-10">
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h2 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-elec-yellow" /> Summary
              </h2>
              <div className="space-y-2 text-sm text-white/80">
                <p>
                  <strong>Material selection</strong> must consider environmental conditions, electrical requirements,
                  compliance standards, and long-term performance. Never compromise on specifications for cost savings.
                </p>
                <p>
                  <strong>Tool quality</strong> directly impacts safety, efficiency, and work quality. Professional-grade
                  tools are essential investments that pay for themselves through improved productivity and reliability.
                </p>
                <p>
                  <strong>PPE selection</strong> must match specific hazards through proper risk assessment. Regular inspection,
                  maintenance, and timely replacement are critical for continued protection.
                </p>
              </div>
            </div>
          </section>

          {/* Quiz */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">Test your knowledge</h2>
            <Quiz questions={quizQuestions} />
          </section>

          {/* Navigation Footer */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 mt-8 border-t border-white/10">
            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../1-2">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Cable Routes
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../1-4">
                Next: Workflow Planning
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module4Section1_3;
