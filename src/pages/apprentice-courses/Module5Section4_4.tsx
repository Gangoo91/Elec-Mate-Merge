import { ArrowLeft, ArrowRight, Recycle, CheckCircle, AlertTriangle, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
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

const Module5Section4_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
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
              Back to Section 4
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
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 5</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 4.4</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Managing Wastage and Shortages
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Master material management strategies to minimise wastage, prevent shortages, and promote sustainable practices in electrical installations.
            </p>
          </header>

          {/* Introduction */}
          <section className="mb-10">
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-6">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="text-white/80 space-y-1 text-sm">
                <li>• Plan accurately to prevent both wastage and shortages.</li>
                <li>• Store materials properly to prevent damage and loss.</li>
                <li>• Monitor stock levels daily and implement sustainable practices.</li>
              </ul>
            </div>
          </section>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">00</span>
              Learning Outcomes
            </h2>
            <p className="text-white/80 mb-4">By the end of this subsection, you will be able to:</p>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="space-y-3">
                <h4 className="font-medium text-white">Wastage Management</h4>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li className="flex items-start">
                    <span className="text-elec-yellow mr-2">•</span>
                    Identify causes of material wastage in electrical installation
                  </li>
                  <li className="flex items-start">
                    <span className="text-elec-yellow mr-2">•</span>
                    Apply strategies to minimise wastage through proper planning and handling
                  </li>
                  <li className="flex items-start">
                    <span className="text-elec-yellow mr-2">•</span>
                    Promote sustainable working practices in electrical installation
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-white">Shortage Prevention</h4>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li className="flex items-start">
                    <span className="text-elec-yellow mr-2">•</span>
                    Recognise the impact of shortages on project timelines and budgets
                  </li>
                  <li className="flex items-start">
                    <span className="text-elec-yellow mr-2">•</span>
                    Implement systems for monitoring and managing stock
                  </li>
                  <li className="flex items-start">
                    <span className="text-elec-yellow mr-2">•</span>
                    Coordinate with suppliers to prevent delivery delays
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm text-white/80">
                <strong className="text-white">Impact on Business:</strong> Effective material management reduces project costs by 10-15% and improves sustainability through waste reduction and recycling practices.
              </p>
            </div>
          </section>

          {/* Learning Point 1: Causes of Wastage */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Causes of Wastage
            </h2>

            <p className="text-white/80 mb-4 leading-relaxed">
              Material wastage is a significant cost driver in electrical projects. Understanding the common causes helps implement effective prevention strategies and maintain project profitability.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Common Wastage Causes</h3>

                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                  <p className="font-medium text-red-400 mb-2">Over-ordering Materials</p>
                  <p className="text-sm text-white/70 mb-2">
                    Ordering excessive quantities due to poor planning or fear of shortages.
                  </p>
                  <ul className="text-sm text-white/70 list-disc pl-4">
                    <li>Inaccurate quantity calculations</li>
                    <li>Excessive safety margins</li>
                    <li>Poor communication with planning team</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                  <p className="font-medium text-orange-400 mb-2">Poor Storage Conditions</p>
                  <p className="text-sm text-white/70 mb-2">
                    Improper storage leading to material damage and deterioration.
                  </p>
                  <ul className="text-sm text-white/70 list-disc pl-4">
                    <li>Damp conditions damaging cables</li>
                    <li>UV exposure degrading materials</li>
                    <li>Physical damage from poor handling</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Installation Errors</h3>

                <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <p className="font-medium text-amber-400 mb-2">Measuring and Cutting Errors</p>
                  <ul className="text-sm text-white/70 list-disc pl-4 space-y-1">
                    <li>Incorrect measurements leading to unusable pieces</li>
                    <li>Poor cutting techniques causing damage</li>
                    <li>Not allowing for termination lengths</li>
                    <li>Calculation errors in cable runs</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <p className="font-medium text-purple-400 mb-2">Transport and Handling</p>
                  <ul className="text-sm text-white/70 list-disc pl-4 space-y-1">
                    <li>Damage during site transport</li>
                    <li>Improper lifting and moving techniques</li>
                    <li>Inadequate protection during installation</li>
                    <li>Weather exposure during work</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-blue-400 mb-2">Cost Impact</p>
                  <p className="text-sm text-white/70">
                    Material wastage typically accounts for 5-10% of total project costs. Effective management can reduce this to 2-3%, providing significant savings on larger projects.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Check 1 */}
          <section className="mb-10">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Check - Causes of Wastage</h3>
            <InlineCheck
              id="wastage-causes-check"
              question={quickCheckQuestions[0].question}
              options={quickCheckQuestions[0].options}
              correctIndex={quickCheckQuestions[0].correctIndex}
              explanation={quickCheckQuestions[0].explanation}
            />
          </section>

          {/* Learning Point 2: Causes of Shortages */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Causes of Shortages
            </h2>

            <p className="text-white/80 mb-4 leading-relaxed">
              Material shortages can halt work completely, causing costly delays and affecting project schedules. Understanding shortage causes enables better planning and prevention strategies.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Planning Issues</h3>

                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                  <p className="font-medium text-red-400 mb-2">Underestimating Requirements</p>
                  <p className="text-sm text-white/70 mb-2">
                    Insufficient material orders due to poor planning or calculation errors.
                  </p>
                  <ul className="text-sm text-white/70 list-disc pl-4">
                    <li>Incomplete drawing reviews</li>
                    <li>Missing allowances for testing</li>
                    <li>Underestimating cable routes</li>
                    <li>Not accounting for waste factors</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                  <p className="font-medium text-orange-400 mb-2">Communication Failures</p>
                  <p className="text-sm text-white/70 mb-2">
                    Poor coordination between teams leading to missed requirements.
                  </p>
                  <ul className="text-sm text-white/70 list-disc pl-4">
                    <li>Site team and stores miscommunication</li>
                    <li>Design changes not communicated</li>
                    <li>Delivery schedule conflicts</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">External Factors</h3>

                <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <p className="font-medium text-amber-400 mb-2">Supplier Delays</p>
                  <ul className="text-sm text-white/70 list-disc pl-4 space-y-1">
                    <li>Manufacturing delays for specialist items</li>
                    <li>Transport and logistics problems</li>
                    <li>Stock availability issues</li>
                    <li>Quality control hold-ups</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <p className="font-medium text-purple-400 mb-2">Site Issues</p>
                  <ul className="text-sm text-white/70 list-disc pl-4 space-y-1">
                    <li>Theft or misplacement of materials</li>
                    <li>Damage requiring replacement</li>
                    <li>Unexpected site conditions</li>
                    <li>Security and access problems</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-red-400 mb-2">Impact of Shortages</p>
                  <p className="text-sm text-white/70">
                    Material shortages can delay projects by days or weeks, incurring penalty costs and affecting team productivity. Emergency procurement often costs 20-30% more than planned orders.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Check 2 */}
          <section className="mb-10">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Check - Causes of Shortages</h3>
            <InlineCheck
              id="shortage-causes-check"
              question={quickCheckQuestions[1].question}
              options={quickCheckQuestions[1].options}
              correctIndex={quickCheckQuestions[1].correctIndex}
              explanation={quickCheckQuestions[1].explanation}
            />
          </section>

          {/* Learning Point 3: Effects of Wastage and Shortages */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Effects of Wastage and Shortages
            </h2>

            <p className="text-white/80 mb-4 leading-relaxed">
              Both wastage and shortages have significant impacts on project success, affecting costs, timelines, safety, and environmental sustainability. Understanding these effects motivates better material management practices.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Financial Impact</h3>

                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                  <p className="font-medium text-red-400 mb-2">Increased Project Costs</p>
                  <ul className="text-sm text-white/70 list-disc pl-4 space-y-1">
                    <li>Direct cost of wasted materials</li>
                    <li>Emergency procurement at premium prices</li>
                    <li>Labour costs during delays</li>
                    <li>Storage costs for excess materials</li>
                    <li>Disposal costs for damaged items</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                  <p className="font-medium text-orange-400 mb-2">Timeline Impact</p>
                  <ul className="text-sm text-white/70 list-disc pl-4 space-y-1">
                    <li>Work delays while waiting for replacements</li>
                    <li>Rescheduling of other trades</li>
                    <li>Penalty clauses for late completion</li>
                    <li>Extended site overhead costs</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Quality and Safety</h3>

                <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <p className="font-medium text-amber-400 mb-2">Safety Concerns</p>
                  <ul className="text-sm text-white/70 list-disc pl-4 space-y-1">
                    <li>Risk of using damaged materials</li>
                    <li>Pressure to use inappropriate alternatives</li>
                    <li>Rushed installations due to delays</li>
                    <li>Compromised quality control</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <p className="font-medium text-green-400 mb-2">Environmental Impact</p>
                  <ul className="text-sm text-white/70 list-disc pl-4 space-y-1">
                    <li>Unnecessary waste going to landfill</li>
                    <li>Additional carbon footprint from waste</li>
                    <li>Resource depletion from over-consumption</li>
                    <li>Packaging waste from multiple deliveries</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-purple-400 mb-2">Business Reputation</p>
                  <p className="text-sm text-white/70">
                    Poor material management affects client relationships, subcontractor partnerships, and company reputation. Environmental responsibility is increasingly important for winning contracts.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Check 3 */}
          <section className="mb-10">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Check - Effects of Wastage and Shortages</h3>
            <InlineCheck
              id="effects-check"
              question={quickCheckQuestions[2].question}
              options={quickCheckQuestions[2].options}
              correctIndex={quickCheckQuestions[2].correctIndex}
              explanation={quickCheckQuestions[2].explanation}
            />
          </section>

          {/* Learning Point 4: Strategies to Reduce Wastage */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Strategies to Reduce Wastage
            </h2>

            <p className="text-white/80 mb-4 leading-relaxed">
              Implementing effective wastage reduction strategies requires systematic approaches to planning, handling, storage, and team training. These strategies deliver immediate cost savings and environmental benefits.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Planning and Measurement</h3>

                <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <p className="font-medium text-blue-400 mb-2">Measure and Cut Carefully</p>
                  <p className="text-sm text-white/70 mb-2">
                    Accurate measurement and cutting techniques prevent costly errors.
                  </p>
                  <ul className="text-sm text-white/70 list-disc pl-4">
                    <li>Use proper measuring tools and techniques</li>
                    <li>Double-check measurements before cutting</li>
                    <li>Allow for termination and connection lengths</li>
                    <li>Plan cutting sequences to minimise waste</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <p className="font-medium text-green-400 mb-2">Proper Storage</p>
                  <p className="text-sm text-white/70 mb-2">
                    Protect materials from damage through appropriate storage conditions.
                  </p>
                  <ul className="text-sm text-white/70 list-disc pl-4">
                    <li>Dry, secure, ventilated storage areas</li>
                    <li>Pallets and racking for organisation</li>
                    <li>Protection from weather and UV</li>
                    <li>Lockable containers for valuable items</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Reuse and Training</h3>

                <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <p className="font-medium text-amber-400 mb-2">Reuse Offcuts</p>
                  <ul className="text-sm text-white/70 list-disc pl-4 space-y-1">
                    <li>Keep offcuts in organised storage for future use</li>
                    <li>Label offcuts with length and specification</li>
                    <li>Use offcuts for short runs and connections</li>
                    <li>Consider offcuts in planning new installations</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <p className="font-medium text-purple-400 mb-2">Staff Training</p>
                  <ul className="text-sm text-white/70 list-disc pl-4 space-y-1">
                    <li>Correct handling and installation techniques</li>
                    <li>Measurement and cutting best practices</li>
                    <li>Waste awareness and reduction mindset</li>
                    <li>Proper storage and material care</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-green-400 mb-2">Success Metric</p>
                  <p className="text-sm text-white/70">
                    Well-implemented waste reduction strategies can reduce material waste from 8-10% to 2-3% of total material costs, providing significant savings on medium to large projects.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Check 4 */}
          <section className="mb-10">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Check - Waste Reduction Strategies</h3>
            <InlineCheck
              id="waste-reduction-check"
              question={quickCheckQuestions[3].question}
              options={quickCheckQuestions[3].options}
              correctIndex={quickCheckQuestions[3].correctIndex}
              explanation={quickCheckQuestions[3].explanation}
            />
          </section>

          {/* Learning Point 5: Strategies to Prevent Shortages */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Strategies to Prevent Shortages
            </h2>

            <p className="text-white/80 mb-4 leading-relaxed">
              Preventing material shortages requires proactive planning, systematic monitoring, and strong supplier relationships. These strategies ensure continuous work flow and prevent costly delays.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Planning and Estimation</h3>

                <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <p className="font-medium text-blue-400 mb-2">Accurate Estimation</p>
                  <p className="text-sm text-white/70 mb-2">
                    Thorough planning during the estimation stage prevents shortages.
                  </p>
                  <ul className="text-sm text-white/70 list-disc pl-4">
                    <li>Detailed review of drawings and specifications</li>
                    <li>Include allowances for testing and commissioning</li>
                    <li>Account for waste factors and cutting losses</li>
                    <li>Consider access routes and installation methods</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <p className="font-medium text-green-400 mb-2">Stock Monitoring</p>
                  <p className="text-sm text-white/70 mb-2">
                    Regular monitoring prevents unexpected shortages.
                  </p>
                  <ul className="text-sm text-white/70 list-disc pl-4">
                    <li>Keep a stock log updated daily</li>
                    <li>Set reorder points for critical items</li>
                    <li>Track usage rates and consumption patterns</li>
                    <li>Monitor upcoming work requirements</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Supplier Management</h3>

                <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <p className="font-medium text-amber-400 mb-2">Supplier Coordination</p>
                  <ul className="text-sm text-white/70 list-disc pl-4 space-y-1">
                    <li>Establish clear delivery schedules</li>
                    <li>Understand lead times for different items</li>
                    <li>Maintain backup supplier relationships</li>
                    <li>Communicate changes promptly</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <p className="font-medium text-purple-400 mb-2">Buffer Stock Strategy</p>
                  <ul className="text-sm text-white/70 list-disc pl-4 space-y-1">
                    <li>Hold small buffer stock of critical items</li>
                    <li>Focus on items with long lead times</li>
                    <li>Balance shortage risk with storage costs</li>
                    <li>Consider shared stock with other projects</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-blue-400 mb-2">Best Practice</p>
                  <p className="text-sm text-white/70">
                    Implement weekly material planning meetings with the site team to review upcoming requirements, check stock levels, and coordinate deliveries. This prevents most shortage-related delays.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Check 5 */}
          <section className="mb-10">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Check - Shortage Prevention</h3>
            <InlineCheck
              id="shortage-prevention-check"
              question={quickCheckQuestions[4].question}
              options={quickCheckQuestions[4].options}
              correctIndex={quickCheckQuestions[4].correctIndex}
              explanation={quickCheckQuestions[4].explanation}
            />
          </section>

          {/* Learning Point 6: Sustainable Practices */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Sustainable Practices
            </h2>

            <p className="text-white/80 mb-4 leading-relaxed">
              Sustainable material management reduces environmental impact while often providing cost benefits. Modern electrical contractors increasingly focus on sustainability to meet client requirements and environmental regulations.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Recycling and Reuse</h3>

                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <p className="font-medium text-green-400 mb-2">Material Recycling</p>
                  <p className="text-sm text-white/70 mb-2">
                    Separate and recycle materials to reduce environmental impact.
                  </p>
                  <ul className="text-sm text-white/70 list-disc pl-4">
                    <li>Copper and aluminium cable offcuts</li>
                    <li>Steel and aluminium trunking and conduit</li>
                    <li>Plastic cable drums and packaging</li>
                    <li>Electronic components and equipment</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <p className="font-medium text-blue-400 mb-2">Return Policies</p>
                  <p className="text-sm text-white/70 mb-2">
                    Work with suppliers to return unused materials.
                  </p>
                  <ul className="text-sm text-white/70 list-disc pl-4">
                    <li>Negotiate return agreements with suppliers</li>
                    <li>Maintain original packaging where possible</li>
                    <li>Process returns promptly to avoid restocking fees</li>
                    <li>Track returns for cost accounting</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Waste Reduction</h3>

                <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <p className="font-medium text-amber-400 mb-2">Packaging Reduction</p>
                  <ul className="text-sm text-white/70 list-disc pl-4 space-y-1">
                    <li>Bulk ordering to reduce packaging waste</li>
                    <li>Reusable packaging systems with suppliers</li>
                    <li>Minimise single-use packaging materials</li>
                    <li>Coordinate deliveries to reduce transport impact</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <p className="font-medium text-purple-400 mb-2">Digital Documentation</p>
                  <ul className="text-sm text-white/70 list-disc pl-4 space-y-1">
                    <li>Electronic delivery notes and invoices</li>
                    <li>Digital stock management systems</li>
                    <li>Paperless material tracking</li>
                    <li>Electronic certification and compliance records</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
              <div className="flex items-start gap-3">
                <Recycle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-green-400 mb-2">Business Advantage</p>
                  <p className="text-sm text-white/70">
                    Many clients now require sustainability credentials for major contracts. Demonstrating effective waste management and recycling practices can provide competitive advantages in tendering.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Check 6 */}
          <section className="mb-10">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Check - Sustainable Practices</h3>
            <InlineCheck
              id="sustainable-practices-check"
              question={quickCheckQuestions[5].question}
              options={quickCheckQuestions[5].options}
              correctIndex={quickCheckQuestions[5].correctIndex}
              explanation={quickCheckQuestions[5].explanation}
            />
          </section>

          {/* Real-World Example */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Real-World Example
            </h2>

            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-3">Housing Project Material Damage</h3>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-white">The Problem:</h4>
                  <p className="text-sm text-white/70">
                    On a 50-unit housing project, cable reels were stored in an uncovered area during autumn. Heavy rain and humidity caused moisture ingress into several cable drums, making the cables unsafe for installation.
                  </p>

                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                    <p className="text-sm font-medium text-red-400 mb-1">Consequences:</p>
                    <ul className="text-sm text-white/70 list-disc pl-4">
                      <li>£12,000 worth of cable unusable</li>
                      <li>2-week project delay</li>
                      <li>Emergency procurement at 25% premium</li>
                      <li>Additional storage and labour costs</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-white">The Solution:</h4>
                  <p className="text-sm text-white/70">
                    Investment in a lockable, weatherproof storage container with proper ventilation and racking systems would have prevented the damage completely.
                  </p>

                  <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <p className="text-sm font-medium text-green-400 mb-1">Investment vs Savings:</p>
                    <ul className="text-sm text-white/70 list-disc pl-4">
                      <li>Storage container cost: £2,500</li>
                      <li>Total loss prevented: £15,000+</li>
                      <li>Return on investment: 600%</li>
                      <li>Reusable on future projects</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <p className="text-sm text-white/70">
                  <strong className="text-blue-400">Lesson Learned:</strong> Proper material storage is an investment, not a cost. The project manager now includes weatherproof storage in all project planning and has avoided similar losses on subsequent projects.
                </p>
              </div>
            </div>
          </section>

          {/* Practical Guidance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
              Practical Guidance
            </h2>
            <div className="space-y-3">
              {practicalGuidance.map((guidance, index) => (
                <div key={index} className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                  <p className="text-white/80 text-sm">{guidance}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">09</span>
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h3 className="font-medium text-white mb-2">{faq.question}</h3>
                  <p className="text-white/70 text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Pocket Guide */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-5 h-5 text-elec-yellow" />
              <h2 className="text-xl font-semibold text-white">Pocket Guide - Managing Wastage & Shortages</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {pocketGuideItems.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                  <CheckCircle className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-white/80">{item}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Knowledge Check Quiz */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">10</span>
              Knowledge Check
            </h2>
            <Quiz questions={quizQuestions} />
          </section>

          {/* Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10 mt-10">
            <Button
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../4-3">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back: Tool Selection
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../4-5">
                Next: Coordinating Equipment
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module5Section4_4;
