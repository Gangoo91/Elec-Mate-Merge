import { ArrowLeft, AlertTriangle, CheckSquare, Shield, Clock, Users, Cable, Wrench, Zap, Settings, Eye, Ruler, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16 py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground p-0 self-start" asChild>
              <Link to="..">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Module 3
              </Link>
            </Button>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>25 min read</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>Beginner Level</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16 py-12">
        {/* Title Section */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-400 text-sm font-medium rounded-full mb-4">
            <Cable className="w-4 h-4" />
            Module 3 – Section 1
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Cable Selection and Containment (Trunking, Conduit, Tray)
          </h1>
          <p className="text-base text-muted-foreground mb-8 leading-relaxed">
            Essential guide to cable selection and containment systems for AM2 - trunking, conduit, tray installation and assessment requirements.
          </p>
        </div>

        {/* Critical Compliance Warning */}
        <Card className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800/30 mb-8">
          <div className="p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                  CRITICAL: Cable Selection and Containment Are Non-Negotiable
                </h3>
                <p className="text-sm text-red-700 dark:text-emerald-400 mb-3">
                  In the AM2 your installation task will involve selecting the correct cables and installing them within containment systems such as trunking, conduit, and cable tray. The assessor is looking for two things: Correctness — cables and containment must match the drawings and the written specification exactly. Workmanship — neat, safe, and compliant installation in line with BS 7671 and IET "workmanlike" standards.
                </p>
                <p className="text-sm text-red-700 dark:text-emerald-400 font-medium">
                  This section is where poor preparation shows: wrong cable type/size, messy containment, or not following dimensions are among the most common reasons candidates fail the installation section.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Learning Outcomes */}
        <Card className="bg-card border-emerald-500/30 mb-8">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-emerald-400 mb-4 flex items-center gap-2">
              <CheckSquare className="w-5 h-5" />
              Learning Outcomes
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              By the end of this section, you should be able to:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-foreground">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                Select the correct cable type and size in line with the AM2 spec and BS 7671
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                Install trunking, conduit, and tray neatly and securely
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                Maintain segregation of circuits where required
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                Apply bending and fixing techniques to professional standards
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                Anticipate exactly what assessors are checking when they mark containment work
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                Avoid the common errors listed in NET's Pre-Assessment Manual
              </li>
            </ul>
          </div>
        </Card>

        {/* Equipment and Documentation */}
        <Card className="bg-card border-emerald-500/30 mb-8">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-emerald-400 mb-4">
              Equipment & Documentation Requirements
            </h2>
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <h3 className="font-semibold text-base mb-3">Essential Tools & Equipment</h3>
                <ul className="space-y-2 text-xs sm:text-sm text-foreground">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    Cable strippers and termination tools
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    Trunking cutters and deburring tools
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    Conduit benders and cutting equipment
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    Measuring tools (tape measure, spirit level)
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    Fixings and fasteners for containment systems
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-base mb-3">Essential References</h3>
                <ul className="space-y-2 text-xs sm:text-sm text-foreground">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    AM2 drawings and written specifications
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    BS 7671 cable tables and installation methods
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    Manufacturer's installation instructions
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    Cable selection guides and space factor charts
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    NET assessment criteria and marking scheme
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Cable Selection Section */}
        <Card className="bg-card border-emerald-500/30 mb-12">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-emerald-400 mb-4">
              1. Cable Selection in AM2
            </h2>
            <div className="space-y-6 text-xs sm:text-sm text-foreground">
              <div>
                <h3 className="font-semibold text-base mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-emerald-400" />
                  Specification Compliance
                </h3>
                <p className="mb-2">Match the specification exactly — you'll be told what size and type (e.g. 2.5 mm² T&E for ring, 4 mm² radial, flex for motor).</p>
                <ul className="space-y-1 text-muted-foreground ml-4">
                  <li>• Derating factors don't come into play in AM2 (assessors want you to follow the spec, not recalc)</li>
                  <li>• Cables must be free from damage (no nicks in insulation)</li>
                  <li>• Correctly identified (L/N/E clearly visible)</li>
                  <li>• Terminated neatly and securely</li>
                  <li>• Sheath maintained into all accessories and connection points</li>
                  <li>• No substitutions - 2.5mm² specified means 2.5mm² installed</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-base mb-2 flex items-center gap-2">
                  <Cable className="w-4 h-4 text-emerald-400" />
                  Common Cable Types in AM2
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="font-medium">Power Circuits:</p>
                    <ul className="space-y-1 text-muted-foreground ml-4 text-xs">
                      <li>• 1.5mm² T&E - Lighting circuits (6A MCB)</li>
                      <li>• 2.5mm² T&E - Socket radials (20A MCB)</li>
                      <li>• 2.5mm² T&E - Ring finals (32A MCB)</li>
                      <li>• 4.0mm² T&E - Cooker radials (32A MCB)</li>
                      <li>• 6.0mm² T&E - Shower circuits (40A MCB)</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <p className="font-medium">Special Applications:</p>
                    <ul className="space-y-1 text-muted-foreground ml-4 text-xs">
                      <li>• 3-core & earth - Two-way switching</li>
                      <li>• 1.5mm² flex - Pendant lights</li>
                      <li>• 2.5mm² flex - Portable equipment</li>
                      <li>• 2.5mm² SY cable - Motor control circuits</li>
                      <li>• 4.0mm² SWA cable - Motor feeders (outdoor/industrial)</li>
                      <li>• Cat6 data cable - Network points</li>
                      <li>• Fire-rated cable - Fire alarm circuits</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30 rounded-lg p-4">
                <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">Critical Cable Requirements</h4>
                <ul className="space-y-1 text-sm text-amber-700 dark:text-amber-300">
                  <li>• Correct size as per specification (no substitutions allowed)</li>
                  <li>• Appropriate cable type for installation method and environment</li>
                  <li>• Proper colour identification throughout installation</li>
                  <li>• Undamaged insulation and sheathing (inspect before installation)</li>
                  <li>• Current-carrying capacity matches or exceeds circuit protection</li>
                  <li>• Voltage rating appropriate for system (300/500V minimum for T&E)</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 bg-gradient-to-br from-emerald-500/5 to-emerald-500/10 rounded-lg p-6">
              <InlineCheck {...quickCheckQuestions[0]} />
            </div>
          </div>
        </Card>

        {/* Containment Systems Section */}
        <Card className="bg-card border-emerald-500/30 mb-12">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-emerald-400 mb-4">
              2. Containment Systems: What Assessors Expect
            </h2>
            <div className="space-y-6 text-xs sm:text-sm text-foreground">
              <p className="text-base">
                Containment systems protect cables and demonstrate professional workmanship. Assessors focus on three key areas: compliance with installation standards, quality of workmanship, and adherence to safety requirements.
              </p>
              
              <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
                <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4">
                  <h3 className="font-semibold text-base mb-2 text-blue-800 dark:text-blue-200">Trunking Systems</h3>
                  <ul className="space-y-1 text-muted-foreground text-xs">
                    <li>• Straight runs, cut square, burrs removed</li>
                    <li>• Lids flush, no gaps, screws aligned</li>
                    <li>• Cables not overfilled — comply with space factor</li>
                    <li>• Correct segregation for LV and ELV circuits</li>
                    <li>• Joints properly made with couplers</li>
                    <li>• End caps fitted where required</li>
                    <li>• Support spacing per manufacturer specs</li>
                  </ul>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/30 rounded-lg p-4">
                  <h3 className="font-semibold text-base mb-2 text-emerald-800 dark:text-emerald-200">Conduit Systems</h3>
                  <ul className="space-y-1 text-muted-foreground text-xs">
                    <li>• Neat bends — no kinking or flattening</li>
                    <li>• Saddles evenly spaced (300–600mm apart)</li>
                    <li>• Boxes aligned level and square</li>
                    <li>• Bushes fitted, no sharp edges exposed</li>
                    <li>• Pull boxes every 10m maximum</li>
                    <li>• Maximum 2 x 90° bends per run</li>
                    <li>• Threads cut clean on steel conduit</li>
                  </ul>
                </div>
                <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/30 rounded-lg p-4">
                  <h3 className="font-semibold text-base mb-2 text-purple-800 dark:text-purple-200">Cable Tray</h3>
                  <ul className="space-y-1 text-muted-foreground text-xs">
                    <li>• Runs level and properly supported</li>
                    <li>• Correct clips or ties (no insulation tape)</li>
                    <li>• No sharp edges against cables</li>
                    <li>• Consistent spacing of support fixings</li>
                    <li>• Cable segregation maintained on tray</li>
                    <li>• Tray joints properly made</li>
                    <li>• Load calculations considered</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30 rounded-lg p-4">
                <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">Space Factor Requirements</h4>
                <div className="grid md:grid-cols-2 gap-4 text-xs text-amber-700 dark:text-amber-300">
                  <div>
                    <p className="font-medium mb-1">Trunking & Tray:</p>
                    <ul className="space-y-1">
                      <li>• Single cable type: 45% fill factor</li>
                      <li>• Mixed cable types: 40% fill factor</li>
                      <li>• Consider cable outer diameter</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Conduit Systems:</p>
                    <ul className="space-y-1">
                      <li>• Single cable: 31% fill factor</li>
                      <li>• Two cables: 43% fill factor</li>
                      <li>• Three or more: 40% fill factor</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 bg-gradient-to-br from-emerald-500/5 to-emerald-500/10 rounded-lg p-6">
              <InlineCheck {...quickCheckQuestions[1]} />
            </div>
          </div>
        </Card>

        {/* What Assessor Checks Section */}
        <Card className="bg-card border-emerald-500/30 mb-12">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-emerald-400 mb-4">
              3. What the Assessor Checks (NET Guidance)
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-foreground">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-base mb-3">Assessment Focus Areas</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span><strong>Accuracy to drawing/spec:</strong> Heights, positions, routes, and terminations exactly as shown</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span><strong>Workmanship:</strong> Is it neat, straight, aligned? Cables not twisted, sheath maintained into accessories</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span><strong>Compliance:</strong> Correct cable types, correct containment fixings, no breaches of BS 7671</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span><strong>Safety:</strong> Grommets/bushes used, no exposed sharp edges, boxes secure</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-base mb-3">Mark Allocation</h3>
                  <div className="space-y-2">
                    <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-3">
                      <h4 className="font-medium text-green-800 dark:text-green-200 text-sm">Pass Standard</h4>
                      <ul className="text-xs text-green-700 dark:text-green-300 mt-1">
                        <li>• Specification compliance (40%)</li>
                        <li>• Workmanship quality (30%)</li>
                        <li>• Safety compliance (20%)</li>
                        <li>• Completion time (10%)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 bg-gradient-to-br from-emerald-500/5 to-emerald-500/10 rounded-lg p-6">
              <InlineCheck {...quickCheckQuestions[2]} />
            </div>
          </div>
        </Card>

        {/* Common Errors Section */}
        <Card className="bg-card border-emerald-500/30 mb-12">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-emerald-400 mb-4">
              4. Common Errors in AM2 Containment Tasks (NET "Common Errors" List)
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-foreground">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-base mb-3 text-emerald-400">Critical Errors That Cause Failure</h3>
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
                  <h3 className="font-semibold text-base mb-3 text-emerald-400">Mark-Losing Mistakes</h3>
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
              <div className="mt-6 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-lg">
                <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">Real AM2 Failure Examples</h4>
                <ul className="space-y-1 text-sm text-red-700 dark:text-emerald-400">
                  <li>• Candidate completed installation electrically correct but conduit bends were kinked - lost marks for workmanship</li>
                  <li>• Candidate forgot to segregate data cable from power in trunking - failed segregation requirement</li>
                  <li>• Candidate measured once and cut trunking short - left gap under lid → lost marks</li>
                  <li>• Candidate drilled tray fixing too close to edge of brick - fixing pulled out → unsafe support</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Practical Guidance Section */}
        <Card className="bg-card border-emerald-500/30 mb-8">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-emerald-400 mb-4">
              5. Practical Guidance for Candidates
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-foreground">
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h3 className="font-semibold text-base mb-3">Pre-Installation Checklist</h3>
                  <ol className="space-y-2 text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="bg-emerald-500 text-black px-2 py-0.5 rounded text-xs font-medium min-w-[20px] text-center">1</span>
                      <span>Read the spec twice before starting</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="bg-emerald-500 text-black px-2 py-0.5 rounded text-xs font-medium min-w-[20px] text-center">2</span>
                      <span>Mark out routes and positions clearly</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="bg-emerald-500 text-black px-2 py-0.5 rounded text-xs font-medium min-w-[20px] text-center">3</span>
                      <span>Dry fit first - lay trunking/conduit before cutting</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="bg-emerald-500 text-black px-2 py-0.5 rounded text-xs font-medium min-w-[20px] text-center">4</span>
                      <span>Measure twice, cut once</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="bg-emerald-500 text-black px-2 py-0.5 rounded text-xs font-medium min-w-[20px] text-center">5</span>
                      <span>Check cable types and sizes against spec</span>
                    </li>
                  </ol>
                </div>
                <div>
                  <h3 className="font-semibold text-base mb-3">Installation Best Practices</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      Cut trunking/conduit square and deburr every edge
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      Bend slowly and evenly - practice with conduit benders
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      Use correct fixing spacing, keep all screws straight
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      Keep cables straight, no twists
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      Always maintain sheath into accessories
                    </li>
                  </ul>
                </div>
              </div>
              <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4 mt-4">
                <h3 className="font-semibold text-base mb-2 text-blue-800 dark:text-blue-200 flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Self-Assessment Question
                </h3>
                <p className="text-sm text-blue-700 dark:text-emerald-400">
                  Check as you go: "Would an assessor photograph this as good practice or poor practice?"
                </p>
              </div>
            </div>
            <div className="mt-8 bg-gradient-to-br from-emerald-500/5 to-emerald-500/10 rounded-lg p-6">
              <InlineCheck {...quickCheckQuestions[3]} />
            </div>
          </div>
        </Card>

        {/* Assessment Criteria Section */}
        <Card className="bg-card border-emerald-500/30 mb-12">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-emerald-400 mb-4">
              6. Assessment Criteria and Mark Allocations
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-foreground">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-base mb-2 text-green-400">Pass Criteria</h3>
                  <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-4">
                    <ul className="space-y-1 text-green-700 dark:text-green-300">
                      <li>• 100% specification compliance</li>
                      <li>• Professional workmanship standards</li>
                      <li>• Correct cable types and sizes</li>
                      <li>• Neat, secure containment installation</li>
                      <li>• Proper segregation maintained</li>
                      <li>• All edges deburred and safe</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-base mb-2 text-emerald-400">Failure Points</h3>
                  <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-lg p-4">
                    <ul className="space-y-1 text-red-700 dark:text-emerald-400">
                      <li>• Wrong cable size/type used</li>
                      <li>• Poor workmanship (kinked bends, misaligned)</li>
                      <li>• Segregation breaches</li>
                      <li>• Sharp edges left on containment</li>
                      <li>• Insecure fixings or overfilled systems</li>
                      <li>• Non-compliance with drawings</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 bg-gradient-to-br from-emerald-500/5 to-emerald-500/10 rounded-lg p-6">
              <InlineCheck {...quickCheckQuestions[4]} />
            </div>
          </div>
        </Card>

        {/* Professional Standards Section */}
        <Card className="bg-card border-emerald-500/30 mb-12">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-emerald-400 mb-4">
              7. Professional Standards and Industry Expectations
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-foreground">
              <div>
                <h3 className="font-semibold text-base mb-2">Real-World Application</h3>
                <p className="mb-3">
                  The standards expected in AM2 mirror real industry requirements where specification compliance and workmanship quality are non-negotiable:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2 text-emerald-400">Industry Consequences</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Contract non-compliance penalties</li>
                      <li>• Insurance claims voided</li>
                      <li>• Safety certification failures</li>
                      <li>• Rework costs and delays</li>
                      <li>• Professional reputation damage</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-emerald-400">Professional Benefits</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Specification compliance confidence</li>
                      <li>• Quality workmanship reputation</li>
                      <li>• Reduced callback and fault rates</li>
                      <li>• Enhanced career progression</li>
                      <li>• Industry recognition and trust</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Real-World Examples */}
        <Card className="bg-card border-emerald-500/30 mb-12">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-emerald-400 mb-4">
              Real-World Examples
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-foreground">
              <div className="space-y-4">
                <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">Failure Examples</h4>
                  <ul className="space-y-1 text-red-700 dark:text-emerald-400">
                    <li><strong>Example 1:</strong> Candidate completed installation electrically correct but conduit bends were kinked. Lost marks for workmanship.</li>
                    <li><strong>Example 2:</strong> Candidate forgot to segregate data cable from power in trunking. Failed segregation requirement.</li>
                    <li><strong>Example 3:</strong> Candidate measured once and cut trunking short. Left gap under lid → lost marks.</li>
                    <li><strong>Example 4:</strong> In real life, an apprentice drilled a tray fixing too close to edge of brick. Fixing pulled out — unsafe support. Same mistake loses marks in AM2.</li>
                  </ul>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Industry Applications</h4>
                  <ul className="space-y-1 text-blue-700 dark:text-emerald-400">
                    <li><strong>Hospital Project:</strong> Segregation requirements critical for medical equipment interference prevention</li>
                    <li><strong>Data Centre:</strong> Cable tray systems requiring precise spacing and professional appearance for client acceptance</li>
                    <li><strong>Industrial Installation:</strong> Conduit systems needing robust protection and proper earthing for safety certification</li>
                    <li><strong>Commercial Office:</strong> Trunking systems requiring easy access for future modifications and maintenance</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Summary */}
        <Card className="bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700/40 mb-12">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-green-900 dark:text-green-100 mb-4">
              Summary
            </h2>
            <div className="space-y-4 text-sm text-green-800 dark:text-green-200">
              <p className="font-medium">
                In AM2, cable selection and containment are about compliance and workmanship. The assessor wants to see:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Essential Requirements</h3>
                  <ul className="space-y-1">
                    <li>• Correct cable types and sizes exactly as per spec</li>
                    <li>• Containment systems installed straight, square, and burr-free</li>
                    <li>• Proper segregation, secure fixings, and safe terminations</li>
                    <li>• Work that looks professional and "workmanlike"</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-red-600 dark:text-emerald-400">Failure Causes</h3>
                  <ul className="space-y-1 text-red-600 dark:text-emerald-400">
                    <li>• Messy work and shortcuts</li>
                    <li>• Wrong cables or non-specification compliance</li>
                    <li>• Poor containment installation</li>
                    <li>• Safety breaches and workmanship failures</li>
                  </ul>
                </div>
              </div>
              <div className="bg-green-200 dark:bg-green-800/50 border border-green-400 dark:border-green-600/60 rounded-lg p-3 mt-4">
                <p className="font-semibold text-green-900 dark:text-green-100">
                  Golden Rule: Follow the specification exactly, maintain professional workmanship standards, and prioritise compliance over speed.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Quiz Section */}
        <div className="mb-8">
          <Quiz 
            questions={quizQuestions}
            title="Cable Selection and Containment Quiz"
          />
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-8 border-t border-border/20">
          <Button variant="outline" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Module 3 Overview
            </Link>
          </Button>
          <Button asChild>
            <Link to="../section2">
              Next: Section 2
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AM2Module3Section1;