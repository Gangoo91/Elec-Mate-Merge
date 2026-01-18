import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Firestop and Penetration Rules | Fibre Optics Module 3";
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
    id: 1,
    question: "What document provides guidance on fire stopping in the UK?",
    options: [
      "BS 7671",
      "Approved Document B",
      "ETSI standards",
      "ISO 9001"
    ],
    correctAnswer: 1,
    explanation: "Approved Document B of the Building Regulations provides fire safety guidance in England and Wales."
  },
  {
    id: 2,
    question: "What is an intumescent material?",
    options: [
      "A flexible sealant",
      "A material that expands when heated",
      "A rigid fire block",
      "A cable coating"
    ],
    correctAnswer: 1,
    explanation: "Intumescent materials expand significantly when exposed to heat, sealing gaps and preventing fire passage."
  },
  {
    id: 3,
    question: "What does 'E' rating indicate in fire testing?",
    options: [
      "Energy efficiency",
      "Integrity (flame/hot gas passage)",
      "External rating",
      "Environmental protection"
    ],
    correctAnswer: 1,
    explanation: "E rating indicates integrity - the ability to prevent flame and hot gas passage through the barrier."
  },
  {
    id: 4,
    question: "What is the maximum fill ratio typically specified for fire-stopped cable penetrations?",
    options: [
      "100%",
      "80%",
      "60%",
      "40%"
    ],
    correctAnswer: 2,
    explanation: "Most firestop systems specify a maximum 60% fill ratio for cable penetrations."
  },
  {
    id: 5,
    question: "What must be done when adding cables to an existing firestopped penetration?",
    options: [
      "Nothing - existing firestop is sufficient",
      "Remove and reinstall complete firestop",
      "Add silicone sealant around new cables",
      "Follow manufacturer's re-entry procedures"
    ],
    correctAnswer: 3,
    explanation: "Re-enterable firestop systems have specific procedures that must be followed to maintain the fire rating."
  },
  {
    id: 6,
    question: "What colour are intumescent plugs commonly marked?",
    options: [
      "Yellow",
      "Red or orange",
      "Blue",
      "Green"
    ],
    correctAnswer: 1,
    explanation: "Intumescent materials are typically coloured red or orange for easy identification."
  },
  {
    id: 7,
    question: "What does a transit device or frame provide?",
    options: [
      "Mechanical support only",
      "Organised entry point maintaining fire rating",
      "Electrical grounding",
      "Cable identification"
    ],
    correctAnswer: 1,
    explanation: "Transit frames provide organised cable entry points while maintaining the required fire rating."
  },
  {
    id: 8,
    question: "Where must firestop documentation be retained?",
    options: [
      "With cable manufacturer",
      "In building fire safety file/O&M manual",
      "At local council offices",
      "Online only"
    ],
    correctAnswer: 1,
    explanation: "Firestop documentation must be retained in the building's fire safety file and O&M manual."
  },
  {
    id: 9,
    question: "What is cold smoke seal designed to prevent?",
    options: [
      "Fire spread",
      "Smoke migration at ambient temperature",
      "Water ingress",
      "Cable damage"
    ],
    correctAnswer: 1,
    explanation: "Cold smoke seals prevent smoke migration at ambient temperature before fire conditions develop."
  },
  {
    id: 10,
    question: "Which regulation covers fire safety in non-domestic buildings?",
    options: [
      "Building Regulations only",
      "Regulatory Reform (Fire Safety) Order 2005",
      "Data Protection Act",
      "Health and Safety at Work Act only"
    ],
    correctAnswer: 1,
    explanation: "The Regulatory Reform (Fire Safety) Order 2005 covers fire safety requirements in non-domestic buildings."
  }
];

