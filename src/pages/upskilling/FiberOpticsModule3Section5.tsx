import { useState } from "react";
import { ArrowLeft, Zap, CheckCircle, ChevronDown, Flame, Shield, AlertTriangle, FileText, BookOpen, ClipboardCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Firestop and Penetration Rules - Fiber Optics Technology";
const DESCRIPTION = "Learn fire barrier penetration requirements, firestop systems, building regulations compliance, and proper sealing techniques for fibre optic cable installations.";

const quickCheckQuestions = [
  {
    id: "firestop-qc1",
    question: "What is the primary purpose of firestop systems in cable installations?",
    options: [
      "Improve signal quality",
      "Maintain fire barrier integrity",
      "Reduce cable costs",
      "Increase cable capacity"
    ],
    correctIndex: 1,
    explanation: "Firestop systems maintain the fire-resistance rating of walls and floors by sealing penetrations and preventing fire spread between compartments."
  },
  {
    id: "firestop-qc2",
    question: "What rating must a firestop system typically achieve to match a 2-hour fire wall?",
    options: [
      "30 minutes",
      "1 hour",
      "2 hours",
      "4 hours"
    ],
    correctIndex: 2,
    explanation: "Firestop systems must achieve the same fire-resistance rating as the barrier they penetrate - a 2-hour wall requires a 2-hour rated firestop system."
  },
  {
    id: "firestop-qc3",
    question: "Who is typically responsible for firestop installation certification?",
    options: [
      "The building owner",
      "The cable installer",
      "A certified firestop contractor",
      "The fire service"
    ],
    correctIndex: 2,
    explanation: "Firestop installation should be carried out or certified by qualified contractors trained in the specific firestop systems being used."
  }
];

const quizQuestions = [
  {
    question: "What document provides guidance on fire stopping in the UK?",
    options: [
      "BS 7671",
      "Approved Document B",
      "ETSI standards",
      "ISO 9001"
    ],
    correctAnswer: 1
  },
  {
    question: "What is an intumescent material?",
    options: [
      "A flexible sealant",
      "A material that expands when heated",
      "A rigid fire block",
      "A cable coating"
    ],
    correctAnswer: 1
  },
  {
    question: "What does 'E' rating indicate in fire testing?",
    options: [
      "Energy efficiency",
      "Integrity (flame/hot gas passage)",
      "External rating",
      "Environmental protection"
    ],
    correctAnswer: 1
  },
  {
    question: "What is the maximum fill ratio typically specified for fire-stopped cable penetrations?",
    options: [
      "100%",
      "80%",
      "60%",
      "40%"
    ],
    correctAnswer: 2
  },
  {
    question: "What must be done when adding cables to an existing firestopped penetration?",
    options: [
      "Nothing - existing firestop is sufficient",
      "Remove and reinstall complete firestop",
      "Add silicone sealant around new cables",
      "Follow manufacturer's re-entry procedures"
    ],
    correctAnswer: 3
  },
  {
    question: "What colour are intumescent plugs commonly marked?",
    options: [
      "Yellow",
      "Red or orange",
      "Blue",
      "Green"
    ],
    correctAnswer: 1
  },
  {
    question: "What does a transit device or frame provide?",
    options: [
      "Mechanical support only",
      "Organised entry point maintaining fire rating",
      "Electrical grounding",
      "Cable identification"
    ],
    correctAnswer: 1
  },
  {
    question: "Where must firestop documentation be retained?",
    options: [
      "With cable manufacturer",
      "In building fire safety file/O&M manual",
      "At local council offices",
      "Online only"
    ],
    correctAnswer: 1
  },
  {
    question: "What is cold smoke seal designed to prevent?",
    options: [
      "Fire spread",
      "Smoke migration at ambient temperature",
      "Water ingress",
      "Cable damage"
    ],
    correctAnswer: 1
  },
  {
    question: "Which regulation covers fire safety in non-domestic buildings?",
    options: [
      "Building Regulations only",
      "Regulatory Reform (Fire Safety) Order 2005",
      "Data Protection Act",
      "Health and Safety at Work Act only"
    ],
    correctAnswer: 1
  }
];

const faqs = [
  {
    question: "Do fibre optic cables require the same firestopping as copper cables?",
    answer: "Yes. Although fibre cables don't conduct electricity, they create penetrations through fire barriers that must be sealed. Additionally, cable jackets are combustible and can propagate fire. The same firestopping principles apply to all cable types penetrating fire-rated barriers."
  },
  {
    question: "Can I use general-purpose sealant for fire stopping?",
    answer: "No. Fire stopping requires specifically tested and certified materials designed for fire resistance. General-purpose sealants like standard silicone or mastic will fail in fire conditions. Use only products with appropriate fire testing certification (BS EN 1366-3) and follow manufacturer specifications."
  },
  {
    question: "What happens if firestopping is not installed correctly?",
    answer: "Incorrect or missing firestopping can allow rapid fire spread between compartments, produce toxic smoke migration throughout a building, and compromise the designed fire safety strategy. This creates life safety risks and may result in prosecution under fire safety legislation and invalidate insurance."
  },
  {
    question: "How do I know which firestop product to use?",
    answer: "Selection depends on: the fire rating required (matching the barrier), penetration type (sleeve, opening, transit), cable types and quantities, environmental conditions, and whether re-entry is needed. Use manufacturer selection guides and ensure the specific configuration has been tested to relevant standards."
  },
  {
    question: "Who can install firestop systems?",
    answer: "While regulations don't mandate specific qualifications, competent installation is essential. Many specify third-party certified installers through schemes like FIRAS, BRE, or IFC. For critical applications and compliance demonstration, certified installers with documented training are recommended."
  },
  {
    question: "How do I handle existing penetrations with no firestopping?",
    answer: "Existing unsealed penetrations should be addressed using appropriate retrofit firestop solutions. Assess the barrier rating required, cable fill, and environmental conditions. Various products exist for retrofitting including wrap strips, collars, and re-enterable systems. Document all remedial work and include in fire safety records."
  }
];

const FiberOpticsModule3Section5 = () => {
  useSEO({
    title: TITLE,
    description: DESCRIPTION,
  });

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Minimal Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-screen-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link
            to="/apprentice/study-centre/upskilling/fiber-optics/module3"
            className="flex items-center gap-2 text-white/70 hover:text-white active:scale-[0.98] touch-manipulation min-h-[44px]"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Back to Module 3</span>
          </Link>
          <span className="text-xs text-white/40 hidden sm:block">Section 5 of 6</span>
        </div>
      </header>

      <main className="pt-20 pb-24 px-4 max-w-4xl mx-auto">
        {/* Module Number Badge */}
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-1.5 text-sm text-elec-yellow">
            <Flame className="w-4 h-4" />
            Module 3 · Section 5
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Firestop and Penetration Rules
        </h1>

        {/* Quick Summary Card */}
        <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-2xl p-5 border border-red-500/30 mb-6">
          <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Zap className="w-5 h-5 text-elec-yellow" />
            In 30 Seconds
          </h2>
          <p className="text-white/80 text-sm leading-relaxed">
            Every cable penetration through a fire-rated wall or floor must be properly firestopped
            to maintain compartmentation. Use tested and certified firestop systems that match the
            barrier rating. Document all installations for fire safety records and ensure re-entry
            procedures are followed when adding cables later.
          </p>
        </div>

        {/* Spot it / Use it Card */}
        <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-2xl p-5 border border-orange-500/20 mb-8">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold text-orange-400 mb-2">Spot it</h3>
              <ul className="text-white/70 text-sm space-y-1">
                <li>• Red/orange intumescent materials</li>
                <li>• Cable transit frames in walls</li>
                <li>• Firestop labels and markers</li>
                <li>• Ablative coatings on cables</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-red-400 mb-2">Use it</h3>
              <ul className="text-white/70 text-sm space-y-1">
                <li>• Select products to match fire rating</li>
                <li>• Follow manufacturer fill ratios</li>
                <li>• Complete firestop certificates</li>
                <li>• Photograph before and after</li>
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
              "Fire barrier penetration regulations",
              "Firestop system types and selection",
              "Installation procedures and testing",
              "Documentation requirements",
              "Re-entry and modification procedures",
              "Compliance and certification"
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

        {/* Section 1: Regulatory Framework */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
              <span className="text-lg font-bold">01</span>
            </div>
            <h2 className="text-xl font-bold">Regulatory Framework</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Fire safety in buildings is governed by multiple regulations that require proper
              compartmentation to prevent fire spread. Understanding these requirements is essential
              for compliant cable installations.
            </p>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-red-400" />
                Key UK Regulations
              </h4>
              <ul className="space-y-2 text-sm">
                <li><strong>Building Regulations (England & Wales):</strong> Approved Document B covers fire safety requirements for new buildings and alterations</li>
                <li><strong>Regulatory Reform (Fire Safety) Order 2005:</strong> Requires fire risk assessments and maintenance of fire safety measures in occupied buildings</li>
                <li><strong>BS 476 / BS EN 1366-3:</strong> Test standards for fire resistance of service penetrations</li>
                <li><strong>BS 8519:</strong> Code of practice for fire stopping</li>
              </ul>
            </div>

            <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/30">
              <h4 className="font-semibold text-red-300 mb-2">Critical Principle</h4>
              <p className="text-sm">
                Any penetration through a fire-resisting element (wall, floor, compartment barrier)
                must be sealed to maintain the fire resistance of that element. The firestop system
                must achieve the same fire rating as the barrier it penetrates.
              </p>
            </div>

            <p>
              Fire compartmentation works by containing fires within defined areas, allowing time
              for evacuation and firefighting. Unsealed cable penetrations create paths for fire,
              smoke, and toxic gases to spread rapidly throughout a building, potentially with
              catastrophic consequences.
            </p>

            <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl p-4">
              <h4 className="font-semibold text-white mb-2">Fire Rating Requirements</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-orange-300">Typical Ratings:</p>
                  <ul className="text-white/70 mt-1 space-y-1">
                    <li>• 30 minutes (FD30)</li>
                    <li>• 60 minutes (FD60)</li>
                    <li>• 90 minutes</li>
                    <li>• 120 minutes (2-hour)</li>
                  </ul>
                </div>
                <div>
                  <p className="text-red-300">Rating Codes:</p>
                  <ul className="text-white/70 mt-1 space-y-1">
                    <li>• E = Integrity</li>
                    <li>• I = Insulation</li>
                    <li>• EI 60 = Both for 60 mins</li>
                    <li>• S = Smoke sealing</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Firestop System Types */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
              <span className="text-lg font-bold">02</span>
            </div>
            <h2 className="text-xl font-bold">Firestop System Types</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Various firestop systems exist for different applications. Selection depends on the
              penetration type, cable density, fire rating required, and whether future re-entry
              is needed.
            </p>

            <div className="grid gap-4">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h4 className="font-semibold text-orange-400 mb-2">Intumescent Materials</h4>
                <p className="text-sm mb-2">
                  Materials that expand significantly when exposed to heat, sealing gaps and
                  preventing fire passage.
                </p>
                <ul className="text-sm text-white/60 space-y-1">
                  <li>• <strong>Intumescent sealants:</strong> Gun-applied, expands 3-5x volume</li>
                  <li>• <strong>Intumescent wraps:</strong> Wrapped around cables, expands to crush</li>
                  <li>• <strong>Intumescent collars:</strong> Fixed around penetrations</li>
                  <li>• <strong>Intumescent pillows:</strong> Removable blocks for transit openings</li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h4 className="font-semibold text-red-400 mb-2">Ablative Materials</h4>
                <p className="text-sm mb-2">
                  Materials that absorb heat through chemical reaction, protecting cables and
                  maintaining barrier integrity.
                </p>
                <ul className="text-sm text-white/60 space-y-1">
                  <li>• <strong>Ablative coatings:</strong> Applied to cables, chars to protect</li>
                  <li>• <strong>Ablative batts:</strong> Mineral-based boards that resist fire</li>
                  <li>• <strong>Composite systems:</strong> Multiple materials for enhanced protection</li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h4 className="font-semibold text-yellow-400 mb-2">Transit Systems (Cable Transits)</h4>
                <p className="text-sm mb-2">
                  Engineered frameworks that provide organised cable entry points while maintaining
                  fire rating.
                </p>
                <ul className="text-sm text-white/60 space-y-1">
                  <li>• <strong>Modular frames:</strong> Pre-fabricated frames with removable modules</li>
                  <li>• <strong>Block systems:</strong> Interlocking blocks around cables</li>
                  <li>• <strong>Sleeve seals:</strong> Individual cable entry points</li>
                  <li>• <strong>Multi-cable transits:</strong> High-density penetration management</li>
                </ul>
              </div>
            </div>

            <div className="bg-elec-yellow/10 rounded-xl p-4 border border-elec-yellow/30">
              <h4 className="font-semibold text-elec-yellow mb-2">Selection Considerations</h4>
              <ul className="text-sm space-y-1 text-white/80">
                <li>• <strong>Fire rating required:</strong> Match to barrier specification</li>
                <li>• <strong>Cable types:</strong> Data, power, fibre have different characteristics</li>
                <li>• <strong>Fill ratio:</strong> Maximum cable area in opening (typically 60%)</li>
                <li>• <strong>Re-entry needs:</strong> Will cables be added/removed later?</li>
                <li>• <strong>Environment:</strong> Indoor, outdoor, vibration, movement</li>
              </ul>
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

        {/* Section 3: Installation Procedures */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
              <span className="text-lg font-bold">03</span>
            </div>
            <h2 className="text-xl font-bold">Installation Procedures</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Correct installation is critical for firestop effectiveness. Following manufacturer
              procedures exactly ensures the tested performance is achieved.
            </p>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3">General Installation Steps</h4>
              <ol className="space-y-2 text-sm">
                <li><strong>1. Assess the penetration:</strong> Identify barrier type, rating, and size</li>
                <li><strong>2. Select appropriate system:</strong> Use manufacturer selection guides</li>
                <li><strong>3. Prepare the opening:</strong> Clean, repair damage, ensure correct size</li>
                <li><strong>4. Install backing material:</strong> If required by system specification</li>
                <li><strong>5. Route cables:</strong> Maintain fill ratio, avoid overcrowding</li>
                <li><strong>6. Apply firestop material:</strong> Follow exact manufacturer method</li>
                <li><strong>7. Complete finishing:</strong> Labels, covers, surface treatment</li>
                <li><strong>8. Document installation:</strong> Photographs, certificates, location</li>
              </ol>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/30">
                <h4 className="font-semibold text-green-400 mb-2">Good Practice</h4>
                <ul className="text-sm space-y-1">
                  <li>• Clean and dry surfaces</li>
                  <li>• Correct depth of fill</li>
                  <li>• No gaps or voids</li>
                  <li>• Labels clearly visible</li>
                  <li>• Photographic evidence</li>
                </ul>
              </div>

              <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/30">
                <h4 className="font-semibold text-red-400 mb-2">Common Errors</h4>
                <ul className="text-sm space-y-1">
                  <li>• Incorrect product selection</li>
                  <li>• Exceeding fill ratios</li>
                  <li>• Incomplete coverage</li>
                  <li>• Missing documentation</li>
                  <li>• Wrong depth of sealant</li>
                </ul>
              </div>
            </div>

            <div className="bg-orange-500/10 rounded-xl p-4 border border-orange-500/30">
              <h4 className="font-semibold text-orange-300 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Critical: Manufacturer Instructions
              </h4>
              <p className="text-sm">
                Firestop systems are only valid when installed exactly as tested and specified
                by the manufacturer. Substituting materials, changing depths, or exceeding fill
                ratios invalidates the fire rating and creates a non-compliant installation.
              </p>
            </div>

            <p>
              For fibre optic cables specifically, ensure cables are not stressed or kinked within
              the firestop. Use appropriate cable management to maintain bend radius before and
              after the penetration. Some firestop systems provide dedicated modules for optical
              cables that offer better protection and cable management.
            </p>
          </div>
        </section>

        {/* Section 4: Penetration Types and Methods */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
              <span className="text-lg font-bold">04</span>
            </div>
            <h2 className="text-xl font-bold">Penetration Types and Methods</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Different penetration scenarios require specific firestop approaches. Understanding
              common configurations ensures correct product selection.
            </p>

            <div className="space-y-4">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h4 className="font-semibold text-red-400 mb-2">Wall Penetrations</h4>
                <p className="text-sm mb-2">Cables passing through fire-rated walls:</p>
                <ul className="text-sm text-white/60 space-y-1">
                  <li>• <strong>Sleeved:</strong> Metal or plastic sleeve with annular seal</li>
                  <li>• <strong>Unsleeved:</strong> Direct through opening with firestop</li>
                  <li>• <strong>Transit frame:</strong> Modular system in larger openings</li>
                  <li>• <strong>Cable tray:</strong> Tray through wall with appropriate sealing</li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h4 className="font-semibold text-orange-400 mb-2">Floor Penetrations</h4>
                <p className="text-sm mb-2">Vertical cable routes between floors:</p>
                <ul className="text-sm text-white/60 space-y-1">
                  <li>• <strong>Risers:</strong> Dedicated vertical shafts requiring sealing</li>
                  <li>• <strong>Core holes:</strong> Individual penetrations through slab</li>
                  <li>• <strong>Raised floors:</strong> Seal at structural floor level</li>
                  <li>• <strong>Cable openings:</strong> Maintain 60% fill maximum</li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h4 className="font-semibold text-yellow-400 mb-2">Special Situations</h4>
                <ul className="text-sm text-white/60 space-y-1">
                  <li>• <strong>Movement joints:</strong> Use flexible firestop systems</li>
                  <li>• <strong>Mixed services:</strong> Separate cable and pipe penetrations</li>
                  <li>• <strong>Cavity barriers:</strong> Seal within ceiling/floor voids</li>
                  <li>• <strong>External walls:</strong> Consider weather and fire protection</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-xl p-4">
              <h4 className="font-semibold text-white mb-3">Sleeve Requirements</h4>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-orange-300 mb-1">Steel Sleeves:</p>
                  <ul className="text-white/70 space-y-1">
                    <li>• Non-combustible</li>
                    <li>• Minimum 1.5mm thickness</li>
                    <li>• Extend beyond barrier face</li>
                    <li>• Seal annular gap</li>
                  </ul>
                </div>
                <div>
                  <p className="text-red-300 mb-1">Plastic Sleeves:</p>
                  <ul className="text-white/70 space-y-1">
                    <li>• Use intumescent collar</li>
                    <li>• Collar crushes melting sleeve</li>
                    <li>• Check tested combinations</li>
                    <li>• Common for retrofit</li>
                  </ul>
                </div>
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

        {/* Section 5: Re-Entry and Modifications */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
              <span className="text-lg font-bold">05</span>
            </div>
            <h2 className="text-xl font-bold">Re-Entry and Modifications</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Cable installations frequently require additions or changes. Re-enterable firestop
              systems allow modifications while maintaining fire rating, but specific procedures
              must be followed.
            </p>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3">Re-Entry Methods</h4>
              <div className="space-y-3">
                <div>
                  <p className="text-orange-400 font-medium">Modular Transit Systems</p>
                  <p className="text-sm text-white/60">Remove specific modules, add cables, replace modules.
                  System maintains rating throughout if procedures followed.</p>
                </div>
                <div>
                  <p className="text-red-400 font-medium">Removable Pillows/Bags</p>
                  <p className="text-sm text-white/60">Intumescent pillows can be removed and rearranged
                  around new cables. Easy re-entry but requires sufficient space.</p>
                </div>
                <div>
                  <p className="text-yellow-400 font-medium">Sealant Systems</p>
                  <p className="text-sm text-white/60">Some sealants allow cutting, cable insertion, and
                  resealing. Check manufacturer specifications for approved procedures.</p>
                </div>
              </div>
            </div>

            <div className="bg-orange-500/10 rounded-xl p-4 border border-orange-500/30">
              <h4 className="font-semibold text-orange-300 mb-2 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Re-Entry Procedure
              </h4>
              <ol className="text-sm space-y-1">
                <li>1. Document existing firestop system and condition</li>
                <li>2. Check manufacturer's re-entry procedure</li>
                <li>3. Verify remaining capacity (fill ratio)</li>
                <li>4. Remove only necessary components</li>
                <li>5. Add new cables maintaining bend radius</li>
                <li>6. Reinstall firestop following specifications</li>
                <li>7. Document modification with photographs</li>
                <li>8. Update fire safety records</li>
              </ol>
            </div>

            <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/30">
              <h4 className="font-semibold text-red-400 mb-2">Warning: Complete Replacement</h4>
              <p className="text-sm">
                If a firestop system cannot be properly re-entered (damaged, no procedures,
                wrong type), it must be completely removed and replaced. Partial repairs or
                ad-hoc additions are not acceptable and invalidate the fire rating.
              </p>
            </div>

            <p>
              Where frequent changes are anticipated (e.g., data centres, communications rooms),
              specify re-enterable transit systems from the outset. The additional initial cost
              is offset by easier future modifications and maintained compliance.
            </p>
          </div>
        </section>

        {/* Section 6: Documentation and Certification */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
              <span className="text-lg font-bold">06</span>
            </div>
            <h2 className="text-xl font-bold">Documentation and Certification</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Proper documentation is essential for demonstrating compliance and maintaining
              building fire safety records. This information is required for building control
              sign-off and ongoing fire safety management.
            </p>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <ClipboardCheck className="w-4 h-4 text-green-400" />
                Required Documentation
              </h4>
              <ul className="space-y-2 text-sm">
                <li>• <strong>Firestop certificates:</strong> For each penetration or group</li>
                <li>• <strong>Product data sheets:</strong> Specifications and test certificates</li>
                <li>• <strong>Installation photographs:</strong> Before, during, and after</li>
                <li>• <strong>Location drawings:</strong> All firestop positions marked</li>
                <li>• <strong>Installer qualifications:</strong> Training certificates</li>
                <li>• <strong>Test certificates:</strong> BS EN 1366-3 or equivalent</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-4">
              <h4 className="font-semibold text-white mb-3">Firestop Certificate Contents</h4>
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <ul className="space-y-1 text-white/70">
                  <li>• Unique reference number</li>
                  <li>• Location/grid reference</li>
                  <li>• Barrier type and rating</li>
                  <li>• System manufacturer</li>
                  <li>• Product references used</li>
                </ul>
                <ul className="space-y-1 text-white/70">
                  <li>• Installation date</li>
                  <li>• Installer name and company</li>
                  <li>• Installer qualifications</li>
                  <li>• Test certificate reference</li>
                  <li>• Photograph reference</li>
                </ul>
              </div>
            </div>

            <div className="bg-elec-yellow/10 rounded-xl p-4 border border-elec-yellow/30">
              <h4 className="font-semibold text-elec-yellow mb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Document Retention
              </h4>
              <p className="text-sm text-white/80">
                Firestop documentation must be retained for the life of the building as part
                of the fire safety file (new buildings) or O&M manual. Under the Fire Safety
                Order, the responsible person must maintain this information. Electronic records
                with photographs are increasingly standard.
              </p>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3">Installer Certification Schemes</h4>
              <ul className="space-y-2 text-sm">
                <li>• <strong>FIRAS:</strong> Warrington Fire accredited installers</li>
                <li>• <strong>IFC Certification:</strong> Third-party installer scheme</li>
                <li>• <strong>BRE Global:</strong> LPCB certified contractors</li>
                <li>• <strong>Manufacturer training:</strong> Product-specific certification</li>
              </ul>
              <p className="text-xs text-white/50 mt-2">
                While not legally required, third-party certified installers provide independent
                verification of competence and quality.
              </p>
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
              <h4 className="font-semibold text-green-400 mb-2">Installation Tips</h4>
              <ul className="text-sm text-white/70 space-y-2">
                <li>• <strong>Plan penetrations early:</strong> Design fire barrier crossings as part of cable routing, not as afterthought</li>
                <li>• <strong>Group cables logically:</strong> Separate data, power, and fibre where practical for easier firestopping</li>
                <li>• <strong>Leave spare capacity:</strong> Allow for future cables within fill ratio limits</li>
                <li>• <strong>Photograph everything:</strong> Before, during, and after - essential for records</li>
                <li>• <strong>Label clearly:</strong> Firestop type, date, and reference on both sides of barrier</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-xl p-4 border border-red-500/20">
              <h4 className="font-semibold text-red-400 mb-2">Common Mistakes</h4>
              <ul className="text-sm text-white/70 space-y-2">
                <li>• <strong>Wrong product:</strong> Using products not tested for the specific application</li>
                <li>• <strong>Exceeded fill ratio:</strong> Overcrowding penetrations beyond 60% capacity</li>
                <li>• <strong>Incomplete seal:</strong> Gaps, voids, or insufficient depth of material</li>
                <li>• <strong>Mixed products:</strong> Combining materials from different manufacturers</li>
                <li>• <strong>No documentation:</strong> Failing to complete certificates and photographs</li>
                <li>• <strong>Improper re-entry:</strong> Ad-hoc modifications without proper procedures</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 rounded-xl p-4 border border-orange-500/20">
              <h4 className="font-semibold text-orange-400 mb-2">Fibre-Specific Considerations</h4>
              <ul className="text-sm text-white/70 space-y-2">
                <li>• <strong>Bend radius:</strong> Maintain minimum bend radius through and around firestop</li>
                <li>• <strong>Cable protection:</strong> Use innerduct or protection where cables contact sealant</li>
                <li>• <strong>Tight-buffer vs loose-tube:</strong> Loose-tube cables need careful handling in firestop</li>
                <li>• <strong>Testing after:</strong> Verify optical performance not degraded by installation stress</li>
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
          <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-2xl p-5 border border-red-500/30">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-400" />
              Quick Reference: Firestop Checklist
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-semibold text-red-300 mb-2">Before Installation</h4>
                <ul className="text-xs text-white/70 space-y-1">
                  <li>☐ Identify barrier type and rating</li>
                  <li>☐ Select tested/certified system</li>
                  <li>☐ Check fill ratio capacity</li>
                  <li>☐ Verify installer competence</li>
                  <li>☐ Prepare documentation forms</li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-orange-300 mb-2">After Installation</h4>
                <ul className="text-xs text-white/70 space-y-1">
                  <li>☐ Visual inspection complete</li>
                  <li>☐ Photographs taken</li>
                  <li>☐ Certificate completed</li>
                  <li>☐ Labels applied both sides</li>
                  <li>☐ Records filed in fire safety file</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-xs text-white/50">
                Key regulations: Building Regs Approved Doc B · Fire Safety Order 2005 · BS 8519 · BS EN 1366-3
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
            to="/apprentice/study-centre/upskilling/fiber-optics/module3/section4"
            className="w-full sm:w-auto"
          >
            <Button
              variant="ghost"
              className="w-full sm:w-auto gap-2 text-white/70 hover:text-white min-h-[44px] touch-manipulation"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous: Splice Enclosure Mounting
            </Button>
          </Link>
          <Link
            to="/apprentice/study-centre/upskilling/fiber-optics/module3/section6"
            className="w-full sm:w-auto"
          >
            <Button
              className="w-full sm:w-auto gap-2 bg-elec-yellow text-black hover:bg-elec-yellow/90 min-h-[44px] touch-manipulation"
            >
              Next: Earthing and Segregation
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default FiberOpticsModule3Section5;
