import { ArrowLeft, AlertTriangle, FileText, CheckSquare, Shield, Clock, Users, Eye, Ruler, Zap, BookOpen, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const AM2Module2Section3 = () => {
  useSEO(
    "Working with Drawings and Specifications - AM2 Module 2",
    "Complete guide to interpreting AM2 drawings and specifications - circuit diagrams, layout plans, and compliance requirements"
  );

  const quickCheckQuestions = [
    {
      id: "socket-positioning",
      question: "If a drawing shows a double socket at 300mm and you fit it at 400mm, do you pass?",
      options: [
        "Yes, as long as it's professionally installed",
        "No - incorrect positioning loses marks",
        "Yes, if client agrees to the change",
        "No, but only if it's more than 50mm out"
      ],
      correctIndex: 1,
      explanation: "Incorrect positioning = lost marks. AM2 drawings and specifications must be followed exactly - deviation leads to mark deduction regardless of workmanship quality."
    },
    {
      id: "elv-segregation",
      question: "If the spec calls for segregated trunking for ELV cabling but you run it with mains, what happens?",
      options: [
        "Nothing, as long as cables are properly terminated",
        "Minor mark deduction only",
        "Fail for not following spec and breaching safety segregation",
        "Warning but work can continue"
      ],
      correctIndex: 2,
      explanation: "Running ELV with mains violates both specification compliance and safety segregation requirements - this is a fail situation for both compliance and safety."
    },
    {
      id: "cable-size-compliance",
      question: "What happens if you use 2.5mm² cable where the spec calls for 4mm²?",
      options: [
        "No problem if it passes inspection",
        "Minor mark deduction for incorrect material",
        "Fail for non-compliance with specification",
        "OK if you document the change"
      ],
      correctIndex: 2,
      explanation: "Using incorrect cable size is non-compliance with specification and fails current-carrying capacity requirements - this results in assessment failure."
    },
    {
      id: "bs7671-symbols",
      question: "In AM2, what level of BS 7671 symbol knowledge is expected?",
      options: [
        "Basic knowledge of common symbols only",
        "Fluent recognition of all standard electrical symbols",
        "Symbols will be explained on drawings",
        "Symbol knowledge is not assessed"
      ],
      correctIndex: 1,
      explanation: "You must be fluent in BS 7671 electrical symbols - this is fundamental knowledge expected for AM2 assessment and professional practice."
    },
    {
      id: "measurement-accuracy",
      question: "Why is exact measurement crucial when following AM2 drawings?",
      options: [
        "For aesthetic appearance only",
        "To show attention to detail",
        "Measurements in drawings are treated as exact requirements",
        "Near enough is acceptable if professionally done"
      ],
      correctIndex: 2,
      explanation: "AM2 drawings show exact measurements that must be followed precisely - 'near enough' leads to mark deduction as you're assessed on compliance, not just craftsmanship."
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "Name three types of drawings/specs you'll see in AM2:",
      options: [
        "Sketches, photos, verbal instructions",
        "Circuit diagrams, layout diagrams, written specifications",
        "Blueprints, CAD drawings, estimates",
        "Floor plans, elevation views, sections"
      ],
      correctAnswer: 1,
      explanation: "AM2 uses circuit diagrams (showing connections), layout diagrams (showing positions), and written specifications (detailing requirements)."
    },
    {
      id: 2,
      question: "If the spec calls for 4mm² cable but you install 2.5mm², what happens?",
      options: [
        "Warning but work continues",
        "Minor mark deduction",
        "Fail for non-compliance with specification",
        "OK if it still meets safety requirements"
      ],
      correctAnswer: 2,
      explanation: "Using incorrect cable size violates specification compliance and may not meet current-carrying capacity - this results in assessment failure."
    },
    {
      id: 3,
      question: "Why must socket heights match the drawing exactly?",
      options: [
        "For aesthetic reasons only",
        "To show you can follow instructions precisely",
        "Only approximate positioning is needed",
        "Height doesn't matter if it's accessible"
      ],
      correctAnswer: 1,
      explanation: "AM2 assesses your ability to follow specifications exactly as you would in professional practice - precision demonstrates competency."
    },
    {
      id: 4,
      question: "What does segregation mean in trunking systems?",
      options: [
        "Keeping different cable types separate for safety/compliance",
        "Using different colours for different circuits",
        "Installing trunking at different heights",
        "Separating power and lighting circuits"
      ],
      correctAnswer: 0,
      explanation: "Segregation means keeping different voltage systems (LV and ELV) separate to prevent interference and maintain safety compliance."
    },
    {
      id: 5,
      question: "Which takes priority if there's a conflict - neatness or following spec?",
      options: [
        "Neatness - appearance matters most",
        "Following spec - compliance is paramount",
        "Balance of both equally",
        "Assessor preference determines priority"
      ],
      correctAnswer: 1,
      explanation: "Specification compliance always takes priority - you're marked on following instructions, not just craftsmanship appearance."
    },
    {
      id: 6,
      question: "True or false: Assessors allow small deviations in accessory positions:",
      options: [
        "True - small deviations are acceptable",
        "False - exact positioning is required",
        "True - within 50mm tolerance",
        "True - if explained in writing"
      ],
      correctAnswer: 1,
      explanation: "False - AM2 drawings show exact requirements. Any deviation from specified positions results in mark deduction."
    },
    {
      id: 7,
      question: "What's the main reason candidates fail this section?",
      options: [
        "Poor tool selection",
        "Slow working speed",
        "Not following drawings/specifications exactly",
        "Inadequate safety equipment"
      ],
      correctAnswer: 2,
      explanation: "The main failure reason is not following drawings/specifications exactly - many assume 'close enough' is acceptable."
    },
    {
      id: 8,
      question: "Why should you mark out before fixing accessories?",
      options: [
        "To make the work look professional",
        "To ensure exact positioning as per drawings",
        "To speed up installation process",
        "To impress the assessor"
      ],
      correctAnswer: 1,
      explanation: "Marking out ensures accessories are positioned exactly as specified in drawings - preventing costly mistakes and mark deduction."
    },
    {
      id: 9,
      question: "Give one example of misreading a drawing that could cost marks:",
      options: [
        "Installing socket 100mm higher than specified",
        "Using neater cable routing than shown",
        "Adding extra earth bonding",
        "Using better quality accessories"
      ],
      correctAnswer: 0,
      explanation: "Installing accessories in wrong positions (even if neat and safe) loses marks as it shows failure to follow specifications."
    },
    {
      id: 10,
      question: "What's the golden rule when working with AM2 specs?",
      options: [
        "Work as quickly as possible",
        "Follow drawings and specifications exactly",
        "Prioritise safety over specification",
        "Use professional judgement to improve design"
      ],
      correctAnswer: 1,
      explanation: "The golden rule is to follow drawings and specifications exactly - AM2 assesses compliance, not design improvement or personal preference."
    },
    {
      id: 11,
      question: "What percentage of marks does specification compliance carry in NET assessment?",
      options: [
        "25% - it's one of many factors",
        "40% - it's the largest weighting",
        "60% - it's the most important",
        "15% - workmanship is more important"
      ],
      correctAnswer: 1,
      explanation: "Specification compliance carries 40% weighting in NET assessment - the largest single marking criteria, emphasising its critical importance."
    },
    {
      id: 12,
      question: "What tolerance do NET assessors typically allow for accessory positioning?",
      options: [
        "±5mm tolerance for exact positioning",
        "±20mm tolerance if professionally installed",
        "±50mm tolerance as long as it's functional",
        "No tolerance - exact positioning required"
      ],
      correctAnswer: 0,
      explanation: "NET assessors typically allow ±5mm tolerance for accessory positioning - beyond this results in mark deduction for specification non-compliance."
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
                Back to Module 2
              </Link>
            </Button>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>20 min read</span>
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
            <FileText className="w-4 h-4" />
            Module 2 – Section 3
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Working with Drawings and Specifications
          </h1>
          <p className="text-base text-muted-foreground mb-8 leading-relaxed">
            Complete guide to interpreting AM2 drawings and specifications - circuit diagrams, layout plans, and compliance requirements.
          </p>
        </div>

        {/* Critical Compliance Warning */}
        <Card className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800/30 mb-8">
          <div className="p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                  CRITICAL: Drawings and Specifications Are Non-Negotiable
                </h3>
                <p className="text-sm text-red-700 dark:text-emerald-400 mb-3">
                  In the AM2 you'll be given drawings, wiring diagrams, and written specifications. These aren't suggestions — 
                  they are the blueprint you must follow exactly. Many candidates fail because they think "as long as it works, it's fine." 
                  Wrong. The assessor marks against compliance with the specification, not just function.
                </p>
                <p className="text-sm text-red-700 dark:text-emerald-400 font-medium">
                  In the real world, not following drawings and specs can mean breaching contract terms, voiding compliance certificates, 
                  or creating unsafe installations. This section ensures you understand the critical importance of specification compliance.
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
                Interpret AM2 drawings and specifications correctly
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                Follow exact dimensions, cable types, and termination details
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                Recognise why deviation from drawings leads to lost marks
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                Apply real-world skills of reading schematics and installation specs
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                Avoid the typical misreads that cost candidates marks
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
                <h3 className="font-semibold text-base mb-3">Essential Documentation</h3>
                <ul className="space-y-2 text-xs sm:text-sm text-foreground">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    Technical drawings and circuit diagrams
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    Installation specifications and cable schedules
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    Layout plans showing positions and dimensions
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    Material lists and component specifications
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    Installation method requirements
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-base mb-3">Essential Tools & References</h3>
                <ul className="space-y-2 text-xs sm:text-sm text-foreground">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    BS 7671 symbol reference charts
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    Measuring tools (tape measure, spirit level)
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    Marking equipment (pencil, chalk line)
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    Calculator for cable calculations
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    Magnifying glass for small detail reading
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Types of Drawings Section */}
        <Card className="bg-card border-emerald-500/30 mb-8">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-emerald-400 mb-4">
              1. Types of Drawings You'll See in AM2
            </h2>
            <div className="space-y-6 text-xs sm:text-sm text-foreground">
              <div>
                <h3 className="font-semibold text-base mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-emerald-400" />
                  Circuit Diagrams
                </h3>
                <p className="mb-2">Show electrical connections, conductor types, and protective devices.</p>
                <ul className="space-y-1 text-muted-foreground ml-4">
                  <li>• Display circuit protection (MCBs, RCDs, fuses)</li>
                  <li>• Show conductor routes and connections</li>
                  <li>• Indicate cable types and sizes</li>
                  <li>• Include earthing and bonding arrangements</li>
                  <li>• Use BS 7671 standard symbols throughout</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-base mb-2 flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-emerald-400" />
                  Layout Diagrams
                </h3>
                <p className="mb-2">Show physical positions including socket heights and trunking routes.</p>
                <ul className="space-y-1 text-muted-foreground ml-4">
                  <li>• Exact measurements for accessory positioning</li>
                  <li>• Trunking and conduit routing paths</li>
                  <li>• Clearance distances from other services</li>
                  <li>• Installation heights and depths</li>
                  <li>• Spacing between multiple accessories</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-base mb-2 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-400" />
                  Written Specifications
                </h3>
                <p className="mb-2">Detailed written instructions covering all installation requirements.</p>
                <ul className="space-y-1 text-muted-foreground ml-4">
                  <li>• Cable sizes, types, and colour requirements</li>
                  <li>• Installation methods and techniques</li>
                  <li>• Material specifications and standards</li>
                  <li>• Testing and verification requirements</li>
                  <li>• Completion and documentation standards</li>
                </ul>
              </div>
            </div>
            <InlineCheck {...quickCheckQuestions[0]} />
          </div>
        </Card>

        {/* Following Specifications Section */}
        <Card className="bg-card border-emerald-500/30 mb-8">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-emerald-400 mb-4">
              2. Following Specifications - Non-Negotiable
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-foreground">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-base mb-2">Cable Requirements</h3>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Sizes must match exactly (e.g., 2.5mm² for sockets, 4mm² for cooker)</li>
                    <li>• Cable types as specified (T&E, SWA, FP200, etc.)</li>
                    <li>• Core colours must comply with requirements</li>
                    <li>• Conductor materials (copper/aluminium) as stated</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-base mb-2">Installation Requirements</h3>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Accessories positioned exactly as per dimensions</li>
                    <li>• Conduit/trunking routes following specified runs</li>
                    <li>• Installation methods as detailed in specs</li>
                    <li>• Segregation requirements strictly observed</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30 rounded-lg">
                <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">NET Assessment Time Management</h4>
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  Allocate 15-20 minutes to thoroughly review all drawings and specifications before starting practical work. 
                  This review time prevents costly mistakes and mark deductions later in the assessment process.
                </p>
              </div>
            </div>
            <InlineCheck {...quickCheckQuestions[2]} />
          </div>
        </Card>

        {/* Common Errors Section */}
        <Card className="bg-card border-emerald-500/30 mb-8">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-emerald-400 mb-4">
              3. Common Drawing Interpretation Errors (NET Guidance)
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-foreground">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-base mb-3 text-emerald-400">Critical Errors That Cause Failure</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Misreading symbols on circuit diagrams</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Using the wrong cable size/type</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Installing in wrong position (heights/distances off spec)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Forgetting segregation between LV and ELV</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-base mb-3 text-emerald-400">Common Mark-Losing Mistakes</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Not labelling or identifying conductors</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Assuming "close enough" is acceptable</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Poor measurement and marking out</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Not cross-referencing multiple drawings</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-lg">
                <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">Real AM2 Failure Examples</h4>
                <ul className="space-y-1 text-sm text-red-700 dark:text-emerald-400">
                  <li>• Candidate installed all accessories neatly but put sockets 100mm too high - borderline fail</li>
                  <li>• Candidate used 2.5mm² for a cooker radial instead of 4mm² - failed installation section</li>
                  <li>• Mixed ELV and LV in same trunking despite specification requiring segregation - fail</li>
                  <li>• Excellent workmanship but wrong cable type used throughout - failed on compliance</li>
                </ul>
              </div>
            </div>
            <InlineCheck {...quickCheckQuestions[1]} />
          </div>
        </Card>

        {/* BS 7671 Symbol Recognition */}
        <Card className="bg-card border-emerald-500/30 mb-8">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-emerald-400 mb-4">
              4. BS 7671 Symbol Recognition Requirements
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-foreground">
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-blue-200 dark:border-blue-800/30 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Essential Symbol Categories</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700 dark:text-emerald-400">
                  <div>
                    <h5 className="font-medium mb-2">Circuit Protection</h5>
                    <ul className="space-y-1">
                      <li>• MCB (Miniature Circuit Breaker)</li>
                      <li>• RCD (Residual Current Device)</li>
                      <li>• RCBO (Combined MCB + RCD)</li>
                      <li>• Fuses (various types)</li>
                      <li>• Isolators and switches</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2">Installation Components</h5>
                    <ul className="space-y-1">
                      <li>• Socket outlets (single, double)</li>
                      <li>• Light fittings and switches</li>
                      <li>• Junction boxes and connectors</li>
                      <li>• Earth bonding points</li>
                      <li>• Cable routes and types</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-base mb-2">Symbol Fluency Requirements</h3>
                <p className="mb-2">You must be able to instantly recognise and interpret standard BS 7671 symbols without reference materials.</p>
                <ul className="space-y-1 text-muted-foreground ml-4">
                  <li>• Immediate recognition of all common electrical symbols</li>
                  <li>• Understanding symbol variations and combinations</li>
                  <li>• Ability to trace circuit paths through schematic diagrams</li>
                  <li>• Recognition of obsolete symbols that may appear in existing installations</li>
                </ul>
              </div>
            </div>
            <InlineCheck {...quickCheckQuestions[3]} />
          </div>
        </Card>

        {/* Strategies Section */}
        <Card className="bg-card border-emerald-500/30 mb-8">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-emerald-400 mb-4">
              5. Strategies to Avoid Mistakes
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-foreground">
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h3 className="font-semibold text-base mb-3">Pre-Work Review Process</h3>
                  <ol className="space-y-2 text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="bg-emerald-500 text-black px-2 py-0.5 rounded text-xs font-medium min-w-[20px] text-center">1</span>
                      <span>Read all drawings and specifications fully</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="bg-emerald-500 text-black px-2 py-0.5 rounded text-xs font-medium min-w-[20px] text-center">2</span>
                      <span>Cross-reference circuit and layout diagrams</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="bg-emerald-500 text-black px-2 py-0.5 rounded text-xs font-medium min-w-[20px] text-center">3</span>
                      <span>Note all cable sizes, types, and routes</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="bg-emerald-500 text-black px-2 py-0.5 rounded text-xs font-medium min-w-[20px] text-center">4</span>
                      <span>Identify all accessory positions and heights</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="bg-emerald-500 text-black px-2 py-0.5 rounded text-xs font-medium min-w-[20px] text-center">5</span>
                      <span>Check for segregation requirements</span>
                    </li>
                  </ol>
                </div>
                <div>
                  <h3 className="font-semibold text-base mb-3">During Installation</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      Keep specifications on hand - don't trust memory
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      Mark out positions before drilling or fixing
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      Double-check cable sizes before terminating
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      Verify measurements twice before cutting
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      Cross-check circuit connections against diagrams
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Measurement and Marking Section */}
        <Card className="bg-card border-emerald-500/30 mb-8">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-emerald-400 mb-4">
              6. Measurement and Marking Techniques
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-foreground">
              <div>
                <h3 className="font-semibold text-base mb-2">Professional Measuring Practices</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2 text-emerald-400">Accurate Measurement</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Use appropriate measuring tools for task</li>
                      <li>• Measure from fixed reference points</li>
                      <li>• Account for wall/surface variations</li>
                      <li>• Check measurements in multiple dimensions</li>
                      <li>• Allow for accessory box dimensions</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-emerald-400">Marking Procedures</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Use appropriate marking tools (pencil, chalk)</li>
                      <li>• Mark centre points and corners clearly</li>
                      <li>• Use spirit level for accurate horizontal/vertical</li>
                      <li>• Mark cable entry/exit points</li>
                      <li>• Cross-check marked positions against drawings</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4 mt-4">
                <h3 className="font-semibold text-base mb-2 text-blue-800 dark:text-blue-200 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  NET Assessment Time Management
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium text-blue-700 dark:text-emerald-400">Pre-Work Planning (15-20 minutes)</p>
                      <ul className="text-emerald-400 dark:text-emerald-400 text-xs mt-1">
                        <li>• Complete drawing review</li>
                        <li>• Material verification</li>
                        <li>• Route planning</li>
                        <li>• Critical dimension checks</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-blue-700 dark:text-emerald-400">During Installation</p>
                      <ul className="text-emerald-400 dark:text-emerald-400 text-xs mt-1">
                        <li>• Check specifications every 30 minutes</li>
                        <li>• Mark positions before fixing</li>
                        <li>• Verify before permanent connections</li>
                        <li>• Document any uncertainties</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg">
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Professional Tip</h4>
                <p className="text-sm text-green-700 dark:text-green-300">
                  "Measure twice, cut once" applies especially to AM2. Incorrect positioning due to poor measuring loses marks 
                  that cannot be recovered, even if the final installation is electrically sound and well-crafted.
                </p>
              </div>
            </div>
            <InlineCheck {...quickCheckQuestions[4]} />
          </div>
        </Card>

        {/* WHAT ASSESSORS LOOK FOR - NEW SECTION */}
        <Card className="bg-card border-emerald-500/30 mb-8">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-yellow-700 dark:text-yellow-300 mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              7. What Assessors Look For - NET Assessment Criteria
            </h2>
            
            <div className="space-y-6">
              {/* What Gets Marks */}
              <div className="bg-green-100 dark:bg-green-950/30 border border-green-300 dark:border-green-800/50 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
                  <CheckSquare className="w-4 h-4" />
                  What Gets Marks (Pass Criteria)
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-green-700 dark:text-green-300 mb-2">Specification Compliance (40% weighting)</p>
                    <ul className="space-y-1 text-green-600 dark:text-green-400 text-xs">
                      <li>• Exact cable sizes as specified</li>
                      <li>• Correct accessory positions (± 5mm tolerance)</li>
                      <li>• Proper segregation implementation</li>
                      <li>• Specified installation methods followed</li>
                      <li>• Correct protective device ratings</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-green-700 dark:text-green-300 mb-2">Professional Competency (35% weighting)</p>
                    <ul className="space-y-1 text-green-600 dark:text-green-400 text-xs">
                      <li>• Systematic verification processes</li>
                      <li>• Accurate measurement techniques</li>
                      <li>• Professional marking and positioning</li>
                      <li>• BS 7671 symbol fluency demonstration</li>
                      <li>• Clear understanding of requirements</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-green-700 dark:text-green-300 mb-2">Safety Implementation (15% weighting)</p>
                    <ul className="space-y-1 text-green-600 dark:text-green-400 text-xs">
                      <li>• Correct LV/ELV segregation</li>
                      <li>• Proper earthing arrangements</li>
                      <li>• Safe working methodology</li>
                      <li>• Risk assessment compliance</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-green-700 dark:text-green-300 mb-2">Communication (10% weighting)</p>
                    <ul className="space-y-1 text-green-600 dark:text-green-400 text-xs">
                      <li>• Professional questioning approach</li>
                      <li>• Clear understanding verification</li>
                      <li>• Appropriate clarification requests</li>
                      <li>• Confident explanation of methods</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* What Loses Marks */}
              <div className="bg-red-100 dark:bg-red-950/30 border border-red-300 dark:border-red-800/50 rounded-lg p-4">
                <h3 className="font-semibold text-red-800 dark:text-red-200 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  What Loses Marks (Deduction Criteria)
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-red-700 dark:text-emerald-400 mb-2">Minor Deductions (2-5 marks each)</p>
                    <ul className="space-y-1 text-red-600 dark:text-emerald-400 text-xs">
                      <li>• Accessory positions 10-20mm out</li>
                      <li>• Incorrect cable colour (but correct size)</li>
                      <li>• Poor measurement technique demonstration</li>
                      <li>• Inadequate verification process</li>
                      <li>• Symbol recognition hesitation</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-red-700 dark:text-emerald-400 mb-2">Major Deductions (5-10 marks each)</p>
                    <ul className="space-y-1 text-red-600 dark:text-emerald-400 text-xs">
                      <li>• Wrong cable sizes installed</li>
                      <li>• Accessories 20mm+ from specified position</li>
                      <li>• Incorrect installation method used</li>
                      <li>• Poor specification compliance</li>
                      <li>• Inadequate systematic approach</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Instant Failure */}
              <div className="bg-red-200 dark:bg-red-950/50 border-2 border-red-400 dark:border-red-700 rounded-lg p-4">
                <h3 className="font-semibold text-red-900 dark:text-red-100 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Instant Failure Scenarios
                </h3>
                <div className="space-y-2 text-sm">
                  <p className="text-red-800 dark:text-red-200 font-medium mb-2">
                    These scenarios result in immediate assessment failure regardless of other work quality:
                  </p>
                  <ul className="space-y-1 text-red-700 dark:text-emerald-400 text-xs">
                    <li>• <strong>Safety segregation violations:</strong> LV and ELV cables in same containment when specification prohibits</li>
                    <li>• <strong>Major cable size errors:</strong> Using cable insufficient for protective device rating (safety issue)</li>
                    <li>• <strong>Specification abandonment:</strong> Deciding to "improve" the design instead of following specifications</li>
                    <li>• <strong>Installation method breaches:</strong> Using methods that violate BS 7671 or specified requirements</li>
                    <li>• <strong>Protective device mismatches:</strong> Installing protection that doesn't match circuit design requirements</li>
                  </ul>
                </div>
              </div>

              {/* Assessment Focus Areas */}
              <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-3 flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Common NET Assessment Focus Areas
                </h3>
                <div className="grid md:grid-cols-3 gap-3 sm:gap-4 text-xs">
                  <div>
                    <p className="font-medium text-blue-700 dark:text-emerald-400 mb-2">Drawing Interpretation (Minutes 1-20)</p>
                    <ul className="space-y-1 text-emerald-400 dark:text-emerald-400">
                      <li>• Symbol recognition speed</li>
                      <li>• Specification understanding</li>
                      <li>• Material list accuracy</li>
                      <li>• Route planning efficiency</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-blue-700 dark:text-emerald-400 mb-2">Implementation (Minutes 20-80)</p>
                    <ul className="space-y-1 text-emerald-400 dark:text-emerald-400">
                      <li>• Measurement accuracy</li>
                      <li>• Progressive compliance checks</li>
                      <li>• Professional methodology</li>
                      <li>• Quality verification</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-blue-700 dark:text-emerald-400 mb-2">Final Verification (Minutes 80-90)</p>
                    <ul className="space-y-1 text-emerald-400 dark:text-emerald-400">
                      <li>• Complete specification check</li>
                      <li>• Documentation accuracy</li>
                      <li>• Professional presentation</li>
                      <li>• Compliance confirmation</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Recovery Strategies */}
              <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800/30 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-3 flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Assessment Recovery Strategies
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-yellow-700 dark:text-yellow-300 mb-1">If You Spot an Error:</p>
                    <ul className="space-y-1 text-emerald-400 dark:text-emerald-400 text-xs">
                      <li>• Stop immediately and assess impact</li>
                      <li>• Document the error and proposed correction</li>
                      <li>• Ask assessor for clarification if needed</li>
                      <li>• Correct professionally - don't rush the fix</li>
                      <li>• Verify correction against specification</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-yellow-700 dark:text-yellow-300 mb-1">Communication with Assessor:</p>
                    <ul className="space-y-1 text-emerald-400 dark:text-emerald-400 text-xs">
                      <li>• "I need to verify this dimension against the drawing"</li>
                      <li>• "Could you confirm the segregation requirement here?"</li>
                      <li>• "I want to double-check this cable specification"</li>
                      <li>• Professional questions demonstrate competency</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Additional InlineCheck for Assessment Understanding */}
        <InlineCheck 
          id="assessment-positioning"
          question="What happens to candidates who install accessories 30mm away from the specified position?"
          options={[
            "No problem if the installation looks professional",
            "Minor mark deduction for positioning error",
            "Major mark deduction for specification non-compliance",
            "Instant failure for not following drawings"
          ]}
          correctIndex={2}
          explanation="Installing accessories significantly away from specified positions (20mm+) results in major mark deduction for specification non-compliance, as it demonstrates failure to follow drawings accurately."
        />

        {/* Real-World Examples */}
        <Card className="bg-card border-emerald-500/30 mb-8">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-emerald-400 mb-4">
              8. Real-World Industry Examples
            </h2>
            <div className="space-y-6 text-xs sm:text-sm text-foreground">
              <div>
                <h3 className="font-semibold text-base mb-3 text-emerald-400">AM2 Assessment Failures</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-lg">
                    <h4 className="font-medium text-red-800 dark:text-red-200 mb-1">Example 1: Socket Positioning</h4>
                    <p className="text-red-700 dark:text-emerald-400">Candidate installed all accessories neatly but put sockets 100mm too high. Lost marks, borderline fail.</p>
                  </div>
                  <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-lg">
                    <h4 className="font-medium text-red-800 dark:text-red-200 mb-1">Example 2: Cable Size Error</h4>
                    <p className="text-red-700 dark:text-emerald-400">Candidate used 2.5mm² for a cooker radial instead of 4mm². Failed installation section.</p>
                  </div>
                  <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-lg">
                    <h4 className="font-medium text-red-800 dark:text-red-200 mb-1">Example 3: Segregation Violation</h4>
                    <p className="text-red-700 dark:text-emerald-400">Mixed ELV and mains in same trunking despite clear specification requiring segregation. Failed on safety compliance.</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-base mb-3 text-emerald-400">Industry Consequences</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800/30 rounded-lg">
                    <h4 className="font-medium text-orange-800 dark:text-orange-200 mb-1">Contract Breach</h4>
                    <p className="text-orange-700 dark:text-emerald-400">Electrician ignored drawings and ran trunking across a doorway. Site inspector rejected the work, leading to costly remedial work and contract penalties.</p>
                  </div>
                  <div className="p-3 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800/30 rounded-lg">
                    <h4 className="font-medium text-orange-800 dark:text-orange-200 mb-1">Compliance Failure</h4>
                    <p className="text-orange-700 dark:text-emerald-400">Installation completed to electrician's interpretation rather than specification. Failed electrical inspection and voided building regulations compliance.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Summary */}
        <Card className="bg-card border-emerald-500/30 mb-8">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-emerald-400 mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Summary
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-foreground">
              <p className="text-base font-medium">
                Working with drawings and specifications is about precision and compliance, not interpretation or improvement.
              </p>
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h3 className="font-semibold text-base mb-2">Key Points</h3>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Drawings and specs must be followed exactly</li>
                    <li>• BS 7671 symbol fluency is essential</li>
                    <li>• Measurement accuracy prevents mark loss</li>
                    <li>• Segregation requirements are non-negotiable</li>
                    <li>• Pre-work review saves costly mistakes</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-base mb-2">Mark-Losing Actions</h3>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Wrong cable sizes or types</li>
                    <li>• Incorrect accessory positioning</li>
                    <li>• Mixed voltage systems in same containment</li>
                    <li>• Poor measurement and marking</li>
                    <li>• Assuming "close enough" is acceptable</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                <h4 className="font-semibold text-emerald-400 mb-2">Golden Rule</h4>
                <p className="text-foreground">
                  Follow drawings and specifications exactly. AM2 assesses compliance and competency, not personal interpretation or design improvement.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Quiz Section */}
        <Card className="bg-card border-emerald-500/30 mb-8">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-emerald-400 mb-4">
              Test Your Knowledge
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Complete this 10-question quiz to test your understanding of working with drawings and specifications.
            </p>
            <Quiz 
              questions={quizQuestions} 
              title="Working with Drawings and Specifications Quiz"
            />
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <Link 
            to="../section2"
            className="flex items-center gap-2 px-4 py-3 bg-card border border-emerald-500/30 text-foreground rounded-lg hover:border-emerald-500/50 transition-colors text-sm font-medium w-full sm:w-auto justify-center sm:justify-start"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous: Section 2
          </Link>
          <Link 
            to="../section4"
            className="flex items-center gap-2 px-4 py-3 bg-emerald-500 text-black rounded-lg hover:bg-emerald-500/90 transition-colors text-sm font-medium w-full sm:w-auto justify-center sm:justify-start"
          >
            Next: Section 4
            <ArrowLeft className="h-4 w-4 rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AM2Module2Section3;