const faqs = [
  {
    question: "Do fibre optic cables require the same firestopping as copper cables?",
    answer: "Yes. Although fibre cables do not conduct electricity, they create penetrations through fire barriers that must be sealed. Additionally, cable jackets are combustible and can propagate fire. The same firestopping principles apply to all cable types penetrating fire-rated barriers."
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
    answer: "While regulations do not mandate specific qualifications, competent installation is essential. Many specify third-party certified installers through schemes like FIRAS, BRE, or IFC. For critical applications and compliance demonstration, certified installers with documented training are recommended."
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

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
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
            <Zap className="h-4 w-4" />
            <span>Module 3 Section 5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Firestop and Penetration Rules
          </h1>
          <p className="text-white/80">
            Fire barrier integrity, sealing systems, and compliance
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Purpose:</strong> Maintain fire compartmentation</li>
              <li><strong>Match rating:</strong> Firestop must equal barrier rating</li>
              <li><strong>Fill ratio:</strong> Maximum 60% cable fill typically</li>
              <li><strong>Document:</strong> All installations in fire safety file</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Red/orange intumescent materials</li>
              <li><strong>Spot:</strong> Transit frames in walls/floors</li>
              <li><strong>Use:</strong> Tested and certified products only</li>
              <li><strong>Use:</strong> Manufacturer-specified procedures</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Fire barrier penetration regulations",
              "Firestop system types and selection",
              "Installation procedures and testing",
              "Documentation requirements",
              "Re-entry and modification procedures",
              "Compliance and certification"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1: Regulatory Framework */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Regulatory Framework
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Fire safety in buildings is governed by multiple regulations that require proper compartmentation to prevent fire spread. Understanding these requirements is essential for compliant cable installations.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key UK Regulations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Building Regulations (England and Wales):</strong> Approved Document B covers fire safety requirements for new buildings and alterations</li>
                <li><strong>Regulatory Reform (Fire Safety) Order 2005:</strong> Requires fire risk assessments and maintenance of fire safety measures in occupied buildings</li>
                <li><strong>BS 476 / BS EN 1366-3:</strong> Test standards for fire resistance of service penetrations</li>
                <li><strong>BS 8519:</strong> Code of practice for fire stopping</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Critical Principle:</p>
              <p className="text-sm text-white">
                Any penetration through a fire-resisting element (wall, floor, compartment barrier) must be sealed to maintain the fire resistance of that element. The firestop system must achieve the same fire rating as the barrier it penetrates.
              </p>
            </div>

            <p>
              Fire compartmentation works by containing fires within defined areas, allowing time for evacuation and firefighting. Unsealed cable penetrations create paths for fire, smoke, and toxic gases to spread rapidly throughout a building, potentially with catastrophic consequences.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Fire Rating Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>30 minutes (FD30):</strong> Standard internal doors and partitions</li>
                <li><strong>60 minutes (FD60):</strong> Compartment walls, protected shafts</li>
                <li><strong>90 minutes:</strong> High-risk occupancies</li>
                <li><strong>120 minutes (2-hour):</strong> Fire walls, critical barriers</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Rating Codes:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>E = Integrity:</strong> Prevents flame and hot gas passage</li>
                <li><strong>I = Insulation:</strong> Limits temperature rise on unexposed face</li>
                <li><strong>EI 60:</strong> Both integrity and insulation for 60 minutes</li>
                <li><strong>S = Smoke sealing:</strong> Prevents cold smoke migration</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: Firestop System Types */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Firestop System Types
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Various firestop systems exist for different applications. Selection depends on the penetration type, cable density, fire rating required, and whether future re-entry is needed.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Intumescent Materials:</p>
              <p className="text-sm text-white mb-2">Materials that expand significantly when exposed to heat, sealing gaps and preventing fire passage.</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Intumescent sealants:</strong> Gun-applied, expands 3-5x volume</li>
                <li><strong>Intumescent wraps:</strong> Wrapped around cables, expands to crush</li>
                <li><strong>Intumescent collars:</strong> Fixed around penetrations</li>
                <li><strong>Intumescent pillows:</strong> Removable blocks for transit openings</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Ablative Materials:</p>
              <p className="text-sm text-white mb-2">Materials that absorb heat through chemical reaction, protecting cables and maintaining barrier integrity.</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Ablative coatings:</strong> Applied to cables, chars to protect</li>
                <li><strong>Ablative batts:</strong> Mineral-based boards that resist fire</li>
                <li><strong>Composite systems:</strong> Multiple materials for enhanced protection</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Transit Systems (Cable Transits):</p>
              <p className="text-sm text-white mb-2">Engineered frameworks that provide organised cable entry points while maintaining fire rating.</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Modular frames:</strong> Pre-fabricated frames with removable modules</li>
                <li><strong>Block systems:</strong> Interlocking blocks around cables</li>
                <li><strong>Sleeve seals:</strong> Individual cable entry points</li>
                <li><strong>Multi-cable transits:</strong> High-density penetration management</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Selection Considerations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Fire rating required:</strong> Match to barrier specification</li>
                <li><strong>Cable types:</strong> Data, power, fibre have different characteristics</li>
                <li><strong>Fill ratio:</strong> Maximum cable area in opening (typically 60%)</li>
                <li><strong>Re-entry needs:</strong> Will cables be added/removed later?</li>
                <li><strong>Environment:</strong> Indoor, outdoor, vibration, movement</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 3: Installation Procedures */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Installation Procedures
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Correct installation is critical for firestop effectiveness. Following manufacturer procedures exactly ensures the tested performance is achieved.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">General Installation Steps:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>1. Assess the penetration: Identify barrier type, rating, and size</li>
                <li>2. Select appropriate system: Use manufacturer selection guides</li>
                <li>3. Prepare the opening: Clean, repair damage, ensure correct size</li>
                <li>4. Install backing material: If required by system specification</li>
                <li>5. Route cables: Maintain fill ratio, avoid overcrowding</li>
                <li>6. Apply firestop material: Follow exact manufacturer method</li>
                <li>7. Complete finishing: Labels, covers, surface treatment</li>
                <li>8. Document installation: Photographs, certificates, location</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Good Practice:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Clean and dry surfaces</li>
                <li>Correct depth of fill</li>
                <li>No gaps or voids</li>
                <li>Labels clearly visible</li>
                <li>Photographic evidence</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Common Errors:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Incorrect product selection</li>
                <li>Exceeding fill ratios</li>
                <li>Incomplete coverage</li>
                <li>Missing documentation</li>
                <li>Wrong depth of sealant</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Critical: Manufacturer Instructions</p>
              <p className="text-sm text-white">
                Firestop systems are only valid when installed exactly as tested and specified by the manufacturer. Substituting materials, changing depths, or exceeding fill ratios invalidates the fire rating and creates a non-compliant installation.
              </p>
            </div>

            <p>
              For fibre optic cables specifically, ensure cables are not stressed or kinked within the firestop. Use appropriate cable management to maintain bend radius before and after the penetration. Some firestop systems provide dedicated modules for optical cables that offer better protection and cable management.
            </p>
          </div>
        </section>

        {/* Section 4: Penetration Types and Methods */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Penetration Types and Methods
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Different penetration scenarios require specific firestop approaches. Understanding common configurations ensures correct product selection.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Wall Penetrations:</p>
              <p className="text-sm text-white mb-2">Cables passing through fire-rated walls:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Sleeved:</strong> Metal or plastic sleeve with annular seal</li>
                <li><strong>Unsleeved:</strong> Direct through opening with firestop</li>
                <li><strong>Transit frame:</strong> Modular system in larger openings</li>
                <li><strong>Cable tray:</strong> Tray through wall with appropriate sealing</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Floor Penetrations:</p>
              <p className="text-sm text-white mb-2">Vertical cable routes between floors:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Risers:</strong> Dedicated vertical shafts requiring sealing</li>
                <li><strong>Core holes:</strong> Individual penetrations through slab</li>
                <li><strong>Raised floors:</strong> Seal at structural floor level</li>
                <li><strong>Cable openings:</strong> Maintain 60% fill maximum</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Special Situations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Movement joints:</strong> Use flexible firestop systems</li>
                <li><strong>Mixed services:</strong> Separate cable and pipe penetrations</li>
                <li><strong>Cavity barriers:</strong> Seal within ceiling/floor voids</li>
                <li><strong>External walls:</strong> Consider weather and fire protection</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Sleeve Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Steel sleeves:</strong> Non-combustible, minimum 1.5mm thickness, seal annular gap</li>
                <li><strong>Plastic sleeves:</strong> Use intumescent collar, collar crushes melting sleeve</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 5: Re-Entry and Modifications */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Re-Entry and Modifications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Cable installations frequently require additions or changes. Re-enterable firestop systems allow modifications while maintaining fire rating, but specific procedures must be followed.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Re-Entry Methods:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Modular transit systems:</strong> Remove specific modules, add cables, replace modules. System maintains rating throughout if procedures followed.</li>
                <li><strong>Removable pillows/bags:</strong> Intumescent pillows can be removed and rearranged around new cables. Easy re-entry but requires sufficient space.</li>
                <li><strong>Sealant systems:</strong> Some sealants allow cutting, cable insertion, and resealing. Check manufacturer specifications for approved procedures.</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Re-Entry Procedure:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>1. Document existing firestop system and condition</li>
                <li>2. Check manufacturer's re-entry procedure</li>
                <li>3. Verify remaining capacity (fill ratio)</li>
                <li>4. Remove only necessary components</li>
                <li>5. Add new cables maintaining bend radius</li>
                <li>6. Reinstall firestop following specifications</li>
                <li>7. Document modification with photographs</li>
                <li>8. Update fire safety records</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Warning: Complete Replacement</p>
              <p className="text-sm text-white">
                If a firestop system cannot be properly re-entered (damaged, no procedures, wrong type), it must be completely removed and replaced. Partial repairs or ad-hoc additions are not acceptable and invalidate the fire rating.
              </p>
            </div>

            <p>
              Where frequent changes are anticipated (e.g., data centres, communications rooms), specify re-enterable transit systems from the outset. The additional initial cost is offset by easier future modifications and maintained compliance.
            </p>
          </div>
        </section>

        {/* Section 6: Documentation and Certification */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Documentation and Certification
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Proper documentation is essential for demonstrating compliance and maintaining building fire safety records. This information is required for building control sign-off and ongoing fire safety management.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Required Documentation:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Firestop certificates:</strong> For each penetration or group</li>
                <li><strong>Product data sheets:</strong> Specifications and test certificates</li>
                <li><strong>Installation photographs:</strong> Before, during, and after</li>
                <li><strong>Location drawings:</strong> All firestop positions marked</li>
                <li><strong>Installer qualifications:</strong> Training certificates</li>
                <li><strong>Test certificates:</strong> BS EN 1366-3 or equivalent</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Firestop Certificate Contents:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Unique reference number</li>
                <li>Location/grid reference</li>
                <li>Barrier type and rating</li>
                <li>System manufacturer</li>
                <li>Product references used</li>
                <li>Installation date</li>
                <li>Installer name and company</li>
                <li>Installer qualifications</li>
                <li>Test certificate reference</li>
                <li>Photograph reference</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Document Retention:</p>
              <p className="text-sm text-white">
                Firestop documentation must be retained for the life of the building as part of the fire safety file (new buildings) or O&M manual. Under the Fire Safety Order, the responsible person must maintain this information. Electronic records with photographs are increasingly standard.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Installer Certification Schemes:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>FIRAS:</strong> Warrington Fire accredited installers</li>
                <li><strong>IFC Certification:</strong> Third-party installer scheme</li>
                <li><strong>BRE Global:</strong> LPCB certified contractors</li>
                <li><strong>Manufacturer training:</strong> Product-specific certification</li>
              </ul>
              <p className="text-xs text-white mt-2">
                While not legally required, third-party certified installers provide independent verification of competence and quality.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Tips</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Plan penetrations early:</strong> Design fire barrier crossings as part of cable routing, not as afterthought</li>
                <li><strong>Group cables logically:</strong> Separate data, power, and fibre where practical for easier firestopping</li>
                <li><strong>Leave spare capacity:</strong> Allow for future cables within fill ratio limits</li>
                <li><strong>Photograph everything:</strong> Before, during, and after - essential for records</li>
                <li><strong>Label clearly:</strong> Firestop type, date, and reference on both sides of barrier</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Wrong product</strong> - Using products not tested for the specific application</li>
                <li><strong>Exceeded fill ratio</strong> - Overcrowding penetrations beyond 60% capacity</li>
                <li><strong>Incomplete seal</strong> - Gaps, voids, or insufficient depth of material</li>
                <li><strong>Mixed products</strong> - Combining materials from different manufacturers</li>
                <li><strong>No documentation</strong> - Failing to complete certificates and photographs</li>
                <li><strong>Improper re-entry</strong> - Ad-hoc modifications without proper procedures</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Fibre-Specific Considerations</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Bend radius:</strong> Maintain minimum bend radius through and around firestop</li>
                <li><strong>Cable protection:</strong> Use innerduct or protection where cables contact sealant</li>
                <li><strong>Tight-buffer vs loose-tube:</strong> Loose-tube cables need careful handling in firestop</li>
                <li><strong>Testing after:</strong> Verify optical performance not degraded by installation stress</li>
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
          <div className="mt-6 p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference: Firestop Checklist</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Before Installation</p>
                <ul className="space-y-0.5">
                  <li>Identify barrier type and rating</li>
                  <li>Select tested/certified system</li>
                  <li>Check fill ratio capacity</li>
                  <li>Verify installer competence</li>
                  <li>Prepare documentation forms</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">After Installation</p>
                <ul className="space-y-0.5">
                  <li>Visual inspection complete</li>
                  <li>Photographs taken</li>
                  <li>Certificate completed</li>
                  <li>Labels applied both sides</li>
                  <li>Records filed in fire safety file</li>
                </ul>
              </div>
            </div>
            <p className="text-xs text-white mt-4">
              <strong>Key regulations:</strong> Building Regs Approved Doc B | Fire Safety Order 2005 | BS 8519 | BS EN 1366-3
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
            <Link to="../section-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Splice Enclosure Mounting
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-6">
              Next: Earthing and Segregation
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default FiberOpticsModule3Section5;
