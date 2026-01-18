import { ArrowLeft, ArrowRight, Truck, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Ordering Materials and Managing Deliveries - Module 5.4.2 | Level 2 Electrical Course";
const DESCRIPTION = "Master efficient material ordering and delivery management for electrical installations. Learn procurement best practices and delivery coordination.";

const quickCheckQuestions = [
  {
    id: 1,
    question: "Why should deliveries be scheduled to match project phases?",
    options: [
      "To save money",
      "To prevent overcrowding, damage, and theft",
      "To impress suppliers",
      "It's not necessary"
    ],
    correctIndex: 1,
    explanation: "Phased deliveries prevent site congestion, reduce risk of theft and damage, and ensure materials arrive when needed."
  },
  {
    id: 2,
    question: "What should you always check upon receiving a delivery?",
    options: [
      "Only the quantity",
      "Only the condition",
      "Quantities, specifications, and condition",
      "Just sign the delivery note"
    ],
    correctIndex: 2,
    explanation: "All three aspects must be checked: correct quantities delivered, right specifications, and good condition before accepting delivery."
  },
  {
    id: 3,
    question: "Name one risk of ordering materials too early.",
    options: [
      "Better prices",
      "Theft, damage, or cluttered storage",
      "Faster installation",
      "Happier clients"
    ],
    correctIndex: 1,
    explanation: "Early deliveries create risks of theft, weather damage, and cluttered storage that can impede other work."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the main purpose of scheduling phased deliveries?",
    options: [
      "To save on delivery costs",
      "To match project phases and prevent overcrowding or damage",
      "To reduce paperwork",
      "To speed up installation"
    ],
    correctAnswer: 1,
    explanation: "Phased deliveries align with project phases, preventing site overcrowding and reducing risk of damage or theft."
  },
  {
    id: 2,
    question: "True or False: Ordering all materials at once is always the best practice.",
    options: [
      "True",
      "False"
    ],
    correctAnswer: 1,
    explanation: "False. Bulk ordering early creates storage problems, theft risks, and potential damage to materials."
  },
  {
    id: 3,
    question: "Name one factor you must consider when planning material orders.",
    options: [
      "Weather conditions",
      "Supplier lead times",
      "Site parking",
      "Worker preferences"
    ],
    correctAnswer: 1,
    explanation: "Supplier lead times are critical for ensuring materials arrive when needed, especially for specialist items."
  },
  {
    id: 4,
    question: "What should be checked immediately when deliveries arrive?",
    options: [
      "Only the delivery driver's ID",
      "Quantities, specifications, and condition",
      "Just the price",
      "Only the delivery time"
    ],
    correctAnswer: 1,
    explanation: "All deliveries must be checked for correct quantities, right specifications, and good condition before acceptance."
  },
  {
    id: 5,
    question: "What is the risk of ordering specialist items late?",
    options: [
      "Higher costs",
      "Project delays due to long lead times",
      "Poor quality",
      "Delivery problems"
    ],
    correctAnswer: 1,
    explanation: "Specialist electrical items often have longer lead times, so late ordering can cause significant project delays."
  },
  {
    id: 6,
    question: "Name one storage best practice for cables.",
    options: [
      "Store outside for easy access",
      "Store in dry, secure conditions",
      "Stack as high as possible",
      "Leave on delivery pallets"
    ],
    correctAnswer: 1,
    explanation: "Cables must be stored in dry, secure conditions to prevent moisture damage and theft."
  },
  {
    id: 7,
    question: "What should you do if goods arrive damaged?",
    options: [
      "Use them anyway",
      "Reject or return them immediately",
      "Repair them on site",
      "Accept and claim later"
    ],
    correctAnswer: 1,
    explanation: "Damaged goods should be rejected immediately and replacements requested to avoid safety and quality issues."
  },
  {
    id: 8,
    question: "Why should you avoid bulk deliveries too early?",
    options: [
      "It's more expensive",
      "Risk of damage, theft, or cluttered storage",
      "Workers prefer smaller deliveries",
      "Suppliers don't like it"
    ],
    correctAnswer: 1,
    explanation: "Early bulk deliveries create storage problems and increase risks of theft, damage, and site congestion."
  },
  {
    id: 9,
    question: "What document confirms the details of delivered goods?",
    options: [
      "Invoice",
      "Delivery note",
      "Purchase order",
      "Receipt"
    ],
    correctAnswer: 1,
    explanation: "The delivery note details what was actually delivered and must be checked against the original order."
  },
  {
    id: 10,
    question: "Give one benefit of building strong relationships with suppliers.",
    options: [
      "Free materials",
      "Better service, reliable deliveries, or priority during shortages",
      "No delivery charges",
      "Automatic ordering"
    ],
    correctAnswer: 1,
    explanation: "Strong supplier relationships provide better service, priority during shortages, and more reliable deliveries."
  }
];

const practicalGuidance = [
  "Create detailed material lists with complete specifications, quantities, and required delivery dates. Include part numbers, brands, and relevant British Standards to avoid confusion.",
  "Contact suppliers early to confirm stock availability, lead times, and delivery schedules. Build buffer time into critical path items and confirm pricing and terms.",
  "Schedule deliveries strategically to match project phases—containment and infrastructure first, followed by cables, then accessories and final fix items.",
  "Establish clear delivery procedures including designated receiving areas, inspection protocols, and sign-off procedures. Ensure site access arrangements are confirmed.",
  "Implement proper storage systems with secure, weatherproof areas. Use appropriate racking, pallets, and labelling systems to prevent damage and facilitate easy retrieval.",
  "Maintain accurate delivery records, tracking systems, and communication with both suppliers and project teams to ensure coordination and accountability.",
  "Develop contingency plans for delivery delays, damaged goods, and emergency requirements. Maintain relationships with multiple suppliers for critical items."
];

const pocketGuideItems = [
  "Base orders on accurate, verified material estimates and specifications.",
  "Contact suppliers early - confirm availability, lead times, and delivery slots.",
  "Schedule phased deliveries to match project phases and installation sequence.",
  "Prepare secure, weatherproof storage areas before deliveries arrive.",
  "Inspect all deliveries immediately - check quantities, specs, and condition.",
  "Reject damaged or incorrect items immediately - document and request replacements.",
  "Maintain clear delivery records and tracking systems for accountability.",
  "Store materials safely using proper racking, pallets, and environmental protection.",
  "Build strong supplier relationships for better service and priority treatment.",
  "Plan contingencies for delays, shortages, and emergency material requirements."
];

const Module5Section4_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  const faqs = [
    {
      question: "Should I order extra materials 'just in case'?",
      answer: "Only order reasonable quantities of small consumables (5-10% extra fixings, clips, cable ties). For major items like cables and containment, stick to estimated quantities plus standard wastage allowances to avoid tying up capital and storage space unnecessarily."
    },
    {
      question: "How can I ensure deliveries don't slow down work progress?",
      answer: "Plan orders 2-3 weeks in advance, confirm delivery dates in writing, track project progress weekly, and maintain buffer stock of critical small items. Establish backup suppliers for emergency requirements."
    },
    {
      question: "What should I do if a supplier delivers damaged goods?",
      answer: "Reject damaged goods immediately, take photos for evidence, complete a non-conformance report, and request immediate replacements. Never accept and 'sort it out later' as this creates liability and safety issues."
    },
    {
      question: "How do I handle delivery schedules on tight sites with limited access?",
      answer: "Coordinate with site management and other trades to book delivery slots. Use smaller, more frequent deliveries rather than bulk loads. Consider off-site storage with just-in-time delivery for very restricted sites."
    },
    {
      question: "What's the best way to track materials across multiple projects?",
      answer: "Use digital inventory management systems with barcode scanning. Maintain separate storage areas per project with clear labelling. Implement daily stock checks and allocation tracking to prevent cross-project confusion."
    },
    {
      question: "How do I deal with suppliers who consistently deliver late?",
      answer: "Document all delivery failures, escalate to supplier management, and develop alternative supplier relationships. Late deliveries can severely impact project schedules and should be treated as serious issues."
    },
    {
      question: "What's the difference between purchase orders and delivery notes?",
      answer: "Purchase orders are your instructions to suppliers specifying what to deliver. Delivery notes document what was actually delivered. Always check delivery notes against purchase orders to verify accuracy."
    },
    {
      question: "Should I always use the cheapest supplier?",
      answer: "No. Consider total cost including delivery reliability, quality, technical support, and payment terms. A slightly more expensive supplier with reliable delivery can save significant project costs compared to cheap but unreliable alternatives."
    }
  ];

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

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 5</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 5.4.2</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Ordering Materials and Managing Deliveries
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Master efficient procurement and delivery coordination to ensure smooth project execution without costly delays.
            </p>
          </header>

          {/* In 30 Seconds */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">00</span>
              In 30 Seconds
            </h2>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <ul className="text-white/90 space-y-2 text-sm leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Schedule phased deliveries to match project phases</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Always inspect deliveries immediately for quality and quantity</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Store materials securely in dry, weatherproof conditions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Build strong supplier relationships for priority service</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Introduction */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Introduction
            </h2>
            <div className="text-white/85 space-y-4 leading-relaxed">
              <p>
                Efficient ordering and delivery management is the backbone of successful electrical installations. A well-planned procurement system ensures the right materials arrive at the right time, in the right quantities, maintaining project momentum and profitability. Poor ordering practices can cause critical shortages, project delays, cost overruns, or resource waste through overstocking.
              </p>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-elec-yellow mb-2">Why This Matters</p>
                    <p className="text-sm text-white/80">
                      Professional procurement systems reduce project delays by 25% and improve cash flow through optimised inventory management and supplier relationships. Well-managed deliveries can reduce project costs by 5-15% through reduced emergency orders, bulk discounts, and elimination of storage-related losses.
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-3 rounded bg-white/5 border border-white/10">
                <p className="text-sm text-white/80">
                  <strong className="text-white">Professional Standard:</strong> Effective material management demonstrates competence and builds long-term supplier relationships that benefit future projects.
                </p>
              </div>
            </div>
          </section>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Learning Outcomes
            </h2>
            <div className="text-white/85 space-y-4 leading-relaxed">
              <p className="mb-4">By the end of this subsection, you will be able to:</p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="font-medium text-white mb-3">Procurement Planning Skills</h4>
                  <ul className="space-y-2 text-sm text-white/80">
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Create comprehensive material orders based on accurate estimates
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Understand supplier lead times and factor them into planning
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Negotiate pricing, terms, and delivery schedules
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Plan procurement to optimise cash flow and scheduling
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="font-medium text-white mb-3">Delivery Coordination</h4>
                  <ul className="space-y-2 text-sm text-white/80">
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Schedule phased deliveries to match project phases
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Coordinate delivery timing with site access and other trades
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Implement just-in-time delivery strategies for large projects
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Manage delivery logistics and site storage requirements
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="font-medium text-white mb-3">Quality & Inspection</h4>
                  <ul className="space-y-2 text-sm text-white/80">
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Establish delivery inspection and quality control procedures
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Identify and resolve delivery discrepancies and damaged goods
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Maintain accurate delivery records and documentation
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Implement non-conformance and corrective action procedures
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="font-medium text-white mb-3">Storage & Safety</h4>
                  <ul className="space-y-2 text-sm text-white/80">
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Design and implement secure, weatherproof storage systems
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Handle and store materials according to manufacturer requirements
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Prevent material damage, theft, and environmental deterioration
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Maintain inventory control and material tracking systems
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Planning the Order */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Planning the Order
            </h2>
            <div className="text-white/85 space-y-4 leading-relaxed">
              <p>Successful procurement starts with meticulous planning based on accurate estimates and detailed specifications:</p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Foundation Elements:</p>
                <ul className="text-sm text-white/80 space-y-2 ml-4">
                  <li><strong>Accurate take-offs:</strong> Base orders on verified material estimates and calculations</li>
                  <li><strong>Specification verification:</strong> Cross-check quantities against drawings and specifications</li>
                  <li><strong>Lead time analysis:</strong> Research supplier lead times, especially for specialist items</li>
                  <li><strong>Commercial terms:</strong> Confirm pricing, payment terms, and delivery schedules</li>
                  <li><strong>Quality standards:</strong> Specify required British Standards and certifications</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-elec-yellow mb-3">Procurement Timeline Planning</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li><strong>Standard items:</strong> 5-10 working days lead time</li>
                  <li><strong>Special orders:</strong> 2-6 weeks depending on manufacturer</li>
                  <li><strong>Import items:</strong> 6-12 weeks including shipping and clearance</li>
                  <li><strong>Bespoke items:</strong> 8-16 weeks for design and manufacture</li>
                  <li><strong>Buffer time:</strong> Add 20% to critical path items</li>
                </ul>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-2">Cable Specifications</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>• Type (T&E, SWA, FP200, etc.)</li>
                    <li>• Size and number of cores</li>
                    <li>• Voltage rating and standards</li>
                    <li>• Sheath colour requirements</li>
                    <li>• Fire performance ratings</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-2">Containment & Accessories</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>• Trunking sizes and materials</li>
                    <li>• Conduit diameters and types</li>
                    <li>• IP ratings for enclosures</li>
                    <li>• Fixing and mounting systems</li>
                    <li>• Earth bonding requirements</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck
              id="planning-check"
              question={quickCheckQuestions[0].question}
              options={quickCheckQuestions[0].options}
              correctIndex={quickCheckQuestions[0].correctIndex}
              explanation={quickCheckQuestions[0].explanation}
            />
          </div>

          {/* Scheduling Deliveries */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Scheduling Deliveries
            </h2>
            <div className="text-white/85 space-y-4 leading-relaxed">
              <p>Strategic delivery scheduling prevents site congestion, reduces storage risks, and maintains project flow:</p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Phased Delivery Approach:</p>
                <ul className="text-sm text-white/80 space-y-2 ml-4">
                  <li><strong>Phase 1 - Infrastructure:</strong> Containment, trunking, cable tray, major support systems</li>
                  <li><strong>Phase 2 - Distribution:</strong> Distribution boards, main cables, protective devices</li>
                  <li><strong>Phase 3 - Installation:</strong> Final circuits, control cables, specialist equipment</li>
                  <li><strong>Phase 4 - Finishing:</strong> Accessories, outlets, switches, testing equipment</li>
                  <li><strong>Phase 5 - Commissioning:</strong> Labels, documentation, spare parts</li>
                </ul>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <p className="font-medium text-green-400 mb-2">JIT Advantages</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>• Reduced storage space requirements</li>
                    <li>• Lower theft and damage risks</li>
                    <li>• Improved cash flow management</li>
                    <li>• Reduced site congestion</li>
                    <li>• Materials arrive when needed</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <p className="font-medium text-amber-400 mb-2">JIT Considerations</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>• Requires accurate scheduling</li>
                    <li>• Supplier reliability critical</li>
                    <li>• May have higher delivery costs</li>
                    <li>• Less flexibility for changes</li>
                    <li>• Weather dependency risks</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <p className="font-medium text-blue-400 mb-2">Delivery Coordination Factors</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li><strong>Site access:</strong> Coordinate with other trades and site management</li>
                  <li><strong>Crane availability:</strong> Schedule heavy items when lifting equipment available</li>
                  <li><strong>Weather protection:</strong> Avoid deliveries during adverse weather for sensitive items</li>
                  <li><strong>Storage readiness:</strong> Ensure storage areas are prepared before delivery</li>
                  <li><strong>Installation sequence:</strong> Match delivery to actual installation progress</li>
                </ul>
              </div>

              <div className="p-3 rounded bg-orange-500/10 border border-orange-500/20">
                <p className="text-sm text-white/80">
                  <strong className="text-orange-400">Risk Management:</strong> Early bulk deliveries increase theft risk by 60% and weather damage by 40%. Phased deliveries reduce these risks while maintaining project flow.
                </p>
              </div>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck
              id="scheduling-check"
              question={quickCheckQuestions[1].question}
              options={quickCheckQuestions[1].options}
              correctIndex={quickCheckQuestions[1].correctIndex}
              explanation={quickCheckQuestions[1].explanation}
            />
          </div>

          {/* Communication with Suppliers */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Communication with Suppliers
            </h2>
            <div className="text-white/85 space-y-4 leading-relaxed">
              <p>Effective supplier communication builds relationships that deliver long-term benefits and project success:</p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Essential Communication Practices:</p>
                <ul className="text-sm text-white/80 space-y-2 ml-4">
                  <li><strong>Clear specifications:</strong> Provide detailed technical requirements and standards</li>
                  <li><strong>Written confirmations:</strong> Always request written order confirmations and delivery schedules</li>
                  <li><strong>Regular updates:</strong> Maintain contact throughout order processing and delivery</li>
                  <li><strong>Issue escalation:</strong> Establish clear procedures for handling problems and delays</li>
                  <li><strong>Relationship building:</strong> Invest time in developing trusted supplier partnerships</li>
                </ul>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-2">Purchase Documentation</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>• Purchase order with specifications</li>
                    <li>• Delivery schedule confirmation</li>
                    <li>• Price and payment terms</li>
                    <li>• Special delivery instructions</li>
                    <li>• Quality and certification requirements</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-2">Delivery Documentation</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>• Delivery notes and packing lists</li>
                    <li>• Quality certificates and test results</li>
                    <li>• Warranty and guarantee documents</li>
                    <li>• Installation and maintenance manuals</li>
                    <li>• Conformity declarations (CE marking)</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-elec-yellow mb-2">Building Supplier Partnerships</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li><strong>Preferred supplier agreements:</strong> Negotiate better terms through volume commitments</li>
                  <li><strong>Regular performance reviews:</strong> Assess delivery reliability, quality, and service</li>
                  <li><strong>Technical support access:</strong> Leverage supplier expertise for product selection</li>
                  <li><strong>Emergency provisions:</strong> Establish procedures for urgent material requirements</li>
                  <li><strong>Payment reliability:</strong> Build trust through prompt payment and clear terms</li>
                </ul>
              </div>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck
              id="communication-check"
              question={quickCheckQuestions[2].question}
              options={quickCheckQuestions[2].options}
              correctIndex={quickCheckQuestions[2].correctIndex}
              explanation={quickCheckQuestions[2].explanation}
            />
          </div>

          {/* Receiving and Checking Deliveries */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Receiving and Checking Deliveries
            </h2>
            <div className="text-white/85 space-y-4 leading-relaxed">
              <p>Thorough delivery inspection protects against quality issues, quantity discrepancies, and liability problems:</p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Systematic Inspection Procedure:</p>
                <ol className="text-sm text-white/80 space-y-2 ml-4 list-decimal">
                  <li><strong>Pre-delivery preparation:</strong> Clear designated inspection area, prepare tools and documentation</li>
                  <li><strong>Vehicle inspection:</strong> Check for signs of damage during transport before unloading</li>
                  <li><strong>Documentation check:</strong> Verify delivery note against purchase order before acceptance</li>
                  <li><strong>Quantity verification:</strong> Count all items systematically, checking against delivery note</li>
                  <li><strong>Quality inspection:</strong> Examine each item for damage, defects, and specification compliance</li>
                  <li><strong>Documentation completion:</strong> Sign delivery note only after full inspection and acceptance</li>
                </ol>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                  <p className="font-medium text-red-400 mb-2">Rejection Criteria</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>• Physical damage to packaging or products</li>
                    <li>• Incorrect specifications or part numbers</li>
                    <li>• Missing quantities or short deliveries</li>
                    <li>• Missing certification or test certificates</li>
                    <li>• Contamination or environmental damage</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <p className="font-medium text-green-400 mb-2">Acceptance Requirements</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>• Quantities match delivery note exactly</li>
                    <li>• Specifications comply with order</li>
                    <li>• No visible damage or defects</li>
                    <li>• All required documentation present</li>
                    <li>• Packaging intact and undamaged</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <p className="font-medium text-amber-400 mb-2">Non-Conformance Procedures</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li><strong>Immediate action:</strong> Stop acceptance process, do not sign delivery note</li>
                  <li><strong>Documentation:</strong> Photograph damage/discrepancies, complete non-conformance report</li>
                  <li><strong>Communication:</strong> Contact supplier immediately, request immediate resolution</li>
                  <li><strong>Segregation:</strong> Separate non-conforming items from accepted stock</li>
                  <li><strong>Follow-up:</strong> Track resolution and replacement delivery arrangements</li>
                </ul>
              </div>

              <div className="p-3 rounded bg-blue-500/10 border border-blue-500/20">
                <p className="text-sm text-white/80">
                  <strong className="text-blue-400">Professional Tip:</strong> Never accept deliveries "subject to later inspection"—once signed, proving subsequent damage or discrepancies becomes extremely difficult and may void warranty claims.
                </p>
              </div>
            </div>
          </section>

          {/* Storage and Handling */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Storage and Handling
            </h2>
            <div className="text-white/85 space-y-4 leading-relaxed">
              <p>Proper storage systems protect material investments and ensure product integrity throughout the project:</p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Storage Facility Requirements:</p>
                <ul className="text-sm text-white/80 space-y-2 ml-4">
                  <li><strong>Weather protection:</strong> Waterproof and weatherproof construction</li>
                  <li><strong>Security systems:</strong> Lockable access, alarm systems, CCTV coverage</li>
                  <li><strong>Environmental control:</strong> Ventilation, temperature, and humidity management</li>
                  <li><strong>Access systems:</strong> Forklift access, loading facilities, organised layout</li>
                  <li><strong>Safety measures:</strong> Fire protection, first aid, emergency procedures</li>
                </ul>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-2">Cable Storage</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>• Horizontal drum storage on racks</li>
                    <li>• Protect from UV light and moisture</li>
                    <li>• Avoid excessive temperatures</li>
                    <li>• Maintain bend radius requirements</li>
                    <li>• FIFO (First In, First Out) rotation</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-2">Equipment & Accessories</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>• Shelving systems for small items</li>
                    <li>• Climate-controlled areas for electronics</li>
                    <li>• Segregated areas for different voltages</li>
                    <li>• Hazardous material storage compliance</li>
                    <li>• Clear labelling and identification systems</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <p className="font-medium text-green-400 mb-2">Inventory Management Systems</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li><strong>Location systems:</strong> Clear addressing and mapping of storage areas</li>
                  <li><strong>Tracking methods:</strong> Barcode or RFID systems for material tracking</li>
                  <li><strong>Stock control:</strong> Regular audits and cycle counting procedures</li>
                  <li><strong>Allocation tracking:</strong> Project-specific material segregation and tracking</li>
                  <li><strong>Condition monitoring:</strong> Regular inspection for deterioration or damage</li>
                </ul>
              </div>

              <div className="p-3 rounded bg-red-500/10 border border-red-500/20">
                <p className="text-sm text-white/80">
                  <strong className="text-red-400">Storage Cost Impact:</strong> Poor storage can result in 5-15% material losses through theft, damage, and deterioration. Professional storage systems pay for themselves through loss prevention.
                </p>
              </div>
            </div>
          </section>

          {/* Common Ordering Mistakes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
              Common Ordering Mistakes
            </h2>
            <div className="text-white/85 space-y-4 leading-relaxed">
              <p>Learning from common procurement errors helps prevent costly mistakes and project delays:</p>

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                  <p className="font-medium text-red-400 mb-2">Specification Errors</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>• Ordering incorrect cable sizes or core configurations</li>
                    <li>• Wrong protective device ratings or types</li>
                    <li>• Incompatible accessories or mounting systems</li>
                    <li>• Missing fire performance requirements</li>
                    <li>• Incorrect IP ratings for environmental conditions</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <p className="font-medium text-amber-400 mb-2">Planning Failures</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>• Ignoring supplier stock availability before ordering</li>
                    <li>• Failing to account for delivery lead times</li>
                    <li>• Not considering supplier holiday periods</li>
                    <li>• Inadequate consideration of site access for deliveries</li>
                    <li>• Poor coordination with project scheduling</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <p className="font-medium text-blue-400 mb-2">Quality Control Failures</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>• Inadequate delivery inspection procedures</li>
                    <li>• Accepting deliveries without proper checking</li>
                    <li>• Using damaged or substandard materials</li>
                    <li>• Failing to verify certification and compliance</li>
                    <li>• Poor storage leading to material deterioration</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <p className="font-medium text-green-400 mb-2">Prevention Strategies</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li><strong>Double-check specifications:</strong> Verify all technical details against drawings and standards</li>
                  <li><strong>Early supplier contact:</strong> Confirm availability and lead times before finalising schedules</li>
                  <li><strong>Peer review:</strong> Have colleagues check orders before submission</li>
                  <li><strong>Standard procedures:</strong> Develop and follow consistent ordering and checking procedures</li>
                  <li><strong>Supplier feedback:</strong> Maintain communication throughout the order process</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Worked Examples */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">09</span>
              Worked Examples
            </h2>
            <div className="text-white/85 space-y-4 leading-relaxed">
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <h3 className="font-semibold text-blue-400 mb-3">Example 1: Office Building Electrical Installation</h3>
                <p className="text-sm text-white/80 mb-2"><strong>Project:</strong> 3-floor office building, 50 staff, full electrical installation</p>
                <p className="text-sm text-white/80 mb-3"><strong>Duration:</strong> 12 weeks installation period</p>
                <p className="text-sm text-white/80 mb-2"><strong>Delivery Schedule:</strong></p>
                <ul className="text-sm text-white/80 space-y-1 ml-4">
                  <li>• <strong>Week 1:</strong> Cable tray, trunking, major containment systems</li>
                  <li>• <strong>Week 3:</strong> Main distribution boards and SWA supply cables</li>
                  <li>• <strong>Week 5:</strong> Sub-distribution boards and final circuit cables</li>
                  <li>• <strong>Week 8:</strong> Lighting fittings and emergency lighting</li>
                  <li>• <strong>Week 10:</strong> Switches, sockets, and accessories</li>
                  <li>• <strong>Week 11:</strong> Testing equipment and commissioning materials</li>
                </ul>
                <div className="mt-3 p-3 rounded bg-white/5 border border-white/10">
                  <p className="text-sm text-white/80"><strong>Result:</strong> Zero material shortages, 5% under budget due to bulk ordering discounts, project completed on schedule.</p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <h3 className="font-semibold text-green-400 mb-3">Example 2: Industrial Unit Emergency Order</h3>
                <p className="text-sm text-white/80 mb-2"><strong>Situation:</strong> Fire damage required emergency electrical replacement</p>
                <p className="text-sm text-white/80 mb-3"><strong>Challenge:</strong> 48-hour deadline for production restart</p>
                <p className="text-sm text-white/80 mb-2"><strong>Solution:</strong></p>
                <ul className="text-sm text-white/80 space-y-1 ml-4">
                  <li>• Contacted 3 trusted suppliers simultaneously</li>
                  <li>• Negotiated emergency delivery for standard items</li>
                  <li>• Used compatible alternatives for non-critical components</li>
                  <li>• Arranged out-of-hours delivery and 24/7 access</li>
                  <li>• Implemented temporary installation pending specialist items</li>
                </ul>
                <div className="mt-3 p-3 rounded bg-white/5 border border-white/10">
                  <p className="text-sm text-white/80"><strong>Result:</strong> Production restarted in 36 hours, full permanent installation completed within 1 week.</p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-3">Procurement Planning Formulas</h3>
                <div className="space-y-3">
                  <div className="border-b border-white/10 pb-2">
                    <p className="font-medium text-white">Lead Time Buffer</p>
                    <p className="font-mono text-sm text-elec-yellow">Required Date - (Lead Time × 1.2)</p>
                    <p className="text-sm text-white/70">Add 20% buffer to critical deliveries</p>
                  </div>
                  <div className="border-b border-white/10 pb-2">
                    <p className="font-medium text-white">Storage Cost</p>
                    <p className="font-mono text-sm text-elec-yellow">Material Value × 0.02 × Storage Months</p>
                    <p className="text-sm text-white/70">Approximate monthly storage cost as 2% of material value</p>
                  </div>
                  <div className="border-b border-white/10 pb-2">
                    <p className="font-medium text-white">Delivery Frequency</p>
                    <p className="font-mono text-sm text-elec-yellow">Total Quantity ÷ Storage Capacity</p>
                    <p className="text-sm text-white/70">Minimum number of deliveries required</p>
                  </div>
                  <div>
                    <p className="font-medium text-white">Emergency Premium</p>
                    <p className="font-mono text-sm text-elec-yellow">Standard Cost × 1.5-2.0</p>
                    <p className="text-sm text-white/70">Typical cost increase for emergency orders</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Practical Guidance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">10</span>
              Practical Guidance
            </h2>
            <div className="space-y-3">
              {practicalGuidance.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                  <span className="flex-shrink-0 w-6 h-6 bg-elec-yellow/20 text-elec-yellow rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </span>
                  <span className="text-white/85 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Real World Example */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">11</span>
              Real World Example
            </h2>
            <div className="text-white/85 space-y-4 leading-relaxed">
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <h3 className="font-semibold text-red-400 mb-2">Case Study: Housing Project Storage Disaster</h3>
                <p className="text-white/80 mb-3">
                  A contractor on a 50-house development decided to order all electrical materials at the start of the project to secure bulk discounts. The £85,000 worth of materials was delivered to an unsecured compound with basic weather protection.
                </p>
                <p className="text-white/80 mb-3">
                  <strong className="text-white">What went wrong:</strong> Over a 6-month period, £12,000 worth of cables were stolen in three separate incidents. Moisture ingress damaged £8,000 of distribution boards stored in leaking containers. Copper cable drums corroded due to salt air exposure near the coast.
                </p>
                <p className="text-white/80">
                  <strong className="text-white">Additional costs:</strong> Emergency replacement orders at premium prices, project delays while waiting for replacements, increased insurance premiums, and the cost of hiring security guards for remaining materials.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <h3 className="font-semibold text-green-400 mb-2">Alternative Approach</h3>
                <ul className="text-white/80 text-sm space-y-1">
                  <li>• Phase deliveries to match house completion schedule (10 houses per delivery)</li>
                  <li>• Use supplier's secure warehouse with call-off deliveries</li>
                  <li>• Install proper weatherproof, lockable storage containers</li>
                  <li>• Implement CCTV and alarm systems for on-site storage</li>
                  <li>• Negotiate delayed payment terms to match delivery schedule</li>
                  <li>• Maintain insurance coverage appropriate for stored value</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-white/80">
                  <strong className="text-elec-yellow">Lesson learned:</strong> The "savings" from bulk ordering were completely eliminated by losses and additional costs. Phased delivery with proper storage would have been cheaper and eliminated project delays.
                </p>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">12</span>
              FAQs
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h3 className="font-semibold text-white mb-2">Q: {faq.question}</h3>
                  <p className="text-white/80 text-sm">A: {faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Pocket Guide */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">13</span>
              Pocket Guide – Ordering & Deliveries
            </h2>
            <div className="p-4 rounded-lg bg-gradient-to-r from-blue-500/20 to-elec-yellow/20 border border-elec-yellow/30">
              <div className="space-y-2">
                {pocketGuideItems.map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                    <span className="text-white/90 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Recap */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">14</span>
              Recap
            </h2>
            <div className="text-white/85 space-y-4 leading-relaxed">
              <p>
                In this comprehensive subsection, you have mastered the essential skills of material procurement and delivery management for electrical installations. These competencies directly impact project success, cost control, and professional reputation in the electrical industry.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <h4 className="font-semibold text-blue-400 mb-2">Key Competencies Developed</h4>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>• Strategic procurement planning and order preparation</li>
                    <li>• Delivery scheduling and coordination with project phases</li>
                    <li>• Effective supplier communication and relationship management</li>
                    <li>• Comprehensive delivery inspection and quality control</li>
                    <li>• Professional storage and inventory management systems</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <h4 className="font-semibold text-green-400 mb-2">Business Benefits</h4>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>• Reduced project delays and cost overruns</li>
                    <li>• Minimised material losses through theft and damage</li>
                    <li>• Improved cash flow through optimised procurement timing</li>
                    <li>• Enhanced supplier relationships and preferential treatment</li>
                    <li>• Professional reputation for reliable project delivery</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <p className="text-white/80">
                  <strong className="text-amber-400">Remember:</strong> Effective procurement management is a competitive advantage that distinguishes professional contractors. The systems and relationships you build today will benefit your entire career.
                </p>
              </div>
            </div>
          </section>

          {/* Quiz */}
          <section className="mb-10">
            <Quiz
              questions={quizQuestions}
              title="Module 5.4.2 Quiz: Ordering Materials and Managing Deliveries"
            />
          </section>

          {/* Navigation Footer */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10 mt-10">
            <Button
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../4-1">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Material Estimation
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../4-3">
                Next: Tool Selection
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module5Section4_2;
