import { ArrowLeft, ArrowRight, Target, CheckCircle, AlertTriangle, Users, BookOpen, Clipboard, Recycle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import FormulaList from "@/components/apprentice-courses/FormulaList";
import useSEO from "@/hooks/useSEO";

const TITLE = "Managing Wastage and Shortages - Module 5.4.4 | Level 2 Electrical Course";
const DESCRIPTION = "Master material management strategies to minimise wastage, prevent shortages, and promote sustainable practices in electrical installations.";

const quickCheckQuestions = [
  {
    id: 1,
    question: "Name one common cause of material wastage.",
    options: [
      "Accurate measuring",
      "Poor storage conditions",
      "Proper planning",
      "Correct handling"
    ],
    correctIndex: 1,
    explanation: "Poor storage conditions, such as damp storage damaging cables, is a major cause of material wastage."
  },
  {
    id: 2,
    question: "What is one cause of material shortages?",
    options: [
      "Over-ordering materials",
      "Underestimating requirements",
      "Proper stock control",
      "Accurate planning"
    ],
    correctIndex: 1,
    explanation: "Underestimating material requirements during the planning stage is a common cause of shortages."
  },
  {
    id: 3,
    question: "What is one effect of material wastage and shortages?",
    options: [
      "Improved efficiency",
      "Cost savings",
      "Increased project costs",
      "Better sustainability"
    ],
    correctIndex: 2,
    explanation: "Both wastage and shortages lead to increased project costs through waste or delays requiring emergency procurement."
  },
  {
    id: 4,
    question: "Name one strategy to reduce material wastage.",
    options: [
      "Order extra materials",
      "Store materials outside",
      "Measure and cut carefully",
      "Use damaged materials"
    ],
    correctIndex: 2,
    explanation: "Measuring and cutting carefully prevents wastage from cutting errors and ensures materials are used efficiently."
  },
  {
    id: 5,
    question: "What is one strategy to prevent shortages?",
    options: [
      "Underestimate requirements",
      "Keep a stock log updated daily",
      "Avoid supplier coordination",
      "Use materials immediately"
    ],
    correctIndex: 1,
    explanation: "Keeping a daily updated stock log helps track material levels and prevents unexpected shortages."
  },
  {
    id: 6,
    question: "Give one example of sustainable practice.",
    options: [
      "Throwing away offcuts",
      "Over-ordering materials",
      "Recycling cable offcuts",
      "Using damaged materials"
    ],
    correctIndex: 2,
    explanation: "Recycling cable offcuts and metal trunking reduces environmental impact and supports sustainable practices."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Give one example of a cause of wastage.",
    options: [
      "Accurate planning",
      "Incorrect cutting",
      "Proper storage",
      "Good coordination"
    ],
    correctAnswer: 1,
    explanation: "Incorrect cutting due to measuring errors is a common cause of material wastage."
  },
  {
    id: 2,
    question: "What is one cause of shortages?",
    options: [
      "Over-ordering",
      "Underestimating requirements",
      "Proper planning",
      "Accurate measuring"
    ],
    correctAnswer: 1,
    explanation: "Underestimating material requirements during planning leads to shortages during installation."
  },
  {
    id: 3,
    question: "True or False: Using damaged materials is acceptable if only minor.",
    options: [
      "True - minor damage doesn't matter",
      "False - safety must never be compromised"
    ],
    correctAnswer: 1,
    explanation: "Using damaged materials creates safety risks and can lead to installation failures. Safety always comes first."
  },
  {
    id: 4,
    question: "Name one effect of material wastage.",
    options: [
      "Cost savings",
      "Increased costs",
      "Improved efficiency",
      "Better sustainability"
    ],
    correctAnswer: 1,
    explanation: "Material wastage directly increases project costs through purchasing replacement materials."
  },
  {
    id: 5,
    question: "Why should offcuts be reused where possible?",
    options: [
      "To save storage space",
      "To reduce waste and save costs",
      "To impress clients",
      "To finish projects faster"
    ],
    correctAnswer: 1,
    explanation: "Reusing suitable offcuts reduces waste and saves costs by maximizing material utilization."
  },
  {
    id: 6,
    question: "What should a stock log be used for?",
    options: [
      "Recording worker hours",
      "Monitoring and updating material levels daily",
      "Planning work schedules",
      "Tracking tool usage"
    ],
    correctAnswer: 1,
    explanation: "A stock log tracks material levels daily to prevent shortages and manage inventory effectively."
  },
  {
    id: 7,
    question: "What type of area should materials be stored in?",
    options: [
      "Open outdoor areas",
      "Dry, secure, ventilated storage",
      "Damp basements",
      "Temporary locations"
    ],
    correctAnswer: 1,
    explanation: "Materials must be stored in dry, secure, ventilated areas to prevent damage and theft."
  },
  {
    id: 8,
    question: "What is a benefit of holding buffer stock?",
    options: [
      "Increases storage costs",
      "Prevents delays if deliveries are late",
      "Creates more waste",
      "Complicates inventory"
    ],
    correctAnswer: 1,
    explanation: "Buffer stock prevents work delays when deliveries are late or unexpected requirements arise."
  },
  {
    id: 9,
    question: "Give one sustainable practice to reduce waste.",
    options: [
      "Disposing of all offcuts",
      "Recycling cable offcuts",
      "Over-ordering materials",
      "Using damaged materials"
    ],
    correctAnswer: 1,
    explanation: "Recycling cable offcuts and metal components reduces environmental impact and supports sustainability."
  },
  {
    id: 10,
    question: "Who should be informed immediately if shortages occur?",
    options: [
      "The client",
      "The site supervisor or project manager",
      "The suppliers",
      "Other trades"
    ],
    correctAnswer: 1,
    explanation: "The site supervisor or project manager must be informed immediately to coordinate solutions and minimize delays."
  }
];

const practicalGuidance = [
  "Step 1: Check site drawings carefully to order correct quantities and specifications. Include allowances for testing and commissioning but avoid excessive over-ordering that creates waste.",
  "Step 2: Store materials safely on pallets, racks, or in lockable stores with proper environmental protection. Ensure dry, ventilated conditions and security from theft.",
  "Step 3: Keep a stock sheet updated daily with deliveries, usage, and remaining quantities. Use digital systems where possible for real-time tracking across the project team.",
  "Step 4: Train team members to cut and measure accurately using proper techniques and tools. Implement quality checks before cutting to prevent costly errors.",
  "Step 5: Recycle or return unused items instead of discarding them. Establish relationships with suppliers for returns and local recycling facilities for sustainable disposal.",
  "Step 6: Implement buffer stock strategies for critical items whilst maintaining lean inventory principles. Balance shortage prevention with waste minimisation through careful planning.",
  "Step 7: Monitor and analyse wastage patterns to identify improvement opportunities. Use data to refine ordering processes and reduce future waste through continuous improvement."
];

const pocketGuideItems = [
  "Order accurately based on drawings - include reasonable allowances but avoid over-ordering.",
  "Store materials properly and securely in dry, ventilated, and protected locations.",
  "Keep a daily stock log updated with deliveries, usage, and current levels.",
  "Reuse and recycle where possible - offcuts, packaging, and unused materials.",
  "Hold buffer stock of key items to prevent delays from late deliveries.",
  "Train staff in accurate measuring and cutting techniques to prevent waste.",
  "Coordinate with suppliers on lead times and delivery schedules.",
  "Inspect deliveries immediately and report any damage or shortages.",
  "Use damaged materials only if safe and suitable - never compromise safety.",
  "Monitor wastage patterns and implement continuous improvement measures."
];

const Module5Section4_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  const faqs = [
    {
      question: "Can offcuts of cable always be reused?",
      answer: "Only if they meet the length and safety requirements for the specific circuit. Cable offcuts must be long enough for the application, undamaged, and suitable for the intended use. Never compromise on safety requirements to reuse materials."
    },
    {
      question: "What should be done if material shortages cause delays?",
      answer: "Notify the supervisor immediately and re-plan tasks until delivery arrives. Document the delay, arrange emergency procurement if possible, and reorganise work to maintain productivity where materials are available."
    },
    {
      question: "Is it cheaper to order extra materials 'just in case'?",
      answer: "No, over-ordering creates waste and locks up budget unnecessarily. Better to order accurately with small allowances and maintain good supplier relationships for quick top-up deliveries when needed."
    },
    {
      question: "How much buffer stock should be maintained?",
      answer: "Typically 5-10% for critical items, depending on delivery lead times and project duration. Consider factors like supplier reliability, storage capacity, and cost of shortages when determining buffer levels."
    },
    {
      question: "What's the best way to prevent theft of materials?",
      answer: "Use lockable storage containers, implement sign-in/out systems, maintain security lighting, and position valuable materials in secure areas. Consider insurance implications and site security measures."
    },
    {
      question: "How should damaged materials be handled?",
      answer: "Quarantine damaged materials immediately, assess if they can be safely used for non-critical applications, document the damage for insurance claims, and dispose of unsafe materials through proper channels."
    },
    {
      question: "What environmental regulations apply to waste disposal?",
      answer: "Follow local waste regulations for electrical materials, separate metals for recycling, dispose of hazardous materials through licensed contractors, and maintain waste transfer documentation as required."
    },
    {
      question: "How can digital tools help with material management?",
      answer: "Use barcode scanning for stock control, digital inventory systems for real-time tracking, mobile apps for site updates, and integration with supplier systems for automated reordering and delivery scheduling."
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
              <Recycle className="w-6 h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
              Section 5.4.4
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            Managing Wastage and Shortages
          </h1>
          <p className="text-muted-foreground">
            Master material management strategies to minimise wastage, prevent shortages, and promote sustainable practices in electrical installations.
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
                <li>Plan accurately to prevent both wastage and shortages.</li>
                <li>Store materials properly to prevent damage and loss.</li>
                <li>Monitor stock levels daily and implement sustainable practices.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Over-ordering, poor storage, or material shortages affecting work.</li>
                <li><strong>Use:</strong> Stock logs, proper storage systems, and waste reduction strategies.</li>
                <li><strong>Check:</strong> Material condition, stock levels, and sustainability practices.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning Outcomes</h2>
          <p className="text-muted-foreground mb-4">By the end of this subsection, you will be able to:</p>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Wastage Management</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2 font-bold">•</span>
                  Identify causes of material wastage in electrical installation
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2 font-bold">•</span>
                  Apply strategies to minimise wastage through proper planning and handling
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2 font-bold">•</span>
                  Promote sustainable working practices in electrical installation
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Shortage Prevention</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2 font-bold">•</span>
                  Recognise the impact of shortages on project timelines and budgets
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2 font-bold">•</span>
                  Implement systems for monitoring and managing stock
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2 font-bold">•</span>
                  Coordinate with suppliers to prevent delivery delays
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded border border-amber-200 dark:border-amber-800">
            <p className="text-xs sm:text-sm text-foreground">
              <strong>Impact on Business:</strong> Effective material management reduces project costs by 10-15% and improves sustainability through waste reduction and recycling practices.
            </p>
          </div>
        </Card>

        {/* Learning Point 1: Causes of Wastage */}
        <Card className="mb-6 p-6 bg-card border-border/20">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-6 h-6 text-emerald-400" />
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Learning Point 1: Causes of Wastage</h2>
          </div>
          
          <p className="text-base text-foreground mb-4">
            Material wastage is a significant cost driver in electrical projects. Understanding the common causes helps implement effective prevention strategies and maintain project profitability.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Common Wastage Causes</h3>
              
              <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <p className="font-medium text-red-700 dark:text-emerald-400 mb-2">Over-ordering Materials</p>
                <p className="text-xs sm:text-sm text-foreground mb-2">
                  Ordering excessive quantities due to poor planning or fear of shortages.
                </p>
                <ul className="text-xs sm:text-sm text-foreground list-disc pl-4">
                  <li>Inaccurate quantity calculations</li>
                  <li>Excessive safety margins</li>
                  <li>Poor communication with planning team</li>
                </ul>
              </div>
              
              <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
                <p className="font-medium text-orange-700 dark:text-emerald-400 mb-2">Poor Storage Conditions</p>
                <p className="text-xs sm:text-sm text-foreground mb-2">
                  Improper storage leading to material damage and deterioration.
                </p>
                <ul className="text-xs sm:text-sm text-foreground list-disc pl-4">
                  <li>Damp conditions damaging cables</li>
                  <li>UV exposure degrading materials</li>
                  <li>Physical damage from poor handling</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Installation Errors</h3>
              
              <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                <p className="font-medium text-amber-700 dark:text-amber-400 mb-2">Measuring and Cutting Errors</p>
                <ul className="text-xs sm:text-sm text-foreground list-disc pl-4 space-y-1">
                  <li>Incorrect measurements leading to unusable pieces</li>
                  <li>Poor cutting techniques causing damage</li>
                  <li>Not allowing for termination lengths</li>
                  <li>Calculation errors in cable runs</li>
                </ul>
              </div>
              
              <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                <p className="font-medium text-purple-700 dark:text-emerald-400 mb-2">Transport and Handling</p>
                <ul className="text-xs sm:text-sm text-foreground list-disc pl-4 space-y-1">
                  <li>Damage during site transport</li>
                  <li>Improper lifting and moving techniques</li>
                  <li>Inadequate protection during installation</li>
                  <li>Weather exposure during work</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-emerald-50 dark:bg-blue-900/20 p-4 rounded border border-blue-200 dark:border-blue-800">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-emerald-400 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-blue-700 dark:text-emerald-400 mb-2">Cost Impact</p>
                <p className="text-xs sm:text-sm text-foreground">
                  Material wastage typically accounts for 5-10% of total project costs. Effective management can reduce this to 2-3%, providing significant savings on larger projects.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Check for Learning Point 1 */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Check - Causes of Wastage</h3>
            <InlineCheck
              id="wastage-causes-check"
              question={quickCheckQuestions[0].question}
              options={quickCheckQuestions[0].options}
              correctIndex={quickCheckQuestions[0].correctIndex}
              explanation={quickCheckQuestions[0].explanation}
            />
          </div>
        </Card>

        {/* Learning Point 2: Causes of Shortages */}
        <Card className="mb-6 p-6 bg-card border-border/20">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-6 h-6 text-emerald-400" />
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Learning Point 2: Causes of Shortages</h2>
          </div>
          
          <p className="text-base text-foreground mb-4">
            Material shortages can halt work completely, causing costly delays and affecting project schedules. Understanding shortage causes enables better planning and prevention strategies.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Planning Issues</h3>
              
              <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <p className="font-medium text-red-700 dark:text-emerald-400 mb-2">Underestimating Requirements</p>
                <p className="text-xs sm:text-sm text-foreground mb-2">
                  Insufficient material orders due to poor planning or calculation errors.
                </p>
                <ul className="text-xs sm:text-sm text-foreground list-disc pl-4">
                  <li>Incomplete drawing reviews</li>
                  <li>Missing allowances for testing</li>
                  <li>Underestimating cable routes</li>
                  <li>Not accounting for waste factors</li>
                </ul>
              </div>
              
              <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
                <p className="font-medium text-orange-700 dark:text-emerald-400 mb-2">Communication Failures</p>
                <p className="text-xs sm:text-sm text-foreground mb-2">
                  Poor coordination between teams leading to missed requirements.
                </p>
                <ul className="text-xs sm:text-sm text-foreground list-disc pl-4">
                  <li>Site team and stores miscommunication</li>
                  <li>Design changes not communicated</li>
                  <li>Delivery schedule conflicts</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">External Factors</h3>
              
              <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                <p className="font-medium text-amber-700 dark:text-amber-400 mb-2">Supplier Delays</p>
                <ul className="text-xs sm:text-sm text-foreground list-disc pl-4 space-y-1">
                  <li>Manufacturing delays for specialist items</li>
                  <li>Transport and logistics problems</li>
                  <li>Stock availability issues</li>
                  <li>Quality control hold-ups</li>
                </ul>
              </div>
              
              <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                <p className="font-medium text-purple-700 dark:text-emerald-400 mb-2">Site Issues</p>
                <ul className="text-xs sm:text-sm text-foreground list-disc pl-4 space-y-1">
                  <li>Theft or misplacement of materials</li>
                  <li>Damage requiring replacement</li>
                  <li>Unexpected site conditions</li>
                  <li>Security and access problems</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded border border-red-200 dark:border-red-800">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-red-700 dark:text-emerald-400 mb-2">Impact of Shortages</p>
                <p className="text-xs sm:text-sm text-foreground">
                  Material shortages can delay projects by days or weeks, incurring penalty costs and affecting team productivity. Emergency procurement often costs 20-30% more than planned orders.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Check for Learning Point 2 */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Check - Causes of Shortages</h3>
            <InlineCheck
              id="shortage-causes-check"
              question={quickCheckQuestions[1].question}
              options={quickCheckQuestions[1].options}
              correctIndex={quickCheckQuestions[1].correctIndex}
              explanation={quickCheckQuestions[1].explanation}
            />
          </div>
        </Card>

        {/* Learning Point 3: Effects of Wastage and Shortages */}
        <Card className="mb-6 p-6 bg-card border-border/20">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-6 h-6 text-emerald-400" />
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Learning Point 3: Effects of Wastage and Shortages</h2>
          </div>
          
          <p className="text-base text-foreground mb-4">
            Both wastage and shortages have significant impacts on project success, affecting costs, timelines, safety, and environmental sustainability. Understanding these effects motivates better material management practices.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Financial Impact</h3>
              
              <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 h-fit">
                <p className="font-medium text-red-700 dark:text-emerald-400 mb-2">Increased Project Costs</p>
                <ul className="text-xs sm:text-sm text-foreground list-disc pl-4 space-y-1">
                  <li>Direct cost of wasted materials</li>
                  <li>Emergency procurement at premium prices</li>
                  <li>Labour costs during delays</li>
                  <li>Storage costs for excess materials</li>
                  <li>Disposal costs for damaged items</li>
                </ul>
              </div>
              
              <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 h-fit">
                <p className="font-medium text-orange-700 dark:text-emerald-400 mb-2">Timeline Impact</p>
                <ul className="text-xs sm:text-sm text-foreground list-disc pl-4 space-y-1">
                  <li>Work delays while waiting for replacements</li>
                  <li>Rescheduling of other trades</li>
                  <li>Penalty clauses for late completion</li>
                  <li>Extended site overhead costs</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Quality and Safety</h3>
              
              <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 h-fit">
                <p className="font-medium text-amber-700 dark:text-amber-400 mb-2">Safety Concerns</p>
                <ul className="text-xs sm:text-sm text-foreground list-disc pl-4 space-y-1">
                  <li>Risk of using damaged materials</li>
                  <li>Pressure to use inappropriate alternatives</li>
                  <li>Rushed installations due to delays</li>
                  <li>Compromised quality control</li>
                </ul>
              </div>
              
              <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 h-fit">
                <p className="font-medium text-green-700 dark:text-green-400 mb-2">Environmental Impact</p>
                <ul className="text-xs sm:text-sm text-foreground list-disc pl-4 space-y-1">
                  <li>Unnecessary waste going to landfill</li>
                  <li>Additional carbon footprint from waste</li>
                  <li>Resource depletion from over-consumption</li>
                  <li>Packaging waste from multiple deliveries</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded border border-purple-200 dark:border-purple-800">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-purple-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-purple-700 dark:text-emerald-400 mb-2">Business Reputation</p>
                <p className="text-xs sm:text-sm text-foreground">
                  Poor material management affects client relationships, subcontractor partnerships, and company reputation. Environmental responsibility is increasingly important for winning contracts.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Check for Learning Point 3 */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Check - Effects of Wastage and Shortages</h3>
            <InlineCheck
              id="effects-check"
              question={quickCheckQuestions[2].question}
              options={quickCheckQuestions[2].options}
              correctIndex={quickCheckQuestions[2].correctIndex}
              explanation={quickCheckQuestions[2].explanation}
            />
          </div>
        </Card>

        {/* Learning Point 4: Strategies to Reduce Wastage */}
        <Card className="mb-6 p-6 bg-card border-border/20">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-6 h-6 text-emerald-400" />
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Learning Point 4: Strategies to Reduce Wastage</h2>
          </div>
          
          <p className="text-base text-foreground mb-4">
            Implementing effective wastage reduction strategies requires systematic approaches to planning, handling, storage, and team training. These strategies deliver immediate cost savings and environmental benefits.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Planning and Measurement</h3>
              
              <div className="p-4 rounded-lg bg-emerald-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 h-fit">
                <p className="font-medium text-blue-700 dark:text-emerald-400 mb-2">Measure and Cut Carefully</p>
                <p className="text-xs sm:text-sm text-foreground mb-2">
                  Accurate measurement and cutting techniques prevent costly errors.
                </p>
                <ul className="text-xs sm:text-sm text-foreground list-disc pl-4">
                  <li>Use proper measuring tools and techniques</li>
                  <li>Double-check measurements before cutting</li>
                  <li>Allow for termination and connection lengths</li>
                  <li>Plan cutting sequences to minimise waste</li>
                </ul>
              </div>
              
              <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 h-fit">
                <p className="font-medium text-green-700 dark:text-green-400 mb-2">Proper Storage</p>
                <p className="text-xs sm:text-sm text-foreground mb-2">
                  Protect materials from damage through appropriate storage conditions.
                </p>
                <ul className="text-xs sm:text-sm text-foreground list-disc pl-4">
                  <li>Dry, secure, ventilated storage areas</li>
                  <li>Pallets and racking for organisation</li>
                  <li>Protection from weather and UV</li>
                  <li>Lockable containers for valuable items</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Reuse and Training</h3>
              
              <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 h-fit">
                <p className="font-medium text-amber-700 dark:text-amber-400 mb-2">Reuse Offcuts</p>
                <ul className="text-xs sm:text-sm text-foreground list-disc pl-4 space-y-1">
                  <li>Keep offcuts in organised storage for future use</li>
                  <li>Label offcuts with length and specification</li>
                  <li>Use offcuts for short runs and connections</li>
                  <li>Consider offcuts in planning new installations</li>
                </ul>
              </div>
              
              <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 h-fit">
                <p className="font-medium text-purple-700 dark:text-emerald-400 mb-2">Staff Training</p>
                <ul className="text-xs sm:text-sm text-foreground list-disc pl-4 space-y-1">
                  <li>Correct handling and installation techniques</li>
                  <li>Measurement and cutting best practices</li>
                  <li>Waste awareness and reduction mindset</li>
                  <li>Proper storage and material care</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded border border-green-200 dark:border-green-800">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-green-700 dark:text-green-400 mb-2">Success Metric</p>
                <p className="text-xs sm:text-sm text-foreground">
                  Well-implemented waste reduction strategies can reduce material waste from 8-10% to 2-3% of total material costs, providing significant savings on medium to large projects.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Check for Learning Point 4 */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Check - Waste Reduction Strategies</h3>
            <InlineCheck
              id="waste-reduction-check"
              question={quickCheckQuestions[3].question}
              options={quickCheckQuestions[3].options}
              correctIndex={quickCheckQuestions[3].correctIndex}
              explanation={quickCheckQuestions[3].explanation}
            />
          </div>
        </Card>

        {/* Learning Point 5: Strategies to Prevent Shortages */}
        <Card className="mb-6 p-6 bg-card border-border/20">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-6 h-6 text-emerald-400" />
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Learning Point 5: Strategies to Prevent Shortages</h2>
          </div>
          
          <p className="text-base text-foreground mb-4">
            Preventing material shortages requires proactive planning, systematic monitoring, and strong supplier relationships. These strategies ensure continuous work flow and prevent costly delays.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Planning and Estimation</h3>
              
              <div className="p-4 rounded-lg bg-emerald-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 h-fit">
                <p className="font-medium text-blue-700 dark:text-emerald-400 mb-2">Accurate Estimation</p>
                <p className="text-xs sm:text-sm text-foreground mb-2">
                  Thorough planning during the estimation stage prevents shortages.
                </p>
                <ul className="text-xs sm:text-sm text-foreground list-disc pl-4">
                  <li>Detailed review of drawings and specifications</li>
                  <li>Include allowances for testing and commissioning</li>
                  <li>Account for waste factors and cutting losses</li>
                  <li>Consider access routes and installation methods</li>
                </ul>
              </div>
              
              <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 h-fit">
                <p className="font-medium text-green-700 dark:text-green-400 mb-2">Stock Monitoring</p>
                <p className="text-xs sm:text-sm text-foreground mb-2">
                  Regular monitoring prevents unexpected shortages.
                </p>
                <ul className="text-xs sm:text-sm text-foreground list-disc pl-4">
                  <li>Keep a stock log updated daily</li>
                  <li>Set reorder points for critical items</li>
                  <li>Track usage rates and consumption patterns</li>
                  <li>Monitor upcoming work requirements</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Supplier Management</h3>
              
              <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 h-fit">
                <p className="font-medium text-amber-700 dark:text-amber-400 mb-2">Supplier Coordination</p>
                <ul className="text-xs sm:text-sm text-foreground list-disc pl-4 space-y-1">
                  <li>Establish clear delivery schedules</li>
                  <li>Understand lead times for different items</li>
                  <li>Maintain backup supplier relationships</li>
                  <li>Communicate changes promptly</li>
                </ul>
              </div>
              
              <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 h-fit">
                <p className="font-medium text-purple-700 dark:text-emerald-400 mb-2">Buffer Stock Strategy</p>
                <ul className="text-xs sm:text-sm text-foreground list-disc pl-4 space-y-1">
                  <li>Hold small buffer stock of critical items</li>
                  <li>Focus on items with long lead times</li>
                  <li>Balance shortage risk with storage costs</li>
                  <li>Consider shared stock with other projects</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-emerald-50 dark:bg-blue-900/20 p-4 rounded border border-blue-200 dark:border-blue-800">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-400 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-blue-700 dark:text-emerald-400 mb-2">Best Practice</p>
                <p className="text-xs sm:text-sm text-foreground">
                  Implement weekly material planning meetings with the site team to review upcoming requirements, check stock levels, and coordinate deliveries. This prevents most shortage-related delays.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Check for Learning Point 5 */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Check - Shortage Prevention</h3>
            <InlineCheck
              id="shortage-prevention-check"
              question={quickCheckQuestions[4].question}
              options={quickCheckQuestions[4].options}
              correctIndex={quickCheckQuestions[4].correctIndex}
              explanation={quickCheckQuestions[4].explanation}
            />
          </div>
        </Card>

        {/* Learning Point 6: Sustainable Practices */}
        <Card className="mb-6 p-6 bg-card border-border/20">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-6 h-6 text-emerald-400" />
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Learning Point 6: Sustainable Practices</h2>
          </div>
          
          <p className="text-base text-foreground mb-4">
            Sustainable material management reduces environmental impact while often providing cost benefits. Modern electrical contractors increasingly focus on sustainability to meet client requirements and environmental regulations.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Recycling and Reuse</h3>
              
              <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 h-fit">
                <p className="font-medium text-green-700 dark:text-green-400 mb-2">Material Recycling</p>
                <p className="text-xs sm:text-sm text-foreground mb-2">
                  Separate and recycle materials to reduce environmental impact.
                </p>
                <ul className="text-xs sm:text-sm text-foreground list-disc pl-4">
                  <li>Copper and aluminium cable offcuts</li>
                  <li>Steel and aluminium trunking and conduit</li>
                  <li>Plastic cable drums and packaging</li>
                  <li>Electronic components and equipment</li>
                </ul>
              </div>
              
              <div className="p-4 rounded-lg bg-emerald-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 h-fit">
                <p className="font-medium text-blue-700 dark:text-emerald-400 mb-2">Return Policies</p>
                <p className="text-xs sm:text-sm text-foreground mb-2">
                  Work with suppliers to return unused materials.
                </p>
                <ul className="text-xs sm:text-sm text-foreground list-disc pl-4">
                  <li>Negotiate return agreements with suppliers</li>
                  <li>Maintain original packaging where possible</li>
                  <li>Process returns promptly to avoid restocking fees</li>
                  <li>Track returns for cost accounting</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Waste Reduction</h3>
              
              <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 h-fit">
                <p className="font-medium text-amber-700 dark:text-amber-400 mb-2">Packaging Reduction</p>
                <ul className="text-xs sm:text-sm text-foreground list-disc pl-4 space-y-1">
                  <li>Bulk ordering to reduce packaging waste</li>
                  <li>Reusable packaging systems with suppliers</li>
                  <li>Minimise single-use packaging materials</li>
                  <li>Coordinate deliveries to reduce transport impact</li>
                </ul>
              </div>
              
              <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 h-fit">
                <p className="font-medium text-purple-700 dark:text-emerald-400 mb-2">Digital Documentation</p>
                <ul className="text-xs sm:text-sm text-foreground list-disc pl-4 space-y-1">
                  <li>Electronic delivery notes and invoices</li>
                  <li>Digital stock management systems</li>
                  <li>Paperless material tracking</li>
                  <li>Electronic certification and compliance records</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded border border-green-200 dark:border-green-800">
            <div className="flex items-start gap-3">
              <Recycle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-green-700 dark:text-green-400 mb-2">Business Advantage</p>
                <p className="text-xs sm:text-sm text-foreground">
                  Many clients now require sustainability credentials for major contracts. Demonstrating effective waste management and recycling practices can provide competitive advantages in tendering.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Check for Learning Point 6 */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Check - Sustainable Practices</h3>
            <InlineCheck
              id="sustainable-practices-check"
              question={quickCheckQuestions[5].question}
              options={quickCheckQuestions[5].options}
              correctIndex={quickCheckQuestions[5].correctIndex}
              explanation={quickCheckQuestions[5].explanation}
            />
          </div>
        </Card>

        {/* Real-World Example */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-6">Real-World Example</h2>
          
          <div className="border border-border/30 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-foreground mb-3">Housing Project Material Damage</h3>
            
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-3">
                <h4 className="font-medium text-foreground">The Problem:</h4>
                <p className="text-sm text-muted-foreground">
                  On a 50-unit housing project, cable reels were stored in an uncovered area during autumn. Heavy rain and humidity caused moisture ingress into several cable drums, making the cables unsafe for installation.
                </p>
                
                <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded border border-red-200 dark:border-red-800">
                  <p className="text-sm font-medium text-red-700 dark:text-emerald-400 mb-1">Consequences:</p>
                  <ul className="text-xs sm:text-sm text-foreground list-disc pl-4">
                    <li>£12,000 worth of cable unusable</li>
                    <li>2-week project delay</li>
                    <li>Emergency procurement at 25% premium</li>
                    <li>Additional storage and labour costs</li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium text-foreground">The Solution:</h4>
                <p className="text-sm text-muted-foreground">
                  Investment in a lockable, weatherproof storage container with proper ventilation and racking systems would have prevented the damage completely.
                </p>
                
                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded border border-green-200 dark:border-green-800">
                  <p className="text-sm font-medium text-green-700 dark:text-green-400 mb-1">Investment vs Savings:</p>
                  <ul className="text-xs sm:text-sm text-foreground list-disc pl-4">
                    <li>Storage container cost: £2,500</li>
                    <li>Total loss prevented: £15,000+</li>
                    <li>Return on investment: 600%</li>
                    <li>Reusable on future projects</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-emerald-50 dark:bg-blue-900/20 p-3 rounded border border-blue-200 dark:border-blue-800">
              <p className="text-xs sm:text-sm text-foreground">
                <strong>Lesson Learned:</strong> Proper material storage is an investment, not a cost. The project manager now includes weatherproof storage in all project planning and has avoided similar losses on subsequent projects.
              </p>
            </div>
          </div>
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-6">Practical Guidance</h2>
          <div className="space-y-4">
            {practicalGuidance.map((guidance, index) => (
              <div key={index} className="border-l-4 border-elec-blue pl-4 bg-emerald-50/50 dark:bg-blue-900/10 py-3 rounded-r">
                <p className="text-muted-foreground">{guidance}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-border/20 rounded-lg p-4">
                <h3 className="font-medium text-foreground mb-2">{faq.question}</h3>
                <p className="text-muted-foreground text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Pocket Guide */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-6 h-6 text-emerald-400" />
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Pocket Guide - Managing Wastage & Shortages</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {pocketGuideItems.map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs sm:text-sm text-foreground">{item}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Knowledge Check Quiz */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <div className="flex items-center gap-3 mb-6">
            <Clipboard className="w-6 h-6 text-emerald-400" />
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Knowledge Check</h2>
          </div>
          <Quiz questions={quizQuestions} />
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-border/20">
          <Button variant="outline" className="bg-background" asChild>
            <Link to="../4-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Module 5, Section 4</p>
            <p className="text-xs text-muted-foreground">4 of 6 subsections</p>
          </div>
          
          <Button variant="outline" className="bg-background" asChild>
            <Link to="..">
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module5Section4_4;