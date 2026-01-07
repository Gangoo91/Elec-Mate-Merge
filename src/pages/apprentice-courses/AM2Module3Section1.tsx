import { AlertTriangle, CheckSquare, Shield, Clock, Users, Cable, Wrench, Zap, Eye, Ruler, BookOpen } from "lucide-react";
import { AM2SectionLayout } from "@/components/apprentice-courses/AM2SectionLayout";
import { AM2HeroSection } from "@/components/apprentice-courses/AM2HeroSection";
import { AM2ContentCard } from "@/components/apprentice-courses/AM2ContentCard";
import { AM2NavigationFooter } from "@/components/apprentice-courses/AM2NavigationFooter";
import { AM2CriticalWarning } from "@/components/apprentice-courses/AM2CriticalWarning";
import { AM2LearningOutcomes } from "@/components/apprentice-courses/AM2LearningOutcomes";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const AM2Module3Section1 = () => {
  useSEO(
    "Cable Selection and Containment - AM2 Module 3",
    "Essential guide to cable selection and containment systems for AM2 - trunking, conduit, tray installation and assessment requirements"
  );

  const quickCheckQuestions: Array<{
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }> = [
    {
      id: "cable-spec-compliance",
      question: "If the drawing calls for 4mm² radial and you install 2.5mm², is it acceptable if it's safe?",
      options: [
        "Yes, as long as it passes testing",
        "No - not to spec, marks lost",
        "Yes, if you upgrade the MCB",
        "No, but only if assessor notices"
      ],
      correctIndex: 1,
      explanation: "Using incorrect cable size is non-compliance with specification regardless of safety - this loses marks and potentially fails the assessment for not following drawings exactly."
    },
    {
      id: "containment-workmanship",
      question: "What's more important - finishing fast, or ensuring every trunking lid is flush and every bend neat?",
      options: [
        "Speed is critical in AM2 assessment",
        "Neatness and compliance; rushing = lost marks",
        "Balance speed and quality equally",
        "Focus on electrical safety only"
      ],
      correctIndex: 1,
      explanation: "Workmanship quality and compliance take priority over speed. Rushed work with poor containment installation loses significant marks even if electrically safe."
    },
    {
      id: "segregation-requirements",
      question: "If the spec calls for segregated trunking for ELV cabling but you run it with mains, what happens?",
      options: [
        "Warning but work can continue",
        "Minor mark deduction only",
        "Fail for specification non-compliance and safety breach",
        "Acceptable if properly terminated"
      ],
      correctIndex: 2,
      explanation: "Mixing ELV with mains violates specification compliance and safety segregation requirements - this is a fail situation for both compliance and safety."
    },
    {
      id: "conduit-technique",
      question: "Why must conduit edges be deburred after cutting?",
      options: [
        "For aesthetic appearance only",
        "To prevent cable insulation damage and meet workmanship standards",
        "Only required for metal conduit",
        "Not essential if using cable protection"
      ],
      correctIndex: 1,
      explanation: "Deburring prevents cable insulation damage and demonstrates professional workmanship standards - sharp edges can cause cable failure and lose marks."
    },
    {
      id: "cable-containment-space",
      question: "What happens if trunking is overfilled beyond space factor requirements?",
      options: [
        "No issue if cables fit physically",
        "Minor warning from assessor",
        "Marks lost for non-compliance with BS 7671",
        "Acceptable if installation looks neat"
      ],
      correctIndex: 2,
      explanation: "Overfilling trunking breaches BS 7671 space factor requirements and loses marks for non-compliance, regardless of physical appearance."
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "Why is it important to follow cable size/type in the spec exactly?",
      options: [
        "For compliance and current-carrying capacity requirements",
        "To make installation look professional",
        "Only important for high-current circuits",
        "Spec is just a guideline, safety is priority"
      ],
      correctAnswer: 0,
      explanation: "Cable specifications ensure compliance with design requirements and current-carrying capacity - deviation can cause failure and safety issues."
    },
    {
      id: 2,
      question: "Name three workmanship points assessors look for in trunking:",
      options: [
        "Speed, efficiency, cable capacity",
        "Straight runs, flush lids, secure fixings",
        "Cost-effectiveness, material quality, brand selection",
        "Accessibility, maintenance, documentation"
      ],
      correctAnswer: 1,
      explanation: "Assessors focus on straight runs, flush lids, and secure fixings as key workmanship indicators for professional trunking installation."
    },
    {
      id: 3,
      question: "What's the correct spacing for conduit saddles?",
      options: [
        "Every 1000mm maximum",
        "300-600mm apart depending on size",
        "As close together as possible",
        "Manufacturer's recommendation only"
      ],
      correctAnswer: 1,
      explanation: "Conduit saddles should be spaced 300-600mm apart depending on conduit size to ensure adequate support and professional appearance."
    },
    {
      id: 4,
      question: "What happens if trunking is overfilled?",
      options: [
        "Nothing if cables fit",
        "Minor appearance issue only",
        "Marks lost for BS 7671 space factor breach",
        "Warning but work continues"
      ],
      correctAnswer: 2,
      explanation: "Overfilling breaches BS 7671 space factor requirements and results in mark deduction for non-compliance with regulations."
    },
    {
      id: 5,
      question: "Why must conduit edges be deburred?",
      options: [
        "For visual appearance only",
        "To prevent cable insulation damage",
        "Only required by some assessors",
        "Makes installation faster"
      ],
      correctAnswer: 1,
      explanation: "Deburring prevents cable insulation damage from sharp edges, ensuring safety and demonstrating professional workmanship standards."
    },
    {
      id: 6,
      question: "True or false: You can use tape to hold cables in tray.",
      options: [
        "True - any securing method works",
        "False - only approved clips/ties allowed",
        "True - if it looks professional",
        "True - for temporary holding only"
      ],
      correctAnswer: 1,
      explanation: "False - only approved clips and cable ties should be used. Insulation tape is not an acceptable cable securing method in tray systems."
    },
    {
      id: 7,
      question: "Give one common error candidates make with bends in conduit:",
      options: [
        "Making bends too slowly",
        "Using too many bends per run",
        "Kinking or creating uneven bends",
        "Not marking bend positions"
      ],
      correctAnswer: 2,
      explanation: "Kinking or creating uneven bends is a common error that loses marks for poor workmanship and can damage cables during installation."
    },
    {
      id: 8,
      question: "What must be maintained into every accessory termination?",
      options: [
        "Cable length for future modifications",
        "Cable sheath maintained into accessories",
        "Spare cores for expansion",
        "Original cable packaging labels"
      ],
      correctAnswer: 1,
      explanation: "Cable sheath must be maintained into accessories to prevent conductor exposure and demonstrate professional termination techniques."
    },
    {
      id: 9,
      question: "If segregation is missing between LV and ELV circuits, what's the consequence?",
      options: [
        "Minor mark deduction",
        "Warning only",
        "Fail for safety and specification breach",
        "Acceptable if properly earthed"
      ],
      correctAnswer: 2,
      explanation: "Missing segregation between LV and ELV circuits violates safety requirements and specification compliance, resulting in assessment failure."
    },
    {
      id: 10,
      question: "What's the golden rule before cutting trunking/conduit?",
      options: [
        "Check you have spare material",
        "Measure twice, cut once",
        "Mark the manufacturer's details",
        "Ensure cutting tools are sharp"
      ],
      correctAnswer: 1,
      explanation: "Measure twice, cut once prevents waste and ensures accurate installation meeting specification requirements exactly."
    },
    {
      id: 11,
      question: "What percentage of AM2 marks typically relates to specification compliance?",
      options: [
        "20% - it's a minor factor",
        "40% - it's the largest weighting",
        "60% - it dominates assessment",
        "10% - workmanship is more important"
      ],
      correctAnswer: 1,
      explanation: "Specification compliance carries approximately 40% weighting in AM2 assessment - the largest single marking criteria."
    },
    {
      id: 12,
      question: "What tolerance do assessors typically allow for containment positioning?",
      options: [
        "±5mm for exact positioning requirements",
        "±20mm if installation looks professional",
        "±50mm for non-critical positions",
        "No tolerance - exact positioning required"
      ],
      correctAnswer: 0,
      explanation: "Assessors typically allow ±5mm tolerance for positioning - beyond this results in mark deduction for specification non-compliance."
    }
  ];

  const learningOutcomes = [
    "Select the correct cable type and size in line with the AM2 spec and BS 7671",
    "Install trunking, conduit, and tray neatly and securely",
    "Maintain segregation of circuits where required",
    "Apply bending and fixing techniques to professional standards",
    "Anticipate exactly what assessors are checking when they mark containment work",
    "Avoid the common errors listed in NET's Pre-Assessment Manual"
  ];

  return (
    <AM2SectionLayout
      backHref=".."
      breadcrumbs={[
        { label: "AM2", href: "/apprentice-courses/am2" },
        { label: "Module 3", href: "/apprentice-courses/am2/module3" },
        { label: "Section 1" }
      ]}
    >
      {/* Hero Section */}
      <AM2HeroSection
        icon={Cable}
        title="Cable Selection and Containment (Trunking, Conduit, Tray)"
        description="Essential guide to cable selection and containment systems for AM2 - trunking, conduit, tray installation and assessment requirements."
        badge="Module 3 - Section 1"
      />

      {/* Critical Compliance Warning */}
      <AM2CriticalWarning
        title="CRITICAL: Cable Selection and Containment Are Non-Negotiable"
        message="In the AM2 your installation task will involve selecting the correct cables and installing them within containment systems such as trunking, conduit, and cable tray. The assessor is looking for two things: Correctness - cables and containment must match the drawings and the written specification exactly. Workmanship - neat, safe, and compliant installation in line with BS 7671 and IET 'workmanlike' standards. This section is where poor preparation shows: wrong cable type/size, messy containment, or not following dimensions are among the most common reasons candidates fail the installation section."
      />

      {/* Learning Outcomes */}
      <AM2LearningOutcomes outcomes={learningOutcomes} />

      {/* Equipment and Documentation */}
      <AM2ContentCard
        title="Equipment & Documentation Requirements"
        icon={Wrench}
      >
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <h3 className="font-semibold text-base mb-3 text-white/90">Essential Tools & Equipment</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-white/70">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Cable strippers and termination tools
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Trunking cutters and deburring tools
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Conduit benders and cutting equipment
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Measuring tools (tape measure, spirit level)
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Fixings and fasteners for containment systems
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-base mb-3 text-white/90">Essential References</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-white/70">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                AM2 drawings and written specifications
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                BS 7671 cable tables and installation methods
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Manufacturer's installation instructions
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Cable selection guides and space factor charts
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                NET assessment criteria and marking scheme
              </li>
            </ul>
          </div>
        </div>
      </AM2ContentCard>

      {/* Cable Selection Section */}
      <AM2ContentCard
        title="1. Cable Selection in AM2"
        icon={Zap}
        accent
      >
        <div className="space-y-6 text-xs sm:text-sm text-white/80">
          <div>
            <h3 className="font-semibold text-base mb-2 flex items-center gap-2 text-white/90">
              Specification Compliance
            </h3>
            <p className="mb-2">Match the specification exactly - you'll be told what size and type (e.g. 2.5 mm² T&E for ring, 4 mm² radial, flex for motor).</p>
            <ul className="space-y-1 text-white/70 ml-4">
              <li>Derating factors don't come into play in AM2 (assessors want you to follow the spec, not recalc)</li>
              <li>Cables must be free from damage (no nicks in insulation)</li>
              <li>Correctly identified (L/N/E clearly visible)</li>
              <li>Terminated neatly and securely</li>
              <li>Sheath maintained into all accessories and connection points</li>
              <li>No substitutions - 2.5mm² specified means 2.5mm² installed</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-2 flex items-center gap-2 text-white/90">
              Common Cable Types in AM2
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="font-medium text-white/90">Power Circuits:</p>
                <ul className="space-y-1 text-white/70 ml-4 text-xs">
                  <li>1.5mm² T&E - Lighting circuits (6A MCB)</li>
                  <li>2.5mm² T&E - Socket radials (20A MCB)</li>
                  <li>2.5mm² T&E - Ring finals (32A MCB)</li>
                  <li>4.0mm² T&E - Cooker radials (32A MCB)</li>
                  <li>6.0mm² T&E - Shower circuits (40A MCB)</li>
                </ul>
              </div>
              <div className="space-y-2">
                <p className="font-medium text-white/90">Special Applications:</p>
                <ul className="space-y-1 text-white/70 ml-4 text-xs">
                  <li>3-core & earth - Two-way switching</li>
                  <li>1.5mm² flex - Pendant lights</li>
                  <li>2.5mm² flex - Portable equipment</li>
                  <li>2.5mm² SY cable - Motor control circuits</li>
                  <li>4.0mm² SWA cable - Motor feeders (outdoor/industrial)</li>
                  <li>Cat6 data cable - Network points</li>
                  <li>Fire-rated cable - Fire alarm circuits</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-amber-500/30 rounded-xl p-4">
            <h4 className="font-semibold text-amber-400 mb-2">Critical Cable Requirements</h4>
            <ul className="space-y-1 text-sm text-white/80">
              <li>Correct size as per specification (no substitutions allowed)</li>
              <li>Appropriate cable type for installation method and environment</li>
              <li>Proper colour identification throughout installation</li>
              <li>Undamaged insulation and sheathing (inspect before installation)</li>
              <li>Current-carrying capacity matches or exceeds circuit protection</li>
              <li>Voltage rating appropriate for system (300/500V minimum for T&E)</li>
            </ul>
          </div>
        </div>
      </AM2ContentCard>

      <InlineCheck {...quickCheckQuestions[0]} />

      {/* Containment Systems Section */}
      <AM2ContentCard
        title="2. Containment Systems: What Assessors Expect"
        icon={Shield}
      >
        <div className="space-y-6 text-xs sm:text-sm text-white/80">
          <p className="text-base">
            Containment systems protect cables and demonstrate professional workmanship. Assessors focus on three key areas: compliance with installation standards, quality of workmanship, and adherence to safety requirements.
          </p>

          <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
            <div className="bg-white/5 border border-blue-500/30 rounded-xl p-4">
              <h3 className="font-semibold text-base mb-2 text-blue-400">Trunking Systems</h3>
              <ul className="space-y-1 text-white/70 text-xs">
                <li>Straight runs, cut square, burrs removed</li>
                <li>Lids flush, no gaps, screws aligned</li>
                <li>Cables not overfilled - comply with space factor</li>
                <li>Correct segregation for LV and ELV circuits</li>
                <li>Joints properly made with couplers</li>
                <li>End caps fitted where required</li>
                <li>Support spacing per manufacturer specs</li>
              </ul>
            </div>
            <div className="bg-white/5 border border-elec-yellow/30 rounded-xl p-4">
              <h3 className="font-semibold text-base mb-2 text-elec-yellow">Conduit Systems</h3>
              <ul className="space-y-1 text-white/70 text-xs">
                <li>Neat bends - no kinking or flattening</li>
                <li>Saddles evenly spaced (300-600mm apart)</li>
                <li>Boxes aligned level and square</li>
                <li>Bushes fitted, no sharp edges exposed</li>
                <li>Pull boxes every 10m maximum</li>
                <li>Maximum 2 x 90° bends per run</li>
                <li>Threads cut clean on steel conduit</li>
              </ul>
            </div>
            <div className="bg-white/5 border border-purple-500/30 rounded-xl p-4">
              <h3 className="font-semibold text-base mb-2 text-purple-400">Cable Tray</h3>
              <ul className="space-y-1 text-white/70 text-xs">
                <li>Runs level and properly supported</li>
                <li>Correct clips or ties (no insulation tape)</li>
                <li>No sharp edges against cables</li>
                <li>Consistent spacing of support fixings</li>
                <li>Cable segregation maintained on tray</li>
                <li>Tray joints properly made</li>
                <li>Load calculations considered</li>
              </ul>
            </div>
          </div>

          <div className="bg-white/5 border border-amber-500/30 rounded-xl p-4">
            <h4 className="font-semibold text-amber-400 mb-2">Space Factor Requirements</h4>
            <div className="grid md:grid-cols-2 gap-4 text-xs text-white/80">
              <div>
                <p className="font-medium mb-1 text-white/90">Trunking & Tray:</p>
                <ul className="space-y-1">
                  <li>Single cable type: 45% fill factor</li>
                  <li>Mixed cable types: 40% fill factor</li>
                  <li>Consider cable outer diameter</li>
                </ul>
              </div>
              <div>
                <p className="font-medium mb-1 text-white/90">Conduit Systems:</p>
                <ul className="space-y-1">
                  <li>Single cable: 31% fill factor</li>
                  <li>Two cables: 43% fill factor</li>
                  <li>Three or more: 40% fill factor</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </AM2ContentCard>

      <InlineCheck {...quickCheckQuestions[1]} />

      {/* What Assessor Checks Section */}
      <AM2ContentCard
        title="3. What the Assessor Checks (NET Guidance)"
        icon={Eye}
      >
        <div className="space-y-4 text-xs sm:text-sm text-white/80">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-base mb-3 text-white/90">Assessment Focus Areas</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong className="text-white/90">Accuracy to drawing/spec:</strong> Heights, positions, routes, and terminations exactly as shown</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong className="text-white/90">Workmanship:</strong> Is it neat, straight, aligned? Cables not twisted, sheath maintained into accessories</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong className="text-white/90">Compliance:</strong> Correct cable types, correct containment fixings, no breaches of BS 7671</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong className="text-white/90">Safety:</strong> Grommets/bushes used, no exposed sharp edges, boxes secure</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-base mb-3 text-white/90">Mark Allocation</h3>
              <div className="space-y-2">
                <div className="bg-white/5 border border-green-500/30 rounded-xl p-3">
                  <h4 className="font-medium text-green-400 text-sm">Pass Standard</h4>
                  <ul className="text-xs text-white/70 mt-1">
                    <li>Specification compliance (40%)</li>
                    <li>Workmanship quality (30%)</li>
                    <li>Safety compliance (20%)</li>
                    <li>Completion time (10%)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AM2ContentCard>

      <InlineCheck {...quickCheckQuestions[2]} />

      {/* Common Errors Section */}
      <AM2ContentCard
        title="4. Common Errors in AM2 Containment Tasks (NET 'Common Errors' List)"
        icon={AlertTriangle}
      >
        <div className="space-y-4 text-xs sm:text-sm text-white/80">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-base mb-3 text-elec-yellow">Critical Errors That Cause Failure</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Using wrong cable type/size</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Poor segregation in trunking</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Kinked or uneven conduit bends</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Leaving sharp edges on cut trunking/conduit</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Not securing tray properly</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-base mb-3 text-elec-yellow">Mark-Losing Mistakes</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Accessories fixed off-level</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Overfilled trunking</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Poor measurement and marking out</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Inconsistent fixing spacing</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-6 p-4 bg-white/5 border border-red-500/30 rounded-xl">
            <h4 className="font-semibold text-red-400 mb-2">Real AM2 Failure Examples</h4>
            <ul className="space-y-1 text-sm text-white/80">
              <li>Candidate completed installation electrically correct but conduit bends were kinked - lost marks for workmanship</li>
              <li>Candidate forgot to segregate data cable from power in trunking - failed segregation requirement</li>
              <li>Candidate measured once and cut trunking short - left gap under lid - lost marks</li>
              <li>Candidate drilled tray fixing too close to edge of brick - fixing pulled out - unsafe support</li>
            </ul>
          </div>
        </div>
      </AM2ContentCard>

      {/* Practical Guidance Section */}
      <AM2ContentCard
        title="5. Practical Guidance for Candidates"
        icon={Wrench}
      >
        <div className="space-y-4 text-xs sm:text-sm text-white/80">
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <h3 className="font-semibold text-base mb-3 text-white/90">Pre-Installation Checklist</h3>
              <ol className="space-y-2 text-white/70">
                <li className="flex gap-2">
                  <span className="bg-elec-yellow text-black px-2 py-0.5 rounded text-xs font-medium min-w-[20px] text-center">1</span>
                  <span>Read the spec twice before starting</span>
                </li>
                <li className="flex gap-2">
                  <span className="bg-elec-yellow text-black px-2 py-0.5 rounded text-xs font-medium min-w-[20px] text-center">2</span>
                  <span>Mark out routes and positions clearly</span>
                </li>
                <li className="flex gap-2">
                  <span className="bg-elec-yellow text-black px-2 py-0.5 rounded text-xs font-medium min-w-[20px] text-center">3</span>
                  <span>Dry fit first - lay trunking/conduit before cutting</span>
                </li>
                <li className="flex gap-2">
                  <span className="bg-elec-yellow text-black px-2 py-0.5 rounded text-xs font-medium min-w-[20px] text-center">4</span>
                  <span>Measure twice, cut once</span>
                </li>
                <li className="flex gap-2">
                  <span className="bg-elec-yellow text-black px-2 py-0.5 rounded text-xs font-medium min-w-[20px] text-center">5</span>
                  <span>Check cable types and sizes against spec</span>
                </li>
              </ol>
            </div>
            <div>
              <h3 className="font-semibold text-base mb-3 text-white/90">Installation Best Practices</h3>
              <ul className="space-y-2 text-white/70">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                  Cut trunking/conduit square and deburr every edge
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                  Bend slowly and evenly - practice with conduit benders
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                  Use correct fixing spacing, keep all screws straight
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                  Keep cables straight, no twists
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                  Always maintain sheath into accessories
                </li>
              </ul>
            </div>
          </div>
          <div className="bg-white/5 border border-blue-500/30 rounded-xl p-4 mt-4">
            <h3 className="font-semibold text-base mb-2 text-blue-400 flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Self-Assessment Question
            </h3>
            <p className="text-sm text-white/80">
              Check as you go: "Would an assessor photograph this as good practice or poor practice?"
            </p>
          </div>
        </div>
      </AM2ContentCard>

      <InlineCheck {...quickCheckQuestions[3]} />

      {/* Assessment Criteria Section */}
      <AM2ContentCard
        title="6. Assessment Criteria and Mark Allocations"
        icon={CheckSquare}
      >
        <div className="space-y-4 text-xs sm:text-sm text-white/80">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-base mb-2 text-green-400">Pass Criteria</h3>
              <div className="bg-white/5 border border-green-500/30 rounded-xl p-4">
                <ul className="space-y-1 text-white/80">
                  <li>100% specification compliance</li>
                  <li>Professional workmanship standards</li>
                  <li>Correct cable types and sizes</li>
                  <li>Neat, secure containment installation</li>
                  <li>Proper segregation maintained</li>
                  <li>All edges deburred and safe</li>
                </ul>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-base mb-2 text-red-400">Failure Points</h3>
              <div className="bg-white/5 border border-red-500/30 rounded-xl p-4">
                <ul className="space-y-1 text-white/80">
                  <li>Wrong cable size/type used</li>
                  <li>Poor workmanship (kinked bends, misaligned)</li>
                  <li>Segregation breaches</li>
                  <li>Sharp edges left on containment</li>
                  <li>Insecure fixings or overfilled systems</li>
                  <li>Non-compliance with drawings</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </AM2ContentCard>

      <InlineCheck {...quickCheckQuestions[4]} />

      {/* Professional Standards Section */}
      <AM2ContentCard
        title="7. Professional Standards and Industry Expectations"
        icon={Ruler}
      >
        <div className="space-y-4 text-xs sm:text-sm text-white/80">
          <div>
            <h3 className="font-semibold text-base mb-2 text-white/90">Real-World Application</h3>
            <p className="mb-3">
              The standards expected in AM2 mirror real industry requirements where specification compliance and workmanship quality are non-negotiable:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2 text-elec-yellow">Industry Consequences</h4>
                <ul className="space-y-1 text-white/70">
                  <li>Contract non-compliance penalties</li>
                  <li>Insurance claims voided</li>
                  <li>Safety certification failures</li>
                  <li>Rework costs and delays</li>
                  <li>Professional reputation damage</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2 text-elec-yellow">Professional Benefits</h4>
                <ul className="space-y-1 text-white/70">
                  <li>Specification compliance confidence</li>
                  <li>Quality workmanship reputation</li>
                  <li>Reduced callback and fault rates</li>
                  <li>Enhanced career progression</li>
                  <li>Industry recognition and trust</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </AM2ContentCard>

      {/* Real-World Examples */}
      <AM2ContentCard
        title="Real-World Examples"
        icon={BookOpen}
      >
        <div className="space-y-4 text-xs sm:text-sm text-white/80">
          <div className="space-y-4">
            <div className="bg-white/5 border border-red-500/30 rounded-xl p-4">
              <h4 className="font-semibold text-red-400 mb-2">Failure Examples</h4>
              <ul className="space-y-1 text-white/80">
                <li><strong>Example 1:</strong> Candidate completed installation electrically correct but conduit bends were kinked. Lost marks for workmanship.</li>
                <li><strong>Example 2:</strong> Candidate forgot to segregate data cable from power in trunking. Failed segregation requirement.</li>
                <li><strong>Example 3:</strong> Candidate measured once and cut trunking short. Left gap under lid - lost marks.</li>
                <li><strong>Example 4:</strong> In real life, an apprentice drilled a tray fixing too close to edge of brick. Fixing pulled out - unsafe support. Same mistake loses marks in AM2.</li>
              </ul>
            </div>
            <div className="bg-white/5 border border-blue-500/30 rounded-xl p-4">
              <h4 className="font-semibold text-blue-400 mb-2">Industry Applications</h4>
              <ul className="space-y-1 text-white/80">
                <li><strong>Hospital Project:</strong> Segregation requirements critical for medical equipment interference prevention</li>
                <li><strong>Data Centre:</strong> Cable tray systems requiring precise spacing and professional appearance for client acceptance</li>
                <li><strong>Industrial Installation:</strong> Conduit systems needing robust protection and proper earthing for safety certification</li>
                <li><strong>Commercial Office:</strong> Trunking systems requiring easy access for future modifications and maintenance</li>
              </ul>
            </div>
          </div>
        </div>
      </AM2ContentCard>

      {/* Summary */}
      <AM2ContentCard
        title="Summary"
        icon={CheckSquare}
        accent
      >
        <div className="space-y-4 text-sm text-white/80">
          <p className="font-medium">
            In AM2, cable selection and containment are about compliance and workmanship. The assessor wants to see:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2 text-white/90">Essential Requirements</h3>
              <ul className="space-y-1">
                <li>Correct cable types and sizes exactly as per spec</li>
                <li>Containment systems installed straight, square, and burr-free</li>
                <li>Proper segregation, secure fixings, and safe terminations</li>
                <li>Work that looks professional and "workmanlike"</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-red-400">Failure Causes</h3>
              <ul className="space-y-1 text-red-300">
                <li>Messy work and shortcuts</li>
                <li>Wrong cables or non-specification compliance</li>
                <li>Poor containment installation</li>
                <li>Safety breaches and workmanship failures</li>
              </ul>
            </div>
          </div>
          <div className="bg-white/5 border border-green-500/30 rounded-xl p-3 mt-4">
            <p className="font-semibold text-green-400">
              Golden Rule: Follow the specification exactly, maintain professional workmanship standards, and prioritise compliance over speed.
            </p>
          </div>
        </div>
      </AM2ContentCard>

      {/* Quiz Section */}
      <Quiz
        questions={quizQuestions}
        title="Cable Selection and Containment Quiz"
      />

      {/* Navigation Footer */}
      <AM2NavigationFooter
        previousHref=".."
        previousLabel="Module 3 Overview"
        nextHref="../section2"
        nextLabel="Power Circuits"
        currentSection={1}
        totalSections={6}
      />
    </AM2SectionLayout>
  );
};

export default AM2Module3Section1;
