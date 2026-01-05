import { ArrowLeft, ArrowRight, Target, CheckCircle, AlertTriangle, Users, BookOpen, Clipboard, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import FormulaList from "@/components/apprentice-courses/FormulaList";
import useSEO from "@/hooks/useSEO";

const TITLE = "Estimating Materials from Drawings or Site Walkthroughs - Module 5.4.1 | Level 2 Electrical Course";
const DESCRIPTION = "Learn to accurately estimate materials for electrical installations using technical drawings and site walkthroughs. Master material estimation best practices.";

const quickCheckQuestions = [
  {
    id: 1,
    question: "Why is it important to allow for 5–10% wastage when estimating?",
    options: [
      "To make more profit",
      "To account for cutting waste and unexpected needs",
      "To impress clients",
      "It's not necessary"
    ],
    correctIndex: 1,
    explanation: "Wastage allowances account for cutting waste, terminations, and unexpected site requirements that weren't visible on drawings."
  },
  {
    id: 2,
    question: "Name one tool used to measure distances accurately from drawings.",
    options: [
      "Ruler",
      "Scale rule",
      "Calculator",
      "Computer"
    ],
    correctIndex: 1,
    explanation: "A scale rule is specifically designed to measure scaled distances on technical drawings accurately."
  },
  {
    id: 3,
    question: "What is the benefit of a site walkthrough compared to drawings alone?",
    options: [
      "It's faster",
      "It's cheaper",
      "Confirms actual site conditions and identifies obstacles",
      "It's not beneficial"
    ],
    correctIndex: 2,
    explanation: "Site walkthroughs reveal physical conditions, obstacles, and additional requirements not shown on drawings."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the main risk of under-estimating materials?",
    options: [
      "Higher profits",
      "Delays and project stoppages",
      "Better quality work",
      "Easier installation"
    ],
    correctAnswer: 1,
    explanation: "Under-estimating leads to material shortages, causing work stoppages and project delays."
  },
  {
    id: 2,
    question: "True or False: Drawings alone always give enough information for accurate estimating.",
    options: [
      "True",
      "False"
    ],
    correctAnswer: 1,
    explanation: "Drawings don't show all site conditions, obstacles, or practical installation challenges."
  },
  {
    id: 3,
    question: "What percentage should typically be added for wastage?",
    options: [
      "1–2%",
      "5–10%",
      "15–20%",
      "25–30%"
    ],
    correctAnswer: 1,
    explanation: "5–10% wastage allowance covers cutting waste, terminations, and minor unforeseen requirements."
  },
  {
    id: 4,
    question: "Which tool is used to measure scaled distances on drawings?",
    options: [
      "Tape measure",
      "Scale rule",
      "Calculator",
      "Spirit level"
    ],
    correctAnswer: 1,
    explanation: "A scale rule is designed specifically for measuring scaled distances on technical drawings."
  },
  {
    id: 5,
    question: "Why is it important to check site conditions during estimation?",
    options: [
      "To meet clients",
      "To identify obstacles and additional material needs",
      "To take photos",
      "To check weather"
    ],
    correctAnswer: 1,
    explanation: "Site conditions reveal obstacles, existing services, and additional requirements not shown on drawings."
  },
  {
    id: 6,
    question: "Name one common error in estimating cable lengths.",
    options: [
      "Using the wrong cable type",
      "Forgetting vertical drops or rises",
      "Ordering too much",
      "Using wrong colours"
    ],
    correctAnswer: 1,
    explanation: "Vertical drops, rises, and routing around obstacles are commonly forgotten when measuring from plan views."
  },
  {
    id: 7,
    question: "What should you always include besides cables and containment?",
    options: [
      "Tools",
      "Fixings, clips, grommets, and small consumables",
      "Spare parts",
      "Test equipment"
    ],
    correctAnswer: 1,
    explanation: "Small items like fixings, clips, and grommets are essential but easily forgotten in estimates."
  },
  {
    id: 8,
    question: "Who should verify the materials estimate for accuracy?",
    options: [
      "The client",
      "Team members or supervisors",
      "The supplier",
      "Nobody"
    ],
    correctAnswer: 1,
    explanation: "Peer review by team members or supervisors helps catch errors and improve accuracy."
  },
  {
    id: 9,
    question: "What is a benefit of using digital estimating software?",
    options: [
      "It's free",
      "Faster calculations and fewer manual errors",
      "It works offline",
      "It's easier to learn"
    ],
    correctAnswer: 1,
    explanation: "Digital software speeds up calculations and reduces manual measuring errors, though site verification is still needed."
  },
  {
    id: 10,
    question: "Give one example of a consequence of poor estimating.",
    options: [
      "Better quality work",
      "Cost overruns, wasted materials, or delayed project completion",
      "Improved efficiency",
      "Higher customer satisfaction"
    ],
    correctAnswer: 1,
    explanation: "Poor estimating leads to shortages, excess materials, cost overruns, and project delays."
  }
];

const practicalGuidance = [
  "Step 1: Thoroughly review all electrical drawings including layout plans, sections, elevations, and electrical schedules. Highlight key circuits, containment runs, accessories, and any special requirements.",
  "Step 2: Conduct a comprehensive site walkthrough with drawings in hand. Take measurements, photographs, and detailed notes of actual conditions, obstacles, and access routes.",
  "Step 3: Calculate material needs systematically using appropriate tools (scale rules for drawings, tape measures/laser measures on site). Break down estimates by circuit and installation area.",
  "Step 4: Apply realistic allowances for wastage (5-10%) and unforeseen site issues. Consider project complexity, installation method, and site access when determining allowances.",
  "Step 5: Create detailed, organised materials lists categorised by type (cables, containment, accessories, fixings). Include part numbers, specifications, and delivery requirements.",
  "Step 6: Cross-check estimates with experienced team members or supervisors. Use peer review to catch potential errors and improve accuracy.",
  "Step 7: Factor in delivery lead times and potential material availability issues when finalising order quantities and timing."
];

const pocketGuideItems = [
  "Review all electrical drawings thoroughly - plans, sections, schedules.",
  "Conduct site walkthrough with drawings - confirm actual conditions.",
  "Use appropriate measurement tools - scale rules, tape measures, laser measures.",
  "Add realistic wastage allowances - typically 5-10% depending on complexity.",
  "Include all consumables - fixings, clips, grommets, cable ties, markers.",
  "Document special requirements - fire barriers, specialist fixings, access issues.",
  "Cross-check estimates with experienced colleagues before finalising.",
  "Consider delivery times and material availability in planning.",
  "Keep detailed records for future reference and continuous improvement."
];

const Module5Section4_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  const faqs = [
    {
      question: "Should I always do both a drawing estimate and a site walkthrough?",
      answer: "Absolutely yes. Drawings provide scale, layout, and specified requirements, while site walkthroughs reveal actual physical conditions, obstacles, and practical installation challenges. This combination typically improves estimate accuracy by 15-25%."
    },
    {
      question: "How do I estimate cable ties, clips, and fixings accurately?",
      answer: "Use standard spacing rules: cable clips every 300mm for T&E cables on walls, 400mm for SWA cables, 600mm for cable trays. Check BS 7671 for specific requirements. Different surfaces (masonry, plasterboard, steel) require different fixing types and quantities."
    },
    {
      question: "Can digital software help with material estimation?",
      answer: "Yes, digital take-off software like Planswift or Bluebeam significantly speeds up calculations and reduces manual measuring errors. However, always verify critical measurements on-site and cross-check software outputs for accuracy."
    },
    {
      question: "What's the biggest mistake electricians make when estimating?",
      answer: "Forgetting vertical cable runs and underestimating small consumables. Plan views don't always show floor-to-ceiling heights clearly, and items like grommets, cable ties, and additional fixings are easily overlooked but essential for proper installation."
    },
    {
      question: "How do I handle estimates for refurbishment work?",
      answer: "Refurbishments require extra caution. Allow 15-20% wastage instead of 5-10%, as existing buildings often have unexpected obstacles, asbestos issues, and structural complications not shown on drawings. Always inspect thoroughly before estimating."
    },
    {
      question: "Should I include spare materials in my estimates?",
      answer: "For large projects, include 2-5% spare cable and key accessories for future maintenance and minor modifications. This is separate from wastage allowances and should be clearly itemised for the client."
    },
    {
      question: "How accurate should my estimates be?",
      answer: "Professional estimates should be within 5% of actual requirements for straightforward installations, 10% for complex projects. Higher variance suggests inadequate site survey or calculation errors."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top header bar */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 4
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-card">
              <Package className="w-6 h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
              Section 5.4.1
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            Estimating Materials from Drawings or Site Walkthroughs
          </h1>
          <p className="text-muted-foreground">
            Learn to accurately estimate materials for electrical installations using technical drawings and site surveys.
          </p>
        </header>

        {/* Spot it in 30 Seconds Card */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-6 h-6 text-foreground" />
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Introduction</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Always combine drawing estimates with site walkthroughs.</li>
                <li>Add 5–10% wastage allowance for cutting and errors.</li>
                <li>Use scale rules for accurate measurement from drawings.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Overlooked vertical runs or obstacles on plans.</li>
                <li><strong>Use:</strong> Material take-off sheets, scale rules, measuring wheels.</li>
                <li><strong>Check:</strong> All consumables and fixings included in estimate.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <p className="text-base text-foreground mb-4">
            Accurate estimation of materials is critical in electrical installation projects. Whether using technical drawings or conducting on-site walkthroughs, estimating ensures you have the right amount of cables, containment, accessories, and consumables. Poor estimating can lead to delays, shortages, overspending, or wasted resources.
          </p>
          
          <div className="rounded-lg p-4 bg-emerald-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 mt-4">
            <div className="flex items-start gap-3">
              <Package className="w-5 h-5 text-emerald-400 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-blue-700 dark:text-emerald-400 mb-2">Why This Matters</p>
                <p className="text-xs sm:text-sm text-foreground">
                  Accurate material estimation in electrical projects reduces waste by up to 30% and prevents costly delays that can impact entire construction schedules.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 space-y-3">
            <p className="text-base text-foreground">
              <strong>Real Impact:</strong> Projects with accurate material estimates show 40% fewer emergency orders and improved project profitability compared to poorly estimated installations.
            </p>
            
            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded border border-emerald-200 dark:border-emerald-800">
              <p className="text-xs sm:text-sm text-foreground">
                <strong>Industry Standard:</strong> BS 7671 requires proper planning and adequate materials to ensure safe and compliant electrical installations.
              </p>
            </div>
          </div>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning Outcomes</h2>
          <p className="text-muted-foreground mb-4">By the end of this subsection, you will be able to:</p>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Drawing Interpretation Skills</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2 font-bold">•</span>
                  Read and interpret electrical layout drawings, sections, and elevations
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2 font-bold">•</span>
                  Use scale rules to measure distances accurately from 1:50, 1:100 drawings
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2 font-bold">•</span>
                  Extract material specifications from electrical schedules and legends
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2 font-bold">•</span>
                  Identify all circuit routes, containment paths, and equipment positions
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Site Assessment Skills</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2 font-bold">•</span>
                  Conduct thorough site walkthroughs to verify drawing accuracy
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2 font-bold">•</span>
                  Identify physical obstacles, structural constraints, and access issues
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2 font-bold">•</span>
                  Measure actual distances using tape measures and laser measures
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2 font-bold">•</span>
                  Document site conditions and additional material requirements
                </li>
              </ul>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Calculation & Planning</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2 font-bold">•</span>
                  Calculate cable lengths including vertical drops and containment routing
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2 font-bold">•</span>
                  Estimate containment quantities (trunking, conduit, cable tray)
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2 font-bold">•</span>
                  Apply appropriate wastage factors (5-10%) for different installation types
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2 font-bold">•</span>
                  Account for fixings, clips, and consumables using industry standards
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Professional Practice</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2 font-bold">•</span>
                  Recognise risks and consequences of under- or over-ordering materials
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2 font-bold">•</span>
                  Create clear, organised material lists for procurement and installation
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2 font-bold">•</span>
                  Implement quality control checks and peer review processes
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2 font-bold">•</span>
                  Apply BS 7671 requirements for proper planning and material selection
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Content / Learning */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Content / Learning</h2>

          {/* Importance of Accurate Estimation */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">1. Importance of Accurate Estimation</h3>
            <p className="text-base text-foreground mb-4">
              Accurate material estimation is the foundation of successful electrical installations:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-3">Project Success Benefits</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Key benefits:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li>Ensures work completion without delays</li>
                          <li>Prevents over-purchasing and material waste</li>
                          <li>Supports accurate pricing for projects and quotations</li>
                          <li>Maintains professional reputation and client trust</li>
                        </ul>
                      </div>

                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded border border-green-200 dark:border-green-800">
                        <p className="font-medium text-green-700 dark:text-green-400 mb-2">Professional Impact</p>
                        <p className="text-xs sm:text-sm text-foreground">
                          Accurate estimation demonstrates competence and builds long-term client relationships.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Estimation from Drawings */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">2. Estimation from Drawings</h3>
            <p className="text-base text-foreground mb-4">
              Technical drawings provide the foundation for material calculations:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-3">Drawing Analysis Process</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Key steps:</strong></p>
                        <div className="bg-background/50 p-3 rounded border mb-2">
                          <ul className="list-disc ml-4 space-y-1 text-xs sm:text-sm text-foreground">
                            <li><strong>Review drawings</strong> - layouts, schedules, specifications</li>
                            <li><strong>Identify routes</strong> - cable runs, containment paths, accessories</li>
                            <li><strong>Use scale rules</strong> - measure distances accurately (1:50, 1:100 scales)</li>
                            <li><strong>Apply calculations</strong> - diversity factors and load requirements</li>
                            <li><strong>Allow wastage</strong> - typically 5–10% depending on project complexity</li>
                          </ul>
                        </div>
                        
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded border border-yellow-200 dark:border-yellow-800 mt-3">
                          <p className="font-medium text-yellow-700 dark:text-emerald-400 mb-2">Common Drawing Scales</p>
                          <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm text-foreground">
                            <div>
                              <p><strong>Plans:</strong> 1:50 or 1:100</p>
                              <p><strong>Details:</strong> 1:20 or 1:25</p>
                            </div>
                            <div>
                              <p><strong>Sections:</strong> 1:50</p>
                              <p><strong>Elevations:</strong> 1:100</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Essential Drawing Elements:</strong></p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-background/50 p-3 rounded border">
                            <p className="font-medium mb-2">Circuit Information</p>
                            <ul className="text-xs sm:text-sm text-foreground list-disc ml-4 space-y-1">
                              <li>Circuit reference numbers</li>
                              <li>Cable types and sizes</li>
                              <li>Protective device ratings</li>
                              <li>Load ratings and diversity</li>
                            </ul>
                          </div>
                          <div className="bg-background/50 p-3 rounded border">
                            <p className="font-medium mb-2">Physical Layout</p>
                            <ul className="text-xs sm:text-sm text-foreground list-disc ml-4 space-y-1">
                              <li>Equipment positions</li>
                              <li>Containment routes</li>
                              <li>Floor levels and heights</li>
                              <li>Building structure details</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Measurement Techniques:</strong></p>
                        <div className="bg-emerald-50 dark:bg-blue-900/20 p-3 rounded border border-blue-200 dark:border-blue-800">
                          <ul className="text-xs sm:text-sm text-foreground list-disc ml-4 space-y-1">
                            <li><strong>Horizontal runs:</strong> Use plan views and scale rules</li>
                            <li><strong>Vertical runs:</strong> Check sections and elevations for heights</li>
                            <li><strong>Cable trays:</strong> Measure all changes in direction and levels</li>
                            <li><strong>Containment:</strong> Include all bends, tees, and reducers</li>
                            <li><strong>Accessories:</strong> Count outlets, switches, and junction boxes</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="drawings-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
          <Separator className="my-6" />

          {/* Site Walkthroughs */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">3. Site Walkthroughs</h3>
            <p className="text-base text-foreground mb-4">
              Physical site verification ensures estimates match real conditions and reveals information that drawings cannot show:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-amber-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-amber-600 dark:text-amber-400 mb-3">Site Verification Process</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Essential site inspection steps:</strong></p>
                        <div className="bg-background/50 p-3 rounded border mb-3">
                          <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                            <li><strong>Access verification:</strong> Check route accessibility for installation</li>
                            <li><strong>Structural obstacles:</strong> Identify beams, existing services, HVAC systems</li>
                            <li><strong>Floor-to-ceiling heights:</strong> Measure actual dimensions for vertical runs</li>
                            <li><strong>Wall construction:</strong> Determine fixing requirements (masonry, plasterboard, steel)</li>
                            <li><strong>Existing services:</strong> Note other trades' installations that may affect routes</li>
                            <li><strong>Fire stopping:</strong> Identify compartment walls requiring special penetrations</li>
                          </ul>
                        </div>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Common site discoveries:</strong></p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded border border-red-200 dark:border-red-800">
                            <p className="font-medium text-red-700 dark:text-emerald-400 mb-2">Potential Issues</p>
                            <ul className="text-xs sm:text-sm text-foreground list-disc ml-4 space-y-1">
                              <li>Congested ceiling voids</li>
                              <li>Asbestos-containing materials</li>
                              <li>Narrow access routes</li>
                              <li>Live electrical systems nearby</li>
                              <li>Water pipes in cable routes</li>
                            </ul>
                          </div>
                          <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded border border-green-200 dark:border-green-800">
                            <p className="font-medium text-green-700 dark:text-green-400 mb-2">Additional Requirements</p>
                            <ul className="text-xs sm:text-sm text-foreground list-disc ml-4 space-y-1">
                              <li>Extra containment supports</li>
                              <li>Specialist fixings for surfaces</li>
                              <li>Longer cable runs than planned</li>
                              <li>Additional junction boxes</li>
                              <li>Fire barrier materials</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Documentation during site visit:</strong></p>
                        <div className="bg-emerald-50 dark:bg-blue-900/20 p-3 rounded border border-blue-200 dark:border-blue-800">
                          <ul className="text-xs sm:text-sm text-foreground list-disc ml-4 space-y-1">
                            <li><strong>Photographs:</strong> Take photos of complex routing areas and obstacles</li>
                            <li><strong>Measurements:</strong> Record actual distances, especially vertical drops</li>
                            <li><strong>Notes:</strong> Document special requirements and material modifications</li>
                            <li><strong>Sketches:</strong> Draw alternative routes if necessary</li>
                            <li><strong>Coordination:</strong> Note other trades' work that affects installation</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded border border-orange-200 dark:border-orange-800">
                        <p className="font-medium text-orange-700 dark:text-emerald-400 mb-2">Professional Tip</p>
                        <p className="text-xs sm:text-sm text-foreground">
                          Site conditions often differ from drawings by 10-20%—this is why experienced electricians never rely on drawings alone for material estimates.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="walkthrough-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
          <Separator className="my-6" />

          {/* Worked Examples */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">4. Worked Examples</h3>
            <p className="text-base text-foreground mb-4">
              Practical estimation calculations for common scenarios:
            </p>
            
            <FormulaList 
              items={[
                {
                  text: "Cable Length with Wastage: Total Length = Measured Length × 1.1 (10% wastage)"
                },
                {
                  text: "Conduit Fixings: Clips Required = (Cable Length ÷ 300mm) + 1"
                },
                {
                  text: "Trunking Couplers: Couplers = (Total Length ÷ 3m) - 1"
                }
              ]}
            />
          </section>

          {/* Materials Take-off Checklist */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">5. Materials Take-off Checklist</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-emerald-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-blue-700 dark:text-emerald-400 mb-2">Primary Materials</h4>
                <ul className="text-xs sm:text-sm text-foreground space-y-1">
                  <li>• Cables (all types and sizes)</li>
                  <li>• Containment (conduit, trunking, cable tray)</li>
                  <li>• Distribution boards and enclosures</li>
                  <li>• Accessories (sockets, switches, lights)</li>
                </ul>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Consumables</h4>
                <ul className="text-xs sm:text-sm text-foreground space-y-1">
                  <li>• Fixings and clips</li>
                  <li>• Grommets and bushes</li>
                  <li>• Cable ties and markers</li>
                  <li>• Couplers and adaptors</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            id="wastage-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Practical Guidance</h2>
          <div className="space-y-3">
            {practicalGuidance.map((item, index) => (
              <div key={index} className="flex items-start">
                <span className="text-emerald-400 mr-3 font-semibold">{index + 1}.</span>
                <span className="text-muted-foreground">{item.replace(/^Step \d+:\s*/, '')}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Real World Example */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Real World Example</h2>
          
          <div className="space-y-4">
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
              <h3 className="font-semibold text-red-700 dark:text-emerald-400 mb-2">Case Study: School Refurbishment Gone Wrong</h3>
              <p className="text-muted-foreground leading-relaxed mb-3">
                An experienced electrical contractor estimated a school refurbishment project based solely on architectural drawings. The drawings showed clear ceiling spaces and straightforward cable routes. The estimate included standard 5% wastage allowance.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-3">
                <strong>Reality on site:</strong> The existing building had extensive asbestos ceiling tiles, congested service voids with large HVAC ducts, and structural steelwork not shown on drawings. Cable routes had to be completely re-planned, requiring 40% more cable length and additional containment.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>Consequences:</strong> 15% material shortfall, two-week project delay, emergency delivery costs, and strained client relationship. Total additional cost exceeded £8,000 on a £45,000 project.
              </p>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <h3 className="font-semibold text-green-700 dark:text-green-400 mb-2">How This Could Have Been Prevented</h3>
              <ul className="text-muted-foreground list-disc ml-4 space-y-1">
                <li>Comprehensive site survey before estimating</li>
                <li>Asbestos survey review (standard for buildings pre-1980)</li>
                <li>Ceiling void inspection using access hatches</li>
                <li>15-20% wastage allowance for refurbishment work</li>
                <li>Contingency allowance for unforeseen complications</li>
                <li>Early liaison with other trades about service routes</li>
              </ul>
            </div>
            
            <div className="bg-emerald-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-muted-foreground leading-relaxed">
                <strong>Lesson learned:</strong> This contractor now allocates a full day for site surveys on refurbishment projects and has never had a major material shortage since. The initial time investment saves significant costs and maintains professional reputation.
              </p>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index}>
                <h3 className="font-semibold text-foreground mb-2">Q: {faq.question}</h3>
                <p className="text-muted-foreground">A: {faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Pocket Guide */}
        <Card className="mb-8 p-6 bg-gradient-to-r from-elec-blue to-emerald-600 text-white">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Pocket Guide – Estimating Materials</h2>
          <div className="space-y-2">
            {pocketGuideItems.map((item, index) => (
              <div key={index} className="flex items-start">
                <span className="text-emerald-400 mr-2">✅</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Recap</h2>
          
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              In this comprehensive subsection, you have mastered the critical skill of accurate material estimation for electrical installations. This fundamental competency directly impacts project success, profitability, and professional reputation.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-emerald-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-blue-700 dark:text-emerald-400 mb-2">Key Skills Acquired</h4>
                <ul className="text-sm text-muted-foreground list-disc ml-4 space-y-1">
                  <li>Reading and interpreting electrical drawings and specifications</li>
                  <li>Using scale rules and measurement tools accurately</li>
                  <li>Conducting systematic site surveys and documentation</li>
                  <li>Applying appropriate wastage factors and allowances</li>
                  <li>Creating organised, detailed material lists</li>
                </ul>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Professional Benefits</h4>
                <ul className="text-sm text-muted-foreground list-disc ml-4 space-y-1">
                  <li>Reduced project delays and cost overruns</li>
                  <li>Improved client satisfaction and repeat business</li>
                  <li>Enhanced professional reputation and competence</li>
                  <li>Better project planning and resource management</li>
                  <li>Compliance with BS 7671 planning requirements</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
              <p className="text-muted-foreground leading-relaxed">
                <strong>Remember:</strong> Accurate estimation is both an art and a science—combining technical measurement skills with practical experience and site awareness. Every project teaches valuable lessons that improve future estimates.
              </p>
            </div>
          </div>
        </Card>

        {/* Quiz */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <Quiz 
            questions={quizQuestions}
            title="Module 5 Section 4.1 - Estimating Materials Quiz"
          />
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button variant="outline" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Section 4 Overview
            </Link>
          </Button>
          <Button asChild>
            <Link to="module5-section4/2">
              Next: Subsection 2
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module5Section4_1;